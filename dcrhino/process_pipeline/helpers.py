import pandas as pd
import pdb
import numpy as np
from datetime import datetime
from dcrhino.real_time.metadata import Metadata
import ConfigParser


class H5Helper:

    def __init__(self, h5f):
        self.h5f = h5f
        self.metadata = self._extract_metadata_from_h5_file()
        self.ts = np.asarray(self.h5f.get('ts'))
        self.x_data = np.asarray(self.h5f.get('x'))
        self.y_data = np.asarray(self.h5f.get('y'))
        self.z_data = np.asarray(self.h5f.get('z'))
        self.data_xyz = [self.x_data, self.y_data, self.z_data]


        self.min_ts = self.ts.min()
        self.max_ts = self.ts.max()

        self.max_dtime = datetime.utcfromtimestamp(int(self.max_ts))
        self.min_dtime = datetime.utcfromtimestamp(int(self.min_ts))
        
        self.sensitivity_xyz = self._get_sensitivity_xyz()
        self.is_ide_file = self._is_ide_file()

    def _is_ide_file(self):
        if len(self._sensitivity) == 3:
            self.is_ide_file = True
        else:
            self.is_ide_file = False

    def _get_sensitivity_xyz(self):
        self._sensitivity = self.h5f.get('sensitivity')
        if len(self._sensitivity) == 3:
            self.x_sensitivity = self._sensitivity[0]
            self.y_sensitivity = self._sensitivity[1]
            self.z_sensitivity = self._sensitivity[2]
        else:
            self.x_sensitivity = self._sensitivity[0]
            self.y_sensitivity = self._sensitivity[0]
            self.z_sensitivity = self._sensitivity[0]
        return [self.x_sensitivity, self.y_sensitivity, self.z_sensitivity]

    def _extract_metadata_from_h5_file(self):
        config = ConfigParser.ConfigParser()
        for key, value in self.h5f.attrs.iteritems():
            # print(key,value)
            section = key.split("/")[0]
            param_name = key.split("/")[1]
            # pdb.set_trace()
            if config.has_section(section):
                config.set(section, param_name, value)
            else:
                config.add_section(section)
                config.set(section, param_name, value)
        m = Metadata(config)
        return m


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
