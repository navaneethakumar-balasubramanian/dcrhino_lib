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

The code here is modified from the dev branch of dchrino_lib in
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
        @note: 20180128: this is now expecting an 'unfolded' acorr, which will have
        an odd number of samples;
        @note: 20180204: added Trim to this method.  Note that I am removing
        two extra samples ... this could be becuase t0_index is not dead center
        after filtering, but one sample earlier than center ...
        THe input trace in my tests was 3999 points, using a 500 point filter,
        and the output trace was 3497 points (rather than 3499 as expected).
        It could be that we should switch to an odd numbered decon filter for
        these acorr traces ...
        @TODO: try using odd-number-taps acorr filter to maintain 3999 points
        (i.e. shift back by 1 the t0_index ... need to test to see its really true)
        """
        #pdb.set_trace()
        transformed_args = self.get_transformed_args(global_config)
        trace_data = component_vector
        n_samples_in_input_trace = len(trace_data)
        zero_lag_index = (n_samples_in_input_trace -1) // 2
        #can sanity check this should be the argmax
        #samples_per_trace = 2*n_samples_in_input_traces - 1
        #pdb.set_trace()
        n_taps_decon = transformed_args.num_taps_in_decon_filter
        acorr_for_filter = trace_data[zero_lag_index : zero_lag_index + n_taps_decon]
        ATA = scipy.linalg.toeplitz(acorr_for_filter)
        try:
            ATAinv = scipy.linalg.inv(ATA)
        except scipy.linalg.LinAlgError:
            ATAinv = np.zeros(ATA.shape)
            #print("this is only going to make things worse")
            #return trace_data #ok if unfolded
#            dummy_trace_of_expected_length = np.hstack((np.flipud(trace_data[1:]), trace_data))
#            return dummy_trace_of_expected_length

        x_filter = ATAinv[0,:]
#        trace_of_proof = np.hstack((np.flipud(trace_data[1:]), trace_data))
        deconv_trace = np.correlate(trace_data, x_filter,'same')#YES
        t0_index = (len(deconv_trace)+1) // 2
        t0_index += n_taps_decon // 2 #-1 more here to make clean  reduction by n_taps_decon
        n_valid_samples_rhs = len(deconv_trace) - t0_index
        n_valid_samples_lhs = n_valid_samples_rhs - 1
        output_trace = deconv_trace[t0_index-n_valid_samples_lhs:len(deconv_trace)]

        #pdb.set_trace()

        return output_trace
