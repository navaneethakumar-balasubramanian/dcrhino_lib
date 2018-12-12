import numpy as np
from dcrhino.process_pipeline.filters import FIRLSFilter
import scipy
import scipy.signal as ssig
import pdb
from dcrhino.analysis.signal_processing.seismic_processing import calculate_spiking_decon_filter

def trim_trace(min_lag_trimmed_trace, max_lag_trimmed_trace, num_taps_in_decon_filter,
               output_sampling_rate, data):
    """
    """
    min_lag = min_lag_trimmed_trace
    max_lag = max_lag_trimmed_trace
    zero_time_index = len(data) // 2
    decon_filter_offset = num_taps_in_decon_filter // 2
    t0_index = zero_time_index + decon_filter_offset #2750
    sampling_rate = float(output_sampling_rate)
    n_samples_back = int(sampling_rate * np.abs(min_lag))
    n_samples_fwd = int(sampling_rate * max_lag)

    back_ndx = t0_index - n_samples_back
    fin_ndx = t0_index + n_samples_fwd

    little_data = data[back_ndx:fin_ndx]
    return little_data

class TraceProcessing:
    def __init__(self,global_config,is_ide_file,accelerometer_max_voltage):
        self.config = global_config
        self.is_ide_file = is_ide_file
        self.accelerometer_max_voltage = accelerometer_max_voltage

    def process(self, data, data_ts, component, sensitivity, debug=False):
        calibrated_actual_second = self._apply_calibration(data, sensitivity)
        max_acceleration = np.max(calibrated_actual_second)
        min_acceleration = np.min(calibrated_actual_second)
        interpolated_actual_second = self._interpolate_data(data_ts, calibrated_actual_second)
        deconvolved_data_actual_second, r_xx0 = self._deconvolve_trace(interpolated_actual_second)
        correlated_trace_actual_second = self._correlate_trace(interpolated_actual_second,deconvolved_data_actual_second)
        filtered_correlated_trace_actual_second = self._bandpass_filter_trace(self.config.sampling_rate,
                                                                        self.config.trapezoidal_bpf_corner_1,
                                                                        self.config.trapezoidal_bpf_corner_2,
                                                                        self.config.trapezoidal_bpf_corner_3,
                                                                        self.config.trapezoidal_bpf_corner_4,
                                                                        self.config.trapezoidal_bpf_duration,
                                                                        correlated_trace_actual_second)

        trimmed_filtered_correlated_trace_actual_second = self._trim_trace(filtered_correlated_trace_actual_second)

        despiked_trace, despike_filter = calculate_spiking_decon_filter(correlated_trace_actual_second,
                                                      self.config.n_spiking_decon_filter_taps,
                                                      self.config.dt, self.config.start_ms_despike_decon,
                                                      self.config.end_ms_despike_decon,
                                                      add_noise_percent=self.config.add_noise_percent)
        despiked_trace = np.roll(despiked_trace, self.config.n_spiking_decon_filter_taps//2)

        filtered_despiked_trace_actual_second = self._bandpass_filter_trace(self.config.sampling_rate,
                                                            self.config.trapezoidal_bpf_corner_1,
                                                            self.config.trapezoidal_bpf_corner_2,
                                                            self.config.trapezoidal_bpf_corner_3,
                                                            self.config.trapezoidal_bpf_corner_4,
                                                            self.config.trapezoidal_bpf_duration,
                                                            despiked_trace)


        #pdb.set_trace()
        output_dict = {}
        output_dict[component+'_max_acceleration'] = [max_acceleration]
        output_dict[component+'_min_acceleration'] = [min_acceleration]
        if debug:
            output_dict[component+'_interpolated'] = interpolated_actual_second
            output_dict[component+'_deconvolved'] = deconvolved_data_actual_second
            output_dict[component+'_correlated'] = correlated_trace_actual_second
            output_dict[component+'_filtered_correlated'] = filtered_correlated_trace_actual_second
            output_dict[component+'_trimmed_filtered_correlated'] = trimmed_filtered_correlated_trace_actual_second
            output_dict[component+'_despiked_correlated'] = despiked_trace
            output_dict[component+'_filtered_despiked_correlated'] = filtered_despiked_trace_actual_second
        return output_dict

    def _trim_trace(self, data):
        """
        add min_lag and max_lag
        """
        min_lag = self.config.min_lag_trimmed_trace
        max_lag = self.config.max_lag_trimmed_trace
        num_taps_in_decon_filter = self.config.num_taps_in_decon_filter
        output_sampling_rate = self.config.sampling_rate
        little_data = trim_trace(min_lag, max_lag, num_taps_in_decon_filter,
                                 output_sampling_rate, data)
#        zero_time_index = len(data) // 2
#        decon_filter_offset = num_taps_in_decon_filter // 2
#        t0_index = zero_time_index + decon_filter_offset #2750
#        sampling_rate = float(output_sampling_rate)
#        n_samples_back = int(sampling_rate * np.abs(min_lag))
#        n_samples_fwd = int(sampling_rate * max_lag)
#
#        back_ndx = t0_index - n_samples_back
#        fin_ndx = t0_index + n_samples_fwd
#
#        little_data = data[back_ndx:fin_ndx]
        return little_data



    def _autocorrelate_trace(self, trace_data, n_pts):
        """
        @type trace_data: numpy array
        @param trace_data: the time series to autocorrelate
        @type n_pts: integer
        @param n_pts: the max lag to consider in autocorrelation
        @warning: trace_data is assumed to be an even number of points, not tested
        for odd trace length
        """
        zero_time_index = len(trace_data) // 2
        acorr = np.correlate(trace_data, trace_data,'same')
        return acorr[zero_time_index:zero_time_index+n_pts]


    def _bandpass_filter_trace(self, output_sampling_rate, trapezoidal_bpf_corner_1,
                              trapezoidal_bpf_corner_2, trapezoidal_bpf_corner_3,
                              trapezoidal_bpf_corner_4, trapezoidal_bpf_duration, data):
        """
        TODO: calculate fir_taps once per header and leave fixed ...
        """
        sampling_rate = float(output_sampling_rate)
        corners = [trapezoidal_bpf_corner_1,
                   trapezoidal_bpf_corner_2,
                   trapezoidal_bpf_corner_3,
                   trapezoidal_bpf_corner_4,]
        fir_duration = trapezoidal_bpf_duration# = 0.02

        firls = FIRLSFilter(corners, fir_duration)

        #pdb.set_trace()
        fir_taps = firls.make(sampling_rate)

        if (len(fir_taps) == 1) and (fir_taps[0]==1.0):
            bpf_data = data
        else:
            bpf_data = ssig.filtfilt(fir_taps, 1., data).astype('float32')

        #bpf_data = ssig.lfilter(fir_filter.taps, 1., tr_corr_w_deconv).astype('float32')
        #bpf_data = ssig.lfilter(fir_filter.taps, 1., bpf_data).astype('float32')

        return bpf_data

    def _correlate_trace(self, original_data, decon_data):
            correlated_trace = np.correlate(original_data, decon_data, 'same')
            return correlated_trace

    def _deconvolve_trace(self, data):
        """
        deconvolution_filter_duration:
        """
        deconvolution_filter_duration = self.config.deconvolution_filter_duration
        num_taps_in_decon_filter =  self.config.num_taps_in_decon_filter

        deconvolution_filter_duration = float(deconvolution_filter_duration)
        R_xx = self._autocorrelate_trace(data, num_taps_in_decon_filter)
        # EMPTY DATA
        if data.min() == 0.0 and data.max() == 0.0:
            return data, R_xx[0]
        ATA = scipy.linalg.toeplitz(R_xx)
        nominal_scale_factor = 1.0;#1./R_xx[0]#1.0
        ATA = scipy.linalg.toeplitz(R_xx)
        try:
            ATAinv = scipy.linalg.inv(ATA)
        except np.linalg.linalg.LinAlgError:
            #logger.error('matrix inversion failed')
            print('matrix inversion failed')
            return data, R_xx[0]
        x_filter = nominal_scale_factor*ATAinv[0,:]
        deconv_trace = np.convolve(x_filter, data, 'same')
        return deconv_trace, R_xx[0]

    def _interpolate_data(self, digitizer_timestamps, data):
            interp_data = np.interp(self.config.ideal_timestamps, digitizer_timestamps,data)
            return interp_data

    def _apply_calibration(self,values_arr,sensitivity):
        output = values_arr

        if self.is_ide_file:
            # TODO CHECK THAT
            # NATAL SAID ITS CORRECT!
            return output / sensitivity
        else:
            output = (output * 5.0) / 65535
            output = (self.accelerometer_max_voltage/2.0) - output
            output = output / (sensitivity/1000.0)
            return output
