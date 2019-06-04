#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Jan 21 16:10:30 2019

@author: thiago
"""
#import json
import numpy as np
#import pandas as pd
import pdb
import os
import argparse
import pandas as pd

from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.mwd_helper import MWDHelper
from dcrhino3.helpers.mwd_rhino_merger import MWDRhinoMerger
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)

from dcrhino3.models.traces.raw_trace import RawTraceData
from dcrhino3.models.config import Config
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
import h5py
import json
import os
from dcrhino3.models.traces.raw_trace import RawTraceData


def merge_mwd_with_trace(hole_mwd, trace_data, merger):
    """
    Concatenate (along columns) rhino traces and interpolated hole mwd data from
    :func:`get_mwd_interpolated_by_second`

    Parameters:
        hole_mwd (Dataframe): hole mwd data
        trace_data (Dataframe): trace data

    Returns:
        (DataFrame): dataframe combining the two dataframes' columns
    """
    rhino_traces_df = trace_data.dataframe
    time_vector = pd.to_datetime(rhino_traces_df['timestamp'], unit='s')
    # time_vector = *(rhino_traces_df['timestamp'].values).astype(np.int64)

    interpolated_hole_mwd = merger.get_mwd_interpolated_by_second(hole_mwd, time_vector)
    merged = pd.concat([rhino_traces_df, interpolated_hole_mwd], axis=1)
    return merged


def load_raw_file(h5_file_path, timestamp_min, timestamp_max,config_str):
    logger.info("Loading raw file:" + h5_file_path + " from " + str(timestamp_min) + " to " + str(
        timestamp_max) + " total of " + str((int(timestamp_max) - int(timestamp_min))) + " traces")
    rtd = RawTraceData()
    f1 = h5py.File(h5_file_path, 'r+')
    h5_helper = H5Helper(f1, False, False)
    #global_config = Config(h5_helper.metadata)
    global_config = Config()
    global_config.set_data_from_json(json.loads(config_str))

    raw_timestamp = np.asarray(h5_helper.h5f.get('ts'), dtype=np.float64)
    logger.info("LOADED TS")
    mask = (raw_timestamp >= int(timestamp_min)) & (raw_timestamp <= int(timestamp_max))
    logger.info("GENERATED MASK")
    first_true_idx = np.argmax(mask == True)
    inverted_mask = mask[::-1]
    last_true_idx = len(inverted_mask) - np.argmax(inverted_mask)
    logger.info("LOADING DATA")
    data = [h5_helper.h5f.get('x')[first_true_idx:last_true_idx], h5_helper.h5f.get('y')[first_true_idx:last_true_idx],
            h5_helper.h5f.get('z')[first_true_idx:last_true_idx]]
    logger.info("LOADED DATA")
    temp_df = pd.DataFrame()
    temp_df['timestamp'] = raw_timestamp[mask].astype(int)
    temp_df['raw_timestamp'] = raw_timestamp[mask]
    temp_df["rssi"] = np.nan

    for component_id in global_config.components_to_process:
        component_index = global_config.component_index(component_id)
        temp_df[component_id] = data[component_index]

    ts_groups = temp_df.groupby('timestamp')

    groups_list = list(ts_groups.groups)
    num_traces = len(groups_list)

    output_dict = dict()
    output_dict['timestamp'] = np.asarray(groups_list)
    output_dict['raw_timestamps'] = num_traces * [None]
    output_dict['rssi'] = num_traces * [None]
    output_dict['packets'] = num_traces * [None]
    for component_id in global_config.components_to_process:
        output_dict[component_id] = num_traces * [None]
    for i_trace in range(num_traces):
        group_id = groups_list[i_trace]
        group = ts_groups.get_group(group_id)
        output_dict['raw_timestamps'][i_trace] = np.array(group['raw_timestamp'])
        output_dict["rssi"][i_trace] = np.mean(group["rssi"])
        packets = len(group["rssi"])
        for component_id in global_config.components_to_process:
            output_dict[component_id ][i_trace] = np.array(group[component_id])
    f1.close()
    output_df = pd.DataFrame(output_dict)
    output_df["batt"] = np.nan
    output_df["temp"] = np.nan
    output_df["packets"] = packets


    logger.info("CALIBRATING")
    calibrated_dataframe = rtd.calibrate_l1h5(output_df, global_config)
    logger.info("CALIBRATED")
    logger.info("RESAMPLING")
    resampled_dataframe = rtd.resample_l1h5(calibrated_dataframe, global_config)
    logger.info("RESAMPLED")
    logger.info("AUTOCORRELATING")
    autcorrelated_dataframe = rtd.autocorrelate_l1h5(resampled_dataframe, global_config)
    logger.info("AUTOCORRELATED")

    if 'axial' in calibrated_dataframe.columns:
        calibrated_dataframe["max_axial_acceleration"] = np.asarray(calibrated_dataframe["axial"].apply(
            lambda x: np.max(x)))
        calibrated_dataframe["min_axial_acceleration"] = np.asarray(calibrated_dataframe["axial"].apply(
            lambda x: np.min(x)))
    else:
        calibrated_dataframe["max_axial_acceleration"] = 0
        calibrated_dataframe["min_axial_acceleration"] = 0

    if 'tangential' in calibrated_dataframe.columns:
        calibrated_dataframe["max_tangential_acceleration"] = np.asarray(calibrated_dataframe[
            "tangential"].apply(
            lambda x: np.max(x)))
        calibrated_dataframe["min_tangential_acceleration"] = np.asarray(calibrated_dataframe[
            "tangential"].apply(
            lambda x: np.min(x)))
    else:
        calibrated_dataframe["max_tangential_acceleration"] = 0
        calibrated_dataframe["min_tangential_acceleration"] = 0

    if 'radial' in calibrated_dataframe.columns:
        calibrated_dataframe["max_radial_acceleration"] = np.asarray(calibrated_dataframe["radial"].apply(
            lambda x: np.max(x)))
        calibrated_dataframe["min_radial_acceleration"] = np.asarray(calibrated_dataframe["radial"].apply(
            lambda x: np.min(x)))
    else:
        calibrated_dataframe["max_radial_acceleration"] = 0
        calibrated_dataframe["min_radial_acceleration"] = 0

    if 'radial' not in autcorrelated_dataframe.columns:
        num_lines = autcorrelated_dataframe.shape[0]
        len_line = len(autcorrelated_dataframe['axial'].values[0])
        temp = [None] * num_lines
        for i in range(num_lines):
            temp[i] = [0] * len_line
        autcorrelated_dataframe['radial'] = temp

    if 'tangential' not in autcorrelated_dataframe.columns:
        num_lines = autcorrelated_dataframe.shape[0]
        len_line = len(autcorrelated_dataframe['axial'].values[0])
        temp = [None] * num_lines
        for i in range(num_lines):
            temp[i] = [0] * len_line
        autcorrelated_dataframe['tangential'] = temp

    if 'rssi' not in autcorrelated_dataframe.columns:
        num_lines = autcorrelated_dataframe.shape[0]
        len_line = len(autcorrelated_dataframe['axial'].values[0])
        temp = [None] * num_lines
        for i in range(num_lines):
            temp[i] = [0] * len_line
        autcorrelated_dataframe['rssi'] = temp

    if 'temp' not in autcorrelated_dataframe.columns:
        num_lines = autcorrelated_dataframe.shape[0]
        len_line = len(autcorrelated_dataframe['axial'].values[0])
        temp = [None] * num_lines
        for i in range(num_lines):
            temp[i] = [0] * len_line
        autcorrelated_dataframe['temp'] = temp

    if 'batt' not in autcorrelated_dataframe.columns:
        num_lines = autcorrelated_dataframe.shape[0]
        len_line = len(autcorrelated_dataframe['axial'].values[0])
        temp = [None] * num_lines
        for i in range(num_lines):
            temp[i] = [0] * len_line
        autcorrelated_dataframe['batt'] = temp

    if 'packets' not in autcorrelated_dataframe.columns:
        num_lines = autcorrelated_dataframe.shape[0]
        len_line = len(autcorrelated_dataframe['axial'].values[0])
        temp = [None] * num_lines
        for i in range(num_lines):
            temp[i] = [0] * len_line
        autcorrelated_dataframe['packets'] = temp

    return autcorrelated_dataframe, global_config


def load_acorr_file(h5_file_path, timestamp_min, timestamp_max,config_str):
    f1 = h5py.File(h5_file_path, 'r+')
    global_config_jsons = json.loads(f1.attrs['global_config_jsons'])
    global_config = Config()
    global_config.set_data_from_json(json.loads(config_str))
    timestamp_min = timestamp_min
    timestamp_max = timestamp_max
    timestamps = np.asarray(f1.get('timestamp'), dtype=np.float64)
    mask = (timestamps >= timestamp_min) & (timestamps <= timestamp_max)
    first_true_idx = np.argmax(mask == True)
    inverted_mask = mask[::-1]
    last_true_idx = len(inverted_mask) - np.argmax(inverted_mask)
    h5f = f1
    COMPONENT_IDS = ['axial', 'tangential', 'radial']
    dict_for_df = {}
    for component_id in COMPONENT_IDS:
        try:
            trace_label = '{}_trace'.format(component_id)
            if trace_label in h5f.keys():
                trace_data = h5f.get(trace_label)[first_true_idx:last_true_idx]
                trace_data = np.asarray(trace_data)
                trace_data = list(trace_data)
                dict_for_df[trace_label] = trace_data
        except KeyError:
            logger.info('Skipping loading {} as it DNE'.format(trace_label))
    # </load traces>

    for key in h5f.keys():
        if key[-9:] == 'ial_trace':  # skip traces
            continue
        data = h5f.get(key)[first_true_idx:last_true_idx]
        dict_for_df[key] = np.asarray(data)
    df = pd.DataFrame(dict_for_df)

    return df, global_config


import pdb


def generate_cache_acorr(matches_line,files,mwd_df,mwd_helper):
    files_ids_to_load = np.array(matches_line.files_ids.split(',')).astype(int)
    files_to_load = files[files['sensor_file_id'].astype(int).isin(files_ids_to_load)]
    td = TraceData()
    for file in files_to_load.iterrows():
        if int(file[1].type) == 1:
            output_df, global_config = load_raw_file(file[1].file_path, matches_line.start_time_min,
                                                     matches_line.start_time_max,file[1].config_str)
        elif int(file[1].type) == 2:
            output_df, global_config = load_acorr_file(file[1].file_path, matches_line.start_time_min,
                                                       matches_line.start_time_max,file[1].config_str)
            # pdb.set_trace()
        file_id = file[1].sensor_file_id
        output_df['acorr_file_id'] = file_id
        td.dataframe = pd.concat([td.dataframe, output_df])

        td._global_configs[str(file_id)] = global_config

    td.dataframe = td.dataframe.sort_values('timestamp').reset_index().drop('index', 1)
    hole_mwd = mwd_helper.get_hole_mwd_from_mine_mwd(mwd_df, matches_line.bench_name,
                                                     matches_line.pattern_name, matches_line.hole_name,
                                                     matches_line.hole_id)
    td.dataframe = merge_mwd_with_trace(hole_mwd, td, merger)
    return td

def process_match_line(line,env_config,mine_name,files_df,mwd_df,mwd_helper):
    if line.solution_label == 'Non Conflict':
        td = generate_cache_acorr(line,files_df,mwd_df,mwd_helper)
        holes_cached_folder = env_config.get_hole_h5_interpolated_cache_folder(mine_name)


if __name__ == '__main__':
    use_argparse = True
    if use_argparse:
        argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
        argparser.add_argument("mine_name", metavar="mine_name", type=str, help="Mine Name")
        argparser.add_argument("-env", '--env_config_path', help="Path to optional env config file", default=False)
        argparser.add_argument("-m", '--matches_output_path', help="Path to optional matches file", default=False)
        args = argparser.parse_args()
        mine_name = args.mine_name
        env_config_path = args.env_config_path
    else:
        mine_name = ''

    env_config = EnvConfig()
    mwd_helper = MWDHelper(env_config)
    mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(args.mine_name)
    merger = MWDRhinoMerger(None,None,False)
    sqlconn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    sql_db_helper = RhinoSqlHelper(host=sqlconn['host'], user=sqlconn['user'], passwd=sqlconn['password'],database=sqlconn['database'])
    matches_df = sql_db_helper.matches.get_all()
    files_df = sql_db_helper.sensor_files.get_all()
    #generate_cache_acorr(mine_name, env_config_path,args.matches_output_path)
    matches_df.apply(process_match_line, axis=1,args=(env_config,args.mine_name,files_df,mwd_df,mwd_helper))
