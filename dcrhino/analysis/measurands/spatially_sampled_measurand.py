# -*- coding: utf-8 -*-
"""
Created on Fri Sep 16 16:58:59 2016

@author: kkappler

"""
from __future__ import absolute_import, division, print_function

import pandas as pd
import pdb

from obspy.io.segy.core import _read_segy

from dcrhino.analysis.measurands.data_cloud_measurands import DerivedDataCloudMeasurand
from dcrhino.analysis.util.general_helper_functions import init_logging

logger = init_logging(__name__)


class SpatiallySampledMeasurand(DerivedDataCloudMeasurand):
    """
    Abstract layer basically to support get_sampling_rate() but we dont plan to
    actually instantiate these.  They are needed for resmapled measurands.

    @ivar extension: file-type we are going to save (.npy, .mat, etc.)
    @ivar sampling rate (samples per second):
    """

    def __init__(self, **kwargs):
        """
        """
        super(SpatiallySampledMeasurand, self).__init__(**kwargs)
        self._samples_per_meter = kwargs.get('samples_per_meter', None)
        self._mean_subtract_on_load = kwargs.get('mean_subtract', False)

    @property
    def samples_per_meter(self):
        """
        @return samples per second
        """
        if self._samples_per_meter is not None:
            return self._samples_per_meter
        else:
            logger.error("spatial sampling not defined")
            #TODO: handle this case more robustly
            return None



    def load(self, data_key):
        """
        """
        if self.extension == 'sgy':#we expect this
            st = _read_segy(self.expected_filename(data_key))
            return st
        elif self.extension == 'csv':
            try:
                if self.label == 'trace_header_features':
                    df = pd.read_csv(self.expected_filename(data_key), parse_dates=['datetime'])
                    #pdb.set_trace()
                else:
                    df = pd.read_csv(self.expected_filename(data_key))
                return df
            except IOError:
                logger.critical("File {} DNE".format(self.expected_filename(data_key)))
                return None
        else:
            print("Unexpected extension on expected filename")
            print("{}".format(data_key))

def main():
    """
    """
    print("finito")

if __name__ == "__main__":
    main()
