#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: karl

.. todo:: Check that the trimmed_trace number of samples and duration is kosher
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
    """
    Interpolate to fit with new upsampling rate
    """
    def __init__(self, json, output_path,process_flow,order):
        BaseTraceModule.__init__(self, json, output_path,process_flow,order)
        self.id = "upsample_sinc"

    def process_component(self,component_id, component_vector, global_config):
        """
        Parameters:
            component_array (numpy array): need min_lag, max_lag, sampling_rate,num_taps_in_decon_filter
        """
        transformed_args = self.get_transformed_args(global_config)
        trimmed_trace_duration = transformed_args.trimmed_trace_duration
        upsample_sampling_rate = transformed_args.upsample_sampling_rate
        upsample_dt = 1./upsample_sampling_rate
        n_samples_output = trimmed_trace_duration / upsample_dt
        #upsample_factor = float(transformed_args.sinc_upsample_factor)
        #confirm integer value, otherwise need to handle differently;
        #if int(upsample_factor)-upsample_factor != 0:
        #    logger.error("sinc interpolator only handles integer valued\
        #                 upsampling factors ")
        #    raise(Exception)
        data = component_vector
        n_obs = len(data)
        #<old way>
        #old_axis = np.arange(len(data))
        #new_axis = np.arange(upsample_factor * n_obs) / upsample_factor
        #</old way>
        #<new way>
        old_axis = np.arange(n_obs) / (1.0* n_obs)
        new_axis = np.arange(n_samples_output) / (1.0* n_samples_output)
        #<new way>
        upsampled_data = sinc_interp(data, old_axis, new_axis)
        #</new way>
#        plt.figure(1)
#        plt.clf()
#        plt.plot(old_axis, data, 'rs', label='old');
#        plt.plot(new_axis, upsampled_data, 'b*', label='new');
#        plt.legend()
#        plt.show()

        return upsampled_data