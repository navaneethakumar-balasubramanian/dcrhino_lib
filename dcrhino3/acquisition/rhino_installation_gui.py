#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Aug 24 00:58:14 2018

@author: natal
"""

import ConfigParser
from Tkinter import *
from Tkinter import _setit as RESET
import ttk
import tkFileDialog
import tkMessageBox
import tkFont
from datetime import datetime
from dcrhino3.models.metadata import StandardString,Measurement,Drill_String_Component, Metadata
# from dcrhino.real_time.metadata_dev import Metadata
import pdb
import os
import calendar
import json
import subprocess
from subprocess import Popen

from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.acquisition.constants import DATA_PATH
cfg_fname = os.path.join(PATH,"collection_daemon.cfg")

def get_rhino_ttyusb():
    # p = subprocess.check_output('ls -l /dev/serial/by-id/ | grep "usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_" | grep -Po -- "../../\K\w*"',shell=True)
    p = subprocess.check_output('ls -l /dev/serial/by-id/ | grep "UART" | grep -Po -- "../../\K\w*"',shell=True)
    return p.replace('\n','')
try:
    rhino_ttyusb = get_rhino_ttyusb()
    rhino_port = "/dev/"+rhino_ttyusb
except:
    print("Rhino hardware is not connected to USB port".upper())
    pass

# rhino_port = "dev/ttyUSB0"




config = ConfigParser.SafeConfigParser()
config.read(cfg_fname)
rhino_version = config.getfloat("COLLECTION","rhino_version")

menu_fname = os.path.join(PATH,"menus.cfg")
menus = ConfigParser.SafeConfigParser()
menus.read(menu_fname)

countries = map(StandardString,menus.get("MENUS","countries").split(","))
engineers = map(StandardString,menus.get("MENUS","engineers").split(","))
drill_types = map(StandardString,menus.get("MENUS","drill_types").split(","))
mwd_types = map(StandardString,menus.get("MENUS","mwd_types").split(","))
bit_types = map(StandardString,menus.get("MENUS","bit_types").split(","))
drill_string_component_types =map(StandardString,menus.get("MENUS","drill_string_component_types").split(","))
drill_string_component_status_options =map(StandardString,menus.get("MENUS","drill_string_component_status_options").split(","))
measurement_units_options=map(StandardString,menus.get("MENUS","measurement_units_options").split(","))
sensor_types = map(StandardString,menus.get("MENUS","sensor_types").split(","))
sensor_accelerometer_types = map(StandardString,menus.get("MENUS","sensor_accelerometer_types").split(","))
sensor_saturation_g_options = map(StandardString,menus.get("MENUS","sensor_saturation_g_options").split(","))
sensor_mount_size_options = map(StandardString,menus.get("MENUS","sensor_mount_size_options").split(","))
sensor_location_options = map(StandardString,menus.get("MENUS","sensor_location_options").split(","))
sensor_channel_options = map(StandardString,menus.get("MENUS","sensor_channel_options").split(","))
rhino_versions=map(StandardString,menus.get("MENUS","rhino_versions").split(","))


clients_fname = os.path.join(PATH,"clients.json")
clients_json = json.load(open(clients_fname, 'r'))

client_names = [StandardString(str(x["name"])) for x in clients_json["clients"]]
mine_names = ["SELECT_CLIENT_FIRST"]



class GUI():
    def __init__(self,master):
        self.loaded = False
        self.tx_configuration_process = None
        self.rx_configuration_process = None
        self.shocksub_length = 0
        row = 0

        master.title("Rhino Configuration Settings")
        master.geometry("1400x1100+30+30")
        #master.resizable(width=False, height=False)

        rows = 0
        while rows < 50:
                master.rowconfigure(rows, weight=1)
                master.columnconfigure(rows, weight=1)
                rows += 1


        nb = ttk.Notebook(master)
        nb.grid(row=row, column=0, columnspan=50, rowspan=49, sticky='NESW')
        row+=1

        page1 = ttk.Frame(nb)
        nb.add(page1, text='General')

        page2 = ttk.Frame(nb)
        nb.add(page2, text='Installation')

        page3 = ttk.Frame(nb)
        nb.add(page3, text='Processing')

        page4 = ttk.Frame(nb)
        nb.add(page4, text='Rhino')

        if rhino_version == 1.1:
            page5 = ttk.Frame(nb)
            nb.add(page5, text='Firmware')


################################################################################
#PAGE 1 COMPONENTS                                                             #
################################################################################

        Label(page1, text="Mine Informatin", fg="blue").grid(row=row)
        row += 1

        Label(page1, text="Country").grid(row=row)
        self.country = StringVar(page1)
        country_popupMenu = OptionMenu(page1, self.country, *countries)
        country_popupMenu.grid(row = row, column =1)
        row += 1

        Label(page1, text="Mining Company").grid(row=row)
        self.company = StringVar(page1)
        company_popupMenu = OptionMenu(page1, self.company, *client_names,command=self.update_mine_names)
        company_popupMenu.grid(row = row, column =1)
        row += 1

        Label(page1, text="Mine Name").grid(row=row)
        self.mine_name = StringVar(page1)
        self.mine_name_popupMenu = OptionMenu(page1, self.mine_name, *mine_names)
        self.mine_name_popupMenu.grid(row = row, column =1)
        row += 1

        Label(page1, text="DataCloud Engineer").grid(row=row)
        self.recording_engineer = StringVar(page1)
        engineer_popupMenu = OptionMenu(page1, self.recording_engineer, *engineers)
        engineer_popupMenu.grid(row = row, column =1)
        row += 1

        s = ttk.Separator(page1,orient=HORIZONTAL).grid(row=row, columnspan=50,sticky="ew")
        row+=1

        Label(page1, text="Rig Information", fg="blue").grid(row=row)
        row += 1

        Label(page1, text="Rig Model").grid(row=row)
        self.rig_model = Entry(page1)
        self.rig_model.grid(row=row, column=1)
        row += 1

        Label(page1, text="Rig Manufacturer").grid(row=row)
        self.rig_manufacturer = Entry(page1)
        self.rig_manufacturer.grid(row=row, column=1)
        row += 1

        Label(page1, text="Rig Id").grid(row=row)
        self.rig_id = Entry(page1)
        self.rig_id.grid(row=row, column=1)
        row += 1

        Label(page1, text="Drill Type").grid(row=row)
        self.drill_type = StringVar(page1)
        drill_type_popupMenu = OptionMenu(page1, self.drill_type, *drill_types)
        drill_type_popupMenu.grid(row = row, column =1)
        row += 1

        Label(page1, text="MWD Type").grid(row=row)
        self.mwd_type = StringVar(page1)
        mwd_type_popupMenu = OptionMenu(page1, self.mwd_type, *mwd_types)
        mwd_type_popupMenu.grid(row = row, column =1)
        row += 1

        Label(page1, text="Bit Type").grid(row=row)
        self.bit_type = StringVar(page1)
        bit_type_popupMenu = OptionMenu(page1, self.bit_type, *bit_types)
        bit_type_popupMenu.grid(row = row, column =1)
        row += 1

        Label(page1, text="Bit Model").grid(row=row)
        self.bit_model = Entry(page1)
        self.bit_model.grid(row=row, column=1)
        row += 1

        Label(page1, text="Bit Size").grid(row=row)
        self.bit_size = Entry(page1)
        self.bit_size.grid(row=row, column=1)
        self.bit_size_units = StringVar(page1)
        bit_size_units_popupMenu = OptionMenu(page1, self.bit_size_units, *measurement_units_options)
        bit_size_units_popupMenu.grid(row = row, column =2)
        row += 1

        Label(page1, text="Bit Installation Date").grid(row=row)
        self.bit_year = Scale(page1, from_=1970, to=datetime.now().year, orient=HORIZONTAL, label="Year")
        self.bit_year.grid(row=row,column=1)
        self.bit_month = Scale(page1, from_=1, to=12, orient=HORIZONTAL, label= "Month")
        self.bit_month.grid(row=row,column=2)
        self.bit_day = Scale(page1, from_=1, to=31, orient=HORIZONTAL, label="Day")
        self.bit_day.grid(row=row,column=3)
        row += 1

        s = ttk.Separator(page1,orient=HORIZONTAL).grid(row=row, columnspan=50,sticky="ew")
        row+=1

        Label(page1, text="Miscellaneous", fg="blue").grid(row=row)
        row += 1

        Label(page1, text="Comments").grid(row=row)
        self.comments = Text(page1,width=90,height=5)
        self.comments.grid(row=row,columnspan=6,column=1)
        row += 6
################################################################################
#PAGE 2 COMPONENTS                                                             #
################################################################################

        row = 1
        Label(page2, text="Drillstring Components", fg="blue").grid(row=row)
        row += 1

        Label(page2, text="Type").grid(row=row,column=1)
        Label(page2, text="Status").grid(row=row,column=2)
        Label(page2, text="Length").grid(row=row, column=3)
        Label(page2, text="Units").grid(row=row, column=4)
        Label(page2, text="O.D.").grid(row=row, column=5)
        Label(page2, text="Units").grid(row=row, column=6)
        row += 1

        Label(page2, text="Component 1").grid(row=row)
        self.drill_string_component1_type = StringVar(page2)
        drill_string_component1_type_popupMenu = OptionMenu(page2, self.drill_string_component1_type, *drill_string_component_types)
        drill_string_component1_type_popupMenu.grid(row = row, column =1)
        self.drill_string_component1_status = StringVar(page2)
        drill_string_component1_presence_popupMenu = OptionMenu(page2, self.drill_string_component1_status, *drill_string_component_status_options,command=self.update_ds_length)
        drill_string_component1_presence_popupMenu.grid(row = row, column =2)
        self.drill_string_component1_length_var = StringVar(page2)
        self.drill_string_component1_length_var.trace("w", lambda name, index, mode, sv=self.drill_string_component1_length_var: self.update_ds_length(sv))
        self.drill_string_component1_length = Entry(page2, textvariable=self.drill_string_component1_length_var)
        self.drill_string_component1_length.grid(row=row, column=3)
        self.drill_string_component1_units = StringVar(page2)
        drill_string_component1_units_popupMenu = OptionMenu(page2, self.drill_string_component1_units, *measurement_units_options,command=self.update_ds_length)
        drill_string_component1_units_popupMenu.grid(row = row, column =4)
        self.drill_string_component1_od = Entry(page2)
        self.drill_string_component1_od.grid(row=row, column=5)
        self.drill_string_component1_od_units = StringVar(page2)
        drill_string_component1_units_popupMenu = OptionMenu(page2, self.drill_string_component1_od_units, *measurement_units_options)
        drill_string_component1_units_popupMenu.grid(row = row, column =6)
        row += 1

        Label(page2, text="Component 2").grid(row=row)
        self.drill_string_component2_type = StringVar(page2)
        drill_string_component2_type_popupMenu = OptionMenu(page2, self.drill_string_component2_type, *drill_string_component_types)
        drill_string_component2_type_popupMenu.grid(row = row, column =1)
        self.drill_string_component2_status = StringVar(page2)
        drill_string_component2_presence_popupMenu = OptionMenu(page2, self.drill_string_component2_status, *drill_string_component_status_options,command=self.update_ds_length)
        drill_string_component2_presence_popupMenu.grid(row = row, column =2)
        self.drill_string_component2_length_var = StringVar(page2)
        self.drill_string_component2_length_var.trace("w", lambda name, index, mode, sv=self.drill_string_component2_length_var: self.update_ds_length(sv))
        self.drill_string_component2_length = Entry(page2, textvariable=self.drill_string_component2_length_var)
        self.drill_string_component2_length.grid(row=row, column=3)
        self.drill_string_component2_units = StringVar(page2)
        drill_string_component2_units_popupMenu = OptionMenu(page2, self.drill_string_component2_units, *measurement_units_options,command=self.update_ds_length)
        drill_string_component2_units_popupMenu.grid(row = row, column =4)
        self.drill_string_component2_od = Entry(page2)
        self.drill_string_component2_od.grid(row=row, column=5)
        self.drill_string_component2_od_units = StringVar(page2)
        drill_string_component2_units_popupMenu = OptionMenu(page2, self.drill_string_component2_od_units, *measurement_units_options)
        drill_string_component2_units_popupMenu.grid(row = row, column =6)
        row += 1

        Label(page2, text="Component 3").grid(row=row)
        self.drill_string_component3_type = StringVar(page2)
        drill_string_component3_type_popupMenu = OptionMenu(page2, self.drill_string_component3_type, *drill_string_component_types)
        drill_string_component3_type_popupMenu.grid(row = row, column =1)
        self.drill_string_component3_status = StringVar(page2)
        drill_string_component3_presence_popupMenu = OptionMenu(page2, self.drill_string_component3_status, *drill_string_component_status_options,command=self.update_ds_length)
        drill_string_component3_presence_popupMenu.grid(row = row, column =2)
        self.drill_string_component3_length_var = StringVar(page2)
        self.drill_string_component3_length_var.trace("w", lambda name, index, mode, sv=self.drill_string_component3_length_var: self.update_ds_length(sv))
        self.drill_string_component3_length = Entry(page2, textvariable=self.drill_string_component3_length_var)
        self.drill_string_component3_length.grid(row=row, column=3)
        self.drill_string_component3_units = StringVar(page2)
        drill_string_component3_units_popupMenu = OptionMenu(page2, self.drill_string_component3_units, *measurement_units_options,command=self.update_ds_length)
        drill_string_component3_units_popupMenu.grid(row = row, column =4)
        self.drill_string_component3_od = Entry(page2)
        self.drill_string_component3_od.grid(row=row, column=5)
        self.drill_string_component3_od_units = StringVar(page2)
        drill_string_component3_units_popupMenu = OptionMenu(page2, self.drill_string_component3_od_units, *measurement_units_options)
        drill_string_component3_units_popupMenu.grid(row = row, column =6)
        row += 1

        Label(page2, text="Component 4").grid(row=row)
        self.drill_string_component4_type = StringVar(page2)
        drill_string_component4_type_popupMenu = OptionMenu(page2, self.drill_string_component4_type, *drill_string_component_types)
        drill_string_component4_type_popupMenu.grid(row = row, column =1)
        self.drill_string_component4_status = StringVar(page2)
        drill_string_component4_presence_popupMenu = OptionMenu(page2, self.drill_string_component4_status, *drill_string_component_status_options,command=self.update_ds_length)
        drill_string_component4_presence_popupMenu.grid(row = row, column =2)
        self.drill_string_component4_length_var = StringVar(page2)
        self.drill_string_component4_length_var.trace("w", lambda name, index, mode, sv=self.drill_string_component4_length_var: self.update_ds_length(sv))
        self.drill_string_component4_length = Entry(page2, textvariable=self.drill_string_component4_length_var)
        self.drill_string_component4_length.grid(row=row, column=3)
        self.drill_string_component4_units = StringVar(page2)
        drill_string_component4_units_popupMenu = OptionMenu(page2, self.drill_string_component4_units, *measurement_units_options,command=self.update_ds_length)
        drill_string_component4_units_popupMenu.grid(row = row, column =4)
        self.drill_string_component4_od = Entry(page2)
        self.drill_string_component4_od.grid(row=row, column=5)
        self.drill_string_component4_od_units = StringVar(page2)
        drill_string_component4_units_popupMenu = OptionMenu(page2, self.drill_string_component4_od_units, *measurement_units_options)
        drill_string_component4_units_popupMenu.grid(row = row, column =6)
        row += 1

        Label(page2, text="Component 5").grid(row=row)
        self.drill_string_component5_type = StringVar(page2)
        drill_string_component5_type_popupMenu = OptionMenu(page2, self.drill_string_component5_type, *drill_string_component_types)
        drill_string_component5_type_popupMenu.grid(row = row, column =1)
        self.drill_string_component5_status = StringVar(page2)
        drill_string_component5_presence_popupMenu = OptionMenu(page2, self.drill_string_component5_status, *drill_string_component_status_options,command=self.update_ds_length)
        drill_string_component5_presence_popupMenu.grid(row = row, column =2)
        self.drill_string_component5_length_var = StringVar(page2)
        self.drill_string_component5_length_var.trace("w", lambda name, index, mode, sv=self.drill_string_component5_length_var: self.update_ds_length(sv))
        self.drill_string_component5_length = Entry(page2, textvariable=self.drill_string_component5_length_var)
        self.drill_string_component5_length.grid(row=row, column=3)
        self.drill_string_component5_units = StringVar(page2)
        drill_string_component5_units_popupMenu = OptionMenu(page2, self.drill_string_component5_units, *measurement_units_options,command=self.update_ds_length)
        drill_string_component5_units_popupMenu.grid(row = row, column =4)
        self.drill_string_component5_od = Entry(page2)
        self.drill_string_component5_od.grid(row=row, column=5)
        self.drill_string_component5_od_units = StringVar(page2)
        drill_string_component5_units_popupMenu = OptionMenu(page2, self.drill_string_component5_od_units, *measurement_units_options)
        drill_string_component5_units_popupMenu.grid(row = row, column =6)
        row += 1

        Label(page2, text="Component 6").grid(row=row)
        self.drill_string_component6_type = StringVar(page2)
        drill_string_component6_type_popupMenu = OptionMenu(page2, self.drill_string_component6_type, *drill_string_component_types)
        drill_string_component6_type_popupMenu.grid(row = row, column =1)
        self.drill_string_component6_status = StringVar(page2)
        drill_string_component6_presence_popupMenu = OptionMenu(page2, self.drill_string_component6_status, *drill_string_component_status_options,command=self.update_ds_length)
        drill_string_component6_presence_popupMenu.grid(row = row, column =2)
        self.drill_string_component6_length_var = StringVar(page2)
        self.drill_string_component6_length_var.trace("w", lambda name, index, mode, sv=self.drill_string_component6_length_var: self.update_ds_length(sv))
        self.drill_string_component6_length = Entry(page2, textvariable=self.drill_string_component6_length_var)
        self.drill_string_component6_length.grid(row=row, column=3)
        self.drill_string_component6_units = StringVar(page2)
        drill_string_component6_units_popupMenu = OptionMenu(page2, self.drill_string_component6_units, *measurement_units_options,command=self.update_ds_length)
        drill_string_component6_units_popupMenu.grid(row = row, column =4)
        self.drill_string_component6_od = Entry(page2)
        self.drill_string_component6_od.grid(row=row, column=5)
        self.drill_string_component6_od_units = StringVar(page2)
        drill_string_component6_units_popupMenu = OptionMenu(page2, self.drill_string_component6_od_units, *measurement_units_options)
        drill_string_component6_units_popupMenu.grid(row = row, column =6)
        row += 1

        Label(page2, text="Component 7").grid(row=row)
        self.drill_string_component7_type = StringVar(page2)
        drill_string_component7_type_popupMenu = OptionMenu(page2, self.drill_string_component7_type, *drill_string_component_types)
        drill_string_component7_type_popupMenu.grid(row = row, column =1)
        self.drill_string_component7_status = StringVar(page2)
        drill_string_component7_presence_popupMenu = OptionMenu(page2, self.drill_string_component7_status, *drill_string_component_status_options,command=self.update_ds_length)
        drill_string_component7_presence_popupMenu.grid(row = row, column =2)
        self.drill_string_component7_length_var = StringVar(page2)
        self.drill_string_component7_length_var.trace("w", lambda name, index, mode, sv=self.drill_string_component7_length_var: self.update_ds_length(sv))
        self.drill_string_component7_length = Entry(page2, textvariable=self.drill_string_component7_length_var)
        self.drill_string_component7_length.grid(row=row, column=3)
        self.drill_string_component7_units = StringVar(page2)
        drill_string_component7_units_popupMenu = OptionMenu(page2, self.drill_string_component7_units, *measurement_units_options,command=self.update_ds_length)
        drill_string_component7_units_popupMenu.grid(row = row, column =4)
        self.drill_string_component7_od = Entry(page2)
        self.drill_string_component7_od.grid(row=row, column=5)
        self.drill_string_component7_od_units = StringVar(page2)
        drill_string_component7_units_popupMenu = OptionMenu(page2, self.drill_string_component7_od_units, *measurement_units_options)
        drill_string_component7_units_popupMenu.grid(row = row, column =6)
        row += 1

        Label(page2, text="Component 8").grid(row=row)
        self.drill_string_component8_type = StringVar(page2)
        drill_string_component8_type_popupMenu = OptionMenu(page2, self.drill_string_component8_type, *drill_string_component_types)
        drill_string_component8_type_popupMenu.grid(row = row, column =1)
        self.drill_string_component8_status = StringVar(page2)
        drill_string_component8_presence_popupMenu = OptionMenu(page2, self.drill_string_component8_status, *drill_string_component_status_options,command=self.update_ds_length)
        drill_string_component8_presence_popupMenu.grid(row = row, column =2)
        self.drill_string_component8_length_var = StringVar(page2)
        self.drill_string_component8_length_var.trace("w", lambda name, index, mode, sv=self.drill_string_component8_length_var: self.update_ds_length(sv))
        self.drill_string_component8_length = Entry(page2, textvariable=self.drill_string_component8_length_var)
        self.drill_string_component8_length.grid(row=row, column=3)
        self.drill_string_component8_units = StringVar(page2)
        drill_string_component8_units_popupMenu = OptionMenu(page2, self.drill_string_component8_units, *measurement_units_options,command=self.update_ds_length)
        drill_string_component8_units_popupMenu.grid(row = row, column =4)
        self.drill_string_component8_od = Entry(page2)
        self.drill_string_component8_od.grid(row=row, column=5)
        self.drill_string_component8_od_units = StringVar(page2)
        drill_string_component8_units_popupMenu = OptionMenu(page2, self.drill_string_component8_od_units, *measurement_units_options)
        drill_string_component8_units_popupMenu.grid(row = row, column =6)
        row += 1

        Label(page2, text="Component 9").grid(row=row)
        self.drill_string_component9_type = StringVar(page2)
        drill_string_component9_type_popupMenu = OptionMenu(page2, self.drill_string_component9_type, *drill_string_component_types)
        drill_string_component9_type_popupMenu.grid(row = row, column =1)
        self.drill_string_component9_status = StringVar(page2)
        drill_string_component9_presence_popupMenu = OptionMenu(page2, self.drill_string_component9_status, *drill_string_component_status_options,command=self.update_ds_length)
        drill_string_component9_presence_popupMenu.grid(row = row, column =2)
        self.drill_string_component9_length_var = StringVar(page2)
        self.drill_string_component9_length_var.trace("w", lambda name, index, mode, sv=self.drill_string_component9_length_var: self.update_ds_length(sv))
        self.drill_string_component9_length = Entry(page2, textvariable=self.drill_string_component9_length_var)
        self.drill_string_component9_length.grid(row=row, column=3)
        self.drill_string_component9_units = StringVar(page2)
        drill_string_component9_units_popupMenu = OptionMenu(page2, self.drill_string_component9_units, *measurement_units_options,command=self.update_ds_length)
        drill_string_component9_units_popupMenu.grid(row = row, column =4)
        self.drill_string_component9_od = Entry(page2)
        self.drill_string_component9_od.grid(row=row, column=5)
        self.drill_string_component9_od_units = StringVar(page2)
        drill_string_component9_units_popupMenu = OptionMenu(page2, self.drill_string_component9_od_units, *measurement_units_options)
        drill_string_component9_units_popupMenu.grid(row = row, column =6)
        row += 1

        Label(page2, text="Component 10").grid(row=row)
        self.drill_string_component10_type = StringVar(page2)
        drill_string_component10_type_popupMenu = OptionMenu(page2, self.drill_string_component10_type, *drill_string_component_types)
        drill_string_component10_type_popupMenu.grid(row = row, column =1)
        self.drill_string_component10_status = StringVar(page2)
        drill_string_component10_presence_popupMenu = OptionMenu(page2, self.drill_string_component10_status, *drill_string_component_status_options,command=self.update_ds_length)
        drill_string_component10_presence_popupMenu.grid(row = row, column =2)
        self.drill_string_component10_length_var = StringVar(page2)
        self.drill_string_component10_length_var.trace("w", lambda name, index, mode, sv=self.drill_string_component10_length_var: self.update_ds_length(sv))
        self.drill_string_component10_length = Entry(page2, textvariable=self.drill_string_component10_length_var)
        self.drill_string_component10_length.grid(row=row, column=3)
        self.drill_string_component10_units = StringVar(page2)
        drill_string_component10_units_popupMenu = OptionMenu(page2, self.drill_string_component10_units, *measurement_units_options,command=self.update_ds_length)
        drill_string_component10_units_popupMenu.grid(row = row, column =4)
        self.drill_string_component10_od = Entry(page2)
        self.drill_string_component10_od.grid(row=row, column=5)
        self.drill_string_component10_od_units = StringVar(page2)
        drill_string_component10_units_popupMenu = OptionMenu(page2, self.drill_string_component10_od_units, *measurement_units_options)
        drill_string_component10_units_popupMenu.grid(row = row, column =6)
        row += 1

        Label(page2, text="Drillstring Total Length").grid(row=row)
        self.drill_string_total_length = StringVar(page2)
        Label(page2, text="", textvariable=self.drill_string_total_length,fg="green").grid(row=row,column=3)
        Label(page2, text="m",fg="green").grid(row=row,column=4)
        row += 1

        Label(page2, text="Drillstring Steel Od").grid(row=row)
        self.drill_string_steel_od = Entry(page2)
        self.drill_string_steel_od.grid(row=row, column=1)
        self.drill_string_steel_od_units = StringVar(page2)
        drill_string_steel_od_units_popupMenu = OptionMenu(page2, self.drill_string_steel_od_units, *measurement_units_options)
        drill_string_steel_od_units_popupMenu.grid(row = row, column =2)
        row += 1

        s = ttk.Separator(page2,orient=HORIZONTAL).grid(row=row, columnspan=50,sticky="ew")
        row+=1

        Label(page2, text="Sensor Information", fg="blue").grid(row=row)
        row += 1

        Label(page2, text="Sensor Installation Date").grid(row=row)
        self.sensor_year = Scale(page2, from_=1970, to=datetime.now().year, orient=HORIZONTAL, label="Year")
        self.sensor_year.grid(row=row,column=1)
        self.sensor_month = Scale(page2, from_=1, to=12, orient=HORIZONTAL, label= "Month")
        self.sensor_month.grid(row=row,column=2)
        self.sensor_day = Scale(page2, from_=1, to=31, orient=HORIZONTAL, label="Day")
        self.sensor_day.grid(row=row,column=3)
        row += 1

        Label(page2, text="Sensor Type").grid(row=row)
        self.sensor_type = StringVar(page2)
        sensor_type_popupMenu = OptionMenu(page2, self.sensor_type, *sensor_types,command=self.sensor_type_changed)
        sensor_type_popupMenu.grid(row = row, column =1)
        # row += 1

        Label(page2, text="Rhino Version").grid(row=row, column=2)
        self.rhino_version = StringVar(page2)
        self.rhino_version_popupMenu = OptionMenu(page2, self.rhino_version, *rhino_versions,command=self.rhino_version_changed)
        self.rhino_version_popupMenu.grid(row = row, column =3)
        row += 1


        Label(page2, text="Digitizer Serial Number").grid(row=row)
        self.digitizer_serial_number = Entry(page2)
        self.digitizer_serial_number.grid(row=row, column=1)
        row += 1


        Label(page2, text="Sensor Serial Number").grid(row=row)
        self.sensor_serial_number = Entry(page2)
        self.sensor_serial_number.grid(row=row, column=1)
        row += 1

        Label(page2, text="Sensor Accelerometer Type").grid(row=row)
        self.sensor_accelerometer_type = StringVar(page2)
        sensor_accelerometer_type_popupMenu = OptionMenu(page2, self.sensor_accelerometer_type, *sensor_accelerometer_types)
        sensor_accelerometer_type_popupMenu.grid(row = row, column =1)
        row += 1

        Label(page2, text="Sensor G Range").grid(row=row)
        self.sensor_saturation_g = StringVar(page2)
        sensor_saturation_g_popupMenu = OptionMenu(page2, self.sensor_saturation_g, *sensor_saturation_g_options,command=self.set_default_sensitivities)
        sensor_saturation_g_popupMenu.grid(row = row, column =1)
        row += 1

        Label(page2, text="Sensor Ideal Sampling Rate").grid(row=row)
        self.sensor_ideal_sampling_rate = Entry(page2)
        self.sensor_ideal_sampling_rate.grid(row=row, column=1)
        Label(page2, text="Hz").grid(row=row,column=2)
        row += 1

        Label(page2, text="Sensor Position from Top of Drillstring").grid(row=row)

        self.sensor_position_var = StringVar(page2)
        self.sensor_position_var.trace("w", lambda name, index, mode, sv=self.sensor_position_var: self.update_sensor_distance_to_source())
        self.sensor_position = Entry(page2, textvariable=self.sensor_position_var)
        self.sensor_position.grid(row=row, column=1)

        self.sensor_position_units = StringVar(page2)
        sensor_position_units_popupMenu = OptionMenu(page2, self.sensor_position_units, *measurement_units_options)
        sensor_position_units_popupMenu.grid(row = row, column =2)
        row += 1

        Label(page2, text="Sensor Distance to Source").grid(row=row)
        self.sensor_distance_to_source = StringVar(page2)
        self.sensor_distance_to_source_lbl = Label(page2, text="", textvariable=self.sensor_distance_to_source,
                                                   fg="green")
        self.sensor_distance_to_source_lbl.grid(row=row, column=1)
        row += 1

        Label(page2, text="Sensor Distance to Shocksub").grid(row=row)
        self.sensor_distance_to_shocksub = StringVar(page2)
        self.sensor_distance_to_shocksub_lbl = Label(page2, text="", textvariable=self.sensor_distance_to_shocksub,
                                                     fg="green")
        self.sensor_distance_to_shocksub_lbl.grid(row=row, column=1)
        row += 1

        Label(page2, text="Sensor Mount Size").grid(row=row)
        self.sensor_mount_size = StringVar(page2)
        sensor_mount_size_popupMenu = OptionMenu(page2, self.sensor_mount_size, *sensor_mount_size_options)
        sensor_mount_size_popupMenu.grid(row = row, column =1)
        row += 1

        Label(page2, text="Sensor Location on Drillstring").grid(row=row)
        self.sensor_installation_location = StringVar(page2)
        sensor_location_popupMenu = OptionMenu(page2, self.sensor_installation_location, *sensor_location_options)
        sensor_location_popupMenu.grid(row = row, column =1)
        row += 1

        Label(page2, text="Sensor Axial Axis").grid(row=row)
        self.sensor_axial_axis = StringVar(page2)
        sensor_axial_axis_popupMenu = OptionMenu(page2, self.sensor_axial_axis, *sensor_channel_options)
        sensor_axial_axis_popupMenu.grid(row = row, column =1)
        row += 1

        Label(page2, text="Sensor Tangential Axis").grid(row=row)
        self.sensor_tangential_axis = StringVar(page2)
        sensor_tangential_axis_popupMenu = OptionMenu(page2, self.sensor_tangential_axis, *sensor_channel_options)
        sensor_tangential_axis_popupMenu.grid(row = row, column =1)
        row += 1

################################################################################
#PAGE 3 COMPONENTS                                                             #
################################################################################
        row = 1

        Label(page3, text="Data Colelction", fg="blue").grid(row=row)
        row += 1

        Label(page3, text="Components to Collect").grid(row=row)
        self.component1 = IntVar()
        self.axial = Checkbutton(page3, text="Axial", command=lambda:self.toggle(self.component1))
        self.axial.grid(row=row, column=1,sticky=W)
        self.component2 = IntVar()
        self.tangential = Checkbutton(page3, text="Tangential", command=lambda:self.toggle(self.component2))
        self.tangential.grid(row=row, column=2,sticky=W)
        self.component3 = IntVar()
        self.radial = Checkbutton(page3, text="Radial", command=lambda:self.toggle(self.component3))
        self.radial.grid(row=row, column=3,sticky=W)
        row += 1

        Label(page3, text="Output Sampling Rate (Hz)").grid(row=row)
        self.output_sampling_rate = Entry(page3)
        self.output_sampling_rate.grid(row=row, column=1)
        # self.sampling_rate_label_string = StringVar(page3)
        value="Ideal Sampling Rate in Installation configuration is {} Hz".format(config.get("INSTALLATION","sensor_ideal_sampling_rate"))
        self.sampling_rate_label = Label(page3, text=value)
        self.sampling_rate_label.grid(row=row,column=2,columnspan=4)
        row += 1

        Label(page3, text="Channels per Sensor").grid(row=row)
        self.channels_per_sensor = Scale(page3, from_=1, to=3, orient=HORIZONTAL)
        self.channels_per_sensor.grid(row=row,column=1)
        row += 1

        Label(page3, text="Packet Length (bytes)").grid(row=row)
        self.packet_length = Entry(page3)
        self.packet_length.grid(row=row, column=1)
        row += 1

        Label(page3, text="Baud Rate").grid(row=row)
        self.baud_rate = Entry(page3)
        self.baud_rate.grid(row=row, column=1)
        row += 1

        s = ttk.Separator(page3,orient=HORIZONTAL).grid(row=row, columnspan=50,sticky="ew")
        row+=1

        Label(page3, text="Runtime Parameters", fg="blue").grid(row=row)
        row += 1

        Label(page3, text="Show Plots").grid(row=row)
        self.show_plots = IntVar()
        self.plots_true = Radiobutton(page3,
                      text="True",
                      padx = 20,
                      command=lambda:self.toggle(self.show_plots),
                      value=1,variable=self.show_plots)
        self.plots_true.grid(row=row,column=1,sticky=W)
        self.plots_false = Radiobutton(page3,
                      text="False",
                      padx = 20,
                      command=lambda:self.toggle(self.show_plots),
                      value=0, variable=self.show_plots)
        self.plots_false.grid(row=row,column=2,sticky=W)
        row += 1

        s = ttk.Separator(page3,orient=HORIZONTAL).grid(row=row, columnspan=50,sticky="ew")
        row+=1

        Label(page3, text="Data Unit Parameters", fg="blue").grid(row=row)
        row += 1

        Label(page3, text="Log to File").grid(row=row)
        self.log_to_file = IntVar()
        self.log_true = Radiobutton(page3,
                      text="True",
                      padx = 20,
                      command=lambda:self.toggle(self.log_to_file),
                      value=1,variable=self.log_to_file)
        self.log_true.grid(row=row,column=1,sticky=W)
        self.log_false = Radiobutton(page3,
                      text="False",
                      padx = 20,
                      command=lambda:self.toggle(self.log_to_file),
                      value=0,variable=self.log_to_file)
        self.log_false.grid(row=row,column=2,sticky=W)
        row += 1


        s = ttk.Separator(page3,orient=HORIZONTAL).grid(row=row, columnspan=50,sticky="ew")
        row+=1


        Label(page3, text="Playback Parameters", fg="blue").grid(row=row)
        row += 1

        Label(page3, text="Apply Sensitivities").grid(row=row)
        self.apply_sensitivities = IntVar()
        self.apply_sensitivities_true = Radiobutton(page3,
                      text="True",
                      padx = 20,
                      command=lambda:self.toggle(self.apply_sensitivities),
                      value=1,variable=self.apply_sensitivities)
        self.apply_sensitivities_true.grid(row=row,column=1,sticky=W)
        self.apply_sensitivities_false = Radiobutton(page3,
                      text="False",
                      padx = 20,
                      command=lambda:self.toggle(self.apply_sensitivities),
                      value=0, variable=self.apply_sensitivities)
        self.apply_sensitivities_false.grid(row=row,column=2,sticky=W)
        row += 1

        Label(page3, text="Plot Results").grid(row=row)
        self.plot_playback = IntVar()
        self.plot_playback_true = Radiobutton(page3,
                      text="True",
                      padx = 20,
                      command=lambda:self.toggle(self.plot_playback),
                      value=1,variable=self.plot_playback)
        self.plot_playback_true.grid(row=row,column=1,sticky=W)
        self.plot_playback_false = Radiobutton(page3,
                      text="False",
                      padx = 20,
                      command=lambda:self.toggle(self.plot_playback),
                      value=0, variable=self.plot_playback)
        self.plot_playback_false.grid(row=row,column=2,sticky=W)
        row += 1

        Label(page3, text="Accelerometer Maximum Voltage").grid(row=row)
        self.accelerometer_max_voltage = Entry(page3)
        self.accelerometer_max_voltage.grid(row=row, column=1)
        row += 1

        Label(page3, text="X Sensitivity (mv/g)").grid(row=row)
        self.x_sensitivity = Entry(page3)
        self.x_sensitivity.grid(row=row, column=1)
        row += 1

        Label(page3, text="Y Sensitivity (mv/g)").grid(row=row)
        self.y_sensitivity = Entry(page3)
        self.y_sensitivity.grid(row=row, column=1)
        row += 1

        Label(page3, text="Z Sensitivity (mv/g)").grid(row=row)
        self.z_sensitivity = Entry(page3)
        self.z_sensitivity.grid(row=row, column=1)
        row += 1

        Label(page3, text="IDE Data Multiplier").grid(row=row)
        self.ide_multiplier = Entry(page3)
        self.ide_multiplier.grid(row=row, column=1)
        row += 1

        s = ttk.Separator(page3,orient=HORIZONTAL).grid(row=row, columnspan=50,sticky="ew")
        row+=1

        Label(page3, text="Processing Parameters", fg="blue").grid(row=row)
        row += 1

        Label(page3, text="Deconvoluition Filter Duration").grid(row=row)
        self.deconvolution_filter_duration = Entry(page3)
        self.deconvolution_filter_duration.grid(row=row, column=1)
        row += 1

        Label(page3, text="Minimum Lag Trimmed Trace").grid(row=row)
        self.min_lag_trimmed_trace = Entry(page3)
        self.min_lag_trimmed_trace.grid(row=row, column=1)
        row += 1

        Label(page3, text="Maximum Lag Trimmed Trace").grid(row=row)
        self.max_lag_trimmed_trace = Entry(page3)
        self.max_lag_trimmed_trace.grid(row=row, column=1)
        row += 1

        Label(page3, text="Trapezoidal BPF Corner 1").grid(row=row)
        self.trapezoidal_bpf_corner_1 = Entry(page3)
        self.trapezoidal_bpf_corner_1.grid(row=row, column=1)
        row += 1

        Label(page3, text="Trapezoidal BPF Corner 2").grid(row=row)
        self.trapezoidal_bpf_corner_2 = Entry(page3)
        self.trapezoidal_bpf_corner_2.grid(row=row, column=1)
        row += 1

        Label(page3, text="Trapezoidal BPF Corner 3").grid(row=row)
        self.trapezoidal_bpf_corner_3 = Entry(page3)
        self.trapezoidal_bpf_corner_3.grid(row=row, column=1)
        row += 1

        Label(page3, text="Trapezoidal BPF Corner 4").grid(row=row)
        self.trapezoidal_bpf_corner_4 = Entry(page3)
        self.trapezoidal_bpf_corner_4.grid(row=row, column=1)
        row += 1

        Label(page3, text="Trapezoidal BPF Duration").grid(row=row)
        self.trapezoidal_bpf_duration = Entry(page3)
        self.trapezoidal_bpf_duration.grid(row=row, column=1)
        row += 1

        s = ttk.Separator(page3,orient=HORIZONTAL).grid(row=row, columnspan=50,sticky="ew")
        row+=1

        Label(page3, text="Data Transmission", fg="blue").grid(row=row)
        row += 1

        Label(page3, text="Local Folder").grid(row=row)
        self.local_folder = Entry(page3)
        self.local_folder.grid(row=row, column=1,columnspan=4,sticky="EW")
        Button(page3, text='...', command=self.select_local_folder).grid(row=row, column=5, sticky="W", pady=4)
        row += 1

        Label(page3, text="Remote Server").grid(row=row)
        self.server = Entry(page3)
        self.server.grid(row=row, column=1,columnspan=4,sticky="EW")
        row += 1

        Label(page3, text="remote_folder").grid(row=row)
        self.remote_folder = Entry(page3)
        self.remote_folder.grid(row=row, column=1, columnspan=4,sticky="EW")
        row += 1

        # Label(page3, text="Level 0 Path").grid(row=row)
        # self.level_0_path = StringVar(page2)
        # Label(page3, text="", textvariable=self.level_0_path,fg="green").grid(row=row,column=1,columnspan=3)
        # row += 1
        #
        # Label(page3, text="Level 1 Path").grid(row=row)
        # self.level_1_path = StringVar(page2)
        # Label(page3, text="", textvariable=self.level_1_path,fg="green").grid(row=row,column=1,columnspan=3)
        # row += 1

        Label(page3, text="Sleep Interval (sec)").grid(row=row)
        self.sleep_interval = Entry(page3)
        self.sleep_interval.grid(row=row, column=1)
        row += 1

################################################################################
#PAGE 4 COMPONENTS                                                             #
################################################################################
        row = 1

################################################################################
#PAGE 5 COMPONENTS                                                             #
################################################################################
        if rhino_version == 1.1:
            row = 1
            Label(page5, text="Hardware Settings", fg="blue").grid(row=row)
            row += 1

            Label(page5, text="Transmitter Configuration").grid(row=row)
            Button(page5, text='Go', command=self.run_tx_configuration).grid(row=row, column=1, sticky="W", pady=4)
            row += 1

            Label(page5, text="Receiver Configuration").grid(row=row)
            Button(page5, text='Go', command=self.run_rx_configuration).grid(row=row, column=1, sticky="W", pady=4)
            row += 1



################################################################################
#MASTER COMPONENTS                                                             #
################################################################################
        row = 51
        Button(master, text='Load File', command=self.load_from).grid(row=row, column=1, sticky=W, pady=4)
        Button(master, text='Apply Changes', command=self.save_file).grid(row=row, column=2, sticky=W, pady=4)
        Button(master, text='Save File As', command=self.save_as).grid(row=row, column=3, sticky=W, pady=4)

        for i in range(100):
            master.grid_columnconfigure(i, weight=1)
            master.grid_rowconfigure(i, weight=1)
            page1.grid_columnconfigure(i, weight=1)
            page1.grid_rowconfigure(i, weight=1)
            page2.grid_columnconfigure(i, weight=1)
            page2.grid_rowconfigure(i, weight=1)
            page3.grid_columnconfigure(i, weight=1)
            page3.grid_rowconfigure(i, weight=1)
            page4.grid_columnconfigure(i, weight=1)
            page4.grid_rowconfigure(i, weight=1)
            page5.grid_columnconfigure(i, weight=1)
            page5.grid_rowconfigure(i, weight=1)

        self.load_file()
        self.loaded = True




    def load_file(self):

        config.read(cfg_fname)
        m = Metadata(config)

        # print ("level_0",m.level_0_path())
        # print ("level_1",m.level_1_path())

        self.country.set(config.get("INSTALLATION","country"))
        # self.company.delete(0,len(self.company.get()))
        # pdb.set_trace()
        # self.company.insert(0,StandardString(config.get("INSTALLATION","company")))
        self.company.set(StandardString(config.get("INSTALLATION","company")))
        # self.mine_name.delete(0,len(self.mine_name.get()))
        # self.mine_name.insert(0,StandardString(config.get("INSTALLATION","mine_name")))
        self.mine_name.set(StandardString(config.get("INSTALLATION","mine_name")))
        self.recording_engineer.set(config.get("INSTALLATION","recording_engineer"))

        self.rig_model.delete(0,len(self.rig_model.get()))
        self.rig_model.insert(0,StandardString(config.get("INSTALLATION","rig_model")))
        self.rig_manufacturer.delete(0,len(self.rig_manufacturer.get()))
        self.rig_manufacturer.insert(0,StandardString(config.get("INSTALLATION","rig_manufacturer")))
        self.rig_id.delete(0,len(self.rig_id.get()))
        self.rig_id.insert(0,StandardString(config.get("INSTALLATION","rig_id")))

        self.drill_type.set(drill_types[config.getint("INSTALLATION","drill_type")-1])
        self.mwd_type.set(mwd_types[config.getint("INSTALLATION","mwd_type")-1])
        self.bit_type.set(bit_types[config.getint("INSTALLATION","bit_type")-1])
        self.bit_model.delete(0,len(self.bit_model.get()))
        self.bit_model.insert(0,StandardString(config.get("INSTALLATION","bit_model")))

        data = config.get("INSTALLATION","bit_size").split(',')
        measurement = Measurement(data)
        self.bit_size.delete(0,len(self.bit_size.get()))
        self.bit_size.insert(0,measurement._value)
        self.bit_size_units.set(measurement_units_options[measurement._units-1])

        value = datetime.strptime(config.get("INSTALLATION","bit_date"),"%Y-%m-%d")
        self.bit_year.set(value.year)
        self.bit_month.set(value.month)
        self.bit_day.set(value.day)

        ds_comp_type_vars = [self.drill_string_component1_type,self.drill_string_component2_type,self.drill_string_component3_type,
        self.drill_string_component4_type,self.drill_string_component5_type,self.drill_string_component6_type,
        self.drill_string_component7_type,self.drill_string_component8_type,self.drill_string_component9_type,self.drill_string_component10_type]
        ds_comp_status_vars =[self.drill_string_component1_status,self.drill_string_component2_status,self.drill_string_component3_status,
        self.drill_string_component4_status,self.drill_string_component5_status,self.drill_string_component6_status,
        self.drill_string_component7_status,self.drill_string_component8_status,self.drill_string_component9_status,self.drill_string_component10_status]
        ds_comp_length_vars =[self.drill_string_component1_length,self.drill_string_component2_length,self.drill_string_component3_length,
        self.drill_string_component4_length,self.drill_string_component5_length,self.drill_string_component6_length,
        self.drill_string_component7_length,self.drill_string_component8_length,self.drill_string_component9_length,self.drill_string_component10_length]
        ds_comp_length_units_vars=[self.drill_string_component1_units,self.drill_string_component2_units,self.drill_string_component3_units,
        self.drill_string_component4_units,self.drill_string_component5_units,self.drill_string_component6_units,
        self.drill_string_component7_units,self.drill_string_component8_units,self.drill_string_component9_units,self.drill_string_component10_units]
        ds_comp_od_vars=[self.drill_string_component1_od,self.drill_string_component2_od,self.drill_string_component3_od,
        self.drill_string_component4_od,self.drill_string_component5_od,self.drill_string_component6_od,
        self.drill_string_component7_od,self.drill_string_component8_od,self.drill_string_component9_od,self.drill_string_component10_od]
        ds_comp_od_units_vars=[self.drill_string_component1_od_units,self.drill_string_component2_od_units,self.drill_string_component3_od_units,
        self.drill_string_component4_od_units,self.drill_string_component5_od_units,self.drill_string_component6_od_units,
        self.drill_string_component7_od_units,self.drill_string_component8_od_units,self.drill_string_component9_od_units,self.drill_string_component10_od_units]

        for comp in range(10):
            comp_name = "drill_string_component"+str(comp+1)
            data = config.get("INSTALLATION",comp_name).split(',')
            self.current_component = Drill_String_Component(data)
            #print(data)
            #pdb.set_trace()
            if int(data[1]) == 0:
                status_index = 1
            elif int(data[1]) == -1:
                status_index = 2
            else:
                status_index = 0

            ds_comp_type_vars[comp].set(drill_string_component_types[self.current_component._type-1])
            ds_comp_status_vars[comp].set(drill_string_component_status_options[status_index])
            ds_comp_length_vars[comp].delete(0,len(ds_comp_length_vars[comp].get()))
            ds_comp_length_vars[comp].insert(0,self.current_component._length)
            ds_comp_length_units_vars[comp].set(measurement_units_options[self.current_component._length_units-1])
            ds_comp_od_vars[comp].delete(0,len(ds_comp_od_vars[comp].get()))
            ds_comp_od_vars[comp].insert(0,self.current_component._od)
            ds_comp_od_units_vars[comp].set(measurement_units_options[self.current_component._od_units-1])

            if self.current_component.type == 5 and self.current_component.status == 1:
                self.shocksub_length = self.current_component.length_in_meters

        self.drill_string_total_length.set(config.get("INSTALLATION","drill_string_total_length"))

        data = config.get("INSTALLATION","drill_string_steel_od").split(',')
        measurement = Measurement(data)
        self.drill_string_steel_od.delete(0,len(self.drill_string_steel_od.get()))
        self.drill_string_steel_od.insert(0,measurement._value)
        self.drill_string_steel_od_units.set(measurement_units_options[measurement._units-1])


        value = datetime.strptime(config.get("INSTALLATION","sensor_installation_date"),"%Y-%m-%d")
        self.sensor_year.set(value.year)
        self.sensor_month.set(value.month)
        self.sensor_day.set(value.day)

        self.sensor_type.set(sensor_types[config.getint("INSTALLATION","sensor_type")-1])
        self.rhino_version.set(config.get("COLLECTION","rhino_version"))

        self.digitizer_serial_number.delete(0,len(self.sensor_serial_number.get()))
        self.digitizer_serial_number.insert(0,StandardString(config.get("INSTALLATION","digitizer_serial_number")))

        self.sensor_serial_number.delete(0,len(self.sensor_serial_number.get()))
        self.sensor_serial_number.insert(0,StandardString(config.get("INSTALLATION","sensor_serial_number")))


        if config.getint("INSTALLATION","sensor_accelerometer_type") == 8:#8 is for legacy piezo type from Mide SSX and 32 is for MEMS
            self.sensor_accelerometer_type.set(sensor_accelerometer_types[0])
        elif config.getint("INSTALLATION","sensor_accelerometer_type") == 32:
            self.sensor_accelerometer_type.set(sensor_accelerometer_types[1])
        elif config.getint("INSTALLATION","sensor_accelerometer_type") == 9:
            self.sensor_accelerometer_type.set(sensor_accelerometer_types[2])

        # if config.getint("INSTALLATION","sensor_saturation_g") == 100:#8 is for legacy piezo type from Mide SSX and 32 is for MEMS
        #     self.sensor_saturation_g.set(sensor_saturation_g_options[0])
        # elif config.getint("INSTALLATION","sensor_saturation_g") == 200:
        #     self.sensor_saturation_g.set(sensor_saturation_g_options[1])
        # else:
        #     self.sensor_saturation_g.set(sensor_saturation_g_options[2])
        self.sensor_saturation_g.set(config.get("INSTALLATION","sensor_saturation_g"))

        self.sensor_mount_size.set(sensor_mount_size_options[config.getint("INSTALLATION","sensor_mount_size")-1])
        self.sensor_installation_location.set(sensor_location_options[config.getint("INSTALLATION","sensor_installation_location")-1])

        self.sensor_ideal_sampling_rate.delete(0,len(self.sensor_ideal_sampling_rate.get()))
        self.sensor_ideal_sampling_rate.insert(0,config.get("INSTALLATION","sensor_ideal_sampling_rate"))

        data = config.get("INSTALLATION","sensor_position").split(',')
        measurement = Measurement(data)
        self.sensor_position.delete(0,len(self.sensor_position.get()))
        self.sensor_position.insert(0,measurement._value)
        self.sensor_position_units.set(measurement_units_options[measurement._units-1])

        self.sensor_distance_to_source.set("{} m".format(self.calculate_sensor_distance_to_source()))
        self.sensor_distance_to_shocksub.set("{} m".format(self.calculate_sensor_distance_to_shocksub()))


        self.sensor_axial_axis.set(sensor_channel_options[config.getint("INSTALLATION","sensor_axial_axis")-1])
        self.sensor_tangential_axis.set(sensor_channel_options[config.getint("INSTALLATION","sensor_tangential_axis")-1])

        self.comments.delete(1.0, END)
        self.comments.insert(1.0, config.get("INSTALLATION","comments"))



################################################################################
#LOAD PROCESSING PARAMETERS                                                    #
################################################################################

        collection = config.get("COLLECTION","components_to_collect").split(",")
        if "axial" in collection:
            self.component1.set(1)
            self.axial.select()
        if "tangential" in collection:
            self.component2.set(1)
            self.tangential.select()
        if "radial" in collection:
            self.component3.set(1)
            self.radial.select()

        # self.trace_length.set(config.getint("COLLECTION","trace_length_in_seconds"))
        self.output_sampling_rate.delete(0,len(self.output_sampling_rate.get()))
        self.output_sampling_rate.insert(0,config.getint("COLLECTION","output_sampling_rate"))
        self.channels_per_sensor.set(config.getint("COLLECTION","channels_per_sensor"))

        packet_length = config.get("COLLECTION","packet_length","22")
        self.packet_length.delete(0,len(self.packet_length.get()))
        self.packet_length.insert(0,packet_length)

        baud_rate = config.get("COLLECTION","baud_rate","921600")
        self.baud_rate.delete(0,len(self.baud_rate.get()))
        self.baud_rate.insert(0,baud_rate)

        #read the Runtime Parameters
        plots = config.getboolean("RUNTIME","show_plots")
        if plots == False:
            self.show_plots.set(0)
            self.plots_false.select()
        else:
            self.show_plots.set(1)
            self.plots_true.select()

        #read the DataUnit Parameters
        log = config.getboolean("DATAUNIT","log_to_file")
        if log == False:
            self.log_to_file.set(0)
            self.log_false.select()
        else:
            self.log_to_file.set(1)
            self.log_true.select()

        #read the Playback Parameters
        apply = config.getboolean("PLAYBACK","apply_sensitivities")
        if apply == False:
            self.apply_sensitivities.set(0)
            self.apply_sensitivities_false.select()
        else:
            self.apply_sensitivities.set(1)
            self.apply_sensitivities_true.select()

        plot_playback = config.getboolean("PLAYBACK","show_plots")
        if plot_playback == False:
            self.plot_playback.set(0)
            self.plot_playback_false.select()
        else:
            self.plot_playback.set(1)
            self.plot_playback_true.select()

        accelerometer_max_voltage = config.get("PLAYBACK","accelerometer_max_voltage")
        x_sensitivity = config.get("PLAYBACK","x_sensitivity")
        y_sensitivity = config.get("PLAYBACK","y_sensitivity")
        z_sensitivity = config.get("PLAYBACK","z_sensitivity")
        ide_multiplier = config.get("PLAYBACK","ide_multiplier")
        self.accelerometer_max_voltage.delete(0,len(self.accelerometer_max_voltage.get()))
        self.x_sensitivity.delete(0,len(self.x_sensitivity.get()))
        self.y_sensitivity.delete(0,len(self.y_sensitivity.get()))
        self.z_sensitivity.delete(0,len(self.z_sensitivity.get()))
        self.ide_multiplier.delete(0,len(self.ide_multiplier.get()))
        self.accelerometer_max_voltage.insert(0,accelerometer_max_voltage)
        self.x_sensitivity.insert(0,x_sensitivity)
        self.y_sensitivity.insert(0,y_sensitivity)
        self.z_sensitivity.insert(0,z_sensitivity)
        self.ide_multiplier.insert(0,ide_multiplier)

        #read the Processing Parameters
        deconvolution_filter_duration =config.getfloat("PROCESSING","deconvolution_filter_duration")
        self.deconvolution_filter_duration.delete(0,len(self.deconvolution_filter_duration.get()))
        self.deconvolution_filter_duration.insert(0,deconvolution_filter_duration)

        min_lag_trimmed_trace =config.getfloat("PROCESSING","min_lag_trimmed_trace")
        self.min_lag_trimmed_trace.delete(0,len(self.min_lag_trimmed_trace.get()))
        self.min_lag_trimmed_trace.insert(0,min_lag_trimmed_trace)

        max_lag_trimmed_trace =config.getfloat("PROCESSING","max_lag_trimmed_trace")
        self.max_lag_trimmed_trace.delete(0,len(self.max_lag_trimmed_trace.get()))
        self.max_lag_trimmed_trace.insert(0,max_lag_trimmed_trace)

        trapezoidal_bpf_corner_1 =config.getfloat("PROCESSING","trapezoidal_bpf_corner_1")
        self.trapezoidal_bpf_corner_1.delete(0,len(self.trapezoidal_bpf_corner_1.get()))
        self.trapezoidal_bpf_corner_1.insert(0,trapezoidal_bpf_corner_1)

        trapezoidal_bpf_corner_2 =config.getfloat("PROCESSING","trapezoidal_bpf_corner_2")
        self.trapezoidal_bpf_corner_2.delete(0,len(self.trapezoidal_bpf_corner_2.get()))
        self.trapezoidal_bpf_corner_2.insert(0,trapezoidal_bpf_corner_2)

        trapezoidal_bpf_corner_3 =config.getfloat("PROCESSING","trapezoidal_bpf_corner_3")
        self.trapezoidal_bpf_corner_3.delete(0,len(self.trapezoidal_bpf_corner_3.get()))
        self.trapezoidal_bpf_corner_3.insert(0,trapezoidal_bpf_corner_3)

        trapezoidal_bpf_corner_4 =config.getfloat("PROCESSING","trapezoidal_bpf_corner_4")
        self.trapezoidal_bpf_corner_4.delete(0,len(self.trapezoidal_bpf_corner_4.get()))
        self.trapezoidal_bpf_corner_4.insert(0,trapezoidal_bpf_corner_4)

        trapezoidal_bpf_duration = config.getfloat("PROCESSING","trapezoidal_bpf_duration")
        self.trapezoidal_bpf_duration.delete(0,len(self.trapezoidal_bpf_duration.get()))
        self.trapezoidal_bpf_duration.insert(0,trapezoidal_bpf_duration)

        local_folder = config.get("DATA_TRANSMISSION","local_folder",DATA_PATH)
        if len(local_folder) == 0:
            local_folder = DATA_PATH

        self.local_folder.delete(0,len(self.local_folder.get()))
        self.local_folder.insert(0,local_folder)
        self.local_folder.xview_moveto(1.0)

        server = config.get("DATA_TRANSMISSION","server","deploy@13.77.162.25")
        self.server.delete(0,len(self.server.get()))
        self.server.insert(0,server)


        remote_folder = config.get("DATA_TRANSMISSION","remote_folder","/data_blob/")
        self.remote_folder.delete(0,len(self.remote_folder.get()))
        self.remote_folder.insert(0,remote_folder)

        # self.level_0_path.set(os.path.join(remote_folder,m.level_0_path()))
        # self.level_1_path.set(os.path.join(remote_folder,m.level_1_path()))

        sleep_interval = config.get("DATA_TRANSMISSION","sleep_interval","60")
        self.sleep_interval.delete(0,len(self.sleep_interval.get()))
        self.sleep_interval.insert(0,sleep_interval)

        mine_names = self.update_mine_names(clear_selection=False)
        print("File Loaded Successfully")



    def save_file(self):

        if float(self.sensor_distance_to_shocksub.get().split(" ")[0]) < 0 or \
                float(self.sensor_distance_to_source.get().split(" ")[0]) < 0:
            tkMessageBox.showinfo("Short between the chair and the keyboard",
                                  "Config File Error. Unable to save file. Check errors on drill string lengths")
            return

        config.set("INSTALLATION","country",self.country.get())
        config.set("INSTALLATION","company",self.company.get())
        config.set("INSTALLATION","mine_name",self.mine_name.get())
        config.set("INSTALLATION","recording_engineer",self.recording_engineer.get())
        config.set("INSTALLATION","rig_model",self.rig_model.get())
        config.set("INSTALLATION","rig_manufacturer",self.rig_manufacturer.get())
        config.set("INSTALLATION","rig_id",self.rig_id.get())
        config.set("INSTALLATION","drill_type",str(drill_types.index(self.drill_type.get())+1))
        config.set("INSTALLATION","mwd_type",str(mwd_types.index(self.mwd_type.get())+1))
        config.set("INSTALLATION","bit_type",str(bit_types.index(self.bit_type.get())+1))
        config.set("INSTALLATION","bit_model",self.bit_model.get())

        m = Measurement((self.bit_size.get(),measurement_units_options.index(self.bit_size_units.get())+1))
        config.set("INSTALLATION","bit_size",str(m))



        config.set("INSTALLATION","bit_date",self.get_date("bit"))
        config.set("INSTALLATION","drill_string_total_length",self.drill_string_total_length.get())


        dsc = Drill_String_Component((drill_string_component_types.index(self.drill_string_component1_type.get())+1,self.get_status_from_index(drill_string_component_status_options.index(self.drill_string_component1_status.get())+1),self.drill_string_component1_length.get(),measurement_units_options.index(self.drill_string_component1_units.get())+1,self.drill_string_component1_od.get(),measurement_units_options.index(self.drill_string_component1_od_units.get())+1))
        config.set("INSTALLATION","drill_string_component1",str(dsc))

        dsc = Drill_String_Component((drill_string_component_types.index(self.drill_string_component2_type.get())+1,self.get_status_from_index(drill_string_component_status_options.index(self.drill_string_component2_status.get())+1),self.drill_string_component2_length.get(),measurement_units_options.index(self.drill_string_component2_units.get())+1,self.drill_string_component2_od.get(),measurement_units_options.index(self.drill_string_component2_od_units.get())+1))
        config.set("INSTALLATION","drill_string_component2",str(dsc))

        dsc = Drill_String_Component((drill_string_component_types.index(self.drill_string_component3_type.get())+1,self.get_status_from_index(drill_string_component_status_options.index(self.drill_string_component3_status.get())+1),self.drill_string_component3_length.get(),measurement_units_options.index(self.drill_string_component3_units.get())+1,self.drill_string_component3_od.get(),measurement_units_options.index(self.drill_string_component3_od_units.get())+1))
        config.set("INSTALLATION","drill_string_component3",str(dsc))

        dsc = Drill_String_Component((drill_string_component_types.index(self.drill_string_component4_type.get())+1,self.get_status_from_index(drill_string_component_status_options.index(self.drill_string_component4_status.get())+1),self.drill_string_component4_length.get(),measurement_units_options.index(self.drill_string_component4_units.get())+1,self.drill_string_component4_od.get(),measurement_units_options.index(self.drill_string_component4_od_units.get())+1))
        config.set("INSTALLATION","drill_string_component4",str(dsc))

        dsc = Drill_String_Component((drill_string_component_types.index(self.drill_string_component5_type.get())+1,self.get_status_from_index(drill_string_component_status_options.index(self.drill_string_component5_status.get())+1),self.drill_string_component5_length.get(),measurement_units_options.index(self.drill_string_component5_units.get())+1,self.drill_string_component5_od.get(),measurement_units_options.index(self.drill_string_component5_od_units.get())+1))
        config.set("INSTALLATION","drill_string_component5",str(dsc))

        dsc = Drill_String_Component((drill_string_component_types.index(self.drill_string_component6_type.get())+1,self.get_status_from_index(drill_string_component_status_options.index(self.drill_string_component6_status.get())+1),self.drill_string_component6_length.get(),measurement_units_options.index(self.drill_string_component6_units.get())+1,self.drill_string_component6_od.get(),measurement_units_options.index(self.drill_string_component6_od_units.get())+1))
        config.set("INSTALLATION","drill_string_component6",str(dsc))

        dsc = Drill_String_Component((drill_string_component_types.index(self.drill_string_component7_type.get())+1,self.get_status_from_index(drill_string_component_status_options.index(self.drill_string_component7_status.get())+1),self.drill_string_component7_length.get(),measurement_units_options.index(self.drill_string_component7_units.get())+1,self.drill_string_component7_od.get(),measurement_units_options.index(self.drill_string_component7_od_units.get())+1))
        config.set("INSTALLATION","drill_string_component7",str(dsc))

        dsc = Drill_String_Component((drill_string_component_types.index(self.drill_string_component8_type.get())+1,self.get_status_from_index(drill_string_component_status_options.index(self.drill_string_component8_status.get())+1),self.drill_string_component8_length.get(),measurement_units_options.index(self.drill_string_component8_units.get())+1,self.drill_string_component8_od.get(),measurement_units_options.index(self.drill_string_component8_od_units.get())+1))
        config.set("INSTALLATION","drill_string_component8",str(dsc))

        dsc = Drill_String_Component((drill_string_component_types.index(self.drill_string_component9_type.get())+1,self.get_status_from_index(drill_string_component_status_options.index(self.drill_string_component9_status.get())+1),self.drill_string_component9_length.get(),measurement_units_options.index(self.drill_string_component9_units.get())+1,self.drill_string_component9_od.get(),measurement_units_options.index(self.drill_string_component9_od_units.get())+1))
        config.set("INSTALLATION","drill_string_component9",str(dsc))

        dsc = Drill_String_Component((drill_string_component_types.index(self.drill_string_component10_type.get())+1,self.get_status_from_index(drill_string_component_status_options.index(self.drill_string_component10_status.get())+1),self.drill_string_component10_length.get(),measurement_units_options.index(self.drill_string_component10_units.get())+1,self.drill_string_component10_od.get(),measurement_units_options.index(self.drill_string_component10_od_units.get())+1))
        config.set("INSTALLATION","drill_string_component10",str(dsc))

        m = Measurement((self.drill_string_steel_od.get(),measurement_units_options.index(self.drill_string_steel_od_units.get())+1))
        config.set("INSTALLATION","drill_string_steel_od",str(m))

        config.set("INSTALLATION","sensor_type",str(sensor_types.index(self.sensor_type.get())+1))
        config.set("COLLECTION","rhino_version",str(self.rhino_version.get()))
        config.set("INSTALLATION","digitizer_serial_number",self.digitizer_serial_number.get())
        config.set("INSTALLATION","sensor_serial_number",self.sensor_serial_number.get())
        config.set("INSTALLATION","sensor_accelerometer_type",self.get_accelerometer_channel(self.sensor_accelerometer_type.get()))
        config.set("INSTALLATION","sensor_ideal_sampling_rate",self.sensor_ideal_sampling_rate.get())
        config.set("INSTALLATION","sensor_saturation_g",self.sensor_saturation_g.get())

        m = Measurement((self.sensor_position.get(),measurement_units_options.index(self.sensor_position_units.get())+1))
        config.set("INSTALLATION","sensor_position",str(m))

        config.set("INSTALLATION","sensor_axial_axis",str(sensor_channel_options.index(self.sensor_axial_axis.get())+1))
        config.set("INSTALLATION","sensor_tangential_axis",str(sensor_channel_options.index(self.sensor_tangential_axis.get())+1))
        config.set("INSTALLATION","sensor_mount_size",str(sensor_mount_size_options.index(self.sensor_mount_size.get())+1))
        config.set("INSTALLATION","sensor_installation_location",str(sensor_location_options.index(self.sensor_installation_location.get())+1))
        config.set("INSTALLATION","sensor_installation_date",self.get_date("sensor"))
        config.set("INSTALLATION","comments",self.comments.get(1.0,END))

################################################################################
#SAVE PROCESSING PARAMETERS                                                    #
################################################################################

        collection = []
        if self.component1.get() == 1:
            collection.append("axial")
        if self.component2.get() == 1:
            collection.append("tangential")
        if self.component3.get() == 1:
            collection.append("radial")

        value = ",".join(collection)
        config.set("COLLECTION","components_to_collect",value)
        config.set("COLLECTION","output_sampling_rate",str(self.output_sampling_rate.get()))
        config.set("COLLECTION","channels_per_sensor",str(self.channels_per_sensor.get()))
        config.set("COLLECTION","packet_length",str(self.packet_length.get()))
        config.set("COLLECTION","baud_rate",str(self.baud_rate.get()))

        #Set the Runtime Parameters
        if self.show_plots.get() == 0:
            value = False
        else:
            value = True
        config.set("RUNTIME","show_plots",str(value))

        if self.log_to_file.get() == 0:
            value = False
        else:
            value = True
        config.set("DATAUNIT","log_to_file",str(value))

        #set the Playback Parameters
        if self.apply_sensitivities.get() == 0:
            value = False
        else:
            value = True
        config.set("PLAYBACK","apply_sensitivities",str(value))

        if self.plot_playback.get() == 0:
            value = False
        else:
            value = True
        config.set("PLAYBACK","show_plots",str(value))

        config.set("PLAYBACK","accelerometer_max_voltage",str(round(float(self.accelerometer_max_voltage.get()),1)))
        config.set("PLAYBACK","x_sensitivity",self.format_numeric_value(self.x_sensitivity.get()))
        config.set("PLAYBACK","y_sensitivity",self.format_numeric_value(self.x_sensitivity.get()))
        config.set("PLAYBACK","z_sensitivity",self.format_numeric_value(self.z_sensitivity.get()))
        config.set("PLAYBACK","ide_multiplier",self.format_numeric_value(self.ide_multiplier.get()))

        #read the Processing Parameters
        config.set("PROCESSING","deconvolution_filter_duration",str(round(float(self.deconvolution_filter_duration.get()),3)))
        config.set("PROCESSING","min_lag_trimmed_trace",str(round(float(self.min_lag_trimmed_trace.get()),3)))
        config.set("PROCESSING","max_lag_trimmed_trace",str(round(float(self.max_lag_trimmed_trace.get()),3)))
        config.set("PROCESSING","trapezoidal_bpf_corner_1",str(round(float(self.trapezoidal_bpf_corner_1.get()),1)))
        config.set("PROCESSING","trapezoidal_bpf_corner_2",str(round(float(self.trapezoidal_bpf_corner_2.get()),1)))
        config.set("PROCESSING","trapezoidal_bpf_corner_3",str(round(float(self.trapezoidal_bpf_corner_3.get()),1)))
        config.set("PROCESSING","trapezoidal_bpf_corner_4",str(round(float(self.trapezoidal_bpf_corner_4.get()),1)))
        config.set("PROCESSING","trapezoidal_bpf_duration",str(round(float(self.trapezoidal_bpf_duration.get()),3)))


        folder = str(self.local_folder.get())
        if folder[-1] != "/":
            folder = folder + "/"
        config.set("DATA_TRANSMISSION","local_folder",folder)

        folder = str(self.remote_folder.get())
        if folder[-1] != "/":
            folder = folder + "/"
        config.set("DATA_TRANSMISSION","remote_folder",folder)
        config.set("DATA_TRANSMISSION","server",self.server.get())
        config.set("DATA_TRANSMISSION","sleep_interval",str(self.sleep_interval.get()))


        with open(cfg_fname, 'w') as configfile:
            config.write(configfile)

        print("File Saved Successfully")


    def format_numeric_value(self,value):
        value = float(value)
        if value < 1.0:
            value = round(value,3)
        else:
            value = round(value,2)
        return str(value)

    def update_ds_length(self,sv):
        #print (sv)
        if self.loaded:
            ds_comp_length_vars =[self.drill_string_component1_length,self.drill_string_component2_length,self.drill_string_component3_length,
            self.drill_string_component4_length,self.drill_string_component5_length,self.drill_string_component6_length,
            self.drill_string_component7_length,self.drill_string_component8_length,self.drill_string_component9_length,self.drill_string_component10_length]
            ds_comp_length_units_vars=[self.drill_string_component1_units,self.drill_string_component2_units,self.drill_string_component3_units,
            self.drill_string_component4_units,self.drill_string_component5_units,self.drill_string_component6_units,
            self.drill_string_component7_units,self.drill_string_component8_units,self.drill_string_component9_units,self.drill_string_component10_units]
            ds_comp_status_vars =[self.drill_string_component1_status,self.drill_string_component2_status,self.drill_string_component3_status,
            self.drill_string_component4_status,self.drill_string_component5_status,self.drill_string_component6_status,
            self.drill_string_component7_status,self.drill_string_component8_status,self.drill_string_component9_status,self.drill_string_component10_status]
            ds_comp_type_vars = [self.drill_string_component1_type, self.drill_string_component2_type,
                                 self.drill_string_component3_type, self.drill_string_component4_type,
                                 self.drill_string_component5_type, self.drill_string_component6_type,
                                 self.drill_string_component7_type, self.drill_string_component8_type,
                                 self.drill_string_component9_type, self.drill_string_component10_type]
            total = 0

            for comp in range(10):
                if drill_string_component_status_options.index(ds_comp_status_vars[comp].get())+1 != 3:
                    value = ds_comp_length_vars[comp].get()
                    units = measurement_units_options.index(ds_comp_length_units_vars[comp].get())+1
                    if value == "" or units == "":
                        return
                    m = Measurement((value, units))
                    if ds_comp_type_vars[comp].get() == "SHOCK_SUB":
                        self.shocksub_length = m.value_in_meters()
                    total += m.value_in_meters()

            total = round(total, 2)
            self.drill_string_total_length.set(total)
            self.update_sensor_distance_to_source()
            return

    def update_sensor_distance_to_source(self):
        if self.loaded:
            value = self.sensor_position_var.get()
            units = measurement_units_options.index(self.sensor_position_units.get())+1
            if value == "" or units == "":
                return

            distance = self.calculate_sensor_distance_to_source()
            if distance < 0:
                self.sensor_distance_to_source_lbl.config(fg="red")
            else:
                self.sensor_distance_to_source_lbl.config(fg="green")
            self.sensor_distance_to_source.set("{} m".format(distance))
            self.update_sensor_distance_to_shocksub()


    def update_sensor_distance_to_shocksub(self):
        distance = self.calculate_sensor_distance_to_shocksub()
        if distance < 0:
            self.sensor_distance_to_shocksub_lbl.config(fg="red")
        else:
            self.sensor_distance_to_shocksub_lbl.config(fg="green")

        self.sensor_distance_to_shocksub.set("{} m".format(distance))

    def update_mine_names(self,sv=None,clear_selection=True):
        # pdb.set_trace()
        selected_client = self.company.get()
        json_index = client_names.index(selected_client)
        m_names = clients_json["clients"][json_index]["mines"]
        menu = self.mine_name_popupMenu["menu"]
        menu.delete(0, "end")
        for name in m_names:
            command=RESET(self.mine_name, name)
            menu.add_command(label=name,command=command)
        if clear_selection:
            self.mine_name.set("")



    def select_local_folder(self):
        self.load_file()
        local_folder = config.get("DATA_TRANSMISSION","local_folder")
        f = tkFileDialog.askdirectory(initialdir = local_folder)
        if len(f) == 0:
            return
        self.local_folder.delete(0,len(self.local_folder.get()))
        self.local_folder.insert(0,f)
        return

    def toggle(self,var):
        var.set(not var.get())

    def calculate_sensor_distance_to_source(self):
        m = Measurement((float(self.sensor_position.get()), measurement_units_options.index(
            self.sensor_position_units.get())+1))
        return round(float(self.drill_string_total_length.get()) - m.value_in_meters(), 2)

    def calculate_sensor_distance_to_shocksub(self):
        sensor_position = Measurement((float(self.sensor_position.get()), measurement_units_options.index(
            self.sensor_position_units.get())+1))
        return round(sensor_position.value_in_meters() - self.shocksub_length, 2)

    def create_ts(self):
        dt = [self.year.get(),self.month.get(),self.day.get(),self.hour.get(),self.minute.get(),self.second.get()]
        dt = datetime(int(dt[0]),int(dt[1]),int(dt[2]),int(dt[3]),int(dt[4]),int(dt[5]))
        value = calendar.timegm(dt.utctimetuple())
        return value

    def update_ts_label(self,*args):
        self.timestamp.set(str(self.create_ts()))

    def get_status_from_index(self,index):
        if index == 3:
            return -1
        elif index == 2:
            return 0
        else:
            return 1

    def save_as(self):
        extension = [('Config File','*.cfg')]
        f = tkFileDialog.asksaveasfile(initialdir = PATH, mode='w', defaultextension=".cfg",filetypes = extension)
        if f is None: # asksaveasfile return `None` if dialog closed with "cancel".
            return
        global cfg_fname
        tmp_cfg = cfg_fname
        cfg_fname = f.name # starts from `1.0`, not `0.0`
        self.save_file()
        cfg_fname =tmp_cfg

    def load_from(self):
        extension = [('Config File','*.cfg')]
        f = tkFileDialog.askopenfilename(initialdir = PATH, defaultextension=".cfg",filetypes = extension)
        if f is None: # asksaveasfile return `None` if dialog closed with "cancel".
            return
        global cfg_fname
        tmp_cfg = cfg_fname
        cfg_fname = f # starts from `1.0`, not `0.0`
        self.load_file()
        cfg_fname =tmp_cfg

    def get_accelerometer_channel(self,accel_type):
        if accel_type == "PIEZO":
            return '8'
        elif accel_type == "MEMS":
            return '32'
        elif accel_type == "PIEZORESISTIVE":
            return '9'
        else:
            return None

    def get_date(self,slider):
        if slider == "bit":
            year = self.bit_year.get()
            month = self.bit_month.get()
            day = self.bit_day.get()
        elif slider == "sensor":
            year = self.sensor_year.get()
            month = self.sensor_month.get()
            day = self.sensor_day.get()
        else:
            year = 1970
            month = 1
            day = 1
        return datetime(year,month,day).strftime("%Y-%m-%d")

    def set_default_sensitivities(self,sv):
        if int(self.sensor_saturation_g.get()) == 25:
            sensitivity = 50
        elif int(self.sensor_saturation_g.get()) == 50:
            sensitivity = 25
        elif int(self.sensor_saturation_g.get()) == 100:
            sensitivity = 12.5
        elif int(self.sensor_saturation_g.get()) == 200:
            sensitivity = 6.25
        elif int(self.sensor_saturation_g.get()) == 500:
            sensitivity = 2.5
        elif int(self.sensor_saturation_g.get()) == 2000:
            sensitivity = 0.625
        else:
            sensitivity = 999
        self.x_sensitivity.delete(0,len(self.x_sensitivity.get()))
        self.x_sensitivity.insert(0,str(sensitivity))
        self.y_sensitivity.delete(0,len(self.y_sensitivity.get()))
        self.y_sensitivity.insert(0,str(sensitivity))
        self.z_sensitivity.delete(0,len(self.z_sensitivity.get()))
        self.z_sensitivity.insert(0,str(sensitivity))

    def set_default_orientation(self):
        if self.sensor_type.get() == "RHINO":
            self.sensor_axial_axis.set("Y")
            self.sensor_tangential_axis.set("X")
        elif self.sensor_type.get() == "SSX" or self.sensor_type.get() == "SSS":
            self.sensor_axial_axis.set("X")
            self.sensor_tangential_axis.set("Y")

    def run_rx_configuration(self):
        if self.rx_configuration_process == None:
            #self.rx_configuration_process = Popen(['python', os.path.abspath(os.path.join(PATH,"phyzika","rh_rx_config_ui.py {}".format(rhino_port)))])
            cmd = "source acivate py36; python {} {}".format(os.path.join(PATH,"phyzika","rh_rx_config_ui.py"),rhino_port)
            self.rx_configuration_process = Popen(cmd,shell=True)

    def run_tx_configuration(self):
        if self.tx_configuration_process == None:
            #self.tx_configuration_process = Popen(['python', os.path.abspath(os.path.join(PATH,"phyzika","rh_config.py {}".format(rhino_port)))])
            cmd = "source acivate py36; python {} {}".format(os.path.join(PATH,"phyzika","rh_config.py"),rhino_port)
            self.tx_configuration_process = Popen(cmd,shell=True)

    def toggle_rhino_version(self):
        if self.sensor_type.get() == "RHINO":
            self.rhino_version_popupMenu.config(state="normal")
        else:
            self.rhino_version_popupMenu.config(state="disabled")

    def rhino_version_changed(self,sv):
        if float(self.rhino_version.get()) == 1.0:
            packet_length = '22'
            sampling_rate = '2800'
            accelerometer_max_voltage = '3.3'

        else:
            packet_length = '21'
            sampling_rate = '4000'
            accelerometer_max_voltage = '5.0'

        self.packet_length.delete(0,len(self.packet_length.get()))
        self.packet_length.insert(0,packet_length)

        self.accelerometer_max_voltage.delete(0,len(self.accelerometer_max_voltage.get()))
        self.accelerometer_max_voltage.insert(0,accelerometer_max_voltage)

        self.output_sampling_rate.delete(0,len(self.output_sampling_rate.get()))
        self.output_sampling_rate.insert(0,sampling_rate)

        self.sensor_ideal_sampling_rate.delete(0,len(self.sensor_ideal_sampling_rate.get()))
        self.sensor_ideal_sampling_rate.insert(0,sampling_rate)

        self.sampling_rate_label["text"]="Ideal Sampling Rate in Installation configuration is {} Hz".format(sampling_rate)

    def sensor_type_changed(self,sv):
        self.set_default_orientation()
        self.toggle_rhino_version()




def main():
    master = Tk()
    #default_font = tkFont.nametofont("TkDefaultFont")
    #default_font.configure(size=36)
    master.option_add("*Font", "TkDefaultFont 16")
    g = GUI(master)
    master.mainloop()



if __name__ == "__main__":
    main()
