import glob
import os
import sys
import ConfigParser
import shutil
import time
import gzip
import psutil
from dcrhino3.acquisition.constants import ACQUISITION_PATH as PATH


def file_is_old(file_date, age_threshold=32):
    age_threshold = age_threshold
    today = time.time()
    file_age = (today - file_date)/86400.
    if file_age > age_threshold:
        return True
    return False


def get_rhino_files_for_archive(data_path, archived_files=False, age=32):
    file_type = "*RT*.h5"
    if archived_files:
        file_type = "{}.gz".format(file_type)
    raw_file_list = glob.glob(os.path.join(data_path, "**", file_type))
    old_files = [x for x in raw_file_list if file_is_old(os.path.getctime(x),age)]
    return old_files


def archive_files(files_for_archive):
    for file in files_for_archive:
        print ("Archiving: {}".format(file))
        with open(file, 'rb') as f_in, gzip.open('{}.gz'.format(file), 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
            os.remove(file)
        print("done")


def low_space():
    if psutil.disk_usage("/")[3] <= 59:
        return True
    return False


def scan():
    cfg_fname = os.path.join(PATH, "collection_daemon.cfg")
    config = ConfigParser.SafeConfigParser()
    config.read(cfg_fname)
    data_path = config.get("DATA_TRANSMISSION", "local_folder")
    daily_archive = True
    default_age = 30
    initial_disk_space = psutil.disk_usage("/")[1]
    while True:
        print("Current free space: {}".format(psutil.disk_usage("/")[3]))
        if daily_archive:
            print("Performing Daily Archive")
            files_for_archive = get_rhino_files_for_archive(data_path)
            archive_files(files_for_archive)
            final_disk_space = psutil.disk_usage("/")[1]
            print("Initial diskspace: {}\nFinal diskspace: {}\nSaved Space: {}".format(initial_disk_space,
                                                                                       final_disk_space,
                                                                                       initial_disk_space
                                                                                       - final_disk_space))
        age = default_age
        while low_space() and age > 1:
            print("Archiving files older than {} days".format(age))
            files_for_archive = get_rhino_files_for_archive(data_path, age)
            archive_files(files_for_archive)
            final_disk_space = psutil.disk_usage("/")[1]
            print("Initial diskspace: {}\nFinal diskspace: {}\nSaved Space: {}".format(initial_disk_space,
                                                                                       final_disk_space,
                                                                                       initial_disk_space
                                                                                       - final_disk_space))
            age -= 1

        age = 15
        if low_space():
            print("Deleting archived files older than {} days".format(age))
            files_for_archive = get_rhino_files_for_archive(data_path, archived_files=True, age=age)
            for file in files_for_archive:
                os.remove(file)
            final_disk_space = psutil.disk_usage("/")[1]
            print("Initial diskspace: {}\nFinal diskspace: {}\nSaved Space: {}".format(initial_disk_space,
                                                                                       final_disk_space,
                                                                                       initial_disk_space
                                                                                       - final_disk_space))
        print("Free space after disk management: {}".format(psutil.disk_usage("/")[3]))
        time.sleep(86400)


if __name__ == "__main__":
    scan()
