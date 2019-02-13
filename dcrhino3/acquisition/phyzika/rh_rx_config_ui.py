# rhino configurator.
#
import serial
from serial.tools import list_ports
import threading
import queue
import struct
import socket
import signal
import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QWidget,QTabWidget
from PyQt5.QtWidgets import QTextEdit,QTableWidget, QTableWidgetItem,QLineEdit
from PyQt5.QtWidgets import *
from PyQt5  import QtCore, QtGui
from PyQt5.QtGui import *
from PyQt5.QtCore import *
import time
from rh_rx_config import *

class ConfigApp(QMainWindow):
    def __init__(self,com):
        super(ConfigApp,self).__init__()
        self.title = "Rhino Receiver Configuration"
        self.setMinimumSize(QSize(320,200))
        self.setWindowTitle(self.title)
        self.comport = serial.Serial(com,921600,timeout=1.0)
        self.setStyleSheet("background-color: white;")
        self.comport.read(1000)
        self.comport.write("raw\r\n".encode("utf-8"))
        

        fwver, hwver = do_get_version(self.comport)
        snum,slp,chnl,wkupcode = do_get_config(self.comport)
        print("Wkup Code Type: ",type(wkupcode))

        self.font = QFont()
        self.font.setPointSize(12)
        central = QWidget(self)
        self.setCentralWidget(central)
        vLayout = QVBoxLayout(self)
        central.setLayout(vLayout)
        title = QLabel("Rhino 1.1 Receiver Configurator",self)
        title.setStyleSheet("font: 20px;font-style: italic")
        vLayout.addWidget(title)
        hLayout1 = QHBoxLayout(self)
        slbl = QLabel("Serial Number: " + str(snum), self)
        slbl.setStyleSheet("font: 18px;font-style: italic")
        hLayout1.addWidget(slbl)
        hLayout2 = QHBoxLayout(self)
        slplbl = QLabel("Sleep Interval: ",self)
        self.slptxt = QLineEdit(self)
        self.slptxt.setFont(self.font)
        self.slptxt.setFixedWidth(50)
        slplbl.setStyleSheet("font: 18px;font-style: italic")
        self.slptxt.setStyleSheet("font: 18px;font-style: italic")
        slMins = QLabel("mins")
        slMins.setStyleSheet("font: 18px;font-style: italic")
        vLayout3 = QVBoxLayout(self)
        wkuplbl = QLabel("Wakeup Mode: ", self)
        wkuplbl.setStyleSheet("font: 18px;font-style: italic")
        vhLayout4 = QHBoxLayout(self)

        self.wkupTrans = QRadioButton("Default - Transmitter Default")
        self.wkupImmed = QRadioButton("Wakeup Immediate - Transmit Continous")
        self.wkupRxSleep = QRadioButton("Wakeup After RX Sleep")

        if wkupcode == wakeup_default:
            self.wkupcode = wakeup_default
            self.wkupTrans.setChecked(True)
        elif wkupcode == wakeup_in_time:
            self.wkupcode = wakeup_in_time
            self.wkupRxSleep.setChecked(True)
        elif wkupcode == wakeup_now:
            self.wkupcode = wakeup_now
            self.wkupImmed.setChecked(True)
        else:
            self.wkupcode = wakeup_default
            self.wkupTrans.setChecked(True)
        
        self.wkupImmed.setStyleSheet("font: 18px;font-style: italic")
        self.wkupTrans.setStyleSheet("font: 18px;font-style: italic")
        self.wkupRxSleep.setStyleSheet("font: 18px;font-style: italic")
#        self.wkupTrans.toggled.connect(self.wkup_btnstate(self.wkupTrans))
#        self.wkupImmed.toggled.connect(self.wkup_btnstate(self.wkupImmed))
#        self.wkupRxSleep.toggled.connect(wkup_btnstate(self.wkupRxSleep))
        vhLayout4.addWidget(self.wkupTrans)
        vhLayout4.addWidget(self.wkupImmed)
        vhLayout4.addWidget(self.wkupRxSleep)
        vLayout3.addWidget(wkuplbl)
        vLayout3.addLayout(vhLayout4)
        
        
        hLayout2.addWidget(slplbl)
        hLayout2.addWidget(self.slptxt)
        hLayout2.addWidget(slMins)
        hLayout2.addStretch(1)

        hLayout3 = QHBoxLayout(self)
        chnllbl = QLabel("Channel Number: ")
        self.chnlbox = QComboBox(self)
        self.chnlbox.setFont(self.font)
        for i in range(14):
            self.chnlbox.addItem(str(i))
        chnllbl.setStyleSheet("font: 18px;font-style: italic")
        self.chnlbox.setStyleSheet("font: 18px;font-style: italic")        
        self.chnlbox.setCurrentIndex(chnl)
        
        hLayout3.addWidget(chnllbl)
        hLayout3.addWidget(self.chnlbox)
        hLayout3.addStretch(1)
        
        self.slptxt.setText(str(slp))

        savebutton = QPushButton("Save", self)
        quitbutton = QPushButton("Quit", self)
        savebutton.setFont(self.font)
        quitbutton.setFont(self.font)
        savebutton.setStyleSheet("background-color: lightgreen")
        quitbutton.setStyleSheet("background-color: red")

        hLayout4 = QHBoxLayout(self)
        hLayout4.addWidget(savebutton)
        hLayout4.addWidget(quitbutton)

        savebutton.clicked.connect(self.do_save)
        quitbutton.clicked.connect(self.do_quit)
        
        vLayout.addLayout(hLayout1)
        vLayout.addLayout(hLayout2)
        vLayout.addLayout(hLayout3)
        vLayout.addLayout(vLayout3)
        vLayout.addLayout(hLayout4)
        vLayout.addStretch(1)

    def wkup_btnstate(self):
        self.wkupcode = wakeup_default
        if self.wkupTrans.isChecked():
            self.wkupcode = wakeup_default
        if self.wkupImmed.isChecked():
            self.wkupcode = wakeup_now
        if self.wkupRxSleep.isChecked():
            self.wkupcode = wakeup_in_time
        return self.wkupcode
        
    def do_save(self):
        print("Do Save")
        print("sleep: ", int(self.slptxt.text()))
        print("channel: ", self.chnlbox.currentIndex())
        self.wkup_btnstate()
        do_set_sleep(self.comport, int(self.slptxt.text()))
        do_set_channel(self.comport, self.chnlbox.currentIndex())
        do_set_wkupcode(self.comport,self.wkupcode)

    def do_quit(self):
        QCoreApplication.instance().quit()
        
if __name__=="__main__":
    app = QApplication(sys.argv)
    ex = ConfigApp(sys.argv[1])
    ex.show()
    sys.exit(app.exec_())
