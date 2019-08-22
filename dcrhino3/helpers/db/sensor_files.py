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

    def set_status(self,sensor_file_id,status):
        sql = "UPDATE " + self.table_name + " set status = (%s) where sensor_file_id = (%s)"
        val = (status,sensor_file_id)
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql,val)
            self.conn.commit()
            return cursor
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        return False



    def get_all_valid(self):
        df = self.query_to_df("select * from " + self.table_name + " where status='valid'")
        return df

    def add(self,file_path,rig_id,sensor_id,digitizer_id,min_ts,max_ts,config_str,type,status,file_name,original_file_record_day,file_changed_at,file_size,file_checksum):

        sql = "INSERT INTO "+self.table_name+" (file_path,rig_id,sensor_id,digitizer_id,min_ts,max_ts,config_str,type,status,file_name,original_file_record_day,file_changed_at,file_size,file_checksum) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s,%s,%s,%s,%s, %s)"
        val = (file_path,rig_id,sensor_id,digitizer_id,min_ts,max_ts,config_str,type,status,file_name,original_file_record_day,file_changed_at,file_size,file_checksum)
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, val)
            self.conn.commit()
            return cursor.lastrowid
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        return True

    def file_name_exists(self,file_name,status=False):
        if status:
            sql= "SELECT count(*) from " + self.table_name + " where file_name = '" + str(file_name) + "' and status = '" + status + "'"
        else:
            sql = "SELECT count(*) from " + self.table_name + " where file_name = '" + str(file_name) + "'"
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql)
            result = cursor.fetchone()
            return result != ['0']
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        return False

    def get_file_by_relative_path(self,path):
        return self.query_to_df("SELECT * from " + self.table_name + " where file_path = '" + str(path)+ "'")

    def relative_path_exists(self,path,status=False):
        if status:
            sql= "SELECT count(*) from " + self.table_name + " where file_path = '" + str(path) + "' and status = '" + status + "'"
        else:
            sql = "SELECT count(*) from " + self.table_name + " where file_path = '" + str(path) + "'"
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql)
            result = cursor.fetchone()
            return result != ['0']
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        return False