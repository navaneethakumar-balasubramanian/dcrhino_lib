# -*- coding: utf-8 -*-
"""
Created on Thu May 31 11:57:09 2018

@author: kkappler

TODO: Make a list of the variants of QC plots we want to support.
There are the classic 3ch heatmaps, max amplitudes, etc.  But there are
configurations we would like where we show combinations and subselections
of peak amplitude, delay, width, rms etc
as well as heatmaps of any of the three components but not necessarily all of them.

"""


from __future__ import absolute_import, division, print_function


import datetime

import matplotlib.pyplot as plt
import numpy as np
#import os
import pdb
import pandas as pd
from scipy import interpolate
#from scipy.interpolate import interp1d


#from mpl_toolkits.axes_grid1 import make_axes_locatable
from matplotlib.ticker import (MultipleLocator, FormatStrFormatter,
                                   AutoMinorLocator)

from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
#home = os.path.expanduser("~/")
class QCBlastholePlotInputs(object):
    """
    """
    def __init__(self, **kwargs):
        self.trace_array_dict = kwargs.get('trace_array_dict', None)

        #<These are variables needed to generate plots>
        self.peak_ampl_x  = kwargs.get('peak_ampl_x', None)
        self.peak_ampl_y  = kwargs.get('peak_ampl_y', None)
        self.peak_ampl_z  = kwargs.get('peak_ampl_z', None)
        self.peak_mult_x  = kwargs.get('peak_mult_x', None)
        self.peak_ampl_x_ndx = kwargs.get('peak_ampl_x_ndx', None)
        self.peak_mult_x_ndx = kwargs.get('peak_mult_x_ndx', None)
        self.sub_mwd_depth = kwargs.get('sub_mwd_depth',None)
        self.sub_mwd_depth_interp = kwargs.get('sub_mwd_depth_interp',None)
        self.sub_mwd_time = kwargs.get('sub_mwd_time',None)
        self.mwd_tstart = kwargs.get('mwd_tstart',None)
        self.mwd_tend = kwargs.get('mwd_tend',None)
        self.mwd_start_depth = kwargs.get('mwd_start_depth',None)
        self.mwd_end_depth = kwargs.get('mwd_end_depth',None)
        self.sub_mwd_wob = kwargs.get('sub_mwd_wob',None)
        self.sub_mwd_tob = kwargs.get('sub_mwd_tob',None)
        self.sub_mwd_rop = kwargs.get('sub_mwd_rop',None)
        self.collar_elevation = kwargs.get('collar_elevation',None)
		#</These are variables needed to generate plots>

        #<these numbers dictate the y axis bounds>
        self.lower_number_ms = kwargs.get('lower_number_ms', None)
        self.upper_number_ms = kwargs.get('upper_number_ms', None)
        self.lower_number_ms_new = kwargs.get('lower_number_ms_new', None)
        self.upper_number_ms_new = kwargs.get('upper_number_ms_new', None)
        #</these numbers dictate the y axis bounds>

        #<We dont currently use this, but it is referred to by the plotter>
        self.center_trace_dict = kwargs.get('center_trace_dict', None)
        self.two_way_travel_time_ms = kwargs.get('two_way_travel_time_ms', None)
        self.multiple_search_back_ms = kwargs.get('multiple_search_back_ms', None)
        self.multiple_search_forward_ms = kwargs.get('multiple_search_forward_ms', None)
        #</We dont currently use this, but it is referred to by the plotter>

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


def plot_hole_as_heatmap(ax, v_min, v_max, X, Y, Z, cmap_string, y_tick_locations,
                         two_way_travel_time_ms=None, multiple_search_back_ms=None,
                         multiple_search_forward_ms=None):
    """
	#Heatmap plots for axial, radial and tangential data
    """
    minor_locator = AutoMinorLocator()
    if any([x is None for x in [v_min, v_max]]):# autoselcet color axes
        heatmap = ax.pcolormesh(X, Y, Z, cmap=cmap_string)
    else:
        heatmap = ax.pcolormesh(X, Y, Z, cmap=cmap_string, vmin=v_min, vmax=v_max)

    ax.set_ylabel('time (ms)')
    ax.invert_yaxis()
    ax.set_yticks(y_tick_locations, minor=False)

    ax.yaxis.set_minor_locator(minor_locator)
    ax.tick_params(which='major', width=1)
    ax.tick_params(which='major', length=8)
    ax.tick_params(which='minor', length=4, color='r', width=0.5)

    if two_way_travel_time_ms is not None:
        ax.plot(np.asarray([X[0], X[-1]]), two_way_travel_time_ms*np.ones(2), 'r', linewidth=1.)
        #this indent not a bug/error
        if multiple_search_back_ms is not None:
            ax.plot(np.asarray([X[0], X[-1]]), (two_way_travel_time_ms - multiple_search_back_ms) * np.ones(2), 'k', linewidth=1.)
        if multiple_search_forward_ms is not None:
            ax.plot(np.asarray([X[0], X[-1]]), (two_way_travel_time_ms + multiple_search_forward_ms) * np.ones(2), 'k', linewidth=1.)

    ax.set_xlim(X[0], X[-1])
    return ax, heatmap


def header_plot(ax, X, qc_plot_input, plot_title, peak_amplitude_linewidth = 0.2):
    """
	#Peak axial, radial, tangential and multiple plots
    """
    ax.plot(X, qc_plot_input.peak_ampl_y, label='peak_y', linewidth=peak_amplitude_linewidth)
    ax.plot(X, qc_plot_input.peak_ampl_z, label='peak_z', linewidth=peak_amplitude_linewidth)
    ax.plot(X, qc_plot_input.peak_mult_x, label='mult_x', linewidth=peak_amplitude_linewidth)
    ax.plot(X, qc_plot_input.peak_ampl_x, label='peak_x', linewidth=peak_amplitude_linewidth)
    ax.legend()
    ax.set_title(plot_title)
    ax.set_ylim(0.0, 2.0)
    ax.set_xlim(X[0], X[-1])
    return


def depth_vs_time_plot(ax,qc_plot_input):
    """
    TODO: read PEP8
    code is read much more often than it it written

	The tricky part of code begins here. BE VERY CAREFUL WHEN MAKING QC PLOTS
	IN TIME AND DEPTH. TO MAKE QC PLOTS IN TIME, UNCOMMENT ALL TIME PART OF THE
	CODE AND COMMENT OUT DEPTH PART OF CODE IN THIS CLASS. FOR DEPTH, VICE VERSA
    """
#


#    depth_axis = np.linspace(min(qc_plot_input.sub_mwd_depth_interp),max(qc_plot_input.sub_mwd_depth_interp),len(qc_plot_input.sub_mwd_depth))

    ax2 = ax.twinx()

#	##<time part>
    time_axis = qc_plot_input.sub_mwd_time
    ax.plot(time_axis, qc_plot_input.sub_mwd_depth, '*',label = 'Computed Elevation')
    ax.plot(time_axis, qc_plot_input.sub_mwd_depth)

    ax2.plot(time_axis,qc_plot_input.sub_mwd_rop,label = 'RoP (m/hr)',color = 'r')
    ax.set_xlim(time_axis.iloc[0], time_axis.iloc[-1])
    ax.set_xlabel('Timestamps')
#	##</time part>


	#<depth part>
#    depth_axis = -1*(qc_plot_input.sub_mwd_depth-qc_plot_input.collar_elevation)
#    ax.plot(depth_axis, qc_plot_input.sub_mwd_depth, '*',label = 'Datapoints')
#    ax.plot(depth_axis, qc_plot_input.sub_mwd_depth, label = 'Interpolated')
#
#    ax2.plot(depth_axis,qc_plot_input.sub_mwd_rop,label = 'RoP (m/hr)',color = 'r')
#    ax.set_xlim(depth_axis.iloc[0], depth_axis.iloc[-1])

	#</depth part>

	#Labeling
    ax.legend(loc=2)
    ax.set_ylabel('Computed \n Elevation (m)')

    ax2.legend(loc=1)
    ax2.set_ylabel('RoP (m/hr)')
#

    return


#Depth Interpolation using Thiago's method. Redundant for this code. But leave
	#in for now.
def get_interpolated_computed_elevation(date_times,mwd_hole_df):

    elevation_means = [None] * len(date_times)
    i = 0
    for dtime in date_times:
        computed_elevation_mean = mwd_hole_df[mwd_hole_df['starttime'] == dtime]['computed_elevation'].mean()
        elevation_means[i] = computed_elevation_mean
        i +=1

    elevation_means= np.array(elevation_means)

    return fill_nan(elevation_means)


def fill_nan(A):
    '''
    interpolate to fill nan values
    '''
    inds = np.arange(A.shape[0])
    good = np.where(np.isfinite(A))
    f = interpolate.interp1d(inds[good], A[good], bounds_error=False)
    B = np.where(np.isfinite(A),A,f(inds))
    return B
#/End depth interpolation

def wob_tob_plot(ax,qc_plot_input):
    ax2 = ax.twinx()

#	#<Time part>
    time_axis = qc_plot_input.sub_mwd_time
    ax.plot(time_axis, qc_plot_input.sub_mwd_wob,label = 'Force on Bit',color = 'b')
    ax2.plot(time_axis, qc_plot_input.sub_mwd_tob, label = 'Torque on Bit',color = 'r')
    ax.set_xlabel('Timestamps')
    ax.set_xlim(time_axis.iloc[0], time_axis.iloc[-1])
#	#</Time part>

	#<Depth Part>
#    depth_axis = -1*(qc_plot_input.sub_mwd_depth-qc_plot_input.collar_elevation)
#    ax.plot(depth_axis, qc_plot_input.sub_mwd_wob,label = 'Force on Bit',color = 'b')
#    ax2.plot(depth_axis, qc_plot_input.sub_mwd_tob,label = 'Torque on Bit',color = 'r')
#    ax.set_xlabel('Depth (m)')
#    ax.set_xlim(depth_axis.iloc[0], depth_axis.iloc[-1])
	#</Depth Part>


#Beautifying the plots (making informative)
    ax.legend(loc=2)
    ax2.legend(loc=1)
    ax.set_ylabel('force on \n bit (kN)')
    ax2.set_ylabel('Torque on \n bit (Nm)')

    return


#Work In Progress
#def lithology_plot(ax,qc_plot_input):
#	lith_arr = np.asarray(qc_plot_input.rock_type)
#	lith_uniq = set(lith_arr)
#	num_lith = len(lith_arr)
#
#	for num_lith in num_lith:
#		for lith_arr in lith_arr:
#				if lith_arr == lith_uniq[num_lith]:
#						lith_arr[num_lith]==num_lith
#	return
#
#
#
#
#
#
#





def qc_plot(qc_plot_input, out_filename, plot_title,data_date, client_project_id,
               two_way_travel_time_ms=None, peak_search_interval_ms=None, dpi=300, show=False):
    """
    """
    #<sort our colorbar business>
    colourbar_type = 'all_one'#'all_one' vs
    cbal = ColourBarAxisLimtis(colourbar_type=colourbar_type)#, v_min_1=-22)
    cmap_string = 'spring'; cmap_string = 'jet'
    #</sort our colorbar business>

    #<Get inputs and reshape where appropriate>
    trace_array_dict = qc_plot_input.trace_array_dict
    lower_num_ms = qc_plot_input.lower_number_ms
    upper_num_ms = qc_plot_input.upper_number_ms

    for label in COMPONENT_LABELS:
        trace_array_dict[label] = np.flipud(trace_array_dict[label])
    #</Get inputs and reshape where appropriate>

    num_traces_per_component, num_samples = trace_array_dict[label].T.shape


    #if using time plot:
    time_vector = pd.date_range(start=qc_plot_input.sub_mwd_time.iloc[0], periods=num_traces_per_component, freq='1S')
	    #<choose X - time>
    X = time_vector

	#if using depth plot
#    depth_mwd =-1*(qc_plot_input.sub_mwd_depth_interp-qc_plot_input.collar_elevation)
		#<choose X - depth>
#    X = depth_mwd

	# Spread out Y
    Y = np.linspace(lower_num_ms, upper_num_ms, trace_array_dict[label].shape[0])
    Y = np.flipud(Y)

#    Generate figure and axis objects to plot. 6 rows, not sharing X axis
    fig, ax = plt.subplots(nrows=6, sharex=False, figsize=(24,11))

# 	Old code to just generate peak and amplitude plots
#    fig, ax = plt.subplots(nrows=4, sharex=False, figsize=(24,11))

	# Generate Peak plots
	#Panel 1
    header_plot(ax[0], X, qc_plot_input, plot_title)
	#Panel 5
    depth_vs_time_plot(ax[4],qc_plot_input)
	#Panel 6
    wob_tob_plot(ax[5],qc_plot_input)

    plt.subplots_adjust(right=10.5)

    #<sort out yticks every 5 ms>
    dt_ms = 5
    lowest_y_tick =  int(lower_num_ms/dt_ms)
    greatest_y_tick = int(upper_num_ms/dt_ms)

    y_tick_locations = dt_ms * np.arange(lowest_y_tick, greatest_y_tick + 1)
    #<sort out yticks every 5 ms>

	#Generate Axial, Radial, Tangential heatmap plots

    ax[1], heatmap1 = plot_hole_as_heatmap(ax[1], cbal.v_min_1, cbal.v_max_1, X, Y,
      trace_array_dict['axial'], cmap_string, y_tick_locations,
      two_way_travel_time_ms=qc_plot_input.two_way_travel_time_ms,
      multiple_search_back_ms=qc_plot_input.multiple_search_back_ms,
      multiple_search_forward_ms=qc_plot_input.multiple_search_forward_ms)

    if colourbar_type == 'each_axis':
        #[left, bottom, width, height],
        cbaxes = fig.add_axes([0.99, 0.54, 0.02, 0.18])
        cb = plt.colorbar(heatmap1, cax = cbaxes)
    ax[2], heatmap2 = plot_hole_as_heatmap(ax[2], cbal.v_min_2, cbal.v_max_2, X, Y,
      trace_array_dict['tangential'], cmap_string, y_tick_locations)#,

    ax[3], heatmap3 = plot_hole_as_heatmap(ax[3], cbal.v_min_3, cbal.v_max_3, X, Y,
      trace_array_dict['radial'], cmap_string, y_tick_locations)#,

    plt.tight_layout()
    if colourbar_type=='all_one':
        cbaxes = fig.add_axes([0.01, 0.1, 0.007, 0.8])
        cb = plt.colorbar(heatmap1, cax = cbaxes)
        plt.setp(cbaxes.get_xticklabels(), rotation='vertical', fontsize=10)
        cbaxes.yaxis.set_ticks_position('right')

		#<Labeling>

    ax[0].text(1.01, 0.8, '{}'.format('Datacloud Int. Inc.'), fontsize=13, transform=ax[0].transAxes)
    ax[0].text(1.01, 0.4, '{}'.format('Confidential, \nFor internal circulation'), fontsize=13, transform=ax[0].transAxes)

    ax[1].text(1.01, 0.5, 'axial', fontsize=11.5, rotation='vertical', transform=ax[1].transAxes)
    ax[2].text(1.01, 0.6, 'tangential', fontsize=11.5, rotation='vertical', transform=ax[2].transAxes)
    ax[3].text(1.01, 0.5, 'radial', fontsize=11.5, rotation='vertical', transform=ax[3].transAxes)
		# </Labelling>

#		<Need to figure out what the code below is for>
    if qc_plot_input.center_trace_dict is not None:
        for hole_id, center_trace in qc_plot_input.center_trace_dict.iteritems():
            blasthole_string = 'blasthole_id {}'.format(hole_id)
            ax[0].text(1.0*center_trace/ax[0].get_xbound()[1], -0.1,
              blasthole_string, transform=ax[0].transAxes, fontsize=10)

    plt.subplots_adjust(left=0.1)
    plt.subplots_adjust(right=0.9)
    plt.savefig(out_filename)
    plt.show()
    print("saving {}".format(out_filename))

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
