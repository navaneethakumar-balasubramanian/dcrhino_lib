# -*- coding: utf-8 -*-
"""
Created on Tue Sep 11 13:59:33 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import numpy as np
import pdb

from dcrhino.analysis.util.chunkwise_array_reading import read_npy_chunk


def test_read_chunk_1d():
    """
    """
    n_obs = int(1e7)
    data = np.random.rand(n_obs)
    np.save('random_data.npy', data)
    start_sample = int(1e6)
    chunk_length = int(1e6)
    chunk = read_npy_chunk('random_data.npy', start_sample, chunk_length)
    difference = data[start_sample:start_sample+chunk_length] - chunk
    print(np.abs(np.sum(difference)))
    print('if the above =0.0 then this works')
    #pdb.set_trace()
    #pass

def test_read_chunk_2d():
    """
    """
    n_obs = int(1e5)
    #data = np.random.rand(n_obs)
    data = np.arange(n_obs)
    #pdb.set_trace()
    n_rows = 1000
    data = np.reshape(data, (n_rows, n_obs/n_rows))

    np.save('random_data_2d.npy', data)
    pdb.set_trace()
    start_sample = int(3)
    chunk_length = int(3)
    chunk = read_npy_chunk('random_data_2d.npy', start_sample, chunk_length)
    difference = data[start_sample:start_sample+chunk_length] - chunk
    print(np.abs(np.sum(difference)))
    #pdb.set_trace()
    #pass

def main():
    """
    """
    #test_read_chunk_1d()
    test_read_chunk_2d()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
