# -*- coding: utf-8 -*-
"""
Created on Wed May 29 16:36:45 2019

@author: kkappler

    @property
    def installed_resonant_length(self):
        #this is the distance from the bottom of the shocksub to the bottom of the bit
        return self.sensor_distance_to_shocksub + self.sensor_distance_to_source

"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from dcrhino3.models.trace_dataframe import TraceData

from dcrhino3.unstable.multipass.drill_string_component import DrillStringComponent
from dcrhino3.unstable.multipass.drill_string_component import DRILL_STRING_COMPONENT_TYPES

NUM_DRILL_STRING_COMPONENTS_SUPPORTED = 10

class DrillRig(object):
    """
    20190529: this is needed to unkerfunk the metadata and gui stuff
    THis class is intended to be initialized with the DIRECT field data info
    N.B. THis can be from client .pdf in the case of some drill string component
    measurements or from manual measurements e.g. in the case of sensor position

    Note this is not strictly speaking a drill-rig, but a drill-rig-rhino combination
    as sensor position is factored in here.  In a later version consider factoring
    DrillRig and DeployedRhinoOnDrillRig as separate entitites.  In the meantime
    we can think of this class as an InstrumentedDrillRig()

    TODO: add drill_rig id ... is it available in the global config?? it shoudl be
    -the installer should klnow hte drill id when installing


    """
    def __init__(self, field_config=None):
        self.id = None
        self.drill_string_components = []
        self.field_config = field_config
        self.installed_steels = []
        self.variable_steels = []
        self.bit = None
        self.collar = []
        self.saver_sub = []
        self.shock_sub = None
        self.rotary_bit_sub = None
        self.sensor_position = None
        if self.field_config is not None:
            self.populate_drill_string_components()

    def populate_drill_string_components(self):
        """
        .. :WARNING: If this gets called multiple times it can augment the lists
        making it seem there are too may components ...try not to call this method
        but rather init with the field config.
        @Natal: should we be checking installed vs not installed on components other
        than steels?
        """
        if self.field_config is None:
            logger.warning("cannot populate drill string compoennts, field config is None")
            return
        field_config =self.field_config
        total_drill_string_length = 0.0
        for i_drill_string_component in range(1, NUM_DRILL_STRING_COMPONENTS_SUPPORTED+1):
            attribute_label = 'drill_string_component{}'.format(i_drill_string_component)
            gui_string = field_config.__getattribute__(attribute_label)
            attributes_list = gui_string.split(',')
            dsc = DrillStringComponent(attributes_list=attributes_list)
            dsc.gui_number = i_drill_string_component
            total_drill_string_length += dsc.length_in_meters
            if dsc.component_type == 'steel':
                if dsc.installation == 'installed':
                    self.installed_steels.append(dsc)
                if dsc.installation == 'variable':
                    self.variable_steels.append(dsc)
            elif dsc.component_type == 'collar':
                self.collar.append(dsc)
            elif dsc.component_type == 'saver_sub':
                self.saver_sub.append(dsc)
            elif dsc.component_type == 'bit':
                self.bit = dsc
            elif dsc.component_type == 'shock_sub':
                self.shock_sub = dsc
            elif dsc.component_type == 'rotary_bit_sub':
                self.rotary_bit_sub = dsc

        #calculate_and_assign_some lengths
        self.sensor_position = field_config.sensor_position
        self.total_drill_string_length = total_drill_string_length
        self.total_installed_length = self.total_drill_string_length - sum(self.variable_steels_lengths)
        return

#    def calculate_and_assign_some lengths(self)
#        self.sensor_position = field_config.sensor_position
#        self.total_drill_string_length = total_drill_string_length
#        self.total_installed_length =
#        print(total_drill_string_length)
#        return


    @property
    def installed_steels_length(self):
        """
        ..:todo: this could be made a method of the global_config class
        loop over all drill string components to check for elements of
        type steel (3) and installed (1) to get the default length
        """
        installed_steels_length = 0.0
        for dsc in self.installed_steels:#
            installed_steels_length += dsc.length_in_meters
        return installed_steels_length

    @property
    def variable_steels_lengths(self):
        variable_steels_lengths = [dsc.length_in_meters for dsc in self.variable_steels]
        return variable_steels_lengths

    def total_drill_string_length(self, variable=False):
        for i_drill_string_component in range(1, NUM_DRILL_STRING_COMPONENTS_SUPPORTED+1):
            return

    @property
    def sensor_distance_to_shocksub(self):
        """
        how do we handle when SS DNE?
        """
        self.sensor_position.value_in_meters() - self.shocksub_length

    @property
    def installed_resonant_length(self):
        """
        this is the distance from the bottom of the shocksub to the bottom of the bit
        from config.py it is calculated as:
        #return self.sensor_distance_to_shocksub + self.sensor_distance_to_source
        But what does that mean when we have no shocksub.  We need clearer descriptions here.
        """
        return self.field_config.installed_resonant_length - sum(self.variable_steels_lengths)

#    #<HACK FOR LINE CREEK>
#    logger.critical("HACK ALERT!!! If you are seeing this message it means\
#                    this is NOT production code")
#    print("HACK LINE CREEK CREEK CREEK")
#    #variable_steels_lengths = [15.24, 15.24]
#    #</HACK FOR LINE CREEK>
#    return variable_steels_lengths



#class DeployedDrill(DrillRig):
#    def __init__(self, field_config):
#        DrillRig.__init__(self, field_config)
#        self.sensor_position = None


def test(acorr_filename=None):
    """
    """
    print('hi')

def main():
    """
    """
    test()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
