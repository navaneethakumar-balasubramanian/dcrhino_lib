import h5py
import os
import json
from datetime import datetime

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.h5_helper import H5Helper
from dcrhino3.models.traces.raw_trace import RawTraceData
logger = init_logging(__name__)



class SensorFileManager:
    def __init__(self,env_config):
        self.env_config = env_config

    def file_props(self,raw_path):
        if ".ide" in str(raw_path).lower():
            logger.warn("Convert to h5 first")
            return False
        elif ".h5" in str(raw_path).lower():
            h5f = h5py.File(raw_path, 'r+')
            if self.is_h5_level0(h5f):
                raw_trace = RawTraceData()
                raw_trace.load_from_h5(str(raw_path))

                mine_name = raw_trace.global_config_by_index(0).mine_name
                rig_id = raw_trace.global_config_by_index(0).rig_id
                sensor_id = raw_trace.global_config_by_index(0).sensor_serial_number
                digitizer_id = raw_trace.global_config_by_index(0).digitizer_serial_number
                min_ts = raw_trace.dataframe.timestamp.min()
                max_ts = raw_trace.dataframe.timestamp.max()
                global_config = raw_trace.global_config_by_index("0")
                config_str = json.dumps(vars(global_config), indent=4)
                type = 1
            else:
                td = TraceData()
                td.load_from_h5(h5f)
                mine_name = td.mine_name
                rig_id = td.rig_id
                sensor_id = td.sensor_id
                digitizer_id = td.digitizer_id
                min_ts = td.dataframe.timestamp.min()
                max_ts = td.dataframe.timestamp.max()
                global_config = td.first_global_config()
                config_str = json.dumps(vars(global_config), indent=4)
                type = 2

        else:
            logger.error("Unable to identify this file : " + str(raw_path))
            return False
        sensor_files_storage_folder = self.env_config.get_sensor_files_storage_folder(mine_name)
        date = datetime.utcfromtimestamp(min_ts).strftime('%Y%m%d')
        storage_file_path = os.path.join(sensor_files_storage_folder,rig_id,sensor_id,digitizer_id,date,os.path.basename(raw_path))

        return {"file_path_actual":raw_path,"file_path_storage":storage_file_path,"mine_name": mine_name, "rig_id": rig_id, "sensor_id": sensor_id, "digitizer_id": digitizer_id, "min_ts": min_ts, "max_ts": max_ts, "type": type,'config_str':config_str}



    def raw_to_acorr(self,raw_path):
        if ".ide" in str(raw_path).lower():
            logger.warn("Convert to h5 first")
            pass
        elif ".h5" in str(raw_path).lower():
            h5f = h5py.File(raw_path, 'r+')
            if self.is_h5_level0(h5f):
                pass
            else:
                td = TraceData()
                td.load_from_h5(h5f)
                mine_name = td.mine_name
                rig_id = td.rig_id
                sensor_id = td.sensor_id
                digitizer_id = td.digitizer_id
                min_ts = td.dataframe.to_timestamp.min()
                max_ts = td.dataframe.to_timestamp.max()
                print "aa"
                pass
            pass
        else:
            logger.error("Unable to identify this file : " + str(raw_path))


    def is_h5_level0(self,h5f):
        if 'cticks' in h5f.keys():
            return True
        return False


    def min_ts(self,h5f):
        if 'ts' in h5f.keys():
            return int(h5f['ts'][0])
        elif 'timestamp' in h5f.keys():
            return int(h5f['timestamp'][0])
        return False

    def max_ts(self,h5f):
        if 'ts' in h5f.keys():
            return int(h5f['ts'][-1])
        elif 'timestamp' in h5f.keys():
            return int(h5f['timestamp'][-1])
        return False