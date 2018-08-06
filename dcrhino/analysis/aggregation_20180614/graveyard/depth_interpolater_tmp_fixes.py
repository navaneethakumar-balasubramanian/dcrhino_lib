import os
import datetime
import numpy as np
import pandas as pd
import pdb

from dcrhino.constants import DATA_PATH
from dcrhino.common.mwds_db import MWDS_DB


MWD_QUERY = "\
    select * from (\
        select count(*) nrows,\
            hole_id,\
            bench,\
            pattern,\
            machine_id,\
            min(time_start_utc) start_time,\
            max(time_end_utc) end_time,\
            min(start_depth) depth_start,\
            max(end_depth) depth_end\
            from mtwright.mwd_data\
            group by hole_id, bench, pattern, machine_id\
            )\
            where start_time < %(t)s and\
            end_time > %(t)s and\
            machine_id = %(machine_id)s"

class DepthInterpolater():
    def __init__(self, filename=""):
        self.filename = filename

        #filepath = os.path.join(DATA_PATH, "final_SSX64601_BH1-BH2_Ch32_peak.csv")
        filepath = os.path.join(DATA_PATH, "corr_decon_100ms_SSX64601_BH1-BH2_Ch32_peak.csv")
        df = pd.read_csv(filepath, parse_dates=[0])
        #pdb.set_trace()
        df = df.dropna()
        df.columns = ["datetime", "hole", "peak_ampl_x", "peak_ampl_y", "peak_ampl_z", "peak_mult_x"]
        df = df.sort_values(['datetime', 'hole'])
        self.df = df
        self.start_times = {}
        self.end_times = {}
        self.start_depths = {}
        self.end_depths = {}
        self.hole_ids = {}

    def get_time_bounds(self):
        for dummy_hole_id, group in self.df.groupby(['hole']):
            hole_drilling_min_time = group['datetime'].min().value / 1000000000
            hole_drilling_max_time = group['datetime'].max().value / 1000000000
            self.start_times[dummy_hole_id] = datetime.datetime.utcfromtimestamp(hole_drilling_min_time).strftime('%Y-%m-%d %H:%M:%S')
            self.end_times[dummy_hole_id] = datetime.datetime.utcfromtimestamp(hole_drilling_max_time).strftime('%Y-%m-%d %H:%M:%S')

    def get_depth_bounds(self):
        for key, value in self.start_times.iteritems():
            results = MWDS_DB.execute(MWD_QUERY, {'t': value, 'machine_id': '224.0'})
            self.start_depths[key] = results[0][-2]
            self.end_depths[key] = results[0][-1]
            self.hole_ids[key] = results[0][1]


    def interpolate(self):
        pdb.set_trace()
        self.get_time_bounds()
        self.get_depth_bounds()

        df = self.df

        # Creating the row number within each hole id column
        df['row_num'] = df.groupby('hole').cumcount()

        # converting dicts to tuples
        start_depths = [(x,y) for x,y in self.start_depths.iteritems()]
        end_depths = [(x,y) for x,y in self.end_depths.iteritems()]
        hole_ids = [(x,y) for x,y in self.hole_ids.iteritems()]

        pdb.set_trace()
        # converting to data frames
        start_depths = pd.DataFrame.from_records(start_depths, columns=['hole', 'start_depth'])
        end_depths = pd.DataFrame.from_records(end_depths, columns=['hole', 'end_depth'])
        hole_ids = pd.DataFrame.from_records(hole_ids, columns=['hole', 'hole_id'])

        # merging
        df = pd.merge(df, start_depths, on=['hole'], how='inner')
        df = pd.merge(df, end_depths, on=['hole'], how='inner')
        df = pd.merge(df, hole_ids, on=['hole'], how='inner')

        # interpolation
        df['diff'] = df['end_depth'] - df['start_depth']
        df['num_rows'] = df.groupby('hole')['peak_mult_x'].transform('count')
        df['diff'] = df['diff'] / df['num_rows']
        df['depth'] = df['start_depth'] + (df['row_num']*df['diff'])
        df.to_csv(os.path.join(DATA_PATH, "depth_interpolated.csv"), sep=',', encoding='utf-8', index=False)

depth_interpolater = DepthInterpolater()
depth_interpolater.interpolate()
print('dine')