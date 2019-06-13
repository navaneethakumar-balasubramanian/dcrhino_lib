#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""

@author: natal
"""

from __future__ import absolute_import, division, print_function
import argparse
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os


def plot(depth1, depth2, data1, data2, feature1, feature2, title, output_path):
    axis_font = {'fontname': 'Arial', 'size': '8'}
    title_font = {'fontname': 'Arial', 'size': '14'}
    suptitle_font_size = 20
    legend_font_size = 8
    tick_size = 8

    fig = plt.figure(figsize=(24, 12))
    plt.subplots_adjust(hspace=0.25)
    depth_plot = plt.subplot2grid((2, 1), (0, 0), colspan=1)
    scatter_plot = plt.subplot2grid((2, 1), (1, 0), colspan=1)
    depth_plot.plot(depth1, data1, "crimson", linewidth=1)
    depth_plot.plot(depth2, data2, "steelblue", linewidth=1)
    depth_plot.set_xlabel("m", **axis_font)
    depth_plot.set_title("Features vs Depth", **title_font)
    depth_plot.tick_params(labelsize=tick_size)
    depth_box = depth_plot.get_position()
    depth_plot.set_position([depth_box.x0, depth_box.y0 + depth_box.height * 0.01,
                             depth_box.width, depth_box.height * 0.95])

    depth_plot.legend(loc='upper center', bbox_to_anchor=(0.5, -0.1),
                      fancybox=True, shadow=True, ncol=5, prop={'size': legend_font_size})

    _min = np.min([np.min(data1), np.min(data2)]) * .90
    _max = np.max([np.max(data1), np.max(data2)]) * 1.10

    try:
        scatter_plot.scatter(data1, data2, marker="o", c="steelblue")
        scatter_plot.set_xlabel(feature1, **axis_font)
        scatter_plot.set_ylabel(feature2, **axis_font)
        scatter_plot.set_title("{} vs. {}".format(feature1, feature2), **title_font)
        scatter_plot.tick_params(labelsize=tick_size)
        scatter_box = scatter_plot.get_position()
        scatter_plot.set_position([scatter_box.x0, scatter_box.y0 + scatter_box.height * 0.01,
                                   scatter_box.width, scatter_box.height * 0.95])

        scatter_plot.set_xlim(_min, _max)
        scatter_plot.set_ylim(_min, _max)
    except:
        print("Data arrays are different size and can't be crossplotted")

    plt.suptitle(title, size=suptitle_font_size)
    fig.savefig(os.path.join(output_path, "{}_vs_{}.png".format(feature1, feature2)))
    plt.close()
    # plt.show()


def is_feature(column_name):
    return column_name[0].isalpha() and column_name[1].isdigit() and column_name[2] == "_"


def compare_versions(file1, features, output_path, file2=None):

    same_file = False
    if file2 is None:
        same_file = True

    file_1_path = file1



    df1 = pd.read_csv(file_1_path)
    depth1 = df1["depth"]
    depth2 = depth1

    if not same_file:
        # file_2_path = "/home/natal/toconvert/e77015_15_147487_W226_6243_extracted_features.csv"
        file_2_path = file2
        df2 = pd.read_csv(file_2_path)
        depth2 = df2["depth"]

    hole = df1["hole_name"].iloc[0]
    bench = df1["bench_name"].iloc[0]
    pattern = df1["pattern_name"].iloc[0]
    rig = df1["rig_id"].iloc[0]
    sensor_id_1 = df1["rhino_sensor_uid"].iloc[0]
    sensor_id_2 = "Same"

    with open(features) as f:
        features = f.read().splitlines()

    feature_list = []
    for column in df1.columns:
        if is_feature(column) and column[3:] in features and column not in feature_list:
                feature_list.append(column)

    if same_file:
        for i, feature in enumerate(feature_list):
            indices = [j for j, s in enumerate(feature_list) if feature[3:] == s[3:] and i != j]
            for index in indices:
                feature1 = feature
                feature2 = feature_list[index]
                if feature1[:3] != feature2[:3]:
                    data1 = df1[feature1]
                    data2 = df1[feature2]
                    title = "Bench:{} - Pattern:{} - Hole:{}\n Rig:{} - Sensor 1:{} - Sensor 2:{}\n Feature 1: {} - " \
                            "Feature 2: {} - Same File {}".format(bench, pattern, hole, rig, sensor_id_1, sensor_id_2,
                                                                  feature1, feature2, same_file, args.output_path)
                    plot(depth1, depth2, data1, data2, feature1, feature2, title)
    else:
        if sensor_id_1 != df2["rhino_sensor_uid"].iloc[0]:
            sensor_id_2 = df2["rhino_sensor_uid"].iloc[0]
        for feature in feature_list:
            indices = [j for j, s in enumerate(df2.columns) if feature[3:] == s[3:]]
            for index in indices:
                feature1 = feature
                feature2 = df2.columns[index]
                if feature1[3:] == feature2[3:]:
                    data1 = df1[feature1]
                    data2 = df2[feature2]
                    title = "Bench:{} - Pattern:{} - Hole:{}\n Rig:{} - Sensor 1:{} - Sensor 2:{}\n Feature 1: {} - " \
                            "Feature 2: {} - Same File {}".format(bench, pattern, hole, rig, sensor_id_1, sensor_id_2,
                                                                  feature1, feature2, same_file)
                    plot(depth1, depth2, data1, data2, feature1, feature2, title, output_path)
    print("Done")


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Data Compare - Copyright (c) 2019 DataCloud")
    argparser.add_argument('-a', '--file1', help="File 1", default=None)
    argparser.add_argument('-b', '--file2', help="File 2", default=None)
    argparser.add_argument('-f', '--features', help="Features File", default=None)
    argparser.add_argument('-o', '--output-path', help="Output file path", default=None)

    args = argparser.parse_args()
    compare_versions(file1=args.file1, file2=args.file2, features=args.features, output=args.output_path)
