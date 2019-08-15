#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Sep 28 17:05:30 2018

Author: thiago
"""

import numpy as np
import configparser as ConfigParser
from datetime import datetime
from dcrhino3.models.metadata import Metadata
import json
from dcrhino3.models.config2 import Config
from dcrhino3.helpers.general_helper_functions import init_logging, init_logging_to_file
from dcrhino3.helpers.config_file_helper import update_global_config
import h5py

logger = init_logging(__name__)
file_logger = init_logging_to_file(__name__)


def save_np_array_to_h5_file(h5, key, np_array, close_file=False):
    if isinstance(h5, h5py._hl.files.File):
        h5file = h5
    else:
        h5file = h5py.File(h5, "a")
    np_length = len(np_array)
    my_key = key
    if my_key in h5file.keys():
        ds = h5file[my_key]
        ds.resize((h5file[my_key].shape[0] + np_array.shape[0]), axis=0)
        ds[-np_length:] = np_array
    else:
        ds = h5file.create_dataset(my_key, data=np_array, chunks=True, dtype=np_array.dtype, maxshape=(None,),
                                   compression="gzip",
                                   compression_opts=9)
        ds[:] = np_array
    h5file.flush()
    if close_file:
        h5file.close()


def save_dataframe_to_h5_file(h5, dataframe, close_file=False):
    if isinstance(h5, h5py._hl.files.File):
        h5file = h5
    else:
        h5file = h5py.File(h5, "a")
    for key in dataframe.columns:
        data_array = np.asarray(dataframe[key])
        save_np_array_to_h5_file(h5file, key, data_array)
    if close_file:
        h5file.close()

def replace_value_in_h5_key(h5, key, array, close_file=False):
    if isinstance(h5, h5py._hl.files.File):
        h5file = h5
    else:
        h5file = h5py.File(h5, "a")
    if key in h5file.keys():
        del h5file[key]

    ds = h5file.create_dataset(key, data=array, chunks=True, dtype=array.dtype, maxshape=(None,),
                               compression="gzip",
                               compression_opts=9)
    ds[:] = array
    h5file.flush()
    if close_file:
        h5file.close()


def print_h5file_stats(h5):
    for key in ["axis", "sensitivity"]:
        if key in h5.keys():
            ar = np.asarray(h5.get(key))
            logger.info("{}: {}".format(key, ar))


class H5Helper:
    """
    Facilitates extraction of data from .h5 files.
    
    Parameters:
        h5f (str): path to h5f
        
    Other Parameters:
        load_xyz (boolean): true to load xyz data
    """

    def __init__(self, h5f, load_xyz=True, load_ts=True, config=None):

        self.h5f = h5f
        # self.metadata = self._extract_metadata_from_h5_file()
        if config is None:
            self.config = self._extract_global_config_from_h5_file()
        else:
            self.config = config

        if load_ts:
            if "ts" in self.h5f.keys():
                self._ts = np.asarray(self.h5f.get('ts'), dtype=np.float64)
            else:
                self._ts = np.asarray(self.h5f.get('timestamp'), dtype=np.float64)

            if load_xyz:
                self.data_xyz = self.load_xyz()

            self.clock_ts = None
            self.min_ts = self._ts.min()
            self.max_ts = self._ts.max()

            self.max_dtime = datetime.utcfromtimestamp(int(self.max_ts))
            self.min_dtime = datetime.utcfromtimestamp(int(self.min_ts))

            self.sensitivity_xyz = self._get_sensitivity_xyz()
            self.is_ide_file = self._is_ide_file()

    def load_xyz(self):
        """
        Load 3D data from h5 file using :func:`load_axis` to store data as an np array.
        
        Returns:
            (list): list of three arrays, one for each axis
        """
        return [self.load_axis('x'), self.load_axis('y'), self.load_axis('z')]

    def shift_time(self, time_offset=0):
        self._ts += time_offset
        del self.h5f["ts"]
        self.h5f["ts"] = self._ts

    def load_axis(self, axis):
        """
        Load single axis as a Numpy array.
        
        Returns:
            (array): axis from h5 file in array format
        """
        return np.asarray(self.h5f.get(axis))

    def load_axis_boundaries(self, axis, min_index, max_index):
        """
        Load a snippet of axis without loading the whole thing
        
        Parameters:
            axis (str): axis to load a portion of
            min_index (int): limit to start loading
            max_index (int): limit to stop loading
            
        Returns:
            Slice of axis between min/max_index
            
        """
        return self.h5f[axis][min_index:max_index]

    def load_axis_mask(self, axis, mask):
        return self.h5f[axis][mask]

    def save_np_array_to_h5_file(self, key, np_array, h5file=None, close_file=False):
        if h5file is None:
            save_np_array_to_h5_file(self.h5f, key, np_array, close_file)
        else:
            save_np_array_to_h5_file(h5file, key, np_array, close_file)

    def save_dataframe_to_h5_file(self, dataframe, h5file=None, close_file=False):
        if h5file is None:
            save_dataframe_to_h5_file(self.h5f, dataframe, close_file)
        else:
            save_dataframe_to_h5_file(h5file, dataframe, close_file)

    def replace_value_in_h5_key(self, key, array, h5file=None, close_file=False):
        if h5file is None:
            replace_value_in_h5_key(self.h5f, key, array, close_file)
        else:
            replace_value_in_h5_key(h5file, key, array, close_file)

    def print_h5file_stats(self, h5file=None):
        if h5file is None:
            print_h5file_stats(self.h5f)
        else:
            print_h5file_stats(h5file)

    def close_h5f(self):
        self.h5f.close()


    @property
    def ts(self):
        """
        Timestamp retrieval function. Can be set manually with clock_ts value 
        found in __init__(). Defaults to return:
        ::
            
            self._ts = np.asarray(self.h5f.get('ts'))
        
        
        Returns:
            self._ts or self.clock_ts if it exists
        """
        if self.clock_ts is None:
            return self._ts
        return self.clock_ts

    def _is_ide_file(self):
        """ 
        Check if sensitivity value is larger than 1, indicating sensitivity
        values that are axis-specific.
        
        Returns:
            (boolean): False if len(self.sensitivity)>1, True otherwise
        """
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
            (list): sensitivity values [x,y,z] (may not be axis-specific)
        """
        if "sensitivity" in self.h5f.keys():
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
        else:
            self._sensitivity = [1, 1, 1]
            return [1, 1, 1]

    def _extract_global_config_from_h5_file(self):
        if "global_config_jsons" not in self.h5f.attrs:
            return None
        global_config_json = json.loads(self.h5f.attrs["global_config_jsons"])
        keys = global_config_json.keys()
        first_config = global_config_json[keys[0]]
        c = Config()
        c.set_data_from_json(first_config)
        return c

    def save_field_config_to_h5(self, config=None):
        if config is None:
            config_to_save = self.config
        else:
            config_to_save = config

        json_dict = {"0": config_to_save.pipeline_files_to_dict}
        self.h5f.attrs['global_config_jsons'] = json.dumps(json_dict)
        self.h5f.flush()

    def update_global_config(self, config, file_id="0"):
        update_global_config(self.h5f, config, file_id)

    def extract_metadata_from_h5_file_as_json(self):
        return json.dumps(self.extract_metadata_from_h5_file_as_dict(), indent=4)

    def extract_metadata_from_h5_file_as_dict(self):
        config_dict = dict()
        for key, value in self.h5f.attrs.items():
            param_name = key.split("/")[1]
            config_dict[param_name] = value
        return config_dict

    def _extract_metadata_from_h5_file(self):
        try:
            config = ConfigParser.ConfigParser()
            for key, value in self.h5f.attrs.items():
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
        except Exception as e:
        #    print(e)
            print("Error loading metadata" ,e)
            return None
