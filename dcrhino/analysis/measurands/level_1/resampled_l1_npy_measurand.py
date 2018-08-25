# -*- coding: utf-8 -*-
"""
Created on Fri Jun 15 18:57:36 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import glob
#import matplotlib.pyplot as plt
import numpy as np
import obspy #needed to check type
import os
import pdb
from obspy.io.segy.core import _read_segy

from dcrhino.analysis.data_manager.temp_paths import ensure_dir
from dcrhino.analysis.measurands.accelerometer_measurand import AccelerometerMeasurand
from dcrhino.analysis.supporting_processing import concatenate_traces
from dcrhino.analysis.util.general_helper_functions import init_logging

logger = init_logging(__name__)

class ResampledL1AccelerometerMeasurand(AccelerometerMeasurand):
    """
    It maybe a mistake to bake npy format into this ..
    uses DigitzerDateSamplingRate DataKey
    """
    def __init__(self, **kwargs):
        super(ResampledL1AccelerometerMeasurand, self).__init__(**kwargs)

    @property
    def id_string(self):
        return '{}_{}'.format(self.label, self.sensor_type)

    def expected_filename(self, data_key):
        """
        This function is the heart of the class, in the sense that the reason
        we built the class in the first place was to be able to load and
        store measurand timeseries
        """
        #pdb.set_trace()
        full_path = self.full_path(data_key)
        basename = data_key.time_interval_string() + '.npy'
        #basename = "{:04d}{:02d}{:02d}.{}".format(dayte.year, dayte.month, dayte.day, self.extension)
        #basename = '.'.join([data_key.digitizer_id, self.extension])
        full_stat_file = os.path.join(full_path, basename)
        return full_stat_file

    def _make_from_parents(self, data_key, parent_data_key=None, parent_data=None):
        """
        20180824: This version explicitly works with SEGY L1 parents.
        """
        has_parent_data = False
        if isinstance(parent_data, obspy.core.stream.Stream):
            has_parent_data = True
            st = parent_data
        if not has_parent_data:
            if parent_data_key is None:
                logger.critical("Need parent data key in this version")
                raise Exception
            else:
                st = self.parent_measurands[0].load(parent_data_key)
        #trace_array_dict[component] = concatenate_traces(st, component)
        #trace_array_dict[component] = trace_array_dict[component].T
        pdb.set_trace()
        data_array= concatenate_traces(st, data_key.component)
        self.save(data_key, data_array)
#       pdb.set_trace()
#        print('here you must decide if you want ot pass "1d" as output shape, \
#              )transpose or hwathaveyou')

    def save(self, data_key, data):
        full_out_file = self.expected_filename(data_key)
        ensure_dir(os.path.dirname(full_out_file))
        np.save(full_out_file, data)
        return

    def load(self, data_key):
        """
        """
        if self.extension == 'npy':
            data = np.load(self.expected_filename(data_key))
            return data
        else:
            print("Unexpected extension")


    def available_files_to_process(self, data_key):
        full_path = self.full_path(data_key)
        file_list = glob.glob(full_path+'/*npy')
        file_list.sort()
        return file_list


def main():
    """
    """
#    raw_sgy_form_ide = RawSgyFromIDE()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
