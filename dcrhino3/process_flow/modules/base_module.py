# -*- coding: utf-8 -*-

import pdb
import os
import json
import copy

from collections import namedtuple
from dcrhino3.helpers.general_helper_functions import json_string_to_object,dict_to_object

class BaseModule(object):
    def __init__(self, json, output_path,process_flow,order):
        """
        Parameters:
            json (dict): this is where we specify the numerical
            and other specific values and parameters for the process module instance
            for example, if adding 3.0 to the traces, the number 3.0 would be in here

            output_path (str): where to send the files

            process_flow (dict): tracker of process

            order (str): to add to titles
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
        self._components_to_process = ['axial','tangential']

    def set_prop_process(self,var_name,var_value):
        """
        Adds vars and their appropriate values to process flow dictionary

        Args:
            var_name (str): variable to be added
            var_value (str): value of the new variable
        """
        if "vars" not in self.process_flow.process_json.keys():
            self.process_flow.process_json["vars"] = dict()
        self.process_flow.process_json["vars"][var_name] = var_value
        pass

    def process_trace(self,trace):
        return trace



    def output_file_basepath(self,append="",extension=".csv"):
        """
        If requested, output file to csv of this path

        Args:
            append (str): Piece of the path to place the file
            extension (str): Another piece of the path

        Returns:
            (os path): path object to the file
        """
        output_file_name = str(self.order) + "_" + str(self.id) + str(append) + extension
        return os.path.join(self.output_path,output_file_name)


    def get_transformed_args(self, global_config,args = None):
        """
        Retrieve the arguments from the args dictionary, or use global config if non provided.
        Args:
            global_config (dict): essentially the default to use without args overwrite
            args (dict): arg to be used if diff from default

        Returns:
            transformed (obj): object containg default json strings and new args

        """
        transformed = dict()
        #self.args = self.args.copy()
        if args is None:
            temp = copy.deepcopy(self.default_args)
            temp2 = copy.deepcopy(self.args)
            temp.update(temp2)
            args = temp
            #self.args = temp
            #args = self.args

        for key in args.keys():
            val = args[key]
            if type(val) == dict:
                transformed[key] =  self.get_transformed_args(global_config,val)
            elif type(val) == list:

                ## USE GLOBAL_CONFIG OR DEFAULT
                if (type(val[0]) == unicode or type(val[0]) == str) and "|global_config." in str(val[0]):
                    gc_var_name = val[0].replace("|", "").replace("global_config.", "")
                    if gc_var_name in vars(global_config):
                        transformed[key] = getattr(global_config, gc_var_name)
                    else:
                        transformed[key] = val[1]
                else:
                    for i, item in enumerate(val):
                        if type(item) == dict:
                            val[i] = self.get_transformed_args(global_config, item)
                        else:
                            val[i] = val[i]
                    transformed[key] = val
                ################################
            elif (type(val) == unicode or type(val) == str) and "|global_config." in str(val):
                gc_var_name = val.replace("|","").replace("global_config.","")
                transformed[key] = getattr(global_config, gc_var_name)
            elif (type(val) == unicode or type(val) == str) and "|process_flow." in str(val):
                gc_var_name = val.replace("|","").replace("process_flow.","")
                if "vars" in self.process_flow.process_json.keys() and gc_var_name in self.process_flow.process_json["vars"].keys():
                    transformed[key] = self.process_flow.process_json["vars"][gc_var_name]
                else :
                    transformed[key] = None
            else:
                transformed[key] = val

            transformed[key] = json_string_to_object(transformed[key])
        transformed = dict_to_object(transformed)

        return transformed


    def set_data_from_json(self,json):
        """
        Managing the json, making accessible
        """
        for _key in json.keys():
            self.__dict__[_key] = json[_key]

#    def output_to_file(self):
#        return ('output_to_file' in self.args.keys() and self.args['output_to_file'] == True)

    def applied_module_string(self,args):
        """
        Pulls from json strings using args, id, and version.

        Args:
            args: things to retrieve from the json

        Returns:
            json data with json.dumps

        """
        temp = dict()
        temp['module_id'] = self.id
        temp['module_version'] = self.version
        temp['args'] = args
        return json.dumps(temp)

    @property
    def components_to_process(self):
        return self._components_to_process