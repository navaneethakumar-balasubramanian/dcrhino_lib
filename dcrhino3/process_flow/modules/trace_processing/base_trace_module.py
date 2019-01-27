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
from dcrhino3.process_flow.modules.base_module import BaseModule

class BaseTraceModule(BaseModule):
    def __init__(self, json, output_path):
        """
        @ivar id: data_processing_stage_designator
        """
        BaseModule.__init__(self, json, output_path)
        self.id = "base_trace_module"


    def process_trace_data(self,trace,args=None):
        """
        works with a TraceData() class, typically an entire hole, or
        dataframe spanning a time interval comprising many traces
        """
        output_df = trace.dataframe.copy()
        #n_rows = len(output_df)
        #acorr_column = output_df['acorr_file_id'].values


        for line_idx in range(len(output_df)):
            #print(line_idx)
            row_of_df = output_df.iloc[line_idx]
            trace_config = trace.global_config_by_index(row_of_df['acorr_file_id'])
            for component_id in trace_config.components_to_process:
                #print(component_id, line_idx)
                component_column_on_df = component_id+"_trace"
                trace_to_process = row_of_df[component_column_on_df]
                processed_trace = self.process_component(component_id,
                                                         trace_to_process,
                                                         trace_config)
                output_df.at[line_idx, component_column_on_df] = processed_trace

        trace.dataframe = output_df

        trace.add_applied_module(self.applied_module_string(args))

#        if self.output_to_file():
#            trace.save_to_h5(self.output_path)

        return trace

    def process_component(self,component_id,component_array,global_config):
        """
        this function is to be overwritten on each Module class.  It is basically
        the "make" method for the data processing
        """
        return component_array


