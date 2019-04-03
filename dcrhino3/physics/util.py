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

#def get_expected_multiple_times(global_config, recipe='J1'):
#    """
#    Calculates the time_intervals between resonances along the pipe for each of P and S
#    waves, axial and tangential components.
#
#    Parameters:
#        global_config (Dataframe): metadata on drilling apparatus (distances etc.)
#
#    Other Parameters:
#        recipe (str): set to 'J1' to use j1 extractor
#
#    Returns:
#        (dict): expected multiple periods (only first and second) and their locations
#    """
#    sensor_distance_to_bit = global_config.sensor_distance_to_source
#    distance_sensor_to_shock_sub_bottom = global_config.sensor_distance_to_shocksub
#    axial_velocity_steel = global_config.ACOUSTIC_VELOCITY
#    shear_velocity_steel = global_config.SHEAR_VELOCITY
#    if recipe=='J1':
#        expected_multiple_periods = get_expected_multiple_periods(sensor_distance_to_bit,
#                                  distance_sensor_to_shock_sub_bottom,
#                                  axial_velocity_steel, shear_velocity_steel)
#    return expected_multiple_periods
#
#
#def get_expected_multiple_periods(sensor_distance_to_bit,
#                                  distance_sensor_to_shock_sub_bottom,
#                                  axial_velocity_steel, shear_velocity_steel):
#    """
#    Calculates the time_intervals between resonances along the pipe for each of P and S
#    waves, axial and tangential components.
#
#    Parameters:
#        global_config (Dataframe): metadata on drilling apparatus (distances etc.)
#
#    Other Parameters:
#        recipe (str): set to 'J1' to use j1 extractor
#
#    Returns:
#        (dict): expected multiple periods (only first and second) and their locations
#    """
#    expected_multiple_periods = {}
#    total_distance = sensor_distance_to_bit + distance_sensor_to_shock_sub_bottom
#    expected_multiple_periods['axial-multiple_1'] = 2 * total_distance / axial_velocity_steel
#    expected_multiple_periods['tangential-multiple_1'] = 2 * total_distance / shear_velocity_steel
#    expected_multiple_periods['axial-multiple_2'] = 4 * total_distance / axial_velocity_steel
#    expected_multiple_periods['tangential-multiple_2'] = 4 * total_distance / shear_velocity_steel
#    return expected_multiple_periods



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
