import math
import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np
import pdb
from math import pi

from matplotlib.ticker import MultipleLocator

from dcrhino.constants import DATA_PATH
from dcrhino.common.supporting_paths import ensure_dir
from supporting_well_log_plots import well_log_panel_plot
from supporting_well_log_plots import get_title_line_1, get_title_line_2
#from dcrhino.analysis.data_cloud_measurands import MeasurandDataKey

plt.rcParams['figure.figsize'] = [20, 12]

title_fontsize = 30
legend_fontsize = 20

class BinnedQCLogPlotInput(object):
    """
    """
    def __init__(self):#, df):
        """
        df is a level3 csv
        """
        self.amplitude_ratio = None#df['peak_mult_x']/df['peak_ampl_x']
        self.arrival_time_diff_samples = None#df['peak_mult_ndx_x'] - df['peak_ampl_ndx_x']
        self.sampling_rate_of_trace = None
        self.hole_start_time = None
        self.mse = None
        self.peak_amplitude = None
        #self.observer_row = None
        self.data_level_path = None
        self.mount_point = None


class BinnedQCLogPlotter():
    def __init__(self, qc_plot_input):
        self.plot(qc_plot_input)

    def plot(self, qc_plot_input):
        #depth = qc_plot_input.depth
        project_id = 'west_angelas'
        if project_id == 'mont_wright':
            out_fname = "{}_{}_{}_{}_{}".format(qc_plot_input.observer_row.bench,
                         qc_plot_input.observer_row.pattern,
                         qc_plot_input.observer_row.hole,
                         qc_plot_input.observer_row.hole_id,
                         qc_plot_input.mount_point)
            output_dir = os.path.join(qc_plot_input.data_level_path,
                                      '{}'.format(qc_plot_input.observer_row.bench), '{}'.format(qc_plot_input.observer_row.pattern))
        elif project_id=='west_angelas':
            area = qc_plot_input.observer_row.area.replace('/', '-')
            out_fname='{}-{}'.format(area, qc_plot_input.observer_row.hole)
            output_dir = os.path.join(qc_plot_input.data_level_path, 'binned',
                                  '{}'.format(qc_plot_input.observer_row.area))
        full_out_file = os.path.join(output_dir, out_fname+'.png')
        ensure_dir(output_dir)
        if os.path.isfile(full_out_file):
            return
        #pdb.set_trace()
        plt.rcParams['figure.figsize'] = [30, 40]
        fig = plt.figure(33)
        fig.subplots_adjust(wspace=0.1)
        label_fontsize = 22
        title_fontsize = 30
        tick_fontsize = 17
        legend_fontsize = 20

        plt.rc('legend',fontsize=legend_fontsize)

        title_line1 = get_title_line_1(project_id, qc_plot_input)

	title_line2 = get_title_line_2(project_id, qc_plot_input)
        title_text = [title_line1, title_line2]
        plt.suptitle("\n\n".join(title_text), y=0.95, fontsize=title_fontsize)

        ax = {}
        #TODO: probably shoudl modify to use subplots() not subplot()
        n_plates = 3
        ax[0] = plt.subplot(1, n_plates, 1)
        well_log_panel_plot(ax[0], qc_plot_input.amplitude_ratio, qc_plot_input.depth,
                            'Mult/Peak', '(Unitless)', x_limits=[0.1, 0.9])

        ax[1] = plt.subplot(1, n_plates, 2)
        two_way_time = qc_plot_input.arrival_time_diff_samples/qc_plot_input.sampling_rate_of_trace
        well_log_panel_plot(ax[1], two_way_time, qc_plot_input.depth,
                            'multtime-primarytime', '(Time)', x_limits=[0.0080, 0.01059], color='brown')
        #pdb.set_trace()
        ax[2] = plt.subplot(1, n_plates, 3)
        well_log_panel_plot(ax[2], qc_plot_input.peak_amplitude, qc_plot_input.depth,
                            'primary peakamplitude', '(g 9.8*m/s^2)', x_limits=[0.0, 1.2], color='green')

        #ax[3] = plt.subplot(1, n_plates, 4)
        #well_log_panel_plot(ax[3], qc_plot_input.mse, qc_plot_input.depth,
        #                    'mse', '(MPa)',  x_limits=[0.0, 100], color='black')


        plt.savefig(full_out_file)
        #plt.show()
        plt.clf()

