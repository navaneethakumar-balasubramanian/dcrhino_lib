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
    def __init__(self, component_id, df_dict=None):#, df):
        """
        """
        self.df_dict = df_dict
        self.component_id = component_id


    @property
    def primary_peak(self):
        """
        primary_peak_feature <-- get from a control argument
        """
        peak_feature = 'integrated_absolute_amplitude'
        peak_label = '{}-primary-{}'.format(self.component_id, peak_feature)
        return self.df_dict[peak_label]


    @property
    def multiple_1_peak(self):
        """
        multiple_1_peak_feature <-- get from a control argument
        """
        peak_feature = 'integrated_absolute_amplitude'#axial_multiple_1_peak_feature
        peak_label = '{}-multiple_1-{}'.format(self.component_id, peak_feature)
        return self.df_dict[peak_label]

    @property
    def multiple_2_peak(self):
        """
        multiple_2_peak_feature <-- get from a control argument
        """
        peak_feature = 'integrated_absolute_amplitude'#axial_multiple_1_peak_feature
        peak_label = '{}-multiple_2-{}'.format(self.component_id, peak_feature)
        return self.df_dict[peak_label]


    @property
    def primary_time(self):
        """
        primary_time_feature <-- get from a control argument
        default: 'max_time'
        """
        feature = 'max_time'
        full_label = '{}-primary-{}'.format(self.component_id, feature)
        return self.df_dict[full_label]

    @property
    def multiple_1_time(self):
        """
        multiple_1_time_feature <-- get from a control argument
        default: 'zero_crossing_time'
        """
        feature = 'zero_crossing_time'
        full_label = '{}-multiple_1-{}'.format(self.component_id, feature)
        return self.df_dict[full_label]

    @property
    def multiple_2_time(self):
        """
        multiple_1_time_feature <-- get from a control argument
        default: 'min_time'
        """
        feature = 'min_time'
        full_label = '{}-multiple_2-{}'.format(self.component_id, feature)
        return self.df_dict[full_label]


    @property
    def amplitude_ratio_1(self):
        return self.multiple_1_peak / self.primary_peak

    @property
    def amplitude_ratio_2(self):
        return self.multiple_2_peak / self.multiple_1_peak

    @property
    def reflection_coefficient_1(self):
        return (1.0 - self.amplitude_ratio_1) / (1.0 + self.amplitude_ratio_1)

    @property
    def reflection_coefficient_2(self):
        return (1.0 - self.amplitude_ratio_2) / (1.0 + self.amplitude_ratio_2)

    @property
    def delay_1(self):
        #self.axial_multiple_1_peak
        return self.multiple_1_time - self.primary_time

    @property
    def delay_2(self):
        return self.multiple_2_time - self.multiple_1_time

    @property
    def pseudo_velocity_1(self):
        return 1. / self.delay_1
        #return 1. / self.primary_wavelet_width

    @property
    def pseudo_velocity_2(self):
        return 1. / self.delay_2


#<AXIAL_ONLY>
    @property
    def pseudo_ucs(self):
        return np.sqrt(self.primary_peak)


    @property
    def pseudo_density(self):
        return 1e6 * self.reflection_coefficient_1 / self.pseudo_velocity_1**2
#</AXIAL_ONLY>

##################################################################################
#</Axial>






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
            self.df_dict['axial-pseudo_velocity_1'] = self.pseudo_velocity_1
            self.df_dict['pseudo_density'] = self.pseudo_density
            self.df_dict['axial-reflection_coefficient_1'] = self.reflection_coefficient_1
            try:
                self.df_dict['axial-reflection_coefficient_2'] = self.reflection_coefficient_2
            except:

                logger.warn("Couldnt calculate axial-reflection_coefficient_2")
            self.df_dict['axial-delay_1'] = self.delay_1

        elif component_id == 'tangential':

            self.df_dict['tangential-reflection_coefficient_1'] = self.reflection_coefficient_1
            try:
                self.df_dict['tangential-reflection_coefficient_2'] = self.reflection_coefficient_2
            except:
                logger.warn("Couldnt calculate tangential-reflection_coefficient_2")

            self.df_dict['tangential-delay_1'] = self.delay_1
            self.df_dict['tangential-pseudo_velocity_1'] = self.pseudo_velocity_1

        return self.df_dict
