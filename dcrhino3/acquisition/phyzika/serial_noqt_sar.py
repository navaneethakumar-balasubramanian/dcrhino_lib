# Serial logger with no QT.
# This version is with threads.
# Version has been modified to support Rhino 1.1.2 board.
# 1.1.2 board has two ADS channels
# This version does not have a transmitter sequence only a tx timestamp.
# there will be a tx packet sequence, as well as a rx RSSI value for every
# packet.
# We will need to add support for message type. Transmitter has to send two
# types of packets, one with control information such as temp, vbat etc
# and another with data information. To optimize packet processing there
# is not message type in the transmitted packet. We will discriminate packets
# by its size. THis will require some additional processing on the RX end.
# version 0.6
# Fixed temp calculation error when temps go below 0.
# When below 0, temp reported is in 2's complement. 

import serial
import threading
import queue
import struct
import signal
import sys
import time
import socket
import datetime
from datetime import datetime
from datetime import timedelta
import os.path
from sar_convert import *

brate = 921600
pktlen = 21
data_msg = 0x64
info_msg = 0x69
version = 0.6

def calc_rssi_value(rssi_val):
    calc_val = 0
    offset = 0  # this needs to be calculated. 
    if rssi_val >= 128:
        calc_val = ((rssi_val - 256)/2) - offset
    else:
        calc_val = (rssi_val/2) - offset
    return calc_val

def calc_temp_in_c(val):
    if val & 0x8000:
        val = val - 0xFFF0
    val = (val >> 4)*0.0625
    return val

def calc_batt(val):
    val = ((val/4096)*9)
    return round(val,2)


class FileFlusher(threading.Thread):
            
    def __init__(self, flushq,fname):
        threading.Thread.__init__(self)
        self.flushq = flushq
        self.stope = threading.Event()
        self.stope.clear()
        self.prevts = 0
        self.curts  = 0
        self.seq = 0
        self.machts = 0
#        self.path = pth
        self.counter = 1
#        self.curfname = self.make_file_name()
        self.curfname = fname
        self.fl = open(self.curfname,"w")
        self.curtime = datetime.now()
        self.switchtime = timedelta(minutes=5)
        self.switchat = datetime.now() + self.switchtime


    def open_file(self,newname):
        self.fl = open(newname,"w")

    def set_path(self,pth):
        self.path = pth
        
    def make_file_name(self):
        cur = datetime.now()
        fl = 'log_'+str(self.counter)+'_'+str(cur.month)+'_'+str(cur.day)+'_'+str(cur.hour)+'_'+str(cur.minute)+'.csv'
        fl = os.path.join(self.path,fl)
        self.counter = self.counter + 1
        return fl

    def closefile_and_open_new(self,newname):
        self.fl.flush()
        self.fl.close()
        self.fl = open(newname,"w")

    def set_comport(self, cport):
        self.comport = cport
        
    def stop(self):
        self.stope.set()

    #unpack based on the msg type.
    # We could either get data packets or control packets. 
    def packet_decoder(self, pkt):
        try:
            lst = struct.unpack('=bbLbLLLbb',pkt)
        except:
            print("Lenght - ",len(pkt), pkt)
        msgtype = lst[1]
        ln = ''
        if msgtype == data_msg:
            # this is a data msg.
            rseq = lst[2]
            x = conv_to_volt(lst[4])
            y = conv_to_volt(lst[5])
            ts = lst[6]
            rssi = lst[7]
            self.curts = time.time()
            ln = 'data,'+str(self.curts)+','+str(rseq)+','+str(x)+','+str(y)+','+str(ts)+','+str(calc_rssi_value(rssi))+','+str(self.seq)+'\n'
        elif msgtype == info_msg:
            lst = struct.unpack('=bbLbHHHbbbbbbbb',pkt)
            rseq = lst[2]
            temp = calc_temp_in_c(lst[4])
            vbat = calc_batt(lst[5])
            slp_time = lst[6]
            rssi = lst[7]
            self.curts = time.time()
            # Need to convert these values - temp and vbat
            ln = 'info,'+str(self.curts)+','+str(rseq)+','+str(temp)+','+str(vbat)+','+str(calc_rssi_value(rssi))+','+str(self.seq)+'\n'
        self.fl.write(ln)
        self.fl.flush()

            
    def run(self):
        while True:
            a = self.flushq.get()
            if len(a):
                self.packet_decoder(a)
                # 0     1       2    3   4  5  6   7
                # 0x02, pkt_cnt,len, c1, c2,ts,rssi,0x03
                #lst = struct.unpack('=bLbLLLbb',a)
                #rseq = lst[1]
                #x = lst[3]
                #y = lst[4]
                #                    if self.seq == 0:
                #                        self.curts = time.time()
                #                        self.prevts = lst[6]
                #                    else:
                #                        self.curts = self.curts + ((lst[6]-self.prevts)*10.0)/1000000.0
                #                        self.prevts = lst[6]
                #                    self.seq = lst[7]
                #                    ln = str(self.curts) + ','+ str(lst[7])+','+str(lst[6])+','+str(x)+','+str(0)+','+str(self.seq)+','+str(rseq)+'\n'
                #self.curts = time.time()
                # ts,rx_pkt_cnt,C1,C2,TX Seq,RSSI,capSeq
                #x = hex(x)[2:]
                #y = hex(y)[2:]
#                ln = str(self.curts)+','+str(lst[1])+','+str(lst[3])+','+str(lst[4])+','+str(lst[5])+','+str(lst[6])+','+str(self.seq)+'\n'
                #ln = str(self.curts)+','+str(lst[1])+','+x+','+y+','+str(lst[5])+','+str(calc_rssi_value(lst[6]))+','+str(self.seq)+'\n'         
                #self.fl.write(ln)
                #self.fl.flush()
                self.seq = self.seq + 1
               


class SerialThread(threading.Thread):
    def __init__(self, comport, flushq):
        threading.Thread.__init__(self)
        self.cport = serial.Serial(comport, brate, timeout=1.0)
        self.portOpen = True
        self.flushq = flushq
        self.stope = threading.Event()
        self.stope.clear()
        self.cmd = "stop\r\n"
        self.counter = 1

    def get_cport(self):
        return self.cport

    def set_path(self, pth):
        self.path = pth
    
    def start_rx(self):
        self.cport.write(bytearray("ready\r\n","utf-8"))

    def stop_rx(self):
        self.cport.write(bytearray("stop\r\n", "utf-8"))
        self.cport.close()
        self.stope.set()
        
    def do_stop_cmd(self):
        self.cport.write(bytearray("stop\r\n", "utf-8"))
        
    def run (self):
        while self.portOpen and not self.stope.isSet():
            try:
                a = self.cport.read(pktlen)
                if len(a) == pktlen:
                    self.flushq.put(a)
            except:
                pass


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print ("usage: serial_logger <COM> <FILE>")
    else:
        print("logger version - {0}".format(version))
        flushQ = queue.Queue()
        fflush = FileFlusher(flushQ, sys.argv[2])
        comport = SerialThread(sys.argv[1],flushQ)
        fflush.set_comport(comport.get_cport())
        fflush.start()
        comport.start()
        comport.start_rx()

