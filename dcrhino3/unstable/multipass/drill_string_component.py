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
import matplotlib.pyplot as plt #for debugging
import numpy as np
import os
import pdb

from dcrhino3.models.interval import Interval
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.general_helper_functions import init_logging, add_inverse_dictionary
from dcrhino3.models.metadata import Measurement

logger = init_logging(__name__)

"""
@Natal: why do we need these integers codes? is this a gui thing?
-
"""
DRILL_STRING_COMPONENT_TYPES = {}
DRILL_STRING_COMPONENT_TYPES[1] = 'bit'
DRILL_STRING_COMPONENT_TYPES[2] = 'collar'
DRILL_STRING_COMPONENT_TYPES[3] = 'steel'
DRILL_STRING_COMPONENT_TYPES[4] = 'saver sub'
DRILL_STRING_COMPONENT_TYPES[5] = 'shock sub'
DRILL_STRING_COMPONENT_TYPES[6] = 'other'
DRILL_STRING_COMPONENT_TYPES[7] = 'rotary bit sub'
DRILL_STRING_COMPONENT_TYPES = add_inverse_dictionary(DRILL_STRING_COMPONENT_TYPES)

DRILL_STRING_COMPONENT_INSTALLATIONS = {}
DRILL_STRING_COMPONENT_INSTALLATIONS[-1] = 'not installed'
DRILL_STRING_COMPONENT_INSTALLATIONS[0] = 'variable'
DRILL_STRING_COMPONENT_INSTALLATIONS[1] = 'installed'
DRILL_STRING_COMPONENT_INSTALLATIONS = add_inverse_dictionary(DRILL_STRING_COMPONENT_INSTALLATIONS)

LENGTH_UNITS = {}
LENGTH_UNITS[1] = 'ft'
LENGTH_UNITS[2] = 'in'
LENGTH_UNITS[3] = 'm'
LENGTH_UNITS[4] = 'cm'
LENGTH_UNITS[5] = 'mm'
LENGTH_UNITS = add_inverse_dictionary(LENGTH_UNITS)

NUM_DRILL_STRING_COMPONENTS_SUPPORTED = 10
ORDERED_GUI_STRING_ELEMENTS = ['component_type', 'installation', 'length',
                                'length_units', 'outer_diameter', 'outer_diameter_units']
class DrillStringComponent(object):
    """
    ..:warning: there is possibility for error here as the length_in_meters
    applies a roundoff on each component, the roundoff should happen after summation.
    Initializes from an attributes list, which is a text string that looks like this:
    u'1,1,27.0,4,270.0,5'
    these are in order:
        component_type,
        installation,
        length

    """
    def __init__(self, attributes_list=None, gui_string=None):
        self._component_type = None
        self._installation = None
        self._length = None
        self._length_units = None
        self._outer_diameter = None
        self._outer_diameter_units = None
        self.gui_number = None
        self.gui_string = gui_string
        if attributes_list is not None:
            self.populate_from_attributes_list(attributes_list)

    def populate_from_attributes_list(self, attributes_list):
        """
        """
        if len(attributes_list) != len(ORDERED_GUI_STRING_ELEMENTS):
            error_msg_1 = 'expected {} values in drill string'.format(len(ORDERED_GUI_STRING_ELEMENTS))
            error_msg_2 = 'found {} values in drill string'.format(len(attributes_list))
            logger.error(error_msg_1)
            logger.error(error_msg_2)
            raise Exception
        self._component_type = int(attributes_list[0])
        self._installation = int(attributes_list[1])
        self._length= float(attributes_list[2])
        self._length_units= int(attributes_list[3])
        self._outer_diameter = float(attributes_list[4])
        self._outer_diameter_units = int(attributes_list[5])
        return

    def populate_from_gui_string(self):
        """

        """
        attributes_list = self.gui_string.split(',')
        self.populate_from_attributes_list(attributes_list)


    def as_gui_string(self):
        gui_values = len(ORDERED_GUI_STRING_ELEMENTS) * [None]
        #component_type = self.component_type
        #gui_value = DRILL_STRING_COMPONENT_TYPES[component_type]
        #gui_strings[0] = gui_value
        #installation = self.installation
        #gui_value = DRILL_STRING_COMPONENT_INSTALLATIONS[installation]
        #gui_strings[1] = gui_value
        gui_values[0] = self._component_type
        gui_values[1] = self._installation
        gui_values[2] = self._length
        gui_values[3] = self._length_units
        gui_values[4] = self._outer_diameter
        gui_values[5] = self._outer_diameter_units
        gui_string = ','.join(['{}'.format(x) for x in gui_values])
        return gui_string

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





def test(acorr_filename=None):
    """
    """
    if acorr_filename is None:
        try:
            from dcrhino3.unstable.karl_dev_util import line_creek_acorr_folder
            from dcrhino3.unstable.karl_dev_util import bma_acorr_folder
        except ImportError:
            logger.error("you need to specify the path to an acorr file on your machine")
            raise Exception
        h5_basename = 'OB_DR:R14N:41:GMS:OB:A:T_B218_286780_6332_6332.h5'#OK
        acorr_filename = os.path.join(bma_acorr_folder, h5_basename)

    acorr_trace = TraceData()
    acorr_trace.load_from_h5(acorr_filename)
#    try:
#        mwd_depth_spacing = acorr_trace.first_global_config.mwd_depth_spacing
#    except AttributeError:
#        print("HACK !!! -- ACORR MUST BE REGENERATED")
#        mwd_depth_spacing = 0.2#m
#    tmp1 = drill_stops(acorr_trace.dataframe, minimum_stop_duration=60.0, basically_zero_m=0.0017)
#    tmp2 = drill_stops_2(acorr_trace.dataframe, mwd_depth_spacing)
#    #pdb.set_trace()
#    acorr_trace = update_acorr_with_resonance_info(acorr_trace)



def main():
    """
    """
    gui_string_example = '1,1,27.0,4,270.0,5'
    dsc = DrillStringComponent(gui_string=gui_string_example)
    dsc.populate_from_gui_string()
    gui_string_back = dsc.as_gui_string()
    #pdb.set_trace()
    test()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
