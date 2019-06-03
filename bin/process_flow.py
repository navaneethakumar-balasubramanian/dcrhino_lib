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
    4. Sheldon hack: Maybe add
"""

## HACK TO WORK ON SERVERS NON INTERACTIVE MODE
import matplotlib
#matplotlib.use('Agg')
import matplotlib.rcsetup as rcsetup
#print(rcsetup.all_backends)
#matplotlib.use('TkCairo')
matplotlib.use('TkAgg')

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
import pdb

USE_MULTIPROCESSING = False

logger = init_logging(__name__)
def read_in_text_filelist(filename):
    f = open(filename, "r")
    file_text = f.read()
    f.close()
    processes_in_file = file_text.split("\n")
    processes_in_file = [x for x in processes_in_file if len(x)>0]
    return processes_in_file

def parse_txt_list_of_h5_and_json(process_in_file, default_process_json):
    """
    The .txt file can be either a list of h5 files to process, OR it can
    also be a list of files and process_json separated by a space.
    This is the parser for those txt files after they have been read and
    are a list of one line per element.
    20190603: modified so that json is requires full path if given in .txt
    """
    #process_flow_dir = os.path.abspath(os.path.join(process_flow_path, '..'))
    #logger.info("need to clean up the .txt option in process flow")
    try:
        process_in_file = process_in_file.strip()
        hole, process_flow_json_filehandle = process_in_file.split(' ')
    except ValueError:
        hole = process_in_file
        process_json = default_process_json
    else:
        #process_flow_path = os.path.join(process_flow_dir, process_flow_json_filehandle)
        with open(process_flow_json_filehandle) as f:
        #with open(process_flow_path) as f:
            process_json = json.load(f)
    return hole, process_json

def process_glob(default_process_json, glob_str,
                 env_config_path="env_config.json", seconds_to_process=False):

    env_config = EnvConfig(env_config_path)
    logger.info("Using env_config : {}".format(env_config_path))

    process_flow = ProcessFlow()
    manager = multiprocessing.Manager()
    return_dict = manager.dict()
    files_list = glob2.glob(glob_str)

    #<WHAT ARE THE POSSIBLE FORMS OF files_list??>
    #h5 and .txt or empty
    if not files_list:
        logger.warning('File does not exist: {}'.format(glob_str))
        return

    for ffile in files_list:
        if env_config.is_file_blacklisted(ffile):
            continue
        if ".txt" in ffile:
            processes_in_file = read_in_text_filelist(ffile)
            txt_folder_path = os.path.dirname(ffile)#see questionfor thiago in comments
            for process_in_file in processes_in_file:
                hole, process_json = parse_txt_list_of_h5_and_json(process_in_file,
                                                                   default_process_json)
                file_path = os.path.join(txt_folder_path, hole)#see questionfor thiago in comments
                print('Processing ' + hole + ' using ' + process_json['id'])
                if USE_MULTIPROCESSING:
                    p = Process(target=process_flow.process_file,
                                args=(process_json, file_path,
                                     env_config, seconds_to_process,{}))
                    p.start()
                    p.join()
                    #pdb.set_trace()
                    process_json = return_dict["process_json"]
                else:
                    qq, ww = process_flow.process_file(process_json, file_path,
                                                       env_config=env_config,
                                                       seconds_to_process=seconds_to_process,
                                                       return_dict = dict())
                    process_json = ww

        elif '.h5' in os.path.splitext(ffile)[1]:
            process_json = default_process_json
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
