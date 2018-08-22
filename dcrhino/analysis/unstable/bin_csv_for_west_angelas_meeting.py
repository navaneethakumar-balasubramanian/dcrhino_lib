# -*- coding: utf-8 -*-
"""
Created on Mon Jul 30 17:09:26 2018

@author: kkappler

TODO: Each stage here should represent one layer of processing, and can be
a measurand.  Add a class for dataframe_table_measurand ... ?
This could be handled with a column called 'mask'.  That column could have a
 value default to False or 0.  Then, when we reject we do so by adding a code
 in the mask column.

"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb


HOME = os.path.expanduser("~/")

from plot_west_angelas_unbinned_qc_logs_v2_20180723 import warts_and_all_csv_file
#<debug>
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY

from dcrhino.analysis.unstable.panic.search_for_density_in_rhino import blast_holes_with_density_logs
master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
df_master = master_iterator_measurand.load()
#</debug>

#pdb.set_trace()
input_csv_fullname = warts_and_all_csv_file
#output_csv_fullname = input_csv_fullname.replace('.csv','_positive_rop.csv')
positive_rop_csv_filename = warts_and_all_csv_file.replace('.csv','_positive_rop.csv')
thresholded_data_filename = positive_rop_csv_filename.replace('.csv','_thresholded.csv')
binned_data_filename = thresholded_data_filename.replace('.csv','_binned.csv')
augmented_data_filename = binned_data_filename.replace('.csv','_density.csv')
#output_csv_fullname

def make_positive_rop_csv(input_csv_fullname, output_csv_fullname):
    df = pd.read_csv(input_csv_fullname)
    print('orig len', len(df))
    hole_uid_list = list(set(df.hole_uid))
    n_uids = len(hole_uid_list)
    i_uid = 0
    #epsilon = 1e-6
    frames = n_uids * [None]
    thresh = 0.006
    #pdb.set_trace()
    for hole_uid in hole_uid_list:

        sub_df = df[df['hole_uid'] == hole_uid]
        dz = np.diff(sub_df.depth)
        dzz = np.hstack((0.0, dz))
        sub_df['dz'] = pd.Series(dzz, index=sub_df.index)
        sub_df = sub_df[sub_df.dz>thresh]
    #    plt.plot(np.diff(sub_df.depth));
    #    plt.plot(0.005*np.ones(len(sub_df)), 'k')
    #    plt.show()
        frames[i_uid] = sub_df
        i_uid += 1
        print('ok')
    dff = pd.concat(frames)
    dff.to_csv(output_csv_fullname)
    return


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

def bin_single_hole_df(hole_df, bin_width, orientation=None):
    """
    """
    min_depth = hole_df['depth'].min()
    max_depth = hole_df['depth'].max()
    hole_length = max_depth - min_depth
    n_bins = int(np.ceil(hole_length/bin_width))
    binned_df_dict = {}
    columns_to_keep = hole_df.columns
    columns_to_drop = ['Unnamed: 0', 'Unnamed: 0.1', 'Unnamed: 0.1.1', 'dummy_hole_id']
                       #'datetime', 'dummy_hole_id']
    for label_to_drop in columns_to_drop:
        try:
            columns_to_keep = columns_to_keep.drop(label_to_drop)
        except ValueError:
            print('no {} column'.format(label_to_drop))

    try:
        n_bins = int(np.ceil(hole_length/bin_width))
    except OverflowError:
        print("CRITICAL FAIL HOLE INFO")
        return

    columns_to_copy = ['x', 'y', 'z', 'hole', 'hole_uid', 'datetime', 'orientation']
    for column_name in columns_to_copy:
        binned_df_dict[column_name] = hole_df[column_name].iloc[0]
#    if orientation is not None:
#        binned_df_dict['orientation'] = orientation
    columns_of_sub_df_for_numeric_binning = columns_to_keep.drop(columns_to_copy)
    #columns_of_sub_df_for_numeric_binning = columns_to_keep.drop('datetime')
    numeric_binning_sub_df = hole_df[columns_of_sub_df_for_numeric_binning]
    #pdb.set_trace()
    for column_name in numeric_binning_sub_df:
        binned_df_dict[column_name] = np.full(n_bins, np.nan)
    #binned_df_dict['datetime'] = []
    for i_bin in range(n_bins):
        bin_min = i_bin * bin_width; #bin_min_str = '{}'.format(bin_min)
        bin_max = bin_min + bin_width; #bin_max_str = '{}'.format(bin_max)
        #bin_max = (i_bin + 1) * bin_width;
        #pdb.set_trace()
        bin_df = numeric_binning_sub_df[(numeric_binning_sub_df['depth'] >= bin_min) & (numeric_binning_sub_df['depth'] < bin_max )]
        median_over_bin = bin_df.median()

        for column_name in columns_of_sub_df_for_numeric_binning:
#            if column_name=='datetime':
#                binned_df_dict['datetime'].append(bin_df.datetime.iloc[0])
#            else:
            binned_df_dict[column_name][i_bin] = median_over_bin[column_name]
#        binned_df_dict['datetime'].append(bin_df.datetime.iloc[0])
        #[i_bin] = bin_df.datetime.iloc[0]

    binned_df = pd.DataFrame.from_dict(data=binned_df_dict)
    return binned_df

def bin_data_to_resolution(input_csv_fullname, output_csv_fullname):
    """
    set this up to assume it is getting a single blasthole, write the for-loop
    overtop of it.
    """
    features_df = pd.read_csv(input_csv_fullname, parse_dates=['datetime',])
    unique_holes = list(set(np.asarray(features_df.hole_uid)))
    unique_holes.sort()
    n_holes = len(unique_holes)
    frames = n_holes * [None]
    bin_width = 0.10
    for i_hole, hole_uid in enumerate(unique_holes):
        print(i_hole, hole_uid)
        row = df_master[df_master['hole_uid']==hole_uid]
        orientation = row.orientation.iloc[0]
        hole_df = features_df[features_df['hole_uid']==hole_uid]

        frames[i_hole] = bin_single_hole_df(hole_df, bin_width, orientation=orientation)
        #pdb.set_trace()
    dff = pd.concat(frames)
    dff.to_csv(output_csv_fullname)
    return

def augment_with_density(input_csv_fullname, output_csv_fullname):
    """
    set this up to assume it is getting a single blasthole, write the for-loop
    overtop of it.
    """
    density_csv = '/home/kkappler/software/datacloud/dcrhino_lib/dcrhino/analysis/unstable/panic/compiled_density_data_20180819.csv'
    density_df = pd.read_csv(density_csv)
    features_df = pd.read_csv(input_csv_fullname, parse_dates=['datetime',])
    unique_holes = list(set(np.asarray(features_df.hole_uid)))
    unique_holes.sort()
    n_holes = len(unique_holes)

    frames = n_holes * [None]
    frames = []
    bin_width = 0.10
    for i_hole, hole_uid in enumerate(unique_holes):
        print(i_hole, hole_uid)
        row = df_master[df_master['hole_uid']==hole_uid]
        orientation = row.orientation.iloc[0]
        hole = row.hole.iloc[0]
        if hole in blast_holes_with_density_logs:
            hole_df = features_df[features_df['hole_uid']==hole_uid]
            pdb.set_trace()
            qq = density_df[density_df['HOLE_ID']==hole]
            # = [83, 111, 18, 36, 64, 91, 6, 127, 99, 44, 26, 224]

        #hole_df = features_df[features_df['hole_uid']==hole_uid]
        #hole_df['dogs'] = orientation

        #frames[i_hole] = bin_single_hole_df(hole_df, bin_width, orientation=orientation)
        #pdb.set_trace()
    dff = pd.concat(frames)
    dff.to_csv(output_csv_fullname)
    return

def main():
    """
    """
    #pdb.set_trace()
    #make_positive_rop_csv(warts_and_all_csv_file, positive_rop_csv_filename)
    #pdb.set_trace()
    #reject_other_criteria(positive_rop_csv_filename, thresholded_data_filename)
    pdb.set_trace()
    bin_data_to_resolution(thresholded_data_filename, binned_data_filename)
    #augment_with_density(binned_data_filename, augmented_data_filename)
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
