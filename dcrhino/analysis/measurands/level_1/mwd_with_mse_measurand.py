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


from dcrhino.analysis.measurands.data_cloud_measurands import DerivedDataCloudMeasurand

class MWDWithMSE(DerivedDataCloudMeasurand):
    """
    uses DigitzerDate DataKey
    """
    def __init__(self, **kwargs):
        super(MWDWithMSE, self).__init__(**kwargs)
        self.extension = 'csv'
        #self.description = 'level_1 segy from IDE'

    @property
    def id_string(self):
        return '{}'.format(self.label)



    def full_path(self):
        """
        """
        data_level_path = self.data_level_path()# = temp_paths.levels[self.data_level].get_fullpath()
        full_stat_path = data_level_path
        return full_stat_path

    def expected_filename(self):
        """

        """
        full_path = self.full_path()#data_level_path
        basename = '.'.join(['mwd', self.extension])
        full_stat_file = os.path.join(full_path, basename)
        return full_stat_file

    def load(self):
        """
        """
        mwd_filename = self.expected_filename()
        df = pd.read_csv(mwd_filename, parse_dates=['time_start', 'time_end'])
        return df

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
