# -*- coding: utf-8 -*-
"""
Created on Sat May 26 12:12:33 2018

@author: kkappler
beware maybe imprecise or errors in :
    sample_interval_in_ms_for_this_trace

"""

from __future__ import absolute_import, division, print_function
import datetime
import pdb

###############################################################################
#Redefine OBSPY Headers

import obspy.io.segy.header

    # [length, name, special_type, start_byte]
TRACE_HEADER_FORMAT_LIST = [
    [4, 'trace_index', 'I', 0],
    [4, 'ensemble_number', 'I', 4],
    [2, 'component', 'H', 8],
    [2, 'coordinate_units', 'H', 10],
    [2, 'time_basis_code', 'H', 12],
    [2, 'number_of_samples_in_this_trace', 'H', 14],
    [2, 'sample_interval_in_ms_for_this_trace', 'H', 16],
    [4, 'sample_interval_duration_in_seconds','f',18],
    [2, 'year_data_recorded', 'H',22],
    [2, 'day_of_year', 'H', 24],
    [2, 'hour_of_day','H', 26],
    [2, 'minute_of_hour', 'H', 28],
    [2, 'second_of_minute', 'H', 30],
    [4, 'sensor_sampling_rate', 'f', 32],
    [4, 'sensor_distance_to_source','f', 36],
    [4, 'sensor_position', 'f', 40],
    [4, 'sensor_distance_to_shocksub', 'f', 44],
    [2, 'sensor_axial_axis', 'H', 48],
    [2, 'sensor_tangential_axis', 'H', 50],
    [2, 'sensor_type', 'H', 52],
    [2, 'sensor_accelerometer_type', 'H', 54],
    [2, 'sensor_saturation_g', 'H', 56],
    [4, 'drill_string_total_length', 'f', 58],
    [4, 'drill_string_steel_od', 'f', 62],
    [2, 'mwd_hole_id', 'H', 66],
    [4, 'mwd_collar_easting', 'f', 68],
    [4, 'mwd_collar_northing', 'f', 72],
    [4, 'mwd_collar_elevation','f', 76],
    [4, 'depth', 'f', 80],
    [4, 'mse','f',84],
    [4, 'mwd_rpm','f', 88],
    [4, 'mwd_weight_on_bit', 'f', 92],
    [4, 'mwd_torque', 'f', 96],
    [4, 'mwd_rop', 'f', 100],
    [4, 'mwd_air_pressure','f', 104],
    [4, 'free', False, 108],
    [4, 'free', False, 112],
    [4, 'free', False, 116],
    [4, 'free', False, 120],
    [4, 'free', False, 124],
    [4, 'free', False, 128],
    [4, 'free', False, 132],
    [4, 'free', False, 136],
    [4, 'free', False, 140],
    [4, 'free', False, 144],
    [4, 'free', False, 148],
    [4, 'free', False, 152],
    [4, 'free', False, 156],
    [4, 'free', False, 160],
    [4, 'free', False, 164],
    [4, 'free', False, 168],
    [4, 'free', False, 172],
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
    return

def main():
    """
    """

    define_obspy_trace_header()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
