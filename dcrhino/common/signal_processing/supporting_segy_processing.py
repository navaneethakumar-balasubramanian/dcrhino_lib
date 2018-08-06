# -*- coding: utf-8 -*-
"""
Created on Thu Jun 28 17:07:00 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from obspy.io.segy.segy import iread_segy

from dcrhino.analysis.util.general_helper_functions import init_logging
from dcrhino.analysis.supporting_datetime import get_date_from_year_dyr

logger = init_logging(__name__)

#def sampling_rate_segy_trace(tr):
#    """
#    TODO: check is this is fclose() the file afterwards
#    usage: sampling_rate = get_segy_sampling_rate_trace(trace)
#    """
#    try:
#        sampling_rate = tr.stats.segy.trace_header.piezo_sampling_rate
#        sampling_rate = float(sampling_rate)
#    except AttributeError:
#        logger.info("Its time to deprecate the check for piezo sampling rate")
#        sampling_rate = tr.stats.segy.trace_header.sensor_sampling_rate
#        sampling_rate = float(sampling_rate)
#    return sampling_rate

def sampling_rate_segy_trace(tr):
    """
    TODO: check is this is fclose() the file afterwards
    usage: sampling_rate = get_segy_sampling_rate_trace(trace)
    """
    sampling_rate = tr.stats.segy.trace_header.sensor_sampling_rate
    sampling_rate = float(sampling_rate)
    #    try:
    #        sampling_rate = tr.stats.segy.trace_header.piezo_sampling_rate
    #        sampling_rate = float(sampling_rate)
    #    except AttributeError:
    #        logger.info("Its time to deprecate the check for piezo sampling rate")
    #        sampling_rate = tr.stats.segy.trace_header.sensor_sampling_rate
    #        sampling_rate = float(sampling_rate)
    return sampling_rate

def get_segy_sampling_rate(segy_filename):
    """
    TODO: check is this is fclose() the file afterwards
    usage: sampling_rate = get_segy_sampling_rate(full_segy_file)
    """
    for tr in iread_segy(segy_filename):
        sampling_rate = sampling_rate_segy_trace(tr)
        return sampling_rate


def trace_start_datetime(trace):
    """
    """
    yyyy = trace.stats.segy.trace_header.year_data_recorded
    dyr = trace.stats.segy.trace_header.day_of_year
    dayte = get_date_from_year_dyr(yyyy, dyr)
    #pdb.set_trace()
    hh = trace.stats.segy.trace_header.hour_of_day
    mm = trace.stats.segy.trace_header.minute_of_hour
    ss = trace.stats.segy.trace_header.second_of_minute
    data_datetime = datetime.datetime(yyyy, dayte.month, dayte.day, hh, mm, ss)
    return data_datetime


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
