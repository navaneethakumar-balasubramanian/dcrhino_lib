from rhino_lp.pipeline import parse_config
import json
import pandas as pd
import os
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.celery.tasks import apply_log_process, apply_log_process_one_by_one
from dcrhino3.models.mine.mine import Mine
from dcrhino3.helpers.mwd_helper import MWDHelper

mine_name = str('south_walker_creek')
env_config = EnvConfig()
#mine = Mine()
#mine.set_data(env_config._get_mine_config(mine_name))



batch = '1572276491'
db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
sql_helper = RhinoSqlHelper(**db_conn)
mwd_helper = MWDHelper(env_config)
mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(mine_name)

processed_holes = sql_helper.processed_holes.get_search_string(batch,limit=10000)

processed_csv_list = []
for processed_hole in processed_holes.iterrows():
    processed_hole = processed_hole[1]
    processed_folder = os.path.join(env_config.get_hole_h5_processed_cache_folder(mine_name),
                                    processed_hole['output_folder_name'])
    processed_csv_list.append(os.path.join(processed_folder, 'processed.csv'))

df_list = []
for i, file in enumerate(processed_csv_list):
    df = pd.read_csv(file)
    df.rename(columns=dict(zip(['hole_start_x', 'hole_start_y', 'hole_start_z'],
                               ['collar_easting', 'collar_northing', 'collar_elevation'])), inplace=True)
    df_list.append(df)

    print("Loaded {} of {}".format(i + 1, len(processed_csv_list)))

holes_dataframe = pd.concat(df_list)
holes_dataframe.to_csv('merged_{}_swc.csv'.format(batch),index=False)