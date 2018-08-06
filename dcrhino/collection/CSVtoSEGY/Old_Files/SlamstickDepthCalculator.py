#################################################################################################################
#                                                                                                           VERSION 1.0                                                                                                                  #
#Will create synthetic depth from the control pressure pad channel from de ide2csv file (Channel 59)                                                                 #
#USAGE:SlamstickDeptgCalculator.py <ide2csvfile_Ch59.csv>                                                                                                                                        #
################################################################################################################
import os,sys,csv
from datetime import datetime
from obspy import UTCDateTime
import numpy as np

#FILE_NAME = str(sys.argv[1])
FILE_NAME = "BH3014_SSX56127_01_pressure_no_utc.csv"

#Find altitude based on sensor pressure
def Altitude (P):
	hb= 0
	Pb = 101325
	Tb = 288
	g = 9.80665
	Lb = -0.0065
	M = 0.028964
	R = 8.3144598
	h = hb+(Tb/Lb)*(((P/Pb)**(-R*Lb/(g*M)))-1)
	return round(h,2)
#End of Altitude function

with open(FILE_NAME.replace(".csv","_Depth.csv"), 'w', newline="") as csvfile:
	OutputDepthFile = csv.writer(csvfile)
	counter = 0
	#List with the time and pressure read from the csv file and the computed depth
	pressure = list()
	#f = open(FILE_NAME.replace(".csv",".log"),'w')
	with open(FILE_NAME) as csvfile:
		DepthFile = csv.reader(csvfile)
		#Each row in the file will be added to a List.  When the list has SAMPLING_RATE+1 elements (one sec long) the trace will be added to the stream and will begin to add
		#the following rows to a new list
		for row in DepthFile:
			p = float(row[1])
			h = Altitude(p)
			time = (UTCDateTime(int(float(row[0]))))
			if(counter == 0):
				depth = 0
			else:
				depth = pressure[counter-1][3]-h+pressure[counter-1][2]
			#End if
			#print("Pressure " + str(p) + " = " + str(h) + " m")
			pressure.append([time,p,h,depth])
			#f.write(str(pressure[counter])+"\n")
			counter = counter +1
		#End for loop with depth FIle
	#End with open loop for the csv file

	#sec_interval_depths = list()
	depth = pressure[0][3]
	for r in range(0,len(pressure)-1):
		current_sample_time = pressure[r][0]
		next_sample_time = pressure[r+1][0]
		if (current_sample_time.second != next_sample_time.second):
			print(str([current_sample_time,depth]))
			#sec_interval_depths.append([current_sample_time,depth])
			new_row = [current_sample_time.datetime,depth]
			OutputDepthFile.writerow(new_row)
			depth = pressure [r+1][3]
		#End if
	#End for
	#Write the information of the last 1 sec record
	OutputDepthFile.writerow(new_row)
	#f.write(str([current_sample_time,depth])+"\n")
	#f.close()
#End with open loop for csv file