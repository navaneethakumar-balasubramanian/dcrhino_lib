# -*- coding: utf-8 -*-
"""
Created on Sat Feb  9 12:04:13 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import pdb

from dcrhino3.feature_extraction.supporting_j1 import get_expected_multiple_times
from dcrhino3.signal_processing.phase_rotation import rotate_phase
from dcrhino3.signal_processing.phase_rotation import determine_phase_state

def identify_primary_neighbourhood(symmetric_trace_in, global_config):
    """
    This can be done with zero-crossings ... or with max-min ...
    1. Trim to expected multiple time, left and right of input trace
    This means the trace is now small (for math operations)

    @note 20190209: need to decide to keep +1 or +2 regions to either side of zero_crossing
    @note 20190228: could make this a method of SymmetricTrace()
    """
    n_regions = 2 #2 number of same-sign regions to keep L and R of center
    symmetric_trace = symmetric_trace_in._clone()
    qq = get_expected_multiple_times(global_config)
    #n_steps_keep = int(qq[symmetric_trace.component_id] / symmetric_trace.dt)
    n_steps_keep = int(qq['axial-multiple_1'] / symmetric_trace.dt)
    #mrs_trace.plot()
    symmetric_trace.trim_to_num_points_lr(n_steps_keep)
    signs = np.sign(symmetric_trace.data)
    d_signs = np.diff(signs) #when index i of d_signs is +2 it means
    #a zero crossing happened between index (i-1) and index i of the trace
    #the actual bounding times are time_vector[i-1], time_vector[i]
    discontinuity_indices = np.where(np.abs(d_signs) > 0)[0]
            #num_traces = len(discontinuity_indices) +1 #maybe off by one
    #        timestamp_indices = np.arange(num_traces) * global_config.trace_length_in_seconds
    reference_array = np.split(np.arange(symmetric_trace.num_observations), discontinuity_indices+1)
    max_index = np.argmax(symmetric_trace.data)
    #identify which section of reference array are we talking about here
    tmp = [max_index in y for y in reference_array]
    tmp = np.where(tmp)[0][0]
    #keepers = np.asarray([tmp-1, tmp, tmp+1])
    #keepers = np.asarray([tmp-2, tmp-1, tmp, tmp+1, tmp+2])
    neighbourhood_indices = np.hstack(reference_array[tmp-n_regions:tmp+n_regions+1])
    symmetric_trace.trim_to_indices(neighbourhood_indices)
    return symmetric_trace


def identify_phase_rotation(data):
    """
    data: time series of a trace, approximately centered on max amplitude xcorr
    """
    tolerate_90_degree_plus_rotations = True
    trough_search_width = (len(data) - 1) // 2
    phase_state = determine_phase_state(data, trough_search_width)
    print('inital phase state = {}'.format(phase_state))
    degrees_advance = 0.0
    if phase_state == 'left_low':
        while phase_state=='left_low':
            degrees_advance -= 1;#print(degrees_advance)
            rotated_data = rotate_phase(data, degrees_advance);
            phase_state = determine_phase_state(rotated_data, trough_search_width)
            if phase_state=='indeterminate':
                return degrees_advance
            if not tolerate_90_degree_plus_rotations:
                if np.abs(degrees_advance) > 90:
                    print('error - could not balance with 90 degree rotation')
                    pdb.set_trace()
    elif phase_state == 'right_low':
        while phase_state=='right_low':
            degrees_advance += 1;#print(degrees_advance)
            rotated_data = rotate_phase(data, degrees_advance);
            phase_state = determine_phase_state(rotated_data, trough_search_width)
            if phase_state=='indeterminate':
                return degrees_advance
            if not tolerate_90_degree_plus_rotations:
                if np.abs(degrees_advance) > 90:
                   print('error - could not balance with 90 degree delay')
                   pdb.set_trace()

    return degrees_advance


def check_condition_that_makes_me_nervous(data):
    if np.argmax(data) != np.argmax(np.abs(data)):
        implication_1="this means the global maximum deviation from zero\
        is to the negative ... I hope this is not ever the case for the\
        primary peak, it would add complexity to thinking about this algorithm"
        print('oh dear')
        print(implication_1)
        implication_2 = "rotate_recenter_and_trim method assumes after rotation\
        we recenter on the max, it may need to be modified to recenter on min"
        print(implication_2)
        thought_1 = 'But I think we maybe ok here ... if we add 180 degrees\
        to the phase shift.'
        print(thought_1)
        pdb.set_trace()

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
