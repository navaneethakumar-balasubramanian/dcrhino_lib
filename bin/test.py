#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Jan 21 16:10:30 2019

@author: thiago
"""

from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.mwd_helper import MWDHelper
from dcrhino3.models.traces.interpolated_trace_data import InterpolatedTraceData
from dcrhino3.helpers.mwd_rhino_merger import MWDRhinoMerger
from dcrhino3.models.env_config import EnvConfig
import pdb
    
mine_name = 'milligan'
envConfig = EnvConfig()
conn = envConfig.get_rhino_db_connection_from_mine_name(mine_name)
mwd_helper = MWDHelper(envConfig)

if conn is not False:
    db_helper = RhinoDBHelper(conn=conn)
    acor_trace = InterpolatedTraceData()
    file_id = 3
    min_ts = 1525474052
    max_ts = 1525474052 + 100
    acor_trace.load_from_db(db_helper,file_id,min_ts,max_ts)
    pdb.set_trace()
    files = db_helper.get_files_list()
    mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(mine_name)
    merger = MWDRhinoMerger(files,mwd_df)
    matches = merger.matches_list
    line = matches.iloc[0]
    hole_mwd = mwd_helper.get_hole_mwd_from_mine_mwd(mwd_df,line.bench_name,line.pattern_name,line.hole_name,line.hole_id)
    #merger.get_acorr_trace_data_from_index(0)
    
pdb.set_trace()