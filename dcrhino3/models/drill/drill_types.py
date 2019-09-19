# -*- coding: utf-8 -*-

from enum import Enum

class DrillTypes(Enum):
    """
    Assign integers to drill types.
    
        + Unknown = 0
        + Electric Rotary = 1
        + Diesel Rotary = 2
        + DTH = 3
        + Top Hammer = 4
        + Coring = 5    
    """
    UNKNOWN = 0
    ELETRIC_ROTARY = 1
    DIESEL_ROTARY = 2
    DTH = 3
    TOP_HAMMER = 4
    CORING = 5