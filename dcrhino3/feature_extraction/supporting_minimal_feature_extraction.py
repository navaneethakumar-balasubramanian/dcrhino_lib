# -*- coding: utf-8 -*-
"""
Created on Thu Aug  2 16:25:58 2018

Author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import numpy as np
import pandas as pd
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)




def get_wavelet_window_indices(time_vector, start_time, end_time):
    """
    .. todo:: 20170823: this intended to replace variations on method from primary, multiple_peak_finder, multiple_refined,
        Here start and end times are intended to be floats
    """
    indices = np.where( (time_vector > start_time) & (time_vector < end_time) )[0]
    return indices



class WaveletForFeatureExtraction(object):
    """
    Calculates features on individual wavelets.  Actually
    the data here are "windows".  we think there are wavelets in these windows
    much of the time.
    """
    def  __init__(self, data, time_vector, wavelet_features, **kwargs):
        self.data = data
        self.time_vector = time_vector
        self.component = kwargs.get('component', None)
        self.wavelet_type = kwargs.get('wavelet_type', None)
        for k in wavelet_features:
            setattr(self, k, np.nan)







def extract_features_from_primary_wavelet(tr, primary_window_halfwidth_ms,
                                          component, wavelet_type, wavelet_features):
    """
    Search a region near lag=0 (t=0) for the primary-peak, in two steps:
        
        + step 1: find a local maxima
        + step 2: center on the local maxima
    
    Parameters:
        tr(Dataframe): TrimmedCorrelatedTracePacket()
        primary_window_halfwidth_ms (float): (~3ms) this is the expected half width of the primary
            peak, it can be approximate, we use it to define a chunk of the trace_data
            where we expect the primary peak to live.
        component (str): axial/tangential (to save values)
        wavelet_type (str):
        wavelet_features:
        
    Other Parameters:
        primary_wavelet_indices_1 (list): these are the indices of the data array used to extract
            the primary wavelet search region
        
    Returns:
        (Dataframe): Dataframe 'waveletforfeatureextraction'
    
    .. todo:: migrate this to seismic processing eventually

    """
    time_vector = tr.time_vector
    primary_window_halfwidth = primary_window_halfwidth_ms * 1e-3

    #<Get a window of data having duration ~2*primary_window_halfwidth, centered
    #on teh maximum value>
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
    #</Get a window of data having duration ~2*primary_window_halfwidth, centered
    #on teh maximum value>
    wffe = WaveletForFeatureExtraction(primary_wavelet,primary_time_vector, wavelet_features,
                                       component=component, wavelet_type=wavelet_type)
    wffe.max_amplitude = np.max(window_to_search_for_primary_1)
    wffe.max_time = hopefully_prim_center_time


    return wffe


def extract_features_from_multiple_wavelet(tr, time_vector, earliest_multiple_time,
                                           latest_multiple_time, component,
                                           wavelet_type, wavelet_features):
    """
    Search a region near lag=0 (t=0) for the primary-peak, in two steps:
        
        + step 1: find a local maxima
        + step 2: center on the local maxima
    
    Parameters:
        tr(Dataframe): TrimmedCorrelatedTracePacket()
        earliest_multiple_time (float): the earliest time expected to contain the multiple peak
        latest_multiple_time (float): the latest time expected to contain the multiple peak
        component (str): axial/tangential (to save values)
        wavelet_type (str):
        wavelet_features:
        
    Other Parameters:
        multiple_wavelet_indices_1 (list): these are the indices of the data array used to extract
            the multiple wavelet search region
        
    Returns:
        (Dataframe): Dataframe 'waveletforfeatureextraction'
        
    .. todo:: migrate this to seismic processing eventually
    .. todo:: Once ROBUST can probably use same routine for PRIM and MULT
    
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
        WaveletForFeatureExtraction(None, None, wavelet_features,
                                    component=component, wavelet_type=wavelet_type)
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
        wffe = WaveletForFeatureExtraction(None, None, wavelet_features, component=component, wavelet_type=wavelet_type)
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
            wffe = WaveletForFeatureExtraction(None, None, wavelet_features,
                                               component=component, wavelet_type=wavelet_type)
        else:
            wffe = WaveletForFeatureExtraction(multiple_wavelet, multiple_time_vector, wavelet_features,
                                               component=component, wavelet_type=wavelet_type)
        #TODO: ADD RECURSION HERE!!! SHOULD CHECK IF two over is bigger again, if so
        #toss it the multiple is too late!!
    else:
        wffe = WaveletForFeatureExtraction(multiple_wavelet, multiple_time_vector,
                                           wavelet_features, component=component,
                                           wavelet_type=wavelet_type)

    wffe.max_amplitude = np.max(window_to_search_for_multiple_1)
    wffe.max_time = hopefully_mult_center_time

    return wffe



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
