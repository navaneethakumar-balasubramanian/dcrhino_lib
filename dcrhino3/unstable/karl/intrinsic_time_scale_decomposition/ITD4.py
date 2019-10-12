# -*- coding: utf-8 -*-
"""
Created on Thu Oct 10 08:38:17 2019

@author: kkappler

IITD POC
thank you:
https://stackoverflow.com/questions/4624970/finding-local-maxima-minima-with-numpy-in-a-1d-numpy-array
"""

from __future__ import absolute_import, division, print_function

from copy import deepcopy
import datetime
import matplotlib.pyplot as plt
import numpy as np
from numpy import pi
from numpy import cos
from numpy import sin
import os
import pandas as pd
import pdb

import numpy as np
from scipy.signal import argrelextrema

from dc_mwd.logging_util import init_logging

logger = init_logging(__name__)

ALPHA = 0.5
N = 10000
dt = 1./N
t = np.arange(N) * dt
xx = (4 + 2*cos(5*pi*t))*cos(100*pi*t) + 6*cos(20*pi*t) + 2*cos(4*pi*t)
#def X_interval(i):
#    """
#    X_ivl_1 from (tau1, tau2]
#    X[extrema_indices[1]+1:extrema_indices[2]+1]
#    """
#    return X[extrema_indices[i]+1:extrema_indices[i+1]+1]

def calc_extreme_indices(x):
    """
    x(t) a time series, 1D
    """
    max_indices = argrelextrema(x, np.greater)
    min_indices = argrelextrema(x, np.less)
    extrema_indices = np.hstack((max_indices, min_indices))
    if len(extrema_indices[0]) > 1:
        extrema_indices = extrema_indices.squeeze()
        extrema_indices.sort()
    else:
        extrema_indices = extrema_indices[0]
        pdb.set_trace()
        print('EXTREMA INDICES HAVE ONLY ONE ELEMENT -- DONE!')
    return extrema_indices

def generate_conditions_for_piecewise(extrema_indices, t):
    """
    #cond_list[1] = t>t[extrema_indices[0]] & t<=t[extrema_indices[1]]
    extrema_indices,
    t: time_vector
    """
    #<GENERATE L-FUNCTION CONDITIONS>
    n_extrema = len(extrema_indices)
    n_intervals = n_extrema + 1 #gates and fenceposts
    cond_list = n_intervals * [None]
    qq = (t>=0) & (t <= t[extrema_indices[0]])
    cond_list[0] = qq
    #qq = (t>t[extrema_indices[-2]]) & t<=t[-1]
    qq = (t>t[extrema_indices[-1]]) & (t<=t[-1])
    cond_list[-1] = qq
    for i in range(n_intervals):
        if i==0 or i==(n_intervals-1):
            continue
        qq = (t>t[extrema_indices[i-1]]) & (t<=t[extrema_indices[i]])
        cond_list[i] = qq
    return cond_list
    #</GENERATE L-FUNCTION CONDITIONS>


def scalar_L_values(tau_k, x_k, alpha):
    """
    x_k: these are the values of the function on the extrema.
    x_k[1] is the value at tau_1 or the first extrema
    x_k[2] is the value at tau_2 or the second extrema
    x_k[0] does not appeat to be well defined in the manuscript
    #maybe put a nan or 0 there though to simplify indexing

    ratio: time until next extrema / time until next-next extrema
    denominator > numerator
    Ratio will be small when this ivl is followed by long monotonic
    Ratio will approach 1 when this interval is relatively large compared to next

    for k=1:
    RATIO = (TAU_k[2] - TAU_k[1]) / (TAU_k[3] - TAU_k[1])
    L[2] = alpha * (XX[k] + RATIO*(XX_k[3] - XX_k[1])) + (1-alpha)* XX_k[2]

    k is defined on {1, 2, 3 .. M}

     0.5*(XX_k[1] +  (TAU_k[2] - TAU_k[1]) / (TAU_k[3] - TAU_k[1])) * (XX_k[3] - X[1]) + (1-0.5)*XX_k[2]
-7.729753443898642
(Pdb) 0.5*(XX_k[1] +  (TAU_k[2] - TAU_k[1]) / (TAU_k[3] - TAU_k[1]) * (XX_k[3] - X[1])) + (1-0.5)*XX_k[2]
1.1319058020385526
(Pdb) 0.5*(XX_k[1] +  ((TAU_k[2] - TAU_k[1]) / (TAU_k[3] - TAU_k[1])) * (XX_k[3] - X[1])) + (1-0.5)*XX_k[2]
1.1319058020385526
(Pdb) ratio = (TAU_k[2] - TAU_k[1]) / (TAU_k[3] - TAU_k[1])
(Pdb) ratio
0.4285714285714286
(Pdb) 0.5*(XX_k[1] +  ratio * (XX_k[3] - X[1])) + (1-0.5)*XX_k[2]
1.1319058020385526
(Pdb) LL[2]
3.881438418487564
(Pdb) 0.5*(XX_k[1] +  ratio * (XX_k[3] - X[1])) + (1-0.5)*XX_k[2]
    """
    N = len(tau_k)
    L = np.zeros(len(tau_k))
    for k in range(N-2):
        if k==0:# or k==1:
            continue #not defined
        #print(k)
        #pdb.set_trace()
        ratio = (tau_k[k+1] -  tau_k[k]) / (tau_k[k+2] -  tau_k[k])
        term1 = x_k[k] + ratio * (x_k[k+2] - x_k[k])
        L[k+1] = alpha * term1 + (1-alpha) * x_k[k+1]
    return L


def calculate_baseline(XX, t, extrema_indices, cond_list):
    """
    we build TAU_k and XX_k so that their indexing is consistent with the notation in the manuscript
    This means that TAU_K[1] is the time of the first extrema, and TAU_K[2] the time of the second
    #for working with k=1,2,3 add zero to tau_k for indexing


X1 = XX_k[1]; X2 = XX_k[2]; X3 = XX_k[3]; X4 = XX_k[4]
t1 = TAU_k[1];t2 = TAU_k[2];t3 = TAU_k[3];t4 = TAU_k[4];
L2 = 0.5 * (X1 + ((t2-t1)/(t3-t1))*(X3-X1) + X2)
L3 = 0.5 * (X2 + ((t3-t2)/(t4-t2))*(X4-X2) + X3)
lxt = L2 + ((L3-L2)/(X3-X2))*(X - X2)
    """
    TAU_k = t[extrema_indices]
    XX_k = XX[extrema_indices]
    TAU_k = np.hstack((0, TAU_k))
    XX_k = np.hstack((XX[0], XX_k))


    #<EQUATION2> (k)
    LL = scalar_L_values(TAU_k, XX_k, ALPHA)  #these are the L_values we apply on each interval (from eqn3)
    #pdb.set_trace()
    #print('ok to here ... check indexing correct ')
    Xk_piecewise = np.piecewise(t, cond_list, XX_k)
    Xt_minus_Xk = XX - Xk_piecewise #agrees with Eqn2
    Lk_piecewise = np.piecewise(t, cond_list, LL) #agrees with Eqn2
    LL_diff = np.diff(LL)
    Xk_diff = np.diff(XX_k)
    #LL_diff = np.hstack((0, LL_diff ))
    #Xk_diff = np.hstack((1.0, Xk_diff ))
    LL_diff = np.hstack(( LL_diff, 0 ))
    Xk_diff = np.hstack((Xk_diff, 1. ))
    ratio  = LL_diff /  Xk_diff
    ratio_piecewise  = np.piecewise(t, cond_list, ratio)

    LXt = Lk_piecewise + ratio_piecewise * Xt_minus_Xk
    #pdb.set_trace()
    return LXt

def make_nice_plot(n_iterations, PR_history, residual):
    """
    """
    YLIMS = [[-20,20], [-10,10],[-10,10],[-2,2], [-1,1]]
    YLABELS = ['x(t)', 'PR$_1$','PR$_2$','PR$_3$','res.']
    fig, ax = plt.subplots(nrows=n_iterations+1, sharex=True, figsize=(7, 6))
    for i in range(n_iterations):
        ax[i].plot(t, PR_history[i,:],'b')
        #ax[i].plot(t, baseline_history[i,:],'g', label='baseline LF')


        ax[i].set_ylim(YLIMS[i][0],YLIMS[i][1])
        ax[i].set_ylabel(YLABELS[i])
        #ax[i].legend()
    ax[n_iterations].plot(t, residual,'b')
    ax[n_iterations].set_ylabel(YLABELS[n_iterations])
    ax[n_iterations].set_xlabel('time (s)')
    #ax[i].set_ylim(YLIMS[i][0],YLIMS[i][1])
#    ax[n_iterations].legend()
    plt.savefig('ITD.png')
        #pdb.set_trace()
    plt.show()
def my_function():
    """
    """

#    extrema_indices = calc_extreme_indices(X)
#    cond_list = generate_conditions_for_piecewise(extrema_indices, t)
#    LXt = calculate_baseline(X, t, extrema_indices, cond_list)
    #pdb.set_trace()
    PR = deepcopy(xx)
    baseline = deepcopy(xx)
    n_iterations = 4
    ctr = 0
    PR_history = np.full((n_iterations+2, len(xx)), np.nan)
    PR_history[0,:] = PR
    baseline_history = np.full((n_iterations+1, len(xx)), np.nan)
    baseline_history[0,:] = PR


    LF = xx
    while ctr < n_iterations:
        ctr += 1
        #pdb.set_trace()
        input_signal = deepcopy(LF)
        extrema_indices = calc_extreme_indices(LF)
        cond_list = generate_conditions_for_piecewise(extrema_indices, t)
        LF = calculate_baseline(LF, t, extrema_indices, cond_list)

        PR = input_signal - LF
        #pdb.set_trace()
        PR_history[ctr,:] = PR
        baseline_history[ctr,:] = LF
        print(ctr)
        if ctr == n_iterations:
            residual = xx - np.sum(PR_history[1:n_iterations+1], axis=0)
            #residual = LF


#    make_nice_plot(n_iterations, baseline_history, residual)
    make_nice_plot(n_iterations, PR_history, residual)
        #QQ = baseline
        #QQ = PR_history[ctr,:]
        #history[ctr,:] = PR

#        history[ctr,:] = LXt
#        fig, ax = plt.subplots(nrows=n_iterations)
#        for i in range(n_iterations):
#            ax[i].plot(t, PR_history[i,:],'b', label='PR')
#            ax[i].plot(t, baseline_history[i,:],'g', label='baseline')
#
#
#            ax[i].set_ylim(YLIMS[i][0],YLIMS[i][1])
#            ax[i].legend()
#            #pdb.set_trace()
#        plt.show()
    fig, ax = plt.subplots(nrows=n_iterations)
    for i in range(n_iterations):

        ax[i].plot(t, PR_history[i,:],'b', label='PR HF')
        ax[i].plot(t, baseline_history[i,:],'g', label='baseline LF')


        ax[i].set_ylim(YLIMS[i][0],YLIMS[i][1])
        ax[i].legend()
            #pdb.set_trace()
        plt.show()
        #ctr += 1
        #history[ctr,:] = PR

    pdb.set_trace()
#    k=1
#    #LET interval 1 run from (tau_1, tau_2]
#    X_ivl_1 = X[extrema_indices[1]+1:extrema_indices[2]+1] #aka Xt in eqn(2)
#    xk = X[extrema_indices[1]]
#
#
#    #<EQUATION3> L_k+1, k=1
#    RATIO = (TAU_k[2] - TAU_k[1]) / (TAU_k[3] - TAU_k[1])
#    L[2] = alpha * (XX[k] + RATIO*(XX_k[3] - XX_k[1])) + (1-alpha)* XX_k[2]
#    #On this interval LX =
#    pdb.set_trace()
#    #L1
#    #Lkkp1 =
#    pdb.set_trace()
#    #extreme_points
#    plt.plot(t, X);
#    plt.plot(t, Lt);
#    max_indices = argrelextrema(X, np.greater)
#    min_indices = argrelextrema(X, np.less)
#    plt.vlines(t[max_indices], -20, 20, 'r')
#    plt.vlines(t[min_indices], -20, 20, 'b')
#    plt.show()
#    pdb.set_trace()
#    #MINE_DATA_CACHE_PATH = MineDataCachePaths('bmc', 'south_walker_creek')
#    #home = os.path.expanduser("~/")

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
