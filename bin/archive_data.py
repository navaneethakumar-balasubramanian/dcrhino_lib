import argparse
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.helpers.general_helper_functions import create_folders_if_needed
import os

if __name__ == '__main__':
    argparser = argparse.ArgumentParser(description="Copyright (c) 2018 DataCloud")
    argparser.add_argument('-env', '--env-file', help="ENV File Path", default=False)

    argparser.add_argument("mine_name", metavar="mine_name", type=str,
                           help="Mine Name")

    args = argparser.parse_args()

    env_config = EnvConfig(args.env_file)

    mine_name = args.mine_name

    sqlconn = env_config.get_rhino_sql_connection_from_mine_name(mine_name)
    sql_db_helper = RhinoSqlHelper(**sqlconn)
    to_archive = sql_db_helper.processed_holes.get_archived_folders()
    folder = env_config.get_hole_h5_processed_cache_folder(mine_name)
    to_archive_paths = folder + to_archive.output_folder_name;
    for path in to_archive_paths:
        try:
            to = "/data_blob" + path

            os.system("mkdir --parents {} && mv {} {} ".format(to,path,to))
            print("from : "  + path)
            print("to : "  + to)
        except:
            print("AA")
    print("")


