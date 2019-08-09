"""
welcome to the future
"""
import datetime
import glob2
import numpy as np
import os
import pandas as pd
import pdb
import requests
import socket

MP_REQUIRED_COLUMNS = ['pit','bench','pattern','hole','x','y','z']
RHINO_REQUIRED_COLUMNS = ['hole_id','start_time','rig_id','measured_depth','hole_start_time']
TIME_COLUMNS_HOLES_DF = []
SUPPORTED_DTYPES = [np.float64, np.int]


def filename_pattern_to_df(file_pattern,skiprows=0):
    df_list = []
    files = glob2.glob(file_pattern)
    if len(files) == 0:
        print ("NO FILES TO PROCESS ON THIS PATTERN : " + str(file_pattern))
        return pd.DataFrame()
    for file in files:
        print ("Reading :" + str(file))
        df = pd.DataFrame()
        if ".xlsx" in file:
            df = pd.read_excel(file, skiprows=skiprows, index=False)
        elif ".csv" in file:
            df = pd.read_csv(file, skiprows=skiprows, index=False)
        df_list.append(df)
    return pd.concat(df_list)

def clean_empty_columns_df(df):
    """
    ..:ToDo: add logging here to tell how many columns or rows were cut
    and also tell the column names that were cut
    """
    # REMOVE ALL NANS - Columns and rows
    df.dropna(how='all',axis='columns', inplace=True)
    df.dropna(how='all', axis='rows', inplace=True)


def timeshift_df(df, timedelta):
   """
   iterates over columns and changes those that can be converted to datetimes
   into datetimes.  Must first check if type is object.
   """
   for col in df.columns:
       if df[col].dtype == 'object':
           try:
               df[col] = pd.to_datetime(df[col])
           except ValueError:
               pass
   df.update(df.select_dtypes(include=[np.datetime64]) + timedelta)

def run(raw_directory,debug=False):
    """
    Generates a csv for rhino and mine portal
    """
    print("Started reading files from: " + str(raw_directory))
    if debug:
        tmp_holes_df = os.path.join(raw_directory, 'drilled_holes.csv')
        if os.path.isfile(tmp_holes_df):
            drilled_holes_df = pd.read_csv(tmp_holes_df, compression='zip', parse_dates=True)
        else:
            filename_pattern = os.path.join(raw_directory,'*drilled_hole.xlsx')
            drilled_holes_df = filename_pattern_to_df(filename_pattern,skiprows=3)
            drilled_holes_df.to_csv(tmp_holes_df, compression='zip')
            
        tmp_mwd_df = os.path.join(raw_directory, 'tmp_mwd.csv')
        if os.path.isfile(tmp_mwd_df):
            mwd_samples_df = pd.read_csv(tmp_mwd_df, compression='zip', 
                                     parse_dates=True)
        else:
            filename_pattern = os.path.join(raw_directory,'*MWD_Sample.xlsx')
            mwd_samples_df = filename_pattern_to_df(filename_pattern, skiprows=3)
            mwd_samples_df.to_csv(tmp_mwd_df, compression='zip')
    else:
        filename_pattern = os.path.join(raw_directory,'*drilled_hole.xlsx')
        drilled_holes_df = filename_pattern_to_df(filename_pattern,skiprows=3)
        filename_pattern = os.path.join(raw_directory,'*MWD_Sample.xlsx')
        mwd_samples_df = filename_pattern_to_df(filename_pattern, skiprows=3)
    

    clean_empty_columns_df(drilled_holes_df)
    tmp_mwd_df = os.path.join(raw_directory, 'tmp_mwd.csv')
    if os.path.isfile(tmp_mwd_df):
        mwd_samples_df = pd.read_csv(tmp_mwd_df, compression='zip', 
                                     parse_dates=True)
    else:
        filename_pattern = os.path.join(raw_directory,'*MWD_Sample.xlsx')
        mwd_samples_df = filename_pattern_to_df(filename_pattern, skiprows=3)
        mwd_samples_df.to_csv(tmp_mwd_df, compression='zip')
    clean_empty_columns_df(mwd_samples_df)
    
    ## KEY COLUMNS TO CONNECT BOTH DATASETS (LEFT IS THE FIRST DATASET ON MERGE(), right is the second)
    key_columns_left = ['Rig Name','Drill Plan Name','Drilled Hole ID','Drilled Hole Name']
    key_columns_right = ['Rig Name','Drill Plan Name','MWD Hole ID','MWD Hole Name']
    df = pd.merge(drilled_holes_df,mwd_samples_df,how="left",left_on= key_columns_left ,right_on=key_columns_right)

    filter_columns = ['Rig Name',
                      'Drill Plan Name',
                      'Drilled Hole ID',
                      'Drilled Hole Name',
                      'Drilled Start Hole Timestamp',
                      'Drilled End Hole Timestamp',
                      'Drilled Raw Start Point X',
                      'Drilled Raw End Point X',
                      'Drilled Raw Start Point Y',
                      'Drilled Raw End Point Y',
                      'Drilled Raw Start Point Z',
                      'Drilled Raw End Point Z',
                      'MWD Sample Timestamp',
                      'MWD Sample Hardness',
                      'MWD Sample Max Feed Rate',
                      'MWD Sample Specific Energy of Drilling',
                      'MWD Sample Depth (Avg)',
                      'MWD Sample Penetration Rate (Avg)',
                      'MWD Sample Percussion Pressure (Avg)',
                      'MWD Sample Feeder Pressure (Avg)',
                      'MWD Sample Damper Pressure (Avg)',
                      'MWD Sample Rotation Pressure (Avg)',
                      'MWD Sample Flush Air Pressure (Avg)',
                      'MWD Sample Flush Air Flow (Avg)',
                      'MWD Sample Feed Force (Avg)',
                      'MWD Sample Rotation Speed (Avg)',
                      'MWD Sample Rotation Torque (Avg)'
                      ]
    df = df[filter_columns]

    ## TIMESHIFT
    timeshift_df(df,timedelta=datetime.timedelta(hours=-8))


    ## MP REQUIRED COLUMNS
    print("Extracting PIT from Drill plan")
    df["pit"] = df["Drill Plan Name"].str.split("-", n=1, expand=True)[0]
    print("Extracting BENCH from Drill plan")
    df["bench"] = df["Drill Plan Name"].str.split("-", n=2, expand=True)[1]
    print("Extracting PATTERN from Drill plan")
    df["pattern"] = df["Drill Plan Name"].str.split("-", n=2, expand=True)[2]
    print("Setting Hole name")
    df['hole'] = df['Drilled Hole Name']
    ## X Y Z CALCULATIONS
    print("Extracting XYZ from RAW START POINT + MWD SAMPLE DEPTH" )
    df['x'] = df['Drilled Raw Start Point X']
    df['y'] = df['Drilled Raw Start Point Y']
    df['z'] = df['Drilled Raw Start Point Z'] + df['MWD Sample Depth (Avg)']

    ## MEASURED DEPTH / TRUE VERTICAL DEPTH COLUMNS
    ## CALCULATIONS SHOULD BE HERE
    print("Creating measured_depth, true vertical depth")
    df['measured_depth'] = df['MWD Sample Depth (Avg)']
    df['true_vertical_depth'] = df['MWD Sample Depth (Avg)']


    df.to_csv('./temp.csv',index=False)
    return df


def label_to_prop(label):
    return label.lower().replace(" ","_").replace("(","").replace(")","")

def prop_type_from_column_dtype(column_dtype):
    if np.issubdtype(column_dtype, np.float_):
        return "floatprop"
    elif np.issubdtype(column_dtype, np.int_):
        return "intprop"
    elif np.issubdtype(column_dtype, np.string_) or np.issubdtype(column_dtype, np.object_):
        return "strprop"
    elif column_dtype.kind == 'M':
        return "datetimeprop"

def update_or_create_config(subdomain_name, dataset_name, df, rhino_props):
    """
    dataset_conf: mapping is the part that will be changed in the dev cleanup
    
    """
    datasets_confs = MWDHelper('').get_dc_datasets_configs(subdomain_name)
    
    dataset_conf = {
        "mapping": [
            {"node_level": 0, "is_hierarchy": "Y", "column": "pit", "is_filter_by": "N", "label": "pit",
             "is_display": "Y", "uom": "", "is_welllog": "Y", "rhino_prop": "PIT", "prop": "pit", "is_color_by": "N"},
            {"column": "hole", "is_filter_by": "Y", "label": "hole",
             "is_display": "Y", "uom": "", "is_welllog": "N", "rhino_prop": "HOLE", "prop": "hole", "is_color_by": "Y"},
            {"node_level": 1, "is_hierarchy": "Y", "column": "bench", "is_filter_by": "N", "label": "bench",
             "is_display": "Y", "uom": "", "is_welllog": "N", "rhino_prop": "BENCH", "prop": "bench",
             "is_color_by": "N"},
            {"node_level": 2, "is_hierarchy": "Y", "column": "pattern", "is_filter_by": "N", "label": "pattern",
             "is_display": "Y", "uom": "", "is_welllog": "N", "rhino_prop": "PATTERN", "prop": "pattern",
             "is_color_by": "N"},
            {"is_hierarchy": "N", "column": "x", "is_filter_by": "Y", "label": "x", "is_display": "Y", "uom": "",
             "is_welllog": "N", "prop": "x", "is_color_by": "Y"},
            {"is_hierarchy": "N", "column": "y", "is_filter_by": "Y", "label": "y", "is_display": "Y", "uom": "",
             "is_welllog": "N", "prop": "y", "is_color_by": "Y"},
            {"is_hierarchy": "N", "column": "z", "is_filter_by": "Y", "label": "z", "is_display": "Y", "uom": "",
             "is_welllog": "N", "prop": "z", "is_color_by": "Y"},
            {"is_hierarchy": "N", "column": "measured_depth", "is_filter_by": "Y", "label": "measured_depth", "is_display": "Y", "uom": "",
             "is_welllog": "N", "prop": "measured_depth", "is_color_by": "Y"},
            {"is_hierarchy": "N", "column": "true_vertical_depth", "is_filter_by": "Y", "label": "true_vertical_depth", "is_display": "Y", "uom": "",
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
        if column not in columns_in_mapping:
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
            print(column, rhino_props.keys())
            if column in rhino_props.keys():
                column_obj['rhino_prop'] = rhino_props[column]

            dataset_conf['mapping'].append(column_obj)

    dataset_names = [o['name'] for o in datasets_confs]
    if dataset_name in dataset_names:
        datasets_confs[dataset_names.index(dataset_name)] = dataset_conf
    else:
        datasets_confs.append(dataset_conf)

    token = MWDHelper('').get_token()
    deploy_config(token,subdomain_name,dataset_name,datasets_confs)
    return dataset_conf['mapping']

def deploy_config(token, subdomain_name, active_dataset, datasets):

    headers = {'auth_token': token, 'domain_name':subdomain_name,'dataset_name':active_dataset}
    r = requests.post(API_BASE_URL+'/new_dataset', json=(datasets), headers = headers)
    response = (r.json())
    return response

def deploy_data(csv_file_path, subdomain_name, dataset_name, mapping):
    df = pd.read_csv(csv_file_path)
    columns_rename = {}
    for col in mapping:
        columns_rename[col['label']] = col['prop']
    df = df.rename(columns=columns_rename)
    df.to_csv(csv_file_path,index=False)

    try:
        token = MWDHelper('').get_token()
        files = {'file': open(csv_file_path, 'rb')}
        headers = {'auth_token': token, 'domain_name': subdomain_name, 'dataset_name': dataset_name}
        r = requests.post(API_BASE_URL + '/upload_dataset', files=files, headers=headers)
        response = (r.json())
        print(response)
    except Exception as e:
        print("Failed: " + str(e))


if __name__ == "__main__":
    from dcrhino3.helpers.mwd_helper import MWDHelper
    import matplotlib.pyplot as plt
    hostname = socket.gethostname()
    if hostname=='thales4':
        mwd_folder = '/home/kkappler/.cache/datacloud/bhp/eastern_ridge/mwd/from_client/eastern_ridge_raw_mwd'
    else:
        mwd_folder = '/home/thiago/Downloads/eastern_ridge_raw_mwd/'

    subdomain_name = 'devdatacloud'
    dataset_name = 'eastern_ridge_v1'
    API_BASE_URL = "http://104.42.216.162:5002/api"
    df = run(mwd_folder, debug=True) #creates a csv: df.to_csv(), that csv goes to MP, Rhino
        
    print ("Generating mapping")

    rhyno_props = {'Drilled Penetration Rate (m/min)':'rate_of_penetration', 
                   'MWD Sample Rotation Torque (Avg)':'torque_on_bit'}
    mapping = update_or_create_config(subdomain_name, dataset_name, df, rhyno_props)
    
    deploy_data('./temp.csv', subdomain_name, dataset_name,mapping)
    print('success!')
    #pipeline_df?
    
    #can call physics functions here by apply 
    
