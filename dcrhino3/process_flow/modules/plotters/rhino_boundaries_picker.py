from dcrhino3.feature_extraction.feature_windowing import get_default_time_windows

from dcrhino3.plotters.rhino_display_v3.rhino_display import RhinoDisplay
from dcrhino3.plotters.rhino_display_v3.rhino_display_panel import Header, Heatmap, Curve
import matplotlib.animation as animation

import matplotlib.pyplot as plt
import pandas as pd
import pdb
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
        #print (y)
        if y <= self.maxY and y >= self.minY:
            self.line.set_ydata(np.full(len(self.x_list), y))
            self.line_label.set_y(y-0.2)
            self.y = y



class RhinoPlotterPickerModule(RhinoPlotterModule):
    def __init__(self, json, output_path,process_flow,order):
        RhinoPlotterModule.__init__(self, json, output_path, process_flow, order)
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

        self.lines_default_values = [0,2,5,7,15,20, 25, 30]


    def populate_lines_default_values(self, manual_time_windows,component):
        """
        .. :todo review if we really want to use units of ms here
        """
        using_ms = True
        if "vars" in self.process_flow.process_json.keys():
            vars = self.process_flow.process_json["vars"]
            self.lines_default_values[0] = vars[component + "_primary"][0]
            self.lines_default_values[1] = vars[component + "_primary"][1]
            self.lines_default_values[2] = vars[component + "_multiple_1"][0]
            self.lines_default_values[3] = vars[component + "_multiple_1"][1]
            self.lines_default_values[4] = vars[component + "_multiple_2"][0]
            self.lines_default_values[5] = vars[component + "_multiple_2"][1]
            self.lines_default_values[6] = vars[component + "_multiple_3"][0]
            self.lines_default_values[7] = vars[component + "_multiple_3"][1]
        else:

            self.lines_default_values[0] = manual_time_windows.time_window['primary'].lower_bound
            self.lines_default_values[1] = manual_time_windows.time_window['primary'].upper_bound
            self.lines_default_values[2] = manual_time_windows.time_window['multiple_1'].lower_bound
            self.lines_default_values[3] = manual_time_windows.time_window['multiple_1'].upper_bound
            self.lines_default_values[4] = manual_time_windows.time_window['multiple_2'].lower_bound
            self.lines_default_values[5] = manual_time_windows.time_window['multiple_2'].upper_bound
            self.lines_default_values[6] = manual_time_windows.time_window['multiple_3'].lower_bound
            self.lines_default_values[7] = manual_time_windows.time_window['multiple_3'].upper_bound

        if using_ms:
            qq = np.asarray(self.lines_default_values)
            qq *= 1000.0
            self.lines_default_values = list(qq)


    def process_trace(self, trace):
        rhino_display = RhinoDisplay()
        transformed_args = self.get_transformed_args(trace.first_global_config)
        default_time_windows = get_default_time_windows(transformed_args)
        self.populate_lines_default_values(default_time_windows,transformed_args.component)
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

        self.fig = fig
        cid = fig.canvas.mpl_connect('button_press_event', self.onclick)
        X = panel.x_from_depth()
        self.x_list = X
        self.y_list = np.full(len(self.x_list), 0)
        self.ax = fig.axes[0]
        self.background = fig.canvas.copy_from_bbox(self.ax.bbox)
        #self.ax.set_rasterized(True)
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[0],'yellow',"Primary start",self.boundaries))
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[1], 'yellow', "Primary end", self.boundaries))
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[2], 'limegreen', "Multiple 1 start", self.boundaries))
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[3], 'limegreen', "Multiple 1 end", self.boundaries))
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[4], 'k', "Multiple 2 start", self.boundaries))
        self.lines.append(DraggableLine(fig.axes[0], X,self.lines_default_values[5], 'k', "Multiple 2 end", self.boundaries))
        self.lines.append(
            DraggableLine(fig.axes[0], X, self.lines_default_values[6], 'k', "Multiple 3 start", self.boundaries))
        self.lines.append(
            DraggableLine(fig.axes[0], X, self.lines_default_values[7], 'k', "Multiple 3 end", self.boundaries))

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

        self.set_prop_process(self.transformed_args.component + "_primary",[self.lines[0].y/1000,self.lines[1].y/1000])
        self.set_prop_process(self.transformed_args.component + "_multiple_1", [self.lines[2].y/1000,self.lines[3].y/1000])
        self.set_prop_process(self.transformed_args.component + "_multiple_2", [self.lines[4].y/1000,self.lines[5].y/1000])
        self.set_prop_process(self.transformed_args.component + "_multiple_3", [self.lines[6].y/1000, self.lines[7].y/1000])
        self.close()

    def close(self):
        plt.close()



    def redraw(self):
        self.fig.canvas.restore_region(self.background)
        #for line in self.lines:
        #    self.ax.draw_artist(self.line.line)
        #self.fig.canvas.blit(self.fig.bbox)

    def followmouse(self,event):
        print ("moveee",self.dragging_line)
        if self.dragging_line is not None:
            #print ("AAA",self.dragging_line.moveY)
            #animation.FuncAnimation(self.fig, self.dragging_line.moveY, 25, fargs=(event.ydata),
            #                        interval=2, blit=True)
            self.dragging_line.moveY(event.ydata)


        for line in self.lines:
            if event.ydata >= line.y - self.boundaries and event.ydata <= line.y + self.boundaries:
                line.hoverOn()

            else:
                line.hoverOff()
        #plt.draw()
        #self.redraw()

    def onrelease(self,event):
        print ("release")
        self.dragging_line = None
        self.c.mpl_disconnect(self.releaser)
        #plt.draw()

    def onclick(self,event):
        print('%s click: button=%d, x=%d, y=%d, xdata=%f, ydata=%f' %
              ('double' if event.dblclick else 'single', event.button,
               event.x, event.y, event.xdata, event.ydata))

        for line in self.lines:
            if event.ydata >= line.y - self.boundaries and event.ydata <= line.y + self.boundaries:
                self.dragging_line = line
                self.follower = self.c.mpl_connect("motion_notify_event", self.followmouse)
                self.releaser = self.c.mpl_connect("button_release_event", self.onrelease)

        #plt.draw()
        #self.redraw()





    def create_curve(self,_obj):
        if isinstance(_obj, basestring):
            return Curve(column_label=_obj, x_axis_label='depth')
        else:
            return Curve(**_obj)