# -*- coding: utf-8 -*-
"""
Created on Sat May 26 12:12:33 2018

@author: kkappler
sensor_distance_to_source
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

import obspy

TRACE_HEADER_FORMAT_LIST = [
    # [length, name, special_type, start_byte]
    [4, 'trace_sequence_number_within_line', False, 0],
    [4, 'trace_sequence_number_within_segy_file', False, 4],
    [4, 'original_field_record_number', False, 8],
    [4, 'trace_number_within_the_original_field_record', False, 12],
    [4, 'peak_ampl', 'f', 16],
    [4, 'mult_ampl', 'f', 20],
    [4, 'free', False, 24],
    [2, 'trace_identification_code', False, 28],
    [2, 'number_of_vertically_summed_traces_yielding_this_trace', False, 30],
    [2, 'number_of_horizontally_stacked_traces_yielding_this_trace', False,32],
    [2, 'free', False, 34],
    [4, 'sensor_distance_to_source', False, 'f'],
    [4, 'free', False, 40],
    [4, 'free', False, 44],
    [4, 'free', False, 48],
    [4, 'free', False, 52],
    [4, 'free', False, 56],
    [4, 'free', False, 60],
    [4, 'free', False, 64],
    [2, 'scalar_to_be_applied_to_all_elevations_and_depths', False, 68],
    [2, 'scalar_to_be_applied_to_all_coordinates', False, 70],
    [4, 'free', False, 72],
    [4, 'free', False, 76],
    [4, 'free', False, 80],
    [4, 'free', False, 84],
    [2, 'coordinate_units', False, 88],
    [2, 'free', False, 90],
    [2, 'free', False, 92],
    [2, 'free', False, 94],
    [2, 'free', False, 96],
    [2, 'free', False, 98],
    [2, 'free', False, 100],
    [2, 'free', False, 102],
    [2, 'free', False, 104],
    [2, 'free', False, 106],
    [2, 'free', False, 108],
    [2, 'free', False, 110],
    [2, 'free', False, 112],
    [2, 'number_of_samples_in_this_trace', 'H', 114],
    [2, 'sample_interval_in_ms_for_this_trace', 'H', 116],
    [2, 'gain_type_of_field_instruments', False, 118],
    [2, 'free', False, 120],
    [2, 'free', False, 122],
    [2, 'free', False, 124],
    [2, 'free', False, 126],
    [2, 'free', False, 128],
    [2, 'free', False, 130],
    [2, 'free', False, 132],
    [2, 'free', False, 134],
    [2, 'free', False, 136],
    [2, 'free', False, 138],
    [2, 'free', False, 140],
    [2, 'free', False, 142],
    [2, 'free', False, 144],
    [2, 'free', False, 146],
    [2, 'free', False, 148],
    [2, 'free', False, 150],
    [2, 'free', False, 152],
    [2, 'free', False, 154],
    [2, 'year_data_recorded', False, 156],
    [2, 'day_of_year', False, 158],
    [2, 'hour_of_day', False, 160],
    [2, 'minute_of_hour', False, 162],
    [2, 'second_of_minute', False, 164],
    [2, 'time_basis_code', False, 166],
    [2, 'free', False, 168],
    [2, 'free', False, 170],
    [2, 'free', False, 172],
    [2, 'free', False, 174],
    [2, 'free', False, 176],
    [2, 'free', False, 178],
    [4, 'x_coordinate_of_ensemble_position_of_this_trace', False, 180],
    [4, 'y_coordinate_of_ensemble_position_of_this_trace', False, 184],
    [4, 'z_coordinate_of_ensemble_position_of_this_trace', False, 188],
    [4, 'bit_depth', False,192],
    [4, 'mse', False, 196],
    [4, 'rpm', False, 200],
    [4, 'wob', False, 204],
    [4, 'torque', False, 208],
    [4, 'rop', False, 212],
    [4, 'air_pressure', False, 216],
    [4, 'vibration', False, 220],
    [4, 'blastability', False, 224],
    [4, 'hole_id', False, 228],
	[4, 'free', False, 232],
	[4, 'free', False, 236]
	]

#obspy.io.segy.header.TRACE_HEADER_KEYS[:] = \
#    [_i[1] for _i in obspy.io.segy.header.TRACE_HEADER_FORMAT]

def define_obspy_trace_header():
    """
    """
    obspy.io.segy.header.TRACE_HEADER_FORMAT[:] = TRACE_HEADER_FORMAT_LIST
    obspy.io.segy.header.TRACE_HEADER_KEYS[:] = \
    [_i[1] for _i in obspy.io.segy.header.TRACE_HEADER_FORMAT]

    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
