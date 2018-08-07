# -*- coding: utf-8 -*-
"""
Created on Mon Jul 23 14:56:43 2018
Read TACELENGTH chunks of data from DATABASE and create a DataUnit object with raw data and the option to interpolate to OUTPUTSAMPLINGRATE. It also
has a the required metadata
@author: Natal
"""
from __future__ import absolute_import, division, print_function
from metadata import Metadata
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import time
import os
import dbconnect as dbc
import pdb
from copy import copy
import math
from time import *
import sys
#from gps import *

#from dcrhino.analysis.signal_processing.firls_bandpass import FIRLSFilter
from firls_bandpass import FIRLSFilter
from seismic_processing import get_num_decon_taps, autocorrelate_trace

import scipy
import scipy.signal as ssig


class DataInterval(object):

    def __init__(self,starttime=datetime.now(),duration=1):
        self._starttime = starttime
        self._duration = duration

    @property
    def starttime(self):
        return self._starttime

    @starttime.setter
    def starttime(self,value):
        self._starttime = value

    @property
    def endtime(self):
        return self._starttime + timedelta(seconds=self._duration)

    def move_to_next_interval(self):
        self._starttime = self.endtime

    def starttime_timestamp(self):
        return int(self.starttime.strftime('%s'))

    def endtime_timestamp(self):
        return int(self.endtime.strftime('%s'))


class DataUnit(object):

    def __init__(self):

       self._parameters = self._read_config_file()
       self.metadata = Metadata()
       self.output_sampling_rate = int(self._parameters["OUTPUTSAMPLINGRATE"]["Value"])
       self.trace_length = int(self._parameters["TRACELENGTH"]["Value"])
       self.channels_per_sensor = int(self._parameters["CHANNELSPERSENSOR"]["Value"])
       self.metadata.deconvolution_filter_duration = float(self._parameters["deconvolution_filter_duration"]["Value"])
       self.metadata.trapezoidal_bpf_corner_1 = float(self._parameters["trapezoidal_bpf_corner_1"]["Value"])
       self.metadata.trapezoidal_bpf_corner_2 = float(self._parameters["trapezoidal_bpf_corner_2"]["Value"])
       self.metadata.trapezoidal_bpf_corner_3 = float(self._parameters["trapezoidal_bpf_corner_3"]["Value"])
       self.metadata.trapezoidal_bpf_corner_4 = float(self._parameters["trapezoidal_bpf_corner_4"]["Value"])
       self.metadata.trapezoidal_bpf_duration = float(self._parameters["trapezoidal_bpf_duration"]["Value"])
       self.metadata.min_lag_trimmed_trace = float(self._parameters["min_lag_trimmed_trace"]["Value"])
       self.metadata.max_lag_trimmed_trace = float(self._parameters["max_lag_trimmed_trace"]["Value"])
       self.axial_axis = self.metadata.sensor_axial_axis
       self.tangential_axis = self.metadata.sensor_tangential_axis
       self.dbconn = dbc.conn()
       self.data_interval = DataInterval(starttime=self.effective_starttime_of_database,duration=self.trace_length)
       self.ideal_timestamps = np.arange(0,self.output_sampling_rate*self.trace_length)*(1.0/self.output_sampling_rate)
#       pdb.set_trace()
#       self.gpsd = gps(mode=WATCH_ENABLE)
       self._fetch_data()




    #Returns a datetime object with the initial second
    @property
    def effective_starttime_of_database(self):
        #get the timestamp of the first full second of the database
#        pdb.set_trace()
        query = "select ts_secs from rhino where ts in (select min(ts) from rhino where ts_micro<={})".format(int(math.ceil(1000000/self.output_sampling_rate)))
#        print(query)
        ts_secs = dbc.query(self.dbconn,query)
        if len(ts_secs)>0:
            return datetime.fromtimestamp(ts_secs[0][2])
        else:
            return datetime.fromtimestamp(int(datetime.now().strftime("%s")))

#        query = "select ts_secs,ts_micro from rhino where ts in (select min(ts) from rhino)"
#        time_components = dbc.query(self.dbconn,query)
#        seconds = int(time_components[0][2])
#        microseconds = int(time_components[0][3])
#        #if the microseconds component is greater than the sampling interval (implies incomplete dataset for that second) will return the next second
#        if microseconds > 1000000.0/self.output_sampling_rate:
#            return datetime.fromtimestamp(seconds + 1)
#        #otherwise return what the the current second
#        else:
#            return datetime.fromtimestamp(seconds)

    @property
    def endtime_of_database(self):
#        pdb.set_trace()
        query = "select max(ts_secs) as ts_secs from rhino"
        ts_secs = dbc.query(self.dbconn,query)
        if len(ts_secs)>0:
            return datetime.fromtimestamp(ts_secs[0][2])
        else:
            return None


    def _read_config_file(self):
        params = pd.read_table("process.config",sep="=",names=["Value"],index_col=0)
        return params.to_dict(orient='index')


    def _fetch_data(self):
        try:
            if self.data_exists_in_database():
#                pdb.set_trace()
                print("fetching {} to {}".format(self.data_interval.starttime,self.data_interval.endtime))
                query = "select ts_secs,ts_micro,x,y from rhino where ts_secs >= {} and ts_secs < {} order by ts_secs,ts_micro".format(self.data_interval.starttime.strftime('%s'),self.data_interval.endtime.strftime('%s'))
                print(query)

                #Fetch data from the database
                raw_data = dbc.query(self.dbconn,query)
                #since the data is coming back as a numpy array with the structure of the dbrhino class, we need to select only the columns we need
                raw_data = raw_data[:,[2,3,6,7]]

                self.axial_data = np.asarray(raw_data[:,int(self.axial_axis)+1],dtype=np.float32)
                self.tangential_data = np.asarray(raw_data[:,int(self.tangential_axis)+1],dtype=np.float32)
                self.digitizer_timestamps = np.asarray((raw_data[:,0]+raw_data[:,1]-self.data_interval.starttime_timestamp())/1000000.0,dtype=np.float32)

            else:
                print("Data Interval not in databse")
                self.axial_data = np.empty(self.output_sampling_rate*self.trace_length,dtype=np.float32)
                self.tangential_data = np.empty(self.output_sampling_rate*self.trace_length,dtype=np.float32)
                self.digitizer_timestamps = np.empty(self.output_sampling_rate*self.trace_length,dtype=np.float32)
                return
#                raise ValueError ("Data Interval not in databse")


            number_of_samples_in_trace = len(raw_data)
            ideal_number_of_samples_in_trace = self.output_sampling_rate*self.trace_length

            #Fill out processing related headers
            self.metadata.digitizer_time_of_last_sample_in_trace = self.data_interval.starttime + timedelta(microseconds=self.digitizer_timestamps[-1]*1000000)
            self.metadata.ideal_time_of_last_sample_in_trace = self.data_interval.starttime + timedelta(microseconds=self.ideal_timestamps[-1]*1000000)
            self.metadata.sensor_true_sampling_rate = number_of_samples_in_trace/self.trace_length
            self.metadata.data_processing_sampling_rate = self.output_sampling_rate
            self.metadata.trace_length = self.trace_length
            self.metadata.sample_interval_duration = 1.0/self.output_sampling_rate
            self.metadata.number_of_samples_in_this_trace = ideal_number_of_samples_in_trace
            self.metadata.datetime_data_recorded = self.data_interval.starttime
#            pdb.set_trace()
#            self.metadata.gps_latitude = self.gpsd.fix.latitude
#            self.metadata.gps_longitude = self.gpsd.fix.longitude
#            self.metadata.gps_elevation = self.gpsd.fix.altitude
#            self.metadata.gps_timestamp = self.gpsd.fix.time

            return
        except:
            print("Error Fetching Data")
            print(sys.exc_info())

    def move_to_next_data_interval(self):
#        pdb.set_trace()
        #Will look in the database if data for the next consecutive interval exists in the database
        query = "select count(ts_micro) as ts_micro from rhino where ts_secs ={}".format(self.data_interval.endtime_timestamp())
        count = dbc.query(self.dbconn,query)[0][3]

        #if there is is data for that interval, go to the next consecutive interval.  Otherwise will query to find which is the next available full second
        if count > 0:
            self.go_to_specific_interval(self.data_interval.endtime)
        else:
            query = "select ts_secs from rhino where ts in (select min(ts) from rhino where ts_secs>{} and ts_micro<={})".format(self.data_interval.endtime_timestamp(),int(math.ceil(1000000/self.output_sampling_rate)))
#            print(query)
            ts_secs = dbc.query(self.dbconn,query)[0][2]
            self.go_to_specific_interval(datetime.fromtimestamp(ts_secs))
        return

    def interpolate_data(self, data):
        interp_data = np.interp(self.ideal_timestamps,self.digitizer_timestamps,data)
        return interp_data

    @property
    def num_taps_in_decon_filter(self):
        """
        TODO: confirm type is int returned by get_num_decon_taps()
        """
        sampling_rate = float(self.metadata.data_processing_sampling_rate)
        deconvolution_filter_duration = float(self.metadata.deconvolution_filter_duration)
        number_of_taps_in_decon_filter = get_num_decon_taps(deconvolution_filter_duration, sampling_rate)
        return number_of_taps_in_decon_filter

    def deconvolve_trace(self, data):
        """
        config file elements:
            deconvolution_filter_duration, sampling_rate
        TODO: add logging message when error in inversion
        TODO: factor all operations out and use a base fcn in
        seismic processing which takes data, sampling_rate, decon_filter_duration
        as three arguments.
        """
        #pdb.set_trace()
        sampling_rate = float(self.metadata.data_processing_sampling_rate)
        deconvolution_filter_duration = float(self.metadata.deconvolution_filter_duration)
        R_xx = autocorrelate_trace(data, self.num_taps_in_decon_filter)
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

    def correlate_trace(self, original_data, decon_data):
        correlated_trace = np.correlate(original_data, decon_data, 'same')
        return correlated_trace

    def bandpass_filter_trace(self, data):
        """
        TODO: calculate fir_taps once per header and leave fixed ...
        """
        sampling_rate = float(self.metadata.data_processing_sampling_rate)
        corners = [self.metadata.trapezoidal_bpf_corner_1,
                   self.metadata.trapezoidal_bpf_corner_2,
                   self.metadata.trapezoidal_bpf_corner_3,
                   self.metadata.trapezoidal_bpf_corner_4,]
        fir_duration = self.metadata.trapezoidal_bpf_duration# = 0.02

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

    def trim_trace(self, data):
        """
        add min_lag and max_lag
        """
        min_lag = self.metadata.min_lag_trimmed_trace
        max_lag = self.metadata.max_lag_trimmed_trace
        zero_time_index = len(data) // 2
        decon_filter_offset = self.num_taps_in_decon_filter // 2
        t0_index = zero_time_index + decon_filter_offset #2750
        sampling_rate = float(self.metadata.data_processing_sampling_rate)
        n_samples_back = int(sampling_rate * np.abs(min_lag))
        n_samples_fwd = int(sampling_rate * max_lag)

        back_ndx = t0_index - n_samples_back
        fin_ndx = t0_index + n_samples_fwd

        little_data = data[back_ndx:fin_ndx]
        return little_data

    def go_to_specific_interval(self,date_time):
        self.data_interval.starttime = date_time
        self._fetch_data()
        return

    def data_exists_in_database(self):
#        pdb.set_trace()
        query = "select count(ts_secs) as ts_secs from rhino"
        count = dbc.query(self.dbconn,query)[0][2]
        if count > self.output_sampling_rate*self.trace_length:
            return True
        else:
            self.data_interval.starttime = self.effective_starttime_of_database
            return False

    def data_interval_in_database(self):
        if self.data_interval.starttime >= self.effective_starttime_of_database and self.data_interval.endtime < self.endtime_of_database:
            return True
        else:
            return False

    @property
    def status(self):
        return self._status





