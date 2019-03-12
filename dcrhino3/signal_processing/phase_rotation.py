# -*- coding: utf-8 -*-
"""
Created on Wed Nov 14 12:21:45 2018

Author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging
logger = init_logging(__name__)

jj = np.complex(0.0, 1.0)

def rotate_phase(data, phase_shift, degrees=True):
    """
    Phase rotation by fast fourier transform, multiplication by phasor, inverse fft
    and taking reals. Rotates data by phi
    
    Parameters:
        data (array): numpy array (currently 1D, need to test as 2D might need 
             to transpose)
        phase shift (float): float: #of degrees to shift signal phase
            
    Other Parameters:
        degrees (bool): True for degrees, false for radians
        
    Returns:
        (real Numpy ndarray): Phase shifted data
    """
    if degrees is False:
        phase_shift_radians = phase_shift
    else:
        phase_shift_radians = phase_shift * np.pi / 180.0

    N = len(data)
    sign_correction = np.sign(np.fft.fftfreq(N))
    phasor = np.exp(-jj * phase_shift_radians * sign_correction)
    fft_data = np.fft.fft(data)
    phase_shifted_data_fft = fft_data*phasor
    phase_shifted_data_time = np.real(np.fft.ifft(phase_shifted_data_fft))
    return phase_shifted_data_time


def determine_phase_state(data, trough_search_width):
    """
    Determine the phase state by searching for troughs to the left and right of the
    peak. Indeterminate means no troughs or too small search width, balanced means
    equal number of troughs on both sides, left_low/right_low means trough
    count imbalance.
    
    Parameters:
        data (array): numpy array (currently 1D, need to test as 2D might need 
             to transpose)
        trough-search-width (float): this is how far to the left and right of 
            the peak we will
            look for a minumum.  It must be large enough for the minimum to be contained,
            but not so large that we may find another minumum show up
            
    Returns:
        (str): Phase state status as one of the following:
        
            + 'indeterminate'
            + 'balanced'
            + 'left_low'
            + 'right_low'
            + 'surprise - already balanced'

    .. note:: 20190211: I do not understand the condition  max_index<trough_search_width
        which leads to balanced .. it works most of the time but for left low traces with
        fewer observations to th left than the right it is returning balanced prematurely
        -- I'm going to comment it out and see what happens
    """
    phase_state = 'indeterminate'
    #print('trough_search_width {}'.format(trough_search_width))
    max_index = np.argmax(data)
    left_trough_region = data[max_index-trough_search_width:max_index]
    if len(left_trough_region) == 0:
        left_trough_region = data[:max_index]
    right_trough_region = data[max_index:max_index+trough_search_width]
    if len(right_trough_region) == 0:
        logger.warning('{} phase state'.format(phase_state)) #this should not happen
        return phase_state
    #print(max_index)
#    if max_index<trough_search_width:
#        return 'balanced'
    #left_min_value = np.min(left_trough_region)
    try:
        left_min_index = np.argmin(left_trough_region)
    except ValueError:
        logger.warning('{} phase state'.format(phase_state))
        return phase_state

    left_min_value = left_trough_region[left_min_index]
    #left_min_value = data[max_index-left_min_index-1]

    right_min_index = np.argmin(right_trough_region)
    right_min_value = data[max_index + right_min_index]
#    right_min_value = np.min(right_trough_region)


    if left_min_value == right_min_value:
        print('surprise - already balanced')
        phase_state = 'balanced'
    elif left_min_value < right_min_value:
        phase_state = 'left_low'
    elif right_min_value < left_min_value:
        phase_state = 'right_low'
    #pdb.set_trace()
#    fig, ax = plt.subplots()
#    ax.plot(data)
#    ax.vlines([max_index-trough_search_width, max_index+trough_search_width], ax.get_ylim()[0], ax.get_ylim()[1])
#    plt.title('{}, left={:.2}, right={:.2}'.format(phase_state, left_min_value, right_min_value))
#    plt.show()
    return phase_state

def test_phase_rotation():
    """
    Loads pet_trace, plots original, shift by phi, and shift by 2phi to test 
    the functionality of :func:`rotate_phase`
    """
    data = np.load('pet_trace.npy')
    dt = 0.01;t = dt*np.arange(1000);data = np.sin(t)# + j*np.cos(t)
    phi = 90.0#90.0
    #n_radians = phi*np.pi/180.0
    phase_shifted_data_time = rotate_phase(data, phi)
    pdb.set_trace()
    phase_shifted_data_time2 = rotate_phase(data[1:], phi)
    plt.plot(data, label='orig')
    plt.plot(phase_shifted_data_time, label='shift by {}'.format(phi))
    plt.plot(phase_shifted_data_time2, label='2shift by {}'.format(phi))
    plt.legend()
    plt.show()

def main():
    """
    """
    test_phase_rotation()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
