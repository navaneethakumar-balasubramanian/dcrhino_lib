"""
Author kkappler

.. todo:: remove explicit declaration of ACOUSTIC_VELOCITY, and replace with
    value from global_config
    #wavelet_feature_extractor_types = ['sample', 'polynomial', 'ricker',]

Parameters for the json/config:
    primary_max_time_guess = 0.00018
    multiple_1_zero_crossing_time_guess = 0.0109
    multiple_2_min_time_guess = 0.0215

    primary_half_width = 0.001
    primary_window_start_adjustment = 0.0015
    primary_window_final_adjustment
    primary_upper_extension = 0.0015

        multiple_1_half_width = 0.001
        multiple_2_half_width = 0.00125
        multiple_2_lower_extension = 0.0015
        multiple_2_upper_extension = 0.0000
        #</Time Pick Search Windows>

        #<Amplitude Pick Averaging Windows>
        half_widths_amplitude = {}
        half_widths_amplitude['primary'] = 0.00105
        half_widths_amplitude['multiple_1'] = 0.00105
        half_widths_amplitude['multiple_2'] = 0.00105
        #</Amplitude Pick Averaging Windows>


"""
import json
import matplotlib.pyplot as plt
import numpy as np
import pdb
import re

from feature_windowing import test_populate_window_data_dict
from feature_windowing import WindowBoundaries, TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION
from dcrhino3.feature_extraction.intermediate_derived_features import IntermediateFeatureDeriver
from dcrhino3.helpers.general_helper_functions import flatten
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace
from dcrhino3.signal_processing.phase_rotation import rotate_phase, rotate_phase_true
from dcrhino3.physics.util import get_expected_multiple_times

from feature_extractor_j1a import calculate_boolean_features


logger = init_logging(__name__)





class FeatureExtractorJ2(object):
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
        #self.acceptable_peak_wander = transformed_args.acceptable_peak_wander
        #self.dynamic_windows = transformed_args.dynamic_windows
        #self.expected_multiple_periods = get_expected_multiple_times(transformed_args)
        #self.sensor_saturation_g = transformed_args.sensor_saturation_g
        self.trace = SymmetricTrace(trimmed_trace, self.sampling_rate, component_id=component_id)
        self.transformed_args = transformed_args
        #self.window_boundaries_time = {}#WindowBoundaries()
        #self.window_boundaries_time[component_id] = {}
        #self.window_boundaries_indices = {}#WindowBoundaries()
        #self.window_boundaries_indices[component_id] = {}
        #self.window_widths = transformed_args.window_widths


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
                                    self.expected_multiple_periods,
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
        unnested_dictionary = flatten(tmp2)
        feature_deriver = IntermediateFeatureDeriver(df_dict=unnested_dictionary)
        unnested_dictionary = feature_deriver.derive_features(self.trace.component_id)
        return unnested_dictionary

    def extract_primary_max_time(self, time_guess, window_half_width):
        window_first_time = time_guess - window_half_width
        window_final_time = time_guess + window_half_width
        cond1 = self.trace.time_vector >= window_first_time
        cond2 = self.trace.time_vector <  window_final_time
        active_indices = np.where(cond1 & cond2)[0]
        window_time = self.trace.time_vector[active_indices].copy()
        window_data = self.trace.data[active_indices].copy()
        primary_max_time_index = np.argmax(window_data)
        primary_max_time = window_time[primary_max_time_index]
        return primary_max_time

    def extract_multiple_1_zero_crossing_time(self, time_guess, window_half_width):
        """
        total bonehead way to do this - just for POC.  How to do for real:
            probably do a LPF, then walk out from ZX until you find nearest
            +to- polarity change.
        Recenter to this value and sharpen (narrow) the window
        """
        window_first_time = time_guess - window_half_width
        window_final_time = time_guess + window_half_width
        cond1 = self.trace.time_vector >= window_first_time
        cond2 = self.trace.time_vector <  window_final_time
        active_indices = np.where(cond1 & cond2)[0]
        window_time = self.trace.time_vector[active_indices].copy()
        window_data = self.trace.data[active_indices].copy()

        zero_crossing_index = np.argmin(np.abs(window_data))
        zero_crossing_time = window_time[zero_crossing_index]
        return zero_crossing_time

    def extract_multiple_2_min_time(self, time_guess, window_half_width,
                                    upper_extension, lower_extension):
        """
        yes this is a copy of extract_primary_max_time() with a -1.0 multiplier
        """
        window_first_time = time_guess - window_half_width - upper_extension
        window_final_time = time_guess + window_half_width + lower_extension
        cond1 = self.trace.time_vector >= window_first_time
        cond2 = self.trace.time_vector <  window_final_time
        active_indices = np.where(cond1 & cond2)[0]
        window_time = self.trace.time_vector[active_indices].copy()
        window_data = self.trace.data[active_indices].copy()
        #pdb.set_trace()
        window_data *= -1.0 #flip trough to a peak
        result_time_index = np.argmax(window_data)
        result_time = window_time[result_time_index]
        return result_time

    def extract_average_absolute_amplitude(self, time_center, window_half_width, rotate_angle=False):
        trace_data = self.trace.data.copy()
        if rotate_angle:
            trace_data = rotate_phase_true(trace_data, rotate_angle)
#            pdb.set_trace()
#            print("truewho?")
        window_first_time = time_center - window_half_width
        window_final_time = time_center + window_half_width
        cond1 = self.trace.time_vector >= window_first_time
        cond2 = self.trace.time_vector <  window_final_time
        active_indices = np.where(cond1 & cond2)[0]
        window_time = self.trace.time_vector[active_indices].copy()
        #window_data = self.trace.data[active_indices].copy()
        window_data = trace_data[active_indices]
        dt = window_time[1] - window_time[0]
        window_duration = window_time[-1] - window_time[0]
        integrated_absolute_amplitude = dt * np.sum(np.abs(window_data)) / window_duration
        return integrated_absolute_amplitude

    def extract_features(self):
        """
        This will be changed so that features_to_extract is taken from the json,
        but for now will develop here;
        """
        extracted_features_dict = {}
        #<do this later>
#        time_features = {}
#        time_features['primary'] = 'max_time'
#        etc.
#use dicts for time_features['primary', 'multiple_1', 'multiple_2']
#use half_widths_time = {}; keys are ['primary', 'multiple_1', 'multiple_2']
#use dicts half_widths_ampl_avg ['primary', 'multiple_1', 'multiple_2']
        #<do this later>
        time_features = ['primary_max_time', 'multiple_1_zero_crossing_time',
                               'multiple_2_min_time']
        amplitude_features = ['primary_integrated_absolute_amplitude',
                               'multiple_1_integrated_absolute_amplitude',
                               'multiple_2_integrated_absolute_amplitude']
        primary_max_time_guess = 0.00018
        multiple_1_zero_crossing_time_guess = 0.0109
        multiple_2_min_time_guess = 0.0215

        #<Time Pick Search Windows>
        primary_half_width = 0.001
        multiple_1_half_width = 0.001
        multiple_2_half_width = 0.00125
        multiple_2_lower_extension = 0.0015
        multiple_2_upper_extension = 0.0000
        #</Time Pick Search Windows>

        #<Amplitude Pick Averaging Windows>
        half_widths_amplitude = {}
        half_widths_amplitude['primary'] = 0.00105
        half_widths_amplitude['multiple_1'] = 0.00105
        half_widths_amplitude['multiple_2'] = 0.00105
        #</Amplitude Pick Averaging Windows>

        for feature_label in time_features:
            #print(feature_label)
            if feature_label=='primary_max_time':
                result = self.extract_primary_max_time(primary_max_time_guess,
                                                                 primary_half_width)
            elif feature_label=='multiple_1_zero_crossing_time':
                result = self.extract_multiple_1_zero_crossing_time(multiple_1_zero_crossing_time_guess,
                                                                 multiple_1_half_width)
            elif feature_label=='multiple_2_min_time':
                result = self.extract_multiple_2_min_time(multiple_2_min_time_guess,
                                                                 multiple_2_half_width,
                                                                 multiple_2_upper_extension,
                                                                 multiple_2_lower_extension)
            else:
                print('logger.warning feature {} not yet supported'.format(feature_label))
                result = None
            output_label = '{}_{}'.format(self.trace.component_id, feature_label)
            extracted_features_dict[output_label] = result

        for feature_label in amplitude_features:
            #print(feature_label)
            window_label = feature_label.split('_integrated_absolute_amplitude')[0]
            if window_label=='primary':
                reference_label = 'primary_max_time'; rotate_angle=False;
            elif window_label=='multiple_1':
                reference_label = 'multiple_1_zero_crossing_time'; rotate_angle=-90.0;
            elif window_label=='multiple_2':
                reference_label = 'multiple_2_min_time'; rotate_angle=False;
            else:
                reference_label = None
                print('bugger off!')
                continue

            window_center_time_label = '{}_{}'.format(self.trace.component_id, reference_label)
            window_center = extracted_features_dict[window_center_time_label]
            result = self.extract_average_absolute_amplitude(window_center,
                                                             half_widths_amplitude[window_label],
                                                             rotate_angle=rotate_angle)

            output_label = '{}_{}'.format(self.trace.component_id, feature_label)
            extracted_features_dict[output_label] = result



#        self.set_time_window_boundaries()
#        self.convert_time_window_to_indices()
#
#        self.update_window_boundaries_in_time()
#        window_data_dict, window_time_vector_dict = self.populate_window_data_dict()
#        #pdb.set_trace()
#        #test_populate_window_data_dict(window_data_dict, window_time_vector_dict,
#        #                               self.trace.data, self.trace.time_vector)
#        extracted_features_dict = self.extract_features_from_each_window(window_data_dict,
#                                                                    window_time_vector_dict)
        #pdb.set_trace()

        delay_1_label = '{}_delay_1'.format(self.trace.component_id)
        delay_2_label = '{}_delay_2'.format(self.trace.component_id)
        primary_time_label = '{}_primary_max_time'.format(self.trace.component_id)
        multiple_1_time_label = '{}_multiple_1_zero_crossing_time'.format(self.trace.component_id)
        multiple_2_time_label = '{}_multiple_2_min_time'.format(self.trace.component_id)
        extracted_features_dict[delay_1_label] = extracted_features_dict[multiple_1_time_label] - extracted_features_dict[primary_time_label]
        extracted_features_dict[delay_2_label] = extracted_features_dict[multiple_2_time_label] - extracted_features_dict[multiple_1_time_label]
#        @property
#        def axial_delay_1(self):
#        return self.df_dict['axial_multiple_1_max_time'] - self.df_dict['axial_primary_max_time']
#
#    @property
#    def axial_delay_2(self):
#        return self.df_dict['axial_multiple_2_max_time'] - self.df_dict['axial_multiple_1_max_time']
        for key in extracted_features_dict.keys():
            extracted_features_dict['J2_{}'.format(key)] = extracted_features_dict.pop('{}'.format(key))
        return extracted_features_dict




