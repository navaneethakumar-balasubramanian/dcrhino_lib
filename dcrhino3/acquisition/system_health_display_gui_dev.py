import ConfigParser
from Tkinter import *
from datetime import datetime
import os, sys
import time
from math import ceil
import numpy as np
import psutil
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.acquisition.constants import LOGS_PATH
from gps3 import gps3
import json
import urllib2
cfg_fname = os.path.join(PATH, "collection_daemon.cfg")
import math


config = ConfigParser.SafeConfigParser()
config.read(cfg_fname)

rhino_version = config.getfloat("COLLECTION", "rhino_version")

class SystemHealthLogger():
    def __init__(self):
        self.filename = ""
        self.output_file = None

    def change_files(self, filename):
        if self.output_file is not None:
            self.output_file.close()
        self.output_file = open(filename, 'ar', buffering=0)

    def log(self, message):
        #  pdb.set_trace()
        filename = os.path.join(LOGS_PATH, datetime.now().strftime('%Y_%m_%d_%H')+'_health.log')
        # print(self.filename,filename)
        if self.filename != filename:
            self.change_files(filename)
        message = ",".join([str(x) for x in message])
        message += "\n"
        self.output_file.write(message)
        self.output_file.flush()

class GUI():
    def __init__(self, displayQ, system_healthQ):
        self.master = Tk()
        self.master.title("DataCloud Rhino System Health")
        self.master.option_add("*Font", "TkDefaultFont 16")
        self.master.protocol("WM_DELETE_WINDOW", self.do_nothing)
        self.displayQ = displayQ
        self.system_healthQ = system_healthQ
        self.initialization_time = int(time.time())
        self.system_health_logger = SystemHealthLogger()
        self.corrupt_packets = 0
        self.drift = 0
        self.gps_socket = gps3.GPSDSocket()
        self.data_stream = gps3.DataStream()
        self.gps_socket.connect()
        self.gps_socket.watch(devicepath="/dev/ttyACM0")

        column_span = 7

        row = 0
        column = 7
        Label(self.master, text="Realtime Log Display").grid(row=row)
        self.display = Text(self.master, width=60, height=60)
        self.display.grid(row=row, columnspan=6, rowspan=30, column=1)

        Label(self.master, text="Current UTC Time").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.utc_time = StringVar(self.master)
        self.time_label = Label(self.master, textvariable=self.utc_time)
        self.time_label.config(bg="#deebf7")
        self.time_label.grid(row=row, column=column, sticky="news", columnspan=column_span)
        row += 1

        Label(self.master, text="Rhino Version").grid(row=row, column=7, columnspan=column_span)
        row += 1
        self.rhino_version = StringVar(self.master)
        self.rhino_version.set(config.get("COLLECTION", "rhino_version"))
        self.rhino_version_label = Label(self.master, textvariable=self.rhino_version)
        self.rhino_version_label.config(bg="#deebf7")
        self.rhino_version_label.grid(row=row, column=column, sticky="news", columnspan=column_span)
        row += 1

        column_span = 3

        Label(self.master, text="Transmitter Status").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.tx_status = StringVar(self.master)
        self.tx_status_label = Label(self.master, textvariable=self.tx_status)
        self.tx_status_label.grid(row=row, column=7, sticky="news", columnspan=column_span)
        row += 1

        Label(self.master, text="Acceleration Status").grid(row=row, column=column, columnspan=column_span)
        row += 1
        Label(self.master, text="A").grid(row=row, column=column, sticky="news")
        Label(self.master, text="T").grid(row=row, column=column + 1, sticky="news")
        Label(self.master, text="R").grid(row=row, column=column + 2, sticky="news")
        row += 1
        self.a_accel = StringVar(self.master)
        self.a_accel_label = Label(self.master, textvariable=self.a_accel)
        self.a_accel_label.grid(row=row, column=column, sticky="news")
        self.t_accel = StringVar(self.master)
        self.t_accel_label = Label(self.master, textvariable=self.t_accel)
        self.t_accel_label.grid(row=row, column=column + 1, sticky="news")
        self.r_accel = StringVar(self.master)
        self.r_accel_label = Label(self.master, textvariable=self.r_accel)
        self.r_accel_label.grid(row=row, column=column + 2, sticky="news")

        row += 1

        self.battery_plot_display_percentage = config.getboolean("SYSTEM_HEALTH_PLOTS",
                                                                 "battery_plot_display_percentage")
        if self.battery_plot_display_percentage:
            Label(self.master, text="Battery Percentage").grid(row=row, column=column, columnspan=column_span)
        else:
            Label(self.master, text="Battery Voltage").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.battery_life = StringVar(self.master)
        self.battery_label = Label(self.master, textvariable=self.battery_life)
        self.battery_label.grid(row=row, column=7, sticky="news", columnspan=column_span)
        row += 1

        Label(self.master, text="Board Temperature").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.board_temperature = StringVar(self.master)
        self.temperature_label = Label(self.master, textvariable=self.board_temperature)
        self.temperature_label.grid(row=row, column=column, sticky="news", columnspan=column_span)
        row += 1

        Label(self.master, text="RSSI").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.rssi = StringVar(self.master)
        self.rssi_label = Label(self.master, textvariable=self.rssi)
        self.rssi_label.grid(row=row, column=column, sticky="news", columnspan=column_span)
        row += 1

        Label(self.master, text="Sample Count").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.sample_count = StringVar(self.master)
        self.samples_label = Label(self.master, textvariable=self.sample_count)
        self.samples_label.grid(row=row, column=column, sticky="news", columnspan=column_span)
        row += 1

        Label(self.master, text="Plotting Delay").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.delay = StringVar(self.master)
        self.delay_label = Label(self.master, textvariable=self.delay)
        self.delay_label.grid(row=row, column=column, sticky="news", columnspan=column_span)
        row += 1

        Label(self.master, text="Acquired Seconds").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.acq_time = StringVar(self.master)
        self.elapsed_label = Label(self.master, textvariable=self.acq_time)
        self.elapsed_label.grid(row=row, column=column, sticky="news", columnspan=column_span)
        self.elapsed_label.config(bg="#deebf7")
        row += 1

        Label(self.master, text="System Up Time").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.sys_up_time = StringVar(self.master)
        self.sys_up_label = Label(self.master, textvariable=self.sys_up_time)
        self.sys_up_label.grid(row=row, column=column, sticky="news", columnspan=column_span)
        self.sys_up_label.config(bg="#deebf7")
        row += 1

        Label(self.master, text="Corrupt Packets").grid(row=row, column=7, columnspan=column_span)
        row += 1
        self.corrupt_packets_var = StringVar(self.master)
        self.corrupt_packets_label = Label(self.master, textvariable=self.corrupt_packets_var)
        self.corrupt_packets_label.grid(row=row, column=column, sticky="news", columnspan=column_span)
        self.corrupt_packets_label.config(bg="#deebf7")
        row += 1

        column = 10
        row = 4
        column_span = 4
        Label(self.master, text="Tablet Temperature").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.package_temp_var = StringVar(self.master)
        self.package_temp = Label(self.master, textvar=self.package_temp_var)
        self.package_temp.grid(row=row, column=column, columnspan=1)
        self.core1_temp_var = StringVar(self.master)
        self.core1_temp = Label(self.master, textvar=self.core1_temp_var)
        self.core1_temp.grid(row=row, column=column + 1, columnspan=1)
        self.core2_temp_var = StringVar(self.master)
        self.core2_temp = Label(self.master, textvar=self.core2_temp_var)
        self.core2_temp.grid(row=row, column=column + 2, columnspan=1)
        row += 1
        Label(self.master, text="CPU Usage").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.cpu1_usage_var = StringVar(self.master)
        self.cpu1_usage = Label(self.master, textvar=self.cpu1_usage_var)
        self.cpu1_usage.grid(row=row, column=column, columnspan=1)
        self.cpu2_usage_var = StringVar(self.master)
        self.cpu2_usage = Label(self.master, textvar=self.cpu2_usage_var)
        self.cpu2_usage.grid(row=row, column=column + 2, columnspan=1)
        row += 1
        self.cpu3_usage_var = StringVar(self.master)
        self.cpu3_usage = Label(self.master, textvar=self.cpu3_usage_var)
        self.cpu3_usage.grid(row=row, column=column, columnspan=1)
        self.cpu4_usage_var = StringVar(self.master)
        self.cpu4_usage = Label(self.master, textvar=self.cpu4_usage_var)
        self.cpu4_usage.grid(row=row, column=column + 2, columnspan=1)
        row += 1
        Label(self.master, text="GPS Connection").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.gps_var = StringVar(self.master)
        self.gps = Label(self.master, textvar=self.gps_var)
        self.gps.grid(row=row, column=column, columnspan=column_span)
        row += 1
        Label(self.master, text="Network Connection").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.network_var = StringVar(self.master)
        self.network = Label(self.master, textvar=self.network_var)
        self.network.grid(row=row, column=column, columnspan=column_span)
        row += 1
        Label(self.master, text="Tablet Battery").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.tablet_batt_percentage_var = StringVar(self.master)
        self.tablet_batt_percentage = Label(self.master, textvar=self.tablet_batt_percentage_var)
        self.tablet_batt_percentage.grid(row=row, column=column, columnspan=1)
        self.tablet_batt_status_var = StringVar(self.master)
        self.tablet_batt_status = Label(self.master, textvar=self.tablet_batt_status_var)
        self.tablet_batt_status.grid(row=row, column=column+1, columnspan=1)
        self.tablet_batt_life_var = StringVar(self.master)
        self.tablet_batt_life = Label(self.master, textvar=self.tablet_batt_life_var)
        self.tablet_batt_life.grid(row=row, column=column+2, columnspan=1)
        row += 1
        Label(self.master, text="Disk Usage").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.disk_usage_var = StringVar(self.master)
        self.disk_usage = Label(self.master, textvar=self.disk_usage_var)
        self.disk_usage.grid(row=row, column=column, columnspan=column_span)
        row += 1
        Label(self.master, text="Ram Usage").grid(row=row, column=column, columnspan=column_span)
        row += 1
        self.ram_usage_var = StringVar(self.master)
        self.ram_usage = Label(self.master, textvar=self.ram_usage_var)
        self.ram_usage.grid(row=row, column=column, columnspan=column_span)
        row += 1

        for i in range(100):
            self.master.grid_columnconfigure(i, weight=1)
            self.master.grid_rowconfigure(i, weight=1)

    def print_line(self):
        while not self.displayQ.empty():
            line = self.displayQ.get_nowait()
            line_components = line.split(",")
            if len(line_components) == 5 and 'Changed' in line_components[0]:
                self.drift = float(line_components[3])
                # print("Drift", self.drift)
            self.display.insert(END, line)
            self.display.see("end")
        lines = int(self.display.index('end-1c').split('.')[0])
        #TODO:select the number of lines to display from config file
        max_lines = 1000
        if lines >= max_lines:
            end = float(lines-max_lines+1)
            self.display.delete(1.0,end)
        self.master.update()

    def update_system_health(self):
        #Structure of system_healthQ = [0=rssi,1=packets,2=delay,3=temp,4=batt,5=counterchanges,6=tracetime])
        try:
            while not self.system_healthQ.empty():
                health = self.system_healthQ.get_nowait()
                # pdb.set_trace()
                self.utc_time.set(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))


                battery = round(health[4][-1],2)
                #battery = 20
                if self.battery_plot_display_percentage:
                    self.battery_life.set("{} %".format(self.calculate_battery_percentage(battery)))
                    bgcolor, fgcolor = self.colors("battery", self.calculate_battery_percentage(battery))
                else:
                    self.battery_life.set("{} V".format(battery))
                    bgcolor,fgcolor = self.colors("battery", battery)
                self.battery_label.config(bg=bgcolor,fg=fgcolor)

                temp = round(health[3][-1],2)
                #temp = 72
                bgcolor,fgcolor = self.colors("temperature",temp)
                self.board_temperature.set("{} degC".format(temp))
                self.temperature_label.config(bg=bgcolor,fg=fgcolor)

                rssi = round(health[0][-1],2)
                #rssi = -73
                bgcolor,fgcolor = self.colors("rssi",rssi)
                self.rssi.set("{} dB".format(rssi))
                self.rssi_label.config(bg=bgcolor,fg=fgcolor)

                samples = health[1][-1]
                #samples = 2700
                bgcolor,fgcolor = self.colors("samples",samples)
                self.sample_count.set(str(samples))
                self.samples_label.config(bg=bgcolor,fg=fgcolor)

                delay = round(health[2][-1],2)
                # print ("Delay", delay)
                calculated_delay = delay + self.drift
                # print ("Delay + Drift", delay)
                #delay = 3
                bgcolor,fgcolor = self.colors("delay", calculated_delay)
                self.delay.set("{} sec".format(calculated_delay))
                self.delay_label.config(bg=bgcolor,fg=fgcolor)

                counter_changes = health[5]
                self.acq_time.set("{} sec".format(counter_changes))
                up_time = int(ceil(time.time()-self.initialization_time))
                self.sys_up_time.set("{} sec".format(up_time))

                self.corrupt_packets = health[9]
                self.corrupt_packets_var.set(str(self.corrupt_packets))

                tx_status = health[10]

                if tx_status == 1:
                    bgcolor,fgcolor = self.colors("transmitter",1)
                    self.tx_status.set("TRANSMITTING")
                    self.tx_status_label.config(bg="green",fg="white")
                elif tx_status == 0:
                    bgcolor,fgcolor = self.colors("transmitter",0)
                    self.tx_status.set("SLEEPING")
                    self.tx_status_label.config(bg="black",fg="green")
                else:
                    self.tx_status.set("NFC")
                    self.tx_status_label.config(bg="red", fg="black")

                tracetime = health[6]

                disk_usage = psutil.disk_usage("/")[3]
                ram_usage = psutil.virtual_memory()[2]
                tablet_temperature = ":".join(str(x.current) for x in psutil.sensors_temperatures()["coretemp"])
                if psutil.sensors_battery()[2]:
                    tablet_battery_status = 1
                    self.tablet_batt_status_var.set("PLUGGED")
                else:
                    tablet_battery_status = 0
                    self.tablet_batt_status_var.set("UNPLUGGED")
                tablet_battery_percentage = round(psutil.sensors_battery()[0], 2)
                tablet_battery_life = psutil.sensors_battery()[1]
                tablet_cpu_usage = ":".join([str(x) for x in psutil.cpu_percent(percpu=True)])

                self.disk_usage_var.set(disk_usage)
                self.ram_usage_var.set(ram_usage)
                self.gps_var.set(self.poll_gps())
                self.package_temp_var.set(tablet_temperature.split(":")[0])
                self.core1_temp_var.set(tablet_temperature.split(":")[1])
                self.core2_temp_var.set(tablet_temperature.split(":")[2])
                self.cpu1_usage_var.set(tablet_cpu_usage.split(":")[0])
                self.cpu2_usage_var.set(tablet_cpu_usage.split(":")[1])
                self.cpu3_usage_var.set(tablet_cpu_usage.split(":")[2])
                self.cpu4_usage_var.set(tablet_cpu_usage.split(":")[3])
                self.tablet_batt_life_var.set(tablet_battery_life)
                self.tablet_batt_percentage_var.set(tablet_battery_percentage)
                self.network_var.set(self.internet_on())


                line = [tracetime.strftime("%Y-%m-%d %H:%M:%S"), samples, battery, temp, rssi, delay, counter_changes,
                        self.corrupt_packets, tx_status, self.drift, calculated_delay, disk_usage, ram_usage,
                        tablet_temperature, tablet_battery_status, tablet_battery_percentage, tablet_battery_life,
                        tablet_cpu_usage]

                self.system_health_logger.log(line)

                if rhino_version == 1.0:
                    self.disable_element(self.rssi_label)
                    self.disable_element(self.temperature_label)
                    self.disable_element(self.battery_label)

                axial_accel = np.max([health[11][-1], health[12][-1]*-1])
                # delay = 3
                bgcolor, fgcolor = self.colors("accel", axial_accel)
                if not np.isnan(axial_accel):
                    self.a_accel.set("{}".format(int(ceil(axial_accel))))
                self.a_accel_label.config(bg=bgcolor, fg=fgcolor)

                tangential_accel = np.max([health[13][-1], health[14][-1]*-1])
                # delay = 3
                bgcolor, fgcolor = self.colors("accel", tangential_accel)
                if not np.isnan(tangential_accel):
                    self.t_accel.set("{}".format(int(ceil(tangential_accel))))
                self.t_accel_label.config(bg=bgcolor, fg=fgcolor)

                radial_accel = np.max([health[15][-1], health[16][-1]*-1])
                # delay = 3
                bgcolor, fgcolor = self.colors("accel", radial_accel)
                if not np.isnan(radial_accel):
                    self.r_accel.set("{}".format(int(ceil(radial_accel))))
                self.r_accel_label.config(bg=bgcolor, fg=fgcolor)

                self.master.update()
        except:
            print("System Health Display GUI")
            print(sys.exc_info())
            # pdb.set_trace()

    def disable_element(self, element):
        element.config(bg="gray",fg="gray")

    def do_nothing(self):
        pass

    def poll_gps(self):
        self.gps_socket.send('?POLL;')
        response = self.gps_socket.next()
        try:
            if response:
                json_gps = json.loads(response)
                if json_gps["class"] == "POLL":
                    return len(json_gps["sky"][0]["satellites"])
            return np.nan
        except:
            return np.nan
        return 1

    def colors(self, component, value):

        if self.tx_status.get() == "TRANSMITTING" and not math.isnan(value):
            greater = True
            method = "normal"
            upper_limit_2 = None
            lower_limit_2 = None
            if component == "battery":
                upper_limit = config.getfloat("SYSTEM_HEALTH_PLOTS","battery_upper_limit")
                lower_limit = config.getfloat("SYSTEM_HEALTH_PLOTS","battery_lower_limit")
            elif component == "rssi":
                upper_limit = config.getfloat("SYSTEM_HEALTH_PLOTS","rssi_upper_limit")
                lower_limit = config.getfloat("SYSTEM_HEALTH_PLOTS","rssi_lower_limit")
            elif component == "temperature":
                # greater = False
                method="both"
                upper_limit = config.getfloat("SYSTEM_HEALTH_PLOTS","temp_positive_upper_limit")
                lower_limit = config.getfloat("SYSTEM_HEALTH_PLOTS","temp_positive_lower_limit")
                upper_limit_2 = config.getfloat("SYSTEM_HEALTH_PLOTS","temp_negative_upper_limit")
                lower_limit_2 = config.getfloat("SYSTEM_HEALTH_PLOTS","temp_negative_lower_limit")
            elif component == "delay":
                # greater = False
                method="inverted"
                upper_limit = config.getfloat("SYSTEM_HEALTH_PLOTS","delay_upper_limit")
                lower_limit = config.getfloat("SYSTEM_HEALTH_PLOTS","delay_lower_limit")
            elif component == "samples":
                #greater = False
                upper_limit = config.getfloat("SYSTEM_HEALTH_PLOTS","packets_upper_limit")
                lower_limit = config.getfloat("SYSTEM_HEALTH_PLOTS","packets_lower_limit")
            elif component == "transmitter":
                upper_limit = 0
                lower_limit = 0
            elif component == "accel":
                method = "contained"
                upper_limit = config.getfloat("INSTALLATION","sensor_saturation_g")
                lower_limit = -config.getfloat("INSTALLATION","sensor_saturation_g")

            if method=="normal":
                if value >= upper_limit:
                    bgcolor = "green"
                    fgcolor = "white"
                elif value >= lower_limit and value < upper_limit:
                    bgcolor = "yellow"
                    fgcolor = "black"
                else:
                    bgcolor = "red"
                    fgcolor = "black"
            elif method == "contained":
                if value <= upper_limit and value >= lower_limit:
                    bgcolor = "green"
                    fgcolor = "white"
                else:
                    bgcolor = "red"
                    fgcolor = "black"
            elif method=="inverted":
                if value <= lower_limit:
                    bgcolor = "green"
                    fgcolor = "white"
                elif value <= upper_limit and value > lower_limit:
                    bgcolor = "yellow"
                    fgcolor = "black"
                else:
                    bgcolor = "red"
                    fgcolor = "black"
            elif method =="both":
                if value >= upper_limit or value <= lower_limit_2:
                    bgcolor = "red"
                    fgcolor = "black"
                elif (value < upper_limit and value >= lower_limit) or (value <= upper_limit_2 and value > lower_limit_2):
                    bgcolor = "yellow"
                    fgcolor = "black"
                else:
                    bgcolor = "green"
                    fgcolor = "white"
        else:
            # pdb.set_trace()
            bgcolor = "black"
            fgcolor = "green"
        return bgcolor,fgcolor

    def calculate_battery_percentage(self, current_voltage):
        battery_max_voltage = config.getfloat("INSTALLATION", "battery_max_voltage")
        battery_lower_limit = config.getfloat("INSTALLATION", "battery_min_voltage")
        value = 100 - (battery_max_voltage - current_voltage) / (battery_max_voltage - battery_lower_limit) * 100
        return round(value, 2)

    def internet_on(self):
        try:
            urllib2.urlopen('http://www.google.com', timeout=1)
            return "OK"
        except urllib2.URLError as err:
            return "No Connection"


def main():
    pass
    #master = Tk()
    #stream = LogFileDaemonThread()
    #master.option_add("*Font", "TkDefaultFont 16")
    #g = GUI(master,displayQ)
    #master.mainloop()


if __name__ == "__main__":
    main()
