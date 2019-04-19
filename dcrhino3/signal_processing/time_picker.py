# -*- coding: utf-8 -*-
"""
Created on Mon Apr  8 13:44:28 2019

@author: kkappler
.. todo:: add booleans to handle exceptions when zx are not expected, for example DNE, or too many,

"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
#import os
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace
from dcrhino3.signal_processing.zero_crossing_tools import zero_crossing_handler_v01
from dcrhino3.signal_processing.zero_crossing_tools import reduce_zero_crossing_list_to_type
from dcrhino3.signal_processing.zero_crossing_tools import get_zx_result_time

logger = init_logging(__name__)


class TimePicker(SymmetricTrace):
    def __init__(self, data, sampling_rate, **kwargs):
        SymmetricTrace.__init__(self,  data, sampling_rate, **kwargs)

    def say_hi(self):
        print("hello")

    def prepare_search_window(self, window_lower_bound, window_upper_bound):
        cond1 = self.time_vector >= window_lower_bound
        cond2 = self.time_vector <  window_upper_bound
        active_indices = np.where(cond1 & cond2)[0]
        window_time = self.time_vector[active_indices].copy()
        window_data = self.data[active_indices].copy()
        return window_time, window_data


    def extract_time_pick(self, window_lower_bound, window_upper_bound,
                          pick_type, **kwargs):
        """
        :param window_lower_bound:
        :param window_upper_bound:
        :param pick_type:
        :param kwargs:
        :return:
        """
        window_time, window_data =  self.prepare_search_window(window_lower_bound, window_upper_bound)

        if pick_type == 'maximum':
            max_time_index = np.argmax(window_data)
            result_time = window_time[max_time_index]
        elif pick_type == 'minimum':
            window_data *= -1.0 #flip trough to a peak
            result_time_index = np.argmax(window_data)
            result_time = window_time[result_time_index]
        elif pick_type == 'zero_crossing':
            zero_crossing_index = np.argmin(np.abs(window_data))
            result_time = window_time[zero_crossing_index]
        elif pick_type == 'zero_crossing_negative_slope':
            zero_cross_times, zero_crossing_types = zero_crossing_handler_v01(window_time, window_data)
            zero_cross_times = reduce_zero_crossing_list_to_type(pick_type, zero_cross_times, zero_crossing_types)
            result_time = get_zx_result_time(zero_cross_times, window_time, window_data, pick_type)
        elif pick_type == 'zero_crossing_positive_slope':
            zero_cross_times, zero_crossing_types = zero_crossing_handler_v01(window_time, window_data)
            zero_cross_times = reduce_zero_crossing_list_to_type(pick_type, zero_cross_times, zero_crossing_types)
            result_time = get_zx_result_time(zero_cross_times, window_time, window_data, pick_type)
        else:
            logger.error("pick type {} not supported".format(pick_type))
            #return None
            raise Exception
        return result_time


def my_function():
    """
    """
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
