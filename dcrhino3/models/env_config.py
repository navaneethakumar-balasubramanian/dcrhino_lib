# -*- coding: utf-8 -*-


import json
from enum import Enum
from dcrhino3.helpers.general_helper_functions import init_logging
import os
import pdb

logger = init_logging(__name__)


class MwdType(Enum):
    CSV = 1
    DATABASE = 2


class EnvConfig(object):
    """
    """
    def __init__(self,env_conf_json_path=False):
        if env_conf_json_path is False:
            env_conf_json_path = 'env_config.json'
        
        self.blacklist_files = []
        self._parse_json(env_conf_json_path)
        
        
    def _parse_json(self,env_conf_json_path):
        """
        Load the json file.
        """
        with open(env_conf_json_path, 'r') as f:
            self.__dict__ = json.load(f)
            
    def _get_mine_config(self,mine_name):
        """
        Parameters:
            mine_name (str): name of mine to find configuration for
        Returns:
            mine if able to find the mine name in env_config name or alternative names,
            False otherwise
        """
        mine_name = str(mine_name).lower()
        mine_name = mine_name.replace('"','')
        for mine in self.mines.keys():
            mine = self.mines[mine]
            if mine_name == mine['name'] or mine_name in mine['alternative_names']:
                return mine
        logger.warn("Could not find a config on env.json for " + str(mine_name) + " mine." )
        return False


    def get_process_flows_list(self,mine_name):
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'paths' not in mine_cfg.keys() or 'process_flows' not in mine_cfg[
            'paths']:
            return []
        return os.listdir(mine_cfg['paths']['process_flows'])

    def get_sensor_files_storage_folder(self, mine_name):
        """
        Parameters:
            mine_name (str): mine name

        Returns:
            Path to h5 interpolated cache folder for the mine named, False if missing
        """
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'paths' not in mine_cfg.keys() or 'sensor_files_storage_folder' not in mine_cfg[
            'paths']:
            return False
        return mine_cfg['paths']['sensor_files_storage_folder']

    def get_hole_h5_interpolated_cache_folder(self,mine_name):
        """
        Parameters:
            mine_name (str): mine name
            
        Returns:
            Path to h5 interpolated cache folder for the mine named, False if missing
        """
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'paths' not in mine_cfg.keys() or 'hole_h5_interpolated_cache_folder' not in mine_cfg['paths']:
            return False
        return mine_cfg['paths']['hole_h5_interpolated_cache_folder']
    
    def get_hole_h5_processed_cache_folder(self,mine_name):
        """
        Parameters:
            mine_name (str): mine name
            
        Returns:
            Path to h5 processed cache folder for the mine named, False if missing
        """        
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'paths' not in mine_cfg.keys() or 'hole_h5_processed_cache_folder' not in mine_cfg['paths']:
            return False
        return mine_cfg['paths']['hole_h5_processed_cache_folder']    

    
    def is_file_blacklisted(self,file_path):
        """
        Returns:
            (bool): True is blacklisted, False if not
        """
        if 'blacklist_files' in vars(self):
            for black_list_file_path in self.blacklist_files:
                if black_list_file_path == file_path:
                    return True
        return False
        

    def get_rhino_db_connection_from_mine_name(self,mine_name):
        """
        Search env_config.json for rhino_db_connection credentials.
        
        Returns:
            rhino_db_connection (host,user,password,database),
            or False if missing from env_config
        """
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'rhino_db_connection' not in mine_cfg.keys():
            logger.warn("Missing rhino_db_connection on env.json for " + str(mine_name) + " mine." )
            return False
        return mine_cfg['rhino_db_connection']

    def get_rhino_sql_connection_from_mine_name(self,mine_name):
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'rhino_sql_connection' not in mine_cfg.keys():
            logger.warn("Missing rhino_sql_connection on env.json for " + str(mine_name) + " mine.")
            return False
        return mine_cfg['rhino_sql_connection']

    def get_mwd_type(self,mine_name):
        """
        Get data file type.
        
        Returns:
            CSV or DATABASE to MwdType key
        """
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'mwd' not in mine_cfg.keys():
            return False
        if 'csv' in mine_cfg['mwd']:
            return MwdType.CSV
        else:
            return MwdType.DATABASE
        
    def get_mwd_csv_cfg(self,mine_name):
        """
        Get csv configuration from mine_cfg dictionary.
        
        Returns:
            mine_cfg['mwd']['csv'] or False if mwd missing from keys of mine_cfg
        """
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'mwd' not in mine_cfg.keys():
            return False
        if 'csv' in mine_cfg['mwd']:
            return mine_cfg['mwd']['csv']
        
    def get_mwd_db_cfg(self,mine_name):
        """
        Get database configuration from mine_cfg dictionary.
        
        Returns:
            mine_cfg['mwd']['db'] or False if mwd missing from keys of mine_cfg
        """
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'mwd' not in mine_cfg.keys():
            return False
        if 'db' in mine_cfg['mwd']:
            return mine_cfg['mwd']['db']

    def get_mp_config(self, mine_name):
        """
        Get database configuration from mine_cfg dictionary.

        Returns:
            mine_cfg['mwd']['db'] or False if mwd missing from keys of mine_cfg
        """
        mine_cfg = self._get_mine_config(mine_name)
        if not mine_cfg or 'mp_connection' not in mine_cfg.keys():
            return False
        return mine_cfg['mp_connection']

        
            
