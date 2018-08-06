import math
import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np
import pdb

from matplotlib.ticker import MultipleLocator

from dcrhino.analysis.drill_string import get_drill_string
from dcrhino.analysis.util.general_helper_functions import init_logging

logger = init_logging(__name__)
drill_string = get_drill_string(None, None, None)#
plt.rcParams['figure.figsize'] = [20, 12]

#<Import these from a parameter or config file>

ADS = drill_string.cross_sectional_area
RBeff = drill_string.bit_radius
f = 150 #what is f?s
#</Import these from a parameter or config file>

def remove_non_physical_log_entries(df):
    """
    we remove entries where
    1. peak y is greater than 4 * peak x
    which is to say when the tangential > 4*vertical.
    2. peak z is greater than 4 * peak x
    which is to say when the radial > 4*vertical.
    3. when the multiple peak is less than 1% the primary reflection.
    df.peak_mult_x / df.peak_ampl_x < 0.01
    4. when the multiple is more than 60% of the primary
    (df.peak_mult_x / df.peak_ampl_x) > 0.6
    """
    original_length = len(df)
    df = df.drop(df[(df.peak_ampl_y) > (4 * df.peak_ampl_x)].index)
    df = df.drop(df[(df.peak_ampl_z) > (4 * df.peak_ampl_x)].index)
    df = df.drop(df[(df.peak_mult_x / df.peak_ampl_x) < 0.01].index)
    df = df.drop(df[(df.peak_mult_x / df.peak_ampl_x) > 0.60].index)
    final_length = len(df)
    if final_length != original_length:
        logger.info("Dropped {} entries from log".format(original_length-final_length))
    return df




class WellLogPlotter():
    def __init__(self, well_log_input):
        #df = pd.read_csv(filepath, parse_dates=['datetime'])
        #df = df.dropna()

        #self.input_filename = os.path.basename(filepath)
        #self.filepath = filepath
        #self.df = df
        self.well_log_input = well_log_input


    def plot(self):
        df = self.well_log_input.df_rhino

#        # pick peakamp and multiamp from the dataframe
#        df.peak_ampl_x = df.peak_ampl_x / 1000
#        df.peak_ampl_y = df.peak_ampl_y / 1000
#        df.peak_ampl_z = df.peak_ampl_z / 1000
#        df.peak_mult_x = df.peak_mult_x / 1000

        # smoothing
        # df['peak_ampl_x'] = df.groupby('hole_id')['peak_ampl_x'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)
        # df['peak_ampl_y'] = df.groupby('hole_id')['peak_ampl_y'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)
        # df['peak_ampl_z'] = df.groupby('hole_id')['peak_ampl_z'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)
        # df['peak_mult_x'] = df.groupby('hole_id')['peak_mult_x'].rolling(25, min_periods=1).mean().reset_index(0, drop=True)



#        m_amp = df_per_hole.peak_mult_x.apply(np.sqrt)
#        p_amp = df_per_hole.peak_ampl_x.apply(np.sqrt)
#        df_per_hole['AI'] = ((1 - (m_amp/p_amp)) / (1 + (m_amp/p_amp))) * 4755 * 7700 * ADS
#        df_per_hole['AI'] = df_per_hole['AI'] * RBeff / f
#        df.loc[df_per_hole.index, 'AI'] = df_per_hole['AI']

        #COMPUTE UCS
#        ucs_max = 200
#        ucs_min = 40
#        ucs_mean = (ucs_max - ucs_min ) / 2
#
#        alpha = ucs_mean / p_amp.median()
#        df_per_hole['UCS'] = p_amp * alpha
#        df.loc[df_per_hole.index, 'UCS'] = df_per_hole['UCS']
#
#        #density (g/cc)  = (MI/1486/(UCS^1/3))^.5/10^6
#        s1 = (df_per_hole['AI']/1486/(np.power(df_per_hole['UCS'], 1./3)))
#        s2 = np.power(s1, 1./2)
#        df.loc[df_per_hole.index, 'density'] = s2
#
#
#        global_ai_median = df['AI'].median()

        df = df[df.UCS > 40]

        for dummy_hole_id, df_per_hole in df.groupby('dummy_hole_id'):
            hole_id = df_per_hole['hole_id'].min()

            AI_max = 100
            AI_min = 20
            #compute AI_median for each hole
            AI_mean = (AI_max-AI_min) / 2
            alpha =  AI_mean / global_ai_median
            df_per_hole['AI'] = df_per_hole['AI'] * alpha

            density_min = 0
            density_max = 5
            density_mean = (density_max - density_min) / 2
            alpha = density_mean / df['density'].median()
            df_per_hole['density'] = df_per_hole['density'] * alpha


            #plotting
            plt.rcParams['figure.figsize'] = [30, 40]

            fig = plt.figure(33)
            fig.subplots_adjust(wspace=0.1)
            label_fontsize = 22
            title_fontsize = 30
            tick_fontsize = 17
            legend_fontsize = 20

            plt.rc('legend',fontsize=legend_fontsize)

            title_line1 = 'RHINo Logs, Mont Wright, Labrador, Ca, {}'.format(df_per_hole['datetime'].min().strftime("%B %d, %Y"))
            bench = "Bench: {}".format(df_per_hole['bench'].min())
            pattern = "Pattern: {}".format(df_per_hole['pattern'].min())
            hole = "Hole: {}".format(df_per_hole['hole'].min())
            hId = "Hole ID: {}".format(hole_id)
            title_line2 = ", ".join([bench, pattern, hole, hId])
            title_text = [title_line1, title_line2]
            plt.suptitle("\n\n".join(title_text), y=0.95, fontsize=title_fontsize)

            #Plot AI
            ax = {}
            ax[0] = plt.subplot(1, 4, 1)

            plt.plot(df_per_hole['AI'], df_per_hole.depth, label='MI')
            plt.legend()
            plt.xlabel('New UCS(Old MI) (GPa)', fontsize=label_fontsize)
            plt.ylabel('Depth (meters)', fontsize=label_fontsize)

            ax[0].invert_yaxis()
            ax[0].tick_params(axis='both', which="major", labelsize=tick_fontsize)
            ax[0].set_yticks(np.arange(math.floor(df_per_hole.depth.min()), math.ceil(df_per_hole.depth.max()), 1))
            ai_xlim_min = df_per_hole['AI'].min() - df_per_hole['AI'].min() * 0.3
            ai_xlim_max = df_per_hole['AI'].max() + df_per_hole['AI'].max() * 0.2
            #xlim_max = 120
            ax[0].set_xlim([ai_xlim_min, ai_xlim_max])

            plt.grid(axis='y', ls='solid')
            ax[0].yaxis.set_major_locator(MultipleLocator(1))
            ax[0].yaxis.set_minor_locator(MultipleLocator(0.1))
            ax[0].yaxis.grid(True,'minor')
            ax[0].yaxis.grid(True,'major',linewidth=2)

            #Plot UCS
            ax[1] = plt.subplot(1, 4, 2)
            plt.plot(df_per_hole['UCS'], df_per_hole.depth, color='brown', label='UCS')
            plt.legend()
            plt.xlabel('Old UCS (MPa)', fontsize=label_fontsize)

            ax[1].invert_yaxis()
            ax[1].tick_params(axis='both', which="major", labelsize=tick_fontsize)
            ax[1].set_yticks(np.arange(math.floor(df_per_hole.depth.min()), math.ceil(df_per_hole.depth.max()), 1))
            ucs_xlim_min = df_per_hole['UCS'].min() - df_per_hole['UCS'].min() * 0.3
            ucs_xlim_max = 120
            ax[1].set_xlim([ucs_xlim_min, ucs_xlim_max])

            plt.grid(axis='y', ls='solid')
            ax[1].yaxis.set_major_locator(MultipleLocator(1))
            ax[1].yaxis.set_minor_locator(MultipleLocator(0.1))
            ax[1].yaxis.grid(True,'minor')
            ax[1].yaxis.grid(True,'major',linewidth=2)
            ax[1].tick_params(axis='y',labelleft=False)

            #Plot MSE
            ax[2] = plt.subplot(1, 4, 3)
            plt.plot(df_per_hole['mse'], df_per_hole.depth, color='black', label='MSE')
            ax[2].invert_yaxis()
            ax[2].tick_params(axis='both', which="major", labelsize=tick_fontsize)
            ax[2].tick_params(axis='y',labelleft=False)
            ax[2].legend(loc=1)
            ax[2].set_xlabel('MSE (MPa)', fontsize=label_fontsize)
            ax[2].set_yticks(np.arange(math.floor(df_per_hole.depth.min()), math.ceil(df_per_hole.depth.max()), 1))
            mse_xlim_min = df_per_hole['mse'].min() - df_per_hole['mse'].min() * 0.3
            mse_xlim_max = 500
            ax[2].set_xlim([mse_xlim_min, mse_xlim_max])

            plt.grid(axis='y', ls='solid')
            ax[2].yaxis.set_major_locator(MultipleLocator(1))
            ax[2].yaxis.set_minor_locator(MultipleLocator(0.1))
            ax[2].yaxis.grid(True,'minor')
            ax[2].yaxis.grid(True,'major',linewidth=2)

            #Plot density
            ax[3] = plt.subplot(1, 4, 4)
            plt.plot(df_per_hole['density'], df_per_hole.depth, color='olive', label='Density')
            ax[3].invert_yaxis()
            ax[3].tick_params(axis='both', which="major", labelsize=tick_fontsize)
            ax[3].tick_params(axis='y',labelleft=False)
            ax[3].legend(loc=1)
            ax[3].set_xlabel('Density (g/cc)', fontsize=label_fontsize)
            ax[3].set_yticks(np.arange(math.floor(df_per_hole.depth.min()), math.ceil(df_per_hole.depth.max()), 1))

            plt.grid(axis='y', ls='solid')
            ax[3].yaxis.set_major_locator(MultipleLocator(1))
            ax[3].yaxis.set_minor_locator(MultipleLocator(0.1))
            ax[3].yaxis.grid(True,'minor')
            ax[3].yaxis.grid(True,'major',linewidth=2)

            output_dir = os.path.dirname(self.filepath)
            plt.savefig(os.path.join(output_dir, '{}-well-log-{}-{}.png'.format(self.input_filename, dummy_hole_id, hole_id)))
            plt.clf()
