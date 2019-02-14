"""
@TODO: remove explicit declaration of ACOUSTIC_VELOCITY, and replace with
value from global_config

"""
import json
import matplotlib.pyplot as plt #for debug
import numpy as np
import pdb
import re

from dcrhino3.feature_extraction.feature_extractor_j1a import get_expected_multiple_times
from dcrhino3.feature_extraction.feature_extractor_j1a import FeatureExtractorJ1
from dcrhino3.feature_extraction.feature_extractor_j1a import calculate_boolean_features
from dcrhino3.helpers.general_helper_functions import flatten
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.phase_rotation import rotate_phase
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace

from dcrhino3.unstable.phase_algorithm_helpers import determine_phase_state
from dcrhino3.unstable.phase_algorithm_helpers import identify_phase_rotation
from dcrhino3.unstable.phase_algorithm_helpers import identify_primary_neighbourhood

logger = init_logging(__name__)


WINDOW_BOUNDARIES_INDICES = {}
WINDOW_BOUNDARIES_INDICES['axial'] = {}
WINDOW_BOUNDARIES_INDICES['tangential'] = {}

TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION = ['primary', 'multiple_1', 'multiple_2',
                                        'multiple_3', 'noise_1', 'noise_2']




class FeatureExtractorK0(FeatureExtractorJ1):
    """
    """
    def __init__(self, component_id, trimmed_trace, transformed_args, timestamp):
        """
        @TODO: window_boundaries time should just have a .to_index() method
        @note: given this is run component-by-component we can simplify window_boundaries
        to a simple dict {} rather than having 'axial', 'tangential',
        """
        FeatureExtractorJ1.__init__(self, component_id, trimmed_trace,
                                    transformed_args, timestamp)
        self.apply_secondary_rotations = transformed_args.apply_secondary_rotations



    def populate_window_data_dict(self):
        """
        associate with each window_label, the data in that window, and the time
        takes a dictionary of times as input
        Returns a dictioanry of same keys, but [ndx0, ndx1] replaced by data_series from
        @TODO: Spruce this up by using iterative dictionary comprehension
        @TODO: time vector splitting is redundant -  calulate once outside here?
        """
        component = self.trace.component_id
        trimmed_trace = self.trace.data
        trimmed_time_vector = self.trace.time_vector
        index_window_dict = self.window_boundaries_indices[component]
        trace_data_window_dict = {}
        trace_time_vector_dict = {}
        #pdb.set_trace()
        for window_label in index_window_dict.keys():
            lower_index = index_window_dict[window_label][0]
            upper_index = index_window_dict[window_label][1]
            tmp = trimmed_trace
            if self.apply_secondary_rotations:
                if window_label == 'multiple_1':
                    tmp = rotate_phase(trimmed_trace, 90.0)
                elif window_label == 'multiple_2':
                    tmp *= -1.0
                elif window_label == 'multiple_3':
                    tmp = rotate_phase(trimmed_trace, -90.0)
            trace_data_window_dict[window_label] = tmp[lower_index:upper_index]
            trace_time_vector_dict[window_label] = trimmed_time_vector[lower_index:upper_index]

        return trace_data_window_dict, trace_time_vector_dict


    def extract_features(self):
        """
        """
        self.set_time_window_boundaries()
        self.convert_time_window_to_indices()
        new_features_dict = {}
        print("update_window_boundaries_in_time should not be needed for phase rotated data\
              needs testing to confirm its really true")
        self.update_window_boundaries_in_time()
        #pdb.set_trace()
        mini_trace = identify_primary_neighbourhood(self.trace, self.transformed_args)
        trough_search_width=(mini_trace.num_observations-1)//2
        phase_state = determine_phase_state(mini_trace.data, trough_search_width)
        phi = identify_phase_rotation(mini_trace.data)
        self.trace.rotate_recenter_and_trim(phi)
        # trace is now ready for feature extraction
        #</update primary window to be centered on max amplitude>
        window_data_dict, window_time_vector_dict = self.populate_window_data_dict()
        #test_populate_window_data_dict(window_data_dict, window_time_vector_dict, trimmed_trace, trimmed_time_vector)
        extracted_features_dict = self.extract_features_from_each_window(window_data_dict,
                                                                    window_time_vector_dict)
        #pdb.set_trace()
        boolean_features_dict = calculate_boolean_features(extracted_features_dict, self.sensor_saturation_g)
        extracted_features_dict['boolean'] = boolean_features_dict
        new_features_dict[self.trace.component_id] = extracted_features_dict
        #pdb.set_trace()
        unnested_dictionary = flatten(new_features_dict)#print('now dump out with dict keys concatenated')
        for key in unnested_dictionary.keys():
            unnested_dictionary['K0_{}'.format(key)] = unnested_dictionary.pop('{}'.format(key))
        return unnested_dictionary




