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
from dcrhino3.unstable.phase_algorithm_helpers import identify_phase_rotation
from dcrhino3.unstable.phase_algorithm_helpers import identify_primary_neighbourhood

logger = init_logging(__name__)


class BalanceModule(BaseTraceModule):
    def __init__(self, json, output_path,process_flow,order):
        BaseTraceModule.__init__(self, json, output_path,process_flow,order)
        self.id = "balance"

    def process_component(self,component_id, component_vector, global_config):
        """
        @type component_array: numpy array
        need min_lag, max_lag, sampling_rate,num_taps_in_decon_filter
        @warn: This assumes a symmetric and centered data vector obtained
        from an autocorrelation; i.e. the center value in the trace corresponds
        to lag=0 sample;
        @warn: number of samples in input trace is odd, and one less than some
        nice round number, becasue its the acorr-symmetric expansion
        @note 20190204: modified this to maintain trace symmetery, i.e. we add the same number of samples
        to the back as to the front.  This does rely on min_lag and max_lag being
        opposite and equal.  In this way time vectors will always be
        dt*np.arange(len(data)) - M;# where M = (len(data) -1)/2
        @note: Shift correction for deconvolution filter assumed not yet
        applied ... In a future version this can be changed so that the
        output from the deconvolution is "trimmed" to symmetery
        The decon filter is currently 100ms long.  This means that we have
        acorr_trace_length - 100ms of "clean data", which is 400ms-100ms = 300ms
        This is plenty for any band pass we will want to employ.
        @change 20190204: decon shift applied previously
        @note 20190205: Not using the time_vector now but still casting as Symmetric trace - can be removed if prefer
        """

        transformed_args = self.get_transformed_args(global_config)
        sampling_rate = transformed_args.sampling_rate
        trace = SymmetricTrace(component_vector, sampling_rate)
        mini_trace = identify_primary_neighbourhood(trace, transformed_args)
        phi = identify_phase_rotation(mini_trace.data)
        trace.rotate_recenter_and_trim(phi)


        return trace.data
