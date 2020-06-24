#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""Rhino GUI
Created on Tue Aug 14 00:58:14 2018

User interface to manage the acquisition of Rhino data and transmission to cloud

@author: natal
"""
from tkinter import *
import tkinter.font as tkFont
import tkinter.filedialog as tkFileDialog
from datetime import datetime
import dcrhino3.acquisition.rhino_installation_gui as rig
import dcrhino3.acquisition.update_headers_gui as uhg
import dcrhino3.acquisition.merge_gui as mfg
import os
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.acquisition.constants import DATA_PATH, LOGS_PATH, RAM_PATH
from subprocess import Popen
import shutil
import subprocess
import serial
import logging
import multiprocessing
import glob2
from dcrhino3.models.config2 import Config
from dcrhino3.helpers.general_helper_functions import init_logging, init_logging_to_file
logger = init_logging(__name__)
file_logger = init_logging_to_file(__name__)

if not os.path.exists(LOGS_PATH):
    os.makedirs(LOGS_PATH)

timestamp = datetime.now().strftime('%Y_%m_%d_%H')
# config = Config(acquisition_config=True)
BAUD_RATE = None
LOCAL_FOLDER = None
debug = False

import sys
logger.info("Python version is {}".format(sys.version))

def goodbye():
    """
        Clean-up when the GUI is closed without properly stoping all other subprocesses and using the exit button.  It
        will run stop_rx and finalize the realtime temporary h5 files

    """
    global BAUD_RATE
    stop_rx(True, BAUD_RATE)
    rename_temp_files(LOCAL_FOLDER)

def stop_rx(active, baud_rate):
    """
    Will close the usb serial port and send a command to Rhino receiver to stop sending data to ege device and
    prepares it to listen for a new start_rx command

    Args:
        active: bool:  Represents the active status of data transmission from Rhino receiver and edge device. If true, transmission was active
        baud_rate: int: baud rate of usb serial connection
    """
    try:
        rhino_ttyusb = subprocess.check_output('ls -l /dev/serial/by-id/ | grep "usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_" | grep -Po -- "../../\K\w*"',shell=True)
        rhino_ttyusb = rhino_ttyusb.decode("utf-8")
        rhino_ttyusb = rhino_ttyusb.replace('\n', '')
        rhino_port = "/dev/"+rhino_ttyusb
        baud_rate = baud_rate
        cport = serial.Serial(rhino_port, baud_rate, timeout=1.0)
        cport.write(bytearray("stop\r\n", "utf-8"))
        cport.close()
        logging.info("Serial Port Closed")
        m = ("{}: SERIAL PORT CLOSED".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")))
        logger.info(m)
        if active:
            m = ("{}: ACQUISITION STOPPED".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")))
            logger.info(m)
    except:
        pass

import atexit
atexit.register(goodbye)

def rename_temp_files(data_path):
    """
    Realtime files are saved locally in the Edge device with a tmp extension so that they are not transmitted to the
    cloud until they are finalized.  This methold will rename those files so they are ready to be uploaded.  This
    method is called when the GUI is closed or when there is a filename change based on the file recording length

    Args:
        data_path: str: Path to local directory where files exist
    """
    try:
        temp_files = glob2.glob((os.path.join(data_path, "**", "*.tmp")))
        for file in temp_files:
            if "RTA" in file or "RTR" in file:
                new_name = file.replace(".tmp", ".h5")
                logger.debug("Renaming {} to {}".format(file, new_name))
                shutil.move(file, new_name)
    except:
        pass

class GUI():
    """
    Graphical User Interface that allows creation of the configuration file, start/stop acquisition, upload files to
    the cloud, playback of local files, editing of header information, merging h5 files.  It is built upon the
    tkinter platform
    """

    def __init__(self, master):
        """
        Args:
            master: obj: Instance of tkinter.Tk()
        """
        row = 0
        self.config = Config(acquisition_config=True)
        self.master = master
        self.master.geometry('+%d+%d' % (1300, 870))
        self.playback_daemon_process = None
        self.gps_process = None
        self.acquisition_process = None
        self.prepare_acq_usb_port_process = None
        self.rsync_daemon_process = None
        self.display_daemon_process = None
        self.system_health_process = None
        self.rename_temp_files()
        self.automatic_acquisition = self.config.automatic_acquisition
        self.automatic_upload = self.config.automatic_upload
        self.stop_rx(False)

        global BAUD_RATE, LOCAL_FOLDER
        BAUD_RATE = self.config.baud_rate
        LOCAL_FOLDER = self.config.local_folder
        default_font = tkFont.nametofont("TkDefaultFont")
        default_font.configure(size=16)
        master.option_add("*Font", default_font)
        master.title("DataCloud Rhino Version {}".format(self.config.acquisition_system_version))
        master.resizable(width=False, height=False)
        Label(master, text="Rhino Configuration").grid(row=row)
        Button(master, text='Settings', command=self.rhino_installation_settings).grid(row=row, column=1,
                                                                                       sticky="ew", pady=4,
                                                                                       columnspan=1)
        row += 1

        Label(master, text="Acquisition").grid(row=row)
        Button(master, text='Go', command=self.acquisition_daemon).grid(row=row, column=1, sticky="ew", pady=4)
        Button(master, text='Stop', command=self.acquisition_daemon_stop).grid(row=row, column=2, sticky="ew", pady=4)
        row += 1

        Label(master, text="Merge Files").grid(row=row)
        Button(master, text='Go', command=self.merge_files).grid(row=row, column=1, sticky="ew", pady=4)
        row += 1

        Label(master, text="Playback").grid(row=row)
        Button(master, text='Go', command=self.playback_daemon).grid(row=row, column=1, sticky="ew", pady=4)
        Label(master, text="Based on Rhino Configuration Settings", fg="blue").grid(row=row, column=2, columnspan=4)
        row += 1

        Label(master, text="Upload Files").grid(row=row)
        Button(master, text='Go', command=self.rsync_daemon).grid(row=row, column=1, sticky="ew", pady=4)
        Button(master, text='Stop', command=self.rsync_daemon_stop).grid(row=row, column=2, sticky="ew", pady=4)
        row += 1

        Label(master, text="Fix Headers").grid(row=row)
        Button(master, text='Go', command=self.update_h5_headers).grid(row=row, column=1, sticky="ew", pady=4)
        row += 1

        Button(master, text='Exit', command=self.exit).grid(row=row, column=1, sticky="ew", pady=4)

        if self.automatic_acquisition:
            self.acquisition_daemon()
        if self.automatic_upload:
            self.rsync_daemon()

        logging.info("GUI Started")

    def acquisition_daemon(self):
        """
            Main daemon that controls the data acquisition of rhino data.  It will start the other required
            subprocesses, system_health_plotter, sensor_stats_plotter, and the experimental rhino_gps_tracker.  These
            subprocesses are assigned to different processors to avoid interference with the main acquisition routine.
        """
        # load_config_file()
        if self.acquisition_process is None:
            timestamp = datetime.now().strftime('%Y_%m_%d_%H')
            acq_script = 'real_time_acquisition_v4.py'
            health_script = 'system_health_plotter.py'
            sensor_stats = 'sensor_stats_plotter.py'
            gps_tracker = 'rhino_gps_tracker.py'
            if debug:
                self.acquisition_process = Popen(['python', os.path.abspath(os.path.join(PATH, acq_script))])
                self.system_health_process = Popen(['python', os.path.abspath(os.path.join(PATH, health_script))])
                self.sensor_stats_process = Popen(['python', os.path.abspath(os.path.join(PATH, sensor_stats))])
                logging.info("Acquisition started in debug mode")
            else:
                self.error_file = os.path.join(LOGS_PATH, "{}.err".format(timestamp))
                with open(self.error_file, "a") as self.err:
                    self.acquisition_process = Popen(['python', os.path.abspath(os.path.join(PATH, acq_script))],
                                                     stderr=self.err)
                    self.system_health_process = Popen(['python', os.path.abspath(os.path.join(PATH,
                                                        health_script))], stderr=self.err)
                    self.sensor_stats_process = Popen(['python', os.path.abspath(os.path.join(PATH, sensor_stats))],
                                                      stderr=self.err)
                    self.gps_tracker_process = Popen(['python', os.path.abspath(os.path.join(PATH, gps_tracker))],
                                                      stderr=self.err)
                logging.info("Acquisition started in regular mode")

            processor_number = multiprocessing.cpu_count()-1
            p = subprocess.Popen(['taskset', '-cp', '{}'.format(processor_number),
                                  str(self.system_health_process.pid)],
                                 stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            logging.debug("System Health Plotter Running in processor {} \n".format(processor_number))
            processor_number = multiprocessing.cpu_count() - 2
            p = subprocess.Popen(['taskset', '-cp', '{}'.format(processor_number),
                                  str(self.sensor_stats_process.pid)], stdout=subprocess.PIPE,
                                 stderr=subprocess.PIPE)
            logging.debug("Sensor Stats Plotter Running in processor {} \n".format(processor_number))
            processor_number = multiprocessing.cpu_count() - 2
            p = subprocess.Popen(['taskset', '-cp', '{}'.format(processor_number),
                                  str(self.gps_tracker_process.pid)], stdout=subprocess.PIPE,
                                 stderr=subprocess.PIPE)
            logging.debug("GPS Tracker Running in processor {} \n".format(processor_number))

    def acquisition_daemon_stop(self):
        """
            Terminates the main acquisition process as well as the additional subprocesses
        """
        if self.acquisition_process is not None:
            if not debug:
                self.err.close()
            self.acquisition_process.terminate()
            self.acquisition_process = None
            self.system_health_process.terminate()
            self.system_health_process = None
            self.sensor_stats_process.terminate()
            self.sensor_stats_process = None
            self.gps_tracker_process.terminate()
            self.gps_tracker_process = None
            self.stop_rx(True)
            self.rename_temp_files()
            os.remove(os.path.join(RAM_PATH, "system_health.npy"))
            logging.info("Acquisition stopped")

    def rsync_daemon(self):
        """
            Data transmission daemon.  Will run the shell script 'send_files.sh' enabling an rsync command to upload
            files to the cloud.

            Note:
                All the required control parameters passed to shell script are read directly from the
                configuration file. If there are any changes in the configuration file, the upload process must be
                restarted.  The configuration file where these parameters can be found is
                dcrhino3/acquisition/data_transmission_settings.cfg

            Args:
                  local_folder: str: path to the local folder where the files exist
                  server: str: in the form of user@server.ip.address for rsync connection
                  remote_folder: str: path to the folder in the server where the pre-established folder structure will be created and files uploaded
                  sleep_interval: int: waiting period in seconds between looking for new data after upload has been completed
                  stats_folder: str: path to the local folder where the stats numpy folder is being generated.
        """
        if self.rsync_daemon_process is None:
            local_folder = self.config.local_folder
            remote_folder = os.path.join(self.config.remote_folder, self.config.level_0_path)
            sleep_interval = self.config.sleep_interval
            server = self.config.server
            stats_folder = self.config.stats_folder
            cmd = os.path.join(PATH, "sendfiles.sh {} {} {} {} {}".format(local_folder, server, remote_folder,
                                                                          sleep_interval, stats_folder))
            logging.debug(cmd)
            self.rsync_daemon_process = Popen(args=["lxterminal", "--command={}".format(cmd)])
            logging.info("Rsync Started")

    def rsync_daemon_stop(self):
        """

            Kills the rsync process to stop uploading files to the cloud
        """
        if self.rsync_daemon_process is not None:
            os.system("pkill -f sendfiles.sh --signal SIGTERM")
            self.rsync_daemon_process = None
            logging.info("Rsync Stopped")

    #TODO: Rename because it is not a daemon
    def playback_daemon(self):
        """

            Prompts the file that needs to be played back and runs another python script. This only works for raw
            data (RTR*.h5 files).
        """
        fname = tkFileDialog.askopenfilename(initialdir=DATA_PATH, defaultextension=".h5")
        if fname is None:
            return

        sampling_rate = self.config.output_sampling_rate
        cmd = "python {} -source {} -sr {} -plot True".format(os.path.abspath(os.path.join(PATH,
                                                                                          'playback_raw_data.py')),
                                                              fname, sampling_rate)
        logging.debug(cmd)
        self.playback_daemon_process = Popen(cmd, shell=True)
        logging.info("Played back file {}".format(fname))

    def playback_daemon_stop(self):
        """

            Kill the payback process if there is one active
        """
        if self.playback_daemon_process is not None:
            self.playback_daemon_process.terminate()
            self.playback_daemon_process = None

    def rhino_installation_settings(self):
        """

            Launches the Configuration File GUI
        """
        rig.main(self.config)

    def update_h5_headers(self):
        """

            Launches the Header Updating GUI
        """
        uhg.main(self.config)

    def merge_files(self):
        """

            Launches the File Merging GUI
        """
        mfg.main(self.config)

    def stop_rx(self, active):
        """
            Stops the data transfer from the Rhino receiver to the edge device by calling this module's stop_rx method
        Args:
            active: bool. Represents the active status of data transmission from Rhino receiver and edge device. If true, transmission was active
        """
        stop_rx(active, self.config.baud_rate)

    def rename_temp_files(self):
        """

            Renames temporary rhino files by calling this module's rename_temp_files method
        """
        rename_temp_files(self.config.local_folder)

    def exit(self):
        """


            Clean-up routine executed when the exit button is pressed.  Stops all other subprocesses and closes the
            GUI window.
        """
        m = ("{}: GUI EXITED".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")))
        self.acquisition_daemon_stop()
        self.playback_daemon_stop()
        self.rsync_daemon_stop()
        self.rename_temp_files()
        self.master.destroy()
        logging.info(m)


if __name__ == "__main__":
    try:
        master = Tk()
        g = GUI(master)
        master.mainloop()
    except KeyboardInterrupt:
        sys.exit(0)
