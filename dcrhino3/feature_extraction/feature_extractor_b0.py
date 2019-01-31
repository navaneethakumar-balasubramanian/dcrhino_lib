import numpy as np
from bruges.filters.wavelets import rotate_phase
from skimage.feature import peak_local_max
from scipy.signal import ricker, cwt

def feature_extractor_b0(component_id, trimmed_trace, transformed_args, timestamp):

    t = trimmed_trace
    samples_per_trace = len(trimmed_trace)
    sampling_rate = transformed_args.output_sampling_rate
    dt = 1./sampling_rate

    trimmed_time_vector = (
        dt * np.arange(samples_per_trace)) - np.abs(
            transformed_args.min_lag_trimmed_trace)

    wts = []
    angles = np.arange(-180, 180, 5)
    widths = np.arange(1, 30, 1)

    for angle in angles:
        t_phi = rotate_phase(t, angle, degrees=True)
        wts.append(cwt(t_phi, ricker, widths))

    array_wdp = np.dstack(wts)
    peaks_to_detect = array_wdp.max(-1).max(0)
    peaks = peak_local_max(peaks_to_detect, num_peaks=3,
                           min_distance=2).ravel()

    width_i, angles_i = zip(*[np.unravel_index(np.argmax(p), (p.shape)) for p in np.moveaxis(array_wdp[:, peaks, :], 1, 0)])

    peak_phis = angles.take(angles_i)
    peak_widths = widths.take(width_i)
    peak_amplitudes = np.asarray([rotate_phase(t, phi=phi, degrees=True)[peak] for peak, phi in zip(peaks, peak_phis)])

    peaks, peak_phis, peak_widths, peak_amplitudes = [np.asarray(l) \
                                                      for l in zip(*sorted(zip(
        peaks, peak_phis, peak_widths, peak_amplitudes)))]
    output_dict = dict()

    for i, (p, phi, width, amp) in enumerate(zip(peaks, peak_phis, peak_widths, peak_amplitudes)):
        window = np.asarray(['primary', 'multiple1', 'multiple2'])[i]
        output_dict['_'.join(['b0', component_id, window, 'rotation_angle'])] = phi
        output_dict['_'.join(['b0', component_id, window, 'peak_amplitude'])] = amp
        output_dict['_'.join(['b0', component_id, window, 'peak_width'])] = trimmed_time_vector[p + (width * 2)] - trimmed_time_vector[p - (width * 2)]
        output_dict['_'.join(['b0', component_id, window, 'peak_time'])] = trimmed_time_vector[p]

    return output_dict
