#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Aug 15 12:48:29 2019

@author: kkappler
"""

from theory.core import Pipe, Rock

#<config>
#<config>
Rb = 0.16 # radius of the bit contacting rock    [m]
BANDPASS_FILTER = [20, 30, 100, 120] #[Hz]
RC_AXIAL = 0.266 # reflection coefficient
DELAY_BITSUB_AXIAL = 0.86 # in ms
RC_TANGENTIAL = -0.135  # reflection coefficient
DELAY_BITSUB_TANGENTIAL = 1.78 # in ms

PIPE_ALPHA = 5100.0 # velocity of the pipe  [m] / [s]
PIPE_BETA = 2668.0 #[m]/[s]
PIPE_RHO = 7300.0 # density of the pipe  #[kg]/[m^3]

CONTACT_FACTOR_AXIAL=1
CONTACT_FACTOR_TANGENTIAL=1
pipe = Pipe(Rb=Rb, alpha=PIPE_ALPHA, rho=PIPE_RHO, beta=PIPE_BETA, contact_factor=CONTACT_FACTOR_AXIAL)

print("ToDo: change so that contact factor is component dependant")
#NYQUIST = 5000.0; start = 5000;end = 15000;
NYQUIST = 2500.0; start = 2500;end = 7500;


rho = 2670.0; velocity=4000.0
modulus = rho * velocity**2
rock = Rock(alpha=velocity, beta=velocity, rho=rho)

ADD_NOISE = True
sacrificial_h5_file = '544_59_619_619_6172_6172.h5'


