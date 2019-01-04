import argparse
import pandas as pd
import h5py
import os
import pdb
import subprocess
from ConfigParser import ConfigParser
from dcrhino.process_pipeline.util import str2bool

from process_pipeline_new import process_h5_file


def define_output_path(master_iterator_df):
    """
    -should probably change varable name, this is an iterable of folder names,
    it is not a folder or a path to a folder
    -also, maybe we call it output_path, or output_folder, .. otherwise seems redundant
    """
    if 'output_path_folder' not in master_iterator_df.columns:
        output_path_folder = [None] * master_iterator_df.shape[0]
    else:
        output_path_folder = master_iterator_df['output_path_folder'].values
    return output_path_folder


def process_master_iterator(master_iterator_df, output_path, reprocess_signals,config_path):
    """
    two modes here, one uses subprocess other uses direct call to process h5
    """
    use_subprocess = False
    output_path_folder = define_output_path(master_iterator_df)

    processed = master_iterator_df['processed'].values
    for index, row in master_iterator_df.iterrows():
        if not row['processed']:
            output_folder = os.path.join(output_path,str(index))
            if use_subprocess:
                subprocess.call(["python", "process_pipeline_new.py",'-h5',row['file_path'],'-o',output_folder ])
            else:
                h5F = h5py.File(row['file_path'],'r+')
                process_h5_file(h5F, output_folder, reprocess_signals,config_path)

            processed[index] = True
            output_path_folder[index] = output_folder
            print row['file_path']

    master_iterator_df['output_path_folder'] = output_path_folder
    master_iterator_df['processed'] = processed
    return master_iterator_df

if __name__ == "__main__":
    use_argparser = True
    if use_argparser:
        argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
        argparser.add_argument('-i', '--input-file', help="Master iterator csv path", required=True)
        argparser.add_argument('-o','--output-folder',help="OUTPUT FOLDER", required=True)
        argparser.add_argument('-cfg','--cfg-path',help="CFG FILE PATH", required=False,default=False)
        argparser.add_argument('-reproc', '--reprocess_signals',
                               help="FLAG TO REPROCESS SIGNALS", default='True', type=str2bool)

        args = argparser.parse_args()
        #<Sanity Check boolean values with argparse - delete once that is confirmed working>
        print('args.reprocess_signals', args.reprocess_signals)
        if args.reprocess_signals:
            print('its true')
        elif args.reprocess_signals is False:
            print('its false!')
        else:
            print('its a string .. that messed up')
        #</Sanity Check boolean values with argparse - delete once that is confirmed working>
        input_file = args.input_file
        output_folder = args.output_folder
        reprocess_signals = args.reprocess_signals
        config_path = args.cfg_path
    else:

        input_file = '/home/kkappler/data/datacloud/teck/pet_line_creek/x_line_creek_iterator.csv'
        output_folder = '/home/kkappler/data/datacloud/teck/pet_line_creek/processed_data/'
        reprocess_signals = True

    master_iterator_df = pd.read_csv(input_file)


    master_iterator_df = process_master_iterator(master_iterator_df, output_folder, reprocess_signals,config_path)
    master_iterator_df.to_csv(input_file,index=False)
    print("Finished")
