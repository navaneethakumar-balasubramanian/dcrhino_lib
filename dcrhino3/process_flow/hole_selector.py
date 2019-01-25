# -*- coding: utf-8 -*-


class HoleSelector(object):
    def __init__(self,json):
        self.id = 0
        self.parse_json(json)
        
    def parse_json(self,json):
        for _key in json.keys():
            self.__dict__[_key] = json[_key]
            
    def filter_matches_list(self,matches_list,mine_name):
        pass

        