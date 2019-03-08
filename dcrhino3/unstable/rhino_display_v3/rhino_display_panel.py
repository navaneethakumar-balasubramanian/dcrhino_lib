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



from dcrhino3.models.trace_dataframe import TraceData



class RhinoDisplayPanel(object):
    def __init__(self, **kwargs):
        self.plot_style = None
        self.dict = {}
        self.h5_file = kwargs.get('h5', None)

    def to_dict(self):
        print("this makes a dict/json with params")
        pass

    def _load_dataframe(self):
        """
        placeholder, not atall  sure this is the right way ... but think
        a method like this is needed, jusstnot hths exact one
        """
        td = TraceData()
        td.load_from_h5(self.h5_file)
        self.df = td.dataframe

class Curve(object):
    """
    """
    def __init__(self):
        self.column_label = ''
        self.axes_limits = None


class Header(RhinoDisplayPanel):
    def __init__(self, **kwargs):
        super(Header, self).__init__(**kwargs)
        #super(RhinoDisplayPanel, .__init__(self).__init__(**kwargs)
        self.plot_style = "header"
        self.list_of_curve_to_plot = []



    def plot(self, ax):
        """
        """
        for curve_label in self.list_of_curve_to_plot:
            ax.plot(np.random.rand(44))

class Heatmap(RhinoDisplayPanel):
    def __init__(self, **kwargs):
        super(Heatmap, self).__init__(**kwargs)
        #RhinoDisplayPanel.__init__(self)
        self.plot_style = "heatmap"
    def plot(self, ax):
        ax.plot(np.random.rand(44))

class Wiggle(RhinoDisplayPanel):
    def __init__(self):
        RhinoDisplayPanel.__init__(self)
        self.plot_style = "wiggle"



def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
