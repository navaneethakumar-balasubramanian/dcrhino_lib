import pandas as pd
import argparse
import os
import numpy as np
from datetime import datetime

from dcrhino3.models.fake_hole_mwd import FakeHoleMwd

from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)



if __name__ == '__main__':
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
    argparser.add_argument("path", metavar="path", type=str,
                           help="Path to output file")
    args = argparser.parse_args()

    if os.path.exists(args.path):
        df = pd.read_csv(args.path)

    init_date = "2018-05-31 00:37:48"
    end_date = "2018-06-30 00:37:48"


    temp = FakeHoleMwd(start_time=init_date,end_time="2018-05-31 01:37:48").dataframe
    pass
