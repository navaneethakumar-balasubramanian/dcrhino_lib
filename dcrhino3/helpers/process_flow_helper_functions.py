# -*- coding: utf-8 -*-
"""
Created on Mon Jun  3 14:04:10 2019

@author: kkappler

Note this is helper functions rather than a class.
"""

from __future__ import absolute_import, division, print_function


import datetime
import json
#import matplotlib.pyplot as plt
#import numpy as np
import os
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging


def handle_supplied_txt_file(txt_filename, json_path, txt_path, default_json):
    """
    returns a list of tuples.  [(), (), (), ...()]
    where each tuple has the form (h5_filename, json)
    """
    processes_in_file = read_in_text_filelist(txt_filename)
    output_process_list = []
    for row in processes_in_file:
        h5_json_pair = [None, None]
        splitted_row = split_row_on_whitespace(row)
        h5_filename = splitted_row[0]
        if file_is_fullpath(h5_filename):
            full_h5_filename = h5_filename
        else:
            full_h5_filename = os.path.join(txt_path, h5_filename)
        h5_json_pair[0] = full_h5_filename

        if json_supplied(splitted_row):
            json_filename = splitted_row[1]
            if file_is_fullpath(json_filename):
                full_json_filename = json_filename
            else:
                full_json_filename = os.path.join(json_path, json_filename)
            f = open(full_json_filename)
            the_json = json.load(f)
            f.close()
        else:
            the_json = default_json
        h5_json_pair[1] = the_json
        output_process_list.append(h5_json_pair)
    return output_process_list



def split_row_on_whitespace(row):
    row = row.strip()
    splitted_row = row.split(' ')
    splitted_row = [x for x in splitted_row if len(x)>0]
    return splitted_row

def json_supplied(splitted_row):
    if len(splitted_row) > 1:
        if splitted_row[1][-5:]=='.json':
            return True
    else:
        return False


def file_is_fullpath(filename):
    if filename[0] == '/':
        return True
    else:
        return False


#def add_json_path(filename):
#    pass
#def add_data_path(filename):
#    pass
def read_in_text_filelist(filename):
    f = open(filename, "r")
    file_text = f.read()
    f.close()
    processes_in_file = file_text.split("\n")
    processes_in_file = [x for x in processes_in_file if len(x)>0]

    #now you have a list of either .h5, or .h5 .json
    #for each row we want to test
    #A) Is it .h5 or .h5 .json
    #B) For each .h5, and or .json, we check if it starts with /
    #if it does then
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



def test():
    """
    """
    pass

def main():
    """
    """
    test()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
