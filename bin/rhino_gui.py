#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Aug 14 00:58:14 2018

@author: natal
"""

import ConfigParser
from Tkinter import *
import tkFont
import tkFileDialog
from datetime import datetime
import dcrhino3.acquisition.rhino_installation_gui as rig
import dcrhino3.acquisition.update_headers_gui as uhg
import dcrhino3.acquisition.merge_gui as mfg
import calendar,time
import pdb
import os,glob
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.acquisition.constants import DATA_PATH, LOGS_PATH
from subprocess import call
from subprocess import Popen
import signal
import subprocess
import serial
import logging
from dcrhino3.models.metadata import Metadata

if not os.path.exists(LOGS_PATH):
    os.makedirs(LOGS_PATH)

timestamp = datetime.now().strftime('%Y_%m_%d_%H')
logging.basicConfig(filename=os.path.join(LOGS_PATH,"{}_GUI.log".format(timestamp)),level=logging.DEBUG,format='%(asctime)s %(message)s', datefmt='%Y-%m-%d %H:%M:%S')

fname = os.path.join(PATH,"collection_daemon.cfg")
config = ConfigParser.SafeConfigParser()

debug = False

def load_config_file():
    config.read(fname)


class GUI():


    def __init__(self,master):
        row = 0
        self.master = master
        self.playback_daemon_process = None
        self.gps_process = None
        self.acquisition_process = None
        self.prepare_acq_usb_port_process = None
        self.rsync_daemon_process = None
        self.display_daemon_process = None
        self.system_health_process = None

        if config.getboolean("RUNTIME","field_deployment"):
            self.prepare_acq_usb_port()
            #self.gps_daemon()

        self.automatic_acquisition = config.getboolean("RUNTIME","automatic_acquisition")


        default_font = tkFont.nametofont("TkDefaultFont")
        default_font.configure(size=16)
        master.option_add("*Font", default_font)

        master.title("DataCloud Rhino Version 3")
        master.resizable(width=False, height=False)


        # Label(master, text="GPS").grid(row=row)
        # Button(master, text='Stop', command=self.gps_daemon_stop).grid(row=row, column=1, sticky="ew", pady=4)
        # Button(master, text='Restart', command=self.gps_daemon).grid(row=row, column=2, sticky="ew", pady=4)
        # row += 1

        Label(master, text="Rhino Configuration").grid(row=row)
        Button(master, text='Settings', command=self.rhino_installation_settings).grid(row=row, column=1, sticky="ew", pady=4,columnspan=1)
        row+=1

        #Label(master, text="Processisng").grid(row=row)
        #Button(master, text='Settings', command=self.collection_settings).grid(row=row, column=1, sticky=W, pady=4,columnspan=2)
        #row += 1

        Label(master, text="Acquisition").grid(row=row)
        Button(master, text='Go', command=self.acquisition_daemon).grid(row=row, column=1, sticky="ew", pady=4)
        Button(master, text='Stop', command=self.acquisition_daemon_stop).grid(row=row, column=2, sticky="ew", pady=4)
        #Button(master, text='Settings', command=self.real_time_acquisition_settings).grid(row=row, column=3, sticky=W, pady=4)
        row += 1


        Label(master, text="Merge Files").grid(row=row)
        Button(master, text='Go', command=self.merge_files).grid(row=row, column=1, sticky="ew", pady=4)
        #Button(master, text='Settings', command="").grid(row=row, column=2, sticky=W, pady=4)
        row += 1

        Label(master, text="Playback").grid(row=row)
        Button(master, text='Go', command=self.playback_daemon).grid(row=row, column=1, sticky="ew", pady=4)
        Label(master, text="Based on Rhino Configuration Settings", fg="blue").grid(row=row,column=2,columnspan=4)
        row += 1

        Label(master, text="Upload Files").grid(row=row)
        Button(master, text='Go', command=self.rsync_daemon).grid(row=row, column=1, sticky="ew", pady=4)
        Button(master, text='Stop', command=self.rsync_daemon_stop).grid(row=row, column=2, sticky="ew", pady=4)
        row += 1

        Label(master, text="Fix Headers").grid(row=row)
        Button(master, text='Go', command=self.update_h5_headers).grid(row=row, column=1, sticky="ew", pady=4)
        #Button(master, text='Settings', command="").grid(row=row, column=2, sticky=W, pady=4)
        row += 1

        # Label(master, text="Processing Pipeline").grid(row=row)
        # Button(master, text='Go', command=self.processing_pipeline).grid(row=row, column=1, sticky="ew", pady=4)
        # #Button(master, text='Settings', command="").grid(row=row, column=2, sticky=W, pady=4)
        # row += 1
        # Label(master, text="Feature Extract").grid(row=row)
        # Button(master, text='Go', command=self.feature_extract).grid(row=row, column=1, sticky=W, pady=4)
        # Button(master, text='Stop', command=self.feature_extract_stop).grid(row=row, column=2, sticky=W, pady=4)
        # Button(master, text='Settings', command=self.feature_extract_settings).grid(row=row, column=3, sticky=W, pady=4)
        # row += 1
        # Label(master, text="Plot").grid(row=row)
        # Button(master, text='Go', command=self.plot).grid(row=row, column=1, sticky=W, pady=4)
        # row+=1

        Button(master, text='Exit', command=self.exit).grid(row=row, column=1, sticky="ew", pady=4)

        if self.automatic_acquisition:
            self.acquisition_daemon()

        logging.info("GUI Started")


    def acquisition_daemon(self):
        load_config_file()
        if self.acquisition_process == None:
            # self.acquisition_process = Popen(['python', os.path.abspath(os.path.join(PATH,'atexit_test.py'))])
            timestamp = datetime.now().strftime('%Y_%m_%d_%H')
            rhino_version = config.getfloat("COLLECTION","rhino_version")
            acq_script = 'real_time_acquisition_v3.py'
            # if rhino_version == 1.1:
            #     acq_script = 'real_time_acquisition_v3_dev.py'
            # else:
            #     acq_script = 'real_time_acquisition.py'
            health_script = 'system_health_plotter.py'
            if debug:
                self.acquisition_process = Popen(['python', os.path.abspath(os.path.join(PATH,acq_script))])
                self.system_health_process = Popen(['python', os.path.abspath(os.path.join(PATH,health_script))])
                logging.info("Acquisition started in debug mode")
            else:
                self.error_file = os.path.join(LOGS_PATH,"{}.err".format(timestamp))
                with open(self.error_file,"ar",buffering=0) as self.err:
                    self.acquisition_process = Popen(['python', os.path.abspath(os.path.join(PATH,acq_script))],stderr=self.err)
                    self.system_health_process = Popen(['python', os.path.abspath(os.path.join(PATH,health_script))],stderr=self.err)
                logging.info("Acquisition started in regular mode")

            p = subprocess.Popen(['taskset', '-cp','3', str(self.system_health_process.pid) ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    def acquisition_daemon_stop(self):
        # self.acquisition_process.terminate()
        if self.acquisition_process != None:
            if not debug:
                self.err.close()
            self.acquisition_process.terminate()
            self.acquisition_process = None
            self.system_health_process.terminate()
            self.system_health_process = None
            self.stop_rx(True)
            logging.info("Acquisition stopped")
        # else:
        #     self.stop_rx(False)
        #     logging.info("Acquisition stopped but was already stopped")


    def gps_daemon(self):
        if self.gps_process == None:
            cmd = os.path.join(PATH,"startGps.sh")
            #self.gps_process = Popen(args=["gnome-terminal", "--command={}".format(cmd)])
            self.gps_process = Popen(args=["lxterminal", "-e","{}".format(cmd)])
            #print self.gps_process.pid

    def gps_daemon_stop(self):
        #print ("launched")
        if self.gps_process != None:
            #print("about to kill")
            os.system("pkill -f gpsd --signal SIGTERM")
            #os.kill(self.gps_process.pid, signal.SIGTERM)
            #Popen.kill(self.gps_process.pid)
            #self.gps_process.kill()
            self.gps_process = None
        #print("finished")

    def rsync_daemon(self):
        load_config_file()
        m = Metadata(config)
        if self.rsync_daemon_process == None:
            local_folder = config.get("DATA_TRANSMISSION","local_folder")
            remote_folder = os.path.join(config.get("DATA_TRANSMISSION","remote_folder"),m.level_0_path())
            sleep_interval = config.get("DATA_TRANSMISSION","sleep_interval")
            server = config.get("DATA_TRANSMISSION","server")
            cmd = os.path.join(PATH,"sendfiles.sh {} {} {} {}".format(local_folder,server, remote_folder,sleep_interval))
            # print cmd
            self.rsync_daemon_process = Popen(args=["lxterminal", "--command={}".format(cmd)])
            logging.info("Rsync Started")
            #self.rsync_daemon_process = Popen(args=["gnome-terminal", "-e","{}".format(cmd)])
            #print self.gps_process.pid

    def rsync_daemon_stop(self):
        if self.rsync_daemon_process != None:
            #os.kill(self.rsync_daemon_process.pid, signal.SIGTERM)
            os.system("pkill -f sendfiles.sh --signal SIGTERM")
            #self.rsync_daemon_process.kill()
            self.rsync_daemon_process = None
            logging.info("Rsync Stopped")

    def prepare_acq_usb_port(self):
        cmd = os.path.join(PATH,"prepare_acq_port.sh")
        self.prepare_acq_usb_port_process=Popen(cmd,shell=True)
        logging.info("USB Port Permissions Changed")

    def playback_daemon(self):
        load_config_file()
        f = None
        #if self.playback_daemon_process == None:
        f = tkFileDialog.askopenfilename(initialdir = DATA_PATH, defaultextension=".h5")
        if len(f)==0: # asksaveasfile return `None` if dialog closed with "cancel".
            f = None
            return
        fname = f # starts from `1.0`, not `0.0`

        sampling_rate = config.get("COLLECTION","output_sampling_rate")
        show_plots = config.get("PLAYBACK","show_plots")
        #pdb.set_trace()
        #self.playback_daemon_process = Popen(['python', os.path.abspath(os.path.join(PATH,'playback_raw_data.py')),'-source {} -sr {} -plot {}'.format(fname,sampling_rate,show_plots)])
        cmd = "python {} -source {} -sr {} -plot {}".format(os.path.abspath(os.path.join(PATH,'playback_raw_data.py')),fname,sampling_rate,show_plots)
        #self.playback_daemon_process = Popen(['python', os.path.abspath(os.path.join(PATH,'playback_raw_data.py'))])
        print cmd
        self.playback_daemon_process = Popen(cmd,shell=True)
        logging.info("Played back file {}".format(fname))

    def playback_daemon_stop(self):
        if self.playback_daemon_process != None:
            self.playback_daemon_process.terminate()
            self.playback_daemon_process = None

    # def feature_extract(self):
    #     if self.feature_extract_process == None:
    #         self.feature_extract_process = Popen(['python', os.path.abspath(os.path.join(PATH,'feature_extract.py'))])
    #
    # def feature_extract_stop(self):
    #     if self.feature_extract_process != None:
    #         self.feature_extract_process.terminate()
    #         self.feature_extract_process = None



    # def real_time_acquisition_settings(self):
    #     rtas.main()

    def rhino_installation_settings(self):
        rig.main()

    def update_h5_headers(self):
        uhg.main()

    def merge_files(self):
        mfg.main()

    def processing_pipeline(self):
        ppl.main()

    # def feature_extract_settings(self):
    #     fg.main()

    # def collection_settings(self):
    #     cg.main()

    # def plot(self):
    #     plt.main()

    def stop_rx(self,active):
        #pdb.set_trace()
        # pass
        rhino_ttyusb = subprocess.check_output('ls -l /dev/serial/by-id/ | grep "usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_" | grep -Po -- "../../\K\w*"',shell=True)
        rhino_ttyusb = rhino_ttyusb.replace('\n','')
        rhino_port = "/dev/"+rhino_ttyusb
        baud_rate = config.getint("COLLECTION","baud_rate")
        cport = serial.Serial(rhino_port, baud_rate, timeout=1.0)
        cport.write(bytearray("stop\r\n", "utf-8"))
        cport.close()
        logging.info("Serial Port Closed")
        m =  ("{}: SERIAL PORT CLOSED".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")))
        print (m)
        if active:
            m =  ("{}: ACQUISITION STOPPED".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")))
            print (m)


    def exit(self):
        m =  ("{}: GUI EXITED".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")))
        self.acquisition_daemon_stop()
        self.gps_daemon_stop()
        self.playback_daemon_stop()
        self.rsync_daemon_stop()
        self.master.destroy()
        print(m)
        logging.info("GUI Exited")

if __name__ == "__main__":
    try:
        load_config_file()
        master = Tk()
        g = GUI(master)
        master.mainloop()
    except KeyboardInterrupt:
        sys.exit(0)
