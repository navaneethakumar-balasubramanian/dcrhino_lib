"""
@TODO: remove explicit declaration of ACOUSTIC_VELOCITY, and replace with
value from global_config

"""
import numpy as np
import pdb

from dcrhino3.feature_extraction.j0_derived_features import IntermediateFeatureDeriver
from dcrhino3.feature_extraction.supporting_minimal_feature_extraction import extract_features_from_multiple_wavelet
from dcrhino3.feature_extraction.supporting_minimal_feature_extraction import extract_features_from_primary_wavelet
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace




class FeatureExtractorJ0():

    def __init__(self, transformed_args):#output_sampling_rate, primary_window_halfwidth_ms,
                 #multiple_window_search_width_ms, sensor_distance_to_source):
        """
        @warning: The declaration of min_lag_trimmed_trace as its absolute
        value is not good form:  np.abs(transformed_args.min_lag_trimmed_trace)
        """
        try:
            self.sampling_rate = transformed_args.upsample_sampling_rate
        except AttributeError:
            self.sampling_rate = transformed_args.output_sampling_rate
            pass

        self.primary_window_halfwidth_ms = transformed_args.primary_window_halfwidth_ms
        self.multiple_window_search_width_ms = transformed_args.multiple_window_search_width_ms
        self.sensor_distance_to_source = transformed_args.sensor_distance_to_source
        self.ACOUSTIC_VELOCITY = transformed_args.ACOUSTIC_VELOCITY
        self.n_samples_trimmed_trace = transformed_args.n_samples_trimmed_trace
        self.min_lag_trimmed_trace = transformed_args.min_lag_trimmed_trace
        #self.max_lag_trimmed_trace = np.abs(transformed_args.max_lag_trimmed_trace)

        self.COMPONENT_WAVELET_MAP = {}
        self.COMPONENT_WAVELET_MAP['axial'] = ['primary', 'multiple_1']
        self.COMPONENT_WAVELET_MAP['tangential'] = ['primary','multiple_1']
        self.COMPONENT_WAVELET_MAP['radial'] = ['primary',]

        self.WAVELET_FEATURES = {}
        self.WAVELET_FEATURES['axial'] = ['max_amplitude', 'max_time']
        self.WAVELET_FEATURES['tangential'] = ['max_amplitude', 'max_time']
        self.WAVELET_FEATURES['radial'] = ['max_amplitude', 'max_time']


    def get_earliest_expected_mulitple_time(self):
        """
        TODO to be deprecated and replaced by supporting_j1.get_expected_multiple_times()
        """
        travel_distance = 2 * self.sensor_distance_to_source
        theoretical_two_way_travel_time = travel_distance / self.ACOUSTIC_VELOCITY
        earliest_multiple_time = theoretical_two_way_travel_time #WHY
        return earliest_multiple_time


    def create_features_dictionary(self, component_id):
        """
        """
        feature_dict = {}

        for wavelet_type in self.COMPONENT_WAVELET_MAP[component_id]:
            for wavelet_feature in self.WAVELET_FEATURES[component_id]:
                feature_string = '{}_{}_{}'.format(component_id, wavelet_type, wavelet_feature)
                feature_dict[feature_string] = None

        return feature_dict


    def extract_features(self, component_id, component_array, trace_timestamp,
                         transformed_args):
        """
        @note: min lag has an ambiguity in sign
        """
        df_dict = self.create_features_dictionary(component_id)

        for wavelet_type in self.COMPONENT_WAVELET_MAP[component_id]:
            wavelet_features = self.WAVELET_FEATURES[component_id]
            packet = SymmetricTrace(component_array, self.sampling_rate)
            #pdb.set_trace()
            if component_id == 'axial':

                if wavelet_type=='primary':
                    #pdb.set_trace()
                    wffe = extract_features_from_primary_wavelet(packet, self.primary_window_halfwidth_ms,
                                                                 component_id, wavelet_type, wavelet_features)
                elif wavelet_type=='multiple_1':
                    earliest_multiple_time = self.get_earliest_expected_mulitple_time() - (2.0 * packet.dt)
                    latest_multiple_time =  earliest_multiple_time + self.multiple_window_search_width_ms*1e-3
                    wffe = extract_features_from_multiple_wavelet(packet, packet.time_vector, earliest_multiple_time,
                                                                  latest_multiple_time, component_id, wavelet_type, wavelet_features)
                else:
                    #logger.critical("Unsupported Wavelet Type {}".format(wavelet_type))
                    raise Exception
            elif component_id == 'tangential':

                if wavelet_type=='primary':
                    wffe = extract_features_from_primary_wavelet(packet, self.primary_window_halfwidth_ms,
                                                                 component_id, wavelet_type,
                                                                 wavelet_features)
                elif wavelet_type=='multiple_1':
                    earliest_multiple_time = self.get_earliest_expected_mulitple_time() - (2.0 * packet.dt)
                    latest_multiple_time =  earliest_multiple_time + self.multiple_window_search_width_ms*1e-3
                    wffe = extract_features_from_multiple_wavelet(packet, packet.time_vector, earliest_multiple_time,
                                                                  latest_multiple_time, component_id, wavelet_type,
                                                                  wavelet_features)
                else:
                    raise Exception

            else :
                wffe = extract_features_from_primary_wavelet(packet, self.primary_window_halfwidth_ms,
                                                             component_id, wavelet_type,
                                                             self.WAVELET_FEATURES[component_id])
            #pdb.set_trace()
            for attr in self.WAVELET_FEATURES[component_id]:
                label = '{}_{}_{}'.format(component_id, wavelet_type, attr)
                df_dict[label] = wffe.__getattribute__(attr)
                #print ("Setting label" + label +  " as " + str(wffe.__getattribute__(attr)))



        #NOTE these derived features are better suited to a dataframe column-by-column
        #algebra method, but this will do in a pinch...
        feature_deriver = IntermediateFeatureDeriver(df_dict=df_dict)
        df_dict = feature_deriver.derive_features(component_id)


        for key in df_dict.keys():
            df_dict['J0_{}'.format(key)] = df_dict.pop('{}'.format(key))


        return df_dict
