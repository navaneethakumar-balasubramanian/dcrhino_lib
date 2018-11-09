#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Wed Apr 12 09:46:53 2017

@author: lmaclean
"""

from __future__ import absolute_import, division, print_function
#import qfutils.log as logging
#logger = logging.getLogger(__name__)

from numpy.lib.stride_tricks import as_strided as ast
import numpy as np
import copy
from hashlib import sha256
import pdb


class WindowingScheme(object):
    """
    Tracks L and V - length of the window and the window overlap

    @note 20170510 knk: I'm not sure that we want to force time_series length to
    be defined at init ... there are still things we can do without it, and
    it may change on the fly as for example in cascading decimation.
    @change 20170510 knk: I added an apodization_window attribute, default is
    None, but really that should maybe be a rectangle window ... will use this
    in spectral processing.
    @change 20170510 knk: compute edge indices only if time_series_length is positive
    otherwise I can't init one of these classes without apriori knowledge of
    my TS length, which is causing problems in spectral development
    @toDo 20170525: After thinking about this and looking at some applications,
    I think that the time_series_length should be added as an argument, and
    not stored as part of the object ...
    @Note 20171026: Samples per second as well should be an argument, not a property
    I am adding a hashing function.  The hashing function will only hash the
    critical values; these are L, V,

    """
    def __init__(self, window_length, window_overlap, time_series_length, **kwargs):
        self.samples_per_second = kwargs.get('sps', None)
        self.window_length = window_length
        self.window_overlap = window_overlap
        self.time_series_length = time_series_length
        if self.time_series_length>0:
            self._compute_edge_indices()

    def _compute_edge_indices(self):
        """
        @change 20170505: Added rightedge_indices truncation.
        @Note: The final window is not gauranteed to be at the far edge of TS
        This means that we may be ignoring a little data (less than L point) .. .
        this is no big deal when TS is long w.r.t. window but could be an issue
        otherwise.
        """
        if self.window_length > self.time_series_length:
            raise Exception("The window length is longer than the time series!")
            return
        if 100*self.window_length > self.time_series_length:
            logger.warning("careful about edge effects here - read note in doc of this fcn")
        self.left_edge_indices = np.arange(0, self.time_series_length, self.window_advance)
        self.right_edge_indices = self.left_edge_indices + self.window_length
        self.left_edge_indices = self.left_edge_indices[self.right_edge_indices <= self.time_series_length]
        self.right_edge_indices = self.right_edge_indices[0:len(self.left_edge_indices)]


    @property
    def num_windows(self):
        return len(self.left_edge_indices)

    @property
    def window_advance(self):
        return self.window_length - self.window_overlap

    @property
    def dt(self):
        if self.samples_per_second is None:
            raise Exception("Need samples_per_second")
            return
        return 1./self.samples_per_second

    @property
    def window_duration(self):
        """
        Currently returns float
        @Todo: Want this to return some kind of time object or time duration
        object in the future.
        """
        dt = self.dt
        return dt*self.window_length


#<Adding these methods which were developed at QF and needed for first version ops>
    def _folder_string(self, **kwargs):
        """
        Creates a string for tracking folder names; default zfill=5
        """
        # zero_pad for L & V = 5
        folder_label = "L{:05}V{:05}".format(self.window_length, self.window_overlap)
        return folder_label

    def get_advance_duration(self):
        """
        """
        n_pts_advance = self._num_points_advance()
        advance_duration = self.dt * n_pts_advance
        self.advance_duration = advance_duration
        return advance_duration

    #@property
    def _num_points_advance(self):
        """
        20170414, kkappler: returns an integer = L-V or how many points the
        window advances
        """
        try:
            self.advance_num_points = self.window_length - self.window_overlap
        except TypeError:
            try:
                self.advance_num_points = int(np.ceil(self.L*self.advance_fraction))
            except TypeError:
                logger.critical("?? somehow we have neither L,V or L, advance" )
        return self.advance_num_points

    def get_num_taps_in_moving_average(self, duration):
        """
        May 6, 2016: Working on STA/LTA generalizing

        designed to be used when we specfiy a moving average in seconds but we are
        provided a striding window timeseries as input.
        The first tap is "worth" the duration of the ensemble, but the second tap
        and all those thereafter only add the (advance_fraction)*(ensemble_duration)

        @type duration: floating point with units of seconds [s]

        """
        advance_duration = self.get_advance_duration()
        advances = advance_duration*np.arange(self.num_windows) + self.window_duration
        num_taps = np.argmin(np.abs(advances-duration)) + 1

        if duration-self.window_duration < 0:
            logger.warning("cannot filter stridingwindow with duration {} beacuse "
                        "L = {}".format(duration,self.window_duration ))

        if np.min(np.abs(advances-duration))>0:
            logger.warning("Non Integer number of ideal Taps ... may wish to review "
                        "specification of sta filter")
        return num_taps


    def _hash(self):
        hashed_window_length = sha256('{}'.format(self.window_length)).hexdigest()
        hashed_overlap = sha256('{}'.format(self.window_overlap)).hexdigest()
        concatenated_hash = hashed_window_length + hashed_overlap
        hashy_mchash = sha256('{}'.format(concatenated_hash)).hexdigest()
        return hashy_mchash

    def metadata_info(self):
        string1 = "window_length = {}".format(self.window_length)
        string2 = "window_overlap = {}".format(self.window_overlap)
        string3 = "window family = {}".format(self.apodization.family)
        out_string = "{}\n{}\n{}\n".format(string1, string2, string3)
        return out_string

    def _clone(self):
        return copy.deepcopy(self)

def norm_shape(shape):
    '''
    Normalize numpy array shapes so they're always expressed as a tuple,
    even for one-dimensional shapes.

    Parameters
        shape - an int, or a tuple of ints

    Returns
        a shape tuple
    @note: 20140221, kkappler: this method taken from
    http://www.johnvinyard.com/blog/?p=268, and used by ensemblizedTimeSeries
    but probably will be used by other methods.
    It is less a signal processing method and more a numpy-array-handling
    tool, in case we ever get that specific with files/functions.

    '''
    try:
        i = int(shape)
        return (i,)
    except TypeError:
        # shape was not a number
        pass

    try:
        t = tuple(shape)
        return t
    except TypeError:
        # shape was not iterable
        pass

    raise TypeError('shape must be an int, or a tuple of ints')


#</Adding these methods which were developed at QF and needed for first version ops>
def sliding_window(a,ws,ss = None,flatten = True):
    '''
    This function was originally copied from:
        http://www.johnvinyard.com/blog/?p=268

    usage: sw = sliding_window(a,ws,ss = None,flatten = True):
    Return a sliding window over a in any number of dimensions

    Parameters:
        a  - an n-dimensional numpy array
        ws - an int (a is 1D) or tuple (a is 2D or greater) representing the size
             of each dimension of the window
        ss - an int (a is 1D) or tuple (a is 2D or greater) representing the
             amount to slide the window in each dimension. If not specified, it
             defaults to ws.
        flatten - if True, all slices are flattened, otherwise, there is an
                  extra dimension for each dimension of the input.

    Returns
        Array, if 2d dimensions are (num_windows, n_points_per_window)

        An array containing each n-dimensional window from a
        The Ensemblized time series seems in many ways like a MVTS, but it is NOT.
    It looks like one, because the data are a 2D array, with time moving along the
    "row" or zero axis, but the similarities stop there.
    The time axis is different for each row!  Each row spans the same duration,
    but the actual interval t0+row_duration is difference for each row,, i.e. the
    t0 is different for each row.

    In the case where the window length is 1, we obntain the special case where
    the ensemblized time series is just the transpose (not-conjugate) of the input
    time series.

    There is an excellent article on ensemblization in numpy
    http://www.johnvinyard.com/blog/?p=268

    @note: For many ensemble processing applications you are NOT obliged
    to hold the ensembles in memory at a given time.  The old
    ensembleEdges class was designed with this in mind and probably would
    be slightly less RAM-heavy.  Prior to 2011 I always created ensemblizedTimeSeries
    in my codes (even if they were not called by that name) because of the
    inate support for vector math
    @note: the ws here is the distance the window slides whcih is L-V, i.e. it
    is not the Overlap, but rather its difference from L.
    '''
    if None is ss:
        # ss was not provided. the windows will not overlap in any direction.
        ss = ws
    ws = norm_shape(ws)
    ss = norm_shape(ss)

    # convert ws, ss, and a.shape to numpy arrays so that we can do math in every
    # dimension at once.
    ws = np.array(ws)
    ss = np.array(ss)
    shape = np.array(a.shape)


    # ensure that ws, ss, and a.shape all have the same number of dimensions
    ls = [len(shape),len(ws),len(ss)]
    if len(set(ls)) != 1:
        raise ValueError(\
        'a.shape, ws and ss must all have the same length. They were %s' % str(ls))

    # ensure that ws is smaller than a in every dimension
    if np.any(ws > shape):
        raise ValueError(\
        'ws cannot be larger than a in any dimension.\
 a.shape was %s and ws was %s' % (str(a.shape),str(ws)))

    # how many slices will there be in each dimension?
    newshape = norm_shape(((shape - ws) // ss) + 1)
    # the shape of the strided array will be the number of slices in each dimension
    # plus the shape of the window (tuple addition)
    newshape += norm_shape(ws)
    # the strides tuple will be the array's strides multiplied by step size, plus
    # the array's strides (tuple addition)
    newstrides = norm_shape(np.array(a.strides) * ss) + a.strides
    strided = ast(a,shape = newshape,strides = newstrides)
    if not flatten:
        return strided

    # Collapse strided so that it has one more dimension than the window.  I.e.,
    # the new array is a flat list of slices.
    meat = len(ws) if ws.shape else 0
    firstdim = (np.product(newshape[:-meat]),) if ws.shape else ()
    dim = np.array(firstdim + (newshape[-meat:]))
    # remove any dimensions with size 1
    dim = dim[dim != 1]
    return strided.reshape(dim)

def main():
    """
    """
    ws = WindowingScheme(128, 32, 1000)
    ws.samples_per_second = 50.0
    pdb.set_trace()
    print(ws.window_duration)
    print("@ToDo Insert an integrated test showing common usage of sliding window\
    for 2D arrays, for example windowing for dnff")
    print("finito")

if __name__ == "__main__":
    main()
