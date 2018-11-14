from Tkinter import *
import tkFont
from datetime import datetime
import pdb
import os
import time
import numpy as np
import matplotlib
import argparse

matplotlib.use('TkAgg')

from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt
from phase_rotation import rotate_phase
l_bound = -360
r_bound = 360
class GUI():
    def __init__(self,master,figure,original_data=None,interactive=True):
        self.master = master
        self.master.title("DataCloud Phase Plotter")
        self.master.option_add("*Font", "TkDefaultFont 16")
        self._interactive = interactive
        self.figure = figure
        self.original_data = original_data
        self.master.grid()

        row = 0
        Button(self.master,text="Exit",command=self.exit).grid(row=row,sticky='NEWS')
        row +=1

        canvas = FigureCanvasTkAgg(self.figure, master=self.master)
        plot_widget = canvas.get_tk_widget()
        plot_widget.grid(row=row,sticky='NEWS')
        row+=1
        self.phase_scale = Scale(self.master, from_=l_bound, to=r_bound, orient=HORIZONTAL, label="Phase",command=self.update)
        self.phase_scale.grid(row=row,sticky='NEWS')
        row+=1

        self.plot()

        Button(self.master,text="Reset Axis",command=self.reset_view).grid(row=row, sticky='NEWS')

        self.master.grid_columnconfigure(0,weight=0)

    @property
    def phase(self):
        return int(self.phase_scale.get())

    def interactive(self,value):
        self._interactive = value

    def plot(self):
        plt.plot(self.original_data,label="Original")
        self.xmin,self.xmax = plt.xlim()
        self.ymin,self.ymax = plt.ylim()


        if self._interactive:
            plt.show()

    def update(self,sv=None):
        xmin, xmax = plt.xlim()
        ymin, ymax = plt.ylim()
        plt.clf()
        plt.plot(self.original_data,label="Original")
        plt.plot(rotate_phase(self.original_data,self.phase),label="{} deg rotated".format(self.phase))
        plt.xlim(xmin,xmax)
        plt.ylim(ymin,ymax)
        plt.legend()
        if self._interactive:
            plt.show()
        else:
            self.figure.canvas.draw()

    def reset_view(self):
        plt.xlim(self.xmin,self.xmax)
        plt.ylim(self.ymin,self.ymax)
        plt.show()

    def exit(self):
        sys.exit(0)


def main(args):
    original_data = np.load(args.source_file)
    master = Tk()
    figure = plt.figure("Interactive Phase Plotter", dpi=200)
    if args.interactive == 'True':
        plt.ion()
        interactive = True
    else:
        plt.ioff()
        interactive = False
    g = GUI(master,figure,original_data,interactive)
    master.mainloop()

# def rotate_phase(data, phase_shift, degrees=True):
#     """
#     ::data:: numpy array (currently 1D, need to test as 2D might need to transpose)
#     ::phase shift:: float: #of degrees to shift signal phase
#     usage: phase_shifted_data_time = rotate_phase(data, phi)
#     """
#     if degrees is False:
#         phase_shift_radians = phase_shift
#     else:
#         phase_shift_radians = phase_shift*np.pi/180.0
#
#     N = len(data)
#     sign_correction = np.ones(N)
#     sign_correction[N//2:] -= 2
#     sign_correction[0] = 0.0
#     phasor = np.exp(-jj * phase_shift_radians * sign_correction)
#     fft_data = np.fft.fft(data)
#     phase_shifted_data_fft = fft_data*phasor
#     phase_shifted_data_time = np.real(np.fft.ifft(phase_shifted_data_fft))
#     return phase_shifted_data_time


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Phase Plotter - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-i', '--interactive', help="Interactive", default=True)
    argparser.add_argument('-f', '--source_file', help="Source NPY File")
    args = argparser.parse_args()
    main(args)
