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

from obspy.io.segy.core import _read_segy

from graphical.supporting_qc_plots_v0_20180612 import qc_plot
from  graphical.supporting_qc_plots_v0_20180612 import QCPlotInputs
from supporting_processing import concatenate_traces
from dcrhino.analysis.supporting_processing import ACOUSTIC_VELOCITY
import dcrhino.analysis.measurands.measurand_registry_mont_wright as MEASURAND_REGISTRY
measurand_id = 'correlated_bandpassed_deconvolved_sgy_level1_sgy_piezo'
corr_decon_sgy_measurand = MEASURAND_REGISTRY.measurand(measurand_id)
from trace_header import define_obspy_trace_header#()TRACE_HEADER_FORMAT_LIST
from dcrhino.collection.IDEtoSEGY.trace_header import define_obspy_trace_header#()TRACE_HEADER_FORMAT_LIST
define_obspy_trace_header()

def get_dummy_data():
    x = np.load('x.npy')
    trace_array_dict = {}
    for component in ['x', 'y', 'z']:
        trace_array_dict[component] = x#concatenate_traces(st, component)
    px = np.random.rand(x.shape[1])
    #pdb.set_trace()
    qc_plot_input = QCPlotInputs(trace_array_dict=trace_array_dict, peak_ampl_x=px,
                                 peak_ampl_y=px, peak_ampl_z=px, peak_mult_x=px,
                                 lower_number_ms=-5.0, upper_number_ms=60.0,
                                 two_way_travel_time_ms=9.4,
                                 multiple_max_search_window=2.5)
    return qc_plot_input

def load_corr_segy_for_qc_plot(full_sgy_filename):
    """
    TODO: hard coded 8, shoudl be 2.5ms /dt.
    The 2.5ms need to be parameterized in multiple picker in segy proc
    """
    st = _read_segy(full_sgy_filename)
    dt = 1./st.traces[0].stats.sampling_rate
    t0 = st.traces[0].stats.starttime.datetime
    normalize_by_max_amplitude = True
    #label = '{}_{}'.format(component, fname[:-4])
    trace_array_dict = {}
    for component in ['x', 'y', 'z']:
        trace_array_dict[component] = concatenate_traces(st, component)
        trace_array_dict[component] = trace_array_dict[component].T

    center_trace_dict = {}
    try:
        dummy_hole_ids = np.asarray([x.stats.segy.trace_header.hole_id for x in st.traces])
    except AttributeError:
        dummy_hole_ids = np.asarray([x.stats.segy.trace_header.dummy_hole_id for x in st.traces])
    hole_ids_x = dummy_hole_ids[0::3]
    unique_hole_ids = list(set(hole_ids_x))
    unique_hole_ids.sort()
    if unique_hole_ids[0]==0:
        unique_hole_ids = unique_hole_ids[1:]
    for unique_hole_id in unique_hole_ids:
        center_trace_dict[unique_hole_id] = int(np.median(np.where(hole_ids_x==unique_hole_id)[0]))
    #pdb.set_trace()
    #pdb.set_trace()
    print("LOOKING FOR DEPENDENCES ON SAMPLING RATE")
    #n_holes = np.max(hole_ids)
    hole_trace_indices = {}
    #for i_hole in range(1,n_holes+1):
    for i_hole, hole_id in enumerate(unique_hole_ids):
        print('i_hole={}, hole_id = {}'.format(i_hole, hole_id))
        hole_trace_indices[hole_id] = np.where(dummy_hole_ids==hole_id)[0]
    num_traces_per_component, num_samples = trace_array_dict['x'].T.shape
    num_traces_total = 3*num_traces_per_component

    x_trace_indices = range(0,num_traces_total,3)
    peak_ampl_x = np.full(num_traces_per_component, np.nan, dtype='float32')
    peak_ampl_y = np.full(num_traces_per_component, np.nan, dtype='float32')
    peak_ampl_z = np.full(num_traces_per_component, np.nan, dtype='float32')
    peak_mult_x = np.full(num_traces_per_component, np.nan, dtype='float32')

    for i_ndx, ndx in enumerate(x_trace_indices):
        try:
            dummy_hole_id = st.traces[ndx].stats.segy.trace_header.hole_id
        except AttributeError:
            dummy_hole_id = st.traces[ndx].stats.segy.trace_header.dummy_hole_id
        if dummy_hole_id != 0:
            peak_ampl_x[i_ndx] = st.traces[ndx].stats.segy.trace_header.peak_ampl
            peak_mult_x[i_ndx] = st.traces[ndx].stats.segy.trace_header.mult_ampl
            peak_ampl_y[i_ndx] = st.traces[ndx+1].stats.segy.trace_header.peak_ampl
            peak_ampl_z[i_ndx] = st.traces[ndx+2].stats.segy.trace_header.peak_ampl
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

    #<sort out spanning milliseconds>
    lower_num_ms = -5
    upper_num_ms = 60
    #time_duration = num_samples*dt
    samples_back = (np.abs(lower_num_ms))/1000./dt
    samples_back = int(np.ceil(samples_back))
    samples_fwd = upper_num_ms/1000./dt
    samples_fwd = int(np.ceil(samples_fwd))

    half_way = int(num_samples/2)
    #pdb.set_trace()
    TRD = trace_array_dict.copy()
    TRD['x'] = TRD['x'][half_way-samples_back:half_way+samples_fwd,:]
    TRD['y'] = TRD['y'][half_way-samples_back:half_way+samples_fwd,:]
    TRD['z'] = TRD['z'][half_way-samples_back:half_way+samples_fwd,:]
    #</sort out spanning milliseconds>



    trace_array_dict = TRD
    #pdb.set_trace()
    drill_string_length = 22.352
    theoretical_two_way_travel_time = 2*drill_string_length / ACOUSTIC_VELOCITY
    qc_plot_input = QCPlotInputs(trace_array_dict=trace_array_dict, peak_ampl_x=peak_ampl_x,
                                 peak_ampl_y=peak_ampl_y, peak_ampl_z=peak_ampl_z,
                                 peak_mult_x=peak_mult_x, lower_number_ms=-5.0, upper_number_ms=60.0,
                                 center_trace_dict=center_trace_dict, two_way_travel_time_ms=theoretical_two_way_travel_time*1000.,
                                 multiple_max_search_window=1000.*8*dt)

    return qc_plot_input


client_project_id = 'mont_wright'
sensor_type = 'MEMS';#full_sgy_filename = os.path.join(sensor_directory, 'corr_decon_100ms_SSX64601_BH1-BH2_Ch32.sgy')
sensor_type = 'PIEZO';#full_sgy_filename = os.path.join(sensor_directory, 'corr_decon_100ms_SSX64601_BH1-BH2_Ch08.sgy')
data_date = datetime.datetime(2018, 5, 29)
normalize_by_max_amplitude = True
#pdb.set_trace()
corr_decon_sgy_measurand.sensor_directory(data_date)
#pdb.set_trace()

sensor_directory = corr_decon_sgy_measurand.sensor_directory(data_date)
png_dir = os.path.join(corr_decon_sgy_measurand.data_level_path(2), 'PNG')
#basename = 'corr_decon_100ms_SSX64601_BH1-BH2_Ch08.sgy'
corr_files = glob.glob(sensor_directory+'/corr*sgy')
print(corr_files)
for basename in corr_files:#[3:]:
    full_sgy_filename = os.path.join(sensor_directory, basename)

    pdb.set_trace()
    qc_plot_input = load_corr_segy_for_qc_plot(full_sgy_filename)
    #pdb.set_trace()
    #qc_plot_input = get_dummy_data(); full_sgy_filename='qwerty'
    qc_plot(qc_plot_input, sensor_type, full_sgy_filename, png_dir, data_date.date(),
            client_project_id)#px, px, px, px, trace_array_dict,
            #lower_num_ms, upper_num_ms, sensor_type, full_sgy_filename)

#    qc_plot(peak_ampl_x, peak_ampl_y, peak_ampl_z, peak_mult_x, trace_array_dict,
#            lower_num_ms, upper_num_ms))


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
