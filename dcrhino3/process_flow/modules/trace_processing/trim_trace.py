#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: karl

@TODO: add a control here for "clipping" or "trimming" these
traces down.  The way this was handled is with min_lag_trimmed_trace
and max_lag_trimmed_trace; These were set to -0.1 (min) and +0.1 (max).
We need to make sure that the traces have enough 'slop' on the
edges that the filtering edge effects do not create artefacts in the data.

The code here is modified from the dev branch of dchrino_lib
dcrhino/analysis/unstable/v03/test_can_process_acorr_to_features.py
"""

# -*- coding: utf-8 -*-

import numpy as np
import pdb
import scipy.linalg

from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule



class TrimTraceModule(BaseTraceModule):
    def __init__(self, json, output_path):
        BaseTraceModule.__init__(self, json, output_path)
        self.id = "trim"

    def process_component(self,component_id, component_vector, global_config):
        """
        @type component_array: numpy array
        need min_lag, max_lag, sampling_rate,num_taps_in_decon_filter
        @warn: This assumes a symmetric and centered data acorr decendant data vector
        """
        #pdb.set_trace()
        transformed_args = self.get_transformed_args(global_config)
        sampling_rate = transformed_args.sampling_rate
        #dt = global_config.dt
        min_lag = transformed_args.min_lag_trimmed_trace
        max_lag = transformed_args.max_lag_trimmed_trace
        #n_samples_output_traces = int(np.abs(min_lag)/dt) + int(max_lag/dt) + 1
        #samples_per_trace = n_samples_output_traces


        n_samples_in_input_trace = len(component_vector)
        N = (n_samples_in_input_trace + 1) // 2
        t0_index = N-1;
        t0_index += transformed_args.num_taps_in_decon_filter // 2
        n_samples_back = int(sampling_rate * np.abs(min_lag))
        n_samples_fwd = int(sampling_rate * max_lag) + 1
        back_ndx = t0_index - n_samples_back
        fin_ndx = t0_index + n_samples_fwd
        #pdb.set_trace()
        trace_data = component_vector
        trimmed_trace = trace_data[back_ndx:fin_ndx]

        return trimmed_trace
