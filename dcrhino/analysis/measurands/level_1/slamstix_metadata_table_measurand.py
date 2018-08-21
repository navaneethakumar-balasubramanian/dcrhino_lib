# -*- coding: utf-8 -*-
"""
Created on Fri Jun 15 18:57:36 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import glob
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb


#from dcrhino.analysis.measurands.borehole_accelerometer_measurand import BoreholeAccelerometerMeasurand
from dcrhino.analysis.measurands.data_cloud_measurands import DerivedDataCloudMeasurand

class SlamstixMetadataTable(DerivedDataCloudMeasurand):
    """
    uses DigitzerDate DataKey
    """
    def __init__(self, **kwargs):
        super(SlamstixMetadataTable, self).__init__(**kwargs)
        self.extension = 'csv'
        #self.description = 'level_1 segy from IDE'

    @property
    def id_string(self):
        return '{}'.format(self.label)



    def full_path(self):
        """
        """
        data_level_path = self.data_level_path()
        full_stat_path = data_level_path
        return full_stat_path

    def expected_filename(self):
        """
        This function is the heart of the class, in the sense that the reason
        we built the class in the first place was to be able to load and
        store measurand timeseries
        """
        #pdb.set_trace()
        full_path = self.full_path()
        #basename = "{:04d}{:02d}{:02d}.{}".format(dayte.year, dayte.month, dayte.day, self.extension)
        basename = '.'.join(['slamstix_metadata_table', self.extension])
        full_stat_file = os.path.join(full_path, basename)
        return full_stat_file

    def load(self):
        """
        """
        df = pd.read_csv(self.expected_filename(), parse_dates=['time_start', 'time_end'])
#        if self.extension == 'sgy':#we expect this
#            st = _read_segy(self.expected_filename(data_key))
#            return st
#        else:
#            print("Unexpected extension")
        return df

#    def available_files_to_process(self, data_date):
#        full_path = self.full_path(data_date)
#        file_list = glob.glob(full_path+'/*computed_drill_times.csv')
#        file_list.sort()
#        return file_list


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
