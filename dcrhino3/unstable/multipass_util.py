# -*- coding: utf-8 -*-
"""
Created on Tue May 14 11:05:07 2019

@author: kkappler
1. type
2. status
3. length
4. units of lenght
5. od
6, untis of od

in file menus.cfg you can see the drill string components
but, collar, cc, save
incehes, meters cm

see
https://datacloudintl.atlassian.net/wiki/spaces/RHINO/pages/139526154/Configuration+File+Definition
"""


from __future__ import absolute_import, division, print_function

import datetime
#import numpy as np
import os
import pdb

from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.models.metadata import Measurement

logger = init_logging(__name__)

DRILL_STRING_COMPONENT_TYPES = {}
DRILL_STRING_COMPONENT_TYPES[1] = 'bit'
DRILL_STRING_COMPONENT_TYPES[2] = 'collar'
DRILL_STRING_COMPONENT_TYPES[3] = 'steel'
DRILL_STRING_COMPONENT_TYPES[4] = 'saver sub'
DRILL_STRING_COMPONENT_TYPES[5] = 'shock sub'
DRILL_STRING_COMPONENT_TYPES[6] = 'other'

DRILL_STRING_COMPONENT_INSTALLATIONS = {}
DRILL_STRING_COMPONENT_INSTALLATIONS[-1] = 'not installed'
DRILL_STRING_COMPONENT_INSTALLATIONS[0] = 'variable'
DRILL_STRING_COMPONENT_INSTALLATIONS[1] = 'installed'

LENGTH_UNITS = {}
LENGTH_UNITS[1] = 'ft'
LENGTH_UNITS[2] = 'in'
LENGTH_UNITS[3] = 'm'
LENGTH_UNITS[4] = 'cm'
LENGTH_UNITS[5] = 'mm'

NUM_DRILL_STRING_COMPONENTS_SUPPORTED = 10

class DrillStringComponent(object):
    """
    ..:warning: there is possibility for error here as the length_in_meters
    applies a roundoff on each component, the roundoff should happen after summation.
    """
    def __init__(self, attributes_list=None):
        self._component_type = None
        self._installation = None
        self._length = None
        self._length_units = None
        self._outer_diameter = None
        self._outer_diameter_units = None
        if attributes_list is not None:
            if len(attributes_list) != 6:
                logger.error('expected six values in drill string component attributes, got {}'.format(len(attributes_list)))
                raise Exception
            self._component_type = int(attributes_list[0])
            self._installation = int(attributes_list[1])
            self._length= float(attributes_list[2])
            self._length_units= int(attributes_list[3])
            self._outer_diameter = float(attributes_list[4])
            self._outer_diameter_units = int(attributes_list[5])

    @property
    def component_type(self):
        return DRILL_STRING_COMPONENT_TYPES[self._component_type]
    @property
    def installation(self):
        return DRILL_STRING_COMPONENT_INSTALLATIONS[self._installation]
    @property
    def length_units(self):
        return LENGTH_UNITS[self._length_units]
    @property
    def length_in_meters(self):
        measurement = Measurement((self._length, self._length_units))
        return measurement.value_in_meters()

def get_installed_steels_length(global_config):
    """
    ..:todo: this could be made a method of the global_config class
    loop over all drill string components to check for elements of
    type steel (3) and installed (1) to get the default length
    """
    total_steels_length = 0.0
    for i_drill_string_component in range(1, NUM_DRILL_STRING_COMPONENTS_SUPPORTED+1):
        attribute_label = 'drill_string_component{}'.format(i_drill_string_component)
        attribute = global_config.__getattribute__(attribute_label)
        attributes_list = attribute.split(',')
        dsc = DrillStringComponent(attributes_list=attributes_list)
        if dsc.component_type == 'steel':
            print('found a steel')
            if dsc.installation == 'installed':
                print('found an installed steel {}m'.format(dsc.length_in_meters))
                total_steels_length += dsc.length_in_meters
    return total_steels_length


def get_variable_steels_lengths(global_config):
    variable_steels_lengths = []
    for i_drill_string_component in range(1, NUM_DRILL_STRING_COMPONENTS_SUPPORTED+1):
        attribute_label = 'drill_string_component{}'.format(i_drill_string_component)
        attribute = global_config.__getattribute__(attribute_label)
        attributes_list = attribute.split(',')
        dsc = DrillStringComponent(attributes_list=attributes_list)
        if dsc.component_type == 'steel':
            print('found a steel')
            if dsc.installation == 'variable':
                print('found a variable steel {}m'.format(dsc.length_in_meters))
                variable_steels_lengths.append(dsc.length_in_meters)
    #<HACK FOR LINE CREEK>
    logger.critical("HACK ALERT!!! If you are seeing this message it means\
                    this is NOT production code")
    print("HACK LINE CREEK CREEK CREEK")
    variable_steels_lengths = [15.24, 15.24]
    #</HACK FOR LINE CREEK>
    return variable_steels_lengths


def update_acorr_with_resonance_info(acorr_trace, transition_depth_offset_m=-1.0):
    """
    acorr_trace is of type dcrhino3.models.trace_dataframe.TraceData()

    """
    global_config = acorr_trace.first_global_config
    installed_steels_length = get_installed_steels_length(global_config)
    variable_steels_lengths = get_variable_steels_lengths(global_config)

    df = acorr_trace.dataframe
    df['drill_string_resonant_length'] = installed_steels_length
    transition_depth = installed_steels_length + transition_depth_offset_m
    for i_variable_steel in range(len(variable_steels_lengths)):
        rows_to_update = df['depth'] > transition_depth
        transition_depth += variable_steels_lengths[i_variable_steel]
        df.loc[rows_to_update, 'drill_string_resonant_length'] = transition_depth
    return acorr_trace

def test(acorr_filename=None):
    """
    """
    if acorr_filename is None:
        try:
            from dcrhino3.unstable.karl_dev_util import line_creek_acorr_folder
        except ImportError:
            logger.error("you need to specify the path to an acorr file on your machine")
            raise Exception
        h5_basename = '2380_NS92_82_9409_9409_6172_6172.h5'
        h5_basename = '2380_NS92_82_9518B_9518B_6172_6172.h5'
        h5_basename = '2380_NS92_82_9607T_9607T_6172_6172.h5'
        acorr_filename = os.path.join(line_creek_acorr_folder, h5_basename)

    acorr_trace = TraceData()
    acorr_trace.load_from_h5(acorr_filename)
    acorr_trace = update_acorr_with_resonance_info(acorr_trace)


def main():
    """
    """
    test()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
