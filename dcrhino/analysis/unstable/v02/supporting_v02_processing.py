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


#from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS# = ['axial', 'tangential', 'radial']

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
l1_measurand = MEASURAND_REGISTRY.measurand('level1_npy_piezo')

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
    row here is a row of the slamstix_metadata_table.
    This is a hack to support old segy files
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



def get_hole_data(hole_row, component, plot=False):
    """
    """
    #<associate hole row with unique ssx file (or database table)>
    tmp_df = ssx_df[ssx_df['time_start']<=hole_row.time_start]
    tmp_df = tmp_df[tmp_df['time_end']>=hole_row.time_end]
    ssx_sub_df = tmp_df[tmp_df['digitizer_id']==hole_row.digitizer_id]
    if len(ssx_sub_df)!=1:
        logger.error("non unique paretn file")
        raise(Exception)
    else:
        ssx_row = ssx_sub_df.iloc[0]
    #</associate hole row with unique ssx file (or database table)>

    print('get start and endtime for hole')
    data_time_interval = TimeInterval(lower_bound=hole_row.time_start, upper_bound=hole_row.time_end)
    parent_file_time_interval = TimeInterval(lower_bound=ssx_row.time_start, upper_bound=ssx_row.time_end)
    print('make measurand data key')
    #nead the neighborhood time interval ... points at the parent file
    #pdb.set_trace()
    data_key = DAQSerialNumberSamplingRateComponentTimeIntervalDataKey(hole_row.digitizer_id,
                                                                           hole_row.sampling_rate,
                                                                           component,
                                                                           parent_file_time_interval)

    data = l1_measurand.load_segment(data_key, data_time_interval)
    if plot:
        plt.plot(data);plt.show()
    return data


if __name__ == "__main__":
    main()
