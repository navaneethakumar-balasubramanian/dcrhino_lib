from dcrhino3.helpers.db.base_db_model import BaseDbModel
import mysql
import os
class BlastholeObservations(BaseDbModel):
    def __init__(self,conn):
        BaseDbModel.__init__(self, conn, table_name="blasthole_observations")


    @property
    def create_table_sql(self):
        sql = ''
        dirname = os.path.dirname(__file__)
        f = open(os.path.join(dirname,"sqls/create_blasthole_observations.sql"), "r")
        sql = f.read()
        return sql

    def get_bo_to_update_acorr(self):
        sql = "SELECT bo.*,af.filename,af.created_at FROM blasthole_observations bo LEFT OUTER JOIN acorr_files af ON (af.bo_id = bo.bo_id) WHERE bo.solution != '' AND (af.created_at is NULL OR af.created_at < bo.updated_at)"
        return self.query_to_df(sql)

    def get_all_with_solution(self):
        sql = "SELECT bo.*,af.filename,af.created_at FROM blasthole_observations bo LEFT OUTER JOIN acorr_files af ON (af.bo_id = bo.bo_id) WHERE bo.solution != ''"
        return self.query_to_df(sql)



    def add(self,bo_id,files_ids,bench_name,pattern_name,hole_id,hole_name,rig_id,sensor_id,digitizer_id,start_time_max,start_time_min,solution,solution_label):
        sql = "INSERT INTO "+self.table_name+" (bo_id,files_ids,bench_name,pattern_name,hole_id,hole_name,rig_id,sensor_id,digitizer_id,start_time_max,start_time_min,solution,solution_label) VALUES (%s,%s, %s, %s, %s, %s, %s, %s, %s, %s,%s,%s,%s)"
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
        val = (bo_id,files_ids,bench_name,pattern_name,hole_id,hole_name,rig_id,sensor_id,digitizer_id,start_time_max,start_time_min,solution,solution_label,files_ids,bench_name,pattern_name,hole_id,hole_name,rig_id,sensor_id,digitizer_id,start_time_max,start_time_min,solution,solution_label)
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, val)
            self.conn.commit()
            return cursor.lastrowid
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        return True