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
import time

from dcrhino.analysis.instrumentation.rhino import get_rhino_channel_map_v2
from dcrhino.process_pipeline.config import Config
from dcrhino.process_pipeline.io_helper import IOHelper
from dcrhino.real_time.metadata import Metadata
from dcrhino.process_pipeline.h5_helper import H5Helper
from dcrhino.analysis.util.general_helper_functions import init_logging

from
logger = init_logging(__name__)

def cast_h5_to_dataframe(h5_filename):
    return


def convert_l1h5_to_resampled(h5_filename):
    """
    #<alternative method>
    for component in components_to_process:
        component_index = rhino_channel_map[component]
        interp_function = interp1d(relative_timestamps, data[component_index,:],
                                   kind='linear', bounds_error=False, fill_value=[0,]);#fill_value='extrapolate')
        resampled_data = interp_function(final_timestamps)
        resampled_data = resampled_data.reshape(num_traces, samples_per_trace)
        pdb.set_trace()
        print(np.sum(np.abs(output_dict[component] - resampled_data)))
        output_dict[component] =  resampled_data.reshape(num_traces, samples_per_trace)
    #</alternative method>
    """
    data_processing_stage_designator = 'resampled'
    output_dict = {}
    f1 = h5py.File(h5_filename,'r+')
    h5 = H5Helper(f1)
    metadata = h5._extract_metadata_from_h5_file()
    components_to_process = metadata.components_to_collect.split(',')

    #pdb.set_trace()
    rhino_channel_map = get_rhino_channel_map_v2(metadata.sensor_axial_axis)

    #<important parameters for resampling>
    trace_duration = metadata.trace_length
    if trace_duration is None:
        trace_duration = 1.0#seconds
        trace_duration = 0.5
    samples_per_trace = trace_duration * metadata.output_sampling_rate
    resampled_dt = 1./metadata.output_sampling_rate
    #<important parameters for resampling>

    timestamp_offset = np.floor(h5.min_ts)
    relative_timestamps = h5.ts - timestamp_offset
    #typical_dt = np.median(np.diff(relative_timestamps))
    integer_trace_sorted_timestamps = np.floor(relative_timestamps / trace_duration).astype(np.int32)
    dtrace_array = np.diff(integer_trace_sorted_timestamps)
    discontinuity_indices = np.where(dtrace_array > 0)[0]
    num_traces = len(discontinuity_indices) #maybe off by one

    final_timestamps = resampled_dt * np.arange(samples_per_trace * num_traces)
    final_timestamps = final_timestamps.reshape((num_traces, samples_per_trace))
    timestamp_indices = final_timestamps[:,0] #select first timestamp from each trace as the timestamp for the trace

    #<Allocate Memory>
    output_dict['timestamps'] = timestamp_indices + timestamp_offset
    for component in components_to_process:
        output_dict[component] = np.full(final_timestamps.shape, np.nan)
    #</Allocate Memory>

    #splitted_indices = np.split(integer_trace_sorted_timestamps, discontinuity_indices+1)
    reference_array = np.split(np.arange(len(relative_timestamps)), discontinuity_indices+1)



    data = np.asarray(h5.data_xyz)
    logger.info("data shape = {}".format(data.shape))

    t0 = time.time()
    for component in components_to_process:
        component_index = rhino_channel_map[component]
        for i_trace in range(num_traces):

            non_uniform_time_stamps = relative_timestamps[reference_array[i_trace]]
            non_uniform_time_series = data[component_index, reference_array[i_trace]]
            interp_function = interp1d(non_uniform_time_stamps, non_uniform_time_series,
                                       kind='linear', bounds_error=False, fill_value=[0,])#'extrapolate')
            output_dict[component][i_trace, :] = interp_function(final_timestamps[i_trace])


    print(time.time() - t0)
    #<Cast to dataframe>
    for component in components_to_process:
        output_dict[component] = list(output_dict[component])
    output_df = pd.DataFrame(output_dict)
    output_df.index = output_df.timestamps
    return output_df


def
#components_to_process = [0, 1, 2]
#n_components =
#def trim_data(data, expected_dimension):
#    """
#    """
#    data_shape = data.shape
#    n_dimensions = len(data.shape)
#    for i_dim in range(n_dimensions):
#        n_observations = data_shape[i_dim]
#        if expected_dimension[i_dim] is not None:
#            check_value = 1.0 * data_shape[i_dim] / expected_dimension[i_dim]
#            print('check_value', check_value)
#        pdb.set_trace()
#        print('')
h5_catalog_file = '/home/kkappler/data/datacloud/teck/pet_line_creek/pet_line_creek_h5_catalog.csv'
h5_catalog = pd.read_csv(h5_catalog_file)
h5_list = h5_catalog.file_path
for h5_filename in h5_list:
    resampled_dataframe = convert_l1h5_to_resampled(h5_filename)
    pdb.set_trace()

def my_function():
    """
    """
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
