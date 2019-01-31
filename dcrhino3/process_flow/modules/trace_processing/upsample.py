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
from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule

logger = init_logging(__name__)

class UpsampleModule(BaseTraceModule):
    def __init__(self, json, output_path):
        BaseTraceModule.__init__(self, json, output_path)
        self.id = "upsample"

    def process_component(self,component_id, component_vector, global_config):
        """
        @type component_array: numpy array
        needed vars: input_sampling_rate (dt), min_lag, n_samples_trimmed_trace

        @TODO: check time vectors are symmetric about zero; Better yet, add a
        helper function to return symmetric time vector based on n_samples (odd)
        and sampling rate;
        @TAI: gates and fenceposts ... duration = n_samples*dt (no +/-1's involved)
        i.e.: expect 200ms + input_dt as duration

        @var: interp_kind = quadratic', 'cubic', 'linear'

        @WARNING: fill_value=(component_vector[0], component_vector[-1]) vs
        fill_value='extrapolate' has not been evaluated ... it shouldn't matter
        since the places this is applied are not used by feature extractor ..
        but I don;t like the extrapolation because you can get very large values at
        the end points which could muck up filtering, and I don't like
        (component_vector[0], component_vector[-1]) because fourier methods will
        inherit an artefact ... not sure how to test this exactly


        The input vector is assumed to be sampled at global_config.output_sampling_rate,
        The output vector is sampled at transformed_args.upsample_sampling_rate
        There is an extra sample in each when using v3, that way the signal is symmetric
        about the "theoretical, undeconvolved zero-time", which gives us a refernce
        from which to quantify the effect of the deconvolution filter ...
        @note: we should make sure to make the returned arguments from
        trace_processing.modules are optionally multivalued ... for example we may
        want to study the variations in the deconvolution filter w.r.t. the phase
        rotation and time shift parameters

        """
        #pdb.set_trace()
        transformed_args = self.get_transformed_args(global_config)
        interp_kind = transformed_args.upsample_interpolation_kind
        max_lag = transformed_args.max_lag_trimmed_trace
        min_lag = transformed_args.min_lag_trimmed_trace
        input_dt = 1./transformed_args.sampling_rate #original
        upsample_sampling_rate = transformed_args.upsample_sampling_rate
        upsampled_dt = 1./upsample_sampling_rate

        trimmed_trace_duration = max_lag - min_lag + input_dt
        n_samples_input_trimmed_trace = len(component_vector)
        logger.warning("v3 needs a review of the trimmed_trace_duration attr of global_config ...\
                       Now an od vs even number of samples in trimmed trace")
        original_time_vector = input_dt * np.arange(n_samples_input_trimmed_trace) - np.abs(min_lag)

        #pdb.set_trace()
        n_samples_upsampled_trace = trimmed_trace_duration / upsampled_dt #should be odd
        upsampled_time_vector = upsampled_dt * np.arange(n_samples_upsampled_trace) - np.abs(min_lag)

        pdb.set_trace()
        interp_function = interp1d(original_time_vector, component_vector,
                                   kind=interp_kind, bounds_error=False,
                                   fill_value=(component_vector[0], component_vector[-1]))
        upsampled_data = interp_function(upsampled_time_vector)
#        plt.plot(original_time_vector, component_vector, 'bs', label='original')
#        plt.plot(upsampled_time_vector, upsampled_data, 'r*', label='upsampled')
#        plt.legend();plt.show()


        return upsampled_data