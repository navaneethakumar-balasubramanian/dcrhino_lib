#This was used to add a quick fix to that particular dataset and add one row of data to bring it to 4000 samples instead of 3999
import sys,csv
import pandas as pd
from datetime import datetime,timedelta

FILE_NAME = "E:/toConvert/SSX66491.csv"
OUTPUT_NAME = "E:/toConvert/SSX66491_Fixed.csv"
SAMPLING_RATE = 4000
#fsu_data = pd.read_csv(FILE_NAME,names=["data"])
#file_timestamp = fsu_data.iloc[0,0]
#file_timestamp = str(file_timestamp)
#year = int(file_timestamp[0:4])
#month = int(file_timestamp[4:6])
#day = int(file_timestamp[6:8])
#hour = int(file_timestamp[8:10])
#minute = int(file_timestamp[10:12])
#second = int(file_timestamp[12:14])
#microsecond = int(file_timestamp[15:len(file_timestamp)])
#dt = datetime(year, month, day,hour, minute, second, microsecond)
new_rows = []
#counter = 0
#counter2 = 0
#counter3 = 1
#delta = 208
#first_line = True
with open(FILE_NAME,"r") as f:
    csv_rows = csv.DictReader(f,fieldnames =["Time","X","Y","Z"])

    for i in csv_rows:
        new_row = [i["Time"],i["X"],i["Y"],i["Z"]]
        new_rows.append(new_row)
        if(str(i["Time"]) == "2018-05-04T18:28:12.999912"):
            new_row = ["2018-05-04T18:28:13.000000",i["X"],i["Y"],i["Z"]]
            new_rows.append(new_row)
        
with open(OUTPUT_NAME,"w") as f:
    # Overwrite the old file with the modified rows
    writer = csv.writer(f,lineterminator='\n')
    writer.writerows(new_rows)