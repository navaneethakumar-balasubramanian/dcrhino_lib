import pandas as pd
import numpy as np


class FakeHoleMwd(object):

    def __init__(self,**kwargs):
        self.start_time = kwargs.get('start_time')
        self.end_time = kwargs.get('end_time')
        self.hole_name = kwargs.get('hole_name')

        self.hole_id = kwargs.get('hole_id',None)
        if self.hole_id is None:
            self.hole_id = self.hole_name

        self.machine_id = kwargs.get('machine_id',"X")
        self.bench = kwargs.get('bench',"1")
        self.pattern = kwargs.get('pattern', "1")
        self.easting = kwargs.get('easting', "1")
        self.northing = kwargs.get('northing', "1")
        self.start_depth = kwargs.get('start_depth', 0)
        self.end_depth = kwargs.get('end_depth', 15)
        self.depth_resolution = kwargs.get('depth_resolution', 0.1)
        self.collar_elevation = kwargs.get('collar_elevation', 700)


    @property
    def dataframe(self):
        lines_quantity = int((self.end_depth - self.start_depth) / self.depth_resolution)
        seconds_to_drill = (pd.to_datetime(self.end_time) - pd.to_datetime(self.start_time)).total_seconds()
        seconds_per_line = seconds_to_drill/lines_quantity
        random_intervals = np.random.randint(int(seconds_per_line*0.8),int(seconds_per_line*1.2),lines_quantity)
        lines = []

        for i in range(lines_quantity):
            line = dict()
            line['hole_start'] = self.start_time
            line['hole_name'] = self.hole_name
            line['hole_id'] = self.hole_id
            line['machine_id'] = self.machine_id
            line['bench'] = self.bench
            line['pattern'] = self.pattern
            line['easting'] = self.easting
            line['northing'] = self.northing
            line['start_depth'] = self.start_depth + (i * self.depth_resolution)
            line['end_depth'] = self.start_depth + ((i+1) * self.depth_resolution)
            line['collar_elevation'] = self.collar_elevation
            line['computed_elevation'] = self.collar_elevation - (((line['end_depth'] - line['start_depth'])/2) + line['start_depth'])
            line['mse'] = np.random.randint(10,20)

            if i == 0:
                line['time_start'] = pd.to_datetime(self.start_time)
                line['time_end'] = pd.to_datetime(line['time_start']) + pd.to_timedelta(random_intervals[i],unit='s')

            elif i == (lines_quantity - 1):
                previous_line = lines[i-1]
                line['time_start'] = pd.to_datetime(previous_line['time_end'])
                line['time_end'] = pd.to_datetime(self.end_time)
            else:
                line['time_start'] = pd.to_datetime(previous_line['time_end'])
                line['time_end'] = pd.to_datetime(line['time_start']) + pd.to_timedelta(random_intervals[i],unit='s')
            previous_line = line
            #lines[i] = line
            lines.append(line)
        df = pd.DataFrame(lines)
        return df
