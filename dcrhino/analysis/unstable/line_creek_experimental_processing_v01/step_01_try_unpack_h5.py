# -*- coding: utf-8 -*-
"""
Created on Mon Sep 10 17:37:54 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

import h5py

home = os.path.expanduser("~/")
data_folder = os.path.join(home, 'data/datacloud/line_creek/level_0/20180910/Drill_31/100G_Sensor/OminiAntenna/run_1536605717')
data_file_list = ['raw_data_2018_09_10_18.h5', 'raw_data_2018_09_10_19.h5']
data_folder = os.path.join(home, 'data/datacloud/line_creek/level_0/20180910/Drill_31/500G_Sensor/run_1536598526')
data_file_list = ['raw_data_2018_09_10_16.h5', 'raw_data_2018_09_10_17.h5']


full_filename = os.path.join(data_folder, data_file_list[0])
hf = h5py.File(full_filename, 'r')
print(hf['ts'][0])
start_sec = int(hf['ts'][0])
full_filename = os.path.join(data_folder, data_file_list[1])
hf = h5py.File(full_filename, 'r')
print(hf['ts'][-1])
end_second = int(hf['ts'][-1])
print(end_second-start_sec)
pdb.set_trace()
print(hf)
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
