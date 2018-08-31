# -*- coding: utf-8 -*-
"""
Created on Thu Aug 30 12:32:21 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

import dcrhino.analysis.measurands.measurand_registry_west_angelas as MEASURAND_REGISTRY

from dcrhino.analysis.graphical.supporting_qc_plots import qc_plot
from dcrhino.analysis.graphical.supporting_qc_plots import QCPlotInputs
from dcrhino.analysis.instrumentation.rhino import COMPONENT_LABELS
from dcrhino.analysis.measurands.keys.data_key import DigitizerSamplingRateDateDataKey
from dcrhino.analysis.measurands.level_2.supporting_level_2_segy import TraceHeaderAttributes
#from dcrhino.collection.IDEtoSEGY.trace_header import define_obspy_trace_header
from dcrhino.analysis.signal_processing.trace_header import define_obspy_trace_header
define_obspy_trace_header()
#pdb.set_trace()
#home = os.path.expanduser("~/")
measurand_label = 'correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_20ms_deconvolved_sgy_100ms_level1_sgy_piezo'
corr_measurand = MEASURAND_REGISTRY.measurand(measurand_label)
dummy_data_date = datetime.datetime(2018, 7, 6)
dummy_digitizer_id = '20180706_SSX13402_5451_Ch08'
sampling_rate = 3200.0
data_key = DigitizerSamplingRateDateDataKey(dummy_digitizer_id, dummy_data_date, sampling_rate )
qq = corr_measurand.expected_filename(data_key)
#corr_measurand.to_qc_plot(data_key, show=True)#st=corr_stream)
#pdb.set_trace()
print(qq)
from dcrhino.analysis.data_manager.temp_paths import cache_path
output_directory = os.path.join(cache_path, 'qc_plot_input')
output_filename = os.path.join(output_directory, 'dogs.png')
trace_array_dict = {}
for component_label in COMPONENT_LABELS:
    component_filename = os.path.join(output_directory, '{}.npy'.format(component_label))
    trace_array_dict[component_label] = np.load(component_filename)
#num_traces_per_component = trace_array_dict['axial'].shape[1]
#trace_header_attributesTraceHeaderAttributes(num_traces_per_component)
    full_file = os.path.join(output_directory, '{}.npy'.format('peak_ampl_axial'))
    peak_ampl_axial = np.load(full_file)
    full_file = os.path.join(output_directory, '{}.npy'.format('peak_ampl_tangential'))
    peak_ampl_tangential = np.load(full_file)
    full_file = os.path.join(output_directory, '{}.npy'.format('peak_ampl_radial'))
    peak_ampl_radial = np.load(full_file)
    full_file = os.path.join(output_directory, '{}.npy'.format('peak_mult_axial'))
    peak_mult_axial = np.load(full_file)
#    full_outfile = os.path.join(output_directory, '{}.npy'.format('peak_ampl_tangential'))
#    np.save(full_outfile, trace_header_attributes.peak_ampl_tangential)
#    full_outfile = os.path.join(output_directory, '{}.npy'.format('peak_ampl_radial'))
#    np.save(full_outfile, trace_header_attributes.peak_ampl_radial)
#    full_outfile = os.path.join(output_directory, '{}.npy'.format('peak_mult_axial'))
#    np.save(full_outfile, trace_header_attributes.peak_mult_axial)
lower_num_ms=-5.0
upper_num_ms=30.0
qc_plot_input = QCPlotInputs(trace_array_dict=trace_array_dict,
                             peak_ampl_x=peak_ampl_axial,
                             peak_ampl_y=peak_ampl_tangential,
                             peak_ampl_z=peak_ampl_radial,
                             peak_mult_x=peak_mult_axial,
                             lower_number_ms=lower_num_ms, upper_number_ms=upper_num_ms,)
#qc_plot_input = QCPlotInputs(trace_array_dict=trace_array_dict,
#                             peak_ampl_x=trace_header_attributes.peak_ampl_axial,
#                             peak_ampl_y=trace_header_attributes.peak_ampl_tangential,
#                             peak_ampl_z=trace_header_attributes.peak_ampl_radial,
#                             peak_mult_x=trace_header_attributes.peak_mult_axial,
#                             lower_number_ms=lower_num_ms, upper_number_ms=upper_num_ms,
#                             center_trace_dict=center_trace_dict,
#                             two_way_travel_time_ms=theoretical_two_way_travel_time*1000.,
#                             multiple_search_back_ms=self.multiple_search_back_ms,
#                             multiple_search_forward_ms=self.multiple_search_forward_ms)
#pdb.set_trace()
data_date = datetime.datetime(2018,8,30)
qc_plot(qc_plot_input, output_filename , data_date, 'west_angelas', show=True)


plt.subplot(3, 1, 1)
plt.plot(np.random.rand(33))
plt.subplot(3, 1, 2)
plt.plot(np.random.rand(313))
plt.subplot(3, 1, 3)
plt.plot(np.random.rand(433))
plt.show()
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
