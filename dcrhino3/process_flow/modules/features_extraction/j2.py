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
    """
    Control the J2 features module, and create a dictionary of line features
    """
    def __init__(self, json, output_path, process_flow, order):
        """
        Goes through the BaseFeatureModule

        Args:
            json: dictionary of json features
            output_path: path to place file
            process_flow: process flow object
            order: where is feature extraction in the order of processes
        """
        BaseFeatureModule.__init__(self, json, output_path, process_flow, order)
        self.id = "j2"

    def extract_feature_component(self, component_id, trace_to_process, transformed_args, timestamp):
        """
        Pull features using the feature extraction modules.

        Args:
            component_id (str): which component is being extracted
            trace_to_process (numpy array): trace data
            transformed_args: obj from general helper function with metadata
            timestamp: when was this extraction made

        Returns:
            line_feature dictionary from the j2 feature extractor

        """
        if component_id == 'radial':
            return {}
        #logger.warning("Without a hybrid module or at least the ability\
        #                       to add/read_from the process_flow we need this hokey, \
        #                       error prone handling of sampling rate below")
        feature_extractor = FeatureExtractorJ2(component_id, trace_to_process, transformed_args, timestamp)
        #pdb.set_trace()
        line_feature_dict = feature_extractor.extract_features()#(component_id, trace_to_process, transformed_args, timestamp)

        return line_feature_dict
