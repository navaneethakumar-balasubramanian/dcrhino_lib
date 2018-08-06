from os import path
import os
import datetime
import pandas as pd
import pdb
import numpy as np
from glob import glob
from scipy.interpolate import interp1d
import matplotlib.pyplot as plt
from dcrhino.analysis.aggregation_20180614.well_log_plots_example import WellLogPlots
from dcrhino.analysis.supporting_datetime import get_seconds_into_day
from dcrhino.constants import DATA_PATH, ROOT_PATH
from dcrhino.interval import TimePeriod

def interpolate_to_assign_depths_to_log_csv(df_peak_info, df_hole_profile, plot_meta=None):
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
        t0_mwd = df_hole_profile['time_start'][0]
    except KeyError:
        t0_mwd = df_hole_profile['time_start'].iloc[0]

    try:
        z0 = df_hole_profile['start_depth'][0]
    except KeyError:
        z0 = df_hole_profile['start_depth'].iloc[0]

    try:
        t0_rhino = df_peak_info['datetime'][0]
    except KeyError:
        t0_rhino = df_peak_info['datetime'].iloc[0]


#    pdb.set_trace()
    row0_time = get_seconds_into_day(t0_mwd)
    row0_depth = z0#df_hole_profile['start_depth'][0]
    seconds_into_day = pd.Series([get_seconds_into_day(x) for x in df_hole_profile['time_end']])
    depths = df_hole_profile['end_depth']
    #pdb.set_trace()
    seconds_into_day_mwd = pd.concat((pd.Series(row0_time), seconds_into_day), axis=0, ignore_index=True)
    depths_mwd = pd.concat((pd.Series(row0_depth), depths))
    num_traces = len(df_peak_info)
    seconds_into_day_rhino_start = get_seconds_into_day(t0_rhino)
    seconds_into_day_rhino = seconds_into_day_rhino_start + np.arange(num_traces)
    seconds_into_day_rhino[0] += 1e-9
    #</RHINO TIME>
    interp_function = interp1d(seconds_into_day_mwd, depths_mwd, kind='linear', bounds_error=False, fill_value='extrapolate')
    #pdb.set_trace()
    depths = interp_function(seconds_into_day_rhino)
    if plot_meta is not None:
        if os.path.isfile(plot_meta['rop_filename']):
            return depths
        #pdb.set_trace()
        plt.figure(22)
        plt.clf()
        plt.plot(seconds_into_day_mwd, depths_mwd, 'b*');
        plt.plot(seconds_into_day_rhino, depths, 'r');
        plt.title("Depth vs Time From Raw MWD hole {}".format(plot_meta['row'].hole))
        plt.xlabel('Time (s)')
        plt.ylabel('Depth (m)')
        plt.grid()
        plt.savefig(plot_meta['rop_filename'])
        #plt.show()
        plt.clf()
    return depths


def interpolate_to_assign_mse_log_csv(df_peak_info, df_hole_profile):
    """
    df_hole_profile: has already been reduced to the hole you are working with

    Note: you dont need the df_peak info, just its length and start_datetime
    flow:
        Get table of mwd profile.
    TODO: Time stan
    """
    try:
        t0_rhino = df_peak_info['datetime'][0]
    except KeyError:
        t0_rhino = df_peak_info['datetime'].iloc[0]

    #pdb.set_trace()
    delta_t = df_hole_profile['time_end'] - df_hole_profile['time_start']
    t_middle = df_hole_profile['time_start'] + delta_t
    seconds_into_day_mwd = pd.Series([get_seconds_into_day(x) for x in t_middle])
#    mse_mwd = df_hole_profile['Computed MSE']#mse_mpa
    mse_mwd = df_hole_profile['mse_mpa']#mse_mpa
    num_traces = len(df_peak_info)
    seconds_into_day_rhino_start = get_seconds_into_day(t0_rhino)
    seconds_into_day_rhino = seconds_into_day_rhino_start + np.arange(num_traces) * 0.5
    #</RHINO TIME>
    interp_function = interp1d(seconds_into_day_mwd, mse_mwd, kind='linear', bounds_error=False, fill_value='extrapolate')
    mse = interp_function(seconds_into_day_rhino)

    return mse


def load_hole_timing_csv(survey_key):
    """
    survey id will be some data key, probably a time interval (like a week of project)
    and client name, for example: ('mont_wright', 2018-05,) or something similar.
    The timing file once qc-ed is a level(?) measurand ... lets put it on level 3
    """
    #hole_timing_measurand.expected_filename(survey_key)
    #pdb.set_trace()
    expected_filename = os.path.join(DATA_PATH, survey_key, 'level_3', 'mwd_hole_timing.csv')#"public", "rhino_mwd_timedelta_iso.csv")
    df = pd.read_csv(expected_filename)
    return df

def get_start_and_end_time_for_hole_id(hole_id):
    if not (isinstance(hole_id, int)):
        raise Exception(
                "HoleIDType",
                "Please pass hole_id as an integer."
                )

    file_path = os.path.join(ROOT_PATH, "public", "rhino_mwd_timedelta_iso.csv")

    df = pd.read_csv(file_path, parse_dates=["start_mwd_time", "end_mwd_time"])
    df["hole_id"] = df.hole_id.astype(int)
    df = df.dropna()

    df = df[df.hole_id == hole_id]

    if (len(df) == 0):
        raise Exception(
                "HoleIDNotFound",
                "hole_id {} not found in MontWrightMWD.csv".format(hole_id)
                )

    return df




def get_mse_for_hole_id(hole_id):
    # Instructions to get MWD file.
    # 1. Download the file https://datacloudinternational.sharepoint.com/sites/tech/Shared%20Documents/MontWright/MSECalcs/MontWrightMWD-All.xlsx
    # 2. Export the sheet "MWD Analysis" and save it as MontWrightMWD.csv
    # 3. Save the exported MontWrightMWD.csv in the location public/MontWrightMWD.csv relative to ROOT_PATH.

    if not (isinstance(hole_id, int)):
        raise Exception(
                "HoleIDType",
                "Please pass hole_id as an integer."
                )

    mwd_file_path = os.path.join(ROOT_PATH, "public", "MontWrightMWD.csv")

    if os.path.exists(mwd_file_path):
        df = pd.read_csv(mwd_file_path)
        df["hole_id"] = df.hole_id.astype(int)
    else:
        raise Exception(
                "MWDFileNotFound",
                "Instructions to get the MontWrightMWD.csv is in this method's comment.")

    df = df[df.hole_id == hole_id]

    if (len(df) == 0):
        raise Exception(
                "HoleIDNotFound",
                "hole_id {} not found in MontWrightMWD.csv".format(hole_id)
                )

    result_df = df[['hole_id', 'time_start', 'time_end', 'Computed MSE']]
    result_df['time_start_datetime'] = pd.to_datetime(result_df.time_start)
    result_df['time_end_datetime'] = pd.to_datetime(result_df.time_end)

    return result_df[["hole_id"]]
