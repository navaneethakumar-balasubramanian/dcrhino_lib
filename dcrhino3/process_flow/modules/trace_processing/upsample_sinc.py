#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: karl

@TODO: Check that the trimmed_trace number of samples and duration is kosher
I think that the change to autocorrelation-based processing from simple resampled

"""

# -*- coding: utf-8 -*-

import numpy as np
import matplotlib.pyplot as plt#for debugging
import pdb
from scipy.interpolate import interp1d

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.interpolation import sinc_interp
from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule

logger = init_logging(__name__)

class UpsampleSincModule(BaseTraceModule):
    def __init__(self, json, output_path):
        BaseTraceModule.__init__(self, json, output_path)
        self.id = "upsample_sinc"

    def process_component(self,component_id, component_vector, global_config):
        """
        @type component_array: numpy array
        """
        #pdb.set_trace()
        transformed_args = self.get_transformed_args(global_config)
        #input_dt = 1./transformed_args.sampling_rate #original
        upsample_factor = float(transformed_args.sinc_upsample_factor)
        #confirm integer value, otherwise need to handle differently;
        if int(upsample_factor)-upsample_factor != 0:
            logger.error("sinc interpolator only handles integer valued\
                         upsampling factors ")
            raise(Exception)
        data = component_vector
        n_obs = len(data)
        old_axis = np.arange(len(data))
        new_axis = np.arange(upsample_factor * n_obs) / upsample_factor
        upsampled_data = sinc_interp(data, old_axis, new_axis)


        return upsampled_data