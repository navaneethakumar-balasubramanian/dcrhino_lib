# -*- coding: utf-8 -*-


import json
class BaseModule(object):
    def __init__(self,json,output_path):
        self.id = "base_module"
        self.version = 1
        self.json = json
        self.output_path = output_path
        
        self.output_to_file = False
        self.args = {}
    
        self.set_data_from_json(json)
    
    def get_transformed_args(self,global_config):
        transformed = dict()
        for key in self.args.keys():
            val = self.args[key]
            if (type(val) == unicode or type(val) == str) and "|global_config." in str(val):
                gc_var_name = val.replace("|","").replace("global_config.","")
                transformed[key] = getattr(global_config,gc_var_name)
            else:
                transformed[key] = val
        return transformed
        
    def set_data_from_json(self,json):
        for _key in json.keys():
            self.__dict__[_key] = json[_key]
            
    def output_to_file(self):
        return ('output_to_file' in self.args.keys() and self.args['output_to_file'] == True)
    
    def applied_module_string(self,args):
        temp = dict()
        temp['module_id'] = self.id
        temp['module_version'] = self.version
        temp['args'] = args
        return json.dumps(temp)