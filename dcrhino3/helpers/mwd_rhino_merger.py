#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Jan 22 14:54:20 2019

Author: thiago
"""
import pdb
from datetime import datetime
import numpy as np
import pandas as pd
from dcrhino3.helpers.general_helper_functions import init_logging
from scipy.interpolate import interp1d
from sklearn.neighbors.classification import KNeighborsClassifier


logger = init_logging(__name__)

class MWDRhinoMerger():
    """
    Merges MWD with trace data by demarcating timestamps, retrieving data, matching and merging.
    """
    def __init__(self, file_list, mwd_dc_df,generate=True):
        self.file_list = file_list
        self.mwd_dc_df = mwd_dc_df

        if generate:
            self.pre_filtered_mwd = self._pre_filter_mwd()

            if len(self.pre_filtered_mwd) == 0:
                logger.warn("Couldnt find any combination on this file_list and mwd, please check rig_ids and start_time")
                return False


            self.observed_blasthole_catalog = self._generate_matches_list()


    def get_min_max_time(self,hole_id):
        """
        Get the min and max timestamps for each hole id

        Parameters:
            hole_id(str): hole identifier

        Returns:
            minimum and maximum timestamps
        """
        hole_mwd = self.mwd_dc_df[self.mwd_dc_df['hole_id']== str(hole_id)]
        min_ts = hole_mwd['start_time'].astype(int).min()/1000000000
        max_ts = hole_mwd['start_time'].astype(int).max()/1000000000
        return min_ts, max_ts

    def get_acorr_trace_data_from_index(self,idx):
        """
        Pick out line using from matches_list.iloc (created by :func:`_generate_matches_list`),
        then pull hole dataframe using :func:`get_hole_df`

        Parameters:
            idx (int): line no. of hole for acorr trace data to be pulled

        Returns:
            none
        """
        line = self.matches_list.iloc[idx]
        hole_mwd = self.get_hole_df(line.bench_name,line.pattern_name,line.hole_name,line.hole_id)


    def _generate_matches_list(self):
        """
        Finds matches in pre_filtered_mwd DataFrame, creates holes where none found,
        and makes DataFrame listing holes for the file list specified in this class.

        Returns:
            (DataFrame): DataFrame of holes created/found for the file list specified
            in MWDRHINOMERGER class.
        """
        file_list = self.file_list
        pre_filtered_mwd = self.pre_filtered_mwd
        columns_sort_group = ['bench_name','pattern_name','hole_name','hole_id']
        holes_cfgs = dict()

        for line in file_list.itertuples():

            cond_1 = pre_filtered_mwd['rig_id'].astype(str) == line.rig_id
            cond_2 = pre_filtered_mwd['start_time'].astype(int)/1000000000 >= line.min_ts
            cond_3 = pre_filtered_mwd['start_time'].astype(int)/1000000000 <= line.max_ts

            holes_mwd = pre_filtered_mwd[cond_1 & cond_2 & cond_3].copy().sort_values(by=columns_sort_group).reset_index(drop=True)
            holes_identified = np.array(list(holes_mwd.groupby(columns_sort_group).groups))
            if len(holes_identified) > 0:
                rig_id_ar = np.full([holes_identified.shape[0],1],str(line.rig_id))
                sensor_id_ar = np.full([holes_identified.shape[0],1],str(line.sensor_id))
                digitizer_id_ar = np.full([holes_identified.shape[0],1],str(line.digitizer_id))
                holes_identified = np.hstack((holes_identified,rig_id_ar,sensor_id_ar,digitizer_id_ar))
                holes_identified = np.unique(holes_identified, axis=0)

                for hole in holes_identified:
                    if '----'.join(list(hole)) not in holes_cfgs:
                        holes_cfgs['----'.join(list(hole))] = []
                    holes_cfgs['----'.join(list(hole))].append([line.id,line.min_ts,line.max_ts])
            else:
                logger.warn("NO HOLES IDENTIFIED ON THIS FILE:" + str(line.file_path))

        ## TRANSFORM TO DATAFRAME ONE HOLE PER LINE WITH MULTIPLE FILES
        dict_list  = [dict()] * len(holes_cfgs.keys())
        for idx , unique_hole in enumerate(holes_cfgs.keys()):
            splitted = unique_hole.split('----')
            start_time_min, start_time_max = self.get_min_max_time(splitted[3])

            line = dict()
            line['bench_name'] = str(splitted[0])
            line['pattern_name'] = str(splitted[1])
            line['hole_name'] = str(splitted[2])
            line['hole_id'] = str(splitted[3])
            line['rig_id'] = str(splitted[4])
            line['sensor_id'] = str(splitted[5])
            line['digitizer_id'] = str(splitted[6])
            files_ids = np.empty(len(holes_cfgs[unique_hole])).astype(int)
            for i, file in enumerate(holes_cfgs[unique_hole]):
                files_ids[i] = int(file[0])
            line['files_ids'] = ','.join(files_ids.astype(str))
            line['start_time_min'] = start_time_min
            line['start_time_max'] = start_time_max
            dict_list[idx] = line

        files_holes_df = pd.DataFrame(dict_list)
        logger.info("Solving conflicts")
        files_holes_df['solution'], files_holes_df['solution_label'] = self.get_solution_arrays(files_holes_df, file_list)
        return files_holes_df

    def _detect_conflicts(self,files_in_match):
            conflict = False
            for file_in_match in files_in_match.iterrows():
                for file_in_match2 in files_in_match.iterrows():
                    if (file_in_match[1]['min_ts'] > file_in_match2[1]['min_ts'] and file_in_match[1]['min_ts'] <
                        file_in_match2[1]['max_ts']) or (
                            file_in_match[1]['max_ts'] > file_in_match2[1]['min_ts'] and file_in_match[1]['max_ts'] <
                            file_in_match2[1]['max_ts']):
                        conflict = True
            return conflict

    def _detect_missing_ts(self,line,files_in_match):
        ts_in_hole = np.arange(int(line[1]['start_time_min']),int(line[1]['start_time_max']),1)
        ts_in_files = []
        for file in files_in_match.iterrows():
            ts_in_files.append( np.arange(int(file[1]['min_ts']),int(file[1]['max_ts']),1) )
        ts_in_files = np.unique(np.concatenate(ts_in_files))
        return np.setdiff1d(ts_in_hole,ts_in_files)

    def _get_all_in_one_file(self,line, solution):
        filtered_solution = []
        for file_in_match in solution.iterrows():
            if (file_in_match[1]['min_ts'] <= line[1]['start_time_min']) and (
                    file_in_match[1]['max_ts'] >= line[1]['start_time_max']):
                filtered_solution.append(file_in_match)
        return filtered_solution

    def _get_bigger(self,line, solution):
        bigger = solution[0]
        for file_in_match in solution:
            bigger_ts = bigger[1]['max_ts'] - bigger[1]['min_ts']
            file_in_match_ts = file_in_match[1]['max_ts'] - file_in_match[1]['min_ts']
            if file_in_match_ts > bigger_ts:
                bigger = file_in_match

        return [bigger]

    def _solve_conflict(self,line,files_in_match):
        solution = files_in_match
        solution = self._get_all_in_one_file(line,solution)
        if len(solution) > 1:
            solution = self._get_bigger(line,solution)
        return solution

    def get_solution_arrays(self,matches,files):
        solution_array = []
        solution_label_array = []
        for line in matches.iterrows():
            files_ids =  line[1]['files_ids']
            splitted = np.asarray(files_ids.split(',')).astype(int)
            files_in_match = files[files['sensor_file_id'].isin(splitted)]

            solution = []
            conflict = self._detect_conflicts(files_in_match)
            missing_data = self._detect_missing_ts(line,files_in_match)

            ts_in_file = int(line[1]['start_time_max']) - int(line[1]['start_time_min'])
            missing_data_percentage = float(len(missing_data)/float(ts_in_file))*100
            if missing_data_percentage > 10:
                #print line[1]['hole_id'] + " MISSING DATA " +str(int(missing_data_percentage)) + "%"
                solution_label_array.append("Missing data")
                solution_array.append('')
                #plot(files_in_match,line,solution)
            elif conflict:
                solution = self._solve_conflict(line,files_in_match)
                solution_str = ''
                for sol in solution:
                    solution_str += str(sol[1].sensor_file_id) + ","
                if len(solution_str)>1:
                    solution_str = solution_str[:-1]

                if len(solution) == 0 :
                    #print line[1]['hole_id'] +" Unsolved Conflict"
                    solution_label_array.append("Unsolved Conflict")
                    solution_array.append(solution_str)
                    #plot(files_in_match,line,solution)
                elif len(solution) > 1:
                    #solution = get_less_missings(line,solution)
                    #print line[1]['hole_id'] +" Unsolved Conflict - Multiple Solutions"
                    solution_label_array.append("Unsolved Conflict - Multiple Solutions")
                    solution_array.append('')
                    #plot(files_in_match,line,solution)
                else:
                    #print line[1]['hole_id'] +" Conflict Solved"
                    solution_label_array.append("Conflict Solved")
                    solution_array.append(solution_str)
                    #plot(files_in_match,line,solution)
            else :
                #print line[1]['hole_id'] + ' Non Conflict'
                solution_label_array.append("Non Conflict")
                solution_array.append(files_ids)
        return solution_array,solution_label_array


    def merge_mwd_with_trace(self,hole_mwd,trace_data):
        """
        Concatenate (along columns) rhino traces and interpolated hole mwd data from
        :func:`get_mwd_interpolated_by_second`

        Parameters:
            hole_mwd (Dataframe): hole mwd data
            trace_data (Dataframe): trace data

        Returns:
            (DataFrame): dataframe combining the two dataframes' columns
        """
        rhino_traces_df = trace_data.dataframe
        time_vector = (rhino_traces_df['timestamp'].values*1000000000).astype(np.int64)


        interpolated_hole_mwd = self.get_mwd_interpolated_by_second(hole_mwd,time_vector)
        merged = pd.concat([rhino_traces_df,interpolated_hole_mwd],axis=1)
        #pdb.set_trace()
        return merged




    def get_mwd_interpolated_by_second(self,hole_mwd,time_vector):
        """
        Retrieve interpolated mwd values from dataframe only for a specific time vector.

        Parameters:
            hole_mwd (DataFrame): mwd dataframe
            tme_vector (Pandas Date Range): time to take snippet from

        Returns:
            (DataFrame): interpolated mwd from time specified
        """
        interpolated_mwd = pd.DataFrame()
        for col in hole_mwd.columns:
            if len(np.unique(hole_mwd[col])) == 1:
                interpolated_mwd[col] = np.full(len(time_vector),hole_mwd[col].values[0])
            elif pd.core.dtypes.cast.is_categorical_dtype(hole_mwd[col]):
                interpolated_mwd[col] = self.get_interpolated_categorical_column(time_vector,hole_mwd,col)
            elif hole_mwd[col].values.dtype in [np.int,np.float,np.datetime64]:
                interpolated_mwd[col] = self.get_interpolated_column(time_vector,hole_mwd,col)
            elif hole_mwd[col].values.dtype == np.dtype('datetime64[ns]'):
                interpolated_mwd[col] = pd.to_datetime(self.get_interpolated_column(time_vector,hole_mwd,col))
            else:
                logger.warn("FAILED TO INTERPOLATE " + str(col) + " type: " + str(hole_mwd[col].values.dtype))

        #interpolated_mwd['timestamp'] = time_vector/1000000000
        return interpolated_mwd

    def get_interpolated_categorical_column(self,time_vector, mwd_hole_df, column_label,
                    end_time_column_label='start_time'):
        """
        Parameters:
            time_vector (Pandas Date Range): period of interest, for example:
                pd.date_range(start=row.time_start, periods=num_traces_in_blasthole, freq='1S')
            mwd_hole_df (Dataframe): dataframe containing column_label, to be interpolated
            column_label (str): what to interp ... for example 'computed_elevation'

        Other Parameters:
            end_time_column_label (str): 'start_time' to select timeframe to interp

        Returns:
            Interped data, for example the depths of the traces

        .. note:: Uses kneigbors nearest vote interp function instead of the
            1D, linear interpolation method used in :func:`get_interpolated_column`

        """

        time_vector = pd.DatetimeIndex(time_vector).astype(np.int64)

        X = pd.DatetimeIndex(mwd_hole_df[end_time_column_label]).astype(np.int64).reshape((-1, 1))
        X_pred = time_vector.reshape((-1, 1))

        y = mwd_hole_df[column_label].cat.codes.values.reshape((-1, 1))

        knc = KNeighborsClassifier(1, algorithm='auto', n_jobs=-1)
        knc.fit(X, y)
        y_pred = knc.predict(X_pred)
        return mwd_hole_df[column_label].cat.categories[y_pred].ravel()

    def get_interpolated_column(self,time_vector, mwd_hole_df, column_label,
                            end_time_column_label='start_time'):
        """
        Parameters:
            time_vector (Pandas Date Range): period of interest, for example:
                pd.date_range(start=row.time_start, periods=num_traces_in_blasthole, freq='1S')
            mwd_hole_df (Dataframe): dataframe containing column_label, to be interpolated
            column_label (str): what to interp ... for example 'computed_elevation'

        Other Parameters:
            end_time_column_label (str): 'start_time' to select timeframe to interp

        Returns:
            Interped data, for example the depths of the traces

        .. note:: Uses 1D, linear interpolation function instead of the kneighbors
            method used in :func:`get_interpolated_categorical_column`
        """
        t_mwd = pd.DatetimeIndex(mwd_hole_df[end_time_column_label])
        t_mwd = t_mwd.astype(np.int64)

        interp_function = interp1d(t_mwd, mwd_hole_df[column_label], kind='linear',
                                   bounds_error=False, fill_value='extrapolate')

        time_vector = pd.DatetimeIndex(time_vector).astype(np.int64)
        interped_data = interp_function(time_vector)
        return interped_data


    def _pre_filter_mwd(self):
        """
        Do some basic filtering to avoid sending/keeping too much data.

        Returns:
            MWD DataFrame snipped to within timestamed limits and `shallow-copied <https://docs.python.org/2/library/copy.html#copy.copy>_`
        """
        min_ts_date = datetime.utcfromtimestamp(self.file_list['min_ts'].min())
        max_ts_date = datetime.utcfromtimestamp(self.file_list['max_ts'].max())
        rig_ids = self.file_list['rig_id'].unique()

        cond_1 = self.mwd_dc_df['rig_id'].isin(rig_ids)
        cond_2 = self.mwd_dc_df['start_time'] >= min_ts_date
        cond_3 = self.mwd_dc_df['start_time'] <= max_ts_date

        return self.mwd_dc_df[cond_1 & cond_2 & cond_3].copy()