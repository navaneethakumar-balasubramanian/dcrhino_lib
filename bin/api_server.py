from flask import Flask,  request, jsonify, send_from_directory, render_template, make_response,send_file, Response
from flask_cors import CORS
from flask_compress import Compress
import json
import numpy as np
import pandas as pd
import os
from rhino_lp.logs import LogCollection, Log
from functools import partial
import numpy as np
import pandas as pd
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
#from holes_to_mp import holes_to_mp
from dcrhino3.helpers.general_helper_functions import create_folders_if_needed
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.models.trace_dataframe import TraceData
import glob2
import uuid
import os
import datetime
import calendar
from time import sleep
from dcrhino3.helpers.mwd_helper import MWDHelper
from dcrhino3.celery.tasks import process_file_with_flow
from datetime import datetime
import requests

from dcrhino3.celery.tasks import apply_log_process

from dcrhino3.helpers.cross_section_helper import CrossSectionHelper



import pdb

env_config = EnvConfig()
CACHE_IMAGE_FOLDER = "/tmp/image_cache_rhino_api/"

app = Flask(__name__,
            static_folder = "../web_server/frontend/dist",
            template_folder = "../web_server/frontend/dist")


CORS(app)
COMPRESS_MIMETYPES = ['text/html', 'text/css', 'text/xml', 'application/json', 'application/javascript','application/octet-stream']
COMPRESS_LEVEL = 9
COMPRESS_MIN_SIZE = 500

Compress(app)

subdomain_name = 'dcmine'
dataset_name = 'montwright_rhino_' + datetime.today().strftime('%Y%m%d')
API_BASE_URL = "http://104.42.216.162:5002/api"


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

@app.route('/test')
def test():
    return render_template("test.html")

@app.route('/mines')
def get_mines():
    return jsonify(list(env_config.mines.keys()))

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('../web_server/frontend/dist/css/', path)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('../web_server/frontend/dist/js/', path)


@app.route('/api/mwd',methods=['GET', 'POST'])
def mwd():
    req_json = request.get_json()
    mine_name = str(req_json['mine_name'])

    mwd_helper = MWDHelper(env_config)
    start_date_00_timestamp = False
    #start_date =  datetime.date.today() - datetime.timedelta(30)
    #start_date_00_timestamp = calendar.timegm(start_date.timetuple())
    mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(mine_name,date_start=start_date_00_timestamp)
    mwd_df = mwd_df.fillna(-999999)
    return jsonify({"columns":list(mwd_df.columns.values.astype(str)),'data':mwd_df.values.astype(str).T.tolist(),"props":{}})

@app.route('/api/blasthole_observations',methods=['GET', 'POST'])
def blasthole_observations():
    req_json = request.get_json()
    mine_name = str(req_json['mine_name'])
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    db_helper = RhinoSqlHelper(**db_conn)
    blasthole_observations = db_helper.blasthole_observations.get_all_with_solution()
    return jsonify({"data": blasthole_observations.to_dict(orient='records')})

@app.route('/api/process_flows',methods=['GET', 'POST'])
def process_flows_list():
    req_json = request.get_json()
    mine_name = str(req_json['mine_name'])
    process_flows_list = env_config.get_process_flows_list(mine_name)
    return jsonify({"process_flows": process_flows_list})


@app.route('/api/log_process_flows',methods=['GET', 'POST'])
def log_process_flows_list():
    req_json = request.get_json()
    mine_name = str(req_json['mine_name'])
    process_flows_list = env_config.get_log_process_flows_list(mine_name)
    return jsonify({"log_process_flows": process_flows_list})

@app.route('/api/process_holes_with',methods=['GET', 'POST'])
def process_holes_with():
    req_json = request.get_json()
    mine_name = str(req_json['mine_name'])
    holes = req_json['blasthole_obs']
    process_flow_name = str(req_json['process_flow'])
    process_flow_full_path = env_config.get_process_flow_folder(mine_name) + process_flow_name
    now = datetime.now()
    process_id = int(now.strftime("%s"))
    acorr_files_folder = env_config.get_hole_h5_interpolated_cache_folder(mine_name)
    for hole in holes:
        h5_filename = str(hole['bench_name']) + "_" + str(hole['pattern_name']) + "_" + str(hole['hole_name']) + "_" + str(hole['hole_id']) + "_" + str(hole['sensor_id']) + "_" + str(hole['digitizer_id']) + ".h5"
        acorr_file_path = acorr_files_folder + h5_filename
        #env_config_path = env_config.get_json_path()
        #env_config_path = str(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'env_config.json'))

        env_config_path = "/home/dev/dcrhino_lib/bin/env_config.json"
        process_file_with_flow.delay(acorr_file_path, process_flow_full_path,env_config_path,process_id)
    return jsonify({"data":True})

@app.route('/api/log_process_holes',methods=['GET', 'POST'])
def log_process():
    req_json = request.get_json()
    mine_name = str(req_json['mine_name'])
    env_config = EnvConfig()
    lp_flow_path = env_config.get_log_process_flows_list(mine_name)[0]
    lp_flow_path = os.path.join(env_config.get_log_process_folder(mine_name), lp_flow_path)
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    sql_helper = RhinoSqlHelper(**db_conn)
    processed_holes = sql_helper.processed_holes.get_holes_to_mp()
    processed_csv_list = []
    for processed_hole in processed_holes.iterrows():
        processed_hole = processed_hole[1]
        processed_folder = os.path.join(env_config.get_hole_h5_processed_cache_folder(mine_name),
                                        processed_hole['output_folder_name'])
        processed_csv_list.append(os.path.join(processed_folder, 'processed.csv'))
    apply_log_process.delay(processed_csv_list, lp_flow_path,'devdatacloud',mine_name + '_LP')

    return jsonify({"data":True})

@app.route('/api/processed_holes',methods=['GET', 'POST'])
def processed_holes():
    req_json = request.get_json()
    mine_name = req_json['mine_name']
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    db_helper = RhinoSqlHelper(**db_conn)

    if 'search' in req_json.keys():
        processed_holes = db_helper.processed_holes.get_search_string(req_json['search'],1000,req_json['from'],req_json['to'])
    else:
        processed_holes = db_helper.processed_holes.get_latests()
    if len(processed_holes) > 0:
        processed_holes = processed_holes[processed_holes['archived'] == '0']
    return jsonify({"data":processed_holes.to_dict(orient='records'),"processed_at_ts":db_helper.processed_holes.get_processed_at_ts()})

@app.route('/api/hole_to_mp',methods=['GET', 'POST'])
def hole_to_mp():
    req_json = request.get_json()
    mine_name = req_json['mine_name']
    processed_hole_id = req_json['processed_hole_id']
    to_mp = req_json['to_mp']
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    db_helper = RhinoSqlHelper(db_conn['host'], db_conn['user'], db_conn['password'], db_conn['database'])
    return jsonify(db_helper.processed_holes.hole_to_mp(processed_hole_id,to_mp))

@app.route('/api/acorr_files',methods=['GET', 'POST'])
def acorr_files():
    req_json = request.get_json()
    mine_name = req_json['mine_name']
    db_conn = env_config.get_rhino_db_connection_from_mine_name(mine_name)
    db_helper = RhinoDBHelper(db_conn['host'], db_conn['user'], db_conn['password'], db_conn['database'])
    acorr_files = db_helper.get_files_list()
    return acorr_files.to_json(orient='records')

@app.route('/images/<path:path>')
def send_image(path):
    return send_from_directory(CACHE_IMAGE_FOLDER, path)

@app.route('/zipped_plots/<path:path>')
def send_zipped_plots(path):
    return send_from_directory("/tmp/", path)

@app.route('/get_processed_csv',methods=['GET', 'POST'])
def get_processed_csv():
    req_json = request.get_json()
    if 'mine_name' not in req_json.keys():
        return jsonify(False)
    env_config = EnvConfig()
    mine_name = req_json['mine_name']
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    processed_holes = req_json['processed_holes']
    if processed_holes == False:
        return jsonify(False)

    processed_csv_list = []
    for processed_hole in processed_holes:
        processed_folder = os.path.join(env_config.get_hole_h5_processed_cache_folder(mine_name),  processed_hole['output_folder_name'])
        processed_csv = pd.read_csv(os.path.join(processed_folder,'processed.csv'))
        processed_csv_list.append(processed_csv)

    df = pd.concat(processed_csv_list)
    resp = make_response(df.to_csv())
    resp.headers["Content-Disposition"] = "attachment; filename=processed.csv"
    resp.headers["Content-Type"] = "application/octet-stream"
    return resp

@app.route('/get_zipped_plots',methods=['GET', 'POST'])
def get_zipped_plots():
    req_json = request.get_json()
    if 'mine_name' not in req_json.keys():
        return jsonify(False)
    env_config = EnvConfig()
    mine_name = req_json['mine_name']
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    processed_holes = req_json['processed_holes']
    if processed_holes == False:
        return jsonify(False)

    uuid_folder_name = uuid.uuid1()
    temp_folder_path = "/tmp/" + str(uuid_folder_name)
    create_folders_if_needed(temp_folder_path)
    #pdb.set_trace()
    processed_csv_list = []
    for processed_hole in processed_holes:
        processed_folder = os.path.join(env_config.get_hole_h5_processed_cache_folder(mine_name),  processed_hole['output_folder_name'])
        files = glob2.glob(processed_folder + "*.png")
        counter = 0
        for file in files:
            output_file_name = processed_hole['processed_hole_id'] +"_" + str(counter) + ".png"
            output_file_path = os.path.join(temp_folder_path,output_file_name)
            command = "cp " + file + " " + output_file_path
            counter += 1
            os.popen(command).read()

    zip_file_folder = "/tmp"
    zip_file_name  =  str(uuid_folder_name) + ".zip"
    zip_file_path = os.path.join(zip_file_folder,zip_file_name)
    zip_cmd = "zip -j " + str(zip_file_path) + " " + str(temp_folder_path) + "/*"
    os.popen(zip_cmd).read()
    return jsonify({"url":"/zipped_plots/" + str(zip_file_name)})





@app.route('/api/processed_hole',methods=['GET', 'POST'])
def processed_hole():
    req_json = request.get_json()
    if 'mine_name' not in req_json.keys():
        return jsonify(False)
    env_config = EnvConfig()
    mine_name = req_json['mine_name']
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    processed_hole_ids = req_json['processed_hole_id']
    if processed_hole_ids == False:
        return jsonify(False)
    if not isinstance(processed_hole_ids, list):
        processed_hole_ids = [processed_hole_ids]

    db_helper = RhinoSqlHelper(db_conn['host'], db_conn['user'], db_conn['password'], db_conn['database'])
    processed_holes = db_helper.processed_holes.get_processed_holes(processed_hole_ids)
    processed_holes = processed_holes.to_dict(orient='records')

    for processed_hole in processed_holes:
        ### GENERATE CACHED IMAGES
        image_cache_folders = CACHE_IMAGE_FOLDER+mine_name
        processed_hole_image_cache_folders = os.path.join(image_cache_folders,processed_hole['processed_hole_id'])
        cached_image_folder = os.path.join(image_cache_folders, str(processed_hole['processed_hole_id']))
        processed_folder = os.path.join(env_config.get_hole_h5_processed_cache_folder(mine_name), processed_hole['output_folder_name'])
        if os.path.exists(cached_image_folder) == False:
            create_folders_if_needed(cached_image_folder)
            files = glob2.glob(processed_folder + "*.png")
            for file in files:
                command = 'convert ' + file + ' -resize "3000>" -quality 80 ' + os.path.join(cached_image_folder,os.path.basename(file).replace('.png','.webp'))
                os.popen(command).read()

        ##GET FILES IN CACHE
        files = glob2.glob(cached_image_folder + "/*.webp")

        for i,file in enumerate(files):
            files[i] = os.path.basename(file)
        processed_hole['images'] = files
       # print processed_hole

    return jsonify(processed_holes)


@app.route('/traces')
def get_nparray():
    td = TraceData()
    td.load_from_h5("/home/thiago/Downloads/test_data_/5_trim_0.h5")
    nparr = td.component_as_array("axial").astype(np.float32)
    # print nparr.shape
    data = nparr
    n_traces, n_samples_per_trace = data.shape
    # <NORAMLIZE>
    data = data.T
    # Make nans into zeros, do normalization, then return nans
    nans_locations = np.where(np.isnan(data))
    data[nans_locations] = 0.0
    max_amplitudes = np.max(data, axis=0)
    data = data / max_amplitudes
    data[nans_locations] = np.nan
    data = data.T
    # </NORAMLIZE>
    data = data[:, 590:590 + 220]

    response = make_response(data.tobytes())
    response.headers.set('Content-Type', 'application/octet-stream')
    return response

@app.route('/api/split_cross_sections',methods=['GET', 'POST'])
def split_cross_sections():
    req_json = request.get_json()
    collars = req_json['collars']
    point_from_idx = req_json['point_from_idx']
    point_to_idx = req_json['point_to_idx']
    threshold = req_json['threshold']
    cshelper = CrossSectionHelper()
    cross_sections = cshelper.get_cross_sections(collars, point_from_idx, point_to_idx, threshold)
    return jsonify(cross_sections)




@app.route('/df',methods=['GET', 'POST'])
def get_df():
    req_json = request.get_json()
    data_type = req_json['type']
    data_id = req_json['id']
    if data_type == 'processed':
        td = TraceData()
        td.load_from_h5("/home/thiago/Downloads/test_data_/5_trim_0.h5")
        df = td.dataframe
        #print df.shape,"dfshape"
        #print td.dataframe.to_json(orient='records')
        df = df[df.columns.drop(list(df.filter(regex='_trace')))]
        for col in df.columns:
            if len(df[col].unique()) == 1:
                df.drop(col, inplace=True, axis=1)
        response = make_response(df.to_json(orient='columns'))
        #response.headers.set('Content-Type', 'application/octet-stream')
    return response


if __name__ == '__main__':
    app.run()