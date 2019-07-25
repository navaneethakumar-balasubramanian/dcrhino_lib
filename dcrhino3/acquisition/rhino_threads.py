import threading
from urllib2 import urlopen, URLError
# from urllib.request import urlopen, URLError
import time
import sys
from gps3 import gps3
import pyudev
import subprocess
# from dcrhino3.acquisition.external.dimmer import dimmer
import Queue
from bin.ide2h5 import ideExport, SimpleUpdater
import dcrhino3.ide_utilities.path_manager as pm
import dcrhino3.ide_utilities.data_formats as df
from dcrhino3.acquisition.constants import ACQUISITION_PATH
import os
import ConfigParser
from dcrhino3.helpers.general_helper_functions import init_logging, init_logging_to_file
dc_logger = init_logging(__name__)
dc_file_logger = init_logging_to_file(__name__)


class NetworkThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self._network_status = "No Connection"
        # self._counter = 0

    def run(self):
        while True:
            try:
                # self._counter += 1
                urlopen('http://www.google.com', timeout=1)
                self._network_status = "OK"
            except URLError as err:
                self._network_status = "No Connection"
            time.sleep(10)

    @property
    def network_status(self):
        return self._network_status


class GPSThread(threading.Thread):
    def __init__(self, ignore_gpsd):
        threading.Thread.__init__(self)
        self._ignore_gpsd = ignore_gpsd
        if not ignore_gpsd:
            self.gps_socket = gps3.GPSDSocket()
            self.data_stream = gps3.DataStream()
            self.gps_socket.connect()
            self.gps_socket.watch(devicepath="/dev/ttyACM0")
            self._satellite_count = 0
        else:
            self._satellite_count = "GPS OFF"

    def run(self):
        if not self._ignore_gpsd:
            try:
                for new_data in self.gps_socket:
                    if new_data:
                        self.data_stream.unpack(new_data)
                        if self.data_stream.SKY['satellites'] == "n/a":
                            self._satellite_count = 0
                        else:
                            self._satellite_count = len(self.data_stream.SKY['satellites'])
            except:
                self._satellite_count = sys.exc_info()

    @property
    def satellite_count(self):
        return self._satellite_count


class USBportThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.context = pyudev.Context()
        self.monitor = pyudev.Monitor.from_netlink(self.context)
        self.monitor.filter_by(subsystem='usb')
        self.rhino_disconnected = False
        self.rhino_port = None

    def run(self):
        while True:
            try:
                for device in iter(self.monitor.poll, None):
                    if device.sys_number =="0":
                        if device.action == 'add':
                            print('{} connected'.format(device))
                            time.sleep(1)
                        elif device.action == "remove":
                            print('{} disconnected'.format(device))
                        rhino_ttyusb = subprocess.check_output(
                            'ls -l /dev/serial/by-id/ | grep "usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_" | grep -Po -- "../../\K\w*"',
                            shell=True)
                        rhino_ttyusb = rhino_ttyusb.replace('\n', '')
                        rhino_port = "/dev/" + rhino_ttyusb
                        self.rhino_disconnected = False
                        self.rhino_port = rhino_port
                        print(self.rhino_port)
            except:
                self.rhino_disconnected = True
                print(sys.exc_info())

# class DimmerThread(threading.Thread):
#     def __init__(self):
#         threading.Thread.__init__(self)
#
#     def run(self):
#         dimmer.main()


class IDEConverterThread(threading.Thread):
    def __init__(self, global_config):
        threading.Thread.__init__(self)
        self.files_q = Queue.Queue()
        self.global_config = global_config
        thread = threading.Thread(target=self.run, args=())
        thread.daemon = True
        thread.start()

    def add_file_to_q(self, file_name):
        self.files_q.put(file_name)

    def run(self):
        updater = SimpleUpdater()
        df.initBivariates(True)
        config = ConfigParser.ConfigParser()
        to_convert = list()
        while True:
            if not self.files_q.empty():
                next_file = self.files_q.get()
                dc_logger.info("ABOUT TO CONVERT FILE {}".format(next_file))
                source_file = pm.FileObject(next_file)
                updater.precision = max(0, min(2, (len(next_file) / 2) - 1))
                updater(starting=True)
                channel_list = self.global_config.ide_channel_list_to_convert_realtime
                resampling_rate = self.global_config.output_sampling_rate
                time_offset = self.global_config.ide2h5_converter_time_offset
                max_file_size_in_sec = self.global_config.file_change_interval_in_min * 60
                config.read(os.path.join(ACQUISITION_PATH, "collection_daemon.cfg"))
                try:
                    numSamples, file_Rhino = ideExport(source_file,
                                                       channels=channel_list,
                                                       resampling_rate=resampling_rate,
                                                       config=config,
                                                       time_offset=time_offset,
                                                       max_file_size_in_sec=max_file_size_in_sec,
                                                       updater=updater)
                except:
                    self.files_q.put(next_file)
                    time.sleep(0.1)
            else:
                time.sleep(10)


# if __name__ == "__main__":
    # network = NetworkThread()
    # network.start()
    #
    # gps = GPSThread()
    # gps.start()
    #
    # usb_port = USBportThread()
    # usb_port.start()

    # dim = DimmerThread()
    # dim.start()

    # while True:
    #     # print network.network_status,network._counter,  gps.satellite_count, gps._counter
    #     time.sleep(1)