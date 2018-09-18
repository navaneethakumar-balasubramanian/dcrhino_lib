#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Sep 11 14:34:31 2018

@author: sjha
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import pandas as pd

#%matlplotlib qt

from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots import qc_plot
from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots import QCBlastholePlotInputs
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.signal_processing.trace_header import define_obspy_trace_header

azure_path = '/home/sjha/data/datacloud/west_angelas/test_get_data_azure/corr_npy_dump'
mwd_path = '/home/sjha/data/datacloud/west_angelas/level_1'
mwd_file = 'mwd.csv'
mwd_fullfile = os.path.join(mwd_path,mwd_file)



mwd_measurand = MEASURAND_REGISTRY.measurand('mwd_with_mse')
hole_profile_df = mwd_measurand.load()

master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
master_iterator_df = master_iterator_measurand.load()

total_number_of_rows = len(hole_profile_df)

#for i in range(total_number_of_rows):
    
#for i_row in range(total_number_of_rows):
#if hole_profile_df.time_start(i_row)==hole_profile_df.time_end(i_row):
    
#    current_row = master_iterator_df.iloc[i_row]
#    hole = current_row.hole
#    digitizer_id = current_row.digitizer_id
#    sub_df = master_iterator_df[master_iterator_df['hole']==hole]
#    sub_df = sub_df[sub_df['digitizer_id']==digitizer_id]


sub_mwd_df = hole_profile_df[hole_profile_df['hole']==70]
pdb.set_trace()

#ttt=np.unique(sub_mwd_df.ENDX)

sub_mwd_df_rop = sub_mwd_df['ROP(m/hr)']
qq = sub_mwd_df[sub_mwd_df['time_start'] != sub_mwd_df['time_end']]
dtime=((qq.time_end - qq.time_start).dt.seconds)/3600.0
dz = (qq.end_depth - qq.start_depth)
#dtime=((sub_mwd_df.time_end - sub_mwd_df.time_start).dt.seconds)/3600
#dz = (sub_mwd_df.end_depth - sub_mwd_df.start_depth)
dzdt = dz/dtime

pdb.set_trace()

#plt.plot(sub_mwd_df.time_start,sub_mwd_df_rop,'*');
plt.plot(qq.time_start,dzdt);
plt.savefig('ROP_dzdt.png')
    