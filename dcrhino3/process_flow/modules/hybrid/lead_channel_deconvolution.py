#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Mar 28 2019

@author: karl

"""

# -*- coding: utf-8 -*-
import numpy as np
import pdb
import scipy.linalg

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.hybrid.base_hybrid_module import BaseHybridModule

logger = init_logging(__name__)


class LeadChannelDeconvolutionModuleHybrid(BaseHybridModule):
    def __init__(self, json, output_path, process_flow,order):
        BaseHybridModule.__init__(self, json, output_path, process_flow, order)
        self.id = "lead_channel_deconvolution"

    def sort_out_filter_length(self, splitted_traces):
        """
        before we set up the equations to solve for the decon filter we need
        to decide how many taps are in the filter.  We can do this either by
        explicitly saying how many taps (as we have been doing until 28 mar 2019)
        or we can specify the filter duration.

        For some reason the number of taps is forced here to be even 20190328
        I cannot remember my reasoning why ... it maybe fine to use odd ...
        something about keeping the center of the ts clear ...

        """
        try:
            n_taps = splitted_traces.transformed_args.num_taps_in_decon_filter
        except AttributeError:
            n_taps = None

        try:
            filter_duration = splitted_traces.transformed_args.deconvolution_filter_duration
        except AttributeError:
            filter_duration = None


        if (n_taps is not None) and (filter_duration is not None):
            logger.error("We still need to add a handler for this case which\
                         checks to make sure the n_taps and filter_duration\
                         are mutually consistent, or set one to override the other")
            raise Exception
        if (n_taps is None) and (filter_duration is None):
            logger.error("you need to specify either num_taps or filter_duration")
            raise Exception

        if n_taps is None:
            sampling_rate = splitted_traces.dataframe.sampling_rate.iloc[0]
            dt = 1./sampling_rate
            n_taps = int(filter_duration / dt)
            if np.remainder(n_taps, 2)==1:
                n_taps+=1
            return n_taps

        if filter_duration is None:
            return n_taps

    def sanity_check_filter_duration(self, n_samples_per_trace, n_taps):
        """
        :param samples_per_trace:
        :param n_taps: the number of points in the deconvolution filter we will solve for
        :return:
        :var threshold: This is the fraction of the data duration that the filter is expected to be shorter than.
        i.e. if the data_duration were 1s, and the threshold was 0.25, we would only admit filters shorter than
        0.25s duration.

        Note: This does not actually need sampling_rate, it can be done simply by looking at
        n_taps/n_samples_per_trace < threshold.  Sampling rate is basically there to
        """
        threshold = 0.5
        filter_fraction = 1.0 * n_taps / n_samples_per_trace
        if filter_fraction < threshold:
            return
        else:
            error_message = "decon filter length is {} of the acorr trace duration -- too long!".format(filter_fraction)
            logger.critical(error_message)
            error_message = "We only tolerate decon filter up to {}x input trace duration".format(threshold)
            logger.error(error_message)
            raise Exception

    def process_splitted_trace(self, splitted_traces):
        """
        @type component_array: numpy array
        @note: Creates a symmetric and centered data acorr decendant data vector
        """
        logger.warning("lead channel decon assumes the first trace has same sampling rate\
                       as all traces passed in splitted_trace")
        logger.info("lead channel decon only supports even length filters right now")

        n_taps = self.sort_out_filter_length(splitted_traces)

        for component_id in self.components_to_process:
            
            data_array = splitted_traces.component_as_array(component_id)
            n_traces, n_samples_per_trace = data_array.shape
            sampling_rate = splitted_traces.dataframe.sampling_rate.iloc[0]
            self.sanity_check_filter_duration(n_samples_per_trace, n_taps)
            t0_index = (n_samples_per_trace + 1) // 2 #
            t0_index += n_taps // 2 #-1 more here to make clean  reduction by n_taps_decon
            n_valid_samples_rhs = n_samples_per_trace - t0_index
            n_valid_samples_lhs = n_valid_samples_rhs - 1
            n_samples_output_trace = n_samples_per_trace - (t0_index-n_valid_samples_lhs)
            output_trace_array = np.full((n_traces, n_samples_output_trace), np.nan )
            zero_lag_index = (n_samples_per_trace -1) // 2

            for i_trace in range(n_traces):
                #print(i_trace)
                trace_data = data_array[i_trace,:]
                acorr_for_filter = trace_data[zero_lag_index : zero_lag_index + n_taps]
                ATA = scipy.linalg.toeplitz(acorr_for_filter)
                try:
                    ATAinv = scipy.linalg.inv(ATA)
                except scipy.linalg.LinAlgError:
                    ATAinv = np.zeros(ATA.shape)
                except ValueError:
                    #pdb.set_trace()
                    logger.warning("Nan or Inf detected in ATA")
                    ATAinv = np.zeros(ATA.shape)
                x_filter = ATAinv[0,:]
                deconv_trace = np.correlate(trace_data, x_filter,'same')#YES
                deconv_trace = deconv_trace[t0_index-n_valid_samples_lhs : n_samples_per_trace]
                output_trace_array[i_trace, :] = deconv_trace
            splitted_traces.assign_component_from_array(component_id, output_trace_array)

        return splitted_traces
