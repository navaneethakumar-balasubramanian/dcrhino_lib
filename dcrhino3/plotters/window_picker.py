import numpy as np
import pdb
from Tkinter import *
import matplotlib
#matplotlib.use('TkAgg')
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt
plt.ion()

COLORS = {"multiple_0_wb": "b",
          "multiple_0_we": "r",
          "multiple_1_wb": "g",
          "multiple_1_we": "k",
          "multiple_2_wb": "y",
          "multiple_2_we": "brown"
          }

class WindowPicker():

    def __init__(self, figure, ax_index=0):
        self.root = Tk()
        self.figure = figure
        self.canvas = FigureCanvasTkAgg(figure, master=self.root)
        self.plot_widget = self.canvas.get_tk_widget()
        self.plot_widget.grid(row=0, column=0, columnspan=6)
        self.cid = None
        self.active_key = None
        self.windows = dict()
        self.ax_index = ax_index
        self.ax = self.figure.axes[self.ax_index]
        self.min, self.max = self.ax.get_xlim()
        self.lines = dict()
        self.buttons = dict()

        # create the file menu
        self.menubar = Menu(self.root)
        self.filemenu = Menu(self.menubar, tearoff=0)
        self.menubar.add_cascade(label="File", menu=self.filemenu)
        self.filemenu.add_command(label="Exit", command=self.exit)
        self.root.config(menu=self.menubar)

        self.buttons["multiple_0_wb"] = Button(self.root, text="Multiple 0 Wb", command=self.wb_0, bg="gray")
        self.buttons["multiple_0_wb"].grid(row=1, column=0)
        self.buttons["multiple_0_we"] = Button(self.root, text="Multiple 0 We", command=self.we_0, bg="gray")
        self.buttons["multiple_0_we"].grid(row=1, column=1)
        self.buttons["multiple_1_wb"] = Button(self.root, text="Multiple 1 Wb", command=self.wb_1, bg="gray")
        self.buttons["multiple_1_wb"].grid(row=1, column=2)
        self.buttons["multiple_1_we"] = Button(self.root, text="Multiple 1 We", command=self.we_1, bg="gray")
        self.buttons["multiple_1_we"].grid(row=1, column=3)
        self.buttons["multiple_2_wb"] = Button(self.root, text="Multiple 2 Wb", command=self.wb_2, bg="gray")
        self.buttons["multiple_2_wb"].grid(row=1, column=4)
        self.buttons["multiple_2_we"] = Button(self.root, text="Multiple 2 We", command=self.we_2, bg="gray")
        self.buttons["multiple_2_we"].grid(row=1, column=5)
        Button(self.root, text="Done", command=self.done).grid(row=2, column=2, columnspan=2)
        Button(self.root, text="Clear", command=self.clear).grid(row=2, column=3, columnspan=2)
        Button(self.root, text="Exit", command=self.exit).grid(row=2, column=3, columnspan=2)
        self.root.mainloop()

    def wb_0(self):
        self.update("multiple_0_wb")

    def we_0(self):
        self.update("multiple_0_we")

    def wb_1(self):
        self.update("multiple_1_wb")

    def we_1(self):
        self.update("multiple_1_we")

    def wb_2(self):
        self.update("multiple_2_wb")

    def we_2(self):
        self.update("multiple_2_we")

    def update(self, key):
        # pdb.set_trace()
        for button_key in self.buttons.keys():
            if key == button_key:
                self.buttons[button_key].config(bg="lightgreen")
            else:
                self.buttons[button_key].config(bg="gray")
        self.cid = self.figure.canvas.mpl_connect('button_press_event', self.onclick)
        self.active_key = key

    def done(self):
        for key in self.buttons.keys():
            self.buttons[key].config(bg="gray")
        self.figure.canvas.mpl_disconnect(self.cid)
        print(self.windows)

    def onclick(self, event):
        print('%s click: button=%d, x=%d, y=%d, xdata=%f, ydata=%f' %
              ('double' if event.dblclick else 'single', event.button,
               event.x, event.y, event.xdata, event.ydata))
        self.windows[self.active_key] = event.ydata
        if self.active_key in self.lines.keys():
            line = self.lines[self.active_key]
            line.remove()
        line = self.ax.axhline(event.ydata, self.min, self.max, color=COLORS[self.active_key])
        self.lines[self.active_key] = line

    def clear(self):
        self.windows = dict()
        for key in self.lines.keys():
            line = self.lines[key]
            line.remove()

    def exit(self):
        self.root.destroy()
        plt.close()

def main():

    fig1 = plt.figure(1)
    t = np.arange(0.0, 3.0, 0.01)
    s = np.sin(np.pi * t)
    plt.plot(t, s)
    wp = WindowPicker(fig1)


if __name__ == "__main__":
    main()
