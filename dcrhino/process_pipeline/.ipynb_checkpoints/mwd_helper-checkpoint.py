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
                 start_time_column='start_time_utc',
                 end_time_column='end_time_utc',
                 #end_depth_column,
                 bench_column='bench',
                 pattern_column='pattern',
                 hole_column='hole',
                 collar_elevation_column='collar_elevation',
                 computed_elevation_column='computed_elevation',
                 rig_id_column='rig_id',
                 mse_column='mse',
                 rop_column='rop',
                 wob_column='wob',
                 tob_column='tob',
                 easting_column='easting',
                 northing_column='northing',
                 mwd_map=False):

        self.df = df
        self.start_time_column_name = start_time_column
        self.end_time_column_name = end_time_column
        self.bench_column_name = bench_column
        self.pattern_column_name = pattern_column
        self.hole_column_name = hole_column
        self.collar_elevation_column_name = collar_elevation_column
        self.computed_elevation_column_name = computed_elevation_column
        self.rig_id_column_name = rig_id_column
        self.mse_column_name = mse_column
        self.rop_column_name = rop_column
        self.wob_column_name = wob_column
        self.tob_column_name = tob_column
        self.easting_column_name = easting_column
        self.northing_column_name = northing_column
        self.mwd_map = mwd_map

        if self.mwd_map:
            self.set_map_columns(self.mwd_map)



        self.expected_columns = {'start_time' : self.start_time_column_name ,
                                 'end_time' : self.end_time_column_name,
                                 'bench_name' : self.bench_column_name,
                                 'pattern_name' : self.pattern_column_name,
                                 'hole_name' : self.hole_column_name,
                                 'collar_elevation' : self.collar_elevation_column_name,
                                 'computed_elevation' : self.computed_elevation_column_name,
                                 'rig_id' : self.rig_id_column_name,
                                 'mse' : self.mse_column_name,
                                 'rop' : self.rop_column_name,
                                 'wob' : self.wob_column_name,
                                 'tob' : self.tob_column_name,
                                 'easting' : self.easting_column_name,
                                 'northing' : self.northing_column_name,
                                 }

        # DO VALIDATIONS ON THE COLUMNS
        if self.check_existing_expected_columns(self.df) is False:
            return False

        # change from str to datetime columns
        self.df[self.start_time_column_name] = pd.to_datetime(self.df[self.start_time_column_name])
        self.df[self.end_time_column_name] = pd.to_datetime(self.df[self.end_time_column_name])


    def set_map_columns(self,mwd_map_obj):
        for _key in mwd_map_obj.keys():
            self.__dict__[_key+"_column_name"] = mwd_map_obj[_key]


    def check_existing_expected_columns(self,mwd_df):
        for key,column in self.expected_columns.iteritems():
            if column not in self.df.columns:
                print ("Couldnt find " + str(column) + " in the mwd")
                return False
        return True

    def get_depth_column(self,mwd):
        if self.computed_elevation_column_name in mwd.columns and self.collar_elevation_column_name in mwd.columns:
            collar_elevation = mwd[self.collar_elevation_column_name].values[0]
            return (mwd[self.computed_elevation_column_name] - collar_elevation) *-1
        print ("No computed_elevation or collar_elevation in this mwd")
        return False


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

        interpolated_column = get_interpolated_column(time_vector, mwd, column_name,end_time_column_label=self.start_time_column_name)
        return np.asarray(interpolated_column),time_vector



    # split df by bench/pattern/hole
    def _split_df_to_bph_df(self, df):
        df[self.bench_column_name] = df[self.bench_column_name].astype(str)
        df[self.pattern_column_name] = df[self.pattern_column_name].astype(str)
        df[self.hole_column_name] = df[self.hole_column_name].astype(str)

        benchs = df[self.bench_column_name].unique()
        holes_dfs = []
        for bench in benchs:
            df_bench = df[df[self.bench_column_name] == bench]
            patterns = df_bench[self.pattern_column_name].unique()
            for pattern in patterns:
                df_pattern = df_bench[df_bench[self.pattern_column_name] == pattern]
                holes = df_pattern[self.hole_column_name].unique()
                for hole in holes:
                    hole_df = df_pattern[df_pattern[self.hole_column_name] == hole]
                    hole_df = hole_df.sort_values(by=[self.start_time_column_name])
                    holes_dfs.append(hole_df)
        return holes_dfs
