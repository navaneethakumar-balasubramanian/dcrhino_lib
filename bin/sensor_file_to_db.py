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


def raw_trace_h5_to_db(h5_file_path, env_config, min_ts, max_ts):
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
        return
    else:
        logger.info("Added this file")
        file_id = sql_db_helper.sensor_files.add(h5_file_path, global_config.rig_id,
                                                 str(global_config.sensor_serial_number),
                                                 str(global_config.digitizer_serial_number), min_ts, max_ts,
                                                 json.dumps(vars(global_config), indent=4), 1, status='valid',file_name=os.path.basename(h5_file_path))

    return


def acorr_h5_to_db(h5_file_path, env_config, min_ts, max_ts):
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

    else:
        logger.info("Added this file")
        file_id = sql_db_helper.sensor_files.add(h5_file_path, global_config.rig_id,
                                                 str(global_config.sensor_serial_number),
                                                 str(global_config.digitizer_serial_number), min_ts, max_ts,
                                                 json.dumps(vars(global_config), indent=4), 2, status='valid',file_name=os.path.basename(h5_file_path))

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
                    print ("Failed to open : " + str(file))