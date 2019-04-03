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
    [4, 'blasthole_easting', 'f', 34],
    [4, 'blasthole_northing', 'f', 38],
    [4, 'blasthole_collar_elevation', 'f', 42],
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
#    [2, 'piezo_sampling_rate', 'H', 86],
#    [2, 'mems_sampling_rate', 'H', 88],
#    [2, 'piezo_max_g', 'H', 90],
#    [2, 'mems_max_g', 'H', 92],
    [2, 'sensor_sampling_rate', 'H', 86], #When this lines get implemented, the xlsx file with the mapping needs to be updated
    [2, 'sensor_max_g', 'H', 88],
    [4, 'millisecond_offset', 'I', 90],
    [2, 'axial_axis', 'H', 94],
    [2, 'tangential_axis', 'H', 96],
    [4,'drill_string_total_length','f',98],
    [2, 'drill_string_component1', 'h', 102],
    [2, 'drill_string_component2', 'h', 104],
    [2, 'drill_string_component3', 'h', 106],
    [2, 'drill_string_component4', 'h', 108],
    [2, 'drill_string_component5', 'h', 110],
    [2, 'drill_string_component6', 'h', 112],
    [2, 'drill_string_component7', 'h', 114],
    [2, 'drill_string_component8', 'h', 116],
    [2, 'drill_string_component9', 'h', 118],
    [2, 'drill_string_component10', 'h', 120],
    [4, 'peak_ampl', 'f', 122],
    [4, 'mult_ampl', 'f', 126],
    [4, 'peak_avg_lvl', 'f', 130],
    [4, 'mult_avg_lvl', 'f', 134],
    [4, 'time_mult', 'f', 138],
    [4, 'peak_index', 'f', 142],
    [4, 'mult_index', 'f', 146],
    [4, 'T_beg_mult', 'f', 150],
    [4, 'T_end_mult', 'f', 154],
    [4, 'corner_frequencies_for_bandpass', 'f', 158],
    [4, 'deon_operator_length', 'f', 162],
    [4, 'minimum_lag', 'f', 166],
    [4, 'maximum_lag', 'f', 170],
    [4, 'raw_rms', 'f', 174],
    [4, 'installation_diameter', 'f', 178],
    [4, 'drill_string_steel_od', 'f', 182],
    [2, 'mwd_hole_id', 'H', 186],
    [4, 'sample_interval_duration', 'f', 188],
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

class DataCloudTraceHeader(object):
    """
    20180628
    """
    def __init__(self, **kwargs):
        self.attr = None

    def get_tracetime(self, tr):
        """

        """
        trace_header = tr.stats.segy.trace_header

        #t0 = st_parent.traces[0].stats.starttime.datetime
        year = trace_header.year_data_recorded
        doy = trace_header.day_of_year
        hh = trace_header.hour_of_day
        mm = trace_header.minute_of_hour
        ss = trace_header.second_of_minute
        new_years_date = datetime.datetime(year, 1, 1, hh, mm, ss)
        the_date = new_years_date + datetime.timedelta(doy - 1)
        return the_date
        #pdb.set_trace()


def main():
    """
    """

    define_obspy_trace_header()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
