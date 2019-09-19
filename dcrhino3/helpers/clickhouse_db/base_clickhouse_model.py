import pandas as pd
import numpy as np

class BaseClickhouseModel:
    def __init__(self,conn,table_name):
        self.conn = conn
        self.table_name = table_name
        self.columns = self._get_columns()
        self._onCreate()


    def _get_columns(self):
        return self.query_to_pandas(self.conn.execute("Describe " + self.table_name,with_column_types=True))['name']

    def query_to_pandas(self,query):
        column_names = np.array(query[1]).T[0]
        column_types = np.array(query[1]).T[1]
        df = pd.DataFrame(query[0],columns=column_names)
        return df



    def _onCreate(self):

        pass