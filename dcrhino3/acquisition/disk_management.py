import glob
import os
import sys
import ConfigParser
import shutil
import time
import gzip
import psutil
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH


def file_is_old(file_date):
    age_threshold = 32
    today = time.time()
    file_age = (today - file_date)/86400.
    if file_age > age_threshold:
        return True
    return False


def get_rhino_files_for_archive(data_path):
    raw_file_list = glob.glob(os.path.join(data_path, "**", "*RT*.h5"))
    old_files = [x for x in raw_file_list if file_is_old(os.path.getctime(x))]
    return old_files


def archive_files(files_for_archive):
    for file in files_for_archive:
        print ("Archiving: {}".format(file))
        with open(file, 'rb') as f_in, gzip.open('{}.gz'.format(file), 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
            os.remove(file)
        print("done")


def scan():
    cfg_fname = os.path.join(PATH, "collection_daemon.cfg")
    config = ConfigParser.SafeConfigParser()
    config.read(cfg_fname)
    data_path = config.get("DATA_TRANSMISSION", "local_folder")
    low_space = True
    initial_disk_space = psutil.disk_usage("/")[1]
    while True:
        if low_space:
            files_for_archive = get_rhino_files_for_archive(data_path)
            archive_files(files_for_archive)
            final_diskspace = psutil.disk_usage("/")[1]
            print("Initial diskspace: {}\nFinal diskspace: {}\nSaved Space: {}".format(initial_disk_space,
                                                                                       final_diskspace,
                                                                                       initial_diskspace-final_disk_space))
        time.sleep(2)


if __name__ == "__main__":
    scan()
