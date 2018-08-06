# -*- coding: utf-8 -*-
"""
Created on Tue Jun 26 10:09:42 2018

@author: kkappler

Example of level 1 access
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

#<
import dcrhino.analysis.measurands.measurand_registry_mont_wright as MEASURAND_REGISTRY
from dcrhino.analysis.measurands.keys.data_key import DigitizerDateDataKey

#MEASURAND_REGISTRY.print_measurand_registry()
pdb.set_trace()
level_1_measurand = MEASURAND_REGISTRY.measurand('level1_sgy_piezo')


#example usage:
data_date = datetime.date(2018, 5, 29)
digitizer_id = '20180529_SSX50598_Ch08'
data_key = DigitizerDateDataKey(digitizer_id, data_date)
qq = level_1_measurand.expected_filename(data_key)
print("\n\n\n expected filename = \n\n {} \n\n".format(qq))

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
