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

class RhinoDBHelper:
        def __init__(self,host='localhost',user='default',password='',database='test',compression='lz4'):
            self.client = Client(host,user=user,password=password,database=database,compression=compression)
            self.acorr_traces_table_name = 'acorr_traces'
            self.acorr_files_table_name = 'acorr_files'
            self.acorr_configs_table_name = 'acorr_files_configs'
            self.max_batch_to_query = 5000
            
        def get_file_id_from_file_path(self,file_path):
            query_vars={
                        'file_path':file_path
                        }
            q = self.client.execute('select UUIDNumToString(id) from '+self.acorr_files_table_name+' where file_path=%(file_path)s',query_vars)
            if len(q) == 0:
                return False
            return q[0][0]
        
        def create_acorr_file(self,file_path,rig_id,sensor_id,digitizer_id,min_ts,max_ts):
            file_id = str(uuid.uuid4())
            vars_to_save = {
                        'id':self.uuid_string_to_num(file_id),
                        'file_path' : file_path,
                        'rig_id':rig_id,
                        'sensor_id':sensor_id,
                        'digitizer_id':digitizer_id,
                        'min_ts':int(min_ts),
                        'max_ts':int(max_ts)
            }
            self.client.execute("insert into "+ self.acorr_files_table_name +" values",[vars_to_save])
            return file_id
        
        def create_new_acorr_file_conf(self,file_id,config_str):
            version = self.get_last_version_file_config(file_id)
            last_version_config = self.get_file_config(file_id,version)
            if last_version_config == config_str:
                return version
            vars_to_save = {
                        'acorr_file_id':self.uuid_string_to_num(file_id),
                        'version':version+1,
                        'created_at_ts':int(time.time()),
                        'json_str':config_str
                        
                }
            self.client.execute("insert into "+self.acorr_configs_table_name+" values",[vars_to_save])
            return version+1
        
        def get_file_config(self,file_id,version):
            query_vars = { 'version':version}
            q = self.client.execute('select json_str from '+self.acorr_configs_table_name+" where UUIDNumToString(acorr_file_id) = '"+str(file_id)+"' and version= " + str(version) )
            if len(q) > 0:
                return q[0][0]
            return False
        
        def get_last_version_file_config(self,file_id):
            return int(self.client.execute('select max(version) from '+self.acorr_configs_table_name+" where UUIDNumToString(acorr_file_id) = '"+str(file_id)+"'")[0][0])

            
        def uuid_string_to_num(self,uuid_string):
            return self.client.execute("select UUIDStringToNum('"+uuid_string+"')")[0][0]
    
    
        def save_autocorr_traces(self,file_id,timestamps,axial,tangential,radial):
            df = pd.DataFrame()
            df['timestamps'] = np.array(timestamps).astype(int)
            df['microtime'] = 0
            df['axial'] = axial.tolist()
            df['tangential'] = tangential.tolist()
            df['radial'] = radial.tolist()
            df['acorr_file_id'] = self.uuid_string_to_num(file_id)
        
            
            
            
            n = self.max_batch_to_query
            list_df = [df[i:i+n] for i in range(0,df.shape[0],n)]
            for chunk in list_df:   
                self.client.execute('insert into '+self.acorr_traces_table_name+' values',chunk.values.tolist())

        def check_for_pre_saved_acorr_traces(self,timestamps,sensor_id):
            if len(timestamps) == 0 :
                return np.array([])
            files_ids = self.get_files_id_from_sensor_id(sensor_id)
            if len(files_ids) == 0 :
                return np.array([])

            

            timestamps = np.unique(timestamps).astype(int)
            duplicate = []
            splitted =  np.array_split(timestamps, int(len(timestamps)/self.max_batch_to_query)+1)
            
            
            for times_batch in splitted:
                duplicate += self.client.execute('select distinct(timestamp) from ' + self.acorr_traces_table_name + " where timestamp IN (%s) and UUIDNumToString(acorr_file_id) IN (%s) order by timestamp" % (','.join(times_batch.astype(str)),','.join(files_ids.astype(str))))
            return np.unique(np.array(duplicate).flatten())
        
        def get_files_id_from_sensor_id(self,sensor_id):
            query = "select distinct(UUIDNumToString(id)) from %s where sensor_id = '%s'" % (self.acorr_files_table_name,str(sensor_id))
            
            files_ids = self.client.execute(query)
            files_ids = np.array(files_ids).flatten().astype(str)
            files_ids = ["'" + x + "'" for x in files_ids]
            return np.array(files_ids)
        
        def get_autocor_traces_from_sensor_id(self,sensor_id,min_ts = 0, max_ts = 9999999999):
            files_ids = self.get_files_id_from_sensor_id(sensor_id)
            if len(files_ids) == 0 :
                return np.array([])
            
            query_str = "select timestamp,microtime,axial_trace,tangential_trace,radial_trace from %s where UUIDNumToString(acorr_file_id) IN (%s) and timestamp > %s and timestamp < %s order by timestamp" % (self.acorr_traces_table_name,','.join(files_ids.astype(str)),min_ts,max_ts)
            result = self.client.execute(query_str)
            df = self.query_result_to_pd(result,['timestamp','microtime','axial_trace','tangential_trace','radial_trace'])
            df = self.timestamp_microtime_to_float(df)
            df['sensor_id'] = sensor_id
            return df
        
        def timestamp_microtime_to_float(self,df):
            df = df.copy()
            df['timestamp'] = (df['timestamp'].astype(str) + "." + df['microtime'].astype(str)).astype(float)
            return df.drop(columns=['microtime'])
        
        def query_result_to_pd(self,result,columns):
            return pd.DataFrame(result,columns=columns)

            
#a = RhinoDBHelper().save_autocorr_traces("1",'1','f7d468bb-19a2-4a95-aaf3-9c98ed5c5bdd',np.arange(1,3601),np.full([3600,3600],0),np.full([3600,3600],0),np.full([3600,3600],0))
#a = RhinoDBHelper().get_autocor_traces_from_sensor_id('1',1,1000)
#rhino_db_helper = RhinoDBHelper()

#for i in range(0,100):
#    if rhino_db_helper.get_file_uuid_from_file_path(str(i)) is False:
#        a = rhino_db_helper.create_acorr_file(str(i),'aa')
        
#pdb.set_trace()