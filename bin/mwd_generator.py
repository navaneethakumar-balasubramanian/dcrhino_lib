import pandas as pd
import argparse
import os
import random
import uuid;

import numpy as np
from datetime import datetime

from dcrhino3.models.fake_hole_mwd import FakeHoleMwd

from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)



def unique_hole_id(df):
    temp = uuid.uuid4().hex.upper()[0:6]
    if "hole_id" in df.columns:
        if temp not in df['hole_id']:
            return temp
        else:
            return unique_hole_id(df)
    return temp


if __name__ == '__main__':
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
    argparser.add_argument("path", metavar="path", type=str,
                           help="Path to output file")
    argparser.add_argument('-mid', '--machine-id', help="Machine ID", default="Y")
    args = argparser.parse_args()

    if os.path.exists(args.path):
        df = pd.read_csv(args.path)
        init_date = pd.to_datetime(df[df["machine_id"] == args.machine_id]['time_end'].max())
        if init_date is pd.NaT:
            init_date = pd.to_datetime("2019-01-01 00:00:00")

    else:
        df = pd.DataFrame()
        init_date = pd.to_datetime("2019-01-01 00:00:00")


    end_date = pd.to_datetime('now')


    duration_hole_mwd_in_seconds = 5400
    duration_interval_between_drills_in_seconds = 5400
    finished = False

    last_init_date = init_date
    while not finished:

        random_duration = random.randint(int(duration_hole_mwd_in_seconds * 0.8),
                                         int(duration_hole_mwd_in_seconds * 1.2))
        random_interval = random.randint(int(duration_interval_between_drills_in_seconds * 0.8),
                                         int(duration_interval_between_drills_in_seconds * 1.2))

        last_init_date = last_init_date + pd.to_timedelta(random_interval, unit='s')

        end_hole_time = last_init_date + pd.to_timedelta(random_duration,unit='s')
        if end_hole_time > end_date:
            finished = True
            df.to_csv(args.path,index=False)
        else:
            hole_id = unique_hole_id(df)
            #TODO: CREATE FAKE REDRILLS
            hole_name = hole_id


            hole_mwd = FakeHoleMwd(start_time=last_init_date,end_time=end_hole_time, hole_id=hole_id,hole_name=hole_name,machine_id = args.machine_id).dataframe
            df = df.append(hole_mwd)

            print ("Generated one hole from " + str(last_init_date) + " to " + str(end_hole_time))
            last_init_date = end_hole_time

