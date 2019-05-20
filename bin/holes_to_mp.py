#import json
import numpy as np
#import pandas as pd
import pdb
import os
import argparse
import pandas as pd
from clickhouse_driver import Client
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.general_helper_functions import init_logging
import requests
logger = init_logging(__name__)


def get_dc_dataset_configs(subdomain,dataset_name):
    r = requests.post('https://prod.datacloud.rocks/v1/auth', json={"username":'admin', "password":'pass123$$$'})
    token = r.json()['token']
    headers = {'Authorization':'Bearer ' + token,'x-dc-subdomain':subdomain}
    r = requests.get('https://prod.datacloud.rocks/v1/viz/dataset_config',headers=headers)
    dataset_list = r.json()
    for dataset in dataset_list:
        if dataset['name'] == dataset_name:
            return dataset
    return False


def get_domain_confs(subdomain):
    r = requests.post('https://prod.datacloud.rocks/v1/auth', json={"username":'admin', "password":'pass123$$$'})
    token = r.json()['token']
    headers = {'Authorization':'Bearer ' + token,'x-dc-subdomain':subdomain}
    r = requests.get('https://prod.datacloud.rocks/v1/viz/config',headers=headers)
    return r.json()


def holes_to_mp(mine_name,env_config_path):

    envConfig = EnvConfig(env_config_path)
    #conn_rhino = envConfig.get_rhino_db_connection_from_mine_name(mine_name)
    conn_sql_rhino = envConfig.get_rhino_sql_connection_from_mine_name(mine_name)
    db_helper = RhinoSqlHelper(conn_sql_rhino['host'], conn_sql_rhino['user'], conn_sql_rhino['password'], conn_sql_rhino['database'])
    mp_configs = envConfig.get_mp_config(mine_name)
    subdomain = mp_configs['domain']
    dataset_name = mp_configs['dataset']
    domain_confs = get_domain_confs(subdomain)
    dataset_confs = get_dc_dataset_configs(subdomain,dataset_name)
    mapping = dataset_confs['mapping']
    

    conn = domain_confs['ch_conn']
    ip = conn.split('/')[2].split(':')[0]
    _port = int(conn.split('/')[2].split(':')[1].split('?')[0])
    _user = conn.split('/')[2].split('?')[1].split('&')[0].split('=')[1]
    _pass = conn.split('/')[2].split('?')[1].split('&')[2].split('=')[1]
    db = conn.split('/')[2].split('?')[1].split('&')[3].split('=')[1]
    mp_clickhouse_client = Client(ip, port=_port, user=_user, password=_pass, database=db, compression='lz4')
    mp_dataset_table = dataset_confs['table_name']
    processed_folder_path = envConfig.get_hole_h5_processed_cache_folder(mine_name)
    logger.info("Getting api info")
    #db_helper = RhinoDBHelper(conn=conn_rhino)
    #processed_holes_obs = db_helper.get_processed_holes()
    processed_holes_obs = db_helper.processed_holes.get_holes_to_mp()
    logger.info("Getting processed_holes info")
    df_list = list()
    processed_holes_obs.apply(lambda row,mp_dataset_table,mapping,mp_clickhouse_client,df_list,processed_folder_path: push_data_to_server(row,mp_dataset_table,mapping,mp_clickhouse_client,df_list,processed_folder_path), args=[mp_dataset_table,mapping,mp_clickhouse_client,df_list,processed_folder_path] ,axis=1)
    output_df = pd.concat(df_list)
    columns_string = ",".join(output_df.columns)
    mp_clickhouse_client.execute(query_create_table(mapping,mp_dataset_table))
    mp_clickhouse_client.execute('truncate table ' + mp_dataset_table )
    mp_clickhouse_client.execute('insert into ' + mp_dataset_table + ' ('+columns_string+')'+' values', output_df.values.tolist(),types_check=True)
    return True

def query_create_table(mapping,table_name):
    query = "CREATE table IF NOT EXISTS "
    query += table_name
    query += " ( "
    for line in mapping:
        if 'column' in line.keys():
            if line['column'] in ['pit', 'hole', 'bench', 'pattern'] or 'strprop' in line['column']:
                query += line['column'] + " String, "
            elif line['column'] in ['x','y','z'] or 'floatprop' in line['column']:
                query += line['column'] + " Float32, "
            elif 'datetimeprop' in line['column']:
                query += line['column'] + " Datetime, "
            elif 'intprop' in line['column']:
                query += line['column'] + " Int32, "
            else:
                print ("Unknown column type " + str(line['column']))
    query = query[:-2] + ") ENGINE = Log"
    print (query)
    return query

def push_data_to_server(row,mp_dataset_table,mapping,client,df_list,processed_folder_path):
    processed_csv = os.path.join(row.output_folder_name,'processed.csv')
    try:
        df = pd.read_csv(os.path.join(processed_folder_path,processed_csv))
        logger.info("Loading file :" + processed_csv)
    except:
        logger.error("ERROR Loading file :" + processed_csv)
        return
    output_df = pd.DataFrame()



    output_df['bench'] = df.bench_name.astype(str)
    output_df['pattern'] = df.pattern_name.astype(str)
    output_df['hole'] = df.hole_name.astype(str)
    output_df['x'] = df.easting.astype(np.float64)
    output_df['y'] = df.northing.astype(np.float64)
    output_df['z'] = df.elevation.astype(np.float64)

    if 'pit' in output_df.columns:
        output_df['pit'] = df.pit.astype(str)
    else:
        output_df['pit'] = '0'



    for line in mapping:
        line['prop'] = str(line['prop']).lower()
        line['column'] = str(line['column']).lower()
        if (line['prop'] in df.columns) and (line['prop'] not in output_df.columns):
            if 'datetimeprop' in line['column']:
                col = df[line['prop']]
                output_df[line['column']] = col.astype('datetime64[ns]')
            elif 'strprop' in line['column']:
                output_df[line['column']] = df[line['prop']].astype(str)
            else:
                output_df[line['column']] = df[line['prop']]
        elif (line['prop'] not in df.columns) and (line['prop'] not in output_df.columns):
            logger.warn("Setted all zeroes on this column " + str(line['column']) + " missing prop:" + str(line['prop']))
            output_df[line['column']] = 0

    #cols_in_output_df = output_df.columns.values.astype(str)
    #cols_in_mapping = pd.DataFrame(mapping).column.values.astype(str)
    #missing_columns = np.setdiff1d(cols_in_mapping,cols_in_output_df)

    df_list.append(output_df)


if __name__ == '__main__':
    use_argparse = True
    if use_argparse:
        argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
        argparser.add_argument("mine_name", metavar="mine_name", type=str, help="Mine Name")
        argparser.add_argument("-env", '--env_config_path', help="Path to optional env config file", default=False)
        args = argparser.parse_args()
        mine_name = args.mine_name
        env_config_path = args.env_config_path
    else:
        mine_name = ''

    holes_to_mp(mine_name, env_config_path)