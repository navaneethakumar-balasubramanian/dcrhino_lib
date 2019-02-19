# -*- coding: utf-8 -*-
"""
@TODO: 20190127; rename this to BaseTraceProcessingModule, or just call it
base.py and that its in trace_processing folder.  THis module is all about
the action of processing and so processing should figure in its name so
one knows can reference it easily;
"""

import pdb
#import json
from dcrhino3.process_flow.modules.base_module import BaseModule

class BaseTraceModule(BaseModule):
    def __init__(self, json, output_path):
        """
        @ivar id: data_processing_stage_designator
        """
        BaseModule.__init__(self, json, output_path)
        self.id = "base_trace_module"


    def process_trace_data(self,trace):
        """
        works with a TraceData() class, typically an entire hole, or
        dataframe spanning a time interval comprising many traces

        @note 20140214: note that the pandas Dataframe at() method, used below
        gives value errors when a sub-dataframe is used ... this can be fixed
        probably by redefinign the indexing or using timestamp as an index ... iloc does not have this
        problem ...  this problem happens when I pass a random slice (rows 100 to 110 for example)
        of a dataframe into processing, rather than the first 10 rows

        """
        output_df = trace.dataframe.copy()


        previous_acorr_file_id = None

        for line_idx in range(len(output_df)):
            #print(line_idx)
            row_of_df = output_df.iloc[line_idx]
            if previous_acorr_file_id != row_of_df['acorr_file_id']:
                trace_config = trace.global_config_by_index(row_of_df['acorr_file_id'])
                #print type(trace_config)
                transformed_args = self.get_transformed_args(trace_config)
                previous_acorr_file_id = row_of_df['acorr_file_id']

            for component_id in trace_config.components_to_process:
                component_column_on_df = component_id+"_trace"
                trace_to_process = row_of_df[component_column_on_df]
                processed_trace = self.process_component(component_id,
                                                         trace_to_process,
                                                         transformed_args)
                output_df.at[line_idx, component_column_on_df] = processed_trace

        trace.dataframe = output_df

        trace.add_applied_module(self.applied_module_string(self.args))

        if self.output_to_file:
            trace.save_to_h5(self.output_path)

        return trace

    def process_component(self,component_id,component_array,transformed_args):
        """
        this function is to be overwritten on each Module class.  It is basically
        the "make" method for the data processing
        component_id, 'axial', 'radial', ... etc.
        component_array, numpy array, 1d of trace
        transformed_args : global config's cousin

        """
        return component_array


