# -*- coding: utf-8 -*-
"""
Created on Wed Jul 18 18:06:36 2018
Metadata Header definition for Rhino Unit File structure
Author: Natal
"""
from __future__ import absolute_import, division, print_function

import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.helpers.general_helper_functions import add_inverse_dictionary


#..:todo: we should review the units stuff and start using pint or similar package

LENGTH_UNITS = {}
LENGTH_UNITS[1] = 'ft'
LENGTH_UNITS[2] = 'in'
LENGTH_UNITS[3] = 'm'
LENGTH_UNITS[4] = 'cm'
LENGTH_UNITS[5] = 'mm'
LENGTH_UNITS = add_inverse_dictionary(LENGTH_UNITS)

LENGTH_SCALE_FACTORS = {}
LENGTH_SCALE_FACTORS['ft'] = 0.3048
LENGTH_SCALE_FACTORS['in'] = 0.0254
LENGTH_SCALE_FACTORS['m'] = 1.0
LENGTH_SCALE_FACTORS['cm'] = 0.010
LENGTH_SCALE_FACTORS['mm'] = 0.001
#</this should be somewhere more general>

logger = init_logging(__name__)
#==============================================================================
#FUNCTIONS
#==============================================================================

class LengthMeasurement():
    """
    """
    def __init__(self, tuple):
        (value, units) = tuple
        self._value = float(value)
        self._units = int(units)

    def __str__(self):
        return "{},{}".format(self._value, self._units)

    def to_dict(self):
        d = {"value": self._value,
             "units": self._units}
        return d

    def value_in_meters(self):
        """
        See :func:`metadata.convert_to_meters`

        TJW: This returns the rounded value (to 2 dec places) for GUI purposes

        """
        return round(self.convert_to_meters(),2)

    def convert_to_meters(self):
        """
        Parameters:
            value (float): value to be converted
            units (int): current units of value represented by an integer
            see mappings: LENGTH_SCALE_FACTORS, LENGTH_UNITS
                + 1 for feet
                + 2 for inches
                + 3 for Meters
                + 4 for centimeters
                + 5 for millimeters
        Returns:
            (float): converted value
        """
        units_string = LENGTH_UNITS[self._units]
        scale_factor = LENGTH_SCALE_FACTORS[units_string]
        length_in_meters = self._value * scale_factor
        return length_in_meters



def calculate_shock_sub_tail_length(field_config, default_tail_length=0.25):
    """
    kindof a hack ... shock sub tail length should be kept with shock_sub,
    :param field_config:
    :return:
    """
    try:
        shock_sub_tail_info = field_config.shocksub_tail_length
        tmp = LengthMeasurement((shock_sub_tail_info['value'], shock_sub_tail_info['units']))
        length_in_meters = tmp.convert_to_meters()
        return length_in_meters

    except AttributeError:
        logger.warning('Legacy config detected')
        logger.warning('Setting Shock Sub Tail Length to {}m'.format(default_tail_length))
        return default_tail_length

