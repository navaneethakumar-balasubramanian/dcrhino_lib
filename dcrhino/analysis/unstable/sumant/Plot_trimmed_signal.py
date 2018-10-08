#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Oct  1 12:21:11 2018

@author: sjha
"""

from __future__ import absolute_import, division, print_function


import datetime
import numpy as np
import os
import pdb
import pandas as pd
import matplotlib.pyplot as plt

#%matlplotlib qt




print('Path of data files. Files are grouped by sensor names - 5208 and 5451')
print('To change the sensor, change the file path in data dir variable from')
print('5208 to 5451')


home = os.path.expanduser("~/")
data_dir_new = os.path.join(home, 'data/datacloud/line_creek/pipeline/all_line_creek_ssx5208_3200')
data_dir_old = os.path.join(home, 'data/datacloud/line_creek/pipeline/old/ssx_5208')

print('Using just the holes for which we have data. In future, this will be modified')
hole_ids = [23531, 23631, 23731, 23831, 23930, 24030, 24130]

print('Extracted Features are Peak axial, radial and tangential and Multi axial')
print('MWD data are ROP/WOB/TOB, Time, depth, collar elevation, computed elevation')

feature_flavour = 'extracted_features'
mwd_flavour = 'hole_mwd'

print('Reading all holes and plotting them')

for hole_id in hole_ids:
    hole_id = 23831
    feature_csv_filebase = '793 - MR_77 - {}_{}.csv'.format(hole_id, feature_flavour)
    mwd_csv_filebase = '793 - MR_77 - {}_{}.csv'.format(hole_id, mwd_flavour)
    feature_fullfile = os.path.join(data_dir_new, feature_csv_filebase)
    mwd_fullfile = os.path.join(data_dir_new,mwd_csv_filebase)
    feature_df = pd.read_csv(feature_fullfile)
    mwd_df = pd.read_csv(mwd_fullfile, parse_dates=['time_start_hole','time_end_hole','time_start','time_end'])
    print(feature_df)
    print('*********')
    print(mwd_df)
    print('')

    print('Reading date of starting of hole')
    data_date = mwd_df.time_start_hole.dt.date.iloc[0]

   #pdb.set_trace()

    print('Reading extracted features from feature file')
    peak_ampl_axial = feature_df.axial_primary_peak_sample
    peak_ampl_tangential = feature_df.tangential_primary_peak_sample
    peak_ampl_radial = feature_df.radial_primary_peak_sample
    peak_mult_axial = feature_df.axial_multiple_peak_sample


    num_traces_in_blasthole = len(peak_ampl_axial)


    lower_num_ms=-5.0
    upper_num_ms=30.0


    project_id='Line_Creek'
    sampling_rate = 3200.0#3200
    trace_array_dict = {}
    traces_filename = '793 - MR_77 - {}_{}_deconvolved_traces.npy'.format(hole_id,'axial')#, row.hole, row.digitizer_id)

    input_filename = os.path.join(data_dir_old,traces_filename)

    print(input_filename)


    plot_title = "Correlated Trace QC {} Plots_{}_{}".format('Time',project_id, hole_id)
    print('Reading axial, tangential and radial numpy files')
    data = np.load(input_filename)
    pdb.set_trace()
    data_2800 = data[:,1600-280:1600+280]#this
    total_number_of_samples_2800 = len(data_2800)
    dt_2800 = 1.0/2800
    t_2800 = dt_2800*np.arange(560)

#    samples_per_trace = total_number_of_samples_2800 // num_traces_in_blasthole
#    data_2800 = data.reshape(num_traces_in_blasthole, samples_per_trace)



    data_3200 = data[:,1600-320:1600+320]
    total_number_of_samples_3200 = len(data_3200)

    dt_3200 = 1.0/3200
    t_3200 = dt_3200*np.arange(640)
#
#    samples_per_trace = total_number_of_samples_3200 // num_traces_in_blasthole
#    data_2800 = data.reshape(num_traces_in_blasthole, samples_per_trace)


    pdb.set_trace()













    fig, ax = plt.subplots(1,1, sharex=False, figsize=(11,8.5))
    ax.plot(t_3200, data_3200[42,:],linewidth = 0.2,color = 'r',label = '3200Hz')
    ax.plot(t_2800, data_2800[42,:],linewidth = 0.2,color = 'b',label = '2800Hz')
    ax.legend(loc=0)


