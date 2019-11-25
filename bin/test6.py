import pandas as pd


mwd_df = pd.read_csv('merged_autumn_20191027.csv')
holeids_patterns = pd.read_csv('/home/thiago/Downloads/HoleIDs with Pattern Name.csv')
merged = pd.merge(mwd_df,holeids_patterns, on='hole_id')
merged['pattern_name'] = merged.pattern_name_y
merged['pit_name'] = merged.pit_name_y
merged = merged.drop(columns=['pattern_name_x','pattern_name_y','pit_name_x','pit_name_y','Unnamed: 0'])

merged.pattern_name = merged.pattern_name.fillna('100')
merged.pit_name = merged.pit_name.fillna('100')
merged.to_csv('fixed_pattern_merged_autumn_20191027.csv', index=False)