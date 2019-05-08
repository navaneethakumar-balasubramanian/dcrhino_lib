from dcrhino3.helpers.db.base_db_model import BaseDbModel
import mysql
import os
class SensorFiles(BaseDbModel):
    def __init__(self,conn):
        BaseDbModel.__init__(self, conn, table_name="sensor_files")


    @property
    def create_table_sql(self):
        sql = ''
        dirname = os.path.dirname(__file__)
        f = open(os.path.join(dirname,"sqls/create_sensor_files.sql"), "r")
        sql = f.read()
        return sql



    def add(self,file_path,rig_id,sensor_id,digitizer_id,min_ts,max_ts,config_str,type):
        sql = "INSERT INTO "+self.table_name+" (file_path,rig_id,sensor_id,digitizer_id,min_ts,max_ts,config_str,type) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        val = (file_path,rig_id,sensor_id,digitizer_id,min_ts,max_ts,config_str,type)
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, val)
            self.conn.commit()
            return cursor
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        return True

