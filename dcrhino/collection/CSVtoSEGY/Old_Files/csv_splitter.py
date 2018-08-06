import pandas as pd
import sys,csv
from datetime import datetime


FILE_NAME = sys.argv[1]
SPLIT_FILE_NAME = sys.argv[2]
#PATH = "E:/toConvert/"
#FILE_NAME = "SSX62700.csv"
#SPLIT_FILE_NAME = "split.csv"


#Open the data file
data = pd.read_csv(FILE_NAME,names=["Time","X","Y","Z"])
data["TimeStamp"] = pd.to_datetime(data["Time"])

#Open the split file
with open(SPLIT_FILE_NAME,"r") as f:
    f.readline()
    csv_splits = csv.DictReader(f,fieldnames =["StartTime","EndTime","BlastHole"])
    for i in csv_splits:
        start_time = pd.to_datetime(i["StartTime"])
        end_time = pd.to_datetime(i["EndTime"])
        blast_hole = i["BlastHole"]
        data_split = data[(data["TimeStamp"]>= start_time) & (data["TimeStamp"]<=end_time)]
        data_split = data_split[["Time","X","Y","Z"]]
        data_split.to_csv(str(i["BlastHole"]) +"-"+ FILE_NAME,index=False,header=False)

