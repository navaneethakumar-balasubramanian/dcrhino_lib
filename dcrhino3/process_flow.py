# -*- coding: utf-8 -*-

from __future__ import absolute_import, division, print_function
import json
import logging

from dcrhino3.process_flow.modules.trace_processing.band_pass_filter import BandPassFilterModule
class ProcessFlow:
    def __init__(self,process_json):        
        self.parse_json(process_json)
        
        self.trace_processing_modules = {
                                            "band_pass_filter":BandPassFilterModule
                                        }
        
    def parse_json(self,process_json):
        if 'trace_processing' in process_json.keys():
            trace_processing_json = process_json['trace_processing']
            if 'modules' in trace_processing_json.keys():
                trace_processing_modules_json = trace_processing_json['modules']
                for module_id in trace_processing_modules_json.keys():
                    print (module_id)
                
    #def create_module_instance_by_id(self,module_id,json):
        


with open('/home/thiago/Documents/Projects/Dc/process_flow.json') as f:
    process_json = json.load(f)
ProcessFlow(process_json)

