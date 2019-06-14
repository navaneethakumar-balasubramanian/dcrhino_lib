#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Jan 21 16:10:30 2019

@author: thiago
"""
import os
os.environ['MKL_NUM_THREADS'] = '1'
os.environ['OPENBLAS_NUM_THREADS'] = '1'
os.environ['OMP_NUM_THREADS'] = '1'


#import json
import numpy as np
#import pandas as pd
import pdb
import os
import argparse
import pandas as pd

from multiprocessing import Process

from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.mwd_helper import MWDHelper
from dcrhino3.helpers.mwd_rhino_merger import MWDRhinoMerger
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.general_helper_functions import init_logging, init_logging_to_file

logger = init_logging(__name__)

from dcrhino3.models.traces.raw_trace import RawTraceData
from dcrhino3.models.config import Config
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
import h5py
import json
import os
from dcrhino3.models.traces.raw_trace import RawTraceData
from multiprocessing import Pool
from dcrhino3.helpers.rhino_clickhouse_helper import ClickhouseHelper


file_logger = init_logging_to_file(__name__)

COMPONENT_IDS = ['axial', 'tangential', 'radial']


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

    mwd_depth_spacing = np.median(np.diff(hole_mwd.depth))
    for key, global_config in trace_data._global_configs.items():
        global_config.mwd_depth_spacing = mwd_depth_spacing

    rhino_traces_df = trace_data.dataframe
    time_vector = pd.to_datetime(rhino_traces_df['timestamp'], unit='s')
    # time_vector = *(rhino_traces_df['timestamp'].values).astype(np.int64)

    interpolated_hole_mwd = merger.get_mwd_interpolated_by_second(hole_mwd, time_vector)
    merged = pd.concat([rhino_traces_df, interpolated_hole_mwd], axis=1)
    return merged



def load_acorr_db(sensor_file_id, timestamp_min, timestamp_max,config_str, file_min_ts,clickhouse_helper):


    global_config = Config()
    global_config.set_data_from_json(json.loads(config_str))

    upsample_factor = 1.25
    try:
        print(global_config.upsample_factor)
    except AttributeError:
        logger.warning("this warning will be removed once the upsample factor is coming from the global cfg")
        global_config.output_sampling_rate *= upsample_factor


    relative_timestamp_min = int(timestamp_min) - int(file_min_ts)
    relative_timestamp_max = int(timestamp_max) - int(file_min_ts)
    df = clickhouse_helper.sensor_file_acorr_trace.get_traces(sensor_file_id,relative_timestamp_min,relative_timestamp_max)
    df['timestamp'] = df['relative_timestamp'] + int(file_min_ts)
    df.drop(['relative_timestamp'],axis=1,inplace=True)

    return df, global_config


import pdb


def generate_cache_acorr(matches_line,files,mwd_df,mwd_helper,env_config,mine_name):
    files_ids_to_load = np.array(matches_line.solution.split(',')).astype(int)
    files_to_load = files[files['sensor_file_id'].astype(int).isin(files_ids_to_load)]
    td = TraceData()
    for file in files_to_load.iterrows():
        folder = env_config.get_sensor_files_storage_folder(mine_name)
        file_path = os.path.join(folder,str(file[1].sensor_file_id) + ".h5")
        clickhouse_helper = ClickhouseHelper(conn=env_config.get_rhino_db_connection_from_mine_name(mine_name))
        #output_df, global_config = load_acorr_file(file_path, matches_line.start_time_min, matches_line.start_time_max,file[1].config_str, file[1].min_ts)
        output_df, global_config = load_acorr_db(file[1].sensor_file_id, matches_line.start_time_min, matches_line.start_time_max,
                                                   file[1].config_str, file[1].min_ts,clickhouse_helper)

        for component_id in COMPONENT_IDS:
            output_df.rename(columns={ component_id + "_trace":component_id}, inplace=True)
            # pdb.set_trace()
        file_id = file[1].sensor_file_id
        output_df['acorr_file_id'] = file_id
        td.dataframe = pd.concat([td.dataframe, output_df])

        td._global_configs[str(file_id)] = global_config

    td.dataframe = td.dataframe.sort_values('timestamp').reset_index().drop('index', 1)
    hole_mwd = mwd_helper.get_hole_mwd_from_mine_mwd(mwd_df, matches_line.bench_name,
                                                     matches_line.pattern_name, matches_line.hole_name,
                                                     matches_line.hole_id)
    hole_mwd.reset_index(drop=True,inplace=True)
    td.dataframe = merge_mwd_with_trace(hole_mwd, td, merger)
    return td

def process_match_line(line,env_config,mine_name,files_df,mwd_df,mwd_helper):

    if line.solution_label == 'Non Conflict' or line.solution_label== 'Conflict Solved':
        td = generate_cache_acorr(line,files_df,mwd_df,mwd_helper,env_config,mine_name)
        if td is False:
            return
        holes_cached_folder = env_config.get_hole_h5_interpolated_cache_folder(mine_name)
        h5_filename = str(line.bench_name) + "_" + str(line.pattern_name) + "_" + str(line.hole_name) + "_" + str(
            line.hole_id) + "_" + str(line.sensor_id) + "_" + str(line.digitizer_id) + ".h5"
        h5_path = os.path.join(holes_cached_folder, h5_filename)
        temp_h5_path = h5_path.replace(".h5", "temp.h5")
        #print temp_h5_path

        ## RENAME COLUMNS TO AXIAL_TRACE
        for component_id in COMPONENT_IDS:
            td.dataframe.rename(columns={component_id:component_id + "_trace"}, inplace=True)

        for column in td.dataframe.columns:
            data_array = td.dataframe[column]
            ## IGNORE COLUMN IF ALL ZEROES OR ALL NANS
            if data_array.dtype != np.dtype('datetime64[ns]') and( (np.array(data_array) == None).all() or (np.array(data_array) == 0).all() or (np.array(list(data_array)) == None).all()):
                td.dataframe.drop([column],axis=1,inplace=True)
            else:
                if '_trace' in column:
                    have_data_on_line = False
                    for line in data_array:
                        if ((np.array(line) == 0).all() or (np.array(line) == None).all() or np.isnan(np.array(line)).all()) == False:
                            have_data_on_line = True
                            break
                    if have_data_on_line is False:
                        td.dataframe.drop([column], axis=1, inplace=True)


        try:
            td.save_to_h5(temp_h5_path)
        except:
            pass
        logger.info("File saved at " + temp_h5_path)
        try:
            os.rename(temp_h5_path, h5_path)

        except:
            logger.error("Failed to rename " + str(temp_h5_path) + " to " + str(h5_path))
    return


def process(list_of_args):
    try:
        process_match_line(list_of_args[0], list_of_args[1], list_of_args[2], list_of_args[3],list_of_args[4], list_of_args[5])
    except:
        logger.warn("FAILED TO PROCESS THIS " + str(list_of_args[2]))
        file_logger.warn("FAILED TO PROCESS THIS " + str(list_of_args[2]))


if __name__ == '__main__':
    use_argparse = True
    if use_argparse:
        argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
        argparser.add_argument("mine_name", metavar="mine_name", type=str, help="Mine Name")
        argparser.add_argument("-env", '--env_config_path', help="Path to optional env config file", default=False)
        argparser.add_argument("-m", '--matches_output_path', help="Path to optional matches file", default=False)
        argparser.add_argument('-mp', '--mp-processes', help="MULTIPROCESSING PROCESSES", default=False)
        argparser.add_argument('-mid', '--match-id', help="Match id", default=False)
        args = argparser.parse_args()
        mine_name = args.mine_name
        env_config_path = args.env_config_path
        processes = args.mp_processes
        match_id = args.match_id
    else:
        mine_name = ''

    env_config = EnvConfig()
    mwd_helper = MWDHelper(env_config)
    mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(args.mine_name)
    if mwd_df is not False:
        merger = MWDRhinoMerger(None,None,False)
        sqlconn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
        sql_db_helper = RhinoSqlHelper(host=sqlconn['host'], user=sqlconn['user'], passwd=sqlconn['password'],database=sqlconn['database'])
        matches_df = sql_db_helper.matches.get_all()
        files_df = sql_db_helper.sensor_files.get_all()
        #generate_cache_acorr(mine_name, env_config_path,args.matches_output_path)
        processes_queue = []
        for line in matches_df.iterrows():
            if match_id is False or str(line[1].match_id) == match_id:
                line = line[1]
                if processes is not False:
                    processes_queue.append([line,env_config,args.mine_name,files_df,mwd_df,mwd_helper])
                else:
                    process_match_line(line, env_config, args.mine_name, files_df, mwd_df, mwd_helper)

        if processes is not False:
            p = Pool(int(processes))
            p.map(process, processes_queue)
        # matches_df.apply(process_match_line, axis=1,args=(env_config,args.mine_name,files_df,mwd_df,mwd_helper))