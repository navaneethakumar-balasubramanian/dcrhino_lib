from __future__ import absolute_import, division, print_function
import serial
import threading
import queue
import struct
import sys
import os
import h5py
import enum
from datetime import datetime
import subprocess
import re
import pdb
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
from dcrhino3.helpers.general_helper_functions import interpolate_data, calibrate_data
from dcrhino3.process_flow.modules.trace_processing.autocorrelate import autocorrelate_trace
from dcrhino3.helpers.h5_helper import H5Helper
# import matplotlib.pyplot as plt
# if plt.get_backend() == "Qt4Agg":
#     pass
# else:
#     plt.switch_backend('TkAgg')
# plt.ioff()

logger = init_logging(__name__)
file_logger = init_logging_to_file(__name__)

config = Config(acquisition_config=True)


def get_rhino_ttyusb():
    p = subprocess.check_output('ls -l /dev/serial/by-id/ | grep "usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_" | grep -Po -- "../../\K\w*"',shell=True)
    p = p.decode("utf-8")
    return "/dev/" + p.replace('\n', '')


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
df_columns = ["ts", "cticks", "seq", "x", "y", "z", "rssi", "temp", "batt"]


local_folder = config.local_folder
if len(local_folder) == 0:
    local_folder = DATA_PATH
run_folder_path = os.path.join(local_folder,
                               "run_{}".format(datetime.utcfromtimestamp(run_start_time).strftime('%Y%m%d_%H%M%S')))


class PacketType(enum.Enum):
    DATA = 0
    INFO = 1


class TXStatus(enum.Enum):
    SLEEPING = 0
    TRANSMITTING = 1


class Packet(object):
    def __init__(self, q_data):
        self.packet_type = PacketType.DATA  # 0=data_packet, 1=info_packet
        self.rx_sequence = 0
        self.x = 0
        self.y = 0
        self.z = 0
        self.timestamp = 0  # Each clock tick is 10 microseconds
        self.tx_sequence = 0  # Each sequence is 250 or 500 microseconds depending on the sampling rate
        self.rssi = 0
        self.temp = 0
        self.batt = 0
        self.sleep_time = 0
        self.valid_trace = True
        self.decode_packet(q_data)

    @property
    def trace_time(self):
        return int(self.timestamp)

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

    def decode_packet(self, pkt):
        try:
            lst = struct.unpack('=bbLbLLLbb', pkt)
        except:
            logger.error("Length - ", len(pkt), pkt)
        msgtype = lst[1]

        if msgtype == data_message_identifier:
            self.packet_type = PacketType.DATA
            self.rx_sequence = lst[2]
            self.x = lst[4]
            self.y = lst[5]
            self.tx_sequence = lst[6]
            self.rssi = self.calc_rssi_value(lst[7])
        else:
            self.packet_type = PacketType.INFO
            lst = struct.unpack('=bbLbHHHbbbbbbbb', pkt)
            self.rx_sequence = lst[2]
            self.temp = self.calc_temp_in_c(lst[4])
            self.batt = self.calc_batt(lst[5])
            self.sleep_time = lst[6]
            self.rssi = self.calc_rssi_value(lst[7])



class RTAHandler(threading.Thread):

    def __init__(self, raw_trace_q, rta_q):
        threading.Thread.__init__(self)
        self._raw_trace_q = raw_trace_q
        self.rta_q = rta_q

    def run(self):
        while True:
            try:
                raw_trace = self._raw_trace_q.get()
                interpolation_type = "quadratic"
                if raw_trace.linear_interpolation_required:
                    interpolation_type = "linear"
                number_of_samples_for_acorr = int(config.auto_correlation_trace_duration * config.output_sampling_rate)
                ideal_timestamps = 1. / float(config.output_sampling_rate) * np.arange(0, int(
                    config.output_sampling_rate)) + raw_trace.trace_t0

                component_trace_raw_data = {"axial": raw_trace.dataframe[config.map_component_to_axis("axial")],
                                            "tangential": raw_trace.dataframe[config.map_component_to_axis(
                                                "tangential")],
                                            "radial": raw_trace.dataframe[config.map_component_to_axis("radial")]}

                component_trace_dict = dict()
                acceleration_dict = dict()
                for component in config.components_to_process:
                    axis = config.map_component_to_axis(component)
                    calibrated_data = calibrate_data(raw_trace.dataframe[axis],
                                                     2.5,
                                                     3,
                                                     1.1,
                                                     remove_mean=config.remove_mean)
                    interpolated_data = interpolate_data(raw_trace.dataframe.ts, calibrated_data,
                                                         ideal_timestamps, interpolation_type)
                    acorr_data = autocorrelate_trace(interpolated_data, number_of_samples_for_acorr,
                                                     copy_input=True)

                    component_trace_dict[component] = {"{}_calibrated".format(component): calibrated_data,
                                                       "{}_interpolated".format(component): interpolated_data,
                                                       "{}_auto_correlated".format(component): acorr_data}
                    if remove_mean:
                        acceleration_dict[component] = {"max": np.max(calibrated_data - np.mean(
                            calibrated_data)),
                                                    "min": np.min(calibrated_data) - np.mean(
                                                        calibrated_data)}
                    else:
                        acceleration_dict[component] = {"max": np.max(calibrated_data), "min": np.min(calibrated_data)}

                trace_dict = {"timestamp": int(raw_trace.trace_t0),
                              "raw_timestamps": raw_trace.dataframe.ts,
                              "ideal_timestamps": ideal_timestamps,
                              "raw_data": component_trace_raw_data,
                              "trace_data": component_trace_dict,
                              "rssi": raw_trace.dataframe.rssi.mean(),
                              "temp": raw_trace.dataframe.temp.mean(),
                              "batt": raw_trace.dataframe.batt.mean(),
                              "acceleration": acceleration_dict  # ,
                              # "counter_changes": counter_changes,
                              # "disk_usage": disk_usage,
                              # "filename": filename
                              }
                self.rta_q.put(trace_dict)
            except:
                logger.error("RTAHandler Exception: {}".format(sys.exc_info()))

    # def generate_rta(self):
    #     df = pd.DataFrame(columns=["timestamp", "rssi", "batt", "temp", "packets", "max_axial_acceleration",
    #                                "max_tangential_acceleration", "max_radial_acceleration",
    #                                "min_axial_acceleration", "min_tangential_acceleration", "min_radial_acceleration",
    #                                "axial_trace", "tangential_trace", "radial_trace"])
    #     axial_calibrated_trace = trace_data["trace_data"]["axial"]["axial_calibrated"]
    #     tangential_calibrated_trace = trace_data["trace_data"]["tangential"]["tangential_calibrated"]
    #     radial_calibrated_trace = trace_data["trace_data"]["radial"]["radial_calibrated"]
    #     df["timestamp"] = trace_data["timestamp"]
    #     df["rssi"] = trace_data["rssi"]
    #     df["batt"] = trace_data["batt"]
    #     df["temp"] = trace_data["temp"]
    #     df["packets"] = len(axial_calibrated_trace)
    #     df["max_axial_acceleration"] = np.asarray([np.max(axial_calibrated_trace)], )
    #     df["max_tangential_acceleration"] = np.asarray([np.max(tangential_calibrated_trace)], )
    #     df["max_radial_acceleration"] = np.asarray([np.max(radial_calibrated_trace)], )
    #     df["min_axial_acceleration"] = np.asarray([np.min(axial_calibrated_trace)], )
    #     df["min_tangential_acceleration"] = np.asarray([np.min(tangential_calibrated_trace)], )
    #     df["min_radial_acceleration"] = np.asarray([np.min(radial_calibrated_trace)], )
    #     df["axial_trace"] = list([trace_data["trace_data"]["axial"]["axial_auto_correlated"], ])
    #     df["tangential_trace"] = list([trace_data["trace_data"]["tangential"]["tangential_auto_correlated"], ])
    #     df["radial_trace"] = list([trace_data["trace_data"]["radial"]["radial_auto_correlated"], ])



class RawTraceGenerator(threading.Thread):

    def __init__(self, healthy_packets_q):
        threading.Thread.__init__(self)
        self._healty_packets_q = healthy_packets_q
        self.raw_trace_q = queue.Queue()
        self.current_trace_time = None
        self.current_trace_packet_t0 = None
        self.require_linear_interpolation = False
        self.trace_buffer = list()
        self.counter_changes = 0

    def run(self):
        while True:
            try:
                packet = self._healty_packets_q.get()
                self.add_packet_to_trace(packet)
            except:
                logger.error("Raw Trace Generator Error: {}".format(sys.exc_info()))

    def calculate_initial_tracetime_from_timestamp(self, timestamp):
        fraction = timestamp - int(timestamp)
        offset = int(fraction / delta_t)
        return timestamp - delta_t * offset

    def add_packet_to_trace(self, packet):
        if self.current_trace_time is None:
            self.current_trace_time = packet.trace_time
            self.current_trace_packet_t0 = packet.timestamp
        if self.current_trace_time != packet.trace_time:
            # df_columns = ["ts", "cticks", "seq", "x", "y", "z", "rssi", "temp", "batt"]
            data_frame = pd.DataFrame(self.trace_buffer, columns=df_columns)
            # TODO: Save trace to RTR file
            m = "TIMESTAMP :{}, SAMPLES: {})".format(self.current_trace_time, len(self.trace_buffer))
            self.counter_changes += 1
            logger.info(m)
            raw_trace = RawTraceData(df=data_frame)
            raw_trace.require_linear_interpolation(self.require_linear_interpolation)
            raw_trace.trace_t0 = self.calculate_initial_tracetime_from_timestamp(self.current_trace_packet_t0)
            raw_trace.add_global_config(config.pipeline_files_to_dict, "0")
            self.raw_trace_q.put(raw_trace)
            self.trace_buffer = list()
            self.current_trace_time = packet.trace_time
            self.current_trace_packet_t0 = packet.timestamp
            self.require_linear_interpolation = False
        trace_buffer_row = [packet.timestamp, packet.tx_sequence, packet.tx_sequence, packet.x, packet.y, packet.z,
                            packet.rssi, packet.temp, packet.batt]
        if not packet.valid_trace:
            self.require_linear_interpolation = True
        self.trace_buffer.append(trace_buffer_row)


class PacketDecoder(threading.Thread):

    def __init__(self, raw_packets_q):
        threading.Thread.__init__(self)
        self._raw_packets_q = raw_packets_q
        self.healthy_packets_q = queue.Queue()
        self.info_packets_q = queue.Queue()
        self.first_packet = True
        self.initial_timestamp = None
        self.previous_timestamp = None
        self.tx_sequence = None
        self.current_temp = np.nan
        self.current_batt = np.nan
        self.current_rssi = np.nan
        self.current_sleep_time = np.nan
        self.tx_status = TXStatus.SLEEPING
        self.config = config

    def run(self):
        while True:
            try:
                timestamp = time.time()
                raw_packet = self._raw_packets_q.get()
                packet = Packet(raw_packet)
                if packet.packet_type == PacketType.DATA:
                    # Fill out current health data on the packet
                    self.tx_status = TXStatus.TRANSMITTING
                    packet.batt = self.current_batt
                    packet.temp = self.current_temp
                    packet.sleep_time = self.current_sleep_time
                    if self.first_packet:
                        self.first_packet = False
                        packet.timestamp = timestamp
                        self.previous_timestamp = timestamp
                        self.initial_timestamp = timestamp
                        self.tx_sequence = packet.tx_sequence
                        m = "First packet received at t0 {} with delta T of {}".format(repr(timestamp), delta_t)
                        logger.info(m)
                        self.healthy_packets_q.put(packet)
                    else:
                        elapsed_sequences = packet.tx_sequence - self.tx_sequence
                        if elapsed_sequences < 1:
                            logger.error("Elapsed sequences was {} and packet will be dropped".format(elapsed_sequences))
                        else:
                            if elapsed_sequences > missed_packets_threshold:
                                # logger.warning("{} missed packets were detected".format(elapsed_sequences))
                                packet.valid_trace = False
                            time_elapsed = elapsed_sequences * delta_t
                            packet.timestamp = self.previous_timestamp + time_elapsed
                            self.previous_timestamp = packet.timestamp
                            self.tx_sequence = packet.tx_sequence
                            self.healthy_packets_q.put(packet)
                else:
                    #Todo: deal with info messages
                    pass
            except:
                print("Packet Decoder Exception: {}".format(sys.exc_info()))


class SerialThread(threading.Thread):
    def __init__(self, comport, config):
        threading.Thread.__init__(self)
        self.brate = config.baud_rate
        self.cport = serial.Serial(comport, self.brate, timeout=1.0)
        self.pktlen = config.packet_length
        self.portOpen = True
        self.raw_packets_q = queue.Queue()
        self.stope = threading.Event()
        self.stope.clear()
        self._corrupt_packets = 0
        self.tx_status = 0
        self.comport = comport
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
        self.cport.flush()
        m = '{}: FLUSHING SERIAL BUFFER\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        logger.debug(m)
        self.start_rx()
        m = '{}: RESTARTING SERIAL PORT\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
        logger.debug(m)

    @property
    def corrupt_packets(self):
        return self._corrupt_packets

    def run(self):
        m = "Started Serial 1.1\n"
        logger.debug(m)
        counter = 0
        while self.portOpen and not self.stope.isSet():
            try:
                packet = self.cport.read(self.pktlen)
                if len(packet) == self.pktlen and packet[0] == 0x02 and packet[self.pktlen - 1] == 0x03:
                    counter = 0
                    if packet[1] == 0x64:
                        self.tx_status = 1
                    elif packet[1] == 0x69:
                        self.tx_status = 0
                    self.raw_packets_q.put(packet)
                else:
                    if self.tx_status == 1:
                        counter += 1
                        self._corrupt_packets += 1
                        if len(packet) >= self.pktlen:
                            m = '{}: CORRUPT {} BYTE PACKET>>>>>>>>>>>>>>>>>>>>>{}\n'.format(datetime.utcnow(

                            ).strftime("%Y-%m-%d %H:%M:%S"), len(packet), counter)
                            logger.warning(m)
                        else:
                            m = '{}: TRUNCATED {} BYTE PACKET>>>>>>>>>>>>>>>>>>>>>{}\n'.format(datetime.utcnow(

                            ).strftime("%Y-%m-%d %H:%M:%S"), len(packet), counter)
                            logger.warning(m)

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
                    else:
                        m = '{}: SLEEPING\n'.format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))
                        logger.info(m)
                        time.sleep(0.1)
            except:
                time.sleep(0.5)
                m = "Serial Thread Exception: {}".format(sys.exc_info())
                logger.error(m)


class RhinoMainAcquisition(threading.Thread):

    def __init__(self, trace_data_q):
        threading.Thread.__init__(self)
        self.trace_data_q = trace_data_q
        if not os.path.exists(run_folder_path):
            os.makedirs(run_folder_path)
        config.export_config_for_h5_files(os.path.join(run_folder_path, 'config.json'))
        self.comport = SerialThread(rhino_port, config)
        self.comport.stop_rx()
        self.comport.cport.close()
        self.comport = SerialThread(rhino_port, config)
        self.packet_decoder = PacketDecoder(self.comport.raw_packets_q)
        self.raw_trace_generator = RawTraceGenerator(self.packet_decoder.healthy_packets_q)
        self.rta_handler = RTAHandler(self.raw_trace_generator.raw_trace_q, self.trace_data_q)
        self.main_process = None


    def run(self):
        try:
            # pdb.set_trace()
            m = "Started Main Run"
            logger.info(m)
            pid = os.getpid()
            m = "{}: STARTED PROCESS {}".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"), pid)
            logger.info(m)

            # Start receiving packets from the comport
            self.comport.start()
            self.comport.start_rx()

            # Start decoding packets from the raw_packet_q
            self.packet_decoder.start()

            # Start generating traces from the healthy_packets_q
            self.raw_trace_generator.start()

            # Start generating RTAs
            self.rta_handler.start()

            # SET THREADS TO EXCLUSIVE CPUS
            self.main_process = subprocess.Popen(['pstree', '-p', str(pid)], stdout=subprocess.PIPE,
                                                 stderr=subprocess.PIPE)
            out, err = self.main_process.communicate()
            subpids = []
            for sub_pid in re.findall(b'\(.*?\)', out):
                sub_pid = sub_pid.decode("utf-8")
                sub_pid = sub_pid.replace('(', '').replace(')', '')
                if pid != int(sub_pid):
                    m = "{}\n".format(sub_pid)
                    # logQ.put(m)
                    # displayQ.put(m)
                    subpids.append(sub_pid)
            processor_number = multiprocessing.cpu_count()-3
            p = subprocess.Popen(['taskset', '-cp', '{}'.format(processor_number), str(pid)],
                                 stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            out, err = p.communicate()
            for index in range(len(subpids)):
                p = subprocess.Popen(['taskset', '-cp', '{}'.format(processor_number), str(subpids[index])],
                                     stdout=subprocess.PIPE,
                                     stderr=subprocess.PIPE)
                out, err = p.communicate()

            while True:
                pass
        except:
            print("Main Run Exception {}".format(sys.exc_info()))


if __name__ == "__main__":
    # acquisition = RhinoMainAcquisition()
    # acquisition.start()
    pass





#############################################################################
# v4.2
# Only compatible with rhino 1.1
# Uses the new config files
# Saves the config file in the h5 file as a json string and not as attributes
# Uses raw trace data object for data handling
# Runs on Python 3.6
#############################################################################
