# -*- coding: utf-8 -*-

import pdb
import json
from collections import namedtuple
from dcrhino3.helpers.general_helper_functions import json_string_to_object,dict_to_object

class BaseModule(object):
    def __init__(self, json, output_path):
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

        self.set_data_from_json(json)


    def get_transformed_args(self, global_config):
        transformed = dict()
        for key in self.args.keys():
            val = self.args[key]
            if (type(val) == unicode or type(val) == str) and "|global_config." in str(val):
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