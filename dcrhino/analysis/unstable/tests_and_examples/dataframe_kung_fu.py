# -*- coding: utf-8 -*-
"""
Created on Thu Jan  3 14:45:25 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

import qfutils.log as logging
import qf.measurand.measurand_registry as MEASURAND_REGISTRY

from qf.unstable.karl.util.supporting_station import PyStation as get_station

logger = logging.get_logger(__name__)
#home = os.path.expanduser("~/")


def rename_columns_in_dataframe():
    """
    @note 20190103
    took this block of commented code out of process_h5_iterator_using_mwd
    It looks like handy syntax to keep around
    """
    pass
    #<RENAMING COLUMNS IN A DATAFRAME EXAMPLE>
#        columns_rename = {  "mse":"mwd_mse",
#                            "axial_multiple_peak_sample": "axial_multiple_peak_amplitude",
#                            "axial_multiple_peak_time_sample": "axial_multiple_peak_time",
#                            "axial_primary_peak_sample":"axial_primary_peak_amplitude",
#                            "axial_primary_peak_time_sample":"axial_primary_peak_time",
#                            "radial_primary_peak_sample":"radial_primary_peak_amplitude_sample",
#                            "tangential_primary_peak_sample":"tangential_primary_peak_amplitude",
#                            "pseudo_ucs":"c_str",
#                            "pseudo_velocity":"a_vel",
#                            "pseudo_density":"a_dens",
#                            "reflection_coefficient":"a_reflection-coefficient",
#                            "axial_delay":"a_delay",
#                            "tangential_amplitude_ratio":"t_reflection_coef",
#                            "tangential_delay":"t_delay",
#                            "tangential_impedance":"t_mod",
#                            "shear_velocity":"t_vel"}


#        hole_features_extracted = hole_features_extracted.rename(index=str, columns=columns_rename)

#</RENAMING COLUMNS IN A DATAFRAME EXAMPLE>
    pass

def main():
    """
    """
    rename_columns_in_dataframe()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
