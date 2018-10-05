#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Oct  4 15:30:16 2018

@author: sjha
"""


from __future__ import absolute_import, division, print_function


import datetime
import numpy as np
import os
import pdb
import pandas as pd
import matplotlib.pyplot as plt

from matplotlib.ticker import AutoMinorLocator

#%matlplotlib qt

#from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots09192018 import qc_plot
#from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots09192018 import QCBlastholePlotInputs
#from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.signal_processing.mwd_tools_for_line_creek import get_interpolated_column

class ColourBarAxisLimtis(object):
    """
    supports kwarg colourbar_type {'each_axis', 'all_one'}
    WARNING: 'each_axis' not yet tested
    """
    def __init__(self, **kwargs):
        """
        TODO: make v_min[1], rather than y_1, i.e. use a dictionary
        """
        self.colourbar_type =  kwargs.get('colourbar_type', 'all_one')
        self.num_axes = kwargs.get('num_axes', 3)
        self.v_min_all = kwargs.get('v_min_all', -0.5)
        self.v_max_all = kwargs.get('v_max_all',  0.5)
        self.axes_limts = {}
#        for i_ax in range(self.num_axes):
#            self.axes = kwargs.get('v_min_1', -0.5)
        self.v_min_1 = kwargs.get('v_min_1', -0.5)
        self.v_max_1 = kwargs.get('v_max_1',  0.5)
        self.v_min_2 = kwargs.get('v_min_2', -0.5)
        self.v_max_2 = kwargs.get('v_max_2',  0.5)
        self.v_min_3 = kwargs.get('v_min_3', -0.5)
        self.v_max_3 = kwargs.get('v_max_3',  0.5)
        if self.colourbar_type == 'all_one':
            self.assign_to_all()

    def assign_to_all(self):
        self.v_min_1 = self.v_min_all
        self.v_max_1 = self.v_max_all
        self.v_min_2 = self.v_min_all
        self.v_max_2 = self.v_max_all
        self.v_min_3 = self.v_min_all
        self.v_max_3 = self.v_max_all

print('Path of data files. Files are grouped by sensor names - 5208 and 5451')
print('To change the sensor, change the file path in data dir variable from')
print('5208 to 5451')


sensor = 5451

#home = os.path.expanduser("~/")
cur_work_dir= ('/home/sjha/data/datacloud/mount_milligan/Mount Milligan Mine/5306/4000/965-106-3014')
#pdb.set_trace()
#data_dir_old = os.path.join(home, 'data/datacloud/line_creek/pipeline/old/ssx_5451')


feature_flavour = 'extracted_features'
mwd_flavour = 'hole_mwd'

feature_csv_filebase = 'extracted_features.csv'
mwd_csv_filebase = 'hole_mwd.csv'
feature_fullfile = os.path.join(cur_work_dir, feature_csv_filebase)
mwd_fullfile = os.path.join(cur_work_dir,mwd_csv_filebase)
feature_df = pd.read_csv(feature_fullfile)
mwd_df = pd.read_csv(mwd_fullfile, parse_dates=['time_start_utc','time_end_utc'])


   #pdb.set_trace()

print('Reading extracted faxial features from feature file. Need this to know the ')
print('Number of traces in blasthole')

peak_ampl_axial = feature_df.axial_primary_peak_sample

num_traces_in_blasthole = len(peak_ampl_axial)


lower_num_ms=-5.0
upper_num_ms=30.0


# Depth conversion
#time_arr = np.arange(row.time_start,row.time_end,datetime.timedelta(seconds = datetime_delta)).astype(datetime.datetime)
#depth = get_interpolated_computed_elevation(time_arr,sub_mwd_df)
#<Karl's method>
time_vector = pd.date_range(start=mwd_df.time_start_utc.iloc[0], periods=num_traces_in_blasthole, freq='1S')
depth = get_interpolated_column(time_vector, mwd_df, 'computed_elevation')
#</Karl's method>
#/Depth Conversion
correlated_traces_sampling_rate = 2800;#normally set this = sampling_rate
trace_array_dict = {}
traces_filename = '{}_filtered_correlated_traces.npy'.format('axial')
input_filename = os.path.join(cur_work_dir,traces_filename)

print(input_filename)
print('Just doing some bookkeeping here- making output file name, plot titles etc.')

output_filename = 'Demo {}_{}_QC_Plots.png'.format('Depth',sensor)

plot_title = "Demo QC {} Plots,Sensor:{},Drill_ID:{}".format('Depth',sensor,mwd_df.machine_id[0])

data = np.load(input_filename)
num_traces_in_blasthole, samples_per_trace = data.shape
trace_array_dict['axial'] = data.T
#        pdb.set_trace()
#total hack
if correlated_traces_sampling_rate == 2400:
    trace_array_dict['axial'] = trace_array_dict['axial'][240-12:240+72,:]
elif correlated_traces_sampling_rate == 2800:
    trace_array_dict['axial'] = trace_array_dict['axial'][280-14:280+84,:]
elif correlated_traces_sampling_rate == 3200:
    trace_array_dict['axial'] = trace_array_dict['axial'][320-16:320+96,:]

print("Step 2: call the plotter");
lower_num_ms=-5.0
upper_num_ms=30.0


print("ok, now make the qc plot")




colourbar_type = 'all_one'#'all_one' vs
cbal = ColourBarAxisLimtis(colourbar_type=colourbar_type)#, v_min_1=-22)
cmap_string = 'jet'
#</sort our colorbar business>

#<Get inputs and reshape where appropriate>
trace_array_dict['axial'] = np.flipud(trace_array_dict['axial'])
#</Get inputs and reshape where appropriate>

num_traces_per_component, num_samples = trace_array_dict['axial'].T.shape

#	if using depth plot
X =-1*(depth)



	# Spread out Y
Y = np.flipud(np.linspace(lower_num_ms, upper_num_ms, trace_array_dict['axial'].shape[0]))

#    Generate figure and axis objects to plot. 6 rows, not sharing X axis
fig, ax = plt.subplots(nrows=1, sharex=False, figsize=(24,11))


#<sort out yticks every 5 ms>
dt_ms = 5
lowest_y_tick =  int(lower_num_ms/dt_ms)
greatest_y_tick = int(upper_num_ms/dt_ms)

y_tick_locations = dt_ms * np.arange(lowest_y_tick, greatest_y_tick + 1)
#<sort out yticks every 5 ms>


minor_locator = AutoMinorLocator()
ax.pcolormesh(X, Y, trace_array_dict['axial'], cmap=cmap_string)
ax.set_ylabel('time (ms)')
ax.invert_yaxis()
ax.set_yticks(y_tick_locations, minor=False)

ax.yaxis.set_minor_locator(minor_locator)
ax.tick_params(which='major', width=1)
ax.tick_params(which='major', length=8)
ax.tick_params(which='minor', length=4, color='r', width=0.5)
ax.set_xlim(X[0], X[-1])


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
