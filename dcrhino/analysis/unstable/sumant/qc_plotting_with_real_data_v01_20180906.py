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


from dcrhino.analysis.graphical.supporting_qc_plots import qc_plot
from dcrhino.analysis.graphical.supporting_qc_plots import QCPlotInputs
from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots import QCBlastholePlotInputs
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.signal_processing.trace_header import define_obspy_trace_header
#from dcrhino.analysis.data_manager.temp_paths import azure_path

azure_path = '/home/sjha/data/datacloud/west_angelas/test_get_data_azure/corr_npy_dump'
#MEASURAND_REGISTRY.print_measurand_registry()
#l1_measurand = MEASURAND_REGISTRY.measurand('level1_npy_piezo')
#ssx_measurand = MEASURAND_REGISTRY.measurand('slamstix_metadata')
#ssx_df = ssx_measurand.load()

#def make_plot():
#    output_directory = os.path.join(azure_path, 'qc_plot_input')
#    output_filename = os.path.join(output_directory, 'test.png')

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
    #    pdb.set_trace()
        traces_filename = '{}_{}_{}.npy'.format(component_label, row.hole, row.digitizer_id)
        pdb.set_trace()
        
        
        #output_directory = os.path.join(azure_path, 'qc_plot_input')
        input_filename = os.path.join(azure_path,traces_filename)
        #output_filename = os.path.join(output_directory, traces_filename)
        #axial_traces = np.load(axial_traces_filename)
        
        trace_array_dict[component_label] = np.load(input_filename)
        
        #'{}{}'.format('peak_ampl_', component_label) = trace_array_dict[component_label]
        
#        pdb.set_trace()
        
         
        print("Step 2: call the plotter")
    peak_ampl_axial = np.random.rand(20,5000)
    peak_ampl_radial = np.random.rand(20,5000)
    peak_ampl_tangential = np.random.rand(20,5000)
    
    lower_num_ms=-5.0
    upper_num_ms=30.0
    qc_plot_input = QCBlastholePlotInputs(trace_array_dict=trace_array_dict,
                                          peak_ampl_x=peak_ampl_axial,
                                          peak_ampl_y=peak_ampl_tangential,
                                          peak_ampl_z=peak_ampl_radial,
                                          lower_number_ms=lower_num_ms, upper_number_ms=upper_num_ms,)
##    qc_plot_input = QCPlotInputs(trace_array_dict=trace_array_dict,
##                                 peak_ampl_x=peak_ampl_axial,
##                                 peak_ampl_y=peak_ampl_tangential,
##                                 peak_ampl_z=peak_ampl_radial,
##                                 peak_mult_x=peak_mult_axial,
##                                 lower_number_ms=lower_num_ms, upper_number_ms=upper_num_ms,)
    data_date = datetime.datetime(2018,8,30)
    qc_plot(qc_plot_input, output_filename , data_date, 'west_angelas', show=True)

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
