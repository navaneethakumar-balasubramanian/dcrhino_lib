#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: thiago
"""

# -*- coding: utf-8 -*-

import pdb
import numpy as np
import json
from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule
from obspy import Trace, Stream
from obspy.core import AttribDict, UTCDateTime
from obspy.io.segy.segy import SEGYTraceHeader, SEGYBinaryFileHeader
from dcrhino3.models.segy_trace_header import define_obspy_trace_header #This module needs to remain here in order to redefine the trace headers
from dcrhino3.models.config import Config
from dcrhino3.helpers.general_helper_functions import init_logging
logger = init_logging(__name__)

define_obspy_trace_header()

class ExportSEGYModule(BaseTraceModule):
    def __init__(self,json,output_path):
        BaseTraceModule.__init__(self,json,output_path)
        self.id = "export_segy"
        self.output_to_file = False
        self.stream = Stream()

    def process_trace_data(self,trace):
        #This function does not perform any operation on the trace data, it just generates a segy output
        # output_df = trace.dataframe.copy()

        if len(np.unique(trace.dataframe['acorr_file_id'])) > 1:
            m = "More than one config file identified while generating SEGY"
            logger.warning(m)
            print(m)
        else:
            m = "Only one config file identified while generating SEGY"
            logger.info(m)
            #print(m)
            #output_path = "/home/natal/toconvert/v3/{}.sgy".format(self.generate_output_name(trace.applied_modules))
            output_path = self.output_path.replace(".h5",".sgy")
            self.global_config = trace.global_config_by_index(trace.dataframe['acorr_file_id'].values[0])
            self.sampling_rate = self.get_sampling_rate(trace.applied_modules)
            self.stream.stats = AttribDict()
            self.stream.stats.textual_file_header = self.generate_textual_header()
            self.stream.stats.binary_file_header = SEGYBinaryFileHeader()
            trace.dataframe.apply(self.save_as_segy,axis=1)
            self.stream.write(output_path, format="SEGY", data_encoding=1,byteorder=">",textual_header_encoding="ASCII")
        return trace

    def generate_output_name(self,applied_modules_list):
        module_names = []
        for module in applied_modules_list:
            module_names.append(json.loads(module)["module_id"])
        return "-".join(module_names)

    def get_sampling_rate(self,applied_modules_list):
        for module in applied_modules_list:
            if json.loads(module)["module_id"] == "upsample":
                return float(self.global_config.upsample_sampling_rate)
        return float(self.global_config.output_sampling_rate)

    def save_as_segy(self,row):
        components = ["axial","radial","tangential"]
        trace_time = row["timestamp"]
        for t in range(3):
            trace_data = np.asarray(row["{}_trace".format(components[t])],dtype=np.float32)
            number_of_samples = len(trace_data)
            trace = Trace(data=trace_data)
            trace.stats.segy = {}
            trace.stats.sampling_rate = self.sampling_rate
            trace.stats.starttime = trace_time
            trace.stats.segy.trace_header = SEGYTraceHeader()
            trace.stats.channel = t+1 #1 for X, 2 for Y, 3 for Z
            trace.stats.segy.trace_header.trace_index = self.stream.count()+1
            # trace.stats.segy.trace_header.ensemble_number = i+1
            trace.stats.segy.trace_header.component = t + 1
            trace.stats.segy.trace_header.coordinate_units = 1 #Make sure all units are in meters and not feet
            trace.stats.segy.trace_header.time_basis_code = 4 #It is set to UTC.  If it is not the case, have to update this value
            trace.stats.segy.trace_header.number_of_samples_in_this_trace =  number_of_samples
            trace.stats.segy.trace_header.sample_interval_duration_in_seconds = float(1.0/self.sampling_rate)

            trace.stats.segy.trace_header.trace_sampling_rate = self.sampling_rate
            trace.stats.segy.trace_header.sensor_distance_to_source = float(self.global_config.sensor_distance_to_source) #Calculated from the top of the Top Sub
            trace.stats.segy.trace_header.sensor_position = float(self.global_config.sensor_position) #Distance from the sensor to the top of the shocksub
            trace.stats.segy.trace_header.sensor_distance_to_shocksub =  float(self.global_config.sensor_distance_to_shocksub)
            trace.stats.segy.trace_header.sensor_axial_axis = int(self.global_config.sensor_axial_axis)
            trace.stats.segy.trace_header.sensor_tangential_axis = int(self.global_config.sensor_tangential_axis)
            trace.stats.segy.trace_header.sensor_type = int(self.global_config.sensor_type)
            trace.stats.segy.trace_header.sensor_accelerometer_type = int(self.global_config.sensor_accelerometer_type)
            trace.stats.segy.trace_header.sensor_saturation_g = int(self.global_config.sensor_saturation_g)
            trace.stats.segy.trace_header.trace_length_in_seconds = (number_of_samples-1)/self.sampling_rate

            trace.stats.segy.trace_header.drill_string_total_length = float(self.global_config.drill_string_total_length)
            trace.stats.segy.trace_header.drill_string_steel_od = float(self.global_config.drill_string_steel_od)

            trace.stats.segy.trace_header.hole_id = float(row["hole_id"])
            trace.stats.segy.trace_header.easting = row["easting"]
            trace.stats.segy.trace_header.northing = row["northing"]
            trace.stats.segy.trace_header.collar_elevation = row["collar_elevation"]
            trace.stats.segy.trace_header.depth = row["depth"]
            trace.stats.segy.trace_header.mse = row["mse"]
            trace.stats.segy.trace_header.rpm = row["rpm"]
            trace.stats.segy.trace_header.wob = row["wob"]
            trace.stats.segy.trace_header.tob = row["tob"]
            trace.stats.segy.trace_header.rop = row["rop"]
            trace.stats.segy.trace_header.air_pressure = row["air_pressure"]

            trace.stats.segy.trace_header.max_axial_acceleration = row["max_axial_acceleration"]
            trace.stats.segy.trace_header.max_tangential_acceleration = row["max_tangential_acceleration"]
            trace.stats.segy.trace_header.max_radial_acceleration = row["max_radial_acceleration"]
            trace.stats.segy.trace_header.min_axial_acceleration = row["min_axial_acceleration"]
            trace.stats.segy.trace_header.min_tangential_acceleration = row["min_tangential_acceleration"]
            trace.stats.segy.trace_header.min_radial_acceleration = row["min_radial_acceleration"]
            self.stream.append(trace)


    def generate_textual_header(self):
        #ALL THIS IS SO THAT THE TEXTUA HEADER CAN BE PROPERLY READ IN THIRD PARTY PROGRAMS.  EACH LINE HAS 80 CHARACTERS
        row = 1

        header = "C%s RECORDING_DATE: %s" % (row,self.global_config.sensor_installation_date)
        header = header.encode(encoding="ASCII")
        length = len(header)
        if length < 80:
            header = header + b' ' * (80 - length)
        row += 1

        line = "C%s COUNTRY: %s" % (row, self.global_config.country)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s COMPANY: %s" % (row, self.global_config.company)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s MINE_NAME: %s" % (row, self.global_config.mine_name)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s RECORDING_ENGINEER: %s" % (row, self.global_config.recording_engineer)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s RIG_MODEL: %s" % (row, self.global_config.rig_model)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s RIG_MANUFACTURER: %s" % (row, self.global_config.rig_manufacturer)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s RIG_ID: %s" % (row, self.global_config.rig_id)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s DRILL_TYPE: %s" % (row, self.global_config.drill_type)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s MWD_TYPE: %s" % (row, self.global_config.mwd_type)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s BIT_TYPE: %s" % (row, self.global_config.bit_type)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s BIT_MODEL: %s" % (row, self.global_config.bit_model)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s BIT_SIZE: %s in" % (row, self.global_config.bit_size)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s SENSOR_TYPE: %s" % (row, self.global_config.sensor_type)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s DIGITIZER_SERIAL_NUMBER: %s" % (row, self.global_config.digitizer_serial_number)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s SENSOR_SERIAL_NUMBER: %s" % (row, self.global_config.sensor_serial_number)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s DIGITIZER_NATIVE_SAMPLING_RATE: %s" % (row, self.global_config.sensor_ideal_sampling_rate)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s DATA_OUTPUT_SAMPLING_RATE: %s" % (row, self.global_config.output_sampling_rate)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s SENSOR_MAX_G: %s" % (row, self.global_config.sensor_saturation_g)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s SENSOR_ACCELEROMETER_DATA_TYPE: %s" % (row, self.global_config.sensor_accelerometer_type)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s COMMENTS: %s" % (row, self.global_config.comments.upper())
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
