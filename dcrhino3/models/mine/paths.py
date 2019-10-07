import json
import os
from dcrhino3.helpers.general_helper_functions import init_logging
logger = init_logging(__name__)

class Paths():
    def __init__(self):
        self.base_folder = None
        self.field_data_folder = None
        self.hole_h5_interpolated_cache_folder = None
        self.hole_h5_processed_cache_folder = None
        self.process_flows_folder = None
        self.log_process_flows_folder = None



    def set_data(self, data):
        existing_variables = vars(self).keys()
        if (isinstance(data, str)):
            data = json.loads(str)

        for var in data.keys():
            if var in existing_variables:
                setattr(self, var, data[var])
            else:
                logger.warn("Unable to set variable :" + var + " with " + str(data[var]))
        self.set_default_values_where_nones()

    def set_default_values_where_nones(self):
        if self.base_folder is not None:
            if self.field_data_folder is None:
                self.field_data_folder = os.path.join(self.base_folder,"field_data")
            if self.hole_h5_interpolated_cache_folder is None:
                self.hole_h5_interpolated_cache_folder = os.path.join(self.base_folder,"hole_acorr")
            if self.hole_h5_processed_cache_folder is None:
                self.hole_h5_processed_cache_folder = os.path.join(self.base_folder,"processed")
            if self.process_flows_folder is None:
                self.process_flows_folder = os.path.join(self.base_folder,"process_flows")
            if self.log_process_flows_folder is None:
                self.log_process_flows_folder = os.path.join(self.base_folder,"log_process_flows")