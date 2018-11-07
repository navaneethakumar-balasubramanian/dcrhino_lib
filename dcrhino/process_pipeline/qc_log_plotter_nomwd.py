#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Nov  6 17:04:33 2018

@author: sjha
"""

import os
import numpy as np
from dcrhino.analysis.data_manager.temp_paths import ensure_dir
import matplotlib.pyplot as plt
from dcrhino.analysis.graphical.supporting_well_log_plots import well_log_panel_plot, well_log_panel_time_plot
import pdb
import pandas as pd
from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots import plot_hole_as_heatmap,ColourBarAxisLimtis
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots09192018 import QCBlastholePlotInputs

class QCLogPlotter_nomwd():

    def __init__(self,axial,tangential,radial,extracted_features_df,plot_title_id,output_file_path,global_config,start_ts, end_ts):
        self.axial = axial
        self.tangential = tangential
        self.radial = radial
        self.plot_title_id = plot_title_id
        self.extracted_features_df = extracted_features_df
        self.output_file_path = output_file_path
        self.global_config = global_config
        self.start_ts = start_ts
        self.end_ts = end_ts
        
        

    def header_plot(self,ax, X, qc_plot_input, plot_title, peak_amplitude_linewidth = 0.2):
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
#        ax.set_xticklabels([])
        ax.legend(loc=1)
#        ax.set_xlabel('Timestamps')
        return


        
    def qc_plot(self,qc_plot_input, out_filename, plot_title,data_date, client_project_id,
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
        colourbar_type = 'all_one'#'all_one' vsdepth
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
        #X is time vector
        X = pd.date_range(start=qc_plot_input.tstart, periods=num_traces_per_component, freq='1S')
        

    	# Spread out Y
        Y = np.linspace(lower_num_ms, upper_num_ms, trace_array_dict[label].shape[0])
        Y = np.flipud(Y)

    #    Generate figure and axis objects to plot. 6 rows, not sharing X axis
        fig, ax = plt.subplots(nrows=4, sharex=False, figsize=(24,12))


    	# Generate Peak plots
    	#Panel 1
        self.header_plot(ax[0], X, qc_plot_input, plot_title)
        
        #Now, go plot heatmaps.

        plt.subplots_adjust(right=10.5)

        #<sort out yticks every 5 ms>
        dt_ms = 5
        #dt_ms = 1./self.global_config.output_sampling_rate
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

#        plt.tight_layout()
        if colourbar_type=='all_one':
            cbaxes = fig.add_axes([0.01, 0.1, 0.007, 0.8])
            cb = plt.colorbar(heatmap1, cax = cbaxes)
            plt.setp(cbaxes.get_xticklabels(), rotation='vertical', fontsize=10)
            cbaxes.yaxis.set_ticks_position('right')

    		#<Labeling>

        ax[0].text(1.01, 0.8, '{}'.format(data_date), fontsize=13, transform=ax[0].transAxes)
        ax[0].text(1.01, 0.6, '{}'.format(client_project_id), fontsize=13, transform=ax[0].transAxes)
        ax[1].text(1.01, 0.5, 'axial', fontsize=11.5, rotation='vertical', transform=ax[1].transAxes)
        ax[2].text(1.01, 0.6, 'tangential', fontsize=11.5, rotation='vertical', transform=ax[2].transAxes)
        ax[3].text(1.01, 0.5, 'radial', fontsize=11.5, rotation='vertical', transform=ax[3].transAxes)
        ax[3].set_xlabel('Timestamps')
#        ax[3].plt.xticks()
#        ax[3].set_xlim(X[0], X[-1])
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
        if show:
            plt.show()
        print("saving {}".format(out_filename))

    def plot(self):
        
        data_date =  self.start_ts
#        depth = self.extracted_features_df['depth']
        components = [self.axial,self.tangential,self.radial]
        trace_array_dict = {}

        print("Step 2: call the plotter");
        lower_num_ms=-5.0
        upper_num_ms=30.0

        for i,component_label in enumerate(COMPONENT_LABELS):
            
            plot_title = "Correlated Trace QC {} Plots_{}".format('Time',self.plot_title_id)

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

#        pdb.set_trace()

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
#        depth = np.nan_to_num(depth)
        
#        data_for_log = QCLogPlotInput()
#        pdb.set_trace()
        qc_plot_input = QCBlastholePlotInputs(trace_array_dict=trace_array_dict,
                                                  peak_ampl_x=self.extracted_features_df['axial_primary_peak_sample'],
                                                  peak_ampl_y=self.extracted_features_df['tangential_primary_peak_sample'],
                                                  peak_ampl_z=self.extracted_features_df['radial_primary_peak_sample'],
                                                  peak_mult_x=self.extracted_features_df['axial_multiple_peak_sample'],
                                                  lower_number_ms=lower_num_ms,
                                                  upper_number_ms=upper_num_ms,                                
#                                                  log_depth = self.extracted_features_df['depth'],
                                                  tstart = self.start_ts,
                                                  tend = self.end_ts)
        print('Passing values to plot code- supporting qc blasthole plots')
        self.qc_plot(qc_plot_input, self.output_file_path,plot_title, data_date, '', show=False)