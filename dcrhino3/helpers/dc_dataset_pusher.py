from dcrhino3.helpers.mwd_helper import MWDHelper
import requests
import tempfile
import pandas as pd
import numpy as np
import os
from clickhouse_driver import Client


class DcDatasetPusher:
    def __init__(self,df,dc_subdomain,dataset_name,config = None):
        self.API_BASE_URL = 'http://104.42.216.162:5002/api'
        self.token = MWDHelper('').get_token()
        self.dc_subdomain = dc_subdomain
        self.dataset_name = dataset_name
        self.table_name = self.get_table_name(self.dataset_name)
        self.df = df

        self.df = self.boolean_to_int_columns(self.df)
        self.csv_file_path = "/tmp/" + str(next(tempfile._get_candidate_names())) + ".csv"
        conn = self.get_db_conn(self.dc_subdomain,self.token)
        self.client = Client(conn['host'], user=conn['username'], password=conn['password'], database=conn['database'], port=conn['port'])
        result = self.client.execute("show tables", with_column_types=True)
        self.tables_in_db = np.asarray(result[0]).T[0]

        if self.table_name in self.tables_in_db:
            print ("Dropping table " + self.table_name)
            self.client.execute('drop table "{}"'.format(self.table_name), with_column_types=True)

        self.create_empty_table()


        if config is None:
            self.config = self.update_or_create_config(df,rhino_props={})
        else:
            self.config = config

        self.deploy_data(self.config)

    def get_table_name(self,dataset_name):
        return "tb_" + dataset_name.lower().replace('-','_') + "_prod"

    @property
    def create_table_sql(self):
        sql = ''
        dirname = os.path.dirname(__file__)
        f = open(os.path.join(dirname, "clickhouse_db/sqls/create_mp_dataset_table.sql"), "r")
        sql = f.read()
        return sql

    def create_empty_table(self):
        print ("Creating table " + self.table_name)
        query = self.create_table_sql.format(self.table_name)
        self.client.execute(query, with_column_types=True)
        print("Created")



    def boolean_to_int_columns(self,df):
        for col in df.columns:
            if df[col].dtype == np.dtype('bool'):
                df[col] = df[col].astype(int)
        return df


    def get_db_conn(self,subdomain,token):
        """
        Requests data from database, with credentials built in (for now), creates
        a temorary json file for data recieved, and returns data.

        Parameters:
            subdomain (str): data location in the database

        Returns:
            (dict): connection dictionary with host and port to be used in :func:`~get_mwd_from_db`
        """
        #r = requests.post('https://prod.datacloud.rocks/v1/auth', json={"username":'admin', "password":'pass123$$$'})
        #token = r.json()['token']
        headers = {'Authorization':'Bearer ' + token,'x-dc-subdomain':subdomain}
        r = requests.get('https://prod.datacloud.rocks/v1/viz/config',headers=headers)
        temp = r.json()
        conn_dict = dict()
        conn_dict['host'] = temp['ch_conn'].replace("tcp://","").split("?")[0].split(":")[0]
        conn_dict['port'] = int(temp['ch_conn'].replace("tcp://","").split("?")[0].split(":")[1])
        args = temp['ch_conn'].replace("tcp://","").split("?")[1].split("&")
        for arg in args:
            splitted = arg.split('=')
            conn_dict[splitted[0]]=splitted[1]

        return conn_dict

    def prop_type_from_column_dtype(self, column_dtype):
        if isinstance(column_dtype, pd.core.dtypes.dtypes.CategoricalDtype):
            return "strprop"
        elif np.issubdtype(column_dtype, np.float_):
            return "floatprop"
        elif np.issubdtype(column_dtype, np.int_) or column_dtype == np.dtype('uint64') or column_dtype == np.dtype('bool') :
            return "intprop"
        elif np.issubdtype(column_dtype, np.string_) or np.issubdtype(column_dtype, np.object_):
            return "strprop"
        elif column_dtype.kind == 'M':
            return "datetimeprop"

    def deploy_config(self, datasets):
        headers = {'auth_token': self.token, 'x-dc-subdomain': self.dc_subdomain, 'dataset_name': self.dataset_name}
        r = requests.post(self.API_BASE_URL + '/new_dataset', json=(datasets), headers=headers)
        response = (r.json())
        print ("Pushing config")
        print (response)
        return response

    def update_or_create_config(self, df, rhino_props):
        """
        dataset_conf: mapping is the part that will be changed in the dev cleanup

        """
        datasets_confs = False
        try:
            datasets_confs = MWDHelper('').get_dc_datasets_configs(self.dc_subdomain)
            original_dataset_confs = datasets_confs
        except:
            print ("DATASETS PROBLEM ON MP")

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
            "table_name": self.table_name,
            "name": self.dataset_name,
            "format":"custom"
        }

        columns_in_mapping = []
        for col in dataset_conf['mapping']:
            if 'rhino_prop' in col.keys():
                columns_in_mapping.append(col['rhino_prop'])
                columns_in_mapping.append(col['label'])
            else:
                columns_in_mapping.append(col['label'])

        floatprops_counter = 0
        intprops_counter = 0
        strprops_counter = 0
        datetimeprops_counter = 0
        for column in df.columns:
            if column not in columns_in_mapping :
                column_obj = {}
                column_dtype_str = self.prop_type_from_column_dtype(df[column].dtype)
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
                column_obj["prop"] = self.label_to_prop(column)
                column_obj["is_filter_by"] = "Y"
                column_obj["is_hierarchy"] = "N"
                column_obj["is_display"] = "Y"
                column_obj["is_welllog"] = "Y"
                column_obj["is_color_by"] = "Y"
                #print(column, rhino_props.keys())
                if column in rhino_props.keys():
                    column_obj['rhino_prop'] = rhino_props[column]

                dataset_conf['mapping'].append(column_obj)

        if datasets_confs:
            dataset_names = [o['name'] for o in datasets_confs]
            if self.dataset_name in dataset_names:
                datasets_confs[dataset_names.index(self.dataset_name)] = dataset_conf
            else:
                datasets_confs.append(dataset_conf)

        for prop in dataset_conf['mapping']:
            if (prop['prop'] == 'pit'):
                print (prop)
      #  if original_dataset_confs != datasets_confs:
      #      print ("Changed config... Updating")
      #      self.deploy_config( datasets_confs )
        if datasets_confs:
            self.deploy_config(datasets_confs)
        else:
            print ("Error pushing config")

        return dataset_conf['mapping']


    def deploy_data(self, mapping):
        df = self.df
        columns_rename = {}
        for col in mapping:
            if 'rhino_prop' in col.keys():
                columns_rename[col['rhino_prop']] = col['column']
            else:
                columns_rename[col['label']] = col['column']
        df.rename(columns=columns_rename, inplace=True)
        for col in df.columns:
            if "strprop" in col:
                df[col] = df[col].astype(str)
                df[col] = df[col].fillna("").replace('nan', "")

        df['hole'] = df['hole'].astype(str)
        df['bench'] = df['bench'].astype(str)
        df['pattern'] = df['pattern'].astype(str)
        df = df[df['x'].notnull()]
        df = df[df['y'].notnull()]
        df = df[df['z'].notnull()]
        df = df.fillna(np.nan)

        print("Pushing data to clickhouse table " , self.table_name)
        last_pos = 0
        batch_size = 1000000
        temp = df[last_pos:last_pos+batch_size]
        while temp.shape[0] > 0:
            #temp = temp.replace({pd.np.nan: None})
            print ("Pushing from {} to {} of {} ".format(last_pos,last_pos+batch_size,df.shape[0]))

            self.client.execute('insert into "' + self.table_name + '" (' + ','.join(temp.columns) + ') values',
                                temp.values.tolist(),types_check=True)
            last_pos += batch_size
            temp = df[last_pos:last_pos + batch_size]

        #self.client.execute('insert into "' + self.table_name + '" (' + ','.join(df.columns) + ') values',
         #                   df.values.tolist())
        print("Pushing vtp generation request")
        headers = {'auth_token': self.token, 'x-dc-subdomain': self.dc_subdomain}
        r = requests.post(self.API_BASE_URL + '/generate_vtp_from_prod_table', json={'dataset_name': self.dataset_name} , headers=headers)
        response = (r.json())
        print("Pushed vtp generation request")
        print(response)

    def _deploy_data(self, mapping):
        df = self.df
        columns_rename = {}
        for col in mapping:
            if col['rhino_prop']:
                columns_rename[col['rhino_prop']] = col['prop']
            else:
                columns_rename[col['label']] = col['prop']
        df = df.rename(columns=columns_rename)
        df.to_csv(self.csv_file_path, index=False)

        try:
            token = MWDHelper('').get_token()
            files = {'file': open(self.csv_file_path, 'rb')}
            headers = {'auth_token': token, 'x-dc-subdomain': self.dc_subdomain, 'dataset_name': self.dataset_name}
            r = requests.post(self.API_BASE_URL + '/upload_dataset', files=files, headers=headers)
            response = (r.json())

            print("Pushing data to mp")
            print(response)
        except Exception as e:
            print("Failed: " + str(e))

        os.remove(self.csv_file_path)

    def label_to_prop(self, label):
        return label.lower().replace(" ", "_").replace("(", "").replace(")", "")