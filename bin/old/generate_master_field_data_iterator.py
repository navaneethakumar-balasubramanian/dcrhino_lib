import fnmatch
import os
from dcrhino.process_pipeline.h5_helper import H5Helper
import h5py
from dcrhino.process_pipeline.config import Config
import pandas as pd
import argparse
import time
import pdb
import logging

argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
argparser.add_argument('-f', '--h5-folder', help="H5 Folder Path", required=True)
argparser.add_argument('-csv', '--csv-file', help="CSV File Path", required=True)
args = argparser.parse_args()

has_df = False
try:
    df = pd.read_csv(args.csv_file)
    has_df = True
except:
    has_df = False


folder_path = args.h5_folder
if folder_path[-1] != '/':
    folder_path = folder_path + '/'

matches = []
for root, dirnames, filenames in os.walk(folder_path):
    for filename in fnmatch.filter(filenames, '*.h5'):
        if not 'traces' in filename:
            path = os.path.join(root, filename)
            path = path.replace(folder_path,'')
            matches.append(path)



files_props = []
print "Found " + str(len(matches)) + " files"
for file_match in matches:
    try:
        file_path = os.path.join(folder_path,file_match)
        file_path = os.path.abspath(file_path)

        file_size = os.path.getsize(file_path)

        ignore = False
        #pdb.set_trace()
        if has_df:
            vals = df[(df['file_path'] == file_path) & (df['file_size'] == float(file_size))]
            if len(vals)>0:
                #idx = vals.index
                idx = vals.index.values[0]
                print "Found file in list " ,file_path , idx,df['file_size'].values[idx]
                ignore = True
                if float(df['file_size'].values[idx]) != float(file_size):
                    print "File size is different"
                    df.at['file_size',idx] = float(file_size)
                    df.at['processed',idx] = False
                    print "Updated"

        if not ignore:
            f1 = h5py.File(file_path,'r+')
            h5_helper = H5Helper(f1,load_xyz=False)
            global_config = Config(h5_helper.metadata )
            #pdb.set_trace()
            temp = {
                "file_path":file_path,
                "min_ts":h5_helper.min_ts,
                "max_ts":h5_helper.max_ts,
                "file_size":file_size,
                "mine_name":global_config.mine_name,
                "rig_id":global_config.rig_id,
                "client_name":global_config.client_name,
                "sensor_serial_number":global_config.sensor_serial_number,
                "output_sampling_rate":global_config.output_sampling_rate,
                "processed":False,
                "metadata":str(vars(global_config))
            }
            files_props.append(temp)
            #print file_match,h5_helper.min_dtime,h5_helper.max_dtime,global_config.mine_name,global_config.sensor_serial_number,global_config.rig_id
        else:
            print "ignored file " , file_path
    except:
        print "ERROR ON FILE " , file_match

new_df = pd.DataFrame(files_props)

if not has_df:
    df = new_df
else:
    if len(new_df) > 0:
        df = pd.concat([df,new_df],sort=False)


df.to_csv(args.csv_file,index=False)
