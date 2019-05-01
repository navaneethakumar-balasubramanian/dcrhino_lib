import json
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
from dcrhino3.helpers.raw_file_manager import RawFileManager
import requests
logger = init_logging(__name__)


def new_raw_file(file_path):
    env_config = EnvConfig("env_config.json")

    raw_file_manager = RawFileManager(env_config)
    props = raw_file_manager.file_props(file_path)
    if props:
        db_conn = env_config.get_rhino_db_connection_from_mine_name(props['mine_name'])
        db_helper = RhinoDBHelper(conn=db_conn)

    print props



if __name__ == '__main__':
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
    argparser.add_argument("-f", '--file_path', help="Path to file", default=False)
    args = argparser.parse_args()

    new_raw_file(args.file_path)