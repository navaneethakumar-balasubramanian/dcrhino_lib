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





#def sanity_check_plot_jazz3(left_trough, positive_peak, right_trough,
#                            t_left_trough, t_positive_peak, t_right_trough,
#                            expected_trough_duration, tick_times, ttl_string,
#                            t_left_half_trough, left_half_trough,
#                            t_right_half_trough, right_half_trough ):
def sanity_check_plot_jazz3(t_left_trough, left_trough, t_positive_peak, positive_peak,
                                t_right_trough, right_trough,t_left_half_trough, left_half_trough,
                                t_right_half_trough, right_half_trough,
                                expected_trough_duration, tick_times, ttl_string):
    wiggly_wiggle = np.hstack((left_trough, positive_peak, right_trough))
    tick_heights = 0.1 * np.ptp(wiggly_wiggle)
    fig, ax = plt.subplots(1, 1)

    tick_times_semi_theoretical = semi_theoretical_tick_times(tick_times, expected_trough_duration)
    ax.plot(t_left_trough, left_trough, label='left');
    ax.plot(t_positive_peak, positive_peak, label='peak');
    ax.plot(t_right_trough, right_trough, label='right');
    ax.plot(t_left_half_trough, left_half_trough, label='jazz3_left', color='cyan', linewidth=3.4)
    ax.plot(t_right_half_trough, right_half_trough, label='jazz3_right', color='cyan', linewidth=3.4)
    ax.hlines(0, t_left_trough[0], t_right_trough[-1], color='black');
    ax.vlines(tick_times, -tick_heights/2, tick_heights/2, color='lime', label='ticktimes')
    ax.vlines([tick_times[1]-expected_trough_duration, tick_times[2]+expected_trough_duration],
              -tick_heights / 2, tick_heights / 2, color='purple')
    ax.set_xlabel(('Time (s)'))
    ax.set_xlabel('Wavelet Amplitude')
    ax.legend();
    ax.set_title(ttl_string)
    ax.fill_between(t_left_trough, left_trough, where=t_left_trough> tick_times_semi_theoretical[0],
                    facecolor='green', interpolate=True)
    ax.fill_between(t_right_trough, right_trough, where=t_right_trough < tick_times_semi_theoretical[3],
                    facecolor='red', interpolate=True)
    plt.show(block=True)
    #plt.show()



def main():
    pass


if __name__ == '__main__':
    main()
    print('success!')
