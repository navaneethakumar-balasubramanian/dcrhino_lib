# -*- coding: utf-8 -*-
"""
20180904: this is a one-off script intended to arm Sumant with the data needed to
crank out "hole-by-hole" qc-plots

20180906: got the traces.  need to add the "trace header data"

@author: kkappler


"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb


from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS# = ['axial', 'tangential', 'radial']
from dcrhino.analysis.measurands.level_2.supporting_level_2_segy import TraceHeaderAttributes
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.signal_processing.trace_header import define_obspy_trace_header
from dcrhino.analysis.supporting_processing import concatenate_traces
from dcrhino.analysis.util.general_helper_functions import init_logging
from dcrhino.analysis.util.interval import TimeInterval

from supporting_v02_processing import get_old_data_key


logger = init_logging(__name__)
home = os.path.expanduser("~/")
mwd_measurand = MEASURAND_REGISTRY.measurand('mwd_with_mse')
hole_profile_df = mwd_measurand.load()
master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
df_master = master_iterator_measurand.load()

define_obspy_trace_header()
MEASURAND_REGISTRY.print_measurand_registry()
ssx_measurand = MEASURAND_REGISTRY.measurand('slamstix_metadata')
ssx_df = ssx_measurand.load()

corr_measurand_id = 'correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_20ms_deconvolved_sgy_100ms_level1_sgy_piezo'
corr_measurand = MEASURAND_REGISTRY.measurand(corr_measurand_id)


def get_holes_by_drill_and_time_interval(drill_id, time_interval):
    """
    """
    holes_by_this_drill = df_master[df_master.drill_rig_id==drill_id]
    holes_by_this_drill = df_master[df_master.drill_rig_id==drill_id]
    holes_by_this_drill = holes_by_this_drill[holes_by_this_drill['time_start']>=time_interval.lower_bound]
    holes_by_this_drill = holes_by_this_drill[holes_by_this_drill['time_end']<=time_interval.upper_bound]
    return holes_by_this_drill

def convert_l2segy_to_l2npy():
    """
    """

    n_l1_sgy_files = len(ssx_df)
    #pdb.set_trace()
    for i_row in range(n_l1_sgy_files):
        print('irow = {}'.format(i_row))
        row = ssx_df.iloc[i_row]

        print('make a list of all the holes that are in this file')
        print('do this by identifying the drill ')
        drill_id = row.drill_rig_id
        parent_file_time_interval = TimeInterval(lower_bound=row.time_start,
                                                 upper_bound=row.time_end)

        old_l1_data_key = get_old_data_key(row)
        sub_iterator = get_holes_by_drill_and_time_interval(drill_id, parent_file_time_interval)
        number_of_blastholes = len(sub_iterator)
        #pdb.set_trace()
        #hole_ids = set()
        if 83 not in set(sub_iterator.hole):
            continue
        if len(sub_iterator) == 0:
            continue
        #qq=df_master[df_master.drill_rig_id=='21R15']

        #pdb.set_trace()
        print('loading...')
        st = corr_measurand.load(old_l1_data_key)
        pdb.set_trace()


        trace_array_dict = {}
        for component_label in COMPONENT_LABELS:
            trace_array_dict[component_label] = concatenate_traces(st, component_label, output_shape='1d')
        num_samples_per_trace = len(st.traces[0].data)
        num_traces_per_component = len(trace_array_dict['axial']) // num_samples_per_trace
        trace_header_attributes = TraceHeaderAttributes(num_traces_per_component)
        trace_header_attributes.populate_from_stream(st)

        number_of_blastholes = len(sub_iterator)
        for i_blasthole in range(number_of_blastholes):
            print('identify the start and end time of this blasthole \
                  and then the trace id.  ')
            hole_row = sub_iterator.iloc[i_blasthole]
            time_to_seek_into_file = hole_row.time_start-parent_file_time_interval.lower_bound
            num_traces_to_seek = int(np.round(time_to_seek_into_file.total_seconds()))
            hole_time_interval = TimeInterval(lower_bound=hole_row.time_start, upper_bound=hole_row.time_end)
            num_seconds_to_read = int(hole_time_interval.duration())

            start_sample = int(num_samples_per_trace * num_traces_to_seek)
            final_sample = int(num_samples_per_trace * (num_traces_to_seek+num_seconds_to_read))
            for component_label in COMPONENT_LABELS:

                traces_array = trace_array_dict[component_label][start_sample:final_sample]
                out_basename = '{}_{}_{}.npy'.format(component_label, hole_row.hole, row.digitizer_id)
                #
                #out_folder = os.path.join(home, 'data', 'datacloud', 'west_angelas', 'corr_npy_dump' )
                out_folder = '/data_sdd/west_angelas/corr_npy_dump/'
                out_filename = os.path.join(out_folder, out_basename)
                np.save(out_filename, traces_array)
            #pdb.set_trace()
            first_trace_index = num_traces_to_seek
            final_trace_index = num_traces_to_seek+num_seconds_to_read
            out_basename = 'peak_ampl_axial_{}_{}.npy'.format(hole_row.hole, row.digitizer_id)
            out_filename = os.path.join(out_folder, out_basename)
            np.save(out_filename, trace_header_attributes.peak_ampl_axial[first_trace_index:final_trace_index])

            out_basename = 'peak_ampl_tangential_{}_{}.npy'.format(hole_row.hole, row.digitizer_id)
            out_filename = os.path.join(out_folder, out_basename)
            np.save(out_filename, trace_header_attributes.peak_ampl_tangential[first_trace_index:final_trace_index])
            out_basename = 'peak_ampl_radial_{}_{}.npy'.format(hole_row.hole, row.digitizer_id)
            out_filename = os.path.join(out_folder, out_basename)
            np.save(out_filename, trace_header_attributes.peak_ampl_radial[first_trace_index:final_trace_index])
            out_basename = 'peak_mult_axial_{}_{}.npy'.format(hole_row.hole, row.digitizer_id)
            out_filename = os.path.join(out_folder, out_basename)
            np.save(out_filename, trace_header_attributes.peak_mult_axial[first_trace_index:final_trace_index])






def main():
    """
    """
    convert_l2segy_to_l2npy()
#    process_from_ssx_csv_2_eda()
#    pdb.set_trace()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
