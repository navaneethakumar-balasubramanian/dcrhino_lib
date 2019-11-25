from dcrhino3.models.trace_dataframe import TraceData

qq = TraceData()
qq.load_from_h5("/data/bmc/south_walker_creek/processed/100_100_19761_19761_7271_7271/20190916-214354_swc_v7.3_widen-ampl-picks_3045160200/processed.h5")
print(qq)