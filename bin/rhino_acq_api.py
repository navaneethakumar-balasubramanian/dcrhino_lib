from flask import Flask, request, jsonify, send_from_directory, render_template, Response, make_response, send_file
from flask_socketio import SocketIO
from flask_cors import CORS
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH
from dcrhino3.acquisition.constants import DATA_PATH, LOGS_PATH, RAM_PATH
from datetime import datetime
from dcrhino3.models.config2 import Config
import glob2
import os
from subprocess import Popen
import multiprocessing
import subprocess
import serial
import queue
import shutil
import threading
import sys
import time
import numpy as np
import time
from dcrhino3.helpers.general_helper_functions import init_logging, init_logging_to_file
from dcrhino3.acquisition.real_time_acquisition_int import RhinoMainAcquisition
logger = init_logging(__name__)
file_logger = init_logging_to_file(__name__)
CACHE_IMAGE_FOLDER = "/tmp/image_cache_rhino_api/"

app = Flask(__name__)
CORS(app)

app = Flask(__name__,
            static_folder = "../web_server/rhino_acquisition_frontend",
            template_folder = "../web_server/rhino_acquisition_frontend")
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

ACQUISITION_PROCESS = None
SYSTEM_HEALTH_PROCESS = None
SENSOR_STATS_PROCESS = None
GLOBAL_CONFIG = None
DEBUG = True
TRACE_DATA_Q = queue.Queue()



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>', methods=['GET', 'POST'])
def index(path):
    return render_template("index.html")


@app.route('/open_settings', methods=['GET'])
def settings():
    return render_template("settings.html")

@app.route('/test', methods=['GET'])
def test():
    return render_template("stream_test.html")


@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('../web_server/rhino_acquisition_frontend/css/', path)


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('../web_server/rhino_acquisition_frontend/js/', path)


@app.route('/3rdparty/<path:path>')
def send_3rd(path):
    return send_from_directory('../web_server/rhino_acquisition_frontend/3rdparty/', path)

# def send_data_t


@app.route('/start_acquisition')
def start_acquisition():
    # global RAW_DATA_Q
    # start_acquisition_thread(TRACE_DATA_Q)
    print("debug is {}".format(request.args.get('debug', '')))
    global ACQUISITION_PROCESS, DEBUG, SYSTEM_HEALTH_PROCESS, SENSOR_STATS_PROCESS
    if ACQUISITION_PROCESS is None:
        timestamp = datetime.now().strftime('%Y_%m_%d_%H')
        acq_script = 'real_time_acquisition_v4.py'
        health_script = 'system_health_plotter.py'
        sensor_stats = 'sensor_stats_plotter.py'
        if DEBUG:
            ACQUISITION_PROCESS = Popen(['python', os.path.abspath(os.path.join(PATH, acq_script))])
            SYSTEM_HEALTH_PROCESS = Popen(['python', os.path.abspath(os.path.join(PATH, health_script))])
            SENSOR_STATS_PROCESS = Popen(['python', os.path.abspath(os.path.join(PATH, sensor_stats))])
            logger.info("Acquisition started in debug mode")
        else:
            error_file = os.path.join(LOGS_PATH, "{}.err".format(timestamp))
            with open(error_file, "a") as err:
                ACQUISITION_PROCESS = Popen(['python', os.path.abspath(os.path.join(PATH, acq_script))], stderr=err)
                SYSTEM_HEALTH_PROCESS = Popen(['python', os.path.abspath(os.path.join(PATH, health_script))],
                                              stderr=err)
                SENSOR_STATS_PROCESS = Popen(['python', os.path.abspath(os.path.join(PATH, sensor_stats))], stderr=err)
            logger.info("Acquisition started in regular mode")

        processor_number = multiprocessing.cpu_count() - 1
        p = subprocess.Popen(['taskset', '-cp', '{}'.format(processor_number),
                              str(SYSTEM_HEALTH_PROCESS.pid)],
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        logger.debug("System Health Plotter Running in processor {} \n".format(processor_number))
        processor_number = multiprocessing.cpu_count() - 2
        p = subprocess.Popen(['taskset', '-cp', '{}'.format(processor_number),
                              str(SENSOR_STATS_PROCESS.pid)], stdout=subprocess.PIPE,
                             stderr=subprocess.PIPE)
        logger.debug("Sensor Stats Plotter Running in processor {} \n".format(processor_number))
    return render_template("index.html")


@app.route('/stop_acquisition')
def stop_acquisition():
    global ACQUISITION_PROCESS, DEBUG, SYSTEM_HEALTH_PROCESS, SENSOR_STATS_PROCESS
    if ACQUISITION_PROCESS is not None:
        # if not DEBUG:
        #     self.err.close()
        ACQUISITION_PROCESS.terminate()
        ACQUISITION_PROCESS = None
        # SYSTEM_HEALTH_PROCESS.terminate()
        # SYSTEM_HEALTH_PROCESS = None
        # SENSOR_STATS_PROCESS.terminate()
        # SENSOR_STATS_PROCESS = None
        stop_rx(True)
        # rename_temp_files()
        # os.remove(os.path.join(RAM_PATH, "system_health.npy"))
        # logger.info("Acquisition stopped")
    return render_template("index.html")

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/start_acquisition_int')
def start_acquisition_int():
    global TRACE_DATA_Q, ACQUISITION_PROCESS
    if ACQUISITION_PROCESS is None:
        acquisition = RhinoMainAcquisition(TRACE_DATA_Q)
        acquisition.start()
        ACQUISITION_PROCESS = acquisition.main_process
        logger.info(ACQUISITION_PROCESS)
    else:
        logger.info("Process already started. Skipping")
    return render_template("stream_test.html")

# @app.route('/traces')
# def get_rta():
#     global TRACE_DATA_Q



class SendDataThread(threading.Thread):
    def __init__(self, socketio):
        threading.Thread.__init__(self)
        self.socketio = socketio
        self.idx = 0

    def run(self):
        global TRACE_DATA_Q
        while True:
            try:
                trace_dict = dict()
                if not TRACE_DATA_Q.empty():
                    raw_trace_dict = TRACE_DATA_Q.get()
                    trace_dict["axial"] = list(raw_trace_dict["trace_data"]["axial"]["axial_interpolated"].astype(str))
                    trace_dict["tangential"] = list(raw_trace_dict["trace_data"]["tangential"][
                                                        "tangential_interpolated"].astype(str))
                    trace_dict["timestamp"] = raw_trace_dict["timestamp"]
                    trace_dict["rssi"] = raw_trace_dict["rssi"]
                    trace_dict["packets"] = raw_trace_dict["raw_data"]["axial"].size
                    batt = raw_trace_dict["batt"]
                    if np.isnan(batt):
                        batt = str(batt)
                    trace_dict["batt"] = batt
                    temp = raw_trace_dict["temp"]
                    if np.isnan(temp):
                        temp = str(temp)
                    trace_dict["temp"] = temp
                    trace_dict["acceleration"] = raw_trace_dict["acceleration"]
                    trace_dict["ideal_timestamps"] = list((raw_trace_dict["ideal_timestamps"]-raw_trace_dict[
                        "timestamp"]).astype(str))
                    print(batt, temp)
                    # print(raw_trace_dict["timestamp"])

                    self.socketio.emit('data', trace_dict, broadcast=True)
                    self.idx += 1
                time.sleep(0.5)
            except:
                print("failed to send data {}".format(sys.exec_info))
                pass



@app.route('/save_config', methods=['GET', 'POST'])
def save_config():
    # pdb.set_trace()
    # return render_template('settings.html', country=request.form['country'], company=request.form['company'])
    global GLOBAL_CONFIG
    for key in request.form.keys():
        GLOBAL_CONFIG.__dict__[key] = request.form[key]
    GLOBAL_CONFIG.save_to_disk_files()
    # with open("/home/natal/toconvert/test.txt", 'w') as f:
    #     f.write("it worked {} {}".format(request.form['country'], request.form['company']))
    # f.close()
    #
    return ("Success")


@app.route('/get_config', methods=['GET', 'POST'])
def get_config():
    global GLOBAL_CONFIG
    GLOBAL_CONFIG = Config(acquisition_config=True)
    return GLOBAL_CONFIG.pipeline_json_string


def stop_rx(active, baud_rate=921600):
    try:
        rhino_ttyusb = subprocess.check_output('ls -l /dev/serial/by-id/ | grep "usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_" | grep -Po -- "../../\K\w*"',shell=True)
        rhino_ttyusb = rhino_ttyusb.decode("utf-8")
        rhino_ttyusb = rhino_ttyusb.replace('\n', '')
        rhino_port = "/dev/"+rhino_ttyusb
        baud_rate = baud_rate
        cport = serial.Serial(rhino_port, baud_rate, timeout=1.0)
        cport.write(bytearray("stop\r\n", "utf-8"))
        cport.close()
        logger.info("Serial Port Closed")
        m = ("{}: SERIAL PORT CLOSED".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")))
        logger.info(m)
        if active:
            m = ("{}: ACQUISITION STOPPED".format(datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")))
            logger.info(m)
    except:
        pass


def rename_temp_files(data_path=DATA_PATH):
    try:
        temp_files = glob2.glob((os.path.join(data_path, "**", "*.tmp")))
        for file in temp_files:
            if "RTA" in file or "RTR" in file:
                new_name = file.replace(".tmp", ".h5")
                logger.debug("Renaming {} to {}".format(file, new_name))
                shutil.move(file, new_name)
    except:
        pass


if __name__ == '__main__':
    print("It is getting here")
    sendData = SendDataThread(socketio)
    sendData.start()
    socketio.run(app, port=5000)
