'''
Command-line utility to batch export IDE files as SEGY Intended for
small files.

Created on Jan 26, 2016

@author: dstokes

Modified by NRN on May 22, 2018
'''
from __future__ import absolute_import, division, print_function
from datetime import datetime
from sys import platform
import locale
import os.path
import sys
import time#import pdb
import glob
from mide_ebml import importer
import csv
import BH_times_from_pressure as bht
import data_formats as df
import pandas as pd
import path_manager as pm
import rhino
import pdb
import dcrhino.constants as CONST

#===============================================================================
#
#===============================================================================

class SEGYExportError(Exception):
    pass
    
#===============================================================================
#
#===============================================================================

def exportSEGY(events, outFileObj, Rhino, **kwargs):
    """ Wrapper for SEGY export
    """
    return events.exportSEGY(outFileObj,Rhino, **kwargs)


#===============================================================================
#
#===============================================================================


class CSVExportError(Exception):
    pass
    
#===============================================================================
#
#===============================================================================

def exportCSV(events, filename, **kwargs):
    """ Wrapper for SEGY export
    """
    with open(filename, 'wb') as f:
        return events.exportCsv(f, **kwargs)


#===============================================================================
#
#===============================================================================
def exportAsArray(events,**kwargs):
    return events.exportArray()        
#===============================================================================
#
#===============================================================================    
    
def getIDEFiles(path):
    pass       
#===============================================================================
#
#===============================================================================    
        
class SimpleUpdater(object):
    """ A simple text-based progress updater. Simplified version of the one in
        `mide_ebml.importer`
    """

    def __init__(self, cancelAt=1.0, quiet=False, out=sys.stdout, precision=0):
        """ Constructor.
            @keyword cancelAt: A percentage at which to abort the import. For
                testing purposes.
        """
        
        
        if platform == "linux" or platform == "linux2":
            locale.setlocale(locale.LC_ALL,'en_US.UTF-8')
        elif platform == "darwin":
            locale.setlocale(locale.LC_ALL,'en_US.UTF-8')
        elif platform == "win32":
            locale.setlocale(0,'English_United States.1252') 

        self.out = out
        self.cancelAt = cancelAt
        self.quiet = quiet
        self.precision = precision
        self.reset()
    
    
    def reset(self):
        self.startTime = None
        self.cancelled = False
        self.estSum = None
        self.lastMsg = ''
    
        if self.precision == 0:
            self.formatter = " %d%%"
        else:
            self.formatter = " %%.%df%%%%" % self.precision
    
    def dump(self, s):
        if not self.quiet:
            self.out.write(s)
            self.out.flush()
    
    def __call__(self, count=0, total=None, percent=None, error=None,
                 starting=False, done=False, **kwargs):
        if starting:
            self.reset()
            return
        if percent >= self.cancelAt:
            self.cancelled=True
        if self.startTime is None:
            self.startTime = time.time()
        if done:
            self.dump(" Done.".ljust(len(self.lastMsg))+'\n')
            self.reset()
        else:
            if percent is not None:
                num = locale.format("%d", count, grouping=True)
                msg = "%s samples read" % num
                if msg != self.lastMsg:
                    self.lastMsg = msg
                    msg = "%s (%s)" % (msg, self.formatter % (percent*100))
                    dT = time.time() - self.startTime
                    if dT > 0:
                        sampSec = count/dT
                        msg = "%s - %s samples/sec." % (msg, locale.format("%d", sampSec, grouping=True))
                    self.dump(msg)
                    self.dump('\x08' * len(msg))
                    self.lastMsg = msg
                if percent >= self.cancelAt:
                    self.cancelled=True
            sys.stdout.flush()

#===============================================================================
#
#===============================================================================

def showInfo(ideFilename, **kwargs):
    """
    """
    print (ideFilename)
    print ("=" * 70)
    with open(ideFilename, 'rb') as stream:
        doc = importer.openFile(stream, **kwargs)
        print ("Sensors")
        print ("-" * 40)
        for s in sorted(doc.sensors.values()):
            print ("  Sensor %d: %s" % (s.id, s.name))
            if s.traceData:
                for i in s.traceData.items():
                    print ("    %s: %s" % i)
        print()
        print ("Channels")
        print ("-" * 40)
        for c in sorted(doc.channels.values()):
            print ("  Channel %d: %s" % (c.id, c.displayName))
            for sc in c.subchannels:
                print ("    Subchannel %d.%d: %s" % (c.id, sc.id, sc.displayName))
    print ("=" * 70)
    

#===============================================================================
#
#===============================================================================

def BuildRHINO(headers_file, ideFileObj,drill_times):
    try:
        Rhino = rhino.RHINO()
        drill_headers = pd.read_csv(headers_file.AbsPath)                
        file_header = drill_headers[drill_headers["Filename"]==ideFileObj.FullName]
        if len(file_header) < 1:
            raise ValueError("The header for file " + ideFileObj.FullName + " was not found in the drill headers")
        elif len(file_header) >1:
            raise ValueError("There are duplicate file names in the drill header file")
        
        #create the RHINO.File object
        r_file  = rhino.DataFile(date=file_header["Recording_Date"].iloc[0],file_name=file_header["Filename"].iloc[0], comment = file_header["Comments"].iloc[0])
        for index,row in drill_times.iterrows():
            blasthole = rhino.Blasthole(blasthole_id=int(row["Blasthole"]),start_time=row["StartTime"],end_time=row["EndTime"])
            r_file.AddBlasthole(blasthole)
        
        #Create the RHINO.Sensor Object
        r_sensor = rhino.Sensor()
        r_sensor.FillData(file_header[["Sensor_Type","Serial_Number","Position","Installation_Diameter", "Piezo_Sampling_Rate", "Piezo_Max_G","MEMS_Sampling_Rate","MEMS_Max_G","Axial_Axis","Tangential_Axis"]])
        #Add the data file to the sensor
        r_sensor.AddFile(r_file)
        
        #Create the RHINO.Drillstring Object
        r_drillstring = rhino.Drillstring(file_header["DS_Total_Length"].iloc[0],file_header["DS_Steel_OD"].iloc[0])
        
        #Create the drillstring components
        for component in range(rhino.MAX_DRILLSTRING_COMPONENTS):
            key = "DS_Component"+str(component+1)
            r_ds_component = rhino.DrillStringComponent(component_type = rhino.DSComponentType.GENERIC,presence = file_header[key].iloc[0])
            r_drillstring.AddComponent(r_ds_component)
        
        #Create the RHINO.Drill Object
        r_drill = rhino.Drill()
        r_drill.FillData(file_header[["Rig_Model","Rig_Manufacturer","Rig_ID","Drill_Type","MWD_Type","Bit_Type","Bit_Model","Bit_Size","Bit_Date"]])
        r_drill.Drillstring = r_drillstring
        r_drill.AddSensor(r_sensor)
        
        #Create the RHINO.Mine object
        Rhino.Mine.FillData(file_header[["Mine_Country","Mine_Company","Mine_Name","Recording_Engineer"]])
        Rhino.Mine.AddDrill(drill = r_drill)
        Rhino.Current_File = ideFileObj.FullName
        Rhino.Current_Drill_ID = r_drill.Rig_ID
        return Rhino
    except:
        print("Build Rhino Error")
        print(sys.exc_info())

    
#===============================================================================
#
#===============================================================================    

def ideExport(ideFileObj, headers_file, channels=None,
            startTime=0, endTime=None, updateInterval=1.5,
            out=sys.stdout, outputType=None,manual_drill_times="Auto",expected_sampling_rate=3200, delimiter=',', noBivariates=False, **kwargs):
    """ The main function that handles generating exported files from an IDE file.
    """
    channels.insert(0,59) # Add the pressure channel to get the estimated time boundaries for each blasthole
    updater = kwargs.get('updater', importer.nullUpdater)
#     maxSize = max(1024**2*16, min(matfile.MatStream.MAX_SIZE, 1024**2*maxSize))

    def _printStream(*args):
        out.write(" ".join(map(str, args)))
        out.flush()

    def _printNone(*args):
        pass

    if out is None:
        _print = _printNone
    else:
        _print = _printStream   
        

    if(outputType == "sgy"):
        SEGY = True
        exporter = exportSEGY
        outputType = pm.ExtensionType.SEGY 
    else:
        exporter = exportCSV
        outputType = pm.ExtensionType.CSV
    
    exportArgs = {}
    Rhino = rhino.RHINO()
    
    doc = importer.importFile(ideFileObj.AbsPath)
    sensor_serial_number = doc.recorderInfo["RecorderSerial"]
    if channels is None:
        exportChannels = doc.channels.values()
    else:
        exportChannels = [c for c in doc.channels.values() if c.id in map(int,channels)]
    
    exportChannels.reverse()#Reverse the list so that the first channel that gets processed is 59 and get the pressure data

    numSamples = 0
    for ch in exportChannels:
       #Ch 8 = Main Acceleration
       #Ch 32 = MEMS Acceleration
       #Ch 59.0 = Pressure Data 
        try:
            suffix = "%s_Ch%02d" % (sensor_serial_number, ch.id)
            outFileObj = pm.FileObject(ideFileObj.AbsPath)
            outFileObj.TimeStamp = ideFileObj.TimeStamp
            outFileObj.SetSensorTypeFolder(ch.id)
            outFileObj.addSuffix(suffix)
            outFileObj.changeExtension(outputType)
            if SEGY:
                if ch.id == 59:
#                    outFileObj.addDirToPath("run_"+outFileObj.TimeStamp)#This line is to create time stamped folder for each conversion run
                    if manual_drill_times == "Auto":
                        print("Estimating Drill Times")
                        events = ch.getSession()#This gets a session that already exists, so it won't change the noBivariates flag at all
                        pressure_data = exportAsArray(events, callback=updater, **exportArgs)
                        drill_times = bht.FindBHTimes(pressure_data,outFileObj)
                    else:
                        print("Loading Drill Times")
                        drill_times= pd.read_csv(manual_drill_times.AbsPath)
                    print("Composing Drill Headers")
                    Rhino = BuildRHINO(headers_file,ideFileObj,drill_times)
                else:
                    outFileObj.ReplaceFolder("level_0","level_1")
                    outFileObj.addDirToPath(outFileObj.SensorTypeFolder)
                    outFileObj.addDirToPath(str(expected_sampling_rate)+"hz")
                    Rhino.current_channel_id = rhino.AccelerometerType(ch.id)
#                    outFileObj.addDirToPath("run_"+outFileObj.TimeStamp)#This line is to create time stamped folder for each conversion run
                    print("  Exporting Channel %d (%s) to %s..." % (ch.id, ch.name, outFileObj.AbsPath))
                    events = ch.getSession()#This gets a session that already exists, so it won't change the noBivariates flag at all
                    numSamples += exporter(events, outFileObj, Rhino, callback=updater, **exportArgs)[0]
            else:
                print("  Exporting Channel %d (%s) to %s..." % (ch.id, ch.name, outFileObj.AbsPath))
                events = ch.getSession()#This gets a session that already exists, so it won't change the noBivariates flag at all
                numSamples += exporter(events, outFileObj.AbsPath, callback=updater, **exportArgs)[0]
            outFileObj.removeFromName(suffix)
        except None:
            pass
    doc.close()
    return numSamples,Rhino

#===============================================================================
#
#===============================================================================    

def csvExport(sourceFileObj, headers_file,manual_drill_times,expected_sampling_rate=3200):
    """ The main function that handles generating exported files from a CSV file.
    """
    
    outputType = pm.ExtensionType.SEGY 
    Rhino = rhino.RHINO()
    
    #TODO: Read a config file with recorder serial number
    sensor_serial_number = 1008# Inital RHINO sensor serial number

    numSamples = 0
    
    try:
        suffix = "%s_RHINO" % (sensor_serial_number)
        outFileObj = pm.FileObject(sourceFileObj.AbsPath)
        outFileObj.TimeStamp = sourceFileObj.TimeStamp
        outFileObj.SetSensorTypeFolder(8)#Legacy from IDE files for Piezo accelerometers
#        outFileObj.SetSensorTypeFolder(32)#Legacy from IDE files for MEMS accelerometers
        outFileObj.addSuffix(suffix)
        outFileObj.changeExtension(outputType)
        print("Estimating Drill Times")
        drill_times= pd.read_csv(manual_drill_times.AbsPath)
        print("Composing Drill Headers")
#        pdb.set_trace()
        Rhino = BuildRHINO(headers_file,sourceFileObj,drill_times)
        outFileObj.ReplaceFolder("level_0","level_1")
        outFileObj.addDirToPath(outFileObj.SensorTypeFolder)
        outFileObj.addDirToPath(str(expected_sampling_rate)+"hz")
        Rhino.current_channel_id = rhino.AccelerometerType.PIEZO#legacy from IDE files for Piezo accelerometers
#        Rhino.current_channel_id = rhino.AccelerometerType.MEMS#legacy from IDE files for MEMS accelerometers
        
#       outFileObj.addDirToPath("run_"+outFileObj.TimeStamp)#This line is to create time stamped folder for each conversion run
        print("  Exporting RHINO to %s..." % (outFileObj.AbsPath))
        segy = df.SEGY(int(expected_sampling_rate),Rhino)
        print(segy.stream)
        
        with open(sourceFileObj.AbsPath, 'rb') as csvfile:
            raw_data = csv.reader(csvfile)
            for row in raw_data:
                segy.addSample(formatter(row,"1000000,3,4,5"),0.0)#For RHINO sensor
#                segy.addSample(formatter(row,"1,1,2,3"),0.0)#For IDE exported to csv
                numSamples += 3
            segy.saveSEGY(outFileObj)    
            
    except None:
        pass
    return numSamples,Rhino

#===============================================================================
#
#===============================================================================    

def formatter(row,file_format):
    file_format = file_format.split(",")
    time_multiplier = float(file_format[0])
    x_row = int(file_format[1])
    y_row = int(file_format[2])
    z_row = int(file_format[3])
    
    time = float(row[0])*time_multiplier
    
    return ",".join(['{:.6f}'.format(time),convertADC(row[x_row]),convertADC(row[y_row]),convertADC(row[z_row])])

#===============================================================================
#
#===============================================================================    

def convertADC(value):
    #TODO: Read the calibration for each individual sensor to convert to G instead of voltages
    return str(int(value)/65535*5)
#===============================================================================
#
#===============================================================================

if __name__ == "__main__":
    import argparse
    
    argparser = argparse.ArgumentParser(description="IDE to SEGY Converter v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-f', '--format', help="The type of file to export.", choices=('sgy','csv'), default="sgy")
    argparser.add_argument('-c', '--channel', action='append', type=int, help="Export the specific channel. Can be used multiple times. If not used, all channels will export.")
    argparser.add_argument('-b','--bvr',choices=('True','False'),help="Remove Bivariate references",default='True')
    argparser.add_argument('-l', '--trace_length', help="Trace Length", default='1')
    argparser.add_argument('-s', '--sample_rate', help="Expected Sample Rate", default = '3200')
    argparser.add_argument('-p', '--path', help="Path for the input files", default=CONST.DATA_PATH)
    argparser.add_argument('-d','--drill_headers', help="Name of the <drill_headers.csv> file")
    argparser.add_argument('-t','--drill_times',help="Name of the <manual_drill_times.csv> file or Auto for automatic detection", default='Auto')
    argparser.add_argument('-i','--input_format',help="Type of file to read",choices=("IDE","csv"),default='IDE')

    args = argparser.parse_args()
    
    if(int(args.trace_length)*int(args.sample_rate)>32767):
        max_trace_len = 32767//int(args.sample_rate)
        print("The maximum Trace Lengt for a sampling rate of {} is {} second(s)".format(args.sample_rate,max_trace_len))
        sys.exit(0)
       
    #args.channel = [8]
    #args.format = "csv"
    if args.bvr == 'True':
        noBvr = True
    else:
        noBvr = False
    
    if os.path.exists(args.path):
        path = args.path
    else:
        print("Input path does not exist.  Try a different path")
        sys.exit(0)
    
    if os.path.isdir(path):
        sourceFiles = glob.glob(path+"*."+args.input_format)
    else:
        sourceFiles = glob.glob(path)
        path = os.path.dirname(path)
        
    headers = os.path.join(os.path.join(path,args.drill_headers))
    
    if not os.path.exists(headers):
        print("Drill headers file was not found: " + str(headers))
        sys.exit(0)
        
    headers_file = pm.FileObject(headers)
        
    if args.drill_times == "Auto":
        drill_times = "Auto"
    else:
        drill_times = os.path.join(os.path.join(path,args.drill_times))
        
        if not os.path.exists(drill_times):
            print("Manual drill times file was not found: " + str(drill_times))
            sys.exit(0)
            
        drill_times = pm.FileObject(drill_times)
    
        
    df.initBivariates(noBvr)
    df.initExpectedSampleRate(int(args.sample_rate))
    df.initTraceLength(int(args.trace_length))
    Session_Rhino = rhino.RHINO()
    try:
        totalSamples = 0
        t0 = datetime.now()
        updater=SimpleUpdater()
        for f in sourceFiles:
            source_file = pm.FileObject(f)
            source_file.TimeStamp = Session_Rhino.SessionTimeStamp("%Y-%m-%d_%H-%M-%S")
            print ('Converting "%s"...' % f)
            updater.precision = max(0, min(2, (len(str(os.path.getsize(os.path.join(path,f))))/2)-1))
            updater(starting=True)
            #Export the File as SEGY
            if args.input_format == "IDE":
                numSamples, file_Rhino = ideExport(source_file,
                                          headers_file = headers_file,
                                          channels=args.channel,
                                          outputType=args.format,
                                          expected_sampling_rate=args.sample_rate,
                                          manual_drill_times=drill_times,
                                          updater=updater)
            else:
                numSamples, file_Rhino = csvExport(source_file,headers_file = headers_file,manual_drill_times=drill_times,expected_sampling_rate=args.sample_rate)
            totalSamples += numSamples
            #Change the following lines to Session_Rhino.Mine.Update(file_Rhino.Mine)
            #TODO: Add all the files to the Session_Rhino object
            if Session_Rhino.Mine.IsEmpty():
                Session_Rhino.Mine = file_Rhino.Mine
            else:
                #if Session_Rhino.Mine.HasDrill(file_Rhino.Current_Drill_ID):
                    #Session_Rhino.Mine.UpdateDrill(file_Rhino.Mine.Drills[file_Rhino.Current_Drill_ID])
                #else:
                Session_Rhino.Mine.AddDrill(file_Rhino.Mine.Drills[file_Rhino.Current_Drill_ID])
        
        totalTime = datetime.now() - t0
        tstr = str(totalTime).rstrip('0.')
        sampSec = locale.format("%d", totalSamples/totalTime.total_seconds(), grouping=True)
        totSamp = locale.format("%d", totalSamples, grouping=True)
        print ("Conversion complete! Exported %s samples in %s (%s samples/sec.)" % (totSamp, tstr, sampSec))
        sys.exit(0)
    except SEGYExportError as err:
        print ("*** Export error: %s") % err
        sys.exit(1)
    except KeyboardInterrupt:
        print ("\n*** Conversion canceled! Export of %s may be incomplete." % f)
        sys.exit(0)
    except None as err: #Exception as err:
        print ("*** An unexpected %s occurred. Is source an IDE file?" % err.__class__.__name__)
        print ("*** Message: %s" % err.message)
        sys.exit(1)
#     except IOError as err: #Exception as err:
#         print "\n\x07*** Conversion failed! %r" % err
