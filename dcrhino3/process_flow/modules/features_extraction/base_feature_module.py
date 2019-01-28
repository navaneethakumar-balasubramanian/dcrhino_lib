# -*- coding: utf-8 -*-
"""
@TODO: 20190127; rename this to BaseTraceProcessingModule, or just call it
base.py and that its in trace_processing folder.  THis module is all about
the action of processing and so processign should figure in its name so
one knows can reference it easily;
dcrhino3/process_flow/modules/trace_processing/base_trace_module.py
"""

import pdb
#import json
import pandas as pd
from dcrhino3.process_flow.modules.base_module import BaseModule

class BaseFeatureModule(BaseModule):
    def __init__(self, json, output_path):
        """
        @ivar id: data_processing_stage_designator
        """
        BaseModule.__init__(self, json, output_path)
        self.id = "base_feature_module"


    def extract_features(self,trace,args=None):
        """
        works with a TraceData() class, typically an entire hole, or
        dataframe spanning a time interval comprising many traces
        """
        output_df = trace.dataframe.copy()
        features_dict_array = [None] * len(output_df) 
        
        for line_idx in range(len(output_df)):
            row_of_df = output_df.iloc[line_idx]
            line_features_dict = {}
            trace_config = trace.global_config_by_index(row_of_df['acorr_file_id'])
            transformed_args = self.get_transformed_args(trace_config)
            
            for component_id in trace_config.components_to_process:
                component_column_on_df = component_id+"_trace"
                trace_to_process = row_of_df[component_column_on_df]
                component_features = self.extract_feature_component(component_id,
                                                                 trace_to_process,
                                                                 transformed_args)
                #pdb.set_trace()
                line_features_dict.update(component_features)
                
            
            features_dict_array[line_idx] = line_features_dict

        features_df = pd.DataFrame(features_dict_array)
        
        merged = pd.concat([features_df,trace.dataframe],axis=1)
        
        trace.dataframe = merged

        trace.add_applied_module(self.applied_module_string(args))

#        if self.output_to_file:
#            trace.save_to_h5(self.output_path)

        return trace

    def extract_feature_component(self,component_id,component_array,transformed_args):
        """
        this function is to be overwritten on each Module class.  It is basically
        the "make" method for the data processing
        """
        line_features_dict = dict()
        return line_features_dict


