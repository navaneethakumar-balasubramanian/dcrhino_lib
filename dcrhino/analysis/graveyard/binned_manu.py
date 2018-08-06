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
#from dcrhino.analysis.data_cloud_measurands import MeasurandDataKey

plt.rcParams['figure.figsize'] = [20, 12]

title_fontsize = 30
legend_fontsize = 20

class BinnedManuInput(object):
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






class BinnedManuPlotter():
    def __init__(self, qc_plot_input):
        self.plot(qc_plot_input)

    def plot(self, qc_plot_input):
        #depth = qc_plot_input.depth
        plt.rcParams['figure.figsize'] = [30, 40]
        fig = plt.figure(33)
        fig.subplots_adjust(wspace=0.1)
        label_fontsize = 22
        title_fontsize = 30
        tick_fontsize = 17
        legend_fontsize = 20

        plt.rc('legend',fontsize=legend_fontsize)
        #pdb.set_trace()
        start_datetime_str =  qc_plot_input.hole_start_time.strftime("%B %d, %Y")
        title_line1 = 'RHINO QC Logs, Mont Wright, Quebec, Ca, {}'.format(start_datetime_str)
        #pdb.set_trace()
        #bench = "Bench: {}".format(qc_plot_input.observer_row.bench)
        #pattern = "Pattern: {}".format(qc_plot_input.observer_row.pattern)
        #hole = "Hole: {}".format(qc_plot_input.observer_row.hole)
        #hId = "Hole ID: {}".format(qc_plot_input.observer_row.hole_id)
        title_line2 = ", ".join(['qq', qc_plot_input.mount_point])
        title_text = [title_line1, title_line2]
        plt.suptitle("\n\n".join(title_text), y=0.95, fontsize=title_fontsize)

        ax = {}
        #TODO: probably shoudl modify to use subplots() not subplot()
        n_plates = 4
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

        ax[3] = plt.subplot(1, n_plates, 4)
        well_log_panel_plot(ax[3], qc_plot_input.mse, qc_plot_input.depth,
                            'mse', '(MPa)',  x_limits=[0.0, 100], color='black')

        out_fname = "name"#{}_{}_{}_{}_{}".format(qc_plot_input.observer_row.bench,
                          #    qc_plot_input.observer_row.pattern,
                          #    qc_plot_input.observer_row.hole,
                          #    qc_plot_input.observer_row.hole_id,
                          #    qc_plot_input.mount_point)
        #out_fname = "_".join([bench, pattern, hole, hId, qc_plot_input.mount_point])
        output_dir = os.path.join(qc_plot_input.data_level_path, 'binned')
#                                  '{}'.format(qc_plot_input.observer_row.bench), '{}'.format(qc_plot_input.observer_row.pattern))
        ensure_dir(output_dir)
        #pdb.set_trace()
        plt.savefig(os.path.join(output_dir, out_fname+'.png'))
        plt.show()
        plt.clf()



def main():
    """
    """
    import datetime
    n_points = 100
    x = 1e2*np.random.rand(n_points)
    depth = np.arange(n_points)/10.
    plot_input = BinnedManuInput()
    plot_input.depth = depth
    plot_input.amplitude_ratio = x
    plot_input.arrival_time_diff_samples = x
    plot_input.sampling_rate_of_trace = 20.2
    plot_input.hole_start_time = datetime.datetime(2018, 7, 3, 15, 50, 20)
    plot_input.mse = x
    plot_input.peak_amplitude = x
    plot_input.data_level_path = '/home/kkappler/tmp/'
    plot_input.mount_point = 'dogs'
    plotter = BinnedManuPlotter(plot_input)
    plotter.plot(plot_input)
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
