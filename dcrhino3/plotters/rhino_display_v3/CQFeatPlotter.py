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



class QCFeatPlotter():

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

    def axial_feature_plot(self,ax, X, peak_ampl_x,reflection_coefficient,axial_RC2,ax_vel_del,noise_threshold,ax_lim):
        """
        	#Peak axial, radial, tangential and multiple plots

        """
        minor_locator = AutoMinorLocator(8)
        ax1 = ax.twinx()
        ax2 = ax.twinx()
        ax3 = ax.twinx()

        ax.set_title(self.plot_title[0],loc = 'left')
        ax1.set_title(self.plot_title[1],loc = 'center')
        ax2.set_title(self.plot_title[2],loc = 'right')

        #pdb.set_trace()




        if self.plot_panel_comp.axial_amp_feature_plot is True:

            ax.set_ylim(ax_lim.axial_amp_lim)
            ax.spines['left'].set_color('red')
            ax.set_ylabel('Ax. Amp').set_color('red')
            ax.spines['left'].set_linewidth(1)
            ax.plot(X, peak_ampl_x, color='red', linewidth=0.4)

        if self.plot_panel_comp.axial_delay_feature_plot is True:

            if ax_lim.axial_delay_lim is not False:
                ax2.set_ylim(ax_lim.axial_delay_lim)
            else:
                ax2.set_ylim([ax_vel_del.min(), ax_vel_del.max()])
            ax2.spines['right'].set_color('greenyellow')

            ax2.spines['right'].set_linewidth(1)
            ax2.set_ylabel('Ax. Delay').set_color('greenyellow')
            ax2.spines['right'].set_position(('outward', 80))
            ax2.plot(X, ax_vel_del, color='greenyellow', linewidth=0.4)



        if self.plot_panel_comp.axial_rc_feature_plot is True:
            ax1.plot(X,reflection_coefficient, color = 'blue',linewidth=0.4)
            ax1.set_ylim(ax_lim.axial_rc_lim)
            ax1.spines['right'].set_color('blue')
            ax1.set_ylabel('Ax. RC').set_color('blue')
            ax1.spines['right'].set_linewidth(1)



        if axial_RC2 is not False:
            ax3.plot(X, axial_RC2, color='purple', linewidth=0.4)

            ax3.set_ylim(ax_lim.axial_rc_lim)
            ax3.spines['right'].set_color('purple')
            ax3.set_ylabel('Ax. RC2').set_color('purple')
            ax3.spines['right'].set_position(('outward', 40))


#        y_limits = [80,250]




        ax.set_xlim(X[0], X[-1])
        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])



        if noise_threshold is not None:
            ax.axhline(y = noise_threshold,xmin = 0, xmax = X[-1], color = 'k')

        for x_maj_tick in x_maj_tick:
            ax.axvline(x = x_maj_tick, ymin = 0, ymax = 1.5, color = 'k')

        for x_min_tick in x_min_tick:
            ax.axvline(x = x_min_tick, ymin = 0, ymax = 1.5, color = 'k', linestyle = ':')

        ax.xaxis.set_minor_locator(minor_locator)

    def tangential_feature_plot(self,ax, X, peak_ampl_y, tangential_reflection_coefficient,tang_RC2,
                                tang_vel_del, noise_threshold, ax_lim):
        """
        	#Tangential peak, RC and axial delay plots

        """
        minor_locator = AutoMinorLocator(8)
        ax1 = ax.twinx()
        ax2 = ax.twinx()
        ax3 = ax.twinx()

#        if self.global_config.tangential_amp == 'True':
        #y_limits = [0,1.5]
#        y_limits = hack_split_ylimits(self.global_config.peak_amplitude_tangential_y_limit)
        if self.plot_panel_comp.tangential_amp_feature_plot is True:

            ax.set_ylim(ax_lim.tangential_amp_lim)
            ax.spines['left'].set_color('magenta')
            ax.spines['left'].set_linewidth(1)
            ax.set_ylabel('Tang. Amp').set_color('magenta')
            ax.plot(X, peak_ampl_y, color='magenta',linewidth=0.4)

        if self.plot_panel_comp.tangential_rc_feature_plot is True:
            ax1.plot(X, tangential_reflection_coefficient,color = 'cyan',linewidth=0.4)
            ax1.set_ylim(ax_lim.tangential_rc_lim)
            ax1.spines['right'].set_color('cyan')
            ax1.spines['right'].set_linewidth(1)
            ax1.set_ylabel('Tang. RC').set_color('cyan')

        if self.plot_panel_comp.tangential_delay_feature_plot is True:

            ax2.plot(X,tang_vel_del,color = 'lime',linewidth=0.4)
            if ax_lim.axial_delay_lim is not False:
                ax2.set_ylim(ax_lim.tangential_delay_lim)  # for tangential delay
            else:
                ax2.set_ylim([tang_vel_del.min(), tang_vel_del.max()])

            ax2.spines['right'].set_color('lime')
            ax2.spines['right'].set_linewidth(1)
            ax2.set_ylabel('Tang. Delay').set_color('lime')
            ax2.spines['right'].set_position(('outward',80))

        if tang_RC2 is not False:
            ax3.plot(X, tang_RC2, color='purple', linewidth=0.4)

            ax3.set_ylim(ax_lim.tangential_rc_lim)
            ax3.spines['right'].set_color('purple')
            ax3.set_ylabel('Tang. RC2').set_color('purple')
            ax3.spines['right'].set_position(('outward', 40))


        if noise_threshold is not None:
            ax.axhline(y = noise_threshold,xmin = 0, xmax = X[-1], color = 'k')

        ax.set_xlim(X[0], X[-1])
        ax.minorticks_on()

        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])


        for x_maj_tick in x_maj_tick:
            ax.axvline(x = x_maj_tick, ymin = -0.5, ymax = 1.5, color = 'k')

        for x_min_tick in x_min_tick:
            ax.axvline(x = x_min_tick, ymin = -0.5, ymax = 1.5, color = 'k', linestyle = ':')

        ax.xaxis.set_minor_locator(minor_locator)

    def radial_feature_plot(self,ax, X, peak_ampl_z,noise_threshold,ax_lim):
        """
        	#Tangential peak, RC and axial delay plots

        """
        minor_locator = AutoMinorLocator(8)
#        ax1 = ax.twinx()
#        ax2 = ax.twinx()

        if self.plot_panel_comp.radial_amp_feature_plot is True:
#            y_limits = [0,1.5]
    #        y_limits = hack_split_ylimits(self.global_config.peak_amplitude_tangential_y_limit)
            active_colour = 'magenta'
            ax.plot(X, peak_ampl_z, color=active_colour)
            ax.set_ylim(ax_lim.radial_amp_lim)
            ax.spines['left'].set_color(active_colour)
            ax.spines['left'].set_linewidth(2)
            ax.set_ylabel('Radial. Amp').set_color(active_colour)

        if noise_threshold is not None:
            ax.axhline(y = noise_threshold,xmin = 0, xmax = X[-1], color = 'k')

        ax.set_xlim(X[0], X[-1])
        ax.minorticks_on()

        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])


        for x_maj_tick in x_maj_tick:
            ax.axvline(x = x_maj_tick, ymin = -0.5, ymax = 1.5, color = 'k')

        for x_min_tick in x_min_tick:
            ax.axvline(x = x_min_tick, ymin = -0.5, ymax = 1.5, color = 'k', linestyle = ':')

        ax.xaxis.set_minor_locator(minor_locator)
        
    def x_from_depth(self):
        X = self.depth.astype(float)
        X = np.nan_to_num(X)
        return X