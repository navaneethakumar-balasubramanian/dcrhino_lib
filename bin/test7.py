from dcrhino3.helpers.dc_dataset_pusher import DcDatasetPusher
import pandas as pd
import glob2

#subdomain = "devdatacloud"
#dataset_name = "Southwalker_RHINO"
#hole_dataframe = pd.read_csv("/home/thiago/Downloads/20191104-bmc-swc_V8.zip")
#pushed = DcDatasetPusher(hole_dataframe, subdomain, dataset_name)

dataset_name = '20191120_no_shift'
#subdomain = "southwalker"



subdomain = "southwalker"
#file
#files = glob2.iglob("/data/bmc/south_walker_creek/log_processing_results_20191114/*.csv")
files = glob2.iglob("/data/bmc/south_walker_creek/log_processing_results_20191120/*.csv")
#files = glob2.iglob("/data/bmc/south_walker_creek/logs_processing_results_20191115/with_shift/20191104-bmc-swc_J_IS_09_MB2_OB_rig_V9.csv")
#files = glob2.iglob("./temp.csv")
files = list(files)
if len(files) == 1:
    print(files[0])
    holes_dataframe = pd.read_csv(files[0])
else:
    dfs = []
    for file in files:
        print (file)
        df = pd.read_csv(file);
        dfs.append(df)
    holes_dataframe = pd.concat(dfs)

holes_dataframe.drop(columns=['hole'],inplace=True)
holes_dataframe.dropna(axis='columns', how='all',inplace=True)
holes_dataframe.dropna(axis='rows', how='all',inplace=True)




#DcDatasetPusher
pushed = DcDatasetPusher(holes_dataframe, subdomain, dataset_name)
