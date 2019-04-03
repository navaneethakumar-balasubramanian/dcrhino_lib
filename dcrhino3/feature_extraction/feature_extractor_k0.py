"""
Author: kkappler

.. todo:: remove explicit declaration of ACOUSTIC_VELOCITY, and replace with
    value from global_config

"""
import matplotlib.pyplot as plt #for debug
import numpy as np
import pdb

from dcrhino3.feature_extraction.feature_extractor_j1a import FeatureExtractorJ1
from dcrhino3.feature_extraction.feature_extractor_j1a import calculate_boolean_features
from dcrhino3.feature_extraction.intermediate_derived_features import IntermediateFeatureDeriver
from dcrhino3.helpers.general_helper_functions import flatten
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.phase_rotation import rotate_phase

from dcrhino3.unstable.phase_algorithm_helpers import identify_phase_rotation
from dcrhino3.unstable.phase_algorithm_helpers import identify_primary_neighbourhood

logger = init_logging(__name__)




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
        self.apply_primary_rotation = transformed_args.apply_primary_rotation
        self.apply_secondary_rotations = transformed_args.apply_secondary_rotations




    def populate_window_data_dict(self):
        """
        Associate with each window_label, the data in that window, and the time
        takes a dictionary of times as input.

        Returns:
            (dict): a dictionary of same keys, but [ndx0, ndx1] replaced by data_series

        .. todo:: Spruce this up by using iterative dictionary comprehension
        .. todo:: time vector splitting is redundant -  calulate once outside here?
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
            tmp = trimmed_trace.copy()
            if self.apply_secondary_rotations:
                if window_label == 'multiple_1':
                    tmp = rotate_phase(trimmed_trace, -90.0)
                elif window_label == 'multiple_2':
                    tmp *= -1.0
                elif window_label == 'multiple_3':
                    tmp = rotate_phase(trimmed_trace, 90.0)
            trace_data_window_dict[window_label] = tmp[lower_index:upper_index]
            trace_time_vector_dict[window_label] = trimmed_time_vector[lower_index:upper_index]

        return trace_data_window_dict, trace_time_vector_dict

    def extract_features_from_each_window(self, window_data_dict, time_vector_dict):
        """
        Feature extractor that moves window by window, finds features, and
        stores them under window label. Calc's the following and gives them to
        :class:`~intermediate_derived_features.IntermediateFeatureDeriver`.

            + max_amplitude
            + max_time
            + min_amplitude
            + min_time
            + integrated_absolute_amplitude

        Parameters:
            window_data_dict (dict): window labels, time_boundaries dictionary
            time_vector_dict (dict): dictionary of time_vectors for each window_label

        Returns:
            (dict): dictionary (unnested) from :class:`~intermediate_derived_features.IntermediateFeatureDeriver`

        .. todo:: 20190218: this is the old way to handle this ...
        """
        new_feature_dict = {}
        for window_label in window_data_dict.keys():
            tmp = {}
            #pdb.set_trace()
            data_window = window_data_dict[window_label]
            time_vector = time_vector_dict[window_label]
            dt = time_vector[1] - time_vector[0]
            window_duration = time_vector[-1]-time_vector[0]
            tmp['max_amplitude'] = np.max(data_window)
            tmp['max_time'] = time_vector[np.argmax(data_window)]
            tmp['min_amplitude'] = np.min(data_window)
            tmp['min_time'] = time_vector[np.argmin(data_window)]
            tmp['integrated_absolute_amplitude'] = dt * np.sum(np.abs(data_window)) / window_duration
            new_feature_dict[window_label] = tmp
        return new_feature_dict

    def extract_features(self):
        """
        Conducts the feature_extractor_k0 to set_window_boundaries, extract features,
        and output a dictionary of extracted features.

        Returns:
            (dict): unnested dictionary of extracted/derived features from :class:`~intermediate_derived_features.IntermediateFeatureDeriver`
        """
        component_id = self.trace.component_id
        self.set_time_window_boundaries()
        self.convert_time_window_to_indices()
        new_features_dict = {}
        #print("update_window_boundaries_in_time should not be needed for phase rotated data\
        #      needs testing to confirm its really true")
        self.update_window_boundaries_in_time()
        if self.apply_primary_rotation:
            mini_trace = identify_primary_neighbourhood(self.trace, self.transformed_args)
            phi = identify_phase_rotation(mini_trace.data)
            self.trace.rotate_recenter_and_trim(phi)
        # trace is now ready for feature extraction
        #</update primary window to be centered on max amplitude>
        window_data_dict, window_time_vector_dict = self.populate_window_data_dict()
        #test_populate_window_data_dict(window_data_dict, window_time_vector_dict, trimmed_trace, trimmed_time_vector)
        extracted_features_dict = self.extract_features_from_each_window(window_data_dict,
                                                                    window_time_vector_dict)
        #pdb.set_trace()
        if self.apply_primary_rotation:
            extracted_features_dict['primary_phi'.format(component_id)] = phi
            extracted_features_dict['trace'] = self.trace.data

        boolean_features_dict = calculate_boolean_features(extracted_features_dict, self.sensor_saturation_g)
        extracted_features_dict['boolean'] = boolean_features_dict
        new_features_dict[self.trace.component_id] = extracted_features_dict

        #pdb.set_trace()
        unnested_dictionary = flatten(new_features_dict)#print('now dump out with dict keys concatenated')
        feature_deriver = IntermediateFeatureDeriver(df_dict=unnested_dictionary)
        unnested_dictionary = feature_deriver.derive_features(component_id)
        for key in unnested_dictionary.keys():
            if key == '{}_trace'.format(self.trace.component_id):
                pass
            else:
                unnested_dictionary['K0_{}'.format(key)] = unnested_dictionary.pop('{}'.format(key))

        #pdb.set_trace()
        return unnested_dictionary




