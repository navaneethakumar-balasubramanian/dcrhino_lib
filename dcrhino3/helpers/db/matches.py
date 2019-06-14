from dcrhino3.helpers.db.base_db_model import BaseDbModel
import mysql
import os
class Matches(BaseDbModel):
    def __init__(self,conn):
        BaseDbModel.__init__(self, conn, table_name="matches")


    @property
    def create_table_sql(self):
        sql = ''
        dirname = os.path.dirname(__file__)
        f = open(os.path.join(dirname,"sqls/create_matches.sql"), "r")
        sql = f.read()
        return sql

    def get_all_valid(self):
        return self.query_to_df("select * from " + self.table_name + " where status='valid'")


    def add(self,match_id,files_ids,bench_name,pattern_name,hole_id,hole_name,rig_id,sensor_id,digitizer_id,start_time_max,start_time_min,solution,solution_label):
        sql = "INSERT INTO "+self.table_name+" (match_id,files_ids,bench_name,pattern_name,hole_id,hole_name,rig_id,sensor_id,digitizer_id,start_time_max,start_time_min,solution,solution_label) VALUES (%s,%s, %s, %s, %s, %s, %s, %s, %s, %s,%s,%s,%s)"
        sql += " ON DUPLICATE KEY UPDATE "
        sql += " files_ids = %s,"
        sql += " bench_name = %s,"
        sql += " pattern_name = %s,"
        sql += " hole_id = %s,"
        sql += " hole_name = %s,"
        sql += " rig_id = %s,"
        sql += " sensor_id = %s,"
        sql += " digitizer_id = %s,"
        sql += " start_time_max = %s,"
        sql += " start_time_min = %s,"
        sql += " solution = %s,"
        sql += " solution_label = %s"
        val = (match_id,files_ids,bench_name,pattern_name,hole_id,hole_name,rig_id,sensor_id,digitizer_id,start_time_max,start_time_min,solution,solution_label,files_ids,bench_name,pattern_name,hole_id,hole_name,rig_id,sensor_id,digitizer_id,start_time_max,start_time_min,solution,solution_label)
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, val)
            self.conn.commit()
            return cursor.lastrowid
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        return True