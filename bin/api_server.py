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

subdomain_name = 'devdatacloud'
dataset_name = 'mont_wright_mwd_' + datetime.today().strftime('%Y%m%d')
API_BASE_URL = "http://104.42.216.162:5002/api"

def prop_type_from_column_dtype(column_dtype):

    if isinstance(column_dtype , pd.core.dtypes.dtypes.CategoricalDtype):
        return "strprop"
    elif np.issubdtype(column_dtype, np.float_):
        return "floatprop"
    elif np.issubdtype(column_dtype, np.int_):
        return "intprop"
    elif np.issubdtype(column_dtype, np.string_) or np.issubdtype(column_dtype, np.object_):
        return "strprop"
    elif column_dtype.kind == 'M':
        return "datetimeprop"

def label_to_prop(label):
    return label.lower().replace(" ","_").replace("(","").replace(")","")

def update_or_create_config(subdomain_name, dataset_name, df, rhino_props):
    """
    dataset_conf: mapping is the part that will be changed in the dev cleanup

    """
    datasets_confs = MWDHelper('').get_dc_datasets_configs(subdomain_name)

    dataset_conf = {
        "mapping": [
            {"node_level": 0, "is_hierarchy": "Y", "column": "pit", "is_filter_by": "N", "label": "pit",
             "is_display": "Y", "uom": "", "is_welllog": "Y", "rhino_prop": "pit_name", "prop": "pit",
             "is_color_by": "N"},
            {"column": "hole", "is_filter_by": "Y", "label": "hole_name",
             "is_display": "Y", "uom": "", "is_welllog": "N", "rhino_prop": "hole_name", "prop": "hole",
             "is_color_by": "Y"},
            {"node_level": 1, "is_hierarchy": "Y", "column": "bench", "is_filter_by": "N", "label": "bench",
             "is_display": "Y", "uom": "", "is_welllog": "N", "rhino_prop": "bench_name", "prop": "bench",
             "is_color_by": "N"},
            {"node_level": 2, "is_hierarchy": "Y", "column": "pattern", "is_filter_by": "N", "label": "pattern",
             "is_display": "Y", "uom": "", "is_welllog": "N", "rhino_prop": "pattern_name", "prop": "pattern",
             "is_color_by": "N"},
            {"is_hierarchy": "N", "column": "x", "is_filter_by": "Y", "label": "easting", "is_display": "Y", "uom": "",
             "is_welllog": "N", "prop": "x", "is_color_by": "Y"},
            {"is_hierarchy": "N", "column": "y", "is_filter_by": "Y", "label": "northing", "is_display": "Y", "uom": "",
             "is_welllog": "N", "prop": "y", "is_color_by": "Y"},
            {"is_hierarchy": "N", "column": "z", "is_filter_by": "Y", "label": "elevation", "is_display": "Y", "uom": "",
             "is_welllog": "N", "prop": "z", "is_color_by": "Y"},
            {"is_hierarchy": "N", "column": "measured_depth", "is_filter_by": "Y", "label": "measured_depth",
             "is_display": "Y", "uom": "",
             "is_welllog": "N", "prop": "measured_depth", "is_color_by": "Y","is_default":"Y"},
            {"is_hierarchy": "N", "column": "true_vertical_depth", "is_filter_by": "Y", "label": "true_vertical_depth",
             "is_display": "Y", "uom": "",
             "is_welllog": "N", "prop": "true_vertical_depth", "is_color_by": "Y"}
        ],
        "paraview": {"pipeline": "generic",
                     "options": {"threshold": "z", "extension": "vtp", "field_location": "POINTS",
                                 "threshold_range": [-50000, 50000]}, "pipeline_type": "pointset"},
        "table_name": dataset_name + "_prod",
        "name": dataset_name
    }

    columns_in_mapping = [o['label'] for o in dataset_conf['mapping']]
    floatprops_counter = 0
    intprops_counter = 0
    strprops_counter = 0
    datetimeprops_counter = 0
    for column in df.columns:
        if column not in columns_in_mapping :
            column_obj = {}
            column_dtype_str = prop_type_from_column_dtype(df[column].dtype)
            if column_dtype_str == 'floatprop':
                floatprops_counter += 1
                column_obj["column"] = column_dtype_str + str(floatprops_counter)
            elif column_dtype_str == 'intprop':
                intprops_counter += 1
                column_obj["column"] = column_dtype_str + str(intprops_counter)
            elif column_dtype_str == 'strprop':
                strprops_counter += 1
                column_obj["column"] = column_dtype_str + str(strprops_counter)
            elif column_dtype_str == 'datetimeprop':
                datetimeprops_counter += 1
                column_obj["column"] = column_dtype_str + str(datetimeprops_counter)

            column_obj["label"] = column
            column_obj["prop"] = label_to_prop(column)
            column_obj["is_filter_by"] = "Y"
            column_obj["is_hierarchy"] = "N"
            column_obj["is_display"] = "Y"
            column_obj["is_welllog"] = "Y"
            column_obj["is_color_by"] = "Y"
            #print(column, rhino_props.keys())
            if column in rhino_props.keys():
                column_obj['rhino_prop'] = rhino_props[column]

            dataset_conf['mapping'].append(column_obj)

    dataset_names = [o['name'] for o in datasets_confs]
    if dataset_name in dataset_names:
        datasets_confs[dataset_names.index(dataset_name)] = dataset_conf
    else:
        datasets_confs.append(dataset_conf)

    token = MWDHelper('').get_token()
    deploy_config(token, subdomain_name, dataset_name, datasets_confs)
    return dataset_conf['mapping']


def deploy_config(token, subdomain_name, active_dataset, datasets):
    headers = {'auth_token': token, 'x-dc-subdomain': subdomain_name, 'dataset_name': active_dataset}
    r = requests.post(API_BASE_URL + '/new_dataset', json=(datasets), headers=headers)
    response = (r.json())
    print ("Pushing config")
    print (response)
    return response


def deploy_data(csv_file_path, subdomain_name, dataset_name, mapping):
    df = pd.read_csv(csv_file_path)
    columns_rename = {}
    for col in mapping:
        columns_rename[col['label']] = col['prop']
    df = df.rename(columns=columns_rename)
    df.to_csv(csv_file_path, index=False)

    try:
        token = MWDHelper('').get_token()
        files = {'file': open(csv_file_path, 'rb')}
        headers = {'auth_token': token, 'x-dc-subdomain': subdomain_name, 'dataset_name': dataset_name}
        r = requests.post(API_BASE_URL + '/upload_dataset', files=files, headers=headers)
        response = (r.json())
        print ("Pushing data to mp")
        print(response)
    except Exception as e:
        print("Failed: " + str(e))

def get_lp_df(df):
    # load into log processing
    print ("Loading data")
    logs = LogCollection.load_rhino(df, dtype={'hole_name': str})
    # drop spatial outliers
    print("Drop spatial outliers")
    logs.cleaning.drop_holes(8295)

    # cleaning rop
    print("Cleaning by rop")
    logs.cleaning.by_value('ROP', 0.0016, 0.017, drop=True)

    # coordinate fix
    print("Fixing coordinates")
    logs.collar_columns = ['easting', 'northing', 'Collar Elevation']
    logs.refresh()

    # removes the bottom 0.5 meter from each hole
    print("Removes the bottom 0.5 meter from each hole")
    logs.cleaning.from_bottom(distance=0.5)

    # Remove the top 3.0 meters from each hole
    print("Remove the top 3.0 meters from each hole")
    logs.cleaning.from_top(distance=3)

    # cleaning rhino physics columns
    print("Cleaning rhino physics columns")
    logs.cleaning.columns_matching(('a_', 't_'))

    # short names for primary features
    print("Short names for primary features")
    logs.add_rhino('J2')
    logs.dataframe['a_primary_time'] = logs.rhino.axial.primary.time_pick.astype('float')
    logs.dataframe['t_primary_time'] = logs.rhino.tangential.primary.time_pick.astype('float')
    logs.dataframe['a_primary_amplitude'] = logs.rhino.axial.primary.amplitude.astype('float')
    logs.dataframe['t_primary_amplitude'] = logs.rhino.tangential.primary.amplitude.astype('float')
    logs.refresh()

    # column clean up
    print("Column clean up")
    logs.cleaning.columns_matching(('multiple', 'J2', '0', 'c_',
                                 'Northing_1', 'original_file_record_day',
                                 'Easting_1', 'acceleration'))

    # clean primary amplitudes
    print("Clean primary amplitudes")
    logs.cleaning.by_value('a_primary_amplitude', 0.05, 0.35, drop=True)
    logs.cleaning.by_value('t_primary_amplitude', 0.025, 0.135, drop=True)

    # clean primary times
    print("Clean primary amplitudes")
    logs.cleaning.by_value('a_primary_time', -0.00025, 0.00125, drop=True)
    logs.cleaning.by_value('t_primary_time', -0.00110, 0.0009, drop=True)

    # time shifts for modeling
    print("Time shifts for modeling")
    time_shift = 0.00040  # Median Comp Modulus =   mean  25 (30.5  median)
    time_shrink = 1

    logs.dataframe['a_primary_time_shifted'] = (logs.dataframe['a_primary_time']) / time_shrink + time_shift
    logs.refresh()

    time_shift = -0.00093  # Median Shear Modulus =  mean   (  median )
    time_shrink = 1

    logs.dataframe['t_primary_time_shifted'] = (logs.dataframe['t_primary_time']) / time_shrink + time_shift
    logs.refresh()


    # modeling
    def line_function(x, a, b):
        return np.asarray(x) * a + b


    axial_function = partial(line_function, a=-80102.80751868684, b=72.18356439564553)
    tangential_function = partial(line_function, a=-25761.5221005896, b=-31.659588620669705)

    logs.dataframe['CompressionalModulus(GPa)'] = axial_function(logs.dataframe['a_primary_time_shifted'])
    logs.dataframe['ShearModulus(GPa)'] = tangential_function(logs.dataframe['t_primary_time_shifted'])
    logs.refresh()

    # cleaning modulus
    print("Cleaning modulus")
    logs.cleaning.by_value('CompressionalModulus(GPa)', 1, 100, drop=True)
    logs.cleaning.by_value('ShearModulus(GPa)', 0.5, 33, drop=True)

    # compute ratio
    print("Compute ratio")
    logs.dataframe['Modulus_Ratio'] = (logs.dataframe['CompressionalModulus(GPa)']) / (
    logs.dataframe['ShearModulus(GPa)'])
    logs.dataframe['Modulus_Ratio'].describe()
    logs.refresh()

    # binning
    print("Binning interval 0.01")
    logs = logs.binning(binning_interval=0.1,binning_type='knn',debug=False)

    # smoothing modulus
    print("Smoothing modulus")
    logs.mean_filter(
        columns=['CompressionalModulus(GPa)', 'ShearModulus(GPa)'],
        to_columns=['CompressionalModulus(GPa)_mean5', 'ShearModulus(GPa)_mean5'], size=5)

    # compute new ratio
    print("Computing new ratio")
    logs.dataframe['Modulus_Ratio_m5'] = (logs.dataframe['CompressionalModulus(GPa)_mean5']) / (
    logs.dataframe['ShearModulus(GPa)_mean5'])
    logs.refresh()
    logs.mean_filter(
        columns=['Modulus_Ratio_m5'],
        to_columns=['Modulus_Ratio_mean5'], size=5)
    try:
        logs.dataframe = logs.dataframe.drop(columns=['Elevation'])
    except:
        pass
    print("Saving")
    return logs.dataframe

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

@app.route('/api/process_holes_with',methods=['GET', 'POST'])
def process_holes_with():
    req_json = request.get_json()
    mine_name = str(req_json['mine_name'])
    holes = req_json['blasthole_obs']
    process_flow_name = str(req_json['process_flow'])
    process_flow_full_path = env_config.get_process_flow_folder(mine_name) + process_flow_name

    acorr_files_folder = env_config.get_hole_h5_interpolated_cache_folder(mine_name)
    for hole in holes:
        h5_filename = str(hole['bench_name']) + "_" + str(hole['pattern_name']) + "_" + str(hole['hole_name']) + "_" + str(hole['hole_id']) + "_" + str(hole['sensor_id']) + "_" + str(hole['digitizer_id']) + ".h5"
        acorr_file_path = acorr_files_folder + h5_filename
        env_config_path = env_config.json_path
        #env_config_path = str(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'env_config.json'))
        process_file_with_flow.delay(acorr_file_path, process_flow_full_path,env_config_path)
    return jsonify({"data":True})

@app.route('/api/log_process_holes',methods=['GET', 'POST'])
def log_process():
    req_json = request.get_json()
    mine_name = str(req_json['mine_name'])
    if mine_name == 'mont_wright':
        #processed_holes = req_json['processed_holes']
        #if processed_holes == False:
        #    return jsonify(False)

        #processed_csv_list = []
        #for processed_hole in processed_holes:
        #    processed_folder = os.path.join(env_config.get_hole_h5_processed_cache_folder(mine_name),
        #                                    processed_hole['output_folder_name'])
        #    processed_csv = pd.read_csv(os.path.join(processed_folder, 'processed.csv'))
        #    processed_csv_list.append(processed_csv)

        #df = pd.concat(processed_csv_list)
        df = pd.read_csv('/data/bob_processed_rpp.csv')
        lp_df = get_lp_df(df)
    lp_df.to_csv('./temp.csv',index=False)
    rhyno_props = {}
    mapping = update_or_create_config(subdomain_name, dataset_name, lp_df, rhyno_props)
    deploy_data('./temp.csv', subdomain_name, dataset_name, mapping)
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
    #print nparr.shape
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

#    print data.shape
    response = make_response(data.tobytes())
    response.headers.set('Content-Type', 'application/octet-stream')
    return response

@app.route('/aa')
def get_nparray2():
    td = TraceData()
    td.load_from_h5("/home/thiago/Downloads/test_data_/5_trim_0.h5")
    nparr = td.component_as_array("axial").astype(np.float32)

    def generate():
        last_pos = 0
        while last_pos < nparr.shape[0]:
            data = nparr[last_pos:last_pos+1000]
            last_pos += 1000
            #yield (b'--frame\r\n'
            #       b'Content-Type: application/octet-stream\r\n\r\n' + str(data) + b'\r\n')
            yield data.tobytes()
            sleep(10)

    #response = make_response(data.tobytes())
    #response.headers.set('Content-Type', 'application/octet-stream')
    #return response

    return Response(generate(), mimetype='application/octet-stream')




@app.route('/df')
def get_df():
    td = TraceData()
    td.load_from_h5("/home/thiago/Downloads/test_data_/5_trim_0.h5")
    df = td.dataframe
#    print df.shape,"dfshape"
    #print td.dataframe.to_json(orient='records')
    df = df[df.columns.drop(list(df.filter(regex='_trace')))]
    response = make_response(df.to_json(orient='columns'))
    #response.headers.set('Content-Type', 'application/octet-stream')
    return response


if __name__ == '__main__':
    app.run()