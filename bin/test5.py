from rhino_lp.pipeline import parse_config
import json
import pandas as pd
import os
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.celery.tasks import apply_log_process, apply_log_process_one_by_one
from dcrhino3.models.mine.mine import Mine

mine_name = str('south_walker_creek')
env_config = EnvConfig()
#mine = Mine()
#mine.set_data(env_config._get_mine_config(mine_name))


lp_flow_path = env_config.get_log_process_flows_list(mine_name)[0]
print (lp_flow_path)

lp_flow_path = os.path.join(env_config.get_log_process_folder(mine_name) , lp_flow_path)

db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
sql_helper = RhinoSqlHelper(**db_conn)
processed_holes = sql_helper.processed_holes.get_holes_to_mp()
#processed_holes = sql_helper.processed_holes.get_latests_process_for_each_hole()
processed_csv_list = []
for processed_hole in processed_holes.iterrows():
    processed_hole = processed_hole[1]
    processed_folder = os.path.join(env_config.get_hole_h5_processed_cache_folder(mine_name),
                                    processed_hole['output_folder_name'])
    processed_csv_list.append(os.path.join(processed_folder, 'processed.csv'))

#processed_csv_list = ['/home/thiago/Documents/Projects/Dc_rhino/v3/bin/swc_1571957698_1571957689_1571854652_1571879109.csv']
#apply_log_process.apply(args=[processed_csv_list, lp_flow_path,'southwalker',mine_name + '_LP'])
apply_log_process_one_by_one.apply(args=[processed_csv_list, lp_flow_path,'southwalker',mine_name + '_LP'])
#log_process_dict = json.load(open(lp_flow_path,'r'))
#hole_dataframe = parse_config(holes_dataframe, log_process_dict, is_rhino=True, class_kwds={"hole_id_column": ['pit_name','bench_name','pattern_name','hole_name']})
print("Finished")