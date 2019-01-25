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

from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.mwd_helper import MWDHelper
from dcrhino3.helpers.mwd_rhino_merger import MWDRhinoMerger
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.models.trace_dataframe import TraceData


mine_name = 'milligan'
envConfig = EnvConfig()
conn = envConfig.get_rhino_db_connection_from_mine_name(mine_name)
mwd_helper = MWDHelper(envConfig)
CFG_VERSION = 1 #we need to discuss cases when this could be different from 1

if conn is not False:
    db_helper = RhinoDBHelper(conn=conn)

    #pdb.set_trace()
    files = db_helper.get_files_list()
    mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(mine_name)
    merger = MWDRhinoMerger(files,mwd_df)
    matches = merger.matches_list
    for line in matches.itertuples():

        h5_filename = str(line.hole_id) + ".h5"
        holes_cached_folder = envConfig.get_hole_h5_interpolated_cache_folder(mine_name)
        h5_path = os.path.join(holes_cached_folder, h5_filename)
        acor_trace = TraceData()

        if os.path.exists(h5_path) and os.path.isfile(h5_path):
            acor_trace.load_from_h5(h5_path)
            print ("loaded " + str(h5_path))
        else:
            print (line.bench_name,line.pattern_name,line.hole_name,line.hole_id)
            hole_mwd = mwd_helper.get_hole_mwd_from_mine_mwd(mwd_df, line.bench_name,
                                                             line.pattern_name,line.hole_name,
                                                             line.hole_id)
            files_ids = np.array(line.files_ids.split(','))
            min_ts = int((hole_mwd['start_time'].astype(int)/1000000000).min())
            max_ts = int((hole_mwd['start_time'].astype(int)/1000000000).max())

            acor_trace.load_from_db(db_helper, files_ids, min_ts, max_ts)
            print ("Loaded")
            acor_trace.dataframe = merger.merge_mwd_with_trace(hole_mwd,acor_trace.dataframe)
            print ("Merged")
            acor_trace.save_to_h5(h5_path)
            print ("Saved")
            reloaded_traces = TraceData()
            reloaded_traces.load_from_h5(h5_path)
            print ("Reloaded")

    print('hooray')
