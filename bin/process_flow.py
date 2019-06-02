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


logger = init_logging(__name__)
def read_in_text_filelist(filename):
    f = open(filename, "r")
    file_text = f.read()
    f.close()
    processes_in_file = file_text.split("\n")
    processes_in_file = [x for x in processes_in_file if len(x)>0]
    return processes_in_file

def process_glob(default_process_json,glob_str,env_config_path="env_config.json", seconds_to_process=False):
    env_config = EnvConfig(env_config_path)
    logger.info("Using env_config : {}".format(env_config_path))

    process_flow = ProcessFlow()
    manager = multiprocessing.Manager()
    return_dict = manager.dict()
    files_list = glob2.glob(glob_str)

    #seconds_to_process = 100

    if not files_list:
        print  ('File does not exist: ' + glob_str)
    for ffile in files_list:

        if ".txt" in os.path.splitext(ffile)[1]:
            processes_in_file = read_in_text_filelist(ffile)
            txt_folder_path = os.path.dirname(ffile)
            for process_in_file in processes_in_file:
                #<WHAT is going on in this logic?  Can we factor this out to a helper function>
                #we need a hole, a file_path and a process_json
                #also I'm not sure that we want to putting txt_folder_path on filepath!
                logger.info("need to clean up the .txt option in process flow")
                try:
                    process_in_file = process_in_file.strip()
                    hole, process_flow_json_filehandle = process_in_file.split(' ')
                except ValueError:
                    hole = process_in_file
                    process_json = default_process_json
                else:
                    process_flow_path = os.path.join(process_flow_dir, process_flow_json_filehandle)
                    with open(process_flow_path) as f:
                        process_json = json.load(f)

                file_path = os.path.join(txt_folder_path, hole)
                #file_path = os.path.abspath(os.path.join(txt_folder_path, '..', hole)) #Using separate txt file folder
                #</WHAT is going on in this logic?  Can we factor this out to a helper function>

                #Lets clean up this logic!  hole !='', these are removed now ... so lets take the handler out of the code
                #and make is so if its blacklist then continue! so we dont need another layer of indentation. sheesh!
                if env_config.is_file_blacklisted(ffile) is False and hole != '':
                    print('Processing ' + hole + ' using ' + process_json['id'])
                    #p = Process(target=process_flow.process_file,
                    #            args=(process_json, file_path,
                    #                  env_config, seconds_to_process,return_dict))
                    #pdb.set_trace()
                    qq, ww = process_flow.process_file(process_json, file_path, env_config=env_config,
                                              seconds_to_process = seconds_to_process,return_dict = dict())
                    #pdb.set_trace()
                    #p.start()
                    #p.join()
                    process_json = ww#return_dict["process_json"]


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

    process_glob(process_json,data_path,env_path,seconds_to_process)
