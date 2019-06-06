#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 25 11:52:23 2019

@author: thiago
"""

# -*- coding: utf-8 -*-

import pdb
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.hybrid.base_hybrid_module import BaseHybridModule
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace
from dcrhino3.unstable.phase_algorithm_helpers import identify_phase_rotation
from dcrhino3.unstable.phase_algorithm_helpers import identify_primary_neighbourhood
#from dcrhino3.physics.util import get_resonance_period
#from dcrhino3.unstable.multipass.drill_rig import DrillRig
#import matplotlib.pyplot as plt

def calculate_resonance_period(installed_resonant_length, velocity_steel):
    two_way_distance = 2 * installed_resonant_length
    resonance_period = two_way_distance / velocity_steel
    return resonance_period

def resonance_period_temp(global_config):
    """
    this is being placed here so that I can migrate from the old method which
    has bugs in config to the new method in DrillRig()
    """
    installed_resonant_length = global_config.sensor_distance_to_source + global_config.sensor_distance_to_shocksub
    axial_velocity_steel = global_config.ACOUSTIC_VELOCITY
    resonance_period = calculate_resonance_period(installed_resonant_length, axial_velocity_steel)
#    resonance_period = get_resonance_period('axial', global_config.sensor_distance_to_source,
#                              global_config.sensor_distance_to_shocksub, global_config.ACOUSTIC_VELOCITY)
    return resonance_period

def resonance_period_robust(installed_resonant_length, axial_velocity_steel):
    """
    resonance period is now being calculated from DrillRig() based on
    installed_resonant_length
    compressional_wave_velocity = axial_velocity_steel

    """
    resonance_period = calculate_resonance_period(installed_resonant_length, axial_velocity_steel)
    return resonance_period

class PhaseBalanceHybridModule(BaseHybridModule):
    def __init__(self, json, output_path, process_flow, order):
        BaseHybridModule.__init__(self, json, output_path, process_flow, order)
        self.id = "phase_balance_hybrid"
        self.can_alter_trace = False
        self.can_create_columns = True

    def process_splitted_trace(self, splitted_traces):
        transformed_args = splitted_traces.transformed_args
    	sampling_rate = splitted_traces.dataframe.sampling_rate.iloc[0]

        for component_id in self.components_to_process:
            phase_column_label = '{}-primary_phase_correction'.format(component_id)
            shift_column_label = '{}-primary_time_shift'.format(component_id)
            splitted_traces.dataframe[phase_column_label] = 0.0
            splitted_traces.dataframe[shift_column_label] = 0.0
            data_array = splitted_traces.component_as_array(component_id)
            n_traces, n_samples_per_trace = data_array.shape

            for i_trace in range(n_traces):
                trace_data = data_array[i_trace, :]
                trace = SymmetricTrace(trace_data, sampling_rate)
                #resonance_period = resonance_period_temp(transformed_args)
                #installed_resonant_length = splitted_traces.dataframe.drill_string_resonant_length.iloc[i_trace]
                #resonance_period = resonance_period_robust(installed_resonant_length, transformed_args.ACOUSTIC_VELOCITY)

                #resonance_period = calculate_resonance_period(installed_resonant_length, transformed_args.ACOUSTIC_VELOCITY)
                #mini_trace = identify_primary_neighbourhood(trace, resonance_period)
                #phi = identify_phase_rotation(mini_trace.data)
                phi = identify_phase_rotation(trace.data)
                trace.rotate_recenter_and_trim(phi)
                data_array[i_trace, :] = trace.data
                splitted_traces.dataframe[phase_column_label].loc[i_trace] = phi
                splitted_traces.dataframe[shift_column_label].loc[i_trace] = trace.applied_shift

            splitted_traces.assign_component_from_array(component_id, data_array)
        return splitted_traces




