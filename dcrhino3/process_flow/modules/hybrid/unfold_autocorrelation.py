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

from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule

def unfold_trace(component_vector):
    left_hand_side = np.flipud(component_vector[1:])
    unfolded_trace = np.hstack((left_hand_side, component_vector))
    return unfolded_trace



class UnfoldAutocorrelationModuleHybrid(BaseTraceModule):
    def __init__(self, json, output_path,process_flow,order):
        BaseTraceModule.__init__(self, json, output_path,process_flow,order)
        self.id = "unfold"

    def process_component(self,component_id, component_vector, global_config):
        """
        @type component_array: numpy array
        @note: Creates a symmetric and centered data acorr decendant data vector
        """
        unfolded_trace = unfold_trace(component_vector)
        return unfolded_trace
