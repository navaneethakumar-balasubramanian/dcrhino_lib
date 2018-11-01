# -*- coding: utf-8 -*-
"""
Created on Tue Oct 30, so its a cleaner version for working with Bob
Basker in Denver tomorrow.

@author: kkappler

Process Tangential traces as per JIRA RPP-5

Steps:
    1. Identify location of data from 5208 July 8
    /home/kkappler/data/datacloud/west_angelas/20180709_SSX50401_5208_tangential.npy

-20181023: in a window around the multiple we want to STFT and analyse phase v frequency
- this will give us a dispersion curve which we can use to get the velocity; i.e
by inverting the dispersion curve we get a better picking boundary for the multiple
arrival time

Shear modulus (SM_01):		( 1 – ratio ) / ( 1 + ratio )    where   ratio = sqrt ( max amplitude second multiple  /  abs (min amplitude primary) )
				(Note: primary event is a trough, so negative amplitudes)
Velocity proxy (INVDELAY):		1  /   0.5 * [ ( first multiple time – primary time ) + 0.5 * (second multiple time – primary time ) ]
SAMP_ROP = S_AMP / ROP			sqrt (abs(primary amp)) / ROP


"""

from __future__ import absolute_import, division, print_function

import datetime
import matplotlib
pgf_with_rc_fonts = {"pgf.texsystem": "pdflatex"}
matplotlib.rcParams.update(pgf_with_rc_fonts)
import matplotlib.pyplot as plt
#from matplotlib import rc
#rc('text', usetex=True)
import numpy as np
import os
import pandas as pd
import pdb
import scipy.signal as ssig
import scipy
from string import zfill

from fatiando.vis.mpl import seismic_wiggle

from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.math.windowing_scheme import sliding_window
#from dcrhino.analysis.signal_processing.seismic_processing import autocorrelate_trace
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.signal_processing.firls_bandpass import FIRLSFilter

from dcrhino.analysis.signal_processing.seismic_processing import autocorrelate_trace
from dcrhino.analysis.signal_processing.seismic_processing import deconvolve_trace_data#hankel_style
from dcrhino.analysis.signal_processing.seismic_processing import deconvolve_trace_data_dev#hankel_style
from dcrhino.analysis.signal_processing.seismic_processing import pick_poly_peak
from dcrhino.analysis.signal_processing.seismic_processing import calculate_spiking_decon_filter
#from dcrhino.analysis.signal_processing.seismic_processing import calculate_spiking_decon_filter
#from supporting_v02_processing import get_hole_data
from dcrhino.analysis.unstable.v02.config_file_parsing import L1L2ProcessConfiguration
from dcrhino.analysis.unstable.v02.config_file_parsing import get_metadata
from dcrhino.analysis.measurands.keys.data_key import DAQSerialNumberSamplingRateComponentTimeIntervalDataKey
from dcrhino.analysis.supporting_datetime import GMT
from dcrhino.analysis.util.interval import TimeInterval
from dcrhino.analysis.signal_processing.mwd_tools import get_interpolated_column
from dcrhino.analysis.signal_processing.mwd_tools import reject_traces_with_small_rop



#(time_vector, mwd_hole_df, column_label,end_time_column_label='endtime'):
ACOUSTIC_VELOCITY = 4755.0
SHEAR_VELOCITY = 2654#ACOUSTIC_VELOCITY / 2.0
sampling_rate = 4000.0; dt = 1./sampling_rate
start_ms_despike_decon = 5.0; end_ms_despike_decon = 70.#190.0#70.0
#start_ms_despike_decon = -12.0; end_ms_despike_decon = 70.#190.0#70.0
add_noise_percent = 200.0#150.0
#Spiking Decon (10 ms operator, 5% white noise, design window 110-170 ms)
spiking_decon_filter_duration = 0.010    #10ms; parameterize in terms of trace length
n_spiking_decon_filter_taps = int(sampling_rate * spiking_decon_filter_duration)
multiple_window_search_width_ms = 3.126

home = os.path.expanduser("~")
data_path = os.path.join(home, 'data', 'datacloud')
trace_plot_path = os.path.join(home, '.cache', 'datacloud', 'traces_movie')
despike_trace_plot_path = os.path.join(home, '.cache', 'datacloud', 'traces_movie', 'despike')
#raw_data_file = os.path.join(data_path, 'west_angelas', '20180709_SSX50401_5208_tangential.npy')
#raw_data = np.load(raw_data_file)
hole_path = os.path.join(data_path, 'rhino_process_pipeline_output/WEST_ANGELAS/5208/4000/710-197-3/2018-10-18_00001')
tangential_data_path = os.path.join(hole_path, 'tangential_interpolated_traces.npy')
data = np.load(tangential_data_path)
n_traces, samples_per_trace = data.shape
tfct = np.load(os.path.join(hole_path, 'tangential_filtered_correlated_traces.npy'))
#pdb.set_trace()
holy_mwd = pd.read_csv(os.path.join(hole_path, 'hole_mwd.csv'), parse_dates=['starttime', 'endtime'])
df_features = pd.read_csv(os.path.join(hole_path, 'extracted_features.csv'))#, parse_dates=['starttime', 'endtime'])

#<cull traces with small delta-z>
df_features = reject_traces_with_small_rop(df_features)#, threshold=0.006):
data = data[df_features.index, :]
tfct = tfct[df_features.index, :]
n_traces, samples_per_trace = data.shape
#<cull traces with small delta-z>

dz = np.diff(df_features.depth)
dz = np.hstack((0.0, dz))

pdb.set_trace()
time_vector = pd.date_range(holy_mwd.starttime.iloc[0], periods=n_traces, freq='1S')

mwd_strings = ['krpm', 'force_on_bit(n)', 'torque(nm)', 'air_pressure(pa)',
               'vibration', 'rop(m/hr)', 'apr', 'blastability', 'mse', 'computed_elevation']
interped_mwd_dict = {}
#pdb.set_trace()
for mwd_string in mwd_strings:
    interp_data = get_interpolated_column(time_vector, holy_mwd, mwd_string)#,end_time_column_label='endtime'):
    interped_mwd_dict[mwd_string] = interp_data
#    plt.plot(time_vector, interp_data)
#    plt.title('{}'.format(mwd_string))
#    plt.show()


dzdt = -1 * np.diff(interped_mwd_dict['computed_elevation'])
dzdt = np.hstack((dzdt[0], dzdt))
print('dzdt is short by one value - hackaround for now')
#match derivative here; You have a dz for each of
n_traces, samples_per_trace = data.shape

config_filename = os.path.join('rio.cfg')
#config_filename = os.path.join('rio_250_650.cfg')
config = L1L2ProcessConfiguration(config_filename)
metameta = get_metadata(config_filename)
decon_filter_length = int(config.deconvolution_filter_duration * sampling_rate)
firls = FIRLSFilter(config.bandpass_corners, config.bandpass_filter_duration)
fir_taps = firls.make_simple(sampling_rate)
n_samples_back = int(sampling_rate * np.abs(config.min_lag_trimmed_trace))
n_samples_fwd = int(sampling_rate * config.max_lag_trimmed_trace)
samples_per_corr_trace = n_samples_back + n_samples_fwd
L = sampling_rate #but not when trace is other than 1s
t0_index = int(L + decon_filter_length) // 2
back_ndx = t0_index - n_samples_back
fin_ndx = t0_index + n_samples_fwd
multiple_time = 2 * (metameta.sensor_distance_to_source /SHEAR_VELOCITY)
earliest_multiple_time = multiple_time - (2.0 * dt)
latest_multiple_time =  earliest_multiple_time + (multiple_window_search_width_ms * 1e-3)

output_data = np.full((n_traces, samples_per_corr_trace), np.nan)
despike_data = np.full((n_traces, samples_per_corr_trace), np.nan)
decon_filters = np.full((n_traces, decon_filter_length), np.nan)
rxxs = np.full(n_traces, np.nan)

hack_start_trace = 0
#n_traces = 4
#for i_trace in range(0,n_traces):
primary_poly_indices = np.full(n_traces, np.nan)
primary_poly_amplitudes = np.full(n_traces, np.nan)
multiple_poly_indices = np.full(n_traces, np.nan)
multiple_poly_amplitudes = np.full(n_traces, np.nan)


pdb.set_trace()
for i_trace in range(hack_start_trace, n_traces):
    print("trace # {}".format(i_trace))
    trace_data = data[i_trace,:]
#    decon_trace, rxx0 = deconvolve_trace_data(trace_data, decon_filter_length)#, hankel_style=True)
                                              #, scale_factor=numeric_attenuation_correction)
    decon_trace, rxx0 , x_filter = deconvolve_trace_data_dev(trace_data, decon_filter_length)
    decon_filters[i_trace, :] = x_filter; rxxs[i_trace] = rxx0
    tr_corr_w_deconv = np.correlate(trace_data, decon_trace, 'same')
#    tr_corr_w_deconv = ssig.filtfilt(fir_taps, 1., tr_corr_w_deconv).astype('float32')
    despiked_trace, despike_filter = calculate_spiking_decon_filter_local(tr_corr_w_deconv,
                                                      n_spiking_decon_filter_taps,
                                                      dt, start_ms_despike_decon,
                                                      end_ms_despike_decon,
                                                      add_noise_percent=add_noise_percent)


    if (len(fir_taps) == 1) and (fir_taps[0]==1.0):
        bpf_data = tr_corr_w_deconv
    else:
        bpf_data = ssig.filtfilt(fir_taps, 1., tr_corr_w_deconv).astype('float32')
        bpf_despike = ssig.filtfilt(fir_taps, 1., despiked_trace).astype('float32')

    #pdb.set_trace()
    qq = np.max(bpf_data)/np.max(bpf_despike)
#    qq =1.0
    print('qq = {}'.format(qq))
#    time_axis = dt*np.arange(samples_per_trace)
#    plt.plot(qq*despiked_trace, label='dspk')
#    plt.plot(np.roll(bpf_data, -20), label='nodspk')
#    plt.legend();plt.show()
    little_data = bpf_data[back_ndx:fin_ndx]
    bpf_despike = np.roll(bpf_despike, n_spiking_decon_filter_taps//2)
    little_despiked_trace = qq*bpf_despike[back_ndx:fin_ndx]
    print(len(little_data))

    output_data[i_trace, :] = little_data
    despike_data[i_trace, :] = little_despiked_trace

    print("PRIMARY feature extraction")

    time_axis = dt*np.arange(len(little_despiked_trace))
    skip_samples = 350
    primary_neighborhood = np.array([48, 58]) + skip_samples

    #primary pulse between samples 48 and 58 (usually 52 or 53)
    #secondary between 88 and 99, usually around 93-95
    primary_window_halfwidth_in_samples = 2 #half the positive half-sine
    probable_primary_region = little_despiked_trace[primary_neighborhood[0]:primary_neighborhood[1]]
    t_probable_primary_region = time_axis[primary_neighborhood[0]:primary_neighborhood[1]]
    max_index = np.argmax(probable_primary_region)
    left_hand_edge = max_index - primary_window_halfwidth_in_samples
    right_hand_edge = max_index + primary_window_halfwidth_in_samples + 1
    #try:
    primary_window = probable_primary_region[left_hand_edge:right_hand_edge]
    t_primary_window = t_probable_primary_region[left_hand_edge:right_hand_edge]
#    if len(primary_window) == 0:
##    except ValueError:#IndexError:
#        print("AAAAAAAAAAAAAAAAAAAAAAAARRRRGH")
#        continue

    #<check if max is on edge throw out this trace>
    expected_max_arg = primary_window_halfwidth_in_samples
    if np.argmax(primary_window) != primary_window_halfwidth_in_samples:
        print("max sample is on the egde rather than in center - \
              timing error or some unexpected issue - reject this trace")
        pdb.set_trace()
        #continue
    #<check if max is on edge throw out this trace>

    #<worked example>
    #max_index = 4
    #left_hand_edge = 2

    max_poly_amplitude, max_poly_ndx = pick_poly_peak(primary_window, plot=False)
    max_ndx_ref_to_probable_primary_region = max_poly_ndx + left_hand_edge
    primary_poly_indices[i_trace] = max_ndx_ref_to_probable_primary_region
    primary_poly_amplitudes[i_trace] = max_poly_amplitude

    #plt.figure(1);plt.clf()
    #plt.plot(t_probable_primary_region, probable_primary_region);
    #plt.plot(t_primary_window, primary_window, 'r*');

#    #<MULTIPLE>
    print("MULTIPLE feature extraction")
    multiple_neighborhood = np.array([88, 101]) + skip_samples
    multiple_window_halfwidth_in_samples = 2 #half the positive half-sine
    probable_multiple_region = little_despiked_trace[multiple_neighborhood[0]:multiple_neighborhood[1]]
    t_probable_multiple_region = time_axis[multiple_neighborhood[0]:multiple_neighborhood[1]]
#    if i_trace==100:
    #pdb.set_trace()
    max_index = np.argmax(probable_multiple_region)
    left_hand_edge = max_index - multiple_window_halfwidth_in_samples
    right_hand_edge = max_index + multiple_window_halfwidth_in_samples + 1
    multiple_window = probable_multiple_region[left_hand_edge:right_hand_edge]
    t_multiple_window = t_probable_multiple_region[left_hand_edge:right_hand_edge]
    if len(multiple_window) == 0:
        #pdb.set_trace()
        print("Bad trace! You a are very, very naughty trace")
        #multiple_poly_indices[i_trace] = max_ndx_ref_to_probable_multiple_region
        multiple_poly_amplitudes[i_trace] = max_poly_amplitude
        continue
    #<check if max is on edge throw out this trace>
    expected_max_arg = multiple_window_halfwidth_in_samples
    if np.argmax(multiple_window) != multiple_window_halfwidth_in_samples:
        print("max sample is on the egde rather than in center - \
              timing error or some unexpected issue - reject this trace")
        pdb.set_trace()
        #continue
    #<check if max is on edge throw out this trace>
    #pdb.set_trace()
    max_poly_amplitude, max_poly_ndx = pick_poly_peak(multiple_window, plot=False)
    max_ndx_ref_to_probable_multiple_region = max_poly_ndx + left_hand_edge
    multiple_poly_indices[i_trace] = max_ndx_ref_to_probable_multiple_region
    multiple_poly_amplitudes[i_trace] = max_poly_amplitude



plt.figure(222)
n_plots=3
plt.subplot(n_plots,1,1)
plt.plot(rxxs, label='rxx')
plt.legend()
plt.subplot(n_plots,1,2)
plt.plot(np.max(decon_filters, axis=1), label='decon max')
plt.subplot(n_plots,1,3)
plt.plot(np.log10(rxxs), label='logrxx')
plt.legend(); plt.show()

pdb.set_trace()
amplitude_ratio = np.sqrt( multiple_poly_amplitudes / primary_poly_amplitudes ) #R**2
impedance = (1 - amplitude_ratio) / (1 + amplitude_ratio)
shear_modulus = impedance# = (1 - amplitude_ratio) / (1 + amplitude_ratio)
delay = multiple_poly_indices + 40 - primary_poly_indices
svel =1./delay**4

plt.figure(22)
n_plots=2
plt.subplot(n_plots,1,1)
plt.plot(df_features.depth, svel, label='1/delay^4')
plt.legend()
plt.subplot(n_plots,1,2)
plt.plot(df_features.depth, shear_modulus, label='1-m/p / (1+m/p)')
plt.plot(df_features.depth, dz, label='~rop')
#plt.subplot(n_plots,1,3)
#plt.plot(df_features.depth, shear_modulus/dz, label='Z/rop')
#plt.plot(df_features.depth, dz, label='~rop')
plt.legend()
plt.show()
#plt.plot(df_features.depth, shear_modulus);plt.show()
plt.plot(df_features.depth, 1./delay**4);plt.show()
np.save('shear_modulus', shear_modulus)
np.save('despiked_traces', despike_data)
np.save('undespiked_traces', output_data)
pdb.set_trace()

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
