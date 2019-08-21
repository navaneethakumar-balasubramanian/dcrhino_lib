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

from supporting_functions_tmp import output_h5_name, trace_filename
from model_config import rho, velocity, ADD_NOISE, NYQUIST, sacrificial_h5_file
from model_config import noise_factors

MULTINOISE = True
dt = 1./(2*NYQUIST)
autocorrelation_duration = 0.4
samples_per_trace = int(autocorrelation_duration / dt)
#tt = np.load('t.npy')
#dt = tt[1] - tt[0]
i_noise = 7

#sample_acorr_h5 = '/home/kkappler/.cache/datacloud/bhp/eastern_ridge/holes_acorr/544_59_619_619_6172_6172.h5'
#sacrificial_file = '544_59_619_619_6172_6172.h5'
sample_acorr_h5 = os.path.join(eastern_ridge_acorr_folder, sacrificial_h5_file)
td = TraceData()
td.load_from_h5(sample_acorr_h5)

component = 'axial'
#trace_input_file = trace_filename(rho, velocity, component, ADD_NOISE)
trace_input_file = trace_filename(rho, velocity, component, noise_factors[i_noise])
print("INPUT FILE = {}".format(trace_input_file))

data_1s = np.load(trace_input_file)
plt.plot(data_1s);plt.show(block=True)
acorr_data = autocorrelate_trace(data_1s, samples_per_trace)

splitted_trace = SplittedTrace(td.dataframe, None)
n_traces = len(td.dataframe)
tmp = np.repeat(acorr_data, n_traces)
tmp = tmp.reshape( samples_per_trace, n_traces)
tmp = tmp.T
if MULTINOISE:
    for i_noise in range(len(noise_factors)):
        trace_input_file = trace_filename(rho, velocity, component, noise_factors[i_noise])
        print("INPUT FILE = {}".format(trace_input_file))
        data_1s = np.load(trace_input_file)
        plt.plot(data_1s);plt.show(block=True)
        acorr_data = autocorrelate_trace(data_1s, samples_per_trace)
        tmp[i_noise,:] = acorr_data
#pdb.set_trace()
splitted_trace.assign_component_from_array(component, tmp)
td.dataframe = splitted_trace.dataframe
output_filehandle = output_h5_name()
out_h5_path = os.path.join(eastern_ridge_acorr_folder, output_filehandle)
td.save_to_h5(out_h5_path)

print('success!')