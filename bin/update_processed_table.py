#import json
import numpy as np
#import pandas as pd
import pdb
import os
import argparse
import pandas as pd
from clickhouse_driver import Client
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.general_helper_functions import init_logging
from datetime import datetime
import json
from dcrhino3.models.trace_dataframe import TraceData
import glob2
logger = init_logging(__name__)


def update_processed_table(mine_name,env_config_path):
    file_to_look_for = "process_flow.json"
    envConfig = EnvConfig(env_config_path)
    conn_rhino = envConfig.get_rhino_db_connection_from_mine_name(mine_name)
    processed_folder_path = envConfig.get_hole_h5_processed_cache_folder(mine_name)
    files = glob2.glob(processed_folder_path + "**/"+file_to_look_for)
    db_helper = RhinoDBHelper(conn=conn_rhino)
    processed_holes = db_helper.get_processed_holes()

    for i,file in enumerate(files):
        complete_path_folder = file.replace(file_to_look_for, "")
        relative_path_folder = complete_path_folder.replace(processed_folder_path,"")
        processed_h5_path = os.path.join(complete_path_folder,"processed.h5")
        process_flow_path = os.path.join(complete_path_folder,"process_flow.json")

        if os.path.exists(processed_h5_path) and os.path.exists(process_flow_path) and len(processed_holes) == 0 or relative_path_folder not in processed_holes.output_folder_name.values:
            logger.info("Processing " +str(i+1) + "/"+str(len(files)) + " : "+ complete_path_folder)
            trace_data = TraceData()
            trace_data.load_from_h5(processed_h5_path)
            with open(os.path.join(process_flow_path), 'r') as f:
                process_json = json.load(f)

            id = process_json['id']
            datetime_str = str(relative_path_folder.split('/')[1]).replace(str(id),'').replace('_','')
            if len(datetime_str) == 14:
                date_of_process = datetime.strptime(datetime_str, "%Y%m%d%H%M%S")
                date_of_process_seconds = int(date_of_process.strftime("%s"))
            else:
                date_of_process_seconds = 0
            db_helper.save_processed_trace(trace_data, id, json.dumps(process_json),relative_path_folder, date_of_process_seconds, 99999)

        else:
            logger.info("Ignored " +str(i+1) +"/"+ str(len(files)) + " : " + complete_path_folder )


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

    update_processed_table(mine_name, env_config_path)