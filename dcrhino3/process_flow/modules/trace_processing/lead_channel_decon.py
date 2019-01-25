#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: thiago
def lead_channel_decon(df, global_config):
    @TODO: need to add a control here for "clipping" or "trimming" these
    traces down.  The way this was handled is with min_lag_trimmed_trace
    and max_lag_trimmed_trace; These were set to -0.1 (min) and +0.1 (max).
    We need to make sure that the traces have enough 'slop' on the
    edges that the filtering edge effects do not create artefacts in the data.
#
    t0 = time.time()
    output_dict = {}
    data_processing_stage_designator = 'lead-channel-decon'
    n_samples_in_input_traces = len(df['axial'].iloc[0])
    samples_per_trace = 2*n_samples_in_input_traces - 1
    #pdb.set_trace()


    num_traces = len(df['timestamp'])


    for component_id in global_config.components_to_process:
        output_dict[component_id] = np.full((num_traces, samples_per_trace), np.nan) #Allocate Memory

        for i_trace in range(num_traces):
            n_taps_decon = global_config.num_taps_in_decon_filter
            trace_data = df[component_id].iloc[i_trace]
            acorr_for_filter = trace_data[0:n_taps_decon]
            ATA = scipy.linalg.toeplitz(acorr_for_filter)
            ATAinv = scipy.linalg.inv(ATA)
            x_filter = ATAinv[0,:]
            trace_of_proof = np.hstack((np.flipud(trace_data[1:]), trace_data))
            deconv_trace = np.correlate(trace_of_proof, x_filter,'same')#YES
            output_dict[component_id][i_trace,:] = deconv_trace
        output_dict[component_id] = list(output_dict[component_id])

    output_dict['timestamp'] = df['timestamp']
    dff = pd.DataFrame(output_dict, index=df.index)
    print(time.time() - t0)
    return dff


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

    def process_component(self,component_id, component_array, global_config):
        """
        @type component_array: numpy array
        """
        #pdb.set_trace()
        transformed_args = self.get_transformed_args(global_config)
        #n_samples_in_input_traces = len(component_array)
        #samples_per_trace = 2*n_samples_in_input_traces - 1

        n_taps_decon = transformed_args['num_taps_in_decon_filter']
        trace_data = component_array
        acorr_for_filter = trace_data[0:n_taps_decon]
        ATA = scipy.linalg.toeplitz(acorr_for_filter)
        try:
            ATAinv = scipy.linalg.inv(ATA)
        except scipy.linalg.LinAlgError:
            return acorr_for_filter

        x_filter = ATAinv[0,:]
        trace_of_proof = np.hstack((np.flipud(trace_data[1:]), trace_data))
        deconv_trace = np.correlate(trace_of_proof, x_filter,'same')#YES

        return deconv_trace