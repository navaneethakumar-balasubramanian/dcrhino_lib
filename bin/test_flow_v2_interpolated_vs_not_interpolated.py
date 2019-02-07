#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:44:16 2019

@author: karl
"""

import json
import matplotlib.pyplot as plt
import os
import pandas as pd
import pdb

from dcrhino3.process_flow.process_flow import ProcessFlow
#from dcrhino3.process_flow.hole_selector import HoleSelector
from dcrhino3.models.trace_dataframe import TraceData as TraceSeries
from dcrhino3.models.env_config import EnvConfig

def apply_process_flow(acorr_h5_file_path, process_flow_filename):
    """
    """
    with open(process_flow_filename) as f:
        process_json = json.load(f)
    pdb.set_trace()
    blasthole_data = TraceSeries()
    blasthole_data.load_from_h5(acorr_h5_file_path)
    blasthole_data.dataframe = blasthole_data.dataframe[:10]#(acorr_h5_file_path)
    row_of_df = blasthole_data.dataframe.iloc[0]
    global_config_tmp = blasthole_data.global_config_by_index(row_of_df['acorr_file_id'])
    pdb.set_trace()

    process_flow = ProcessFlow(process_json)
    process_flow.process(blasthole_data)
    return blasthole_data

mine_name = 'milligan'
home = os.path.expanduser("~/")
env_cfg = EnvConfig()
cache_path = env_cfg.get_hole_h5_interpolated_cache_folder(mine_name)
acorr_h5_file_path = os.path.join(cache_path, "59207_5206_5206.h5")

process_flow_path = "process_flows/v2_processing_flow_no_plotter.json"

no_interp_blasthole_data = apply_process_flow(acorr_h5_file_path, process_flow_path)
no_interp_df = no_interp_blasthole_data.dataframe.copy()

pdb.set_trace()

process_flow_path = "process_flows/v2_processing_flow_add_interpolation.json"
interp_blasthole_data = apply_process_flow(acorr_h5_file_path, process_flow_path)
interp_df = interp_blasthole_data.dataframe.copy()
pdb.set_trace()

for col in no_interp_df.columns:
    print(col)
    if col[0:2]=='J1':
        #pdb.set_trace()
        change = no_interp_df[col] - interp_df[col]
        pct_chg = 100 * change / no_interp_df[col]
        print(pct_chg)
        pdb.set_trace()



blasthole_data = TraceSeries()
blasthole_data.load_from_h5(acorr_h5_file_path)
blasthole_data.dataframe = blasthole_data.dataframe[:10]#(acorr_h5_file_path)

row_of_df = blasthole_data.dataframe.iloc[0]
gloabl_config_tmp = blasthole_data.global_config_by_index(row_of_df['acorr_file_id'])
pdb.set_trace()
process_flow = ProcessFlow(process_json)
processed_blasthole_data = process_flow.process(blasthole_data)
pdb.set_trace()
processed_blasthole_data.save_to_h5('/home/kkappler/test_20190129.h5')

dev = True
if dev:
    from dcrhino.analysis.graphical.seismic_wiggle_fatiando_dev import seismic_wiggle
    from dcrhino.analysis.unstable.v03.feature_extraction import get_features_extracted_v3
    row_of_df = processed_blasthole_data.dataframe.iloc[0]
    gloabl_config_tmp = processed_blasthole_data.global_config_by_index(row_of_df['acorr_file_id'])
    pdb.set_trace()
    extracted_features_df = get_features_extracted_v3(processed_blasthole_data.dataframe, gloabl_config_tmp)
    for key in extracted_features_df.columns:
        print extracted_features_df[key]
        print(key, (extracted_features_df[key] - processed_blasthole_data.dataframe[key]).sum())
    final_df = processed_blasthole_data.dataframe.merge(extracted_features_df, on='timestamp')
    processed_blasthole_data.dataframe = final_df
    #pdb.set_trace()
    processed_blasthole_data.save_to_h5('/home/kkappler/test_20190127.h5')
    reloaded_blasthole = TraceSeries()
    reloaded_blasthole.load_from_h5('/home/kkappler/test_20190127.h5')
    pdb.set_trace()
    data = processed_blasthole_data.component_as_array('axial')
    data = data[::4,:]

    seismic_wiggle(data.T);plt.show()
pdb.set_trace()
print("success")

