"""
/home/kkappler/software/datacloud/dcrhino_lib/dcrhino3/feature_extraction/jazz_with_zero_crossings.py

"""
import matplotlib.pyplot as plt
import numpy as np
#import pdb

from dcrhino3.models.interval import TimePeriod
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace

def initialize_jazz2_dict():
    tmp = {}
    tmp['left_trough_integral'] = np.nan
    tmp['right_trough_integral'] = np.nan
    tmp['center_peak_integral'] = np.nan
    return tmp


def estimate_trough_width(wavelet_period, component_id):
    """
    this maybe belongs with filters
    :return:
    """
    if component_id == 'axial':
        expected_period = wavelet_period/2.0
    elif component_id == 'tangential':
        expected_period = wavelet_period/2.0
    return expected_period


def sanity_check_plot_jazz2(left_trough, positive_peak, right_trough,
                            t_left_trough, t_positive_peak, t_right_trough,
                            expected_trough_duration, tick_times, ttl_string):
    wiggly_wiggle = np.hstack((left_trough, positive_peak, right_trough))
    #wiggly_wiggle = np.hstack((left_trough, positive_peak, right_trough))
    tick_heights = 0.1 * np.ptp(wiggly_wiggle)
    plt.plot(t_left_trough, left_trough, label='left');
    plt.plot(t_positive_peak, positive_peak, label='peak');
    plt.plot(t_right_trough, right_trough, label='right');
    plt.hlines(0, t_left_trough[0], t_right_trough[-1], color='black');
    plt.vlines(tick_times, -tick_heights/2, tick_heights/2)
    plt.vlines([tick_times[1]-expected_trough_duration, tick_times[2]+expected_trough_duration], -tick_heights / 2, tick_heights / 2, color='purple')
    plt.xlabel(('Time (s)'))
    plt.ylabel('Wavelet Amplitude')
    plt.legend();
    plt.title(ttl_string)
    plt.show(block=True)


def jazz2(symmetric_trace, center_time, expected_trough_duration, wavelet_id='', sanity_check_plot=False):
    """
    This method expects a trace and a time corresponding to a wavelet maxima.  It will measure the width of the peak
    and of the two troughs left and right of the peak.  It will also calculate the absolute area under curve for
    each of these three features.
    20190621: This is working on a data driven method.  Still need to add the part where the approximate trough
    widths are estimated from the band pass filter.  This means that the bpf corners should probably be made as inputs
    to the jazz2.
    :param symmetric_trace: dcrhino3.signal_processing.symmetric_trace.SymmetricTrace()
    :param center_time: time in seconds of the peak we wish to reference
    :return:
    """
    #sanity_check_plot = True
    center_index = np.where(symmetric_trace.time_vector == center_time)[0][0]
    #<method of symmetric_trace: chop-to-center-time>
    lhs = symmetric_trace.data[:center_index]  # everything up to the max
    rhs = symmetric_trace.data[center_index + 1:]
    n_keep = min(len(lhs), len(rhs))
    keep_lhs = lhs[-n_keep:]
    keep_rhs = rhs[:n_keep]
    mini_trace_data = np.hstack((keep_lhs, symmetric_trace.data[center_index], keep_rhs))
    mini_trace = SymmetricTrace(mini_trace_data, symmetric_trace.sampling_rate)
    mini_trace_time = mini_trace.time_vector
    #align this by center-time offset
    # <method of symmetric_trace: chop-to-center-time>
    mini_center_index = mini_trace.center_index
    signs = np.sign(mini_trace_data)
    d_signs = np.diff(signs)
    #plt.plot(d_signs);plt.plot(mini_trace_data);plt.show(block=True)

    # here the designations of left and right inidcate the sample to the
    # left and right of the zero-crossing
    positive_slope_zx_indices_left = np.where(d_signs > 0)[0]
    #positive_slope_zx_indices_right = positive_slope_zx_indices_left + 1
    negative_slope_zx_indices_left = np.where(d_signs < 0)[0]
    #negative_slope_zx_indices_right = negative_slope_zx_indices_left + 1
    # can either interpolate to get these fine tuned or not.

    # lhs trough is a neg_slope then a pos slope (headed to max)
    start_left_trough = negative_slope_zx_indices_left[negative_slope_zx_indices_left < mini_center_index][-1]
    end_left_trough = positive_slope_zx_indices_left[positive_slope_zx_indices_left < mini_center_index][-1]
    left_trough = mini_trace_data[start_left_trough:end_left_trough + 1]  # add +1 twice to get positve value at last sample
    t_left_trough = mini_trace_time[start_left_trough:end_left_trough + 1]  # add +1 twice to get positve value at last sample

    start_right_trough = negative_slope_zx_indices_left[negative_slope_zx_indices_left > mini_center_index][0]
    end_right_trough = positive_slope_zx_indices_left[positive_slope_zx_indices_left > mini_center_index][0]
    right_trough = mini_trace_data[start_right_trough+1:end_right_trough + 1]  # add +1 twice to get positve value at last sample
    t_right_trough = mini_trace_time[start_right_trough+1:end_right_trough+ 1]  # add +1 twice to get positve value at last sample

    positive_peak = mini_trace_data[end_left_trough + 1:start_right_trough+1]
    t_positive_peak = mini_trace_time[end_left_trough + 1:start_right_trough+1]


    tick_times = np.zeros(4)
    tick_times[0] = t_left_trough[0]
    bridge = [left_trough[-1], positive_peak[0]]
    t_bridge =  [t_left_trough[-1], t_positive_peak[0]]
    tick_times[1] = t_bridge[np.argmin(np.abs(bridge))]
    bridge = [positive_peak[-1], right_trough[0]]
    t_bridge = [t_positive_peak[-1], t_right_trough[0]]
    tick_times[2] = t_bridge[np.argmin(np.abs(bridge))]
    tick_times[3] = t_right_trough[-1]
    left_trough_interval = TimePeriod(lower_bound=tick_times[0], upper_bound=tick_times[1])
    positive_peak_interval = TimePeriod(lower_bound=tick_times[1], upper_bound=tick_times[2])
    right_trough_interval = TimePeriod(lower_bound=tick_times[2], upper_bound=tick_times[3])

    if sanity_check_plot:
        ttl_string = '{} {}'.format(symmetric_trace.component_id, wavelet_id)
        sanity_check_plot_jazz2(left_trough, positive_peak, right_trough,
                                t_left_trough, t_positive_peak, t_right_trough,
                                expected_trough_duration, tick_times, ttl_string)

    left_integral = np.sum(np.abs(left_trough))
    right_integral = np.sum(np.abs(right_trough))
    center_integral = np.sum(np.abs(positive_peak))

    output_dict = initialize_jazz2_dict()
    output_dict['left_trough_integral'] = left_integral
    output_dict['right_trough_integral'] = right_integral
    output_dict['center_peak_integral'] = center_integral
    output_dict['jazz2_tick0'] = tick_times[0]
    output_dict['jazz2_tick1'] = tick_times[1]
    output_dict['jazz2_tick2'] = tick_times[3]
    output_dict['jazz2_tick3'] = tick_times[3]
    return output_dict


def jazz2_test(acorr_trace):
    sampling_rate = acorr_trace.dataframe.sampling_rate.iloc[0]
    sample_trace = acorr_trace.dataframe.axial_trace.iloc[10]
    sample_trace = acorr_trace.dataframe.axial_trace.iloc[11]
    #sample_trace = sample_trace[:-300]
    #center_index = np.argmax(sample_trace)
    symmeteric_trace = SymmetricTrace(sample_trace, sampling_rate)
    time_vector = symmeteric_trace.time_vector
    center_time = time_vector[np.argmax(symmeteric_trace.data)] #not center index!
    jazz_dict = jazz2(symmeteric_trace, center_time)


def main():
    acorr_h5_file_path = '/home/kkappler/.cache/datacloud/line_creek/processed/1855_NS93_14_17822T_17822T_6172_6172/20190612-125430_QC0/5_trim_0.h5'
    acorr_trace = TraceData()
    acorr_trace.load_from_h5(acorr_h5_file_path)
    jazz2_test(acorr_trace)


if __name__ == '__main__':
    main()
    print('success!')