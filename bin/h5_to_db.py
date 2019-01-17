import pandas as pd
import pdb
from dcrhino.analysis.unstable.tests_and_examples.test_can_read_rawh5_and_apply_acorr_v2 import cast_h5_to_dataframe,resample_l1h5,autocorrelate_l1h5
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
import numpy as np
import logging

logging.basicConfig(filename='h5_to_db.log', level=logging.INFO)


#h5_catalog_file = 'global_master_iterator.csv'
h5_catalog_file = '/home/thiago/example_for_muthu/iterator.csv'
h5_catalog = pd.read_csv(h5_catalog_file)
#h5_catalog = h5_catalog[h5_catalog['mine_name'] == 'MOUNT_MILLIGAN_MINE']
#pdb.set_trace()
h5_list = h5_catalog.file_path
for h5_filename in h5_list:
    l1h5_dataframe, global_config = cast_h5_to_dataframe(h5_filename)
    dbhelper = RhinoDBHelper(database='test')    
    dupes = dbhelper.check_for_pre_saved_acorr_traces(l1h5_dataframe['timestamp'],global_config.sensor_serial_number)    
    l1h5_dataframe = l1h5_dataframe[~l1h5_dataframe['timestamp'].isin(dupes)]
    config_id = dbhelper.get_autocorr_config_id(str(vars(global_config)))
    file_id = dbhelper.get_file_id_from_file_path(h5_filename)
    resampled_dataframe = resample_l1h5(l1h5_dataframe, global_config)
    autcorrelated_dataframe = autocorrelate_l1h5(resampled_dataframe, global_config)
    dbhelper.save_autocorr_traces(global_config.rig_id,global_config.sensor_serial_number,str(global_config.digitizer_serial_number),config_id,file_id,autcorrelated_dataframe['timestamp'],autcorrelated_dataframe['axial'],autcorrelated_dataframe['radial'],autcorrelated_dataframe['tangential'])
