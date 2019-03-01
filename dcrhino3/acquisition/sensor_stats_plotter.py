import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import ConfigParser
from dcrhino3.acquisition.constants import RAM_PATH
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
if plt.get_backend() == "Qt4Agg":
    pass
else:
    plt.switch_backend('TkAgg')
plt.ioff()


import os,sys
import glob
import pdb
import time


def get_min_max_values(config_value):
    min = float(config_value.split(",")[0])
    max = float(config_value.split(",")[1])
    return min, max


config_collection_file_path = os.path.join(PATH, 'collection_daemon.cfg')
config = ConfigParser.SafeConfigParser()
config.read(config_collection_file_path)

length = config.getint("SYSTEM_HEALTH_PLOTS", "histogram_length_in_sec")
rhino_version = config.getfloat("COLLECTION", "rhino_version")
# health = [0] * length
# rssi = [0] * length
# packets = [0] * length
# delay = [0] * length
# temp = [0] * length
# batt = [0] * length
# sec_delay = [0] * length

rssi = []
packets = []
delay = []
temp = []
batt = []


fig1 = plt.figure("DataCloud Rhino Sensor Stats", figsize=(6, 4))
plt.subplots_adjust(hspace=1.0, wspace=0.5)
plt.pause(.05)
fig1.canvas.draw()
while True:
    #rows,columns
    try:
        system_health = os.path.join(RAM_PATH, "system_health.npy")
        if os.path.exists(system_health):
            health = np.load(system_health)
        rows = 3
        columns = 2

        row = 0
        column = 0

        axis_font = {'fontname': 'Arial', 'size': '8'}
        title_font = {'fontname': 'Arial', 'size': '10'}
        tick_font_size = 8
        #
        # step = config.getint("SYSTEM_HEALTH_PLOTS", "x_axis_tick_interval")
        # time_axis_values = np.arange(int(length/step)+1)*step

        packets_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        packets_plot.tick_params(labelsize=tick_font_size)
        packets_plot.set_title("Packets", **title_font)
        packets_plot.set_xlabel("samples", **axis_font)
        # packets_plot.set_xlabel("Elapsed Time (sec)", **axis_font)
        # min,max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS","packets_y_lim"))
        # packets_plot.set_ylim(min,max)
        # packets_plot.yaxis.tick_right()
        # packets_plot.yaxis.set_label_position("right")
        # packets_plot.set_xticks(time_axis_values)
        # packets_plot.set_xlim(0,length)
        # packets_plot.invert_xaxis()
        row +=1
        #
        # delay_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        # delay_plot.tick_params(labelsize=tick_font_size)
        # delay_plot.set_title("Plotting Delay", **title_font)
        # delay_plot.set_xlabel("Elapsed Time (sec)", **axis_font)
        # delay_plot.set_ylabel("seconds", **axis_font)
        # min,max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS","delay_y_lim"))
        # delay_plot.set_ylim(min,max)
        # delay_plot.yaxis.tick_right()
        # delay_plot.yaxis.set_label_position("right")
        # row +=1
        #
        rssi_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        rssi_plot.tick_params(labelsize=tick_font_size)
        rssi_plot.set_title("RSSI", **title_font)
        rssi_plot.set_xlabel("Signal Strength", **axis_font)
        # min,max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS","rssi_y_lim"))
        # rssi_plot.set_ylim(min,max)
        # rssi_plot.yaxis.tick_right()
        # rssi_plot.yaxis.set_label_position("right")
        # rssi_plot.set_xlabel("Elapsed Time (sec)", **axis_font)
        row +=1
        #
        column = 1
        row = 0
        temp_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        temp_plot.tick_params(labelsize=tick_font_size)
        temp_plot.set_title("Board Temperature", **title_font)
        temp_plot.set_xlabel("degC", **axis_font)
        # temp_plot.set_xlabel("time (sec)", **axis_font)
        # min,max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS","temperature_y_lim"))
        # temp_plot.set_ylim(min,max)
        # temp_plot.yaxis.tick_right()
        # temp_plot.yaxis.set_label_position("right")
        row +=1
        #
        batt_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        batt_plot.tick_params(labelsize=tick_font_size)
        batt_plot.set_title("Battery Status", **title_font)
        batt_plot.set_xlabel("V", **axis_font)
        # batt_plot.set_xlabel("time (sec)", **axis_font)
        # min,max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS","battery_y_lim"))
        # batt_plot.set_ylim(min,max)
        # batt_plot.yaxis.tick_right()
        # batt_plot.yaxis.set_label_position("right")
        row += 1
        #
        # if rhino_version == 1.0:
        #     rssi_plot.set_visible(False)
        #     temp_plot.set_visible(False)
        #     batt_plot.set_visible(False)

        if len(rssi) >= length:
            rssi.pop(0)
            packets.pop(0)
            delay.pop(0)
            temp.pop(0)
            batt.pop(0)

        rssi.append(health[0][-1])
        packets.append(health[1][-1])
        delay.append(health[2][-1])
        temp.append(health[3][-1])
        batt.append(health[4][-1])
        # counterchanges = health[5]
        tracetime = health[6]
        now = health[7]
        sec_delay = delay[-1]

        plt.suptitle("Y - " + tracetime.strftime('%H:%M:%S') + " plotted at " + datetime.utcfromtimestamp(now).strftime('%H:%M:%S') + " delay of " + str(sec_delay))

        # pdb.set_trace()
        rssi_plot.hist(rssi, bins="sqrt")#2
        # rssi_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","rssi_upper_limit"),0,length,"y","dashed",label="rssi upper limit")
        # rssi_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","rssi_lower_limit"),0,length,"r","dashed",label="rssi lower limit")
        packets_plot.hist(packets, bins="sqrt")
        # packets_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","packets_upper_limit"),0,length,"y","dashed",label="packets upper limit")
        # packets_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","packets_lower_limit"),0,length,"r","dashed",label="packets lower limit")
        temp_plot.hist(temp, bins="sqrt")#3
        # temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","temp_positive_upper_limit"),0,length,"y","dashed")
        # temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","temp_positive_lower_limit"),0,length,"r","dashed")
        # temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","temp_negative_upper_limit"),0,length,"y","dashed")
        # temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","temp_negative_lower_limit"),0,length,"r","dashed")
        batt_plot.hist(batt, bins="sqrt")#3
        # batt_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","battery_upper_limit"),0,length,"y","dashed")
        # batt_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","battery_lower_limit"),0,length,"r","dashed")
        # delay_plot.hist(delay)
        # delay_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","delay_lower_limit"),0,length,"y","dashed")
        # delay_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS","delay_upper_limit"),0,length,"r","dashed")


        fig1.canvas.draw()
        plt.pause(0.15)
        # fig1.show()
        time.sleep(.15)
        plt.clf()
    except:
        time.sleep(0.1)
        pass
        # print(sys.exc_info())
