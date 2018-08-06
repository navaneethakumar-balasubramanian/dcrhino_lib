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
TODO: Add recursove cehck for sensor_type to measurand, much like sampling_rate
in uniform sampled
"""

from __future__ import absolute_import, division, print_function


import datetime
from hashlib import sha256
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

#from dcrhino.analysis.graphical.qc_log_plots import QCLogPlotInput
from dcrhino.analysis.graphical.binned_qc_log_plots_v2_20180724 import BinnedQCLogPlotInput

#from dcrhino.analysis.measurands.uniformly_sampled_measurand import UniformlySampledMeasurand
from dcrhino.analysis.measurands.spatially_sampled_measurand import SpatiallySampledMeasurand
from dcrhino.analysis.supporting_processing import load_mwd_with_mse
from dcrhino.analysis.util.general_helper_functions import init_logging

#from dcrhino.analysis.measurands.level_1.mwd_with_mse_measurand import MWDWithMSE


from dcrhino.common.mwd_tools import interpolate_to_assign_depths_to_log_csv
from dcrhino.common.mwd_tools import interpolate_to_assign_mse_log_csv
from dcrhino.common.supporting_paths import ensure_dir
#mwd_with_mse_measurand = MEAS
#ALL_HOLE_PROFILES_DF = load_mwd_with_mse() #this is a parent
#ALL_HOLE_PROFILES_DF = get_master_mwd_data_frame()
#MASTER_MWD = get()

logger = init_logging(__name__)

class BinnedTraceHeaderFeaturesMeasurand(SpatiallySampledMeasurand):
    """
    This guy is special.  His parents are
    1. The simple trace header csv
    2. The mwd data

    TODO: float32 vs 64 check.  These outputs look 64 bit
    """

    def __init__(self, **kwargs):
        super(BinnedTraceHeaderFeaturesMeasurand, self).__init__(**kwargs)
        #self.extension = kwargs.get('extension', 'csv')
        #self.label = 'binned_trace_header_features'


#    @property
#    def hash_id_string(self):
#        """
#        usage:
#            THis one is a bit messy.
#        """
#        parent_string = self.parent_measurands[0].id_string
#        #if as_hash:
#        hashy_mchash = sha256('{}'.format(parent_string)).hexdigest()
#        id_string = '{}_{}'.format(self.label, hashy_mchash[0:13])
##        else:
##            id_string = '{}_{}'.format(self.label, parent_string)
#        return id_string

#    @property
#    def id_string(self):
#        """
#        usage:
#            THis one is a bit messy.
#        """
#        parent_string = self.parent_measurands[0].id_string
#        id_string = '{}_{}'.format(self.label, parent_string)
#
#        return id_string

    def expected_filename(self, data_key, use_hash=True):
        """
        In this case I just want to add the word binned_v1 to the parent filename
        TODO: make traceheader a basename method
        TODO: Binning module rather than just one flavor
        """
        #parent_data_key = data_key.digitizer_date_data_key
        #digitizer_id = parent_data_key.digitizer_id
        data_level_path = self.data_level_path()# = temp_paths.levels[self.data_level].get_fullpath()
        full_stat_path = os.path.join(data_level_path, 'binned')#parent_data_key.data_date.__str__())# + "UTC",

#        #pdb.set_trace()
#        if use_hash:
#            basename = self.hash_id_string + '_' + digitizer_id + '.' + self.extension
#        else:
        basename = self.id_string + '_' + data_key.master_row.unique_hole_data_id() + '.' + self.extension
        full_stat_file = os.path.join(full_stat_path, basename)
        return full_stat_file





    def _make_from_parents(self, data_key):
        """
        TODO: Pump out some histograms and other qc plots of pre and post
        binned quantities ... also binned with and without constraints

        you may wish
        """
        #pdb.set_trace()
        parent_data_key = data_key.parent_data_key
        parent_filename = self.parent_measurands[0].expected_filename(parent_data_key)
        parent_label = self.parent_measurands[0].label

        output_filename = self.expected_filename(data_key)
        output_dir = os.path.dirname(output_filename)
        ensure_dir(output_dir)
        #pdb.set_trace()
        df_rhino = self.parent_measurands[0].load(parent_data_key)
        if df_rhino is None:
            logger.critical("{} DNE".format(output_filename))
            return
        starttime_str = '{}'.format(data_key.master_row.datetime_start)
        endtime_str = '{}'.format(data_key.master_row.datetime_end)
        df_rhino = df_rhino[(df_rhino['datetime'] >= starttime_str) & (df_rhino['datetime'] <= endtime_str)]
        all_hole_profiles = data_key.hole_profile_df
        #pdb.set_trace()
        print("ADFIDIFBSDIVIDNVVIUDNCV")
        hole_id = data_key.master_row.hole
        hole_profile_df = all_hole_profiles[all_hole_profiles['hole']==hole_id]
        #pdb.set_trace()
        depth = interpolate_to_assign_depths_to_log_csv(df_rhino, hole_profile_df)
        df_rhino.loc[:,'depth'] = pd.Series(depth, index=df_rhino.index)
        #mse = interpolate_to_assign_mse_log_csv(df_rhino, hole_profile_df)
        #df_rhino.loc[:,'mse_mpa'] = pd.Series(mse, index=df_rhino.index)
        #<BINNING MODULE GOES HERE>
        #THere are fast ways to bin in pandas
        #TODO: read up on fast binning
        #def bin_by_depth(0.05)
        bin_width = 0.05
        min_depth = df_rhino['depth'].min()
        max_depth = df_rhino['depth'].max()
        hole_length = max_depth - min_depth
        try:
            n_bins = int(np.ceil(hole_length/bin_width))
        except OverflowError:
            print("CRITICAL FAIL HOLE INFO")
            return
            pdb.set_trace()
        binned_df_dict = {}
        columns_to_keep = df_rhino.columns.drop(['datetime', 'dummy_hole_id'])
        #pdb.set_trace()
        #TODO: Add thsi
#        peak_ampl_x_lower_bound = 0.2 #add this to the measurand
#        if peak_ampl_x_lower_bound is not None:
#            df_rhino = df_rhino[(df_rhino['peak_ampl_x'] > peak_ampl_x_lower_bound)]
        #pdb.set_trace()
        for column_name in columns_to_keep:
            binned_df_dict[column_name] = np.full(n_bins, np.nan)
        for i_bin in range(n_bins):
            bin_min = i_bin * bin_width; #bin_min_str = '{}'.format(bin_min)
            bin_max = bin_min + bin_width; #bin_max_str = '{}'.format(bin_max)
            #bin_max = (i_bin + 1) * bin_width;
            #pdb.set_trace()
            bin_df = df_rhino[(df_rhino['depth'] >= bin_min) & (df_rhino['depth'] < bin_max)]
            #print(i_bin, bin_df, i_bin)
            #pdb.set_trace()
            median_over_bin = bin_df.median()
            for column_name in columns_to_keep:
                binned_df_dict[column_name][i_bin] = median_over_bin[column_name]
            #
            #print('concatenate the frames .. getetwebaccess')
            #pdb.set_trace()
            #print('dogs')
        #</BINNING MODULE GOES HERE>pl
        #pdb.set_trace()
        output_df = pd.DataFrame.from_dict(data=binned_df_dict)
        output_df.to_csv(output_filename)
        #db.set_trace()
        return

    def generate_binned_qc_plot_input(self, df=None, data_key=None,
                                      observer_row=None, mount_point=None, plot_meta=None):
        """
        st: <class 'obspy.core.stream.Stream'>
         This block of code is for measurands that need streams
        """
        #pdb.set_trace()
        if df is not None:
            print('great the data already in RAM')
        elif data_key is not None:
            df = self.load(data_key)
        else:
            logger.error("no way to access obspy stream")
            return
            #raise Exception
        #pdb.set_trace()
        qc_input = BinnedQCLogPlotInput()
        qc_input.vertical_primary_peak_amplitude = df['vertical_primary_peak_amplitude']
        qc_input.vertical_primary_area = df['vertical_primary_area']
        qc_input.vertical_multiple_peak_amplitude = df['vertical_multiple_peak_amplitude']
        qc_input.vertical_multiple_area = df['vertical_multiple_area']
        qc_input.vertical_primary_zero_crossing_prior = df['vertical_primary_zero_crossing_prior']
        qc_input.vertical_primary_zero_crossing_after = df['vertical_primary_zero_crossing_after']
        qc_input.vertical_multiple_zero_crossing_prior = df['vertical_multiple_zero_crossing_prior']
        qc_input.vertical_multiple_zero_crossing_after = df['vertical_multiple_zero_crossing_after']

#        qc_input.peak_amplitude = peak_amplitude
#        qc_input.amplitude_ratio = amplitude_ratio
#        qc_input.arrival_time_diff_samples = arrival_time_diff_samples
        #pdb.set_trace()
        qc_input.hole_start_time = data_key.master_row.row.time_start.to_pydatetime()

        #qc_input.sampling_rate_of_trace = self.parent_measurands[0].sampling_rate
        qc_input.sampling_rate_of_trace = data_key.parent_data_key.sampling_rate
        qc_input.observer_row = data_key.master_row
        qc_input.depth = df['depth']
        qc_input.data_level_path = self.data_level_path()
        qc_input.mount_point = mount_point
        qc_input.plot_meta = plot_meta

        return qc_input

def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
