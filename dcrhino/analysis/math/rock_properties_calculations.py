# -*- coding: utf-8 -*-
"""
Created on Sat Jun 30 16:28:42 2018

@author: kkappler

I'm thinking that we probably need to use  2*(peaktime-multtime -7.5)
in the denominator calculation for velocity.
We can use a numerator  velocity of 10000,
and we should get numbers between 5000 and 2000 with more variance....

we should do the same for the density calculation.
I'd also like you to try squaring the denominator
in the density calculation (use the same formula above)

#<20180703 1730>
JWR:
    - ratio and calc of modulus is about right
    - did some looking online ... schist, gneiss
    - maybe knock down by ~70%
    - youngs modulus for Iron ore is ~119
    -
    - The big error: velocity
    - we have pipelength/(4755) ?*2  average delay
    - when we pick our delay difference we should be ratioing it to the theoretical
    travel time.  We square this to get velocity;  Now we are +/-20%

    - think about ucs, if we knock it down 60% its plus or minus 50%
    - then ucs +/- 50%, velocity +/25%
    - modulus = rho* v**2

    - drop the modulus down by 65%, 70%,
    -
#</20180703 1730>
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

f_impedance_calc = 150#what is this???


def calculate_simple_impedance(P, M, ADS, RBeff, f):
    """
    """
    pass

def calculate_impedance(P, M, ADS, RBeff, f, **kwargs):
    """
    TODO: take Deepak's doc for this calc'n and add here

    The scale factor used to be used as follows:
        AI_max = 100; AI_min = 20
        #compute AI_median for each hole
        AI_mean = (AI_max-AI_min) / 2
        alpha =  AI_mean / global_ai_median
    TODO: resolve whether we wish to use the true mean??
    AI_max = 100
    AI_min = 20
    #compute AI_median for each hole
    AI_mean = (AI_max-AI_min) / 2
    alpha =  AI_mean / global_ai_median
    df_per_hole['AI'] = df_per_hole['AI'] * alpha

    """
    scale_factor = kwargs.get('impedance_scale_factor', 45.)
    median_normalization = kwargs.get('median_normalization', None)
    A = np.sqrt(M/P)
    Z = (1-A)/(1+A)
    Z = Z * 4755 * 7700 * ADS* RBeff / f

    if median_normalization:
        Z_median = np.median(Z)
    #Z_mean = np.mean(Z)
    Z_alpha =  scale_factor / Z_median# used to be (100 - 20)/2
    Z *= Z_alpha
    return Z


#        #density (g/cc)  = (MI/1486/(UCS^1/3))^.5/10^6
#        s1 = (df_per_hole['AI']/1486/(np.power(df_per_hole['UCS'], 1./3)))
#        s2 = np.power(s1, 1./2)
#        df.loc[df_per_hole.index, 'density'] = s2
def get_global_reference_peak_amplitude(list_of_bench_pattern_pairs):
    """
    careful, you probably don't want to mix the 24" and 10"
    """
    print("iterate over all holes in the descriptor and get all in one df")
    print("then take median or percentile or what have you")
    print("may as well print a histogram")
    #return median for now
    return None

def calculate_delay_from_indices(peak_index, mult_index, dt, milliseconds=False):
    delay = (mult_index - peak_index) * dt

    if milliseconds:
        delay *= 1000.
    return delay

def calculate_ucs(peak_reflection_amplitude):
    """
    NOTE The median normalization should be over all the holes
    """
    ucs = np.sqrt(peak_reflection_amplitude)
    ucs_mean = (500 - 25) / 2
    reference_peak_amplitude = get_global_reference_peak_amplitude()
    alpha = ucs_mean / np.sqrt(reference_peak_amplitude)
    ucs *= alpha
    return ucs


def calculate_density(peak_ampl, mult_ampl, delay):
    """
    A = 1./ratio
    B = 100. - delay
    C = B**2
    rho = A / C
    TODO: transform indices into time using dt
    """
    A = peak_ampl/mult_ampl
    rho = A/(delay**2)
    return rho

def calculate_density2(peak_ampl, mult_ampl, velocity):
    """
    22.9
    """
    modulus = calculate_modulus(peak_ampl, mult_ampl)
    rho = modulus / velocity**2
    rho *= 1e6
    return rho

def calculate_modulus(peak_ampl, mult_ampl):
    """
    GPa
    @change scalarmult from 10 to 6, 03 July 2018
    """
    scalar_multiplier = 6. #10
    pseudo_modulus = scalar_multiplier * peak_ampl/mult_ampl
    return pseudo_modulus


def calculate_ucs2(peak_ampl):
    """
    MPa
    """
    ucs = 60 * (np.sqrt(peak_ampl))
    return ucs

def calculate_velocity(delay, average_velocity=3000., expected_delay=None):
    """
    TODO: fix sps
    big delay is slow velocity
    """
    #<v0>
    #velocity = 10000./delay #v0
    #</v0>

    #<v1>
    #201807xx
    #average_velocity = 3000.0#m/s
    #velocity = average_velocity * (expected_delay/delay)**2
    #</v1>

    #<v2>
    #20180705
    reference_value = 180000000.0#m/s
    delay *= 1000
    k = delay**5
    #pdb.set_trace()
    velocity = 1.35 * reference_value / k#0.77 for 770; 1.35 for 130
    #</v2>
    return velocity

def my_function():
    """
    """
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
