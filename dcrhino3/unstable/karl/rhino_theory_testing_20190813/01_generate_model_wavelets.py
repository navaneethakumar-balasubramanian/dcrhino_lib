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

#from itertools import product
from matplotlib import pyplot as plt
#from matplotlib.cm import get_cmap
#from scipy import signal

from theory.core import TheoreticalWavelet, Pipe, Rock

#from supporting_functions_tmp import feature_extractor
#from supporting_functions_tmp import AXIAL_FEATURE_EXTRACTOR, TANGENTIAL_FEATURE_EXTRACTOR


#<config>
WINDOW = 310 # window in time domain by number of samples
ALPHA_OR_BETA_RANGE = np.arange(100, 1500 + 25, 25) #[m] / [s]
ALPHA_OR_BETA_RANGE = ALPHA_OR_BETA_RANGE.astype(np.float64)
# RHO_RANGE = np.arange(1500, 3000 + 500, 500)
RHO_RANGE = np.asarray([2000.0])  #[kg]/[m^3]
Rb = 0.16 # radius of the bit contacting rock    [m]

BANDPASS_FILTER = [20, 30, 100, 120] #[Hz]

RC_AXIAL = 0.266 # reflection coefficient
DELAY_BITSUB_AXIAL = 0.86 # in ms

RC_TANGENTIAL = -0.135  # reflection coefficient
DELAY_BITSUB_TANGENTIAL = 1.78 # in ms



PIPE_ALPHA = 5100.0 # velocity of the pipe  [m] / [s]
PIPE_BETA = 2668.0 #[m]/[s]
PIPE_RHO = 7300.0 # density of the pipe  #[kg]/[m^3]

CONTACT_FACTOR_AXIAL=1
CONTACT_FACTOR_TANGENTIAL=1
pipe = Pipe(Rb=Rb, alpha=PIPE_ALPHA, rho=PIPE_RHO, beta=PIPE_BETA, contact_factor=CONTACT_FACTOR_AXIAL)
print("ToDo: change so that contact factor is component dependant")
NYQUIST = 5000.0; start = 5000;end = 15000;
NYQUIST = 2500.0; start = 2500;end = 7500;
dt = 1./(2*NYQUIST)
#P-Wave Modulus = rho * velocity**2
#velocity_values = ALPHA_OR_BETA_RANGE
#
#rho_vel_cases = product(ALPHA_OR_BETA_RANGE, RHO_RANGE)
#rho_vel_cases_list = list(rho_vel_cases)

rho = 2670.0
COMPONENT = 'axial'
velocity=4000.0
modulus = rho * velocity**2
rock = Rock(alpha=velocity, beta=velocity, rho=rho)
theoretical = TheoreticalWavelet(pipe, rock, component=COMPONENT,
                                 nyquist=NYQUIST, filterby=BANDPASS_FILTER, filter_duration=0.02)
data = getattr(theoretical, 'primary_in_time_domain')(window=None, filtered=False, skip_derivative=True)


data_1s = data[start:end]
outdata_name = 'rho{}_vel{}_{}.npy'.format(int(rho), int(velocity), COMPONENT)
np.save(outdata_name, data_1s)

filtered_data = ssig.filtfilt(theoretical.fir_taps, 1, data) 
filtered_1s = filtered_data[start:end]
outdata_name = 'filtered_rho{}_vel{}_{}.npy'.format(int(rho), int(velocity), COMPONENT)
np.save(outdata_name, filtered_1s)

COMPONENT = 'tangential'
velocity=2500.0
modulus = rho * velocity**2
rock = Rock(alpha=velocity, beta=velocity, rho=rho)
theoretical = TheoreticalWavelet(pipe, rock, component=COMPONENT,
                                 nyquist=NYQUIST, filterby=BANDPASS_FILTER)
data = getattr(theoretical, 'primary_in_time_domain')(window=None, filtered=False, skip_derivative=True)
data_1s = data[start:end]
outdata_name = 'rho{}_vel{}_{}.npy'.format(int(rho), int(velocity), COMPONENT)
np.save(outdata_name, data_1s)


t = np.arange(len(data))
t = t.astype(np.float64)
t *= dt
t -= 1.0
#t_mini = t[9000:11001]
t_mini = t[9500:10501]
#ww_1s = ww[5000:15000]
t_1s = t[start:end]
np.save('t.npy', t_1s)

pdb.set_trace()

for i, (velocity, rho) in enumerate(rho_vel_cases_list):#tqdm(product(ALPHA_OR_BETA_RANGE, RHO_RANGE), total=len(list(product(ALPHA_OR_BETA_RANGE, RHO_RANGE)))):
    rho = 2670.0
    velocity=4000.0
    #mod = ((rho/1000)*((velocity/1000)**2))
    modulus = rho * velocity**2
    #modulus = ((rho/1000)*((velocity/1000)**2))
    rock = Rock(alpha=velocity, beta=velocity, rho=rho)

    theoretical = TheoreticalWavelet(pipe, rock, component=COMPONENT, nyquist=NYQUIST, filterby=BANDPASS_FILTER)

    time = theoretical.get_time_range_for_window(WINDOW)/1000

    ww = getattr(theoretical, 'primary_in_time_domain')(window=None, filtered=False, skip_derivative=True)
    dt = theoretical.sampling_interval
    t = np.arange(len(ww))
    t = t.astype(np.float64)
    t *= dt
    t -= 1.0
    t_mini = t[9000:11001]

    ww_1s = ww[5000:15000]
    t_1s = t[5000:15000]



    pdb.set_trace()
    if COMPONENT == 'axial':
        ww += theoretical.pegleg_effect(delay_in_ms=DELAY_BITSUB_AXIAL, RC=RC_AXIAL, window=None, skip_derivative=True)
    else:
        ww += theoretical.pegleg_effect(delay_in_ms=DELAY_BITSUB_TANGENTIAL, RC=RC_TANGENTIAL, window=None,
                                       skip_primary_derivative=False,
                                       skip_reflected_derivative=False,
                                       second_derivative_on_reflected=True)




