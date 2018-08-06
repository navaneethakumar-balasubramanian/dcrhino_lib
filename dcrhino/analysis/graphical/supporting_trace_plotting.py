# -*- coding: utf-8 -*-
"""
Created on Thu Jul 19 15:18:49 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from dcrhino.analysis.supporting_processing import ACOUSTIC_VELOCITY
from dcrhino.common.signal_processing.supporting_segy_processing import sampling_rate_segy_trace


def trace_plotter(trace, **kwargs):
    """
    """
    #search_forward_ms = kwargs.get('search_forward_ms', None)
    #search_backward_ms = kwargs.get('search_backward_ms', None)

    dt = 1./sampling_rate_segy_trace(trace)
    n_samples = len(trace.data)
    time_vector = dt * np.arange(-n_samples//2, n_samples//2)

    travel_distance = 2 * trace.stats.segy.trace_header.sensor_distance_to_source
    theoretical_two_way_travel_time = travel_distance / ACOUSTIC_VELOCITY

    fig, ax = plt.subplots()
    ax.plot(time_vector, trace.data, 'b*');
    ax.plot(theoretical_two_way_travel_time*np.asarray([1.,1.]),ax.get_ylim());
    #back_pad_time = theoretical_two_way_travel_time - n_samples_to_pad_search_backward*dt
    #ax.plot((back_pad_time)*np.asarray([1.,1.]),ax.get_ylim());
    #forward_pad_time = theoretical_two_way_travel_time + n_samples_to_pad_search_forward*dt
    #ax.plot((forward_pad_time)*np.asarray([1.,1.]),ax.get_ylim());
    ax.plot(np.asarray([time_vector[0],time_vector[-1]]),np.asarray([0,0]), color='black', linewidth=2);
    plt.show()


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
