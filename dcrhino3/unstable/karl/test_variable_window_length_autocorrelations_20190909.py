# -*- coding: utf-8 -*-
"""
Created on Mon Sep  9 08:54:37 2019

@author: kkappler

Purpose:
    1. Read in blasthole observations table and iterate.
    check if parent files, times, etc are labelled?

    ~/.cache/datacloud/bmc/south_walker_creek/sensor_files_201909031224.csv
    2.

    Note: if it is a slamstix file then we will go for the level_1 data
    if it is a rhino file then we will go for the level_0 data

    Level 0 files: how they are organized: timestamped
"""

from __future__ import absolute_import, division, print_function

from dc_mwd.mine_data_cache_paths import MineDataCachePaths
import datetime
import h5py
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

from dc_mwd.mine_data_cache_paths import MineDataCachePaths

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.signal_processing.interpolation import interpolate_data

logger = init_logging(__name__)
client = 'bmc'
mine = 'south_walker_creek'

mine_data_cache_path = MineDataCachePaths(client, mine)
sensor_files_csv_filehandle = 'sensor_files_201909031224.csv'
sensor_files_csv = os.path.join(mine_data_cache_path.mine_cache_path,
                                sensor_files_csv_filehandle)
sensor_files_df = pd.read_csv(sensor_files_csv)

observed_blastholes_csv_filehandle = 'blasthole_observations_201909031338.csv'
observed_blastholes_csv = os.path.join(mine_data_cache_path.mine_cache_path,
                                observed_blastholes_csv_filehandle)
observed_blastholes_df = pd.read_csv(observed_blastholes_csv)

ssx = False
i_observed_blasthole = 0
while ssx is False:
    observed_blasthole = observed_blastholes_df.iloc[i_observed_blasthole]
    if 'S' in observed_blasthole.digitizer_id:
        i_observed_blasthole += 1
    else:
        ssx = True

#def load_level_1_data(observed_blasthole, sensor_files_df):
#dfs
pdb.set_trace()
observed_blasthole = observed_blastholes_df.iloc[i_observed_blasthole]
sensor_file_ids = observed_blasthole.files_ids#solution
sensor_file_ids = sensor_file_ids.split(',')
sensor_file_ids = [int(x) for x in sensor_file_ids]
sensor_file_ids.sort()

print('what guarantee do I have that these sensor files are sorted in time?')
print('I will assume none at all')

#pdb.set_trace()
active_sensor_files = sensor_files_df.loc[sensor_files_df['sensor_file_id'].isin(sensor_file_ids)]
active_sensor_files = active_sensor_files.sort_values(by=['min_ts'])#, inplace=True)

for i_sf in range(len(sensor_file_ids)):
    sensor_file_row = active_sensor_files.iloc[i_sf]
    field_data_path = sensor_file_row.file_path.split('field_data')[1]
    sensor_file_path = os.path.join(mine_data_cache_path.field_data_folder, field_data_path[1:])
    sensor_file_exists = os.path.isfile(sensor_file_path)
    print('{} exists = {}'.format(sensor_file_path, sensor_file_exists))
    if sensor_file_exists:
        h5f = h5py.File(sensor_file_path, 'r')
    else:
        continue
#    pdb.set_trace()
    if ssx:
        cond1 = observed_blasthole.start_time_min > sensor_file_row.min_ts
        cond2 = observed_blasthole.start_time_max < sensor_file_row.max_ts
        if cond1 & cond2:
            print('observed blasthole entirely within sensor file')
        else:
            print('SKIPPING observed blasthole NOT entirely within sensor file')
            continue
        ts = np.asarray(h5f.get('ts'), dtype=np.float64)
        sps = np.round(len(ts)/(ts[-1]-ts[0]))
        dt = 1./sps
        cond1 = ts > observed_blasthole.start_time_min
        cond2 = ts < observed_blasthole.start_time_max
        relevant_indices = np.where(cond1 & cond2)[0]
        ndx0 = relevant_indices[0]
        ndx1 = relevant_indices[-1]+1
        ts = ts[ndx0:ndx1]
 #       pdb.set_trace()
        #with h5py.File('random.hdf5', 'r') as f:
        data_set = h5f['x']
        data = data_set[ndx0:ndx1]
        ideal_timestamps = np.arange(np.ceil(ts[0]), np.floor(ts[-1]), dt)
        qq = interpolate_data(ts, data, ideal_timestamps, kind="quadratic", dtype=np.float64)
#        plt.plot(ts, data)
#        plt.plot(ideal_timestamps, qq)
#        plt.show()
        pdb.set_trace()
        print("what confidence that we do not have axial/tangential flipped do have here?")

        #x = np.asarray(h5f.get('x'), dtype=np.float64)
        pass
    else:
        h5f = h5py.File(sensor_file_path, 'r')
        ts = np.asarray(h5f.get('timestamp'), dtype=np.float64)
        h5h = H5Helper(h5f, config=0)
    pdb.set_trace()
    print(i_sf)


pdb.set_trace()

print('ok')
#home = os.path.expanduser("~/")


def my_function():
    """
    """
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
