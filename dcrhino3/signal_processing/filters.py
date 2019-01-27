import numpy as np
import scipy.signal as ssig


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

    def make(self, sampling_rate):#data_key):
        #self.nyquist = data_key.sampling_rate / 2.0
        self.nyquist = sampling_rate / 2.0
        corner_tuple = (0, self.corners[0], self.corners[1], self.corners[2],
                        self.corners[3], self.nyquist)
        taps = ssig.firls(self.n_taps, corner_tuple,
                          self.desired_response_amplitude, nyq=self.nyquist)
        #taps = taps.astype('float32')
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
