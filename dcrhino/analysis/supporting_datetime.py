# -*- coding: utf-8 -*-
"""
Created on Thu Jun 14 09:51:16 2018

@author: kkappler
TODO: Get tz_info stuff up and running
"""

from __future__ import absolute_import, division, print_function


import datetime
#import matplotlib.pyplot as plt
#import numpy as np
#import os
#import pdb

HOURS_PER_DAY = 24
MINUTES_PER_HOUR = 60
MINUTES_PER_DAY = MINUTES_PER_HOUR * HOURS_PER_DAY
SECONDS_PER_MINUTE = 60
SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR
SECONDS_PER_DAY = SECONDS_PER_HOUR * HOURS_PER_DAY
MILLISECONDS_PER_SECOND = 1000
MICROSECONDS_PER_SECOND = 1000000

from datetime import tzinfo

class TimeZone(tzinfo):
    """
    Cut and pasted from
    http://stackoverflow.com/questions/4770297/python-convert-utc-datetime-string-to-local-datetime
    Trying to get support for generic plotter of data with timezone support

    @note: Will need to apply isdst on a survey by survey basis

    """
    def __init__(self,offset,isdst,name):
        self.offset = offset
        self.isdst = isdst
        self.name = name

    def utcoffset(self, dt):
        return timedelta(hours=self.offset) + self.dst(dt)

    def dst(self, dt):
            return timedelta(hours=1) if self.isdst else timedelta(0)

    def tzname(self,dt):
         return self.name


#<Time Zone Experimental>
GMT = TimeZone(0,False,'GMT')
EST = TimeZone(-5,False,'EST')
MDT = TimeZone(-6,False,'MDT')
PST = TimeZone(-8,True,'PST')
#<\Time Zone Experimental>

#home = os.path.expanduser("~/")
def get_seconds_into_day(dtym):
    """
    Returns the number of seconds that have elapsed since midnight for the
    given datetime object.

    @type dtym: datetime.datetime

    @rtype: float
    @rparam: the number of seconds that have elapsed since last midnight
    """

    if dtym.tzinfo is None:
        midnight_before = datetime.datetime(dtym.year, dtym.month, dtym.day)
    else:
        midnight_before = datetime.datetime(dtym.year, dtym.month, dtym.day, tzinfo=GMT)
    difference = dtym - midnight_before
    return difference.total_seconds()

def get_date_from_year_dyr(year, dyr):
    """
    dyr: integer debnoting julian day (day-of-year)
    @rtype: tuple
    @rparam: dayte is a datetime.datetime object, dayte_string is a string formatted a certain way, default is %c
    """
    julian_fmt = '%Y.%j'
    yyyydyr_str = str(year)+'.'+str(dyr)
    dayte = datetime.datetime.strptime(yyyydyr_str, julian_fmt)
    return dayte.date()
#    dayte_string = dayte.strftime('%c')
#    return dayte, dayte_string

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
