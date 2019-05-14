# -*- coding: utf-8 -*-
"""
Created on Tue Nov 20 12:14:27 2018

@author: kkappler

TODO: add binning in frequency as well
"""

from __future__ import absolute_import, division, print_function



import datetime
import h5py
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import scipy.signal as ssig

from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.helpers.general_helper_functions import calibrate_data
home = os.path.expanduser("~/")

def make_spectral_qc_plot(h5_helper, components_to_plot=['x', 'y'],
                          vmin=-5.0, vmax=0.0, header_frequency_band=[100.0,300.0],
                          frequency_high_cut=1000.0, show_global_max=True, rhino_version=1.1, ide_file=False):
    """
    @TODO: @Natal: can we make trace_duration_in_seconds depend on
    h5_helper.metadata.trace_length; currently returns None

    @ivar vmin, vmax: min/max values for coloraxislims
    @ivar header_frequency_band, list (or array) with two elements, the low and high
    cut edges of the band of interest.  Within this band we pick the maximum
    spectral amplitude for each trace and plot it.


    """
    pdb.set_trace()
    header_color_scheme = {}
    header_color_scheme['x'] = 'blue'
    header_color_scheme['y'] = 'red'
    header_color_scheme['z'] = 'green'
    h5h = h5_helper
    h5_basename = os.path.basename(h5_helper.h5f.filename)
    meta_dict = h5_helper.metadata.metadata_to_dictionary()
    header_frequency_band_str = '{}-{}Hz'.format(header_frequency_band[0], header_frequency_band[1])

    num_pcolor_plot_panels = len(components_to_plot)
    samples_per_second = float(h5h.metadata.output_sampling_rate)
    trace_duration_in_seconds = 1.0
    samples_per_trace = int(trace_duration_in_seconds * samples_per_second)
    x_data, y_data, z_data = h5h.load_xyz()
    x_data = calibrate_data(x_data, h5_helper._get_sensitivity_xyz()[0],
                            h5_helper.metadata.accelerometer_max_voltage,
                            rhino_version=rhino_version,
                            is_ide_file=ide_file)
    y_data = calibrate_data(y_data, h5_helper._get_sensitivity_xyz()[0],
                            h5_helper.metadata.accelerometer_max_voltage,
                            rhino_version=rhino_version,
                            is_ide_file=ide_file)

    if 'x' in components_to_plot:
        frq, t_axis, Sxx = ssig.spectrogram(x_data, fs=samples_per_second, window=('hamming'),
                                             nperseg=samples_per_trace, noverlap=0, detrend='constant',
                                             return_onesided=True, scaling='density', axis=-1, mode='psd')
    if 'y' in components_to_plot:
        frq, t_axis, Syy = ssig.spectrogram(y_data, fs=samples_per_second, window=('hamming'),
                                             nperseg=samples_per_trace, noverlap=0, detrend='constant',
                                             return_onesided=True, scaling='density', axis=-1, mode='psd')
    if 'z' in components_to_plot:
        frq, t_axis, Szz = ssig.spectrogram(z_data, fs=samples_per_second, window=('hamming'),
                                             nperseg=samples_per_trace, noverlap=0, detrend='constant',
                                             return_onesided=True, scaling='density', axis=-1, mode='psd')



    f_keep_indices = np.where(frq <= frequency_high_cut)[0]
    frq = frq[f_keep_indices]
    band_indices = np.where((frq>=header_frequency_band[0]) & (frq<=header_frequency_band[1]))[0]
    #max_spectral_info_dict = {}
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


    fig, ax = plt.subplots(num_pcolor_plot_panels+1, dpi=300, sharex=True)
    #fig = plt.figure(22, figsize = (8.5, 11), dpi=300)
    #plt.subplot(num_pcolor_plot_panels+1, 1, 1)
    #<plot header>
    #for xyz in components_to_plot:
    header_linewidth = 0.7
    if 'x' in components_to_plot:
        xyz='x'
        if show_global_max:
            ax[0].plot(t_axis, max_xx, label='\nglobal max x', color=header_color_scheme['x'], linewidth=header_linewidth)
        ax[0].plot(t_axis, max_xx_band, label='in-band max x', color=header_color_scheme['x'],
          linewidth=header_linewidth, linestyle='--')#, alpha=0.5)
    if 'y' in components_to_plot:
        if show_global_max:
            ax[0].plot(t_axis, max_yy, label='global max y', color=header_color_scheme['y'], linewidth=header_linewidth)
        #ax[0].plot(t_axis, max_yy_band, label='in-band max y')
        ax[0].plot(t_axis, max_yy_band, label='in-band max y', color=header_color_scheme['y'],
          linestyle='--', linewidth=header_linewidth)#, alpha=0.5)
    if 'z' in components_to_plot:
        if show_global_max:
            ax[0].plot(t_axis, max_zz, label='global max z', color=header_color_scheme['z'], linewidth=header_linewidth)
        ax[0].plot(t_axis, max_zz_band, label='in-band max z', color=header_color_scheme['z'],
          linestyle='--', linewidth=header_linewidth)#, alpha=0.5)
        #ax[0].plot(t_axis, max_zz_band, label='in-band max z')
    #ax[0].legend(framealpha=0.1)
    #ax[0].legend(bbox_to_anchor=(1.05, 1), loc=2, borderaxespad=0., framealpha=0.1)
    ax[0].legend(bbox_to_anchor=(0., 1.02, 1., .102), loc=3,
       ncol=3, mode="expand", borderaxespad=0.)

    ttl_str = '{}, orientation={}'.format(h5_basename[:-3], meta_dict['orientation'] )
    ttl_str = '{}, band = {}'.format(ttl_str, header_frequency_band_str)
    #ax[0].set_title(ttl_str)
    plt.suptitle(ttl_str)
    #</plot header>
    i_panel_index = 1
    while i_panel_index <= num_pcolor_plot_panels:
        #ax[i_panel_index].subplot(num_pcolor_plot_panels+1, 1, i_panel)
        component_to_plot = components_to_plot.pop(0)
        if component_to_plot =='x':
            im = ax[i_panel_index].pcolormesh(t_axis, frq, np.log10(Sxx), vmin=vmin, vmax=vmax);
        elif component_to_plot == 'y':
            im = ax[i_panel_index].pcolormesh(t_axis, frq, np.log10(Syy), vmin=vmin, vmax=vmax);
        elif component_to_plot == 'z':
            im = ax[i_panel_index].pcolormesh(t_axis, frq, np.log10(Szz), vmin=vmin, vmax=vmax);
        #pdb.set_trace()
        #plt.clim(vmin=vmin, vmax=vmax)
        ax[i_panel_index].set_title('component {}'.format(component_to_plot))
        ax[i_panel_index].set_ylabel('Frequecny [Hx]')
        i_panel_index+=1
    ax[i_panel_index-1].set_xlabel('Trace index ({}[s])'.format(trace_duration_in_seconds))

    #fig.colorbar(orientation="vertical", pad=0.35)
    #fig.colorbar(im, orientation="horizontal", pad=0.1)
    #ax[i_panel_index-1].colorbar()#im, orientation="horizontal", pad=0.1)
    cbaxes = fig.add_axes([0.01, 0.1, 0.007, 0.8])
    cb = plt.colorbar(im, cax=cbaxes)
    plt.setp(cbaxes.get_xticklabels(), rotation='vertical', fontsize=10)
    cbaxes.yaxis.set_ticks_position('right')
    #plt.colorbar()
    #<save figure>
    output_path = ''
    output_file_basename = 'spectra_{}.png'.format(h5_basename[:-3])
    full_output_file = os.path.join(output_path, output_file_basename)
    plt.savefig(full_output_file)
    #<save figure>
    plt.show()




def main():
    """
    """
    use_debug_file = False
    #pdb.set_trace()
    client = 'detour_gold'; mine = 'detour_lake_mine'; h5_basename = '20181119_SSX54322_5209_3200.h5'
    #client = 'teck'; mine = 'line_creek'; h5_basename = '20180910_SSX57868_5208_2800.h5'
    #mine_path = os.path.join(home, 'data/datacloud', '{}'.format(client), '{}'.format(mine))
    mine_path = os.path.join(home, 'data/datacloud/field_data/detour_gold/detour_lake_mine')
    h5_path = os.path.join(mine_path,'level_1/piezo/3200hz', h5_basename)
    h5_path = '/home/kkappler/data/datacloud/teck/line_creek/field_data/2018-09-10/drill_31/5208/level_1/20180910_SSX57868_5208_2800.h5'
    if use_debug_file:
        h5_path = os.path.join(home, 'data/datacloud/debug/run_1542066345/20181112_RTR85545_S1021.h5')
    h5_path = '/home/natal/Downloads/1270.h5'
    h5 = h5py.File(h5_path)
    h5_helper = H5Helper(h5)
    #pdb.set_trace()
    make_spectral_qc_plot(h5_helper, components_to_plot=['x', 'y'])

    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()