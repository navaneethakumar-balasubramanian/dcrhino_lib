# -*- coding: utf-8 -*-
"""
Created on Mon Apr  8 13:44:28 2019

@author: kkappler


"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
import numpy as np
#import os
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace

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
        window_time, window_data =  self.prepare_search_window(window_lower_bound, window_upper_bound)
        #p2n_or_n2p = kwargs.get('zero_crossing_type', None)
        if pick_type == 'maximum':
            max_time_index = np.argmax(window_data)
            max_time = window_time[max_time_index]
            return max_time
        elif pick_type == 'minimum':
            window_data *= -1.0 #flip trough to a peak
            result_time_index = np.argmax(window_data)
            result_time = window_time[result_time_index]
            return result_time
        elif pick_type == 'zero_crossing':
#            if p2n_or_n2p is not None:
#                do special calc
#            else:
            zero_crossing_index = np.argmin(np.abs(window_data))
            zero_crossing_time = window_time[zero_crossing_index]
            return zero_crossing_time
        else:
            logger.error("pick type {} not supported".format(pick_type))
            #return None
            raise Exception


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
