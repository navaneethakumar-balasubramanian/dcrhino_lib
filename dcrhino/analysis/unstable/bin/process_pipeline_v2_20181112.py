"""
test FIR needs to run on 1s corr trace or can it run on tirimmed?
it should be fine on either, because it is only 20ms long

start working with trimmed correlated traces
/home/kkappler/software/datacloud/dcrhino_lib/dcrhino/analysis/unstable/bin/process_pipeline_v2_20181112.py
"""
import numpy as np
#import h5py
import pandas as pd

#from ConfigParser import ConfigParser
#import argparse
import os
#import scipy

import matplotlib.pyplot as plt
import pdb
#import calendar
import scipy.signal as ssig
import warnings

warnings.filterwarnings("ignore")
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS

#from dcrhino.analysis.graphical.unbinned_qc_log_plots_v3_west_angelas import pseudodensity_panel,primary_pseudovelocity_panel,reflection_coefficient_panel

#from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotter,QCLogPlotInput
#from dcrhino.process_pipeline.feature_extractor import FeatureExtractor
from dcrhino.process_pipeline.filters import FIRLSFilter
from dcrhino.analysis.signal_processing.seismic_processing import calculate_spiking_decon_filter
from dcrhino.process_pipeline.config import Config
#from dcrhino.process_pipeline.h5_helper import H5Helper
#from dcrhino.process_pipeline.mwd_helper import MwdDFHelper
#from dcrhino.process_pipeline.io_helper import IOHelper
#plt.rcParams['figure.figsize'] = [20, 12]
#import sys

#from fatiando.vis.mpl import seismic_wiggle
from dcrhino.analysis.graphical.seismic_wiggle_fatiando_dev import seismic_wiggle
#from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotterv2
from dcrhino.analysis.signal_processing.seismic_processing import get_tangential_despike_filtered_trace_features

from dcrhino.process_pipeline_pointer import trim_trace#, get_features_extracted
from dcrhino.analysis.signal_processing.mwd_tools import reject_traces_with_small_rop
from dcrhino.analysis.signal_processing.seismic_processing import ACOUSTIC_VELOCITY, SHEAR_VELOCITY

#<supporting functions>
def init_trace_dict():
    traces_dict = {}
    traces_dict['axial'] = None
    traces_dict['tangential'] = None
    traces_dict['radial'] = None
    return traces_dict

def get_axial_tangential_radial_traces(hole_uid, flavour, trace_decimation=None,
                                       indices=None):
    """
    indices allows one to slice by some index tracker, e.g. good rop, etc
    """
    trace_dict = init_trace_dict()
    debug_file_path = os.path.join(data_path, hole_uid) + '/'
    trace_dict['axial'] = np.load(debug_file_path +'axial_{}_traces.npy'.format(flavour))
    trace_dict['tangential'] = np.load(debug_file_path + 'tangential_{}_traces.npy'.format(flavour))
    trace_dict['radial'] = np.load(debug_file_path +'radial_{}_traces.npy'.format(flavour))
    if indices is not None:
        trace_dict['axial'] = trace_dict['axial'][indices,:]
        trace_dict['tangential'] = trace_dict['tangential'][indices,:]
        trace_dict['radial'] = trace_dict['radial'][indices,:]
    if trace_decimation is not None:
        for component_label in COMPONENT_LABELS:
            traces_dict[component_label] = traces_dict[component_label][0::every_nth,:]
    return trace_dict
#</supporting functions>

#<Set High level>
mine = 'line_creek';
#mine = 'WEST_ANGELAS';
#<specify processing schemes>
processing_scheme_list = ['standard', 'phase_rotated', 'despike_decon', 'simple_correlated',]
wavelet_types = ['primary', 'mulitple_1', 'mulitple_2',]
wavelet_feature_extractor_types = ['sample', 'polynomial', 'ricker',]
component = 'tangential'
#component = 'axial'
plot_depth = 1#False
cull_rop = True
apply_adhoc_normalization = True
do_processing = False
normalize_traces_for_plotting = 0#1# False
processing_trace_decimation_factor = 7# integer
#</Set High level>

#<dev - no working yet>
processing_scheme_dict = {}
for processing_scheme in processing_scheme_list:
    processing_scheme_dict[processing_scheme] = {}
    for component_label in COMPONENT_LABELS:
        processing_scheme_dict[processing_scheme][component_label] = {}
        for wavelet_type in wavelet_types:
            processing_scheme_dict[processing_scheme][component_label][wavelet_type] = {}
            for wavelet_feature_extractor_type in wavelet_feature_extractor_types:
                print('ah')
#</dev - no working yet>

#<Config File Stuffs>
if mine=='line_creek':
    data_path = '/home/kkappler/data/datacloud/rhino_process_pipeline_output/line_creek/5208/3200'
    hole_uids = ['793-MR_77-23531', '793-MR_77-23631', '793-MR_77-23731',
                 '793-MR_77-23831', '793-MR_77-23930', '793-MR_77-24030',
                 '793-MR_77-24130',]
    sampling_rate = 3200.0
    sensor_distance_to_source = 20.967872
    every_nth = 2
elif mine=='WEST_ANGELAS':
    data_path = os.path.join('/home/kkappler/data/datacloud/rhino_process_pipeline_output/WEST_ANGELAS/5208/4000/')
    hole_uids = ['710-197-3/2018-10-18_00001', ]
    sensor_distance_to_source = 16.37
    sampling_rate = 4000.0
    every_nth = 1#4
#<Config File Stuffs>
dt= 1./sampling_rate


#<boilerplate config file settings>
#[PROCESSING]
deconvolution_filter_duration = 0.1
min_lag_trimmed_trace = -0.1
max_lag_trimmed_trace = 0.1
trapezoidal_bpf_corner_1 = 80.0
trapezoidal_bpf_corner_2 = 100.0
trapezoidal_bpf_corner_3 = 300.0
trapezoidal_bpf_corner_4 = 350.0
trapezoidal_bpf_duration = 0.02
spiking_decon_filter_duration = 0.010 #10ms; parameterize in terms of trace length
start_ms_despike_decon = 5.0
end_ms_despike_decon = 70.0
add_noise_percent = 200.0
multiple_window_search_width_ms = 3.126
global_config = Config()
global_config.output_sampling_rate = sampling_rate
global_config.min_lag_trimmed_trace = min_lag_trimmed_trace
global_config.max_lag_trimmed_trace = max_lag_trimmed_trace
global_config.sensor_distance_to_source = sensor_distance_to_source
#</boilerplate config file settings>
corners = [trapezoidal_bpf_corner_1, trapezoidal_bpf_corner_2,
           trapezoidal_bpf_corner_3, trapezoidal_bpf_corner_4,]
firls = FIRLSFilter(corners, trapezoidal_bpf_duration)
fir1_taps = firls.make(sampling_rate)
num_taps_in_decon_filter = int(deconvolution_filter_duration / dt)
n_spiking_decon_filter_taps = int(sampling_rate * spiking_decon_filter_duration)






big_feature_df = pd.DataFrame()
hole_uid = hole_uids[0]
for hole_uid in hole_uids:
    mwd_df = pd.read_csv(os.path.join(data_path, hole_uid, 'hole_mwd.csv'))
    features_df = pd.read_csv(os.path.join(data_path, hole_uid, 'extracted_features.csv'))
    if cull_rop:
        features_df = reject_traces_with_small_rop(features_df)#, threshold=0.006):
        rop_ok_indices = features_df.index
    else:
        rop_ok_indices = None
    depth = np.asarray(features_df.depth)
    interpolated_traces = get_axial_tangential_radial_traces(hole_uid, 'interpolated', indices=rop_ok_indices)
    deconvolved_traces = get_axial_tangential_radial_traces(hole_uid, 'deconvolved', indices=rop_ok_indices)
    filtered_correlated_traces = get_axial_tangential_radial_traces(hole_uid, 'filtered_correlated', indices=rop_ok_indices)
    unfiltered_correlated_traces = init_trace_dict()
    filtered_despiked_traces = init_trace_dict()
    middle = int((1+deconvolution_filter_duration)*sampling_rate/2 )
    n_back = int(sampling_rate * min_lag_trimmed_trace)
    n_advance = int(sampling_rate * max_lag_trimmed_trace)
    #pdb.set_trace()
    plotter_data = filtered_correlated_traces[component][0::every_nth,middle+n_back:middle+n_advance].T



    print("despiking decon")
    #pdb.set_trace()
    unfiltered_correlated_traces[component] = np.full(filtered_correlated_traces[component].shape, np.nan)
    filtered_despiked_traces[component] = np.full(filtered_correlated_traces[component].shape, np.nan)
    n_traces, n_samples_per_trace = interpolated_traces[component].shape
    n_spiking_decon_filter_taps
    if do_processing:
        for i_trace in range(n_traces):
            print(i_trace)
            #pdb.set_trace()
            correlated_trace = np.correlate(interpolated_traces[component][i_trace,:],
                                            deconvolved_traces[component][i_trace,:], 'same')
            unfiltered_correlated_traces[component][i_trace,:] = correlated_trace
            trimmed_filtered_correlated_trace = trim_trace(min_lag_trimmed_trace,
                                                           max_lag_trimmed_trace,
                                                           num_taps_in_decon_filter,
                                                           sampling_rate,
                                                           filtered_correlated_traces[component][i_trace,:])
            #pdb.set_trace()
            #plt.plot(trimmed_filtered_correlated_trace);plt.show()
            despiked_trace, despike_filter = calculate_spiking_decon_filter(correlated_trace,
                                                              n_spiking_decon_filter_taps,
                                                              dt, start_ms_despike_decon,
                                                              end_ms_despike_decon,
                                                              add_noise_percent=add_noise_percent)
            filtered_despiked_trace = ssig.filtfilt(fir1_taps, 1., despiked_trace).astype('float32')
            filtered_despiked_traces[component][i_trace,:] = filtered_despiked_trace
            filtered_despiked_traces[component][i_trace,:] = np.roll(filtered_despiked_trace, n_spiking_decon_filter_taps//2)
            #pdb.set_trace()793-MR_77-23531
        #np.save(os.path.join(data_path, hole_uid, 'trimmed_filtered_correlated_traces.npy'), trimmed_filtered_correlated_traces)
        filtered_despiked_filebase = '{}_filtered_despiked_traces.npy'.format(component)
        np.save(os.path.join(data_path, hole_uid, filtered_despiked_filebase), filtered_despiked_traces[component])
    #pdb.set_trace()
    filtered_despiked_filebase = '{}_filtered_despiked_traces.npy'.format(component)
    filtered_despiked_traces[component] = np.load(os.path.join(data_path, hole_uid, filtered_despiked_filebase))
    print("Key question: how do results differ from feature logs with and without adhoc normalization?")
    num_traces_to_feature_extract, samples_per_trace = filtered_despiked_traces[component].shape #(489, 4000)
    feature_list_for_df = [None] * num_traces_to_feature_extract
    for i_trace in range(num_traces_to_feature_extract):
        trace_data = filtered_despiked_traces[component][i_trace,:]
        trimmed_trace_data = trim_trace(min_lag_trimmed_trace, max_lag_trimmed_trace,
                                        num_taps_in_decon_filter, sampling_rate,
                                        filtered_despiked_traces[component][i_trace,:])
        #pdb.set_trace()
        #qq = np.max(filtered_correlated_traces[component][i_trace,:])/np.max(trimmed_trace_data)
        #trimmed_trace_data *= qq#np.max(filtered_correlated_traces[component][i_trace,:])/np.max(trimmed_trace_data)
        #pdb.set_trace()
        feature_dict = get_tangential_despike_filtered_trace_features(trimmed_trace_data, global_config, sanity_check_plot=False)
        feature_dict['tangential_amplitude_ratio'] =  np.sqrt( feature_dict['tangential_multiple1_amplitude_poly'] / feature_dict['tangential_primary_amplitude_poly'])
        feature_dict['tangential_impedance']  = (1 - feature_dict['tangential_amplitude_ratio'] ) / (1 + feature_dict['tangential_amplitude_ratio'] )
        #feature_dict['shear_modulus'] = feature_dict['tangentia(l_impedance']
        feature_dict['tangential_delay']  = feature_dict['tangential_multiple1_time_poly'] - feature_dict['tangential_primary_time_poly']
        feature_dict['hole_id'] = hole_uid
        feature_list_for_df[i_trace] = feature_dict

    #pdb.set_trace()
    tangential_feature_df = pd.DataFrame(feature_list_for_df)

    svel = 1./(tangential_feature_df['tangential_delay'])#/global_config.dt)#1./delay**4
    svel = svel**4
    tangential_feature_df['shear_velocity'] = svel/1e4
    #pdb.set_trace()
    shear_modulus = tangential_feature_df['tangential_impedance']

    plt.figure(22);plt.clf()
    n_plots=2
    plt.subplot(n_plots,1,1)
    ttl_string = "{}, {}, {} ".format(mine, hole_uid,component)
    plt.title(ttl_string)
    plt.plot(features_df.depth, svel, label='1/delay^4')
    plt.legend()
    plt.subplot(n_plots,1,2)
    plt.plot(features_df.depth, shear_modulus , label='(1-m/p) / (1+m/p)')
    plt.xlabel('depth (m)')
    plt.savefig('/home/kkappler/tlc/{}.png'.format(hole_uid))
    tangential_feature_df.index=features_df.index
    qq=pd.concat([features_df, tangential_feature_df], axis=1,)
    if len(big_feature_df) ==0:
        big_feature_df = qq
    else:
        big_feature_df = pd.concat([big_feature_df, qq], axis=0)

    despiked_plotter_data = filtered_despiked_traces[component][0::every_nth,middle+n_back:middle+n_advance].T
    if apply_adhoc_normalization:
        qq = np.max(plotter_data, axis=0)/np.max(despiked_plotter_data, axis=0)
        despiked_plotter_data *= qq
        despiked_plotter_data *= 3

    pdb.set_trace()

    print("steps in tangential multiple feature extraction:")
    print("1. specify the probable region of primary reflection")
    print("2. refine estimate of the region of primary reflection\
          based on sample of maximum (or using phases)")
    print("3. extract features (peak_value, peak_sample, peak_time_poly, and possibly troughs and zero-crossings")
    print("4,5,6: repeat 1,2,3 above for the multiple reflection")
    print('2200')
    print('This method is being developed in seismic_processing and the old code is in Halloween demo')

    if normalize_traces_for_plotting:
        divvy = plotter_data.max(axis=0)
        plotter_data /= divvy
        despiked_divvy = despiked_plotter_data.max(axis=0)
        despiked_plotter_data /= despiked_divvy
    #</normalize traces before plotting AND see if multple better>
    plt.figure(1)
    ax1 = plt.subplot(2, 1, 1)
    if plot_depth:
        seismic_wiggle(plotter_data, dt=dt, scale=1.0, color='grey', time_shift=-0.1,
                       min_t = -0.01, max_t = 0.04, depth=depth[0::every_nth], ranges=(depth[0], depth[-1]) )
    else:
        seismic_wiggle(plotter_data, dt=dt, scale=1.0, color='grey', time_shift=-0.1, min_t = -0.01, max_t = 0.04 )

    ttl_string = "{}, {}, {} Without Despike, Normalized={}".format(mine, hole_uid,
                  component, normalize_traces_for_plotting)
    plt.title(ttl_string)
    primary_horiz_line = 0.0
    if component == 'tangential':
        multiple_horiz_line_1 = primary_horiz_line + 2*sensor_distance_to_source/SHEAR_VELOCITY
        multiple_horiz_line_2 = multiple_horiz_line_1 + 2*sensor_distance_to_source/SHEAR_VELOCITY
    elif component == 'axial':
        multiple_horiz_line_1 = primary_horiz_line + 2*sensor_distance_to_source/ACOUSTIC_VELOCITY
        multiple_horiz_line_2 = multiple_horiz_line_1 + 2*sensor_distance_to_source/ACOUSTIC_VELOCITY
    alpha=0.5
    plt.hlines([primary_horiz_line,], 0, plotter_data.shape[1], color='yellow', linewidth = 3.3, alpha=alpha)
    plt.hlines([multiple_horiz_line_1,],0, plotter_data.shape[1], color='lime', linewidth = 3.3, alpha=alpha)
    plt.hlines([multiple_horiz_line_2,],0, plotter_data.shape[1], color='deeppink', linewidth = 3.3, alpha=alpha)
    plt.hlines([primary_horiz_line + 0.001*start_ms_despike_decon],0, plotter_data.shape[1], color='black', linewidth = 1.0, alpha=alpha)
    plt.hlines([primary_horiz_line + 0.001*end_ms_despike_decon],0, plotter_data.shape[1], color='black', linewidth = 1.0, alpha=alpha)
    plt.ylabel('time (s)')

    ax2 = plt.subplot(2, 1, 2, sharex=ax1, sharey=ax1)
    #plt.figure(2)
    #seismic_wiggle(despiked_plotter_data, dt=dt, scale=1.0, color='k')
    if plot_depth:
        seismic_wiggle(despiked_plotter_data, dt=dt, scale=1.0, color='black', time_shift=-0.1,
                   min_t = -0.01, max_t = 0.04, depth=depth[0::every_nth], ranges=(depth[0], depth[-1]) )
    else:
        seismic_wiggle(despiked_plotter_data, dt=dt, scale=1.0, color='black', time_shift=-0.1,
                   min_t = -0.01, max_t = 0.04)
    plt.title("With Despike")
    #primary_horiz_line = 0.0# - spiking_decon_filter_duration/2.0
    #multiple_horiz_line = primary_horiz_line + 2*sensor_distance_to_source/SHEAR_VELOCITY
    alpha=0.5
    plt.hlines([primary_horiz_line,], 0, plotter_data.shape[1], color='yellow', linewidth = 3.3, alpha=alpha)
    plt.hlines([multiple_horiz_line_1,],0, plotter_data.shape[1], color='lime', linewidth = 3.3, alpha=alpha)
    plt.hlines([multiple_horiz_line_2,],0, plotter_data.shape[1], color='deeppink', linewidth = 3.3, alpha=alpha)
    #plt.hlines([primary_horiz_line,], 0, plotter_data.shape[1], color='yellow', linewidth = 3.3, alpha=alpha)
    plt.hlines([primary_horiz_line + 0.001*start_ms_despike_decon],0, plotter_data.shape[1], color='black', linewidth = 1.0, alpha=alpha)
    plt.hlines([primary_horiz_line + 0.001*end_ms_despike_decon],0, plotter_data.shape[1], color='black', linewidth = 1.0, alpha=alpha)
    plt.ylabel('time (s)')
    if plot_depth:
        plt.xlabel('depth (m)')
    else:
        plt.xlabel('trace')
    plt.show()

#extractor = FeatureExtractor(global_config.output_sampling_rate,global_config.primary_window_halfwidth_ms,global_config.multiple_window_search_width_ms,sensor_distance_to_source=global_config.sensor_distance_to_source)



big_feature_df.to_csv('/home/kkappler/tlc/tlc.csv')

print("TODO: ask sumant for an atomic depth plotter and time plotter that works\
      with only these inputs loaded so far")


print("TODO: load timestamps or pull from dataframe")

