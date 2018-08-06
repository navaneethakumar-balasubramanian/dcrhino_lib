# -*- coding: utf-8 -*-
"""
Created on Thu May 31 08:59:21 2018

@author: Natal
"""
import numpy as np
import pandas as pd
from datetime import datetime
from obspy import read, Trace, Stream, UTCDateTime
from obspy.core import AttribDict
from obspy.io.segy.segy import SEGYTraceHeader, SEGYBinaryFileHeader
from obspy.io.segy.core import _read_segy


import obspy.io.segy.header
obspy.io.segy.header.TRACE_HEADER_FORMAT[:] = [
    # [length, name, special_type, start_byte]
    [4, 'trace_number', 'I', 0],
    [4, 'ensemble_number', 'I', 4],
    [2, 'trace_number_in_ensemble', 'H', 8],
    [2, 'coordinate_units', 'H', 10],
    [2, 'time_basis_code', 'H', 12],
    [2, 'number_of_samples_in_this_trace', 'H', 14],
    [2, 'sample_interval_in_ms_for_this_trace', 'H', 16],
    [2, 'year_data_recorded', 'H',18],
    [2, 'day_of_year', 'H', 20],
    [2, 'hour_of_day','H', 22],
    [2, 'minute_of_hour', 'H', 24],
    [2, 'second_of_minute', 'H', 26],
    [2, 'hole_id', 'H', 28],
    [4, 'sensor_distance_to_source','f', 30],
    [4, 'bh_easting', 'f', 34],
    [4, 'bh_northing', 'f', 38],
    [4, 'bh_collar_elevation', 'f', 42],
    [4, 'bit_depth','f', 46],
    [4, 'mse', 'f', 50],
    [4, 'rpm','f',54],
    [4, 'wob','f', 58],
    [4, 'torque', 'f', 62],
    [4, 'rop', 'f', 66],
    [4, 'air_pressure', 'f', 70],
    [4, 'vibration','f', 74],
    [4, 'blastability', 'f', 78],
    [4, 'sensor_position', 'f', 82], #Distance from bottom thread of shock sub (-ve below shock sub connection)
    [2, 'piezo_sampling_rate', 'H', 86],
    [2, 'mems_sampling_rate', 'H', 88],
    [2, 'piezo_max_g', 'H', 90],
    [2, 'mems_max_g', 'H', 92],
    [2, 'axial_axis', 'H', 94],
    [2, 'tangential_axis', 'H', 96],
    [2, 'ds_component1', 'h', 98],
    [2, 'ds_component2', 'h', 100],
    [2, 'ds_component3', 'h', 102],
    [2, 'ds_component4', 'h', 104],
    [2, 'ds_component5', 'h', 106],
    [2, 'ds_component6', 'h', 108],
    [2, 'ds_component7', 'h', 110],
    [2, 'ds_component8', 'h', 112],
    [2, 'ds_component9', 'h', 114],
    [2, 'ds_component10', 'h', 116],
    [4, 'peak_ampl', 'f', 118],
    [4, 'mult_ampl', 'f', 122],
    [4, 'peak_avg_lvl', 'f', 126],
    [4, 'mult_avg_lvl', 'f', 130],
    [4, 'time_mult', 'f', 134],
    [4, 'T_beg_peak', 'f', 138],
    [4, 'T_end_peak', 'f', 142],
    [4, 'T_beg_mult', 'f', 146],
    [4, 'T_end_mult', 'f', 150],
    [4, 'corner_frequencies_for_bandpass', 'f', 154],
    [4, 'deon_operator_length', 'f', 158],
    [4, 'minimum_lag', 'f', 162],
    [4, 'maximum_lag', 'f', 166],
    [4, 'free', False, 170],
    [4, 'free', False, 174],
    [4, 'free', False, 178],
    [4, 'free', False, 182],
    [4, 'free', False, 186],
    [4, 'free', False, 190],
    [4, 'free', False, 194],
    [4, 'free', False, 198],
    [4, 'free', False, 202],
    [4, 'free', False, 206],
    [4, 'free', False, 210],
    [4, 'free', False, 214],
    [4, 'free', False, 218],
    [4, 'free', False, 222],
    [4, 'free', False, 226],
    [4, 'free', False, 230],
    [4, 'free', False, 234],
    [2, 'free', False, 238],
	]

obspy.io.segy.header.TRACE_HEADER_KEYS[:] = \
    [_i[1] for _i in obspy.io.segy.header.TRACE_HEADER_FORMAT]




def get_distance():
    filename = '/home/kkappler/data/datacloud/milligan/level_1/2018-05-06/Test3_Ch08.segy'
    #st = _read_segy("E:/toConvert/Test/Test_Ch08.sgy")cd
    st = _read_segy(filename)
    for tr in st:
        print(tr.stats.segy.trace_header.sensor_distance_to_source)




if __name__ == "__main__":
    get_distance()