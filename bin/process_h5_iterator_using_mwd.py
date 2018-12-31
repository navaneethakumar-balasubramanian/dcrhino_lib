"""
Note 20181229: there are two sets of timestamps running around in this module;
hole_ts: these are by defintion continuous (Thiago is this True?)
numpys_h5_hole_files['ts']: these maybe discontinuous, although rarely
"""
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
from binner import apply_bin_df
from dcrhino.process_pipeline.config import Config

def check_timestamp_continuity(timestamp_array):
    """
    """

    dt_array = np.diff(timestamp_array)
    expected_dt = np.median(dt_array)
    discontinuity_indices = np.where(dt_array > expected_dt)[0]
    splitted_indices = np.split(timestamp_array, discontinuity_indices+1)
    reference_array = np.split(np.arange(len(timestamp_array)), discontinuity_indices+1)

    return splitted_indices, reference_array

def make_dirs_if_needed(path):
    if not os.path.exists(path):
        os.makedirs(path)

def get_values_from_index(index_ar, values_ar):
    """
    """
    print('get values from {} to {}'.format(index_ar.min(), index_ar.max()))
    print('values array has shaepe {} '.format(values_ar.shape))
    print('index array has shaepe {} '.format(index_ar.shape))
    print('index array 0,-1 are {}, {}'.format(index_ar[0], index_ar[-1]))
    #pdb.set_trace()
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
    cond1 = ts >= int(ts_min)
    cond2 = ts <= int(ts_max)
    position_index_array = np.array(np.where((cond1) &  (cond2))[0])

    output_dict = {}
    for match in matches:
        dict_name = match.replace('.npy','').replace('/','')
        filename = os.path.join(folder_path,match.replace('/',''))
        print('filename', filename)
        if os.path.isfile(filename):
            pass
        else:
            print('oh dear')
            pdb.set_trace()
        loaded_data = np.load(filename)
        loaded_data = loaded_data.astype('float32')
        nparray = get_values_from_index(position_index_array, loaded_data)
        print('dtype nparray = {}'.format(nparray.dtype))

        output_dict[dict_name] = nparray
    output_dict['ts'] = get_values_from_index(position_index_array, ts)
    #print output_dict['ts']
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

        bench = hole[mwdHelper.bench_name_column_name].values[0]
        pattern = hole[mwdHelper.pattern_name_column_name].values[0]
        hole_id = hole[mwdHelper.hole_name_column_name].values[0]
        print hole[mwdHelper.start_time_column_name].min()
        hole_start_time = int(calendar.timegm(hole[mwdHelper.start_time_column_name].min().timetuple()))
        hole_end_time = int(calendar.timegm(hole[mwdHelper.start_time_column_name].max().timetuple()))
        hole_duration = hole_end_time - hole_start_time
        if hole_duration > 86400:
            print('this hole took too lon to drill, something is wrong ... skipping')
            continue
        #bph_str = str(bench) + "," + str(pattern) + "," +str(hole_id) +','+ str(rig_id)
        bph_str = '{},{},{},{}'.format(bench, pattern, hole_id, rig_id)
        for h5 in h5_iterator_df.itertuples():
            #pdb.set_trace()
            temp_id = '{},{}'.format(bph_str, h5.sensor_serial_number)
            cond_1 = (rig_id == h5.rig_id)
            cond_2 = (int(hole_start_time) >= int(h5.min_ts) and int(hole_start_time) <= int(h5.max_ts))
            cond_3 = (int(hole_end_time) >= int(h5.min_ts) and int(hole_end_time) <= int(h5.max_ts))

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
    print("finished metadata review")
    for hole in holes_h5.keys():
        print('processing key = {}'.format(hole))
        hole_ts = np.arange(holes_h5[hole]['min_ts'],holes_h5[hole]['max_ts'])
        print('with timestamps ranging from : {} to {}'.format( hole_ts[0], hole_ts[-1]))
        num_timestamps = len(hole_ts)
        print('there are {} timestamps'.format(num_timestamps))

        hole_output_folder = os.path.join(output_folder,hole)
        make_dirs_if_needed(hole_output_folder)
        np.save(os.path.join(hole_output_folder,"ts.npy"),hole_ts)
        #holes_dict = {}
        hole_mwd = holes_h5[hole]['hole_mwd_df']
        hole_features_dict_columns = {}
        print holes_h5[hole]['h5s'],holes_h5[hole]['min_ts'],holes_h5[hole]['max_ts']
        #pdb.set_trace()
        print('if there are mulitiple h5 files per hole I would rather skip these')
        print('better you are to get all the data into a single contianer than\
              handle these issues here ... this is a data api thing')
        if len(holes_h5[hole]['h5s']) > 1:
            print('skipping hole {} as h5 are split up'.format(hole))
            continue
        #for h5 in holes_h5[hole]['h5s']:
        h5 = holes_h5[hole]['h5s'][0]
        h5_row = h5_iterator_df.loc[[h5]]
        processed_files_path = h5_row['output_path_folder'].values[0]

        ## CONFIG FILE
        config_fullfile_path = os.path.join(processed_files_path,'global_config.json')
        global_config = Config()
        with open(config_fullfile_path) as f:
           data_conf = json.load(f)

        global_config.set_data_from_json(data_conf)
        with open(os.path.join(hole_output_folder,'global_config.json'), 'w') as outfile:
            json.dump(vars(global_config), outfile,indent=4)

        samples_per_trace = int(global_config.output_sampling_rate)
        print('warning: assuming 1s trace length -- will fail when we change this')
        print('use metadata.samples_per_trace function when we change this')
        acceleration_values_by_second = pd.read_csv(os.path.join(processed_files_path,'acceleration_values_by_second.csv'))
        h5_features_extracted = pd.read_csv(os.path.join(processed_files_path,'extracted_features.csv'))
        h5_features_extracted['datetime'] = pd.to_datetime(h5_features_extracted['datetime'])
        h5_features_extracted['datetime_ts'] = (h5_features_extracted['datetime'].astype(int)/1000000000).astype(int)
        print h5_features_extracted['datetime'][0] , h5_features_extracted['datetime_ts'][0]
        h5_features_extracted = h5_features_extracted[(h5_features_extracted['datetime_ts'] >= holes_h5[hole]['min_ts']) & (h5_features_extracted['datetime_ts'] <= holes_h5[hole]['max_ts'])]
        acceleration_values_by_second = acceleration_values_by_second[(acceleration_values_by_second['Timestamp'] >= holes_h5[hole]['min_ts']) & (acceleration_values_by_second['Timestamp'] <= holes_h5[hole]['max_ts'])]

        for column in h5_features_extracted.columns:
            if column not in hole_features_dict_columns.keys():
                hole_features_dict_columns[column] = np.full(num_timestamps, np.nan)


        for i, ts in enumerate(hole_ts):
            series = h5_features_extracted[h5_features_extracted['datetime_ts'] == ts]

            if len(series) > 0:
                for key in series.to_dict().keys():
                    hole_features_dict_columns[key][i] = series[key].values[0]


        numpys_h5_hole_files = get_numpys_from_folder_by_interval(processed_files_path,holes_h5[hole]['min_ts'],holes_h5[hole]['max_ts'])
        print('the above can be done by slicing and not loading the whole npy')
        print('finiished get_numpys_from_folder_by_interval')

        #continuous_timestamp_blocks = check_timestamp_continuity(numpys_h5_hole_files['ts'])
        continuous_indices, reference_indices = check_timestamp_continuity(numpys_h5_hole_files['ts'])
        if len(continuous_indices) > 1:
            f=open('log.log', 'a')
            statement = "skipping hole {} due to discontnuous timestamps\n".format(hole)
            f.write(statement)
            f.close()
            print(statement)
            continue
        n_observations_actual = len(numpys_h5_hole_files['ts'])
        num_continuous_blocks = len(continuous_indices)
        block_indices_for_hole_list = []
        block_indices_for_numpy_list = []
        #pdb.set_trace()
        for i_block in range(num_continuous_blocks):
            print('i_block', i_block)
            first_index_to_fill = continuous_indices[i_block][0] - hole_ts[0]
            print('first_index_to_fill',first_index_to_fill)
            last_index_to_fill = first_index_to_fill + len(continuous_indices[i_block]) #-1
            print('last_index_to_fill',last_index_to_fill)
            block_indices_for_hole_list.append((first_index_to_fill, last_index_to_fill))
            block_indices_for_numpy_list.append((reference_indices[i_block][0],
                                            reference_indices[i_block][0]+len(continuous_indices[i_block])))

        for key in numpys_h5_hole_files:
            print('key = {}'.format(key))
            if key == 'ts':
                continue

            numpy_shape = numpys_h5_hole_files[key].shape
            print('numpy shape is {}'.format(numpy_shape))
            if len(numpy_shape)!=2:
                print('unexpected shape array!')
            tmp_shape_to_assign = (num_timestamps, numpy_shape[1])
            print('tmp_shape_to_assign ,{}'.format(tmp_shape_to_assign ))
            tmp = np.full( tmp_shape_to_assign, np.nan, dtype='float32')
            for i_block in range(num_continuous_blocks):
                block_indices_for_hole = block_indices_for_hole_list[i_block]
                block_indices_for_numpy = block_indices_for_numpy_list[i_block]
                #pdb.set_trace()
                numpy_segment = numpys_h5_hole_files[key][block_indices_for_numpy[0]:block_indices_for_numpy[1],:]
                tmp[block_indices_for_hole[0]:block_indices_for_hole[1],:] = numpy_segment

            np.save(os.path.join(hole_output_folder,key+".npy"),tmp)
            print('</saving>')
#        for key in holes_dict.keys():
#            np.save(os.path.join(hole_output_folder,key+".npy"),holes_dict[key])
        hole_features_extracted = pd.DataFrame()
        for key in hole_features_dict_columns.keys():
            hole_features_extracted[key] = hole_features_dict_columns[key]
        hole_features_extracted['datetime_ts'] = hole_ts
        datetime_list = num_timestamps * [None]
        for i, ts in enumerate(hole_ts):
            datetime_list[i] = datetime.utcfromtimestamp(ts)

        hole_features_extracted['datetime'] = datetime_list
        #pdb.set_trace()
        #interpolate mwd columns
        #pdb.set_trace()
        hole_features_extracted['computed_elevation'], time_vector = mwdHelper.get_interpolated_column(hole_mwd,'computed_elevation')
        hole_features_extracted['mse'], time_vector = mwdHelper.get_interpolated_column(hole_mwd,mwdHelper.mse_column_name,time_vector)
        hole_features_extracted['depth'] = (np.asarray(hole_features_extracted['computed_elevation'].values) - hole_mwd[mwdHelper.collar_elevation_column_name].values[0]) * -1

        for col in hole_mwd.columns:
            if col not in hole_features_extracted.columns and hole_mwd[col].values.dtype in [np.int,np.float]:
                hole_features_extracted['mwd_'+col], time_vector = mwdHelper.get_interpolated_column(hole_mwd,col,time_vector)

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

        hole_features_extracted['tangential_RC'] = pd.Series(qc_input.tangential_reflection_coefficient_sample,index = hole_features_extracted.index) # Added variable for tangential reflection coefficient')]
        hole_features_extracted['tangential_delay'] = hole_features_extracted['tangential_multiple_peak_time_sample'] - hole_features_extracted['tangential_primary_peak_time_sample']
        hole_features_extracted['tangential_velocity_delay'] = 1.0/(hole_features_extracted['tangential_delay'])



#        columns_rename = {  "mse":"mwd_mse",
#                            "axial_multiple_peak_sample": "axial_multiple_peak_amplitude",
#                            "axial_multiple_peak_time_sample": "axial_multiple_peak_time",
#                            "axial_primary_peak_sample":"axial_primary_peak_amplitude",
#                            "axial_primary_peak_time_sample":"axial_primary_peak_time",
#                            "radial_primary_peak_sample":"radial_primary_peak_amplitude_sample",
#                            "tangential_primary_peak_sample":"tangential_primary_peak_amplitude",
#                            "pseudo_ucs":"c_str",
#                            "pseudo_velocity":"a_vel",
#                            "pseudo_density":"a_dens",
#                            "reflection_coefficient":"a_reflection-coefficient",
#                            "axial_delay":"a_delay",
#                            "tangential_amplitude_ratio":"t_reflection_coef",
#                            "tangential_delay":"t_delay",
#                            "tangential_impedance":"t_mod",
#                            "shear_velocity":"t_vel"}


#        hole_features_extracted = hole_features_extracted.rename(index=str, columns=columns_rename)
        hole_features_extracted.dropna(axis=1, how='all', inplace=True)
        hole_features_extracted.to_csv(os.path.join(hole_output_folder,"extracted_features.csv"),index=False)
        holes_h5[hole]['hole_mwd_df'].to_csv(os.path.join(hole_output_folder,"hole_mwd.csv"),index=False)


#        columns_to_bin = hole_features_extracted.columns
#        print columns_to_bin
#        binned_df = apply_bin_df(hole_features_extracted,global_config.binning_interval_in_cm/100,columns_to_bin)
#        binned_df['x'] = hole_mwd[mwdHelper.easting_column_name].values[0]
#        binned_df['y'] = hole_mwd[mwdHelper.northing_column_name].values[0]
#        binned_df["mine"] = global_config.mine_name
#        binned_df["mwd_bench"] = hole_mwd[mwdHelper.bench_column_name].values[0]
#        binned_df["mwd_area"] = hole_mwd[mwdHelper.pattern_column_name].values[0]
#        binned_df["mwd_hole"] = hole_mwd[mwdHelper.hole_column_name].values[0]
#        acceleration_values_by_second.to_csv(os.path.join(hole_output_folder,"acceleration_values_by_second.csv"),index=False)
#        hole_features_extracted.to_csv(os.path.join(hole_output_folder,"extracted_features.csv"),index=False)
#        binned_df.to_csv(os.path.join(hole_output_folder,"binned.csv"),index=False)
#        holes_h5[hole]['hole_mwd_df'].to_csv(os.path.join(hole_output_folder,"hole_mwd.csv"),index=False)


if __name__ == "__main__":
    use_argparser = True
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
    print('finito {}'.format(datetime.now()))
