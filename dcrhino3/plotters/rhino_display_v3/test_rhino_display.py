# -*- coding: utf-8 -*-
"""
Created on Thu Mar  7 17:04:13 2019

@author: kkappler

Patterns for populating the multiples:
    1. Same for every trace and we know it (why? becasue the flag DSL-chnage is never raised)
        assign to a var, or an array
    2. Varies, blockwise ... ; use array (simple, expensive) or start-index, end-index, value;

General question for MR: when load a large df with highly redundant info, what
is the effect on RAM, ... in general is the high-redundancy recognized on read-in?
what about assignment of a uniform column ...


right now what i want is to specify on a high level that I want the {p,m1,m2} windows plotted
THis in turn requires getting the window boundaries from the feature extractor
THis in turn means we need the expected_multiple_times(); or expected_two_way_travel_times()
as well as the window_widths;
CAREFUL!! See how expected_multiple_time is in here ... that is itself a trace-by-trace()
calculation.  WE will have an argument for getting this from the h5 that does it for a loop
or
window_widths = self.transformed_args.window_widths
#                expected_multiple_periods = get_expected_multiple_times(self.transformed_args)
#                window_boundaries = {}
#                for component_id in self.transformed_args.components_to_process:
#                    primary_shift = -1.0 * getattr(window_widths, component_id).primary / 2.0
#                    wb = WindowBoundaries()
#                    wb.assign_window_boundaries(component_id, window_widths,
#                                                expected_multiple_periods,
#                                                primary_shift=primary_shift)
#                    window_boundaries[component_id] = wb.window_boundaries_time

"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb


from rhino_display import RhinoDisplay
from rhino_display_panel import Header, Heatmap, Curve#CurveMedley,

home = os.path.expanduser('~/')
h5_path = os.path.join(home, '.cache/datacloud/line_creek/acorr/23531_5208_5208.h5')
h5_path = os.path.join(home, '.cache/datacloud/line_creek/processed/793_77_23531_23531_5208_5208/processing_flow_20180307/processed.h5')
#h5_path = os.path.join(home, '.cache/datacloud/holes/processed/mont_wright/6586_5451_5451/v3_processing_flow/processed.h5')

def test_rhino_display():
    pdb.set_trace()
    rhino_display = RhinoDisplay()
    header_1_medley_1_label = 'K0_axial_primary_max_amplitude';
    header_1_curve_1 = Curve(column_label=header_1_medley_1_label,
                             x_axis_label='depth')
    header_1_curves = [header_1_curve_1,]
#    header_1_medley_1_labels = ['K0_axial_primary_max_amplitude', 'K0_tangential_primary_max_amplitude']

#    curve_groups = []
#    curves_groups.append(['K0_axial_primary_max_amplitude'
    header_1 = Header(h5=h5_path, curves=header_1_curves)
    heatmap_1 = Heatmap(h5=h5_path, component='axial',
                        wavelet_windows_to_show=['primary', 'multiple_1', 'multiple_2'])
    header_2 = Header(h5=h5_path)
    heatmap_2 = Heatmap(h5=h5_path, component='tangential')

#    rd_dict = {}
#    rd_dict['1'] = header_1.to_dict()
#    rd_dict['2'] = heatmap_1.to_dict()
#    rd_dict['3'] = header_2.to_dict()
#    rd_dict['4'] = heatmap_2.to_dict()
#    rd_dict['1'] = header_1
#    rd_dict['2'] = heatmap_1
#    rd_dict['3'] = header_2
#    rd_dict['4'] = heatmap_2

#    rhino_display.json_dict = rd_dict
    rhino_display.panels = [header_1, heatmap_1, header_2, heatmap_2]
    rhino_display.panels = [header_1, heatmap_1, heatmap_2]
    pdb.set_trace()
    rhino_display.plot()

def main():
    """
    """
    test_rhino_display()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
