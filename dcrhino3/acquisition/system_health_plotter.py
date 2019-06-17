import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import ConfigParser
from dcrhino3.acquisition.constants import RAM_PATH
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.helpers.general_helper_functions import calculate_battery_percentage
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
rhino_version = config.getfloat("COLLECTION","rhino_version")
accel_component = config.get("SYSTEM_HEALTH_PLOTS","accel_line_plot_component")
sensor_saturation_g = config.getint("INSTALLATION", "sensor_saturation_g")
accel_scale_multiplier = config.getfloat("SYSTEM_HEALTH_PLOTS","accel_scale_multiplier")
battery_max_voltage = config.getfloat("INSTALLATION", "battery_max_voltage")
battery_min_voltage = config.getfloat("INSTALLATION", "battery_min_voltage")
health = [0] * length
fig1 = plt.figure("DataCloud Rhino Health Plots",figsize=(6,4))
fig1.canvas.manager.window.wm_geometry("+%d+%d" % (1300, 0))
plt.subplots_adjust(hspace=1.0,wspace=0.5)
plt.pause(.05)
# plt.show()
fig1.canvas.draw()



while True:
    #rows,columns
    try:
        # pdb.set_trace()
        # latest_run = max(glob.glob(os.path.join(RAM_PATH,"*")), key=os.path.getmtime)
        system_health = os.path.join(RAM_PATH, "system_health.npy")
        if os.path.exists(system_health):
            health = np.load(system_health, allow_pickle=True)

        rssi = health[0]
        packets = health[1]
        delay = health[2]
        temp = health[3]
        batt = health[4]
        counterchanges = health[5]
        tracetime = health[6]
        now = health[7]
        drift = np.asarray(health[18])
        sec_delay = round(delay[-1] + drift[-1], 2)

        rows = 3
        columns = 2

        row = 0
        column = 0

        axis_font = {'fontname': 'Arial', 'size': '8'}
        title_font = {'fontname': 'Arial', 'size': '10'}
        tick_font_size = 8

        step = config.getint("SYSTEM_HEALTH_PLOTS", "x_axis_tick_interval")
        time_axis_values = np.arange(int(length / step) + 1) * step

        packets_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        packets_plot.tick_params(labelsize=tick_font_size)
        packets_plot.set_title("Packets", **title_font)
        packets_plot.set_ylabel("samples", **axis_font)
        packets_plot.set_xlabel("Elapsed Time (sec)", **axis_font)
        min, max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS", "packets_y_lim"))
        packets_plot.set_ylim(min, max)
        packets_plot.yaxis.tick_right()
        packets_plot.yaxis.set_label_position("right")
        packets_plot.set_xticks(time_axis_values)
        packets_plot.set_xlim(0, length)
        packets_plot.invert_xaxis()
        row += 1

        rssi_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1, sharex=packets_plot)
        rssi_plot.tick_params(labelsize=tick_font_size)
        rssi_plot.set_title("RSSI", **title_font)
        rssi_plot.set_ylabel("Signal Strength", **axis_font)
        min, max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS", "rssi_y_lim"))
        rssi_plot.set_ylim(min, max)
        rssi_plot.yaxis.tick_right()
        rssi_plot.yaxis.set_label_position("right")
        rssi_plot.set_xlabel("Elapsed Time (sec)", **axis_font)
        row += 1

        delay_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1, sharex=packets_plot)
        delay_plot_twin = delay_plot.twinx()
        delay_plot.tick_params(labelsize=tick_font_size)
        delay_plot.tick_params(axis="y", labelcolor="C0")
        delay_plot.set_title("Plotting Delay", **title_font)
        delay_plot.set_xlabel("Elapsed Time (sec)", **axis_font)
        delay_plot.set_ylabel("seconds", color="C0", **axis_font)
        min, max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS", "delay_y_lim"))
        delay_plot.set_ylim(min, max, )
        delay_plot.yaxis.tick_right()
        delay_plot.yaxis.set_label_position("right")
        delay_plot_twin.tick_params(labelsize=tick_font_size)
        delay_plot_twin.tick_params(axis="y", labelcolor="C7")
        delay_plot_twin.yaxis.tick_left()
        delay_plot_twin.yaxis.set_label_position("left")
        delay_plot_twin.set_ylabel("drift (sec)", color="C7", **axis_font)
        row += 1


        column = 1
        row = 0

        accel_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1, sharex=packets_plot)
        accel_plot.tick_params(labelsize=tick_font_size)
        accel_plot.set_title("{} Acceleration".format(accel_component.capitalize()), **title_font)
        accel_plot.set_xlabel("time (sec)", **axis_font)
        accel_plot.set_ylabel("G", **axis_font)
        # min,max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS","temperature_y_lim"))
        min, max = -accel_scale_multiplier * sensor_saturation_g, accel_scale_multiplier * sensor_saturation_g
        accel_plot.set_ylim(min, max)
        accel_plot.yaxis.tick_right()
        accel_plot.yaxis.set_label_position("right")
        row += 1

        temp_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1, sharex=packets_plot)
        temp_plot.tick_params(labelsize=tick_font_size)
        temp_plot.set_title("Board Temperature", **title_font)
        temp_plot.set_xlabel("time (sec)", **axis_font)
        temp_plot.set_ylabel("degC", **axis_font)
        min, max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS", "temperature_y_lim"))
        temp_plot.set_ylim(min, max)
        temp_plot.yaxis.tick_right()
        temp_plot.yaxis.set_label_position("right")
        row += 1

        batt_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1, sharex=packets_plot)
        batt_plot.tick_params(labelsize=tick_font_size)
        batt_plot.set_title("Battery Status", **title_font)
        batt_plot.set_xlabel("time (sec)", **axis_font)
        if config.getboolean("SYSTEM_HEALTH_PLOTS", "battery_plot_display_percentage"):
            batt_label = "%"
            batt_to_plot = np.asarray([calculate_battery_percentage(battery_max_voltage, battery_min_voltage,
                                                                    x) for x in batt])
        else:
            batt_label = "V"
            batt_to_plot = batt
        batt_plot.set_ylabel(batt_label, **axis_font)
        min, max = get_min_max_values(config.get("SYSTEM_HEALTH_PLOTS", "battery_y_lim"))
        batt_plot.set_ylim(min, max)
        batt_plot.yaxis.tick_right()
        batt_plot.yaxis.set_label_position("right")
        row += 1

        if rhino_version == 1.0:
            rssi_plot.set_visible(False)
            temp_plot.set_visible(False)
            batt_plot.set_visible(False)

        components = ["axial", "tangential", "radial"]
        accel_health_index = [11, 13, 15]
        accel_index = accel_health_index[components.index(accel_component)]
        max_component_accel = health[accel_index]
        min_component_accel = health[accel_index+1]


        plt.suptitle(tracetime.strftime('%Y-%m-%d %H:%M:%S' ) + " plotted at " + datetime.utcfromtimestamp(
            now).strftime('%Y-%m-%d %H:%M:%S') + " delay of " + str(sec_delay), fontsize=10)

        # pdb.set_trace()
        packets_plot.plot(np.flipud(packets), "black", label="packets")
        packets_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "packets_upper_limit"), 0, length, "y", "dashed",
                            label="packets upper limit")
        packets_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "packets_lower_limit"), 0, length, "r", "dashed",
                            label="packets lower limit")

        rssi_plot.plot(np.flipud(rssi),'gray',label="rssi")#2
        rssi_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "rssi_upper_limit"), 0, length, "y", "dashed",
                         label="rssi upper limit")
        rssi_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "rssi_lower_limit"), 0, length, "r", "dashed",
                         label="rssi lower limit")

        delay_plot.plot(np.flipud(delay + drift), 'C0')
        drift_mean = np.mean(drift[~np.isnan(drift)])
        min, max = delay_plot_twin.get_ylim()
        print(min, max)
        if drift_mean >= 0:
            print("A")
            delay_plot_twin.set_ylim(-1, np.max(drift)*1.05)
        else:
            print("B")
            delay_plot_twin.set_ylim(np.min(drift)*1.05, 1)
        print(min, max)
        delay_plot_twin.plot(np.flipud(drift), 'C7')
        delay_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "delay_lower_limit"), 0, length, "y", "dashed")
        delay_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "delay_upper_limit"), 0, length, "r", "dashed")

        accel_plot.plot(np.flipud(max_component_accel))
        accel_plot.plot(np.flipud(min_component_accel))
        accel_plot.hlines(sensor_saturation_g, 0, length, "r", "dashed")
        accel_plot.hlines(-sensor_saturation_g, 0, length, "r", "dashed")

        temp_plot.plot(np.flipud(temp), 'r')#3
        temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "temp_positive_upper_limit"),0,length,"y","dashed")
        temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "temp_positive_lower_limit"),0,length,"r","dashed")
        temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "temp_negative_upper_limit"),0,length,"y","dashed")
        temp_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "temp_negative_lower_limit"),0,length,"r","dashed")

        batt_plot.plot(np.flipud(batt_to_plot), 'g')#3
        batt_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "battery_upper_limit"),0,length,"y","dashed")
        batt_plot.hlines(config.getfloat("SYSTEM_HEALTH_PLOTS", "battery_lower_limit"),0,length,"r","dashed")

        fig1.canvas.draw()
        plt.pause(0.05)
        fig1.savefig(os.path.join(RAM_PATH, "health.png"))
        time.sleep(.05)
        plt.clf()
    except:
        time.sleep(.1)
        pass
        # print("System Health Plotter Exception: ", sys.exc_info())
