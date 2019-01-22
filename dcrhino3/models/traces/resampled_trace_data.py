#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Jan 22 18:22:00 2019

@author: thiago
"""


import h5py
import numpy as np
import pandas as pd
import pdb
import time
from scipy.interpolate import interp1d

from dcrhino3.models.config import Config
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.trace_processing.autocorrelate import autocorrelate_trace


logger = init_logging(__name__)

class ResampledTraceData(TraceData):
    def load_from_db(self,db_helper,files_ids,min_ts,max_ts):
        self.dataframe = db_helper.get_autocor_traces_from_files_ids(files_ids,min_ts,max_ts)
        