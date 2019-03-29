# -*- coding: utf-8 -*-

import pdb
import scipy.signal as ssig

#from dcrhino3.process_flow.modules.trace_processing.base_trace_array_module import BaseTraceArrayModule
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.hybrid.base_hybrid_module import BaseHybridModule
from dcrhino3.signal_processing.filters import FIRLSFilter

logger = init_logging(__name__)

def get_firls(transformed_args):
    """
    """
    corners = [transformed_args.trapezoidal_bpf_corner_1,
               transformed_args.trapezoidal_bpf_corner_2,
               transformed_args.trapezoidal_bpf_corner_3,
               transformed_args.trapezoidal_bpf_corner_4]
    fir_duration = transformed_args.trapezoidal_bpf_duration# = 0.02

    firls = FIRLSFilter(corners, fir_duration)
    return firls
#    #pdb.set_trace()
#    fir_taps = firls.make(transformed_args.sampling_rate)
#    return fir_taps

class BandPassFilterModuleHybrid(BaseHybridModule):

    def __init__(self, json, output_path,process_flow,order):
        BaseHybridModule.__init__(self, json, output_path,process_flow,order)
        self.id = "band_pass_filter"

    def process_splitted_trace(self, splitted_traces):
        """
        @type component_array: numpy array
        @note: Creates a symmetric and centered data acorr decendant data vector
        """
        #pdb.set_trace()
        logger.warning("hybrid bandpass assumes the first trace has same sampling rate\
                       as all traces passed in splitted_trace")
        firls = get_firls(splitted_traces.transformed_args)
        sampling_rate = splitted_traces.dataframe.sampling_rate.iloc[0]
        fir_taps = firls.make(sampling_rate)
        for component_id in self.components_to_process:
            data_array = splitted_traces.component_as_array(component_id)
            n_traces, n_samples_per_trace = data_array.shape

            for i_trace in range(n_traces):
                trace_data = data_array[i_trace,:]
                filtered_trace = ssig.filtfilt(fir_taps, 1, trace_data)
                data_array[i_trace,:] = filtered_trace

            splitted_traces.assign_component_from_array(component_id, data_array)
        return splitted_traces
#
#    def process_component(self,component_id, component_vector, global_config):
#        """
#        @type component_vector: numpy array
#        @TODO: get the filter taps and pass them in;
#        @NOTE: Why are we using transformed args rather than the global config
#        itself??
#        """
#
#        transformed_args = self.get_transformed_args(global_config)
#
##        output_dict = {}
##        n_samples_in_input_traces = len(component_vector)
##        samples_per_trace = n_samples_in_input_traces
##
##        num_traces = len(df['timestamp'])
#
#        fir_taps = get_band_pass_filter_taps(transformed_args)
#        trace_data = component_vector
#        filtered_trace = ssig.filtfilt(fir_taps, 1, trace_data)
#        return filtered_trace