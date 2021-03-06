#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: thiago
"""

# -*- coding: utf-8 -*-

import pdb
from dcrhino3.process_flow.modules.features_extraction.base_feature_module import BaseFeatureModule
from dcrhino3.feature_extraction.feature_extractor_j1a import FeatureExtractorJ1

class J1FeaturesModule(BaseFeatureModule):
    def __init__(self,json,output_path,process_flow,order):
        BaseFeatureModule.__init__(self,json,output_path,process_flow,order)
        self.id = "j1"

    def extract_feature_component(self, component_id, trace_to_process, transformed_args, timestamp):
        if component_id == 'radial':
            return {}
        feature_extractor = FeatureExtractorJ1(component_id, trace_to_process, transformed_args, timestamp)
        #pdb.set_trace()
        line_feature_dict = feature_extractor.extract_features()#(component_id, trace_to_process, transformed_args, timestamp)

        return line_feature_dict