import numpy as np
import pandas as pd
from dcrhino.process_pipeline.h5_helper import H5Helper
import h5py
import pdb
import argparse
import matplotlib.pyplot as plt





def main(fname,basic):
    output = fname.replace(".h5",".csv")
    hf = h5py.File(fname, 'r')
    h5h = H5Helper(hf)

    accel_df = h5h.acceleration_stats(10,basic)
    if accel_df is not None:
        accel_df.to_csv(output)

    # pdb.set_trace()
    # n, bins, patches = plt.hist(accel_df["max_x"], None, density=True, facecolor='g', alpha=0.75)
    # n, bins, patches = plt.hist(accel_df["min_x"], None, density=True, facecolor='g', alpha=0.75)
    # plt.xlabel('Gs')
    # plt.ylabel('Counts')
    # plt.title('Histogram of IQ')
    # plt.text(60, .025, r'$\mu=100,\ \sigma=15$')
    # plt.axis([40, 160, 0, 0.03])
    # plt.grid(True)
    # plt.show()

    print("done")


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="H5 Acceleration Statitstics -  Copyright (c) 2018 DataCloud")
    argparser.add_argument('-h5', '--h5_file', help="Path to H5 file", default=None)
    argparser.add_argument('-basic', '--basic', help="Basic stats", default=True)
    args = argparser.parse_args()

    main(args.h5_file,args.basic)
