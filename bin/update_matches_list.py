# -*- coding: utf-8 -*-

import argparse
import pdb
import numpy as np
import matplotlib.pyplot as plt

import pandas as pd
from scipy import interpolate

from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
import glob2
import os
import logging
from dcrhino3.models.traces.raw_trace import RawTraceData
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.mwd_helper import MWDHelper
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.helpers.mwd_rhino_merger import MWDRhinoMerger
from dcrhino3.helpers.general_helper_functions import init_logging,splitDataFrameIntoSmaller
import os
import hashlib
from matplotlib.backends.backend_pdf import PdfPages

from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper

from multiprocessing import Process

logger = init_logging(__name__)


def plot(files_in_match, line, solutions_ids, pdf=None):
    line = line[1]
    y = 0

    fig, ax = plt.subplots()

    for file_in_match in files_in_match.iterrows():
        if file_in_match[1].sensor_file_id in solutions_ids:
            ax.broken_barh([(file_in_match[1]['min_ts'], file_in_match[1]['max_ts'] - file_in_match[1]['min_ts'])],
                           (y, 1), facecolor='green', label=file_in_match[1]['file_path'])
        else:
            ax.broken_barh([(file_in_match[1]['min_ts'], file_in_match[1]['max_ts'] - file_in_match[1]['min_ts'])],
                           (y, 1), label=file_in_match[1]['file_path'])

        y = y + 1.5

    ax.broken_barh([(line['start_time_min'], line['start_time_max'] - line['start_time_min'])], (y, 1), facecolor='red')
    ax.legend(loc=2, bbox_to_anchor=(0, -0.1))
    # ax.legend()
    if pdf == None:
        plt.show()
    else:
        pdf.savefig()
    plt.close()


def plot_matches_line(matches_line, pdf=None):
    files_ids = matches_line[1]['files_ids']
    splitted = np.asarray(files_ids.split(',')).astype(int)
    files_in_match = files[files['sensor_file_id'].isin(splitted)]

    solutions_ids = matches_line[1]['solution']
    if solutions_ids != '':
        solutions_ids = np.asarray(solutions_ids.split(',')).astype(int)
    else:
        solutions_ids = []
    # print files_in_match
    # print solutions_ids
    plot(files_in_match, matches_line, solutions_ids, pdf)


def detect_missing_ts(line, files_in_match):
    ts_in_hole = np.arange(int(line[1]['start_time_min']), int(line[1]['start_time_max']), 1)
    ts_in_files = []
    for file in files_in_match.iterrows():
        ts_in_files.append(np.arange(int(file[1]['min_ts']), int(file[1]['max_ts']), 1))
    ts_in_files = np.unique(np.concatenate(ts_in_files))
    return np.setdiff1d(ts_in_hole, ts_in_files)


def detect_conficts(files_in_match):
    conflict = False
    for file_in_match in files_in_match.iterrows():
        for file_in_match2 in files_in_match.iterrows():
            if (file_in_match[1]['min_ts'] > file_in_match2[1]['min_ts'] and file_in_match[1]['min_ts'] <
                file_in_match2[1]['max_ts']) or (
                    file_in_match[1]['max_ts'] > file_in_match2[1]['min_ts'] and file_in_match[1]['max_ts'] <
                    file_in_match2[1]['max_ts']):
                conflict = True
    return conflict


def get_less_missings(line, solution):
    return solution[0]


def get_all_in_one_file(line, solution):
    filtered_solution = []
    for file_in_match in solution.iterrows():
        if (file_in_match[1]['min_ts'] <= line[1]['start_time_min']) and (
                file_in_match[1]['max_ts'] >= line[1]['start_time_max']):
            filtered_solution.append(file_in_match)
    return filtered_solution


def get_bigger(line, solution):
    bigger = solution[0]
    for file_in_match in solution:
        bigger_ts = bigger[1]['max_ts'] - bigger[1]['min_ts']
        file_in_match_ts = file_in_match[1]['max_ts'] - file_in_match[1]['min_ts']
        if file_in_match_ts > bigger_ts:
            bigger = file_in_match

    return [bigger]


def solve_conflict(line, files_in_match):
    solution = files_in_match
    solution = get_all_in_one_file(line, solution)
    if len(solution) > 1:
        solution = get_bigger(line, solution)
    return solution


def get_solution_arrays(matches, files):
    solution_array = []
    solution_label_array = []
    for line in matches.iterrows():
        files_ids = line[1]['files_ids']
        splitted = np.asarray(files_ids.split(',')).astype(int)
        files_in_match = files[files['sensor_file_id'].isin(splitted)]

        solution = []
        conflict = detect_conficts(files_in_match)
        missing_data = detect_missing_ts(line, files_in_match)

        ts_in_file = int(line[1]['start_time_max']) - int(line[1]['start_time_min'])
        if ts_in_file > 0:
            missing_data_percentage = float(len(missing_data) / float(ts_in_file)) * 100
        else:
            missing_data_percentage = 100
        if missing_data_percentage > 10:
            # print line[1]['hole_id'] + " MISSING DATA " +str(int(missing_data_percentage)) + "%"
            solution_label_array.append("Missing data")
            solution_array.append('')
            # plot(files_in_match,line,solution)
        elif conflict:
            solution = solve_conflict(line, files_in_match)
            solution_str = ''
            for sol in solution:
                solution_str += str(sol[1].sensor_file_id) + ","
            if len(solution_str) > 1:
                solution_str = solution_str[:-1]

            if len(solution) == 0:
                # print line[1]['hole_id'] +" Unsolved Conflict"
                solution_label_array.append("Unsolved Conflict")
                solution_array.append(solution_str)
                # plot(files_in_match,line,solution)
            elif len(solution) > 1:
                # solution = get_less_missings(line,solution)
                # print line[1]['hole_id'] +" Unsolved Conflict - Multiple Solutions"
                solution_label_array.append("Unsolved Conflict - Multiple Solutions")
                solution_array.append('')
                # plot(files_in_match,line,solution)
            else:
                # print line[1]['hole_id'] +" Conflict Solved"
                solution_label_array.append("Conflict Solved")
                solution_array.append(solution_str)
                # plot(files_in_match,line,solution)
        else:
            # print line[1]['hole_id'] + ' Non Conflict'
            solution_label_array.append("Non Conflict")
            solution_array.append(files_ids)
    return solution_array, solution_label_array

def get_matches_list(mine_name,env_config):
    mwd_helper = MWDHelper(env_config)
    mwd_df = mwd_helper.get_rhino_mwd_from_mine_name(mine_name)
    mine_config = env_config.get_mp_config(mine_name)
    sqlconn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    sql_db_helper = RhinoSqlHelper(host=sqlconn['host'], user=sqlconn['user'], passwd=sqlconn['password'],
                                   database=sqlconn['database'])
    files = sql_db_helper.sensor_files.get_all_valid()
    files.min_ts = files.min_ts.astype(float)
    files.max_ts = files.max_ts.astype(float)
    files.sensor_file_id = files.sensor_file_id.astype(int)
    files['id'] = files.sensor_file_id

    logger.info("Getting Matches List")
    merger = MWDRhinoMerger(files, mwd_df)
    matches = merger.observed_blasthole_catalog
    logger.info("Getting Matches List Conflicts")
    #matches['solution'], matches['solution_label'] = get_solution_arrays(matches, files)

    return matches

def update_matches_list(mine_name,env_config):
    conn = env_config.get_rhino_db_connection_from_mine_name(mine_name)
    sql_conn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    sql_db_helper = RhinoSqlHelper(host=sql_conn['host'], user=sql_conn['user'], passwd=sql_conn['password'],
                                   database=sql_conn['database'])


    matches_list = get_matches_list(mine_name,env_config)
    logger.info("Saving data to db")
    counter = 0
    for line in matches_list.iterrows():
        counter +=1
        logger.info("Saving matches " + str(counter) + " of " + str(len(matches_list)))
        line = line[1]
        row_id = line.bench_name + line.pattern_name + line.hole_name + line.hole_id + line.rig_id+ line.sensor_id + line.digitizer_id
        hash_object = hashlib.md5(row_id.encode())
        hex_dig = hash_object.hexdigest()
        sql_db_helper.matches.add(hex_dig,line.files_ids,line.bench_name,line.pattern_name,line.hole_id,line.hole_name,line.rig_id,line.sensor_id,line.digitizer_id,line.start_time_max,line.start_time_min,line.solution,line.solution_label)
    return


if __name__ == '__main__':
    clickhouse_logger = logging.getLogger('clickhouse_driver.connection')
    clickhouse_logger.setLevel(50)
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
    argparser.add_argument('-env', '--env-file', help="ENV File Path", default=False)

    argparser.add_argument("mine_name", metavar="mine_name", type=str,
    help="Mine Name")
    args = argparser.parse_args()

    env_config = EnvConfig(args.env_file)

    update_matches_list(args.mine_name,env_config)