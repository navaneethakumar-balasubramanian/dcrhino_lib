# -*- coding: utf-8 -*-
"""
 {
        "type": "template",
        "output_to_file": false,
        "args": {
          "max_lag_trimmed_trace": "|global_config.max_lag_trimmed_trace|",
          "min_lag_trimmed_trace": "|global_config.min_lag_trimmed_trace|"
        }
      },
        


"""
import numpy as np
import pandas as pd
import pdb

from dcrhino3.feature_extraction.feature_extractor_j2 import FeatureExtractorJ2
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.process_flow.modules.hybrid.base_hybrid_module import BaseHybridModule


logger = init_logging(__name__)

def mergey_mc_mergealot(new_features_df, old_dataframe):
    """
    special function for K0 features which redefine the traces.
    Can be made much more general but for now...
    1. Find traces (array-type elements) in the new_features dataframe and
    and overwrite their corresponding old dataframe, then use pandas merge
    on the rest of the columns

    20190906: Careful! The indices here can be messed up.
    re-index the new_features_df to have same indices as old_dataframe
    """
    common_column_labels = list(set(new_features_df.columns).intersection(set(old_dataframe.columns)))
    old_dataframe.update(new_features_df, overwrite=True)
    new_features_df.drop(common_column_labels, axis=1, inplace=True)
    #new_features_df.reindex(index=old_dataframe.index)
    new_features_df.set_index(old_dataframe.index, inplace=True)
    merged = pd.concat([new_features_df, old_dataframe], axis=1)
    return merged

def example_function(x):
    return x-1.0


class FeatureExtractJ2Hybrid(BaseHybridModule):

    def __init__(self, json, output_path,process_flow,order):
        BaseHybridModule.__init__(self, json, output_path,process_flow,order)
        self.id = "j2"
        self.default_args = {
            "sensor_distance_to_source": "|global_config.sensor_distance_to_source|",
            "additional_pick_based_amplitude_windows": {
                "axial": {
                    "multiple_1": {
                        "left_upper_bound_offset": -0.002,
                        "left_lower_bound_offset": -0.006,
                        "right_upper_bound_offset": 0.006,
                        "right_lower_bound_offset": 0.002
                    },
                    "primary": {
                        "left_upper_bound_offset": -0.002,
                        "left_lower_bound_offset": -0.006,
                        "right_upper_bound_offset": 0.006,
                        "right_lower_bound_offset": 0.002
                    }
                },
                "tangential": {
                    "multiple_1": {
                        "left_upper_bound_offset": -0.002,
                        "left_lower_bound_offset": -0.006,
                        "right_upper_bound_offset": 0.006,
                        "right_lower_bound_offset": 0.002},
                    "primary": {
                        "left_upper_bound_offset": -0.002,
                        "left_lower_bound_offset": -0.006,
                        "right_upper_bound_offset": 0.006,
                        "right_lower_bound_offset": 0.002}
                }
            },
            "ACOUSTIC_VELOCITY": "|global_config.ACOUSTIC_VELOCITY|",
            "amplitude_half_widths": {
                "axial": {
                    "multiple_3": 0.00105,
                    "multiple_2": 0.00105,
                    "multiple_1": 0.00105,
                    "primary": 0.00105
                },
                "tangential": {
                    "multiple_3": 0.00105,
                    "multiple_2": 0.00105,
                    "multiple_1": 0.00105,
                    "primary": 0.00105
                }
            },
            "sensor_saturation_g": "|global_config.sensor_saturation_g|",
            "manual_time_windows": {
                "axial": {
                    "multiple_3": "|process_flow.axial_multiple_3|",
                    "multiple_2": "|process_flow.axial_multiple_2|",
                    "multiple_1": "|process_flow.axial_multiple_1|",
                    "primary": "|process_flow.axial_primary|"
                },
                "tangential": {
                    "multiple_3": "|process_flow.tangential_multiple_3|",
                    "multiple_2": "|process_flow.tangential_multiple_2|",
                    "multiple_1": "|process_flow.tangential_multiple_1|",
                    "primary": "|process_flow.tangential_primary|"
                }
            },
            "sensor_distance_to_shocksub": "|global_config.sensor_distance_to_shocksub|",
            "upsample_sampling_rate": [
                "|global_config.upsample_sampling_rate|",
                50000
            ],
            "SHEAR_VELOCITY": "|global_config.SHEAR_VELOCITY|",
            "time_picks": {
                "axial": {
                    "multiple_3": "maximum",
                    "multiple_2": "maximum",
                    "multiple_1": "maximum",
                    "primary": "maximum"
                },
                "tangential": {
                    "multiple_3": "maximum",
                    "multiple_2": "maximum",
                    "multiple_1": "maximum",
                    "primary": "maximum"
                }
            },
            "amplitude_picks": {
                "axial": {
                    "multiple_3": "integrated_absolute_amplitude",
                    "multiple_2": "integrated_absolute_amplitude",
                    "multiple_1": "integrated_absolute_amplitude",
                    "primary": "integrated_absolute_amplitude"
                },
                "tangential": {
                    "multiple_3": "integrated_absolute_amplitude",
                    "multiple_2": "integrated_absolute_amplitude",
                    "multiple_1": "integrated_absolute_amplitude",
                    "primary": "integrated_absolute_amplitude"
                }
            }
        }

    def process_splitted_trace(self, splitted_traces):
    
        """
        a.k.a. extract_features() method from old (pre-hybrid) verison
        @type component_array: numpy array
        @note: Creates a symmetric and centered data acorr decendant data vector
        """
        transformed_args = splitted_traces.transformed_args
        n_traces = len(splitted_traces.dataframe)
        sampling_rate_array = np.asarray(splitted_traces.dataframe.sampling_rate)
        timestamp_array = np.asarray(splitted_traces.dataframe.timestamp)
        features_dict_list = [{}] * n_traces

        for component_id in self.components_to_process:
            data_array = splitted_traces.component_as_array(component_id)
            n_traces, n_samples_per_trace = data_array.shape
            #all_features_great_and_small[component_id] = n_traces * [None]
            for i_trace in range(n_traces):
                sampling_rate = sampling_rate_array[i_trace]
                timestamp = timestamp_array[i_trace]
                trace_data = data_array[i_trace, :]
                
                feature_dict = self.extract_feature_component(component_id, trace_data, transformed_args,
                                       timestamp, sampling_rate)
                tmp = {}
                tmp.update(features_dict_list[i_trace])
                tmp.update(feature_dict)
                features_dict_list[i_trace] = tmp

        features_df = pd.DataFrame(features_dict_list)

        merged = mergey_mc_mergealot(features_df, splitted_traces.dataframe)

        splitted_traces.dataframe = merged
        return splitted_traces
        

    def extract_feature_component(self, component_id, trace_to_process, transformed_args, timestamp, sampling_rate):
        if component_id == 'radial':
            return {}

        feature_extractor = FeatureExtractorJ2(component_id, trace_to_process, transformed_args, timestamp, sampling_rate)
        line_feature_dict = feature_extractor.extract_features()
        
        return line_feature_dict
        