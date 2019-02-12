import h5py
import os

import fnmatch
import numpy as np
from datetime import datetime
import time
import ConfigParser
import argparse
from dcrhino3.helpers.h5_helper import H5Helper
import pdb

def saveNumpyToFile(h5file,key,nparr):
    N = len(nparr)
    x=nparr

    my_key = key
    if my_key in h5file.keys():
        ds = h5file[my_key]
        ds.resize((h5file[my_key].shape[0] + x.shape[0]), axis = 0)
        ds[-N:] = x
    else:
        #pdb.set_trace()
        ds = h5file.create_dataset(my_key, data=x, chunks=True,
                                dtype=x.dtype , maxshape=(None,),compression="gzip", compression_opts=9)
        ds[:] = x


def config_file_to_attrs(config_parser,_h5f):
    for section in config_parser.sections():
        for option in config_parser.options(section):
            value = config_parser.get(section,option)
            _h5f.attrs[str(section) + "/" + str(option)] = value
            print (str(section) + "/" + str(option),value)
    return _h5f


def print_h5file_stats(h5):
    for key in h5.keys():
        ar = np.asarray(h5.get(key))
        print(key,len(ar))
        if key == "axis" or key=="sensitivity":
            print(key,ar)

def main():
    #pdb.set_trace()
    path = args.input_path
    list = os.listdir(path)


    file_list = []
    for root, dirnames, filenames in os.walk(path):
        for filename in filenames:
            if fnmatch.fnmatch(filename,"*RTR*.h5") or fnmatch.fnmatch(filename,"*raw_data*.h5"):
                file_list.append(os.path.join(root, filename))

    file_list.sort()
    configfile_path = args.config_path
    config = ConfigParser.SafeConfigParser()
    config.read(configfile_path)

    h5fileName = args.output_path
    tmp_output_name = "{}".format(time.time())
    h5fileName = os.path.join(h5fileName,tmp_output_name+".h5")
    output_h5f = h5py.File(h5fileName, 'a')

    output_h5f = config_file_to_attrs(config,output_h5f)
    saved_sensitivity = False
    min_time = time.time()

    sensor_serial_number = None

    for fname in file_list:

        this_sensor_serial_number = fname.split("_")[-1]
        if sensor_serial_number is None:
            sensor_serial_number = this_sensor_serial_number
        elif sensor_serial_number != this_sensor_serial_number:
            raise ValueError ("Can't merge files from different sensors")
            
        print("Merging file: " , fname)
        hf = h5py.File(fname, 'r')
        h5_helper = H5Helper(hf)
        if h5_helper.min_ts < min_time:
            min_time = h5_helper.min_ts
        ts = np.asarray(hf.get('ts'),dtype=np.float64)
        print_h5file_stats(hf)

        saveNumpyToFile(output_h5f,'ts',ts)
        #print (ts[0])
        # pdb.set_trace()
        if not saved_sensitivity:
            if hf.get('sensitivity') != None:
                sensitivity = np.asarray([config.getfloat("PLAYBACK","x_sensitivity"),config.getfloat("PLAYBACK","y_sensitivity"),config.getfloat("PLAYBACK","z_sensitivity")],dtype=np.float32)
                saveNumpyToFile(output_h5f,'sensitivity',sensitivity)
            print ("New sensitivity: " , sensitivity)
            if hf.get('axis') != None:
                file_axis = np.asarray([config.getfloat("INSTALLATION","sensor_axial_axis"),config.getfloat("INSTALLATION","sensor_tangential_axis")],dtype=np.int32)
                saveNumpyToFile(output_h5f,'axis',file_axis)
            print ("New File_axis : " , file_axis)
            saved_sensitivity = True

        #if start_time == 0:
        start_time = int(ts[0])

        #if end_time == 0:
        end_time = int(ts[-1])+1

        #print (ts,start_time,end_time)
        #pdb.set_trace()

        seq = np.asarray(hf.get('seq'),dtype=np.int32)
        saveNumpyToFile(output_h5f,'seq',seq)
        ticks = np.asarray(hf.get('cticks'),dtype=np.int32)
        saveNumpyToFile(output_h5f,'cticks',ticks)
        x = np.asarray(hf.get('x'),dtype=np.uint32)
        saveNumpyToFile(output_h5f,'x',x)
        y = np.asarray(hf.get('y'),dtype=np.uint32)
        saveNumpyToFile(output_h5f,'y',y)
        z = np.asarray(hf.get('z'),dtype=np.uint32)
        saveNumpyToFile(output_h5f,'z',z)

        # pdb.set_trace()
        rssi = np.asarray(hf.get('rssi'),dtype=np.float32)
        if not np.isnan(rssi.all()):
            saveNumpyToFile(output_h5f,'rssi',rssi)
        temp = np.asarray(hf.get('temp'),dtype=np.float32)
        if not np.isnan(temp.all()):
            saveNumpyToFile(output_h5f,'temp',temp)
        batt = np.asarray(hf.get('batt'),dtype=np.float32)
        if not np.isnan(batt.all()):
            saveNumpyToFile(output_h5f,'batt',batt)

        hf.close()
    print("Finished")
    output_h5f.close()
    #pdb.set_trace()
    min_time = datetime.utcfromtimestamp(int(min_time))
    utc_date = datetime(year=min_time.year,month=min_time.month,day=min_time.day)
    elapsed = min_time - utc_date

    elapsed_str = int(elapsed.total_seconds())
    if len(elapsed_str)<5:
        leading_zeros = "0" * (5-len(elapsed_str))
        elapsed_str =  leading_zeros+elapsed_str
    rename = "{}_RHINO{}_{}".format(min_time.strftime("%Y%m%d"),elapsed_str,sensor_serial_number)
    rename = h5fileName.replace(tmp_output_name,rename)
    cmd ="mv {} {}".format(h5fileName,rename)
    os.system(cmd)

    hf = h5py.File(rename, 'r')
    print("Final Stats Are:")
    print_h5file_stats(hf)
    hf.close()


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-i', '--input-path', help="Input folder path", default=None)
    argparser.add_argument('-o', '--output-path', help="Output file path", default=None)
    argparser.add_argument('-cfg', '--config-path', help="Config file path", default=None)
    args = argparser.parse_args()
    main()
