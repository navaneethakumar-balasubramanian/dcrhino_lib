# -*- coding: utf-8 -*-
"""
Created on Thu Jun 07 18:51:35 2018

@author: Natal
"""
from __future__ import absolute_import, division, print_function
#import numpy as np
import pandas as pd
from datetime import datetime
from enum import Enum
import sys
import pdb

#TODO Validate data before adding it



#==============================================================================
#CONSTANTS
#==============================================================================
BLASTHOLE_COLUMNS = ["Blasthole","StartTime","EndTime"]
DRILLSTRING_COLUMNS = ["ID","Type","Present"]
MAX_DRILLSTRING_COMPONENTS = 10


#==============================================================================
#FUNCTIONS
#==============================================================================
def StandardString(s):
    if type(s) is str:
        s = s.replace("_"," ")
        components = s.split(" ")
        clean_components=[]
        string=""
        for ch in components:
            word = ''.join(e for e in ch if (e.isalnum() or (e in ['&','.'])))
            #if(word.isalnum()):
            clean_components.append(word)
        for i,c in enumerate(clean_components):
            string += c
            if i<len(clean_components)-1:
                string+= "_"
        return string.upper()
    else:
        raise TypeError("Argument needs to be a string")
#==============================================================================
#CLASES
#==============================================================================       

class DrillType(Enum):
    ELECTRIC_ROTARY = 1
    DIESEL_ROTARY = 2
    DTH = 3
    TOP_HAMMER = 4
    CORING = 5

#==============================================================================

class MWDType(Enum):
    NONE = 0
    TERRAIN = 1
    UNKNOWN = 2
#==============================================================================  

class BitType(Enum):
    TRICONE = 1
    PDC = 2
    
#==============================================================================   

class DSComponentType(Enum):
    GENERIC = 0
    BIT = 1
    SUB = 2
    STEEL = 3
    SAVER = 4
    SHOCKSUB = 5

#==============================================================================    

class DSComponentPresence(Enum):
    PRESENT = 1
    OPTIONAL = 0
    NOT_PRESENT = -1

#==============================================================================    

class SensorType(Enum):
    SSX = 1
    RHINO = 2
    

#==============================================================================    

class MeasurementAxis(Enum):
    X = 1
    Y = 2
    Z = 3
    
#==============================================================================    

class AccelerometerType(Enum):
    PIEZO = 8
    MEMS = 32
    
#==============================================================================
    
class RHINO(object):
    
    def __init__(self,current_file=None, current_drill_id=None, current_channel_id=None):
        self.Mine = Mine()
        self.Current_File = current_file
        self.Current_Drill_ID = current_drill_id
        self._Session_TimeStamp = datetime.now()
        self.current_channel_id = current_channel_id
        
    def GetSensorWithFile(self,filename):
        for r_id,drill in self.Mine.Drills.iteritems():
            for s_id,sensor in drill.Sensors.iteritems():
                if sensor.HasFile(filename):
                    return r_id,sensor
        return 0, Sensor()
    
    def SessionTimeStamp(self,str_format=None):
        if str_format==None:
            return self._Session_TimeStamp
        else:
            return self._Session_TimeStamp.strftime(str_format)
    
#rhino = Rhno()
#class Rhino(object):
#    
#    def __init__(self,current_file=None, current_drill_id=None, current_channel_id=None):
#        self.mine = Mine()
#        self.current_file = current_file
#        self.current_drill_id = current_drill_id
#        self._session_timestamp = datetime.now()
#        self.surrent_session
#        
#    def get_sensor_with_file(self,filename):
#        for r_id,drill in self.Mine.Drills.iteritems():
#            for s_id,sensor in drill.Sensors.iteritems():
#                if sensor.HasFile(filename):
#                    return r_id,sensor
#        return 0, Sensor()
#    
#    def SessionTimeStamp(self,str_format=None):
#        if str_format==None:
#            return self._Session_TimeStamp
#        else:
#            return self._Session_TimeStamp.strftime(str_format)
    
            
#==============================================================================

class Mine(object):
    
    def __init__(self, country = "country", company="company",mine_name="mine name",engineer="engineer"):
        pass
        self.Country = StandardString(country)
        self.Company = StandardString(company)
        self.Mine_Name = StandardString(mine_name)
        self.Recording_Engineer = StandardString(engineer)
        self.Drills = {}
        
    def AddDrill(self,drill=None):
        if drill is not None:
            if not self.Drills.has_key(drill.Rig_ID):   
                self.Drills[drill.Rig_ID]=drill
                return True
            else:
                return False
    def UpdateDrill(self,drill=None):
        pass
            
    def RemoveDrill(self,drill_id):
        if self.Drills.has_key(drill_id):
            del self.Drills[drill_id]
            return True
        else:
            return False
    
    def FillData(self,data):
        #Need to validate data before adding
        self.Country = StandardString(data["Mine_Country"].iloc[0])
        self.Company = StandardString(data["Mine_Company"].iloc[0])
        self.Mine_Name = StandardString(data["Mine_Name"].iloc[0])
        self.Recording_Engineer = StandardString(data["Recording_Engineer"].iloc[0])
        
    def Drills(self):
        return self.Drills
    
    def HasDrill(self,drill_id):
        if drill_id in self.Drills.keys():
            return True
        else:
            return False
    
    def IsEmpty(self):
        if len(self.Drills.keys())>0:
            return False
        else:
            return True
        

#==============================================================================

class Drill(object):
    
    def __init__(self, model="model", manufacturer="manufacturer",rig_id="id",drill_type = DrillType.ELECTRIC_ROTARY,mwd_type=MWDType.NONE,bit_type=BitType.TRICONE,bit_model = None,bit_size = 13.75, bit_date=None):
        self.Model = StandardString(model)
        self.Manufacturer = StandardString(manufacturer)
        self.Rig_ID = rig_id
        self.Drill_Type = drill_type
        self.MWD_Type = mwd_type
        self.Bit_Type = bit_type
        self.Bit_Model = bit_model
        self.Bit_Date = bit_date
        self.Drillstring = Drillstring()
        self.Sensors = {}
        
    def ClearDrillstring(self,drillstring):
        self.Drillstring = Drillstring()
        
    def FillData(self,data):
        #Need to validate data before adding
        self.Model = StandardString(data["Rig_Model"].iloc[0])
        self.Manufacturer = StandardString(data["Rig_Manufacturer"].iloc[0])
        self.Rig_ID = StandardString(data["Rig_ID"].iloc[0])
        self.Drill_Type = DrillType(int(data["Drill_Type"].iloc[0]))
        self.MWD_Type = MWDType(int(data["MWD_Type"].iloc[0]))
        self.Bit_Type = BitType(int(data["Bit_Type"].iloc[0]))
        self.Bit_Model = StandardString(data["Bit_Model"].iloc[0])
        self.Bit_Size = data["Bit_Size"].iloc[0]
        self.Bit_Date = data["Bit_Date"].iloc[0]
        
    def AddSensor(self,sensor = None):
        if sensor is not None:
            if not self.Sensors.has_key(sensor.Serial_Number):   
                self.Sensors[sensor.Serial_Number]=sensor
                return True
            else:
                return False

#==============================================================================

class Drillstring(object):
    __componentId__ = 1
    
    def __init__(self,length=22.5,steel_od=10.75):
        self.Total_Length = length
        self.Steel_OD = steel_od
        self.Components = pd.DataFrame(columns = DRILLSTRING_COLUMNS)
        
    def AddComponent(self,component):
        c = pd.Series([self.__componentId__,component.Component_Type,component.Presence],index=DRILLSTRING_COLUMNS)
        self.Components = self.Components.append(c, ignore_index = True)
        self.__componentId__ += 1
        
    def RemoveComponent(self,component_id):
        self.Components.set_index("ID")
        self.Components.drop(component_id,axis=0)

#==============================================================================

class DrillStringComponent(object):
    
    def __init__(self,component_type=DSComponentType.GENERIC,presence=DSComponentPresence.PRESENT):
        self.Component_Type = component_type
        self.Presence = presence

#==============================================================================

class Sensor(object):
    
    def __init__(self, sensor_type=SensorType.SSX, serial_number=1000, position=0.0, installation_diameter = 24.0, piezo_sr= 3200, piezo_maxg=500, mems_sr=3200, mems_maxg=200,axial_axis=MeasurementAxis.Y,tangential_axis=MeasurementAxis.X):
        self.SensorType = sensor_type
        self.Serial_Number = int(serial_number)
        self.Position = position
        self.Installation_Diameter = installation_diameter
        self.Piezo_Sampling_Rate = piezo_sr
        self.Piezo_Max_G = piezo_maxg
        self.MEMS_Sampling_Rate = mems_sr
        self.MEMS_Max_G = mems_maxg
        self.Axial_Axis = axial_axis
        self.Tangential_Axis = tangential_axis
        self.Files = {}

    def FillData(self,data):
        #Need to validate data before adding
        self.SensorType = SensorType(int(data["Sensor_Type"].iloc[0]))
        self.Serial_Number = int(data["Serial_Number"].iloc[0])
        self.Position = float(data["Position"].iloc[0])
        self.Installation_Diameter = float(data["Installation_Diameter"].iloc[0])
        self.Piezo_Sampling_Rate = int(data["Piezo_Sampling_Rate"].iloc[0])
        self.Piezo_Max_G = int(data["Piezo_Max_G"].iloc[0])
        self.MEMS_Sampling_Rate = int(data["MEMS_Sampling_Rate"].iloc[0])
        self.MEMS_Max_G = int(data["MEMS_Max_G"].iloc[0])
        self.Axial_Axis = MeasurementAxis(int(data["Axial_Axis"].iloc[0]))
        self.Tangential_Axis = MeasurementAxis(int(data["Tangential_Axis"].iloc[0]))
    
    def AddFile(self,datafile):
        self.Files[datafile.File_Name] = datafile
        
    def HasFile(self,filename):
        if filename in self.Files.keys():
            return True
        else:
            return False
        

#==============================================================================

class DataFile(object):
    __blasthole__ = 0
    def __init__(self,date=datetime.today(),file_name=datetime.now().strftime("%Y%m%d"),comment=""):
        self.Date = datetime.strptime(date,"%Y-%m-%d")
        self.File_Name = file_name
        self.Blastholes = pd.DataFrame(columns=BLASTHOLE_COLUMNS)
        self.Comment = comment
        
    def AddBlasthole(self,blasthole):
        try:
            bh = pd.Series([blasthole.ID,blasthole.Start_Time, blasthole.End_Time],index=BLASTHOLE_COLUMNS)
            self.Blastholes = self.Blastholes.append(bh, ignore_index=True)
            self.__blasthole__ += 1
        except:
            print(sys.exc_info())
            
    def GetDate(self,date_format):
        return self.Date.strftime(date_format)

#==============================================================================

class Blasthole(object):
    
    def __init__(self,blasthole_id = 0, start_time=datetime.now(),end_time=datetime.now()):
        self.ID = blasthole_id
        self.Start_Time = start_time
        self.End_Time = end_time
        
    def InBlastholeInterval(self,value):
        return value >= self.Start_Time and value < self.End_Time

#==============================================================================
#EXEPTIONS
#==============================================================================
    
#==============================================================================
#MAIN
#==============================================================================

def main():
    pass
    
if __name__ == "__main__":
    main()
    
