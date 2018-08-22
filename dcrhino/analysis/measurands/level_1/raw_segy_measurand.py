# -*- coding: utf-8 -*-
"""
Created on Fri Jun 15 18:57:36 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import glob
#import matplotlib.pyplot as plt
#import numpy as np
import os
import pdb
from obspy.io.segy.core import _read_segy

from dcrhino.analysis.measurands.segy_accelerometer_measurand import SEGYMeasurand


class RawSgyFromIDE(SEGYMeasurand):
    """
    uses DigitzerDateSamplingRate DataKey
    """
    def __init__(self, **kwargs):
        super(RawSgyFromIDE, self).__init__(**kwargs)

    @property
    def id_string(self):
        return '{}_{}'.format(self.label, self.sensor_type)

    def expected_filename(self, data_key):
        """
        This function is the heart of the class, in the sense that the reason
        we built the class in the first place was to be able to load and
        store measurand timeseries
        """
        #pdb.set_trace()
        full_path = self.full_path(data_key)
        #basename = "{:04d}{:02d}{:02d}.{}".format(dayte.year, dayte.month, dayte.day, self.extension)
        basename = '.'.join([data_key.digitizer_id, self.extension])
        full_stat_file = os.path.join(full_path, basename)
        return full_stat_file

    def load(self, data_key):
        """
        """
        if self.extension == 'sgy':
            st = _read_segy(self.expected_filename(data_key))
            return st
        else:
            print("Unexpected extension")


    def available_files_to_process(self, data_key):
        full_path = self.full_path(data_key)
        file_list = glob.glob(full_path+'/*sgy')
        file_list.sort()
        return file_list


def main():
    """
    """
    raw_sgy_form_ide = RawSgyFromIDE()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
