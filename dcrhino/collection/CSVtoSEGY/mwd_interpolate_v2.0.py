import sys,csv
import numpy as np
from datetime import datetime, timedelta
import pandas as pd
from dcclient import connect

#Define Interpolation fucntion
def interval_mwd(p0, p1, interval,i):
	return p0+((p1-p0)/interval)*i
#End Function
    
#Define Interpolated Line
def interpolated_line(previous_row, row, interpolated_data):
    start_time = datetime.strptime(previous_row["time_start_utc"], '%m/%d/%Y %H:%M:%S')
    end_time = datetime.strptime(previous_row["time_end_utc"], '%m/%d/%Y %H:%M:%S')
    time_interval = end_time-start_time
    total_seconds = int(time_interval.total_seconds())
    start_depth = float(previous_row["start_depth"])
    end_depth = float(previous_row["end_depth"])
    start_mse = float(previous_row["mse"])
    end_mse = float(row["mse"])
    start_rpm = float(previous_row["rpm"])
    end_rpm = float(row["rpm"])
    start_wob = float(previous_row["weight_on_bit"])
    end_wob = float(row["weight_on_bit"])
    start_torque = float(previous_row["torque"])
    end_torque = float(row["torque"])
    start_rop = float(previous_row["rop"])
    end_rop = float(row["rop"])
    start_air = float(previous_row["air_pressure"])
    end_air = float(row["air_pressure"])
    start_vib = float(previous_row["vibration"])
    end_vib = float(row["vibration"])
    start_blast = float(previous_row["blastability"])
    end_blast = float(row["blastability"])
    for i in range(0,total_seconds):
        #print(str(i) + " of " + str(total_seconds))
        #new_line = pd.Series([row["Hole"],row["Collar Elevation"],(start_time + timedelta(0,i)),(end_depth-start_depth)/total_seconds,(end_mse-start_mse)/total_seconds,(end_rpm-start_rpm)/total_seconds,(end_wob-start_wob)/total_seconds,(end_torque-start_torque)/total_seconds,(end_rop-start_rop)/total_seconds,(end_air-start_air)/total_seconds,(end_vib-start_vib)/total_seconds,(end_blast-start_blast)/total_seconds,row["Northing (Actual)"],row["Easting (Actual)"]],index=["Hole","Collar Elevation","time_start","start_depth","MSE (MPa)","rpm","weight_on_bit","torque","rop","air_pressure","vibration","blastability","Northing (Actual)","Easting (Actual)"])
        new_line = pd.Series([previous_row["hole"],previous_row["collar_elevation"],(start_time + timedelta(0,i)),interval_mwd(start_depth, end_depth, total_seconds,i),interval_mwd(start_mse,end_mse, total_seconds,i),interval_mwd(start_rpm,end_rpm, total_seconds,i),interval_mwd(start_wob,end_wob, total_seconds,i),interval_mwd(start_torque,end_torque, total_seconds,i),interval_mwd(start_rop,end_rop, total_seconds,i),interval_mwd(start_air,end_air, total_seconds,i),interval_mwd(start_vib,end_vib, total_seconds,i),interval_mwd(start_blast,end_blast, total_seconds,i),previous_row["northing"],previous_row["easting"]],index=mwd_columns)
        interpolated_data.loc[len(interpolated_data)]=new_line
    



#Read arguments
#MWD_FILE_NAME = sys.argv[1]
#FILE_NAME = sys.argv[2]
#SAMPLING_RATE = int(sys.argv[3]) #Sampling Rate in Hz: 20,000 or 5,000
MWD_FILE_NAME = "E:/GoogleDrive/Projects/SEGY Converter/segywriter/mwd_04May2018-Drill3-wMSE_standardized.csv"
#FILE_NAME = "E:/GoogleDrive/Projects/SEGY Converter/segywriter/BobFile.csv"
#SAMPLING_RATE = 20000
#SAMPLING_RATE = 5000
#FILE_NAME = "E:/DataCloud/Projects/SEGY Converter/segywriter/SSX46647_Ch08.csv"



#Record start time of the conversion
conversion_start_time = datetime.now()

#Load MWD Data
mwd_columns = ["hole","collar_elevation","time_start_utc","start_depth","mse","rpm","weight_on_bit","torque","rop","air_pressure","vibration","blastability","northing", "easting"]
interpolated_data = pd.DataFrame(columns= mwd_columns)
empty_row = pd.Series([0,0,0,0,0,0,0,0,0,0,0,0,0,0],index=mwd_columns)
#mwd = pd.read_csv(MWD_FILE_NAME)
mwd_first_line = True
index = 0
print("Interpolating MWD Data at " + str(datetime.now()))

db = connect.conn()
mwd_read_columns = ["hole","bench","pattern","northing","easting","collar_elevation","computed_elevation","mse","hole_profile_id","hole_id","machine_id","hole_start_utc","time_start_utc","time_end_utc","start_depth","end_depth","rpm","weight_on_bit","torque","rop","air_pressure",	"vibration",	"blastability","rock_type_id"]
mwd = connect.query(db, "SELECT * FROM mwd.mwd_data where hole ='3014' and bench ='965'")


#with open(MWD_FILE_NAME) as f:
#    mwd = csv.DictReader(f)
    #sort data by time_start_utc
#    sorted_mwd = sorted(mwd, key=lambda row:(row['time_start_utc']), reverse=False)
#for row in csv.DictReader(buffer):
#for row in sorted_mwd:
for row in mwd:
    if(mwd_first_line == True):
        #mwd_start_time = datetime.strptime(mwd.iloc[[0]]["time_start_utc"][0], '%m/%d/%Y %H:%M:%S')
        print(str(row["time_start_utc"]))
        previous_row = row
        mwd_start_time = datetime.strptime(str(row["time_start_utc"])[0:19], '%m/%d/%Y %H:%M:%S+%f')
        mwd_first_line = False
    else:
        #Create Interpolated DataFrame
        #interp_counter = 1
        #for index, row in mwd.iterrows():
        print(str(index))
        if(previous_row["hole"]==row["hole"]):
            interpolated_line(previous_row, row, interpolated_data)
        else:
            interpolated_line(previous_row, previous_row, interpolated_data)
        previous_row = row
        index = index + 1

#for the last row
interpolated_line(previous_row, row, interpolated_data)
 
#interpolated_data.to_csv("Interpolated_v1.0_"+MWD_FILE_NAME,index=False,header=True)
interpolated_data.to_csv("test.csv",index=False,header=True)
print("Finished Interpolating at "+ str(datetime.now()))