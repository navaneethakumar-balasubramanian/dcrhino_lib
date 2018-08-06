import pandas as pd
import pdb
import numpy as np
import math
import os

from dcrhino.constants import DATA_PATH

folder29 = os.path.join(DATA_PATH, "29")
folder30 = os.path.join(DATA_PATH, "30")
folder31 = os.path.join(DATA_PATH, "31")
folder = folder29

# bench and pattern are dummy placeholder, they could be wrong
benches = {folder29: "P588", folder30: "E770", folder31: "E770"}
patterns = {folder29: "130", folder30: "1", folder31: "2"}

# This was mailed by Jamie and Doug
drill_dia = 13.75 * 0.0254
drill_radius = drill_dia / 2
area = (math.pi * drill_radius * drill_radius)

#MWD file taken from sharepoint
hole_profile = pd.read_csv(os.path.join(folder, 'HoleProfile.csv'), parse_dates=['hole_start_utc', 'time_start_utc', 'time_end_utc'])
if folder == folder29:
    hole_profile = hole_profile.iloc[:,7:]
    pdb.set_trace()
hole_profile = hole_profile.dropna()
hole_profile['hole_id'] = hole_profile['hole_id'].astype(int)
hole_profile['end_depth'] = hole_profile['end_depth'].astype(float)
hole_profile['machine_id'] = hole_profile['machine_id'].astype(int)
hole_profile['hole_profile_id'] = hole_profile['hole_profile_id'].astype(int)
hole_profile['hole_start_utc'] = (hole_profile['hole_start_utc'].astype(np.int64) / 1000000000).astype(np.int64)
hole_profile['time_start_utc'] = (hole_profile['time_start_utc'].astype(np.int64) / 1000000000).astype(np.int64)
hole_profile['time_end_utc'] = (hole_profile['time_end_utc'].astype(np.int64) / 1000000000).astype(np.int64)
hole_profile['bench'] = benches[folder]
hole_profile['pattern'] = patterns[folder]

hole_profile['rop'] = hole_profile['rop'].replace(0, np.NaN)
hole_profile['rop'] = hole_profile['rop'].interpolate()

hole_profile['weight_on_bit'] = hole_profile['weight_on_bit'].replace(0, np.NaN)
hole_profile['weight_on_bit'] = hole_profile['weight_on_bit'].interpolate()

hole_profile['rpm'] = hole_profile['rpm'].replace(0, np.NaN)
hole_profile['rpm'] = hole_profile['rpm'].interpolate()

hole_profile['torque'] = hole_profile['torque'].replace(0, np.NaN)
hole_profile['torque'] = hole_profile['torque'].interpolate()

hole_profile['mse'] = (((hole_profile['weight_on_bit'] * 1000) / area) + ((2 * math.pi * hole_profile['rpm'] * (hole_profile['torque'] * 1000)) / (area * (hole_profile['rop'] * 60)))) / 1000000
pdb.set_trace()
hole_info = pd.read_csv(os.path.join(folder, 'HoleInfo.csv'))
hole_info = hole_info.rename(columns={'name': 'hole'})
hole_info = hole_info.dropna()

hole_position = pd.read_csv(os.path.join(folder, 'HolePosition.csv'))
hole_position = hole_position.dropna()
hole_position = hole_position.rename(columns={'start_x': 'northing', 'start_y': 'easting', 'collarelevation': 'collar_elevation'})
hole_profile = pd.merge(hole_profile, hole_info[['hole', 'hole_id']], on=['hole_id'], how='left')
final_df = hole_profile[['hole', 'bench', 'pattern','mse', 'hole_profile_id', 'hole_id', 'machine_id', 'hole_start_utc', 'time_start_utc', 'time_end_utc', 'start_depth', 'end_depth', 'rpm', 'weight_on_bit', 'torque', 'rop', 'air_pressure', 'vibration', 'blastability', 'rock_type_id']]
final_df.to_csv(os.path.join(folder, 'mtwright_mwd.csv'), sep=',', encoding='utf-8', index=False, header=True)
