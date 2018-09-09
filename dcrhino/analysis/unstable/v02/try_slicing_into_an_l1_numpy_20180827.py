# -*- coding: utf-8 -*-
"""
Created on Thu 23 Aug, 2018.  Dublin, Ireland on the number 747 bus to
Gardiner Street Lower
@author: kkappler

This is an example of another processing flow we could use to create partitioned
numpys in L1 that we can fseek into.

Start by searching for input data.  Today these are L1 SEG-Y files because I
can read them.  Tomorrow these could be L0 IDE piped through resampling, or
streaming data possibly ...

"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb
import time

from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS# = ['axial', 'tangential', 'radial']

import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.util.general_helper_functions import init_logging

from supporting_v02_processing import get_hole_data

logger = init_logging(__name__)


MEASURAND_REGISTRY.print_measurand_registry()
l1_measurand = MEASURAND_REGISTRY.measurand('level1_npy_piezo')
ssx_measurand = MEASURAND_REGISTRY.measurand('slamstix_metadata')
ssx_df = ssx_measurand.load()

master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
df_master = master_iterator_measurand.load()



hole = 11
sub_df = df_master[df_master.hole==hole]
pdb.set_trace()
if len(sub_df) == 0:
    logger.warning("not a valid hole {}".format(hole))
    pdb.set_trace()
    raise(Exception)

if len(sub_df)==1:
    hole_row = sub_df.iloc[0]
    for component in COMPONENT_LABELS:
        data = get_hole_data(hole_row, component, plot=True)
else:
    logger.error('non unique - further specify digitizer, sps, etc')
    print(sub_df)
    t0 = time.time()
    n_rows = len(sub_df)
    for i_row in range(n_rows):
        hole_row = sub_df.iloc[i_row]
        for component in COMPONENT_LABELS:
            data = get_hole_data(hole_row, component, plot=True)
            pdb.set_trace()
            print(time.time()-t0)
    pdb.set_trace()
pdb.set_trace()
#READ IN MAster iterator and find a blsthole that you have downloaded







def main():
    """
    """
#    process_from_ssx_csv_2_eda()
#    pdb.set_trace()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
