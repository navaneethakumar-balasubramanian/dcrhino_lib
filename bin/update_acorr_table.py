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
from dcrhino3.helpers.general_helper_functions import init_logging
from datetime import datetime
import json
from dcrhino3.models.trace_dataframe import TraceData
import glob2
logger = init_logging(__name__)


def update_acorr_table(mine_name,env_config_path):
    envConfig = EnvConfig(env_config_path)
    conn_rhino = envConfig.get_rhino_db_connection_from_mine_name(mine_name)
    acorr_files_folder = envConfig.get_hole_h5_interpolated_cache_folder(mine_name)
    files = glob2.glob(acorr_files_folder + "/*.h5")
    #db_helper = RhinoDBHelper(conn=conn_rhino)
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
    use_argparse = True
    if use_argparse:
        argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
        argparser.add_argument("mine_name", metavar="mine_name", type=str, help="Mine Name")
        argparser.add_argument("-env", '--env_config_path', help="Path to optional env config file", default=False)
        args = argparser.parse_args()
        mine_name = args.mine_name
        env_config_path = args.env_config_path
    else:
        mine_name = ''

    update_acorr_table(mine_name, env_config_path)