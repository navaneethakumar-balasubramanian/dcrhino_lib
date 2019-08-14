#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Aug 13 16:33:33 2019

@author: kkappler

lets load an acorr h5 and see how ugly this badboy gets ...
most recent h5 Ihave is from eastern_risge
"""
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from dcrhino3.models.traces.splitted_trace import SplittedTrace
from dcrhino3.models.trace_dataframe import TraceData

from dcrhino3.process_flow.modules.trace_processing.autocorrelate import autocorrelate_trace
from dcrhino3.unstable.karl_dev_util import eastern_ridge_acorr_folder

autocorrelation_duration = 0.4
tt = np.load('t.npy')
dt = tt[1] - tt[0]

#sample_acorr_h5 = '/home/kkappler/.cache/datacloud/bhp/eastern_ridge/holes_acorr/544_59_619_619_6172_6172.h5'
sample_acorr_h5 = os.path.join(eastern_ridge_acorr_folder, '544_59_619_619_6172_6172.h5')
td = TraceData()
td.load_from_h5(sample_acorr_h5)

samples_per_trace = int(autocorrelation_duration / dt)
axial_1s = np.load('rho2670_vel4000_axial.npy')
acorr_data = autocorrelate_trace(axial_1s, samples_per_trace)

splitted_trace = SplittedTrace(td.dataframe, None)
n_traces = len(td.dataframe)
tmp = np.repeat(acorr_data, n_traces)
tmp = tmp.reshape( samples_per_trace, n_traces)
tmp = tmp.T
splitted_trace.assign_component_from_array('axial', tmp)
td.dataframe = splitted_trace.dataframe
out_h5_path = os.path.join(eastern_ridge_acorr_folder, 'test.h5')
td.save_to_h5(out_h5_path)

pdb.set_trace()
tangential_1s = np.load('rho2670_vel2500_tangential.npy')
