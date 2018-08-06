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

from dcrhino.analysis.measurands.keys.data_key import DigitizerDateDataKey
from dcrhino.analysis.supporting_processing import MOUNT_POINTS_MONT_WRIGHT
from dcrhino.analysis.util.general_helper_functions import init_logging

logger = init_logging(__name__)



class ObserverNotesRow(object):
    def __init__(self, observer_row):
        self.observer_row = observer_row
        self.datetime_start = observer_row.time_start
        self.datetime_end = observer_row.time_end
        self.bench = observer_row.bench
        self.pattern = observer_row.pattern
        self.hole  = observer_row.hole
        self.hole_id = observer_row.hole_id
        self.drill_id = observer_row.drill_id
        self.mount_points_data_key_dict = self._get_mount_points()
        self.dompe = observer_row.dompe

    def _get_mount_points(self):
        """
        placeholder function, maps the mount_point to the digitizer_id
        #        24_inch                           NaN
        #mount_10_inch                  SSX50598.IDE
        #mount_24_inch_180deg                    NaN
        #mount_10_inch_180deg                    NaN

        """
        mount_points_dict = {}
        row = self.observer_row
        for mount_point in MOUNT_POINTS_MONT_WRIGHT:
            if type(row[mount_point]) == float:
                if np.isnan(row[mount_point]):
                    logger.info("skipping {} aka {} - no data for {}".format(self.hole_id,
                          self.hole, mount_point))
            else:
                yyyymmdd = datetime.datetime.strftime(row['time_start'].date(), '%Y%m%d')

                digitizer_id = '{}_{}_{}'.format(yyyymmdd, row[mount_point].split('.')[0], 'Ch08')
                data_key = DigitizerDateDataKey(digitizer_id, row['time_start'].date())
                mount_points_dict[mount_point] = data_key
        return mount_points_dict

    def unique_hole_data_id(self, mount_point):
        id_string = "{}_{}_{}_{}_{}".format(self.observer_row.bench,
                     self.observer_row.pattern, self.observer_row.hole,
                     self.observer_row.hole_id, mount_point)
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
