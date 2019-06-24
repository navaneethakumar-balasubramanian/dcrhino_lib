# -*- coding: utf-8 -*-
"""
Created on Wed Jun 19 15:35:37 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

jj = np.complex(0, 1)

class Rock(object):
    '''
    Args:
        alpha (np.array or float): Velocity of the rock.
        rho (np.array or float): Density of the rock.
    '''
    def __init__(self, alpha, rho):
        self.alpha = alpha
        self.rho = rho



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
