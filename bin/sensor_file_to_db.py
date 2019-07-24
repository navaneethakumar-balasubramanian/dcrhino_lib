# -*- coding: utf-8 -*-
import os
os.environ['MKL_NUM_THREADS'] = '1'
os.environ['OPENBLAS_NUM_THREADS'] = '1'
os.environ['OMP_NUM_THREADS'] = '1'
from multiprocessing import Pool
import traceback
import argparse
import pdb
import sys
import glob2
import os
import logging
import json
import numpy as np
import h5py
import time
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.models.config import Config
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.helpers.sensor_file_manager import SensorFileManager
from dcrhino3.models.traces.raw_trace import RawTraceData
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.general_helper_functions import init_logging,splitDataFrameIntoSmaller,init_logging_to_file,file_as_bytes
import hashlib
import os
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.helpers.rhino_clickhouse_helper import ClickhouseHelper

from multiprocessing import Process

logger = init_logging(__name__)
file_logger = init_logging_to_file(__name__)

COMPONENT_IDS = ['axial', 'tangential', 'radial']



def prepare_to_save(autcorrelated_dataframe,sensor_file_id,original_file_record_day):
    autcorrelated_dataframe['relative_timestamp'] = autcorrelated_dataframe.timestamp
    if 'rssi' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['rssi'] = None
    if 'batt' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['batt'] = None
    if 'temp' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['temp'] = None
    if 'microtime' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['microtime'] = 0
    if 'radial_trace' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['radial_trace'] = list(np.full([autcorrelated_dataframe.shape[0], 1], None))
    if 'tangential_trace' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['tangential_trace'] = list(np.full([autcorrelated_dataframe.shape[0], 1], None))
    if 'axial_trace' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['axial_trace'] = list(np.full([autcorrelated_dataframe.shape[0], 1], None))
    if 'min_tangential_acceleration' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['min_tangential_acceleration'] = None
    if 'max_tangential_acceleration' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['max_tangential_acceleration'] = None
    if 'min_radial_acceleration' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['min_radial_acceleration'] = None
    if 'max_radial_acceleration' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['max_radial_acceleration'] = None
    if 'min_axial_acceleration' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['min_axial_acceleration'] = None
    if 'max_axial_acceleration' not in autcorrelated_dataframe.columns:
        autcorrelated_dataframe['max_axial_acceleration'] = None
    autcorrelated_dataframe['sensor_file_id'] = sensor_file_id
    autcorrelated_dataframe['original_file_record_day'] = int(original_file_record_day)
    autcorrelated_dataframe.drop(['timestamp'], axis=1, inplace=True)
    return autcorrelated_dataframe

def process(list_of_args):
    try:
        file = list_of_args[0]
        env_config = list_of_args[1]

        h5f = h5py.File(file, 'r+')

        min_ts = sensor_file_manager.min_ts(h5f)
        max_ts = sensor_file_manager.max_ts(h5f)


        if sensor_file_manager.is_h5_level0(h5f):
            h5f.close()
            print ("TYPE 1 " + str(file))
            raw_trace_h5_to_db(file, env_config, min_ts, max_ts)
        else:
            h5f.close()
            print ("TYPE 2 " + str(file))
            acorr_h5_to_db(file, env_config, min_ts, max_ts)
    except Exception, e:
        file_logger.warn("COULDNT OPEN THIS FILE :" + str(file))
        logger.warn("COULDNT OPEN THIS FILE :" + str(file))
        traceback.print_exc()
        return


def save_to_db(sql_db_helper,h5_file_path,min_ts_df,global_config,min_ts,max_ts,conn,autcorrelated_dataframe,file_type,file_checksum):
    logger.info("Adding this file to sensor_files_table")
    original_file_record_day = int(time.strftime("%Y%m%d", time.gmtime(min_ts_df)))
    file_changed_at = os.path.getmtime(h5_file_path)
    file_size = os.path.getsize(h5_file_path)
    file_id = sql_db_helper.sensor_files.add(h5_file_path, global_config.rig_id,
                                             str(global_config.sensor_serial_number),
                                             str(global_config.digitizer_serial_number), min_ts,
                                             max_ts,
                                             json.dumps(vars(global_config), indent=4), file_type,
                                             status='valid',
                                             file_name=os.path.basename(h5_file_path),
                                             original_file_record_day=original_file_record_day,
                                             file_changed_at=file_changed_at,
                                             file_size = file_size,
                                             file_checksum=file_checksum)

    logger.info("Adding this file traces to clickhouse sensor_file_acorr_traces")
    clickhouse_helper = ClickhouseHelper(conn=conn)
    autcorrelated_dataframe = prepare_to_save(autcorrelated_dataframe, file_id, original_file_record_day)
    clickhouse_helper.sensor_file_acorr_trace.add_pandas_to_table(autcorrelated_dataframe)


def raw_trace_h5_to_db(h5_file_path, env_config, min_ts, max_ts,chunk_size=5000):
    raw_trace_data = RawTraceData()
    global_config = raw_trace_data.load_config(h5_file_path)
    logger.info("Mine name on file:" + str(global_config.mine_name))
    conn = env_config.get_rhino_db_connection_from_mine_name(global_config.mine_name)
    sql_conn = env_config.get_rhino_sql_connection_from_mine_name(global_config.mine_name)
    db_helper = RhinoDBHelper(conn=conn)
    sql_db_helper = RhinoSqlHelper(**sql_conn)

    #file_exists = sql_db_helper.sensor_files.file_name_exists(os.path.basename(h5_file_path))
    #file_exists = sql_db_helper.sensor_files.relative_path_exists(h5_file_path)
    file_checksum = hashlib.md5(file_as_bytes(open(h5_file_path, 'rb'))).hexdigest()
    file_with_path = sql_db_helper.sensor_files.get_file_by_relative_path(h5_file_path)
    file_exists = (len(file_with_path)>0)
    if file_exists:
        if file_checksum in file_with_path.file_checksum.values.astype(np.str):
            logger.warning("IGNORED THIS FILE: DUPLICATED with same file checksum : " + str(os.path.getsize(h5_file_path)) )
            return False
        else:

            for row in file_with_path.iterrows():
                logger.info("Setting sensor files as invalid " + str(row[1].sensor_file_id))
                sql_db_helper.sensor_files.set_status(row[1].sensor_file_id,"invalid")
            #return False

    raw_trace_data.load_from_h5(h5_file_path)
    l1h5_dataframe = raw_trace_data.dataframe
    l1h5_dataframe = l1h5_dataframe.dropna(how='all')
    l1h5_dataframe = l1h5_dataframe.reset_index(drop=True)

    global_config = raw_trace_data.global_config_by_index("0")

    upsample_factor = 1.25
    try:
        print(global_config.upsample_factor)
    except AttributeError:
        logger.warning("this warning will be removed once the upsample factor is coming from the global cfg")
        global_config.output_sampling_rate *= upsample_factor

    calibrated_dataframe = raw_trace_data.calibrate_l1h5(l1h5_dataframe, global_config)
    resampled_dataframe = raw_trace_data.resample_l1h5(calibrated_dataframe, global_config)
    autcorrelated_dataframe = raw_trace_data.autocorrelate_l1h5(resampled_dataframe, global_config)

    calibrated_dataframe.sort_values('timestamp', inplace=True)
    calibrated_dataframe.reset_index(drop=True, inplace=True)
    autcorrelated_dataframe.sort_values('timestamp',inplace=True)
    autcorrelated_dataframe.reset_index(drop=True,inplace=True)
    min_ts_df = autcorrelated_dataframe['timestamp'].min()
    autcorrelated_dataframe['timestamp'] = autcorrelated_dataframe['timestamp'] - min_ts_df


    for column in COMPONENT_IDS:
        if column in autcorrelated_dataframe:
            data_array = np.atleast_2d(list(autcorrelated_dataframe[column]))
            count_non_zeroes = np.count_nonzero(data_array)
            if count_non_zeroes == 0:
                autcorrelated_dataframe.drop([column],axis=1,inplace=True)
            else:
                autcorrelated_dataframe["max_" + column + "_acceleration"] = np.asarray(calibrated_dataframe[column].apply(
                    lambda x: np.max(x)))
                autcorrelated_dataframe["min_" + column + "_acceleration"] = np.asarray(calibrated_dataframe[column].apply(
                    lambda x: np.min(x)))



    for column in calibrated_dataframe.columns:
        if column not in COMPONENT_IDS and column not in autcorrelated_dataframe.columns:
            data_array = calibrated_dataframe[column]
            count_non_nans = np.count_nonzero(~np.isnan(data_array))
            count_non_zeroes = np.count_nonzero(data_array)
            ## IGNORE COLUMN IF ALL ZEROES OR ALL NANS
            if count_non_zeroes > 0 and count_non_nans > 0:
                autcorrelated_dataframe[column] = data_array

    for column in COMPONENT_IDS:
        if column in autcorrelated_dataframe.columns:
            autcorrelated_dataframe.rename({column:column+"_trace"},axis=1,inplace=True)

    save_to_db(sql_db_helper,h5_file_path,min_ts_df,global_config,min_ts,max_ts,conn,autcorrelated_dataframe,1,file_checksum)


    return autcorrelated_dataframe


def acorr_h5_to_db(h5_file_path, env_config, min_ts, max_ts,chunk_size=5000):
    h5f = h5py.File(h5_file_path, 'r+')
    if 'global_config_jsons' in h5f.attrs.keys():
        unicode_string = h5f.attrs['global_config_jsons']
        global_config_jsons = json.loads(unicode_string)
        for file_id, file_config in global_config_jsons.items():
            global_config = Config()
            global_config.set_data_from_json(json.loads(file_config))
    else:
        h5_helper = H5Helper(h5f, False, False)
        global_config = Config(h5_helper.metadata)

    conn = env_config.get_rhino_db_connection_from_mine_name(global_config.mine_name)
    sql_conn = env_config.get_rhino_sql_connection_from_mine_name(global_config.mine_name)
    sql_db_helper = RhinoSqlHelper(**sql_conn)

    file_checksum = hashlib.md5(file_as_bytes(open(h5_file_path, 'rb'))).hexdigest()
    file_with_path = sql_db_helper.sensor_files.get_file_by_relative_path(h5_file_path)
    file_exists = (len(file_with_path) > 0)
    if file_exists:
        if file_checksum in file_with_path.file_checksum.values.astype(np.str):
            logger.warning("IGNORED THIS FILE: DUPLICATED with same file checksum : " + str(file_checksum) )
            return False
        else:

            for row in file_with_path.iterrows():
                logger.info("Setting sensor files as invalid " + str(row[1].sensor_file_id))
                sql_db_helper.sensor_files.set_status(row[1].sensor_file_id,"invalid")


    td = TraceData()
    td.load_from_h5(h5_file_path)
    raw_trace_data = td
    l1h5_dataframe = raw_trace_data.dataframe

    for column in COMPONENT_IDS:
        data_array = np.atleast_2d(list(l1h5_dataframe[column + "_trace"]))
        count_non_zeroes = np.count_nonzero(data_array)
        if count_non_zeroes == 0:
            l1h5_dataframe.drop([column + "_trace"], axis=1, inplace=True)
            min_accel = "min_"+column+"_acceleration"
            max_accel = "max_" + column + "_acceleration"
            if min_accel in l1h5_dataframe.columns:
                l1h5_dataframe.drop([min_accel], axis=1, inplace=True)
            if max_accel in l1h5_dataframe.columns:
                l1h5_dataframe.drop([max_accel], axis=1, inplace=True)

    min_ts_df = l1h5_dataframe['timestamp'].min()
    l1h5_dataframe['timestamp'] = l1h5_dataframe['timestamp'] - min_ts_df
    save_to_db(sql_db_helper, h5_file_path, min_ts_df, global_config, min_ts, max_ts, conn, l1h5_dataframe,2,file_checksum)


    return

if __name__ == '__main__':
    clickhouse_logger = logging.getLogger('clickhouse_driver.connection')
    clickhouse_logger.setLevel(50)
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
    argparser.add_argument('-env', '--env-file', help="ENV File Path", default=False)
    argparser.add_argument('-mp', '--mp-processes', help="MULTIPROCESSING PROCESSES", default=False)
    argparser.add_argument("src_path", metavar="path", type=str,
    help="Path to files to be merged; enclose in quotes, accepts * as wildcard for directories or filenames")
    args = argparser.parse_args()

    env_config = EnvConfig(args.env_file)
    files = glob2.glob(args.src_path)
    
    logger.info("Found " + str(len(files)) + " files" )

    sensor_file_manager = SensorFileManager(env_config)

    process_queue = []

    if not files:
        print  'File does not exist: ' + args.src_path
    for file in files:
        if '.h5' in os.path.splitext(file)[1]:
            if env_config.is_file_blacklisted(file) is False:
                process_queue.append([file,env_config])

    if args.mp_processes is not False:
        p = Pool(int(args.mp_processes))
        p.map(process, process_queue)
    else:
        for process_args in process_queue:
            process(process_args)