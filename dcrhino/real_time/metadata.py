# -*- coding: utf-8 -*-
"""
Created on Wed Jul 18 18:06:36 2018
Metadata Header definition for Rhino Unit File structure
@author: Natal
"""
from __future__ import absolute_import, division, print_function
from datetime import datetime
#from dcrhino.collection.IDEtoSEGY.rhino import StandardString
import csv, os, sys
import pandas as pd
from enum import Enum
import pdb


#==============================================================================
#FUNCTIONS
#==============================================================================
def StandardString(s):
    if type(s) is str:
        s = s.replace("_"," ")
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
    else:
        raise TypeError("Argument needs to be a string")






class DataType(Enum):
    STRING = 1
    INTEGER = 2
    FLOAT = 3
    DATETIME = 4
    DATE=5
    BOOLEAN = 6




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
        'bit_size':DataType.FLOAT,
        'bit_date':DataType.DATETIME,
        'sensor_type':DataType.INTEGER,
        'sensor_serial_number':DataType.STRING,
        'sensor_accelerometer_type':DataType.INTEGER,
        'sensor_ideal_sampling_rate':DataType.INTEGER,
        'sensor_saturation_g':DataType.INTEGER,
        'sensor_true_sampling_rate':DataType.FLOAT,
        'data_processing_sampling_rate':DataType.INTEGER,
        'comments':DataType.STRING,
        'trace_length':DataType.INTEGER,
        'number_of_samples_in_this_trace':DataType.INTEGER,
        'datetime_data_recorded':DataType.DATETIME,
        'digitizer_time_of_last_sample_in_trace':DataType.DATETIME,
        'ideal_time_of_last_sample_in_trace':DataType.DATETIME,
        'dummy_hole_id':DataType.INTEGER,
        'sensor_distance_to_source':DataType.FLOAT,
        'blasthole_easting':DataType.FLOAT,
        'blasthole_northing':DataType.FLOAT,
        'blasthole_collar_elevation':DataType.FLOAT,
        'sensor_position':DataType.FLOAT,
        'sensor_axial_axis':DataType.INTEGER,
        'sensor_tangential_axis':DataType.INTEGER,
        'sensor_mount_size':DataType.INTEGER,
        'sensor_installation_location':DataType.INTEGER,
        'sensor_installation_date':DataType.DATE,
        'drill_string_total_length':DataType.FLOAT,
        'drill_string_component1':DataType.INTEGER,
        'drill_string_component2':DataType.INTEGER,
        'drill_string_component3':DataType.INTEGER,
        'drill_string_component4':DataType.INTEGER,
        'drill_string_component5':DataType.INTEGER,
        'drill_string_component6':DataType.INTEGER,
        'drill_string_component7':DataType.INTEGER,
        'drill_string_component8':DataType.INTEGER,
        'drill_string_component9':DataType.INTEGER,
        'drill_string_component10':DataType.INTEGER,
        'sensor_installation_diameter':DataType.FLOAT,
        'drill_string_steel_od':DataType.FLOAT,
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
        }



class Metadata(object):

    __slots__ = [key for key,value in METADATA_HEADER_FORMAT_KEYS.items()]

    def __init__(self,cfg):
        for key,key_type in METADATA_HEADER_FORMAT_KEYS.items():
            setattr(self,key,None)
        for item in cfg.items("INSTALLATION"):
            key = item[0]
            #pdb.set_trace()
            if item[0] in METADATA_HEADER_FORMAT_KEYS.keys():
                key_type = METADATA_HEADER_FORMAT_KEYS[key]
                if key_type is DataType.FLOAT:
                    value = cfg.getfloat("INSTALLATION",key)
                elif key_type is DataType.INTEGER:
                    value = cfg.getint("INSTALLATION",key)
                elif key_type is DataType.DATE:
                    value = datetime.strptime(cfg.get("INSTALLATION",key),"%Y-%m-%d")
                elif key_type is DataType.DATE:
                    value = datetime.strptime(cfg.get("INSTALLATION",key),"%Y-%m-%d %H:%M:%S.%f")
                elif key_type is DataType.BOOLEAN:
                    value = cfg.getboolean("INSTALLATION",key)
                else:
                    value = cfg.get("INSTALLATION",key)
                setattr(self,key,value)
            else:
                raise LookupError("The metadata value in the configuration file is not declared in the metadata class")
        self.sensor_distance_to_source = self.drill_string_total_length - self.sensor_position

        #params = pd.read_table(os.path.join(PATH,"installation.cfg"),sep="=",names=["Value"],index_col=0)
        #params=params.to_dict(orient='index')
        #for key,key_type in METADATA_HEADER_FORMAT_KEYS.items():
        #    if key in params.keys():
        #        if key_type is DataType.FLOAT:
        #            value = float(params[key]['Value'])
        #        elif key_type is DataType.INTEGER:
        #            value = int(params[key]['Value'])
        #        elif key_type is DataType.DATETIME:
        #            value = datetime.strptime(params[key]['Value'],"%Y-%m-%d")
        #        else:
        #            value = params[key]['Value']
        #        setattr(self,key,value)
        #    else:
        #        setattr(self,key,None)




    def __str__(self):
        _str=''
        for key,value in METADATA_HEADER_FORMAT_KEYS.items():
            _str += "{}:{}\n".format(key,getattr(self,key))
        return _str


    def filename(self):

        return "{}_{}".format(StandardString(str(self.datetime_data_recorded)),StandardString(self.sensor_serial_number))


    def save(self,filename):

#        outFileObj = pm.FileObject(self.)
#        outFileObj.Name = StandardString(str(self.datetime_data_recorded))
#        outFileObj.addSuffix = StandardString(self.sensor_serial_number)
#        outFileObj.changeExtension(new_extension=pm.ExtensionType.METADATA)

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


if __name__ == "__main__":

    m = Metadata()
    m.datetime_data_recorded = datetime.now()

    pdb.set_trace()

    m.save("sample_metadata.csv")

    pdb.set_trace()

    m.load("sample_metadata.csv")

    pdb.set_trace()

    print(m)
