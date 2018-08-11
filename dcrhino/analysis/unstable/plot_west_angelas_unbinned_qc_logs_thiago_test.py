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
import dcrhino.analysis.measurands.measurand_registry_plot_test as MEASURAND_REGISTRY
from dcrhino.analysis.math.mwd_tools import interpolate_to_assign_depths_to_log_csv
from dcrhino.analysis.data_manager.temp_paths import ensure_dir

from dcrhino.helper import sql_to_panda
from infi.clickhouse_orm.database import Database

from dcrhino.analysis.graphical.unbinned_qc_log_plots_v3_west_angelas import QCLogPlotInput

HOME = os.path.expanduser('~/')

MEASURAND_REGISTRY.print_measurand_registry()

mwd_measurand = MEASURAND_REGISTRY.measurand('mwd_with_mse')
hole_profile_df = mwd_measurand.load()
master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
df_master = master_iterator_measurand.load()

def make_qc_log(row):
    """
    """
    print(row)
    hole = row['hole']
    hole_uid = row['hole_uid']
    print("identify the CSV file to load")
    print(hole, hole_uid)
    db = Database('rhino_test')
    dff = sql_to_panda(db,'select * from rhino_test.feature_extracted')# limit 2')
    dff['datetime'] = dff['date']

    mwd_hole_df = hole_profile_df[hole_profile_df['hole']==hole]

    plot_meta = {}
    temppath = os.path.join(HOME, 'data/datacloud/west_angelas')
    plot_meta['path'] = temppath#os.path.join(level3_csv_out_measurand.data_level_path(), 'unbinned', row.area)
    plot_meta['log_path'] = os.path.join(plot_meta['path'], 'logs')
    plot_meta['rop_path'] = os.path.join(plot_meta['path'], 'rop')
    ensure_dir(plot_meta['log_path'])
    ensure_dir(plot_meta['rop_path'])

    plot_meta['log_filename'] = os.path.join(plot_meta['log_path'], '{}{}.png'.format(zfill(row.hole,3),hole_uid[-2:]))
    plot_meta['rop_filename'] = os.path.join(plot_meta['rop_path'], '{}.png'.format(zfill(row.hole,3)))

    plot_meta['row'] = row

    depth = interpolate_to_assign_depths_to_log_csv(dff, mwd_hole_df, plot_meta=plot_meta)
    dff['depth'] = pd.Series(depth, index = dff.index)

    #<one off>
    n_obs_top_of_hole = 10
    top_of_hole = dff[:n_obs_top_of_hole].sort_values('depth', axis=0, ascending=True, inplace=False, kind='quicksort', na_position='last')
    frames = [top_of_hole, dff[n_obs_top_of_hole:]]
    dff = pd.concat(frames)
    #<one offf>
    dff['hole'] = pd.Series(hole, index = dff.index)
    dff['hole_uid'] = pd.Series(hole_uid, index = dff.index)

    qc_input = QCLogPlotInput()
    #TODO: Make qcLogPlotInput have methods that generate amplitude ratio, etc
    qc_input.df = dff
    qc_input.hole_start_time = dff['datetime'].iloc[0].to_pydatetime()
    qc_input.observer_row = row
    qc_input.plot_meta = plot_meta
    qc_input.time_stamps = dff['datetime']
#
    dff['pseudo_ucs'] = pd.Series(qc_input.pseudo_ucs_sample, index = dff.index)
    dff['pseudo_velocity'] = pd.Series(qc_input.primary_pseudo_velocity_sample, index = dff.index)
    dff['pseudo_density'] = pd.Series(qc_input.primary_pseudo_density_sample, index = dff.index)



#    if os.path.isfile(output_csv_file):
#        dff.to_csv(output_csv_file, mode='a', header=False)
#    else:
#        dff.to_csv(output_csv_file)



    pdb.set_trace()

    QCLogPlotter(qc_input)#, plot_meta=plot_meta)

    return

def configure_plotting_run():
    """
    """
    #pdb.set_trace()
    for i_row in range(len(df_master)):
        row = df_master.iloc[i_row]
        if row.hole==24:
            make_qc_log(row)
#            continue
#        make_qc_log(row)



def main():
    """
    """
    configure_plotting_run()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
