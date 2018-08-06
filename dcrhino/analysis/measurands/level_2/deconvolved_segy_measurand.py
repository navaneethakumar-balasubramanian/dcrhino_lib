# -*- coding: utf-8 -*-
"""
Created on Fri Jun 15 19:08:45 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb


from obspy.io.segy.core import _read_segy
from dcrhino.analysis.measurands.borehole_accelerometer_measurand import BoreholeAccelerometerMeasurand
from dcrhino.analysis.signal_processing.seismic_processing import deconvolve_trace
from dcrhino.analysis.supporting_processing import get_dummy_hole_ids_from_segy
from dcrhino.analysis.supporting_processing import get_hole_trace_indices_dict#(dummy_hole_ids, unique_hole_ids)
from dcrhino.common.signal_processing.supporting_segy_processing import sampling_rate_segy_trace
from dcrhino.common.supporting_paths import ensure_dir
#from dcrhino.analysis.supporting_processing import get_segy_trace_by_index

class DeconvolvedSEGY(BoreholeAccelerometerMeasurand):
    """
    Measurand Data Key appears to be digitizer_id and data_date, client_id
    """
    def __init__(self, **kwargs):
        super(DeconvolvedSEGY, self).__init__(**kwargs)
        self.extension = kwargs.get('extension', 'sgy')
        self.deconvolution_filter_duration = kwargs.get('deconvolution_filter_duration',  None)#100ms


    def sensor_directory(self, data_date):
        date_string = data_date.date().__str__()
        sensor_directory = os.path.join(self.data_level_path(), date_string, self.sensor_type)
        print("sensor_directory",sensor_directory)
        #spdb.set_trace()
        return sensor_directory

    @property
    def id_string(self):
        deconvolution_filter_duration_ms = int(1000.0*self.deconvolution_filter_duration)

        return '{}_{}ms_{}'.format(self.label, deconvolution_filter_duration_ms,
                self.parent_measurands[0].id_string)


    def expected_filename(self, data_key):
        """
        TODO: review whether basename should be a method
        """
        digitizer_id = data_key.digitizer_id
        full_stat_path = self.full_path(data_key)

        #pdb.set_trace()
        basename = self.id_string + '_' + digitizer_id + '.' + self.extension
        full_stat_file = os.path.join(full_stat_path, basename)
        return full_stat_file

    def num_decon_taps(self, dt):
        decon_filter_length_taps = int(self.deconvolution_filter_duration/dt)
        if np.remainder(decon_filter_length_taps, 2)==1:
            decon_filter_length_taps+=1
        return decon_filter_length_taps

    def _make_from_parents(self, data_key):#, digitizer_id):
        """
        #TODO: change so that sampling rate is taken from measurand method, not from trace header
        #TODO: Review sanity_check num_traces = st.stats['binary_file_header']['number_of_data_traces_per_ensemble'] with Natal
        #TODO: Modify with an optional argument that returns st and st_orig.copy malloc
        """
#        data_date = data_key.data_date
#        digitizer_id = data_key.digitizer_id
        parent_filename = self.parent_measurands[0].expected_filename(data_key)
        output_filename = self.expected_filename(data_key)
        #pdb.set_trace()
        ensure_dir(os.path.dirname(output_filename))
        print("about to make \n {} \n from \n {}".format(parent_filename, output_filename))
        st = _read_segy(parent_filename)
        dt = 1./sampling_rate_segy_trace(st.traces[0])
#        pdb.set_trace()
#        print(dt)
        decon_filter_length_taps = self.num_decon_taps(dt)

        print("decon_filter_number_of_taps = {}".format(decon_filter_length_taps))
        #st = st_orig.copy()

        #<Sanity checks - these can be moved to Natal's writer>
        num_traces = st.stats['binary_file_header']['number_of_data_traces_per_ensemble']
        print("there are {} traces in this segy file".format(num_traces))
        num_traces = len(st.traces)
        #if num_traces != num_traces2:
        #    logger.error("unexpected trace numbers")
        #    raise Exception
        #</Sanity checks - these can be moved to Natal's writer>

        #pdb.set_trace()
        dummy_hole_ids, unique_hole_ids = get_dummy_hole_ids_from_segy(st)
        #plt.plot(dummy_hole_ids, '*');plt.show()
        hole_trace_indices = get_hole_trace_indices_dict(dummy_hole_ids, unique_hole_ids)

        for hole_id in unique_hole_ids:
            trace_indices = hole_trace_indices[hole_id]
            #pdb.set_trace()
            if hole_id==0:
                hole_traces = [st.traces[i] for i in trace_indices]
            else:
                hole_traces = st.traces[trace_indices[0]: trace_indices[-1]+1]

            for i_trace, trace in enumerate(hole_traces):
                if i_trace % 200 ==0:
                    print("{}-{}, hole {} , i_trace {}".format(data_key.data_date,
                          data_key.digitizer_id,hole_id, i_trace))
#                if hole_id==3:
#                    if i_trace==50000:
#                        pdb.set_trace()
                else:
                    pass
                #master_index = trace_indices[i_trace]#1164
                decon_trace, rxx = deconvolve_trace(trace, decon_filter_length_taps)
        #pdb.set_trace()
        print("about to write SEGY")
        #ensure_dir(os.path.dirname(output_filename))
        st.write(output_filename, format="SEGY")
        return st




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
