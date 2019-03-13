# -*- coding: utf-8 -*-


class HoleSelector(object):
    """
    """
    def __init__(self,json):
        """
        """
        self.id = 0
        self.parse_json(json)
        
    def parse_json(self,json):
        """
        Parse json like in :func:`process_flow.parse_json`
        
        Parameters:
            json (dict): dictionary guiding the json_parsing
            
        .. warning:: use json parsing function in process_flow module instead
        """
        for _key in json.keys():
            self.__dict__[_key] = json[_key]
            
    def filter_matches_list(self,matches_list,mine_name):
        pass

        