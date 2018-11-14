# -*- coding: utf-8 -*-
"""
Created on Wed Nov 14 12:21:45 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import time

jj = np.complex(0.0, 1.0)
def rotate_phase(data, phase_shift, degrees=True):
    """
    """
    if degrees is False:
        phase_shift_radians = phase_shift
    else:
        phase_shift_radians = phase_shift*np.pi/180.0

    N = len(data)
    sign_correction = np.ones(N)
    sign_correction[N//2:] -= 2
    sign_correction[0] = 0.0
    phasor = np.exp(-jj * phase_shift_radians * sign_correction)
    fft_data = np.fft.fft(data)
    phase_shifted_data_fft = fft_data*phasor
    phase_shifted_data_time = np.real(np.fft.ifft(phase_shifted_data_fft))
    return phase_shifted_data_time




def test_phase_rotation():
    """
    """
    data = np.load('pet_trace.npy')
    dt = 0.01;t = dt*np.arange(1000);data = np.sin(t)# + j*np.cos(t)
    phi = 90.0#90.0
    #n_radians = phi*np.pi/180.0
    phase_shifted_data_time = rotate_phase(data, phi)

    plt.plot(data, label='orig')
    plt.plot(phase_shifted_data_time, label='shift by {}'.format(phi))
    plt.legend()
    plt.show()

def main():
    """
    """
    test_phase_rotation()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
