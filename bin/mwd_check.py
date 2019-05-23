from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.mwd_helper import MWDHelper
from mwd_check_plotter import make_plot
import matplotlib.pyplot as plt
import argparse


def check(mine_name):
    env_config = EnvConfig()
    mwd_helper = MWDHelper(env_config)
    mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(mine_name)
    conn = env_config.get_rhino_db_connection_from_mine_name(mine_name)

    #sqlconn = env_config.get_rhino_sql_connection_from_mine_name('mont_wright')

    db_helper= RhinoDBHelper(conn=conn)
    result = db_helper.client.execute("select acorr_file_id , timestamp, max_axial_acceleration from acorr_traces order by timestamp")
    df_traces = db_helper.query_result_to_pd(result,['acorr_file_id','timestamp','max_axial_acceleration'])
    accel = df_traces.max_axial_acceleration

    timestamps_mwd = mwd_df.start_time
    depth_mwd = mwd_df.depth.values
    timestamps = df_traces

    make_plot(mwd_df, df_traces)

    plt.show()

if __name__ == '__main__':
    use_argparse = True#False
    if use_argparse:
        argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")

        argparser.add_argument("mine_name", type=str,
        help="Name of mine to check, matching env_config.json" )

        args = argparser.parse_args()
        mine_name = args.mine_name

    else:
        mine_name = 'bma'

    check(mine_name)

