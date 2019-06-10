#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Jan 22 12:50:55 2019

Author: thiago
"""

import pandas as pd
import numpy as np
import pdb
import requests
from clickhouse_driver import Client
from dcrhino3.models.env_config import MwdType
from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)

class MWDHelper():
    """
    Facilitates the use of mwd data downstream by managing mine selection, naming, and formatting.
    
    References: 
        local env_config.json file in ..dcrhino_lib/bin
        
    .. warning:: **Requires** local env_config.json file that is mine-specific
    """
    
    def __init__ (self,env_config):
        self.env_config = env_config

        
        self.required_columns = ['easting','northing','elevation','hole_id','hole_name','pattern_name','bench_name','start_time','collar_elevation','rig_id']
        self.optional_columns = ['tob','rop','wob','mse','air_pressure','rpm']



    def get_hole_mwd_from_mine_mwd(self,mine_mwd,bench_name,pattern_name,hole_name,hole_id):
        """
        Locates individual hole data in the mine_mwd data.
        
        Parameters:
            mine_mwd (DataFrame): Data for entire mine
            bench_name (str): Name of bench where target hole is located
            pattern_name (str): Name of pattern where target hole is located
            hole_name (str): Name of hole (sometimes interchangeable with hole_id)
            hole_id str): Numerical id for hole (sometimes used in place for hole_name)

        Returns:
            (Series): mine_mwd['bench_name', 'pattern_name', 'hole_name', 'hole_id'], the data for a specific hole.
        """
        cond1 = mine_mwd['bench_name'].astype(str) == str(bench_name)
        cond2 = mine_mwd['pattern_name'].astype(str) == str(pattern_name)
        cond3 = mine_mwd['hole_name'].astype(str) == str(hole_name)
        cond4 = mine_mwd['hole_id'].astype(str) == str(hole_id)
        return mine_mwd[cond1 & cond2 & cond3 & cond4]

    def get_mwd_from_csv(self,file_path):
        """
        Retrieves MWD data from local .csv file.
        
        Parameters:
            file_path (str): Path to .csv file containing mwd data.

        Returns:
            (DataFrame): The contents of the .csv file in a 2D data structure
        """
        logger.info("Loading mwd csv from:" + file_path)
        return pd.read_csv(file_path)

    def get_mwd_from_db(self,mine_domain,dataset_name):
        """
        Connects to database using :func:`~get_db_conn` with credentials and retrieves data from specified mine.
        
        Parameters:
            mine_domain (str): Database domain name for the mine.
            dataset_name (str): Dataset inside mine_domain Database.

        Returns:
            (DataFrame): The contents of the dataset_name
            
        .. todo:: Ask for user credentials and input them in all database-connecting functions
        
        """
        conn_dict = self.get_db_conn(mine_domain)

        client = Client(conn_dict['host'],user=conn_dict['username'],password=conn_dict['password'],database=conn_dict['database'],compression='lz4')

        datasets = self.get_dc_datasets_configs(mine_domain)
        for i, dataset in enumerate(datasets):
            if dataset['name'] == dataset_name:    
                columns_to_get = list()
                renamed = {}
                mappings = []
                for col in dataset['mapping']: 
                    renamed[col['column']] = col['label']
                    columns_to_get.append(col['column'])
                    mappings.append(col)
                columns = client.execute('DESCRIBE TABLE ' + str(dataset['table_name']))
                transformed_type_columns_to_get = []
                for column_to_get in columns_to_get:
                    describe = self.get_describe_by_column_name(columns,column_to_get)
                    if describe[1] == 'DateTime':
                        transformed_type_columns_to_get.append('toInt32('+column_to_get+') as '+column_to_get)
                    else:
                        transformed_type_columns_to_get.append(column_to_get)
        
    
                mwd_data_from_db = client.execute('SELECT '+','.join(transformed_type_columns_to_get)+' FROM ' +  str(dataset['table_name'] ))
                columns_table_name = list()
                for i, col in enumerate(columns_to_get):
                    columns_table_name.append(renamed[col]) 
                
                mwd_data_df = pd.DataFrame(mwd_data_from_db,columns=columns_table_name)
        return mwd_data_df
        
    def query_result_to_pd(self,result,columns):
            """
            Convert results to pandas DataFrame
            
            Parameters:
                result(list): data from query to be converted to Pandas DataFrame
                columns (list): Column names for queried variables
                
            Returns:
                (DataFrame): a DataFrame containing *result* with variable names specified in *columns*.
            """
            return pd.DataFrame(result,columns=columns)
        
    def get_mapping_from_label(self,mappings,column_name):
        """
        String compares variable names to find matches between parameters
        
        Parameters:
            mappings (list): contains mwd metadata in DataFrames
            mapping (DataFrame): contains variable data
            column_name (str): column name to find
            
        Returns:
            (DataFrame): DataFrame matching *column_name*, if any
            
        """
        for mapping in mappings:
            if str(column_name).upper() == str(mapping['label']).upper():
                return mapping

    def get_describe_by_column_name(self,columns,mapping_column_name):
        """
        String compares variable names to find matches between parameters
        
        Parameters:
            mappings (list): contains mwd metadata in DataFrames
            mapping (DataFrame): contains variable data
            column_name (str): column name to find
            
        Returns:
            (DataFrame): DataFrame matching *column_name*, if any
            
        """
        for column in columns:
            if column[0] == mapping_column_name:
                return column
            
    def get_db_conn(self,subdomain):
        """
        Requests data from database, with credentials built in (for now), creates 
        a temorary json file for data recieved, and returns data.
        
        Parameters:
            subdomain (str): data location in the database
            
        Returns:
            (dict): connection dictionary with host and port to be used in :func:`~get_mwd_from_db`
        """
        r = requests.post('https://prod.datacloud.rocks/v1/auth', json={"username":'admin', "password":'pass123$$$'})
        token = r.json()['token']
        headers = {'Authorization':'Bearer ' + token,'x-dc-subdomain':subdomain}
        r = requests.get('https://prod.datacloud.rocks/v1/viz/config',headers=headers)
        temp = r.json()
        conn_dict = dict()
        conn_dict['host'] = temp['ch_conn'].replace("tcp://","").split("?")[0].split(":")[0]
        conn_dict['port'] = int(temp['ch_conn'].replace("tcp://","").split("?")[0].split(":")[1])
        args = temp['ch_conn'].replace("tcp://","").split("?")[1].split("&")
        for arg in args:
            splitted = arg.split('=')
            conn_dict[splitted[0]]=splitted[1]
            
        return conn_dict
        
    def get_dc_datasets_configs(self,subdomain):
        """
        Returns json, not dictionary, with database token and configuration.
        
        Parameters:
            subdomain (str): data location in the database
            
        Returns:
            (unicode): json containing token for database connection, credentials, configuration
        """
        r = requests.post('https://prod.datacloud.rocks/v1/auth', json={"username":'admin', "password":'pass123$$$'})
        token = r.json()['token']
        headers = {'Authorization':'Bearer ' + token,'x-dc-subdomain':subdomain}
        r = requests.get('https://prod.datacloud.rocks/v1/viz/dataset_config',headers=headers)
        return r.json()

    def get_remaped_column_values(self,mwd_df,col):
        """
        Splits unparsed column names if more than one, and returns remaped column
        names
        
        Parameters:
            mwd_df (DataFrame): large dataframe for the mine
            col: variable name, or list of names, separated with "|" to be fetched
            
        Returns:
            (list): list of output column name(s)
        """
        if "|" in col:
            split = col.split("|")
            temp = pd.DataFrame()
            temp['output_col'] = np.full(len(mwd_df),"")
            for string in split:
                if string in mwd_df.columns:
                    temp['output_col'] += mwd_df[string].map(str)
                else:
                    temp['output_col'] += string
            return temp['output_col']
        else:
            return mwd_df[col]

    def remap_mwd_df(self,mwd_df,mapping):
        """
        Deep-copies mwd dataframe, creates a new dataframe with columns from mapping dict.
        
        Parameters:
            mwd_df (dataframe): dataframe from which copy is made
            mapping (dict): dictionary with 'column' key and column name values
            
        Returns:
            (Dataframe): remapped mwd dataframe with empty columns dropped
        """
        #temp = mwd_df
        inverted_kv_mapping = dict([(value, key) for key, value in mapping.items()])
        mwd_df = mwd_df.copy()
        return mwd_df.rename(inverted_kv_mapping,axis=1)

    def _have_required_columns(self,mwd_df):
        """
        Check if all required columns are present in DataFrame
        
        Parameters:
            mwd_df (DataFrame): DataFrame to be checked
            
        Returns:
            (boolean): True if columns are present, False if one or more columns is missing      
        """
            
        for col in self.required_columns:
            if col not in mwd_df.columns:
                logger.warn("MISSING COLUMN:" + col + " ON DATACLOUD DEFAULT DF")
                return False
        return True

    def _create_optional_columns(self,mwd_df):
        """
        Allows for optional columns that are included when provided but won't break
        when not provided.
        
        Parameters:
            mwd_df (DataFrame): DataFrame where optional columns are desired
            
        Returns
            (DataFrame): DataFrame with optional columns added
        """
        mwd_df = mwd_df.copy()
        for col in self.optional_columns:
            if col not in mwd_df.columns:
                mwd_df[col] = 0
        return mwd_df
    
    def _post_process(self,df):
        """
        Converts metadata values stored in *df* DataFrame to standard names/formatting
        and sorts holes by start_time.
        
        Parameters:
            df (DataFrame): DataFrame including mine metadata such as start_time, bench_name, etc.
            
        Returns:
            (DataFrame): DataFrame *df* with values rows sorted by start_time.
        """
        if df.start_time.dtype == 'int64':
            df['start_time'] = pd.to_datetime(df['start_time'],unit='s')
        else:
            df['start_time'] = pd.to_datetime(df['start_time'])
        df['bench_name'] = df['bench_name'].astype(str)
        df['pattern_name'] = df['pattern_name'].astype(str)
        df['hole_name'] = df['hole_name'].astype(str)
        df['hole_id'] = df['hole_id'].astype(str)
        df['rig_id'] = df['rig_id'].astype(str)
        df['depth'] = (df['collar_elevation'] - df['elevation']).astype(float)
        
        sorted_by_start_time = df.sort_values(by=['start_time'])
        return sorted_by_start_time

    def try_creating_missing_columns(self,mwd_df):
        if 'hole_id' not in mwd_df.columns and 'hole_name' in mwd_df.columns:
            mwd_df['hole_id'] = mwd_df.hole_name
        if 'hole_name' not in mwd_df.columns and 'hole_id' in mwd_df.columns:
            mwd_df['hole_name'] = mwd_df.hole_id
        return mwd_df

    def get_rhino_mwd_from_mine_name(self,mine_name):
        """
        Retrieves mwd from .csv or database connection, remaps,
        adds columns, standardizes format/names for downstream functions.
        
        Parameters:
            mine_name (str): name of the mine you are working on
            
        Returns:
            (DataFrame): DataFrame from .csv or database if able to be found,
            remaped with optionals
            using :func:`~_create_optional_columns` and named/formatted with 
            :func:`~_post_process`. False if otherwise.
        """
        mine_type = self.env_config.get_mwd_type(mine_name)
        if mine_type is False:
            logger.warn("Couldnt find a mwd config for this mine:" + mine_name)
        elif mine_type == MwdType.CSV:
            cfg = self.env_config.get_mwd_csv_cfg(mine_name)
            original_mwd_df = self.get_mwd_from_csv(cfg['path'])
        elif mine_type == MwdType.DATABASE:
            cfg = self.env_config.get_mwd_db_cfg(mine_name)
            original_mwd_df = self.get_mwd_from_db(cfg['domain'],cfg['dataset_name'])

        for column in original_mwd_df.columns:
            if "Unnamed: " in column:
                original_mwd_df.drop([column],axis=1,inplace=True)
        original_mwd_df = original_mwd_df.drop_duplicates()

        remaped = self.remap_mwd_df(original_mwd_df,cfg['mapping'])
        remaped = self.try_creating_missing_columns(remaped)
        if self._have_required_columns(remaped):
            remaped_with_optionals = self._create_optional_columns(remaped)
            remaped_with_optionals = self._post_process(remaped_with_optionals)
            return remaped_with_optionals
        else:
            return False

