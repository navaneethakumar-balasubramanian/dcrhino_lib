from dcrhino.models.feature_extracted import FeatureExtractedModel
from dcrhino.models.trace import TraceModel
from dcrhino.feature_extraction.supporting_minimal_feature_extraction import create_features_dictionary
from dcrhino.feature_extraction.supporting_minimal_feature_extraction import COMPONENT_WAVELET_MAP
from dcrhino.feature_extraction.supporting_minimal_feature_extraction import extract_features_from_primary_wavelet
from dcrhino.feature_extraction.supporting_minimal_feature_extraction import extract_features_from_multiple_wavelet
from dcrhino.feature_extraction.supporting_minimal_feature_extraction import WAVELET_FEATURES
import numpy as np
import pdb

ACOUSTIC_VELOCITY = 4755.0



class CorrelatedTracePacket():
    def __init__(self, **kwargs):
        """
        metadata requirements: sampling rate, time_vector
        """
        self.data = None
        self.meta_1 = 'for example'
        self.sampling_rate = self.get_sampling_rate()

        self.n_samples = 640
        self.min_lag = 0.1

        #<expected in the header>
        #sensor_distance_to_source = 16.37
        #sampling_rate = 3200.0
        # derivable from packet header, these are setting needed on rhino to process
        #n_samples=640
        #min_lag=0.1
        #</expected in the header>


    def get_sampling_rate(self):
        """
        This should be in the header of the packet stream;
        """
        return 3200.0

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

    def __init__(self,cfg,db):
        self.config = cfg
        self.primary_window_halfwidth_ms = self.config.getint('EXTRACTOR', 'primary_window_halfwidth_ms')
        self.multiple_window_search_width_ms = self.config.getfloat('EXTRACTOR', 'multiple_window_search_width_ms')
        self.db = db
        self.sensor_distance_to_source = 16.37

    def get_earliest_expected_mulitple_time(self):
        travel_distance = 2 * self.sensor_distance_to_source
        theoretical_two_way_travel_time = travel_distance / ACOUSTIC_VELOCITY
        earliest_multiple_time = theoretical_two_way_travel_time #WHY
        return earliest_multiple_time

    def load_trace_from_database(self,component, data_datetime,db):
        sql = "SELECT * FROM $table where date = '" + str(data_datetime) + "' and component='" + component + "'"
        #sql = "SELECT * FROM $table where date >= '" + str(_from) + "' and date <= '" + str(to) + "'"
        #print (sql)
        #traces_list = []



        counter = 0
        trace_model = None
        for trace_model in  db.select(sql, model_class=TraceModel) :
            counter += 1
            if counter == 2:
                raise Exception("THERE SHOULD BE ONLY ONE RESULT FOR THIS QUERY IN DATABASE ",sql)

        return trace_model


    def extract_features_from_database(self,data_datetime):
        """
        this be an atomic feature extractor, taking as input a single time chunk,
        1s (for now).
        """
        #data_datetime = trace.date
        df_dict = create_features_dictionary(data_datetime)
        ctr = 0
        for i_comp, component in enumerate(COMPONENT_WAVELET_MAP.keys()):
            trace = self.load_trace_from_database(component, data_datetime,self.db)
            if trace != None:
                ctr+=1
                data = trace.data
                packet = CorrelatedTracePacket()
                packet.data = data
                time_vector = packet.time_vector

                for wavelet_type in COMPONENT_WAVELET_MAP[component]:
                    if component == 'axial':
                        if wavelet_type=='primary':
                            wffe = extract_features_from_primary_wavelet(packet, time_vector,
                                                                         self.primary_window_halfwidth_ms, component, wavelet_type)
                        elif wavelet_type=='multiple':
                            earliest_multiple_time = self.get_earliest_expected_mulitple_time() - (2.0 * packet.dt)
                            latest_multiple_time =  earliest_multiple_time + self.multiple_window_search_width_ms*1e-3
                            wffe = extract_features_from_multiple_wavelet(packet, time_vector, earliest_multiple_time,
                                                                          latest_multiple_time, component, wavelet_type)
                        else:
                            logger.critical("Unsupported Wavelet Type {}".format(wavelet_type))
                            raise Exception
                    else:
                        #print (component)
                        wffe = extract_features_from_primary_wavelet(packet, time_vector,
                                                                     self.primary_window_halfwidth_ms,
                                                                     component, wavelet_type)
                    #pdb.set_trace()
                    for attr in WAVELET_FEATURES[component]:
                        label = '{}_{}_{}'.format(component, wavelet_type, attr)

                            #pdb.set_trace()
                        df_dict[label] = wffe.__getattribute__(attr)
                        #print ("Setting label" + label +  " as " + str(wffe.__getattribute__(attr)))


        if ctr == 0:
            print ("Couldnt find this date in database " + str(data_datetime ))
            return None

        result = FeatureExtractedModel(date=data_datetime,
                                radial_primary_peak_sample=df_dict['radial_primary_peak_sample'],
                                tangential_primary_peak_sample=df_dict['tangential_primary_peak_sample'],
                                axial_multiple_peak_sample=df_dict['axial_multiple_peak_sample'],
                                axial_multiple_peak_time_sample=df_dict['axial_multiple_peak_time_sample'],
                                axial_multiple_pk_error=df_dict['axial_multiple_pk_error'],
                                axial_primary_left_trough_time=df_dict['axial_primary_left_trough_time'],
                                axial_primary_left_trough_time_sample=df_dict['axial_primary_left_trough_time_sample'],
                                axial_primary_peak_sample=df_dict['axial_primary_peak_sample'],
                                axial_primary_peak_time_sample=df_dict['axial_primary_peak_time_sample'],
                                axial_primary_zero_crossing_after_sample=df_dict['axial_primary_zero_crossing_after_sample'],
                                axial_primary_zero_crossing_prior_sample=df_dict['axial_primary_zero_crossing_prior_sample'])

        return result
