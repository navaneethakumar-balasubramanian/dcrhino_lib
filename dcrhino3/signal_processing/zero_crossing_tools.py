# -*- coding: utf-8 -*-
"""
Created on Tue Apr 16 12:06:31 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
logger = init_logging(__name__)

SAMPLES_TO_POLY_ORDER = {};
SAMPLES_TO_POLY_ORDER[2]=1; SAMPLES_TO_POLY_ORDER[3]=2;SAMPLES_TO_POLY_ORDER[4]=3;
SAMPLES_TO_POLY_ORDER[5]=3;SAMPLES_TO_POLY_ORDER[6]=3;SAMPLES_TO_POLY_ORDER[7]=4;
SAMPLES_TO_POLY_ORDER[8]=4;SAMPLES_TO_POLY_ORDER[9]=4;SAMPLES_TO_POLY_ORDER[10]=4;
SAMPLES_TO_POLY_ORDER[11]=4; SAMPLES_TO_POLY_ORDER[12]=4; SAMPLES_TO_POLY_ORDER[13]=5;

def get_polynomial_order(num_samples):
    if num_samples > 13:
        num_samples = 6
    else:
        num_samples = SAMPLES_TO_POLY_ORDER[num_samples]
    return num_samples

def get_zx_type(poly, dt, t_zx):
    """
    """
    cond1 = poly(t_zx - dt) > 0
    cond2 = poly(t_zx + dt) < 0
    if cond1 & cond2:
        return 'zero_crossing_negative_slope'
    elif not cond1 and not cond2:
        return 'zero_crossing_positive_slope'
    else:
        return 'odd_duck'


def get_zx_result_time(zero_cross_times, window_time, window_data, pick_type):
    """
    logical and exception handling, this isn't really doing any calcuations, it's checking the validity of the
    calculations and the appropriateness of the methods applied to the data

    .. todo:: make this support boolean column in dataframe

    :param zero_cross_times:
    :param window_time:
    :param window_data:
    :return:
    """
    if len(zero_cross_times) == 1:
        return zero_cross_times[0]
    elif len(zero_cross_times) == 0:
        logger.warning("could not find zero crossing {} \n Add a boolean feature for this case ".format(pick_type))
        zero_crossing_index = np.argmin(np.abs(window_data))
        zero_crossing_time = window_time[zero_crossing_index]
        return zero_crossing_time
    elif len(zero_cross_times) > 1:
        logger.warning("multiple {} zero crossings - unexpected".format(pick_type))
        zero_crossing_index = np.argmin(np.abs(window_data))
        zero_crossing_time = window_time[zero_crossing_index]
        return zero_crossing_time

def reduce_zero_crossing_list_to_type(zx_type, zero_crossing_times, zero_crossing_types):
    zero_cross_bools = [bool(x == zx_type) for x in zero_crossing_types]
    zero_cross_bools = np.asarray(zero_cross_bools)
    zero_cross_indices = np.where(zero_cross_bools)[0]
    zero_cross_times = np.asarray(zero_crossing_times)
    zero_cross_times = zero_cross_times[zero_cross_indices]
    return zero_cross_times

def zero_crossing_handler_v01(time_vector, data, polynomial_order=None):
    """
    finds zero crossings using polyfit.  Then restricts to real-valued and within the
    time interval specified by time_vector.  These are then further classified as
    upgoing or downgoing zero crossings.

    Output is an array and a list, maybe better to make a df, or zip them, or make a list of tuples?
    """
    if polynomial_order is None:
        polynomial_order = get_polynomial_order(len(data))

    z = np.polyfit(time_vector, data, polynomial_order)

    poly = np.poly1d(z)
    zero_crossing_times = poly.roots
    zero_crossing_times = zero_crossing_times[np.isreal(zero_crossing_times)]
    zero_crossing_times = [np.real(x) for x in zero_crossing_times]
    zero_crossing_times = [x for x in zero_crossing_times if x <= time_vector[-1]]
    zero_crossing_times = [x for x in zero_crossing_times if x >= time_vector[0]]

    dt = time_vector[1] - time_vector[0]
    zero_crossing_types = [get_zx_type(poly, dt, x) for x in zero_crossing_times]
    return zero_crossing_times, zero_crossing_types


def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
