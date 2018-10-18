# -*- coding: utf-8 -*-
"""
Created on Wed Oct 10 12:27:45 2018

@author: kkappler

arcelor_mittal/mont_wright h5 are at: /data_blob/mont_wright/level_1/
granite_rock/A.R. Wilson Quarry/ are at ???
rio_tinto/west_angelas are at: /data_sdd/west_angelas/level_1/piezo/
centerra_gold/ are at /data_blob/mount_milligan/level_1/
teck/line_creek/ are at: RHINO /data_blob/line_creek/level_1/2018-09-10/piezo/2800hz/
SSX data_sdd (natal cp to data_blob) /data_blob/line_creek/level_1/2018-09-10/piezo/2800hz/

"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb
import string

SSX_METADATA_TABLE_COLUMNS = ['drill_id', 'slamstix_id', 'orientation',
                              'native_sampling_rate', 'start_time', 'end_time',
                              'sensor_distance_to_source', 'other']

def get_orientation_from_row(df_row):
    """
    """
    axial_axis = df_row['Axial Axis']
    tangential_axis = df_row['Tangential Axis']
    orientation = 'unknown'
    if axial_axis == 'X':
        if tangential_axis == 'Y':
                orientation = 'normal'
                return orientation
    if axial_axis == 'Y':
        if tangential_axis == 'X':
                orientation = 'rotate_90'
                return orientation
    print("axial = {}, tangential = {}".format(axial_axis, tangential_axis))
    return orientation

home = os.path.expanduser("~")
local_data_path = os.path.join(home, 'data', 'datacloud') #this will come from
#~/.local/share/datacloud/analysis.cfg
catalog_path = os.path.join(local_data_path, 'catalog')
original_catalog_csv_file_from_doug = os.path.join(catalog_path, 'rhino_catalog.csv')
original_catalog_df = pd.read_csv(original_catalog_csv_file_from_doug)
n_blasthole_observations = len(original_catalog_df)
print("{} total blasthole observations in rhino catalog".format(n_blasthole_observations))

df = original_catalog_df

company_list = list(set(np.asanyarray(df.Company)))
client_list = [x.replace(' ', '_') for x in company_list]
client_list = [string.lower(x) for x in client_list]
zippy = zip(company_list, client_list)
client_company_dict = dict((a, b) for a, b in zippy)
#company_client_dict = dict((b, a) for a, b in zippy)


#pdb.set_trace()
#<Do a bit of reformatting to make data uniform>
company_array = np.asanyarray(df.Company)
client_array = [client_company_dict[x] for x in company_array]
df['client_label'] = pd.Series(client_array, index=df.index)
#this can be our company list nomenclature.  Tt does not however provide a rule
#for new companies.  It also does not check the master list for multiple names of a company
#digitizer_series = df['Serial Number (if known)']
#digitizer_series = [int(x) for x in digitizer_series]
#pdb.set_trace()
df['digitizer_id'] = df['Serial Number (if known)']
#</Do a bit of reformatting to make data uniform>
#this can be our company list nomenclature.  Tt does not however provide a rule
#for new companies.  It also does not check the master list for multiple names of a company


#<types of Drills>
drill_type_list = set(df['Drill Type'])
print("the types of drills to date are: \n\n {} \n" .format(drill_type_list))

#Natal suggested that we stick with "Rotary" type for now;
#</types of Drills>

print("Iterating over client list:\n")
for i_client, client in enumerate(client_list):
    print("{}:\n".format(client))
    client_sub_df = df[df['client_label']==client]
    condition_1 = (client_sub_df['Drill Type'] == 'Diesel Rotary')
    condition_2 = (client_sub_df['Drill Type'] == 'Electric Rotary')
    #pdb.set_trace()
    client_rotary_sub_df = client_sub_df[condition_1 | condition_2]
    if len(client_rotary_sub_df) == 0:
        print("No rotary drills observed for {}\n\n".format(client))
        continue
    #drill_types = set(client_sub_df['Drill Type'])
    #print("skipping mine query for now as we have a 1:1 map by default")
    #print("Adding support for multiple mines per client will be a celebration")
    drills = list(set(client_sub_df['Drill ID']))
    master_job_data_frame = pd.DataFrame(columns=SSX_METADATA_TABLE_COLUMNS)
    for drill in drills:
        drill_client_sub_df = client_rotary_sub_df[client_sub_df['Drill ID']==drill]
        #at this level we have a lot of files still ... there are non-unique filenames
        file_list = set(drill_client_sub_df.Filename)
        print("detected {} files from {}, drill {}".format(len(file_list), client, drill))
        print(file_list)
        pdb.set_trace()

        #<INSERT BLOCK OF CODE HERE TO ADD ONE ROW PER DEPLOYED SSX>
        #<N.B. Because ssx filename is non-unique, we requre both date and
        #serial number info to get this to be guaranteed one-row-per-deployment
        #and it ain't pretty ...
        for i_row in range(len(drill_client_sub_df)):
            df_row = drill_client_sub_df.iloc[i_row]
            orientation = get_orientation_from_row(df_row)
            native_sampling_rate = df_row['Piezo Sampling Rate (Hz)']
            row_dict = {'drill_id':drill, 'slamstix_id':df_row.digitizer_id,
                        'orientation':get_orientation_from_row(),
                        'native_sampling_rate':native_sampling_rate, }
#        pdb.set_trace()
        pass
        #<INSERT BLOCK OF CODE HERE TO ADD ONE ROW PER DEPLOYED SSX>


    #pdb.set_trace()
print(original_catalog_df.columns)
pass

def my_function():
    """
    """
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
