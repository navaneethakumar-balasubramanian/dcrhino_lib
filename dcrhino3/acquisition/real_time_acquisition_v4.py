# Serial logger with no QT.
# This version is with threads.
# v0.2
from __future__ import absolute_import, division, print_function
import serial
import threading
import queue as Queue  # queue for python 3
import struct
import sys
import os
import h5py
from datetime import datetime
import subprocess
import re
import argparse
from shutil import move
from dcrhino3.models.config2 import Config
from dcrhino3.models.traces.raw_trace import RawTraceData
from dcrhino3.process_flow.modules.trace_processing.unfold_autocorrelation import unfold_trace
import multiprocessing
import psutil
import time
import numpy as np
import pandas as pd
from math import ceil
from matplotlib.ticker import FormatStrFormatter
from dcrhino3.acquisition.constants import DATA_PATH, LOGS_PATH, RAM_PATH
from dcrhino3.acquisition.system_health_display_gui import GUI
from dcrhino3.helpers.general_helper_functions import init_logging, init_logging_to_file
from dcrhino3.helpers.general_helper_functions import add_leading_zeors_to_timestamp_for_file_names
from dcrhino3.helpers.h5_helper import H5Helper
import matplotlib.pyplot as plt
if plt.get_backend() == "Qt4Agg":
    pass
else:
    plt.switch_backend('TkAgg')
plt.ioff()

logger = init_logging(__name__)
file_logger = init_logging_to_file(__name__)

config = Config(acquisition_config=True)


def get_rhino_ttyusb():
    try:
        p = subprocess.check_output('ls -l /dev/serial/by-id/ | grep "usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_" | grep -Po -- "../../\K\w*"',shell=True)
        p = p.decode("utf-8")
        return "/dev/" + p.replace('\n', '')
    except:
        return None


rhino_baudrate = config.baud_rate
rhino_pktlen = config.packet_length
data_message_identifier = int(config.data_message_identifier, 16)
info_message_identifier = int(config.info_message_identifier, 16)

rhino_port = get_rhino_ttyusb()
rhino_serial_number = config.sensor_serial_number
rhino_version = config.rhino_version
run_start_time = time.time()
battery_max_voltage = config.battery_max_voltage
battery_lower_limit = config.battery_min_voltage
sampling_rate = config.output_sampling_rate
delta_t = 1.0/sampling_rate
remove_mean = config.remove_mean
missed_packets_threshold = config.missed_packets_threshold


local_folder = config.local_folder
if len(local_folder) == 0:
    local_folder = DATA_PATH
run_folder_path = os.path.join(local_folder,
                               "run_{}".format(datetime.utcfromtimestamp(run_start_time).strftime('%Y%m%d_%H%M%S')))


class LogFileDaemonThread(threading.Thread):
    def __init__(self, logQ):
        threading.Thread.__init__(self)
        self.logQ = logQ
        self.filename = os.path.join(LOGS_PATH, datetime.now().strftime('%Y_%m_%d_%H')+'.log')
        self.output_file = open(self.filename, 'a')

    def run(self):
        m = "Started LogFileDaemon\n"
        logger.debug(m)
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

    def change_files(self, filename):
        self.output_file.close()
        self.output_file = open(filename, 'a')

    def log(self):
        while not self.logQ.empty():
            message = self.logQ.get_nowait()
            self.output_file.write(message)
            self.output_file.flush()


class Packet_v11(object):
    def __init__(self, q_data=None):
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
        offset = config.rssi_offset
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
        if pkt is None:
            return
        try:
            lst = struct.unpack('=bbLbLLLbb', pkt)
        except:
            logger.error("Length - ", len(pkt), pkt)
        msgtype = lst[1]

        if msgtype == data_message_identifier:
            # this is a data msg.
            self.packet_type = 0
            self.rx_sequence = lst[2]
            self.x = lst[4]
            self.y = lst[5]
            self.tx_sequence = lst[6]
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

    def __init__(self, flushq, logQ, displayQ):
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
        self.allowed_clock_difference = config.allowed_clock_difference
        self._drift = 0

    def first_packet_received(self, packet, timestamp):
        m = "First packet received at t0 {} with delta T of {}\n".format(repr(timestamp), delta_t)
        logger.debug(m)
        self.logQ.put(m)
        self.displayQ.put(m)
        samples_to_next_trace = int(ceil((int(timestamp) + 1 - timestamp) / delta_t))
        self.packet_index_in_trace = int(sampling_rate) - samples_to_next_trace - 1
        self.current_timestamp = timestamp
        self.last_sync = timestamp
        self.sequence = packet.tx_sequence
        self.previous_timestamp = packet.tx_sequence
        m = "{}: START SEQUENCE = {}\n".format(datetime.utcfromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S"),
                                               packet.tx_sequence)
        self.logQ.put(m)
        self.displayQ.put(m)
        logger.info(m)

    def get_data_from_q(self):
        return self.flushq.get(False, 0.001)

    def calculate_packet_timestamp(self, packet):
        reference = time.time()
        self.elapsed_tx_sequences = packet.tx_sequence - self.sequence
        if self.elapsed_tx_sequences > missed_packets_threshold:
            packet.valid_trace = False
        self.packet_index_in_trace += self.elapsed_tx_sequences
        self.current_timestamp += self.elapsed_tx_sequences * delta_t
        self.sequence = packet.tx_sequence

        if self.packet_index_in_trace >= sampling_rate:
            diff = round(self.current_timestamp - reference, 2)
            if diff >= self.allowed_clock_difference:
                m = "Last update was {} sec ago\n".format(reference-self.last_sync)
                self.logQ.put(m)
                self.displayQ.put(m)
                logger.debug(m)
                m = "Difference is {} sec, changing time from {} to {}\n".format(diff, repr(self.current_timestamp),
                                                                                 repr(reference))
                logger.debug(m)
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
        row = {"timestamp": np.float64(self.current_timestamp),
               "packet": packet,
               "sequence": self.sequence,
               "counter_changes": self.counter_changes,
               "serial_number": self.rhino_serial_number}
        self.bufferQ.put(row)

    def stop(self):
        self.stope.set()

    def run(self):
        self.run_v11()

    def run_v11(self):
        m = "Started File Flusher 1.1\n"
        logger.debug(m)
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
                        logger.debug(m)
                        self.logQ.put(m)
                        self.displayQ.put(m)
                        self.first_packet_received(packet, timestamp)
                        self.save_row_to_processing_q(packet)
                    else:
                        #if it is a consecutive packet or if we missed any
                        if packet.tx_sequence > self.sequence:
                            packet = self.calculate_packet_timestamp(packet)
                            # TODO:Only save the packet to processing row if it is good timing.  Otherwise save it to
                            #  a spare file
                            self.save_row_to_processing_q(packet)
                        elif packet.tx_sequence == self.sequence:
                            logger.debug(self.previous_timestamp, packet.tx_sequence)
                            self.previous_timestamp = 0
                            self.calculate_packet_timestamp(packet)
                            m = "{}: DUPLICATED RECORD WILL BE IGNORED\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                            logger.warning(m)
                            self.logQ.put(m)
                            self.displayQ.put(m)
                        else:
                            m = "{}: ADJUSTED FOR CLOCK ROLLOVER USING FIRST PACKET LOGIC\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                            logger.info(m)
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


class DummyComport:
    def __init__(self):
        self.corrupt_packets = 0


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
        logger.debug(m)
        self.logQ.put(m)
        self.displayQ.put(m)
        self.cport.flush()
        m = '{}: FLUSHING SERIAL BUFFER\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        logger.debug(m)
        self.logQ.put(m)
        self.displayQ.put(m)
        self.start_rx()
        m = '{}: RESTARTING SERIAL PORT\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        logger.debug(m)
        self.logQ.put(m)
        self.displayQ.put(m)

    @property
    def corrupt_packets(self):
        return self._corrupt_packets

    def run(self):
        self.run_v11()

    def run_v11(self):
        m = "Started Serial 1.1\n"
        logger.debug(m)
        self.logQ.put(m)
        self.displayQ.put(m)
        counter = 0
        restarted = False
        while self.portOpen and not self.stope.isSet():
            try:
                a = self.cport.read(self.pktlen)
                if restarted:
                    if len(a):
                        # logger.debug(a[0] == b'\x02', a[-1] == b'\x03', len(a))
                        logger.debug(a[0] == 0x02, a[-1] == 0x03, len(a))
                    restarted = False
                # if len(a) == self.pktlen and a[0] == b'\x02' and a[self.pktlen-1] == b'\x03':
                if len(a) == self.pktlen and a[0] == 0x02 and a[self.pktlen - 1] == 0x03:
                    counter = 0
                    if a[1] == 0x64:
                        self.tx_status = 1
                    elif a[1] == 0x69:
                        self.tx_status = 0
                    self.flushq.put(a)
                else:
                    if self.tx_status == 1:
                        counter += 1
                        self._corrupt_packets += 1
                        if len(a) >= self.pktlen:
                            m = '{}: CORRUPT {} BYTE PACKET>>>>>>>>>>>>>>>>>>>>>{}\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),len(a),counter)
                            # logger.warning(m)
                            self.logQ.put(m)
                            self.displayQ.put(m)
                        else:
                            m = '{}: TRUNCATED {} BYTE PACKET>>>>>>>>>>>>>>>>>>>>>{}\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),len(a),counter)
                            # logger.warning(m)
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
                    else:
                        m = '{}: SLEEPING\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                        self.logQ.put(m)
                        self.displayQ.put(m)
                        time.sleep(0.1)
            except:
                time.sleep(0.5)
                m = "Serial Thread Exception"
                logger.error(m)
                self.logQ.put(m)
                self.displayQ.put(m)
                m = sys.exc_info()
                logger.error(m)
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

class SimulationThread(threading.Thread):
    def __init__(self, file_input, file_flusher):
        threading.Thread.__init__(self)
        self.file_input = file_input
        self.file_flusher = file_flusher
        self.h5 = H5Helper(h5py.File(file_input, "r"), load_ts=True, load_xyz=True)

    def run(self):
        seq = self.h5.load_axis("seq")
        ts = self.h5.load_axis("ts")
        batt = self.h5.load_axis("batt")
        temp = self.h5.load_axis("temp")
        rssi = self.h5.load_axis("rssi")
        x = self.h5.load_axis("x")
        y = self.h5.load_axis("y")
        z = self.h5.load_axis("z")

        previous_seq = None
        for index in range(len(x)):
            packet = Packet_v11()
            if previous_seq is None:
                previous_seq = seq[index]
            else:
                if seq[index] > previous_seq + config.missed_packets_threshold:
                    packet.valid_trace = False
            packet.batt = batt[int(index/len(batt))]
            packet.temp = temp[int(index/len(temp))]
            packet.rssi = rssi[index]
            packet.tx_sequence = seq[index]
            packet.rx_sequence = seq[index]
            packet.tx_clock_ticks = seq[index]
            packet.x = x[index]
            packet.y = y[index]
            packet.z = z[index]
            packet.packet_type = 0
            self.file_flusher.current_timestamp = ts[index]
            self.file_flusher.save_row_to_processing_q(packet)
        sys.exit(0)


class CollectionDaemonThread(threading.Thread):
    def __init__(self, bufferQ, tracesQ, logQ, displayQ):
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
        return timestamp - delta_t * offset

    def run(self):
        m = "Started Collection Daemon\n"
        logger.debug(m)
        self.logQ.put(m)
        self.displayQ.put(m)
        lastFileName = None
        look_for_time = True
        file_change_interval_in_min = config.file_change_interval_in_min
        df_columns = ["ts", "cticks", "seq", "x", "y", "z", "rssi", "temp", "batt"]
        first = True
        while True:
            try:
                if not self.bufferQ.empty():
                    buffer_entry = self.bufferQ.get()
                    entry_timestamp = buffer_entry["timestamp"]
                    packet = buffer_entry["packet"]
                    sequence = buffer_entry["sequence"]
                    rhino_serial_number = buffer_entry["serial_number"]
                    counter_changes = buffer_entry["counter_changes"]
                    dataframe_row = [entry_timestamp, packet.tx_sequence, sequence, packet.x, packet.y, packet.z,
                                     packet.rssi, packet.temp, packet.batt]
                    # if the packet does not belong to the current trace we process the data and then append
                    # the current packet to the freshly created bufferThisSecond
                    if self.lastSecond != int(entry_timestamp):
                        temp_lastSecond = self.lastSecond
                        self.lastSecond = int(entry_timestamp)

                        # If there is data in the bufferThisSecond
                        if len(self.bufferThisSecond) >= 1:

                            utc_dt = datetime.utcfromtimestamp(temp_lastSecond)
                            if lastFileName is None or (utc_dt.minute % file_change_interval_in_min == 0 and
                                                        look_for_time):
                                if lastFileName is not None:
                                    h5_helper.close_h5f()
                                    move(filename, filename.replace(".tmp", ".h5"))
                                look_for_time = False
                                prefix = utc_dt.strftime('%Y%m%d')+"_RTR"
                                delta = utc_dt - datetime(year=utc_dt.year, month=utc_dt.month, day=utc_dt.day)
                                elapsed = str(int(delta.total_seconds()))
                                elapsed = add_leading_zeors_to_timestamp_for_file_names(elapsed)
                                filename = "{}{}_{}.tmp".format(prefix, elapsed, rhino_serial_number)
                                filename = os.path.join(run_folder_path, filename)
                                h5f = h5py.File(filename, "a")
                                h5_helper = H5Helper(h5f, config=config, load_ts=False)
                                h5_helper.save_field_config_to_h5()
                                sensitivity = np.array(config.sensitivity_list_xyz, dtype=np.float32)
                                h5_helper.save_np_array_to_h5_file('sensitivity', sensitivity)
                                axis = np.array([config.sensor_axial_axis, config.sensor_tangential_axis],
                                                dtype=np.float32)
                                h5_helper.save_np_array_to_h5_file('axis', axis)
                                lastFileName = utc_dt
                                first = True
                            else:
                                if lastFileName.minute != utc_dt.minute:
                                    look_for_time = True
                            if first:
                                disk_usage = psutil.disk_usage('/')[3]
                                first = False

                            data_frame = pd.DataFrame(self.bufferThisSecond, columns=df_columns)
                            h5_helper.save_dataframe_to_h5_file(data_frame)
                            m = "TIMESTAMP :{}, SAMPLES: {})\n".format(int(entry_timestamp), len(self.bufferThisSecond))
                            self.logQ.put(m)
                            self.displayQ.put(m)

                            if packet.valid_trace:
                                interp_kind = "quadratic"
                            else:
                                interp_kind = "linear"

                            raw_trace_data = RawTraceData()
                            component_trace_dict = {}
                            acceleration_dict = {}

                            component_trace_raw_data = {"axial": data_frame[config.map_component_to_axis("axial")],
                                                        "tangential": data_frame[config.map_component_to_axis(
                                                            "tangential")],
                                                        "radial": data_frame[config.map_component_to_axis(
                                                            "radial")]}

                            trace_t0 = data_frame.ts[0]
                            initial_trace_timestamp = self.calculate_initial_tracetime_from_timestamp(trace_t0)
                            ideal_timestamps = 1. / float(config.output_sampling_rate) * np.arange(0, int(
                                config.output_sampling_rate)) + initial_trace_timestamp

                            number_of_samples = int(config.auto_correlation_trace_duration *
                                                    config.output_sampling_rate)
                            component_labels = ["axial", "tangential", "radial"]
                            for label in component_labels:
                                calibrated_data = raw_trace_data.calibrate_1d_component_array(
                                    component_trace_raw_data[label], config,
                                    config.get_sensor_sensitivity_by_axis(label), remove_mean=False)
                                interp_data = raw_trace_data.interpolate_1d_component_array(data_frame.ts,
                                                                                            calibrated_data,
                                                                                            ideal_timestamps,
                                                                                            kind=interp_kind)
                                acorr_data = raw_trace_data.autocorrelate_1d_component_array(interp_data,
                                                                                             number_of_samples,
                                                                                             copy_input=True)
                                component_trace_dict[label] = {"{}_calibrated".format(label): calibrated_data,
                                                               "{}_interpolated".format(label): interp_data,
                                                               "{}_auto_correlated".format(label): acorr_data}
                                if remove_mean:
                                    acceleration_dict[label] = {"max": np.max(calibrated_data - np.mean(
                                        calibrated_data)),
                                                                "min": np.min(calibrated_data) - np.mean(
                                                                    calibrated_data)}
                                else:
                                    acceleration_dict[label] = {"max": np.max(calibrated_data),
                                                                "min": np.min(calibrated_data)}
                            # Send data to the Q so that it can be plotted
                            self.tracesQ.put({"timestamp": np.asarray([temp_lastSecond, ], dtype=np.float64),
                                              "raw_timestamps": data_frame.ts,
                                              "ideal_timestamps": ideal_timestamps,
                                              "raw_data": component_trace_raw_data,
                                              "trace_data": component_trace_dict,
                                              "rssi": data_frame.rssi.mean(),
                                              "temp": data_frame.temp.mean(),
                                              "batt": data_frame.batt.mean(),
                                              "acceleration": acceleration_dict,
                                              "counter_changes": counter_changes,
                                              "disk_usage": disk_usage,
                                              "filename": filename})
                        self.bufferThisSecond = list()
                    self.bufferThisSecond.append(dataframe_row)
                else:
                    # print("collection daemon buffer empty")
                    time.sleep(0.05)
            except AttributeError:
                logger.error("Collection Daemon Exception: {}".format(sys.exc_info()))
                logger.error("WEIRD ERROR TRYING TO APPEND TO BUFFER THIS SECOND AFTER IT WAS CONVERTED TO NUMPY ON "
                             "CLOCK ROLLOVER")
                self.bufferThisSecond = list()
            except:
                logger.error("Collection Daemon Exception: {}".format(sys.exc_info()))
                self.bufferThisSecond = list()


def main_run(run=True, **kwargs):

    if "args" in kwargs.keys():
        simulation = kwargs["args"].simulation
        file_input = kwargs["args"].file_input
    else:
        simulation = False

    if not os.path.exists(run_folder_path):
        os.makedirs(run_folder_path)
    config.export_config_for_h5_files(os.path.join(run_folder_path, 'config.json'))
    # copyfile(config_collection_file_path, os.path.join(run_folder_path, 'config.cfg'))
    flushQ = Queue.Queue()
    traces = Queue.Queue()
    logQ = Queue.Queue()
    displayQ = Queue.Queue()
    system_healthQ = Queue.Queue()
    rhino_logger = LogFileDaemonThread(logQ)
    display = GUI(displayQ, system_healthQ)
    fflush = FileFlusher(flushQ, logQ, displayQ)
    collection_daemon = CollectionDaemonThread(fflush.bufferQ, traces, logQ, displayQ)

    if not simulation:
        comport = SerialThread(rhino_port, rhino_baudrate, rhino_pktlen, flushQ, logQ, displayQ)
        comport.stop_rx()
        comport.cport.close()
        comport = SerialThread(rhino_port, rhino_baudrate, rhino_pktlen, flushQ, logQ, displayQ)
    else:
        simulation_thread = SimulationThread(file_input, fflush)
        comport = DummyComport()





    m = "Started Main\n"
    logger.debug(m)
    logQ.put(m)
    displayQ.put(m)

    m = plt.get_backend()+"\n"
    logger.debug(m)
    logQ.put(m)
    displayQ.put(m)


    pid = os.getpid()
    m = "{}: STARTED PROCESS {}\n".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"), pid)
    logQ.put(m)
    displayQ.put(m)
    logger.info(m)

    if run:
        fflush.start()
        if not simulation:
            comport.start()
            comport.start_rx()
        else:
            simulation_thread.start()
        collection_daemon.start()
        rhino_logger.start()

        # SET THREADS TO EXCLUSIVE CPUS
        p = subprocess.Popen(['pstree', '-p', str(pid)], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = p.communicate()
        subpids = []
        for sub_pid in re.findall(b'\(.*?\)', out):
            sub_pid = sub_pid.decode("utf-8")
            sub_pid = sub_pid.replace('(', '').replace(')', '')
            if pid != int(sub_pid):
                m = "{}\n".format(sub_pid)
                logQ.put(m)
                displayQ.put(m)
                subpids.append(sub_pid)
        processor_number = multiprocessing.cpu_count()-3
        p = subprocess.Popen(['taskset', '-cp', '{}'.format(processor_number), str(pid)],
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE)  # 6
        # print("Realtime Acquisition Opened in processod {}\n".format(processor_number))
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
            p = subprocess.Popen(['taskset', '-cp', '{}'.format(processor_number), str(subpids[index])],
                                 stdout=subprocess.PIPE,
                                 stderr=subprocess.PIPE)
            out, err = p.communicate()
            # print("Process {} Opened in processod {}\n".format(subpids[index],processor_number))
    else:
        fflush.stop()


    length = config.x_axis_length_in_seconds
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
    channels = ["X", "Y", "Z"]
    components = ["axial", "tangential", "radial"]
    sensor_axial_axis = config.get_component_index("axial")
    sensor_tangential_axis = config.get_component_index("tangential")
    sensor_radial_axis = config.get_component_index("radial")
    channel_mapping = {"axial": sensor_axial_axis, "tangential": sensor_tangential_axis, "radial": sensor_radial_axis}
    component_to_display = config.component_to_display
    second_plot_display = config.second_plot_display

    realtime_trace = RawTraceData()
    realtime_trace.add_global_config(config.pipeline_files_to_dict, file_id='0')

    fig1 = plt.figure("DataCloud Rhino Real Time Data", figsize=(6, 4))
    if simulation:
        fig1.patch.set_facecolor('red')
    plt.subplots_adjust(hspace=0.8, top=0.8)
    fig1.canvas.manager.window.wm_geometry("+%d+%d" % (0, 0))
    fig1.canvas.get_tk_widget().focus_force()
    plt.pause(.05)
    fig1.canvas.draw()
    previous_filename = None

    # this is for newer pyplot versions in case we want to prevent the user to close the plot windows
    # win = plt.gcf().canvas.manager.window
    # win.protocol("WM_DELETE_WINDOW", do_nothing)

    while True:
        # TRACE STRUCTURE {"second":temp_lastSecond,
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

            filename = trace["filename"].replace("RTR", "RTA")
            if previous_filename != filename:
                if previous_filename is not None:
                    move(previous_filename, previous_filename.replace(".tmp", ".h5"))
                previous_filename = filename
            tracetime = datetime.utcfromtimestamp(trace_second)

            # <Save Trace data to h5>
            h5f_path = os.path.join(run_folder_path, filename)
            write_data_to_h5_files(h5f_path, trace, realtime_trace)  # This are the Acorr traces
            # </Save Trace data to h5>

            # rows,columns
            rows = 2
            columns = 3

            row = 0
            column = 0

            signal_plot = plt.subplot2grid((rows, columns), (row, column), colspan=3, rowspan=1)
            signal_plot.set_title("Channel {} - ".format(channels[channel_mapping[component_to_display]]) + "{} Component Raw".format(component_to_display.upper()))
            signal_plot.set_ylabel("g")
            signal_plot.set_xlabel("samples")
            signal_plot.yaxis.set_major_formatter(FormatStrFormatter('%.2f'))
            row += 1

            trace_plot = plt.subplot2grid((rows, columns), (row, column), colspan=3, rowspan=1)
            trace_plot.set_title("Channel {} - ".format(channels[channel_mapping[component_to_display]]) +"{} Component Trace".format(component_to_display.upper()))

            sec_delay = round(now - trace_second, 2)
            plt.suptitle("Trace Time " + tracetime.strftime('%Y-%m-%d %H:%M:%S') + " plotted at " +
                         datetime.utcfromtimestamp(now).strftime('%Y-%m-%d %H:%M:%S') + " delay of " + str(
                sec_delay)+"\nAnd a drift of " + str(fflush.drift), fontsize=10)

            data_to_plot = trace["trace_data"][component_to_display]["{}_interpolated".format(component_to_display)]
            if remove_mean:
                data_to_plot = data_to_plot - np.mean(data_to_plot)
            signal_plot.plot(data_to_plot, 'black')

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

        except RuntimeError as e:
            if e.message == "Unable to create link (name already exists)":
                m = "{}\n".format(e)
                logger.error(m)
                logQ.put(m)
                displayQ.put(m)
                m = "{} Already Exists in h5 File\n".format(trace[0])
                logger.error(m)
                logQ.put(m)
                displayQ.put(m)
                key = str(trace_second)+"_rollback"
                # write_data_to_h5_files(h5f_path, key, trace)
                # m = "Data successfully saved as {}\n".format(key)
                # logQ.put(m)
                # displayQ.put(m)
            else:
                m = "{}\n".format(e)
                logger.error(m)
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
            for second in range(q_timeout_wait):  # we waited q_timeout_wait seconds before the exception was thrown.
                # Therefore we need to add one empty row per each second we waited
                add_empty_health_row_to_Q(rssi, temp, batt, packets, delay, trace_time_array, now_array, system_healthQ,
                                          last_tracetime, counterchanges, comport.corrupt_packets, fflush.tx_status,
                                          max_axial_acceleration, min_axial_acceleration,
                                          max_tangential_acceleration, min_tangential_acceleration,
                                          max_radial_acceleration, min_radial_acceleration, disk_usage,
                                          drift, fflush.drift)
            display.update_system_health()
        except:
            m = "{}\n".format(sys.exc_info())
            logger.error("Main run exeption", m)
            logQ.put(m)
            displayQ.put(m)


def write_data_to_h5_files(h5f_path, trace_data, trace):
    # pdb.set_trace()
    df = pd.DataFrame(columns=["timestamp", "rssi", "batt", "temp", "packets", "max_axial_acceleration",
                               "max_tangential_acceleration", "max_radial_acceleration",
                               "min_axial_acceleration", "min_tangential_acceleration", "min_radial_acceleration",
                               "axial_trace", "tangential_trace", "radial_trace"])
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
    df["axial_trace"] = list([trace_data["trace_data"]["axial"]["axial_auto_correlated"], ])
    df["tangential_trace"] = list([trace_data["trace_data"]["tangential"]["tangential_auto_correlated"], ])
    df["radial_trace"] = list([trace_data["trace_data"]["radial"]["radial_auto_correlated"], ])
    trace.dataframe = df
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
    # health = [rssi, packets, delay, temp, batt, last_counterchanges, last_tracetime, now, sec_delay,
    #           corrupt_packets, tx_status, max_axial_acceleration, min_axial_acceleration,
    #           max_tangential_acceleration, min_tangential_acceleration,
    #           max_radial_acceleration, min_radial_acceleration, disk_usage]
    health = [rssi, packets, delay, temp, batt, last_counterchanges, last_tracetime, now, sec_delay,
              corrupt_packets, tx_status, max_axial_acceleration, min_axial_acceleration,
              max_tangential_acceleration, min_tangential_acceleration,
              max_radial_acceleration, min_radial_acceleration, disk_usage, current_drift]
    system_healthQ.put(health)
    np.save(os.path.join(RAM_PATH, 'system_health.npy'), np.asarray(health))


def do_nothing():
    pass


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Playback Raw Data -  Copyright (c) 2019 DataCloud")
    argparser.add_argument('-s', '--simulation', help="Run in simulation mode", default=False)
    argparser.add_argument('-i', '--file_input', help="File with data for simulation", default=None)
    args = argparser.parse_args()
    main_run(args=args)






#############################################################################
# v4.2
# Only compatible with rhino 1.1
# Uses the new config files
# Saves the config file in the h5 file as a json string and not as attributes
# Uses raw trace data object for data handling
# Runs on Python 3.6
#############################################################################
