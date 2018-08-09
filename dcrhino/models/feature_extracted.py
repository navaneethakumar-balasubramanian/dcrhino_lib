from infi.clickhouse_orm import models, fields, engines

class FeatureExtractedModel(models.Model):
    date = fields.DateTimeField()
    radial_primary_peak_sample = fields.Float64Field()
    tangential_primary_peak_sample = fields.Float64Field()
    axial_multiple_peak_sample = fields.Float64Field()
    axial_multiple_peak_time_sample = fields.Float64Field()
    axial_multiple_pk_error = fields.Float64Field()
    axial_primary_left_trough_time = fields.Float64Field()
    axial_primary_left_trough_time_sample = fields.Float64Field()
    axial_primary_peak_sample = fields.Float64Field()
    axial_primary_peak_time_sample = fields.Float64Field()
    axial_primary_zero_crossing_after_sample = fields.Float64Field()
    axial_primary_zero_crossing_prior_sample = fields.Float64Field()

    engine = engines.TinyLog()

    @classmethod
    def table_name(cls):
        return 'feature_extracted'
