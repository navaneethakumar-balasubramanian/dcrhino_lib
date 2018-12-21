#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Sun Nov 18 11:01:36 2018

@author: sjha
"""
from matplotlib.ticker import AutoMinorLocator
import numpy as np
import matplotlib.pyplot as plt
import pdb
import pandas as pd
from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots import plot_hole_as_heatmap,ColourBarAxisLimtis
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots09192018 import QCBlastholePlotInputs
from matplotlib.lines import Line2D

class QCLogPlotterv3():

    def __init__(self,axial,tangential,radial,mwd_helper,mwd_df,extracted_features_df,plot_title_id,output_file_path,global_config,ax_lim,noise_threshold,mult_pos,plot_by_depth=True):

        self.axial = axial
        self.tangential = tangential
        self.radial = radial
        self.plot_title_id = plot_title_id
        self.extracted_features_df = extracted_features_df
        self.mwd_df = mwd_df
        self.mwd_helper = mwd_helper
        self.plot_title_id = plot_title_id
        self.output_file_path = output_file_path
        self.global_config = global_config
        self.ax_lim = ax_lim
        self.noise_threshold = noise_threshold
        self.mult_pos = mult_pos
        self.plot_by_depth = plot_by_depth


    def Panel1_plot(self,ax, X, qc_plot_input, plot_title,ax_lim):
        """
        	#Peak axial, radial, tangential and multiple plots
        
        """
        minor_locator = AutoMinorLocator(8)

#        pdb.set_trace()
        
        ax1 = ax.twinx()
        ax2 = ax.twinx()
        
        ax.plot(X, qc_plot_input.peak_ampl_x, label='peak_x', color = 'red')
        ax1.plot(X,qc_plot_input.reflection_coefficient, label = 'Axial RC', color = 'blue')
#        ax2.plot(X,qc_plot_input.ax_vel_del,label = 'axial 1/delay', color = 'green')
        ax.axhline(y = self.noise_threshold,xmin = 0, xmax = X[-1], color = 'k')
        
        ax.set_title(self.plot_title_id[0],loc = 'center')
        ax1.set_title(self.plot_title_id[1],loc = 'left')
        ax2.set_title(self.plot_title_id[2],loc = 'right')

        # NEED TO FIGURE OUT Y LIMS FOR ALL 3 above.
#        if ax_lim['upper_peak_x'][0]<1:
#        ampl_base = 0.05
##        else:
##            ampl_base = 0.5
#            
#        ampl_min = ampl_base*round(float(ax_lim['lower_peak_x'])/ampl_base)
#        ampl_max = ampl_base*round(float(ax_lim['upper_peak_x'])/ampl_base)+ampl_base/10
#        pdb.set_trace()
#        ax.set_ylim(ampl_min,ampl_max)
#        ax.set_ylim(ax_lim['lower_peak_x'][0],ax_lim['upper_peak_x'][0])
        ax.set_ylim(0,1.5)


        
#        if ax_lim['upper_ax_RC'][0]<1:
#            RC_base = 0.05
#        else:
#        RC_base = 0.5
#            
#        RC_min = RC_base*round(float(ax_lim['lower_ax_RC'][0])/RC_base)
#        RC_max = RC_base*round(float(ax_lim['upper_ax_RC'][0])/RC_base)+RC_base/10
#        
#        ax1.set_ylim(RC_min,RC_max)
#        ax1.set_ylim(ax_lim['lower_ax_RC'][0],ax_lim['upper_ax_RC'][0])
        ax1.set_ylim(0,1)

        
#        if ax_lim['upper_ax_delay'][0]<1:
#           delay_base = 0.5
#        else:
#        delay_base = 5
#           
#        delay_min = delay_base*round(float(ax_lim['lower_ax_delay'][0])/delay_base)-delay_base
#        delay_max = delay_base*round(float(ax_lim['upper_ax_delay'][0])/delay_base)+delay_base
##        ax2.set_ylim(delay_min,delay_max)
##        ax2.set_ylim(ax_lim['lower_ax_delay'][0],ax_lim['upper_ax_delay'][0])
#        ax2.set_ylim(50,150)
        
#        pdb.set_trace()
        
        ax.set_xlim(X[0], X[-1])
#        ax.legend(loc=1)
        
        
        ax.spines['left'].set_color('red')
        ax1.spines['right'].set_color('blue')
#        ax2.spines['right'].set_color('greenyellow')
        
        ax.set_ylabel('Ax. Amp').set_color('red')
        ax1.set_ylabel('Ax. RC').set_color('blue')
#        ax2.set_ylabel('Ax. Delay').set_color('greenyellow')
        
        ax.spines['left'].set_linewidth(2)
        ax1.spines['right'].set_linewidth(2)
#        ax2.spines['right'].set_linewidth(2)
        
#        ax2.spines['right'].set_position(('outward',60))
        
#        pdb.set_trace()
        
        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])
        
        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])

        
        for x_maj_tick in x_maj_tick:
            ax.axvline(x = x_maj_tick, ymin = 0, ymax = 1.5, color = 'k')
            
        for x_min_tick in x_min_tick:
            ax.axvline(x = x_min_tick, ymin = 0, ymax = 1.5, color = 'k', linestyle = ':')
            
        ax.xaxis.set_minor_locator(minor_locator)


    def Panel3_plot(self,ax, X, qc_plot_input, plot_title,ax_lim):
        """
        	#Tangential peak, RC and axial delay plots

        """
        minor_locator = AutoMinorLocator(8)

        ax1 = ax.twinx()
        ax2 = ax.twinx()
        
        ax.plot(X, qc_plot_input.peak_ampl_y, label='peak_y',color = 'magenta')
        ax1.plot(X,qc_plot_input.tangential_RC, label = 'Tangential RC',color = 'cyan')
#        ax2.plot(X,qc_plot_input.tang_vel_del,label = 'Tangential 1/delay',color = 'lime')        ax2.plot(X,qc_plot_input.tang_vel_del,label = 'Tangential 1/delay',color = 'lime')
        ax2.plot(X,qc_plot_input.peak_ampl_z,label = 'peak_z',color = 'lime')

        ax.axhline(y = self.noise_threshold,xmin = 0, xmax = X[-1], color = 'k')
        
#        ax.legend()
        # SETTING AXIS LIMITS BASED ON JAMIE'S RECCOMENDATION. 5% ABOVE AND BELOW
        # THE MAX AND MIN VALUES FOR A BENCH.

#        if ax_lim['upper_peak_y'][0]<1:
#        tang_ampl_base = 0.05
##        else:
##            tang_ampl_base = 0.5
#
#        tang_ampl_min = tang_ampl_base*round(float(ax_lim['lower_peak_y'])/tang_ampl_base)
#        tang_ampl_max = tang_ampl_base*round(float(ax_lim['upper_peak_y'])/tang_ampl_base)+tang_ampl_base
        
#        ax.set_ylim(tang_ampl_min,tang_ampl_max)
#        ax.set_ylim(ax_lim['lower_peak_y'][0],ax_lim['upper_peak_y'][0])
        ax.set_ylim(-0.5,1.5)


        
#        if ax_lim['upper_tang_RC'][0]<1:
#            tang_RC_base = 0.05
#        else:
#        tang_RC_base = 0.5
#            
#        tang_RC_min = tang_RC_base*round(float(ax_lim['lower_tang_RC'][0])/tang_RC_base)
#        tang_RC_max = tang_RC_base*round(float(ax_lim['upper_tang_RC'][0])/tang_RC_base)+tang_RC_base
        
#        ax1.set_ylim(tang_RC_min,tang_RC_max)
#        ax1.set_ylim(ax_lim['lower_tang_RC'][0],ax_lim['upper_tang_RC'][0])
        ax1.set_ylim(0,1)

#        if ax_lim['lower_tang_delay'][0]<1:
#            tang_delay_base = 0.5
#        else:
#        tang_delay_base = 5
#            
#        tang_delay_min = tang_delay_base*round(float(ax_lim['lower_tang_delay'][0])/tang_delay_base)-tang_delay_base
#        tang_delay_max = tang_delay_base*round(float(ax_lim['upper_tang_delay'][0])/tang_delay_base)+tang_delay_base
#        
#        ax2.set_ylim(tang_delay_min,tang_delay_max)
#        ax2.set_ylim(ax_lim['lower_tang_delay'][0],ax_lim['upper_tang_delay'][0])
#        ax2.set_ylim(-15,5) # for tangential delay
        ax2.set_ylim(0,2) # for radial amp


#        pdb.set_trace()
        # AXIAL LIMITS SET
        
        ax.set_xlim(X[0], X[-1])
        
        ax.spines['left'].set_color('magenta')
        ax1.spines['right'].set_color('cyan')
        ax2.spines['right'].set_color('lime')
        
        ax.spines['left'].set_linewidth(2)
        ax1.spines['right'].set_linewidth(2)
        ax2.spines['right'].set_linewidth(2)
        
        ax.set_ylabel('Tang. Amp').set_color('magenta')
        ax1.set_ylabel('Tang. RC').set_color('cyan')
#        ax2.set_ylabel('Tang. Delay').set_color('lime')
        ax2.set_ylabel('Radial Amplitude').set_color('lime')

        ax2.spines['right'].set_position(('outward',60))
        ax.minorticks_on()
        
        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])

        
        for x_maj_tick in x_maj_tick:
            ax.axvline(x = x_maj_tick, ymin = -0.5, ymax = 1.5, color = 'k')
            
        for x_min_tick in x_min_tick:
            ax.axvline(x = x_min_tick, ymin = -0.5, ymax = 1.5, color = 'k', linestyle = ':')
            
        ax.xaxis.set_minor_locator(minor_locator)



    def qc_plot(self,hole_mwd,qc_plot_input, out_filename, plot_title,data_date, client_project_id,ax_lim,
                   two_way_travel_time_ms=None, peak_search_interval_ms=None, dpi=300, show=False,depth=False):
        """
        """

        params = {'legend.fontsize': 'medium',
             'axes.labelsize': 'medium',
             'axes.titlesize':'medium',
             'xtick.labelsize':'medium',
             'ytick.labelsize':'medium'}
        plt.rcParams.update(params)

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

        time_vector = pd.date_range(start=qc_plot_input.sub_mwd_time.iloc[0], periods=num_traces_per_component, freq='1S')
        
        #<choose X - time>

        if depth is not False:

            X ,time_vector= np.array( self.mwd_helper.get_interpolated_column(hole_mwd,self.mwd_helper.computed_elevation_column_name,time_vector))
            X = X.astype(float) - float(qc_plot_input.collar_elevation)
            X = X * -1
            X = np.nan_to_num(X)

        else:
            X = time_vector


    	# Spread out Y
        Y = np.linspace(lower_num_ms, upper_num_ms, trace_array_dict[label].shape[0])
        Y = np.flipud(Y)

    #    Generate figure and axis objects to plot. 6 rows, not sharing X axis

        fig, ax = plt.subplots(nrows=5, sharex=False, figsize=(24,12))
        fig.suptitle(plot_title)

    	# Generate Peak plots
    	#Panel 1
        self.Panel1_plot(ax[0], X, qc_plot_input, plot_title,ax_lim)
        # Panel 3
        self.Panel3_plot(ax[2], X, qc_plot_input, plot_title,ax_lim)
        # Panel 5
        self.legend_box(ax[4])


        


        #Now, go plot heatmaps.

        plt.subplots_adjust(right=10.5)


        #<sort out yticks every 5 ms>
        dt_ms = 5
        #dt_ms = 1./self.global_config.output_sampling_rate
        lowest_y_tick =  int(lower_num_ms/dt_ms)
        greatest_y_tick = int(upper_num_ms/dt_ms)

        y_tick_locations = dt_ms * np.arange(lowest_y_tick, greatest_y_tick + 1)
        #<sort out yticks every 5 ms>

    	#Generate Axial, and Tangential heatmap plots on panel 2 and panel 4

        ax[1], heatmap1 = plot_hole_as_heatmap(ax[1], cbal.v_min_1, cbal.v_max_1, X, Y,
          trace_array_dict['axial'], cmap_string, y_tick_locations,
          two_way_travel_time_ms=qc_plot_input.two_way_travel_time_ms,
          multiple_search_back_ms=qc_plot_input.multiple_search_back_ms,
          multiple_search_forward_ms=qc_plot_input.multiple_search_forward_ms)
#        pdb.set_trace()
        ax[1].axhline(y = self.mult_pos.axial_first_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '--',linewidth = 2)
#        ax[1].axhline(y = self.mult_pos.axial_first_multiple[0],xmin = 0, xmax = X[-1], color = 'cyan',linestyle = '-',linewidth = 4)

        ax[1].axhline(y = self.mult_pos.axial_second_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '--',linewidth = 2)
#        ax[1].axhline(y = self.mult_pos.axial_second_multiple[0],xmin = 0, xmax = X[-1], color = 'cyan',linestyle = '-',linewidth = 4)

        ax[1].axhline(y = self.mult_pos.tangential_first_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '-',linewidth = 2)
        ax[1].axhline(y = self.mult_pos.tangential_second_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '-',linewidth = 2)
#        pdb.set_trace()

        if colourbar_type == 'each_axis':
            #[left, bottom, width, height],
            cbaxes = fig.add_axes([0.99, 0.54, 0.02, 0.18])
            plt.colorbar(heatmap1, cax = cbaxes)
        ax[3], heatmap2 = plot_hole_as_heatmap(ax[3], cbal.v_min_2, cbal.v_max_2, X, Y,
          trace_array_dict['tangential'], cmap_string, y_tick_locations)#,
        
        ax[3].axhline(y = self.mult_pos.axial_first_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '--',linewidth = 2)
#        ax[3].axhline(y = self.mult_pos.axial_first_multiple[0],xmin = 0, xmax = X[-1], color = 'cyan',linestyle = '-',linewidth = 4)

        ax[3].axhline(y = self.mult_pos.axial_second_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '--',linewidth = 2)
#        ax[3].axhline(y = self.mult_pos.axial_second_multiple[0],xmin = 0, xmax = X[-1], color = 'cyan',linestyle = '-',linewidth = 4)

        ax[3].axhline(y = self.mult_pos.tangential_first_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '-',linewidth = 2)
        ax[3].axhline(y = self.mult_pos.tangential_second_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '-',linewidth = 2)
        ax[3].set_xlabel('Depth (m)')



        
        
        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])

        
        for x_maj_tick in x_maj_tick:
            ax[1].axvline(x = x_maj_tick, ymin = lowest_y_tick, ymax = greatest_y_tick, color = 'k')
            ax[3].axvline(x = x_maj_tick, ymin = lowest_y_tick, ymax = greatest_y_tick, color = 'k')

            
        for x_min_tick in x_min_tick:
            ax[1].axvline(x = x_min_tick, ymin = lowest_y_tick, ymax = greatest_y_tick, color = 'k', linestyle = ':')
            ax[3].axvline(x = x_min_tick, ymin = lowest_y_tick, ymax = greatest_y_tick, color = 'k',linestyle = ':')
            

#        plt.tight_layout()
        if colourbar_type=='all_one':
            cbaxes = fig.add_axes([0.01, 0.1, 0.007, 0.8])
            plt.colorbar(heatmap1, cax = cbaxes)
            plt.setp(cbaxes.get_xticklabels(), rotation='vertical', fontsize=10)
            cbaxes.yaxis.set_ticks_position('right')

    		#<Labeling>

        ax[0].text(1.01, 0.6, '{}'.format(client_project_id), fontsize=13, transform=ax[0].transAxes)
        ax[1].text(1.01, 0.6, 'axial', fontsize=11.5, rotation='vertical', transform=ax[1].transAxes)
        ax[3].text(1.01, 0.5, 'tangential', fontsize=11.5, rotation='vertical', transform=ax[3].transAxes)
    		# </Labelling>


        plt.subplots_adjust(left=0.1)
        plt.subplots_adjust(right=0.9)
        plt.savefig(out_filename)
        if show:
            plt.show()
        print("saving {}".format(out_filename))
    
    def legend_box(self,ax):
        ax1 = ax.twinx()
        ax2 = ax.twinx()
        legend_lines1 = [Line2D([0],[0], color = 'r',label = 'Axial_amplitude'),
                        Line2D([0],[0], color = 'b',label = 'Axial RC'),
                        Line2D([0],[0], color = 'g',label = 'Axial 1/delay'),
                        Line2D([0],[0],color = 'k',label = 'Noise Threshold')]
        legend_lines2 = [Line2D([0],[0],color = 'magenta',label = 'Tangential_amplitude' ),
                        Line2D([0],[0],color = 'cyan',label = 'Tangential RC'),
#                        Line2D([0],[0],color = 'lime',label = 'Tangential 1/delay')]
                        Line2D([0],[0],color = 'lime',label = 'Radial Amplitude')]

        legend_lines3 = [Line2D([0],[0],color = 'k',linestyle = '--', linewidth = 2,label = 'Axial Multiples'),
                        Line2D([0],[0],color = 'k',linestyle = '-', linewidth = 2,label = 'Tangential Multiples')]
        
        mult_title1 = "wax1b = {}".format(round(self.mult_pos.axial_first_multiple[0]-4),1)+"  wax1e = {}".format(round(self.mult_pos.axial_first_multiple[0]+4),1)
        mult_title2 = "wax2b = {}".format(round(self.mult_pos.axial_second_multiple[0]-4),1)+"  wax2e = {}".format(round(self.mult_pos.axial_second_multiple[0]+4),1)
        mult_title3 = "wtang1b = {}".format(round(self.mult_pos.tangential_first_multiple[0]-4),1)+"  wtang1e = {}".format(round(self.mult_pos.tangential_first_multiple[0]+4),1)
        mult_title4 = "wtang2b = {}".format(round(self.mult_pos.tangential_first_multiple[0]-4),1)+"  wtang2e = {}".format(round(self.mult_pos.tangential_second_multiple[0]+4),1)
        
        mult_title = mult_title1 + '\n' + mult_title2 + '\n' + mult_title3 + '\n' + mult_title4
        
#        pdb.set_trace()
        
        ax1.annotate(mult_title, xy=(10, 10), xycoords='axes points',
                     size=10, ha='left', va='center',
                     bbox=dict(boxstyle='square', fc='w'))
        
        ax.legend(handles = legend_lines1, loc = 2)
        ax1.legend(handles = legend_lines2,loc = 9)
        ax2.legend(handles = legend_lines3, loc = 1)
        
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

        



        
#        ax.set_xticks([])
#        ax.set_yticks([])
#        ax1.set_yticks([])
#        ax2.set_yticks([])

    def plot(self,show=False):
        data_date =  self.mwd_df[self.mwd_helper.start_time_column_name].dt.date.iloc[0]
        depth = self.extracted_features_df['depth']
        components = [self.axial,self.tangential,self.radial]
        trace_array_dict = {}

        print("Step 2: call the plotter");
        lower_num_ms=-5.0
        upper_num_ms=45.0

        for i,component_label in enumerate(COMPONENT_LABELS):

            if self.plot_by_depth:
                plot_title = "Correlated Trace QC {} Plots".format('Depth')
            else:
                plot_title = "Correlated Trace QC {} Plots".format('Time')

            data = components[i]

            num_traces_in_blasthole, samples_per_trace = data.shape
            trace_array_dict[component_label] = data.T
            n_samples = self.global_config.n_samples_trimmed_trace
            dt = 1./self.global_config.output_sampling_rate
            samples_back = (np.abs(lower_num_ms))/1000./dt
            samples_back = int(np.ceil(samples_back))
            samples_fwd = upper_num_ms/1000./dt
            samples_fwd = int(np.ceil(samples_fwd))
            half_way = int(n_samples/2)
            trace_array_dict[component_label] = trace_array_dict[component_label][half_way-samples_back:half_way+samples_fwd,:]




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
        depth = np.nan_to_num(depth)
        mwd_depth = self.mwd_helper.get_depth_column(self.mwd_df)

#        data_for_log = QCLogPlotInput()

        qc_plot_input = QCBlastholePlotInputs(trace_array_dict=trace_array_dict,
                                                  sub_mwd_time = self.mwd_df[self.mwd_helper.start_time_column_name],
                                                  sub_mwd_depth_interp = depth,
                                                  sub_mwd_rop = self.mwd_df[self.mwd_helper.rop_column_name],
                                                  sub_mwd_depth = mwd_depth,
                                                  sub_mwd_wob = self.mwd_df[self.mwd_helper.wob_column_name]/1000.0,
                                                  sub_mwd_tob = self.mwd_df[self.mwd_helper.tob_column_name],
                                                  sub_mwd_mse = self.mwd_df[self.mwd_helper.mse_column_name],
                                                  peak_ampl_x=self.extracted_features_df['axial_primary_peak_sample'],
                                                  peak_ampl_y=self.extracted_features_df['tangential_primary_peak_sample'],
                                                  peak_ampl_z=self.extracted_features_df['radial_primary_peak_sample'],

                                                  lower_number_ms=lower_num_ms,
                                                  upper_number_ms=upper_num_ms,
                                                  mwd_tstart = self.mwd_df[self.mwd_helper.start_time_column_name].iloc[0],
                                                  mwd_tend = self.mwd_df[self.mwd_helper.end_time_column_name].iloc[-1],
                                                  mwd_start_depth = depth[0],
                                                  mwd_end_depth = depth[-1],
                                                  collar_elevation = self.mwd_df[self.mwd_helper.collar_elevation_column_name].iloc[0],
                                                  reflection_coefficient = self.extracted_features_df['reflection_coefficient'],
                                                  tangential_RC = self.extracted_features_df['tangential_RC'],
                                                  ax_vel_del = self.extracted_features_df['axial_velocity_delay'],
                                                  tang_vel_del = self.extracted_features_df['tangential_velocity_delay'],
                                                  log_depth = self.extracted_features_df['depth'])

        ax_lim = self.ax_lim
        print('Passing values to plot code- supporting qc blasthole plots')
        self.qc_plot(self.mwd_df,qc_plot_input, self.output_file_path,plot_title, data_date, '',ax_lim, show=show,depth=self.plot_by_depth)

#        pdb.set_trace()

class QCLogPlotInput(object):
    """
    """
    def __init__(self):#, df):
        """
        df is a level3 csv
        """
        self.df = None
        self.sampling_rate_of_trace = None
        self.hole_start_time = None
        self.observer_row = None
        self.data_level_path = None
        self.mount_point = None
        self.plot_meta = None
        self.time_stamps = None
        self.component_trace_index = None


    @property
    def depth(self):
        return self.df['depth']
    @property
    def axial_primary_peak_amplitude(self):
        return self.df['axial_primary_peak_amplitude']
    @property
    def axial_primary_peak_sample(self):
        return self.df['axial_primary_peak_sample']
    @property
    def amplitude_ratio(self):
        return self.df['axial_multiple_peak_amplitude'] / self.axial_primary_peak_amplitude

    @property
    def amplitude_ratio_sample(self):
        return self.df['axial_multiple_peak_sample'] / self.df['axial_primary_peak_sample']
    @property
    def reflection_coefficient(self):
        return (1.0 - self.amplitude_ratio) / (1.0 + self.amplitude_ratio)

    @property
    def reflection_coefficient_sample(self):
        return (1.0 - self.amplitude_ratio_sample) / (1.0 + self.amplitude_ratio_sample)

    @property
    def primary_wavelet_width(self):
        return (self.df['axial_primary_zero_crossing_after'] - self.df['axial_primary_zero_crossing_prior'])
    @property
    def multiple_wavelet_width(self):
        return (self.df['axial_multiple_zero_crossing_after'] - self.df['axial_multiple_zero_crossing_prior'])

    @property
    def primary_wavelet_width_sample(self):
        return self.df['axial_primary_zero_crossing_after_sample'] - self.df['axial_primary_left_trough_time']

    @property
    def arrival_time_diff(self):
        return self.df['axial_multiple_peak_time'] - self.df['axial_primary_peak_time']
    @property
    def arrival_time_diff_sample(self):
        return self.df['axial_multiple_peak_time_sample'] - self.df['axial_primary_peak_time_sample']

    @property
    def pseudo_ucs_sample(self):
        return np.sqrt(self.axial_primary_peak_sample)
    @property
    def primary_pseudo_velocity_sample(self):
        return 1. / self.primary_wavelet_width_sample

    @property
    def axial_velocity_delay(self):
        return self.df['axial_velocity_delay']

    @property
    def primary_pseudo_density_sample(self):
        return 1e6 * self.reflection_coefficient_sample / self.primary_pseudo_velocity_sample**2
    
    ## Adding tangential components from Jamie'e email:
#    @property
#    def tangential_primary_peak_amplitude(self):
#        return self.df['tangential_primary_peak_amplitude']
    @property
    def tangential_primary_peak_sample(self):
        return self.df['tangential_primary_peak_sample']
#    @property
#    def tangential_amplitude_ratio(self):
#        return self.df['tangential_multiple_peak_amplitude'] / self.tangential_primary_peak_amplitude

    @property
    def tangential_amplitude_ratio_sample(self):
        return self.df['tangential_multiple_peak_sample'] / self.df['tangential_primary_peak_sample']
#    @property
#    def tangential_reflection_coefficient(self):
#        return (1.0 - self.tangential_amplitude_ratio) / (1.0 + self.tangential_amplitude_ratio)

    @property
    def tangential_reflection_coefficient_sample(self):
        return (1.0 - self.tangential_amplitude_ratio_sample) / (1.0 + self.tangential_amplitude_ratio_sample)
    
    @property
    def tangential_velocity_delay(self):
        return self.df['tangential_velocity_delay']
    
    