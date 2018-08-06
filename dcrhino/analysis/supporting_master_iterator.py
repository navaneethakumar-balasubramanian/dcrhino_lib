# -*- coding: utf-8 -*-
"""
Created on Sun Jul  1 13:51:31 2018

@author: kkappler

This function originally created to support MontWrigth processing and work with
Doug's Observer Notes folder.  However, now that we have a master_iterator.csv
concept I would like to keep this idea around in another object.


"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
from string import zfill

from dcrhino.analysis.measurands.keys.data_key import DigitizerDateDataKey
from dcrhino.analysis.supporting_processing import MOUNT_POINTS_MONT_WRIGHT
from dcrhino.analysis.util.general_helper_functions import init_logging

logger = init_logging(__name__)



class MasterIteratorRow(object):
    def __init__(self, row):
        self.row = row
        self.datetime_start = row.time_start
        self.datetime_end = row.time_end
        self.area = row.area
#        self.bench = row.bench
#        self.pattern = row.pattern
        self.hole  = row.hole
        #self.hole_id = row.hole_id
        self.drill_id = row.drill_rig_id#drill_id
        self.orientation = row.orientation
        self.sensor_source_distance = row.sensor_distance_to_source
        self.sampling_rate = row.sampling_rate
        #self.mount_points_data_key_dict = self._get_mount_points()
        #self.dompe = observer_row.dompe

#    def _get_mount_points(self):
#        """
#        placeholder function, maps the mount_point to the digitizer_id
#        #        24_inch                           NaN
#        #mount_10_inch                  SSX50598.IDE
#        #mount_24_inch_180deg                    NaN
#        #mount_10_inch_180deg                    NaN
#
#        """
#        mount_points_dict = {}
#        row = self.observer_row
#        for mount_point in MOUNT_POINTS_MONT_WRIGHT:
#            if type(row[mount_point]) == float:
#                if np.isnan(row[mount_point]):
#                    logger.info("skipping {} aka {} - no data for {}".format(self.hole_id,
#                          self.hole, mount_point))
#            else:
#                yyyymmdd = datetime.datetime.strftime(row['time_start'].date(), '%Y%m%d')
#
#                digitizer_id = '{}_{}_{}'.format(yyyymmdd, row[mount_point].split('.')[0], 'Ch08')
#                data_key = DigitizerDateDataKey(digitizer_id, row['time_start'].date())
#                mount_points_dict[mount_point] = data_key
#        return mount_points_dict

    def unique_hole_data_id(self):
        id_string = "{}_hole{}_{}_{:.2f}m".format(self.area, zfill(self.hole, 4),
                     self.orientation, self.sensor_source_distance)
        return id_string

#        24_inch                           NaN
#mount_10_inch                  SSX50598.IDE
#mount_24_inch_180deg                    NaN
#mount_10_inch_180deg                    NaN
#dompe                                     0



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
