#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 28 2019

@author: karl
default_json =
{
        "type": "balance",
        "output_to_file": true,
        "args": {
          "sampling_rate": "|global_config.sampling_rate|",
          "sensor_distance_to_source": "|global_config.sensor_distance_to_source|",
          "sensor_distance_to_shocksub": "|global_config.sensor_distance_to_shocksub|",
          "ACOUSTIC_VELOCITY": "|global_config.ACOUSTIC_VELOCITY|",
          "SHEAR_VELOCITY": "|global_config.SHEAR_VELOCITY|",
          "n_mix": 5,
          "n_clip_lr": 1
        }
      },

"""

# -*- coding: utf-8 -*-

import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace

logger = init_logging(__name__)


class RotateModule(BaseTraceModule):
    def __init__(self, json, output_path,process_flow,order):
        BaseTraceModule.__init__(self, json, output_path,process_flow,order)
        self.id = "rotate"

    def process_component(self,component_id, component_vector, global_config):
        """
        @type component_array: numpy array
        .. todo:: in the updated version we want to add phi to the trace_dataframe;
        this also means that it needs to be formalized as a name which means
        take the labeling from K0 for phi and apply it here;

        """

        transformed_args = self.get_transformed_args(global_config)
        phi = transformed_args.phi
        sampling_rate = transformed_args.sampling_rate
        trace = SymmetricTrace(component_vector, sampling_rate)
        trace.rotate_recenter_and_trim(phi)


        return trace.data
