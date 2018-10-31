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

import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

from string import zfill



#<Functions belong in a supporting_qc module>
def reject_traces_with_small_rop(df, threshold=0.006):
    """
    This is not perfect - there is a bit of a cheat here I acknowledge (adding
    the zero), but its pretty honest.
    I'm placing a copy of it in mwd_tools for import with other methods
    """
    dz = np.diff(df.depth)
    dz = np.hstack((0.0, dz))
    #pdb.set_trace()
    df['dz'] = pd.Series(dz, index=df.index)
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
    cond1 = (features_df['tangential_primary_peak_sample'] > 2 * features_df['axial_primary_peak_amplitude'])
    features_df.drop(features_df[cond1].index, inplace=True)
    print(len(features_df))

    cond2 = (features_df['radial_primary_peak_sample'] > 2 * features_df['axial_primary_peak_amplitude'])
    features_df.drop(features_df[cond2].index, inplace=True)
    print(len(features_df))

    cond3 = (features_df['axial_primary_peak_amplitude'] < 0.125)
    features_df.drop(features_df[cond3].index, inplace=True)
    print(len(features_df))

    features_df.to_csv(output_csv_fullname)
    return
#<Functions belong in a supporting_qc module>

home = os.path.expanduser("~")
data_path = os.path.join(home, 'data', 'datacloud')
pipeline_path = os.path.join(data_path, 'rhino_process_pipeline_output')
mine_name = 'line_creek'
mine_path = os.path.join(pipeline_path, mine_name)
digitizer_ids = [5208, 5451]
sampling_rates = [3200.0,]
data_keys = [(x,y) for x in digitizer_ids for y in sampling_rates]
#pdb.set_trace()
bin_width = 0.05 #5cm bin default.  Slow drills we can go to 1cm, fast may need 10cm
#belongs in cfg
averaging_scheme = 'median'

hole_folders = ['793-MR_77-23531', '793-MR_77-23631', '793-MR_77-23731',
                '793-MR_77-23831', '793-MR_77-23930', '793-MR_77-24030',
                '793-MR_77-24130', ]

columns_to_bin = ['axial_multiple_peak_sample', 'axial_multiple_peak_time_sample',
                  'axial_primary_left_trough_time', 'axial_primary_left_trough_time_sample',
                  'axial_primary_peak_sample', 'axial_primary_peak_time_sample',
                  'axial_primary_zero_crossing_after_sample', 'axial_primary_zero_crossing_prior_sample',
                  'radial_primary_peak_sample', 'tangential_primary_peak_sample',
                  'mse', 'weight_on_bit', 'rop', 'torque', 'rpm', 'air_pressure',
                  'depth', 'pseudo_ucs', 'pseudo_velocity', 'pseudo_density',
                  'reflection_coefficient', 'axial_delay', 'axial_velocity_delay',]

columns_to_keep = ['x', 'y']


binned_df_dict = {}

#<keep the easting, northing info etc>
#columns_to_keep = ['x', 'y']
#for column_name in columns_to_copy:
#    binned_df_dict[column_name] = hole_df[column_name].iloc[0]
#</keep the easting, northing info etc>


for digitizer_id in digitizer_ids:
    digitizer_path = os.path.join(mine_path, '{}'.format(digitizer_id))
    for sampling_rate in sampling_rates:
        sampling_rate_path = os.path.join(digitizer_path, '{}'.format(int(sampling_rate)) )
        for hole_folder in hole_folders:
            hole_path = os.path.join(sampling_rate_path, hole_folder)
            #hole_mwd_filename = os.path.join(hole_path, 'hole_mwd.csv')
            features_filename = os.path.join(hole_path, 'extracted_features.csv')
            #df_mwd = pd.read_csv(hole_mwd_filename)
            df_features = pd.read_csv(features_filename)
            max_depth = df_features['depth'].max()
            #calc these lines on df_for_binning means may not go from surface to bottom of hole
            n_bins = int(np.ceil(max_depth/bin_width))
            bin_edges = bin_width * np.arange(n_bins+1)

            #<Do global trace rejection here>
            print("we may wish to split the df into features from mwd vs features\
                  from rhino.  Bad traces we reject from rhino but not necessarily\
                  from mwd columns")
            df_features = reject_traces_with_small_rop(df_features, threshold=0.005)
            sub_df_for_binning = df_features[columns_to_bin]


            #</Do global trace rejection here>


            #pdb.set_trace()
            #N.B This section could probably be vectorized, but its pretty fast
            #anyhow so lets keep it as a "nested for loop" for now.
            #<init dict>
            for column_name in columns_to_bin:
                binned_df_dict[column_name] = np.full(n_bins, np.nan)
            for i_bin in range(n_bins):
                print("ibin {}, from {} to {}".format(i_bin, bin_edges[i_bin], bin_edges[i_bin+1]))
                condition_1 = (sub_df_for_binning['depth'] >= bin_edges[i_bin])
                condition_2 = (sub_df_for_binning['depth'] < bin_edges[i_bin + 1])
                #pdb.set_trace()
                bin_df = sub_df_for_binning[condition_1 & condition_2]
                if averaging_scheme == 'median':
                    median_over_bin = bin_df.median()
                    #TODO: nan median is default for pandas dataframe?
                else:
                    print("averaging scheme {} not yet supported".format(averaging_scheme))
                    raise Exception
                for column_name in columns_to_bin:
                    binned_df_dict[column_name][i_bin] = median_over_bin[column_name]

            binned_df = pd.DataFrame.from_dict(data=binned_df_dict)
            #binned_blasthole_measurand.save(binned_df) **** <- need to start using this I think ...
            outfname = features_filename.replace('features', 'features_binned_{}cm'.format(int(100*bin_width)))
            binned_df.to_csv(outfname)


#    return binned_df
#            for column_label in columns_to_bin:
#                data_series = df_for_binning[column_label]
#                #<Specific trace rejection by feature here>
#                rules = 'description_of_how_to_reject'
#                aux_data = None
#                data_series = reject_corrupt_trace_features(column_label, data_series, rules, aux_data)
#
#                #<Specific trace rejection by feature here>



def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
