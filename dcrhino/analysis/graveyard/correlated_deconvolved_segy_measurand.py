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
from dcrhino.analysis.graphical.supporting_qc_plots_v0_20180612 import qc_plot_v2
from dcrhino.analysis.graphical.supporting_qc_plots_v0_20180612 import QCPlotInputs
from dcrhino.analysis.measurands.borehole_accelerometer_measurand import BoreholeAccelerometerMeasurand
from dcrhino.analysis.signal_processing.band_pass_fir_filter import FilterSpecification
from dcrhino.analysis.supporting_processing import ACOUSTIC_VELOCITY
from dcrhino.analysis.supporting_processing import concatenate_traces
from dcrhino.analysis.supporting_processing import get_dummy_hole_ids_from_segy
from dcrhino.analysis.supporting_processing import dummy_hole_id_from_trace
from dcrhino.analysis.supporting_processing import get_hole_trace_indices_dict
from dcrhino.analysis.supporting_processing import max_multiple_amplitude
from dcrhino.analysis.supporting_processing import max_reflection_amplitude
from dcrhino.analysis.signal_processing.seismic_processing import process_from_decon_to_final
from dcrhino.common.signal_processing.supporting_segy_processing import sampling_rate_segy_trace

class CorrelatedDeconvolvedSEGY(BoreholeAccelerometerMeasurand):

    def __init__(self, **kwargs):
        super(CorrelatedDeconvolvedSEGY, self).__init__(**kwargs)
        self.extension = kwargs.get('extension', 'sgy')
        self.fir_corners = kwargs.get('fir_corners', None)
        self.fir_duration = kwargs.get('fir_duration', None)
        self.min_lag = kwargs.get('min_lag', None)
        self.max_lag = kwargs.get('max_lag', None)
        self.label = 'correlated'


    def fir_filter(self):
        """
        """
        fir_filter = FilterSpecification(nyquist=self.nyquist, label='default')
        if self.fir_duration is None:
            fir_filter.length = 1
            fir_filter.corners = None
            fir_filter.taps = np.asarray([1.0])
        else:
            num_taps = int(self.fir_duration*2.*self.nyquist)
            if np.remainder(num_taps,2)==0:
                num_taps+=1
            fir_filter.length = num_taps#101
            fir_filter.corners = self.fir_corners
            #print("fir_filter.id_string() {}".format(fir_filter.id_string()))
            fir_filter.generate_coefficients()#set taps
        return fir_filter

    def sensor_directory(self, data_date):
        date_string = data_date.date().__str__()
        sensor_directory = os.path.join(self.data_level_path(2), date_string, self.sensor_type)
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
        fir_string = self.fir_filter().id_string()
        id_string = '{}_{}_{}_{}'.format(self.label, lag_string, fir_string, self.parent_measurands[0].id_string)
        return id_string

    def expected_filename(self, data_key):
        """
        TODO: review whether basename should be a method
        """
        digitizer_id = data_key.digitizer_id
        data_level_path = self.data_level_path(self.data_level)# = temp_paths.levels[self.data_level].get_fullpath()
        full_stat_path = os.path.join(data_level_path, data_key.data_date.__str__())# + "UTC",

        #pdb.set_trace()
        basename = self.id_string + '_' + digitizer_id + '.' + self.extension
        full_stat_file = os.path.join(full_stat_path, basename)
        return full_stat_file



    def _make_from_parents(self, data_key):
        """
        """
        #pdb.set_trace()
        parent_filename = self.parent_measurands[0].expected_filename(data_key)
        grandparent_filename = self.parent_measurands[0].parent_measurands[0].expected_filename(data_key)
        output_filename = self.expected_filename(data_key)
        pass
        st_grandparent = _read_segy(grandparent_filename)
        st_parent = _read_segy(parent_filename)
        dt = 1./sampling_rate_segy_trace(st_parent.traces[0])
        decon_filter_length_taps = self.parent_measurands[0].num_decon_taps(dt)
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
                if i_trace % 100 ==0:
                    print("{} - {}-{}, hole {} , i_trace {}".format(self.label,
                          data_key.data_date, data_key.digitizer_id,hole_id, i_trace))
                else:
                    pass
                    #print("{},  {} ".format(hole_id, i_trace))

                original_trace = grandparent_hole_traces[i_trace]
                #pdb.set_trace()
                final_trace = process_from_decon_to_final(original_trace, decon_trace,
                                                          self.fir_filter(), decon_filter_length_taps,
                                                          self.min_lag, self.max_lag)
                max_refl_ampl = max_reflection_amplitude(final_trace)
                final_trace.stats.segy.trace_header.peak_ampl = max_refl_ampl
                max_mult_ampl = max_multiple_amplitude(final_trace)#, drill_string_length)
                final_trace.stats.segy.trace_header.mult_ampl = max_mult_ampl


        #pdb.set_trace()
        print("about to write SEGY")
        st_parent.write(output_filename, format="SEGY")
        return st_parent


    def to_qc_plot(self, data_key, st=None, lower_num_ms=-5, upper_num_ms=60):
        """
        """
        output_filename = self.expected_filename(data_key)
        new_base = 'qc_' + os.path.basename(output_filename)
        new_base = new_base.replace('sgy', 'png')
        output_filename = os.path.join(os.path.dirname(output_filename), new_base)

        print(output_filename)
        #pdb.set_trace()
        if st is None:
            st = self.load(data_key)

        dt = 1./sampling_rate_segy_trace(st.traces[0])
        travel_distance = 2 * st.traces[0].stats.segy.trace_header.sensor_distance_to_source
        theoretical_two_way_travel_time = travel_distance / ACOUSTIC_VELOCITY

        normalize_by_max_amplitude = True
        #pdb.set_trace()
        trace_array_dict = {}
        for component in ['x', 'y', 'z']:
            trace_array_dict[component] = concatenate_traces(st, component)
            trace_array_dict[component] = trace_array_dict[component].T

        center_trace_dict = {}
        dummy_hole_ids, unique_hole_ids = get_dummy_hole_ids_from_segy(st)
        #hole_trace_indices = get_hole_trace_indices_dict(dummy_hole_ids, unique_hole_ids)

        hole_ids_x = dummy_hole_ids[0::3]
        if unique_hole_ids[0]==0:
            unique_hole_ids = unique_hole_ids[1:]
        for unique_hole_id in unique_hole_ids:
            center_trace_dict[unique_hole_id] = int(np.median(np.where(hole_ids_x==unique_hole_id)[0]))

#        hole_trace_indices = {}
#        #for i_hole in range(1,n_holes+1):
#        for i_hole, hole_id in enumerate(unique_hole_ids):
#            print('i_hole={}, hole_id = {}'.format(i_hole, hole_id))
#            hole_trace_indices[hole_id] = np.where(dummy_hole_ids==hole_id)[0]
        num_traces_per_component, num_samples = trace_array_dict['x'].T.shape
        num_traces_total = 3*num_traces_per_component

        x_trace_indices = range(0,num_traces_total,3)
        peak_ampl_x = np.full(num_traces_per_component, np.nan, dtype='float32')
        peak_ampl_y = np.full(num_traces_per_component, np.nan, dtype='float32')
        peak_ampl_z = np.full(num_traces_per_component, np.nan, dtype='float32')
        peak_mult_x = np.full(num_traces_per_component, np.nan, dtype='float32')

        for i_ndx, ndx in enumerate(x_trace_indices):
            dummy_hole_id = dummy_hole_id_from_trace(st.traces[ndx])
            if dummy_hole_id != 0:
                peak_ampl_x[i_ndx] = st.traces[ndx].stats.segy.trace_header.peak_ampl
                peak_mult_x[i_ndx] = st.traces[ndx].stats.segy.trace_header.mult_ampl
                peak_ampl_y[i_ndx] = st.traces[ndx+1].stats.segy.trace_header.peak_ampl
                peak_ampl_z[i_ndx] = st.traces[ndx+2].stats.segy.trace_header.peak_ampl
        #pdb.set_trace()
        if normalize_by_max_amplitude:
            for component in ['x', 'y', 'z']:
                nans_locations = np.where(np.isnan(trace_array_dict[component]))
                trace_array_dict[component][nans_locations]=0.0
                num_samples, num_traces = trace_array_dict[component].shape
                #pdb.set_trace()
                max_amplitudes = np.max(trace_array_dict[component], axis=0)
                trace_array_dict[component] = trace_array_dict[component]/max_amplitudes
                trace_array_dict[component][nans_locations] = np.nan

        #<sort out spanning milliseconds>

        #time_duration = num_samples*dt
        samples_back = (np.abs(lower_num_ms))/1000./dt
        samples_back = int(np.ceil(samples_back))
        samples_fwd = upper_num_ms/1000./dt
        samples_fwd = int(np.ceil(samples_fwd))

        half_way = int(num_samples/2)
        #pdb.set_trace()
        TRD = trace_array_dict.copy()
        TRD['x'] = TRD['x'][half_way-samples_back:half_way+samples_fwd,:]
        TRD['y'] = TRD['y'][half_way-samples_back:half_way+samples_fwd,:]
        TRD['z'] = TRD['z'][half_way-samples_back:half_way+samples_fwd,:]
        #</sort out spanning milliseconds>



        trace_array_dict = TRD
        #pdb.set_trace()
        qc_plot_input = QCPlotInputs(trace_array_dict=trace_array_dict, peak_ampl_x=peak_ampl_x,
                                     peak_ampl_y=peak_ampl_y, peak_ampl_z=peak_ampl_z,
                                     peak_mult_x=peak_mult_x, lower_number_ms=-5.0, upper_number_ms=60.0,
                                     center_trace_dict=center_trace_dict, two_way_travel_time_ms=theoretical_two_way_travel_time*1000.,
                                     multiple_max_search_window=1000.*8*dt)
        #pdb.set_trace()
        qc_plot_v2(qc_plot_input, output_filename, data_key.data_date, self.project_id)
#               two_way_travel_time_ms=None, peak_search_interval_ms=None):
#        qc_plot_v2(qc_plot_input, None, output_filename, os.path.dirname(output_filename), data_key.data_date,
#            self.project_id)#px, px, px, px, trace_array_dict,

        return qc_plot_input




def my_function():
    """
    """
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
