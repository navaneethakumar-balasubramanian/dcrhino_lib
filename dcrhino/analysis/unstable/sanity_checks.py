# -*- coding: utf-8 -*-
"""
Created on Sat Jun 30 06:17:10 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from dcrhino.analysis.util.general_helper_functions import init_logging

logger = init_logging(__name__)


def sanity_check_mwd_start_end_matches_rhino(trace_header_df, metadata_df):
    """
    trace header is the cv karl passes to Level3
    metadata is merged observer notes
    """
#   trace_header_df = level3_csv_out_measurand.load(data_key)
#    metadata_df = pd.read_csv(metadata_file, parse_dates=['time_start', 'time_end'])
    #pdb.set_trace()
    logger.info('yay')
    drill_ids = list(set(list(metadata_df['drill_id'])))
    color_cyc = ['red', 'cyan', 'magenta', 'gold']
    print(drill_ids)
    for drill_id in drill_ids:
        drill_id_number = int(drill_id[1:])
        ones = np.ones(len(trace_header_df))*drill_id_number

        dff = metadata_df.query('drill_id=="{}"'.format(drill_id))
        #pdb.set_trace()
        plt.plot(trace_header_df['datetime'], ones)
        for i_row in range(len(dff)):
            start_timestamp = dff.iloc[i_row].time_start
            end_timestamp = dff.iloc[i_row].time_end
            #drilling_interval =
            #midtime = sta'
            drill_id_number = int(drill_id[1:])
            plt.vlines(start_timestamp, drill_id_number-1, drill_id_number+1, linewidth=2, color=color_cyc[i_row % 4])
            plt.vlines(end_timestamp, drill_id_number-1, drill_id_number+1, linewidth=2, color=color_cyc[i_row % 4])

        plt.show()
        plt.clf()

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
