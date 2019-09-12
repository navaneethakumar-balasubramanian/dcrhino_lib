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
        self.id = "band_pass_filter_hybrid"

    def validate(self):
        for attribute, value in  self.args.items():
            if type(value) == str and "|global_config" in value:
                logger.warn("It cant rely on global config arg:{} value:{}".format(attribute,value))
                return False
        return True


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
