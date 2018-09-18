# -*- coding: utf-8 -*-
"""
Created on Thu Sep  6 12:14:02 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

#%matlplotlib qt

from dcrhino.analysis.graphical.supporting_qc_plots import qc_plot
from dcrhino.analysis.graphical.supporting_qc_plots import QCPlotInputs
from dcrhino.analysis.unstable.sumant.supporting_qc_blasthole_plots import QCBlastholePlotInputs
import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.signal_processing.trace_header import define_obspy_trace_header

azure_path = '/home/sjha/data/datacloud/west_angelas/test_get_data_azure/corr_npy_dump'

master_iterator_measurand = MEASURAND_REGISTRY.measurand('master_iterator')
master_iterator_df = master_iterator_measurand.load()

total_number_of_rows = len(master_iterator_df)
pdb.set_trace()
for i_row in range(total_number_of_rows):
        trace_array_dict = {}
        #pdb.set_trace()
#        hole = 83
#        digitizer_id = 5206
        #sub_df = master_iterator_df[master_iterator_df['hole']==83]

        sub_df = master_iterator_df[master_iterator_df.hole]
#        pdb.set_trace()
        sub_df = sub_df[sub_df['digitizer_id']==digitizer_id]
        row = sub_df.iloc[0]
        pdb.set_trace()
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
        
        #pdb.set_trace()
        num_traces_in_blasthole = len(peak_ampl_axial)
        project_id = 'demo'
        for component_label in COMPONENT_LABELS:
            print(component_label)
            traces_filename = '{}_{}_{}.npy'.format(component_label, row.hole, row.digitizer_id)
            input_filename = os.path.join(azure_path,traces_filename)
            output_filename = '{}_{}_{}.png'.format(project_id,row.hole,row.digitizer_id)
            #pdb.set_trace()
            data = np.load(input_filename)
            total_number_of_samples = len(data)
            samples_per_trace = total_number_of_samples // num_traces_in_blasthole
            data = data.reshape(num_traces_in_blasthole, samples_per_trace)
            #pdb.set_trace()
            trace_array_dict[component_label] = data.T
            #total hack!
            trace_array_dict[component_label] = trace_array_dict[component_label][240-12:240+72,:]
             
        print("Step 2: call the plotter")
        pdb.set_trace()
        lower_num_ms=-5.0
        upper_num_ms=30.0
        qc_plot_input = QCBlastholePlotInputs(trace_array_dict=trace_array_dict,
                                      peak_ampl_x=peak_ampl_axial,
                                      peak_ampl_y=peak_ampl_tangential,
                                      peak_ampl_z=peak_ampl_radial,
                                      peak_mult_x=peak_mult_axial,
                                      lower_number_ms=lower_num_ms, upper_number_ms=upper_num_ms,)
        ##    qc_plot_input = QCPlotInputs(trace_array_dict=trace_array_dict,
        ##                                 peak_ampl_x=peak_ampl_axial,
        ##                                 peak_ampl_y=peak_ampl_tangential,
        ##                                 peak_ampl_z=peak_ampl_radial,
        ##                                 peak_mult_x=peak_mult_axial,
        ##                                 lower_number_ms=lower_num_ms, upper_number_ms=upper_num_ms,)
        data_date = datetime.datetime(2018,8,30)
        #output_filename = 'tmp'
        data_date = datetime.datetime(2018,3,3,3,3,3)
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
