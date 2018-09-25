# -*- coding: utf-8 -*-
"""
Created on Thu Sep  6 12:14:02 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import pandas as pd

#%matlplotlib qt

from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots09192018 import qc_plot
#from dcrhino.analysis.graphical.supporting_qc_blasthole_plots import QCPlotInputs
from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots09192018 import QCBlastholePlotInputs
from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots09192018 import get_interpolated_computed_elevation
from dcrhino.analysis.signal_processing.mwd_tools import get_interpolated_column
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
#from dcrhino.analysis.signal_processing.trace_header import define_obspy_trace_header
#from dcrhino.analysis.signal_processing.mwd_tools_09202018 import interpolate_to_assign_depths_to_log_csv



home = os.path.expanduser("~/")
azure_path = os.path.join(home, 'data/datacloud/west_angelas/corr_npy_dump')


mwd_measurand = MEASURAND_REGISTRY.measurand('mwd_with_mse')
mwd_df = mwd_measurand.load()
#pdb.set_trace()


master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
master_iterator_df = master_iterator_measurand.load()
master_iterator_df = master_iterator_df[master_iterator_df['orientation']=='normal']

total_number_of_rows = len(master_iterator_df)

for i_row in range(total_number_of_rows):
    trace_array_dict = {}
    current_row = master_iterator_df.iloc[i_row]

    hole = current_row.hole
    digitizer_id = current_row.digitizer_id


    #<Get unique row from master iterator>
    sub_df = master_iterator_df[master_iterator_df['hole']==hole]
    sub_df = sub_df[sub_df['digitizer_id']==digitizer_id]
    row = sub_df.iloc[0]
    #</Get unique row from master iterator>

    #<Get unique blasthole from mwd>
    sub_mwd_df = mwd_df[mwd_df['hole']==hole]
    sub_mwd_df = sub_mwd_df[sub_mwd_df['area']==row.area]
    #note this may need to be generalized for other mines
    #</Get unique blasthole from mwd>
    #pdb.set_trace()
    data_date = sub_mwd_df.starttime.dt.date
    data_date = data_date.iloc[0]

#   (/Read ROP, WOB, and TOB
#    pdb.set_trace()
    sub_mwd_df_rop = sub_mwd_df['rop(m/hr)']
    sub_mwd_df_wob = sub_mwd_df['force_on_bit(n)']
    sub_mwd_df_tob = sub_mwd_df['torque(nm)']

#    /Read ROP, WOB, and TOB)

    print(row)
    print("Make the qc plot: Step 1 get the data")
    print("load the 'trace header'")
    print("skipping'trace header' until karl hands off the data")
    print("load correlated traces")


    filebase = 'peak_ampl_axial_{}_{}.npy'.format(hole, digitizer_id)
    full_filename = os.path.join(azure_path, filebase)
    peak_ampl_axial = np.load(full_filename)


    filebase = 'peak_ampl_tangential_{}_{}.npy'.format(hole, digitizer_id)
    full_filename = os.path.join(azure_path, filebase)
    peak_ampl_tangential = np.load(full_filename)

    filebase = 'peak_ampl_radial_{}_{}.npy'.format(hole, digitizer_id)
    full_filename = os.path.join(azure_path, filebase)
    peak_ampl_radial = np.load(full_filename)

    filebase = 'peak_mult_axial_{}_{}.npy'.format(hole, digitizer_id)
    full_filename = os.path.join(azure_path, filebase)
    peak_mult_axial = np.load(full_filename)


    num_traces_in_blasthole = len(peak_ampl_axial)
    lower_num_ms=-5.0
    upper_num_ms=30.0

    project_id = 'west_angelas'

    #<get depth info>
    datetime_delta = 1 #second
    time_arr = np.arange(row.time_start,row.time_end,datetime.timedelta(seconds = datetime_delta)).astype(datetime.datetime)
    depth = get_interpolated_computed_elevation(time_arr,sub_mwd_df)

    time_vector = pd.date_range(start=row.time_start, periods=num_traces_in_blasthole, freq='1S')
    depth2 = get_interpolated_column(time_vector, sub_mwd_df, 'computed_elevation')

    #</get depth info>
    for component_label in COMPONENT_LABELS:
        print(component_label)
        traces_filename = '{}_{}_{}.npy'.format(component_label, row.hole, row.digitizer_id)
        input_filename = os.path.join(azure_path,traces_filename)
        output_filename = '{}_{}_{}.png'.format(project_id,row.hole,row.digitizer_id)

#        output_filename = '{}_{}_{}_{}_{}.png'.format(project_id,row.hole,row.digitizer_id,lower_num_ms_new,upper_num_ms_new)
#        (/Titles
        title_line1 = "Correlated Trace QC Time Plots, {}, {}".format(project_id, row.time_start.strftime("%B %d, %Y"))
        title_line2 = "Hole: {}, Area: {},Digitizer_ID: {},Sampling rate: {}".format(row.hole,row.area,row.digitizer_id,row.sampling_rate)
        title_line3 = "Sensor distance to source: {},Orientation: {},Drill Rig ID: {}".format(row.sensor_distance_to_source,row.orientation,row.drill_rig_id)
        plot_title = title_line1+'\n'+title_line2+'\n'+title_line3
#       /Titles)

        data = np.load(input_filename)
#

        total_number_of_samples = len(data)
        samples_per_trace = total_number_of_samples // num_traces_in_blasthole
        data = data.reshape(num_traces_in_blasthole, samples_per_trace)

        trace_array_dict[component_label] = data.T

        total_mwd_count = len(sub_mwd_df)
        #converting to depth
        starttime_str = '{}'.format(row['time_start'])
        endtime_str = '{}'.format(row['time_end'])

        #Thiago's method
#        datetime_delta = (row.time_end - row.time_start).seconds/total_mwd_count
        base_time = row.time_start
#        time_arr = np.array([base_time +datetime.timedelta(seconds=datetime_delta) for i in xrange(total_mwd_count)])

#        pdb.set_trace()
        #/Thiago's method
#        depth = np.linspace(min(depth),max(depth),total_number_of_samples)
#        pdb.set_trace()
#        #Karls method
#        #no time_start in hole_df
#        dff = sub_mwd_df[(sub_mwd_df['starttime'] >= starttime_str) & (sub_mwd_df['starttime'] <= endtime_str)]
#        plot_meta = master_iterator_measurand.set_plotting_metadata(row)
#        print('CHECK IF DFF IS BEING GENERATED')
#        pdb.set_trace()
#        depth = interpolate_to_assign_depths_to_log_csv(dff, sub_mwd_df, plot_meta=plot_meta)
#        dff['depth'] = pd.Series(depth, index = dff.index)
#        #Karl's method



        #total hack

        if row.sampling_rate == 2400:
            trace_array_dict[component_label] = trace_array_dict[component_label][240-12:240+72,:]
        elif row.sampling_rate == 2800:
            trace_array_dict[component_label] = trace_array_dict[component_label][240-14:240+84]
        elif row.sampling_rate == 3200:
            trace_array_dict[component_label] = trace_array_dict[component_label][320-16:320+96,:]

    print("Step 2: call the plotter")

    normalize_by_max_amplitude =  True
    if normalize_by_max_amplitude:
        for component_label in COMPONENT_LABELS:#in ['x', 'y', 'z']:
            nans_locations = np.where(np.isnan(trace_array_dict[component_label]))
            trace_array_dict[component_label][nans_locations]=0.0
            num_samples, num_traces = trace_array_dict[component_label].shape
            max_amplitudes = np.max(trace_array_dict[component_label], axis=0)
            trace_array_dict[component_label] = trace_array_dict[component_label]/max_amplitudes
            trace_array_dict[component_label][nans_locations] = np.nan


    qc_plot_input = QCBlastholePlotInputs(trace_array_dict=trace_array_dict,
                                          sub_mwd_time = sub_mwd_df.starttime,
#                                          sub_mwd_depth = dff.depth,
                                          sub_mwd_depth_interp = depth,

                                          sub_mwd_rop = sub_mwd_df_rop,
#                                          sub_mwd_comp_el = sub_mwd_df.computed_elevation
                                          sub_mwd_depth = sub_mwd_df.computed_elevation,
                                          sub_mwd_wob = sub_mwd_df_wob/1000.0,
                                          sub_mwd_tob = sub_mwd_df_tob,
                                          peak_ampl_x=peak_ampl_axial,
                                          peak_ampl_y=peak_ampl_tangential,
                                          peak_ampl_z=peak_ampl_radial,
                                          peak_mult_x=peak_mult_axial,
                                          lower_number_ms=lower_num_ms, upper_number_ms=upper_num_ms,
#                                          lower_number_ms_new=lower_num_ms_new, upper_number_ms_new=upper_num_ms_new,
                                          mwd_tstart = sub_mwd_df.starttime.iloc[0].second,
                                          mwd_tend = sub_mwd_df.endtime.iloc[-1].second,
                                          mwd_start_depth = sub_mwd_df.computed_elevation.iloc[0],
                                          mwd_end_depth = sub_mwd_df.computed_elevation.iloc[-1],
                                          collar_elevation = np.mean(sub_mwd_df.collar_elevation))

    qc_plot(qc_plot_input, output_filename ,plot_title, data_date, 'west_angelas', show=False)

    print("take the code from ")
    print("ok, now make the qc plot")
    print("ok, now make the qc plot")


    print('ok')



def my_function():
    """
    """
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
