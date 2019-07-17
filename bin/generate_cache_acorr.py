#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Jan 21 16:10:30 2019

@author: thiago
"""
#import json
import numpy as np
#import pandas as pd
import pdb
import os
import argparse
import pandas as pd

from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.mwd_helper import MWDHelper
from dcrhino3.helpers.mwd_rhino_merger import MWDRhinoMerger
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)


def h5_filename_from_match(line_of_df):
    """
    .. :TODO: file_name_columns should be made global

    this replaces really long line and should be more maintainable
    """
    file_name_columns = ['bench_name', 'pattern_name', 'hole_name',
                          'hole_id', 'sensor_id', 'digitizer_id']
    file_name_values = [line_of_df.__getattribute__(x) for x in file_name_columns]
    file_name_strings = ['{}'.format(x) for x in file_name_values]
    file_name = '_'.join(file_name_strings) + '.h5'
    #str(line.bench_name) + "_" + str(line.pattern_name) + "_" + str(line.hole_name) + "_" + str(line.hole_id)+"_"+str(line.sensor_id)+"_"+str(line.digitizer_id) + ".h5"
    return file_name

def generate_cache_acorr(mine_name, env_config_path=False,output_matches_csv=False):
    """
    matches is type dataframe
    """

    envConfig = EnvConfig(env_config_path)
    holes_cached_folder = envConfig.get_hole_h5_interpolated_cache_folder(mine_name)

    conn = envConfig.get_rhino_db_connection_from_mine_name(mine_name)
    mwd_helper = MWDHelper(envConfig)
    logger.info("Generating cache for mine: " + str(mine_name))


    #CFG_VERSION = 1 #we need to discuss cases when this could be different from 1

    if conn is not False:
        db_helper = RhinoDBHelper(conn=conn)
        mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(mine_name)
        files = db_helper.get_files_list()
        merger = MWDRhinoMerger(files,mwd_df)
        matches = merger.observed_blasthole_catalog

        if output_matches_csv:
            matches.to_csv(output_matches_csv)


        #pdb.set_trace()

        for line in matches.itertuples():

            #h5_filename = str(line.bench_name) + "_" + str(line.pattern_name) + "_" + str(line.hole_name) + "_" + str(line.hole_id)+"_"+str(line.sensor_id)+"_"+str(line.digitizer_id) + ".h5"
            h5_filename = h5_filename_from_match(line)
            #if h5_filename != 'OB_DR:R14N:41:GMS:OB:A:T_B218_286780_6332_6332.h5':
            #    continue

            #pdb.set_trace()
            h5_path = os.path.join(holes_cached_folder, h5_filename)
            temp_h5_path = h5_path.replace(".h5","temp.h5")
            acorr_trace = TraceData()

            if os.path.exists(h5_path) and os.path.isfile(h5_path):
                #acorr_trace.load_from_h5(h5_path)
                #pdb.set_trace()
                logger.info("Already have this file :" + h5_path)
            else:
                print (line.bench_name,line.pattern_name,line.hole_name,line.hole_id)
                hole_mwd = mwd_helper.get_hole_mwd_from_mine_mwd(mwd_df, line.bench_name,
                                                                 line.pattern_name,line.hole_name,
                                                                 line.hole_id)
                files_ids = np.array(str(line.files_ids).split(','))
                min_ts = int((hole_mwd['start_time'].astype(int)/1000000000).min())
                max_ts = int((hole_mwd['start_time'].astype(int)/1000000000).max())

                try:
                    acorr_trace.load_from_db(db_helper, files_ids, min_ts, max_ts)
                except:
                    logger.warn("ERROR LOADING FILES IDS: " + ','.join(files_ids.astype(str)))
                    continue;


                #pdb.set_trace()
                acorr_trace.dataframe = merger.merge_mwd_with_trace(hole_mwd,acorr_trace)
                #pdb.set_trace()
                mwd_depth_spacing = np.median(np.diff(hole_mwd.depth))
                for key, global_config in acorr_trace._global_configs.items():
                    global_config.mwd_depth_spacing = mwd_depth_spacing


                acorr_trace.save_to_h5(temp_h5_path)
                try:
                    os.rename(temp_h5_path,h5_path)
                except:
                    logger.error("Failed to rename " + str(temp_h5_path) + " to " + str(h5_path))
                #reloaded_traces = TraceData()
                #reloaded_traces.load_from_h5(temp)


if __name__ == '__main__':
    use_argparse = True
    if use_argparse:
        argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
        argparser.add_argument("mine_name", metavar="mine_name", type=str, help="Mine Name")
        argparser.add_argument("-env", '--env_config_path', help="Path to optional env config file", default=False)
        argparser.add_argument("-m", '--matches_output_path', help="Path to optional matches file", default=False)
        args = argparser.parse_args()
        mine_name = args.mine_name
        env_config_path = args.env_config_path
    else:
        mine_name = ''

    generate_cache_acorr(mine_name, env_config_path,args.matches_output_path)
