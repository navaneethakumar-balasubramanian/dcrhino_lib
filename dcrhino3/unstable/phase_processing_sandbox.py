# -*- coding: utf-8 -*-
"""
Created on Thu Feb  7 17:00:11 2019

@author: kkappler
#Algorithm:
    1. Center on the trace middle sample, and then find the maximum amplitude sample;
    (within an window, say 10ms wide (1/100hz, low corner of bandpass))

    2. Now cetered on the max, find the minumum in the same window ...

    3. THe max - min is telling you something about the period of the primary
    wavelet.  It is telling you how far to look left and right for the trough
    3A: to validate that this will work in general, take a few traces and rotate them
    through 90, 180, 270 and see that you get the same DELTA-AMPLITUDE / DELTA TIME
    THis should represent a sort-of max continuous slope...

    4. Now that you have a trough-width (in time or samples) you run
    determine_phase_state()

    5. Then run identify_phase_rotation()

    6. Apply rotation,
    7. MOve t=zero to be centered on the new trace (and trim to symmetery)

    8 Call K1 feature extract ... use J1 but -90 M1 and +90 M3
plt.plot(trace, 'bs');plt.show()

"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

#home = os.path.expanduser("~/")
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.signal_processing.phase_rotation import determine_phase_state
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace
from dcrhino3.feature_extraction.feature_extractor_j1a import get_expected_multiple_times
#from dcrhino3.signal_processing.phase_rotation import identify_phase_rotation

def check_condition_that_makes_me_nervous(data):
    if np.argmax(data) != np.argmax(np.abs(data)):
        implication="this means the global maximum deviation from zero\
        is to the negative ... I hope this is not ever the case for the\
        primary peak, it would add complexity to thinking about this algorithm"
        print('oh dear')
        print(implication)
        pdb.set_trace()

def identify_primary_neighbourhood(symmetric_trace_in, global_config):
    """
    This can be done with zero-crossings ... or with max-min ...
    1. Trim to expected multiple time, left and right of input trace
    This means the trace is now small (for math operations)
    """
    symmetric_trace = symmetric_trace_in._clone()
    qq = get_expected_multiple_times(global_config)
    #n_steps_keep = int(qq[symmetric_trace.component_id] / symmetric_trace.dt)
    n_steps_keep = int(qq['axial'] / symmetric_trace.dt)
    #mrs_trace.plot()
    symmetric_trace.trim_to_num_points_lr(n_steps_keep)
    signs = np.sign(symmetric_trace.data)
    d_signs = np.diff(signs) #when index i of d_signs is +2 it means
    #a zero crossing happened between index (i-1) and index i of the trace
    #the actual bounding times are time_vector[i-1], time_vector[i]
    discontinuity_indices = np.where(np.abs(d_signs) > 0)[0]
            #num_traces = len(discontinuity_indices) +1 #maybe off by one
    #        timestamp_indices = np.arange(num_traces) * global_config.trace_length_in_seconds
    reference_array = np.split(np.arange(mrs_trace.num_observations), discontinuity_indices+1)
    max_index = np.argmax(symmetric_trace.data)
    #identify which section of reference array are we talking about here
    tmp = [max_index in y for y in reference_array]
    tmp = np.where(tmp)[0][0]
    #keepers = np.asarray([tmp-1, tmp, tmp+1])
    #keepers = np.asarray([tmp-2, tmp-1, tmp, tmp+1, tmp+2])

    neighbourhood_indices = np.hstack(reference_array[tmp-1:tmp+1+1])
    neighbourhood_indices = np.hstack(reference_array[tmp-2:tmp+2+1])
    symmetric_trace.trim_to_indices(neighbourhood_indices)
    return symmetric_trace

data_dir = '/home/kkappler/tmp/dcrhino_lib/bin'
flow = 'v2_processing_flow'
flow = 'v2_processing_flow_with_interpolation_j1a'
component_id = 'axial';
component_id = 'tangential'

data_dir = os.path.join(data_dir, flow)#'/home/kkappler/tmp/dcrhino_lib/bin'
full_h5_file = os.path.join(data_dir,'4_trim.h5'); sampling_rate=5000.0
#full_h5_file = os.path.join(data_dir,'5_upsample.h5');sampling_rate=50000.0
traces_data = TraceData()
traces_data.load_from_h5(full_h5_file)
df = traces_data.dataframe
line_index = 7
row_of_df = df.iloc[line_index]
trace_data = row_of_df['{}_trace'.format(component_id)]
check_condition_that_makes_me_nervous(trace_data)
mrs_trace = SymmetricTrace(trace_data, sampling_rate, component_id=component_id)
global_config = traces_data.global_config_by_index(row_of_df['acorr_file_id'])
pdb.set_trace()
mini_trace = identify_primary_neighbourhood(mrs_trace, global_config)
mini_trace.plot()
pdb.set_trace()
#plt.plot(mini);plt.show()
band_pass_left = 100.0
band_pass_right = 300.0

##Algorithm:
#    1. Center on the trace middle sample, and then find the maximum amplitude sample;
#    (within an window, say 10ms wide (1/100hz, low corner of bandpass))
#
#    2. Now cetered on the max, find the minumum in the same window ...
#
#    3. THe max - min is telling you something about the period of the primary
#    wavelet.  It is telling you how far to look left and right for the trough
#    3A: to validate that this will work in general, take a few traces and rotate them
#    through 90, 180, 270 and see that you get the same DELTA-AMPLITUDE / DELTA TIME
#    THis should represent a sort-of max continuous slope...
#
#    4. Now that you have a trough-width (in time or samples) you run
#    determine_phase_state()
#
#    5. Then run identify_phase_rotation()
#
#    6. Apply rotation,
#    7. MOve t=zero to be centered on the new trace (and trim to symmetery)
#
#    8 Call K1 feature extract ... use J1 but -90 M1 and +90 M3
plt.plot(mrs_trace.time_vector, mrs_trace.data, 'bs', label='trace data');
plt.plot(mrs_trace.time_vector, signs/3, 'r*', label='signs');
plt.plot(mrs_trace.time_vector, np.zeros(mrs_trace.num_observations), 'k')
plt.xlabel('Time (s)')
plt.title('{} component'.format(component_id))
plt.legend()
plt.show()
pdb.set_trace()
print('ok')

def my_function():
    """
    """
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
