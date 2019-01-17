# -*- coding: utf-8 -*-
"""
Created on Wed Jan  9 16:18:37 2019

@author: kkappler

just so it is written down - the right way to do this I think is to resample
the data before selecting trace length and store L1 as resampled to integer
samples per second where the sampling rate is the idealized_sampling_rate
or "output sampling rate".

KEY QUESTIONS/ASSUMPTIONS:
    1. [Q] Where are the h5.ts timestamps from?  Are these effectively UnixUTC?
    2. [A] final timestamps are uniformly sampled; they will run from the floor
    of the first second to the ceil of the last second

As per the v3 design document spec, the input to this stage of processing
is going to be L1.h5, and the output will be a dataframe which is indexed
by trace timestamp;

"""

from __future__ import absolute_import, division, print_function


import datetime
import h5py
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import pandas as pd
from scipy.interpolate import interp1d
import scipy.linalg
import time



from dcrhino.analysis.instrumentation.rhino import get_rhino_channel_map_v2
from dcrhino.analysis.signal_processing.firls_bandpass import FIRLSFilter
from dcrhino.analysis.signal_processing.seismic_processing import autocorrelate_trace
from dcrhino.analysis.signal_processing.seismic_processing import calculate_spiking_decon_filter
from dcrhino.process_pipeline.config import Config
from dcrhino.process_pipeline.io_helper import IOHelper
from dcrhino.real_time.metadata import Metadata
from dcrhino.process_pipeline.h5_helper import H5Helper
from dcrhino.analysis.util.general_helper_functions import init_logging

import scipy.signal as ssig


from test_can_read_rawh5_and_apply_acorr import cast_h5_to_dataframe
from test_can_read_rawh5_and_apply_acorr import resample_l1h5
from test_can_read_rawh5_and_apply_acorr import autocorrelate_l1h5

def get_band_pass_filter_taps(global_config):
    """
    """
    corners = [global_config.trapezoidal_bpf_corner_1,
               global_config.trapezoidal_bpf_corner_2,
               global_config.trapezoidal_bpf_corner_3,
               global_config.trapezoidal_bpf_corner_4]
    fir_duration = global_config.trapezoidal_bpf_duration# = 0.02

    firls = FIRLSFilter(corners, fir_duration)
    #pdb.set_trace()
    fir_taps = firls.make(global_config)
    return fir_taps



#from dcrhino.process_pipeline.config import Config
logger = init_logging(__name__)

def lead_channel_decon(df, global_config):
    """
    """
#
    t0 = time.time()
    output_dict = {}
    data_processing_stage_designator = 'lead-channel-decon'
    n_samples_in_input_traces = len(df['axial'].iloc[0])
    samples_per_trace = 2*n_samples_in_input_traces - 1
    #pdb.set_trace()

#    samples_per_trace = int(autocorrelation_duration / global_config.dt)

    num_traces = len(df['timestamp'])


    for component_id in global_config.components_to_process:
        output_dict[component_id] = np.full((num_traces, samples_per_trace), np.nan) #Allocate Memory

        for i_trace in range(num_traces):
            n_taps_decon = global_config.num_taps_in_decon_filter
            trace_data = df[component_id].iloc[i_trace]
            acorr_for_filter = trace_data[0:n_taps_decon]
            ATA = scipy.linalg.toeplitz(acorr_for_filter)
            ATAinv = scipy.linalg.inv(ATA)
            x_filter = ATAinv[0,:]
            trace_of_proof = np.hstack((np.flipud(trace_data[1:]), trace_data))
            deconv_trace = np.correlate(trace_of_proof, x_filter,'same')#YES
            output_dict[component_id][i_trace,:] = deconv_trace
        output_dict[component_id] = list(output_dict[component_id])

    output_dict['timestamp'] = df['timestamp']
    dff = pd.DataFrame(output_dict, index=df.index)
    print(time.time() - t0)
    return dff


def lag_channel_decon(df, global_config):
    """
    """
    t0 = time.time()
    output_dict = {}
    data_processing_stage_designator = 'lag-channel-decon'
    n_samples_in_input_traces = len(df['axial'].iloc[0])
    samples_per_trace = n_samples_in_input_traces
    #pdb.set_trace()

#    samples_per_trace = int(autocorrelation_duration / global_config.dt)

    num_traces = len(df['timestamp'])


    for component_id in global_config.components_to_process:
        output_dict[component_id] = np.full((num_traces, samples_per_trace), np.nan) #Allocate Memory

        for i_trace in range(num_traces):
            trace_data = df[component_id].iloc[i_trace]
            despiked_trace, despike_filter = calculate_spiking_decon_filter(trace_data,
            global_config.n_spiking_decon_filter_taps,
            global_config.dt, global_config.start_ms_despike_decon,
            global_config.end_ms_despike_decon,
            add_noise_percent=global_config.add_noise_percent)
            despiked_trace = np.roll(despiked_trace, global_config.n_spiking_decon_filter_taps//2)
            output_dict[component_id][i_trace,:] = despiked_trace
        output_dict[component_id] = list(output_dict[component_id])

    output_dict['timestamp'] = df['timestamp']
    dff = pd.DataFrame(output_dict, index=df.index)
    print(time.time() - t0)
    return dff

def band_pass_filter_dataframe(df, global_config):
    """
    """
#    try:
#        print(global_config.autocorrelation_duration)
#    except AttributeError:
#        logger.warning("this warning will be removed once the \
#                   upsample factor is coming from the global cfg")
#        autocorrelation_duration = 0.4

    t0 = time.time()
    output_dict = {}
    data_processing_stage_designator = 'bandpass-filter'
    n_samples_in_input_traces = len(df['axial'].iloc[0])
    samples_per_trace = n_samples_in_input_traces
    #pdb.set_trace()

    num_traces = len(df['timestamp'])

    fir_taps = get_band_pass_filter_taps(global_config)
    for component_id in global_config.components_to_process:
        output_dict[component_id] = np.full((num_traces, samples_per_trace), np.nan) #Allocate Memory
        for i_trace in range(num_traces):
            trace_data = df[component_id].iloc[i_trace]
            filtered_trace = ssig.filtfilt(fir_taps, 1, trace_data)
            output_dict[component_id][i_trace,:] = filtered_trace
        output_dict[component_id] = list(output_dict[component_id])

    output_dict['timestamp'] = df['timestamp']
    dff = pd.DataFrame(output_dict, index=df.index)
    print(time.time() - t0)
    return dff

def test():
    """
    """
    h5_catalog_file = '/home/kkappler/data/datacloud/teck/pet_line_creek/pet_line_creek_h5_catalog.csv'
    h5_catalog = pd.read_csv(h5_catalog_file)
    h5_list = h5_catalog.file_path
    for h5_filename in h5_list:
        l1h5_dataframe, global_config = cast_h5_to_dataframe(h5_filename)
        resampled_dataframe = resample_l1h5(l1h5_dataframe, global_config)
        autcorrelated_dataframe = autocorrelate_l1h5(resampled_dataframe, global_config)
        lead_decon_dataframe = lead_channel_decon(autcorrelated_dataframe, global_config)
        filtered_lead_decon_dataframe = band_pass_filter_dataframe(lead_decon_dataframe, global_config)
        lag_decon_dataframe = lag_channel_decon(lead_decon_dataframe, global_config)
        filtered_lag_decon_dataframe = band_pass_filter_dataframe(lag_decon_dataframe, global_config)
        print('done {}'.format(h5_filename))
#        pdb.set_trace()
#        f, ax = plt.subplots(nrows=2, shareax=True)
#        ax[0].plot()
#        fir_taps = get_band_pass_filter_taps(global_config)
#        pdb.set_trace()

#        i_trace=120
#        qq = np.load('/home/kkappler/data/datacloud/teck/pet_line_creek_old/processed_data/0/axial_interpolated.npy')
#        pdb.set_trace()
#        pet_trace = qq[i_trace]
#        old_acorr = autocorrelate_trace(pet_trace, global_config.num_taps_in_decon_filter)
#        ATA_old = scipy.linalg.toeplitz(old_acorr)
#        ATAinv_old = scipy.linalg.inv(ATA_old)
#        x_filter_old = ATAinv_old[0,:]
##        conv_old = np.convolve(x_filter_old, pet_trace)
##        corr_old = np.correlate(pet_trace, conv_old)
#        #ww = np.load('/home/kkappler/data/datacloud/teck/pet_line_creek_old/processed_data/0/axial_deconvolved.npy')
#        ww = np.load('/home/kkappler/data/datacloud/teck/pet_line_creek_old/processed_data/0/axial_correlated.npy')
#        pet_corr = ww[i_trace]
#
#        pdb.set_trace()
#        autcorrelated_dataframe = autocorrelate_l1h5(resampled_dataframe, global_config)
#
##        plt.plot(resampled_dataframe['axial'].iloc[i_trace], label='rsdf');
##        plt.plot(qq[i_trace], label='owld');plt.legend();plt.show()
#        #pl
#
#
#        trace_of_proof = autcorrelated_dataframe['axial'].iloc[i_trace]
#        #trace_of_proof = np.hstack((np.flipud(trace_of_proof[1:]), trace_of_proof))
#        n_taps_decon = global_config.num_taps_in_decon_filter
#        acorr_for_filter = trace_of_proof[0:n_taps_decon]
#        ATA = scipy.linalg.toeplitz(acorr_for_filter)
#        ATAinv = scipy.linalg.inv(ATA)
#        x_filter = ATAinv[0,:]
#
#
#        trace_of_proof = np.hstack((np.flipud(trace_of_proof[1:]), trace_of_proof))
#
#        #deconv_trace = np.convolve(x_filter, trace_of_proof, 'same')#NO
#        #deconv_trace = np.convolve(trace_of_proof, x_filter, 'same')#NO
#        deconv_trace = np.correlate(trace_of_proof, x_filter, 'same')#NO
#        #deconv_trace = np.correlate(x_filter, trace_of_proof, 'same')#NO
#        #deconv_trace = np.convolve(trace_of_proof, x_filter, 'same')#NO
#
#
#        fir_taps = get_band_pass_filter_taps(global_config)
#        deconv_trace = ssig.filtfilt(fir_taps, 1, deconv_trace)
#        old_deconv_trace = ssig.filtfilt(fir_taps, 1, ww[i_trace])
#        plt.figure(1)
##        plt.subplot(2,1,1)
#        t = global_config.dt * np.arange()
#        plt.plot(deconv_trace, label='decon-new');
#        plt.plot(old_deconv_trace[350:-350], label='owld')
#        plt.legend()
##        plt.subplot(2,1,2)
##        1875
##        plt.plot(old_deconv_trace[350:-350], label='owld');plt.legend();plt.show()
#        plt.show()
#        pdb.set_trace()
        print('hokay')
    pass

def main():
    """
    """
    test()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
