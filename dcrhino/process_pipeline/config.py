#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Sep 27 21:14:10 2018

@author: thiago
"""
import numpy as np
import pdb


class Config( object ):
    def __init__(self, metadata = None, env_config_parser=None, config_parser = None):
        """
        @TODO: change output_sampling_rate to sampling_rate or all resampled data
        """
        # DEFAULT VALUES
        self.mine_name = ''
        self.sensor_serial_number = ''
        self.rig_id = ''

        self.base_output_path = 'output_data'
        self.accelerometer_max_voltage = 0
        self.output_sampling_rate = 0
        self.trace_length = 0
        self.deconvolution_filter_duration = None
        self.trapezoidal_bpf_corner_1 = 0.0
        self.trapezoidal_bpf_corner_2 = 0.0
        self.trapezoidal_bpf_corner_3 = 0.0
        self.trapezoidal_bpf_corner_4 = 0.0
        self.trapezoidal_bpf_duration = 0.0


        self.min_lag_trimmed_trace = 0.0
        self.max_lag_trimmed_trace = 0.0
        self.sensor_axial_axis = 1
        self.sensor_tangential_axis = 2

        self.ACOUSTIC_VELOCITY = 4755.0
        self.SHEAR_VELOCITY = 2654.0
        self.primary_window_halfwidth_ms = 2.0
        self.multiple_window_search_width_ms = 3.126
        self.sensor_distance_to_source = np.nan
        #self.n_samples = 640.0
        self.trace_length_in_seconds = 1.0
        #<adding for despike decon>
        self.start_ms_despike_decon = 5.0
        self.end_ms_despike_decon = 70.#190.0#70.0
        self.add_noise_percent = 200.0#150.0
        #Spiking Decon (10 ms operator, 5% white noise, design window 110-170 ms)
        self.spiking_decon_filter_duration = 0.010    #10ms; parameterize in terms of trace length


        if metadata is not None:
            self.set_metadata(metadata)

        if env_config_parser is not None:
            self.set_config_parser(env_config_parser)

        if config_parser is not None:
            self.set_config_parser(config_parser)
        return

    def get_component_index(self, component_id):
        """
        """
        if component_id == 'axial':
            return self.sensor_axial_axis - 1
        elif component_id == 'tangential':
            return self.sensor_tangential_axis - 1
        elif component_id == 'radial':
            return 2
        else:
            print("unknown componet requested {} DNE".format(component_id))


    @property
    def sampling_rate(self):
        return float(self.output_sampling_rate)

    @property
    def sampling_rate(self):
        return float(self.output_sampling_rate)

    @property
    def dt(self):
        return 1./self.sampling_rate


    @property
    def num_taps_in_decon_filter(self):
        """
        TODO: confirm type is int returned by get_num_decon_taps()
        """
        deconvolution_filter_duration = float(self.deconvolution_filter_duration)
        number_of_taps_in_decon_filter = self._get_num_decon_taps(deconvolution_filter_duration, self.sampling_rate)
        return number_of_taps_in_decon_filter

    @property
    def n_spiking_decon_filter_taps(self):
        return int(self.sampling_rate * self.spiking_decon_filter_duration)

    @property
    def ideal_timestamps(self):
        return np.arange(0,self.output_sampling_rate*self.trace_length_in_seconds)*(1.0/self.output_sampling_rate)

    def set_data_from_json(self,data):
        for _key in data.keys():
            self.__dict__[_key] = data[_key]


    def _get_num_decon_taps(self,deconvolution_filter_duration,sampling_rate):
        dt = 1. / sampling_rate
        decon_filter_length_taps = int(deconvolution_filter_duration / dt)
        if np.remainder(decon_filter_length_taps, 2)==1:
            decon_filter_length_taps+=1
        return decon_filter_length_taps

    def set_metadata( self, metadata ):
        self.rig_id = str(metadata.rig_id)
        self.mine_name = str(metadata.mine_name)
        self.sensor_serial_number = str(metadata.sensor_serial_number)
        self.sensor_distance_to_source = metadata.sensor_distance_to_source
        self.sensor_axial_axis =int(metadata.sensor_axial_axis)
        self.sensor_tangential_axis = int(metadata.sensor_tangential_axis)
        self.output_sampling_rate = int(metadata.output_sampling_rate)
        self.deconvolution_filter_duration = float(metadata.deconvolution_filter_duration)
        self.trapezoidal_bpf_corner_1 = float(metadata.trapezoidal_bpf_corner_1)
        self.trapezoidal_bpf_corner_2 = float(metadata.trapezoidal_bpf_corner_2)
        self.trapezoidal_bpf_corner_3 = float(metadata.trapezoidal_bpf_corner_3)
        self.trapezoidal_bpf_corner_4 = float(metadata.trapezoidal_bpf_corner_4)
        self.trapezoidal_bpf_duration = float(metadata.trapezoidal_bpf_duration)
        self.min_lag_trimmed_trace = float(metadata.min_lag_trimmed_trace)
        self.max_lag_trimmed_trace = float(metadata.max_lag_trimmed_trace)
        self.trace_length_in_seconds = float(metadata.trace_length_in_seconds)

    @property
    def n_samples_trimmed_trace(self):
        sampling_rate = float(self.output_sampling_rate)
        n_samples_back = int(sampling_rate * np.abs(self.min_lag_trimmed_trace))
        n_samples_fwd = int(sampling_rate * self.max_lag_trimmed_trace)
        return int(n_samples_fwd + n_samples_back)

    def set_config_parser( self, config_parser ):
        for section in config_parser.sections():
            for option in config_parser.options(section):
                var = getattr(self,option)
                if isinstance( var, int ):
                    setattr(self,option,config_parser.getint(section,option))
                if isinstance( var, float ):
                    setattr(self,option,config_parser.getfloat(section,option))
                if isinstance( var, str ):
                    setattr(self,option,config_parser.get(section,option))
