# -*- coding: utf-8 -*-
"""
Created on Thu May 31 12:00:54 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

from obspy.io.segy.core import _read_segy
from dcrhino.analysis.supporting_processing import concatenate_traces
from dcrhino.analysis.supporting_processing import get_dummy_hole_ids_from_segy
#home = os.path.expanduser("~/")
def temp_plot(peak_ampl_x, peak_ampl_y, peak_ampl_z, peak_mult_x, show=True):
    """
    placeholder to hold some code I'm factoring out of segy_to_dc_blasthole.
    Likely to be deprecated;
    """

    plt.figure(1)
    plt.plot(peak_ampl_x, label='x')
    plt.plot(peak_ampl_y+1, label='y')
    plt.plot(peak_ampl_z+2, label='z')
    plt.title('Peak Amplitude')
    plt.xlabel('Trace Number ')
    plt.ylabel('Amplitude')
    plt.legend()
#    output_svfig_name = full_segy_file.replace('.sgy', '_peak_ampl.png')
#    plt.savefig(output_svfig_name)

    plt.figure(2)
    plt.plot(peak_mult_x, label='x')
    plt.title('Multiple Amplitude')
    plt.xlabel('Trace Number ')
    plt.ylabel('Amplitude')
    plt.legend()
    #output_svfig_name = full_segy_file.replace('.sgy', '_mult_ampl.png')
    #plt.savefig(output_svfig_name)
    if show:
        plt.show()
    else:
        plt.clf()
    pass


def segy_to_dc_blasthole(full_segy_file):
    """
    TODO: 200U string is hard coded here, should actually be a function of
    samapling rate

    TODO: time trails and revist index on readin
    Note: when reading in the csv the timestamp column will be strings
    Two ways to convert:
        1. df = pd.read_csv('filename.csv');
           df.index = [pd.Timestamp(x) for x in df['Unnamed: 0']]
           delete the timestamp columnn ['Unnamed: 0']
        2. freq_string = '200U', '1s' fro example
            rng = pd.date_range(t0, periods=num_total_multivariate_samples, freq=freq_string)
            df.index = rng
    TODO: Factor into three primary methods
    1. Trace dumper
    2, peak_ampl, mult_ampl, and any other metadata numeruc 1x/trace
    3. Metadata dictionary
    """
    print("reading segy")
    st = _read_segy(full_segy_file)
    dummy_hole_ids, unique_hole_ids = get_dummy_hole_ids_from_segy(st)
    dummy_hole_ids_by_time = dummy_hole_ids[0::3]
    try:
        hole_ids = np.asarray([x.stats.segy.trace_header.hole_id for x in st.traces])
    except AttributeError:
        hole_ids = np.asarray([x.stats.segy.trace_header.dummy_hole_id for x in st.traces])
    hole_ids_by_time = hole_ids[0::3]
    print("reshaping traces")
    #spdb.set_trace()
#    x_trace_array = concatenate_traces(st, 'x', output_shape='1d')
#    y_trace_array = concatenate_traces(st, 'y', output_shape='1d')
#    z_trace_array = concatenate_traces(st, 'z', output_shape='1d')
    #pdb.set_trace()
    #<sort out timing>
    print("sorting out timing")
    #st.stats.binary_file_header.sample_interval_in_microseconds
    t0 = st.traces[0].stats.starttime.datetime


    num_traces = int(len(st.traces)/3)

    x_trace_indices = range(0,len(st.traces),3)
    #y_trace_indices = range(0,num_traces,3)
    #z_trace_indices = range(0,num_traces,3)
    peak_ampl_x = np.full(num_traces, np.nan, dtype='float32')
    peak_ampl_y = np.full(num_traces, np.nan, dtype='float32')
    peak_ampl_z = np.full(num_traces, np.nan, dtype='float32')
    peak_mult_x = np.full(num_traces, np.nan, dtype='float32')
    #peak_mult_y = np.full(num_traces, np.nan, dtype='float32')
    #peak_mult_z = np.full(num_traces, np.nan, dtype='float32')

    for i_ndx, ndx in enumerate(x_trace_indices):
        peak_ampl_x[i_ndx] = st.traces[ndx].stats.segy.trace_header.peak_ampl
        peak_mult_x[i_ndx] = st.traces[ndx].stats.segy.trace_header.mult_ampl
        peak_ampl_y[i_ndx] = st.traces[ndx+1].stats.segy.trace_header.peak_ampl
        #peak_mult_y[i_ndx] = st.traces[ndx+1].stats.segy.trace_header.mult_ampl
        peak_ampl_z[i_ndx] = st.traces[ndx+2].stats.segy.trace_header.peak_ampl
        #peak_mult_z[i_ndx] = st.traces[ndx+2].stats.segy.trace_header.mult_ampl

    #pdb.set_trace()
    plot=False;    show = False
    if plot:
        temp_plot(peak_ampl_x, peak_ampl_y, peak_ampl_z, peak_mult_x, show=show)

    freq_string ='1s'
    rng = pd.date_range(t0, periods=len(peak_ampl_x), freq=freq_string)
    peak_ampl_x = pd.Series(peak_ampl_x, index=rng)
    peak_ampl_y = pd.Series(peak_ampl_y, index=rng)
    peak_ampl_z = pd.Series(peak_ampl_z, index=rng)
    peak_mult_x = pd.Series(peak_mult_x, index=rng)

    data_dict = {'peak_ampl_x':peak_ampl_x, 'peak_ampl_y':peak_ampl_y,
                      'peak_ampl_z':peak_ampl_z, 'peak_mult_x':peak_mult_x,
                      'dummy_hole_id':hole_ids_by_time}
    output_csv_name = full_segy_file.replace('.sgy', '_peak.csv')
    df = pd.DataFrame(data=data_dict)
    df.to_csv(output_csv_name, index_label='datetime')
    return


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
