"""
@TODO: remove explicit declaration of ACOUSTIC_VELOCITY, and replace with
value from global_config

"""
import numpy as np
import pdb
from datetime import datetime

from dcrhino3.feature_extraction.j0_derived_features import J0FeatureDeriver
#from dcrhino3.feature_extraction.supporting_minimal_feature_extraction import get_zero_crossing_samples
#from dcrhino3.feature_extraction.supporting_minimal_feature_extraction import get_trough_times
from dcrhino3.feature_extraction.supporting_minimal_feature_extraction import extract_features_from_multiple_wavelet
from dcrhino3.feature_extraction.supporting_minimal_feature_extraction import extract_features_from_primary_wavelet


class WaveletForFeatureExtraction(object):
    """
    This is intended to calculate features on individual wavelets.  Actually
    the data here are "windows".  we think there are wavelets in these windows
    much of the time.

    """
    def  __init__(self, data, time_vector, wavelet_features, **kwargs):
        self.data = data
        self.time_vector = time_vector
        self.component = kwargs.get('component', None)
        self.wavelet_type = kwargs.get('wavelet_type', None)
        for k in wavelet_features[self.component]:
            setattr(self, k, np.nan)


class CorrelatedTracePacket():
    def __init__(self, sampling_rate,n_samples=640,min_lag=0.1):
        """
        metadata requirements: sampling rate, time_vector
        """
        self.data = None
        self.sampling_rate = sampling_rate

        self.n_samples = n_samples
        self.min_lag = min_lag



    @property
    def time_vector(self):
        """
        TODO: check that self.max_lag = timevector[-1]+dt
        """
        dt = 1./self.sampling_rate
        time_vector = dt * np.arange(self.n_samples)

        time_vector -= self.min_lag # if centerd at zero is desired
        #comment abive line out give you a "starts at zero" trace#
        return time_vector

    @property
    def dt(self):
        return 1./self.sampling_rate



class FeatureExtractorJ0():

    def __init__(self, transformed_args):#output_sampling_rate, primary_window_halfwidth_ms,
                 #multiple_window_search_width_ms, sensor_distance_to_source):
        """
        @warning: The declaration of min_lag_trimmed_trace as its absolute
        value is not good form:  np.abs(transformed_args.min_lag_trimmed_trace)
        """
        self.primary_window_halfwidth_ms = transformed_args.primary_window_halfwidth_ms
        self.multiple_window_search_width_ms = transformed_args.multiple_window_search_width_ms
        self.sensor_distance_to_source = transformed_args.sensor_distance_to_source
        self.output_sampling_rate = transformed_args.output_sampling_rate
        self.ACOUSTIC_VELOCITY = transformed_args.ACOUSTIC_VELOCITY
        self.n_samples_trimmed_trace = transformed_args.n_samples_trimmed_trace
        self.min_lag_trimmed_trace = np.abs(transformed_args.min_lag_trimmed_trace)

        self.COMPONENT_WAVELET_MAP = {}
        self.COMPONENT_WAVELET_MAP['axial'] = ['primary', 'multiple']
        self.COMPONENT_WAVELET_MAP['tangential'] = ['primary','multiple']
        self.COMPONENT_WAVELET_MAP['radial'] = ['primary',]

        self.WAVELET_FEATURES = {}
        self.WAVELET_FEATURES['axial'] = ['peak_amplitude', 'peak_sample', 'peak_time',
                        'peak_time_sample', 'zero_crossing_prior', 'zero_crossing_after',
                        'area', 'pk_error', 'zx_error', 'zero_crossing_prior_sample',
                        'zero_crossing_after_sample', 'left_trough_time', 'left_trough_time_sample']

        self.WAVELET_FEATURES['tangential'] = ['peak_sample','peak_time_sample']
        self.WAVELET_FEATURES['radial'] = ['peak_sample',]


    def get_earliest_expected_mulitple_time(self):
        travel_distance = 2 * self.sensor_distance_to_source
        theoretical_two_way_travel_time = travel_distance / self.ACOUSTIC_VELOCITY
        earliest_multiple_time = theoretical_two_way_travel_time #WHY
        return earliest_multiple_time

    def get_wavelet_window_indices(self, time_vector, start_time, end_time):
        """
        20170823: this intended to replace variations on method from primary, multiple_peak_finder, multiple_refined,
        Here start and end times are intended to be floats
        """
        indices = np.where( (time_vector > start_time) & (time_vector < end_time) )[0]

        return indices



    def create_features_dictionary(self, component_id):
        """
        """
        num_traces_per_component = 1
        feature_dict = {}
        #for component in self.COMPONENT_WAVELET_MAP.keys():
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
            packet = CorrelatedTracePacket(self.output_sampling_rate,
                                           self.n_samples_trimmed_trace,
                                           self.min_lag_trimmed_trace)
            packet.data = component_array
            #pdb.set_trace()
            if component_id == 'axial':

                if wavelet_type=='primary':
                    wffe = extract_features_from_primary_wavelet(packet, self.primary_window_halfwidth_ms,
                                                                 component_id, wavelet_type)
                elif wavelet_type=='multiple':
                    earliest_multiple_time = self.get_earliest_expected_mulitple_time() - (2.0 * packet.dt)
                    latest_multiple_time =  earliest_multiple_time + self.multiple_window_search_width_ms*1e-3
                    wffe = extract_features_from_multiple_wavelet(packet, packet.time_vector, earliest_multiple_time,
                                                                  latest_multiple_time, component_id, wavelet_type)
                else:
                    #logger.critical("Unsupported Wavelet Type {}".format(wavelet_type))
                    raise Exception
            elif component_id == 'tangential':

                if wavelet_type=='primary':
                    wffe = extract_features_from_primary_wavelet(packet, self.primary_window_halfwidth_ms,
                                                                 component_id, wavelet_type)
                elif wavelet_type=='multiple':
                    earliest_multiple_time = self.get_earliest_expected_mulitple_time() - (2.0 * packet.dt)
                    latest_multiple_time =  earliest_multiple_time + self.multiple_window_search_width_ms*1e-3
                    wffe = extract_features_from_multiple_wavelet(packet, packet.time_vector, earliest_multiple_time,
                                                                  latest_multiple_time, component_id, wavelet_type)
                else:
                    raise Exception

            else :
                wffe = extract_features_from_primary_wavelet(packet, self.primary_window_halfwidth_ms,
                                                             component_id, wavelet_type)
            #pdb.set_trace()
            for attr in self.WAVELET_FEATURES[component_id]:
                label = '{}_{}_{}'.format(component_id, wavelet_type, attr)

                    #pdb.set_trace()
                df_dict[label] = wffe.__getattribute__(attr)
                #print ("Setting label" + label +  " as " + str(wffe.__getattribute__(attr)))



        #NOTE THIS IS NOT a very desirable way to do these extracted features,
        #because array math will do once its in a dataframe ... but for now, lets leave it...
        print("component_id={}".format(component_id))
        #pdb.set_trace()
        j0_deriver = J0FeatureDeriver()
        j0_deriver.df_dict = df_dict

        if component_id == 'axial':
            j0_deriver.df_dict = df_dict
            df_dict['pseudo_ucs'] = j0_deriver.pseudo_ucs_sample
            df_dict['pseudo_velocity'] = j0_deriver.primary_pseudo_velocity_sample
            df_dict['pseudo_density'] = j0_deriver.primary_pseudo_density_sample
            df_dict['reflection_coefficient'] = j0_deriver.reflection_coefficient_sample
            df_dict['axial_delay'] = df_dict['axial_multiple_peak_time_sample'] - df_dict['axial_primary_peak_time_sample']
            df_dict['axial_velocity_delay'] = 1.0/(df_dict['axial_delay'])**3
        elif component_id == 'tangential':

            df_dict['tangential_RC'] = j0_deriver.tangential_reflection_coefficient_sample
            df_dict['tangential_delay'] = df_dict['tangential_multiple_peak_time_sample'] - df_dict['tangential_primary_peak_time_sample']
            df_dict['tangential_velocity_delay'] = 1.0/(df_dict['tangential_delay'])

        for key in df_dict.keys():
            df_dict['J0_{}'.format(key)] = df_dict.pop('{}'.format(key))

        df_dict['datetime'] = datetime.utcfromtimestamp(trace_timestamp)
        #df_dict['timestamp'] = trace_timestamp
        #pdb.set_trace()

        return df_dict
