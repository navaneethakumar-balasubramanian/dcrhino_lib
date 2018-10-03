#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Sep 28 17:05:30 2018

@author: thiago
"""

import numpy as np
import ConfigParser
from datetime import datetime
from dcrhino.real_time.metadata import Metadata
import pdb

class H5Helper:

    def __init__(self, h5f):
        self.h5f = h5f
        self.metadata = self._extract_metadata_from_h5_file()
        self.ts = np.asarray(self.h5f.get('ts'))
        self.x_data = np.asarray(self.h5f.get('x'))
        self.y_data = np.asarray(self.h5f.get('y'))
        self.z_data = np.asarray(self.h5f.get('z'))
        self.data_xyz = [self.x_data, self.y_data, self.z_data]

        self.min_ts = self.ts.min()
        self.max_ts = self.ts.max()

        self.max_dtime = datetime.utcfromtimestamp(int(self.max_ts))
        self.min_dtime = datetime.utcfromtimestamp(int(self.min_ts))

        self.sensitivity_xyz = self._get_sensitivity_xyz()
        self.is_ide_file = self._is_ide_file()

    def _is_ide_file(self):
        if len(self._sensitivity) == 3:
            # self.is_ide_file = False
            return False
        else:
            # self.is_ide_file = True
            return True

    def _get_sensitivity_xyz(self):
        self._sensitivity = self.h5f.get('sensitivity')
        if len(self._sensitivity) == 3:
            self.x_sensitivity = self._sensitivity[0]
            self.y_sensitivity = self._sensitivity[1]
            self.z_sensitivity = self._sensitivity[2]
        else:
            self.x_sensitivity = self._sensitivity[0]
            self.y_sensitivity = self._sensitivity[0]
            self.z_sensitivity = self._sensitivity[0]
        return [self.x_sensitivity, self.y_sensitivity, self.z_sensitivity]

    def _extract_metadata_from_h5_file(self):
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
