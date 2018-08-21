# -*- coding: utf-8 -*-
"""
Created on Fri Jun 22 18:18:25 2018

@author: kkappler

generate correlated traces without bandpass filtering for bob basker
"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
#import numpy as np
#import os
import pandas as pd
import pdb


from dcrhino.analysis.graphical.unbinned_qc_log_plots_v3_west_angelas import QCLogPlotter
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.util.general_helper_functions import init_logging
from plot_west_angelas_unbinned_qc_logs_v2_20180723 import problem_holes
from bin_csv_for_west_angelas_meeting import positive_rop_csv_filename
logger = init_logging(__name__)

MEASURAND_REGISTRY.print_measurand_registry()

mwd_measurand = MEASURAND_REGISTRY.measurand('mwd_with_mse')
hole_profile_df = mwd_measurand.load()
master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
df_master = master_iterator_measurand.load()

input_csv_fullname = positive_rop_csv_filename
mother_of_all_csv_df = pd.read_csv(input_csv_fullname, parse_dates=['datetime'])


level3_csv_out_measurand_id_hash = 'trace_features_eda_a39021e29a61e'
level3_csv_out_measurand_id = MEASURAND_REGISTRY._hash_dict[level3_csv_out_measurand_id_hash]
level3_csv_out_measurand = MEASURAND_REGISTRY.measurand(level3_csv_out_measurand_id)

def make_qc_log(row):
    """
    """
    print(row)
    #pdb.set_trace()
    hole = row['hole']
    hole_uid = row['hole_uid']
    print(hole, hole_uid)

    dff = mother_of_all_csv_df[mother_of_all_csv_df['hole_uid']==hole_uid]
    dff.sort_values('depth', axis=0, ascending=True, inplace=True, kind='quicksort', na_position='last')
    plot_meta = master_iterator_measurand.set_plotting_metadata(row)
    qc_log_input = level3_csv_out_measurand.generate_qc_plot_input(df=dff,
                                                                   observer_row=row,
                                                                   plot_meta=plot_meta)
    #pdb.set_trace()
    QCLogPlotter(qc_log_input)#, plot_meta=plot_meta)

    return

def make_the_plots():
    """
    """
    bad_and_i_dont_know_why = [15, 31, 32, 57, 58, 59, 82, 83, 84, 85, 110, 111, 112]
    pdb.set_trace()

    for i_row in range(len(df_master)):
        print("working row# {}".format(i_row))
        row = df_master.iloc[i_row]
        if row.hole in problem_holes:
            continue
#        if row.hole==240:
        make_qc_log(row)
#        if row.hole==121:
#            continue
#        if row.hole in bad_and_i_dont_know_why:
#            continue
#        try:
#            pdb.set_trace()
#            make_qc_log(row)
#        except IndexError:
#            print(i_row)
#            bad_and_i_dont_know_why.append(i_row)
#        print(bad_and_i_dont_know_why)



def main():
    """
    """
    make_the_plots()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
