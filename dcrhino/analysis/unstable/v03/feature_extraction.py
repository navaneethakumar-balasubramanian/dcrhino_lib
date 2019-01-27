# -*- coding: utf-8 -*-
"""
Created on Fri Jan 18 17:27:40 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb
from dcrhino.analysis.util.general_helper_functions import init_logging
from dcrhino.analysis.unstable.feature_extraction.feature_extraction_20181226 import feature_extractor_J1

logger = init_logging(__name__)

def get_features_extracted_v3(df, global_config):
    """
    @type recipe_list: list
    @param recipe list: this is a list of keywords which dictate the feature
    extraction macro steps

    #can we get a definition of 'actual timestamp'... otherwise maybe we can give
    it a better name - "signed" actual_karl

    tangential_feature_df = pd.DataFrame(feature_list_for_df)

    svel = 1./(tangential_feature_df['tangential_delay'])#/global_config.dt)#1./delay**4
    svel = svel**4
    tangential_feature_df['shear_velocity'] = svel/1e4
    #pdb.set_trace()
    shear_modulus = tangential_feature_df['tangential_impedance']
    """
    try:
        recipe_list = global_config.recipe_list
    except AttributeError:
        logger.error("you need to add recipe list ot processsing json flow")
        recipe_list = ['J1', 'J0', '1810' ]
    #<OLD J0 FEATURES>
    try:
        axial_traces = df['axial']
        tangential_traces = df['tangential']
    except KeyError:
        axial_traces = df['axial_trace']#v3 branch integration
        tangential_traces = df['tangential_trace']
    #radial_traces = traces_dict['radial_trimmed_filtered_correlated_array']

    #tangential_despiked_filtered_correlated_traces = traces_dict['tangential_filtered_despiked_correlated_array']
    timestamp_array = df['timestamp']
    print("Extracting features")
    #initial_timestamp = timestamp_array[0]
    extracted_features_list = [None] * len(timestamp_array)
    for i, actual_timestamp in enumerate(timestamp_array):
        all_features_great_and_small = {}
        axial_trace = axial_traces.iloc[i]
        tangential_trace = tangential_traces.iloc[i]
        #radial_trace = radial_traces.iloc[i]
        #tangential_despiked_filtered_correlated = tangential_despiked_filtered_correlated_traces[i,:]
        all_features_great_and_small.update({'timestamp':actual_timestamp})
        if 'original' in recipe_list:
            extractor = FeatureExtractor(global_config.output_sampling_rate,
                                         global_config.primary_window_halfwidth_ms,
                                         global_config.multiple_window_search_width_ms,
                                         sensor_distance_to_source=global_config.sensor_distance_to_source)
            logger.error("J0 features not yet implemented in V3")
#            original_features = extractor.extract_features(actual_timestamp, axial_trace, tangential_trace,
#                                                       radial_trace, global_config.n_samples_trimmed_trace,
#                                                       -global_config.min_lag_trimmed_trace)
#            #pdb.set_trace()
#            all_features_great_and_small.update(original_features)
        if 'tangential_201810' in recipe_list:
            logger.error("1810 features not yet implemented in V3")
#            trim_tang_dspk = trim_trace(global_config.min_lag_trimmed_trace, global_config.max_lag_trimmed_trace,
#                                        global_config.num_taps_in_decon_filter, global_config.output_sampling_rate,
#                                        tangential_despiked_filtered_correlated)
#            qq = np.max(trim_tang_dspk)/np.max(tangential_trace)
#            trim_tang_dspk *= qq
#
#            feature_dict = get_tangential_despike_filtered_trace_features(trim_tang_dspk, global_config,
#                                                                          sanity_check_plot=False)
#            all_features_great_and_small.update(feature_dict)

        if 'J1' in recipe_list:
            trimmed_traces_dict = {}
            trimmed_traces_dict['axial'] = axial_trace
            trimmed_traces_dict['tangential'] = tangential_trace

            feature_dict = feature_extractor_J1(global_config, trimmed_traces_dict)
            all_features_great_and_small.update(feature_dict)

        extracted_features_list[i] = all_features_great_and_small
    #pdb.set_trace()
    #temp_df_to_file = pd.DataFrame(extracted_features_list)
    #temp_df_to_file.to_csv('/tmp/df_tmp.csv')
    extracted_features_list = [x for x in extracted_features_list if x is not None]
    dff = pd.DataFrame(extracted_features_list)
    print ("Features extracted")
    return dff


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
