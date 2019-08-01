/** @namespace */
geotoolkit.seismic.analysis = {};

/** @namespace */
geotoolkit.seismic.analysis.transforms = {};

/** @namespace */
geotoolkit.seismic.analysis.util = {};

/** @namespace */
geotoolkit.seismic.analysis.maths = {};

/** @namespace */
geotoolkit.seismic.analysis.filters = {};

/**
 * A utility class with methods useful for removing the DC Component
 * of a signal by subtracting the mean value.
 * Ported from the Saddleback Geosolution's Java implementation
 *
 * @class geotoolkit.seismic.analysis.util.ArrayOperations
 */
geotoolkit.seismic.analysis.util.ArrayOperations = {};
    /**
     * Copies elements from a source array starting at a specified index to a
     * destination array at a specified index. The number of components
     * copies is specified in the length argument.
     *
     * @param {Float32Array}src Source array
     * @param {number}srcPos Source array start index
     * @param {Float32Array}dest Destination array
     * @param {number}destPos Destination stat index
     * @param {number}length The length of the copied data
     */
    geotoolkit.seismic.analysis.util.ArrayOperations.arrayCopy = function(src, srcPos, dest, destPos, length){};
    /**
     * Fills the array with specified value at the specified range
     *
     * @param {Float32Array} array The array that will be filled
     * @param {number} start The start position
     * @param {number} end The end position
     * @param {number} value The value.
     */
    geotoolkit.seismic.analysis.util.ArrayOperations.fill = function(array, start, end, value){};

/**
 * A utility class with methods useful for removing the DC Component
 * of a signal by subtracting the mean value.
 * Ported from the Saddleback Geosolution's Java implementation
 *
 * @class geotoolkit.seismic.analysis.util.DataPadding
 */
geotoolkit.seismic.analysis.util.DataPadding = {};
    /**
     * Pad a trace out to the length specified by input parameter.
     * @param {Float32Array}trace The data trace to be padded
     * @param {number}length The length of padded trace
     * @returns {Float32Array|null}paddedTrace padded trace unless length not a power of 2 then returns null.
     */
    geotoolkit.seismic.analysis.util.DataPadding.padTrace = function(trace, length){};
    /**
     * Returns the next-highest power-of-2 to the number supplied.
     * Example 1-&gt;2, 3-&gt;4, 5-&gt;8, 9-&gt;16, 17-&gt;32, etc..
     * @param {number}n The number to be converted to the next power of 2.
     * @returns {number}powerOfTwo The next power of two of the input number.
     */
    geotoolkit.seismic.analysis.util.DataPadding.getNextPowerOf2 = function(n){};

/**
 * A utility class with methods useful for removing the DC Component
 * of a signal by subtracting the mean value.
 * Ported from the Saddleback Geosolution's Java implementation
 *
 * @class geotoolkit.seismic.analysis.util.RemoveDC
 */
geotoolkit.seismic.analysis.util.RemoveDC = {};
    /**
     * De-trends a signal stored in a float array, and sets the DC component
     * @param {Float32Array}trace The seismic trace
     * @param {number}normLevel The new DC component of the trace. Default value is zero.
     * @returns {Float32Array} The trace that has been de-trended
     */
    geotoolkit.seismic.analysis.util.RemoveDC.deTrend = function(trace, normLevel){};

/**
 * A utility class with methods useful for smoothing signal data
 * Ported from the Saddleback Geosolution's Java implementation
 *
 * @class geotoolkit.seismic.analysis.util.Smoothing
 */
geotoolkit.seismic.analysis.util.Smoothing = {};
    /**
     * Fast boxcar-like smoother (with optional taper) for the ends of the signal
     *
     * @param {array<number>} inputSignal The signal in array representation
     * @param {number} smootherWidth The smoothingWidth
     * @param {boolean} taperFlag Whether tapering should be applied to signal's endpoints.
     * @returns {Float32Array}smoothedSignal The smoothed signal
     */
    geotoolkit.seismic.analysis.util.Smoothing.fastSmooth = function(inputSignal, smootherWidth, taperFlag){};
    /**
     * Smoothes the signal using a boxcar window (fast, but has window issues)
     * The ends of the signal are handled by padding with repeated values.
     *
     * @param {Float32Array}inputSignal The input signal
     * @param {number}smootherWidth The width of the smoothing interval
     * @returns {Float32Array}smoothedSignal The smoothed signal
     */
    geotoolkit.seismic.analysis.util.Smoothing.boxcarSmooth = function(inputSignal, smootherWidth){};

/**
 * This class is used to keep the precision of numbers when steps are used to calculate these numbers.
 *
 * @class geotoolkit.seismic.analysis.util.StepPrecisionUtil
 */
geotoolkit.seismic.analysis.util.StepPrecisionUtil = {};
    /**
     * fixes precision calculator of inline and xline numbers. Can be used for time/depth as well
     * example: StepPrecisionUtil.getNormalizedLineValue(1, 50, 0.1) => 6
     * example: StepPrecisionUtil.getNormalizedLineValue(1, -50, -0.1) => 6
     * To use when the reference value is not the minimum value
     * never pass floats, always pass doubles
     * you might want to pass Math(step) as step
     *
     * @param {number}referenceValue The reference value.
     * @param {number}stepIndex The step index.
     * @param {number}step The step amount.
     * @returns {number}relativeValue The calculated relative value.
     */
    geotoolkit.seismic.analysis.util.StepPrecisionUtil.getRelativeLineValue = function(referenceValue, stepIndex, step){};
    /**
     * Fixes precision calculator of inline and xline numbers.
     * Can be used for time/depth as well result is always >= min
     * never pass floats, always pass doubles
     * works with negative of positive steps
     * @param {number}minValue The minimum value.
     * @param {number}stepIndex The step index.
     * @param {number}step The step amount.
     * @returns {number}normalizedValue The normalized line value.
     */
    geotoolkit.seismic.analysis.util.StepPrecisionUtil.getNormalizedLineValue = function(minValue, stepIndex, step){};
    /**
     * Fixed precision calculator of step indexes. add one to get a step count
     * example: getNormalizedStepIndex(1, 1, 0.1) => 0
     * example: getNormalizedStepIndex(1, 6, 0.1) => 50
     * example: getNormalizedStepIndex(1, 6, -0.1) => -50
     * To use when the reference value is not the minimum value never pass floats, always pass doubles
     * you might want to pass Math(step) as step don't use arbitrary step values
     * @param {number}referenceValue The reference value.
     * @param {number}value The actual value.
     * @param {number}step The step amount.
     * @returns {number}index The relative index.
     */
    geotoolkit.seismic.analysis.util.StepPrecisionUtil.getRelativeStepIndex = function(referenceValue, value, step){};
    /**
     * Fixed precision calculator of step count. same as getNormalizedStepIndex, with 1 added
     * result is always >= 1 never pass floats, always pass doubles don't use arbitrary step values
     * @param {number}minValue The minimum value.
     * @param {number}value The actual value.
     * @param {number}step The step amount.
     * @returns {number}index The normalized step index.
     */
    geotoolkit.seismic.analysis.util.StepPrecisionUtil.getNormalizedStepIndex = function(minValue, value, step){};
    /**
     * Fixed precision calculator of step count. same as getNormalizedStepIndex, with 1 added
     * result is always >= 1 never pass floats, always pass doubles don't use arbitrary step values
     * @param {number}minValue The minimum value.
     * @param {number}value The actual value.
     * @param {number}step The step amount.
     * @returns {number}index The normalized step index.
     */
    geotoolkit.seismic.analysis.util.StepPrecisionUtil.getNormalizedStepCount = function(minValue, value, step){};
    /**
     * Gets the Minimum fraction digits
     * @param {number}step The step amount.
     * @returns {number}result The minimum digits.
     */
    geotoolkit.seismic.analysis.util.StepPrecisionUtil.getMinimumFractionDigits = function(step){};
    /**
     * Finds the number of digits after the dot never pass floats, always pass doubles
     * @param {number}step The step value
     * @returns {number}multiplier The number of digits
     */
    geotoolkit.seismic.analysis.util.StepPrecisionUtil.getNormalizedStepMultiplier = function(step){};
    /**
     * This is needed because a float such as 0.002 gets transformed to 0.00200000123
     * when doing a single (double) cast. I used croscorrelation.sgy as an example
     * @param {number}step The step amount.
     * @returns {number}result The converted number.
     */
    geotoolkit.seismic.analysis.util.StepPrecisionUtil.convertFloatStepToDouble = function(step){};

/**
 * A utility class with useful methods for statistics operations
 * Ported from the Saddleback Geosolution's Java implementation
 *
 * @class geotoolkit.seismic.analysis.maths.DataStatistics
 */
geotoolkit.seismic.analysis.maths.DataStatistics = {};
    /**
     * Find the maximum value of the array
     * @param {Float32Array|Array}inputData The input data
     * @param {number}minIndex minimum data index
     * @param {number}maxIndex maximum data index
     * @returns {number}max The maximum value of the array
     */
    geotoolkit.seismic.analysis.maths.DataStatistics.max = function(inputData, minIndex, maxIndex){};
    /**
     * Find the minimum value of the array
     * @param {Float32Array|Array}inputData The input data
     * @param {number}minIndex minimum data index
     * @param {number}maxIndex maximum data index
     * @returns {number}min The minimum value of the array
     */
    geotoolkit.seismic.analysis.maths.DataStatistics.min = function(inputData, minIndex, maxIndex){};
    /**
     * Find the sum of all the array values
     * @param {Float32Array|Array}inputData The input data
     * @param {number}minIndex minimum data index
     * @param {number}maxIndex maximum data index
     * @returns {number}sum The sum of all the array values
     */
    geotoolkit.seismic.analysis.maths.DataStatistics.sum = function(inputData, minIndex, maxIndex){};
    /**
     * Find the sum of absolute values of all array values
     * @param {Float32Array|Array}inputData The input data
     * @param {number}minIndex minimum data index
     * @param {number}maxIndex maximum data index
     * @returns {number}absSum, The sum of absolute values of all array values
     */
    geotoolkit.seismic.analysis.maths.DataStatistics.mean = function(inputData, minIndex, maxIndex){};
    /**
     * Find the sum of absolute values of all array values
     * @param {Float32Array|Array}inputData The input data
     * @param {number}minIndex minimum data index
     * @param {number}maxIndex maximum data index
     * @returns {number}absSum, The sum of absolute values of all array values
     */
    geotoolkit.seismic.analysis.maths.DataStatistics.sumAbs = function(inputData, minIndex, maxIndex){};
    /**
     * Find the closest whole number (towards zero) to the number specified
     * @param {number}value The value to be fixed
     * @returns {number}fixedValue, The fixed value
     */
    geotoolkit.seismic.analysis.maths.DataStatistics.fix = function(value){};

/**
 * Class that has methods useful for operating on complex numbers
 * Ported from the Saddleback Geosolution's Java implementation
 *
 * @class geotoolkit.seismic.analysis.maths.ComplexMathUtils
 */
geotoolkit.seismic.analysis.maths.ComplexMathUtils = {};
    /**
     * Gets the real magnitude of a complex number.
     * @param {geotoolkit.seismic.analysis.maths.ComplexNumber}c The complex number.
     */
    geotoolkit.seismic.analysis.maths.ComplexMathUtils.absCmplx = function(c){};
    /**
     * Multiplies two complex numbers a and b, returning complex number c.
     * @param {geotoolkit.seismic.analysis.maths.ComplexNumber}a The first complex number.
     * @param {geotoolkit.seismic.analysis.maths.ComplexNumber}b The second complex number.
     */
    geotoolkit.seismic.analysis.maths.ComplexMathUtils.multCmplx = function(a, b){};

/**
 * A complex number, C, has the form C = A + B*j, where A and B are both real.
 * We refer to A as the 'real part' of C, and B as the 'imaginary part' of C
 * where both A and B can be represented by double precision values.
 * Ported from the Saddleback Geosolution's Java implementation
 * @param {number|geotoolkit.seismic.analysis.maths.ComplexNumber}real Real part of the complex value denoted by A in the expression C = A + B*j
 * @param {number}imag The imaginary component Imaginary part of the complex value denoted by B in the expression C = A + B*j
 * @class geotoolkit.seismic.analysis.maths.ComplexNumber
 */
geotoolkit.seismic.analysis.maths.ComplexNumber = {};
    /**
     * Gets the real value of the complex number.
     * @returns {number}real The real component.
     */
    geotoolkit.seismic.analysis.maths.ComplexNumber.prototype.getReal = function(){};
    /**
     * Sets the real value of the complex number.
     * @param {number}real The real component
     * @returns {geotoolkit.seismic.analysis.maths.ComplexNumber} this
     */
    geotoolkit.seismic.analysis.maths.ComplexNumber.prototype.setReal = function(real){};
    /**
     * Gets the imaginary value of the complex number.
     * @returns {number}imag The imaginary component.
     */
    geotoolkit.seismic.analysis.maths.ComplexNumber.prototype.getImag = function(){};
    /**
     * Sets the imaginary value of the complex number.
     * @param {number}imag The imaginary component.
     * @returns {geotoolkit.seismic.analysis.maths.ComplexNumber} this
     */
    geotoolkit.seismic.analysis.maths.ComplexNumber.prototype.setImag = function(imag){};
    /**
     * Gets the string representation of this complex number.
     * @returns {string}stringValue The string value of the complex number.
     */
    geotoolkit.seismic.analysis.maths.ComplexNumber.prototype.toString = function(){};

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
 *
 * @param {geotoolkit.seismic.analysis.maths.ComplexArray|number}real Real part of the complex array.
 * @param {geotoolkit.seismic.analysis.maths.ComplexArray|number}imag The imaginary part of the complex array.
 * @class geotoolkit.seismic.analysis.maths.ComplexArray
 */
geotoolkit.seismic.analysis.maths.ComplexArray = {};
    /**
     * Gets a new ComplexNumber from the ComplexArray at a specified index
     * @param {number}index The index location at which to get the complex number.
     * @returns {geotoolkit.seismic.analysis.maths.ComplexNumber}complex The complex number.
     */
    geotoolkit.seismic.analysis.maths.ComplexArray.prototype.get = function(index){};
    /**
     * Set the value of ComplexArray at a specified index with the ComplexNumber complexNumber.
     * @param {geotoolkit.seismic.analysis.maths.ComplexNumber}complexNumber The complex number.
     * @param {number}index The index at which the complex number will be set.
     * @returns {geotoolkit.seismic.analysis.maths.ComplexArray} this
     */
    geotoolkit.seismic.analysis.maths.ComplexArray.prototype.set = function(complexNumber, index){};
    /**
     * Gets the array of real components.
     * @returns {Float32Array}realArray The real data array.
     */
    geotoolkit.seismic.analysis.maths.ComplexArray.prototype.getRealArray = function(){};
    /**
     * Gets the array of imaginary components.
     * @returns {Float32Array}imagArray The imaginary data array.
     */
    geotoolkit.seismic.analysis.maths.ComplexArray.prototype.getImagArray = function(){};
    /**
     * Gets the length of the complex array.
     * @returns {number}length The length of the complex array.
     */
    geotoolkit.seismic.analysis.maths.ComplexArray.prototype.getLength = function(){};

/**
 * Defines a base class for various discrete fourier transforms
 * Ported from the Saddleback Geosolution's Java implementation
 *
 * @param {Float32Array} real The real component of the signal
 * @param {Float32Array} imag The imaginary component of th signal
 * @param {number} sampleRate The data sampling rate in milliseconds
 * @param {number} length The desired length of the transform, must be a power of 2
 * @class geotoolkit.seismic.analysis.transforms.AbstractFFT
 */
geotoolkit.seismic.analysis.transforms.AbstractFFT = {};
    /**
     * Sets the real and imaginary result array
     *
     * @param {Float32Array}real The real component of the signal
     * @param {Float32Array}imag The imaginary component of the signal
     * @param {number}sampleRate The data sampling rate in milliseconds
     * @param {number}length The desired length of the transform, must be a power of 2
     * @returns {geotoolkit.seismic.analysis.transforms.AbstractFFT}
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.setData = function(real, imag, sampleRate, length){};
    /**
     * Sets the real and imaginary arrays directly
     * @param {Float32Array}real The imaginary component of the signal
     * @param {Float32Array}imag The real component of the signal
     * @returns {geotoolkit.seismic.analysis.transforms.AbstractFFT}
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.setDataUnsafe = function(real, imag){};
    /**
     * Performs the transform
     * @function
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.transform = function(){};
    /**
     * Performs the inverse transform
     * @function
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.inverseTransform = function(){};
    /**
     * Gets the real signal component
     * @param {boolean}getReference If true then the reference to signal will be returned.
     * @returns {Float32Array}realComponent The real signal component
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.getRealComponents = function(getReference){};
    /**
     * Gets the imaginary signal component
     * @param {boolean}getReference If true then the reference to signal will be returned.
     * @returns {Float32Array}realComponent The real signal component
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.getImaginaryComponents = function(getReference){};
    /**
     * Returns the length of the calculated FFT (power-of-2).
     * @returns {number}length The length of calculated FFT
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.getLength = function(){};
    /**
     * Returns the number of non zero samples that were input inot the last FFT.
     * This is the number of live samples (less than or equal to a power-of-2);
     *
     * @returns {number}nonZero The Number of non-zero samples for input signal
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.getNumberNonZeroSamples = function(){};
    /**
     * Returns half of the length of the calcualted FFT (power-of-2)
     * @returns {number}halfLength The half-length of the FFT
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.getHalfLength = function(){};
    /**
     * Returns the base 2 logarithm of the transform length
     * @returns {number} logLength Log base 2 of the transform length
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.getLog2Length = function(){};
    /**
     * Returns the nyquist frequency for the input signal.
     * This is the calculated nyquist frequency based on the supplied sample rate.
     * This is also known as the folding frequency
     * @returns {number}nyquist The nyquist frequency
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.getNyquist = function(){};
    /**
     * Returns the sample number of frequency that equals nyquist frequency.
     * @returns {number}frequency The Nyquist frequency
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.getNyquistLength = function(){};
    /**
     * Returns the input sample rate of the signal in Milliseconds.
     * This is the sample rate set before calculation.
     * @returns {number}sampleRate Sample rate of input signal in milliseconds (ms)
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.getSampleRate = function(){};
    /**
     * Sets the input sample rate of the signal in Milliseconds.
     * @param {number}sampleRate Sample rate of input signal in milliseconds (ms)
     * @returns {geotoolkit.seismic.analysis.transforms.AbstractFFT} this
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.setSampleRate = function(sampleRate){};
    /**
     * Returns the Frequency Domain sample rate. This is the frequency domain sample spacing.
     * @returns {number} FrequencySampleRate Frequency Domain sampling rate in milliseconds (ms)
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFT.prototype.getFDSampleRate = function(){};

/**
 * This class has methods for calculating various frequency properties.
 * Ported from the Saddleback Geosolution's Java implementation
 *
 * @class geotoolkit.seismic.analysis.transforms.SpectraCalculator
 */
geotoolkit.seismic.analysis.transforms.SpectraCalculator = {};
    /**
     * Calculates the power components of the complex signal
     * @param {Float32Array}xre Real signal
     * @param {Float32Array}xim Imaginary signal
     * @param {number}nonzero Length of the signal
     * @param {number}nyquistLen The nyquist length
     * @returns {Float32Array}powers The power components of the signal
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.calcPower = function(xre, xim, nonzero, nyquistLen){};
    /**
     * Calculates the amplitude components of the complex signal
     * @param {Float32Array}xre Real signal
     * @param {Float32Array}xim Imaginary signal
     * @param {number}nonzero Length of the signal
     * @param {number}nyquistLen The nyquist length
     * @returns {Float32Array}amplitudes The amplitude components of the signal
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.calcAmplitude = function(xre, xim, nonzero, nyquistLen){};
    /**
     * Calculates the amplitude components of a complex signal and smoothes the result.
     * @param {Float32Array}xre Real signal
     * @param {Float32Array}xim Imaginary signal
     * @param {number}sampleRate The sample rate
     * @param {number}nonzero Length of the signal
     * @param {number}hzLength The length of each oscillation
     * @returns {Float32Array}smoothedAmplitudes The smoothed amplitude components of the signal
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.calcAmplitudeSmoothed = function(xre, xim, sampleRate, nonzero, hzLength){};
    /**
     * Smoothes the spectrum components of the signal
     * @param {Float32Array}spectrum The signal
     * @param {number}windowWidth The window width
     * @returns {Float32Array}smoothedSpectrum The smoothed spectrum
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.smoothSpectrum = function(spectrum, windowWidth){};
    /**
     * Calculates the phase components of a complex signal in radians.
     * @param {Float32Array}xre Real signal
     * @param {Float32Array}xim Imaginary signal
     * @param {number}nyquistLen The nyquist length
     * @returns {Float32Array}phases The phase components of the signal
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.calcPhaseInRadians = function(xre, xim, nyquistLen){};
    /**
     * Calculates the phase components of a complex signal in degrees.
     * @param {Float32Array}xre Real signal
     * @param {Float32Array}xim Imaginary signal
     * @param {number}nyquistLen The nyquist length
     * @returns {Float32Array}phases The phase components of the signal
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.calcPhaseInDegrees = function(xre, xim, nyquistLen){};
    /**
     * Unwraps the phase components of a complex signal in degrees.
     * @param {Float32Array}xre Real signal
     * @param {Float32Array}xim Imaginary signal
     * @param {number}nyquistLen The nyquist length
     * @returns {Float32Array}phases The unwrapped phase components of the signal
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.calcUnWrappedPhaseInDegrees = function(xre, xim, nyquistLen){};
    /**
     * Unwraps the radian phase components of the signal and then converts to degrees
     * @param {number}phaseSpec The phase spectrum
     * @returns {Float32Array}unwrapped The unwrapped phase spectrum
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.phaseUnwrapRadToDeg = function(phaseSpec){};
    /**
     * Unwraps the radian phase components of the signal
     * ( Makes phases take values between -PI and +PI )
     * @param {number}phaseSpec The phase spectrum
     * @returns {Float32Array}unwrapped The unwrapped phase spectrum
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.phaseUnwrapRadians = function(phaseSpec){};
    /**
     * Unwraps the degree phase components of the signal
     * @param {number}phaseSpec The phase spectrum
     * @returns {Float32Array}unwrapped The unwrapped phase spectrum
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.phaseUnwrapDegrees = function(phaseSpec){};
    /**
     * Computes the power of the signal in decibels
     * @param {Float32Array} xre Real signal
     * @param {Float32Array} xim Imaginary signal
     * @param {number} nonzero Length of the signal
     * @param {number} nyquistlen The nyquist length
     * @returns {Float32Array}powersDb The power components of the signal in decibels
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.calcPowerDb = function(xre, xim, nonzero, nyquistlen){};
    /**
     * Computes the normalized power of the signal in decibels
     * @param {Float32Array}xre Real signal
     * @param {Float32Array}xim Imaginary signal
     * @param {number}nonzero Length of the signal
     * @param {number}nyquistLen The nyquist length
     * @param {number}nFactor the normalization factor
     * @returns {Float32Array}powersDb The power components of the signal in decibels
     */
    geotoolkit.seismic.analysis.transforms.SpectraCalculator.calcPowerDbNormalized = function(xre, xim, nonzero, nyquistLen, nFactor){};

/**
 * Defines a class with basic functions to analyze FFT spectra
 *
 * @param {Array} real The real component of the signal
 * @param {Array} imag The imaginary component of th signal
 * @param {number} sampleRate The data sampling rate in milliseconds
 * @param {number} length The desired length of the transform, must be a power of 2
 * @class geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra
 * @augments geotoolkit.seismic.analysis.transforms.AbstractFFT
 */
geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra = {};
    /**
     * Computes the Amplitude spectrum of the input signal.*
     *
     * @returns {?Float32Array}amplitudes - array containing the amplitude spectrum
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra.prototype.getFFTAmplitude = function(){};
    /**
     * Computes the Amplitude spectrum of the input signal and
     * smoothes the output to hzLength (in frequency).
     *
     * @param {number}hzLength - int operator length in hz/samples
     * @returns {?Float32Array}amplitudes - array containing the amplitude spectrum
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra.prototype.getFFTAmplitudeSmooth = function(hzLength){};
    /**
     * Computes the phase spectrum of the input signal in degrees.
     *
     * @returns {?Float32Array}phases - array containing the phase spectrum of the input signal in degrees.
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra.prototype.getFFTPhaseDegrees = function(){};
    /**
     * Computes the phase spectrum in radians of the input signal.<br><br>
     * This is the phase spectrum of the input signal in range of 0 to 2*pi.
     *
     * @returns {?Float32Array}phases - array containing the phase spectrum in radians
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra.prototype.getFFTPhaseRadians = function(){};
    /**
     * Computes the phase spectrum in unwrapped degrees in the range(0-&gt;360).
     *
     * @returns {?Float32Array}phases - array containing the unwrapped phase spectrum in degrees
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra.prototype.getFFTPhaseInDegreesUnWrapped = function(){};
    /**
     * Computes the phase spectrum in unwrapped radians in the range(-pi to +pi).
     *
     * @returns {?Float32Array}phases - array containing the unwrapped phase spectrum in radians
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra.prototype.getFFTPhaseInRadiansUnWrapped = function(){};
    /**
     * Computes the power spectrum (amplitude squared) of the FFT.
     *
     * @returns {?Float32Array}powers - array containing the power spectrum
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra.prototype.getFFTPower = function(){};
    /**
     * Computes the power spectrum (amplitude squared) of the FFT.
     * This is the the power spectrum in dB-down, based on the maximum power
     * value associated with (0(Zero) db down).
     *
     * @returns {?Float32Array}powersDb - array container the power spectrum in dB
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra.prototype.getFFTPowerInDb = function(){};
    /**
     * Computes the normalized power spectrum (amplitude squared) of the FFT.<br><br>
     *
     * This is the the power spectrum in dB-down, based on the reference power
     * value supplied in the parameter nFactor.
     *
     * @param {number}pReference - float reference value
     * @returns {?Float32Array}powersDbNorm - array containing the power spectrum in dB
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra.prototype.getFFTPowerInDbNormalized = function(pReference){};
    /**
     * Computes the smoothed &amp; normalized dB power spectrum
     * (amplitude squared) of the FFT.
     * This is the the power spectrum in dB-down, based on the maximum power
     * value associated with (0(Zero) db down).
     *
     * @param {number}hzLength - int operator length in hz/samples
     * @returns {?Float32Array}powersDbSmoothed - array containing the power specturm in db and smoothed.
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra.prototype.getFFTPowerInDbSmoothed = function(hzLength){};
    /**
     * Computes the smoothed power spectrum (amplitude squared) of the FFT.
     *
     * @param {number}hzLength - int operator length in hz/samples
     * @returns {?Float32Array} powerSmoothed - array containing the smoothed power spectrum
     */
    geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra.prototype.getFFTPowerSmoothed = function(hzLength){};

/**
 * Defines a class capable of computing the forward and backward Discrete Fourier Transform
 * Ported from the Saddleback Geosolution's Java implementation of the DFT
 *
 *
 * @param {Array}real The real component of the signal
 * @param {Array}imag The imaginary component of the signal
 * @param {number}sampleRate The data sampling rate in milliseconds
 * @param {number}length The desired length of the transform, must be a power of 2
 * @class geotoolkit.seismic.analysis.transforms.DFT
 * @augments geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra
 */
geotoolkit.seismic.analysis.transforms.DFT = {};
    /**
     * Performs the forward DFT
     * @override
     */
    geotoolkit.seismic.analysis.transforms.DFT.prototype.transform = function(){};
    /**
     * Performs the inverse DFT
     * @override
     */
    geotoolkit.seismic.analysis.transforms.DFT.prototype.inverseTransform = function(){};

/**
 * Defines a class capable of computing the forward and backward Fast Fourier Transform
 * Ported from the Saddleback Geosolution's Java implementation of the FFT.
 * This implementation uses radix 2, 4 and 8 butterflies.
 *
 * @param {Float32Array} real The real component of the signal
 * @param {Float32Array} imag The imaginary component of th signal
 * @param {number} sampleRate The data sampling rate in milliseconds
 * @param {number} length The desired length of the transform, must be a power of 2
 * @class geotoolkit.seismic.analysis.transforms.FFT
 * @augments geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra
 */
geotoolkit.seismic.analysis.transforms.FFT = {};
    /**
     * Performs the forward FFT
     * @override
     */
    geotoolkit.seismic.analysis.transforms.FFT.prototype.transform = function(){};
    /**
     * Performs the inverse FFT
     * @override
     */
    geotoolkit.seismic.analysis.transforms.FFT.prototype.inverseTransform = function(){};

/**
 * Defines a class capable of computing the forward and backward Real Fast Fourier Transform
 * This implementation performs a size n real transform using a size n/2 complex transform.
 * For the complex transform the radix 2-4-8 fft algorithm is used.
 * Remarks: In browsers this transform is usually slower than the complex transform.
 *
 * @param {Float32Array} real The real component of the signal
 * @param {Float32Array} imag The imaginary component of th signal
 * @param {number} sampleRate The data sampling rate in milliseconds
 * @param {number} length The desired length of the transform, must be a power of 2
 * @class geotoolkit.seismic.analysis.transforms.RealFFT
 * @augments geotoolkit.seismic.analysis.transforms.FFT
 */
geotoolkit.seismic.analysis.transforms.RealFFT = {};
    /**
     * Performs the forward Real FFT
     * @override
     */
    geotoolkit.seismic.analysis.transforms.RealFFT.prototype.transform = function(){};
    /**
     * Performs the inverse Real FFT
     * @override
     */
    geotoolkit.seismic.analysis.transforms.RealFFT.prototype.inverseTransform = function(){};

/**
 * Defines a class capable of computing the forward and backward Discrete Fourier Transform
 * Ported from the Saddleback Geosolution's Java implementation of the DFT
 * This implementation uses only radix-2 butterflies.
 *
 * @param {Array} real The real component of the signal
 * @param {Array} imag The imaginary component of th signal
 * @param {number} sampleRate The data sampling rate in milliseconds
 * @param {number} length The desired length of the transform, must be a power of 2
 * @class geotoolkit.seismic.analysis.transforms.SimpleFFT
 * @augments geotoolkit.seismic.analysis.transforms.AbstractFFTSpectra
 */
geotoolkit.seismic.analysis.transforms.SimpleFFT = {};
    /**
     * Performs the forward FFT
     * @override
     */
    geotoolkit.seismic.analysis.transforms.SimpleFFT.prototype.transform = function(){};
    /**
     * Performs the inverse FFT
     * @override
     */
    geotoolkit.seismic.analysis.transforms.SimpleFFT.prototype.inverseTransform = function(){};

/**
 * The TaperFilter implements both pass band and band reject filtering on the traces. <br>
 * This class uses a taper function and applies filtering in the Fourier domain.<br>
 * The taper function is defined using four frequencies (encapsulated in the class cgTaperFrequencyBoundary). <br>
 * Because this filter is applied in the Fourier domain, the filter object has to be aware of the <br>
 * sample rate in order to map the frequencies to the data values property.
 *
 * @param {number}sampleRate The sample rate
 * @param {number}f1 1st frequency (hrz)
 * @param {number}f2 2nd frequency (hrz)
 * @param {number}f3 3rd frequency (hrz)
 * @param {number}f4 4th frequency (hrz)
 * @param {boolean}passFlag The filtering mode
 * @class geotoolkit.seismic.analysis.filters.TaperFilter
 */
geotoolkit.seismic.analysis.filters.TaperFilter = {};
    /**
     * Enum of the Taper Cosine
     * @enum
     * @readonly
     */
    geotoolkit.seismic.analysis.filters.TaperFilter.TaperCosine = {};
        /**
         * The half taper cosine
         * @type {number}
         */
        geotoolkit.seismic.analysis.filters.TaperFilter.TaperCosine.Half = NaN;
        /**
         * The quarter taper cosine
         * @type {number}
         */
        geotoolkit.seismic.analysis.filters.TaperFilter.TaperCosine.Quarter = NaN;
    /**
     * Gets the frequency boundary
     * @returns {geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary}frequencyBoundary The frequency boundary
     */
    geotoolkit.seismic.analysis.filters.TaperFilter.prototype.getFrequencyBoundary = function(){};
    /**
     * Sets the frequency boundary
     * @param {geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary}frequencyBoundary The frequency boundary
     * @returns {geotoolkit.seismic.analysis.filters.TaperFilter} this
     */
    geotoolkit.seismic.analysis.filters.TaperFilter.prototype.setFrequencyBoundary = function(frequencyBoundary){};
    /**
     * Gets the sample rate
     * @returns {number}sampleRate The sample rate
     */
    geotoolkit.seismic.analysis.filters.TaperFilter.prototype.getSampleRate = function(){};
    /**
     * Sets the sample rate
     * @param {number} sampleRate Sample rate is the number of times an analog signal is measured (sampled) per second.
     * @returns {geotoolkit.seismic.analysis.filters.TaperFilter} this
     */
    geotoolkit.seismic.analysis.filters.TaperFilter.prototype.setSampleRate = function(sampleRate){};
    /**
     * Gets the pass flag
     * @returns {boolean} passFlag The pass flag
     */
    geotoolkit.seismic.analysis.filters.TaperFilter.prototype.getPassFlag = function(){};
    /**
     * This sets the filtering mode. Usually this filter is used as band pass filter,
     * but it can be reverted to band rejection mode by calling this method with flag set to false
     * @param {boolean} passFlag The pass flag
     * @returns {geotoolkit.seismic.analysis.filters.TaperFilter} this
     */
    geotoolkit.seismic.analysis.filters.TaperFilter.prototype.setPassFlag = function(passFlag){};
    /**
     * Applies the filter on an array of data
     * @param {Float32Array} input The input array
     * @param {number} length The length of the input array that needs to be filtered.
     * @returns {Float32Array} output The processed array
     */
    geotoolkit.seismic.analysis.filters.TaperFilter.prototype.apply = function(input, length){};

/**
 * The TaperFilterProcess applies both pass band and band reject filtering on the traces <br>
 * <br>
 * This class uses a taper function and applies filtering in the Fourier domain.<br>
 * The taper function is defined using four frequencies (encapsulated in the class <see cref="cgTaperFrequencyBoundary"/>).<br>
 * Because this filter is applied in the Fourier domain, the filter object has to be aware of the sample rate in order to map the frequencies to the data values property.
 *
 * @class geotoolkit.seismic.analysis.filters.TaperFilterProcess
 * @augments geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor
 * @param {object} state
 * @param {string} state.name name of the process
 * @param {boolean} state.apply process activated or not.
 * @param {number} state.sampleRate The sample rate
 * @param {boolean} state.passFlag filtering mode
 * @param {number} state.f1 1st frequency
 * @param {number} state.f2 2nd frequency
 * @param {number} state.f3 3rd frequency
 * @param {number} state.f4 4th frequency
 */
geotoolkit.seismic.analysis.filters.TaperFilterProcess = {};
    /**
     * Gets the frequency boundary
     * @returns {geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary}frequencyBoundary The frequency boundary
     */
    geotoolkit.seismic.analysis.filters.TaperFilterProcess.prototype.getFrequencyBoundary = function(){};
    /**
     * Sets the frequency boundary
     * @param {geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary}frequencyBoundary The frequency boundary
     * @returns {geotoolkit.seismic.analysis.filters.TaperFilterProcess} this
     */
    geotoolkit.seismic.analysis.filters.TaperFilterProcess.prototype.setFrequencyBoundary = function(frequencyBoundary){};
    /**
     * Gets the pass flag
     * @param {boolean}passFlag The pass flag
     * @returns {geotoolkit.seismic.analysis.filters.TaperFilterProcess} this
     */
    geotoolkit.seismic.analysis.filters.TaperFilterProcess.prototype.setPassFlag = function(passFlag){};
    /**
     * Sets the pass flag
     * @returns {boolean}passFlag The pass flag
     */
    geotoolkit.seismic.analysis.filters.TaperFilterProcess.prototype.getPassFlag = function(){};
    /**
     * @override
     * @returns {boolean}applicable Whether this process can be performed
     */
    geotoolkit.seismic.analysis.filters.TaperFilterProcess.prototype.isApplicable = function(){};
    /**
     * returns state of the taper filter
     *
     * @returns {object}state The state of the taper filter
     * @returns {number} state.sampleRate The sample rate
     * @returns {boolean} state.passFlag filtering mode
     * @returns {number} state.f1 1st frequency
     * @returns {number} state.f2 2nd frequency
     * @returns {number} state.f3 3rd frequency
     * @returns {number} state.f4 4th frequency
     */
    geotoolkit.seismic.analysis.filters.TaperFilterProcess.prototype.getState = function(){};
    /**
     * Sets state of the taper filter
     * @param {object}state The state of the taper filter
     * @param {number} state.sampleRate The sample rate
     * @param {boolean} state.passFlag filtering mode
     * @param {number} state.f1 1st frequency
     * @param {number} state.f2 2nd frequency
     * @param {number} state.f3 3rd frequency
     * @param {number} state.f4 4th frequency
     * @returns {geotoolkit.seismic.analysis.filters.TaperFilterProcess} this
     */
    geotoolkit.seismic.analysis.filters.TaperFilterProcess.prototype.setState = function(state){};
    /**
     * The function returns 'True' if the process was applied to the traces or 'False' if it was not applied.
     * @override
     * @param {object}pipeline The pipeline
     * @param {object}metadata The metadata
     * @param {Float32Array}dataIn Input data
     * @param {Float32Array}dataOut Output data
     * @returns {boolean}success Whether the processing was successful
     */
    geotoolkit.seismic.analysis.filters.TaperFilterProcess.prototype.process = function(pipeline, metadata, dataIn, dataOut){};

/**
 * This class encapsulates the frequencies of the taper for class cgTyperFilter.
 * The frequencies should always satisfy the requirement that f1&lt;f2&lt;f3&lt;f4
 *
 * @param {Number | geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary}f1
 * 1st frequency (hrz) or another TaperFrequencyBoundary
 * @param {number}f2 2nd frequency (hrz)
 * @param {number}f3 3rd frequency (hrz)
 * @param {number}f4 4th frequency (hrz)
 * @class geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary
 */
geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary = {};
    /**
     * Sets frequency boundary
     * @param {Number | geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary}f1
     * 1st frequency (hrz) or another TaperFrequencyBoundary
     * @param {number}f2 2-nd frequency (hrz)
     * @param {number}f3 3-rd frequency (hrz)
     * @param {number}f4 4-th frequency (hrz)
     * @returns {geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary} this
     */
    geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary.prototype.setFrequencyBoundary = function(f1, f2, f3, f4){};
    /**
     * Determines whether the boundary frequencies are valid
     * @returns {boolean}isValid True if frequencies are valid
     */
    geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary.prototype.isValid = function(){};
    /**
     * Determines whether this frequency boundary equals another frequency boundary
     * @param {geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary}frequencyBoundary The frequency boundary
     */
    geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary.prototype.equals = function(frequencyBoundary){};
    /**
     * Gets the 1st frequency (hrz)
     * @returns {number}f1 the 1st frequency (hrz)
     */
    geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary.prototype.getF1 = function(){};
    /**
     * Sets the 1st frequency (hrz)
     * @param {number}f1 1st frequency (hrz)
     * @returns {geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary} this
     */
    geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary.prototype.setF1 = function(f1){};
    /**
     * Gets the 2nd frequency (hrz)
     * @returns {number}f2 the 2nd frequency (hrz)
     */
    geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary.prototype.getF2 = function(){};
    /**
     * Sets the 2nd frequency (hrz)
     * @param {number}f2 2nd frequency (hrz)
     * @returns {geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary} this
     */
    geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary.prototype.setF2 = function(f2){};
    /**
     * Gets the 3rd frequency (hrz)
     * @returns {number}f3 the 3rd frequency (hrz)
     */
    geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary.prototype.getF3 = function(){};
    /**
     * Sets the 3rd frequency (hrz)
     * @param {number}f3 3rd frequency (hrz)
     * @returns {geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary} this
     */
    geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary.prototype.setF3 = function(f3){};
    /**
     * Gets the 4th frequency (hrz)
     * @returns {number}f4 the 4th frequency (hrz)
     */
    geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary.prototype.getF4 = function(){};
    /**
     * Sets the 4th frequency (hrz)
     * @param {number}f4 4nd frequency (hrz)
     * @returns {geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary} this
     */
    geotoolkit.seismic.analysis.filters.TaperFrequencyBoundary.prototype.setF4 = function(f4){};

