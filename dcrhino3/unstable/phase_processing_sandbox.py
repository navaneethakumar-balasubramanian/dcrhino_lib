# -*- coding: utf-8 -*-
"""
Created on Thu Feb  7 17:00:11 2019

@author: kkappler
#Algorithm:
    1. Center on the trace middle sample, and then find the maximum amplitude sample;
    (within an window, say 10ms wide (1/100hz, low corner of bandpass))

    2. Now cetered on the max, find the minumum in the same window ...

    3. THe max_time - min_time is telling you something about the period of the primary
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
import json
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

#home = os.path.expanduser("~/")
from dcrhino3.feature_extraction.feature_extractor_k1 import FeatureExtractorK1
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.signal_processing.phase_rotation import determine_phase_state
from dcrhino3.signal_processing.phase_rotation import rotate_phase
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace
from dcrhino3.process_flow.modules.base_module import BaseModule
from phase_algorithm_helpers import identify_primary_neighbourhood
from phase_algorithm_helpers import check_condition_that_makes_me_nervous
from phase_algorithm_helpers import identify_phase_rotation

#from dcrhino3.signal_processing.phase_rotation import identify_phase_rotation

#json_object = json.loads(json_dict)
data_dir = '/home/kkappler/tmp/dcrhino_lib/bin'
flow = 'v2_processing_flow'
component_id = 'axial';
#component_id = 'tangential'

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
#base_module = BaseModule(json_object,'')
pdb.set_trace()
mini_trace = identify_primary_neighbourhood(mrs_trace, global_config)
trough_search_width=(mini_trace.num_observations-1)//2
phase_state = determine_phase_state(mini_trace.data, trough_search_width)
phi = identify_phase_rotation(mini_trace.data)
print('initial phase state = {}'.format(phase_state))
balanced_traceling = rotate_phase(mini_trace.data, phi)
#plt.plot(mini_trace.time_vector, balanced_traceling, 'g', label='balanced')
#plt.plot(mini_trace.time_vector, mini_trace.data, 'b', label='original')
#plt.legend();plt.show()
balanced_trace = rotate_phase(mrs_trace.data, phi)
#plt.plot(mrs_trace.time_vector, balanced_trace, 'g', label='balanced')
#plt.plot(mrs_trace.time_vector, mrs_trace.data, 'b', label='original')
#plt.legend();plt.show()
new_center_index = np.argmax(balanced_trace)
left_side = balanced_trace[:new_center_index]
right_side = balanced_trace[new_center_index+1:]
new_len = min(len(left_side), len(right_side))
trimmed_trace = balanced_trace[new_center_index-new_len:new_center_index+new_len+1]
timestamp = 0
transformed_args = self.get_transformed_args(trace_config)
fek1 = FeatureExtractorK1(component_id, trimmed_trace, transformed_args, timestamp)

#output_trace
#balanced_symmetric_trace =

pdb.set_trace()

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
