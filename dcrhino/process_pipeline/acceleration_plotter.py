import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.colors as colors
from matplotlib.patches import Rectangle
import os
import argparse
import math
import pdb



def get_6sigma_data(data):
    mu = np.mean(data)
    sigma = np.std(data)
    limits = [mu - (3*sigma),mu + (3*sigma)]
    indices = (data>=limits[0])&(data<=limits[1])
    return limits

def add_min_max_g(axs,ax_limits,data_limits):
    counter = 0
    for i in range(3):
        axs[i].text(ax_limits[0]*.95,ax_limits[1]*.95,"Lower Limit: {} g\nUpper Limit {} g".format(math.floor(data_limits[i+counter]),math.ceil(data_limits[i+1+counter])))
        counter +=1

def plot_data(data,ax,ax_title,limits):
    n_bins = 100
    N, bins, patches = ax.hist(data, bins=n_bins,density=True)
    ax.set_title(ax_title)
    miny,maxy = ax.get_ylim()
    minx,maxx = ax.get_xlim()
    vals = ax.get_yticks()
    ax.set_yticklabels(['{:,.0%}'.format(x) for x in vals])
    for thisbin, thispatch in zip(bins, patches):
        if thisbin<limits[0] or  thisbin>limits[1]:
            thispatch.set_facecolor("red")
        else:
            thispatch.set_facecolor("green")
    return minx,maxy

def acceleration_plotter(accel_df,output_name,title):
    limits = []
    x_limits = []
    y_limits =[]

    fig = plt.figure("Title",figsize=(24,12))
    axs = fig.subplots(1, 3, sharey=True, sharex=True)
    fig.suptitle(title,va="top",ha="center",size=20)

    in_range = "green"
    out_of_range = "red"
    handles = [Rectangle((0,0),1,1,color=c,ec="k") for c in [in_range,out_of_range]]
    labels= ["Within 99.5%","Outside 99.5%"]
    fig.legend(handles, labels,loc="upper right")

    x = np.asarray(accel_df["max_x"]) + np.asarray(accel_df["min_x"])
    limits += get_6sigma_data(x)
    x,y = plot_data(x,axs[0],"X Axis",limits)
    x_limits.append(x)
    y_limits.append(y)

    y = np.asarray(accel_df["max_y"]) + np.asarray(accel_df["min_y"])
    limits += get_6sigma_data(y)
    x,y = plot_data(y,axs[1],"Y Axis",limits)
    x_limits.append(x)
    y_limits.append(y)

    z = np.asarray(accel_df["max_z"]) + np.asarray(accel_df["min_z"])
    limits += get_6sigma_data(z)
    x,y = plot_data(z,axs[2],"Z Axis",limits)
    x_limits.append(x)
    y_limits.append(y)

    ax_limits = [np.min(x_limits),np.max(y_limits)]

    add_min_max_g(axs,ax_limits,limits)

    plt.show()
    fig.savefig(output_name)

def main(fname):
    title = os.path.abspath(os.path.join(os.path.dirname(fname), os.pardir))
    print (title)
    title = os.path.basename(title)
    output_name = os.path.join(os.path.dirname(fname),"acceleration_histogram.png")
    accel_df = pd.read_csv(fname)
    acceleration_plotter(accel_df,output_name,title)


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Acceleration Statitstics Plotter -  Copyright (c) 2018 DataCloud")
    argparser.add_argument('-csv', '--csv', help="Path to csv file", default=None)
    args = argparser.parse_args()
    main(args.csv)
