import h5py

from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.h5_helper import H5Helper
logger = init_logging(__name__)



class RawFileManager:
    def __init__(self,env_config):
        self.env_config = env_config

    def file_props(self,raw_path):
        if ".ide" in str(raw_path).lower():
            logger.warn("Convert to h5 first")
        elif ".h5" in str(raw_path).lower():
            h5f = h5py.File(raw_path, 'r+')
            if self.is_h5_level0(h5f):
                mine_name = ''
                rig_id = ''
                sensor_id = ''
                digitizer_id = ''
                min_ts = ''
                max_ts = ''
                return {"mine_name":mine_name,"rig_id":rig_id,"sensor_id":sensor_id,"digitizer_id":digitizer_id,"min_ts":min_ts,"max_ts":max_ts}
            else:
                td = TraceData()
                td.load_from_h5(h5f)
                mine_name = td.mine_name
                rig_id = td.rig_id
                sensor_id = td.sensor_id
                digitizer_id = td.digitizer_id
                min_ts = td.dataframe.timestamp.min()
                max_ts = td.dataframe.timestamp.max()
                return {"mine_name":mine_name,"rig_id":rig_id,"sensor_id":sensor_id,"digitizer_id":digitizer_id,"min_ts":min_ts,"max_ts":max_ts}
        else:
            logger.error("Unable to identify this file : " + str(raw_path))
        return False


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