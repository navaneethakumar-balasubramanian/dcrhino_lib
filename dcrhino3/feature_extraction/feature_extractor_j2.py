"""
Author kkappler

"""
#import matplotlib.pyplot as plt
import numpy as np
import pdb

#from feature_windowing import TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION
from feature_windowing import AmplitudeWindows
from feature_windowing import ManualTimeWindows
#from dcrhino3.feature_extraction.intermediate_derived_features import IntermediateFeatureDeriver
from dcrhino3.feature_extraction.intermediate_derived_features_j2 import IntermediateFeatureDeriver
from dcrhino3.helpers.general_helper_functions import flatten
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace
from dcrhino3.signal_processing.phase_rotation import rotate_phase
#from dcrhino3.physics.util import get_expected_multiple_times

#from feature_extractor_j1a import calculate_boolean_features


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
        self.trace = SymmetricTrace(trimmed_trace, self.sampling_rate, component_id=component_id)
        self.transformed_args = transformed_args
        manual_windows = getattr(transformed_args.manual_time_windows, component_id)
        time_picks = getattr(transformed_args.time_picks, component_id)
        self.manual_windows = ManualTimeWindows()
        self.manual_windows.populate_from_transformed_args(manual_windows, time_picks)
        amplitude_half_widths = getattr(transformed_args.amplitude_half_widths, component_id)
        self.amplitude_windows = AmplitudeWindows()
        self.amplitude_windows.populate_from_transformed_args(amplitude_half_widths)

    def extract_max_time(self, window_first_time, window_final_time):
        cond1 = self.trace.time_vector >= window_first_time
        cond2 = self.trace.time_vector <  window_final_time
        active_indices = np.where(cond1 & cond2)[0]
        window_time = self.trace.time_vector[active_indices].copy()
        window_data = self.trace.data[active_indices].copy()
        primary_max_time_index = np.argmax(window_data)
        primary_max_time = window_time[primary_max_time_index]
        return primary_max_time

    def extract_zero_crossing_time(self, window_first_time, window_final_time):
        """
        total bonehead way to do this - just for POC.  How to do for real:
            probably do a LPF, then walk out from ZX until you find nearest
            +to- polarity change.
        Recenter to this value and sharpen (narrow) the window
        """
        cond1 = self.trace.time_vector >= window_first_time
        cond2 = self.trace.time_vector <  window_final_time
        active_indices = np.where(cond1 & cond2)[0]
        window_time = self.trace.time_vector[active_indices].copy()
        window_data = self.trace.data[active_indices].copy()

        zero_crossing_index = np.argmin(np.abs(window_data))
        zero_crossing_time = window_time[zero_crossing_index]
        return zero_crossing_time

    def extract_min_time(self, window_first_time, window_final_time):
        """
        yes this is a copy of extract_primary_max_time() with a -1.0 multiplier
        """
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
            trace_data = rotate_phase(trace_data, rotate_angle)
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
        .. : todo: modify primary_max_time to be primary-max_time;
        Does this break anything downstream??
        """
        extracted_features_dict = {}
        time_features = ['primary-max_time', 'multiple_1-zero_crossing_time',
                               'multiple_2-min_time']
        amplitude_features = ['primary-integrated_absolute_amplitude',
                               'multiple_1-integrated_absolute_amplitude',
                               'multiple_2-integrated_absolute_amplitude']
        primary_start, primary_final = self.manual_windows.get_time_window('primary')
        multiple_1_start, multiple_1_final = self.manual_windows.get_time_window('multiple_1')
        multiple_2_start, multiple_2_final = self.manual_windows.get_time_window('multiple_2')

        for feature_label in time_features:

            if feature_label=='primary-max_time':
                result = self.extract_max_time(primary_start, primary_final)
            elif feature_label=='multiple_1-zero_crossing_time':
                result = self.extract_zero_crossing_time(multiple_1_start, multiple_1_final)
            elif feature_label=='multiple_2-min_time':
                result = self.extract_min_time(multiple_2_start, multiple_2_final)
            else:
                print('logger.warning feature {} not yet supported'.format(feature_label))
                result = None
            output_label = '{}-{}'.format(self.trace.component_id, feature_label)
            extracted_features_dict[output_label] = result

        for feature_label in amplitude_features:

            window_label = feature_label.split('-integrated_absolute_amplitude')[0]
            if window_label=='primary':
                reference_label = 'primary-max_time'; rotate_angle=False;
            elif window_label=='multiple_1':
                reference_label = 'multiple_1-zero_crossing_time'; rotate_angle=-90.0;
            elif window_label=='multiple_2':
                reference_label = 'multiple_2-min_time'; rotate_angle=False;
            else:
                reference_label = None
                print('bugger off!')
                continue

            window_center_time_label = '{}-{}'.format(self.trace.component_id, reference_label)
            window_center = extracted_features_dict[window_center_time_label]

            result = self.extract_average_absolute_amplitude(window_center,
                    self.amplitude_windows.half_widths[window_label],
                    rotate_angle=rotate_angle)

            output_label = '{}-{}'.format(self.trace.component_id, feature_label)
            extracted_features_dict[output_label] = result

        feature_deriver = IntermediateFeatureDeriver(self.trace.component_id,
                                                     df_dict=extracted_features_dict)
        extracted_features_dict = feature_deriver.derive_features(self.trace.component_id)

        for key in extracted_features_dict.keys():
            extracted_features_dict['J2-{}'.format(key)] = extracted_features_dict.pop('{}'.format(key))
        return extracted_features_dict




