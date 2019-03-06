import numpy as np
import pandas as pd
import h5py
import matplotlib.pyplot as plt
import ConfigParser
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
import os
import argparse
import calendar
import pdb
import time
from datetime import datetime
from scipy.signal import butter, filtfilt
from dcrhino3.models.metadata import Metadata
from dcrhino.process_pipeline.trace_processing import TraceProcessing
from dcrhino3.models.config import Config
from dcrhino3.acquisition.config_file_utilities import extract_metadata_from_h5_file


def interpolate_data(ideal_timestamps, digitizer_timestamps, data):
    interp_data = np.interp(ideal_timestamps, digitizer_timestamps, data)
    return interp_data


def main(args):
    #pdb.set_trace()
    save_raw = False
    save_csv = False
    save_numpy = False
    t0 = datetime.now()
    if args.sampling_rate is None:
        print("NEED A RESAMPLE RATE")
        return
    else:
        output_sampling_rate = int(args.sampling_rate)

    if args.start_time is None:
        start_time = 0
    else:
        start_time = calendar.timegm(datetime.strptime(args.start_time, '%Y-%m-%d %H:%M:%S').utctimetuple())

    if args.end_time is None:
        end_time = 0
    else:
        end_time = calendar.timegm(datetime.strptime(args.end_time, '%Y-%m-%d %H:%M:%S').utctimetuple())

    fname = args.source_path
    original_name = fname.split(".")[0]

    axis = ["X", "Y", "Z"]

    print("Reading File")
    hf = h5py.File(fname, 'r')

    print("Extracting Metadata")
    metadata = extract_metadata_from_h5_file(hf)
    ts = np.asarray(hf.get('ts'), dtype=np.float64)
    sensitivity = np.asarray(hf.get('sensitivity'), dtype=np.float64)
    print (hf.get('axis'))
    if hf.get('axis') is None:
        print ("NO AXIS ON METADATA ASSUMING IT'S AN IDE FILE")
        file_axis = [1, 2]
    else:
        file_axis = np.asarray(hf.get('axis'), dtype=np.int32)
    #print (hf.keys())

    #IDE File
    #sensitivity = [1000000.0]
    #file_axis = [1,2]

    #Rhino File
    #sensitivity = [2.5,2.5,2.5]#500g
    #sensitivity = [12.5,12.5,12.5]#500g
    #file_axis = [2,1]

    print(sensitivity)
    print(file_axis)
    if start_time == 0:
        start_time = int(ts[0])

    if end_time == 0:
        end_time = int(ts[-1])+1

    #pdb.set_trace()

    seq = np.asarray(hf.get('seq'), dtype=np.uint32)
    tx_sequence = np.asarray(hf.get('cticks'), dtype=np.uint32)


    sequence_diff = np.diff(tx_sequence)
    missed_samples = sequence_diff[sequence_diff > 1]
    plt.hist(missed_samples)
    plt.title("Distribution of Missed Samples")

    plt.show()

    missed_samples_indices = np.where(missed_samples > 1)
    good_samples_in_a_row = np.insert(np.diff(missed_samples_indices)-1, 0, missed_samples_indices[0][0])
    plt.hist(good_samples_in_a_row)
    plt.title("Distribution of good samples in a row")
    plt.show()

    # performance_df = pd.DataFrame(columns=["ts", "good", "missed"])
    # performance_df["ts"] = ts[1:]
    # performance_df["good"] = good_samples_in_a_row
    # performance_df["missed"] = missed_samples

    pdb.set_trace()

    print("Applying calibration")

    global_config = Config(metadata)
    accelerometer_max_voltage = float(global_config.accelerometer_max_voltage)
    rhino_version = global_config.rhino_version

    if len(sensitivity)>1:
        is_ide_file = False
    else:
        is_ide_file = True
    trace_processor = TraceProcessing(global_config, is_ide_file,accelerometer_max_voltage,rhino_version)

    if is_ide_file:
        # x_sensitivity = sensitivity[0]
        # y_sensitivity = sensitivity[1]
        # z_sensitivity = sensitivity[2]
        # accelerometer_max_voltage = 3.3
        # #######################################################################
        # #################TROUBLESHOOTING#######################################
        # #x_data = np.asarray(hf.get('x'),dtype=np.int32)
        # #y_data = np.asarray(hf.get('y'),dtype=np.int32)
        # #z_data = np.asarray(hf.get('z'),dtype=np.int32)
        # ########################################################################
        # x_data = ((accelerometer_max_voltage/2.0)-(np.asarray(hf.get('x'),dtype=np.int32)*5.0/65535))/(x_sensitivity/1000.0)#/1e6
        # y_data = ((accelerometer_max_voltage/2.0)-(np.asarray(hf.get('y'),dtype=np.int32)*5.0/65535))/(x_sensitivity/1000.0)#/1e6
        # z_data = ((accelerometer_max_voltage/2.0)-(np.asarray(hf.get('z'),dtype=np.int32)*5.0/65535))/(x_sensitivity/1000.0)#/1e6
        print("IDE file")
        x_data = trace_processor._apply_calibration(np.asarray(hf.get('x'),dtype=np.float32),sensitivity[0])
        y_data = trace_processor._apply_calibration(np.asarray(hf.get('y'),dtype=np.float32),sensitivity[1])
        z_data = trace_processor._apply_calibration(np.asarray(hf.get('z'),dtype=np.float32),sensitivity[2])
    else:
        # x_data = np.asarray(hf.get('x'),dtype=np.float32)#/sensitivity[0]
        # y_data = np.asarray(hf.get('y'),dtype=np.float32)#/sensitivity[0]
        # z_data = np.asarray(hf.get('z'),dtype=np.float32)#/sensitivity[0]
        print("Rhino file")
        x_data = trace_processor._apply_calibration(np.asarray(hf.get('x'),dtype=np.uint32),sensitivity[0])
        y_data = trace_processor._apply_calibration(np.asarray(hf.get('y'),dtype=np.uint32),sensitivity[0])
        z_data = trace_processor._apply_calibration(np.asarray(hf.get('z'),dtype=np.uint32),sensitivity[0])

    # pdb.set_trace()
    output_path = os.path.dirname(fname)

    if save_raw:
        print("Saving Raw Data")
        cols = ["raw_ts","adc_x","adc_y","adc_z","cal_x","cal_y","cal_z"]
        d = {cols[0]:ts,cols[1]:np.asarray(hf.get('x'),dtype=np.float32),cols[2]:np.asarray(hf.get('y'),dtype=np.float32),cols[3]:np.asarray(hf.get('z'),dtype=np.float32),
            cols[4]:x_data,cols[5]:y_data,cols[6]:z_data}
        output_data = pd.DataFrame(data=d)
        output_data = output_data[cols]
        csv_path = os.path.join(output_path,original_name+"_raw.csv".format(output_sampling_rate))
        output_data.to_csv(csv_path,index=False)

    hf.close()

    total_seconds = end_time - start_time

    ideal_timestamps = (np.arange(total_seconds*output_sampling_rate)*1.0/output_sampling_rate)+start_time
    index = (ts>=start_time) & (ts<end_time)
    digitizer_timestamps = ts[index]



    time_filtered_data = []
    time_filtered_data.append( x_data[index])
    time_filtered_data.append( y_data[index])
    time_filtered_data.append( z_data[index])
    #time_filtered_x_raw_data=time_filtered_x_raw_data[time_filtered_x_raw_data < end_time]



    #output_name = os.path.basename(fname).split(".")[0]
    unix_start = start_time
    unix_end = end_time
    unix_start = int(np.round(unix_start))
    unix_end = int(np.round(unix_end))
    timetup = time.gmtime(unix_start)
    start_string = time.strftime('%Y%m%dT%H%M%S', timetup)
    timetup = time.gmtime(unix_end)
    end_string = time.strftime('%Y%m%dT%H%M%S', timetup)

    output_name = start_string + "-" + end_string

    #pdb.set_trace()

    axial_axis_index = file_axis[0]-1
    tangential_axis_index = file_axis[1]-1
    radial_axis_index = 3-axial_axis_index-tangential_axis_index

    axial_path = os.path.join(output_path,"axial",output_name+"_axial_{}_{}.npy".format(axis[axial_axis_index],output_sampling_rate))
    tangential_path = os.path.join(output_path,"tangential",output_name+"_tangential_{}_{}.npy".format(axis[tangential_axis_index],output_sampling_rate))
    radial_path = os.path.join(output_path,"radial",output_name+"_radial_{}_{}.npy".format(axis[radial_axis_index],output_sampling_rate))



    interp_data=[]
    #time_filtered_interp_x_data = interpolate_data(ideal_timestamps,digitizer_timestamps,time_filtered_x_raw_data)
    #time_filtered_interp_y_data = interpolate_data(ideal_timestamps,digitizer_timestamps,time_filtered_y_raw_data)
    #time_filtered_interp_z_data = interpolate_data(ideal_timestamps,digitizer_timestamps,time_filtered_z_raw_data)
    print("interpolating")
    interp_data.append(interpolate_data(ideal_timestamps,digitizer_timestamps,time_filtered_data[0]))#X data
    interp_data.append(interpolate_data(ideal_timestamps,digitizer_timestamps,time_filtered_data[1]))#Y data
    interp_data.append(interpolate_data(ideal_timestamps,digitizer_timestamps,time_filtered_data[2]))#Z data

    if save_numpy:
        print("Saving Files")
        if not os.path.exists(os.path.dirname(axial_path)):
            os.mkdir(os.path.dirname(axial_path))
        if not os.path.exists(os.path.dirname(tangential_path)):
            os.mkdir(os.path.dirname(tangential_path))
        if not os.path.exists(os.path.dirname(radial_path)):
            os.mkdir(os.path.dirname(radial_path))
        np.save(axial_path,interp_data[file_axis[0]-1])
        np.save(tangential_path,interp_data[file_axis[1]-1])
        np.save(radial_path,interp_data[5-file_axis[0]-file_axis[1]])


    if save_csv:
        print("Creating CSV File")

        datetimes = [datetime.strftime(datetime.utcfromtimestamp(x),"%Y-%m-%d %H:%M:%S.%f") for x in ideal_timestamps]
        cols = ["Ideal_Timestamps","DateTimes","Axial_{}".format(axis[axial_axis_index]),"Tangential_{}".format(axis[tangential_axis_index]),"Radial_{}".format(axis[radial_axis_index])]
        d = {cols[0]:ideal_timestamps,cols[1]:datetimes,cols[2]:interp_data[axial_axis_index],cols[3]:interp_data[tangential_axis_index],cols[4]:interp_data[radial_axis_index]}
        output_data = pd.DataFrame(data=d)
        output_data = output_data[cols]
        csv_path = os.path.join(output_path,original_name+"_resampled_{}.csv".format(output_sampling_rate))
        output_data.to_csv(csv_path,index=False)

    t1 = datetime.now()
    fig = plt.figure("DataCloud Rhino Raw Data Playback",figsize=(10,5))
    plt.subplots_adjust(hspace=0.5)
    # ax.ticklabel_format(useOffset=False, style='plain')
    plt.figure(1)

    #######################################################################
    #################TROUBLESHOOTING#######################################
    #x_high_pass_filtered_data = butter_highpass_filter(x_data,10,2800)
    #y_high_pass_filtered_data = butter_highpass_filter(y_data,10,2800)
    #z_high_pass_filtered_data = butter_highpass_filter(z_data,10,2800)
    #ax.plot(ticks,y_high_pass_filtered_data)
    #plt.xlabel("Clock Ticks")
    #plt.ylabel("ADC Counts")
    #plt.title("Rhino with 500g Accelerometer 10Hz high pass filter Y Axis")
    #rd = [seq,ticks,x_data,y_data,z_data]
    #import pandas
    #df = pandas.DataFrame(data={"seq": rd[0], "ticks": rd[1],"x":rd[2],"y":rd[3],"z":rd[4]})
    #df.to_csv("./data_for_jim.csv", sep=',',index=False)
    ########################################################################

    axis_font = {'fontname':'Arial', 'size':'8'}

    axial_plot = plt.subplot2grid((3, 1), (0, 0),colspan=1)
    axial_plot.ticklabel_format(useOffset=False, style='plain')
    axial_plot.set_title("Axial Component", **axis_font)
    # axial_plot.set_xlabel("Time (UTC)", **axis_font)
    axial_plot.set_ylabel("g", **axis_font)
    axial_plot.tick_params(axis='x',          # changes apply to the x-axis
                            which='both',      # both major and minor ticks are affected
                            top=False,         # ticks along the top edge are off
                            labelbottom=False)

    tangential_plot = plt.subplot2grid((3, 1), (1, 0),colspan=1,sharex=axial_plot)
    # tangential_plot.ticklabel_format(useOffset=False, style='plain')
    tangential_plot.set_title("Tangential Component",**axis_font)
    # tangential_plot.set_xlabel("Time (UTC)", **axis_font)
    tangential_plot.set_ylabel("g", **axis_font)
    tangential_plot.tick_params(axis='x',          # changes apply to the x-axis
                            which='both',      # both major and minor ticks are affected
                            top=False,         # ticks along the top edge are off
                            labelbottom=False)

    radial_plot = plt.subplot2grid((3, 1), (2, 0),colspan=1,sharex=axial_plot)
    radial_plot.set_title("Radial Component", **axis_font)
    radial_plot.set_xlabel("Time (UTC)", **axis_font)
    radial_plot.set_ylabel("g", **axis_font)

    # plt.plot([datetime.utcfromtimestamp(x) for x in digitizer_timestamps],time_filtered_data[file_axis[0]-1],'k')
    # plt.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps],interp_data[file_axis[0]-1],'r')

    axial_plot.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps],interp_data[axial_axis_index],'r')
    tangential_plot.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps],interp_data[tangential_axis_index],'b')
    radial_plot.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps],interp_data[radial_axis_index],'g')

    plt.suptitle("Raw Data Playback of File {} at {} Hz".format(os.path.basename(fname),output_sampling_rate))

    # plt.tight_layout()
    fig.savefig(fname.replace(".h5",".png"))
    if args.plot:
        plt.show()

        #pdb.set_trace()
        #plt.plot(digitizer_timestamps)
        #plt.show()

    print("Finished in {}".format(t1-t0))

if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Playback Raw Data -  Copyright (c) 2018 DataCloud")
    argparser.add_argument('-st', '--start_time', help="Start timestamp to process 'YYYY-MM-DD HH:MM:SS' in UTC Time", default=None)
    argparser.add_argument('-et', '--end_time', help="End timestamp to process 'YYYY-MM-DD HH:MM:SS' in UTC Time", default=None)
    argparser.add_argument('-sr', '--sampling_rate', help="Resampling Rate for Output Data", default=None)
    argparser.add_argument('-source','--source_path',help="Path to source file",default=None)
    argparser.add_argument('-plot','--plot',help="Show plot for axial axis",default=False)

    args = argparser.parse_args()

    main(args)

    #main()
