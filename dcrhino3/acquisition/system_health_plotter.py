import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import ConfigParser
from dcrhino3.acquisition.constants import RAM_PATH
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
# matplotlib.use('GTKAgg')
if plt.get_backend() == "Qt4Agg":
    pass
else:
    plt.switch_backend('TkAgg')
plt.ioff()


import os, sys
import glob
import pdb
import time

def get_min_max_values(config_value):
    min = float(config_value.split(",")[0])
    max = float(config_value.split(",")[1])
    return min,max

config_collection_file_path = os.path.join(PATH,'collection_daemon.cfg')
config = ConfigParser.SafeConfigParser()
config.read(config_collection_file_path)

# pdb.set_trace()
length = config.getint("SYSTEM_HEALTH_PLOTS","x_axis_length_in_seconds")
health = [0] * length
fig1 = plt.figure("DataCloud Rhino Health Plots",figsize=(6,4))
plt.subplots_adjust(hspace=0.9,wspace=0.5)
plt.pause(.05)
# plt.show()
fig1.canvas.draw()
while True:
    #rows,columns
    try:
        # latest_run = max(glob.glob(os.path.join(RAM_PATH,"*")), key=os.path.getmtime)
        system_health = os.path.join(RAM_PATH,"system_health.npy")
        if os.path.exists(system_health):
            health = np.load(system_health)
        rows = 3
        columns = 2

        row = 0
        column = 0


        rssi_plot = plt.subplot2grid((rows, columns), (row, column),colspan=1)
        axis_font = {'fontname':'Arial', 'size':'8'}

        rssi_plot.set_title("RSSI", **axis_font)
        # rssi_plot.set_xlabel("dB")
        # rssi_plot.set_xlim(-70,-50)
        # rssi_plot.set_ylim(0,1)
        rssi_plot.set_ylabel("Signal Strength", **axis_font)
        # rssi_plot.set_ylabel("dB",color="gray")
        # rssi_plot.tick_params('y', colors='gray')
        step = config.getint("SYSTEM_HEALTH_PLOTS","x_axis_tick_interval")
        time_axis_values = np.arange(int(length/step)+1)*step
        rssi_plot.set_xticks(time_axis_values)
        rssi_plot.set_xlabel("Elapsed Time (sec)", **axis_font)
        min,max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS","rssi_y_lim"))

        rssi_plot.set_ylim(min,max)
        rssi_plot.set_xlim(0,length)
        rssi_plot.invert_xaxis()
        rssi_plot.yaxis.tick_right()
        rssi_plot.yaxis.set_label_position("right")
        row +=1

        packets_plot = plt.subplot2grid((rows, columns), (row, column),colspan=1,sharex=rssi_plot)
        packets_plot.set_title("Packets", **axis_font)
        packets_plot.set_ylabel("samples", **axis_font)
        min,max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS","packets_y_lim"))
        packets_plot.set_ylim(min,max)
        packets_plot.yaxis.tick_right()
        packets_plot.yaxis.set_label_position("right")
        packets_plot.set_xlabel("Elapsed Time (sec)", **axis_font)
        row +=1


        delay_plot = plt.subplot2grid((rows, columns), (row, column),colspan=1,sharex=rssi_plot)
        delay_plot.set_title("Plotting Delay", **axis_font)
        delay_plot.set_xlabel("Elapsed Time (sec)", **axis_font)
        delay_plot.set_ylabel("seconds", **axis_font)
        min,max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS","delay_y_lim"))
        delay_plot.set_ylim(min,max)
        delay_plot.yaxis.tick_right()
        delay_plot.yaxis.set_label_position("right")
        row +=1

        column = 1
        row = 0
        temp_plot= plt.subplot2grid((rows, columns), (row, column),colspan=1,sharex=rssi_plot)
        temp_plot.set_title("Board Temperature", **axis_font)
        temp_plot.set_xlabel("time (sec)", **axis_font)
        temp_plot.set_ylabel("degC", **axis_font)
        min,max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS","temperature_y_lim"))
        temp_plot.set_ylim(min,max)
        temp_plot.yaxis.tick_right()
        temp_plot.yaxis.set_label_position("right")
        row +=1

        batt_plot = plt.subplot2grid((rows, columns), (row, column),colspan=1,sharex=rssi_plot)
        batt_plot.set_title("Battery Status", **axis_font)
        batt_plot.set_xlabel("time (sec)", **axis_font)
        batt_plot.set_ylabel("%", **axis_font)
        min,max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS","battery_y_lim"))
        batt_plot.set_ylim(min,max)
        batt_plot.yaxis.tick_right()
        batt_plot.yaxis.set_label_position("right")
        row += 1


        #sec_delay = calendar.timegm(now.utctimetuple()) - trace[0]
        # sec_delay = round(now - trace[0],2)
        # # pdb.set_trace()
        # #plt.suptitle("Y - " + tracetime.strftime('%H:%M:%S' ) + " plotted at " + now.strftime('%H:%M:%S') +  " delay of " + str(sec_delay) )



        #if len(rssi) == 100:
        # [rssi,packets,delay,temp,batt,counterchanges]
        rssi =  health[0]
        packets=  health[1]
        delay=  health[2]
        temp=  health[3]
        batt=  health[4]
        counterchanges = health[5]
        tracetime = health[6]
        now = health[7]
        sec_delay = delay[-1]

        plt.suptitle("Y - " + tracetime.strftime('%H:%M:%S' ) + " plotted at " + datetime.utcfromtimestamp(now).strftime('%H:%M:%S') +  " delay of " + str(sec_delay) )

        # pdb.set_trace()
        rssi_plot.plot(np.flipud(rssi),'gray',label="rssi")#2
        packets_plot.plot(np.flipud(packets),"black",label="packets")
        rssi_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","rssi_upper_limit"),0,length,"y","dashed",label="rssi upper limit")
        rssi_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","rssi_lower_limit"),0,length,"r","dashed",label="rssi lower limit")
        packets_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","packets_upper_limit"),0,length,"y","dashed",label="packets upper limit")
        packets_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","packets_lower_limit"),0,length,"r","dashed",label="packets lower limit")
        temp_plot.plot(np.flipud(temp),'r')#3
        temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","temp_positive_upper_limit"),0,length,"y","dashed")
        temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","temp_positive_lower_limit"),0,length,"r","dashed")
        temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","temp_negative_upper_limit"),0,length,"y","dashed")
        temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","temp_negative_lower_limit"),0,length,"r","dashed")
        batt_plot.plot(np.flipud(batt),'g')#3
        batt_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","battery_upper_limit"),0,length,"y","dashed")
        batt_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","battery_lower_limit"),0,length,"r","dashed")
        delay_plot.plot(np.flipud(delay))
        delay_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","delay_lower_limit"),0,length,"y","dashed")
        delay_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","delay_upper_limit"),0,length,"r","dashed")


        fig1.canvas.draw()
        plt.pause(0.05)
        # fig1.show()
        time.sleep(.05)
        plt.clf()
    except:
        pass
        # print(sys.exc_info())