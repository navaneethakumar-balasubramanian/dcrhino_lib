import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import glob
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.models.config import Config
import os
import argparse
import h5py



def main(path):
    rta = True
    if rta:
        file_type = "*RTA*.h5"
    else:
        file_type = "*RTR*.h5"
    data = None
    file_list = list()
    qc_columns = ["timestamp", "batt", "packets", "rssi", "temp"]
    if os.path.isdir(path):
        file_list = glob.glob(os.path.join(path, file_type))
    else:
        file_list.append(path)

    for file in file_list:
        h5 = h5py.File(file, "r")
        print(h5.keys())
        _data = pd.DataFrame(columns=qc_columns)
        for column in qc_columns:
            _data[column] = h5[column]
        if data is None:
            data = _data
        else:
            data.append(_data)

    print(data)


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="IDE to H5 Converter v%d.%d.%d - Copyright (c) 2019 DataCloud")
    argparser.add_argument('-p', '--path', required=True, help="Path to file or folder to analyze")
    args = argparser.parse_args()
    if os.path.exists(args.path):
        main(args.path)
    else:
        print("Path selected does not exist")
