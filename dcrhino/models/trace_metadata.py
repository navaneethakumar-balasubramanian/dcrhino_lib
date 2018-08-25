from infi.clickhouse_orm import models, fields, engines

class TraceMetadataModel(models.Model):
    id = fields.Int32Field()
    date = fields.DateTimeField()
    values_string = fields.StringField()


    engine = engines.MergeTree('date',('date','id'))

    @classmethod
    def table_name(cls):
        return 'trace_metadata'
