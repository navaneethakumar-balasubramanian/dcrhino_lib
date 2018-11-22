# -*- coding: utf-8 -*-
"""
Created on Tue Nov 20 12:14:27 2018

@author: kkappler

TODO: add binning in frequency as well
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
home = os.path.expanduser("~/")

def make_spectral_qc_plot(h5_helper, components_to_plot=['x', 'y', 'z'],
                          vmin=-5.0, vmax=0.0, header_frequency_band=[100.0,300.0],
                          frequency_high_cut=1000.0):
    """
    @TODO: @Natal: can we make trace_duration_in_seconds depend on
    h5_helper.metadata.trace_length; currently returns None

    @ivar v_min, v_max: min/max values for coloraxislims
    @ivar header_frequency_band, list (or array) with two elements, the low and high
    cut edges of the band of interest.  Within this band we pick the maximum
    spectral amplitude for each trace and plot it.


    """
    h5h = h5_helper
    h5_basename = os.path.basename(h5_helper.h5f.filename)

    num_pcolor_plot_panels = len(components_to_plot)
    samples_per_second = float(h5h.metadata.output_sampling_rate)#3200.0
    trace_duration_in_seconds = 1.0
    samples_per_trace = int(trace_duration_in_seconds * samples_per_second)

    if 'x' in components_to_plot:
        frq, t_axis, Sxx = ssig.spectrogram(h5h.x_data, fs=samples_per_second, window=('hamming'),
                                             nperseg=samples_per_trace, noverlap=0, detrend='constant',
                                             return_onesided=True, scaling='density', axis=-1, mode='psd')
    if 'y' in components_to_plot:
        frq, t_axis, Syy = ssig.spectrogram(h5h.y_data, fs=samples_per_second, window=('hamming'),
                                             nperseg=samples_per_trace, noverlap=0, detrend='constant',
                                             return_onesided=True, scaling='density', axis=-1, mode='psd')
    if 'z' in components_to_plot:
        frq, t_axis, Szz = ssig.spectrogram(h5h.z_data, fs=samples_per_second, window=('hamming'),
                                             nperseg=samples_per_trace, noverlap=0, detrend='constant',
                                             return_onesided=True, scaling='density', axis=-1, mode='psd')



    f_keep_indices = np.where(frq <= frequency_high_cut)[0]
    frq = frq[f_keep_indices]
    band_indices = np.where((frq>=header_frequency_band[0]) & (frq<=header_frequency_band[1]))[0]

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



    fig = plt.figure(22, figsize = (8.5, 11), dpi=300)
    plt.subplot(num_pcolor_plot_panels+1, 1, 1)
    #<plot header>
    if 'x' in components_to_plot:
        plt.plot(t_axis, max_xx, label='global max x')
        plt.plot(t_axis, max_xx_band, label='100-300Hz max x')
    if 'y' in components_to_plot:
        plt.plot(t_axis, max_yy, label='global max y')
        plt.plot(t_axis, max_yy_band, label='100-300Hz max y')
    if 'z' in components_to_plot:
        plt.plot(t_axis, max_yy, label='global max z')
        plt.plot(t_axis, max_yy_band, label='100-300Hz max z')
    plt.legend()
    #</plot header>
    i_panel = 2
    while i_panel <= num_pcolor_plot_panels + 1:
        plt.subplot(num_pcolor_plot_panels+1, 1, i_panel)
        component_to_plot = components_to_plot.pop(0)
        if component_to_plot =='x':
            plt.pcolormesh(t_axis, frq, np.log10(Sxx));
        elif component_to_plot == 'y':
            plt.pcolormesh(t_axis, frq, np.log10(Syy));
        elif component_to_plot == 'z':
            plt.pcolormesh(t_axis, frq, np.log10(Szz));
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
    #cbaxes = fig.add_axes([0.8, 0.1, 0.03, 0.8])
    #cb = plt.colorbar(ax1, cax = cbaxes)
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



def main():
    """
    """
    h5_basename = '20181119_SSX54322_5209_3200.h5'
    mine_path = os.path.join(home, 'data/datacloud/field_data/detour_gold/detour_lake_mine')
    h5_path = os.path.join(mine_path,'level_1/piezo/3200hz', h5_basename)

    h5 = h5py.File(h5_path)
    h5_helper = H5Helper(h5)
    #pdb.set_trace()
    make_spectral_qc_plot(h5_helper)# components_to_plot=['x', 'y', 'z'])

    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
