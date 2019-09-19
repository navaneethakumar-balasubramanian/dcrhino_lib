import glob2
import os
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import numpy as np
import argparse
from dcrhino3.acquisition.constants import LOGS_PATH


def main(start_date=None, end_date=None):
    # path = "/home/natal/toconvert/waio/tablet_logs/Logs_83361/*health.log"
    # path = "/home/natal/toconvert/bma/tablet_logs/*health.log"
    # path = "/media/natal/256/BMC/logs/*health.log"
    path = os.path.join(LOGS_PATH, "*health.log")

    files = glob2.glob(path)

    # latest_file = max(files, key=os.path.getctime)
    latest_file = sorted(files)[-1]
    first_file = sorted(files)[0]
    date_prefix = list()
    if start_date is None:
        start = datetime.strptime(os.path.basename(first_file)[0:10], "%Y_%m_%d")
    else:
        start = datetime.strptime(start_date, "%Y_%m_%d")

    if end_date is None:
        end = datetime.strptime(os.path.basename(latest_file)[0:10], "%Y_%m_%d")
    else:
        end = datetime.strptime(end_date, "%Y_%m_%d")

    date_prefix.append(start.strftime("%Y_%m_%d"))
    time_delta = end - start
    if time_delta.days > 1:
        for day in range(time_delta.days):
            extra_date = start + timedelta(days=day)
            date_prefix.append(extra_date.strftime("%Y_%m_%d"))
        date_prefix.append(end.strftime("%Y_%m_%d"))

    # if start_date is None and end_date is None:
    #
    #     date_prefix.append(start.strftime("%Y_%m_%d"))
    #     time_delta = end - start
    #     for day in range(time_delta.days):
    #         extra_date = start + timedelta(days=day)
    #         date_prefix.append(extra_date.strftime("%Y_%m_%d"))
    #     date_prefix.append(end.strftime("%Y_%m_%d"))
    # else:
    #     start = datetime.strptime(start_date,"%Y_%m_%d")
    #     if end_date is None:
    #         end_date = os.path.basename(latest_file)[0:10]
    #     end = datetime.strptime(end_date,"%Y_%m_%d")
    #     date_prefix.append(start_date)
    #     time_delta = end - start
    #     for day in range(time_delta.days):
    #         extra_date = start + timedelta(days=day)
    #         date_prefix.append(extra_date.strftime("%Y_%m_%d"))
    #     date_prefix.append(end_date)
    daily_files = list()
    for date in date_prefix:
        daily_files.append([x for x in files if date in x])

    columns = ["date", "samples", "battery", "temperature", "rssi", "delay", "counter_changes", "corrupt", "tx_status",
               "drift", "real_delay", "disk_usage", "ram_usage", "tablet_temperature", "tablet_battery_status",
               "tablet_battery_percentage", "tablet_battery_life", "tablet_cpu_usage"]
    df = pd.DataFrame(columns=columns)

    daily_files = [item for sublist in daily_files for item in sublist]  # Flatten a list of lists into a simple list

    for daily_file in daily_files:
        df = pd.concat([df, pd.read_csv(daily_file, names=columns, index_col=False)])

    df.reset_index(drop=True, inplace=True)
    df["timestamps"] = pd.to_datetime(df.date).astype(int) / 10**9
    df.sort_values(by=["timestamps"], inplace=True)

    time_axis = [datetime.utcfromtimestamp(x) for x in df.timestamps]
    plt.figure("Rhino Time Series")

    plt.subplots_adjust(hspace=1.0, wspace=0.5)
    rssi_plot = plt.subplot2grid((8, 1), (0, 0), colspan=1)
    packets_plot = plt.subplot2grid((8, 1), (1, 0), colspan=1, sharex=rssi_plot)
    corrupt_plot = plt.subplot2grid((8, 1), (2, 0), colspan=1, sharex=rssi_plot)
    battery_plot = plt.subplot2grid((8, 1), (3, 0), colspan=1, sharex=rssi_plot)
    temperature_plot = plt.subplot2grid((8, 1), (4, 0), colspan=1, sharex=rssi_plot)
    drift_plot = plt.subplot2grid((8, 1), (5, 0), colspan=1, sharex=rssi_plot)
    tx_status_plot = plt.subplot2grid((8, 1), (6, 0), colspan=1, sharex=rssi_plot)
    real_delay_plot = plt.subplot2grid((8, 1), (7, 0), colspan=1, sharex=rssi_plot)

    rssi_plot.plot(time_axis, df.rssi, linestyle="none", marker=".")
    rssi_plot.set_title("RSSI")
    # rssi_plot.set_ylim(-80, -40)
    packets_plot.plot(time_axis, df.samples, linestyle="none", marker=".")
    packets_plot.set_title("Packets")
    corrupt_plot.plot(time_axis, df.corrupt, linestyle="none", marker=".")
    corrupt_plot.set_title("Corrupt Packets")
    battery_plot.plot(time_axis, df.battery, linestyle="none", marker=".")
    battery_plot.set_title("Battery Voltage")
    battery_plot.set_ylim(8, 13)
    temperature_plot.plot(time_axis, df.temperature, linestyle="none", marker=".")
    temperature_plot.set_title("Board Temperature")
    temperature_plot.set_ylim(0, 50)
    drift_plot.plot(time_axis, df.drift, linestyle="none", marker=".")
    drift_plot.set_title("Clock Drift")
    tx_status_plot.plot(time_axis, df.tx_status, linestyle="none", marker=".")
    tx_status_plot.set_title("Transmitter Status")
    tx_status_plot.set_ylim(-0.5, 1.5)
    real_delay_plot.plot(time_axis, df.real_delay, linestyle="none", marker=".")
    real_delay_plot.set_title("Processing Delay")
    total_seconds = df.timestamps.max() - df.timestamps.min()
    title = "Rhino System Health Time Series from {} to {}\n{} seconds of data analyzed".format(df.date.min(),
                                                                                                df.date.max(),
                                                                                                total_seconds)
    plt.suptitle(title)

    plt.figure("Histogram")
    signal_loss_plot = plt.subplot2grid((6, 1), (0, 0), colspan=1)
    signal_loss = (1-(df.samples.dropna()/2000))*100
    bins = np.arange(0, 7, 1)
    signal_loss_plot.set_xticks(bins)
    signal_loss_plot.set_xticklabels(["0", "1", "2", "3", "4", "5", "6+"])
    signal_loss = np.asarray(signal_loss, dtype=np.float32)
    signal_loss_plot.hist(signal_loss, bins=bins, histtype="step", weights=np.ones(len(signal_loss)) / len(
        signal_loss))
    signal_loss_plot.set_title("Signal Loss")
    plt.suptitle("System Health Histograms from {} to {}".format(df.date.min(), df.date.max()))

    plt.figure("Tablet Time Series")
    plt.subplots_adjust(hspace=1.0, wspace=0.5)
    ssd_plot = plt.subplot2grid((6, 1), (0, 0), colspan=1, sharex=rssi_plot)
    ram_plot = plt.subplot2grid((6, 1), (1, 0), colspan=1, sharex=rssi_plot)
    tablet_battery_plot = plt.subplot2grid((6, 1), (2, 0), colspan=1, sharex=rssi_plot)
    tablet_battery_status_plot = plt.subplot2grid((6, 1), (3, 0), colspan=1, sharex=rssi_plot)

    ssd_plot.plot(time_axis, df.disk_usage, linestyle="none", marker=".")
    ssd_plot.set_title("Disk Usage")
    ram_plot.plot(time_axis, df.ram_usage, linestyle="none", marker=".")
    ram_plot.set_title("RAM Usage")
    tablet_battery_plot.plot(time_axis, df.tablet_battery_percentage, linestyle="none", marker=".")
    tablet_battery_plot.set_title("Tablet Battery Percentage")
    tablet_battery_status_plot.plot(time_axis, df.tablet_battery_status, linestyle="none", marker=".")
    tablet_battery_status_plot.set_ylim(-0.5, 1.5)
    tablet_battery_status_plot.set_title("Tablet Battery Status")
    plt.suptitle("Tablet System Health Time Series from {} to {}".format(df.date.min(), df.date.max()))

    plt.show()
    # print(df.temperature.describe())
    print("Done")


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-sd', '--start_date', help="Start Date To Plot", default=None)
    argparser.add_argument('-ed', '--end_date', help="End Date To Plot", default=None)
    args = argparser.parse_args()
    main(args.start_date, args.end_date)
