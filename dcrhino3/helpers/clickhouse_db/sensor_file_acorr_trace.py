from dcrhino3.helpers.clickhouse_db.base_clickhouse_model import BaseClickhouseModel
import numpy as np

class SensorFileAcorrTrace(BaseClickhouseModel):

    def __init__(self,conn):
        BaseClickhouseModel.__init__(self, conn, table_name="sensor_file_acorr_traces")

    def add_pandas_to_table(self,df):
        if np.array(self.columns.values).astype(str).sort() == np.array(df.columns.values).astype(str).sort():
            df = df[np.array(self.columns.values).astype(str)]
            self.conn.execute('insert into ' + self.table_name + ' values', df.values.tolist())
        else:
            pass

    def get_meta_from_multiple_sensor_file_ids(self,sensor_file_ids,columns):
        query = 'select sensor_file_id,relative_timestamp,'+ ','.join(columns) +' from ' + self.table_name + ' where sensor_file_id in (' + ','.join(sensor_file_ids.astype(str)) + ")"
        return self.query_to_pandas(self.conn.execute(query , with_column_types=True))

    def get_traces(self,sensor_file_id,relative_min_ts,relative_max_ts):
        return self.query_to_pandas(self.conn.execute('select * from '+self.table_name+' where relative_timestamp >= '+str(relative_min_ts)+' and relative_timestamp <= ' + str(relative_max_ts) + ' and sensor_file_id = ' +str(sensor_file_id),with_column_types=True))