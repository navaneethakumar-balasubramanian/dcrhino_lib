import numpy as np
import h5py
import pandas as pd
from scipy import interpolate

from ConfigParser import ConfigParser
import argparse
import os
import scipy

import matplotlib.pyplot as plt
import pdb
#from string import zfill
#from dcrhino.analysis.data_manager.temp_paths import ensure_dir
import calendar
import scipy.signal as ssig
import warnings
#from dcrhino.real_time.metadata import Metadata
warnings.filterwarnings("ignore")


#from dcrhino.models.feature_extracted import FeatureExtractedModel


from dcrhino.analysis.graphical.unbinned_qc_log_plots_v3_west_angelas import pseudodensity_panel,primary_pseudovelocity_panel,reflection_coefficient_panel
#from dcrhino.analysis.math.mwd_tools import interpolate_to_assign_depths_to_log_csv
from datetime import datetime
from dcrhino.process_pipeline.config import Config
from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotter,QCLogPlotInput
from dcrhino.process_pipeline.feature_extractor import FeatureExtractor
from dcrhino.process_pipeline.filters import FIRLSFilter

from dcrhino.process_pipeline.h5_helper import H5Helper
from dcrhino.process_pipeline.mwd_helper import MwdDFHelper
from dcrhino.process_pipeline.io_helper import IOHelper
#plt.rcParams['figure.figsize'] = [20, 12]
import sys


from dcrhino.process_pipeline.qc_log_plotter import QCLogPlotterv2
#from dcrhino.process_pipeline.mwd_mapper import MWDMapper

import matplotlib.pylab as pylab





def get_ts_array_indexes(ts,arr):
    return np.array(np.where(arr == int(ts)))

def get_values_from_index(index_ar, values_ar, dtype):
    return values_ar[index_ar.min():index_ar.max()]

def apply_calibration(is_ide_file,values_arr,sensitivity,accelerometer_max_voltage):
    output = values_arr
    if is_ide_file:
        # TODO CHECK THAT
        # NATAL SAID ITS CORRECT!
        return output / sensitivity
    else:
        output = (output * 5) / 65535
        output = (accelerometer_max_voltage/2) - output
        output = output / (sensitivity/1000)
        return output

def interpolate_data(ideal_timestamps, digitizer_timestamps, data):
        interp_data = np.interp(ideal_timestamps,digitizer_timestamps,data)
        return interp_data


def autocorrelate_trace(trace_data, n_pts):
    """
    TODO: make 2500 = len(trace)/2
    confirm 5000 points is standard, or make depend on trace length
    WARNING  wants even # points
    """
    zero_time_index = len(trace_data) // 2
    acorr = np.correlate(trace_data, trace_data,'same')
    return acorr[zero_time_index:zero_time_index+n_pts]

def deconvolve_trace( deconvolution_filter_duration,num_taps_in_decon_filter, data):
        deconvolution_filter_duration = float(deconvolution_filter_duration)
        R_xx = autocorrelate_trace(data, num_taps_in_decon_filter)
        ATA = scipy.linalg.toeplitz(R_xx)
        nominal_scale_factor = 1.0;#1./R_xx[0]#1.0
        ATA = scipy.linalg.toeplitz(R_xx)
        try:
            ATAinv = scipy.linalg.inv(ATA)
        except np.linalg.linalg.LinAlgError:
            #logger.error('matrix inversion failed')
            print('matrix inversion failed')
            return data, R_xx[0]
        x_filter = nominal_scale_factor*ATAinv[0,:]
        deconv_trace = np.convolve(x_filter, data, 'same')
        return deconv_trace, R_xx[0]





def correlate_trace( original_data, decon_data):
        correlated_trace = np.correlate(original_data, decon_data, 'same')
        return correlated_trace


def bandpass_filter_trace(output_sampling_rate,trapezoidal_bpf_corner_1,trapezoidal_bpf_corner_2,trapezoidal_bpf_corner_3,trapezoidal_bpf_corner_4,trapezoidal_bpf_duration,data):
    """
    TODO: calculate fir_taps once per header and leave fixed ...
    """
    sampling_rate = float(output_sampling_rate)
    corners = [trapezoidal_bpf_corner_1,
               trapezoidal_bpf_corner_2,
               trapezoidal_bpf_corner_3,
               trapezoidal_bpf_corner_4,]
    fir_duration = trapezoidal_bpf_duration# = 0.02

    firls = FIRLSFilter(corners, fir_duration)

    #pdb.set_trace()
    fir_taps = firls.make(sampling_rate)

    if (len(fir_taps) == 1) and (fir_taps[0]==1.0):
        bpf_data = data
    else:
        bpf_data = ssig.filtfilt(fir_taps, 1., data).astype('float32')

    #bpf_data = ssig.lfilter(fir_filter.taps, 1., tr_corr_w_deconv).astype('float32')
    #bpf_data = ssig.lfilter(fir_filter.taps, 1., bpf_data).astype('float32')

    return bpf_data


def trim_trace(min_lag_trimmed_trace, max_lag_trimmed_trace,num_taps_in_decon_filter,output_sampling_rate, data):
        """
        add min_lag and max_lag
        """
        min_lag = min_lag_trimmed_trace
        max_lag = max_lag_trimmed_trace
        zero_time_index = len(data) // 2
        decon_filter_offset = num_taps_in_decon_filter // 2
        t0_index = zero_time_index + decon_filter_offset #2750
        sampling_rate = float(output_sampling_rate)
        n_samples_back = int(sampling_rate * np.abs(min_lag))
        n_samples_fwd = int(sampling_rate * max_lag)

        back_ndx = t0_index - n_samples_back
        fin_ndx = t0_index + n_samples_fwd

        little_data = data[back_ndx:fin_ndx]
        return little_data


def get_axial_tangential_radial_traces(start_time_ts, end_time_ts, entire_xyz, ts_data,
                                       sensitivity_xyz, is_ide_file, accelerometer_max_voltage,
                                       global_config, start_ts, debug_file_name='',debug=True):
    entire_ts = ts_data
#    pdb.set_trace()
    entire_ts_int = entire_ts.astype(int)

    if len(sensitivity_xyz) != 3:
        print ("Could not read xyz sensitivity")
        raise SystemExit

    actual_ts = start_time_ts
    end = end_time_ts
    interval_seconds = (int(end_time_ts) - int(start_time_ts))

    print ("Getting axial,tangential,radial traces from interval: " + str(start_time_ts) +  " - " + str(end_time_ts) + " total of " + str(interval_seconds) + " seconds")

    axial_traces = [None] * interval_seconds
    radial_traces = [None] * interval_seconds
    tangential_traces = [None] * interval_seconds
    ts = [None] * interval_seconds

    if debug:
        axial_deconvolved_traces = [None] * interval_seconds
        radial_deconvolved_traces = [None] * interval_seconds
        tangential_deconvolved_traces = [None] * interval_seconds

        axial_interpolated_traces = [None] * interval_seconds
        radial_interpolated_traces = [None] * interval_seconds
        tangential_interpolated_traces = [None] * interval_seconds

        axial_filtered_correlated_traces = [None] * interval_seconds
        radial_filtered_correlated_traces = [None] * interval_seconds
        tangential_filtered_correlated_traces = [None] * interval_seconds

    while actual_ts < end:

        indexes_array_of_actual_second = get_ts_array_indexes(actual_ts,entire_ts_int)

        # PREVENT CRASH IF THERES NO DATA ON THE LASTS SECONDS OF THE HOLE
        if len(indexes_array_of_actual_second[0]) == 0:
            actual_ts += 1
            continue

        ts_actual_second = get_values_from_index(indexes_array_of_actual_second,entire_ts,np.float64)
        ts_actual_second = ts_actual_second-int(ts_actual_second[0])

        results = [None] * len(entire_xyz)
        if debug:
            results_deconvolved = [None] * len(entire_xyz)
            results_interpolated = [None] * len(entire_xyz)
            results_filtered = [None] * len(entire_xyz)

        for i, data in enumerate(entire_xyz):

            #pdb.set_trace()
            actual_second = get_values_from_index(indexes_array_of_actual_second,data,np.float32)
            sensitivity = sensitivity_xyz[i]

            calibrated_actual_second = apply_calibration(is_ide_file,actual_second,sensitivity,accelerometer_max_voltage)
            # Save to npy file calibrated_actual_second
            interpolated_actual_second = interpolate_data(global_config.ideal_timestamps, ts_actual_second, calibrated_actual_second)
            deconvolved_data_actual_second, r_xx0 = deconvolve_trace(global_config.deconvolution_filter_duration,global_config.num_taps_in_decon_filter,interpolated_actual_second)
            correlated_trace_actual_second = correlate_trace(interpolated_actual_second,deconvolved_data_actual_second)
            filtered_correlated_trace_actual_second = bandpass_filter_trace(global_config.output_sampling_rate,global_config.trapezoidal_bpf_corner_1,global_config.trapezoidal_bpf_corner_2,global_config.trapezoidal_bpf_corner_3,global_config.trapezoidal_bpf_corner_4,global_config.trapezoidal_bpf_duration,correlated_trace_actual_second)
            #pdb.set_trace()
            trimmed_filtered_correlated_trace_actual_second = trim_trace(global_config.min_lag_trimmed_trace,global_config.max_lag_trimmed_trace,global_config.num_taps_in_decon_filter,global_config.output_sampling_rate,filtered_correlated_trace_actual_second)
            results[i] = trimmed_filtered_correlated_trace_actual_second

            if debug:
                results_deconvolved[i] = deconvolved_data_actual_second
                results_interpolated[i] = interpolated_actual_second
                results_filtered[i] = filtered_correlated_trace_actual_second


        if global_config.sensor_axial_axis == 1:
            axial_trace = results[0]
            tangential_trace = results[1]
            radial_trace = results[2]

            if debug:
                axial_deconvolved_trace = results_deconvolved[0]
                radial_deconvolved_trace = results_deconvolved[2]
                tangential_deconvolved_trace = results_deconvolved[1]

                axial_filtered_correlated_trace = results_filtered[0]
                radial_filtered_correlated_trace = results_filtered[2]
                tangential_filtered_correlated_trace = results_filtered[1]

                axial_interpolated_trace = results_interpolated[0]
                radial_interpolated_trace = results_interpolated[2]
                tangential_interpolated_trace = results_interpolated[1]
        else:
            axial_trace = results[1]
            tangential_trace = results[0]
            radial_trace = results[2]

            if debug:
                axial_deconvolved_trace = results_deconvolved[1]
                radial_deconvolved_trace = results_deconvolved[2]
                tangential_deconvolved_trace = results_deconvolved[0]

                axial_filtered_correlated_trace = results_filtered[1]
                radial_filtered_correlated_trace = results_filtered[2]
                tangential_filtered_correlated_trace = results_filtered[0]

                axial_interpolated_trace = results_interpolated[1]
                radial_interpolated_trace = results_interpolated[2]
                tangential_interpolated_trace = results_interpolated[0]

        axial_traces[actual_ts-start_ts] = axial_trace
        tangential_traces[actual_ts-start_ts] = tangential_trace
        radial_traces[actual_ts-start_ts] = radial_trace
        ts[actual_ts-start_ts] = actual_ts

        if debug:
            axial_deconvolved_traces[actual_ts-start_ts] = axial_deconvolved_trace
            tangential_deconvolved_traces[actual_ts-start_ts] = tangential_deconvolved_trace
            radial_deconvolved_traces[actual_ts-start_ts] = radial_deconvolved_trace

            axial_filtered_correlated_traces[actual_ts-start_ts] = axial_filtered_correlated_trace
            tangential_filtered_correlated_traces[actual_ts-start_ts] = tangential_filtered_correlated_trace
            radial_filtered_correlated_traces[actual_ts-start_ts] = radial_filtered_correlated_trace

            axial_interpolated_traces[actual_ts-start_ts] = axial_interpolated_trace
            tangential_interpolated_traces[actual_ts-start_ts] = tangential_interpolated_trace
            radial_interpolated_traces[actual_ts-start_ts] = radial_interpolated_trace

        actual_ts += 1


    axial_traces = np.asarray(axial_traces)
    tangential_traces = np.asarray(tangential_traces)
    radial_traces = np.asarray(radial_traces)
    ts = np.asarray(ts)

    if debug:
        axial_deconvolved_traces = np.asarray(axial_deconvolved_traces)
        tangential_deconvolved_traces = np.asarray(tangential_deconvolved_traces)
        radial_deconvolved_traces = np.asarray(radial_deconvolved_traces)
        #pdb.set_trace()
        axial_interpolated_traces = np.asarray(axial_interpolated_traces)
        tangential_interpolated_traces = np.asarray(tangential_interpolated_traces)
        radial_interpolated_traces = np.asarray(radial_interpolated_traces)

        axial_filtered_correlated_traces = np.asarray(axial_filtered_correlated_traces)
        tangential_filtered_correlated_traces = np.asarray(tangential_filtered_correlated_traces)
        radial_filtered_correlated_traces = np.asarray(radial_filtered_correlated_traces)

        #print (axial_deconvolved_traces.shape)
        np.save(debug_file_name+'axial_deconvolved_traces.npy',axial_deconvolved_traces)
        np.save(debug_file_name+'tangential_deconvolved_traces.npy',tangential_deconvolved_traces)
        np.save(debug_file_name+'radial_deconvolved_traces.npy',radial_deconvolved_traces)

        np.save(debug_file_name+'axial_filtered_correlated_traces.npy',axial_filtered_correlated_traces)
        np.save(debug_file_name+'tangential_filtered_correlated_traces.npy',tangential_filtered_correlated_traces)
        np.save(debug_file_name+'radial_filtered_correlated_traces.npy',radial_filtered_correlated_traces)

        np.save(debug_file_name+'axial_interpolated_traces.npy',axial_interpolated_traces)
        np.save(debug_file_name+'tangential_interpolated_traces.npy',tangential_interpolated_traces)
        np.save(debug_file_name+'radial_interpolated_traces.npy',radial_interpolated_traces)

    return [axial_traces,tangential_traces,radial_traces,ts]

def get_features_extracted(extractor,axial_traces,tangential_traces,radial_traces,ts_array):
    print ("Extracting features")

    extracted_features_list = [None] * len(ts_array)
    for i, actual_ts in enumerate(ts_array):
        axial_trace = axial_traces[i]
        tangential_trace = tangential_traces[i]
        radial_trace = radial_traces[i]

        if axial_trace is None:
            continue

        extracted_features = extractor.extract_features(actual_ts,axial_trace,tangential_trace,radial_trace,global_config.n_samples_trimmed_trace,-global_config.min_lag_trimmed_trace)
        extracted_features_list[i] = extracted_features

    print ("Features extracted")
    return extracted_features_list
#pdb.set_trace()




def _header_plot(ax, X, peak_ampl_y,peak_ampl_z,peak_mult_x,peak_ampl_x, plot_title, peak_amplitude_linewidth = 0.2):
    """
    """
    ax.plot(X, peak_ampl_y, label='peak_y', linewidth=peak_amplitude_linewidth)
    ax.plot(X, peak_ampl_z, label='peak_z', linewidth=peak_amplitude_linewidth)
    ax.plot(X, peak_mult_x, label='mult_x', linewidth=peak_amplitude_linewidth)
    ax.plot(X, peak_ampl_x, label='peak_x', linewidth=peak_amplitude_linewidth)
    ax.legend()
    ax.set_title(plot_title)
    ax.set_ylim(0.0, 2.0)
    ax.set_xlim(X[0], X[-1])
    return







def qc_plot2(output_path,plot_title,axial,tangential,radial,ts_array,lower_num_ms=-5,upper_num_ms=30,cmap_string='jet',colourbar_type='all_one'):

    #cbal = ColourBarAxisLimtis(colourbar_type=colourbar_type)#, v_min_1=-22)

    components = [axial, tangential, radial]
    dt_ms = 5
    lowest_y_tick =  int(lower_num_ms/dt_ms)
    greatest_y_tick = int(upper_num_ms/dt_ms)
    y_tick_locations = dt_ms * np.arange(lowest_y_tick, greatest_y_tick + 1)

    plt.tight_layout()
    fig, ax = plt.subplots(nrows=4, sharex=False, figsize=(24,11))

    idx = 0
    for component in components:

        #alterations to plot / transpose / max_amplitude / slice by samples back and forward
        #pdb.set_trace()
        component = np.transpose(component)
        n_samples = global_config.n_samples_trimmed_trace
        max_amplitudes = np.max(component, axis=0)
        component = component/max_amplitudes
        dt = 1./global_config.output_sampling_rate
        samples_back = (np.abs(lower_num_ms))/1000./dt
        samples_back = int(np.ceil(samples_back))
        samples_fwd = upper_num_ms/1000./dt
        samples_fwd = int(np.ceil(samples_fwd))
        half_way = int(n_samples/2)
        component = component[half_way-samples_back:half_way+samples_fwd,:]
        component = np.flipud(component)

        Y = np.linspace(lower_num_ms, upper_num_ms, len(component))
        Y = np.flipud(Y)
        X = pd.date_range(start=datetime.utcfromtimestamp(int(ts_array[0])), periods=len(component[0]), freq='1S')
        ax[idx+1], heatmap = plot_hole_as_heatmap(ax[idx+1], -0.5, 0.5, X, Y, component, cmap_string, y_tick_locations)
        idx +=1


#    header_plot(ax[0], X, None,None,None,None, plot_title)

    plt.savefig(output_path)
    plt.clf()

# def extract_metadata_from_h5_file(h5f):
#     config = ConfigParser.ConfigParser()
#     for key,value in h5f.attrs.iteritems():
#         #print(key,value)
#         section = key.split("/")[0]
#         param_name = key.split("/")[1]
#         #pdb.set_trace()
#         if config.has_section(section):
#             config.set(section,param_name,value)
#         else:
#             config.add_section(section)
#             config.set(section,param_name,value)
#     m =Metadata(config)
#     return m


def main():

    h5_full_filename = None
    h5_full_filename = '/home/sjha/data/datacloud/mount_milligan/level_1/2018-05-04/piezo/4000hz/20180504_SSX55470_5306_4000.h5'
    h5_full_filename = '20180504_SSX55470_5306_4000.h5'
    mwd_filename = None
    mwd_filename = 'mount_milligan_raw.csv'
    icl_string = ''
    icl_string = 'weight_on_bit,rop,torque,vibration,rpm,air_pressure'
    ric_string = 'rig'
    ric_string = 'machine_id'
    sc_string = 'starttime'
    sc_string = 'time_start_utc'
    ec_string = 'endtime'
    ec_string = 'time_end_utc'
    mc_string = 'mse'
    mc_string = 'MSE'
    tobc_string = 'tob'
    tobc_string = 'torque'
    wobc_string = 'wob'
    wobc_string = 'weight_on_bit'



    argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-h5', '--h5-path', help="H5 File Path", default=h5_full_filename)
    argparser.add_argument('-mwd', '--mwd-path', help="MWD File Path", default=mwd_filename)
    argparser.add_argument('-cfg', '--cfg-path', help="CFG File Path", default=None)
    argparser.add_argument('-ric', '--rig-id-column', help="RIG ID COLUMN", default=ric_string)
    argparser.add_argument('-sc', '--start-time-column', help="START TIME COLUMN", default=sc_string)
    argparser.add_argument('-ec', '--end-time-column', help="END TIME COLUMN", default=ec_string)
    argparser.add_argument('-hc', '--hole-column', help="HOLE COLUMN", default='hole')
    argparser.add_argument('-mc', '--mse-column', help="MSE COLUMN", default=mc_string)
    argparser.add_argument('-bc', '--bench-column', help="BENCH COLUMN", default='bench')
    argparser.add_argument('-ropc', '--rop-column', help="ROP COLUMN", default='rop')
    argparser.add_argument('-wobc', '--wob-column', help="WOB COLUMN", default=wobc_string)
    argparser.add_argument('-tobc', '--tob-column', help="TOB COLUMN", default=tobc_string)
    argparser.add_argument('-eastc', '--easting-column', help="EASTING COLUMN", default='easting')
    argparser.add_argument('-nortc', '--northing-column', help="NORTHING COLUMN", default='northing')
    argparser.add_argument('-pc', '--pattern-column', help="PATTERN COLUMN", default='pattern')
    argparser.add_argument('-cec', '--collar-elevation-column', help="COLLAR ELEVATION COLUMN", default='collar_elevation')
    argparser.add_argument('-compec', '--computed-elevation-column', help="COMPUTED ELEVATION COLUMN", default='computed_elevation')
    argparser.add_argument('-icl', '--interpolated-column-names', help="INTERPOLATED COLUMN NAMES", default=icl_string)

    args = argparser.parse_args()
    start_time_column = args.start_time_column
    end_time_column = args.end_time_column
    bench_column = args.bench_column
    pattern_column = args.pattern_column
    hole_column = args.hole_column
    collar_elevation_column = args.collar_elevation_column
    computed_elevation_column = args.computed_elevation_column
    rig_id_column = args.rig_id_column
    interpolated_column_names = str(args.interpolated_column_names).split(",")
    #pdb.set_trace()
    mse_column = args.mse_column
    rop_column = args.rop_column
    wob_column = args.wob_column
    tob_column = args.tob_column
    easting_column = args.easting_column
    northing_column = args.northing_column

    print ("H5 file path:" , args.h5_path)
    print ("MWD file path:" , args.mwd_path)
    #print ("Client Config file path:" , args.client_config_path)
    print ("Config file path:" , args.cfg_path)

    # Read Config
    config_parser = ConfigParser()
    if args.cfg_path is not None:
        config_parser.read(args.cfg_path)




    # Read Env Config Parser
    env_config_parser = ConfigParser()
    env_config_parser.read('env.cfg')


    f1 = h5py.File(args.h5_path,'r+')

    mwd_df = pd.read_csv(args.mwd_path)
    pdb.set_trace()
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
                           northing_column=northing_column)
    #pdb.set_trace()
    print("mwd helper = {}".format(mwd_helper))
    if mwd_helper is False:
        sys.exit("Error in mwd dataframe.")


    h5_helper = H5Helper(f1)

    # DATA FROM H5 CONFIG HEADER

    metadata = h5_helper.metadata
    global_config = Config(metadata,env_config_parser,config_parser)
    io_helper = IOHelper(global_config)
    print (io_helper.get_mine_path())

    accelerometer_max_voltage = float(f1.attrs['PLAYBACK/accelerometer_max_voltage'])

    print ("Mine name = " + global_config.mine_name)
    print ("Rig id = " + global_config.rig_id)
    print ("sensor_serial_number = " + global_config.sensor_serial_number)
    print ("H5 data from " + str(h5_helper.min_dtime) + " to " + str(h5_helper.max_dtime))

    holes_array = mwd_helper.get_holes_df_from_rig_timeinterval(mwd_df,global_config.rig_id, h5_helper.min_dtime, h5_helper.max_dtime)

    print ("Identified ", len(holes_array) , " holes in this combination of mwd and h5")

    extractor = FeatureExtractor(global_config.output_sampling_rate,
                                 global_config.primary_window_halfwidth_ms,
                                 global_config.multiple_window_search_width_ms,
                                 sensor_distance_to_source=global_config.sensor_distance_to_source)

    for i,hole in enumerate(holes_array):
        #if i <= 5:
        #    print ("Jumping hole")
        #    continue
        bph_string = str(hole[bench_column].values[0]) + "-" + str(hole[pattern_column].values[0])  + "-" + str(hole[hole_column].values[0])
        hole_uid = bph_string
        print ("Processing : " + bph_string + " from: " + str(hole[start_time_column].min()) + " to " + str(hole[end_time_column].max()))

        if len(hole) == 1:
            print ("Error in this hole. Please check mwd, there should be more than one line.")
            continue

        start_ts = calendar.timegm(hole[start_time_column].min().timetuple())
        end_ts = calendar.timegm(hole[end_time_column].max().timetuple())
        if start_ts < h5_helper.min_ts:
            start_ts = h5_helper.min_ts

        if end_ts > h5_helper.max_ts:
            print("MWD HAS MORE TIME THAN THE H5" ,end_ts,int(h5_helper.max_ts))
            end_ts = int(h5_helper.max_ts)


        temppath = io_helper.get_output_base_path(hole_uid)

        startdt = datetime.utcfromtimestamp(start_ts)
        enddt = datetime.utcfromtimestamp(end_ts)
        periods = (enddt-startdt).total_seconds()
        time_vector = pd.date_range(start=startdt, periods=periods, freq='1S')

        axial_file_path = os.path.join(temppath,'axial.npy')
        tangential_file_path = os.path.join(temppath,'tangential.npy')
        radial_file_path = os.path.join(temppath,'radial.npy')
        ts_file_path = os.path.join(temppath,'ts.npy')
        #pdb.set_trace()
        if os.path.isfile(axial_file_path):
            print ("Using cached files")
            axial = np.load(axial_file_path)
            tangential = np.load(tangential_file_path)
            radial = np.load(radial_file_path)
            ts_array = np.load(ts_file_path)
        else:
            pdb.set_trace()
            axial, tangential, radial, ts_array = get_axial_tangential_radial_traces(
                start_ts, end_ts, h5_helper.data_xyz, h5_helper.ts, h5_helper.sensitivity_xyz,
                h5_helper.is_ide_file, accelerometer_max_voltage, global_config,
                start_ts, debug_file_name=os.path.join(temppath,''))
            np.save(os.path.join(temppath,'axial.npy'),axial)
            np.save(os.path.join(temppath,'tangential.npy'),tangential)
            np.save(os.path.join(temppath,'radial.npy'),radial)
            np.save(os.path.join(temppath,'ts.npy'),ts_array)

        extracted_features_list = get_features_extracted(extractor,axial,tangential,radial,ts_array)
        pdb.set_trace()
        extracted_features_df = pd.DataFrame(extracted_features_list)
        extracted_features_df['computed_elevation'], time_vector = mwd_helper.get_interpolated_column(hole,'computed_elevation',time_vector)
        extracted_features_df[mse_column], time_vector = mwd_helper.get_interpolated_column(hole,mse_column,time_vector)
        pdb.set_trace()
        if interpolated_column_names[0] != '':
            for column_name in interpolated_column_names:
                extracted_features_df[column_name], time_vector = mwd_helper.get_interpolated_column(hole,column_name,time_vector)

        extracted_features_df['depth'] = (np.asarray(extracted_features_df['computed_elevation'].values) - hole[collar_elevation_column].values[0]) * -1
        pdb.set_trace()
        qclogplotter_depth = QCLogPlotterv2(axial,tangential,radial,mwd_helper,hole,extracted_features_df,bph_string,os.path.join(temppath,'depth_plot.png'),global_config)
        qclogplotter_depth.plot()
        qclogplotter_time = QCLogPlotterv2(axial,tangential,radial,mwd_helper,hole,extracted_features_df,bph_string,os.path.join(temppath,'time_plot.png'),global_config,plot_by_depth=False)
        qclogplotter_time.plot()

        hole.to_csv( os.path.join( temppath, "hole_mwd.csv" ) )


        qc_input = QCLogPlotInput()
        plot_meta = {}


        plot_meta['path'] = temppath#os.path.join(level3_csv_out_measurand.data_level_path(), 'unbinned', row.area)
        plot_meta['log_path'] = temppath





        plot_meta['rop_path'] = os.path.join(plot_meta['path'], 'rop')


        plot_meta['log_filename'] = os.path.join(temppath,'qc_log.png')
        plot_meta['rop_filename'] = os.path.join(plot_meta['rop_path'],'.png')



        # GENERATE QC PLOT
        title_line1 = "Correlated Trace QC Time Plots, {}, {}".format(global_config.mine_name, hole[start_time_column].min().strftime("%B %d, %Y"))
        title_line2 = "Hole: {}, Pattern/Area: {},Digitizer_ID: {},Sampling rate: {}".format(hole[hole_column].values[0],hole[pattern_column].values[0],global_config.sensor_serial_number,global_config.output_sampling_rate)
        title_line3 = "Sensor distance to source: {},Orientation: {},Drill Rig ID: {}".format(global_config.sensor_distance_to_source,'',global_config.rig_id)
        plot_title = title_line1+'\n'+title_line2+'\n'+title_line3
        #qc_plot(os.path.join(plot_meta['log_path'],"qc_plot.png"),plot_title,axial,tangential,radial,ts_array)

        plot_meta['row'] = hole

        #TODO: Make qcLogPlotInput have methods that generate amplitude ratio, etc
        qc_input.df = extracted_features_df
        pdb.set_trace()
        qc_input.hole_start_time = extracted_features_df['datetime'].iloc[0].to_pydatetime()
        qc_input.observer_row = hole
        qc_input.plot_meta = plot_meta
        qc_input.time_stamps = extracted_features_df['datetime']
    #
        extracted_features_df['pseudo_ucs'] = pd.Series(qc_input.pseudo_ucs_sample, index = extracted_features_df.index)
        extracted_features_df['pseudo_velocity'] = pd.Series(qc_input.primary_pseudo_velocity_sample, index = extracted_features_df.index)
        extracted_features_df['pseudo_density'] = pd.Series(qc_input.primary_pseudo_density_sample, index = extracted_features_df.index)
        extracted_features_df['reflection_coefficient'] = pd.Series(qc_input.reflection_coefficient_sample, index = extracted_features_df.index)
        extracted_features_df['axial_delay'] = extracted_features_df['axial_multiple_peak_time_sample'] - extracted_features_df['axial_primary_peak_time_sample']
        extracted_features_df['axial_velocity_delay'] = 1.0/(extracted_features_df['axial_delay'])**3
        extracted_features_df.to_csv(os.path.join(plot_meta['log_path'],"extracted_features.csv"))

        QCLogPlotter(qc_input)

        file = open(os.path.join(temppath,'log.txt'),'w')

        file.write("H5 file path: " + str(args.h5_path))
        file.write("\nMWD file path: " + str(args.mwd_path))
        file.write("\nConfig file path: " + str(args.cfg_path))

        file.close()



if __name__ == "__main__":
    main()
