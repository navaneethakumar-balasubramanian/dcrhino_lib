from dcrhino3.process_flow.modules.base_module import BaseModule
from dcrhino3.plotters.rhino_display_v3.rhino_display import RhinoDisplay
from dcrhino3.plotters.rhino_display_v3.rhino_display_panel import Header, Heatmap, Curve
from dcrhino3.models.drill_types import DrillTypes
from dcrhino3.models.bit_types import BitTypes
from dcrhino3.models.sensor_installation_locations import SensorInstallationLocations
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from dcrhino3.process_flow.modules.plotters.rhino_plotter_module import RhinoPlotterModule
from dcrhino3.helpers.general_helper_functions import init_logging
import matplotlib.collections as collections

logger = init_logging(__name__)
from matplotlib.widgets import Button

import matplotlib.lines as lines
import matplotlib as mpl

mpl.rcParams['toolbar'] = 'None'


class DraggableLine(object):
    def __init__(self,ax,x,y,original_color,label,boundaries):
        self.ax = ax
        self.y = y
        self.default_value = y
        self.minY = -100
        self.maxY = 100
        self.x_list = x
        self.y_list = np.full(len(self.x_list), y)
        self.original_color = original_color
        self.label = label
        self.boundaries = boundaries

        self.line = ax.plot(self.x_list, self.y_list, color=self.original_color, linestyle='--', linewidth=2)[0]
        self.line_label = self.ax.text(x.max() *1.001, self.y, self.label, fontsize=10, va="center",horizontalalignment='left',bbox=dict(boxstyle="round",
                   ec=(1., 0.5, 0.5),
                   fc=(1., 0.8, 0.8),
                   ))
        self.line_label.set_color("k")
        #self.line.set_marker("d")
        #self.line.set_fillstyle("full")

    def reset_to_default_values(self):
        self.moveY(self.default_value)

    def hoverOn(self):
        self.line.set_color("#ffffff")
        self.line_label.set_color("#ffffff")


    def hoverOff(self):
        self.line.set_color(self.original_color)
        self.line_label.set_color("k")

    def moveY(self,y):
        if y <= self.maxY and y >= self.minY:
            self.line.set_ydata(np.full(len(self.x_list), y))
            self.line_label.set_y(y-0.2)
            self.y = y



class RhinoPlotterPickerModule(RhinoPlotterModule):
    def __init__(self, json, output_path,process_flow,order):
        RhinoPlotterModule.__init__(self, json, output_path,process_flow,order)
        self.id = "rhino_plotter_picker"
        self.default_args.update({
            "component":"axial"
        })
        self.panel = None
        self.fig = None
        self.x_list = np.array([])
        self.y_list = np.array([])
        self.lines = []
        self.dragging_line = None
        self.boundaries = 0.2
        self.maskTop = None

        self.lines_default_values = [0,2,5,7,15,20]


    def process_trace(self, trace):
        rhino_display = RhinoDisplay()
        transformed_args = self.get_transformed_args(trace.first_global_config)
        self.transformed_args = transformed_args
        rhino_display.padding_left = transformed_args.padding_left
        rhino_display.padding_right = transformed_args.padding_right
        panels = []
        if transformed_args.component in self.components_to_process:
            panel = Heatmap(trace_data=trace, component=transformed_args.component,
                                wavelet_windows_to_show=[])
            panels.append(panel)
            self.panel = panel
        else:
            logger.warn("Ignored heatmap panel, this component is not on components_to_process " + str(transformed_args.component))

        if len(panels) == 0:
            return trace
        rhino_display.panels = panels
        plot_title = self.get_plot_title(transformed_args,trace)
        fig,ax = rhino_display.plot(False,title=plot_title)

        cid = fig.canvas.mpl_connect('button_press_event', self.onclick)
        X = panel.x_from_depth()
        self.x_list = X
        self.y_list = np.full(len(self.x_list), 0)
        self.ax = fig.axes[0]
        self.ax.set_rasterized(True)
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[0],'yellow',"Primary start",self.boundaries))
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[1], 'yellow', "Primary end", self.boundaries))
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[2], 'k', "Multiple 1 start", self.boundaries))
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[3], 'k', "Multiple 1 end", self.boundaries))
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[4], 'k', "Multiple 2 start", self.boundaries))
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[5], 'k', "Multiple 2 end", self.boundaries))

        self.c = fig.canvas
        self.follower = self.c.mpl_connect("motion_notify_event", self.followmouse)
        axnext = plt.axes([0.85, 0.03, 0.1, 0.08])
        bnext = Button(axnext, 'Continue')
        axreset = plt.axes([0.72, 0.03, 0.1, 0.08])
        breset = Button(axreset, 'Reset')
        bnext.on_clicked(self.btnext)
        breset.on_clicked(self.btreset)

        plt.subplots_adjust(bottom=0.15,right=0.92)

        plt.show(block=True)




        return trace

    def btreset(self,event):
        for line in self.lines:
            line.reset_to_default_values()
        plt.draw()

    def btnext(self, event):
        print("continue")

        self.set_prop_process(self.transformed_args.component + "_primary_start",self.lines[0].y)
        self.set_prop_process(self.transformed_args.component + "_primary_end", self.lines[1].y)
        self.set_prop_process(self.transformed_args.component + "_multiple_1_start", self.lines[2].y)
        self.set_prop_process(self.transformed_args.component + "_multiple_1_end", self.lines[3].y)
        self.set_prop_process(self.transformed_args.component + "_multiple_2_start", self.lines[4].y)
        self.set_prop_process(self.transformed_args.component + "_multiple_2_end", self.lines[5].y)
        self.close()

    def close(self):
        plt.close()

    def followmouse(self,event):
        print ("moveee")
        if self.dragging_line is not None:
            self.dragging_line.moveY(event.ydata)


        for line in self.lines:
            if event.ydata >= line.y - self.boundaries and event.ydata <= line.y + self.boundaries:
                line.hoverOn()

            else:
                line.hoverOff()
        plt.draw()

    def onrelease(self,event):
        print ("release")
        self.dragging_line = None
        self.c.mpl_disconnect(self.releaser)
        plt.draw()

    def onclick(self,event):
        print('%s click: button=%d, x=%d, y=%d, xdata=%f, ydata=%f' %
              ('double' if event.dblclick else 'single', event.button,
               event.x, event.y, event.xdata, event.ydata))

        for line in self.lines:
            if event.ydata >= line.y - self.boundaries and event.ydata <= line.y + self.boundaries:
                self.dragging_line = line
                self.follower = self.c.mpl_connect("motion_notify_event", self.followmouse)
                self.releaser = self.c.mpl_connect("button_release_event", self.onrelease)

        plt.draw()





    def create_curve(self,_obj):
        if isinstance(_obj, basestring):
            return Curve(column_label=_obj, x_axis_label='depth')
        else:
            return Curve(**_obj)