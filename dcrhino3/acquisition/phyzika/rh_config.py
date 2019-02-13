# rhino configurator.
# version 0.3
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
from rh_serializer import *

cc1201txpower = ["14","13","12","11","10","9","8","7","6","5","4","3","2","1","0","-3","-6","-11"]
cc1201preamble = ["0","0.5","1","1.5","2","3","4","5","6","7","8","12","24","30"]


class ConfigApp(QMainWindow):
    def __init__(self,com):
        super(ConfigApp, self).__init__()
        self.title = "Rhino 1.1 Transmitter Configurator"
        self.setMinimumSize(QSize(640,480))
        self.setWindowTitle(self.title)
        self.comport = serial.Serial(com,921600,timeout=1.0)
        self.setStyleSheet("background-color: white;")

        # first get version.
        vflds = do_get_version(self.comport)
        serial_num = vflds[5]
        fw_ver = vflds[3]
        hw_ver = vflds[4]
        md = vflds[6]
        cd = vflds[7]
        uid_0 = hex(vflds[8])[2:].zfill(8)
        uid_1 = hex(vflds[9])[2:].zfill(8)
        uid_2 = hex(vflds[10])[2:].zfill(8)
        uid_3 = hex(vflds[11])[2:].zfill(8)        
        uid = uid_0+uid_1+uid_2+uid_3
        # Get config information.
        #
        cflds,cinfo = do_get_config(self.comport)
#        print (cflds)
#        print (cinfo)
        
        self.font = QFont()
        self.font.setPointSize(12)
        central = QWidget(self)
        self.setCentralWidget(central)
        vLayout = QVBoxLayout(self)
        central.setLayout(vLayout)
        title = QLabel("Rhino 1.1 Transmitor Configurator",self)
        title.setStyleSheet("font: 20px;font-style: italic")
        serLayout = QHBoxLayout(central)
        serLabel = QLabel("Serial Number: ", self)
        serNumLabel = QLabel(hex(serial_num)[2:].zfill(8), self)
        fwLabel = QLabel("FW Version: ", self)
#        fwLabel.setMargin(20)
        fwLabel.setFont(self.font)
        fwVersion = QLabel(hex(fw_ver)[2:].zfill(8),self)
        fwVersion.setFont(self.font)
        hwLabel = QLabel("HW Version: ",self)
        hwVersion = QLabel(hex(hw_ver)[2:].zfill(8),self)
        cntrlIdLabel = QLabel("Controller ID: ", self)
        cntrlId = QLabel(uid,self)
        hwLabel.setFont(self.font)
        hwVersion.setFont(self.font)
        serNumLabel.setFont(self.font)
        cntrlIdLabel.setFont(self.font)
        cntrlId.setFont(self.font)
        serLabel.setMargin(10)
        serLabel.setFont(self.font)
        serLayout.addWidget(serLabel)
        serLayout.addWidget(serNumLabel)
        serLayout.addWidget(fwLabel)
        serLayout.addWidget(fwVersion)
        serLayout.addWidget(hwLabel)
        serLayout.addWidget(hwVersion)
        serLayout.addWidget(cntrlIdLabel)
        serLayout.addWidget(cntrlId)
        serLayout.addStretch(1)

        savebutton = QPushButton("Save", self)
        quitbutton = QPushButton("Quit", self)
        savebutton.setFont(self.font)
        quitbutton.setFont(self.font)
        savebutton.setStyleSheet("background-color: lightgreen")
        quitbutton.setStyleSheet("background-color: red")
        blayout = QHBoxLayout(self)
        blayout.addWidget(savebutton)
        blayout.addWidget(quitbutton)
        savebutton.clicked.connect(self.do_save)
        quitbutton.clicked.connect(self.do_quit)
        
        
        chnlLayout = self.addChannelBlock()
        radLayout = self.addRadioBlock()
        cfg0Layout = self.adsConfig0Block()
        cfg1Layout = self.adsConfig1Block()
        hpfblock = self.hpfBlock()
        ofcblock = self.ofcBlock()
        fscblock = self.fscBlock()
        vLayout.addWidget(title)
        vLayout.addLayout(serLayout)
        vLayout.addLayout(chnlLayout)
        vLayout.addLayout(radLayout)
        vLayout.addLayout(cfg0Layout)
        vLayout.addLayout(cfg1Layout)
        vLayout.addLayout(hpfblock)
        vLayout.addLayout(ofcblock)
        vLayout.addLayout(fscblock)
        vLayout.addLayout(blayout)
        vLayout.addStretch(1)
        self.do_set_config_values(cinfo)
        
    def do_set_config_values(self,cfg):
        if cfg.chan1enable:
            self.channel1Enable.setChecked(True)
        if cfg.chan2enable:
            self.channel2Enable.setChecked(True)
#        print("Radio Channel: ", cfg.radio_channel)
#        print("Radio Sleep: ", cfg.radio_sleep)
        self.txTimeTxt.setText(str(cfg.radio_sleep))
        self.chnlComboBox.setCurrentIndex(cfg.radio_channel)
        self.pream.setCurrentIndex(cfg.radio_pream)
        self.txPower.setCurrentIndex(cfg.radio_power)

        # Cfg0 settings:
        syncval = cfg.ads_cfg0 >> 7
        self.syncvals.setCurrentIndex(syncval)
        drvals = (cfg.ads_cfg0 >> 3)&0x07
        self.drvals.setCurrentIndex(drvals)
        phase = (cfg.ads_cfg0 >> 2)&0x01
        self.firvals.setCurrentIndex(phase)
        fltr = cfg.ads_cfg0 & 0x03
        self.fltrvals.setCurrentIndex(fltr)
        pga = cfg.ads_cfg1 & 0x07
        self.pgagainvals.setCurrentIndex(pga)
        pgaena = (cfg.ads_cfg1 >> 3) & 0x01
        self.pgachopvals.setCurrentIndex(pgaena)
        mux = (cfg.ads_cfg1 >> 4) & 0x07
        self.muxvals.setCurrentIndex(mux)
#        print (hex(cfg.ads_hpf0)[2:].zfill(2))
        self.hllTxt.setText(hex(cfg.ads_hpf0)[2:].zfill(2))
        self.hhlTxt.setText(hex(cfg.ads_hpf1)[2:].zfill(2))        
        self.ollTxt.setText(hex(cfg.ads_ofc0)[2:].zfill(2))
        self.omlTxt.setText(hex(cfg.ads_ofc1)[2:].zfill(2))
        self.ohlTxt.setText(hex(cfg.ads_ofc2)[2:].zfill(2))
        self.fllTxt.setText(hex(cfg.ads_fsc0)[2:].zfill(2))
        self.fmlTxt.setText(hex(cfg.ads_fsc1)[2:].zfill(2))
        self.fhlTxt.setText(hex(cfg.ads_fsc2)[2:].zfill(2))                        

        
    def do_save(self):
#        print ("Do Save.")
        # First get channel enable flags.
        c1ena = 0x00
        c2ena = 0x00

        svCfgInfo = configinfo()
        
        if self.channel1Enable.isChecked():
            c1ena = 0x01
        if self.channel2Enable.isChecked():
            c2ena = 0x01

        svCfgInfo.c1ena = c1ena
        svCfgInfo.c2ena = c2ena
        
        channel = struct.pack('BB',c1ena,c2ena)
#        print ("Channel: ",channel)
        # Now check for radio
#        print ("Radio Channel - ", self.chnlComboBox.currentIndex())
        rchannel = self.chnlComboBox.currentIndex()
        txtime = int(self.txTimeTxt.text())
        if txtime > 0xFF:
            txtime = 255

        # Get the preamble length and transmit power.
        prelen = self.pream.currentIndex()
        txpow = self.txPower.currentIndex()

        svCfgInfo.rchannel = rchannel
        svCfgInfo.txtime = txtime
        svCfgInfo.prelen = prelen
        svCfgInfo.txpow = txpow
        
        radio = struct.pack('BBBB',rchannel,txtime,prelen,txpow)
        
#        print ("Radio: ", radio)
        # Now get the ads values.
        sync = self.syncvals.currentIndex()<<7
        data_rate = self.drvals.currentIndex()<<3
#        print ("Data Rate: ", hex(data_rate))
        
        phase = self.firvals.currentIndex() <<2
        fltr = self.fltrvals.currentIndex() << 0
        config0 = sync|0x40|data_rate|phase|fltr
#        print("Config0 - ", hex(config0))
        pga = self.pgagainvals.currentIndex()
        pgaenable = self.pgachopvals.currentIndex()<<3
        mux = self.muxvals.currentIndex()<<4
        config1 = pga|pgaenable|mux
        print("Config1 - ", hex(config1))
        hpf0 = self.validate_hex(self.hllTxt.text())
        hpf1 = self.validate_hex(self.hhlTxt.text())
        ofc0 = self.validate_hex(self.ollTxt.text())
        ofc1 = self.validate_hex(self.omlTxt.text())
        ofc2 = self.validate_hex(self.ohlTxt.text())
        fsc0 = self.validate_hex(self.fllTxt.text())
        fsc1 = self.validate_hex(self.fmlTxt.text())
        fsc2 = self.validate_hex(self.fhlTxt.text())
#        print(hex(hpf0),hex(hpf1),hex(ofc0),hex(ofc1),hex(ofc2),hex(fsc0),hex(fsc1),hex(fsc2))

        svCfgInfo.config0 = config0
        svCfgInfo.config1 = config1
        svCfgInfo.hpf0 = hpf0
        svCfgInfo.hpf1 = hpf1
        svCfgInfo.ofc0 = ofc0
        svCfgInfo.ofc1 = ofc1
        svCfgInfo.ofc2 = ofc2
        svCfgInfo.fsc0 = fsc0
        svCfgInfo.fsc1 = fsc1
        svCfgInfo.fsc2 = fsc2
        
        adsinfo = struct.pack('BBBBBBBBBB',config0,config1,hpf0,hpf1,
                              ofc0,ofc1,ofc2,fsc0,fsc1,fsc2)
        post_msg = struct.pack('BB',set_config,0x72)+adsinfo+radio+channel+struct.pack('BB',0x00,ef)
        pre_msg  = struct.pack('BB',sf,len(post_msg))
        msg = pre_msg+post_msg
        self.comport.write(msg)
        rsp = self.comport.read(100)
#        print("Resp: ", rsp)
        
        
    
    def do_quit(self):
#        print ("Do Quit")
        QCoreApplication.instance().quit()
        
    def addChannelBlock(self):
        cLayout = QHBoxLayout(self)
        chnlLabel = QLabel("Enable Channels", self)
        chnlLabel.setFont(self.font)
        chnlLabel.setMargin(10)
        cLayout.addWidget(chnlLabel)
        self.channel1Enable = QCheckBox("Channel 1")
        self.channel2Enable = QCheckBox("Channel 2")
        self.channel1Enable.setFont(self.font)
        self.channel2Enable.setFont(self.font)
        cLayout.addWidget(self.channel1Enable)
        cLayout.addWidget(self.channel2Enable)
        cLayout.addStretch(1)
#        print("Add Channel Block..")
        return cLayout
    
    def addRadioBlock(self):
        rLayout = QHBoxLayout(self)
        radioLabel = QLabel("Radio Configuration", self)
        radioLabel.setFont(self.font)
        radioLabel.setMargin(10)
        chnlNumLabel = QLabel("Channel: ", self)
        chnlNumLabel.setFont(self.font)
        self.chnlComboBox = QComboBox(self)
        self.chnlComboBox.setFont(self.font)
        for i in range(14):
            self.chnlComboBox.addItem(str(i))
        txTime = QLabel("Default Transmit Time:")
        txTime.setFont(self.font)
        self.txTimeTxt = QLineEdit(self)
        self.txTimeTxt.setFont(self.font)
        self.txTimeTxt.setFixedWidth(50)
        txTimeMins = QLabel("mins")

        txPowerLabel = QLabel("Transmit Power", self)
        txPowerLabel.setFont(self.font)
        txPowerLabel.setMargin(10)
        self.txPower = QComboBox(self)
        self.txPower.addItems(cc1201txpower)
        txPowerLabel.setFont(self.font)
        self.txPower.setFont(self.font)
        
        preamLabel = QLabel("Preamble Bytes", self)
        preamLabel.setFont(self.font)
        preamLabel.setMargin(10)
        self.pream = QComboBox(self)
        self.pream.addItems(cc1201preamble)
        self.pream.setCurrentIndex(4)
        preamLabel.setFont(self.font)
        self.pream.setFont(self.font)

        
        
        txTimeMins.setFont(self.font)
        rLayout.addWidget(radioLabel)
        rLayout.addWidget(chnlNumLabel)
        rLayout.addWidget(self.chnlComboBox)
        rLayout.addWidget(txTime)
        rLayout.addWidget(self.txTimeTxt)
        rLayout.addWidget(txTimeMins)
        rLayout.addWidget(txPowerLabel)
        rLayout.addWidget(self.txPower)
        rLayout.addWidget(preamLabel)
        rLayout.addWidget(self.pream)
    
        rLayout.addStretch(1)
        return rLayout
            
    def adsConfig0Block(self):
        rLayout = QHBoxLayout(self)
        lbl = QLabel("ADS Config0",self)
        lbl.setFont(self.font)
        lbl.setMargin(10)
        sync = QLabel("Sync", self)
        sync.setFont(self.font)
        self.syncvals = QComboBox(self)
        self.syncvals.setFont(self.font)
        self.syncvals.addItem("Pulse")
        self.syncvals.addItem("Continuous Sync")
        drselect = QLabel("Data Rate", self)
        drselect.setFont(self.font)
        self.drvals = QComboBox(self)
        self.drvals.setFont(self.font)
        self.drvals.addItem("250 SPS")
        self.drvals.addItem("500 SPS")
        self.drvals.addItem("1000 SPS")
        self.drvals.addItem("2000 SPS")
        self.drvals.addItem("4000 SPS")
        firrsp = QLabel("FIR Phase Response", self)
        firrsp.setFont(self.font)
        self.firvals = QComboBox(self)
        self.firvals.setFont(self.font)
        self.firvals.addItem("Linear")
        self.firvals.addItem("Minimum")
        fltr = QLabel("Digital Filter Select", self)
        fltr.setFont(self.font)
        self.fltrvals = QComboBox(self)
        self.fltrvals.setFont(self.font)
        self.fltrvals.addItem("Filter Bypassed.")
        self.fltrvals.addItem("Sinc filter block only")
        self.fltrvals.addItem("Sinc + LPF")
        self.fltrvals.addItem("Sinc + LPF + HPF")
        rLayout.addWidget(lbl)
        rLayout.addWidget(sync)
        rLayout.addWidget(self.syncvals)
        rLayout.addWidget(drselect)
        rLayout.addWidget(self.drvals)
        rLayout.addWidget(firrsp)
        rLayout.addWidget(self.firvals)
        rLayout.addWidget(fltr)
        rLayout.addWidget(self.fltrvals)
        rLayout.addStretch(1)
        return rLayout

    def adsConfig1Block(self):
        rLayout = QHBoxLayout(self)
        lbl = QLabel("ADS Config1",self)
        lbl.setFont(self.font)
        lbl.setMargin(10)
        mux = QLabel("MUX Select")
        self.muxvals = QComboBox(self)
        self.muxvals.addItem("AINP1 and AINN1")
        self.muxvals.addItem("AINP2 and AINN2")
        self.muxvals.addItem("Internal short via 400Ohm")
        self.muxvals.addItem("AINP1 and AINN1 connected to AINP2 and AINN2")
        self.muxvals.addItem("External Short to AINN2")
        self.muxvals.setFont(self.font)
        mux.setFont(self.font)
        pgachop = QLabel("PGA Chopping Enable")
        pgachop.setFont(self.font)
        self.pgachopvals = QComboBox(self)
        self.pgachopvals.setFont(self.font)
        self.pgachopvals.addItem("Disable")
        self.pgachopvals.addItem("Enable")
        pgagain = QLabel("PGA Gain")
        pgagain.setFont(self.font)
        self.pgagainvals = QComboBox(self)
        self.pgagainvals.setFont(self.font)
        self.pgagainvals.addItem("1")
        self.pgagainvals.addItem("2")
        self.pgagainvals.addItem("4")
        self.pgagainvals.addItem("8")
        self.pgagainvals.addItem("16")
        self.pgagainvals.addItem("32")
        self.pgagainvals.addItem("64")
        rLayout.addWidget(lbl)
        rLayout.addWidget(mux)
        rLayout.addWidget(self.muxvals)
        rLayout.addWidget(pgachop)
        rLayout.addWidget(self.pgachopvals)
        rLayout.addWidget(pgagain)
        rLayout.addWidget(self.pgagainvals)
        rLayout.addStretch(1)
        return rLayout

    def hpfBlock(self):
        rLayout = QHBoxLayout(self)
        lbl = QLabel("High Pass Filter Corner Frequency")
        lbl.setFont(self.font)
        lbl.setMargin(10)
        hlbl = QLabel("High Byte:")
        hlbl.setFont(self.font)
        self.hhlTxt = QLineEdit(self)
        self.hhlTxt.setFont(self.font)
        self.hhlTxt.setFixedWidth(50)

        llbl = QLabel("Low Byte:")
        llbl.setFont(self.font)
        self.hllTxt = QLineEdit(self)
        self.hllTxt.setFont(self.font)
        self.hllTxt.setFixedWidth(50)

        rLayout.addWidget(lbl)
        rLayout.addWidget(llbl)
        rLayout.addWidget(self.hllTxt)
        rLayout.addWidget(hlbl)
        rLayout.addWidget(self.hhlTxt)

        rLayout.addStretch(1)
        return rLayout

    def ofcBlock(self):
        rLayout = QHBoxLayout(self)
        lbl = QLabel("Offset Calibration")
        lbl.setFont(self.font)
        lbl.setMargin(10)

        llbl = QLabel("Low Byte:")
        llbl.setFont(self.font)
        self.ollTxt = QLineEdit(self)
        self.ollTxt.setFont(self.font)
        self.ollTxt.setFixedWidth(50)

        mlbl = QLabel("Mid Byte:")
        mlbl.setFont(self.font)
        self.omlTxt = QLineEdit(self)
        self.omlTxt.setFont(self.font)
        self.omlTxt.setFixedWidth(50)

        hlbl = QLabel("High Byte:")
        hlbl.setFont(self.font)
        self.ohlTxt = QLineEdit(self)
        self.ohlTxt.setFont(self.font)
        self.ohlTxt.setFixedWidth(50)

        rLayout.addWidget(lbl)
        rLayout.addWidget(llbl)
        rLayout.addWidget(self.ollTxt)

        rLayout.addWidget(mlbl)
        rLayout.addWidget(self.omlTxt)

        rLayout.addWidget(hlbl)
        rLayout.addWidget(self.ohlTxt)
        rLayout.addStretch(1)
        return rLayout

    def fscBlock(self):
        rLayout = QHBoxLayout(self)
        lbl = QLabel("Full Scale Calibration")
        lbl.setFont(self.font)
        lbl.setMargin(10)

        llbl = QLabel("Low Byte:")
        llbl.setFont(self.font)
        self.fllTxt = QLineEdit(self)
        self.fllTxt.setFont(self.font)
        self.fllTxt.setFixedWidth(50)
        
        mlbl = QLabel("Mid Byte:")
        mlbl.setFont(self.font)
        self.fmlTxt = QLineEdit(self)
        self.fmlTxt.setFont(self.font)
        self.fmlTxt.setFixedWidth(50)

        hlbl = QLabel("High Byte:")
        hlbl.setFont(self.font)
        self.fhlTxt = QLineEdit(self)
        self.fhlTxt.setFont(self.font)
        self.fhlTxt.setFixedWidth(50)


        rLayout.addWidget(lbl)
        rLayout.addWidget(llbl)
        rLayout.addWidget(self.fllTxt)

        rLayout.addWidget(mlbl)
        rLayout.addWidget(self.fmlTxt)

        rLayout.addWidget(hlbl)
        rLayout.addWidget(self.fhlTxt)
        rLayout.addStretch(1)
        return rLayout

    def validate_hex(self, instr):
        if len(instr) != 2:
            return 0
        else:
            try:
                val = int(instr,16)
            except:
                val = 0
            return val
    
if __name__=="__main__":
    app = QApplication(sys.argv)
    if len(sys.argv) == 2:
        ex = ConfigApp(sys.argv[1])
        ex.show()
        sys.exit(app.exec_())
    else:
        print("rh_config <COMPORT>")
          
