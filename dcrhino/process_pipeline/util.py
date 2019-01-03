# -*- coding: utf-8 -*-
"""
Created on Wed Dec 12 09:11:07 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function

import argparse
import datetime
#import matplotlib.pyplot as plt
import numpy as np
#import os
import pandas as pd
import pdb

def str2bool(v):
    """
    got this solution from
    https://stackoverflow.com/questions/15008758/parsing-boolean-values-with-argparse
    This is used cast argparse values as booleans
    """
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError('Boolean value expected.')


def check_timestamp_continuity(timestamp_array):
    """
    @note 20190103: This method used to determine if there are discontinuities
    in ___?data in h5? during mwd splitting.
    """
    dt_array = np.diff(timestamp_array)
    expected_dt = np.median(dt_array)
    discontinuity_indices = np.where(dt_array > expected_dt)[0]
    splitted_indices = np.split(timestamp_array, discontinuity_indices+1)
    reference_array = np.split(np.arange(len(timestamp_array)), discontinuity_indices+1)
    print("timestamps split into {} contiguous chunks".format(len(splitted_indices)))
    return splitted_indices, reference_array

def get_values_from_index(index_ar, values_ar):
    """
    @TODO: remove print statements from here .. these were only here for debugging
    """
    print('get values from {} to {}'.format(index_ar.min(), index_ar.max()))
    print('values array has shaepe {} '.format(values_ar.shape))
    print('index array has shaepe {} '.format(index_ar.shape))
    print('index array 0,-1 are {}, {}'.format(index_ar[0], index_ar[-1]))
    #pdb.set_trace()
    return values_ar[index_ar.min():index_ar.max()]



def main():
    """
    """

    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
