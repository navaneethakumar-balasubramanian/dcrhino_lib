#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: thiago
"""

# -*- coding: utf-8 -*-

import pdb
from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule

class AddOneModule(BaseTraceModule):
    def __init__(self,json,output_path):
        BaseTraceModule.__init__(self,json,output_path)
        self.id = "add_one"
        
    def process_component(self,component_id,component_array,global_config):
        return component_array+1