# -*- coding: utf-8 -*-

import h5py
import numpy as np
import pandas as pd
import pdb
import time
import sys


from dcrhino3.models.config import Config
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.helpers.general_helper_functions import init_logging, interpolate_data, calibrate_data, fft_data
from dcrhino3.process_flow.modules.trace_processing.autocorrelate import autocorrelate_trace
from dcrhino3.signal_processing.filters import butter_bandpass, butter_highpass, butter_lowpass
import scipy.signal as ssig

logger = init_logging(__name__)



class RawTraceData(TraceData):
    def load_config(self,path):
        f1 = h5py.File(path, 'r+')
        h5_helper = H5Helper(f1,False,False)
        global_config = Config(h5_helper.metadata)
        return global_config

    def load_from_h5(self,path):
        self.dataframe , global_config = self._cast_h5_to_dataframe(path)
        self._global_configs["0"] = global_config

    def _cast_h5_to_dataframe(self, h5_filename):
        """

        @property
        column_labels = ['timestamp', 'raw_timestamps', 'axial', 'tangential', 'radial' ]

        The timestamp column is the unix timestamp of the First Sample of the trace
        """

        output_dict = {}

        f1 = h5py.File(h5_filename, 'r+')
        h5_helper = H5Helper(f1)
        global_config = Config(h5_helper.metadata)
        #pdb.set_trace()


        data = np.asarray(h5_helper.data_xyz)
        temp_df = pd.DataFrame()
        temp_df['timestamp'] = h5_helper.ts.astype(np.int64)
        temp_df['raw_timestamp'] = h5_helper.ts.astype(np.float64)
        temp_df["rssi"] = np.nan
        # if "rssi" in h5_helper.h5f.keys():
        #     temp_df["rssi"] = np.asarray(h5_helper.h5f.get("rssi"), dtype=np.float32)
        # else:

	    # Remove the timestamps that have gapqs greater than
        tx_sequence_diff = np.diff(h5_helper.h5f["cticks"].__array__())



        filter_gaps = False # This is for further development if we want to filter traces that have large gaps
        if filter_gaps:
            try:
                gap_indices = np.where(tx_sequence_diff > global_config.missed_packets_threshold)
            except:
                gap_indices = np.where(tx_sequence_diff > 40)
                logger.warning("Missed packets Threshold not defined in global config. Using default of 40")
            bad_timestamps = temp_df["timestamp"][temp_df["timestamp"].index.values[gap_indices]].unique()
        

        for component_id in global_config.components_to_process:
            component_index = global_config.component_index(component_id)
            temp_df[component_id] = data[component_index]

        ts_groups = temp_df.groupby('timestamp')

        groups_list = list(ts_groups.groups)
        num_traces = len(groups_list)
        output_dict = dict()
        output_dict['timestamp'] = np.asarray(groups_list)
        output_dict['raw_timestamps'] = num_traces * [None]
        output_dict['rssi']=num_traces * [None]
        for component_id in global_config.components_to_process:
             output_dict[component_id] = num_traces * [None]

        for i_trace in range(num_traces):
            group_id = groups_list[i_trace]
            group = ts_groups.get_group(group_id)
            output_dict['raw_timestamps'][i_trace] = np.array(group['raw_timestamp'])
            output_dict["rssi"][i_trace]=np.mean(group["rssi"])
            packets = len(group["rssi"])
            for component_id in global_config.components_to_process:
                output_dict[component_id][i_trace] = np.array(group[component_id])

        output_df = pd.DataFrame(output_dict)
        # if "batt" in h5_helper.h5f.keys():
        #     output_df["batt"] = np.asarray(h5_helper.h5f.get("batt"), dtype=np.float32)
        # else:
        output_df["batt"] = np.nan

        # if "temp" in h5_helper.h5f.keys():
        #     output_df["temp"] = np.asarray(h5_helper.h5f.get("temp"), dtype=np.float32)
        # else:
        output_df["temp"] = np.nan

        # if "packets" in h5_helper.h5f.keys():
        #     output_df["packets"] = np.asarray(h5_helper.h5f.get("packets"), dtype=np.float32)
        # else:
        output_df["packets"] = packets

        output_df.index = output_df['timestamp']
        if filter_gaps:
            output_df = output_df[~output_df['timestamp'].isin(bad_timestamps)]
        # pdb.set_trace()yes
        return output_df, global_config

    def calibrate_l1h5(self,df,global_config):
        t0 = time.time()


        for line_idx in range(len(df)):
            row_of_df = df.iloc[line_idx]
            for component_id in global_config.components_to_process:
                trace_to_process = row_of_df[component_id]
                processed_trace = self.calibrate_1d_component_array(trace_to_process,global_config,global_config.sensor_sensitivity[component_id])
                df.at[line_idx, component_id] = processed_trace

        time_interval = time.time() - t0
        logger.info("Took %s seconds to calibrate %s traces" % (time_interval,len(df)))
        return df


    def resample_l1h5(self,df, global_config,kind="quadratic"):

        """
        @TODO: need to get the upsample factor from
        """
        data_processing_stage_designator = 'resampled'


        t0 = time.time()
        output_dict = {}
        samples_per_trace = global_config.samples_per_trace
        num_traces = len(df)


        for component_id in global_config.components_to_process:
            output_dict[component_id] = np.full((num_traces, samples_per_trace), np.nan) #Allocate Memory

            for i_trace in range(num_traces):
                if int(df['timestamp'].iloc[i_trace]) != int(df['raw_timestamps'].iloc[i_trace][0]):
                    print ("here!!!")

                ideal_timestamps = global_config.dt * np.arange(samples_per_trace) + df['timestamp'].iloc[i_trace]
                interpolated = self.interpolate_1d_component_array(df['raw_timestamps'].iloc[i_trace],
                                                                                            df[component_id].iloc[i_trace],
                                                                                            ideal_timestamps, kind)
                if interpolated is not False:
                    output_dict[component_id][i_trace, :] = interpolated
            output_dict[component_id] = list(output_dict[component_id])
            df[component_id] = output_dict[component_id]

        df.drop(['raw_timestamps', ], axis=1, inplace=True)
        time_interval = time.time() - t0
        logger.info("Took %s seconds to resample %s traces" % (time_interval,len(df)))
        return df

    def interpolate_1d_component_array(self,raw_timestamps,component_array,ideal_timestamps, kind="quadratic"):
        #<Numpy is a lot faster and it was the legacy method we have been using so will continue using the
        #Extrapolation capabilities>
        # interp_data = np.interp(ideal_timestamps, raw_timestamps,component_array)
        #</numpy function>
        return interpolate_data(raw_timestamps, component_array, ideal_timestamps, kind)

    def calibrate_1d_component_array(self, component_array, global_config, sensitivity):
        is_ide_file = not int(global_config.sensor_type) == 2 or global_config.rhino_version is None
        if global_config.rhino_version == None:
            global_config.rhino_version = 0
        output = calibrate_data(component_array, sensitivity, float(global_config.accelerometer_max_voltage),
                                float(global_config.rhino_version), is_ide_file)
        return output

    def filter_1d_component_array(self,component_array, sampling_rate, filter="highpass", low=10, high=999):
        if filter == "highpass":
            b, a = butter_highpass(low, sampling_rate)
        elif filter == "lowpass":
            b, a = butter_lowpass(high, sampling_rate)
        else:
            b, a = butter_bandpass(low, high, sampling_rate)
        filt_data = ssig.filtfilt(b, a, component_array)
        return filt_data

    def autocorrelate_1d_component_array(self, input_trace, samples_per_trace):
        return autocorrelate_trace(input_trace, samples_per_trace)

    def raw_trace_fft(self, global_config, sensitivity):

        sampling_rate = global_config.output_sampling_rate
        t0 = time.time()
        output_dict = {}
        num_traces = len(self.dataframe['timestamp'])
        # pdb.set_trace()
        for component_id in global_config.components_to_process:
            output_dict[component_id] = {}
            for i_trace in range(len(self.dataframe['timestamp'])):
                data_array = self.calibrate_1d_component_array(self.dataframe[component_id].iloc[i_trace],
                                                               global_config,
                                                               sensitivity)
                if len(data_array) <= global_config.output_sampling_rate * 1.01 and len(data_array) >= global_config.output_sampling_rate * 0.9: # This is to ignore traces that are too long or too short
                    tmp = fft_data(data_array, sampling_rate)
                    output_dict[component_id][self.dataframe.timestamp.iloc[i_trace]] = tmp
        time_interval = time.time() - t0
        logger.info("Took %s seconds to create FFT of %s traces" % (time_interval, num_traces))
        return output_dict

    def filter_l1h5(self, df, global_config, filter="highpass"):
        sampling_rate = global_config.output_sampling_rate
        t0 = time.time()
        output_dict = {}
        num_traces = len(df['timestamp'])
        for component_id in global_config.components_to_process:
            output_dict[component_id] = np.full((num_traces, int(sampling_rate)), np.nan) #Allocate
            # Memory
            for i_trace in range(len(df['timestamp'])):
                input_trace = df[component_id].iloc[i_trace]
                filtered_trace = self.filter_1d_component_array(input_trace, sampling_rate, filter)
                output_dict[component_id][i_trace, :] = filtered_trace  # [0:samples_per_trace]
            output_dict[component_id] = list(output_dict[component_id])
        time_interval = time.time() - t0
        logger.info("Took %s seconds to create Filter of %s traces" % (time_interval, num_traces))
        df[component_id] = output_dict[component_id]
        return df

    def autocorrelate_l1h5(self, df, global_config):
        """
        @note 20190114: since we are not going all the way to final lag, we could
        speed this up slightly by only calculating lads we want ... but for now is OK

        Key is to choose the number of points we will keep
        auto_correlation_duration, the 'clipping' or 'trimming' of the acorr
        vector will take place in the autocorrelate_trace method
        """
        try:
            autocorrelation_duration = global_config.autocorrelation_duration
        except AttributeError:
            logger.warning("this warning will be removed once the \
                       upsample factor is coming from the global cfg")
            autocorrelation_duration = 0.4

        t0 = time.time()
        output_dict = {}
        data_processing_stage_designator = 'autocorrelate'

        samples_per_trace = int(autocorrelation_duration / global_config.dt)

        num_traces = len(df['timestamp'])


        for component_id in global_config.components_to_process:
            output_dict[component_id] = np.full((num_traces, samples_per_trace), np.nan) #Allocate Memory

            for i_trace in range(num_traces):
                #pdb.set_trace()

                input_trace = df[component_id].iloc[i_trace]
                acorr_trace = self.autocorrelate_1d_component_array(input_trace, samples_per_trace)

                output_dict[component_id][i_trace, :] = acorr_trace#[0:samples_per_trace]
            output_dict[component_id] = list(output_dict[component_id])

        output_dict['timestamp'] = df['timestamp']

        dff = pd.DataFrame(output_dict, index=df.index)
        time_interval = time.time() - t0
        logger.info("Took %s seconds to autocorrelate %s traces" % (time_interval,len(dff)))
        return dff
