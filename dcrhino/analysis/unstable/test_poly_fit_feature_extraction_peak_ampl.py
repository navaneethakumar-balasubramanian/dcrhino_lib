# -*- coding: utf-8 -*-
"""
Created on Mon Jun 18 13:18:30 2018

@author: kkappler

interpolating peak amplitude, peak time, multiples amplitude and multiple time....
Karl,

I am thinking that the interpolation is pretty easy....

1) fit an 11 sample polynomial centered around an initial first estimate (nearest sample)  of the two peak times

2) find the four parameters identified in the subject header at whatever numerical accuracy we want--I guess floating point precision

3) output into segy headers (so there are two new values--peak and multiple time.

I think its simple

jamie

Thoughts:
    -If we may be dealing with phase shifts should I take max(abs(trace))
    rather than max(trace)?  Also, we could rotate phase through a bunch of
    angles and search max phase in that space ...
    -
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb
import time

from obspy.io.segy.segy import iread_segy

import dcrhino.analysis.measurands.measurand_registry_mont_wright as MEASURAND_REGISTRY
from dcrhino.analysis.measurands.keys.data_key import DigitizerDateDataKey
from dcrhino.common.signal_processing.supporting_segy_processing import get_segy_sampling_rate
from dcrhino.analysis.supporting_processing import get_segy_trace_by_index
from dcrhino.analysis.signal_processing.seismic_processing import max_multiple_amplitude
from dcrhino.analysis.signal_processing.seismic_processing import max_multiple_amplitude2
from dcrhino.analysis.signal_processing.seismic_processing  import max_reflection_amplitude#(trace
from dcrhino.analysis.signal_processing.seismic_processing import max_reflection_amplitude2#(trace
from dcrhino.analysis.signal_processing.interpolation import sinc_interp#(x, s, u):


from dcrhino.collection.IDEtoSEGY.trace_header import define_obspy_trace_header
define_obspy_trace_header()


def configure_processing_run():
    """
    """
    level_1_measurand_id = 'level1_sgy_piezo'
    decon_measurand_id = 'deconvolved_sgy_100ms_level1_sgy_piezo'
    corr_measurand_id = 'correlated_minlag-0.1-maxlag0.1_firls_80-100-300-350_N65_deconvolved_sgy_100ms_level1_sgy_piezo'
    level_1_measurand = MEASURAND_REGISTRY.measurand(level_1_measurand_id)
    #corr_measurand_id = 'correlated_minlag-0.1-maxlag0.1_firls_None_N1_deconvolved_sgy_100ms_level1_sgy_piezo'
    decon_measurand = MEASURAND_REGISTRY.measurand(decon_measurand_id)
    corr_measurand = MEASURAND_REGISTRY.measurand(corr_measurand_id)


    start_date = datetime.date(2018, 5, 29)
    end_date = datetime.date(2018, 5, 31)
    date_range = pd.date_range(start=start_date, end=end_date)

    #<Execute Processing>
    for data_datetime in date_range:
        data_date = data_datetime.date()
        print("data_date = {}".format(data_date))
        dummy_digitizer_ids = []
        level1_file_list = level_1_measurand.available_files_to_process(data_date)
        for full_segy_l1 in level1_file_list:
            dummy_digitizer_id = os.path.basename(full_segy_l1)[:-4]
            dummy_digitizer_ids.append(dummy_digitizer_id)
            #print(os.path.basename(full_segy_l1))
        #pdb.set_trace()
        print("\n\n\n\n")
        #for digitizer_id in dummy_digitizer_ids:
        for digitizer_id in dummy_digitizer_ids[3:]:
            print("data_date = {}  digitizer {}".format(data_date, digitizer_id))
            #pdb.set_trace()
            data_key = DigitizerDateDataKey(digitizer_id, data_date)
            #print(level_1_measurand.expected_filename(data_key))
            #print(decon_measurand.expected_filename(data_key))
            #print(corr_measurand.expected_filename(data_key))
            #decon_measurand.make(data_key)#data_date, 'SSX50598.sgy')
            #corrq = corr_measurand.make(data_key)
            #corr_measurand.to_qc_plot(data_key, st=corrq)
            #pdb.set_trace()
            dummy_hole_ids = np.zeros(1000000, dtype=int)
            full_segy_file = corr_measurand.expected_filename(data_key)
            sampling_rate = get_segy_sampling_rate(full_segy_file)
            #dhi = get_dummy_hole_ids_from_segy_file(full_segy_file)
            #plt.plot(dhi); plt.show()
            #pdb.set_trace()
            print(sampling_rate)
            trace_index = 4000
            tr = get_segy_trace_by_index(full_segy_file, trace_index)
            #pdb.set_trace()
            max_ampl = max_reflection_amplitude(tr)
            max_ampl_ndx = np.argmax(tr.data) # this returns an index ...
            max_ampl2, max_ampl_ndx2 = max_reflection_amplitude2(tr)

            #max_ampl_ndx = np.argmax(tr.data) # this returns an index ...
            pdb.set_trace()
            plot_max_mult = False
            mma, mmi = max_multiple_amplitude(tr, plot=plot_max_mult)
            mma2, mmi2 = max_multiple_amplitude2(tr, plot=plot_max_mult)
            pdb.set_trace()
            t0 = time.time()
            qq = sinc_interp(tr.data, np.arange(640), np.arange(6400)/10.)
            print(time.time()-t0)
            roi = tr.data[max_ampl_ndx-10:mmi+30]

            t0 = time.time()
            qq = sinc_interp(roi, np.arange(len(roi)), np.arange(10*len(roi))/10.)
            print(time.time()-t0)
            plt.figure(22)
            pdb.set_trace()
            for i,tr in enumerate(iread_segy(full_segy_file)):
                dummy_hole_ids[i] = tr.stats.segy.trace_header.dummy_hole_id
                print(i)
                print(tr.stats.segy.trace_header.dummy_hole_id)
                pdb.set_trace()
#    tf = tr.stats.segy.textual_file_header
#    bf = tr.stats.segy.binary_file_header
#    tfe = tr.stats.segy.textual_file_header_encoding
#    de = tr.stats.segy.data_encoding
#    e = tr.stats.segy.endian
#    # Also do something meaningful with each Trace.
##    print(int(tr.data.sum()))
#dummy_hole_ids = dummy_hole_ids[0:i+1]
#print(len(dummy_hole_ids), i)
#pdb.set_trace()
#print("now what?")
##home = os.path.expanduser("~/")
#            pass
#    #<Execute Processing>
#
#
#segy_path = os.path.join(home, 'data/datacloud/mont_wright/level_1/2018-05-30/piezo')
#segy_basename = '20180530_SSX50339_Ch08.sgy'
#
#full_segy_file = os.path.join(segy_path, segy_basename)
#sampling_rate = get_segy_sampling_rate(full_segy_file)
#print(sampling_rate)
#
#dummy_hole_ids = np.zeros(1000000, dtype=int)
#for i,tr in enumerate(iread_segy(full_segy_file)):
#    dummy_hole_ids[i] = tr.stats.segy.trace_header.dummy_hole_id
#    print(i)
##    if i % 100  == 0:
##        print(i)
###    print(tr.stats.segy.trace_header.dummy_hole_id)
###    # Each Trace's stats attribute will have references to the file
###    # headers and some more information.
###    print(i)
#    pdb.set_trace()
##    tf = tr.stats.segy.textual_file_header
##    bf = tr.stats.segy.binary_file_header
##    tfe = tr.stats.segy.textual_file_header_encoding
##    de = tr.stats.segy.data_encoding
##    e = tr.stats.segy.endian
##    # Also do something meaningful with each Trace.
###    print(int(tr.data.sum()))
#dummy_hole_ids = dummy_hole_ids[0:i+1]
#print(len(dummy_hole_ids), i)
#pdb.set_trace()
#print("now what?")
##home = os.path.expanduser("~/")


def my_function():
    """
    """
    pass

def main():
    """
    """
    configure_processing_run()
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
