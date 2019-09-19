"""
/home/kkappler/software/datacloud/dcrhino_lib/dcrhino3/feature_extraction/jazz3.py
this can likely be done much nicer with analytic curve fitting but for first cut
lets just do with crude samples.  Also, Jazz3 solutions can be found in the troughs of jazz2,
so to make jazz2 and then pick the minima of left trough and right trough.  Do it
specfically by the first place the derivative changes;

"""
import matplotlib.pyplot as plt
import numpy as np
import pdb

#from dcrhino3.models.interval import TimePeriod
#from dcrhino3.models.trace_dataframe import TraceData
#from dcrhino3.signal_processing.symmetric_trace import SymmetricTrace
#from dcrhino3.feature_extraction.jazz_with_zero_crossings import  initialize_jazz2_dict
#from dcrhino3.feature_extraction.jazz_with_zero_crossings import  jazz2
#from dcrhino3.feature_extraction.jazz_with_zero_crossings import missing_zero_crossing
from dcrhino3.feature_extraction.jazz_with_zero_crossings import semi_theoretical_tick_times



class DataWindow(object):
    def __init__(self, time, data):
        self.time = time
        self.data = data


def sanity_check_plot_jazz3(left_trough_dw, positive_peak_dw, right_trough_dw,
                            left_half_trough_dw, right_half_trough_dw,
                                expected_trough_duration, tick_times, ttl_string):
    wiggly_wiggle = np.hstack((left_trough_dw.data, positive_peak_dw.data, right_trough_dw.data))
    tick_heights = 0.1 * np.ptp(wiggly_wiggle)
    fig, ax = plt.subplots(1, 1)

    tick_times_semi_theoretical = semi_theoretical_tick_times(tick_times, expected_trough_duration)
    ax.plot(left_trough_dw.time, left_trough_dw.data, label='left');
    ax.plot(positive_peak_dw.time, positive_peak_dw.data, label='peak');
    ax.plot(right_trough_dw.time, right_trough_dw.data, label='right');
    ax.plot(left_half_trough_dw.time, left_half_trough_dw.data, label='jazz3_left', color='cyan', linewidth=3.4)
    ax.plot(right_half_trough_dw.time, right_half_trough_dw.data, label='jazz3_right', color='cyan', linewidth=3.4)
    ax.hlines(0, left_trough_dw.time[0], right_trough_dw.time[-1], color='black');
    ax.vlines(tick_times, -tick_heights/2, tick_heights/2, color='lime', label='ticktimes')
    ax.vlines([tick_times[1]-expected_trough_duration, tick_times[2]+expected_trough_duration],
              -tick_heights / 2, tick_heights / 2, color='purple')
    ax.set_xlabel(('Time (s)'))
    ax.set_xlabel('Wavelet Amplitude')
    ax.legend();
    ax.set_title(ttl_string)
    ax.fill_between(left_trough_dw.time, left_trough_dw.data, where=left_trough_dw.time> tick_times_semi_theoretical[0],
                    facecolor='green', interpolate=True)
    ax.fill_between(right_trough_dw.time, right_trough_dw.data, where=right_trough_dw.time < tick_times_semi_theoretical[3],
                    facecolor='red', interpolate=True)
    plt.show(block=True)
    #plt.show()



def main():
    pass


if __name__ == '__main__':
    main()
    print('success!')
