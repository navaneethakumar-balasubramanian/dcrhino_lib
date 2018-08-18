"""
Created on Fri Jun 22 17:59:10 2018

@author: kkappler

TODO: Add recursive cehck for sensor_type to measurand, much like sampling_rate
in uniform sampled

20180717:  This is a much needed upgrade to the processing framework.  Here I am
going to extract the trace_header #Calculations! from the corr2 measurand.

In this was corr2 will only do corr.  trace header will take corr as parent
and will have a .csv output.

TODO: Method to generate a corr+traceheader file for Bob, although for now
we could probably just give him .csv and the corr file.  Also,
I am cool with leaving default corr header processing as what it is, but for
Exploratory Data Analysis (EDA) we need this so we are not killing ourselves
with IO costs.
"""

from __future__ import absolute_import, division, print_function


import datetime
from hashlib import sha256
import numpy as np
import os
import pandas as pd
import pdb

from obspy.io.segy.core import _read_segy

from dcrhino.analysis.data_manager.temp_paths import ensure_dir
from dcrhino.analysis.graphical.unbinned_qc_log_plots_v3_west_angelas import QCLogPlotInput
from dcrhino.analysis.measurands.uniformly_sampled_measurand import UniformlySampledMeasurand
from dcrhino.analysis.signal_processing.seismic_processing import get_earliest_expected_mulitple_time
from dcrhino.analysis.signal_processing.seismic_processing import get_wavelet_window_indices#(time_vector, start_time, end_time):
from dcrhino.analysis.signal_processing.supporting_segy_processing import DataCloudTraceHeader
from dcrhino.analysis.supporting_processing import get_dummy_hole_ids_from_segy
from dcrhino.analysis.util.general_helper_functions import init_logging


from dcrhino.analysis.measurands.level_3.supporting_trace_header_features_measurand_v2_EDA import COMPONENT_WAVELET_MAP
from dcrhino.analysis.measurands.level_3.supporting_trace_header_features_measurand_v2_EDA import create_correlated_features_dictionary
from dcrhino.analysis.measurands.level_3.supporting_trace_header_features_measurand_v2_EDA import extract_features_from_primary_wavelet
from dcrhino.analysis.measurands.level_3.supporting_trace_header_features_measurand_v2_EDA import extract_features_from_multiple_wavelet
from dcrhino.analysis.measurands.level_3.supporting_trace_header_features_measurand_v2_EDA import add_wffe_to_feature_dict



#<DEBUG>
from dcrhino.analysis.supporting_processing import get_segy_trace_by_index
#</DEBUG>
logger = init_logging(__name__)

class DummyStream():
    def __init__(self):
        self.traces = None
class TraceHeaderFeaturesMeasurandEDA(UniformlySampledMeasurand):
    """
    TODO: NR to ensure n_components (integer) divides n_traces
    """
    def __init__(self, **kwargs):
        super(TraceHeaderFeaturesMeasurandEDA, self).__init__(**kwargs)
        self.extension = kwargs.get('extension', 'csv')
        self.label = 'trace_features_eda'
        self.multiple_search_back_ms = kwargs.get('multiple_search_back_ms', 0.0)
        self.multiple_search_forward_ms = kwargs.get('multiple_search_forward_ms', 3.0)
        self.primary_window_halfwidth_ms = kwargs.get('primary_window_halfwidth_ms', 2.0)
        self.multiple_window_halfwidth_ms = kwargs.get('multiple_window_halfwidth_ms', 1.0)
        self.multiple_window_search_width_ms = kwargs.get('multiple_window_search_width_ms', 3.126)
#    def sensor_directory(self, data_date):
#        date_string = data_date.date().__str__()
#        sensor_directory = os.path.join(self.data_level_path(2), date_string, self.sensor_type)
#        print("sensor_directory",sensor_directory)
#        #spdb.set_trace()
#        return sensor_directory

    @property
    def hash_id_string(self):
        """
        usage:
            THis one is a bit messy. The parameters that went into calculating
            the data are actually in the CorrelatedDeconvolvedMeasurand._make_from_parents
            Here we just load and create csv.
            Is it HashTime?  I think so ...
        """
        parent_string = self.parent_measurands[0].id_string
        #if as_hash:
        hashy_mchash = sha256('{}'.format(parent_string)).hexdigest()
        id_string = '{}_{}'.format(self.label, hashy_mchash[0:13])
#        else:
#            id_string = '{}_{}'.format(self.label, parent_string)
        return id_string

    @property
    def id_string(self):
        """
        usage:
            THis one is a bit messy. The parameters that went into calculating
            the data are actually in the CorrelatedDeconvolvedMeasurand._make_from_parents
            Here we just load and create csv.
        """
        parent_string = self.parent_measurands[0].id_string
        id_string = '{}_{}'.format(self.label, parent_string)
        return id_string

    def expected_filename(self, data_key, use_hash=True):
        """
        TODO: review whether basename should be a method
        """
        digitizer_id = data_key.digitizer_id
        data_level_path = self.data_level_path()# = temp_paths.levels[self.data_level].get_fullpath()
        full_stat_path = os.path.join(data_level_path, data_key.data_date.__str__())# + "UTC",

        #pdb.set_trace()
        if use_hash:
            basename = self.hash_id_string + '_' + digitizer_id + '.' + self.extension
        else:
            basename = self.id_string + '_' + digitizer_id + '.' + self.extension
        full_stat_file = os.path.join(full_stat_path, basename)
        return full_stat_file

    def _split_measurand_folder(self, data_key, component):
        """
        """
        parent_filename = self.parent_measurands[0].expected_filename(data_key)
        output_dir = os.path.dirname(parent_filename)
        output_dir = os.path.join(output_dir, 'split', data_key.digitizer_id, component)
        return output_dir

    def _split_to_npy(self, data_key):
        """
        flow: load the traces all as an obspy stream
        Then loop over the traces and save as vert_datetime, tang_datetime, radial_datetime

        """
        trace_header_operator = DataCloudTraceHeader()
        #pdb.set_trace()
        parent_filename = self.parent_measurands[0].expected_filename(data_key)
        tr = get_segy_trace_by_index(parent_filename, 0)

        #st = DummyStream(); st.traces = [tr,tr, tr, tr, tr, tr,tr, tr, tr]
        segy_file_to_read = self.parent_measurands[0].expected_filename(data_key)
        st = _read_segy(segy_file_to_read)
        rhino_channel_component_map = self.parent_measurands[0].rhino_channel_map(data_key, tr)

        component_labels = [rhino_channel_component_map[x] for x in [0,1,2]]
        for component_label in component_labels:
            output_dir = self._split_measurand_folder(data_key, component_label)
            ensure_dir(output_dir)
        for i_trace, tr in enumerate(st.traces):
            data_datetime = trace_header_operator.get_tracetime(tr)
            component = rhino_channel_component_map[i_trace % 3]
            output_dir = self._split_measurand_folder(data_key, component)

            filebase = '{}.npy'.format(data_datetime.strftime('%Y%m%d%H%M%S'))
            full_filename = os.path.join(output_dir, filebase)
            np.save(full_filename, tr.data)

        #pdb.set_trace()
        #filebase = '{}.npy'.format(t0.strftime('%Y%m%d%H%M%S'))

    def _make_from_parents(self, data_key):
        """
         #TODO: Add peak index
         How to do this?  Check if the parrent label is correllated2
         #TODO: make rhino channel map come from top level header not from trace header
         NB Primary wavelet indices are theoretical and can be computed
         up front.  Multiple is not (currently) done like that.  From a glance at
         spectra I believe it can be done when impedance contrast high (air) ..

        """
        #pdb.set_trace()
        DEBUG = False
        #<Basic measurand handling stuff>
        corr_measurand = self.parent_measurands[0]
        parent_filename = corr_measurand.expected_filename(data_key)
        time_vector = corr_measurand.time_vector(data_key.sampling_rate)
        dt = time_vector[1] - time_vector[0]
        #parent_label = corr_measurand.label
        #output_filename = self.expected_filename(data_key)
        #</Basic measurand handling stuff>


        #pdb.set_trace()
        if DEBUG:
            import matplotlib.pyplot as plt
            from dcrhino.analysis.supporting_processing import get_segy_trace_by_index
            i_trace = 0
            tr = get_segy_trace_by_index( parent_filename, i_trace)
            trace_header_operator = DataCloudTraceHeader()
            t0 = trace_header_operator.get_tracetime(tr)
            rng = pd.date_range(t0, periods=1000, freq='1s')
            feature_dict = create_correlated_features_dictionary(rng)
            st = DummyStream(); st.traces = [tr,tr, tr]
            pdb.set_trace()
        else:
            st = _read_segy(parent_filename)
            tr = st.traces[0]

        #<get global meta data from trace>
        earliest_multiple_time =  get_earliest_expected_mulitple_time(tr)
        earliest_multiple_time -= 2*dt #roll it back one to stop posible digital error, sampling comb, earliet time not aligned
        #roll back 2*dt based on chat with JWR
        latest_multiple_time =  earliest_multiple_time + self.multiple_window_search_width_ms*1e-3
        rhino_channel_component_map = self.parent_measurands[0].rhino_channel_map(data_key, tr)
        trace_header_operator = DataCloudTraceHeader()
        t0 = trace_header_operator.get_tracetime(tr)
        #<get global meta data from trace>





        #needs all traces loaded
        dummy_hole_ids, unique_hole_ids = get_dummy_hole_ids_from_segy(st)
        dummy_hole_ids_by_time = dummy_hole_ids[0::3]
        num_traces_total = len(st.traces)
        logger.warning("HARD CODED  components to be equal to 3, could be 2 \
                       (no z)s...need to provide info if z-comp or not!!!!")
        num_components = 3
        num_traces_per_component = num_traces_total // num_components
        freq_string ='1s'
        logger.warning("Trace duration HARD CODED to 1second in measurand")
        rng = pd.date_range(t0, periods=num_traces_per_component, freq=freq_string)
        #<PREP CONTAINER FOR FEATURES>
        feature_dict = create_correlated_features_dictionary(rng)
        #</PREP CONTAINER FOR FEATURES>

#        filemapper = pd.DataFrame()
#        meta_trace_index = np.arange(num_traces_total)
#        meta_componets = num_traces_total * [None]
#        meta_wavelet_types = num_traces_total * [None]
        bad_traces = [2469, 2499, 2559, 4467]
        bad_traces = [4467, ]
        bad_traces = [88551]
        bad_traces = []
        #pdb.set_trace()

        print(t0)
        for i_trace, tr in enumerate(st.traces):
            if i_trace in bad_traces:
                pdb.set_trace()
            component = rhino_channel_component_map[i_trace % 3]
            i_comp_obs_ndx = i_trace // 3

            for wavelet_type in COMPONENT_WAVELET_MAP[component]:
                if component == 'axial':
                    print(wavelet_type)
                    if wavelet_type=='primary':
                        wffe = extract_features_from_primary_wavelet(tr, time_vector,
                                                                     self.primary_window_halfwidth_ms,
                                                                     component, wavelet_type)
                    elif wavelet_type=='multiple':
                        wffe = extract_features_from_multiple_wavelet(tr, time_vector, earliest_multiple_time,
                                                                      latest_multiple_time, component, wavelet_type)
                    else:
                        logger.critical("Unsupported Wavelet Type {}".format(wavelet_type))
                        raise Exception
                else:
                    #pdb.set_trace()
                    wffe = extract_features_from_primary_wavelet(tr, time_vector,
                                                                  self.primary_window_halfwidth_ms,
                                                                  component, wavelet_type)
                #<File the answer in the master dictionary>
                feature_dict = add_wffe_to_feature_dict(wffe, feature_dict, i_comp_obs_ndx)
#                for feature in WAVELET_FEATURES:
#                    #print(feature, wffe.component, wffe.wavelet_type)
#                    key = '{}_{}_{}'.format(wffe.component, wffe.wavelet_type, feature)
#                    feature_dict[key][i_comp_obs_ndx] = wffe.__getattribute__(feature)
                #</File the answer in the master dictionary>
#        for k, v in data_dict.iteritems():
#            data_dict[k] = pd.Series(v, index=rng)
        features_df = pd.DataFrame(data=feature_dict)
        features_df['dummy_hole_id'] = pd.Series(dummy_hole_ids_by_time, index=features_df.index)

        #pdb.set_trace()
        cond1 = (features_df['tangential_primary_peak_sample'] > 2 * features_df['axial_primary_peak_amplitude'])
        features_df.drop(features_df[cond1].index, inplace=True)
        print(len(features_df))
        # above eqivalent to
        #features_df = features_df.drop(features_df[cond1].index)
        cond2 = (features_df['radial_primary_peak_sample'] > 2 * features_df['axial_primary_peak_amplitude'])
        features_df.drop(features_df[cond2].index, inplace=True)
        print(len(features_df))
        cond3 = (features_df['axial_primary_peak_amplitude'] < 0.125)
        features_df.drop(features_df[cond3].index, inplace=True)
        print(len(features_df))
        self.save_to_csv(data_key, features_df)
        #pdb.set_trace()
        #df.to_csv(output_filename, index_label='datetime')
        return


    def generate_qc_plot_input(self, df=None, data_key=None, observer_row=None,
                               mount_point=None, plot_meta=None):
        """
        st: <class 'obspy.core.stream.Stream'>
         This block of code is for measurands that need streams
        """
        if df is not None:
            print('great the data already in RAM')
        elif data_key is not None:
            df = self.load(data_key)
        else:
            logger.error("no way to access obspy stream")
            raise Exception

        qc_input = QCLogPlotInput()
        #TODO: Make qcLogPlotInput have methods that generate amplitude ratio, etc
        qc_input.df = df
        #pdb.set_trace()

        qc_input.hole_start_time = df['datetime'].iloc[0].to_pydatetime()
        qc_input.observer_row = observer_row
        qc_input.data_level_path = self.data_level_path()
        qc_input.mount_point = mount_point
        qc_input.plot_meta = plot_meta
        qc_input.component_trace_index = df.index
        qc_input.time_stamps = df['datetime']
#        if observer_row.hole == 242:
#            pdb.set_trace()
#        if observer_row is not None:
#            qc_input.bench = observer_row['bench']
        return qc_input


def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
