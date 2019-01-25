# -*- coding: utf-8 -*-

import pdb
import json
from dcrhino3.process_flow.modules.base_module import BaseModule

class BaseTraceModule(BaseModule):
    def __init__(self,json,output_path):        
        BaseModule.__init__(self,json,output_path)
        self.id = "base_trace_module"
            
        
    def process_trace(self,trace,args=None):
        output_df = trace.dataframe.copy()
        
        for line_idx in range(len(output_df)):
            trace_config = trace.global_config_by_index(output_df.iloc[line_idx]['acorr_file_id'])
            for component_id in trace_config.components_to_process:
                component_column_on_df = component_id+"_trace"
                trace_to_process = output_df.iloc[line_idx][component_column_on_df]
                processed_trace = self.process_component(component_id,trace_to_process,trace_config)
                output_df.at[line_idx,component_column_on_df] = processed_trace
        
        trace.dataframe = output_df

        trace.add_applied_module(self.applied_module_string(args))

#        if self.output_to_file():
#            trace.save_to_h5(self.output_path)

        return trace
    
    def process_component(self,component_id,component_array,global_config):
        return component_array


