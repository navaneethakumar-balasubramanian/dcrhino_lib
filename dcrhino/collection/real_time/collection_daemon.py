# -*- coding: utf-8 -*-
"""
Created on Mon Jul 23 14:56:43 2018
Daemon routine to fetch data from the realtime database and print the interpolated vs raw data
@author: Natal

@TODO:  Modify so that this can loop over the data vector
components (axial, radial, tangential).


"""
from __future__ import absolute_import, division, print_function
from data_unit import DataUnit
from datetime import datetime
import time
import numpy as np
import matplotlib.pyplot as plt
import pdb
import sys
import os


def main():
    try:
#        pdb.set_trace()
        log = open("log-{}.txt".format(str(datetime.now())),"w")
        du = DataUnit(log)
    #    STATUS_PATH = du.params["PATH"]
        while True:
            t0 = datetime.now()
#            du.gpsd.next()
            if du.data_exists_in_database():
        #        if du.status == 'busy':
                #pdb.set_trace()
                if du.data_interval_in_database():
                    print('Fetching')
                    
                    du._fetch_data()
#                    plt.figure(1)
#                    plt.plot(du.digitizer_timestamps,du.axial_data,'k',marker=".");
                    uniformly_sampled_data = du.interpolate_data(du.axial_data)
                    uniformly_sampled_data_var = np.var(uniformly_sampled_data)
                    raw_var = np.var(du.axial_data)
                    var_ratio = raw_var/uniformly_sampled_data_var
                    if var_ratio > 2:
                        du.write_to_log("Bad trace at {}".format(du.data_interval.starttime))
                    deconvolved_data, r_xx0 = du.deconvolve_trace(uniformly_sampled_data)
                    correlated_trace = du.correlate_trace(uniformly_sampled_data, deconvolved_data)
                    filtered_correlated_trace = du.bandpass_filter_trace(correlated_trace)
                    trimmed_corr_trace = du.trim_trace(filtered_correlated_trace)
                    
                    #status = write_to_db_using_thiago_function()

#                    pdb.set_trace()
                    fig1 = plt.figure(1)
                    plt.plot(du.digitizer_timestamps, du.axial_data, 'k', marker=".")
                    plt.plot(du.ideal_timestamps, uniformly_sampled_data, 'r', marker=".")
                    plt.title("Data Interval From {} to {}\n Original Sampling Rate {} \nAxial Data Var: {}, Interp Data Var:{}, Ratio: {}".format(du.data_interval.starttime,du.data_interval.endtime,du.metadata.sensor_true_sampling_rate,raw_var,uniformly_sampled_data_var,var_ratio))
                    fig2 = plt.figure(2)
#                    plt.plot(du.digitizer_timestamps,du.tangential_data,'k',marker=".");
#                    uniformly_sampled_data = du.interpolate_data(du.tangential_data)
#                    plt.plot(du.ideal_timestamps,uniformly_sampled_data,'r',marker=".");
                    plt.plot(trimmed_corr_trace)
                    plt.show(block=False)
                    plt.pause(0.05)
                    fig1.clf()
                    fig2.clf()
                    du.move_to_next_data_interval()
#                    print(du.metadata)
#                    time.sleep(1-collection_time.total_seconds())
    #                pdb.set_trace()
            #           print('natal wrote data, going to sleep')
            #        else:
            #            print('natal n/c , napping')
            #            print('{}'.format(datetime.now()))
            #            time.sleep(5)
            #            print("Processing {}".format(du.status))
            #            du.change_status()
                else:
                    os.system( 'clear' )
                    print("Data Interval not in Database - Sleeping")
#                    time.sleep(5)
            else:    
                os.system( 'clear' )
                print("No Data in Database - Sleeping")
#                time.sleep(5)
            t1 = datetime.now()
            processing_time = t1-t0
            print("Took {} seconds to process new data".format(processing_time))
            du.write_to_log("Took {} seconds to process new data".format(processing_time))

    except (KeyboardInterrupt, SystemExit): #when you press ctrl+c
        log.close()
        print ("Done.\nExiting.")
    except:
        print(sys.exc_info())
        pdb.set_trace()
#

if __name__ == "__main__":
    main()

