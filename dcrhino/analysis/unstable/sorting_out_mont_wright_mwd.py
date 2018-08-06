# -*- coding: utf-8 -*-
"""
Created on Fri Jun 29 12:03:24 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

from dcrhino.constants import DATA_PATH
#TODO


metadata_file = os.path.join(DATA_PATH, 'mont_wright/mwd_hole_info_from_krishna_working_copy.csv')
metadata_file = os.path.join(DATA_PATH, 'mont_wright/hole_info_from_krishna.csv')
df = pd.read_csv(metadata_file, parse_dates=['time_start', 'time_end'])
machine_ids = list(set(list(df['machine_id'])))
#2018-05-29; 226:
holes_for_which_we_have_data_dict = {}
start_date = datetime.date(2018, 5, 29)
end_date = datetime.date(2018, 5, 31)
date_range = pd.date_range(start=start_date, end=end_date)
date_time_interval_dict = {}
date_time_interval_dict[226] = {}

date_time_interval_dict[226][datetime.date(2018, 5, 29)] = 'timeinterval'
for machine_id in machine_ids:
    #for data
    #dff = df.query()
    dff = df.query('machine_id=="{}"'.format(machine_id))
    if machine_id == 226:
        dff = dff.query('time_start > "{}"'.format(datetime.datetime(2018, 5, 29, 14,9,0)))
        dff = dff[dff.hole_id != 109921]
        dff = dff[dff.hole_id != 109928]
    if machine_id == 231:
        #pdb.set_trace()
        dff = dff.query('time_start > "{}"'.format(datetime.datetime(2018, 5, 29, 14,15,0)))
        dff = dff[dff.hole_id != 109925] #too late
        dff = dff[dff.hole_id != 109910] #7 seconds; oops

    if machine_id == 224:
        #pdb.set_trace()
        #dff_29_may =

        dff = dff.query('time_start > "{}"'.format(datetime.datetime(2018, 5, 29, 19,17,0)))
        #dff = dff[dff.hole_id != 109925] #too late
        dff = dff[dff.hole_id != 109910] #7 seconds; oops

        #cond1_30May = dff['time_start'] > datetime.datetime(2018, 5, 29, 19, 17, 0)
        #'time_start > "{}"'.format(datetime.datetime(2018, 5, 29, 19, 17, 0))
        #cond2_30May = 'time_start < "{}"'.format(datetime.datetime(2018, 5, 30, 14, 16, 0))
        #dff = dff.query('{} & {}'.format(cond1_30May & cond2_30May))
        #pdb.set_trace()
        print('ok')
    if machine_id == 221:
        dff = dff.query('time_start > "{}"'.format(datetime.datetime(2018, 5, 30, 14,25,0)))
        dff = dff.query('time_start < "{}"'.format(datetime.datetime(2018, 6, 1, 0,0,0)))
        pdb.set_trace()
        print('s')

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
