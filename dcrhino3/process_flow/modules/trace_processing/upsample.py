#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: karl

@TODO: Check that the trimmed_trace number of samples and duration is kosher


"""

# -*- coding: utf-8 -*-

import numpy as np
import matplotlib.pyplot as plt#for debugging
import pdb
from scipy.interpolate import interp1d

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule
from dcrhino3.signal_processing.interpolation import sinc_interp
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace

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

        @TODO: modify to support  interp_kind == 'sinc' and merge the sinc interpolation
        so all in the same module


        @note: to modify sinc-interpolation to use an integer upsample_factor replace
        #old_axis = np.arange(len(data))
        #new_axis = np.arange(upsample_factor * n_obs) / upsample_factor
        """
        #pdb.set_trace()
        transformed_args = self.get_transformed_args(global_config)
        interp_kind = transformed_args.upsample_interpolation_kind

        input_dt = 1./transformed_args.sampling_rate #original

        #trimmed_trace_duration = transformed_args.trimmed_trace_duration + input_dt #odd number of samples, symmetric about zero
        upsample_sampling_rate = transformed_args.upsample_sampling_rate
        upsample_dt = 1./upsample_sampling_rate
        n_samples_input = len(component_vector)

        min_lag = transformed_args.min_lag_trimmed_trace
        max_lag = transformed_args.max_lag_trimmed_trace
        input_sampling_rate = transformed_args.sampling_rate
        input_dt = 1. / input_sampling_rate #original


        #original_time_vector_old = input_dt * np.arange(n_samples_input) - np.abs(min_lag) #+input_dt
        #<For symmetric traces>
        if np.mod(n_samples_input,2) == 1:
            input_trace = SymmetricTrace(component_vector, input_sampling_rate)
            original_time_vector = input_trace.time_vector
            steps_in_max_lag = int(np.abs(max_lag)/upsample_dt)
            upsampled_time_vector = upsample_dt * np.arange(steps_in_max_lag + 1)
            left_hand_side = -np.flipud(upsampled_time_vector[1:])
            upsampled_time_vector = np.hstack((left_hand_side, upsampled_time_vector))
            #after thinking pretty deeply about this for way too long I have decided
            #the above expression is correct; technically we should have a few more points
            #but they would be extrapolation points and we would trim them anyhow; knk 20190204

        #</For symmetric traces>
        else:
            original_time_vector = input_dt * np.arange(n_samples_input) - np.abs(min_lag)
            trimmed_trace_duration = max_lag + np.abs(min_lag)
            n_samples_upsampled_trace = trimmed_trace_duration / upsample_dt #should be odd
            upsampled_time_vector = upsample_dt * np.arange(n_samples_upsampled_trace) - np.abs(min_lag)
            logger.warning("untested with even number of points")
        if interp_kind == 'sinc':
            data = component_vector
            upsampled_data = sinc_interp(data, original_time_vector, upsampled_time_vector)
        else:

            interp_function = interp1d(original_time_vector, component_vector,
                                       kind=interp_kind, bounds_error=False,
                                       fill_value=(component_vector[0], component_vector[-1]))
            upsampled_data = interp_function(upsampled_time_vector)

        return upsampled_data