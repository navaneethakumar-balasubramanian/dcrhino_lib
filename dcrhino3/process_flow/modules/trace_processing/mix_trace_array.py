#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 28 2019

@author: karl

Trace Mixing ala Bob's algorithm
default_json =
{
        "type": "trace_mixing",
        "output_to_file": true,
        "args": {
          "n_mix": 5,
          "n_clip_lr": 1
        }
      },

"""

# -*- coding: utf-8 -*-
import matplotlib.pyplot as plt #for debug
import numpy as np
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.trace_processing.base_trace_array_module import BaseTraceArrayModule

logger = init_logging(__name__)


class TraceMixingArrayModule(BaseTraceArrayModule):
    """
    Try to use bobs trace mixing algorithm or something similar
    """
    def __init__(self, json, output_path,process_flow,order):
        BaseTraceArrayModule.__init__(self, json, output_path,process_flow,order)
        self.id = "trace_mixing"

    def process_component(self,component_id, component_array, transformed_args):
        """
        Parameters:
            component_array (numpy array): need min_lag, max_lag, sampling_rate,num_taps_in_decon_filter

        .. note:: Assumes n_mix is odd.  Clips n_clip_lr from either side of the
            mix before stacking
        """
        n_mix = transformed_args.n_mix #5
        n_clip_lr = transformed_args.n_clip_lr #1
        #n_stack_mix = n_mix - (2 * n_clip_lr)
        if np.mod(n_mix, 2) == 0:
            logger.error("assume n_mix is odd but you provided {}".format(n_mix))
            raise Exception
        n_avg_left = (n_mix - n_clip_lr) // 2
        n_avg_right = n_avg_left#(n_stack_mix - 1) // 2
        n_traces, n_obs = component_array.shape
        mixed_array = np.full(component_array.shape, np.nan)
        for i_trace in range(n_traces):
            #print(i_trace)
            left_index = i_trace - n_avg_left
            right_index = i_trace + n_avg_right + 1
            if left_index < 0:
                #not enough traces to mix left
                mixed_array[i_trace, :] = component_array[i_trace, :]
            elif right_index > n_traces:
                mixed_array[i_trace, :] = component_array[i_trace, :]
            else:
                mix_input = component_array[left_index:right_index, :].copy()
                #print(pre_mix_input.shape)
                mix_input.sort(axis=0)
                mix_input = mix_input[n_clip_lr:n_mix-n_clip_lr]
                #print(pre_mix_input.shape)
                mixxy_mcmix = mix_input.mean(axis=0)
                mixed_array[i_trace] = mixxy_mcmix

        return mixed_array
