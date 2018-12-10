"""
Example usage for time plot
python process_pipeline.py -h5 ~/data/datacloud/debug/run_1542066345/20181112_RTR85545_S1021.h5 -o /tmp/ -t True
Example usage for mwd plot
python process_pipeline.py -h5 20180504_SSX55470_5306_4000.h5 -mwd mount_milligan_raw.csv  -icl weight_on_bit,rop,torque,vibration,rpm,air_pressure -ric machine_id -sc time_start_utc -ec time_end_utc -mc MSE -tobc torque -wobc weight_on_bit
"""
import argparse
import calendar
import h5py
import json
import numpy as np
import matplotlib.pyplot as plt
import os
import pdb
import pandas as pd
import scipy
import scipy.signal as ssig
import sys
import warnings

from ConfigParser import ConfigParser
from datetime import datetime
from functools import partial
from operator import is_not


warnings.filterwarnings("ignore")


#from dcrhino.analysis.graphical.unbinned_qc_log_plots_v3_west_angelas import pseudodensity_panel,primary_pseudovelocity_panel,reflection_coefficient_panel
#from dcrhino.analysis.math.mwd_tools import interpolate_to_assign_depths_to_log_csv
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.signal_processing.seismic_processing import calculate_spiking_decon_filter
from dcrhino.process_pipeline.config import Config
from dcrhino.process_pipeline.feature_extractor import FeatureExtractor
from dcrhino.process_pipeline.filters import FIRLSFilter
from dcrhino.process_pipeline.h5_helper import H5Helper
from dcrhino.process_pipeline.io_helper import IOHelper
from dcrhino.process_pipeline.mwd_helper import MwdDFHelper
from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotter,QCLogPlotInput
from dcrhino.process_pipeline.qc_log_plotter_nomwd import QCLogPlotter_nomwd
from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotterv2
#plt.rcParams['figure.figsize'] = [20, 12]



BIN_PATH = os.path.dirname(os.path.abspath(__file__))

def get_ts_array_indexes(ts,arr):
    return np.array(np.where(arr == int(ts)))

def get_values_from_index(index_ar, values_ar, dtype):
    return values_ar[index_ar.min():index_ar.max()]

def apply_calibration(is_ide_file,values_arr,sensitivity,accelerometer_max_voltage):
    output = values_arr

    #pdb.set_trace()
    if is_ide_file:
        # TODO CHECK THAT
        # NATAL SAID ITS CORRECT!
        return output / sensitivity
    else:
        output = (output * 5.0) / 65535
        output = (accelerometer_max_voltage/2.0) - output
        output = output / (sensitivity/1000.0)
        return output

def interpolate_data(ideal_timestamps, digitizer_timestamps, data):
        interp_data = np.interp(ideal_timestamps,digitizer_timestamps,data)
        return interp_data


def autocorrelate_trace(trace_data, n_pts):
    """
    @type trace_data: numpy array
    @param trace_data: the time series to autocorrelate
    @type n_pts: integer
    @param n_pts: the max lag to consider in autocorrelation
    @warning: trace_data is assumed to be an even number of points, not tested
    for odd trace length
    """
    zero_time_index = len(trace_data) // 2
    acorr = np.correlate(trace_data, trace_data,'same')
    return acorr[zero_time_index:zero_time_index+n_pts]

def deconvolve_trace(deconvolution_filter_duration, num_taps_in_decon_filter, data):
    """
    deconvolution_filter_duration:
    """
    deconvolution_filter_duration = float(deconvolution_filter_duration)
    R_xx = autocorrelate_trace(data, num_taps_in_decon_filter)
    # EMPTY DATA
    if data.min() == 0.0 and data.max() == 0.0:
        return data, R_xx[0]
    ATA = scipy.linalg.toeplitz(R_xx)
    nominal_scale_factor = 1.0;#1./R_xx[0]#1.0
    ATA = scipy.linalg.toeplitz(R_xx)
    try:
        ATAinv = scipy.linalg.inv(ATA)
    except np.linalg.linalg.LinAlgError:
        #logger.error('matrix inversion failed')
        print('matrix inversion failed')
        return data, R_xx[0]
    x_filter = nominal_scale_factor*ATAinv[0,:]
    deconv_trace = np.convolve(x_filter, data, 'same')
    return deconv_trace, R_xx[0]





def correlate_trace( original_data, decon_data):
        correlated_trace = np.correlate(original_data, decon_data, 'same')
        return correlated_trace


def bandpass_filter_trace(output_sampling_rate, trapezoidal_bpf_corner_1,
                          trapezoidal_bpf_corner_2, trapezoidal_bpf_corner_3,
                          trapezoidal_bpf_corner_4, trapezoidal_bpf_duration, data):
    """
    TODO: calculate fir_taps once per header and leave fixed ...
    """
    sampling_rate = float(output_sampling_rate)
    corners = [trapezoidal_bpf_corner_1,
               trapezoidal_bpf_corner_2,
               trapezoidal_bpf_corner_3,
               trapezoidal_bpf_corner_4,]
    fir_duration = trapezoidal_bpf_duration# = 0.02

    firls = FIRLSFilter(corners, fir_duration)

    #pdb.set_trace()
    fir_taps = firls.make(sampling_rate)

    if (len(fir_taps) == 1) and (fir_taps[0]==1.0):
        bpf_data = data
    else:
        bpf_data = ssig.filtfilt(fir_taps, 1., data).astype('float32')

    #bpf_data = ssig.lfilter(fir_filter.taps, 1., tr_corr_w_deconv).astype('float32')
    #bpf_data = ssig.lfilter(fir_filter.taps, 1., bpf_data).astype('float32')

    return bpf_data


def trim_trace(min_lag_trimmed_trace, max_lag_trimmed_trace,num_taps_in_decon_filter,output_sampling_rate, data):
        """
        add min_lag and max_lag
        """
        min_lag = min_lag_trimmed_trace
        max_lag = max_lag_trimmed_trace
        zero_time_index = len(data) // 2
        decon_filter_offset = num_taps_in_decon_filter // 2
        t0_index = zero_time_index + decon_filter_offset #2750
        sampling_rate = float(output_sampling_rate)
        n_samples_back = int(sampling_rate * np.abs(min_lag))
        n_samples_fwd = int(sampling_rate * max_lag)

        back_ndx = t0_index - n_samples_back
        fin_ndx = t0_index + n_samples_fwd

        little_data = data[back_ndx:fin_ndx]
        return little_data


def get_axial_tangential_radial_traces(start_time_ts, end_time_ts, entire_xyz,
                                       ts_data, sensitivity_xyz, is_ide_file,
                                       accelerometer_max_voltage, global_config,
                                       debug_file_name='', debug=True):
    """
    @warning: 20181113: This method appears harc coded to 1s traces ...
    not good if we want to change this is going to require a fundamentally
    different iterator.  Iterator is currently actual_ts, which stands for
    actual_time_stamp maybe?

    ::axial_traces:: these are the traces that are input to the feature extractor

    """

    entire_ts = ts_data
    entire_ts_int = entire_ts.astype(int)

    if len(sensitivity_xyz) != 3:
        print ("Could not read xyz sensitivity")
        raise SystemExit

    actual_ts = start_time_ts
    end = end_time_ts
    interval_seconds = (int(end_time_ts) - int(start_time_ts))
    trace_duration = 1.0
    num_traces_to_process = int(interval_seconds / trace_duration)
    #samples_per_trace = int(trace_duration / global_config.dt)
    samples_per_trace = int(np.round(trace_duration / global_config.dt))#Changed as per KK
    samples_per_trimmed_trace = global_config.n_samples_trimmed_trace

    print ("Getting axial,tangential,radial traces from interval: " + str(start_time_ts) +  " - " + str(end_time_ts) + " total of " + str(interval_seconds) + " seconds")
    axial_traces = np.full((num_traces_to_process, samples_per_trimmed_trace), np.nan)
    radial_traces = np.full((num_traces_to_process, samples_per_trimmed_trace), np.nan)
    tangential_traces = np.full((num_traces_to_process, samples_per_trimmed_trace), np.nan)
    ts = [None] * interval_seconds



    if debug:
        axial_deconvolved_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        radial_deconvolved_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        tangential_deconvolved_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)

        axial_interpolated_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        radial_interpolated_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        tangential_interpolated_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)

        axial_unfiltered_correlated_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        radial_unfiltered_correlated_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        tangential_unfiltered_correlated_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)

        axial_filtered_correlated_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        radial_filtered_correlated_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        tangential_filtered_correlated_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)

        #<despike decon add>
        axial_despike_unfiltered_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        radial_despike_unfiltered_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        tangential_despike_unfiltered_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)

        axial_despike_filtered_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        radial_despike_filtered_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        tangential_despike_filtered_traces = np.full((num_traces_to_process, samples_per_trace), np.nan)
        #</despike decon add>

        #Natal's changes
        interval_second_index = 0
        acceleration_stats = [None] * interval_seconds
        # acceleration_stats = []

    while actual_ts < end:
        trace_index = actual_ts - start_time_ts
        indexes_array_of_actual_second = get_ts_array_indexes(actual_ts,entire_ts_int)

        # PREVENT CRASH IF THERES NO DATA ON THE LASTS SECONDS OF THE HOLE
        if len(indexes_array_of_actual_second[0]) == 0:
            print ("Missing " , actual_ts)
            ts[trace_index] = actual_ts
            actual_ts += 1
            continue

        ts_actual_second = get_values_from_index(indexes_array_of_actual_second,entire_ts,np.float64)
        ts_actual_second = ts_actual_second-int(ts_actual_second[0])


        results = [None] * len(entire_xyz)
        if debug:
            results_deconvolved = [None] * len(entire_xyz)
            results_interpolated = [None] * len(entire_xyz)
            results_unfiltered = [None] * len(entire_xyz)
            results_filtered = [None] * len(entire_xyz)
            results_despike_unfiltered = [None] * len(entire_xyz)
            results_despike_filtered = [None] * len(entire_xyz)


            #Natal's changes
            row = [actual_ts,0,0,0,0,0,0]
            start_index=[1,3,5]

        for i, data in enumerate(entire_xyz):
            actual_second = get_values_from_index(indexes_array_of_actual_second,data,np.float32)


            sensitivity = sensitivity_xyz[i]

            calibrated_actual_second = apply_calibration(is_ide_file,actual_second,sensitivity,accelerometer_max_voltage)

            #Natal's changes
            # pdb.set_trace()
            row[start_index[i]] = np.max(calibrated_actual_second)
            row[start_index[i]+1] = np.min(calibrated_actual_second)


            # Save to npy file calibrated_actual_second
            interpolated_actual_second = interpolate_data(global_config.ideal_timestamps, ts_actual_second, calibrated_actual_second)
            deconvolved_data_actual_second, r_xx0 = deconvolve_trace(global_config.deconvolution_filter_duration,global_config.num_taps_in_decon_filter,interpolated_actual_second)
            correlated_trace_actual_second = correlate_trace(interpolated_actual_second,deconvolved_data_actual_second)
            filtered_correlated_trace_actual_second = bandpass_filter_trace(global_config.sampling_rate,
                                                                            global_config.trapezoidal_bpf_corner_1,
                                                                            global_config.trapezoidal_bpf_corner_2,
                                                                            global_config.trapezoidal_bpf_corner_3,
                                                                            global_config.trapezoidal_bpf_corner_4,
                                                                            global_config.trapezoidal_bpf_duration,
                                                                            correlated_trace_actual_second)
            #pdb.set_trace()
            trimmed_filtered_correlated_trace_actual_second = trim_trace(global_config.min_lag_trimmed_trace,
                                                                         global_config.max_lag_trimmed_trace,
                                                                         global_config.num_taps_in_decon_filter,
                                                                         global_config.sampling_rate,
                                                                         filtered_correlated_trace_actual_second)

            despiked_trace, despike_filter = calculate_spiking_decon_filter(correlated_trace_actual_second,
                                                          global_config.n_spiking_decon_filter_taps,
                                                          global_config.dt, global_config.start_ms_despike_decon,
                                                          global_config.end_ms_despike_decon,
                                                          add_noise_percent=global_config.add_noise_percent)
            despiked_trace = np.roll(despiked_trace, global_config.n_spiking_decon_filter_taps//2)
            #pdb.set_trace()
            filtered_despiked_trace_actual_second = bandpass_filter_trace(global_config.sampling_rate,
                                                                global_config.trapezoidal_bpf_corner_1,
                                                                global_config.trapezoidal_bpf_corner_2,
                                                                global_config.trapezoidal_bpf_corner_3,
                                                                global_config.trapezoidal_bpf_corner_4,
                                                                global_config.trapezoidal_bpf_duration,
                                                                despiked_trace)

            results[i] = trimmed_filtered_correlated_trace_actual_second

            if debug:
                results_deconvolved[i] = deconvolved_data_actual_second
                results_interpolated[i] = interpolated_actual_second
                results_unfiltered[i] = correlated_trace_actual_second
                results_filtered[i] = filtered_correlated_trace_actual_second
                results_despike_unfiltered[i] = despiked_trace
                results_despike_filtered[i] = filtered_despiked_trace_actual_second

        #Natal's changes
        # acceleration_stats.append(row)
        acceleration_stats[interval_second_index]=row
        interval_second_index+=1

#        for component_label in COMPONENT_LABELS:
#            component_
#        COMPONENT_IDS = []
        #pdb.set_trace()
        axial_index = global_config.get_component_index('axial')
        tangential_index = global_config.get_component_index('tangential')
        radial_index = global_config.get_component_index('radial')
        axial_trace = results[axial_index]
        tangential_trace = results[tangential_index]
        radial_trace = results[radial_index]
        if debug:
            axial_deconvolved_trace = results_deconvolved[axial_index]
            radial_deconvolved_trace = results_deconvolved[radial_index]
            tangential_deconvolved_trace = results_deconvolved[tangential_index]

            axial_unfiltered_correlated_trace = results_unfiltered[axial_index]
            radial_unfiltered_correlated_trace = results_unfiltered[radial_index]
            tangential_unfiltered_correlated_trace = results_unfiltered[tangential_index]

            axial_filtered_correlated_trace = results_filtered[tangential_index]
            radial_filtered_correlated_trace = results_filtered[radial_index]
            tangential_filtered_correlated_trace = results_filtered[tangential_index]

            axial_interpolated_trace = results_interpolated[tangential_index]
            radial_interpolated_trace = results_interpolated[radial_index]
            tangential_interpolated_trace = results_interpolated[tangential_index]

            #<despike decon add>
            axial_despike_unfiltered_trace = results_despike_unfiltered[tangential_index]
            radial_despike_unfiltered_trace = results_despike_unfiltered[radial_index]
            tangential_despike_unfiltered_trace = results_despike_unfiltered[tangential_index]

            axial_despike_filtered_trace = results_despike_filtered[tangential_index]
            radial_despike_filtered_trace = results_despike_filtered[radial_index]
            tangential_despike_filtered_trace = results_despike_filtered[tangential_index]
            #</despike decon add>

        axial_traces[trace_index] = np.array(axial_trace)
        tangential_traces[trace_index] = np.array(tangential_trace)
        radial_traces[trace_index] = np.array(radial_trace)
        ts[trace_index] = actual_ts

        if debug:
            axial_deconvolved_traces[trace_index,:] = axial_deconvolved_trace
            tangential_deconvolved_traces[trace_index,:] = tangential_deconvolved_trace
            radial_deconvolved_traces[trace_index,:] = radial_deconvolved_trace

            axial_unfiltered_correlated_traces[trace_index,:] = axial_unfiltered_correlated_trace
            tangential_unfiltered_correlated_traces[trace_index,:] = tangential_unfiltered_correlated_trace
            radial_unfiltered_correlated_traces[trace_index,:] = radial_unfiltered_correlated_trace

            axial_filtered_correlated_traces[trace_index,:] = axial_filtered_correlated_trace
            tangential_filtered_correlated_traces[trace_index,:] = tangential_filtered_correlated_trace
            radial_filtered_correlated_traces[trace_index,:] = radial_filtered_correlated_trace

            axial_interpolated_traces[trace_index,:] = axial_interpolated_trace
            tangential_interpolated_traces[trace_index,:] = tangential_interpolated_trace
            radial_interpolated_traces[trace_index,:] = radial_interpolated_trace

            #<despike decon add>
            axial_despike_unfiltered_traces[trace_index,:] = axial_despike_unfiltered_trace
            radial_despike_unfiltered_traces[trace_index,:] = radial_despike_unfiltered_trace
            tangential_despike_unfiltered_traces[trace_index,:] = tangential_despike_unfiltered_trace

            axial_despike_filtered_traces[trace_index,:] = axial_despike_filtered_trace
            radial_despike_filtered_traces[trace_index,:] = radial_despike_filtered_trace
            tangential_despike_filtered_traces[trace_index,:] = tangential_despike_filtered_trace
            #</despike decon add>
        actual_ts += 1


    ts = np.asarray(ts)




    if debug:
        #print (axial_deconvolved_traces.shape)
        np.save(debug_file_name+'axial_deconvolved_traces.npy',axial_deconvolved_traces)
        np.save(debug_file_name+'tangential_deconvolved_traces.npy',tangential_deconvolved_traces)
        np.save(debug_file_name+'radial_deconvolved_traces.npy',radial_deconvolved_traces)

        np.save(debug_file_name+'axial_unfiltered_correlated_traces.npy',axial_unfiltered_correlated_traces)
        np.save(debug_file_name+'tangential_unfiltered_correlated_traces.npy',tangential_unfiltered_correlated_traces)
        np.save(debug_file_name+'radial_unfiltered_correlated_traces.npy',radial_unfiltered_correlated_traces)

        np.save(debug_file_name+'axial_filtered_correlated_traces.npy',axial_filtered_correlated_traces)
        np.save(debug_file_name+'tangential_filtered_correlated_traces.npy',tangential_filtered_correlated_traces)
        np.save(debug_file_name+'radial_filtered_correlated_traces.npy',radial_filtered_correlated_traces)

        np.save(debug_file_name+'axial_interpolated_traces.npy',axial_interpolated_traces)
        np.save(debug_file_name+'tangential_interpolated_traces.npy',tangential_interpolated_traces)
        np.save(debug_file_name+'radial_interpolated_traces.npy',radial_interpolated_traces)

        np.save(debug_file_name+'axial_despike_unfiltered_traces.npy',axial_despike_unfiltered_traces)
        np.save(debug_file_name+'tangential_despike_unfiltered_traces.npy',tangential_despike_unfiltered_traces)
        np.save(debug_file_name+'radial_despike_unfiltered_traces.npy',radial_despike_unfiltered_traces)

        np.save(debug_file_name+'axial_despike_filtered_traces.npy',axial_despike_filtered_traces)
        np.save(debug_file_name+'tangential_despike_filtered_traces.npy',tangential_despike_filtered_traces)
        np.save(debug_file_name+'radial_despike_filtered_traces.npy',radial_despike_filtered_traces)
        #Natal's Changes
        #pdb.set_trace()
        cleaned_acceleration_stats = filter(partial(is_not, None), acceleration_stats)
        accel_df =pd.DataFrame(cleaned_acceleration_stats,columns=["Timestamp","max_x","min_x","max_y","min_y","max_z","min_z"])
        accel_df.to_csv(debug_file_name+'acceleration_values_by_second.csv', index=False)

    return [axial_traces,tangential_traces,radial_traces,ts]

def get_features_extracted(extractor,axial_traces,tangential_traces,radial_traces,ts_array, global_config):
    print ("Extracting features")
    initial_ts = ts_array[0]
    extracted_features_list = [None] * len(ts_array)
    for i, actual_ts in enumerate(ts_array):
        axial_trace = axial_traces[i]
        tangential_trace = tangential_traces[i]
        radial_trace = radial_traces[i]

        if axial_trace is None:
            print ("Missing " + str((initial_ts+i)) + " in this h5 file sequence")
            #continue

        extracted_features = extractor.extract_features(actual_ts,axial_trace,tangential_trace,radial_trace,global_config.n_samples_trimmed_trace,-global_config.min_lag_trimmed_trace)
        extracted_features_list[i] = extracted_features

    print ("Features extracted")
    return extracted_features_list





def main():
    """
    """
    #<sort out args>
    argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-h5', '--h5-path', help="H5 File Path", default=None)
    argparser.add_argument('-mwd', '--mwd-path', help="MWD File Path", default=None)
    argparser.add_argument('-cfg', '--cfg-path', help="CFG File Path", default=None)
    argparser.add_argument('-ric', '--rig-id-column', help="RIG ID COLUMN", default='rig')
    argparser.add_argument('-sc', '--start-time-column', help="START TIME COLUMN", default='starttime')
    argparser.add_argument('-ec', '--end-time-column', help="END TIME COLUMN", default='endtime')
    argparser.add_argument('-hc', '--hole-column', help="HOLE COLUMN", default='hole')
    argparser.add_argument('-mc', '--mse-column', help="MSE COLUMN", default='mse')
    argparser.add_argument('-bc', '--bench-column', help="BENCH COLUMN", default='bench')
    argparser.add_argument('-ropc', '--rop-column', help="ROP COLUMN", default='rop')
    argparser.add_argument('-wobc', '--wob-column', help="WOB COLUMN", default='wob')
    argparser.add_argument('-tobc', '--tob-column', help="TOB COLUMN", default='tob')
    argparser.add_argument('-eastc', '--easting-column', help="EASTING COLUMN", default='easting')
    argparser.add_argument('-nortc', '--northing-column', help="NORTHING COLUMN", default='northing')
    argparser.add_argument('-pc', '--pattern-column', help="PATTERN COLUMN", default='pattern')
    argparser.add_argument('-cec', '--collar-elevation-column', help="COLLAR ELEVATION COLUMN", default='collar_elevation')
    argparser.add_argument('-compec', '--computed-elevation-column', help="COMPUTED ELEVATION COLUMN", default='computed_elevation')
    argparser.add_argument('-holeindex', '--hole-index', help="HOLE INDEX", default=False)
    argparser.add_argument('-icl', '--interpolated-column-names', help="INTERPOLATED COLUMN NAMES", default='')
    argparser.add_argument('-i', '--interactive-mode', help="INTERACTIVE MODE", default=False)
    argparser.add_argument('-t','--time-processing',help="TIME PROCESSING ONLY",default=False)
    argparser.add_argument('-o','--output-folder',help="OUTPUT FOLDER",default=False)
    argparser.add_argument('-mmap', '--mwd-map-json', help="MWD MAP JSON", default=False)
    args = argparser.parse_args()

    start_time_column = args.start_time_column
    end_time_column = args.end_time_column
    bench_column = args.bench_column
    pattern_column = args.pattern_column
    hole_column = args.hole_column
    collar_elevation_column = args.collar_elevation_column
    computed_elevation_column = args.computed_elevation_column
    rig_id_column = args.rig_id_column
    interpolated_column_names = str(args.interpolated_column_names).split(",")
    mse_column = args.mse_column
    rop_column = args.rop_column
    wob_column = args.wob_column
    tob_column = args.tob_column
    easting_column = args.easting_column
    northing_column = args.northing_column
    hole_index = args.hole_index
    interactive_mode = args.interactive_mode
    output_folder = args.output_folder
    mwd_map_json_path = args.mwd_map_json
    #</sort out args>

    print ("H5 file path:" , args.h5_path)
    print ("MWD file path:" , args.mwd_path)
    print ("MWD MAP file path:" , args.mwd_map_json)
    #print ("Client Config file path:" , args.client_config_path)
    print ("Config file path:" , args.cfg_path)

    # Read Config
    config_parser = ConfigParser()
    if args.cfg_path is not None:
        config_parser.read(args.cfg_path)

    mwd_map = False
    if mwd_map_json_path:
        with open(mwd_map_json_path) as f:
          mwd_map = json.load(f)



    # Read Env Config Parser
    env_config_parser = ConfigParser()
    env_config_parser.read(os.path.join(BIN_PATH,'env.cfg'))

    #pdb.set_trace()
    f1 = h5py.File(args.h5_path,'r+')
    h5_helper = H5Helper(f1)

    # DATA FROM H5 CONFIG HEADER
    metadata = h5_helper.metadata
    global_config = Config(metadata,env_config_parser,config_parser)
    #pdb.set_trace()
    io_helper = IOHelper(global_config)
    print (io_helper.get_mine_path())

    accelerometer_max_voltage = float(f1.attrs['PLAYBACK/accelerometer_max_voltage'])

    print ("Mine name = " + global_config.mine_name)
    print ("Rig id = " + global_config.rig_id)
    print ("sensor_serial_number = " + global_config.sensor_serial_number)
    print ("H5 data from " + str(h5_helper.min_dtime) + " to " + str(h5_helper.max_dtime))

    extractor = FeatureExtractor(global_config.output_sampling_rate,global_config.primary_window_halfwidth_ms,global_config.multiple_window_search_width_ms,sensor_distance_to_source=global_config.sensor_distance_to_source)

    if args.time_processing:
        #pdb.set_trace()
        sourcefilename = os.path.basename(args.h5_path).split(".")[0]
        bph_string = "this will be the title"
        start_ts = int(h5_helper.min_ts)
        end_ts = int(h5_helper.max_ts)
        if output_folder:
            temppath = os.path.join(output_folder,io_helper.get_output_base_path(sourcefilename))
            io_helper.make_dirs_if_needed(temppath)
        else:
            temppath = io_helper.get_output_base_path(sourcefilename)

        append_mode = False
        if 'ts.npy' in os.listdir(temppath):
            previous_ts_array = np.load(os.path.join(temppath,'ts.npy'))
            previous_end_ts = previous_ts_array[-1]
            print "File in folder",previous_end_ts,end_ts
            if end_ts > previous_end_ts+1:
                append_mode = True
                print "changed start ts to ",previous_end_ts+1
                start_ts = previous_end_ts+1
            else:
                print "File in the output folder have more time than the input file"
                sys.exit(1)


        axial, tangential, radial, ts_array = get_axial_tangential_radial_traces(start_ts, end_ts, h5_helper.data_xyz, h5_helper.ts, h5_helper.sensitivity_xyz, h5_helper.is_ide_file, accelerometer_max_voltage, global_config,
                                                                                 debug_file_name=os.path.join(temppath,''))
        # pdb.set_trace()
        extracted_features_list = get_features_extracted(extractor,axial,tangential,radial,ts_array, global_config)
        extracted_features_df = pd.DataFrame(extracted_features_list)

        axial_file_path = os.path.join(temppath,'axial.npy')
        tangential_file_path = os.path.join(temppath,'tangential.npy')
        radial_file_path = os.path.join(temppath,'radial.npy')
        ts_file_path = os.path.join(temppath,'ts.npy')
        extracted_features_df_path = os.path.join(temppath,"extracted_features.csv")

        if append_mode:
            axial = np.concatenate((np.load(axial_file_path), axial))
            tangential = np.concatenate((np.load(tangential_file_path), tangential))
            radial = np.concatenate((np.load(radial_file_path), radial))
            ts_array = np.concatenate((np.load(ts_file_path), ts_array))
            extracted_features_df = pd.concat([pd.read_csv(extracted_features_df_path), extracted_features_df])

        np.save(axial_file_path,axial)
        np.save(tangential_file_path,tangential)
        np.save(radial_file_path,radial)
        np.save(ts_file_path,ts_array)

        extracted_features_df.to_csv(extracted_features_df_path, index=False)
        extracted_features_df['start_ts'] = start_ts
        extracted_features_df['end_ts'] = end_ts

        qclogplotter_time = QCLogPlotter_nomwd(axial,tangential,radial,extracted_features_df,bph_string,os.path.join(temppath,'time_plot.png'),global_config,start_ts,end_ts)
        qclogplotter_time.plot()

        file = open(os.path.join(temppath,'log.txt'),'w')

        file.write("Time processing only")
        file.write("\nH5 file path: " + str(args.h5_path))
        file.write("\nConfig file path: " + str(args.cfg_path))

        file.close()

        with open(os.path.join(temppath,'global_config.json'), 'w') as outfile:
            json.dump(vars(global_config), outfile,indent=4)




    else:

        mwd_df = pd.read_csv(args.mwd_path)
        mwd_helper = MwdDFHelper(mwd_df,
                               start_time_column=start_time_column,
                               end_time_column=end_time_column,
                               #end_depth_column=end_depth_column,
                               bench_column=bench_column,
                               pattern_column=pattern_column,
                               hole_column=hole_column,
                               collar_elevation_column=collar_elevation_column,
                               computed_elevation_column=computed_elevation_column,
                               rig_id_column=rig_id_column,
                               mse_column=mse_column,
                               rop_column=rop_column,
                               tob_column=tob_column,
                               wob_column=wob_column,
                               easting_column=easting_column,
                               northing_column=northing_column,
                               mwd_map=mwd_map)

        if mwd_helper is False:
            sys.exit("Error in mwd dataframe.")


        holes_array = mwd_helper.get_holes_df_from_rig_timeinterval(mwd_df,global_config.rig_id, h5_helper.min_dtime, h5_helper.max_dtime)

        print ("Identified ", len(holes_array) , " holes in this combination of mwd and h5")



        if interactive_mode:
    #             cb = plt.colorbar(heatmap1, cax = cbaxes)
    #             ax[2], heatmap2 = plot_hole_as_heatmap(ax[2], cbal.v_min_2, cbal.v_max_2, X, Y,
    #               trace_array_dict['tangential'], cmap_string, y_tick_locations)#,
    #
    #             ax[3], heatmap3 = plot_hole_as_heatmap(ax[3], cbal.v_min_3, cbal.v_max_3, X, Y,
    #               trace_array_dict['radial'], cmap_string, y_tick_locations)#,
    #
    # #        plt.tight_layout()
    #             if colourbar_type=='all_one':
    #                 cbaxes = fig.add_axes([0.01, 0.1, 0.007, 0.8])
    #                 cb = plt.colorbar(heatmap1, cax = cbaxes)
    #                 plt.setp(cbaxes.get_xticklabels(), rotation='vertical', fontsize=10)
    #                 cbaxes.yaxis.set_ticks_position('right')

        		#<Labeling>

                for i,hole in enumerate(holes_array):
                    bph_string = str(hole[bench_column].values[0]) + "-" + str(hole[pattern_column].values[0])  + "-" + str(hole[hole_column].values[0])
                    print str(i) + " - " + bph_string
                try:
                    hole_index=int(raw_input('Chose one hole number to be processed:'))
                except ValueError:
                    print "Not a number"
                    exit()



        for i,hole in enumerate(holes_array):
            bph_string = str(hole[mwd_helper.bench_column_name].values[0]) + "-" + str(hole[mwd_helper.pattern_column_name].values[0])  + "-" + str(hole[mwd_helper.hole_column_name].values[0])
            if hole_index and i != hole_index:
                print ("Ignoring hole " + bph_string)
                continue

            hole_uid = bph_string
            print ("Processing : " + bph_string + " from: " + str(hole[mwd_helper.start_time_column_name].min()) + " to " + str(hole[mwd_helper.end_time_column_name].max()))

            if len(hole) == 1:
                print ("Error in this hole. Please check mwd, there should be more than one line.")
                continue

            start_ts = calendar.timegm(hole[mwd_helper.start_time_column_name].min().timetuple())
            end_ts = calendar.timegm(hole[mwd_helper.end_time_column_name].max().timetuple())
            if start_ts < h5_helper.min_ts:
                start_ts = h5_helper.min_ts

            if end_ts > h5_helper.max_ts:
                print("MWD HAS MORE TIME THAN THE H5" ,end_ts,int(h5_helper.max_ts))
                end_ts = int(h5_helper.max_ts)

            if output_folder:
                temppath = io_helper.get_output_base_path(hole_uid,output_folder)
                io_helper.make_dirs_if_needed(temppath)
            else:
                temppath = io_helper.get_output_base_path(hole_uid)

            axial_file_path = os.path.join(temppath,'axial.npy')
            tangential_file_path = os.path.join(temppath,'tangential.npy')
            radial_file_path = os.path.join(temppath,'radial.npy')
            ts_file_path = os.path.join(temppath,'ts.npy')

            if os.path.isfile(axial_file_path):
                print ("Using cached files")
                axial = np.load(axial_file_path)
                tangential = np.load(tangential_file_path)
                radial = np.load(radial_file_path)
                ts_array = np.load(ts_file_path)
            else:
                axial, tangential, radial, ts_array = get_axial_tangential_radial_traces(
#                    start_ts, end_ts, h5_helper.data_xyz, h5_helper.ts, h5_helper.sensitivity_xyz,debug_file_name=os.path.join(temppath,''))
                start_ts, end_ts, h5_helper.data_xyz, h5_helper.ts, h5_helper.sensitivity_xyz, h5_helper.is_ide_file, accelerometer_max_voltage, global_config,
                                                                                 debug_file_name=os.path.join(temppath,''))
                np.save(os.path.join(temppath,'axial.npy'),axial)
                np.save(os.path.join(temppath,'tangential.npy'),tangential)
                np.save(os.path.join(temppath,'radial.npy'),radial)
                np.save(os.path.join(temppath,'ts.npy'),ts_array)

            extracted_features_list = get_features_extracted(extractor,axial,tangential,radial,ts_array, global_config)

            # CREATE TIMEVECTOR WITHOUT MISSING SECONDS
            time_vector = [None]*len(extracted_features_list)
            count = 0
            for ts in ts_array:
                if ts is not None:
                    time_vector[count] = datetime.utcfromtimestamp(int(ts))
                    count += 1

            extracted_features_df = pd.DataFrame(extracted_features_list)
            extracted_features_df['computed_elevation'], time_vector = mwd_helper.get_interpolated_column(hole,'computed_elevation',time_vector)
            extracted_features_df[mwd_helper.mse_column_name], time_vector = mwd_helper.get_interpolated_column(hole,mwd_helper.mse_column_name,time_vector)

            if interpolated_column_names[0] != '':
                for column_name in interpolated_column_names:
                    extracted_features_df[column_name], time_vector = mwd_helper.get_interpolated_column(hole,column_name,time_vector)

            extracted_features_df['depth'] = (np.asarray(extracted_features_df['computed_elevation'].values) - hole[mwd_helper.collar_elevation_column_name].values[0]) * -1
            #pdb.set_trace()
        #    qclogplotter_depth = QCLogPlotterv2(axial,tangential,radial,mwd_helper,hole,extracted_features_df,bph_string,os.path.join(temppath,'depth_plot.png'),global_config)
        #    qclogplotter_depth.plot()
        #    qclogplotter_time = QCLogPlotterv2(axial,tangential,radial,mwd_helper,hole,extracted_features_df,bph_string,os.path.join(temppath,'time_plot.png'),global_config,plot_by_depth=False)
        #    qclogplotter_time.plot()

            hole.to_csv( os.path.join( temppath, "hole_mwd.csv" ) )


            qc_input = QCLogPlotInput()
            plot_meta = {}


            plot_meta['path'] = temppath#os.path.join(level3_csv_out_measurand.data_level_path(), 'unbinned', row.area)
            plot_meta['log_path'] = temppath





            plot_meta['rop_path'] = os.path.join(plot_meta['path'], 'rop')


            plot_meta['log_filename'] = os.path.join(temppath,'qc_log.png')
            plot_meta['rop_filename'] = os.path.join(plot_meta['rop_path'],'.png')



            # GENERATE QC PLOT
            title_line1 = "Correlated Trace QC Time Plots, {}, {}".format(global_config.mine_name, hole[mwd_helper.start_time_column_name].min().strftime("%B %d, %Y"))
            title_line2 = "Hole: {}, Pattern/Area: {},Digitizer_ID: {},Sampling rate: {}".format(hole[mwd_helper.hole_column_name].values[0],hole[mwd_helper.pattern_column_name].values[0],global_config.sensor_serial_number,global_config.output_sampling_rate)
            title_line3 = "Sensor distance to source: {},Orientation: {},Drill Rig ID: {}".format(global_config.sensor_distance_to_source,'',global_config.rig_id)
            plot_title = title_line1+'\n'+title_line2+'\n'+title_line3
            #qc_plot(os.path.join(plot_meta['log_path'],"qc_plot.png"),plot_title,axial,tangential,radial,ts_array)

            plot_meta['row'] = hole

            #TODO: Make qcLogPlotInput have methods that generate amplitude ratio, etc
            qc_input.df = extracted_features_df
            qc_input.hole_start_time = extracted_features_df['datetime'].iloc[0].to_pydatetime()
            qc_input.observer_row = hole
            qc_input.plot_meta = plot_meta
            qc_input.time_stamps = extracted_features_df['datetime']
            qc_input.sub_mwd_depth_interp = extracted_features_df['depth']
        #
            extracted_features_df['pseudo_ucs'] = pd.Series(qc_input.pseudo_ucs_sample, index = extracted_features_df.index)
            extracted_features_df['pseudo_velocity'] = pd.Series(qc_input.primary_pseudo_velocity_sample, index = extracted_features_df.index)
            extracted_features_df['pseudo_density'] = pd.Series(qc_input.primary_pseudo_density_sample, index = extracted_features_df.index)
            extracted_features_df['reflection_coefficient'] = pd.Series(qc_input.reflection_coefficient_sample, index = extracted_features_df.index)
            extracted_features_df['axial_delay'] = extracted_features_df['axial_multiple_peak_time_sample'] - extracted_features_df['axial_primary_peak_time_sample']
            extracted_features_df['axial_velocity_delay'] = 1.0/(extracted_features_df['axial_delay'])**3
            extracted_features_df['easting'] = hole[mwd_helper.easting_column_name].values[0]#[hole[mwd_helper.easting_column_name].values[0]] * len(extracted_features_df['axial_delay'])
            extracted_features_df['northing'] = hole[mwd_helper.northing_column_name].values[0]#[hole[mwd_helper.northing_column_name].values[0]] * len(extracted_features_df['axial_delay'])
            extracted_features_df["mine"] = global_config.mine_name
            extracted_features_df["bench"] = hole[mwd_helper.bench_column_name].values[0]
            extracted_features_df["area"] = hole[mwd_helper.pattern_column_name].values[0]
            extracted_features_df["hole"] = hole[mwd_helper.hole_column_name].values[0]
            extracted_features_df.to_csv(os.path.join(plot_meta['log_path'],"extracted_features.csv"))

            qclogplotter_depth = QCLogPlotterv2(axial,tangential,radial,mwd_helper,hole,extracted_features_df,bph_string,os.path.join(temppath,'depth_plot.png'),global_config)
            qclogplotter_depth.plot()
            qclogplotter_time = QCLogPlotterv2(axial,tangential,radial,mwd_helper,hole,extracted_features_df,bph_string,os.path.join(temppath,'time_plot.png'),global_config,plot_by_depth=False)
            qclogplotter_time.plot()



            QCLogPlotter(qc_input)

            file = open(os.path.join(temppath,'log.txt'),'w')

            file.write("H5 file path: " + str(args.h5_path))
            file.write("\nMWD file path: " + str(args.mwd_path))
            file.write("\nConfig file path: " + str(args.cfg_path))

            file.close()
            with open(os.path.join(temppath,'global_config.json'), 'w') as outfile:
                json.dump(vars(global_config), outfile,indent=4)


if __name__ == "__main__":
    main()
