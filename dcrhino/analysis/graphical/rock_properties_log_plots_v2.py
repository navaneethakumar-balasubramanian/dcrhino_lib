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

class RockPropertyPlotInput(object):
    """
    """
    def __init__(self):#, df):
        """
        df is a level3 csv
        """
        self.density = None
        self.ucs = None
        self.acoustic_impedance = None
        self.mse = None
        self.data_level_path = None
        self.mount_point = None


def populate_rock_properties(binned_df):
    """
    """
    rock_properties_plot_input = RockPropertyPlotInput()




class RockPropertiesLogPlotter():
    def __init__(self, plot_input):
        self.plot(plot_input)

    def plot(self, plot_input):
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
        title_line1 = get_title_line_1(plot_input.project_id, plot_input)
        title_line2 = get_title_line_2(plot_input.project_id, plot_input)
        title_text = [title_line1, title_line2]
        plt.suptitle("\n\n".join(title_text), y=0.95, fontsize=title_fontsize)

        if plot_input.project_id == 'mont_wright':
            out_fname = "{}_{}_{}_{}_{}".format(plot_input.observer_row.bench,
                         plot_input.observer_row.pattern,
                         plot_input.observer_row.hole,
                         plot_input.observer_row.hole_id,
                         plot_input.mount_point)
            output_dir = os.path.join(plot_input.data_level_path,
                                      '{}'.format(plot_input.observer_row.bench), '{}'.format(plot_input.observer_row.pattern))
        elif plot_input.project_id=='west_angelas':
            area = plot_input.observer_row.area.replace('/', '-')
            out_fname='{}-{}'.format(area, plot_input.observer_row.hole)
            output_dir = os.path.join(plot_input.data_level_path, 'binned',
                                  '{}'.format(plot_input.observer_row.area))

        full_out_file = os.path.join(output_dir, out_fname+'.png')
        ensure_dir(output_dir)

        ax = {}
        #TODO: probably shoudl modify to use subplots() not subplot()
        n_plates = 4
        ax[0] = plt.subplot(1, n_plates, 1)
        well_log_panel_plot(ax[0], plot_input.density, plot_input.depth,
                            'pseudo-density', '(Units Not Given)', x_limits=[0., 4.])

        ax[1] = plt.subplot(1, n_plates, 2)
        well_log_panel_plot(ax[1], plot_input.modulus, plot_input.depth,
                            'modulus', '(GPa)', x_limits=[5., 25.], color='brown')
        #pdb.set_trace()
        ax[2] = plt.subplot(1, n_plates, 3)
        well_log_panel_plot(ax[2], plot_input.ucs, plot_input.depth,
                            'ucs', 'MPa', x_limits=[20.0, 80.], color='green')

        ax[3] = plt.subplot(1, n_plates, 4)
        well_log_panel_plot(ax[3], plot_input.velocity, plot_input.depth,
                            'velocity', 'm/s',  x_limits=[500, 4000], color='black')

        plt.savefig(full_out_file)
        #plt.show()
        plt.clf()

