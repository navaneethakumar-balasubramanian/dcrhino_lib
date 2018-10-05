# -*- coding: utf-8 -*-
"""
Created on Thu Sep  6 12:14:02 2018

@author: kkappler

This script is dedicated to a "quick-n-dirty" QC of some field data we are getting in.

We do not have MWD.  Therefore we do not know when blastholes are being drilled ...
we just want a cursory look at the data.

The input file we are plotting 20180910  16:55:26 --> 17:54:52
spans approximately 1Hour.


"""

from __future__ import absolute_import, division, print_function


import datetime
import numpy as np
import os
import pdb
import pandas as pd

#%matlplotlib qt

from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots09192018 import qc_plot
from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots09192018 import QCBlastholePlotInputs
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.signal_processing.mwd_tools_for_line_creek import get_interpolated_column


print('Path of data files. Files are grouped by sensor names - 5208 and 5451')
print('To change the sensor, change the file path in data dir variable from')
print('5208 to 5451')


sensor = 5451

home = os.path.expanduser("~/")
data_dir_new = os.path.join(home, 'data/datacloud/line_creek/pipeline/line_creek/5451/2800')
#data_dir_old = os.path.join(home, 'data/datacloud/line_creek/pipeline/old/ssx_5451')

print('Using just the holes for which we have data. In future, this will be modified')
hole_ids = [23531, 23631, 23731, 23831, 23930]

print('Extracted Features are Peak axial, radial and tangential and Multi axial')
print('MWD data are ROP/WOB/TOB, Time, depth, collar elevation, computed elevation')

feature_flavour = 'extracted_features'
mwd_flavour = 'hole_mwd'

print('Reading all holes and plotting them')

for hole_id in hole_ids:
#    hole_id = 23831
    file_path = '793-MR_77-{}'.format(hole_id)
    cur_work_dir = os.path.join(data_dir_new,file_path)
#    feature_csv_filebase = '793 - MR_77 - {}_{}.csv'.format(hole_id, feature_flavour)
#    mwd_csv_filebase = '793 - MR_77 - {}_{}.csv'.format(hole_id, mwd_flavour)
    feature_csv_filebase = 'extracted_features.csv'
    mwd_csv_filebase = 'hole_mwd.csv'
    feature_fullfile = os.path.join(cur_work_dir, feature_csv_filebase)
    mwd_fullfile = os.path.join(cur_work_dir,mwd_csv_filebase)
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


# Depth conversion
#<Karl's method>
    time_vector = pd.date_range(start=mwd_df.time_start_hole.iloc[0], periods=num_traces_in_blasthole, freq='1S')
    depth = get_interpolated_column(time_vector, mwd_df, 'computed_elevation')
    pdb.set_trace()
#</Karl's method>
#/Depth Conversion
    project_id='Line_Creek'
#    sampling_rate = 3200.0#3200
    correlated_traces_sampling_rate = 2800;#normally set this = sampling_rate
    trace_array_dict = {}
    for component_label in COMPONENT_LABELS:
        print(hole_id)
        print(component_label)
#        traces_filename = '793 - MR_77 - {}_{}_deconvolved_traces.npy'.format(hole_id,component_label)#, row.hole, row.digitizer_id)
        traces_filename = '{}_filtered_correlated_traces.npy'.format(component_label)
        input_filename = os.path.join(cur_work_dir,traces_filename)

        print(input_filename)
        print('Just doing some bookkeeping here- making output file name, plot titles etc.')

        output_filename = '793 - MR_77 - {}_{}_{}_QC_Plots.png'.format(hole_id,'Time',sensor)

        plot_title = "Correlated Trace QC {} Plots,Project:{}, Hole:{}, Sensor:{},Drill_ID:{}".format('Time',project_id, hole_id,sensor,mwd_df.machine_id[0])

        print('Reading axial, tangential and radial numpy files')
        data = np.load(input_filename)
        pdb.set_trace()
        num_traces_in_blasthole, samples_per_trace = data.shape
        trace_array_dict[component_label] = data.T
#        pdb.set_trace()
        #total hack
        if correlated_traces_sampling_rate == 2400:
            trace_array_dict[component_label] = trace_array_dict[component_label][240-12:240+72,:]
        elif correlated_traces_sampling_rate == 2800:
            trace_array_dict[component_label] = trace_array_dict[component_label][280-14:280+84,:]
        elif correlated_traces_sampling_rate == 3200:
            trace_array_dict[component_label] = trace_array_dict[component_label][320-16:320+96,:]

        print("Step 2: call the plotter");
    lower_num_ms=-5.0
    upper_num_ms=30.0

    print('Normalizing amplitudes. If you want it not normalized, comment out the portion below')
    normalize_by_max_amplitude =  True
    if normalize_by_max_amplitude:
        for component_label in COMPONENT_LABELS:#in ['x', 'y', 'z']:
            nans_locations = np.where(np.isnan(trace_array_dict[component_label]))
            trace_array_dict[component_label][nans_locations]=0.0
            num_samples, num_traces = trace_array_dict[component_label].shape
            max_amplitudes = np.max(trace_array_dict[component_label], axis=0)
            trace_array_dict[component_label] = trace_array_dict[component_label]/max_amplitudes
            trace_array_dict[component_label][nans_locations] = np.nan

    print('Normalization done. Creating inputs for plotting')

    qc_plot_input = QCBlastholePlotInputs(trace_array_dict=trace_array_dict,
                                              sub_mwd_time = mwd_df.time_start,
                                              sub_mwd_depth_interp = depth,
                                              sub_mwd_rop = mwd_df.rop,
                                              sub_mwd_depth = mwd_df.computed_elevation,
                                              sub_mwd_wob = mwd_df.weight_on_bit/1000.0,
                                              sub_mwd_tob = mwd_df.torque,
                                              peak_ampl_x=peak_ampl_axial,
                                              peak_ampl_y=peak_ampl_tangential,
                                              peak_ampl_z=peak_ampl_radial,
                                              peak_mult_x=peak_mult_axial,
                                              lower_number_ms=lower_num_ms, upper_number_ms=upper_num_ms,
                                              mwd_tstart = mwd_df.time_start.iloc[0],
                                              mwd_tend = mwd_df.time_end.iloc[-1],
                                              mwd_start_depth = mwd_df.computed_elevation.iloc[0],
                                              mwd_end_depth = mwd_df.computed_elevation.iloc[-1],
                                              collar_elevation = np.mean(mwd_df.collar_elevation),
											  rock_type = mwd_df.rock_type)

    print('Passing values to plot code- supporting qc blasthole plots')
    qc_plot(qc_plot_input, output_filename,plot_title, data_date, 'Line Creek', show=True)

    print("ok, now make the qc plot")


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
