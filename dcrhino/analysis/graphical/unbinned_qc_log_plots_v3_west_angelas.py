import math
import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np
import pdb

from matplotlib.ticker import MultipleLocator

from dcrhino.analysis.data_manager.temp_paths import DATA_PATH
from dcrhino.analysis.data_manager.temp_paths import ensure_dir
from supporting_well_log_plots import get_title_line_1, get_title_line_2, get_title_line_3
from supporting_well_log_plots import well_log_panel_plot, well_log_panel_time_plot
from supporting_well_log_plots import well_log_panel_plot_multi#(ax, log_data_list, depth, data_label_list, x_label, x_limits=[None, None],
                        #label_fontsize=22, tick_fontsize=17, color_list=None):
#from dcrhino.analysis.data_cloud_measurands import MeasurandDataKey

plt.rcParams['figure.figsize'] = [20, 12]

def set_some_plot_params():
    label_fontsize = 22
    title_fontsize = 30
    tick_fontsize = 17
    legend_fontsize = 20
    return

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
    def primary_pseudo_density_sample(self):
        return 1e6 * self.reflection_coefficient_sample / self.primary_pseudo_velocity_sample**2

#TODO: Migrate these methids below under the QCLogInput() Class.
#TODO: ALSO midify so 'uncalirated ' is defult unless you pass units for x axis

def ratio_panel(ax, qc_plot_input, x_limits=[None, None], sample_or_poly='sample'):
    if sample_or_poly == 'sample':
        data = qc_plot_input.amplitude_ratio_sample
    elif sample_or_poly == 'poly':
        data = qc_plot_input.amplitude_ratio
    well_log_panel_plot(ax, data, qc_plot_input.depth, 'Mult/Peak', '(Unitless)', x_limits=x_limits)

def reflection_coefficient_panel(ax, qc_plot_input, x_limits=[None, None], sample_or_poly='sample'):
    if sample_or_poly == 'sample':
        data = qc_plot_input.reflection_coefficient_sample
    elif sample_or_poly == 'poly':
        data = qc_plot_input.reflection_coefficient
    well_log_panel_plot(ax, data, qc_plot_input.depth, '1-R / 1+R', '(Unitless)', x_limits=x_limits, color='green')

def ucs_panel(ax, qc_plot_input, x_limits=[None, None], sample_or_poly='sample'):
    """
    units are sqrt(amplitude)
    """
    if sample_or_poly == 'sample':
        data = qc_plot_input.pseudo_ucs_sample
    elif sample_or_poly == 'poly':
        data = np.sqrt(qc_plot_input.axial_primary_peak_amplitude)
    #pdb.set_trace()
    well_log_panel_plot(ax, data, qc_plot_input.depth, 'pseudo UCS', '(uncalibrated)', x_limits=x_limits, color='grey')

def delay_panel(ax, qc_plot_input, x_limits=[None, None], sample_or_poly='sample'):
    if sample_or_poly == 'sample':
        data = 1000*qc_plot_input.arrival_time_diff_sample
    elif sample_or_poly == 'poly':
        data = 1000*qc_plot_input.arrival_time_diff
    #pdb.set_trace()
    well_log_panel_plot(ax, data, qc_plot_input.depth,
                        'multtime - \n primarytime', '(ms)', x_limits=x_limits)

def primary_pseudovelocity_panel(ax, qc_plot_input, x_limits=[None, None], sample_or_poly='sample'):
    """
    units are 1/s or Hz
    """
    if sample_or_poly == 'sample':
        data = qc_plot_input.primary_pseudo_velocity_sample
        #x_limits = [4., 8., ]
    elif sample_or_poly == 'poly':
        data = 1000*qc_plot_input.primary_wavelet_width
    well_log_panel_plot(ax, data,
                        qc_plot_input.depth, 'pseudo \n velocity (P)' , '(uncalibrated)',
                        x_limits=x_limits, color='blue')

def multiple_pseudovelocity_panel(ax, qc_plot_input, x_limits=[None, None]):
    well_log_panel_plot(ax, 1000*qc_plot_input.multiple_wavelet_width,
                                qc_plot_input.depth, 'pseudo \n velocity (M)' , 'width (ms)',
                                x_limits=x_limits)

def pseudodensity_panel(ax, qc_plot_input, x_limits=[None, None], sample_or_poly='sample'):
    if sample_or_poly == 'sample':
        data = qc_plot_input.primary_pseudo_density_sample
    elif sample_or_poly == 'poly':
        data = qc_plot_input.reflection_coefficient* qc_plot_input.primary_wavelet_width**2
    well_log_panel_plot(ax, data, qc_plot_input.depth, 'pseudo \n density',
                        '(uncalibrated)', x_limits=x_limits, color='red')

def primary_times_panel(ax, qc_plot_input, x_limits=[None, None], sample_or_poly='sample'):
    if sample_or_poly == 'sample':
        peak_time = 1000*qc_plot_input.df['axial_primary_peak_time_sample']
        zx1 = 1000*qc_plot_input.df['axial_primary_zero_crossing_prior_sample']
        zx2 = 1000*qc_plot_input.df['axial_primary_zero_crossing_after_sample']
        #x_limits = [4., 8., ]
    elif sample_or_poly == 'poly':
        peak_time = 1000*qc_plot_input.axial_primary_peak_time
        zx1 = 1000*qc_plot_input.df['axial_primary_zero_crossing_prior']
        zx2 = 1000*qc_plot_input.df['axial_primary_zero_crossing_after']
    #pdb.set_trace()
    data_list = [peak_time, zx1, zx2];
    log_label_list = ['peak_time', 'zx1', 'zx2']
    well_log_panel_plot_multi(ax, data_list, qc_plot_input.depth,
                              log_label_list, 'primarytimes', x_limits=x_limits)
#    well_log_panel_plot(ax, data,
#                        qc_plot_input.depth, 'primary \n peak time' , '(ms)',
#                        x_limits=x_limits)


class QCLogPlotter():
    def __init__(self, qc_plot_input, **kwargs):
        self.plot_vs_depth(qc_plot_input)



    def plot_vs_depth(self, qc_plot_input, multi_mode=False):
        """
        """
        project_id = 'west_angelas'
        full_out_file = qc_plot_input.plot_meta['log_filename']
        ensure_dir(os.path.dirname(full_out_file))
        #pdb.set_trace()
#        if os.path.isfile(full_out_file):
#            return
        plt.rcParams['figure.figsize'] = [30, 40]
        fig = plt.figure(33)
        fig.subplots_adjust(wspace=0.1)
        title_fontsize = 30
        legend_fontsize = 20

        plt.rc('legend',fontsize=legend_fontsize)

        title_line1 = get_title_line_1(project_id, qc_plot_input)
        title_line2 = get_title_line_2(project_id, qc_plot_input)
        title_line3 = get_title_line_3(project_id, qc_plot_input)
        title_text = [title_line1, title_line2, title_line3]
        plt.suptitle("\n\n".join(title_text), y=0.95, fontsize=title_fontsize)

        ax = {}
        n_panels = 3
        for i_ax in range(n_panels):
            ax[i_ax] = plt.subplot(1, n_panels, i_ax+1)

        #pdb.set_trace()
        i_ax = 0
        rc_xlim_min = 0.; rc_xlim_max = 1.5;
        reflection_coefficient_panel(ax[i_ax], qc_plot_input, x_limits=[rc_xlim_min, rc_xlim_max])

#        ucs_xlim_min = 0.4; ucs_xlim_max = 0.9; i_ax += 1
#        ucs_panel(ax[i_ax], qc_plot_input, x_limits=[ucs_xlim_min, ucs_xlim_max])


        primary_width_xlim_min = 250.; primary_width_xlim_max = 350.0; i_ax += 1
        #primary_width_xlim_min = None; primary_width_xlim_max = None; i_ax += 1
        primary_pseudovelocity_panel(ax[i_ax], qc_plot_input,
                                     x_limits=[primary_width_xlim_min, primary_width_xlim_max])



#        pseudodensity_xlim_min = None; pseudodensity_xlim_max = None; i_ax += 1
        pseudodensity_xlim_min = 0.0; pseudodensity_xlim_max = 15.0; i_ax += 1
        pseudodensity_panel(ax[i_ax], qc_plot_input,
                            x_limits=[pseudodensity_xlim_min, pseudodensity_xlim_max])

        plt.savefig(full_out_file)
        #plt.show()
        plt.clf()




