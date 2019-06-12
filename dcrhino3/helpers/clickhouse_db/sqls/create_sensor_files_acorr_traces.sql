CREATE TABLE sensor_file_acorr_traces
(
    relative_timestamp UInt32,
    microtime UInt32,
    rssi Nullable(Float64),
    batt Nullable(Float64),
    temp Nullable(Float64),
    packets Nullable(Float64),
    axial_trace  Array(Nullable(Float32)),
    tangential_trace  Array(Nullable(Float32)),
    radial_trace  Array(Nullable(Float32)),
    max_axial_acceleration Nullable(Float32),
    max_tangential_acceleration Nullable(Float32),
    max_radial_acceleration Nullable(Float32),
    min_axial_acceleration Nullable(Float32),
    min_tangential_acceleration Nullable(Float32),
    min_radial_acceleration Nullable(Float32),
    sensor_file_id UInt32,
    original_file_record_day UInt32
)
ENGINE = MergeTree()
PARTITION BY toYYYYMMDD(toDate(original_file_record_day))
ORDER BY relative_timestamp;