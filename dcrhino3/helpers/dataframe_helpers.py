# -*- coding: utf-8 -*-
"""
Created on Tue Sep 10 11:34:15 2019

@author: kkappler

Catchall for methods that are dataframe specific that do not really belong in
general_helper_functions (which is more for string methods, pathing, etc)

"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
import numpy as np
#import os
#import pdb


#logger = logging.get_logger(__name__)

def df_component_as_array(component_id,dataframe):
    """
    Returns the data form component as a 2d numpy array with trace index
    running along rows (zero-index).  Useful for slicing data and linalg.

    Parameters:
        component_id (str): axial/tangential/radial

    Return:
        (array): extracted trace, selected by component_id
    """
    column_name = '{}_trace'.format(component_id)
    data_array = np.atleast_2d(list(dataframe[column_name]))
    return data_array


def split_data_frame_into_smaller(df, chunk_size = 10000):
    """
    Slices up DataFrame into small "chunks"

    Parameters:
        df (DataFrame): to be sliced up
        chunk_size (positive integer): max index length of each slice

    Returns:
        (list): list of DataFrames (1 DataFrame = 1 slice)
    """
    #list_of_df = list()
    number_of_chunks = len(df) // chunk_size + 1
    list_of_df = number_of_chunks * [None]
    for i in range(number_of_chunks):
        df_to_add_to_list = df[i*chunk_size:(i+1) * chunk_size]
        df_to_add_to_list = df_to_add_to_list.reset_index()
        #pdb.set_trace()
        #df_to_add_to_list = df_to_add_to_list.copy()
        list_of_df[i] = df_to_add_to_list
    return list_of_df



#def split_df_to_simple_and_array(df):
#    """
#    this can be made a method of TraceData or can go in util.py
#    """
#
#    array_df = df.copy()
#    array_columns = []
#    non_array_columns = []
#    for col in df.columns:
#        sample_element = df[col].iloc[0]
#        #print(col, type(sample_element))
#        if isinstance(sample_element, np.ndarray):
#            array_columns.append(col)
#        else:
#            non_array_columns.append(col)
#    array_df.drop(non_array_columns, axis=1, inplace=True)
#    df.drop(array_columns, axis=1, inplace=True)
#    return df, array_df

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
