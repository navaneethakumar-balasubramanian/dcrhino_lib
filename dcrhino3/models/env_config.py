# -*- coding: utf-8 -*-


import json
from dcrhino3.helpers.general_helper_functions import init_logging
import pdb
logger = init_logging(__name__)


class EnvConfig(object):
    def __init__(self,env_conf_json_path=False):
        if env_conf_json_path is False:
            env_conf_json_path = 'env_config.json'
        
        self.parse_json(env_conf_json_path)
        
    def parse_json(self,env_conf_json_path):
        with open(env_conf_json_path, 'r') as f:
            self.__dict__ = json.load(f)     

    def get_db_connection_dict_from_mine_name(self,mine_name):
        pdb.set_trace()
            
