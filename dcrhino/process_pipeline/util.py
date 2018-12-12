# -*- coding: utf-8 -*-
"""
Created on Wed Dec 12 09:11:07 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
import numpy as np
#import os
import pdb

def drop_empty_columns_from_dataframe(df):
    """
    """
    ## REMOVE EMPTY columns
    for col in df.columns:
        arr = df[col].values
        if str(arr.dtype) != 'object':
            if np.isnan(arr).all():
                df.drop(columns=[col], inplace=True)
    return df


def main():
    """
    """
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
