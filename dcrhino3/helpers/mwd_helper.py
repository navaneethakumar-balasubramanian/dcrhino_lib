#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Jan 22 12:50:55 2019

@author: thiago
"""

import pandas as pd
import numpy as np
import pdb
from dcrhino3.models.env_config import MwdType
from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)

class MWDHelper():
    def __init__ (self,env_config):
        self.env_config = env_config
        
        self.required_columns = ['easting','northing','elevation','hole_id','hole_name','pattern_name','bench_name','start_time','collar_elevation']
        self.optional_columns = ['tob','rop','wob','mse','air_pressure']
        

    
    def get_hole_mwd_from_mine_mwd(self,mine_mwd,bench_name,pattern_name,hole_name,hole_id):
        cond1 = mine_mwd['bench_name'].astype(str) == str(bench_name)
        cond2 = mine_mwd['pattern_name'].astype(str) == str(pattern_name)
        cond3 = mine_mwd['hole_name'].astype(str) == str(hole_name)
        cond4 = mine_mwd['hole_id'].astype(str) == str(hole_id)
        return mine_mwd[cond1 & cond2 & cond3 & cond4]

    def get_mwd_from_csv(self,file_path):
        logger.info("Loading mwd csv from:" + file_path)
        return pd.read_csv(file_path)
    
    def get_remaped_column_values(self,mwd_df,col):
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
        temp = mwd_df
        remaped = pd.DataFrame()
        mwd_df = mwd_df.copy()
        for col in mapping.keys():
            remaped[col] = self.get_remaped_column_values(mwd_df,mapping[col])
            if "|" not in mapping[col]:
                mwd_df = mwd_df.drop(columns=[mapping[col]],axis=1)
                
        for col in mwd_df.columns:
            remaped[col] = mwd_df[col]
        return remaped
    
    def _have_required_columns(self,mwd_df):
        for col in self.required_columns:
            if col not in mwd_df.columns:
                logger.warn("MISSING COLUMN:" + col + " ON DATACLOUD DEFAULT DF")
                return False
        return True
    
    def _create_optional_columns(self,mwd_df):
        mwd_df = mwd_df.copy()
        for col in self.optional_columns:
            if col not in mwd_df.columns:
                mwd_df[col] = 0
        return mwd_df
    
    def get_rhino_mwd_from_mine_name(self,mine_name):
        mine_type = self.env_config.get_mwd_type(mine_name)
        if mine_type is False:
            logger.warn("Couldnt find a mwd config for this mine:" + mine_name)
        elif mine_type == MwdType.CSV:
            cfg = self.env_config.get_mwd_csv_cfg(mine_name)
            original_mwd_df = self.get_mwd_from_csv(cfg['path'])
        
        remaped = self.remap_mwd_df(original_mwd_df,cfg['mapping'])
        if self._have_required_columns(remaped):
            remaped_with_optionals = self._create_optional_columns(remaped)
            remaped_with_optionals['start_time'] = pd.to_datetime(remaped_with_optionals['start_time'])
            return remaped_with_optionals
        else:
            return False
            
        