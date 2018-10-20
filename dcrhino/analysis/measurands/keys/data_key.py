# -*- coding: utf-8 -*-
"""
Created on Fri Jun 15 14:15:46 2018

@author: kkappler
We have hole such as
ssx#####_bh##_YYYYMMDD_rig## is a unique specifier
Note that Natal’s bh## is nothing more than a LABEL for the TIMEINTERVAL he specifies in DRILLTIMES.csv, so effit, I will use start_utc_second and end_utc_second.

Later we will map that to another specifier, with bench, pattern, hole, etc.
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import string

#home = os.path.expanduser("~/")
class MeasurandDataKey(object):
    """
    abstract class to capture the parameters we need to specify when we want to
    load measurand data.  For monitoring this is typically a station and a time_interval.
    For SSX data it looks like it will be BH-ID
    """
    def __init__(self, **kwargs):
        self.description = kwargs.get('description', '')
        self.formality = kwargs.get('formality', None)

    def is_valid(self):
        return True

    @property
    def mini_path(self):
        """
        This string sits right below the data level;  It is a place holder for
        adding paths that are perhaps tough to do with id_string

        This was known as measurand_mini_path in original implementation in 2016
        Now it is used to track sampling rate for exmaple.
        """
        return ''

class ClientMineDrillDataKey(MeasurandDataKey):
    """
    20181016: It has been specified that we will archive our L0 and L1 data
    under client/mine/drill folder structure.  There will be a few measurands
    in that sturcture, with possibly several keys. This key is this a subclass
    to be used for those data
    """
    def __init__(self, **kwargs):
        self._client = kwargs.get('client', '')
        self._mine = kwargs.get('mine', None)
        self._drill = kwargs.get('drill', None)


    @property
    def client(self):
        return string.lower(self._client)
    @property
    def mine(self):
        return string.lower(self._mine)
    @property
    def drill(self):
        return string.lower(self._drill)
    @property
    def mini_path(self):
        """
        This string sits right above the data level in our latest version
        specced in full monty.  ;  It is a place holder for
        adding paths that are perhaps tough to do with id_string

        This was known as measurand_mini_path in original implementation in 2016
        Now it is used to track sampling rate for exmaple.
        """
        path_segment = os.path.join(self.client, self.mine, 'drill_',string.lower(self.drill))
        return path_segment


class L0SlamStixDataKey(ClientMineDrillDataKey):
    """
    sensor_type: specifies piezo, mems, pressure, etc
    """
    def __init__(self, **kwargs):
        self._start_time = kwargs.get('start_time', '')
        self._serial_number = kwargs.get('serial_number', None)
        #self._sensor_type = kwargs.get('sensor_type', None)


class DigitizerDateDataKey(MeasurandDataKey):
    """
    """
    def __init__(self, digitizer_id, data_date, **kwargs):
        super(DigitizerDateDataKey, self).__init__(**kwargs)
        self.digitizer_id = digitizer_id
        self.data_date = data_date



class DigitizerSamplingRateDateDataKey(MeasurandDataKey):
    """
    """
    def __init__(self, digitizer_id, data_date, sampling_rate, **kwargs):
        super(DigitizerSamplingRateDateDataKey, self).__init__(**kwargs)
        self.digitizer_id = digitizer_id
        self.data_date = data_date
        self.sampling_rate = sampling_rate

    @property
    def mini_path(self):
        mini_path = '{}hz'.format(int(self.sampling_rate))
        return mini_path

#    def is_valid(self):
#        return True


class DAQSerialNumberSamplingRateComponentTimeIntervalDataKey(MeasurandDataKey):
    """
    20180823: here is my file partioning proposition for Level_1 reampled:

    level_1/piezo/serial/3200hz/axial/yyyymmddThhmmss_ssssss.npy
    """
    def __init__(self, digitizer_id, sampling_rate, component, time_interval, **kwargs):
        super(DAQSerialNumberSamplingRateComponentTimeIntervalDataKey, self).__init__(**kwargs)
        self.digitizer_id = digitizer_id
        self.sampling_rate = sampling_rate
        self.component = component
        self.time_interval = time_interval

    @property
    def mini_path(self):
        mini_path_1 = '{}'.format(self.digitizer_id)
        mini_path_2 = '{}hz'.format(int(self.sampling_rate))
        mini_path_3 = '{}'.format(self.component)

        mini_path = os.path.join(mini_path_1, mini_path_2, mini_path_3)
        return mini_path


    def time_interval_string(self):
        """
        """
        start_string = self.time_interval.lower_bound.strftime('%Y%m%dT%H%M%S')
        end_string = self.time_interval.upper_bound.strftime('%Y%m%dT%H%M%S')
        out_string = '-'.join([start_string, end_string])
        return out_string
#        pdb.set_trace()
#        print('strf, strp yyyymmddThhmmss_ssssss.npy')
#    def is_valid(self):
#        return True

class BinnedTraceHeaderDataKey(MeasurandDataKey):
    def __init__(self, digitizer_date_data_key, observer_row, mount_point, **kwargs):
        super(BinnedTraceHeaderDataKey, self).__init__(**kwargs)
        self.digitizer_date_data_key = digitizer_date_data_key
        self.mount_point = mount_point
        self.observer_row = observer_row

class BinnedTraceHeaderDataKey2WA(MeasurandDataKey):
    def __init__(self, parent_data_key, master_row, hole_profile_df, **kwargs):
        """
        NOTE: can modify so mount_point=None on input when merging with MW
        @type parent_data_key: DigitizerSamplingRateDateDataKey
        """
        super(BinnedTraceHeaderDataKey2WA, self).__init__(**kwargs)
        self.parent_data_key = parent_data_key
        self.mount_point = None #deprecated
        self.master_row = master_row
        self.hole_profile_df = hole_profile_df
#class MeasurandDataKeyL1BlastHole(DigitizerDateDataKey):
#    """
#    """
#    def __init__(self, digitizer_id, data_date, **kwargs):
#        super(MeasurandDataKeyL1BlastHole, self).__init__(**kwargs)
#        self.digitizer_id = digitizer_id
#        self.data_date = data_date
#
#    def is_valid(self):
#        return True

class Level0IDEDataKey(MeasurandDataKey):
    """
    client/mine/drill/level_0/YYYYMMDD/YYYYMMDD_SSXsssss_serial.cfg
    """
    def __init__(self):
        pass

def my_function():
    """
    """
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
