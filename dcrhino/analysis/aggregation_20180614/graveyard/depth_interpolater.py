import os
import datetime
import numpy as np
import pandas as pd
import pdb

from dcrhino.constants import DATA_PATH, MACHINE_IDS
from dcrhino.common.mwds_db import MWDS_DB
from dcrhino.interval import TimePeriod

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
    def __init__(self, filepath=""):
        input_filename = os.path.basename(filepath)
        self.input_filename = input_filename
        print("DepthInterpolater started for file {}".format(filepath))

        output_filename = "interpolated_{}".format(self.input_filename)
        output_folder = os.path.dirname(filepath)
        self.output_filepath = os.path.join(output_folder, output_filename)

        df = pd.read_csv(filepath, parse_dates=[0])#, index_col=['datetime'])
        #df = df.dropna()
#        df.columns = ["datetime", "hole", "peak_ampl_x", "peak_ampl_y", "peak_ampl_z", "peak_mult_x", "peak_mult_y", "peak_mult_z"]

        self.df = df
        self.time_bounds = {}
        self.time_intervals = {}
        self.start_depths = {}
        self.end_depths = {}
        self.hole_ids = {}

    def get_time_bounds(self):
        for name, group in self.df.groupby(['dummy_hole_id']):
            if name != 0:
                datetime_min_epoch = group['datetime'].min().value / 1000000000
                start_datetime = group['datetime'].min()
                end_datetime = group['datetime'].max()
                time_interval = TimePeriod(lower_bound=start_datetime, upper_bound=end_datetime)
                time_interval_seconds = time_interval.duration()
                print("Time interval for dummy_hole_id {} has duration {}s or ~{}min".format(name, int(time_interval_seconds), int(time_interval_seconds/60.)))
                #pdb.set_trace()
                time_buffer = 15 * 60 #5 minutes
                self.time_bounds[name] = datetime.datetime.utcfromtimestamp(datetime_min_epoch + time_buffer).strftime('%Y-%m-%d %H:%M:%S')
                self.time_intervals[name] = time_interval

#    def get_depth_bounds(self):
#        for key, value in self.time_bounds.iteritems():
#            results = MWDS_DB.execute(MWD_QUERY, {'t': value, 'machine_id': MACHINE_IDS[self.input_filename]})
#            if(len(results) == 1):
#                self.start_depths[key] = results[0][-2]
#                self.end_depths[key] = results[0][-1]
#                self.hole_ids[key] = results[0][1]
#            elif(len(results) == 0):
#                print("Depth not found for hole {}".format(key))
#            else:
#                print("More than 1 depth bound found for hole {}".format(key))

    def get_depth_bounds(self, mwd_hole_id):
        #pdb.set_trace()
        hole_info_csv = os.path.join(DATA_PATH, 'hole_info_mwd.csv')
        hole_profile_csv = os.path.join(DATA_PATH, 'hole_profile_mwd.csv')
        df_hole_info = pd.read_csv(hole_info_csv)
        df_hole_profile = pd.read_csv(hole_profile_csv)
        hole_ids = df_hole_profile['hole_id']
        #should be cast as integers here
        qq = np.where(hole_ids==float(mwd_hole_id))[0]

        #pdb.set_trace()
        return

    def interpolate(self, mwd_hole_id):
        self.get_time_bounds()

        self.get_depth_bounds(mwd_hole_id)

        df = self.df

        # Creating the row number within each hole id column
        df['row_num'] = df.groupby('dummy_hole_id').cumcount()

        # converting dicts to tuples
        start_depths = [(x,y) for x,y in self.start_depths.iteritems()]
        end_depths = [(x,y) for x,y in self.end_depths.iteritems()]
        hole_ids = [(x,y) for x,y in self.hole_ids.iteritems()]

        # converting to data frames
        start_depths = pd.DataFrame.from_records(start_depths, columns=['dummy_hole_id', 'start_depth'])
        end_depths = pd.DataFrame.from_records(end_depths, columns=['dummy_hole_id', 'end_depth'])
        hole_ids = pd.DataFrame.from_records(hole_ids, columns=['dummy_hole_id', 'hole_id'])

        # merging
        df = pd.merge(df, start_depths, on=['dummy_hole_id'], how='inner')
        df = pd.merge(df, end_depths, on=['dummy_hole_id'], how='inner')
        df = pd.merge(df, hole_ids, on=['dummy_hole_id'], how='inner')

        # interpolation
        df['diff'] = df['end_depth'] - df['start_depth']
        df['num_rows'] = df.groupby('dummy_hole_id')['peak_mult_x'].transform('count')
        df['diff'] = df['diff'] / df['num_rows']
        df['depth'] = df['start_depth'] + (df['row_num']*df['diff'])

        df.to_csv(self.output_filepath, sep=',', encoding='utf-8', index=False)
        print("Finished writing depth interpolated results to {}".format(self.output_filepath))
        return self.output_filepath
