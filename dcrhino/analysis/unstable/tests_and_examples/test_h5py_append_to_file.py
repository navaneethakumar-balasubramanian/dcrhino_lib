# -*- coding: utf-8 -*-
"""
Created on Tue Sep  4 16:23:33 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import h5py
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

h5f = h5py.File('my_filename.h5', 'a')
pdb.set_trace()

N = 10000
x=np.random.rand(N)
my_key = 'my_key2'
if my_key in h5f.keys():
    ds = h5f[my_key]
    ds.resize((h5f[my_key].shape[0] + x.shape[0]), axis = 0)
    ds[-N:] = x
else:
    ds = h5f.create_dataset(my_key, data=x, chunks=True,
                            dtype=np.float32, maxshape=(None,))

    ds[:] = x

h5f.close()




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
