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



class IntermediateFeatureDeriver(object):
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


    @property
    def axial_primary_peak(self):
        return self.df_dict['axial_primary_max_amplitude']


    @property
    def amplitude_ratio(self):
        return self.df_dict['axial_multiple_1_max_amplitude'] / self.axial_primary_peak

    @property
    def reflection_coefficient(self):
        return (1.0 - self.amplitude_ratio) / (1.0 + self.amplitude_ratio)

#    @property
#    def primary_wavelet_width(self):
#        return (self.df_dict['axial_primary_zero_crossing_after'] - self.df_dict['axial_primary_zero_crossing_prior'])
#    @property
#    def multiple_wavelet_width(self):
#        return (self.df_dict['axial_multiple_zero_crossing_after'] - self.df_dict['axial_multiple_zero_crossing_prior'])


    @property
    def axial_delay(self):
        return self.df_dict['axial_multiple_1_max_time'] - self.df_dict['axial_primary_max_time']

    @property
    def pseudo_ucs(self):
        return np.sqrt(self.axial_primary_peak)

    @property
    def pseudo_velocity(self):
        return 1. / self.axial_delay
        #return 1. / self.primary_wavelet_width

    @property
    def pseudo_density(self):
        return 1e6 * self.reflection_coefficient / self.pseudo_velocity**2



    @property
    def tangential_primary_peak(self):
        return self.df_dict['tangential_primary_max_amplitude']

    @property
    def tangential_primary_peak_time(self):
        return self.df_dict['tangential_primary_max_time']

    @property
    def tangential_delay(self):
        return self.df_dict['tangential_multiple_1_max_time'] - self.tangential_primary_peak_time

    @property
    def tangential_amplitude_ratio(self):
        return self.df_dict['tangential_multiple_1_max_amplitude'] / self.tangential_primary_peak

    @property
    def tangential_reflection_coefficient(self):
        return (1.0 - self.tangential_amplitude_ratio) / (1.0 + self.tangential_amplitude_ratio)

    @property
    def tangential_velocity_delay(self):
        return 1.0 / self.tangential_delay



    def derive_features(self, component_id):
        if component_id == 'axial':
            self.df_dict['pseudo_ucs'] = self.pseudo_ucs
            self.df_dict['pseudo_velocity'] = self.pseudo_velocity
            self.df_dict['pseudo_density'] = self.pseudo_density
            self.df_dict['reflection_coefficient'] = self.reflection_coefficient
            self.df_dict['axial_delay'] = self.axial_delay

        elif component_id == 'tangential':

            self.df_dict['tangential_RC'] = self.tangential_reflection_coefficient
            self.df_dict['tangential_delay'] = self.tangential_delay
            self.df_dict['tangential_velocity_delay'] = self.tangential_velocity_delay

        return self.df_dict
