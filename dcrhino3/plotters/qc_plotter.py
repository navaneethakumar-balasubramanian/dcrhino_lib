# -*- coding: utf-8 -*-

import os
import numpy as np
from matplotlib.ticker import AutoMinorLocator
from matplotlib.lines import Line2D

import matplotlib.pyplot as plt
import pdb
import pandas as pd

from dcrhino3.plotters.colour_bar_axis_limits import ColourBarAxisLimits

class QCLogPlotter():

    def __init__(self,axial,tangential,radial,depth,plot_title,output_sampling_rate,normalize=True,lower_num_ms=-5.0,upper_num_ms=30.0,dt_ms=5,plot_by_depth=True):
        
        self.plot_title = plot_title
        
        self.output_sampling_rate = output_sampling_rate
        self.dt_ms = dt_ms
        self.lower_num_ms = lower_num_ms
        self.upper_num_ms = upper_num_ms
        
        self.depth = depth
        
        self.normalize = normalize
        self.axial = self.prepare_trace(axial)
        self.tangential = self.prepare_trace(tangential)
        self.radial = self.prepare_trace(radial)
        self.num_traces_per_component, self.num_samples = self.axial.T.shape
        
    def prepare_trace(self,component_trace):

        data = component_trace

        num_traces_in_blasthole, samples_per_trace = data.shape
        component_trace = data.T
        n_samples = int(0.2*self.output_sampling_rate)

#            n_samples = self.global_config.n_samples_trimmed_trace
        dt = 1./self.output_sampling_rate
        samples_back = (np.abs(self.lower_num_ms))/1000./dt
        samples_back = int(np.ceil(samples_back))
        samples_fwd = self.upper_num_ms/1000./dt
        samples_fwd = int(np.ceil(samples_fwd))
        half_way = int(n_samples/2)
        component_trace = component_trace[half_way-samples_back:half_way+samples_fwd,:]
        #pdb.set_trace()
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
        
        
    def plot(self,
             peak_ampl_x,
             peak_ampl_y,
             reflection_coefficient,
             ax_vel_del,
             tang_vel_del,
             ax_lim,
             tangential_RC,            
             noise_threshold,
             show = True,
             output_path = None
        ):
        params = {
                'legend.fontsize': 'medium',
                 'axes.labelsize': 'medium',
                 'axes.titlesize':'medium',
                 'xtick.labelsize':'medium',
                 'ytick.labelsize':'medium'}
        plt.rcParams.update(params)
        
        colourbar_type = 'all_one'#'all_one' vsdepth
        cbal = ColourBarAxisLimits(colourbar_type=colourbar_type)#, v_min_1=-22)
        cmap_string = 'spring'; cmap_string = 'jet'
        
        X = self.x_from_depth()
        
        Y = np.linspace(self.lower_num_ms, self.upper_num_ms, self.axial.shape[0])
        Y = np.flipud(Y)
        
        fig, ax = plt.subplots(nrows=5, sharex=False, figsize=(24,12))
        self.Panel1_plot(ax[0], X, peak_ampl_x,reflection_coefficient,ax_vel_del,ax_lim)
        
        dt_ms = self.dt_ms
        lowest_y_tick =  int(self.lower_num_ms/dt_ms)
        greatest_y_tick = int(self.upper_num_ms/dt_ms)

        y_tick_locations = dt_ms * np.arange(lowest_y_tick, greatest_y_tick + 1)
        #<sort out yticks every 5 ms>

    	#Generate Axial, Radial, Tangential heatmap plots
        #pdb.set_trace()
        ax[1], heatmap1 = self.plot_hole_as_heatmap(ax[1], cbal.v_min_1, cbal.v_max_1, X, Y, self.axial, cmap_string, y_tick_locations)
        
        self.Panel3_plot(ax[2], X, peak_ampl_y,tangential_RC,tang_vel_del,ax_lim,noise_threshold)

        ax[3], heatmap2 = self.plot_hole_as_heatmap(ax[3], cbal.v_min_2, cbal.v_max_2, X, Y,self.tangential, cmap_string, y_tick_locations)
#       

        self.legend_box(ax[4])
        
        
        ax[1].text(1.01, 0.5, 'axial', fontsize=11.5, rotation='vertical', transform=ax[1].transAxes)
        ax[3].text(1.01, 0.6, 'tangential', fontsize=11.5, rotation='vertical', transform=ax[2].transAxes)
        ax[3].set_xlabel('Depth (m)')
        
        if output_path is not None:
            plt.savefig(output_path)
        
        if show:
            plt.show()
            
    def plot_hole_as_heatmap(self, ax, v_min, v_max, X, Y, Z, cmap_string, y_tick_locations,
                         two_way_travel_time_ms=None, multiple_search_back_ms=None,
                         multiple_search_forward_ms=None):
        """
        """
        minor_locator = AutoMinorLocator()
        if any([x is None for x in [v_min, v_max]]):# autoselcet color axes
            heatmap = ax.pcolormesh(X, Y, Z, cmap=cmap_string)
        else:
            heatmap = ax.pcolormesh(X, Y, Z, cmap=cmap_string, vmin=v_min, vmax=v_max)
        locs,labs = plt.xticks()
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
    #    ax.set_xticklabels()
        return ax, heatmap
        

    def Panel1_plot(self,ax, X, peak_ampl_x,reflection_coefficient,ax_vel_del,ax_lim):
        """
        	#Peak axial, radial, tangential and multiple plots

        """
        minor_locator = AutoMinorLocator(8)
        ax1 = ax.twinx()
        ax2 = ax.twinx()

        ax.set_title(self.plot_title[0],loc = 'center')
        ax1.set_title(self.plot_title[1],loc = 'left')
        ax2.set_title(self.plot_title[2],loc = 'right')
        y_limits = [0,1.5]
        ax.plot(X, peak_ampl_x, color = 'red')
        ax.set_ylim(y_limits)
        ax.spines['left'].set_color('red')
        ax.set_ylabel('Ax. Amp').set_color('red')
        ax.spines['left'].set_linewidth(2)
        y_limits = [0,1.0]
        ax1.plot(X,reflection_coefficient, color = 'blue')
        ax1.set_ylim(y_limits)
        ax1.spines['right'].set_color('blue')
        ax1.set_ylabel('Ax. RC').set_color('blue')
        ax1.spines['right'].set_linewidth(2)
        y_limits = [80,250]
        ax2.plot(X,ax_vel_del/10000, color = 'greenyellow')
        ax2.set_ylim(y_limits)
        ax2.spines['right'].set_color('greenyellow')
        ax2.set_ylabel('Ax. Delay').set_color('greenyellow')
        ax2.spines['right'].set_linewidth(2)
        ax2.spines['right'].set_position(('outward',60))
        ax.set_xlim(X[0], X[-1])
        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])

        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])


        for x_maj_tick in x_maj_tick:
            ax.axvline(x = x_maj_tick, ymin = 0, ymax = 1.5, color = 'k')

        for x_min_tick in x_min_tick:
            ax.axvline(x = x_min_tick, ymin = 0, ymax = 1.5, color = 'k', linestyle = ':')

        ax.xaxis.set_minor_locator(minor_locator)

    def Panel3_plot(self,ax, X, peak_ampl_y,tangential_RC,tang_vel_del,ax_lim,noise_threshold):
        """
        	#Tangential peak, RC and axial delay plots

        """
        minor_locator = AutoMinorLocator(8)
        ax1 = ax.twinx()
        ax2 = ax.twinx()

#        if self.global_config.tangential_amp == 'True':
        y_limits = [0,1.5]
#        y_limits = hack_split_ylimits(self.global_config.peak_amplitude_tangential_y_limit)
        ax.plot(X, peak_ampl_y, color = 'magenta')
        ax.set_ylim(y_limits)
        ax.spines['left'].set_color('magenta')
        ax.spines['left'].set_linewidth(2)
        ax.set_ylabel('Tang. Amp').set_color('magenta')
        y_limits = [0,1.0]
        ax1.plot(X, tangential_RC,color = 'cyan')
        ax1.set_ylim(y_limits)
        ax1.spines['right'].set_color('cyan')
        ax1.spines['right'].set_linewidth(2)
        ax1.set_ylabel('Tang. RC').set_color('cyan')
        y_limits = [80,130]
        ax2.plot(X,tang_vel_del,color = 'lime')
        ax2.set_ylim(y_limits) # for tangential delay
        ax2.spines['right'].set_color('lime')
        ax2.spines['right'].set_linewidth(2)
        ax2.set_ylabel('Tang. Delay').set_color('lime')
        ax2.spines['right'].set_position(('outward',60))

        if noise_threshold == True:
            ax.axhline(y = self.noise_threshold,xmin = 0, xmax = X[-1], color = 'k')

        ax.set_xlim(X[0], X[-1])
        ax.minorticks_on()

        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])


        for x_maj_tick in x_maj_tick:
            ax.axvline(x = x_maj_tick, ymin = -0.5, ymax = 1.5, color = 'k')

        for x_min_tick in x_min_tick:
            ax.axvline(x = x_min_tick, ymin = -0.5, ymax = 1.5, color = 'k', linestyle = ':')

        ax.xaxis.set_minor_locator(minor_locator)

    def legend_box(self, ax):
        ax1 = ax.twinx()
        ax2 = ax.twinx()
        sub_line1 = Line2D([0],[0], color = 'r',label = 'Axial_amplitude')
        sub_line2 = Line2D([0],[0], color = 'b',label = 'Axial RC')
        sub_line3 = Line2D([0],[0], color = 'g',label = 'Axial 1/delay')
        sub_line4 = None
        legend_lines1 = [sub_line1,sub_line2,sub_line3,sub_line4]
        legend_lines1 = [x for x in legend_lines1 if x is not None]
        sub_line5 = Line2D([0],[0],color = 'magenta',label = 'Tangential_amplitude' )
        sub_line6 = Line2D([0],[0],color = 'cyan',label = 'Tangential RC')
        sub_line7 = Line2D([0],[0],color = 'lime',label = 'Tangential 1/delay')
        sub_line8 = None

        legend_lines2 = [sub_line5,sub_line6,sub_line7, sub_line8]
        legend_lines2 = [x for x in legend_lines2 if x is not None]

        legend_lines3 = [Line2D([0],[0],color = 'k',linestyle = '--', linewidth = 2,label = 'Axial Multiples'),
                        Line2D([0],[0],color = 'k',linestyle = '-', linewidth = 2,label = 'Tangential Multiples')]

        ax.legend(handles=legend_lines1, loc=2)
        ax1.legend(handles=legend_lines2, loc=9)
        ax2.legend(handles=legend_lines3, loc=1)

        ax.spines['top'].set_visible(False)
        ax.spines['bottom'].set_visible(False)
        ax.spines['right'].set_visible(False)
        ax.spines['left'].set_visible(False)
        ax.set_xticks([])
        ax.set_yticks([])

        ax1.spines['top'].set_visible(False)
        ax1.spines['bottom'].set_visible(False)
        ax1.spines['right'].set_visible(False)
        ax1.spines['left'].set_visible(False)
        ax1.set_xticks([])
        ax1.set_yticks([])

        ax2.spines['top'].set_visible(False)
        ax2.spines['bottom'].set_visible(False)
        ax2.spines['right'].set_visible(False)
        ax2.spines['left'].set_visible(False)
        ax2.set_xticks([])
        ax2.set_yticks([])