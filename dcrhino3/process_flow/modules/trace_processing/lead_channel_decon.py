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



class LeadChannelDeconvolutionModule(BaseTraceModule):
    def __init__(self, json, output_path):
        BaseTraceModule.__init__(self, json, output_path)
        self.id = "lead_channel_deconvolution"

    def process_component(self,component_id, component_vector, global_config):
        """
        @type component_array: numpy array
        @TODO: this should also return the filter as there is probably some
        physical rock property info in the filter coefficients
        This doesn't seem supported in v3; change for v3.1;
        @TODO: Add trim to this methid so tht deconv trace gets trimmed here?
        """
        #pdb.set_trace()
        transformed_args = self.get_transformed_args(global_config)
        #n_samples_in_input_traces = len(component_array)
        #samples_per_trace = 2*n_samples_in_input_traces - 1

        n_taps_decon = transformed_args['num_taps_in_decon_filter']
        trace_data = component_vector
        acorr_for_filter = trace_data[0:n_taps_decon]
        ATA = scipy.linalg.toeplitz(acorr_for_filter)
        try:
            ATAinv = scipy.linalg.inv(ATA)
        except scipy.linalg.LinAlgError:
            dummy_trace_of_expected_length = np.hstack((np.flipud(trace_data[1:]), trace_data))
            return dummy_trace_of_expected_length

        x_filter = ATAinv[0,:]
        trace_of_proof = np.hstack((np.flipud(trace_data[1:]), trace_data))
        deconv_trace = np.correlate(trace_of_proof, x_filter,'same')#YES

        return deconv_trace