from dcrhino3.helpers.db.base_db_model import BaseDbModel
import mysql
import os
class AcorrFiles(BaseDbModel):
    def __init__(self,conn):
        BaseDbModel.__init__(self, conn, table_name="acorr_files")


    @property
    def create_table_sql(self):
        sql = ''
        dirname = os.path.dirname(__file__)
        f = open(os.path.join(dirname,"sqls/create_acorr_files.sql"), "r")
        sql = f.read()
        return sql


    def get_latests(self,limit=100):
        return self.query_to_df("select * from " + self.table_name + " order by acorr_file_id DESC limit " + str(limit))


    def add(self,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,filename,min_ts,max_ts):
        sql = "INSERT INTO "+self.table_name+" (hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,filename,min_ts,max_ts) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,filename,min_ts,max_ts)
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, val)
            self.conn.commit()
            return cursor
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        return True

