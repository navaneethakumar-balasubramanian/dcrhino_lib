# Serial logger with no QT.
# This version is with threads.
# v0.2
from __future__ import absolute_import, division, print_function
import serial
import threading
import Queue#queue for python 3
import struct
import sys
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
import pandas as pd
from math import ceil
from matplotlib.ticker import FormatStrFormatter
import matplotlib.pyplot as plt
if plt.get_backend() == "Qt4Agg":
    pass
else:
    plt.switch_backend('TkAgg')
plt.ioff()
import h5py

from datetime import datetime
import subprocess
import re
from shutil import copyfile
from dcrhino3.models.config import Config
from dcrhino3.models.metadata import Metadata
from dcrhino3.models.traces.raw_trace import RawTraceData
from dcrhino3.acquisition.external.seismic_wiggle import seismic_wiggle
from dcrhino3.process_flow.modules.trace_processing.unfold_autocorrelation import unfold_trace
import multiprocessing
import psutil




config_collection_file_path = os.path.join(PATH,'collection_daemon.cfg')

config = ConfigParser.SafeConfigParser()
config.read(config_collection_file_path)
# global_config = Config(config_parser=config)
global_config = Config(metadata=Metadata(config))


def get_rhino_ttyusb():
    p = subprocess.check_output('ls -l /dev/serial/by-id/ | grep "usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_" | grep -Po -- "../../\K\w*"',shell=True)
    return "/dev/" + p.replace('\n','')


rhino_baudrate = config.getint("COLLECTION", "baud_rate")
rhino_pktlen = config.getint("COLLECTION", "packet_length")
data_message_identifier = int(config.get("COLLECTION","data_message_identifier",0x64),16)
info_message_identifier = int(config.get("COLLECTION","info_message_identifier",0x69),16)
# rhino_ttyusb = get_rhino_ttyusb()
# rhino_port = "/dev/"+rhino_ttyusb
rhino_port = get_rhino_ttyusb()
rhino_serial_number = config.get("INSTALLATION","sensor_serial_number","S9999")
rhino_version = config.getfloat("COLLECTION","rhino_version")
run_start_time = time.time()
battery_max_voltage = config.getfloat("INSTALLATION","battery_max_voltage")
battery_lower_limit = config.getfloat("INSTALLATION","battery_min_voltage")
sampling_rate = config.getfloat("COLLECTION", "output_sampling_rate")
delta_t = 1.0/sampling_rate
remove_mean = config.getboolean("RUNTIME", "remove_mean")
missed_packets_threshold = config.getint("RUNTIME", "missed_packets_threshold")


local_folder = config.get("DATA_TRANSMISSION","local_folder", DATA_PATH)
if len(local_folder) == 0:
    local_folder = DATA_PATH
run_folder_path = os.path.join(local_folder, "run_{}".format(datetime.utcfromtimestamp(run_start_time).strftime('%Y%m%d_%H%M%S')))


class LogFileDaemonThread(threading.Thread):
    def __init__(self, logQ):
        threading.Thread.__init__(self)
        self.logQ = logQ
        self.filename = os.path.join(LOGS_PATH, datetime.now().strftime('%Y_%m_%d_%H')+'.log')
        self.output_file = open(self.filename, 'ar', buffering=0)

    def run(self):
        m = "Started LogFileDaemon\n"
        print(m)
        self.logQ.put(m)
        while True:
            filename = os.path.join(LOGS_PATH, datetime.now().strftime('%Y_%m_%d_%H')+'.log')
            if self.filename != filename:
                self.change_files(filename)
            self.log()
            time.sleep(1)

    def stop(self):
        while not self.logQ.empty():
            message = self.logQ.get_nowait()
            self.output_file.write(message)
            self.output_file.flush()
        self.output_file.close()

    def change_files(self,filename):
        self.output_file.close()
        self.output_file = open(filename, 'ar', buffering=0)

    def log(self):
        while not self.logQ.empty():
            message = self.logQ.get_nowait()
            self.output_file.write(message)
            self.output_file.flush()


class Packet_v10(object):
    def __init__(self, q_data):
        lst = struct.unpack('=bLbbHHHLLb', q_data)
        self.rx_sequence = lst[1]
        self.x = socket.ntohs(lst[4])
        self.y = socket.ntohs(lst[5])
        self.z = socket.ntohs(lst[6])
        self.tx_clock_ticks = lst[7] # Each clock tick is 10 microseconds
        # self.tx_sequence = lst[8]

        # this is in preparation for new data stream with battery, rssi and temp
        self.rssi = np.nan
        self.temp = np.nan
        self.batt = np.nan
        self.sleep_time = np.nan  # For comaptibility with v1.1, not really used for anything




class Packet_v11(object):
    def __init__(self, q_data):
        self.packet_type = 0  # 0=data_packet, 1=info_packet
        self.rx_sequence = 0
        self.x = 0
        self.y = 0
        self.z = 0
        self.tx_clock_ticks = 0  # Each clock tick is 10 microseconds
        self.tx_sequence = 0  # Each sequence is 250 or 500 microseconds depending on the sampling rate
        self.rssi = 0
        self.temp = 0
        self.batt = 0
        self.sleep_time = 0
        self.valid_trace = True
        self.packet_decoder(q_data)

    def calc_rssi_value(self, rssi_val):
        offset = config.getfloat("RUNTIME", "rssi_offset")  # this needs to be calculated.
        if rssi_val >= 128:
            calc_val = ((rssi_val - 256)/2.) - offset
        else:
            calc_val = (rssi_val/2.) - offset
        return calc_val

    def calc_temp_in_c(self, val):
        if val & 0x8000:
            val = val - 0xFFF0
        val = (val >> 4) * 0.0625
        return val

    def calc_batt(self, val):
        val = ((val/4096.)*13.2)  # +0.5
        return round(val, 2)

    def packet_decoder(self, pkt):
        try:
            lst = struct.unpack('=bbLbLLLbb', pkt)
        except:
            print("Lenght - ", len(pkt), pkt)
        msgtype = lst[1]

        if msgtype == data_message_identifier:
            # this is a data msg.
            self.packet_type = 0
            self.rx_sequence = lst[2]
            self.x = lst[4]
            self.y = lst[5]
            # self.tx_clock_ticks = lst[6]
            self.tx_sequence = lst[6]
            #self.tx_sequence = lst[2]  # This is only until I update the firmware on my test rhino
            self.rssi = self.calc_rssi_value(lst[7])
        else:
            self.packet_type = 1
            lst = struct.unpack('=bbLbHHHbbbbbbbb', pkt)
            self.rx_sequence = lst[2]
            self.temp = self.calc_temp_in_c(lst[4])
            self.batt = self.calc_batt(lst[5])
            self.sleep_time = lst[6]
            self.rssi=self.calc_rssi_value(lst[7])



class FileFlusher(threading.Thread):

    def __init__(self, flushq,logQ,displayQ):
        threading.Thread.__init__(self)
        self.flushq = flushq
        self.logQ = logQ
        self.displayQ = displayQ
        self.stope = threading.Event()
        self.stope.clear()
        self.previous_timestamp = 0
        self.previous_second = 0
        self.current_timestamp = 0
        self.sequence = 0
        self.bufferQ = Queue.Queue()
        self.elapsed_tx_sequences = 0
        self.elapsed_tx_clock_cycles = 0
        self.counter_changes = 0
        self.rhino_serial_number = rhino_serial_number
        self.last_sync = 0
        self.tx_status = 0
        self.good_packets_in_a_row = 1
        self.offset = 0
        self.allowed_clock_difference = config.getfloat("RUNTIME","allowed_clock_difference")
        self._drift = 0

    def first_packet_received(self, packet, timestamp):
        m = "First packet received at t0 {} with delta T of {}\n".format(repr(timestamp), delta_t)
        print (m)
        self.logQ.put(m)
        self.displayQ.put(m)
        samples_to_next_trace = int(ceil((int(timestamp) + 1 - timestamp) / delta_t))
        self.packet_index_in_trace = int(sampling_rate) - samples_to_next_trace - 1
        # print("Initial Index", self.packet_index_in_trace)
        self.current_timestamp = timestamp
        self.last_sync = timestamp
        self.sequence = packet.tx_sequence
        self.previous_timestamp = packet.tx_sequence
        # self.previous_second = int(self.current_timestamp)
        # # m = "{}: START SEQUENCE = {}\n".format(datetime.utcfromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S"),
        # #                                        packet.tx_clock_ticks)
        m = "{}: START SEQUENCE = {}\n".format(datetime.utcfromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S"),
                                               packet.tx_sequence)
        self.logQ.put(m)
        self.displayQ.put(m)
        print(m)

    def get_data_from_q(self):
        return self.flushq.get(False, 0.001)

    def calculate_packet_timestamp(self, packet):
        reference = time.time()
        self.elapsed_tx_sequences = packet.tx_sequence - self.sequence
        if self.elapsed_tx_sequences > missed_packets_threshold:
            packet.valid_trace = False
        self.packet_index_in_trace += self.elapsed_tx_sequences
        # self.packet_index_in_trace += int(round(self.elapsed_tx_sequences/25.))
        self.current_timestamp += self.elapsed_tx_sequences * delta_t
        # self.current_timestamp += self.elapsed_tx_sequences * 10./1000000
        self.sequence = packet.tx_sequence

        if self.packet_index_in_trace >= sampling_rate:
            diff = round(self.current_timestamp - reference, 2)
            if diff >= self.allowed_clock_difference:
                m = "Last update was {} sec ago\n".format(reference-self.last_sync)
                self.logQ.put(m)
                self.displayQ.put(m)
                m = "Difference is {} sec, changing time from {} to {}\n".format(diff, repr(self.current_timestamp),
                                                                                 repr(reference))
                self.logQ.put(m)
                self.displayQ.put(m)
                self.current_timestamp = reference
                self.last_sync = reference
            if int(self.current_timestamp) < self.previous_second:
                self.offset += 1
            else:
                if int(self.current_timestamp) > self.previous_second:
                    self.packet_index_in_trace -= (sampling_rate + self.offset)
                    self.offset = 0
                    self.counter_changes += 1
                    m = "('Changed', {},{},{},{})\n".format(int(self.current_timestamp), int(reference), diff,
                                                            self.counter_changes)
                    self.logQ.put(m)
                    self.displayQ.put(m)
                    self._drift = diff
        self.previous_second = int(self.current_timestamp)
        return packet

    @property
    def drift(self):
        return self._drift

    def save_row_to_processing_q(self, packet):

        try:
            row = (self.current_timestamp, packet.tx_sequence, packet.x, packet.y, packet.z, self.sequence,
                   packet.rx_sequence, packet.rssi, packet.temp, packet.batt, self.counter_changes,
                   self.rhino_serial_number, packet.valid_trace)
        except:  # This is for v1.0 that uses tx_clock ticks instead of sequence number
            row = (self.current_timestamp, packet.tx_clock_ticks, packet.x, packet.y, packet.z, self.sequence,
                   packet.rx_sequence, packet.rssi, packet.temp, packet.batt, self.counter_changes,
                   self.rhino_serial_number, packet.valid_trace)
        self.bufferQ.put(row)

    def stop(self):
        self.stope.set()

    def run(self):
        if rhino_version == 1.1:
            self.run_v11()
        else:
            self.run_v10()

    def run_v10(self):
        pass
        # print("Started File Fluser 1.0")
        # self.tx_status = 1  # for comaptibility with version 1.1.  Status is always 1 (on) for v1.0
        # while True:
        #     try:
        #         timestamp = time.time()
        #         q_data = self.get_data_from_q()
        #
        #         packet = Packet_v10(q_data)
        #
        #         #First packet received
        #         if self.sequence == 0:
        #             m = "{}: FIRST PACKET RECEIVED\n".format(datetime.utcfromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S"))
        #             self.logQ.put(m)
        #             self.displayQ.put(m)
        #             self.first_packet_received(packet, timestamp)
        #             self.save_row_to_processing_q(packet)
        #         else:
        #             #if it is a consecutive packet or if we missed any
        #             if packet.tx_clock_ticks > self.sequence:
        #                 self.calculate_packet_timestamp(packet)
        #                 self.save_row_to_processing_q(packet)
        #             elif packet.tx_clock_ticks == self.sequence:
        #                 print (self.previous_timestamp, packet.tx_clock_ticks)
        #                 self.previous_timestamp = 0
        #                 self.calculate_packet_timestamp(packet)
        #                 m = "{}: DUPLICATED RECORD WILL BE IGNORED\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        #                 self.logQ.put(m)
        #                 self.displayQ.put(m)
        #             else:
        #                 m = "{}: ADJUSTED FOR CLOCK ROLLOVER USING FIRST PACKET LOGIC\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        #                 self.logQ.put(m)
        #                 self.displayQ.put(m)
        #                 self.first_packet_received(packet, timestamp)
        #                 self.save_row_to_processing_q(packet)
        #     except Queue.Empty:
        #         # Handle empty queue here
        #         time.sleep(0.05)
        #         pass


    def run_v11(self):
        m = "Started File Fluser 1.1\n"
        print(m)
        self.logQ.put(m)
        self.displayQ.put(m)
        self.current_temp = np.nan
        self.current_batt = np.nan
        self.current_rssi = np.nan
        self.current_sleep_time = np.nan

        while True:
            try:
                timestamp = time.time()
                q_data = self.get_data_from_q()

                packet = Packet_v11(q_data)
                if packet.packet_type == 0:
                    self.tx_status = 1
                    packet.batt = self.current_batt
                    packet.temp = self.current_temp
                    packet.sleep_time = self.current_sleep_time

                    #First packet received
                    if self.sequence == 0:
                        m = "{}: FIRST PACKET RECEIVED\n".format(datetime.utcfromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S"))
                        self.logQ.put(m)
                        self.displayQ.put(m)
                        self.first_packet_received(packet, timestamp)
                        self.save_row_to_processing_q(packet)
                    else:
                        #if it is a consecutive packet or if we missed any
                        # if packet.tx_clock_ticks > self.sequence:
                        if packet.tx_sequence > self.sequence:
                            packet = self.calculate_packet_timestamp(packet)
                            # TODO:Only save the packet to processing row if it is good timing.  Otherwise save it to
                            #  a spare file
                            self.save_row_to_processing_q(packet)
                        # elif packet.tx_clock_ticks == self.sequence:
                        elif packet.tx_sequence == self.sequence:
                            print (self.previous_timestamp, packet.tx_sequence)
                            self.previous_timestamp = 0
                            self.calculate_packet_timestamp(packet)
                            m = "{}: DUPLICATED RECORD WILL BE IGNORED\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                            self.logQ.put(m)
                            self.displayQ.put(m)
                        else:
                            m = "{}: ADJUSTED FOR CLOCK ROLLOVER USING FIRST PACKET LOGIC\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                            self.logQ.put(m)
                            self.displayQ.put(m)
                            self.first_packet_received(packet, timestamp)
                            self.save_row_to_processing_q(packet)
                else:
                    m="{}: INFO MESSAGE RECEIVED\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                    self.logQ.put(m)
                    self.displayQ.put(m)
                    self.current_temp = packet.temp
                    self.current_batt = packet.batt
                    self.current_sleep_time = packet.sleep_time
                    self.tx_status = 0

            except Queue.Empty:
                time.sleep(0.05)
                pass


class SerialThread(threading.Thread):
    def __init__(self, comport, brate, pktlen, flushq, logQ, displayQ):
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
        self.comport = comport
        self.brate = brate
        self.cmd = "stop\r\n"

    def get_cport(self):
        return self.cport

    def start_rx(self):
        self.cport.write(bytearray("ready\r\n", "utf-8"))

    def stop_rx(self):
        self.cport.write(bytearray("stop\r\n", "utf-8"))
        self.cport.close()
        self.stope.set()

    def do_stop_cmd(self):
        self.cport.write(bytearray("stop\r\n", "utf-8"))

    def restart_rx(self):
        self.cport.write(bytearray("stop\r\n", "utf-8"))
        m = '{}: STOPPING SERIAL PORT\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        print(m)
        self.logQ.put(m)
        self.displayQ.put(m)
        self.cport.flush()
        m = '{}: FLUSHING SERIAL BUFFER\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        print(m)
        self.logQ.put(m)
        self.displayQ.put(m)
        self.start_rx()
        m = '{}: RESTARTING SERIAL PORT\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        print(m)
        self.logQ.put(m)
        self.displayQ.put(m)

    @property
    def corrupt_packets(self):
        return self._corrupt_packets


    def run(self):
        if rhino_version == 1.1:
            self.run_v11()
        else:
            self.run_v10()


    def run_v10 (self):
        pass
        # print("Started Serial 1.0")
        # counter = 0
        # while True:
        #     try:
        #         a = self.cport.read(self.pktlen)
        #         if len(a)==self.pktlen and a[0] == b'\x02' and a[self.pktlen-1] == b'\x03':
        #             counter = 0
        #             self.flushq.put(a)
        #             last_a = a
        #         else:
        #             counter += 1
        #             self._corrupt_packets += 1
        #             if len(a) >= self.pktlen:
        #                 m = '{}: CORRUPT {} BYTE PACKET>>>>>>>>>>>>>>>>>>>>>{}\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),len(a),counter)
        #                 self.logQ.put(m)
        #                 self.displayQ.put(m)
        #             else:
        #                 m = '{}: TRUNCATED {} BYTE PACKET>>>>>>>>>>>>>>>>>>>>>{}\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),len(a),counter)
        #                 self.logQ.put(m)
        #                 self.displayQ.put(m)
        #
        #             temp = self.cport.read(1)
        #             while temp != b'\x03':
        #                 temp = self.cport.read(1)
        #                 if len(temp):
        #                     pass
        #                 else:
        #                     time.sleep(0.1)
        #                     self.start_rx()
        #                     m = '{}: ATEMPTING TO RESTART ACQUISITION\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        #                     self.logQ.put(m)
        #                     self.displayQ.put(m)
        #
        #     except:
        #         print("Serial Thread Exception")
        #         print(sys.exc_info())
        #         pass





    def run_v11 (self):
        m = "Started Serial 1.1\n"
        print(m)
        self.logQ.put(m)
        self.displayQ.put(m)
        counter = 0
        restarted = False
        # while True:
        while self.portOpen and not self.stope.isSet():
            try:
                # print("trying")
                a = self.cport.read(self.pktlen)
                if restarted:
                    if len(a):
                        print(a[0]==b'\x02', a[-1]==b'\x03', len(a))
                    restarted = False
                if len(a) == self.pktlen and a[0] == b'\x02' and a[self.pktlen-1] == b'\x03':
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
                        if len(a) >= self.pktlen:
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
                                time.sleep(0.1)
                                self.start_rx()
                                m = '{}: ATEMPTING TO RESTART ACQUISITION\n'.format(
                                    datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                                self.logQ.put(m)
                                self.displayQ.put(m)

                        # time.sleep(0.1)
                        # m = '{}: ATEMPTING TO RESTART ACQUISITION\n'.format(
                        #     datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                        # self.logQ.put(m)
                        # self.displayQ.put(m)
                        # self.restart_rx()
                        # restarted = True

                        # temp = self.cport.read(1)
                        # while temp != b'\x03':
                        #     temp = self.cport.read(1)
                        #     if len(temp):
                        #         pass
                        #     else:
                        #         time.sleep(0.1)
                        #         self.start_rx()
                        #         m = '{}: ATEMPTING TO RESTART ACQUISITION\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                        #         self.logQ.put(m)
                        #         self.displayQ.put(m)
                    else:
                        m = '{}: SLEEPING\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                        self.logQ.put(m)
                        self.displayQ.put(m)
                        time.sleep(0.1)
            except:
                time.sleep(0.5)
                m = "Serial Thread Exception"
                print(m)
                self.logQ.put(m)
                self.displayQ.put(m)
                m = sys.exc_info()
                print(m)
                self.logQ.put(m)
                self.displayQ.put(m)
                # disconected = True
                # context = pyudev.Context()
                # monitor = pyudev.Monitor.from_netlink(context)
                # monitor.filter_by(subsystem='usb')
                # while disconected:
                #     for device in iter(monitor.poll, None):
                #         if device.action == 'add':
                #             print('{} connected'.format(device))
                #             disconected = False
                #             time.sleep(1)
                #             self.cport.close()
                #             self.cport = serial.Serial(get_rhino_ttyusb(), self.brate, timeout=1.0)


class CollectionDaemonThread(threading.Thread):
    def __init__(self, bufferQ,tracesQ,logQ,displayQ):
        threading.Thread.__init__(self)
        self.bufferQ = bufferQ
        self.bufferThisSecond = list()
        self.lastSecond = None
        self.tracesQ = tracesQ
        self.logQ = logQ
        self.displayQ = displayQ

    def calculate_initial_tracetime_from_timestamp(self, timestamp):
        fraction = timestamp - int(timestamp)
        offset = int(fraction / delta_t)
        return timestamp - sampling_rate * offset


    def run(self):
        m = "Started Collection Daemon\n"
        print(m)
        self.logQ.put(m)
        self.displayQ.put(m)
        lastFileName = None
        look_for_time = True
        file_change_interval_in_min = config.getint("RUNTIME", "file_change_interval_in_min")
        # valid_trace = True
        while True:
            try:
                if not self.bufferQ.empty():
                    # row = (0 =self.current_timestamp,
                    # 1=packet.tx_clock_ticks or packet.tx_sequence
                    # 2=packet.x,
                    # 3=packet.y,
                    # 4=packet.z,
                    # 5=self.sequence,
                    # 6=packet.rx_sequence,
                    # 7=packet.rssi,
                    # 8=packet.temp,
                    # 9=packet.batt,
                    # 10=self.counter_changes,
                    # 11=self.rhino_serial_number)
                    # 12=packet.valid_trace
                    # TODO use a dictionary instead of a list so I can access the values by key and not by indices


                    buffer_entry = self.bufferQ.get()
                    # TODO Uncomment the next two lines if we want to filter the traces by how many missed samples
                    #  we have
                    # if not buffer_entry[12]:
                    #     valid_trace = False
                    row = np.asarray(buffer_entry[0:11], dtype=np.float64)
                    # entry is the rhino serial number and that is a string

                    if self.lastSecond != int(row[0]):
                        temp_lastSecond = self.lastSecond
                        self.lastSecond = int(row[0])

                        #dotheprocessing
                        if len(self.bufferThisSecond) >= 1:
                            self.bufferThisSecond = np.asarray(self.bufferThisSecond)
                            utc_dt = datetime.utcfromtimestamp(temp_lastSecond)
                            if lastFileName is None or (utc_dt.minute % file_change_interval_in_min == 0 and
                                                        look_for_time):
                                look_for_time = False
                                prefix = utc_dt.strftime('%Y%m%d')+"_RTR"
                                delta = utc_dt - datetime(year=utc_dt.year, month=utc_dt.month, day=utc_dt.day)
                                elapsed = str(int(delta.total_seconds()))
                                leading_zeros = ""
                                if len(elapsed) < 5:
                                    leading_zeros = "0" * (5-len(elapsed))
                                filename = "{}{}{}_{}.h5".format(prefix, leading_zeros, elapsed, rhino_serial_number)
                                filename = os.path.join(run_folder_path, filename)
                                lastFileName = utc_dt
                                first = True
                            else:
                                if lastFileName.minute != utc_dt.minute:
                                    look_for_time = True
                            h5f = h5py.File(filename, 'a')

                            if first:
                                disk_usage = psutil.disk_usage('/')[3]
                                m = "Disk Usage Percentage: {}".format(disk_usage)
                                print(m)
                                self.displayQ.put(m)
                                self.logQ.put(m)
                                first = False
                                h5f, m = config_file_to_attrs(config, h5f)
                                # global_config = Config(metadata=Metadata(config))
                                self.displayQ.put(m)
                                self.logQ.put(m)
                                sensitivity = np.array([config.getfloat('PLAYBACK', 'x_sensitivity'),
                                                        config.getfloat('PLAYBACK', 'y_sensitivity'),
                                                        config.getfloat('PLAYBACK', 'z_sensitivity')],
                                                       dtype=np.float32)
                                saveNumpyToFile(h5f, 'sensitivity', sensitivity)
                                axis = np.array([config.getfloat('INSTALLATION', 'sensor_axial_axis'),
                                                 config.getfloat('INSTALLATION', 'sensor_tangential_axis')],
                                                dtype=np.float32)
                                saveNumpyToFile(h5f, 'axis', axis)



                            # row = (0 =self.current_timestamp,
                            # 1=packet.tx_clock_ticks or packet.tx_sequence
                            # 2=packet.x,
                            # 3=packet.y,
                            # 4=packet.z,
                            # 5=self.sequence,
                            # 6=packet.rx_sequence,
                            # 7=packet.rssi,
                            # 8=packet.temp,
                            # 9=packet.batt,
                            # 10=self.counter_changes,
                            # 11=self.rhino_serial_number)
                            ts = np.asarray(self.bufferThisSecond[:, 0], dtype=np.float64)
                            seq = np.asarray(self.bufferThisSecond[:, 6], dtype=np.uint32)
                            cticks = np.asarray(self.bufferThisSecond[:, 1], dtype=np.uint32)
                            x = np.asarray(self.bufferThisSecond[:, 2], dtype=np.uint32)
                            y = np.asarray(self.bufferThisSecond[:, 3], dtype=np.uint32)
                            z = np.asarray(self.bufferThisSecond[:, 4], dtype=np.uint32)
                            rssi = np.asarray(self.bufferThisSecond[:, 7], dtype=np.float32)
                            temp = np.asarray([self.bufferThisSecond[-1, 8], ], dtype=np.float32)
                            batt = np.asarray([self.bufferThisSecond[-1, 9], ], dtype=np.float32)
                            counterchanges = np.asarray(self.bufferThisSecond[:, 10], dtype=np.int32)[-1]

                            rssi_avg = np.average(rssi) #Only need the average of RSSI because it's the only value that gets reported on every packet

                            #Save to raw_data_file
                            # pdb.set_trace()
                            saveNumpyToFile(h5f,'ts',ts)
                            saveNumpyToFile(h5f,'cticks',cticks)
                            saveNumpyToFile(h5f,'seq',seq)
                            saveNumpyToFile(h5f,'x',x)
                            saveNumpyToFile(h5f,'y',y)
                            saveNumpyToFile(h5f,'z',z)
                            saveNumpyToFile(h5f,'rssi',rssi)
                            saveNumpyToFile(h5f,'temp',temp)
                            saveNumpyToFile(h5f,'batt',batt)

                            h5f.close()

                            m = "TIMESTAMP :{}, SAMPLES: {})\n".format(int(row[0]), len(self.bufferThisSecond))
                            self.logQ.put(m)
                            self.displayQ.put(m)

                            valid_trace = buffer_entry[12]
                            if valid_trace:
                                interp_kind = "quadratic"
                            else:
                                interp_kind = "linear"

                            #process the raw data the same way that it is being done in the processing Pipeline
                            # accelerometer_max_voltage = config.getfloat("PLAYBACK","accelerometer_max_voltage")
                            # is_ide_file=False
                            raw_trace_data = RawTraceData()
                            component_trace_dict = {}
                            acceleration_dict = {}
                            axial_index = int(axis[0])-1
                            tangential_index = int(axis[1])-1
                            radial_index = 3-axial_index-tangential_index

                            # component_sensitivity = {"axial":sensitivity[axial_index],"tangential":sensitivity[tangential_index],"radial":sensitivity[radial_index]}
                            component_labels = ["axial","tangential","radial"]
                            channel_trace_raw_data = [x,y,z]

                            component_trace_raw_data = {"axial":channel_trace_raw_data[axial_index],"tangential":channel_trace_raw_data[tangential_index],"radial":channel_trace_raw_data[radial_index]}
                            # secondless_timestamps = ts - int(ts[0])

                            initial_trace_timestamp = self.calculate_initial_tracetime_from_timestamp(ts[0])
                            # print("T0", repr(initial_trace_timestamp))

                            ideal_timestamps = 1./float(global_config.output_sampling_rate) * np.arange(0,int(global_config.output_sampling_rate)) + initial_trace_timestamp

                            number_of_samples = int(global_config.auto_correlation_trace_duration *
                                                    global_config.output_sampling_rate)

                            for label in component_labels:
                                calibrated_data = raw_trace_data.calibrate_1d_component_array(
                                    component_trace_raw_data[label], global_config,
                                    global_config.sensor_sensitivity[label], remove_mean=False)
                                interp_data = raw_trace_data.interpolate_1d_component_array(ts, calibrated_data,
                                                                                            ideal_timestamps,
                                                                                            kind=interp_kind)
                                acorr_data = raw_trace_data.autocorrelate_1d_component_array(interp_data,
                                                                                             number_of_samples,
                                                                                             copy_input=True)
                                component_trace_dict[label] = {"{}_calibrated".format(label): calibrated_data,
                                                               "{}_interpolated".format(label): interp_data,
                                                               "{}_auto_correlated".format(label): acorr_data}
                                if remove_mean:
                                    acceleration_dict[label] = {"max": np.max(calibrated_data-np.mean(calibrated_data)),
                                                                "min": np.min(calibrated_data)-np.mean(calibrated_data)}
                                else:
                                    acceleration_dict[label] = {"max": np.max(calibrated_data),
                                                                "min": np.min(calibrated_data)}
                            #Send data to the Q so that it can be plotted
                            self.tracesQ.put({"timestamp": np.asarray([temp_lastSecond, ], dtype=np.float64),
                                              "raw_timestamps": ts,
                                              "ideal_timestamps": ideal_timestamps,
                                              "raw_data": component_trace_raw_data,
                                              "trace_data": component_trace_dict,
                                              "rssi": rssi_avg, #np.asarray([rssi_avg, ], dtype=np.float32),
                                              "temp": temp[0],
                                              "batt": batt[0],
                                              "acceleration": acceleration_dict,
                                              "counter_changes": counterchanges,
                                              "disk_usage": disk_usage,
                                              "filename": filename})
                        self.bufferThisSecond = list()
                    self.bufferThisSecond.append(row)
                else:
                    # print("collection daemon buffer empty")
                    time.sleep(0.05)
            except AttributeError:
                print("Collection Daemon Exception:", sys.exc_info())
                print("WEIRD ERROR TRYING TO APPEND TO BUFFER THIS SECOND AFTER IT WAS CONVERTED TO NUMPY ON CLOCK "
                      "ROLLOVER")
                self.bufferThisSecond = list()
            except:
                print("Collection Daemon Exception:", sys.exc_info())



def main_run(run=True):

    if not os.path.exists(run_folder_path):
        os.makedirs(run_folder_path)
    copyfile(config_collection_file_path, os.path.join(run_folder_path, 'config.cfg'))
    flushQ = Queue.Queue()
    traces = Queue.Queue()
    logQ = Queue.Queue()
    displayQ = Queue.Queue()
    system_healthQ = Queue.Queue()
    logger = LogFileDaemonThread(logQ)
    comport = SerialThread(rhino_port, rhino_baudrate, rhino_pktlen, flushQ, logQ, displayQ)
    comport.stop_rx()
    comport.cport.close()
    display = GUI(displayQ, system_healthQ)
    fflush = FileFlusher(flushQ, logQ, displayQ)
    collection_daemon = CollectionDaemonThread(fflush.bufferQ, traces, logQ, displayQ)
    comport = SerialThread(rhino_port, rhino_baudrate, rhino_pktlen, flushQ, logQ, displayQ)

    m = "Started Main\n"
    print(m)
    logQ.put(m)
    displayQ.put(m)

    m = plt.get_backend()+"\n"
    logQ.put(m)
    displayQ.put(m)


    pid = os.getpid()
    m = "{}: STARTED PROCESS {}\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),pid)
    logQ.put(m)
    displayQ.put(m)
    print (m)

    if run:
        # pdb.set_trace()
        fflush.start()
        comport.start()
        comport.start_rx()
        collection_daemon.start()
        logger.start()

        # SET THREADS TO EXCLUSIVE CPUS
        p = subprocess.Popen(['pstree', '-p', str(pid)], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = p.communicate()
        subpids = []
        for sub_pid in re.findall('\(.*?\)',out):
            sub_pid = sub_pid.replace('(','').replace(')','')
            if pid != int(sub_pid):
                m = "{}\n".format(sub_pid)
                logQ.put(m)
                displayQ.put(m)
                subpids.append(sub_pid)
        processor_number = multiprocessing.cpu_count()-3
        p = subprocess.Popen(['taskset', '-cp','{}'.format(processor_number), str(pid)],
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE) # 6
        print("Realtime Acquisition Opened in processod {}\n".format(processor_number))
        out, err = p.communicate()
        # p = subprocess.Popen(['taskset', '-cp','7', str(subpids[0])], stdout=subprocess.PIPE, stderr=subprocess.PIPE) #6
        # out, err = p.communicate()
        # p = subprocess.Popen(['taskset', '-cp','7', str(subpids[1])], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        # out, err = p.communicate()
        # p = subprocess.Popen(['taskset', '-cp','7', str(subpids[2])], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        # out, err = p.communicate()
        # p = subprocess.Popen(['taskset', '-cp','7', str(subpids[3])], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        # out, err = p.communicate()
        for index in range(len(subpids)):
            p = subprocess.Popen(['taskset', '-cp','{}'.format(processor_number), str(subpids[index])],
                                 stdout=subprocess.PIPE,
                                 stderr=subprocess.PIPE)
            out, err = p.communicate()
            print("Process {} Opened in processod {}\n".format(subpids[index],processor_number))



    else:
        fflush.stop()


    length = config.getint("SYSTEM_HEALTH_PLOTS","x_axis_length_in_seconds")
    q_timeout_wait = 2
    rssi = [np.nan] * length
    temp = [np.nan] * length
    batt = [np.nan] * length
    packets = [np.nan] * length
    delay = [np.nan] * length
    drift = [np.nan] * length
    trace_time_array = [np.nan] * length
    now_array = [np.nan] * length
    max_axial_acceleration = [np.nan] * length
    max_radial_acceleration = [np.nan] * length
    max_tangential_acceleration = [np.nan] * length
    min_axial_acceleration = [np.nan] * length
    min_radial_acceleration = [np.nan] * length
    min_tangential_acceleration = [np.nan] * length
    disk_usage = [np.nan] * length
    last_tracetime = time.time()
    counterchanges = 0
    channels = ["X","Y","Z"]
    components = ["axial","tangential","radial"]
    sensor_axial_axis = config.getint("INSTALLATION","sensor_axial_axis")-1
    sensor_tangential_axis = config.getint("INSTALLATION","sensor_tangential_axis")-1
    sensor_radial_axis = 3 - sensor_axial_axis - sensor_tangential_axis
    channel_mapping = {"axial":sensor_axial_axis,"tangential":sensor_tangential_axis,"radial":sensor_radial_axis}
    component_to_display = config.get("RUNTIME","component_to_display")
    # traces_for_plot = []
    # pre_cut=config.getint("SYSTEM_HEALTH_PLOTS","trace_plot_pre_cut")
    # post_add=config.getint("SYSTEM_HEALTH_PLOTS","trace_plot_post_add")
    # output_sampling_rate=config.getfloat("COLLECTION","output_sampling_rate")
    # traces_subsample = config.getint("SYSTEM_HEALTH_PLOTS","traces_subsample")
    # number_of_traces_to_display=config.getint("SYSTEM_HEALTH_PLOTS","number_of_traces_to_display")
    second_plot_display = config.get("RUNTIME", "second_plot_display")
    # last_filename=None

    realtime_trace = RawTraceData()
    realtime_trace.add_global_config(global_config, file_id='0')

    fig1 = plt.figure("DataCloud Rhino Real Time Data", figsize=(6, 4))
    plt.subplots_adjust(hspace=0.8, top=0.8)
    fig1.canvas.manager.window.wm_geometry("+%d+%d" % (0, 0))
    fig1.canvas.get_tk_widget().focus_force()
    plt.pause(.05)
    fig1.canvas.draw()

    #this is for newer pyplot versions in case we want to prevent the user to close the plot windows
    #win = plt.gcf().canvas.manager.window
    #win.protocol("WM_DELETE_WINDOW", do_nothing)

    while True:
        #TRACE STRUCTURE {"second":temp_lastSecond,
        #                 "raw_data":component_trace_raw_data,
        #                 "trace_data":new_component_trace_dict,
        #                 "rssi":rssi_avg,
        #                 "temp":temp,
        #                 "batt":batt,
        #                 "counter_changes":counterchanges}
        try:
            display.print_line()

            trace = traces.get(block=True, timeout=q_timeout_wait)
            now = time.time()
            trace_second = trace["timestamp"][-1]
            filename = trace["filename"].replace("RTR","RTA")
            tracetime = datetime.utcfromtimestamp(trace_second)


            #<Save Trace data to h5>
            h5f_path = os.path.join(run_folder_path,filename)
            write_data_to_h5_files(h5f_path,trace,realtime_trace)#This are the Acorr traces
            #</Save Trace data to h5>

            #rows,columns
            rows = 2
            columns = 3

            row = 0
            column = 0

            signal_plot = plt.subplot2grid((rows, columns), (row, column), colspan=3,rowspan=1)
            signal_plot.set_title("Channel {} - ".format(channels[channel_mapping[component_to_display]]) + "{} Component Raw".format(component_to_display.upper()))
            signal_plot.set_ylabel("g")
            signal_plot.set_xlabel("samples")
            signal_plot.yaxis.set_major_formatter(FormatStrFormatter('%.2f'))
            row += 1

            trace_plot = plt.subplot2grid((rows, columns), (row, column), colspan=3,rowspan=1)
            trace_plot.set_title("Channel {} - ".format(channels[channel_mapping[component_to_display]]) +"{} Component Trace".format(component_to_display.upper()))


            sec_delay = round(now - trace_second, 2)
            plt.suptitle("Trace Time "+ tracetime.strftime('%Y-%m-%d %H:%M:%S' ) + " plotted at " +
                         datetime.utcfromtimestamp(now).strftime('%Y-%m-%d %H:%M:%S') + " delay of " + str(
                sec_delay)+"\nAnd a drift of " + str(fflush.drift), fontsize=10)

            data_to_plot = trace["trace_data"][component_to_display]["{}_interpolated".format(component_to_display)]
            if remove_mean:
                data_to_plot = data_to_plot - np.mean(data_to_plot)
            signal_plot.plot(data_to_plot, 'black')

    	    # if rhino_version == 1.1:
            if second_plot_display in components:
                trace_plot.set_title("Channel {} - ".format(channels[channel_mapping[second_plot_display]]) + "{} Component Raw".format(second_plot_display.upper()))
                trace_plot.set_ylabel("g")
                trace_plot.set_xlabel("samples")
                trace_plot.yaxis.set_major_formatter(FormatStrFormatter('%.2f'))
                data_to_plot = trace["trace_data"][second_plot_display]["{}_interpolated".format(second_plot_display)]
                if remove_mean:
                    data_to_plot = data_to_plot - np.mean(data_to_plot)
                trace_plot.plot(data_to_plot, 'b')
            else:
                unfolded_trace = unfold_trace(trace["trace_data"][component_to_display]["{}_auto_correlated".format(component_to_display)])
                trace_plot.plot(unfolded_trace, 'b')
                trace_plot.get_xaxis().set_visible(False)
    	    # else:
    		#     trace_start = int(output_sampling_rate/10)-pre_cut
    		#     trace_end = int(output_sampling_rate/10)+post_add
    		#     acorr_data = trace["trace_data"][component_to_display]["{}_auto_correlated".format(component_to_display)]
    		#     #trimmed_data = acorr_data[trace_start:trace_end]#TODO set the values for the trimmed trace from config file
    		#     trimmed_data = acorr_data
    		#     # traces_for_plot.append(trimmed_data[0::traces_subsample])
    		#     traces_for_plot.append(trimmed_data)
    		#     if len(traces_for_plot) > number_of_traces_to_display:
    		#         traces_for_plot.pop(0)
    		#     arr = np.asarray(traces_for_plot)
    		#     arr = arr.transpose()
    		#     seismic_wiggle(trace_plot,arr,dt=(1.0/output_sampling_rate),normalize=True)

            rssi.pop(0)
            temp.pop(0)
            batt.pop(0)
            packets.pop(0)
            delay.pop(0)
            trace_time_array.pop(0)
            now_array.pop(0)
            max_axial_acceleration.pop(0)
            max_tangential_acceleration.pop(0)
            max_radial_acceleration.pop(0)
            min_axial_acceleration.pop(0)
            min_tangential_acceleration.pop(0)
            min_radial_acceleration.pop(0)
            disk_usage.pop(0)
            drift.pop(0)

            rssi.append(trace["rssi"])
            temp.append(trace["temp"])
            batt.append(trace["batt"])
            packets.append(len(trace["raw_data"][component_to_display]))
            delay.append(sec_delay)
            trace_time_array.append(tracetime)
            now_array.append(now)
            max_axial_acceleration.append(trace["acceleration"]["axial"]["max"])
            max_tangential_acceleration.append(trace["acceleration"]["tangential"]["max"])
            max_radial_acceleration.append(trace["acceleration"]["radial"]["max"])
            min_axial_acceleration.append(trace["acceleration"]["axial"]["min"])
            min_tangential_acceleration.append(trace["acceleration"]["tangential"]["min"])
            min_radial_acceleration.append(trace["acceleration"]["radial"]["min"])
            disk_usage.append(trace["disk_usage"])
            drift.append(fflush.drift)
            counterchanges = trace["counter_changes"]
            health = [rssi, packets, delay, temp, batt, counterchanges, tracetime, now, sec_delay,
                      comport.corrupt_packets, fflush.tx_status, max_axial_acceleration, min_axial_acceleration,
                      max_tangential_acceleration, min_tangential_acceleration,
                      max_radial_acceleration, min_radial_acceleration, disk_usage, drift]
            system_healthQ.put(health)
            np.save(os.path.join(RAM_PATH, 'system_health.npy'), np.asarray(health))
            display.update_system_health()

            plt.pause(0.05)

            fig1.canvas.draw()
            time.sleep(0.05)
            plt.clf()
            last_tracetime = trace_second

        except RuntimeError, e:
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
            time.sleep(0.05)
            for second in range(q_timeout_wait):#we waited q_timeout_wait seconds before the exception was thrown.  Therefore we need to add one empty row per each second we waited
                add_empty_health_row_to_Q(rssi, temp, batt, packets, delay, trace_time_array, now_array, system_healthQ,
                                          last_tracetime, counterchanges, comport.corrupt_packets, fflush.tx_status,
                                          max_axial_acceleration, min_axial_acceleration,
                                          max_tangential_acceleration, min_tangential_acceleration,
                                          max_radial_acceleration, min_radial_acceleration, disk_usage,
                                          drift, fflush.drift)
            display.update_system_health()
        except:
            m = "{}\n".format(sys.exc_info())
            print("Main run exeption", m)
            logQ.put(m)
            displayQ.put(m)


def write_data_to_h5_files(h5f_path,trace_data,trace):
    # pdb.set_trace()
    df = pd.DataFrame(columns=["timestamp","rssi","batt","temp","packets","max_axial_acceleration",
                                "max_tangential_acceleration","max_radial_acceleration",
                                "min_axial_acceleration","min_tangential_acceleration","min_radial_acceleration",
                                "axial_trace","tangential_trace","radial_trace"])
    axial_calibrated_trace = trace_data["trace_data"]["axial"]["axial_calibrated"]
    tangential_calibrated_trace = trace_data["trace_data"]["tangential"]["tangential_calibrated"]
    radial_calibrated_trace = trace_data["trace_data"]["radial"]["radial_calibrated"]
    df["timestamp"] = trace_data["timestamp"]
    df["rssi"] = trace_data["rssi"]
    df["batt"] = trace_data["batt"]
    df["temp"] = trace_data["temp"]
    df["packets"] = len(axial_calibrated_trace)
    df["max_axial_acceleration"] = np.asarray([np.max(axial_calibrated_trace)],)
    df["max_tangential_acceleration"] = np.asarray([np.max(tangential_calibrated_trace)],)
    df["max_radial_acceleration"] = np.asarray([np.max(radial_calibrated_trace)],)
    df["min_axial_acceleration"] = np.asarray([np.min(axial_calibrated_trace)],)
    df["min_tangential_acceleration"] = np.asarray([np.min(tangential_calibrated_trace)],)
    df["min_radial_acceleration"] = np.asarray([np.min(radial_calibrated_trace)],)
    df["axial_trace"]=list([trace_data["trace_data"]["axial"]["axial_auto_correlated"],])
    df["tangential_trace"]=list([trace_data["trace_data"]["tangential"]["tangential_auto_correlated"],])
    df["radial_trace"]=list([trace_data["trace_data"]["radial"]["radial_auto_correlated"], ])
    trace.dataframe=df
    trace.realtime_append_to_h5(h5f_path)


def add_empty_health_row_to_Q(rssi, temp, batt, packets, delay, trace_time_array, now_array, system_healthQ,
                              last_tracetime, last_counterchanges, corrupt_packets, tx_status,
                              max_axial_acceleration, min_axial_acceleration, max_tangential_acceleration,
                              min_tangential_acceleration, max_radial_acceleration, min_radial_acceleration,
                              disk_usage, drift_list, current_drift):
    now = time.time()
    rssi.pop(0)
    temp.pop(0)
    batt.pop(0)
    packets.pop(0)
    delay.pop(0)
    trace_time_array.pop(0)
    now_array.pop(0)
    max_axial_acceleration.pop(0)
    max_tangential_acceleration.pop(0)
    max_radial_acceleration.pop(0)
    min_axial_acceleration.pop(0)
    min_tangential_acceleration.pop(0)
    min_radial_acceleration.pop(0)
    disk_usage.pop(0)
    drift_list.pop(0)

    if tx_status == 1:
        rssi.append(np.nan)
        temp.append(np.nan)
        batt.append(np.nan)
        packets.append(np.nan)
        max_axial_acceleration.append(np.nan)
        max_tangential_acceleration.append(np.nan)
        max_radial_acceleration.append(np.nan)
        min_axial_acceleration.append(np.nan)
        min_tangential_acceleration.append(np.nan)
        min_radial_acceleration.append(np.nan)
        disk_usage.append(np.nan)
    elif tx_status == 0:
        rssi.append(rssi[-1])
        temp.append(temp[-1])
        batt.append(batt[-1])
        packets.append(packets[-1])
        max_axial_acceleration.append(max_axial_acceleration[-1])
        max_tangential_acceleration.append(max_tangential_acceleration[-1])
        max_radial_acceleration.append(max_radial_acceleration[-1])
        min_axial_acceleration.append(min_axial_acceleration[-1])
        min_tangential_acceleration.append(min_tangential_acceleration[-1])
        min_radial_acceleration.append(min_radial_acceleration[-1])
        disk_usage.append(disk_usage[-1])
    drift_list.append(current_drift)

    sec_delay = round(now-last_tracetime, 2)
    delay.append(sec_delay)
    last_tracetime = datetime.utcfromtimestamp(last_tracetime)
    trace_time_array.append(last_tracetime)
    now_array.append(now)
    health = [rssi, packets, delay, temp, batt, last_counterchanges, last_tracetime, now, sec_delay,
              corrupt_packets, tx_status, max_axial_acceleration, min_axial_acceleration,
              max_tangential_acceleration, min_tangential_acceleration,
              max_radial_acceleration, min_radial_acceleration, disk_usage]
    system_healthQ.put(health)
    np.save(os.path.join(RAM_PATH, 'system_health.npy'), np.asarray(health))

def saveNumpyToFile(h5file, key, nparr):
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

def do_nothing():
    pass

if __name__ == "__main__":
    main_run()






#############################################################################
# v3.0 It handles both rhino hardware versions and saves an h5 trace file
# that is compatible with the v3 processing pipeline input
#############################################################################
