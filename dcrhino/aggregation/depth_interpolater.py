import os
import datetime
import pandas as pd
import pdb

from dcrhino.constants import MACHINE_IDS
from dcrhino.common.mwds_db import MWDS_DB

MWD_QUERY = "\
    select * from (\
        select count(*) nrows,\
            hole_id,\
            machine_id,\
            min(time_start_utc) start_time,\
            max(time_end_utc) end_time,\
            min(start_depth) depth_start,\
            max(end_depth) depth_end\
            from mtwright.mwd_data\
            group by hole_id, machine_id\
            )\
            where start_time < %(t)s and\
            end_time > %(t)s and\
            machine_id = %(machine_id)s"

MSE_QUERY = "select end_depth as depth, mse\
    from mtwright.mwd_data\
    where hole_id = %(hole_id)s and machine_id = %(machine_id)s"
    
HOLE_BENCH_PATTERN = "select bench, pattern, hole, hole_id\
    from mtwright.mwd_data_bckup_15Jun2018\
    where hole_id = %(hole_id)s and machine_id = %(machine_id)s\
    limit 1"

class DepthInterpolater():
    def __init__(self, filepath=""):
        input_filename = os.path.basename(filepath)
        print("DepthInterpolater started for file {}".format(filepath))

        df = pd.read_csv(filepath, parse_dates=[0])

        self.input_filename = input_filename
        self.filepath = filepath
        self.df = df
        self.time_bounds = {}
        self.time_intervals = {}
        self.start_depths = {}
        self.end_depths = {}
        self.hole_ids = {}
        self.machine_ids = {}

    def get_time_bounds(self):
        for name, group in self.df.groupby(['dummy_hole_id']):
            if name != 0:
                datetime_min_epoch = group['datetime'].min().value / 1000000000
#                start_datetime = group['datetime'].min()
#                end_datetime = group['datetime'].max()

                time_buffer = 15 * 60 #5 minutes
                self.time_bounds[name] = datetime.datetime.utcfromtimestamp(datetime_min_epoch + time_buffer).strftime('%Y-%m-%d %H:%M:%S')
                self.machine_ids[name] = group['machine_id'].min()

    def get_depth_bounds(self):
        for key, value in self.time_bounds.iteritems():
            #pdb.set_trace()
            results = MWDS_DB.execute(MWD_QUERY, {'t': value, 'machine_id': str(self.machine_ids[key])})
            if(len(results) == 1):
                self.start_depths[key] = results[0][-2]
                self.end_depths[key] = results[0][-1]
                self.hole_ids[key] = results[0][1]
            elif(len(results) == 0):
                print("Depth not found for hole {}".format(key))
            else:
                print("More than 1 depth bound found for hole {}".format(key))

    def fill_mse(self, df):
        for dummy_hole_id, group in df.groupby(['dummy_hole_id']):
            hole_id = group['hole_id'].min()
            machine_id = group['machine_id'].min()
            results = MWDS_DB.execute(MSE_QUERY, {'hole_id': hole_id, 'machine_id': str(machine_id)})
            mse_df = pd.DataFrame.from_records(results, columns = ['depth', 'mse'])
            merged_mse = pd.merge_asof(group, mse_df[['depth', 'mse']], on="depth", direction="forward")
            df.loc[group.index, 'mse'] = merged_mse.mse.values
            
    def fill_hole_bench_pattern(self, df):
        for dummy_hole_id, group in df.groupby(['dummy_hole_id']):
            hole_id = group['hole_id'].min()
            machine_id = group['machine_id'].min()
            results = MWDS_DB.execute(HOLE_BENCH_PATTERN, {'hole_id': hole_id, 'machine_id': str(machine_id)})
            bench = ""
            pattern = ""
            hole = ""
            
            if(len(results) != 0):
                bench = results[0][0]
                pattern = results[0][1]
                hole = results[0][2]
        
            df.loc[group.index, 'bench'] = bench
            df.loc[group.index, 'pattern'] = pattern
            df.loc[group.index, 'hole'] = hole
        
    def interpolate(self):
        self.get_time_bounds()
        self.get_depth_bounds()

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
        print(hole_ids)

        # merging
        df = pd.merge(df, start_depths, on=['dummy_hole_id'], how='inner')
        df = pd.merge(df, end_depths, on=['dummy_hole_id'], how='inner')
        df = pd.merge(df, hole_ids, on=['dummy_hole_id'], how='inner')

        # interpolation
        df['diff'] = df['end_depth'] - df['start_depth']
        df['num_rows'] = df.groupby('dummy_hole_id')['peak_mult_x'].transform('count')
        df['diff'] = df['diff'] / df['num_rows']
        df['depth'] = df['start_depth'] + (df['row_num']*df['diff'])

        self.fill_mse(df)
        self.fill_hole_bench_pattern(df)

        # hole_ids_str = "_".join(self.hole_ids.values())
        output_filename = "mwded_{}".format(self.input_filename)
        output_filepath = os.path.join(os.path.dirname(self.filepath), output_filename)

        df.to_csv(output_filepath, sep=',', encoding='utf-8', index=False)
        print("Finished writing depth interpolated results to {}".format(output_filepath))
        return output_filepath
