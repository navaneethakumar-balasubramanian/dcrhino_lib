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

"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY

from dcrhino.analysis.util.general_helper_functions import init_logging



logger = init_logging(__name__)


ssx_measurand = MEASURAND_REGISTRY.measurand('slamstix_metadata')
ssx_csv_filename = ssx_measurand.expected_filename()#'/home/kkappler/data/datacloud/west_angelas/level_1/temp_mon.csv'
master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')


MEASURAND_REGISTRY.print_measurand_registry()



def generate_the_big_csv_of_all_blastholes():
    df_ssx = pd.read_csv(ssx_csv_filename, parse_dates=['time_start', 'time_end'])
    mwd_with_mse_measurand = MEASURAND_REGISTRY.measurand('mwd_with_mse')
    pdb.set_trace()
    all_holes_df  = mwd_with_mse_measurand.load()
    list_of_blastholes =   list(set(all_holes_df.hole))
    list_of_blastholes.sort()

    holes = []
    holes_uid = []
    time_starts = []
    time_ends =[]
    drill_rig_ids = []
    dummy_digitizer_ids = []
    orientations = []
    sensor_distance_to_source_list = []
    sampling_rates = []
    areas = []
    for hole in list_of_blastholes:
#        print(hole)
#        pdb.set_trace()
#        if hole==83:
#            pdb.set_trace()
        sub_df = all_holes_df[all_holes_df['hole']==hole]
        start_datetime = sub_df.time_start.min()
        end_datetime = sub_df.time_start.max()
        area = sub_df['area'].iloc[0]
        machine_id = sub_df['machine_id'].iloc[0].strip()
        #ssx_row = df_ssx[(df_ssx.time_start<start_datetime) & (df_ssx.time_end > end_datetime)]
        ssx_rows = df_ssx[(df_ssx.time_start<start_datetime) & (df_ssx.time_end > end_datetime)]
        ssx_rows = ssx_rows[df_ssx['drill_rig_id']== machine_id]
        for i_ssx_row in range(len(ssx_rows)):
            holes.append(hole)
            holes_uid.append('{}_{}'.format(hole, i_ssx_row))
            time_starts.append(start_datetime)
            time_ends.append(end_datetime)
            drill_rig_ids.append(machine_id)
            dummy_digitizer_ids.append(ssx_rows.dummy_digitizer_id.iloc[i_ssx_row])
            orientations.append(ssx_rows.orientation.iloc[i_ssx_row])
            sensor_distance_to_source_list.append(ssx_rows.sensor_distance_to_source.iloc[i_ssx_row].astype(np.float32))
            sampling_rates.append(ssx_rows.sampling_rate.iloc[i_ssx_row])
            areas.append(area)

    df_dict = {'hole':holes, 'hole_uid':holes_uid,'time_start':time_starts, 'time_end':time_ends,
               'drill_rig_id':drill_rig_ids, 'dummy_digitizer_id':dummy_digitizer_ids,
               'orientation':orientations,'sensor_distance_to_source':sensor_distance_to_source_list,
               'sampling_rate':sampling_rates, 'area':areas}
    iterator_df = pd.DataFrame(data=df_dict)
    out_filename = master_iterator_measurand.expected_filename()#os.path.join(l1path, 'master_iterator.csv')
    iterator_df.to_csv(out_filename)



def main():
    """
    """
    pdb.set_trace()
    generate_the_big_csv_of_all_blastholes()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
