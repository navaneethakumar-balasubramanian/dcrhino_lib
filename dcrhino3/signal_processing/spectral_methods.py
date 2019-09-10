# -*- coding: utf-8 -*-
"""
Created on Mon Sep  9 15:57:30 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
import numpy as np
#import os
#import pdb



def fft_data(data_array, sampling_rate):
    """
    this function moved from general_helper_functions
    """
    # pdb.set_trace()
    sp = np.fft.fft(data_array-np.mean(data_array))
    N = len(data_array)
    Fs = sampling_rate
    T = 1.0 / Fs
    freq = np.linspace(0.0, 1.0 / (2.0 * T), N / 2)
    return {"content": np.abs(sp.real[0:np.int(N / 2)]),
            "frequency": freq,
            "calibrated": data_array}


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
