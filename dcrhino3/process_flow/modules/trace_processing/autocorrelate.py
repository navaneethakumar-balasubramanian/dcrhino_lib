# -*- coding: utf-8 -*-

import numpy as np

from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule

def autocorrelate_trace(trace_data, n_pts):
        """
        n_pts: integer, this is the number of taps in the decon filter that will be solved for
        WARNING  wants even # points
        """
        zero_time_index = len(trace_data)//2
        acorr = np.correlate(trace_data, trace_data,'same')
        return acorr[zero_time_index:zero_time_index+n_pts]

class AutoCorrelateModule(BaseTraceModule):
    def __init__(self):
        self.id = "autocorrelate"

    