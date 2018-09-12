# -*- coding: utf-8 -*-
"""
Created on Thu Sep  6 10:56:06 2018

@author: kkappler
This module is going to do EDA on data from west angelas hole #83.

Next actions: Add support for reading/using cfg file.
Use first software/datacloud/dcrhino_data_processing/collection_daemon.cfg
Read it and make @property functions for each proc parameter
use this web example:
    https://www.pythonforbeginners.com/code-snippets-source-code/how-to-use-configparser-in-python

import ConfigParser
import time

# On Debian, /etc/mysql/debian.cnf contains 'root' a like login and password.
config = ConfigParser.ConfigParser()
config.read("/etc/mysql/debian.cnf")
username = config.get('client', 'user')
password = config.get('client', 'password')
hostname = config.get('client', 'host')
We will push the processing from resampled through to logs.

Parameters:
    trace_length, trace_overlap, finite_acorr_compensation,

Step 1. Load a trace
deconvolve_trace(trace, filter_length, **kwargs)
"""

from __future__ import absolute_import, division, print_function

import ConfigParser
import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb
import scipy.signal as ssig

from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.math.windowing_scheme import sliding_window
#from dcrhino.analysis.signal_processing.seismic_processing import autocorrelate_trace
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.signal_processing.firls_bandpass import FIRLSFilter

from dcrhino.analysis.signal_processing.seismic_processing import autocorrelate_trace
from dcrhino.analysis.signal_processing.seismic_processing import deconvolve_trace_data
from supporting_v02_processing import get_hole_data
from config_file_parsing import L1L2ProcessConfiguration


#def apply_l1_to_l2_processing(    L = hole_observation.sampling_rate
#    V = int(L)):
#    """
#    """
#    sw = sliding_window(data, L, V-111)
#    print('TODO: Replace acorr with 2D convolution of self with flip(lrud)')
#    trace_data = sw[0,:]
##        trace = Q(trace_data)
##        pdb.set_trace()
#    decon_trace, rxx0 = deconvolve_trace_data(trace_data, decon_filter_length)
#    trace_data = sw[0,:]
#    tr_corr_w_deconv = np.correlate(trace_data, decon_trace, 'same')
#    if (len(fir_taps) == 1) and (fir_taps[0]==1.0):
#        bpf_data = tr_corr_w_deconv
#    else:
#        bpf_data = ssig.filtfilt(fir_taps, 1., tr_corr_w_deconv).astype('float32')
#    sampling_rate = hole_observation.sampling_rate
#
#    n_samples_back = int(sampling_rate * np.abs(min_lag_trimmed_trace))
#    n_samples_fwd = int(sampling_rate * max_lag_trimmed_trace)
#    back_ndx = t0_index - n_samples_back
#    fin_ndx = t0_index + n_samples_fwd
#
#    little_data = bpf_data[back_ndx:fin_ndx]
#    return little_data




master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
df_master = master_iterator_measurand.load()
home = os.path.expanduser("~/")

config_filename = os.path.join(home, 'software/datacloud/dcrhino_data_processing/collection_daemon.cfg')
config = L1L2ProcessConfiguration(config_filename)
firls = FIRLSFilter(config.bandpass_corners, config.bandpass_filter_duration)
pdb.set_trace()
hole = 11
sub_df = df_master[df_master.hole==hole]


n_obs_per_hole = len(sub_df)

for i_obs in range(n_obs_per_hole):
    hole_observation = sub_df.iloc[i_obs]
    t0 =  hole_observation.time_start
    L = hole_observation.sampling_rate
    V = int(L)
    drange = pd.date_range(start=t0, periods=1392000, freq='312.5U')
    pdb.set_trace()
    decon_filter_length = int(config.deconvolution_filter_duration * hole_observation.sampling_rate)
    t0_index = int(L + decon_filter_length) // 2
    t0 =  hole_observation.time_start
    dt = 1./hole_observation.sampling_rate
    #drange = pd.date_range(start=t0, end=hole_observation.time_end, periods=1392000)
    drange = pd.date_range(start=t0, periods=1392000, freq='2S')
    fir_taps = firls.make(hole_observation)
    for component in COMPONENT_LABELS:
        data = get_hole_data(hole_observation, component, plot=False)
        sw = sliding_window(data, L, V-111)
        print('TODO: Replace acorr with 2D convolution of self with flip(lrud)')
        trace_data = sw[0,:]
#        trace = Q(trace_data)
#        pdb.set_trace()
        decon_trace, rxx0 = deconvolve_trace_data(trace_data, decon_filter_length)
        tr_corr_w_deconv = np.correlate(trace_data, decon_trace, 'same')
        if (len(fir_taps) == 1) and (fir_taps[0]==1.0):
            bpf_data = tr_corr_w_deconv
        else:
            bpf_data = ssig.filtfilt(fir_taps, 1., tr_corr_w_deconv).astype('float32')
        sampling_rate = hole_observation.sampling_rate

        n_samples_back = int(sampling_rate * np.abs(config.min_lag_trimmed_trace))
        n_samples_fwd = int(sampling_rate * config.max_lag_trimmed_trace)
        back_ndx = t0_index - n_samples_back
        fin_ndx = t0_index + n_samples_fwd

        little_data = bpf_data[back_ndx:fin_ndx]
#        decon_trace.data = little_data
        plt.plot(little_data);plt.show()
        pdb.set_trace()
        print('pl')



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
