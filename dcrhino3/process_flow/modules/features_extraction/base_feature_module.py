# -*- coding: utf-8 -*-
"""

"""
import numpy as np
import pandas as pd
import time
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.models.trace_dataframe import split_df_to_simple_and_array
from dcrhino3.process_flow.modules.base_module import BaseModule

logger = init_logging(__name__)



def strip_k0_from_trace_column_labels(df):
    """
    hacky fix, can be made general by finding pattersn with
    {}_axial_trace, etc.
    """
    mapper = {}
    if 'K0_axial_trace' in df.columns:
        mapper['K0_axial_trace'] = 'axial_trace'
    if 'K0_tangential_trace' in df.columns:
        mapper['K0_tangential_trace'] = 'tangential_trace'
    if 'K0_radial_trace' in df.columns:
        mapper['K0_radial_trace'] = 'radial_trace'
    df = df.rename(index=str, columns=mapper)
    return df

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
                line_features_dict.update(component_features)


            features_dict_list[line_idx] = line_features_dict

        features_df = pd.DataFrame(features_dict_list)

        #<problem HERE if I use axial_trace rather than K0_axial_trace
        
        merged = pd.concat([features_df,trace.dataframe],axis=1)


        trace.dataframe = merged

        trace.add_applied_module(self.applied_module_string(self.args))

        if self.output_to_file:
            features_df, arrays_df = split_df_to_simple_and_array(features_df)
            features_df.to_csv(self.output_path,index=False)
            #trace_dataframe can be cast as TraceData and then df = self.copy_without_trace_data()
            if arrays_df.empty:
                pass
            else:
                tmp_trace_data = TraceData(df=arrays_df)
                tmp_trace_data.dataframe = strip_k0_from_trace_column_labels(tmp_trace_data.dataframe)
                df_path = self.output_path.replace('.csv', '.h5')
                tmp_trace_data.save_to_h5(df_path)
                

        return trace

    def extract_feature_component(self, component_id, component_array,
                                  transformed_args, timestamp):
        """
        this function is to be overwritten on each Module class.  It is basically
        the "make" method for the data processing
        """
        line_features_dict = dict()
        return line_features_dict


