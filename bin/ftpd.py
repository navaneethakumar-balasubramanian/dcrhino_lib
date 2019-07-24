#!/usr/bin/python3
import os
import socket
import json
from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
from dcrhino3.models.config import Config
from dcrhino3.acquisition.rhino_threads import IDEConverterThread

global_config = Config(acquisition_config=True)
ide_converter_thread = IDEConverterThread()
ide_converter_thread.start()


class ESPHandler(FTPHandler):
    """FTP Handler with some preconfiguration, and behavior to stop the server after a certain number of files are xferred"""
    # Set some defaults for our specific use case
    authorizer = DummyAuthorizer()
    # Define an anonymous user with write-only perms
    authorizer.add_anonymous(os.getcwd(), perm='w')
    banner = "pyftpdlib based ftpd ready."

    def set_total_files(self, files):
        print("Self: %s"%self)
        self.total_files = files

    def on_file_received(self, file):
        """Use total_files state variable in server and close after we get all of the files we are expecting"""
        # If total_files doesn't exist, behave as if it is the ignored value -1
        total_files = getattr(self.server, "total_files", None)
        if total_files:
            self.server.total_files -= 1
            if self.server.total_files == 0:
                self.server.close()
        self.ide_converter_thread.add_file_to_q(file)


def ESP_FTPD_serve_forever(address, count):
    handler = ESPHandler
    with FTPServer(address, handler) as server:
        server.serve_forever()

if __name__ == "__main__":
    # Instantiate FTP server class and listen on 10.0.5.5:2121
    print("Saving files to: {}".format(os.getcwd()))
    address = ('10.0.5.188', 2121)

    ESP_FTPD_serve_forever(address, 2)