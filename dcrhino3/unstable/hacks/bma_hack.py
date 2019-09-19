# -*- coding: utf-8 -*-
"""
Created on Thu Jun  6 13:15:52 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from dcrhino3.models.drill.drill_rig import DrillRig

def bma_hack_20190606(first_global_config):
    """
    This make will make sure that there are always at least three variable steels in the field config.
    """
    drill_rig = DrillRig(field_config=first_global_config)
    if len(drill_rig.variable_steels) >= 3:
        #we have enough
        return first_global_config
    num_installed_steels = len(drill_rig.installed_steels)
    print("number of installed steels = {}".format(num_installed_steels))
    if num_installed_steels == 4:
        for i_installed_steel in range(1,num_installed_steels):
            print(i_installed_steel)
            steel = drill_rig.installed_steels[i_installed_steel]
            gui_number = steel.gui_number
            steel._installation = 0
            gui_string = steel.as_gui_string()
            attr_key = 'drill_string_component{}'.format(gui_number)
            first_global_config.__setattr__(attr_key, gui_string)
        return first_global_config
    # print('ok')
    # fixed_drill = DrillRig(field_config=first_global_config)
    # first_global_config.drill_string_component4 = '3,0,12802.0,5,219.0,5'
    # first_global_config.drill_string_component5 = '3,0,12802.0,5,219.0,5'
    # first_global_config.drill_string_component6 = '3,0,12802.0,5,219.0,5'
    # first_global_config.drill_string_component7 = '3,0,12802.0,5,219.0,5'
    #return first_global_config

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
