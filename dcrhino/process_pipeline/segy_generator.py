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

def get_name_of_traces_to_get(suffix):
    components = ["axial","tangential","radial"]
    traces_to_load = ["{}_{}".format(x,suffix) for x in components]
    return traces_to_load


def load_existing_data_files(path,global_config):
    traces_to_load = get_name_of_traces_to_get(global_config.segy_output_step)
    components={}
    components["axial"] = np.load(os.path.join(path,"{}.npy".format(traces_to_load[0])))
    components["tangential"] = np.load(os.path.join(path,"{}.npy".format(traces_to_load[1])))
    components["radial"] = np.load(os.path.join(path,"{}.npy".format(traces_to_load[2])))
    components["ts"] = np.load(os.path.join(path,"ts.npy"))
    return components


def extract_component_data_from_data_dictionary(numpys_h5_hole_files,global_config):
    traces_to_load = get_name_of_traces_to_get(global_config.segy_output_step)
    components={}
    components["axial"] = numpys_h5_hole_files[traces_to_load[0]]
    components["tangential"] = numpys_h5_hole_files[traces_to_load[1]]
    components["radial"] = numpys_h5_hole_files[traces_to_load[2]]
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
    output_df['mwd_torque'] = hole_features_extracted['mwd_' + mwdHelper.tob_column_name]
    output_df['mwd_rop'] = hole_features_extracted['mwd_' + mwdHelper.rop_column_name]
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
    pdb.set_trace()
    output_sampling_rate = global_config.output_sampling_rate
    stream = Stream()
    stream.stats = AttribDict()
    stream.stats.textual_file_header = generate_textual_header(global_config)
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

            # pdb.set_trace()
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

def generate_textual_header(global_config):
    #ALL THIS IS SO THAT THE TEXTUA HEADER CAN BE PROPERLY READ IN THIRD PARTY PROGRAMS.  EACH LINE HAS 80 CHARACTERS
    row = 1

    header = "C%s RECORDING_DATE: %s" % (row,global_config.sensor_installation_date)
    header = header.encode(encoding="ASCII")
    length = len(header)
    if length < 80:
        header = header + b' ' * (80 - length)
    row += 1

    line = "C%s COUNTRY: %s" % (row, global_config.country)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s COMPANY: %s" % (row, global_config.company)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s MINE_NAME: %s" % (row, global_config.mine_name)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s RECORDING_ENGINEER: %s" % (row, global_config.recording_engineer)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s RIG_MODEL: %s" % (row, global_config.rig_model)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s RIG_MANUFACTURER: %s" % (row, global_config.rig_manufacturer)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s RIG_ID: %s" % (row, global_config.rig_id)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s DRILL_TYPE: %s" % (row, global_config.drill_type)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s MWD_TYPE: %s" % (row, global_config.mwd_type)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s BIT_TYPE: %s" % (row, global_config.bit_type)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s BIT_MODEL: %s" % (row, global_config.bit_model)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s BIT_SIZE: %s in" % (row, global_config.bit_size)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s SENSOR_TYPE: %s" % (row, global_config.sensor_type)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s DIGITIZER_SERIAL_NUMBER: %s" % (row, global_config.digitizer_serial_number)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s SENSOR_SERIAL_NUMBER: %s" % (row, global_config.sensor_serial_number)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s SENSOR_NATIVE_SAMPLING_RATE: %s" % (row, global_config.sensor_ideal_sampling_rate)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s DATA_OUTPUT_SAMPLING_RATE: %s" % (row, global_config.output_sampling_rate)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s SENSOR_MAX_G: %s" % (row, global_config.sensor_saturation_g)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s SENSOR_ACCELEROMETER_DATA_TYPE: %s" % (row, global_config.accelerometer_type)
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    row += 1

    line = "C%s COMMENTS: %s" % (row, global_config.comments.upper())
    line = line.encode(encoding="ASCII")
    length = len(line)
    if length < 80:
        header += line + b' ' * (80 - length)
    elif length > 80:
        loops = int(length/80)
        extra_chars = 4 * (loops-1) #Need to account for the CXX_ at the beginning of each line
        fraction_loop = length % 80
        extra_loops = int((extra_chars + fraction_loop)/80)
        loops += extra_loops
        header += line[0:80]
        for l in range(loops-1):
            header += "C" +str(row+l+1)+ " " + line[80*(l+1)-(l*4):76*(l+2)+4]
        if fraction_loop != 0:
            last_line = line[-(fraction_loop+extra_chars):]
            header += "C" +str(row+loops)+ " " + last_line + b' ' * (80 - len(last_line))

    return header

if __name__ == "__main__":
    path = "/home/natal/toconvert/test_hole"
    output_path = os.path.join(path,"test.sgy")
    hole_id = 999
    global_config = load_global_config(path)
    components=load_existing_data_files(path,global_config)
    mwd = get_mwd_from_extracted_features_csv(path)
    generate_segy_from_hole_data(components,mwd,global_config,hole_id,output_path)
