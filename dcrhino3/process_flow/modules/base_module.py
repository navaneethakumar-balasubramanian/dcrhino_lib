# -*- coding: utf-8 -*-

import pdb
import os
import json
from collections import namedtuple
from dcrhino3.helpers.general_helper_functions import json_string_to_object,dict_to_object

class BaseModule(object):
    def __init__(self, json, output_path,process_flow,order):
        """
        @type json: dictionary
        @iver args: dictionary, from json, this is where we specify the numerical
        and other specific values and parameters for the process module instance
        for example, if adding 3.0 to the traces, the number 3.0 would be in here
        """
        self.id = "base_module"
        self.version = 1
        self.json = json
        self.output_path = output_path

        self.output_to_file = False
        self.args = {}
        self.default_args = {}

        self.set_data_from_json(json)
        self.process_flow = process_flow
        self.order = order

    def process_trace(self,trace):
        return trace



    def output_file_basepath(self,append="",extension=".csv"):
        output_file_name = str(self.order) + "_" + str(self.id) + str(append) + extension
        return os.path.join(self.output_path,output_file_name)


    def get_transformed_args(self, global_config):
        transformed = dict()
        self.default_args.update(self.args)
        self.args = self.default_args
        for key in self.args.keys():
            val = self.args[key]
            if type(val) == list:
                ## USE GLOBAL_CONFIG OR DEFAULT
                if (type(val[0]) == unicode or type(val[0]) == str) and "|global_config." in str(val[0]):
                    gc_var_name = val[0].replace("|","").replace("global_config.","")
                    if gc_var_name in vars(global_config):
                        transformed[key] = getattr(global_config, gc_var_name)
                    else:
                        transformed[key] = val[1]
                else:
                    transformed[key] = val
                ################################
            
            elif (type(val) == unicode or type(val) == str) and "|global_config." in str(val):
                gc_var_name = val.replace("|","").replace("global_config.","")
                transformed[key] = getattr(global_config, gc_var_name)
            else:
                transformed[key] = val
            
            transformed[key] = json_string_to_object(transformed[key])
        transformed = dict_to_object(transformed)
                
        return transformed
    

    def set_data_from_json(self,json):
        """
        managing the json, making accessible
        """
        for _key in json.keys():
            self.__dict__[_key] = json[_key]

#    def output_to_file(self):
#        return ('output_to_file' in self.args.keys() and self.args['output_to_file'] == True)

    def applied_module_string(self,args):
        temp = dict()
        temp['module_id'] = self.id
        temp['module_version'] = self.version
        temp['args'] = args
        return json.dumps(temp)