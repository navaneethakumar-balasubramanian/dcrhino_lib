#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Jan 14 20:56:19 2019

Author: thiago
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
        """
        Facilitates connection to DB for retrieval of mine data.
        
        **Requires:**
        
            + clickhouse-driver with lz4 compression option
            + credentials for accessing the database
        """
        def __init__(self,host='localhost',user='default',password='',database='test',compression='lz4',conn=False):
            
            if conn is False:
                logger.info('Using database '+str(database)+' on '+str(host))
                self.client = Client(host,user=user,password=password,database=database,compression=compression)
            else:
                logger.info('Using database '+str(conn['database'])+' on '+str(conn['host']))
                self.client = Client(conn['host'],user=conn['user'],password=conn['password'],database=conn['database'],compression=compression)
            self.acorr_traces_table_name = 'acorr_traces'
            self.acorr_files_table_name = 'acorr_files'
            self.acorr_configs_table_name = 'acorr_files_configs'
            self.processed_holes_table_name = 'processed_holes'
            self.raw_data_files_table_name = 'raw_data_files'
            self.max_batch_to_query = 5000



        def read_processed_traces(self):
            q = self.client.execute('select * from ' + self.processed_holes_table_name, with_column_types=True)
            return self.query_results_with_columns_to_pd(q)

        def get_processed_holes(self):
            q = self.client.execute('select * from ' + self.processed_holes_table_name, with_column_types=True)
            return self.query_results_with_columns_to_pd(q)

        def save_processed_trace(self,trace,process_flow_id,process_flow_json,processed_output_path,processed_at,seconds_processed):
            process_uuid= self.get_next_process_id()

            vars_to_save = {
                'process_uuid': process_uuid,
                'processed_at_ts': processed_at,
                'seconds_processed': seconds_processed,
                'hole_id': trace.hole_id,
                'bench_name': trace.bench_name,
                'pattern_name': trace.pattern_name,
                'hole_name': trace.hole_name,
                'rig_id': trace.rig_id,
                'sensor_id': trace.sensor_id,
                'digitizer_id': trace.digitizer_id,
                'sensor_accelerometer_type': str(trace.sensor_accelerometer_type),
                'sensor_saturation_g':str(trace.sensor_saturation_g),
                'processed_data_mapping': str(''),
                'flow_id': str(process_flow_id),
                'flow_json': str(process_flow_json),
                'output_folder_name': str(processed_output_path)
            }
            #print vars_to_save
            logger.info(
                'Saving to ' + str(self.processed_holes_table_name) + ' with id:' + str(process_uuid))
            self.client.execute("insert into " + self.processed_holes_table_name + " values", [vars_to_save])
            return

        def get_file_id_from_file_path(self,file_path):
            """
            Retrieves file id from path using clichouse driver execute function, 
            executes the query to the database. `"Execute" documentaton found here.
            <https://clickhouse-driver.readthedocs.io/en/latest/api.html#client>`_
            
            Parameters:
                file_path (str): find file id from the path provided
                
            Returns:
                Client-selected id from a table of possible files
            """
            query_vars={
                        'file_path':file_path
                        }
            q = self.client.execute('select id from '+self.acorr_files_table_name+' where file_path=%(file_path)s',query_vars)
            if len(q) == 0:
                return False
            return q[0][0]

        def get_next_file_id(self):
            return self.client.execute("SELECT max(id) + 1 FROM "+ self.acorr_files_table_name )[0][0]

        def get_next_process_id(self):
            return self.client.execute("SELECT max(process_uuid) + 1 FROM "+ self.processed_holes_table_name )[0][0]

        def get_next_raw_file_id(self):
            return self.client.execute("SELECT max(raw_file_id) + 1 FROM "+ self.raw_data_files_table_name )[0][0]

        def create_acorr_file(self,file_path,rig_id,sensor_id,digitizer_id,min_ts,max_ts):
            """
            Creates acorr file and inserts mine info, using execute and clickhouse.
            `"Execute" documentaton found here. <https://clickhouse-driver.readthedocs.io/en/latest/api.html#client>`_
            
            Parameters:
                file_path (str): where the file should go
                rig_id (str): rig identifier
                sensor_id (str): sensor that took the data identifier
                digitizer_id (str): digitizer that recorded data id
                min_ts: minimum time value (will be converted to int)
                max_ts: maximum time value (will be converted to int)
                    
            Returns:
                (str): file_id with saved variables
                
            .. todo:: figure out what min/max ts is
            
            """
            
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
            """
            Create new file configuration string, insert into acorr file variable,
            'vars_to_save' using clickhouse (client) `excecute. <https://clickhouse-driver.readthedocs.io/en/latest/api.html#client>`_
            
            Parameters:
                file_id (str): file to configure
                config_str (str): configuration options
                
            Returns:
                file confguration string after having been updated
            """
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
            """
            Ask for file configuration if present
            """
            query_vars = { 'version':version}
            q = self.client.execute('select json_str from '+self.acorr_configs_table_name+" where acorr_file_id = "+str(file_id)+" and version= " + str(version) )
            if len(q) > 0:
                return q[0][0]
            return False
        
        def get_last_file_config_from_file_id(self,file_id):
            """
            Ask for file configuration from the file before this
            """
            version = self.get_last_version_file_config(file_id)
            return self.get_file_config(file_id,version)

        def get_last_version_file_config(self,file_id):
            """
            Ask for file configuration before this file
            """
            return int(self.client.execute('select max(version) from '+self.acorr_configs_table_name+" where acorr_file_id = "+str(file_id))[0][0])


        def uuid_string_to_num(self,uuid_string):
            return self.client.execute("select UUIDStringToNum('"+uuid_string+"')")[0][0]


        def save_autocorr_traces(self,file_id,timestamps,axial,tangential,radial,max_axial_acceleration,min_axial_acceleration,max_tangential_acceleration,min_tangential_acceleration,max_radial_acceleration,min_radial_acceleration,rssi,temp,batt,packets):
            """
            Insert data into *acorr_traces_table_name* for each chunk.
            
            Parameters:
                file_id (str): where to save
                timestamps: to be saved
                axial: axial wave readings
                tangential: tangential wave readings
                radial: radial wave readings
            """
            df = pd.DataFrame()
            df['timestamps'] = np.array(timestamps).astype(int)
            df['microtime'] = 0
            df["rssi"]=rssi.tolist()
            df["batt"]=batt.tolist()
            df["temp"]=temp.tolist()
            df["packets"]=packets.tolist()
            df['axial'] = axial.tolist()
            df['tangential'] = tangential.tolist()
            df['radial'] = radial.tolist()
            df['max_axial_acceleration'] = max_axial_acceleration.tolist()
            df['min_axial_acceleration'] = min_axial_acceleration.tolist()
            df['max_tangential_acceleration'] = max_tangential_acceleration.tolist()
            df['min_tangential_acceleration'] = min_tangential_acceleration.tolist()
            df['max_radial_acceleration'] = max_radial_acceleration.tolist()
            df['min_radial_acceleration'] = min_radial_acceleration.tolist()
            df['acorr_file_id'] = file_id
            #pdb.set_trace()

            n = self.max_batch_to_query
            list_df = [df[i:i+n] for i in range(0,df.shape[0],n)]
            for chunk in list_df:
                try:
                    self.client.execute('insert into '+self.acorr_traces_table_name+' values',chunk.values.tolist())
                except:
                    chunk.drop (labels=["rssi", "batt", "temp", "packets"], axis=1, inplace=True)
                    self.client.execute('insert into ' + self.acorr_traces_table_name + ' values',
                                        chunk.values.tolist())

        def check_for_pre_saved_acorr_traces(self,timestamps,sensor_id):
            """
            Check the directory for saved acorr traces and prevent duplicates
            """
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
            """
            Get files containing data from a certain sensor id.
            
            Parameters:
                sensor_id (str): identifier for the sensor
                
            Returns:
                (array): Array of file_id's (str)
            """
            query = "select distinct(id) from %s where sensor_id = '%s'" % (self.acorr_files_table_name,str(sensor_id))

            files_ids = self.client.execute(query)
            files_ids = np.array(files_ids).flatten().astype(int)
            return files_ids

        def get_files_list(self):
            """
            Get all files containing query string of metadata, and return them in a DataFrame
            """
            query_str = "select id,file_path,rig_id,sensor_id,digitizer_id,min_ts,max_ts from %s order by id" % (self.acorr_files_table_name)
            result = self.client.execute(query_str)
            df = self.query_result_to_pd(result,columns=['id','file_path','rig_id','sensor_id','digitizer_id','min_ts','max_ts'])

            return df


        def get_autocor_traces_from_sensor_id(self, sensor_id, min_ts=0, max_ts=9999999999):
            """
            Get traces, instead of files, from sensor id.
            
            Parameters:
                sensor_id (str): indentifier for the sensor
                
            Other Parameters:
                min_ts: 0, want to keep our search broad
                max_ts: 999999999999999, want to keep our search broad
                
            Returns:
                (DataFrame): All traces from a specific sensor
            """

            files_ids = self.get_files_id_from_sensor_id(sensor_id)
            df = self.get_autocor_traces_from_files_ids(files_ids, min_ts, max_ts)
            df['sensor_id'] = sensor_id
            return df

        def get_autocor_traces_from_files_ids(self, files_ids, min_ts=0, max_ts=9999999999):
            """
            Parameters:
                files_ids (str): files to take autocor traces from
                
            Other Parameters:
                min_ts: 0, want to keep our search broad
                max_ts: 999999999999999, want to keep our search broad
                all_columns (list): for example: ['timestamp','microtime,
                            'axial_trace', 'tangential_trace', 'radial_trace']
                result (list): One element per row of the database matching query
                
            Returns:
                (Dataframe): autocor traces from specified file ids
            
            .. todo:: 20190122; modified assignment of df columns which contain
                tupples so that 2d arrays can be accessed by calling
                my_2darray = np.atleast_2d(list(df[column_label])) where column label
                is for example 'axial_trace'
            
            .. todo:: add functionality so that we can ask for any subset of components
                not forcing user to get all components.
                
            """
            
            if type(files_ids) == int:
              files_ids = np.array([files_ids])
            if len(files_ids) == 0:
               return np.array([])
           
            time_columns = ['timestamp', 'microtime','acorr_file_id','max_axial_acceleration','min_axial_acceleration','max_tangential_acceleration','min_tangential_acceleration','max_radial_acceleration','min_radial_acceleration']
            trace_components_to_fetch = ['axial', 'tangential', 'radial']
            trace_labels_for_db_call = ['{}_trace'.format(x) for x in trace_components_to_fetch]
            all_columns = time_columns + trace_labels_for_db_call
            all_columns_requested_string = ','.join(all_columns)

            query_str = "select {} from %s where acorr_file_id IN (%s) and timestamp > %s and timestamp < %s order by timestamp".format(all_columns_requested_string) \
            % (self.acorr_traces_table_name, ','.join(files_ids.astype(str)), min_ts, max_ts)
            #print(query_str)
            result = self.client.execute(query_str)
            df = self.query_result_to_pd(result, all_columns)
            #<fix array casts>
            n_rows = len(df)
            if n_rows > 0:
                n_observations = len(df[trace_labels_for_db_call[0]][0])#length of a single trace
                for column_label in trace_labels_for_db_call:
                    data_array = np.full((n_rows, n_observations), np.nan)
                    for i in range(n_rows):
                        data_array[i,:] = df[column_label][i]
                    list_array = list(data_array)
                    df[column_label] = list_array
                #</fix array casts>
                df = self.timestamp_microtime_to_float(df)
                df['acorr_file_id'] = df['acorr_file_id'].astype("category")
            else:
                logger.error("NO DATA FOR THIS HOLE FROM " + str(min_ts) + " to " + str(max_ts))
            return df
        
        
        def timestamp_microtime_to_float(self,df):
            """
            Copy dataframe, move timestamp to float, kill "microtime"
            
            Parameters:
                df (DataFrame): with timestamp needing conversion
            
            Returns:
                (DataFrame): df with timestamp as float and microtime deleted
            """
            df = df.copy()
            df['timestamp'] = (df['timestamp'].astype(str) + "." + df['microtime'].astype(str)).astype(float)
            df.drop(['microtime', ], axis=1, inplace=True)
            return df

        def query_result_to_pd(self,result,columns):
            """
            Convert your query result to a pandas DataFrame
            
            Parameters:
                result: data values
                columns: data keys
                
            Returns:
                (DataFrame): *result* in the form of a dataframe
            """
            return pd.DataFrame(result,columns=columns)

        def query_results_with_columns_to_pd(self,query):
            data = query[0]
            query_info_columns = np.asarray(query[1])
            columns = list(query_info_columns.T[0].astype(str))
            types = list(query_info_columns.T[1].astype(str))
            return self.query_result_to_pd(data,columns)

#a = RhinoDBHelper().save_autocorr_traces("1",'1','f7d468bb-19a2-4a95-aaf3-9c98ed5c5bdd',np.arange(1,3601),np.full([3600,3600],0),np.full([3600,3600],0),np.full([3600,3600],0))
#a = RhinoDBHelper().get_autocor_traces_from_sensor_id('1',1,1000)
#rhino_db_helper = RhinoDBHelper()

#for i in range(0,100):
#    if rhino_db_helper.get_file_uuid_from_file_path(str(i)) is False:
#        a = rhino_db_helper.create_acorr_file(sttrr(i),'aa')
        
#pdb.set_trace()
