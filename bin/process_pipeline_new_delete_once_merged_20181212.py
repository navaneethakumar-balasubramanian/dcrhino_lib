"""
Example usage for time plot
python process_pipeline_sucks.py -h5 ~/data/datacloud/debug/run_1542066345/20181112_RTR85545_S1021.h5 -o /tmp/ -t True
Example usage for mwd plot
python process_pipeline_sucks.py -h5 20180504_SSX55470_5306_4000.h5 -mwd mount_milligan_raw.csv  -icl weight_on_bit,rop,torque,vibration,rpm,air_pressure -ric machine_id -sc time_start_utc -ec time_end_utc -mc MSE -tobc torque -wobc weight_on_bit
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
import sys
import warnings

from ConfigParser import ConfigParser
from datetime import datetime
from functools import partial
from operator import is_not

from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.signal_processing.seismic_processing import get_tangential_despike_filtered_trace_features
from dcrhino.analysis.unstable.feature_extraction.feature_extraction_20181211 import feature_extractor_J1
from dcrhino.process_pipeline.config import Config
from dcrhino.process_pipeline.trace_processing import TraceProcessing
from dcrhino.process_pipeline.feature_extractor import FeatureExtractor
from dcrhino.process_pipeline.h5_helper import H5Helper
from dcrhino.process_pipeline.io_helper import IOHelper
from dcrhino.process_pipeline.mwd_helper import MwdDFHelper
from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotter,QCLogPlotInput
from dcrhino.process_pipeline.qc_log_plotter_nomwd import QCLogPlotter_nomwd
from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotterv2
from dcrhino.process_pipeline.util import drop_empty_columns_from_dataframe



from trace_processing import trim_trace

warnings.filterwarnings("ignore")


#from dcrhino.analysis.graphical.unbinned_qc_log_plots_v3_west_angelas import pseudodensity_panel,primary_pseudovelocity_panel,reflection_coefficient_panel
#from dcrhino.analysis.math.mwd_tools import interpolate_to_assign_depths_to_log_csv
#from dcrhino.analysis.signal_processing.seismic_processing import calculate_spiking_decon_filter
#plt.rcParams['figure.figsize'] = [20, 12]

BIN_PATH = os.path.dirname(os.path.abspath(__file__))

def get_ts_array_indexes(ts,arr):
    return np.array(np.where(arr == int(ts)))

def get_values_from_index(index_ar, values_ar, dtype):
    return values_ar[index_ar.min():index_ar.max()]

def get_df_acceleration_stats(traces_dict):
    df_acceleration_stats = pd.DataFrame()
    df_acceleration_stats["Timestamp"] = traces_dict['ts_array']
    df_acceleration_stats["axial_max"] = traces_dict['axial_max_acceleration_array'][:,0]
    df_acceleration_stats["axial_min"] = traces_dict['axial_min_acceleration_array'][:,0]
    df_acceleration_stats["radial_max"] = traces_dict['radial_max_acceleration_array'][:,0]
    df_acceleration_stats["radial_min"] = traces_dict['radial_min_acceleration_array'][:,0]
    df_acceleration_stats["tangential_max"] = traces_dict['tangential_max_acceleration_array'][:,0]
    df_acceleration_stats["tangential_min"] = traces_dict['tangential_min_acceleration_array'][:,0]
    return df_acceleration_stats

def get_axial_tangential_radial_traces(start_time_ts, end_time_ts, entire_xyz,
                                       ts_data, sensitivity_xyz, is_ide_file,
                                       accelerometer_max_voltage, global_config, debug=True):
    """
    @warning: 20181113: This method appears hard coded to 1s traces ...
    not good if we want to change this is going to require a fundamentally
    different iterator.  Iterator is currently actual_ts, which stands for
    actual_time_stamp maybe?

    ::axial_traces:: these are the traces that are input to the feature extractor

    """
    trace_processor = TraceProcessing(global_config, is_ide_file, accelerometer_max_voltage)
    entire_ts = ts_data
    entire_ts_int = entire_ts.astype(int)

    if len(sensitivity_xyz) != 3:
        print ("Could not read xyz sensitivity")
        raise SystemExit

    actual_ts = start_time_ts
    interval_seconds = (int(end_time_ts) - int(start_time_ts))
    trace_duration = 1.0
    num_traces_to_process = int(interval_seconds / trace_duration)
    samples_per_trace = int(trace_duration / global_config.dt)
    samples_per_trimmed_trace = global_config.n_samples_trimmed_trace

    print ("Getting axial,tangential,radial traces from interval: {} - {} total of {} seconds".format(start_time_ts, end_time_ts, interval_seconds))
    #axial_traces = np.full((num_traces_to_process, samples_per_trimmed_trace), np.nan)
    #radial_traces = np.full((num_traces_to_process, samples_per_trimmed_trace), np.nan)
    #tangential_traces = np.full((num_traces_to_process, samples_per_trimmed_trace), np.nan)
    ts = [None] * interval_seconds

    output_dict = {}

    while actual_ts < end_time_ts:
        trace_index = actual_ts - start_time_ts
        ts[trace_index] = actual_ts

        indexes_array_of_actual_second = get_ts_array_indexes(actual_ts,entire_ts_int)

        # PREVENT CRASH IF THERES NO DATA ON THE LASTS SECONDS OF THE HOLE
        if len(indexes_array_of_actual_second[0]) == 0:
            print ("Missing " , actual_ts)
            actual_ts += 1
            continue

        ts_actual_second = get_values_from_index(indexes_array_of_actual_second,entire_ts,np.float64)
        ts_actual_second = ts_actual_second-int(ts_actual_second[0])

        for i in range(0,len(entire_xyz)):
            component_sensitivity = sensitivity_xyz[i]
            component_name = COMPONENT_LABELS[i]
            component_index = global_config.get_component_index(component_name)

            component_trace_raw_data = get_values_from_index(indexes_array_of_actual_second,
                                                             entire_xyz[component_index], np.float32)
            component_trace_dict = trace_processor.process(component_trace_raw_data,
                                                           ts_actual_second,
                                                           component_name,
                                                           component_sensitivity,
                                                           debug)
            #pdb.set_trace()
            for _key in component_trace_dict:
                output_dict_key = str(_key) + "_array"
                if not output_dict_key in output_dict:
                    #print _key
                    output_dict[output_dict_key] = np.full((num_traces_to_process, len(component_trace_dict[_key])), np.nan)
                output_dict[output_dict_key][trace_index] = np.array(component_trace_dict[_key])

        #pdb.set_trace()
        actual_ts += 1

    ts = np.asarray(ts)
    output_dict['ts_array'] = ts
    return output_dict


def get_features_extracted(extractor, axial_traces, tangential_traces,
                           radial_traces, ts_array, global_config):
    print("Extracting features")
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

    extracted_features_list = [x for x in extracted_features_list if x is not None]
    print ("Features extracted")
    return extracted_features_list

def get_features_extracted_v2(traces_dict, global_config, recipe_list):
    """
    #can we get a definition of 'actual timestamp'... otherwise maybe we can give
    it a better name - "signed" actual_karl

    tangential_feature_df = pd.DataFrame(feature_list_for_df)

    svel = 1./(tangential_feature_df['tangential_delay'])#/global_config.dt)#1./delay**4
    svel = svel**4
    tangential_feature_df['shear_velocity'] = svel/1e4
    #pdb.set_trace()
    shear_modulus = tangential_feature_df['tangential_impedance']
    """
    extractor = FeatureExtractor(global_config.output_sampling_rate,
                                 global_config.primary_window_halfwidth_ms,
                                 global_config.multiple_window_search_width_ms,
                                 sensor_distance_to_source=global_config.sensor_distance_to_source)
    axial_traces = traces_dict['axial_trimmed_filtered_correlated_array']
    radial_traces = traces_dict['radial_trimmed_filtered_correlated_array']
    tangential_traces = traces_dict['tangential_trimmed_filtered_correlated_array']
    tangential_despiked_filtered_correlated_traces = traces_dict['tangential_filtered_despiked_correlated_array']
    #pdb.set_trace()
    timestamp_array = traces_dict['ts_array']
    print("Extracting features")
    initial_timestamp = timestamp_array[0]
    extracted_features_list = [None] * len(timestamp_array)
    for i, actual_timestamp in enumerate(timestamp_array):
        all_features_great_and_small = {}
        axial_trace = axial_traces[i]
        tangential_trace = tangential_traces[i]
        radial_trace = radial_traces[i]
        tangential_despiked_filtered_correlated = tangential_despiked_filtered_correlated_traces[i,:]


        if axial_trace is None:
            print ("Missing {} in this h5 file sequence".format(initial_timestamp + i))
            #continue
        if 'original' in recipe_list:

            original_features = extractor.extract_features(actual_timestamp, axial_trace, tangential_trace,
                                                       radial_trace, global_config.n_samples_trimmed_trace,
                                                       -global_config.min_lag_trimmed_trace)
            all_features_great_and_small.update(original_features)
        if 'tangential_201810' in recipe_list:
            #@TODO: add '1810' tag to features from get_tangential_despike_filtered_trace_features
            feature_dict = {}
            trim_tang_dspk = trim_trace(global_config.min_lag_trimmed_trace, global_config.max_lag_trimmed_trace,
                                        global_config.num_taps_in_decon_filter, global_config.output_sampling_rate,
                                        tangential_despiked_filtered_correlated)
            qq = np.max(trim_tang_dspk)/np.max(tangential_trace)
            trim_tang_dspk *= qq

            feature_dict = get_tangential_despike_filtered_trace_features(trim_tang_dspk, global_config, sanity_check_plot=False)
            #<add '1810' tag to features from get_tangential_despike_filtered_trace_features>
            feature_dict['1810_tangential_multiple1_amplitude_poly'] = feature_dict.pop('tangential_multiple1_amplitude_poly')
            feature_dict['1810_tangential_primary_amplitude_poly'] = feature_dict.pop('tangential_primary_amplitude_poly')
            feature_dict['1810_tangential_multiple1_time_poly'] = feature_dict.pop('tangential_multiple1_time_poly')
            feature_dict['1810_tangential_primary_time_poly'] = feature_dict.pop('tangential_primary_time_poly')
            feature_dict['1810_tangential_amplitude_ratio'] =  np.sqrt( feature_dict['1810_tangential_multiple1_amplitude_poly'] / feature_dict['1810_tangential_primary_amplitude_poly'])
            feature_dict['1810_tangential_impedance']  = (1 - feature_dict['1810_tangential_amplitude_ratio'] ) / (1 + feature_dict['1810_tangential_amplitude_ratio'] )
            #feature_dict['shear_modulus'] = feature_dict['tangentia(l_impedance']
            feature_dict['1810_tangential_delay']  = feature_dict['1810_tangential_multiple1_time_poly'] - feature_dict['1810_tangential_primary_time_poly']
            #<add '1810' tag to features from get_tangential_despike_filtered_trace_features>
            all_features_great_and_small.update(feature_dict)
            #feature_list_for_df[i_trace] = feature_dict

        if 'J1' in recipe_list:
            #<From [FEATURE_EXTRACTION] config>
            window_widths = {}
            component = 'axial'
            window_widths[component] = {}
            window_widths[component]['primary'] = 4.0 * 1e-3
            window_widths[component]['multiple_1'] = 4.0 * 1e-3
            window_widths[component]['multiple_2'] = 4.0 * 1e-3
            window_widths[component]['multiple_3'] = 4.0 * 1e-3
            component = 'tangential'
            window_widths[component] = {}
            window_widths[component]['primary'] = 4.0 * 1e-3
            window_widths[component]['multiple_1'] = 4.0 * 1e-3
            window_widths[component]['multiple_2'] = 4.0 * 1e-3
            window_widths[component]['multiple_3'] = 4.0 * 1e-3
            #</From [FEATURE_EXTRACTION] config>
            trimmed_traces_dict = {}
            trimmed_traces_dict['axial'] = axial_trace
            trimmed_traces_dict['tangential'] = tangential_trace

            feature_dict = feature_extractor_J1(global_config, window_widths, trimmed_traces_dict)
            for k in feature_dict.keys():
                print(k, feature_dict[k])
                feature_dict['J1_{}'.format(k)] = feature_dict.pop('{}'.format(k))
            print('populate')
            print('awfk')
            #pdb.set_trace()
            all_features_great_and_small.update(feature_dict)

        extracted_features_list[i] = all_features_great_and_small
    pdb.set_trace()
    temp_df_to_file = pd.DataFrame(extracted_features_list)
    temp_df_to_file.to_csv('/tmp/df_tmp.csv')
    extracted_features_list = [x for x in extracted_features_list if x is not None]
    print ("Features extracted")
    return extracted_features_list

def save_or_append_npy(file_path,data,append_mode=False):
    if append_mode:
        np.concatenate((np.load(file_path), data))
    else:
        np.save(file_path,data)


def process_h5_file(h5py_file, output_folder, cfg_file_path=False):
    """
    """
    print ("Config file path:" , cfg_file_path)

    # Read Config
    config_parser = ConfigParser()
    if cfg_file_path:
        config_parser.read(cfg_file_path)

    # Read Env Config Parser
    env_config_parser = ConfigParser()
    env_config_parser.read(os.path.join(BIN_PATH,'env.cfg'))

    #pdb.set_trace()
    #f1 = h5py.File(h5_path,'r+')
    h5_helper = H5Helper(h5py_file)

    # DATA FROM H5 CONFIG HEADER
    metadata = h5_helper.metadata
    global_config = Config(metadata,env_config_parser,config_parser)
    global_config.output_sampling_rate = global_config.output_sampling_rate * 1.25
    io_helper = IOHelper(global_config)
    pdb.set_trace()
    #print (io_helper.get_mine_path())

    accelerometer_max_voltage = float(h5py_file.attrs['PLAYBACK/accelerometer_max_voltage'])

    print ("Mine name = " + global_config.mine_name)
    print ("Rig id = " + global_config.rig_id)
    print ("sensor_serial_number = " + global_config.sensor_serial_number)
    print ("H5 data from " + str(h5_helper.min_dtime) + " to " + str(h5_helper.max_dtime))

    extractor = FeatureExtractor(global_config.output_sampling_rate,
                                 global_config.primary_window_halfwidth_ms,
                                 global_config.multiple_window_search_width_ms,
                                 sensor_distance_to_source=global_config.sensor_distance_to_source)

    start_ts = int(h5_helper.min_ts)
    end_ts = int(h5_helper.max_ts)

    temppath = output_folder
    io_helper.make_dirs_if_needed(temppath)

    append_mode = False
    #<DO we need this for v2?>
    #what is being caught here?
#    if 'ts.npy' in os.listdir(temppath):
#        previous_ts_array = np.load(os.path.join(temppath,'ts.npy'))
#        previous_end_ts = previous_ts_array[-1]
#        print "File in folder",previous_end_ts,end_ts
#        if end_ts > previous_end_ts+1:
#            append_mode = True
#            print "changed start ts to ",previous_end_ts+1
#            start_ts = previous_end_ts+1
#        else:
#            print "File in the output folder have more time than the input file"
#            sys.exit(1)
    #</DO we need this for v2?>
    pdb.set_trace()
    traces_dict = get_axial_tangential_radial_traces(start_ts, end_ts, h5_helper.data_xyz, h5_helper.ts, h5_helper.sensitivity_xyz, h5_helper.is_ide_file, accelerometer_max_voltage, global_config)
    #['tangential_filtered_despiked_correlated_array', 'tangential_trimmed_filtered_correlated_array',
      #'axial_correlated_array', 'axial_despiked_correlated_array', 'radial_trimmed_filtered_correlated_array',
      #'radial_despiked_correlated_array', 'axial_deconvolved_array', 'radial_min_acceleration_array',
      #'radial_filtered_despiked_correlated_array', 'tangential_filtered_correlated_array',
      #'tangential_min_acceleration_array', 'axial_interpolated_array', 'radial_interpolated_array',
      #'axial_filtered_despiked_correlated_array', 'radial_correlated_array',
      #'axial_trimmed_filtered_correlated_array', 'axial_max_acceleration_array', 'axial_min_acceleration_array',
      #'radial_max_acceleration_array', 'tangential_interpolated_array', 'tangential_despiked_correlated_array',
      #'ts_array', 'radial_deconvolved_array', 'axial_filtered_correlated_array',
      #'radial_filtered_correlated_array', 'tangential_max_acceleration_array', 'tangential_deconvolved_array',
      #'tangential_correlated_array']
    # SAVE FILES
    for _key in traces_dict.keys():
        if _key == 'axial_trimmed_filtered_correlated_array':
            save_or_append_npy(os.path.join(temppath, 'axial.npy'), traces_dict[_key], append_mode)
        elif _key == 'tangential_trimmed_filtered_correlated_array':
            save_or_append_npy(os.path.join(temppath,'tangential.npy'),traces_dict[_key],append_mode)
        elif _key == 'radial_trimmed_filtered_correlated_array':
            save_or_append_npy(os.path.join(temppath,'radial.npy'),traces_dict[_key],append_mode)
        elif _key == 'ts_array':
            save_or_append_npy(os.path.join(temppath,'ts.npy'),traces_dict[_key],append_mode)
        else:
            output_file_name = _key.replace('_array','.npy')
            save_or_append_npy(os.path.join(temppath,output_file_name),traces_dict[_key],append_mode)

    #<Prepare inputs for feature extraction>
    #need switches here to control which feature extraction is being used
    #<Original>
    axial = traces_dict['axial_trimmed_filtered_correlated_array']
    radial = traces_dict['radial_trimmed_filtered_correlated_array']
    tangential = traces_dict['tangential_trimmed_filtered_correlated_array']
    ts_array = traces_dict['ts_array']

    #</Original>
    #<Tangential>

    feature_recipe_list = ['original', 'tangential_201810', 'J1', 'extra_crispy']
    extracted_features_list = get_features_extracted_v2(traces_dict, global_config,
                                                        feature_recipe_list)

    #<Original>
    #pdb.set_trace()
    extracted_features_list = get_features_extracted(extractor, axial, tangential,
                                                     radial, ts_array, global_config)

    extracted_features_df = pd.DataFrame(extracted_features_list)
    extracted_features_df = drop_empty_columns_from_dataframe(extracted_features_df)
    acceleration_stats_df = get_df_acceleration_stats(traces_dict)

    extracted_features_df_path = os.path.join(temppath,"extracted_features.csv")
    acceleration_stats_df_path = os.path.join(temppath,"acceleration_values_by_second.csv")

    if append_mode:
        extracted_features_df = pd.concat([pd.read_csv(extracted_features_df_path), extracted_features_df])
        acceleration_stats_df = pd.concat([pd.read_csv(acceleration_stats_df_path), acceleration_stats_df])


    extracted_features_df.to_csv(extracted_features_df_path, index=False)
    acceleration_stats_df.to_csv(acceleration_stats_df_path, index=False)


    file = open(os.path.join(temppath,'log.txt'),'w')

    file.write("Time processing only")
    #file.write("\nH5 file path: " + str(args.h5_path))
    #file.write("\nConfig file path: " + str(args.cfg_path))

    file.close()

    with open(os.path.join(temppath,'global_config.json'), 'w') as outfile:
        json.dump(vars(global_config), outfile,indent=4)


if __name__ == "__main__":
    #<sort out args>
    argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-h5', '--h5-path', help="H5 File Path", default=None)
    argparser.add_argument('-cfg', '--cfg-path', help="CFG File Path", default=None)
    argparser.add_argument('-o','--output-folder',help="OUTPUT FOLDER",default=False)
    args = argparser.parse_args()

    f1 = h5py.File(args.h5_path,'r+')
    process_h5_file(f1,args.output_folder, args.cfg_path)
