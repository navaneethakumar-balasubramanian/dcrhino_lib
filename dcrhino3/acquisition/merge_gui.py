#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""Merge Files GUI
Created on Tue Aug 14 00:58:14 2018

This module is a GUI for the user to select RTR.h5 files that will be merged into a single file.  The user will
select the parent folder where the files exist, an output folder and the configuration file that will be saved in the resulting merged file

@author: natal
"""
from tkinter import *
import tkinter.filedialog as tkFileDialog
import os
from subprocess import Popen
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.models.config2 import Config

class GUI():
    """

        This form contains three fields, one for the path to the parent folder of the files that will be merged,
        one for the path of the output folder where the resulting merged file will be saved and one for the path to
        the configuration file that will be saved in the merged file.  Each field has an action button that will
        launch a file dialog for the user to browse for the appropriate locations.  If the user does not want to use
        the dialogs, they can write the full path in the text fields
    """
    def __init__(self, master, config):
        """
            Args:
                master: obj. Instance of tkinter.Tk()
                config: obj. Instance of Config2
        """
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
        """
            Launches a file dialog for the user to select the parent directory of the files to merge and writes it in the text field
        Returns:
            str: Absolute path to source folder
        """
        f = self.get_dir_path()
        if len(f) > 0:
            self.merge_path.delete(0, len(self.merge_path.get()))
            self.merge_path.insert(0, f)
            self.merge_path.xview_moveto(1.0)
        return f

    def get_output_path(self):
        """
            Launches a file dialog for the user to select the output directory for the merged file and writes it in the text field
        Returns:
            str: Absolute path to output folder
        """
        # f = self.save_as_path()
        f = self.get_dir_path()
        if len(f) > 0:
            self.output_path.delete(0, len(self.output_path.get()))
            self.output_path.insert(0, f)
            self.output_path.xview_moveto(1.0)
        return f

    def get_cfg_path(self):
        """
Launches a file dialog for the user to select the configuration file that will be saved in the merged file
Returns:
str: Absolute path to desired folder
        """
        extension = [('Config File', '*.cfg')]
        f = self.get_file_path(extension)
        if len(f) > 0:
            self.cfg_path.delete(0, len(self.cfg_path.get()))
            self.cfg_path.insert(0, f)
            self.cfg_path.xview_moveto(1.0)
        return f

    def get_file_path(self, extension):
        """
            Generic file selection dialog
        Args:
            extension: str: File extension used to filter only desired files
        Returns:
            str: Absolute path of file selected
        Note:
            The initial_path is read from the configuration file
        """
        initial_path = self.config.local_folder
        f = tkFileDialog.askopenfilename(initialdir=initial_path, title="Select file", filetypes=extension)
        return f

    def get_dir_path(self):
        """
            Generic folder selection dialog
        Returns:
            str: Absolute path of folder selected
        Note:
            The initial_path is read from the configuration file
        """
        initial_path = self.config.local_folder
        f = tkFileDialog.askdirectory(initialdir=initial_path, title="Select Directory")
        return f

    # def save_as_path(self):
    #     extension = [('h5 File', '*.h5')]
    #     initial_path = self.config.local_folder
    #     f = tkFileDialog.asksaveasfilename(initialdir=initial_path, title="Save As", filetypes=extension)
    #     return f

    def merge_files(self):
        """
            Starts the file merging process by executing the python script merge_raw_data_h5.py

        """
        if self.merge_process == None:
            cmd = "python " + os.path.abspath(os.path.join(PATH, 'merge_raw_data_h5.py')) + " -i " + \
                  self.merge_path.get() + " -o " + self.output_path.get() + " -cfg " + self.cfg_path.get()
            self.merge_process = Popen(args=["gnome-terminal", "-e", "{}".format(cmd)])

def main(config):
    """
        Main method used to generate and instance of the GUI class and load it.  It acts as the interface to other
        modules
    Args:
        config: obj. Instance of Config2
    """
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
