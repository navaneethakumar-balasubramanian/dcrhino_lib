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

.. note:: Originally this was picking values on windows based on multiple, theoretical times
and then picks based on manual windows.  Then we switched to jazz1 (originally called
"additional_pick_based" features).  Then jazz2 was requested, this is basically a way
to non-manually pick the windows for jazz1 but rather to select them based on zero-crossings.
This was implemented but before it ran we we changed it again to jazz3.  This is like jazz2
but we only consider the region between the peak of the primary and the first trough to the left and right.

.. todo:: factor the additional_pick_based_amplitude_windows (original manual jazz hack out)
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
from dcrhino3.feature_extraction.jazz_with_zero_crossings import estimate_trough_width
from dcrhino3.feature_extraction.jazz3 import jazz3
#from feature_extractor_j1a import calculate_boolean_features


logger = init_logging(__name__)

def full_feature_label(component_id, wavelet_id, feature_id):
    """

    :param component_id:
    :param wavelet_id:
    :param feature_id:
    :return:
    """
    output_label = '{}-{}-{}'.format(component_id, wavelet_id, feature_id)
    return output_label

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
        self.jazz3_wavelets = []
        try:
            self.jazz1_amplitude_windows = getattr(transformed_args.jazz1_amplitude_windows, component_id)
        except:
            self.jazz1_amplitude_windows = getattr(transformed_args.additional_pick_based_amplitude_windows, component_id)
        except:
            self.jazz1_amplitude_windows = None

        try:
            self.jazz2_wavelets = getattr(transformed_args.jazz2_wavelets, component_id)
        except:
            self.jazz2_wavelets = []
        try:
            self.jazz3_wavelets = getattr(transformed_args.jazz3_wavelets, component_id)
        except:
            self.jazz3_wavelets = []#['primary',]
            
        #</fix this up>

    

    def extract_integrated_amplitudes(self, time_center, window_half_width, rotate_angle=False):
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
        integral = dt * np.sum(window_data) / window_duration
        absolute_integral = dt * np.sum(np.abs(window_data)) / window_duration
        return integral, absolute_integral

    def jazz1(self, extracted_features_dict):
        """
        probably make this an extension of FeatureExtractorJ2() would be cleaner codewise
        """
        for wavelet_id  in self.jazz1_amplitude_windows._fields:
            bounds = getattr(self.jazz1_amplitude_windows,wavelet_id)
            search_feature = self.manual_windows.get_search_feature(wavelet_id)
            wavelet_reference_label = '{}_time'.format(search_feature)
            pick_time_key = '{}-{}-{}'.format(self.trace.component_id, wavelet_id, wavelet_reference_label)
            pick_time = extracted_features_dict[pick_time_key]
            for lr in ['left', 'right']:
                lower_bound_offset = getattr(bounds, '{}_lower_bound_offset'.format(lr))
                window_lower_bound = pick_time + lower_bound_offset
                upper_bound_offset = getattr(bounds, '{}_upper_bound_offset'.format(lr))
                window_upper_bound = pick_time + upper_bound_offset
                window_half_width = (window_upper_bound - window_lower_bound) / 2.0
                window_center = window_lower_bound + window_half_width
                integral, absolute_integral = self.extract_integrated_amplitudes(window_center,
                                                    window_half_width,
                                                    rotate_angle=False)
                
                feature_label = 'jazz1_{}_integrated_amplitude'.format(lr)
                output_label = full_feature_label(self.trace.component_id, wavelet_id, feature_label)
                extracted_features_dict[output_label] = integral
                feature_label = 'jazz1_{}_integrated_absolute_amplitude'.format(lr)
                output_label = full_feature_label(self.trace.component_id, wavelet_id, feature_label)
                extracted_features_dict[output_label] = absolute_integral


            #<jazz_center>
            lower_bound_offset = getattr(bounds, 'left_upper_bound_offset')
            window_lower_bound = pick_time + lower_bound_offset
            upper_bound_offset = getattr(bounds, 'right_lower_bound_offset')
            window_upper_bound = pick_time + upper_bound_offset
            window_half_width = (window_upper_bound - window_lower_bound) / 2.0
            window_center = window_lower_bound + window_half_width
            integral, absolute_integral = self.extract_integrated_amplitudes(window_center,
                                                                             window_half_width,
                                                                             rotate_angle=False)
            feature_label = 'jazz1_center_integrated_amplitude'
            output_label = full_feature_label(self.trace.component_id, wavelet_id, feature_label)
            extracted_features_dict[output_label] = integral
            feature_label = 'jazz1_center_integrated_absolute_amplitude'
            output_label = full_feature_label(self.trace.component_id, wavelet_id, feature_label)
            extracted_features_dict[output_label] = absolute_integral
            #</jazz_center>
        return extracted_features_dict
        #</HACK>

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
            output_label = full_feature_label(self.trace.component_id, wavelet_id, reference_label)
            extracted_features_dict[output_label] = result

        if self.jazz1_amplitude_windows is not None:
            extracted_features_dict = self.jazz1(extracted_features_dict)

        for wavelet_id in self.jazz2_wavelets:
            bpf_center_frequency = np.mean([self.transformed_args.trapezoidal_bpf_corner_2,
                                        self.transformed_args.trapezoidal_bpf_corner_3])
            bpf_period = 1./bpf_center_frequency
            expected_trough_duration = estimate_trough_width(bpf_period, self.trace.component_id)
            center_time_key = '{}-{}-maximum_time'.format(self.trace.component_id, wavelet_id)
            wavelet_center_time = extracted_features_dict[center_time_key]
            jazz2_dict = jazz2(self.trace, wavelet_center_time, expected_trough_duration, wavelet_id=wavelet_id)
            for feature_id, feature_value in jazz2_dict.items():
                output_label = full_feature_label(self.trace.component_id, wavelet_id, feature_id)
                extracted_features_dict[output_label] = feature_value

        for wavelet_id in self.jazz3_wavelets:
            bpf_center_frequency = np.mean([self.transformed_args.trapezoidal_bpf_corner_2,
                                        self.transformed_args.trapezoidal_bpf_corner_3])
            bpf_period = 1./bpf_center_frequency
            expected_trough_duration = estimate_trough_width(bpf_period, self.trace.component_id)
            center_time_key = '{}-{}-maximum_time'.format(self.trace.component_id, wavelet_id)
            wavelet_center_time = extracted_features_dict[center_time_key]
            jazz3_dict = jazz3(self.trace, wavelet_center_time, expected_trough_duration, wavelet_id=wavelet_id)
            for feature_id, feature_value in jazz3_dict.items():
                output_label = full_feature_label(self.trace.component_id, wavelet_id, feature_id)
                extracted_features_dict[output_label] = feature_value

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
                integral, absolute_integral  = self.extract_integrated_amplitudes(window_center,
                                                                                  amplitude_window.half_width,
                                                                                  rotate_angle=rotate_angle)
            output_label = full_feature_label(self.trace.component_id, wavelet_id, amplitude_window.feature)
            extracted_features_dict[output_label] = absolute_integral

        feature_deriver = IntermediateFeatureDeriver(self.trace.component_id, self.manual_windows,
                                                     df_dict=extracted_features_dict)
        extracted_features_dict = feature_deriver.derive_features(self.trace.component_id)
        output_dict = {}
        for key in extracted_features_dict.keys():
            output_dict['J2-{}'.format(key)] = extracted_features_dict[('{}'.format(key))]
        return output_dict




