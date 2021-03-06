import mysql
import pandas as pd

class BaseDbModel:
    def __init__(self,conn,table_name):
        self.conn = conn
        self.table_name = table_name
        self.create_table()



    def create_table(self):
        try:
            self.cursor = self.conn.cursor()
            self.cursor.execute(self.create_table_sql)
            self.cursor.close()
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))

    def get_all(self):
        return self.query_to_df("select * from " + self.table_name)

    def query_to_df(self,query):
        cursor = self.query(query)
        return pd.DataFrame(cursor.fetchall(), columns=cursor.column_names)


    def query(self,query):
        try:
            cursor = self.conn.cursor()
            cursor.execute(query)
            return cursor
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))