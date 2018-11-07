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
import pandas as pd
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
        #pdb.set_trace()

    def _is_ide_file(self):
        if len(self._sensitivity) > 1:
            # self.is_ide_file = False
            return False
        else:
            # self.is_ide_file = True
            return True

    def _get_sensitivity_xyz(self):
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



    def acceleration_stats(self,time_interval,basic):
        accelerations = []
        current_time = int(self.min_ts)
        next_time = current_time + time_interval
        accel_df = None
        # pdb.set_trace()
        last_printed = None

        if not basic:
            while current_time <= int(self.max_ts):
                # pdb.set_trace()
                percentage = int(100-(self.max_ts-current_time)/(self.max_ts-self.min_ts)*100)
                if percentage % 5 == 0:
                    if percentage != last_printed:
                        print("{}%".format(percentage))
                        last_printed = percentage

                a = self.ts>=current_time
                b = self.ts<next_time
                indices = np.logical_and(a, b)
                if self._is_ide_file():
                    max_x = np.max(self.x_data[indices])/self.x_sensitivity
                    min_x = np.min(self.x_data[indices])/self.x_sensitivity
                    max_y = np.max(self.y_data[indices])/self.y_sensitivity
                    min_y = np.min(self.y_data[indices])/self.y_sensitivity
                    max_z = np.max(self.z_data[indices])/self.z_sensitivity
                    min_z = np.min(self.z_data[indices])/self.z_sensitivity
                else:
                    max_x = (3.3/2.0 - ((5.0/65535)*np.max(self.x_data[indices])))/self.x_sensitivity
                    min_x = (3.3/2.0 - ((5.0/65535)*np.max(self.x_data[indices])))/self.x_sensitivity
                    max_y = (3.3/2.0 - ((5.0/65535)*np.max(self.y_data[indices])))/self.y_sensitivity
                    min_y = (3.3/2.0 - ((5.0/65535)*np.max(self.y_data[indices])))/self.y_sensitivity
                    max_z = (3.3/2.0 - ((5.0/65535)*np.max(self.z_data[indices])))/self.z_sensitivity
                    min_z = (3.3/2.0 - ((5.0/65535)*np.max(self.z_data[indices])))/self.z_sensitivity
                row = [current_time,max_x,min_x,max_y,min_y,max_z,min_z]
                #print(row)
                accelerations.append(row)
                current_time = next_time
                next_time += time_interval
            accel_df = pd.DataFrame(accelerations,columns=["Timestamp","max_x","min_x","max_y","min_y","max_z","minz"])
        if self._is_ide_file():
            max_x = np.max(self.x_data)/self.x_sensitivity
            min_x = np.min(self.x_data)/self.x_sensitivity
            max_y = np.max(self.y_data)/self.y_sensitivity
            min_y = np.min(self.y_data)/self.y_sensitivity
            max_z = np.max(self.z_data)/self.z_sensitivity
            min_z = np.min(self.z_data)/self.z_sensitivity
        else:
            max_x = (3.3/2.0 - ((5.0/65535)*np.max(self.x_data)))/self.x_sensitivity
            min_x = (3.3/2.0 - ((5.0/65535)*np.max(self.x_data)))/self.x_sensitivity
            max_y = (3.3/2.0 - ((5.0/65535)*np.max(self.y_data)))/self.y_sensitivity
            min_y = (3.3/2.0 - ((5.0/65535)*np.max(self.y_data)))/self.y_sensitivity
            max_z = (3.3/2.0 - ((5.0/65535)*np.max(self.z_data)))/self.z_sensitivity
            min_z = (3.3/2.0 - ((5.0/65535)*np.max(self.z_data)))/self.z_sensitivity
        print("Max X {}".format(max_x))
        print("Min X {}".format(min_x))
        print("Max Y {}".format(max_y))
        print("Min Y {}".format(min_y))
        print("Max Z {}".format(max_z))
        print("Min Z {}".format(min_z))
        return accel_df


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
