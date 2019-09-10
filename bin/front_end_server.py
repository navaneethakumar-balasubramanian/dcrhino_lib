from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO
from flask_cors import CORS
from dcrhino3.models.trace_dataframe import TraceData
import numpy as np

import threading

from time import sleep


app = Flask(__name__)
CORS(app)

app = Flask(__name__,
            static_folder = "../web_server/frontend/dist",
            template_folder = "../web_server/frontend/dist")


app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/test')
def test():
    return render_template("test.html")

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('../web_server/frontend/dist/js/', path)


class SendDataThread(threading.Thread):
    def __init__(self, socketio):
        threading.Thread.__init__(self)
        self.socketio = socketio
        td = TraceData()
        td.load_from_h5("/home/thiago/Downloads/test_data_/5_trim_0.h5")
        self.nparr = td.component_as_array("axial").astype(np.float32)
        self.lines = len(self.nparr)
        self.idx = 0

    def run(self):
        while True:
            try:
                data = {}
                data['axial_trace'] = list(self.nparr[self.idx].astype(str))
                data['radial_trace'] = list(self.nparr[self.idx].astype(str))
                data['tangential_trace'] = list(self.nparr[self.idx].astype(str))
                data['temperature'] = 100
                data['battery'] = 98
                self.socketio.emit('data', data, broadcast=True)
                self.idx += 1
                sleep(0.1)
            except:
                print ("failed to send data")
                pass



if __name__ == '__main__':
    sendData = SendDataThread(socketio)
    sendData.daemon = True
    sendData.start()
    socketio.run(app,port=5002)