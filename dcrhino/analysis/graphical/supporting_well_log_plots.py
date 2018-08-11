# -*- coding: utf-8 -*-
"""
Created on Mon Jul  2 16:50:59 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import math
import matplotlib.pyplot as plt
import numpy as np
import pdb

from matplotlib.ticker import MultipleLocator

def get_title_line_1(project_id, plot_input):
    title_line1 = 'RHINO QC Logs, {}, {}'.format(project_id, plot_input.hole_start_time.strftime("%B %d, %Y"))
    return title_line1

def get_title_line_2(project_id, plot_input):
    if project_id == 'mont_wright':
        bench = "Bench: {}".format(plot_input.observer_row.bench)
        pattern = "Pattern: {}".format(plot_input.observer_row.pattern)
        hole = "Hole: {}".format(plot_input.observer_row.hole)
        hId = "Hole ID: {}".format(plot_input.observer_row.hole_id)
        title_line2 = ", ".join([bench, pattern, hole, hId, plot_input.mount_point])
    elif project_id == 'west_angelas':
        hole = "Hole: {}".format(plot_input.observer_row.hole)
        area = "Area: {}".format(plot_input.observer_row.area)
        #pdb.set_trace()
        try:
            drill = "Drill: {}".format(plot_input.observer_row.drill_id)
        except AttributeError:
            drill = "Drill: {}".format(plot_input.observer_row.drill_rig_id)
        try:
            sensor_distance_to_source = "sensor-source distance: {:.2f}".format(plot_input.observer_row.sensor_distance_to_source)
        except AttributeError:
            sensor_distance_to_source = "sensor-source distance: {:.2f}".format(plot_input.observer_row.sensor_source_distance)
        title_line2 = ", ".join([area, hole, drill, sensor_distance_to_source])
       # pdb.set_trace()
    return title_line2

#def get_title_line_3(project_id, plot_input):
#    'start {}, end {}'.format(plot_input.time_stamps[0], plot_input.time_stamps[1])
#
#        pdb.set_trace()
#    return title_line2
def well_log_panel_plot(ax, log_data, depth, data_label, x_label, x_limits=[None, None],
                        label_fontsize=22, tick_fontsize=17, color=None):
    """
    this is the core of the well log plotter
    """
    if color is not None:
        ax.plot(log_data, depth, label=data_label, color=color)
    else:
        ax.plot(log_data, depth, label=data_label)
    ax.legend()
    ax.set_xlabel(x_label, fontsize=label_fontsize)
    ax.set_ylabel('Depth (m)', fontsize=label_fontsize)

    ax.invert_yaxis()
    ax.tick_params(axis='both', which="major", labelsize=tick_fontsize)
    ax.set_yticks(np.arange(math.floor(depth.min()), math.ceil(depth.min()), 1))

    #Supports one or both or no limits
    x_lim_min, x_lim_max = ax.get_xlim()
    if x_limits[0] is not None:
        x_lim_min = x_limits[0]
    if x_limits[1] is not None:
        x_lim_max = x_limits[1]
    ax.set_xlim([x_lim_min, x_lim_max])
#
    plt.grid(axis='y', ls='solid')
    ax.yaxis.set_major_locator(MultipleLocator(1))
    ax.yaxis.set_minor_locator(MultipleLocator(0.1))
    ax.yaxis.grid(True,'minor')
    ax.yaxis.grid(True,'major',linewidth=2)
    return


def well_log_panel_plot_multi(ax, log_data_list, depth, data_label_list, x_label, x_limits=[None, None],
                        label_fontsize=22, tick_fontsize=17, color_list=None):
    """
    this is the core of the well log plotter
    """
    n_log_quantities = len(log_data_list)
    for i_log in range(n_log_quantities):
        if color_list is not None:
            ax.plot(log_data_list[i_log], depth, label=data_label_list[i_log], color=color_list[i_log])
        else:
            ax.plot(log_data_list[i_log], depth, label=data_label_list[i_log])
    ax.legend()
    ax.set_xlabel(x_label, fontsize=label_fontsize)
    ax.set_ylabel('Depth (meters)', fontsize=label_fontsize)

    ax.invert_yaxis()
    ax.tick_params(axis='both', which="major", labelsize=tick_fontsize)
    ax.set_yticks(np.arange(math.floor(depth.min()), math.ceil(depth.min()), 1))

    #Supports one or both or no limits
    x_lim_min, x_lim_max = ax.get_xlim()
    if x_limits[0] is not None:
        x_lim_min = x_limits[0]
    if x_limits[1] is not None:
        x_lim_max = x_limits[1]
    ax.set_xlim([x_lim_min, x_lim_max])
#
    plt.grid(axis='y', ls='solid')
    ax.yaxis.set_major_locator(MultipleLocator(1))
    ax.yaxis.set_minor_locator(MultipleLocator(0.1))
    ax.yaxis.grid(True,'minor')
    ax.yaxis.grid(True,'major',linewidth=2)
    return

def well_log_panel_time_plot(ax, log_data, depth, data_label, x_label, x_limits=[None, None],
                        label_fontsize=22, tick_fontsize=17, color=None):
    """
    this is the core of the well log plotter
    """
    if color is not None:
        ax.plot(log_data, depth, label=data_label, color=color)
    else:
        ax.plot(log_data, depth, label=data_label)
    ax.legend()
    ax.set_xlabel(x_label, fontsize=label_fontsize)
    ax.set_ylabel('Time (?)', fontsize=label_fontsize)

    ax.invert_yaxis()
    ax.tick_params(axis='both', which="major", labelsize=tick_fontsize)

    #Supports one or both or no limits
    x_lim_min, x_lim_max = ax.get_xlim()
    if x_limits[0] is not None:
        x_lim_min = x_limits[0]
    if x_limits[1] is not None:
        x_lim_max = x_limits[1]
    ax.set_xlim([x_lim_min, x_lim_max])
#
    plt.grid(axis='y', ls='solid')
    ax.yaxis.set_major_locator(MultipleLocator(60))
    ax.yaxis.set_minor_locator(MultipleLocator(5))
    ax.yaxis.grid(True,'minor')
    ax.yaxis.grid(True,'major',linewidth=2)
    return

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
