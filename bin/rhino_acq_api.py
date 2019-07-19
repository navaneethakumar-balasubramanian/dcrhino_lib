from flask import Flask,  request, jsonify, send_from_directory, render_template, make_response,send_file
from flask_cors import CORS
# from flask_compress import Compress
# import numpy as np
# import pandas as pd
# from dcrhino3.models.env_config import EnvConfig
# from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
# from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
# from holes_to_mp import holes_to_mp
# from dcrhino3.helpers.general_helper_functions import create_folders_if_needed
# from dcrhino3.models.env_config import EnvConfig
# from dcrhino3.models.trace_dataframe import TraceData
# import glob2
# import uuid
import os
import pdb
CACHE_IMAGE_FOLDER = "/tmp/image_cache_rhino_api/"

app = Flask(__name__,
            static_folder = "../web_server/rhino_acquisition_frontend",
            template_folder = "../web_server/rhino_acquisition_frontend")


CORS(app)
COMPRESS_MIMETYPES = ['text/html', 'text/css', 'text/xml', 'application/json', 'application/javascript','application/octet-stream']
COMPRESS_LEVEL = 9
COMPRESS_MIN_SIZE = 500

# Compress(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('../web_server/rhino_acquisition_frontend/css/', path)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('../web_server/rhino_acquisition_frontend/js/', path)

@app.route('/3rdparty/<path:path>')
def send_3rd(path):

    return send_from_directory('../web_server/rhino_acquisition_frontend/3rdparty/', path)

@app.route('/start_acquisition')
def start_acquisition():
    os.popen("gedit").read()
    return jsonify("oaaaaaaaa")

