from infi.clickhouse_orm import models, fields, engines
from infi.clickhouse_orm.database import Database
import numpy as np

class RawDataModel(models.Model):

    dt = fields.DateField()
    ts = fields.StringField()
    ts_secs = fields.Int32Field()
    ts_micro = fields.Int32Field()
    seq = fields.Int64Field()
    clk = fields.Int64Field()
    x = fields.Int32Field()
    y = fields.Int32Field()
    z = fields.Int32Field()
    seq2 = fields.Int64Field()
    txseq2 = fields.Int64Field()

    engine = engines.MergeTree('dt', ('ts_secs', 'ts_micro'))

    def set_date_fields(self,date_time):
        my_date = date_time.date()
        #print (date_time.strftime("%Y-%m-%d") ,date_time.strftime("%s.%f"))
        self.dt = my_date.strftime("%Y-%m-%d")
        self.ts = date_time.strftime("%s.%f")
        self.ts_secs = date_time.strftime("%s")
        self.ts_micro = date_time.strftime("%f")


    @classmethod
    def table_name(cls):
        return 'raw_data'
