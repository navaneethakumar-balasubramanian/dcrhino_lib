#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""

@author: natal
"""

from __future__ import absolute_import, division, print_function
import pdb
from datetime import datetime
import os
import numpy as np
import pandas as pd
from shutil import copyfile

base_path = "/data_sdd/qc_test_dataset"
output_path = os.path.join(base_path,"final_files","final_files_lco_rhino")
if not os.path.exists(output_path):
    os.makedirs(output_path)
files_to_copy = ["depth_plot_v2.png","extracted_features.csv","binned.csv","global_config.json","Acceleration_histogram.png"]

def load_holes_csv():
    return pd.read_csv(os.path.join(base_path,"qc_blastholes.csv"),dtype=str)

def generate_hole_directory_names(df):
    found = []
    client = "lco_rhino"
    arr =  np.asarray(df[['bench', 'pattern','hole','rig_id','serial_number']].apply(lambda x: ','.join(x), axis=1))
    holes_path = os.path.join(base_path,"holes",client)
    for root, dirs, files in os.walk(holes_path, topdown=True):
        for dir in dirs:
            if dir in arr:
                found.append([root,dir])

    return found

def main():
    df = load_holes_csv()
    available_holes = generate_hole_directory_names(df)
    for hole in available_holes:
        try:
            #get the path of the current hole folder
            hole_path = os.path.join(hole[0],hole[1])
            #get the mwd mmap from the hole folder
            mmap_path = os.path.join(hole_path,"mwd_map.json")
            #run the plotting command on each of the blastholes that are part of the qc dataset
            os.system("python qc_plot_pipeline.py -ddir {} -mmap {}".format(hole_path,mmap_path))
            #copy and rename the v2 plot, extracted_features and binned features
            for file in files_to_copy:
                copyfile(os.path.join(hole_path,file),os.path.join(output_path,"{}_{}").format(hole[1],file))
            print('Done with {}'.format(hole_path))
        except:
            pass



if __name__ == "__main__":
  main()
