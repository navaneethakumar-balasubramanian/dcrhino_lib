import argparse
import json
import pandas as pd
import pdb
import time
import os
import fnmatch
from datetime import datetime
import numpy as np
import calendar
from dcrhino.process_pipeline.mwd_helper import MwdDFHelper
from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotInput
import matplotlib.pyplot as plt

from dcrhino.process_pipeline.config import Config

def make_dirs_if_needed(path):
    if not os.path.exists(path):
        os.makedirs(path)

def get_values_from_index(index_ar, values_ar):
    return values_ar[index_ar.min():index_ar.max()]

def get_numpys_from_folder_by_interval(folder_path,ts_min,ts_max):
    matches = []
    for root, dirnames, filenames in os.walk(folder_path):
        for filename in fnmatch.filter(filenames, '*.npy'):
            path = os.path.join(root, filename)
            path = path.replace(folder_path,'')
            matches.append(path)
    ts = np.load(os.path.join(folder_path,'ts.npy'))
    #pdb.set_trace()
    pos_array = np.array(np.where((ts >= int(ts_min)) &  (ts <= int(ts_max)))[0])
    output_dict = {}
    for match in matches:
        dict_name = match.replace('.npy','').replace('/','')
        nparray = get_values_from_index(pos_array,np.load(os.path.join(folder_path,match.replace('/',''))))

        output_dict[dict_name] = nparray
    output_dict['ts'] = get_values_from_index(pos_array,ts)
    print output_dict['ts']
    return output_dict

def process_h5_using_mwd(h5_iterator_df,mwd_df,mmap,output_folder_path):
    output_folder = output_folder_path

    mwdHelper = MwdDFHelper(mwd_df,mwd_map=mmap)
    print h5_iterator_df['rig_id'].unique()
    temp = mwd_df[mwd_df[mwdHelper.rig_id_column_name].isin(h5_iterator_df['rig_id'].values)].copy()
    mwd_df = temp
    print "Splitting mwd by bench,pattern,hole"
    holes = mwdHelper._split_df_to_bph_df(mwd_df)
    print "Found {} holes in this mwd".format(len(holes))
    holes_h5 = {}

    #Loop over holes, for each one create a
    for hole in holes:

        hole_rig_ids = hole[mwdHelper.rig_id_column_name].unique()
        if len(hole_rig_ids) == 1:
            rig_id = hole_rig_ids[0]
        else:
            continue

        bench = hole[mwdHelper.bench_column_name].values[0]
        pattern = hole[mwdHelper.pattern_column_name].values[0]
        hole_id = hole[mwdHelper.hole_column_name].values[0]
        print hole[mwdHelper.start_time_column_name].min()
        hole_start_time = int(calendar.timegm(hole[mwdHelper.start_time_column_name].min().timetuple()))
        hole_end_time = int(calendar.timegm(hole[mwdHelper.start_time_column_name].max().timetuple()))

        #bph_str = str(bench) + "," + str(pattern) + "," +str(hole_id) +','+ str(rig_id)
        bph_str = '{},{},{},{}'.format(bench, pattern, hole_id, rig_id)
        for h5 in h5_iterator_df.itertuples():
            #pdb.set_trace()
            temp_id = '{},{}'.format(bph_str, h5.sensor_serial_number)
            cond_1 = (rig_id == h5.rig_id)
            cond_2 = (int(hole_start_time) >= h5.min_ts and int(hole_start_time) <= h5.max_ts)
            cond_3 = (int(hole_end_time) >= h5.min_ts and int(hole_end_time) <= h5.max_ts)
            if cond_1 and (cond_2 or cond_3):
                if temp_id not in holes_h5.keys():
                    holes_h5[temp_id] = {}
                    holes_h5[temp_id]['bench'] = bench
                    holes_h5[temp_id]['pattern'] = pattern
                    holes_h5[temp_id]['hole'] = hole
                    holes_h5[temp_id]['min_ts'] = hole_start_time
                    holes_h5[temp_id]['max_ts'] = hole_end_time
                    holes_h5[temp_id]['h5s'] = []
                    holes_h5[temp_id]['hole_mwd_df'] = hole
                holes_h5[temp_id]['h5s'].append(h5.Index)
                print "MATCH FOUND - {} in {}".format(temp_id, h5.file_path)
                print hole_start_time, hole_end_time, h5.min_ts, h5.max_ts

    #pdb.set_trace()
    for hole in holes_h5.keys():
        #if hole != '88,5,221,DR5,S1020':
        #    print hole , 'skipped'
        #    continue
        #print hole , 'not skipped'
        hole_ts = np.arange(holes_h5[hole]['min_ts'],holes_h5[hole]['max_ts'])
        print hole_ts

        hole_output_folder = os.path.join(output_folder,hole)
        make_dirs_if_needed(hole_output_folder)
        np.save(os.path.join(hole_output_folder,"ts.npy"),hole_ts)
        holes_dict = {}
        hole_mwd = holes_h5[hole]['hole_mwd_df']
        hole_features_dict_columns = {}
        print holes_h5[hole]['h5s'],holes_h5[hole]['min_ts'],holes_h5[hole]['max_ts']
        for h5 in holes_h5[hole]['h5s']:
            h5_row = h5_iterator_df.loc[[h5]]
            processed_files_path = h5_row['output_path_folder'].values[0]

            ## CONFIG FILE
            config_fullfile_path = os.path.join(processed_files_path,'global_config.json')
            global_config = Config()
            with open(config_fullfile_path) as f:
               data_conf = json.load(f)
            #pdb.set_trace()
            global_config.set_data_from_json(data_conf)
            with open(os.path.join(hole_output_folder,'global_config.json'), 'w') as outfile:
                json.dump(vars(global_config), outfile,indent=4)

            h5_features_extracted = pd.read_csv(os.path.join(processed_files_path,'extracted_features.csv'))
            #pdb.set_trace()
            h5_features_extracted['datetime'] = pd.to_datetime(h5_features_extracted['datetime'])
            #pdb.set_trace()
            h5_features_extracted['datetime_ts'] = (h5_features_extracted['datetime'].astype(int)/1000000000).astype(int)
            print h5_features_extracted['datetime'][0] , h5_features_extracted['datetime_ts'][0]
            #h5_features_extracted.index = h5_features_extracted['datetime_ts']
            h5_features_extracted = h5_features_extracted[(h5_features_extracted['datetime_ts'] >= holes_h5[hole]['min_ts']) & (h5_features_extracted['datetime_ts'] <= holes_h5[hole]['max_ts'])]
            #pdb.set_trace()

            for column in h5_features_extracted.columns:
                if column not in hole_features_dict_columns.keys():
                    hole_features_dict_columns[column] = np.full(len(hole_ts),np.nan)


            for i, ts in enumerate(hole_ts):
                series = h5_features_extracted[h5_features_extracted['datetime_ts'] == ts]
                #print series['datetime'],series['datetime_ts']
                if len(series) > 0:
                    for key in series.to_dict().keys():
                        hole_features_dict_columns[key][i] = series[key].values[0]

            #hole_features_extracted = h5_features_extracted[h5_features_extracted['datetime_ts'].isin(hole_ts)].copy()
            #h5_features_extracted.index = h5_features_extracted['datetime_ts']
            #hole_features_extracted.update( h5_features_extracted )
            #hole_features_extracted.join(h5_features_extracted)
            #hole_features_extracted = pd.merge(hole_features_extracted, h5_features_extracted, on='datetime_ts' )
            #print hole_features_extracted
            #pdb.set_trace()
            numpys_h5_hole_files = get_numpys_from_folder_by_interval(processed_files_path,holes_h5[hole]['min_ts'],holes_h5[hole]['max_ts'])
            for key in numpys_h5_hole_files:
                if key not in holes_dict.keys() and key != 'ts':
                    #print key,holes_dict[key].shape
                    holes_dict[key] = np.full([len(hole_ts),numpys_h5_hole_files[key].shape[1]], np.nan)
                    for i, value in enumerate(numpys_h5_hole_files[key]):
                        ts_in_index = numpys_h5_hole_files['ts'][i]
                        index_of_ts = np.where(hole_ts == int(ts_in_index))[0][0]
                        holes_dict[key][index_of_ts] = value
        for key in holes_dict.keys():
            np.save(os.path.join(hole_output_folder,key+".npy"),holes_dict[key])
        hole_features_extracted = pd.DataFrame()
        for key in hole_features_dict_columns.keys():
            hole_features_extracted[key] = hole_features_dict_columns[key]
        hole_features_extracted['datetime_ts'] = hole_ts
        datetime_list = []
        for ts in hole_ts:
            datetime_list.append(datetime.utcfromtimestamp(ts))
        #pdb.set_trace()
        hole_features_extracted['datetime'] = datetime_list
        #pdb.set_trace()
        #interpolate mwd columns
        #pdb.set_trace()
        hole_features_extracted['computed_elevation'], time_vector = mwdHelper.get_interpolated_column(hole_mwd,'computed_elevation')

        hole_features_extracted['mse'], time_vector = mwdHelper.get_interpolated_column(hole_mwd,mwdHelper.mse_column_name,time_vector)
        #if hole == '965,106,3014,3':
        #    pdb.set_trace()
        hole_features_extracted['depth'] = (np.asarray(hole_features_extracted['computed_elevation'].values) - hole_mwd[mwdHelper.collar_elevation_column_name].values[0]) * -1

        qc_input = QCLogPlotInput()
        qc_input.df = hole_features_extracted
        qc_input.hole_start_time = hole_features_extracted['datetime'].iloc[0].to_pydatetime()
        qc_input.observer_row = hole_mwd
        qc_input.time_stamps = hole_features_extracted['datetime']

        hole_features_extracted['pseudo_ucs'] = pd.Series(qc_input.pseudo_ucs_sample, index = hole_features_extracted.index)
        hole_features_extracted['pseudo_velocity'] = pd.Series(qc_input.primary_pseudo_velocity_sample, index = hole_features_extracted.index)
        hole_features_extracted['pseudo_density'] = pd.Series(qc_input.primary_pseudo_density_sample, index = hole_features_extracted.index)
        hole_features_extracted['reflection_coefficient'] = pd.Series(qc_input.reflection_coefficient_sample, index = hole_features_extracted.index)
        hole_features_extracted['axial_delay'] = hole_features_extracted['axial_multiple_peak_time_sample'] - hole_features_extracted['axial_primary_peak_time_sample']
        hole_features_extracted['axial_velocity_delay'] = 1.0/(hole_features_extracted['axial_delay'])**3
        hole_features_extracted.to_csv(os.path.join(hole_output_folder,"extracted_features.csv"),index=False)
        holes_h5[hole]['hole_mwd_df'].to_csv(os.path.join(hole_output_folder,"hole_mwd.csv"),index=False)


if __name__ == "__main__":
    use_argparser = False
    if use_argparser:
        argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
        argparser.add_argument('-i', '--h5-iterator-path', help="H5 Iterator File Path", required=True)
        argparser.add_argument('-m', '--mwd-path', help="MWD File Path", required=True)
        argparser.add_argument('-mmap','--mwd-map-path',help="MWD Map File Path", required=True)
        argparser.add_argument('-o','--output-folder-path',help="Output Folder Path", required=True)
        args = argparser.parse_args()

        h5_iterator_path = args.h5_iterator_path
        mwd_path = args.mwd_path
        mwd_map_path = args.mwd_map_path
        output_folder_path = args.output_folder_path
    else:
        mine_path = '/home/kkappler/data/datacloud/teck/line_creek/'
        h5_iterator_path = os.path.join(mine_path, 'test_line_creek_iterator_ssx.csv')
        output_folder_path = os.path.join(mine_path, 'processed_data')
        mwd_path = os.path.join(mine_path, 'mwd/line_creek_mwd_20180924.csv')
        mwd_map_path = os.path.join(mine_path, 'mwd/mmap.json')

    print("Loading h5 iterator {}".format(h5_iterator_path))
    h5_iterator_df = pd.read_csv(h5_iterator_path)
    print("Loading MWD {}".format(mwd_path))
    mwd_df = pd.read_csv(mwd_path)
    print("Loading MWD map {}".format(mwd_map_path))
    with open(mwd_map_path) as f:
        mmap = json.load(f)

    process_h5_using_mwd(h5_iterator_df, mwd_df, mmap, output_folder_path)
