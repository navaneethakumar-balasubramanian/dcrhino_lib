# -*- coding: utf-8 -*-

class ColourBarAxisLimits(object):
    """
    supports kwarg colourbar_type {'each_axis', 'all_one'}
    WARNING: 'each_axis' not yet tested
    """
    def __init__(self, **kwargs):
        """
        TODO: make v_min[1], rather than v_min_1, i.e. use a dictionary
        """
        self.colourbar_type =  kwargs.get('colourbar_type', 'all_one')
        self.num_axes = kwargs.get('num_axes', 3)
        self.v_min_all = kwargs.get('v_min_all', -0.5)
        self.v_max_all = kwargs.get('v_max_all',  0.5)
        self.axes_limts = {}
#        for i_ax in range(self.num_axes):
#            self.axes = kwargs.get('v_min_1', -0.5)
        self.v_min_1 = kwargs.get('v_min_1', -0.5)
        self.v_max_1 = kwargs.get('v_max_1',  0.5)
        self.v_min_2 = kwargs.get('v_min_2', -0.5)
        self.v_max_2 = kwargs.get('v_max_2',  0.5)
        self.v_min_3 = kwargs.get('v_min_3', -0.5)
        self.v_max_3 = kwargs.get('v_max_3',  0.5)
        if self.colourbar_type == 'all_one':
            self.assign_to_all()

    def assign_to_all(self):
        self.v_min_1 = self.v_min_all
        self.v_max_1 = self.v_max_all
        self.v_min_2 = self.v_min_all
        self.v_max_2 = self.v_max_all
        self.v_min_3 = self.v_min_all
        self.v_max_3 = self.v_max_all