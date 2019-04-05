# -*- coding: utf-8 -*-
"""
 {
        "type": "template",
        "output_to_file": false,
        "args": {
          "max_lag_trimmed_trace": "|global_config.max_lag_trimmed_trace|",
          "min_lag_trimmed_trace": "|global_config.min_lag_trimmed_trace|"
        }
      },
"""
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.hybrid.base_hybrid_module import BaseHybridModule

logger = init_logging(__name__)

def example_function(x):
    return x-1.0


class TemplateModuleHybrid(BaseHybridModule):

    def __init__(self, json, output_path,process_flow,order):
        BaseHybridModule.__init__(self, json, output_path,process_flow,order)
        self.id = "template"

    def process_splitted_trace(self, splitted_traces):
        """
        @type component_array: numpy array
        @note: Creates a symmetric and centered data acorr decendant data vector
        """
        logger.warning("hybrid module assumes the first trace has same sampling rate\
                       as all traces passed in splitted_trace")
        #sampling_rate = splitted_traces.dataframe.sampling_rate.iloc[0]

        for component_id in self.components_to_process:
            data_array = splitted_traces.component_as_array(component_id)
            n_traces, n_samples_per_trace = data_array.shape

            for i_trace in range(n_traces):
                trace_data = data_array[i_trace,:] + 1.0
                trace_data = example_function(trace_data)
                data_array[i_trace,:] = trace_data

            splitted_traces.assign_component_from_array(component_id, data_array)
        return splitted_traces
