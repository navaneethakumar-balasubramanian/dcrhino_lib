# -*- coding: utf-8 -*-
"""
Created on Mon Jul 30 17:09:26 2018

@author: kkappler
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import pdb

import qfutils.log as logging
import qf.measurand.measurand_registry as MEASURAND_REGISTRY

from qf.unstable.karl.util.supporting_station import PyStation as get_station

logger = logging.get_logger(__name__)
HOME = os.path.expanduser("~/")

from plot_west_angelas_unbinned_qc_logs_v2_20180723 import warts_and_all_csv_file
pdb.set_trace()
input_csv_fullname = warts_and_all_csv_file
output_csv_fullname = input_csv_fullname.replace('.csv','_positive_rop.csv')
df = pd.read_csv(input_csv_fullname)
print('orig len', len(df))
hole_uid_list = list(set(df.hole_uid))
n_uids = len(hole_uid_list)
i_uid = 0
epsilon = 1e-6
frames = n_uids * [None]
thresh = 0.005
pdb.set_trace()
for hole_uid in hole_uid_list:

    sub_df = df[df['hole_uid'] == hole_uid]
    dz = np.diff(sub_df.depth)
    dzz = np.hstack((0.0, dz))
    sub_df['dz'] = pd.Series(dzz, index=sub_df.index)
    sub_df = sub_df[sub_df.dz>thresh]
#    plt.plot(np.diff(sub_df.depth));
#    plt.plot(0.005*np.ones(len(sub_df)), 'k')
#    plt.show()
    frames[i_uid] = sub_df
    i_uid += 1
    #add one to front

    #print('fin len', len(dff))

    #pdb.set_trace()
    print('ok')
dff = pd.concat(frames)
dff.to_csv(output_csv_fullname)
pdb.set_trace()
print('ok')
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
