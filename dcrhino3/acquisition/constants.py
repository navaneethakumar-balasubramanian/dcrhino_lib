import os

ACQUISITION_PATH = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(ACQUISITION_PATH,"data")
LOGS_PATH = os.path.join(ACQUISITION_PATH,"logs")
BIN_PATH = os.path.join(os.path.dirname(ACQUISITION_PATH),"dcrhino_lib","bin")
RAM_PATH = "/tmp/dcrhino"
