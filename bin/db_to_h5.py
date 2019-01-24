#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Jan 17 05:12:46 2019

@author: thiago
"""

from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
import pdb


dbhelper = RhinoDBHelper(host='13.66.189.94',database='test_for_karl')
temp = dbhelper.get_autocor_traces_from_sensor_id('2235')  
pdb.set_trace()