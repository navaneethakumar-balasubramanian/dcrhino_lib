#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""

@author: natal
"""

from __future__ import absolute_import, division, print_function
from datetime import datetime
import h5py
#import os
import numpy as np
import pandas as pd
import pdb
from enum import Enum
from dcrhino3.models.config import Config


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
        print('howdoyoudo')
        self.dataframe = kwargs.get('df', pd.DataFrame())
        self.applied_modules = []
        self._global_configs = []

    def apply_module(self,module_type,arguments):
        self.applied_modules.append({module_type:arguments})
        #return the index where it was appended
        return len(self.applied_modules)-1
    
    def load_from_db(self,db_helper,files_ids,min_ts,max_ts):
        self.dataframe = db_helper.get_autocor_traces_from_files_ids(files_ids,min_ts,max_ts)
        configs = db_helper.get_configs_from_files_ids(files_ids)
        for conf in configs:
            global_config = Config()
            global_config.set_data_from_json(conf)
        
            
            

    def save_to_h5(self,path):
        """
        @note: when porting to python3 replace iteritems with items see Keith's answer in
        https://stackoverflow.com/questions/10458437/what-is-the-difference-between-dict-items-and-dict-iteritems
        @warning: this requires dtypes to be float, will need to use a mapping of
        dtypes for df columns ... where will we get this? @Thiago: will this
        be maintained in database models?
        @Natal:
        """
        df_as_dict = dict(self.dataframe)
        h5f = h5py.File('data.h5', 'w')
        for k, v in df_as_dict.iteritems():
            h5f.create_dataset(k, data=v, dtype=float)
        h5f.close()
        return

    def load_from_h5(self,path):
        pass

    def append_to_h5(self,path):
        pass

    def add_global_config(self,global_config):
        self._global_configs.append(global_config)
        #return the index where it was appended
        return len(self._global_configs)-1

    def remove_global_config(self,index):
        pass

    def global_config_by_index(self,index):
        return self._global_configs[index]

    def component_as_array(self, component_id):
        """
        returns the data form component as a 2d numpy array with trace index
        running along rows (zero-index).  Useful for slicing data and linalg.
        """
        return np.atleast_2d(list(self.dataframe[component_id]))



if __name__ == "__main__":
  main()
