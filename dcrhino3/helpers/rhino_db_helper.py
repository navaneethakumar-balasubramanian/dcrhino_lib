#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Jan 14 20:56:19 2019

@author: thiago
"""

from clickhouse_driver import Client
import uuid
import time
import numpy as np
import pdb
import pandas as pd
import logging
import blaze as bz

class RhinoDBHelper:
        def __init__(self,host='localhost',user='default',password='',database='test',compression='lz4'):
            self.client = Client(host,user=user,password=password,database=database,compression=compression)
            self.acorr_traces_table_name = 'acorr_traces'
            self.acorr_files_table_name = 'acorr_files'
            self.acorr_configs_table_name = 'acorr_configs'
            self.max_batch_to_query = 5000
            
        def get_file_id_from_file_path(self,file_path):
            query_vars={
                        'file_path':file_path
                        }
            q = self.client.execute('select UUIDNumToString(id) from '+self.acorr_files_table_name+' where file_path=%(file_path)s',query_vars)
            if len(q) == 0:
                return self.create_acorr_file(file_path)
            return q[0][0]
        

        
        def create_acorr_conf(self,file_id,config_str,version=1):
            vars_to_save = {
                        'id':self.uuid_string_to_num(file_id),
                        'version':version,
                        'json_str':config_str,
                        'created_at_ts':int(time.time())
                }
            self.client.execute("insert into "+self.acorr_configs_table_name+" values",[vars_to_save])
            return file_id
            
        def uuid_string_to_num(self,uuid_string):
            return self.client.execute("select UUIDStringToNum('"+uuid_string+"')")[0][0]
    
        def create_acorr_file(self,file_path):
            file_id = str(uuid.uuid4())
            vars_to_save = {
                        'id':self.uuid_string_to_num(file_id),
                        'file_path' : file_path
            }
            self.client.execute("insert into "+ self.acorr_files_table_name +" values",[vars_to_save])
            return file_id

        def get_autocorr_config_id(self,config_str):
            query_vars={
                        'config':config_str
                        }
            q = self.client.execute('select UUIDNumToString(id) from '+self.acorr_configs_table_name+' where json_str=%(config)s',query_vars)
            if len(q) == 0:
                return self.save_config(config_str)
            return q[0][0]
        
        def save_config(self,config_str,version=0):
            config_id = str(uuid.uuid4())
            vars_to_save = {
        			'id':self.uuid_string_to_num(config_id),
        			'version':version,
        			'created_at_ts':int(time.time()),
                'json_str':config_str
                                }
            self.client.execute('insert into '+self.acorr_configs_table_name+' values',[vars_to_save])
            return config_id
	
        def save_autocorr_traces(self,rig_id,sensor_id,digitizer_id,config_id,file_id,timestamps,axial,tangential,radial):
            dups = self.check_for_pre_saved_acorr_traces(timestamps,sensor_id)
            
            df = pd.DataFrame()
            df['timestamps'] = np.array(timestamps).astype(int)
            df['microtime'] = 0
            df['rig_id'] = rig_id
            df['sensor_id'] = sensor_id
            df['digitizer_id'] = digitizer_id
            df['axial'] = axial.tolist()
            df['tangential'] = tangential.tolist()
            df['radial'] = radial.tolist()
            df['acorr_file_id'] = self.uuid_string_to_num(file_id)
            df['acorr_config_id'] = self.uuid_string_to_num(config_id)
            
            
            if len(dups)>0:
                df = df[~df['timestamps'].isin(dups)]
                logging.warning("PREVENTING DUPLICATES TIMESTAMPS ON THIS SENSOR_ID:" + sensor_id + " FILE_ID:" +file_id) 
                #raise ValueError('There is already data for this sensor id and these timestamps on the DB',sensor_id,dups)
            
            n = self.max_batch_to_query
            list_df = [df[i:i+n] for i in range(0,df.shape[0],n)]
            for chunk in list_df:   
                #pdb.set_trace()
                self.client.execute('insert into '+self.acorr_traces_table_name+' values',chunk.values.tolist())

        def check_for_pre_saved_acorr_traces(self,timestamps,sensor_id):
            if len(timestamps) == 0 :
                return np.array([])
            timestamps = np.unique(timestamps).astype(int)
            duplicate = []
            splitted =  np.array_split(timestamps, int(len(timestamps)/self.max_batch_to_query)+1)
            
            for times_batch in splitted:
                duplicate += self.client.execute('select distinct(timestamp) from ' + self.acorr_traces_table_name + " where timestamp IN (%s) and sensor_id = '%s' order by timestamp" % (','.join(times_batch.astype(str)),str(sensor_id)))
            return np.unique(np.array(duplicate).flatten())
        
        def get_autocor_traces_from_sensor_id(self,sensor_id,timestamps):
            timestamps = np.unique(timestamps)
            result = self.client.execute('select timestamp,microtime,rig_id,UUIDNumToString(acorr_files_id) as acorr_files_id,axial_trace,tangential_trace,radial_trace from ' + self.acorr_traces_table_name + " where timestamp IN (%s) order by timestamp" % ','.join(timestamps.astype(str)))
            return self.query_result_to_pd(result,['timestamp','microtime','rig_id','accor_files_id','axial_trace','tangential_trace','radial_trace'])
        
        def query_result_to_pd(self,result,columns):
            return pd.DataFrame(result,columns=columns)

            
#a = RhinoDBHelper().save_autocorr_traces("1",'1','f7d468bb-19a2-4a95-aaf3-9c98ed5c5bdd',np.arange(1,3601),np.full([3600,3600],0),np.full([3600,3600],0),np.full([3600,3600],0))
#a = RhinoDBHelper().get_autocor_traces_from_sensor_id('1',np.arange(1,3601))
#rhino_db_helper = RhinoDBHelper()

#for i in range(0,100):
#    if rhino_db_helper.get_file_uuid_from_file_path(str(i)) is False:
#        a = rhino_db_helper.create_acorr_file(str(i),'aa')
        
#pdb.set_trace()