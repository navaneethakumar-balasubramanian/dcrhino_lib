# -*- coding: utf-8 -*-
"""
Created on Tue Jun  5 09:20:05 2018

@author: kkappler

qc plots for Jamie and Daniel.

First cut here is intended to prototype the flow:

the parent measurand is the corr_decon*sgy measurands;




"""

from __future__ import absolute_import, division, print_function


import datetime
import glob
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

import obspy
from obspy.io.segy.core import _read_segy

from data_cloud_measurands import CorrelatedDeconvolvedSEGY
from supporting_processing import concatenate_traces

from trace_header import TRACE_HEADER_FORMAT_LIST
obspy.io.segy.header.TRACE_HEADER_FORMAT[:] = TRACE_HEADER_FORMAT_LIST
obspy.io.segy.header.TRACE_HEADER_KEYS[:] = \
    [_i[1] for _i in obspy.io.segy.header.TRACE_HEADER_FORMAT]

client_project_id = 'mont_wright'
#sensor_type = 'MEMS';full_sgy_filename = os.path.join(sensor_directory, 'corr_decon_100ms_SSX64601_BH1-BH2_Ch32.sgy')
sensor_type = 'PIEZO';#full_sgy_filename = os.path.join(sensor_directory, 'corr_decon_100ms_SSX64601_BH1-BH2_Ch08.sgy')
data_date = datetime.datetime(2018, 5, 29)
normalize_by_max_amplitude = True

corr_decon_sgy = CorrelatedDeconvolvedSEGY(client_id=client_project_id,
                                           sensor_type=sensor_type)
sensor_directory = corr_decon_sgy.sensor_directory(data_date)
png_dir = os.path.join(corr_decon_sgy.data_level_dir(2), 'PNG')
#basename = 'corr_decon_100ms_SSX64601_BH1-BH2_Ch08.sgy'
corr_files = glob.glob(sensor_directory+'/corr*sgy')
t0 = datetime.datetime(2018, 5, 29, 21, 19, 18)
dt = 0.000312
xx = np.load('x.npy')
trace_array_dict = {}
for component in ['x', 'y', 'z']:
    trace_array_dict[component] = xx
peak_ampl_x = np.random.rand(xx.shape[1])
print(len(peak_ampl_x))
for basename in corr_files:
    full_sgy_filename = os.path.join(sensor_directory, basename)
    st = _read_segy(full_sgy_filename)
    dt = 1./st.traces[0].stats.sampling_rate
    t0 = st.traces[0].stats.starttime.datetime
    normalize_by_max_amplitude = True
    #label = '{}_{}'.format(component, fname[:-4])
    #st = _read_segy(full_segy_file)
    pdb.set_trace()
    trace_array_dict = {}
    for component in ['x', 'y', 'z']:
        trace_array_dict[component] = concatenate_traces(st, component)
        trace_array_dict[component] = trace_array_dict[component].T

    num_traces_per_component, num_samples = trace_array_dict['x'].T.shape
    num_traces_total = 3*num_traces_per_component
    #trace_array = trace_array.T

    freq_string = '200U'
    rng = pd.date_range(t0, periods=num_samples, freq=freq_string)
    #num_traces_total = len(st.traces)
    x_trace_indices = range(0,num_traces_total,3)

    peak_ampl_x = np.full(num_traces_per_component, np.nan, dtype='float32')
    peak_ampl_y = np.full(num_traces_per_component, np.nan, dtype='float32')
    peak_ampl_z = np.full(num_traces_per_component, np.nan, dtype='float32')
    peak_mult_x = np.full(num_traces_per_component, np.nan, dtype='float32')

    for i_ndx, ndx in enumerate(x_trace_indices):
        if st.traces[ndx].stats.segy.trace_header.hole_id != 0:
            peak_ampl_x[i_ndx] = st.traces[ndx].stats.segy.trace_header.peak_ampl
            peak_mult_x[i_ndx] = st.traces[ndx].stats.segy.trace_header.mult_ampl
            peak_ampl_y[i_ndx] = st.traces[ndx+1].stats.segy.trace_header.peak_ampl
            #peak_mult_y[i_ndx] = st.traces[ndx+1].stats.segy.trace_header.mult_ampl
            peak_ampl_z[i_ndx] = st.traces[ndx+2].stats.segy.trace_header.peak_ampl
            #peak_mult_z[i_ndx] = st.traces[ndx+2].stats.segy.trace_header.mult_ampl
    #pdb.set_trace()
    if normalize_by_max_amplitude:
        for component in ['x', 'y', 'z']:
            nans_locations = np.where(np.isnan(trace_array_dict[component]))
            trace_array_dict[component][nans_locations]=0.0
            num_samples, num_traces = trace_array_dict[component].shape
            #pdb.set_trace()
            max_amplitudes = np.max(trace_array_dict[component], axis=0)
            trace_array_dict[component] = trace_array_dict[component]/max_amplitudes
            trace_array_dict[component][nans_locations] = np.nan

        #<kluge - for integrated test>
        #sort out spanning milliseconds
    time_duration = num_samples*dt
    time_duration_ms = 1000.* time_duration
    #plot_extent = [0, num_traces, -time_duration_ms/2., time_duration_ms/2.]
    lower_num_ms = -5
    samples_back = (np.abs(lower_num_ms))/1000./dt
    samples_back = int(np.ceil(samples_back))
    upper_num_ms = 60
    samples_fwd = upper_num_ms/1000./dt
    samples_fwd = int(np.ceil(samples_fwd))

    half_way = int(num_samples/2)
    #pdb.set_trace()
    TRD = trace_array_dict.copy()
    TRD['x'] = TRD['x'][half_way-samples_back:half_way+samples_fwd,:]
    TRD['y'] = TRD['y'][half_way-samples_back:half_way+samples_fwd,:]
    TRD['z'] = TRD['z'][half_way-samples_back:half_way+samples_fwd,:]

    TRD['x'] = np.flipud(TRD['x'])
    TRD['y'] = np.flipud(TRD['y'])
    TRD['z'] = np.flipud(TRD['z'])
    trace_array_dict = TRD
    #TODO time axis will have 2dt uncertainty
    #plot_extent = [0, num_traces, -5., 60.]
        #<kluge - for integrated test>
    #pdb.set_trace()
    #trace_array_dict['x'] = trace_array_dict['x'][320:,:]
    #<Export>
    pdb.set_trace()
    np.save('x.npy', TRD['x'])

    #</Export>
    cmap_string = 'spring'
    cmap_string = 'jet'
    fig, ax = plt.subplots(4, sharex=True, figsize=(11,8.5))#, 8.5))#figsize=(6,6))

    X = np.arange(num_traces_per_component)
    Y = np.linspace(lower_num_ms, upper_num_ms, trace_array_dict['x'].shape[0])
    Y = np.flipud(Y)
#
    ax[0].plot(X, peak_ampl_x, label='peak_x')
    ax[0].plot(X, peak_ampl_y, label='peak_y')
    ax[0].plot(X, peak_ampl_z, label='peak_z')
    ax[0].plot(X, peak_mult_x, label='mult_x')
    ax[0].legend()
    ax[0].set_title("{}-{}".format(sensor_type, os.path.basename(full_sgy_filename)))

        #ax.imshow(xx, cmap=cmap_string,  extent=[100,1500,150,-150], clim=[-0.3, 0.3])
        #<>
    #    plt.title('{}'.format(label))
    #ax[1].imshow(trace_array_dict['x'], cmap=cmap_string)#,  clim=[-0.20, 0.20])
    ax_id = 1
    y_tick_locations = 10*np.arange(7)
    y_tick_labels = ['{}'.format(x) for x in y_tick_locations]
     #pdb.set_trace()
    heatmap = ax[ax_id].pcolormesh(X, Y, trace_array_dict['x'], cmap=cmap_string,vmin=-0.1, vmax=0.1)# clim=[-0.10, 0.10])
    ax[ax_id].set_ylabel('time (ms)')
    ax[ax_id].invert_yaxis()
    ax[ax_id].set_yticks(y_tick_locations, minor=False)#, y_tick_labels)
    #cbaxes = fig.add_axes([0.8, 0.1, 0.03, 0.8])
   # cbaxes = fig.add_axes([0.0, 0.1, 0.007, 0.8])
   # cb = plt.colorbar(heatmap, cax = cbaxes)
     #[left, bottom, width, height],
#    #plt.colorbar(heatmap)
    #pdb.set_trace()
#    ax[1].colorbar()
    #ax[1].set_aspect(15)
#    cb = plt.colorbar(orientation='horizontal')
    #plt.show()
#    pdb.set_trace()
    ax[2].pcolormesh(X, Y, trace_array_dict['y'], cmap=cmap_string)#clim=[-0.20, 0.20])
    ax[2].set_ylabel('time (ms)')
    ax[2].invert_yaxis()
    ax[2].set_yticks(y_tick_locations, y_tick_labels)
    #ax[2].set_yticklabels(y_tick_locations, y_tick_labels)
    #ax[2].set_aspect(15)    #cb = plt.colorbar(orientation='horizontal')

    ax[3].pcolormesh(X, Y, trace_array_dict['z'], cmap=cmap_string)#c clim=[-0.20, 0.20])
    ax[3].set_ylabel('time (ms)')
    ax[3].set_xlabel('Trace Number')
    ax[3].invert_yaxis()
    ax[3].set_yticks(y_tick_locations, y_tick_labels)
    #ax[3].set_aspect(15)    #cb = plt.colorbar(orientation='horizontal')
    plt.tight_layout()
    out_filename = os.path.join(png_dir, sensor_type, os.path.basename(full_sgy_filename.replace('sgy', 'png')))
    print(out_filename)
    plt.show()
#    plt.savefig(out_filename)
    plt.clf()
#plt.figure(22);ticks
#plt.plot(trace_array_dict['x'][:, 350])
#
#plt.figure(23);
#plt.pcolormesh(trace_array_dict['x'])
#plt.show()
#    #plt.axes().set_aspect(5.0)
##    plt.clim([-1, 1])
##    plt.clim([-0.3, 0.3])
#    ax.set_aspect(15)
#    #pdb.set_trace()
#    if normalize_by_max_amplitude:
#        outfigname = os.path.join(out_dirname, '{}_norm_max_ampl.png'.format(label))
#    else:
#        outfigname = os.path.join(out_dirname, '{}.png'.format(label))
#    plt.savefig(outfigname)
##    pdb.set_trace()
#    if show:
#        plt.show()
##files = os.listdir(sensor_directory)
##print(files)
#print(corr_files)
#pdb.set_trace()
#print(data_level_dir)


#parent_corr_decon_sgy = '
#home = os.path.expanduser("~/")


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
