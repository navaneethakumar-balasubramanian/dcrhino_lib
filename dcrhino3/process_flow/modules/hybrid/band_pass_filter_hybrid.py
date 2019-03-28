# -*- coding: utf-8 -*-

import pdb
import scipy.signal as ssig

from dcrhino3.process_flow.modules.trace_processing.base_trace_array_module import BaseTraceArrayModule
from dcrhino3.signal_processing.filters import FIRLSFilter
    
def get_band_pass_filter_taps(transformed_args):
    """
    """
    corners = [transformed_args.trapezoidal_bpf_corner_1,
               transformed_args.trapezoidal_bpf_corner_2,
               transformed_args.trapezoidal_bpf_corner_3,
               transformed_args.trapezoidal_bpf_corner_4]
    fir_duration = transformed_args.trapezoidal_bpf_duration# = 0.02

    firls = FIRLSFilter(corners, fir_duration)
    #pdb.set_trace()
    fir_taps = firls.make(transformed_args.sampling_rate)
    return fir_taps

class BandPassFilterModuleHybrid(BaseTraceArrayModule):
    
    def __init__(self, json, output_path,process_flow,order):
        BaseTraceArrayModule.__init__(self, json, output_path,process_flow,order)
        self.id = "band_pass_filter"

    def process_component(self,component_id, component_vector, global_config):
        """
        @type component_vector: numpy array
        @TODO: get the filter taps and pass them in;
        @NOTE: Why are we using transformed args rather than the global config
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