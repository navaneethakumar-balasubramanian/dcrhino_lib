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
    def __init__(self):#, df):
        """
        """
        self.df_dict = None
        self.sampling_rate_of_trace = None
        self.hole_start_time = None
        self.observer_row = None
        self.data_level_path = None
        self.mount_point = None
        self.plot_meta = None
        self.time_stamps = None
        self.component_trace_index = None


    @property
    def axial_primary_peak_amplitude(self):
        return self.df_dict['axial_primary_peak_amplitude']
    @property
    def axial_primary_peak_sample(self):
        return self.df_dict['axial_primary_peak_sample']
    @property
    def amplitude_ratio(self):
        return self.df_dict['axial_multiple_peak_amplitude'] / self.axial_primary_peak_amplitude

    @property
    def amplitude_ratio_sample(self):
        return self.df_dict['axial_multiple_peak_sample'] / self.df_dict['axial_primary_peak_sample']
    @property
    def reflection_coefficient(self):
        return (1.0 - self.amplitude_ratio) / (1.0 + self.amplitude_ratio)

    @property
    def reflection_coefficient_sample(self):
        return (1.0 - self.amplitude_ratio_sample) / (1.0 + self.amplitude_ratio_sample)

    @property
    def primary_wavelet_width(self):
        return (self.df_dict['axial_primary_zero_crossing_after'] - self.df_dict['axial_primary_zero_crossing_prior'])
    @property
    def multiple_wavelet_width(self):
        return (self.df_dict['axial_multiple_zero_crossing_after'] - self.df_dict['axial_multiple_zero_crossing_prior'])

    @property
    def primary_wavelet_width_sample(self):
        return self.df_dict['axial_primary_zero_crossing_after_sample'] - self.df_dict['axial_primary_left_trough_time']

    @property
    def arrival_time_diff(self):
        return self.df_dict['axial_multiple_peak_time'] - self.df_dict['axial_primary_peak_time']
    @property
    def arrival_time_diff_sample(self):
        return self.df_dict['axial_multiple_peak_time_sample'] - self.df_dict['axial_primary_peak_time_sample']

    @property
    def pseudo_ucs_sample(self):
        return np.sqrt(self.axial_primary_peak_sample)
    @property
    def primary_pseudo_velocity_sample(self):
        return 1. / self.primary_wavelet_width_sample

    @property
    def axial_velocity_delay(self):
        return self.df_dict['axial_velocity_delay']

    @property
    def primary_pseudo_density_sample(self):
        return 1e6 * self.reflection_coefficient_sample / self.primary_pseudo_velocity_sample**2

    @property
    def tangential_primary_peak_sample(self):
        return self.df_dict['tangential_primary_peak_sample']

    @property
    def tangential_primary_peak_time_sample(self):
        return self.df_dict['tangential_primary_peak_time_sample']

    @property
    def tangential_amplitude_ratio_sample(self):
        return self.df_dict['tangential_multiple_peak_sample'] / self.df_dict['tangential_primary_peak_sample']

    @property
    def tangential_reflection_coefficient_sample(self):
        return (1.0 - self.tangential_amplitude_ratio_sample) / (1.0 + self.tangential_amplitude_ratio_sample)

    @property
    def tangential_velocity_delay(self):
        return self.df_dict['tangential_velocity_delay']