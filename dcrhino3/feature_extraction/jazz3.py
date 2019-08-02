"""
/home/kkappler/software/datacloud/dcrhino_lib/dcrhino3/feature_extraction/jazz3.py
this can likely be done much nicer with analytic curve fitting but for first cut
lets just do with crude samples.  Also, Jazz3 solutions can be found in the troughs of jazz2,
so to make jazz2 and then pick the minima of left trough and right trough.  Do it
specfically by the first place the derivative changes;

"""
import matplotlib.pyplot as plt
import numpy as np
import pdb

from dcrhino3.models.interval import TimePeriod
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace
from dcrhino3.feature_extraction.jazz_with_zero_crossings import missing_zero_crossing
#from dcrhino3.feature_extraction.jazz_with_zero_crossings import semi_theoretical_tick_times

from dcrhino3.feature_extraction.jazz3_helpers import sanity_check_plot_jazz3
from dcrhino3.feature_extraction.jazz3_helpers import DataWindow


def poly_zx_sorted(z, lower_bound, upper_bound):
    """
    takes a set of polynomial coefficients as input and a time interval
    returns the real-valued zero-crossings (roots) of the polynomial in the time interval
    """
    poly = np.poly1d(z)
    zero_crossing_times = poly.roots
    zero_crossing_times = zero_crossing_times[np.isreal(zero_crossing_times)]
    zero_crossing_times = [np.real(x) for x in zero_crossing_times]
    zero_crossing_times = [x for x in zero_crossing_times if x <= upper_bound]
    zero_crossing_times = [x for x in zero_crossing_times if x >= lower_bound]
    zero_crossing_times.sort()
    return zero_crossing_times

def jazz2(mini_trace, expected_trough_duration):
    """
    """
    missed_zero_crossing = False

    mini_trace_time = mini_trace.time_vector
    mini_center_index = mini_trace.center_index
    signs = np.sign(mini_trace.data)
    d_signs = np.diff(signs)

    #plt.plot(d_signs);plt.plot(mini_trace_data);plt.show(block=True)
    #These designations of left and right indicate the sample to the
    # left and right of the zero-crossing
    positive_slope_zx_indices_left = np.where(d_signs > 0)[0]
    #positive_slope_zx_indices_right = positive_slope_zx_indices_left + 1
    negative_slope_zx_indices_left = np.where(d_signs < 0)[0]
    #negative_slope_zx_indices_right = negative_slope_zx_indices_left + 1
    # can either interpolate to get these fine tuned or not.

    # lhs trough is a neg_slope then a pos slope (headed to max)
    start_left_trough = negative_slope_zx_indices_left[negative_slope_zx_indices_left < mini_center_index][-1]
    end_left_trough = positive_slope_zx_indices_left[positive_slope_zx_indices_left < mini_center_index][-1]
    left_trough = mini_trace.data[start_left_trough:end_left_trough + 1]  # add +1 twice to get positve value at last sample
    t_left_trough = mini_trace_time[start_left_trough:end_left_trough + 1]  # add +1 twice to get positve value at last sample
    left_trough_dw = DataWindow(t_left_trough, left_trough)

    start_right_trough = negative_slope_zx_indices_left[negative_slope_zx_indices_left > mini_center_index][0]
    end_right_trough = positive_slope_zx_indices_left[positive_slope_zx_indices_left > mini_center_index][0]
    right_trough = mini_trace.data[start_right_trough+1:end_right_trough + 1]  # add +1 twice to get positve value at last sample
    t_right_trough = mini_trace_time[start_right_trough+1:end_right_trough+ 1]  # add +1 twice to get positve value at last sample
    right_trough_dw = DataWindow(t_right_trough, right_trough)

    positive_peak = mini_trace.data[end_left_trough + 1:start_right_trough+1]
    t_positive_peak = mini_trace_time[end_left_trough + 1:start_right_trough+1]
    positive_peak_dw = DataWindow(t_positive_peak, positive_peak)

    tick_times = np.zeros(4)
    tick_times[0] = t_left_trough[0]
    bridge = [left_trough[-1], positive_peak[0]]
    t_bridge =  [t_left_trough[-1], t_positive_peak[0]]
    tick_times[1] = t_bridge[np.argmin(np.abs(bridge))]
    bridge = [positive_peak[-1], right_trough[0]]
    t_bridge = [t_positive_peak[-1], t_right_trough[0]]
    tick_times[2] = t_bridge[np.argmin(np.abs(bridge))]
    tick_times[3] = t_right_trough[-1]

    tick_times_theoretical = np.zeros(4)
    tick_times_theoretical[0] - tick_times[1] - expected_trough_duration
    tick_times_theoretical[3] - tick_times[2] + expected_trough_duration
    #left_trough_interval = TimePeriod(lower_bound=tick_times[0], upper_bound=tick_times[1])
    #positive_peak_interval = TimePeriod(lower_bound=tick_times[1], upper_bound=tick_times[2])
    #right_trough_interval = TimePeriod(lower_bound=tick_times[2], upper_bound=tick_times[3])

    if missing_zero_crossing(tick_times[0], expected_trough_duration):
        missed_zero_crossing = True
    left_trough_dw = DataWindow(t_left_trough, left_trough)

    return left_trough_dw, right_trough_dw, positive_peak_dw, tick_times, missed_zero_crossing

def jazz3(symmetric_trace, center_time, expected_trough_duration, wavelet_id='', sanity_check_plot=False, method='discrete'):
    """
    This method expects a trace and a time corresponding to a wavelet maxima.  It will measure the width of the peak
    and of the two troughs left and right of the peak.  It will also calculate the absolute area under curve for
    each of these three features.
    20190621: This is working on a data driven method.  Still need to add the part where the approximate trough
    widths are estimated from the band pass filter.  This means that the bpf corners should probably be made as inputs
    to the jazz2.

    :param symmetric_trace: dcrhino3.signal_processing.symmetric_trace.SymmetricTrace()
    :param center_time: time in seconds of the peak we wish to reference

    ..ToDo:: can change definition of integrals under discrete method to use trapezoidal
    integration BUT leave it for now since this method maybe deprecated in favour of
    analytic, AND with such high upsampling as we use now it shoudl not make much difference.

    Polynomial order set to 17, is resulting in a change in 4th significant figure from the 50kHz sampled data

    mini_trace: this is a trace, recentered on the max_time input
    :return:
        outputs of jazz3 are
        the trough times left and right from the jazz trace,
        the zero-crossing times left and right of peak (these are common to jazz2)
    """
    missed_zero_crossing = False
    #sanity_check_plot = True

    mini_center_index = np.where(symmetric_trace.time_vector == center_time)[0][0]
    mini_trace = symmetric_trace.trim_to_new_center_index(mini_center_index)
    #mini_trace_time = mini_trace.time_vector

    #<Basically Here is Aborted Jazz2>
    left_trough_dw, right_trough_dw, positive_peak_dw, tick_times, missed_zero_crossing = jazz2(mini_trace, expected_trough_duration)
    #print(method)
    if method=='discrete':
        d_left_trough = np.diff(left_trough_dw.data)  # slopes
        sign_d_left_trough = np.sign(d_left_trough)  # signs of slopes
        d_sign_d_left_trough = np.diff(sign_d_left_trough)
        left_jazz3_trough_ndx = np.where(d_sign_d_left_trough == 2)[0][-1]  # where slopes change +/-
        left_jazz3_trough_ndx += 1 #off by 1 from derivative
        t_left_half_trough = left_trough_dw.time[left_jazz3_trough_ndx:]
        left_half_trough = left_trough_dw.data[left_jazz3_trough_ndx:]
        left_half_trough_dw = DataWindow(t_left_half_trough, left_half_trough)

        d_right_trough = np.diff(right_trough_dw.data)  # slopes
        sign_d_right_trough = np.sign(d_right_trough)  # signs of slopes
        d_sign_d_right_trough = np.diff(sign_d_right_trough)
        right_jazz3_trough_ndx = np.where(d_sign_d_right_trough == 2)[0][0]  # where slopes change +/-
        right_jazz3_trough_ndx += 1 #off by 1 from derivative
        t_right_half_trough = right_trough_dw.time[:right_jazz3_trough_ndx]
        right_half_trough = right_trough_dw.data[:right_jazz3_trough_ndx]
        right_half_trough_dw = DataWindow(t_right_half_trough, right_half_trough)

        left_integral = np.sum(np.abs(left_trough_dw.data)) * symmetric_trace.dt
        right_integral = np.sum(np.abs(right_trough_dw.data)) * symmetric_trace.dt
        center_integral = np.sum(np.abs(positive_peak_dw.data)) * symmetric_trace.dt
        left_half_integral = np.sum(np.abs(left_half_trough)) * symmetric_trace.dt#-0.00012567209902215285
        right_half_integral = np.sum(np.abs(right_half_trough)) * symmetric_trace.dt

    elif method=='analytic':
        poly_order = 17
        #jazz3_ticks = np.full(4, np.nan)
        print('workign on this method --in progrss')
        wiggly_wiggle = np.hstack((left_trough_dw.data, positive_peak_dw.data, right_trough_dw.data))
        t_wiggly_wiggle = np.hstack((left_trough_dw.time, positive_peak_dw.time, right_trough_dw.time))
        wavelet = DataWindow(t_wiggly_wiggle, wiggly_wiggle)
        t_max_discrete = wavelet.time[np.argmax(wavelet.data)]

        polyfit_data = np.polyfit(wavelet.time, wavelet.data, poly_order)
        polyfit_data = np.poly1d(polyfit_data)

        indefinite_integral = np.polyint(polyfit_data)#, jazz3_ticks[0], jazz3_ticks[1])


        #find the two zerocrossing left and right of the center
        zero_crossing_times = poly_zx_sorted(polyfit_data, wavelet.time[0], wavelet.time[-1])
        # zero_crossing_times = poly.roots
        # zero_crossing_times = zero_crossing_times[np.isreal(zero_crossing_times)]
        # zero_crossing_times = [np.real(x) for x in zero_crossing_times]
        # zero_crossing_times = [x for x in zero_crossing_times if x <= wavelet.time[-1]]
        # zero_crossing_times = [x for x in zero_crossing_times if x >= wavelet.time[0]]
        # zero_crossing_times.sort()

        #now find the ones that are immediately left and right of t_max
        left_of_max = [x for x in zero_crossing_times if x < t_max_discrete]
        right_of_max = [x for x in zero_crossing_times if x > t_max_discrete]

        tick_times[1] = left_of_max[-1]
        tick_times[2] = right_of_max[0]

        dzdt = np.polyder(polyfit_data)
        dzdt = np.poly1d(dzdt)

        #sanity_check_analytic
        # qq2 = dzdt(t_wiggly_wiggle)
        # plt.hlines(0, t_wiggly_wiggle[0], t_wiggly_wiggle[-1])
        # plt.plot(t_wiggly_wiggle, polyfit_data(t_wiggly_wiggle), label='polyfit')
        # plt.plot(t_wiggly_wiggle, qq2/np.max(qq2), label='dzdt')
        # plt.plot(t_wiggly_wiggle, wiggly_wiggle, label='data')
        # plt.legend()
        # plt.show(block=True)

        zero_crossing_times = poly_zx_sorted(dzdt, wavelet.time[0], wavelet.time[-1])

        #find ndx of  max ; split, -1,0
        idx = (np.abs(zero_crossing_times - t_max_discrete)).argmin()
        left_of_max = zero_crossing_times[:idx]
        right_of_max = zero_crossing_times[idx+1:]
        tick_times[0] = left_of_max[-1]
        tick_times[3] = right_of_max[0]

        center_integral = indefinite_integral(tick_times[2])-indefinite_integral(tick_times[1])
        left_half_integral = indefinite_integral(tick_times[1])-indefinite_integral(tick_times[0])
        right_half_integral = indefinite_integral(tick_times[3]) - indefinite_integral(tick_times[2])
    else:
        error_msg = "unknown method {}".format(method)
        print(error_msg)
        raise Exception
    if sanity_check_plot:
        print('sanity check')
        ttl_string = '{} {}'.format(symmetric_trace.component_id, wavelet_id)
        sanity_check_plot_jazz3(left_trough_dw, positive_peak_dw, right_trough_dw,
                                left_half_trough_dw, right_half_trough_dw,
                                expected_trough_duration, tick_times, ttl_string)



    #count the negative vlaues at the rhs of this vector
    output_dict = {}#initialize_jazz3_dict()
    # output_dict['jazz2_left_trough_integral'] = left_integral
    # output_dict['jazz2_right_trough_integral'] = right_integral
    # output_dict['jazz2_center_peak_integral'] = center_integral

    # output_dict['jazz2_tick0'] = tick_times[0]
    # output_dict['jazz2_tick1'] = tick_times[1]
    # output_dict['jazz2_tick2'] = tick_times[2]
    # output_dict['jazz2_tick3'] = tick_times[3]
    #
    # output_dict['jazz2_missed_zero_crossing'] = missed_zero_crossing

    output_dict['jazz3_center_peak_integral'] = center_integral
    output_dict['jazz3_left_half_trough_integral'] = left_half_integral
    output_dict['jazz3_right_trough_integral'] = right_half_integral

    output_dict['jazz3_tick0'] = tick_times[0]
    output_dict['jazz3_tick1'] = tick_times[1]
    output_dict['jazz3_tick2'] = tick_times[2]
    output_dict['jazz3_tick3'] = tick_times[3]


    return output_dict


def jazz3_test(acorr_trace):
    sampling_rate = acorr_trace.dataframe.sampling_rate.iloc[0]
    sample_trace = acorr_trace.dataframe.axial_trace.iloc[10]
    sample_trace = acorr_trace.dataframe.axial_trace.iloc[11]
    center_frequency = np.mean([acorr_trace.first_global_config.trapezoidal_bpf_corner_2,
                                acorr_trace.first_global_config.trapezoidal_bpf_corner_3])
    expected_trough_duration = 1./(2*center_frequency)
    #sample_trace = sample_trace[:-300]
    #center_index = np.argmax(sample_trace)
    symmeteric_trace = SymmetricTrace(sample_trace, sampling_rate, component_id='axial')
    time_vector = symmeteric_trace.time_vector
    #max_time = time_vector[np.argmax(symmeteric_trace.data)] #not center index!
    max_time_index = np.argmax(symmeteric_trace.data)
    jazz_dict = jazz3(symmeteric_trace, max_time_index, expected_trough_duration)


def main():
    acorr_h5_file_path = '/home/kkappler/.cache/datacloud/line_creek/processed/1855_NS93_14_17822T_17822T_6172_6172/20190612-125430_QC0/5_trim_0.h5'
    acorr_trace = TraceData()
    acorr_trace.load_from_h5(acorr_h5_file_path)
    pdb.set_trace()
    jazz3_test(acorr_trace)


if __name__ == '__main__':
    main()
    print('success!')
