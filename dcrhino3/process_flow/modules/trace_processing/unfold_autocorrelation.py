#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: karl

.. todo:: Implement this using BaseArrayModule rather than BaseTraceModule
"""

# -*- coding: utf-8 -*-

import numpy as np
import pdb

from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule

def unfold_trace(component_vector):
    """
    Flip left hand side depth vector, create unfolded trace by stacking and return it

    Args:
        component_vector: data to unfold

    Returns:
        unfolded trace where LHS mirrors RHS
    """
    left_hand_side = np.flipud(component_vector[1:])
    unfolded_trace = np.hstack((left_hand_side, component_vector))
    return unfolded_trace



class UnfoldAutocorrelationModule(BaseTraceModule):
    """
    Control the unfold module with values set in json
    """
    def __init__(self, json, output_path,process_flow,order):
        BaseTraceModule.__init__(self, json, output_path,process_flow,order)
        self.id = "unfold"

    def process_component(self, component_id, component_vector, global_config):
        """
        Unfold trace of component and return it

       Parameters:
            component_array (numpy array): need min_lag, max_lag, sampling_rate,num_taps_in_decon_filter

        Returns:
            unfolded trace from :meth:`unfold_trace`

        .. note:: Creates a symmetric and centered data acorr decendant data vector
        """
        unfolded_trace = unfold_trace(component_vector)
        return unfolded_trace
