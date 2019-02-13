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

The code here is modified from the dev branch of dchrino_lib
dcrhino/analysis/unstable/v03/test_can_process_acorr_to_features.py
"""

# -*- coding: utf-8 -*-

import numpy as np
import pdb
import scipy.linalg

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace

logger = init_logging(__name__)


class TrimTraceModule(BaseTraceModule):
    def __init__(self, json, output_path):
        BaseTraceModule.__init__(self, json, output_path)
        self.id = "trim"

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

        min_lag = transformed_args.min_lag_trimmed_trace
        max_lag = transformed_args.max_lag_trimmed_trace
        if np.abs(min_lag) != np.abs(max_lag):
            logger.warning("expected min_lag and max_lag to have same size ... \
                           need to review trimming and interpolation ...")
            logger.info("also, may want to add this check to Config()")

        t0_index = trace.t0_index

        n_samples_back = int(sampling_rate * np.abs(min_lag))
        n_samples_fwd = int(sampling_rate * max_lag) + 1
        back_ndx = t0_index - n_samples_back
        fin_ndx = t0_index + n_samples_fwd
        #pdb.set_trace()
        trimmed_trace = trace.data[back_ndx:fin_ndx]

        return trimmed_trace
