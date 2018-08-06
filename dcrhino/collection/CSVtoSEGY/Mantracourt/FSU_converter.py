import sys,csv
import pandas as pd
from datetime import datetime,timedelta

FILE_NAME = "E:/GoogleDrive/Projects/RhINo/Three Measurements/10 Min Test/FSU 10 min.csv"
OUTPUT_NAME = "E:/GoogleDrive/Projects/RhINo/Three Measurements/10 Min Test/FSU 10 min converted2.csv"
SAMPLING_RATE = 4800
fsu_data = pd.read_csv(FILE_NAME,names=["data"])
file_timestamp = fsu_data.iloc[0,0]
file_timestamp = str(file_timestamp)
year = int(file_timestamp[0:4])
month = int(file_timestamp[4:6])
day = int(file_timestamp[6:8])
hour = int(file_timestamp[8:10])
minute = int(file_timestamp[10:12])
second = int(file_timestamp[12:14])
microsecond = int(file_timestamp[15:len(file_timestamp)])
dt = datetime(year, month, day,hour, minute, second, microsecond)
new_rows = []
counter = 0
counter2 = 0
counter3 = 1
delta = 208
first_line = True
with open(FILE_NAME,"r") as f:
    csv_rows = csv.DictReader(f,fieldnames =["Data","Time"])


#with open(OUTPUT_NAME,"w") as o:
    for i in csv_rows:
        counter2 = counter2 + 1
        if counter2 == 1000:
            print(str(counter2*counter3))
            counter2 = 0
            counter3 = counter3+1
        if first_line == True:
            first_line = False
        else:
            new_row = [dt.isoformat(timespec='microseconds'),i["Data"],i["Data"],i["Data"]]
            new_rows.append(new_row)
            dt = dt + timedelta(microseconds = delta)
            if(counter < 2):
                counter = counter + 1
            else:
                counter = 0
                dt = dt + timedelta(microseconds = 1)

with open(OUTPUT_NAME,"w") as f:
    # Overwrite the old file with the modified rows
    writer = csv.writer(f,lineterminator='\n')
    writer.writerows(new_rows)