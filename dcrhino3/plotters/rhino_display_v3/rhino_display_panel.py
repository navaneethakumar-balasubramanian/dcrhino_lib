# -*- coding: utf-8 -*-
"""
Created on Wed Mar  6 14:16:56 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function

import numexpr as ne
import datetime
import json
import math
import matplotlib.pyplot as plt
from matplotlib.ticker import AutoMinorLocator
import numpy as np
import pdb

from dcrhino3.feature_extraction.feature_windowing import WindowBoundaries
from dcrhino3.models.trace_dataframe import TraceData
#from dcrhino3.physics.util import get_expected_multiple_times
from dcrhino3.physics.util import get_resonance_period
from dcrhino3.plotters.rhino_display_v3.plot_helper import axis_lims_method_1
from dcrhino3.helpers.general_helper_functions import init_logging , is_string
from dcrhino3.plotters.window_picker import WindowPicker
logger = init_logging(__name__)


class RhinoDisplayPanel(object):
    def __init__(self, **kwargs):
        self.plot_style = None
        self.dict = {}
        self.trace_data = kwargs.get('trace_data', None)



    def plot_curve(self,curve,ax):
        if len(curve.data) == 1:
            logger.warn("Not possible to plot 1 value array:" + str(curve.label))
            return ax
        #pdb.set_trace()
        #print(curve.scale)
        #
        if curve.scale == "current" or  curve.scale == "new":
            if curve.scale == "current":
                ax1 = ax
            if curve.scale == "new":
                ax1 = ax.twinx()
            #ax1.set_ylabel(curve.label).set_color("k")
            curve.data = np.nan_to_num(curve.data)

            ax1.set_ylim(axis_lims_method_1(curve.data,'buffer'))
            ax1.set_ylabel(curve.label)
            if curve.color is not None:
                ax1.set_ylabel(curve.label).set_color(curve.color)
                ax1.spines[curve.spine_side].set_color(curve.color)

            ax1.yaxis.set_label_position(curve.spine_side)
            ax1.yaxis.set_ticks_position(curve.spine_side)

            ax1.spines[curve.spine_side].set_linewidth(1)
            ax1.spines[curve.spine_side].set_position(('outward',curve.space))


        else:
            ax1 = ax

        ax1.plot(curve.x_axis_values, curve.data, color=curve.color,
                label=curve.label, linewidth=curve.linewidth, linestyle=curve.linestyle)

        #Plotting Vertical Black Lines (not working TJW 3/26)
        X = curve.x_axis_values

        ax1.set_xlim(X[0], X[-1])

        x_maj_tick = (np.arange(X[0], X[-1]) - X[0])
        x_min_tick = (np.arange(X[0], X[-1], 0.5) - X[0])
        for x_maj_tick in x_maj_tick:
            ax1.axvline(x=x_maj_tick, ymin=0, ymax=1.5, color='k')

        for x_min_tick in x_min_tick:
            ax1.axvline(x=x_min_tick, ymin=0, ymax=1.5, color='k', linestyle=':')



        return ax1

    def _get_window_widths_from_h5(self):
        """
        .. todo: CAREFUL! This should possibly return a time or depth or df-indeexed
        quantity ...
        """
        window_widths = self.trace_data.first_global_config.window_widths
        if is_string(window_widths) : ## isinstance(window_widths, unicode):
            window_widths = json.loads(window_widths)
        return window_widths

    def _get_multiple_delays_from_h5(self):
        """
        .. todo: CAREFUL! This should possibly return a time or depth or df-indeexed
        quantity ...
        """
        component_id = self.component
        global_config = self.trace_data.first_global_config
        sensor_distance_to_bit = global_config.sensor_distance_to_source
        distance_sensor_to_shock_sub_bottom = global_config.sensor_distance_to_shocksub
        if component_id=='axial':
            velocity_steel = global_config.ACOUSTIC_VELOCITY
        elif component_id=='tangential':
            velocity_steel = global_config.SHEAR_VELOCITY
        resonance_period = get_resonance_period(component_id, sensor_distance_to_bit,
                                                distance_sensor_to_shock_sub_bottom,
                                                velocity_steel)
        return resonance_period

    def load_curve_data_from_dataframe(self):
        for curve in self.curves:
            curve.assign_data_values(self.df)
        pass


    @property
    def depth(self):
        """
        """
        depth = self.trace_data.dataframe['depth']
        return depth

    def x_from_depth(self):
        X = self.depth.astype(float)
        X = np.nan_to_num(X)
        return X

    @property
    def dataframe(self):
        return self.trace_data.dataframe
    @property
    def df(self):
        return self.trace_data.dataframe

    @property
    def sampling_rate(self):
        if "sampling_rate" in self.trace_data.dataframe.columns:
            sampling_rate = self.trace_data.dataframe["sampling_rate"].values[0]
        else:
            sampling_rate = self.trace_data.first_global_config.sampling_rate
        return sampling_rate




class CurveMedley(object):
    """
    These curves all share an axes
    """
    def __init__(self, **kwargs):
        self.column_labels = []
        self.axes_limits = None

class Curve(object):
    """
    This class intended to encapsulate the x-axis values, y-axis values,
    axes limits (or a recipe for calculation of axes limits from the data)
    colour information and maybe some other things.
    """
    def __init__(self, **kwargs):
        self.column_label = kwargs.get('column_label', '')
        self.axes_limits = None
        self.data = kwargs.get('data', None)
        #self.x_axis_label = kwargs.get('x_axis_label', '')
        #self.x_axis = kwargs.get('x_axis', None)
        self.x_axis_label = kwargs.get('x_axis_label', 'depth')
        self.x_axis_values = kwargs.get('x_axis_values', None)
        self.color = kwargs.get('color', None)
        self.formula = kwargs.get('formula', None)
        self.label = kwargs.get('label', '')
        self.linestyle = kwargs.get('linestyle','-')
        self.linewidth = kwargs.get('linewidth', 1.0)
        self.scale = kwargs.get("scale","current")
        self.spine_side = kwargs.get('spine_side','left')
        self.space = kwargs.get('space' , 0)
        self.number_of_wiggles = kwargs.get("number_of_wiggles", 50)

        if self.label == '':
            self.label = self.column_label


    def assign_data_values(self, df, x_axis=None):
        try:
            self.data = np.asarray(df[self.column_label])
        except:
            print('problem accessing data from dataframe in Curve()')
            print('column label = {}'.format(self.column_label))
            print('df_type = {}'.format(type(df)))
            raise Exception
        if self.x_axis_values is None:
            if self.x_axis_label:
                try:
                    self.x_axis_values = np.asarray(df[self.x_axis_label])
                except:

                    self.x_axis_values = np.arange(len(df))
            else:
                self.x_axis_values = np.arange(len(df))
            self.apply_formula()
            self.data = self.data.astype(np.float64)

    def apply_formula(self):
        if self.formula != None:
            temp = self.__dict__
            self.data  = ne.evaluate(self.formula, local_dict=temp)


class Header(RhinoDisplayPanel):
    def __init__(self, **kwargs):
        """
        ivar curves: a list of curves, maybecome a list
        of curves or CurveMedleys
        """
        super(Header, self).__init__(**kwargs)
        #super(RhinoDisplayPanel, .__init__(self).__init__(**kwargs)
        self.plot_style = "header"
        self.curves= kwargs.get('curves', [])

        self.trace_data = kwargs.get('trace_data', None)
        self.load_curve_data_from_dataframe()



    def plot(self, ax, **kwargs):
        """
        .. todo: make a legend method that draws the legend box below like in
        the v3 plotter.  Also add handling for stripping off label or useing synonyns
        .. todo: handle case of "depth"
        """
        for curve in self.curves:
            curve_ax = self.plot_curve(curve,ax)
            #curve_ax.legend()
            #curve_ax.set_xlabel(curve.x_axis_label)


        #ax.legend();
        return ax, None

class Heatmap(RhinoDisplayPanel):
    def __init__(self, **kwargs):
        super(Heatmap, self).__init__(**kwargs)
        self.plot_style = "heatmap"
        self.component = kwargs.get('component', '')
        self.lower_num_ms = kwargs.get('lower_num_ms', -5.0)
        self.upper_num_ms = kwargs.get('upper_num_ms', 35.0)
        self.cmap_string = kwargs.get('cmap_string', 'jet')
        self.mult_pos = kwargs.get('mult_pos', None)
        self.normalize = kwargs.get('normalize', True)
        self.v_min = kwargs.get('v_min', -0.5)
        self.v_max = kwargs.get('v_max', +0.5)
        self.y_tick_interval_ms = kwargs.get('y_tick_interval_ms', 5.)
        #self.wavelet_windows_to_show = kwargs.get('wavelet_windows_to_show', [])
        self.wavelet_windows_to_show = kwargs.get('wavelet_windows_to_show', ['primary', 'multiple_1', 'multiple_2'])
        self.curves = kwargs.get('curves', [])
        self.load_curve_data_from_dataframe()
        self.manual_time_windows = kwargs.get('manual_time_windows', 35.0)
        self.trace_downsample_factor = kwargs.get('trace_downsample_factor', 1)



    @property
    def column_label(self):
        column_label = '{}_trace'.format(self.component)
        return column_label

    def load_data_from_dataframe(self):
        column_label = '{}_trace'.format(self.component)
        self._load_dataframe()
        self.data = self.df[column_label]
        for curve in self.curves:
            #pdb.set_trace()
            curve.assign_data_values(self.df)
        #pdb.set_trace()

    def prepare_trace_array(self):
        """
        .. todo: deprecate commented references to n_samples

        """
        data = self.trace_data.component_as_array(self.component)
        data = data.copy()
        num_traces_in_blasthole, samples_per_trace = data.shape
        #pdb.set_trace()

        data = data.T

        dt = 1./self.sampling_rate
        samples_back = (np.abs(self.lower_num_ms))/1000./dt
        samples_back = int(np.ceil(samples_back))
        samples_fwd = self.upper_num_ms/1000./dt
        samples_fwd = int(np.ceil(samples_fwd))
        half_way = int(samples_per_trace/2)
        data = data[half_way-samples_back:half_way+samples_fwd,:]

        try:
            if math.isnan(data.min()) == True and math.isnan(data.min()) == True:
                return data
        except ValueError:
            print("logger.error:  the last time I saw this error it was because the incorrect\
                         sampling rate was being used")
            raise Exception
        if data.min() == 0 and data.max() == 0:
            return data

        if self.normalize:
            nans_locations = np.where(np.isnan(data))
            data[nans_locations]=0.0
            num_samples, num_traces = data.shape
            max_amplitudes = np.max(data, axis=0)
            data = data / max_amplitudes
            data[nans_locations] = np.nan

        return np.flipud(data)



    def plot_hole_as_heatmap(self, ax, X, Y, Z, y_tick_locations,
                         two_way_travel_time_ms=None, multiple_search_back_ms=None,
                         multiple_search_forward_ms=None,delay=None,delay_2=None,
                         wavelet_windows_to_show=[], window_boundaries=None):
        """
        .. todo: are v_min, v_max as called in previous None or +-0.5?
        """

        minor_locator = AutoMinorLocator(8)

        if self.trace_downsample_factor > 1:
            #it has to be an integer!
            X = X[::self.trace_downsample_factor];
            Z = Z[:,::self.trace_downsample_factor]

        if any([x is None for x in [self.v_min, self.v_max]]):# autoselcet color axes
            heatmap = ax.pcolormesh(X, Y, Z, cmap=self.cmap_string)
        else:
            heatmap = ax.pcolormesh(X, Y, Z, cmap=self.cmap_string,
                                    vmin=self.v_min, vmax=self.v_max)
        locs,labs = plt.xticks()
        #pdb.set_trace()
        ax.set_ylabel('time (ms)')


        ax.invert_yaxis()

        ax.set_yticks(y_tick_locations, minor=False)
        ax.tick_params(which='major', width=1)
        ax.tick_params(which='major', length=8)
        ax.tick_params(which='minor', length=4, color='r', width=0.5)


        if self.mult_pos is not None:
            #print("what is this? a pick? thoeretical, actual?")
            ax.plot(X,self.mult_pos.ax_1_mult, color = 'k',linestyle = '--',linewidth = 2)
            ax.plot(X,self.mult_pos.ax_2_mult, color = 'k',linestyle = '--',linewidth = 2)
            ax.plot(X,self.mult_pos.tang_1_mult, color = 'k',linestyle = '-',linewidth = 2)
            ax.plot(X,self.mult_pos.tang_2_mult, color = 'k',linestyle = '-',linewidth = 2)


        if self.wavelet_windows_to_show:
            colours = {}
            colours['primary'] = 'black'
            colours['multiple_1'] = 'blue'
            colours['multiple_2'] = 'red'
            colours['multiple_3'] = 'darkorange'
            window_widths = self._get_window_widths_from_h5()
            resonance_period = self._get_multiple_delays_from_h5()
            #pdb.set_trace()
            #primary_shift = -1.0 * getattr(window_widths, self.component).primary / 2.0
            primary_shift = -1.0 * window_widths[self.component]['primary'] / 2.0
            wb = WindowBoundaries()
            wb.assign_window_boundaries(self.component, window_widths,
                                        resonance_period, primary_shift=primary_shift)
            window_boundaries = wb.window_boundaries_time
            if self.manual_time_windows is None:
                for wavelet_id in self.wavelet_windows_to_show:
                    y_values = window_boundaries[wavelet_id]
                    ax.hlines(1000*y_values, X[0], X[-1], color=colours[wavelet_id],linestyle = '-',linewidth = 1.05)
            else:
                for wavelet_id in self.wavelet_windows_to_show:
                    y_values = np.array(self.manual_time_windows._asdict()[self.component]._asdict()[wavelet_id])*1000
                    ax.hlines(y_values, X[0], X[-1], color=colours[wavelet_id],linestyle = '-',linewidth = 1.05)

        ax.set_xlim(X[0], X[-1])
        x_maj_tick = (np.arange(X[0],X[-1])-X[0])
        x_min_tick = (np.arange(X[0],X[-1],0.5)-X[0])
        for x_maj_tick in x_maj_tick:
            ax.axvline(x = x_maj_tick, ymin = 0, ymax = 1.5, color = 'k')

        for x_min_tick in x_min_tick:
            ax.axvline(x = x_min_tick, ymin = 0, ymax = 1.5, color = 'k', linestyle = ':')
        ax.xaxis.set_minor_locator(minor_locator)

        for curve in self.curves:
            curve.scale = ''
            curve_ax = self.plot_curve(curve, ax)
            #curve_ax.legend()
        #ax.legend();
        ax.set_title(str(self.component).capitalize(),loc="left")



        return ax, heatmap

    def plot(self, ax):
        Z = self.prepare_trace_array()
        X = self.x_from_depth()
        Y = np.linspace(self.lower_num_ms, self.upper_num_ms, Z.shape[0])
        Y = np.flipud(Y)
        dt_ms = self.y_tick_interval_ms
        lowest_y_tick =  int(self.lower_num_ms/dt_ms)
        greatest_y_tick = int(self.upper_num_ms/dt_ms)
        y_tick_locations = dt_ms * np.arange(lowest_y_tick, greatest_y_tick + 1)
        self.plot_hole_as_heatmap(ax, X, Y, Z, y_tick_locations)
        #ax.plot(np.random.rand(44))



class Wiggle(RhinoDisplayPanel):
    def __init__(self, **kwargs):
        super(Wiggle, self).__init__(**kwargs)
        self.plot_style = "wiggle"
        self.component = kwargs.get('component', '')
        self.curves = kwargs.get('curves', [])
        self.lower_num_ms = kwargs.get('lower_num_ms', -5.0)
        self.upper_num_ms = kwargs.get('upper_num_ms', 35.0)


        self.trace_data = kwargs.get('trace_data', None)
        self.load_curve_data_from_dataframe()

    def prepare_trace_array(self):
        """
        .. todo: deprecate commented references to n_samples

        """
        data = self.trace_data.component_as_array(self.component)
        data = data.copy()
        num_traces_in_blasthole, samples_per_trace = data.shape
        # pdb.set_trace()

        data = data.T

        dt = 1. / self.sampling_rate
        samples_back = (np.abs(self.lower_num_ms)) / 1000. / dt
        samples_back = int(np.ceil(samples_back))
        samples_fwd = self.upper_num_ms / 1000. / dt
        samples_fwd = int(np.ceil(samples_fwd))
        half_way = int(samples_per_trace / 2)
        data = data[half_way - samples_back:half_way + samples_fwd, :]

        try:
            if math.isnan(data.min()) == True and math.isnan(data.min()) == True:
                return data
        except ValueError:
            print("logger.error:  the last time I saw this error it was because the incorrect\
                         sampling rate was being used")
            raise Exception
        if data.min() == 0 and data.max() == 0:
            return data

        return np.flipud(data)

    def plot_wiggle_trace(self, ax, X, Y, Z, column_label, color, num_lines):
        """
        Makes the seismic wiggle plot for data = column_label, on grid the same as the heatmap. Might be less window-load
        heavy than Heatmap for plotter picker.

        Parameters:
            ax (Axis Object): the axis to plot on
            X (List): Depths
            Y (List): Times from lowest tick to highest tick (set for now at -5 to 35)
            Z (Value of your choosing)
            column_label (str): Name of variable
            color (str): color to be filled
            num_lines (int): number of wiggle traces desired
        """
        ax.set_ylim(axis_lims_method_1(Y, 'simple'))
        ax.invert_yaxis()
        ax.set_title('Wiggle Trace for ' + column_label)
        ax.set_ylabel('Time (ms)')
        ax.set_xlabel('Depth (m)')

        #Downsample to Number of Lines and Pick in even fashion
        X_down = np.linspace(min(X), max(X), num_lines)

        #Find Indices of Depth Closest to Equally Spaced Lines
        X_idx_list = []
        for depth in X_down:
            X_idx = np.abs(X - depth).argmin()
            X_idx_list.append(X_idx)
        X = X[X_idx_list];
        Z = Z[:,X_idx_list]

        #Set the Wiggle Size to be just less than half the space between wiggles
        wig_amp_coef = (0.7 * (abs(max(X) - min(X)) / num_lines)) / np.amax(abs(Z))

        #For Each Depth, Find the Zero Crossings to Create A Fillable Shape
        for i in range(len(X)):
            crossing = np.where(np.diff(np.signbit(Z[:,i])))[0]
            x1 = Z[:,i][crossing]
            x2 = Z[:,i][crossing + 1]
            y1 = Y[crossing]
            y2 = Y[crossing + 1]
            m = (y2-y1) / (x2-x1)
            c = y1 - m*x1

            X_wiggle = np.hstack([Z[:,i], np.zeros_like(c)])
            Y_wiggle = np.hstack([Y,c])

            order = np.argsort(Y_wiggle)

            ax.plot(X_wiggle[order]*wig_amp_coef + X[i], Y_wiggle[order], 'k', linewidth = 0.5)
            X_wiggle[X_wiggle<0] = np.nan
            X_wiggle = X_wiggle[order]*wig_amp_coef + X[i]
            ax.fill(X_wiggle, Y_wiggle[order], color, aa=True)

    def plot(self, ax, **kwargs):
        for curve in self.curves:
            Z = self.prepare_trace_array()
            X = self.x_from_depth()
            Y = np.linspace(self.lower_num_ms, self.upper_num_ms, Z.shape[0])
            Y = np.flipud(Y)

            self.plot_wiggle_trace(ax, X, Y, Z, curve.column_label, curve.color, curve.number_of_wiggles)








def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
