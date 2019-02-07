import serial
from serial.tools import list_ports
import threading
import queue
import struct
import socket
import signal
import sys
import time
import sqlite3

brate = 921600
get_version = 0x01
get_config = 0x02
set_config = 0x04
set_serial = 0x06
init_device = 0x07
read_init_device = 0x08
set_channel = 0x09
get_channel = 0x0A
set_sleep = 0x0B
get_sleep = 0x0C
get_version = 0x0D
wakeup_tx = 0x0E
set_wkup_code = 0x10
get_wkup_code = 0x11
start_logging = 0x12
stop_logging = 0x13

sf = 0x02
ef = 0x03
def_sleep = 1
def_chnl = 11

wakeup_now = 0x62
wakeup_in_time = 0x73
wakeup_default = 0x84


db_conn = sqlite3.connect('rh_rx_cfg.db')

def do_db_setup():
    c = db_conn.cursor()
    c.execute('''create table serialtb (serialnum int, bname text)''')
    c.execute('''create table manuf (cntrlid text, boardid serial, mfgdate text)''')
    db_conn.commit()

def init_sernum():
    c = db_conn.cursor()
    c.execute('insert into serialtb values(0,"rhinorx")')
    db_conn.commit()

def reset_serial(bname):
    c = db_conn.cursor()
    c.execute('update serialtb set serialnum=? where bname=?', (0,bname))
    db_conn.commit()
    
    
def get_next_serial():
    c = db_conn.cursor()
    c.execute('select * from serialtb ')
    sernum = c.fetchone()[0]
    print ("Serial - ", sernum)
    nsernum = sernum + 1
    c.execute('update serialtb set serialnum=? where bname="rhinorx"', (nsernum,))
    db_conn.commit()
    return sernum

def add_board_to_db(cid,bid,mdate):
    c = db_conn.cursor()
    c.execute('insert into manuf values(?,?,?)',(cid,bid,mdate,))
    db_conn.commit()

def setup_board_serial(sport,chnl):
    do_init_device(sport)
    sernum = get_next_serial()
    mfgd = int(time.time())
    do_set_config(sport,sernum,def_sleep,chnl,mfgd,wakeup_now)
    add_board_to_db(chnl,sernum,mfgd)

# initialize flash. 
def do_init_device(sport):
    s.write("raw\r\n".encode("utf-8"))
    # sf, len, cmd, csum, ef
    csum = init_device + 0x03
    m_msg = struct.pack('BBBBBB',sf,0x02,0x00,init_device, csum, ef)
    sport.write(m_msg)
    rsp = sport.read(100)
    print("Rsp -- {0}".format(rsp))

# set config.
def do_set_config(sport, srl, sleep,channel, mfgd,wkup):
    vld = struct.pack('BBBB',ord('p'),ord('h'),ord('y'),ord('z'))
    srl = struct.pack('L',srl)
    slp = struct.pack('B',sleep)
    chnl = struct.pack('B',channel)
    mfg = struct.pack('L',mfgd)
    wcode = struct.pack('B',wkup)
    pream = struct.pack('BBBB',0x02,14,0x00,0x04)
    csum = struct.pack('B',0x00)
    postam = struct.pack('B',0x03)
    msg = pream+vld+srl+slp+chnl+mfg+wcode+csum+postam
    sport.write(msg)
    rsp = sport.read(100)
    print(rsp)

def do_get_config(sport):
    # sf, len,cmd,csum,ef
    csum = get_config + 0x03
    m_msg = struct.pack('BBBBBB',sf,0x02,0x00,get_config,csum,ef)
    sport.write(m_msg)
    rsp = sport.read(100)
    print(rsp,len(rsp))
    flds = struct.unpack('<BBBLLBBLBBB',rsp)
    print("Serial: {0}, Sleep: {1}, Channel: {2}".format(flds[4],flds[5],flds[6]))
    return flds[4],flds[5],flds[6],flds[8]
    
def do_set_channel(sport,chnl):
    csum = set_channel + 0x03
    m_msg = struct.pack('BBBBBBB',sf,0x03,0x00,set_channel,chnl,csum,ef)
    sport.write(m_msg)
    rsp = sport.read(100)
    print(rsp)

def do_get_channel(sport):
    csum = get_channel + 0x03
    m_msg = struct.pack('BBBBBB',sf,0x02,0x00,get_channel,csum,ef)
    sport.write(m_msg)
    rsp = sport.read(100)
    flds = struct.unpack('BBBBBB',rsp)
    return flds[3]
    
    
def do_start_logging(sport):
    csum = start_logging + 0x03
    m_msg = struct.pack('BBBBBB',sf,0x02,0x00,start_logging,csum,ef)
    sport.write(m_msg)
   
def do_stop_logging(sport):
    csum = stop_logging + 0x03
    m_msg = struct.pack('BBBBBB',sf,0x02,0x00,stop_logging,csum,ef)
    sport.write(m_msg)

def do_set_sleep(sport,slp):
    csum = set_sleep + 0x03
    m_msg = struct.pack('BBBBBBB',sf,0x03,0x00,set_sleep,slp,csum,ef)
    sport.write(m_msg)
    rsp = sport.read(100)
    return rsp

def do_get_sleep(sport):
    csum = get_sleep + 0x03
    m_msg = struct.pack('BBBBBB',sf,0x02,0x00,get_sleep,csum,ef)
    sport.write(m_msg)
    rsp = sport.read(100)
    flds = struct.unpack('BBBBBB',rsp)
    return flds[3]

def do_set_wkupcode(sport,wkup):
    csum = set_wkup_code + 0x03
    print("Wkup Type - ", type(wkup))
    m_msg = struct.pack('BBBBBBB',sf,0x03,0x00,set_wkup_code,wkup,csum,ef)
    sport.write(m_msg)
    rsp = sport.read(100)
    return rsp

def do_get_wkupcode(sport):
    csum = get_wkup_code + 0x03
    m_msg = struct.pack('BBBBBB',sf,0x02,0x00,get_wkup_code,csum,ef)
    sport.write(m_msg)
    rsp = sport.read(100)
    flds = struct.unpack('BBBBBB',rsp)
    return flds[3]



def do_get_version(sport):
    csum = get_sleep + 0x03
    m_msg = struct.pack('BBBBBB',sf,0x02,0x00,get_version,csum,ef)
    sport.write(m_msg)
    rsp = sport.read(100)
    if len(rsp) == 9:
        flds = struct.unpack('<BBBHHBB', rsp)
        return flds[3],flds[4]
    else:
        0,0
    
