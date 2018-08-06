# -*- coding: utf-8 -*-
"""
Created on Thu Jun 21 07:39:36 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

home = os.path.expanduser("~/")

from dcrhino.aggregation.well_log_plots_k import WellLogPlots

wlp = WellLogPlots(filepath='/home/kkappler/Documents/datacloud/mont_wright/109886_with_depths_fixed_x2.csv')
pdb.set_trace()
wlp.plot()
print('pl')
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
