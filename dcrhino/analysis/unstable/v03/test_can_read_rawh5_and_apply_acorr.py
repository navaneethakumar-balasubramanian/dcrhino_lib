# -*- coding: utf-8 -*-
"""
Created on Wed Jan  9 16:18:37 2019

@author: kkappler

just so it is written down - the right way to do this I think is to resample
the data before selecting trace length and store L1 as resampled to integer
samples per second where the sampling rate is the idealized_sampling_rate
or "output sampling rate".

KEY QUESTIONS/ASSUMPTIONS:
    1. [Q] Where are the h5.ts timestamps from?  Are these effectively UnixUTC?
    2. [A] final timestamps are uniformly sampled; they will run from the floor
    of the first second to the ceil of the last second

As per the v3 design document spec, the input to this stage of processing
is going to be L1.h5, and the output will be a dataframe which is indexed
by trace timestamp;

"""

from __future__ import absolute_import, division, print_function


import datetime
import h5py
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import pandas as pd
from scipy.interpolate import interp1d
import scipy.linalg
import time


from dcrhino.analysis.instrumentation.rhino import get_rhino_channel_map_v2
from dcrhino.analysis.signal_processing.seismic_processing import autocorrelate_trace
from dcrhino.process_pipeline.config import Config
from dcrhino.process_pipeline.io_helper import IOHelper
from dcrhino.real_time.metadata import Metadata
from dcrhino.process_pipeline.h5_helper import H5Helper
from dcrhino.analysis.util.general_helper_functions import init_logging

import scipy.signal as ssig
#from dcrhino.process_pipeline.config import Config
logger = init_logging(__name__)

def cast_h5_to_dataframe(h5_filename):
    """

    @property
    column_labels = ['timestamp', 'raw_timestamps', 'axial', 'tangential', 'radial' ]

    The timestamp column is the unix timestamp of the First Sample of the trace
    """

    output_dict = {}

    f1 = h5py.File(h5_filename,'r+')
    h5_helper = H5Helper(f1)
    global_config = Config(h5_helper.metadata)
    #pdb.set_trace()
    trace_duration = global_config.trace_length_in_seconds

    timestamp_offset = np.floor(h5_helper.min_ts)
    relative_timestamps = h5_helper.ts - timestamp_offset
    #typical_dt = np.median(np.diff(relative_timestamps))
    integer_trace_sorted_timestamps = np.floor(relative_timestamps / trace_duration).astype(np.int32)
    dtrace_array = np.diff(integer_trace_sorted_timestamps)
    discontinuity_indices = np.where(dtrace_array > 0)[0]
    num_traces = len(discontinuity_indices) +1 #maybe off by one
    timestamp_indices = np.arange(num_traces) * global_config.trace_length_in_seconds

    reference_array = np.split(np.arange(len(relative_timestamps)), discontinuity_indices+1)

    data = np.asarray(h5_helper.data_xyz)
    logger.info("data shape = {}".format(data.shape))

    output_dict['timestamp'] = timestamp_indices + timestamp_offset
    output_dict['raw_timestamps'] = num_traces * [None]
    for component_id in global_config.components_to_process:
        output_dict[component_id] = num_traces * [None]

    #pdb.set_trace()
    for i_trace in range(num_traces):
        non_uniform_time_stamps = relative_timestamps[reference_array[i_trace]] + timestamp_offset
        output_dict['raw_timestamps'][i_trace] = non_uniform_time_stamps
        for component_id in global_config.components_to_process:
            component_index = global_config.component_index(component_id)
            non_uniform_time_series = data[component_index, reference_array[i_trace]]
            output_dict[component_id][i_trace] = non_uniform_time_series
#            interp_function = interp1d(non_uniform_time_stamps, non_uniform_time_series,
#                                       kind='linear', bounds_error=False, fill_value=[0,])#'extrapolate')
#            output_dict[component][i_trace, :] = interp_function(final_timestamps[i_trace])

    #print(time.time() - t0)
    #pdb.set_trace()
    output_df = pd.DataFrame(output_dict)
    output_df.index = output_df['timestamp']
    return output_df, global_config


def resample_l1h5(df, global_config, upsample_factor=1.25):
    """
    @TODO: need to get the upsample factor from
    """
    data_processing_stage_designator = 'resampled'
    try:
        print(global_config.upsample_factor)
    except AttributeError:
        logger.warning("this warning will be removed once the \
                   upsample factor is coming from the global cfg")
        global_config.output_sampling_rate *= upsample_factor
    t0 = time.time()
    output_dict = {}
    samples_per_trace = global_config.samples_per_trace
    num_traces = len(df)


    for component_id in global_config.components_to_process:
        output_dict[component_id] = np.full((num_traces, samples_per_trace), np.nan) #Allocate Memory

        for i_trace in range(num_traces):
            interp_function = interp1d(df['raw_timestamps'].iloc[i_trace],
                                       df[component_id].iloc[i_trace],
                                       kind='linear', bounds_error=False,
                                       fill_value=[0.0,])#'extrapolate')
            ideal_timestamps = global_config.dt * np.arange(samples_per_trace) + df['timestamp'].iloc[i_trace]
            output_dict[component_id][i_trace, :] = interp_function(ideal_timestamps)
        output_dict[component_id] = list(output_dict[component_id])
        df[component_id] = output_dict[component_id]

    df.drop(['raw_timestamps', ], axis=1, inplace=True)
    print(time.time() - t0)
    return df


def autocorrelate_l1h5(df, global_config):
    """
    @note 20190114: since we are not going all the way to final lag, we could
    speed this up slightly by only calculating lads we want ... but for now is OK

    Key is to choose the number of points we will keep
    auto_correlation_duration, the 'clipping' or 'trimming' of the acorr
    vector will take place in the autocorrelate_trace method
    """
    try:
        print(global_config.autocorrelation_duration)
    except AttributeError:
        logger.warning("this warning will be removed once the \
                   upsample factor is coming from the global cfg")
        autocorrelation_duration = 0.4

    t0 = time.time()
    output_dict = {}
    data_processing_stage_designator = 'autocorrelate'

    samples_per_trace = int(autocorrelation_duration / global_config.dt)

    num_traces = len(df['timestamp'])


    for component_id in global_config.components_to_process:
        output_dict[component_id] = np.full((num_traces, samples_per_trace), np.nan) #Allocate Memory

        for i_trace in range(num_traces):
            #pdb.set_trace()
            input_trace = df[component_id].iloc[i_trace]
            acorr_trace = autocorrelate_trace(input_trace, samples_per_trace)
            output_dict[component_id][i_trace, :] = acorr_trace#[0:samples_per_trace]
        output_dict[component_id] = list(output_dict[component_id])

        #df[component_id] = output_dict[component_id]
    output_dict['timestamp'] = df['timestamp']
    dff = pd.DataFrame(output_dict, index=df.index)
    print(time.time() - t0)
    return dff


def lead_channel_decon():
    pass


def test():
    """
    """
    h5_catalog_file = '/home/kkappler/data/datacloud/teck/pet_line_creek/pet_line_creek_h5_catalog.csv'
    h5_catalog = pd.read_csv(h5_catalog_file)
    h5_list = h5_catalog.file_path
    for h5_filename in h5_list:
        l1h5_dataframe, global_config = cast_h5_to_dataframe(h5_filename)
        resampled_dataframe = resample_l1h5(l1h5_dataframe, global_config)
        autcorrelated_dataframe = autocorrelate_l1h5(resampled_dataframe, global_config)
        #pdb.set_trace()
        print('Oi!')
    pass

def main():
    """
    """
    test()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
