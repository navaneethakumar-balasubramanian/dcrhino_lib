# -*- coding: utf-8 -*-
"""
Created on Sat May 26 12:12:33 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function
import datetime
import pdb

###############################################################################
#Redefine OBSPY Headers

import obspy.io.segy.header

    # [length, name, special_type, start_byte]
TRACE_HEADER_FORMAT_LIST = [
    [4, 'trace_sequence_number_within_line', 'I', 0],
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
    [2, 'dummy_hole_id', 'H', 28],
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
    [4, 'sensor_position', 'f', 82], #Distance from top of shock sub
    [2, 'piezo_sampling_rate', 'H', 86],
    [2, 'mems_sampling_rate', 'H', 88],
    [2, 'piezo_max_g', 'H', 90],
    [2, 'mems_max_g', 'H', 92],
    [2, 'axial_axis', 'H', 94],
    [2, 'tangential_axis', 'H', 96],
    [2,'ds_total_length','h',98],
    [2, 'ds_component1', 'h', 100],
    [2, 'ds_component2', 'h', 102],
    [2, 'ds_component3', 'h', 104],
    [2, 'ds_component4', 'h', 106],
    [2, 'ds_component5', 'h', 108],
    [2, 'ds_component6', 'h', 110],
    [2, 'ds_component7', 'h', 112],
    [2, 'ds_component8', 'h', 114],
    [2, 'ds_component9', 'h', 116],
    [2, 'ds_component10', 'h', 118],
    [4, 'peak_ampl', 'f', 120],
    [4, 'mult_ampl', 'f', 124],
    [4, 'peak_avg_lvl', 'f', 128],
    [4, 'mult_avg_lvl', 'f', 132],
    [4, 'time_mult', 'f', 136],
    [4, 'T_beg_peak', 'f', 140],
    [4, 'T_end_peak', 'f', 144],
    [4, 'T_beg_mult', 'f', 148],
    [4, 'T_end_mult', 'f', 152],
    [4, 'corner_frequencies_for_bandpass', 'f', 156],
    [4, 'deon_operator_length', 'f', 160],
    [4, 'minimum_lag', 'f', 164],
    [4, 'maximum_lag', 'f', 168],
    [4, 'raw_rms', 'f', 172],
    [4, 'free', False, 176],
    [4, 'free', False, 180],
    [4, 'free', False, 184],
    [4, 'free', False, 188],
    [4, 'free', False, 192],
    [4, 'free', False, 196],
    [4, 'free', False, 200],
    [4, 'free', False, 204],
    [4, 'free', False, 208],
    [4, 'free', False, 212],
    [4, 'free', False, 216],
    [4, 'free', False, 220],
    [4, 'free', False, 224],
    [4, 'free', False, 228],
    [4, 'free', False, 232],
    [4, 'free', False, 236],
	]


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
    define_obspy_trace_header()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
