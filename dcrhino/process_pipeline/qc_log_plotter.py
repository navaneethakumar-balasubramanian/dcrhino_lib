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

class QCLogPlotterv2():

    def __init__(self,axial,tangential,radial,mwd_helper,mwd_df,extracted_features_df,plot_title_id,output_file_path,global_config,mult_pos,plot_by_depth=True):

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
        self.mult_pos = mult_pos
        self.plot_by_depth = plot_by_depth




    def depth_vs_time_plot(self,ax,X,qc_plot_input):
        """
        TODO: read PEP8
        code is read much more often than it it written

    	The tricky part of code begins here. BE VERY CAREFUL WHEN MAKING QC PLOTS
    	IN TIME AND DEPTH. TO MAKE QC PLOTS IN TIME, UNCOMMENT ALL TIME PART OF THE
    	CODE AND COMMENT OUT DEPTH PART OF CODE IN THIS CLASS. FOR DEPTH, VICE VERSA
        """
        ax2 = ax.twinx()
        if self.plot_by_depth:
            depth_axis = -1*(qc_plot_input.sub_mwd_depth-qc_plot_input.collar_elevation)
            depth_axis = np.linspace(min(qc_plot_input.sub_mwd_depth),max(qc_plot_input.sub_mwd_depth),len(qc_plot_input.sub_mwd_depth))
            ax.plot(depth_axis, qc_plot_input.sub_mwd_depth, '*',label = 'Datapoints')
            ax.plot(depth_axis, qc_plot_input.sub_mwd_depth, label = 'Interpolated')
            ax2.plot(depth_axis,qc_plot_input.sub_mwd_rop,label = 'RoP (m/hr)',color = 'r')
            ax.set_xlim(depth_axis[0], depth_axis[-1])

        else:
        	##<time part>
            time_axis = qc_plot_input.sub_mwd_time
            ax.plot(time_axis, qc_plot_input.sub_mwd_depth, '*',label = 'Datapoints')
            ax.plot(time_axis, qc_plot_input.sub_mwd_depth, label = 'Interpolated')
            ax2.plot(time_axis,qc_plot_input.sub_mwd_rop,label = 'RoP (m/hr)',color = 'r')
            ax.set_xlim(X[0], X[-1])
            ax.set_xlabel('Timestamps')
        	##</time part>

        ax.set_xticklabels([])
        ax.legend(loc=2)
        ax.set_ylabel('Computed \n Elevation (m)')
        ax2.legend(loc=1)
        ax2.set_ylabel('RoP (m/hr)')

        return


    def wob_tob_plot(self,ax,X,qc_plot_input):
        ax1 = ax.twinx()
        ax2 = ax.twinx()
#        pdb.set_trace()

        if self.plot_by_depth:
            #<Depth Part>
            depth_axis = -1*(qc_plot_input.sub_mwd_depth-qc_plot_input.collar_elevation)
            depth_axis = np.linspace(min(qc_plot_input.sub_mwd_depth),max(qc_plot_input.sub_mwd_depth),len(qc_plot_input.sub_mwd_depth))
            ax.plot(depth_axis, qc_plot_input.sub_mwd_wob,label = 'Force on Bit',color = 'b')
            ax1.plot(depth_axis, qc_plot_input.sub_mwd_mse*1000,label = 'MSE (scaled by 1000)',color = 'g')
            ax2.plot(depth_axis, qc_plot_input.sub_mwd_tob,label = 'Torque on Bit',color = 'r')
            ax.set_xlabel('Depth (m)')
            ax.set_xlim(depth_axis[0], depth_axis[-1])
            ax.set_xticklabels([])
            	#</Depth Part>
        else:
            	#<Time part>
            time_axis = qc_plot_input.sub_mwd_time
            ax.plot(time_axis, qc_plot_input.sub_mwd_wob,label = 'Force on Bit',color = 'b')
            ax1.plot(time_axis, qc_plot_input.sub_mwd_mse*1000,label = 'MSE (scaled by 1000)',color = 'g')
            ax2.plot(time_axis, qc_plot_input.sub_mwd_tob, label = 'Torque on Bit',color = 'r')
            ax.set_xlabel('Timestamps')
            ax.set_xlim(X[0], X[-1])
            	#</Time part>

    #Beautifying the plots (making informative)
        ax.legend(loc=2)
        ax1.legend(loc=9)
        ax2.legend(loc=3)
        ax.set_ylabel('force on \n bit (kN)')
        ax1.set_ylabel('Torque on \n bit (Nm)')
        ax2.set_ylabel('MSE (MPa)')

        ax.spines['left'].set_color('blue')
        ax1.spines['right'].set_color('green')
        ax2.spines['right'].set_color('red')

#        ax2.set_ylim(min(qc_plot_input.sub_mwd_mse*1000),max(qc_plot_input.sub_mwd_mse*1000))
        ax2.spines['right'].set_position(('outward',60))

        return

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
        #pdb.set_trace()
        ax.set_xlim(X[0], X[-1])
        ax.set_xticklabels([])
        ax.legend(loc=1)
        return



    def log_plot(self, ax, qc_plot_input):

        ax1 = ax.twinx()
        ax2 = ax.twinx()

        #depth_axis = np.linspace(min(qc_plot_input.sub_mwd_depth),max(qc_plot_input.sub_mwd_depth),len(qc_plot_input.log_depth))
        depth_axis = qc_plot_input.sub_mwd_depth_interp


        rc_ylim_min = 0.
        rc_ylim_max = 1.5
        ax.plot(depth_axis,qc_plot_input.reflection_coefficient, label = '1-R / 1+R',color = 'red' )
        ax.set_ylim([rc_ylim_min, rc_ylim_max])
        ax.set_ylabel('RC (Unitless)')
#        self.reflection_coefficient_panel(ax, qc_plot_input, x_limits=[rc_xlim_min, rc_xlim_max])


#        pdb.set_trace()
        primary_width_ylim_min = 250.; primary_width_ylim_max = 350.0;
        ax1.plot(depth_axis,qc_plot_input.pseudo_velocity,  label = 'pseudo velocity (P)',color = 'blue')
        ax1.set_ylim([primary_width_ylim_min, primary_width_ylim_max])
        ax1.set_ylabel('pseudo velocity \n (Uncallibrated)')

#        self.primary_pseudovelocity_panel(ax1, qc_plot_input,
#                                     x_limits=[primary_width_xlim_min, primary_width_xlim_max])


        ucs_ylim_min = 0.1; ucs_ylim_max = 0.9;
        ax2.plot(depth_axis,qc_plot_input.pseudo_ucs,label = 'pseudo_UCS',color = 'green')
        ax2.set_ylim([ucs_ylim_min, ucs_ylim_max])
        ax2.spines['right'].set_position(('outward',60))
        ax2.set_ylabel('pseudo UCS \n (Uncallibrated)')

        ax.set_xlim(depth_axis[0], depth_axis[-1])
        ax.legend(loc=2)
        ax1.legend(loc=9)
        ax2.legend(loc=3)

        ax.spines['left'].set_color('red')
        ax1.spines['right'].set_color('blue')
        ax2.spines['right'].set_color('green')
#        self.ucs_panel(ax2, qc_plot_input, x_limits=[ucs_xlim_min, ucs_xlim_max])


        return



    def qc_plot(self,hole_mwd,qc_plot_input, out_filename, plot_title,data_date, client_project_id,
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

            #X ,time_vector= np.array( self.mwd_helper.get_interpolated_column(hole_mwd,self.mwd_helper.computed_elevation_column_name,time_vector))
            #X = X.astype(float) - float(qc_plot_input.collar_elevation)
            #X = X * -1
            #X = np.nan_to_num(X)
            X = qc_plot_input.sub_mwd_depth_interp
        else:
            X = time_vector

        #pdb.set_trace()

#            pdb.set_trace()
#            pdb.set_trace()
        #   X = get_interpolated_column(time_vector, sub_mwd_df, 'computed_elevation')

    	#if using depth plot
    #    depth_mwd =-1*(qc_plot_input.sub_mwd_depth_interp-qc_plot_input.collar_elevation)
    		#<choose X - depth>
    #    X = depth_vector

    	# Spread out Y
        Y = np.linspace(lower_num_ms, upper_num_ms, trace_array_dict[label].shape[0])
        Y = np.flipud(Y)

    #    Generate figure and axis objects to plot. 6 rows, not sharing X axis

        if self.plot_by_depth:

            fig, ax = plt.subplots(nrows=7, sharex=False, figsize=(24,12))
            #Panel 7
            self.log_plot(ax[6],qc_plot_input)
        else:
            fig, ax = plt.subplots(nrows=6, sharex=False, figsize=(24,12))

    # 	Old code to just generate peak and amplitude plots
    #    fig, ax = plt.subplots(nrows=4, sharex=False, figsize=(24,11))

    	# Generate Peak plots
    	#Panel 1
        self.header_plot(ax[0], X, qc_plot_input, plot_title)
    	#Panel 5
        self.depth_vs_time_plot(ax[4],X,qc_plot_input)
    	#Panel 6
        self.wob_tob_plot(ax[5],X,qc_plot_input)



        #Now, go plot heatmaps.

        plt.subplots_adjust(right=10.5)


        #dt = 1./self.global_config.output_sampling_rate
        #samples_back = (np.abs(lower_num_ms))/1000./dt
        #samples_back = int(np.ceil(samples_back))
        #samples_fwd = upper_num_ms/1000./dt
        #samples_fwd = int(np.ceil(samples_fwd))

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
        ax[1].axhline(y = self.mult_pos.axial_first_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '--',linewidth = 2)
        ax[1].axhline(y = self.mult_pos.axial_second_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '--',linewidth = 2)


        if colourbar_type == 'each_axis':
            #[left, bottom, width, height],
            cbaxes = fig.add_axes([0.99, 0.54, 0.02, 0.18])
            cb = plt.colorbar(heatmap1, cax = cbaxes)
        ax[2], heatmap2 = plot_hole_as_heatmap(ax[2], cbal.v_min_2, cbal.v_max_2, X, Y,
          trace_array_dict['tangential'], cmap_string, y_tick_locations)#,
        ax[2].axhline(y = self.mult_pos.tangential_first_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '-',linewidth = 2)
        ax[2].axhline(y = self.mult_pos.tangential_second_multiple[0],xmin = 0, xmax = X[-1], color = 'k',linestyle = '-',linewidth = 2)



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

    def plot(self,show=False):
        data_date =  self.mwd_df[self.mwd_helper.start_time_column_name].dt.date.iloc[0]
        depth = self.extracted_features_df['depth']
        components = [self.axial,self.tangential,self.radial]
        trace_array_dict = {}

        print("Step 2: call the plotter");
        lower_num_ms=-5.0
        upper_num_ms=30.0

        for i,component_label in enumerate(COMPONENT_LABELS):

            if self.plot_by_depth:
                plot_title = "Correlated Trace QC {} Plots_{}".format('Depth',self.plot_title_id)
            else:
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

            #total hack
            #if self.global_config.output_sampling_rate == 2400:
            #    trace_array_dict[component_label] = trace_array_dict[component_label][240-12:240+72,:]
            #elif self.global_config.output_sampling_rate == 2800:
            ##    trace_array_dict[component_label] = trace_array_dict[component_label][280-14:280+84,:]
            #elif self.global_config.output_sampling_rate == 3200:
            #    trace_array_dict[component_label] = trace_array_dict[component_label][320-16:320+96,:]



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
                                                  peak_mult_x=self.extracted_features_df['axial_multiple_peak_sample'],
                                                  lower_number_ms=lower_num_ms,
                                                  upper_number_ms=upper_num_ms,
                                                  mwd_tstart = self.mwd_df[self.mwd_helper.start_time_column_name].iloc[0],
                                                  mwd_tend = self.mwd_df[self.mwd_helper.end_time_column_name].iloc[-1],
                                                  mwd_start_depth = depth[0],
                                                  mwd_end_depth = depth[-1],
                                                  collar_elevation = self.mwd_df[self.mwd_helper.collar_elevation_column_name].iloc[0],
    											  rock_type = '',
                                                  pseudo_ucs = self.extracted_features_df['pseudo_ucs'],
                                                  pseudo_velocity = self.extracted_features_df['pseudo_velocity'],
                                                  reflection_coefficient = self.extracted_features_df['reflection_coefficient'],
                                                  log_depth = self.extracted_features_df['depth'])







        print('Passing values to plot code- supporting qc blasthole plots')
        self.qc_plot(self.mwd_df,qc_plot_input, self.output_file_path,plot_title, data_date, '', show=show,depth=self.plot_by_depth)



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
    
    @property
    def tangential_primary_peak_sample(self):
        return self.df['tangential_primary_peak_sample']
    
    @property
    def tangential_primary_peak_time_sample(self):
        return self.df['tangential_primary_peak_time_sample']

    @property
    def tangential_amplitude_ratio_sample(self):
        return self.df['tangential_multiple_peak_sample'] / self.df['tangential_primary_peak_sample']

    @property
    def tangential_reflection_coefficient_sample(self):
        return (1.0 - self.tangential_amplitude_ratio_sample) / (1.0 + self.tangential_amplitude_ratio_sample)
    
    @property
    def tangential_velocity_delay(self):
        return self.df['tangential_velocity_delay']

class QCLogPlotter():
    def __init__(self, qc_plot_input, **kwargs):
        self.plot_vs_depth(qc_plot_input)


    def ucs_panel(self,ax, qc_plot_input, x_limits=[None, None], sample_or_poly='sample'):
        """
        units are sqrt(amplitude)
        """
        if sample_or_poly == 'sample':
            data = qc_plot_input.pseudo_ucs_sample
        elif sample_or_poly == 'poly':
            data = np.sqrt(qc_plot_input.axial_primary_peak_amplitude)
        #pdb.set_trace()
        well_log_panel_plot(ax, data, qc_plot_input.sub_mwd_depth_interp, 'pseudo UCS', '(uncalibrated)', x_limits=x_limits, color='grey')


    def reflection_coefficient_panel(self,ax, qc_plot_input, x_limits=[None, None], sample_or_poly='sample'):
        if sample_or_poly == 'sample':
            data = qc_plot_input.reflection_coefficient_sample
        elif sample_or_poly == 'poly':
            data = qc_plot_input.reflection_coefficient
        well_log_panel_plot(ax, data, qc_plot_input.sub_mwd_depth_interp, '1-R / 1+R', '(Unitless)', x_limits=x_limits, color='green')

    def primary_pseudovelocity_panel(self,ax, qc_plot_input, x_limits=[None, None], sample_or_poly='sample'):
        """
        units are 1/s or Hz
        """

        if sample_or_poly == 'sample':
            ax2 = ax.twinx()

            data_vel = qc_plot_input.primary_pseudo_velocity_sample

            well_log_panel_plot(ax, data_vel,
                            qc_plot_input.sub_mwd_depth_interp, 'pseudo \n velocity (P)' , '(uncalibrated)',
                            x_limits=x_limits, color='blue')



            #<SCALING AXIAL VELOCITY DELAY TO PLOT ON THE SAME PANEL. NEED TO KNOW THE UNITS
            # OF PSEUDOVELOCITY AND VELOCITY DELAY, TO CORRECTLY SCALE IT TO SAME UNITS, MAY BE.
            # ALSO VERY CRUDE WAY OF SCALING HERE. NEED TO DO IT BETTER. BUT FOR NOW, JUST TO MAKE IT PLOT

            data_del= (qc_plot_input.axial_velocity_delay/10000.0)+180

            well_log_panel_plot(ax2, data_del,
                            qc_plot_input.sub_mwd_depth_interp, 'velocity delay \n scaled by 1e4' , '(uncalibrated)',
                            x_limits=x_limits, color='red')


            #x_limits = [4., 8., ]
        elif sample_or_poly == 'poly':
            data_vel = 1000*qc_plot_input.primary_wavelet_width

            well_log_panel_plot(ax, data_vel,
                            qc_plot_input.sub_mwd_depth_interp, 'pseudo \n velocity (P)' , '(uncalibrated)',
                            x_limits=x_limits, color='blue')




    def pseudodensity_panel(self,ax, qc_plot_input, x_limits=[None, None], sample_or_poly='sample'):
        if sample_or_poly == 'sample':
            data = qc_plot_input.primary_pseudo_density_sample
        elif sample_or_poly == 'poly':
            data = qc_plot_input.reflection_coefficient* qc_plot_input.primary_wavelet_width**2
        well_log_panel_plot(ax, data, qc_plot_input.sub_mwd_depth_interp, 'pseudo \n density',
                            '(uncalibrated)', x_limits=x_limits, color='red')


    def plot_vs_depth(self,qc_plot_input, multi_mode=False):
        """
        """
        project_id = 'west_angelas'
        full_out_file = qc_plot_input.plot_meta['log_filename']
        ensure_dir(os.path.dirname(full_out_file))
#        pdb.set_trace()
        if os.path.isfile(full_out_file):
            return

        plt.rcParams['figure.figsize'] = [30, 40]
        fig = plt.figure(33)
        fig.subplots_adjust(wspace=0.1)
        title_fontsize = 30
        legend_fontsize = 20
        #pdb.set_trace()
        plt.rc('legend',fontsize=legend_fontsize)

        #title_line1 = get_title_line_1(project_id, qc_plot_input)
        #title_line2 = get_title_line_2(project_id, qc_plot_input)
        #title_line3 = get_title_line_3(project_id, qc_plot_input)
        #title_text = [title_line1, title_line2, title_line3]
        #plt.suptitle("\n\n".join(title_text), y=0.95, fontsize=title_fontsize)

        ax = {}
        n_panels = 3
        for i_ax in range(n_panels):
            ax[i_ax] = plt.subplot(1, n_panels, i_ax+1)

        #pdb.set_trace()
        i_ax = 0
        rc_xlim_min = 0.
        rc_xlim_max = 1.5
        self.reflection_coefficient_panel(ax[i_ax], qc_plot_input, x_limits=[rc_xlim_min, rc_xlim_max])
#        self.reflection_coefficient_panel(ax, qc_plot_input, x_limits=[rc_xlim_min, rc_xlim_max])

#        ucs_xlim_min = 0.4; ucs_xlim_max = 0.9; i_ax += 1
#        ucs_panel(ax[i_ax], qc_plot_input, x_limits=[ucs_xlim_min, ucs_xlim_max])


        primary_width_xlim_min = 250.; primary_width_xlim_max = 350.0; i_ax += 1
        #primary_width_xlim_min = 100.; primary_width_xlim_max = 300.0; i_ax += 1
        #primary_width_xlim_min = None; primary_width_xlim_max = None; i_ax += 1
        self.primary_pseudovelocity_panel(ax[i_ax], qc_plot_input,
                                     x_limits=[primary_width_xlim_min, primary_width_xlim_max])

        ucs_xlim_min = 0.1; ucs_xlim_max = 0.9; i_ax += 1
        self.ucs_panel(ax[i_ax], qc_plot_input, x_limits=[ucs_xlim_min, ucs_xlim_max])
#        pseudodensity_xlim_min = None; pseudodensity_xlim_max = None; i_ax += 1
        #pseudodensity_xlim_min = 0.0; pseudodensity_xlim_max = 15.0; i_ax += 1
#        self.pseudodensity_panel(ax[i_ax], qc_plot_input,
#                            x_limits=[pseudodensity_xlim_min, pseudodensity_xlim_max])

        plt.savefig(full_out_file)
        plt.clf()
