from infi.clickhouse_orm import models, fields, engines
from enum import Enum

class TraceModel(models.Model):
    date = fields.DateTimeField()
    ts_secs = fields.Int32Field()
    config_key = fields.StringField()
    data = fields.ArrayField(fields.Float32Field())
    component = fields.Enum8Field(Enum('Components', 'null axial tangential radial'))
    metadata_id = fields.Int32Field()

    engine = engines.MergeTree('date', ('date','metadata_id'))

    @classmethod
    def table_name(cls):
        return 'traces'
