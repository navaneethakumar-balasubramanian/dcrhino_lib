import os
import pdb

dirname = os.path.dirname

# clickhouse-client -h 35.197.20.47 --port 9000 -u default --password dcmwd123

ROOT_PATH = dirname(dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(ROOT_PATH, "data")
#[224, 226, 221, 231]
MACHINE_IDS = {
  "final_SSX64601_BH1-BH2_Ch32_peak.csv" : "224",
  "corr_decon_100ms_SSX50598_BH1-BH2_Ch08_peak.csv" : "226",
  "corr_decon_100ms_SSX50598_BH3-BH5_Ch08_peak.csv" : "226",
  "corr_decon_100ms_SSX50598_BH6-BH7_Ch08_peak.csv" : "226",
  "corr_decon_100ms_SSX51008_BH1-BH2_Ch08_peak.csv" : "231",
  "corr_decon_100ms_SSX51008_BH3-BH5_Ch08_peak.csv" : "231",
  "corr_decon_100ms_SSX51008_BH6-BH7_Ch08_peak.csv" : "231",
  "corr_decon_100ms_SSX51093_BH1-BH2_Ch08_peak.csv" : "231",
  "corr_decon_100ms_SSX51093_BH3-BH5_Ch08_peak.csv" : "231",
  "corr_decon_100ms_SSX51093_BH6-BH7_Ch08_peak.csv" : "231",
  "corr_decon_100ms_SSX64601_BH1-BH2_Ch08_peak.csv" : "226",
  "corr_decon_100ms_SSX64601_BH3-BH4_Ch08_peak.csv" : "226",
  "corr_decon_100ms_SSX68758_BH1-BH2_Ch08_peak.csv" : "224",
  "corr_decon_100ms_SSX68758_BH3-BH4_Ch08_peak.csv" : "224",
  "corr_decon_100ms_SSX68875_BH1-BH2_Ch08_peak.csv" : "224",
  "corr_decon_100ms_SSX68875_BH3-BH4_Ch08_peak.csv" : "224"
}
