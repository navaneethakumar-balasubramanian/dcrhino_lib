import numpy as np
from scipy.interpolate import interp1d

from dcrhino3.helpers.general_helper_functions import init_logging


logger = init_logging(__name__)


def sinc_interp(x, s, u):
    """
    Interpolates x (sinc interpolation) sampled at "s" instants. Output "y" is
    sampled at "u" instants ("u" for "upsampled"). Vectorized with
    `Numpy tile <https://docs.scipy.org/doc/numpy/reference/generated/numpy.tile.html>`_

    From Github:
        https://gist.github.com/endolith/1297227

    From Matlab:
        http://phaseportrait.blogspot.com/2008/06/sinc-interpolation-in-matlab.html

    Parameters:
        x: data vector to be interpolated (input)
        s: time vector of data to be interpolated (input)
        u: time vector of data to be output (where do you want y values?)

    Returns:
        : interpolated data vector

    .. note:: 20180627: this code taken from https://gist.github.com/endolith/1297227 KNK
    """

    if len(x) != len(s):
        raise Exception ( 'x and s must be the same length' )

    # Find the period
    T = s[1] - s[0]

    sincM = np.tile(u, (len(s), 1)) - np.tile(s[:, np.newaxis], (1, len(u)))
    y = np.dot(x, np.sinc(sincM/T))
    return y


def interpolate_data(raw_timestamps, data, ideal_timestamps, kind="quadratic", dtype=np.float32):
    try:
        interp_function = interp1d(raw_timestamps, data, kind=kind,
                                   bounds_error=False, fill_value="extrapolate")
        interp_data = interp_function(ideal_timestamps)
    except:
        logger.error("Failed to interpolate this trace " + str(int(raw_timestamps[0])))
        return None
    return np.asarray(interp_data, dtype=dtype)