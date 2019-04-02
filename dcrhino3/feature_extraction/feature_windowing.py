# -*- coding: utf-8 -*-
"""
Created on Sun Mar  3 17:23:16 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import pdb
import re

from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)

TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION = ['primary', 'multiple_1', 'multiple_2',
                                        'multiple_3', 'noise_1', 'noise_2']

class WindowBoundaries(object):
    def __init__(self):#, component_id, trimmed_trace, transformed_args, timestamp):
        """
        .. todo:: window_boundaries time should just have a .to_index(sampling_rate) method
        .. todo:: change window_widths from an argument to an ivar
        """
        self.window_boundaries_time = {}

    def assign_window_boundaries(self, component_id, window_widths,
                                 expected_resonance_period, primary_shift=0.0):
        window_boundaries_time_dict = {}
        #window_boundaries_time_dict = self.window_boundaries_time[component_id]
        for window_label in TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION:
            if window_label == 'primary':
                try:
                    width = getattr(window_widths, component_id).primary #awkward unpacking
                except:
                    width = window_widths[component_id]['primary']
                window_bounds = np.array([primary_shift, primary_shift + width])
            elif bool(re.match('multiple', window_label)):
                n_multiple = int(window_label[-1])
                delay = n_multiple * expected_resonance_period
                #delay += primary_shift
                #width = window_widths[component][window_label]
                try:
                    width = getattr(getattr(window_widths,component_id),window_label)
                except:
                    width = window_widths[component_id][window_label]
                window_bounds = np.array([delay, delay+width])
            elif window_label == 'noise_1':
                start_of_window = window_boundaries_time_dict['multiple_1'][1]
                end_of_window = window_boundaries_time_dict['multiple_2'][0]
                window_bounds = np.array([start_of_window, end_of_window])
            elif window_label == 'noise_2':
                start_of_window = window_boundaries_time_dict['multiple_2'][1]
                end_of_window = window_boundaries_time_dict['multiple_3'][0]
                window_bounds = np.array([start_of_window, end_of_window])
            window_boundaries_time_dict[window_label] = window_bounds
        self.window_boundaries_time = window_boundaries_time_dict
        return


#class AmplitudeWindows(object):
#    """
#    """
#    def __init__(self):
#        self.half_widths = {}
#        self.half_widths['primary'] = 0.00105
#        self.half_widths['multiple_1'] = 0.00105
#        self.half_widths['multiple_2'] = 0.00105
#
#class ManualTimeWindows(object):
#    """
#    prototype, to make so changes propagate through J2, and eventually into
#    plotter and json
#
#    .. todo: decide about whether this wants to unpack all components or only component_id
#    """
#    def __init__(self, manual_bounds=None, component_id=None, wavelets_to_process=None):
#
#        self.time_window = {}
#        pdb.set_trace()
#
#        if manual_bounds is not None:
#            manual_bounds_dict = manual_bounds.__dict__
#            if component_id is not None:
#                components_to_unpack = [component_id,]
#            else:
#                components_to_unpack = manual_bounds_dict.keys()
#
#            for component in components_to_unpack:
#
#                self.time_window[component] = {}
#                wavelets_to_assign = manual_bounds_dict[component].keys()
#                print(wavelets_to_assign)
#                pdb.set_trace()
#                print('ks')
#
#
#            self.time_window['primary'] = Interval(lower_bound=-0.00082,
#                                                    upper_bound=0.00118)
#            self.time_window['multiple_1'] = Interval(lower_bound=0.00989,
#                                                    upper_bound=0.0119)
#            self.time_window['multiple_2'] = Interval(lower_bound=0.020249,
#                                                    upper_bound=0.02425)
#
#        else:
#            print('add logic here to calculate windows like a in J1/K0')
#            pdb.set_trace()
#            pass
#
#
#    def get_window(self, window_label):
#        """
#        yes, this sucks and should be done with a dict BUT it is flexible
#        for half-baked test changes ... so live with it for now
#        """
#        t_start = self.time_window[window_label].lower_bound
#        t_final = self.time_window[window_label].upper_bound
#        return t_start, t_final
def test_populate_window_data_dict(trace_data_window_dict, trace_time_vector_dict,
                                   trimmed_trace, trimmed_time_vector):
    """
    Plot the trace in black line and multicolor scatter, label axis/legend, show.

    Parameters:
        trace_data_window_dict (dict): trace data
        trace_time_vector_dict (dict): trace time data
        trimmed_trace: 1D trace data (to be plotted)
        trimmed_time_vector: 1D trace time data (to be plotted)
    """
    color_cycle = ['red', 'orange', 'cyan', 'green', 'blue', 'violet']
    fig, ax = plt.subplots(nrows=1)
    i_color = 0
    ax.plot(trimmed_time_vector, trimmed_trace, color='black',linewidth=2, label='trace data', alpha=0.1)
    i_color = 0
    for window_label in trace_data_window_dict.keys():
        print(window_label)
        ax.plot(trace_time_vector_dict[window_label], trace_data_window_dict[window_label],
              color=color_cycle[i_color], linewidth=1, label=window_label)
        i_color+=1
    ax.legend()
    plt.show()
    return


def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
