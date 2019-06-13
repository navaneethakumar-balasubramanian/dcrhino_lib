import threading
import pyudev
import os
import time


class NetworkThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self._network_status = "No Connection"

    def run(self):
        while True:
            try:
                hostname = "google.com"  # example
                response = os.system("ping -c 1 " + hostname)
                # and then check the response...
                if response == 0:
                    self._network_status = "OK"
                else:
                    self._network_status = "No Connection"
            except:
                self._network_status = "Unknown"
            time.sleep(1)

    @property
    def network_status(self):
        return self._network_status
