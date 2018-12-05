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

npy_folder = os.path.join(processed_data_path,'bench/793-MR_77-23531/piezo/5208' )
metadata_csv = os.path.join(npy_folder, 'metadata.csv')
features_csv = os.path.join(npy_folder, 'extracted_features.csv')
features_df = pd.read_csv(features_csv)
pdb.set_trace()

#if os.path.isfile(metadata_csv):
#    pd.read_csv
#    metadata = Metadata.load(metadata_csv)
#else:
#    f1 = h5py.File(h5_filename,'r+')
#    h5_helper = H5Helper(f1)
#    metadata = h5_helper.metadata
#    metadata.save(metadata_csv)
#    print('get from h5')

#<From Metadata>
sensor_distance_to_source = 20.97 #m
sensor_distance_to_shocksub = 0.77 #m
#</From Metadata>

#<From Config>
AXIAL_VELOCITY_STEEL = 4755.0 #m/s
SHEAR_VELOCITY_STEEL = 2630.0 #m/s
#</From Config>

#<There is a better way to do this>
window_widths_ms = {}
component = 'axial'
window_widths_ms[component] = {}
window_widths_ms[component]['primary'] = 4.0
window_widths_ms[component]['multiple_1'] = 4.0
window_widths_ms[component]['multiple_2'] = 4.0
window_widths_ms[component]['multiple_3'] = 4.0
component = 'tangential'
window_widths_ms[component] = {}
window_widths_ms[component]['primary'] = 4.0
window_widths_ms[component]['multiple_1'] = 4.0
window_widths_ms[component]['multiple_2'] = 4.0
window_widths_ms[component]['multiple_3'] = 4.0
#</There is a better way to do this>


processing_scheme_list = ['standard', 'phase_rotated', 'despike_decon', 'simple_correlated',]
trace_window_labels_for_feature_extraction = ['primary', 'multiple_1', 'multiple_2',
                                        'multiple_3', 'noise_1', 'noise_2']

wavelet_feature_extractor_types = ['sample', 'polynomial', 'ricker',]
component = 'tangential'
component = 'axial'
#metadata.save(metadata_csv)

AXIAL_VELOCITY_STEEL = 4755.0 #m/s
SHEAR_VELOCITY_STEEL = 2630.0 #m/s
#home = os.path.expanduser("~/")

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



def set_window_boundaries_in_time(expected_multiple_periods, window_widths_ms):
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
                width = window_widths_ms[component][window_label]
                window_bounds = np.array([delay, delay+width]) * 1e-3
            elif bool(re.match('multiple', window_label)):
                delay = expected_multiple_periods[component]
                width = window_widths_ms[component][window_label]
                window_bounds = np.array([delay, delay+width]) * 1e-3
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
    #primary
def get_expected_wavelet_from_trace(wavelet_type):
    """
    wavelet_type: primary, M1, M2, M3, N12, N23
    returns the indices of primary window,
    """
    pass
def split_wavelet_into_snr_windows_m1m2m3():
    """
    """
    pass

def extract_signal_and_noise_features():
    pass

def feature_extractor():
    """
    """
    pdb.set_trace()
    expected_mulitple_periods = get_expected_mulitple_times_vA(sensor_distance_to_source,
                                                               sensor_distance_to_shocksub)
    window_boundaries_time = set_window_boundaries_in_time(expected_mulitple_periods, window_widths_ms)
    #<TODO>
    window_boundaries_indices = convert_window_boundaries_to_sample_indices(window_time_boundaries, sampling_interval)
    window_data_dict = populate_window_data_dict() #go and associate with each window_label, the data in that window
    extracted_features_dict = extract_features_from_each_window()
    print("now these features are to be added onto the existing table")
    new_features_df = pd.DataFrame(extracted_features_dict, index=features_df.index)
    merged_features_df = merge_data_frames_with_common_index() #use pd.concat()



    #for this trac
    #window_time_dict = window_boundaries_time

    #</TODO>
    pdb.set_trace()

    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
