# -*- coding: utf-8 -*-
"""
Created on Tue Dec 11 in Houston at #206 - 300 St. Joseph's Parkway
Based on earlier versions from Dec 5, Dec 6
@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import pdb
import re


PRIMARY_SHIFT_AXIAL = 0.0
PRIMARY_SHIFT_TANGENTIAL = 0.0
WINDOW_BOUNDARIES_TIME = {}
WINDOW_BOUNDARIES_TIME['axial'] = {}
WINDOW_BOUNDARIES_TIME['tangential'] = {}
WINDOW_BOUNDARIES_INDICES = {}
WINDOW_BOUNDARIES_INDICES['axial'] = {}
WINDOW_BOUNDARIES_INDICES['tangential'] = {}

TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION = ['primary', 'multiple_1', 'multiple_2',
                                        'multiple_3', 'noise_1', 'noise_2']

#wavelet_feature_extractor_types = ['sample', 'polynomial', 'ricker',]


def get_expected_multiple_times(global_config, recipe='J1'):
    """
    calculates the time_intervals between resonances along the pipe for each of P and S
    waves, axial and tangential components
    """
    sensor_distance_to_bit = global_config.sensor_distance_to_source
    distance_sensor_to_shock_sub_bottom = global_config.sensor_distance_to_shocksub
    axial_velocity_steel = global_config.ACOUSTIC_VELOCITY
    shear_velocity_steel = global_config.SHEAR_VELOCITY
    if recipe=='J1':
        expected_multiple_periods = {}
        total_distance = sensor_distance_to_bit + distance_sensor_to_shock_sub_bottom
        expected_multiple_periods['axial-multiple_1'] = 2 * total_distance / axial_velocity_steel
        expected_multiple_periods['tangential-multiple_1'] = 2 * total_distance / shear_velocity_steel
        expected_multiple_periods['axial-multiple_2'] = 4 * total_distance / axial_velocity_steel
        expected_multiple_periods['tangential-multiple_2'] = 4 * total_distance / shear_velocity_steel
    return expected_multiple_periods



def set_window_boundaries_in_time(expected_multiple_periods, window_widths, component,
                                  primary_shift=0.0):
    """
    sets t0, t1, returns window bounds in seconds
    primary extends from primary_shift=0.0 to

    note: the noise_1 and noise_2 windows depend on that the multiple windows have
    been defined previously, this is handled by trace_window_labels_for_feature_extraction
    giving the multiples before the noise variables ... this is not robust.  I'm not
    sure of a better way to do this right now;

    """
    for window_label in TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION:
        if window_label == 'primary':
            #width = window_widths[component][window_label]
            width = getattr(window_widths,component).primary
            window_bounds = np.array([primary_shift, primary_shift + width])
        elif bool(re.match('multiple', window_label)):
            n_multiple = int(window_label[-1])
            #print(n_multiple)
            delay = n_multiple * expected_multiple_periods[component]
            #delay += primary_shift
            #width = window_widths[component][window_label]
            width = getattr(getattr(window_widths,component),window_label)
            window_bounds = np.array([delay, delay+width])
        elif window_label == 'noise_1':
            start_of_window = WINDOW_BOUNDARIES_TIME[component]['multiple_1'][1]
            end_of_window = WINDOW_BOUNDARIES_TIME[component]['multiple_2'][0]
            window_bounds = np.array([start_of_window, end_of_window])
        elif window_label == 'noise_2':
            start_of_window = WINDOW_BOUNDARIES_TIME[component]['multiple_2'][1]
            end_of_window = WINDOW_BOUNDARIES_TIME[component]['multiple_3'][0]
            window_bounds = np.array([start_of_window, end_of_window])
        WINDOW_BOUNDARIES_TIME[component][window_label] = window_bounds
    return WINDOW_BOUNDARIES_TIME#dont need to return this global


def update_window_boundaries_in_time(component, trimmed_trace, trimmed_time_vector,
                                     window_widths, expected_multiple_periods,
                                     global_config, dynamic_windows=['primary',]):
    """
     #<dynamic window allocation>: idea is that the primary window will depend on
     the data, not an predetermined expected window assignment
    window_boundaries_time, window_boundaries_indices = update_window_boundaries(trimmed_trace,
    trimmed_time_vector, window_boundaries_time, window_boundaries_indices)

    acceptable_peak_wander = .003 #3ms
    need:
        applicable_window_width, for which I need to know what component I am on

    print("grab the primary trace and find its max, make sure this is no more than\
              a few samples from t=0, adjust window_boundaries_time to new times\
              then adjust the indices")
    """

    if dynamic_windows is None:
        return
    elif 'primary' in dynamic_windows:
        acceptable_peak_wander = .003 #3ms - add to env_cfg
        max_index = np.argmax(trimmed_trace)
        max_time = trimmed_time_vector[max_index]
        applicable_window_width = getattr(window_widths,component).primary
        if np.abs(max_time) < acceptable_peak_wander:
            primary_shift = max_time - applicable_window_width/2.0 #this 2.0 means center the window on the max
            set_window_boundaries_in_time(expected_multiple_periods, window_widths,
                                          component, primary_shift=primary_shift)
            convert_window_boundaries_to_sample_indices(component, global_config)
            return


        else:
            print('primary peak has wandered further than expected ... not updating feature windows')
            return
    else:
        return

    #</dynamic window allocation>

def convert_window_boundaries_to_sample_indices(component_label, global_config):
    """
    takes a dictionary of times as input
    Returns a dictioanry of same shape, but [t0, t1] replaced by [ndx0, ndx1]
    @ToDo: Spruce this up by using iterative dictionary comprehension
    @change: 20181226, removed window_boundaries_time from imput, replaced with global WINDOW_BOUNDARIES_TIME
    """
    sampling_rate = global_config.output_sampling_rate
    dt = 1./sampling_rate
    index_offset = abs(int(global_config.min_lag_trimmed_trace * sampling_rate))

    #window_boundaries_indices = {}
    #for component_label in window_boundaries_time.keys():
    sub_dict = WINDOW_BOUNDARIES_TIME[component_label]
    #window_boundaries_indices[component_label] = {}
    for window_label in sub_dict.keys():
        subsub_dict = sub_dict[window_label]
        lower_time = subsub_dict[0]; upper_time = subsub_dict[1]
        lower_index = int(np.floor(lower_time/dt)) + index_offset
        upper_index = int(np.ceil(upper_time/dt)) + index_offset

        WINDOW_BOUNDARIES_INDICES[component_label][window_label] = [lower_index, upper_index]

    return #window_boundaries_indices


def populate_window_data_dict(component, trimmed_trace, trimmed_time_vector):
    """
    associate with each window_label, the data in that window, and the time
    takes a dictionary of times as input
    Returns a dictioanry of same keys, but [ndx0, ndx1] replaced by data_series from
    @TODO: Spruce this up by using iterative dictionary comprehension
    @TODO: time vector splitting is redundant -  calulate once outside here?
    """

    trace_data_window_dict = {}
    trace_time_vector_dict = {}
    for window_label in WINDOW_BOUNDARIES_INDICES[component].keys():
        sub_dict = WINDOW_BOUNDARIES_INDICES[component][window_label]
        lower_index = sub_dict[0]; upper_index = sub_dict[1]
        trace_data_window_dict[window_label] = trimmed_trace[lower_index:upper_index]
        trace_time_vector_dict[window_label] = trimmed_time_vector[lower_index:upper_index]
        print('check for offbyone error above - maybe upper_index+1')

    return trace_data_window_dict, trace_time_vector_dict

def test_populate_window_data_dict(trace_data_window_dict, trace_time_vector_dict,
                                   trimmed_trace, trimmed_time_vector):
    """
    plot the trace
    """
    color_cycle = ['red', 'orange', 'cyan', 'green', 'blue', 'violet']
    fig, ax = plt.subplots(nrows=2)
    #plt.plot(trimmed_time_vector, trimmed_trace, color='black', linewidth=2, label='trace data')
    i_color = 0
    for i_label, component_label in enumerate(trace_data_window_dict.keys()):
        data_sub_dict = trace_data_window_dict[component_label]
        time_sub_dict = trace_time_vector_dict[component_label]
        ax[i_label].plot(trimmed_time_vector, trimmed_trace, color='black',
          linewidth=2, label='trace data', alpha=0.1)
        i_color = 0
        for window_label in data_sub_dict.keys():
            print(window_label)
            ax[i_label].plot(time_sub_dict[window_label], data_sub_dict[window_label],
              color=color_cycle[i_color], linewidth=1, label=window_label)
            i_color+=1
        ax[i_label].legend()
    plt.show()
    return


def extract_features_from_each_window(window_data_dict, time_vector_dict):
    """
    """
    new_feature_dict = {}
    for window_label in window_data_dict.keys():
        tmp = {}
        #pdb.set_trace()
        data_window = window_data_dict[window_label]
        time_vector = time_vector_dict[window_label]
        dt = time_vector[1] - time_vector[0]
        tmp['max_amplitude'] = np.max(data_window)
        tmp['max_time'] = time_vector[np.argmax(data_window)]
        tmp['min_amplitude'] = np.min(data_window)
        tmp['min_time'] = time_vector[np.argmin(data_window)]
        tmp['integrated_absolute_amplitude'] = dt*np.sum(np.abs(data_window))/(time_vector[-1]-time_vector[0])
        new_feature_dict[window_label] = tmp
    return new_feature_dict

def calculate_boolean_features(feature_dict, global_config):
    """
    note feature_dict here is a subdictionary, we are working with a single component
    Create Boolean
    1:Min = sensitivity (g) /2000
    2: S/N 1st Multiple > 1

    @rtype: dictionary, keyed by the boolean feature labels
    """
    sensor_saturation_g = global_config.sensor_saturation_g
    system_noise_level = sensor_saturation_g / 2000.0
    output_dict = {}
    output_dict['mask_system_noise_level'] = False
    output_dict['mask_snr_mult1'] = False
    #pdb.set_trace()
    if feature_dict['multiple_1']['max_amplitude'] < system_noise_level:
        output_dict['mask_system_noise_level'] = True
        #pdb.set_trace()
        print('mask_system_noise_level')
    snr_mult1 = feature_dict['multiple_1']['integrated_absolute_amplitude'] / feature_dict['noise_1']['integrated_absolute_amplitude']
    if snr_mult1 < 1.0:
        output_dict['mask_snr_mult1'] = True
    return output_dict



def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
