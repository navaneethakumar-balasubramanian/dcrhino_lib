"""
Author kkappler
.. todo:: The logic for amplitude picking is still dependant on some assumptions about time picking.  This should be changed.
Will do after time-picking for polarity-aware zero-crossings is implemented.

.. todo:: Add support for max, min as well as integrated absolute amplitude for ampltiude_picks

.. todo:: Differentiate between integrated absolute amplitude and integrated average amplitude

.. todo:: Add to doc the choices for the json and what is needed or not; Especially
time_picks is one of {maxmium, minimum, zero_crossing, zero_crossing_positive_slope, zero_crossing_negative_slope,
amplitude_picks  is one of {integrated_absolute_amplitude, maximum_value, minimum_value}

.. todo:: Describe the logic for phase rotation and calculation of ampltiudes based on time_pick and wavelet_id;
i.e. primary, integrated_absolute_amplitude, is centered on the time_pick,
multiple_1, integrated_absolute_amplitude, is centered on the zero_crossing time_pick, with data -90deg rotated
but in general we should have a tree of {time_pick_type, amplitude_pick_type} --> algortihm description

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
from dcrhino3.feature_extraction.feature_windowing import AmplitudeWindows
from dcrhino3.feature_extraction.feature_windowing import ManualTimeWindows
from dcrhino3.feature_extraction.intermediate_derived_features_j2 import IntermediateFeatureDeriver
#from dcrhino3.helpers.general_helper_functions import flatten
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.signal_processing.time_picker import TimePicker
from dcrhino3.signal_processing.phase_rotation import rotate_phase
from dcrhino3.feature_extraction.jazz_with_zero_crossings import jazz2
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

        try:
            self.sampling_rate = transformed_args.upsample_sampling_rate
        except AttributeError:
            self.sampling_rate = transformed_args.output_sampling_rate
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

        self.jazz2_wavelets = []
        try:
            self.additional_pick_based_amplitude_windows = getattr(transformed_args.additional_pick_based_amplitude_windows, component_id)
        except:
            self.additional_pick_based_amplitude_windows = None

        try:
            self.jazz2_wavelets = getattr(transformed_args.jazz2_wavelets, component_id)
        except:
            self.jazz2_wavelets = []
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
        .. todo:: lists of time_wavelets to pick should be taken from json, rather than explicitly hard coded here
        .. todo:: review rotation angles for mult1/3 zerocrossings
        .. todo:: remove support for ambiguous zero_crossing pick type


        """
        extracted_features_dict = {}
        time_wavelets_to_pick = ['primary', 'multiple_1', 'multiple_2', 'multiple_3']
        amplitude_wavelets_to_pick = time_wavelets_to_pick

        for wavelet_id in time_wavelets_to_pick:
            search_feature = self.manual_windows.get_search_feature(wavelet_id)
            reference_label = '{}_time'.format(search_feature)
            start, final = self.manual_windows.get_time_window(wavelet_id)

            if start>=final:
                logger.error('window end time must be greater than start time - applying adhoc correction')
                final = start+0.004

            result = self.trace.extract_time_pick(start, final, search_feature)

            output_label = '{}-{}-{}'.format(self.trace.component_id, wavelet_id, reference_label)
            extracted_features_dict[output_label] = result
        #<HACK>
        if self.additional_pick_based_amplitude_windows is not None:
            for wavelet_id  in self.additional_pick_based_amplitude_windows._fields:
                #print(wavelet_id);#wavelet_id = 'multiple_1';#wavelet_id = 'primary'
                bounds = getattr(self.additional_pick_based_amplitude_windows,wavelet_id)
                search_feature = self.manual_windows.get_search_feature(wavelet_id)
                wavelet_reference_label = '{}_time'.format(search_feature)
                pick_time_key = '{}-{}-{}'.format(self.trace.component_id, wavelet_id, wavelet_reference_label)
                pick_time = extracted_features_dict[pick_time_key]

                left_window_lower_bound = pick_time + bounds.left_lower_bound_offset
                left_window_upper_bound = pick_time + bounds.left_upper_bound_offset
                left_window_half_width = (left_window_upper_bound - left_window_lower_bound)/2.0
                left_window_center = left_window_lower_bound + left_window_half_width
                #print('dogs')
                result = self.extract_average_absolute_amplitude(left_window_center,
                                                        left_window_half_width,
                                                        rotate_angle=False)
                output_label = '{}-{}-{}'.format(self.trace.component_id, wavelet_id, 'additional_pick_based_left_integrated_absolute_amplitude')
                extracted_features_dict[output_label] = result

                right_window_lower_bound = pick_time + bounds.right_lower_bound_offset
                right_window_upper_bound = pick_time + bounds.right_upper_bound_offset
                right_window_half_width = (right_window_upper_bound - right_window_lower_bound) / 2.0
                right_window_center = right_window_lower_bound + right_window_half_width
                #print('cats')
                result = self.extract_average_absolute_amplitude(right_window_center,
                                                                 right_window_half_width,
                                                                 rotate_angle=False)
                output_label = '{}-{}-{}'.format(self.trace.component_id, wavelet_id,
                                                 'additional_pick_based_right_integrated_absolute_amplitude')
                extracted_features_dict[output_label] = result
        #</HACK>
        for wavelet_id in self.jazz2_wavelets:
            #print('jazz2 {}'.format(wavelet_id))
            center_time_key = '{}-{}-maximum_time'.format(self.trace.component_id, wavelet_id)
            wavelet_center_time = extracted_features_dict[center_time_key]
            jazz2(self.trace, wavelet_center_time)
        for wavelet_id in amplitude_wavelets_to_pick:
            amplitude_window = self.amplitude_windows.windows[wavelet_id]
            search_feature = self.manual_windows.get_search_feature(wavelet_id)
            reference_label = '{}_time'.format(search_feature)
            rotate_angle = False
            if search_feature == "zero_crossing_negative_slope":
                rotate_angle = -90.0;
            elif search_feature == "zero_crossing_positive_slope":
                rotate_angle = 90.0;
            elif search_feature == "zero_crossing":
                if wavelet_id == 'multiple_1':
                    rotate_angle = -90.0;
                elif wavelet_id == 'multiple_3':
                    rotate_angle = 90.0;

            window_center_time_label = '{}-{}-{}'.format(self.trace.component_id, wavelet_id, reference_label)
            window_center = extracted_features_dict[window_center_time_label]
            if amplitude_window.feature=='integrated_absolute_amplitude':
                amplitude_window.center_time = window_center
                result = self.extract_average_absolute_amplitude(window_center,
                                                    amplitude_window.half_width,
                                                    rotate_angle=rotate_angle)
            output_label = '{}-{}-{}'.format(self.trace.component_id, wavelet_id, amplitude_window.feature)
            extracted_features_dict[output_label] = result

        feature_deriver = IntermediateFeatureDeriver(self.trace.component_id, self.manual_windows,
                                                     df_dict=extracted_features_dict)
        extracted_features_dict = feature_deriver.derive_features(self.trace.component_id)
        output_dict = {}
        for key in extracted_features_dict.keys():
            output_dict['J2-{}'.format(key)] = extracted_features_dict[('{}'.format(key))]
        return output_dict




