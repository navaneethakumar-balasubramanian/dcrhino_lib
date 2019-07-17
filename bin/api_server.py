from flask import Flask,  request, jsonify, send_from_directory, render_template, make_response,send_file
from flask_cors import CORS
from flask_compress import Compress
import numpy as np
import pandas as pd
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from holes_to_mp import holes_to_mp
from dcrhino3.helpers.general_helper_functions import create_folders_if_needed
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.models.trace_dataframe import TraceData
import glob2
import uuid
import os
import pdb
CACHE_IMAGE_FOLDER = "/tmp/image_cache_rhino_api/"

app = Flask(__name__,
            static_folder = "../web_server/frontend/dist",
            template_folder = "../web_server/frontend/dist")

CORS(app)
COMPRESS_MIMETYPES = ['text/html', 'text/css', 'text/xml', 'application/json', 'application/javascript','application/octet-stream']
COMPRESS_LEVEL = 9
COMPRESS_MIN_SIZE = 500

Compress(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

@app.route('/mines')
def get_mines():
    env_config = EnvConfig()
    return jsonify(env_config.mines.keys())

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('../web_server/frontend/dist/css/', path)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('../web_server/frontend/dist/js/', path)

@app.route('/holes_to_mp')
def holes_to_mp_page():
    if holes_to_mp('mont_wright', 'env_config.json') :
        return "Updated"
    return "Error"

@app.route('/api/processed_holes',methods=['GET', 'POST'])
def processed_holes():
    req_json = request.get_json()
    env_config = EnvConfig()
    mine_name = req_json['mine_name']
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    db_helper = RhinoSqlHelper(db_conn['host'], db_conn['user'], db_conn['password'], db_conn['database'])
    if 'search' in req_json.keys():
        processed_holes = db_helper.processed_holes.get_search_string(req_json['search'])
    else:
        processed_holes = db_helper.processed_holes.get_latests()
    processed_holes = processed_holes[processed_holes['archived'] == '0']
    return processed_holes.to_json(orient='records')

@app.route('/api/hole_to_mp',methods=['GET', 'POST'])
def hole_to_mp():
    req_json = request.get_json()
    env_config = EnvConfig()
    mine_name = req_json['mine_name']
    processed_hole_id = req_json['processed_hole_id']
    to_mp = req_json['to_mp']
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    db_helper = RhinoSqlHelper(db_conn['host'], db_conn['user'], db_conn['password'], db_conn['database'])

    return jsonify(db_helper.processed_holes.hole_to_mp(processed_hole_id,to_mp))




@app.route('/api/acorr_files',methods=['GET', 'POST'])
def acorr_files():
    req_json = request.get_json()
    env_config = EnvConfig()
    mine_name = req_json['mine_name']
    db_conn = env_config.get_rhino_db_connection_from_mine_name(mine_name)
    db_helper = RhinoDBHelper(db_conn['host'], db_conn['user'], db_conn['password'], db_conn['database'])
    acorr_files = db_helper.get_files_list()
    return acorr_files.to_json(orient='records')

@app.route('/images/<path:path>')
def send_image(path):
    return send_from_directory(CACHE_IMAGE_FOLDER, path)

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
    zip_cmd = "zip " + str(zip_file_path) + " " + str(temp_folder_path) + "/*"
    os.popen(zip_cmd).read()
    #resp = make_response(df.to_csv())
    #resp.headers["Content-Disposition"] = "attachment; filename=processed_holes_plots.zip"
    #resp.headers["Content-Type"] = "application/octet-stream"
    #return resp
    print zip_file_path
    return send_file(zip_file_path,attachment_filename=zip_file_name, as_attachment=True)





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
        print processed_hole

    return jsonify(processed_holes)


@app.route('/traces')
def get_nparray():
    td = TraceData()
    td.load_from_h5("/home/thiago/Downloads/test_data_/5_trim_0.h5")
    nparr = td.component_as_array("axial").astype(np.float32)
    print nparr.shape
    data = nparr

    nans_locations = np.where(np.isnan(data))
    data[nans_locations] = 0.0
    num_samples, num_traces = data.shape
    max_amplitudes = np.max(data, axis=0)
    #print max_amplitudes
    data = data / max_amplitudes
    data[nans_locations] = np.nan
#    half_way = int(data.shape[1] / 2)
    data = data.T
    data = data[590 :590 + 220, :]
    data = data.T

    print data.shape
    response = make_response(data.tobytes())
    response.headers.set('Content-Type', 'application/octet-stream')
    return response


@app.route('/df')
def get_df():
    td = TraceData()
    td.load_from_h5("/home/thiago/Downloads/test_data_/5_trim_0.h5")
    df = td.dataframe
    print df.shape,"dfshape"
    #print td.dataframe.to_json(orient='records')
    df = df[df.columns.drop(list(df.filter(regex='_trace')))]
    response = make_response(df.to_json(orient='columns'))
    #response.headers.set('Content-Type', 'application/octet-stream')
    return response

