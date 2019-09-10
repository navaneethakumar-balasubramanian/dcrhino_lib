# -*- coding: utf-8 -*-
"""
Created on Mon Sep  9 15:51:39 2019

@author: kkappler

migrated this calibration method from general_helper_functions.
These calibrate methods should eventually be part of Instrument() class.

probably ditto for the battery calculations
"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
import numpy as np
#import os
#import pdb


def calibrate_data(data, sensitivity, accelerometer_max_voltage=3.0,
                   rhino_version=1.0, is_ide_file=False, remove_mean=False):
    output = data

    if is_ide_file:
        return output / sensitivity
    else:
        if rhino_version == 1.0:
            output = (output * 5.0) / 65535 #Covert to Voltage
            output = (accelerometer_max_voltage/2.0) - output #Calculate difference from reference voltage
        elif rhino_version == 1.1:
            #<Convert to Voltage>
            tmp = output
            output = output.astype(np.int32)#need to change the type so that the operation - pow_of_2 works
            pow_of_2 = pow(2, 32)
            volt_per_bit = accelerometer_max_voltage/pow(2.0, 31)
            # output = np.asarray([x - pow_of_2 if x& 0x80000000 == 0x80000000 else x for x in output])
            mask_true_or_false = tmp & 0x80000000 == 0x80000000
            output[mask_true_or_false] = tmp[mask_true_or_false]-pow_of_2
            output = np.round(output/2.0, 0) * volt_per_bit
            #</Convert to Voltage>
        else:
            raise ValueError("Calibration Error: The Rhino Hardware version should be 1.0 or 1.1")
        output = output / (sensitivity/1000.0) #Convert to G's
    if remove_mean:
        output = output - np.mean(output)
    return output


def calculate_battery_percentage(max_voltage, min_voltage, current_voltage):
    value = 100 - (max_voltage - current_voltage) / (max_voltage - min_voltage) * 100
    return round(value, 2)


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
