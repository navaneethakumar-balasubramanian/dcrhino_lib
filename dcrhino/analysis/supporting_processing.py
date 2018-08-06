# -*- coding: utf-8 -*-
"""
Created on Sun May 27 10:17:06 2018

@author: kkappler


"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

from obspy.io.segy.segy import iread_segy
from dcrhino.constants import DATA_PATH
from dcrhino.analysis.instrumentation.rhino import get_rhino_channel_map
from dcrhino.analysis.util.general_helper_functions import init_logging

logger = init_logging(__name__)

ACOUSTIC_VELOCITY = 4755
MOUNT_POINTS_MONT_WRIGHT = ['mount_24_inch', 'mount_10_inch', 'mount_24_inch_180deg', 'mount_10_inch_180deg']

def get_observer_notes():
    """
    TODO: register this as a measurand, or use the global scheme for it
    """
    observer_notes_csv = os.path.join(DATA_PATH, 'mont_wright/merged_observer_notes.csv')
    OBSERVER_NOTES_DF = pd.read_csv(observer_notes_csv, parse_dates=['time_start', 'time_end'])
    return OBSERVER_NOTES_DF



def get_segy_trace_by_index(segy_filename, index):
    """
    """
    for i,tr in enumerate(iread_segy(segy_filename)):
#    dummy_hole_ids[i] = tr.stats.segy.trace_header.dummy_hole_id
#    print(i, dummy_hole_ids[i])
        if i == index:
            return tr

def load_mwd_with_mse():
    """
    TODO: move this to the global variable framework like that in mwd_from_krishna
    """
    hole_profile_csv = os.path.join(DATA_PATH, 'mont_wright/mwd/mwd_2018-05-29_with_MSE_hole_profile.csv')
    df1 = pd.read_csv(hole_profile_csv, parse_dates=['time_start', 'time_end'])
    hole_profile_csv = os.path.join(DATA_PATH, 'mont_wright/mwd/mwd_2018-05-30_with_MSE_hole_profile.csv')
    df2 = pd.read_csv(hole_profile_csv, parse_dates=['time_start', 'time_end'])
    hole_profile_csv = os.path.join(DATA_PATH, 'mont_wright/mwd/mwd_2018-05-31_with_MSE_hole_profile.csv')
    df3 = pd.read_csv(hole_profile_csv, parse_dates=['time_start', 'time_end'])
    frames = [df1, df2, df3]
    result = pd.concat(frames)
    result = result.rename(columns={'MSE (MPa - new formula)':'mse_mpa'})

    return result


def get_dummy_hole_ids_from_segy(st):
    try:
        dummy_hole_ids = np.asarray([x.stats.segy.trace_header.hole_id for x in st.traces])
    except AttributeError:
        dummy_hole_ids = np.asarray([x.stats.segy.trace_header.dummy_hole_id for x in st.traces])
    unique_hole_ids = list(set(dummy_hole_ids))
    unique_hole_ids.sort()
    return dummy_hole_ids, unique_hole_ids

def get_dummy_hole_ids_from_segy_file(full_segy_file):
    """
    init for 1e6 traces.  Select only those needed
    TODO: add warning ... you could have 1M traces in afile ...
    TODO: ask NR to add total number of traces to binary file header if not in there already;
    """
    dummy_hole_ids = np.full(1000000, np.nan, dtype=int)
    for i,tr in enumerate(iread_segy(full_segy_file)):
        dummy_hole_ids[i] = tr.stats.segy.trace_header.dummy_hole_id
    #pdb.set_trace()
    return dummy_hole_ids[:i+1]


def dummy_hole_id_from_trace(trace):
    try:
        dummy_hole_id = trace.stats.segy.trace_header.hole_id
    except AttributeError:
        dummy_hole_id = trace.stats.segy.trace_header.dummy_hole_id
    return dummy_hole_id

def get_hole_trace_indices_dict(dummy_hole_ids, unique_hole_ids):
    hole_trace_indices = {}
    for i_hole, dummy_hole_id in enumerate(unique_hole_ids):
        print('i_hole={}, hole_id = {}'.format(i_hole, dummy_hole_id))
        hole_trace_indices[dummy_hole_id] = np.where(dummy_hole_ids==dummy_hole_id)[0]
    return hole_trace_indices




def concatenate_traces(st, component, output_shape='2d'):
    """
    @type st:  obspy.core.stream.Stream, i.e.the output from _read_segy()
    TODO: add support for 1D, 2D outputs


    """
    num_traces = len(st.traces)
    n_pts = len(st.traces[0].data)#640
    if component == 'x':
        trace_indices = range(0,num_traces,3)
    elif component == 'y':
        trace_indices = range(1,num_traces,3)
    elif component == 'z':
        trace_indices = range(2,num_traces,3)

    trace_array = np.full((num_traces//3, n_pts), np.nan, dtype='float32')
    #pdb.set_trace()
    for i_trace, trace_index in enumerate(trace_indices):
        print(i_trace)
        trace = st.traces[trace_index]
        try:
            if trace.stats.segy.trace_header.hole_id>0:
                trace_array[i_trace,:] = st.traces[trace_index].data
        except AttributeError:
            if trace.stats.segy.trace_header.dummy_hole_id>0:
                trace_array[i_trace,:] = st.traces[trace_index].data
    #pdb.set_trace()
    if output_shape=='1d':
        trace_array = trace_array.reshape(np.prod(trace_array.shape))
    return trace_array


def concatenate_traces2(st, component, output_shape='2d'):
    """
    @type st:  obspy.core.stream.Stream, i.e.the output from _read_segy()
    TODO: add support for 1D, 2D outputs

    @var channel: [0, 1, 2] its one of these.  it used to be veritcal:0, tangential:1, radial:2
    @var channel: [0, 1, 2] its one of these.  it used to be veritcal:1, tangential:0, radial:2

    """
    rhino_channel_map = rhino_channel_map_from_trace(st.traces[0])
    channel = rhino_channel_map[component]
    num_traces = len(st.traces)
    trace_indices = range(channel, num_traces, 3)
    n_pts = len(st.traces[0].data)#640

    trace_array = np.full((num_traces//3, n_pts), np.nan, dtype='float32')
    for i_trace, trace_index in enumerate(trace_indices):
        print(i_trace)
        trace_array[i_trace,:] = st.traces[trace_index].data

    if output_shape=='1d':
        trace_array = trace_array.reshape(np.prod(trace_array.shape))
    return trace_array


def rhino_channel_map_from_trace(trace):
    """
    TODO: if no trace is passed, go load one from the segy using iread
    """
    drill_string_axis_ch = trace.stats.segy.trace_header.axial_axis
    tangential_axis_ch = trace.stats.segy.trace_header.tangential_axis
    rhino_channel_map = get_rhino_channel_map(drill_string_axis_ch, tangential_axis_ch)
    return rhino_channel_map


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
