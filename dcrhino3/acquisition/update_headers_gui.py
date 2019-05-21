#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Aug 14 00:58:14 2018

@author: natal
"""

import ConfigParser
from Tkinter import *
import tkFileDialog
import pdb
import os
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.acquisition.config_file_utilities import update_h5f_headers
import h5py

cfg_fname = os.path.join(PATH, "collection_daemon.cfg")
config = ConfigParser.SafeConfigParser()
config.read(cfg_fname)


class GUI():
    def __init__(self, master):
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
        self.h5f_path.grid(row=row, column=1, columnspan=4, sticky="EW")
        Button(master, text='...', command=self.get_h5f_path).grid(row=row, column=5, sticky="W", pady=4)
        row += 1

        Label(master, text="Config File with New Values").grid(row=row)
        self.cfg_path = Entry(master)
        self.cfg_path.grid(row=row, column=1, columnspan=4, sticky="EW")
        Button(master, text='...', command=self.get_cfg_path).grid(row=row, column=5, sticky="W", pady=4)
        row += 1

        Button(master, text='Update', command=self.update_h5f).grid(row=row, column=0, sticky=W, pady=4)
        row += 1


    def get_h5f_path(self):
        extension = [('h5 file', '*.h5')]
        f = self.get_path(extension)
        if len(f) > 0:
            self.h5f_path.delete(0, len(self.h5f_path.get()))
            self.h5f_path.insert(0, f)
            self.h5f_path.xview_moveto(1.0)
        return

    def get_cfg_path(self):
        initial_path = config.get("DATA_TRANSMISSION", "local_folder")
        extension = [('Config File', '*.cfg')]
        f = tkFileDialog.askopenfilename(initialdir=initial_path, title="Select file", filetypes=extension)
        if len(f) > 0:
            self.cfg_path.delete(0, len(self.cfg_path.get()))
            self.cfg_path.insert(0, f)
            self.cfg_path.xview_moveto(1.0)
        return

    def get_path(self, extension):
        initial_path = config.get("DATA_TRANSMISSION", "local_folder")
        if self.batch.get() == 1:
            f = tkFileDialog.askdirectory(initialdir=initial_path, title="Select Directory")
        else:
            f = tkFileDialog.askopenfilename(initialdir=initial_path, title="Select file", filetypes=extension)
        return f

    def update_h5f(self):
        path = self.h5f_path.get()
        files = list()
        if os.path.isdir(path):
            files = os.listdir(path)
            files = [os.path.join(path, x) for x in files if "RTR" in x and ".h5" in x or "SSX" in x and ".h5" in x]
        else:
            files.append(path)
        replace_config = ConfigParser.ConfigParser()
        replace_config.read(self.cfg_path.get())
        for h5file in files:
            h5f = h5py.File(h5file, 'r+')
            h5f = update_h5f_headers(h5f, replace_config)
            h5f.close()


def main():
    try:
        master = Tk()
        master.option_add("*Font", "TkDefaultFont 16")
        GUI(master)
        master.mainloop()
    except KeyboardInterrupt:
        sys.exit(0)


if __name__ == "__main__":
    main()
