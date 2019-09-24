# -*- coding: utf-8 -*-

import numpy as np
import pdb
from scipy.interpolate import interp1d

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.hybrid.base_hybrid_module import BaseHybridModule
from dcrhino3.signal_processing.interpolation import sinc_interp
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace

logger = init_logging(__name__)

class UpsampleModuleHybrid(BaseHybridModule):

    def __init__(self, json, output_path,process_flow,order):
        BaseHybridModule.__init__(self, json, output_path,process_flow,order)
        self.id = "upsample"
        self.default_args = {
            "upsample_interpolation_kind": [
              "|global_config.upsample_interpolation_kind|",
              "quadratic"
            ],
            "min_lag_trimmed_trace": "|global_config.min_lag_trimmed_trace|",
            "upsample_sampling_rate": [
              "|process_flow.upsample_sampling_rate|",
              50000.0
            ],
            "max_lag_trimmed_trace": "|global_config.max_lag_trimmed_trace|",
            "trimmed_trace_duration": "|global_config.trimmed_trace_duration|"
        }

    def get_time_vectors(self, trace_time_series, min_lag, max_lag,
                         input_sampling_rate, upsample_sampling_rate):
        """
        time vectors needed for upsample, but they are the same vectors everytime
        so factor out for performance increas
        """
        upsample_dt = 1./upsample_sampling_rate
        input_dt = 1./input_sampling_rate
        n_samples_input_trace = len(trace_time_series)
        if np.mod(n_samples_input_trace,2) == 1:
            #<For symmetric traces>
            input_trace = SymmetricTrace(trace_time_series, input_sampling_rate)
            original_time_vector = input_trace.time_vector
            steps_in_max_lag = int(np.abs(max_lag)/upsample_dt)
            upsampled_time_vector = upsample_dt * np.arange(steps_in_max_lag + 1)
            left_hand_side = -np.flipud(upsampled_time_vector[1:])
            upsampled_time_vector = np.hstack((left_hand_side, upsampled_time_vector))
            #after thinking pretty deeply about this for way too long I have decided
            #the above expression is correct; technically we should have a few more points
            #but they would be extrapolation points and we would trim them anyhow; knk 20190204
            #</For symmetric traces>
        else:
            original_time_vector = input_dt * np.arange(n_samples_input_trace) - np.abs(min_lag)
            trimmed_trace_duration = max_lag + np.abs(min_lag)
            n_samples_upsampled_trace = trimmed_trace_duration / upsample_dt #should be odd
            upsampled_time_vector = upsample_dt * np.arange(n_samples_upsampled_trace) - np.abs(min_lag)
            logger.warning("untested with even number of points")
        return original_time_vector, upsampled_time_vector

    def process_splitted_trace(self, splitted_traces):
        """
        """
        logger.warning("hybrid upsample assumes the first trace has same sampling rate\
                       as all traces passed in splitted_trace")
        input_sampling_rate = splitted_traces.dataframe.sampling_rate.iloc[0]
        upsample_sampling_rate = splitted_traces.transformed_args.upsample_sampling_rate
        interp_kind = splitted_traces.transformed_args.upsample_interpolation_kind
        min_lag = splitted_traces.transformed_args.min_lag_trimmed_trace
        max_lag = splitted_traces.transformed_args.max_lag_trimmed_trace

        for component_id in self.components_to_process:
            data_array = splitted_traces.component_as_array(component_id)
            n_traces, n_samples_input_trace = data_array.shape
            if n_traces>0:
                example_trace_data = data_array[0,:]
                original_time_vector, upsampled_time_vector = self.get_time_vectors(example_trace_data,
                                                                       min_lag, max_lag,
                                                                       input_sampling_rate,
                                                                       upsample_sampling_rate)
            else:
                logger.error("no data provided")
                raise Exception

            output_trace_array = np.full((n_traces, len(upsampled_time_vector)), np.nan )

            for i_trace in range(n_traces):
                trace_data = data_array[i_trace,:]
                if interp_kind == 'sinc':
                    upsampled_data = sinc_interp(trace_data, original_time_vector, upsampled_time_vector)
                else:
                    interp_function = interp1d(original_time_vector, trace_data,
                                               kind=interp_kind, bounds_error=False,
                                               fill_value=(trace_data[0], trace_data[-1]))
                    upsampled_data = interp_function(upsampled_time_vector)
                output_trace_array[i_trace,:] = upsampled_data
            #pdb.set_trace()
            splitted_traces.assign_component_from_array(component_id, output_trace_array)
            splitted_traces.dataframe.sampling_rate = upsample_sampling_rate
        return splitted_traces
