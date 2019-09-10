# -*- coding: utf-8 -*-
"""
Created on Tue Sep 10 12:06:15 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb


#logger = logging.get_logger(__name__)

def normalize_by_row_maxima(data):
    """
    data: 2D numpy array
    returns: the same 2D array with each row divided by its max value
    so the max value of each row should be 1.0
    method is robust to NaN
    ..: warning: note absolute value is not taken before call to max()
    SO we are actually normalizing by the maxima (one might think we are
    normalizing by max(abs()))
    """
    data = data.T
    #Make nans into zeros, do normalization, then return nans
    nans_locations = np.where(np.isnan(data))
    data[nans_locations] = 0.0
    max_amplitudes = np.max(data, axis=0)
    data = data / max_amplitudes
    data[nans_locations] = np.nan
    data = data.T
    return data



def main():
    """
    """
    x = np.random.randn(20,1000)
    y = normalize_by_row_maxima(x)
    #pdb.set_trace()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
