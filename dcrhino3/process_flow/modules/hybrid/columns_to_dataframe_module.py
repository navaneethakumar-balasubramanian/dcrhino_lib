#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: thiago
"""

# -*- coding: utf-8 -*-

import pdb
from dcrhino3.process_flow.modules.hybrid.base_hybrid_module import BaseHybridModule


class ColumnsToDataframeModule(BaseHybridModule):
    def __init__(self, json, output_path, process_flow, order):
        BaseHybridModule.__init__(self, json, output_path, process_flow, order)
        self.id = "columns_to_df"
        self.can_alter_trace = False
        self.can_create_columns = True

    def process_splitted_trace(self, splitted_trace):
        transformed_args = splitted_trace.transformed_args
        for col in transformed_args.__dict__.keys():
            splitted_trace.dataframe[col] = transformed_args.__getattribute__(col)
        return splitted_trace