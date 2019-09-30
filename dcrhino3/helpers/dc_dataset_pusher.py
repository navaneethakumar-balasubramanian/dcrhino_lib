from dcrhino3.helpers.mwd_helper import MWDHelper
import requests
import tempfile
import pandas as pd
import numpy as np
import os

class DcDatasetPusher:
    def __init__(self,df,dc_subdomain,dataset_name,config = None):
        self.API_BASE_URL = 'http://104.42.216.162:5002/api'
        self.token = MWDHelper('').get_token()
        self.dc_subdomain = dc_subdomain
        self.dataset_name = dataset_name
        self.df = df
        self.csv_file_path = "/tmp/" + str(next(tempfile._get_candidate_names())) + ".csv"
        if config is None:
            self.config = self.update_or_create_config(df,rhino_props={})
        else:
            self.config = config

        self.deploy_data(self.config)

    def prop_type_from_column_dtype(self, column_dtype):
        if isinstance(column_dtype, pd.core.dtypes.dtypes.CategoricalDtype):
            return "strprop"
        elif np.issubdtype(column_dtype, np.float_):
            return "floatprop"
        elif np.issubdtype(column_dtype, np.int_) or column_dtype == np.dtype('uint64'):
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
        datasets_confs = MWDHelper('').get_dc_datasets_configs(self.dc_subdomain)

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
            "table_name": self.dataset_name + "_prod",
            "name": self.dataset_name,
            "format":"custom"
        }

        columns_in_mapping = [o['label'] for o in dataset_conf['mapping']]
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

        dataset_names = [o['name'] for o in datasets_confs]
        if self.dataset_name in dataset_names:
            datasets_confs[dataset_names.index(self.dataset_name)] = dataset_conf
        else:
            datasets_confs.append(dataset_conf)

        self.deploy_config( datasets_confs)
        return dataset_conf['mapping']

    def deploy_data(self, mapping):
        df = self.df
        columns_rename = {}
        for col in mapping:
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