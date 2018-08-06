# -*- coding: utf-8 -*-
"""
Created on Mon May 21 13:53:39 2018

@author: kkappler

TODO: Make a dictionary of FIR filters we may wish to use with descriptive keys
Use global var patter ala schneider example

Other variations we have tried:
    50, 90, 230, 300, - 251 (501), 123(127)


20180707:
    To calculate FIR we need corners, duration,
    length(duration, sps) : needs the data_key


"""

import datetime
#import logging
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

#logger = logging.getLogger(__name__)
#home = os.path.expanduser("~/")
from scipy import signal as ssig

class FIRLSFilter(object):
    """
    TODO: THis needs to be funtion of nyq
    TODO: length and desired_duration have to be self consistent... maybe
    add a unit test or check for this consistency

    @requires: corners, duration
    Basically you need the data_key to make the filter because you dont know the sampling rate.
    So,
    """
    def __init__(self, corners, duration, **kwargs):
        self.desired_response_amplitude = kwargs.get('desired', (0, 0, 1, 1, 0, 0))
        self.flavor = kwargs.get('flavor', 'firls')
        self.apply_how = kwargs.get('apply_how', 'filtfilt')
        self.corners = corners
        self.expected_duration = duration
        self.nyquist = kwargs.get('nyquist', -1.0)
        self.label = kwargs.get('label', '')
        self.taps = None


    @property
    def n_taps(self):
        n_taps = int(self.expected_duration * 2. * self.nyquist)
        if np.remainder(n_taps,2)==0:
            n_taps+=1
        return n_taps

    def make(self, data_key):
        self.nyquist = data_key.sampling_rate / 2.0

        corner_tuple = (0, self.corners[0], self.corners[1], self.corners[2],
                        self.corners[3], self.nyquist)
        taps = ssig.firls(self.n_taps, corner_tuple,
                          self.desired_response_amplitude, nyq=self.nyquist)
        taps = taps.astype('float32')
        self.taps = taps.astype('float32')
        #plt.plot(taps); plt.title('Default_BandPassFilter');plt.show()
        return self.taps

    @property
    def corner_string(self):
        if self.corners is None:
            return '{}'.format(None)
        else:
            x='-'.join(['{}'.format(x) for x in self.corners])
        return x

    def id_string(self):
        """
        """
        x='{}_{}_{}'.format(self.flavor, self.corner_string, '{}ms'.format(int(1000. * self.expected_duration) ) )
        if self.apply_how == 'lfilter':
            x = x + '_lfilter'
        return x

#default_fir_filter = FilterSpecification(nyquist=2500., label='default')
#default_fir_filter.length = 101
#default_fir_filter.corners = [50, 65, 300, 350 ]
#default_fir_filter.id_string()
#fir_coefficients = default_fir_filter.generate_coefficients()
#DEFAULT_FIR = default_fir_filter

#plt.plot(fir_coefficients);plt.show()
#freq, response = ssig.freqz(fir_firls)
#fig, ax = plt.subplots()
#ax.semilogy(nyq*freq/(np.pi), np.abs(response))[0]
#ax.set_xlabel('Frequency (Hz)')
#ax.grid(True)
#ax.set(title='Band-pass %d-%d Hz'.format(  default_filter.corners[1:3]), ylabel='Magnitude')
#plt.show()
#n_pts = 10000
#xx = np.random.rand(n_pts)
#xx = np.zeros(n_pts)
#xx[n_pts/2] = 1
#yy = ssig.filtfilt(fir_firls, 1, xx)
#plt.plot(xx, label = 'orig')
#plt.plot(yy, label = 'after')
#plt.legend()
#plt.show()


def get_fir_filter(nyquist, fir_corners, fir_duration):
    """
    """
    fir_filter = FilterSpecification(nyquist=nyquist, label='default')
    num_taps = int(fir_duration*2.*nyquist)
    if np.remainder(num_taps,2)==0:
        num_taps+=1
    fir_filter.length = num_taps#101
    fir_filter.corners = fir_corners#[50, 65, 300, 350 ]
    #print("fir_filter.id_string() {}".format(fir_filter.id_string()))
    fir_filter.generate_coefficients()#set taps
    return fir_filter

#def get_filter_dictionary():
#    """
#    """
#    filter_dict = {}
#    default_fir_filter = FilterSpecification(nyquist=2500., label='default')
#    default_fir_filter.length = 101
#    default_fir_filter.corners = [50, 65, 300, 350 ]
#    taps = default_fir_filter.generate_coefficients()
#    filter_dict['default'] = default_fir_filter.taps
#    return filter_dict



def main():
    """
    """
    filter_dictionary = get_filter_dictionary()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
