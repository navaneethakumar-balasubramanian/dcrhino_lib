#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Aug 13 13:33:42 2019

@author: kkappler
"""

import numpy as np
from scipy import signal
from model_config import ADD_NOISE



AXIAL_FEATURE_EXTRACTOR = dict(
    center_window=(-.002, 0.005), 
    left_window=(-.008, -.002), 
    right_window=(0.005, 0.01),
    center_pick='max',
    left_pick='min',
    right_pick='min',
)

TANGENTIAL_FEATURE_EXTRACTOR = dict(
    center_window=(-.004, 0.004), 
    left_window=(-.01, -.001), 
    right_window=(0.002, 0.015),
    center_pick='max',
    left_pick='min',
    right_pick='min',
)

def trace_filename(rho, velocity, component, add_noise, filtered = False):
    file_handle = 'rho{}_vel{}_{}_noise{}.npy'.format(int(rho), int(velocity), 
                       component, add_noise)
    if filtered:
        file_handle = 'filtered_{}'.format(file_handle)
    return file_handle


def output_h5_name():
    """
    contrils the name of the output h5 file
    """
    output_filehandle = 'test.h5'    
    if ADD_NOISE:
        output_filehandle = 'test_noiseTrue.h5'
    return output_filehandle

def feature_extractor(wavelet, time, 
                      center_window=None, 
                      left_window=None, 
                      right_window=None,
                      center_pick='max',
                      left_pick='min',
                      right_pick='min',
                      upsample_to=100000):
    time = np.linspace(time.min(), time.max(), upsample_to)
    wavelet = signal.resample(wavelet, upsample_to)

    extracted_features = {}
    for pick, window, window_name in  zip([center_pick, left_pick, right_pick], [center_window, left_window, right_window], ['center', 'left', 'right']):
        if window:
            constrained_indices = np.where((time > window[0]) & (time < window[1]))

            constrained_wavelet = np.zeros_like(wavelet)
            constrained_wavelet[constrained_indices] = wavelet[constrained_indices]
            if pick == 'max':
                feature_index = np.argmax(constrained_wavelet)
            elif pick == 'min':
                feature_index = np.argmin(constrained_wavelet)
            else:
                raise ValueError('picks must be "min" or "max"')

            delay = time[feature_index]
            amplitude = wavelet[feature_index]
            extracted_features[window_name] = {
                'delay': delay,
                'amplitude': amplitude,
                'feature_index': feature_index,
            }
    try:
        extracted_features['center_to_left_ratio'] = extracted_features['center']['amplitude'] / extracted_features['left']['amplitude']
        extracted_features['right_to_left_ratio'] = extracted_features['right']['amplitude'] / extracted_features['left']['amplitude']
    except:
        pass
    return extracted_features