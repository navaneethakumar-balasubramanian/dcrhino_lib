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

font_size = 9
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
        self.padding_right = 0
        self.padding_left = 0
        self.padding_bottom = 0
        self.padding_top = 0



    def dc_plot_lim(self):
        """
        width, height in inches
        """
        dc_plot_lim = (24,12)
        return dc_plot_lim


    def plot(self,output_path=False,title=False,show=False,legend=False):
        """
        plotty_mcplotsalot(self.dict)
        """
        n_panels = len(self.json_dict.keys())
        n_panels = len(self.panels)
        fig, ax = plt.subplots(n_panels, sharex=False, figsize=self.dc_plot_lim())

        if legend:
            self.padding_bottom = 0.15

        plt.subplots_adjust(left=0.05 + self.padding_left,right=0.95 - self.padding_right,bottom=self.padding_bottom,top=0.9 - self.padding_top ,hspace = 0.2)
        if title:
            fig.text(0.01, 0.99, title[0],verticalalignment='top')
            fig.text(0.5, 0.99, title[1], verticalalignment='top',horizontalalignment="center")
            fig.text(0.99, 0.99, title[2], verticalalignment='top',horizontalalignment="right")


        if n_panels > 1:
            #first_ax = ax[0]
            for i_panel in range(n_panels):
                print(i_panel)
                axx = ax[i_panel]
                panel = self.panels[i_panel]
                panel.plot(axx)
        else:
            #first_ax = ax
            panel = self.panels[0]
            panel.plot(ax)

        if legend:
            f_leg = fig.legend()
            duplicate_list = []
            name_list = []
            leg_list = []
            for line in f_leg.get_lines():
                line_color = str(line.get_color())
                line_name  = str(line._label)

                if [line_name + line_color] not in duplicate_list:
                    leg_list.append(line)
                    duplicate_list.append([line_name+line_color])
                    name_list.append(line_name)


            f_leg.remove()
            transfig = fig.transFigure

            s_leg = plt.legend(iter(leg_list), name_list,
                        bbox_transform=transfig,
                        bbox_to_anchor=(0.5 + self.padding_left/2 - self.padding_right/2, self.padding_bottom/2),  # Position of legend
                        borderaxespad=0.1,  # Small spacing around legend box
                        title="Curve Legend",  # Title for the legend
                        facecolor="darkgrey",
                        loc='center',
                        ncol=int(round(len(leg_list)/3))
                    )

        plt.ioff()
        if output_path:
           # print("got here ")
            plt.savefig(output_path,format='png')
            #print("got here 2")
        if show:
            plt.show(block=True)
        #plt.close()
        #del fig
        #del ax
        return fig,ax




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
