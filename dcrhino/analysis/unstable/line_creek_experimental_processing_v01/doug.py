# -*- coding: utf-8 -*-
"""
Created on Fri Sep 28 09:53:55 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import pandas as pd
import time
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS

#home = os.path.expanduser("~/")

home = os.path.expanduser("~/")
data_dir = os.path.join(home, 'data/datacloud/line_creek/pipeline/ssx_5208')
hole_ids = [23531, 23631, 23731, 23831, 23930, 24030, 24130]

flavour = 'extracted_features'; #'hole_mwd'
flavour = 'hole_mwd'
component_label = COMPONENT_LABELS[0]
flavour = 'interpolated_traces'
flavour = 'deconvolved_traces'

for hole_id in hole_ids:
#    hole_id = 23831
    filebase = '793 - MR_77 - {}_{}_{}.npy'.format(hole_id, component_label, flavour)
    fullfile = os.path.join(data_dir, filebase)
    t0 = time.time()
    data = np.load(fullfile)
    peak_x = data[:,280]
    df = pd.DataFrame(data={'peak_x':peak_x})
    df.to_csv('doug.csv', index_label='seconds')
    print(time.time() - t0)
    np.savetxt('doug.txt', peak_x)#, fmt='%.18e', delimiter=' ', newline='\n', header='', footer='', comments='# ', encoding=None)[source]
    plt.plot(peak_x);plt.show()
    freqs = np.fft.fftfreq(len(peak_x), 1.0)
    print(data.shape)
#    plt.plot(np.abs())
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
