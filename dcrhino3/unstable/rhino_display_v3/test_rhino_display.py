# -*- coding: utf-8 -*-
"""
Created on Thu Mar  7 17:04:13 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

from rhino_display import RhinoDisplay
from rhino_display import Header, Heatmap

home = os.path.expanduser('~/')
h5_path = os.path.join(home, '.cache/datacloud/line_creek/acorr/23531_5208_5208.h5')

def test_rhino_display():
    pdb.set_trace()
    rhino_display = RhinoDisplay()
    header_1 = Header(h5=h5_path)
    heatmap_1 = Heatmap(h5=h5_path)
    header_2 = Header(h5=h5_path)
    heatmap_2 = Heatmap(h5=h5_path)

    rd_dict = {}
    rd_dict['1'] = header_1.to_dict()
    rd_dict['2'] = heatmap_1.to_dict()
    rd_dict['3'] = header_2.to_dict()
    rd_dict['4'] = heatmap_2.to_dict()
    rd_dict['1'] = header_1
    rd_dict['2'] = heatmap_1
    rd_dict['3'] = header_2
    rd_dict['4'] = heatmap_2

    rhino_display.json_dict = rd_dict
    rhino_display.panels = [header_1, heatmap_1, header_2, heatmap_2]
    pdb.set_trace()
    rhino_display.plot()

def main():
    """
    """
    test_rhino_display()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
