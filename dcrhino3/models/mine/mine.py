import json
from dcrhino3.models.mine.paths import Paths
from pandas.io.json._normalize import nested_to_record
from dcrhino3.helpers.general_helper_functions import init_logging

logger = init_logging(__name__)

class Mine:
    def __init__(self):
        self.name = None
        self.alternative_names = []
        self.sql_db_connection = None
        self.clickhouse_connection = None
        self.paths = None
        self.mwd = None

    def set_data(self,data):
        existing_variables = vars(self).keys()
        if (isinstance(data,str)):
            data = json.loads(str)

        for var in data.keys():
            if var in existing_variables:
                if var == "paths":
                    self.paths = Paths()
                    self.paths.set_data(data[var])
                else:
                    setattr(self, var, data[var])
            else:
                logger.warn("Unable to set mine variable :" + var + " with " + str(data[var]))