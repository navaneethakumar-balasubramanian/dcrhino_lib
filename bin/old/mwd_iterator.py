#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Nov 15 12:12:27 2018

@author: sjha
"""

import fnmatch
import os
import pandas as pd
import argparse


def main():
    
    mwd_path = '/mnt/sda1/data/datacloud/'
    csv_path = '/mnt/sda1/data/datacloud/'
    
    
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
    argparser.add_argument('-f', '--mwd_folder', help="MWD Folder Path", default=mwd_path)
    argparser.add_argument('-csv', '--csvfile', help="CSV File Path", default=csv_path)
    args = argparser.parse_args()
    
    
    folder_path = args.mwd_folder

    
    has_df = False

    
    matches = []
    for root, dirnames, filenames in os.walk(folder_path):
        for filename in fnmatch.filter(filenames, '*.csv'):
            if 'hole_mwd' in filename:
                path = os.path.join(root, filename)
                path = path.replace(folder_path,'')
                matches.append(path)
    
    
    files_props = []
    for file_match in matches:
            file_path = os.path.join(folder_path,file_match)
            mwd_df = pd.read_csv(file_path)
#            pdb.set_trace()
            try:
                hole_id = '{}_{}_{}'.format(mwd_df.bench[0],mwd_df.pattern[0],mwd_df.hole[0])
                temp = {
                    "file_path":file_path,
                    "hole":hole_id,
                    "start_time":mwd_df.starttime.iloc[0],
                    "end_time":mwd_df.endtime.iloc[-1],
                    "bench":mwd_df.bench[0],
                    "pattern":mwd_df.pattern[0]
                }
            except:
                msg = '{}'.format(file_path)
                print(msg)
                
                
            files_props.append(temp)
    
    new_df = pd.DataFrame(files_props)
    
    if not has_df:
        df = new_df
    else:
        if len(new_df) > 0:
            df = pd.concat([df,new_df],sort=False)
        
    df.drop_duplicates(subset ="hole", keep = "first", inplace = True) 
    
    mwd_it_filebase = os.path.join(args.csvfile,"mwd_iterator.csv")
    
    df.to_csv(mwd_it_filebase,index=False)
    
    
if __name__ == "__main__":
    main()
