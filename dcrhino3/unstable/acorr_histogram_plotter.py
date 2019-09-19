import pandas as pd
import argparse
import glob2
import numpy as np
from dcrhino3.models.trace_dataframe import TraceData
import matplotlib.pyplot as plt
plt.switch_backend('agg')


def main(args):
    path = args.path
    files = glob2.glob(path)
    g_range = args.range
    main_df = pd.DataFrame()
    columns = list()
    axis = args.axis
    columns.append("max_{}_acceleration".format(axis))
    columns.append("min_{}_acceleration".format(axis))
    for acorr_file in files:
        try:
            print("working on {}".format(acorr_file))
            trace = TraceData()
            trace.load_from_h5(acorr_file)
            this_df = None
            this_df = trace.dataframe[columns]
            main_df = pd.concat((main_df, this_df))
            fig1 = plt.figure(1)
            bins = np.arange(0, g_range, 1)
            max_axis_accel = np.asarray(this_df["max_{}_acceleration".format(axis)])
            plt.hist(max_axis_accel, bins=bins)
            bins = np.arange(-1 * g_range, 0, 1)
            min_axis_accel = np.asarray(this_df["min_{}_acceleration".format(axis)])
            plt.hist(min_axis_accel, bins=bins)
            plt.title("{} axis for {}".format(axis, path))
            fig1.savefig(acorr_file + "_{}.png".format(axis))
            fig1.clf()
        except:
            print("FAILED on FILE {}".format(acorr_file))

    fig2 = plt.figure(1)
    bins = np.arange(0, g_range, 1)
    max_axis_accel = np.asarray(main_df["max_{}_acceleration".format(axis)])
    plt.hist(main_df["max_{}_acceleration".format(axis)], bins=bins)
    bins = np.arange(-1*g_range, 0, 1)
    min_axis_accel = np.asarray(main_df["min_{}_acceleration".format(axis)])
    plt.hist(main_df["min_{}_acceleration".format(axis)], bins=bins)
    plt.title("{} axis for {}".format(axis, path))
    fig2.savefig(args.output_name)
    print("done")


if __name__ == "__main__":
    argparser = argparse.ArgumentParser()
    argparser.add_argument('-p', '--path', help="Path to file or folder containing acorr files")
    argparser.add_argument('-r', '--range', help="Abs Max acceleration range", default=100, type=int)
    argparser.add_argument('-o', '--output_name', help="Output name for plot", default="histogram.png")
    argparser.add_argument('-a', '--axis', help="Axis to be analyzed", default="axial")
    args = argparser.parse_args()
    main(args)
