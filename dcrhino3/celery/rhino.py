import os
os.environ['MKL_NUM_THREADS'] = '1'
os.environ['OPENBLAS_NUM_THREADS'] = '1'
os.environ['OMP_NUM_THREADS'] = '1'

from celery import Celery
from dcrhino3.process_flow.process_flow import ProcessFlow
from dcrhino3.models.env_config import EnvConfig
import json

app = Celery('tasks', backend='rpc://', broker='pyamqp://guest@localhost//')

@app.task
def add(x, y):
    return x + y

@app.task
def process_file_with_flow(acorr_file_path,process_flow_json_path):
    with open(process_flow_json_path) as f:
        process_json = json.load(f)

    process_flow = ProcessFlow()
    env_config_path = '/home/thiago/Documents/Projects/Dc_rhino/v3/bin/env_config.json'
    env_config = EnvConfig(env_config_path)
    process_flow.process_file(process_json, acorr_file_path, env_config=env_config)