from flask import Flask,  request, jsonify, send_from_directory
from flask_cors import CORS
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from holes_to_mp import holes_to_mp
from dcrhino3.helpers.general_helper_functions import create_folders_if_needed
from dcrhino3.models.env_config import EnvConfig
import glob2

import os

app = Flask(__name__)
CORS(app)

@app.route('/holes_to_mp')
def holes_to_mp_page():
    if holes_to_mp('mont_wright', 'env_config.json') :
        return "Updated"
    return "Error2"

@app.route('/api/processed_holes',methods=['GET', 'POST'])
def processed_holes():
    req_json = request.get_json()
    env_config = EnvConfig()
    mine_name = req_json['mine_name']
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    db_helper = RhinoSqlHelper(db_conn['host'], db_conn['user'], db_conn['password'], req_json['mine_name'])
    processed_holes = db_helper.processed_holes.get_all()
    processed_holes = processed_holes.sort_values(by='processed_hole_id', ascending=1)
    return processed_holes.to_json(orient='records')

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
    return send_from_directory('/tmp/image_cache/', path)

@app.route('/api/processed_hole',methods=['GET', 'POST'])
def processed_hole():
    req_json = request.get_json()
    env_config = EnvConfig()
    mine_name = req_json['mine_name']
    db_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    processed_hole_id = req_json['processed_hole_id']
    db_helper = RhinoSqlHelper(db_conn['host'], db_conn['user'], db_conn['password'], req_json['mine_name'])
    processed_hole = db_helper.processed_holes.get_processed_hole(processed_hole_id)
    processed_hole = processed_hole.to_dict(orient='records')[0]

    ### GENERATE CACHED IMAGES
    image_cache_folders = "/tmp/image_cache/"+mine_name
    processed_hole_image_cache_folders = os.path.join(image_cache_folders,processed_hole['processed_hole_id'])
    cached_image_folder = os.path.join(image_cache_folders, str(processed_hole_id))
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
    return jsonify(processed_hole)

