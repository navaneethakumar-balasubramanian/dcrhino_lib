#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""

@author: natal
"""

from __future__ import absolute_import, division, print_function
import pdb
from datetime import datetime
import os,sys
import numpy as np
import pandas as pd
import json
from obspy import Trace, Stream
from obspy.core import AttribDict, UTCDateTime
from obspy.io.segy.segy import SEGYTraceHeader, SEGYBinaryFileHeader
from dcrhino.process_pipeline.segy_trace_header import define_obspy_trace_header #This module needs to remain here in order to redefine the trace headers
from dcrhino.process_pipeline.config import Config
define_obspy_trace_header()

def load_existing_data_files(path):
    components={}
    components["axial"] = np.load(os.path.join(path,"axial_interpolated.npy"))
    components["tangential"] = np.load(os.path.join(path,"tangential_interpolated.npy"))
    components["radial"] = np.load(os.path.join(path,"radial_interpolated.npy"))
    components["ts"] = np.load(os.path.join(path,"ts.npy"))
    return components


def extract_component_data_from_data_dictionary(numpys_h5_hole_files):
    components={}
    components["axial"] = numpys_h5_hole_files["axial_despiked_correlated"]
    components["tangential"] = numpys_h5_hole_files["tangential_despiked_correlated"]
    components["radial"] = numpys_h5_hole_files["radial_despiked_correlated"]
    components["ts"] = numpys_h5_hole_files["ts"]
    return components


def get_mwd_from_extracted_features_csv(path):
    columns=["datetime_ts","mse","depth","mwd_collar_easting","mwd_collar_northing","mwd_collar_elevation","mwd_weight_on_bit","mwd_rop","mwd_torque",
            "mwd_rpm","mwd_air_pressure"]
    df = pd.read_csv(os.path.join(path,"extracted_features.csv"),usecols=columns)
    #df["datetime_ts"] = pd.to_datetime(df["datetime_ts"])
    return df

def get_mwd_from_extracted_features_df(hole_features_extracted,mwdHelper):
    output_df = pd.DataFrame()
    output_df['datetime_ts'] = hole_features_extracted['datetime_ts']
    output_df['mse'] = hole_features_extracted['mse']
    output_df['depth'] = hole_features_extracted['depth']
    output_df['mwd_collar_easting'] = hole_features_extracted['mwd_' + mwdHelper.easting_column_name]
    output_df['mwd_collar_northing'] = hole_features_extracted['mwd_' + mwdHelper.northing_column_name]
    output_df['mwd_collar_elevation'] = hole_features_extracted['mwd_' + mwdHelper.collar_elevation_column_name]
    output_df['mwd_weight_on_bit'] = hole_features_extracted['mwd_' + mwdHelper.wob_column_name]
    if 'mwd_' + mwdHelper.rop_column_name in hole_features_extracted.columns:
        output_df['mwd_torque'] = hole_features_extracted['mwd_' + mwdHelper.rop_column_name]
    else:
        output_df['mwd_torque'] = 0.0
    if 'mwd_' + mwdHelper.rpm_column_name in hole_features_extracted.columns:
        output_df['mwd_rpm'] = hole_features_extracted['mwd_' + mwdHelper.rpm_column_name]
    else :
        output_df['mwd_rpm'] = 0.0
    if 'mwd_' + mwdHelper.air_pressure_column_name in hole_features_extracted.columns:
        output_df['mwd_air_pressure'] = hole_features_extracted['mwd_' + mwdHelper.air_pressure_column_name]
    else:
        output_df['mwd_air_pressure'] = 0.0
    #df = hole_features_extracted[columns]
    #df["datetime_ts"] = pd.to_datetime(df["datetime_ts"])
    return output_df


def add_traces_to_stream(components,mwd,global_config,hole_id):
    # pdb.set_trace()
    output_sampling_rate = global_config.output_sampling_rate
    stream = Stream()
    stream.stats = AttribDict()
    stream.stats.textual_file_header = "Textual Header"
    stream.stats.binary_file_header = SEGYBinaryFileHeader()
    for i,ts in enumerate(components["ts"]):
        axial = components["axial"][i]
        tangential = components["tangential"][i]
        radial = components["radial"][i]
        data = [axial,tangential,radial]
        mwd_trace_time = mwd["datetime_ts"][i]
        raw_data_trace_time = components["ts"][i]
        # pdb.set_trace()
        if mwd_trace_time == raw_data_trace_time:
            trace_time = datetime.utcfromtimestamp(mwd_trace_time)
        else:
            # pdb.set_trace()
            raise ValueError("MWD and raw_data time do not match")
        for t in range(3):
            trace = Trace(data=data[t])
            trace.stats.segy = {}
            trace.stats.sampling_rate = output_sampling_rate
            trace.stats.segy.trace_header = SEGYTraceHeader()

            trace.stats.channel = t+1 #1 for X, 2 for Y, 3 for Z
            trace.stats.segy.trace_header.trace_index = stream.count()+1
            trace.stats.segy.trace_header.ensemble_number = i+1
            trace.stats.segy.trace_header.component = t + 1
            trace.stats.segy.trace_header.coordinate_units = 1 #Make sure all units are in meters and not feet
            trace.stats.segy.trace_header.time_basis_code = 4 #It is set to UTC.  If it is not the case, have to update this value
            trace.stats.segy.trace_header.number_of_samples_in_this_trace = output_sampling_rate #This assumes that the trace length is always one second
            trace.stats.segy.trace_header.sample_interval_duration_in_seconds = float(1.0/output_sampling_rate)

            pdb.set_trace()
            trace.stats.segy.trace_header.year_data_recorded = trace_time.year
            trace.stats.segy.trace_header.day_of_year = trace_time.day
            trace.stats.segy.trace_header.hour_of_day = trace_time.hour
            trace.stats.segy.trace_header.minute_of_hour = trace_time.minute
            trace.stats.segy.trace_header.second_of_minute = trace_time.second

            trace.stats.segy.trace_header.sensor_sampling_rate = output_sampling_rate
            trace.stats.segy.trace_header.sensor_distance_to_source = global_config.output_sampling_rate #Calculated from the top of the Top Sub
            trace.stats.segy.trace_header.sensor_position = global_config.sensor_position #Distance from the sensor to the top of the shocksub
            trace.stats.segy.trace_header.sensor_distance_to_shocksub =  global_config.sensor_distance_to_shocksub
            trace.stats.segy.trace_header.sensor_axial_axis = global_config.sensor_axial_axis
            trace.stats.segy.trace_header.sensor_tangential_axis = global_config.sensor_tangential_axis
            trace.stats.segy.trace_header.sensor_type =global_config.sensor_type
            trace.stats.segy.trace_header.sensor_accelerometer_type=global_config.sensor_accelerometer_type
            trace.stats.segy.trace_header.sensor_saturation_g=global_config.sensor_saturation_g

            trace.stats.segy.trace_header.drill_string_total_length = global_config.drill_string_total_length
            trace.stats.segy.trace_header.drill_string_steel_od = global_config.drill_string_steel_od

            trace.stats.segy.trace_header.mwd_hole_id = hole_id
            trace.stats.segy.trace_header.mwd_collar_easting = mwd["mwd_collar_easting"][i]
            trace.stats.segy.trace_header.mwd_collar_northing = mwd["mwd_collar_northing"][i]
            trace.stats.segy.trace_header.mwd_collar_elevation = mwd["mwd_collar_elevation"][i]
            trace.stats.segy.trace_header.depth = mwd["depth"][i]
            trace.stats.segy.trace_header.mse = mwd["mse"][i]
            trace.stats.segy.trace_header.mwd_rpm = mwd["mwd_rpm"][i]
            trace.stats.segy.trace_header.mwd_weight_on_bit = mwd["mwd_weight_on_bit"][i]
            trace.stats.segy.trace_header.mwd_torque = mwd["mwd_torque"][i]
            trace.stats.segy.trace_header.mwd_rop = mwd["mwd_rop"][i]
            trace.stats.segy.trace_header.mwd_air_pressure = mwd["mwd_air_pressure"][i]
            stream.append(trace)
    return stream

def load_global_config(path):
    global_config - Config()
    json_data=open(os.path.join(path,"global_config.json")).read()
    global_config.set_data_from_json(json_data)
    return global_config

def generate_segy_from_hole_data(components,mwd,global_config,hole_id,output_path):
    try:
        stream = add_traces_to_stream(components,mwd,global_config,hole_id)
        stream.write(output_path, format="SEGY", data_encoding=1,byteorder=">",textual_header_encoding="ASCII")
    except:
        print(sys.exc_info())

if __name__ == "__main__":
    path = "/home/natal/toconvert/test_hole"
    output_path = os.path.join(path,"test.sgy")
    hole_id = 999
    components=load_existing_data_files(path)
    mwd = get_mwd_from_extracted_features_csv(path)
    global_config = load_global_config(path)
    generate_segy_from_hole_data(components,mwd,global_config,hole_id,output_path)
