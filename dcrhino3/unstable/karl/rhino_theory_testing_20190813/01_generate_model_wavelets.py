#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Aug 13 12:37:01 2019

@author: kkappler

velocity SHEAR: 100m/s to 5000m/s in 100 m/s increments
DEnsity from 1000kg/m^3 to 4000kg/m^3 in 100kg/m^3 increments
50 x 30 = 1200 traces

Idea: chunk the traces into groups of 30
"""
import matplotlib
matplotlib.use('TkAgg')

import numpy as np
import pdb
import scipy.signal as ssig

from matplotlib import pyplot as plt

from model_config import ADD_NOISE, pipe, rock, NYQUIST, BANDPASS_FILTER, noise_factors
from model_config import start, end #change to start_index, end_index
from model_config import rho, velocity#change to start_index, end_index
from supporting_functions_tmp import trace_filename
from theory.core import TheoreticalWavelet

plt.ion()

dt = 1./(2*NYQUIST)
#<config>
#P-Wave Modulus = rho * velocity**2

COMPONENT = 'axial'

theoretical = TheoreticalWavelet(pipe, rock, component=COMPONENT,
                                 nyquist=NYQUIST, filterby=BANDPASS_FILTER, filter_duration=0.02)
data = getattr(theoretical, 'primary_in_time_domain')(window=None, filtered=False, skip_derivative=True)
data /= np.max(data)

data_1s = data[start:end]
#noise_factors = [0.0, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1.0]
if ADD_NOISE:
    #pdb.set_trace()
    noise = np.random.normal(size=(len(data_1s)))
    for i_noise in np.arange(len(noise_factors)):
        noise_factor = noise_factors[i_noise]
        #noise *= noise_factor#0.1
        data = data_1s + (noise *noise_factor)#0.1
        outdata_name = trace_filename(rho, velocity, COMPONENT, noise_factor)
        np.save(outdata_name, data)
        ttl_string = 'noise factor {}'.format(noise_factor)
        plt.figure(1);plt.clf()
        plt.plot(data, label='noisy data')
        plt.plot(data_1s, label='data')
        plt.title(ttl_string)
        plt.legend()
        plt.savefig('model_{}.png'.format(i_noise))
        plt.show(block=True)

pdb.set_trace()

outdata_name = trace_filename(rho, velocity, COMPONENT, ADD_NOISE)
np.save(outdata_name, data_1s)

filtered_data = ssig.filtfilt(theoretical.fir_taps, 1, data) 
filtered_1s = filtered_data[start:end]
outdata_name = trace_filename(rho, velocity, COMPONENT, ADD_NOISE, filtered=True)
np.save(outdata_name, filtered_1s)


#pdb.set_trace()
#COMPONENT = 'tangential'
#velocity=2500.0
#modulus = rho * velocity**2
#theoretical = TheoreticalWavelet(pipe, rock, component=COMPONENT,
#                                 nyquist=NYQUIST, filterby=BANDPASS_FILTER)
#data = getattr(theoretical, 'primary_in_time_domain')(window=None, filtered=False, skip_derivative=True)
#data_1s = data[start:end]
#outdata_name = 'rho{}_vel{}_{}.npy'.format(int(rho), int(velocity), COMPONENT)
#np.save(outdata_name, data_1s)


t = np.arange(len(data))
t = t.astype(np.float64)
t *= dt
t -= 1.0
#t_mini = t[9000:11001]
t_mini = t[9500:10501]
#ww_1s = ww[5000:15000]
t_1s = t[start:end]
np.save('t.npy', t_1s)
print('success!')






