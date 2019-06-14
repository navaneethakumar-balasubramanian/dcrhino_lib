import threading
import pyudev
import os
import urllib2
import time
import sys
from gps3 import gps3


class NetworkThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self._network_status = "No Connection"
        # self._counter = 0

    def run(self):
        while True:
            try:
                # self._counter += 1
                urllib2.urlopen('http://www.google.com', timeout=1)
                self._network_status = "OK"
            except urllib2.URLError as err:
                self._network_status = "No Connection"
            time.sleep(1)

    @property
    def network_status(self):
        return self._network_status


class GPSThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.gps_socket = gps3.GPSDSocket()
        self.data_stream = gps3.DataStream()
        self.gps_socket.connect()
        self.gps_socket.watch(devicepath="/dev/ttyACM0")
        self._satellite_count = 0
        # self._counter = 0

    def run(self):
        try:
            for new_data in self.gps_socket:
                if new_data:
                    # self._counter += 1
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


if __name__ == "__main__":
    network = NetworkThread()
    network.start()

    gps = GPSThread()
    gps.start()

    while True:
        print network.network_status,network._counter,  gps.satellite_count, gps._counter
        time.sleep(1)