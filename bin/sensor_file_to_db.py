# -*- coding: utf-8 -*-

import argparse
import pdb

import glob2
import os
import logging
import json
import numpy as np
import h5py
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.helpers.sensor_file_manager import SensorFileManager
from dcrhino3.models.traces.raw_trace import RawTraceData
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.general_helper_functions import init_logging,splitDataFrameIntoSmaller

from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper

from multiprocessing import Process

logger = init_logging(__name__)

def raw_trace_h5_to_db(h5_file_path,env_config,min_ts,max_ts,chunk_size=500):
    raw_trace_data = RawTraceData()
    global_config = raw_trace_data.load_config(h5_file_path)


    #raw_trace_data.load_from_h5(h5_file_path)
    #l1h5_dataframe = raw_trace_data.dataframe

    #global_config = raw_trace_data.global_config_by_index("0")

    #upsample_factor = 1.25
    #try:
    #    print(global_config.upsample_factor)
    #except AttributeError:
    #    logger.warning("this warning will be removed once the upsample factor is coming from the global cfg")
    #    global_config.output_sampling_rate *= upsample_factor

    #db_helper = RhinoDBHelper('13.66.189.94',database='mont_wright')
    logger.info("Mine name on file:" + str(global_config.mine_name))
    conn = env_config.get_rhino_db_connection_from_mine_name(global_config.mine_name)
    sql_conn = env_config.get_rhino_sql_connection_from_mine_name(global_config.mine_name)
    db_helper= RhinoDBHelper(conn=conn)
    sql_db_helper = RhinoSqlHelper(host=sql_conn['host'],user=sql_conn['user'],passwd=sql_conn['password'],database=sql_conn['database'])


    file_exists = sql_db_helper.sensor_files.relative_path_exists(h5_file_path,status='valid')

    if file_exists:
        logger.warning("IGNORED THIS FILE: DUPLICATED")
        return
    #else:
    #    file_id = sql_db_helper.sensor_files.add(h5_file_path,global_config.rig_id,str(global_config.sensor_serial_number),str(global_config.digitizer_serial_number),int(min),int(max),json.dumps(vars(global_config), indent=4),1,status='valid')

    return
    list_df = splitDataFrameIntoSmaller(l1h5_dataframe.reset_index(drop=True),chunk_size)
    p = False
    process_count = 0
    for chunk in list_df:
        if len(chunk) > 0:
            p = Process(target=process_chunk, args=(chunk,raw_trace_data,global_config,file_id,db_helper))
            p.start()
            process_count += 1
        if process_count == cpus:
            p.join()
            process_count = 0
    if p:
        p.join()
    sql_db_helper.sensor_files.set_status(file_id,status='valid')

def acorr_to_acorr_db(h5_file_path,env_config,cpus,chunk_size=5000):
    td = TraceData()
    td.load_from_h5(h5_file_path)
    raw_trace_data = td
    l1h5_dataframe = raw_trace_data.dataframe

    h5f = h5py.File(h5_file_path,"r")
    h5_helper = H5Helper(h5f)
    global_config = h5_helper._extract_global_config_from_h5_file()
    raw_trace_data._global_configs["0"] = global_config
    h5f.close()



    logger.info("Mine name on file:" + str(global_config.mine_name))
    cconn = env_config.get_rhino_db_connection_from_mine_name(global_config.mine_name)
    sql_conn = env_config.get_rhino_sql_connection_from_mine_name(global_config.mine_name)
    db_helper= RhinoDBHelper(conn=conn)
    sql_db_helper = RhinoSqlHelper(host=sql_conn['host'],user=sql_conn['user'],passwd=sql_conn['password'],database=sql_conn['database'])


    file_exists = sql_db_helper.sensor_files.relative_path_exists(h5_file_path,status='valid')

    if file_exists:
        logger.warning("IGNORED THIS FILE: DUPLICATED")
        return
    else:
        file_id = sql_db_helper.sensor_files.add(h5_file_path,global_config.rig_id,str(global_config.sensor_serial_number),str(global_config.digitizer_serial_number),int(l1h5_dataframe['timestamp'].min()),int(l1h5_dataframe['timestamp'].max()),json.dumps(vars(global_config), indent=4),2,status='processing')



    list_df = splitDataFrameIntoSmaller(l1h5_dataframe.reset_index(drop=True),chunk_size)

    for chunk in list_df:
        if len(chunk) > 0:
            autcorrelated_dataframe = chunk

            db_helper.save_autocorr_traces(file_id, autcorrelated_dataframe['timestamp'],
                                           axial=autcorrelated_dataframe['axial_trace'],
                                           radial=autcorrelated_dataframe['radial_trace'],
                                           tangential=autcorrelated_dataframe['tangential_trace'],
                                           max_axial_acceleration=autcorrelated_dataframe['max_axial_acceleration'],
                                           min_axial_acceleration=autcorrelated_dataframe['min_axial_acceleration'],
                                           max_tangential_acceleration=autcorrelated_dataframe[
                                               'max_tangential_acceleration'],
                                           min_tangential_acceleration=autcorrelated_dataframe[
                                               'min_tangential_acceleration'],
                                           max_radial_acceleration=autcorrelated_dataframe['max_radial_acceleration'],
                                           min_radial_acceleration=autcorrelated_dataframe['min_radial_acceleration'],
                                           rssi=autcorrelated_dataframe["rssi"],
                                           temp=autcorrelated_dataframe["temp"],
                                           batt=autcorrelated_dataframe["batt"],
                                           packets=autcorrelated_dataframe["packets"]
                                           )


def process_chunk(chunk,raw_trace_data,global_config,file_id,db_helper):
    calibrated_dataframe = raw_trace_data.calibrate_l1h5(chunk, global_config)
    resampled_dataframe = raw_trace_data.resample_l1h5(calibrated_dataframe, global_config)
    autcorrelated_dataframe = raw_trace_data.autocorrelate_l1h5(resampled_dataframe, global_config)
    # pdb.set_trace()
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

    db_helper.save_autocorr_traces(file_id, autcorrelated_dataframe['timestamp'],
                                   axial=autcorrelated_dataframe['axial'],
                                   radial=autcorrelated_dataframe['radial'],
                                   tangential=autcorrelated_dataframe['tangential'],
                                   max_axial_acceleration=calibrated_dataframe['max_axial_acceleration'],
                                   min_axial_acceleration=calibrated_dataframe['min_axial_acceleration'],
                                   max_tangential_acceleration=calibrated_dataframe['max_tangential_acceleration'],
                                   min_tangential_acceleration=calibrated_dataframe['min_tangential_acceleration'],
                                   max_radial_acceleration=calibrated_dataframe['max_radial_acceleration'],
                                   min_radial_acceleration=calibrated_dataframe['min_radial_acceleration'],
                                   rssi=calibrated_dataframe["rssi"],
                                   temp=calibrated_dataframe["temp"],
                                   batt=calibrated_dataframe["batt"],
                                   packets=calibrated_dataframe["packets"]
                                   )

if __name__ == '__main__':
    clickhouse_logger = logging.getLogger('clickhouse_driver.connection')
    clickhouse_logger.setLevel(50)
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
    argparser.add_argument('-env', '--env-file', help="ENV File Path", default=False)
    argparser.add_argument('-cpus', '--cpus', help="CPUS", default=4)
    argparser.add_argument("src_path", metavar="path", type=str,
    help="Path to files to be merged; enclose in quotes, accepts * as wildcard for directories or filenames")
    args = argparser.parse_args()

    env_config = EnvConfig(args.env_file)
    files = glob2.glob(args.src_path)
    
    logger.info("Found " + str(len(files)) + " files" )

    sensor_file_manager = SensorFileManager(env_config)

    if not files:
        print  'File does not exist: ' + args.src_path
    for file in files:
        if '.h5' in os.path.splitext(file)[1]:
            if env_config.is_file_blacklisted(file) is False:
                try:
                    logger.info("PROCESSING FILE:" + str(file))
                    h5f = h5py.File(file, 'r+')
                    min_ts = sensor_file_manager.min_ts(h5f)
                    max_ts = sensor_file_manager.max_ts(h5f)


                    if sensor_file_manager.is_h5_level0(h5f):
                        h5f.close()
                        raw_trace_h5_to_db(file, env_config,min_ts,max_ts)
                    else :
                        h5f.close()
                        acorr_to_acorr_db(file, env_config, args.cpus)

                except Exception,e:
                    logger.warn("FAILED TO PROCESS FILE:" + str(file))
                    print (e)
