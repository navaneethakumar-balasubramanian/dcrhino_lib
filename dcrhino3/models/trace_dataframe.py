#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""

@author: natal

@note 20190123: we have not discussed exactly how we will handle the global_config
storage.  We know that for a particular trace only one global config can be active
and since a trace comes from a file, we are planning to reference the global_config
of a file to the trace.  A modest complication we have discussed is when a file
has more than one config.  I cannot recall how that is possible but it seems that
it is believed to be possible (@TODO: discuss this case ... can we eliminate it?
is it becuase we may swap out a sensor without rebooting rhino?? ... or is this
because different processing types maybe used for different traces?  Or because a
single hole could have a reboot where some cfg changes, i.e. sampling rate -- but wouldn't that
result in a new file uid??)
In any case, the dataset we get back will be a dataframe indexed by timestamp.
For each timestamp there are traces but also a column called 'acorr_file_id', this
is an integer which is basically a uid for the parent file and can be used to call
the relevant config ... it is equal to 14 in our prelimniary test)

So the global configs should be a dictionary, keyed by 'acorr_file_id',
"""

from __future__ import absolute_import, division, print_function

from datetime import datetime
from enum import Enum
import h5py
import json
import numpy as np
import os
import pandas as pd
import pdb

from dcrhino3.helpers.general_helper_functions import init_logging,create_folders_if_needed
from dcrhino3.models.config import Config

logger = init_logging(__name__)

COMPONENT_IDS = ['axial', 'tangential', 'radial']
TRACE_COLUMN_LABELS = ['{}_trace'.format(x) for x in COMPONENT_IDS]


class ModuleType(Enum):
    RAW = 1
    INTERPOLATION = 2
    AUTOCORRELATION = 3
    MWD_MERGE = 4
    LEAD_DECON = 5
    LAG_DECON = 6
    BAND_PASS_FILTER = 7
    PHASE_ROTATION = 8
    TRIM = 9



class TraceData(object):
    def __init__(self, **kwargs):
        """
        """
        self.dataframe = kwargs.get('df', pd.DataFrame())
        self.applied_modules = []
        self._global_configs = dict()


    @property
    def mine_name(self):
        return self.first_global_config.mine_name

    @property
    def first_global_config(self):
        return self.global_config_by_index(self.dataframe["acorr_file_id"].values[0])

    def apply_module(self,module_type,arguments):
        """
        """
        self.applied_modules.append({module_type:arguments})
        #return the index where it was appended
        return len(self.applied_modules)-1

    def load_from_db(self, db_helper, files_ids, min_ts, max_ts):
        """
        @type db_helper: dcrhino3.helpers.rhino_db_helper.RhinoDBHelper
        @type files_ids: list (of integers)
        @type min_ts, max_ts: integer (or float?)
        @param min_ts, max_ts: start and end timestamps of data set to get from db

        @note: the intended use case for this function is to get data from a
        'observed-blasthole'.  Normally len(files_ids) will equal 1, but we need to
        consider the case where the hole is in more than one file ...
        @TODO: push thhe handling of the files_ids, and timestamps back a layer so the
        user doesn't use this method outside of exceptional circumstances ...
        i.e. it will be more common to request a blasthole, together with a sensor_id
        """
        self.dataframe = db_helper.get_autocor_traces_from_files_ids(files_ids,min_ts,max_ts)
        for file_id in files_ids:
            file_config = db_helper.get_last_file_config_from_file_id(file_id)
            global_config = Config()
            global_config.set_data_from_json(json.loads(file_config))
            self._global_configs[file_id] = global_config


    def save_to_csv(self,path):
        df = self.copy_without_trace_data()
        first_global_config = self.global_config_by_index(df['acorr_file_id'].values[0])
        df['sensor_id'] = first_global_config.sensor_serial_number
        df['digitizer_id'] = first_global_config.digitizer_serial_number
        df['rhino_sensor_uid'] = str(first_global_config.sensor_type) + "_" + str(first_global_config.sensor_serial_number) + "_" + str(first_global_config.digitizer_serial_number) + "_" + str(first_global_config.sensor_accelerometer_type) + "_" + str(first_global_config.sensor_saturation_g)
        df.to_csv(path,index=False)

    def save_to_h5(self, path):
        """
        @note: when porting to python3 replace iteritems with items see Keith's answer in
        https://stackoverflow.com/questions/10458437/what-is-the-difference-between-dict-items-and-dict-iteritems
        @warning: this requires dtypes to be float, will need to use a mapping of
        dtypes for df columns ... where will we get this? @Thiago: will this
        be maintained in database models?

        @note 20190122: This needs to handle three forms of 'saving'
        1. Save the traces (as float32, today they will store as float, will check 32 or 64 later)
        2. Save any columns from the mwd
        3. Save the global_config (as json dumps?)

        @ToDo: clean up iteration over trace labels to use only the
        components specified in global_config
        """
        #df_as_dict = dict(self.dataframe)

        all_columns = list(self.dataframe.columns)
        folder = os.path.dirname(path)
        create_folders_if_needed(folder)
        h5f = h5py.File(path, 'w')

        #<save traces>
        for component_id in COMPONENT_IDS:
            try:
                trace_label = '{}_trace'.format(component_id)
                trace_data = self.component_as_array(component_id)
                h5f.create_dataset(trace_label, data=trace_data, dtype=float)#, compression="gzip", compression_opts=9)
                all_columns.remove(trace_label)
            except KeyError:
                logger.info('Skipping saving {} as it DNE'.format(trace_label))
        #<save traces>

        #<mwd columns>
        mwd_columns = all_columns#traces removed
        for column_label in mwd_columns:
            dtype = type(self.dataframe[column_label].iloc[0])
            #print (column_label, dtype)
            column_data = np.asarray(self.dataframe[column_label])
            if dtype == str or dtype == unicode:
                dt = h5py.special_dtype(vlen=unicode)
                h5f.create_dataset(column_label, data=column_data, dtype=dt)#, compression="gzip", compression_opts=9)
            elif dtype == np.int64:
                h5f.create_dataset(column_label, data=column_data, dtype='i8')#, compression="gzip", compression_opts=9)
            else:
                column_data = column_data.astype(float)
                h5f.create_dataset(column_label, data=column_data, dtype=float)#, compression="gzip", compression_opts=9)
        #</mwd columns>

        #<config>
        configs_dict = {}
        for file_id in self._global_configs.keys():
            unicode_string = self.global_config_by_index(file_id).json_string()
            configs_dict[file_id] = unicode_string
        all_configs_as_a_string = json.dumps(configs_dict)
        h5f.attrs['global_config_jsons'] = all_configs_as_a_string
        #</config>

        h5f.close()
        return

    def realtime_append_to_h5(self,path,file_id='0',global_config=None):
        all_columns = list(self.dataframe.columns)
        max_shape = (None,)
        dtype = np.uint32
        h5f = h5py.File(path, 'a')
        for column in all_columns:

            if column[-9:]=="ial_trace":
                dtype = np.float32
                data=list([self.dataframe[column][0],])
                max_shape = (None,None)
            elif "acceleration" in column:
                dtype = np.float32
                data = np.asarray(self.dataframe[column],dtype=dtype)
            else:
                data = np.asarray(self.dataframe[column],dtype=dtype)
            if column in h5f.keys():
                ds = h5f[column]
                ds.resize(ds.shape[0] + 1, axis = 0)
                ds[-1:] = data
            else:
                ds = h5f.create_dataset(column, chunks=True,data=data,
                                        dtype=dtype, maxshape=max_shape,compression="gzip", compression_opts=9)
        #<config>
        configs_dict = {}
        if file_id in self._global_configs.keys():
            if not 'global_config_jsons' in h5f.attrs.keys():
                unicode_string = self.global_config_by_index(file_id).json_string()
                configs_dict[file_id] = unicode_string
                all_configs_as_a_string = json.dumps(configs_dict)
                h5f.attrs['global_config_jsons'] = all_configs_as_a_string
        else:
            self.add_global_config(global_config,file_id)
            configs_dict = {}
            for each_file_id in self._global_configs.keys():
                unicode_string = self.global_config_by_index(each_file_id).json_string()
                configs_dict[each_file_id] = unicode_string
            all_configs_as_a_string = json.dumps(configs_dict)
            h5f.attrs['global_config_jsons'] = all_configs_as_a_string
        h5f.close()
        return


    def load_from_h5(self,path):
        """
        inverse of save_to_h5; Handle traces, then other columns, then json cfg
        """
        h5f = h5py.File(path, 'r')
        dict_for_df = {}

        #<load traces>
        for component_id in COMPONENT_IDS:
            try:
                trace_label = '{}_trace'.format(component_id)
                trace_data = h5f.get(trace_label)
                trace_data = np.asarray(trace_data)
                trace_data = list(trace_data)
                dict_for_df[trace_label] = trace_data
            except KeyError:
                logger.info('Skipping loading {} as it DNE'.format(trace_label))
        #</load traces>

        for key in h5f.keys():
            if key[-9:]=='ial_trace':#skip traces
                continue
            data = h5f.get(key)
            dict_for_df[key] = np.asarray(data)
        df = pd.DataFrame(dict_for_df)
        self.dataframe = df

        #<config>
        unicode_string = h5f.attrs['global_config_jsons']
        global_config_jsons = json.loads(unicode_string)
        for file_id, file_config in global_config_jsons.iteritems():
            global_config = Config()
            global_config.set_data_from_json(json.loads(file_config))
            self.add_global_config(global_config, str(file_id))
        #</config>

        h5f.close()
        return

    def add_applied_module(self,module_string):
        self.applied_modules.append(module_string)

    def add_global_config(self,global_config, file_id):
        self._global_configs[file_id] = global_config
        return file_id

    def global_config_to_json_string(self):
        pass

    def remove_global_config(self,index):
        pass

    def global_config_by_index(self,index):
        return self._global_configs[str(index)]

    def component_as_array(self, component_id):
        """
        returns the data form component as a 2d numpy array with trace index
        running along rows (zero-index).  Useful for slicing data and linalg.
        """
        column_name = '{}_trace'.format(component_id)
        data_array = np.atleast_2d(list(self.dataframe[column_name]))
        return data_array

    def copy_without_trace_data(self):
        output_df = self.dataframe.copy(deep=False)
        for trace_column_label in TRACE_COLUMN_LABELS:
            try:
                output_df = output_df.drop([trace_column_label,], axis=1)
            except ValueError:
                pass#that column was never there in the first place
        return output_df

def main():
    pass

if __name__ == "__main__":
  main()
