# -*- coding: utf-8 -*-
"""
Created on Tue Sep 25 11:14:17 2018

@author: kkappler

This is an example of "binning" the data, or "depth averaging"
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb
import scipy.signal as ssig

from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.signal_processing.seismic_processing import deconvolve_trace_data_dev
#from dcrhino.analysis.measurands.keys.data_key import DigitizerSamplingRateDateDataKey
#data_key = DigitizerSamplingRateDateDataKey(5208, datetime.datetime(2018, ))
from dcrhino.analysis.signal_processing.firls_bandpass import FIRLSFilter

sampling_rate = 2800.0; dt = 1./sampling_rate;
#sampling_rate = 3200.0; dt = 1./sampling_rate;
bandpass_corners = [80.0, 100.0, 300.0, 350.0]
bandpass_filter_duration = 0.02
deconvolution_filter_duration = 0.1
max_lag_trimmed_trace = 0.1
min_lag_trimmed_trace = -0.1

decon_filter_length = int(deconvolution_filter_duration * sampling_rate)
t0_index = int(sampling_rate + decon_filter_length) // 2
samples_per_corr_trace = int(sampling_rate * 0.2) #fix this so its not a hack
n_samples_back = int(sampling_rate * np.abs(min_lag_trimmed_trace))
n_samples_fwd = int(sampling_rate * max_lag_trimmed_trace)
back_ndx = t0_index - n_samples_back
fin_ndx = t0_index + n_samples_fwd
firls = FIRLSFilter(bandpass_corners, bandpass_filter_duration)
fir_taps = firls.make_simple(sampling_rate)

home = os.path.expanduser("~/")
data_dir = os.path.join(home, 'data/datacloud/line_creek/pipeline/ssx_5451');#5208')
hole_ids = [23531, 23631, 23731, 23831, 23930, 24030, 24130]

flavour = 'extracted_features'; #'hole_mwd'
flavour = 'hole_mwd'
component_label = COMPONENT_LABELS[0]
flavour = 'interpolated_traces'

#new_sps = 2800.0
for hole_id in hole_ids:
#    hole_id = 23831
    filebase = '793 - MR_77 - {}_{}_{}.npy'.format(hole_id, component_label, flavour)
    fullfile = os.path.join(data_dir, filebase)
    data = np.load(fullfile)
    n_traces, samples_per_trace = data.shape
    #data = data.reshape(np.prod(data.shape))
    #data = ssig.resample(data, n_traces*int(new_sps)); sampling_rate = new_sps; data = data.reshape(n_traces, int(new_sps))
    #data = data[300:700,:]
    #data = data.reshape(np.prod(data.shape))
    #data = data[1600:]
    pdb.set_trace()
    #data = data.reshape(466, 2400)
    n_traces, samples_per_trace = data.shape
    samples_per_corr_trace = int(sampling_rate * 0.2) #fix this so its not a hack
    output_data = np.full((n_traces, samples_per_corr_trace), np.nan)

#    plt.imshow(data.T)
#    plt.clim(vmin=-0.4, vmax=0.4)
#    plt.colorbar()
#    plt.show()
    #pdb.set_trace()
    #doogie = data.reshape(np.prod(data.shape))
    #data = ssig.filtfilt(fir_taps, 1., data).astype('float32')
    #pdb.set_trace()
    #data = np.reshape
#    N_seg = np.int(sampling_rate/4)
#    f, t2, Sxx = ssig.spectrogram(data, sampling_rate, nperseg = N_seg)
#    pdb.set_trace()
#    plt.pcolormesh(t2, f, np.log(Sxx))
#    plt.ylabel('Frequency [Hz]')
#    plt.xlabel('Time [sec]')
#    plt.title('Spectrogram - ' + file_path)
#    #toc = time.clock()
#    plt.show()
    #qq = doogie.reshape(n_traces, int(sampling_rate))
    acorr = np.full(data.shape, np.nan)
    decon_2d = np.full(data.shape, np.nan)

    for i_tr in range(n_traces):
        print(i_tr)
        trace_data = data[i_tr,:]
        acorr_trace = np.correlate(trace_data, trace_data, 'same')
        acorr[i_tr,:] = acorr_trace

        decon_trace, rxx0, x_filter = deconvolve_trace_data_dev(trace_data, decon_filter_length)
        usual_corr = np.correlate(trace_data, decon_trace, 'same')
        bpf_data = ssig.filtfilt(fir_taps, 1., usual_corr).astype('float32')
        decon_2d[i_tr, :] = decon_trace
        little_data = bpf_data[back_ndx:fin_ndx]
        #little_data = usual_corr[back_ndx:fin_ndx]
        output_data[i_tr,:] = little_data
#    ww = acorr[:,1250:1550]
#    plt.imshow(ww);plt.show()
#    plt.plot(acorr[:,1400]);plt.show()
    #pdb.set_trace()
    fig,ax = plt.subplots(nrows=2, sharex=True)

    #plt.figure(1);plt.subplot(2,1,1)
    ax[0].plot(output_data[:,280], label='karl');ax[0].legend()
#    plt.subplot(2,1,2)
    xx = np.load('/home/kkappler/data/datacloud/line_creek/pipeline/ssx_5208/793 - MR_77 - 23531_axial_deconvolved_traces.npy')
    ax[1].plot(xx[:,280], label='thiago');ax[1].legend()
    plt.show()
    pdb.set_trace()
    #doogie = data.reshape(np.prod(data.shape))
    #doogie *= ssig.hamming(len(doogie))
    freqs = np.fft.fftfreq(len(doogie), dt)
    spec = np.fft.fft(doogie)
    abs_spec = np.abs(spec)
    spec = np.log10(abs_spec)
    #plt.semilogx(freqs[1:], np.abs(spec[1:]))
    #plt.semilogx(freqs[1:], np.log10(np.abs(spec[1:])))
    plt.semilogx(freqs[1:], ssig.medfilt(np.abs(spec[1:]), 21))
    plt.xlabel('log_{10} Freqeuncy (Hz)')
    plt.ylabel('Spectral Amplitude')
    plt.title('{}'.format(filebase))
    plt.show()
#    df = pd.read_csv(fullfile)
    pdb.set_trace()
    depth = np.asarray(feature_df.depth)
    dz = np.diff(depth)
    plt.plot(dz);plt.show()
    print(df)
    pdb.set_trace()
    print('')

x = np.load(fullfile)
num_traces = len(x)
num_points_per_trace = len(x[0])

xx = np.full((num_traces, num_points_per_trace), np.nan)
for i_trace in range(num_traces):
    xx[i_trace,:] = x[i_trace]

print(len(x))
print(data_dir)
plt.plot(xx.T);
plt.show()
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
