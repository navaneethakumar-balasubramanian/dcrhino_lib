# -*- coding: utf-8 -*-
"""
Created on Tue Mar  5 14:44:41 2019

@author: kkappler

plan here is to take the json in snippets so that we don't need to modify the
 individual files by the onerous process

 My approach will be to create (and maintain) a default json;

 This module will read-in the default json and populate its various layers
 with dictionaries.  Then it will allow for modification where needed

Flat attributes:
id	"v3.1_processing_flow"
output_to_file	true

Nested Attributes:
trace_processing	{…}
features_extraction	{…}
plotters	{…}

All have ['modules'] beneath,
This yields a list;



"""

from __future__ import absolute_import, division, print_function


import datetime
import json
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

trace_processing_json_template = {}
trace_processing_json_template['unfold'] =  {
        "type": "unfold",
        "output_to_file": False,
        "args": {}
        }

trace_processing_json_template['unfold'] =  {
        "type": "lead_channel_deconvolution",
        "output_to_file": False,
        "args": {
          "num_taps_in_decon_filter": "|global_config.num_taps_in_decon_filter|"
        }
        }



trace_processing_params = ['unfold', ]



#home = os.path.expanduser("~/")
def modify_json(json_in):
    """
    """
    json_dict = json_in.copy()
    plotter_controls = json_dict['plotters']['modules'][0]
    plotter_controls['args']['components_to_process'] = ['axial',]

    pdb.set_trace()
    return json_dict


def my_function():
    """
    """
    pdb.set_trace()
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
