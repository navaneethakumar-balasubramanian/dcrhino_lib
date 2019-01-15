# -*- coding: utf-8 -*-
"""
Created on Wed Dec 12 13:47:45 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
import numpy as np
#import os
import pdb

from dcrhino.analysis.signal_processing.seismic_processing import pick_max_from_trace_using_polyfit

def get_tangential_despike_filtered_trace_features(trace_data, global_config,
                                                   component='tangential',
                                                   sanity_check_plot=False):
    """
    trace_data is trimmed, and primary is approximately in the center
    Start with a wide, estimated primary window (~4ms, or 16 samples wide)
    look left and right of the trace (expected at the center) by 1.25ms

    @returns: dictionary keyed by feature labels
    For now these are:
        primary_time_poly, primary_amplitude_poly, multiple1_time_poly, multiple1_ampltiude_poly

    @note: takes global_config as argument, but really only needs:
        dt, min_lag_trimmed_trace, primary_window_halfwidth_ms, sensor_distance_to_source

    """
    extractor_label = '1810'
    #<initialize feature dictionary>
    feature_labels = ['primary_time_poly', 'primary_amplitude_poly',
                      'multiple1_time_poly', 'multiple1_amplitude_poly']
    feature_labels = ['{}_{}'.format(component, x) for x in feature_labels]
    features = {}
    for feature_label in feature_labels:
        features[feature_label] = np.nan
    #</initialize feature dictionary>

    #<PRIMARY>
    print("WARNING: polyfit_primary_window_halfwidth_samples should be in config file, \
          and possibly component dependent??")
    polyfit_primary_window_halfwidth_samples = 2 #half the positive half-sine

    time_axis = global_config.dt * np.arange(len(trace_data)) + global_config.min_lag_trimmed_trace
    expected_center_of_trace_index = len(trace_data) // 2
    print("WARNING: primary_window_halfwidth_ms should be component dependent??")
    #we expect primary_window_halfwidth_ms=2.0 during dev
    primary_window_halfwidth_samples = int(0.001 * global_config.primary_window_halfwidth_ms / global_config.dt)
    primary_neighborhood_edge_indices = np.array([expected_center_of_trace_index - primary_window_halfwidth_samples,
                                     expected_center_of_trace_index + primary_window_halfwidth_samples])

    t_max_primary, max_poly_amplitude_primary = pick_max_from_trace_using_polyfit(trace_data, time_axis,
                                                                  primary_neighborhood_edge_indices,
                                                                  polyfit_primary_window_halfwidth_samples,
                                                                  sanity_check_plot=sanity_check_plot)

    features['{}_primary_amplitude_poly'.format(component)] = max_poly_amplitude_primary
    features['{}_primary_time_poly'.format(component)] = t_max_primary
    #</PRIMARY>

    #<MULTIPLE>
    #the multiple without phase rotation is exepcted to be rotated by 90degrees
    #so looking for peak here actually has an asymmetery
    expected_multiple_time  = 2 * (global_config.sensor_distance_to_source / global_config.SHEAR_VELOCITY)
    multiple_offset_samples = int(expected_multiple_time / global_config.dt)
    expected_near_multiple_index = expected_center_of_trace_index + multiple_offset_samples

    print("WARNING: tangential_mult1_window_halfwidth_ms should be in config file, and possibly component dependent??")
    #tangential_mult1_window_halfwidth_ms = 2.0;
    look_left_ms = 2.5
    look_right_ms = 1.0
    #look_left_ms = tangential_mult1_window_halfwidth_ms;
    #look_right_ms = tangential_mult1_window_halfwidth_ms;
    look_left_index = -int(0.001 * look_left_ms/global_config.dt)
    look_right_index = int(0.001 * look_right_ms/global_config.dt)

    multiple_neighborhood_edge_indices = np.array([look_left_index, look_right_index]) + expected_near_multiple_index
    polyfit_multiple_window_halfwidth_in_samples = 2 #half the positive half-sine

    t_max_mult1, max_poly_amplitude_mult1 = pick_max_from_trace_using_polyfit(trace_data, time_axis,
                                                                  multiple_neighborhood_edge_indices,
                                                                  polyfit_multiple_window_halfwidth_in_samples,
                                                                  sanity_check_plot=sanity_check_plot)

    features['{}_multiple1_amplitude_poly'.format(component)] = max_poly_amplitude_mult1
    features['{}_multiple1_time_poly'.format(component)] = t_max_mult1
    #</MULTIPLE>


    features['tangential_amplitude_ratio'] =  np.sqrt( features['tangential_multiple1_amplitude_poly'] / features['tangential_primary_amplitude_poly'])
    features['tangential_impedance']  = (1 - features['tangential_amplitude_ratio'] ) / (1 + features['tangential_amplitude_ratio'] )
    features['tangential_delay']  = features['tangential_multiple1_time_poly'] - features['tangential_primary_time_poly']
    for key in features.keys():
        features['{}_{}'.format(extractor_label, key)] = features.pop('{}'.format(key))

    return features


def my_function():
    """
    """
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
