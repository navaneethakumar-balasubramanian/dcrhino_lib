# -*- coding: utf-8 -*-
"""
Created on Tue Jul 10 18:10:54 2018

@author: kkappler

Ingredients:
    -The mwd from client with all hole_id values as well as start and end times
    this provides hole_id <--> drill_rig_id <--> {start_time, end_time}
    -Table of SSX starttime, endtime, position-on-drill, drill_id

    Looks like there are two data sources.  Lets start with the SSX
    FLOW:
        Interogate all days to get a complete list of SSX files
        May as well interrogate the corr2, these are the only ones available
        for use.  However, when running on the cloud, maybe best to go to level1
        This way we don't have possible issues with duplication of files created
        under different processing parameters

        Question: can I extract the dataKey from the filename easily?  SHould be
        a typical measurand fcn

TODO: this is the make_from_parents() method of the
ssx_measurand = MEASURAND_REGISTRY.measurand('slamstix_metadata')
set it up as such in L1.


"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

from dcrhino.analysis.instrumentation.rhino import get_rhino_channel_map_key#(drill_string_axis_ch, tangential_axis_ch)
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.measurands.keys.data_key import DigitizerSamplingRateDateDataKey
from dcrhino.analysis.supporting_processing import get_segy_trace_by_index

from dcrhino.analysis.util.general_helper_functions import init_logging

from dcrhino.collection.IDEtoSEGY.trace_header import define_obspy_trace_header

from dcrhino.common.signal_processing.supporting_segy_processing import trace_start_datetime

logger = init_logging(__name__)


ssx_measurand = MEASURAND_REGISTRY.measurand('slamstix_metadata')
ssx_csv_filename = ssx_measurand.expected_filename()#'/home/kkappler/data/datacloud/west_angelas/level_1/temp_mon.csv'
master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
define_obspy_trace_header()


MEASURAND_REGISTRY.print_measurand_registry()
#pdb.set_trace()
corr_measurand_id = 'correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_20ms_deconvolved_sgy_100ms_level1_sgy_piezo'
corr_measurand = MEASURAND_REGISTRY.measurand(corr_measurand_id)

def generate_ssx_sourced_observer_notes():
    print("Remember this takes ages (1-several hours) to run")
    file_list = corr_measurand.available_files_to_process()
    updated_filelist = []
    for qq in file_list:
        if 'hz' in qq:
            if 'hide' not in qq:
                updated_filelist.append(qq)
    file_list = updated_filelist
    n_ssx = len(file_list)

    dummy_digitizer_ids = n_ssx * [None]
    sampling_rate_list = n_ssx * [None]
    start_time_list = n_ssx * [None]
    end_time_list = n_ssx * [None]
    orientation_list = n_ssx * [None]
    sensor_distance_to_source_list = n_ssx * [None]
    drill_rig_ids = n_ssx * [None]

    #make a dictionary ... define columns and rows.
    #file_list = file_list[0:2]
    for i_file, filename in enumerate(file_list):
        print(i_file)
        dummy_digitizer_id = filename[-31:-4]

        sps = filename.split('hz/')[0][-4:]
        sps = np.float32(int(sps))

        date_string = filename.split('/piezo')[0][-10:]
        data_date = datetime.date(int(date_string[0:4]), int(date_string[5:7]), int(date_string[8:10]))
        data_key = DigitizerSamplingRateDateDataKey(dummy_digitizer_id, data_date, sps)

        first_trace = corr_measurand.get_trace(data_key, 0)
        start_time = trace_start_datetime(first_trace)
    #    last_trace = corr_measurand.get_trace(data_key, -1)
    #    last_start_time = trace_start_datetime(last_trace)

        drill_string_axis_ch = first_trace.stats.segy.trace_header.axial_axis
        tangential_axis_ch = first_trace.stats.segy.trace_header.tangential_axis
        orientation_string = get_rhino_channel_map_key(drill_string_axis_ch, tangential_axis_ch)
        sensor_distance_to_source = first_trace.stats.segy.trace_header.sensor_distance_to_source
        sensor_distance_to_source = np.float32(sensor_distance_to_source)


        qq = first_trace.stats.segy.textual_file_header.split('RIG_ID:')[1]
        qq = qq.split()
        drill_rig_id = qq[0]

        last_trace = corr_measurand.get_trace(data_key, -1)
        last_start_time = trace_start_datetime(last_trace)

        dummy_digitizer_ids[i_file] = dummy_digitizer_id
        sampling_rate_list[i_file] = sps
        start_time_list[i_file] = start_time
        end_time_list[i_file] = last_start_time #+ datetime.timedelta(seconds=60)
        orientation_list[i_file] = orientation_string
        sensor_distance_to_source_list[i_file] = sensor_distance_to_source
        drill_rig_ids[i_file] = drill_rig_id

        print('sensor_distance_to_source question for JWR')

    #    #For each SSX you need to extract Digitizer-ID, drillID, data_date, position (normal, 90-deg rot)

    print("cast as pd.Series?  or just save?")
    df_dict = {}
    df_dict['dummy_digitizer_id'] = dummy_digitizer_ids
    df_dict['sampling_rate'] = sampling_rate_list
    df_dict['time_start'] = start_time_list
    df_dict['time_end'] = end_time_list
    df_dict['orientation'] = orientation_list
    #df_dict['n_ensembles'] =
    df_dict['sensor_distance_to_source'] = sensor_distance_to_source_list
    df_dict['drill_rig_id'] = drill_rig_ids



    df = pd.DataFrame(data=df_dict)
    df.to_csv(ssx_csv_filename)



def main():
    """
    """
    pdb.set_trace()
    generate_ssx_sourced_observer_notes()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
