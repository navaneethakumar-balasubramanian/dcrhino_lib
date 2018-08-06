# -*- coding: utf-8 -*-
"""
Created on Wed Jul 18 14:53:08 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import time


from dcrhino.common.supporting_paths import ensure_dir

home = os.path.expanduser('~/')
STATUS_PATH = os.path.join(home, 'real_time_processing', 'status')
FILE_BUFFER  = os.path.join(home, 'real_time_processing', 'level_1', 'file_buffer.npy')
ensure_dir(STATUS_PATH)

#<STATUS FILE Handling>
def check_status_file():
    """
    assume there is only always exactly one file in here
    """
    #pdb.set_trace()
    filename = os.listdir(STATUS_PATH)[0]
    return filename

def get_status():
    return check_status_file()

def set_status_busy():
    """
    assume there is only always exactly one file in here
    """
    old_filebase = check_status_file()
    new_filebase = 'busy'
    full_old_filename = os.path.join(STATUS_PATH, old_filebase)
    full_new_filename = os.path.join(STATUS_PATH, new_filebase)
    #cmd = 'mv {} {}'.format(ful)
    cmd = 'mv {} {}'.format(full_old_filename, full_new_filename)
    exit_status = os.system(cmd)
    #pdb.set_trace()
    return


def set_status_metadata_flag():
    """
    assume there is only always exactly one file in here
    """
    old_filebase = check_status_file()
    new_filebase = 'SLDIf'
    full_old_filename = os.path.join(STATUS_PATH, old_filebase)
    full_new_filename = os.path.join(STATUS_PATH, new_filebase)
    #cmd = 'mv {} {}'.format(ful)
    cmd = 'mv {} {}'.format(full_old_filename, full_new_filename)
    exit_status = os.system(cmd)
    #pdb.set_trace()
    return
#</STATUS FILE Handling>
def get_data_from_database():
    data_array = np.random.randn(3200, 3)
    return data_array

def get_metadata_from_drill_headers():
    return 'lsdhfv oucrciuhwi uhWPEIU FHAMWDH'


def write_data_from_database_to_filebuffer():
    """
    this is where the pointer RAM magic would be if we didnt use files as interface
    """
    data = get_data_from_database()
    np.save(FILE_BUFFER, data)
    return

def read_data_from_filebuffer():
    data = np.load(FILE_BUFFER)
    return data



def decon_and_corr(data):
    data = data**2#= 10
    return data

def push_to_corr_storage(data):
    print('stored array of size {}'.format(data.shape))


def karls_demon_do():
    """
    """
    while True:
        filename = check_status_file()
        if filename == 'busy':
            print('karl napping')
            time.sleep(0.05)

        else:
            print('karl to process')
            meta = get_status()
            data = read_data_from_filebuffer()
            set_status_busy()
            data = decon_and_corr(data)
            push_to_corr_storage(data)
            #pdb.set_trace()
            time.sleep(0.8)
            print('process complete')

def natals_demon_do():
    """
    """
    while True:
        filename = check_status_file()
        if filename == 'busy':
            print('writing')
            write_data_from_database_to_filebuffer()
            set_status_metadata_flag()
            print('natal wrote data, going to sleep')
            time.sleep(0.5)

        else:
            print('natal n/c , napping')
            print('{}'.format(datetime.datetime.now()))
            time.sleep(0.05)





def main():
    """
    """
    check_status_file()
    pdb.set_trace()
    natals_demon_do()
    #karls_demon_do()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
