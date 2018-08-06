# -*- coding: utf-8 -*-
"""
Created on Fri Sep 16 16:58:59 2016

@author: kkappler

"""
from __future__ import absolute_import, division, print_function

import math
import os
import pandas as pd
import pdb

from obspy.io.segy.core import _read_segy


from dcrhino.analysis.measurands.data_cloud_measurands import DerivedDataCloudMeasurand
from dcrhino.analysis.util.general_helper_functions import init_logging
from dcrhino.common.supporting_paths import ensure_dir

logger = init_logging(__name__)

class UniformlySampledMeasurand(DerivedDataCloudMeasurand):
    """
    Abstract layer basically to support get_sampling_rate() but we dont plan to
    actually instantiate these.  They are needed for resmapled measurands.

    @ivar extension: file-type we are going to save (.npy, .mat, etc.)
    @ivar sampling rate (samples per second):
    """

    def __init__(self, **kwargs):
        """
        """
        super(UniformlySampledMeasurand, self).__init__(**kwargs)
        self._sampling_rate = kwargs.get('sampling_rate', None)
        self._mean_subtract_on_load = kwargs.get('mean_subtract', False)

    @property
    def sampling_rate(self):
        """
        @return samples per second
        """
        if self._sampling_rate is not None:
            return self._sampling_rate
        parent = self.parent_measurands[0]
        return parent.sampling_rate

    @property
    def sampling_rate_string(self):
        return '{}hz'.format(int(self.sampling_rate))

    @property
    def nyquist(self):
        """
        @return samples per second
        """
        return self.sampling_rate/2.


    @property
    def expected_number_of_samples(self, time_interval):
        """
        The number of samples expected when loading the data.
        For Example: a 50Hz timeseries stored in day-long files would be
        expected to have 4,320,000 samples.

        sub-classes of UniformlySampledMeasurand may override the implementation
        especially where striding windows are involved
        """
        return math.trunc(self.sampling_rate * time_interval.duration)

    def load(self, data_key):
        """
        """
        if self.extension == 'sgy':#we expect this
            st = _read_segy(self.expected_filename(data_key))
            return st
        elif self.extension == 'csv':
            expected_filename = self.expected_filename(data_key)
            try:
                if self.label == 'trace_header_features':
                    df = pd.read_csv(expected_filename, parse_dates=['datetime'])
                    #pdb.set_trace()
                elif self.label == 'trace_features_eda':
                    df = pd.read_csv(expected_filename, parse_dates=['datetime'])
                    #pdb.set_trace()
                else:
                    df = pd.read_csv(expected_filename)
                return df
            except IOError:
                logger.critical("File {} DNE".format(expected_filename))
                return None
        else:
            print("Unexpected extension on expected filename")
            print("{}".format(data_key))

    def save_to_csv(self, data_key, df):
        """
        """
        expected_filename = self.expected_filename(data_key)
        out_path = os.path.dirname(expected_filename)
        ensure_dir(out_path)

        if self.extension == 'csv':
            #try:
            df.to_csv(expected_filename, index_label='datetime')

#            except IOError:
#                logger.critical("File {} DNE".format(expected_filename))
#                return None
        else:
            print("Unexpected extension on expected filename")
            print("{}".format(data_key))

def main():
    """
    """
    print("finito")

if __name__ == "__main__":
    main()
