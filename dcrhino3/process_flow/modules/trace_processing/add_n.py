#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: thiago
"""

# -*- coding: utf-8 -*-

import pdb
from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule

class AddNModule(BaseTraceModule):
    def __init__(self,json,output_path):
        BaseTraceModule.__init__(self,json,output_path)
        self.id = "add_n"
        
    def process_component(self,component_id,component_array,global_config):
        #pdb.set_trace()
        transformed_args = self.get_transformed_args(global_config)
        if component_id in transformed_args.keys():
            component_array += transformed_args[component_id]
        return component_array