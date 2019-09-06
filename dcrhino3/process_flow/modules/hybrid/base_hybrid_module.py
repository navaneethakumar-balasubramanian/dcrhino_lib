# -*- coding: utf-8 -*-
"""
splitted trace means traces have been sorted so that all global_config and
transformed args are common.
"""
import numpy as np
import pandas as pd
import time
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.process_flow.modules.base_module import BaseModule
from dcrhino3.models.traces.splitted_trace import SplittedTrace

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
        """
        :param trace: models.trace_dataframe.TraceData() class
        :return:
        """
        trace = self.before_process_start(trace)
        splitted_traces = self.split_trace_by_acor_file_id(trace)

        for i,splitted_trace in enumerate(splitted_traces):
            splitted_traces[i] = self.process_splitted_trace(splitted_trace)

        trace = self.merge_splitted_trace(splitted_traces,trace)
        trace = self.before_process_finish(trace)
        return trace

    def process_splitted_trace(self,splitted_trace):
        return splitted_trace

    def merge_splitted_trace(self,splitted_trace,trace):
        df = pd.DataFrame()
        for splitted_trace_part in reversed(splitted_trace):
            df = pd.concat([df,splitted_trace_part.dataframe])
        trace.dataframe = df.sort_values('measured_depth')
        return trace

    def before_process_start(self,trace):
        """
        backup copy of original data in case module specifically set to Not Alter traces, or columns
        :param trace:
        :return:
        """
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

        trace.add_applied_module(self.applied_module_string(self.args))

        if self.output_to_file:
            trace.save_to_h5(self.output_file_basepath(extension=".h5"))

        return trace

    def split_trace_by_acor_file_id(self,trace):
        """
        .:TODO:. this method is adding a fair amount of complexity to the processing, but it mostly unnessecary.
        I have yet to encounter a case where the acorr file id is different AND the acutal
        acquistion configuration is different as well.
        We could likely simplify the code flow Significantly by making this
        split occur on the acq configuration AND acorr_id.

        """
        trace_groups = []
        config_groups = trace.dataframe.groupby("acorr_file_id")
        for config_group in list(config_groups):
            df = config_group[1]
            if len(df) > 0:
                global_config = trace.global_config_by_index(df["acorr_file_id"].values[0])
                transformed_args = self.get_transformed_args(global_config)
                trace_group = SplittedTrace(df,transformed_args)
                trace_groups.append(trace_group)
        return trace_groups
