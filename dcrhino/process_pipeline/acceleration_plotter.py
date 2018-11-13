import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.colors as colors
from matplotlib.patches import Rectangle
import os
import argparse
import math
import pdb



def get_data_statistics(data):
    stats = {}
    combined_data = np.hstack((data[0],data[1]))
    # combined_data = data[1]
    mu = round(np.mean(combined_data),2)
    sigma = round(np.std(combined_data),2)
    stats["mu"] = mu
    stats["sigma"]=sigma
    stats["median"]= np.median([int(x) for x in combined_data])
    stats["peak_neg"]= mu - (3*sigma)
    stats["peak_pos"]= mu + (3*sigma)

    stats["mu_pos"] = round(np.mean(data[0]),2)
    stats["mu_neg"] = round(np.mean(data[1]),2)
    stats["median_pos"] = np.median([int(x) for x in data[0]])
    stats["median_neg"] = np.median([int(x) for x in data[1]])
    stats["sigma_pos"] = round(np.std(data[0]),2)
    stats["sigma_neg"] = round(np.std(data[1]),2)

    # indices = (data>=limits[0])&(data<=limits[1])
    return stats

def add_stats(axs,ax_limits,stats):
    for i in range(3):
        # axs[i].text(ax_limits[0]*0.95,ax_limits[1]*0.78,"Mean: {} g\nStd Dev: {} g\nMedian: {} g\nLower Limit: {} g\nUpper Limit: {} g\nPositive Mean: {} g\nPositive Std Dev: {} g\nPositive Median: {} g\nNegative Mean: {} g\nNegative Std Dev: {} g\nNegative Median: {} g\n".format(
        #                                                                               stats[i]["mu"],
        #                                                                               stats[i]["sigma"],
        #                                                                               stats[i]["median"],
        #                                                                               stats[i]["peak_neg"],
        #                                                                               stats[i]["peak_pos"],
        #                                                                               stats[i]["mu_pos"],
        #                                                                               stats[i]["sigma_pos"],
        #                                                                               stats[i]["median_pos"],
        #                                                                               stats[i]["mu_neg"],
        #                                                                               stats[i]["sigma_neg"],
        #                                                                               stats[i]["median_neg"],
        #                                                                               ))
        # axs[i].text(ax_limits[0]*0.3,.03,"Mean: {} g\nStd Dev: {} g\nMedian: {} g\nLower Limit: {} g\nUpper Limit: {} g\nPositive Mean: {} g\nPositive Std Dev: {} g\nPositive Median: {} g\nNegative Mean: {} g\nNegative Std Dev: {} g\nNegative Median: {} g\n".format(
        #                                                                               stats[i]["mu"],
        #                                                                               stats[i]["sigma"],
        #                                                                               stats[i]["median"],
        #                                                                               stats[i]["peak_neg"],
        #                                                                               stats[i]["peak_pos"],
        #                                                                               stats[i]["mu_pos"],
        #                                                                               stats[i]["sigma_pos"],
        #                                                                               stats[i]["median_pos"],
        #                                                                               stats[i]["mu_neg"],
        #                                                                               stats[i]["sigma_neg"],
        #                                                                               stats[i]["median_neg"],
        #                                                                               ))
        axs[i].text(ax_limits[0]*0.3,.03,"Mean: {} g\nStd Dev: {} g\nMedian: {} g\nLower Limit: {} g\nUpper Limit: {} g\n".format(
                                                                                      stats[i]["mu"],
                                                                                      stats[i]["sigma"],
                                                                                      stats[i]["median"],
                                                                                      stats[i]["peak_neg"],
                                                                                      stats[i]["peak_pos"],
                                                                                      ))

def plot_data(data,ax,ax_title,stats):
    combined_data = np.hstack((data[0],data[1]))
    # combined_data = data[1]
    n_bins = 100
    N, bins, patches = ax.hist(combined_data, bins=n_bins,density=True)
    ax.set_title(ax_title)
    miny,maxy = ax.get_ylim()
    minx,maxx = ax.get_xlim()
    vals = ax.get_yticks()
    ax.set_yticklabels(['{:,.0%}'.format(x) for x in vals])
    ax.set_yscale("log")
    for thisbin, thispatch in zip(bins, patches):
        if thisbin<stats["peak_neg"] or  thisbin>stats["peak_pos"]:
            thispatch.set_facecolor("red")
        else:
            thispatch.set_facecolor("green")
    print(maxx,maxy)
    return maxx,maxy

def acceleration_plotter(accel_df,output_name,title):
    limits = []
    x_limits = []
    y_limits =[]
    data_stats={}

    fig = plt.figure("Accelerometer Data",figsize=(24,12))
    axs = fig.subplots(1, 3, sharey=True, sharex=True)
    fig.suptitle(title,va="top",ha="center",size=20)

    in_range = "green"
    out_of_range = "red"
    handles = [Rectangle((0,0),1,1,color=c,ec="k") for c in [in_range,out_of_range]]
    labels= ["Within 99.5%","Outside 99.5%"]
    fig.legend(handles, labels,loc="upper right")

    x = [np.asarray(accel_df["max_x"]),np.asarray(accel_df["min_x"])]
    data_stats[0] = get_data_statistics(x)
    x,y = plot_data(x,axs[0],"X Axis",data_stats[0])
    x_limits.append(x)
    y_limits.append(y)

    y = [np.asarray(accel_df["max_y"]),np.asarray(accel_df["min_y"])]
    data_stats[1] = get_data_statistics(y)
    x,y = plot_data(y,axs[1],"Y Axis",data_stats[1])
    x_limits.append(x)
    y_limits.append(y)

    z = [np.asarray(accel_df["max_z"]),np.asarray(accel_df["min_z"])]
    data_stats[2] = get_data_statistics(z)
    x,y = plot_data(z,axs[2],"Z Axis",data_stats[2])
    x_limits.append(x)
    y_limits.append(y)

    ax_limits = [np.max(x_limits),np.max(y_limits)]

    add_stats(axs,ax_limits,data_stats)

    plt.show()
    fig.savefig(output_name)

def main(fname):
    title = os.path.abspath(os.path.join(os.path.dirname(fname), os.pardir))
    print (title)
    title = os.path.basename(title)
    title += " Combined Gs"
    output_name = os.path.join(os.path.dirname(fname),"acceleration_histogram.png")
    accel_df = pd.read_csv(fname)
    acceleration_plotter(accel_df,output_name,title)


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Acceleration Statitstics Plotter -  Copyright (c) 2018 DataCloud")
    argparser.add_argument('-csv', '--csv', help="Path to csv file", default=None)
    args = argparser.parse_args()
    main(args.csv)
