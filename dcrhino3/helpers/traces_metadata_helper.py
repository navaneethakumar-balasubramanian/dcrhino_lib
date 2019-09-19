from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.helpers.rhino_clickhouse_helper import ClickhouseHelper
from dcrhino3.models.env_config import EnvConfig
import pandas as pd

class TracesMetadataHelper:
    def __init__(self,env_config,mine_name):
        self.mine_name = mine_name
        self.env_config = env_config
        self.sql_connection = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
        self.sql_db_helper = RhinoSqlHelper(**self.sql_connection)
        self.clickhouse_connection = env_config.get_rhino_db_connection_from_mine_name(mine_name)
        self.clickhouse_helper = ClickhouseHelper(conn=self.clickhouse_connection)

    def get_traces_metadata_from_to(self,timestamp_start,timestamp_end,columns=['max_tangential_acceleration','min_tangential_acceleration','max_axial_acceleration','min_axial_acceleration']):
        all_valid_sensor_files = self.sql_db_helper.sensor_files.get_all_valid()
        all_valid_sensor_files = all_valid_sensor_files[((all_valid_sensor_files.min_ts.astype(float) >= timestamp_start) & (all_valid_sensor_files.min_ts.astype(float) <= timestamp_end)) | ((all_valid_sensor_files.max_ts.astype(float) >= timestamp_start) & (all_valid_sensor_files.max_ts.astype(float) <= timestamp_end))  ]
        meta = self.clickhouse_helper.sensor_file_acorr_trace.get_meta_from_multiple_sensor_file_ids(all_valid_sensor_files.sensor_file_id.unique(), columns=columns)
        all_valid_sensor_files.sensor_file_id = all_valid_sensor_files.sensor_file_id.astype(int)
        merged = pd.merge(meta, right=all_valid_sensor_files,on='sensor_file_id')
        merged['timestamp'] = merged.relative_timestamp.astype(float) + merged.min_ts.astype(float)
        merged = merged[(merged.timestamp >= timestamp_start) & (merged.timestamp <= timestamp_end)]
        return merged




if __name__ == '__main__':
    env_config = EnvConfig()
    meta_helper = TracesMetadataHelper(env_config,'south_walker_creek')
    dd = meta_helper.get_traces_metadata_from_to(1561153798,99999999999)
    print("test done")