"""
@TODO: remove explicit declaration of ACOUSTIC_VELOCITY, and replace with
value from global_config

"""
import json
import numpy as np
import pdb


from dcrhino3.feature_extraction.feature_extraction_20181226 import calculate_boolean_features
from dcrhino3.feature_extraction.feature_extraction_20181226 import convert_window_boundaries_to_sample_indices
from dcrhino3.feature_extraction.feature_extraction_20181226 import extract_features_from_each_window
from dcrhino3.feature_extraction.feature_extraction_20181226 import get_expected_multiple_times
from dcrhino3.feature_extraction.feature_extraction_20181226 import populate_window_data_dict
from dcrhino3.feature_extraction.feature_extraction_20181226 import set_window_boundaries_in_time
from dcrhino3.feature_extraction.feature_extraction_20181226 import update_window_boundaries_in_time
from dcrhino3.helpers.general_helper_functions import flatten
from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)

PRIMARY_SHIFT_AXIAL = 0.0
PRIMARY_SHIFT_TANGENTIAL = 0.0
WINDOW_BOUNDARIES_TIME = {}
WINDOW_BOUNDARIES_TIME['axial'] = {}
WINDOW_BOUNDARIES_TIME['tangential'] = {}
WINDOW_BOUNDARIES_INDICES = {}
WINDOW_BOUNDARIES_INDICES['axial'] = {}
WINDOW_BOUNDARIES_INDICES['tangential'] = {}


def feature_extractor_j1(component_id, trimmed_trace, transformed_args, timestamp):
    """
    """
    #components_to_process = ['axial', 'tangential', ]
    #pdb.set_trace()
    logger.warning("transformed args failed to unpack window_widths - hack around here:")
    window_widths = transformed_args.window_widths
    #window_widths = json.loads(window_widths)

    samples_per_trace = len(trimmed_trace)
    sampling_rate = transformed_args.output_sampling_rate; dt = 1./sampling_rate;

    #<Define intervals of data for analysis and prep containers>
    expected_multiple_periods = get_expected_multiple_times(transformed_args)
    #pdb.set_trace()
#    for component in components_to_process:
    set_window_boundaries_in_time(expected_multiple_periods, window_widths, component_id)
    convert_window_boundaries_to_sample_indices(component_id, transformed_args)
    #</Define intervals of data for analysis and prep containers>

    trimmed_time_vector = (dt * np.arange(samples_per_trace)) - np.abs(transformed_args.min_lag_trimmed_trace)

    #Allocate space for feature arrays
    new_features_dict = {}
    #trimmed_trace = trimmed_traces_dict[component]
    #<update primary window to be centered on max amplitude of trace>
    print("20181226 update the window time boundaries to be based on trace data")
    update_window_boundaries_in_time(component_id, trimmed_trace, trimmed_time_vector,
                                     window_widths, expected_multiple_periods, transformed_args)

    #</update primary window to be centered on max amplitude>
    window_data_dict, window_time_vector_dict = populate_window_data_dict(component_id,
                                                                          trimmed_trace,
                                                                          trimmed_time_vector)
    #test_populate_window_data_dict(window_data_dict, window_time_vector_dict, trimmed_trace, trimmed_time_vector)
    extracted_features_dict = extract_features_from_each_window(window_data_dict,
                                                                window_time_vector_dict)

    boolean_features_dict = calculate_boolean_features(extracted_features_dict, transformed_args)
    extracted_features_dict['boolean'] = boolean_features_dict
    new_features_dict[component_id] = extracted_features_dict
        #pdb.set_trace()
    #pdb.set_trace()
    unnested_dictionary = flatten(new_features_dict)#print('now dump out with dict keys concatenated')
    for key in unnested_dictionary.keys():
        unnested_dictionary['J1_{}'.format(key)] = unnested_dictionary.pop('{}'.format(key))
    return unnested_dictionary


