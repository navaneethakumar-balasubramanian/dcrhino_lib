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




def generate_cache_acorr(mine_name):
    
    envConfig = EnvConfig()
    holes_cached_folder = envConfig.get_hole_h5_interpolated_cache_folder(mine_name)
    
    conn = envConfig.get_rhino_db_connection_from_mine_name(mine_name)
    mwd_helper = MWDHelper(envConfig)
    
    
    #CFG_VERSION = 1 #we need to discuss cases when this could be different from 1
    
    if conn is not False:
        db_helper = RhinoDBHelper(conn=conn)
        mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(mine_name)
        files = db_helper.get_files_list()
        merger = MWDRhinoMerger(files,mwd_df)
        matches = merger.observed_blasthole_catalog
        
        #pdb.set_trace()
    
        for line in matches.itertuples():
    
            h5_filename = str(line.hole_id)+"_"+str(line.sensor_id)+"_"+str(line.digitizer_id) + ".h5"
            
            h5_path = os.path.join(holes_cached_folder, h5_filename)
            temp_h5_path = h5_path.replace(".h5","temp.h5")
            acor_trace = TraceData()
    
            if os.path.exists(h5_path) and os.path.isfile(h5_path):
                acor_trace.load_from_h5(h5_path)
                #pdb.set_trace()
                print ("loaded " + str(h5_path))
            else:
                print (line.bench_name,line.pattern_name,line.hole_name,line.hole_id)
                hole_mwd = mwd_helper.get_hole_mwd_from_mine_mwd(mwd_df, line.bench_name,
                                                                 line.pattern_name,line.hole_name,
                                                                 line.hole_id)
                files_ids = np.array(str(line.files_ids).split(','))
                min_ts = int((hole_mwd['start_time'].astype(int)/1000000000).min())
                max_ts = int((hole_mwd['start_time'].astype(int)/1000000000).max())
    
                acor_trace.load_from_db(db_helper, files_ids, min_ts, max_ts)
                #pdb.set_trace()
                acor_trace.dataframe = merger.merge_mwd_with_trace(hole_mwd,acor_trace)
                acor_trace.save_to_h5(temp_h5_path)
                os.rename(temp_h5_path,h5_path)
                #reloaded_traces = TraceData()
                #reloaded_traces.load_from_h5(temp)
                


    
if __name__ == '__main__':
    mine_name = 'mont_wright'
    use_argparse = True
    if use_argparse:
        argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
        argparser.add_argument("mine_name", metavar="mine_name", type=str,
        help="Mine Name" )
        args = argparser.parse_args()
        mine_name = args.mine_name
    else:
        mine_name = ''

    generate_cache_acorr(mine_name)