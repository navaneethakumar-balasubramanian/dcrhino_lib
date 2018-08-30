# -*- coding: utf-8 -*-
"""
Created on Wed Dec  2 16:58:41 2015

@author: knk1504
"""
import qfutils.log as logging
logger = logging.getLogger(__name__)

from qf.math.interval import Interval
try:
    import qf.cpp_api
except ImportError:
    logger.warning("Cant find API")


class TimePeriod(Interval):
    """
    TODO: 20180503; I just noticed that this class seems ok with using pandas
    Timestamp objects.  So far behaviour is expected.  A good idea would be
    to make a few unit tests to confirm that all the functionalities I need
    are supported.  Confirmed duration() works;
    """
    def __init__(self, **kwargs):
        """
        Instantiate an object of the synNoise() class; which is really just a
        type of timeseries.

        """
        Interval.__init__(self,**kwargs);

    def duration(self, **kwargs):
        """
        """
        units = kwargs.get('units', 'seconds')
        duration = self.upper_bound - self.lower_bound
        if units == 'days':
            return duration.days
        else:
            return duration.total_seconds()


    def count_days(self):
        """
        @type start_date,end_date, datetime.datetime(); assumed to have no hh,mm,ss
        @rtype num_days_to_process: integer
        took this from util suporting datetime
        """
        num_days_to_process_timedelta = self.upper_bound - self.lower_bound
        num_days_to_process = num_days_to_process_timedelta.days + 1
        return num_days_to_process

    def _to_qfapi_time_interval(self):
        """
        """
        t1 = qf.cpp_api.TimePointTAI(self.lower_bound.__str__())
        t2 = qf.cpp_api.TimePointTAI(self.upper_bound.__str__())
        time_interval = qf.cpp_api.TimeInterval(t1, t2)
        return time_interval

def main():
    """
    """
    print("finito")

if __name__ == "__main__":
    main()
