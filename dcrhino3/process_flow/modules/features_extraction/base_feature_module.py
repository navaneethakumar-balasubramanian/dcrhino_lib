# -*- coding: utf-8 -*-
"""

"""

import pandas as pd
import pdb
from dcrhino3.process_flow.modules.base_module import BaseModule

class BaseFeatureModule(BaseModule):
    def __init__(self, json, output_path):
        """
        @ivar id: data_processing_stage_designator
        """
        BaseModule.__init__(self, json, output_path)
        self.id = "base_feature_module"


    def extract_features(self,trace):
        """
        works with a TraceData() class, typically an entire hole, or
        dataframe spanning a time interval comprising many traces
        """
        output_df = trace.dataframe.copy()
        features_dict_list = [None] * len(output_df) 
        
        for line_idx in range(len(output_df)):
            row_of_df = output_df.iloc[line_idx]
            line_features_dict = {}
            trace_config = trace.global_config_by_index(row_of_df['acorr_file_id'])
            transformed_args = self.get_transformed_args(trace_config)

            for component_id in trace_config.components_to_process:
                component_column_on_df = component_id+"_trace"
                trace_to_process = row_of_df[component_column_on_df]
                timestamp = row_of_df.timestamp
                component_features = self.extract_feature_component(component_id,
                                                                 trace_to_process,
                                                                 transformed_args,
                                                                 timestamp)
                #pdb.set_trace()
                line_features_dict.update(component_features)
                
            
            features_dict_list[line_idx] = line_features_dict

        features_df = pd.DataFrame(features_dict_list)
        
        merged = pd.concat([features_df,trace.dataframe],axis=1)

        trace.dataframe = merged

        trace.add_applied_module(self.applied_module_string(self.args))
        
        if self.output_to_file:
            trace.save_to_csv(self.output_path)

        return trace

    def extract_feature_component(self, component_id, component_array,
                                  transformed_args, timestamp):
        """
        this function is to be overwritten on each Module class.  It is basically
        the "make" method for the data processing
        """
        line_features_dict = dict()
        return line_features_dict


