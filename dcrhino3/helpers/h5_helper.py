#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Sep 28 17:05:30 2018

@author: thiago
"""

import numpy as np
import ConfigParser
from datetime import datetime
from dcrhino3.models.metadata import Metadata
import pandas as pd
import pdb

class H5Helper:
    """
    Facilitates extraction of data from .h5 files.
    """

    def __init__(self, h5f,load_xyz=True):
        self.h5f = h5f
        self.metadata = self._extract_metadata_from_h5_file()
        self._ts = np.asarray(self.h5f.get('ts'))


        if load_xyz:
            self.data_xyz = self.load_xyz()

        # laptop_ts = self.h5f.get('laptop_ts')
        # if laptop_ts is not None:
        #     self.clock_ts = np.asarray(self.h5f.get('laptop_ts'))
        #     self.min_ts = self.clock_ts.min()
        #     self.max_ts = self.clock_ts.max()
        # else:
        #     self.clock_ts = None
        #     self.min_ts = self._ts.min()
        #     self.max_ts = self._ts.max()
        self.clock_ts = None
        self.min_ts = self._ts.min()
        self.max_ts = self._ts.max()

        self.max_dtime = datetime.utcfromtimestamp(int(self.max_ts))
        self.min_dtime = datetime.utcfromtimestamp(int(self.min_ts))

        self.sensitivity_xyz = self._get_sensitivity_xyz()
        self.is_ide_file = self._is_ide_file()
        #pdb.set_trace()


    def load_xyz(self):
        """
        Load 3D data
        """
        return [self.load_axis('x'), self.load_axis('y'), self.load_axis('z')]

    def load_axis(self,axis):
        """
        Load single axis as array
        """
        return np.asarray(self.h5f.get(axis))

    def load_axis_boundaries(self,axis,min_index,max_index):
        """
        Load a snippet of axis without loading the whole thing
        
        Parameters:
            axis (str): axis to load a portion of
            min_index (int): limit to start loading
            max_index (int): limit to stop loading
            
        Returns:
            Slice of axis between min/max_index
            
        """
        #arr = np.zeros((max_index-min_index,), dtype='float64')
        #self.h5f[axis].read_direct(arr,np.s_[min_index:max_index])
        return self.h5f[axis][min_index:max_index]

    def load_axis_mask(self,axis,mask):

        #arr = np.zeros((max_index-min_index,), dtype='float64')
        #self.h5f[axis].read_direct(arr,np.s_[min_index:max_index])
        return self.h5f[axis][mask]

    @property
    def ts(self):
        #pdb.set_trace()
        if self.clock_ts is None:
            return self._ts
        return self.clock_ts

    def _is_ide_file(self):
        if len(self._sensitivity) > 1:
            # self.is_ide_file = False
            return False
        else:
            # self.is_ide_file = True
            return True

    def _get_sensitivity_xyz(self):
        """
        Get sensitivity values, may be axis dependent or the same for all 3
        
        Returns:
            (list): sensitivity values [x,y,z]
        """
        self._sensitivity = self.h5f.get('sensitivity')
        if len(self._sensitivity) > 1:
            self.x_sensitivity = self._sensitivity[0]
            self.y_sensitivity = self._sensitivity[1]
            self.z_sensitivity = self._sensitivity[2]
        else:
            self.x_sensitivity = self._sensitivity[0]
            self.y_sensitivity = self._sensitivity[0]
            self.z_sensitivity = self._sensitivity[0]
        return [self.x_sensitivity, self.y_sensitivity, self.z_sensitivity]




    def _extract_metadata_from_h5_file(self):
        """ 
        Extract metadata from h5 file adds section if necessary
        
        Other Parameters
            h5 file with key, value pair
            
        Returns
            Metadata() with sections/names/values
        """
        config = ConfigParser.ConfigParser()
        for key, value in self.h5f.attrs.iteritems():
            # print(key,value)
            section = key.split("/")[0]
            param_name = key.split("/")[1]
            # pdb.set_trace()
            if config.has_section(section):
                config.set(section, param_name, value)
            else:
                config.add_section(section)
                config.set(section, param_name, value)
        m = Metadata(config)
        return m
