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


import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS

MEASURAND_REGISTRY.print_measurand_registry()
#l1_measurand = MEASURAND_REGISTRY.measurand('level1_npy_piezo')
#ssx_measurand = MEASURAND_REGISTRY.measurand('slamstix_metadata')
#ssx_df = ssx_measurand.load()

master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
master_iterator_df = master_iterator_measurand.load()

total_number_of_rows = len(master_iterator_df)

for i_row in range(total_number_of_rows):
    trace_array_dict = {}
    row = master_iterator_df.iloc[i_row]
    print(i_row, row)
    print("Make the qc plot: Step 1 get the data")
    print("load the 'trace header'")
    print("skipping'trace header' until karl hands off the data")
    print("load correlated traces")
    for component_label in COMPONENT_LABELS:
        print(component_label)
        pdb.set_trace()
        traces_filename = '{}_{}_{}.npy'.format(component_label, row.hole, row.digitizer_id)
        #axial_traces = np.load(axial_traces_filename)
        trace_array_dict[component_label] = np.load(traces_filename)


    print("Step 2: call the plotter")
#      lower_num_ms=-5.0
#    upper_num_ms=30.0
#    qc_plot_input = QCBlastholePlotInputs(trace_array_dict=trace_array_dict,
#                                 peak_ampl_x=peak_ampl_axial,
#                                 peak_ampl_y=peak_ampl_tangential,
#                                 peak_ampl_z=peak_ampl_radial,
#                                 peak_mult_x=peak_mult_axial,
#                                 lower_number_ms=lower_num_ms, upper_number_ms=upper_num_ms,)
##    qc_plot_input = QCPlotInputs(trace_array_dict=trace_array_dict,
##                                 peak_ampl_x=peak_ampl_axial,
##                                 peak_ampl_y=peak_ampl_tangential,
##                                 peak_ampl_z=peak_ampl_radial,
##                                 peak_mult_x=peak_mult_axial,
##                                 lower_number_ms=lower_num_ms, upper_number_ms=upper_num_ms,)
#    data_date = datetime.datetime(2018,8,30)
#    qc_plot(qc_plot_input, output_filename , data_date, 'west_angelas', show=True)

    print("take the code from ")
    print("ok, now make the qc plot")
    print("ok, now make the qc plot")

pdb.set_trace()
print('ok')
#home = os.path.expanduser("~/")


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
