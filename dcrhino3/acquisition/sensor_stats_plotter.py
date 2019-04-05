import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import ConfigParser
from dcrhino3.acquisition.constants import RAM_PATH
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.models.config import Config
if plt.get_backend() == "Qt4Agg":
    pass
else:
    plt.switch_backend('TkAgg')
plt.ioff()


import os, sys
import pdb
import time


def get_min_max_values(config_value):
    min = float(config_value.split(",")[0])
    max = float(config_value.split(",")[1])
    return min, max

class StatsPlotter():

    def __init__(self, global_config):
        self.fig = plt.figure("DataCloud Rhino Sensor Stats", figsize=(6, 4))
        plt.subplots_adjust(hspace=1.0, wspace=0.5, top=0.8, bottom=.1)
        plt.pause(.05)
        self.fig.canvas.draw()
        self.global_config = global_config

    def create_plots(self):
        rows = 3
        columns = 2

        row = 0
        column = 0

        axis_font = {'fontname': 'Arial', 'size': '8'}
        title_font = {'fontname': 'Arial', 'size': '10'}
        tick_font_size = 8

        self.packets_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        self.packets_plot.tick_params(labelsize=tick_font_size)
        self.packets_plot.set_title("Packet Loss", **title_font)
        self.packets_plot.set_xlabel("Percentage", **axis_font)
        self.packet_bins = np.arange(0, 7, 1)
        self.packets_plot.set_xticks(self.packet_bins)
        self.packets_plot.set_xticklabels(["0", "1", "2", "3", "4", "5", "6+"])
        row += 1

        self.rssi_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        self.rssi_plot.tick_params(labelsize=tick_font_size)
        self.rssi_plot.set_title("RSSI", **title_font)
        self.rssi_plot.set_xlabel("Signal Strength", **axis_font)
        # min, max = get_min_max_values(self.config.get("SYSTEM_HEALTH_PLOTS", "rssi_y_lim"))
        min, max = get_min_max_values(self.global_config.rssi_y_lim)
        self.rssi_bins = np.arange(min, max, 1)
        row += 1

        self.temp_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        self.temp_plot.tick_params(labelsize=tick_font_size)
        self.temp_plot.set_title("Board Temperature", **title_font)
        self.temp_plot.set_xlabel("degC", **axis_font)
        # min, max = get_min_max_values(self.config.get("SYSTEM_HEALTH_PLOTS", "temperature_y_lim"))
        min, max = get_min_max_values(self.global_config.temperature_y_lim)
        self.temp_bins = np.arange(min, max, 1)
        row += 1

        column = 1
        row = 0

        self.axial_accel_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        self.axial_accel_plot.tick_params(labelsize=tick_font_size)
        self.axial_accel_plot.set_title("Axial Acceleration", **title_font)
        self.axial_accel_plot.set_xlabel("G", **axis_font)
        # self.accel_plot_bins = np.arange(config.getint("INSTALLATION", "sensor_saturation_g") * -1.1,
        #                                  config.getint("INSTALLATION", "sensor_saturation_g") * 1.1, 1)
        sensor_saturation_g = int(global_config.sensor_saturation_g)
        self.accel_plot_bins = np.arange(sensor_saturation_g * -1.1,
                                         sensor_saturation_g * 1.1, 1)
        row += 1

        self.tangential_accel_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        self.tangential_accel_plot.tick_params(labelsize=tick_font_size)
        self.tangential_accel_plot.set_title("Tangential Acceleration", **title_font)
        self.tangential_accel_plot.set_xlabel("G", **axis_font)
        row += 1

        self.radial_accel_plot = plt.subplot2grid((rows, columns), (row, column), colspan=1)
        self.radial_accel_plot.tick_params(labelsize=tick_font_size)
        self.radial_accel_plot.set_title("Radial Acceleration", **title_font)
        self.radial_accel_plot.set_xlabel("G", **axis_font)
        row += 1

    def set_title(self, title):
        plt.suptitle(title, fontsize=10)

    def plot(self, packets, temp, rssi, max_axial_accel, min_axial_accel, max_tangential_accel, min_tangential_accel,
             max_radial_accel, min_radial_accel):
        packets_array = np.absolute(np.asarray(packets) / ideal_packets - 1) * 100
        packets_array = packets_array[~np.isnan(packets_array)]
        packets_array[packets_array > self.packet_bins[-1]] = self.packet_bins[-1]
        self.packets_plot.hist(packets_array, bins=self.packet_bins, edgecolor='black', align="mid", density=True)

        temp_array = np.asarray(temp)
        temp_array = temp_array[~np.isnan(temp_array)]
        temp_array[temp_array < self.temp_bins[0]] = self.temp_bins[0]
        temp_array[temp_array > self.temp_bins[-1]] = self.temp_bins[-1]
        self.temp_plot.hist(temp_array, bins=self.temp_bins, edgecolor='black', align="left", density=True)  # 3

        rssi_array = np.asarray(rssi)
        rssi_array = rssi_array[~np.isnan(rssi_array)]
        rssi_array[rssi_array < self.rssi_bins[0]] = self.rssi_bins[0]
        rssi_array[rssi_array > self.rssi_bins[-1]] = self.rssi_bins[-1]
        self.rssi_plot.hist(rssi_array, bins=self.rssi_bins, edgecolor='black',
                            weights=np.ones(len(rssi_array)) / len(rssi_array), density=False, align="left")  # 2

        axial_accel_array = np.hstack((max_axial_accel, min_axial_accel))
        axial_accel_array = axial_accel_array[~np.isnan(axial_accel_array)]
        axial_accel_array[axial_accel_array > self.accel_plot_bins[-1]] = self.accel_plot_bins[-1]
        self.axial_accel_plot.hist(axial_accel_array, bins=self.accel_plot_bins, edgecolor='black',
                                   weights=np.ones(len(axial_accel_array)) / len(axial_accel_array), density=False,
                                   align="left")

        tangential_accel_array = np.hstack((max_tangential_accel, min_tangential_accel))
        tangential_accel_array = tangential_accel_array[~np.isnan(tangential_accel_array)]
        tangential_accel_array[tangential_accel_array > self.accel_plot_bins[-1]] = self.accel_plot_bins[-1]
        self.tangential_accel_plot.hist(tangential_accel_array, bins=self.accel_plot_bins, edgecolor='black',
                                        weights=np.ones(len(tangential_accel_array)) / len(tangential_accel_array),
                                        density=False, align="left")

        radial_accel_array = np.hstack((max_radial_accel, min_radial_accel))
        radial_accel_array = radial_accel_array[~np.isnan(radial_accel_array)]
        radial_accel_array[radial_accel_array > self.accel_plot_bins[-1]] = self.accel_plot_bins[-1]
        self.radial_accel_plot.hist(radial_accel_array, bins=self.accel_plot_bins, edgecolor='black',
                                    weights=np.ones(len(radial_accel_array)) / len(radial_accel_array), density=False,
                                    align="left")

    def save_figure(self, path):
        self.fig.savefig(path)

    def draw(self):
        self.fig.canvas.draw()
        plt.pause(0.15)
        time.sleep(.15)
        plt.clf()


config_collection_file_path = os.path.join(PATH, 'collection_daemon.cfg')
config = ConfigParser.SafeConfigParser()
config.read(config_collection_file_path)
global_config = Config(config_parser=config)

length = config.getint("SYSTEM_HEALTH_PLOTS", "histogram_length_in_sec")
rhino_version = config.getfloat("COLLECTION", "rhino_version")
ideal_packets = config.getfloat("COLLECTION", "output_sampling_rate")
sensor_saturation_g = config.getint("INSTALLATION", "sensor_saturation_g")

rssi = list()
packets = list()
delay = list()
temp = list()
batt = list()
max_axial_accel = list()
max_tangential_accel = list()
max_radial_accel = list()
min_axial_accel = list()
min_tangential_accel = list()
min_radial_accel = list()
tracetime_list = list()


plotter = StatsPlotter(global_config)
previous_tracetime = 0

initial_tracetime = datetime.now()

while True:
    #rows,columns
    try:
        system_health = os.path.join(RAM_PATH, "system_health.npy")
        if os.path.exists(system_health):
            health = np.load(system_health)

        plotter.create_plots()

        tracetime = health[6]
        if previous_tracetime != tracetime:
            # print("list",len(rssi),len(packets),len(temp))
            previous_tracetime = tracetime
            if len(rssi) >= length:
                rssi.pop(0)
                packets.pop(0)
                delay.pop(0)
                temp.pop(0)
                batt.pop(0)
                max_axial_accel.pop(0)
                max_tangential_accel.pop(0)
                max_radial_accel.pop(0)
                min_axial_accel.pop(0)
                min_tangential_accel.pop(0)
                min_radial_accel.pop(0)
                initial_tracetime = tracetime_list[0]

            tracetime_list.append(tracetime)
            rssi.append(health[0][-1])
            packets.append(health[1][-1])
            delay.append(health[2][-1])
            temp.append(health[3][-1])
            batt.append(health[4][-1])
            max_axial_accel.append(health[11][-1])
            min_axial_accel.append(health[12][-1])
            max_tangential_accel.append(health[13][-1])
            min_tangential_accel.append(health[14][-1])
            max_radial_accel.append(health[15][-1])
            min_radial_accel.append(health[16][-1])

            now = health[7]
            sec_delay = delay[-1]

            plotter.set_title(tracetime.strftime('%H:%M:%S') + " plotted at " + datetime.utcfromtimestamp(
                now).strftime('%H:%M:%S') + " delay of " + str(sec_delay) + "\n" + "Data From: {} to {}".format(
                initial_tracetime.strftime('%H:%M:%S'), tracetime.strftime('%H:%M:%S')))

            plotter.plot(packets, temp, rssi, max_axial_accel, min_axial_accel, max_tangential_accel,
                         min_tangential_accel, max_radial_accel, min_radial_accel)
            plotter.save_figure(os.path.join(RAM_PATH, "histogram.png"))
            plotter.draw()


        else:
            time.sleep(.15)
    except NameError:
        time.sleep(0.1)
        pass
    except IOError:
        time.sleep(0.1)
        pass
    except EOFError:
        time.sleep(0.1)
        pass
    except:
        time.sleep(0.1)
        print("Sensor Stats Plotter Exception")
        print(sys.exc_info())
