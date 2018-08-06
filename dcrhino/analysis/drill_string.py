# -*- coding: utf-8 -*-
"""
Created on Sat Jun 30 16:15:40 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb


from dcrhino.analysis.util.general_helper_functions import init_logging
logger = init_logging(__name__)

class DrillString(object):
    def __init__(self):
        self.outer_diameter = None
        self.inner_diameter = None
        self.bit_diameter = None

    @property
    def cross_sectional_area(self):
        outer_area = (np.pi/2.)*self.outer_diameter**2
        inner_area = (np.pi/2.)*self.inner_diameter**2
        total_area = outer_area - inner_area
        return total_area
    @property
    def bit_radius(self):
        return self.bit_diameter/2.0

def get_drill_string(client_id, drill_id, time_interval):
    """
    """
    drill_string = DrillString()
    drill_string.outer_diameter = 0.27
    drill_string.inner_diameter = 0.21
    drill_string.bit_diameter = 34.5
    logger.warning("These units do not appear consistent")
    return drill_string



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
