# -*- coding: utf-8 -*-
"""
Created on Tue Sep 11 13:59:33 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
#import numpy as np
import os
import pdb
import ConfigParser

from dcrhino.real_time.metadata import Metadata


#home = os.path.expanduser("~/")
#data_dir = os.path.join(home, 'data/datacloud')

#cfg_file_dir = os.path.join(data_dir, 'line_creek/level_0/20180910/Drill_31/100G_Sensor/OminiAntenna/run_1536605717')
#cfg_file = os.path.join(cfg_file_dir, 'config.cfg')

#cfg_file_dir = os.path.join(data_dir, 'azure_dump/data_sdd/data_from_rhino/Teck_LCO/Drill_31/ssx/level_0')
#cfg_file = os.path.join(cfg_file_dir, '20180910_SSX57868.cfg')


#cfg_file = os.path.join('20180910_SSX57868.cfg')
#meta_instance = Metadata(cfg_file)
#mmm = Metadata(cfg_file)

def test_can_read_cfg_file():
    """
    """
    cfg_path = os.path.join('20180910_SSX57868.cfg')
    cfg_instance = ConfigParser.SafeConfigParser()
    cfg_instance.read(cfg_path)
    meta_instance = Metadata(cfg_instance)
    pdb.set_trace()
    print('ok')

def main():
    """
    """
    test_can_read_cfg_file()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
