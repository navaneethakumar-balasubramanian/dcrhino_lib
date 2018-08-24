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
import os
import pdb



from mpl_toolkits.axes_grid1 import make_axes_locatable
from matplotlib.ticker import (MultipleLocator, FormatStrFormatter,
                                   AutoMinorLocator)

from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
#home = os.path.expanduser("~/")
class QCPlotInputs(object):
    """
    """
    def __init__(self, **kwargs):
        self.trace_array_dict = kwargs.get('trace_array_dict', None)
        self.peak_ampl_x  = kwargs.get('peak_ampl_x', None)
        self.peak_ampl_y  = kwargs.get('peak_ampl_y', None)
        self.peak_ampl_z  = kwargs.get('peak_ampl_z', None)
        self.peak_mult_x  = kwargs.get('peak_mult_x', None)
        self.peak_ampl_x_ndx = kwargs.get('peak_ampl_x_ndx', None)
        self.peak_mult_x_ndx = kwargs.get('peak_mult_x_ndx', None)
        self.lower_number_ms = kwargs.get('lower_number_ms', None)
        self.upper_number_ms = kwargs.get('upper_number_ms', None)
        self.center_trace_dict = kwargs.get('center_trace_dict', None)
        self.two_way_travel_time_ms = kwargs.get('two_way_travel_time_ms', None)
        self.multiple_search_back_ms = kwargs.get('multiple_search_back_ms', None)
        self.multiple_search_forward_ms = kwargs.get('multiple_search_forward_ms', None)



class ColourBarAxisLimtis(object):
    """
    supports kwarg colourbar_type {'each_axis', 'all_one'}
    WARNING: 'each_axis' not yet tested
    """
    def __init__(self, **kwargs):
        """
        TODO: make v_min[1], rather than v_min_1, i.e. use a dictionary
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
    """
    minor_locator = AutoMinorLocator()
    if any([x is None for x in [v_min, v_max]]):# autoselcet color axes
        heatmap = ax.pcolormesh(X, Y, Z, cmap=cmap_string)
    else:
        heatmap = ax.pcolormesh(X, Y, Z, cmap=cmap_string, vmin=v_min, vmax=v_max)
#    if colorbar_type == 'each_axis':
#         #[left, bottom, width, height],
#        cbaxes = fig.add_axes([0.99, 0.54, 0.02, 0.18])
#        cb = plt.colorbar(heatmap1, cax = cbaxes)
#        divider = make_axes_locatable(ax[1])
#        cax = divider.append_axes("left", size="1%", pad=0.5)
#        plt.colorbar(heatmap1, ax=cax);
    ax.set_ylabel('time (ms)')
    ax.invert_yaxis()
    #ax[1].set_yticks(y_tick_locations, y_tick_labels)
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

    return ax, heatmap


def header_plot(ax, X, qc_plot_input, out_filename, peak_amplitude_linewidth = 0.2):
    """
    """
    ax.plot(X, qc_plot_input.peak_ampl_y, label='peak_y', linewidth=peak_amplitude_linewidth)
    ax.plot(X, qc_plot_input.peak_ampl_z, label='peak_z', linewidth=peak_amplitude_linewidth)
    ax.plot(X, qc_plot_input.peak_mult_x, label='mult_x', linewidth=peak_amplitude_linewidth)
    ax.plot(X, qc_plot_input.peak_ampl_x, label='peak_x', linewidth=peak_amplitude_linewidth)
    ax.legend()
    ax.set_title("{}".format(os.path.basename(out_filename[:-3])))
    ax.set_ylim(0.0, 2.0)
    return



def qc_plot(qc_plot_input, out_filename, data_date, client_project_id,
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
    X = np.arange(num_traces_per_component)
    Y = np.linspace(lower_num_ms, upper_num_ms, trace_array_dict[label].shape[0])
    Y = np.flipud(Y)

    fig, ax = plt.subplots(nrows=4, sharex=True, figsize=(24,8.5))
    header_plot(ax[0], X, qc_plot_input, out_filename)
    plt.subplots_adjust(right=10.5)



    minorLocator = AutoMinorLocator()
    #<sort out yticks every 5 ms>
    dt_ms = 5
    lowest_y_tick =  int(lower_num_ms/dt_ms)
    greatest_y_tick = int(upper_num_ms/dt_ms)
    y_tick_locations = dt_ms * np.arange(lowest_y_tick, greatest_y_tick + 1)
    #<sort out yticks every 5 ms>
    #pdb.set_trace()
#    y_tick_locations = 10*np.arange(7)

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

    ax[0].text(1.01, 0.8, '{}'.format(data_date), fontsize=13, transform=ax[0].transAxes)
    ax[0].text(1.01, 0.6, '{}'.format(client_project_id), fontsize=13, transform=ax[0].transAxes)
    ax[1].text(1.01, 0.5, 'axial', fontsize=11.5, rotation='vertical', transform=ax[1].transAxes)
    ax[2].text(1.01, 0.6, 'tangential', fontsize=11.5, rotation='vertical', transform=ax[2].transAxes)
    ax[3].text(1.01, 0.5, 'radial', fontsize=11.5, rotation='vertical', transform=ax[3].transAxes)
    #ax[0].text(1.01, 0.6, '{}'.format(client_project_id), fontsize=13, transform=ax[0].transAxes)

    if qc_plot_input.center_trace_dict is not None:
        for hole_id, center_trace in qc_plot_input.center_trace_dict.iteritems():
            blasthole_string = 'blasthole_id {}'.format(hole_id)
            ax[0].text(1.0*center_trace/ax[0].get_xbound()[1], -0.1,
              blasthole_string, transform=ax[0].transAxes, fontsize=10)

    #plt.subplots_adjust(right=1.5)
    plt.subplots_adjust(left=0.1)
    plt.subplots_adjust(right=0.9)
    #plt.show()
    print("saving {}".format(out_filename))
    plt.savefig(out_filename, dpi=dpi)
    if show:
        plt.show()
    plt.clf()



def qc_plot_v3(qc_plot_input, out_filename, data_date, client_project_id,
            two_way_travel_time_ms=None, peak_search_interval_ms=None, dpi=300, show=False):
    """
    colorbar type is either all one or each_axis
    This was a 'panic plot' made during a scrum session with Daniel and Jamie.
    We will probably want to keep a variant of it around;  It basically dropped
    the radial and tangential axes;
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
    X = np.arange(num_traces_per_component)
    Y = np.linspace(lower_num_ms, upper_num_ms, trace_array_dict[label].shape[0])
    Y = np.flipud(Y)
    pdb.set_trace()
    fig, ax = plt.subplots(nrows=2, sharex=True, figsize=(24,8.5))
    header_plot(ax[0], X, qc_plot_input, out_filename)
    plt.subplots_adjust(right=10.5)



    minorLocator = AutoMinorLocator()
    #<sort out yticks every 5 ms>
    dt_ms = 5
    lowest_y_tick =  int(lower_num_ms/dt_ms)
    greatest_y_tick = int(upper_num_ms/dt_ms)
    y_tick_locations = dt_ms * np.arange(lowest_y_tick, greatest_y_tick + 1)
    #<sort out yticks every 5 ms>
    #pdb.set_trace()
#    y_tick_locations = 10*np.arange(7)

    ax[1], heatmap1 = plot_hole_as_heatmap(ax[1], cbal.v_min_1, cbal.v_max_1, X, Y,
      trace_array_dict['axial'], cmap_string, y_tick_locations,
      two_way_travel_time_ms=qc_plot_input.two_way_travel_time_ms,
      multiple_max_search_window=qc_plot_input.multiple_max_search_window)

    plt.tight_layout()
    if colourbar_type=='all_one':
        cbaxes = fig.add_axes([0.01, 0.1, 0.007, 0.8])
        cb = plt.colorbar(heatmap1, cax = cbaxes)
        plt.setp(cbaxes.get_xticklabels(), rotation='vertical', fontsize=10)

    cbaxes.yaxis.set_ticks_position('right')
    ax[0].text(1.01, 0.8, '{}'.format(data_date), fontsize=13, transform=ax[0].transAxes)
    ax[0].text(1.01, 0.6, '{}'.format(client_project_id), fontsize=13, transform=ax[0].transAxes)
    ax[1].text(1.01, 0.5, 'axial', fontsize=11.5, rotation='vertical', transform=ax[1].transAxes)

    if qc_plot_input.center_trace_dict is not None:
        for hole_id, center_trace in qc_plot_input.center_trace_dict.iteritems():
            blasthole_string = 'blasthole_id {}'.format(hole_id)
            ax[0].text(1.0*center_trace/ax[0].get_xbound()[1], -0.1,
              blasthole_string, transform=ax[0].transAxes, fontsize=10)

    #plt.subplots_adjust(right=1.5)
    plt.subplots_adjust(left=0.1)
    plt.subplots_adjust(right=0.9)
    #plt.show()
    print("saving {}".format(out_filename))
    plt.savefig(out_filename, dpi=dpi)
    if show:
        plt.show()
    plt.clf()


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
