# -*- coding: utf-8 -*-
"""
Created on Tue Nov 20 12:14:27 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import h5py

import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import scipy.signal as ssig

from dcrhino.process_pipeline.h5_helper import H5Helper

#<config plot style>
plot_config_dict = {}
components_to_plot = ['x', 'y',]#['x', 'y', 'z']
num_pcolor_plot_panels = len(components_to_plot)
vmin = -5.0; vmax=0.0
#</config plot style>

home = os.path.expanduser("~/")
h5_basename = '20181119_SSX54322_5209_3200.h5'
mine_path = os.path.join(home, 'data/datacloud/field_data/detour_gold/detour_lake_mine')
h5_path = os.path.join(mine_path,'level_1/piezo/3200hz', h5_basename)

h5 = h5py.File(h5_path)
h5h = H5Helper(h5)

samples_per_second = float(h5h.metadata.output_sampling_rate)#3200.0
trace_duration_in_seconds = 1.0
samples_per_trace = int(trace_duration_in_seconds * samples_per_second)


#h5h.x_data = h5h.x_data[0:75977600]
#h5h.y_data = h5h.y_data[0:75977600]
#h5h.z_data = h5h.z_data[0:75977600]

#num_traces = int(len(h5h.x_data) / samples_per_trace)
#frq = np.fft.fftfreq(samples_per_trace, d=1./samples_per_second)

if 'x' in components_to_plot:
    f, t, Sxx = ssig.spectrogram(h5h.x_data, fs=samples_per_second, window=('hamming'),
                                         nperseg=samples_per_trace, noverlap=0, detrend='constant',
                                         return_onesided=True, scaling='density', axis=-1, mode='psd')
if 'y' in components_to_plot:
    f, t, Syy = ssig.spectrogram(h5h.y_data, fs=samples_per_second, window=('hamming'),
                                         nperseg=samples_per_trace, noverlap=0, detrend='constant',
                                         return_onesided=True, scaling='density', axis=-1, mode='psd')
if 'z' in components_to_plot:
    f, t, Szz = ssig.spectrogram(h5h.z_data, fs=samples_per_second, window=('hamming'),
                                         nperseg=samples_per_trace, noverlap=0, detrend='constant',
                                         return_onesided=True, scaling='density', axis=-1, mode='psd')


f_high_cut = 1000.0 #Hz
f_keep_indices = np.where(f <= f_high_cut)[0]
f = f[f_keep_indices]
band_indices = np.where((f>=100) & (f<=300))[0]

if 'x' in components_to_plot:
    Sxx = Sxx[f_keep_indices,:]
    max_xx = np.max(Sxx, axis=0)
    max_xx_band = np.max(Sxx[band_indices,:], axis=0)
    max_xx = np.log10(max_xx)
    max_xx_band = np.log10(max_xx_band)
if 'y' in components_to_plot:
    Syy = Syy[f_keep_indices,:]
    max_yy = np.max(Syy, axis=0)
    max_yy_band = np.max(Syy[band_indices,:], axis=0)
    max_yy = np.log10(max_yy)
    max_yy_band = np.log10(max_yy_band)
if 'z' in components_to_plot:
    Szz = Szz[f_keep_indices,:]
    max_zz = np.max(Szz, axis=0)
    max_zz_band = np.max(Szz[band_indices,:], axis=0)
    max_zz = np.log10(max_zz)
    max_zz_band = np.log10(max_zz_band)



plt.figure(22, figsize = (8.5, 11), dpi=300)
plt.subplot(num_pcolor_plot_panels+1, 1, 1)
if 'x' in components_to_plot:
    plt.plot(t, max_xx, label='global max x')
    plt.plot(t, max_xx_band, label='100-300Hz max x')
if 'y' in components_to_plot:
    plt.plot(t, max_yy, label='global max y')
    plt.plot(t, max_yy_band, label='100-300Hz max y')
if 'z' in components_to_plot:
    plt.plot(t, max_yy, label='global max z')
    plt.plot(t, max_yy_band, label='100-300Hz max z')
plt.legend()

i_panel = 2
while i_panel <= num_pcolor_plot_panels + 1:
    plt.subplot(num_pcolor_plot_panels+1, 1, i_panel)
    component_to_plot = components_to_plot.pop(0)
    if component_to_plot =='x':
        plt.pcolormesh(t, f, np.log10(Sxx));
    elif component_to_plot == 'y':
        plt.pcolormesh(t, f, np.log10(Syy));
    elif component_to_plot == 'z':
        plt.pcolormesh(t, f, np.log10(Szz));
    plt.clim(vmin=vmin, vmax=vmax)
    plt.title('component {}'.format(component_to_plot))
    plt.ylabel('Frequecny [Hx]')
    plt.xlabel('Trace index ({}[s])'.format(trace_duration_in_seconds))
    i_panel+=1
#plt.colorbar()
#plt.subplot(4,1,4)
#plt.pcolormesh(t, f, np.log10(Szz));
#plt.clim(vmin=-5, vmax=0.0)
#plt.savefig('tangential_component.png')
plt.savefig('spectra_{}.png'.format(h5_basename[:-3]))
pdb.set_trace()
plt.show()
#n_bins = 30
#frq = np.logspace(-0.9, 3.0, n_bins+1)
#Sxx_binned  = np.full((n_bins, num_traces), np.nan)
#for i_bin in range(n_bins):
#    bin_indices = np.where((f>=frq[i_bin]) & (f<=frq[i_bin+1]))[0]
#    binned_data = Sxx[bin_indices,:]
#    avg_bin = np.mean(binned_data,axis=0)
#    pdb.set_trace()
#    Sxx_binned[i_bin,:] = avg_bin;#np.mean(Sxx[bin_indices,:], axis=0)
#    #print(Sxx_binned)
#    pdb.set_trace()


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
