# -*- coding: utf-8 -*-
"""
Created on Fri Jun 22 17:59:10 2018

@author: kkappler

TODO: Replace fir_filter() method which creates one with actual creation
in the measurand registry.  There are a few subtleties here so beware ... mostly
that sampling rate (Nyquist)  need to be accessible for the current Fir class.
Take some time to think on it ... and while you are at it, add 'application method'
to FIR, so its, lfilter, filtfilt, etc.
TODO:  May need to support an option where get_drill_string_length() (DSL) operates
on a trace by trace basis ... consider the case where the hole is being drilled
with adding sections to the pipe ... we have not encountered this yet so for now I am
going to pull this number from some trace associated with the hole_id
TODO: add DSL to title in qc plots
"""

from __future__ import absolute_import, division, print_function


import datetime
import numpy as np
import os
import pdb

from obspy.io.segy.core import _read_segy

from dcrhino.analysis.data_manager.temp_paths import ensure_dir
from dcrhino.analysis.graphical.supporting_qc_plots import qc_plot
#from dcrhino.analysis.graphical.supporting_qc_plots import qc_plot_v3
from dcrhino.analysis.graphical.supporting_qc_plots import QCPlotInputs
from dcrhino.analysis.instrumentation.rhino import get_rhino_channel_map_key#(drill_string_axis_ch, tangential_axis_ch)
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.measurands.level_2.supporting_level_2_segy import TraceHeaderAttributes
from dcrhino.analysis.measurands.segy_accelerometer_measurand import SEGYMeasurand
from dcrhino.analysis.signal_processing.seismic_processing import process_from_decon_to_final
from dcrhino.analysis.signal_processing.seismic_processing import max_reflection_amplitude2
from dcrhino.analysis.signal_processing.seismic_processing import max_multiple_amplitude2
from dcrhino.analysis.signal_processing.seismic_processing  import ACOUSTIC_VELOCITY

from dcrhino.analysis.signal_processing.supporting_segy_processing import DataCloudTraceHeader
from dcrhino.analysis.signal_processing.supporting_segy_processing import sampling_rate_segy_trace

from dcrhino.analysis.supporting_processing import concatenate_traces2
from dcrhino.analysis.supporting_processing import get_dummy_hole_ids_from_segy
#from dcrhino.analysis.supporting_processing import dummy_hole_id_from_trace
from dcrhino.analysis.supporting_processing import get_hole_trace_indices_dict
from dcrhino.analysis.supporting_processing import get_segy_trace_by_index#(segy_filename, index)
from dcrhino.analysis.supporting_processing import rhino_channel_map_from_trace
from dcrhino.analysis.util.general_helper_functions import find_files
from dcrhino.analysis.util.general_helper_functions import init_logging


logger = init_logging(__name__)

class CorrelatedDeconvolvedSEGY2(SEGYMeasurand):

    def __init__(self, **kwargs):
        super(CorrelatedDeconvolvedSEGY2, self).__init__(**kwargs)
        self.extension = kwargs.get('extension', 'sgy')
        self.fir_corners = kwargs.get('fir_corners', None)
        self.fir_duration = kwargs.get('fir_duration', None)
        self.min_lag = kwargs.get('min_lag', None)
        self.max_lag = kwargs.get('max_lag', None)
        self.multiple_search_back_ms = kwargs.get('multiple_search_back_ms', 0.0)
        self.multiple_search_forward_ms = kwargs.get('multiple_search_fwd_ms', 3.0)
        self.label = 'correlated2'



    def sensor_directory(self, data_date):
        date_string = data_date.date().__str__()
        sensor_directory = os.path.join(self.data_level_path(), date_string, self.sensor_type)
        print("sensor_directory",sensor_directory)
        #spdb.set_trace()
        return sensor_directory

    @property
    def id_string(self):#,min_lag, max_lag):
        """
        usage:
            full_final_sgy_filename = get_corr_segy_filenames(parent_segy_filename)
        """
#        data_dir = os.path.dirname(parent_segy_filename)
        lag_string = 'minlag{}-maxlag{}'.format(self.min_lag, self.max_lag)
        fir_string = self.firls.id_string()
        id_string = '{}_{}_{}_{}'.format(self.label, lag_string, fir_string, self.parent_measurands[0].id_string)
        return id_string



    def expected_filename(self, data_key):
        """
        TODO: review whether basename should be a method
        """
        digitizer_id = data_key.digitizer_id
        full_stat_path = self.full_path(data_key)

        #pdb.set_trace()
        basename = self.id_string + '_' + digitizer_id + '.' + self.extension
        full_stat_file = os.path.join(full_stat_path, basename)
        return full_stat_file

    def orientation_channel_remap_key(self, data_key, tr=None):
        """
        TODO: if no trace is passed, go load one from the segy using iread
        """
        if tr is None:
            parent_filename = self.parent_measurands[0].expected_filename(data_key)
            tr = get_segy_trace_by_index(parent_filename, 0)
        drill_string_axis_ch = tr.stats.segy.trace_header.axial_axis
        tangential_axis_ch = tr.stats.segy.trace_header.tangential_axis
        rhino_channel_map_key = get_rhino_channel_map_key(drill_string_axis_ch, tangential_axis_ch)
        return rhino_channel_map_key

    def rhino_channel_map(self, data_key, tr=None):
        """
        TODO: if no trace is passed, go load one from the segy using iread
        """
        if tr is None:
            parent_filename = self.parent_measurands[0].expected_filename(data_key)
            tr = get_segy_trace_by_index(parent_filename, 0)
        rhino_channel_map = rhino_channel_map_from_trace(tr)
        return rhino_channel_map

    def _make_from_parents(self, data_key):
        """
        @var trace_indices: these are integers in a list or 1d-array.  The numbers are the
        trace indices from the sgy file associated with a given hole
        """
        #pdb.set_trace()
        parent_filename = self.parent_measurands[0].expected_filename(data_key)
        grandparent_filename = self.parent_measurands[0].parent_measurands[0].expected_filename(data_key)
        output_filename = self.expected_filename(data_key)

        fir_taps = self.firls.make(data_key)
        dt = 1./data_key.sampling_rate
        decon_filter_length_taps = self.parent_measurands[0].num_decon_taps(dt)
        rhino_channel_map = self.rhino_channel_map(data_key)

        #pdb.set_trace()
        st_grandparent = _read_segy(grandparent_filename)
        st_parent = _read_segy(parent_filename)
        dummy_hole_ids, unique_hole_ids = get_dummy_hole_ids_from_segy(st_parent)
        hole_trace_indices = get_hole_trace_indices_dict(dummy_hole_ids, unique_hole_ids)

        #pdb.set_trace()

        for hole_id in unique_hole_ids:
            trace_indices = hole_trace_indices[hole_id]
            if hole_id==0:
                parent_hole_traces = [st_parent.traces[i] for i in trace_indices]
                grandparent_hole_traces = [st_grandparent.traces[i] for i in trace_indices]
            else:
                parent_hole_traces = st_parent.traces[trace_indices[0]: trace_indices[-1]+1]
                grandparent_hole_traces = st_grandparent.traces[trace_indices[0]: trace_indices[-1]+1]


            for i_trace, decon_trace in enumerate(parent_hole_traces):
                if i_trace % 200 == 0:
                    print("{} - {}-{}, hole {} , i_trace {}".format(self.label,
                          data_key.data_date, data_key.digitizer_id,hole_id, i_trace))
                else:
                    pass
                    #print("{},  {} ".format(hole_id, i_trace))

                original_trace = grandparent_hole_traces[i_trace]
                #pdb.set_trace()
                final_trace = process_from_decon_to_final(original_trace, decon_trace,
                                                          fir_taps, decon_filter_length_taps,
                                                          self.min_lag, self.max_lag)
                max_refl_ampl, max_refl_ndx = max_reflection_amplitude2(final_trace)
                final_trace.stats.segy.trace_header.peak_ampl = max_refl_ampl
                final_trace.stats.segy.trace_header.peak_index = float(max_refl_ndx)

                trace_channel = rhino_channel_map[i_trace % 3]
                if trace_channel == 'axial':
                    max_mult_ampl, max_mult_ndx  = max_multiple_amplitude2(final_trace, search_backward_ms=self.multiple_search_back_ms,
                                                                           search_forward_ms=self.multiple_search_forward_ms)
                    final_trace.stats.segy.trace_header.mult_ampl = max_mult_ampl
                    final_trace.stats.segy.trace_header.mult_index = float(max_mult_ndx)

        #pdb.set_trace()
        print("about to write SEGY")
        st_parent.write(output_filename, format="SEGY")
        return st_parent


    def _split_folder(self, data_key, component):
        """
        """
        output_dir = os.path.dirname(self.expected_filename(data_key))
        output_dir = os.path.join(output_dir, 'split', data_key.digitizer_id, component)
        return output_dir

    def _split_to_npy(self, data_key, st=None):
        """
        flow: load the traces all as an obspy stream
        Then loop over the traces and save as vert_datetime, tang_datetime, radial_datetime
        WARNING: This is NOT a proper measurand and does not have a unique path
        multip;le corr data could wind up in same place, this is basically just for
        EDA at this point
        """
        trace_header_operator = DataCloudTraceHeader()

        #pdb.set_trace()
        #filename = self.expected_filename(data_key)
        #<debug>
        #tr = get_segy_trace_by_index(filename, 0)
        #st = DummyStream(); st.traces = [tr,tr, tr, tr, tr, tr,tr, tr, tr]
        #</debug>
        if (st is None) or (st==0):
            #segy_file_to_read = self.expected_filename(data_key)
            st = self.load(data_key)
        tr = st.traces[0]
        rhino_channel_component_map = self.rhino_channel_map(data_key, tr)

        component_labels = [rhino_channel_component_map[x] for x in [0,1,2]]
        for component_label in component_labels:
            output_dir = self._split_folder(data_key, component_label)
            ensure_dir(output_dir)
        for i_trace, tr in enumerate(st.traces):
            data_datetime = trace_header_operator.get_tracetime(tr)
            component = rhino_channel_component_map[i_trace % 3]
            output_dir = self._split_folder(data_key, component)

            filebase = '{}.npy'.format(data_datetime.strftime('%Y%m%d%H%M%S'))
            full_filename = os.path.join(output_dir, filebase)
            np.save(full_filename, tr.data)


    def extract_peak_amplitudes(self):
        """
        """
        pass

    def available_files_to_process(self):
        """
        """

        file_list = find_files(self.data_level_path(), 'corr*sgy')
        file_list.sort()
        return file_list


    def num_samples_in_correlated_trace(self, sampling_rate):
        """
        TODO: what happens when there are non-integer number of samples ...
        should we constrain the lags so that never happens?
        """
        num_samples_in_corr_trace = (self.max_lag - self.min_lag) * sampling_rate
        num_samples_in_corr_trace = int(num_samples_in_corr_trace)
        return num_samples_in_corr_trace

    def time_vector(self, sampling_rate):
        """
        TODO: check that self.max_lag = timevector[-1]+dt
        """
        dt = 1./sampling_rate
        n_samples = self.num_samples_in_correlated_trace(sampling_rate)
        time_vector = dt * np.arange(n_samples)
        time_vector += self.min_lag
        #pdb.set_trace()
        return time_vector

    def to_qc_plot(self, data_key, st=None, lower_num_ms=-5.0, upper_num_ms=60, show=False):
        """
        """
        output_filename = self.expected_filename(data_key)
        new_base = 'qc_' + os.path.basename(output_filename)
        new_base = new_base.replace('.sgy', '.png')
        output_filename = os.path.join(os.path.dirname(output_filename), new_base)

        if st is None:
            st = self.load(data_key)

        rhino_channel_map = rhino_channel_map_from_trace(st.traces[0])
        dt = 1./sampling_rate_segy_trace(st.traces[0])
        travel_distance = 2 * st.traces[0].stats.segy.trace_header.sensor_distance_to_source
        theoretical_two_way_travel_time = travel_distance / ACOUSTIC_VELOCITY
        normalize_by_max_amplitude = True
        #pdb.set_trace()
        trace_array_dict = {}
        for component in COMPONENT_LABELS:#['x', 'y', 'z']:
            trace_array_dict[component] = concatenate_traces2(st, component)
            trace_array_dict[component] = trace_array_dict[component].T

        center_trace_dict = {}
        dummy_hole_ids, unique_hole_ids = get_dummy_hole_ids_from_segy(st)

        hole_ids_x = dummy_hole_ids[0::3]
        if unique_hole_ids[0]==0:
            unique_hole_ids = unique_hole_ids[1:]
        for unique_hole_id in unique_hole_ids:
            center_trace_dict[unique_hole_id] = int(np.median(np.where(hole_ids_x==unique_hole_id)[0]))

        num_traces_per_component, num_samples = trace_array_dict['axial'].T.shape
        trace_header_attributes = TraceHeaderAttributes(num_traces_per_component)
        trace_header_attributes.populate_from_stream(st)


        if normalize_by_max_amplitude:
            for component_label in COMPONENT_LABELS:#in ['x', 'y', 'z']:
                nans_locations = np.where(np.isnan(trace_array_dict[component_label]))
                trace_array_dict[component_label][nans_locations]=0.0
                num_samples, num_traces = trace_array_dict[component_label].shape
                max_amplitudes = np.max(trace_array_dict[component_label], axis=0)
                trace_array_dict[component_label] = trace_array_dict[component_label]/max_amplitudes
                trace_array_dict[component_label][nans_locations] = np.nan

        #<sort out spanning milliseconds>

        #time_duration = num_samples*dt
        #milliseconds_per_second = 1000.
        samples_back = (np.abs(lower_num_ms))/1000./dt
        samples_back = int(np.ceil(samples_back))
        samples_fwd = upper_num_ms/1000./dt
        samples_fwd = int(np.ceil(samples_fwd))

        half_way = int(num_samples/2)
        #pdb.set_trace()
        TRD = trace_array_dict.copy()
        #TRD[component] = TRD[component]
        TRD['axial'] = TRD['axial'][half_way-samples_back:half_way+samples_fwd,:]
        TRD['tangential'] = TRD['tangential'][half_way-samples_back:half_way+samples_fwd,:]
        TRD['radial'] = TRD['radial'][half_way-samples_back:half_way+samples_fwd,:]
        #</sort out spanning milliseconds>



        trace_array_dict = TRD
        #pdb.set_trace()
        qc_plot_input = QCPlotInputs(trace_array_dict=trace_array_dict,
                                     peak_ampl_x=trace_header_attributes.peak_ampl_axial,
                                     peak_ampl_y=trace_header_attributes.peak_ampl_tangential,
                                     peak_ampl_z=trace_header_attributes.peak_ampl_radial,
                                     peak_mult_x=trace_header_attributes.peak_mult_axial,
                                     lower_number_ms=lower_num_ms, upper_number_ms=upper_num_ms,
                                     center_trace_dict=center_trace_dict,
                                     two_way_travel_time_ms=theoretical_two_way_travel_time*1000.,
                                     multiple_search_back_ms=self.multiple_search_back_ms,
                                     multiple_search_forward_ms=self.multiple_search_forward_ms)
        #pdb.set_trace()
        qc_plot(qc_plot_input, output_filename, data_key.data_date, self.project_id, show=show)

        return qc_plot_input




def main():
    """
    """
    qq = CorrelatedDeconvolvedSEGY2()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
