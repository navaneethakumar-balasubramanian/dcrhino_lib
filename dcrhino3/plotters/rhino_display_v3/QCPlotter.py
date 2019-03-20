# -*- coding: utf-8 -*-

import numpy as np
import math
from matplotlib.ticker import AutoMinorLocator
from matplotlib.lines import Line2D

import matplotlib.pyplot as plt
import pdb

from dcrhino3.feature_extraction.feature_windowing import WindowBoundaries
from dcrhino3.physics.util import get_expected_multiple_times
from dcrhino3.plotters.colour_bar_axis_limits import ColourBarAxisLimits



class QCPlotter():
    
    def __init__(self, axial, tangential, radial, depth, plot_title,
                 sampling_rate, mult_pos, mult_win_label, plot_panel_comp,
                 components_to_plot, normalize=True, lower_num_ms=-5.0,
                 upper_num_ms=30.0, dt_ms=5, plot_by_depth=True, transformed_args=None):
        """
        todo: replace output_sampling_rate with sampling_rate;
        Note: There is a built-in assumption that the axial component exists
        """
        self.plot_title = plot_title

        self.sampling_rate = sampling_rate
        self.dt_ms = dt_ms
        self.lower_num_ms = lower_num_ms
        self.upper_num_ms = upper_num_ms
        self.mult_pos = mult_pos
        self.mult_win_label = mult_win_label
        self.plot_panel_comp = plot_panel_comp
        self.components_to_plot = components_to_plot
        self.depth = depth

        self.normalize = normalize
        self.axial = None
        self.tangential = None
        self.radial = None
        self.transformed_args = transformed_args
        for component_id in components_to_plot.keys():
            if component_id == 'axial':
                self.axial = self.prepare_trace_for_heatmap(components_to_plot['axial'])
            elif component_id == 'tangential':
                self.tangential = self.prepare_trace_for_heatmap(components_to_plot['tangential'])
            elif component_id == 'radial':
                self.radial = self.prepare_trace_for_heatmap(components_to_plot['radial'])
        self.num_traces_per_component, self.num_samples = self.axial.T.shape
    
    def legend_box(self, ax):
        ax1 = ax.twinx()
        ax2 = ax.twinx()
        sub_line1 = Line2D([0],[0], color = 'r',label = 'Axial_amplitude')
        sub_line2 = Line2D([0],[0], color = 'b',label = 'Axial RC 1')
        sub_line3 = Line2D([0],[0], color = 'g',label = 'Axial 1/delay')
        sub_line4 = Line2D([0],[0], color = 'purple',label = 'Axial RC 2')
        legend_lines1 = [sub_line1,sub_line2,sub_line3,sub_line4]
        legend_lines1 = [x for x in legend_lines1 if x is not None]
        sub_line5 = Line2D([0],[0],color = 'magenta',label = 'Tangential_amplitude' )
        sub_line6 = Line2D([0],[0],color = 'cyan',label = 'Tangential RC 1')
        sub_line7 = Line2D([0],[0],color = 'lime',label = 'Tangential 1/delay')
        sub_line8 = Line2D([0],[0], color = 'purple',label = 'Tangential RC 2')

        legend_lines2 = [sub_line5,sub_line6,sub_line7, sub_line8]
        legend_lines2 = [x for x in legend_lines2 if x is not None]

        legend_lines3 = [Line2D([0],[0],color = 'k',linestyle = '--', linewidth = 2,label = 'Axial Multiples'),
                        Line2D([0],[0],color = 'k',linestyle = '-', linewidth = 2,label = 'Tangential Multiples')]


        ax1.annotate(self.mult_win_label, xy=(880, 25), xycoords='axes points',
             size=11, ha='left', va='center',
             bbox=dict(boxstyle='square', fc='w'))

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
        
    def dc_plot_lim(self):
        dc_plot_lim = (24,12)
        return dc_plot_lim
