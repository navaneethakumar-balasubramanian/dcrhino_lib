# -*- coding: utf-8 -*-

import argparse
import pdb

import glob2
import os
import logging
import json
import numpy as np

from dcrhino3.models.traces.raw_trace import RawTraceData
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.general_helper_functions import init_logging,splitDataFrameIntoSmaller

from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper

logger = init_logging(__name__)

def raw_trace_h5_to_acorr_db(h5_file_path,env_config,chunk_size=5000):
    raw_trace_data = RawTraceData()
    raw_trace_data.load_from_h5(h5_file_path)
    l1h5_dataframe = raw_trace_data.dataframe

    global_config = raw_trace_data.global_config_by_index("0")

    upsample_factor = 1.25
    try:
        print(global_config.upsample_factor)
    except AttributeError:
        logger.warning("this warning will be removed once the \
                   upsample factor is coming from the global cfg")
        global_config.output_sampling_rate *= upsample_factor

    #db_helper = RhinoDBHelper('13.66.189.94',database='mont_wright')
    logger.info("Mine name on file:" + str(global_config.mine_name))
    conn = env_config.get_rhino_db_connection_from_mine_name(global_config.mine_name)
    db_helper= RhinoDBHelper(conn=conn)
    dupes = db_helper.check_for_pre_saved_acorr_traces(l1h5_dataframe['timestamp'],global_config.sensor_serial_number)

    if len(dupes)>0:
        l1h5_dataframe = l1h5_dataframe[~l1h5_dataframe['timestamp'].isin(dupes)]
        logger.warning("PREVENTING DUPLICATES TIMESTAMPS ON THIS SENSOR_ID:" + global_config.sensor_serial_number + " FILE_ID:" +h5_file_path)

    if l1h5_dataframe.shape[0] == 0:
        logger.warning("IGNORED THIS FILE")
        return
    
    file_id = db_helper.get_file_id_from_file_path(h5_file_path)

    if file_id is False:
        min_ts = l1h5_dataframe['timestamp'].min()
        max_ts = l1h5_dataframe['timestamp'].max()
        file_id = db_helper.create_acorr_file(h5_file_path,global_config.rig_id,global_config.sensor_serial_number,str(global_config.digitizer_serial_number),min_ts,max_ts)

    json_str = json.dumps(vars(global_config), indent=4)

    config = db_helper.create_new_acorr_file_conf(file_id,json_str)


    list_df = splitDataFrameIntoSmaller(l1h5_dataframe.reset_index(drop=True),chunk_size)

    for chunk in list_df:
        if len(chunk) > 0:
            calibrated_dataframe = raw_trace_data.calibrate_l1h5(chunk, global_config)
            #TODO: add min/max accel
            resampled_dataframe = raw_trace_data.resample_l1h5(calibrated_dataframe, global_config)
            autcorrelated_dataframe = raw_trace_data.autocorrelate_l1h5(resampled_dataframe, global_config)
            autcorrelated_dataframe["max_axial_acceleration"] = np.asarray([calibrated_dataframe["axial"].max()], )
            autcorrelated_dataframe["min_axial_acceleration"] = np.asarray([calibrated_dataframe["axial"].min()], )
            autcorrelated_dataframe["max_tangential_acceleration"] = np.asarray([calibrated_dataframe["tangential"].max(

            )], )
            autcorrelated_dataframe["min_tangential_acceleration"] = np.asarray([calibrated_dataframe["tangential"].min(

            )], )
            autcorrelated_dataframe["max_radial_acceleration"] = np.asarray([calibrated_dataframe["radial"].max()], )
            autcorrelated_dataframe["min_radial_acceleration"] = np.asarray([calibrated_dataframe["radial"].min()], )
            
            if 'radial' not in autcorrelated_dataframe.columns:
                num_lines = autcorrelated_dataframe.shape[0]
                len_line = len(autcorrelated_dataframe['axial'].values[0])
                temp = [None] * num_lines
                for i in range(num_lines):
                    temp[i] = [0] * len_line
                autcorrelated_dataframe['radial'] = temp
    
            if 'tangential' not in autcorrelated_dataframe.columns:
                num_lines = autcorrelated_dataframe.shape[0]
                len_line = len(autcorrelated_dataframe['axial'].values[0])
                temp = [None] * num_lines
                for i in range(num_lines):
                    temp[i] = [0] * len_line
                autcorrelated_dataframe['tangential'] = temp
            
            db_helper.save_autocorr_traces(file_id, autcorrelated_dataframe['timestamp'],
                                           axial=autcorrelated_dataframe['axial'],
                                           radial=autcorrelated_dataframe['radial'],
                                           tangential=autcorrelated_dataframe['tangential'],
                                           max_axial_acceleration=autcorrelated_dataframe['axial'],
                                           min_axial_acceleration=autcorrelated_dataframe['axial'],
                                           max_tangential_acceleration=autcorrelated_dataframe['tangential'],
                                           min_tangential_acceleration=autcorrelated_dataframe['tangential'],
                                           max_radial_acceleration=autcorrelated_dataframe['radial'],
                                           min_radial_acceleration=autcorrelated_dataframe['radial']
                                           )


if __name__ == '__main__':
    clickhouse_logger = logging.getLogger('clickhouse_driver.connection')
    clickhouse_logger.setLevel(50)
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
    argparser.add_argument('-env', '--env-file', help="ENV File Path", default=False)
    argparser.add_argument("src_path", metavar="path", type=str,
    help="Path to files to be merged; enclose in quotes, accepts * as wildcard for directories or filenames")
    args = argparser.parse_args()

    env_config = EnvConfig(args.env_file)
    files = glob2.glob(args.src_path)
    
    logger.info("Found " + str(len(files)) + " files" )

    if not files:
        print  'File does not exist: ' + args.src_path
    for file in files:
        if '.h5' in os.path.splitext(file)[1]:
            logger.info("PROCESSING FILE:" + str( file))
            if env_config.is_file_blacklisted(file) is False:
                raw_trace_h5_to_acorr_db(file,env_config)
