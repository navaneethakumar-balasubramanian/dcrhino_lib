# -*- coding: utf-8 -*-
"""
Created on Wed Aug  1 15:32:51 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

from dcrhino.analysis.signal_processing.seismic_processing import get_wavelet_window_indices
from dcrhino.analysis.util.general_helper_functions import init_logging

logger = init_logging(__name__)



#home = os.path.expanduser("~/")

COMPONENT_WAVELET_MAP = {}
COMPONENT_WAVELET_MAP['vertical'] = ['primary', 'multiple']
COMPONENT_WAVELET_MAP['tangential'] = ['primary',]# 'multiple']
COMPONENT_WAVELET_MAP['radial'] = ['primary',]# 'multiple']
WAVELET_FEATURES = {}
WAVELET_FEATURES['vertical'] = ['peak_amplitude', 'peak_sample', 'peak_time',
                'peak_time_sample', 'zero_crossing_prior', 'zero_crossing_after',
                'area', 'pk_error', 'zx_error', 'zero_crossing_prior_sample',
                'zero_crossing_after_sample', 'left_trough_time', 'left_trough_time_sample']
WAVELET_FEATURES['tangential'] = ['peak_sample',]# 'peak_time', 'zero_crossing_prior',
                        #'zero_crossing_after', 'area', 'pk_error', 'zx_error']
WAVELET_FEATURES['radial'] = ['peak_sample',]#

def create_correlated_features_dictionary(index):
    """
    """
    num_traces_per_component = len(index)
    feature_dict = {}
    #pdb.set_trace()
    for component in COMPONENT_WAVELET_MAP.keys():
        for wavelet_type in COMPONENT_WAVELET_MAP[component]:
            for wavelet_feature in WAVELET_FEATURES[component]:
                feature_string = '{}_{}_{}'.format(component, wavelet_type, wavelet_feature)
                feature_dict[feature_string] = np.full(num_traces_per_component, np.nan, dtype='float32')
                #feature_dict[feature_string] = pd.Series(feature_dict[feature_string], )
                #print(feature_string)
    for k, v in feature_dict.iteritems():
        feature_dict[k] = pd.Series(v, index=index)
    return feature_dict



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

    def calculate_features(self, poly_ord=None):
        """
        TODO: Factor the case of multiple from primary!
        """
        if self.component != 'vertical':
        #    self.peak_amplitude = np.max(self.data)
            return
        if poly_ord is None:
            poly_ord = len(self.data) - 1
        z = np.polyfit(self.time_vector, self.data, poly_ord)
        poly = np.poly1d(z)
        dpdt = np.polyder(poly)
        intpoly = np.polyint(poly)
        #</fit_poly_to_window>#(data, time_vector, ndx, sampling_rate)

        #<identify peak time and amplitude>
        peak_times = dpdt.roots
        peak_times = peak_times[np.isreal(peak_times)] #should be exactly one
        peak_times = np.real(peak_times)

        n_obs = len(self.time_vector)
        center_index = (n_obs - 1) // 2   #n_obs must be odd
        peak_times = peak_times[peak_times < self.time_vector[center_index+1]]
        peak_times = peak_times[peak_times > self.time_vector[center_index-1]]

        if len(peak_times) == 0:
            self.pk_error = 1
        elif len(peak_times) == 1:
            self.pk_error = 0
        elif len(peak_times) > 1:
            logger.warning("unexpected # critical points will fix, assuming odd # points")
            if len(peak_times) > 1:
                logger.error("Peak Times gt 1 --- odd case #4467 email 20180725")
                #pdb.set_trace()
                self.pk_error = 2
#            elif len(peak_times) == 0:
#                logger.warning("This can only really happen if the largest\
#                               value in the multiple window is one off center\
#                               ...or looks like if peak is way early ... ")
#                #pdb.set_trace()
#                self.pk_error = 3
        if self.pk_error:
            return #can't calc zx about peak when you have no peak now can you?
        peak_time = np.real(peak_times[0])
        self.peak_time = peak_time
        self.peak_amplitude = poly(peak_time)
        #</identify peak time and amplitude>

        #<identify zero_crossings>
        zero_crossings = poly.roots
        zero_crossings = zero_crossings[np.isreal(zero_crossings)] #should be exactly two
        zero_crossings = [np.real(x) for x in zero_crossings] #should be exactly two
        zero_crossings = np.real(zero_crossings)
        if len(zero_crossings) != 2:
            #logger.warning("unexpected # zero crossings")
            #TODO: "add some logic here to grab the zero crossing nearest the peak, left and right"
            #self.zx_error = 1
            if len(zero_crossings) == 0:
                logger.critical("NO ZERO CROSSINGS")
                self.zx_error = 1
                return
            if len(zero_crossings) == 1:
                logger.critical("EXACTLY ONE ZERO CROSSINGS")
#                if zero_crossings[0] < peak_time:
#                    self.zero_crossing_prior = zero_crossings[0]
#                else:
#                    self.zero_crossing_after = zero_crossings[0]
                self.zx_error = 2
            if len(zero_crossings)>2:
                logger.critical("MORE THAN 2 ZERO CROSSINGS {}".format(len(zero_crossings)))
                #cases are:
                #1. There are zero crossings left and right ofthe peak
                #2. There are zero crossings only left of peak
                #3. THere aer zero crossings only right of the peak
                #check and see if we have one to either side of peak, if so take closest
                low_zx = zero_crossings[zero_crossings<peak_time]
                high_zx = zero_crossings[zero_crossings>peak_time]
                if ((len(low_zx) > 0) & (len(high_zx) > 0)): # we are ok
                    zero_crossings = np.array([np.max(low_zx), np.min(high_zx)])
                    self.zx_error = 0
                else:
                    #this is pretty messed up, you have zx's but they are
                    #all on one side of your peak ,...
                    self.zx_error = 3
                    return
        else:
            self.zx_error = 0
        #self.zero_crossing_after = None
        zero_crossings.sort()
        self.zero_crossing_prior = zero_crossings[0]
        self.zero_crossing_after = zero_crossings[1]
        self.area = intpoly(zero_crossings[1]) - intpoly(zero_crossings[0])


        return

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

    wffe.calculate_features()
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

    multiple_wavelet = tr.data[multiple_wavelet_indices_2]
    multiple_time_vector = time_vector[multiple_wavelet_indices_2]
    #seven-er or five-er above, so want index 3 or 2 respective
    n_points_in_window = len(multiple_wavelet)
    center_index = (n_points_in_window - 1) //2

    if multiple_wavelet[center_index+2] > multiple_wavelet[center_index]:
        logger.warning("Probably not a legitimate multiple... do we know what that means")
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
            wffe.calculate_features()
        #TODO: ADD RECURSION HERE!!! SHOULD CHECK IF two over is bigger again, if so
        #toss it the multiple is too late!!
    else:
        wffe = WaveletForFeatureExtraction(multiple_wavelet, multiple_time_vector, component=component, wavelet_type=wavelet_type)
        wffe.calculate_features()

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
    print('add sample time and zxs')
    return wffe

def add_wffe_to_feature_dict(wffe, feature_dict, index):
    """
    this is a pain when debugging, I have to press next a bunch fo times so factor it out
    """
    #pdb.set_trace()
    wavelet_feature_list = WAVELET_FEATURES[wffe.component]
    for feature in wavelet_feature_list:
        #print(feature, wffe.component, wffe.wavelet_type)
        key = '{}_{}_{}'.format(wffe.component, wffe.wavelet_type, feature)
        feature_dict[key][index] = wffe.__getattribute__(feature)
    return feature_dict




def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
