"""
System Health Plotter

This module will read the system_health.npy file from the default RAM_PATH location and will generate the system
health line charts.  The configuration parameters for the plots (limits, x-axis scale, y-axis scale) can be found and
updated in the display_settings.cfg file

@author: Natal
"""
#TODO: Convert this to a class that reads values from a queue instead of the numpy file

import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
from dcrhino3.acquisition.constants import RAM_PATH
from dcrhino3.acquisition.supporting_acquisition import calculate_battery_percentage
if plt.get_backend() == "Qt4Agg":
    pass
else:
    plt.switch_backend('TkAgg')
plt.ioff()
import os
import time
from dcrhino3.models.config2 import Config
from dcrhino3.helpers.general_helper_functions import init_logging, init_logging_to_file
logger = init_logging(__name__)
file_logger = init_logging_to_file(__name__)


# TODO: Factor this function into general helper functions as it is used in another class
def get_min_max_values(config_value):
    min = float(config_value[0])
    max = float(config_value[1])
    return min, max


config = Config(acquisition_config=True)

length = config.x_axis_length_in_seconds
rhino_version = config.rhino_version
accel_component = config.accel_line_plot_component
sensor_saturation_g = config.sensor_saturation_g
accel_scale_multiplier = config.accel_scale_multiplier
battery_max_voltage = config.battery_max_voltage
battery_min_voltage = config.battery_min_voltage
health = [0] * length
fig1 = plt.figure("DataCloud Rhino Health Plots",figsize=(6,4))
fig1.canvas.manager.window.wm_geometry("+%d+%d" % (1300, 0))
plt.subplots_adjust(hspace=1.0, wspace=0.5)
plt.pause(.05)
# plt.show()
fig1.canvas.draw()



while False: #True I changed this to false in this branch so that I can build the documentation, otherwise it was
    # getting stuck here
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

        step = config.x_axis_tick_interval
        time_axis_values = np.arange(int(length / step) + 1) * step

        packets_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        packets_plot.tick_params(labelsize=tick_font_size)
        packets_plot.set_title("Packets", **title_font)
        packets_plot.set_ylabel("samples", **axis_font)
        packets_plot.set_xlabel("Elapsed Time (sec)", **axis_font)
        min, max = get_min_max_values(config.packets_y_lim)
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
        min, max = get_min_max_values(config.rssi_y_lim)
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
        min, max = get_min_max_values(config.delay_y_lim)
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
        min, max = get_min_max_values(config.temperature_y_lim)
        temp_plot.set_ylim(min, max)
        temp_plot.yaxis.tick_right()
        temp_plot.yaxis.set_label_position("right")
        row += 1

        batt_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1, sharex=packets_plot)
        batt_plot.tick_params(labelsize=tick_font_size)
        batt_plot.set_title("Battery Status", **title_font)
        batt_plot.set_xlabel("time (sec)", **axis_font)
        if config.battery_plot_display_percentage:
            batt_label = "%"
            batt_to_plot = np.asarray([calculate_battery_percentage(battery_max_voltage, battery_min_voltage,
                                                                    x) for x in batt])
        else:
            batt_label = "Volts"
            batt_to_plot = batt
        batt_plot.set_ylabel(batt_label, **axis_font)
        min, max = get_min_max_values(config.battery_y_lim)
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
        packets_plot.hlines(config.packets_upper_limit, 0, length, "y", "dashed",
                            label="packets upper limit")
        packets_plot.hlines(config.packets_lower_limit, 0, length, "r", "dashed",
                            label="packets lower limit")

        rssi_plot.plot(np.flipud(rssi), 'gray', label="rssi")
        rssi_plot.hlines(config.rssi_upper_limit, 0, length, "y", "dashed",
                         label="rssi upper limit")
        rssi_plot.hlines(config.rssi_lower_limit, 0, length, "r", "dashed",
                         label="rssi lower limit")

        delay_plot.plot(np.flipud(delay + drift), 'C0')
        not_nan_drift = drift[~np.isnan(drift)]
        # drift_mean = np.mean(not_nan_drift)
        # drift_std = np.std(not_nan_drift)
        delay_plot_twin.set_ylim(1, -50)
        delay_plot_twin.plot(np.flipud(drift), 'C7')
        # min, max = delay_plot_twin.get_ylim()
        # if drift_mean >= 0:
        #     delay_plot_twin.set_ylim(-1, drift_mean + 3*drift_std)
        # else:
        #     delay_plot_twin.set_ylim(drift_mean - 3*drift_std, 1)

        delay_plot.hlines(config.delay_lower_limit, 0, length, "y", "dashed")
        delay_plot.hlines(config.delay_upper_limit, 0, length, "r", "dashed")

        accel_plot.plot(np.flipud(max_component_accel))
        accel_plot.plot(np.flipud(min_component_accel))
        accel_plot.hlines(sensor_saturation_g, 0, length, "r", "dashed")
        accel_plot.hlines(-sensor_saturation_g, 0, length, "r", "dashed")

        temp_plot.plot(np.flipud(temp), 'r')
        temp_plot.hlines(config.temp_positive_upper_limit, 0, length, "y", "dashed")
        temp_plot.hlines(config.temp_positive_lower_limit, 0, length, "r", "dashed")
        temp_plot.hlines(config.temp_negative_upper_limit, 0, length, "y", "dashed")
        temp_plot.hlines(config.temp_negative_lower_limit, 0, length, "r", "dashed")

        batt_plot.plot(np.flipud(batt_to_plot), 'g')#3
        batt_plot.hlines(config.battery_upper_limit, 0, length, "y","dashed")
        batt_plot.hlines(config.battery_lower_limit, 0 , length, "r", "dashed")

        fig1.canvas.draw()
        plt.pause(0.05)
        fig1.savefig(os.path.join(RAM_PATH, "health.png"))
        time.sleep(.05)
        plt.clf()
    except:
        time.sleep(.1)
        pass
        # print("System Health Plotter Exception: ", sys.exc_info())
