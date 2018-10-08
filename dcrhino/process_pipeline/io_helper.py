# -*- coding: utf-8 -*-

import os
from datetime import datetime
from string import zfill

class IOHelper:
    
    def __init__ (self, config ):
        self.config = config
    
    def can_save_to_path(self,path):
        return os.path.exists(path)
    
    def get_mine_path(self):
        path = os.path.join(self.config.base_output_path,self.config.mine_name)
        if not os.path.exists(path):
            os.makedirs(path)
        return path
    
    def get_output_base_path(self,hole_uid):
        path_date = datetime.now().strftime("%Y-%m-%d")
        path = os.path.join(self.config.base_output_path,self.config.mine_name,str(self.config.sensor_serial_number),str(self.config.output_sampling_rate),hole_uid)
        counter = 1
        if not os.path.exists(path):
            os.makedirs(path)
        else:
            for directory in os.listdir(path):
                splitted_str = directory.split('_')
                dir_date = splitted_str[0]
                if dir_date == path_date:
                    counter += 1
                    
        datePath = os.path.join(path,path_date+ "_"+zfill(int(counter),5))
        os.makedirs(datePath)
        return datePath
    