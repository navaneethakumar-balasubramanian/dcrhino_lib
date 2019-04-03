"""
Author kkapler

.. todo:: remove explicit declaration of ACOUSTIC_VELOCITY, and replace with
    value from global_config
    #wavelet_feature_extractor_types = ['sample', 'polynomial', 'ricker',]
"""
import matplotlib.pyplot as plt
import numpy as np
import pdb

from feature_windowing import WindowBoundaries, TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION
from dcrhino3.feature_extraction.intermediate_derived_features import IntermediateFeatureDeriver
from dcrhino3.helpers.general_helper_functions import flatten
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace
from dcrhino3.physics.util import get_resonance_period

logger = init_logging(__name__)



def calculate_boolean_features(feature_dict, sensor_saturation_g):
    """
    Create Boolean and configure calculation for feature extraction, Output dictionary
    contains the following boolean values:

        + mask_system_noise_level
        + mask_snr_mult1

    Based on:

    | 1 Min = sensitivity (g) /2000
    | 2 S/N 1st Multiple > 1

    Parameters:
        feature_dict (dict):  feature dictionary
        sensor_saturation_g (float): sensor saturation value

    Returns:
        (dict): dictionary of booleans to be usedin feature extraction

    .. note:: feature_dict here is a subdictionary, we are working with a single component

    """
    system_noise_level = sensor_saturation_g / 2000.0
    output_dict = {}
    output_dict['mask_system_noise_level'] = False
    output_dict['mask_snr_mult1'] = False
    #pdb.set_trace()
    if feature_dict['multiple_1']['max_amplitude'] < system_noise_level:
        output_dict['mask_system_noise_level'] = True
        #pdb.set_trace()
        #print('mask_system_noise_level')
    snr_mult1 = feature_dict['multiple_1']['integrated_absolute_amplitude'] / feature_dict['noise_1']['integrated_absolute_amplitude']
    if snr_mult1 < 1.0:
        output_dict['mask_snr_mult1'] = True
    return output_dict



class FeatureExtractorJ1(object):
    """
    """
    def __init__(self, component_id, trimmed_trace, transformed_args, timestamp):
        """
        .. todo:: window_boundaries time should just have a .to_index() method
        .. note:: given this is run component-by-component we can simplify window_boundaries
            to a simple dict {} rather than having 'axial', 'tangential',
        """
        try:
            self.sampling_rate = transformed_args.upsample_sampling_rate
        #pdb.set_trace()
        except AttributeError:
            self.sampling_rate = transformed_args.output_sampling_rate
        #pdb.set_trace()
        self.acceptable_peak_wander = transformed_args.acceptable_peak_wander
        self.dynamic_windows = transformed_args.dynamic_windows
        #self.expected_multiple_periods = get_expected_multiple_times(transformed_args)

        if component_id=='axial':
            velocity_steel = transformed_args.ACOUSTIC_VELOCITY
        elif component_id=='tangential':
            velocity_steel = transformed_args.SHEAR_VELOCITY
        #pdb.set_trace()
        sensor_distance_to_bit = transformed_args.sensor_distance_to_source
        distance_sensor_to_shock_sub_bottom = transformed_args.sensor_distance_to_shocksub
        self.resonance_period = get_resonance_period(component_id, sensor_distance_to_bit,
                                                     distance_sensor_to_shock_sub_bottom,
                                                     velocity_steel)
        self.sensor_saturation_g = transformed_args.sensor_saturation_g
        self.trace = SymmetricTrace(trimmed_trace, self.sampling_rate, component_id=component_id)
        self.transformed_args = transformed_args
        self.window_boundaries_time = {}#WindowBoundaries()
        self.window_boundaries_time[component_id] = {}
        self.window_boundaries_indices = {}#WindowBoundaries()
        self.window_boundaries_indices[component_id] = {}
        self.window_widths = transformed_args.window_widths


    def set_time_window_boundaries(self, primary_shift=0.0):
        """
        Set times based on window widths and the expected multiple periods, associate
        the start and end times of each window with a label in a dictionary.

        .. warning:: **Requires** that primary and multiple be defined BEFORE noise
            i.e. the order of  elements in TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION
            is important!!!

        Other Parameters:
            primary_shift (float): offset of primary wave

        """
        component_id = self.trace.component_id
        wb = WindowBoundaries()
        wb.assign_window_boundaries(component_id, self.window_widths,
                                    self.resonance_period,
                                    primary_shift=primary_shift)
        self.window_boundaries_time[component_id] = wb.window_boundaries_time
        return

    def convert_time_window_to_indices(self):
        """
        Converts time window to set of indices containing values in for that time.

        .. note:: this seems to work for +ve and -ve times
        """
        component_id = self.trace.component_id
        time_window_boundaries_dict = self.window_boundaries_time[component_id]
        index_window_boundaries_dict = self.window_boundaries_indices[component_id]

        index_offset = (len(self.trace.data)-1) // 2
        for window_label in TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION:
            time_window_boundaries = time_window_boundaries_dict[window_label]
            lower_time = time_window_boundaries[0]; upper_time = time_window_boundaries[1]
            lower_index = int(np.floor(lower_time/self.trace.dt)) + index_offset
            upper_index = int(np.ceil(upper_time/self.trace.dt)) + index_offset
            index_window_boundaries_dict[window_label] = [lower_index, upper_index]
            #self.window_boundaries_indices[component_id][window_label] = [lower_index, upper_index]

        return

    def update_window_boundaries_in_time(self, dynamic_windows=['primary',]):
        """
        Update the window boundaries if dynamic windows is true. Grab the primary
        trace and find its max, make sure this is no more than a few samples from
        t=0, adjust window_boundaries_time to new times, then adjust the indices
        (center on primary)

        **Dynamic Window Allocation** idea is that the primary window will depend on
        the data, not an predetermined expected window assignment
        window_boundaries_time, window_boundaries_indices = update_window_boundaries(trimmed_trace,
        trimmed_time_vector, window_boundaries_time, window_boundaries_indices)

        .. note:: acceptable_peak_wander = .003 #3ms


        .. note:: *Requires* applicable_window_width, for which I need to know what component I am on

        """
        component = self.trace.component_id
        trimmed_trace = self.trace.data
        trimmed_time_vector = self.trace.time_vector
        window_widths = self.window_widths

        if dynamic_windows:
            max_index = np.argmax(trimmed_trace)
            max_time = trimmed_time_vector[max_index]
            applicable_window_width = getattr(window_widths,component).primary
            if np.abs(max_time) < self.acceptable_peak_wander:
                primary_shift = max_time - applicable_window_width/2.0 #this 2.0 means center the window on the max
                self.set_time_window_boundaries(primary_shift=primary_shift)
                self.convert_time_window_to_indices()
                return
            else:
                logger.error('primary peak has wandered further than expected ... \
                             not updating feature windows')
                return
        else:
            return

    def populate_window_data_dict(self):#component, trimmed_trace, trimmed_time_vector):
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
        for window_label in index_window_dict.keys():
            lower_index = index_window_dict[window_label][0]
            upper_index = index_window_dict[window_label][1]
            trace_data_window_dict[window_label] = trimmed_trace[lower_index:upper_index]
            trace_time_vector_dict[window_label] = trimmed_time_vector[lower_index:upper_index]
            #print('check for offbyone error above - maybe upper_index+1')

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
        """
        new_features_dict = {}
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
            new_features_dict[window_label] = tmp

        boolean_features_dict = calculate_boolean_features(new_features_dict,
                                                           self.sensor_saturation_g)
        new_features_dict['boolean'] = boolean_features_dict
        tmp2 = {}
        tmp2[self.trace.component_id] = new_features_dict
        unnested_dictionary = flatten(tmp2, sep='-')
        feature_deriver = IntermediateFeatureDeriver(df_dict=unnested_dictionary)
        unnested_dictionary = feature_deriver.derive_features(self.trace.component_id)
        return unnested_dictionary

    def extract_features(self):
        """
        Conducts the feature_extractor_j1a to set_window_boundaries, extract features,
        and output a dictionary of extracted features.

        Returns:
            (dict): dictionary of extracted features from :func:`extract_features_from_each_window`

        .. note:: now that we are operating by component we could skip the new_features_dict
            and flatten step, and instead add the component id explicity in L303...
        """
        self.set_time_window_boundaries()
        self.convert_time_window_to_indices()

        self.update_window_boundaries_in_time()
        window_data_dict, window_time_vector_dict = self.populate_window_data_dict()
        #pdb.set_trace()
        #test_populate_window_data_dict(window_data_dict, window_time_vector_dict,
        #                               self.trace.data, self.trace.time_vector)
        extracted_features_dict = self.extract_features_from_each_window(window_data_dict,
                                                                    window_time_vector_dict)
        pdb.set_trace()
        for key in extracted_features_dict.keys():
            extracted_features_dict['J1-{}'.format(key)] = extracted_features_dict.pop('{}'.format(key))
        return extracted_features_dict




