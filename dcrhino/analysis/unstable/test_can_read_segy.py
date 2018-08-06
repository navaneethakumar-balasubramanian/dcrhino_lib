# -*- coding: utf-8 -*-
"""
Created on Fri Jun 15 13:21:03 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import glob
import pdb

home = os.path.expanduser("~/")

from obspy.io.segy.core import _read_segy
from dcrhino.collection.IDEtoSEGY.trace_header import define_obspy_trace_header
define_obspy_trace_header()
#from dcrhino.analysis.trace_header import define_obspy_trace_header
#from dcrhino.analysis import trace_header#milligan

from dcrhino.analysis.data_manager.temp_paths import get_data_level_paths_dict
import dcrhino.analysis.measurands.measurand_registry_mont_wright as MEASURAND_REGISTRY

#measurand_id = 'correlated_bandpassed_deconvolved_sgy_level1_sgy_piezo'
measurand_id = 'level1_sgy_piezo'
level1_segy_measurand = MEASURAND_REGISTRY.measurand(measurand_id)

data_date = datetime.date(2018, 5, 30)
pdb.set_trace()
full_file = level1_segy_measurand.expected_filename(data_date, 'SSX50598')
#full_file = '/home/kkappler/data/datacloud/20180525_test_sgy/Test3_Ch08.segy'

#specifier key is data_date, 'SSX50598;
#TIME INTERVAL NOT REQUIRED
#full_file = level1_segy_measurand.expected_filename(data_date, 'minitest')
st = _read_segy(full_file)

xx = st.traces[0].stats.segy.trace_header
pdb.set_trace()
print(xx.ds_total_length)
pdb.set_trace()



st = level1_segy_measurand.load(data_date, 'minitest')


temp_paths = get_data_level_paths_dict('mont_wright')
filelist = glob.glob(temp_paths[1]+'/*')
for filename in filelist:
    print(os.path.basename(filename))
pdb.set_trace()
print(l_0files)
define_obspy_trace_header()

full_filename = os.path.join(home)

def test_segy_can_read_using_trace_headers():
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
