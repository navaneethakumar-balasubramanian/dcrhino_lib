import numpy as np
import pandas as pd
from datetime import datetime

from dcrhino.feature_extraction.supporting_minimal_feature_extraction import get_zero_crossing_samples
from dcrhino.feature_extraction.supporting_minimal_feature_extraction import get_trough_times
from dcrhino.feature_extraction.supporting_minimal_feature_extraction import extract_features_from_multiple_wavelet
#from dcrhino.feature_extraction.supporting_minimal_feature_extraction import extract_features_from_primary_wavelet
import pdb
ACOUSTIC_VELOCITY = 4755.0

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



class FeatureExtractor():

    def __init__(self,output_sampling_rate,primary_window_halfwidth_ms,multiple_window_search_width_ms,sensor_distance_to_source):
        self.primary_window_halfwidth_ms = primary_window_halfwidth_ms
        self.multiple_window_search_width_ms = multiple_window_search_width_ms
        self.sensor_distance_to_source = sensor_distance_to_source

        self.COMPONENT_WAVELET_MAP = {}
        self.COMPONENT_WAVELET_MAP['axial'] = ['primary', 'multiple']
        self.COMPONENT_WAVELET_MAP['tangential'] = ['primary',]
        self.COMPONENT_WAVELET_MAP['radial'] = ['primary',]

        self.WAVELET_FEATURES = {}
        self.WAVELET_FEATURES['axial'] = ['peak_amplitude', 'peak_sample', 'peak_time',
                        'peak_time_sample', 'zero_crossing_prior', 'zero_crossing_after',
                        'area', 'pk_error', 'zx_error', 'zero_crossing_prior_sample',
                        'zero_crossing_after_sample', 'left_trough_time', 'left_trough_time_sample']

        self.WAVELET_FEATURES['tangential'] = ['peak_sample',]
        self.WAVELET_FEATURES['radial'] = ['peak_sample',]

        self.output_sampling_rate = output_sampling_rate

    def get_earliest_expected_mulitple_time(self):
        travel_distance = 2 * self.sensor_distance_to_source
        theoretical_two_way_travel_time = travel_distance / ACOUSTIC_VELOCITY
        earliest_multiple_time = theoretical_two_way_travel_time #WHY
        return earliest_multiple_time

    def get_wavelet_window_indices(self, time_vector, start_time, end_time):
        """
        20170823: this intended to replace variations on method from primary, multiple_peak_finder, multiple_refined,
        Here start and end times are intended to be floats
        """
        indices = np.where( (time_vector > start_time) & (time_vector < end_time) )[0]

        return indices

    def extract_features_from_primary_wavelet(self, tr, time_vector,
                                              component, wavelet_type):
        """
        TODO: migrate this to seismic processing eventually

        """
        primary_window_halfwidth = self.primary_window_halfwidth_ms * 1e-3

        #pdb.set_trace()
        primary_wavelet_indices_1 = self.get_wavelet_window_indices(time_vector,
                                                               -primary_window_halfwidth,
                                                               primary_window_halfwidth)


        tr.data = np.asarray(tr.data)

        window_to_search_for_primary_1 = tr.data[primary_wavelet_indices_1]
        hopefully_prim_peak_ndx = np.argmax(window_to_search_for_primary_1)
        hopefully_prim_center_time = time_vector[primary_wavelet_indices_1][hopefully_prim_peak_ndx]

        primary_fit_lower_bound = hopefully_prim_center_time - primary_window_halfwidth
        primary_fit_upper_bound = hopefully_prim_center_time + primary_window_halfwidth
        primary_wavelet_indices_2 = self.get_wavelet_window_indices(time_vector,
                                                               primary_fit_lower_bound,
                                                               primary_fit_upper_bound)
        primary_wavelet = tr.data[primary_wavelet_indices_2]
        primary_time_vector = time_vector[primary_wavelet_indices_2]

        wffe = WaveletForFeatureExtraction(primary_wavelet,primary_time_vector,self.WAVELET_FEATURES,
                                           component=component, wavelet_type=wavelet_type)

        wffe.peak_sample = np.max(window_to_search_for_primary_1)
        wffe.peak_time_sample = hopefully_prim_center_time
        if np.max(tr.data)==np.max(window_to_search_for_primary_1):#sanity check;
            reference_index = np.argmax(tr.data)
            try:
                zx_left, zx_right = get_zero_crossing_samples(reference_index, tr.data, time_vector)
            except IndexError:
                print("?? - index erroR")
                zx_left = np.nan; zx_right = np.nan
                print("last timethis was a werid trace having shape of a heavisidcfctn")
                #pdb.set_trace()
            try:
                left_trough_time, left_trough_time_sample = get_trough_times(reference_index, tr.data, time_vector)
            except ValueError:
                left_trough_time = np.nan; left_trough_time_sample = np.nan
                print("emptyseq?? - last timethis was a zero trace")
                #pdb.set_trace()
        else:
            zx_left = np.nan; zx_right = np.nan
            left_trough_time = np.nan; left_trough_time_sample = np.nan;
        wffe.zero_crossing_prior_sample = zx_left
        wffe.zero_crossing_after_sample = zx_right
        wffe.left_trough_time = left_trough_time
        wffe.left_trough_time_sample = left_trough_time_sample
        return wffe

    def create_features_dictionary(self,data_datetime):
        """
        """
        num_traces_per_component = 1
        feature_dict = {}
        for component in self.COMPONENT_WAVELET_MAP.keys():
            for wavelet_type in self.COMPONENT_WAVELET_MAP[component]:
                for wavelet_feature in self.WAVELET_FEATURES[component]:
                    feature_string = '{}_{}_{}'.format(component, wavelet_type, wavelet_feature)
                    feature_dict[feature_string] = None
                    #feature_dict[feature_string] = np.full(num_traces_per_component, np.nan, dtype='float32')
                    #feature_dict[feature_string] = pd.Series(feature_dict[feature_string], )
        #for k, v in feature_dict.iteritems():
        #    feature_dict[k] = pd.Series(v, index=[data_datetime,])
        return feature_dict


    def extract_features(self, data_datetime, axial_trace, tangential_trace,
                         radial_trace, n_samples, min_lag):
        """
        this be an atomic feature extractor, taking as input a single time chunk,
        1s (for now).
        """
        #data_datetime = trace.date
        df_dict = self.create_features_dictionary(data_datetime)
        if axial_trace is None:
            df_dict['datetime'] = datetime.utcfromtimestamp(data_datetime)
            df_dict['datetime_ts'] = data_datetime
            return df_dict
        ctr = 0
        #for i_comp, component in enumerate(self.COMPONENT_WAVELET_MAP.keys()):

        ctr+=1

        for component in self.COMPONENT_WAVELET_MAP:
            for wavelet_type in self.COMPONENT_WAVELET_MAP[component]:
                if component == 'axial':

                    packet = CorrelatedTracePacket(self.output_sampling_rate,n_samples,min_lag)
                    packet.data = axial_trace
                    time_vector = packet.time_vector

                    if wavelet_type=='primary':
                        wffe = self.extract_features_from_primary_wavelet(packet, time_vector, component, wavelet_type)
                    elif wavelet_type=='multiple':
                        earliest_multiple_time = self.get_earliest_expected_mulitple_time() - (2.0 * packet.dt)
                        latest_multiple_time =  earliest_multiple_time + self.multiple_window_search_width_ms*1e-3
                        wffe = extract_features_from_multiple_wavelet(packet, time_vector, earliest_multiple_time,
                                                                      latest_multiple_time, component, wavelet_type)
                    else:
                        #logger.critical("Unsupported Wavelet Type {}".format(wavelet_type))
                        raise Exception
                elif component == 'tangential':
                    #print (component)
                    packet = CorrelatedTracePacket(self.output_sampling_rate,n_samples,min_lag)
                    packet.data = tangential_trace
                    time_vector = packet.time_vector

                    wffe = self.extract_features_from_primary_wavelet(packet, time_vector,
                                                                     component, wavelet_type)

                else :
                    packet = CorrelatedTracePacket(self.output_sampling_rate,n_samples,min_lag)
                    packet.data = radial_trace
                    time_vector = packet.time_vector
                    wffe = self.extract_features_from_primary_wavelet(packet, time_vector,
                                                                     component, wavelet_type)
                #pdb.set_trace()
                for attr in self.WAVELET_FEATURES[component]:
                    label = '{}_{}_{}'.format(component, wavelet_type, attr)

                        #pdb.set_trace()
                    df_dict[label] = wffe.__getattribute__(attr)
                    #print ("Setting label" + label +  " as " + str(wffe.__getattribute__(attr)))


        if ctr == 0:
            print ("Couldnt find this date in database " + str(data_datetime ))
            return None

        df_dict['datetime'] = datetime.utcfromtimestamp(data_datetime)
        df_dict['datetime_ts'] = data_datetime
        #pdb.set_trace()

        return df_dict
