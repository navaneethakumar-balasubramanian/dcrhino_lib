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
import socket

hostname = socket.gethostname()

home = os.path.expanduser("~/")

if hostname == 'dcrhino-dev':
    dc_cache_path = os.path.join('/data')
    dc_rhino_lib_dir = os.path.join(home, 'dcrhino_lib')
else:
    dc_cache_path = os.path.join(home, '.cache', 'datacloud')
    dc_rhino_lib_dir = os.path.join(home, 'software/datacloud/dcrhino_lib')
bin_dir = os.path.join(dc_rhino_lib_dir, 'bin')

env_path = os.path.join(bin_dir, 'env_config.json')
#env_config = EnvConfig(env_path) #this is where to get and put on a high level

process_flow_dir = os.path.join(bin_dir, 'process_flows')

mont_wright_data_cache_path = os.path.join(dc_cache_path, 'arcelor_mittal/mont_wright')
mont_wright_acorr_folder = os.path.join(mont_wright_data_cache_path, 'acorr')
mont_wright_processed_folder = os.path.join(mont_wright_data_cache_path, 'processed')

line_creek_data_cache_path = os.path.join(dc_cache_path, 'line_creek')
line_creek_acorr_folder = os.path.join(line_creek_data_cache_path, 'acorr')
line_creek_mwd_filehandle = os.path.join(line_creek_data_cache_path, 'mwd.csv')

bma_data_cache_path = os.path.join(dc_cache_path, 'bma')
bma_acorr_folder = os.path.join(bma_data_cache_path, 'acorr')

bmc_data_cache_path = os.path.join(dc_cache_path, 'bmc')
south_walker_creek_data_cache_path = os.path.join(bmc_data_cache_path, 'south_walker_creek')
south_walker_creek_acorr_folder = os.path.join(south_walker_creek_data_cache_path, 'acorr')

bhp_data_cache_path = os.path.join(dc_cache_path, 'bhp')
eastern_ridge_data_cache_path = os.path.join(bhp_data_cache_path, 'eastern_ridge')
eastern_ridge_acorr_folder = os.path.join(eastern_ridge_data_cache_path, 'acorr')
eastern_ridge_mwd_folder = os.path.join(eastern_ridge_data_cache_path, 'mwd')
eastern_ridge_mwd_filehandle = os.path.join(eastern_ridge_mwd_folder, 'mwd.csv')

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
