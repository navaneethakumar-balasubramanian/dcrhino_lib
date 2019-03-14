# -*- coding: utf-8 -*-

from enum import Enum

class SensorInstallationLocations(Enum):
    """
    Assign integers to sensor installation locations.
    
        + OTHER = 0
        + SHOCKSUB = 1
        + SAVER_SUB = 2
        + STEEL = 3
        + STEEL_BREAKOUT = 4
        + UNKNOWN = 5
    """
    OTHER = 0
    SHOCKSUB = 1
    SAVER_SUB = 2
    STEEL = 3
    STEEL_BREAKOUT = 4
    UNKNOWN = 5