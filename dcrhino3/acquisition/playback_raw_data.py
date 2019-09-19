import argparse
import calendar
import h5py
import json
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import os
import pdb
import scipy.signal as ssig
import shutil
import time

from datetime import datetime

from dcrhino3.acquisition.supporting_acquisition import calibrate_data
from dcrhino3.helpers.general_helper_functions import init_logging, init_logging_to_file
from dcrhino3.signal_processing.interpolation import interpolate_data
from dcrhino3.models.config2 import Config
from dcrhino3.acquisition.test_spectral_qc_plot import make_spectral_qc_plot
from dcrhino3.helpers.h5_helper import H5Helper

logger = init_logging(__name__)
file_logger = init_logging_to_file(__name__)



def main(args):
    debug = args.debug == "True"
    repeat = args.repeat_file

    if debug:
        print("Starting in Debug Mode")
        save_raw = False
        save_csv = False
        save_numpy = False
        show_plots = True
        make_spectrum = True
    else:
        print("Starting in Regular Mode")
        save_raw = args.save_raw == "True"
        save_csv = args.save_csv == "True"
        save_numpy = args.save_numpy == "True"
        # save_raw = True
        # save_csv = True
        # save_numpy = False
        show_plots = args.plot == "True"
        # show_plots = True
        make_spectrum = args.spectrum
        # make_spectrum = True

    raw = args.raw == "True"
    # raw = True

    kind = args.kind
    remove_mean = args.remove_mean == "True"
    # remove_mean = False

    time_offset = float(args.time_offset)

    t0 = datetime.now()

    fname = args.source_path
    original_name = fname.split(".")[0]

    if time_offset != 0:
        copy_name = original_name + "_time_offset_{}.h5".format(time_offset)
        shutil.copyfile(fname, copy_name)
    else:
        copy_name = fname

    axis = ["X", "Y", "Z"]

    print("Reading File")
    hf = h5py.File(copy_name)
    h5_helper = H5Helper(hf, load_xyz=False)
    if time_offset != 0:
        h5_helper.shift_time(time_offset)

    ts = h5_helper.ts

    if args.start_time is None:
        start_time = 0
    else:
        start_time = calendar.timegm(datetime.strptime(args.start_time, '%Y-%m-%d %H:%M:%S').utctimetuple())

    if args.end_time is None:
        end_time = 0
    else:
        end_time = calendar.timegm(datetime.strptime(args.end_time, '%Y-%m-%d %H:%M:%S').utctimetuple())

    if start_time == 0:
        start_time = ts[0]
    else:
        start_time = ts[ts >= start_time][0]

    if end_time == 0:
        end_time = int(ts[-1]) + 1

    from_dt = datetime.utcfromtimestamp(start_time)
    to_dt = datetime.utcfromtimestamp(end_time)

    time_indices = (ts >= start_time) & (ts < end_time)
    ts = pd.DataFrame(h5_helper.load_axis_mask("ts", time_indices), columns=["ts"])
    ts.drop_duplicates("ts", inplace=True)
    ts.sort_values("ts", inplace=True)
    bad_indices = np.where(np.diff(ts.index) != 1)[0]
    if len(bad_indices) > 0:
        print("Droping {} Bad Indices".format(len(bad_indices)))
        ts.drop(bad_indices, inplace=True)
        time_indices = (ts.ts >= start_time) & (ts.ts < end_time)

    print("Loading Raw Data")
    try:
        x_raw = h5_helper.load_axis_mask("x", time_indices)
        y_raw = h5_helper.load_axis_mask("y", time_indices)
        z_raw = h5_helper.load_axis_mask("z", time_indices)
    except:
        logger.warning("File has _data in the column names")
        x_raw = h5_helper.load_axis_mask("x_data", time_indices)
        y_raw = h5_helper.load_axis_mask("y_data", time_indices)
        z_raw = h5_helper.load_axis_mask("z_data", time_indices)
    print("Extracting Metadata")
    # pdb.set_trace()
    config = Config()
    try:
        config = h5_helper.extract_global_config_from_h5()
    except:
        json_data_for_config = json.loads(h5_helper.extract_metadata_from_h5_file_as_json())
        config.set_data_from_json(json_data_for_config)
    sensitivity = np.asarray(hf.get('sensitivity'), dtype=np.float32)
    print(hf.get('axis'))
    if hf.get('axis') is None:
        print("NO AXIS ON METADATA ASSUMING IT'S AN IDE FILE")
        file_axis = [1, 2]
    else:
        file_axis = np.asarray(hf.get('axis'), dtype=np.int32)

    if args.sampling_rate is None:
        output_sampling_rate = int(config.output_sampling_rate)
        print("Using metadata sampling rate of {}".format(output_sampling_rate))
    else:
        output_sampling_rate = int(args.sampling_rate)

    print(sensitivity)
    print(file_axis)

    try:
        tx_sequence = h5_helper.load_axis_mask("cticks", time_indices)
    except:
        logger.warning("File has ticks in the column names instead of cticks")
        tx_sequence = h5_helper.load_axis_mask("ticks", time_indices)

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
    # pdb.set_trace()
    accelerometer_max_voltage = float(config.accelerometer_max_voltage)
    rhino_version = float(config.rhino_version)

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
        x_data = calibrate_data(x_raw, sensitivity[0], is_ide_file, remove_mean=remove_mean)
        y_data = calibrate_data(y_raw, sensitivity[0], is_ide_file, remove_mean=remove_mean)
        z_data = calibrate_data(z_raw, sensitivity[0], is_ide_file, remove_mean=remove_mean)
    else:
        print("Rhino file")
        # import pdb
        # pdb.set_trace()
        x_data = calibrate_data(x_raw, sensitivity[0], accelerometer_max_voltage,
                                rhino_version, remove_mean=remove_mean)
        y_data = calibrate_data(y_raw, sensitivity[1], accelerometer_max_voltage,
                                rhino_version, remove_mean=remove_mean)
        z_data = calibrate_data(z_raw, sensitivity[2], accelerometer_max_voltage,
                                rhino_version, remove_mean=remove_mean)

    # pdb.set_trace()
    output_path = os.path.dirname(fname)

    if save_raw:
        print("Saving Raw Data")
        cols = ["raw_ts", "adc_x", "adc_y", "adc_z", "cal_x", "cal_y", "cal_z", "tx_sequence"]
        d = {cols[0]: ts.ts, cols[1]: x_raw, cols[2]: y_raw,
             cols[3]: z_raw, cols[4]: x_data, cols[5]: y_data, cols[6]: z_data,
             cols[7]: tx_sequence}
        output_data = pd.DataFrame(data=d)
        output_data = output_data[cols]
        csv_path = os.path.join(output_path,
                                original_name + "_raw_from_{}_to_{}_time_offset_{}.csv".format(from_dt,
                                                                                               to_dt,
                                                                                               time_offset))
        csv_path = csv_path.replace(" ", "_")
        output_data.to_csv(csv_path, index=False)

    if make_spectrum:
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
        spectrum = make_spectral_qc_plot(h5_helper, ide_file=is_ide_file, mask=time_indices)

    hf.close()
    total_seconds = end_time - int(start_time)

    ideal_timestamps = (np.arange(total_seconds*output_sampling_rate)*1.0/output_sampling_rate)+start_time
    ideal_timestamps = ideal_timestamps[ideal_timestamps <= end_time]
    ideal_timestamps = np.round(ideal_timestamps, 6)
    # ideal_timestamps = (np.arange(total_seconds * output_sampling_rate) * 1.0 / output_sampling_rate) + start_time

    digitizer_timestamps = ts.ts

    time_filtered_data = list()
    time_filtered_data.append(x_data)
    time_filtered_data.append(y_data)
    time_filtered_data.append(z_data)
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
    print("interpolating using {} method".format(kind))
    interp_data.append(interpolate_data(digitizer_timestamps, time_filtered_data[0], ideal_timestamps, kind=kind))#X
    # data
    interp_data.append(interpolate_data(digitizer_timestamps, time_filtered_data[1], ideal_timestamps, kind=kind))#Y data
    interp_data.append(interpolate_data(digitizer_timestamps, time_filtered_data[2], ideal_timestamps, kind=kind))#Z data

    if save_numpy:
        print("Saving Numpy Files")
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
        csv_path = os.path.join(output_path,
                                original_name+"_{}_interpolated_{}_from_{}_to_{}_time_offset_{}.csv".format(kind,
                                                                                                         output_sampling_rate,
                                                                                                         from_dt,
                                                                                                         to_dt,
                                                                                                         time_offset))
        csv_path = csv_path.replace(" ", "_")
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
    if debug:
        axial_plot.plot(digitizer_timestamps, time_filtered_data[axial_axis_index], 'b', label="raw")
        axial_plot.plot(ideal_timestamps, interp_data[axial_axis_index], 'r',label=kind)
        # print(axial_plot.get_xticklabels())
        # axial_plot.plot([datetime.utcfromtimestamp(x) for x in digitizer_timestamps], time_filtered_data[
        #     axial_axis_index], 'b', label="raw")
        # axial_plot.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps], interp_data[axial_axis_index], 'r',
        #                 label=kind)
        ts_plot = plt.subplot2grid((3, 1), (1, 0), colspan=1, sharex=axial_plot)
        ts_plot.plot(digitizer_timestamps, np.arange(len(digitizer_timestamps)))

        ts_diff_plot = plt.subplot2grid((3, 1), (2, 0), colspan=1, sharex=axial_plot)
        ts_diff_plot.plot(digitizer_timestamps[1:], np.diff(digitizer_timestamps))
    elif not debug and raw:
        axial_plot.plot([datetime.utcfromtimestamp(x) for x in digitizer_timestamps], time_filtered_data[
            axial_axis_index], 'b',label="raw")
        axial_plot.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps], interp_data[axial_axis_index], 'r',
                        label=kind)
    else:
        axial_plot.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps], interp_data[axial_axis_index], 'r',
                        label=kind)
    ax2 = axial_plot.twiny()
    ax2.set_xticklabels([datetime.utcfromtimestamp(float(x)) for x in axial_plot.get_xticklabels()])
    axial_plot.legend()
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
            tangential_axis_index], 'b', label=kind)
        radial_plot.plot([datetime.utcfromtimestamp(x) for x in ideal_timestamps], interp_data[radial_axis_index],
                         'g', label=kind)
        tangential_plot.legend()
        radial_plot.legend()
    else:
        axial_plot.set_xlabel("Time (UTC)", **axis_font)
        axial_plot.tick_params(axis='x',  # changes apply to the x-axis
                               which='both',  # both major and minor ticks are affected
                               top=False,  # ticks along the top edge are off
                               labelbottom=True)

    if raw:
        plt.suptitle("Raw Data Playback of File {} at {} Hz Raw Data Time Offset {}".format(os.path.basename(fname),
                                                                                            output_sampling_rate,
                                                                                            time_offset))
    else:
        plt.suptitle("Raw Data Playback of File {} at {} Hz {} interpolation Time Offset {}".format(os.path.basename(
            fname), output_sampling_rate, kind, time_offset))

    # plt.tight_layout()
    basename = os.path.basename(fname)
    working_dir = os.path.dirname(fname)
    png_path = os.path.join(working_dir,
                            basename.replace(".h5",
                                             "_{}_interpolated_from_{}_to_{}_time_offset_{}.png".format(kind, from_dt,
                                                                                                        to_dt,
                                                                                                        time_offset)))
    png_path = png_path.replace(" ", "_")
    fig.savefig(png_path)
    if make_spectrum:
        spectrum.savefig(os.path.join(working_dir,
                                      "spectrum_{}".format(basename.replace(".h5",
                                                                            "_time_offset_{}.png".format(time_offset)))))

    if repeat is not None:
        rh5f = h5py.File(repeat, "r")
        rh5_helper = H5Helper(rh5f)
        r_config = Config()
        r_config.set_data_from_json(json.loads(rh5_helper.extract_metadata_from_h5_file_as_json()))
        r_rhino_version = float(r_config.rhino_version)
        r_accelerometer_max_voltage = float(r_config.accelerometer_max_voltage)
        rsensitivity = np.asarray(rh5_helper.h5f.get('sensitivity'), dtype=np.float32)
        if rh5f.get('axis') is None:
            print ("NO AXIS ON METADATA ASSUMING IT'S AN IDE FILE")
            rfile_axis = [1, 2]
        else:
            rfile_axis = np.asarray(rh5_helper.h5f.get('axis'), dtype=np.int32)
        if len(rsensitivity) > 1:
            ris_ide_file = False
        else:
            ris_ide_file = True
        rts = np.asarray(rh5_helper.ts)
        rts_indices = (rts >= start_time) & (rts < end_time)
        rts = rts[rts_indices]
        rx_raw = rh5_helper.load_axis_mask("x", rts_indices)
        ry_raw = rh5_helper.load_axis_mask("y", rts_indices)
        rz_raw = rh5_helper.load_axis_mask("z", rts_indices)
        rh5f.close()

        if ris_ide_file:
            rx_data = calibrate_data(rx_raw, rsensitivity[0], is_ide_file, remove_mean=remove_mean)
            ry_data = calibrate_data(ry_raw, rsensitivity[0], is_ide_file, remove_mean=remove_mean)
            rz_data = calibrate_data(rz_raw, rsensitivity[0], is_ide_file, remove_mean=remove_mean)
        else:
            rx_data = calibrate_data(rx_raw, rsensitivity[0], r_accelerometer_max_voltage,
                                     r_rhino_version, remove_mean=remove_mean)
            ry_data = calibrate_data(ry_raw, rsensitivity[1], r_accelerometer_max_voltage,
                                     r_rhino_version, remove_mean=remove_mean)
            rz_data = calibrate_data(rz_raw, rsensitivity[2], r_accelerometer_max_voltage,
                                     r_rhino_version, remove_mean=remove_mean)

        rfig = plt.figure("DataCloud Rhino Raw Data Repeat", figsize=(10, 5))
        plt.subplots_adjust(hspace=0.5)
        axis_font = {'fontname': 'Arial', 'size': '8'}
        time_plot = plt.subplot2grid((2, 1), (0, 0), colspan=1)
        time_plot.ticklabel_format(useOffset=False, style='plain')
        cid = rfig.canvas.mpl_connect('button_press_event', onclick)
        norm_plot = plt.subplot2grid((2, 1), (1, 0), colspan=1, sharex=time_plot)
        rax2 = time_plot.twiny()

        if rfile_axis[0] == 1:
            rdata = rx_data
        elif rfile_axis[0] == 2:
            rdata = ry_data
        else:
            rdata = rz_data

        rideal_timestamps = (np.arange(total_seconds * 4000) * 1.0 / 4000) + rts[0]
        rideal_timestamps = rideal_timestamps[rideal_timestamps <= end_time]
        rideal_timestamps = np.round(rideal_timestamps, 6)
        rdata = interpolate_data(rts, rdata, rideal_timestamps, kind=kind)

        norm = np.linalg.norm(interp_data[axial_axis_index])
        rnorm = np.linalg.norm(rdata)

        norm_data = interp_data[axial_axis_index]/norm
        rnorm_data = rdata/rnorm

        time_plot.set_title("Time Plot")
        norm_plot.set_title("Normalized Data")
        # x_ticks = [datetime.utcfromtimestamp(x) for x in rts]
        # rax2.set_xticklabels(x_ticks)
        if np.abs(norm) < np.abs(rnorm):
            time_plot.plot(rideal_timestamps, rdata, 'b', label="repeat")
            time_plot.plot(ideal_timestamps, interp_data[axial_axis_index], 'r', label="playback")
            norm_plot.plot(rideal_timestamps, rnorm_data, 'b', label="repeat")
            norm_plot.plot(ideal_timestamps, norm_data, 'r', label="playback")
        else:
            time_plot.plot(ideal_timestamps, interp_data[axial_axis_index], 'r', label="playback")
            time_plot.plot(rideal_timestamps, rdata, 'b', label="repeat")
            norm_plot.plot(ideal_timestamps, norm_data, 'r', label="playback")
            norm_plot.plot(rideal_timestamps, rnorm_data, 'b', label="repeat")
        plt.suptitle("Playback file {} with Time Offset {}\nRepeat File {}".format(fname, time_offset, repeat))
        time_plot.legend()
        norm_plot.legend()


        if ris_ide_file and not is_ide_file:
            xfig = plt.figure("DataCloud Rhino Raw Data Cross Correlation", figsize=(10, 5))
            xcorr_plot = plt.subplot2grid((1, 1), (0, 0), colspan=1)
            xcorr_plot.ticklabel_format(useOffset=False, style='plain')
            xcorr_plot.set_title("Cross Correlation", **axis_font)

            upsample_factor = 2
            upsampled_interp_norm_data = ssig.resample(norm_data, len(norm_data) * upsample_factor)
            xcorr = np.correlate(rnorm_data, upsampled_interp_norm_data, "same")
            samples = len(upsampled_interp_norm_data)
            tt = np.arange(-samples/2, samples/2)
            xcorr_plot.plot(tt, xcorr)

            # xcorr_plot.plot(upsampled_interp_norm_data, label="rhino")
            # xcorr_plot.plot(rnorm_data, label="ssx")
            xcorr_plot.legend()


    if show_plots:
        plt.show()

        #pdb.set_trace()
        #plt.plot(digitizer_timestamps)
        #plt.show()

    print("Finished in {}".format(t1-t0))

def onclick(event):
    print (event.xdata, event.ydata)

if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Playback Raw Data -  Copyright (c) 2019 DataCloud")
    argparser.add_argument('-st', '--start_time', help="Start timestamp to process 'YYYY-MM-DD HH:MM:SS' in UTC Time",
                           default=None)
    argparser.add_argument('-et', '--end_time', help="End timestamp to process 'YYYY-MM-DD HH:MM:SS' in UTC Time",
                           default=None)
    argparser.add_argument('-sr', '--sampling_rate', help="Resampling Rate for Output Data", default=None)
    argparser.add_argument('-source', '--source_path', help="Path to source file", default=None)
    argparser.add_argument('-plot', '--plot', help="Show plot for axial axis", default=True)
    argparser.add_argument('-kind', '--kind', help="Interpolation Method", choices=["linear", "quadratic"],
                           default="linear")
    argparser.add_argument('-rm', '--remove_mean', help="Remove mean flag", default=False)
    argparser.add_argument('-raw', '--raw', help="Plot raw data instead of interpolated data",  default=False)
    argparser.add_argument('-save_raw', '--save_raw', help="Save raw data csv", default=False)
    argparser.add_argument('-save_csv', '--save_csv', help="Save interpolated data csv",  default=True)
    argparser.add_argument('-save_numpy', '--save_numpy', help="Save numpy arrays",  default=False)
    argparser.add_argument('-debug', '--debug', help="Run in debug mode",  default=False)
    argparser.add_argument('-spectrum', '--spectrum', help="Generate Spectrum Plot",  default=True)
    argparser.add_argument('-to', '--time_offset', help="Time offset for time axis", default=0)
    argparser.add_argument('-repeat', '--repeat_file', help='Path to the repeat file', default=None)

    args = argparser.parse_args()

    main(args)

