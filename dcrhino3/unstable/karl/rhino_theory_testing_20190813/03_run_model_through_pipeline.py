#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on wed 14 Aug 2019

"""
# import matplotlib
# matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import os
os.environ['MKL_NUM_THREADS'] = '1'
os.environ['OPENBLAS_NUM_THREADS'] = '1'
os.environ['OMP_NUM_THREADS'] = '1'
import datetime
import numpy as np
import pandas as pd

import glob2
import json
import pdb

from dcrhino3.unstable.karl_dev_util import bin_dir

os.chdir(bin_dir)#"/home/kkappler/software/datacloud/dcrhino_lib/bin")

from dcrhino3.process_flow.process_flow import ProcessFlow
from dcrhino3.helpers.general_helper_functions import init_logging
#from dcrhino3.helpers.sensor_file_manager import h5_filename_from_observed_blasthole_df_row
from process_flow import process_glob
from dcrhino3.unstable.karl_dev_util import eastern_ridge_acorr_folder
from dcrhino3.unstable.karl_dev_util import eastern_ridge_process_flows_folder as process_flow_dir

#, line_creek_mwd_filehandle, line_creek_acorr_folder
from dcrhino3.unstable.karl_dev_util import env_path
#from dcrhino3.unstable.karl_dev_util import mont_wright_acorr_folder
#from dcrhino3.unstable.karl_dev_util import mont_wright_data_cache_path

from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.mwd_helper import MWDHelper


logger = init_logging(__name__)
mine_name = 'eastern_ridge'

#catalog_csv = os.path.join(line_creek_data_cache_path, 'line_creek_observed_blastholes_catalog.csv')
#df = pd.read_csv(catalog_csv)


work_from_trim = False

if work_from_trim:
    tmp = '/home/kkappler/.cache/datacloud/mont_wright/processed/100_100_8295_147187_6243_6243'
    #already_run_json_id =
    h5_list_text_file_path = os.path.join(line_creek_data_cache_path, '{}_trim.txt'.format(dataset_id))
    h5_list_text_file_path = os.path.join(line_creek_data_cache_path, '{}_trim.txt'.format(dataset_id))
    base_process_flow_json_filehandle = 'v3.2b_manual_picking_line_creek_20190511_ssx_kk_trim.json'
else:
    h5_list_text_file_path = 'bma_two_files.txt'
    base_process_flow_json_filehandle = 'eastern_ridge_20190807_20-30-100-120_sw.json'
    base_process_flow_json_filehandle = 'test_can_run_model.json'
#    base_process_flow_json_filehandle = '20190520_line_creek.json'
#    base_process_flow_json_filehandle = '20190611_line_creek.json'
#    base_process_flow_json_filehandle = '20190612_QC1.json'
#    base_process_flow_json_filehandle = '20190620_QC1_nopicker.json'#for testing jazz
#    base_process_flow_json_filehandle = '20190620_QC1_nopicker.json'#for testing jazz
#    #base_process_flow_json_filehandle = '20190620_QC1_trim_flip.json'  # for testing jazz
#    #base_process_flow_json_filehandle = '20190620_QC1_nodecon.json'  # for testing jazz
#    base_process_flow_json_filehandle = '20190731_MW_dev.json'  # for testing jazz
#    #base_process_flow_json_filehandle = '20190731_MW_dev_no_decon.json'  # for testing jazz
#process_flow_dir = os.path.join('process_flows', mine_name)
process_flow_path = os.path.join(process_flow_dir, base_process_flow_json_filehandle)#is a json

f = open(process_flow_path, 'r')
process_json = json.load(f);
f.close()
process_json['id'] = 'model_v1'
#splits = [11.50, 23.80]
process_json['subsets'] = [100.0,]
process_flow = ProcessFlow()
seconds_to_process = 100#False
output_path = False
#pdb.set_trace()
#h5_list_text_file_path = '/home/kkappler/.cache/datacloud/bhp/eastern_ridge/holes_acorr/544_E3-544-059_314_314_6243_6243.h5'
h5_list_text_file_path = '/home/kkappler/.cache/datacloud/bhp/eastern_ridge/holes_acorr/test.h5'
h5_list_text_file_path = os.path.join(eastern_ridge_acorr_folder, 'test.h5')
#pdb.set_trace()
process_glob(process_json, h5_list_text_file_path, env_path, seconds_to_process)

print('success! {}'.format(datetime.datetime.now()))