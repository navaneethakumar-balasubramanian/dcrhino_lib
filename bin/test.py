#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Jan 21 16:10:30 2019

@author: thiago
"""
import json
import numpy as np
import pdb

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
    acor_trace = TraceData()

    files = db_helper.get_files_list()
    mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(mine_name)
    #pdb.set_trace()
    merger = MWDRhinoMerger(files,mwd_df)
    matches = merger.matches_list

    line = matches.iloc[0]
    hole_mwd = mwd_helper.get_hole_mwd_from_mine_mwd(mwd_df, line.bench_name,
                                                     line.pattern_name,line.hole_name,
                                                     line.hole_id)
    files_ids = np.array(line.files_ids.split(','))
    min_ts = int((hole_mwd['start_time'].astype(int)/1000000000).min())
    max_ts = int((hole_mwd['start_time'].astype(int)/1000000000).max())

    acor_trace.load_from_db(db_helper, files_ids, min_ts, max_ts)
    #pdb.set_trace()

    #pdb.set_trace()
    acor_trace.dataframe = merger.merge_mwd_with_trace(hole_mwd,acor_trace.dataframe)

    relevant_file_ids = acor_trace.dataframe['acorr_file_id'].unique()
    for file_id in relevant_file_ids:
        cfg_unicode_string = db_helper.get_file_config(file_id, 1)
        print('warning! assuming unique above - need to add logic to check this')
        unicode_string = db_helper.get_file_config(14, 1)
    config_dict = json.loads(unicode_string)
    print('save the unicode string as an attr')
    h5_path = 'test3.h5'
    acor_trace.save_to_h5(h5_path)
    #pdb.set_trace()
    reloaded_traces = TraceData()
    reloaded_traces.load_from_h5(h5_path)
    print('hooray')
pdb.set_trace()
