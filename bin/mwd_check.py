from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.mwd_helper import MWDHelper

import matplotlib.pyplot as plt
import argparse
import numpy as np
import pandas as pd
import datetime


def sanity_plot(mwd_df, traces_df):
    time_shift_applied_to_mwd = 0
    mwd_df.start_time = pd.to_datetime(mwd_df.start_time)
    shifted_time = mwd_df.start_time + datetime.timedelta(seconds=time_shift_applied_to_mwd)
    traces_df['datetime'] = pd.to_datetime(traces_df['timestamp'], unit='s')
    traces_df.max_axial_acceleration = np.clip(traces_df.max_axial_acceleration, 0, 9.76)
    # dft = dft[dft.acorr_file_id==34]    #plt.plot(mwd_df.start_time_old, mwd_df.depth, '*', label ='mwd original');
    plt.plot(shifted_time, mwd_df.depth, '*', label='mwd shifted');
    plt.plot(traces_df.datetime, traces_df.max_axial_acceleration, '*', label='rhino_traces');
    plt.legend()
    ttl_string = "Time shift {}s applied to mwd".format(time_shift_applied_to_mwd)
    plt.title(ttl_string)
    plt.xlabel('Time/Date')
    plt.ylabel('Depth (m)')
    plt.show()

def check(mine_name):
    env_config = EnvConfig()
    mwd_helper = MWDHelper(env_config)
    mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(mine_name)
    conn = env_config.get_rhino_db_connection_from_mine_name(mine_name)

    db_helper= RhinoDBHelper(conn=conn)
    result = db_helper.client.execute("select acorr_file_id , timestamp, max_axial_acceleration from acorr_traces order by timestamp")
    df_traces = db_helper.query_result_to_pd(result,['acorr_file_id','timestamp','max_axial_acceleration'])

    sanity_plot(mwd_df,df_traces)



if __name__ == '__main__':
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")

    argparser.add_argument("mine_name", type=str,
    help="Name of mine to check, matching env_config.json" )

    args = argparser.parse_args()
    mine_name = args.mine_name

    check(mine_name)

