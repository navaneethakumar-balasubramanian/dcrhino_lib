# -*- coding: utf-8 -*-
"""
Created on Mon Sep 10 16:02:15 2018

@author: kkappler

[PROCESSING]
deconvolution_filter_duration = 0.1
min_lag_trimmed_trace = -0.1
max_lag_trimmed_trace = 0.1
trapezoidal_bpf_corner_1 = 80.0
trapezoidal_bpf_corner_2 = 100.0
trapezoidal_bpf_corner_3 = 300.0
trapezoidal_bpf_corner_4 = 350.0
trapezoidal_bpf_duration = 0.02


"""

from __future__ import absolute_import, division, print_function

import ConfigParser
import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb


#home = os.path.expanduser("~/")
class L1L2ProcessConfiguration(object):
    """
    @
    """
    def __init__(self, config_filename):
        self.config = ConfigParser.SafeConfigParser()
        self.config.read(config_filename)
#        self.deconvolution_filter_duration = 0.1#None#kwargs.get(deconvolution_filter_duration, 0.1)
#        self.min_lag_trimmed_trace = -0.1
#        self.max_lag_trimmed_trace = 0.1
#        self.trapezoidal_bpf_corner_1 = 80.0
#        self.trapezoidal_bpf_corner_2 = 100.0
#        self.trapezoidal_bpf_corner_3 = 300.0
#        self.trapezoidal_bpf_corner_4 = 350.0
#        self.trapezoidal_bpf_duration = 0.02
#        config =

    @property
    def deconvolution_filter_duration(self):
        return self.config.getfloat('PROCESSING', 'deconvolution_filter_duration')
    @property
    def min_lag_trimmed_trace(self):
        return self.config.getfloat('PROCESSING', 'min_lag_trimmed_trace')
    @property
    def max_lag_trimmed_trace(self):
        return self.config.getfloat('PROCESSING', 'max_lag_trimmed_trace')
    @property
    def bandpass_corner_1(self):
        return self.config.getfloat('PROCESSING', 'trapezoidal_bpf_corner_1')
    @property
    def bandpass_corner_2(self):
        return self.config.getfloat('PROCESSING', 'trapezoidal_bpf_corner_2')
    @property
    def bandpass_corner_3(self):
        return self.config.getfloat('PROCESSING', 'trapezoidal_bpf_corner_3')
    @property
    def bandpass_corner_4(self):
        return self.config.getfloat('PROCESSING', 'trapezoidal_bpf_corner_4')
    @property
    def bandpass_filter_duration(self):
        return self.config.getfloat('PROCESSING', 'trapezoidal_bpf_duration')
    @property
    def bandpass_corners(self):
        return [self.bandpass_corner_1, self.bandpass_corner_2, self.bandpass_corner_3, self.bandpass_corner_4]


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
