# -*- coding: utf-8 -*-
"""
Created on Wed Jul 18 18:06:36 2018
Metadata Header definition for Rhino Unit File structure
@author: Natal
"""
from __future__ import absolute_import, division, print_function
from datetime import datetime
import csv, os, sys
import pandas as pd
from enum import Enum
import pdb
import sys


#==============================================================================
#FUNCTIONS
#==============================================================================
def StandardString(s):
    #if type(s) is str:
    s = str(s).replace("_"," ")
    components = s.split(" ")
    clean_components=[]
    string=""
    for ch in components:
        word = ''.join(e for e in ch if (e.isalnum() or (e in ['&','.'])))
        #if(word.isalnum()):
        clean_components.append(word)
    for i,c in enumerate(clean_components):
        string += c
        if i<len(clean_components)-1:
            string+= "_"
    return string.upper()
    # else:
    #     raise TypeError("Argument needs to be a string")

def convert_to_meters(value,units):
    for m in range(4,6):
        if units == m:
            value = value / (10**(m-2))
    if units == 1:
        value = value * 0.3048
    elif units == 2:
        value =  value * 0.0254
    return round(value,2)

class Measurement():
    def __init__(self,tuple):
        (value,units) = tuple
        self._value = float(value)
        self._units = int(units)

    def __str__(self):
        return "{},{}".format(self._value,self._units)

    def value_in_meters(self):
        # for m in range(4,6):
        #     if self._units == m:
        #         return self._value / (10**(m-2))
        # if self._units == 1:
        #     return self._value * 0.3048
        # elif self._units == 2:
        #     return self._value * 0.0254
        # return self._value
        return convert_to_meters(self._value,self._units)




class Drill_String_Component():
    def __init__(self,tuple):
        (type,status,length,length_units,od,od_units) = tuple
        self._type = int(type)
        self._status =int(status)
        self._length = float(length)
        self._length_units = int(length_units)
        self._od = float(od)
        self._od_units = int(od_units)

    def __str__(self):
        value = "{},{},{},{},{},{}".format(self._type,self._status,self._length,self._length_units,self._od,self._od_units)
        return value

    @property
    def type(self):
        return drill_string_component_types[self._type-1]

    @property
    def status(self):
        return drill_string_component_status_options[self._status-1]

    @property
    def length_in_meters(self):
        # value = None
        # for m in range(2,5):
        #     if self._length_units == self.measurement_units_options[m]:
        #         value =  self._length / (10**(m-2))
        # if self._length_units == self.measurement_units_options[0]:
        #         value = self._length * 0.3048
        # elif self._length_units == self.measurement_units_options[1]:
        #     value =  self._length * 0.0254
        #
        # if value is not None:
        #     value = round(value,2)
        # return value
        return convert_to_meters(self._length,self._length_units)

    #@property
    #def drill_string_compnent_length_untis(self):
    #    return measurement_units_options[self._length_units-1]

    @property
    def od_in_mm(self):
        for m in range(2,5):
            if self._length_units == self.measurement_units_options[m]:
                return self._length * (10**(m-2))
        if self._length_units == self.measurement_units_options[0]:
            return self._length * 304.8
        elif self._length_units == self.measurement_units_options[1]:
            return self._length * 25.4
        return None

    #@property
    #def drill_string_compnent_od_untis(self):
    #    return measurement_units_options[self._od_units-1]



class DataType(Enum):
    STRING = 1
    INTEGER = 2
    FLOAT = 3
    DATETIME = 4
    DATE=5
    BOOLEAN = 6
    MEASUREMENT = 7
    DS_COMPONENT = 8



METADATA_HEADER_FORMAT_KEYS = {
        'country':DataType.STRING,
        'company':DataType.STRING,
        'mine_name':DataType.STRING,
        'recording_engineer':DataType.STRING,
        'rig_model':DataType.STRING,
        'rig_manufacturer':DataType.STRING,
        'rig_id':DataType.STRING,
        'drill_type':DataType.INTEGER,
        'mwd_type':DataType.INTEGER,
        'bit_type':DataType.INTEGER,
        'bit_model':DataType.STRING,
        'bit_size':DataType.MEASUREMENT,
        'bit_date':DataType.DATE,
        'sensor_type':DataType.INTEGER,
        'digitizer_serial_number':DataType.STRING,
        'sensor_serial_number':DataType.STRING,
        'sensor_accelerometer_type':DataType.INTEGER,
        'sensor_ideal_sampling_rate':DataType.INTEGER,
        'sensor_saturation_g':DataType.INTEGER,
        'sensor_true_sampling_rate':DataType.FLOAT,
        'output_sampling_rate':DataType.INTEGER,
        'comments':DataType.STRING,
        'trace_length':DataType.INTEGER,
        'number_of_samples_in_this_trace':DataType.INTEGER,
        'datetime_data_recorded':DataType.DATETIME,
        'digitizer_time_of_last_sample_in_trace':DataType.DATETIME,
        'ideal_time_of_last_sample_in_trace':DataType.DATETIME,
        'dummy_hole_id':DataType.INTEGER,
        'sensor_distance_to_source':DataType.FLOAT,
        'sensor_distance_to_shocksub':DataType.FLOAT,
        'blasthole_easting':DataType.FLOAT,
        'blasthole_northing':DataType.FLOAT,
        'blasthole_collar_elevation':DataType.FLOAT,
        'sensor_position':DataType.MEASUREMENT,
        'sensor_axial_axis':DataType.INTEGER,
        'sensor_tangential_axis':DataType.INTEGER,
        'sensor_mount_size':DataType.INTEGER,
        'sensor_installation_location':DataType.INTEGER,
        'sensor_installation_date':DataType.DATE,
        'drill_string_total_length':DataType.FLOAT,
        'drill_string_component1':DataType.DS_COMPONENT,
        'drill_string_component2':DataType.DS_COMPONENT,
        'drill_string_component3':DataType.DS_COMPONENT,
        'drill_string_component4':DataType.DS_COMPONENT,
        'drill_string_component5':DataType.DS_COMPONENT,
        'drill_string_component6':DataType.DS_COMPONENT,
        'drill_string_component7':DataType.DS_COMPONENT,
        'drill_string_component8':DataType.DS_COMPONENT,
        'drill_string_component9':DataType.DS_COMPONENT,
        'drill_string_component10':DataType.DS_COMPONENT,
        #'sensor_installation_diameter':DataType.FLOAT,
        'drill_string_steel_od':DataType.MEASUREMENT,
        'mwd_hole_id':DataType.INTEGER,
        'sample_interval_duration':DataType.FLOAT,
        'gps_latitude':DataType.FLOAT,
        'gps_longitude':DataType.FLOAT,
        'gps_elevation':DataType.FLOAT,
        'gps_timestamp':DataType.DATETIME,
        'deconvolution_filter_duration':DataType.FLOAT,
        'min_lag_trimmed_trace':DataType.FLOAT,
        'max_lag_trimmed_trace':DataType.FLOAT,
        'trapezoidal_bpf_corner_1':DataType.FLOAT,
        'trapezoidal_bpf_corner_2':DataType.FLOAT,
        'trapezoidal_bpf_corner_3':DataType.FLOAT,
        'trapezoidal_bpf_corner_4':DataType.FLOAT,
        'trapezoidal_bpf_duration':DataType.FLOAT,
        'trace_length_in_seconds':DataType.FLOAT,
        'components_to_collect':DataType.STRING,
        'channels_per_sensor':DataType.INTEGER,
        'packet_length':DataType.INTEGER,
        'baud_rate':DataType.INTEGER,
        'window_widths':DataType.STRING,
        'binning_interval_in_cm':DataType.FLOAT,
        'accelerometer_max_voltage':DataType.FLOAT,
        'peak_amplitude_axial_y_limit':DataType.STRING,
        'rc_axial_y_limit':DataType.STRING,
        'peak_amplitude_tangential_y_limit':DataType.STRING,
        'rc_tangential_y_limit':DataType.STRING,
        'plot_a_vel':DataType.BOOLEAN,
        'plot_t_vel':DataType.BOOLEAN
        }



class Metadata(object):

    __slots__ = [key for key,value in METADATA_HEADER_FORMAT_KEYS.items()]

    def __init__(self,cfg):
        #pdb.set_trace()
        excluded_sections = ["RUNTIME", "DATAUNIT", "DATA_TRANSMISSION", "PLAYBACK", "DB"]
        sections_to_iterate = [x for x in cfg.sections() if x not in excluded_sections]
        print(sections_to_iterate)

        shocksub_length = 0
        for key,key_type in METADATA_HEADER_FORMAT_KEYS.items():
            setattr(self,key,None)
        value = cfg.getint("COLLECTION","output_sampling_rate")
        setattr(self,"output_sampling_rate",value)
        for section in sections_to_iterate:
            for item in cfg.items(section):
                key = item[0]
                #pdb.set_trace()
                if key in METADATA_HEADER_FORMAT_KEYS.keys():
                    key_type = METADATA_HEADER_FORMAT_KEYS[key]
                    if key_type is DataType.FLOAT:
                        value = cfg.getfloat(section,key)
                    elif key_type is DataType.INTEGER:
                        value = cfg.getint(section,key)
                    elif key_type is DataType.DATE:
                        value = datetime.strptime(cfg.get(section,key),"%Y-%m-%d")
                    elif key_type is DataType.DATETIME:
                        value = datetime.strptime(cfg.get(section,key),"%Y-%m-%d %H:%M:%S.%f")
                    elif key_type is DataType.BOOLEAN:
                        value = cfg.getboolean(section,key)
                    elif key_type is DataType.MEASUREMENT:
                        data = cfg.get(section,key).split(",")
                        m = Measurement(data)
                        value = m.value_in_meters()
                    elif key_type is DataType.DS_COMPONENT:
                        value =  cfg.get(section,key)
                        component = Drill_String_Component(value.split(","))
                        if component._type == 5:
                            # pdb.set_trace()
                            if shocksub_length == 0:
                                shocksub_length = component.length_in_meters
                            else:
                                raise ValueError("There are more than one shocksubs declared")
                    else:
                        value = cfg.get(section,key)
                    #print(key,value)
                    setattr(self,key,value)
                else:
                    pass
                    raise LookupError("The metadata value in the configuration file is not declared in the metadata class" , item )
        self.sensor_distance_to_source = round(self.drill_string_total_length - self.sensor_position,2)
        self.sensor_distance_to_shocksub = round(self.sensor_position - shocksub_length,2)
        self.accelerometer_max_voltage = cfg.getfloat("PLAYBACK","accelerometer_max_voltage")


    def __str__(self):
        _str=''
        for key,value in METADATA_HEADER_FORMAT_KEYS.items():
            _str += "{}:{}\n".format(key,getattr(self,key))
        return _str


    def filename(self):
        return "{}_{}".format(StandardString(str(self.datetime_data_recorded)),StandardString(self.sensor_serial_number))


    def field_base_path(self):
        return os.path.join(self.company,self.mine_name,"field_data",self.rig_id,self.digitizer_serial_number,self.sensor_serial_number).lower()

    def level_0_path(self):
        return os.path.join(self.field_base_path(),"level_0").lower()

    def level_1_path(self):
        if self.sensor_accelerometer_type == 8:
            sensor_type = "piezo"
        elif self.sensor_accelerometer_type == 32:
            sensor_type = "mems"
        else:
            sensor_type = "need_to_declare_a_new_sensor_type"
        return os.path.join(self.field_base_path(),"level_1",sensor_type).lower()



    def save(self,filename):
        _str=''
        metafile = open(filename, 'w')
        for key,value in METADATA_HEADER_FORMAT_KEYS.items():
            _str += "{}={}\n".format(key,getattr(self,key))
        metafile.write(_str)
        metafile.close()

    def load(self,path):
        with  open(path, 'r') as metafile:
            meta_data = csv.reader(metafile)
            for row in meta_data:
                key,value = self.format_dtype(row)
                setattr(self,key,value)

    def format_dtype(self,row):
        attribute_name = row[0]
        dtype = METADATA_HEADER_FORMAT_KEYS[attribute_name]
        value = row[1]
        if value == 'None':
            value = None
        else:
            if dtype is DataType.DATETIME:
                value = datetime.strptime(value,"%Y-%m-%d %H:%M:%S.%f")
            elif dtype is DataType.DATE:
                value = datetime.strptime(value,"%Y-%m-%d")
            elif dtype is DataType.FLOAT:
                value = float(value)
            elif dtype is DataType.INTEGER:
                value = int(value)
        return attribute_name,value

    def metadata_to_dictionary(self):
        dict = {}
        dict["drill_id"] = self.rig_id
        dict["digitizer_id"] = self.sensor_serial_number
        if self.sensor_axial_axis == 1:
            dict["orientation"] = "normal"
        elif self.sensor_axial_axis == 2:
            dict["orientation"] = "rotate_90"
        else:
            dict["orientation"] = "z_axis"
        dict["sampling_rate"] = self.output_sampling_rate
        dict["sensor_distance_to_source_in_meters"] = self.sensor_distance_to_source
        dict["sensor_distance_to_shocksub"] = self.sensor_distance_to_shocksub
        if self.sensor_accelerometer_type == 8:
            dict["accelerometer_type"] = "piezo"
        else:
            dict["accelerometer_type"] = "mems"
        if self.sensor_type == 1:
            dict["sensor_type"] = "ssx"
        else:
            dict["sensor_type"] = "rhino"
        return dict






if __name__ == "__main__":

    m = Metadata()
    m.datetime_data_recorded = datetime.now()

    pdb.set_trace()

    m.save("sample_metadata.csv")

    pdb.set_trace()

    m.load("sample_metadata.csv")

    pdb.set_trace()

    print(m)
