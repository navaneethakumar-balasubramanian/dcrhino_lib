"""
20190104: Working on cleaning/organizing the feature extraction ...
The old QC log plotter had mixed the concepts of generating derived features
and plotting.  We now want these factored out.  This class is basically a renaming
of the QCInput() class from the ancient (2018) codebase.
It is likely to be deprecated but for now lets keep it around

"""
import numpy as np
import pandas as pd
import pdb



class J0FeatureDeriver(object):
    """
    """
    def __init__(self, df_dict=None):#, df):
        """
        """
        self.df_dict = df_dict
        self.sampling_rate_of_trace = None
        self.hole_start_time = None
        self.observer_row = None
        self.data_level_path = None
        self.mount_point = None
        self.plot_meta = None
        self.time_stamps = None
        self.component_trace_index = None

#<Removed 18 Feb, 2019, requires deprecated polyfit>
#    @property
#    def axial_primary_peak_amplitude(self):
#        return self.df_dict['axial_primary_peak_amplitude']
#</Removed 18 Feb, 2019, requires deprecated polyfit>

    @property
    def axial_primary_peak_sample(self):
        return self.df_dict['axial_primary_peak_sample']

#<Removed 18 Feb, 2019, requires deprecated polyfit>
#    @property
#    def amplitude_ratio(self):
#        return self.df_dict['axial_multiple_peak_amplitude'] / self.axial_primary_peak_amplitude
#</Removed 18 Feb, 2019, requires deprecated polyfit>

    @property
    def amplitude_ratio_sample(self):
        return self.df_dict['axial_multiple_1_peak_sample'] / self.df_dict['axial_primary_peak_sample']

    @property
    def reflection_coefficient(self):
        return (1.0 - self.amplitude_ratio) / (1.0 + self.amplitude_ratio)

    @property
    def reflection_coefficient_sample(self):
        return (1.0 - self.amplitude_ratio_sample) / (1.0 + self.amplitude_ratio_sample)

#    @property
#    def primary_wavelet_width(self):
#        return (self.df_dict['axial_primary_zero_crossing_after'] - self.df_dict['axial_primary_zero_crossing_prior'])
#    @property
#    def multiple_wavelet_width(self):
#        return (self.df_dict['axial_multiple_zero_crossing_after'] - self.df_dict['axial_multiple_zero_crossing_prior'])

#    @property
#    def primary_wavelet_width_sample(self):
#        return self.df_dict['axial_primary_zero_crossing_after_sample'] - self.df_dict['axial_primary_left_trough_time']

#<Removed 18 Feb, 2019, requires polyfit>
#    @property
#    def arrival_time_diff(self):
#        return self.df_dict['axial_multiple_peak_time'] - self.df_dict['axial_primary_peak_time']
#</Removed 18 Feb, 2019, requires polyfit>
    @property
    def axial_delay_sample(self):
        return self.df_dict['axial_multiple_1_peak_time_sample'] - self.df_dict['axial_primary_peak_time_sample']

    @property
    def tangential_delay_sample(self):
        return self.df_dict['tangential_multiple_1_peak_time_sample'] - self.df_dict['tangential_primary_peak_time_sample']

    @property
    def pseudo_ucs_sample(self):
        return np.sqrt(self.axial_primary_peak_sample)

    @property
    def pseudo_velocity_sample(self):
        return 1. / self.axial_delay_sample
        #return 1. / self.primary_wavelet_width_sample

    @property
    def pseudo_density_sample(self):
        return 1e6 * self.reflection_coefficient_sample / self.pseudo_velocity_sample**2

    @property
    def tangential_primary_peak_sample(self):
        return self.df_dict['tangential_primary_peak_sample']

    @property
    def tangential_primary_peak_time_sample(self):
        return self.df_dict['tangential_primary_peak_time_sample']

    @property
    def tangential_amplitude_ratio_sample(self):
        return self.df_dict['tangential_multiple_1_peak_sample'] / self.df_dict['tangential_primary_peak_sample']

    @property
    def tangential_reflection_coefficient_sample(self):
        return (1.0 - self.tangential_amplitude_ratio_sample) / (1.0 + self.tangential_amplitude_ratio_sample)

    @property
    def tangential_velocity_delay(self):
        return self.df_dict['tangential_velocity_delay']


#    def derive_features(self, component_id):
#        if component_id == 'axial':
#            self.df_dict['pseudo_ucs'] = self.pseudo_ucs_sample
#            df_dict['pseudo_velocity'] = j0_deriver.pseudo_velocity_sample
#            df_dict['pseudo_density'] = j0_deriver.pseudo_density_sample
#            df_dict['reflection_coefficient'] = j0_deriver.reflection_coefficient_sample
#            df_dict['axial_delay'] = j0_deriver.axial_delay_sample
#
#        elif component_id == 'tangential':
#
#            df_dict['tangential_RC'] = j0_deriver.tangential_reflection_coefficient_sample
#            df_dict['tangential_delay'] = j0_deriver.tangential_delay_sample
#            df_dict['tangential_velocity_delay'] = 1.0/(df_dict['tangential_delay'])