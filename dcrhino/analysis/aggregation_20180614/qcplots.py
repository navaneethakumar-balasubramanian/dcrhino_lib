# import math
# import pandas as pd
# import matplotlib.pyplot as plt
# import matplotlib.gridspec as gridspec
# from matplotlib.ticker import MultipleLocator
# import numpy as np

# plt.rcParams['figure.figsize'] = [20, 12]

# # read CSV and dropnas
# df = pd.read_csv("../data/final_SSX64601_BH1-BH2_Ch32_peak.csv")
# df = df.dropna()
# df.columns = [
#         'ts',
#         'hole_id',
#         'peakamp_channel1',
#         'peakamp_channel2',
#         'peakamp_channel3',
#         'multiamp_channel1',
#         'multiamp_channel2',
#         'multiamp_channel3'
#         ]
# df.head()
# df = df.drop(df[(df.peakamp_channel2) > (4 * df.peakamp_channel1)].index)
# df = df.drop(df[(df.peakamp_channel3) > (4 * df.peakamp_channel1)].index)
# #df = df.drop(df[(df.peakamp_channel1) < 0.75].index)
# df = df.drop(df[((df.multiamp_channel1 / df.peakamp_channel1) < 0.01) | ((df.multiamp_channel1 / df.peakamp_channel1) > 0.6)].index)

#if(peakamp(channel2) > 4 * peakamp(channel1))
#||
#(peakamp(channel3) > 4 * peakamp(channel1))
#||
#(peakamp(channel1) < 0.75)
#||
#[(multiamp(channel2) / peakamp(channel1)) < 0.01 || (multiamp(channel2) / peakamp(channel1)) > 0.6]
#
#{    THROW OUT THE DATA WHICH IS TRUE FOR ANY OF THE ABOVE CONDITION    }



# pick peakamp and multiamp from the dataframe
#amps = df.iloc[:, [5,6]]
#amps.columns = ["peakamp", "multiamp"]
#amps.peakamp = amps.peakamp / 1000
#amps.multiamp = amps.multiamp / 1000
#amps.head()
#
## smoothing
#amps = amps.rolling(25, min_periods=1).mean()
#
## Compute AI
#derived = df[['hole', 'depth']]
#m_amp = amps.multiamp.apply(np.sqrt)
#p_amp = amps.peakamp.apply(np.sqrt)
#derived['AI'] = ((1 - (m_amp/p_amp)) / (1 + (m_amp/p_amp))) * math.sqrt(206.7640)
#
#
##COMPUTE UCS
## Formulae
## ucs_i = alpha(sqrt(peakamp_i))
## Alpha is unknown and has to be found.
## Steps to compute alpha.
#
## Compute peakamp_median from one hole.
## ucs_mean = (ucs_max - ucs_min) / 2
## This example uses ucs_min = 25 and ucs_max = 500
## alpha = ucs_mean / sqrt(peakamp_median)
#
##create dataframe
#hole_peakamp = df[['hole', 'avg_lvl1', 'depth']]
#hole_peakamp.columns = ['hole', 'peakamp', 'depth']
#hole_peakamp = hole_peakamp.dropna()
#
##smoothing
#hole_peakamp['peakamp'] = hole_peakamp.groupby('hole')['peakamp'].apply(pd.rolling_mean, 25, min_periods=1)
#
##compute peakamp_median
#peakamp_median = hole_peakamp['peakamp'].median()
#
##we are going to assume ucs_min = 25 and ucs_max = 500
#ucs_mean = 500 - 25 / 2
#
#alpha = ucs_mean / math.sqrt(peakamp_median)
#derived['ucs'] = hole_peakamp['peakamp'].apply(np.sqrt) * alpha
#
##COMPUTE V
#
## Formulae
## v_i = alpha(ucs_i/(ai_i))
#
## Alpha is unknown and has to be found.
## alpha = v_mean / median(ucs / ai)
## vmean = v_max - v_min / 2
## assume, v_min = 2000 and v_max = 4000
#v_mean = (4000 - 2000) / 2
#ucs_ai_median = (derived.ucs/derived.AI).median()
#alpha = v_mean / ucs_ai_median
#derived['v'] = alpha * (derived.ucs / derived.AI)
#
## Compute P
#
## Formulae
## p_i = alpha(AI_i / V_i)
## Alpha is unknown and has to be found.
## alpha = p_mean / median(AI / V)
## p_mean = (p_max - p_min) / 2
## assume, p_min = 2 and p_max = 4
#
#p_min = 2
#p_max = 4
#p_mean = (p_max - p_min) / 2
#ai_v_median = (derived.AI / derived.v).median()
#alpha = p_mean / ai_v_median
#
#derived['p'] = alpha * (derived.AI / derived.v)
#
#derived_grouped_by_hole = derived.groupby('hole')
#ngroups = len(derived_grouped_by_hole)
#ncols = 3
#plt.rcParams['figure.figsize'] = [15, 25]
#
#for name, group in derived_grouped_by_hole:
#    fig = plt.figure()
#    fig.subplots_adjust(wspace=0.025)
#
#    #Plot AI
#    ax = plt.subplot(1, 3, 1)
#    plt.plot(group['AI'], group.depth, label='AI')
#    plt.legend()
#    plt.xlabel('AI')
#    plt.ylabel('Depth')
#
#    ax.invert_yaxis()
#    ax.set_yticks(np.arange(math.floor(group.depth.min()), math.ceil(group.depth.max()), 1))
#    xlim_min = group['AI'].min() - group['AI'].min() * 0.2
#    xlim_max = group['AI'].max() + group['AI'].max() * 0.2
#    ax.set_xlim([xlim_min, xlim_max])
#
#    plt.grid(axis='y', ls='solid')
#    ax.yaxis.set_major_locator(MultipleLocator(1))
#    ax.yaxis.set_minor_locator(MultipleLocator(0.1))
#    ax.yaxis.grid(True,'minor')
#    ax.yaxis.grid(True,'major',linewidth=2)
#
#    #Plot UCS
#    ax = plt.subplot(1, 3, 2)
#    plt.plot(group['ucs'], group.depth, color='brown', label='UCS')
#    plt.legend()
#    plt.xlabel('UCS')
#    plt.title('Plots for Hole-{}'.format(name), y=1.02, fontsize=30)
#
#    ax.invert_yaxis()
#    ax.set_yticks(np.arange(math.floor(group.depth.min()), math.ceil(group.depth.max()), 1))
#    xlim_min = group['ucs'].min() - group['ucs'].min() * 0.2
#    xlim_max = group['ucs'].max() + group['ucs'].max() * 0.2
#    ax.set_xlim([xlim_min, xlim_max])
#
#    plt.grid(axis='y', ls='solid')
#    ax.yaxis.set_major_locator(MultipleLocator(1))
#    ax.yaxis.set_minor_locator(MultipleLocator(0.1))
#    ax.yaxis.grid(True,'minor')
#    ax.yaxis.grid(True,'major',linewidth=2)
#    ax.tick_params(axis='y',labelleft=False)
#
#    #Plot Velocity and Density
#    ax1 = plt.subplot(1, 3, 3)
#    plt.plot(group['v'], group.depth, color='black', label='Velocity')
#    ax1.legend(loc=1)
#    ax1.set_xlabel('Velocity')
#    ax1.set_yticks(np.arange(math.floor(group.depth.min()), math.ceil(group.depth.max()), 1))
#    xlim_min = group['v'].min() - group['v'].min() * 0.2
#    xlim_max = group['v'].max() + group['v'].max() * 0.2
#    ax1.set_xlim([xlim_min, xlim_max])
#
#    ax2 = ax1.twiny()
#    ax2.plot(group['p'], group.depth, color='red', label='Density')
#    ax2.legend(loc=2)
#    ax2.set_xlabel('Density')
#    xlim_min = group['p'].min() - group['p'].min() * 0.2
#    xlim_max = group['p'].max() + group['p'].max() * 0.2
#    ax2.set_xlim([xlim_min, xlim_max])
#    plt.ylabel('Depth')
#    ax1.invert_yaxis()
#    ax1.tick_params(axis='y',labelleft=False)
#
#
#    plt.grid(axis='y', ls='solid')
#    ax1.yaxis.set_major_locator(MultipleLocator(1))
#    ax1.yaxis.set_minor_locator(MultipleLocator(0.1))
#    ax1.yaxis.grid(True,'minor')
#    ax1.yaxis.grid(True,'major',linewidth=2)
#
#    plt.savefig('well-log-{}.png'.format(name))
