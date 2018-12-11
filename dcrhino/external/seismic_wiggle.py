def seismic_wiggle(ax,section, dt, ranges=None, scale=1., color='k',
                   normalize=False):
    """
    Plot a seismic section (numpy 2D array matrix) as wiggles.
    Parameters:
    * section :  2D array
        matrix of traces (first dimension time, second dimension traces)
    * dt : float
        sample rate in seconds
    * ranges : (x1, x2)
        min and max horizontal values (default trace number)
    * scale : float
        scale factor multiplied by the section values before plotting
    * color : tuple of strings
        Color for filling the wiggle, positive  and negative lobes.
    * normalize :
        True to normalizes all trace in the section using global max/min
        data will be in the range (-0.5, 0.5) zero centered
    .. warning::
        Slow for more than 200 traces, in this case decimate your
        data or use ``seismic_image``.
    """
    npts, ntraces = section.shape  # time/traces
    if ntraces < 1:
        raise IndexError("Nothing to plot")
    if npts < 1:
        raise IndexError("Nothing to plot")
    t = np.linspace(0, dt*npts, npts)
    amp = 1.  # normalization factor
    gmin = 0.  # global minimum
    toffset = 0.  # offset in time to make 0 centered
    if normalize:
        gmax = section.max()
        gmin = section.min()
        amp = (gmax - gmin)
        toffset = 0.5
    ax.set_ylim(max(t), 0)
    if ranges is None:
        ranges = (0, ntraces)
    x0, x1 = ranges
    # horizontal increment
    dx = (x1 - x0)/ntraces
    # ax.set_xlim(x0, x1)
    # ax.set_xticks(np.flip(np.arange(30)))
    for i, trace in enumerate(section.transpose()):
        tr = (((trace - gmin)/amp) - toffset)*scale*dx
        x = x0 + i*dx  # x positon for this trace
        ax.plot(x + tr, t, 'k')
        ax.fill_betweenx(t, x + tr, x, tr > 0, color=color)
