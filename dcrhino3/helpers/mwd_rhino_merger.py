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
from scipy.interpolate import interp1d


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
    
    
    def get_min_max_time(self,hole_id):
        hole_mwd = self.mwd_dc_df[self.mwd_dc_df['hole_id']== str(hole_id)]
        min_ts = hole_mwd['start_time'].astype(int).min()/1000000000
        max_ts = hole_mwd['start_time'].astype(int).max()/1000000000
        return min_ts, max_ts
        
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
            start_time_min, start_time_max = self.get_min_max_time(splitted[3])
            
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
            line['start_time_min'] = start_time_min
            line['start_time_max'] = start_time_max
            dict_list[idx] = line
            
        files_holes_df = pd.DataFrame(dict_list)
        return files_holes_df
    
    def merge_mwd_with_trace(self,hole_mwd,rhino_traces_df):
        time_vector = (rhino_traces_df['timestamp'].values*1000000000).astype(np.int64)
        
        interpolated_hole_mwd = self.get_mwd_interpolated_by_second(hole_mwd,time_vector)
        merged = pd.concat([rhino_traces_df,interpolated_hole_mwd],axis=1)
        #pdb.set_trace()
        return merged
        
            
        
    
    def get_mwd_interpolated_by_second(self,hole_mwd,time_vector):
        interpolated_mwd = pd.DataFrame()
        for col in hole_mwd.columns:
            if len(np.unique(hole_mwd[col])) == 1:
                interpolated_mwd[col] = hole_mwd[col].values[0]
            elif hole_mwd[col].values.dtype in [np.int,np.float,np.datetime64]:
                interpolated_mwd[col] = self.get_interpolated_column(time_vector,hole_mwd,col)    
            elif hole_mwd[col].values.dtype == np.dtype('datetime64[ns]'):
                interpolated_mwd[col] = pd.to_datetime(self.get_interpolated_column(time_vector,hole_mwd,col))
            else:
                logger.warn("FAILED TO INTERPOLATE " + str(col) + " type: " + str(hole_mwd[col].values.dtype))
        
        #interpolated_mwd['timestamp'] = time_vector/1000000000
        return interpolated_mwd
    
    def get_interpolated_column(self,time_vector, mwd_hole_df, column_label,
                            end_time_column_label='start_time'):
        """
        time_vector is actually a pandas date_range, for example:
        time_vector = pd.date_range(start=row.time_start, periods=num_traces_in_blasthole, freq='1S')
    
        column_label: what to interp ... for example 'computed_elevation'
    
        @returns interped data, for example the depths of the traces
        """
        t_mwd = pd.DatetimeIndex(mwd_hole_df[end_time_column_label])
        t_mwd = t_mwd.astype(np.int64)
    
        interp_function = interp1d(t_mwd, mwd_hole_df[column_label], kind='linear',
                                   bounds_error=False, fill_value='extrapolate')
    
        time_vector = pd.DatetimeIndex(time_vector).astype(np.int64)
        interped_data = interp_function(time_vector)
        return interped_data

        
    def _pre_filter_mwd(self):
        min_ts_date = datetime.utcfromtimestamp(self.file_list['min_ts'].min())
        max_ts_date = datetime.utcfromtimestamp(self.file_list['max_ts'].max())
        rig_ids = self.file_list['rig_id'].unique()
        
        cond_1 = self.mwd_dc_df['rig_id'].isin(rig_ids)
        cond_2 = self.mwd_dc_df['start_time'] >= min_ts_date
        cond_3 = self.mwd_dc_df['start_time'] <= max_ts_date
        
        return self.mwd_dc_df[cond_1 & cond_2 & cond_3].copy()