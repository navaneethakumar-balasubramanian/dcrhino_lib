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
import pandas as pd
import pdb

import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.measurands.keys.data_key import DigitizerSamplingRateDateDataKey
from dcrhino.analysis.signal_processing.trace_header import define_obspy_trace_header
from dcrhino.analysis.util.general_helper_functions import init_logging

#from dcrhino.analysis.unstable.sanity_checks import sanity_check_mwd_start_end_matches_rhino#(trace_header_df, metadata_df):

logger = init_logging(__name__)

#metadata_file = os.path.join(DATA_PATH, MEASURAND_REGISTRY.PROJECT_ID, 'merged_observer_notes.csv')
define_obspy_trace_header()
MEASURAND_REGISTRY.print_measurand_registry()




def configure_processing_run():
    """
    """
    sps_list = [2400., 3200.]
    level_1_measurand_id = 'level1_sgy_piezo'
    decon_measurand_id = 'deconvolved_sgy_100ms_level1_sgy_piezo'
    #corr_measurand_id = 'correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_20ms_deconvolved_sgy_100ms_level1_sgy_piezo'
    corr_measurand_id = 'correlated2_minlag-0.1-maxlag0.1_firls_75-100-230-280_20ms_deconvolved_sgy_100ms_level1_sgy_piezo'

    level_1_measurand = MEASURAND_REGISTRY.measurand(level_1_measurand_id)
    decon_measurand = MEASURAND_REGISTRY.measurand(decon_measurand_id)
    corr_measurand = MEASURAND_REGISTRY.measurand(corr_measurand_id)

    #level3_csv_out_measurand_id_hash = 'trace_features_eda_a39021e29a61e'
    level3_csv_out_measurand_id_hash = 'trace_features_eda_37e21fa225dc7'
    level3_csv_out_measurand_id = MEASURAND_REGISTRY._hash_dict[level3_csv_out_measurand_id_hash]
    level3_csv_out_measurand = MEASURAND_REGISTRY.measurand(level3_csv_out_measurand_id)

    start_date = datetime.date(2018, 7, 6)
    end_date = datetime.date(2018, 7, 10)
    date_range = pd.date_range(start=start_date, end=end_date)

    #<Execute Processing>
    for data_datetime in date_range:
        data_date = data_datetime.date()
        for sps in sps_list:
            data_key = DigitizerSamplingRateDateDataKey(None, data_date, sps)
            print("data_date = {}".format(data_date))
            dummy_digitizer_ids = []

            level1_file_list = level_1_measurand.available_files_to_process(data_key)
            for full_segy_l1 in level1_file_list:
                dummy_digitizer_id = os.path.basename(full_segy_l1)[:-4]
                dummy_digitizer_ids.append(dummy_digitizer_id)
                #print(os.path.basename(full_segy_l1))
            #pdb.set_trace()
            for digitizer_id in dummy_digitizer_ids:
                data_key.digitizer_id = digitizer_id
                print(digitizer_id)
                print(level_1_measurand.expected_filename(data_key))
                decon_measurand.make(data_key)#data_date, 'SSX50598.sgy')
                corr_stream = corr_measurand.make(data_key)
                #corr_measurand.to_qc_plot(data_key, upper_num_ms=26, show=True)
                if isinstance(corr_stream, obspy.core.stream.Stream):
                    corr_measurand.to_qc_plot(data_key, st=corr_stream)
    #
#                ef = level3_csv_out_measurand.expected_filename(data_key)
#                pdb.set_trace()
                print('about to l3')
                level3_csv_out_measurand.make(data_key)

    #<Execute Processing>

dummy_digitizer_ids_with_density_logs = ['20180707_SSX15883_5206_Ch08',
                                         '20180709_SSX34512_5451_Ch08',
                                         '20180709_SSX64802_5452_Ch08',
                                         '20180710_SSX34747_5451_Ch08',]
def process_from_ssx_csv_2_eda():
    """
    """
    ssx_measurand = MEASURAND_REGISTRY.measurand('slamstix_metadata')
    #pdb.set_trace()
    level3_csv_out_measurand_id_hash = 'trace_features_eda_a39021e29a61e'
    level3_csv_out_measurand_id = MEASURAND_REGISTRY._hash_dict[level3_csv_out_measurand_id_hash]
    level3_csv_out_measurand = MEASURAND_REGISTRY.measurand(level3_csv_out_measurand_id)

    #corr_measurand_id = 'correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_20ms_deconvolved_sgy_100ms_level1_sgy_piezo'
    #corr_measurand = MEASURAND_REGISTRY.measurand(corr_measurand_id)
    df = ssx_measurand.load()

    for i_row in range(len(df)):
        row = df.iloc[i_row]

        data_date_hack = datetime.datetime.strptime(row.dummy_digitizer_id[0:8], '%Y%m%d').date()
        data_key = DigitizerSamplingRateDateDataKey(row.dummy_digitizer_id, data_date_hack, row.sampling_rate)
#        st = corr_measurand.load(data_key)

        #corr_measurand.to_qc_plot(data_key, upper_num_ms=26, show=True)
        print('about to l3 {} {} {}'.format(data_key.digitizer_id, data_key.data_date, data_key.sampling_rate))
#        pdb.set_trace()
#        if data_key.digitizer_id in dummy_digitizer_ids_with_density_logs:
#            print('okwws')
#            #pdb.set_trace()
        #level3_csv_out_measurand._split_to_npy(data_key)
        #try:
        level3_csv_out_measurand.make(data_key)

        #features_df = level3_csv_out_measurand.load(data_key)

    print('ok')

    pdb.set_trace()


def main():
    """
    """
    #process_from_ssx_csv_2_eda()
    #pdb.set_trace()
    configure_processing_run()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
