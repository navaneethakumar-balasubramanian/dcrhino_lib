#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""

@author: natal
"""

from __future__ import absolute_import, division, print_function
import pdb
from datetime import datetime
import os
import numpy as np
import pandas as pd
from enum import Enum

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
    def __init__(self):
        self.dataframe = pd.DataFrame()
        self.applied_modules = []
        self._global_configs =[]

    def apply_module(self,module_type,arguments):
        self.applied_modules.append({module_type:arguments})
        #return the index where it was appended
        return len(self.applied_modules)-1

    def save_to_h5(self,path):
        pass

    def load_from_h5(self,path):
        pass

    def append_to_h5(self,path):
        pass

    def add_global_config(self,global_config):
        self._global_config.append(global_config)
        #return the index where it was appended
        return len(self._global_config)-1

    def remove_global_config(self,index):
        pass

    def global_config_by_index(self,index):
        return self._global_configs[index]



if __name__ == "__main__":
  main()
