import numpy as np
import scipy.signal as ssig

def butter_bandpass(low_cut, high_cut, sampling_rate, order=5):
    """
    https://scipy.github.io/old-wiki/pages/Cookbook/ButterworthBandpass
    """
    nyquist_frequency = 0.5 * sampling_rate
    low = low_cut / nyquist_frequency
    high = high_cut / nyquist_frequency
    b, a = ssig.butter(order, [low, high], btype='band', analog=False)
    return b, a

def butter_highpass(f_cut, fs, order=5):
    """
    This is based on butter_bandpass
    """
    f_nyq = 0.5 * fs
    normalized_frequency = f_cut/f_nyq
    b, a = ssig.butter(order, normalized_frequency, btype='high', analog=False)
    return b, a

def butter_lowpass(cutoff, fs, order=5):
    """
    This is based on butter_bandpass
    """
    nyq = 0.5 * fs
    normal_cutoff = cutoff / nyq
    b, a = ssig.butter(order, normal_cutoff, btype='low', analog=False)
    return b, a


class FIRLSFilter(object):
    """
    Basically you need the data_key to make the filter because you dont know 
    the sampling rate.
    
    .. todo:: This needs to be function of nyq
    .. todo:: length and desired_duration have to be self consistent... maybe
        add a unit test or check for this consistency

    .. Parameters:
        corners: A monotonic nondecreasing sequence containing the 
            band edges in Hz. All elements must be non-negative and less than or 
            equal to the Nyquist frequency given by nyq.
        duration: 
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
        """
        Finds the filter order (number of filter coefficients, or n_taps) 
        from thge nyquist frequency.
        
        Returns:
            (int): filter order 
        """
        n_taps = int(self.expected_duration * 2. * self.nyquist)
        if np.remainder(n_taps,2)==0:
            n_taps+=1
        return n_taps

    def make(self, sampling_rate):#data_key):
        """
        Calculates nyquist frequency, creates corner_tuple, calls :func:`n_taps`,
        and loads desired_response_amplitude. Calculates the values of the filter
        coefficients using `scipy.signal.firls function. <https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.firls.html>`_
        Returns these coefficients (type: float32) 
        
        Parameters:
            sampling_rate (float): the sampling rate (meas/sec)
        
        Returns:
            (list): filter coefficients of type float32 
        """
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
        """
        If :code:`corners` is empty, creates an empty variable to be filled. If
        full, adapts the pre-existing format and joins an empty sequence to be filled.
        
        Returns:
            (list): {} if corners is none, strings with corner values if corners is not none. 
            See parameter ``corners`` in `scipy.signal.firls function. <https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.firls.html>`_
            
        .. note:: Corners: A monotonic nondecreasing sequence containing the 
            band edges in Hz. All elements must be non-negative and less than or 
            equal to the Nyquist frequency given by nyq.
        """
        if self.corners is None:
            return '{}'.format(None)
        else:
            x='-'.join(['{}'.format(x) for x in self.corners])
        return x

    def id_string(self):
        """
        Create list of strings with flavor, corners, and time duration, and
        lfilter if apply_how selects it.
        
        Return:
            (list): list of strings with:
                
                + flavor
                + corner_string
                + duration in ms
                + _lfilter (optional)    
        """
        x='{}_{}_{}'.format(self.flavor, self.corner_string, '{}ms'.format(int(1000. * self.expected_duration) ) )
        if self.apply_how == 'lfilter':
            x = x + '_lfilter'
        return x
