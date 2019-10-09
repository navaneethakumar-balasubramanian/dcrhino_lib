# -*- coding: utf-8 -*-
"""
Created on Wed Oct  9 12:34:35 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

from dc_mwd.mine_data_cache_paths import MineDataCachePaths
from dc_mwd.logging_util import init_logging

logger = init_logging(__name__)


class NonUniformTimeAxis(object):

    def __init__(self):
        self.sampling_rate = None
        self.time_stamps = None
        self.first_index = None
        self.final_index = None


def get_relevant_array_indices_from_h5(h5f, min_time_stamp, max_time_stamp):
    """
    h5 here is a raw h5 (not yet resampled)
    h5f: 'h5py._hl.files.File'
    """
    ts = np.asarray(h5f.get('ts'), dtype=np.float64)
    sps = np.round(len(ts)/(ts[-1]-ts[0]))
#    dt = 1./sps
    cond1 = ts > min_time_stamp#observed_blasthole.start_time_min
    cond2 = ts < max_time_stamp#observed_blasthole.start_time_max
    relevant_indices = np.where(cond1 & cond2)[0]
    ndx0 = relevant_indices[0]
    ndx1 = relevant_indices[-1]+1
    ts = ts[ndx0:ndx1]
    time_axis = NonUniformTimeAxis()

    time_axis.time_stamps = ts
    time_axis.sampling_rate = sps
    time_axis.first_index = ndx0
    time_axis.final_index  = ndx1
    return time_axis

#MINE_DATA_CACHE_PATH = MineDataCachePaths('bmc', 'south_walker_creek')
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
