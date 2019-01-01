from clickhouse_driver import Client
import pandas as pd
import numpy as np
import ast
import uuid
import pdb
import time
import os

class RhinoDBHelper:
    def __init__(self,host='localhost',user='default',password='',database='test',compression='lz4'):
        self.client = Client(host,user=user,password=password,database=database,compression=compression)
        self.raw_data_files_table_name = 'raw_data_files'
        self.raw_data_table_name = 'raw_data'
        self.hole_runs_table_name = 'hole_runs'
        
    def save_processed_data(self,hole_run_uuid,processed_data_df):
        mapping = self.get_processed_data_mapping(processed_data_df)
        renamed = processed_data_df.rename(index=str,columns=mapping)
        renamed['ts'] = renamed.index.values.astype(int)
        renamed['hole_run_uuid'] = self.uuid_string_to_num(hole_run_uuid)        
        ts_on_db = self.get_ts_processed_data_of_hole_run(hole_run_uuid,renamed['ts'].max(),renamed['ts'].min())
        renamed_filtered = renamed[~renamed.ts.isin(ts_on_db)]
        query = 'Insert into processed_data ('+','.join(renamed_filtered.columns)+') values '
        self.client.execute( query,renamed_filtered.values.tolist())
        
    def get_ts_processed_data_of_hole_run(self,hole_run_uuid,max_ts,min_ts):
        to_return = self.client.execute("select distinct(ts) from processed_data where UUIDStringToNum('"+hole_run_uuid+"') == hole_run_uuid and ts >= "+str(min_ts)+ " and ts <= "+str(max_ts)+ " order by ts")
        #pdb.set_trace()
        if len(to_return) == 0:
            return np.array(to_return)
        return np.array(to_return).astype(int).T[0]
        
        
    def get_processed_data_mapping(self,processed_data_df):
        float64_col_counter = 0
        float64_array_col_counter = 0
        boolean_col_counter = 0
        cols = processed_data_df.columns
        mapping=dict()
        for col in cols:
            db_col_name = ""
            type_col = type(processed_data_df[col].values[0])
            if type_col == np.float64 or type_col == np.int64 or type_col == float:
                float64_col_counter += 1
                db_col_name = "float_prop_"+str(float64_col_counter)
            elif type_col == np.ndarray:
                float64_array_col_counter += 1
                db_col_name = "floatarray_prop_"+str(float64_array_col_counter)
            elif type_col == np.bool_ or type_col == type(bool) or str(type_col) == "<type 'bool'>":
                boolean_col_counter += 1
                db_col_name = "boolean_prop_"+str(boolean_col_counter)
            else:
                pdb.set_trace()
                
            mapping[col] = db_col_name
        return mapping
    

    def get_grouped_ts_raw_data(self,config_uuid_str,ts_min,ts_max,ts_to_ignore=np.array([]),limit=None):
        to_return = self.get_raw_data(config_uuid_str,ts_min,ts_max,limit=limit).groupby(['ts'])
        return to_return

    def get_raw_data(self,config_uuid_str,ts_min,ts_max,ts_to_ignore=np.array([]),limit=None):
        ts_array = np.arange(ts_min,ts_max)
        if len(ts_to_ignore) != 0:
            ts_array = ts_array[~np.isin(ts_array,ts_to_ignore)]
            query = "SELECT ts,microtime,x,y,z FROM "+self.raw_data_table_name+" WHERE (UUIDStringToNum('"+config_uuid_str+"') = raw_data_file_uuid) AND (ts in (%s))" %  ','.join(ts_array.astype(str))
        else:
            ts_min = ts_array.min()
            ts_max = ts_array.max()
            query = "SELECT ts,microtime,x,y,z FROM "+self.raw_data_table_name+" WHERE (UUIDStringToNum('"+config_uuid_str+"') = raw_data_file_uuid) AND (ts >= "+str(ts_min)+") and (ts <= "+str(ts_max)+")"
        cols = ['ts','microtime','x','y','z']
        if limit != None:
            query += " limit " +str(limit)
        #pdb.set_trace()
        to_return = self.query_result_to_pd(query,cols)
        return to_return
        
    def get_config_json_from_raw_file_uuid(self,uuid_str):
        query = "select global_config_json from "+self.raw_data_files_table_name+" where UUIDStringToNum('"+uuid_str+"') = uuid"
        settings = {'strings_as_bytes': False}
        result = self.client.execute(query,settings=settings)
        return ast.literal_eval(result[0][0])
    
    def get_hole_run_uuid(self,bench,pattern,hole_name,hole_id,rig_id,sensor_id,global_config_json_str,raw_file_uuid_str,processed_data_map_json):
        query_vars = {
                      'bench':bench,
                      'pattern':pattern,
                      'hole_name':hole_name,
                      'hole_id':hole_id,
                      'rig_id':rig_id,
                      'sensor_id':sensor_id,
                      'global_config_json_str':global_config_json_str,
                      'raw_file_uuid_str':raw_file_uuid_str,
                      'processed_data_map_json':processed_data_map_json
                      }
        print query_vars
        answer = self.client.execute('select UUIDNumToString(uuid) from '+self.hole_runs_table_name+' where sensor_id=%(sensor_id)s and rig_id=%(rig_id)s and hole_id=%(hole_id)s and hole_name=%(hole_name)s and pattern=%(pattern)s and bench=%(bench)s and global_config_json=%(global_config_json_str)s and UUIDNumToString(raw_data_file_uuid)=%(raw_file_uuid_str)s and processed_data_map_json=%(processed_data_map_json)s',query_vars)
        if len(answer)>0:
            print "Found previous hole_runs in db"
            return answer[0][0]
        else:
            print "Created new hole_runs row in db"
            return self.save_hole_run(global_config_json_str,raw_file_uuid_str,bench,pattern,hole_name,hole_id,rig_id,sensor_id,processed_data_map_json)
        
    def save_hole_run(self,global_config_json_str,raw_file_uuid_str,bench,pattern,hole_name,hole_id,rig_id,sensor_id,processed_data_map_json):
        uuid_hole_run = str(uuid.uuid4())
        hole_run_vars = {
                        'uuid':self.uuid_string_to_num(uuid_hole_run),
                        'created_at_ts':int(time.time()),
                        'raw_data_file_uuid':self.uuid_string_to_num(raw_file_uuid_str),
                        'global_config_json':global_config_json_str,
                        'bench':bench,
                        'pattern':pattern,
                        'hole_name':hole_name,
                        'hole_id':hole_id,
                        'rig_id':rig_id,
                        'sensor_id':sensor_id,
                        'processed_data_map_json':processed_data_map_json
                }
        self.client.execute("insert into "+self.hole_runs_table_name+" values",[hole_run_vars])
        return uuid_hole_run
        
    def get_uuid_raw_data_file(self,config_json,file_path,rig_id,sensor_id,min_ts,max_ts):
        h5_filename = os.path.basename(file_path).replace('.h5','')
        answer = self.client.execute('select UUIDNumToString(uuid) from '+self.raw_data_files_table_name+' where global_config_json=%(jsonStr)s and h5_filename=%(h5filename)s',{'jsonStr':config_json, 'h5filename':h5_filename})
        if len(answer)>0:
            print "Found previous config in db"
            return answer[0][0]
        else:
            print "Created new config row in db"
            return self.save_config(config_json,h5_filename,rig_id,sensor_id,min_ts,max_ts)
        
    def save_config(self,config_json,filename_without_extension,rig_id,sensor_id,min_ts,max_ts):
        uuid_config = str(uuid.uuid4())
        uuid_bin = self.uuid_string_to_num(uuid_config)
        self.client.execute('insert into '+self.raw_data_files_table_name+' values',[[uuid_bin,filename_without_extension,min_ts,max_ts,sensor_id,rig_id,config_json]])
        return uuid_config
    
    def uuid_string_to_num(self,uuid_string):
        return self.client.execute("select UUIDStringToNum('"+uuid_string+"')")[0][0]
    
    def have_ts_config_uuid(self,ts_array,config_uuid):
        ts_on_db = np.array(self.client.execute('select distinct(ts) from '+self.raw_data_table_name+' where raw_data_file_uuid=UUIDStringToNum(%(config_uuid)s) and ts>=%(ts_min)i and ts<=%(ts_max)i',{'config_uuid':config_uuid,'ts_min':ts_array.min(),'ts_max':ts_array.max()} )).T
        if len(ts_on_db) == 0:
            return []
        else:
            have_on_db = np.intersect1d(ts_array,ts_on_db[0])
            return have_on_db
    
    def get_configs(self):
        query = 'select UUIDNumToString(uuid) as uuid, min_ts, max_ts, rig_id,sensor_id from ' +self.raw_data_files_table_name
        cols = ['uuid','min_ts','max_ts','rig_id','sensor_id']
        return self.query_result_to_pd(query,cols)

    
    def query_result_to_pd(self,query,columns):
        result = self.client.execute(query)
        return pd.DataFrame(result,columns=columns)
