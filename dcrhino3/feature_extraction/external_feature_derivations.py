# -*- coding: utf-8 -*-
"""
Created on Tue Dec 18 19:29:08 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

original_feature_prepend_id_string = ''

class DerivedFeatureExtractorV0(object):
    """
    Takes as input the extracted features dataframe (or csv-loads)
    and calcualtes the derived features;
    May factor this into axial, tangential but for now do as all-one
    a_delay
    a_dens
    a_mod
    a_reflection_coefficient
    a_vel
    a_str
    c_modulus
    c_strength
    c_velocity
    density
    Error_Flag
    hole_id
    QC_FLAG
    s_modulus
    s_velocity
    t_delay
    t_mod
    t_reflection_coef
    a_delay:  a_delay = axial_multiple_peak_time_sample - axial_primary_peak_time_sample

    This formula resulted in a ‘blocky’ looking log because the sample-granularity
    that was applied resulted in only a few discrete values being observed.
    Variation over a blasthole was often only observed to have three or four
    distinct values.  When smoothing was applied to these logs they looked
    somewhat plausible.  We can reduce the blockyness by using
    axial_multiple_peak_time_poly, and axial_primary_peak_time_poly, i.e.
    the polyfit critical points rather than those at sample granularity.

    a_dens:  a_reflection_coef / a_vel^2
    Previously known as “pseudo_density”, we have been calculating it as:
    a_dens = reflection_coefficient_sample / primary_pseudo_velocity_sample**2
    Where the primary_pseudo_velocity_sample = 1. / self.primary_wavelet_width_sample
    Which can be expressed as
    a_dens = reflection_coefficient_sample * self.primary_wavelet_width_sample**2
    N.B.: this used primary_wavelet_width_sample which has been suggested is not a valid measurement:  For the record:
    primary_wavelet_width_sample = axial_primary_zero_crossing_after_sample - axial_primary_left_trough_time

    a_mod:  k1 * a_reflection_coef
    Not previously calculated, just plotted as reflection_coef, i.e. k1=1.0;
    k1 a constant to be determined; may depend on MWD

    a_reflection_coef: (1-R) / (1+R)
    where R is the multiple-to-primary-amplitude ratio (axial)

    a_str:  sqrt(self.axial_primary_peak_sample)
    Previously known as pseudo_ucs;  We looked at logs of this quantity with
    _sample resolution vs _poly (polynomail fit) and found little difference to
    first order behaviour.

    a_vel:  1 / a_delay
    This is the “delay velocity”.  It is the one that has been ‘blocky’ in the past

    c_density:  This will be some scaled version of a_dens, for now we set equal to a_dens
    c_modulus:  This will be some scaled version of a_mod, for now we set equal to a_mod
    c_strength:  This will be some scaled version of a_str, for now we set equal to a_str
    c_velocity:  This will be some scaled version of a_vel, for now we set equal to a_vel

    t_delay:   tangential_delay = tangential_multiple1_time_poly - tangential_primary_time_poly
    Here we are using polynomial fits so we are not so ‘blocky’.  The label for this feature is 1810_tangential_delay

    t_mod:  k2 * t_reflection_coef
    Not previously calculated, k2 a constant to be determined; may depend on MWD

    t_reflection_coef: (1-R) / (1+R) where R is the multiple-to-primary-amplitude ratio (tangential)

    tangential_amplitude_ratio' =  features['tangential_multiple1_amplitude_poly'] / 'tangential_primary_amplitude_poly']

    t_vel:  1 / t_delay

    s_modulus: This will be some scaled version of t_mod, for now we set equal to t_mod

    s_velocity :This will be some scaled version of s_vel, for now we set equal to s_vel


    """
    def __init__(self, df):
        """
        Parameters:
            df (dataframe): the dataframe containing exctracted features

        """
        self.df = df

    @property
    def a_delay(self):
        """
        Calculates the time delay between axial primary peak and axial multiple
        peak. This is the “delay velocity”.  It is the one that has been
        ‘blocky’ in the past

        Parameters:
            None

        Other Parameters:
            feature version (str): version of extractor deriver (here: 'J0')
            axial_primary_peak_time_sample (float): time of the axial
                primary peak from dataframe "df"
            axial_multiple_peak_time_sample (float): time of the axial
                multiple peak from datafram "df"

        Returns:
            (float): **a_delay**, the time delay between axial primary peak and
                multiple peak


        .. note:: In v1 this feature was calculated in direct features;
            extracted_features_df['axial_delay'] =
            extracted_features_df['axial_multiple_peak_time_sample'] -
            extracted_features_df['axial_primary_peak_time_sample']
            Now we calc as a derived feature.

        """
        feature_version = 'J0'
        try:
            primary_time = self.df['{}_axial_primary_max_time'.format(feature_version)]
            mulitple_time = self.df['{}_axial_multiple_max_time'.format(feature_version)]
        except KeyError:
            primary_time = self.df['axial_primary_peak_time_sample']
            mulitple_time = self.df['axial_multiple_peak_time_sample']
        a_delay = mulitple_time - primary_time
        return a_delay

    @property
    def a_amplitude_ratio(self):
        """
        Calculates the ratio between the primary peak amplitude and the
        multiple peak amplitude.

        Parameters:
            None

        Other Parameters:
            feature version (str): version of extractor deriver (here: 'J0')
            axial_primary_peak_sample (float): value of primary peak amplitude
                from dataframe "df"
            axial_multiple_peak_sample (float): value of multiple peak amplitude
                from dataframe "df"

        Returns
            (float): **a_amplitude_ratio**, the ratio between the primary peak
            amplitude and the multiple peak amplitude
        """
        feature_version = 'J0'
        try:
            primary_amplitude = self.df['{}_axial_primary_peak_sample'.format(feature_version)]
            mulitple_amplitude = self.df['{}_axial_multiple_peak_sample'.format(feature_version)]
        except KeyError:
            primary_amplitude = self.df['axial_primary_peak_sample']
            mulitple_amplitude = self.df['axial_multiple_peak_sample']

        a_amplitude_ratio = mulitple_amplitude / primary_amplitude
        return a_amplitude_ratio


    @property
    def a_str(self):
        """
        Calculates the square root of the axial primary peak amplitude. Previously
        known as pseudo_ucs;  We looked at logs of this quantity with _sample
        resolution vs _poly (polynomail fit) and found little difference to
        first order behaviour.

        Parameters:
            None

        Other Parameters:
            feature version (str): version of extractor deriver (here: 'J0')
            axial_primary_peak_sample (float): the primary peak amplitude from
                the dataframe "df"

        Returns:
            (float): **a_str**, the sqrt of the axial primary peak amplitude
        """
        feature_version = 'J0'
        try:
            primary_amplitude = self.df['{}_axial_primary_peak_sample'.format(feature_version)]
        except KeyError:
            primary_amplitude = self.df['axial_primary_peak_sample']
        a_str = np.sqrt(primary_amplitude)
        return a_str

    @property
    def a_vel(self):
        """
        Calculates the relative velocity of the axial wave using the inverse of
        a_delay. This is the “delay velocity”.  It is the one that has been ‘blocky’
        in the past

         |  a_vel:  1 / a_delay

        Parameters:
            None

        Other Parameters:
            feature version (str): version of extractor deriver (here: 'J0')
            a_delay (float): calculated in :meth:`~feature_derivations.DerivedFeatureExtractorV0.a_delay`

        Returns:
            (float): **a_vel**, the delay velocity calculated from the axial component

        .. warning:: This does not take into account the distance from instrument
            to tip, so this is not absolute velocity

        """
        a_vel = 1. / self.a_delay
        return a_vel



    @property
    def a_reflection_coef(self):
        """
        Calculates the reflection coefficient between the drill/rock interface
        from the axial primary and multiple peaks.


        |   a_reflection_coef: (1-R) / (1+R)

        Where R is the multiple-to-primary-amplitude ratio (axial)

        Parameters:
            None

        Other Parameters:
            a_amplitude_ratio (float): calculated in :meth:`~feature_derivations.DerivedFeatureExtractorV0.a_amplitude_ratio`

        Returns:
            (float): the reflection coefficient from axial component features

        """
        return (1.0 - self.a_amplitude_ratio / (1.0 + self.a_amplitude_ratio))

    @property
    def a_mod(self):
        """
        Scales the reflection coefficient based on drill setup to find modulus,

        |   a_mod = k1 * a_reflection_coef.

        Not previously calculated, just plotted as reflection_coef, i.e. k1=1.0;
        k1 a constant to be determined; may depend on MWD.

        Parameters:
            None

        Other Parameters:
            a_reflection_coef (float): calculated in :meth:`~feature_derivations.DerivedFeatureExtractorV0.a_reflection_coef`

        Returns:
            (float): **a_mod**, the modulus from axial component features

        """
        scale_factor = 1.0
        a_mod = scale_factor * self.a_reflection_coef
        return a_mod

    @property
    def a_dens(self):
        """
        Calculates density of rock based on reflection coefficient and velocity,
        Previously known as “pseudo_density”.

        | We have been calculating it as:
        |   a_dens = reflection_coefficient_sample / primary_pseudo_velocity_sample**2

        | Which can be expressed as:
        |   a_dens = reflection_coefficient_sample * self.primary_wavelet_width_sample**2

        | N.B.: this used primary_wavelet_width_sample which has been suggested is not a valid measurement.
        | For the record:
        |   primary_wavelet_width_sample = axial_primary_zero_crossing_after_sample - axial_primary_left_trough_time

        Parameters:
            None

        Other Parameters:
            a_reflection_coef (float): calculated in :meth:`~feature_derivations.DerivedFeatureExtractorV0.a_reflection_coef`
            a_vel (float): calculated in :meth:`~feature_derivations.DerivedFeatureExtractorV0.a_vel`

        Returns:
            (float): the derived density of the rock surrounding drill head

        """
        return 1e6 * self.a_reflection_coef / (self.a_vel)**2

    @property
    def c_density(self):
        """
        .. todo:: 20181224 This will be some scaled version of a_dens, for now we set equal to a_dens
        """
        c_density_scale_factor = 1.0
        c_density = c_density_scale_factor * self.a_dens
        return c_density

    @property
    def c_modulus(self):
        """
        .. todo:: 20181224 This will be some scaled version of a_mod, for now we set equal to a_mod
        """
        c_modulus_scale_factor = 1.0
        c_modulus = c_modulus_scale_factor * self.a_mod
        return c_modulus

    @property
    def c_strength(self):
        """
        .. todo:: 20181224 This will be some scaled version of a_str, for now we set equal to a_str
        """
        c_strength_scale_factor = 1.0
        c_strength = c_strength_scale_factor * self.a_str
        return c_strength

    @property
    def c_velocity(self):
        """
        .. todo:: 20181224 This will be some scaled version of a_vel, for now we set equal to a_vel
        """
        c_velocity_scale_factor = 1.0
        c_velocity = c_velocity_scale_factor * self.a_vel
        return c_velocity



    @property
    def t_delay(self):
        """
        Calculates the tangential time delay between the arrival of the primary peak
        and the multiple peak. Here we are using polynomial fits so we are not
        so ‘blocky’.  The label for this feature is 1810_tangential_delay.

            |   tangential_delay = tangential_multiple1_time_poly - tangential_primary_time_poly

        Parameters:
            None

        Other Parameters:
            1810_tangential_primary_time_poly (float): arrival time of the primary
                peak along the tangential component
            1810_tangential_multiple1_time_poly (float): arrival time of the first
                multiple peak along the tangential component

        Returns:
            (float): **t_delay**, the time betweent the arrival of the primary
                and first multiple peaks along the tangential component.

        """
        t_delay = self.df['1810_tangential_multiple1_time_poly'] - self.df['1810_tangential_primary_time_poly']
        return t_delay

    @property
    def t_amplitude_ratio(self):
        """
        Calculates the ratio between the primary peak amplitude and the
        multiple peak amplitude on the tangential component.

            |   tangential_amplitude_ratio =  'tangential_multiple1_amplitude_poly' / 'tangential_primary_amplitude_poly'

        Parameters:
            None

        Other Parameters:
            feature version (str): version of extractor deriver (here: '1810')
            tangential_primary_amplitude_poly (float): value of primary peak amplitude
                from dataframe "df"
            tangential_multiple1_amplitude_poly (float): value of multiple peak amplitude
                from dataframe "df"

        Returns
            (float): **t_amplitude_ratio**, the ratio between the primary peak
            amplitude and the multiple peak amplitude

        .. note:: This was calculated in the 1810 features, but because it is not a derived
            quantity I would rather calculate it here.

        .. note:: 1810 features were applying a square root to the amplitude ratio;
            fixed here.

        """
        feature_version = '1810'
        numerator_label = '{}_tangential_multiple1_amplitude_poly'.format(feature_version)
        denominator_label = '{}_tangential_primary_amplitude_poly'.format(feature_version)
        t_amplitude_ratio = self.df[numerator_label] / self.df[denominator_label]
        return t_amplitude_ratio

    @property
    def t_reflection_coef(self):
        """
        Calculates the reflection coefficient between the drill/rock interface
        from the tangential primary and multiple peaks.

            |   t_reflection_coef: (1-R) / (1+R)

        Where R is the multiple-to-primary-amplitude ratio (tangential)

        Parameters:
            None

        Other Parameters:
            t_amplitude_ratio (float): calculated in :meth:`~feature_derivations.DerivedFeatureExtractorV0.t_amplitude_ratio`

        Returns:
            (float): the reflection coefficient from tangential component features

        """
        t_reflection_coef = (1.0 - self.t_amplitude_ratio) / (1.0 + self.t_amplitude_ratio)
        return t_reflection_coef

    @property
    def t_mod(self):
        """
        Scales the reflection coefficient based on drill setup to find modulus,

            |   t_mod:  k2 * t_reflection_coef


        Not previously calculated, just plotted as reflection_coef, i.e. k1=1.0;
        k2 a constant to be determined; may depend on MWD.

        Parameters:
            None

        Other Parameters:
            t_reflection_coef (float): calculated in :meth:`~feature_derivations.DerivedFeatureExtractorV0.t_reflection_coef`

        Returns:
            (float): **t_mod**, the modulus from tangential component features

        """
        scale_factor = 1.0
        #pdb.set_trace()
        t_mod = scale_factor * self.t_reflection_coef
        return t_mod

    @property
    def t_vel(self):
        """
        Calculates the relative velocity of the tangential wave using the inverse of
        t_delay. This is the “delay velocity”.  It is the one that has been ‘blocky’
        in the past

            |   t_vel:  1 / t_delay

        Parameters:
            None

        Other Parameters:
            t_delay (float): calculated in :meth:`~feature_derivations.DerivedFeatureExtractorV0.t_delay`

        Returns:
            (float): **t_vel**, the delay velocity calculated from the tangential component

        .. warning:: This does not take into account the distance from instrument
            to tip, so this is not absolute velocity but delay velocity

        """
        t_vel = 1. / self.t_delay
        return t_vel

    @property
    def s_modulus(self):
        """
        .. todo:: 20181224 This will be some scaled version of t_mod, for now we set equal to t_mod
        """
        s_modulus_scale_factor = 1.0
        s_modulus = s_modulus_scale_factor * self.t_mod
        return s_modulus


    @property
    def s_velocity(self):
        """
        .. todo:: 20181224 This will be some scaled version of t_vel, for now we set equal to t_vel
        """

        s_velocity_scale_factor = 1.0
        s_velocity = s_velocity_scale_factor * self.t_vel
        return s_velocity


def extracted_features_df_to_external_features(extracted_features):
    """
    Consolidates derived features and adds them to already extracted features.

    Parameters:
        extracted_features (dataframe): the features extracted prior to derived features

    Other Parameters:
        a_delay (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.a_delay`
        a_dens (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.a_dens`
        a_mod (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.a_mod`
        a_reflection_coef (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.a_reflection_coef`
        a_vel (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.a_vel`
        c_modulus (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.c_modulus`
        c_strength (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.c_strength`
        c_velocity (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.c_velocity`
        c_density (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.c_density`
        t_delay (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.t_delay`
        t_mod (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.t_mod`
        t_reflection_coef (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.t_reflection_coef`
        s_modulus (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.s_modulus`
        s_velocity (float):
            found here :meth:`~feature_derivations.DerivedFeatureExtractorV0.s_velocity`

    Returns:
        (dataframe): **output_features**, dataframe of extracted features and
        derived features

    """
    a_derived_features_list = ['a_delay', 'a_dens', 'a_mod', 'a_reflection_coef',
                             'a_vel', 'a_dens']
    c_derived_features_list = ['c_modulus', 'c_strength', 'c_velocity', 'c_density']
    t_derived_features_list = ['t_delay', 't_mod', 't_reflection_coef',]
    s_derived_features_list = ['s_modulus', 's_velocity', ]

    #test_dir = '/media/kkappler/wd2018/data/datacloud/qc_test_dataset/milligan/output/0'
    #input_csv = os.path.join(test_dir, 'extracted_features.csv')
    #output_csv = os.path.join(test_dir, 'derived_features.csv')
    output_features = pd.DataFrame()
    df = extracted_features
    feature_deriver = DerivedFeatureExtractorV0(df)
    output_features['datetime'] = df['datetime']


    for feature in a_derived_features_list:
        print(feature)
        output_features[feature] = feature_deriver.__getattribute__(feature)

    for feature in c_derived_features_list:
        print(feature)
        output_features[feature] = feature_deriver.__getattribute__(feature)

    for feature in t_derived_features_list:
        print(feature)
        output_features[feature] = feature_deriver.__getattribute__(feature)
    for feature in s_derived_features_list:
        print(feature)
        output_features[feature] = feature_deriver.__getattribute__(feature)

    return output_features


def test():
    """

    """
    a_derived_features_list = ['a_delay', 'a_dens', 'a_mod', 'a_reflection_coef',
                             'a_vel', 'a_dens']
    c_derived_features_list = ['c_modulus', 'c_strength', 'c_velocity', 'c_density']
    t_derived_features_list = ['t_delay', 't_mod', 't_reflection_coef',]
    s_derived_features_list = ['s_modulus', 's_velocity', ]

    test_dir = '/media/kkappler/wd2018/data/datacloud/qc_test_dataset/milligan/output/0'
    input_csv = os.path.join(test_dir, 'extracted_features.csv')
    output_csv = os.path.join(test_dir, 'derived_features.csv')
    output_features = pd.DataFrame()
    df = pd.read_csv(input_csv)
    feature_deriver = DerivedFeatureExtractorV0(df)
    output_features['datetime'] = df['datetime']


    for feature in a_derived_features_list:
        print(feature)
        output_features[feature] = feature_deriver.__getattribute__(feature)

    for feature in c_derived_features_list:
        print(feature)
        output_features[feature] = feature_deriver.__getattribute__(feature)

    for feature in t_derived_features_list:
        print(feature)
        output_features[feature] = feature_deriver.__getattribute__(feature)
    for feature in s_derived_features_list:
        print(feature)
        output_features[feature] = feature_deriver.__getattribute__(feature)
    output_features.to_csv(output_csv)
    return

def main():
    """
    """
    test()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
