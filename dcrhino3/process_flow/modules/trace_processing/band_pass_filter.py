# -*- coding: utf-8 -*-

import pdb
import scipy.signal as ssig

from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule
from dcrhino3.signal_processing.filters import FIRLSFilter

def get_band_pass_filter_taps(transformed_args):
    """
    Get number of coeffs for the band pass filter
    """
    corners = [transformed_args.trapezoidal_bpf_corner_1,
               transformed_args.trapezoidal_bpf_corner_2,
               transformed_args.trapezoidal_bpf_corner_3,
               transformed_args.trapezoidal_bpf_corner_4]
    fir_duration = transformed_args.trapezoidal_bpf_duration# = 0.02

    firls = FIRLSFilter(corners, fir_duration)
    fir_taps = firls.make(transformed_args.sampling_rate)
    return fir_taps

class BandPassFilterModule(BaseTraceModule):
    """
    Control the bandpass filter module
    """
    def __init__(self, json, output_path,process_flow,order):
        BaseTraceModule.__init__(self, json, output_path,process_flow,order)
        self.id = "band_pass_filter"

    def process_component(self,component_id, component_vector, global_config):
        """
        Convert transformed args to usable values for the balance trace module to get even data

        Parameters:
            component_array (numpy array): need min_lag, max_lag, sampling_rate,num_taps_in_decon_filter

        .. todo:: get the filter taps and pass them in;

        .. note:: Why are we using transformed args rather than the global config
            itself??

        """
        transformed_args = self.get_transformed_args(global_config)

#        output_dict = {}
#        n_samples_in_input_traces = len(component_vector)
#        samples_per_trace = n_samples_in_input_traces
#
#        num_traces = len(df['timestamp'])

        fir_taps = get_band_pass_filter_taps(transformed_args)
        trace_data = component_vector
        filtered_trace = ssig.filtfilt(fir_taps, 1, trace_data)
        return filtered_trace