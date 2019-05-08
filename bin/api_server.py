from flask import Flask,  request, jsonify, send_from_directory, render_template, make_response
from flask_cors import CORS
import pandas as pd
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from holes_to_mp import holes_to_mp
from dcrhino3.helpers.general_helper_functions import create_folders_if_needed
from dcrhino3.models.env_config import EnvConfig
import glob2

import os
import pdb
CACHE_IMAGE_FOLDER = "/tmp/image_cache_rhino_api/"

app = Flask(__name__,
            static_folder = "../web_server/frontend/dist",
            template_folder = "../web_server/frontend/dist")

CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

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
    db_helper = RhinoSqlHelper(db_conn['host'], db_conn['user'], db_conn['password'], req_json['mine_name'])
    if 'search' in req_json.keys():
        processed_holes = db_helper.processed_holes.get_search_string(req_json['search'])
    else:
        processed_holes = db_helper.processed_holes.get_latests()
    return processed_holes.to_json(orient='records')

@app.route('/api/hole_to_mp',methods=['GET', 'POST'])
def hole_to_mp():
    req_json = request.get_json()
    env_config = EnvConfig()
    mine_name = req_json['mine_name']
    processed_hole_id = req_json['processed_hole_id']
    to_mp = req_json['to_mp']
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    db_helper = RhinoSqlHelper(db_conn['host'], db_conn['user'], db_conn['password'], req_json['mine_name'])

    return jsonify(db_helper.processed_holes.hole_to_mp(processed_hole_id,to_mp))




@app.route('/api/acorr_files',methods=['GET', 'POST'])
def acorr_files():
    req_json = request.get_json()
    env_config = EnvConfig()
    mine_name = req_json['mine_name']
    db_conn = env_config.get_rhino_db_connection_from_mine_name(mine_name)
    db_helper = RhinoDBHelper(db_conn['host'], db_conn['user'], db_conn['password'], req_json['mine_name'])
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

    db_helper = RhinoSqlHelper(db_conn['host'], db_conn['user'], db_conn['password'], req_json['mine_name'])
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

