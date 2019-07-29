# -*- coding: utf-8 -*-
"""
Created on Wed Jul 18 18:06:36 2018
Metadata Header definition for Rhino Unit File structure
Author: Natal
"""
from __future__ import absolute_import, division, print_function
from datetime import datetime
import csv, os, sys
import pandas as pd
from enum import Enum
import pdb
import sys
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.helpers.general_helper_functions import add_inverse_dictionary
from dcrhino3.helpers.general_helper_functions import StandardString
from dcrhino3.models.drill.drill_helper_functions import LengthMeasurement as Measurement


logger = init_logging(__name__)
#==============================================================================
#FUNCTIONS
#==============================================================================






class DataType(Enum):
    STRING = 1
    INTEGER = 2
    FLOAT = 3
    DATETIME = 4
    DATE=5
    BOOLEAN = 6
    MEASUREMENT = 7
    DS_COMPONENT = 8
    DICTIONARY = 9



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
        #'sensor_true_sampling_rate':DataType.FLOAT,
        'output_sampling_rate':DataType.INTEGER,
        'comments':DataType.STRING,
        #'trace_length':DataType.INTEGER,
        #'number_of_samples_in_this_trace':DataType.INTEGER,
        #'datetime_data_recorded':DataType.DATETIME,
        #'digitizer_time_of_last_sample_in_trace':DataType.DATETIME,
        #'ideal_time_of_last_sample_in_trace':DataType.DATETIME,
        #'dummy_hole_id':DataType.INTEGER,
        'sensor_distance_to_source':DataType.FLOAT,
        'sensor_distance_to_shocksub':DataType.FLOAT,
        #'blasthole_easting':DataType.FLOAT,
        # 'blasthole_northing':DataType.FLOAT,
        # 'blasthole_collar_elevation':DataType.FLOAT,
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
        #'mwd_hole_id':DataType.INTEGER,
        'sample_interval_duration':DataType.FLOAT,
        # 'gps_latitude':DataType.FLOAT,
        # 'gps_longitude':DataType.FLOAT,
        # 'gps_elevation':DataType.FLOAT,
        # 'gps_timestamp':DataType.DATETIME,
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
        'axial_vel_delay_y_limit':DataType.STRING,
        'peak_amplitude_tangential_y_limit':DataType.STRING,
        'rc_tangential_y_limit':DataType.STRING,
        'tangential_vel_delay_y_limit':DataType.STRING,
        'peak_amplitude_radial_y_limit':DataType.STRING,
        'plot_a_vel':DataType.BOOLEAN,
        'plot_t_vel':DataType.BOOLEAN,
        'axial_amp':DataType.BOOLEAN,
        'axial_rc':DataType.BOOLEAN,
        'noise_threshold':DataType.BOOLEAN,
        'tangential_amp':DataType.BOOLEAN,
        'tangential_rc':DataType.BOOLEAN,
        'axial_vel_delay_y_limit':DataType.STRING,
        'tangential_vel_delay_y_limit':DataType.STRING,
        'peak_amplitude_radial_y_limit':DataType.STRING,
        'radial_amp':DataType.BOOLEAN,
        #'mult_pos_axial':DataType.FLOAT,
        #'mult_pos_tangential':DataType.FLOAT,
        'mult_pos_win':DataType.FLOAT,
        'mult_neg_win':DataType.FLOAT,
        'rhino_version':DataType.FLOAT,
        'segy_output_step':DataType.STRING,
        'data_message_identifier':DataType.STRING,
        'info_message_identifier':DataType.STRING,
        'auto_correlation_trace_duration':DataType.FLOAT,
        'battery_max_voltage':DataType.FLOAT,
        'battery_min_voltage':DataType.FLOAT,
        'sensor_sensitivity':DataType.DICTIONARY,
        'auto_correlation_trace_duration':DataType.FLOAT,
        'two_way_resonance_distance': DataType.FLOAT
        }



class Metadata(object):
    """
    """
    __slots__ = [key for key,value in METADATA_HEADER_FORMAT_KEYS.items()]

    def __init__(self,cfg):
        excluded_sections = ["RUNTIME", "DATAUNIT", "DATA_TRANSMISSION", "PLAYBACK", "DB","SYSTEM_HEALTH_PLOTS"]
        sections_to_iterate = [x for x in cfg.sections() if x not in excluded_sections]
    #    print(sections_to_iterate)

        shocksub_length = 0
        # for key,key_type in METADATA_HEADER_FORMAT_KEYS.items():
        #     setattr(self,key,None)

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
                    raise LookupError("The metadata value in the configuration file is not declared in the metadata class" , item )
        self.sensor_distance_to_source = round(self.drill_string_total_length - self.sensor_position,2)
        self.sensor_distance_to_shocksub = round(self.sensor_position - shocksub_length,2)
        self.two_way_resonance_distance = round(self.sensor_distance_to_shocksub + self.sensor_distance_to_source, 2)
        self.accelerometer_max_voltage = cfg.getfloat("PLAYBACK","accelerometer_max_voltage")
        self.sensor_sensitivity = self.get_sensitivities_dict(cfg)
        self.sample_interval_duration = 1./self.sensor_ideal_sampling_rate




    def get_sensitivities_dict(self,cfg):
        """
        Get sensitivities dictionary for axial, tangential, and radial components.

        Parameters:
            cfg (dataframe): to retrieve sensitivity data from

        Returns:
            (dict): dictionary with keys component_id (str) and values for respective
                sensitivities. All component sensitivities are the same unless sensor_type = 2
        """
        output_dict = dict()
        axial_index = self.sensor_axial_axis - 1
        tangential_index = self.sensor_tangential_axis - 1
        radial_index = 3 - axial_index - tangential_index
        if self.sensor_type == 2:
            sensitivities = [cfg.getfloat("PLAYBACK","x_sensitivity"),
                            cfg.getfloat("PLAYBACK","y_sensitivity"),
                            cfg.getfloat("PLAYBACK","z_sensitivity")]
        else:
            sensitivities = [cfg.getfloat("PLAYBACK","ide_multiplier"),
                            cfg.getfloat("PLAYBACK","ide_multiplier"),
                            cfg.getfloat("PLAYBACK","ide_multiplier")]
        output_dict["axial"] = sensitivities[axial_index]
        output_dict["tangential"] = sensitivities[axial_index]
        output_dict["radial"] = sensitivities[radial_index]
        return output_dict



    def __str__(self):
        _str=''
        for key,value in METADATA_HEADER_FORMAT_KEYS.items():
            _str += "{}:{}\n".format(key,getattr(self,key))
        return _str


    def filename(self):
        """
        Returns:
            Unique filename based on date, time, and sensor id number
        """
        return "{}_{}".format(StandardString(str(self.datetime_data_recorded)),StandardString(self.sensor_serial_number))


    def field_base_path(self):
        """
        Returns:
            Path to specific field data using a standardized directory structure
        """
        return os.path.join(self.company,self.mine_name,"field_data",self.rig_id,self.digitizer_serial_number,self.sensor_serial_number).lower()

    def level_0_path(self):
        """
        Returns:
            Path from :func:`field_base_path` joined by level_0
        """
        return os.path.join(self.field_base_path(),"level_0").lower()

    def level_1_path(self):
        """
        Distinguishes between piezo and mems sensors in path.

        Returns:
            Path from :func:`field_base_path` joined by level_1 and sensor type
        """
        if self.sensor_accelerometer_type == 8:
            sensor_type = "piezo"
        elif self.sensor_accelerometer_type == 32:
            sensor_type = "mems"
        else:
            sensor_type = "need_to_declare_a_new_sensor_type"
        return os.path.join(self.field_base_path(),"level_1",sensor_type).lower()



    def save(self,filename):
        """
        Saves metadata to a file.

        Parameters:
            filename (str): file to be saved
        """
        _str=''
        metafile = open(filename, 'w')
        for key,value in METADATA_HEADER_FORMAT_KEYS.items():
            _str += "{}={}\n".format(key,getattr(self,key))
        metafile.write(_str)
        metafile.close()

    def load(self,path):
        """
        Loads csv metafile. Formats using :func:`format_dtype`

        Parameters:
            path (str): path to csv metafile
        """
        with  open(path, 'r') as metafile:
            meta_data = csv.reader(metafile)
            for row in meta_data:
                key,value = self.format_dtype(row)
                setattr(self,key,value)

    def format_dtype(self,row):
        """
        Standardized metadata format and variable type.

        Parameters:
            row: list with attribute name,value

        Returns:
            atrribute_name,value formatted
        """
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
        """
        Creates dictionary of metadata.

        Returns:
            (dict): Metadata with the following keys:

                + drill_id
                + digitizer_id
                + orientation
                + sampling_rate
                + sensor_distance_to_source_in_meters
                + sensor_distance_to_shocksub
                + accelerometer_type
                + sensor_type
        """
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
