#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""

@author: natal
"""

from __future__ import absolute_import, division, print_function

from datetime import datetime
from enum import Enum
import h5py
import json
import numpy as np
import pandas as pd
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.models.config import Config

COMPONENT_IDS = ['axial', 'tangential', 'radial']
logger = init_logging(__name__)

class ModuleType(Enum):
    RAW=1
    INTERPOLATION=2
    AUTOCORRELATION=3
    MWD_MERGE=4
    LEAD_DECON=5
    LAG_DECON=6
    BAND_PASS_FILTER=7
    PHASE_ROTATION=8



class TraceData(object):
    def __init__(self, **kwargs):
        self.dataframe = kwargs.get('df', pd.DataFrame())
        self.applied_modules = []
        self._global_configs = dict()

    def apply_module(self,module_type,arguments):
        self.applied_modules.append({module_type:arguments})
        #return the index where it was appended
        return len(self.applied_modules)-1

    def load_from_db(self,db_helper,files_ids,min_ts,max_ts):
        self.dataframe = db_helper.get_autocor_traces_from_files_ids(files_ids,min_ts,max_ts)
        for file_id in files_ids:
            file_config = db_helper.get_last_file_config_from_file_id(file_id)
            global_config = Config()
            global_config.set_data_from_json(json.loads(file_config))
            self._global_configs[file_id] = global_config


    def save_to_h5(self, path):
        """
        @note: when porting to python3 replace iteritems with items see Keith's answer in
        https://stackoverflow.com/questions/10458437/what-is-the-difference-between-dict-items-and-dict-iteritems
        @warning: this requires dtypes to be float, will need to use a mapping of
        dtypes for df columns ... where will we get this? @Thiago: will this
        be maintained in database models?

        @note 20190122: This needs to handle three forms of 'saving'
        1. Save the traces (as float32, today they will store as float, will check 32 or 64 later)
        2. Save any columns from the mwd
        3. Save the global_config (as json dumps?)

        @ToDo: clean up iteration over trace labels to use only the
        components specified in global_config
        """
        #df_as_dict = dict(self.dataframe)

        all_columns = list(self.dataframe.columns)
        h5f = h5py.File(path, 'w')
        #<save traces>
        for component_id in COMPONENT_IDS:
            try:
                trace_label = '{}_trace'.format(component_id)
                trace_data = self.component_as_array(component_id)
                h5f.create_dataset(trace_label, data=trace_data, dtype=float)
                all_columns.remove(trace_label)
            except KeyError:
                logger.info('Skipping saving {} as it DNE'.format(trace_label))
        #<save traces>

        #<mwd columns>
        mwd_columns = all_columns#traces removed
        for column_label in mwd_columns:
            dtype = type(self.dataframe[column_label].iloc[0])
            print (column_label, dtype)
            column_data = np.asarray(self.dataframe[column_label])
            if dtype == str or dtype == unicode:
                dt = h5py.special_dtype(vlen=unicode)
                h5f.create_dataset(column_label, data=column_data, dtype=dt)
            elif dtype == np.int64:
                h5f.create_dataset(column_label, data=column_data, dtype='i8')
            else:
                column_data = column_data.astype(float)
                h5f.create_dataset(column_label, data=column_data, dtype=float)

#        for k, v in df_as_dict.iteritems():
#            if isinstance(v[0], float):
#                h5f.create_dataset(k, data=v, dtype=float)
#            elif isinstance(v[0], float):
        h5f.close()
        return

    def load_from_h5(self,path):
        """
        inverse of save_to_h5; Handle traces, then other columns, then json cfg
        """
        h5f = h5py.File(path, 'r')
        dict_for_df = {}
        #<load traces>
        for component_id in COMPONENT_IDS:
            try:
                trace_label = '{}_trace'.format(component_id)
                trace_data = h5f.get(trace_label)
                trace_data = np.asarray(trace_data)
                trace_data = list(trace_data)
                dict_for_df[trace_label] = trace_data
            except KeyError:
                logger.info('Skipping loading {} as it DNE'.format(trace_label))
        #</load traces>

        for key in h5f.keys():
            if key[-9:]=='ial_trace':#skip traces
                continue
            data = h5f.get(key)
            dict_for_df[key] = data

        df = pd.DataFrame(dict_for_df)
        self.dataframe = df
        return


        pass

    def append_to_h5(self,path):
        pass

    def add_global_config(self,global_config, file_id):
        self._global_configs[file_id] = global_config
        return file_id

    def remove_global_config(self,index):
        pass

    def global_config_by_index(self,index):
        return self._global_configs[index]

    def component_as_array(self, component_id):
        """
        returns the data form component as a 2d numpy array with trace index
        running along rows (zero-index).  Useful for slicing data and linalg.
        """
        column_name = '{}_trace'.format(component_id)
        data_array = np.atleast_2d(list(self.dataframe[column_name]))
        return data_array

def main():
    pass

if __name__ == "__main__":
  main()
