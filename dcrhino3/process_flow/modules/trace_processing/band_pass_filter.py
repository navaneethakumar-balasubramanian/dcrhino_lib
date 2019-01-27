# -*- coding: utf-8 -*-

import pdb
import scipy.signal as ssig

from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule
from dcrhino3.signal_processing.filters import FIRLSFilter

def get_band_pass_filter_taps(global_config):
    """
    """
    corners = [global_config.trapezoidal_bpf_corner_1,
               global_config.trapezoidal_bpf_corner_2,
               global_config.trapezoidal_bpf_corner_3,
               global_config.trapezoidal_bpf_corner_4]
    fir_duration = global_config.trapezoidal_bpf_duration# = 0.02

    firls = FIRLSFilter(corners, fir_duration)
    #pdb.set_trace()
    fir_taps = firls.make(global_config.sampling_rate)
    return fir_taps

class BandPassFilterModule(BaseTraceModule):
    def __init__(self, json, output_path):
        BaseTraceModule.__init__(self, json, output_path)
        self.id = "band_pass_filter"

    def process_component(self,component_id, component_vector, global_config):
        """
        @type component_vector: numpy array
        @TODO: get the filter taps and pass them in;
        @NOTE: Why are we using transformed args rather than the global config
        itself??
        """
        #pdb.set_trace()
        transformed_args = self.get_transformed_args(global_config)

#        output_dict = {}
#        n_samples_in_input_traces = len(component_vector)
#        samples_per_trace = n_samples_in_input_traces
#
#        num_traces = len(df['timestamp'])

        fir_taps = get_band_pass_filter_taps(global_config)
        trace_data = component_vector
        filtered_trace = ssig.filtfilt(fir_taps, 1, trace_data)
        return filtered_trace