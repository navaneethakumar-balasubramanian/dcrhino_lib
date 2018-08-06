# -*- coding: utf-8 -*-
"""
Created on Thu Jun 07 14:54:29 2018
@author: Natal
"""
from __future__ import absolute_import, division, print_function
from datetime import datetime,timedelta
import sys
#import csv
from obspy import Trace, Stream
from obspy.core import AttribDict
from obspy.io.segy.segy import SEGYTraceHeader, SEGYBinaryFileHeader
from trace_header import define_obspy_trace_header #This module needs to remain here in order to redefine the trace headers
define_obspy_trace_header()
import numpy
import matplotlib.pyplot as plt
import pandas as pd
import rhino#This module needs to remain here in order to use the RHINO Object
import path_manager as pm
import os
import pdb

#==============================================================================
#QUICK FIXES
#==============================================================================
#These quick fixes are used to pass values from ide2segy that can't be passed as arguments

def initBivariates(value):
    global NOBIVARIATES
    NOBIVARIATES = value

def initTraceLength(value=1):
    global TRACELENGTH
    TRACELENGTH = value

def initExpectedSampleRate(value=3200):
    global EXPECTEDSAMPLERATE
    EXPECTEDSAMPLERATE = value

#==============================================================================
#Functions
#==============================================================================
def CreateSampleTime(microseconds,origin):
        time = datetime.utcfromtimestamp(origin)
        time = time + timedelta(microseconds = microseconds)
        return time

def similar_sampling_rates(sr,expected_sr):
    #if the real sampling rate is within +- 1% of the expected sampling rate whe consider them similar
    margin_error = .01 # 1%
    if sr > (1-margin_error) * expected_sr and sr < (1+margin_error) * expected_sr:
        return True
    else:
        return False

#==============================================================================
#Classes
#==============================================================================

class Interval():
    StartTime = None
    EndTime = None

    def __init__(self, start_time, end_time):
        self.StartTime = start_time
        self.EndTime = end_time
#TODO: redefine what inclusive or exclusive means
    def InInterval(self,time,inclusive):
        #pdb.set_trace()
        self.StartTime = self.StartTime - timedelta(microseconds = self.StartTime.microsecond)
        self.EndTime = self.EndTime - timedelta(microseconds = self.EndTime.microsecond)
        if inclusive:
            if time >= self.StartTime and time < self.EndTime:
                return True
        else:
            if time > self.StartTime and time < self.EndTime:
                return True
        return False

    def MicrosecondsFromStartSecond(self,time):
        elapsed_seconds = (time - self.StartTime).seconds
        return time.microsecond + elapsed_seconds*1000000

    def Duration(self):
        return self.EndTime - self.StartTime

    def Interval(self):
        print ("From " + str(self.StartTime) + " to " + str(self.EndTime))


class SEGY():
    ensemble = 1
    segy_traces = [1,2,3]
    current_ensemble_time = None
    #TODO: when reading the trace length as an argument, it is necessary to make sure that the length is indeed achievable with the sampling rate
    interval = None
    samples_in_trace = 0
    sample_microsecond = 0
    total_traces = 0
    line = 1
    blasthole = 0
    mwd_columns = ["hole","collar_elevation","time_start_utc","start_depth","mse","rpm","weight_on_bit","torque","rop","air_pressure","vibration","blastability","northing", "easting"]
    empty_row = pd.Series([0,0,0,0,0,0,0,0,0,0,0,0,0,0],index=mwd_columns)
    trace_mwd_row = empty_row
    max_trace_amplitude = []
    min_trace_amplitude = []

    def __init__ (self, sr, Rhino):

        #Make sure that the file was recorded in the same sampling rate that we are expecting
        if (similar_sampling_rates(sr,EXPECTEDSAMPLERATE)):
            self.sampling_rate = sr
        else:
            print("Expected sampling rate is %s Hz, but the file was recorded at %s Hz. Check the expected sampling rate and try again" % (EXPECTEDSAMPLERATE, sr))
            #TODO: Keep a log of this
            sys.exit(0)


        self.trace_length = TRACELENGTH
        self.trace_data = numpy.zeros((int(self.sampling_rate*self.trace_length),3),dtype=numpy.float32)
        self.stream = Stream()
        self.Rhino = Rhino

        drill_id,self.sensor = Rhino.GetSensorWithFile(Rhino.Current_File)
        self.drill = Rhino.Mine.Drills[drill_id]
        self.drill_times = self.sensor.Files[Rhino.Current_File].Blastholes
        self.drill_times["StartTime"] = pd.to_datetime(self.drill_times["StartTime"])
        self.drill_times["EndTime"] = pd.to_datetime(self.drill_times["EndTime"])
        #self.dummy_time = pd.to_datetime("2018-05-06T21:30:00")

    #get the blasthole number from the self.drill_times based on the current ensemble time
    def get_blasthole(self):
        #if self.current_ensemble_time >= pd.to_datetime("2018-05-30T14:14:40"):
            #pdb.set_trace()
        bh = self.drill_times[self.drill_times["StartTime"]<=self.current_ensemble_time]
        bh = bh[bh["EndTime"]>=self.current_ensemble_time]
        if len(bh) != 1:
            return 0
        else:
           return bh["Blasthole"].iloc[0]

    def addSample(self,sample_data,utcStartTime):
        try:
            sample_data = sample_data.split(',')
            self.sample_microsecond = float(sample_data[0])
            #sample_time = datetime.utcfromtimestamp(utcStartTime)
            #sample_time = sample_time + timedelta(microseconds = self.sample_microsecond)
            sample_time = CreateSampleTime(self.sample_microsecond,utcStartTime)
            if(self.current_ensemble_time == None):
                self.current_ensemble_time = sample_time
                self.current_ensemble_time = self.current_ensemble_time - timedelta(microseconds = self.current_ensemble_time.microsecond)
                self.interval = Interval(self.current_ensemble_time, self.current_ensemble_time + timedelta(seconds=self.trace_length))
            #if the sample time is in the trace_interval then add the sample to the trace data
            if(self.interval.InInterval(sample_time,inclusive=True)):
                sample_row = int(self.interval.MicrosecondsFromStartSecond(sample_time)//(1000000.0/self.sampling_rate))
                self.trace_data[sample_row]=sample_data[1:]
                self.samples_in_trace += 1
            else:
                self.Add_Ensemble_to_Stream()
                self.trace_mwd_row = self.empty_row
                self.trace_data = numpy.zeros((int(self.sampling_rate*self.trace_length),3),dtype=numpy.float32)
                self.current_ensemble_time = sample_time
                self.current_ensemble_time = self.current_ensemble_time - timedelta(microseconds = self.current_ensemble_time.microsecond)
                self.interval = Interval(self.current_ensemble_time, self.current_ensemble_time + timedelta(seconds=self.trace_length))
                sample_row = int(self.interval.MicrosecondsFromStartSecond(sample_time)//(1000000.0/self.sampling_rate))
                self.trace_data[sample_row]=sample_data[1:]
                self.samples_in_trace = 1
        except:
            print("Add Sample Error")
            print(sys.exc_info())

    def Add_Ensemble_to_Stream(self):
        try:
            #numpy.savetxt(str(self.ensemble)+".csv",self.trace_data,delimiter=",") #Save data for troubleshooting
            max_amp = [0,0,0]
            min_amp = [0,0,0]
            for t in range(0,3):
                trace = Trace(data=self.trace_data[:,t])
                max_amp[t] = max(trace.data)
                min_amp[t] = min(trace.data)

                trace.stats.segy = {}
                trace.stats.sampling_rate = self.sampling_rate #This automatically sets the delta attribute
                #trace.stats.delta = 1.0/self.SAMPLING_RATE # this is automatically set on the previous line
                trace.stats.starttime = self.current_ensemble_time
                trace.stats.channel = t+1 #1 for X, 2 for Y, 3 for Z
                trace.stats.segy.trace_header = SEGYTraceHeader()
                trace.stats.segy.trace_header.trace_sequence_number_within_line = self.segy_traces[t]
                trace.stats.segy.trace_header.ensemble_number=self.ensemble
                trace.stats.segy.trace_header.trace_number_in_ensemble=t+1
                trace.stats.segy.trace_header.coordinate_units = 1 #Make sure all units are in meters and not feet
                trace.stats.segy.trace_header.time_basis_code = 4 #It is set to UTC.  If it is not the case, have to update this value
                #trace.stats.segy.trace_header.number_of_samples_in_this_trace = self.sampling_rate*self.trace_length
                trace.stats.segy.trace_header.sample_interval_duration = float(1.0/self.sampling_rate) #microseconds
                trace.stats.segy.trace_header.dummy_hole_id= self.get_blasthole()
                trace.stats.segy.trace_header.sensor_distance_to_source = self.drill.Drillstring.Total_Length - self.sensor.Position #Calculated from the top of the Top Sub
                trace.stats.segy.trace_header.sensor_position = self.sensor.Position
                trace.stats.segy.trace_header.installation_diameter = self.sensor.Installation_Diameter
                trace.stats.segy.trace_header.sensor_sampling_rate = EXPECTEDSAMPLERATE

                if self.Rhino.current_channel_id == rhino.AccelerometerType.PIEZO:
                    trace.stats.segy.trace_header.sensor_max_g = self.sensor.Piezo_Max_G
                elif self.Rhino.current_channel_id == rhino.AccelerometerType.MEMS:
                    trace.stats.segy.trace_header.sensor_max_g = self.sensor.MEMS_Max_G
                else:
                    pass


                trace.stats.segy.trace_header.axial_axis = self.sensor.Axial_Axis.value
                trace.stats.segy.trace_header.tangential_axis = self.sensor.Tangential_Axis.value
                trace.stats.segy.trace_header.drill_string_total_length = self.drill.Drillstring.Total_Length
                trace.stats.segy.trace_header.drill_string_steel_od = self.drill.Drillstring.Steel_OD
                trace.stats.segy.trace_header.drill_string_component1 = int(self.drill.Drillstring.Components.loc[0]["Present"])
                trace.stats.segy.trace_header.drill_string_component2 = int(self.drill.Drillstring.Components.loc[1]["Present"])
                trace.stats.segy.trace_header.drill_string_component3 = int(self.drill.Drillstring.Components.loc[2]["Present"])
                trace.stats.segy.trace_header.drill_string_component4 = int(self.drill.Drillstring.Components.loc[3]["Present"])
                trace.stats.segy.trace_header.drill_string_component5 = int(self.drill.Drillstring.Components.loc[4]["Present"])
                trace.stats.segy.trace_header.drill_string_component6 = int(self.drill.Drillstring.Components.loc[5]["Present"])
                trace.stats.segy.trace_header.drill_string_component7 = int(self.drill.Drillstring.Components.loc[6]["Present"])
                trace.stats.segy.trace_header.drill_string_component8 = int(self.drill.Drillstring.Components.loc[7]["Present"])
                trace.stats.segy.trace_header.drill_string_component9 = int(self.drill.Drillstring.Components.loc[8]["Present"])
                trace.stats.segy.trace_header.drill_string_component10 = int(self.drill.Drillstring.Components.loc[9]["Present"])

                #print(trace)
                #expected_sampling_rate = EXPECTEDSAMPLERATE
                if(self.sampling_rate != EXPECTEDSAMPLERATE):
                    new_trace = trace.interpolate(EXPECTEDSAMPLERATE,method="linear", npts=EXPECTEDSAMPLERATE)
                    new_trace.data = new_trace.data.astype(numpy.float32)
                    new_trace.stats.segy.trace_header.sensor_sampling_rate = EXPECTEDSAMPLERATE
                    new_trace.stats.segy.trace_header.sample_interval_duration = float(1.0/EXPECTEDSAMPLERATE) #microseconds
                    new_trace.stats.sampling_rate = EXPECTEDSAMPLERATE
                    #These next lines are to compare Karl's interpolation to obspy interpolation
#                    fig = plt.figure(1)
#                    pdb.set_trace()
#                    plt.plot(new_trace.data, 'b');
#
#                    from dcrhino.analysis.signal_processing.seismic_processing import resample_trace_to_idealized_sampling_rate
#                    karl_trace = resample_trace_to_idealized_sampling_rate(trace,self.trace_length,EXPECTEDSAMPLERATE)
#                    plt.plot(karl_trace.data, 'k');
#                    plt.show()
                    self.stream.append(new_trace)
                else:
                    self.stream.append(trace)
            self.ensemble +=1
            if(self.ensemble%100 == 0):
                print(str(self.ensemble) + " ensembles processed")
            self.segy_traces = [x+3 for x in self.segy_traces] #Increment the trace number by 3
            self.max_trace_amplitude.append(max_amp)
            self.min_trace_amplitude.append(min_amp)
        except:
            print("Add Ensemble Error")
            print(sys.exc_info())

    def saveSEGY(self,outFileObj):
        try:
            if(len(self.stream) != self.ensemble):
                self.Add_Ensemble_to_Stream()
            #print(self.stream.__str__(extended=True))
            print(self.stream)


            self.stream.stats = AttribDict()
            self.stream.stats.textual_file_header = self.TextualHeader()

            #This if statement needs to be after writing the textual header so that we capture the actual file sampling rate
            if(self.sampling_rate != EXPECTEDSAMPLERATE):
                #TODO:create a log that captures how many files have different SR and Expected SR and by how much
                self.sampling_rate = EXPECTEDSAMPLERATE #This is just so that the Binary header matches after the interpolation processes

            self.stream.stats.binary_file_header = SEGYBinaryFileHeader()
            self.stream.stats.binary_file_header.trace_sorting_code = 5
            self.stream.stats.binary_file_header.number_of_data_traces_per_ensemble = 3
            self.stream.stats.binary_file_header.number_of_auxiliary_traces_per_ensemble = 0
            self.stream.stats.binary_file_header.sample_interval_in_microseconds =int(1000000.0/self.sampling_rate)
            self.stream.stats.binary_file_header.sample_interval_in_microseconds_of_original_field_recording =int(1000000.0/self.sampling_rate)
            self.stream.stats.binary_file_header.number_of_samples_per_data_trace_for_original_field_recording = int(self.sampling_rate*self.trace_length)
            self.stream.stats.binary_file_header.number_of_samples_per_data_trace = int(self.sampling_rate*self.trace_length)
            self.stream.stats.binary_file_header.data_sample_format_code = 1


            self.max_trace_amplitude = numpy.asarray(self.max_trace_amplitude)
            self.min_trace_amplitude = numpy.asarray(self.min_trace_amplitude)
            amplitude_dict = {"Minimum_X" : [min(self.min_trace_amplitude[:,0])],
                                               "Minimum_Y" : [min(self.min_trace_amplitude[:,1])],
                                               "Minimum_Z" : [min(self.min_trace_amplitude[:,2])],
                                               "Maximum_X" : [max(self.max_trace_amplitude[:,0])],
                                               "Maximum_Y" : [max(self.max_trace_amplitude[:,1])],
                                               "Maximum_Z" : [max(self.max_trace_amplitude[:,2])]}

            #outFileObj.addDirToPath(outFileObj.SensorTypeFolder)
            #outFileObj.addDirToPath("run_"+outFileObj.TimeStamp)
            self.stream.write(outFileObj.AbsPath, format="SEGY", data_encoding=1,byteorder=">",textual_header_encoding="ASCII")

            outFileObj.changeExtension(pm.ExtensionType.CSV)
            outFileObj.addSuffix("Amplitudes")
            extreme_amplitudes = pd.DataFrame(amplitude_dict)
            extreme_amplitudes.to_csv(outFileObj.AbsPath, index=False)

        except:
            print("Save SEGY Error")
            print(sys.exc_info())

    def TextualHeader(self):
        #ALL THIS IS SO THAT THE TEXTUA HEADER CAN BE PROPERLY READ IN THIRD PARTY PROGRAMS.  EACH LINE HAS 80 CHARACTERS
        cfile = self.sensor.Files[self.Rhino.Current_File]
        row = 1

        header = "C%s RECORDING_DATE: %s" % (row,cfile.GetDate("%Y-%m-%d"))
        header = header.encode(encoding="ASCII")
        length = len(header)
        if length < 80:
            header = header + b' ' * (80 - length)
        row += 1

        line = "C%s COUNTRY: %s" % (row, self.Rhino.Mine.Country)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s COMPANY: %s" % (row, self.Rhino.Mine.Company)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s MINE_NAME: %s" % (row, self.Rhino.Mine.Mine_Name)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s RECORDING_ENGINEER: %s" % (row, self.Rhino.Mine.Recording_Engineer)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s RIG_MODEL: %s" % (row, self.drill.Model)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s RIG_MANUFACTURER: %s" % (row, self.drill.Manufacturer)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s RIG_ID: %s" % (row, self.drill.Rig_ID)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s DRILL_TYPE: %s" % (row, self.drill.Drill_Type.name)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s MWD_TYPE: %s" % (row, self.drill.MWD_Type.name)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s BIT_TYPE: %s" % (row, self.drill.Bit_Type.name)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s BIT_MODEL: %s" % (row, self.drill.Bit_Model)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s BIT_SIZE: %s in" % (row, self.drill.Bit_Size)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s BIT_DATE: %s" % (row, self.drill.Bit_Date)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s SENSOR_TYPE: %s" % (row, self.sensor.SensorType.name)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s SENSOR_SERIAL_NUMBER: %s" % (row, self.sensor.Serial_Number)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s SENSOR_PIEZO_SAMPLING_RATE: %s" % (row, self.sensor.Piezo_Sampling_Rate)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s SENSOR_PIEZO_MAX_G: %s" % (row, self.sensor.Piezo_Max_G)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s SENSOR_MEMS_SAMPLING_RATE: %s" % (row, self.sensor.MEMS_Sampling_Rate)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s SENSOR_MEMS_MAX_G: %s" % (row, self.sensor.MEMS_Max_G)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s FILE_ACCELEROMETER_DATA_TYPE: %s" % (row, rhino.AccelerometerType(self.Rhino.current_channel_id).name)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s FILE_ACTUAL_SAMPLING_RATE: %s" % (row, self.sampling_rate)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s FILE_PROCESSING_SAMPLING_RATE: %s" % (row, EXPECTEDSAMPLERATE)
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        row += 1

        line = "C%s COMMENTS: %s" % (row, cfile.Comment.upper())
        line = line.encode(encoding="ASCII")
        length = len(line)
        if length < 80:
            header += line + b' ' * (80 - length)
        elif length > 80:
            loops = int(length/80)
            extra_chars = 4 * (loops-1) #Need to account for the CXX_ at the beginning of each line
            fraction_loop = length % 80
            extra_loops = int((extra_chars + fraction_loop)/80)
            loops += extra_loops
            header += line[0:80]
            for l in range(loops-1):
                header += "C" +str(row+l+1)+ " " + line[80*(l+1)-(l*4):76*(l+2)+4]
            if fraction_loop != 0:
                last_line = line[-(fraction_loop+extra_chars):]
                header += "C" +str(row+loops)+ " " + last_line + b' ' * (80 - len(last_line))

        return header