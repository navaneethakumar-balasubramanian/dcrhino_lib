from infi.clickhouse_orm import models, fields, engines
class PusherModel(models.Model):
    last_synced_ts = fields.StringField()
    last_synced_srl_nmbr = fields.StringField()

    engine = engines.MergeTree('last_synced_ts',('last_synced_srl_nmbr'))

    @classmethod
    def table_name(cls):
        return 'pusher'
