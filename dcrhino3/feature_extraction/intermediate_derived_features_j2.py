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

.. todo:: 20190403: factor this into an axial and a tangential function that takes
component_id on __init__
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

#<Axial>
    @property
    def axial_primary_peak(self):
        """
        axial_primary_peak_feature <-- get from a control argument
        """
        peak_feature = 'integrated_absolute_amplitude'
        peak_label = 'axial-primary-{}'.format(peak_feature)
        return self.df_dict[peak_label]


    @property
    def axial_multiple_1_peak(self):
        """
        axial_multiple_1_peak_feature <-- get from a control argument
        """
        peak_feature = 'integrated_absolute_amplitude'#axial_multiple_1_peak_feature
        peak_label = 'axial-multiple_1-{}'.format(peak_feature)
        return self.df_dict[peak_label]

    @property
    def axial_multiple_2_peak(self):
        """
        axial_multiple_2_peak_feature <-- get from a control argument
        """
        peak_feature = 'integrated_absolute_amplitude'#axial_multiple_1_peak_feature
        peak_label = 'axial-multiple_2-{}'.format(peak_feature)
        return self.df_dict[peak_label]


    @property
    def axial_primary_time(self):
        """
        axial_primary_time_feature <-- get from a control argument
        default: 'max_time'
        """
        feature = 'max_time'
        full_label = 'axial-primary-{}'.format(feature)
        return self.df_dict[full_label]

    @property
    def axial_multiple_1_time(self):
        """
        axial_multiple_1_time_feature <-- get from a control argument
        default: 'zero_crossing_time'
        """
        feature = 'zero_crossing_time'
        full_label = 'axial-multiple_1-{}'.format(feature)
        return self.df_dict[full_label]

    @property
    def axial_multiple_2_time(self):
        """
        axial_multiple_1_time_feature <-- get from a control argument
        default: 'min_time'
        """
        feature = 'min_time'
        full_label = 'axial-multiple_2-{}'.format(feature)
        return self.df_dict[full_label]


    @property
    def axial_amplitude_ratio_1(self):
        return self.axial_multiple_1_peak / self.axial_primary_peak

    @property
    def axial_amplitude_ratio_2(self):
        return self.axial_multiple_2_peak / self.axial_multiple_1_peak

    @property
    def axial_reflection_coefficient_1(self):
        return (1.0 - self.axial_amplitude_ratio_1) / (1.0 + self.axial_amplitude_ratio_1)

    @property
    def axial_reflection_coefficient_2(self):
        return (1.0 - self.axial_amplitude_ratio_2) / (1.0 + self.axial_amplitude_ratio_2)

    @property
    def axial_delay_1(self):
        #self.axial_multiple_1_peak
        return self.axial_multiple_1_time - self.axial_primary_time

    @property
    def axial_delay_2(self):
        return self.axial_multiple_2_time - self.axial_multiple_1_time
#        return self.df_dict['axial_multiple_2_max_time'] - self.df_dict['axial_multiple_1_max_time']

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

##################################################################################
#</Axial>


#<Tangential>

    @property
    def tangential_primary_peak(self):
        """
        tangential_primary_peak_feature <-- get from a control argument
        """
        peak_feature = 'integrated_absolute_amplitude'
        peak_label = 'tangential-primary-{}'.format(peak_feature)
        return self.df_dict[peak_label]


    @property
    def tangential_multiple_1_peak(self):
        """
        tangential_multiple_1_peak_feature <-- get from a control argument
        """
        peak_feature = 'integrated_absolute_amplitude'#tangential_multiple_1_peak_feature
        peak_label = 'tangential-multiple_1-{}'.format(peak_feature)
        return self.df_dict[peak_label]

    @property
    def tangential_multiple_2_peak(self):
        """
        tangential_multiple_2_peak_feature <-- get from a control argument
        """
        peak_feature = 'integrated_absolute_amplitude'#tangential_multiple_1_peak_feature
        peak_label = 'tangential-multiple_2-{}'.format(peak_feature)
        return self.df_dict[peak_label]


    @property
    def tangential_primary_time(self):
        """
        tangential_primary_time_feature <-- get from a control argument
        default: 'max_time'
        """
        feature = 'max_time'
        full_label = 'tangential-primary-{}'.format(feature)
        return self.df_dict[full_label]

    @property
    def tangential_multiple_1_time(self):
        """
        tangential_multiple_1_time_feature <-- get from a control argument
        default: 'zero_crossing_time'
        """
        feature = 'zero_crossing_time'
        full_label = 'tangential-multiple_1-{}'.format(feature)
        return self.df_dict[full_label]

    @property
    def tangential_multiple_2_time(self):
        """
        tangential_multiple_1_time_feature <-- get from a control argument
        default: 'min_time'
        """
        feature = 'min_time'
        full_label = 'tangential-multiple_2-{}'.format(feature)
        return self.df_dict[full_label]

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
                self.df_dict['axial-reflection_coefficient_2'] = self.axial_reflection_coefficient_2
            except:

                logger.warn("Couldnt calculate axial-reflection_coefficient_2")
            self.df_dict['axial-delay_1'] = self.axial_delay_1

        elif component_id == 'tangential':

            self.df_dict['tangential-reflection_coefficient_1'] = self.tangential_reflection_coefficient_1
            try:
                self.df_dict['tangential-reflection_coefficient_2'] = self.tangential_reflection_coefficient_2
            except:
                logger.warn("Couldnt calculate tangential_reflection_coefficient_2")

            self.df_dict['tangential-delay_1'] = self.tangential_delay_1
            self.df_dict['tangential-pseudo_velocity_1'] = self.tangential_pseudo_velocity_1

        return self.df_dict
