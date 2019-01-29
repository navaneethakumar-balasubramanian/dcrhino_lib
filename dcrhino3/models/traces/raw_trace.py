# -*- coding: utf-8 -*-

import h5py
import numpy as np
import pandas as pd
import pdb
import time
from scipy.interpolate import interp1d

from dcrhino3.models.config import Config
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.trace_processing.autocorrelate import autocorrelate_trace


logger = init_logging(__name__)

class RawTraceData(TraceData):
    def load_from_h5(self,path):
        self.dataframe , global_config = self._cast_h5_to_dataframe(path)
        self._global_configs.append(global_config)

    def _cast_h5_to_dataframe(self,h5_filename):
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

        for i_trace in range(num_traces):
            non_uniform_time_stamps = relative_timestamps[reference_array[i_trace]] + timestamp_offset
            output_dict['raw_timestamps'][i_trace] = non_uniform_time_stamps
            for component_id in global_config.components_to_process:
                component_index = global_config.component_index(component_id)
                non_uniform_time_series = data[component_index, reference_array[i_trace]]
                output_dict[component_id][i_trace] = non_uniform_time_series
        output_df = pd.DataFrame(output_dict)

        output_df.index = output_df['timestamp']
        return output_df, global_config

    def resample_l1h5(self,df, global_config):

        """
        @TODO: need to get the upsample factor from
        """
        data_processing_stage_designator = 'resampled'


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
        time_interval = time.time() - t0
        logger.info("Took %s seconds to resample %s traces" % (time_interval,len(df)))
        return df


    def autocorrelate_l1h5(self,df, global_config):
        """
        @note 20190114: since we are not going all the way to final lag, we could
        speed this up slightly by only calculating lads we want ... but for now is OK

        Key is to choose the number of points we will keep
        auto_correlation_duration, the 'clipping' or 'trimming' of the acorr
        vector will take place in the autocorrelate_trace method
        """
        try:
            autocorrelation_duration = global_config.autocorrelation_duration
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
        time_interval = time.time() - t0
        logger.info("Took %s seconds to autocorrelate %s traces" % (time_interval,len(dff)))
        return dff