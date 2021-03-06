

#def arrayBounds(ts,ordered=False,**kwargs):
#    """
#    return min, max and range of a numpy array
#
#    @type ts: numpy array
#    @param ts: the numpy array whose assess bounds we want to assesson
#
#    @kwarg verbose: set to True of you want min,max, range output to terminal
#
#    @rtype: tuple
#    @rparam: the minimum, maximum, and range of input ts
#
#    @note: 20131121: added ordered option so that if you call this on an ordered
#    array it is much faster.
#    """
#    if not ordered:
#        verbose = kwargs.get('verbose',False)
#        mn = np.min(ts)
#        mx = np.max(ts)
#        rng = mx-mn
#    else:
#        mn=ts[0]
#        mx=ts[1]
#        rng = mx-mn
#    if verbose:
#        logger.info("{},{}, {}".format(mx,mn,rng))
#    return (mn, mx, rng)
#
#
#def extendPlotBounds(array,**kwargs):
#    """
#    method for choosing ylims (or xlims) with a little room above and below the
#    function. Sometimes cant see the fucntion clearly because top of plot
#    is the curve.
#
#    @kwarg: percent: percent of funciton range to make bounds... defualt=10%
#    @kwarg: ordered: boolean, gets passed to arrayBounds(), speeds things up
#    ordered is true if array is ordered (like an x-axis for example)
#    default value of ordered is False
#    """
#    pctFcnHeight = kwargs.get('percent',0.1)
#    mn, mx, rng = arrayBounds(array, **kwargs)
#    Min, Max = mn-pctFcnHeight*rng, mx+pctFcnHeight*rng
#    return Min, Max
#
#def find_nearest(a, a0):
#    """
#    :type a: numpy array
#    :param a: the numpy array to search for value a0
#    :type a0: scalar
#    :param a0: a value to we want to find the nearest value in a
#    Element in nd array `a` closest to the scalar value `a0`
#    http://stackoverflow.com/questions/2566412/find-nearest-value-in-numpy-array
#    @note: the one-liner     idx = np.abs(a - a0).argmin() is itself a useful fcn
#    to return the index of the nearest element;  May want to name it as
#    "get_index_of nearest_element(array, value)"
#    """
#    idx = np.abs(a - a0).argmin()
#    return a.flat[idx]



#
##<TIME FUNCTIONS>
#
#def infinite_datetime_interval():
#    """
#    method to create a date time interval containing any time interval
#    we may inquire about
#
#    @ToDo: Move this function into Interval()
#    """
#    a_long_time_ago = datetime.datetime(1900,1,1,0,0,0)
#    a_long_time_from_now = datetime.datetime(9999,12,31,23,59,59)
#    a_long_time_ago.strftime(DATE_FMT+' '+TIME_FMT)
#    a_long_time_from_now.strftime(DATE_FMT+' '+TIME_FMT)
#    infinite_interval = Interval(a_long_time_ago, a_long_time_from_now)
#    return infinite_interval

import numpy as np 

def axis_lims_method_1(data, lim_type):
    """
    Returns limits on data according to the type of limit you select:

        + 'simple' plot all data
        + 'buffer' plot all data and allow a 5% buffer
        + 'main' plot the meat of the data (2-98 percentile) and allow 5% buffer for that

    Parameters:
        data (array): data to be bounded
        lim_type (str): define how you want the axis to accomodate data

    Returns:
        array: array of size (2,1) that border the data in the manner chosen
    """

    if len(data) == 1:
        return (data[0] - 1, data[0] + 1)
    elif np.all(np.isnan(data)):
        return (0, 0)

    # Set buffer and range size
    buffer_size = 0.05
    range_size  = np.max(data) - np.min(data)
    
    # Plot Data to the Edge of Graph
    if lim_type == 'simple':
        axis_lims = (np.min(data) , np.max(data))
        return axis_lims
    
    # Buffer Graph to show All Data
    if lim_type == 'buffer':
        axis_lims = ((np.min(data) - buffer_size * range_size),
                     (np.max(data) + buffer_size * range_size))
        return axis_lims
    
    # Plot only values between 2,98 percentile (also buffer)    
    if lim_type == 'main':
        low_lim = np.percentile(data, 2)
        high_lim = np.percentile(data, 98)
        axis_lims = ((low_lim  - buffer_size * range_size),
                     (high_lim + buffer_size * range_size))
        return axis_lims


        
        
    