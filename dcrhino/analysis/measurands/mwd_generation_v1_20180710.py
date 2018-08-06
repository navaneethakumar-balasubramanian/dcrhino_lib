# -*- coding: utf-8 -*-
"""
Created on Tue Jul 10 10:46:40 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import distutils.util
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb
import time

from dcrhino.analysis.measurands.level_1.mwd_with_mse_measurand import MWDWithMSE

mwd_with_mse = MWDWithMSE()
def generate_mwd_all(project_id):
    if project_id == 'mont_wright':
        mwd_with_mse = MWDWithMSE(project_id=project_id, data_level=1, extension='csv')
        mwd_filename = mwd_with_mse.expected_filename()
        source_data_level_path = mwd_with_mse.data_level_path(data_level=0)
        hole_profile_csv = os.path.join(source_data_level_path, 'mwd', 'mwd_2018-05-29_with_MSE_hole_profile.csv')
        df1 = pd.read_csv(hole_profile_csv, parse_dates=['time_start', 'time_end'])
        hole_profile_csv = os.path.join(source_data_level_path, 'mwd', 'mwd_2018-05-30_with_MSE_hole_profile.csv')
        df2 = pd.read_csv(hole_profile_csv, parse_dates=['time_start', 'time_end'])
        hole_profile_csv = os.path.join(source_data_level_path, 'mwd', 'mwd_2018-05-31_with_MSE_hole_profile.csv')
        df3 = pd.read_csv(hole_profile_csv, parse_dates=['time_start', 'time_end'])
        frames = [df1, df2, df3]
        result = pd.concat(frames)
        result.to_csv(mwd_filename)
    elif project_id == 'west_angelas':
        data_path = '/home/kkappler/software/datacloud/dcrhino_data_processing/data/west_angelas/level_0'
        #csv_fname = '3ws_dbc2_710_197_drillholedata.csv'
        csv_fname = '3ws_dbc2_710_197_drillholedata_v2.csv'
        filename = os.path.join(data_path, csv_fname)
        t0 = time.time()
        df = pd.read_csv(filename, comment='#')
        df = df.drop(' WORK_REASON_NAME', axis=1)
        df = df.drop(' WORK_REASON_CODE', axis=1)
        df = df.rename(index=str, columns={"AREA": "area", " HOLE": "hole", " RIG":"machine_id",
                                   ' STARTTIME':'time_start',' ENDTIME':'time_end',
                                   ' FROM':'fromm',' TO':'too', ' HOLE_VALID':'hole_valid' })
        print(time.time() - t0)
        print(df.columns)
        pdb.set_trace()
        is_valid = [distutils.util.strtobool(x.strip()) for x in df['hole_valid']]
        df['hole_valid']=is_valid
        print(len(df))
        df = df[df.hole_valid != 0]
        df.too=df.too.convert_objects(convert_numeric=True).astype(np.float32)
        df.fromm = df.fromm.convert_objects(convert_numeric=True).astype(np.float32)
        df = df.rename(index=str, columns={"fromm": "start_depth", "too": "end_depth"})
#        df.to =
        pdb.set_trace()
##        for i in range(len(df)):
##            df['from'][]
#        qq = pd.Series([np.float32(x) for x in df['from']])
#
#        df['from'] = pd.Series([np.float32(x) for x in df['from']])
#        df['to'] = pd.Series([np.float32(x) for x in df['to']])

        mwd_with_mse = MWDWithMSE(project_id=project_id, data_level=1, extension='csv')
        mwd_filename = mwd_with_mse.expected_filename()
        df.to_csv(mwd_filename)


def my_function():
    """
    """
    pass

def main():
    """
    """
    project_id = 'mont_wright'
    project_id = 'west_angelas'
    generate_mwd_all(project_id)

    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
