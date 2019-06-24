# -*- coding: utf-8 -*-
"""
Created on Wed Jun 19 15:55:41 2019

@author: kkappler
this is a script version of BRuno's jupyter-notebook
"""

from __future__ import absolute_import, division, print_function
import datetime
import itertools
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import pdb
import scipy.signal as ssig
from dcrhino3.physics.modelling.drill_pipe import DrillPipe
from dcrhino3.physics.modelling.drill_pipe import get_default_drill_pipe
from dcrhino3.physics.modelling.rock import Rock
#from dcrhino3.physics.modelling.reflectivity_at_bit import amplitude_and_phase, inverse_transform
pi = np.pi
def wavenumber_formation(f, alpha):
    return 2 * pi * f / alpha

jj = np.complex(0, 1)
def inverse_transform(amplitude, phase, n=100000):
    freq_domain = np.nan_to_num(amplitude * np.cos(phase) + (amplitude * np.sin(phase))* 1j)

    huge_step = np.argmax(np.diff(freq_domain)[1:])+1

    freq_domain.real[huge_step:] = (0-freq_domain.real[huge_step:])
    freq_domain.imag[huge_step:] = freq_domain.imag.max() - (freq_domain.imag[huge_step:]) - freq_domain.imag.max()

    freq_domain_real = np.r_[freq_domain.real, freq_domain.real[::-1]][:-1]
    freq_domain_imag = np.r_[freq_domain.imag, freq_domain.imag[::-1]][:-1]

    freq_domain_imag[int(len(freq_domain_imag)/2):] = - freq_domain_imag[int(len(freq_domain_imag)/2):]

    inverse = np.fft.ifft(freq_domain_real + freq_domain_imag*1j, n=n)
    return np.fft.fftshift(inverse.real)

def amplitude_and_phase(drill_pipe, rock, frequency):
    """
    alpha: compressional_velocity in the formation
    the_factor: (1+6*np.sqrt(3))/12 = 949358737 ~=0.95 (error here? cf Poletto)
    k_alpha = w/alpha

    """
    #pdb.set_trace()
    the_factor = (1+6*np.sqrt(3))/12
    ww = 2 * np.pi * frequency
    k = ww / rock.alpha #frequency dependant wave number in formation
    #<poletto Equation #40>
    cot_phi = -1 * (k * drill_pipe.Rb * the_factor)
    #</poletto Equation #40>
    numerator = drill_pipe.Ab * rock.rho * rock.alpha
    denominator_1 = k * drill_pipe.Rb
    #0.00001
    #Zb = (numerator / denominator_1) / (1j - cot_phi) * .00001
    print("WHERE IS THE 0.00001 (=1/1e5) coming from??")
    Zb = 0.00001 * (numerator / denominator_1) / (1j - cot_phi)
    pdb.set_trace()
    #<below is equation 62 from poletto * -1)
    RC_complex = (drill_pipe.Z1 - Zb) / (drill_pipe.Z1 + Zb) #reflection coefficient = (Z1-Z2) / (Z1 + Z2)
    RC_complex[0] = (-1+0j)
    RC = np.abs(RC_complex)
    RC_tanphi = RC_complex.imag / RC_complex.real
    phi = np.arctan(RC_tanphi)
    pdb.set_trace()
    return RC, phi

#def plot_frequency_response




def my_function():
    """
    """
    alpha=np.arange(1750, 6600 + 50, 50)
    rho=np.arange(2200, 3200 + 50, 50)
    drill_pipe = DrillPipe(0.1365, 0.0687, 0.16, 4875.0, 7800.0)
    rock = Rock(alpha, rho) # maybe init as needed
    pdb.set_trace()
    print(rock)

    number_of_points_in_series = 100000
    jjj = np.arange(10000)+1
    f = (jjj - 1) * 0.5
    frequency_resolution = .5
    nyquist = 5000.0 # hertz

    r, a = 1700, 1700

    amp, phase = amplitude_and_phase(drill_pipe, Rock(r, a), f)
    pdb.set_trace()
    fig, (ax1, ax2, ax3) = plt.subplots(3, 1)

    freq_domain = np.nan_to_num(amp * np.cos(phase) + (amp * np.sin(phase))* 1j)
    # freq_domain[0] = 1+0j

    huge_step = np.argmax(np.diff(freq_domain)[1:])+1

    freq_domain.real[huge_step:] = (0-freq_domain.real[huge_step:])
    freq_domain.imag[huge_step:] = freq_domain.imag.max() - (freq_domain.imag[huge_step:]) - freq_domain.imag.max()

    freq_domain_real = np.r_[freq_domain.real, freq_domain.real[::-1]][:-1]
    freq_domain_imag = np.r_[freq_domain.imag, freq_domain.imag[::-1]][:-1]

    freq_domain_imag[int(len(freq_domain_imag)/2):] = - freq_domain_imag[int(len(freq_domain_imag)/2):]

    inverse = np.fft.ifft(freq_domain_real + freq_domain_imag*1j, n=None)
    ax1.plot(np.r_[f[:], f[:]+f.max()][:-1], freq_domain_real)
    ax2.plot(np.r_[f[:], f[:]+f.max()][:-1], freq_domain_imag)
    ax3.plot(np.fft.fftshift(inverse.real)[9950:10050])
    ax3.plot(np.fft.fftshift(inverse.imag)[9950:10050])


    ax1.set_ylabel('real')
    ax2.set_ylabel('imag')
    ax3.set_ylabel('')
    ax3.set_xlabel('')
    # ax3.set_ylim(0)
    for ax in [ax1, ax2, ax3]:
        ax.grid()
    fig.suptitle('rho={}, alpha={}'.format(r, a))
    fig = plt.gcf()
    fig.set_size_inches(15,7.5)
    fig.dpi = 200
    plt.show()


def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
