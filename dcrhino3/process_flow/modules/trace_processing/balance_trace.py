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
          "ACOUSTIC_VELOCITY": "|global_config.ACOUSTIC_VELOCITY|"
        }
      },

"""

# -*- coding: utf-8 -*-

import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace
from dcrhino3.unstable.phase_algorithm_helpers import identify_phase_rotation
from dcrhino3.unstable.phase_algorithm_helpers import identify_primary_neighbourhood

logger = init_logging(__name__)


class BaseTraceModule(BaseTraceModule):
    def __init__(self, json, output_path,process_flow,order):
        BaseTraceModule.__init__(self, json, output_path,process_flow,order)
        self.id = "balance"

    def process_component(self,component_id, component_vector, global_config):
        """
        @type component_id: string
        """

        transformed_args = self.get_transformed_args(global_config)
        sampling_rate = transformed_args.sampling_rate
        trace = SymmetricTrace(component_vector, sampling_rate)
        mini_trace = identify_primary_neighbourhood(trace, transformed_args)
        phi = identify_phase_rotation(mini_trace.data)
        trace.rotate_recenter_and_trim(phi)


        return trace.data
