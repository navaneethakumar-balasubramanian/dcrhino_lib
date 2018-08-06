import math
import os
import pandas as pd
import matplotlib.pyplot as plt
#import matplotlib.gridspec as gridspec
import numpy as np
import pdb
from math import pi
import scipy.signal as ssig

from matplotlib.ticker import MultipleLocator

from dcrhino.constants import DATA_PATH
from dcrhino.analysis.math.rock_properties_calculations import calculate_impedance

plt.rcParams['figure.figsize'] = [20, 12]

#<Import these from a parameter or config file>
# Compute AI
ODDS = 0.27  # outer diameter of drillstring in m--will come from Karl later
IDDS =  0.21 # inner diameter of drillstring in m--will come from Karl later
DB = 34.5 # diameter of bit
ADS = pi/2*(ODDS * ODDS - IDDS * IDDS) # cross sectional area of drillstring
AB = pi/2*DB
RBeff = DB/2
f = 150
#</Import these from a parameter or config file>

def sanity_check_peak_mult_peak_ampl(df, mwd_hole_id=''):
    fig, ax = plt.subplots(2)
    ax[0].plot(df['peak_ampl_x'],label='peak amplitude'); ax[0].legend()
    #ax[0].set_xlim([0, 16.4])
    #ax[0].set_ylim([51000, 54000])
    #ax[0].set_ylabel('Seconds into Day')
    plt.suptitle('Peak and multiple amplitudes {}'.format(mwd_hole_id))

    ax[1].plot(df['peak_mult_x'],label='multiple'); ax[1].legend()
    #ax[1].set_xlim([0, 16.4])
    #ax[1].set_ylim([51000, 54000])
    #ax[1].set_ylabel('Seconds into Day')
    ax[1].set_xlabel('trace Number')
    plt.show()



def calculate_ucs(P):
    """
    NOTE The median normalization should be over all the holes
    """
    ucs = np.sqrt(P)
    ucs_mean = (500 - 25) / 2
    alpha = ucs_mean / np.sqrt(np.median(P))
    ucs *= alpha
    return ucs


def sanity_check_ucs_ai(Z, UCS, mwd_hole_id=''):
    """
    """
    x = np.arange(len(Z))#dummsy trace axis for plotting
    fig, ax = plt.subplots(3)
    ax[0].plot(x, Z,label='impedance');
    ax[0].legend()
    #ax[0].set_xlim([0, 16.4])
    #ax[0].set_ylim([51000, 54000])
    #ax[0].set_ylabel('Seconds into Day')
    plt.suptitle('Peak and multiple amplitudes {}'.format(mwd_hole_id))

    ax[1].plot(x, UCS, label='sqrt(Peak Ampl)');ax[1].legend()
#        ax[1].set_xlim([0, 16.4])
#        ax[1].set_ylim([51000, 54000])
#        ax[1].set_ylabel('Seconds into Day')
    #ax[1].set_xlabel('trace Number')
#        plt.show(
    #
    ax[2].plot(x, UCS/Z, label='UCS/AI');ax[2].legend()
#        ax[1].set_xlim([0, 16.4])
#        ax[1].set_ylim([51000, 54000])
#        ax[1].set_ylabel('Seconds into Day')
    ax[2].set_xlabel('trace Number')
#        plt.show(
    #plt.plot(UCS);
    plt.show()

class WellLogPlots():
    """
    TODO: Factor the calculation of quantities and the plotting into separate methods
    """
    def __init__(self, filepath=""):
        df = pd.read_csv(filepath, parse_dates=['datetime'])
        #df = df.dropna()
        self.df = df
        self.mwd_hole_id = filepath.split('.')[0]

    def extract_smoothed_series_from_log_csv(self, df):
        """
        """
        df = df[df.depth>0]#plot with and without this to sanity check
        # pick peakamp and multiamp from the dataframe
        df.peak_ampl_x = df.peak_ampl_x / 1000.
        df.peak_ampl_y = df.peak_ampl_y / 1000.
        df.peak_ampl_z = df.peak_ampl_z / 1000.
        df.peak_mult_x = df.peak_mult_x / 1000.

        df = df.drop(df[(df.peak_ampl_y) > (4 * df.peak_ampl_x)].index)
        df = df.drop(df[(df.peak_ampl_z) > (4 * df.peak_ampl_x)].index)

        df = df.drop(df[((df.peak_mult_x / df.peak_ampl_x) < 0.01) | ((df.peak_mult_x / df.peak_ampl_x) > 0.6)].index)

        # smoothing
        P = df['peak_ampl_x']
        M = df['peak_mult_x']
        apod = ssig.hamming(5)
        P_smooth = np.convolve(P,apod/np.sum(apod), 'same')
        M_smooth = np.convolve(M,apod/np.sum(apod), 'same')
        #sanity_check_peak_mult_peak_ampl(df, mwd_hole_id=self.mwd_hole_id)
        return P_smooth, M_smooth, df


    def plot(self, filepath=""):
        df = self.df
        P_smooth, M_smooth, df = self.extract_smoothed_series_from_log_csv(df)

        Z = calculate_impedance(P_smooth, M_smooth, ADS, RBeff, f)
        ucs = calculate_ucs(P_smooth)
        pdb.set_trace()
        #sanity_check_ucs_ai(Z, ucs, mwd_hole_id=self.mwd_hole_id)
        #df_per_hole = {}
        df_per_hole = df
        df_per_hole['AI'] = Z
        df_per_hole['ucs'] = ucs

        plt.rcParams['figure.figsize'] = [15, 25]

        fig = plt.figure(33)
        fig.subplots_adjust(wspace=0.025)
        label_fontsize = 15
        pdb.set_trace()
        #Plot AI
        ax = {}
        ax[0] = plt.subplot(1, 3, 1)

        plt.plot(df_per_hole['AI'], df_per_hole.depth, label='AI')
        plt.legend()
        plt.xlabel('AI', fontsize=label_fontsize)
        plt.ylabel('Depth', fontsize=label_fontsize)

        ax[0].invert_yaxis()
        ax[0].set_yticks(np.arange(math.floor(df_per_hole.depth.min()), math.ceil(df_per_hole.depth.max()), 1))
        xlim_min = df_per_hole['AI'].min() - df_per_hole['AI'].min() * 0.2
        xlim_max = df_per_hole['AI'].max() + df_per_hole['AI'].max() * 0.2
        ax[0].set_xlim([xlim_min, xlim_max])
        ax[0].set_xlim([0, 100])
        plt.grid(axis='y', ls='solid')
        ax[0].yaxis.set_major_locator(MultipleLocator(1))
        ax[0].yaxis.set_minor_locator(MultipleLocator(0.1))
        ax[0].yaxis.grid(True,'minor')
        ax[0].yaxis.grid(True,'major',linewidth=2)

        #Plot UCS
        ax[1] = plt.subplot(1, 3, 2)
        plt.plot(df_per_hole['ucs'], df_per_hole.depth, color='brown', label='UCS')
        plt.legend()
        plt.xlabel('UCS', fontsize=label_fontsize)
        pdb.set_trace()
        plt.title('RHINO Logs , Blasthole {}, Mount Wright, Labrador, Ca, {}'.format(self.mwd_hole_id,
                  df_per_hole['datetime'].min().strftime("%B %d, %Y")), y=1.05, fontsize=20)

        ax[1].invert_yaxis()
        ax[1].set_yticks(np.arange(math.floor(df_per_hole.depth.min()), math.ceil(df_per_hole.depth.max()), 1))
        xlim_min = df_per_hole['ucs'].min() - df_per_hole['ucs'].min() * 0.2
        xlim_max = df_per_hole['ucs'].max() + df_per_hole['ucs'].max() * 0.2
        ax[1].set_xlim([xlim_min, xlim_max])

        plt.grid(axis='y', ls='solid')
        ax[1].yaxis.set_major_locator(MultipleLocator(1))
        ax[1].yaxis.set_minor_locator(MultipleLocator(0.1))
        ax[1].yaxis.grid(True,'minor')
        ax[1].yaxis.grid(True,'major',linewidth=2)
        ax[1].tick_params(axis='y',labelleft=False)

        #Plot Velocity and Density
        ax[2] = plt.subplot(1, 3, 3)
        #plt.plot(df_per_hole['v'], df_per_hole.depth, color='black', label='Velocity')
        qty = df_per_hole['ucs']/df_per_hole['AI']
        plt.plot(qty, df_per_hole.depth, color='red', label='UCS/AI')
        ax[2].legend(loc=1)
        ax[2].set_xlabel('UCS/AI', fontsize=label_fontsize)
        ax[2].set_yticks(np.arange(math.floor(df_per_hole.depth.min()), math.ceil(df_per_hole.depth.max()), 1))
        xlim_min = qty.min() - qty.min() * 0.2
        xlim_max = qty.max() + qty.max() * 0.2
        ax[2].set_xlim([xlim_min, xlim_max])
        ax[2].invert_yaxis()



        plt.grid(axis='y', ls='solid')
        ax[2].yaxis.set_major_locator(MultipleLocator(1))
        ax[2].yaxis.set_minor_locator(MultipleLocator(0.1))
        ax[2].yaxis.grid(True,'minor')
        ax[2].yaxis.grid(True,'major',linewidth=2)
        #plt.show()
        print('saving')
        plt.savefig(os.path.join(DATA_PATH, 'well-log-{}x.png'.format(self.mwd_hole_id)))
        plt.clf()
        print('finished')
