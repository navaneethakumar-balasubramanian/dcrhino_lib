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
        if acquisition_config:
            config_files_json = json.load(os.path.join(ACQUISITION_PATH, "acquisition_config.cfg"))
            for config_file in config_files_json["files"]:
                config_file_json = json.load(os.path.join(ACQUISITION_PATH, config_file))
                self.set_data_from_json(config_file_json)
        if json_data is not None:
            self.set_data_from_json(json_data)
        return

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
            #logger.critical("unknown componet requested {} DNE".format(component_id))

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
        return 1./self.sampling_rate

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

    def _get_num_decon_taps(self,deconvolution_filter_duration,sampling_rate):
        """
        Get number of coefficients needed for the filter.

        Returns:
            (int): decon filter length taps
        """
        dt = 1. / sampling_rate
        decon_filter_length_taps = int(deconvolution_filter_duration / dt)
        if np.remainder(decon_filter_length_taps, 2)==1:
            decon_filter_length_taps+=1
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
        #duration = np.abs(self.max_lag_trimmed_trace) + np.abs(self.min_lag_trimmed_trace)
        return duration

    @property
    def installed_resonant_length(self):
        """
        this is the distance from the bottom of the shocksub to the bottom of the bit
        """
        return self.sensor_distance_to_shocksub + self.sensor_distance_to_source
