"""
Real Time Acquisition Module

This module handles all the rhino data acuisition related tasks.  It is divided in 6 threads:
 - LogFileDaemonThread: Logs information and errors into the log display console and a physical log file
 - SerialThread: Receives individual data packets from Rhino receiver, filters corrupt packets and places the remaining good packets in a queue (flushQ) for further processing.
 - FileFlusher:  Receives packets from serial queue (flushQ), decodes them and splits them into info and data packets.  Data packets are saved into a bufferQ for further processing
 - CollectionDaemonThread: Reads packets from bufferQ, generates the traces and save them to tracesQ for further processing.
 - SimulationThread: Will take the place of SerialThread and instead of receiving packets from serial port, it will read a raw RTR file and stream that data to the remaining threads
 - main_run: Will read traces from traceQ and handle all the plotting and system health display.

 @author: Natal

"""
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
    """
        Finds the USB port where the Rhino receiver is connected
    Returns:
        str: USB port where Rhino receiver is connected. None if it can't be found.

    """
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
    """
        Writes messages from the logQ to a log file.  Each file is one hour long and it changes on the hour.
    Note:
        The path where the logs are stored is read from constants.py
    Args:
        logQ: obj. Instance of a queue used to collect logging messages from various threads and write them to a file
    """
    def __init__(self, logQ):
        threading.Thread.__init__(self)
        self.daemon = True
        self.logQ = logQ
        self.filename = os.path.join(LOGS_PATH, datetime.now().strftime('%Y_%m_%d_%H')+'.log')
        self.output_file = open(self.filename, 'a')

    def run(self):
        """
            Thread activity.  Will change filenames when necessary and call the log method to write all the log
            messages to a file
        """
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
        """
           Runs at the end of the logging process.  It will write all the messages from the logQ to the current file
           until the queue is empty and close the file.

        """
        while not self.logQ.empty():
            message = self.logQ.get_nowait()
            self.output_file.write(message)
            self.output_file.flush()
        self.output_file.close()

    def change_files(self, filename):
        """
            Close the current file and create one with the new filename
        Args:
            filename: str. Full path for the new file to be created.  The it will have the following format '%Y_%m_%d_%H.log'

        """
        self.output_file.close()
        self.output_file = open(filename, 'a')

    def log(self):
        """
            Write all the messages from logQ into the current file, but does not close the file.

        """
        while not self.logQ.empty():
            message = self.logQ.get_nowait()
            self.output_file.write(message)
            self.output_file.flush()


class Packet_v11(object):
    """
        Class used to handle the raw data transmitted from the Rhino receiver (Firmware version 1.1) and
        convert it into a packet object that contains all the necessary information as attributes and is easier to
        handle and pass long.

        Each raw packet is 21 bits long (for v1.1) and contains a begin of frame bit, a message identifyer bit (data or
        info), rx_sequence (sequence number assigned at the receiver), data bits (tx_sequence, x, y, z, rssi for data
        packets and rssi, temp, voltage, and sleep_time for info packets) and an end of frame bit.

        tx_sequence is assigned at the Rhino Transmitter.
    Args:
        q_data: struct: raw data packet from Rhino receiver
    """
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
        """
            Convert the reported signal strength to dBs.  This formula was provided by the firmware developer as is.
            In order to conver the signal strength to dB's there needs to be an offset of -72 applied to the
            calculated value.  Ideally, this offset is applied in the Rhino receiver, but if for any reason it is
            not, then it can be applied in this conversion. This rssi_offset is read directly from the configuration
            file and can be found and edited in the acquisition_settings.cfg
        Args:
            rssi_val: int: Signal strength value as reported by the Rhino receiver

        Returns:
            float: Calculated signal strength in dB's

        """
        offset = config.rssi_offset
        if rssi_val >= 128:
            calc_val = ((rssi_val - 256)/2.) - offset
        else:
            calc_val = (rssi_val/2.) - offset
        return calc_val

    def calc_temp_in_c(self, val):
        """
            Converts the temperature value reported by the Rhino receiver to Celsius. This formula was provided by the
            firmware developer as is
        Args:
            val: int: Value representing the board temperature

        Returns:
            float: Calculated board temperature in Celsius

        """
        if val & 0x8000:
            val = val - 0xFFF0
        val = (val >> 4) * 0.0625
        return val

    def calc_batt(self, val):
        """
            Converts the battery level value reported by the Rhino receiver to voltage. This formula was provided by
            the firmware developer as is
        Args:
            val: int: Value representing the battery level

        Returns:
            float: Calculated battery voltage

        """
        val = ((val/4096.)*13.2)  # +0.5
        return round(val, 2)

    def packet_decoder(self, pkt):
        """
            Decodes the raw packet struct into a packet object and sets it's attributes accordingly
        Args:
            pkt: struct: Raw value as transmitted to the edge device by the Rhino Receiver

        """
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


#TODO: Rename Class since it no longer handles files and it only unpacks the information from each raw packet
class FileFlusher(threading.Thread):
    """
        This class will read a raw packet from the serial Q (flushQ), unpack it, and classify it as an info or data
        packet.  If it is a data packet, it will save a dictionary with the decoded packet along with other necessary
        identifying information into a bufferQ for further processing in another thread.  In case of an info packet,
        a message will be displayed in the log display console and the system's temperature, battery level and sleep
        interval will be updated.

    Args:
            flushq: obj: Instance of a Queue.  Contains the raw packets that have been received by the SerialThread
            logQ: obj: Instance of a Queue.  Global variable that is accessed by all threads for logging purposes
            displayQ: obj: Instance of a Queue.  Global variable that is accessed by all threads to display information on the system's log display console.
    """

    def __init__(self, flushq, logQ, displayQ):
        threading.Thread.__init__(self)
        self.daemon = True
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
        """
            This method is run when the first packet of the the acquisition session is received or when the Rhino
            transmitter's clock counter rolls over, and it assigns the packet an epoch timestamp based on the
            system's clock. This timestamp is recorded when the packet is read from the serial queue.  This timestamp
            does not take into account the latency between the packet generation in the Rhino Transmitter and when
            this process takes place.  However, this time offset is negligible for our application.

            A few class variables are updated for subsequent timing calculations.
        Args:
            packet: obj: Instance of class Packet_V11
            timestamp: float: Epoch based timestamp generated when the packet was read from the serial queue
        """
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
        """
            Reads a raw packet from the flushQ (serial queue)
        Returns:
            struct: Raw packet
        """
        return self.flushq.get(False, 0.001)

    def calculate_packet_timestamp(self, packet):
        """
            Receives a packet and calculates the timestamp associated with it based on the sequence number generated
            on the Rhino transmitter.  This method calculates the elapsed_tx_sequences by comparing the system's last
            saved sequence and the current packet's sequence. Ideally only one sequence has elapsed meaning that
            there was no missed packets in the transmission. The current packet's timestamp is calculating by
            multiplying elapsed_tx_sequences by delta_t (this global variable is 1/sampling_rate, 500 ms for a 2000
            Hz sampling rate) and adding that to the system's last saved timestamp.

            Another important aspect of this method is that it updates a flag on each packet to identify if there
            were more than a predetermined number of allowed missing packets in a row.  This flag will be used later
            in the trace processing to select an appropriate interpolation method.

            We know that we are expecting sampling_rate samples per second (usually 2000).  So we can use the
            elapsed_tx_sequences to calculate an index of each packet in the trace.  We use this index instead
            of a simple counter because we have to account for the possibility of missed pakets.  However,
            sometimes that index number can be slightly larger, so we track that surplus of packets in the variable
            offset.  This variable will be used once we change from one second in time to the next to adjust the
            position of the first packet received for the next second.

            Once we reach the expected number of packets per second, we check and adjust for clock drift. Since each
            packet's timestamp is calculated based on the edge device's clock, there is drift associated
            with this calculation.  We have determined an acceptable clock drift. When the calculated drift is
            greater than the pre-established threshold, the current's packet time will not be calculated anymore but
            instead will be set as the system's current time.

            Every time we swithc from one second to the next or there is a clock drift adjustment, a message is
            displayed in the log display console.  The variable counter_changes represents the number of times we
            have switched from one second in time to the next.
        Args:
            packet: obj: Instance of Packet_v11

        Returns:
            obj: Same packet that was received with an updated timestamp

        """
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
        """
            float: Calculated clock drift on the last second in time processed
        """
        return self._drift

    def save_row_to_processing_q(self, packet):
        """
            Saves dictionary with the packet and extra identifiers information to the bufferQ that will be accessed
            by other threads to generate traces
        Args:
            packet: obj. Instance of Packet_v11

        """
        row = {"timestamp": np.float64(self.current_timestamp),
               "packet": packet,
               "sequence": self.sequence,
               "counter_changes": self.counter_changes,
               "serial_number": self.rhino_serial_number}
        self.bufferQ.put(row)

#TODO: Evaluate the need of this event
    def stop(self):
        """
            Intended to trigger an event when the thread is stopped.

        """
        self.stope.set()

    def run(self):
        """
            Thread activity.  It will run the method run_v11

        """
        self.run_v11()

    def run_v11(self):
        """
            Retrieves a packet from the serial q, unpacks it's information and classifies it as a
            data or info packet.  If it is an info packet, the values for current_temperature (degC), current_batt
            (voltage) and sleep_time (sec) will be updated. These values will be used for all subsequent packets
            until a new info message is received.

            if it is a data packet, the timestamp is calculated and saved in a dictionary to a bufferQ for further
            processing on the CollectionDaemonThread.

            This method will log/display a message when the first packet in the acquisition session is received,
            it will ignore duplicated packets (same tx_sequence as previous packet) and will adjust for clock
            rollover (tx_sequence less than previous packet).  Another message will be displayed when the an info
            packet is received.

        """
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
    """
        Dummy class needed only to run acquisition simulations.  It only has one variable, corrupt_packets and it's
        always set at zero.
    """
    def __init__(self):
        self.corrupt_packets = 0


class SerialThread(threading.Thread):
    """
        Class that handles the data transfer from Rhino receiver to the edge device.  Upon starting, the thread will
        send a start_rx command to the Rhino receiver that will enable the data transmission.  It will then
        continuously receive raw packets through the specified serial port, make sure they were not corrupted during the
        transmission and then save them to a flushQ for further processing.

        This thread will look for *pktlen* data chunks and will confirm that the beginning of frame and end of frame
        bits are ``0x002`` and ``0x003`` respectively.  If the size is correct and the expected bits are found,
        the packet is deemed good and saved in the flushQ.  If not, the corrupt_packets property is incremented by one
        and the serial handler will begin  reading one bit at a time until the next ``0x003`` is found.  At this
        point it is assumed that we reached  another end of frame bit and will read another 21 bits assuming that we
        are reading a new packet.  If this  new assumed packet passes the validity test, it is then saved to the
        flusQ and we resume the process  normally.  Otherwise, we return to reading one bit at a time trying to find
        the next end of frame bit until we successfully read a new packet.

        If no data is received through the serial port, the thread will run start_rx and print the message
        *ATEMPTING TO RESTART ACQUISITION* until new data is received.
    Args:
        comport: str: Serial port where the Rhino Receiver is connected to the edge device
        brate: int: Baud rate for the serial port
        pktlen: int: Expected bit size of the packet
        flushq: obj: Instance of a Queue. This is where the raw data packages will be saved
        logQ: obj: Instance of a Queue. This is where all the messages will be saved and then written to a log file
        displayQ: obj: Instance of a Queue. This is where all the messages will be saved and then displayed on the log display console

    Note:
        The *pktlen* and *brate* parameters are read from the config file and can be updated in the
        acquisition_settings.cfg file

    """
    def __init__(self, comport, brate, pktlen, flushq, logQ, displayQ):
        threading.Thread.__init__(self)
        self.daemon = True
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
        """

        Returns:
            obj: instance of a serial port class used for communications between Rhino Receiver and the edge device
        """
        return self.cport

    def start_rx(self):
        """
            Sends a *ready* command to the Rhino receiver to trigger the data transmission to the edge device
        """
        self.cport.write(bytearray("ready\r\n", "utf-8"))

    def stop_rx(self):
        """
            Sends a *stop* command to the Rhino receiver to discontinue the data transmission to the edge device and
            closes the serial port. It also triggers a stop event for the thread
        """
        self.cport.write(bytearray("stop\r\n", "utf-8"))
        self.cport.close()
        self.stope.set()

    def do_stop_cmd(self):
        """
            Sends a *stop* command to the Rhino receiver to discontinue the data transmission to the edge device while
            maintaining the serial port open
        """
        self.cport.write(bytearray("stop\r\n", "utf-8"))

    #TODO: Implement the use of this method
    def restart_rx(self):
        """
            This method is intended to restart the serial port when necessar.  It is not currently being used and
            needs further testing

        """
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
        """

        Returns:
            int: Number of corrupt packets found since the beggingng of the acquisition session
        """
        return self._corrupt_packets

    def run(self):
        """
            Thread activity. Will run the *run_v11* routine
        """
        self.run_v11()

    def run_v11(self):
        """
            This method will look for *pktlen* data chunks and will confirm that the beginning of frame and end of frame
            bits are ``0x002`` and ``0x003`` respectively.  If the size is correct and the expected bits are found,
            the packet is deemed good and saved in the flushQ.  If not, the corrupt_packets property is incremented by one
            and the serial handler will begin  reading one bit at a time until the next ``0x003`` is found.  At this
            point it is assumed that we reached  another end of frame bit and will read another 21 bits assuming that we
            are reading a new packet.  If this  new assumed packet passes the validity test, it is then saved to the
            flusQ and we resume the process  normally.  Otherwise, we return to reading one bit at a time trying to find
            the next end of frame bit until we successfully read a new packet. A message will be displayed showing if
            the corrupt packet found was of the correct expected length or if it was truncated (e.g. loss of
            communication between edge device and rhino receiver during transmission)

            The Rhino firmware is designed so that after an info message the Rhino transmitter will go to sleep for a
            set amount of time and then it will wake up and continue transmitting data.  This method assumes that
            after receiving an info message the transmitter will go to sleep and will set the rhino acquisition
            system's transmission status as sleeping (tx_status = 0).  Once a new data packet is received,
            the status will be changed back to transmitting (tx_status = 1).

            If no data is received through the serial port, the thread will run start_rx and print the message
            *ATEMPTING TO RESTART ACQUISITION* until new data is received.

            Any exception encountered will be diplayed and logged, but the thread will attempt to resume normal
            operations
        """
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
    """
        This thread allows to read a previously recorded raw file (RTR) and stream it's data through the acquisition
        system as if it was recording real time from a rhino sensor.  This is useful to troubleshoot some of the
        rhino data processing tasks or for demonstrations.

        This process will also generate another RTR and RTA files accordingly depending on the settings in the
        configuration file.

        The read packets are then saved into the flushQ so that the remaining threads can be run seamlessly

    Args:
        file_input: str: Path to the RTR file that will be used for the simulation
        file_flusher: obj: Instance of a FileFlusher class
    """
    def __init__(self, file_input, file_flusher):
        threading.Thread.__init__(self)
        self.daemon = True
        self.file_input = file_input
        self.file_flusher = file_flusher
        self.h5 = H5Helper(h5py.File(file_input, "r"), load_ts=True, load_xyz=True)

    def run(self):
        """
            Thread main activity. Will read a raw RTR file and create a Packet_v11 instance for each row in the file
            and save that packet into the flushQ
        """
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
            self.file_flusher.sequence = seq[index]
            self.file_flusher.save_row_to_processing_q(packet)
        sys.exit(0)

#TODO: Make traces a variable time length
class CollectionDaemonThread(threading.Thread):
    """
        This thread will read raw packets from bufferQ and group them into a trace.  At the moment, each trace is one
        second long.  The thread will calculate the timestamp of the thread based on the timestamp of the initial
        packet received for said trace, calibrate, interpolate, and auto correlate each of the axis components and
        produce the acorr traces.

        The raw packets will be saved into an RTR file without any processing, so that the raw data is always
        available.  A dictionary containig the resulting acorr traces will be saved to tracesQ for further handling
    Args:
        bufferQ: obj. Instance of a Queue.  This is where FileFlusher thread saved the non-corrupt data packets as Packet_v11 objects
        tracesQ: obj. Instance of a Queue. This is where the acorr_traces will be saved as part of a dictionary
        logQ: obj: Instance of a Queue. This is where all the messages will be saved and then written to a log file
        displayQ: obj: Instance of a Queue. This is where all the messages will be saved and then displayed on the log display console

    """
    def __init__(self, bufferQ, tracesQ, logQ, displayQ):
        threading.Thread.__init__(self)
        self.daemon = True
        self.bufferQ = bufferQ
        self.bufferThisSecond = list()
        self.lastSecond = None
        self.tracesQ = tracesQ
        self.logQ = logQ
        self.displayQ = displayQ

    def calculate_initial_tracetime_from_timestamp(self, timestamp):
        """
            Calculates the initial timestamp of a trace based on the timestamp from the first packet recorded for
            said trace.  The initial timestamp is rounded to the closest multiple of *delta_t* (1/*sampling_rate*)
        Args:
            timestamp: float: Epoch timestamp from the first recorded packet of a trace

        Returns:
            float: Trace's initial epoch timestamp rounded to the closest multiple of *delta_t* (1/*sampling_rate*)

        """
        fraction = timestamp - int(timestamp)
        offset = int(fraction / delta_t)
        return timestamp - delta_t * offset

    def run(self):
        """
            Main thread activity. This method will read a packet from the bufferQ and append it to a temporary list,
            *buffer_this_second*.  It will repeat this process until a packet is read and it does not belong to the
            second in time that is being currently being processed.  At this point, the data from
            *buffer_this_second* will be saved into a realtime raw file (RTR.h5).  There is a check to see if the RTR
            file needs to be changed, depending on the length of files pre-established in the configuration file.

            At this point, the data of the each indivivual raw axis (X, Y, Z) is mapped into the desired components,
            *components_to_process* (axial, tangential, radial), will then be calibrated (in reality there is no
            calibration, it is simply transformed from ADC counts to voltage and then G's), interpolated and then auto
            correlated.

            The interpolation process is done in order to ensure that there are always *sampling_rate* samples in
            each trace, no more and no less.  There are two possible types of interpolation performed, quadratic and
            linear;  quadratic interpolation is the default.  However, if there is at least one packet in the trace
            that was labeled as invalid (meaning that between that packet and the previous packet there were more
            than the maximum amount of missing packets in a row permitted), linear interpolation will be used.  The
            interpolation is done at equally spaced samples, 1/*sampling_rate* and beginning at the calculated
            *initial_trace_timestamp*.

            The resulting acorr traces are placed in a dictionary, along with the raw data, trace timestamp,
            original timestamps, interpolated timestamps, health information (battery, rssi, temperature),
            maximum/minimum acceleration for each component, how many seconds have been processed (*counter_changes*),
            edge device's disk usage and the file name where the raw data was saved.  This dictionary is then saved
            in the tracesQ for further processing.

            There is an option that allows the system to remove the acceleration mean for each component prior to
            calculate the maximum/minimum acceleration seen in the trace.  This is used in case there is a DC
            component in the accelerometer.  This does not change the raw data or the interpolated/calibrated data.
            It is only used to calculate the magnitude of the maximum acceleration peak in the trace.

            There is also a messaged logged and display that shows the timestamp of the trace and how many samples
            were received for that particular second in time.
        """
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

                    if not packet.valid_trace:
                        interp_kind = "linear"

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
                            # component_labels = ["axial", "tangential", "radial"]
                            component_labels = config.components_to_process
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
                        interp_kind = "quadratic"
                    self.bufferThisSecond.append(dataframe_row)
                else:
                    # print("collection daemon buffer empty")
                    time.sleep(0.05)
            except AttributeError:
                logger.error("Collection Daemon Exception: {}".format(sys.exc_info()))
                logger.error("WEIRD ERROR TRYING TO APPEND TO BUFFER THIS SECOND AFTER IT WAS CONVERTED TO NUMPY ON "
                             "CLOCK ROLLOVER")
                self.bufferThisSecond = list()
                interp_kind = "quadratic"
            except:
                logger.error("Collection Daemon Exception: {}".format(sys.exc_info()))
                self.bufferThisSecond = list()
                interp_kind = "quadratic"

#TODO: split all of this routine's task into smaller, specific routines
#TODO: move away from reading and writing the numpy file and using a Q instead
def main_run(run=True, **kwargs):
    """
        Main routine of the thread.  It instantiates and runs all the threads associated with the rhino data
        acquisition, handles the plotting of the raw data, displays the messages on the logging console,
        updates the system health indicators in the dashboard, plots the health line charts,  saves the acorr traces
        to a file, and saves the health data to a temporary numpy file (system_health.npy, located in the default
        *RAM_PATH*)

        if the simulation option is not selected, the rhino data acquisition via the serial port will commence.
        Otherwise, a raw RTR file will be read and the data sent upstream the processing.

        All the threads are started in different processors so that they won't interfere with each other.

        To handle all the health plots, all the necessary health indicators are appended to a numpy array every
        second.  This array is stored in a RAM folder as a physical file and is used for the health line charts.

        The signal plots have two components. Both components are configurable via the configuration file.  By
        default the plotter will show the axial component in the main, upper plot and the tangential component in the
        secondary, bottom plot.  The y axis for both plots will be G's and are auto scaled and the x axis represents
        the number of samples.  The data plotted is the interpolated data.  In this section there is also the option
        to remove the mean, in order to center it at the zero axis.  These plots are updated every second.  All the
        configuration settings for the health line charts (warning limits, x/y scale limits, ticks intervals) can be
        set via the *display_settings.cfg* configuration file.  The rhino acquisition GUI needs to be restarted for
        the settings to take effect.

        This routine has a continuous loop in which it reads a trace dictionary from the tracesQ in order to plot and
        display data. There is a timeout of two seconds while retrieving data from the Q.  If the timeout is reached
        and no new data arrived, there is a message displayed in the log display console and and empty row of health
        information is added to the numpy file.

        Any other error will be logged and displayed but the loop will continue to be executed.

        
    Args:
        run: bool. Flag used to determine if the other FileFlusher, CollectionDaemonThread, and LogFileDaemonThread instances need to be started and the threads set to exclusive cpu's
        **args: ArgParser: Contains a *simulation* boolean flag and a *file_input* string.  If the flag is set to true, the system will start in simulation mode and the source file will be read from the *file_input* string
    """

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
    # components = ["axial", "tangential", "radial"]
    components = config.components_to_process
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
            min_axial_acceleration.pop(0)
            min_tangential_acceleration.pop(0)
            if "radial" in config.components_to_process:
                max_radial_acceleration.pop(0)
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
            min_axial_acceleration.append(trace["acceleration"]["axial"]["min"])
            min_tangential_acceleration.append(trace["acceleration"]["tangential"]["min"])
            if "radial" in config.components_to_process:
                max_radial_acceleration.append(trace["acceleration"]["radial"]["max"])
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
    """
        This method will append trace and health data to the RTA file.  It takes the *trace_data* dictionary and
        transforms it into a dataframe.  That dataframe is stored in the *df* attribute of the *trace* object and
        then appended to an h5 file located in *h5f_path*
    Args:
        h5f_path: str: absolute path of the file where data is going to be written
        trace_data: dict: Dictionary with all the trace and health data
        trace: obj: Instance of RawTraceData class.  It is only used to access the
    """
    # pdb.set_trace()
    columns = ["timestamp", "rssi", "batt", "temp", "packets"]

    for component in config.components_to_process:
        columns.append("max_{}_acceleration".format(component))
        columns.append("min_{}_acceleration".format(component))
        columns.append("{}_trace".format(component))

    df = pd.DataFrame(columns=columns)
    axial_calibrated_trace = trace_data["trace_data"]["axial"]["axial_calibrated"]
    tangential_calibrated_trace = trace_data["trace_data"]["tangential"]["tangential_calibrated"]
    df["timestamp"] = trace_data["timestamp"]
    df["rssi"] = trace_data["rssi"]
    df["batt"] = trace_data["batt"]
    df["temp"] = trace_data["temp"]
    df["packets"] = len(axial_calibrated_trace)
    df["max_axial_acceleration"] = np.asarray([np.max(axial_calibrated_trace)],)
    df["max_tangential_acceleration"] = np.asarray([np.max(tangential_calibrated_trace)],)
    df["min_axial_acceleration"] = np.asarray([np.min(axial_calibrated_trace)],)
    df["min_tangential_acceleration"] = np.asarray([np.min(tangential_calibrated_trace)],)
    if "radial" in config.components_to_process:
        radial_calibrated_trace = trace_data["trace_data"]["radial"]["radial_calibrated"]
        df["min_radial_acceleration"] = np.asarray([np.min(radial_calibrated_trace)],)
        df["max_radial_acceleration"] = np.asarray([np.max(radial_calibrated_trace)], )
    for component in config.components_to_process:
        df["{}_trace".format(component)] = list([trace_data["trace_data"][component]["{}_auto_correlated".format(
            component)], ])
    # df["tangential_trace"] = list([trace_data["trace_data"]["tangential"]["tangential_auto_correlated"], ])
    # df["radial_trace"] = list([trace_data["trace_data"]["radial"]["radial_auto_correlated"], ])
    trace.dataframe = df
    trace.realtime_append_to_h5(h5f_path)


def add_empty_health_row_to_Q(rssi, temp, batt, packets, delay, trace_time_array, now_array, system_healthQ,
                              last_tracetime, last_counterchanges, corrupt_packets, tx_status,
                              max_axial_acceleration, min_axial_acceleration, max_tangential_acceleration,
                              min_tangential_acceleration, max_radial_acceleration, min_radial_acceleration,
                              disk_usage, drift_list, current_drift):
    """
        When there is no trace data retrieved for more than two seconds, an empty row of health data will be appended
        to the *system_health_npy* file so that the health line charts reflect the gaps of data.  There are two
        cases when no new trace data is received. The first case is the system should be transmitting data
        (tx_status = 1) but there is a problem with communications or when the rhino transmitter went to sleep
        (tx_status = 0).  In the case where communication was lost, all values appended will be NaNs.  In the case
        where the transmitter is sleeping, the last available values will be appended.
    Args:
        rssi: list: List with rssi values
        temp: list: List with board temperature values
        batt: list: List with battery voltage values
        packets: list: List with number of packets received for that particular trace
        delay: list: List of the plotting delay values
        trace_time_array: list: List of the timestamps of the processed traces
        now_array: list: List of epoch timestamps of every time the health update/plotting is performed
        system_healthQ: queue: Queue where all the health information is stored for access in the histograms plots
        last_tracetime: float: Epoch timestamp of the last trace processed
        last_counterchanges: int: Last valid value of the total number of traces processed
        corrupt_packets: int: Number of corrupt packets found since the start of the acquisition session
        tx_status: int: Expected status of the rhino transmitter. 1 for transmitting and 0 for sleeping
        max_axial_acceleration: list: List with the maximum axial acceleration values recorded
        min_axial_acceleration: list: List with the minimum axial acceleration values recorded
        max_tangential_acceleration: list: List with the maximum tangential acceleration values recorded
        min_tangential_acceleration: list: List with the minimum tangential acceleration values recorded
        max_radial_acceleration: list: List with the maximum radial acceleration values recorded
        min_radial_acceleration: list: List with the minimum radial acceleration values recorded
        disk_usage: list: list: List with the values of percentage of disk usage in the edge device
        drift_list: list: list: List with the values of the calculated drift for each trace
        current_drift: float: Last calculated trace drift value

    """
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
