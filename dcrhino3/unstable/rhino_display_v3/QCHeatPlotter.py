#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Mar  7 16:20:37 2019

Heatmap Plotter (working backwards from qc_plotter)

@author: tristan
"""

# -*- coding: utf-8 -*-

import numpy as np
import math
from matplotlib.ticker import AutoMinorLocator
from matplotlib.lines import Line2D

import matplotlib.pyplot as plt
import pdb

from dcrhino3.feature_extraction.feature_windowing import WindowBoundaries
from dcrhino3.physics.util import get_expected_multiple_times
from dcrhino3.plotters.colour_bar_axis_limits import ColourBarAxisLimits



class QCHeatPlotter():

    def __init__(self, axial, tangential, radial, depth, plot_title,
                 sampling_rate, mult_pos, mult_win_label, plot_panel_comp,
                 components_to_plot, normalize=True, lower_num_ms=-5.0,
                 upper_num_ms=30.0, dt_ms=5, plot_by_depth=True, transformed_args=None):
        """
        todo: replace output_sampling_rate with sampling_rate;
        Note: There is a built-in assumption that the axial component exists
        """
        self.plot_title = plot_title

        self.sampling_rate = sampling_rate
        self.dt_ms = dt_ms
        self.lower_num_ms = lower_num_ms
        self.upper_num_ms = upper_num_ms
        self.mult_pos = mult_pos
        self.mult_win_label = mult_win_label
        self.plot_panel_comp = plot_panel_comp
        self.components_to_plot = components_to_plot
        self.depth = depth

        self.normalize = normalize
        self.axial = None
        self.tangential = None
        self.radial = None
        self.transformed_args = transformed_args
        for component_id in components_to_plot.keys():
            if component_id == 'axial':
                self.axial = self.prepare_trace_for_heatmap(components_to_plot['axial'])
            elif component_id == 'tangential':
                self.tangential = self.prepare_trace_for_heatmap(components_to_plot['tangential'])
            elif component_id == 'radial':
                self.radial = self.prepare_trace_for_heatmap(components_to_plot['radial'])
        self.num_traces_per_component, self.num_samples = self.axial.T.shape
        
    def prepare_trace_for_heatmap(self,component_trace):
        """
        note here the 0.2 is hard-coded but should actually be taken from the


        """


        data = component_trace#.copy()

        num_traces_in_blasthole, samples_per_trace = data.shape
        component_trace = data.T
        n_samples = int(0.2*self.sampling_rate)

#            n_samples = self.global_config.n_samples_trimmed_trace
        dt = 1./self.sampling_rate
        samples_back = (np.abs(self.lower_num_ms))/1000./dt
        samples_back = int(np.ceil(samples_back))
        samples_fwd = self.upper_num_ms/1000./dt
        samples_fwd = int(np.ceil(samples_fwd))
        half_way = int(n_samples/2)
        component_trace = component_trace[half_way-samples_back:half_way+samples_fwd,:]

        try:
            if math.isnan(component_trace.min()) == True and math.isnan(component_trace.min()) == True:
                return component_trace
        except ValueError:
            print("logger.error:  the last time I saw this error it was because the incorrect\
                         sampling rate was being used")
            raise Exception
        if component_trace.min() == 0 and component_trace.min() == 0:
            return component_trace

        if self.normalize:
            nans_locations = np.where(np.isnan(component_trace))
            component_trace[nans_locations]=0.0
            num_samples, num_traces = component_trace.shape
            max_amplitudes = np.max(component_trace, axis=0)
            component_trace = component_trace/max_amplitudes
            component_trace[nans_locations] = np.nan

        return np.flipud(component_trace)
    
    def x_from_depth(self):
        X = self.depth.astype(float)
        X = np.nan_to_num(X)
        return X
    
    def plot_hole_as_heatmap(self, ax, v_min, v_max, X, Y, Z, cmap_string, y_tick_locations,
                         two_way_travel_time_ms=None, multiple_search_back_ms=None,
                         multiple_search_forward_ms=None,delay=None,delay_2=None, window_boundaries=None):
        """
        """
        minor_locator = AutoMinorLocator(8)
        if any([x is None for x in [v_min, v_max]]):# autoselcet color axes
            heatmap = ax.pcolormesh(X, Y, Z, cmap=cmap_string)
        else:
            heatmap = ax.pcolormesh(X, Y, Z, cmap=cmap_string, vmin=v_min, vmax=v_max)
        locs,labs = plt.xticks()
        ax.set_ylabel('time (ms)')
        ax.invert_yaxis()
        ax.set_yticks(y_tick_locations, minor=False)


        #pdb.set_trace()

#        ax.yaxis.set_minor_locator(minor_locator)
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
        if self.mult_pos is not None:
            ax.plot(X,self.mult_pos.ax_1_mult, color = 'k',linestyle = '--',linewidth = 2)
            ax.plot(X,self.mult_pos.ax_2_mult, color = 'k',linestyle = '--',linewidth = 2)
            ax.plot(X,self.mult_pos.tang_1_mult, color = 'k',linestyle = '-',linewidth = 2)
            ax.plot(X,self.mult_pos.tang_2_mult, color = 'k',linestyle = '-',linewidth = 2)

        if window_boundaries is not None:
            colours = {}
            colours['primary'] = 'black'
            colours['multiple_1'] = 'blue'
            colours['multiple_2'] = 'red'
            #pdb.set_trace()
            for wavelet_id in self.transformed_args.plot.wavelet_windows_to_show:
                y_values = window_boundaries[wavelet_id]
                ax.hlines(1000*y_values, X[0], X[-1], color=colours[wavelet_id],linestyle = '-',linewidth = 1.05)

        #pdb.set_trace()
        ax.set_xlim(X[0], X[-1])
        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])
        for x_maj_tick in x_maj_tick:
            ax.axvline(x = x_maj_tick, ymin = 0, ymax = 1.5, color = 'k')

        for x_min_tick in x_min_tick:
            ax.axvline(x = x_min_tick, ymin = 0, ymax = 1.5, color = 'k', linestyle = ':')
#        ax.set_xticklabels()
        ax.xaxis.set_minor_locator(minor_locator)
        #ax1 = ax.twinx()
        if delay is not  None and delay is not False :
            delay = delay * 1000
            ax.spines['right'].set_color('black')
            ax.plot(X, delay, color='white', linewidth=0.5)
        if delay_2 is not  None and delay_2 is not False :
            delay_2 = delay_2 * 1000
            ax.spines['right'].set_color('black')
            ax.plot(X, delay_2, color='white', linewidth=0.5)

        return ax, heatmap 
