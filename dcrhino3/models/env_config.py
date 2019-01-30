# -*- coding: utf-8 -*-


import json
from enum import Enum
from dcrhino3.helpers.general_helper_functions import init_logging
import pdb

logger = init_logging(__name__)


class MwdType(Enum):
    CSV = 1
    DATABASE = 2


class EnvConfig(object):
    def __init__(self,env_conf_json_path=False):
        if env_conf_json_path is False:
            env_conf_json_path = 'env_config.json'
        
        self.blacklist_files = []
        self._parse_json(env_conf_json_path)
        
        
    def _parse_json(self,env_conf_json_path):
        with open(env_conf_json_path, 'r') as f:
            self.__dict__ = json.load(f)
            
    def _get_mine_config(self,mine_name):
        mine_name = str(mine_name).lower()
        for mine in self.mines.keys():
            mine = self.mines[mine]
            if mine_name in mine['name'] or mine_name in mine['alternative_names']:
                return mine
        logger.warn("Could not find a config on env.json for " + str(mine_name) + " mine." )
        return False
    
    def get_hole_h5_interpolated_cache_folder(self,mine_name):
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'paths' not in mine_cfg.keys() or 'hole_h5_interpolated_cache_folder' not in mine_cfg['paths']:
            return False
        return mine_cfg['paths']['hole_h5_interpolated_cache_folder']
    
    def get_hole_h5_processed_cache_folder(self,mine_name):
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'paths' not in mine_cfg.keys() or 'hole_h5_processed_cache_folder' not in mine_cfg['paths']:
            return False
        return mine_cfg['paths']['hole_h5_processed_cache_folder']    

    
    def is_file_blacklisted(self,file_path):
        for black_list_file_path in self.blacklist_files:
            if black_list_file_path == file_path:
                return True
        return False
        

    def get_rhino_db_connection_from_mine_name(self,mine_name):
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'rhino_db_connection' not in mine_cfg.keys():
            logger.warn("Missing rhino_db_connection on env.json for " + str(mine_name) + " mine." )
            return False
        return mine_cfg['rhino_db_connection']
            
    
    def get_mwd_type(self,mine_name):
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'mwd' not in mine_cfg.keys():
            return False
        if 'csv' in mine_cfg['mwd']:
            return MwdType.CSV
        else:
            return MwdType.DATABASE
        
    def get_mwd_csv_cfg(self,mine_name):
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'mwd' not in mine_cfg.keys():
            return False
        if 'csv' in mine_cfg['mwd']:
            return mine_cfg['mwd']['csv']
            
        
            
