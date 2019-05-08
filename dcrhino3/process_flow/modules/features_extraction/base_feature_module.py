# -*- coding: utf-8 -*-
"""

"""
import pandas as pd
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.base_module import BaseModule

logger = init_logging(__name__)

def mergey_mc_mergealot(new_features_df, old_dataframe):
    """
    Special function for K0 features which redefine the traces. Can be made much more general but for now...
    1. Find traces (array-type elements) in the new_features dataframe and
    and overwrite their corresponding old dataframe, then use pandas merge
    on the rest of the columns
    """
    common_column_labels = list(set(new_features_df.columns).intersection(set(old_dataframe.columns)))
    old_dataframe.update(new_features_df, overwrite=True)
    new_features_df.drop(common_column_labels, axis=1, inplace=True)
    merged = pd.concat([new_features_df, old_dataframe], axis=1)
    return merged



def strip_k0_from_trace_column_labels(df):
    """
    hacky fix, can be made general by finding pattersn with
    {}_axial_trace, etc.

    Parameters:
        df (dataframe): dataframe to be feature extracted
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
    """
    Set up to use the feature extractor process flow module.
    """
    def __init__(self, json, output_path,process_flow, order):
        """
        @ivar id: data_processing_stage_designator
        """
        BaseModule.__init__(self, json, output_path,process_flow, order)
        self.id = "base_feature_module"


    def process_trace(self,trace):
        return self.extract_features(trace)

    def extract_features(self,trace):
        """
        Works with a TraceData() class, typically an entire hole, or
        dataframe spanning a time interval comprising many traces

        Return:
            trace: TraceData object
        """
        output_df = trace.dataframe.copy()

        features_dict_list = [None] * len(output_df)

        for line_idx in range(len(output_df)):
            row_of_df = output_df.iloc[line_idx]
            line_features_dict = {}
            trace_config = trace.global_config_by_index(row_of_df['acorr_file_id'])
            transformed_args = self.get_transformed_args(trace_config)

            for component_id in self.components_to_process:
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

        merged = mergey_mc_mergealot(features_df,trace.dataframe)

        trace.dataframe = merged

        trace.add_applied_module(self.applied_module_string(self.args))

        if self.output_to_file:
            features_df.to_csv(self.output_file_basepath(extension=".csv"),index=False)


        return trace

    def extract_feature_component(self, component_id, component_array,
                                  transformed_args, timestamp):
        """
        After setup, this function is to be overwritten on each Module class.  It is basically
        the "make" method for the data processing

        Returns:
             line_features_dict a dictionary with extracted features
        """
        line_features_dict = dict()
        return line_features_dict


