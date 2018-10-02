# -*- coding: utf-8 -*-
"""
Created on Tue Sep 25 11:14:17 2018

@author: kkappler

This is an example of "binning" the data, or "depth averaging"
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb


home = os.path.expanduser("~/")
data_dir = os.path.join(home, 'data/datacloud/line_creek/pipeline/ssx_5208')
hole_ids = [23531, 23631, 23731, 23831, 23930, 24030, 24130]

flavour = 'extracted_features'; #'hole_mwd'
flavour = 'hole_mwd'
for hole_id in hole_ids:
#    hole_id = 23831
    csv_filebase = '793 - MR_77 - {}_{}.csv'.format(hole_id, flavour)
    fullfile = os.path.join(data_dir, csv_filebase)
    df = pd.read_csv(fullfile)
    pdb.set_trace()
    depth = np.asarray(feature_df.depth)
    dz = np.diff(depth)
    plt.plot(dz);plt.show()
    print(df)
    pdb.set_trace()
    print('')

x = np.load(fullfile)
num_traces = len(x)
num_points_per_trace = len(x[0])

xx = np.full((num_traces, num_points_per_trace), np.nan)
for i_trace in range(num_traces):
    xx[i_trace,:] = x[i_trace]

print(len(x))
print(data_dir)
plt.plot(xx.T);
plt.show()
pdb.set_trace()
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
