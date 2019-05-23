import datetime
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

def make_plot(mwd_df, traces_df):
   time_shift_applied_to_mwd = 0
   mwd_df.start_time = pd.to_datetime(mwd_df.start_time)
   shifted_time = mwd_df.start_time + datetime.timedelta(seconds=time_shift_applied_to_mwd)
   traces_df['datetime'] = pd.to_datetime(traces_df['timestamp'], unit='s')
   traces_df.max_axial_acceleration = np.clip(traces_df.max_axial_acceleration, 0, 9.76)
   #dft = dft[dft.acorr_file_id==34]    #plt.plot(mwd_df.start_time_old, mwd_df.depth, '*', label ='mwd original');
   plt.plot(shifted_time, mwd_df.depth, '*', label ='mwd shifted');
   plt.plot(traces_df.datetime, traces_df.max_axial_acceleration, '*', label ='rhino_traces');    plt.legend()
   ttl_string = "Time shift {}s applied to mwd".format(time_shift_applied_to_mwd)
   plt.title(ttl_string)
   plt.xlabel('Time/Date')
   plt.ylabel('Depth (m)')
   plt.show()