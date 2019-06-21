"""
/home/kkappler/software/datacloud/dcrhino_lib/dcrhino3/feature_extraction/jazz_with_zero_crossings.py

"""
import matplotlib.pyplot as plt
import numpy as np
#import pdb

from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace

def jazz2(symmetric_trace, center_time):
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
#    plt.plot(d_signs)
#    plt.plot(mini_trace_data)
#    plt.show(block=True)
    # here the designations of left and right inidcate the sample to the
    # keft and right of the zero-crossing
    positive_slope_zx_indices_left = np.where(d_signs > 0)[0]
    positive_slope_zx_indices_right = positive_slope_zx_indices_left + 1
    negative_slope_zx_indices_left = np.where(d_signs < 0)[0]
    negative_slope_zx_indices_right = negative_slope_zx_indices_left + 1
    # can either interpolate to get these fine tuned or not.

    # lhs trough is a neg_slope then a pos slope (headed to max)
    start_left_trough = negative_slope_zx_indices_left[negative_slope_zx_indices_left < center_index][-1]
    end_left_trough = positive_slope_zx_indices_left[positive_slope_zx_indices_left < center_index][-1]
    left_trough = mini_trace_data[start_left_trough:end_left_trough + 1]  # add +1 twice to get positve value at last sample
    t_left_trough = mini_trace_time[start_left_trough:end_left_trough + 1]  # add +1 twice to get positve value at last sample
    start_right_trough = negative_slope_zx_indices_left[negative_slope_zx_indices_left > center_index][0]
    end_right_trough = positive_slope_zx_indices_left[positive_slope_zx_indices_left > center_index][0]
    right_trough = mini_trace_data[start_right_trough+1:end_right_trough + 1]  # add +1 twice to get positve value at last sample
    t_right_trough = mini_trace_time[start_right_trough+1:end_right_trough+ 1]  # add +1 twice to get positve value at last sample
    positive_peak = mini_trace_data[end_left_trough + 1:start_right_trough+1]
    t_positive_peak = mini_trace_time[end_left_trough + 1:start_right_trough+1]
#    wiggly_wiggle = np.hstack((left_trough, positive_peak_region, right_trough))

    #<Sanity Check Plot>
    plt.plot(t_left_trough, left_trough, label='left');
    plt.plot(t_positive_peak, positive_peak, label='peak');
    plt.plot(t_right_trough, right_trough, label='right');
    plt.hlines(0, t_left_trough[0], t_right_trough[-1], color='black');
    plt.legend();
    plt.show(block=True)
    #</Sanity Check Plot>
    left_integral = np.sum(np.abs(left_trough))
    right_integral = np.sum(np.abs(right_trough))
    center_integral = np.sum(np.abs(positive_peak))
    return left_integral, right_integral, positive_peak


def xtestx(acorr_trace):
    sampling_rate = acorr_trace.dataframe.sampling_rate.iloc[0]
    sample_trace = acorr_trace.dataframe.axial_trace.iloc[10]
    #sample_trace = sample_trace[:-300]
    #center_index = np.argmax(sample_trace)
    symmeteric_trace = SymmetricTrace(sample_trace, sampling_rate)
    time_vector = symmeteric_trace.time_vector
    center_time = time_vector[np.argmax(symmeteric_trace.data)] #not center index!
    left_integral, right_integral, positive_peak = jazz2(symmeteric_trace, center_time)

    # lhs = sample_trace[:center_index] #everything up to the max
    # rhs = sample_trace[center_index+1:]
    # n_keep = min(len(lhs), len(rhs))
    # keep_lhs = lhs[-n_keep:]
    # keep_rhs = rhs[:n_keep]
    # mini_trace_data = np.hstack((keep_lhs, sample_trace[center_index], keep_rhs))
    # mini_trace = SymmetricTrace(mini_trace_data, sampling_rate)
    # center_index = mini_trace.center_index
    # signs = np.sign(mini_trace_data)
    # d_signs = np.diff(signs)
    # plt.plot(d_signs)
    # plt.plot(mini_trace_data)
    # plt.show()
    # #here the designatores of left and right inidcate the sample to the
    # #keft and right of the zero-crossing
    # positive_slope_zx_indices_left = np.where(d_signs > 0)[0]
    # positive_slope_zx_indices_right = positive_slope_zx_indices_left + 1
    # negative_slope_zx_indices_left = np.where(d_signs < 0)[0]
    # negative_slope_zx_indices_right = negative_slope_zx_indices_left + 1
    # #can either interpolate to get these fine tuned or not.
    #
    # #lhs trough is a neg_slope then a pos slope (headed to max)
    # start_left_trough = negative_slope_zx_indices_left[negative_slope_zx_indices_left < center_index][-1]
    # end_left_trough = positive_slope_zx_indices_left[positive_slope_zx_indices_left < center_index][-1]
    # left_trough = mini_trace_data[start_left_trough:end_left_trough+1] #add +1 twice to get positve value at last sample
    # plt.plot(left_trough);
    # start_right_trough = negative_slope_zx_indices_left[negative_slope_zx_indices_left > center_index][0]
    # end_right_trough = positive_slope_zx_indices_left[positive_slope_zx_indices_left > center_index][0]
    # right_trough = mini_trace_data[start_right_trough:end_right_trough+1] #add +1 twice to get positve value at last sample
    #
    # positive_peak_region = mini_trace_data[end_left_trough+1:start_right_trough+1]
    # plt.plot(left_trough, label='left');
    # plt.plot(right_trough, label='right');
    # plt.legend();plt.show()
    # left_iaa = np.sum(np.abs(left_trough))
    # right_iaa = np.sum(np.abs(right_trough))
    #
    # print(type(sample_trace))
    # plt.plot(sample_trace);plt.show()
    # print('ok')


def main():
    acorr_h5_file_path = '/home/kkappler/.cache/datacloud/line_creek/processed/1855_NS93_14_17822T_17822T_6172_6172/20190612-125430_QC0/5_trim_0.h5'
    acorr_trace = TraceData()
    acorr_trace.load_from_h5(acorr_h5_file_path)
    xtestx(acorr_trace)

if __name__ == '__main__':
    main()