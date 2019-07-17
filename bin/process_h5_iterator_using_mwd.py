"""
Note 20181229: there are two sets of timestamps running around in this module;
hole_ts: these are by defintion continuous (Thiago is this True?)
numpys_h5_hole_files['ts']: these maybe discontinuous, although rarely
@note 20190103: after discussion with team, it sounds like the discontinuous
h5 files are RHINO only, never on SSX;

@TODO: let's make a 'supporting_h5_iterator_using_mwd.py' module where we put
all the supporting functions, that will make this a lot more readable

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
from dcrhino.analysis.unstable.feature_extraction.feature_derivations_20181218 import extracted_features_df_to_external_features
from dcrhino.analysis.data_manager.temp_paths import ensure_dir as make_dirs_if_needed
from dcrhino.process_pipeline.util import check_timestamp_continuity
from dcrhino.process_pipeline.util import get_values_from_index
from dcrhino.process_pipeline.segy_generator import generate_segy_from_hole_data,extract_component_data_from_data_dictionary,get_mwd_from_extracted_features_df
from dcrhino.analysis.unstable.tests_and_examples.test_chunk_read import read_npy_chunk
from ConfigParser import ConfigParser

def generate_dictionary_of_holes_h5_information(holes, mwdHelper):
    """
    holes: holes_df_list,
    @rtype: dictionary
    @rparam: dict is keyed by bph_str and serial number ... note rig_id is
    also part of bph_str, so maybe it should be bphr_str?
    """

    holes_h5 = {}

    #Loop over holes, for each one generate a dictionar<???>
    #pdb.set_trace()
    for hole in holes:

        hole_rig_ids = hole[mwdHelper.rig_id_column_name].unique()
        if len(hole_rig_ids) == 1:
            rig_id = hole_rig_ids[0]
        else:
            print("hole associated with more than one drill ... how is this possible??")
            print("logger message")
            continue

        bench = hole[mwdHelper.bench_name_column_name].values[0]
        pattern = hole[mwdHelper.pattern_name_column_name].values[0]
        hole_id = hole[mwdHelper.hole_name_column_name].values[0]
        bph_str = '{},{},{},{}'.format(bench, pattern, hole_id, rig_id)

        print hole[mwdHelper.start_time_column_name].min()
        hole_start_time = int(calendar.timegm(hole[mwdHelper.start_time_column_name].min().timetuple()))
        hole_end_time = int(calendar.timegm(hole[mwdHelper.start_time_column_name].max().timetuple()))
        hole_duration = hole_end_time - hole_start_time
        if hole_duration > 86400:
            print('hole {} took too long to drill, something is wrong ... skipping'.format(bph_str))
            continue
        for h5 in h5_iterator_df.itertuples():
            #pdb.set_trace()
            temp_id = '{},{}'.format(bph_str, h5.sensor_serial_number)
            cond_1 = (rig_id == h5.rig_id)
            cond_2 = (hole_start_time >= int(h5.min_ts) and hole_start_time <= int(h5.max_ts))
            cond_3 = (hole_end_time >= int(h5.min_ts) and   hole_end_time <= int(h5.max_ts))

            if cond_1 and (cond_2 or cond_3):
                if temp_id not in holes_h5.keys():
                    #pdb.set_trace()
                    holes_h5[temp_id] = {}
                    holes_h5[temp_id]['bench'] = bench
                    holes_h5[temp_id]['pattern'] = pattern
                    holes_h5[temp_id]['hole'] = hole
                    holes_h5[temp_id]['min_ts'] = hole_start_time
                    holes_h5[temp_id]['max_ts'] = hole_end_time
                    holes_h5[temp_id]['h5s'] = []
                    holes_h5[temp_id]['hole_mwd_df'] = hole
                holes_h5[temp_id]['h5s'].append(h5.Index)
                print("MATCH FOUND - {} in {}".format(temp_id, h5.file_path))
                print(hole_start_time, hole_end_time, h5.min_ts, h5.max_ts)
    return holes_h5


def get_numpys_from_folder_by_interval(folder_path, ts_min, ts_max):
    """
    @Note: using a 'find all the numpys in the folder' approch is probably not
    a good one moving forward ...this should rather take an explicit list
    of what to operate on ...
    @Thiago: is it possible for the  position_index_array to be discontinuous??
	it looks as if not, since you use get_values_from_index()

    """
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
#    dx_position_index_array = np.diff(position_index_array)
#    contiguous_data = np.all(dx_position_index_array==1) #
    print('warning - another hard coded assumption that delta-t between traces==1s')
    #pdb.set_trace()
    output_dict = {}
    for match in matches:
        dict_name = match.replace('.npy','').replace('/','')
        filename = os.path.join(folder_path,match.replace('/',''))
        print('filename', filename)

#        if contiguous_data:
        num_rows = position_index_array[-1] - position_index_array[0]
        nparray = read_npy_chunk(filename, position_index_array[0], num_rows)
        nparray = nparray.astype('float32')
#        else:
#            print("THIS SHOULD NOT HAPPEN - these should be contiguous")
#            loaded_data = np.load(filename)
#            loaded_data = loaded_data.astype('float32')
#            nparray = get_values_from_index(position_index_array, loaded_data)
        print('dtype nparray = {}'.format(nparray.dtype))

        output_dict[dict_name] = nparray
    output_dict['ts'] = get_values_from_index(position_index_array, ts)
    #print output_dict['ts']
    return output_dict

def restrict_mwd_to_relevant_drill_rig_ids(mwd_df, rig_ids, column_name):
    """
    @type column_name: string
    @param column_name: the rig_id coumn name in the MWD; This can be skipped
    once we have official DataCloud format MWD files ...
    @note: there is room to simplify this more, as rig_ids as is provided now
    can have duplicate values
    """
    print("relevant rig_ids = {}".format(set(rig_ids)))
    temp = mwd_df[mwd_df[column_name].isin(rig_ids)].copy()
    return temp


def process_h5_using_mwd(h5_iterator_df, mwd_df, mmap, output_folder,config_parser):
    """
    ::h5_iterator_df:: what is this?  Who are it's parents?

    @var holes: list; Each element of the list is a dataframe, as subset
    of the MWD, associated with ideally a single hole.

    @var hole_ts: this is by definition continuous at sampling rate 'delta t',
    currently 1 second ...



    Flow of this function
    1. Reduce mwd dataframe to only include the drill rig associated with h5 file

    """

    mwdHelper = MwdDFHelper(mwd_df, mwd_map=mmap)
    relevant_rig_ids = h5_iterator_df['rig_id'].values
    mwd_df = restrict_mwd_to_relevant_drill_rig_ids(mwd_df, relevant_rig_ids,
                                                    mwdHelper.rig_id_column_name)
    print("Splitting mwd by bench,pattern,hole")
    holes = mwdHelper._split_df_to_bph_df(mwd_df)
    print("It is in the function above (_split_df_to_bph_df) that we should \
          be culling redrils and handling those problems so the list of hole\
          dataframes comes back with only holes that we wish to process")
    print("Found {} holes in this mwd".format(len(holes)))


    holes_h5 = generate_dictionary_of_holes_h5_information(holes, mwdHelper)

    print("finished metadata review")
    for hole in holes_h5.keys():
        print('processing key = {}'.format(hole))
        hole_ts = np.arange(holes_h5[hole]['min_ts'], holes_h5[hole]['max_ts'])
        print('with timestamps ranging from : {} to {}'.format( hole_ts[0], hole_ts[-1]))
        num_timestamps = len(hole_ts)
        print('there are {} timestamps'.format(num_timestamps))
        if (hole_ts[-1]-hole_ts[0]+1) != num_timestamps:
            print('something not balanced with the timestamp math')
        #pdb.set_trace()
        hole_output_folder = os.path.join(output_folder, hole)
        make_dirs_if_needed(hole_output_folder)
        timestamp_filename = os.path.join(hole_output_folder, "ts.npy")
        np.save(timestamp_filename, hole_ts)

        hole_mwd = holes_h5[hole]['hole_mwd_df']
        hole_features_dict_columns = {}
        print(holes_h5[hole]['h5s'],holes_h5[hole]['min_ts'],holes_h5[hole]['max_ts'])
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
        global_config.set_config_parser(config_parser)

        with open(os.path.join(hole_output_folder,'global_config.json'), 'w') as outfile:
            json.dump(vars(global_config), outfile,indent=4)

        with open(os.path.join(hole_output_folder,'mwd_map.json'), 'w') as outfile:
            json.dump(mmap, outfile,indent=4)

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

        #<ANOTHER BRUTAL ITERATOR - Need to use slicing here>
        for i, ts in enumerate(hole_ts):
            series = h5_features_extracted[h5_features_extracted['datetime_ts'] == ts]

            if len(series) > 0:
                for key in series.to_dict().keys():
                    hole_features_dict_columns[key][i] = series[key].values[0]
        #</ANOTHER BRUTAL ITERATOR - Need to use slicing here>

        numpys_h5_hole_files = get_numpys_from_folder_by_interval(processed_files_path,
                                                                  holes_h5[hole]['min_ts'],
                                                                  holes_h5[hole]['max_ts'])
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

        hole_features_extracted["mine"] = global_config.mine_name

        for col in hole_mwd.columns:
            if col not in hole_features_extracted.columns and hole_mwd[col].values.dtype in [np.int,np.float]:
                hole_features_extracted['mwd_'+col], time_vector = mwdHelper.get_interpolated_column(hole_mwd,col,time_vector)

        #<TODO: Karl: either remove this or put it into feature extractor ...>
        qc_input = QCLogPlotInput()
        qc_input.df = hole_features_extracted
        qc_input.hole_start_time = hole_features_extracted['datetime'].iloc[0].to_pydatetime()
        qc_input.observer_row = hole_mwd
        qc_input.time_stamps = hole_features_extracted['datetime']
        #pdb.set_trace()
        external_features_df = extracted_features_df_to_external_features(hole_features_extracted)
        hole_features_extracted['datetime'] = hole_features_extracted.index = hole_features_extracted['datetime']
        external_features_df.index = external_features_df['datetime']

        hole_features_extracted = pd.concat([hole_features_extracted,external_features_df ], axis=1, join_axes=[external_features_df.index])
        #hole_features_extracted['pseudo_ucs'] = pd.Series(qc_input.pseudo_ucs_sample, index = hole_features_extracted.index)
        #hole_features_extracted['pseudo_velocity'] = pd.Series(qc_input.primary_pseudo_velocity_sample, index = hole_features_extracted.index)
        #hole_features_extracted['pseudo_density'] = pd.Series(qc_input.primary_pseudo_density_sample, index = hole_features_extracted.index)
        #hole_features_extracted['reflection_coefficient'] = pd.Series(qc_input.reflection_coefficient_sample, index = hole_features_extracted.index)
        #hole_features_extracted['axial_delay'] = hole_features_extracted['J0_axial_multiple_peak_time_sample'] - hole_features_extracted['J0_axial_primary_peak_time_sample']
        #hole_features_extracted['axial_velocity_delay'] = 1.0/(hole_features_extracted['axial_delay'])**3

        #hole_features_extracted['tangential_RC'] = pd.Series(qc_input.tangential_reflection_coefficient_sample,index = hole_features_extracted.index) # Added variable for tangential reflection coefficient')]
        #hole_features_extracted['tangential_delay'] = hole_features_extracted['tangential_multiple_peak_time_sample'] - hole_features_extracted['tangential_primary_peak_time_sample']
        #hole_features_extracted['tangential_velocity_delay'] = 1.0/(hole_features_extracted['tangential_delay'])
        #</TODO: Karl: either remove this or put it into feature extractor ...>



        segy_component_data = extract_component_data_from_data_dictionary(numpys_h5_hole_files,global_config)
        segy_mwd_components = get_mwd_from_extracted_features_df(hole_features_extracted,mwdHelper)
        hole_id = int(hole_mwd[mwdHelper.hole_name_column_name].values[0])
        output_path = os.path.join(hole_output_folder,"{}_traces.sgy".format(global_config.segy_output_step))
        generate_segy_from_hole_data(segy_component_data,segy_mwd_components,global_config,hole_id,output_path)


        hole_features_extracted.dropna(axis=1, how='all', inplace=True)
        hole_features_extracted.to_csv(os.path.join(hole_output_folder,"extracted_features.csv"),index=False)

        holes_h5[hole]['hole_mwd_df'].to_csv(os.path.join(hole_output_folder,"hole_mwd.csv"),index=False)


        hole_features_extracted_to_bin  = hole_features_extracted.dropna(axis=1, how='any')

        #pdb.set_trace()
        #hole_features_extracted_to_bin.drop(columns=['datetime','mine'], inplace=True)
        hole_features_extracted_to_bin.drop(labels=['datetime','mine'], axis=1, inplace=True)
        columns_to_bin = hole_features_extracted_to_bin.columns


        #global_config.binning_interval_in_cm = 5.0
        binned_df = apply_bin_df(hole_features_extracted,float(global_config.binning_interval_in_cm)/100,columns_to_bin)
        #pdb.set_trace()
        binned_df['x'] = hole_mwd[mwdHelper.easting_column_name].values[0]
        binned_df['y'] = hole_mwd[mwdHelper.northing_column_name].values[0]
        binned_df["mine"] = global_config.mine_name
        binned_df["mwd_bench"] = hole_mwd[mwdHelper.bench_name_column_name].values[0]
        binned_df["mwd_area"] = hole_mwd[mwdHelper.pattern_name_column_name].values[0]
        binned_df["mwd_hole"] = hole_mwd[mwdHelper.hole_name_column_name].values[0]
        acceleration_values_by_second.to_csv(os.path.join(hole_output_folder,"acceleration_values_by_second.csv"),index=False)
        #hole_features_extracted.to_csv(os.path.join(hole_output_folder,"extracted_features.csv"),index=False)
        binned_df.to_csv(os.path.join(hole_output_folder,"binned.csv"),index=False)
        #holes_h5[hole]['hole_mwd_df'].to_csv(os.path.join(hole_output_folder,"hole_mwd.csv"),index=False)

        # pdb.set_trace()
        # pdb.set_trace()


if __name__ == "__main__":
    use_argparser = True
    if use_argparser:
        argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
        argparser.add_argument('-i', '--h5-iterator-path', help="H5 Iterator File Path", required=True)
        argparser.add_argument('-m', '--mwd-path', help="MWD File Path", required=True)
        argparser.add_argument('-cfg', '--config-path', help="Config File Path", required=False,default=None)
        argparser.add_argument('-mmap','--mwd-map-path',help="MWD Map File Path", required=True)
        argparser.add_argument('-o','--output-folder-path',help="Output Folder Path", required=True)
        args = argparser.parse_args()

        h5_iterator_path = args.h5_iterator_path
        config_path = args.config_path
        mwd_path = args.mwd_path
        mwd_map_path = args.mwd_map_path
        output_folder_path = args.output_folder_path
    else:
        mine_path = '/home/kkappler/data/datacloud/teck/pet_line_creek/'
        #h5_iterator_path = os.path.join(mine_path, 'test_line_creek_iterator_ssx.csv')
        h5_iterator_path = os.path.join(mine_path, 'x_line_creek_iterator.csv')
        output_folder_path = os.path.join(mine_path, 'processed_data')
        mwd_path = os.path.join(mine_path, 'mwd/line_creek_mwd_20180924.csv')
        mwd_map_path = os.path.join(mine_path, 'mwd/mmap.json')
        config_path = False

    print("Loading h5 iterator {}".format(h5_iterator_path))
    h5_iterator_df = pd.read_csv(h5_iterator_path)
    print("Loading MWD {}".format(mwd_path))
    mwd_df = pd.read_csv(mwd_path)
    print("Loading MWD map {}".format(mwd_map_path))
    with open(mwd_map_path) as f:
        mmap = json.load(f)



    # Read Config
    config_parser = ConfigParser()
    if config_path:
        print ("Config file path:" , config_path)
        config_parser.read(config_path)

    process_h5_using_mwd(h5_iterator_df, mwd_df, mmap, output_folder_path,config_parser)
    print('finito {}'.format(datetime.now()))
