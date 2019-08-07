import pandas as pd
import sqlite3
import os
import math
import datetime
import pdb

DEFAULT_VALUES = {'pit': "100", 'bench': "100"}

def atan_calculation(data):
    return math.atan(data)


def cos_mast_angle_calc(data):
    return math.cos(math.radians(data))


def power_calculation(data):
    return data * data


def sqrt_calculation(data):
    return math.sqrt(data)


def replace_blank_space(head_list):
    final_list = []
    for column in head_list:
        final_list.append(column.replace(" ", "_").replace("(", "").replace(")", ""))
    return final_list


def run(raw_directory):
    print("Started reading files from: " + str(raw_directory))
    raw_files = os.listdir(raw_directory)
    print(raw_files)
    db_name = os.path.join('mwd.db')

    drilled_hole_file_name = ""
    mwd_sample_file_name = ""
    drill_plan_file_name = ""

    for filename in raw_files:
        os.rename(os.path.join(raw_directory, filename),
                  os.path.join(raw_directory, filename.replace(' ', '_').replace('-', '_')))

    files_list = []

    print("Reading files")
    for root, dirs, files in os.walk(raw_directory):
        for f in files:
            print(f)
            if (f.endswith("drilled_hole.xlsx")):
                drilled_hole_file_name = os.path.join(root, f)
                files_list.append(drilled_hole_file_name)
            elif (f.endswith("MWD_Sample.xlsx")):
                mwd_sample_file_name = os.path.join(root, f)
                files_list.append(mwd_sample_file_name)
            elif (f.endswith("Drill_Plan.xlsx")):
                drill_plan_file_name = os.path.join(root, f)
                files_list.append(drill_plan_file_name)
    if (len(files_list) == 0):
        print("No files to process.")
        return None

    mwd_sample_df = pd.read_excel(open(mwd_sample_file_name, 'rb'), skiprows=3, index=False)
    mwd_sample_df = mwd_sample_df.loc[:, ~mwd_sample_df.columns.str.contains('^Unnamed')]
    columns = replace_blank_space(list(mwd_sample_df))
    mwd_sample_df.columns = columns
    print(mwd_sample_df)

    drilled_hole_df = pd.read_excel(open(drilled_hole_file_name, 'rb'), skiprows=3, index=False)

    drilled_hole_df = drilled_hole_df.loc[:, ~drilled_hole_df.columns.str.contains('^Unnamed')]
    columns = replace_blank_space(list(drilled_hole_df))
    drilled_hole_df.columns = columns

    # CUSTOM CALCULATIONS BEGIN - 20190730
    # drilled_hole_df['azimuth']=math.atan((drilled_hole_df['Drilled_End_Point_X'] - drilled_hole_df['Drilled_Start_Point_X'])/(drilled_hole_df['Drilled_End_Point_Y'] - drilled_hole_df['Drilled_Start_Point_Y']))
    print("Azimuth calculation....")

    drilled_hole_df['azimuth_raw'] = (drilled_hole_df['Drilled_End_Point_X'] - drilled_hole_df[
        'Drilled_Start_Point_X']) / (drilled_hole_df['Drilled_End_Point_Y'] - drilled_hole_df['Drilled_Start_Point_Y'])
    drilled_hole_df['azimuth'] = drilled_hole_df['azimuth_raw'].apply(atan_calculation)

    print("Angle calculation....")

    drilled_hole_df['x_points'] = (drilled_hole_df['Drilled_End_Point_X'] - drilled_hole_df['Drilled_Start_Point_X'])
    drilled_hole_df['y_points'] = (drilled_hole_df['Drilled_End_Point_Y'] - drilled_hole_df['Drilled_Start_Point_Y'])
    drilled_hole_df['angle_support'] = (
                drilled_hole_df['x_points'].apply(power_calculation) + drilled_hole_df['y_points'].apply(
            power_calculation))
    drilled_hole_df['angle_raw'] = (
                (drilled_hole_df['Drilled_End_Point_Z'] - drilled_hole_df['Drilled_Start_Point_Z']) / drilled_hole_df[
            'angle_support'].apply(sqrt_calculation))
    drilled_hole_df['angle'] = drilled_hole_df['angle_raw'].apply(atan_calculation)

    print("True Vertical Depth calculation....")
    #	drilled_hole_df['true_vertical_depth'] = drilled_hole_df['Drilled_End_Point_Y'] * drilled_hole_df['angle'].apply(cos_mast_angle_calc)
    #	drilled_hole_df['measured_depth'] = (drilled_hole_df['Drilled_Start_Point_X'] + drilled_hole_df['Drilled_End_Point_Y'])/2

    print("Reducing time by 8hours....")

    drilled_hole_df['Drilled_Start_Hole_Timestamp'] = drilled_hole_df[
                                                          'Drilled_Start_Hole_Timestamp'] - datetime.timedelta(hours=8)
    drilled_hole_df['Drilled_End_Hole_Timestamp'] = drilled_hole_df['Drilled_End_Hole_Timestamp'] - datetime.timedelta(
        hours=8)

    # CUSTOM CALCULATIONS END

    print("Extracting PIT from Drill plan")
    drilled_hole_df["pit"] = drilled_hole_df["Drill_Plan_Name"].str.split("-", n=1, expand=True)[0]
    print("Extracting BENCH from Drill plan")
    drilled_hole_df["bench"] = drilled_hole_df["Drill_Plan_Name"].str.split("-", n=2, expand=True)[1]
    print("Extracting PATTERN from Drill plan")
    drilled_hole_df["pattern"] = drilled_hole_df["Drill_Plan_Name"].str.split("-", n=2, expand=True)[2]
    print(drilled_hole_df)
    # WE CAN SKIP PLANNED_HOLE FILE FOR MAPPING
    # planned_hole_df = pd.read_excel(open(EXCEL_FILE_NAME, 'rb'),sheet_name='Planned hole Drill Plan',skiprows=3,index=False)
    planned_hole_df = pd.read_excel(open(drill_plan_file_name, 'rb'), skiprows=3, index=False)
    planned_hole_df = planned_hole_df.loc[:, ~planned_hole_df.columns.str.contains('^Unnamed')]
    columns = replace_blank_space(list(planned_hole_df))
    planned_hole_df.columns = columns
    print("Extracting PIT from Drill plan")
    planned_hole_df["pit"] = planned_hole_df["Drill_Plan_Name"].str.split("-", n=1, expand=True)[0]
    print("Extracting BENCH from Drill plan")
    planned_hole_df["bench"] = planned_hole_df["Drill_Plan_Name"].str.split("-", n=2, expand=True)[1]
    print("Extracting PATTERN from Drill plan")
    drilled_hole_df["pattern"] = drilled_hole_df["Drill_Plan_Name"].str.split("-", n=2, expand=True)[2]
    print(planned_hole_df)

    print(list(planned_hole_df))

    try:
        os.remove(db_name)
    except:
        print("Error while deleting exsisting db")
    conn = sqlite3.connect(db_name)
    print("Storing the files as table in the database")
    mwd_sample_df.to_sql('mwd_sample', conn)
    drilled_hole_df.to_sql('drilled_hole', conn)
    planned_hole_df.to_sql('planned_hole', conn)
    merge(db_name)

    pdb.set_trace()


def merge(db_name):
    print("Started merging from DB")
    conn = sqlite3.connect(db_name)

    # SQL_STRING UPDATED BY MAHENDRA ON 2019-05-21 (SLACK CHANNEL)
    # ADDED ANGLE & AZIMUTH NAMED COLUMNS
    sql_string = "SELECT drilled_hole.Drilled_Hole_Name as hole_id, \
                    drilled_hole.Drilled_Start_Hole_Timestamp as start_time, \
                    drilled_hole.Drilled_Start_Hole_Timestamp as time_start, \
                    drilled_hole.pattern as pattern_name, \
					mwd_sample.MWD_Sample_Depth_Avg as measured_depth, \
                    drilled_hole.Drilled_Start_Hole_Timestamp as hole_start_time, \
					drilled_hole.Rig_Name as rig_id, \
                    drilled_hole.bench as bench_name, \
                    FROM mwd_sample, drilled_hole, planned_hole \
					WHERE mwd_sample.MWD_Sample_Timestamp between drilled_hole.Drilled_Start_Hole_Timestamp and drilled_hole.Drilled_End_Hole_Timestamp   \
					and mwd_sample.Drill_Plan_Name = drilled_hole.Drill_Plan_Name"

    df = pd.read_sql(sql_string, conn)

    print("Creating default values if not exists")
    df_cols = list(df)
    for col in DEFAULT_VALUES:
        if (col not in df_cols):
            df[col] = DEFAULT_VALUES[col]

    pdb.set_trace()
    #	df.to_csv("/opt/datacloud/dc_azurestorage/easternridge/raw/mwd_merged_20190730.csv",index=False)
    df.to_csv("/home/thiago/Downloads/eastern_ridge_raw_mwd/MWD_Eastern_Ridge_20190805.csv", index=False)
    return "DONE!"


if __name__ == "__main__":
    # run(r'E:\datacloud\data\easternridge\data')
    # run('/opt/datacloud/dc_azurestorage/easternridge/raw/')
    run('/home/thiago/Downloads/eastern_ridge_raw_mwd/')