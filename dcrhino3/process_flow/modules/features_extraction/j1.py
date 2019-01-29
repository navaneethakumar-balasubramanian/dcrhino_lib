#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: thiago
"""

# -*- coding: utf-8 -*-

import pdb
from dcrhino3.process_flow.modules.features_extraction.base_feature_module import BaseFeatureModule

class J1FeaturesModule(BaseFeatureModule):
    def __init__(self,json,output_path):
        BaseFeatureModule.__init__(self,json,output_path)
        self.id = "j1"

    def extract_feature_component(self, component_id, trace_to_process, transformed_args, timestamp):
        line_features_dict = dict()
        line_features_dict[component_id + "_example_feature"] = 1
        return line_features_dict