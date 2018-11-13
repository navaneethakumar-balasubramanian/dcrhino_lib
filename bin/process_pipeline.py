import numpy as np
import h5py
import pandas as pd
from scipy import interpolate

from ConfigParser import ConfigParser
import argparse
import os
import scipy
import json
import matplotlib.pyplot as plt
import pdb
#from string import zfill
#from dcrhino.analysis.data_manager.temp_paths import ensure_dir
import calendar
import scipy.signal as ssig
import warnings
from operator import is_not
from functools import partial
#from dcrhino.real_time.metadata import Metadata
warnings.filterwarnings("ignore")


#from dcrhino.models.feature_extracted import FeatureExtractedModel


from dcrhino.analysis.graphical.unbinned_qc_log_plots_v3_west_angelas import pseudodensity_panel,primary_pseudovelocity_panel,reflection_coefficient_panel
#from dcrhino.analysis.math.mwd_tools import interpolate_to_assign_depths_to_log_csv
from datetime import datetime
from dcrhino.process_pipeline.config import Config
from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotter,QCLogPlotInput
from dcrhino.process_pipeline.qc_log_plotter_nomwd import QCLogPlotter_nomwd
from dcrhino.process_pipeline.feature_extractor import FeatureExtractor
from dcrhino.process_pipeline.filters import FIRLSFilter

from dcrhino.process_pipeline.h5_helper import H5Helper
from dcrhino.process_pipeline.mwd_helper import MwdDFHelper
from dcrhino.process_pipeline.io_helper import IOHelper
#plt.rcParams['figure.figsize'] = [20, 12]
import sys


from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotterv2
#from dcrhino.process_pipeline.mwd_mapper import MWDMapper

import matplotlib.pylab as pylab



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

def deconvolve_trace( deconvolution_filter_duration,num_taps_in_decon_filter, data):
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


def bandpass_filter_trace(output_sampling_rate,trapezoidal_bpf_corner_1,trapezoidal_bpf_corner_2,trapezoidal_bpf_corner_3,trapezoidal_bpf_corner_4,trapezoidal_bpf_duration,data):
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


def get_axial_tangential_radial_traces(start_time_ts,end_time_ts,entire_xyz,ts_data,sensitivity_xyz,debug_file_name='',debug=True):
    entire_ts = ts_data
    entire_ts_int = entire_ts.astype(int)

    if len(sensitivity_xyz) != 3:
        print ("Could not read xyz sensitivity")
        raise SystemExit

    actual_ts = start_time_ts
    end = end_time_ts
    interval_seconds = (int(end_time_ts) - int(start_time_ts))

    print ("Getting axial,tangential,radial traces from interval: " + str(start_time_ts) +  " - " + str(end_time_ts) + " total of " + str(interval_seconds) + " seconds")

    axial_traces = [None] * interval_seconds
    radial_traces = [None] * interval_seconds
    tangential_traces = [None] * interval_seconds
    ts = [None] * interval_seconds



    if debug:
        axial_deconvolved_traces = [None] * interval_seconds
        radial_deconvolved_traces = [None] * interval_seconds
        tangential_deconvolved_traces = [None] * interval_seconds

        axial_interpolated_traces = [None] * interval_seconds
        radial_interpolated_traces = [None] * interval_seconds
        tangential_interpolated_traces = [None] * interval_seconds

        axial_unfiltered_correlated_traces = [None] * interval_seconds
        radial_unfiltered_correlated_traces = [None] * interval_seconds
        tangential_unfiltered_correlated_traces = [None] * interval_seconds

        axial_filtered_correlated_traces = [None] * interval_seconds
        radial_filtered_correlated_traces = [None] * interval_seconds
        tangential_filtered_correlated_traces = [None] * interval_seconds

        #Natal's changes
        interval_second_index = 0
        acceleration_stats = [None] * interval_seconds
        # acceleration_stats = []

    while actual_ts < end:

        indexes_array_of_actual_second = get_ts_array_indexes(actual_ts,entire_ts_int)

        # PREVENT CRASH IF THERES NO DATA ON THE LASTS SECONDS OF THE HOLE
        if len(indexes_array_of_actual_second[0]) == 0:
            print ("Missing " , actual_ts)
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


            #Natal's changes
            row = [actual_ts,0,0,0,0,0,0]
            start_index=[1,3,5]

        for i, data in enumerate(entire_xyz):
            actual_second = get_values_from_index(indexes_array_of_actual_second,data,np.float32)


            sensitivity = sensitivity_xyz[i]

            calibrated_actual_second = apply_calibration(h5_helper.is_ide_file,actual_second,sensitivity,accelerometer_max_voltage)

            #Natal's changes
            # pdb.set_trace()
            row[start_index[i]] = np.max(calibrated_actual_second)
            row[start_index[i]+1] = np.min(calibrated_actual_second)


            # Save to npy file calibrated_actual_second
            interpolated_actual_second = interpolate_data(global_config.ideal_timestamps, ts_actual_second, calibrated_actual_second)
            deconvolved_data_actual_second, r_xx0 = deconvolve_trace(global_config.deconvolution_filter_duration,global_config.num_taps_in_decon_filter,interpolated_actual_second)
            correlated_trace_actual_second = correlate_trace(interpolated_actual_second,deconvolved_data_actual_second)
            filtered_correlated_trace_actual_second = bandpass_filter_trace(global_config.output_sampling_rate,global_config.trapezoidal_bpf_corner_1,global_config.trapezoidal_bpf_corner_2,global_config.trapezoidal_bpf_corner_3,global_config.trapezoidal_bpf_corner_4,global_config.trapezoidal_bpf_duration,correlated_trace_actual_second)
            #pdb.set_trace()
            trimmed_filtered_correlated_trace_actual_second = trim_trace(global_config.min_lag_trimmed_trace,global_config.max_lag_trimmed_trace,global_config.num_taps_in_decon_filter,global_config.output_sampling_rate,filtered_correlated_trace_actual_second)
            results[i] = trimmed_filtered_correlated_trace_actual_second

            if debug:
                results_deconvolved[i] = deconvolved_data_actual_second
                results_interpolated[i] = interpolated_actual_second
                results_unfiltered[i] = correlated_trace_actual_second
                results_filtered[i] = filtered_correlated_trace_actual_second

        #Natal's changes
        # acceleration_stats.append(row)
        acceleration_stats[interval_second_index]=row
        interval_second_index+=1

        if global_config.sensor_axial_axis == 1:
            axial_trace = results[0]
            tangential_trace = results[1]
            radial_trace = results[2]

            if debug:
                axial_deconvolved_trace = results_deconvolved[0]
                radial_deconvolved_trace = results_deconvolved[2]
                tangential_deconvolved_trace = results_deconvolved[1]

                axial_unfiltered_correlated_trace = results_unfiltered[0]
                radial_unfiltered_correlated_trace = results_unfiltered[2]
                tangential_unfiltered_correlated_trace = results_unfiltered[1]

                axial_filtered_correlated_trace = results_filtered[0]
                radial_filtered_correlated_trace = results_filtered[2]
                tangential_filtered_correlated_trace = results_filtered[1]

                axial_interpolated_trace = results_interpolated[0]
                radial_interpolated_trace = results_interpolated[2]
                tangential_interpolated_trace = results_interpolated[1]
        else:
            axial_trace = results[1]
            tangential_trace = results[0]
            radial_trace = results[2]

            if debug:
                axial_deconvolved_trace = results_deconvolved[1]
                radial_deconvolved_trace = results_deconvolved[2]
                tangential_deconvolved_trace = results_deconvolved[0]

                axial_unfiltered_correlated_trace = results_unfiltered[1]
                radial_unfiltered_correlated_trace = results_unfiltered[2]
                tangential_unfiltered_correlated_trace = results_unfiltered[0]

                axial_filtered_correlated_trace = results_filtered[1]
                radial_filtered_correlated_trace = results_filtered[2]
                tangential_filtered_correlated_trace = results_filtered[0]

                axial_interpolated_trace = results_interpolated[1]
                radial_interpolated_trace = results_interpolated[2]
                tangential_interpolated_trace = results_interpolated[0]


        axial_traces[actual_ts-start_ts] = np.array(axial_trace)
        tangential_traces[actual_ts-start_ts] = np.array(tangential_trace)
        radial_traces[actual_ts-start_ts] = np.array(radial_trace)
        ts[actual_ts-start_ts] = actual_ts

        if debug:
            axial_deconvolved_traces[actual_ts-start_ts] = axial_deconvolved_trace
            tangential_deconvolved_traces[actual_ts-start_ts] = tangential_deconvolved_trace
            radial_deconvolved_traces[actual_ts-start_ts] = radial_deconvolved_trace

            axial_unfiltered_correlated_traces[actual_ts-start_ts] = axial_unfiltered_correlated_trace
            tangential_unfiltered_correlated_traces[actual_ts-start_ts] = tangential_unfiltered_correlated_trace
            radial_unfiltered_correlated_traces[actual_ts-start_ts] = radial_unfiltered_correlated_trace

            axial_filtered_correlated_traces[actual_ts-start_ts] = axial_filtered_correlated_trace
            tangential_filtered_correlated_traces[actual_ts-start_ts] = tangential_filtered_correlated_trace
            radial_filtered_correlated_traces[actual_ts-start_ts] = radial_filtered_correlated_trace

            axial_interpolated_traces[actual_ts-start_ts] = axial_interpolated_trace
            tangential_interpolated_traces[actual_ts-start_ts] = tangential_interpolated_trace
            radial_interpolated_traces[actual_ts-start_ts] = radial_interpolated_trace

        actual_ts += 1


    axial_traces = [x for x in axial_traces if x is not None]
    tangential_traces = [x for x in tangential_traces if x is not None]
    radial_traces = [x for x in radial_traces if x is not None]
    ts = [x for x in ts if x is not None]

    axial_traces = np.asarray(axial_traces)
    tangential_traces = np.asarray(tangential_traces)
    radial_traces = np.asarray(radial_traces)
    ts = np.asarray(ts)

    # Remove missing
    #axial_traces = axial_traces[axial_traces != np.array(None)]
    #tangential_traces = tangential_traces[axial_traces != np.array(None)]
    #radial_traces = radial_traces[axial_traces != np.array(None)]
    #ts = ts[axial_traces != np.array(None)]


    if debug:
        axial_deconvolved_traces = np.asarray(axial_deconvolved_traces)
        tangential_deconvolved_traces = np.asarray(tangential_deconvolved_traces)
        radial_deconvolved_traces = np.asarray(radial_deconvolved_traces)
        #pdb.set_trace()
        axial_interpolated_traces = np.asarray(axial_interpolated_traces)
        tangential_interpolated_traces = np.asarray(tangential_interpolated_traces)
        radial_interpolated_traces = np.asarray(radial_interpolated_traces)

        axial_unfiltered_correlated_traces = np.asarray(axial_unfiltered_correlated_traces)
        tangential_unfiltered_correlated_traces = np.asarray(tangential_unfiltered_correlated_traces)
        radial_unfiltered_correlated_traces = np.asarray(radial_unfiltered_correlated_traces)

        axial_filtered_correlated_traces = np.asarray(axial_filtered_correlated_traces)
        tangential_filtered_correlated_traces = np.asarray(tangential_filtered_correlated_traces)
        radial_filtered_correlated_traces = np.asarray(radial_filtered_correlated_traces)


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

        #Natal's Changes
        #pdb.set_trace()
        cleaned_acceleration_stats = filter(partial(is_not, None), acceleration_stats)
        accel_df =pd.DataFrame(cleaned_acceleration_stats,columns=["Timestamp","max_x","min_x","max_y","min_y","max_z","min_z"])
        accel_df.to_csv(debug_file_name+'acceleration_values_by_second.csv')

    return [axial_traces,tangential_traces,radial_traces,ts]

def get_features_extracted(extractor,axial_traces,tangential_traces,radial_traces,ts_array):
    print ("Extracting features")
    initial_ts = ts_array[0]
    extracted_features_list = [None] * len(ts_array)
    for i, actual_ts in enumerate(ts_array):
        axial_trace = axial_traces[i]
        tangential_trace = tangential_traces[i]
        radial_trace = radial_traces[i]

        if axial_trace is None:
            print ("Missing " + str((initial_ts+i)) + " in this h5 file sequence")
            continue

        extracted_features = extractor.extract_features(actual_ts,axial_trace,tangential_trace,radial_trace,global_config.n_samples_trimmed_trace,-global_config.min_lag_trimmed_trace)
        extracted_features_list[i] = extracted_features

    extracted_features_list = [x for x in extracted_features_list if x is not None]
    print ("Features extracted")
    return extracted_features_list







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

print ("H5 file path:" , args.h5_path)
print ("MWD file path:" , args.mwd_path)
#print ("Client Config file path:" , args.client_config_path)
print ("Config file path:" , args.cfg_path)

# Read Config
config_parser = ConfigParser()
if args.cfg_path is not None:
    config_parser.read(args.cfg_path)




# Read Env Config Parser
env_config_parser = ConfigParser()
env_config_parser.read(os.path.join(BIN_PATH,'env.cfg'))


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
        temppath = output_folder
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



    axial, tangential, radial, ts_array = get_axial_tangential_radial_traces(start_ts, end_ts, h5_helper.data_xyz, h5_helper.ts, h5_helper.sensitivity_xyz,debug_file_name=os.path.join(temppath,''))
    extracted_features_list = get_features_extracted(extractor,axial,tangential,radial,ts_array)
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
                           northing_column=northing_column)

    if mwd_helper is False:
        sys.exit("Error in mwd dataframe.")


    holes_array = mwd_helper.get_holes_df_from_rig_timeinterval(mwd_df,global_config.rig_id, h5_helper.min_dtime, h5_helper.max_dtime)

    print ("Identified ", len(holes_array) , " holes in this combination of mwd and h5")



    if interactive_mode:
            cb = plt.colorbar(heatmap1, cax = cbaxes)
            ax[2], heatmap2 = plot_hole_as_heatmap(ax[2], cbal.v_min_2, cbal.v_max_2, X, Y,
              trace_array_dict['tangential'], cmap_string, y_tick_locations)#,

            ax[3], heatmap3 = plot_hole_as_heatmap(ax[3], cbal.v_min_3, cbal.v_max_3, X, Y,
              trace_array_dict['radial'], cmap_string, y_tick_locations)#,

#        plt.tight_layout()
            if colourbar_type=='all_one':
                cbaxes = fig.add_axes([0.01, 0.1, 0.007, 0.8])
                cb = plt.colorbar(heatmap1, cax = cbaxes)
                plt.setp(cbaxes.get_xticklabels(), rotation='vertical', fontsize=10)
                cbaxes.yaxis.set_ticks_position('right')

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
        bph_string = str(hole[bench_column].values[0]) + "-" + str(hole[pattern_column].values[0])  + "-" + str(hole[hole_column].values[0])
        if hole_index and i != hole_index:
            print ("Ignoring hole " + bph_string)
            continue

        hole_uid = bph_string
        print ("Processing : " + bph_string + " from: " + str(hole[start_time_column].min()) + " to " + str(hole[end_time_column].max()))

        if len(hole) == 1:
            print ("Error in this hole. Please check mwd, there should be more than one line.")
            continue

        start_ts = calendar.timegm(hole[start_time_column].min().timetuple())
        end_ts = calendar.timegm(hole[end_time_column].max().timetuple())
        if start_ts < h5_helper.min_ts:
            start_ts = h5_helper.min_ts

        if end_ts > h5_helper.max_ts:
            print("MWD HAS MORE TIME THAN THE H5" ,end_ts,int(h5_helper.max_ts))
            end_ts = int(h5_helper.max_ts)

        if output_folder:
            temppath = output_folder
            io_helper.make_dirs_if_needed(temppath)
        else:
            temppath = io_helper.get_output_base_path(hole_uid)

        startdt = datetime.utcfromtimestamp(start_ts)
        enddt = datetime.utcfromtimestamp(end_ts)
        #periods = (enddt-startdt).total_seconds()
        #time_vector = pd.date_range(start=startdt, periods=periods, freq='1S')


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
                start_ts, end_ts, h5_helper.data_xyz, h5_helper.ts, h5_helper.sensitivity_xyz,debug_file_name=os.path.join(temppath,''))
            np.save(os.path.join(temppath,'axial.npy'),axial)
            np.save(os.path.join(temppath,'tangential.npy'),tangential)
            np.save(os.path.join(temppath,'radial.npy'),radial)
            np.save(os.path.join(temppath,'ts.npy'),ts_array)

        extracted_features_list = get_features_extracted(extractor,axial,tangential,radial,ts_array)

        # CREATE TIMEVECTOR WITHOUT MISSING SECONDS
        time_vector = [None]*len(extracted_features_list)
        count = 0
        for ts in ts_array:
            if ts is not None:
                time_vector[count] = datetime.utcfromtimestamp(int(ts))
                count += 1

        extracted_features_df = pd.DataFrame(extracted_features_list)
        extracted_features_df['computed_elevation'], time_vector = mwd_helper.get_interpolated_column(hole,'computed_elevation',time_vector)
        extracted_features_df[mse_column], time_vector = mwd_helper.get_interpolated_column(hole,mse_column,time_vector)

        if interpolated_column_names[0] != '':
            for column_name in interpolated_column_names:
                extracted_features_df[column_name], time_vector = mwd_helper.get_interpolated_column(hole,column_name,time_vector)

        extracted_features_df['depth'] = (np.asarray(extracted_features_df['computed_elevation'].values) - hole[collar_elevation_column].values[0]) * -1
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
        title_line1 = "Correlated Trace QC Time Plots, {}, {}".format(global_config.mine_name, hole[start_time_column].min().strftime("%B %d, %Y"))
        title_line2 = "Hole: {}, Pattern/Area: {},Digitizer_ID: {},Sampling rate: {}".format(hole[hole_column].values[0],hole[pattern_column].values[0],global_config.sensor_serial_number,global_config.output_sampling_rate)
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
        extracted_features_df["bench"] = hole[bench_column].values[0]
        extracted_features_df["area"] = hole[pattern_column].values[0]
        extracted_features_df["hole"] = hole[hole_column].values[0]
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
