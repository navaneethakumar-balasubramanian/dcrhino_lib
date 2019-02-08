import ConfigParser
from Tkinter import *
#import ttk
import tkFont
from datetime import datetime
import pdb
import os,sys
import Queue
import time
from math import ceil
import pdb
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.acquisition.constants import DATA_PATH, LOGS_PATH
cfg_fname = os.path.join(PATH,"collection_daemon.cfg")


config = ConfigParser.SafeConfigParser()
config.read(cfg_fname)



class SystemHealthLogger():
    def __init__(self):
        self.filename = ""
        self.output_file = None

    def change_files(self,filename):
        if self.output_file != None:
            self.output_file.close()
        self.output_file = open(filename, 'ar', buffering=0)


    def log(self,message):
        #  pdb.set_trace()
        filename = os.path.join(LOGS_PATH,datetime.now().strftime('%Y_%m_%d_%H')+'_health.log')
        # print(self.filename,filename)
        if self.filename != filename:
            self.change_files(filename)
        message = ",".join([str(x) for x in message])
        message += "\n"
        self.output_file.write(message)
        self.output_file.flush()

class GUI():
    def __init__(self,displayQ,system_healthQ):
        self.master = Tk()
        self.master.title("DataCloud Rhino System Health")
        self.master.option_add("*Font", "TkDefaultFont 16")
        self.master.protocol("WM_DELETE_WINDOW", self.do_nothing)
        self.displayQ = displayQ
        self.system_healthQ = system_healthQ
        self.initialization_time = int(time.time())
        self.system_health_logger = SystemHealthLogger()
        self.corrupt_packets = 0

        row = 0
        Label(self.master, text="Realtime Log Display").grid(row=row)
        self.display = Text(self.master,width=60,height=60)
        self.display.grid(row=row,columnspan=6,rowspan=30, column=1)


        Label(self.master, text="Current UTC Time").grid(row=row,column=7)
        row+=1
        self.utc_time = StringVar(self.master)
        self.time_label=Label(self.master, textvariable=self.utc_time)
        self.time_label.config(bg="#deebf7")
        self.time_label.grid(row=row,column=7,sticky="news")
        row+=1
        Label(self.master, text="Rhino Version").grid(row=row,column=7)
        row+=1
        self.rhino_version = StringVar(self.master)
        self.rhino_version.set(config.get("COLLECTION","rhino_version"))
        self.rhino_version_label=Label(self.master, textvariable=self.rhino_version)
        self.rhino_version_label.config(bg="#deebf7")
        self.rhino_version_label.grid(row=row,column=7,sticky="news")
        row+=1
        Label(self.master, text="Transmitter Status").grid(row=row,column=7)
        row+=1
        self.tx_status = StringVar(self.master)
        self.tx_status_label = Label(self.master, textvariable=self.tx_status)
        self.tx_status_label.grid(row=row,column=7,sticky="news")
        row+=1

        self.battery_plot_display_percentage = config.getboolean("SYSTEM_HEALTH_PLOTS","battery_plot_display_percentage")
        if battery_plot_display_percentage:
            Label(self.master, text="Battery Percentage").grid(row=row,column=7)
        else:
            Label(self.master, text="Battery Voltage").grid(row=row,column=7)
        row+=1
        self.battery_life = StringVar(self.master)
        self.battery_label = Label(self.master, textvariable=self.battery_life)
        self.battery_label.grid(row=row,column=7,sticky="news")
        row+=1
        Label(self.master, text="Board Temperature").grid(row=row,column=7)
        row+=1
        self.board_temperature = StringVar(self.master)
        self.temperature_label = Label(self.master, textvariable=self.board_temperature)
        self.temperature_label.grid(row=row,column=7,sticky="news")
        row += 1
        Label(self.master, text="RSSI").grid(row=row,column=7)
        row+=1
        self.rssi = StringVar(self.master)
        self.rssi_label = Label(self.master, textvariable=self.rssi)
        self.rssi_label.grid(row=row,column=7,sticky="news")
        row+=1
        Label(self.master, text="Sample Count").grid(row=row,column=7)
        row+=1
        self.sample_count = StringVar(self.master)
        self.samples_label = Label(self.master, textvariable=self.sample_count)
        self.samples_label.grid(row=row,column=7,sticky="news")
        row+=1
        Label(self.master, text="Plotting Delay").grid(row=row,column=7)
        row+=1
        self.delay = StringVar(self.master)
        self.delay_label = Label(self.master, textvariable=self.delay)
        self.delay_label.grid(row=row,column=7,sticky="news")
        row+=1
        Label(self.master, text="Acquired Seconds").grid(row=row,column=7)
        row+=1
        self.acq_time = StringVar(self.master)
        self.elapsed_label = Label(self.master, textvariable=self.acq_time)
        self.elapsed_label.grid(row=row,column=7,sticky="news")
        self.elapsed_label.config(bg="#deebf7")
        row+=1
        Label(self.master, text="System Up Time").grid(row=row,column=7)
        row+=1
        self.sys_up_time = StringVar(self.master)
        self.sys_up_label = Label(self.master, textvariable=self.sys_up_time)
        self.sys_up_label.grid(row=row,column=7,sticky="news")
        self.sys_up_label.config(bg="#deebf7")
        row+=1
        Label(self.master, text="Corrupt Packets").grid(row=row,column=7)
        row+=1
        self.corrupt_packets_var = StringVar(self.master)
        # self.corrupt_packets_label = Label(self.master, textvariable=self.lines)
        self.corrupt_packets_label = Label(self.master, textvariable=self.corrupt_packets_var)
        self.corrupt_packets_label.grid(row=row,column=7,sticky="news")
        self.corrupt_packets_label.config(bg="#deebf7")
        row+=1
        # self.master.mainloop()

    def print_line(self):
        while not self.displayQ.empty():
            line = self.displayQ.get_nowait()
            self.display.insert(END,line)
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
                    self.battery_life.set("{} %".format(battery))
                else:
                    self.battery_life.set("{} V".format(battery))
                bgcolor,fgcolor = self.colors("battery",battery)
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
                #delay = 3
                bgcolor,fgcolor = self.colors("delay",delay)
                self.delay.set("{} sec".format(delay))
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
                    self.tx_status_label.config(bg="red",fg="black")

                tracetime = health[6]
                line = [tracetime.strftime("%Y-%m-%d %H:%M:%S"),battery,temp,rssi,delay,counter_changes,self.corrupt_packets,tx_status]
                self.system_health_logger.log(line)

                self.master.update()
        except:
            print(sys.exc_info())
            # pdb.set_trace()

    def do_nothing(self):
        pass

    def colors(self,component,value):

        if self.tx_status.get() == "TRANSMITTING":
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


def main():
    pass
    #master = Tk()
    #stream = LogFileDaemonThread()
    #master.option_add("*Font", "TkDefaultFont 16")
    #g = GUI(master,displayQ)
    #master.mainloop()


if __name__ == "__main__":
    main()
