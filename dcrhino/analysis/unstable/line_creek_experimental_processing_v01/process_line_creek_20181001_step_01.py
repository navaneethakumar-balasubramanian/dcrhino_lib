# -*- coding: utf-8 -*-
"""
Created on Mon Oct  1 17:08:18 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import h5py
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import time

home = os.path.expanduser("~/")
data_dir = '/home/kkappler/data/datacloud/azure_dump/data_sdd/data_from_rhino/\
Teck_LCO/Drill_31/ssx/level_1/piezo/2800hz'
basenames = ['20180910_SSX57868_5208_2800.h5', '20180910_SSX57890_5451_2800.h5']

for basename in basenames:
    full_h5_file = os.path.join(data_dir, basename)
    h5file = h5py.File(full_h5_file, 'r')
    unix_start = int(np.ceil(h5file['ts'][0]))
    unix_end = int(np.floor(h5file['ts'][-1]))
    timetup = time.gmtime(unix_start)
    start_string = time.strftime('%Y%m%dT%H%M%SZ', timetup)
    timetup = time.gmtime(unix_end)
    end_string = time.strftime('%Y%m%dT%H%M%SZ', timetup)
    time_interval_string = '{}-{}'.format(start_string, end_string)
    print(basename, '--->  ', time_interval_string)




print(data_dir)

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
