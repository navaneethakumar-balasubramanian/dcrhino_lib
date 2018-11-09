# -*- coding: utf-8 -*-
"""
Created on Thu Nov  8 16:00:18 2018

@author: kkappler

in the directory containing this script copy data or symlink a file, for example:
ln -s  ~/data/datacloud/rhino_process_pipeline_output/line_creek/5208/3200/793-MR_77-23531/axial_filtered_correlated_traces.npy axial_filtered_correlated_traces.npy
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import pdb

from fatiando.vis.mpl import seismic_wiggle

data = np.load('axial_filtered_correlated_traces.npy')
trimmed_data = data[0::7, 1760-320:1760+320]
sampling_rate = 3200.0
seismic_wiggle(trimmed_data.T);
plt.show()


def my_function():
    """
    """
    data = np.load('axial_filtered_correlated_traces.npy')
    trimmed_data = data[0::7, 1760-320:1760+320]
    sampling_rate = 3200.0
    seismic_wiggle(trimmed_data.T, dt=1./sampling_rate);
    plt.show()

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
