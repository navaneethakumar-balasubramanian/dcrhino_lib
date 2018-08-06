# -*- coding: utf-8 -*-
"""
Created on Thu Jul 12 15:39:52 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb


#from dcrhino.analysis.supporting_processing import dummy_hole_id_from_trace
from dcrhino.analysis.supporting_processing import rhino_channel_map_from_trace



class TraceHeaderAttributes(object):
    def __init__(self, num_traces_per_component, **kwargs):
        self.num_traces_per_component = num_traces_per_component
        self.peak_ampl_vertical = np.full(num_traces_per_component, np.nan, dtype='float32')
        self.peak_mult_vertical = np.full(num_traces_per_component, np.nan, dtype='float32')
        self.peak_ampl_vert_ndx = np.full(num_traces_per_component, np.nan, dtype='float32')
        self.peak_mult_vert_ndx = np.full(num_traces_per_component, np.nan, dtype='float32')

        self.peak_ampl_tangential = np.full(num_traces_per_component, np.nan, dtype='float32')
        self.peak_ampl_tangential_ndx = np.full(num_traces_per_component, np.nan, dtype='float32')

        self.peak_ampl_radial = np.full(num_traces_per_component, np.nan, dtype='float32')
        self.peak_ampl_radial_ndx = np.full(num_traces_per_component, np.nan, dtype='float32')



    def populate_from_stream(self, st):
        """
        """
        rhino_channel_map = rhino_channel_map_from_trace(st.traces[0])
        vertical_channel = rhino_channel_map['vertical']
        tangential_channel = rhino_channel_map['tangential']

        num_traces_total = 3 * self.num_traces_per_component
        x_trace_indices = range(0,num_traces_total,3)

        for i_ndx, ndx in enumerate(x_trace_indices):
            #dummy_hole_id = dummy_hole_id_from_trace(st.traces[ndx])
            #   if dummy_hole_id != 0:
            vert_ndx = ndx + vertical_channel
            tang_ndx = ndx + tangential_channel
            self.peak_ampl_vertical[i_ndx] = st.traces[vert_ndx].stats.segy.trace_header.peak_ampl
            self.peak_mult_vertical[i_ndx] = st.traces[vert_ndx].stats.segy.trace_header.mult_ampl
            self.peak_ampl_tangential[i_ndx] = st.traces[tang_ndx].stats.segy.trace_header.peak_ampl
            self.peak_ampl_radial[i_ndx] = st.traces[ndx+2].stats.segy.trace_header.peak_ampl
            self.peak_ampl_vert_ndx[i_ndx] = st.traces[vert_ndx].stats.segy.trace_header.peak_index
            self.peak_mult_vert_ndx[i_ndx] = st.traces[vert_ndx].stats.segy.trace_header.mult_index



#def get_amplitudes_from_trace_headers(st):
#    """
#    usage
#    peak_ampl_vertical, peak_mult_vertical, peak_ampl_tangential, peak_ampl_radial = get_amplitudes_from_trace_headers(st)
#    """
#    num_traces_per_component = len(st.traces) // 3
#    rhino_channel_map = rhino_channel_map_from_trace(st.traces[0])
#    vertical_channel = rhino_channel_map['vertical']
#    tangential_channel = rhino_channel_map['tangential']
#
#    num_traces_total = 3 * num_traces_per_component
#    x_trace_indices = range(0,num_traces_total,3)
#
#    peak_ampl_vertical = np.full(num_traces_per_component, np.nan, dtype='float32')
#    peak_ampl_tangential = np.full(num_traces_per_component, np.nan, dtype='float32')
#    peak_ampl_radial = np.full(num_traces_per_component, np.nan, dtype='float32')
#    peak_mult_vertical = np.full(num_traces_per_component, np.nan, dtype='float32')
#
#    for i_ndx, ndx in enumerate(x_trace_indices):
##        dummy_hole_id = dummy_hole_id_from_trace(st.traces[ndx])
##        if dummy_hole_id != 0:
#        vert_ndx = ndx + vertical_channel
#        tang_ndx = ndx + tangential_channel
#        peak_ampl_vertical[i_ndx] = st.traces[vert_ndx].stats.segy.trace_header.peak_ampl
#        peak_mult_vertical[i_ndx] = st.traces[vert_ndx].stats.segy.trace_header.mult_ampl
#        peak_ampl_tangential[i_ndx] = st.traces[tang_ndx].stats.segy.trace_header.peak_ampl
#        peak_ampl_radial[i_ndx] = st.traces[ndx+2].stats.segy.trace_header.peak_ampl
#
#    return peak_ampl_vertical, peak_mult_vertical, peak_ampl_tangential, peak_ampl_radial

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
