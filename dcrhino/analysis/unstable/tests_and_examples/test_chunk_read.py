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


def test_read_chunk():
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
    #pdb.set_trace()
    #pass


def main():
    """
    """
    test_read_chunk()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
