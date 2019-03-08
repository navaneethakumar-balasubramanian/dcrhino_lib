# -*- coding: utf-8 -*-
"""
Created on Wed Mar  6 14:16:56 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
from plotter_core import plotty_mcplotsalot

class RhinoDisplay(object):
    def __init__(self):
        self.panels = {}
        self.dict = {}

    def plot(self):
        plotty_mcplotsalot(self.dict)

        pass


class RhinoDisplayPanel(object):
    def __init__(self):
        self.plot_style = None
        self.dict = {}

    def to_dict(self):
        print("this makes a dict/json with params")
        pass


class Header(RhinoDisplayPanel):
    def __init__(self):
        RhinoDisplayPanel.__init__(self)
        self.plot_style = "header"

class Heatmap(RhinoDisplayPanel):
    def __init__(self):
        RhinoDisplayPanel.__init__(self)
        self.plot_style = "heatmap"

class Heatmap(RhinoDisplayPanel):
    def __init__(self):
        RhinoDisplayPanel.__init__(self)
        self.plot_style = "heatmap"



def test_rhino_display():
    rhino_display = RhinoDisplay()
    header_1 = Header()
    heatmap_1 = Heatmap()
    header_2 = Header()
    heatmap_2 = Heatmap()

    rd_dict = {}
    rd_dict['1'] = header_1.to_dict()
    rd_dict['2'] = heatmap_1.to_dict()
    rd_dict['3'] = header_2.to_dict()
    rd_dict['4'] = heatmap_2.to_dict()


    rhino_display.dict = rd_dict
    rhino_display.plot()

def main():
    """
    """
    test_rhino_display()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
