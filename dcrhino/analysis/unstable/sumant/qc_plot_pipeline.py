#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Nov 12 11:00:23 2018

@author: sjha
"""
from __future__ import absolute_import, division, print_function


import numpy as np
import os
import pdb
import pandas as pd
import json
import sys
import argparse
import pdb

from dcrhino.process_pipeline.config import Config

from dcrhino.process_pipeline.mwd_helper import MwdDFHelper
from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotterv2

def main():
    
    ddir = '/mnt/sda1/data/datacloud/rhino_process_pipeline_output/line_creek/5208/3200/2018-11-13_00001'
    
    
    argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-ddir', '--data-path', help="Extracted Data Directory Path", default=ddir)
    argparser.add_argument('-ric', '--rig-id-column', help="RIG ID COLUMN", default='rig')
    argparser.add_argument('-sc', '--start-time-column', help="START TIME COLUMN", default='starttime')
    argparser.add_argument('-ec', '--end-time-column', help="END TIME COLUMN", default='endtime')
    argparser.add_argument('-hc', '--hole-column', help="HOLE COLUMN", default='hole')
    argparser.add_argument('-mc', '--mse-column', help="MSE COLUMN", default='mse')
    argparser.add_argument('-bc', '--bench-column', help="BENCH COLUMN", default='bench')
    argparser.add_argument('-ropc', '--rop-column', help="ROP COLUMN", default='rop(m/hr)')
    argparser.add_argument('-wobc', '--wob-column', help="WOB COLUMN", default='force_on_bit(n)')
    argparser.add_argument('-tobc', '--tob-column', help="TOB COLUMN", default='torque(nm)')
    argparser.add_argument('-eastc', '--easting-column', help="EASTING COLUMN", default='easting')
    argparser.add_argument('-nortc', '--northing-column', help="NORTHING COLUMN", default='northing')
    argparser.add_argument('-pc', '--pattern-column', help="PATTERN COLUMN", default='pattern')
    argparser.add_argument('-cec', '--collar-elevation-column', help="COLLAR ELEVATION COLUMN", default='collar_elevation')
    argparser.add_argument('-compec', '--computed-elevation-column', help="COMPUTED ELEVATION COLUMN", default='computed_elevation')
    
    args = argparser.parse_args()
    start_time_column = args.start_time_column
    end_time_column = args.end_time_column
    bench_column = args.bench_column
    pattern_column = args.pattern_column
    hole_column = args.hole_column
    collar_elevation_column = args.collar_elevation_column
    computed_elevation_column = args.computed_elevation_column
    rig_id_column = args.rig_id_column
    mse_column = args.mse_column
    rop_column = args.rop_column
    wob_column = args.wob_column
    tob_column = args.tob_column
    easting_column = args.easting_column
    northing_column = args.northing_column
    
    
    config_filebase = "global_config.json"
    feature_csv_filebase = 'extracted_features.csv'
    mwd_csv_filebase = 'hole_mwd.csv'
    
    
    mwd_fullfile = os.path.join(args.data_path,mwd_csv_filebase)
    feature_fullfile = os.path.join(args.data_path,feature_csv_filebase)
    config_fullfile = os.path.join(args.data_path,config_filebase)
    
    
    try:
        mwd_df = pd.read_csv(mwd_fullfile, parse_dates=[start_time_column, end_time_column])
    except IOError:
        print('No files exist. Were the files extracted by running process pipeline?')
        sys.exit()
        
        
    global_config = Config()
    with open(config_fullfile) as f:
       data_conf = json.load(f)
    global_config.set_data_from_json(data_conf)
    global_config.n_samples_trimmed_trace
       
       
    
    feature_df = pd.read_csv(feature_fullfile)
    
    print(feature_df)
    print('*********')
    print(mwd_df)
    print('*********')
    print(global_config)
    print ('')
    
    mwd_helper = MwdDFHelper(mwd_df,
                           start_time_column=start_time_column,
                           end_time_column=end_time_column,
                           #end_depth_column=end_depth_column,
                           bench_column=bench_column,
                           pattern_column=pattern_column,
                           hole_column=hole_column,
                           collar_elevation_column=collar_elevation_column,
                           computed_elevation_column=computed_elevation_column,
                           rig_id_column=rig_id_column,
                           mse_column=mse_column,
                           rop_column=rop_column,
                           tob_column=tob_column,
                           wob_column=wob_column,
                           easting_column=easting_column,
                           northing_column=northing_column)
    
    axial_file_path = os.path.join(args.data_path,'axial.npy')
    tangential_file_path = os.path.join(args.data_path,'tangential.npy')
    radial_file_path = os.path.join(args.data_path,'radial.npy')
    
    axial = np.load(axial_file_path)
    tangential = np.load(tangential_file_path)
    radial = np.load(radial_file_path)
    
    bph_string = 'Hackathon_Demo'
    qclogplotter_depth = QCLogPlotterv2(axial,tangential,radial,mwd_helper,mwd_df,feature_df,bph_string,os.path.join(args.data_path,'depth_plot.png'),global_config)
    qclogplotter_depth.plot()
    qclogplotter_time = QCLogPlotterv2(axial,tangential,radial,mwd_helper,mwd_df,feature_df,bph_string,os.path.join(args.data_path,'time_plot.png'),global_config,plot_by_depth=False)
    qclogplotter_time.plot()

    
    print("ok, now make the qc plot")

if __name__ == "__main__":
    main()
