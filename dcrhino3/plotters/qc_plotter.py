# -*- coding: utf-8 -*-

#import os
import numpy as np
import math
from matplotlib.ticker import AutoMinorLocator
from matplotlib.lines import Line2D

import matplotlib.pyplot as plt
import pdb
#import pandas as pd
#import sys

from dcrhino3.plotters.colour_bar_axis_limits import ColourBarAxisLimits

class QCLogPlotter():

    def __init__(self,axial,tangential,radial,depth,plot_title,output_sampling_rate,mult_pos,mult_win_label,
                 plot_panel_comp, components_to_plot, normalize=True,lower_num_ms=-5.0,upper_num_ms=30.0,dt_ms=5,plot_by_depth=True):

        self.plot_title = plot_title

        self.output_sampling_rate = output_sampling_rate
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
        for component_id in components_to_plot.keys():
            if component_id == 'axial':
                self.axial = self.prepare_trace(components_to_plot['axial'])
            elif component_id == 'tangential':
                self.tangential = self.prepare_trace(components_to_plot['tangential'])
            elif component_id == 'radial':
                self.radial = self.prepare_trace(components_to_plot['radial'])
        self.num_traces_per_component, self.num_samples = self.axial.T.shape

    def prepare_trace(self,component_trace):


        data = component_trace

        num_traces_in_blasthole, samples_per_trace = data.shape
        component_trace = data.T
        #component_trace = data
        n_samples = int(0.2*self.output_sampling_rate)

#            n_samples = self.global_config.n_samples_trimmed_trace
        dt = 1./self.output_sampling_rate
        samples_back = (np.abs(self.lower_num_ms))/1000./dt
        samples_back = int(np.ceil(samples_back))
        samples_fwd = self.upper_num_ms/1000./dt
        samples_fwd = int(np.ceil(samples_fwd))
        half_way = int(n_samples/2)
        component_trace = component_trace[half_way-samples_back:half_way+samples_fwd,:]


        if math.isnan(component_trace.min()) == True and math.isnan(component_trace.min()) == True:
            return component_trace
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

        # this will change in future with radial_rc and radial_vel_del
    def plot(self,
             peak_ampl_x,
             peak_ampl_y,
             peak_ampl_z,
             reflection_coefficient,
             axial_RC2,
             ax_vel_del,
             ax_vel_2,
             tang_vel_del,
             tang_vel_2,
             ax_lim,
             tangential_reflection_coefficient,
             tang_RC2,
             noise_threshold,
             show = False,
             output_path = None
        ):
        font_size = 11
        params = {
                'legend.fontsize': font_size,
                 'axes.labelsize': font_size,
                 'axes.titlesize':font_size,
                 'xtick.labelsize':font_size,
                 'ytick.labelsize':font_size/1.5
        }
        plt.rcParams.update(params)

        colourbar_type = 'all_one'#'all_one' vsdepth
        cbal = ColourBarAxisLimits(colourbar_type=colourbar_type)#, v_min_1=-22)
        cmap_string = 'spring'; cmap_string = 'jet'

        X = self.x_from_depth()

        Y = np.linspace(self.lower_num_ms, self.upper_num_ms, self.axial.shape[0])
        Y = np.flipud(Y)
        nrows = 2*len(self.components_to_plot)+1
        fig, ax = plt.subplots(nrows, sharex=False, figsize=self.dc_plot_lim())

        dt_ms = self.dt_ms
        lowest_y_tick =  int(self.lower_num_ms/dt_ms)
        greatest_y_tick = int(self.upper_num_ms/dt_ms)

        y_tick_locations = dt_ms * np.arange(lowest_y_tick, greatest_y_tick + 1)
        #<sort out yticks every 5 ms>


    # THIS CAN ALSO BE CHANGED TO USE THE DICT IN LOOP

        n = 0
        if self.plot_panel_comp.axial_heatmap_plot is True and self.axial is not None :
            self.axial_feature_plot(ax[n], X, peak_ampl_x,reflection_coefficient,axial_RC2,ax_vel_del,noise_threshold,ax_lim)
            ax[n+1], heatmap1 = self.plot_hole_as_heatmap(ax[n+1], cbal.v_min_1, cbal.v_max_1, X, Y, self.axial, cmap_string, y_tick_locations,delay=ax_vel_del,delay_2=ax_vel_2)
            n = n+2
        if self.plot_panel_comp.tangential_heatmap_plot is True and self.tangential is not None:
            self.tangential_feature_plot(ax[n], X, peak_ampl_y, tangential_reflection_coefficient,tang_RC2,
                                         tang_vel_del, noise_threshold, ax_lim)
            ax[n+1], heatmap2 = self.plot_hole_as_heatmap(ax[n+1], cbal.v_min_2, cbal.v_max_2, X, Y,self.tangential, cmap_string, y_tick_locations,delay=tang_vel_del,delay_2=tang_vel_2)
            n = n+2
        if self.plot_panel_comp.radial_heatmap_plot is True and self.radial is not None :
            self.radial_feature_plot(ax[n], X, peak_ampl_z,noise_threshold,ax_lim)
            ax[n+1], heatmap2 = self.plot_hole_as_heatmap(ax[n+1], cbal.v_min_2, cbal.v_max_2, X, Y,self.radial, cmap_string, y_tick_locations)
            n = n+2
        self.legend_box(ax[n])
        if output_path is not None:
            #output_path = output_path.replace(".png",".svg")
            plt.savefig(output_path,dpi=300)
        #show = True
        if show:
            plt.show()

    def plot_hole_as_heatmap(self, ax, v_min, v_max, X, Y, Z, cmap_string, y_tick_locations,
                         two_way_travel_time_ms=None, multiple_search_back_ms=None,
                         multiple_search_forward_ms=None,delay=None,delay_2=None):
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
            ax2.spines['right'].set_position(('outward', 100))
            ax2.plot(X, ax_vel_del, color='greenyellow', linewidth=0.4)



        if self.plot_panel_comp.axial_rc_feature_plot is True:
            ax1.plot(X,reflection_coefficient, color = 'blue',linewidth=0.4)
            ax1.set_ylim(ax_lim.axial_rc_lim)
            ax1.spines['right'].set_color('blue')
            ax1.set_ylabel('Ax. RC').set_color('blue')
            ax1.spines['right'].set_linewidth(1)



        if axial_RC2 is not False:
            ax3.plot(X, axial_RC2, color='purple', linewidth=0.4)

            ax3.set_ylim([axial_RC2.min(), axial_RC2.max()])
            ax3.spines['right'].set_color('purple')
            ax3.set_ylabel('Ax. RC2').set_color('purple')
            ax3.spines['right'].set_position(('outward', 50))


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
            ax2.spines['right'].set_position(('outward',100))

        if tang_RC2 is not False:
            ax3.plot(X, tang_RC2, color='purple', linewidth=0.4)

            ax3.set_ylim([tang_RC2.min(), tang_RC2.max()])
            ax3.spines['right'].set_color('purple')
            ax3.set_ylabel('Tang. RC2').set_color('purple')
            ax3.spines['right'].set_position(('outward', 50))


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


        ax1.annotate(self.mult_win_label, xy=(10, 10), xycoords='axes points',
             size=11, ha='left', va='center',
             bbox=dict(boxstyle='square', fc='w'))

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


#    def panel_count(self):
#        """
#        THIS IS NOW BEING DONE VIA LENGTH OF DICT (COMPONENTS TO PLOT)
#        'Decision regarding how many panels to plot. Current decision flow is
#        Default: 1 panel (for legend)
#        3 panel for 1 feature, 1 component and 1 legend
#        5 panel for 2 features, 2 components and 1 legend
#        7 panel for all features and components, and 1 legend
#        Assumption is if we plot a component, we also want its features
#        """
#        panel_count = 1
#        if self.plot_panel_comp.axial_heatmap_plot is True:
#            if self.axial is not None:
#                if (self.axial[~np.isnan(self.axial)]).size !=0:
##            Then we are plotting axial features and components. Need 2 more panel apart from legends
#                    panel_count=3
#
#
#        if self.plot_panel_comp.tangential_heatmap_plot is True:
#            if self.tangential is not None:
#                if (self.tangential[~np.isnan(self.tangential)]).size !=0:
#                    if panel_count == 3:    # if Panel count is 3, this means, we already have axial. now we are checking for others
#                        panel_count =5
#                    else:   #if panel count is not 3, means we do not have axial. Still check if we have tang and if we want to plot it
#                        panel_count = 3
#
#
#        if self.plot_panel_comp.radial_heatmap_plot is True:
#            if self.radial is not None:
#                if (self.radial[~np.isnan(self.radial)]).size !=0:
#                    if panel_count==5:      #if panel count is 5, means we have axial and tangential. with radial heatmap true and not none, we need 2 more panels
#                        panel_count = 7
#                    elif panel_count == 3:  #either axial or tangential is missing
#                        panel_count = 5
#                    else:
#                        panel_count = 3
#
#
#
#        #both axial and tangential are missing
#        if panel_count ==1:  # no feature or components
#            sys.exit('No features and components found')
#
#
#        return panel_count
    def dc_plot_lim(self):
        dc_plot_lim = (24,12)
        return dc_plot_lim
