# -*- coding: utf-8 -*-
"""
Created on Mon Jul  9 11:16:20 2018

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

RHINO_CHANNEL_MAP = {}
COMPONENT_LABELS = ['axial', 'tangential', 'radial']

normal_config = {}
normal_config[0] = COMPONENT_LABELS[0]
normal_config[1] = COMPONENT_LABELS[1]
normal_config[2] = COMPONENT_LABELS[2]
inv_map = {v: k for k, v in normal_config.iteritems()}
normal_config.update(inv_map)

rotate_90_config = {}
rotate_90_config[0] = COMPONENT_LABELS[1]
rotate_90_config[1] = COMPONENT_LABELS[0]
rotate_90_config[2] = COMPONENT_LABELS[2]
inv_map = {v: k for k, v in rotate_90_config.iteritems()}
rotate_90_config.update(inv_map)

RHINO_CHANNEL_MAP['normal'] = normal_config
RHINO_CHANNEL_MAP['rotate_90'] = rotate_90_config


def get_rhino_channel_map_key(drill_string_axis_ch, tangential_axis_ch):
    """
    """
    if drill_string_axis_ch == 1:
        if tangential_axis_ch == 2:
            logger.info("normal channel mapping detected")
            return 'normal'
            #return RHINO_CHANNEL_MAP['normal']
    elif drill_string_axis_ch ==2:
        if tangential_axis_ch == 1:
            logger.info("90 degree rotated channel mapping detected")
            return 'rotate_90'#RHINO_CHANNEL_MAP['rotate_90']

def get_rhino_channel_map(drill_string_axis_ch, tangential_axis_ch):
    """
    """
    if drill_string_axis_ch == 1:
        if tangential_axis_ch == 2:
            logger.info("normal channel mapping detected")
            return RHINO_CHANNEL_MAP['normal']
    elif drill_string_axis_ch ==2:
        if tangential_axis_ch == 1:
            logger.info("90 degree rotated channel mapping detected")
            return RHINO_CHANNEL_MAP['rotate_90']

def orientation_channel_remap(self, tr=None):
    """
    TODO: if no trace is passed, go load one from the segy using iread
    """
    default_map = {}
    default_map[0] = 'axial';default_map['axial'] = 0;
    if tr is None:
        logger.error("Was expecting a trace ... make default behaviour to \
                     load a trace from file ")
    else:
        pass


def main():
    """
    """
    drill_string_axis_ch = 1
    tangential_axis_ch = 2
    ch_map = get_rhino_channel_map(drill_string_axis_ch, tangential_axis_ch)
    print(RHINO_CHANNEL_MAP)
    pdb.set_trace()

    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
