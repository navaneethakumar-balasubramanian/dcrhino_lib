import pandas as pd
from dcrhino3.models.trace_dataframe import TraceData
import os
import glob2
import argparse
from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)


def main(args):
    # path = "/home/natal/toconvert/v3_cache/swc/acorr/100_100_S220_S220_S1031_S1031.h5"
    path = args.path
    base_path = os.path.dirname(path)
    raw_files = glob2.glob(path)
    files = list()

    for raw_file in raw_files:
        if ".txt" in raw_file:
            rf = open(raw_file, "r")
            lines = rf.read().split("\n")
            for line in lines:
                if len(line):
                    files.append(os.path.join(base_path, line))
        elif ".h5" in raw_file:
            files.append(raw_file)

    logger.info("{} Files Found".format(len(files)))

    for f in files:
        logger.info("Updating file {}".format(f))
        td = TraceData()
        # h5f = h5py.File(f,"r+")
        td.load_from_h5(f)
        # columns = td.dataframe.columns
        remap_dict = {'axial_trace':'tangential_trace', "tangential_trace":"axial_trace",
                      "max_axial_acceleration":"max_tangential_acceleration",
                      "min_axial_acceleration":"min_tangential_acceleration",
                      "max_tangential_acceleration":"max_axial_acceleration",
                      "min_tangential_acceleration":"min_axial_acceleration"}

        td_remmaped = pd.DataFrame()
        for column in td.dataframe.columns:
               if column in remap_dict.keys():
                   td_remmaped[column] = td.dataframe[remap_dict[column]]
               else:
                   td_remmaped[column] = td.dataframe[column]
        td.dataframe = td_remmaped
        file_version = 1
        file_path = os.path.dirname(f)
        old_file_name = os.path.basename(f).split(".")[0]
        new_name = "{}_v{}.h5".format(old_file_name,file_version)
        output_name = os.path.join(file_path,new_name)
        while os.path.exists(output_name):
            file_version += 1
            new_name = "{}_v{}.h5".format(old_file_name, file_version)
            output_name = os.path.join(file_path, new_name)
        td.save_to_h5(output_name)
        logger.info("{} saved".format(output_name))

    print("done")

if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="RTA column updater - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-p', '--path',
                           help="Path of RTA files or path to Text file with relative paths to RTA files", default=None)
    args = argparser.parse_args()
    main(args)