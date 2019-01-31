# -*- coding: utf-8 -*-

import os
import numpy as np
from matplotlib.ticker import AutoMinorLocator
from matplotlib.lines import Line2D

import matplotlib.pyplot as plt
import pdb
import pandas as pd



class QCLogPlotter():

    def __init__(self,axial,tangential,radial,depth,plot_title,lower_num_ms=-5.0,upper_num_ms=30.0,plot_by_depth=True):
        
        self.axial = np.flipud(axial)
        self.tangential = np.flipud(tangential)
        self.radial = np.flipud(radial)
        self.num_traces_per_component, self.num_samples = self.axial.T.shape
        self.depth = depth
        
        self.plot_title = plot_title
        
        self.lower_num_ms = lower_num_ms
        self.upper_num_ms = upper_num_ms
        
        
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
        #cbal = ColourBarAxisLimtis(colourbar_type=colourbar_type)#, v_min_1=-22)
        #cmap_string = 'spring'; cmap_string = 'jet'
        
        X = self.x_from_depth()
        
        Y = np.linspace(self.lower_num_ms, self.upper_num_ms, self.axial.shape[0])
        Y = np.flipud(Y)
        
        fig, ax = plt.subplots(nrows=5, sharex=False, figsize=(24,12))
        self.Panel1_plot(ax[0], X, peak_ampl_x,reflection_coefficient,ax_vel_del,ax_lim)
        self.Panel3_plot(ax[2], X, peak_ampl_y,tangential_RC,tang_vel_del,ax_lim,noise_threshold)
        self.legend_box(ax[4])
        
        
        ax[1].text(1.01, 0.5, 'axial', fontsize=11.5, rotation='vertical', transform=ax[1].transAxes)
        ax[3].text(1.01, 0.6, 'tangential', fontsize=11.5, rotation='vertical', transform=ax[2].transAxes)
        ax[3].set_xlabel('Depth (m)')
        
        if output_path is not None:
            plt.savefig(output_path)
        
        if show:
            plt.show()
        

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