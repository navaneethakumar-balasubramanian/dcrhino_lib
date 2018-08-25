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


from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS# = ['axial', 'tangential', 'radial']

import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.measurands.keys.data_key import DigitizerSamplingRateDateDataKey
from dcrhino.analysis.measurands.keys.data_key import DAQSerialNumberSamplingRateComponentTimeIntervalDataKey
from dcrhino.analysis.signal_processing.trace_header import define_obspy_trace_header
from dcrhino.analysis.util.general_helper_functions import init_logging
from dcrhino.analysis.util.interval import TimeInterval

logger = init_logging(__name__)

define_obspy_trace_header()
MEASURAND_REGISTRY.print_measurand_registry()
ssx_measurand = MEASURAND_REGISTRY.measurand('slamstix_metadata')
ssx_df = ssx_measurand.load()


def get_old_data_key(row):
    """
    """
    data_date_hack = datetime.datetime.strptime(row.dummy_digitizer_id[0:8], '%Y%m%d').date()
    sps = row.sampling_rate
    digitizer_id = row.dummy_digitizer_id
    data_key = DigitizerSamplingRateDateDataKey(digitizer_id, data_date_hack, sps)
    return data_key

def get_new_data_key(row, component):
    """
    digitizer_id,sampling_rate,
                 component, time_interval, **kwargs):
    """
    digitizer_id = int(row.dummy_digitizer_id.split('_')[-2])
    sampling_rate = row.sampling_rate

    #pdb.set_trace()
    time_interval = TimeInterval(lower_bound=row.time_start, upper_bound=row.time_end)
    data_key = DAQSerialNumberSamplingRateComponentTimeIntervalDataKey(digitizer_id,
                                                                       sampling_rate,
                                                                       component,
                                                                       time_interval)
    return data_key


def convert_l1segy_to_l1npy():
    """
    """
    level_1_measurand_id_a = 'level1_sgy_piezo'
    level_1_measurand_id_b = 'level1_npy_piezo'
    level_1_measurand_a = MEASURAND_REGISTRY.measurand(level_1_measurand_id_a)
    level_1_measurand_b = MEASURAND_REGISTRY.measurand(level_1_measurand_id_b)

    n_l1_sgy_files = len(ssx_df)
    for i_row in range(n_l1_sgy_files):
        i_row=3
        row = ssx_df.iloc[i_row]
        old_l1_data_key = get_old_data_key(row)
        #pdb.set_trace()
        print('loading...')
#        xx = /home/kkappler/data/datacloud/west_angelas/level_1
        st = level_1_measurand_a.load(old_l1_data_key)
        #st=1
        for component_label in COMPONENT_LABELS:
            new_l1_data_key = get_new_data_key(row, component_label)
            #pdb.set_trace()
            level_1_measurand_b._make_from_parents(new_l1_data_key, parent_data=st)




        pdb.set_trace()
    sps_list = [2400., 3200.]
    level_1_measurand_id_a = 'level1_sgy_piezo'
    level_1_measurand_id_b = 'level1_npy_piezo'
    level_1_measurand_a = MEASURAND_REGISTRY.measurand(level_1_measurand_id_a)

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
            pdb.set_trace()
            level1_file_list = level_1_measurand_a.available_files_to_process(data_key)
            for full_segy_l1 in level1_file_list:
                npy_l1_data_key = DAQSerialNumberSamplingRateComponentTimeIntervalDataKey()
                dummy_digitizer_id = os.path.basename(full_segy_l1)[:-4]
                dummy_digitizer_ids.append(dummy_digitizer_id)
                #print(os.path.basename(full_segy_l1))
            pdb.set_trace()
            for digitizer_id in dummy_digitizer_ids:

                data_key.digitizer_id = digitizer_id
                print(digitizer_id)
                #data_key = DigitizerDateDataKey(digitizer_id, data_date)
                print(level_1_measurand.expected_filename(data_key))
                #pdb.set_trace()
                decon_filename = decon_measurand.expected_filename(data_key)
                corr_filename = corr_measurand.expected_filename(data_key)
                #decon_measurand.make(data_key)#data_date, 'SSX50598.sgy')
                pdb.set_trace()
                corr_stream = corr_measurand.make(data_key)
                #corr_measurand.to_qc_plot(data_key, upper_num_ms=26, show=True)
#                if isinstance(corr_stream, obspy.core.stream.Stream):
#                    corr_measurand.to_qc_plot(data_key, st=corr_stream)
#                    corr_measurand.to_qc_plot2(data_key, st=corr_stream)
    #
                ef = level3_csv_out_measurand.expected_filename(data_key)
                pdb.set_trace()
                print('about to l3')
                level3_csv_out_measurand.make(data_key)
                #<QC_LOGS#
                #trace_header_df = level3_csv_out_measurand.load(data_key)
                #metadata_df = pd.read_csv(metadata_file, parse_dates=['time_start', 'time_end'])
                #sanity_check_mwd_start_end_matches_rhino(trace_header_df, metadata_df)


                #pdb.set_trace()
                #pass
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
    pdb.set_trace()
    for i_row in range(len(df)):
        i_row=4
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
        level3_csv_out_measurand.make(data_key, force=True)

        #features_df = level3_csv_out_measurand.load(data_key)

    print('ok')

    pdb.set_trace()


def main():
    """
    """
#    process_from_ssx_csv_2_eda()
#    pdb.set_trace()
    convert_l1segy_to_l1npy()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
