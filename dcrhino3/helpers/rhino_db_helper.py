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

from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)

class RhinoDBHelper:
        def __init__(self,host='localhost',user='default',password='',database='test',compression='lz4',conn=False):
            logger.info('Using database '+str(database)+' on '+str(host))
            if conn is False:
                self.client = Client(host,user=user,password=password,database=database,compression=compression)
            else:
                self.client = Client(conn['host'],user=conn['user'],password=conn['password'],database=conn['database'],compression=compression)
            self.acorr_traces_table_name = 'acorr_traces'
            self.acorr_files_table_name = 'acorr_files'
            self.acorr_configs_table_name = 'acorr_files_configs'
            self.max_batch_to_query = 5000

        def get_file_id_from_file_path(self,file_path):
            query_vars={
                        'file_path':file_path
                        }
            q = self.client.execute('select id from '+self.acorr_files_table_name+' where file_path=%(file_path)s',query_vars)
            if len(q) == 0:
                return False
            return q[0][0]

        def get_next_file_id(self):
            return self.client.execute("SELECT max(id) + 1 FROM "+ self.acorr_files_table_name )[0][0]

        def create_acorr_file(self,file_path,rig_id,sensor_id,digitizer_id,min_ts,max_ts):
            file_id = self.get_next_file_id()
            vars_to_save = {
                        'id':file_id,
                        'file_path' : file_path,
                        'rig_id':rig_id,
                        'sensor_id':sensor_id,
                        'digitizer_id':digitizer_id,
                        'min_ts':int(min_ts),
                        'max_ts':int(max_ts)
            }
            logger.info('Saving '+str(file_path)+' to'+str(self.acorr_files_table_name)+ ' with id:' + str(file_id))
            self.client.execute("insert into "+ self.acorr_files_table_name +" values",[vars_to_save])
            return file_id

        def create_new_acorr_file_conf(self,file_id,config_str):
            version = self.get_last_version_file_config(file_id)
            last_version_config = self.get_file_config(file_id,version)
            if last_version_config == config_str:
                return version
            vars_to_save = {
                        'acorr_file_id':file_id,
                        'version':version+1,
                        'created_at_ts':int(time.time()),
                        'json_str':config_str

                }
            self.client.execute("insert into "+self.acorr_configs_table_name+" values",[vars_to_save])
            return version+1

        def get_file_config(self,file_id,version):
            query_vars = { 'version':version}
            q = self.client.execute('select json_str from '+self.acorr_configs_table_name+" where acorr_file_id = "+str(file_id)+" and version= " + str(version) )
            if len(q) > 0:
                return q[0][0]
            return False
        
        def get_last_file_config_from_file_id(self,file_id):
            version = self.get_last_version_file_config(file_id)
            return self.get_file_config(file_id,version)

        def get_last_version_file_config(self,file_id):
            return int(self.client.execute('select max(version) from '+self.acorr_configs_table_name+" where acorr_file_id = "+str(file_id))[0][0])


        def uuid_string_to_num(self,uuid_string):
            return self.client.execute("select UUIDStringToNum('"+uuid_string+"')")[0][0]


        def save_autocorr_traces(self,file_id,timestamps,axial,tangential,radial):
            df = pd.DataFrame()
            df['timestamps'] = np.array(timestamps).astype(int)
            df['microtime'] = 0
            df['axial'] = axial.tolist()
            df['tangential'] = tangential.tolist()
            df['radial'] = radial.tolist()
            df['acorr_file_id'] = file_id

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
                duplicate += self.client.execute('select distinct(timestamp) from ' + self.acorr_traces_table_name + " where timestamp IN (%s) and acorr_file_id IN (%s) order by timestamp" % (','.join(times_batch.astype(str)),','.join(files_ids.astype(str))))
            return np.unique(np.array(duplicate).flatten())
            
        def get_files_id_from_sensor_id(self,sensor_id):
            query = "select distinct(id) from %s where sensor_id = '%s'" % (self.acorr_files_table_name,str(sensor_id))

            files_ids = self.client.execute(query)
            files_ids = np.array(files_ids).flatten().astype(int)
            return files_ids

        def get_files_list(self):
            query_str = "select id,file_path,rig_id,sensor_id,digitizer_id,min_ts,max_ts from %s order by id" % (self.acorr_files_table_name)
            result = self.client.execute(query_str)
            df = self.query_result_to_pd(result,columns=['id','file_path','rig_id','sensor_id','digitizer_id','min_ts','max_ts'])

            return df


        def get_autocor_traces_from_sensor_id(self, sensor_id, min_ts=0, max_ts=9999999999):
            """
            """
            files_ids = self.get_files_id_from_sensor_id(sensor_id)
            df = self.get_autocor_traces_from_files_ids(files_ids, min_ts, max_ts)
            df['sensor_id'] = sensor_id
            return df

        def get_autocor_traces_from_files_ids(self, files_ids, min_ts=0, max_ts=9999999999):
            """
            @TODO: add functionality so that we can ask for any subset of components
            not forcing user to get all components
            @var result: type is list, with one element per row of the database matching query;

            @var all_columns: list, for example: ['timestamp','microtime',
            'axial_trace', 'tangential_trace', 'radial_trace']
            @note: 20190122; modified assignment of df columns which contain
            tupples so that 2d arrays can be accessed by calling
            my_2darray = np.atleast_2d(list(df[column_label])) where column label
            is for example 'axial_trace'
            """
            
            if type(files_ids) == int:
              files_ids = np.array([files_ids])
            if len(files_ids) == 0:
               return np.array([])
           
            time_columns = ['timestamp', 'microtime','acorr_file_id']
            trace_components_to_fetch = ['axial', 'tangential', 'radial']
            trace_labels_for_db_call = ['{}_trace'.format(x) for x in trace_components_to_fetch]
            all_columns = time_columns + trace_labels_for_db_call
            all_columns_requested_string = ','.join(all_columns)

            query_str = "select {} from %s where acorr_file_id IN (%s) and timestamp > %s and timestamp < %s order by timestamp".format(all_columns_requested_string) \
            % (self.acorr_traces_table_name, ','.join(files_ids.astype(str)), min_ts, max_ts)
            print(query_str)
            result = self.client.execute(query_str)
            df = self.query_result_to_pd(result, all_columns)
            #<fix array casts>
            n_rows = len(df)
            n_observations = len(df[trace_labels_for_db_call[0]][0])#length of a single trace
            for column_label in trace_labels_for_db_call:
                data_array = np.full((n_rows, n_observations), np.nan)
                for i in range(n_rows):
                    data_array[i,:] = df[column_label][i]
                list_array = list(data_array)
                df[column_label] = list_array
            #</fix array casts>
            df = self.timestamp_microtime_to_float(df)
            return df
        
        
        def timestamp_microtime_to_float(self,df):
            df = df.copy()
            df['timestamp'] = (df['timestamp'].astype(str) + "." + df['microtime'].astype(str)).astype(float)
            df.drop(['microtime', ], axis=1, inplace=True)
            return df

        def query_result_to_pd(self,result,columns):
            return pd.DataFrame(result,columns=columns)


#a = RhinoDBHelper().save_autocorr_traces("1",'1','f7d468bb-19a2-4a95-aaf3-9c98ed5c5bdd',np.arange(1,3601),np.full([3600,3600],0),np.full([3600,3600],0),np.full([3600,3600],0))
#a = RhinoDBHelper().get_autocor_traces_from_sensor_id('1',1,1000)
#rhino_db_helper = RhinoDBHelper()

#for i in range(0,100):
#    if rhino_db_helper.get_file_uuid_from_file_path(str(i)) is False:
#        a = rhino_db_helper.create_acorr_file(sttrr(i),'aa')
        
#pdb.set_trace()
