# -*- coding: utf-8 -*-

import pdb
#import json
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.base_module import BaseModule
from dcrhino3.models.trace_dataframe import COMPONENT_IDS, TRACE_COLUMN_LABELS

logger = init_logging(__name__)

class BaseTraceArrayModule(BaseModule):
    def __init__(self, json, output_path):
        BaseModule.__init__(self, json, output_path)
        self.id = "base_trace_array_module"


    def process_trace_data(self, trace, args=None):
        """
        works with a TraceData() class, typically an entire hole, or
        dataframe spanning a time interval comprising many traces

        This is the complement to base_trae module, reserved for operations
        like slicing which are inefficient trace-by-trace;
        """
        output_df = trace.dataframe.copy()#deep=False)
        #output_df = trace.copy_without_trace_data()
        logger.warning("using zeroth row of df to dictate acorr_file_id - \
                       add a check to confirm all rows are same config")
        row_of_df = trace.dataframe.iloc[0]
        trace_config = trace.global_config_by_index(row_of_df['acorr_file_id'])
        transformed_args = self.get_transformed_args(trace_config)
        for component_id in COMPONENT_IDS:
            component_column_on_df = component_id+"_trace"
            data_array = trace.component_as_array(component_id)
            processed_array = self.process_component(component_id, data_array, transformed_args)
            processed_array = list(processed_array)
            output_df[component_column_on_df] = processed_array

        trace.dataframe = output_df
        trace.add_applied_module(self.applied_module_string(args))

        if self.output_to_file:
            trace.save_to_h5(self.output_path)

        return trace

    def process_component(self,component_id, component_array, global_config):
        """
        this function is to be overwritten on each Module class.  It is basically
        the "make" method for the data processing
        """
        return component_array


