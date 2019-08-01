#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Author: thiago
"""
import json
import numpy as np
import os
from dcrhino3.acquisition.constants import ACQUISITION_PATH


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
        if acquisition_config:
            config_files_json = json.load(open(os.path.join(ACQUISITION_PATH, "acquisition_config.cfg")))
            for key in config_files_json.keys():
                self.files_keys[key] = dict()
                for config_file in config_files_json[key]:
                    config_file_json = json.load(open(os.path.join(ACQUISITION_PATH, config_file)))
                    self.files_keys[key][config_file] = config_file_json.keys()
                    self.set_data_from_json(config_file_json)
        if json_data is not None:
            self.set_data_from_json(json_data)
        return

    def _config_files_to_dict(self, files_type):
        if files_type in self.files_keys[files_type].keys():
            pipeline_files = self.files_keys[files_type].keys()
            pipeline_json = dict()
            for pipeline_file in pipeline_files:
                for key in self.files_keys[files_type][pipeline_file]:
                    pipeline_json[key] = self.__dict__[key]
            return pipeline_json
        else:
            return None

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
        return os.path.join(self.field_base_path(), "level_0").lower()

    @property
    def sensor_distance_to_source(self):
        return

    @property
    def sensor_distance_to_shocksub(self):
        return

    @property
    def two_way_resonance_distance(self):
        return

    def _get_channel_sensitivity(self, channel):
        return self.sensor_sensitivity["{}_sensitivity".format(channel)]

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
            return self.sensor_axial_axis - 1
        elif component_id == 'tangential':
            return self.sensor_tangential_axis - 1
        elif component_id == 'radial':
            return 5 - self.sensor_axial_axis - self.sensor_tangential_axis #Depending on the physical installation, radial is not always 2
        else:
            pass

    @property
    def components_to_process(self):
        """
        D

        Returns:
            list of strings of components to collect/process
        """
        return self.components_to_collect.split(',')

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
        return int(self.trace_length_in_seconds * self.output_sampling_rate)

    @property
    def n_spiking_decon_filter_taps(self):
        """
        D

        Returns:
            (int): number of *spiking* decon filter coefficients (a.k.a. the order)
        """
        return int(self.sampling_rate * self.spiking_decon_filter_duration)

    def set_data_from_json(self, data):
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
            json.dump(self.pipeline_json_string, fp)
        return

    def load_from_config_for_h5_files(self, path):
        with open(path, 'r') as fp:
            data = json.load(self.pipeline_json_string, fp)
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
        duration = self.max_lag_trimmed_trace - self.min_lag_trimmed_trace
        return duration

    @property
    def installed_resonant_length(self):
        """
        this is the distance from the bottom of the shocksub to the bottom of the bit
        """
        return self.sensor_distance_to_shocksub + self.sensor_distance_to_source


if __name__ == "__main__":
    try:
        c = Config(acquisition_config=True)
        print("done")
    except:
        pass