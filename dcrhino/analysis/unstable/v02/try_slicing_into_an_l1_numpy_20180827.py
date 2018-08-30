# -*- coding: utf-8 -*-
"""
Created on Thu 23 Aug, 2018.  Dublin, Ireland on the number 747 bus to
Gardiner Street Lower
@author: kkappler

This is an example of another processing flow we could use to create partitioned
numpys in L1 that we can fseek into.

Start by searching for input data.  Today these are L1 SEG-Y files because I
can read them.  Tomorrow these could be L0 IDE piped through resampling, or
streaming data possibly ...

"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb


from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS# = ['axial', 'tangential', 'radial']

import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.measurands.keys.data_key import DigitizerSamplingRateDateDataKey
from dcrhino.analysis.measurands.keys.data_key import DAQSerialNumberSamplingRateComponentTimeIntervalDataKey
from dcrhino.analysis.signal_processing.trace_header import define_obspy_trace_header
from dcrhino.analysis.util.general_helper_functions import init_logging
from dcrhino.analysis.util.interval import TimeInterval

logger = init_logging(__name__)

define_obspy_trace_header()
MEASURAND_REGISTRY.print_measurand_registry()
ssx_measurand = MEASURAND_REGISTRY.measurand('slamstix_metadata')
ssx_df = ssx_measurand.load()

master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
df_master = master_iterator_measurand.load()

hole = 10
sub_df = df_master[df_master.hole==hole]
if len(sub_df)==1:
    row = sub_df.iloc[0]

    print('get start and endtime for hole')
    time_interval = TimeInterval(lower_bound=row.time_start, upper_bound=row.time_end)
    print('make measurand data key')

    pdb.set_trace()
    pass
else:
    print('non unique - further specify digitizer, sps, etc')
    pdb.set_trace()
pdb.set_trace()
#READ IN MAster iterator and find a blsthole that you have downloaded


def get_old_data_key(row):
    """
    """
    data_date_hack = datetime.datetime.strptime(row.dummy_digitizer_id[0:8], '%Y%m%d').date()
    sps = row.sampling_rate
    digitizer_id = row.dummy_digitizer_id
    data_key = DigitizerSamplingRateDateDataKey(digitizer_id, data_date_hack, sps)
    return data_key

def get_new_data_key(row, component):
    """
    digitizer_id,sampling_rate,
                 component, time_interval, **kwargs):
    """
    digitizer_id = int(row.dummy_digitizer_id.split('_')[-2])
    sampling_rate = row.sampling_rate

    #pdb.set_trace()
    time_interval = TimeInterval(lower_bound=row.time_start, upper_bound=row.time_end)
    data_key = DAQSerialNumberSamplingRateComponentTimeIntervalDataKey(digitizer_id,
                                                                       sampling_rate,
                                                                       component,
                                                                       time_interval)
    return data_key


def convert_l1segy_to_l1npy():
    """
    """
    level_1_measurand_id_a = 'level1_sgy_piezo'
    level_1_measurand_id_b = 'level1_npy_piezo'
    level_1_measurand_a = MEASURAND_REGISTRY.measurand(level_1_measurand_id_a)
    level_1_measurand_b = MEASURAND_REGISTRY.measurand(level_1_measurand_id_b)

    n_l1_sgy_files = len(ssx_df)
    for i_row in range(n_l1_sgy_files):
        #i_row=3
        row = ssx_df.iloc[i_row]
        old_l1_data_key = get_old_data_key(row)
        #pdb.set_trace()
        print('loading...')
#        xx = /home/kkappler/data/datacloud/west_angelas/level_1
        st = level_1_measurand_a.load(old_l1_data_key)
        #st=1
        for component_label in COMPONENT_LABELS:
            new_l1_data_key = get_new_data_key(row, component_label)
            #pdb.set_trace()
            level_1_measurand_b._make_from_parents(new_l1_data_key, parent_data=st)





def main():
    """
    """
#    process_from_ssx_csv_2_eda()
#    pdb.set_trace()
    convert_l1segy_to_l1npy()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
