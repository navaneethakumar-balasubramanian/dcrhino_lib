import numpy as np
import pandas as pd
import h5py
import matplotlib.pyplot as plt
import os
import argparse
import calendar
import pdb
import time
from datetime import datetime
from dcrhino3.models.config import Config
from dcrhino3.acquisition.config_file_utilities import extract_metadata_from_h5_file
from dcrhino3.helpers.general_helper_functions import init_logging, interpolate_data, calibrate_data
from dcrhino3.models.traces.raw_trace import RawTraceData
from test_spectral_qc_plot import make_spectral_qc_plot
from dcrhino3.helpers.h5_helper import H5Helper

def main(args):
    debug = False
    if debug:
        save_raw = False
        save_csv = False
        save_numpy = False
    else:
        save_raw = False
        save_csv = False
        save_numpy = False

    raw = False

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
    h5_helper = H5Helper(h5py.File(fname))

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
    # print (hf.keys())

    # IDE File
    # sensitivity = [1000000.0]
    # file_axis = [1,2]

    # Rhino File
    # sensitivity = [2.5,2.5,2.5]#500g
    # sensitivity = [12.5,12.5,12.5]#500g
    # file_axis = [2,1]

    print(sensitivity)
    print(file_axis)
    if start_time == 0:
        start_time = ts[0]
    else:
        start_time = ts[ts >= start_time][0]

    if end_time == 0:
        end_time = int(ts[-1])+1

    # pdb.set_trace()

    # seq = np.asarray(hf.get('seq'), dtype=np.uint32)
    tx_sequence = np.asarray(hf.get('cticks'), dtype=np.uint32)


    # sequence_diff = np.diff(tx_sequence)
    # missed_samples = sequence_diff[sequence_diff > 1]-1
    # fig = plt.figure("DataCloud Rhino Missed Samples", figsize=(10, 5))
    # plt.hist(missed_samples, bins="sqrt")
    # plt.title("Distribution of Missed Samples")
    #
    # fig.savefig(fname.replace(".h5","_missed_samples.png"))
    #
    # missed_samples_indices = np.where(sequence_diff > 1)
    # good_samples_in_a_row = np.diff(missed_samples_indices[0])
    # fig = plt.figure("DataCloud Rhino Good Samples in a row Samples", figsize=(10, 5))
    # bins = np.arange(5, 1001, 5)
    # plt.hist(good_samples_in_a_row,bins=bins)
    # plt.title("Distribution of good samples in a row")
    # fig.savefig(fname.replace(".h5", "_good_samples_in_a_row.png"))

    # performance_df = pd.DataFrame(columns=["ts", "good", "missed"])
    # performance_df["ts"] = ts[1:]
    # performance_df["good"] = good_samples_in_a_row
    # performance_df["missed"] = missed_samples

    print("Applying calibration")

    global_config = Config(metadata)
    accelerometer_max_voltage = float(global_config.accelerometer_max_voltage)
    rhino_version = global_config.rhino_version

    if len(sensitivity) > 1:
        is_ide_file = False
    else:
        is_ide_file = True

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
        x_data = calibrate_data(np.asarray(hf.get('x'), dtype=np.float32), sensitivity[0], is_ide_file)
        y_data = calibrate_data(np.asarray(hf.get('y'), dtype=np.float32), sensitivity[0], is_ide_file)
        z_data = calibrate_data(np.asarray(hf.get('z'), dtype=np.float32), sensitivity[0], is_ide_file)
    else:
        print("Rhino file")
        x_data = calibrate_data(np.asarray(hf.get('x'), dtype=np.uint32), sensitivity[0], accelerometer_max_voltage,
                                rhino_version)
        y_data = calibrate_data(np.asarray(hf.get('y'), dtype=np.uint32), sensitivity[1], accelerometer_max_voltage,
                                rhino_version)
        z_data = calibrate_data(np.asarray(hf.get('z'), dtype=np.uint32), sensitivity[2], accelerometer_max_voltage,
                                rhino_version)

    # pdb.set_trace()
    output_path = os.path.dirname(fname)

    if save_raw:
        print("Saving Raw Data")
        cols = ["raw_ts", "adc_x", "adc_y", "adc_z", "cal_x", "cal_y", "cal_z", "tx_sequence"]
        d = {cols[0]: ts, cols[1]: np.asarray(hf.get('x'), dtype=np.float32), cols[2]: np.asarray(hf.get('y'),
                                                                                                  dtype=np.float32),
             cols[3]: np.asarray(hf.get('z'), dtype=np.float32), cols[4]: x_data, cols[5]: y_data, cols[6]: z_data,
             cols[7]: tx_sequence}
        output_data = pd.DataFrame(data=d)
        output_data = output_data[cols]
        csv_path = os.path.join(output_path, original_name + "_raw.csv".format(output_sampling_rate))
        output_data.to_csv(csv_path, index=False)

    hf.close()

    print("Generating FFT")
    # raw_trace = RawTraceData()
    # raw_trace.load_from_h5(fname)
    # fft_dict = raw_trace.raw_trace_fft(global_config, sensitivity[0])
    # fft_fig = plt.figure("FFT")
    # traces = list()
    # for index, key in enumerate(fft_dict["axial"].keys()):
    #     x = fft_dict["axial"][key]["frequency"]
    #     y = fft_dict["axial"][key]["content"]
    #     cal = fft_dict["axial"][key]["calibrated"]
    #     # plt.specgram(traces, NFFT=1024, Fs=global_config.output_sampling_rate, noverlap=900)
    #     #plt.plot(x, y)
    #     plt.specgram(cal, Fs=global_config.output_sampling_rate)
    # plt.show()
    spectrum = make_spectral_qc_plot(h5_helper, ide_file=is_ide_file)



    total_seconds = end_time - int(start_time)

    ideal_timestamps = (np.arange(total_seconds*output_sampling_rate)*1.0/output_sampling_rate)+start_time
    ideal_timestamps = ideal_timestamps[ideal_timestamps <= end_time]
    # ideal_timestamps = (np.arange(total_seconds * output_sampling_rate) * 1.0 / output_sampling_rate) + start_time
    index = (ts >= start_time) & (ts < end_time)
    digitizer_timestamps = ts[index]



    time_filtered_data = list()
    time_filtered_data.append(x_data[index])
    time_filtered_data.append(y_data[index])
    time_filtered_data.append(z_data[index])
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

    axial_path = os.path.join(output_path, "axial", output_name+"_axial_{}_{}.npy".format(axis[axial_axis_index],
                                                                                         output_sampling_rate))
    tangential_path = os.path.join(output_path, "tangential",
                                   output_name+"_tangential_{}_{}.npy".format(axis[tangential_axis_index],
                                                                              output_sampling_rate))
    radial_path = os.path.join(output_path, "radial", output_name+"_radial_{}_{}.npy".format(axis[radial_axis_index],
                                                                                            output_sampling_rate))



    interp_data=[]
    #time_filtered_interp_x_data = interpolate_data(ideal_timestamps,digitizer_timestamps,time_filtered_x_raw_data)
    #time_filtered_interp_y_data = interpolate_data(ideal_timestamps,digitizer_timestamps,time_filtered_y_raw_data)
    #time_filtered_interp_z_data = interpolate_data(ideal_timestamps,digitizer_timestamps,time_filtered_z_raw_data)
    print("interpolating")
    kind = "linear"
    interp_data.append(interpolate_data(digitizer_timestamps, time_filtered_data[0], ideal_timestamps, kind=kind))#X
    # data
    interp_data.append(interpolate_data(digitizer_timestamps, time_filtered_data[1], ideal_timestamps, kind=kind))#Y data
    interp_data.append(interpolate_data(digitizer_timestamps, time_filtered_data[2], ideal_timestamps, kind=kind))#Z data

    if save_numpy:
        print("Saving Files")
        if not os.path.exists(os.path.dirname(axial_path)):
            os.mkdir(os.path.dirname(axial_path))
        if not os.path.exists(os.path.dirname(tangential_path)):
            os.mkdir(os.path.dirname(tangential_path))
        if not os.path.exists(os.path.dirname(radial_path)):
            os.mkdir(os.path.dirname(radial_path))
        np.save(axial_path, interp_data[file_axis[0]-1])
        np.save(tangential_path, interp_data[file_axis[1]-1])
        np.save(radial_path, interp_data[5-file_axis[0]-file_axis[1]])


    if save_csv:
        print("Creating CSV File")

        datetimes = [datetime.strftime(datetime.utcfromtimestamp(x), "%Y-%m-%d %H:%M:%S.%f") for x in ideal_timestamps]
        cols = ["Ideal_Timestamps", "DateTimes", "Axial_{}".format(axis[axial_axis_index]), "Tangential_{}".format(
            axis[tangential_axis_index]), "Radial_{}".format(axis[radial_axis_index])]
        d = {cols[0]: ideal_timestamps, cols[1]: datetimes, cols[2]: interp_data[axial_axis_index],
             cols[3]: interp_data[tangential_axis_index], cols[4]: interp_data[radial_axis_index]}
        output_data = pd.DataFrame(data=d)
        output_data = output_data[cols]
        csv_path = os.path.join(output_path, original_name+"_{}_interpolated_{}.csv".format(kind,
            output_sampling_rate))
        output_data.to_csv(csv_path, index=False)

    t1 = datetime.now()
    fig = plt.figure("DataCloud Rhino Raw Data Playback", figsize=(10, 5))
    plt.subplots_adjust(hspace=0.5)
    # ax.ticklabel_format(useOffset=False, style='plain')
    #plt.figure(1)

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

    axis_font = {'fontname': 'Arial', 'size': '8'}

    axial_plot = plt.subplot2grid((3, 1), (0, 0), colspan=1)
    axial_plot.ticklabel_format(useOffset=False, style='plain')
    axial_plot.set_title("Axial Component", **axis_font)
    # axial_plot.set_xlabel("Time (UTC)", **axis_font)
    axial_plot.set_ylabel("g", **axis_font)
    axial_plot.tick_params(axis='x',          # changes apply to the x-axis
                           which='both',      # both major and minor ticks are affected
                           top=False,         # ticks along the top edge are off
                           labelbottom=False)

    # plt.plot([datetime.utcfromtimestamp(x) for x in digitizer_timestamps],time_filtered_data[file_axis[0]-1],'k')
    # plt.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps],interp_data[file_axis[0]-1],'r')

    if raw:
        axial_plot.plot([datetime.utcfromtimestamp(x) for x in digitizer_timestamps],time_filtered_data[
            axial_axis_index], 'b')
    else:
        axial_plot.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps], interp_data[axial_axis_index], 'r')


    if not debug:
        tangential_plot = plt.subplot2grid((3, 1), (1, 0), colspan=1, sharex=axial_plot)
        # tangential_plot.ticklabel_format(useOffset=False, style='plain')
        tangential_plot.set_title("Tangential Component", **axis_font)
        # tangential_plot.set_xlabel("Time (UTC)", **axis_font)
        tangential_plot.set_ylabel("g", **axis_font)
        tangential_plot.tick_params(axis='x',  # changes apply to the x-axis
                                    which='both',  # both major and minor ticks are affected
                                    top=False,  # ticks along the top edge are off
                                    labelbottom=False)

        radial_plot = plt.subplot2grid((3, 1), (2, 0), colspan=1, sharex=axial_plot)
        radial_plot.set_title("Radial Component", **axis_font)
        radial_plot.set_xlabel("Time (UTC)", **axis_font)
        radial_plot.set_ylabel("g", **axis_font)
        tangential_plot.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps], interp_data[
            tangential_axis_index], 'b')
        radial_plot.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps], interp_data[radial_axis_index], 'g')
    else:
        axial_plot.set_xlabel("Time (UTC)", **axis_font)
        axial_plot.tick_params(axis='x',  # changes apply to the x-axis
                               which='both',  # both major and minor ticks are affected
                               top=False,  # ticks along the top edge are off
                               labelbottom=True)

    if raw:
        plt.suptitle("Raw Data Playback of File {} at {} Hz Raw Data".format(os.path.basename(fname),
                                                                                     output_sampling_rate))
    else:
        plt.suptitle("Raw Data Playback of File {} at {} Hz {} interpolation".format(os.path.basename(fname),
                                                                                     output_sampling_rate, kind))

    # plt.tight_layout()
    basename = os.path.basename(fname)
    working_dir = os.path.dirname(fname)
    fig.savefig(os.path.join(working_dir, basename.replace(".h5", ".png")))
    spectrum.savefig(os.path.join(working_dir, "spectrum_{}".format(basename.replace(".h5", ".png"))))
    if args.plot:
        plt.show()

        #pdb.set_trace()
        #plt.plot(digitizer_timestamps)
        #plt.show()

    print("Finished in {}".format(t1-t0))

if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Playback Raw Data -  Copyright (c) 2018 DataCloud")
    argparser.add_argument('-st', '--start_time', help="Start timestamp to process 'YYYY-MM-DD HH:MM:SS' in UTC Time",
                           default=None)
    argparser.add_argument('-et', '--end_time', help="End timestamp to process 'YYYY-MM-DD HH:MM:SS' in UTC Time",
                           default=None)
    argparser.add_argument('-sr', '--sampling_rate', help="Resampling Rate for Output Data", default=None)
    argparser.add_argument('-source', '--source_path', help="Path to source file", default=None)
    argparser.add_argument('-plot', '--plot', help="Show plot for axial axis", default=False)

    args = argparser.parse_args()

    main(args)

    #main()
