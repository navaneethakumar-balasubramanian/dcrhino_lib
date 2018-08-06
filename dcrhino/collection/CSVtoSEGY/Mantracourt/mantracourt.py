#Will create the correct CSV format for segy conversion when data was recorded with mantracourt and paired
#import sys,csv
import pandas as pd
from datetime import datetime,timedelta
import numpy as np

FILE_NAME = "E:/GoogleDrive/DataAquisition/Miligan/20180505/test15.csv"
OUTPUT_NAME = "E:/GoogleDrive/DataAquisition/Miligan/20180505/test15-converted-zeros w milliseconds.csv"
SAMPLING_RATE = 2000

#Open the file
data = pd.read_csv(FILE_NAME)
#Remove duplicates
data = data.drop_duplicates(subset="Elapsed",keep="first")

#Remove the decimal point in the miliseconds to convert to microseconds
data["uSLen"] = data["TimeStamp"].str.len()
data["TimeStamp"] = data["TimeStamp"].str.replace(".","")
data["TimeStamp"] =  pd.to_datetime(data["TimeStamp"],format="%Y %B %d %H:%M:%S:%f")

data_list = data.values.tolist()

new_lines = []
previous_values = np.zeros(shape=(10,1))
average_counter = 1
counter = 1
i = 1
for i in range(1,len(data_list)):
    row1 = data_list[i-1]
    row2 = data_list[i]
    dt1 = row1[2].to_pydatetime()
    dt2 = row2[2].to_pydatetime()
    value1 = float(row1[1])
    value2 = float(row2[1])
    previous_values[average_counter-1]=value1
    #previous_values[average_counter]=value2
    average_counter = average_counter + 1
    if(average_counter > 10):
        average_counter = 1
    dValue = value2-value1
    uSLen1 = row1[3]
    uSLen2 = row2[3]
    uS1 = dt1.microsecond
    uS2 = dt2.microsecond
    if uSLen1 > 28:
        uSec = (dt1.microsecond - 100000)*10
        dt1 = dt1 - timedelta(microseconds = dt1.microsecond)+timedelta(seconds = 1) + timedelta(microseconds = uSec)
        uS1 = dt1.microsecond
    if uSLen2 > 28:
        uSec = (dt2.microsecond - 100000)*10
        dt2 = dt2 - timedelta(microseconds = dt2.microsecond)+timedelta(seconds = 1) + timedelta(microseconds = uSec)
        uS2 = dt2.microsecond
    interval = uS2 - uS1 
    #new_row = [dt1.isoformat(timespec='microseconds'),row1[1],row1[1],row1[1]]
    new_row = [dt1.isoformat(timespec='microseconds'),uS1,row1[1]]
    new_lines.append(new_row)   
    #interval = 5500
    if interval < 0:
        interval = interval + 1000000
    if interval != 500:
        iterations = (interval-500)//500
        for i in range(0,iterations):
            #For All Zeroes
            newValue=0
            #For Average of 10 values
            #newValue = np.average(previous_values)
            #For linear interpolation
            #newValue = value1 + (dValue/iterations)*(i+1)
            new_row = [(dt1 + timedelta(microseconds = 500*(i+1))).isoformat(timespec='microseconds'),newValue,newValue,newValue]
            new_lines.append(new_row)
    #new_row = [dt2.isoformat(timespec='microseconds'),row2[1],row2[1],row2[1]]
    #new_lines.append(new_row)
    if i == 1000*counter:
        print(str(i))
        counter = counter + 1 
    #End if


with open(OUTPUT_NAME,"w") as f:
    # Overwrite the old file with the modified rows
    writer = csv.writer(f,lineterminator='\n')
    writer.writerows(new_lines)










#clean_data["Recorded_Second"] = 0
#clean_data["Second"]=0
#sec = str(clean_data["TimeStamp"][0])
#sec = sec.replace(".", "")
#dt = datetime.strptime(sec,"%Y %B %d %H:%M:%S:%f")