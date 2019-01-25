#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:44:16 2019

@author: thiago
"""

import json

from dcrhino3.process_flow.process_flow import ProcessFlow
from dcrhino3.process_flow.hole_selector import HoleSelector
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.models.env_config import EnvConfig


process_flow_path = "/home/thiago/Documents/Projects/Dc_rhino/v3/bin/process_flows/example_simple_flow.json"
holes_selection_path = "/home/thiago/Documents/Projects/Dc_rhino/v3/bin/process_flows/holes_selection/example_hole_selection.json"
acorr_h5_file_path = "/home/thiago/milligan_cache/interpolated/59219.h5"
env_cfg = EnvConfig()

with open(process_flow_path) as f:
    process_json = json.load(f)


with open(holes_selection_path) as f:
    hole_selection_json = json.load(f)

hole_selector = HoleSelector(hole_selection_json)

acorr_trace = TraceData()
acorr_trace.load_from_h5(acorr_h5_file_path)


process_flow = ProcessFlow(process_json)
acorr_trace = process_flow.process(acorr_trace)



