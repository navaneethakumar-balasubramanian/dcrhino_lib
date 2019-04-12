from Tkinter import *
import tkMessageBox
import ttk
import pdb
import json
import os
import sys
import tkFileDialog
import time
import glob
from subprocess import Popen
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.models.env_config import EnvConfig


debug_path = '/home/natal/toconvert/test2.json'
debug = False

MODULE = {
            "output_to_file": False,
            "args": {},
            "type": "empty_module"
         }

PLOTTER_MODULE = {
            "output_to_file": False,
            "args": {"panels": [None]},
            "type": "empty_module"
         }

HEATMAP_PANEL = {
                    "component": None,
                    "type": "heatmap",
                    "curves": [None],
                    "wavelet_windows_to_show": [None]
                }

CURVES_PANEL = {
                "type": "curves",
                "curves": [None]
               }

CURVE = {
                "linewidth": 0.5,
                "column_label": None,
                "label": None,
                "formula": "data*1"
               }

SIMPLE_CURVE = None


class popupWindow(object):
    def __init__(self, master):
        top = self.top = Toplevel(master)
        self.l = Label(top, text="New Argument Name")
        self.l.pack()
        self.e = Entry(top)
        self.e.pack()
        self.b = Button(top, text='Ok', command=self.cleanup)
        self.b.pack()
        self.value = None

    def cleanup(self):
        self.value = self.e.get()
        self.top.destroy()


class GUI():

    def __init__(self):
        self.master = Tk()
        self.master.title("DataCloud Json Editor")
        self.master.option_add("*Font", "TkDefaultFont 16")
        self.master.geometry('1500x1075')
        self.path = []
        self.iid = 0
        self.saved = True
        self.glob_str = None
        self.json = None
        self.env_config = EnvConfig("env_config.json")
        self.acorr_path = self.env_config.get_hole_h5_interpolated_cache_folder(
            self.env_config.__dict__["mines"].keys()[0])
        self.acorr_path = os.path.abspath(os.path.join(self.acorr_path, "..", ".."))
        self.json_dir_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "process_flows")
        if not os.path.exists(self.acorr_path):
            self.acorr_path = self.json_dir_path
        self.trace = TraceData()

        #create the file menu
        self.menubar = Menu(self.master)
        self.filemenu = Menu(self.menubar, tearoff=0)
        self.menubar.add_cascade(label="Project", menu=self.filemenu)
        self.filemenu.add_command(label="Open Data File", command=self.get_data_file)
        self.filemenu.add_command(label="Open Data Folder", command=self.get_data_path)
        self.filemenu.add_separator()
        self.filemenu.add_command(label="Exit", command=self.exit)
        self.master.config(menu=self.menubar)

        # create the text menu
        self.popup = Menu(self.master, tearoff=0)
        self.popup.add_command(label="DO NOTHING", command=self.do_nothing)
        self.popup.add_command(label="Edit", command=self.enable)
        self.popup.add_separator()
        self.popup.add_command(label="Save", command=self.save)
        self.popup.add_separator()
        self.popup.add_command(label="Copy", command=self.copy)

        # create the tree menu
        self.tree_popup = Menu(self.master, tearoff=0)
        self.tree_popup.add_command(label="DO NOTHING", command=self.do_nothing)
        self.tree_popup.add_command(label="Move Up", command=self.move_up)
        self.tree_popup.add_command(label="Move Down", command=self.move_down)
        self.tree_popup.add_separator()
        self.tree_popup.add_command(label="Add Module Above", command=self.add_module_above)
        self.tree_popup.add_command(label="Add Module Below", command=self.add_module_below)
        self.tree_popup.add_command(label="Add Plotter Above", command=self.add_plotter_above)
        self.tree_popup.add_command(label="Add Plotter Below", command=self.add_plotter_below)
        self.tree_popup.add_command(label="Duplicate", command=self.duplicate)

        self.tree_popup.add_separator()
        self.tree_popup.add_command(label="Delete Module", command=self.delete_module)
        self.tree_popup.add_separator()
        self.tree_popup.add_command(label="Add Argument", command=self.add_argument)
        self.tree_popup.add_command(label="Delete Argument", command=self.delete_argument)
        self.tree_popup.add_separator()
        self.tree_popup.add_command(label="Add Heatmap Panel", command=self.add_heatmap_panel)
        self.tree_popup.add_command(label="Add Curve Panel", command=self.add_curve_panel)
        self.tree_popup.add_command(label="Delete Panel", command=self.delete_panel)
        self.tree_popup.add_separator()
        self.tree_popup.add_command(label="Add Curve", command=self.add_curve)
        self.tree_popup.add_command(label="Add Simple Curve", command=self.add_simple_curve)
        self.tree_popup.add_command(label="Delete Curve", command=self.delete_curve)
        # column_span = 3

        row = 0
        column = 0

        Label(self.master, text="Project Data Path: ").grid(row=row, column=column, sticky="news",rowspan=4)
        column += 1
        self.sv = StringVar(self.master)
        self.sv.trace("w", lambda name, index, mode, sv=self.sv: self.set_glob_str(sv))
        self.data_path = Entry(self.master, textvariable=self.sv)
        self.data_path.grid(row=row, column=column, sticky="news", columnspan=6, rowspan=4)

        column = 0
        # Label(self.master, text="JSON Tree Display").grid(row=row, column=column)
        row = 10
        self.tree = ttk.Treeview(self.master, height=40)
        self.tree.grid(row=row, column=column, sticky="news", rowspan=30)
        self.tree.column("#0", stretch=NO, width=500)
        self.tree.heading("#0", text="Section")
        self.tree.bind('<<TreeviewSelect>>', self.tree_selection)
        self.tree.bind("<Button-3>", self.do_tree_popup)

        if debug:
            self.json_path = debug_path
            self.json = json.load(open(self.json_path))
            self.add_child_node(self.json)

        column += 1
        row = 10
        self.value = Text(self.master, height=40, font=("Helvetica", 15))
        self.value.grid(row=row, columnspan=6, rowspan=30, column=1, sticky="news")
        self.value.config(state=DISABLED)
        self.value.bind("<Button-3>", self.do_popup)

        column += 6
        row = 10
        self.open_btn = Button(self.master, text="Open JSON File", command=self.open_file)
        self.open_btn.grid(row=row, column=column, rowspan=1, columnspan=1, sticky="news")
        row += 1
        self.pretty_print_btn = Button(self.master, text="Pretty Print", command=self.pretty_print)
        self.pretty_print_btn.grid(row=row, column=column, rowspan=1, columnspan=1, sticky="news")
        row += 1
        self.save_btn = Button(self.master, text="Save JSON File", command=self.save_file)
        self.save_btn.grid(row=row, column=column, rowspan=1, columnspan=1, sticky="news")
        row += 1
        self.save_as_btn = Button(self.master, text="Save JSON As", command=self.save_file_as)
        self.save_as_btn.grid(row=row, column=column, rowspan=1, columnspan=1, sticky="news")
        # row += 1
        # self.save_as_btn = Button(self.master, text="Refresh View", command=self.refresh_from_button)
        # self.save_as_btn.grid(row=row, column=column, rowspan=1, columnspan=1, sticky="news")
        row += 1
        self.save_as_btn = Button(self.master, text="Expand All", command=self.expand)
        self.save_as_btn.grid(row=row, column=column, rowspan=1, columnspan=1, sticky="news")
        row += 1
        self.save_as_btn = Button(self.master, text="Collapse All", command=self.collapse)
        self.save_as_btn.grid(row=row, column=column, rowspan=1, columnspan=1, sticky="news")
        row += 1
        Label(self.master, text="Seconds to Process: ").grid(row=row, column=column, sticky="news")
        row += 1
        self.seconds_to_process = Entry(self.master)
        self.seconds_to_process.grid(row=row, column=column, sticky="news", columnspan=6)
        row += 1
        self.process_btn = Button(self.master, text="Process Data", command=self.process)
        self.process_btn.grid(row=row, column=column, rowspan=1, columnspan=1, sticky="news")

        style = ttk.Style()
        style.configure("Treeview.Heading", font=('Helvetica', 18))
        style.configure("Treeview", font=('Helvetica', 16), rowheight=25)

        for i in range(100):
            self.master.grid_columnconfigure(i, weight=1)
            self.master.grid_rowconfigure(i, weight=1)

    def set_glob_str(self, sv):
        self.glob_str = self.sv.get()

    def pretty_print(self):
        self.value.config(state=NORMAL)
        self.value.delete(1.0, END)
        self.value.insert(1.0, json.dumps(self.json, indent=4))
        self.value.config(state=DISABLED)

    def copy(self):
        self.value.config(state=NORMAL)
        self.master.clipboard_clear()
        self.master.clipboard_append(self.value.get(1.0, END))
        self.value.config(state=DISABLED)

    def do_popup(self, event):
        # display the popup menu
        try:
            self.popup.tk_popup(event.x_root, event.y_root, 0)
        finally:
            # make sure to release the grab (Tk 8.0a1 only)
            self.popup.grab_release()

    def do_tree_popup(self, event):
        # display the popup menu
        try:
            self.tree_popup.tk_popup(event.x_root, event.y_root, 0)
        finally:
            # make sure to release the grab (Tk 8.0a1 only)
            self.tree_popup.grab_release()

    def enable(self):
        self.saved = False
        self.value.config(state=NORMAL)

    def move_up(self):
        self.move()

    def move_down(self):
        self.move(False)

    def move(self, up=True):
        self.saved = False
        selection = self.tree.selection()
        selection_text = self.tree.item(selection)['text']

        if "module_" in selection_text or "panel_" in selection_text or "curve_" in selection_text:
            module_index = int(selection_text.split("_")[1])
            list_type = selection_text.split("_")[0]
            json_levels_list = list()
            json_levels_list.append(self.json[self.path[0]])
            for key in self.path[1:-1]:
                if "module_" in key or "panel_" in key or "curve_" in key:
                    key = int(key.split("_")[1])
                # print(key)
                json_levels_list.append(json_levels_list[-1][key])
            if up:
                index_offset = 1
                module_to_check = "{}_0".format(list_type)
            else:
                index_offset = -1
                module_to_check = "{}_{}".format(list_type, len(json_levels_list[-1])-1)
            if module_to_check != selection_text:
                # print("Moving")
                json_levels_list[-1].insert(module_index - index_offset, json_levels_list[-1].pop(module_index))
                self.refresh(added=False, toggle=False)
            # else:
            #     print("Ignoring")

    def add_module_above(self):
        self.add_to_list(1)

    def add_module_below(self):
        self.add_to_list(1, False)

    def add_plotter_above(self):
        self.add_to_list(2)

    def add_plotter_below(self):
        self.add_to_list(2, False)

    def duplicate(self):
        selection = self.tree.selection()
        selection_text = self.tree.item(selection)['text']

        if "module_" in selection_text or "panel_" in selection_text or "curve_" in selection_text:
            module_index = int(selection_text.split("_")[1])
            list_type = selection_text.split("_")[0]
            json_levels_list = list()
            json_levels_list.append(self.json[self.path[0]])
            for key in self.path[1:-1]:
                if "module_" in key or "panel_" in key or "curve_" in key:
                    key = int(key.split("_")[1])
                # print(key)
                json_levels_list.append(json_levels_list[-1][key])

            index_offset = -1
            module_to_check = "{}_{}".format(list_type, len(json_levels_list[-1]) - 1)
            if module_to_check != selection_text:
                # print("Moving")
                json_levels_list[-1].insert(module_index - index_offset, json_levels_list[-1][module_index])
                self.refresh(added=False, toggle=False)
            # else:
            #     print("Ignoring")


    def add_heatmap_panel(self):
        self.add_to_list(3)

    def add_curve_panel(self):
        self.add_to_list(4)

    def add_curve(self):
        self.add_to_list(5)

    def add_simple_curve(self):
        self.add_to_list(6)

    def add_to_list(self, list_type=1, above=True):
        self.saved = False
        if list_type == 1:
            text = "module_"
            insert_object = MODULE
        if list_type == 2:
            text = "module_"
            insert_object = PLOTTER_MODULE
        if list_type == 3:
            text = "panel_"
            insert_object = HEATMAP_PANEL
        if list_type == 4:
            text = "panel_"
            insert_object = CURVES_PANEL
        if list_type == 5:
            text = "curve_"
            insert_object = CURVE
        if list_type == 6:
            text = "curve_"
            insert_object = SIMPLE_CURVE

        selection = self.tree.selection()
        selection_text = self.tree.item(selection)["text"]
        if text in selection_text:
            index = int(selection_text.split("_")[1])
            json_levels_list = list()
            json_levels_list.append(self.json[self.path[0]])
            for key in self.path[1:-1]:
                if "module_" in key or "panel_" in key or "curve_" in key:
                    key = int(key.split("_")[1])
                print(key)
                json_levels_list.append(json_levels_list[-1][key])
            if above:
                json_levels_list[-1].insert(index, insert_object)
            else:
                index += 1
                if index > len(json_levels_list[-1]):
                    json_levels_list[-1].append(insert_object)
                else:
                    json_levels_list[-1].insert(index, insert_object)
            self.refresh(added=True)

    def add_argument(self):
        self.saved = False
        selection = self.tree.selection()
        selection_text = self.tree.item(selection)["text"]
        if "args" in selection_text:
            self.popup_window()
            if self.w.value is None:
                return
            json_levels_list = list()
            json_levels_list.append(self.json[self.path[0]])
            for key in self.path[1:]:
                if "module_" in key or "panel_" in key or "curve_" in key:
                    key = int(key.split("_")[1])
                # print(key)
                json_levels_list.append(json_levels_list[-1][key])
            json_levels_list[-1][self.w.value] = None
            self.refresh(added=True)

    def delete_curve(self):
        self.delete_other("curve_")

    def delete_panel(self):
        self.delete_other("panel_")

    def delete_module(self):
        self.delete_other("module_")

    def delete_argument(self):
        self.saved = False
        selection = self.tree.selection()
        selection_text = self.tree.item(selection)["text"]
        selection_parent = self.tree.parent(selection)
        selection_parent_text = self.tree.item(selection_parent)["text"]
        if "args" in selection_parent_text:
            json_levels_list = list()
            json_levels_list.append(self.json[self.path[0]])
            for key in self.path[1:-1]:
                if "module_" in key or "panel_" in key or "curve_" in key:
                    key = int(key.split("_")[1])
                json_levels_list.append(json_levels_list[-1][key])
            del json_levels_list[-1][selection_text]
            self.refresh(added=False)

    def delete_other(self, text_to_delete):
        self.saved = False
        selection = self.tree.selection()
        selection_text = self.tree.item(selection)["text"]
        if text_to_delete in selection_text:
            index = int(selection_text.split("_")[1])
            json_levels_list = list()
            json_levels_list.append(self.json[self.path[0]])
            for key in self.path[1:-1]:
                if "module_" in key or "panel_" in key or "curve_" in key:
                    key = int(key.split("_")[1])
                print(key)
                json_levels_list.append(json_levels_list[-1][key])
            json_levels_list[-1].pop(index)
            self.refresh(added=False)

    def save(self):
        lines = int(self.value.index('end-1c').split('.')[0])
        raw_value = self.value.get(1.0, END)
        if lines > 1:
            value = ""
            value_list = list()
            for line in range(lines):
                line_value = self.value.get(str(float(line + 1)), str(float(line + 2)))
                value += line_value.strip()
                line_value = line_value.replace("\"", "")
                line_value = line_value.strip()
                if len(line_value) > 0:
                    value_list.append(line_value.strip())
            try:
                if isinstance(json.loads(value), dict):
                    value = json.loads(value)
                else:
                    value = value_list
            except:
                value = list([x.replace("\"", "") for x in value_list])
            self.set_value(value)
        else:
            value = raw_value.strip()
            self.set_value(json.loads(value))
        self.refresh()

    def set_value(self, value):
        json_levels_list = list()
        if len(self.path) > 1:
            json_levels_list.append(self.json[self.path[0]])
            if len(self.path) > 2:
                item_list = self.path[1:-1]
                for item in item_list:
                    if "module_" in item or "panel_" in item or "curve_" in item:
                        key = int(item.split("_")[1])
                    else:
                        key = item
                    json_levels_list.append(json_levels_list[-1][key])
            last_key = self.path[-1]
            if "module_" in last_key or "panel_" in last_key or "curve_" in last_key:
                last_key = int(last_key.split("_")[1])
            json_levels_list[-1][last_key] = value
        else:
            self.json[self.path[-1]] = value

    def do_nothing(self):
        pass

    def refresh_from_button(self):
        self.refresh(added=False)

    def refresh(self, added=True, toggle=True):
        if len(self.tree.selection()) == 0:
            self.tree.delete(*self.tree.get_children())
            self.add_child_node(self.json)
            self.tree.selection_set(0)
        else:
            selection = self.tree.selection()
            selection_parent = self.tree.parent(selection)
            if added:
                selection_original = selection
            else:
                selection_original = selection_parent
            self.iid = 0
            self.value.config(state=NORMAL)
            self.value.delete(1.0, END)
            self.tree.delete(*self.tree.get_children())
            self.add_child_node(self.json)
            while selection_parent != "":
                self.tree.item(selection_parent, open=True)
                selection_parent = self.tree.parent(selection_parent)
            if toggle:
                self.tree.selection_set(selection_original)
                self.tree.item(selection_original, open=True)
            self.value.config(state=DISABLED)

    def add_child_node(self, value, parent=""):
        if type(value) is dict:
            if parent == "":
                try:
                    order = ["id", "output_to_file", "modules"]
                    keys = sorted(value.keys(), key=order.index)
                except:
                    keys = value.keys()
            else:
                keys = value.keys()
            for index, key in enumerate(keys):
                new_parent = self.tree.insert(parent, "end", self.iid, text=key)
                self.iid += 1
                self.add_child_node(value[key], new_parent)
        elif type(value) is list:
            if self.tree.item(parent)['text'] == 'modules':
                for i, item in enumerate(value):
                    new_parent = self.tree.insert(parent, "end", self.iid, text="module_{}_{}".format(i,
                                                                                                      value[i]["type"]))
                    self.iid += 1
                    self.add_child_node(item, new_parent)
            elif self.tree.item(parent)['text'] == 'panels':
                for i, item in enumerate(value):
                    new_parent = self.tree.insert(parent, "end", self.iid, text="panel_{}_{}".format(i,
                                                                                                     value[i]["type"]))
                    self.iid += 1
                    self.add_child_node(item, new_parent)
            elif self.tree.item(parent)['text'] == 'curves':
                for i, item in enumerate(value):
                    new_parent = self.tree.insert(parent, "end", self.iid, text="curve_{}".format(i))
                    self.iid += 1
                    self.add_child_node(item, new_parent)
        else:
            pass

    def get_parent_path(self, selection_id):
        parent_id = self.tree.parent(selection_id)
        self.path.append(self.tree.item(selection_id)['text'])
        if parent_id == "":
            pass
        else:
            self.get_parent_path(parent_id)

    def get_value(self):
        value_object = self.json
        reverse_path = self.path
        reverse_path.reverse()
        for item in reverse_path:
            if "module_" in item or "panel_" in item or "curve_" in item:
                tmp = item.split("_")[1]
                if tmp.isdigit():
                    key = int(tmp)
                else:
                    key = item
            else:
                key = item
            value_object = value_object[key]
        return value_object

    def tree_selection(self, event):
        self.value.config(state=DISABLED)
        self.path = []
        selection = self.tree.selection()
        self.get_parent_path(selection)
        value = self.get_value()
        self.value.config(state=NORMAL)
        self.value.delete(1.0, END)
        if isinstance(value, list):
            # pdb.set_trace()
            for item in value:
                self.value.insert(END, json.dumps(item, indent=4)+"\n")
        else:
            self.value.insert(1.0, json.dumps(value, indent=4))
        self.value.config(state=DISABLED)

    def run(self):
        self.master.mainloop()

    def popup_window(self):
        self.w = popupWindow(self.master)
        self.master.wait_window(self.w.top)

    def save_file(self, path=None):
        if path is None:
            save_path = self.json_path
        else:
            save_path = path
        with open(save_path, 'w') as f:
            json.dump(self.json, f, indent=4)
        f.close()
        self.saved = True
        self.json_path = save_path
        self.master.title("DataCloud Json Editor: {}".format(os.path.basename(self.json_path)))

    def save_file_as(self):
        extension = [('JSON File', '*.json')]
        f = tkFileDialog.asksaveasfilename(initialdir=os.path.dirname(self.json_path),
                                          defaultextension=".json",
                                       filetypes=extension)
        if f is None:  # asksaveasfile return `None` if dialog closed with "cancel".
            return
        self.save_file(path=f)

    def open_file(self):
        extension = [('JSON File', '*.json')]
        self.json_path = tkFileDialog.askopenfilename(initialdir=self.json_dir_path, defaultextension=".json",
                                                      filetypes=extension)
        if self.json_path is None:  # asksaveasfile return `None` if dialog closed with "cancel".
            return
        self.json = json.load(open(self.json_path))
        self.refresh()
        self.master.title("DataCloud Json Editor: {}".format(os.path.basename(self.json_path)))

    def expand(self):
        self.open_tree_items(True)
        self.tree.selection_set(0)

    def collapse(self):
        self.open_tree_items(False)
        self.tree.selection_set(0)

    def open_tree_items(self, open_all=True):
        for id in range(self.iid):
            self.tree.item(id, open=open_all)

    def get_data_path(self):
        dir_name = tkFileDialog.askdirectory(initialdir=self.acorr_path)
        if len(dir_name) == 0:
            return
        self.acorr_path = dir_name
        dir_name = os.path.join(dir_name, "*")
        self.data_path.delete(0, 'end')
        self.data_path.insert(0, dir_name)
        self.data_path.xview_moveto(1)
        self.glob_str = dir_name

    def get_data_file(self):
        extension = [('H5 File', '*.h5')]
        file_name = tkFileDialog.askopenfilename(initialdir=self.acorr_path, defaultextension=".h5",
                                                 filetypes=extension)
        if len(file_name) == 0:
            return
        self.acorr_path = os.path.dirname(file_name)
        self.data_path.delete(0, 'end')
        self.data_path.insert(0, file_name)
        self.data_path.xview_moveto(1)
        self.glob_str = file_name

    def process(self):
        try:
            last_file = sorted(glob.glob(self.glob_str))
            last_file = [x for x in last_file if ".h5" in x][-1]
            self.trace.load_from_h5(last_file)
            output_folder = self.env_config.get_hole_h5_processed_cache_folder(self.trace.mine_name)
            self.trace = TraceData()
            if self.saved and self.json is not None and self.glob_str is not None:
                t0 = time.time()
                seconds_to_process = False
                if str(self.seconds_to_process.get()) != "":
                    seconds_to_process = int(str(self.seconds_to_process.get()))
                    cmd = "python {} -f {} -stp {} '{}'".format(os.path.abspath('process_flow.py'), self.json_path,
                                                                seconds_to_process, self.glob_str)
                else:
                    cmd = "python {} -f {} '{}'".format(os.path.abspath('process_flow.py'), self.json_path,
                                                        self.glob_str)
                print cmd
                p = Popen(cmd, shell=True)
                while p.poll() is None:
                    time.sleep(1)
                tkMessageBox.showinfo("Processing Done", "Processing Done in {} sec".format(time.time()-t0))
            else:
                tkMessageBox.showinfo("Unable to Process", "Please make sure JSON file is loaded, modifications are "
                                                           "saved, and data path has been selected")
            os.system("xdg-open " + output_folder)
        except:
            print(sys.exc_info())

    def exit(self):
        if self.saved:
            self.master.quit()
        else:
            answer = tkMessageBox.askyesnocancel("Exit", "Save Before Exiting?")
            if answer is None:
                return
            elif answer:
                self.save_file()
            self.master.quit()


def main():
    g = GUI()
    g.run()

    # master = Tk()
    # e = JsonEditor(master)
    # master.mainloop()


if __name__ == "__main__":
    main()
