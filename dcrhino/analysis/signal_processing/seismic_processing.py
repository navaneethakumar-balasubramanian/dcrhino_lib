# -*- coding: utf-8 -*-
"""
Created on Sun May 27 10:17:06 2018

@author: kkappler


"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb
from scipy.interpolate import interp1d
import scipy.linalg
import scipy.signal as ssig

from dcrhino.analysis.util.general_helper_functions import init_logging
from dcrhino.analysis.signal_processing.supporting_segy_processing import sampling_rate_segy_trace
logger = init_logging(__name__)

ACOUSTIC_VELOCITY = 4755
SHEAR_VELOCITY = 2654
MOUNT_POINTS_MONT_WRIGHT = ['mount_24_inch', 'mount_10_inch', 'mount_24_inch_180deg', 'mount_10_inch_180deg']
SAMPLES_TO_POLY_ORDER = {}; SAMPLES_TO_POLY_ORDER[3]=2;SAMPLES_TO_POLY_ORDER[4]=3;
SAMPLES_TO_POLY_ORDER[5]=3;SAMPLES_TO_POLY_ORDER[6]=3;SAMPLES_TO_POLY_ORDER[7]=4;
SAMPLES_TO_POLY_ORDER[8]=4;SAMPLES_TO_POLY_ORDER[9]=4;SAMPLES_TO_POLY_ORDER[10]=4;
SAMPLES_TO_POLY_ORDER[11]=4; SAMPLES_TO_POLY_ORDER[12]=4; SAMPLES_TO_POLY_ORDER[13]=5;

def resample_trace_to_idealized_sampling_rate(tr, data_duration, sps_ideal):
    """
    data_duration: floating point, length of the trace in seconds.  Usually 1.0
    sps_ideal: idealized_sampling_rate; usually 3200.0

    Several ways to go about interpolation
    -easiest is just
    """

    number_of_samples = len(tr.data)
    dt_original = (1.0 * data_duration) / number_of_samples
    time_axis_original = np.arange(number_of_samples) * dt_original
    interp_function = interp1d(time_axis_original, tr.data,
                               kind='linear', bounds_error=False, fill_value='extrapolate')
    ideal_number_of_samples = int( data_duration * sps_ideal )
    time_axis_ideal = np.arange(ideal_number_of_samples) * (1./sps_ideal)
    tr.data = interp_function(time_axis_ideal)
    return tr


def autocorrelate_trace(trace_data, n_pts):
    """
    n_pts: integer, this is the number of taps in the decon filter that will be solved for
    WARNING  wants even # points
    """
    zero_time_index = len(trace_data)//2
    acorr = np.correlate(trace_data, trace_data,'same')
    return acorr[zero_time_index:zero_time_index+n_pts]

def autocorrelate_trace_hankel_style(trace_data, n_pts):
    """
    numerically balanced version
    #did not work:  H_ = H[0:n_pts,0:n_pts]
    """

    H = scipy.linalg.hankel(trace_data)
    N = len(trace_data)
    H_ = H[0:(N/2),0:(N/2)]

    #R_xx = np.dot(H[0:(N/2)], H[:,0])
    acorr_matrix = np.dot(H_, H_)
    return acorr_matrix[0:n_pts,0:n_pts]



def deconvolve_trace(trace, filter_length, **kwargs):#plot=False):
    """
    20180526: variation on old process trace which was optimized to take advantage
    of numpy speed.  Here we approach in a way that is cruder and interacts more
    directly with obspy traces.  Conceptual flow is simpler but will be slower.
    20181029: To be deprecated - we are no longer using trace.data
    that was segy data structure
    """
    R_xx = autocorrelate_trace(trace.data, filter_length)
    nominal_scale_factor = 1.0;#1./R_xx[0]#1.0
    ATA = scipy.linalg.toeplitz(R_xx)
    try:
        ATAinv = scipy.linalg.inv(ATA)
    except np.linalg.linalg.LinAlgError:
        logger.warning('matrix inversion failed')
        return trace, R_xx[0]
    x_filter = nominal_scale_factor*ATAinv[0,:]
    deconv_trace = np.convolve(x_filter, trace.data, 'same')
    trace.data = deconv_trace
    return trace, R_xx[0]

def deconvolve_trace_data(trace_data, filter_length, **kwargs):#plot=False):
    """
    20180909: variation on deconvolve trace,but input is numpy array, not
    obspy structure.
    """
    hankel_style = kwargs.get('hankel_style', False)
    scale_factor = kwargs.get('scale_factor', None)
    if hankel_style:
        ATA = autocorrelate_trace_hankel_style(trace_data, filter_length)
        R_xx = [np.mean(np.diag(ATA)),]
    else:
        R_xx = autocorrelate_trace(trace_data, filter_length)
        if scale_factor is not None:
            R_xx *= scale_factor
        ATA = scipy.linalg.toeplitz(R_xx)
    nominal_scale_factor = 1.0;#1./R_xx[0]#1.0
    try:
        ATAinv = scipy.linalg.inv(ATA)
    except np.linalg.linalg.LinAlgError:
        logger.warning('matrix inversion failed')
        return trace_data, R_xx[0]
    x_filter = nominal_scale_factor*ATAinv[0,:]
    deconv_trace = np.convolve(x_filter, trace_data, 'same')
    trace_data = deconv_trace
    return trace_data, R_xx[0]

def deconvolve_trace_data_dev(trace_data, filter_length, **kwargs):#plot=False):
    """
    20180909: variation on deconvolve trace,but input is numpy array, not
    obspy structure.
    @TODO: add case for decon filter len=0, i.e. no decon, just return original
    """
    #pdb.set_trace()
    if filter_length == 0:
        deconv_trace = trace_data;
        R_xx = np.correlate(trace_data, trace_data)
        x_filter = np.asarray([1.,])
        return deconv_trace, R_xx[0], x_filter
    R_xx = autocorrelate_trace(trace_data, filter_length)
    nominal_scale_factor = 1.0;#1./R_xx[0]#1.0
    ATA = scipy.linalg.toeplitz(R_xx)
    try:
        ATAinv = scipy.linalg.inv(ATA)
    except np.linalg.linalg.LinAlgError:
        logger.warning('matrix inversion failed')
        return trace_data, R_xx[0]
    x_filter = nominal_scale_factor*ATAinv[0,:]
    deconv_trace = np.convolve(x_filter, trace_data, 'same')
    return deconv_trace, R_xx[0], x_filter

def process_from_decon_to_final(trace, decon_trace, fir_taps, decon_filter_length,
                                min_lag, max_lag, **kwargs):#plot=False):
    """
    #np.corr(lag, lead)
    TODO: confirm lead, lag correct
    #decon_filter_offset: corresponds to the fact that the correlation peak is to the
    right of the series center due to the deconvolution filter process
    """
    zero_time_index = len(trace.data) // 2
    decon_filter_offset = decon_filter_length // 2
    t0_index = zero_time_index + decon_filter_offset #2750
    tr_corr_w_deconv = np.correlate(trace.data, decon_trace.data, 'same')

#    if fir_filter.taps
    if (len(fir_taps) == 1) and (fir_taps[0]==1.0):
        bpf_data = tr_corr_w_deconv
    else:
        bpf_data = ssig.filtfilt(fir_taps, 1., tr_corr_w_deconv).astype('float32')
        #bpf_data = ssig.lfilter(fir_filter.taps, 1., tr_corr_w_deconv).astype('float32')
        #bpf_data = ssig.lfilter(fir_filter.taps, 1., bpf_data).astype('float32')
    sampling_rate = sampling_rate_segy_trace(trace)
    n_samples_back = int(sampling_rate * np.abs(min_lag))
    n_samples_fwd = int(sampling_rate * max_lag)
    back_ndx = t0_index - n_samples_back
    fin_ndx = t0_index + n_samples_fwd

    little_data = bpf_data[back_ndx:fin_ndx]
    decon_trace.data = little_data
    return decon_trace



def calculate_spiking_decon_filter(trace_data, filter_length,  dt, start_ms,
                                   end_ms, **kwargs):
    """
    - you want to equalize (best you can) the spectrum from trace to trace
    - if you dont, and you have a variable center frequency (say 100-250Hz)
    what that does it it creates a multiple with variable velocity ...
    so you will get multiples with different velocities becuase of the varying frequencies
    because its a dispersive wave
    -
    dt: float, time interval of a sample (1/sps)
    start_ms: how long after the minimum phase max spike you want to start considering
    data to input; specific to "correlated, deconvolved trace" ... can probably use
    argmax to find the spot to start counting ms, alternatively can use some theoretical
    value, but that depends on having the previous measurand info available and DC
    is not ready for that yet
    end_ms: when to stop admitting data, see above.

    filter_length: integer, specifying how many taps, .. we usually specify in ms
    and then calc from sps.
    #trim the correlated trace at 110 - 170 ms
    """
    #plot = kwargs.get('plot', False)
    #dt = kwargs.get('dt', None)
    add_noise_percent = kwargs.get('add_noise_percent', 5.0)
    noise_fraction = add_noise_percent / 100.0

    max_trace_arg = np.argmax(trace_data)
    n_samples_from_max_to_window = int(np.floor((0.001 * start_ms) / dt))
    first_sample_to_use = max_trace_arg + n_samples_from_max_to_window
    window_width = (end_ms - start_ms) * 0.001
    final_sample_to_use = first_sample_to_use + int(np.ceil(window_width/dt))
    #pdb.set_trace()
    sub_region_to_use_for_decon_calculation = trace_data[first_sample_to_use:final_sample_to_use]
    #pdb.set_trace()
    R_xx = autocorrelate_trace(sub_region_to_use_for_decon_calculation, filter_length)
    R_xx[0] *= (1+noise_fraction)
    #pdb.set_trace()
    nominal_scale_factor = 1.0;#1./R_xx[0]#1.0
    ATA = scipy.linalg.toeplitz(R_xx)
    try:
        ATAinv = scipy.linalg.inv(ATA)
    except np.linalg.linalg.LinAlgError:
        print('matrix inversion failed')  #
        return trace_data, R_xx[0]
    x_filter = nominal_scale_factor*ATAinv[0,:]

    despike_trace = np.convolve(x_filter, trace_data, 'same')#original
#    if plot:
#        fig, ax = plt.subplots(2,1, sharex=True)
#        #n_samples = len(trace_data)
#        #time_axis = dt*np.arange(n_samples)
#     #   pdb.set_trace()
#        #ax.plot(time_axis, trace_data)
#        ax[0].plot(trace_data, label='parent trace')
#        ax[0].plot(np.arange(first_sample_to_use,final_sample_to_use),
#                sub_region_to_use_for_decon_calculation, label='subregion for calc decon filter')
#        ax[0].plot(despike_trace, label='despiked deconvolved correlated trace')
#        ax[0].vlines([first_sample_to_use, final_sample_to_use], ax[0].get_ylim()[0], ax[0].get_ylim()[1])
#        ax[0].legend()
#
#        ax[1].plot(bpf_orig, label='orig')
#        ax[1].plot(bpf_despike, label='despike')
#        plt.legend()
#        plt.show()

    #trim the correlated trace at 110 - 170 ms
    #return bpf_despike, x_filter
    return despike_trace, x_filter

def max_reflection_amplitude(trace):
    """
    Note: assumes trace has been autocorreltated and max_lag and min_lag
    are equal
    TODO: make this depend generally on max_lag and min_lag.
    TODO: think carefully.  If acorr is at the heart of generation, as long as
    we do not have major phase rotation (and we do not at this time since we
    used a zero-phase filter) then we should be able to simply return the max
    value.  Nevertheless, going to leave this as its own separate function for now.
    """
    #n_pts = len(trace.data)

    return np.max(trace.data)

def pick_max_from_trace_using_polyfit(data, time_axis, neighborhood_edge_indices,
                                      polyfit_window_halfwidth_samples, sanity_check_plot=False):
    """
    data: 1d array
    start in wide neighborhoor, zero in on max value and place a narrow window
    around the max; polyfit, pick max;
    usage:
        t_max, max_poly_amplitude = pick_max_from_trace_using_polyfit(data, time_axis, neighborhood_edge_indices,
                                      polyfit_window_halfwidth_samples)


    """
    data_probable_region = data[neighborhood_edge_indices[0]:neighborhood_edge_indices[1]]
    t_probable_region = time_axis[neighborhood_edge_indices[0]:neighborhood_edge_indices[1]]
    max_index = np.argmax(data_probable_region) #we expect this to be near the middle and not the edges
    left_hand_edge_polyfit = max_index - polyfit_window_halfwidth_samples
    right_hand_edge_poly_fit = max_index + polyfit_window_halfwidth_samples + 1

    data_window_polyfit = data_probable_region[left_hand_edge_polyfit:right_hand_edge_poly_fit]
    t_primary_window_polyfit = t_probable_region[left_hand_edge_polyfit:right_hand_edge_poly_fit]


    #<check if max is on edge throw out this trace>
    if len(data_window_polyfit) == 0:
        print("Bad trace! You a are very, very naughty trace")
        max_poly_amplitude = np.nan; t_max = np.nan
    elif np.argmax(data_window_polyfit) != polyfit_window_halfwidth_samples:
        print("max sample is on the egde of the estimated window rather than in center - \
              timing error or some unexpected issue - reject this trace")
        max_poly_amplitude = np.nan; t_max = np.nan
    #</check if max is on edge throw out this trace>
    else:
        max_poly_amplitude, max_poly_ndx = pick_poly_peak(data_window_polyfit, plot=False)
        time_interp_ndx_fcn = interp1d(np.arange(len(t_primary_window_polyfit)), t_primary_window_polyfit)
        t_max = time_interp_ndx_fcn(max_poly_ndx)
        t_max = float(t_max)#voodoo
    if sanity_check_plot:
        plt.figure(1);plt.clf()
        plt.plot(t_probable_region, data_probable_region);
        plt.plot(t_primary_window_polyfit, data_window_polyfit, 'r*');
        ttl_string = 'peak at index={}, t={}'.format(max_poly_ndx, t_max)
        plt.title(ttl_string)
        plt.vlines(t_max, plt.ylim()[0], plt.ylim()[1])
        plt.show()
    return t_max, max_poly_amplitude


def get_tangential_despike_filtered_trace_features(trace_data, global_config,
                                                   component='tangential',
                                                   sanity_check_plot=False):
    """
    trace_data is trimmed, and primary is approximately in the center
    Start with a wide, estimated primary window (~4ms, or 16 samples wide)
    look left and right of the trace (expected at the center) by 1.25ms

    @returns: dictionary keyed by feature labels
    For now these are:
        primary_time_poly, primary_amplitude_poly, multiple1_time_poly, multiple1_ampltiude_poly
    """
    #<initialize feature dictionary>
    feature_labels = ['primary_time_poly', 'primary_amplitude_poly', 'multiple1_time_poly', 'multiple1_amplitude_poly']
    feature_labels = ['{}_{}'.format(component, x) for x in feature_labels]
    features = {}
    for feature_label in feature_labels:
        features[feature_label] = np.nan
    #</initialize feature dictionary>

    #<PRIMARY>
    print("WARNING: polyfit_primary_window_halfwidth_samples should be in config file, and possibly component dependent??")
    polyfit_primary_window_halfwidth_samples = 2 #half the positive half-sine

    time_axis = global_config.dt * np.arange(len(trace_data)) + global_config.min_lag_trimmed_trace
    expected_center_of_trace_index = len(trace_data) // 2
    print("WARNING: primary_window_halfwidth_ms should be component dependent??")
    #we expect primary_window_halfwidth_ms=2.0 during dev
    primary_window_halfwidth_samples = int(0.001 * global_config.primary_window_halfwidth_ms / global_config.dt)
    primary_neighborhood_edge_indices = np.array([expected_center_of_trace_index - primary_window_halfwidth_samples,
                                     expected_center_of_trace_index + primary_window_halfwidth_samples])

    t_max_primary, max_poly_amplitude_primary = pick_max_from_trace_using_polyfit(trace_data, time_axis,
                                                                  primary_neighborhood_edge_indices,
                                                                  polyfit_primary_window_halfwidth_samples,
                                                                  sanity_check_plot=sanity_check_plot)

    features['{}_primary_amplitude_poly'.format(component)] = max_poly_amplitude_primary
    features['{}_primary_time_poly'.format(component)] = t_max_primary
    #</PRIMARY>

    #<MULTIPLE>
    #the multiple without phase rotation is exepcted to be rotated by 90degrees
    #so looking for peak here actually has an asymmetery
    expected_multiple_time  = 2 * (global_config.sensor_distance_to_source /SHEAR_VELOCITY)
    multiple_offset_samples = int(expected_multiple_time / global_config.dt)
    expected_near_multiple_index = expected_center_of_trace_index + multiple_offset_samples

    print("WARNING: tangential_mult1_window_halfwidth_ms should be in config file, and possibly component dependent??")
    tangential_mult1_window_halfwidth_ms = 2.0;
    #look_left_ms = 1.0
    #look_right_ms = 2.0
    look_left_ms = tangential_mult1_window_halfwidth_ms;
    look_right_ms = tangential_mult1_window_halfwidth_ms;
    look_left_index = -int(0.001 * look_left_ms/global_config.dt)
    look_right_index = int(0.001 * look_right_ms/global_config.dt)

    multiple_neighborhood_edge_indices = np.array([look_left_index, look_right_index]) + expected_near_multiple_index
    polyfit_multiple_window_halfwidth_in_samples = 2 #half the positive half-sine

    t_max_mult1, max_poly_amplitude_mult1 = pick_max_from_trace_using_polyfit(trace_data, time_axis,
                                                                  multiple_neighborhood_edge_indices,
                                                                  polyfit_multiple_window_halfwidth_in_samples,
                                                                  sanity_check_plot=sanity_check_plot)

    features['{}_multiple1_amplitude_poly'.format(component)] = max_poly_amplitude_mult1
    features['{}_multiple1_time_poly'.format(component)] = t_max_mult1
    return features






def pick_poly_peak(region_in_max_neighborhood, **kwargs):
    """
    usage:
        max_amplitude, max_ndx = pick_poly_peak(region_in_max_neighborhood, plot=True)
    fit a poly, then find its critical point in your region of interest;

    Critical points are where first derivative is zero

    There will be poly_ord - 1 critical points.

    If there are ever more than one of them in
    TODO: add logging for when there are multiple critical points
    TODO: if there are many cases of multiple critical points, review how to handle

    20180712: Change poly order to depend on num_samples
    """
    n_samples = len(region_in_max_neighborhood)
    poly_order = SAMPLES_TO_POLY_ORDER[n_samples]
    t_poly = np.arange(len(region_in_max_neighborhood))
    z = np.polyfit(t_poly, region_in_max_neighborhood, poly_order)
    plot = kwargs.get('plot', False)
    poly = np.poly1d(z)
    dpdt = np.polyder(poly)
    critical_points = np.roots(dpdt)
    critical_points = critical_points[np.where(np.imag(critical_points)==0.0)[0]]#real roots only
    critical_points = np.real(critical_points)
    candidate_critical_point_indices = np.where((critical_points>t_poly[0]) & (critical_points<t_poly[-1]))[0]
    if len(candidate_critical_point_indices)==1:
        max_amplitude = poly(critical_points[candidate_critical_point_indices[0]])
        max_ndx = critical_points[candidate_critical_point_indices[0]]
    else:#if len(candidate_critical_point_indices)==0:
        middle_index = (len(t_poly)-1)/2
        middle_index = int(middle_index)
        max_amplitude = poly(t_poly[middle_index])
        max_ndx = float(middle_index)
#    else:
#        #there is more than one candidate ... pick the largest? closest to expected
#        middle_index = (len(t_poly)-1)/2
#        middle_index = int(middle_index) #not sure why/how this is being cast as float.. weird, forcing it
#        #pdb.set_trace()
#        #IndexError: only integers, slices (`:`), ellipsis (`...`), numpy.newaxis (`None`) and integer or boolean arrays are valid indices
#        max_amplitude = poly(t_poly[middle_index])
#        max_ndx = float(middle_index)
#        #return
    #poly_data = poly(tt)
    #max_amplitude = np.max(poly_data)
    #max_ndx = np.argmax(poly_data)
    #pdb.set_trace()
    if plot:
        upsample_factor = 1000.
        tt = np.arange(len(t_poly)*int(upsample_factor))/float(upsample_factor)#np.linear_slope = poly1[0]
        plt.plot(t_poly, region_in_max_neighborhood)
        plt.plot(tt, poly(tt))
        #plt.vlines([np.argmax(region_in_max_neighborhood), np.argmax(poly(tt))/float(upsample_factor)], 0, 1)
        plt.vlines([np.argmax(region_in_max_neighborhood), max_ndx], 0, 1)
        plt.show()
    return max_amplitude, max_ndx

def max_reflection_amplitude2(trace, **kwargs):
    """
    Note: assumes trace has been autocorreltated and max_lag and min_lag
    are equal
    TODO: make this depend generally on max_lag and min_lag.
    TODO: n_pad is in samples, needs to be set to duration.  If trace.sampling_rate is 3200 can be 5
    x = np.arange(len(time_series))
    z = np.polyfit(x, time_series, polynonial_order)
    p = np.poly1d(z)
    polyfit_ts = p(x)
    time_series -= polyfit_ts
    return time_series

    """
    pad_duration = 0.0015 #approximately 1.5ms
    dt = 1./sampling_rate_segy_trace(trace)
    n_pad = int(np.round(pad_duration / dt)) #5 (11)for 3200Hz
    approx_max_sample_index = np.argmax(trace.data)


    region_in_max_neighborhood = trace.data[approx_max_sample_index-n_pad:approx_max_sample_index+n_pad+1]
    #<20180628>
    #stopgap fix for mont wright: 50339, 30 May 2018 has bad trace, hole 1, i_trace >= 14700
    #max index was 3 !?
    if len(region_in_max_neighborhood) == 0:
        print("WARNING: this may indicate trace max is on edge of series - unexpected")
        approx_max_sample_index = int(len(trace.data)/2)
        region_in_max_neighborhood = trace.data[approx_max_sample_index-n_pad:approx_max_sample_index+n_pad+1]
    #<20180628>
    max_reflection_amplitude, max_poly_ndx = pick_poly_peak(region_in_max_neighborhood)
    #pdb.set_trace()
    max_poly_ndx -= n_pad
    max_ndx = approx_max_sample_index + max_poly_ndx


    return max_reflection_amplitude, max_ndx


#def max_multiple_amplitude(trace, search_forward_ms=2.5, search_backward_ms=0.0, **kwargs):
def max_multiple_amplitude(trace, **kwargs):
    """
    TODO: make this depend generally on max_lag and min_lag.  Currently assumes
    trace has been autocorreltated and max_lag and min_lag are equal
    NOTE: olde version of this in sog-proc unstable has a recipe for doing this
    in a vector way using 2d numpy arrays.  That should run faster
    but for now use the 'trace-by-trace' implementaiton.

    #add one-half wavelength to the THEORETICAL TIME
    #freq-center=200Hz; 2.5ms.  Seafch window = 2.5ms
    TODO: modify to use trace_plotter() from analysis.graphical.supporting_trace_plotting
    """
    search_forward_ms = kwargs.get('search_forward_ms', None)
    search_backward_ms = kwargs.get('search_backward_ms', None)

    plot = kwargs.get('plot', False)
    n_samples = len(trace.data)
    #pdb.set_trace()
    travel_distance = 2 * trace.stats.segy.trace_header.sensor_distance_to_source
    theoretical_two_way_travel_time = travel_distance / ACOUSTIC_VELOCITY
    if np.remainder(n_samples,2) == 1:
        print("ERROR - need even sample number  - check this before you are here")
        raise Exception
    #pdb.set_trace()
    dt = 1./sampling_rate_segy_trace(trace)
    time_vector = dt * np.arange(-n_samples//2, n_samples//2)
    #max_amplitude_of_multiple = 1.0
    max_ndx_ish = np.argmin(np.abs(time_vector-theoretical_two_way_travel_time))
    forward_pad_duration = search_forward_ms * 1e-3 #convert ms to seconds
    n_samples_to_pad_search_forward = int(forward_pad_duration/dt) #ceil? 13 for
    backward_pad_duration = search_backward_ms * 1e-3 #convert ms to seconds
    n_samples_to_pad_search_backward = int(backward_pad_duration/dt)
    lower_index = max_ndx_ish - n_samples_to_pad_search_backward
    upper_index = max_ndx_ish + n_samples_to_pad_search_forward#+1?
    max_amplitude_trace_section = trace.data[lower_index:upper_index]
    #print(np.max(max_amplitude_trace_section))
    if plot:
        fig, ax = plt.subplots()
        ax.plot(time_vector, trace.data);
        ax.plot(theoretical_two_way_travel_time*np.asarray([1.,1.]),ax.get_ylim());
        back_pad_time = theoretical_two_way_travel_time - n_samples_to_pad_search_backward*dt
        ax.plot((back_pad_time)*np.asarray([1.,1.]),ax.get_ylim());
        forward_pad_time = theoretical_two_way_travel_time + n_samples_to_pad_search_forward*dt
        ax.plot((forward_pad_time)*np.asarray([1.,1.]),ax.get_ylim());
        ax.plot(np.asarray([-0.05,0.05]),np.asarray([0,0]), color='black', linewidth=2);
        plt.show()
    max_amplitude = np.max(max_amplitude_trace_section)
    max_ndx = max_ndx_ish + np.argmax(max_amplitude_trace_section)
    #pdb.set_trace()
    #max_ndx = np.argmax()
    return max_amplitude, max_ndx




def max_multiple_amplitude2(trace, **kwargs):
    """
    TODO: make this depend generally on max_lag and min_lag.  Currently assumes
    trace has been autocorreltated and max_lag and min_lag are equal
    NOTE: olde version of this in sog-proc unstable has a recipe for doing this
    in a vector way using 2d numpy arrays.  That should run faster
    but for now use the 'trace-by-trace' implementaiton.

    #add one-half wavelength to the THEORETICAL TIME
    #freq-center=200Hz; 2.5ms.  Seafch window = 2.5ms

    tolerance: If the refined estimate is more than this number of seconds from the
    original estimate, something is probably not good with SNR on multiple, so use original estimate.
    @kwarg:
    """
    search_forward_ms = kwargs.get('search_forward_ms', None)
    search_backward_ms = kwargs.get('search_backward_ms', None)
    plot = kwargs.get('plot', False)
    tolerance = kwargs.get('tolerance', 1e-3)
    olde_max_amplitude, olde_max_index = max_multiple_amplitude(trace, search_forward_ms=search_forward_ms,
                                                                search_backward_ms=search_backward_ms )#, plot=True)

    pad_duration = 0.0015 #approximately 1.5ms
    dt = 1./sampling_rate_segy_trace(trace)
    n_pad = int(np.round(pad_duration/dt)) #5 for 3200Hz


    region_in_max_neighborhood = trace.data[olde_max_index-n_pad:olde_max_index+n_pad+1]
    #pdb.set_trace()
    max_amplitude, max_poly_ndx = pick_poly_peak(region_in_max_neighborhood)

    max_poly_ndx -= n_pad #correct for padding
    max_ndx = olde_max_index + max_poly_ndx
    interval_between_picked_peaks = trace.stats.delta * np.abs(max_ndx - olde_max_index)

    #print(type(interval_between_picked_peaks))
    if interval_between_picked_peaks > tolerance:
        max_amplitude = olde_max_amplitude#[0]
        max_ndx = olde_max_index#[0]


    return max_amplitude, max_ndx


def get_feature_dict_20180717(trace):
    """
    trace is a correlated trace with a time axis defined on it ; plot it to see,

    here we have an algorithm which extracts features from a window.
    We use it in two cases:
        In the first case we apply it to peak
    """

    pdb.set_trace()

    plt.plot(trace.data);
    plt.show()


#<THESE FUNCTIONS DEFINED BY change in processing proceedure 20180717>

def get_wavelet_window_indices(time_vector, start_time, end_time):
    """
    20170823: this intended to replace variations on method from primary, multiple_peak_finder, multiple_refined,
    Here start and end times are intended to be floats
    """
    indices = np.where( (time_vector > start_time) & (time_vector < end_time) )[0]
    return indices

def get_primary_reflection_analysis_window_indices(window_half_width, sampling_rate, n_samples):
    """
    originally we were thinking 2ms window_half_width
    n_Samples: number of samples in correlatied trace in this case
    """
    dt = 1. / sampling_rate
    time_vector = dt * np.arange(-n_samples//2, n_samples//2)
    indices = np.where( (time_vector > -window_half_width) & (time_vector < window_half_width) )[0]
    return indices

#def get_multiple_reflection_expected_window_indices(earliest_time, window_width, sampling_rate, n_samples):
#    """
#    originally we were thinking 2ms window_half_width
#    n_Samples: number of samples in correlatied trace in this case
#    """
#    dt = 1. / sampling_rate
#    time_vector = dt * np.arange(-n_samples//2, n_samples//2)
#    indices = np.where( (time_vector > earliest_time) & (time_vector < earliest_time + window_width) )[0]
#    return indices

def fit_poly_to_window(data, time_vector, ndx, sampling_rate):

    window = data#[ndx]
    t_poly = time_vector[ndx]
    z = np.polyfit(t_poly, window, len(ndx)-1)
    poly = np.poly1d(z)
    dpdt = np.polyder(poly)
    peak_times = dpdt.roots
    peak_times = peak_times[np.isreal(peak_times)] #should be exactly one
    zxs = poly.roots
    zxs = zxs[np.isreal(zxs)] #should be exactly one
    pdb.set_trace()
    print('s')

def get_earliest_expected_mulitple_time(tr):
    travel_distance = 2 * tr.stats.segy.trace_header.sensor_distance_to_source
    theoretical_two_way_travel_time = travel_distance / ACOUSTIC_VELOCITY
    earliest_multiple_time = theoretical_two_way_travel_time #WHY
    return earliest_multiple_time

    #plt.plot(t_poly, window, 'ro')
    #tt = np.linspace(t_poly[0], t_poly[-1], 10000)
    #plt.plot(tt, poly(tt))
#    t_poly = dt * np.arange(-n_samples//2, n_samples//2)
#    ndx =
#    n_samples_left = window_half_width / dt
#    pdb.set_trace()
#    print('s')
#     ndx = np.where((time_vector<0.002) & (time_vector>-0.002))[0]
#(Pdb) ndx
#array([314, 315, 316, ..., 324, 325, 326])
#(Pdb) plt.plot(time_vector[ndx], st.traces[0][ndx], 'ro')
#[<matplotlib.lines.Line2D object at 0x7f8cd1066310>]
#(Pdb) plt.show()
#(Pdb) plt.plot(time_vector, st.traces[0], '*')
#[<matplotlib.lines.Line2D object at 0x7f8cd7ce1e90>]
#(Pdb) plt.plot(time_vector[ndx], st.traces[0][ndx], 'ro')
#[<matplotlib.lines.Line2D object at 0x7f8cd7ce1f10>]
#(Pdb) plt.vlines([-0.002, 0.002], -0.2, 0.2)
#<matplotlib.collections.LineCollection object at 0x7f8cd7c8b410>
#(Pdb) plt.plot(np.asarray([-0.3,0.3]), np.asarray([0,0]), 'k')
#[<matplotlib.lines.Line2D object at 0x7f8cd7c8bb10>]
#(Pdb) plt.show()
#(Pdb) window = st.traces[0][ndx]
#(Pdb) len(window)
#13
#(Pdb) t_poly=np.aange(13)
#*** AttributeError: 'module' object has no attribute 'aange'
#(Pdb) t_poly=np.arange(13)
#(Pdb) t_poly
#array([ 0,  1,  2, ..., 10, 11, 12])
#(Pdb) z = np.polyfit(t_poly, window, 12)
#(Pdb) poly = np.poly1d(z)
#(Pdb)
#    dt = 1. / sampling_rate
#    n_samples_left = window_half_width / dt
#    pdb.set_trace()
#    print('s')

    return

def define_multiple_reflection_analysis_window():
    return

def get_primary_window_data():
    return

def get_multiple_window_data():
    return

def fit_exact_polynomial():
    return

def integrate_polynomial(lower_limt, upper_limit):
    return

def solve_for_peak(): #key here is to search between just the samples adjacent to max sample.
    return

def solve_for_zero_crossings():
    return
#<THESE FUNCTIONS DEFINED BY JWR 20180717>


def main():
    """
    """
    sampling_rate = 3200.0; dt = 1./sampling_rate
    n_samples = 640
    time_vector = dt * np.arange(-n_samples//2, n_samples//2)
    data = np.array([-0.12249935, -0.09939641, -0.05369233, 0.0062756278,
                     0.067968965, 0.117845, 0.14483869, 0.14370477, 0.116128385,
                     0.070171475, 0.01790597, -0.02801486, -0.05779984])#, dtype=float32)
    ndx = get_primary_reflection_analysis_window_indices(2e-3, sampling_rate, n_samples)
    fit_poly_to_window(data, time_vector, ndx, sampling_rate)
    pdb.set_trace()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
