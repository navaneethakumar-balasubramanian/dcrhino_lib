#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Jan 21 13:26:49 2019

@author: sjha
"""
import pdb

from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino.analysis.unstable.sumant.qc_log_plotter_db import QCLogPlotter_db

sensor = '5206'
start_ts = 1525557047
end_ts = 1525557147
db_helper = RhinoDBHelper('13.66.189.94',database='milligan_v3')
traces = db_helper.get_autocor_traces_from_sensor_id(sensor,start_ts,end_ts)
files_list = db_helper.get_files_list()
trace_data = TraceData()
trace_data.dataframe = traces
axial = trace_data.component_as_array('axial_trace')
tangential = trace_data.component_as_array('tangential_trace')
radial = trace_data.component_as_array('radial_trace')

qclogplotter_time = QCLogPlotter_db(axial,tangential,radial,start_ts,end_ts)
qclogplotter_time.plot(save=False, show=True)


#pdb.set_trace()
