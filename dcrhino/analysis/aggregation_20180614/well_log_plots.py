import math
import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np
import pdb
from math import pi
import scipy.signal as ssig

from matplotlib.ticker import MultipleLocator

from dcrhino.constants import DATA_PATH
from dcrhino.analysis.data_cloud_measurands import MeasurandDataKey

plt.rcParams['figure.figsize'] = [20, 12]


#def
class WellLogPlots():
    """
    TODO: Factor the calculation of quantities and the plotting into separate methods
    """
    def __init__(self, filepath=""):
        df = pd.read_csv(filepath, parse_dates=['datetime'])

        df = df.dropna()

        self.df = df
        self.mwd_hole_id = filepath.split('.')[0]

    def plot(self, filepath=""):
        df = self.df
        pdb.set_trace()
        df = df[df.depth>0]
        # pick peakamp and multiamp from the dataframe
        df.peak_ampl_x = df.peak_ampl_x / 1000.
        df.peak_ampl_y = df.peak_ampl_y / 1000.
        df.peak_ampl_z = df.peak_ampl_z / 1000.
        df.peak_mult_x = df.peak_mult_x / 1000.

        df = df.drop(df[(df.peak_ampl_y) > (4 * df.peak_ampl_x)].index)
        df = df.drop(df[(df.peak_ampl_z) > (4 * df.peak_ampl_x)].index)
        # df = df.drop(df[(df.peakamp_channel1) < 0.75].index)
        #pdb.set_trace()

        #df = df.drop(df[(df.peak_ampl_x) > 0.25])
        df = df.drop(df[((df.peak_mult_x / df.peak_ampl_x) < 0.01) | ((df.peak_mult_x / df.peak_ampl_x) > 0.6)].index)
        #pdb.set_trace()

        # smoothing
        P = df['peak_ampl_x']
        M = df['peak_mult_x']
        apod = ssig.hamming(50)
        P_smooth = np.convolve(P,apod/np.sum(apod), 'same')
        M_smooth = np.convolve(M,apod/np.sum(apod), 'same')
#        P_smooth = ssig.filtfilt(np.ones(12)/12.,1.,  P, 'same')
        x=np.arange(len(P))
#        plt.plot(x, P, label='p')
#        plt.plot(x, P_smooth, label='smooth p')
#        plt.legend()
#        plt.show()
#        df['peak_ampl_x'] = df['peak_ampl_x'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)
#        df['peak_ampl_y'] = df['peak_ampl_y'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)
#        df['peak_ampl_z'] = df['peak_ampl_z'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)
#        df['peak_mult_x'] = df['peak_mult_x'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)
#<SANITY CHECK 1>
#        fig, ax = plt.subplots(2)
#        ax[0].plot(df['peak_ampl_x'],label='peak amplitude');ax[0].legend()
#        #ax[0].set_xlim([0, 16.4])
#        #ax[0].set_ylim([51000, 54000])
#        #ax[0].set_ylabel('Seconds into Day')
#        plt.suptitle('Peak and multiple amplitudes {}'.format(self.mwd_hole_id))
#
#        ax[1].plot(df['peak_mult_x'],label='multiple');ax[1].legend()
##        ax[1].set_xlim([0, 16.4])
##        ax[1].set_ylim([51000, 54000])
##        ax[1].set_ylabel('Seconds into Day')
#        ax[1].set_xlabel('trace Number')
#        plt.show(
#</SANITY CHECK 1>)

#        for name, group in df.groupby('hole_id'):
        # Compute AI
        ODDS = 0.27  # outer diameter of drillstring in m--will come from Karl later
        IDDS =  0.21 # inner diameter of drillstring in m--will come from Karl later
        DB = 34.5 # diameter of bit
        ADS = pi/2*(ODDS * ODDS - IDDS * IDDS) # cross sectional area of drillstring
        AB = pi/2*DB
        RBeff = DB/2
        f = 150
        pdb.set_trace()
        df_per_hole = df.copy()
        #P = df['peak_ampl_x']
        #M = df['peak_mult_x']
        A = np.sqrt(M_smooth/P_smooth)
        Z = (1-A)/(1+A)
        Z = Z * 4755 * 7700 * ADS* RBeff / f
        Z_median = np.median(Z)
        Z_mean = np.mean(Z)
        Z_alpha =  45 / Z_median
        Z *= Z_alpha
        pdb.set_trace()

        #plt.plot(Z);plt.show()
        UCS = np.sqrt(P_smooth)#/np.median(P_smooth))
        ucs_mean = (500 - 25) / 2
        UCS = UCS * ucs_mean / np.sqrt(np.median(P_smooth))

        fig, ax = plt.subplots(3)
        ax[0].plot(x, Z,label='impedance');
        ax[0].legend()
        #ax[0].set_xlim([0, 16.4])
        #ax[0].set_ylim([51000, 54000])
        #ax[0].set_ylabel('Seconds into Day')
        plt.suptitle('Peak and multiple amplitudes {}'.format(self.mwd_hole_id))

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
        df_per_hole['AI'] = Z
        df_per_hole['ucs'] = UCS
        #df_per_hole['v']
        pdb.set_trace()


        m_amp = df_per_hole.peak_mult_x.apply(np.sqrt)
        p_amp = df_per_hole.peak_ampl_x.apply(np.sqrt)
        df_per_hole['AI'] = ((1 - (m_amp/p_amp)) / (1 + (m_amp/p_amp))) * 4755 * 7700 * ADS
        df_per_hole['AI'] = df_per_hole['AI'] * RBeff / f

        AI_max = 100
        AI_min =10
        	    #Compute AI_median for each hole
        AI_median = df_per_hole['AI'].median()
        AI_mean = (AI_max-AI_min) / 2
        alpha =  AI_mean / AI_median
        df_per_hole['AI'] = df_per_hole['AI'] * alpha


        #COMPUTE UCS
        # Formulae
        # ucs_i = alpha(sqrt(peakamp_i))
        # Alpha is unknown and has to be found.
        # Steps to compute alpha.

        # Compute peakamp_median from one hole.
        # ucs_mean = (ucs_max - ucs_min) / 2
        # This example uses ucs_min = 25 and ucs_max = 500
        # alpha = ucs_mean / sqrt(peakamp_median)


        #compute peakamp_median
        peakamp_median = df_per_hole['peak_ampl_x'].median()

        #we are going to assume ucs_min = 25 and ucs_max = 500
        ucs_mean = (500 - 25) / 2

        alpha = ucs_mean / math.sqrt(peakamp_median)
        df_per_hole['ucs'] = df_per_hole['peak_ampl_x'].apply(np.sqrt) * alpha

        #COMPUTE V

        # Formulae
        # v_i = alpha(ucs_i/(ai_i))

        # Alpha is unknown and has to be found.
        # alpha = v_mean / median(ucs / ai)
        # vmean = v_max - v_min / 2
        # assume, v_min = 2000 and v_max = 4000
        v_mean = (4000 - 2000) / 2
        ucs_ai_median = (df_per_hole.ucs/df_per_hole.AI).median()
        alpha = v_mean / ucs_ai_median
        df_per_hole['v'] = alpha * (df_per_hole.ucs / df_per_hole.AI)

        # Compute P

        # Formulae
        # p_i = alpha(AI_i / V_i)
        # Alpha is unknown and has to be found.
        # alpha = p_mean / median(AI / V)
        # p_mean = (p_max - p_min) / 2
        # assume, p_min = 2 and p_max = 4

        p_min = 2
        p_max = 4
        p_mean = (p_max - p_min) / 2.
        ai_v_median = (df_per_hole.AI / df_per_hole.v).median()
        alpha = p_mean / ai_v_median

        df_per_hole['p'] = alpha * (df_per_hole.AI / df_per_hole.v)


        #plotting
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

#        ax2 = ax[2].twiny()
#        #ax2.plot(df_per_hole['p'], df_per_hole.depth, color='red', label='Density')
#        ax2.plot(df_per_hole['AI']/df_per_hole['ucs'], df_per_hole.depth, color='red', label='AI/UCS')
#        ax2.legend(loc=2)
#        ax2.set_xlabel('Density', fontsize=label_fontsize)
#        xlim_min = df_per_hole['p'].min() - df_per_hole['p'].min() * 0.2
#        xlim_max = df_per_hole['p'].max() + df_per_hole['p'].max() * 0.2
#        ax2.set_xlim([xlim_min, xlim_max])
#        plt.ylabel('Depth', fontsize=label_fontsize)
#        ax[2].invert_yaxis()
#        ax[2].tick_params(axis='y',labelleft=False)


        plt.grid(axis='y', ls='solid')
        ax[2].yaxis.set_major_locator(MultipleLocator(1))
        ax[2].yaxis.set_minor_locator(MultipleLocator(0.1))
        ax[2].yaxis.grid(True,'minor')
        ax[2].yaxis.grid(True,'major',linewidth=2)
        #plt.show()
        print('saving')
        plt.savefig(os.path.join(DATA_PATH, 'well-log-{}.png'.format(self.mwd_hole_id)))
        plt.clf()
