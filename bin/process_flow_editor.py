from Tkinter import *
import ttk
import pdb
import json
import os
import tkFileDialog

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
        self.master.geometry('1500x1250')
        self.path = []
        self.iid = 0

        # create a menu
        self.popup = Menu(self.master, tearoff=0)
        self.popup.add_command(label="DO NOTHING", command=self.do_nothing)
        self.popup.add_command(label="Edit", command=self.enable)
        self.popup.add_separator()
        self.popup.add_command(label="Save", command=self.save)
        self.popup.add_separator()
        self.popup.add_command(label="Copy", command=self.copy)

        # create a menu
        self.tree_popup = Menu(self.master, tearoff=0)
        self.tree_popup.add_command(label="DO NOTHING", command=self.do_nothing)
        self.tree_popup.add_command(label="Move Up", command=self.move_up)
        self.tree_popup.add_command(label="Move Down", command=self.move_down)
        self.tree_popup.add_separator()
        self.tree_popup.add_command(label="Add Module Above", command=self.add_module_above)
        self.tree_popup.add_command(label="Add Module Below", command=self.add_module_below)
        self.tree_popup.add_command(label="Add Plotter Above", command=self.add_plotter_above)
        self.tree_popup.add_command(label="Add Plotter Below", command=self.add_plotter_below)
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
        Label(self.master, text="JSON Tree Display").grid(row=row, column=column)
        row += 1
        self.tree = ttk.Treeview(self.master, height=60)
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
        row = 1
        self.value = Text(self.master, height=60, font=("Helvetica", 15))
        self.value.grid(row=row, columnspan=6, rowspan=30, column=1, sticky="news")
        self.value.config(state=DISABLED)
        self.value.bind("<Button-3>", self.do_popup)

        column += 6
        row = 1
        self.open_btn = Button(self.master, text="Open File", command=self.open_file)
        self.open_btn.grid(row=row, column=column, rowspan=1, columnspan=1, sticky="news")
        row += 1
        self.pretty_print_btn = Button(self.master, text="Pretty Print", command=self.pretty_print)
        self.pretty_print_btn.grid(row=row, column=column, rowspan=1, columnspan=1, sticky="news")
        row += 1
        self.save_btn = Button(self.master, text="Save File", command=self.save_file)
        self.save_btn.grid(row=row, column=column, rowspan=1, columnspan=1, sticky="news")
        row += 1
        self.save_as_btn = Button(self.master, text="Save As", command=self.save_file_as)
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

        style = ttk.Style()
        style.configure("Treeview.Heading", font=('Helvetica', 18))
        style.configure("Treeview", font=('Helvetica', 16), rowheight=25)

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
        self.value.config(state=NORMAL)

    def move_up(self):
        self.move()

    def move_down(self):
        self.move(False)

    def move(self, up=True):
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

    def add_heatmap_panel(self):
        self.add_to_list(3)

    def add_curve_panel(self):
        self.add_to_list(4)

    def add_curve(self):
        self.add_to_list(5)

    def add_simple_curve(self):
        self.add_to_list(6)

    def add_to_list(self, list_type=1, above=True):
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
                value_list.append(json.loads(line_value.strip()))
            if isinstance(eval(value), dict):
                value = eval(value)
            else:
                value = value_list
            self.set_value(value)
        else:
            value = raw_value.strip()
            self.set_value(json.loads(value))
        self.refresh(added=False)

    def set_value(self, value):
        json_levels_list = []
        if len(self.path) > 1:
            json_levels_list.append(self.json[self.path[0]])
            for item in self.path[1:-1]:
                if "module_" in item or "panel_" in item or "curve_" in item:
                    key = int(item.split("_")[1])
                else:
                    key = item
                json_levels_list.append(json_levels_list[-1][key])
            json_levels_list[-1][self.path[-1]] = value
        else:
            self.json[self.path[-1]] = value

    def do_nothing(self):
        pass

    def refresh_from_button(self):
        self.refresh(added=False)

    def refresh(self, added=False, toggle=True):
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
                order = ["id", "output_to_file", "modules"]
                keys = sorted(value.keys(), key=order.index)
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
                key = int(item.split("_")[1])
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
        pdb.set_trace()

    def popup_window(self):
        self.w = popupWindow(self.master)
        self.master.wait_window(self.w.top)

    def save_file(self, path=None):
        pdb.set_trace()
        if path is None:
            save_path = self.json_path
        else:
            save_path = path
        # with open(save_path, 'w') as f:
        json.dump(self.json, save_path, indent=4)

    def save_file_as(self):
        extension = [('JSON File', '*.json')]
        f = tkFileDialog.asksaveasfile(initialdir=os.path.dirname(self.json_path), mode='w', defaultextension=".json",
                                       filetypes=extension)
        if f is None:  # asksaveasfile return `None` if dialog closed with "cancel".
            return
        self.save_file(path=f)

    def open_file(self):
        extension = [('JSON File', '*.json')]
        self.json_path = tkFileDialog.askopenfilename(defaultextension=".json", filetypes=extension)
        if self.json_path is None:  # asksaveasfile return `None` if dialog closed with "cancel".
            return
        self.json = json.load(open(self.json_path))
        self.refresh()

    def expand(self):
        self.open_tree_items(True)
        self.tree.selection_set(0)

    def collapse(self):
        self.open_tree_items(False)
        self.tree.selection_set(0)

    def open_tree_items(self, open_all=True):
        for id in range(self.iid):
            self.tree.item(id, open=open_all)


def main():
    g = GUI()
    g.run()

    # master = Tk()
    # e = JsonEditor(master)
    # master.mainloop()


if __name__ == "__main__":
    main()
