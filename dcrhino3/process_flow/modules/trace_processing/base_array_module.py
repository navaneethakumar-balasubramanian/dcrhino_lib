# -*- coding: utf-8 -*-

import pdb
#import json
from dcrhino3.process_flow.modules.base_module import BaseModule
from dcrhino3.models.trace_dataframe import COMPONENT_IDS, TRACE_COLUMN_LABELS


class BaseTraceArrayModule(BaseModule):
    def __init__(self, json, output_path):
        BaseModule.__init__(self, json, output_path)
        self.id = "base_trace_array_module"


    def process_trace_data_as_array(self,trace,args=None):
        """
        works with a TraceData() class, typically an entire hole, or
        dataframe spanning a time interval comprising many traces

        This is the complement to base_trae module, reserved for operations
        like slicing which are inefficient trace-by-trace;
        """

        output_df = trace.copy_without_trace_data()
        n_rows = len(output_df)
        #acorr_column = output_df['acorr_file_id'].values

        for component_id in COMPONENT_IDS:
            component_column_label = component_id+"_trace"
            #print(component_id)
            data_array = trace.component_as_array(component_column_label)
            processed_array = self.process_component(component_id, data_array, trace_config)
                output_df.at[line_idx,component_column_on_df] = processed_trace

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


