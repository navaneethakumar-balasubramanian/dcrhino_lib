#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:44:16 2019

@author: thiago

Quesiton for TM:
    1. Are we currently using .txt files with h5-file, json per row? i.e. is it OK if I leave it to fail with json for now
    2. Is it ok If I assume the json files and the h5 files have full paths?
    does that conflict with anything going on right now?
    3. WHat is up with return dict, I cant get it to work with multiprocessing

"""

## HACK TO WORK ON SERVERS NON INTERACTIVE MODE
import matplotlib
import matplotlib.rcsetup as rcsetup # do we need this?
matplotlib.use('TkAgg')

import argparse
import glob2
import json
import multiprocessing
import os
import pdb

from multiprocessing import Process

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.helpers.process_flow_helper_functions import handle_supplied_txt_file
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.process_flow.process_flow import ProcessFlow
#from dcrhino3.process_flow.hole_selector import HoleSelector
#from dcrhino3.models.trace_dataframe import TraceData

USE_MULTIPROCESSING = True

logger = init_logging(__name__)


def process_glob(default_process_json, glob_str,
                 env_config_path="env_config.json", seconds_to_process=False):

    env_config = EnvConfig(env_config_path)
    logger.info("Using env_config : {}".format(env_config_path))

    process_flow = ProcessFlow()
    manager = multiprocessing.Manager()
    return_dict = manager.dict()
    files_list = glob2.glob(glob_str)

    if not files_list:
        logger.warning('File does not exist: {}'.format(glob_str))
        return
    files_list = [x for x in files_list if not env_config.is_file_blacklisted(x)]
    for ffile in files_list:
        if ".txt" in ffile:
            json_path = os.path.join(os.path.abspath('.'), 'process_flows')
            txt_folder_path = os.path.dirname(ffile)#see questionfor thiago in comments
            el_listo = handle_supplied_txt_file(ffile, json_path,
                                                txt_folder_path,
                                                default_process_json)

            #lets generate a list of h5 and json pairs
            for h5_json_pair in el_listo:
                h5_file_path = h5_json_pair[0]
                process_json = h5_json_pair[1]
                print('Processing ' + h5_file_path + ' using ' + process_json['id'])
                if USE_MULTIPROCESSING:
                    p = Process(target=process_flow.process_file,
                                args=(process_json, h5_file_path,
                                     env_config, seconds_to_process,return_dict))
                    p.start()
                    p.join()
                    #pdb.set_trace()
                    process_json = return_dict["process_json"]
                else:
                    qq, ww = process_flow.process_file(process_json, h5_file_path, env_config=env_config,
                                                       seconds_to_process=seconds_to_process,
                                                       return_dict = dict())
                    process_json = ww

        elif '.h5' in os.path.splitext(ffile)[1]:
            process_json = default_process_json
            if env_config.is_file_blacklisted(ffile):
                continue
            if USE_MULTIPROCESSING:
                p = Process(target=process_flow.process_file,
                            args=(process_json, ffile, env_config, seconds_to_process,return_dict))
                p.start()
                p.join()
                process_json = return_dict["process_json"]
            else:
                qq, ww = process_flow.process_file(process_json, ffile,
                                                   env_config=env_config,
                                                   seconds_to_process=seconds_to_process,
                                                   return_dict = {})
                process_json = ww


if __name__ == '__main__':
    use_argparse = True#False
    if use_argparse:
        argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
        #argparser.add_argument('-f', '--flow-path', help="JSON File Path", required=True)
        argparser.add_argument('-f',   '--flow-path',  help="JSON File Path",             default = "./process_flows/v3.1_processing_flow.json")
        argparser.add_argument('-env', '--env-path',   help="ENV CONFIG File Path",       default="env_config.json")
        argparser.add_argument('-tid', '--task-id',    help="Task ID",                    default=False)
        argparser.add_argument('-stp', '--seconds-to-process', help="Seconds to process", default=False)

        argparser.add_argument("data_path", metavar="path", type=str,
        help="Path to .h5 or .txt file with the following format: <hole_to_be_processed.h5> <process_flow_to_use.json> ; enclose in quotes, accepts * as wildcard for directories or filenames" )

        args = argparser.parse_args()
        process_flow_path = args.flow_path
        process_flow_dir = os.path.abspath(os.path.join(process_flow_path, '..'))  # Works as long as process flows in same loc
        data_path = args.data_path
        env_path = args.env_path

        if args.seconds_to_process is not False:
            seconds_to_process = int(args.seconds_to_process)
        else:
            seconds_to_process = args.seconds_to_process
    else:
        home = os.path.expanduser('~/')
        process_flow_dir = os.path.join(home, 'anaconda2/dc_hybrid/dcrhino_lib/bin/process_flows')
        process_flow_json_filehandle = 'tristan_test.json'
        process_flow_path = os.path.join(process_flow_dir, process_flow_json_filehandle)
        #data_path = os.path.join(home, '.cache/datacloud/mont_wright/6585_5451_5451.h5')
        data_path = os.path.join(home, '.cache/datacloud/line_creek/885_NS92_82_9607T_9607T_6172_6172.h5')

        #txt_path = os.path.join(home, '.cache/datacloud/mont_wright/tjw_hole_selection.txt')

        env_path = "env_config.json"
        seconds_to_process = 100

    with open(process_flow_path) as f:
        process_json = json.load(f)

    process_glob(process_json, data_path, env_path, seconds_to_process)
