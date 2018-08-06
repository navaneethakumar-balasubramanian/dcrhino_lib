# -*- coding: utf-8 -*-
"""
Created on Fri Jun 15 13:34:58 2018

@author: kkappler

TODO: Make this a class

TODO: The data levels should be defined by a config file rather than coded in.
config manager model implemented by DS probably the right way to go about that.
for now
"""



from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from dcrhino.constants import DATA_PATH

def get_project_data_path(project_name):
    return os.path.join(DATA_PATH, project_name)

def get_data_level_paths_dict(project_name):
    """
    data_levels[i] = os.path.join(project_data_path, 'level_i')
    """
    project_data_path = get_project_data_path(project_name)

    data_levels = {}
    for i_level in range(4):
        data_levels[i_level] = os.path.join(project_data_path, 'level_{}'.format(i_level))
    return data_levels


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
