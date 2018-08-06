# -*- coding: utf-8 -*-
"""
Created on Mon Jul  2 12:18:16 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb
pdb.set_trace()
#import dcrhino.analysis.measurands.measurand_registry_mont_wright as MEASURAND_REGISTRY
#observer_notes_measurand = MEASURAND_REGISTRY.measurand('observer_notes_measurand')
#from dcrhino.analysis.measurands.measurand_registry_mont_wright import measurandget_observer_notes_data_frame#OBSERVER_NOTES_DF
from dcrhino.constants import DATA_PATH

#OBSERVER_NOTES_DF = get_observer_notes_data_frame()



mwd_file_source = os.path.join(DATA_PATH, 'mont_wright', 'hole_profile_mwd_all_from_krishna.csv')
mwd_file_target = os.path.join(DATA_PATH, 'mont_wright', 'hole_profile_mwd_all_from_krishna_reduced_to_survey.csv')
_master_mwd_data_frame = None


def generate_master_mwd_data_frame():
    df_mwd = pd.read_csv(mwd_file_source, parse_dates=['time_start', 'time_end'])
    #pdb.set_trace()
    ctr = 0
    number_of_holes = len(OBSERVER_NOTES_DF)
    df_list = number_of_holes * [None]
    for i_row in range(number_of_holes):
        row = OBSERVER_NOTES_DF.iloc[i_row]
        hole_id = row['hole_id']
        df = df_mwd[df_mwd['hole_id']==hole_id]
        if len(df) == 0:
            print("Warning no data for this hole")
            pdb.set_trace()
        df_list[i_row] = df
    keeper_df = pd.concat(df_list)
    keeper_df.to_csv(mwd_file_target)
    return keeper_df

def get_master_mwd_data_frame():
    global _master_mwd_data_frame
    if _master_mwd_data_frame is None:
        _master_mwd_data_frame = pd.DataFrame()
        try:
            _master_mwd_data_frame = pd.DataFrame().from_csv(mwd_file_target, parse_dates=['time_start', 'time_end'])
        except IOError:
            logger.error("looks like _master_data_coverage_history DNE\
                         try calling generate_data_coverage_history_data_frame()\
                         to make it")
            raise Exception
    return _master_mwd_data_frame





def main():
    """
    """
    generate_master_mwd_data_frame()

    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
