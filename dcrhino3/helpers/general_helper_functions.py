# -*- coding: utf-8 -*-
"""
Created on Sat Apr 26 13:59:10 2014

Author: kkappler

Basic tools to help write Python script, mostly taken from websites.
"""
import collections
import datetime
import fnmatch
import glob
import json
import numpy as np
import os
import pandas as pd
import pdb
#from string import zfill
import subprocess
import sys

from collections import namedtuple
#from scipy.interpolate import interp1d

#<temporary logging>
import logging


def identify_time_columns(df, manual=False):
    """
    gets you a list of 'datelike' columns

    in the case that you are reading from csv files, sometimes we have datetimes
    and these need to be converted to pd.datetime format.  parse_dates=True
    does not always work.  If you know the columns you want to cast as dates
    that is OK, but if you don't then use this to get a list of datelike cols

    Also Supports a manually supplied list.

    Could make this use a list of accepted formats (%Y-%m-%d %H:%M:%S, etc)
    for multiple lambda funcitons
    """
    #can make this iterate over strings#'%Y-%m-%d %H:%M:%S'
    dateparse = lambda x: pd.datetime.strptime(x, '%Y-%m-%d %H:%M:%S')

    if manual is not False:
        return manual
    datetime_column_labels = []
    row = df.iloc[0]
    for col in df.columns:
#        if col == 'Drilled Start Hole Timestamp':
#            print('dd')
#            pdb.set_trace()
        try:
            dateparse(row[col])
            pd.to_datetime(row[col])
            datetime_column_labels.append(col)
        except:
            message = "looks like {} is not a datetime".format(col)
            print(message)
    return datetime_column_labels

def StandardString(s):
    """
    historical method from SEGY-land
    Parameters:
        s (str): string to be standardized

    Returns:
        (str): cleaned, standardized string with underscores instead of spaces
    """
    s = str(s).replace("_"," ")
    components = s.split(" ")
    clean_components=[]
    string=""
    for ch in components:
        word = ''.join(e for e in ch if (e.isalnum() or (e in ['&','.'])))
        clean_components.append(word)
    for i,c in enumerate(clean_components):
        string += c
        if i<len(clean_components)-1:
            string+= "_"
    return string.upper()


def df_column_uniquify(df):
    df_columns = df.columns
    new_columns = []
    for item in df_columns:
        counter = 0
        newitem = item
        while newitem in new_columns:
            counter += 1
            newitem = "{}_{}".format(item, counter)
        new_columns.append(newitem)
    df.columns = new_columns
    return df

def file_as_bytes(file):
    with file:
        return file.read()

def is_string(val):
    if (sys.version_info > (3, 0)):
        return isinstance(val, str)

    else:
        # Python 2 code in this block
        return isinstance(val, basestring)



def init_logging(name):
    """
    Start a basic logger.

    Parameters:
        name (str): name of logger

    Returns:
        logger to record DataCloud-specific warnings, errors, and steps.
    """
    logger = logging.getLogger(name)
    logging.basicConfig(level = logging.INFO,format='%(asctime)s %(name)-12s \
                        %(levelname)-8s line:%(lineno)d %(funcName)s %(message)s', \
                        datefmt='%m-%d %H:%M:%S',filemode='w')
    return logger


def init_logging_to_file(name):
    """
    Start a basic logger.

    Parameters:
        name (str): name of logger

    Returns:
        logger to record DataCloud-specific warnings, errors, and steps.
    """
    logger = logging.getLogger(name)
    logging.basicConfig(filename='./output.log',level=logging.INFO, format='%(asctime)s %(name)-12s \
                        %(levelname)-8s line:%(lineno)d %(funcName)s %(message)s', \
                        datefmt='%m-%d %H:%M:%S', filemode='w')
    return logger
#<\temporary logging>

logger = init_logging(__name__)
home = os.path.expanduser('~/')

def create_folders_if_needed(path):
    """
    Creates a folder if one does not already exist.

    Parameters:
        path(str): path to place folder
    """
    if not os.path.exists(path):
        os.makedirs(path)

def var_or_dict_from_json_str(var):
    """
    Convert json string to variable or dictionary, returns them.

    Parameters:
        var (var): json serialized string to be decoded

    Returns:
        dictionary from json string or (var) if json.load(var) raises exception
    """
    try:
        loaded = json.loads(var)
        pdb.set_trace()
        if type(loaded) == dict:
            for key in loaded.keys():
                loaded[key] = var_or_dict_from_json_str(loaded[key])
        else:
            return loaded
    except:
        return var

def dict_to_object(var):
    """
    Converts dictionary to object.

    Raises:
        :code:`NameError: name 'namedtuple' is not defined`

    .. warning:: Does not plug and play.
    """
    if type(var) == dict:
        return namedtuple("obj",var.keys())(*var.values())
    return var

def json_string_to_object(_str):
    """
    Converts json string to object using json.loads()

    Parameters:
        _str: Json string to be converted

    Returns:
        (dict): dictionary created from json string
    """
    try:
        dict_json  = json.loads(_str)
    except:
        dict_json = _str
    if type(dict_json) == dict:
        for key in dict_json.keys():
            dict_json[key] = json_string_to_object(dict_json[key])
        dict_json = dict_to_object(dict_json)

    return dict_json



def count_lines(fileName):
    """
    Counts lines in file specified. (Acts like wc -l in unix)

    Returns:
        (int): Number of lines present in fileName or -1 if file does not exist

    Raises:
        IOError: if fileName does not exist.
    """
    i = -1
    with open(fileName) as f:
        for i, l in enumerate(f):
            pass
    return i+1


def count_directories(directory, **kwargs):
    """
    Count number of subdirectories in deirectory specified.

    Parameters:
        directory (str): directory whose contents to count
    Returns:
        (int): number of subdirectories in directory
    """
    recursive = kwargs.get('recursive', True)
    count = 0
    if recursive:
        for root, dirs, files in os.walk(directory):
            for name in dirs:
                #logger.info("{}".format(os.path.join(root, name)))
                count += 1
    else:
        files_and_folders = os.listdir(directory)
        for f in files_and_folders:
            fullpath = os.path.join(directory, f)
            if os.path.isdir(fullpath):
                #print f
                count += 1
    return count


def execute_command(cmd,**kwargs):
    """
    Executes command in terminal from script.

    Parameters:
        cmd (str): command to exectute from a terminal
        kwargs: exec_dir (str): the directory from which to execute
        kwargs: no_exception: suppress output if exception

    Other Parameters:
        exit_status: :code:`0` is good, otherwise there is some problem

    .. note:: When executing :code:`rm *` this crashes if the directory we are removing
        from is empty

    .. note:: if you can you should probably use execute_subprocess() instead
    """
    exec_dir = kwargs.get('exec_dir',os.path.expanduser('~/'))
    allow_exception = kwargs.get('allow_exception', True)
    logger.info("executing from {}".format(exec_dir))
    cwd = os.getcwd()
    os.chdir(exec_dir)
    exit_status = os.system(cmd)
    if np.abs(exit_status) > 0:
        logger.warning("exit_status of {} = {}".format(cmd,exit_status))
        if allow_exception:
            raise Exception("Failed to successfully execute \n {}".format(cmd))
    os.chdir(cwd)


def execute_subprocess(cmd,**kwargs):
    """
    Parameters:
        cmd (str): command to exectute from a terminal

    Other Parameters:
        exit_status: 0 is good, otherwise there is some problem

    .. note:: When executing :code:`rm *` this crashes if the directory we are removing
        from is empty
    """
    allow_exception = kwargs.get('allow_exception', False)
    exit_status = subprocess.call([cmd], shell=True)
    if exit_status != 0:
        logger.warning("exit_status of {} = {}".format(cmd,exit_status))
        if not allow_exception:
            raise Exception("Failed to successfully execute \n {}".format(cmd))
    return


def expound(someObj):
    """
    This function prints the contents of an object so a user can see values.

    Parameters:
        someObj (object): object to explore
    """
    #attributes = dir(someObj)
    fields =  dir(someObj)
    for field in fields:
        try:
            print("attribute  %s has value %s  " %
                  (field, str(getattr(someObj, field))))
        except TypeError:
            msg = "attribute {} has a Type Error when accessed with getattr?"
            print(msg.format(field))


def find_files(directory, pattern, **kwargs):
    """
    Recursively search for files matching pattern in directory:

        `Stackoverflow find files <http://stackoverflow.com/questions/2186525/use-a-glob-to-find-files-recursively-in-python>`_
    """
    sort_list = kwargs.get('sort', True)
    matches = []
    for root, dirnames, filenames in os.walk(directory):
      for filename in fnmatch.filter(filenames, pattern):
          matches.append(os.path.join(root, filename))
    if sort_list:
        matches.sort()

    return matches



#def arrayBounds(ts,ordered=False,**kwargs):
#    """
#    return min, max and range of a numpy array
#
#    @type ts: numpy array
#    @param ts: the numpy array whose assess bounds we want to assesson
#
#    @kwarg verbose: set to True of you want min,max, range output to terminal
#
#    @rtype: tuple
#    @rparam: the minimum, maximum, and range of input ts
#
#    @note: 20131121: added ordered option so that if you call this on an ordered
#    array it is much faster.
#    """
#    if not ordered:
#        verbose = kwargs.get('verbose',False)
#        mn = np.min(ts)
#        mx = np.max(ts)
#        rng = mx-mn
#    else:
#        mn=ts[0]
#        mx=ts[1]
#        rng = mx-mn
#    if verbose:
#        logger.info("{},{}, {}".format(mx,mn,rng))
#    return (mn, mx, rng)
#
#
#def extendPlotBounds(array,**kwargs):
#    """
#    method for choosing ylims (or xlims) with a little room above and below the
#    function. Sometimes cant see the fucntion clearly because top of plot
#    is the curve.
#
#    @kwarg: percent: percent of funciton range to make bounds... defualt=10%
#    @kwarg: ordered: boolean, gets passed to arrayBounds(), speeds things up
#    ordered is true if array is ordered (like an x-axis for example)
#    default value of ordered is False
#    """
#    pctFcnHeight = kwargs.get('percent',0.1)
#    mn, mx, rng = arrayBounds(array, **kwargs)
#    Min, Max = mn-pctFcnHeight*rng, mx+pctFcnHeight*rng
#    return Min, Max
#
#def find_nearest(a, a0):
#    """
#    :type a: numpy array
#    :param a: the numpy array to search for value a0
#    :type a0: scalar
#    :param a0: a value to we want to find the nearest value in a
#    Element in nd array `a` closest to the scalar value `a0`
#    http://stackoverflow.com/questions/2566412/find-nearest-value-in-numpy-array
#    @note: the one-liner     idx = np.abs(a - a0).argmin() is itself a useful fcn
#    to return the index of the nearest element;  May want to name it as
#    "get_index_of nearest_element(array, value)"
#    """
#    idx = np.abs(a - a0).argmin()
#    return a.flat[idx]



#
##<TIME FUNCTIONS>
#
#def infinite_datetime_interval():
#    """
#    method to create a date time interval containing any time interval
#    we may inquire about
#
#    @ToDo: Move this function into Interval()
#    """
#    a_long_time_ago = datetime.datetime(1900,1,1,0,0,0)
#    a_long_time_from_now = datetime.datetime(9999,12,31,23,59,59)
#    a_long_time_ago.strftime(DATE_FMT+' '+TIME_FMT)
#    a_long_time_from_now.strftime(DATE_FMT+' '+TIME_FMT)
#    infinite_interval = Interval(a_long_time_ago, a_long_time_from_now)
#    return infinite_interval



def generate_enumerated_folder(target_dir, **kwargs):
    """
    .. todo:: change count_directories() function here to support using
        glob.glob and allowing a particular directory string to be matched
    """
    dir_to_create = kwargs.get('dir_to_create',None)
    str_to_match = kwargs.get('str_to_match', '*')
    test_case_name = kwargs.get('test_case_name', '')
    #pdb.set_trace()
    directory_exists_already = True #deafult
    matches = glob.glob(os.path.join(target_dir, str_to_match))
    #pdb.set_trace()
    folders = [x for x in matches if os.path.isdir(x)]
#    print folders
#    print num_matches
    number_of_preexisting_folders = len(folders)
    #count_directories(target_dir, recursive=False)
    uid_int = number_of_preexisting_folders
    #pdb.set_trace()

    if dir_to_create is None:
        while directory_exists_already:
            uid = zfill(uid_int,4)
            dir_to_create = "{}_{}".format(test_case_name, uid)
            directory_to_check_for = os.path.join(target_dir, dir_to_create)
            if os.path.isdir(directory_to_check_for):
                print("directory exists already, which means your \
                directory strucutre has deviated from original plan")
                uid_int +=1
            else:
                directory_exists_already = False

    os.makedirs(directory_to_check_for, mode=511)
    return directory_to_check_for




#<\TIME FUNCTIONS>


def pretty_print_array(RA):
    """
    .. todo:: 20151223: need this to compare arrays
    """
    nrows, ncols = RA.shape
    for i_row in range(nrows):
        line = ncols*[None]
        for i_col in range(ncols):
            str_val = str(RA[i_row,i_col])
            line[i_col] = str_val[0:6]#( RA[i_row,i_col])
        out_str = " ".join(line)
        print("{}\n".format(out_str))
#    return

def check_timestamp(filename,**kwargs):
    """
    Check if a file was recently updated/created.

    Parameters:
        filename (str): the file in quesion
        ** kwargs ageThreshold (float): how old a file can be before warn/raises exception
    """
    age_threshold = kwargs.get('age',5.0)
    #<Check file is created recently>
    if os.path.isfile(filename):
        recent_mod_time = get_modification_date(filename)
        now = datetime.datetime.now()
        how_old = recent_mod_time - now
        age_in_seconds = np.abs(how_old.total_seconds())
        if age_in_seconds < age_threshold:
            logger.info("file {} is recent; {}s".format(filename, age_in_seconds))
        else:
            msg = "UNEXPECTED TIMESTAMP"
            logger.warning(msg)
            msg = "File {} is {} seconds old"
            raise Exception(msg.format(filename, age_in_seconds))
    else:
        raise Exception("File {} DNE".format(filename))

    #<Check file is created recently>


def get_modification_date(filename):
    """
    Parameters:
        filename (str): the file in question

    Returns:
        (datetime): the last time the file was modified
    """
    t = os.path.getmtime(filename)
    return datetime.datetime.fromtimestamp(t)


def check_if_sequence_log_lin_orother(seq):
    """
    Check if sequence is logarithmic, linear, or other.

    Parameters:
        seq (list): sequence to be checked

    Yields:
        prints an answer string

    .. note:: Taken from some calibration file development stuff, not sure if
        needed. This should work for lin or log progressions.
    """
    d2seq = np.diff(np.diff(seq))
    if np.sum(d2seq) == 0.0:
        print("its linear")
    elif np.sum(np.diff(seq[0:-1]/seq[1:])):
        print("its log")
    else:
        print("hmm, seq doesn't seem to be logarithmic or linear...")


def merge_two_dicts(x, y):
    """
    Merge two dictionaries.

        `Stackoverflow Merge <https://stackoverflow.com/questions/38987/how-to-merge-two-dictionaries-in-a-single_expression>`_

    .. note:: In python 3.5 and higher use :code:`z = {**x, **y}` But for now use this
    """
    z = x.copy() #start with x's keys and values
    z.update(y) #modifies z with y's keys and values and returns None
    return z

def flatten(d, parent_key='', sep='_'):
    """
    Flatten nested python dictionaries to unindent.

        `Stackoverflow Flatten <https://stackoverflow.com/questions/6027558/flatten-nested-python-dictionaries-compressing-keys>`_
    """
    items = []
    for k, v in d.items():
        new_key = parent_key + sep + k if parent_key else k
        if isinstance(v, collections.MutableMapping):
            items.extend(flatten(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

def add_inverse_dictionary(my_map):
    """
    https://stackoverflow.com/questions/483666/python-reverse-invert-a-mapping
    """
    inv_map = {v: k for k, v in my_map.items()}
    my_map = merge_two_dicts(my_map, inv_map)
    return my_map

def add_leading_zeors_to_timestamp_for_file_names(elapsed):
    leading_zeros = ""
    if len(elapsed) < 5:
        leading_zeros = "0" * (5 - len(elapsed))
    return("{}{}".format(leading_zeros,elapsed))
