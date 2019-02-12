#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:44:16 2019

@author: thiago
"""

import argparse
import os

import glob2
import json

from multiprocessing import Pool

from dcrhino3.process_flow.process_flow import ProcessFlow
#from dcrhino3.process_flow.hole_selector import HoleSelector
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)

def process_file(process_json,acorr_h5_file_path,env_config):
    #process_flow_path = "/home/thiago/Documents/Projects/Dc_rhino/v3/bin/process_flows/example_simple_flow.json"
    #holes_selection_path = "/home/thiago/Documents/Projects/Dc_rhino/v3/bin/process_flows/holes_selection/example_hole_selection.json"
    #acorr_h5_file_path = "/home/thiago/milligan_cache/interpolated/32555_2235_2235.h5"
    
    #with open(holes_selection_path) as f:
    #    hole_selection_json = json.load(f)
    
    #hole_selector = HoleSelector(hole_selection_json)
    
    
    
    acorr_trace = TraceData()
    acorr_trace.load_from_h5(acorr_h5_file_path)
    filename = os.path.basename(acorr_h5_file_path)
    filename_without_ext = filename.replace(".h5","")
    
    output_folder = env_config.get_hole_h5_processed_cache_folder(acorr_trace.mine_name)
    output_folder = os.path.join(output_folder,filename_without_ext)
    process_flow = ProcessFlow(process_json,output_folder)
    acorr_trace = process_flow.process(acorr_trace)



if __name__ == '__main__':
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
    argparser.add_argument('-f', '--flow-path', help="JSON File Path", required=True)
    argparser.add_argument("h5_path", metavar="path", type=str,
    help="Path to files to be processed; enclose in quotes, accepts * as wildcard for directories or filenames" )
    args = argparser.parse_args()
    
    env_config = EnvConfig()    
    
    process_flow_path = args.flow_path
    with open(process_flow_path) as f:
        process_json = json.load(f)
        
    
    files = glob2.glob(args.h5_path)
    pool = Pool()

    if not files:
        print  'File does not exist: ' + args.h5_path
    for file in files:
        if '.h5' in os.path.splitext(file)[1]:
            logger.info("PROCESSING FILE:" + str( file))
            if env_config.is_file_blacklisted(file) is False:
                pool.apply_async(process_file, [process_json,file,env_config])
                #process_file(process_json,file,env_config)




