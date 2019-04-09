"""
Author kkappler

Example json control block:

    {
        "type": "j2",
        "output_to_file": true,
        "args": {
          "upsample_sampling_rate": ["|global_config.upsample_sampling_rate|", 50000.0],
          "sensor_distance_to_source": "|global_config.sensor_distance_to_source|",
          "sensor_distance_to_shocksub": "|global_config.sensor_distance_to_shocksub|",
          "sensor_saturation_g": "|global_config.sensor_saturation_g|",
          "ACOUSTIC_VELOCITY": "|global_config.ACOUSTIC_VELOCITY|",
          "SHEAR_VELOCITY": "|global_config.SHEAR_VELOCITY|",
          "time_picks" : {
              "axial": {
                  "primary": "maximum",
                  "multiple_1": "zero_crossing",
                  "multiple_2": "minimum",
                  "multiple_3": "zero_crossing"
              },
              "tangential": {
                "primary": "maximum",
                  "multiple_1": "zero_crossing",
                  "multiple_2": "minimum",
                  "multiple_3": "zero_crossing"
              }
              },
          "manual_time_windows" : {
              "axial": {
                  "primary": "|process_flow.axial_primary|",
                  "multiple_1": "|process_flow.axial_multiple_1|",
                  "multiple_2": "|process_flow.axial_multiple_2|",
                  "multiple_3": "|process_flow.axial_multiple_3|"
              },
              "tangential": {
                "primary": [-0.002, 0.002],
                "multiple_1": [0.013, 0.017],
                "multiple_2": [0.030, 0.034],
                "multiple_3": [0.044, 0.055]
              }
              },
        "amplitude_picks" : {
            "axial":{
            "primary": "integrated_absolute_amplitude",
            "multiple_1": "integrated_absolute_amplitude",
            "multiple_2": "integrated_absolute_amplitude",
            "multiple_3": "integrated_absolute_amplitude"
        },
            "tangential":{
            "primary": "integrated_absolute_amplitude",
            "multiple_1": "integrated_absolute_amplitude",
            "multiple_2": "integrated_absolute_amplitude",
            "multiple_3": "integrated_absolute_amplitude"
        }
      },
            "amplitude_half_widths" : {
            "axial":{
            "primary": 0.00105,
            "multiple_1": 0.00105,
            "multiple_2": 0.00105,
            "multiple_3": 0.00105
        },
            "tangential":{
            "primary": 0.00105,
            "multiple_1": 0.00105,
            "multiple_2": 0.00105,
            "multiple_3": 0.00105
        }
      }
    }
    },


"""
#import matplotlib.pyplot as plt
import numpy as np
import pdb

#from feature_windowing import TRACE_WINDOW_LABELS_FOR_FEATURE_EXTRACTION
from feature_windowing import AmplitudeWindows
from feature_windowing import ManualTimeWindows
#from dcrhino3.feature_extraction.intermediate_derived_features import IntermediateFeatureDeriver
from dcrhino3.feature_extraction.intermediate_derived_features_j2 import IntermediateFeatureDeriver
#from dcrhino3.helpers.general_helper_functions import flatten
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.time_picker import TimePicker
from dcrhino3.signal_processing.phase_rotation import rotate_phase

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
        .. todo: access sampling_rate from process_flow
        .. todo: merge extract_max_time, extract_min_time, extract_zero_crossing_time
            to get a single function that takes the "time_pick" argument.  Call it
            pick_time(start, end, pick_type).  Also, these can be methods of SymmetricTrace()
        """
        logger.warning("Without a hybrid module or at least the ability\
                       to add/read_from the process_flow we need this hokey, \
                       error prone handling of sampling rate below")
        try:
            self.sampling_rate = transformed_args.upsample_sampling_rate
        except AttributeError:
            self.sampling_rate = transformed_args.output_sampling_rate

        #self.trace = SymmetricTrace(trimmed_trace, self.sampling_rate, component_id=component_id)
        self.trace = TimePicker(trimmed_trace, self.sampling_rate, component_id=component_id)
        self.transformed_args = transformed_args
        manual_windows = getattr(transformed_args.manual_time_windows, component_id)
        time_picks = getattr(transformed_args.time_picks, component_id)
        self.manual_windows = ManualTimeWindows()
        self.manual_windows.populate_from_transformed_args(manual_windows, time_picks)

        #<fix this up>
        amplitude_half_widths = getattr(transformed_args.amplitude_half_widths, component_id)
        amplitude_picks = getattr(transformed_args.amplitude_picks, component_id)
        self.amplitude_windows = AmplitudeWindows()
        self.amplitude_windows.populate_from_transformed_args(amplitude_half_widths,
                                                              amplitude_picks)
        #</fix this up>



    def extract_average_absolute_amplitude(self, time_center, window_half_width, rotate_angle=False):
        trace_data = self.trace.data.copy()
        if rotate_angle:
            trace_data = rotate_phase(trace_data, rotate_angle)
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
        time_wavelets_to_pick = ['primary', 'multiple_1', 'multiple_2', 'multiple_3']
        amplitude_wavelets_to_pick = ['primary', 'multiple_1', 'multiple_2', 'multiple_3']

        for wavelet_id in time_wavelets_to_pick:
            search_feature = self.manual_windows.get_search_feature(wavelet_id)
            start, final = self.manual_windows.get_time_window(wavelet_id)
            #<HACK>
            if start>=final:
                logger.error('really? start is after the end? \
                             I refuse to work with this ... ')
                final = start+0.004
            #</HACK>
#            if wavelet_id=='multiple_1':
#                result = self.trace.extract_time_pick(start, final,
#                                                      search_feature, info='p2n')
            result = self.trace.extract_time_pick(start, final, search_feature)

            output_label = '{}-{}-{}_time'.format(self.trace.component_id, wavelet_id, search_feature)
            extracted_features_dict[output_label] = result

        for wavelet_id in amplitude_wavelets_to_pick:
            amplitude_window = self.amplitude_windows.windows[wavelet_id]

            if wavelet_id=='primary':
                reference_label = 'maximum_time'; rotate_angle=False;
            elif wavelet_id=='multiple_1':
                reference_label = 'zero_crossing_time'; rotate_angle=-90.0;
            elif wavelet_id=='multiple_2':
                reference_label = 'minimum_time'; rotate_angle=False;
            elif wavelet_id=='multiple_3':
                reference_label = 'zero_crossing_time'; rotate_angle=90;
            else:
                reference_label = None
                continue

            window_center_time_label = '{}-{}-{}'.format(self.trace.component_id, wavelet_id, reference_label)
            window_center = extracted_features_dict[window_center_time_label]
            if amplitude_window.feature=='integrated_absolute_amplitude':
                amplitude_window.center_time = window_center
                result = self.extract_average_absolute_amplitude(window_center,
                                                    amplitude_window.half_width,
                                                    rotate_angle=rotate_angle)
            output_label = '{}-{}-{}'.format(self.trace.component_id, wavelet_id, amplitude_window.feature)
            extracted_features_dict[output_label] = result

        feature_deriver = IntermediateFeatureDeriver(self.trace.component_id,
                                                     df_dict=extracted_features_dict)
        extracted_features_dict = feature_deriver.derive_features(self.trace.component_id)

        for key in extracted_features_dict.keys():
            extracted_features_dict['J2-{}'.format(key)] = extracted_features_dict.pop('{}'.format(key))
        return extracted_features_dict




