import math
import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np
import pdb

from matplotlib.ticker import MultipleLocator

from dcrhino.common.supporting_paths import ensure_dir

from supporting_well_log_plots import get_title_line_1, get_title_line_2
from supporting_well_log_plots import well_log_panel_plot_multi
#from dcrhino.analysis.data_cloud_measurands import MeasurandDataKey

plt.rcParams['figure.figsize'] = [20, 12]



class BinnedQCLogPlotInput(object):
    """
    """
    def __init__(self):#, df):
        """
        df is a level3 csv
        LOG SUBPLOT 1: The primary and multiple measurements, peak and integrated (Vertical)
        PV1, PV5, MV1, MV5,

        LOG SUBPLOT 2: The ratio of mulitple to primary (peak,  and integrated; Vertical)
        CV1, CV2,

        LOG SUBPLOT 3
        Z1 = (1 -  CV1) / (1 + CV1)
        Z2 = (1 -  CV2) / (1 + CV2)

        LOG SUBPLOT 4: (Wavelet widths (pseudovelocity), peak and mulitple, Vertical)
        PV4, MV4,

        LOG SUBPLOT 5:  (pseudo density)
        ~rho1 = Z1 / (PV1)2
        ~rho2 = Z2 / (PV5)2
        """
        self.vertical_primary_peak_amplitude = None
        self.vertical_primary_area = None
        self.vertical_multiple_peak_amplitude = None
        self.vertical_multiple_area = None
        self.vertical_primary_zero_crossing_prior = None
        self.vertical_primary_zero_crossing_after = None
        self.vertical_multiple_zero_crossing_prior = None
        self.vertical_multiple_zero_crossing_after = None

#        self.vertical_peak_amplitude_ratio
#        self.vertical_area_ratio
#
#        self.sampling_rate_of_trace = None
        self.hole_start_time = None
        self.data_level_path = None
        self.mount_point = None
        self.plot_meta = None


    @property
    def vertical_peak_amplitude_ratio(self):
        return self.vertical_multiple_peak_amplitude / self.vertical_primary_peak_amplitude

    @property
    def vertical_area_ratio(self):
        return self.vertical_multiple_area / self.vertical_primary_area

    @property
    def z1(self):
        return (1 + self.vertical_peak_amplitude_ratio) / (1 - self.vertical_peak_amplitude_ratio)

    @property
    def z2(self):
        return (1 + self.vertical_area_ratio) / (1 - self.vertical_area_ratio)

    @property
    def vertical_primary_wavelet_width(self):
        return self.vertical_primary_zero_crossing_after - self.vertical_primary_zero_crossing_prior

    @property
    def vertical_multiple_wavelet_width(self):
        return self.vertical_multiple_zero_crossing_after - self.vertical_multiple_zero_crossing_prior

    @property
    def pseudodensity1(self):
        return (self.z1) / (self.vertical_primary_peak_amplitude)**2

    @property
    def pseudodensity2(self):
        return (self.z2) / (self.vertical_primary_area)**2


class BinnedQCLogPlotter():
    def __init__(self, qc_plot_input):
        self.plot(qc_plot_input)

    def plot(self, qc_plot_input):

        plt.rcParams['figure.figsize'] = [30, 40]
        fig = plt.figure(33)
        fig.subplots_adjust(wspace=0.1)
        title_fontsize = 30
        legend_fontsize = 20

        plt.rc('legend',fontsize=legend_fontsize)
        project_id = 'west_angelas'
        title_line1 = get_title_line_1(project_id, qc_plot_input)
        title_line2 = get_title_line_2(project_id, qc_plot_input)
        title_text = [title_line1, title_line2]
        plt.suptitle("\n\n".join(title_text), y=0.95, fontsize=title_fontsize)

        ax = {}
        #pdb.set_trace()
        ax[0] = plt.subplot(1, 5, 1)
        #log_qty_list = [PV1, PV5, MV1, MV5,]
        log_qty_list = [qc_plot_input.vertical_primary_peak_amplitude,
                        qc_plot_input.vertical_primary_area,
                        qc_plot_input.vertical_multiple_peak_amplitude,
                        qc_plot_input.vertical_multiple_area]
        log_label_list = ['vertical_primary_peak_amplitude', 'vertical_primary_area',
                          'vertical_multiple_peak_amplitude', 'vertical_multiple_area']
        well_log_panel_plot_multi(ax[0], log_qty_list, qc_plot_input.depth,  log_label_list, 'vertical amplitudes' )


        ax[1] = plt.subplot(1, 5, 2)
        log_qty_list = [qc_plot_input.vertical_peak_amplitude_ratio,
                        qc_plot_input.vertical_area_ratio]
        log_label_list = ['vertical_peak_amplitude_ratio', 'vertical_area_ratio',]
        well_log_panel_plot_multi(ax[1], log_qty_list, qc_plot_input.depth,  log_label_list, 'amplitude ratios' )

        ax[2] = plt.subplot(1, 5, 3)
        log_qty_list = [qc_plot_input.z1, qc_plot_input.z2]
        log_label_list = ['z1', 'z2',]
        well_log_panel_plot_multi(ax[2], log_qty_list, qc_plot_input.depth,  log_label_list, 'pseudo_impedance' )

        ax[3] = plt.subplot(1, 5, 4)
        log_qty_list = [qc_plot_input.vertical_primary_wavelet_width, qc_plot_input.vertical_multiple_wavelet_width]
        log_label_list = ['vertical_primary_wavelet_width', 'vertical_multiple_wavelet_width',]
        well_log_panel_plot_multi(ax[3], log_qty_list, qc_plot_input.depth,  log_label_list, 'pseudo_velocity' )

        ax[4] = plt.subplot(1, 5, 5)
        log_qty_list = [qc_plot_input.pseudodensity1, qc_plot_input.pseudodensity2]
        log_label_list = ['pseudodensity1', 'pseudodensity2',]
        well_log_panel_plot_multi(ax[3], log_qty_list, qc_plot_input.depth,  log_label_list, 'pseudo_density' )

#        out_fname = "{}_{}_{}_{}_{}".format(qc_plot_input.observer_row.bench,
#                              qc_plot_input.observer_row.pattern,
#                              qc_plot_input.observer_row.hole,
#                              qc_plot_input.observer_row.hole_id,
#                              qc_plot_input.mount_point)
#        #out_fname = "_".join([bench, pattern, hole, hId, qc_plot_input.mount_point])
#        output_dir = os.path.join(qc_plot_input.data_level_path, 'binned'
#                                  '{}'.format(qc_plot_input.observer_row.bench), '{}'.format(qc_plot_input.observer_row.pattern))
#        ensure_dir(output_dir)
        pdb.set_trace()
        plt.savefig(qc_plot_input.plot_meta['log_filename'])
        #plt.savefig(os.path.join(output_dir, out_fname+'.png'))
        #plt.show()
        plt.clf()

