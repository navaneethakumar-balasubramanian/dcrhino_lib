import os
os.environ['MKL_NUM_THREADS'] = '1'
os.environ['OPENBLAS_NUM_THREADS'] = '1'
os.environ['OMP_NUM_THREADS'] = '1'
os.environ['CELERYD_TASK_TIME_LIMIT'] = '300'
os.environ['CELERYD_MAX_TASKS_PER_CHILD'] = '1'


from celery import Celery
from dcrhino3.process_flow.process_flow import ProcessFlow
from dcrhino3.models.env_config import EnvConfig
import json
import datetime
import pandas as pd
from dcrhino3.helpers.dc_dataset_pusher import DcDatasetPusher

import matplotlib
from rhino_lp.pipeline import parse_config
import json
matplotlib.use('Svg')
app = Celery('dcrhino3.celery.tasks', backend='rpc://', broker='pyamqp://guest@localhost//')

#@app.task
#def add(x, y):
#    return x + y

@app.task
def process_file_with_flow(acorr_file_path,process_flow_json_path,env_config_path,process_id):
    with open(process_flow_json_path) as f:
        process_json = json.load(f)

    process_flow = ProcessFlow()
    print ("Using env config " + env_config_path)
    env_config = EnvConfig(env_config_path)

    process_flow.process_file(process_json, acorr_file_path, env_config=env_config,process_id=process_id)
    del env_config
    del process_flow
    del process_json

@app.task
def apply_log_process(csv_files_to_use,log_process_flow_json_path,subdomain,dataset_name):
    df_list = []
    for file in csv_files_to_use:
        df_list.append(pd.read_csv(file))
    holes_dataframe = pd.concat(df_list)
    log_process_dict = json.load(open(log_process_flow_json_path, 'r'))
    hole_dataframe = parse_config(holes_dataframe, log_process_dict, is_rhino=True, class_kwds={"hole_id_column": ['pit_name','bench_name','pattern_name','hole_name']})

    pushed = DcDatasetPusher(hole_dataframe,subdomain,dataset_name)

