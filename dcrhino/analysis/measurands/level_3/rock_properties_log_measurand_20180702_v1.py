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

from dcrhino.analysis.drill_string import get_drill_string
from dcrhino.analysis.graphical.rock_properties_log_plots_v1 import RockPropertyPlotInput
from dcrhino.analysis.math.rock_properties_calculations import calculate_impedance
from dcrhino.analysis.math.rock_properties_calculations import calculate_ucs2
from dcrhino.analysis.math.rock_properties_calculations import calculate_density, calculate_density2#(peak_ampl, mult_ampl, peak_index, mult_index)
from dcrhino.analysis.math.rock_properties_calculations import calculate_modulus#(peak_ampl, mult_ampl, peak_index, mult_index)
from dcrhino.analysis.math.rock_properties_calculations import calculate_velocity
from dcrhino.analysis.math.rock_properties_calculations import calculate_delay_from_indices

from dcrhino.analysis.measurands.spatially_sampled_measurand import SpatiallySampledMeasurand
from dcrhino.analysis.util.general_helper_functions import init_logging





logger = init_logging(__name__)

class RockPropertiesLogMeasurand(SpatiallySampledMeasurand):
    """
    Parents is Binned Log; His data key is same as binned log

    """

    def __init__(self, **kwargs):
        super(RockPropertiesLogMeasurand, self).__init__(**kwargs)
        #self.extension = kwargs.get('extension', 'csv')
        #self.label = 'binned_trace_header_features'


    def expected_filename(self, data_key, use_hash=True):
        """
        In this case I just want to add the word binned_v1 to the parent filename
        TODO: make traceheader a basename method
        TODO: Binning module rather than just one flavor
        """
        #parent_data_key = data_key.digitizer_date_data_key
        #digitizer_id = parent_data_key.digitizer_id
        data_level_path = self.data_level_path()# = temp_paths.levels[self.data_level].get_fullpath()
        full_stat_path = os.path.join(data_level_path, 'rock_properties')#parent_data_key.data_date.__str__())# + "UTC",

#        #pdb.set_trace()
#        if use_hash:
#            basename = self.hash_id_string + '_' + digitizer_id + '.' + self.extension
#        else:
        basename = self.id_string + '_' + data_key.observer_row.unique_hole_data_id(data_key.mount_point) + '.' + self.extension
        full_stat_file = os.path.join(full_stat_path, basename)
        return full_stat_file





    def _make_from_parents(self, data_key, expected_delay=None):
        """
        TODO: Pump out some histograms and other qc plots of pre and post
        binned quantities ... also binned with and without constraints
        """
        #pdb.set_trace()
        parent_measurand = self.parent_measurands[0]
        grandparent_measurand = parent_measurand.parent_measurands[0]
        dt = 1./grandparent_measurand.sampling_rate
        parent_data_key = data_key#.digitizer_date_data_key
        #parent_filename = self.parent_measurands[0].expected_filename(parent_data_key)
        #parent_label = self.parent_measurands[0].label

        output_filename = self.expected_filename(data_key)
        binned_df = parent_measurand.load(parent_data_key)
        if binned_df is None:
            logger.critical("{} DNE".format(output_filename))
            return

        rock_properties_dict = {}
        peak_ampl = binned_df['peak_ampl_x']
        #pdb.set_trace()
        mult_ampl = binned_df['peak_mult_x']
        peak_index = binned_df['peak_ampl_ndx_x']
        mult_index = binned_df['peak_mult_ndx_x']
#        delay =
#        P = binned_df['peak_ampl_x']
#        M = binned_df['mult_ampl_x']
        delay = calculate_delay_from_indices(peak_index, mult_index, dt)#, milliseconds=True)
        #delay *= 1000; delay -= 7.5; #ms, "mean" subtract
        ucs = calculate_ucs2(peak_ampl)
        modulus = calculate_modulus(peak_ampl, mult_ampl)
        velocity =  calculate_velocity(delay, expected_delay=expected_delay)
        #density = calculate_density(peak_ampl, mult_ampl, delay)

        density = calculate_density2(peak_ampl, mult_ampl, velocity)
        #velocity =  calculate_velocity(delay)
        rock_properties_dict['density'] = density
        rock_properties_dict['modulus'] = modulus
        rock_properties_dict['ucs'] = ucs
        rock_properties_dict['velocity'] = velocity
        #drill_string = get_drill_string(None, None, None)
        #pdb.set_trace()
#        acoustic_impedance = calculate_impedance(peak_ampl, mult_ampl,
#                                                 drill_string.cross_sectional_area,
#                                                 drill_string.bit_radius,
#                                                 150.0)

        binned_df.loc[:,'density'] = pd.Series(density, index=binned_df.index)
        binned_df.loc[:,'modulus'] = pd.Series(modulus, index=binned_df.index)
        binned_df.loc[:,'ucs'] = pd.Series(ucs, index=binned_df.index)
        binned_df.loc[:,'velocity'] = pd.Series(velocity, index=binned_df.index)

        binned_df.to_csv(output_filename)
        return binned_df


    def generate_rock_properties_plot_input(self, df, data_key=None, mount_point=None):
        #    def generate_binned_qc_plot_input(self, df=None, data_key=None, observer_row=None):
        #"""
        #st: <class 'obspy.core.stream.Stream'>
        # This block of code is for measurands that need streams
        #"""
        if df is not None:
            print('great the data already in RAM')
        elif data_key is not None:
            df = self.load(data_key)
        else:
            logger.error("no way to access obspy stream")
            return
            #raise Exception
        #pdb.set_trace()
        rp_input = RockPropertyPlotInput()

        rp_input.observer_row = data_key.observer_row
        rp_input.mount_point = mount_point
        rp_input.data_level_path = self.data_level_path()

        rp_input.depth = df['depth']

        rp_input.density = df['density']
        rp_input.modulus = df['modulus']
        rp_input.ucs = df['ucs']
        rp_input.velocity = df['velocity']

#        amplitude_ratio = df['peak_mult_x']/df['peak_ampl_x']
#        arrival_time_diff_samples = df['peak_mult_ndx_x'] - df['peak_ampl_ndx_x']
#        peak_amplitude = df['peak_ampl_x']
#        if 'mse_mpa' in df.columns:
#            mse = df['mse_mpa']
#            qc_input.mse = mse
#
#        qc_input.peak_amplitude = peak_amplitude
#        qc_input.amplitude_ratio = amplitude_ratio
#        qc_input.arrival_time_diff_samples = arrival_time_diff_samples
#        qc_input.sampling_rate_of_trace = self.parent_measurands[0].sampling_rate



#        if observer_row is not None:
#            qc_input.bench = observer_row['bench']
        return rp_input

#class RockPropertiesLogInput(object):
#    def __init__(self, df_rhino, drill_string, **kwargs):
#        self.df_rhino = df_rhino
#        self.drill_string = drill_string
#        self.p_smooth = None
#        self.m_smooth = None
#        self.impedance = None
#        self.ucs = None
#
#    def scale_and_smooth_logs(self):
#        """
#        """
#        df = self.df_rhino
#        df = df[df.depth>0]#plot with and without this to sanity check
#        # pick peakamp and multiamp from the dataframe
#        df.peak_ampl_x = df.peak_ampl_x / 1000.
#        df.peak_ampl_y = df.peak_ampl_y / 1000.
#        df.peak_ampl_z = df.peak_ampl_z / 1000.
#        df.peak_mult_x = df.peak_mult_x / 1000.
#
#        df = df.drop(df[(df.peak_ampl_y) > (4 * df.peak_ampl_x)].index)
#        df = df.drop(df[(df.peak_ampl_z) > (4 * df.peak_ampl_x)].index)
#
#        df = df.drop(df[((df.peak_mult_x / df.peak_ampl_x) < 0.01) | ((df.peak_mult_x / df.peak_ampl_x) > 0.6)].index)
#
#        # smoothing
#        P = df['peak_ampl_x']
#        M = df['peak_mult_x']
#        apod = ssig.hamming(5)
#        p_smooth = np.convolve(P, apod/np.sum(apod), 'same')
#        m_smooth = np.convolve(M, apod/np.sum(apod), 'same')
#        #sanity_check_peak_mult_peak_ampl(df, mwd_hole_id=self.mwd_hole_id)
#        self.df_rhino = df
#        self.p_smooth = p_smooth
#        self.m_smooth = m_smooth
#        return# p_smooth, m_smooth, df
#
#    def calculate_impedance(self):
#        calculate_impedance(self.p_smooth, self.m_smooth, self.dr)
#
#    def remove_non_physical_ucs(self, threshold=40.0):
#        """
#        """
#        num_rows_initial = len(self.df_rhino)
#        df = self.df_rhino
#        df =  df[df.ucs > threshold]
#        self.df_rhino = df
#        num_rows_final = len(self.df_rhino)
#        if num_rows_final < num_rows_initial:
#            logger.info("removed {} rows via ucs constraint".format(num_rows_initial-num_rows_final))
#        return
#    def apply_transformations(self):
#        """
#        """
#        self.df_rhino = remove_non_physical_log_entries(self.df_rhino)
#        self.scale_and_smooth_logs()
#        self.impedance = calculate_impedance(self.p_smooth, self.m_smooth,
#                                             self.drill_string.cross_sectional_area,
#                                             self.drill_string.bit_radius,
#                                             f_impedance_calc)
#        self.ucs = calculate_ucs(None)
#        self.remove_non_physical_ucs()
#        #df = df[df.UCS > 40]
#        density = calculate_density(q,q)



#        starttime_str = '{}'.format(data_key.observer_row.datetime_start)
#        endtime_str = '{}'.format(data_key.observer_row.datetime_end)
#        df_rhino = df_rhino[(df_rhino['datetime'] >= starttime_str) & (df_rhino['datetime'] <= endtime_str)]
#        hole_id = data_key.observer_row.hole_id
#        hole_profile_df = ALL_HOLE_PROFILES_DF[ALL_HOLE_PROFILES_DF['hole_id']==hole_id]
#        #hole_profile_df = ALL_HOLE_PROFILES_DF[ALL_HOLE_PROFILES_DF['hole_id']==hole_id]
#        depth = interpolate_to_assign_depths_to_log_csv(df_rhino, hole_profile_df)
#        df_rhino.loc[:,'depth'] = pd.Series(depth, index=df_rhino.index)
#        mse = interpolate_to_assign_mse_log_csv(df_rhino, hole_profile_df)
#        df_rhino.loc[:,'mse_mpa'] = pd.Series(mse, index=df_rhino.index)
#        #<BINNING MODULE GOES HERE>
#        #THere are fast ways to bin in pandas
#        #TODO: read up on fast binning
#        #def bin_by_depth(0.05)
#        bin_width = 0.05
#        min_depth = df_rhino['depth'].min()
#        max_depth = df_rhino['depth'].max()
#        hole_length = max_depth - min_depth
#        n_bins = int(np.ceil(hole_length/bin_width))
#        binned_df_dict = {}
#        columns_to_keep = df_rhino.columns.drop(['datetime', 'dummy_hole_id'])
#        #pdb.set_trace()
#        #TODO: Add thsi
#        peak_ampl_x_lower_bound = 0.2 #add this to the measurand
#        if peak_ampl_x_lower_bound is not None:
#            df_rhino = df_rhino[(df_rhino['peak_ampl_x'] > peak_ampl_x_lower_bound)]
#        #pdb.set_trace()
#        for column_name in columns_to_keep:
#            binned_df_dict[column_name] = np.full(n_bins, np.nan)
#        for i_bin in range(n_bins):
#            bin_min = i_bin * bin_width; #bin_min_str = '{}'.format(bin_min)
#            bin_max = bin_min + bin_width; #bin_max_str = '{}'.format(bin_max)
#            #bin_max = (i_bin + 1) * bin_width;
#            #pdb.set_trace()
#            bin_df = df_rhino[(df_rhino['depth'] >= bin_min) & (df_rhino['depth'] < bin_max)]
#            #print(i_bin, bin_df, i_bin)
#            #pdb.set_trace()
#            median_over_bin = bin_df.median()
#            for column_name in columns_to_keep:
#                binned_df_dict[column_name][i_bin] = median_over_bin[column_name]
#            #
#            #print('concatenate the frames .. getetwebaccess')
#            #pdb.set_trace()
#            #print('dogs')
#        #</BINNING MODULE GOES HERE>pl
        #output_df = pd.DataFrame.from_dict(data=binned_df_dict)
        #output_df.to_csv(output_filename)
        #db.set_trace()
        #return

#    def generate_rock_properties_plot_input(self, df=None, data_key=None, observer_row=None, mount_point=None):
#        """
#        """
#        if df is not None:
#            print('great the data already in RAM')
#        elif data_key is not None:
#            df = self.load(data_key)
#        else:
#            logger.error("no way to access obspy stream")
#            return
#            #raise Exception
#        #pdb.set_trace()
#        qc_input = RockPropertiesPlotInput()
#        qc_input.density = df['density']
#
#        density = calculate_density()
#        amplitude_ratio = df['peak_mult_x']/df['peak_ampl_x']
#        arrival_time_diff_samples = df['peak_mult_ndx_x'] - df['peak_ampl_ndx_x']
#        peak_amplitude = df['peak_ampl_x']
#        if 'mse_mpa' in df.columns:
#            mse = df['mse_mpa']
#            qc_input.mse = mse
#        qc_input.peak_amplitude = peak_amplitude
#        qc_input.amplitude_ratio = amplitude_ratio
#        qc_input.arrival_time_diff_samples = arrival_time_diff_samples
#        qc_input.sampling_rate_of_trace = self.parent_measurands[0].sampling_rate
#        qc_input.observer_row = data_key.observer_row
#        #qc_input.hole_start_time = df['datetime'].iloc[0].to_pydatetime()
#        #qc_input.observer_row = observer_row
#        qc_input.depth = df['depth']
#        qc_input.data_level_path = self.data_level_path(3)
#        qc_input.mount_point = mount_point
##        if observer_row is not None:
##            qc_input.bench = observer_row['bench']
#        return qc_input

def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
