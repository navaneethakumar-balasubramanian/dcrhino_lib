# -*- coding: utf-8 -*-
import os
os.environ['MKL_NUM_THREADS'] = '1'
os.environ['OPENBLAS_NUM_THREADS'] = '1'
os.environ['OMP_NUM_THREADS'] = '1'
import argparse
import pdb
import sys
import glob2
import os
import logging
import json
import numpy as np
import h5py
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.models.config import Config
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.helpers.sensor_file_manager import SensorFileManager
from dcrhino3.models.traces.raw_trace import RawTraceData
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.general_helper_functions import init_logging,splitDataFrameIntoSmaller
import os
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper

from multiprocessing import Process

logger = init_logging(__name__)

COMPONENT_IDS = ['axial', 'tangential', 'radial']

def raw_trace_h5_to_db(h5_file_path, env_config, min_ts, max_ts,chunk_size=5000):
    raw_trace_data = RawTraceData()
    global_config = raw_trace_data.load_config(h5_file_path)
    logger.info("Mine name on file:" + str(global_config.mine_name))
    conn = env_config.get_rhino_db_connection_from_mine_name(global_config.mine_name)
    sql_conn = env_config.get_rhino_sql_connection_from_mine_name(global_config.mine_name)
    db_helper = RhinoDBHelper(conn=conn)
    sql_db_helper = RhinoSqlHelper(host=sql_conn['host'], user=sql_conn['user'], passwd=sql_conn['password'],
                                   database=sql_conn['database'])

    file_exists = sql_db_helper.sensor_files.file_name_exists(os.path.basename(h5_file_path))

    if file_exists:
        logger.warning("IGNORED THIS FILE: DUPLICATED")
        return False

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

    logger.info("Added this file")
    file_id = sql_db_helper.sensor_files.add(h5_file_path, global_config.rig_id,
                                             str(global_config.sensor_serial_number),
                                             str(global_config.digitizer_serial_number), min_ts,
                                             max_ts,
                                             json.dumps(vars(global_config), indent=4), 1,
                                             status='valid',
                                             file_name=os.path.basename(h5_file_path))

    td = TraceData()
    td.dataframe = autcorrelated_dataframe
    path = env_config.get_sensor_files_storage_folder(str(global_config.mine_name))
    td.save_to_h5(os.path.join(path,str(file_id) + ".h5"),compress=True)

    return autcorrelated_dataframe


def acorr_h5_to_db(h5_file_path, env_config, min_ts, max_ts,chunk_size=5000):
    h5_file_path = file
    h5f = h5py.File(h5_file_path, 'r+')
    unicode_string = h5f.attrs['global_config_jsons']
    global_config_jsons = json.loads(unicode_string)
    for file_id, file_config in global_config_jsons.items():
        global_config = Config()
        global_config.set_data_from_json(json.loads(file_config))

    conn = env_config.get_rhino_db_connection_from_mine_name(global_config.mine_name)
    sql_conn = env_config.get_rhino_sql_connection_from_mine_name(global_config.mine_name)
    sql_db_helper = RhinoSqlHelper(host=sql_conn['host'], user=sql_conn['user'], passwd=sql_conn['password'],
                                   database=sql_conn['database'])

    file_exists = sql_db_helper.sensor_files.file_name_exists(os.path.basename(h5_file_path))
    if file_exists:
        logger.warning("IGNORED THIS FILE: DUPLICATED")
        return



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



    logger.info("Added this file")
    file_id = sql_db_helper.sensor_files.add(h5_file_path, global_config.rig_id,
                                             str(global_config.sensor_serial_number),
                                             str(global_config.digitizer_serial_number), min_ts, max_ts,
                                             json.dumps(vars(global_config), indent=4), 2, status='valid',
                                             file_name=os.path.basename(h5_file_path))

    td_out = TraceData()
    td_out.dataframe = l1h5_dataframe
    path = env_config.get_sensor_files_storage_folder(str(global_config.mine_name))
    td.save_to_h5(os.path.join(path, str(file_id) + ".h5"), compress=True)

    return

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
                    h5f = h5py.File(file, 'r+')
                    min_ts = sensor_file_manager.min_ts(h5f)
                    max_ts = sensor_file_manager.max_ts(h5f)
                    # raw_trace_h5_to_db(file,env_config,min_ts,max_ts)

                    if sensor_file_manager.is_h5_level0(h5f):
                        h5f.close()
                        print ("TYPE 1 " + str(file))
                        raw_trace_h5_to_db(file, env_config, min_ts, max_ts)
                    else:
                        h5f.close()
                        print ("TYPE 2 " + str(file))
                        acorr_h5_to_db(file, env_config, min_ts, max_ts)


                except:
                    print("Unexpected error:", sys.exc_info()[0])
                    print ("Failed to open : " + str(file))