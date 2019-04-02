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
from dcrhino3.models.interval import TimePeriod
from dcrhino3.physics.util import get_resonance_period

logger = init_logging(__name__)

TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION = ['primary', 'multiple_1', 'multiple_2',
                                        'multiple_3', 'noise_1', 'noise_2']


class SearchWindow(TimePeriod):
    """
    this is intended to be used for "time-picks",
    Can be modified to support search in frequency domain, but maybe better
    to create a FrequencyInterval class
    .. :note if this gets cumbersome because of the underlying TimePeriod class
    we can just add lower_bound, and upper_bound attrs directly to this class

    """
    def __init__(self, **kwargs):
        """
        ivars: window_label  should be one of ['primary', 'multiple_1', 'multiple_2', 'multiple_3',]
        ivars: search feature  should be one of ['maxima', 'minima', 'zero_crossing']

        Normal mode of operation will be (primary, maximum), (multiple_1, zero_crossing),
        (multiple_2, minimum), (multiple_3, zero_crossing),
        """
        TimePeriod.__init__(self,**kwargs);
        self.window_label = kwargs.get('window_label', None)
        self.search_feature = kwargs.get('search_feature', None)




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


class AmplitudeWindows(object):
    """
    20190401: baked in default values ... will move to json ASAP
    """
    def __init__(self):
        self.half_widths = {}
        self.half_widths['primary'] = 0.00105
        self.half_widths['multiple_1'] = 0.00105
        self.half_widths['multiple_2'] = 0.00105



class ManualTimeWindows(object):
    """
    prototype, to make so changes propagate through J2, and eventually into
    plotter and json

    .. todo: KEY here is make this manual windows have the same structure as the
    old WindowBoundaries() class.  It is less important which format we follow, can
    change old class to use this, or make this match the old ...
    """
    def __init__(self):
        self.time_window = {}
        self.time_window['primary'] = SearchWindow(lower_bound=-0.00082,
                                                upper_bound=0.00118,
                                                window_label='primary',
                                                search_feature='maximum')
        self.time_window['multiple_1'] = SearchWindow(lower_bound=0.00989,
                                                    upper_bound=0.0119,
                                                    window_label='multiple_1',
                                                search_feature='zero_crossing')
        self.time_window['multiple_2'] = SearchWindow(lower_bound=0.020249,
                                                    upper_bound=0.02425,
                                                    window_label='multiple_2',
                                                search_feature='minimum')
        self.time_window['multiple_3'] = SearchWindow(lower_bound=0.030249,
                                                    upper_bound=0.03425,
                                                    window_label='multiple_3',
                                                search_feature='zero_crossing')

    def get_time_window(self, window_label):
        """
        yes, this sucks and should be done with a dict BUT it is flexible
        for half-baked test changes ... so live with it for now
        """
        t_start = self.time_window[window_label].lower_bound
        t_final = self.time_window[window_label].upper_bound
        return t_start, t_final

    def populate_from_transformed_args(self, manual_time_windows):
        """
        method to assign window start and end from json, also could be from gui
        or otherwhere
        """
        wavelet_id = 'primary'
        tmp = getattr(manual_time_windows, wavelet_id)
        self.time_window[wavelet_id] = SearchWindow(lower_bound=tmp[0],
                                                upper_bound=tmp[1],
                                                window_label=wavelet_id,
                                                search_feature='maximum')
        wavelet_id = 'multiple_1'
        tmp = getattr(manual_time_windows,wavelet_id)
        self.time_window[wavelet_id] = SearchWindow(lower_bound=tmp[0],
                                                    upper_bound=tmp[1],
                                                    window_label=wavelet_id,
                                                search_feature='zero_crossing')
        wavelet_id = 'multiple_2'
        tmp = getattr(manual_time_windows,wavelet_id)
        self.time_window[wavelet_id] = SearchWindow(lower_bound=tmp[0],
                                                    upper_bound=tmp[1],
                                                    window_label=wavelet_id,
                                                search_feature='minimum')
        wavelet_id = 'multiple_3'
        tmp = getattr(manual_time_windows,wavelet_id)
        self.time_window[wavelet_id] = SearchWindow(lower_bound=tmp[0],
                                                    upper_bound=tmp[1],
                                                    window_label=wavelet_id,
                                                search_feature='zero_crossing')


    def populate_from_old_window_boundaries(self, window_boundaries):
        tmp = window_boundaries.window_boundaries_time
        self.time_window = {}
        self.time_window['primary'] = SearchWindow(lower_bound=tmp['primary'][0],
                                                upper_bound=tmp['primary'][1],
                                                window_label='primary',
                                                search_feature='maximum')
        self.time_window['multiple_1'] = SearchWindow(lower_bound=tmp['multiple_1'][0],
                                                    upper_bound=tmp['multiple_1'][1],
                                                    window_label='multiple_1',
                                                search_feature='zero_crossing')
        self.time_window['multiple_2'] = SearchWindow(lower_bound=tmp['multiple_2'][0],
                                                    upper_bound=tmp['multiple_2'][1],
                                                    window_label=tmp['multiple_2'][0],
                                                search_feature='minimum')
        self.time_window['multiple_3'] = SearchWindow(lower_bound=tmp['multiple_3'][0],
                                                    upper_bound=tmp['multiple_3'][0],
                                                    window_label='multiple_3',
                                                search_feature='zero_crossing')



    def get_search_feature(self, window_label):
        pass

    def set_search_feature(self, window_label):
        pass


def get_default_time_windows(transformed_args):
    """
    prototype, to make so changes propagate through J2, and eventually into
    plotter and json.  Rather than start fresh here (whihc I would like to)
    will use the WindowBoundaries class so that these default windows are those used
    by J1, K0 ... this can be changed later.

    .. todo: KEY here is make this manual windows have the same structure as the
    old WindowBoundaries() class.  It is less important which format we follow, can
    change old class to use this, or make this match the old ...


    """
    component_id = transformed_args.component
    sensor_distance_to_bit = transformed_args.sensor_distance_to_source
    distance_sensor_to_shock_sub_bottom = transformed_args.sensor_distance_to_shocksub
    if component_id=='axial':
        velocity_steel = transformed_args.ACOUSTIC_VELOCITY
    elif component_id=='tangential':
        velocity_steel = transformed_args.SHEAR_VELOCITY
    expected_resonance_period = get_resonance_period(component_id, sensor_distance_to_bit,
                                            distance_sensor_to_shock_sub_bottom,
                                            velocity_steel)
    #pdb.set_trace()
    primary_shift = -1.0*getattr(getattr(transformed_args.window_widths, component_id), 'primary')/2.0
    window_widths = transformed_args.window_widths
    #window_widths = window_widths.__dict__
    wb = WindowBoundaries()
    wb.assign_window_boundaries(component_id, window_widths, expected_resonance_period,
                                primary_shift=primary_shift)

    default_time_windows = ManualTimeWindows()
    default_time_windows.populate_from_old_window_boundaries(wb)
    return default_time_windows


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
