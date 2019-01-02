#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Nov 12 11:00:23 2018

@author: sjha
"""
from __future__ import absolute_import, division, print_function


import numpy as np
import os
import pdb
import pandas as pd
import json
import sys
from datetime import datetime
import argparse
import pdb

from dcrhino.process_pipeline.config import Config
from dcrhino.process_pipeline.mwd_helper import MwdDFHelper
from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotterv2
from dcrhino.process_pipeline.qc_log_plotter_nomwd import QCLogPlotter_nomwd
from dcrhino.process_pipeline.acceleration_plotter import acceleration_plotter
from dcrhino.process_pipeline.qc_log_plotter_for_jamie import QCLogPlotterv3
from dcrhino.analysis.unstable.feature_extraction.feature_extraction_20181211 import get_expected_multiple_times

def get_multiples(global_config):
            expected_multiple = get_expected_multiple_times(global_config, recipe='J1')
#            pdb.set_trace()
# Calculate 1st and 2nd multiples for axial and tangential data. These are theoretical. Actual multiples will be different
#            pdb.set_trace()

#            Vaxial = global_config.ACOUSTIC_VELOCITY #m/s
#            Vtang =  global_config.SHEAR_VELOCITY #m/s
##            pdb.set_trace()
#
#            ax_1_mult = (2*(global_config.sensor_distance_to_source+global_config.sensor_distance_to_shocksub)/Vaxial)*1000
#            ax_2_mult = (4*(global_config.sensor_distance_to_source+global_config.sensor_distance_to_shocksub)/Vaxial)*1000
#
#            tang_1_mult = (2*(global_config.sensor_distance_to_source+global_config.sensor_distance_to_shocksub)/Vtang)*1000
#            tang_2_mult = (4*(global_config.sensor_distance_to_source+global_config.sensor_distance_to_shocksub)/Vtang)*1000
## Using Karl's code now.
            mult_pos = pd.DataFrame({'axial_first_multiple':[expected_multiple['axial']*1000], 'axial_second_multiple':[expected_multiple['axial_second_multiple']*1000],
                                     'tangential_first_multiple':[expected_multiple['tangential']*1000], 'tangential_second_multiple':[expected_multiple['tangential_second_multiple']*1000]})
#            pdb.set_trace()
            return mult_pos

def get_ax_lim(extracted_features_df):
        min_ax_RC = min(extracted_features_df['reflection_coefficient'])
        max_ax_RC = max(extracted_features_df['reflection_coefficient'])

        min_tang_RC = min(extracted_features_df['tangential_RC'])
        max_tang_RC = max(extracted_features_df['tangential_RC'])

        min_peak_x = min(extracted_features_df['axial_primary_peak_sample'])
        max_peak_x = max(extracted_features_df['axial_primary_peak_sample'])
        min_delay = min(extracted_features_df['axial_velocity_delay'])
        max_delay = max(extracted_features_df['axial_velocity_delay'])

        # 5% less than the minimum and 5% more than maximum for the entire bench

        lower_ax_RC = (min_ax_RC - (min_ax_RC*0.05))
        upper_ax_RC = (max_ax_RC + (max_ax_RC*0.05))

        lower_peak_x = (min_peak_x - (min_peak_x*0.05))
        upper_peak_x = (max_peak_x + (max_peak_x*0.05))

        lower_delay = (min_delay - (min_delay*0.05))
        upper_delay = (max_delay - (max_delay*0.05))

        lower_tang_RC = (min_tang_RC - (min_tang_RC*0.05))
        upper_tang_RC = (max_tang_RC + (max_tang_RC*0.05))

        print(min_ax_RC,max_ax_RC, min_tang_RC,max_tang_RC,min_peak_x, max_peak_x,
              min_delay,max_delay,lower_ax_RC,upper_ax_RC, lower_peak_x, upper_peak_x,
              lower_delay,upper_delay,lower_tang_RC,upper_tang_RC)

        ax_lim = pd.DataFrame({'lower_ax_RC':[lower_ax_RC],'upper_ax_RC':[upper_ax_RC],'lower_peak_x':[lower_peak_x],
                               'lower_delay':[lower_delay],'upper_delay':[upper_delay],'lower_tang_RC':[lower_tang_RC],
                               'upper_tang_RC':[upper_tang_RC]})
        return ax_lim

def get_plot_title(global_config,mwd_df):

    if global_config.drill_type == 1:
        drill_type = "electric rotary",
    elif global_config.drill_type == 2:
        drill_type ="diesel rotary",
    elif global_config.drill_type == 3:
        drill_type ="dth",
    elif global_config.drill_type == 4:
        drill_type="top hammer",
    elif global_config.drill_type== 5:
        drill_type="coring"
    else:
        drill_type = "unknown"

    if global_config.bit_type == 1:
        bit_type ="tricone"
    elif global_config.bit_type ==2:
        bit_type ="pdc",
    elif global_config.bit_type ==3:
        bit_type = "coring",
    else:
        bit_type ="other"

    if global_config.sensor_installation_location == 1:
        sensor_location = "shocksub"
    elif global_config.sensor_installation_location ==2:
        sensor_location ="saver sub"
    elif global_config.sensor_installation_location==3:
        sensor_location ="steel"
    elif global_config.sensor_installation_location==4:
        sensor_location ="steel breakout"
    else:
        sensor_location="unknown"


    title_line1 = r"$\bf{"+ "SENSOR"+"}$"+": LOCATION: {}".format(sensor_location) +", SERIAL NUMBER: {}".format(global_config.sensor_serial_number)+'\n'+"SENSITIVITY: {}, ORIENTATION: <> ".format(global_config.sensor_saturation_g)
    title_line2 = r"$\bf{"+ "RIG/BIT/DRILLSTRING"+"}$"+": RIG TYPE: <>, DRILL TYPE: {},".format(drill_type)+'\n'+"BIT SIZE: {}/".format(global_config.bit_size)+" Type:{}".format(bit_type)+"/Model:{}".format(global_config.bit_model)+"/Tooth Length:<>,"+'\n'+" DRILL STRING LENGTH:{}".format(global_config.drill_string_total_length)
    title_line3 = "DISTANCE FROM BIT TO SENSOR: {}".format(global_config.sensor_distance_to_source,global_config.rig_id)
        # FIX THIS TITLE
#            title_line5 = "type,starting distance (relative to bit bottom),  length, outer diameter"
    #title_line4 = r"$\bf{"+"MINE"+"}$"+": {},".format(global_config.mine_name)+ r"$\bf{"+"DATE:"+"}$"+ "{},".format(pd.to_datetime(mwd_df.time_start_utc.min()).strftime("%B %d, %Y"))+'\n'+r"$\bf{"+" BENCH:"+"}$"+"{},".format(mwd_df.bench.values[0])+ r"$\bf{"+"HOLE:"+"}$"+ "{}" .format(mwd_df.hole.values[0])
    title_line4 = ""
    plot_title = [title_line4, title_line2+' '+title_line3, title_line1]
#    pdb.set_trace()

    return plot_title


def get_output_file_name(mwd_df,global_config):
    pdb.set_trace()
    output_file_name = "{}_{}_{}depth_plot.png".format(mwd_df.bench_name.values[0], mwd_df.hole_name.values[0],global_config.sensor_serial_number,)
    return output_file_name


def get_noise_threshold(global_config):
        noise_threshold = global_config.sensor_saturation_g/2000.
        return noise_threshold

def main():

    ddir = '/mnt/sda1/data/data_blob/qc_test_dataset/milligan/output_milligan/output_milligan/holes/965,106,614,3,5208'
    mmap = '/mnt/sda1/data/data_blob/qc_test_dataset/milligan/mount_milligan_mwd_map.json'
#    ofp = ddir
#    ofp = False

    argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-ddir', '--data-path', help="Extracted Data Directory Path", default=ddir)
    argparser.add_argument('-mmap', '--mwd-map-json', help="MWD MAP JSON", default=mmap)
    argparser.add_argument('-ric', '--rig-id-column', help="RIG ID COLUMN", default='rig')
    argparser.add_argument('-sc', '--start-time-column', help="START TIME COLUMN", default='starttime')
    argparser.add_argument('-ec', '--end-time-column', help="END TIME COLUMN", default='endtime')
    argparser.add_argument('-hc', '--hole-column', help="HOLE COLUMN", default='hole')
    argparser.add_argument('-mc', '--mse-column', help="MSE COLUMN", default='mse')
    argparser.add_argument('-bc', '--bench-column', help="BENCH COLUMN", default='bench')
    argparser.add_argument('-ropc', '--rop-column', help="ROP COLUMN", default='rop')
    argparser.add_argument('-wobc', '--wob-column', help="WOB COLUMN", default='wob')
    argparser.add_argument('-tobc', '--tob-column', help="TOB COLUMN", default='tob')
    argparser.add_argument('-eastc', '--easting-column', help="EASTING COLUMN", default='easting')
    argparser.add_argument('-nortc', '--northing-column', help="NORTHING COLUMN", default='northing')
    argparser.add_argument('-pc', '--pattern-column', help="PATTERN COLUMN", default='pattern')
    argparser.add_argument('-cec', '--collar-elevation-column', help="COLLAR ELEVATION COLUMN", default='collar_elevation')
    argparser.add_argument('-compec', '--computed-elevation-column', help="COMPUTED ELEVATION COLUMN", default='computed_elevation')
    argparser.add_argument('-o', '--output-folder-path', help="OUTPUT FILES TO FOLDER", default=False)
    args = argparser.parse_args()

    start_time_column = args.start_time_column
    end_time_column = args.end_time_column
    bench_column = args.bench_column
    pattern_column = args.pattern_column
    hole_column = args.hole_column
    collar_elevation_column = args.collar_elevation_column
    computed_elevation_column = args.computed_elevation_column
    rig_id_column = args.rig_id_column
    mse_column = args.mse_column
    rop_column = args.rop_column
    wob_column = args.wob_column
    tob_column = args.tob_column
    easting_column = args.easting_column
    northing_column = args.northing_column
    mwd_map_json_path = args.mwd_map_json
    output_folder_path = args.output_folder_path

    mwd_map = False
    if mwd_map_json_path:
        with open(mwd_map_json_path) as f:
          mwd_map = json.load(f)

    config_filebase = "global_config.json"
    feature_csv_filebase = 'extracted_features.csv'
    mwd_csv_filebase = 'hole_mwd.csv'
    accel_csv_filebase = 'acceleration_values_by_second.csv'


    mwd_fullfile = os.path.join(args.data_path,mwd_csv_filebase)
    feature_fullfile = os.path.join(args.data_path,feature_csv_filebase)
    config_fullfile = os.path.join(args.data_path,config_filebase)
    accel_fullfile = os.path.join(args.data_path,accel_csv_filebase)



    mwd_df = None
    try:
        mwd_df = pd.read_csv(mwd_fullfile)
    except IOError:
        print('No files exist. Were the files extracted by running process pipeline?')
        #sys.exit()


    global_config = Config()
    with open(config_fullfile) as f:
       data_conf = json.load(f)
    global_config.set_data_from_json(data_conf)
    global_config.n_samples_trimmed_trace

    mult_pos = get_multiples(global_config)
    noise_threshold = get_noise_threshold(global_config)

    feature_df = pd.read_csv(feature_fullfile)
    axial_file_path = os.path.join(args.data_path,'axial.npy')
    tangential_file_path = os.path.join(args.data_path,'tangential.npy')
    radial_file_path = os.path.join(args.data_path,'radial.npy')
    ts_file_path = os.path.join(args.data_path,'ts.npy')

    axial = np.load(axial_file_path)
    tangential = np.load(tangential_file_path)
    radial = np.load(radial_file_path)
    ts = np.load(ts_file_path)
    #pdb.set_trace()
    start_ts = ts[0]
    end_ts = ts[-1]

    ax_lim = get_ax_lim(feature_df)

    plot_title = get_plot_title(global_config,mwd_df)#    pdb.set_trace()


    bph_string = global_config.mine_name + "\nRig:" + global_config.rig_id + " From:" + datetime.utcfromtimestamp(start_ts).strftime('%Y-%m-%d %H:%M:%S') + " to " + datetime.utcfromtimestamp(end_ts).strftime('%Y-%m-%d %H:%M:%S')


    if output_folder_path != False:
        qclogplot_output_path = os.path.join(output_folder_path,'time_plot.png')
    else:
        qclogplot_output_path = os.path.join(args.data_path,'time_plot.png')

    qclogplotter_time = QCLogPlotter_nomwd(axial,tangential,radial,feature_df,bph_string,qclogplot_output_path,global_config,mult_pos,start_ts,end_ts)
    qclogplotter_time.plot(save=True,show=True)


    try:
        accel_df = pd.read_csv(accel_fullfile)

        if output_folder_path is False:
            acceleration_plotter(accel_df,os.path.join(args.data_path,'Acceleration_histogram.png'),bph_string, show = True)
        else:
            output_name = os.path.join(output_folder_path,'Acceleration_histogram.png')
            acceleration_plotter(accel_df,output_name,bph_string, show = False)
    except IOError:
        print ("No accel_df found on this folder")

    if mwd_df is not None:
        print(feature_df)
        print('*********')
        print(mwd_df)
        print('*********')
        print(global_config)
        print ('')

        mwd_helper = MwdDFHelper(mwd_df,
                               start_time_column=start_time_column,
                               end_time_column=end_time_column,
                               #end_depth_column=end_depth_column,
                               bench_column=bench_column,
                               pattern_column=pattern_column,
                               hole_column=hole_column,
                               collar_elevation_column=collar_elevation_column,
                               computed_elevation_column=computed_elevation_column,
                               rig_id_column=rig_id_column,
                               mse_column=mse_column,
                               rop_column=rop_column,
                               tob_column=tob_column,
                               wob_column=wob_column,
                               easting_column=easting_column,
                               northing_column=northing_column,
                               mwd_map=mwd_map)
        mwd_df[mwd_helper.start_time_column_name] = pd.to_datetime(mwd_df[mwd_helper.start_time_column_name])
        mwd_df[mwd_helper.end_time_column_name] = pd.to_datetime(mwd_df[mwd_helper.end_time_column_name])
        #mwd_df.parse_dates=[mwd_helper.start_time_column_name, mwd_helper.end_time_column_name]


        qclogplotter_depth = QCLogPlotterv2(axial,tangential,radial,mwd_helper,mwd_df,feature_df,bph_string,os.path.join(args.data_path,'depth_plot.png'),global_config,mult_pos)
        qclogplotter_depth.plot(show=True)

        output_filename = get_output_file_name(mwd_df,global_config)
        if output_folder_path != False:
            output_filename = os.path.join(output_folder_path,'depth_plot_v2.png')
        else:
            output_filename = os.path.join(args.data_path,'depth_plot_v2.png')
        qclogplotter_depth_v2 = QCLogPlotterv3(axial,tangential,radial,mwd_helper,mwd_df,feature_df,plot_title,os.path.join(args.data_path,output_filename),global_config,ax_lim,noise_threshold,mult_pos)
        qclogplotter_depth_v2.plot(show=True)
        #qclogplotter_time = QCLogPlotterv2(axial,tangential,radial,mwd_helper,mwd_df,feature_df,bph_string,os.path.join(args.data_path,'time_plot.png'),global_config,plot_by_depth=False)
        #qclogplotter_time.plot(show=True)


        print("ok, now make the qc plot")

if __name__ == "__main__":
    main()
