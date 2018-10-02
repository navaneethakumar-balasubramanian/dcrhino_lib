# -*- coding: utf-8 -*-

import os

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