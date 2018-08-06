#Corrected the channel assignment from the SS4.  It will not work via command line
import pandas as pd



FILE_NAME = "E:/toConvert/SSX69234.csv"
SSX_OUTPUT_NAME = "E:/toConvert/ACCEL_SSX69234.csv"
SG_OUTPUT_NAME = "E:/toConvert/STRAIN_SSX69234.csv"

#FILE_NAME = sys.argv[1]
#SSX_OUTPUT_NAME = "ACCEL_" + FILE_NAME
#SG_OUTPUT_NAME = "STRAIN_" + FILE_NAME



#Open the file
data = pd.read_csv(FILE_NAME,names=["Time","SG","X","Y","Z"])
#Split ACCEL
SSX = data[["Time","X","Y","Z"]]
#Split SG
SG = data[["Time","SG","SG","SG"]]

#Save ACCEl
SSX.to_csv(SSX_OUTPUT_NAME,index=False,header=False)
#Save SG
SG.to_csv(SG_OUTPUT_NAME,index=False,header=False)
