"""
@TODO: remove explicit declaration of ACOUSTIC_VELOCITY, and replace with
value from global_config

"""
import json
import numpy as np
import pdb
import re

from dcrhino3.feature_extraction.intermediate_derived_features import IntermediateFeatureDeriver
from dcrhino3.feature_extraction.supporting_j1 import get_expected_multiple_times
from dcrhino3.helpers.general_helper_functions import flatten
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace

logger = init_logging(__name__)

WINDOW_BOUNDARIES_INDICES = {}
WINDOW_BOUNDARIES_INDICES['axial'] = {}
WINDOW_BOUNDARIES_INDICES['tangential'] = {}

TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION = ['primary', 'multiple_1', 'multiple_2',
                                        'multiple_3', 'noise_1', 'noise_2']

#wavelet_feature_extractor_types = ['sample', 'polynomial', 'ricker',]





def test_populate_window_data_dict(trace_data_window_dict, trace_time_vector_dict,
                                   trimmed_trace, trimmed_time_vector):
    """
    plot the trace
    """
    color_cycle = ['red', 'orange', 'cyan', 'green', 'blue', 'violet']
    fig, ax = plt.subplots(nrows=2)
    #plt.plot(trimmed_time_vector, trimmed_trace, color='black', linewidth=2, label='trace data')
    i_color = 0
    for i_label, component_label in enumerate(trace_data_window_dict.keys()):
        data_sub_dict = trace_data_window_dict[component_label]
        time_sub_dict = trace_time_vector_dict[component_label]
        ax[i_label].plot(trimmed_time_vector, trimmed_trace, color='black',
          linewidth=2, label='trace data', alpha=0.1)
        i_color = 0
        for window_label in data_sub_dict.keys():
            #print(window_label)
            ax[i_label].plot(time_sub_dict[window_label], data_sub_dict[window_label],
              color=color_cycle[i_color], linewidth=1, label=window_label)
            i_color+=1
        ax[i_label].legend()
    plt.show()
    return




def calculate_boolean_features(feature_dict, sensor_saturation_g):
    """
    note feature_dict here is a subdictionary, we are working with a single component
    Create Boolean
    1:Min = sensitivity (g) /2000
    2: S/N 1st Multiple > 1

    @rtype: dictionary, keyed by the boolean feature labels
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

class WindowBoundaries(object):
    def __init__(self):#, component_id, trimmed_trace, transformed_args, timestamp):
        """
        @TODO: window_boundaries time should just have a .to_index(sampling_rate) method
        """
        self.window_boundaries_time = {}
#        self.window_boundaries_time['axial'] = {}
#        self.window_boundaries_time['tangential'] = {}
#        self.window_boundaries_indices = {}
#        self.window_boundaries_indices['axial'] = {}
#        self.window_boundaries_indices['tangential'] = {}


class FeatureExtractorJ1(object):
    """
    """
    def __init__(self, component_id, trimmed_trace, transformed_args, timestamp):
        """
        @TODO: window_boundaries time should just have a .to_index() method
        @note: given this is run component-by-component we can simplify window_boundaries
        to a simple dict {} rather than having 'axial', 'tangential',
        """
        try:
            self.sampling_rate = transformed_args.upsample_sampling_rate
        #pdb.set_trace()
        except AttributeError:
            self.sampling_rate = transformed_args.output_sampling_rate
        #pdb.set_trace()
        self.acceptable_peak_wander = transformed_args.acceptable_peak_wander
        self.expected_multiple_periods = get_expected_multiple_times(transformed_args)
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
        based on window widths and the expected multiple periods, associate
        the start and end times of each window with a label in a dictionary
        @requires that primary and multiple be defined BEFORE noise
        i.e. the order of  elements in TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION
        is important!!!

        @TODO Test assignments working properly through window_boundaries_time_dict
        """
        #pdb.set_trace()
        component_id = self.trace.component_id
        window_boundaries_time_dict = self.window_boundaries_time[component_id]
        for window_label in TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION:
            if window_label == 'primary':
                width = getattr(self.window_widths, component_id).primary #awkward unpacking
                window_bounds = np.array([primary_shift, primary_shift + width])
            elif bool(re.match('multiple', window_label)):
                n_multiple = int(window_label[-1])
                delay = n_multiple * self.expected_multiple_periods[component_id]
                #delay += primary_shift
                #width = window_widths[component][window_label]
                width = getattr(getattr(self.window_widths,component_id),window_label)
                window_bounds = np.array([delay, delay+width])
            elif window_label == 'noise_1':
                #pdb.set_trace()
                start_of_window = window_boundaries_time_dict['multiple_1'][1]
                end_of_window = window_boundaries_time_dict['multiple_2'][0]
                window_bounds = np.array([start_of_window, end_of_window])
            elif window_label == 'noise_2':
                start_of_window = window_boundaries_time_dict['multiple_2'][1]
                end_of_window = window_boundaries_time_dict['multiple_3'][0]
                window_bounds = np.array([start_of_window, end_of_window])
            window_boundaries_time_dict[window_label] = window_bounds
        return

    def convert_time_window_to_indices(self):
        """
        note, this seems to work for +ve and -ve times
        """
        component_id = self.trace.component_id
        time_window_boundaries_dict = self.window_boundaries_time[component_id]
        index_window_boundaries_dict = self.window_boundaries_indices[component_id]
        #pdb.set_trace()
        #print("now check that self.window_boundaries_time[component_id] si getting filled out")
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
         #<dynamic window allocation>: idea is that the primary window will depend on
         the data, not an predetermined expected window assignment
        window_boundaries_time, window_boundaries_indices = update_window_boundaries(trimmed_trace,
        trimmed_time_vector, window_boundaries_time, window_boundaries_indices)

        acceptable_peak_wander = .003 #3ms
        need:
            applicable_window_width, for which I need to know what component I am on

        print("grab the primary trace and find its max, make sure this is no more than\
                  a few samples from t=0, adjust window_boundaries_time to new times\
                  then adjust the indices")
        """
        component = self.trace.component_id
        trimmed_trace = self.trace.data
        trimmed_time_vector = self.trace.time_vector
        window_widths = self.window_widths

        if dynamic_windows is None:
            return
        elif 'primary' in dynamic_windows:
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
        for window_label in index_window_dict.keys():
            lower_index = index_window_dict[window_label][0]
            upper_index = index_window_dict[window_label][1]
            trace_data_window_dict[window_label] = trimmed_trace[lower_index:upper_index]
            trace_time_vector_dict[window_label] = trimmed_time_vector[lower_index:upper_index]
            #print('check for offbyone error above - maybe upper_index+1')

        return trace_data_window_dict, trace_time_vector_dict

    def extract_features_from_each_window(self, window_data_dict, time_vector_dict):
        """
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

    def extract_features(self):
        """
        @note: now that we are operating by component we could skip the new_features_dict
        and flatten step, and instead add the component id explicity in L303...
        """
        self.set_time_window_boundaries()
        self.convert_time_window_to_indices()

        #print("20181226 update window-boundaries based on trace data (center on primary)")
        self.update_window_boundaries_in_time()
        window_data_dict, window_time_vector_dict = self.populate_window_data_dict()
        #test_populate_window_data_dict(window_data_dict, window_time_vector_dict, trimmed_trace, trimmed_time_vector)
        extracted_features_dict = self.extract_features_from_each_window(window_data_dict,
                                                                    window_time_vector_dict)

        for key in extracted_features_dict.keys():
            extracted_features_dict['J1_{}'.format(key)] = extracted_features_dict.pop('{}'.format(key))
        return extracted_features_dict




