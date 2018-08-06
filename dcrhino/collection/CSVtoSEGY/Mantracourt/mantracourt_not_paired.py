#Will create the correct CSV format for segy conversion when data was recorded with mantracourt and not paired
#import sys,csv
import pandas as pd
#from datetime import datetime,timedelta

FILE_NAME = "E:/GoogleDrive/Projects/RhINo/Mantracourt/Data/Multiple Receivers/ST350 6835 Secondary Receiver.csv"
OUTPUT_NAME = "E:/GoogleDrive/Projects/RhINo/Mantracourt/Data/Multiple Receivers/ST350 6835 Secondary Receiver Converted.csv"
SAMPLING_RATE = 2000

#Open the file
data = pd.read_csv(FILE_NAME)
#Remove duplicates
data = data.drop_duplicates(subset="Time Stamp",keep="first")

#Remove the decimal point in the miliseconds to convert to microseconds
data["uSLen"] = data["Time Stamp"].str.len()
data["Time Stamp"] = data["Time Stamp"].str.replace(".","")
data["Time Stamp"] =  pd.to_datetime(data["Time Stamp"],format="%Y %B %d %H:%M:%S:%f")

data_list = data.values.tolist()

new_lines = []
counter = 1
i = 1
for i in range(1,len(data_list)):
    row1 = data_list[i-1]
    row2 = data_list[i]
    dt1 = row1[3].to_pydatetime()
    dt2 = row2[3].to_pydatetime()
    uSLen1 = row1[4]
    uSLen2 = row2[4]
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
    new_row = [dt1.isoformat(timespec='microseconds'),row1[2],row1[2],row1[2]]
    new_lines.append(new_row)   
    #interval = 5500
    if interval == -999500:
        interval = 500
    if interval != 500:
        iterations = (interval-500)//500
        for i in range(0,iterations):
            new_row = [(dt1 + timedelta(microseconds = 500*(i+1))).isoformat(timespec='microseconds'),0,0,0]
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