#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Aug 14 11:33:45 2019

@author: kkappler
"""
import matplotlib; matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import scipy.signal as ssig

from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.unstable.karl_dev_util import eastern_ridge_processed_folder
from model_config import noise_factors

filtered_model_data = np.load('filtered_rho2670_vel4000_axial.npy')

hole_obs_id = '544_59_619_619_6172_6172'
process_flow_id = '20190814-115718_model_v1'
#process_flow_id = '20190815-132023_model_v1' #10%
process_flow_id = '20190816-114423_model_v1' #0%
process_flow_id = '20190816-115530_model_v1'#500858
process_flow_id = '20190816-120850_model_v1'#0.01
process_flow_id = '20190816-121152_model_v1'#i=7: big noise
process_flow_id = '20190816-132023_model_v1'
#processed_h5 = os.path.join(eastern_ridge_processed_folder, hole_obs_id, process_flow_id, 'processed.h5')

processed_h5 = os.path.join(eastern_ridge_processed_folder, hole_obs_id, 
                            process_flow_id, '5_band_pass_filter_hybrid_0.h5')

n_upsample = False
n_upsample = 1000000
td = TraceData()
td.load_from_h5(processed_h5)
filtered_data = filtered_model_data[2001:3002]/np.max(filtered_model_data)

pipeline_data = td.dataframe.axial_trace.iloc[0]
pipeline_data /= np.max(pipeline_data)
if n_upsample is not False:
    filtered_data = ssig.resample(filtered_data, n_upsample )
    pipeline_data = ssig.resample(pipeline_data, n_upsample )
#    
#plt.plot(filtered_data, label='filtered model');
#plt.plot(pipeline_data, label='pipeline model');
#
#plt.legend()
#plt.title('Normalized Curves')
#plt.show(block=True)


qq = {}
for i_noise in range(7):
    qq[i_noise] = td.dataframe.axial_trace.iloc[i_noise]
    qq[i_noise] /= np.max(qq[i_noise])
    qq[i_noise] = ssig.resample(qq[i_noise], n_upsample )
    plt.plot(qq[i_noise], label='noise factor {}'.format(noise_factors[i_noise]))
    plt.xlabel('t (microsecond)')
    plt.title('normalized traces')
plt.legend()
plt.show(block=True)
print('success!')
#500858