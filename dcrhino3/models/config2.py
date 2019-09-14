#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Author: thiago
"""
import json
import numpy as np
import os
from dcrhino3.acquisition.constants import ACQUISITION_PATH
from dcrhino3.models.drill.drill_string_component import DrillStringComponent

from dcrhino3.helpers.general_helper_functions import init_logging
logger = init_logging(__name__)


def copy_config_object(old_config):
    new_config = Config()
    if old_config.acquisition_config:
        new_config.acquisition_config = True

    for key in old_config.__dict__.keys():
        setattr(new_config, key, old_config.__dict__[key])

    for key in old_config.files_keys:
        new_config.files_keys[key] = old_config.files_keys[key]

    return new_config


class Config(object):
    """
    """
    def __init__(self, acquisition_config=False, json_data=None):
        """
        Configuration file for rhino software. Assigns default constants, calculates
        other constants, and assigns a json file to be parsed for mine data.

        .. todo:: change output_sampling_rate to sampling_rate or all resampled data
        """
        self.acquisition_config = acquisition_config
        self.files_keys = dict()

        config_files_json = json.load(open(os.path.join(ACQUISITION_PATH, "acquisition_config.cfg")))
        for key in config_files_json.keys():
            self.files_keys[key] = dict()
            for config_file in config_files_json[key]:
                config_file_json = json.load(open(os.path.join(ACQUISITION_PATH, config_file)))
                self.files_keys[key][config_file] = config_file_json.keys()
                self.set_data_from_json(config_file_json)

        if not acquisition_config:
            self.clear_all_keys()

        if json_data is not None:
            self.set_data_from_json(json_data)
        return

    @property
    def sampling_rate(self):
        return float(self.output_sampling_rate)

    def duplicate_config(self):
        """
        Creates an independent copy of an instance of the object
        :return: a new copy of the object
        """
        return copy_config_object(self)

    def clear_all_keys(self):
        for key in self.pipeline_files_to_dict.keys():
            self.__dict__[key] = None
        for key in self.field_files_to_dict.keys():
            self.__dict__[key] = None

    def _config_files_to_dict(self, files_type):
        """
        will return a dictionary with all the keys that are part of the pipeline_files or the field_files.  These can
        be found in the acquisition_config.cfg"

        :param files_type: "pipeline_files" or "field_files"
        :return:a dictionary with all the key/value pairs of all the files that are part of the files_type
        """
        if files_type in self.files_keys.keys():
            pipeline_files = self.files_keys[files_type].keys()
            pipeline_json = dict()
            for pipeline_file in pipeline_files:
                for key in self.files_keys[files_type][pipeline_file]:
                    pipeline_json[key] = self.__dict__[key]
            return pipeline_json
        else:
            return None

    def keys(self):
        """
        only returns the keys that are important for the config file that is saved in the h5 files (pipeline_files)

        :return:a dictionary with the keys of the pipeline files
        """
        return self.pipeline_files_to_dict.keys()

    def __getitem__(self, item):
        return self.__dict__[item]

    @property
    def pipeline_files_to_dict(self):
        return self._config_files_to_dict("pipeline_files")

    @property
    def field_files_to_dict(self):
        return self._config_files_to_dict("field_files")

    def _field_base_path(self):
        """
        Returns:
            Path to specific field data using a standardized directory structure
        """
        return os.path.join(self.company, self.mine_name, "field_data", self.rig_id, self.digitizer_serial_number,
                            self.sensor_serial_number).lower()

    @property
    def level_0_path(self):
        """
                Returns:
                    Path from :func:`field_base_path` joined by level_0
                """
        return os.path.join(self._field_base_path(), "level_0").lower()

    # @property
    # def full_json(self):
    #     """
    #     This is to return all the keys in the dictionary and not only the ones that are going to
    #     :return:
    #     """

    @property
    def drill_string_components_list(self):
        components = list()
        for component in self.drill_string_components:
            c = DrillStringComponent(attributes_dict=component)
            components.append(c)
        return components

    @property
    def sensor_distance_to_source(self):
        # todo: ADD LOGIC HERE
        logger.warn("MISSING LOGIC FOR SENSOR DISTANCE TO SOURCE on config2")
        return

    @property
    def sensor_distance_to_shocksub(self):
        logger.warn("MISSING LOGIC FOR SENSOR DISTANCE TO SHOCKSUB on config2")
        #todo: ADD LOGIC HERE
        return

    @property
    def two_way_resonance_distance(self):
        logger.warn("MISSING LOGIC FOR two_way_resonance_distance on config2")
        # todo: ADD LOGIC HERE
        return

    def _get_channel_sensitivity(self, channel):
        return float(self.sensor_sensitivity["{}_sensitivity".format(channel)])

    @property
    def x_sensitivity(self):
        return self._get_channel_sensitivity("x")

    @property
    def y_sensitivity(self):
        return self._get_channel_sensitivity("y")

    @property
    def z_sensitivity(self):
        return self._get_channel_sensitivity("z")

    @property
    def sensitivity_list_xyz(self):
        return[self.x_sensitivity, self.y_sensitivity, self.z_sensitivity]

    def get_sensor_sensitivity_by_axis(self, axis):
        component_index = self.get_component_index(axis)
        return self.sensitivity_list_xyz[component_index]

    def component_index(self, component_id):
        """
        :func:`get_component_index`
        """
        return self.get_component_index(component_id)

    def get_component_index(self, component_id):
        """
        Returns integer, representing the index of that component in component_id.

        Parameters:
            component_id (str): 'axial', 'tangentia', or 'radial'

        Returns:
            (int): this is the index assocaited with the component label
        """

        if component_id == 'axial':
            return int(self.sensor_axial_axis) - 1
        elif component_id == 'tangential':
            return int(self.sensor_tangential_axis) - 1
        elif component_id == 'radial':
            return 5 - int(self.sensor_axial_axis) - int(self.sensor_tangential_axis) #Depending on the physical
            # installation, radial is not always 2
        else:
            pass

    @property
    def components_to_process(self):
        """
        D

        Returns:
            list of strings of components to collect/process
        """
        if isinstance(self.components_to_collect, str):
            return self.components_to_collect.split(',')
        else:
            return self.components_to_collect

    @property
    def dt(self):
        return 1./self.output_sampling_rate

    @property
    def num_taps_in_decon_filter(self):
        """
        Save number of coefficients in the deconvolution filter, calculated with
        :func:`_get_num_decon_taps`

        .. todo:: confirm type is int returned by get_num_decon_taps()
        """
        deconvolution_filter_duration = float(self.deconvolution_filter_duration)
        number_of_taps_in_decon_filter = self._get_num_decon_taps(deconvolution_filter_duration, self.sampling_rate)
        return number_of_taps_in_decon_filter

    @property
    def samples_per_trace(self):
        """
        D

        Returns:
            (int): number of samples per trace
        """
#        if self.trace_length_in_seconds is None:
#            logger.warning("trace_duration is None - Fix this condition in Global Config")
#            logger.critical("trace duration should be a float")
#            #self.trace_length_in_seconds
        return int(float(self.trace_length_in_seconds) * float(self.output_sampling_rate))

    @property
    def n_spiking_decon_filter_taps(self):
        """
        D

        Returns:
            (int): number of *spiking* decon filter coefficients (a.k.a. the order)
        """
        return int(self.sampling_rate * self.spiking_decon_filter_duration)

    def set_data_from_json(self, data):
        if not isinstance(data, dict):
            data = json.loads(data)
        for _key in data.keys():
            self.__dict__[_key] = data[_key]

    def json_string(self):
        """
        Store current variables in json string.

        Returns:
            (json): JSON string of module variables
        """
        json_str = json.dumps(vars(self), indent=4)
        return json_str

    def map_component_to_axis(self, component):
        axis = ["x", "y", "z"]
        return axis[self.get_component_index(component)]

    @property
    def pipeline_json_string(self):
        json_string = json.dumps(self.pipeline_files_to_dict, indent=4)
        return json_string

    @property
    def field_json_string(self):
        json_string = json.dumps(self.field_files_to_dict, indent=4)
        return json_string

    def export_config_for_h5_files(self, path):
        with open(path, 'w') as fp:
            json.dump(self.pipeline_files_to_dict, fp)
        return True

    def load_from_config_for_h5_files(self, path):
        with open(path, 'r') as fp:
            data = json.load(fp)
        config_files_json = json.load(open(os.path.join(ACQUISITION_PATH, "acquisition_config.cfg")))
        self.files_keys["pipeline_files"] = dict()
        for config_file in config_files_json["pipeline_files"]:
            config_file_json = json.load(open(os.path.join(ACQUISITION_PATH, config_file)))
            self.files_keys["pipeline_files"][config_file] = config_file_json.keys()
            self.set_data_from_json(data)

    def _get_num_decon_taps(self, deconvolution_filter_duration, sampling_rate):
        """
        Get number of coefficients needed for the filter.

        Returns:
            (int): decon filter length taps
        """
        dt = 1. / sampling_rate
        decon_filter_length_taps = int(deconvolution_filter_duration / dt)
        if np.remainder(decon_filter_length_taps, 2) == 1:
            decon_filter_length_taps += 1
        return decon_filter_length_taps

    @property
    def n_samples_trimmed_trace(self):
        """
        Returns:
            (int): the total number of samples in the trimmed_trace, calculated
                by sampling_rate and time ecnompassed.
        """
        sampling_rate = float(self.output_sampling_rate)
        n_samples_back = int(sampling_rate * np.abs(self.min_lag_trimmed_trace))
        n_samples_fwd = int(sampling_rate * self.max_lag_trimmed_trace)
        return int(n_samples_fwd + n_samples_back)

    @property
    def trimmed_trace_duration(self):
        """
        Re-assign duration to reflect trimmed trace.

        Returns:
            (float): duration of trimmed trace
        """
        duration = float(self.max_lag_trimmed_trace) - float(self.min_lag_trimmed_trace)
        return duration




if __name__ == "__main__":
    try:
        c = Config(acquisition_config=True)
        c_list = c.drill_string_components_list
        print("done")
    except:
        pass
