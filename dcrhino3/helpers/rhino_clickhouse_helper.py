from clickhouse_driver import Client
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.helpers.clickhouse_db.sensor_file_acorr_trace import SensorFileAcorrTrace

logger = init_logging(__name__)

class ClickhouseHelper:
    def __init__(self,host='localhost',user='default',password='',database='test',compression='lz4', port='9000',conn=False):
        if conn is False:
            logger.info('Using database ' + str(database) + ' on ' + str(host))
            self.client = Client(host, user=user, password=password, database=database, compression=compression, port=port)
        else:
            logger.info('Using database ' + str(conn['database']) + ' on ' + str(conn['host']))
            self.client = Client(conn['host'], user=conn['user'], password=conn['password'], database=conn['database'],
                                 compression=compression, port=conn['port'])

        self.sensor_file_acorr_trace = SensorFileAcorrTrace(self.client)
