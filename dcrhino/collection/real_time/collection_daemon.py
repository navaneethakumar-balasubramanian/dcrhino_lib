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
        du = DataUnit()
    #    STATUS_PATH = du.params["PATH"]
        while True:
#            du.gpsd.next()
            if du.data_exists_in_database():
        #        if du.status == 'busy':
                #pdb.set_trace()
                if du.data_interval_in_database():
                    print('Fetching')
                    print("Sensor True Sampling Rate: {}".format(du.metadata.sensor_true_sampling_rate))
                    t0 = datetime.now()
#                    plt.figure(1)
#                    plt.plot(du.digitizer_timestamps,du.axial_data,'k',marker=".");
                    uniformly_sampled_data = du.interpolate_data(du.axial_data)
                    uniformly_sampled_data_var = np.var(uniformly_sampled_data)
                    raw_var = np.var(du.axial_data)
                    var_ratio = raw_var/uniformly_sampled_data_var
                    if var_ratio > 2:
                        pdb.set_trace()
                    deconvolved_data, r_xx0 = du.deconvolve_trace(uniformly_sampled_data)
                    correlated_trace = du.correlate_trace(uniformly_sampled_data, deconvolved_data)
                    filtered_correlated_trace = du.bandpass_filter_trace(correlated_trace)
                    trimmed_corr_trace = du.trim_trace(filtered_correlated_trace)
                    
                    #status = write_to_db_using_thiago_function()

#                    pdb.set_trace()
                    plt.figure(1)
                    plt.plot(du.digitizer_timestamps, du.axial_data, 'k', marker=".")
                    plt.plot(du.ideal_timestamps, uniformly_sampled_data, 'r', marker=".")
                    plt.title("Axial Data Var: {}, Interp Data Var:{}, Ratio: {}".format(raw_var,uniformly_sampled_data_var,var_ratio))
                    plt.figure(2)
#                    plt.plot(du.digitizer_timestamps,du.tangential_data,'k',marker=".");
#                    uniformly_sampled_data = du.interpolate_data(du.tangential_data)
#                    plt.plot(du.ideal_timestamps,uniformly_sampled_data,'r',marker=".");
                    plt.plot(trimmed_corr_trace)
                    plt.show()
                    du.move_to_next_data_interval()
                    t1 = datetime.now()
                    collection_time = t1-t0
                    print("Took {} seconds to fetch new data".format(collection_time))
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
                    os.system( 'cls' )
                    print("Data Interval not in Database - Sleeping")
#                    time.sleep(5)
            else:    
                os.system( 'cls' )
                print("No Data in Database - Sleeping")
#                time.sleep(5)

#    except (KeyboardInterrupt, SystemExit): #when you press ctrl+c
#        print ("\nKilling Thread...")
#        du.gpsp.running = False
#        du.gpsp.join() # wait for the thread to finish what it's doing
#        print ("Done.\nExiting.")
    except:
        print(sys.exc_info())
        pdb.set_trace()
#

if __name__ == "__main__":
    main()

