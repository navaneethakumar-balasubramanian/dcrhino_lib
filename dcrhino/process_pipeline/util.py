# -*- coding: utf-8 -*-
"""
Created on Wed Dec 12 09:11:07 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function

import argparse
import datetime
#import matplotlib.pyplot as plt
import numpy as np
#import os
import pandas as pd
import pdb

def str2bool(v):
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError('Boolean value expected.')
#df = pd.read_csv('/tmp/df_tmp.csv')
#def drop_empty_columns_from_dataframe(df):
#    """
#    """
#    ## REMOVE EMPTY columns
#    for column_label in df.columns:
#        print(column_label)
#        arr = np.asarray(df[column_label].values)
#        if str(arr.dtype) != 'object':
#            if np.isnan(arr).all():
#                df.drop([column_label,], axis=1, inplace=True)
#    return df


def main():
    """
    """
    dff = pd.read_csv('/tmp/df_tmp.csv')
    pdb.set_trace()
    df2 = drop_empty_columns_from_dataframe(dff)
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
