"""
Author: kkappler

.. todo:: 20190220: The features extracted here are not pulled directly from wavelets, so
    we refer to them as derived features rather than 'direct' features.  THey
    will in future versions of the rhino software be superceded log processing,
    and possibly reinstututed once log-processing and calibrations are better understood.

.. <old stuff>
    #    @property
    #    def primary_wavelet_width(self):
    #        return (self.df_dict['axial_primary_zero_crossing_after'] - self.df_dict['axial_primary_zero_crossing_prior'])
    #    @property
    #    def multiple_wavelet_width(self):
    #        return (self.df_dict['axial_multiple_zero_crossing_after'] - self.df_dict['axial_multiple_zero_crossing_prior'])
    </old stuff>
"""
import numpy as np
import pandas as pd
import pdb


from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)


class IntermediateFeatureDeriver(object):
    """
    Derives the following features:
        
        + axial_primary_peak
        + axial_amplitude_ratio_1
        + axial_amplitude_ratio_2
        + axial_reflection_coefficient_1
        + axial_reflection_coefficient_2
        + axial_delay_1
        + axial_delay_2
        + axial_pseudo_velocity_1
        + axial_pseudo_velocity_2
        + pseudo_ucs
        + pseudo_density
        + tangential_primary_peak
        + tangential_primary_peak_time
        + tangential_delay_1
        + tangential_delay_2
        + tangential_amplitude_ratio_1
        + tangential_amplitude_ratio_2
        + tangential_reflection_coefficient_1
        + tangential_reflection_coefficient_2
        + tangential_pseudo_velocity_1
        
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
    def axial_amplitude_ratio_1(self):
        return self.df_dict['axial_multiple_1_max_amplitude'] / self.axial_primary_peak

    @property
    def axial_amplitude_ratio_2(self):
        return self.df_dict['axial_multiple_2_max_amplitude'] / self.df_dict['axial_multiple_1_max_amplitude']

    @property
    def axial_reflection_coefficient_1(self):
        return (1.0 - self.axial_amplitude_ratio_1) / (1.0 + self.axial_amplitude_ratio_1)

    @property
    def axial_reflection_coefficient_2(self):
        return (1.0 - self.axial_amplitude_ratio_2) / (1.0 + self.axial_amplitude_ratio_2)

    @property
    def axial_delay_1(self):
        return self.df_dict['axial_multiple_1_max_time'] - self.df_dict['axial_primary_max_time']

    @property
    def axial_delay_2(self):
        return self.df_dict['axial_multiple_2_max_time'] - self.df_dict['axial_multiple_1_max_time']

    @property
    def axial_pseudo_velocity_1(self):
        return 1. / self.axial_delay_1
        #return 1. / self.primary_wavelet_width

    @property
    def axial_pseudo_velocity_2(self):
        return 1. / self.axial_delay_2
        #return 1. / self.primary_wavelet_width

    @property
    def pseudo_ucs(self):
        return np.sqrt(self.axial_primary_peak)


    @property
    def pseudo_density(self):
        return 1e6 * self.axial_reflection_coefficient_1 / self.axial_pseudo_velocity_1**2



    @property
    def tangential_primary_peak(self):
        return self.df_dict['tangential_primary_max_amplitude']

    @property
    def tangential_primary_peak_time(self):
        return self.df_dict['tangential_primary_max_time']

    @property
    def tangential_delay_1(self):
        return self.df_dict['tangential_multiple_1_max_time'] - self.tangential_primary_peak_time

    @property
    def tangential_delay_2(self):
        return self.df_dict['tangential_multiple_2_max_time'] - self.df_dict['tangential_multiple_1_max_time']

    @property
    def tangential_amplitude_ratio_1(self):
        return self.df_dict['tangential_multiple_1_max_amplitude'] / self.tangential_primary_peak

    @property
    def tangential_amplitude_ratio_2(self):
        return self.df_dict['tangential_multiple_2_max_amplitude'] / self.df_dict['tangential_multiple_3_max_amplitude']

    @property
    def tangential_reflection_coefficient_1(self):
        return (1.0 - self.tangential_amplitude_ratio_1) / (1.0 + self.tangential_amplitude_ratio_1)

    @property
    def tangential_reflection_coefficient_2(self):
        return (1.0 - self.tangential_amplitude_ratio_2) / (1.0 + self.tangential_amplitude_ratio_2)

    @property
    def tangential_pseudo_velocity_1(self):
        return 1.0 / self.tangential_delay_1



    def derive_features(self, component_id):
        """
        Store certain features in dictionary, based on component_id.
        
        Parameters:
            component_id (str): axial/tangential
            
        Returns:
            (dict): derived features
            
                For axial:
                    
                    + pseudo ucs
                    + axial pseudo velocity 1
                    + pseudo density
                    + axial reflection coeff
                    
                For tangential:
                    
                    + tangential reflection coeff 1
                    + tangential reflection coeff 2
                    + tangential delay 1
                    + tangential pseudo velocity 1
        """
        if component_id == 'axial':
            self.df_dict['pseudo_ucs'] = self.pseudo_ucs
            self.df_dict['axial_pseudo_velocity_1'] = self.axial_pseudo_velocity_1
            self.df_dict['pseudo_density'] = self.pseudo_density
            self.df_dict['axial_reflection_coefficient_1'] = self.axial_reflection_coefficient_1
            try:
                self.df_dict['axial_reflection_coefficient_2'] = self.axial_reflection_coefficient_2
            except:
                logger.warn("Couldnt calculate axial_reflection_coefficient_2")
            self.df_dict['axial_delay_1'] = self.axial_delay_1

        elif component_id == 'tangential':

            self.df_dict['tangential_reflection_coefficient_1'] = self.tangential_reflection_coefficient_1
            try:
                self.df_dict['tangential_reflection_coefficient_2'] = self.tangential_reflection_coefficient_2
            except:
                logger.warn("Couldnt calculate tangential_reflection_coefficient_2")

            self.df_dict['tangential_delay_1'] = self.tangential_delay_1
            self.df_dict['tangential_pseudo_velocity_1'] = self.tangential_pseudo_velocity_1

        return self.df_dict
