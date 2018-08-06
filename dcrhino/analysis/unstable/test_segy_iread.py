# -*- coding: utf-8 -*-
"""
Created on Mon Jun 18 13:18:30 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from obspy.io.segy.segy import iread_segy

from dcrhino.common.signal_processing.supporting_segy_processing import get_segy_sampling_rate
from dcrhino.collection.IDEtoSEGY.trace_header import define_obspy_trace_header

define_obspy_trace_header()
home = os.path.expanduser("~/")
segy_path = os.path.join(home, 'data/datacloud/mont_wright/level_1/2018-05-30/piezo')
segy_basename = '20180530_SSX50339_Ch08.sgy'
segy_path = os.path.join(home, 'data/datacloud/west_angelas/level_1/2018-07-06/piezo/3200hz/')
segy_basename = '20180706_SSX13402_5451_Ch08.sgy'
segy_path = os.path.join(home, 'data/datacloud/west_angelas/level_1/2018-07-07/piezo/2400hz/')
#segy_basename = '20180707_SSX01821_5451_Ch08.sgy'
#segy_basename = '20180707_SSX01895_5452_Ch08.sgy'
segy_basename = '20180707_SSX15883_5206_Ch08.sgy'
#segy_basename = '20180707_SSX16163_5208_Ch08.sgy'
#segy_basename = '20180707_SSX50401_5209_Ch08.sgy'

full_segy_file = os.path.join(segy_path, segy_basename)
sampling_rate = get_segy_sampling_rate(full_segy_file)
print(sampling_rate)

ff_new = '/home/kkappler/data/datacloud/west_angelas/level_2/2018-07-07/piezo/2400hz/deconvolved_sgy_100ms_level1_sgy_piezo_20180707_SSX01821_5451_Ch08.sgy'
ff_old = '/home/kkappler/data/datacloud/west_angelas/level_2/2018-07-07/piezo/2400hz/hide/deconvolved_sgy_100ms_level1_sgy_piezo_20180707_SSX01821_5451_Ch08.sgy'
full_segy_file = '/home/kkappler/software/datacloud/dcrhino_data_processing/data/west_angelas/level_2/2018-07-06/piezo/3200hz/correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_20ms_deconvolved_sgy_100ms_level1_sgy_piezo_20180706_SSX13402_5451_Ch08.sgy'
full_segy_file = '/home/kkappler/software/datacloud/dcrhino_data_processing/data/west_angelas/level_2/2018-07-09/piezo/3200hz/correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_20ms_deconvolved_sgy_100ms_level1_sgy_piezo_20180709_SSX34512_5451_Ch08.sgy'
dummy_hole_ids = np.zeros(1000000, dtype=int)
for i,tr in enumerate(iread_segy(full_segy_file)):
    dummy_hole_ids[i] = tr.stats.segy.trace_header.dummy_hole_id
    print(i)
##    if i % 100  == 0:
##        print(i)
###    print(tr.stats.segy.trace_header.dummy_hole_id)
###    # Each Trace's stats attribute will have references to the file
###    # headers and some more information.
###    print(i)
    pdb.set_trace()
    tf = tr.stats.segy.textual_file_header
##    bf = tr.stats.segy.binary_file_header
##    tfe = tr.stats.segy.textual_file_header_encoding
##    de = tr.stats.segy.data_encoding
##    e = tr.stats.segy.endian
##    # Also do something meaningful with each Trace.
###    print(int(tr.data.sum()))
dummy_hole_ids = dummy_hole_ids[0:i+1]
print(len(dummy_hole_ids), i)
pdb.set_trace()
print("now what?")
#home = os.path.expanduser("~/")


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
