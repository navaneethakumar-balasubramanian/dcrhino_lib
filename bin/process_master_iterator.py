import argparse
import pandas as pd
import h5py
import os
import pdb
from process_pipeline_new import process_h5_file

def process_master_iterator(master_iterator_df,output_path):
    if 'output_path_folder' not in master_iterator_df.columns:
        output_path_folder = [None] * master_iterator_df.shape[0]
    else:
        output_path_folder = master_iterator_df['output_path_folder'].values

    processed = master_iterator_df['processed'].values
    for index, row in master_iterator_df.iterrows():
        if not row['processed']:
            h5F = h5py.File(row['file_path'],'r+')
            output_folder = os.path.join(output_path,str(index))
            process_h5_file(h5F,output_folder)
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
    args = argparser.parse_args()

    master_iterator_df = pd.read_csv(args.input_file)

    master_iterator_df = process_master_iterator(master_iterator_df,args.output_folder)
    master_iterator_df.to_csv(args.input_file,index=False)
