# -*- coding: utf-8 -*-
"""
Created on Fri Jun 15 19:30:21 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from dcrhino.analysis.measurands.uniformly_sampled_measurand import UniformlySampledMeasurand
class IdeFileMeasurand(UniformlySampledMeasurand):
    """
    level 0 but not direct ... its parents are direct measurands
    """
    def __init__(self, **kwargs):
        super(IdeFileMeasurand, self).__init__(**kwargs)
        self.data_level = 0
        self.label = 'IdeFileMeasurand'
        #self.digitizer_id = kwargs.get('digitizer_id', None)




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
