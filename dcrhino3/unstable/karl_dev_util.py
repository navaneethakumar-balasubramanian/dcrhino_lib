# -*- coding: utf-8 -*-
"""
Created on Thu Apr 11 17:24:49 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

home = os.path.expanduser("~/")
dc_cache_path = os.path.join(home, '.cache', 'datacloud')
dc_rhino_lib_dir = os.path.join(home, 'software/datacloud/dcrhino_lib')
bin_dir = os.path.join(dc_rhino_lib_dir, 'bin')

env_path = os.path.join(bin_dir, 'env_config.json')
#env_config = EnvConfig(env_path) #this is where to get and put on a high level

process_flow_dir = os.path.join(bin_dir, 'process_flows')

mont_wright_acorr_folder = os.path.join(dc_cache_path, 'mont_wright/acorr')
mont_wright_processed_folder = os.path.join(dc_cache_path, 'mont_wright/processed')

line_creek_data_cache_path = os.path.join(dc_cache_path, 'line_creek')
line_creek_acorr_folder = os.path.join(line_creek_data_cache_path, 'acorr')

eastern_ridge_folder = os.path.join(dc_cache_path, 'eastern_ridge')
eastern_ridge_acorr_folder = os.path.join(eastern_ridge_folder, 'acorr')
eastern_processed_folder = os.path.join(eastern_ridge_folder, 'processed')



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
