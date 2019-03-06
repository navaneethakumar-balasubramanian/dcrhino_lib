#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
@author: thiago
"""
import json
import numpy as np
import pdb


from dcrhino3.models.metadata import METADATA_HEADER_FORMAT_KEYS, DataType



class Config( object ):
    def __init__(self, metadata = None, env_config_parser=None, config_parser = None):
        """
        @TODO: change output_sampling_rate to sampling_rate or all resampled data
        """
        # DEFAULT VALUES
        self.mine_name = ''
        self.sensor_serial_number = ''
        self.rig_id = ''
        self.client_name = ''

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
        self.binning_interval_in_cm = 5.0

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
        # Added by SJ, to incorporate new qc plots"
        self.sensor_saturation_g=" "
        self.sensor_distance_to_shocksub = " "
        self.sensor_serial_number = " "
        self.drill_type = " "
        self.bit_size = " "
        self.bit_type = " "
        self.bit_model = " "
        self.drill_string_total_length = " "
        self.sensor_installation_location = " "

        #QC PLOT PARAMS
        self.peak_amplitude_axial_y_limit=0,1.5
        self.rc_axial_y_limit=0,1.0
        self.ax_vel_delay_y_limit = 60,250
        self.peak_amplitude_tangential_y_limit=0,1.5
        self.rc_tangential_y_limit=0,1.5
        self.plot_a_vel=True
        self.plot_t_vel=True
        self.axial_amp=True
        self.axial_RC=True
        self.axial_vel_del=True
        self.noise_threshold=True
        self.tangential_amp=True
        self.tangential_reflection_coefficient=True
        self.tang_vel_del=True
        self.radial_amp=False
        # SET DEFAULT WINDOW WIDTHS
        #self.window_widths = "{\"axial\": {\"multiple_3\": 0.004, \"multiple_2\": 0.004, \"multiple_1\": 0.004, \"primary\": 0.004}, \"tangential\": {\"multiple_3\": 0.004, \"multiple_2\": 0.004, \"multiple_1\": 0.004, \"primary\": 0.004}}"

        # End adding new fields.

        if metadata is not None:
            self.set_metadata(metadata)

        if env_config_parser is not None:
            self.set_config_parser(env_config_parser)

        if config_parser is not None:
            self.set_config_parser(config_parser)
        return

    def component_index(self, component_id):
        return self.get_component_index(component_id)

    def get_component_index(self, component_id):
        """

        returns type integer
        ::rparam:: this is the index assocaited with the component label
        """
#        rhino_channel_map = get_rhino_channel_map_v2(self.sensor_axial_axis)
#        component_index = rhino_channel_map[component]
#        return component_index
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
        return self.components_to_collect.split(',')

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
    def samples_per_trace(self):
#        if self.trace_length_in_seconds is None:
#            logger.warning("trace_duration is None - Fix this condition in Global Config")
#            logger.critical("trace duration should be a float")
#            #self.trace_length_in_seconds
        return int(self.trace_length_in_seconds * self.output_sampling_rate)

    @property
    def n_spiking_decon_filter_taps(self):
        """
        .. todo::  20190305: this method looks like it should be deprecated, it
        duplicates _get_num_decon_taps() whcih itself belongs in a separte module (KK)
        """
        return int(self.sampling_rate * self.spiking_decon_filter_duration)

    @property
    def ideal_timestamps(self):
        return np.arange(0,self.output_sampling_rate*self.trace_length_in_seconds)*(1.0/self.output_sampling_rate)

    def set_data_from_json(self,data):
        for _key in data.keys():
            self.__dict__[_key] = data[_key]

    def json_string(self):
        json_str = json.dumps(vars(self), indent=4)
        return json_str

    def _get_num_decon_taps(self,deconvolution_filter_duration,sampling_rate):
        """
        this no longer belongs in global config; it is a filter property
        To control the process flow intuitively we work in terms of the filter
        duration, and sampling rate is already defined.  So the json should
        accept filter_duration as an argument rather than number of taps.
        """
        dt = 1. / sampling_rate
        decon_filter_length_taps = int(deconvolution_filter_duration / dt)
        if np.remainder(decon_filter_length_taps, 2)==1:
            decon_filter_length_taps+=1
        return decon_filter_length_taps

    def set_metadata(self, metadata):
        """
        @chnage 20181212: json.dump does not seem to like datetime objects, so we cast as strings
        #key_list = [key for key, data_type in METADATA_HEADER_FORMAT_KEYS.items()]
        """
        for key, data_type in METADATA_HEADER_FORMAT_KEYS.items():
            try:
                if data_type is DataType.DATE:
                    setattr(self, key, metadata.__getattribute__(key).__str__())
                else:
                    setattr(self, key, metadata.__getattribute__(key))
            except:
                print("{} not found in Metadata Header".format(key))
        return


    @property
    def n_samples_trimmed_trace(self):
        """
        .. todo::  this looks like it should be deprecated as well - unless
        it is used in v2,but the fewer operators we keep around to do the
        same thing the better.
        """
        sampling_rate = float(self.output_sampling_rate)
        n_samples_back = int(sampling_rate * np.abs(self.min_lag_trimmed_trace))
        n_samples_fwd = int(sampling_rate * self.max_lag_trimmed_trace)
        return int(n_samples_fwd + n_samples_back)

    @property
    def trimmed_trace_duration(self):
        duration = self.max_lag_trimmed_trace - self.min_lag_trimmed_trace
        #duration = np.abs(self.max_lag_trimmed_trace) + np.abs(self.min_lag_trimmed_trace)
        return duration


    def set_config_parser( self, config_parser ):
        """
        can be the env_config_parser here ...
        """
        for section in config_parser.sections():
            for option in config_parser.options(section):
                #<Dear Thiago, we are sorry, it's complicated, but lets talk about it tomrrow>
                try:
                    var = config_parser.get(section, option)
                except:
                    var = getattr(self,option)
                #</Dear Thiago, we are sorry, it's complicated, but lets talk about it tomrrow>
                if isinstance( var, int ):
                    setattr(self,option,config_parser.getint(section,option))
                if isinstance( var, float ):
                    setattr(self,option,config_parser.getfloat(section,option))
                if isinstance( var, str ):
                    setattr(self,option,config_parser.get(section,option))
