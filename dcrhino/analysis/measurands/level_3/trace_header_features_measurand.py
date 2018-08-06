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
TODO: Add recursive cehck for sensor_type to measurand, much like sampling_rate
in uniform sampled
"""

from __future__ import absolute_import, division, print_function


import datetime
from hashlib import sha256
import numpy as np
import os
import pandas as pd
import pdb

from obspy.io.segy.core import _read_segy
from dcrhino.analysis.graphical.qc_log_plots import QCLogPlotInput
from dcrhino.analysis.measurands.uniformly_sampled_measurand import UniformlySampledMeasurand
from dcrhino.analysis.measurands.level_2.supporting_level_2_segy import TraceHeaderAttributes
from dcrhino.analysis.supporting_processing import get_dummy_hole_ids_from_segy
from dcrhino.analysis.supporting_processing import rhino_channel_map_from_trace
from dcrhino.analysis.util.general_helper_functions import init_logging

from dcrhino.collection.IDEtoSEGY.trace_header import DataCloudTraceHeader

logger = init_logging(__name__)

class TraceHeaderFeaturesMeasurand(UniformlySampledMeasurand):

    def __init__(self, **kwargs):
        super(TraceHeaderFeaturesMeasurand, self).__init__(**kwargs)
        self.extension = kwargs.get('extension', 'csv')
        self.label = 'trace_header_features'


#    def sensor_directory(self, data_date):
#        date_string = data_date.date().__str__()
#        sensor_directory = os.path.join(self.data_level_path(2), date_string, self.sensor_type)
#        print("sensor_directory",sensor_directory)
#        #spdb.set_trace()
#        return sensor_directory

    @property
    def hash_id_string(self):
        """
        usage:
            THis one is a bit messy. The parameters that went into calculating
            the data are actually in the CorrelatedDeconvolvedMeasurand._make_from_parents
            Here we just load and create csv.
            Is it HashTime?  I think so ...
        """
        parent_string = self.parent_measurands[0].id_string
        #if as_hash:
        hashy_mchash = sha256('{}'.format(parent_string)).hexdigest()
        id_string = '{}_{}'.format(self.label, hashy_mchash[0:13])
#        else:
#            id_string = '{}_{}'.format(self.label, parent_string)
        return id_string

    @property
    def id_string(self):
        """
        usage:
            THis one is a bit messy. The parameters that went into calculating
            the data are actually in the CorrelatedDeconvolvedMeasurand._make_from_parents
            Here we just load and create csv.
        """
        parent_string = self.parent_measurands[0].id_string
        id_string = '{}_{}'.format(self.label, parent_string)
        return id_string

    def expected_filename(self, data_key, use_hash=True):
        """
        TODO: review whether basename should be a method
        """
        digitizer_id = data_key.digitizer_id
        data_level_path = self.data_level_path()# = temp_paths.levels[self.data_level].get_fullpath()
        full_stat_path = os.path.join(data_level_path, data_key.data_date.__str__())# + "UTC",

        #pdb.set_trace()
        if use_hash:
            basename = self.hash_id_string + '_' + digitizer_id + '.' + self.extension
        else:
            basename = self.id_string + '_' + digitizer_id + '.' + self.extension
        full_stat_file = os.path.join(full_stat_path, basename)
        return full_stat_file


    def _get_trace_header_info_and_pack_as_dataframe(self, st, num_traces_per_channel,
                                                     dummy_hole_ids_by_time,
                                                     x_trace_indices, t0, parent_label):
        """
        """
        trace_header_attributes = TraceHeaderAttributes(num_traces_per_channel)
        trace_header_attributes.populate_from_stream(st)

        freq_string ='1s'
        print("Warning - trace duration HARD CODED in measurand")
        rng = pd.date_range(t0, periods=num_traces_per_channel, freq=freq_string)
        peak_ampl_x = pd.Series(trace_header_attributes.peak_ampl_vertical, index=rng)
        peak_ampl_y = pd.Series(trace_header_attributes.peak_ampl_tangential, index=rng)
        peak_ampl_z = pd.Series(trace_header_attributes.peak_ampl_radial, index=rng)
        peak_mult_x = pd.Series(trace_header_attributes.peak_mult_vertical, index=rng)
        peak_ampl_ndx_x = pd.Series(trace_header_attributes.peak_ampl_vert_ndx, index=rng)
        peak_mult_ndx_x = pd.Series(trace_header_attributes.peak_mult_vert_ndx, index=rng)
        data_dict = {'peak_ampl_x':peak_ampl_x, 'peak_ampl_y':peak_ampl_y,
                          'peak_ampl_z':peak_ampl_z, 'peak_mult_x':peak_mult_x,
                          'peak_ampl_ndx_x':peak_ampl_ndx_x, 'peak_mult_ndx_x':peak_mult_ndx_x,
                          'dummy_hole_id':dummy_hole_ids_by_time}
        #output_csv_name = full_segy_file.replace('.sgy', '_peak.csv')
        df = pd.DataFrame(data=data_dict)
        return df


    def _make_from_parents(self, data_key):
        """
         #TODO: Add peak index
         How to do this?  Check if the parrent label is correllated2
        """
        #pdb.set_trace()
        parent_filename = self.parent_measurands[0].expected_filename(data_key)
        parent_label = self.parent_measurands[0].label
        #grandparent = self.parent_measurands[0].parent_measurands[0]
        #granparent knows sensor type
        output_filename = self.expected_filename(data_key)
        st_parent = _read_segy(parent_filename)

        #pdb.set_trace()
        #sampling_rate = sampling_rate_segy_trace(st_parent.traces[0])
        #dt = 1./sampling_rate
        dummy_hole_ids, unique_hole_ids = get_dummy_hole_ids_from_segy(st_parent)
        dummy_hole_ids_by_time = dummy_hole_ids[0::3]
        trace_header_operator = DataCloudTraceHeader()
        t0 = trace_header_operator.get_tracetime(st_parent.traces[0])
        #t0 = st_parent.traces[0].stats.starttime.datetime

        num_traces_per_channel = int(len(st_parent)/3)
        x_trace_indices = range(0,len(st_parent.traces),3)
        df = self._get_trace_header_info_and_pack_as_dataframe(st_parent, num_traces_per_channel,
                                                     dummy_hole_ids_by_time,
                                                     x_trace_indices, t0, parent_label)
        self.save_to_csv(data_key, df)
        #df.to_csv(output_filename, index_label='datetime')
        return


    def generate_qc_plot_input(self, df=None, data_key=None, observer_row=None,
                               depth=None, mount_point=None):
        """
        st: <class 'obspy.core.stream.Stream'>
         This block of code is for measurands that need streams
        """
        if df is not None:
            print('great the data already in RAM')
        elif data_key is not None:
            df = self.load(data_key)
        else:
            logger.error("no way to access obspy stream")
            raise Exception
        #pdb.set_trace()
        qc_input = QCLogPlotInput()

        amplitude_ratio = df['peak_mult_x']/df['peak_ampl_x']
        arrival_time_diff_samples = df['peak_mult_ndx_x'] - df['peak_ampl_ndx_x']
        qc_input.amplitude_ratio = amplitude_ratio
        qc_input.arrival_time_diff_samples = arrival_time_diff_samples
        #qc_input.sampling_rate_of_trace = self.parent_measurands[0].sampling_rate
        qc_input.hole_start_time = df['datetime'].iloc[0].to_pydatetime()
        qc_input.observer_row = observer_row
        qc_input.depth = depth
        qc_input.data_level_path = self.data_level_path()
        qc_input.mount_point = mount_point
#        if observer_row is not None:
#            qc_input.bench = observer_row['bench']
        return qc_input


def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
