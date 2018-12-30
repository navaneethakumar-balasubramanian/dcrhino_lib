import argparse
import pandas as pd
import h5py
import os
import pdb
import subprocess

from dcrhino.process_pipeline.util import str2bool

from process_pipeline_new import process_h5_file

def process_master_iterator(master_iterator_df, output_path, reprocess_signals):
    """
    two modes here, one uses subprocess other uses direct call to process h5
    """
    use_subprocess = False
    if 'output_path_folder' not in master_iterator_df.columns:
        output_path_folder = [None] * master_iterator_df.shape[0]
    else:
        output_path_folder = master_iterator_df['output_path_folder'].values

    processed = master_iterator_df['processed'].values
    for index, row in master_iterator_df.iterrows():
        if not row['processed']:
            output_folder = os.path.join(output_path,str(index))
            if use_subprocess:
                subprocess.call(["python", "process_pipeline_new.py",'-h5',row['file_path'],'-o',output_folder ])
            else:
                h5F = h5py.File(row['file_path'],'r+')
                process_h5_file(h5F, output_folder, reprocess_signals)

            processed[index] = True
            output_path_folder[index] = output_folder
            print row['file_path']

    master_iterator_df['output_path_folder'] = output_path_folder
    master_iterator_df['processed'] = processed
    return master_iterator_df

if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-i', '--input-file', help="Master iterator csv path", required=True)
    argparser.add_argument('-o','--output-folder',help="OUTPUT FOLDER", required=True)
    argparser.add_argument('-reproc', '--reprocess_signals',
                           help="FLAG TO REPROCESS SIGNALS", default='True', type=str2bool)

    args = argparser.parse_args()
    print('args.reprocess_signals', args.reprocess_signals)
    if args.reprocess_signals:
        print('its true')
    elif args.reprocess_signals is False:
        print('its false!')
    else:
        print('its a string .. that messed up')
    pdb.set_trace()
    #can we add an assignment layer like the two lines below?
    #that way it is easy to comment out the command line usage and
    #and directly assign args when debugging?
    input_file = args.input_file
    output_folder = args.output_folder
    reprocess_signals = args.reprocess_signals
#    input_file = '/home/kkappler/data/datacloud/teck/line_creek/test_line_creek_iterator_ssx.csv'
#    output_folder = '/home/kkappler/data/datacloud/teck/line_creek/processed_data/'
    master_iterator_df = pd.read_csv(input_file)

    master_iterator_df = process_master_iterator(master_iterator_df, output_folder, reprocess_signals)
    master_iterator_df.to_csv(input_file,index=False)
