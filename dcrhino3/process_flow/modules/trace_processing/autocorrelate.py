# -*- coding: utf-8 -*-

import numpy as np
from scipy.signal import correlate
from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule
'''
def autocorrelate_trace(trace_data, n_pts):
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
'''

def clip_to_absolute_median(x, n_med):
    """
    """
    med_abs = np.median(np.abs(x))
    threshold = n_med * med_abs
    x = np.clip(x, -threshold, threshold)
    return x


def autocorrelate_trace(trace_data, n_samples_output, copy_input=False, n_med_clip=np.inf):
    """
    ::TODO:: add doc on what copy_input is used for, why is it here?  
    numeric result appears to be the same ... 
    n_samples_output: decided by cfg.PROCESSING.auto_correlation_trace_duration
    and the data sampling rate.  Must be greater than or equal to the number of
    taps in the decon filter
    ::var:: reference_index, is there to make sure both odd and even numbered 
    traces are returned with acorr at lag 0 in the output[0]
    """        
    
    dc_offset = np.mean(trace_data)
    if copy_input:
        temp = trace_data - dc_offset
        temp = clip_to_absolute_median(temp, n_med_clip)
        acorr = correlate(temp, temp)
    else :
        trace_data -= dc_offset  # needs to go on the data frame
        trace_data = clip_to_absolute_median(trace_data, n_med_clip)
        acorr = correlate(trace_data, trace_data)
    
    reference_index = len(trace_data) // 2
    ndx_zero_lag = reference_index * 2 - 1
    output = acorr[ndx_zero_lag:ndx_zero_lag + n_samples_output]
    return output


class AutoCorrelateModule(BaseTraceModule):
    def __init__(self, json, output_path, process_flow,order):
        BaseTraceModule.__init__(self, json, output_path, process_flow,order)
        self.id = "autocorrelate"
        

def test():
    import numpy as np
    import matplotlib.pyplot as plt
    trace_data = np.random.rand(1000);
    trace_data[10] = 10;
    n_samples_output = 400;
    
    acorr1 = autocorrelate_trace(trace_data, n_samples_output, copy_input=False)
    acorr2 = autocorrelate_trace(trace_data, n_samples_output, copy_input=False, n_med_clip=3.0)
    plt.plot(acorr1, label='no clip')
    plt.plot(acorr2, label='clip')
    plt.legend()
    plt.show()
    
def __main__():
    test()
    
if __name__ == '__main__':
    __main__()