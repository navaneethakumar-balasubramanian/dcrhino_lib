# -*- coding: utf-8 -*-
"""
Created on Wed Jun 27 11:33:47 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
#import numpy as np
import os
#import pdb

def ensure_dir(dir_name):
    """
    This from advice on http://stackoverflow.com/questions/273192/
    check-if-a-directory-exists-and-create-it-if-necessary
    There is a better way but not implemented
    until python3.2 so for now use this
    """
    if not os.path.isdir(dir_name):
        os.makedirs(dir_name)
    return

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
