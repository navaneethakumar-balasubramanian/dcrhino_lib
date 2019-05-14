#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:44:16 2019

@author: thiago
"""

## HACK TO WORK ON SERVERS NON INTERACTIVE MODE
import matplotlib
#matplotlib.use('Agg')
import matplotlib.rcsetup as rcsetup
#print(rcsetup.all_backends)
#matplotlib.use('TkCairo')
matplotlib.use('TkAgg')

import numexpr as ne
import argparse
import os

import glob2
import json
import pdb

from multiprocessing import Process

from dcrhino3.process_flow.process_flow import ProcessFlow
#from dcrhino3.process_flow.hole_selector import HoleSelector
#from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.general_helper_functions import init_logging
import multiprocessing


logger = init_logging(__name__)

def process_glob(process_json,glob_str,env_config_path="env_config.json", seconds_to_process=False):
    env_config = EnvConfig(env_config_path)
    logger.info("Using env_config : {}".format(env_config_path))



    process_flow = ProcessFlow()
    manager = multiprocessing.Manager()
    return_dict = manager.dict()
    h5_files_list = glob2.glob(glob_str)

    seconds_to_process = seconds_to_process
    #seconds_to_process = 100

    output_path = False

    if not h5_files_list:
        print  ('File does not exist: ' + h5_path)
    for ffile in h5_files_list:

        if ".txt" in os.path.splitext(ffile)[1]:
            txt_folder_path = os.path.dirname(ffile)
            f = open(ffile, "r")
            file_text = f.read()
            files_in_file = file_text.split("\n")
            for file_in_file in files_in_file:
                file_path = os.path.join(txt_folder_path, file_in_file)
                if env_config.is_file_blacklisted(ffile) is False and file_in_file != '':
                    p = Process(target=process_flow.process_file,
                                args=(process_json, file_path,
                                      env_config, seconds_to_process,return_dict))
                    p.start()
                    p.join()
                    process_json = return_dict["process_json"]


        elif '.h5' in os.path.splitext(ffile)[1]:
            if env_config.is_file_blacklisted(ffile) is False:
                p = Process(target=process_flow.process_file,
                            args=(process_json, ffile, env_config, seconds_to_process,return_dict))
                p.start()
                p.join()
                process_json = return_dict["process_json"]



if __name__ == '__main__':
    use_argparse = True#False
    if use_argparse:
        argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
        argparser.add_argument('-f', '--flow-path', help="JSON File Path", required=True)
        argparser.add_argument('-env', '--env-path', help="ENV CONFIG File Path", default="env_config.json")
        argparser.add_argument('-tid', '--task-id', help="Task ID", default=False)
        argparser.add_argument('-stp', '--seconds-to-process', help="Seconds to process", default=False)

        argparser.add_argument("h5_path", metavar="path", type=str,
        help="Path to files to be processed; enclose in quotes, accepts * as wildcard for directories or filenames" )
        args = argparser.parse_args()
        process_flow_path = args.flow_path
        h5_path = args.h5_path
        env_path = args.env_path
        if args.seconds_to_process is not False:
            seconds_to_process = int(args.seconds_to_process)
        else:
            seconds_to_process = args.seconds_to_process
    else:
        home = os.path.expanduser('~/')
        process_flow_dir = os.path.join(home, 'software/datacloud/dcrhino_lib/bin/process_flows')
        process_flow_json_filehandle = 'v3.1_processing_flow.json'
        process_flow_path = os.path.join(process_flow_dir, process_flow_json_filehandle)
        h5_path = os.path.join(home, '.cache/datacloud/line_creek/acorr/23831_5208_5208.h5')
        env_path = "env_config.json"
        seconds_to_process = False

    with open(process_flow_path) as f:
        process_json = json.load(f)

    process_glob(process_json,h5_path,env_path,seconds_to_process)