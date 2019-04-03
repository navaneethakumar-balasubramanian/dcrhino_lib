# -*- coding: utf-8 -*-
"""
Created on Wed Feb 13 16:38:47 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb




def get_resonance_period(component_id, sensor_distance_to_bit,
                         distance_sensor_to_shock_sub_bottom, velocity_steel):
    """
    Calculates the two way travel time for a wave travelling at velocity_steel.

    Parameters:
        metadata on drilling apparatus (distances etc.).

    Returns:
        (float): resonance_period
    """
    total_distance = sensor_distance_to_bit + distance_sensor_to_shock_sub_bottom
    resonance_period = 2 * total_distance / velocity_steel
    return resonance_period

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
