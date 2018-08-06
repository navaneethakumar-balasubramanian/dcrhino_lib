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
from dcrhino.analysis.supporting_processing import get_segy_trace_by_index
from dcrhino.collection.IDEtoSEGY.trace_header import define_obspy_trace_header


define_obspy_trace_header()
home = os.path.expanduser("~/")
base_path = '/home/kkappler/software/datacloud/dcrhino_data_processing/data/mont_wright/level_2/2018-05-29'
panic_decon_filename = os.path.join(base_path, 'piezo', 'decon_100ms_20180529_SSX51008_Ch08.sgy')
panic_corr_filename = os.path.join(base_path, 'piezo', 'corr_decon_100ms_20180529_SSX51008_Ch08.sgy')
measurand_decon_filename = os.path.join(base_path, 'deconvolved_sgy_100ms_level1_sgy_piezo_20180529_SSX51008_Ch08.sgy')
#measurand_corr_filename = os.path.join(base_path, 'correlated_minlag-0.1-maxlag0.1_firls_80-100-300-350_N65_deconvolved_sgy_100ms_level1_sgy_piezo_SSX50598.sgy')
measurand_corr_filename = os.path.join(base_path, 'correlated_minlag-0.1-maxlag0.1_firls_80-100-300-350_N65_deconvolved_sgy_100ms_level1_sgy_piezo_20180529_SSX51008_Ch08.sgy')
print(os.path.isfile(panic_decon_filename))
print(os.path.isfile(panic_corr_filename))
pdb.set_trace()

panic_file = panic_decon_filename
measu_file = measurand_decon_filename

panic_file = panic_corr_filename
measu_file = measurand_corr_filename
dummy_hole_ids = np.zeros(1000000, dtype=int)
trace_index_to_check = 42

tr = get_segy_trace_by_index(panic_file, trace_index_to_check)
tr2 = get_segy_trace_by_index(measu_file, trace_index_to_check)
#dummy_hole_ids[i] = tr.stats.segy.trace_header.dummy_hole_id
plt.figure(31);
plt.subplot(3,1,1)
plt.plot(tr.data, label='panic')
plt.subplot(3, 1, 2);
plt.plot(tr2.data, label='measurand')
plt.subplot(3, 1, 3);
plt.plot(tr.data - tr2.data, label='diff')
plt.legend()
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
