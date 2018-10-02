#from os import path
import os
#import datetime
import pandas as pd
import pdb
import numpy as np
import datetime
#from glob import glob
from scipy.interpolate import interp1d
import matplotlib.pyplot as plt
from dcrhino.analysis.supporting_datetime import get_seconds_into_day
#from dcrhino.interval import TimePeriod


def interpolate_to_assign_depths_to_log_csv(df_peak_info, df_hole_profile, datetime_extracted_features_column='datetime', end_depth_column='end_depth', time_start_column='time_start', time_end_column='time_end', start_depth_column='start_depth', plot_meta=None):
    """
    It is not unusual that the start and end second for the mwd file are the same
    when the drill is cranking fast.  To handle this we should group  somehow..

    df_hole_profile: has already been reduced to the hole you are working with

    Note: you dont need the df_peak info, just its length and start_datetime
    flow:
        Get table of mwd profile.
    TODO: Time stan
    TODO: address possible wraparound effects of get_seconds_into_day by referencing to
    an absolute time
    """
    #dummy_hole_id = df_peak_info.dummy_hole_id.min()
    try:
        t0_mwd = df_hole_profile[time_start_column][0]
    except KeyError:
        t0_mwd = df_hole_profile[time_start_column].iloc[0]

    try:
        z0 = df_hole_profile[start_depth_column][0]
    except KeyError:
        z0 = df_hole_profile[start_depth_column].iloc[0]

    try:
        t0_rhino = df_peak_info[datetime_extracted_features_column][0]
    except KeyError:
        t0_rhino = df_peak_info[datetime_extracted_features_column].iloc[0]


    if not isinstance(t0_mwd, datetime.datetime):
        t0_mwd = t0_mwd.to_pydatetime()

    if not isinstance(t0_rhino, datetime.datetime):
        t0_rhino = t0_rhino.to_pydatetime()

    row0_time = get_seconds_into_day(t0_mwd)
    row0_depth = z0  # df_hole_profile['start_depth'][0]
    seconds_into_day = pd.Series([get_seconds_into_day(
        x) for x in df_hole_profile[time_end_column]])
    depths = df_hole_profile[end_depth_column]
    #pdb.set_trace()
    seconds_into_day_mwd = pd.concat(
        (pd.Series(row0_time), seconds_into_day), axis=0, ignore_index=True)
    pdb.set_trace()
    depths_mwd = pd.concat((pd.Series(row0_depth), depths))
    num_traces = len(df_peak_info)
    seconds_into_day_rhino_start = get_seconds_into_day(t0_rhino)
    seconds_into_day_rhino = seconds_into_day_rhino_start + \
        np.arange(num_traces)
    seconds_into_day_rhino[0] += 1e-9
    #</RHINO TIME>
    interp_function = interp1d(seconds_into_day_mwd, depths_mwd,
                               kind='linear', bounds_error=False, fill_value='extrapolate')
    #pdb.set_trace()
    depths = interp_function(seconds_into_day_rhino)
    if plot_meta is not None:
        if os.path.isfile(plot_meta['rop_filename']):
            return depths
        #pdb.set_trace()
        plt.figure(22)
        plt.clf()
        plt.plot(seconds_into_day_mwd, depths_mwd, 'b*')
        plt.plot(seconds_into_day_rhino, depths, 'r')
        plt.title("Depth vs Time From Raw MWD hole {}".format(
            plot_meta['row'].hole))
        plt.xlabel('Time (s)')
        plt.ylabel('Depth (m)')
        plt.grid()
        plt.savefig(plot_meta['rop_filename'])
        #plt.show()
        plt.clf()
    return depths
