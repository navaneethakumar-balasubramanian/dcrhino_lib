from os import path
import os
import datetime
import pandas as pd
import pdb
import numpy as np
from glob import glob
from scipy.interpolate import interp1d
import matplotlib.pyplot as plt
from dcrhino.analysis.aggregation_20180614.depth_interpolater import DepthInterpolater
from dcrhino.analysis.aggregation_20180614.well_log_plots import WellLogPlots
from dcrhino.analysis.supporting_datetime import get_seconds_into_day
from dcrhino.constants import DATA_PATH
# data_path = "/Users/deepak/Workspace/datacloud/dcrhino_data_processing/data/mont_wright/level_2/csv/piezo/2018-05-29/*.csv"
# files = [path.abspath(f) for f in glob(data_path)]

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
df_hole_profile = pd.read_csv(hole_profile_filename, parse_dates=['time_end', 'time_start'])

delta_z = df_hole_profile['end_depth']-df_hole_profile['start_depth']
delta_t = df_hole_profile['time_end']-df_hole_profile['time_start']
delta_t = pd.Series([float(x.seconds) for x in delta_t])
datetime_delta_t = [datetime.timedelta(seconds=x) for x in delta_t]
seconds_into_day_mwd_start = get_seconds_into_day(df_hole_profile['time_start'][0])

print("seconds_into_day_mwd_start", seconds_into_day_mwd_start)

approx_depth = df_hole_profile['start_depth'] + (delta_z)/2.
approx_time = df_hole_profile['time_start'] + datetime_delta_t#seconds_into_day + delta_t/2.
approx_seconds_into_day = df_hole_profile['time_start'] + datetime_delta_t#seconds_into_day + delta_t/2.
approx_seconds_into_day = pd.Series([get_seconds_into_day(x) for x in approx_seconds_into_day])
#plt.plot(approx_depth, approx_time);
#plt.plot(approx_depth, approx_seconds_into_day);plt.show()
#plt.title('Depth vs Time for {}'.format(hole_profile_basename));plt.show()
#interpolate
#<RHINO TIME>
num_traces = len(df_peak_info)
seconds_into_day_rhino_start = get_seconds_into_day(df_peak_info['datetime'][0])
seconds_into_day_rhino = seconds_into_day_rhino_start + np.arange(num_traces)
#</RHINO TIME>
interp_function = interp1d(approx_seconds_into_day, approx_depth, kind='linear', bounds_error=False, fill_value='extrapolate')
depths = interp_function(seconds_into_day_rhino)
#fig, ax = plt.subplots(2, sharex=True)
#ax[0].plot(depths, seconds_into_day_rhino, label='rhino');ax[0].legend()
##ax[0].set_xlim([0, 16.4])
#ax[0].set_ylim([51000, 54000])
#ax[0].set_ylabel('Seconds into Day')
#plt.suptitle('Depth vs Time for {}'.format(hole_profile_basename))
#
#ax[1].plot(approx_depth, approx_seconds_into_day, label='mwd');ax[1].legend()
##ax[1].set_xlim([0, 16.4])
#ax[1].set_ylim([51000, 54000])
#ax[1].set_ylabel('Seconds into Day')
#ax[1].set_xlabel('Depth (m)')
##
##
#plt.show()
#interpolator = lambda f: temp_function(np.abs(f))
df_peak_info['depth']=depths
interpolated_file_path = '{}.csv'.format(mwd_hole_id)
df_peak_info.to_csv(interpolated_file_path)
pdb.set_trace()


#depth_interpolater = DepthInterpolater(peak_info_csv_filename)
#interpolated_file_path = depth_interpolater.interpolate(mwd_hole_id)
well_log_plots = WellLogPlots(interpolated_file_path)
well_log_plots.plot()
