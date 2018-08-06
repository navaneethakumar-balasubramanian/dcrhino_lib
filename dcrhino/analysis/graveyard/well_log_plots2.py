import math
import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np
import pdb
from math import pi

from matplotlib.ticker import MultipleLocator

from dcrhino.constants import DATA_PATH
from dcrhino.analysis.data_cloud_measurands import MeasurandDataKey

plt.rcParams['figure.figsize'] = [20, 12]

class WellLogPlots():
    def __init__(self, filepath=""):
        df = pd.read_csv(filepath, parse_dates=['datetime'])
        df = df.dropna()
        self.df = df

    def plot(self, filepath=""):

        df = self.df

        # pick peakamp and multiamp from the dataframe
        df.peak_ampl_x = df.peak_ampl_x / 1000.
        df.peak_ampl_y = df.peak_ampl_y / 1000.
        df.peak_ampl_z = df.peak_ampl_z / 1000.
        df.peak_mult_x = df.peak_mult_x / 1000.

        df = df.drop(df[(df.peak_ampl_y) > (4 * df.peak_ampl_x)].index)
        df = df.drop(df[(df.peak_ampl_z) > (4 * df.peak_ampl_x)].index)
        # df = df.drop(df[(df.peakamp_channel1) < 0.75].index)
        df = df.drop(df[((df.peak_mult_x / df.peak_ampl_x) < 0.01) | ((df.peak_mult_x / df.peak_ampl_x) > 0.6)].index)

        # smoothing
        df['peak_ampl_x'] = df.groupby('hole_id')['peak_ampl_x'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)
        df['peak_ampl_y'] = df.groupby('hole_id')['peak_ampl_y'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)
        df['peak_ampl_z'] = df.groupby('hole_id')['peak_ampl_z'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)
        df['peak_mult_x'] = df.groupby('hole_id')['peak_mult_x'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)

        for name, group in df.groupby('hole_id'):
            # Compute AI
            ODDS = 0.27  # outer diameter of drillstring in m--will come from Karl later
            IDDS =  0.21 # inner diameter of drillstring in m--will come from Karl later
            DB = 34.5 # diameter of bit
            ADS = pi/2*(ODDS * ODDS - IDDS * IDDS) # cross sectional area of drillstring
            AB = pi/2*DB
            ABeff = 0.01*AB
            RBeff = 0.1*DB/2
            f = 150

            df_per_hole = group.copy()
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
            plt.title('RHINO Logs , Blasthole {}, Mount Wright, Labrador, Ca, {}'.format(name, df_per_hole['datetime'].min().strftime("%B %d, %Y")), y=1.05, fontsize=20)

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
            plt.plot(df_per_hole['v'], df_per_hole.depth, color='black', label='Velocity')
            ax[2].legend(loc=1)
            ax[2].set_xlabel('Velocity', fontsize=label_fontsize)
            ax[2].set_yticks(np.arange(math.floor(df_per_hole.depth.min()), math.ceil(df_per_hole.depth.max()), 1))
            xlim_min = df_per_hole['v'].min() - df_per_hole['v'].min() * 0.2
            xlim_max = df_per_hole['v'].max() + df_per_hole['v'].max() * 0.2
            ax[2].set_xlim([xlim_min, xlim_max])

            ax2 = ax[2].twiny()
            ax2.plot(df_per_hole['p'], df_per_hole.depth, color='red', label='Density')
            ax2.legend(loc=2)
            ax2.set_xlabel('Density', fontsize=label_fontsize)
            xlim_min = df_per_hole['p'].min() - df_per_hole['p'].min() * 0.2
            xlim_max = df_per_hole['p'].max() + df_per_hole['p'].max() * 0.2
            ax2.set_xlim([xlim_min, xlim_max])
            plt.ylabel('Depth', fontsize=label_fontsize)
            ax[2].invert_yaxis()
            ax[2].tick_params(axis='y',labelleft=False)


            plt.grid(axis='y', ls='solid')
            ax[2].yaxis.set_major_locator(MultipleLocator(1))
            ax[2].yaxis.set_minor_locator(MultipleLocator(0.1))
            ax[2].yaxis.grid(True,'minor')
            ax[2].yaxis.grid(True,'major',linewidth=2)
            #plt.show()
            plt.savefig(os.path.join(DATA_PATH, 'well-log-{}.png'.format(name)))
            plt.clf()
