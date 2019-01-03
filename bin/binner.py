# -*- coding: utf-8 -*-
"""
Created on Tue Sep  11 14:33 2018

@author: kkappler

Process Tangential traces as per JIRA RPP-5

Steps:
    1. Identify location of data from 5208 July 8
    /home/kkappler/data/datacloud/west_angelas/20180709_SSX50401_5208_tangential.npy
"""

from __future__ import absolute_import, division, print_function

import ConfigParser
import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb
import scipy.signal as ssig
import argparse
from string import zfill

from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.math.windowing_scheme import sliding_window
#from dcrhino.analysis.signal_processing.seismic_processing import autocorrelate_trace
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.signal_processing.firls_bandpass import FIRLSFilter

from dcrhino.analysis.signal_processing.seismic_processing import autocorrelate_trace
from dcrhino.analysis.signal_processing.seismic_processing import deconvolve_trace_data
#from supporting_v02_processing import get_hole_data
from dcrhino.analysis.unstable.v02.config_file_parsing import L1L2ProcessConfiguration
from dcrhino.analysis.unstable.v02.config_file_parsing import get_metadata
from dcrhino.analysis.measurands.keys.data_key import DAQSerialNumberSamplingRateComponentTimeIntervalDataKey
from dcrhino.analysis.supporting_datetime import GMT
from dcrhino.analysis.util.interval import TimeInterval
from dcrhino.analysis.signal_processing.mwd_tools import get_interpolated_column


#<Functions belong in a supporting_qc module>
def reject_traces_with_small_rop(df, threshold=0.006):
    """

    """
    dz = np.diff(df.depth)

    dzz = np.hstack((0.0, dz))
    #pdb.set_trace()
    df['dz'] = pd.Series(dzz, index=df.index)
    sub_df = df[df.dz>threshold]
    return sub_df



def reject_corrupt_trace_features(column_label, data_series, rules, aux_data, mask=None):
    """
    column_label: This is for a case-switch type approach.  Some columns will
    have specific criteria by which we reject.

    This should probably be made to return a np.masked_array() type
    """
    return data_series


def reject_other_criteria(input_csv_fullname, output_csv_fullname):
    """
        features_df.drop(features_df[cond1].index, inplace=True)
        is equvalent to
        #features_df = features_df.drop(features_df[cond1].index)
    """
    features_df = pd.read_csv(input_csv_fullname)
    print(len(features_df))
    cond1 = (features_df['tangential_primary_peak_sample'] > 3 * features_df['axial_primary_peak_amplitude'])
    features_df.drop(features_df[cond1].index, inplace=True)
    print(len(features_df))

    cond2 = (features_df['radial_primary_peak_sample'] > 3 * features_df['axial_primary_peak_amplitude'])
    features_df.drop(features_df[cond2].index, inplace=True)
    print(len(features_df))

#    cond3 = (features_df['axial_primary_peak_amplitude'] < 0.125)
#    features_df.drop(features_df[cond3].index, inplace=True)
#    print(len(features_df))

    features_df.to_csv(output_csv_fullname)
    return

def apply_bin_df(df_features,bin_width,columns_to_bin=[]):
    averaging_scheme = 'median'

    #columns_to_bin = ['axial_multiple_peak_sample', 'axial_multiple_peak_time_sample',
    #                  'axial_primary_left_trough_time', 'axial_primary_left_trough_time_sample',
    #                  'axial_primary_peak_sample', 'axial_primary_peak_time_sample',
    #                  'axial_primary_zero_crossing_after_sample', 'axial_primary_zero_crossing_prior_sample',
    #                  'radial_primary_peak_sample', 'tangential_primary_peak_sample',
    #                  'mse','MSE', 'weight_on_bit', 'rop', 'torque', 'rpm', 'air_pressure',
    #                  'depth', 'pseudo_ucs', 'pseudo_velocity', 'pseudo_density',
    #                  'reflection_coefficient', 'axial_delay', 'axial_velocity_delay',]

    columns_to_keep = ['x', 'y']

    binned_df_dict = {}


    #hole_mwd_filename = os.path.join(folder_path, 'hole_mwd.csv')
    #features_filename = os.path.join(folder_path, 'extracted_features.csv')
    #df_mwd = pd.read_csv(hole_mwd_filename)
    #df_features = pd.read_csv(features_filename)

    max_depth = df_features['depth'].max()
    columns_to_bin = np.append(columns_to_bin,'depth')


    #<Do global trace rejection here>
    print("we may wish to split the df into features from mwd vs features\
          from rhino.  Bad traces we reject from rhino but not necessarily\
          from mwd columns")
    #df_ignored = df_features[ignore_cols]
    #df_features = df_features.drop(ignore_cols,axis=1)
    df_features = reject_traces_with_small_rop(df_features, threshold=0.005)
    matched_columns_to_bin = (list(set(columns_to_bin) & set(df_features.columns)))
    #matched_columns_to_bin = matched_columns_to_bin + list(df_ignored.columns)
    sub_df_for_binning = df_features[matched_columns_to_bin]
    #sub_df_for_binning = pd.concat([sub_df_for_binning, df_ignored], ignore_index=True)

    #calc these lines on df_for_binning means may not go from surface to bottom of hole
    n_bins = int(np.ceil(max_depth/bin_width))
    bin_edges = bin_width * np.arange(n_bins+1)
    #</Do global trace rejection here>

    #pdb.set_trace()
    #N.B This section could probably be vectorized, but its pretty fast
    #anyhow so lets keep it as a "nested for loop" for now.
    for column_name in matched_columns_to_bin:
        binned_df_dict[column_name] = np.full(n_bins, np.nan)
    for i_bin in range(n_bins):
        #print("ibin {}, from {} to {}".format(i_bin, bin_edges[i_bin], bin_edges[i_bin+1]))
        condition_1 = (sub_df_for_binning['depth'] >= bin_edges[i_bin])
        condition_2 = (sub_df_for_binning['depth'] < bin_edges[i_bin + 1])
        #pdb.set_trace()
        bin_df = sub_df_for_binning[condition_1 & condition_2]
        if averaging_scheme == 'median':
            median_over_bin = bin_df.median()
        else:
            print("averaging scheme {} not yet supported".format(averaging_scheme))
            raise Exception
        for column_name in matched_columns_to_bin:
            print (column_name)
            binned_df_dict[column_name][i_bin] = median_over_bin[column_name]

    binned_df = pd.DataFrame.from_dict(data=binned_df_dict)
    #binned_blasthole_measurand.save(binned_df) **** <- need to start using this I think ...
    #outfname = features_filename.replace('features', 'features_binned_{}cm'.format(int(100*bin_width)))
    #binned_df.to_csv(outfname)
    return binned_df

def main():


    bin_width = 0.05 #5cm bin default.  Slow drills we can go to 1cm, fast may need 10cm


    argparser = argparse.ArgumentParser(description="Binner v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-f', '--hole-folder', help="Hole Folder", required=True)
    argparser.add_argument('-w', '--bin-width', help="Bin Width", default=bin_width)
    args = argparser.parse_args()


    hole_folder = args.hole_folder
    features_filename = os.path.join(hole_folder, 'extracted_features.csv')
    df_features = pd.read_csv(features_filename)
    bin_width = float(args.bin_width)
    binned_df = apply_bin_df(df_features,bin_width)
    outfname = features_filename.replace('features', 'features_binned_{}cm'.format(int(100*bin_width)))
    binned_df.to_csv(outfname)


    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
