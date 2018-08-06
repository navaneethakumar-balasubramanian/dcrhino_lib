from infi.clickhouse_orm.database import Database
from infi.clickhouse_orm.models import Model
from infi.clickhouse_orm.fields import *
from infi.clickhouse_orm.engines import Memory
import numpy as np

DB_NAME 	= 'rhino'
DB_URL 		= 'http://localhost:8123/' 
DB_USER 	= 'default'
DB_PASSWORD = ''
DEFAULT_QUERY = "SELECT * FROM rhino"

class Rhino(Model):
    dt 			= DateTimeField()
    ts 		    = StringField()
    ts_secs      = Int32Field() 
    ts_micro     = Int32Field()
    seq 			= Int64Field()
    clk  		= Int64Field()
    x  			= Int32Field() 
    y  			= Int32Field() 
    z  			= Int32Field() 
    seq2 		= Int64Field()
    txseq2  		= Int64Field()
    
def conn(dbname=DB_NAME, db_url=DB_URL,username=DB_USER,password=DB_PASSWORD):
	dbConn = Database(dbname, db_url=db_url, username=username, password= password, readonly=False, autocreate=True)
	return dbConn

def query(conn,qrystring=DEFAULT_QUERY):
	res = np.array([ (t.dt,t.ts,t.ts_secs, t.ts_micro, t.seq,t.clk, t.x, t.y,
						t.z, t.seq2, t.txseq2)   
		for t in conn.select(qrystring, model_class=Rhino)] )

	return res
