# -*- coding: utf-8 -*-
"""
Created on Wed Jun 19 11:58:52 2019

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb


class DrillPipe(object):
    '''
    Args:
        Ro (np.array or float): Outer radius of pipe (?m?)
        Ri (np.array or float): Inner radius of pipe (?m?)
        Rb (np.array or float): Effective bit radius contacting rock (m)
        alpha (np.array or float): Axial velocity of the drill stem. (?m/s?)
        rho (np.array or float): Density of the drill stem.  [kg]/[m^3])
    represents a drill pipe and bit.
    ** not sure about other components
    'collar', 'saver sub', 'shock sub', 'rotary bit sub'
    or how/if these relate here

    '''
    def __init__(self, outer_radius, inner_radius, bit_radius,
                 compressional_velocity, density):
        self._outer_radius = outer_radius
        self._inner_radius = inner_radius
        self._bit_radius = bit_radius
        self._compressional_velocity = compressional_velocity
        self._density = density


    @property
    def Ro(self):
        return self._outer_radius
    @property
    def Ri(self):
        return self._inner_radius
    @property
    def Rb(self):
        return self._bit_radius
    @property
    def alpha(self):
        return self._compressional_velocity
    @property
    def rho(self):
        return self._density

    @property
    def A1(self):
        '''
        Effective drill stem area.
        '''
        return np.pi*((self.Ro**2)-(self.Ri**2))

    @property
    def Ab(self):
        '''
        Area of the bit contacting rock.
        '''
        return np.pi * (self.Rb**2)

    @property
    def Z1(self):
        '''
        Steel impedance.
        '''
        return self.Ab * self.rho * self.alpha * 0.00001


def get_default_drill_pipe(pipe_id=None):
    """
    drill_pipe = DrillPipe(0.1365, 0.0687, 0.16, 4875.0, 7800.0)
    """
    if pipe_id is None:
        outer_radius = 0.1365
        inner_radius = 0.0687
        bit_radius  = 0.16
        compressional_velocity = 4875.0
        density = 7800.0
    drill_pipe = DrillPipe(outer_radius, inner_radius, bit_radius,
                           compressional_velocity, density)

    return drill_pipe

def test():
    """
    """
    drill_pipe = get_default_drill_pipe()
    pdb.set_trace()
    print('hello')


def main():
    """
    """
    test()

    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
