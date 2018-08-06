"""

Flow

1. Get a table/dataframe contianing the info from unique dummy_hole_id
2. Map that hole id to the hole id used in the MWD file.  This I did by hand;
FLow in associate_drilltime_from_pressure_log_with_mwd() below
3. load the hole profile table from MWD and interpolate to get depths for csv

"""

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
from dcrhino.constants import DATA_PATH
from dcrhino.interval import TimePeriod
from dcrhino.common import interpolate_to_assign_depths_to_log_csv


mwd_path = os.path.join(DATA_PATH, 'mwd')
#def get_time_interval(df):
#    """
#    assumes table has already been pared down to a unique hole_id
#    prototype method intended to robustify deepaks timing stuff.
#    """
#
#    start_datetime = df['datetime'].min()
#    end_datetime = df['datetime'].max()
#    time_interval = TimePeriod(lower_bound=start_datetime, upper_bound=end_datetime)
#    time_interval_seconds = time_interval.duration()
#    print("Time interval duration {}s or ~{}min".format(int(time_interval_seconds),
#          int(time_interval_seconds/60.)))
#    return time_interval
#
#def associate_drilltime_from_pressure_log_with_mwd(time_interval_inferred_from_pressure_log, drill_id):
#    """
#    FLOW:
#        -iterate over all intervals implied by hole_info.csv (mwd sheet)
#        and identify the hole_id having maximal overlap with the
#        time interval on your current csv
#        -double check drill rig is correct
#
#    PROBABLYmodify to return whole row
#    """
#    data_date = time_interval_inferred_from_pressure_log.lower_bound.date()
#    mwd_hole_info_file = os.path.join(mwd_path, data_date.__str__(), 'HoleInfo.csv')
#    df = pd.read_csv(mwd_hole_info_file, parse_dates=['time_end', 'time_start'])
#    df = df.query(('machine_id=={}'.format(drill_id)))
#    mwd_hole_id = None
#    candidate_row = None
#    for i_row in range(len(df)):
#        row = df.iloc[i_row]
#        mwd_interval = TimePeriod(lower_bound=row.time_start, upper_bound=row.time_end)
#        if mwd_interval.overlaps(time_interval_inferred_from_pressure_log):
#            if candidate_row is None:
#                candidate_row = row
#                intersection = mwd_interval.__and__(time_interval_inferred_from_pressure_log)
#                duration_to_beat = intersection.duration()
#                #candidate_interval = mwd_interval
##                duration_to_beat = mwd_interval.__and__(time_interval_inferred_from_pressure_log)
##                candidate_interval = TimePeriod(lower_bound=candidate_row.time_start,
##                                                upper_bound=candidate_row.time_end)
#            else:
#                intersection = mwd_interval.__and__(time_interval_inferred_from_pressure_log)
#                if intersection.duration() > duration_to_beat:
#                    candidate_row = row
#                    intersection = mwd_interval.__and__(time_interval_inferred_from_pressure_log)
#                    duration_to_beat = intersection.duration()
#    if candidate_row is None:
#        print("failed to find intersection")
#        raise Exception
#    else:
#        mwd_hole_id = row.hole_id
#    return mwd_hole_id


def interpolate_to_assign_depths_to_log_csv_1(df_peak_info, df_hole_profile):
    """
    Note: you dont need the df_peak info, just its length and start_datetime
    flow:
        Get table of mwd profile.

    """
#    df_peak_info = pd.read_csv(peak_info_csv_filename, parse_dates=['datetime'])
#    df_hole_profile = pd.read_csv(hole_profile_filename, parse_dates=['time_end', 'time_start'])

    delta_z = df_hole_profile['end_depth']-df_hole_profile['start_depth']
    delta_t = df_hole_profile['time_end']-df_hole_profile['time_start']
    delta_t = pd.Series([float(x.seconds) for x in delta_t])
    datetime_delta_t = [datetime.timedelta(seconds=x) for x in delta_t]
    seconds_into_day_mwd_start = get_seconds_into_day(df_hole_profile['time_start'][0])

    print("seconds_into_day_mwd_start", seconds_into_day_mwd_start)

    approx_depth = df_hole_profile['start_depth'] + (delta_z)/2.
    #approx_time = df_hole_profile['time_start'] + datetime_delta_t#seconds_into_day + delta_t/2.
    approx_seconds_into_day = df_hole_profile['time_start'] + datetime_delta_t#seconds_into_day + delta_t/2.
    approx_seconds_into_day_mwd = pd.Series([get_seconds_into_day(x) for x in approx_seconds_into_day])
    #plt.plot(approx_depth, approx_time);
    #plt.plot(approx_depth, approx_seconds_into_day);plt.show()
    #plt.title('Depth vs Time for {}'.format(hole_profile_basename));plt.show()
    #interpolate
    #<RHINO TIME>
    num_traces = len(df_peak_info)
    seconds_into_day_rhino_start = get_seconds_into_day(df_peak_info['datetime'][0])
    seconds_into_day_rhino = seconds_into_day_rhino_start + np.arange(num_traces)
    #</RHINO TIME>
    interp_function = interp1d(approx_seconds_into_day_mwd, approx_depth, kind='linear', bounds_error=False, fill_value='extrapolate')
    depths = interp_function(seconds_into_day_rhino)
    #interpolator = lambda f: temp_function(np.abs(f))
    #<Sanity Check Plots>
#    fig, ax = plt.subplots(2, sharex=True)
#    ax[0].plot(depths, seconds_into_day_rhino, label='rhino');ax[0].legend()
#    #ax[0].set_xlim([0, 16.4])
#    ax[0].set_ylim([51000, 54000])
#    ax[0].set_ylabel('Seconds into Day')
#    plt.suptitle('Depth vs Time for {}'.format(hole_profile_basename))
#
#    ax[1].plot(approx_depth, approx_seconds_into_day, label='mwd');ax[1].legend()
#    #ax[1].set_xlim([0, 16.4])
#    ax[1].set_ylim([51000, 54000])
#    ax[1].set_ylabel('Seconds into Day')
#    ax[1].set_xlabel('Depth (m)')
    #</Sanity Check Plots>
    return depths


drill_id = 226
filelist = [path.abspath(f) for f in glob(DATA_PATH+"/SSX*.csv")]
filelist.sort()

print(filelist)
#TODO get a mapping from dummy-hole-id and SSX to client hole id for mwd
#e.g. SSX50598, 1 :--> 109880
hole_profile_basename = 'hole_profile_mwd_109880_v1.csv'
peak_info_csv_basename ='SSX50598_BH1_peak_109880.csv'
hole_profile_filename = os.path.join(DATA_PATH, hole_profile_basename)
peak_info_csv_filename = os.path.join(DATA_PATH, peak_info_csv_basename)

#for filename in filelist:
    #print(filename)
basename = os.path.basename(hole_profile_filename)[0:-4]
mwd_hole_id = basename.split('_')[3]
print(basename)
print("mwd_hole_id",mwd_hole_id)

df_peak_info = pd.read_csv(peak_info_csv_filename, parse_dates=['datetime'])
#pressure_log_time_interval = get_time_interval(df_peak_info)
#hole_id = associate_drilltime_from_pressure_log_with_mwd(pressure_log_time_interval, drill_id)
df_hole_profile = pd.read_csv(hole_profile_filename, parse_dates=['time_end', 'time_start'])

interpolate_to_assign_depths_to_log_csv(df_peak_info, df_hole_profile)
#depths = interpolate_to_assign_depths_to_log_csv_1(df_peak_info, df_hole_profile)

df_peak_info['depth']=depths
interpolated_file_path = '{}.csv'.format(mwd_hole_id)
df_peak_info.to_csv(interpolated_file_path)
pdb.set_trace()


#well_log_plots = WellLogPlots(interpolated_file_path)
#well_log_plots.plot()
