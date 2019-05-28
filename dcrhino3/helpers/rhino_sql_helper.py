import mysql.connector
from dcrhino3.helpers.db.processed_holes import ProcessedHoles
from dcrhino3.helpers.db.acorr_files     import AcorrFiles
from dcrhino3.helpers.db.sensor_files    import SensorFiles
from dcrhino3.helpers.db.matches         import Matches
class MyConverter(mysql.connector.conversion.MySQLConverter):

    def row_to_python(self, row, fields):
        row = super(MyConverter, self).row_to_python(row, fields)

        def to_unicode(col):
            if type(col) == bytearray:
                return col.decode('utf-8')
            return col

        return[str(to_unicode(col)) for col in row]

class RhinoSqlHelper:
    def __init__(self,host,user,passwd,database):
        self.conn = mysql.connector.connect(
          converter_class=MyConverter,
          host=host,
          user=user,
          passwd=passwd,
          database=database
        )
        self.processed_holes = ProcessedHoles(self.conn)
        self.acorr_files = AcorrFiles(self.conn)
        self.sensor_files = SensorFiles(self.conn)
        self.matches = Matches(self.conn)
