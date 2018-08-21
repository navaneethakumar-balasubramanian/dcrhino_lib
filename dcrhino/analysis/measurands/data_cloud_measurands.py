# -*- coding: utf-8 -*-
"""
Created on Mon Jun  4 19:01:44 2018

@author: kkappler

TODO: replace calls to _read_segy with .load(data_key)
"""

from __future__ import absolute_import, division, print_function

import copy
import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from dcrhino.analysis.data_manager.temp_paths import get_data_level_paths_dict
HOME = os.path.expanduser("~/")
data_directory = os.path.join(HOME, 'data', 'datacloud')

#home = os.path.expanduser("~/")






class DataCloudMeasurand(object):
    """
    """
    def __init__(self, **kwargs):
        self.label = kwargs.get('label', '')
        self.data_level = kwargs.get('data_level', None)
        self.units = kwargs.get('units', '')
        self.parent_measurands = kwargs.get('parent_measurands', [])
        self.operator = kwargs.get('operator', None)
        self.description = kwargs.get('description', '')
        self.formality = kwargs.get('formality', None)

    @property
    def id_string(self):
        """
        label can be used as a temporary placeholder if you want to test drive a
        measurand;
        This method is almost always defined for each class and uses the parameterization
        """
        return self.label

    def _clone(self, **kwargs):
        """
        create a new instance of same type.
        Iterate over UnMeasurand properties, populating them withthose of self
        TODO: get logger message in here
        Note: the issue with the clone slowing everything down was debugged by Dan
        Schneider in 2017.
        """
        if len(self.parent_measurands) > 0:
            print("Clone was called on after parent measurands was already populated, this will lead to the parents being deep copied, resulting in unregistered measurands and inefficient behavior")
            raise Exception
        duplicate_measurand = copy.deepcopy(self)
        return duplicate_measurand


class DirectDataCloudMeasurand(DataCloudMeasurand):
    """
    """
    pass


class DerivedDataCloudMeasurand(DataCloudMeasurand):
    """
    """
    def __init__(self, **kwargs):
        super(DerivedDataCloudMeasurand, self).__init__(**kwargs)
        self.extension = kwargs.get('extension', None)
        self.project_id = kwargs.get('project_id', '')


    def data_level_path(self, data_level=None):
        """
        20180710; added data_level as a kwarg so default is return self.data_level
        but if you provide another you get it ...
        Old usage may fail now;
        """
        data_level_dict = get_data_level_paths_dict(self.project_id)
        if data_level is None:
            data_level_directory = data_level_dict[self.data_level]
        else:
            data_level_directory = data_level_dict[data_level]
        return data_level_directory

#    def measurand_mini_path(self):
#        """
#DEPRECATED; MOVED TO DATA KEY 20180707
#        This string sits right below the data level;  It is a place holder for
#        adding paths that are perhaps tough to do with id_string
#        """
#        return self.id_string


    def expected_filename(self, data_key):
        """
        This function is the heart of the class, in the sense that the reason
        we built the class in the first place was to be able to load and
        store measurand timeseries
        """
        pass

    def make(self, data_key, force=False):
        """
        TODO: add flags for recursion and force; see DS notes on this
        """
        if force:
            result = self._make_from_parents(data_key)
            return result
        if os.path.isfile(self.expected_filename(data_key)):
            print("already made")
            return 0
        else:
            result = self._make_from_parents(data_key)
            return result








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
