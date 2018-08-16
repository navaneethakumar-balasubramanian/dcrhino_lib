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
from string import zfill

from dcrhino.analysis.graphical.unbinned_qc_log_plots_v3_west_angelas import QCLogPlotter
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.measurands.keys.data_key import DigitizerSamplingRateDateDataKey
from dcrhino.analysis.util.general_helper_functions import init_logging
#from dcrhino.collection.IDEtoSEGY.trace_header import define_obspy_trace_header
from dcrhino.analysis.signal_processing.mwd_tools import interpolate_to_assign_depths_to_log_csv
from dcrhino.analysis.signal_processing.mwd_tools import interpolate_arbitrary_mwd_column
from dcrhino.analysis.data_manager.temp_paths import ensure_dir

logger = init_logging(__name__)
#define_obspy_trace_header()

MEASURAND_REGISTRY.print_measurand_registry()

mwd_measurand = MEASURAND_REGISTRY.measurand('mwd_with_mse')
hole_profile_df = mwd_measurand.load()
master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
df_master = master_iterator_measurand.load()

level3_csv_out_measurand_id_hash = 'trace_features_eda_a39021e29a61e'
level3_csv_out_measurand_id = MEASURAND_REGISTRY._hash_dict[level3_csv_out_measurand_id_hash]
level3_csv_out_measurand = MEASURAND_REGISTRY.measurand(level3_csv_out_measurand_id)
#pdb.set_trace()
merged_level_3_path_placeholder = level3_csv_out_measurand.data_level_path()

merged_csv_basename = 'west_angelas_csv_dump_v01_20180815.csv'
warts_and_all_csv_file = os.path.join(merged_level_3_path_placeholder, merged_csv_basename)
#warts_and_all_csv_file = '/home/kkappler/west_angelas_csv_dump_v01_20180815.csv'
output_csv_file = warts_and_all_csv_file


def make_qc_log(row):
    """
    """
    print(row)#pdb.set_trace()
    hole = row['hole']; hole_uid = row['hole_uid']; print(hole, hole_uid)
    print("identify the CSV file to load")
    dummy_digitizer_id = row.dummy_digitizer_id
    spoof_date = datetime.datetime.strptime(dummy_digitizer_id[:8], '%Y%m%d').date()
    #print("WARNING: spoof date indicates a findamental issue with data_date and file labelling")
    data_key = DigitizerSamplingRateDateDataKey(dummy_digitizer_id, spoof_date, row.sampling_rate)

    try:
        df_csv = level3_csv_out_measurand.load(data_key)
    except IOError:
        print("NO CSV {}".format(level3_csv_out_measurand.expected_filename(data_key)))
        return
#    if df_csv is None:
#        return
    starttime_str = '{}'.format(row['time_start'])
    endtime_str = '{}'.format(row['time_end'])

    dff = df_csv[(df_csv['datetime'] >= starttime_str) & (df_csv['datetime'] <= endtime_str)]
    hole_df = hole_profile_df[hole_profile_df['hole']==hole]

    plot_meta = master_iterator_measurand.set_plotting_metadata(row)

    #TODO: modify so that this fucntion returns dataframe with depth column
    depth = interpolate_to_assign_depths_to_log_csv(dff, hole_df, plot_meta=plot_meta)
    #FORCE_ON_BIT (N)
    #pdb.set_trace()
    wob = interpolate_arbitrary_mwd_column(dff, hole_df, plot_meta=plot_meta)
    dff['depth'] = pd.Series(depth, index = dff.index)
    dff['wob'] = pd.Series(wob, index = dff.index)
    #pdb.set_trace()
    dff['x'] = hole_profile_df[' X']
    dff['y'] = hole_profile_df[' Y']
    dff['z'] = hole_profile_df[' Z']
    #unkerfungle the top of hole
    n_obs_top_of_hole = 10
    top_of_hole = dff[:n_obs_top_of_hole].sort_values('depth', axis=0, ascending=True, inplace=False, kind='quicksort', na_position='last')
    frames = [top_of_hole, dff[n_obs_top_of_hole:]]
    dff = pd.concat(frames)

    #spdb.set_trace()
    dff['hole'] = pd.Series(hole, index = dff.index)
    dff['hole_uid'] = pd.Series(hole_uid, index = dff.index)
    qc_log_input = level3_csv_out_measurand.generate_qc_plot_input(df=dff,
                                                                   observer_row=row,
                                                                   plot_meta=plot_meta)
    columz = [x.replace('vertical', 'axial') for x in dff.columns]
    dff.columns = columz
    dff['reflection_coefficient'] = pd.Series(qc_log_input.reflection_coefficient_sample, index = dff.index)
    dff['pseudo_ucs'] = pd.Series(qc_log_input.pseudo_ucs_sample, index = dff.index)
    dff['pseudo_velocity'] = pd.Series(qc_log_input.primary_pseudo_velocity_sample, index = dff.index)
    dff['pseudo_density'] = pd.Series(qc_log_input.primary_pseudo_density_sample, index = dff.index)



    if os.path.isfile(output_csv_file):
        dff.to_csv(output_csv_file, mode='a', header=False)
    else:
        dff.to_csv(output_csv_file)


    #QCLogPlotter(qc_log_input, plot_time=True)#, plot_meta=plot_meta)
    QCLogPlotter(qc_log_input)

    return

def configure_plotting_run():
    """
    """
    pdb.set_trace()
    problem_holes = [121, 170]
    for i_row in range(len(df_master))[:]:
        #c
        #pdb.set_trace()
        row = df_master.iloc[i_row]
        if row.hole in problem_holes:
            continue
        make_qc_log(row)



def main():
    """
    """
    configure_plotting_run()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
