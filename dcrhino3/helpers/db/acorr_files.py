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

    def bo_id_exists(self,bo_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT count(*) FROM "+self.table_name+" where bo_id = '"+str(bo_id)+"'")
        result = cursor.fetchone()
        return int(result[0]) > 0

    def add_or_update(self,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,filename,min_ts,max_ts,bo_id):
        if self.bo_id_exists(bo_id):
            self.update(self,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,filename,min_ts,max_ts,bo_id)
        else:
            self.add(self,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,filename,min_ts,max_ts,bo_id)

    def update(self,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,filename,min_ts,max_ts,bo_id):
        sql = "UPDATE " + self.table_name + " set (rig_id=%s, digitizer_id=%s, filename=%s, min_ts=%s, max_ts=%s) where bo_id=%s"
        val = (rig_id, digitizer_id, filename, min_ts, max_ts, bo_id)
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, val)
            self.conn.commit()
            return cursor
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
            return False

    def add(self,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,filename,min_ts,max_ts,bo_id):
        sql = "INSERT INTO "+self.table_name+" (hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,filename,min_ts,max_ts,bo_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,filename,min_ts,max_ts,bo_id)
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, val)
            self.conn.commit()
            return cursor
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
            return False


