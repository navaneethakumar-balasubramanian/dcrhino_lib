# -*- coding: utf-8 -*-
"""
Created on Thu Aug  2 16:25:58 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import logging
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb


#<temporary logging>
def init_logging(name):
    logger = logging.getLogger(name)
    logging.basicConfig(level = logging.DEBUG,format='%(asctime)s %(name)-12s \
                        %(levelname)-8s line:%(lineno)d %(funcName)s %(message)s', \
                        datefmt='%m-%d %H:%M:%S',filemode='w')

    #logger = logging.get_logger(__name__)
    return logger

logger = init_logging(__name__)

#<\temporary logging>


#<Fundamental>
#<Fundamental
COMPONENT_WAVELET_MAP = {}
COMPONENT_WAVELET_MAP['axial'] = ['primary', 'multiple']
COMPONENT_WAVELET_MAP['tangential'] = ['primary','multiple']
COMPONENT_WAVELET_MAP['radial'] = ['primary',]

WAVELET_FEATURES = {}
WAVELET_FEATURES['axial'] = ['peak_amplitude', 'peak_sample', 'peak_time',
                'peak_time_sample', 'zero_crossing_prior', 'zero_crossing_after',
                'area', 'pk_error', 'zx_error', 'zero_crossing_prior_sample',
                'zero_crossing_after_sample', 'left_trough_time', 'left_trough_time_sample']

WAVELET_FEATURES['tangential'] = ['peak_sample','peak_time_sample']

WAVELET_FEATURES['radial'] = ['peak_sample',]
#home = os.path.expanduser("~/")
def get_wavelet_window_indices(time_vector, start_time, end_time):
    """
    20170823: this intended to replace variations on method from primary, multiple_peak_finder, multiple_refined,
    Here start and end times are intended to be floats
    """
    indices = np.where( (time_vector > start_time) & (time_vector < end_time) )[0]
    return indices


class WaveletForFeatureExtraction(object):
    """
    This is intended to calculate features on individual wavelets.  Actually
    the data here are "windows".  we think there are wavelets in these windows
    much of the time.

    """
    def  __init__(self, data, time_vector, **kwargs):
        self.data = data
        self.time_vector = time_vector
        self.component = kwargs.get('component', None)
        self.wavelet_type = kwargs.get('wavelet_type', None)
        for k in WAVELET_FEATURES[self.component]:
            setattr(self, k, np.nan)

def get_zero_crossing_samples(reference_index, data_series, time_vector):
    """
    cute method.  Add the reference value to your left or right,
    then, the index of where you find zx is # samples ...
    multiply by dt to get time ... should actually fit a line here ...
    """
    #pdb.set_trace()

    square_series = np.sign(data_series)
    ref_sign = np.sign(data_series[reference_index])
    left_side = np.flipud(square_series[:reference_index+1])
    left_data = np.flipud(data_series[:reference_index+1])
    left_time = np.flipud(time_vector[:reference_index+1])
    steps_left_to_change_1 = np.where(left_side == -ref_sign)[0][0]
    trough_left = left_side[steps_left_to_change_1:]
    steps_left_to_change_2 = np.where(trough_left == ref_sign)[0][0]
    n_steps = steps_left_to_change_1 + steps_left_to_change_2
    #<use two point line formula>
    t1 = left_time[n_steps]; t2 = left_time[n_steps-1]
    y1 = left_data[n_steps]; y2 = left_data[n_steps-1]
    m = (y2-y1) / (t2 - t1)
    #y - y1 = m * (x - x1), solve for y=0
    #0 - y1 = m * (x - x1)
    #- y1 = (m * x) - (m *x1)
    #-(m * x) = y1 - (m * x1)
    # x = (y1 - mx1 ) / -m
    zx_left = (y1 - m*t1) / (-1.*m)

    right_side = square_series[reference_index-1:]
    right_time = time_vector[reference_index-1:]
    right_data = data_series[reference_index-1:]
    steps_right_to_change = np.where(right_side == -ref_sign)[0][0]
    t1 = right_time[steps_right_to_change-1]; t2 = right_time[steps_right_to_change]
    y1 = right_data[steps_right_to_change-1]; y2 = right_data[steps_right_to_change]
    m = (y2-y1) / (t2 - t1)
    zx_right = (y1 - m*t1) / (-1.*m)
    return zx_left, zx_right


def get_trough_times(reference_index, data_series, time_vector):
    """
    reference_index is the primary peak.
    """

    square_series = np.sign(data_series)
    ref_sign = np.sign(data_series[reference_index]) #this is +1 if ref is a peak
    left_side = np.flipud(square_series[:reference_index+1])
    left_data = np.flipud(data_series[:reference_index+1])
    left_time = np.flipud(time_vector[:reference_index+1])
    steps_left_to_change_1 = np.where(left_side == -ref_sign)[0][0]
    #expected trough width is about twice the distance you've already walked
    trough_data = left_data[steps_left_to_change_1:steps_left_to_change_1+2*steps_left_to_change_1]
    trough_time = left_time[steps_left_to_change_1:steps_left_to_change_1+2*steps_left_to_change_1]
    min_index = np.argmin(trough_data)
    left_trough_time_sample = trough_time[min_index]
    poly_ord = len(trough_data) - 1
    z = np.polyfit(trough_time, trough_data, poly_ord)
    poly = np.poly1d(z)
    dpdt = np.polyder(poly)
    #<identify peak time and amplitude>
    neg_peak_times = dpdt.roots
    neg_peak_times = neg_peak_times[np.isreal(neg_peak_times)] #should be exactly one
    neg_peak_times = np.real(neg_peak_times)

    dt = time_vector[1] - time_vector[0]
    neg_peak_times = neg_peak_times[neg_peak_times < left_trough_time_sample + dt]
    neg_peak_times = neg_peak_times[neg_peak_times > left_trough_time_sample - dt]

#    left_trough_time = np.max(neg_peak_times)
#    if left_trough_time > 0:
#        logger.error("WTF!")
#        pdb.set_trace()

    if len(neg_peak_times) != 1:
        #pdb.set_trace()
        logger.error("WTF!")
        left_trough_time = np.nan
        #pdb.set_trace()

    else:
        left_trough_time = neg_peak_times[0]



    #pdb.set_trace()

    return left_trough_time, left_trough_time_sample



def extract_features_from_primary_wavelet(tr, time_vector, primary_window_halfwidth_ms,
                                          component, wavelet_type):
    """
    TODO: migrate this to seismic processing eventually

    """
    primary_window_halfwidth = primary_window_halfwidth_ms * 1e-3


    primary_wavelet_indices_1 = get_wavelet_window_indices(time_vector,
                                                           -primary_window_halfwidth,
                                                           primary_window_halfwidth)

    tr.data = np.asarray(tr.data)

    window_to_search_for_primary_1 = tr.data[primary_wavelet_indices_1]
    hopefully_prim_peak_ndx = np.argmax(window_to_search_for_primary_1)
    hopefully_prim_center_time = time_vector[primary_wavelet_indices_1][hopefully_prim_peak_ndx]

    primary_fit_lower_bound = hopefully_prim_center_time - primary_window_halfwidth
    primary_fit_upper_bound = hopefully_prim_center_time + primary_window_halfwidth
    primary_wavelet_indices_2 = get_wavelet_window_indices(time_vector,
                                                           primary_fit_lower_bound,
                                                           primary_fit_upper_bound)
    primary_wavelet = tr.data[primary_wavelet_indices_2]
    primary_time_vector = time_vector[primary_wavelet_indices_2]

    wffe = WaveletForFeatureExtraction(primary_wavelet,primary_time_vector,
                                       component=component, wavelet_type=wavelet_type)

    wffe.peak_sample = np.max(window_to_search_for_primary_1)
    wffe.peak_time_sample = hopefully_prim_center_time
    #pdb.set_trace()
    #print (np.max(tr.data))
    #print (np.max(tr.data)==np.max(window_to_search_for_primary_1))
    if np.max(tr.data)==np.max(window_to_search_for_primary_1):#sanity check;
        reference_index = np.argmax(tr.data)
        try:
            zx_left, zx_right = get_zero_crossing_samples(reference_index, tr.data, time_vector)
        except IndexError:
            print("?? - index erroR")
            zx_left = np.nan; zx_right = np.nan
            print("last timethis was a werid trace having shape of a heavisidcfctn")
            #pdb.set_trace()
        try:
            left_trough_time, left_trough_time_sample = get_trough_times(reference_index, tr.data, time_vector)
        except ValueError:
            left_trough_time = np.nan; left_trough_time_sample = np.nan
            print("emptyseq?? - last timethis was a zero trace")
            #pdb.set_trace()
    else:
        zx_left = np.nan; zx_right = np.nan
        left_trough_time = np.nan; left_trough_time_sample = np.nan;
    wffe.zero_crossing_prior_sample = zx_left
    wffe.zero_crossing_after_sample = zx_right
    wffe.left_trough_time = left_trough_time
    wffe.left_trough_time_sample = left_trough_time_sample
#    wffe.peak_sample = np.max(window_to_search_for_primary_1)
#    wffe.peak_time_sample = np.argmax(window_to_search_for_primary_1)

    #wffe.calculate_features()
    #import pdb; pdb.set_trace()
    return wffe


def extract_features_from_multiple_wavelet(tr, time_vector, earliest_multiple_time,
                                           latest_multiple_time, component, wavelet_type):
    """
    TODO: migrate this to seismic processing eventually
    TODO: Once ROBUST can PRoBaBlY use same routine for PRIM and MULT
    """
    #Two Step Identification of mmultiple window, find max in some guess window, then center on that ma
    #when it comes to the multiple, I want to pick the maximum in that window and then
    #make a window around it
    multiple_window_halfwidth = (latest_multiple_time - earliest_multiple_time) / 2.0
    multiple_wavelet_indices_1 = get_wavelet_window_indices(time_vector,
                                                          earliest_multiple_time,
                                                          latest_multiple_time)
    window_to_search_for_multiple_1 = tr.data[multiple_wavelet_indices_1] #GUESS WINDOW
    hopefully_mult_peak_ndx = np.argmax(window_to_search_for_multiple_1)
    hopefully_mult_center_time = time_vector[multiple_wavelet_indices_1][hopefully_mult_peak_ndx]
    multiple_wavelet_indices_2 = get_wavelet_window_indices(time_vector,
                                                            hopefully_mult_center_time - multiple_window_halfwidth,
                                                            hopefully_mult_center_time + multiple_window_halfwidth)

    #<Confirm odd # indices>
    #TODO: move this check into get_wavelet_window_indices()
    #or better yet: center-index-getter
    if len(multiple_wavelet_indices_2) % 2 == 0:
        logger.critical("Need to modify if you want even # indices, \
                        I am expecting odd #")
        WaveletForFeatureExtraction(None, None, component=component, wavelet_type=wavelet_type)
        #print("{} i_trace {}".format(parent_filename, i_trace))
        raise Exception
    #</Confirm odd # indices>
    #pdb.set_trace()
    multiple_wavelet = tr.data[multiple_wavelet_indices_2]
    multiple_time_vector = time_vector[multiple_wavelet_indices_2]
    #seven-er or five-er above, so want index 3 or 2 respective
    n_points_in_window = len(multiple_wavelet)
    center_index = (n_points_in_window - 1) //2

    if multiple_wavelet[center_index+2] > multiple_wavelet[center_index]:
        #print("Probably not a legitimate multiple... do we know what that means")
        wffe = WaveletForFeatureExtraction(None, None, component=component, wavelet_type=wavelet_type)
        wffe.pk_error = 11
        #This condition agreed over phone discussion w JWR 20180724, ~5/6pm

    elif multiple_wavelet[center_index+1] > multiple_wavelet[center_index]:
        #happens when your multiple is LATE, very late ... probaly the
        #non drilling resonance, but we dont know yet
        #recenter window
        #my solution, move the window over by one so its centered on max sample value
        multiple_wavelet_indices_2 += 1
        multiple_wavelet = tr.data[multiple_wavelet_indices_2]
        multiple_time_vector = time_vector[multiple_wavelet_indices_2]
        if multiple_wavelet[center_index+2] > multiple_wavelet[center_index]:
            logger.warning("EDGE CASE >.. NOT WELL UNDERSTOOD; -- ")
            #basically this happens when we tried to shift over but its still fucked up
            #probably best in this case to return nan-None
            #pdb.set_trace()
            wffe = WaveletForFeatureExtraction(None, None, component=component, wavelet_type=wavelet_type)
        else:
            wffe = WaveletForFeatureExtraction(multiple_wavelet, multiple_time_vector, component=component, wavelet_type=wavelet_type)
            #wffe.calculate_features()
        #TODO: ADD RECURSION HERE!!! SHOULD CHECK IF two over is bigger again, if so
        #toss it the multiple is too late!!
    else:
        wffe = WaveletForFeatureExtraction(multiple_wavelet, multiple_time_vector, component=component, wavelet_type=wavelet_type)
        #wffe.calculate_features()

    wffe.peak_sample = np.max(window_to_search_for_multiple_1)
    wffe.peak_time_sample = hopefully_mult_center_time
    #pdb.set_trace()
    #reference_index = multiple_wavelet_indices_1[hopefully_mult_peak_ndx]
    #try:
    #    zx_left, zx_right = get_zero_crossing_samples(reference_index, tr.data, time_vector)
    #except IndexError:
    #    zx_left = np.nan; zx_right = np.nan
    #    logger.error("no zero crossing near multiple ... weirder than weird")
    wffe.zero_crossing_prior_sample = np.nan
    wffe.zero_crossing_after_sample = np.nan
    wffe.left_trough_time = np.nan
    wffe.left_trough_time_sample = np.nan
    #pdb.set_trace()
    #print('add sample time and zxs')
    return wffe

def create_features_dictionary(data_datetime):
    """
    """
    num_traces_per_component = 1
    feature_dict = {}
    for component in COMPONENT_WAVELET_MAP.keys():
        for wavelet_type in COMPONENT_WAVELET_MAP[component]:
            for wavelet_feature in WAVELET_FEATURES[component]:
                feature_string = '{}_{}_{}'.format(component, wavelet_type, wavelet_feature)
                feature_dict[feature_string] = np.full(num_traces_per_component, np.nan, dtype='float32')
                #feature_dict[feature_string] = pd.Series(feature_dict[feature_string], )
    for k, v in feature_dict.iteritems():
        feature_dict[k] = pd.Series(v, index=[data_datetime,])
    return feature_dict

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
