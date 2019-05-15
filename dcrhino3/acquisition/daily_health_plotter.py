import glob
import os
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
import numpy as np
import argparse


def main(date=None):
    # path = "/home/natal/Documents/datacloud/software/rhino/v3/dcrhino_lib/dcrhino3/acquisition/logs/*health.log"
    path = "/home/field/Documents/dcrhino_lib/dcrhino3/acquisition/logs/*health.log"

    files = glob.glob(path)

    latest_file = max(files, key=os.path.getctime)

    if date is None:
        date_prefix = os.path.basename(latest_file)[0:11]
    else:
        date_prefix = str(date)

    daily_files = [x for x in files if date_prefix in x]
    columns = ["date", "samples", "battery", "temperature", "rssi", "delay", "counter_changes", "corrupt", "tx_status",
               "drift", "real_delay"]
    df = pd.DataFrame(columns=columns)

    for daily_file in daily_files:
        df = pd.concat([df, pd.read_csv(daily_file, names=columns, index_col=False)])

    df.reset_index(drop=True, inplace=True)
    df["timestamps"] = pd.to_datetime(df.date).astype(int) / 10**9
    df.sort_values(by=["timestamps"], inplace=True)


    plt.figure("Time Series")

    plt.subplots_adjust(hspace=1.0, wspace=0.5)
    rssi_plot = plt.subplot2grid((6, 1), (0, 0), colspan=1)
    packets_plot = plt.subplot2grid((6, 1), (1, 0), colspan=1, sharex=rssi_plot)
    corrupt_plot = plt.subplot2grid((6, 1), (2, 0), colspan=1, sharex=rssi_plot)
    battery_plot = plt.subplot2grid((6, 1), (3, 0), colspan=1, sharex=rssi_plot)
    temperature_plot = plt.subplot2grid((6, 1), (4, 0), colspan=1, sharex=rssi_plot)

    rssi_plot.plot([datetime.utcfromtimestamp(x) for x in df.timestamps], df.rssi)
    rssi_plot.set_title("RSSI")
    packets_plot.plot([datetime.utcfromtimestamp(x) for x in df.timestamps], df.samples)
    packets_plot.set_title("Packets")
    corrupt_plot.plot([datetime.utcfromtimestamp(x) for x in df.timestamps], df.corrupt)
    corrupt_plot.set_title("Corrupt Packets")
    battery_plot.plot([datetime.utcfromtimestamp(x) for x in df.timestamps], df.battery)
    battery_plot.set_title("Battery Voltage")
    battery_plot.set_ylim(10, 11)
    temperature_plot.plot([datetime.utcfromtimestamp(x) for x in df.timestamps], df.temperature)
    temperature_plot.set_title("Board Temperature")
    temperature_plot.set_ylim(0, 50)
    plt.suptitle("System Health Time Series from {} to {}".format(df.date.min(), df.date.max()))

    plt.figure("Histogram")
    signal_loss_plot = plt.subplot2grid((6, 1), (0, 0), colspan=1)
    signal_loss = (1-(df.samples/2000))*100
    bins = np.arange(0, 7, 1)
    signal_loss_plot.set_xticks(bins)
    signal_loss_plot.set_xticklabels(["0", "1", "2", "3", "4", "5", "6+"])
    signal_loss = np.asarray(signal_loss, dtype=np.float32)
    signal_loss_plot.hist(signal_loss, bins=bins, histtype="step", weights=np.ones(len(signal_loss)) / len(signal_loss))
    signal_loss_plot.set_title("Signal Loss")
    plt.suptitle("System Health Histograms from {} to {}".format(df.date.min(), df.date.max()))

    plt.show()
    print("Done")


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-d', '--date', help="Date To Plot", default=None)
    args = argparser.parse_args()
    main(args.date)