#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: thiago
"""

# -*- coding: utf-8 -*-

import pdb
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.hybrid.base_hybrid_module import BaseHybridModule
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace
from dcrhino3.unstable.phase_algorithm_helpers import identify_phase_rotation
from dcrhino3.unstable.phase_algorithm_helpers import identify_primary_neighbourhood


class PhaseBalanceHybridModule(BaseHybridModule):
    def __init__(self, json, output_path, process_flow, order):
        BaseHybridModule.__init__(self, json, output_path, process_flow, order)
        self.id = "phase_balance_hybrid"
        self.can_alter_trace = True
        self.can_create_columns = True

    def process_splitted_trace(self, splitted_traces):
        transformed_args = splitted_traces.transformed_args
    	sampling_rate = splitted_traces.dataframe.sampling_rate.iloc[0]

        for component_id in self.components_to_process:
            phase_column_label = '{}-primary_phase_correction'.format(component_id)
            shift_column_label = '{}-primary_time_shift'.format(component_id)
            splitted_traces.dataframe[phase_column_label] = 0.0
            splitted_traces.dataframe[shift_column_label] = 0.0
            data_array = splitted_traces.component_as_array(component_id)
            n_traces, n_samples_per_trace = data_array.shape

            for i_trace in range(n_traces):
                trace_data = data_array[i_trace, :]
                trace = SymmetricTrace(trace_data, sampling_rate)
                mini_trace = identify_primary_neighbourhood(trace, transformed_args)
                phi = identify_phase_rotation(mini_trace.data)
                trace.rotate_recenter_and_trim(phi)
                data_array[i_trace, :] = trace.data
                splitted_traces.dataframe[phase_column_label].loc[i_trace] = phi
                splitted_traces.dataframe[shift_column_label].loc[i_trace] = trace.applied_shift

            splitted_traces.assign_component_from_array(component_id, data_array)
        return splitted_traces




