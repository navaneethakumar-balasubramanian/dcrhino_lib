from dcrhino3.helpers.db.base_db_model import BaseDbModel
import mysql
import os

class ProcessedHoles(BaseDbModel):
    def __init__(self,conn):
        BaseDbModel.__init__(self, conn, table_name="processed_holes")

    @property
    def create_table_sql(self):
        sql = ''
        dirname = os.path.dirname(__file__)
        f = open(os.path.join(dirname, "sqls/create_processed_holes.sql"), "r")
        sql = f.read()
        return sql


    def get_processed_holes(self,processed_hole_ids):
        sql = 'Select * from ' + self.table_name + " where processed_hole_id IN ( " + ",".join(processed_hole_ids) + ")"
        return self.query_to_df(sql)

    def get_latests_process_for_each_hole(self):
        query = 'SELECT * FROM processed_holes WHERE processed_hole_id IN( SELECT MAX(processed_hole_id) FROM processed_holes GROUP BY bench_name, pattern_name, hole_name )'
        return self.query_to_df(query)

    def get_holes_to_mp(self):
        return self.get_latests_process_for_each_hole()

    def get_latests(self,limit=1000):
        return self.query_to_df("select * from " + self.table_name + " order by processed_hole_id DESC limit " + str(limit))



    def hole_to_mp(self,processed_hole_id,to_mp):
        sql = "UPDATE " + self.table_name + " set to_mp = %s where processed_hole_id = %s"
        val = (to_mp,processed_hole_id)
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql,val)
            self.conn.commit()
            return True
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        return False

    def get_search_string(self,search,limit=1000,_from=0,_to=0):
        query = "select * from " + self.table_name +" where "
        if search is not None:
            words = str(search).split(" ")
            for word in words:
                if word is not None:
                    query += 'LOWER(CONCAT(bench_name,pattern_name,hole_name,hole_id,rig_id,sensor_id,digitizer_id,flow_id)) LIKE LOWER("%'+str(word)+'%") and '
        if _from != 0 and _to != 0:
            query += " processed_at_ts >= " + str(_from) + " and processed_at_ts <= " + str(_to) + " and "
        query += "1 = 1 order by processed_hole_id DESC limit " + str(limit)
        print query
        return self.query_to_df(query)

    def add(self,processed_at_ts,seconds_processed,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,sensor_accelerometer_type,sensor_saturation_g,flow_id,output_folder_name,process_id=-1):
        sql = "INSERT INTO "+self.table_name+" (processed_at_ts,seconds_processed,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,sensor_accelerometer_type,sensor_saturation_g,flow_id,output_folder_name,process_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s , %s)"
        val = (processed_at_ts,seconds_processed,hole_id,sensor_id,bench_name,pattern_name,hole_name,rig_id,digitizer_id,sensor_accelerometer_type,sensor_saturation_g,flow_id,output_folder_name,process_id)
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, val)
            self.conn.commit()
            return cursor
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
        return True

