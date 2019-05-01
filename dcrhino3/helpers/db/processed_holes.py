from dcrhino3.helpers.db.base_db_model import BaseDbModel
import mysql

class ProcessedHoles(BaseDbModel):
    def __init__(self,conn):
        BaseDbModel.__init__(self, conn, table_name="processed_holes")


    @property
    def create_table_sql(self):
        sql = "CREATE TABLE IF NOT EXISTS "
        sql += self.table_name
        sql += "("
        sql += "processed_hole_id int AUTO_INCREMENT,"
        sql += "processed_at_ts int,"
        sql += "seconds_processed int,"
        sql += "hole_id text,"
        sql += "bench_name text,"
        sql += "pattern_name text,"
        sql += "hole_name text,"
        sql += "rig_id text,"
        sql += "sensor_id text,"
        sql += "digitizer_id text,"
        sql += "sensor_accelerometer_type int,"
        sql += "sensor_saturation_g int,"
        sql += "flow_id text,"
        sql += "output_folder_name text,"
        sql += "to_mp BOOLEAN Default False,"
        sql += "PRIMARY KEY(processed_hole_id)"
        sql += ") ENGINE=INNODB;"
        return  sql


    def get_processed_hole(self,processed_hole_id):
        sql = 'Select * from ' + self.table_name + " where processed_hole_id = " + str(int(processed_hole_id))
        return self.query_to_df(sql)

    def add(self,processed_at_ts,seconds_processed,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,sensor_accelerometer_type,sensor_saturation_g,flow_id,output_folder_name):
        sql = "INSERT INTO "+self.table_name+" (processed_at_ts,seconds_processed,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,sensor_accelerometer_type,sensor_saturation_g,flow_id,output_folder_name) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (processed_at_ts,seconds_processed,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,sensor_accelerometer_type,sensor_saturation_g,flow_id,output_folder_name)
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, val)
            self.conn.commit()
            return cursor
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        return

