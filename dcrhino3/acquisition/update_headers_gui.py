#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Aug 14 00:58:14 2018
This module launches a GUI that will allow the user to select a folder with a batch of h5 files or an individual h5
file and a configuration file.  The calues from the configuration file will be used to update the headers in each of
the h5 files in case it is a batch job, or the individual h5 file selected.
@author: natal
"""

from tkinter import *
import tkinter.filedialog as tkFileDialog
import os
import h5py
import numpy as np
from dcrhino3.helpers.general_helper_functions import init_logging, init_logging_to_file
from dcrhino3.models.config2 import Config
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.helpers.config_file_helper import transform_configparser_to_config2

logger = init_logging(__name__)
file_logger = init_logging_to_file(__name__)

config = Config(acquisition_config=True)


class GUI():
    """
    Graphical User Interface that allows the user to select a folder with a batch of h5 files or an individual h5
    file and a configuration file.  The calues from the configuration file will be used to update the headers in each
    of the h5 files in case it is a batch job, or the individual h5 file selected.

    Args:
        master: obj: Instance of tkinter.Tk()
        config: obj: Instance of Config2

    Note:
        The local configuration file is sent to the GUI but it is only used to read the local data folder to be used
        as an initial path to the file/directory dialogs.  This is NOT necessarily the same configuration file that
        will be used to replace the headers.  It can be, but in most cases a different config file will be used.
    """
    def __init__(self, master, config):
        self.config = config
        row = 0
        master.title("Update Headers")
        master.geometry("700x180+30+30")
        master.columnconfigure(1, weight=3)
        master.columnconfigure(2, weight=3)
        master.columnconfigure(3, weight=3)
        master.columnconfigure(4, weight=3)
        Label(master, text="File Information", fg="blue").grid(row=row)
        row += 1

        self.batch = IntVar(master)
        Checkbutton(master, text="Batch", variable=self.batch).grid(row=row, sticky=W)
        row += 1

        Label(master, text="H5 Path to Fix").grid(row=row)
        self.h5f_path = Entry(master)
        # self.h5f_path.insert(0, "/home/natal/toconvert/test/level_1/piezo/20180707_SSX35660_5452_3200.h5")
        self.h5f_path.grid(row=row, column=1, columnspan=4, sticky="EW")
        Button(master, text='...', command=self.get_h5f_path).grid(row=row, column=5, sticky="W", pady=4)
        row += 1

        Label(master, text="Config File with New Values").grid(row=row)
        self.cfg_path = Entry(master)
        # self.cfg_path.insert(0, "/home/natal/toconvert/test/level_0/20180707_SSX32060_5452.cfg")
        self.cfg_path.grid(row=row, column=1, columnspan=4, sticky="EW")
        Button(master, text='...', command=self.get_cfg_path).grid(row=row, column=5, sticky="W", pady=4)
        row += 1

        Button(master, text='Update', command=self.update_h5f).grid(row=row, column=0, sticky=W, pady=4)
        row += 1

    def get_h5f_path(self):
        """
        Gets the path to h5 file or directory and places it in the text area in the GUI

        Returns:
            None
        """
        extension = [('h5 file', '*.h5')]
        f = self.get_path(extension)
        if len(f) > 0:
            self.h5f_path.delete(0, len(self.h5f_path.get()))
            self.h5f_path.insert(0, f)
            self.h5f_path.xview_moveto(1.0)
        return

    def get_cfg_path(self):
        """
        Gets the path to the configuration file and places it in the text area in the GUI

        Returns:
            None
        """
        initial_path = self.config.local_folder
        extension = [('Config File', '*.json'), ('Old Config File', '*.cfg')]
        f = tkFileDialog.askopenfilename(initialdir=initial_path, title="Select file", filetypes=extension)
        if len(f) > 0:
            self.cfg_path.delete(0, len(self.cfg_path.get()))
            self.cfg_path.insert(0, f)
            self.cfg_path.xview_moveto(1.0)
        return

    def get_path(self, extension):
        """
        Launches an open file dialog for the user to select the path of the h5 file, h5 files parent direcotory of
        the configuration file.  The extension parameter is used to filter the files that show up in the dialog.  If
        the attribute *batch* is set to 1 (checked box in the GUI), then the open file dialog becomes an open
        directory dialog
        Args:
            extension: list: list of tuples with the extension of the files that the user wants to see. The first
                             item of the tuple is a string with the description of the file and the second term of
                             the tuple is also a string with the extension.  For example *("h5 file", "*.h5")*

        Returns:
            str: absolute path to the file or directory selected
        """
        initial_path = self.config.local_folder
        if self.batch.get() == 1:
            f = tkFileDialog.askdirectory(initialdir=initial_path, title="Select Directory")
        else:
            f = tkFileDialog.askopenfilename(initialdir=initial_path, title="Select file", filetypes=extension)
        return f

    def update_h5f(self):
        """
        Takes a configuration file that is being read from the path that the user selected and copies all the values
        into the *global_config_jsons* attributes of the h5 file(s).  This method is only meant to work for Raw files
        (RTR or SSX) and not RTA files.

        This new version ignores the metadata (legacy) saved in the h5 attrs and only operates on the
        global_config_jsons
        """
        logger.warn("Ignoring any present metadata in the file(s)")
        path = self.h5f_path.get()
        files = list()
        if os.path.isdir(path):
            files = os.listdir(path)
            files = [os.path.join(path, x) for x in files if ("RTR" in x or "SSX" in x) and ".h5" in x]
        else:
            files.append(path)
        try:
            replace_config = Config()
            replace_config.load_from_config_for_h5_files(self.cfg_path.get())
        except:
            replace_config = transform_configparser_to_config2(self.cfg_path.get())
        for h5file in files:
            logger.info("Updating File {}".format(h5file))
            h5f = h5py.File(h5file, 'r+')
            h5_helper = H5Helper(h5f, load_xyz=False, load_ts=False)
            if not 'global_config_jsons' in h5_helper.h5f.attrs.keys():
                h5_helper.save_field_config_to_h5(replace_config)
                logger.info("Global config was not present so it was added")
            else:
                h5_helper.update_global_config(replace_config)
            axis = np.asarray([replace_config.sensor_axial_axis, replace_config.sensor_tangential_axis], dtype=np.int32)
            if replace_config.sensor_type == 2:
                sensitivities = np.asarray(replace_config.sensitivity_list_xyz, dtype=np.float32)
            else:
                sensitivities = np.asarray([1.], dtype=np.float32)
            h5_helper.replace_value_in_h5_key("sensitivity", sensitivities)
            h5_helper.replace_value_in_h5_key("axis", axis)
            h5_helper.print_h5file_stats()
            h5_helper.close_h5f()
        logger.info("Finished updating files")


def main(config):
    try:
        master = Tk()
        master.option_add("*Font", "TkDefaultFont 16")
        GUI(master, config)
        master.mainloop()
    except KeyboardInterrupt:
        sys.exit(0)


if __name__ == "__main__":
    main()
