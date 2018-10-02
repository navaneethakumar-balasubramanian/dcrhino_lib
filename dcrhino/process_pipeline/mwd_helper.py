#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Sep 28 17:06:47 2018

@author: thiago
"""
import pandas as pd
import pdb
import numpy as np
from dcrhino.analysis.signal_processing.mwd_tools import get_interpolated_column

class MwdDFHelper:

    def __init__(self, df,
                 start_time_column,
                 end_time_column,
                 end_depth_column,
                 bench_column,
                 pattern_column,
                 hole_column,
                 collar_elevation_column,
                 computed_elevation_column,
                 rig_id_column):

        self.df = df
        self.start_time_column_name = start_time_column
        self.end_time_column_name = end_time_column
        self.end_depth_column_name = end_depth_column
        self.bench_column_name = bench_column
        self.pattern_column_name = pattern_column
        self.hole_column_name = hole_column
        self.collar_elevation_column_name = collar_elevation_column
        self.computed_elevation_column = computed_elevation_column
        self.rig_id_column_name = rig_id_column

        self.expected_columns = [self.start_time_column_name,
                                 self.end_time_column_name,
                                 self.end_depth_column_name,
                                 self.bench_column_name,
                                 self.pattern_column_name,
                                 self.hole_column_name,
                                 self.collar_elevation_column_name,
                                 self.computed_elevation_column,
                                 self.rig_id_column_name
                                 ]

        # DO VALIDATIONS ON THE COLUMNS
        if self._check_existing_columns() is False:
            return False

        # change from str to datetime columns
        self.df[start_time_column] = pd.to_datetime(self.df[start_time_column])
        self.df[end_time_column] = pd.to_datetime(self.df[end_time_column])
        
        

    def _check_existing_columns(self):
        for column in self.expected_columns:
            if column not in self.df.columns:
                print ("Couldnt find " + str(column) + " in the mwd")
                return False
        return True

    def get_holes_df_from_rig_timeinterval(self, mwd_df, rig_id, start_dtime, end_dtime):
        mwd_rig = mwd_df[mwd_df[self.rig_id_column_name].astype(str) == rig_id]
        if len(mwd_rig) == 0:
            print ("Could not find " + str(rig_id) + " in this mwd")
            return False

        mwd_rig_time_interval = mwd_rig[mwd_rig[self.start_time_column_name] >= start_dtime]
        mwd_rig_time_interval = mwd_rig_time_interval[
            mwd_rig_time_interval[self.start_time_column_name] <= end_dtime]

        if len(mwd_rig_time_interval) == 0:
            print ("Could not find this interval " + str(start_dtime) +
                   " - " + str(end_dtime) + " in this mwd")
            return False

        return self._split_df_to_bph_df(mwd_rig_time_interval)
    
    def get_interpolated_column(self,mwd,column_name,time_vector=None):
        if time_vector is None:
            min_dt = mwd[self.start_time_column_name].min()
            max_dt = mwd[self.end_time_column_name].max()
            periods = (max_dt-min_dt).total_seconds()
            time_vector = pd.date_range(start=min_dt, periods=periods, freq='1S')
        
        interpolated_column = get_interpolated_column(time_vector, mwd, column_name,end_time_column_label=self.end_time_column_name)
        return np.asarray(interpolated_column),time_vector
        

    # split df by bench/pattern/hole
    def _split_df_to_bph_df(self, df):
        benchs = df[self.bench_column_name].unique()
        holes_dfs = []
        for bench in benchs:
            df_bench = df[df[self.bench_column_name] == bench]
            patterns = df_bench[self.pattern_column_name].unique()
            for pattern in patterns:
                df_pattern = df_bench[df_bench[self.pattern_column_name] == pattern]
                holes = df_pattern[self.hole_column_name].unique()
                for hole in holes:
                    holes_dfs.append(
                        df_pattern[df_pattern[self.hole_column_name] == hole])
        return holes_dfs
