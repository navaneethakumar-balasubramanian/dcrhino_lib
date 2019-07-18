declare module geotoolkit {
    module seismic {
        module analysis {
            module util {
                /**
                 * A utility class with methods useful for removing the DC Component
                 * of a signal by subtracting the mean value.
                 * Ported from the Saddleback Geosolution's Java implementation
                 */
                class ArrayOperations {
                    /**
                     * A utility class with methods useful for removing the DC Component
                     * of a signal by subtracting the mean value.
                     * Ported from the Saddleback Geosolution's Java implementation
                     */
                    constructor();
                    /**
                     * Copies elements from a source array starting at a specified index to a
                     * destination array at a specified index.  The number of components
                     * copies is specified in the length argument.
                     * @param src  (Required) Source array
                     * @param srcPos  (Required) Source array start index
                     * @param dest  (Required) Destination array
                     * @param destPos  (Required) Destination stat index
                     * @param length  (Required) The length of the copied data
                     */
                    static arrayCopy(src: Float32Array, srcPos: number, dest: Float32Array, destPos: number, length: number): any;
                    /**
                     * Fills the array with specified value at the specified range
                     * @param array  (Required) The array that will be filled
                     * @param start  (Required) The start position
                     * @param end  (Required) The end position
                     * @param value  (Required) The value.
                     */
                    static fill(array: Float32Array, start: number, end: number, value: number): any;
                }
                /**
                 * A utility class with methods useful for removing the DC Component
                 * of a signal by subtracting the mean value.
                 * Ported from the Saddleback Geosolution's Java implementation
                 */
                class DataPadding {
                    /**
                     * A utility class with methods useful for removing the DC Component
                     * of a signal by subtracting the mean value.
                     * Ported from the Saddleback Geosolution's Java implementation
                     */
                    constructor();
                    /**
                     * Pad a trace out to the length specified by input parameter.
                     * @param trace  (Required) The data trace to be padded
                     * @param length  (Required) The length of padded trace
                     */
                    static padTrace(trace: Float32Array, length: number): Float32Array|any;
                    /**
                     * Returns the next-highest power-of-2 to the number supplied.
                     * Example 1-&gt;2, 3-&gt;4, 5-&gt;8, 9-&gt;16, 17-&gt;32, etc..
                     * @param n  (Required) The number to be converted to the next power of 2.
                     */
                    static getNextPowerOf2(n: number): number;
                }
                /**
                 * A utility class with methods useful for removing the DC Component
                 * of a signal by subtracting the mean value.
                 * Ported from the Saddleback Geosolution's Java implementation
                 */
                class RemoveDC {
                    /**
                     * A utility class with methods useful for removing the DC Component
                     * of a signal by subtracting the mean value.
                     * Ported from the Saddleback Geosolution's Java implementation
                     */
                    constructor();
                    /**
                     * De-trends a signal stored in a float array, and sets the DC component
                     * @param trace  (Required) The seismic trace
                     * @param normLevel  (Required) The new DC component of the trace. Default value is zero.
                     */
                    static deTrend(trace: Float32Array, normLevel: number): Float32Array;
                }
                /**
                 * A utility class with methods useful for smoothing signal data
                 * Ported from the Saddleback Geosolution's Java implementation
                 */
                class Smoothing {
                    /**
                     * A utility class with methods useful for smoothing signal data
                     * Ported from the Saddleback Geosolution's Java implementation
                     */
                    constructor();
                    /**
                     * Fast boxcar-like smoother (with optional taper) for the ends of the signal
                     * @param inputSignal  (Required) The signal in array representation
                     * @param smootherWidth  (Required) The smoothingWidth
                     * @param taperFlag  (Required) Whether tapering should be applied to signal's endpoints.
                     */
                    static fastSmooth(inputSignal: number[], smootherWidth: number, taperFlag: boolean): Float32Array;
                    /**
                     * Smoothes the signal using a boxcar window (fast, but has window issues)
                     * The ends of the signal are handled by padding with repeated values.
                     * @param inputSignal  (Required) The input signal
                     * @param smootherWidth  (Required) The width of the smoothing interval
                     */
                    static boxcarSmooth(inputSignal: Float32Array, smootherWidth: number): Float32Array;
                }
                /**
                 * This class is used to keep the precision of numbers when steps are used to calculate these numbers.
                 */
                class StepPrecisionUtil {
                    /**
                     * This class is used to keep the precision of numbers when steps are used to calculate these numbers.
                     */
                    constructor();
                    /**
                     * fixes precision calculator of inline and xline numbers. Can be used for time/depth as well
                     * example: StepPrecisionUtil.getNormalizedLineValue(1, 50, 0.1) => 6
                     * example: StepPrecisionUtil.getNormalizedLineValue(1, -50, -0.1) => 6
                     * To use when the reference value is not the minimum value
                     * never pass floats, always pass doubles
                     * you might want to pass Math(step) as step
                     * @param referenceValue  (Required) The reference value.
                     * @param stepIndex  (Required) The step index.
                     * @param step  (Required) The step amount.
                     */
                    static getRelativeLineValue(referenceValue: number, stepIndex: number, step: number): number;
                    /**
                     * Fixes precision calculator of inline and xline numbers.
                     * Can be used for time/depth as well result is always >= min
                     * never pass floats, always pass doubles
                     * works with negative of positive steps
                     * @param minValue  (Required) The minimum value.
                     * @param stepIndex  (Required) The step index.
                     * @param step  (Required) The step amount.
                     */
                    static getNormalizedLineValue(minValue: number, stepIndex: number, step: number): number;
                    /**
                     * Fixed precision calculator of step indexes. add one to get a step count
                     * example: getNormalizedStepIndex(1, 1, 0.1) => 0
                     * example: getNormalizedStepIndex(1, 6, 0.1) => 50
                     * example: getNormalizedStepIndex(1, 6, -0.1) => -50
                     * To use when the reference value is not the minimum value never pass floats, always pass doubles
                     * you might want to pass Math(step) as step don't use arbitrary step values
                     * @param referenceValue  (Required) The reference value.
                     * @param value  (Required) The actual value.
                     * @param step  (Required) The step amount.
                     */
                    static getRelativeStepIndex(referenceValue: number, value: number, step: number): number;
                    /**
                     * Fixed precision calculator of step count. same as getNormalizedStepIndex, with 1 added
                     * result is always >= 1 never pass floats, always pass doubles don't use arbitrary step values
                     * @param minValue  (Required) The minimum value.
                     * @param value  (Required) The actual value.
                     * @param step  (Required) The step amount.
                     */
                    static getNormalizedStepIndex(minValue: number, value: number, step: number): number;
                    /**
                     * Fixed precision calculator of step count. same as getNormalizedStepIndex, with 1 added
                     * result is always >= 1 never pass floats, always pass doubles don't use arbitrary step values
                     * @param minValue  (Required) The minimum value.
                     * @param value  (Required) The actual value.
                     * @param step  (Required) The step amount.
                     */
                    static getNormalizedStepCount(minValue: number, value: number, step: number): number;
                    /**
                     * Gets the Minimum fraction digits
                     * @param step  (Required) The step amount.
                     */
                    static getMinimumFractionDigits(step: number): number;
                    /**
                     * Finds the number of digits after the dot never pass floats, always pass doubles
                     * @param step  (Required) The step value
                     */
                    static getNormalizedStepMultiplier(step: number): number;
                    /**
                     * This is needed because a float such as 0.002 gets transformed to 0.00200000123
                     * when doing a single (double) cast. I used croscorrelation.sgy as an example
                     * @param step  (Required) The step amount.
                     */
                    static convertFloatStepToDouble(step: number): number;
                }
            }
            module maths {
                /**
                 * A utility class with useful methods for statistics operations
                 * Ported from the Saddleback Geosolution's Java implementation
                 */
                class DataStatistics {
                    /**
                     * A utility class with useful methods for statistics operations
                     * Ported from the Saddleback Geosolution's Java implementation
                     */
                    constructor();
                    /**
                     * Find the maximum value of the array
                     * @param inputData  (Required) The input data
                     * @param minIndex  (Required) minimum data index
                     * @param maxIndex  (Required) maximum data index
                     */
                    static max(inputData: Float32Array|any[], minIndex: number, maxIndex: number): number;
                    /**
                     * Find the minimum value of the array
                     * @param inputData  (Required) The input data
                     * @param minIndex  (Required) minimum data index
                     * @param maxIndex  (Required) maximum data index
                     */
                    static min(inputData: Float32Array|any[], minIndex: number, maxIndex: number): number;
                    /**
                     * Find the sum of all the array values
                     * @param inputData  (Required) The input data
                     * @param minIndex  (Required) minimum data index
                     * @param maxIndex  (Required) maximum data index
                     */
                    static sum(inputData: Float32Array|any[], minIndex: number, maxIndex: number): number;
                    /**
                     * Find the sum of absolute values of all array values
                     * @param inputData  (Required) The input data
                     * @param minIndex  (Required) minimum data index
                     * @param maxIndex  (Required) maximum data index
                     */
                    static mean(inputData: Float32Array|any[], minIndex: number, maxIndex: number): number;
                    /**
                     * Find the sum of absolute values of all array values
                     * @param inputData  (Required) The input data
                     * @param minIndex  (Required) minimum data index
                     * @param maxIndex  (Required) maximum data index
                     */
                    static sumAbs(inputData: Float32Array|any[], minIndex: number, maxIndex: number): number;
                    /**
                     * Find the closest whole number (towards zero) to the number specified
                     * @param value  (Required) The value to be fixed
                     */
                    static fix(value: number): number;
                }
                /**
                 * Class that has methods useful for operating on complex numbers
                 * Ported from the Saddleback Geosolution's Java implementation
                 */
                class ComplexMathUtils {
                    /**
                     * Class that has methods useful for operating on complex numbers
                     * Ported from the Saddleback Geosolution's Java implementation
                     */
                    constructor();
                    /**
                     * Gets the real magnitude of a complex number.
                     * @param c  (Required) The complex number.
                     */
                    static absCmplx(c: geotoolkit.seismic.analysis.maths.ComplexNumber): any;
                    /**
                     * Multiplies two complex numbers a and b, returning complex number c.
                     * @param a  (Required) The first complex number.
                     * @param b  (Required) The second complex number.
                     */
                    static multCmplx(a: geotoolkit.seismic.analysis.maths.ComplexNumber, b: geotoolkit.seismic.analysis.maths.ComplexNumber): any;
                }
                /**
                 * A complex number, C, has the form C = A + B*j, where A and B are both real.
                 * We refer to A as the 'real part' of C, and B as the 'imaginary part' of C
                 * where both A and B can be represented by double precision values.
                 * Ported from the Saddleback Geosolution's Java implementation
                 */
                class ComplexNumber {
                    /**
                     * A complex number, C, has the form C = A + B*j, where A and B are both real.
                     * We refer to A as the 'real part' of C, and B as the 'imaginary part' of C
                     * where both A and B can be represented by double precision values.
                     * Ported from the Saddleback Geosolution's Java implementation
                     * @param real  (Required) Real part of the complex value denoted by A in the expression C = A + B*j
                     * @param imag  (Required) The imaginary component Imaginary part of the complex value denoted by B in the expression C = A + B*j
                     */
                    constructor(real: number|geotoolkit.seismic.analysis.maths.ComplexNumber, imag: number);
                    /**
                     * Gets the real value of the complex number.
                     */
                    getReal(): number;
                    /**
                     * Sets the real value of the complex number.
                     * @param real  (Required) The real component
                     */
                    setReal(real: number): this;
                    /**
                     * Gets the imaginary value of the complex number.
                     */
                    getImag(): number;
                    /**
                     * Sets the imaginary value of the complex number.
                     * @param imag  (Required) The imaginary component.
                     */
                    setImag(imag: number): this;
                    /**
                     * Gets the string representation of this complex number.
                     */
                    toString(): string;
                }
                /**
                 * <p>An array of complex numbers.</p>
                 * 
                 * <p>A complex number, C, has the form C = A + B*j, where A and B are both real.
                 * We refer to A as the 'real part' of C, and B as the 'imaginary part' of C
                 * where both A and B can be represented by double precision values. </p>
                 * 
                 * This is a wrapper class that can hold two double arrays, one of which is
                 * interpreted as containing the real values, the other the imaginary values
                 * of the complex numbers.
                 * Ported from the Saddleback Geosolution's Java implementation
                 */
                class ComplexArray {
                    /**
                     * <p>An array of complex numbers.</p>
                     * 
                     * <p>A complex number, C, has the form C = A + B*j, where A and B are both real.
                     * We refer to A as the 'real part' of C, and B as the 'imaginary part' of C
                     * where both A and B can be represented by double precision values. </p>
                     * 
                     * This is a wrapper class that can hold two double arrays, one of which is
                     * interpreted as containing the real values, the other the imaginary values
                     * of the complex numbers.
                     * Ported from the Saddleback Geosolution's Java implementation
                     * @param real  (Required) Real part of the complex array.
                     * @param imag  (Required) The imaginary part of the complex array.
                     */
                    constructor(real: geotoolkit.seismic.analysis.maths.ComplexArray|number, imag: geotoolkit.seismic.analysis.maths.ComplexArray|number);
                    /**
                     * Gets a new ComplexNumber from the ComplexArray at a specified index
                     * @param index  (Required) The index location at which to get the complex number.
                     */
                    get(index: number): geotoolkit.seismic.analysis.maths.ComplexNumber;
                    /**
                     * Set the value of ComplexArray at a specified index with the ComplexNumber complexNumber.
                     * @param complexNumber  (Required) The complex number.
                     * @param index  (Required) The index at which the complex number will be set.
                     */
                    set(complexNumber: geotoolkit.seismic.analysis.maths.ComplexNumber, index: number): this;
                    /**
                     * Gets the array of real components.
                     */
                    getRealArray(): Float32Array;
                    /**
                     * Gets the array of imaginary components.
                     */
                    getImagArray(): Float32Array;
                    /**
                     * Gets the length of the complex array.
                     */
                    getLength(): number;
                }
            }
            module transforms {
                /**
                 * Defines a base class for various discrete fourier transforms
                 * Ported from the Saddleback Geosolution's Java implementation
                 */
                class AbstractFFT {
                    /**
                     * Defines a base class for various discrete fourier transforms
                     * Ported from the Saddleback Geosolution's Java implementation
                     * @param real  (Required) The real component of the signal
                     * @param imag  (Required) The imaginary component of th signal
                     * @param sampleRate  (Required) The data sampling rate in milliseconds
                     * @param length  (Required) The desired length of the transform, must be a power of 2
                     */
                    constructor(real: Float32Array, imag: Float32Array, sampleRate: number, length: number);
                    /**
                     * Sets the real and imaginary result array
                     * @param real  (Required) The real component of the signal
                     * @param imag  (Required) The imaginary component of the signal
                     * @param sampleRate  (Required) The data sampling rate in milliseconds
                     * @param length  (Required) The desired length of the transform, must be a power of 2
                     */
                    setData(real: Float32Array, imag: Float32Array, sampleRate: number, length: number): this;
                    /**
                     * Sets the real and imaginary arrays directly
                     * @param real  (Required) The imaginary component of the signal
                     * @param imag  (Required) The real component of the signal
                     */
                    setDataUnsafe(real: Float32Array, imag: Float32Array): this;
                    /**
                     * Performs the transform
                     */
                    transform(): any;
                    /**
                     * Performs the inverse transform
                     */
                    inverseTransform(): any;
                    /**
                     * Gets the real signal component
                     * @param getReference  (Required) If true then the reference to signal will be returned.
                     */
                    getRealComponents(getReference: boolean): Float32Array;
                    /**
                     * Gets the imaginary signal component
                     * @param getReference  (Required) If true then the reference to signal will be returned.
                     */
                    getImaginaryComponents(getReference: boolean): Float32Array;
                    /**
                     * Returns the length of the calculated FFT (power-of-2).
                     */
                    getLength(): number;
                    /**
                     * Returns the number of non zero samples that were input inot the last FFT.
                     * This is the number of live samples (less than or equal to a power-of-2);
                     */
                    getNumberNonZeroSamples(): number;
                    /**
                     * Returns half of the length of the calcualted FFT (power-of-2)
                     */
                    getHalfLength(): number;
                    /**
                     * Returns the base 2 logarithm of the transform length
                     */
                    getLog2Length(): number;
                    /**
                     * Returns the nyquist frequency for the input signal.
                     * This is the calculated nyquist frequency based on the supplied sample rate.
                     * This is also known as the folding frequency
                     */
                    getNyquist(): number;
                    /**
                     * Returns the sample number of frequency that equals nyquist frequency.
                     */
                    getNyquistLength(): number;
                    /**
                     * Returns the input sample rate of the signal in Milliseconds.
                     * This is the sample rate set before calculation.
                     */
                    getSampleRate(): number;
                    /**
                     * Sets the input sample rate of the signal in Milliseconds.
                     * @param sampleRate  (Required) Sample rate of input signal in milliseconds (ms)
                     */
                    setSampleRate(sampleRate: number): this;
                    /**
                     * Returns the Frequency Domain sample rate. This is the frequency domain sample spacing.
                     */
                    getFDSampleRate(): number;
                }
                /**
                 * This class has methods for calculating various frequency properties.
                 * Ported from the Saddleback Geosolution's Java implementation
                 */
                class SpectraCalculator {
                    /**
                     * This class has methods for calculating various frequency properties.
                     * Ported from the Saddleback Geosolution's Java implementation
                     */
                    constructor();
                    /**
                     * Calculates the power components of the complex signal
                     * @param xre  (Required) Real signal
                     * @param xim  (Required) Imaginary signal
                     * @param nonzero  (Required) Length of the signal
                     * @param nyquistLen  (Required) The nyquist length
                     */
                    static calcPower(xre: Float32Array, xim: Float32Array, nonzero: number, nyquistLen: number): Float32Array;
                    /**
                     * Calculates the amplitude components of the complex signal
                     * @param xre  (Required) Real signal
                     * @param xim  (Required) Imaginary signal
                     * @param nonzero  (Required) Length of the signal
                     * @param nyquistLen  (Required) The nyquist length
                     */
                    static calcAmplitude(xre: Float32Array, xim: Float32Array, nonzero: number, nyquistLen: number): Float32Array;
                    /**
                     * Calculates the amplitude components of a complex signal and smoothes the result.
                     * @param xre  (Required) Real signal
                     * @param xim  (Required) Imaginary signal
                     * @param sampleRate  (Required) The sample rate
                     * @param nonzero  (Required) Length of the signal
                     * @param hzLength  (Required) The length of each oscillation
                     */
                    static calcAmplitudeSmoothed(xre: Float32Array, xim: Float32Array, sampleRate: number, nonzero: number, hzLength: number): Float32Array;
                    /**
                     * Smoothes the spectrum components of the signal
                     * @param spectrum  (Required) The signal
                     * @param windowWidth  (Required) The window width
                     */
                    static smoothSpectrum(spectrum: Float32Array, windowWidth: number): Float32Array;
                    /**
                     * Calculates the phase components of a complex signal in radians.
                     * @param xre  (Required) Real signal
                     * @param xim  (Required) Imaginary signal
                     * @param nyquistLen  (Required) The nyquist length
                     */
                    static calcPhaseInRadians(xre: Float32Array, xim: Float32Array, nyquistLen: number): Float32Array;
                    /**
                     * Calculates the phase components of a complex signal in degrees.
                     * @param xre  (Required) Real signal
                     * @param xim  (Required) Imaginary signal
                     * @param nyquistLen  (Required) The nyquist length
                     */
                    static calcPhaseInDegrees(xre: Float32Array, xim: Float32Array, nyquistLen: number): Float32Array;
                    /**
                     * Unwraps the phase components of a complex signal in degrees.
                     * @param xre  (Required) Real signal
                     * @param xim  (Required) Imaginary signal
                     * @param nyquistLen  (Required) The nyquist length
                     */
                    static calcUnWrappedPhaseInDegrees(xre: Float32Array, xim: Float32Array, nyquistLen: number): Float32Array;
                    /**
                     * Unwraps the radian phase components of the signal and then converts to degrees
                     * @param phaseSpec  (Required) The phase spectrum
                     */
                    static phaseUnwrapRadToDeg(phaseSpec: number): Float32Array;
                    /**
                     * Unwraps the radian phase components of the signal
                     * ( Makes phases take values between -PI and +PI )
                     * @param phaseSpec  (Required) The phase spectrum
                     */
                    static phaseUnwrapRadians(phaseSpec: number): Float32Array;
                    /**
                     * Unwraps the degree phase components of the signal
                     * @param phaseSpec  (Required) The phase spectrum
                     */
                    static phaseUnwrapDegrees(phaseSpec: number): Float32Array;
                    /**
                     * Computes the power of the signal in decibels
                     * @param xre  (Required) Real signal
                     * @param xim  (Required) Imaginary signal
                     * @param nonzero  (Required) Length of the signal
                     * @param nyquistlen  (Required) The nyquist length
                     */
                    static calcPowerDb(xre: Float32Array, xim: Float32Array, nonzero: number, nyquistlen: number): Float32Array;
                    /**
                     * Computes the normalized power of the signal in decibels
                     * @param xre  (Required) Real signal
                     * @param xim  (Required) Imaginary signal
                     * @param nonzero  (Required) Length of the signal
                     * @param nyquistLen  (Required) The nyquist length
                     * @param nFactor  (Required) the normalization factor
                     */
                    static calcPowerDbNormalized(xre: Float32Array, xim: Float32Array, nonzero: number, nyquistLen: number, nFactor: number): Float32Array;
                }
                /**
                 * Defines a class with basic functions to analyze FFT spectra
                 */
                class AbstractFFTSpectra extends geotoolkit.seismic.analysis.transforms.AbstractFFT {
                    /**
                     * Defines a class with basic functions to analyze FFT spectra
                     * @param real  (Required) The real component of the signal
                     * @param imag  (Required) The imaginary component of th signal
                     * @param sampleRate  (Required) The data sampling rate in milliseconds
                     * @param length  (Required) The desired length of the transform, must be a power of 2
                     */
                    constructor(real: any[], imag: any[], sampleRate: number, length: number);
                    /**
                     * Computes the Amplitude spectrum of the input signal.*
                     */
                    getFFTAmplitude(): Float32Array;
                    /**
                     * Computes the Amplitude spectrum of the input signal and
                     * smoothes the output to hzLength (in frequency).
                     * @param hzLength  (Required) int operator length in hz/samples
                     */
                    getFFTAmplitudeSmooth(hzLength: number): Float32Array;
                    /**
                     * Computes the phase spectrum of the input signal in degrees.
                     */
                    getFFTPhaseDegrees(): Float32Array;
                    /**
                     * Computes the phase spectrum in radians of the input signal.<br><br>
                     * This is the phase spectrum of the input signal in range of 0 to 2*pi.
                     */
                    getFFTPhaseRadians(): Float32Array;
                    /**
                     * Computes the phase spectrum in unwrapped degrees in the range(0-&gt;360).
                     */
                    getFFTPhaseInDegreesUnWrapped(): Float32Array;
                    /**
                     * Computes the phase spectrum in unwrapped radians in the range(-pi to +pi).
                     */
                    getFFTPhaseInRadiansUnWrapped(): Float32Array;
                    /**
                     * Computes the power spectrum (amplitude squared) of the FFT.
                     */
                    getFFTPower(): Float32Array;
                    /**
                     * Computes the power spectrum (amplitude squared) of the FFT.
                     * This is the the power spectrum in dB-down, based on the maximum power
                     * value associated with (0(Zero) db down).
                     */
                    getFFTPowerInDb(): Float32Array;
                    /**
                     * Computes the normalized power spectrum (amplitude squared) of the FFT.<br><br>
                     * 
                     * This is the the power spectrum in dB-down, based on the reference power
                     * value supplied in the parameter nFactor.
                     * @param pReference  (Required) float reference value
                     */
                    getFFTPowerInDbNormalized(pReference: number): Float32Array;
                    /**
                     * Computes the smoothed &amp; normalized dB power spectrum
                     * (amplitude squared) of the FFT.
                     * This is the the power spectrum in dB-down, based on the maximum power
                     * value associated with (0(Zero) db down).
                     * @param hzLength  (Required) int operator length in hz/samples
                     */
                    getFFTPowerInDbSmoothed(hzLength: number): Float32Array;
                    /**
                     * Computes the smoothed power spectrum (amplitude squared) of the FFT.
                     * @param hzLength  (Required) int operator length in hz/samples
                     */
                    getFFTPowerSmoothed(hzLength: number): Float32Array;
                }
                /**
                 * Defines a class capable of computing the forward and backward Discrete Fourier Transform
                 * Ported from the Saddleback Geosolution's Java implementation of the DFT
                 */
                class DFT extends geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra {
                    /**
                     * Defines a class capable of computing the forward and backward Discrete Fourier Transform
                     * Ported from the Saddleback Geosolution's Java implementation of the DFT
                     * @param real  (Required) The real component of the signal
                     * @param imag  (Required) The imaginary component of the signal
                     * @param sampleRate  (Required) The data sampling rate in milliseconds
                     * @param length  (Required) The desired length of the transform, must be a power of 2
                     */
                    constructor(real: any[], imag: any[], sampleRate: number, length: number);
                    /**
                     * Performs the forward DFT
                     */
                    transform(): any;
                    /**
                     * Performs the inverse DFT
                     */
                    inverseTransform(): any;
                }
                /**
                 * Defines a class capable of computing the forward and backward Fast Fourier Transform
                 * Ported from the Saddleback Geosolution's Java implementation of the FFT.
                 * This implementation uses radix 2, 4 and 8 butterflies.
                 */
                class FFT extends geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra {
                    /**
                     * Defines a class capable of computing the forward and backward Fast Fourier Transform
                     * Ported from the Saddleback Geosolution's Java implementation of the FFT.
                     * This implementation uses radix 2, 4 and 8 butterflies.
                     * @param real  (Required) The real component of the signal
                     * @param imag  (Required) The imaginary component of th signal
                     * @param sampleRate  (Required) The data sampling rate in milliseconds
                     * @param length  (Required) The desired length of the transform, must be a power of 2
                     */
                    constructor(real: Float32Array, imag: Float32Array, sampleRate: number, length: number);
                    /**
                     * Performs the forward FFT
                     */
                    transform(): any;
                    /**
                     * Performs the inverse FFT
                     */
                    inverseTransform(): any;
                }
                /**
                 * Defines a class capable of computing the forward and backward Real Fast Fourier Transform
                 * This implementation performs a size n real transform using a size n/2 complex transform.
                 * For the complex transform the radix 2-4-8 fft algorithm is used.
                 * Remarks: In browsers this transform is usually slower than the complex transform.
                 */
                class RealFFT extends geotoolkit.seismic.analysis.transforms.FFT {
                    /**
                     * Defines a class capable of computing the forward and backward Real Fast Fourier Transform
                     * This implementation performs a size n real transform using a size n/2 complex transform.
                     * For the complex transform the radix 2-4-8 fft algorithm is used.
                     * Remarks: In browsers this transform is usually slower than the complex transform.
                     * @param real  (Required) The real component of the signal
                     * @param imag  (Required) The imaginary component of th signal
                     * @param sampleRate  (Required) The data sampling rate in milliseconds
                     * @param length  (Required) The desired length of the transform, must be a power of 2
                     */
                    constructor(real: Float32Array, imag: Float32Array, sampleRate: number, length: number);
                    /**
                     * Performs the forward Real FFT
                     */
                    transform(): any;
                    /**
                     * Performs the inverse Real FFT
                     */
                    inverseTransform(): any;
                }
                /**
                 * Defines a class capable of computing the forward and backward Discrete Fourier Transform
                 * Ported from the Saddleback Geosolution's Java implementation of the DFT
                 * This implementation uses only radix-2 butterflies.
                 */
                class SimpleFFT extends geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra {
                    /**
                     * Defines a class capable of computing the forward and backward Discrete Fourier Transform
                     * Ported from the Saddleback Geosolution's Java implementation of the DFT
                     * This implementation uses only radix-2 butterflies.
                     * @param real  (Required) The real component of the signal
                     * @param imag  (Required) The imaginary component of th signal
                     * @param sampleRate  (Required) The data sampling rate in milliseconds
                     * @param length  (Required) The desired length of the transform, must be a power of 2
                     */
                    constructor(real: any[], imag: any[], sampleRate: number, length: number);
                    /**
                     * Performs the forward FFT
                     */
                    transform(): any;
                    /**
                     * Performs the inverse FFT
                     */
                    inverseTransform(): any;
                }
            }
            module filters {
                /**
                 * The TaperFilter implements both pass band and band reject filtering on the traces. <br>
                 * This class uses a taper function and applies filtering in the Fourier domain.<br>
                 * The taper function is defined using four frequencies (encapsulated in the class cgTaperFrequencyBoundary). <br>
                 * Because this filter is applied in the Fourier domain, the filter object has to be aware of the <br>
                 * sample rate in order to map the frequencies to the data values property.
                 */
                class TaperFilter {
                    /**
                     * The TaperFilter implements both pass band and band reject filtering on the traces. <br>
                     * This class uses a taper function and applies filtering in the Fourier domain.<br>
                     * The taper function is defined using four frequencies (encapsulated in the class cgTaperFrequencyBoundary). <br>
                     * Because this filter is applied in the Fourier domain, the filter object has to be aware of the <br>
                     * sample rate in order to map the frequencies to the data values property.
                     * @param sampleRate  (Required) The sample rate
                     * @param f1  (Required) 1st frequency (hrz)
                     * @param f2  (Required) 2nd frequency (hrz)
                     * @param f3  (Required) 3rd frequency (hrz)
                     * @param f4  (Required) 4th frequency (hrz)
                     * @param passFlag  (Required) The filtering mode
                     */
                    constructor(sampleRate: number, f1: number, f2: number, f3: number, f4: number, passFlag: boolean);
                    /**
                     * Enum of the Taper Cosine
                     */
                    static TaperCosine: any;
                    /**
                     * Gets the frequency boundary
                     */
                    getFrequencyBoundary(): geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary;
                    /**
                     * Sets the frequency boundary
                     * @param frequencyBoundary  (Required) The frequency boundary
                     */
                    setFrequencyBoundary(frequencyBoundary: geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary): this;
                    /**
                     * Gets the sample rate
                     */
                    getSampleRate(): number;
                    /**
                     * Sets the sample rate
                     * @param sampleRate  (Required) Sample rate is the number of times an analog signal is measured (sampled) per second.
                     */
                    setSampleRate(sampleRate: number): this;
                    /**
                     * Gets the pass flag
                     */
                    getPassFlag(): boolean;
                    /**
                     * This sets the filtering mode. Usually this filter is used as band pass filter,
                     * but it can be reverted to band rejection mode by calling this method with flag set to false
                     * @param passFlag  (Required) The pass flag
                     */
                    setPassFlag(passFlag: boolean): this;
                    /**
                     * Applies the filter on an array of data
                     * @param input  (Required) The input array
                     * @param length  (Required) The length of the input array that needs to be filtered.
                     */
                    apply(input: Float32Array, length: number): Float32Array;
                }
                /**
                 * The TaperFilterProcess applies both pass band and band reject filtering on the traces <br>
                 * <br>
                 * This class uses a taper function and applies filtering in the Fourier domain.<br>
                 * The taper function is defined using four frequencies (encapsulated in the class <see cref="cgTaperFrequencyBoundary"/>).<br>
                 * Because this filter is applied in the Fourier domain, the filter object has to be aware of the sample rate in order to map the frequencies to the data values property.
                 */
                class TaperFilterProcess extends geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor {
                    /**
                     * The TaperFilterProcess applies both pass band and band reject filtering on the traces <br>
                     * <br>
                     * This class uses a taper function and applies filtering in the Fourier domain.<br>
                     * The taper function is defined using four frequencies (encapsulated in the class <see cref="cgTaperFrequencyBoundary"/>).<br>
                     * Because this filter is applied in the Fourier domain, the filter object has to be aware of the sample rate in order to map the frequencies to the data values property.
                     * @param state  (Required) 
                     * @param state.name  (Required) name of the process
                     * @param state.apply  (Required) process activated or not.
                     * @param state.sampleRate  (Required) The sample rate
                     * @param state.passFlag  (Required) filtering mode
                     * @param state.f1  (Required) 1st frequency
                     * @param state.f2  (Required) 2nd frequency
                     * @param state.f3  (Required) 3rd frequency
                     * @param state.f4  (Required) 4th frequency
                     */
                    constructor(state: any | { name?: string; apply?: boolean; sampleRate?: number; passFlag?: boolean; f1?: number; f2?: number; f3?: number; f4?: number; } );
                    /**
                     * Gets the frequency boundary
                     */
                    getFrequencyBoundary(): geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary;
                    /**
                     * Sets the frequency boundary
                     * @param frequencyBoundary  (Required) The frequency boundary
                     */
                    setFrequencyBoundary(frequencyBoundary: geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary): this;
                    /**
                     * Gets the pass flag
                     * @param passFlag  (Required) The pass flag
                     */
                    setPassFlag(passFlag: boolean): this;
                    /**
                     * Sets the pass flag
                     */
                    getPassFlag(): boolean;
                    /**
                     */
                    isApplicable(): boolean;
                    /**
                     * returns state of the taper filter
                     */
                    getState(): {state:{sampleRate:number;passFlag:boolean;f1:number;f2:number;f3:number;f4:number}}|any;
                    /**
                     * Sets state of the taper filter
                     * @param state  (Required) The state of the taper filter
                     * @param state.sampleRate  (Required) The sample rate
                     * @param state.passFlag  (Required) filtering mode
                     * @param state.f1  (Required) 1st frequency
                     * @param state.f2  (Required) 2nd frequency
                     * @param state.f3  (Required) 3rd frequency
                     * @param state.f4  (Required) 4th frequency
                     */
                    setState(state: any | { sampleRate?: number; passFlag?: boolean; f1?: number; f2?: number; f3?: number; f4?: number; } ): this;
                    /**
                     * The function returns 'True' if the process was applied to the traces or 'False' if it was not applied.
                     * @param pipeline  (Required) The pipeline
                     * @param metadata  (Required) The metadata
                     * @param dataIn  (Required) Input data
                     * @param dataOut  (Required) Output data
                     */
                    process(pipeline: any, metadata: any, dataIn: Float32Array, dataOut: Float32Array): boolean;
                }
                /**
                 * This class encapsulates the frequencies of the taper for class cgTyperFilter.
                 * The frequencies should always satisfy the requirement that f1&lt;f2&lt;f3&lt;f4
                 */
                class TaperFrequencyBoundary {
                    /**
                     * This class encapsulates the frequencies of the taper for class cgTyperFilter.
                     * The frequencies should always satisfy the requirement that f1&lt;f2&lt;f3&lt;f4
                     * @param f1  (Required) 1st frequency (hrz) or another TaperFrequencyBoundary
                     * @param f2  (Required) 2nd frequency (hrz)
                     * @param f3  (Required) 3rd frequency (hrz)
                     * @param f4  (Required) 4th frequency (hrz)
                     */
                    constructor(f1: number|geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary, f2: number, f3: number, f4: number);
                    /**
                     * Sets frequency boundary
                     * @param f1  (Required) 1st frequency (hrz) or another TaperFrequencyBoundary
                     * @param f2  (Required) 2-nd frequency (hrz)
                     * @param f3  (Required) 3-rd frequency (hrz)
                     * @param f4  (Required) 4-th frequency (hrz)
                     */
                    setFrequencyBoundary(f1: number|geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary, f2: number, f3: number, f4: number): this;
                    /**
                     * Determines whether the boundary frequencies are valid
                     */
                    isValid(): boolean;
                    /**
                     * Determines whether this frequency boundary equals another frequency boundary
                     * @param frequencyBoundary  (Required) The frequency boundary
                     */
                    equals(frequencyBoundary: geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary): any;
                    /**
                     * Gets the 1st frequency (hrz)
                     */
                    getF1(): number;
                    /**
                     * Sets the 1st frequency (hrz)
                     * @param f1  (Required) 1st frequency (hrz)
                     */
                    setF1(f1: number): this;
                    /**
                     * Gets the 2nd frequency (hrz)
                     */
                    getF2(): number;
                    /**
                     * Sets the 2nd frequency (hrz)
                     * @param f2  (Required) 2nd frequency (hrz)
                     */
                    setF2(f2: number): this;
                    /**
                     * Gets the 3rd frequency (hrz)
                     */
                    getF3(): number;
                    /**
                     * Sets the 3rd frequency (hrz)
                     * @param f3  (Required) 3rd frequency (hrz)
                     */
                    setF3(f3: number): this;
                    /**
                     * Gets the 4th frequency (hrz)
                     */
                    getF4(): number;
                    /**
                     * Sets the 4th frequency (hrz)
                     * @param f4  (Required) 4nd frequency (hrz)
                     */
                    setF4(f4: number): this;
                }
                module TaperFilter {
                    /**
                     * Enum of the Taper Cosine
                     */
                    interface TaperCosine {
                        /**
                         * The half taper cosine
                         */
                        Half: number;
                        /**
                         * The quarter taper cosine
                         */
                        Quarter: number;
                    }
                }
            }
        }
    }
}
