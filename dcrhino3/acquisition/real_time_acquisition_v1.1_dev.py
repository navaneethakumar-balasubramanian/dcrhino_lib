# Serial logger with no QT.
# This version is with threads.
# v0.2
from __future__ import absolute_import, division, print_function
import serial
import threading
import Queue#queue for python 3
import struct
import signal
import sys
import time
import socket
import ConfigParser
import os
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.acquisition.constants import DATA_PATH, LOGS_PATH, RAM_PATH
from dcrhino3.acquisition.config_file_utilities import config_file_to_attrs
from dcrhino3.acquisition.system_health_display_gui import GUI
import pdb
import time
import numpy as np
from math import ceil
import matplotlib.pyplot as plt
if plt.get_backend() == "Qt4Agg":
    pass
else:
    plt.switch_backend('TkAgg')
plt.ioff()
import h5py

from datetime import datetime
import json
import calendar
import subprocess
# import atexit
import re
from shutil import copyfile
from dcrhino3.models.config import Config
from dcrhino3.models.metadata import Metadata
# from dcrhino.process_pipeline.trace_processing import TraceProcessing
from dcrhino3.acquisition.external.seismic_wiggle import seismic_wiggle
from dcrhino3.models.traces.raw_trace import RawTraceData


config_collection_file_path = os.path.join(PATH,'collection_daemon.cfg')

config = ConfigParser.SafeConfigParser()
config.read(config_collection_file_path)


def get_rhino_ttyusb():
    p = subprocess.check_output('ls -l /dev/serial/by-id/ | grep "usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_" | grep -Po -- "../../\K\w*"',shell=True)
    return p.replace('\n','')


rhino_baudrate = config.getint("COLLECTION", "baud_rate")
rhino_pktlen = config.getint("COLLECTION", "packet_length")
data_message_identifier = int(config.get("COLLECTION","data_message_identifier",0x64),16)
info_message_identifier = int(config.get("COLLECTION","info_message_identifier",0x69),16)
# pdb.set_trace()
rhino_ttyusb = get_rhino_ttyusb()
rhino_port = "/dev/"+rhino_ttyusb
rhino_serial_number = config.get("INSTALLATION","sensor_serial_number","S9999")
rhino_version = config.get("COLLECTION","rhino_version")
run_start_time = time.time()
battery_max_voltage = config.getfloat("INSTALLATION","battery_max_voltage")
battery_lower_limit = config.getfloat("INSTALLATION","battery_min_voltage")


#run_folder_path = DATA_PATH + "run_" + str(int(run_start_time))+"/"
#local_folder = config_collection.get("DATA_TRANSMISSION","local_folder",DATA_PATH)
local_folder = config.get("DATA_TRANSMISSION","local_folder",DATA_PATH)
if len(local_folder)==0:
    local_folder = DATA_PATH
run_folder_path = os.path.join(local_folder, "run_{}".format(datetime.utcfromtimestamp(run_start_time).strftime('%Y%m%d_%H%M%S')))


class LogFileDaemonThread(threading.Thread):
    def __init__(self,logQ):
        threading.Thread.__init__(self)
        self.logQ= logQ
        self.filename = os.path.join(LOGS_PATH,datetime.now().strftime('%Y_%m_%d_%H')+'.log')
        self.output_file = open(self.filename, 'ar', buffering=0)

    def run (self):
        while True:
            try:
                filename = os.path.join(LOGS_PATH,datetime.now().strftime('%Y_%m_%d_%H')+'.log')
                #print(self.filename,filename)
                if self.filename != filename:
                    self.change_files(filename)
                self.log()
                time.sleep(1)
            except:
                print("Log File Daemon Thread", sys.exc_info())

    # def stop(self,external_message):
    def stop(self):
        # self.output_file = open(self.filename, 'ar', buffering=0)
        while not self.logQ.empty():
            message = self.logQ.get_nowait()
            self.output_file.write(message)
            self.output_file.flush()
        # self.output_file.write(external_message)
        # self.output_file.flush()
        self.output_file.close()

    def change_files(self,filename):
        self.output_file.close()
        self.output_file = open(filename, 'ar', buffering=0)

    def log(self):
        while not self.logQ.empty():
            message = self.logQ.get_nowait()
            self.output_file.write(message)
            self.output_file.flush()


class Packet(object):
    def __init__(self,q_data):
        self.packet_type = 0 # 0=data_packet, 1=info_packet
        # lst = struct.unpack('=bLbbHHHLLb',q_data)
        self.rx_sequence = 0
        self.x = 0
        self.y = 0
        self.z = 0
        self.tx_clock_ticks = 0 #Each clock tick is 10 microseconds
        # # self.tx_sequence = lst[8]
        #
        # #this is in preparation for new data stream with battery, rssi and temp
        # import random
        self.rssi = 0
        self.temp = 0
        self.batt = 0
        self.sleep_time = 0
        self.packet_decoder(q_data)

    def calc_rssi_value(self,rssi_val):
        calc_val = 0
        offset = 0  # this needs to be calculated.
        if rssi_val >= 128:
            calc_val = ((rssi_val - 256)/2.) - offset
        else:
            calc_val = (rssi_val/2.) - offset
        return calc_val

    def calc_temp_in_c(self,val):
        #val = (val >> 4)*0.0625
        #return val
        if val & 0x8000:
            val = val - 0xFFF0
        val = (val >> 4) * 0.0625
        return val

    def calc_batt(self,val):
        val = ((val/4096.)*13.2)+0.5
        return round(val,2)

    def packet_decoder(self, pkt):
        try:
            lst = struct.unpack('=bbLbLLLbb',pkt)
        except:
            print("Lenght - ",len(pkt), pkt)
        msgtype = lst[1]
        # print(msgtype)
        # ln = ''
        if msgtype == data_message_identifier:
            # this is a data msg.
            self.packet_type = 0
            self.rx_sequence= lst[2]
            self.x= lst[4]
            self.y=lst[5]
            # print(self.x,self.y)
            self.tx_clock_ticks=lst[6]
            self.rssi=self.calc_rssi_value(lst[7])
            # x = lst[4]
            # y = lst[5]
            # ts = lst[6]
            # rssi = lst[7]
            # self.curts = time.time()
            # ln = 'data,'+str(self.curts)+','+str(rseq)+','+str(x)+','+str(y)+','+str(ts)+','+str(calc_rssi_value(rssi))+','+str(self.seq)+'\n'
        # elif msgtype == info_message_identifier:
        else:
            # pdb.set_trace()
            self.packet_type = 1
            lst = struct.unpack('=bbLbHHHbbbbbbbb',pkt)
            self.rx_sequence = lst[2]
            self.temp = self.calc_temp_in_c(lst[4])
            self.batt = self.calc_batt(lst[5])
            self.sleep_time = lst[6]
            self.rssi=self.calc_rssi_value(lst[7])
            # self.curts = time.time()
            # Need to convert these values - temp and vbat
            # ln = 'info,'+str(self.curts)+','+str(rseq)+','+str(temp)+','+str(vbat)+','+str(calc_rssi_value(rssi))+','+str(self.seq)+'\n'
        # self.fl.write(ln)
        # self.fl.flush()





class FileFlusher(threading.Thread):

    def __init__(self, flushq,logQ,displayQ):#def __init__(self, flushq,secsq,logQ,displayQ):
        threading.Thread.__init__(self)
        self.flushq = flushq
        self.logQ = logQ
        self.displayQ = displayQ
        self.stope = threading.Event()
        self.stope.clear()
        self.previous_timestamp = 0
        self.current_timestamp  = 0
        self.sequence = 0
        self.buffer = []
        self.elapsed_tx_sequences = 0
        self.elapsed_tx_clock_cycles = 0
        self.counter_changes = 0
        self.rhino_serial_number = rhino_serial_number
        self.last_rollback = 0
        self.tx_status = 0

    def first_packet_received(self,packet,timestamp):
        self.current_timestamp = timestamp
        self.last_rollback = timestamp
        self.sequence = packet.tx_clock_ticks
        self.previous_timestamp = packet.tx_clock_ticks
        self.previous_second = int(self.current_timestamp)
        m = "{}: START SEQUENCE = {}\n".format(datetime.utcfromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S"),packet.tx_clock_ticks)
        self.logQ.put(m)
        self.displayQ.put(m)
        print(m)

    def get_data_from_q(self):
        return self.flushq.get(False,0.001)

    def calculate_packet_timestamp(self,packet):
        reference = time.time()
        self.elapsed_tx_clock_cycles = packet.tx_clock_ticks - self.sequence
        self.current_timestamp += self.elapsed_tx_clock_cycles * 10/1000000.0
        self.sequence = packet.tx_clock_ticks

        diff = int(self.current_timestamp-reference)
        if self.current_timestamp > reference:
            self.current_timestamp = reference

        if int(self.current_timestamp) - self.previous_second > 0:
            self.previous_timestamp = packet.tx_clock_ticks
            self.previous_second = int(self.current_timestamp)
            self.counter_changes +=1
            m = "('Changed', {},{},{},{})\n".format(int(self.current_timestamp),int(reference), diff,self.counter_changes)
            self.logQ.put(m)
            self.displayQ.put(m)

        return self.current_timestamp

    def adjust_drift(self,reference):
        diff = int(self.current_timestamp-reference)
        if diff>0:
            rollback_interval = reference - self.last_rollback
            self.last_rollback = reference
            m = ("{}: The Calculated Time of {} is greater than the actual time of {}.  Rolling back in time.  Rollback interval was {} sec\n".format(datetime.utcfromtimestamp(reference).strftime("%Y-%m-%d %H:%M:%S"),self.current_timestamp,reference,rollback_interval))
            self.logQ.put(m)
            self.displayQ.put(m)
            print(m)
            self.current_timestamp -=1
            self.counter_changes -=1
        return diff

    def save_row_to_processing_q(self,laptop_ts,timestamp,packet):
        #TODO: Create a class of row that will be appended to the buffer
        # row = ('' , str(self.current_timestamp),int(self.current_timestamp) , timestamp ,packet.tx_sequence,packet.tx_clock_ticks,packet.x,packet.y,packet.z,self.sequence, packet.rx_sequence,0,0,timestamp,packet.rssi,packet.temp,packet.batt,self.counter_changes,self.rhino_serial_number)
        row = (self.current_timestamp,laptop_ts,packet.tx_clock_ticks,packet.x,packet.y,packet.z,self.sequence,packet.rx_sequence,packet.rssi,packet.temp,packet.batt,self.counter_changes,self.rhino_serial_number)
        self.buffer.append(row)

    def stop(self):
        self.stope.set()

    def run(self):
        first_ts = time.time()
        first_seq = 0
        psec = None
        counter = 0
        prev = 0
        counterchanges = 0
        tx_restarted = False
        lst = ""
        self.current_temp = 0
        self.current_batt = 0
        self.current_rssi = 0
        self.current_sleep_time = 0

        while True:
            try:
                timestamp = time.time()
                laptop_ts = timestamp
                q_data = self.get_data_from_q()

                packet = Packet(q_data)
                # packet.rssi = current_rssi
                # pdb.set_trace()
                if packet.packet_type == 0:
                    self.tx_status = 1
                    packet.batt = self.current_batt
                    packet.temp = self.current_temp
                    packet.sleep_time = self.current_sleep_time
                    #print(self.calculate_packet_timestamp(packet))

                    #First packet received
                    if self.sequence == 0:
                        m = "{}: FIRST PACKET RECEIVED\n".format(datetime.utcfromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S"))
                        self.logQ.put(m)
                        self.displayQ.put(m)
                        self.first_packet_received(packet,timestamp)
                        self.save_row_to_processing_q(laptop_ts,timestamp,packet)
                    else:
                        #if it is a consecutive packet or if we missed any
                        # if packet.tx_sequence > self.sequence:
                        if packet.tx_clock_ticks > self.sequence:
                            timestamp = self.calculate_packet_timestamp(packet)
                            self.save_row_to_processing_q(laptop_ts,timestamp,packet)
                        # elif packet.tx_sequence == self.sequence:
                        elif packet.tx_clock_ticks == self.sequence:
                            # print (self.previous_timestamp, packet.tx_sequence)
                            print (self.previous_timestamp, packet.tx_clock_ticks)
                            self.previous_timestamp = 0
                            timestamp = self.calculate_packet_timestamp(packet)
                            m = "{}: DUPLICATED RECORD WILL BE IGNORED\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                            self.logQ.put(m)
                            self.displayQ.put(m)
                        else:
                            m = "{}: ADJUSTED FOR CLOCK ROLLOVER USING FIRST PACKET LOGIC\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                            self.logQ.put(m)
                            self.displayQ.put(m)
                            self.first_packet_received(packet,timestamp)
                            self.save_row_to_processing_q(laptop_ts,timestamp,packet)
                else:
                    m="{}: INFO MESSAGE RECEIVED\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                    self.logQ.put(m)
                    self.displayQ.put(m)
                    self.current_temp = packet.temp
                    self.current_batt = packet.batt
                    self.current_sleep_time = packet.sleep_time
                    self.tx_status = 0

            except Queue.Empty:
                # Handle empty queue here
                pass


class SerialThread(threading.Thread):
    def __init__(self, comport,brate,pktlen,flushq,logQ,displayQ):#def __init__(self, comport,brate,pktlen,flushq,secsq,logQ,displayQ):
        threading.Thread.__init__(self)
        self.cport = serial.Serial(comport, brate, timeout=1.0)
        self.pktlen = pktlen
        self.portOpen = True
        self.flushq = flushq
        self.logQ = logQ
        self.displayQ = displayQ
        self.stope = threading.Event()
        self.stope.clear()
        self._corrupt_packets = 0
        self.tx_status = 0

    def start_rx(self):
        #print("STARTED RX")
        self.cport.write(bytearray("ready\r\n","utf-8"))

    def stop_rx(self):
        self.cport.write(bytearray("stop\r\n", "utf-8"))
        self.cport.close()
        self.stope.set()

    def restart_rx(self):
        self.stop_rx()
        m = '{}: STOPPING SERIAL PORT\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        self.logQ.put(m)
        self.displayQ.put(m)
        self.cport = serial.Serial(comport, brate, timeout=1.0)
        m = '{}: FLUSHING SERIAL BUFFER\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        self.logQ.put(m)
        self.displayQ.put(m)
        self.start_rx()
        m = '{}: RESTARTING SERIAL PORT\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        self.logQ.put(m)
        self.displayQ.put(m)

    @property
    def corrupt_packets(self):
        return self._corrupt_packets


    def run (self):
        #while self.portOpen and not self.stope.isSet():
        counter = 0
        while True:
            try:
                a = self.cport.read(self.pktlen)
                if len(a)==self.pktlen and a[0] == b'\x02' and a[self.pktlen-1] == b'\x03':
                    counter = 0
                    if a[1] == b'\x64':
                        self.tx_status = 1
                    elif a[1] == b'\x69':
                        self.tx_status = 0
                    self.flushq.put(a)
                    last_a = a
                else:
                    if self.tx_status == 1:
                        counter += 1
                        self._corrupt_packets += 1
                        # print(self._corrupt_packets)
                        if len(a) >= self.pktlen:
                            #pdb.set_trace()
                            m = '{}: CORRUPT {} BYTE PACKET>>>>>>>>>>>>>>>>>>>>>{}\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),len(a),counter)
                            self.logQ.put(m)
                            self.displayQ.put(m)
                        else:
                            m = '{}: TRUNCATED {} BYTE PACKET>>>>>>>>>>>>>>>>>>>>>{}\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),len(a),counter)
                            self.logQ.put(m)
                            self.displayQ.put(m)

                        temp = self.cport.read(1)
                        while temp != b'\x03':
                            temp = self.cport.read(1)
                            if len(temp):
                                pass
                            else:
                                # print("temp is empty")
                                time.sleep(0.1)
                                self.start_rx()
                                m = '{}: ATEMPTING TO RESTART ACQUISITION\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                                self.logQ.put(m)
                                self.displayQ.put(m)
                    else:
                        m = '{}: SLEEPING\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                        self.logQ.put(m)
                        self.displayQ.put(m)
                        time.sleep(0.1)

            except:
                print("Serial Thread Exception")
                print(sys.exc_info())
                pass

class CollectionDaemonThread(threading.Thread):
    def __init__(self, buffer,tracesQ,logQ,displayQ):
        threading.Thread.__init__(self)
        self.buffer = buffer
        self.bufferThisSecond = []
        self.lastSecond = None
        self.tracesQ = tracesQ
        #self.logger = logger
        self.logQ = logQ
        self.displayQ = displayQ

    def run (self):
        lastFileName = None
        while True:
            try:
                if len(self.buffer) != 0:
                    #print (len(self.buffer))
                    # row = (0 =self.current_timestamp,
                    # 1=laptop_ts,
                    # 2=packet.tx_clock_ticks,
                    # 3=packet.x,
                    # 4=packet.y,
                    # 5=packet.z,
                    # 6=self.sequence,
                    # 7=packet.rx_sequence,
                    # 8=packet.rssi,
                    # 9=packet.temp,
                    # 10=packet.batt,
                    # 11=self.counter_changes,
                    # 12=self.rhino_serial_number)
                    #row = np.asarray(self.buffer.pop(0)[1:-1],dtype=np.float64)
                    row = np.asarray(self.buffer.pop(0)[0:-1],dtype=np.float64)
                    #print (int(row[1]))
                    #print(row)
                    if self.lastSecond != int(row[0]) :
                        temp_lastSecond = self.lastSecond
                        #print (self.lastSecond,row[1],len(self.bufferThisSecond))
                        self.lastSecond = int(row[0])

                        #dotheprocessing
                        if len(self.bufferThisSecond) >= 1:
                            self.bufferThisSecond = np.asarray(self.bufferThisSecond)
                            utc_dt = datetime.utcfromtimestamp(temp_lastSecond)

                            if lastFileName != utc_dt.hour:
                                prefix = utc_dt.strftime('%Y%m%d')+"_RTR"
                                delta = utc_dt - datetime(year=utc_dt.year,month=utc_dt.month,day=utc_dt.day)
                                elapsed = str(int(delta.total_seconds()))
                                leading_zeros = ""
                                if len(elapsed) < 5:
                                    leading_zeros = "0" * (5-len(elapsed))
                                filename = "{}{}{}_{}.h5".format(prefix,leading_zeros,elapsed,rhino_serial_number)
                                filename = os.path.join(run_folder_path,filename)
                                lastFileName = utc_dt.hour
                                first = True
                            h5f = h5py.File(filename, 'a')

                            if first:
                                first = False
                                h5f,m = config_file_to_attrs(config,h5f)
                                global_config = Config(Metadata(config))
                                self.displayQ.put(m)
                                self.logQ.put(m)
                                sensitivity = np.array([config.getfloat('PLAYBACK', 'x_sensitivity'),config.getfloat('PLAYBACK', 'y_sensitivity'),config.getfloat('PLAYBACK', 'z_sensitivity')],dtype=np.float32)
                                saveNumpyToFile(h5f,'sensitivity',sensitivity)
                                axis = np.array([config.getfloat('INSTALLATION', 'sensor_axial_axis'),config.getfloat('INSTALLATION', 'sensor_tangential_axis')],dtype=np.float32)
                                saveNumpyToFile(h5f,'axis',axis)



                            # row = (0 =self.current_timestamp,
                            # 1=laptop_ts,
                            # 2=packet.tx_clock_ticks,
                            # 3=packet.x,
                            # 4=packet.y,
                            # 5=packet.z,
                            # 6=self.sequence,
                            # 7=packet.rx_sequence,
                            # 8=packet.rssi,
                            # 9=packet.temp,
                            # 10=packet.batt,
                            # 11=self.counter_changes,
                            # 12=self.rhino_serial_number)
                            # pdb.set_trace()
                            laptop_ts = np.asarray(self.bufferThisSecond[:,1],dtype=np.float64)
                            ts = np.asarray(self.bufferThisSecond[:,0],dtype=np.float64)
                            seq = np.asarray(self.bufferThisSecond[:,7],dtype=np.int32)
                            cticks = np.asarray(self.bufferThisSecond[:,2],dtype=np.int32)
                            x = np.asarray(self.bufferThisSecond[:,3],dtype=np.uint32)
                            y = np.asarray(self.bufferThisSecond[:,4],dtype=np.uint32)
                            z = np.asarray(self.bufferThisSecond[:,5],dtype=np.uint32)


                            #this is in preparation for new data stream with battery, rssi and temp
                            rssi = np.asarray(self.bufferThisSecond[:,8],dtype=np.int32)
                            temp = np.asarray(self.bufferThisSecond[:,9],dtype=np.int32)
                            batt = np.asarray(self.bufferThisSecond[:,10],dtype=np.int32)
                            counterchanges = np.asarray(self.bufferThisSecond[:,11],dtype=np.int32)[-1]
                            # pdb.set_trace()



                            #Save to raw_data_file
                            saveNumpyToFile(h5f,'laptop_ts',laptop_ts)
                            saveNumpyToFile(h5f,'ts',ts)
                            saveNumpyToFile(h5f,'cticks',cticks)
                            saveNumpyToFile(h5f,'seq',seq)
                            saveNumpyToFile(h5f,'x',x)
                            saveNumpyToFile(h5f,'y',y)
                            saveNumpyToFile(h5f,'z',z)

                            #this is in preparation for new data stream with battery, rssi and temp
                            saveNumpyToFile(h5f,'rssi',rssi)
                            saveNumpyToFile(h5f,'temp',temp)
                            saveNumpyToFile(h5f,'batt',batt)

                            h5f.close()

                            m = "Timestamp :{}, Samples: {})\n".format(int(row[1]),len(self.bufferThisSecond))
                            self.logQ.put(m)
                            self.displayQ.put(m)

                            #process the raw data the same way that it is being done in the processing Pipeline
                            accelerometer_max_voltage = config.getfloat("PLAYBACK","accelerometer_max_voltage")
                            is_ide_file=False
                            #trace_processor = TraceProcessing(global_config, is_ide_file,accelerometer_max_voltage,rhino_version)

                            raw_trace_data = RawTraceData()

                            component_trace_dict = {}
                            axial_index = int(axis[0])-1
                            tangential_index = int(axis[1])-1
                            radial_index = 3-axial_index-tangential_index

                            component_sensitivity = {"axial":sensitivity[axial_index],"tangential":sensitivity[tangential_index],"radial":sensitivity[radial_index]}
                            component_labels = ["axial","tangential","radial"]
                            channel_trace_raw_data = [x,y,z]

                            component_trace_raw_data = {"axial":channel_trace_raw_data[axial_index],"tangential":channel_trace_raw_data[tangential_index],"radial":channel_trace_raw_data[radial_index]}

                            ideal_timestamps = 1./float(global_config.output_sampling_rate) * np.arange(0,int(global_config.output_sampling_rate)) + int(ts[0])
                            #TODO: 0.4 needs to be read from global config
                            number_of_samples = int(0.4 * global_config.output_sampling_rate)

                            #pdb.set_trace()
                            for label in component_labels:
                                calibrated_data = raw_trace_data.calibrate_1d_component_array(component_trace_raw_data[label],global_config,component_sensitivity[label])
                                component_trace_dict["{}_interpolated".format(label)] = raw_trace_data.interpolate_1d_component_array(ts,calibrated_data,ideal_timestamps)
                                component_trace_dict["{}_auto_correlated".format(label)] = raw_trace_data.autocorrelate_1d_component_array(calibrated_data,number_of_samples)
                                # component_trace_dict[label] = component_trace_raw_data[label]

                            #Send data to the Q so that it can be plotted
                            rssi_avg = np.average(rssi)
                            temp_avg = np.average(temp)
                            batt_avg = np.average(batt)


                            self.tracesQ.put({"second":temp_lastSecond,"raw_data":component_trace_raw_data,
                                            "trace_data":component_trace_dict,"rssi":rssi_avg,"temp":temp_avg,"batt":batt_avg,"counter_changes":counterchanges})

                        self.bufferThisSecond = list()

                    self.bufferThisSecond.append(row)
            except:
                print("Collection Daemon Thread", sys.exc_info())


def write_data_to_h5_files(h5f,key,trace):
    pass
    # # saveNumpyToFileWithoutAppend(h5f, key +'_x_data',trace[2] )
    # saveNumpyToFileWithoutAppend(h5f, key +'_axial_trimmed_filtered_correlated_trace',trace["trace_data"]["axial"]["axial_trimmed_filtered_correlated"] )
    # # saveNumpyToFileWithoutAppend(h5f, key +'_y_data',trace[5] )
    # saveNumpyToFileWithoutAppend(h5f, key +'_tangential_trimmed_filtered_correlated_trace',trace["trace_data"]["tangential"]["tangential_trimmed_filtered_correlated"] )
    # # saveNumpyToFileWithoutAppend(h5f, key +'_z_data',trace[8] )
    # saveNumpyToFileWithoutAppend(h5f, key +'_radial_trimmed_filtered_correlated_trace',trace["trace_data"]["radial"]["radial_trimmed_filtered_correlated"] )


def main_run(run=True):
    if not os.path.exists(run_folder_path):
        os.makedirs(run_folder_path)
    copyfile(config_collection_file_path, os.path.join(run_folder_path,'config.cfg'))
    flushQ = Queue.Queue()
    traces = Queue.Queue()
    logQ = Queue.Queue()
    displayQ = Queue.Queue()
    system_healthQ = Queue.Queue()
    logger = LogFileDaemonThread(logQ)
    comport = SerialThread(rhino_port,rhino_baudrate,rhino_pktlen,flushQ,logQ,displayQ)#comport = SerialThread(rhino_port,rhino_baudrate,rhino_pktlen,flushQ,secsQ,logQ,displayQ)
    display = GUI(displayQ,system_healthQ)
    fflush = FileFlusher(flushQ,logQ,displayQ)#fflush = FileFlusher(flushQ,secsQ,logQ,displayQ)
    collection_daemon = CollectionDaemonThread(fflush.buffer,traces,logQ,displayQ)

    m = plt.get_backend()+"\n"
    logQ.put(m)
    displayQ.put(m)


    pid = os.getpid()
    m = "{}: STARTED PROCESS {}\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),pid)
    logQ.put(m)
    displayQ.put(m)
    print (m)

    if run:
        fflush.start()
        comport.start()
        comport.start_rx()
        collection_daemon.start()
        logger.start()

        # SET THREADS TO EXCLUSIVE CPUS
        p = subprocess.Popen(['pstree', '-p', str(pid) ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = p.communicate()
        subpids = []
        for sub_pid in re.findall('\(.*?\)',out):
            sub_pid = sub_pid.replace('(','').replace(')','')
            if pid != int(sub_pid):
                #print (sub_pid)
                m = "{}\n".format(sub_pid)
                logQ.put(m)
                displayQ.put(m)
                subpids.append(sub_pid)

        p = subprocess.Popen(['taskset', '-cp','4', str(pid) ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = p.communicate()
        p = subprocess.Popen(['taskset', '-cp','4', str(subpids[0]) ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = p.communicate()
        p = subprocess.Popen(['taskset', '-cp','5', str(subpids[1]) ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = p.communicate()
        p = subprocess.Popen(['taskset', '-cp','6', str(subpids[2]) ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = p.communicate()
        p = subprocess.Popen(['taskset', '-cp','7', str(subpids[3]) ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = p.communicate()

    else:
        fflush.stop()


    #TODO: set the plot length from configuration file
    length = 120
    q_timeout_wait = 2
    rssi = [-65]*length
    temp = [30]*length
    batt = [100] *length
    packets = [2800]*length
    delay = [0]*length
    trace_time_array = [0]*length
    now_array = [0]*length
    traces_for_plot = []
    last_tracetime = time.time()
    counterchanges = 0
    channels = ["X","Y","Z"]
    sensor_axial_axis = config.getint("INSTALLATION","sensor_axial_axis")-1
    sensor_tangential_axis = config.getint("INSTALLATION","sensor_tangential_axis")-1
    sensor_radial_axis = 3 - sensor_axial_axis - sensor_tangential_axis
    channel_mapping = {"axial":sensor_axial_axis,"tangential":sensor_tangential_axis,"radial":sensor_radial_axis}
    component_to_display = config.get("RUNTIME","component_to_display")
    pre_cut=config.getint("SYSTEM_HEALTH_PLOTS","trace_plot_pre_cut")
    post_add=config.getint("SYSTEM_HEALTH_PLOTS","trace_plot_post_add")
    output_sampling_rate=config.getfloat("COLLECTION","output_sampling_rate")
    traces_subsample = config.getint("SYSTEM_HEALTH_PLOTS","traces_subsample")
    number_of_traces_to_display=config.getint("SYSTEM_HEALTH_PLOTS","number_of_traces_to_display")

    fig1 = plt.figure("DataCloud Rhino Real Time Data",figsize=(6,4))
    plt.subplots_adjust(hspace=0.5)
    plt.pause(.05)
    fig1.canvas.draw()
    #win = plt.gcf().canvas.manager.window
    #win.protocol("WM_DELETE_WINDOW", do_nothing)
    while True:
        #TRACE STRUCTURE {"second":temp_lastSecond,"raw_data":component_trace_raw_data,"trace_data":component_trace_dict,"rssi":rssi_avg,"temp":temp_avg,"batt":batt_avg,"counter_changes":counterchanges})
        try:
            display.print_line()

            trace = traces.get(block=True, timeout=q_timeout_wait)
            now = time.time()
            # pdb.set_trace()
            trace_second = trace["second"]
            tracetime = datetime.utcfromtimestamp(trace_second)

            # h5f = h5py.File(os.path.join(run_folder_path,'traces_'+tracetime.strftime('%Y_%m_%d_%H')+'.h5'), 'a')
            # key = str(trace_second)
            # write_data_to_h5_files(h5f,key,trace)#This are the xcorr/trimmed traces
            # h5f.close()

            #TODO: set the plot axis values from configuration file
            #TODO:Chose what axis to present based on configuration file
            #TODO:Select the limit values from config_file


            #rows,columns
            rows = 2
            columns = 3

            row = 0
            column = 0

            signal_plot = plt.subplot2grid((rows, columns), (row, column), colspan=3,rowspan=1)
            signal_plot.set_title("Axial Component")
            signal_plot.set_ylabel("g")
            signal_plot.set_xlabel("samples")
            row += 1

            trace_plot = plt.subplot2grid((rows, columns), (row, column), colspan=3,rowspan=1)
            trace_plot.get_xaxis().set_visible(False)

            sec_delay = round(now - trace_second,2)
            plt.suptitle("Channel {} - ".format(channels[channel_mapping[component_to_display]]) + tracetime.strftime('%H:%M:%S' ) + " plotted at " + datetime.utcfromtimestamp(now).strftime('%H:%M:%S') +  " delay of " + str(sec_delay) )

            # pdb.set_trace()
            data_to_plot = trace["trace_data"]["{}_interpolated".format(component_to_display)]
            signal_plot.plot(data_to_plot,'k')#2 for X, 5 for Y and 8 for Z
            # trace_plot.plot(trace[6],'b')#3 for X, 6 for Y and 9 for Z

            rssi.pop(0)
            temp.pop(0)
            batt.pop(0)
            packets.pop(0)
            delay.pop(0)
            trace_time_array.pop(0)
            now_array.pop(0)

            rssi.append(trace["rssi"])
            temp.append(trace["temp"])
            battery_current_voltage = trace["batt"]


            batt.append(calculate_battery_percentage(battery_current_voltage,battery_max_voltage,battery_lower_limit))
            packets.append(len(trace["raw_data"][component_to_display]))
            delay.append(sec_delay)
            trace_time_array.append(tracetime)
            now_array.append(now)
            counterchanges = trace["counter_changes"]
            health = [rssi,packets,delay,temp,batt,counterchanges,tracetime,now,sec_delay,comport.corrupt_packets,fflush.tx_status]
            system_healthQ.put(health)
            np.save(os.path.join(RAM_PATH,'system_health.npy'),np.asarray(health))
            display.update_system_health()


            trace_start = int(output_sampling_rate/10)-pre_cut
            trace_end = int(output_sampling_rate/10)+post_add
            trimmed_data = trace["trace_data"]["{}_auto_correlated".format(component_to_display)][trace_start:trace_end]#TODO set the values for the trimmed trace from config file

            traces_for_plot.append(trimmed_data[0::traces_subsample])
            if len(traces_for_plot) > number_of_traces_to_display:
                traces_for_plot.pop(0)
            arr = np.asarray(traces_for_plot)
            arr = arr.transpose()
            seismic_wiggle(trace_plot,arr,dt=(1.0/output_sampling_rate))
            plt.pause(0.05)

            fig1.canvas.draw()
            time.sleep(0.05)
            plt.clf()
            last_tracetime = trace_second

        except RuntimeError,e:
            if e.message == "Unable to create link (name already exists)":
                m = "{}\n".format(e)
                logQ.put(m)
                displayQ.put(m)
                m = "{} Already Exists in h5 File\n".format(trace[0])
                logQ.put(m)
                displayQ.put(m)
                key = str(trace_second)+"_rollback"
                write_data_to_h5_files(h5f,key,trace)
                m = "Data successfully saved as {}\n".format(key)
                logQ.put(m)
                displayQ.put(m)
                h5f.close()
            else:
                m = "{}\n".format(e)
                logQ.put(m)
                displayQ.put(m)
        except Queue.Empty:
            if fflush.tx_status == 1:
                m = "{}: RX COMMUNICATION LOST\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                logQ.put(m)
                displayQ.put(m)
                display.print_line()
            else:
                #system is sleeping
                pass
            for second in range(q_timeout_wait):#we waited q_timeout_wait seconds before the exception was thrown.  Therefore we need to add one empty row per each second we waited
                add_empty_health_row_to_Q(rssi,temp,batt,packets,delay,trace_time_array,now_array,system_healthQ,last_tracetime,counterchanges,comport.corrupt_packets,fflush.tx_status)
            display.update_system_health()
        except:
            m = "{}\n".format(sys.exc_info())
            print("Main run exeption", m)
            logQ.put(m)
            displayQ.put(m)

def calculate_battery_percentage(current_voltage,battery_max_voltage,battery_lower_limit):
    value = 100 - (battery_max_voltage - current_voltage)/(battery_max_voltage - battery_lower_limit)*100
    return value



def add_empty_health_row_to_Q(rssi,temp,batt,packets,delay,trace_time_array,now_array,system_healthQ,last_tracetime,last_counterchanges,corrupt_packets,tx_status):
    now = time.time()
    rssi.pop(0)
    temp.pop(0)
    batt.pop(0)
    packets.pop(0)
    delay.pop(0)
    trace_time_array.pop(0)
    now_array.pop(0)

    if tx_status == 1:
        rssi.append(-100)
        temp.append(999)
        batt.append(0)
        packets.append(0)
    elif tx_status == 0:
        rssi.append(rssi[-1])
        temp.append(temp[-1])
        batt.append(batt[-1])
        packets.append(packets[-1])

    sec_delay = round(now-last_tracetime,2)
    delay.append(sec_delay)
    last_tracetime = datetime.utcfromtimestamp(last_tracetime)
    trace_time_array.append(last_tracetime)
    now_array.append(now)
    health = [rssi,packets,delay,temp,batt,last_counterchanges,last_tracetime,now,sec_delay,corrupt_packets,tx_status]
    system_healthQ.put(health)
    np.save(os.path.join(RAM_PATH,'system_health.npy'),np.asarray(health))



def saveNumpyToFile(h5file,key,nparr):
    N = len(nparr)
    x=nparr

    my_key = key
    if my_key in h5file.keys():
        ds = h5file[my_key]
        ds.resize((h5file[my_key].shape[0] + x.shape[0]), axis = 0)
        ds[-N:] = x
    else:
        ds = h5file.create_dataset(my_key, data=x, chunks=True,
                                dtype=x.dtype , maxshape=(None,),compression="gzip", compression_opts=9)
        ds[:] = x

def saveNumpyToFileWithoutAppend(h5file,key,nparr):
    N = len(nparr)
    x=nparr

    ds = h5file.create_dataset(key, data=x, chunks=True,
                            dtype=x.dtype , maxshape=(None,),compression="gzip", compression_opts=9)
    ds[:] = x

def do_nothing():
    pass

if __name__ == "__main__":
    main_run()






#############################################################################
# v0.2 Updated code to address rollover.
#      On a rollover of the sensor timer tick, the calculated timestamp is
#      reset to the current time stamp.
# v0.1 Initial Release
#############################################################################
