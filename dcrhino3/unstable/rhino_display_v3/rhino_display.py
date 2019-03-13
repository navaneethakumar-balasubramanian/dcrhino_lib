# -*- coding: utf-8 -*-
"""
Created on Thu Mar  7 16:09:50 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
#import numpy as np
#import os
import pdb

font_size = 11
params = {
        'legend.fontsize': font_size,
         'axes.labelsize': font_size,
         'axes.titlesize':font_size,
         'xtick.labelsize':font_size,
         'ytick.labelsize':font_size/1.5
}
plt.rcParams.update(params)

class RhinoDisplay(object):
    def __init__(self):
        self.panels = {}
        self.json_dict = {}

    def dc_plot_lim(self):
        """
        width, height in inches
        """
        dc_plot_lim = (24,12)
        return dc_plot_lim

    def plot(self):
        """
        plotty_mcplotsalot(self.dict)
        """
        n_panels = len(self.json_dict.keys())
        n_panels = len(self.panels)
        fig, ax = plt.subplots(n_panels, sharex=False, figsize=self.dc_plot_lim())
        for i_panel in range(n_panels):

            axx = ax[i_panel]
            panel = self.panels[i_panel]
            panel._load_trace_data()
            panel.plot(axx)

        print(n_panels)
        print('ok, start plttoing')
        plt.show()

def my_function():
    """
    """
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
