# -*- coding: utf-8 -*-
"""
Created on Thu Oct 10 08:38:17 2019

@author: kkappler

IITD POC
thank you:
https://stackoverflow.com/questions/4624970/finding-local-maxima-minima-with-numpy-in-a-1d-numpy-array
"""

from __future__ import absolute_import, division, print_function


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

ALPHA = 0.5

from dc_mwd.logging_util import init_logging

#def X_interval(i):
#    """
#    X_ivl_1 from (tau1, tau2]
#    X[extrema_indices[1]+1:extrema_indices[2]+1]
#    """
#    return X[extrema_indices[i]+1:extrema_indices[i+1]+1]

def calc_extreme_indices(x):
    max_indices = argrelextrema(X, np.greater)
    min_indices = argrelextrema(X, np.less)
    extrema_indices = np.hstack((max_indices, min_indices))
    extrema_indices = extrema_indices.squeeze()
    extrema_indices.sort()
    return extrema_indices

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
    """
    N = len(tau_k)
    L = np.ones(len(tau_k))
    for k in range(N-2):
        if k==0:# or k==1:
            continue #not defined
        print(k)
        ratio = (tau_k[k+1] -  tau_k[k]) / (tau_k[k+2] -  tau_k[k])
        term1 = x_k[k] + ratio * (x_k[k+2] - x_k[k])
        L[k+1] = alpha * term1 + (1-alpha) * x_k[k+1]
    return L

logger = init_logging(__name__)
N = 1000
dt = 1./N
t = np.arange(N) * dt
X = (4 + 2*cos(5*pi*t))*cos(100*pi*t) + 6*cos(20*pi*t) + 2*cos(4*pi*t)

max_indices = argrelextrema(X, np.greater)
min_indices = argrelextrema(X, np.less)
extrema_indices = np.hstack((max_indices, min_indices))
extrema_indices = extrema_indices.squeeze()
extrema_indices.sort()
n_extrema = len(extrema_indices)
n_intervals = n_extrema + 1 #gates and fenceposts


#<GENERATE L-FUNCTION CONDITIONS>
cond_list = n_intervals * [None]
#pdb.set_trace()
qq = (t>=0) & (t <= t[extrema_indices[0]])
cond_list[0] = qq
#cond_list[1] = t>t[extrema_indices[0]] & t<=t[extrema_indices[1]]

#qq = (t>t[extrema_indices[-2]]) & t<=t[-1]
qq = (t>t[extrema_indices[-1]]) & (t<=t[-1])
cond_list[-1] = qq
for i in range(n_intervals):
    if i==0 or i==(n_intervals-1):
        continue
    qq = (t>t[extrema_indices[i-1]]) & (t<=t[extrema_indices[i]])
    cond_list[i] = qq
print('ok')
#</GENERATE L-FUNCTION CONDITIONS>


TAU_k = t[extrema_indices]
XX_k = X[extrema_indices]
#for working with k=1,2,3 add zero to tau_k for indexing
TAU_k = np.hstack((0, TAU_k))
XX_k = np.hstack((X[0], XX_k))

#<EQUATION2> (k)
LL = scalar_L_values(TAU_k, XX_k, ALPHA)  #these are the L_values we apply on each interval (from eqn3)
Xk_piecewise = np.piecewise(t, cond_list, XX_k)
Xt_minus_Xk = X - Xk_piecewise
Lk_piecewise = np.piecewise(t, cond_list, LL)
LL_diff = np.diff(LL)
LL_diff = np.hstack((0, LL_diff ))
Xk_diff = np.diff(XX_k)
Xk_diff = np.hstack((1.0, Xk_diff ))

ratio  = LL_diff /  Xk_diff
ratio_piecewise  = np.piecewise(t, cond_list, LL)

LXt = Lk_piecewise + ratio_piecewise * Xt_minus_Xk
plt.plot(LXt);plt.show()
pdb.set_trace()
k=1
#LET interval 1 run from (tau_1, tau_2]
X_ivl_1 = X[extrema_indices[1]+1:extrema_indices[2]+1] #aka Xt in eqn(2)
xk = X[extrema_indices[1]]


#<EQUATION3> L_k+1, k=1
RATIO = (TAU_k[2] - TAU_k[1]) / (TAU_k[3] - TAU_k[1])
L[2] = alpha * (XX[k] + RATIO*(XX_k[3] - XX_k[1])) + (1-alpha)* XX_k[2]
#On this interval LX =
pdb.set_trace()
#L1
#Lkkp1 =
pdb.set_trace()
#extreme_points
plt.plot(t, X);
plt.plot(t, Lt);
max_indices = argrelextrema(X, np.greater)
min_indices = argrelextrema(X, np.less)
plt.vlines(t[max_indices], -20, 20, 'r')
plt.vlines(t[min_indices], -20, 20, 'b')
plt.show()
pdb.set_trace()
#MINE_DATA_CACHE_PATH = MineDataCachePaths('bmc', 'south_walker_creek')
#home = os.path.expanduser("~/")


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
