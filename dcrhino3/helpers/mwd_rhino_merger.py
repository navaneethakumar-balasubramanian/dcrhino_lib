#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Jan 22 14:54:20 2019

@author: thiago
"""
import pdb
from datetime import datetime
import numpy as np
import pandas as pd
from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)

class MWDRhinoMerger():
    def __init__(self,file_list,mwd_dc_df):
        self.file_list = file_list
        self.mwd_dc_df = mwd_dc_df
        
        self.pre_filtered_mwd = self._pre_filter_mwd()
        
        if len(self.pre_filtered_mwd) == 0:
            logger.warn("Couldnt find any combination on this file_list and mwd, please check rig_ids and start_time")
            return False
        
        self.matches_list = self._generate_matches_list()
    
    def get_acorr_trace_data_from_index(self,idx):
        line = self.matches_list.iloc[idx]
        hole_mwd = self.get_hole_df(line.bench_name,line.pattern_name,line.hole_name,line.hole_id)        
        
        
    def _generate_matches_list(self):
        file_list = self.file_list
        pre_filtered_mwd = self.pre_filtered_mwd
        
        columns_sort_group = ['bench_name','pattern_name','hole_name','hole_id']
        holes_cfgs = dict()
        
        for line in file_list.itertuples():
            
            cond_1 = pre_filtered_mwd['rig_id'].astype(str) == line.rig_id
            cond_2 = pre_filtered_mwd['start_time'].astype(int)/1000000000 >= line.min_ts
            cond_3 = pre_filtered_mwd['start_time'].astype(int)/1000000000 <= line.max_ts
            
            holes_mwd = pre_filtered_mwd[cond_1 & cond_2 & cond_3].copy().sort_values(by=columns_sort_group).reset_index(drop=True)
            holes_identified = np.array(list(holes_mwd.groupby(columns_sort_group).groups))
            rig_id_ar = np.full([holes_identified.shape[0],1],str(line.rig_id))
            sensor_id_ar = np.full([holes_identified.shape[0],1],str(line.sensor_id))
            digitizer_id_ar = np.full([holes_identified.shape[0],1],str(line.digitizer_id))
            holes_identified = np.hstack((holes_identified,rig_id_ar,sensor_id_ar,digitizer_id_ar))
            holes_identified = np.unique(holes_identified, axis=0)
        
            for hole in holes_identified:
                if '----'.join(list(hole)) not in holes_cfgs:
                    holes_cfgs['----'.join(list(hole))] = []
                holes_cfgs['----'.join(list(hole))].append([line.id,line.min_ts,line.max_ts])
        
        ## TRANSFORM TO DATAFRAME ONE HOLE PER LINE WITH MULTIPLE FILES                
        dict_list  = [dict()] * len(holes_cfgs.keys())
        for idx , unique_hole in enumerate(holes_cfgs.keys()):
            splitted = unique_hole.split('----')
            line = dict()
            line['bench_name'] = str(splitted[0])
            line['pattern_name'] = str(splitted[1])
            line['hole_name'] = str(splitted[2])
            line['hole_id'] = str(splitted[3])
            line['rig_id'] = str(splitted[4])
            line['sensor_id'] = str(splitted[5])
            line['digitizer_id'] = str(splitted[6])
            files_ids = np.empty(len(holes_cfgs[unique_hole])).astype(int)
            for i, file in enumerate(holes_cfgs[unique_hole]):
                files_ids[i] = int(file[0])
            line['files_ids'] = ','.join(files_ids.astype(str))
            dict_list[idx] = line
            
        files_holes_df = pd.DataFrame(dict_list)
        return files_holes_df
    
    def _pre_filter_mwd(self):
        min_ts_date = datetime.utcfromtimestamp(self.file_list['min_ts'].min())
        max_ts_date = datetime.utcfromtimestamp(self.file_list['max_ts'].max())
        rig_ids = self.file_list['rig_id'].unique()
        
        cond_1 = self.mwd_dc_df['rig_id'].isin(rig_ids)
        cond_2 = self.mwd_dc_df['start_time'] >= min_ts_date
        cond_3 = self.mwd_dc_df['start_time'] <= max_ts_date
        
        return self.mwd_dc_df[cond_1 & cond_2 & cond_3].copy()