# -*- coding: utf-8 -*-
"""
Created on Fri Jun 15 18:57:36 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
#import numpy as np
import os
import pandas as pd
import pdb
from string import zfill


from dcrhino.analysis.measurands.data_cloud_measurands import DerivedDataCloudMeasurand

class MasterIterator(DerivedDataCloudMeasurand):
    """
    uses project id as key, maybe by date as well
    """
    def __init__(self, **kwargs):
        super(MasterIterator, self).__init__(**kwargs)
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
        basename = '.'.join(['master_iterator', self.extension])
        full_stat_file = os.path.join(full_path, basename)
        return full_stat_file

    def load(self):
        """
        """
        csv_filename = self.expected_filename()
        df = pd.read_csv(csv_filename, parse_dates=['time_start', 'time_end'])
        return df

    def set_plotting_metadata(self, row):
        """
        """
        plot_meta = {}
        plot_meta['path'] = os.path.join(self.data_level_path(data_level=3), 'unbinned', row.area)
        plot_meta['log_path'] = os.path.join(plot_meta['path'], 'logs')
        plot_meta['time_log_path'] = os.path.join(plot_meta['path'], 'time_logs')
        plot_meta['rop_path'] = os.path.join(plot_meta['path'], 'rop')
        #pdb.set_trace()
        ensure_dir(plot_meta['log_path'])
        ensure_dir(plot_meta['time_log_path'])
        ensure_dir(plot_meta['rop_path'])

        plot_meta['time_log_filename'] = os.path.join(plot_meta['time_log_path'], '{}{}.png'.format(zfill(row.hole,3),row.hole_uid[-2:]))
        plot_meta['log_filename'] = os.path.join(plot_meta['log_path'], '{}{}.png'.format(zfill(row.hole,3),row.hole_uid[-2:]))
        plot_meta['rop_filename'] = os.path.join(plot_meta['rop_path'], '{}.png'.format(zfill(row.hole,3)))

        plot_meta['row'] = row
        return plot_meta

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
