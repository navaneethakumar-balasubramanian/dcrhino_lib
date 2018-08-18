# -*- coding: utf-8 -*-
"""
Created on Fri Jun 22 18:18:25 2018

@author: kkappler

generate unfilterd correlated traces.
-Note need to add support to make split_corr an actual measurand.  One that
can be used to generate features.  Going to need a diagram for this as well.
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

import obspy
#pdb.set_trace()
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY

from dcrhino.analysis.measurands.keys.data_key import DigitizerSamplingRateDateDataKey
from dcrhino.analysis.util.general_helper_functions import init_logging
from dcrhino.analysis.signal_processing.trace_header import define_obspy_trace_header

logger = init_logging(__name__)


define_obspy_trace_header()
MEASURAND_REGISTRY.print_measurand_registry()
pdb.set_trace()



def configure_processing_run():
    """
    """
    sps_list = [2400., 3200.]
    level_1_measurand_id = 'level1_sgy_piezo'
    decon_measurand_id = 'deconvolved_sgy_100ms_level1_sgy_piezo'
    corr_measurand_id = 'correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_20ms_deconvolved_sgy_100ms_level1_sgy_piezo'
    corr_measurand_id = 'correlated2_minlag-0.1-maxlag0.1_firls_None__deconvolved_sgy_100ms_level1_sgy_piezo'

    level_1_measurand = MEASURAND_REGISTRY.measurand(level_1_measurand_id)
    decon_measurand = MEASURAND_REGISTRY.measurand(decon_measurand_id)
    corr_measurand = MEASURAND_REGISTRY.measurand(corr_measurand_id)

    level3_csv_out_measurand_id_hash = 'trace_features_eda_a39021e29a61e'
    level3_csv_out_measurand_id = MEASURAND_REGISTRY._hash_dict[level3_csv_out_measurand_id_hash]
    level3_csv_out_measurand = MEASURAND_REGISTRY.measurand(level3_csv_out_measurand_id)


    start_date = datetime.date(2018, 7, 6)
    end_date = datetime.date(2018, 7, 12)
    date_range = pd.date_range(start=start_date, end=end_date)

    #<Execute Processing>
    for data_datetime in date_range:
        data_date = data_datetime.date()
        for sps in sps_list:
            data_key = DigitizerSamplingRateDateDataKey(None, data_date, sps)
            print("data_date = {}".format(data_date))
            dummy_digitizer_ids = []
            #pdb.set_trace()
            level1_file_list = level_1_measurand.available_files_to_process(data_key)
            for full_segy_l1 in level1_file_list:
                dummy_digitizer_id = os.path.basename(full_segy_l1)[:-4]
                dummy_digitizer_ids.append(dummy_digitizer_id)
                print(os.path.basename(full_segy_l1))
            #pdb.set_trace()
            for digitizer_id in dummy_digitizer_ids:
                data_key.digitizer_id = digitizer_id
                print(digitizer_id)
                #data_key = DigitizerDateDataKey(digitizer_id, data_date)
                print(level_1_measurand.expected_filename(data_key))
                #pdb.set_trace()
                decon_measurand.make(data_key)

                #corr_stream = corr_measurand.make(data_key)
                corr_stream = corr_measurand._make_from_parents(data_key)
                corr_measurand._make_from_parents(data_key)
                corr_measurand._split_to_npy(data_key)
                #corr_measurand.to_qc_plot(data_key, upper_num_ms=26, show=False)
#                if isinstance(corr_stream, obspy.core.stream.Stream):
#                    corr_measurand.to_qc_plot(data_key, st=corr_stream)
#                    corr_measurand.to_qc_plot2(data_key, st=corr_stream)
    #
#                ef = level3_csv_out_measurand.expected_filename(data_key)
#                #pdb.set_trace()
#                level3_csv_out_measurand.make(data_key)
                #<QC_LOGS#
                #trace_header_df = level3_csv_out_measurand.load(data_key)
                #metadata_df = pd.read_csv(metadata_file, parse_dates=['time_start', 'time_end'])
                #sanity_check_mwd_start_end_matches_rhino(trace_header_df, metadata_df)


                #pdb.set_trace()
                #pass
    #<Execute Processing>


def main():
    """
    """
    configure_processing_run()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
