# -*- coding: utf-8 -*-
"""
Created on Tue Sep  11 14:33 2018

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
from dcrhino.analysis.signal_processing.seismic_processing import pick_poly_peak
#from dcrhino.analysis.signal_processing.seismic_processing import calculate_spiking_decon_filter
#from supporting_v02_processing import get_hole_data
from dcrhino.analysis.unstable.v02.config_file_parsing import L1L2ProcessConfiguration
from dcrhino.analysis.unstable.v02.config_file_parsing import get_metadata
from dcrhino.analysis.measurands.keys.data_key import DAQSerialNumberSamplingRateComponentTimeIntervalDataKey
from dcrhino.analysis.supporting_datetime import GMT
from dcrhino.analysis.util.interval import TimeInterval
from dcrhino.analysis.signal_processing.mwd_tools import get_interpolated_column
from dcrhino.analysis.signal_processing.mwd_tools import reject_traces_with_small_rop


def calculate_spiking_decon_filter_local(trace_data, filter_length,  dt, start_ms,
                                   end_ms, bpf_taps, decon_trace, **kwargs):
    """
    - you want to equalize (best you can) the spectrum from trace to trace
    - if you dont, and you have a variable center frequency (say 100-250Hz)
    what that does it it creates a multiple with variable velocity ...
    so you will get multiples with different velocities becuase of the varying frequencies
    because its a dispersive wave
    -
    dt: float, time interval of a sample (1/sps)
    start_ms: how long after the minimum phase max spike you want to start considering
    data to input; specific to "correlated, deconvolved trace" ... can probably use
    argmax to find the spot to start counting ms, alternatively can use some theoretical
    value, but that depends on having the previous measurand info available and DC
    is not ready for that yet
    end_ms: when to stop admitting data, see above.

    #trim the correlated trace at 110 - 170 ms
    """
    plot = kwargs.get('plot', False)
    #dt = kwargs.get('dt', None)
    add_noise_percent = kwargs.get('add_noise_percent', 5.0)
    noise_fraction = add_noise_percent / 100.0

    max_trace_arg = np.argmax(trace_data)
    n_samples_from_max_to_window = int(np.floor((0.001 * start_ms) / dt))
    first_sample_to_use = max_trace_arg + n_samples_from_max_to_window
    window_width = (end_ms - start_ms) * 0.001
    final_sample_to_use = first_sample_to_use + int(np.ceil(window_width/dt))
    #pdb.set_trace()
    sub_region_to_use_for_decon_calculation = trace_data[first_sample_to_use:final_sample_to_use]
    #pdb.set_trace()
    R_xx = autocorrelate_trace(sub_region_to_use_for_decon_calculation, filter_length)
    R_xx[0] *= (1+noise_fraction)
    #pdb.set_trace()
    nominal_scale_factor = 1.0;#1./R_xx[0]#1.0
    ATA = scipy.linalg.toeplitz(R_xx)
    try:
        ATAinv = scipy.linalg.inv(ATA)
    except np.linalg.linalg.LinAlgError:
        print('matrix inversion failed')  #
        return trace_data, R_xx[0]
    x_filter = nominal_scale_factor*ATAinv[0,:]

    despike_trace = np.convolve(x_filter, trace_data, 'same')#original
#    despike_trace = np.convolve(trace_data, x_filter, 'same')#test 1029
    #bpf_orig = ssig.filtfilt(bpf_taps, 1., trace_data).astype('float32')
    bpf_despike = ssig.filtfilt(bpf_taps, 1., despike_trace).astype('float32')




    if plot:
        fig, ax = plt.subplots(2,1, sharex=True)
        #n_samples = len(trace_data)
        #time_axis = dt*np.arange(n_samples)
     #   pdb.set_trace()
        #ax.plot(time_axis, trace_data)
        ax[0].plot(trace_data, label='parent trace')
        ax[0].plot(np.arange(first_sample_to_use,final_sample_to_use),
                sub_region_to_use_for_decon_calculation, label='subregion for calc decon filter')
        ax[0].plot(despike_trace, label='despiked deconvolved correlated trace')
        ax[0].vlines([first_sample_to_use, final_sample_to_use], ax[0].get_ylim()[0], ax[0].get_ylim()[1])
        ax[0].legend()

        ax[1].plot(bpf_orig, label='orig')
        ax[1].plot(bpf_despike, label='despike')
        plt.legend()
        plt.show()

    #trim the correlated trace at 110 - 170 ms
    return bpf_despike, x_filter


#(time_vector, mwd_hole_df, column_label,end_time_column_label='endtime'):
ACOUSTIC_VELOCITY = 4755.0
SHEAR_VELOCITY = 2654#ACOUSTIC_VELOCITY / 2.0
sampling_rate = 4000.0; dt = 1./sampling_rate
start_ms_despike_decon = 10.0
end_ms_despike_decon = 70.#190.0#70.0
add_noise_percent = 200.0#150.0
#Spiking Decon (10 ms operator, 5% white noise, design window 110-170 ms)
spiking_decon_filter_duration = 0.010    #10ms; parameterize in terms of trace length
n_spiking_decon_filter_taps = int(sampling_rate * spiking_decon_filter_duration)

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
pdb.set_trace()
firls = FIRLSFilter(config.bandpass_corners, config.bandpass_filter_duration)
fir_taps = firls.make_simple(sampling_rate)
n_samples_back = int(sampling_rate * np.abs(config.min_lag_trimmed_trace))
n_samples_fwd = int(sampling_rate * config.max_lag_trimmed_trace)
samples_per_corr_trace = n_samples_back + n_samples_fwd
L = sampling_rate #but not when trace is other than 1s
t0_index = int(L + decon_filter_length) // 2
back_ndx = t0_index - n_samples_back
fin_ndx = t0_index + n_samples_fwd
output_data = np.full((n_traces, samples_per_corr_trace), np.nan)
despike_data = np.full((n_traces, samples_per_corr_trace), np.nan)

multiple_time = 2 * (metameta.sensor_distance_to_source /SHEAR_VELOCITY)
multiple_window_search_width_ms = 3.126
earliest_multiple_time = multiple_time - (2.0 * dt)
latest_multiple_time =  earliest_multiple_time + (multiple_window_search_width_ms * 1e-3)

hack_start_trace = 0
#n_traces = 4
#for i_trace in range(0,n_traces):
primary_poly_indices = np.full(n_traces, np.nan)
primary_poly_amplitudes = np.full(n_traces, np.nan)
multiple_poly_indices = np.full(n_traces, np.nan)
multiple_poly_amplitudes = np.full(n_traces, np.nan)

numeric_attenuation_correction = np.arange(3601,4001)
numeric_attenuation_correction = np.flipud(numeric_attenuation_correction)
numeric_attenuation_correction = 4000./numeric_attenuation_correction

for i_trace in range(hack_start_trace, n_traces):
    print("trace # {}".format(i_trace))
#    if i_trace==365:
#        pdb.set_trace()
    trace_data = data[i_trace,:]
#    trace_data -= np.mean(trace_data)
#    plt.plot(trace_data);plt.show()
    decon_trace, rxx0 = deconvolve_trace_data(trace_data, decon_filter_length, hankel_style=True)
                                              #, scale_factor=numeric_attenuation_correction)
    #, hankel_style=True)
    tr_corr_w_deconv = np.correlate(trace_data, decon_trace, 'same')
#    tr_corr_w_deconv = ssig.filtfilt(fir_taps, 1., tr_corr_w_deconv).astype('float32')
    despiked_trace, despike_filter = calculate_spiking_decon_filter_local(tr_corr_w_deconv,
                                                      n_spiking_decon_filter_taps,
                                                      dt, start_ms_despike_decon,
                                                      end_ms_despike_decon, fir_taps,
                                                      decon_trace, add_noise_percent=add_noise_percent)


    if (len(fir_taps) == 1) and (fir_taps[0]==1.0):
        bpf_data = tr_corr_w_deconv
    else:
        bpf_data = ssig.filtfilt(fir_taps, 1., tr_corr_w_deconv).astype('float32')

    #pdb.set_trace()
    qq = np.max(bpf_data)/np.max(despiked_trace)
#    qq =1.0
    print('qq = {}'.format(qq))
    #time_axis = dt*np.arange(samples_per_trace)
    #plt.plot(qq*despiked_trace, label='dspk')
    #plt.plot(np.roll(bpf_data, -20), label='nodspk')
    #plt.legend();plt.show()
    little_data = bpf_data[back_ndx:fin_ndx]
    despiked_trace = np.roll(despiked_trace, n_spiking_decon_filter_taps//2)
    little_despiked_trace = qq*despiked_trace[back_ndx:fin_ndx]
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
#        pdb.set_trace()
    max_index = np.argmax(probable_multiple_region)
    left_hand_edge = max_index - multiple_window_halfwidth_in_samples
    right_hand_edge = max_index + multiple_window_halfwidth_in_samples + 1
    multiple_window = probable_multiple_region[left_hand_edge:right_hand_edge]
    t_multiple_window = t_probable_multiple_region[left_hand_edge:right_hand_edge]
    if len(multiple_window) == 0:
        multiple_poly_indices[i_trace] = max_ndx_ref_to_probable_multiple_region
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

    max_poly_amplitude, max_poly_ndx = pick_poly_peak(multiple_window, plot=False)
    max_ndx_ref_to_probable_multiple_region = max_poly_ndx + left_hand_edge
    multiple_poly_indices[i_trace] = max_ndx_ref_to_probable_multiple_region
    multiple_poly_amplitudes[i_trace] = max_poly_amplitude


    #pdb.set_trace()
#    plt.figure(2);plt.clf()
#    plt.plot(t_probable_multiple_region, probable_multiple_region);
#    plt.plot(t_multiple_window, multiple_window, 'r*');
#    plt.show()
#    #</MULTIPLE>


    #main_primary_window

#    #        decon_trace.data = little_data
#    #pdb.set_trace()
#    plt.figure(11);plt.clf()
#    t = dt * np.arange(samples_per_corr_trace)
#    half_time = t[len(t)//2]
#    t -= half_time
#    #pdb.set_trace
#    plt.plot(t, little_data);
#    y_min = -1.4; y_max = 1.4
#    plt.ylim(y_min, y_max)
#    v_line_ordinates = [0, earliest_multiple_time, latest_multiple_time]
#    plt.vlines(v_line_ordinates, y_min, y_max)
#    #plt.vlines([t[int(samples_per_corr_trace/2)], 0.1], y_min, y_max)
#    plt.hlines(0, t[0], t[-1])
#    plt.xlabel('Time [s]')
#    ttl_str1 = 'trace # {} of {}, max sample {} past zero-line'.format(i_trace, n_traces, np.argmax(little_data)-(len(t)//2))
#    ttl_str1 = '{}  dzdt={:.4f}'.format(ttl_str1, dzdt[i_trace])
#    ttl_str1 = '{}  rpm={}'.format(ttl_str1, int(1000*interped_mwd_dict['krpm'][i_trace]))
#    ttl_str1 = '{}  FOB kN={}'.format(ttl_str1, int(interped_mwd_dict['force_on_bit(n)'][i_trace])/1000)
#    ttl_str1 = '{}  Torque Nm={:.2f}'.format(ttl_str1, interped_mwd_dict['torque(nm)'][i_trace])
#    #r"$\bf{" + str(number) + "}$"
#    plt.title(ttl_str1)
#    if dzdt[i_trace] < 0.005:
#        plt.text(-0.1, 1.4, 'ROP', color='red', fontsize=12, bbox=dict(boxstyle="square",
#                   ec=(1., 0.5, 0.5),
#                   fc=(1., 0.8, 0.8),))
#    output_filename = os.path.join(trace_plot_path, '{}.png'.format(zfill(i_trace,4)))
#    plt.savefig(output_filename)
    #plt.show()
amplitude_ratio = np.sqrt( multiple_poly_amplitudes / primary_poly_amplitudes ) #R**2
impedance = (1 - amplitude_ratio) / (1 + amplitude_ratio)
shear_modulus = impedance# = (1 - amplitude_ratio) / (1 + amplitude_ratio)
delay = multiple_poly_indices + 40 - primary_poly_indices
svel =1./delay**4

plt.figure(22)
plt.subplot(2,1,1)
plt.plot(df_features.depth, svel, label='1/delay^4')
plt.legend()
plt.subplot(2,1,2)
plt.plot(df_features.depth, shear_modulus, label='1-m/p / (1+m/p)')
plt.legend()
plt.show()
#plt.plot(df_features.depth, shear_modulus);plt.show()
plt.plot(df_features.depth, 1./delay**4);plt.show()
np.save('shear_modulus', shear_modulus)
np.save('despiked_traces', despike_data)
np.save('undespiked_traces', output_data)
#np.save('despiked_traces', despike_data)
#np.save('despiked_traces', despike_data)
#np.save('despiked_traces', despike_data)
#samples_per_corr_trace
pdb.set_trace()


t0 = datetime.datetime(1970, 1, 1, tzinfo=GMT)



l1_data_measurand = MEASURAND_REGISTRY.measurand('level1_npy_piezo')
l1_data_measurand.project_id='line_creek'


config_filename = os.path.join('rio.cfg')

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
