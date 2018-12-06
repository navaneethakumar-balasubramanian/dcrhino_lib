# -*- coding: utf-8 -*-
"""
Created on Wed Dec  5 08:06:21 2018

@author: kkappler

@67 Chelton with JWR.

use an example blasthole;
Need field metadata, which I will take from an h5 file;

~/data/datacloud/rhino_process_pipeline_output/line_creek/5208/3200/

An assumption in here is that the earliest possible primary time is 0.0,
('becuase we are minimum phase sajs Jamie'), but I think we have seen exceptions to this,
so a follow on task will be to check, with real data that the "local maximum" in the
primary window is always at a positive time
"""

from __future__ import absolute_import, division, print_function


import datetime
import h5py
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb
import re

from dcrhino.analysis.util.general_helper_functions import flatten
from dcrhino.process_pipeline.h5_helper import H5Helper
from dcrhino.real_time.metadata import Metadata
home = os.path.expanduser("~/")

mine_path = os.path.join(home, 'data', 'datacloud', 'teck', 'line_creek')
field_data_path = os.path.join(mine_path, 'field_data')
processed_data_path = os.path.join(mine_path, 'processed_data')
h5_filename = os.path.join(field_data_path, '2018-09-10', 'drill_31', '5208', 'level_1', '20180910_SSX57868_5208_2800.h5')


#f1 = h5py.File(h5_filename,'r+')
#h5_helper = H5Helper(f1)
#metadata = h5_helper.metadata
#<From Metadata>
sensor_distance_to_source = 20.97 #m
sensor_distance_to_shocksub = 0.77 #m
sensor_saturation_g = 100.0
sampling_rate = 3200.0; dt = 1./ sampling_rate; #where is this accessed from????
min_lag = 0.1 #ms This tells us the starting time referneced to t=0 (perfect overlapping xcorr)
index_offset = int(min_lag * sampling_rate)
#</From Metadata>

#<From Config>
AXIAL_VELOCITY_STEEL = 4755.0 #m/s
SHEAR_VELOCITY_STEEL = 2630.0 #m/s
#</From Config>

npy_folder = os.path.join(processed_data_path,'bench/793-MR_77-23531/piezo/5208' )
metadata_csv = os.path.join(npy_folder, 'metadata.csv')
features_csv = os.path.join(npy_folder, 'extracted_features.csv')
features_df = pd.read_csv(features_csv)


trimmed_traces_dict = {}
tmp = np.load(os.path.join(npy_folder, 'axial_filtered_correlated_traces.npy'))
print("warning: this needs to use parameterized trim!; sps, decon filter len")
trimmed_traces_dict['axial'] = tmp[:,1600+160-320:1600+160+320]
tmp = np.load(os.path.join(npy_folder, 'tangential_filtered_correlated_traces.npy'))
trimmed_traces_dict['tangential'] = tmp[:,1600+160-320:1600+160+320]

n_traces, samples_per_trace = trimmed_traces_dict['axial'].shape#(1220, 320)
trimmed_time_vector = (dt * np.arange(samples_per_trace)) - min_lag#from dcrhino/feature_extraction/feature_extractor.py:43:



#<There is a better way to do this>
window_widths = {}
component = 'axial'
window_widths[component] = {}
window_widths[component]['primary'] = 4.0 * 1e-3
window_widths[component]['multiple_1'] = 4.0 * 1e-3
window_widths[component]['multiple_2'] = 4.0 * 1e-3
window_widths[component]['multiple_3'] = 4.0 * 1e-3
component = 'tangential'
window_widths[component] = {}
window_widths[component]['primary'] = 4.0 * 1e-3
window_widths[component]['multiple_1'] = 4.0 * 1e-3
window_widths[component]['multiple_2'] = 4.0 * 1e-3
window_widths[component]['multiple_3'] = 4.0 * 1e-3
#</There is a better way to do this>


processing_scheme_list = ['standard', 'phase_rotated', 'despike_decon', 'simple_correlated',]
trace_window_labels_for_feature_extraction = ['primary', 'multiple_1', 'multiple_2',
                                        'multiple_3', 'noise_1', 'noise_2']

#wavelet_feature_extractor_types = ['sample', 'polynomial', 'ricker',]
#component = 'tangential'
#component = 'axial'


def get_expected_mulitple_times_vA(sensor_distance_to_bit, distance_sensor_to_shock_sub_bottom):
    """
    calculates the time_intervals between resonances along the pipe for each of P and S
    waves, axial and tangential components
    """
    expected_mulitple_periods = {}
    total_distance = sensor_distance_to_bit + distance_sensor_to_shock_sub_bottom
    expected_mulitple_periods['axial'] = 2 * total_distance / AXIAL_VELOCITY_STEEL
    expected_mulitple_periods['tangential'] = 2 * total_distance / SHEAR_VELOCITY_STEEL
    return expected_mulitple_periods



def set_window_boundaries_in_time(expected_multiple_periods, window_widths):
    """
    sets t0, t1,
    returns window bounds in seconds
    """
    window_boundaries_time = {}
    component = 'axial'
    for component in ['axial', 'tangential', ]:
        window_boundaries_time[component] = {}
        for window_label in trace_window_labels_for_feature_extraction:
            #pdb.set_trace()
            if window_label == 'primary':
                delay = 0.0
                width = window_widths[component][window_label]
                window_bounds = np.array([delay, delay+width])
            elif bool(re.match('multiple', window_label)):
            #elif window_label == 'multiple_1':
                n_multiple = int(window_label[-1])
                print(n_multiple)
                delay = n_multiple * expected_multiple_periods[component]
                width = window_widths[component][window_label]
                window_bounds = np.array([delay, delay+width])
                #pdb.set_trace()
            elif window_label == 'noise_1':
                start_of_window = window_boundaries_time[component]['multiple_1'][1]
                end_of_window = window_boundaries_time[component]['multiple_2'][0]
                window_bounds = np.array([start_of_window, end_of_window])
            elif window_label == 'noise_2':
                start_of_window = window_boundaries_time[component]['multiple_2'][1]
                end_of_window = window_boundaries_time[component]['multiple_3'][0]
                window_bounds = np.array([start_of_window, end_of_window])
            window_boundaries_time[component][window_label] = window_bounds
    return window_boundaries_time

def convert_window_boundaries_to_sample_indices(window_boundaries_time, sampling_interval):
    """
    takes a dictionary of times as input
    Returns a dictioanry of same shape, but [t0, t1] replaced by [ndx0, ndx1]
    @ToDo: Spruce this up by using iterative dictionary comprehension
    """
    dt = sampling_interval
    window_boundaries_indices = {}
    for component_label in window_boundaries_time.keys():
        sub_dict = window_boundaries_time[component_label]
        window_boundaries_indices[component_label] = {}
        for window_label in sub_dict.keys():
            subsub_dict = sub_dict[window_label]
            lower_time = subsub_dict[0]; upper_time = subsub_dict[1]
            lower_index = int(np.floor(lower_time/dt)) + index_offset
            upper_index = int(np.ceil(upper_time/dt)) + index_offset

            window_boundaries_indices[component_label][window_label] = [lower_index, upper_index]

    return window_boundaries_indices


def populate_window_data_dict(window_boundaries_indices, trimmed_trace,
                              trimmed_time_vector):#time_vector needed here?, n_samples):
    """
    associate with each window_label, the data in that window, and the time
    takes a dictionary of times as input
    Returns a dictioanry of same keys, but [ndx0, ndx1] replaced by data_series from
    @TODO: Spruce this up by using iterative dictionary comprehension
    @TODO: time vector splitting is redundant -  calulate once outside here?
    """

    trace_data_window_dict = {}
    trace_time_vector_dict = {}
    #for component_label in window_boundaries_indices.keys():
    #    sub_dict = window_boundaries_indices[component_label]
    #    trace_data_window_dict[component_label] = {}
    #    trace_time_vector_dict[component_label] = {}
    for window_label in window_boundaries_indices.keys():
        sub_dict = window_boundaries_indices[window_label]
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
#            data = data_sub_dict[window_label]
#            time = time_sub_dict[window_label]
            #pdb.set_trace()
            ax[i_label].plot(time_sub_dict[window_label], data_sub_dict[window_label],
              color=color_cycle[i_color], linewidth=1, label=window_label)
            i_color+=1
        ax[i_label].legend()
    plt.show()
    return
    #primary

def extract_features_from_each_window(window_data_dict, time_vector_dict):
    """
    """
    new_feature_dict = {}
    #for component_label in window_data_dict.keys():
    #    data_sub_dict = window_data_dict[component_label]
    #    time_sub_dict = time_vector_dict[component_label]
    #    new_feature_dict[component_label] = {}
    for window_label in window_data_dict.keys():
        #case_label = '{}_{}'.format(component_label, window_label)
        tmp = {}
        #print(case_label)
        data_window = window_data_dict[window_label]
        time_vector = time_vector_dict[window_label]
        tmp['max_amplitude'] = np.max(data_window)
        tmp['max_time'] = time_vector[np.argmax(data_window)]
        tmp['min_amplitude'] = np.min(data_window)
        tmp['min_time'] = time_vector[np.argmin(data_window)]
        tmp['integrated_absolute_amplitude'] = np.sum(np.abs(data_window))/(time_vector[-1]-time_vector[0])
        new_feature_dict[window_label] = tmp
    return new_feature_dict

def calculate_boolean_features(feature_dict):
    """
    note feature_dict here is a subdictionary, we are working with a single component
    Create Boolean
    1:Min = sensitivity (g) /2000
    2: S/N 1st Multiple > 1
    add it as a dict
    """
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
import collections

def flatten(d, parent_key='', sep='_'):
    items = []
    for k, v in d.items():
        new_key = parent_key + sep + k if parent_key else k
        if isinstance(v, collections.MutableMapping):
            items.extend(flatten(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)
#def unnest_dictionary(input_dict):
#    output_dict = {}
#    for component_label in input_dict.keys():
#        subdict =
#        for xlabel in
#        print(k, v)
#    pdb.set_trace()
#    return

def feature_extractor_augment_example():
    """
    """
    #pdb.set_trace()
    #<Define intervals of data for analysis and prep containers>
    expected_mulitple_periods = get_expected_mulitple_times_vA(sensor_distance_to_source,
                                                               sensor_distance_to_shocksub)
    window_boundaries_time = set_window_boundaries_in_time(expected_mulitple_periods, window_widths)

    window_boundaries_indices = convert_window_boundaries_to_sample_indices(window_boundaries_time, dt)#sampling_interval)
    #</Define intervals of data for analysis and prep containers>

    #Allocate space for feature arrays!
    feature_dict_lists = n_traces * [None]
#    feature_dict_lists = {}
#    for component_label in window_boundaries_time.keys():
#        feature_dict_lists[component_label] = n_traces * [None]
    #DATA ENTERS PICTUURE HERE!

    for i_trace in range(n_traces):
        #loop over axial and tangential
        new_features_dict = {}
        for component_label in window_boundaries_indices.keys():
            trimmed_trace = trimmed_traces_dict[component_label][i_trace, :]
            window_data_dict, window_time_vector_dict = populate_window_data_dict(window_boundaries_indices[component_label],
                                                                              trimmed_trace,
                                                                              trimmed_time_vector)
            #test_populate_window_data_dict(window_data_dict, window_time_vector_dict,
                                            #                           trimmed_trace, trimmed_time_vector)
            extracted_features_dict = extract_features_from_each_window(window_data_dict,
                                                                        window_time_vector_dict)

            boolean_features_dict = calculate_boolean_features(extracted_features_dict)
            extracted_features_dict['boolean'] = boolean_features_dict
            new_features_dict[component_label] = extracted_features_dict
            #pdb.set_trace()
        #pdb.set_trace()
        unnested_dictionary = flatten(new_features_dict)
        #pdb.set_trace()
        print('now dump out with dict keys concatenated')
        feature_dict_lists[i_trace] = unnested_dictionary
    #pdb.set_trace()
    new_features_df = pd.DataFrame(feature_dict_lists, index=features_df.index)

    print("new features df is now read into the plotter and booleans are applied to mute traces")
    merged_features_df = pd.concat((features_df, new_features_df), axis=1) #use pd.concat()
    merged_features_df.to_csv(os.path.join(npy_folder, 'merged_features.csv'))
    #<TODO>
    for col in new_features_df.columns:
        print(col)
    pdb.set_trace()

    pass

def main():
    """
    """
    feature_extractor_augment_example()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
    #if os.path.isfile(metadata_csv):
#    pd.read_csv
#    metadata = Metadata.load(metadata_csv)
#else:
#    f1 = h5py.File(h5_filename,'r+')
#    h5_helper = H5Helper(f1)
#    metadata = h5_helper.metadata
#    metadata.save(metadata_csv)
#    print('get from h5')
