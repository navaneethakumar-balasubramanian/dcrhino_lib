#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: thiago
"""

# -*- coding: utf-8 -*-

import pdb
from dcrhino3.process_flow.modules.features_extraction.base_feature_module import BaseFeatureModule
from dcrhino3.feature_extraction.feature_extractor_j0 import FeatureExtractorJ0
from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)

class J0FeaturesModule(BaseFeatureModule):
    def __init__(self,json,output_path):
        BaseFeatureModule.__init__(self,json,output_path)
        self.id = "j0"

    def extract_feature_component(self, component_id, component_array, transformed_args, trace_timestamp):
        extractor = FeatureExtractorJ0(transformed_args)
        logger.error("J0 features not yet implemented in V3")
        original_features = extractor.extract_features(component_id, component_array,
                                                       trace_timestamp,transformed_args)
        return original_features
