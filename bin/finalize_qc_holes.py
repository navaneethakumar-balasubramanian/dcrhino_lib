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

base_path = "/data_sdd/qc_test_dataset"

def load_holes_csv():
    return pd.read_csv(os.path.join(base_path,"qc_blastholes.csv"),dtype=str)

def generate_hole_directory_names(df):
    found = []
    arr =  np.asarray(df[['bench', 'pattern','hole','rig_id','serial_number']].apply(lambda x: ','.join(x), axis=1))
    holes_path = os.path.join(base_path,"holes")
    for root, dirs, files in os.walk(holes_path, topdown=True):
        for dir in dirs:
            if dir in arr:
                found.append(os.path.join(root,dir))
    return found

def main():
  df = load_holes_csv()
  available_holes = generate_hole_directory_names(df)
  for hole_path in available_holes:
      mmap_path = os.path.join(hole_path,"mwd_map.json")
      os.system("python qc_plot_pipeline.py -ddir {} -mmap {}".format(hole_path,mmap_path))

  #plot_qc_plots(array)


  #print(array)

if __name__ == "__main__":
  main()
