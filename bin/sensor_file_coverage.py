from rhino_lp.pipeline import parse_config
import json
import pandas as pd
import os
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper


import matplotlib.pyplot as plt
import numpy as np



mine_name = str('south_walker_creek')
env_config = EnvConfig()
conn = env_config.get_rhino_db_connection_from_mine_name(mine_name)
sql_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
sql_db_helper = RhinoSqlHelper(**sql_conn)

sensor_files = sql_db_helper.sensor_files.get_all_valid()

sensor_files.min_ts = pd.to_datetime(sensor_files.min_ts,unit='s')
sensor_files.max_ts = pd.to_datetime(sensor_files.max_ts,unit='s')


plt.rcdefaults()
fig, ax = plt.subplots()

# Example data


people = ('Tom', 'Dick', 'Harry', 'Slim', 'Jim')
y_pos = np.arange(len(people))
performance = 3 + 10 * np.random.rand(len(people))
error = np.random.rand(len(people))

ax.barh(y_pos, performance, xerr=error, align='center')
ax.set_yticks(y_pos)
ax.set_yticklabels(people)
ax.invert_yaxis()  # labels read top-to-bottom
ax.set_xlabel('Performance')
ax.set_title('How fast do you want to go today?')

plt.show()
