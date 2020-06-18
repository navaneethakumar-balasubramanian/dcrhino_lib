"""
@author Natal

This module is used to merge various h5 files into a single one.  It can be used in a reduced form from the Rhino GUI
but it provides more flexibility when used in a command line interface

"""
import h5py
import os
import fnmatch
import numpy as np
from datetime import datetime
import time
import argparse
from dcrhino3.helpers.h5_helper import H5Helper
import shutil
import pdb
import sys
from dcrhino3.helpers.general_helper_functions import init_logging, init_logging_to_file
from dcrhino3.models.config2 import Config
logger = init_logging(__name__)
file_logger = init_logging_to_file(__name__)
import pdb



def main(args):
    """

    :param args: Argparser instance.    -i: String, Input path to the source h5 files
                                        -o: String, Output path for merged file
                                        -s: String, Sensor type. Supported values are 'ssx' and 'rhino'
                                        -cfg: String, Path to the config file that will be saved in the merged h5 file
    :return: Nothing
    """
    try:
        # pdb.set_trace()
        path = args.input_path
        file_list = []
        for root, dirnames, filenames in os.walk(path):
            for filename in filenames:
                if args.sensor == "rhino":
                    file_identifier = "RHINO"
                    data_dtype = np.uint32
                    if fnmatch.fnmatch(filename, "*RTR*.h5") or fnmatch.fnmatch(filename, "*raw_data*.h5"):
                        file_list.append(os.path.join(root, filename))
                elif args.sensor == "ssx":
                    file_identifier = "SSX"
                    data_dtype = np.float32
                    if fnmatch.fnmatch(filename, "*SSX*.h5"):
                        file_list.append(os.path.join(root, filename))

        file_list.sort()
        configfile_path = args.config_path
        config = Config()
        config.load_from_config_for_h5_files(configfile_path)

        h5fileName = args.output_path
        tmp_output_name = "{}".format(time.time())
        h5fileName = os.path.join(h5fileName, tmp_output_name+".h5")

        # trace_data = RawTraceData()
        # trace_data.add_global_config(config.pipeline_files_to_dict, "0")

        output_h5f = h5py.File(h5fileName, 'a')
        output_h5_helper = H5Helper(output_h5f, load_ts=False, load_xyz=False)
        output_h5_helper.save_field_config_to_h5(config)

        # output_h5f = config_file_to_attrs(config, output_h5f)
        # saved_sensitivity = False
        min_time = time.time()

        sensor_serial_number = config.digitizer_serial_number
        sampling_rate = config.output_sampling_rate

        for fname in file_list:
            # pdb.set_trace()
            # this_sensor_serial_number = fname.split("_")[-2]
            # if sensor_serial_number is None:
            #     sensor_serial_number = this_sensor_serial_number
            # elif sensor_serial_number != this_sensor_serial_number:
            #     raise ValueError("Can't merge files from different sensors")

            print("Merging file: ", fname)
            hf = h5py.File(fname, 'r')
            h5_helper = H5Helper(hf)
            if h5_helper.min_ts < min_time:
                min_time = h5_helper.min_ts
            # ts = np.asarray(hf.get('ts'), dtype=np.float64)
            h5_helper.print_h5file_stats()
            output_h5_helper.save_np_array_to_h5_file("ts", h5_helper.ts)
            # saveNumpyToFile(output_h5f, 'ts', ts)
            # pdb.set_trace()
            # if not saved_sensitivity:
            #     if hf.get('sensitivity') is not None:
            #         sensitivity = np.asarray(config.sensitivity_list_xyz, dtype=np.float32)
            #         output_h5_helper.save_np_array_to_h5_file('sensitivity', sensitivity)
            #     print ("Merged file sensitivity: ", sensitivity)
            #     if hf.get('axis') is not None:
            #         file_axis = np.asarray([config.getfloat("INSTALLATION","sensor_axial_axis"),
            #                                 config.getfloat("INSTALLATION","sensor_tangential_axis")], dtype=np.int32)
            #         saveNumpyToFile(output_h5f, 'axis', file_axis)
            #     print ("Merged File_axis : ", file_axis)
            #     saved_sensitivity = True

            seq = np.asarray(hf.get('seq'), dtype=np.uint32)
            output_h5_helper.save_np_array_to_h5_file('seq', seq)
            ticks = np.asarray(hf.get('cticks'), dtype=np.uint32)
            output_h5_helper.save_np_array_to_h5_file('cticks', ticks)
            x = np.asarray(hf.get('x'), dtype=data_dtype)
            output_h5_helper.save_np_array_to_h5_file('x', x)
            y = np.asarray(hf.get('y'), dtype=data_dtype)
            output_h5_helper.save_np_array_to_h5_file('y', y)
            z = np.asarray(hf.get('z'), dtype=data_dtype)
            output_h5_helper.save_np_array_to_h5_file('z', z)

            rssi = np.asarray(hf.get('rssi'), dtype=np.float32)
            if not np.isnan(rssi.all()):
                output_h5_helper.save_np_array_to_h5_file('rssi', rssi)
            temp = np.asarray(hf.get('temp'), dtype=np.float32)
            if not np.isnan(temp.all()):
                output_h5_helper.save_np_array_to_h5_file('temp', temp)
            batt = np.asarray(hf.get('batt'), dtype=np.float32)
            if not np.isnan(batt.all()):
                output_h5_helper.save_np_array_to_h5_file('batt', batt)
            h5_helper.close_h5f()
        # pdb.set_trace()
        output_h5_helper.save_field_config_to_h5(config)
        axis = np.asarray([config.sensor_axial_axis, config.sensor_tangential_axis], dtype=np.int32)
        if config.sensor_type == 2:
            sensitivities = np.asarray(config.sensitivity_list_xyz, dtype=np.float32)
        else:
            sensitivities = np.asarray([1.], dtype=np.float32)
        output_h5_helper.replace_value_in_h5_key("sensitivity", sensitivities)
        output_h5_helper.replace_value_in_h5_key("axis", axis)
        logger.info("Finished Merging files")
        output_h5_helper.close_h5f()
        min_time = datetime.utcfromtimestamp(int(min_time))
        utc_date = datetime(year=min_time.year, month=min_time.month, day=min_time.day)
        elapsed = min_time - utc_date

        elapsed_str = str(int(elapsed.total_seconds()))
        if len(elapsed_str) < 5:
            leading_zeros = "0" * (5-len(elapsed_str))
            elapsed_str = leading_zeros+elapsed_str
        rename = "{}_{}{}_{}_{}".format(min_time.strftime("%Y%m%d"), file_identifier, elapsed_str, sensor_serial_number,
                                     sampling_rate)
        rename = h5fileName.replace(tmp_output_name, rename)
        shutil.move(h5fileName, rename)

        hf = h5py.File(rename, 'r')
        h5_helper = H5Helper(hf, load_xyz=False, load_ts=False)
        logger.info("Final Stats Are:")
        h5_helper.print_h5file_stats(hf)
        h5_helper.close_h5f()
    except:
        logger.error("Merge files error {}".format(sys.exc_info()))
        pdb.set_trace()


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Collection Deamon v%d.%d.%d - Copyright (c) 2018 DataCloud")
    argparser.add_argument('-i', '--input-path', help="Input folder path", default=None)
    argparser.add_argument('-o', '--output-path', help="Output file path", default=None)
    argparser.add_argument('-s', '--sensor', help="Sensor type to merge (SSX/RHINO", choices=["ssx", "rhino"],
                           default="rhino")
    argparser.add_argument('-cfg', '--config-path', help="Config file path", default=None)
    args = argparser.parse_args()
    main(args)
