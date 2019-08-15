#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Aug 14 00:58:14 2018

@author: natal
"""
from tkinter import *
import tkinter.filedialog as tkFileDialog
import os
from subprocess import Popen
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.models.config2 import Config

class GUI():
    def __init__(self, master, config):
        row = 0

        self.merge_process = None
        self.config = config
        master.title("Merge Files")
        master.geometry("700x190+30+30")
        master.columnconfigure(1, weight=3)
        master.columnconfigure(2, weight=3)
        master.columnconfigure(3, weight=3)
        master.columnconfigure(4, weight=3)
        Label(master, text="File Information", fg="blue").grid(row=row)
        row += 1

        Label(master, text="Folder to Merge").grid(row=row)
        self.merge_path = Entry(master)
        self.merge_path.grid(row=row, column=1, columnspan=4, sticky="EW")
        Button(master, text='...', command=self.get_merge_path).grid(row=row, column=5, sticky="W", pady=4)
        row += 1

        Label(master, text="Output Folder").grid(row=row)
        self.output_path = Entry(master)
        self.output_path.grid(row=row, column=1, columnspan=4, sticky="EW")
        Button(master, text='...', command=self.get_output_path).grid(row=row, column=5, sticky="W", pady=4)
        row += 1

        Label(master, text="Config File").grid(row=row)
        self.cfg_path = Entry(master)
        self.cfg_path.grid(row=row, column=1, columnspan=4, sticky="EW")
        Button(master, text='...', command=self.get_cfg_path).grid(row=row, column=5, sticky="W", pady=4)
        row += 1

        Button(master, text='Merge', command=self.merge_files).grid(row=row, column=0, sticky=W, pady=4)
        row += 1


    def get_merge_path(self):
        f = self.get_dir_path()
        if len(f) > 0:
            self.merge_path.delete(0, len(self.merge_path.get()))
            self.merge_path.insert(0, f)
            self.merge_path.xview_moveto(1.0)
        return

    def get_output_path(self):
        # f = self.save_as_path()
        f = self.get_dir_path()
        if len(f) > 0:
            self.output_path.delete(0, len(self.output_path.get()))
            self.output_path.insert(0, f)
            self.output_path.xview_moveto(1.0)
        return

    def get_cfg_path(self):
        extension = [('Config File', '*.cfg')]
        f = self.get_file_path(extension)
        if len(f) > 0:
            self.cfg_path.delete(0, len(self.cfg_path.get()))
            self.cfg_path.insert(0, f)
            self.cfg_path.xview_moveto(1.0)
        return

    def get_file_path(self, extension):
        initial_path = self.config.local_folder
        f = tkFileDialog.askopenfilename(initialdir=initial_path, title="Select file", filetypes=extension)
        return f

    def get_dir_path(self):
        initial_path = self.config.local_folder
        f = tkFileDialog.askdirectory(initialdir=initial_path, title="Select Directory")
        return f

    def save_as_path(self):
        extension = [('h5 File', '*.h5')]
        initial_path = self.config.local_folder
        f = tkFileDialog.asksaveasfilename(initialdir=initial_path, title="Save As", filetypes=extension)
        return f

    def merge_files(self):
        if self.merge_process == None:
            cmd = "python " + os.path.abspath(os.path.join(PATH, 'merge_raw_data_h5.py')) + " -i " + \
                  self.merge_path.get() + " -o " + self.output_path.get() + " -cfg " + self.cfg_path.get()
            self.merge_process = Popen(args=["gnome-terminal", "-e", "{}".format(cmd)])

def main(config):
    try:
        master = Tk()
        master.option_add("*Font", "TkDefaultFont 16")
        g = GUI(master, config)
        master.mainloop()
    except KeyboardInterrupt:
        sys.exit(0)

if __name__ == "__main__":
    config = Config(acquisition_config=True)
    main(config)
