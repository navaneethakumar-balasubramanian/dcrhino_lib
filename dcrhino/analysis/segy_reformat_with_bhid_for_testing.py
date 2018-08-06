# -*- coding: utf-8 -*-
"""
Created on Sun May 27 14:04:36 2018

@author: kkappler

script to grab original segy and output it with  bhid filled in
/home/kkappler/data/datacloud/623/BH623_SSX70799_01_configD_pos5_5.1.sgy
"""

from __future__ import absolute_import, division, print_function


import datetime
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb

import obspy
from obspy.io.segy.core import _read_segy


from trace_header import TRACE_HEADER_FORMAT_LIST


HOME = os.path.expanduser("~/")

obspy.io.segy.header.TRACE_HEADER_FORMAT[:] = TRACE_HEADER_FORMAT_LIST
obspy.io.segy.header.TRACE_HEADER_KEYS[:] = \
    [_i[1] for _i in obspy.io.segy.header.TRACE_HEADER_FORMAT]
#home = os.path.expanduser("~/")


def my_function():
    """
    """
    position_id = 5; segy_filename = '/home/kkappler/data/datacloud/623/BH623_SSX70799_01_configD_pos5_5.1.sgy'
    position_id = 4; segy_filename = '/home/kkappler/data/datacloud/623/BH623_SSX70840_01_configD_pos4_5.1.sgy'
    st = _read_segy(segy_filename)
    for trace in st.traces:
        trace.stats.segy.trace_header.hole_id=1# for xx in st.traces]
    st.write('623_position-{}.segy'.format(position_id))
    print('ok')
    pass

def main():
    """
    """
    my_function()
    print("finito {}".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
