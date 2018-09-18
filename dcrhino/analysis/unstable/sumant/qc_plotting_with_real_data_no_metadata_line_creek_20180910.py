# -*- coding: utf-8 -*-
"""
Created on Thu Sep  6 12:14:02 2018

@author: kkappler

This script is dedicated to a "quick-n-dirty" QC of some field data we are getting in.

We do not have MWD.  Therefore we do not know when blastholes are being drilled ... 
we just want a cursory look at the data.

The input file we are plotting 20180910  16:55:26 --> 17:54:52
spans approximately 1Hour. 


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

#azure_path = '/home/sjha/data/datacloud/west_angelas/test_get_data_azure/corr_npy_dump'

data_path = '/home/sjha/data/datacloud/line_creek/level_1/piezo/S1008/2800hz'
project_id='line_creek'
sampling_rate = 2800
trace_array_dict = {}
for component_label in COMPONENT_LABELS:
    print(component_label)
    traces_filename = 'corr20180910T165526-20180910T175452.npy'#{}_{}_{}.npy'.format(component_label, row.hole, row.digitizer_id)
    
    input_filename = os.path.join(data_path,'{}'.format(component_label),traces_filename)
    
    print(input_filename)
    #pdb.set_trace()
    output_filename = '{}.png'.format(project_id)
    #pdb.set_trace()
    data = np.load(input_filename)
    total_number_of_samples = len(data)
    #pdb.set_trace()
    #pdb.set_trace()
    trace_array_dict[component_label] = data.T
    #total hack
#        pdb.set_trace()
    if sampling_rate == 2400:
        trace_array_dict[component_label] = trace_array_dict[component_label][240-12:240+72,:]
    elif sampling_rate == 2800:
        trace_array_dict[component_label] = trace_array_dict[component_label][280-14:280+84,:]    
    elif sampling_rate == 3200:
        trace_array_dict[component_label] = trace_array_dict[component_label][320-16:320+96,:]


    if component_label=='axial':
        peak_ampl_axial=np.max(data, axis=1)
    if component_label=='tangential':
        peak_ampl_tangential=np.max(data, axis=1)
    if component_label=='radial':
        peak_ampl_radial=np.max(data, axis=1)
    peak_mult_axial = np.zeros(peak_ampl_axial.shape)
        #pdb.set_trace()
        #print('?')
print("Step 2: call the plotter")
#pdb.set_trace()
lower_num_ms=-5.0
upper_num_ms=30.0
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

#pdb.set_trace()
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
