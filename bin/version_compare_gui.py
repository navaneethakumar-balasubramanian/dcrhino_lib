#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Aug 14 00:58:14 2018

@author: natal
"""

from Tkinter import *
import tkFileDialog

import pdb
import os
from dcrhino3.plotters.version_comparisson import compare_versions


class GUI():
    def __init__(self, master):
        row = 0

        self.compare_process = None

        master.title("DC Version Compare")
        master.geometry("700x230+30+30")
        master.columnconfigure(1, weight=3)
        master.columnconfigure(2, weight=3)
        master.columnconfigure(3, weight=3)
        master.columnconfigure(4, weight=3)
        Label(master, text="File Information", fg="blue").grid(row=row)
        row +=1

        Label(master, text="File 1").grid(row=row)
        self.file1_path = Entry(master)
        self.file1_path.grid(row=row, column=1, columnspan=4,sticky="EW")
        Button(master, text='...', command=self.get_file1_path).grid(row=row, column=5,sticky="W", pady=4)
        row += 1

        Label(master, text="File 2").grid(row=row)
        self.file2_path = Entry(master)
        self.file2_path.grid(row=row, column=1, columnspan=4, sticky="EW")
        Button(master, text='...', command=self.get_file2_path).grid(row=row, column=5, sticky="W", pady=4)
        row += 1

        Label(master, text="Features File").grid(row=row)
        self.features_file_path = Entry(master)
        self.features_file_path.grid(row=row, column=1, columnspan=4, sticky="EW")
        Button(master, text='...', command=self.get_features_file_path).grid(row=row, column=5, sticky="W", pady=4)
        row += 1

        Label(master, text="Output Folder").grid(row=row)
        self.output_path = Entry(master)
        self.output_path.grid(row=row, column=1, columnspan=4,sticky="EW")
        Button(master, text='...', command=self.get_output_path).grid(row=row, column=5, sticky="W", pady=4)
        row += 1

        Button(master, text='Compare', command=self.compare_files).grid(row=row, column=0, sticky=W, pady=4)
        row += 1

    def get_output_path(self):
        # f = self.save_as_path()
        f = self.get_dir_path()
        if len(f) > 0:
            self.output_path.delete(0, len(self.output_path.get()))
            self.output_path.insert(0, f)
            self.output_path.xview_moveto(1.0)
        return

    def get_file1_path(self):
        extension = [('csv', '*.csv')]
        f = self.get_file_path(extension)
        if len(f) > 0:
            self.file1_path.delete(0, len(self.file1_path.get()))
            self.file1_path.insert(0, f)
            self.file1_path.xview_moveto(1.0)
        return

    def get_file2_path(self):
        extension = [('csv', '*.csv')]
        f = self.get_file_path(extension)
        if len(f)>0:
            self.file2_path.delete(0, len(self.file2_path.get()))
            self.file2_path.insert(0, f)
            self.file2_path.xview_moveto(1.0)
        return

    def get_features_file_path(self):
        extension = [('Text File', '*.txt')]
        f = self.get_file_path(extension)
        if len(f) > 0:
            self.features_file_path.delete(0, len(self.features_file_path.get()))
            self.features_file_path.insert(0, f)
            self.features_file_path.xview_moveto(1.0)
        return

    def get_file_path(self, extension):
        initial_path = "~/"
        f = tkFileDialog.askopenfilename(initialdir=initial_path, title="Select file", filetypes=extension)
        return f

    def get_dir_path(self):
        initial_path = "~/"
        f = tkFileDialog.askdirectory(initialdir=initial_path, title="Select Directory")
        return f

    def compare_files(self):
        if self.compare_process is None:
            #script = os.path.abspath(os.path.join(PATH, 'version_comparisson.py'))
            if len(self.file2_path.get()) > 0:
                # cmd = "python {} -a {} -b {} -f {} -o {}".format(script, self.file1_path.get(), self.file2_path.get(),
                #                                                  self.features_file_path.get(), self.output_path.get())
                compare_versions(file1=self.file1_path.get(), file2=self.file2_path.get(),
                                 features=self.features_file_path.get(), output_path=self.output_path.get())
            else:
                compare_versions(file1=self.file1_path.get(), features=self.features_file_path.get(),
                                 output_path=self.output_path.get())
                # cmd = "python {} -a {} -f {} -o {}".format(script, self.file1_path.get(), self.features_file_path.get(),
                #                                            self.output_path.get())
            #print(cmd)
            #self.compare_process = Popen(args=["gnome-terminal", "-e", "{}".format(cmd)])


def main():
    try:
        master = Tk()
        master.option_add("*Font", "TkDefaultFont 16")
        g = GUI(master)
        master.mainloop()
    except KeyboardInterrupt:
        sys.exit(0)


if __name__ == "__main__":
    main()
