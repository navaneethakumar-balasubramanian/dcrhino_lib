# -*- coding: utf-8 -*-
"""
Created on Mon Feb  4 21:28:04 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)

class SymmetricTrace(object):
    def __init__(self, data, sampling_rate, **kwargs):
        #BaseTraceModule.__init__(self, json, output_path)
        #self.id = "lead_channel_deconvolution"
        self.data = data#kwargs.get('data', None)
        self.sampling_rate = sampling_rate#kwargs.get('sampling_rate', None)
        self.component_id = kwargs.get('component_id', None)
        if (self.data is not None) & (self.sampling_rate is not None):
            self.calculate_time_vector()
        else:
            self._time_vector = None

    @property
    def dt(self):
        return 1. / self.sampling_rate

    @property
    def num_observations(self):
        return len(self.data)

    @property
    def t0_index(self):
        return (self.num_observations - 1) // 2

    def calculate_time_vector(self):
        time_vector = self.dt * (np.arange(self.num_observations) - self.t0_index)
        self._time_vector = time_vector
        return

    @property
    def time_vector(self):
        return self._time_vector
        time_vector = self.dt * (np.arange(self.num_observations) - self.t0_index)
        self.time_vector = time_vector
        return


def my_function():
    """
    """
    x = np.arange(11)
    st = SymmetricTrace(data=x, sampling_rate=10.0)
    st._get_time_vector()
    pdb.set_trace()
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
