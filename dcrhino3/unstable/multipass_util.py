# -*- coding: utf-8 -*-
"""
Created on Tue May 14 11:05:07 2019

@author: kkappler
1. type
2. status
3. length
4. units of lenght
5. od
6, untis of od

in file menus.cfg you can see the drill string components
but, collar, cc, save
incehes, meters cm

see
https://datacloudintl.atlassian.net/wiki/spaces/RHINO/pages/139526154/Configuration+File+Definition
"""


from __future__ import absolute_import, division, print_function
import datetime
import matplotlib.pyplot as plt #for debugging
import numpy as np
import os
import pdb

from dcrhino3.models.interval import Interval
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.models.metadata import Measurement

logger = init_logging(__name__)

DRILL_STRING_COMPONENT_TYPES = {}
DRILL_STRING_COMPONENT_TYPES[1] = 'bit'
DRILL_STRING_COMPONENT_TYPES[2] = 'collar'
DRILL_STRING_COMPONENT_TYPES[3] = 'steel'
DRILL_STRING_COMPONENT_TYPES[4] = 'saver sub'
DRILL_STRING_COMPONENT_TYPES[5] = 'shock sub'
DRILL_STRING_COMPONENT_TYPES[6] = 'other'
DRILL_STRING_COMPONENT_TYPES[7] = 'rotary bit sub'

DRILL_STRING_COMPONENT_INSTALLATIONS = {}
DRILL_STRING_COMPONENT_INSTALLATIONS[-1] = 'not installed'
DRILL_STRING_COMPONENT_INSTALLATIONS[0] = 'variable'
DRILL_STRING_COMPONENT_INSTALLATIONS[1] = 'installed'

LENGTH_UNITS = {}
LENGTH_UNITS[1] = 'ft'
LENGTH_UNITS[2] = 'in'
LENGTH_UNITS[3] = 'm'
LENGTH_UNITS[4] = 'cm'
LENGTH_UNITS[5] = 'mm'

NUM_DRILL_STRING_COMPONENTS_SUPPORTED = 10

class DrillStringComponent(object):
    """
    ..:warning: there is possibility for error here as the length_in_meters
    applies a roundoff on each component, the roundoff should happen after summation.
    """
    def __init__(self, attributes_list=None):
        self._component_type = None
        self._installation = None
        self._length = None
        self._length_units = None
        self._outer_diameter = None
        self._outer_diameter_units = None
        if attributes_list is not None:
            if len(attributes_list) != 6:
                logger.error('expected six values in drill string component attributes, got {}'.format(len(attributes_list)))
                raise Exception
            self._component_type = int(attributes_list[0])
            self._installation = int(attributes_list[1])
            self._length= float(attributes_list[2])
            self._length_units= int(attributes_list[3])
            self._outer_diameter = float(attributes_list[4])
            self._outer_diameter_units = int(attributes_list[5])

    @property
    def component_type(self):
        return DRILL_STRING_COMPONENT_TYPES[self._component_type]
    @property
    def installation(self):
        return DRILL_STRING_COMPONENT_INSTALLATIONS[self._installation]
    @property
    def length_units(self):
        return LENGTH_UNITS[self._length_units]
    @property
    def length_in_meters(self):
        measurement = Measurement((self._length, self._length_units))
        return measurement.value_in_meters()

def get_installed_steels_length(global_config):
    """
    ..:todo: this could be made a method of the global_config class
    loop over all drill string components to check for elements of
    type steel (3) and installed (1) to get the default length
    """
    total_steels_length = 0.0
    for i_drill_string_component in range(1, NUM_DRILL_STRING_COMPONENTS_SUPPORTED+1):
        attribute_label = 'drill_string_component{}'.format(i_drill_string_component)
        attribute = global_config.__getattribute__(attribute_label)
        attributes_list = attribute.split(',')
        dsc = DrillStringComponent(attributes_list=attributes_list)
        if dsc.component_type == 'steel':
            print('found a steel')
            if dsc.installation == 'installed':
                print('found an installed steel {}m'.format(dsc.length_in_meters))
                total_steels_length += dsc.length_in_meters
    return total_steels_length


def get_variable_steels_lengths(global_config):
    variable_steels_lengths = []
    for i_drill_string_component in range(1, NUM_DRILL_STRING_COMPONENTS_SUPPORTED+1):
        attribute_label = 'drill_string_component{}'.format(i_drill_string_component)
        attribute = global_config.__getattribute__(attribute_label)
        attributes_list = attribute.split(',')
        dsc = DrillStringComponent(attributes_list=attributes_list)
        if dsc.component_type == 'steel':
            print('found a steel')
            if dsc.installation == 'variable':
                print('found a variable steel {}m'.format(dsc.length_in_meters))
                variable_steels_lengths.append(dsc.length_in_meters)
    #<HACK FOR LINE CREEK>
    logger.critical("HACK ALERT!!! If you are seeing this message it means\
                    this is NOT production code")
    print("HACK LINE CREEK CREEK CREEK")
    #variable_steels_lengths = [15.24, 15.24]
    #</HACK FOR LINE CREEK>
    return variable_steels_lengths

def drill_stops(df, minimum_stop_duration=60.0, basically_zero_m=0.0017):
    """
    units of minimum_stop_duration are seconds.  Anything of shorter duration than
    this will not be interpretted as a potential steels-change

    .. Note:: This should actually be calculated from MWD... there is no RHINO
    data being used in this algorithm.
    """
    qualifying_time_intervals = []
    dzdt = np.diff(df.depth) #assumption of 1s trace again! :(
    #d2zdt2 = np.diff(dzdt)
    stopped_indices = np.where(dzdt <= basically_zero_m)[0]


    if len(stopped_indices) == 0:
        return qualifying_time_intervals
    d_indices = np.diff(stopped_indices)
    discontinuity_indices = np.where(np.abs(d_indices) > 1)[0]
    reference_array = np.split(np.arange(len(stopped_indices)), discontinuity_indices+1)
    for i_stopped_region in range(len(reference_array)):
        lower_bound_index = stopped_indices[reference_array[i_stopped_region][0]]
        upper_bound_index = stopped_indices[reference_array[i_stopped_region][-1]]
        lower_bound_time = df.timestamp.iloc[lower_bound_index]
        upper_bound_time = df.timestamp.iloc[upper_bound_index]
        unix_time_interval = Interval(lower_bound=lower_bound_time,
                                      upper_bound=upper_bound_time)
        #pin the depth to the interval
        approximate_depth = np.mean(df.depth.iloc[lower_bound_index:upper_bound_index])
        unix_time_interval.depth = approximate_depth
        if unix_time_interval.duration > minimum_stop_duration:
            print("this could be a steels change")
            print('check that the diff(dzdt)==0')
            qualifying_time_intervals.append(unix_time_interval)
    return qualifying_time_intervals

def drill_stops_2(df, mwd_granularity, minimum_stop_duration=60.0):
    """
    20190523 an update to drill stops.  This one uses the thrid derivative and
    seems like it would be more robust than the old one.
    The idea here is that when the drill is stopped the mwd data are linear interpolated
    and so dzdt is constant.  That means that the second derivative is zero along the
    entire interval;

    That can happen in a few places though.
    units of minimum_stop_duration are seconds.  Anything of shorter duration than
    this will not be interpretted as a potential steels-change.

    The following mwd rows ALL need to show zero second derivative for > minimum_stop_duration:
        weight_on_bit
        torque
        rpm
        depth

    in addition dzdt must be less than 1 mwd granularity per minimum_stop_duration


    .. Note:: This should actually be calculated from MWD... there is no RHINO
    data being used in this algorithm.
    """
    columns_which_have_zero_second_derivative_during_stop = ['weight_on_bit', 'torque', 'rpm', 'depth']
    very_slow = mwd_granularity / minimum_stop_duration
    qualifying_time_intervals = []
    dzdt = np.diff(df.depth) #assumption of 1s trace again! :(
#    plt.plot(dzdt);
#    plt.plot(np.arange(len(df)), .2*np.ones(len(df))/60);plt.show()
    stopped_indices = np.where(dzdt <= very_slow)[0]
    if len(stopped_indices) == 0:
        return qualifying_time_intervals

    d_indices = np.diff(stopped_indices)
    discontinuity_indices = np.where(np.abs(d_indices) > 1)[0]
    reference_array = np.split(np.arange(len(stopped_indices)), discontinuity_indices+1)
    for i_stopped_region in range(len(reference_array)):
        lower_bound_index = stopped_indices[reference_array[i_stopped_region][0]]
        upper_bound_index = stopped_indices[reference_array[i_stopped_region][-1]]
        lower_bound_time = df.timestamp.iloc[lower_bound_index]
        upper_bound_time = df.timestamp.iloc[upper_bound_index]
        unix_time_interval = Interval(lower_bound=lower_bound_time,
                                      upper_bound=upper_bound_time)
        #pin the depth to the interval
        approximate_depth = np.mean(df.depth.iloc[lower_bound_index:upper_bound_index])
        unix_time_interval.depth = approximate_depth
        if unix_time_interval.duration > minimum_stop_duration:
            is_a_drill_stop = True
            print("this could be a steels change")
            for column_label in columns_which_have_zero_second_derivative_during_stop:
                column_interval_data = df[column_label].iloc[lower_bound_index+1: upper_bound_index-1]
                first_derivative = np.diff(column_interval_data)
                second_derivative = np.diff(first_derivative)
                if np.sum(second_derivative) > 0:
                    is_a_drill_stop = False
                    logger.info("drill stop not true based on {}".format(column_label))
            if is_a_drill_stop:
                qualifying_time_intervals.append(unix_time_interval)
    return qualifying_time_intervals



def get_approximate_transitions(df, installed_steels_length, variable_steels_lengths, install_offset_correction):
    """
    returns a list of depths and times which correspond to an approximate steels
    transition
    if variable_steels_lengths is empty then this should return an empty list

    """
    effective_installed_length = installed_steels_length + install_offset_correction
    n_variable_steels = len(variable_steels_lengths)
    if n_variable_steels == 0:
        return [], []
    else:
        transition_depths = [effective_installed_length]
        for i_steel in range(n_variable_steels):
            transition_depths.append(transition_depths[-1] + variable_steels_lengths[i_steel])
        transition_times = []
        for depth in transition_depths:
            loc = np.argmin(np.abs(df.depth-depth))
            transition_times.append(df.timestamp.iloc[loc])
            #print("transition index ={}".format(loc))

        #you now have the depth and times, but there maybe degenerate values
        #as you mave have more steels in reserve than you used, so clip those:
        clip_degenerates = True
        if len(transition_times) < 2:
            clip_degenerates = False
        while clip_degenerates:
            if transition_times[-1] == transition_times[-2]:
                print("found a degenerate value")
                transition_times = transition_times[:-1]
                transition_depths = transition_depths[:-1]
                if len(transition_times) < 2:
                    clip_degenerates = False
            else:
                clip_degenerates = False

    return transition_times, transition_depths


def reject_transitions_far_from_drill_stops(transition_times,
                                            transition_depths,
                                            potential_steels_change_time_intervals,
                                            all_steels_lengths):
    """
    if there is no drill stop within a quarter steel of the transition depth
    then its a bogus transition
    """
    transition_times_out = []
    transition_depths_out = []
    for i in range(len(transition_depths)):
        legit = False
        transition_depth = transition_depths[i]
        quarter_steel = all_steels_lengths[i]/4.0
        for ivl in potential_steels_change_time_intervals:
            distance_to_drill_stop = np.abs(transition_depth - ivl.depth)
            if distance_to_drill_stop < quarter_steel:
                legit = True
        if legit:
            transition_times_out.append(transition_times[i])
            transition_depths_out.append(transition_depth)
    return transition_times_out, transition_depths_out


def reject_transitions_near_bottom_of_hole(max_depth, transition_times, transition_depths,
                                       significant_excess=2.0):
    """
    if the bit does not penetrate more than say a meter below the transition
    depth the steel may not have changed.
    """
    transition_times_out = []
    transition_depths_out = []
    for i in range(len(transition_depths)):
        legit = False
        transition_depth = transition_depths[i]
        if max_depth - transition_depth > significant_excess:
            legit = True
        if legit:
            transition_times_out.append(transition_times[i])
            transition_depths_out.append(transition_depth)
    return transition_times_out, transition_depths_out

def nearest_time_to_transition_depth(dataframe,
                                     transition_depths,
                                     potential_steels_change_time_intervals):
    """
    This overwrites the theoretical transition time and depth with the
    time-depth at the center of the nearest actual observed drill_stop
    status: in progress 23 May, 2019
    """

    # Make a List of Middle Drill Stoppage Intervals
    drill_stop_intervals= []
    for interval in potential_steels_change_time_intervals:
        drill_stop_intervals.append((interval.upper_bound + interval.lower_bound) / 2)

    closest_drill_stop_times  = []
    closest_drill_stop_depths = []
    for t_depth in transition_depths:
        transition_depth_row = dataframe.loc[np.argmin(np.abs(t_depth - dataframe.depth))]
        # index of steel change time to use
        closest_drill_stop_time = drill_stop_intervals[np.argmin(np.abs(drill_stop_intervals-transition_depth_row.timestamp))]

        # Gather Depth Data from Time + Dataframe
        closest_drill_stop_depth = dataframe.depth[np.argmin(np.abs(closest_drill_stop_time - dataframe.timestamp))]

        closest_drill_stop_times.append(closest_drill_stop_time)
        closest_drill_stop_depths.append(closest_drill_stop_depth)


    return closest_drill_stop_times, closest_drill_stop_depths


def update_acorr_with_resonance_info(acorr_trace, transition_depth_offset_m=-1.0):
    """
    acorr_trace is of type dcrhino3.models.trace_dataframe.TraceData()

    Conceptual flow:
        1. find the approximate depths at which we would expect a new steel to
        be attached (transition_depths)
        2. Determine which transition depths are surpassed significantly.
        i.e. does the bit go significantly deeper than the transition depth (>~2m)
        -- Now you have a list of relevant transition depths for the given blasthole-acorr
        3. Place the 'actual' transition depth at the center of the drill stop
        nearest to the theoretical transition depth
    """
#    effective_trace_duration = np.median(np.diff(acorr_trace.dataframe.timestamp))
#    transition_neighborhood_search_above = 1.0
#    transition_neighborhood_search_below = 2.0
    global_config = acorr_trace.first_global_config
    installed_steels_length = get_installed_steels_length(global_config)
    variable_steels_lengths = get_variable_steels_lengths(global_config)
    all_steels_lengths = [installed_steels_length] + variable_steels_lengths
    installed_resonant_length = global_config.installed_resonant_length

    df = acorr_trace.dataframe
    try:
        mwd_granularity = acorr_trace.first_global_config.mwd_granularity
        potential_steels_change_time_intervals = drill_stops_2(df, mwd_granularity)
    except AttributeError:
        print("No mwd spacing info!! -- ACORR MUST BE REGENERATED")
        potential_steels_change_time_intervals = drill_stops(acorr_trace.dataframe,
                                                         basically_zero_m=0.0017)

    transition_times, transition_depths = get_approximate_transitions(acorr_trace.dataframe,
                                                         installed_steels_length,
                                                         variable_steels_lengths,
                                                         transition_depth_offset_m)

    transition_times, transition_depths = reject_transitions_near_bottom_of_hole(df.depth.max(),
                                                                                 transition_times,
                                                                                 transition_depths,
                                                                                 significant_excess=2.0)

    transition_times, transition_depths = reject_transitions_far_from_drill_stops(transition_times,
                                                    transition_depths,
                                                    potential_steels_change_time_intervals,
                                                    all_steels_lengths)

    transition_times, transition_depths = nearest_time_to_transition_depth(df,
                                                                          transition_depths,
                                                                          potential_steels_change_time_intervals)


#    plt.figure(1)
#    color_cyc = 'rgbcmk'
#    plt.plot(acorr_trace.dataframe.timestamp, acorr_trace.dataframe.depth)
#    for i, ivl in enumerate(potential_steels_change_time_intervals):
#        plt.vlines(ivl.lower_bound, 0, 34, color=color_cyc[i])
#        plt.vlines(ivl.upper_bound, 0, 34, color=color_cyc[i])
#    for i, td in enumerate(transition_depths):
#        plt.plot(transition_times[i], td, 'o',  color=color_cyc[i])
#    plt.show()

    df['drill_string_resonant_length'] = installed_resonant_length
    resonant_length = installed_resonant_length
    for i,transition_depth in enumerate(transition_depths):
        resonant_length += variable_steels_lengths[i]
        rows_to_update = df['depth'] > transition_depth
        df.loc[rows_to_update, 'drill_string_resonant_length'] = resonant_length

    return acorr_trace


def test(acorr_filename=None):
    """
    """
    if acorr_filename is None:
        try:
            from dcrhino3.unstable.karl_dev_util import line_creek_acorr_folder
            from dcrhino3.unstable.karl_dev_util import bma_acorr_folder
        except ImportError:
            logger.error("you need to specify the path to an acorr file on your machine")
            raise Exception
        h5_basename = '2380_NS92_82_9409_9409_6172_6172.h5'
        h5_basename = '2380_NS92_82_9518B_9518B_6172_6172.h5'
        h5_basename = '2380_NS92_82_9607T_9607T_6172_6172.h5'
        acorr_filename = os.path.join(line_creek_acorr_folder, h5_basename)
        h5_basename = 'GUS_DR:R06N:30:GUS:P04:B:T_285784_285784_6674_6674.h5'
        h5_basename = 'P10_DR:R06N:29:GMS:P10:L:T_N366_286303_6674_6674.h5'
        h5_basename = 'OB_DR:R14N:41:GMS:OB:A:T_B218_286780_6332_6332.h5'#OK
        #h5_basename = 'P04_DR:R06N:30:GUS:P04:B:T_F185_285755_6674_6674.h5'
        acorr_filename = os.path.join(bma_acorr_folder, h5_basename)
#        acorr_filename = os.path.join('/home/kkappler', 'tmp', '20190518_RTA72000_PR004.h5')

    acorr_trace = TraceData()
    acorr_trace.load_from_h5(acorr_filename)
    pdb.set_trace()
    try:
        mwd_depth_spacing = acorr_trace.first_global_config.mwd_depth_spacing
    except AttributeError:
        print("HACK !!! -- ACORR MUST BE REGENERATED")
        mwd_depth_spacing = 0.2#m
    tmp1 = drill_stops(acorr_trace.dataframe, minimum_stop_duration=60.0, basically_zero_m=0.0017)
    tmp2 = drill_stops_2(acorr_trace.dataframe, mwd_depth_spacing)
    #pdb.set_trace()
    acorr_trace = update_acorr_with_resonance_info(acorr_trace)

#    pdb.set_trace()
#    from dcrhino3.process_flow.modules.hybrid.unfold_autocorrelation import unfold_trace_2d
#    data_array = acorr_trace.component_as_array('axial')
#    data_array = unfold_trace_2d(data_array)
#    qqq =np.fft.fft(data_array);
    print('hi')


def main():
    """
    """
    test()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
