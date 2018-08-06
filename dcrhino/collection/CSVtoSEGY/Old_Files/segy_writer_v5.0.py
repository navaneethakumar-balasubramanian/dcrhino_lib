################################################################################################################
#VERSION 5.0                                                                           5/6/2018                #
#This version will not start creating the segy file until the sample being analyzed has a microsedond value    #
#less than the sampling interval, is within the time values of MWD file and interpolates mwd data              #
#There are only SAMPLING_RATE per second of trace.  This traces are as long as the sampling rate allows        #
#The time from CSV should be in UTC String format 2017-06-04T03:25:01.00005                                    #
#Prints a message every 10000 samples processed                                                                #
#USAGE: sey_writer.py <mwdfile.csv> <ide2csvfile.csv> <samplingrate>                                           #
################################################################################################################
#import os,sys,csv

version = "5.0"
import sys,csv
from datetime import datetime, timedelta
#from obspy import read, Trace, Stream, UTCDateTime
from obspy import Trace, Stream, UTCDateTime
from obspy.core import AttribDict
from obspy.io.segy.segy import SEGYTraceHeader, SEGYBinaryFileHeader
#from obspy.io.segy.core import _read_segy
import numpy as np
import pandas as pd
import calendar


################################################################################################################
#Redefine OBSPY Headers
import obspy.io.segy.header

obspy.io.segy.header.TRACE_HEADER_FORMAT[:] = [
    # [length, name, special_type, start_byte]
    # Special type enforces a different format while unpacking using struct.
  [4, 'trace_sequence_number_within_line', False, 0],
    [4, 'trace_sequence_number_within_segy_file', False, 4],
    [4, 'original_field_record_number', False, 8],
    [4, 'trace_number_within_the_original_field_record', False, 12],
    [4, 'energy_source_point_number', False, 16],
    [4, 'ensemble_number', False, 20],
    [4, 'trace_number_within_the_ensemble', False, 24],
    [2, 'trace_identification_code', False, 28],
    [2, 'number_of_vertically_summed_traces_yielding_this_trace', False, 30],
    [2, 'number_of_horizontally_stacked_traces_yielding_this_trace', False,32],
    [2, 'data_use', False, 34],
    [4, 'distance_from_center_of_the_source_point_to_' +
     'the_center_of_the_receiver_group', False, 36],
    [4, 'receiver_group_elevation', False, 40],
    [4, 'surface_elevation_at_source', False, 44],
    [4, 'source_depth_below_surface', False, 48],
    [4, 'datum_elevation_at_receiver_group', False, 52],
    [4, 'datum_elevation_at_source', False, 56],
    [4, 'water_depth_at_source', False, 60],
    [4, 'water_depth_at_group', False, 64],
    [2, 'scalar_to_be_applied_to_all_elevations_and_depths', False, 68],
    [2, 'scalar_to_be_applied_to_all_coordinates', False, 70],
    [4, 'source_coordinate_x', False, 72],
    [4, 'source_coordinate_y', False, 76],
    [4, 'group_coordinate_x', False, 80],
    [4, 'group_coordinate_y', False, 84],
    [2, 'coordinate_units', False, 88],
    [2, 'weathering_velocity', False, 90],
    [2, 'subweathering_velocity', False, 92],
    [2, 'uphole_time_at_source_in_ms', False, 94],
    [2, 'uphole_time_at_group_in_ms', False, 96],
    [2, 'source_static_correction_in_ms', False, 98],
    [2, 'group_static_correction_in_ms', False, 100],
    [2, 'total_static_applied_in_ms', False, 102],
    [2, 'lag_time_A', False, 104],
    [2, 'lag_time_B', False, 106],
    [2, 'delay_recording_time', False, 108],
    [2, 'mute_time_start_time_in_ms', False, 110],
    [2, 'mute_time_end_time_in_ms', False, 112],
    [2, 'number_of_samples_in_this_trace', 'H', 114],
    [2, 'sample_interval_in_ms_for_this_trace', 'H', 116],
    [2, 'gain_type_of_field_instruments', False, 118],
    [2, 'instrument_gain_constant', False, 120],
    [2, 'instrument_early_or_initial_gain', False, 122],
    [2, 'correlated', False, 124],
    [2, 'sweep_frequency_at_start', False, 126],
    [2, 'sweep_frequency_at_end', False, 128],
    [2, 'sweep_length_in_ms', False, 130],
    [2, 'sweep_type', False, 132],
    [2, 'sweep_trace_taper_length_at_start_in_ms', False, 134],
    [2, 'sweep_trace_taper_length_at_end_in_ms', False, 136],
    [2, 'taper_type', False, 138],
    [2, 'alias_filter_frequency', False, 140],
    [2, 'alias_filter_slope', False, 142],
    [2, 'notch_filter_frequency', False, 144],
    [2, 'notch_filter_slope', False, 146],
    [2, 'low_cut_frequency', False, 148],
    [2, 'high_cut_frequency', False, 150],
    [2, 'low_cut_slope', False, 152],
    [2, 'high_cut_slope', False, 154],
    [2, 'year_data_recorded', False, 156],
    [2, 'day_of_year', False, 158],
    [2, 'hour_of_day', False, 160],
    [2, 'minute_of_hour', False, 162],
    [2, 'second_of_minute', False, 164],
    [2, 'time_basis_code', False, 166],
    [2, 'trace_weighting_factor', False, 168],
    [2, 'geophone_group_number_of_roll_switch_position_one', False, 170],
    [2, 'geophone_group_number_of_trace_number_one', False, 172],
    [2, 'geophone_group_number_of_last_trace', False, 174],
    [2, 'gap_size', False, 176],
    [2, 'over_travel_associated_with_taper', False, 178],
    [4, 'x_coordinate_of_ensemble_position_of_this_trace', False, 180],
    [4, 'y_coordinate_of_ensemble_position_of_this_trace', False, 184],
    [4, 'z_coordinate_of_ensemble_position_of_this_trace', False, 188],
    [4, 'bit_depth', False,192],
    [4, 'mse', False, 196],
    [4, 'rpm', False, 200],
    [4, 'wob', False, 204],
    [4, 'torque', False, 208],
    [4, 'rop', False, 212],
    [4, 'air_pressure', False, 216],
    [4, 'vibration', False, 220],
    [4, 'blastability', False, 224],
    [4, 'hole_id', False, 228],
	[4, 'unassigned2', False, 232],
	[4, 'unassigned3', False, 236]
	]

obspy.io.segy.header.TRACE_HEADER_KEYS[:] = \
    [_i[1] for _i in obspy.io.segy.header.TRACE_HEADER_FORMAT]
	
	
################################################################################################################

#Define Interpolation fucntion
def interval_mwd(p0, p1, interval,i):
	return p0+((p1-p0)/interval)*i
#End Function



#Read arguments
MWD_FILE_NAME = sys.argv[1]
FILE_NAME = sys.argv[2]
SAMPLING_RATE = int(sys.argv[3]) #Sampling Rate in Hz: 20,000 or 5,000
TRACE_LENGTH = int(32767/SAMPLING_RATE)
#MWD_FILE_NAME = "E:/GoogleDrive/Projects/SEGY Converter/segywriter/Trip2_BH124.csv"
#FILE_NAME = "E:/GoogleDrive/Projects/SEGY Converter/segywriter/BobFile.csv"
#SAMPLING_RATE = 20000
#SAMPLING_RATE = 5000
#FILE_NAME = "E:/DataCloud/Projects/SEGY Converter/segywriter/SSX46647_Ch08.csv"



#Record start time of the conversion
conversion_start_time = datetime.now()

#Load MWD Data
interpolated_data = pd.DataFrame(columns=["Hole","Collar Elevation","time_start","start_depth","MSE (MPa)","rpm","weight_on_bit","torque","rop","air_pressure","vibration","blastability","Northing (Actual)", "Easting (Actual)"])
empty_row = pd.Series([0,0,0,0,0,0,0,0,0,0,0,0,0,0],index=["Hole","Collar Elevation","time_start","start_depth","MSE (MPa)","rpm","weight_on_bit","torque","rop","air_pressure","vibration","blastability","Northing (Actual)", "Easting (Actual)"])
mwd = pd.read_csv(MWD_FILE_NAME)
mwd_start_time = datetime.strptime(mwd.iloc[[0]]["time_start"][0], '%m/%d/%Y %H:%M:%S')
print("Interpolating MWD Data at " + str(datetime.now()))
#Create Interpolated DataFrame
for index, row in mwd.iterrows():
  start_time = datetime.strptime(row["time_start"], '%m/%d/%Y %H:%M:%S')
  end_time = datetime.strptime(row["time_end"], '%m/%d/%Y %H:%M:%S')
  time_interval = end_time-start_time
  total_seconds = int(time_interval.total_seconds())
  next_index = index  + 1
  if next_index>= len(mwd):
  	next_index = len(mwd)-1
  start_depth = float(row["start_depth"])
  end_depth = float(row["end_depth"])
  start_mse = float(row["MSE (MPa)"])
  end_mse = float(mwd.iloc[[next_index]]["MSE (MPa)"])
  start_rpm = float(row["rpm"])
  end_rpm = float(mwd.iloc[[next_index]]["rpm"])
  start_wob = float(row["weight_on_bit"])
  end_wob = float(mwd.iloc[[next_index]]["weight_on_bit"])
  start_torque = float(row["torque"])
  end_torque = float(mwd.iloc[[next_index]]["torque"])
  start_rop = float(row["rop"])
  end_rop = float(mwd.iloc[[next_index]]["rop"])
  start_air = float(row["air_pressure"])
  end_air = float(mwd.iloc[[next_index]]["air_pressure"])
  start_vib = float(row["vibration"])
  end_vib = float(mwd.iloc[[next_index]]["vibration"])
  start_blast = float(row["blastability"])
  end_blast = float(mwd.iloc[[next_index]]["blastability"])
  for i in range(0,total_seconds):
      #new_line = pd.Series([row["Hole"],row["Collar Elevation"],(start_time + timedelta(0,i)),(end_depth-start_depth)/total_seconds,(end_mse-start_mse)/total_seconds,(end_rpm-start_rpm)/total_seconds,(end_wob-start_wob)/total_seconds,(end_torque-start_torque)/total_seconds,(end_rop-start_rop)/total_seconds,(end_air-start_air)/total_seconds,(end_vib-start_vib)/total_seconds,(end_blast-start_blast)/total_seconds,row["Northing (Actual)"],row["Easting (Actual)"]],index=["Hole","Collar Elevation","time_start","start_depth","MSE (MPa)","rpm","weight_on_bit","torque","rop","air_pressure","vibration","blastability","Northing (Actual)","Easting (Actual)"])
      new_line = pd.Series([row["Hole"],row["Collar Elevation"],(start_time + timedelta(0,i)),interval_mwd(start_depth, end_depth, total_seconds,i),interval_mwd(start_mse,end_mse, total_seconds,i),interval_mwd(start_rpm,end_rpm, total_seconds,i),interval_mwd(start_wob,end_wob, total_seconds,i),interval_mwd(start_torque,end_torque, total_seconds,i),interval_mwd(start_rop,end_rop, total_seconds,i),interval_mwd(start_air,end_air, total_seconds,i),interval_mwd(start_vib,end_vib, total_seconds,i),interval_mwd(start_blast,end_blast, total_seconds,i),row["Northing (Actual)"],row["Easting (Actual)"]],index=["Hole","Collar Elevation","time_start","start_depth","MSE (MPa)","rpm","weight_on_bit","torque","rop","air_pressure","vibration","blastability","Northing (Actual)","Easting (Actual)"])
      interpolated_data.loc[len(interpolated_data)]=new_line
 
print("Finished Interpolating.  Begin Segy creation at "+ str(datetime.now()))
#Create a new obspy segy stream
stream = Stream()
#NRN trace_data = np.zeros((SAMPLING_RATE,4),dtype=np.float32)
trace_data = np.zeros((int(SAMPLING_RATE*TRACE_LENGTH),4),dtype=np.float32)
first_sample_of_second = True
segy_started = False
mwd_started = False
samples = 0
trace_number = np.array([1,2,3])
ensemble = 1

#create a log file
f = open(FILE_NAME.replace(".csv","_"+version+".log"),'w')
f.write("SEGY conversion started at" + str(conversion_start_time) + "\n")
f.write("Adding Traces\n")
	
#Define the function to add a trace to the stream
def Add_Ensemble_to_Stream(stream,trace_data,trace_time,trace_number,ensemble,SAMPLING_RATE,f,interpolated_row):
    xy_scale = 100
    mwd_scale = 1000000
    for t in range(1,4):
        #print(trace_data[:,t])
        trace = Trace(data=trace_data[:,t])
        trace.stats.segy = {}
        trace.stats.starttime = trace_time #This sets #'s 157 to 166
        trace.stats.delta = 1/SAMPLING_RATE
        trace.stats.segy.trace_header = SEGYTraceHeader()
        #trace.stats.segy.trace_header.__init__(header=None, endian='>', unpack_headers=True)
        trace.stats.segy.trace_header.trace_sequence_number_within_line = trace_number[t-1] #1-4
        trace.stats.segy.trace_header.trace_sequence_number_within_segy_file = trace_number[t-1] #5-8
        trace.stats.segy.trace_header.original_field_record_number=ensemble #9-12
        trace.stats.segy.trace_header.trace_number_within_the_original_field_record=t #13-16
        trace.stats.segy.trace_header.trace_identification_code = 1 #1 - seismic data 29-30 - 1 - seismic data
        trace.stats.segy.trace_header.number_of_vertically_summed_traces_yielding_this_trace = 1 #31-32
        trace.stats.segy.trace_header.number_of_horizontally_stacked_traces_yielding_this_trace = 1 #33-34
        trace.stats.segy.trace_header.scalar_to_be_applied_to_all_elevations_and_depths=1#69-70
        trace.stats.segy.trace_header.scalar_to_be_applied_to_all_coordinates=1 #71-72
        trace.stats.segy.trace_header.coordinate_units = 1 #89 - 90 ###Make sure all units are in meters and not feet
        #NRN trace.stats.segy.trace_header.number_of_samples_in_this_trace = SAMPLING_RATE # 115-116 - 20000 (samples) 
        trace.stats.segy.trace_header.number_of_samples_in_this_trace = SAMPLING_RATE*TRACE_LENGTH # 115-116 - 20000 (samples) 
        trace.stats.segy.trace_header.sample_interval_in_ms_for_this_trace = int(1000000/SAMPLING_RATE) #117- 118 - 200  (micro seconds)
        trace.stats.segy.trace_header.gain_type_of_field_instruments = 1 #119-120
        ###157 to 166 are set with trace.stats.starttime = trace_time
        trace.stats.segy.trace_header.time_basis_code = 4 #167-168 ###It is set to UTC.  If it is not the case, have to update this value
        #These following headers need to be correclty updated from MWD Data
        trace.stats.segy.trace_header.x_coordinate_of_ensemble_position_of_this_trace = int(interpolated_row["Easting (Actual)"]*xy_scale) #181-184 Easting
        trace.stats.segy.trace_header.y_coordinate_of_ensemble_position_of_this_trace = int(interpolated_row["Northing (Actual)"]*xy_scale) #185-188 Northing
        trace.stats.segy.trace_header.z_coordinate_of_ensemble_position_of_this_trace = int(interpolated_row["Collar Elevation"]*xy_scale) #189-192 Collar Elevation
        trace.stats.segy.trace_header.bit_depth = int(interpolated_row["start_depth"]*mwd_scale) #193-196 Bit Depth
        trace.stats.segy.trace_header.mse= int(interpolated_row["MSE (MPa)"]*mwd_scale) #197-200 MSE
        trace.stats.segy.trace_header.rpm= int(interpolated_row["rpm"]*mwd_scale) #201-204 RPM
        trace.stats.segy.trace_header.wob= int(interpolated_row["weight_on_bit"]*mwd_scale)#205-208 Weight on Bit
        trace.stats.segy.trace_header.torque= int(interpolated_row["torque"]*mwd_scale) #209-212 Torque
        trace.stats.segy.trace_header.rop= int(interpolated_row["rop"]*mwd_scale)#213-216 ROP
        trace.stats.segy.trace_header.air_pressure= int(interpolated_row["air_pressure"]*mwd_scale) #217-220 Air Pressure
        trace.stats.segy.trace_header.vibration= int(interpolated_row["vibration"]*mwd_scale) #221-224 Bit Vibration
        trace.stats.segy.trace_header.blastability= int(interpolated_row["blastability"]*mwd_scale) #225-228 Blastability
        trace.stats.segy.trace_header.hole_id= int(interpolated_row["Hole"]) #225-228 Hole ID
        stream.append(trace)
        #Write to the conversion log
    f.write(str(trace)+"\n")
    f.write(str(trace_data[:,t])+"\n")
#End Function


trace_counter = 1
print_counter = 0
#Open the CSV File and process data
with open(FILE_NAME) as csvfile:
    DataFile = csv.reader(csvfile)
	#Each row in the file will be added to a List.  When the list has SAMPLING_RATE elements the trace will be added to the stream and will begin to add
	#the following rows to a new list
    for row in DataFile:
        time = str(row[0])
        #microseconds = int(time[-6:])
        #trace_time = UTCDateTime(int(float(time)))
        trace_time = UTCDateTime(time)
        utctuple=calendar.timegm(trace_time.utctimetuple())
        microseconds = trace_time.microsecond
        trace_time.microsecond = 0
        #print(str(mwd_start_time)+ " mwd")
        #print(str(trace_time.datetime)+ " trace")
        #print(str(microseconds) + " " + str(1000000/SAMPLING_RATE))
        x = float(row[1])
        y = float(row[2])
        z = float(row[3])
        if trace_time.datetime >= mwd_start_time and mwd_started == False and microseconds < int(1000000/SAMPLING_RATE):
            mwd_started = True
            #print("trace " + str(trace_time.datetime))
            #print("mwd " + str(mwd_start_time))
        #The segy will only begin when the first sample is less than the sampling interval
        #if trace_time.microsecond < int(1000000/SAMPLING_RATE) and segy_started==False and mwd_started == True:
        if mwd_started == True:
            segy_started = True
        if segy_started == True:
            new_line = [utctuple,x,y,z]
            if first_sample_of_second == True:
                if microseconds < int(1000000/SAMPLING_RATE):
                    samples = samples + 1
                    #The ensemble time will be the time of the first sample in the trace
                    ensemble_time = trace_time
                    f.write("First sample: " + str(trace_time.datetime) + " with microseconds: " + str(microseconds) + " ensemble:"+ str(ensemble)+"\n")
                    trace_data[0,:]= new_line
                    #interpolated_row = empty_row
                    h = ensemble_time.datetime
                    if(len(interpolated_data[interpolated_data["time_start"]==ensemble_time.datetime]))>0:
                        interpolated_row = interpolated_data[interpolated_data["time_start"]==ensemble_time.datetime]
                    else:
                        interpolated_row = empty_row
                    first_sample_of_second = False
            else:
                samples = samples + 1
                trace_data[samples-1,:]=new_line
            #NRN if samples == (SAMPLING_RATE):
            if samples == int(SAMPLING_RATE * TRACE_LENGTH):
                f.write("Last sample: " + str(trace_time.datetime) + " with microseconds: " + str(microseconds) + " ensemble:"+ str(ensemble)+"\n")
                samples = 0
                first_sample_of_second = True
                Add_Ensemble_to_Stream(stream,trace_data,ensemble_time,trace_number,ensemble,SAMPLING_RATE,f,interpolated_row)
                trace_number = trace_number + 3
                ensemble = ensemble + 1
                #NRN trace_data = np.zeros((SAMPLING_RATE,4),dtype=np.float32)
                trace_data = np.zeros((int(SAMPLING_RATE*TRACE_LENGTH),4),dtype=np.float32)
                if(print_counter == 100):
                    print(str(trace_counter*print_counter) + " Ensembles processed...")
                    trace_counter = trace_counter + 1
                    print_counter = 0
                print_counter = print_counter + 1
                    
        #End of if segy_started
	#This is the end of the for loop in DataFile
#This is the end of the with open loop
#If there is leftover data at the end of the file that is less than 1 second
if(samples > 0):
	Add_Ensemble_to_Stream(stream,trace_data,ensemble_time,trace_number,ensemble,SAMPLING_RATE,f,interpolated_row)

print("Finished creating traces at "+ str(datetime.now()))
#Set Mandatory Filewide Headers
stream.stats = AttribDict()
stream.stats.textual_file_header = 'Textual Header!'
stream.stats.binary_file_header = SEGYBinaryFileHeader()
stream.stats.binary_file_header.trace_sorting_code = 5
stream.stats.binary_file_header.number_of_data_traces_per_ensemble = 3
stream.stats.binary_file_header.number_of_auxiliary_traces_per_ensemble = 0
stream.stats.binary_file_header.sample_interval_in_microseconds =int(1000000/SAMPLING_RATE)
stream.stats.binary_file_header.sample_interval_in_microseconds_of_original_field_recording =int(1000000/SAMPLING_RATE)
stream.stats.binary_file_header.number_of_samples_per_data_trace_for_original_field_recording = int(SAMPLING_RATE*TRACE_LENGTH)
stream.stats.binary_file_header.data_sample_format_code = 1
stream.stats.binary_file_header.trace_sorting_code = 2
stream.stats.binary_file_header.ensemble_fold = 3

#Create the segy file
print ("Stream object before writing...")
print(Stream.__str__(stream,extended=True))
stream.write(FILE_NAME.replace(".csv","_"+version+".sgy"), format="SEGY", data_encoding=1,byteorder=">")
conversion_end_time = datetime.now()
final_message = "SEGY conversion completed at " + str(conversion_end_time) +".  It took " + str(conversion_end_time - conversion_start_time) + " to convert"
print (final_message)

#Close the log file
f.write(final_message)
f.close()

		
			
			
			
			
			
			
			
			
			
			
			
			
