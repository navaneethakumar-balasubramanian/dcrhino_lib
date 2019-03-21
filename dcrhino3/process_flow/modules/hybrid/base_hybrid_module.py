# -*- coding: utf-8 -*-
"""

"""
import numpy as np
import pandas as pd
import time
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.process_flow.modules.base_module import BaseModule

logger = init_logging(__name__)

class BaseHybridModule(BaseModule):
    def __init__(self, json, output_path,process_flow, order):
        """
        @ivar id: data_processing_stage_designator
        """
        BaseModule.__init__(self, json, output_path,process_flow, order)
        self.id = "base_hybrid_module"
        self.can_alter_trace = True
        self.can_create_columns = True
        self.original_component_columns_data = {}
        self.original_columns = []

    def process_trace(self,trace):
        trace = self.before_process_start(trace)
        splitted_trace = self.split_trace_by_acor_file_id(trace)
        splitted_trace = self.process_splitted_trace(splitted_trace)
        trace = self.merge_splitted_trace(splitted_trace,trace)
        return self.before_process_finish(trace)

    def process_splitted_trace(self,splitted_trace):
        return splitted_trace

    def merge_splitted_trace(self,splitted_trace,trace):
        df = pd.DataFrame()
        for splitted_trace_part in splitted_trace:
            df = pd.concat([df,splitted_trace_part.dataframe])
        trace.dataframe = df
        return trace

    def before_process_start(self,trace):
        if not self.can_alter_trace:
            for component_column in trace.component_columns:
                self.original_component_columns_data[component_column] = trace.dataframe[component_column]

        if not self.can_create_columns:
            self.original_columns = trace.dataframe.columns
        return trace

    def before_process_finish(self,trace):
        if not self.can_alter_trace:
            for component_column in trace.component_columns:
                trace.dataframe[component_column] = self.original_component_columns_data[component_column]

        if not self.can_create_columns:
            trace.dataframe = trace.dataframe[self.original_columns]

        return trace

    def split_trace_by_acor_file_id(self,trace):
        trace_groups = []
        config_groups = trace.dataframe.group_by("acorr_file_id")
        for config_group in list(config_groups):
            df = config_groups.get_group(config_group)
            global_config = trace.global_config_by_index(df["acorr_file_id"].values[0])
            transformed_args = self.get_transformed_args(global_config)
            trace_group = {"config":global_config,"dataframe":df,"transformed_args":transformed_args}
            trace_groups.append(trace_group)
        return trace_groups