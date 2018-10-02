# -*- coding: utf-8 -*-
"""
Created on Tue Sep  11 14:33 2018

@author: kkappler

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
#from supporting_v02_processing import get_hole_data
from dcrhino.analysis.unstable.v02.config_file_parsing import L1L2ProcessConfiguration

from dcrhino.analysis.measurands.keys.data_key import DAQSerialNumberSamplingRateComponentTimeIntervalDataKey
from dcrhino.analysis.supporting_datetime import GMT
from dcrhino.analysis.util.interval import TimeInterval

home = os.path.expanduser("~/")
t0 = datetime.datetime(1970, 1, 1, tzinfo=GMT)



l1_data_measurand = MEASURAND_REGISTRY.measurand('level1_npy_piezo')
l1_data_measurand.project_id='line_creek'


config_filename = os.path.join(home, 'software/datacloud/dcrhino_data_processing/collection_daemon.cfg')
config = L1L2ProcessConfiguration(config_filename)

digitizer_id = 'S1008';sampling_rate = 3200.0
#digitizer_id = '5208'; sampling_rate = 2800.0
#digitizer_id = '5208'; sampling_rate = 3200.0
#component = 'axial'
start_datetime = datetime.datetime(2018, 9, 10, 16, 55, 26, tzinfo=GMT)
end_datetime = datetime.datetime(2018, 9, 10, 17, 54, 52, tzinfo=GMT)
print(start_datetime)
time_interval = TimeInterval(lower_bound=start_datetime, upper_bound=end_datetime)


decon_filter_length = int(config.deconvolution_filter_duration * sampling_rate)
firls = FIRLSFilter(config.bandpass_corners, config.bandpass_filter_duration)
pdb.set_trace()
for component_label in COMPONENT_LABELS:
    data_key = DAQSerialNumberSamplingRateComponentTimeIntervalDataKey(digitizer_id, sampling_rate, component_label, time_interval)
    fir_taps = firls.make(data_key)
    input_filename = l1_data_measurand.expected_filename(data_key)
    output_filename = input_filename.replace('/2018', '/corr2018')
    print(input_filename)
    print(output_filename)
    #pdb.set_trace()
    data = l1_data_measurand.load(data_key)
    L = data_key.sampling_rate
    V = 0
    t0_index = int(L + decon_filter_length) // 2
    sw = sliding_window(data, L, L-V)


    n_traces, samples_per_trace = sw.shape
    samples_per_corr_trace = int(sampling_rate * 0.2) #fix this so its not a hack
    output_data = np.full((n_traces, samples_per_corr_trace), np.nan)
    n_samples_back = int(sampling_rate * np.abs(config.min_lag_trimmed_trace))
    n_samples_fwd = int(sampling_rate * config.max_lag_trimmed_trace)
    back_ndx = t0_index - n_samples_back
    fin_ndx = t0_index + n_samples_fwd

    for i in range(0,n_traces):
        print(i)
        trace_data = sw[i,:]
    #    trace_data -= np.mean(trace_data)
    #    plt.plot(trace_data);plt.show()
        decon_trace, rxx0 = deconvolve_trace_data(trace_data, decon_filter_length)
        tr_corr_w_deconv = np.correlate(trace_data, decon_trace, 'same')
        if (len(fir_taps) == 1) and (fir_taps[0]==1.0):
            bpf_data = tr_corr_w_deconv
        else:
            bpf_data = ssig.filtfilt(fir_taps, 1., tr_corr_w_deconv).astype('float32')


        little_data = bpf_data[back_ndx:fin_ndx]
        print(len(little_data))
        output_data[i,:] = little_data
        #        decon_trace.data = little_data
    #    plt.plot(little_data);plt.show()

    np.save(output_filename, output_data)
    #pdb.set_trace()

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
