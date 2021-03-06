# -*- coding: utf-8 -*-

import numpy as np

from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule

def autocorrelate_trace(trace_data, n_pts, copy_input=False):
        """
        n_pts: integer, this is the number of taps in the decon filter that will be solved for
        copy_input, this function is used in the realtime acquisition display and when the data is not copied
        it removes any DC offset prior to displaying the data and that is misleading.  This argument prevents that
        from happening.
        WARNING  wants even # points
        .. :CHANGE: 20190524 modifying this to subtract the mean
        """

        zero_time_index = len(trace_data)//2
        dc_offset = np.mean(trace_data)
        if copy_input:
            temp = trace_data - dc_offset
            acorr = np.correlate(temp, temp, 'same')
        else:
            trace_data -= dc_offset #needs to go on the data frame
            acorr = np.correlate(trace_data, trace_data, 'same')
        return acorr[zero_time_index:zero_time_index+n_pts]

class AutoCorrelateModule(BaseTraceModule):
    def __init__(self, json, output_path, process_flow,order):
        BaseTraceModule.__init__(self, json, output_path, process_flow,order)
        self.id = "autocorrelate"
