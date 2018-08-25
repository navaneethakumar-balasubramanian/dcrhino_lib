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

from dcrhino.analysis.measurands.uniformly_sampled_measurand import UniformlySampledMeasurand

class AccelerometerMeasurand(UniformlySampledMeasurand):
    """
    """
    def __init__(self, **kwargs):
        super(AccelerometerMeasurand, self).__init__(**kwargs)
        self._sensor_type = kwargs.get('sensor_type', None)
        self.extension = kwargs.get('extension', 'npy')

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
        20180822: after the WA run have a bit of breathing room to reonsider
        the processing flow the way it is, and the way it should be.  I am opting
        for an intermediate data structure.  THis will come for now from the
        L1 segy, but can in future come from the IDE or from a database of
        resampled data.  These .npy files are going to represent a sensor deployment.
        This architechture may not be a long term solution but the need for
        an intermediate data storage format that is not 'tiny numpys' and is
        not a multi TB database is needed.  This is an attempt at a numpy approch.

        The field data I have now and for the next while comes from IDE files which
        are one-big-dump of a rhino deployment.  These were previously stored
        with a filename based on deployment date, etc.  While I don't necessarily want
        to lose that labelling, I do want more useful info in the filename.

        Here for example:
            yyyymmdd:sssss_yyyymmdd:sssss_serial#.npy would be fine.
            THiswoudl be the start and end datetimes.  Alternatively
            yyyymmdd:hhmmss_ssssss_serial.npy.  Here we have the first
            second of data, the number of seconds covered and teh ssx serial.

        20180823 update: I am going to make serial number a partition element,
        it will be part of the DataKey.  We will thus have
        level_1/piezo/serial/3200hz/axial/yyyymmddThhmmss_ssssss.npy

        """

        data_level_path = self.data_level_path()
        #pdb.set_trace()
        full_stat_path = os.path.join(data_level_path, self.sensor_type,
                                      data_key.mini_path)
        return full_stat_path

#    def get_trace(self, data_key, i_trace):
#        """
#        2018-07-11: this is a kluge to placehold for when we have the desited info
#        in the tfe = tr.stats.segy.textual_file_header_encoding
#
#        Also, it belongs to a class that is explcitly segy.
#
#        i_trace=0 means first trace, i_trace=-1 means last_trace
#        """
#        full_segy_file = self.expected_filename(data_key)
#        for i,tr in enumerate(iread_segy(full_segy_file,headonly=True, textual_header_encoding='ASCII' )):
#            if i==i_trace:
#              return tr
#        return tr

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
