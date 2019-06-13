#import json
import numpy as np
#import pandas as pd
import pdb
import os
import argparse
import pandas as pd
from clickhouse_driver import Client
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.sensor_file_manager import SensorFileManager
from dcrhino3.helpers.general_helper_functions import init_logging
from datetime import datetime
import json
from dcrhino3.models.trace_dataframe import TraceData
import glob2
logger = init_logging(__name__)


def process_sensor_file(envConfig,props):
    conn_rhino = envConfig.get_rhino_db_connection_from_mine_name(props['mine_name'])
    db_conn = envConfig.get_rhino_sql_connection_from_mine_name(props['mine_name'])
    db_helper = RhinoDBHelper(conn=conn_rhino)
    sql_helper = RhinoSqlHelper(db_conn['host'], db_conn['user'], db_conn['password'], db_conn['database'])

    files_on_sql = sql_helper.sensor_files.get_all()


    return
    envConfig = EnvConfig(env_config_path)

    files = db_helper.get_files_list()


    db_conn = envConfig.get_rhino_sql_connection_from_mine_name(mine_name)
    db_helper = RhinoSqlHelper(db_conn['host'], db_conn['user'], db_conn['password'], mine_name)
    #db_helper = RhinoSqlHelper('localhost','root','1122qwaszx','mont_wright')
    acorr_files = db_helper.acorr_files.get_all()

    for i,file in enumerate(files):
        filename = file.replace(acorr_files_folder,"")

        if  filename not in acorr_files.filename.values:
            logger.info("Processing " +str(i+1) + "/"+str(len(files)) + " : "+ filename)
            trace_data = TraceData()
            trace_data.load_from_h5(file)

            db_helper.acorr_files.add(trace_data.hole_id,trace_data.sensor_id,trace_data.bench_name,trace_data.pattern_name,trace_data.hole_name,trace_data.rig_id,trace_data.digitizer_id,filename,int(trace_data.min_ts),int(trace_data.max_ts))

        else:
            logger.info("Ignored " +str(i+1) +"/"+ str(len(files)) + " : " + filename )


    df_list = list()




if __name__ == '__main__':
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
    #argparser.add_argument("mine_name", metavar="mine_name", type=str, help="Mine Name")
    argparser.add_argument("src_path", metavar="path", type=str,
                           help="Path to files to be merged; enclose in quotes, accepts * as wildcard for directories or filenames")
    argparser.add_argument("-env", '--env_config_path', help="Path to optional env config file", default=False)
    args = argparser.parse_args()


    env_config = EnvConfig(args.env_config_path)
    files = glob2.glob(args.src_path)
    raw_file_manager = SensorFileManager(env_config)

    logger.info("Found " + str(len(files)) + " files")

    if not files:
        print  'File does not exist: ' + args.src_path
    for file in files:
        if '.h5' in os.path.splitext(file)[1]:
            logger.info("PROCESSING FILE:" + str(file))
            if env_config.is_file_blacklisted(file) is False:
                props = raw_file_manager.file_props(str(file))
                process_sensor_file(env_config,props)

    #update_sensor_files_table(mine_name, env_config_path)