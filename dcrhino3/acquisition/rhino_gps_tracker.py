"""
    This is still an experimental thread that is intended to read positional GPS data and save them in an h5 file.
    It hasn't been thoroughly tested and debugged.

    @author: Natal
"""
from gps3 import agps3
import h5py
from dcrhino3.helpers.h5_helper import H5Helper
import threading
import time
import sys
from datetime import datetime
from dcrhino3.acquisition.constants import LOGS_PATH
import os
from dcrhino3.models.config2 import Config
import numpy as np


class RhinoGPSTracker(threading.Thread):
    """
        Thread that will read positional data from GPSd, decode it and save it in an h5 file in the *LOGS_PATH*
        directory.  As of now, the files are changed every hour on the hour.  It saves latitude, longitude,
        altitude and time.
    """
    def __init__(self):
        threading.Thread.__init__(self)
        # self.daemon = True
        self.gps_socket = agps3.GPSDSocket()
        self.data_stream = agps3.DataStream()
        self.gps_socket.connect(host='localhost', port=2947)
        self.gps_socket.watch()
        #self.gps_socket.watch(devicepath="/dev/ttyACM1")
        self.buffer = list()
        self.max_buffer_length = 1
        self.h5_helper = None

    def run(self):
        time_info = None
        time_for_filename = datetime.utcnow()
        file_name = "GPS_{}.h5".format(time_for_filename.strftime("%Y-%m-%d_%H:%M:%S"))
        h5f = h5py.File(os.path.join(LOGS_PATH, file_name), "a")
        self.h5_helper = H5Helper(h5f, config=Config(acquisition_config=True), load_xyz=False, load_ts=False)
        self.h5_helper.save_field_config_to_h5()
        while True:
            try:
                for new_data in self.gps_socket:
                    if new_data:
                        # print(new_data)
                        self.data_stream.unpack(new_data)
                        if self.data_stream.time != 'n/a':
                            if time_info != self.data_stream.time:
                                time_info = self.data_stream.time
                                time_info_obj = datetime.strptime(time_info, "%Y-%m-%dT%H:%M:%S.%fZ")
                                lat = self.data_stream.lat
                                long = self.data_stream.lon
                                alt = self.data_stream.alt
                                row = [time_info_obj.timestamp(), lat, long, alt]
                                print(row)
                                same_file = time_for_filename.hour == time_info_obj.hour
                                if same_file:
                                    if len(self.buffer) < self.max_buffer_length:
                                        self.buffer.append(row)
                                    else:
                                        self.buffer = np.asarray(self.buffer)
                                        self.h5_helper.save_np_array_to_h5_file("time", np.asarray(self.buffer[:, 0],
                                                                                                   dtype=np.float64))
                                        self.h5_helper.save_np_array_to_h5_file("lat", np.asarray(self.buffer[:, 1],
                                                                                                   dtype=np.float32))
                                        self.h5_helper.save_np_array_to_h5_file("long", np.asarray(self.buffer[:, 2],
                                                                                                   dtype=np.float32))
                                        self.h5_helper.save_np_array_to_h5_file("alt", np.asarray(self.buffer[:, 3],
                                                                                                   dtype=np.float32))
                                        self.buffer = list()
                                        self.buffer.append(row)
                                else:
                                    self.buffer = np.asarray(self.buffer)
                                    self.h5_helper.save_np_array_to_h5_file("time", np.asarray(self.buffer[:, 0],
                                                                                               dtype=np.float64))
                                    self.h5_helper.save_np_array_to_h5_file("lat", np.asarray(self.buffer[:, 1],
                                                                                              dtype=np.float32))
                                    self.h5_helper.save_np_array_to_h5_file("long", np.asarray(self.buffer[:, 2],
                                                                                               dtype=np.float32))
                                    self.h5_helper.save_np_array_to_h5_file("alt", np.asarray(self.buffer[:, 3],
                                                                                              dtype=np.float32))
                                    h5f.close()
                                    self.buffer = list()
                                    self.buffer.append(row)
                                    time_for_filename = datetime.utcfromtimestamp(time_info_obj.timestamp())
                                    file_name = "GPS_{}.h5".format(time_for_filename.strftime("%Y-%m-%d_%H:%M:%S"))
                                    h5f = h5py.File(os.path.join(LOGS_PATH, file_name), "a")
                                    self.h5_helper = H5Helper(h5f, config=Config(acquisition_config=True), load_xyz=False, load_ts=False)
                                    self.h5_helper.save_field_config_to_h5()
                        else:
                            print(self.data_stream.time)

            except:
                print("Rhino GPS Tracker Error: {}".format(sys.exc_info()))
                time.sleep(1)



if __name__ == "__main__":
    try:
        tracker = RhinoGPSTracker()
        tracker.start()
    except:
        pass
