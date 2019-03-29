#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: karl

@TODO: Implement this using BaseArrayModule rather than BaseTraceModule
"""

# -*- coding: utf-8 -*-
import numpy as np
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.hybrid.base_hybrid_module import BaseHybridModule
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace

logger = init_logging(__name__)

class TrimTraceModuleHybrid(BaseHybridModule):
    def __init__(self, json, output_path, process_flow,order):
        BaseHybridModule.__init__(self, json, output_path, process_flow, order)
        self.id = "unfold"

    def process_splitted_trace(self, splitted_traces):
        """
        @type component_array: numpy array
        @note: Creates a symmetric and centered data acorr decendant data vector
        """
        sampling_rate = splitted_traces.dataframe.sampling_rate.iloc[0]
        for component_id in self.components_to_process:

            data_array = splitted_traces.component_as_array(component_id)
            n_traces, n_samples_per_trace = data_array.shape
            example_trace = SymmetricTrace(data_array[0,:], sampling_rate)

            min_lag = splitted_traces.transformed_args.min_lag_trimmed_trace
            max_lag = splitted_traces.transformed_args.max_lag_trimmed_trace
            if np.abs(min_lag) != np.abs(max_lag):
                logger.error("expected min_lag and max_lag to have same size ... \
                               need to review trimming and interpolation ...")
                raise Exception
            t0_index = example_trace.t0_index

            n_samples_back = int(sampling_rate * np.abs(min_lag))
            n_samples_fwd = int(sampling_rate * max_lag) + 1
            back_ndx = t0_index - n_samples_back
            fin_ndx = t0_index + n_samples_fwd
            #pdb.set_trace()
            trimmed_array = data_array[:,back_ndx:fin_ndx]
            splitted_traces.assign_component_from_array(component_id, trimmed_array)
        return splitted_traces
