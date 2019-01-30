# -*- coding: utf-8 -*-

import os
import numpy as np
from matplotlib.ticker import AutoMinorLocator
from matplotlib.lines import Line2D

import matplotlib.pyplot as plt
import pdb
import pandas as pd



class QCLogPlotter_db():

    def __init__(self,axial,tangential,radial,plot_title,plot_by_depth=True):
        
        self.axial = axial
        self.tangential = tangential
        self.radial = radial
        self.plot_title = plot_title
        