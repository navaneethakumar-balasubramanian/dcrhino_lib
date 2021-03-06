#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mar 20 2019

@author: karl
"""

# -*- coding: utf-8 -*-

import pdb
from dcrhino3.process_flow.modules.features_extraction.base_feature_module import BaseFeatureModule
from dcrhino3.feature_extraction.feature_extractor_j2 import FeatureExtractorJ2

class J2FeaturesModule(BaseFeatureModule):
    def __init__(self, json, output_path, process_flow, order):
        BaseFeatureModule.__init__(self, json, output_path, process_flow, order)
        self.id = "j2"

    def extract_feature_component(self, component_id, trace_to_process, transformed_args, timestamp):
        if component_id == 'radial':
            return {}
        #logger.warning("Without a hybrid module or at least the ability\
        #                       to add/read_from the process_flow we need this hokey, \
        #                       error prone handling of sampling rate below")
        feature_extractor = FeatureExtractorJ2(component_id, trace_to_process, transformed_args, timestamp)
        #pdb.set_trace()
        line_feature_dict = feature_extractor.extract_features()#(component_id, trace_to_process, transformed_args, timestamp)

        return line_feature_dict
