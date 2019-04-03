# -*- coding: utf-8 -*-
"""
Created on Tue Jun 26 15:10:45 2018

@author: Natal
"""
from __future__ import absolute_import, division, print_function

import os
import pdb
from datetime import datetime

from enum import Enum


#TODO: Don't modify the name whith addPrefix/Suffix, only return the modified string

class ExtensionType(Enum):
    SEGY = "sgy"
    CSV = "csv"
    IDE = "IDE"
    PNG = "png"

class FileObject(object):
    
    def __init__(self, filename):
        self._AbsPath = os.path.abspath(filename)
        self._TimeStamp = ""
        self._SensorTypeFolder = ""
        self._OriginalName = os.path.basename(filename)
        
        
    def __splitName__(self,filename):
        name_components = filename.split(".")
        if len(name_components) > 1:
            extension = name_components[-1]
            name = ".".join(name_components[0:-1])
        else:
            name = name_components[0]
            extension = ""
        return name,extension
    
    def addPrefix(self,prefix):
        self._AbsPath = os.path.join(self.Path,"_".join([prefix,self.FullName]))
        return self._AbsPath
    
    def addSuffix(self,suffix):
        new_name = "_".join([self.Name,suffix])
        new_name = ".".join([new_name,ExtensionType(self.Extension).value])
        self._AbsPath = os.path.join(self.Path,new_name)
        return self._AbsPath
    
    def removeFromName(self,suffix):
        new_name = self.Name.replace("_"+suffix,"")
        new_name = ".".join([new_name,ExtensionType(self.Extension).value])
        self._AbsPath = os.path.join(self.Path,new_name)
        return self._AbsPath
    
    def changePath(self,new_path):
        if not os.path.exists(new_path):
            os.makedirs(new_path)
        self._AbsPath = os.path.join(new_path,self.FullName)
        
    def addDirToPath(self,new_dir):
        self.changePath(os.path.join(self.Path,new_dir))
        
    def changeExtension(self,new_extension=ExtensionType.SEGY):
        new_name = ".".join([self.Name,new_extension.value])
        self._AbsPath = os.path.join(self.Path,new_name)
        
    def setTimeStamp(self):
#        print(datetime.now().strftime("%Y-%m-%d-%H-%M-%S"))
        self._TimeStamp = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    
    @property
    def AbsPath(self):
        return self._AbsPath
    
    @property
    def Path(self):
        return os.path.dirname(self._AbsPath)
    
    @property
    def FullName(self):
        return os.path.basename(self._AbsPath)
    
    @property
    def Name(self):
        name,ext = self.__splitName__(self.FullName)
        return name
    
    @property
    def Extension(self):
        name,ext = self.__splitName__(self.FullName)
        return ExtensionType(ext)
    
    @property
    def TimeStamp(self):
        return self._TimeStamp
  
    @TimeStamp.setter
    def TimeStamp(self,time_stamp):
        self._TimeStamp = time_stamp
    
    @property
    def SensorTypeFolder(self):
        return self._SensorTypeFolder
  
    def SetSensorTypeFolder(self,channel_id):
        if channel_id == 8:
            self._SensorTypeFolder = "piezo"
        elif channel_id == 32:
            self._SensorTypeFolder = "mems"
        else:
            self._SensorTypeFolder = ""
    
    @property
    def OriginalName(self):
        return self._OriginalName
    
    def ReplaceFolder(self,old_value,new_value):
        self.changePath(self.Path.replace(old_value,new_value))
    

def main():
    a = FileObject("E:/toConvert/Test/This.is.a.test.IDE")
    a.setTimeStamp()
#    a.addPrefix("Prefix")
#    a.addSuffix("Suffix")
#    a.changePath("e:/toConvert/new_path/")
#    a.changeExtension(ExtensionType.CSV)
    pdb.set_trace()
    print(a)
 
if __name__ == "__main__":
    pass
    #main()
    
