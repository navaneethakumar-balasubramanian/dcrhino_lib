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

from dcrhino3.process_flow.modules.hybrid.base_hybrid_module import BaseHybridModule

def unfold_trace_2d(data_array):
    """
    assumes one row per trace, columns are
    ..todo: migrate this and other unfold into sigproc
    """
    left_hand_side = np.fliplr(data_array[:,1:])
    unfolded_data = np.hstack((left_hand_side, data_array))
    return unfolded_data

class UnfoldAutocorrelationModuleHybrid(BaseHybridModule):
    def __init__(self, json, output_path, process_flow,order):
        BaseHybridModule.__init__(self, json, output_path, process_flow, order)
        self.id = "unfold"

    def process_splitted_trace(self, splitted_trace):
        """
        @type component_array: numpy array
        @note: Creates a symmetric and centered data acorr decendant data vector
        """
        for component_id in self.components_to_process:
            data_array = splitted_trace.component_as_array(component_id)
            unfolded_data = unfold_trace_2d(data_array)
            splitted_trace.assign_component_from_array(component_id, unfolded_data)

        return splitted_trace
