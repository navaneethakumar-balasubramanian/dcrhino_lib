# -*- coding: utf-8 -*-
"""
Created on Mon Feb  4 21:28:04 2019

Author: kkappler
"""

from __future__ import absolute_import, division, print_function

import copy
import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.phase_rotation import rotate_phase

logger = init_logging(__name__)

class SymmetricTrace(object):
    """
    """
    def __init__(self, data, sampling_rate, **kwargs):
        #BaseTraceModule.__init__(self, json, output_path)
        #self.id = "lead_channel_deconvolution"
        self.data = data#kwargs.get('data', None)
        self.sampling_rate = sampling_rate#kwargs.get('sampling_rate', None)
        self.component_id = kwargs.get('component_id', None)
        self.timestamp = kwargs.get('timestamp', None)
        self.n_samples_shift = 0
        #self.global_config = kwargs.get('global_config', None)
        if (self.data is not None) & (self.sampling_rate is not None):
            self.calculate_time_vector()
        else:
            self._time_vector = None

    def _clone(self, **kwargs):
        """
        Create a new instance of same type.
        
        Keyword Arguments:
            :Duplicate symmetric trace to be copy.deepcopy()
        """
        duplicate_symmetric_trace = copy.deepcopy(self)
        return duplicate_symmetric_trace

    @property
    def dt(self):
        return 1. / self.sampling_rate

    @property
    def num_observations(self):
        return len(self.data)

    @property
    def t0_index(self):
        return (self.num_observations - 1) // 2

    def calculate_time_vector(self):
        """
        Calculate the equal step, ideal time vector using "dt" and "num_observations"
        and shifting x-axis using t0_index.
        """
        time_vector = self.dt * (np.arange(self.num_observations) - self.t0_index)
        self._time_vector = time_vector
        return

    @property
    def time_vector(self):
        return self._time_vector
#        time_vector = self.dt * (np.arange(self.num_observations) - self.t0_index)
#        self.time_vector = time_vector
#        return

    @property
    def center_index(self):
        return (len(self.data)-1) // 2

    def trim_to_num_points_lr(self, n_points):
        """
        Trim to index with width = 2 * n_points + 1, centered around 
        center_index.
        """
        self.data = self.data[self.center_index-n_points:self.center_index+n_points + 1]
        self.calculate_time_vector()

    def trim_to_indices(self, indices):
        """
        Trim to specified indices, not necessarily equidistant around center_index
        like :func:`trim_to_num_points_lr`
        """
        self.data = self.data[indices]
        self._time_vector = self._time_vector[indices]


    def plot(self):
        """
        Plot time_vector vs. data, title, label, and show.
        """
        plt.plot(self.time_vector, self.data, 'bs');
        plt.title('{} component'.format(self.component_id))
        plt.xlabel('Time (s)')
        plt.show()

    def rotate_recenter_and_trim(self, phi):
        """
        Use :func:`phase_rotation.rotate_phase` to rotate data by phi degrees. Find 
        new center index of rotated data, and shift the trimmings to new center
        index using `Numpy roll. <https://docs.scipy.org/doc/numpy/reference/generated/numpy.roll.html>`_ 
        Revise data to reflect these changes.
        
        Parameters:
            phi (float): angle, in degrees, to shift data
        
        .. note:: 20140214: Initially this method trimmed the trace.  BUT that could result in
            different length traces within a blasthole.  Theoretically this is not a
            problem,but practically it will cause problems if we wanted to use the
            component_as_array() method of TraceDataframe().  So to work around this
            I can either use np.roll or zeropad the trace.
        """
        rotated_data = rotate_phase(self.data, phi)
        new_center_index = np.argmax(rotated_data)
        self.n_samples_shift = self.center_index-new_center_index
        shifted_rotated_data = np.roll(rotated_data, self.n_samples_shift)
#        left_side = rotated_data[:new_center_index]
#        right_side = rotated_data[new_center_index+1:]
#        new_half_len = min(len(left_side), len(right_side))
#        trimmed_trace = rotated_data[new_center_index-new_half_len:new_center_index+new_half_len+1]
        #pdb.set_trace()
        self.data = shifted_rotated_data #previously trimmed_trace
        #self.calculate_time_vector()
        return

    @property
    def applied_shift(self):
        return self.n_samples_shift * self.dt


def my_function():
    """
    Tester function for :func:`SymmetricTrace`
    """
    x = np.arange(11)
    st = SymmetricTrace(data=x, sampling_rate=10.0)
    pdb.set_trace()
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
