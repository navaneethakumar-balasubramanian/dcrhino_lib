#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Dec 25 22:11:55 2018

@author: thiago
"""

#import h5py
#from dcrhino.process_pipeline.h5_helper import H5Helper
from dcrhino.process_pipeline.config import Config
from clickhouse_driver import Client
import numpy as np
import pandas as pd
#import uuid
import os
import pdb
from dcrhino.process_pipeline.mwd_helper import MwdDFHelper
import json
import calendar
from datetime import datetime
from dcrhino.process_pipeline.trace_processing import TraceProcessing
from dcrhino.process_pipeline.feature_extractor import FeatureExtractor
from dcrhino.process_pipeline.config import Config
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.process_pipeline.trace_processing import trim_trace
from dcrhino.analysis.unstable.feature_extraction.feature_extraction_tangential_bob_20181031 import get_tangential_despike_filtered_trace_features
from dcrhino.analysis.unstable.feature_extraction.feature_extraction_20181226 import feature_extractor_J1
from dcrhino.analysis.unstable.feature_extraction.feature_derivations_20181218 import extracted_features_df_to_external_features
import time
from dcrhino.process_pipeline.rhino_db_helper import RhinoDBHelper


def get_features_extracted_v2(traces_df, global_config, recipe_list,timestamp_array):
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
    axial_traces = np.vstack(traces_df['axial_trimmed_filtered_correlated'].values)
    radial_traces = np.vstack(traces_df['radial_trimmed_filtered_correlated'].values)
    tangential_traces = np.vstack(traces_df['tangential_trimmed_filtered_correlated'].values)
    tangential_despiked_filtered_correlated_traces = np.vstack(traces_df['tangential_filtered_despiked_correlated'].values)
    #pdb.set_trace()
    #timestamp_array = traces_dict['ts_array']
    print("Extracting features")
    #initial_timestamp = timestamp_array[0]
    extracted_features_list = [None] * len(timestamp_array)
    for i, actual_timestamp in enumerate(timestamp_array):
        all_features_great_and_small = {}
        axial_trace = axial_traces[i]
        tangential_trace = tangential_traces[i]
        radial_trace = radial_traces[i]
        tangential_despiked_filtered_correlated = tangential_despiked_filtered_correlated_traces[i,:]

        if 'original' in recipe_list:

            original_features = extractor.extract_features(actual_timestamp, axial_trace, tangential_trace,
                                                       radial_trace, global_config.n_samples_trimmed_trace,
                                                       -global_config.min_lag_trimmed_trace)
            all_features_great_and_small.update(original_features)
        if 'tangential_201810' in recipe_list:
            trim_tang_dspk = trim_trace(global_config.min_lag_trimmed_trace, global_config.max_lag_trimmed_trace,
                                        global_config.num_taps_in_decon_filter, global_config.output_sampling_rate,
                                        tangential_despiked_filtered_correlated)
            qq = np.max(trim_tang_dspk)/np.max(tangential_trace)
            trim_tang_dspk *= qq

            feature_dict = get_tangential_despike_filtered_trace_features(trim_tang_dspk, global_config,
                                                                          sanity_check_plot=False)
            all_features_great_and_small.update(feature_dict)

        if 'J1' in recipe_list:
            trimmed_traces_dict = {}
            trimmed_traces_dict['axial'] = axial_trace
            trimmed_traces_dict['tangential'] = tangential_trace

            feature_dict = feature_extractor_J1(global_config, trimmed_traces_dict)
            all_features_great_and_small.update(feature_dict)

        extracted_features_list[i] = all_features_great_and_small
    extracted_features_list = [x for x in extracted_features_list if x is not None]
    print ("Features extracted")
    return extracted_features_list

def process_raw_data_interval(global_config,raw_data_grouped_by_ts):
    print "Loading raw data"
    
    seconds = raw_data_grouped_by_ts.apply(list).index.astype(int)
    trace_processor = TraceProcessing(global_config)

    feature_recipe_list = ['original', 'tangential_201810', 'J1', 'extra_crispy']
    xyz = ['x','y','z']
    extracted_features_df = pd.DataFrame()
    for second in seconds:
        second_mwd = raw_data_grouped_by_ts.get_group(second)
        ts_actual_second = second_mwd['microtime'].astype(float).values/10000000000
        second_traces_df = pd.DataFrame()
        #output_traces_dict = {}
        for i in range(0,len(xyz)):
            ## TRACE PROCESSING
            component_sensitivity = global_config.sensitivity_xyz[i]
            component_name = COMPONENT_LABELS[i]
            #component_index = global_config.get_component_index(component_name)
            component_trace_raw_data = second_mwd[xyz[i]].values
            debug = True
            #pdb.set_trace()
            component_trace_dict = trace_processor.process(component_trace_raw_data,
                                                                       ts_actual_second,
                                                                       component_name,
                                                                       component_sensitivity,
                                                                      debug)

            component_trace_dict['ts'] = second
            component_sec_df = pd.DataFrame([component_trace_dict])
            component_sec_df = component_sec_df.set_index("ts")
            second_traces_df = pd.concat([second_traces_df,component_sec_df],axis=1)
            
        ## FEATURE EXTRACTOR
        #pdb.set_trace()
        second_traces_df['axial_max_acceleration'] = second_traces_df['axial_max_acceleration'].values[0][0]
        second_traces_df['axial_min_acceleration'] = second_traces_df['axial_min_acceleration'].values[0][0]
        second_traces_df['radial_max_acceleration'] = second_traces_df['radial_max_acceleration'].values[0][0]
        second_traces_df['radial_min_acceleration'] = second_traces_df['radial_min_acceleration'].values[0][0]
        second_traces_df['tangential_max_acceleration'] = second_traces_df['tangential_max_acceleration'].values[0][0]
        second_traces_df['tangential_min_acceleration'] = second_traces_df['tangential_min_acceleration'].values[0][0]
        second_extracted_features_df = pd.DataFrame( get_features_extracted_v2(second_traces_df,global_config,feature_recipe_list,np.asarray([second])))
        second_extracted_features_df['ts'] = second
        second_extracted_features_df = second_extracted_features_df.set_index("ts")
        second_extracted_features_df = pd.concat([second_traces_df,second_extracted_features_df],axis=1)
        extracted_features_df = pd.concat([extracted_features_df,second_extracted_features_df])
    return extracted_features_df



def get_mwd_interpolated_by_second(hole_mwd):
    interpolated_mwd = pd.DataFrame()

    interpolated_mwd['computed_elevation'], time_vector = mwdHelper.get_interpolated_column(hole_mwd,'computed_elevation')

    interpolated_mwd['mse'], time_vector = mwdHelper.get_interpolated_column(hole_mwd,mwdHelper.mse_column_name,time_vector)
    interpolated_mwd['depth'] = (np.asarray(interpolated_mwd['computed_elevation'].values) - hole_mwd[mwdHelper.collar_elevation_column_name].values[0]) * -1
    
    for col in hole_mwd.columns:
        if col not in interpolated_mwd.columns and hole_mwd[col].values.dtype in [np.int,np.float]:
            interpolated_mwd['mwd_'+col], time_vector = mwdHelper.get_interpolated_column(hole_mwd,col,time_vector)    
    interpolated_mwd['ts'] = time_vector.astype(int)/1000000000
    interpolated_mwd.index = interpolated_mwd['ts']
    return interpolated_mwd
    

            

def prepare_processed_data_to_save(global_config,processed_data,hole_mwd_interpolated_seconds,external_features_df,columns_to_save=[]):    
    #MERGE MWD INTERPOLATED
    processed_data = pd.concat([processed_data,hole_mwd_interpolated_seconds,external_features_df ], axis=1, join_axes=[processed_data.index])
    # REMOVE EMPY COLUMNS
    processed_data = processed_data.dropna(axis=1, how='all')
    
    if 'datetime' in processed_data.columns:
        processed_data = processed_data.drop(columns=['datetime'])
    if 'datetime_ts' in processed_data.columns:
        processed_data = processed_data.drop(columns=['datetime_ts'])
    if 'ts' in processed_data.columns:
        processed_data = processed_data.drop(columns=['ts'])
    
    if len(columns_to_save) > 0:
        processed_data = processed_data[columns_to_save]
        
    return processed_data




#client = Client('13.77.162.25',user='rhino',password='dc1234',database='test_thiago',compression='lz4')

db_helper = RhinoDBHelper(host='13.77.162.25',database='test_rio_tinto')
#client = Client('localhost',database='test',compression='lz4')
#client = Client('13.77.162.25',database='test_rio_tinto',compression='lz4')
#mwd_df = pd.read_csv('/home/thiago/data_blob/mount_milligan/mount_milligan_mwd_20181003.csv')
#mwd_map_path = '/home/thiago/data_blob/mount_milligan/mount_milligan_mwd_map.json'
#mwd_df = pd.read_csv('/home/thiago/detour_lake_mine/DR05_19-20_Nov_combined_MWD.csv')
#mwd_map_path = '/home/thiago/detour_lake_mine/DR05_19-20_Nov_combined_MWD_map.json'

mwd_df = pd.read_csv("/home/thiago/data_blob/west_angelas/west_angelas_mwd_20181005.csv")
mwd_map_path = '/home/thiago/data_blob/west_angelas/west_angelas_mwd_map.json'


with open(mwd_map_path) as f:
    mmap = json.load(f)

mwdHelper = MwdDFHelper(mwd_df,mwd_map=mmap)

mwd_dc_format = mwdHelper.dc_format(mwd_df,mmap)
mwd_df = mwd_dc_format

print "Getting all configs"
confs = db_helper.get_configs()
min_ts_date = datetime.utcfromtimestamp(confs['min_ts'].min())
max_ts_date = datetime.utcfromtimestamp(confs['max_ts'].max())
rig_ids = confs['rig_id'].unique()
print "Splitting mwd by bench,pattern,hole,rig_id"
#holes = mwdHelper._split_df_to_bph_df(mwd_df)
cond_1 = mwd_dc_format['rig_id'].isin(rig_ids)
cond_2 = mwd_dc_format['start_time'] >= min_ts_date
cond_3 = mwd_dc_format['end_time'] <= max_ts_date

print "Pre filtering mwd by configs rigs and times"
pre_filtered_mwd = mwd_dc_format[cond_1 & cond_2 & cond_3]

holes_h5 = {}

holes_cfgs = dict()

for line in confs.itertuples():
    #pdb.set_trace()
    print "Analysing file"
    cond_1 = pre_filtered_mwd['rig_id'].astype(str) == line.rig_id
    cond_2 = pre_filtered_mwd['start_time'].astype(int)/1000000000 >= line.min_ts
    cond_3 = pre_filtered_mwd['start_time'].astype(int)/1000000000 <= line.max_ts
    columns_sort_group = ['bench','pattern','hole','hole_id']
    holes_mwd = pre_filtered_mwd[cond_1 & cond_2 & cond_3].copy().sort_values(by=columns_sort_group).reset_index(drop=True)
    holes_identified = np.array(list(holes_mwd.groupby(columns_sort_group).groups))

    rig_id_ar = np.full([holes_identified.shape[0],1],str(line.rig_id))
    sensor_id_ar = np.full([holes_identified.shape[0],1],str(line.sensor_id))
    holes_identified = np.hstack((holes_identified,rig_id_ar,sensor_id_ar))
    holes_identified = np.unique(holes_identified, axis=0)

    for hole in holes_identified:
        if '----'.join(list(hole)) not in holes_cfgs:
            holes_cfgs['----'.join(list(hole))] = []
        holes_cfgs['----'.join(list(hole))].append([line.uuid,line.min_ts,line.max_ts])
        
#pdb.set_trace()
for key in holes_cfgs.keys():
    splitted_key = key.split('----')
    bench = splitted_key[0]
    pattern = splitted_key[1]
    hole = splitted_key[2]
    hole_id = splitted_key[3]
    rig_id = splitted_key[4]
    sensor_id = splitted_key[5]
    #pdb.set_trace()
    hole_mwd = mwd_dc_format[(mwd_dc_format['bench'].astype(str)==bench) & (mwd_dc_format['pattern'].astype(str)==pattern) & (mwd_dc_format['hole'].astype(str)==hole) & (mwd_dc_format['hole_id'].astype(str)== hole_id) & (mwd_dc_format['rig_id'].astype(str) == rig_id)]
    hole_mwd_interpolated_by_second = get_mwd_interpolated_by_second(hole_mwd)

    min_hole_ts = hole_mwd['start_time'].astype(int).min()/1000000000
    max_hole_ts = hole_mwd['start_time'].astype(int).max()/1000000000
    
    #max_hole_ts = min_hole_ts+10
    for files in holes_cfgs[key]:
        raw_file_uuid_str = files[0]
        ## GENERATE GLOBAL CONFIG FROM RAW DATA CONFIG JSON
        config_json = db_helper.get_config_json_from_raw_file_uuid(raw_file_uuid_str)
        global_config = Config(None)
        global_config.set_data_from_json(config_json)
        global_config_str = str(vars(global_config))
    
        # PROCESS BATCHES
        batch_size = 1000
        processed_ts_count = 0
        ts_to_process = max_hole_ts - min_hole_ts
        hole_run_uuid = None
        
        #VERIFY IF WE ALREADY HAVE THE SAME DATA WITH SAME CONFIG AND DATAMAPPING ON THE SERVER
        #PROCESS ONE SECOND JUST TO GET THE DATA MAPPING OF THE PROCESS
        raw_data_grouped_by_ts = db_helper.get_grouped_ts_raw_data(raw_file_uuid_str,min_hole_ts,min_hole_ts+1)
        processed_data = process_raw_data_interval(global_config,raw_data_grouped_by_ts)
        external_features_df = extracted_features_df_to_external_features(processed_data)
        prepared_to_save_processed_data = prepare_processed_data_to_save(global_config,processed_data,hole_mwd_interpolated_by_second,external_features_df)        
        processed_data_mapping = db_helper.get_processed_data_mapping(prepared_to_save_processed_data)
        processed_data_mapping_str = str(processed_data_mapping)        
        hole_run_uuid = db_helper.get_hole_run_uuid(bench,pattern,hole,hole_id,rig_id,sensor_id,global_config_str,raw_file_uuid_str,processed_data_mapping_str)
        ts_on_db = db_helper.get_ts_processed_data_of_hole_run(hole_run_uuid,min_hole_ts,max_hole_ts)

        while(processed_ts_count<ts_to_process):
            process_from = min_hole_ts + processed_ts_count
            process_to = process_from + batch_size
            if process_to > max_hole_ts:
                process_to = max_hole_ts
            processed_ts_count += process_to - process_from
            #print process_from,process_to,processed_ts_count,process_to-process_from
            raw_data_grouped_by_ts = db_helper.get_grouped_ts_raw_data(raw_file_uuid_str,process_from,process_to,ts_on_db)
            processed_data = process_raw_data_interval(global_config,raw_data_grouped_by_ts)
            prepared_to_save_processed_data = prepare_processed_data_to_save(global_config,processed_data,hole_mwd_interpolated_by_second,external_features_df)
            db_helper.save_processed_data(hole_run_uuid,prepared_to_save_processed_data)
            #pdb.set_trace()
        #pdb.set_trace()

