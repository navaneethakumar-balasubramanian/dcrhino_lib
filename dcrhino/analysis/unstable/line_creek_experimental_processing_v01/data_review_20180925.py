# -*- coding: utf-8 -*-
"""
Created on Tue Sep 25 11:14:17 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb


home = os.path.expanduser("~/")
data_dir = os.path.join(home, 'data/datacloud/line_creek/pipeline/ssx_5208')
file_base = '793 - MR_77 - 24030_axial_deconvolved_traces.npy'
file_base = '793 - MR_77 - 23531_axial_deconvolved_traces.npy'
fullfile = os.path.join(data_dir, file_base)
x = np.load(fullfile)
pdb.set_trace()
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
