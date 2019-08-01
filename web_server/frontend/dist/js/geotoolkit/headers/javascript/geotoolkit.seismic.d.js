/**
 * API to view, interpret and edit seismic data.
 * @namespace */
geotoolkit.seismic = {};

/** @namespace */
geotoolkit.seismic.util = {};

/** @namespace */
geotoolkit.seismic.util.defines = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.Angles5color = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.BlackRedYellowWhite = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.GreyOrange = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.IntervalVelocity = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.IntervalVelocity16 = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.IntervalVelocity32 = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.Rainbow = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.RedGreenBlue = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.RedWhiteBlack = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.RedWhiteBlue = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.RedWhiteBlueExtremes = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.RedWhiteBlueHot = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.RedYellowBlue = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.Saddleback = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.SaddlebackHot = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.Spectrum = {};
    /**
     * @type {Object}
     */
    geotoolkit.seismic.util.defines.WhiteBlack = {};
    /**
     * Default builtin colormaps seeds.<br>
     *
     * @type {Object[]}
     */
    geotoolkit.seismic.util.defines.Defaults = {};

/** @namespace */
geotoolkit.seismic.image = {};

/**
 * Define a colormap which represents a range of color values which can be mapped to samples based on density.<br>
 * It has reserved values for positive and negative fill color. The toolkit also has several default colormaps available, <br>
 * please refer to {@link geotoolkit.seismic.util.SeismicColors} getDefault()
 *
 * @class geotoolkit.seismic.util.ColorMap
 * @augments geotoolkit.util.ColorProvider
 * @param {number} count count of colors
 * @param {string} name color map name
 */
geotoolkit.seismic.util.ColorMap = {};
    /**
     * Return color for the current value
     * @function
     * @param {number} value
     * the specified color
     * @returns {geotoolkit.util.RgbaColor} the RgbaColor.
     */
    geotoolkit.seismic.util.ColorMap.prototype.getColor = function(value){};
    /**
     * Return list of used Stop Points
     * @function
     * @returns {Array} Array of {color,value}
     */
    geotoolkit.seismic.util.ColorMap.prototype.getStopPoints = function(){};
    /**
     * Return min
     * @function
     * @returns {number} Minimum of ColorProvider
     */
    geotoolkit.seismic.util.ColorMap.prototype.getMinValue = function(){};
    /**
     * Return max
     * @function
     * @returns {number} Maximum of ColorProvider
     */
    geotoolkit.seismic.util.ColorMap.prototype.getMaxValue = function(){};
    /**
     * Set min and max value
     * @param {number} min min value in the range of colors
     * @param {number} max max value in the range of colors
     * @returns {geotoolkit.seismic.util.ColorMap}
     */
    geotoolkit.seismic.util.ColorMap.prototype.setRange = function(min, max){};
    /**
     * Copy constructor
     * @protected
     * @param {geotoolkit.seismic.util.ColorMap} src Source to copy from
     * @returns {geotoolkit.seismic.util.ColorMap} this
     */
    geotoolkit.seismic.util.ColorMap.prototype.copyConstructor = function(src){};
    /**
     * Return clone of the color map
     * @returns {geotoolkit.seismic.util.ColorMap} clone
     */
    geotoolkit.seismic.util.ColorMap.prototype.clone = function(){};
    /**
     * Reverse color map
     * @returns {geotoolkit.seismic.util.ColorMap} this
     */
    geotoolkit.seismic.util.ColorMap.prototype.reverse = function(){};
    /**
     * Set alpha value for all colors
     * @param {number} alpha the alpha value of the color
     * @returns {geotoolkit.seismic.util.ColorMap} this
     */
    geotoolkit.seismic.util.ColorMap.prototype.setAlpha = function(alpha){};
    /**
     * Return name
     * @returns {string}
     */
    geotoolkit.seismic.util.ColorMap.prototype.getName = function(){};
    /**
     * Set name
     * @param {string} name the name of the colormap
     * @returns {geotoolkit.seismic.util.ColorMap} this
     */
    geotoolkit.seismic.util.ColorMap.prototype.setName = function(name){};
    /**
     * Return size
     * @returns {number}
     */
    geotoolkit.seismic.util.ColorMap.prototype.getSize = function(){};
    /**
     * Set wiggle color
     * @param {object | geotoolkit.util.RgbaColor} color the RGBA color
     * @returns {geotoolkit.seismic.util.ColorMap} this
     */
    geotoolkit.seismic.util.ColorMap.prototype.setTraceColor = function(color){};
    /**
     * Return trace color
     * @returns {geotoolkit.util.RgbaColor}
     */
    geotoolkit.seismic.util.ColorMap.prototype.getTraceColor = function(){};
    /**
     * Set positive fill color
     * @param {geotoolkit.util.RgbaColor} color the RGBA color
     * @returns {geotoolkit.seismic.util.ColorMap} this
     */
    geotoolkit.seismic.util.ColorMap.prototype.setPositiveFillColor = function(color){};
    /**
     * Return positive fill color
     * @returns {geotoolkit.util.RgbaColor}
     */
    geotoolkit.seismic.util.ColorMap.prototype.getPositiveFillColor = function(){};
    /**
     * Set positive fill style to be used instead of positive color
     * @param {?(object|geotoolkit.attributes.FillStyle)} style object can be in format of constructor geotoolkit.attributes.FillStyle
     * @returns {geotoolkit.seismic.util.ColorMap} this
     */
    geotoolkit.seismic.util.ColorMap.prototype.setPositiveFillStyle = function(style){};
    /**
     * Return positive fill style to be used instead of positive color
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.seismic.util.ColorMap.prototype.getPositiveFillStyle = function(){};
    /**
     * Set negative fill color
     * @param {geotoolkit.util.RgbaColor} color the RGBA color
     * @returns {geotoolkit.seismic.util.ColorMap} this
     */
    geotoolkit.seismic.util.ColorMap.prototype.setNegativeFillColor = function(color){};
    /**
     * Return negative fill color
     * @returns {geotoolkit.util.RgbaColor}
     */
    geotoolkit.seismic.util.ColorMap.prototype.getNegativeFillColor = function(){};
    /**
     * Set negative fill style to be used instead of negative fill color
     * @param {?(object|geotoolkit.attributes.FillStyle)} style object can be in format of constructor geotoolkit.attributes.FillStyle
     * @returns {geotoolkit.seismic.util.ColorMap} this
     */
    geotoolkit.seismic.util.ColorMap.prototype.setNegativeFillStyle = function(style){};
    /**
     * Return negative fill style to be used instead of negative fill style
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.seismic.util.ColorMap.prototype.getNegativeFillStyle = function(){};
    /**
     * Return color array
     * @returns {Array}
     */
    geotoolkit.seismic.util.ColorMap.prototype.getColors = function(){};
    /**
     * Sets colors
     * @param {geotoolkit.util.RgbaColor[]} colors array of colors
     * @returns {geotoolkit.seismic.util.ColorMap} this
     */
    geotoolkit.seismic.util.ColorMap.prototype.setColors = function(colors){};
    /**
     * internal use only
     * @param {Number} [alpha=null] number from 0 to 1
     * @param {Array<geotoolkit.util.RgbaColor> | geotoolkit.util.RgbaColor} rgbaColor array of colors
     * @returns {array<number> | Number}
     */
    geotoolkit.seismic.util.ColorMap.prototype.compile = function(alpha, rgbaColor){};
    /**
     * Returns clone of the color map
     * @returns {geotoolkit.seismic.util.ColorMap} clone
     */
    geotoolkit.seismic.util.ColorMap.prototype.clone = function(){};
    /**
     * Invalidate Default ColorProvider and notify visuals for update
     * @returns {geotoolkit.seismic.util.ColorMap}
     */
    geotoolkit.seismic.util.ColorMap.prototype.invalidate = function(){};
    /**
     * Enable / disable notification
     * @param {boolean} enable enable or disable notifications
     * @param {boolean} [force=false] true if parent should be invalidated immediately
     * @returns {geotoolkit.seismic.util.ColorMap} this
     */
    geotoolkit.seismic.util.ColorMap.prototype.setNotification = function(enable, force){};
    /**
     * Return state of notification
     * @returns {boolean}
     */
    geotoolkit.seismic.util.ColorMap.prototype.isNotificationEnabled = function(){};
    /**
     * Returns surface that represents color map
     * @param {number} width width of the image
     * @param {number} height height of the image
     * @param {boolean} vertical is vertical or not
     * @returns {geotoolkit.renderer.Surface}
     */
    geotoolkit.seismic.util.ColorMap.prototype.exportToImage = function(width, height, vertical){};

/**
 * Defines a default SeismicColor set. Users can create a custom SeismicColor set or get a default implementation. Please refer to SeismicColors.getDefault() for a list of default sets.
 *
 * @class geotoolkit.seismic.util.SeismicColors
 */
geotoolkit.seismic.util.SeismicColors = {};
    /**
     * Register colorMap
     * @param {string}name The name of the colorMap
     * @param {Function}callback The registration function.
     * @returns {geotoolkit.seismic.util.SeismicColors}
     */
    geotoolkit.seismic.util.SeismicColors.prototype.register = function(name, callback){};
    /**
     * Returns list of available color map
     * @returns {Array<String>}colorMapNames The array with all the colorMap names.
     */
    geotoolkit.seismic.util.SeismicColors.prototype.listNameColorMaps = function(){};
    /**
     * Build named color map with specified ramp size
     * @param {string} name The name of the colorMap
     * @param {number} [rampSize = undefined] The number of color bins in the colorMap.
     * @returns {?geotoolkit.seismic.util.ColorMap}
     */
    geotoolkit.seismic.util.SeismicColors.prototype.createNamedColorMap = function(name, rampSize){};
    /**
     * Returns the default instance of colormaps. The default colormaps available are: <br>
     * <br>
     * geotoolkit.seismic.util.defines.Angles5color, <br>
     * geotoolkit.seismic.util.defines.BlackRedYellowWhite, <br>
     * geotoolkit.seismic.util.defines.GreyOrange,<br>
     * geotoolkit.seismic.util.defines.IntervalVelocity,<br>
     * geotoolkit.seismic.util.defines.IntervalVelocity16,<br>
     * geotoolkit.seismic.util.defines.IntervalVelocity32,<br>
     * geotoolkit.seismic.util.defines.Rainbow,<br>
     * geotoolkit.seismic.util.defines.RedGreenBlue,<br>
     * geotoolkit.seismic.util.defines.RedWhiteBlack,<br>
     * geotoolkit.seismic.util.defines.RedWhiteBlue,<br>
     * geotoolkit.seismic.util.defines.RedWhiteBlueExtremes,<br>
     * geotoolkit.seismic.util.defines.RedWhiteBlueHot,<br>
     * geotoolkit.seismic.util.defines.RedYellowBlue,<br>
     * geotoolkit.seismic.util.defines.Saddleback,<br>
     * geotoolkit.seismic.util.defines.SaddlebackHot,<br>
     * geotoolkit.seismic.util.defines.Spectrum,<br>
     * geotoolkit.seismic.util.defines.WhiteBlack<br>
     * @returns {geotoolkit.seismic.util.SeismicColors} seismicColors<br>
     * @example
     * var colorProvider = geotoolkit.seismic.util.SeismicColors.getDefault();
     * var colormap = colorProvider.createNamedColorMap("WhiteBlack");
     */
    geotoolkit.seismic.util.SeismicColors.getDefault = function(){};

/** @namespace */
geotoolkit.seismic.data = {};
    /**
     * An enumeration for byte orders.
     * @readonly
     * @enum
     */
    geotoolkit.seismic.data.ByteOrder = {};
        /**
         * Constant denoting little-endian byte order.
         * In this order, the bytes of a multibyte value
         * are ordered from least significant to most significant.
         * @type {string}
         */
        geotoolkit.seismic.data.ByteOrder.LittleEndian = "";
        /**
         * Constant denoting big-endian byte order. In this order, the bytes of a
         * multibyte value are ordered from most significant to least significant.
         * @type {string}
         */
        geotoolkit.seismic.data.ByteOrder.BigEndian = "";
    /**
     * Data format type enum
     * @readonly
     * @enum
     */
    geotoolkit.seismic.data.DataFormatType = {};
        /**
         * Undefined
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.Undefined = NaN;
        /**
         * Byte
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.Byte = NaN;
        /**
         * Short
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.Short = NaN;
        /**
         * Integer
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.Int = NaN;
        /**
         * Float
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.Float = NaN;
        /**
         * IBM Float
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.IbmFloat = NaN;
        /**
         * Double
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.Double = NaN;
        /**
         * Nibble
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.Nibble = NaN;
        /**
         * Unsigned byte
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.UByte = NaN;
        /**
         * Unsigned short
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.UShort = NaN;
        /**
         * Unsigned integer 32 bit (The same as UInt32)
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.UInt = NaN;
        /**
         * Unsigned integer 32 bit
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.UInt32 = NaN;
        /**
         * Unsigned integer 64 bit
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.UInt64 = NaN;
        /**
         * Integer 32 bit (The same as Int)
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.Int32 = NaN;
        /**
         * Integer 64-bit
         * @type {number}
         */
        geotoolkit.seismic.data.DataFormatType.Int64 = NaN;
    /**
     * Data format type enum
     * @readonly
     * @enum
     */
    geotoolkit.seismic.data.SampleDataFormatType = {};
        /**
         * IBM Float
         * @type {number}
         */
        geotoolkit.seismic.data.SampleDataFormatType.IbmFloat = NaN;
        /**
         * 32-bit Integer
         * @type {number}
         */
        geotoolkit.seismic.data.SampleDataFormatType.Int32 = NaN;
        /**
         * 16-bit Integer
         * @type {number}
         */
        geotoolkit.seismic.data.SampleDataFormatType.Int16 = NaN;
        /**
         * IEEE Float
         * @type {number}
         */
        geotoolkit.seismic.data.SampleDataFormatType.IeeeFloat = NaN;
        /**
         * 8-bit Integer
         * @type {number}
         */
        geotoolkit.seismic.data.SampleDataFormatType.Int8 = NaN;

/** @namespace */
geotoolkit.seismic.data.snap = {};

/** @namespace */
geotoolkit.seismic.data.compression = {};

/**
 * Defines a result which is returned by query
 *
 * @class geotoolkit.seismic.data.QueryResult
 */
geotoolkit.seismic.data.QueryResult = {};
    /**
     * Iterate each section is result set
     *
     * @function
     * @abstract
     * @param {function} callback callback function with two parameters section id and section
     */
    geotoolkit.seismic.data.QueryResult.prototype.foreach = function(callback){};
    /**
     * Returns initial query object
     *
     * @function
     * @abstract
     * @returns {object}
     */
    geotoolkit.seismic.data.QueryResult.prototype.getQuery = function(){};
    /**
     * Return trace by index
     *
     * @function
     * @abstract
     * @returns {geotoolkit.seismic.data.Trace}
     */
    geotoolkit.seismic.data.QueryResult.prototype.getTrace = function(){};

/**
 * Seismic meta data is a map of general properties of the seismic data source like: number of traces, sample rate, ...
 * The seismic toolkit creates instances of SeismicMetaData inside the toolkit.
 * Toolkit users do not need to create instances of this class.
 *
 * @class geotoolkit.seismic.data.SeismicMetaData
 * @param {number} [samplePower=-6] An integer power of 10 that is multiplied by the sample rate from the seismic dataset header before
 * the sample rate is used. Defaults to -6 if not specified. This default value implies that the sample rate in the dataset is
 * stored in micro-seconds.
 */
geotoolkit.seismic.data.SeismicMetaData = {};
    /**
     * IndexType enumerator, describes the index type of the underlying seismic
     * @enum
     * @readonly
     */
    geotoolkit.seismic.data.SeismicMetaData.IndexType = {};
        /**
         * Non indexed seismic
         * @type {string}
         */
        geotoolkit.seismic.data.SeismicMetaData.IndexType.NonIndexed = "";
        /**
         * Seismic 2D line
         * @type {string}
         */
        geotoolkit.seismic.data.SeismicMetaData.IndexType.TwoD = "";
        /**
         * A Seismic Volume, has at least 3 keys see getIndexKeyNames()
         * @type {string}
         */
        geotoolkit.seismic.data.SeismicMetaData.IndexType.Volume = "";
        /**
         * Seismic Gather, has at least 4 keys see getIndexKeyNames()
         * @type {string}
         */
        geotoolkit.seismic.data.SeismicMetaData.IndexType.Gather = "";
        /**
         * Custom index type
         * @type {string}
         */
        geotoolkit.seismic.data.SeismicMetaData.IndexType.Custom = "";
    /**
     * Returns the index type of the under
     * @returns {geotoolkit.seismic.data.SeismicMetaData.IndexType}
     */
    geotoolkit.seismic.data.SeismicMetaData.prototype.getIndexType = function(){};
    /**
     * Returns the volume key names IF available, null otherwise.
     * Those keys are the grid coordinates key names that can eventually be used to map IJ to XY
     * @returns {object} [volumeKeyNames] Json containing key names
     * @returns {string} [volumeKeyNames.i] key names
     * @returns {string} [volumeKeyNames.j] key names
     */
    geotoolkit.seismic.data.SeismicMetaData.prototype.getVolumeKeyNames = function(){};
    /**
     * Returns the volume default key names If available, null otherwise.
     * Those keys are the grid coordinates key names that may eventually be used to map IJ to XY
     * @returns {object} [volumeDefaultKeyNames] Json containing default key names
     * @returns {string} [volumeDefaultKeyNames.i] key names
     * @returns {string} [volumeDefaultKeyNames.j] key names
     */
    geotoolkit.seismic.data.SeismicMetaData.prototype.getVolumeDefaultKeyNames = function(){};
    /**
     * Returns the XY key information IF available, null otherwise.
     * Those keys can be used to retrieve the X,Y coordinate of a given trace by looking up the values in the header.
     * @returns {object} [xyKeyInformation] Json containing default key names
     * @returns {string} [xyKeyInformation.x] key information
     * @returns {string} [xyKeyInformation.y] key information
     * @returns {string} [xyKeyInformation.xKeyName] x key name
     * @returns {string} [xyKeyInformation.yKeyName] y key name
     * @returns {string} [xyKeyInformation.multiplierType] multiplier type
     * @returns {string} [xyKeyInformation.multiplierFieldName] multiplier field name
     * @returns {string} [xyKeyInformation.fixedMultiplier] fixed multiplier
     */
    geotoolkit.seismic.data.SeismicMetaData.prototype.getXYKeyInformation = function(){};
    /**
     * Returns the sample unit
     * @returns {geotoolkit.util.AbstractUnit}
     */
    geotoolkit.seismic.data.SeismicMetaData.prototype.getZUnit = function(){};
    /**
     * Returns start value of first sample.
     * @returns {number}
     */
    geotoolkit.seismic.data.SeismicMetaData.prototype.getStartValue = function(){};
    /**
     * Gets the sample rate for the seismic data. The sample rate is
     * specified in the units returned by <c>getZUnit()<c>.
     *
     * @returns {number}
     */
    geotoolkit.seismic.data.SeismicMetaData.prototype.getSampleRate = function(){};
    /**
     * Gets the samples per trace
     *
     * @returns {number}
     */
    geotoolkit.seismic.data.SeismicMetaData.prototype.getSamplesPerTrace = function(){};
    /**
     * Gets the number of traces
     *
     * @returns {number}
     */
    geotoolkit.seismic.data.SeismicMetaData.prototype.getNumberOfTraces = function(){};
    /**
     * Gets the sections.<br>
     * <br>
     * Sections describes any optional seismic subdivisions.<br>
     * This is typically used to identify seismic panels in an arbitrary line.<br>
     * @returns {number[]} The sections
     */
    geotoolkit.seismic.data.SeismicMetaData.prototype.getSections = function(){};
    /**
     * Gets EBCDIC header information or text.
     *
     * @returns {string} EBCDIC text, can be null.
     * @example
     * // to get EBCDIC information if it's available and assume you have pipeline instance.
     * pipeline.getReader().getMetaData().getEBCDICHeader();
     */
    geotoolkit.seismic.data.SeismicMetaData.prototype.getEBCDICHeader = function(){};

/**
 * Abstract seismic trace is a collection of samples.
 * A trace is logically subdivided into zero or more trace headers and zero or more samples.
 * Data is organized as list of traces sorted by headers. The number of samples equals to the number of corresponding headers.
 * @class geotoolkit.seismic.data.Trace
 */
geotoolkit.seismic.data.Trace = {};
    /**
     * Returns an array of the samples
     *
     * @function
     * @abstract
     * @param {Array} [buffer] Array of samples to be used as buffer to copy samples
     * @returns {Array}
     */
    geotoolkit.seismic.data.Trace.prototype.getSamples = function(buffer){};
    /**
     * Returns a count of the samples in the trace
     *
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.seismic.data.Trace.prototype.getCountOfSamples = function(){};
    /**
     * Return trace header value by identifier
     *
     * @function
     * @param {?number} [index] index of the header if index is not specified it returns a header and header data
     * @returns {?object|number} header
     * @returns {?object} [header.header] trace header
     * @returns {?object} [header.data] trace header data
     */
    geotoolkit.seismic.data.Trace.prototype.getHeader = function(index){};
    /**
     * Returns the trace id in the reader
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.seismic.data.Trace.prototype.getTraceId = function(){};

/**
 * TraceSection is an 'interface' class for seismic traces collection.
 * A trace section provides access to its traces individually whatever the internal format is (for example a bulk array of binary values).
 * Inheriting classes are responsible for providing the actual implementation.
 * @class geotoolkit.seismic.data.TraceSection
 */
geotoolkit.seismic.data.TraceSection = {};
    /**
     * Return trace by number from 0 to reader.getTraceNumber()-1
     *
     * @function
     * @abstract
     * @param {number} traceid unique trace id
     * @returns {geotoolkit.seismic.data.Trace}
     */
    geotoolkit.seismic.data.TraceSection.prototype.getTrace = function(traceid){};
    /**
     * Creates a clone of the trace section
     *
     * @function
     * @abstract
     * @returns {geotoolkit.seismic.data.TraceSection}
     */
    geotoolkit.seismic.data.TraceSection.prototype.clone = function(){};
    /**
     * Returns start and end trace indices
     *
     * @function
     * @abstract
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.seismic.data.TraceSection.prototype.getTraceRange = function(){};
    /**
     * Returns number of traces in the section
     *
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.seismic.data.TraceSection.prototype.getNumberOfTraces = function(){};
    /**
     * Returns trace by index in the section
     *
     * @function
     * @param {number} index trace index in the section starting from 0 to getNumberOfTraces()-1
     * @returns {geotoolkit.seismic.data.Trace}
     */
    geotoolkit.seismic.data.TraceSection.prototype.getTraceByIndex = function(index){};

/**
 * Creates wrapper class for a file reader.
 *
 * @class geotoolkit.seismic.data.LocalFile
 * @param {File} localFile the local file for e.g SEG-Y file.
 */
geotoolkit.seismic.data.LocalFile = {};
    /**
     * Returns file name
     * @returns {string} file name
     */
    geotoolkit.seismic.data.LocalFile.prototype.getFileName = function(){};
    /**
     * Return file size
     * @returns {number}
     */
    geotoolkit.seismic.data.LocalFile.prototype.getFileSize = function(){};
    /**
     * Returns the last modified date of the file as the number of milliseconds
     * since the Unix epoch (January 1, 1970 at midnight). Files without
     * a known last modified date return the current date.
     * @returns {number}
     */
    geotoolkit.seismic.data.LocalFile.prototype.getLastModified = function(){};
    /**
     * Returns binary raw data
     *
     * @param {function} callback this is the function called when data is ready
     * @param {number} from offset in bytes
     * @param {number} to offset in bytes
     * @param {object} context context
     */
    geotoolkit.seismic.data.LocalFile.prototype.readyBinarySection = function(callback, from, to, context){};
    /**
     * Return true if local file is supported
     *
     * @returns {boolean}
     */
    geotoolkit.seismic.data.LocalFile.isSupported = function(){};

/**
 * Defines an interface for seismic data source/source of traces.<br>
 * It implements methods like getMetaData() which returns {@link geotoolkit.seismic.data.SeismicMetaData} and <br>
 * Select() function to select and load relevant seismic trace sections .
 *
 * @class geotoolkit.seismic.data.SeismicData
 * @augments geotoolkit.util.EventDispatcher
 */
geotoolkit.seismic.data.SeismicData = {};
    /**
     * IndexType enumerator, describes the index type of the underlying seismic
     * @enum
     * @readonly
     */
    geotoolkit.seismic.data.SeismicData.Events = {};
        /**
         * Event type fired when a seismic data is modified and requires an update cycle to be done
         * @type {string}
         */
        geotoolkit.seismic.data.SeismicData.Events.Invalidate = "";
    /**
     * Return the value to indicate if data was changed
     *
     * @returns {number}
     */
    geotoolkit.seismic.data.SeismicData.prototype.getTimeStamp = function(){};
    /**
     * Update time stamp
     * @protected
     */
    geotoolkit.seismic.data.SeismicData.prototype.updateTimeStamp = function(){};
    /**
     * Returns seismic meta data information
     *
     * @function
     * @abstract
     * @returns {geotoolkit.seismic.data.SeismicMetaData}
     */
    geotoolkit.seismic.data.SeismicData.prototype.getMetaData = function(){};
    /**
     * Select seismic trace sections and call "callback" method then section is loaded.
     *
     * @function
     * @param {object} query a query in JSON format. Should contain parameters relevant to the trace, such as "from", "to", "headers", and "samples"
     * @param {boolean} [query.headers=true] result should have trace headers
     * @param {boolean} [query.samples=true] result should have trace samples
     * @param {number} [query.from] specify a start trace index from 0 to getTraceNumbers()-1
     * @param {number} [query.to] specify end trace index from 0 to getTraceNumbers()-1
     * @param {array.<number>} [query.traceIndexes] optional indices of traces from 0 to getTraceNumbers()-1
     * @param {function} callback callback to be called then section is loaded. This method has {geotoolkit.seismic.data.QueryResult}
     * as parameter
     */
    geotoolkit.seismic.data.SeismicData.prototype.select = function(query, callback){};
    /**
     * Invalidate data and notify that data is changed
     * @param {geotoolkit.util.Rect} [rect=null] optional area of tracers and samples to invalidate. It is not
     * supported now
     */
    geotoolkit.seismic.data.SeismicData.prototype.invalidate = function(rect){};

/**
 * Seismic reader reads seismic data from the different sources and provides it to trace processor in uniform representation as a collection of traces,<br>
 * where a trace is a collection of samples. A trace is logically subdivided into zero or more trace headers and zero or more samples.<br>
 * Seismic Reader also returns information about seismic data, like number of many traces it has, number of samples per trace, <br>
 * unit of samples, sample rate and also provides trace headers information.
 * @class geotoolkit.seismic.data.SeismicReader
 * @augments geotoolkit.seismic.data.SeismicData
 * @param {number|object} options nullValue or options is passed when a value does not exist. There will be a break in the wiggles in that area. Fill will not fill that area. User can set a custom color for NullValue
 * @param {number} [options.nullValue] null value
 * @param {number} [options.fetchsize=256] maximum number of the traces per requests
 */
geotoolkit.seismic.data.SeismicReader = {};
    /**
     * SeismicReader Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.seismic.data.SeismicReader.Events = {};
        /**
         * Event fired when a data received from the source
         * @type {string}
         */
        geotoolkit.seismic.data.SeismicReader.Events.DataReceived = "";
        /**
         * Event fired when failed to get data from the source
         * @type {string}
         */
        geotoolkit.seismic.data.SeismicReader.Events.DataFailed = "";
    /**
     * returns options
     * @returns {object} options
     */
    geotoolkit.seismic.data.SeismicReader.prototype.getOptions = function(){};
    /**
     * Returns null value
     * @returns {number} null value
     */
    geotoolkit.seismic.data.SeismicReader.prototype.getNullValue = function(){};
    /**
     * Returns seismic model limits
     *
     * @function
     * @abstract
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.seismic.data.SeismicReader.prototype.getModelLimits = function(){};
    /**
     * Load {geotoolkit.seismic.data.SeismicMetaData} seismic meta data.
     * Seismic meta data is a map of general properties of the seismic data source like: number of traces, sample rate, .
     *
     * @function
     * @abstract
     * @param {function} callback method to be called when data is ready
     */
    geotoolkit.seismic.data.SeismicReader.prototype.loadMetaData = function(callback){};
    /**
     * Returns number of traces
     *
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.seismic.data.SeismicReader.prototype.getNumberOfTraces = function(){};
    /**
     * Returns number of samples
     *
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.seismic.data.SeismicReader.prototype.getNumberOfSamples = function(){};
    /**
     * Returns sample rate . Sample rate is the number of times an analog signal is measured (sampled) per second.<br>
     * Basically it is a difference between nearest sample values. This term comes from digital signal processing and defines how <br>
     * continuous signal is sampled. For example: 0.004/ second
    
     *
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.seismic.data.SeismicReader.prototype.getSampleRate = function(){};
    /**
     * Returns an array of field descriptors for the dataset read by this
     * seismic reader.
     *
     * @function
     * @abstract
     * @returns {Array<geotoolkit.seismic.data.FieldDesc>}
     */
    geotoolkit.seismic.data.SeismicReader.prototype.getTraceHeaderFields = function(){};
    /**
     * returns seismic trace section
     *
     * @function
     * @abstract
     * @param {object} query this specifies the condition of the request
     * @param {function} callback method to be called when data is ready
     */
    geotoolkit.seismic.data.SeismicReader.prototype.select = function(query, callback){};

/**
 * A seismic reader that keeps all traces in memory.
 * This Reader is the Proxy for any SeismicReader.
 * It saves traces in inner cache at the first request and gives them from cache at the following requests.
 *
 * @class geotoolkit.seismic.data.CachingReader
 * @augments geotoolkit.seismic.data.SeismicReader
 * @param {geotoolkit.seismic.data.SeismicReader} seismicReader instance of SeismicReader that will be proxied
 * @param {number} memoryLimit Memory limit in Megabytes
 */
geotoolkit.seismic.data.CachingReader = {};
    /**
     * Sets memory limit in Megabytes. Attention! Removes all existing traces from cache.
     * @param {number} memoryLimit Memory limit in Megabytes
     * @returns {geotoolkit.seismic.data.CachingReader} this
     */
    geotoolkit.seismic.data.CachingReader.prototype.setCacheSize = function(memoryLimit){};
    /**
     * @override
     */
    geotoolkit.seismic.data.CachingReader.prototype.select = function(){};
    /**
     * proxy to original reader
     * @returns {object}
     */
    geotoolkit.seismic.data.CachingReader.prototype.getOptions = function(){};
    /**
     * proxy to original reader
     * @returns {object}
     */
    geotoolkit.seismic.data.CachingReader.prototype.getNullValue = function(){};
    /**
     * proxy to original reader
     * @returns {object}
     */
    geotoolkit.seismic.data.CachingReader.prototype.getModelLimits = function(){};
    /**
     * proxy to original reader
     * @returns {object}
     */
    geotoolkit.seismic.data.CachingReader.prototype.loadMetaData = function(){};
    /**
     * proxy to original reader
     * @returns {object}
     */
    geotoolkit.seismic.data.CachingReader.prototype.getNumberOfTraces = function(){};
    /**
     * proxy to original reader
     * @returns {object}
     */
    geotoolkit.seismic.data.CachingReader.prototype.getNumberOfSamples = function(){};
    /**
     * proxy to original reader
     * @returns {object}
     */
    geotoolkit.seismic.data.CachingReader.prototype.getSampleRate = function(){};
    /**
     * proxy to original reader
     * @returns {object}
     */
    geotoolkit.seismic.data.CachingReader.prototype.getTraceHeaderFields = function(){};
    /**
     * proxy to original reader
     * @returns {object}
     */
    geotoolkit.seismic.data.CachingReader.prototype.getStatistics = function(){};
    /**
     * proxy to original reader
     * @returns {object}
     */
    geotoolkit.seismic.data.CachingReader.prototype.getMetaData = function(){};

/**
 * Defines trace mapping.
 *
 * @class geotoolkit.seismic.data.TraceMapping
 */
geotoolkit.seismic.data.TraceMapping = {};
    /**
     * Return model trace spacing
     * @type {number} model trace spacing
     */
    geotoolkit.seismic.data.TraceMapping.prototype.getModelTraceSpacing = function(){};
    /**
     * Return index of the trace by its location
     *
     * @function
     * @abstract
     * @param {number} location
     * @returns {number}
     */
    geotoolkit.seismic.data.TraceMapping.prototype.getTraceIndex = function(location){};
    /**
     * Return trace location by its index
     *
     * @function
     * @abstract
     * @param {number} index
     * @returns {number}
     */
    geotoolkit.seismic.data.TraceMapping.prototype.getTraceLocation = function(index){};
    /**
     * Returns array of traces
     * @function
     * @abstract
     * @param {number} from
     * @param {number} to
     * @returns {Array<number>} array of traces
     */
    geotoolkit.seismic.data.TraceMapping.prototype.getTraces = function(from, to){};
    /**
     * Return trace location range
     *
     * @function
     * @abstract
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.seismic.data.TraceMapping.prototype.getTraceLocationRange = function(){};
    /**
     * Return number of destination traces
     *
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.seismic.data.TraceMapping.prototype.getNumberOfDestinationTraces = function(){};

/**
 * Defines variable space trace mapping
 *
 * @class geotoolkit.seismic.data.VSTraceMapping
 * @augments geotoolkit.seismic.data.TraceMapping
 * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline
 * @param {geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} positions positions of traces in the model space
 * @param {number} [traceSpacing=1] model trace spacing
 * @param {geotoolkit.util.Range} [traceRange=null] model trace range
 */
geotoolkit.seismic.data.VSTraceMapping = {};
    /**
     * Returns model trace spacing
     * @override
     * @returns {number} model trace spacing
     */
    geotoolkit.seismic.data.VSTraceMapping.prototype.getModelTraceSpacing = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.seismic.data.VSTraceMapping.prototype.getTraceIndex = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.seismic.data.VSTraceMapping.prototype.getTraceLocation = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.seismic.data.VSTraceMapping.prototype.getTraces = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.seismic.data.VSTraceMapping.prototype.getTraceLocationRange = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.seismic.data.VSTraceMapping.prototype.getNumberOfDestinationTraces = function(){};

/**
 * The FieldDesc is a base class for seismic trace header's field descriptors. It is common to all field descriptors.
 * A header field descriptor describes the name and identifier of a given header field.
 *
 * @class geotoolkit.seismic.data.FieldDesc
 * @param {string} fieldId identifier (type)
 * @param {string} name name of the field
 * @param {string} [title=null] title of the field
 */
geotoolkit.seismic.data.FieldDesc = {};
    /**
     * Returns name
     *
     * @returns {string}
     */
    geotoolkit.seismic.data.FieldDesc.prototype.getName = function(){};
    /**
     * Returns identifier (type)
     *
     * @returns {string}
     */
    geotoolkit.seismic.data.FieldDesc.prototype.getIdentifier = function(){};
    /**
     * Returns title
     *
     * @returns {string}
     */
    geotoolkit.seismic.data.FieldDesc.prototype.getTitle = function(){};
    /**
     * Set title
     *
     * @param {string} title
     * @returns {geotoolkit.seismic.data.FieldDesc} this
     */
    geotoolkit.seismic.data.FieldDesc.prototype.setTitle = function(title){};
    /**
     * Returns clone of the field descriptor
     * @returns {geotoolkit.seismic.data.FieldDesc}
     */
    geotoolkit.seismic.data.FieldDesc.prototype.getClone = function(){};
    /**
     * Returns string representation
     *
     * @returns {string}
     */
    geotoolkit.seismic.data.FieldDesc.prototype.toString = function(){};
    /**
     * Returns true if headers are identical
     * @param {geotoolkit.seismic.data.FieldDesc} header
     */
    geotoolkit.seismic.data.FieldDesc.prototype.equalsTo = function(header){};

/**
 * DataHeader is an 'interface/abstract' class responsible for holding the seismic trace header. Inheriting classes would provide the actual implementation.
 * Headers are organized as set of 'fields' and 'values'.
 *
 * @class geotoolkit.seismic.data.DataHeader
 * @param {number} size number of bytes
 * @param {string} headerType type of traceheader
 */
geotoolkit.seismic.data.DataHeader = {};
    /**
     * Return size
     *
     * @function
     * @returns {number}
     */
    geotoolkit.seismic.data.DataHeader.prototype.getSize = function(){};
    /**
     * Return identifer (type)
     *
     * @function
     * @returns {string}
     */
    geotoolkit.seismic.data.DataHeader.prototype.getHeaderType = function(){};
    /**
     * Return trace header value by identifier
     *
     * @function
     * @param {ArrayBuffer} binary binary data
     * @returns {?object} binary
     */
    geotoolkit.seismic.data.DataHeader.prototype.parse = function(binary){};
    /**
     * Returns true if contains field type
     *
     * @function
     * @param {string} fieldType type of the field in the array.
     * @returns {?object} null
     */
    geotoolkit.seismic.data.DataHeader.prototype.containsField = function(fieldType){};
    /**
     * Returns true if array contains field type
     *
     * @function
     * @param {object} data which contains the parse data
     * @param {string} headerFieldType unique name of the header field
     * @returns {?object} null
     */
    geotoolkit.seismic.data.DataHeader.prototype.getFieldValue = function(data, headerFieldType){};
    /**
     * Get a field by its identifier
     *
     * @function
     * @param {string} identifier unique header number
     * @returns {geotoolkit.seismic.data.FieldDesc}
     */
    geotoolkit.seismic.data.DataHeader.prototype.getFieldByIdentifier = function(identifier){};

/**
 * Creates Binary Header.
 * @class geotoolkit.seismic.data.BinaryHeader
 * @augments geotoolkit.seismic.data.DataHeader
 * @param {number} size byte size of header in data source
 * @param {string} headerType type of trace header
 */
geotoolkit.seismic.data.BinaryHeader = {};
    /**
     * Add field to fields array
     *
     * @param {geotoolkit.seismic.data.BinaryField} field Binary field inside header
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.addField = function(field){};
    /**
     * Set byte order.
     * True if order === "BIG_ENDIAN"
     *
     * @param {geotoolkit.seismic.data.ByteOrder|string} order the byte order
     * @returns {geotoolkit.seismic.data.BinaryHeader} this
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.setByteOrder = function(order){};
    /**
     * Returns byte order.
     * "BIG_ENDIAN" or LITTLE_ENDIAN"
     *
     * @returns {string|geotoolkit.seismic.data.ByteOrder}
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.getByteOrder = function(){};
    /**
     * Returns true if fieldType exists in fields array
     *
     * @param {string} fieldType type of the field in the array
     * @returns {boolean}
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.containsField = function(fieldType){};
    /**
     * Returns true if fieldName exists in fields array
     *
     * @param {string} fieldName name that gives information about the field
     * @returns {boolean}
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.containsFieldByName = function(fieldName){};
    /**
     * Returns field for corresponding index
     *
     * @param {number} index index for the array of field data
     * @returns {geotoolkit.seismic.data.BinaryField}
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.getFieldByIndex = function(index){};
    /**
     * Returns field with correct fieldType
     *
     * @param {string} fieldType type of the binary field
     * @returns {geotoolkit.seismic.data.BinaryField}
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.getField = function(fieldType){};
    /**
     * Returns field with correct fieldName
     *
     * @param {string} fieldName name that gives information about the field
     * @returns {geotoolkit.seismic.data.BinaryField}
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.getFieldByName = function(fieldName){};
    /**
     * Returns an array of the fields
     *
     * @returns {geotoolkit.seismic.data.BinaryField[]}
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.getFields = function(){};
    /**
     * Returns an array of the fields
     *
     * @param {ArrayBuffer} binary binary data
     * @returns {object}
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.parse = function(binary){};
    /**
     * Parse a specific header
     * @param {Uint8Array} uint8binary array of 8-bit unsigned integers.
     * @param {geotoolkit.seismic.data.BinaryField} field the BinaryField
     * @returns {number} The header value
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.parseField = function(uint8binary, field){};
    /**
     * Returns field for a specific identifier
     *
     * @param {string} identifier unique name for field
     * @returns {geotoolkit.seismic.data.BinaryField}
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.getFieldByIdentifier = function(identifier){};
    /**
     * Returns field value for a specific type
     *
     * @param {object} data data
     * @param {string} headerFieldType unique name of the header field.
     * @returns {?Array}
     */
    geotoolkit.seismic.data.BinaryHeader.prototype.getFieldValue = function(data, headerFieldType){};

/**
 * Creates binary header
 * @class geotoolkit.seismic.data.BinaryField
 * @augments geotoolkit.seismic.data.FieldDesc
 * @param {number} offset offset of the header
 * @param {number} dataType type of the data
 * @param {string} fieldId identifier (type)
 * @param {string} name name of the identifier
 */
geotoolkit.seismic.data.BinaryField = {};
    /**
     * Returns offset
     *
     * @returns {number}
     */
    geotoolkit.seismic.data.BinaryField.prototype.getOffset = function(){};
    /**
     * Returns data type
     *
     * @returns {number}
     */
    geotoolkit.seismic.data.BinaryField.prototype.getDataType = function(){};

/**
 * Defines abstract seismic Format
 *
 * @class geotoolkit.seismic.data.SeismicFormat
 *
 */
geotoolkit.seismic.data.SeismicFormat = {};
    /**
     * Add header
     * @param {geotoolkit.seismic.data.DataHeader} header
     * @returns {geotoolkit.seismic.data.DataHeader}
     */
    geotoolkit.seismic.data.SeismicFormat.prototype.addHeader = function(header){};
    /**
     * Return headers count
     * @returns {number}
     */
    geotoolkit.seismic.data.SeismicFormat.prototype.getHeadersCount = function(){};
    /**
     * Return header by index
     * @param {number} index index of the header
     * @returns {geotoolkit.seismic.data.DataHeader}
     */
    geotoolkit.seismic.data.SeismicFormat.prototype.getHeader = function(index){};
    /**
     * Add trace header
     * @param {geotoolkit.seismic.data.BinaryHeader} header
     * @returns {geotoolkit.seismic.data.BinaryHeader}
     */
    geotoolkit.seismic.data.SeismicFormat.prototype.addTraceHeader = function(header){};
    /**
     * Return count of trace headers
     * @returns {Number}
     */
    geotoolkit.seismic.data.SeismicFormat.prototype.getTraceHeadersCount = function(){};
    /**
     * Return trace header by index
     * @param {number} index
     * @returns {geotoolkit.seismic.data.BinaryHeader}
     */
    geotoolkit.seismic.data.SeismicFormat.prototype.getTraceHeader = function(index){};
    /**
     * Return a size of the line headers in bytes
     * @returns {number}
     */
    geotoolkit.seismic.data.SeismicFormat.prototype.getLineHeadersSize = function(){};
    /**
     * Return a size of the trace header in bytes
     * @returns {number}
     */
    geotoolkit.seismic.data.SeismicFormat.prototype.getTraceHeadersSize = function(){};

/**
 * Defines StandardSegyFormat which is a SegyFormat class that provides basic
 * information about SEG Y formatted file.
 *
 * @class geotoolkit.seismic.data.StandardSegyFormat
 * @augments geotoolkit.seismic.data.SeismicFormat
 */
geotoolkit.seismic.data.StandardSegyFormat = {};

/**
 * Defines reader of local SEG-Y files.
 *
 * @class geotoolkit.seismic.data.SegyReader
 * @augments geotoolkit.seismic.data.SeismicReader
 * @param {geotoolkit.seismic.data.LocalFile} file The file object
 * @param {geotoolkit.seismic.data.SeismicFormat} segyFormat specifies the trace data format and location of headers
 * @param {number} [samplePower=-6]
 * @param {number} nullValue null value
 */
geotoolkit.seismic.data.SegyReader = {};
    /**
     * returns seismic model limits
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.seismic.data.SegyReader.prototype.getModelLimits = function(){};
    /**
     * load {geotoolkit.seismic.data.SeismicMetaData} seismic meta data
     *
     * @override
     * @param {function} callback method to be called when data is ready
     */
    geotoolkit.seismic.data.SegyReader.prototype.loadMetaData = function(callback){};
    /**
     * returns seismic meta data information
     *
     * @override
     * @returns {geotoolkit.seismic.data.SeismicMetaData}
     */
    geotoolkit.seismic.data.SegyReader.prototype.getMetaData = function(){};
    /**
     * read SEG-Y statistics
     * @param {function} callback method to be called when statistics will be calculated.
     */
    geotoolkit.seismic.data.SegyReader.prototype.readDataSetStatistics = function(callback){};
    /**
     * returns number of traces
     *
     * @override
     * @returns {number}
     */
    geotoolkit.seismic.data.SegyReader.prototype.getNumberOfTraces = function(){};
    /**
     * returns number of samples
     *
     * @override
     * @returns {number}
     */
    geotoolkit.seismic.data.SegyReader.prototype.getNumberOfSamples = function(){};
    /**
     * returns sample rate
     *
     * @override
     * @returns {number}
     */
    geotoolkit.seismic.data.SegyReader.prototype.getSampleRate = function(){};
    /**
     * Return SEG-Y data format
     * @returns {geotoolkit.seismic.data.SeismicFormat} seismic data format
     */
    geotoolkit.seismic.data.SegyReader.prototype.getDataFormat = function(){};
    /**
     * returns seismic trace section
     *
     * @override
     * @param {object} query a query in JSON format. Should contain parameters relevant to the trace, such as "from", "to", "headers", and "samples"
     * @param {boolean} [query.headers=true] ignored
     * @param {boolean} [query.samples=true] ignored
     * @param {number} [query.from] specify a start trace index from 0 to getTraceNumbers()-1
     * @param {number} [query.to] specify end trace index from 0 to getTraceNumbers()-1
     * @param {array.<number>} [query.traceIndexes] optional indices of traces from 0 to getTraceNumbers()-1
     * @param {function} callback callback to be called then section is loaded. This method has {geotoolkit.seismic.data.QueryResult}
     * @example Selection by range
     * reader.select({"from": 0, "to": 10)},function (result) {
     * });
     * @example Selection by trace indices
     * reader.select({"traceIndexes": [0, 10]},function (result) {
     * });
     */
    geotoolkit.seismic.data.SegyReader.prototype.select = function(query, callback){};
    /**
     * Returns an array of field descriptors for the dataset read by this
     * seismic reader.
     *
     * @override
     * @returns {Array<geotoolkit.seismic.data.FieldDesc>} array of header descriptors
     */
    geotoolkit.seismic.data.SegyReader.prototype.getTraceHeaderFields = function(){};

/**
 * A seismic reader that keeps all traces in memory.
 * This reader should only be used for small seismic datasets given that
 * all its data is kept in memory.
 * This reader can work in synchronous or asynchronous mode.
 * See the setTraceProcessor method for further details and examples.<br>
 * <i>The preferred way to call this constructor is with a single parameter object. Using
 * numeric parameters is deprecated.</i>
 *
 *
 *
 * @class geotoolkit.seismic.data.MemoryReader
 * @augments geotoolkit.seismic.data.SeismicReader
 * @param {object | number} options deprecated (since 2.6 number type is deprecated) options object or number of traces in the memory reader
 * @param {number} [options.numberOfSamples] The sample count per trace
 * @param {number} [options.numberOfTraces] The number of traces in the memory reader
 * @param {number} [options.nullValue] nullValue is passed when a value does not exist. There will be a break in the wiggles or density plot in that area. Fill will not fill that area. User can set a custom color for nullValue
 * @param {number} [options.sampleRate] The sample rate
 * @param {number[]} [options.sections] If the reader has sections, the number of traces in each section. See SeismicMedataData.sections for more info.
 * @param {geotoolkit.util.AbstractUnit} [options.zUnit] Unit for the usual time or depth axis in the dataset
 * @param {object} [options.volumeKeyNames] See SeismicMedataData VolumeKeyNames for more info.
 * @param {geotoolkit.seismic.data.SeismicMetaData.IndexType} [options.indexType] Index type for this memory reader
 * @param {object} [options.volumeDefaultKeyNames] See SeismicMedataData VolumeDefaultKeyNames for more info.
 * @param {object} [options.xyKeyNames] See SeismicMedataData xyKeyInformation for more info.
 * @param {number} [samplesPerTrace] deprecated (since 2.2 use options instead) The samples per trace. This argument is only used if options is a number.
 * @param {number} [sampleRate] deprecated (since 2.2 use options instead) The sample rate. This argument is only used if options is a number.
 * @param {number} [samplePower] deprecated (since 2.2 use options instead) The sample power.
 * @param {number} [nullValue] deprecated (since 2.2 use options instead) The null value. This argument is only used if options is a number.
 *
 *@example
 var reader = new geotoolkit.seismic.data.MemoryReader({"numberOfSamples": 1024,
 "numberOfTraces": 100,
 "sampleRate": 0.004
 });
 */
geotoolkit.seismic.data.MemoryReader = {};
    /**
     * @override
     * @returns {Array<geotoolkit.seismic.data.FieldDesc>}
     */
    geotoolkit.seismic.data.MemoryReader.prototype.getTraceHeaderFields = function(){};
    /**
     * Sets the 'trace processor' of this memory reader.<br>
     * The trace processor is a delegate object responsible for providing data to the reader.<br>
     * @param {function()} traceProcessor object that implements following set of functions which provide trace data and statistics to reader.
     * @param {function()} traceProcessor.getDataStatistics method that should return seismic data statistics {'average':Number, 'min':Number, 'max':Number, 'rms':Number}
     * @param {function()} [traceProcessor.getTraceData=null] A callback function that fills the given trace with its sample values
     * @param {function()} [traceProcessor.getTraceHeader=null] A callback function to get trace header data
     * @param {function()} [traceProcessor.getAsyncData=null] Function used in asynchronous mode, it should return an object with a function getTraceData
     * @returns {geotoolkit.seismic.data.MemoryReader} this
     *
     * @example Example of asynchronous reader
     var reader = new geotoolkit.seismic.data.MemoryReader({"numberOfSamples": 1024,
     "numberOfTraces": 100,
     "sampleRate": 0.004
     })
     * .setTraceProcessor({
     * 'getAsyncData': function (query, callback) {
     * // Do something asynchronously, and when it's ready, call the given callback:
     * callback({
     * 'getTraceData': function (reader, trace, traceId) {
     * for (var i = 0; i < this.getNumberOfSamples(); i++) {
     * trace[i] = Math.cos(i / 8);
     * }
     * }
     * }
     * );
     * },
     * 'getDataStatistics': function () {
     * return stats = {
     * 'average': 0,
     * 'min': -1,
     * 'max': 1,
     * 'rms': Math.sqrt(2)
     * };
     * }
     * });
     * @example Example of synchronous reader
     var reader = new geotoolkit.seismic.data.MemoryReader({"numberOfSamples": 1024,
     "numberOfTraces": 100,
     "sampleRate": 0.004
     })
     * .setTraceProcessor({
     * 'getTraceData': function (reader, trace, traceId) {
     * for (var i = 0; i < this.getNumberOfSamples(); i++) {
     * trace[i] = Math.cos(i / 8);
     * }
     * },
     * 'getDataStatistics': function () {
     * return stats = {
     * 'average': 0,
     * 'min': -1,
     * 'max': 1,
     * 'rms': Math.sqrt(2)
     * };
     * }
     * });
     */
    geotoolkit.seismic.data.MemoryReader.prototype.setTraceProcessor = function(traceProcessor){};
    /**
     * Returns statistics
     *
     * @returns {object} statistics
     * @returns {number} statistics.average average
     * @returns {number} statistics.min minimum value
     * @returns {number} statistics.max maximum value
     * @returns {number} statistics.rms rms
     */
    geotoolkit.seismic.data.MemoryReader.prototype.getStatistics = function(){};
    /**
     * read Seismic data statistics
     * @param {function} callback method to be called when data is ready
     */
    geotoolkit.seismic.data.MemoryReader.prototype.readDataSetStatistics = function(callback){};
    /**
     * returns seismic model limits
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.seismic.data.MemoryReader.prototype.getModelLimits = function(){};
    /**
     * Set number of traces
     * @param {number} numberOfTraces The number of traces in the memory reader
     * @returns {geotoolkit.seismic.data.MemoryReader} this
     */
    geotoolkit.seismic.data.MemoryReader.prototype.setNumberOfTraces = function(numberOfTraces){};
    /**
     * returns number of traces
     *
     * @override
     * @returns {number}
     */
    geotoolkit.seismic.data.MemoryReader.prototype.getNumberOfTraces = function(){};
    /**
     * returns number of samples
     *
     * @override
     * @returns {number}
     */
    geotoolkit.seismic.data.MemoryReader.prototype.getNumberOfSamples = function(){};
    /**
     * Sets number of samples per trace
     * @param {number} numberOfSamples number of samples per trace
     * @returns {geotoolkit.seismic.data.MemoryReader} this
     */
    geotoolkit.seismic.data.MemoryReader.prototype.setNumberOfSamples = function(numberOfSamples){};
    /**
     * returns sample rate
     *
     * @override
     * @returns {number}
     */
    geotoolkit.seismic.data.MemoryReader.prototype.getSampleRate = function(){};
    /**
     * returns seismic trace section
     *
     * @override
     * @param {object} query this specifies the condition of the request
     * @param {function} callback method to be called when data is ready
     */
    geotoolkit.seismic.data.MemoryReader.prototype.select = function(query, callback){};
    /**
     * load {geotoolkit.seismic.data.SeismicMetaData} seismic meta data
     *
     * @override
     * @param {function} callback method to be called when data is ready
     */
    geotoolkit.seismic.data.MemoryReader.prototype.loadMetaData = function(callback){};
    /**
     * returns seismic meta data information
     *
     * @override
     * @returns {geotoolkit.seismic.data.SeismicMetaData}
     */
    geotoolkit.seismic.data.MemoryReader.prototype.getMetaData = function(){};

/**
 * Define registry of data providers for geotoolkit.seismic.data.RemoteSeismicDataSource. A new provider can be
 * registered and be called by version
 * @class geotoolkit.seismic.data.RemoteReaderDataProviderRegistry
 */
geotoolkit.seismic.data.RemoteReaderDataProviderRegistry = {};
    /**
     * Return instance of the registry
     * @returns {geotoolkit.seismic.data.RemoteReaderDataProviderRegistry} registry
     */
    geotoolkit.seismic.data.RemoteReaderDataProviderRegistry.getInstance = function(){};
    /**
     * Create a new instance of geotoolkit.seismic.data.RemoteReaderDataProvider
     * @param {string|number} version version of protocol
     * @param {object} [options] optional options to pass to an instance of provider
     * @deprecated since version 2.5
     * @returns {geotoolkit.seismic.data.RemoteReaderDataProvider}
     */
    geotoolkit.seismic.data.RemoteReaderDataProviderRegistry.prototype.getDataProvider = function(version, options){};
    /**
     * Register a provider
     * @param {string|number} version unique version fo provider
     * @param {geotoolkit.seismic.data.RemoteReaderDataProvider} provider provider or be registered
     */
    geotoolkit.seismic.data.RemoteReaderDataProviderRegistry.prototype.register = function(version, provider){};
    /**
     * Return a registered provider for the specified version. This method doesn't create a new instance.
     * @param {string|number} version version of protocol
     * @returns {?geotoolkit.seismic.data.RemoteReaderDataProvider}
     */
    geotoolkit.seismic.data.RemoteReaderDataProviderRegistry.prototype.getProvider = function(version){};
    /**
     * Create a new instance of geotoolkit.seismic.data.RemoteReaderDataProvider
     * @param {string|number} version version of protocol
     * @param {object} [options] optional options to pass to an instance of provider
     * @returns {geotoolkit.seismic.data.RemoteReaderDataProvider}
     */
    geotoolkit.seismic.data.RemoteReaderDataProviderRegistry.prototype.createProvider = function(version, options){};
    /**
     * Enumerate each provider
     *
     * @param {function()} [callback] a function with two parameters version and provider
     * @example How to use
     * var registry = geotoolkit.seismic.data.RemoteReaderDataProviderRegistry.getInstance();
     * registry.forEach(function (version, provider) {
     * });
     */
    geotoolkit.seismic.data.RemoteReaderDataProviderRegistry.prototype.forEach = function(callback){};

/**
 * Define abstract data provider for communication between remote reader and server
 * @class geotoolkit.seismic.data.RemoteReaderDataProvider
 */
geotoolkit.seismic.data.RemoteReaderDataProvider = {};
    /**
     * Create an instance
     * @function
     * @abstract
     * @param {object} options
     * @returns {geotoolkit.seismic.data.RemoteReaderDataProvider} provider
     */
    geotoolkit.seismic.data.RemoteReaderDataProvider.prototype.createInstance = function(options){};
    /**
     * Notify server that reader resources can be released on server
     * @function
     * @param {string} [sourceId] optional parameter id of the data source
     */
    geotoolkit.seismic.data.RemoteReaderDataProvider.prototype.close = function(sourceId){};
    /**
     * This method open connection and load data source information. The output data can be received via success callback {@link geotoolkit.seismic.data.RemoteReaderDataProvider~openSuccess}
     * @function
     * @param {string} fileName
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.seismic.data.RemoteReaderDataProvider.prototype.open = function(fileName){};
    /**
     * This method query traces and returns information about traces {@link geotoolkit.seismic.data.RemoteReaderDataProvider~queryTracesSuccess}
     * @function
     * @param {string} fileName
     * @param {object} [query] a query in JSON format. Should contain parameters relevant to the trace, such as "from", "to", "headers", and "samples"
     * @param {boolean} [query.headers=true] result should have trace headers
     * @param {boolean} [query.samples=true] result should have trace samples
     * @param {number} [query.from] specify a start trace index from 0 to getTraceNumbers()-1
     * @param {number} [query.to] specify end trace index from 0 to getTraceNumbers()-1
     * @param {array.<number>} [query.traceIndexes] optional indices of traces from 0 to getTraceNumbers()-1
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.seismic.data.RemoteReaderDataProvider.prototype.queryTraces = function(fileName, query){};
    /**
     * This method reads traces
     * @function
     * @param {string} fileName
     * @param {object} [options]
     * @param {number} [options.from] start trace number
     * @param {number} [options.to] end trace number
     * @param {array.<number>} [options.traceIndexes] optional array ot traces indices
     * @param {boolean} [options.samples] request samples
     * @param {boolean} [options.headers] request samples
     * @param {object} [options.query] query
     * @param {string} [options.sourceId=""] optional id of the source
     * @param {string} [options.queryId=""] optional id of the query
     * @param {string} [options.byteOrder] byte order
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.seismic.data.RemoteReaderDataProvider.prototype.readTraces = function(fileName, options){};
    /**
     * Notify server that reader resources can be released on server
     * @function
     * @param {string} [sourceId]
     * @param {string} [queryId]
     */
    geotoolkit.seismic.data.RemoteReaderDataProvider.prototype.releaseQuery = function(sourceId, queryId){};
    /**
     * @returns {geotoolkit.seismic.data.ByteOrder}
     */
    geotoolkit.seismic.data.RemoteReaderDataProvider.prototype.getByteOrder = function(){};

/**
 * RemoteSeismicReader is a reader that can access data on a server rather than on a local file.<br>
 * This implementation follows the INTGeoServer(© Interactive Network Technologies, Inc.) API.<br>
 * Meaning that it can be used out of the box to fetch traces from an INTGeoServer(© Interactive Network Technologies, Inc.).<br>
 * <br>
 * This class uses internally xhr and binary transfer to fetch the traces from the server.<br>
 *
 * @class geotoolkit.seismic.data.RemoteSeismicReader
 * @augments geotoolkit.seismic.data.SeismicReader
 * @param {geotoolkit.seismic.data.RemoteSeismicDataSource} datasource The datasource for this reader
 * @param {Object} [options] The options to use
 * @param {number} [options.nullValue] nullValue is passed when a value does not exist. There will be a break in the wiggles in that area. Fill will not fill that area. User can set a custom color for NullValue
 * @param {geotoolkit.seismic.data.SeismicMetaData} [options.metadata] seismic meta data
 * @param {object} [options.statistics] data statistics
 * @param {geotoolkit.seismic.data.DataHeader} [options.traceheader] The trace header
 * @param {string} [options.byteorder] byte order
 * @param {geotoolkit.seismic.data.RemoteReaderDataProvider} [options.provider] data provider
 * @param {number} [nullValue] nullValue is passed when a value does not exist. There will be a break in the wiggles in that area. Fill will not fill that area. User can set a custom color for NullValue
 */
geotoolkit.seismic.data.RemoteSeismicReader = {};
    /**
     * Returns host name
     *
     * @returns {string}
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.getHost = function(){};
    /**
     * Returns file name
     * @returns {string}
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.getSeismicFileName = function(){};
    /**
     * Returns statistics
     *
     * @returns {object} statistics data statistics
     * @returns {number} statistics.average average value
     * @returns {number} statistics.min min value
     * @returns {number} statistics.max max value
     * @returns {number} statistics.rms rms amplitude
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.getStatistics = function(){};
    /**
     * Returns number of traces
     *
     * @override
     * @returns {number}
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.getNumberOfTraces = function(){};
    /**
     * Returns number of samples
     *
     * @override
     * @returns {number}
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.getNumberOfSamples = function(){};
    /**
     * Returns sample rate
     *
     * @override
     * @returns {number}
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.getSampleRate = function(){};
    /**
     * Returns seismic model limits
     *
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.getModelLimits = function(){};
    /**
     * Returns seismic meta data information
     *
     * @override
     * @returns {geotoolkit.seismic.data.SeismicMetaData}
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.getMetaData = function(){};
    /**
     * Select seismic trace sections and then call "callback" method. This function executes a 'select' operation using the given query.<br>
     * The query is executed server side (for RemoteSeismicReader) to filter the traces requested by the client side.<br>
     * The servers sends back the data, and when the request is finalized, the given callback function is called with the result.
     *
     * @override
     * @param {object} query a condition in JSON format
     * @param {boolean} [query.headers=true] result should have trace headers
     * @param {boolean} [query.samples=true] result should have trace samples
     * @param {number} [query.from] specify a start trace index from 0 to getTraceNumbers()-1
     * @param {number} [query.to] specify end trace index from 0 to getTraceNumbers()-1
     * @param {array.<number>} [query.traceIndexes] optional indices of traces from 0 to getTraceNumbers()-1
     * @param {function} callback callback to be called then section is loaded.
     * @example Selection by range
     * reader.select({"from": 0, "to": 10)},function (result) {
     * });
     * @example Selection by trace indices
     * reader.select({"traceIndexes": [0, 10]},function (result) {
     * });
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.select = function(query, callback){};
    /**
     * Return instance of data provider
     * @returns {geotoolkit.seismic.data.RemoteReaderDataProvider}
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.getDataProvider = function(){};
    /**
     * Notify server that reader resources can be released on server
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.release = function(){};
    /**
     * Returns an array of field descriptors for the dataset read by this
     * seismic reader.
     *
     * @override
     * @returns {Array<geotoolkit.seismic.data.FieldDesc>} array of header descriptors
     */
    geotoolkit.seismic.data.RemoteSeismicReader.prototype.getTraceHeaderFields = function(){};

/**
 * Defines remote seismic data source
 *
 * <p>
 * The data source communicate with server using JSON format via HTTP. It uses the following sequence of calls:
 * </p>
 * <ul>
 * <li>-get information about data source</li>
 * <li>-make query</li>
 * <li>-read a bunch of traces from creating query.</li>
 * </ul>
 *
 * <p>
 * The supported query:
 * </p>
 * <ul>
 * <li>
 * 1. Get meta information about data set:
 *
 * <pre>
 * Input:
 * {
 * "file" : fileName,
 * "type" : "info"
 * }
 * Output:
 * {
 * "version": number,
 * "sourceId": number, // Used for optimization
 * "keys": [ {"key": name, "min":minValue, "max":maxValue, "increment":step } ],
 * "numberOfSamples": value,
 * "numberOfTraces": value,
 * "sampleRate": value,
 * "startValue": value,
* "zUnit": value,
 * "statistics": { "min":value, "max":value, "average":value, "rms":value "percentiles":[value1, value2, ...] }, //percentiles only if available
 * "units": value, //cgUnits value
 * "traceHeader": {
 * "fields": [ { "name":name, "id":number, "type":string, "size":bytes } ],"size":bytes
 * }
 *},
 * Example:
 * http://loclahost:8080/seismicreader?json=%7B%22file%22:%22seismicdata/cdp_stack.sgy%22,%22type%22:%22info%22,%22query%22:%7B%7D,%22sourceId%22:-1%7D
 *
 * Where query string parameters:
 * json:{"file":"seismicdata/cdp_stack.sgy","type":"info","query":{},"sourceId":-1}
 * </pre>
 * </li>
 * <li>
 * 2. Get information about query.
 *
 * <pre>
 * Input:
 * {
 * "file" : fileName,
 * "type" : "query",
 * "sourceId": number, // Used for optimization. It is optional
 * "queryId": number, // Used for optimization. it is optional
 * "query": {
 * // See available queries in 3. and 4.
 * }
 * }
 * Output:
 * {
 * "version": number,
 * "queryId": number, // Used for optimization
 * "numberOfSamples": value,
 * "numberOfTraces": value,
 * "sampleRate": value,
 * "startValue": value,
 * "statistics": { "min":value, "max":value, "mean":value, "average":value, "rms":value, "percentiles":[value1, value2, ...] }, //percentiles only if available
 * }
 *
 * Example of query string parameters:
 *
 * json:{"file":"seismicdata/cdp_stack.sgy","type":"query","query":{},"sourceId":1169947804}
 * </pre>
 * </li>
 * <li>
 * 3. Get binary data from the trace range
 *
 * <pre>
 * Input:
 * {
 * "file" : fileName,
 * "type" : "traces",
 * "queryId": number, // Used for optimization. It is optional
 * "query": {
 * "keys": [
 * {
 * "name" : KeyName,
 * "min": minValue,
 * "max": maxValue,
 * "step": stepValue,
 * "order": asc or desc
 * },
 * ...
 * ]
 * },
 * "data" : {
 * "startTrace": startTrace,
 * "endTrace": endTrace,
 * "samples": "true" or "false",
 * "headers": "true" or "false"
 * "byteOrder": "LITTLE_ENDIAN", "BIG_ENDIAN0"
 * }
 * }
 *
 * Output: Binary data. It returns block (endTrace-startTrace+1). Each trace has HEADER and SMAPLES.
 * The header size equals to information from meta data, Samples size equals (4 * samplesCount)
 * The full size of the data block is (endTrace - startTrace + 1) * (headerSize + samplesSize)
 * The samples are returned as float
 *
 * Example of query string parameters:
 * json:{"file":"seismicdata/cdp_stack.sgy","type":"traces","query":{},
 * "data":{"startTrace":0,"endTrace":255,"samples":true,"headers":true,
 * "byteOrder":"LITTLE_ENDIAN"},"sourceId":1169947804,"queryId":1169945598}
 * </pre>
 * </li>
 * <li>
 * 4. Get binary data for an arbitrary path
 *
 * <pre>
 * Input:
 * {
 * "file" : fileName,
 * "type" : "traces",
 * "queryId": number, // Used for optimization. It is optional
 * "query": {
 * "keys": [
 * {"name" : KeyName1, "values": [values for key1]},
 * {"name" : KeyName2, "values": [values for key2]},
 * ],
 * "queryType": "seismicPath",
 * 'emptyTraces': true,
 * },
 *
 * "data" : {
 * "startTrace": startTrace,
 * "endTrace": endTrace,
 * "samples": "true" or "false",
 * "headers": "true" or "false"
 * "byteOrder": "LITTLE_ENDIAN", "BIG_ENDIAN0"
 * }
 * }
 *
 * Output: Binary data. It returns block (endTrace-startTrace+1). Each trace has HEADER and SMAPLES.
 * The header size equals to information from meta data, Samples size equals (4 * samplesCount)
 * The full size of the data block is (endTrace - startTrace + 1) * (headerSize + samplesSize)
 * The samples are returned as float
 *
 * Example of query string parameters:
 *
 * json:{"file":"seismicdata/cdp_stack.sgy","type":"traces","query":{},
 * "data":{"startTrace":0,"endTrace":255,"samples":true,"headers":true,
 * "byteOrder":"LITTLE_ENDIAN"},"sourceId":1169947804,"queryId":1169945598}
 * </pre>
 * </li>
 * <li>
 * 5. Release data source and/or query collection
 *
 * <pre>
 * {
 * "sourceId": number,
 * "queryId": number, // optional
 * "type" : "release"
 * }
 * </pre>
 * </li>
 * </ul>
 *
 * @class geotoolkit.seismic.data.RemoteSeismicDataSource
 * @param {object} options The options
 * @param {string} options.host The service url, see example
 * @param {string} options.filename The filename or resource id
 * @param {string|number} [options.version=1] default version of communication data provider. Supported: 1 and 2, ivaap
 * @param {string} [options.seismicdata="/seismicdata"] web service url to provide meta data about an individual seismic dataset
 * @param {string} [options.seismicquery="/seismicquery"] web service url to provide meta data about a selection of traces
 * @param {string} [options.seismictraces="/seismictraces"] web service url to stream all trace header and sample values for a selection of traces
 * @param {string} [options.binaryheader="/binaryheader"] web service url to provides the bytes that form the binary header, if any
 * @param {object} [options.requestheaders=null] HTTP request headers as key-value pair. it it is specified then ti will be applied
 * @throws {Error} if version of provider is not supported.
 * @example
 * var source = new geotoolkit.seismic.data.RemoteSeismicDataSource({
 * host: 'http://localhost:8084/INTGeoServer/json/advancedseismicreader',
 * file: 'mysegy.segy'}
 * );
 * source.open( function() {
 * var query = {};
 * source.select(query, function (reader) {
 * var statistics = reader.getStatistics();
 * var pipeline = new geotoolkit.seismic.pipeline.SeismicPipeline("test", reader, statistics);
 * pipeline.addTraceProcessor(new geotoolkit.seismic.pipeline.processor.AGC({apply: false}));
 * var colorProvider = geotoolkit.seismic.util.SeismicColors.getDefault();
 * var map = colorProvider.createNamedColorMap("Saddleback");
 * pipeline.setColorMap(map);
 * pipeline.setOptions({
 * normalization: {
 * type: geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType.RMS,
 * limits: new geotoolkit.util.Range(statistics.min, statistics.max),
 * scale: 1
 * },
 * plot: {
 * type: {Wiggle: false, InterpolatedDensity: true},
 * decimationSpacing: 5
 * }
 * });
 * var rect = pipeline.getModelLimits();
 * var model = new geotoolkit.scene.Group();
 * model.setModelLimits(rect);
 * model.setBounds(rect );
 * model.setLocalTransform(pipeline.getTransformation());
 * var seismicImage = new geotoolkit.seismic.image.SeismicImage(pipeline, pipeline.getModelLimits());
 * model.addChild(seismicImage);
 * ...
 * });
 * });
 * @see {{@link geotoolkit.seismic.data.RemoteReaderDataProvider} to have more information about output and input parameters
 */
geotoolkit.seismic.data.RemoteSeismicDataSource = {};
    /**
     * Returns the data info
     *
     * @returns {Object}
     */
    geotoolkit.seismic.data.RemoteSeismicDataSource.prototype.getDataInfo = function(){};
    /**
     * Returns host name
     *
     * @returns {string}
     */
    geotoolkit.seismic.data.RemoteSeismicDataSource.prototype.getHost = function(){};
    /**
     * Returns file name
     * @returns {string}
     */
    geotoolkit.seismic.data.RemoteSeismicDataSource.prototype.getSeismicFileName = function(){};
    /**
     * This method open connection and load data source information
     *
     * @param {function} callback is called then file is open
     * @param {function} error function with parameter data
     */
    geotoolkit.seismic.data.RemoteSeismicDataSource.prototype.open = function(callback, error){};
    /**
     * Returns a reader that provides a subset of this seismic data.<br>
     * See class documentation for available queries.<br>
     * @param {object} [query=null] query object
     * @param {array<object>} [query.keys=null] optional array of keys to make a query
     * @param {object} [query.emptyTracesKey= null] optional empty trace key
     * @param {boolean} [query.emptyTraces = true] generated empty traces on server
     * @param {string} [query.queryType=null] query type. It can be 'seismicPath' or null. if it is null then query is done by keys overwise by path.
     * @param {object} [query.options = null] additional options to send to server
     * @param {number} [query.traceOrder = 1] define type of the query. A traceOrder of 1 indicates a XSection query. The Time key is
     * ignored for XSection queries. A trace order of 2 indicates a Map query. The Time key is required for Map queries, with identical min and max values (a time slice).
     * @param {function} callback The callback function to be called on success, will be called with the resulting reader as a parameter
     * @param {function} error The callback function to be called on error, will be called with the actual error as a parameter
     * @example A query by INLINE to select all XLINE traces form the range [0,1000] with empty traces
     * datasource.select({'keys': [
     * {
     * 'name': 'INLINE',
     * 'min': 500,
     * 'max': 500,
     * 'step': 1,
     * 'order': 'asc'
     * },
     * {
     * 'name': 'XLINE',
     * 'min': 0,
     * 'max': 1000,
     * 'step': 1,
     * 'order': 'asc'
     * }
     * ],
     * 'emptyTracesKey' {
     * 'name': 'XLINE',
     * 'min': 0,
     * 'max': 1000
     * }
     * }, function (reader) {
     * });
     * @example Query by path
     * * datasource.select({ 'emptyTraces': true,
     'queryType': 'seismicPath',
     'keys': [{
     'name': 'INLINE',
     "values": [100, 200, 200]
     }, {
     'name': 'XLINE',
     'values': [200, 400, 500]
     }]
     }, function(reader) {
    
     });
     */
    geotoolkit.seismic.data.RemoteSeismicDataSource.prototype.select = function(query, callback, error){};
    /**
     * Returns keys
     *
     * @returns {Array.<object>}
     */
    geotoolkit.seismic.data.RemoteSeismicDataSource.prototype.getKeys = function(){};
    /**
     * Returns seismic meta data information
     *
     * @returns {geotoolkit.seismic.data.SeismicMetaData}
     */
    geotoolkit.seismic.data.RemoteSeismicDataSource.prototype.getMetaData = function(){};
    /**
     * Returns statistics
     *
     * @returns {object} statistics
     * @returns {number} statistics.average average
     * @returns {number} statistics.min minimum value
     * @returns {number} statistics.max maximum value
     * @returns {number} statistics.rms rms
     */
    geotoolkit.seismic.data.RemoteSeismicDataSource.prototype.getStatistics = function(){};
    /**
     * @returns {geotoolkit.seismic.data.ByteOrder}
     */
    geotoolkit.seismic.data.RemoteSeismicDataSource.prototype.getByteOrder = function(){};
    /**
     * Notify server that reader resources can be released on server
     */
    geotoolkit.seismic.data.RemoteSeismicDataSource.prototype.release = function(){};

/** @namespace */
geotoolkit.seismic.pipeline = {};

/** @namespace */
geotoolkit.seismic.pipeline.processor = {};

/**
 * @description This class is an implementation of the seismic data processing pipeline that handles seismic traces from the data source to the seismic image generation stage.
 * <p>
 * The first operation performed by the SeismicPipeline is to read the seismic traces.
 * The users can apply one or more filters, perform gain control, scale data, interpolate the trace samples based on the display scale and finally generate the seismic image (Rasterization process) based on the selected plot type. Moreover, the user may want to
 * create custom operations (filters) and apply them as well.
 * The SeismicPipeline provides a flexible structure for users to insert their own trace processing. The SeismicPipeline is organized as a succession
 * of trace processors working on individual trace data (samples). The output data from one trace process
 * serves as the input data for the next process in pipeline.
 * The base class for the trace processors is <a href="geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.html">SeismicTraceProcessor</a>. The default trace processes are data normalization, interpolation
 * and rasterization process, which can be configured using the methods provided in this class.
 * </p>
 * <p>The first stage of a SeismicPipeline always needs to be a Seismic Reader (geotoolkit.seismic.data.SeismicReader).
 * The last 3 stages of the pipelines are Data Normalization, Data Interpolation and Rasterization in that order.
 * Any additional processor (such as filtering, AGC or any custom processor) are inserted between the Seismic Reader and Data Normalization and applied in the order which they are inserted.</p>
 * <p><b>Data Normalization</b>: The data normalization stage is used to normalize the seismic amplitudes before scaling and rasterization.
 * The normalization process applies one constant scalar value across the entire trace. The normalization factor can be the same for
 * all the traces in a dataset or can be calculated on the fly for each trace (trace normalization options).
 * The normalization factor can be calculated based on the dataset min and max values, the average or the RMS value.
 * The user can also provide custom limits to make comparison between datasets easier.
 * </p>
 * <p><b>Data Interpolation</b>:
 * The data interpolation stage adjusts the number of samples in the trace to match the height of the display (based on vertical scale settings). This may require interpolation (adding samples) or decimation (removing samples).
 * See methods setInterpolationType() and setInterpolationEdge() to control how samples are interpolated.
 * </p>
 * <p><b>Rasterization</b>:
 * The rasterization stage generates the seismic image. Usually seismic data is represented as a density plot (based on a colormap), as wiggles (monochrome or colored) or a combination of both.
 * Use method setPlotType() to control the display type and method setColorMap() to specify a colormap if required.
 * These plot types include both density displays, variable area wiggle fill displays and combinations of both.
 * A list of supported plot types is provided below:
 * </p>
 * <ul>
 * <li>Wiggle - Wiggle display</li>
 * <li>NegativeFill - Negative monochrome variable area fill</li>
 * <li>PositiveFill - Positive monochrome variable area fill</li>
 * <li>NegativeColorFill - Negative color variable area fill. Color varies inside the lobe based on the sample amplitude at each sample location.</li>
 * <li>PositiveColorFill - Positive color variable area fil. Color varies inside the lobe based on the sample amplitude at each sample location. </li>
 * <li>SimpleDensity - Density color fill</li>
 * <li>InterpolatedDensity - Interpolated density color fill (between traces).</li>
 * </ul>
 * <p> The general logic of the pipeline can be presented as:
 * When a seismic image needs to render specific portion of seismic data (range of traces,
 * range of samples) it requests pipeline to provide necessary data trace by trace.
 * Pipeline sends request to the <a href="geotoolkit.seismic.data.SeismicReader.html">geotoolkit.seismic.data.SeismicReader</a>
 * that provides seismic data and forwards loaded traces to each seismic traces processor. The data are modified by every
 * process in pipeline and then forwarded to rasterizer that produces an image the users see on the output device like screen.
 * </p>
 * @class geotoolkit.seismic.pipeline.SeismicPipeline
 * @augments geotoolkit.util.EventDispatcher
 * @param {string} name Name of the pipeline
 * @param {geotoolkit.seismic.data.SeismicReader} reader Instance of the reader that provide the seismic data
 * @param {object} statistics object
 * @param {number} statistics.average Average trace value
 * @param {number} statistics.min Minimum trace value
 * @param {number} statistics.max Maximum trace value
 * @param {number} statistics.rms RMS of trace values
 * @param {?object} [options=null] options, see {@link geotoolkit.seismic.pipeline.SeismicPipeline.setOptions}
 * @throws {Error} if reader is null or statistics is null
 */
geotoolkit.seismic.pipeline.SeismicPipeline = {};
    /**
     * SeismicPipeline's Events enumerator. These events are fired while setting options ( see setOptions()) on the seismic pipeline.
     * @readonly
     * @enum
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.Events = {};
        /**
         * Event type fired prior to options being set
         * @type {string}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.Events.BeforeSetOptions = "";
        /**
         * Event type fired when options are being set
         * @type {string}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.Events.SetOptions = "";
        /**
         * Event type fired when trace mapping updated
         * @type {string}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.Events.TraceMappingUpdated = "";
    /**
     * SeismicPipeline's Query type enumerator.
     * These types are used with select option
     * @readonly
     * @enum
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.QueryType = {};
        /**
         * Query type to use from and to in the model coordinate of the pipeline
         * @type {string}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.QueryType.Model = "";
        /**
         * Query type to use from and to in trace coordinet of pipeline
         * @type {string}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.QueryType.Trace = "";
    /**
     * Construct a new seismic pipeline from the specified seismic pipeline.
     * @protected
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} src an instance of the seismic pipeline to make a copy.
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.copyConstructor = function(src){};
    /**
     * Creates a clone of the seismic pipline.
     * All inheritors should implement copy constructor or provide custom implementation for this method.
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} clone
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.clone = function(){};
    /**
     * Returns the seismic reader. The seismic reader is responsible for reading seismic data from various sources and providing it to the seismic pipeline.
     *
     * @returns {geotoolkit.seismic.data.SeismicReader}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getReader = function(){};
    /**
     * Returns the current state of trace data fetching process. This method is useful to check if a pipeline is still receiving traces from the data
     * source
     *
     * @returns {boolean}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.isFetching = function(){};
    /**
     * Adds a callback method to the trace data fetching process. The callback method is triggered when the seismic pipeline is ready to process the query.
     *
     * @param {function} callback Whenever pipeline is ready to process your query, callback funtion is triggered.
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.await = function(callback){};
    /**
     * Returns the number of traces available from the seismic metadata.
     *
     * @returns {number}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getNumberOfTraces = function(){};
    /**
     * Returns the number of samples available from the seismic metadata.
     *
     * @returns {number}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getNumberOfSamples = function(){};
    /**
     * Returns a JSON object that has seismic data statistics, namely 'average', 'min', 'max', 'rms'
     *
     * @returns {object} statistics object
     * @returns {number} statistics.average Average trace value
     * @returns {number} statistics.min Minimum trace value
     * @returns {number} statistics.max Maximum trace value
     * @returns {number} statistics.rms RMS of trace values
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getStatistics = function(){};
    /**
     * Enum of seismic pipeline interpolation types
     * @enum
     * @readonly
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType = {};
        /**
         * Linear
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType.Linear = NaN;
        /**
         * Quadratic
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType.Quadratic = NaN;
        /**
         * Step interpolation
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType.Step = NaN;
        /**
         * Centered Step interpolation
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType.CenteredStep = NaN;
        /**
         * Cubic spline interpolation
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType.Cubic = NaN;
        /**
         * Logarithmic interpolation
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType.Logarithmic = NaN;
    /**
     * Enum of interpolation edge behavior, specify how interpolation will handle edges (beginning and end) of data
     * @enum
     * @readonly
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge = {};
        /**
         * Use a value of 0 when interpolation needs value beyond the edge of the data
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge.Zero = NaN;
        /**
         * Duplicate the nearest value when interpolation needs value beyond the edge of the data
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge.Duplicate = NaN;
    /**
     * Enum of normalization types used when rendering normalization.
     * @enum
     * @readonly
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType = {};
        /**
         * Default behavior. No normalization is applied.
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType.None = NaN;
        /**
         * Uses the maximum amplitude of all samples in the all traces.
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType.Maximum = NaN;
        /**
         * Uses the maximum amplitude of all samples in the trace.
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType.TraceMaximum = NaN;
        /**
         * Uses all traces average absolute value as a normalization amplitude.
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType.Average = NaN;
        /**
         * Uses trace average absolute value as a normalization amplitude.
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType.TraceAverage = NaN;
        /**
         * Uses the mean square of all samples in the all traces.
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType.RMS = NaN;
        /**
         * Uses the mean square of all samples in the trace.
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType.TraceRMS = NaN;
        /**
         * Uses custom normalization limits.
         * @type {number}
         */
        geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType.Limits = NaN;
    /**
     * Returns seismic transformation which determines how many traces and samples per unit is displayed on the screen.
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getTransformation = function(){};
    /**
     * Sets trace mapping. If this mapping is set the trace decimation is off.
     * @param {geotoolkit.seismic.data.TraceMapping} mapping a new trace mapping
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} this
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setTraceMapping = function(mapping){};
    /**
     * returns trace mapping
     * @returns {geotoolkit.seismic.data.TraceMapping}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getTraceMapping = function(){};
    /**
     * Returns trace offset
     * @returns {number} trace offset
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getTraceOffset = function(){};
    /**
     * Set trace offset
     * @param {number} offset trace offset
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} this
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setTraceOffset = function(offset){};
    /**
     * Executes a query with specified condition. This query result will be applied to all the trace processors active in the seismic pipeline.
     * @param {object} condition object Condition to select range of traces based on parameters namely, from and to.
     * @param {number} condition.from Start of the trace or trace location
     * @param {number} condition.to End of the trace or trace location
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline.QueryType} [condition.type=geotoolkit.seismic.pipeline.SeismicPipeline.QueryType.Model] type fo the query
     * @param {function(fetchResult)} fetchCallback Callback function which is executed when data (query result) has arrived for the selection.
     * @param {?function()} validationCallback Callback function which is executed before data requested.
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.select = function(condition, fetchCallback, validationCallback){};
    /**
     * Adds trace processors to the seismic pipeline. The added trace processors should be made active to apply it to the data before rendering to a seismic image.
     *
     * @param {geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor} processor A process to apply for seismic trace
     * samples
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} this
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.addTraceProcessor = function(processor){};
    /**
     * Removes an existing trace processor from the seismic pipeline.
     * @param {geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor} processor The Seismic Data Trace Processor
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} this
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.removeTraceProcessor = function(processor){};
    /**
     * Returns the existing trace processor by index.
     * @param {number} index Index of the trace process in the collection
     * @returns {geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getTraceProcessor = function(index){};
    /**
     * Returns a count of SeismicTraceProcessor[s] applied to the seismic pipeline
     * @returns {number} amount of processes
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getTraceProcessorsCount = function(){};
    /**
     * Reset model limits of the seismic pipeline to null.
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} this
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.resetModelLimits = function(){};
    /**
     * Return data limits of traces and sampels
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getDataLimits = function(){};
    /**
     * Returns the current model limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getModelLimits = function(){};
    /**
     * Returns the rasterization plot type
     * @returns {object} [plottype] JSON object containing plot properties
     * @returns {boolean} [plottype.Wiggle] wiggle
     * @returns {boolean} [plottype.PositiveFill] positive fill
     * @returns {boolean} [plottype.NegativeFill] negative fill
     * @returns {boolean} [plottype.PositiveColorFill] positive color fill
     * @returns {boolean} [plottype.NegativeColorFill] negative color fill
     * @returns {boolean} [plottype.SimpleDensity] simple density
     * @returns {boolean} [plottype.InterpolatedDensity] interpolated density
     * @returns {boolean} [plottype.Reversed] reversed amplitude direction
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getPlotType = function(){};
    /**
     * Sets the rasterization plot type
     * @param {object} plotType JSON object that contains combination of flags that specify how to render seismic
     * @param {boolean} [plotType.Wiggle] wiggle or not
     * @param {boolean} [plotType.PositiveFill] flag to set Positive Fill or not
     * @param {boolean} [plotType.NegativeFill] flag to set Negative Fill or not
     * @param {boolean} [plotType.PositiveColorFill] flag to set Positive ColorFill or not
     * @param {boolean} [plotType.NegativeColorFill] flag to set Negative ColorFill or not
     * @param {boolean} [plotType.LobeColorFill] flag to set LobeColorFill or not
     * @param {boolean} [plotType.SimpleDensity] flag to set Simple Density or not
     * @param {boolean} [plotType.InterpolatedDensity] flag to set Interpolated Density or not
     * @param {boolean} [plotType.Reversed] reversed amplitude direction
     * @param {boolean} [invalidate] flag set to notify the listener if pipeline changes
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setPlotType = function(plotType, invalidate){};
    /**
     * Returns the name of the seimsic pipeline.
     * @returns {string}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getName = function(){};
    /**
     * Sets color map for rendering the seismic image.
     * @param {geotoolkit.seismic.util.ColorMap} colorMap sets the color map
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setColorMap = function(colorMap){};
    /**
     * Returns the color map used to render the seismic image.
     * @returns {geotoolkit.seismic.util.ColorMap}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getColorMap = function(){};
    /**
     * Sets interpolation type.
     * @deprecated since 2.6 use setSamplesInterpolationType instead
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType} interpolationType Enum of seismic pipeline interpolation types
     * @returns {boolean}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setInterpolationType = function(interpolationType){};
    /**
     * Returns interpolation type defined under geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType
     * @deprecated since 2.6 use getSamplesInterpolationType instead
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getInterpolationType = function(){};
    /**
     * Sets the interpolation edge.
     * @deprecated since 2.6 use setSamplesInterpolationEdge instead
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge} interpolationEdge Specifies how interpolation handles edge (begin and end elements) of data
     * @returns {boolean}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setInterpolationEdge = function(interpolationEdge){};
    /**
     * Returns interpolation edge
     * @deprecated since 2.6 use getSamplesInterpolationEdge instead
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getInterpolationEdge = function(){};
    /**
     * Sets interpolation type.
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType} interpolationType Enum of seismic pipeline interpolation types
     * @returns {boolean}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setSamplesInterpolationType = function(interpolationType){};
    /**
     * Returns interpolation type defined under geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getSamplesInterpolationType = function(){};
    /**
     * Sets the interpolation edge.
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge} interpolationEdge Specifies how interpolation handles edge (begin and end elements) of data
     * @returns {boolean}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setSamplesInterpolationEdge = function(interpolationEdge){};
    /**
     * Returns interpolation edge
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getSamplesInterpolationEdge = function(){};
    /**
     * Sets interpolation type.
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType} interpolationType Enum of seismic pipeline interpolation types
     * @returns {boolean}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setTracesInterpolationType = function(interpolationType){};
    /**
     * Returns interpolation type defined under geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationType}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getTracesInterpolationType = function(){};
    /**
     * Sets the interpolation edge.
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge} interpolationEdge Specifies how interpolation handles edge (begin and end elements) of data
     * @returns {boolean}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setTracesInterpolationEdge = function(interpolationEdge){};
    /**
     * Returns interpolation edge
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline.InterpolationEdge}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getTracesInterpolationEdge = function(){};
    /**
     * Sets data normalization parameters on the seismic pipeline.
     * @param {object} normalization normalization options
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType} normalization.type enum of normalization types
     * @param {geotoolkit.util.Range} normalization.limits normalization limits (min,max)
     * @param {number} normalization.scale scale factor
     * @example
     * {
     * type : geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType,
     * limits : {geotoolkit.util.Range} | {min, max},
     * scale : number
     * }
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} this
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setNormalization = function(normalization){};
    /**
     * Return normalization
     * @returns {object} Normalization
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType} [Normalization.type] enum of normalization types
     * @returns {geotoolkit.util.Range} [Normalization.limits] normalization limits (min,max)
     * @returns {number} [Normalization.scale] scale factor
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getNormalization = function(){};
    /**
     * Gets normalization scale
     * @returns {number}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getScaleFactor = function(){};
    /**
     * Returns current pipeline state
     * @returns {object} [options] pipeline options
     * @returns {number} [options.maximumTracesPerPixel] maximum traces per pixel
     * @returns {geotoolkit.seismic.data.TraceMapping} [options.tracemapping] trace mapping
     * @returns {number} [options.traceoffset] trace offset
     * @returns {object} [options.interpolation] interpolation options
     * @returns {string} [options.interpolation.type] deprecated (since 2.6 use options.interpolation.samples.type) enum of interpolation types
     * @returns {string} [options.interpolation.edge] deprecated (since 2.6 use options.interpolation.samples.edge) enum of interpolation edge behavior
     * @returns {string} [options.interpolation.traces] options for interpolation between traces
     * @returns {string} [options.interpolation.traces.type] enum of interpolation types
     * @returns {string} [options.interpolation.traces.edge] enum of interpolation edge behavior
     * @returns {string} [options.interpolation.samples] options for interpolation between samples inside trace
     * @returns {string} [options.interpolation.samples.type] enum of interpolation types
     * @returns {string} [options.interpolation.samples.edge] enum of interpolation edge behavior
     * @returns {object} [options.normalization] normalization options
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType} [options.normalization.type] normalization type
     * @returns {geotoolkit.util.Range} [options.normalization.limits] normalization limits
     * @returns {number} [options.normalization.scale] normalization params
     * @returns {object} [options.plot]
     * @returns {string} [options.plot.type] plot type Please refer to different options for plot type from method SeismicPipeline.setPlotType()
     * @returns {number} [options.plot.clippingFactor] clipping factor for traces
     * @returns {number} [options.plot.decimationSpacing] decimation for traces
     * @returns {boolean|true} [options.plot.densityDecimation] decimation for traces in density mode
     * @returns {object} [options.colors] colors
     * @returns {string|geotoolkit.seismic.util.SeismicColors} [options.colors.colorMap] color map
     * @returns {number} [options.colors.alpha] alpha chanel ratio
     * @returns {object} [options.dataProcessors] state of the data processors
     * @returns {object} [options.fetch] fetch options
     * @returns {boolean} [options.fetch.synchronous] synchronous state
     * @returns {number} [options.fetch.maxfetch] maximum amount of active queries
     * @returns {number} [options.fetch.awaittime] time out
     * @returns {number} [options.fetch.fetchsize] maximum amount of traces per request
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getOptions = function(){};
    /**
     * Set pipeline options
     * @param {object} [options] pipeline options
     * @param {number} [options.maximumTracesPerPixel=1] maximum traces per pixel
     * @param {geotoolkit.seismic.data.TraceMapping} [options.tracemapping=null] optional trace mapping
     * @param {number} [options.traceoffset=1] optional trace offset
     * @param {string} [options.version] version
     * @param {object} [options.interpolation] interpolation options
     * @param {string} [options.interpolation.type] deprecated (since 2.6 use options.interpolation.samples.type) enum of interpolation types
     * @param {string} [options.interpolation.edge] deprecated (since 2.6 use options.interpolation.samples.edge) enum of interpolation edge behavior
     * @param {string} [options.interpolation.traces] options for interpolation between traces
     * @param {string} [options.interpolation.traces.type] enum of interpolation types
     * @param {string} [options.interpolation.traces.edge] enum of interpolation edge behavior
     * @param {string} [options.interpolation.samples] options for interpolation between samples inside trace
     * @param {string} [options.interpolation.samples.type] enum of interpolation types
     * @param {string} [options.interpolation.samples.edge] enum of interpolation edge behavior
     * @param {object} [options.normalization] normalization options
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline.NormalizationType} [options.normalization.type] normalization type
     * @param {geotoolkit.util.Range} [options.normalization.limits] normalization limits
     * @param {number} [options.normalization.scale] normalization params
     * @param {object} [options.plot] plot options
     * @param {string} [options.plot.type] plot type. Please refer to different options for plot type from method SeismicPipeline.setPlotType()
     * @param {number} [options.plot.clippingFactor] clipping factor for traces
     * @param {number} [options.plot.decimationSpacing] decimation for traces
     * @param {boolean|null} [options.plot.densityDecimation=undefined] decimation for traces in density mode, default value is undefined it means that it true only if wiggles are display
     * @param {object} [options.colors] colors
     * @param {string|geotoolkit.seismic.util.SeismicColors} [options.colors.colorMap] color map
     * @param {number} [options.colors.alpha] alpha chanel ratio
     * @param {?object} [options.fetch=null] fetch options
     * @param {boolean} [options.fetch.synchronous=true] synchronous state
     * @param {number} [options.fetch.maxfetch] maximum amount of active queries
     * @param {number} [options.fetch.awaittime] time out
     * @param {number} [options.fetch.fetchsize] maximum amount of traces per request
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.setOptions = function(options){};
    /**
     * Render seismic model in to the canvas
     * @param {geotoolkit.util.Rect} seismicModelBounds seismic source model bounds
     * @param {HTMLCanvasElement} canvas target image
     * @param {geotoolkit.util.Rect} [targetBounds=null] target bounds
     * @param {number} [offsetX=0] x position on the canvas
     * @param {number} [offsetY=0] y position on the canvas
     * @param {?function(fetchResult)} [fetchCallback=null] Callback function which is executed when data (query result) has arrived for the selection.
     * @param {?function()} [validationCallback=null] Callback function which is executed before data requested.
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.exportToImage = function(seismicModelBounds, canvas, targetBounds, offsetX, offsetY, fetchCallback, validationCallback){};
    /**
     * Returns model to sample transformation
     * @returns {geotoolkit.util.Transformation} transformation
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.getModelToSamplesTransformation = function(){};
    /**
     * Invalidate node
     * @param {*} [params] additional invalidate parameters
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.invalidate = function(params){};
    /**
     * Add invalidate handler
     *
     * @param {function} handler Handler to be notified when the seismic pipeline is invalidated
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.addInvalidateHandler = function(handler){};
    /**
     * Remove the handler so that it does not receive any notification about the seismic pipeline invalidation.
     *
     * @param {function} handler Handler to be removed from receiving notification about invalidation
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.removeInvalidateHandler = function(handler){};
    /**
     * Disposes this pipeline. Once disposed, the pipeline should not be used anymore.<br>
     * Please clear all listeners and invalidate handlers to avoid memory leaks.<br>
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.dispose = function(){};
    /**
     * This method invalidates the pipleine and any existing trace processors.
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.refresh = function(){};
    /**
     * This method clears the pipeline and processors memory allocations
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline}
     */
    geotoolkit.seismic.pipeline.SeismicPipeline.prototype.clear = function(){};

/**
 * Defines a singleton registry for the available trace processor types
 * @class geotoolkit.seismic.pipeline.processor.ProcessorRegistry
 */
geotoolkit.seismic.pipeline.processor.ProcessorRegistry = {};
    /**
     * Registers a processor name with a processor class.
     * @param {string} processorName The name of the trace processor.
     * @param {Object} processorClass The class of the trace processor.
     */
    geotoolkit.seismic.pipeline.processor.ProcessorRegistry.register = function(processorName, processorClass){};
    /**
     * Unregisters a processor by name from the processor registry.
     * @param {string} processorName The name of the trace processor.
     */
    geotoolkit.seismic.pipeline.processor.ProcessorRegistry.unregister = function(processorName){};
    /**
     * Gets a default instance of the trace processor by its registered name
     * @param {string} processorName The name of the trace processor.
     * @returns {?Object} processor Instance of processor or Null if name is not registered.
     */
    geotoolkit.seismic.pipeline.processor.ProcessorRegistry.getProcessor = function(processorName){};
    /**
     * Gets all of the registered processor names.
     * @returns {Array.<string>} processorNames The names of all the trace processors.
     */
    geotoolkit.seismic.pipeline.processor.ProcessorRegistry.getAllProcessors = function(){};

/**
 * A Seismic Trace Processor is the implementation of a trace processing algorithm for seismic data. It is an extension point that allows the addition of custom trace processors.<br>
 * A trace process usually represents an operation that can be performed on trace data (samples). It processes data trace by trace.
 *
 * @class geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor
 * @param {object} state the default properties
 * @param {string} state.name name of the processor
 * @param {boolean} state.apply whether the processor is active or not.
 */
geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor = {};
    /**
     * Returns stateValue if true or false, value instead
     *
     * @param {boolean} value value
     * @param {boolean} defaultValue default value
     * @returns {boolean}
     */
    geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.prototype.verifyBoolean = function(value, defaultValue){};
    /**
     * Returns stateValue if string, value instead
     *
     * @param {string} value value
     * @param {string} defaultValue default value
     * @returns {string}
     */
    geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.prototype.verifyString = function(value, defaultValue){};
    /**
     * Returns stateValue not null, value instead
     *
     * @param {object} stateValue value
     * @param {object} value default value
     * @returns {object}
     */
    geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.prototype.verify = function(stateValue, value){};
    /**
     * Sets state 'name' and 'apply' values to respectively name and false.
     * Returns state object
     *
     * @param {object} state the default properties
     * @param {string} name name of the processor
     * @returns {object}
     */
    geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.verifyState = function(state, name){};
    /**
     * Sets apply
     *
     * @param {boolean} apply whether the processor is active or not
     */
    geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.prototype.apply = function(apply){};
    /**
     * Returns name of the processor
     *
     * @returns {string}
     */
    geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.prototype.getName = function(){};
    /**
     * Set apply and name values
     *
     * @param {object} state the default properties
     * @param {string} state.name name of the processor
     * @param {boolean} state.apply whether the processor is active or not.
     * @returns {geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor} this
     */
    geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.prototype.setState = function(state){};
    /**
     * Returns apply and name values
     *
     * @returns {object} state the state properties
     * @returns {string} state.name name of the processor
     * @returns {boolean} state.apply whether the processor is active or not
     */
    geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.prototype.getState = function(){};
    /**
     * Returns true if processor is active
     *
     * @returns {boolean}
     */
    geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.prototype.isApplicable = function(){};
    /**
     * The function returns 'True' if the process was applied to the traces or 'False' if it was not applied.
     *
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline the seismic pipeline name
     * @param {geotoolkit.seismic.data.SeismicMetaData} metadata seismic metadata
     * @param {Float32Array} dataIn The input data array on which the process should be applied
     * @param {Float32Array} dataOut The output/processed data array
     * @returns {boolean} returns whether the processing was successful
     */
    geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.prototype.process = function(pipeline, metadata, dataIn, dataOut){};
    /**
     * Invalidate node
     */
    geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor.prototype.invalidate = function(){};

/**
 * Defines a processor to reverse trace values
 *
 * @class geotoolkit.seismic.pipeline.processor.Reverse
 * @augments geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor
 * @param {object} state
 * @param {string} state.name the name of the processor
 * @param {boolean} state.apply to apply the process or not.
 * @param {boolean} state.reversed reversed trace values or not
 * @param {boolean} state.inverted invert polarity or not. Specifies if the polarity is +ve or -ve
 */
geotoolkit.seismic.pipeline.processor.Reverse = {};
    /**
     * @override
     * @returns {boolean}
     */
    geotoolkit.seismic.pipeline.processor.Reverse.prototype.isApplicable = function(){};
    /**
     * Sets base line reversed to value
     *
     * @param {boolean} reverse specifies if the baseline of the trace is reversed or not
     */
    geotoolkit.seismic.pipeline.processor.Reverse.prototype.reverseBaseLine = function(reverse){};
    /**
     * Sets polarity inverted to value
     *
     * @param {boolean} inverse specifies if the polarity is +ve or -ve
     */
    geotoolkit.seismic.pipeline.processor.Reverse.prototype.inversePolarity = function(inverse){};
    /**
     * Sets state
     *
     * @override
     * @param {Object} state sets the state
     * @param {boolean} state.reversed specifies if the baseline of the trace is reversed or not
     * @param {boolean} state.inverted specifies if the polarity is +ve or -ve
     */
    geotoolkit.seismic.pipeline.processor.Reverse.prototype.setState = function(state){};
    /**
     * return state of the processor
     * @returns {object} state
     * @returns {boolean} state.reversed specifies if the baseline of the trace is reversed or not
     * @returns {boolean} state.inverted specifies if the polarity is +ve or -ve
     */
    geotoolkit.seismic.pipeline.processor.Reverse.prototype.getState = function(){};
    /**
     * @override
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline
     * @param {object} metadata
     * @param {Float32Array} dataIn
     * @param {Float32Array} dataOut
     * @returns {boolean}
     */
    geotoolkit.seismic.pipeline.processor.Reverse.prototype.process = function(pipeline, metadata, dataIn, dataOut){};

/**
 * @description Defines implementation of the automatic gain control.
 *
 * <p>
 * Automatic gain control (AGC) increases the amplitude of the trace samples, automatically.
 * AGC applies a fixed length window, which slides in the original trace and computes the average amplitude of the window samples.
 * The gain is calculated and used to normalise the sample in the center part of this window to a fixed value, usually 1.0.
 * Basically the sample amplitude is divided by the average value. The window then slides down one sample and the next gain
 * correction is computed. The process continues until the whole trace has been processed.
 * </p>
 * <p>
 * AGC is commonly used to improve visibility of late-arriving events.
 * </p>
 * @class geotoolkit.seismic.pipeline.processor.AGC
 * @augments geotoolkit.seismic.pipeline.processor.SeismicTraceProcessor
 * @param {object} state of the data filter
 * @param {boolean} state.apply process activated or not.
 * @param {number} state.desiredAverage desired average amplitude
 * @param {geotoolkit.seismic.pipeline.processor.AGC.Units} state.units enum of AGC units
 * @param {number} state.windowLength the AGC window size
 * @param {number} state.agcLength AGC length
 * @param {number} state.startSample start smaple to start the AGC process
 * @param {number} state.step step
 */
geotoolkit.seismic.pipeline.processor.AGC = {};
    /**
     * Enum of AGC units
     * @enum
     * @readonly
     */
    geotoolkit.seismic.pipeline.processor.AGC.Units = {};
        /**
         * units in sample range
         * @type {number}
         */
        geotoolkit.seismic.pipeline.processor.AGC.Units.Sample = NaN;
        /**
         * units in time range
         * @type {number}
         */
        geotoolkit.seismic.pipeline.processor.AGC.Units.Time = NaN;
    /**
     * returns state of the AGC data filter
     */
    geotoolkit.seismic.pipeline.processor.AGC.prototype.getState = function(){};
    /**
     * Sets state of the AGC filter
     * @param {object} state state of the data filter
     * @returns {geotoolkit.seismic.pipeline.processor.AGC} this
     */
    geotoolkit.seismic.pipeline.processor.AGC.prototype.setState = function(state){};
    /**
     * @override
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline the seismic pipeline
     * @param {geotoolkit.seismic.data.SeismicMetaData} metadata info of seismic data like sample rate ..
     * @param {Float32Array} dataIn sample data in
     * @param {Float32Array} dataOut sample data out
     */
    geotoolkit.seismic.pipeline.processor.AGC.prototype.process = function(pipeline, metadata, dataIn, dataOut){};

/**
 * This class provides utility function to retrieve a seismic sample from a pipeline at a given coordinate.
 * It will snap to the closest sample center.
 *
 * @class geotoolkit.seismic.data.snap.SnapPicker
 */
geotoolkit.seismic.data.snap.SnapPicker = {};
    /**
     * Pick sample at specified coordinate
     * @param {number} x x coordinate for picking sample (in seismic model space)
     * @param {number} y y coordinate for picking sample (in seismic model space)
     * @param {geotoolkit.seismic.data.snap.SnapPickingStrategy} strategy used for picking
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline seismic pipeline
     * @param {Object} target instance of callback owner
     * @param {function} callback This function called when data is ready. It accepts trace number, trace header, sample index, sample value
     */
    geotoolkit.seismic.data.snap.SnapPicker.pickSample = function(x, y, strategy, pipeline, target, callback){};
    /**
     * Pick sample at specified trace and sample index
     * @param {number} traceIndex trace
     * @param {number} sampleIndex index of the sample
     * @param {geotoolkit.seismic.data.snap.SnapPickingStrategy} strategy strategy used for picking
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline seismic pipeline
     * @param {Object} target instance of callback owner
     * @param {function} callback This function is called when data is ready. It accepts trace number, trace header, sample index, sample value
     */
    geotoolkit.seismic.data.snap.SnapPicker.pickTraceSampleIndex = function(traceIndex, sampleIndex, strategy, pipeline, target, callback){};

/**
 * Defines abstract picking strategy
 *
 * @class geotoolkit.seismic.data.snap.SnapPickingStrategy
 * @param {string} name strategy name
 */
geotoolkit.seismic.data.snap.SnapPickingStrategy = {};
    /**
     * Returns name of the strategy
     *
     * @returns {string}
     */
    geotoolkit.seismic.data.snap.SnapPickingStrategy.prototype.getName = function(){};
    /**
     * Sets strategy name
     *
     * @param {string} name strategy name
     * @returns {geotoolkit.seismic.data.snap.SnapPickingStrategy} this
     */
    geotoolkit.seismic.data.snap.SnapPickingStrategy.prototype.setName = function(name){};
    /**
     * @type {Function}
     * @param {geotoolkit.seismic.data.Trace} trace seismic trace
     * @param {number} index of the sample
     * @returns {number} Number.NaN
     */
    geotoolkit.seismic.data.snap.SnapPickingStrategy.prototype.pickSample = function(trace, index){};

/**
 * Define an interface to provide rendering seismic image
 * @interface
 */
geotoolkit.seismic.image.IDrawSeismicImage = {};
    /**
     * Draw seismic image
     * @param image seismic image
     * @param context rendering context
     * @abstract
     * @function
     */
    geotoolkit.seismic.image.IDrawSeismicImage.prototype.drawSeismicImage = function(image, context){};

/**
 * Defines seismic shape implementation as a rectangular shape to render data from seismic pipeline.<br>
 * This shape can render seismic as a simple rectangular shape by using the {@link geotoolkit.seismic.pipeline.SeismicPipeline}.
 * It can be added to any plot/group as a shape. <br>
 * It will delegate rasterization to the pipeline itself so any configuration relative to the seismic rendering (Like Colormap,Interpolation, etc) should be done directly on the pipeline.<br>
 * Seismic Map Image tutorial demonstrates the use of seismic image in the toolkit.
 *
 * @class geotoolkit.seismic.image.SeismicImage
 * @augments geotoolkit.scene.shapes.RectangularShape
 * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline represents seismic data
 * @param {number|geotoolkit.util.Rect} x1 model coordinate in the parent object or rectangle of model coordinates.
 * @param {number} [y1] model coordinate in the parent object.
 * @param {number} [x2] model coordinate in the parent object.
 * @param {number} [y2] model coordinate in the parent object.
 * @param {geotoolkit.scene.Cache.CacheMode} [mode] Shared cache mode by default
 */
geotoolkit.seismic.image.SeismicImage = {};
    /**
     * Copy constructor
     * @protected
     * @param {geotoolkit.seismic.image.SeismicImage} src seismic image src
     * @returns {geotoolkit.seismic.image.SeismicImage}
     */
    geotoolkit.seismic.image.SeismicImage.prototype.copyConstructor = function(src){};
    /**
     * Sets pipeline
     *
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline the Seismic Pipeline
     * @returns {geotoolkit.seismic.image.SeismicImage}
     */
    geotoolkit.seismic.image.SeismicImage.prototype.setPipeline = function(pipeline){};
    /**
     * Returns pipeline
     *
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline}
     */
    geotoolkit.seismic.image.SeismicImage.prototype.getPipeline = function(){};
    /**
     * Check if shape is visible and if it's within context
     *
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context the Rendering Context
     * @returns {boolean}
     */
    geotoolkit.seismic.image.SeismicImage.prototype.checkCollision = function(context){};
    /**
     * Sets model limits
     *
     * @param {geotoolkit.util.Rect} limits limits of the pipeline
     * @returns {geotoolkit.seismic.image.SeismicImage}
     */
    geotoolkit.seismic.image.SeismicImage.prototype.setModelLimits = function(limits){};
    /**
     * Returns model limits
     *
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.seismic.image.SeismicImage.prototype.getModelLimits = function(){};
    /**
     * Returns model visible limits
     *
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.seismic.image.SeismicImage.prototype.getVisibleModelLimits = function(){};
    /**
     * Returns transformation
     *
     * @returns {?geotoolkit.util.Transformation}
     */
    geotoolkit.seismic.image.SeismicImage.prototype.getContentsTransform = function(){};
    /**
     * Returns scale options.
     *
     * @returns {object} scaleOptions object
     * @returns {geotoolkit.util.AbstractUnit} scaleOptions.deviceunit physical device unit
     * @returns {?geotoolkit.util.AbstractUnit} scaleOptions.sampleunit sample unit
     * @returns {number} scaleOptions.tracescale in traces per device unit (e.g traces per inch)
     * @returns {number} scaleOptions.samplescale in z unit per device unit if depth data (e.g feet per inch), or in device unit per z unit (e.g inches per second)
     */
    geotoolkit.seismic.image.SeismicImage.prototype.getScaleOptions = function(){};
    /**
     * Sets scale options.
     *
     * @param {object} scaleOptions scale options
     * @param {geotoolkit.util.AbstractUnit|string} [scaleOptions.deviceunit] physical device unit
     * @param {geotoolkit.util.AbstractUnit|string} [scaleOptions.sampleunit] sample unit, sample unit from pipeline will be used if not specified
     * @param {number} [scaleOptions.tracescale] in traces per device unit (e.g traces per inch)
     * @param {number} [scaleOptions.samplescale] in z unit per device unit if depth data (e.g feet per inch), or in device unit per z unit (e.g inches per second)
     * @returns {geotoolkit.seismic.image.SeismicImage}
     */
    geotoolkit.seismic.image.SeismicImage.prototype.setScaleOptions = function(scaleOptions){};
    /**
     * Render
     *
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context the Rendering Context
     * @returns {geotoolkit.seismic.image.SeismicImage} this
     */
    geotoolkit.seismic.image.SeismicImage.prototype.render = function(context){};
    /**
     * @inheritdoc
     */
    geotoolkit.seismic.image.SeismicImage.prototype.renderAsync = function(){};
    /**
     * Disposes this node, once disposes a node should not be used anymore.<br>
     * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
     * Also aggressively 'cleanup' this node by setting some of its members to null.
     */
    geotoolkit.seismic.image.SeismicImage.prototype.dispose = function(){};

/** @namespace */
geotoolkit.seismic.axis = {};

/**
 * Defines a simple tick generator for seismic axis. This tick generator is specialized to display ticks for seismic shapes.
 * @class geotoolkit.seismic.axis.IndexTickGenerator
 * @augments geotoolkit.axis.TickGenerator
 */
geotoolkit.seismic.axis.IndexTickGenerator = {};
    /**
     * An enumeration defining display value type
     * @enum
     * @readonly
     */
    geotoolkit.seismic.axis.IndexTickGenerator.DisplayValueType = {};
        /**
         * Original
         * @type {number}
         */
        geotoolkit.seismic.axis.IndexTickGenerator.DisplayValueType.Original = NaN;
        /**
         * Mapped
         * @type {number}
         */
        geotoolkit.seismic.axis.IndexTickGenerator.DisplayValueType.Mapped = NaN;
    /**
     * Reset tick generator
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis } parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {Array.<string>} a supported tick grade list
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.reset = function(parent, orient, tickInfo){};
    /**
     * Reset ticks. This method is called to start iteration by ticks.
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis } parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo
     * a info about labels. This information is used to pass and receive information
     * about the current tick or label
     * @returns {number} ticks count for the current tick type
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.resetTicks = function(parent, orient, tickInfo){};
    /**
     * Reset labels. This method is called to start iteration by labels.
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis } parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient
     * orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo
     * a info about labels. This information is used to pass and receive information
     * about the current tick or label
     * @returns {number} labels count for the current tick type
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.resetLabels = function(parent, orient, tickInfo){};
    /**
     * Generate information about next tick
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis } parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo
     * a info about tick
     * @param {number} tickIndex
     * tick index from 0 to count-1, which resetTicks returns
     * @returns {number} a model position of the tick
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.nextTick = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Generate information about next label
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis } parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo
     * a info about tick
     * @param {number} tickIndex
     * tickIndex tick index from 0 to count-1, which resetLabels returns
     * @returns {number} a model position of the label
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.nextLabel = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Generate information about label format
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis } parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orientation orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo a info about tick
     * @param {number} tickIndex tickIndex tick index from 0 to count-1, which resetLabels returns
     * @param {number} modelValue model value
     * @returns {?string} formatted label text
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.formatLabel = function(parent, orientation, tickInfo, tickIndex, modelValue){};
    /**
     * Sets format label handler
     * @param {function|geotoolkit.util.Format} handler Function called to generate the label of a value, or geotoolkit.util.Format instance
     * @returns {geotoolkit.seismic.axis.IndexTickGenerator} this
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.setFormatLabelHandler = function(handler){};
    /**
     * Returns min device step
     * @returns {number}
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.getMinimumSpan = function(){};
    /**
     * Set min device step
     * @param {number} minimumSpan min span between ticks
     * @returns {geotoolkit.seismic.axis.IndexTickGenerator} this
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.setMinimumSpan = function(minimumSpan){};
    /**
     * returns active pipeline
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.getPipeline = function(){};
    /**
     * set pipeline
     * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline Seismic Pipeline
     * @returns {geotoolkit.seismic.axis.IndexTickGenerator} this
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.setPipeline = function(pipeline){};
    /**
     * returns type of display value
     * @returns {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.getDisplayValueType = function(){};
    /**
     * set type of display value, support Original(trace number) and Mapped(trace position)
     * @param {geotoolkit.seismic.axis.IndexTickGenerator.DisplayValueType} displayValueType type of display value
     * @returns {geotoolkit.seismic.axis.IndexTickGenerator} this
     */
    geotoolkit.seismic.axis.IndexTickGenerator.prototype.setDisplayValueType = function(displayValueType){};

/**
 * Defines a tick generator for seismic traces header values. This tick generator can display ticks for the seismic traces headers.<br>
 * It will retrieve the header values from the given {@link geotoolkit.seismic.pipeline.SeismicPipeline} for the given {@link geotoolkit.seismic.data.FieldDesc} and display ticks for those trace headers.
 *
 * @class geotoolkit.seismic.axis.TraceHeaderTickGenerator
 * @augments geotoolkit.seismic.axis.IndexTickGenerator
 * @param {geotoolkit.seismic.pipeline.SeismicPipeline} pipeline seismic pipeline
 * @param {geotoolkit.seismic.data.FieldDesc|string|number} headerField header field or name of the header field, or id
 */
geotoolkit.seismic.axis.TraceHeaderTickGenerator = {};
    /**
     * Reset tick generator
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis } parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orientation orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {Array.<string>} a supported tick grade list
     */
    geotoolkit.seismic.axis.TraceHeaderTickGenerator.prototype.reset = function(parent, orientation, tickInfo){};
    /**
     * @inheritdoc
     */
    geotoolkit.seismic.axis.TraceHeaderTickGenerator.prototype.resetAsync = function(){};
    /**
     * Generate information about label format
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis } parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orientation orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo a info about tick
     * @param {number} tickIndex tickIndex tick index from 0 to count-1, which resetLabels returns
     * @param {number} modelValue model value
     * @returns {?string} formatted label text
     */
    geotoolkit.seismic.axis.TraceHeaderTickGenerator.prototype.formatLabel = function(parent, orientation, tickInfo, tickIndex, modelValue){};

/**
 * The base class for data transformations.
 *
 * @class geotoolkit.seismic.data.compression.DataTransformation
 */
geotoolkit.seismic.data.compression.DataTransformation = {};
    /**
     * Configures this data transform.
     * @function
     * @abstract
     * @param {object}config The data transform configuration.
     * @param {geotoolkit.util.Dimension}size The size of the data transform.
     * @param {ArrayBuffer}data The data on which this transform is applied.
     */
    geotoolkit.seismic.data.compression.DataTransformation.prototype.applyConfiguration = function(config, size, data){};
    /**
     * Loads binary data into this transform.
     * @function
     * @abstract
     * @param {object}config The data transform configuration
     * @param {ArrayBuffer}data The data that has to be loaded.
     */
    geotoolkit.seismic.data.compression.DataTransformation.prototype.loadBinaryData = function(config, data){};
    /**
     * Gets the name of this data transform.
     * @function
     * @abstract
     * @returns {string} The name of this transform.
     */
    geotoolkit.seismic.data.compression.DataTransformation.prototype.getName = function(){};
    /**
     * Gets the name of this data transform's inverse.
     * @function
     * @returns {string} The name of the transforms's inverse.
     */
    geotoolkit.seismic.data.compression.DataTransformation.prototype.getInverseName = function(){};
    /**
     * Gets the version of this transform
     * @function
     * @abstract
     * @returns {string} The version of the transform.
     */
    geotoolkit.seismic.data.compression.DataTransformation.prototype.getVersion = function(){};
    /**
     * Performs the transform on the data.
     * @function
     * @param {ArrayBuffer|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} data The data that will be transformed.
     * @returns {ArrayBuffer|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} The transformed data.
     */
    geotoolkit.seismic.data.compression.DataTransformation.prototype.transform = function(data){};
    /**
     * Gets the size of the transform.
     * @returns {geotoolkit.util.Dimension} The size of the transform.
     */
    geotoolkit.seismic.data.compression.DataTransformation.prototype.getSize = function(){};
    /**
     * Sets the size of the transform.
     * @param {geotoolkit.util.Dimension}size The size of the transform.
     * @returns {geotoolkit.seismic.data.compression.DataTransformation} this
     */
    geotoolkit.seismic.data.compression.DataTransformation.prototype.setSize = function(size){};

/**
 * Defines a singleton registry for the available data transforms.
 * @class geotoolkit.seismic.data.compression.DataTransformRegistry
 */
geotoolkit.seismic.data.compression.DataTransformRegistry = {};
    /**
     * Gets an instance of the data transform registry
     * @returns {geotoolkit.seismic.data.compression.DataTransformRegistry} The data transform registry.
     */
    geotoolkit.seismic.data.compression.DataTransformRegistry.getInstance = function(){};
    /**
     * Registers a data transform and associates it with a name.
     * @param {string} dataTransformName The name of the data transform.
     * @param {geotoolkit.seismic.data.compression.DataTransformation} dataTransformClass The class that performs data transformation.
     */
    geotoolkit.seismic.data.compression.DataTransformRegistry.prototype.register = function(dataTransformName, dataTransformClass){};
    /**
     * Unregisters a data transform that is associated with a given name.
     * @param {string} dataTransformName The name of the compression algorithm.
     */
    geotoolkit.seismic.data.compression.DataTransformRegistry.prototype.unregister = function(dataTransformName){};
    /**
     * Gets a new instance of a data transform that is registered with a given name.
     * @param {string} dataTransformName The name of the data transform.
     * @returns {geotoolkit.seismic.data.compression.DataTransformation|Object|null} A new instance of the class that performs data transformation.
     */
    geotoolkit.seismic.data.compression.DataTransformRegistry.prototype.getDataTransform = function(dataTransformName){};
    /**
     * Gets the names of all the registered data transforms.
     * @returns {Array.<string>} The names of all the trace processors.
     */
    geotoolkit.seismic.data.compression.DataTransformRegistry.prototype.getAvailableDataTransforms = function(){};

/**
 * The base class for data transformations.
 *
 * @class geotoolkit.seismic.data.compression.Decompress
 */
geotoolkit.seismic.data.compression.Decompress = {};
    /**
     * Performs seismic data decompression.
     * @param {object}config A json object containing the decompression configuration.
     * @param {number} [config.height] The number of data rows.
     * @param {number} [config.width] The number of data columns.
     * @param {Array.<object>} [config.transf] The list of transformation configurations.
     * @param {ArrayBuffer}data The seismic data that will be decompressed.
     * @returns {ArrayBuffer} The decompressedData.
     */
    geotoolkit.seismic.data.compression.Decompress.decompress = function(config, data){};

