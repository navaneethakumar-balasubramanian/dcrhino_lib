# -*- coding: utf-8 -*-
"""
Created on Fri Jun 15 19:02:39 2018

@author: kkappler
TODO: This should actually be a multivariate measurand which pulls
vertial, radial and tangential components
This should be implemented either in pandas with columns of that name or
in xarray

"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from obspy.io.segy.segy import iread_segy

from dcrhino.analysis.measurands.uniformly_sampled_measurand import UniformlySampledMeasurand

class SEGYMeasurand(UniformlySampledMeasurand):
    """
    """
    def __init__(self, **kwargs):
        super(SEGYMeasurand, self).__init__(**kwargs)
        self._sensor_type = kwargs.get('sensor_type', None)
        #self.trace_header_version = kwargs.get('trace_header_version', None)
        #self.extension = kwargs.get('extension', 'sgy')

    @property
    def sensor_type(self):
        """
        TODO: review, sensor_type should maybe be _sensor_type
        """
        if self._sensor_type is not None:
            return self._sensor_type
        parent = self.parent_measurands[0]
        return parent.sensor_type


    def full_path(self, data_key):#data_date):
        """
        """
        data_date = data_key.data_date
        if isinstance(data_date, datetime.datetime):
            date_string = data_date.date().__str__()
        else:
            date_string = data_date.__str__()
        data_level_path = self.data_level_path()
        #pdb.set_trace()
        full_stat_path = os.path.join(data_level_path, date_string,
                                      self.sensor_type, data_key.mini_path)
        return full_stat_path

    def get_trace(self, data_key, i_trace):
        """
        2018-07-11: this is a kluge to placehold for when we have the desited info
        in the tfe = tr.stats.segy.textual_file_header_encoding

        Also, it belongs to a class that is explcitly segy.

        i_trace=0 means first trace, i_trace=-1 means last_trace
        """
        full_segy_file = self.expected_filename(data_key)
        for i,tr in enumerate(iread_segy(full_segy_file,headonly=True, textual_header_encoding='ASCII' )):
            if i==i_trace:
              return tr
        return tr

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
