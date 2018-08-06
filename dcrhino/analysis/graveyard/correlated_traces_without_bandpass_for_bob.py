# -*- coding: utf-8 -*-
"""
Created on Fri Jun 22 18:18:25 2018

@author: kkappler

generate correlated traces without bandpass filtering for bob basker
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

#pdb.set_trace()
import dcrhino.analysis.measurands.measurand_registry_mont_wright as MEASURAND_REGISTRY
from dcrhino.analysis.measurands.keys.data_key import DigitizerDateDataKey
from dcrhino.analysis.util.general_helper_functions import init_logging
from dcrhino.collection.IDEtoSEGY.trace_header import define_obspy_trace_header
define_obspy_trace_header()
MEASURAND_REGISTRY.print_measurand_registry()

level_1_measurand = MEASURAND_REGISTRY.measurand('level1_sgy_piezo')
decon_measurand_id = 'deconvolved_sgy_100ms_level1_sgy_piezo'
corr_measurand_id = 'correlated_minlag-0.1-maxlag0.1_firls_80-100-300-350_N65_deconvolved_sgy_100ms_level1_sgy_piezo'
#corr_measurand_id = 'correlated_minlag-0.1-maxlag0.1_firls_None_N1_deconvolved_sgy_100ms_level1_sgy_piezo'
decon_measurand = MEASURAND_REGISTRY.measurand(decon_measurand_id)
corr_measurand = MEASURAND_REGISTRY.measurand(corr_measurand_id)
data_date = datetime.date(2018, 5, 29)

dummy_digitizer_ids = []
for full_segy_l1 in level_1_measurand.available_files_to_process(data_date):
    dummy_digitizer_id = os.path.basename(full_segy_l1)[:-4]
    dummy_digitizer_ids.append(dummy_digitizer_id)
    print(os.path.basename(full_segy_l1))
    pdb.set_trace()
for digitizer_id in dummy_digitizer_ids:
    data_key = DigitizerDateDataKey(digitizer_id, data_date)
    print(level_1_measurand.expected_filename(data_key))
    print(decon_measurand.expected_filename(data_key))
    print(corr_measurand.expected_filename(data_key))
    decon_measurand.make(data_key)#data_date, 'SSX50598.sgy')
    corrq = corr_measurand.make(data_key)
    corr_measurand.to_qc_plot(data_key)
    #pdb.set_trace()




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
