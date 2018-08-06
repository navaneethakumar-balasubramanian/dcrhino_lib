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
#from dcrhino.analysis.data_cloud_measurands import MeasurandDataKey

plt.rcParams['figure.figsize'] = [20, 12]



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
        self.peak_amplitude = None
        #self.observer_row = None
        self.data_level_path = None
        self.mount_point = None


class BinnedQCLogPlotter():
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
        start_datetime_str = qc_plot_input.observer_row.datetime_start.strftime("%B %d, %Y")
        title_line1 = 'RHINO QC Logs, Mont Wright, Quebec, Ca, {}'.format(start_datetime_str)
        #pdb.set_trace()
        bench = "Bench: {}".format(qc_plot_input.observer_row.bench)
        pattern = "Pattern: {}".format(qc_plot_input.observer_row.pattern)
        hole = "Hole: {}".format(qc_plot_input.observer_row.hole)
        hId = "Hole ID: {}".format(qc_plot_input.observer_row.hole_id)
        title_line2 = ", ".join([bench, pattern, hole, hId, qc_plot_input.mount_point])
        title_text = [title_line1, title_line2]
        plt.suptitle("\n\n".join(title_text), y=0.95, fontsize=title_fontsize)

        ax = {}
        ax[0] = plt.subplot(1, 2, 1)

        plt.plot(qc_plot_input.amplitude_ratio, qc_plot_input.depth, label='Mult/Peak')
        plt.legend()
        plt.xlabel('(Unitless)', fontsize=label_fontsize)
        plt.ylabel('Depth (meters)', fontsize=label_fontsize)

        ax[0].invert_yaxis()
        ax[0].tick_params(axis='both', which="major", labelsize=tick_fontsize)
        ax[0].set_yticks(np.arange(math.floor(qc_plot_input.depth.min()), math.ceil(qc_plot_input.depth.min()), 1))
        ar_xlim_min = 0.1#qc_plot_input.amplitude_ratio.min() - qc_plot_input.amplitude_ratio.min() * 0.3
        ar_xlim_max = 0.9#df_per_hole['AI'].max() + df_per_hole['AI'].max() * 0.2
#            #xlim_max = 120
        ax[0].set_xlim([ar_xlim_min, ar_xlim_max])
#
        plt.grid(axis='y', ls='solid')
        ax[0].yaxis.set_major_locator(MultipleLocator(1))
        ax[0].yaxis.set_minor_locator(MultipleLocator(0.1))
        ax[0].yaxis.grid(True,'minor')
        ax[0].yaxis.grid(True,'major',linewidth=2)
#
#            #Plot UCS
        ax[1] = plt.subplot(1, 2, 2)
        two_way_time = qc_plot_input.arrival_time_diff_samples/qc_plot_input.sampling_rate_of_trace
        plt.plot(two_way_time, qc_plot_input.depth, color='brown', label='multtime-primarytime')
        plt.legend()
        plt.xlabel('(Time)', fontsize=label_fontsize)

        ax[1].invert_yaxis()
        ax[1].tick_params(axis='both', which="major", labelsize=tick_fontsize)
        ax[1].set_yticks(np.arange(math.floor(qc_plot_input.depth.min()), math.ceil(qc_plot_input.depth.max()), 1))
        twt_xlim_min = 0.0080#df_per_hole['UCS'].min() - df_per_hole['UCS'].min() * 0.3
        twt_xlim_max = 0.0105
        ax[1].set_xlim([twt_xlim_min, twt_xlim_max])

        plt.grid(axis='y', ls='solid')
        ax[1].yaxis.set_major_locator(MultipleLocator(1))
        ax[1].yaxis.set_minor_locator(MultipleLocator(0.1))
        ax[1].yaxis.grid(True,'minor')
        ax[1].yaxis.grid(True,'major',linewidth=2)
        ax[1].tick_params(axis='y',labelleft=False)
        #pdb.set_trace()
        out_fname = "{}_{}_{}_{}_{}".format(qc_plot_input.observer_row.bench,
                              qc_plot_input.observer_row.pattern,
                              qc_plot_input.observer_row.hole,
                              qc_plot_input.observer_row.hole_id,
                              qc_plot_input.mount_point)
        #out_fname = "_".join([bench, pattern, hole, hId, qc_plot_input.mount_point])
        output_dir = os.path.join(qc_plot_input.data_level_path, 'binned'
                                  '{}'.format(qc_plot_input.observer_row.bench), '{}'.format(qc_plot_input.observer_row.pattern))
        ensure_dir(output_dir)
        #pdb.set_trace()
        plt.savefig(os.path.join(output_dir, out_fname+'.png'))
        #plt.show()
        plt.clf()

