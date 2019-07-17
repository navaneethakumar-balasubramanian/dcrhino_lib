/**
 * API to view interpret and edit wellog data
 * @namespace */
geotoolkit.welllog = {};
    /**
     * Enum of border strategy
     * @enum
     * @readonly
     */
    geotoolkit.welllog.BorderStrategy = {};
        /**
         * BorderOnTop
         * @type {string}
         */
        geotoolkit.welllog.BorderStrategy.BorderOnTop = "";
        /**
         * BorderAtBottom
         * @type {string}
         */
        geotoolkit.welllog.BorderStrategy.BorderAtBottom = "";
    /**
     * enum for TrackType
     * @enum
     * @readonly
     */
    geotoolkit.welllog.TrackType = {};
        /**
         * Index track
         * @type {number}
         */
        geotoolkit.welllog.TrackType.IndexTrack = NaN;
        /**
         * Linear Track
         * @type {number}
         */
        geotoolkit.welllog.TrackType.LinearTrack = NaN;
        /**
         * Logarithmic Track
         * @type {number}
         */
        geotoolkit.welllog.TrackType.LogTrack = NaN;
        /**
         * Annotation Track
         * @type {number}
         */
        geotoolkit.welllog.TrackType.AnnotationTrack = NaN;
    /**
     * Enum for Track Direction
     * @enum
     * @readonly
     */
    geotoolkit.welllog.TrackDirection = {};
        /**
         * First
         * @type {number}
         */
        geotoolkit.welllog.TrackDirection.First = NaN;
        /**
         * Before
         * @type {number}
         */
        geotoolkit.welllog.TrackDirection.Before = NaN;
        /**
         * After
         * @type {number}
         */
        geotoolkit.welllog.TrackDirection.After = NaN;
        /**
         * Last
         * @type {number}
         */
        geotoolkit.welllog.TrackDirection.Last = NaN;

/**
 * API for log data representation
 * @namespace */
geotoolkit.welllog.data = {};
    /**
     * Enum of log data state
     * @enum
     * @readonly
     */
    geotoolkit.welllog.data.LogDataState = {};
        /**
         * Empty
         * @type {number}
         */
        geotoolkit.welllog.data.LogDataState.Empty = NaN;
        /**
         * Normal
         * @type {number}
         */
        geotoolkit.welllog.data.LogDataState.Normal = NaN;
        /**
         * Warning
         * @type {number}
         */
        geotoolkit.welllog.data.LogDataState.Warning = NaN;
        /**
         * Error
         * @type {number}
         */
        geotoolkit.welllog.data.LogDataState.Error = NaN;
        /**
         * Fetching
         * @type {number}
         */
        geotoolkit.welllog.data.LogDataState.Fetching = NaN;
    /**
     * Log Data Events
     * @enum
     * @readonly
     */
    geotoolkit.welllog.data.Events = {};
        /**
         * Updated
         * @type {string}
         */
        geotoolkit.welllog.data.Events.Updated = "";
        /**
         * Unit changed
         * @type {string}
         */
        geotoolkit.welllog.data.Events.UnitChanged = "";

/**
 * API for log header representations
 * @namespace */
geotoolkit.welllog.header = {};

/**
 * API for building axis for welllog representation
 * @namespace */
geotoolkit.welllog.axis = {};

/**
 * API defines attributes like log gradient styles etc
 * @namespace */
geotoolkit.welllog.attributes = {};

/**
 * API for layout representations
 * @namespace */
geotoolkit.welllog.layout = {};

/**
 * The LogDataConversion interface class defines the base conversion operations
 * that must be implemented by all well log conversion objects. Conversion
 * objects are used to modify the values in a particular well log data (LogData)
 * before being sent to the rendering system. Conversion objects simply modify
 * the flow of data values from their current coordinate system to a new
 * coordinate system. This destination coordinate system may be another linear
 * coordinate system or a non-linear mapping like logarithmic. Conversion
 * objects are only associated with the value component of a well log data
 * source. The depth component of a well data source is never modified.
 *
 * @class geotoolkit.welllog.data.LogDataConversion
 * @deprecated since 2.5 use geotoolkit.data.DataConversion instead
 */
geotoolkit.welllog.data.LogDataConversion = {};

/**
 * @class geotoolkit.welllog.data.LinearDataConversion
 * @augments geotoolkit.data.LinearDataConversion
 * @param {number} dataLow lower data limit of the curve
 * @param {number} dataHigh higher data limit of the curve
 * @param {number} trackLow track lower limit
 * @param {number} trackHigh track high limit
 * @deprecated since 2.5 use geotoolkit.data.LinearDataConversion instead
 */
geotoolkit.welllog.data.LinearDataConversion = {};

/**
 * @class geotoolkit.welllog.data.LogarithmicDataConversion
 * @augments geotoolkit.welllog.data.LinearDataConversion
 * @param {number} coeff coefficient
 * @param {number} base logarithmic base
 * @param {number} logLow low value
 * @param {number} logHigh high value
 * @param {number} trackLow track lower value
 * @param {number} trackHigh track high value
 * @deprecated use geotoolkit.data.LogarithmicDataConversion instead
 */
geotoolkit.welllog.data.LogarithmicDataConversion = {};

/**
 * Represent a processed data sample
 *
 * @class geotoolkit.welllog.data.LogDataSample
 * @augments geotoolkit.data.DataSample
 * @param {number} depth depth
 * @param {number} value value
 * @param {number} level level
 * @param {boolean} valid
 * @param {number }srcIndex
 */
geotoolkit.welllog.data.LogDataSample = {};
    /**
     * Sets depth
     * @param {number} depth depth
     * @returns {geotoolkit.welllog.data.LogDataSample} this
     */
    geotoolkit.welllog.data.LogDataSample.prototype.setDepth = function(depth){};
    /**
     * Return depth
     * @returns {number}
     */
    geotoolkit.welllog.data.LogDataSample.prototype.getDepth = function(){};
    /**
     * Create clone
     * @override
     * @returns {geotoolkit.welllog.data.LogDataSample} clone
     */
    geotoolkit.welllog.data.LogDataSample.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @override
     * @returns {*}
     */
    geotoolkit.welllog.data.LogDataSample.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.depth] depth
     * @override
     * @return {geotoolkit.welllog.data.LogDataSample}
     */
    geotoolkit.welllog.data.LogDataSample.prototype.setProperties = function(properties){};

/**
 * Defines two arrays depths and values of samples
 * @class geotoolkit.welllog.data.LogDataValueArray
 * @param {Array} samples array of {@link geotoolkit.welllog.data.LogDataSample} elements
 * @deprecated use geotoolkit.data.DataValueArray instead
 */
geotoolkit.welllog.data.LogDataValueArray = {};

/**
 * The LogDataInterpolation interface defines a set of methods that allow you to synthetically generate points<br>
 * between two depth values that define how the curve for the data will be drawn.<br>
 * Interpolation objects are used to modify the default linear interpolation between two depth values defined in a <br>
 * particular well log data source (LogData) before being sent to the rendering system.<br>
 * Interpolation objects modify the flow of data values by adding generated points in between two depth values that are drawn.<br>
 * Interpolation objects do not modify the source data. They only generate new values between two existing depth values. <br>
 * Interpolation objects were designed to be extensible to meet the requirements of well log visualization.
 *
 * @class geotoolkit.welllog.data.LogDataInterpolation
 */
geotoolkit.welllog.data.LogDataInterpolation = {};
    /**
     * Interpolate array of samples
     * @function
     * @abstract
     * @param {number} start The start index
     * @param {number} count The count of samples to interpolate
     * @param {geotoolkit.welllog.data.LogDataValueArray} input The input data
     * @param {geotoolkit.welllog.data.LogDataValueArray} output The output data
     * @returns {boolean} true if interpolation is successful
     * @throws {Error} when invoked to indicate the method should be overridden.
     */
    geotoolkit.welllog.data.LogDataInterpolation.prototype.interpolate = function(start, count, input, output){};

/**
 * This interpolation cuts values lower and upper track limits
 *
 * @class geotoolkit.welllog.data.LogDataLimitsInterpolation
 * @augments geotoolkit.data.DataLimitsInterpolation
 * @param {number} dataLow track low limit
 * @param {number} dataHigh track high limit
 * @deprecated use geotoolkit.data.DataLimitsInterpolation instead
 */
geotoolkit.welllog.data.LogDataLimitsInterpolation = {};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.data.LogDataLimitsInterpolation.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.welllog.data.LogDataLimitsInterpolation}
     */
    geotoolkit.welllog.data.LogDataLimitsInterpolation.prototype.setProperties = function(properties){};

/**
 * Provides step-like interpolation for well log data. It provides zigzag-type
 * interpolation with alternate horizontal and vertical lines.
 *
 * @class geotoolkit.welllog.data.LogDataStepInterpolation
 * @augments geotoolkit.data.DataStepInterpolation
 * @param {geotoolkit.data.DataStepInterpolation.InterpolationType} interpolationType
 * [interpolationType=geotoolkit.welllog.data.LogDataStepInterpolation.InterpolationType.Linear] Type of step interpolation
 * @deprecated use geotoolkit.data.DataStepInterpolation instead
 */
geotoolkit.welllog.data.LogDataStepInterpolation = {};
    /**
     * Enum of step interpolation type
     * @enum
     * @readonly
     */
    geotoolkit.welllog.data.LogDataStepInterpolation.InterpolationType = {};
        /**
         * Linear
         * @type {string}
         */
        geotoolkit.welllog.data.LogDataStepInterpolation.InterpolationType.Linear = "";
        /**
         * Middle
         * @type {string}
         */
        geotoolkit.welllog.data.LogDataStepInterpolation.InterpolationType.MiddleStep = "";
        /**
         * End
         * @type {string}
         */
        geotoolkit.welllog.data.LogDataStepInterpolation.InterpolationType.EndStep = "";
        /**
         * Start
         * @type {string}
         */
        geotoolkit.welllog.data.LogDataStepInterpolation.InterpolationType.StartStep = "";

/**
 * The LogDataWrapInterpolation implements a simple wrapping interpolation for the curve data.
 *
 * @class geotoolkit.welllog.data.LogDataWrapInterpolation
 * @augments geotoolkit.data.DataWrapInterpolation
 * @param {geotoolkit.data.DataConversion} conversion conversion from current to new coordinate system
 * @param {number} trackLow track low limits
 * @param {number} trackHigh track high limits
 * @param {number} maxWraps maximum count of wraps (by default 5)
 * @deprecated use geotoolkit.data.DataWrapInterpolation instead
 * @throws Error if conversion is null
 */
geotoolkit.welllog.data.LogDataWrapInterpolation = {};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.data.LogDataWrapInterpolation.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.welllog.data.LogDataWrapInterpolation}
     */
    geotoolkit.welllog.data.LogDataWrapInterpolation.prototype.setProperties = function(properties){};

/**
 * The LogDataClipInterpolation implements a simple clipping interpolation for the curve data.
 *
 * @class geotoolkit.welllog.data.LogDataClipInterpolation
 * @augments geotoolkit.data.DataClipInterpolation
 * @param {geotoolkit.data.DataConversion} conversion conversion from current to new coordinate system
 * @param {number} trackLow track low limits
 * @param {number} trackHigh track high limits
 * @throws Error if conversion is null
 * @deprecated use geotoolkit.data.DataClipInterpolation instead
 */
geotoolkit.welllog.data.LogDataClipInterpolation = {};
    /**
     * Gets all the properties pertaining to this object
     * @returns {Object}
     */
    geotoolkit.welllog.data.LogDataClipInterpolation.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {Object} properties An object containing the properties to set
     * @returns {geotoolkit.welllog.data.LogDataClipInterpolation}
     */
    geotoolkit.welllog.data.LogDataClipInterpolation.prototype.setProperties = function(properties){};

/**
 * The LogDataGapFillInterpolation interface removes NaN values that form a gap in the data less than or equal to a specified size.
 *
 * @class geotoolkit.welllog.data.LogDataGapFillInterpolation
 * @augments geotoolkit.data.DataGapFillInterpolation
 * @deprecated use geotoolkit.data.DataGapFillInterpolation instead
 * @param {number} cutoff
 */
geotoolkit.welllog.data.LogDataGapFillInterpolation = {};

/**
 * Represents a chain of interpolations
 * @class geotoolkit.welllog.data.CompositeDataInterpolation
 * @augments geotoolkit.data.CompositeDataInterpolation
 * @deprecated use geotoolkit.data.CompositeDataInterpolation instead
 */
geotoolkit.welllog.data.CompositeDataInterpolation = {};

/**
 * Define container of the drilling sections
 *
 * @class geotoolkit.welllog.data.LogDrillingSectionContainer
 */
geotoolkit.welllog.data.LogDrillingSectionContainer = {};
    /**
     * Add Section
     * @param {geotoolkit.welllog.data.LogDrillingSection} section
     * @returns {geotoolkit.welllog.data.LogDrillingSectionContainer} this
     */
    geotoolkit.welllog.data.LogDrillingSectionContainer.prototype.addSection = function(section){};
    /**
     * Get Sections Array
     * @param {number} from
     * @param {number} to
     * @returns {Array.<geotoolkit.welllog.data.LogDrillingSection>|null}
     */
    geotoolkit.welllog.data.LogDrillingSectionContainer.prototype.getSectionsArray = function(from, to){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.data.LogDrillingSectionContainer.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.welllog.data.LogDrillingSection[]} [properties.sections] sections
     * @returns {geotoolkit.welllog.data.LogDrillingSectionContainer}
     */
    geotoolkit.welllog.data.LogDrillingSectionContainer.prototype.setProperties = function(properties){};

/**
 * Define container of the drilling sections
 *
 * @class geotoolkit.welllog.data.LogDrillingSection
 * @param {number} depthFrom from depth
 * @param {number} depthTo to depth
 * @param {object} valueFrom
 * @param {boolean} valueFrom.Break
 * @param {Date} valueFrom.Date
 * @param {object} valueTo
 * @param {boolean} valueTo.Break
 * @param {Date} valueTo.Date
 * @param {?Array.<object>} [hint] array of rendering hints that will value markers at specified depths, defined by a depth Depth: and time Time:
 */
geotoolkit.welllog.data.LogDrillingSection = {};
    /**
     * Gets depth from
     * @returns {number}
     */
    geotoolkit.welllog.data.LogDrillingSection.prototype.getDepthFrom = function(){};
    /**
     * Get DepthTo
     * @returns {number}
     */
    geotoolkit.welllog.data.LogDrillingSection.prototype.getDepthTo = function(){};
    /**
     * Get value from
     * Used by the {geotoolkit.axis.DateTimeTickGenerator} such that if Break, label is drawn at beginning or end of section instead of middle
     * @returns {object} result
     * @returns {Date} result.Date
     * @returns {boolean} result.Break
     */
    geotoolkit.welllog.data.LogDrillingSection.prototype.getValueFrom = function(){};
    /**
     * Get value to
     * Used by the {geotoolkit.axis.DateTimeTickGenerator} such that if Break, label is drawn at beginning or end of section instead of middle
     * @returns {object} result
     * @returns {Date} result.Date
     * @returns {boolean} result.Break
     */
    geotoolkit.welllog.data.LogDrillingSection.prototype.getValueTo = function(){};
    /**
     * Gets hints associated with this LogDrillingSection
     *
     * @returns {Array.<object>} array of hints
     */
    geotoolkit.welllog.data.LogDrillingSection.prototype.getHint = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.data.LogDrillingSection.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.depthfrom] depth from
     * @param {number} [properties.depthto] depth to
     * @param {object} [properties.valuefrom] an object containing valuefrom options
     * @param {boolean} [properties.valuefrom.break] break
     * @param {Date} [properties.valuefrom.date] date
     * @param {object} [properties.valueto] an object containing valueto options
     * @param {boolean} [properties.valueto.break] break
     * @param {Date} [properties.valueto.date] date
     * @returns {geotoolkit.welllog.data.LogDrillingSection}
     */
    geotoolkit.welllog.data.LogDrillingSection.prototype.setProperties = function(properties){};

/**
 * Class for compatibility. Implements depth methods
 *
 * @class geotoolkit.welllog.data.OptimizedData
 * @augments geotoolkit.data.OptimizedData
 * @param {geotoolkit.data.AbstractScaledData} scaledData abstract scaled data
 * @deprecated use geotoolkit.data.OptimizedData instead
 *
 */
geotoolkit.welllog.data.OptimizedData = {};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.welllog.data.OptimizedData.prototype.getMinDepth = function(){};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.welllog.data.OptimizedData.prototype.getMaxDepth = function(){};

/**
 * The ScaledData is a helper object that encapsulates the data
 * representing a well log curve and allows to associate either
 * conversion and/or interpolation objects with this data.
 *
 * @class geotoolkit.welllog.data.ScaledData
 * @param {geotoolkit.welllog.data.LogAbstractData} data abstract log data
 * @param {geotoolkit.data.DataConversion} conversion data conversion
 * @param {geotoolkit.data.DataInterpolation} [interpolation] algorithm to interpolate samples
 * @param {boolean} [useOutOfRangeData=false] convert values equals or less to zero to 0 instead of NaN
 *
 */
geotoolkit.welllog.data.ScaledData = {};
    /**
     * Return name of the data
     * @returns {string}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getName = function(){};
    /**
     * Sets conversion
     *
     * @param {geotoolkit.data.DataConversion} conversion conversion of the data
     * @returns {geotoolkit.welllog.data.ScaledData} this
     */
    geotoolkit.welllog.data.ScaledData.prototype.setConversion = function(conversion){};
    /**
     * Sets interpolation
     *
     * @param {geotoolkit.data.DataInterpolation} interpolation algorithm to interpolate samples
     * @returns {geotoolkit.welllog.data.ScaledData} this
     */
    geotoolkit.welllog.data.ScaledData.prototype.setInterpolation = function(interpolation){};
    /**
     * Gets source
     * @returns {object}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getSource = function(){};
    /**
     * Get minimum depth
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getMinDepth = function(){};
    /**
     * Returns maximum depth
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getMaxDepth = function(){};
    /**
     * Get minimum depth
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getMinPosition = function(){};
    /**
     * Returns maximum depth
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getMaxPosition = function(){};
    /**
     * Returns minimum value
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getMinValue = function(){};
    /**
     * Returns maximum value
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getMaxValue = function(){};
    /**
     * Gets scaled samples
     *
     * @deprecated since 2.6 use getSample(index) instead of getSamples
     * @returns {Array} array of {geotoolkit.welllog.data.LogDataSample}.
     */
    geotoolkit.welllog.data.ScaledData.prototype.getSamples = function(){};
    /**
     * Return sample at specified index
     * @param {number} index index of the sample
     * @returns {geotoolkit.welllog.data.LogDataSample} sample
     */
    geotoolkit.welllog.data.ScaledData.prototype.getSample = function(index){};
    /**
     * Gets a count of samples
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getLength = function(){};
    /**
     * Return the count of the samples
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getSize = function(){};
    /**
     * Return true if array of the depths is ordered
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.data.ScaledData.prototype.isForwardOnly = function(){};
    /**
     * return the order of depths array
     * @return {geotoolkit.data.DataOrder | number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getDataOrder = function(){};
    /**
     * Convert value from original source to current scaled data
     *
     * @param {array<number>|number} v value of the original data source
     * @param {array<number>|number} [d] depth of the original data source
     * @returns {array<number>|number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.convertValueFromSource = function(v, d){};
    /**
     * Convert value from scaled data source to original source
     *
     * @param {array<number>|number} v
     * value of the scaled data source
     * @returns {array<number>|number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.convertValueToSource = function(v){};
    /**
     * Return a wrap levels, If data doesn't have wraps than it returns null
     * @param {number} fromDepth from depth
     * @param {number} toDepth to depth
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getIndexRange = function(fromDepth, toDepth){};
    /**
     * Find index corresponding to depth
     *
     * @param {Array.<geotoolkit.welllog.data.LogDataSample>} scaledSamples samples
     * @param {number} depth depth
     * @param {number} length length of the array in the sample
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.findIndex = function(scaledSamples, depth, length){};
    /**
     * Return minimum wrap level. By default it is 0
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getMinWrapLevel = function(){};
    /**
     * Sets minimum wrap level value
     *
     * @param {number} level minimum wrap level
     * @returns {geotoolkit.welllog.data.ScaledData} this
     */
    geotoolkit.welllog.data.ScaledData.prototype.setMinWrapLevel = function(level){};
    /**
     * Return maximum wrap level. By default it is 0
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getMaxWrapLevel = function(){};
    /**
     * Sets maximum wrap level value
     *
     * @param {number} level maximum wrap level.
     * @returns {geotoolkit.welllog.data.ScaledData} this
     */
    geotoolkit.welllog.data.ScaledData.prototype.setMaxWrapLevel = function(level){};
    /**
     * Returns value at specified depth
     * @param {number} depth to return value
     * @returns {number} return value by depth
     */
    geotoolkit.welllog.data.ScaledData.prototype.getValue = function(depth){};
    /**
     * @protected
     * @param {number} depth depth to return value
     * @param {Array.<number>} samples samples
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getValueInternal = function(depth, samples){};
    /**
     * Return the value matching the given depth or NaN if the given depth is out of the logdata depth range.
     *
     * If the depths are strictly increasing:
     * - The returned value will be interpolated when necessary. See example 1
     *
     * If the depths are not strictly increasing but never decreasing:
     * - The value returned will be the first one found (in the insertion order). See example 2
     * - The value returned will be interpolated between the last one found and its closest larger neighbor. See example 2
     *
     * If the depths are not always increasing (not forward only):
     * - The value returned will be the last one found (in the insertion order). See example 3
     * - The value returned will be interpolated between the first one found and its closest larger neighbor. See example 3
     * @param {number} depth The depth for which you want to compute the value
     * @param {number} [fromIndex] index of sample in depths
     * @param {number} [toIndex] index of sample in depths
     * @param {geotoolkit.data.DataStepInterpolation.InterpolationType} [interpolation=geotoolkit.data.DataStepInterpolation.InterpolationType.Linear] interpolation type for the value
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getValueAt = function(depth, fromIndex, toIndex, interpolation){};
    /**
     * private
     * @param {geotoolkit.data.DataSample[]} samples samples
     * @param {number} depth depth
     * @param {number} prev prev
     * @param {number} next next
     * @returns {number}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getSampleAt = function(samples, depth, prev, next){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.data.ScaledData.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.welllog.data.ScaledData}
     */
    geotoolkit.welllog.data.ScaledData.prototype.setProperties = function(properties){};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.welllog.data.ScaledData.prototype.isOutdated = function(){};

/**
 * Define event to be used to notify about data changed
 * @class geotoolkit.welllog.data.LogDataEvent
 * @param {number} [startDepth] start depth
 * @param {number} [endDepth] end depth
 * @param {number} [oldStartDepth] old start depth
 * @param {number} [oldEndDepth] old end depth
 * @param {boolean} [valueLimitsChanged=true] defines if values limits are changed or not
 * @param {boolean} [valueAddedToTail=false] defines if values are added to the tail
 */
geotoolkit.welllog.data.LogDataEvent = {};
    /**
     * Return start depth
     * @returns {number}
     */
    geotoolkit.welllog.data.LogDataEvent.prototype.getStartDepth = function(){};
    /**
     * Return end depth
     * @returns {number}
     */
    geotoolkit.welllog.data.LogDataEvent.prototype.getEndDepth = function(){};
    /**
     * Return old start depth
     * @returns {number}
     */
    geotoolkit.welllog.data.LogDataEvent.prototype.getOldStartDepth = function(){};
    /**
     * Return old end depth
     * @returns {number}
     */
    geotoolkit.welllog.data.LogDataEvent.prototype.getOldEndDepth = function(){};
    /**
     * Return true if values limits are changed
     * @returns {boolean}
     */
    geotoolkit.welllog.data.LogDataEvent.prototype.isValueLimitsChanged = function(){};
    /**
     * Return true if values are added to the tail. This could happen in case of real time
     * @returns {boolean}
     */
    geotoolkit.welllog.data.LogDataEvent.prototype.isValueAddedToTail = function(){};
    /**
     * Return true if values was removed from the top of the datasource
     * @returns {boolean}
     */
    geotoolkit.welllog.data.LogDataEvent.prototype.isValueRemovedFromStart = function(){};
    /**
     * Return true if values was removed from the bottom of the datasource
     * @returns {boolean}
     */
    geotoolkit.welllog.data.LogDataEvent.prototype.isValueRemovedFromEnd = function(){};
    /**
     * Returns the same instance of the event arguments to void multiple events creation.
     * It means that this event cannot be kept.
     * @param {number} [startDepth] start depth
     * @param {number} [endDepth] end depth
     * @param {number} [oldStartDepth] old start depth
     * @param {number} [oldEndDepth] old end depth
     * @param {boolean} [valueLimitsChanged=true] defines if values limits are changed or not
     * @param {boolean} [valueAddedToTail=false] defines if values are added to the tail
     * @returns {geotoolkit.welllog.data.LogDataEvent} event
     */
    geotoolkit.welllog.data.LogDataEvent.getEvent = function(startDepth, endDepth, oldStartDepth, oldEndDepth, valueLimitsChanged, valueAddedToTail){};

/**
 *
 * Define abstract Log data
 *
 * @class geotoolkit.welllog.data.LogAbstractData
 * @augments geotoolkit.util.EventDispatcher
 */
geotoolkit.welllog.data.LogAbstractData = {};
    /**
     * Return the value to indicate if data source was changed
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getTimeStamp = function(){};
    /**
     * Update time stamp
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.updateTimeStamp = function(){};
    /**
     * Notify when data has been changed.
     * @param {geotoolkit.welllog.data.LogDataEvent} [args = null] optional parameters
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.update = function(args){};
    /**
     * Return index for specified depth
     * @param {number} depth The depth for which you want to compute the value
     * @param {number} [fromIndex] index of sample in depths
     * @param {number} [toIndex] index of sample in depths
     * @returns {number}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getIndexAt = function(depth, fromIndex, toIndex){};
    /**
     * Return the value matching the given depth or NaN if the given depth is out of the logdata depth range.
     *
     * If the depths are strictly increasing:
     * - The returned value will be interpolated when necessary. See example 1
     *
     * If the depths are not strictly increasing but never decreasing:
     * - The value returned will be the first one found (in the insertion order). See example 2
     * - The value returned will be interpolated between the last one found and its closest larger neighbor. See example 2
     *
     * If the depths are not always increasing (not forward only):
     * - The value returned will be the last one found (in the insertion order). See example 3
     * - The value returned will be interpolated between the first one found and its closest larger neighbor. See example 3
     *
     * Examples assume the default linear interpolation
     * @example
     * Example 1
     * Depth Value
     * 0 0
     * 100 1
     * 200 2
     *
     * getValueAt(100) -> 1
     * getValueAt(150) -> 1.5
     *
     * @example
     * Example 2
     * Depth Value
     * 0 0
     * 100 1
     * 100 2
     * 200 3
     *
     * getValueAt(100) -> 1
     * getValueAt(150) -> 2.5
     *
     *
     * @example
     * Example 3
     * Depth Value
     * 0 0
     * 100 1
     * 200 2
     * 100 3
     *
     * getValueAt(100) -> 3
     * getValueAt(150) -> 1.5
     *
     * @param {number} depth The depth for which you want to compute the value
     * @param {number} [fromIndex] index of sample in depths
     * @param {number} [toIndex] index of sample in depths
     * @param {geotoolkit.data.DataStepInterpolation.InterpolationType} [interpolation=geotoolkit.data.DataStepInterpolation.InterpolationType.Linear] interpolation type for the value
     * @returns {number}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getValueAt = function(depth, fromIndex, toIndex, interpolation){};
    /**
     * Utility function to interpolate a value between two depths.
     *
     * @param {number} depth The depth for which you want to compute the value
     * @param {Array<number>} depths The array of ordered depths
     * @param {Array<number>} values The array of values
     * @param {number} prev The index of the largest previous depth
     * @param {number} next The index of the smallest following depth
     * @param {geotoolkit.data.DataStepInterpolation.InterpolationType} [interpolation=geotoolkit.data.DataStepInterpolation.InterpolationType.Linear] interpolation type for the value
     * @returns {number} The interpolated value or Number.NaN if outside the range
     */
    geotoolkit.welllog.data.LogAbstractData.findValueAt = function(depth, depths, values, prev, next, interpolation){};
    /**
     * Utility function to interpolate a value between two depths.
     *
     * @param {number} depth The depth for which you want to compute the value
     * @param {number} depthPrev prev depth
     * @param {number} valuePrev prev value
     * @param {number} depthNext next depth
     * @param {number} valueNext next value
     * @param {geotoolkit.data.DataStepInterpolation.InterpolationType} [interpolation=geotoolkit.data.DataStepInterpolation.InterpolationType.Linear] interpolation type for the value
     * @returns {number} The interpolated value or Number.NaN if outside the range
     */
    geotoolkit.welllog.data.LogAbstractData.interpolateValueAt = function(depth, depthPrev, valuePrev, depthNext, valueNext, interpolation){};
    /**
     * Return the count of the samples
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getSize = function(){};
    /**
     * Return value unit name
     * @function
     * @abstract
     * @deprecated since 2.5
     * @returns {string}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getUnitName = function(){};
    /**
     * Return depth unit name
     * @function
     * @abstract
     * @deprecated since 2.5
     * @returns {string}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getIndexUnitName = function(){};
    /**
     * Return the depth unit
     * @function
     * @abstract
     * @returns {geotoolkit.util.AbstractUnit}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getValueUnit = function(){};
    /**
     * Return the value unit
     * @function
     * @abstract
     * @returns {geotoolkit.util.AbstractUnit}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getIndexUnit = function(){};
    /**
     * Return name of the data
     * @function
     * @abstract
     * @returns {string}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getName = function(){};
    /**
     * Return minimum depth
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getMinDepth = function(){};
    /**
     * Return maximum depth
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getMaxDepth = function(){};
    /**
     * Return minimum data value
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getMinValue = function(){};
    /**
     * Return maximum data value
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getMaxValue = function(){};
    /**
     * Return an array of values
     * @function
     * @abstract
     * @returns {Array<number>}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getValues = function(){};
    /**
     * Return an array of depths
     * @function
     * @abstract
     * @returns {Array<number>}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getDepths = function(){};
    /**
     * Return true if data is in ascending order
     * @function
     * @abstract
     * @returns {boolean}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.isForwardOnly = function(){};
    /**
     * Return the order of the log data
     * @function
     * @return {geotoolkit.data.DataOrder | number}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.getDataOrder = function(){};
    /**
     * Return an array of neat min and max
     * @function
     * @param {number} logScale scale log scale
     * @param {boolean} centerOnZeroOnNegativeMin If negative and positive values, center around 0
     * @param {string | geotoolkit.util.AbstractUnit} displayUnit displayed unit
     * @returns {Array<number>}
     */
    geotoolkit.welllog.data.LogAbstractData.prototype.calculateNeatLimits = function(logScale, centerOnZeroOnNegativeMin, displayUnit){};

/**
 * This class is the default implementation of a welllog datasource. It contains both the index values (md, tvd, etc) and the corresponding log values.
 * {@link geotoolkit.welllog.LogCurve} can use LogData as a datasource to render a welllog as a curve in a track.<br>
 * <br>
 * The LogData does not requires the index to be strictly increasing and it will not sort the indices/values.
 * It also keeps track of its state (typically for realtime scenario) through {@link geotoolkit.welllog.data.LogDataState}.
 * The LogData computes and maintains some statistics about its data (min, max) that are used by the shapes to render properly and efficiently.<br>
 * <br>
 * Any data sample can be marked as null. Null data values are
 * supported by visuals as breaks in the curve. The null value of sample can be specified using Number.NaN or NaN value.
 * <br>
 * It offers several functions to change the data it contains and will fire events accordingly. Note that most of the shapes that use LogData as datasource are optimized based on those events.
 * Therefore care must be given when changing the data. For example, clearing and setting all the values+1 is more expensive than adding a value.
 * @class geotoolkit.welllog.data.LogData
 * @augments geotoolkit.welllog.data.LogAbstractData
 * @param {Array<number> | string | object} [options] array of depths, data name, or object
 * @param {string} [options.name=''] name of data
 * @param {Array<number>} [options.depths=null] The array of depths
 * @param {Array<number>} [options.values=null] The array of values
 * @param {geotoolkit.util.AbstractUnit | string} [options.indexunit=null] unit index unit
 * @param {geotoolkit.util.AbstractUnit | string} [options.valuesunit=null] unit values unit
 * @param {Array<number>} [values] array of values
 * @example
 * var data1 = new geotoolkit.welllog.data.LogData("GR");
 * var data2 = new geotoolkit.welllog.data.LogData(depths, values);
 * var data3 = new geotoolkit.welllog.data.LogData({
 * name: "GR",
 * depths: mydepths,
 * values: myvalues
 * });
 */
geotoolkit.welllog.data.LogData = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getName = function(){};
    /**
     * Set name of the data
     * @param {string} name The log data name
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.setName = function(name){};
    /**
     * Clear log data. Removes all samples and reset depth limits
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.clear = function(){};
    /**
     * Sets state of data.
     * Values can be (Empty,Normal, Warning,Error,Fetching).
     *
     * @param {string} state state of data.
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.setState = function(state){};
    /**
     * Return state
     *
     * @returns {string}
     */
    geotoolkit.welllog.data.LogData.prototype.getState = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getSize = function(){};
    /**
     * Return depth by index
     *
     * @param {number} index index at the depth
     * @returns {number}
     */
    geotoolkit.welllog.data.LogData.prototype.getDepth = function(index){};
    /**
     * Return value by index
     *
     * @param {number} index index of the sample in the array
     * @returns {number}
     */
    geotoolkit.welllog.data.LogData.prototype.getValue = function(index){};
    /**
     * Set value by index
     *
     * @param {number} index index of the sample
     * @param {number} value sample values
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.setValue = function(index, value){};
    /**
     * Sets values
     *
     * @param {Array<number>} depths The array of ordered depths
     * @param {Array<number>} values The array of values
     * @returns {geotoolkit.welllog.data.LogData} this
     * @example
     * // Following example shows how to reverse depths and values for the curve displayed.
     * new geotoolkit.welllog.data.LogData('Curve Name')
     .setValues(depths.reverse(), values.reverse());
     */
    geotoolkit.welllog.data.LogData.prototype.setValues = function(depths, values){};
    /**
     * Suspend update
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.suspendUpdate = function(){};
    /**
     * Resume update.
     * forceUpdate calls updateDataStatistics (update min, max of values, depths...)
     *
     * @param {boolean} forceUpdate force update based on the state of the data
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.resumeUpdate = function(forceUpdate){};
    /**
     * Add values
     *
     * @param {number} depth The depth for which you want to compute the value
     * @param {number} value value at the specified depth
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.addValue = function(depth, value){};
    /**
     * Add values at the bottom of the log
     *
     * @param {Array<number>} depths The array of ordered depths
     * @param {Array<number>} values The array of values
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.addValues = function(depths, values){};
    /**
     * Remove values
     *
     * @param {number} index position where to remove the values
     * @param {number} count count of samples
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.removeValues = function(index, count){};
    /**
     * Insert/Replace the given value at the correct place in the log.
     * This function works ONLY if the existing data is ordered.
     *
     * @example
     * Depth Value
     * 100 0
     * 200 1
     *
     * mergeValue(150,3)
     *
     * Depth Value
     * 100 0
     * 150 3
     * 200 1
     *
     * @param {number} depth The depth for which you want to compute the value
     * @param {number} value value at the depth
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.mergeValue = function(depth, value){};
    /**
     * Remove values from start to end depth.
     * If startDepth is NaN or endDepth is NaN then it uses infinity values
     *
     * @param {number} startDepth where to start trim
     * @param {number} endDepth where to end trim
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.trimValues = function(startDepth, endDepth){};
    /**
     * Inserts/Replace the given values at the correct place in the log.
     * This function works ONLY if the existing data is ordered.
     *
     * @example
     * Depth Value
     * 50 0
     * 100 1
     * 200 2
     * 300 3
     *
     * mergeValue([0,100,150,500], [-1,-100,-150,-500])
     *
     * ---- Depth Value
     * ===> 0 -1
     * ---- 50 0
     * ===> 100 -100
     * ===> 150 -150
     * ---- 200 2
     * ---- 300 3
     * ===> 500 -500
     *
     * @param {Array<number>} depths the place where to merge in the log
     * @param {Array<number>} values the values to merge
     * @param {boolean} [checkValues=false] check values before merge
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.mergeValues = function(depths, values, checkValues){};
    /**
     * Sets the depths and values of this logdata using the given string arrays.
     * Uses parseFloat() to parse strings, also recognize 'NaN' values as Number.NaN.
     *
     * @param {string[]} depths array of strings
     * @param {string[]} values array of strings
     * @returns {geotoolkit.welllog.data.LogData}
     */
    geotoolkit.welllog.data.LogData.prototype.parseFromString = function(depths, values){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getMinDepth = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getMaxDepth = function(){};
    /**
     * Return minimum Meaning depth (first depth with value)
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.LogData.prototype.getMinMeaningDepth = function(){};
    /**
     * Return maximum Meaning depth (last depth with value)
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.LogData.prototype.getMaxMeaningDepth = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getMinValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getMaxValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getValues = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getDepths = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.isForwardOnly = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getDataOrder = function(){};
    /**
     *
     * Return value by depth, using linear interpolation if necessary.
    
     * See LogAbstractData.findValueAt.
     *
     * @param {number} depth The depth for which you want to compute the value
     * @param {number} prev The index of the largest previous depth
     * @param {number} next The index of the smallest following depth
     * @returns {number}
     */
    geotoolkit.welllog.data.LogData.prototype.getValueInRange = function(depth, prev, next){};
    /**
     * computes a value at specified depth
     * @function
     * @param {number} depth The depth for which you want to compute the value
     * @param {array} depths The array of ordered depths
     * @param {array} values The array of values
     * @param {number} prev The index of the largest previous depth
     * @param {number} next The index of the smallest following depth
     * @returns {number}
     */
    geotoolkit.welllog.data.LogData.findValueAt = function(depth, depths, values, prev, next){};
    /**
     * Sets value unit
     *
     * @param {geotoolkit.util.AbstractUnit | string} unit value unit
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.setValueUnit = function(unit){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getValueUnit = function(){};
    /**
     * Sets index unit
     *
     * @param {geotoolkit.util.AbstractUnit | string} unit index unit
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.setIndexUnit = function(unit){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getIndexUnit = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getUnitName = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.getIndexUnitName = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogData.prototype.calculateNeatLimits = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.data.LogData.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number[]} [properties.depths] depths
     * @param {number[]} [properties.values] values
     * @param {string} [properties.name] The log data name
     * @param {geotoolkit.util.AbstractUnit | string} [properties.indexunit] index unit
     * @param {geotoolkit.util.AbstractUnit | string} [properties.valueunit] value unit
     * @returns {geotoolkit.welllog.data.LogData} this
     */
    geotoolkit.welllog.data.LogData.prototype.setProperties = function(properties){};

/**
 * Define data for AccumulationCycle visual
 * @class geotoolkit.welllog.data.AccumulationCycleData
 * @augments geotoolkit.welllog.data.LogAbstractData
 * @param {string | object} [name] data name, or object
 * @param {Array.<number>} [depth] array of depth values
 * @param {Array.<number>} [values] array of values
 * @param {Array.<string>} [colors] array of colors
 * @param {Array.<string>} [titles] array of titles
 * @example
 * var data1 = new geotoolkit.welllog.data.AccumulationCycleData("name", depths, values);
 * var data2 = new geotoolkit.welllog.data.AccumulationCycleData({ depths: mydepths,
 * values: myvalues, name: "name"});
 */
geotoolkit.welllog.data.AccumulationCycleData = {};
    /**
     * Return titles of the data
     *
     * @returns {Array.<string>}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getTitles = function(){};
    /**
     * Return title by index
     *
     * @param {number} index index at the depth
     * @returns {string|null}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getTitle = function(index){};
    /**
     * Set titles of the data
     * @param {Array.<string>} titles The log data titles
     * @returns {geotoolkit.welllog.data.AccumulationCycleData} this
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.setTitles = function(titles){};
    /**
     * Return name of the data
     *
     * @returns {string}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getName = function(){};
    /**
     * Set name of the data
     * @param {string} name The log data name
     * @returns {geotoolkit.welllog.data.AccumulationCycleData} this
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.setName = function(name){};
    /**
     * Clear log data. Removes all samples and reset depth limits
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.clear = function(){};
    /**
     * Return a count of the samples
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getSize = function(){};
    /**
     * Return depth by index
     *
     * @param {number} index index at the depth
     * @returns {number}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getDepth = function(index){};
    /**
     * Return value by index
     *
     * @param {number} index index of the sample in the array
     * @returns {number}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getValue = function(index){};
    /**
     * Set fill color by index
     *
     * @param {number} index index of the sample
     * @param {string} color fill color
     * @returns {geotoolkit.welllog.data.AccumulationCycleData} this
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.setColor = function(index, color){};
    /**
     * Return color by index
     *
     * @param {number} index index of the sample in the array
     * @returns {string}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getColor = function(index){};
    /**
     * Set value by index
     *
     * @param {number} index index of the sample
     * @param {number} value sample values
     * @returns {geotoolkit.welllog.data.AccumulationCycleData} this
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.setValue = function(index, value){};
    /**
     * Sets values
     *
     * @param {Array.<Number>} depths The array of ordered depths
     * @param {Array.<Number>} values The array of values
     * @param {Array.<string>} colors The array of colors
     * @param {Array.<string>} [titles] The array of titles
     * @returns {geotoolkit.welllog.data.AccumulationCycleData} this
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.setValues = function(depths, values, colors, titles){};
    /**
     * Suspend update
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.suspendUpdate = function(){};
    /**
     * Resume update.
     * forceUpdate calls updateDataStatistics (update min, max of values, depths...)
     *
     * @param {boolean} forceUpdate force update based on the state of the data
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.resumeUpdate = function(forceUpdate){};
    /**
     * Add values
     *
     * @param {number} depth The depth for which you want to compute the value
     * @param {number} value value at the specified depth
     * @param {string} color color at the specified depth
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.addValue = function(depth, value, color){};
    /**
     * Add values at the bottom of the log
     *
     * @param {Array.<Number>} depths The array of ordered depths
     * @param {Array.<Number>} values The array of values
     * @param {Array.<string>} colors The array of colors
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.addValues = function(depths, values, colors){};
    /**
     * Remove values
     *
     * @param {number} index position where to remove the values
     * @param {number} count count of samples
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.removeValues = function(index, count){};
    /**
     * Insert/Replace the given value at the correct place in the log.
     * This function works ONLY if the existing data is ordered.
     *
     * @example
     * Depth Value
     * 100 0
     * 200 1
     *
     * mergeValue(150,3)
     *
     * Depth Value
     * 100 0
     * 150 3
     * 200 1
     *
     * @param {number} depth The depth for which you want to compute the value
     * @param {number} value value at the depth
     * @param {string} color color at the depth
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.mergeValue = function(depth, value, color){};
    /**
     * Remove values from start to end depth.
     * If startDepth is NaN or endDepth is NaN then it uses infinity values
     *
     * @param {number} startDepth where to start trim
     * @param {number} endDepth where to end trim
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.trimValues = function(startDepth, endDepth){};
    /**
     * Inserts/Replace the given values at the correct place in the log.
     * This function works ONLY if the existing data is ordered.
     *
     * @example
     * Depth Value
     * 50 0
     * 100 1
     * 200 2
     * 300 3
     *
     * mergeValue([0,100,150,500], [-1,-100,-150,-500])
     *
     * ---- Depth Value
     * ===> 0 -1
     * ---- 50 0
     * ===> 100 -100
     * ===> 150 -150
     * ---- 200 2
     * ---- 300 3
     * ===> 500 -500
     *
     * @param {Array.<Number>} depths the place where to merge in the log
     * @param {Array.<Number>} values the values to merge
     * @param {Array.<string>} colors the colors to merge
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.mergeValues = function(depths, values, colors){};
    /**
     * Sets the depths and values of this AccumulationCycleData using the given string arrays.
     * Uses parseFloat() to parse strings, also recognize 'NaN' values as Number.NaN.
     *
     * @param {string[]} depths array of strings
     * @param {string[]} values array of strings
     * @param {string[]} colors colors of strings
     * @returns {geotoolkit.welllog.data.AccumulationCycleData}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.parseFromString = function(depths, values, colors){};
    /**
     * Return minimum depth
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getMinDepth = function(){};
    /**
     * Return maximum depth
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getMaxDepth = function(){};
    /**
     * Return minimum Meaning depth (first depth with value)
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getMinMeaningDepth = function(){};
    /**
     * Return maximum Meaning depth (last depth with value)
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getMaxMeaningDepth = function(){};
    /**
     * Return values
     *
     * @returns {Array.<number>}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getValues = function(){};
    /**
     * Return an array of depths
     *
     * @returns {Array.<number>}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getDepths = function(){};
    /**
     * Return an array of colors
     *
     * @returns {Array.<string>}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getColors = function(){};
    /**
     * Return value by depth, using linear interpolation if necessary.
     *
     * See LogAbstractData.findValueAt.
     *
     * @param {number} depth The depth for which you want to compute the value
     * @param {number} prev The index of the largest previous depth
     * @param {number} next The index of the smallest following depth
     * @returns {number}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getValueInRange = function(depth, prev, next){};
    /**
     * computes a value at specified depth
     * @function
     * @param {number} depth The depth for which you want to compute the value
     * @param {array} depths The array of ordered depths
     * @param {array} values The array of values
     * @param {number} prev The index of the largest previous depth
     * @param {number} next The index of the smallest following depth
     * @returns {number}
     */
    geotoolkit.welllog.data.AccumulationCycleData.findValueAt = function(depth, depths, values, prev, next){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {Array.<Number>} [properties.depths] The array of ordered depths
     * @param {Array.<Number>} [properties.values] The array of values
     * @param {Array.<string>} [properties.colors] The array of colors
     * @param {string} [properties.name] The log data name
     * @returns {geotoolkit.welllog.data.AccumulationCycleData} this
     */
    geotoolkit.welllog.data.AccumulationCycleData.prototype.setProperties = function(properties){};

/**
 * This class defines a well log curve data source.
 *
 * @class geotoolkit.welllog.data.LogCurveDataSource
 * @augments geotoolkit.welllog.data.LogAbstractData
 * @param {object} [options] options
 * @param {string} [options.name] name of the curve
 * @param {Array<number> | geotoolkit.data.NumericalDataSeries | geotoolkit.data.NumericalDataSeriesView | string | number} [options.depths] depths array, series or name or index of series in data table if it is provided
 * @param {Array<number> | geotoolkit.data.NumericalDataSeries | geotoolkit.data.NumericalDataSeriesView | string | number} [options.values] values array, series or name or index of series in data table if it is provided
 * @param {geotoolkit.data.DataTable | geotoolkit.data.DataTableView} [options.datatable] DataTable or DataTableView which contains depth and value column
 * @example
 * var data1 = new geotoolkit.welllog.data.LogDataSource({ 'depth': depthObject, 'values': valuesObject });
 */
geotoolkit.welllog.data.LogCurveDataSource = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.dispose = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getUnitName = function(){};
    /**
     * Sets data
     * @param {object} [options] addition options
     * @param {string} [options.name] name of the curve
     * @param {Array<number> | geotoolkit.data.NumericalDataSeries | geotoolkit.data.NumericalDataSeriesView | string | number} [options.depths] depths array, series or name or index of series in data table if it is provided
     * @param {Array<number> | geotoolkit.data.NumericalDataSeries | geotoolkit.data.NumericalDataSeriesView | string | number} [options.values] values array, series or name or index of series in data table if it is provided
     * @param {geotoolkit.data.DataTable | geotoolkit.data.DataTableView} [options.datatable] DataTable or DataTableView which contains depth and value column
     * @returns {geotoolkit.welllog.data.LogCurveDataSource} this
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.setData = function(options){};
    /**
     * Returns the internal series object used to store the depth data
     * @returns {geotoolkit.data.NumericalDataSeries | geotoolkit.data.NumericalDataSeriesView} the internal backing object
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getDepthData = function(){};
    /**
     * Returns the internal series object used to store the value data
     * @returns {geotoolkit.data.NumericalDataSeries | geotoolkit.data.NumericalDataSeriesView} the internal backing object
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getValuesData = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getSize = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getIndexUnitName = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getIndexUnit = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getName = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getMinDepth = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getMaxDepth = function(){};
    /**
     * Return minimum Meaning depth (first depth with value)
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getMinMeaningDepth = function(){};
    /**
     * Return maximum Meaning depth (last depth with value)
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getMaxMeaningDepth = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getMinValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getMaxValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getValues = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getDepths = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getValue = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getDepth = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.isForwardOnly = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getDataOrder = function(){};
    /**
     * Clear log data.
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.clear = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.calculateNeatLimits = function(){};
    /**
     * Return value unit
     *
     * @returns {?geotoolkit.util.AbstractUnit}
     */
    geotoolkit.welllog.data.LogCurveDataSource.prototype.getValueUnit = function(){};

/**
 * Defines data utils
 * @class geotoolkit.welllog.data.LogDataUtil
 */
geotoolkit.welllog.data.LogDataUtil = {};
    /**
     * Parse array from strings
     *
     * @param {Array.<string>} values array of log values
     * @returns {Array.<Number>}
     */
    geotoolkit.welllog.data.LogDataUtil.prototype.parseFromString = function(values){};

/**
 * Define an abstract implementation of a row of Array Log Data set
 *
 * @class geotoolkit.welllog.data.AbstractDataRow
 */
geotoolkit.welllog.data.AbstractDataRow = {};
    /**
     * Return a count of the samples in the row
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.AbstractDataRow.prototype.getSize = function(){};
    /**
     * Return the depth
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.AbstractDataRow.prototype.getDepth = function(){};
    /**
     * Return the values
     * @function
     * @abstract
     * @param {Array.<number>} [values=null] optional buffer to fill values
     * @returns {Array.<number>}
     */
    geotoolkit.welllog.data.AbstractDataRow.prototype.getValues = function(values){};
    /**
     * Return the angles
     * @function
     * @abstract
     * @returns {Array.<number>}
     */
    geotoolkit.welllog.data.AbstractDataRow.prototype.getAngles = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.data.AbstractDataRow.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.welllog.data.AbstractDataRow}
     */
    geotoolkit.welllog.data.AbstractDataRow.prototype.setProperties = function(properties){};

/**
 * Define abstract data source for array log visuals like Log2DVisual
 *
 * @class geotoolkit.welllog.data.ArrayLogAbstractData
 * @augments geotoolkit.util.EventDispatcher
 * @param {string} [name] name of data
 */
geotoolkit.welllog.data.ArrayLogAbstractData = {};
    /**
     * Return name of the data
     *
     * @returns {string}
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.getName = function(){};
    /**
     * Set name of the data
     *
     * @param {string} name The data name
     * @returns {geotoolkit.welllog.data.ArrayLogAbstractData} this
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.setName = function(name){};
    /**
     * Notify if data is changed
     * @param {geotoolkit.welllog.data.LogDataEvent} [args = null] optional parameters
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.update = function(args){};
    /**
     * Return the value to indicate if data source was changed
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.getTimeStamp = function(){};
    /**
     * Update time stamp
     * @protected
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.updateTimeStamp = function(){};
    /**
     * Return number of rows
     * @function
     * @abstract
     * @returns {number} number of rows
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.getNumberOfRows = function(){};
    /**
     * Return a row by index
     * @function
     * @abstract
     * @param {number} index index of the row
     * @returns {geotoolkit.welllog.data.AbstractDataRow} a row
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.getRow = function(index){};
    /**
     * Return minimum value
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.getMinValue = function(){};
    /**
     * Return maximum value
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.getMaxValue = function(){};
    /**
     * Return minimum depth
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.getMinDepth = function(){};
    /**
     * Return maximum depth
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.getMaxDepth = function(){};
    /**
     * Return minimum angle of columns in radians
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.getMinAngle = function(){};
    /**
     * Return maximum angle of columns in radians
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogAbstractData.prototype.getMaxAngle = function(){};

/**
 * Define data source for array log visuals like Log2DVisual wo use DataSeries
 *
 * @class geotoolkit.welllog.data.ArrayLogDataSource
 * @augments geotoolkit.welllog.data.ArrayLogAbstractData
 * @param {object} [options] initialization parameters
 * @param {string} [options.name=null] name of the data source
 * @param {geotoolkit.data.DataTable|geotoolkit.data.DataTableView} [options.datatable=null] optional parameter to specify data
 * @param {object} [options.depths=null] optional parameter to specify depths data
 * @param {geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [options.depths.series=null] optional parameter to specify depths
 * @param {number} [options.depths.index=0] optional column index from table
 * @param {object} [options.values=null] optional parameter to specify values
 * @param {geotoolkit.data.NumericalDataSeries[] | geotoolkit.data.NumericalDataSeriesView[]} [options.values.series=null] values array of data series for each column
 * @param {number[]} [options.values.indices] optional array of column indices from data table
 * @param {object} [options.angles=null] optional properties of column angles
 * @param {geotoolkit.data.NumericalDataSeries[] | geotoolkit.data.NumericalDataSeriesView[]} [options.angles.series=null] array of series to provide
 * @param {number[]} [options.angles.indices=null] array of indices of columns to specify angles
 * @param {number[]} [options.angles.values=null] array of angles
 * @example Example how to create a table from data table
 * datatable = new geotoolkit.welllog.data.ArrayLogDataSource({
 * datatable: table,
 * depths: {'index': 0 },
 * values: {'indices' : [1,2,3,4,5] },
 * angles: { 'values': [0, Math.PI/2, Math.PI, Math.PI*3/2, Math.PI*2] }
 * });
 * @example Example how to create a table from data series
 * datatable = new geotoolkit.welllog.data.ArrayLogDataSource({
 * datatable: table,
 * depths: {'series' : depthSeries },
 * values: {'series' : [valSeries1,valSeries2,valSeries3,valSeries4,valSeries5] },
 * angles: { 'values': [0, Math.PI/2, Math.PI, Math.PI*3/2, Math.PI*2] }
 * });
 */
geotoolkit.welllog.data.ArrayLogDataSource = {};
    /**
     * @override
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.dispose = function(){};
    /**
     * Sets data
     * @param {object} [options] initialization parameters
     * @param {string} [options.name=null] name of the data source
     * @param {geotoolkit.data.DataTable|geotoolkit.data.DataTableView} [options.datatable=null] optional parameter to specify data
     * @param {object} [options.depths=null] optional parameter to specify depths data
     * @param {geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [options.depths.series=null] optional parameter to specify depths
     * @param {number} [options.depths.index=0] optional column index from table
     * @param {object} [options.values=null] optional parameter to specify values
     * @param {geotoolkit.data.NumericalDataSeries[] | geotoolkit.data.NumericalDataSeriesView[]} [options.values.series=null] values array of data series for each column
     * @param {number[]} [options.values.indices] optional array of column indices from data table
     * @param {object} [options.angles=null] optional properties of column angles
     * @param {geotoolkit.data.NumericalDataSeries[] | geotoolkit.data.NumericalDataSeriesView[]} [options.angles.series=null] array of series to provide
     * @param {number[]} [options.angles.indices=null] array of indices of columns to specify angles
     * @param {number[]} [options.angles.values=null] array of angles
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.setData = function(options){};
    /**
     * Return number of rows
     * @returns {number} number fo rows
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.getNumberOfRows = function(){};
    /**
     * Return a row by index
     * @param {number} index index of the row
     * @returns {geotoolkit.welllog.data.AbstractDataRow} a row
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.getRow = function(index){};
    /**
     * Return minimum value
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.getMinValue = function(){};
    /**
     * Return maximum value
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.getMaxValue = function(){};
    /**
     * Return minimum depth
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.getMinDepth = function(){};
    /**
     * Return maximum depth
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.getMaxDepth = function(){};
    /**
     * Return minimum angle of columns in radians
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.getMinAngle = function(){};
    /**
     * Return maximum angle of columns in radians
     * @returns {number}
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.getMaxAngle = function(){};
    /**
     * Return information if depths have ascending order
     * @returns {boolean} true if depths have ascending order
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.isForwardOnly = function(){};
    /**
     * return the order of depths array
     * @returns {geotoolkit.data.DataOrder | number}
     */
    geotoolkit.welllog.data.ArrayLogDataSource.prototype.getDataOrder = function(){};

/**
 * One line of 2D Data to be passed into Log2DVisualData. After being built can be added to a Log2DVisualData
 * by pushing it to getRows().
 *
 * @class geotoolkit.welllog.data.Log2DDataRow
 * @augments geotoolkit.welllog.data.AbstractDataRow
 * @param {number} depth depth
 * @param {Array.<number>} values array of values
 * @param {Array.<number>} angles array of angles in radians
 */
geotoolkit.welllog.data.Log2DDataRow = {};
    /**
     * Sets data
     *
     * @param {Array.<number>} values values
     * @param {Array.<number>} angles angles in radians
     * @returns {geotoolkit.welllog.data.Log2DDataRow}
     */
    geotoolkit.welllog.data.Log2DDataRow.prototype.setData = function(values, angles){};
    /**
     * Add single data
     *
     * @param {number} value value
     * @param {number} angle angle in radians
     * @returns {geotoolkit.welllog.data.Log2DDataRow}
     */
    geotoolkit.welllog.data.Log2DDataRow.prototype.addData = function(value, angle){};
    /**
     * Return a count of the samples in the row
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.Log2DDataRow.prototype.getSize = function(){};
    /**
     * Return the depth
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.Log2DDataRow.prototype.getDepth = function(){};
    /**
     * Return the values
     * @param {Array.<number>} [values=null] optional buffer to fill values
     * @returns {Array.<number>}
     */
    geotoolkit.welllog.data.Log2DDataRow.prototype.getValues = function(values){};
    /**
     * Return the angles
     *
     * @returns {Array.<number>}
     */
    geotoolkit.welllog.data.Log2DDataRow.prototype.getAngles = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.data.Log2DDataRow.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.depth] depth
     * @param {number[]} [properties.values] values
     * @param {number[]} [properties.angles] angles
     * @returns {geotoolkit.welllog.data.Log2DDataRow}
     */
    geotoolkit.welllog.data.Log2DDataRow.prototype.setProperties = function(properties){};

/**
 * Log2DVisualData holds Log2DDataRow objects and is passed into a Log2DVisual.
 *
 * @class geotoolkit.welllog.data.Log2DVisualData
 * @augments geotoolkit.welllog.data.ArrayLogAbstractData
 * @param {number[]|?object} [depths] array of depths or object with properties
 * @param {number[]} [depths.depths] array of depths or object with properties
 * @param {number[]} [depths.values] array of values
 * @param {string} [depths.name] name of dataset
 * @param {number[]} [values] array of values
 * @param {string} [name] name of dataset
 */
geotoolkit.welllog.data.Log2DVisualData = {};
    /**
     * A array of the rows. if the data in changed then it is necessary to call
     * updateLimits to recalculate the data limits
     *
     * @returns {Array.<geotoolkit.welllog.data.Log2DDataRow>}
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getRows = function(){};
    /**
     * Return number of rows
     * @returns {number} number of rows
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getNumberOfRows = function(){};
    /**
     * Return a row by index
     * @param {number} index index of the row
     * @returns {geotoolkit.welllog.data.Log2DDataRow} a row
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getRow = function(index){};
    /**
     * Return values
     *
     * @returns {Array.<number>}
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getValues = function(){};
    /**
     * Return an array of depths
     *
     * @returns {Array.<number>}
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getDepths = function(){};
    /**
     * Set NDV.
     * All NDV values in the data will be deleted at the first rasterize
     * If you wish to change NDV after rasterize, please reload data
     *
     * @param {number} ndv value used as NDV
     * @returns {geotoolkit.welllog.data.Log2DVisualData} this
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.setNDVValue = function(ndv){};
    /**
     * Get NDV
     *
     * @returns {number} value used as NDV
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getNDVValue = function(){};
    /**
     * Get order of depths
     * @returns {geotoolkit.data.DataOrder | number} enum describing order of data
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getDataOrder = function(){};
    /**
     * Recalculate depth limits and optional value limits
     *
     * @param {boolean} calculateValues Recalculate depth limits and optional value limits or not
     * @returns {geotoolkit.welllog.data.Log2DVisualData} this
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.calculateLimits = function(calculateValues){};
    /** Set the extreme values. If unknown or unspecified, please use calculateLimits
     * @param {number} minDepth min depth limit
     * @param {number} maxDepth max depth limit
     * @param {number} minValue min value for all rows
     * @param {number} maxValue max value for all rows
     * @returns {geotoolkit.welllog.data.Log2DVisualData} this
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.setExtremumValues = function(minDepth, maxDepth, minValue, maxValue){};
    /**
     * Recalculate depth and value limits
     * @returns {geotoolkit.welllog.data.Log2DVisualData} this
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.updateLimits = function(){};
    /**
     * Return minimum value
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getMinValue = function(){};
    /**
     * Return maximum value
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getMaxValue = function(){};
    /**
     * Return minimum depth
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getMinDepth = function(){};
    /**
     * Return maximum depth
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getMaxDepth = function(){};
    /**
     * Return minimum angle of columns in radians
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getMinAngle = function(){};
    /**
     * Return maximum angle of columns in radians
     *
     * @returns {number}
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getMaxAngle = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {Object}
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {Object} properties An object containing the properties to set
     * @param {geotoolkit.welllog.data.Log2DDataRow[]} [properties.rows] rows
     * @returns {geotoolkit.welllog.data.Log2DVisualData} this
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.setProperties = function(properties){};
    /**
     * Add row
     *
     * @param {geotoolkit.welllog.data.Log2DDataRow} row rows of values and angles at current depths
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.addRow = function(row){};
    /**
     * Notifies this shape that the data was changed outside of its knowledge
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.dataChanged = function(){};
    /**
     * Add values
     *
     * @param {Array.<number>} depths array of depths
     * @param {Array.<number>} values sample values array
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.addValues = function(depths, values){};
    /**
     * Sets passed values
     *
     * @param {Array} depths array of depths
     * @param {Array} values array of array values of current depths
     * @param {Array} angles array of angles
     * @returns {geotoolkit.welllog.data.Log2DVisualData}
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.setValues = function(depths, values, angles){};
    /**
     * Cleans all data
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.clear = function(){};
    /**
     * Inserts/Replace the given values at the correct place in the log.
     * This function works ONLY if the existing data is ordered.
     *
     * @example
     * Depth Value
     * 50 [0, 1]
     * 100 [1, 2]
     * 200 [2, 3]
     * 300 [3, 4]
     *
     * mergeValue([0,100,150,500], [[-1,1],[-100,-200],[-150, -123],[-500, -200]])
     *
     * ---- Depth Value
     * ===> 0 [-1,1]
     * ---- 50 [0, 1]
     * ===> 100 [-100,-200]
     * ===> 150 [-150, -123]
     * ---- 200 [2, 3]
     * ---- 300 [3, 4]
     * ===> 500 [-500, -200]
     *
     * @param {array} depths array of depths
     * @param {array} values array of array values of current depths
     * @param {array} angles array angle values
     */
    geotoolkit.welllog.data.Log2DVisualData.prototype.mergeValues = function(depths, values, angles){};

/**
 * This represents a parent class of all well log visuals. LogVisuals are shapes that are considered by the WelllogJS toolkit as 'top level' shapes.
 * The LogHeader and LogFooters for those visuals are created by the toolkit. <br>
 * Some advanced features like the Widget's SelectionTool will ignore any shape that is not a Visual. This class defines the parent class that needs to be inherited from, to benefit from those features.<br>
 * Most common WellLog shapes already inherit from this class, like LogCurve, LogTrack, etc.
 *
 * @class geotoolkit.welllog.LogAbstractVisual
 * @augments geotoolkit.scene.Node
 */
geotoolkit.welllog.LogAbstractVisual = {};
    /**
     * Invalidate bounds
     * @param {geotoolkit.util.Rect | undefined | null} [bounds]
     * if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.invalidateParent = function(bounds){};
    /**
     * Returns parent track if geotoolkit.welllog.LogTrack
     *
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.getTrack = function(){};
    /**
     * Sets line style
     *
     * @param {geotoolkit.attributes.LineStyle | string | object} lineStyle The style in which the line is displayed
     * object can be in format of constructor of geotoolkit.attributes.LineStyle
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogAbstractVisual} this
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Returns line style
     *
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.getLineStyle = function(){};
    /**
     * Return meaning data limits
     *
     * @param {boolean} [fullLimits] default value is false
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.getDataLimits = function(fullLimits){};
    /**
     * Returns parent model limits
     *
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.getModelLimits = function(){};
    /**
     * Returns bounds in the parent coordinates
     *
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.getBounds = function(){};
    /**
     * Sets bounds of the curve in the parent coordinates
     * and sets up auto bounds to false
     *
     * @param {geotoolkit.util.Rect} bounds the rectangle specifying position of the curve in the track.
     * @returns {geotoolkit.welllog.LogAbstractVisual} this
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.setBounds = function(bounds){};
    /**
     * Enables or disables auto bounds. If auto bounds is enabled then it
     * equals to parent model limits
     *
     * @param {boolean} enable Enables or disables auto bounds
     * @returns {geotoolkit.welllog.LogAbstractVisual} this
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.setAutoBounds = function(enable){};
    /**
     * Returns auto bounds value
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.isAutoBounds = function(){};
    /**
     * Retrieves the world transformation of the spatial
     * Returns null
     *
     * @returns {?geotoolkit.util.Transformation} null
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.getContentsTransform = function(){};
    /**
     * Retrieves the local transformation of the node which represents
     * multiplication of parent to bounds and contents transformations.
     *
     * @override
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.getWorldTransform = function(){};
    /**
     * Check culling.
     * Returns true if object is inside of renderable area
     *
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean}
     * @this {geotoolkit.scene.Shape}
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.checkCollision = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.util.Rect} [properties.bounds] the rectangle specifying position of the curve in the track.
     * @param {boolean} [properties.autobounds] Enables or disables auto bounds
     * @param {geotoolkit.attributes.LineStyle | string | object} [properties.linestyle] linestyle
     * @returns {geotoolkit.welllog.LogAbstractVisual} this
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.setProperties = function(properties){};
    /**
     * return an object that contains all headers registered with the visual
     * @returns {object} headers
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.getHeaders = function(){};
    /**
     * return the header registered by the name
     * @returns {object} header
     */
    geotoolkit.welllog.LogAbstractVisual.prototype.getHeader = function(){};

/**
 * Create point set visual
 *
 * @class geotoolkit.welllog.LogPointSet
 * @augments geotoolkit.welllog.LogAbstractVisual
 */
geotoolkit.welllog.LogPointSet = {};
    /**
     * Return model limits
     *
     * @override
     * @returns {null}
     */
    geotoolkit.welllog.LogPointSet.prototype.getModelLimits = function(){};
    /**
     * Return bound in the parent coordinates
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogPointSet.prototype.getBounds = function(){};
    /**
     * Sets bounds of the point set in the parent coordinates false
     *
     * @override
     * @param {geotoolkit.util.Rect} bounds bounds of the point set
     * @returns {geotoolkit.welllog.LogPointSet} this
     */
    geotoolkit.welllog.LogPointSet.prototype.setBounds = function(bounds){};
    /**
     * Enable or disable auto bounds If auto bounds is enabled then it equals to
     * parent model limits
     *
     * @override
     * @param {boolean} enable Enable or disable auto bounds
     * @returns {geotoolkit.welllog.LogPointSet} this
     */
    geotoolkit.welllog.LogPointSet.prototype.setAutoBounds = function(enable){};
    /**
     * Enable automatic bounds. If auto bounds is enabled then it equals to
     * parent model limits
     *
     * @override
     * @returns {boolean}
     */
    geotoolkit.welllog.LogPointSet.prototype.isAutoBounds = function(){};
    /**
     * Retrieves the world transformation of the spatial
     * @override
     */
    geotoolkit.welllog.LogPointSet.prototype.getContentsTransform = function(){};
    /**
     * Gets the visual's scaled data
     *
     * @returns {?geotoolkit.data.AbstractScaledData} (the implementation returns null).
     */
    geotoolkit.welllog.LogPointSet.prototype.getScaledData = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogPointSet.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.welllog.LogPointSet}
     */
    geotoolkit.welllog.LogPointSet.prototype.setProperties = function(properties){};

/**
 * The LogTrack is a generic container of Well elements like logcurves, log-axis, log-images, etc.
 * It can be used for various purposes like DepthIndex, TimeIndex or a plain LogCurve container. <br>
 * For example, one could add {@link geotoolkit.axis.Axis} to a log track to create an index-track, Or add a {@link geotoolkit.welllog.LogLog10ValueGrid} to create a logarithmic display.<br>
 * Track it self is not linear or logarithmic, you can mix regular curve and logarithmic in linear track and logarithmic curve with regular in logarithmic track.<br>
 * <br>
 * Options in the constructor are used to manipulate other properties like border,bounds. A combination of tracks can be displayed by using {@link geotoolkit.welllog.TrackContainer}.<br>
 * To add a curve to the track simply use addChild, geotoolkit.welllog.LogTrack.addChild({@link geotoolkit.welllog.LogCurve}). <br>
 * The children are displayed in order you add it in to the track so if you add curve and then lithology, then lithology will be above curve. <br>
 * To change the order you can remove child and add it again or use : <br>
 * track.changeChildOrder(curve, geotoolkit.scene.CompositeNode.NodeOrder.Last); // Please see CompositeNode.prototype.changeChildOrder documentation
 *
 * @class geotoolkit.welllog.LogTrack
 * @augments geotoolkit.scene.CompositeNode
 * @implements geotoolkit.layout.ILayoutable
 * @param {object} [options = null]
 * @param {object} [options.bounds = null] bounds of the visual
 * @param {object} [options.border = null] outline of the track
 * @param {boolean} [options.borderstrategy = geotoolkit.welllog.BorderStrategy.BorderOnTop] strategy on how to display the border of the track
 * @example
 * // 1).to modify properties of the border using css.
 * var css = [
 * '.Border {',
 * ' linestyle-color: red;',
 * ' linestyle-width: 2;',
 * '}',
 * ].join('\n');
 * track.setCss(new geotoolkit.css.CssStyle({'css': css}));
 * // 2). This example shows how to reorganize children in a particular track.
 * geotoolkit.selection.from(linearTrack)
 * .where( function (node) {
 * return node instanceof geotoolkit.welllog.LogCurve;
 * })
 * .selectToArray()
 * .forEach(function (logCurve) {
 * logCurve.getTrack().changeChildOrder(logCurve, geotoolkit.scene.CompositeNode.NodeOrder.Last);
 * });
 * widget.getTrackHeader(linearTrack).rebuild();
 */
geotoolkit.welllog.LogTrack = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.welllog.LogTrack} src Source to copy from
     */
    geotoolkit.welllog.LogTrack.prototype.copyConstructor = function(src){};
    /**
     * Invalidate bounds
     * @param {geotoolkit.util.Rect | undefined | null} [bounds] if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
     * @param {boolean} [force] force invalidation
     * @returns {geotoolkit.welllog.LogTrack} this
     */
    geotoolkit.welllog.LogTrack.prototype.invalidateParent = function(bounds, force){};
    /**
     * Return parent track container or null
     *
     * @returns {geotoolkit.welllog.TrackContainer|null}
     */
    geotoolkit.welllog.LogTrack.prototype.getTrackContainer = function(){};
    /**
     * Set track width and layout remains tracks
     * @param {number} width a new track width
     * @returns {geotoolkit.welllog.LogTrack} this
     */
    geotoolkit.welllog.LogTrack.prototype.setWidth = function(width){};
    /**
     * Returns track width
     * @returns {number}
     */
    geotoolkit.welllog.LogTrack.prototype.getWidth = function(){};
    /**
     * Returns an object that has getDeviceUnit and getScaleUnit functions
     * @returns {*|object}
     */
    geotoolkit.welllog.LogTrack.prototype.getUnitInfo = function(){};
    /**
     * Sets the track's unit info object, which holds getDeviceUnit and getScaleUnit functions
     *
     * @param {object} unitInfo track's unit info - device unit and the scaled unit
     */
    geotoolkit.welllog.LogTrack.prototype.setUnitInfo = function(unitInfo){};
    /**
     * Return an object { left: {boolean}, right: {boolean}, bottom: {boolean}, top: {boolean} };
     * where it is possible to specify the visibility of the each border
     *
     * @returns {object}
     */
    geotoolkit.welllog.LogTrack.prototype.getBorders = function(){};
    /**
     * return border visual
     * @returns {geotoolkit.scene.shapes.Border} border
     */
    geotoolkit.welllog.LogTrack.prototype.getBorder = function(){};
    /**
     * set borders state
     * @param {object} borders borders
     * @param {boolean} [borders.top] state of border on top
     * @param {boolean} [borders.bottom] state of border at bottom
     * @param {boolean} [borders.left] state of border on left
     * @param {boolean} [borders.right] state of border on right
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.LogTrack.prototype.setBorders = function(borders){};
    /**
     * Return border style
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.welllog.LogTrack.prototype.getLineStyle = function(){};
    /**
     * Sets border color
     * Returns this track
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogTrack} this
     */
    geotoolkit.welllog.LogTrack.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Return background color
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogTrack.prototype.getFillStyle = function(){};
    /**
     * Sets background fill style
     * Returns this track
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.LogTrack.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * render to specified context
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogTrack.prototype.renderContent = function(context){};
    /**
     * Occurs before child rendering
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogTrack.prototype.preRendering = function(context){};
    /**
     * To be called after rendering
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogTrack.prototype.postRendering = function(context){};
    /**
     * Update state
     * @param {Array<geotoolkit.util.Rect>} [regions] optional array to return invalid rectangles
     * @param {?geotoolkit.scene.Node.StateChanges} [changes] optional parameter to specify a reason of changes
     * @override
     */
    geotoolkit.welllog.LogTrack.prototype.updateState = function(regions, changes){};
    /**
     * Returns current bounds
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogTrack.prototype.getBounds = function(){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect} bounds bound of the node in the parent coordinates
     * @returns {geotoolkit.welllog.LogTrack} this
     */
    geotoolkit.welllog.LogTrack.prototype.setBounds = function(bounds){};
    /**
     * Retrieves the world transformation
     * of the spatial.
     *
     * @override
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.welllog.LogTrack.prototype.getContentsTransform = function(){};
    /**
     * Update current transformation
     */
    geotoolkit.welllog.LogTrack.prototype.updateContentsTransform = function(){};
    /**
     * Sets model minimum and maximum depth
     *
     * @param {number} minDepth minimum depth
     * @param {number} maxDepth maximum depth
     * @returns {geotoolkit.welllog.LogTrack} this
     */
    geotoolkit.welllog.LogTrack.prototype.setDepthLimits = function(minDepth, maxDepth){};
    /**
     * Returns depth range
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.LogTrack.prototype.getDepthLimits = function(){};
    /**
     * Returns model limits
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogTrack.prototype.getModelLimits = function(){};
    /**
     * Return log block
     *
     * @returns {geotoolkit.welllog.LogBlock}
     */
    geotoolkit.welllog.LogTrack.prototype.getBlock = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogTrack.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.welllog.BorderStrategy} [properties.borderstrategy] border strategy
     * @param {geotoolkit.util.Rect} [properties.bounds] bounds of the node in the parent coordinates
     * @param {geotoolkit.util.Rect} [properties.limits] depth or model limits of the node? mb set parameter format to .minDepth, .maxDepth and call setDepthLimits?
     * @param {geotoolkit.welllog.LogBlock} [properties.logblock] log block
     * @param {object} [properties.border] border
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.backgroundcolor] background color fill style
     * @returns {geotoolkit.welllog.LogTrack} this
     */
    geotoolkit.welllog.LogTrack.prototype.setProperties = function(properties){};
    /**
     * Specify desired layout style
     * @param {geotoolkit.layout.LayoutStyle | object} layoutStyle desired layout style
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.LogTrack.prototype.setLayoutStyle = function(layoutStyle){};
    /**
     * Return desired layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.welllog.LogTrack.prototype.getLayoutStyle = function(){};
    /**
     * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
     * @returns {geotoolkit.welllog.LogTrack} this
     */
    geotoolkit.welllog.LogTrack.prototype.invalidateLayout = function(){};

/**
 * Create the representation of a reference line.
 *
 * @class geotoolkit.welllog.LogReferenceLine
 * @augments geotoolkit.welllog.LogPointSet
 * @param {number} [value=0] value in track coordinates. by default from 0 to 1.
 */
geotoolkit.welllog.LogReferenceLine = {};
    /**
     * return meaning data limits
     *
     * @param {boolean|undefined} fullLimits default value is false
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.LogReferenceLine.prototype.getDataLimits = function(fullLimits){};
    /**
     * Returns the current value
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogReferenceLine.prototype.getValue = function(){};
    /**
     * Sets the current value
     *
     * @param {number} value value in track coordinates. by default from 0 to 1.
     * @returns {geotoolkit.welllog.LogReferenceLine} this
     */
    geotoolkit.welllog.LogReferenceLine.prototype.setValue = function(value){};
    /**
     * Return the current level
     *
     * @param {number} level level of wrap interpolation
     * @returns {geotoolkit.welllog.LogReferenceLine} this
     */
    geotoolkit.welllog.LogReferenceLine.prototype.setLevel = function(level){};
    /**
     * Return model limits
     *
     * @override
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.LogReferenceLine.prototype.getModelLimits = function(){};
    /**
     * Render line
     *
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogReferenceLine.prototype.render = function(context){};
    /**
     * Update geometry
     * Update scaled data, set state and draw graphics
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {geotoolkit.welllog.LogReferenceLine} this
     */
    geotoolkit.welllog.LogReferenceLine.prototype.updateGeometry = function(context){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.LogReferenceLine.prototype.updateState = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.LogReferenceLine.prototype.getScaledData = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogReferenceLine.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.value] current value in track coordinates. by default from 0 to 1.
     * @param {number} [properties.level] current level of wrap interpolation
     * @returns {geotoolkit.welllog.LogReferenceLine}
     */
    geotoolkit.welllog.LogReferenceLine.prototype.setProperties = function(properties){};

/**
 * Creates the standard representation of a well log curve. Data is passed in a LogAbstractData.<br>
 * The LogCurve is constructed from the passed data source, then addChild() has to be used to add the curve to the track. The corresponding Line Style and interpolation type is set with helper methods.<br>
 * Several methods are also available to handle Clipping, Wrapping, Display Modes( symbols, values etc), curve limits , decimation etc.<br>
 * setMicroPosition() can be used to place log curve at a specified position of the track in horizontal direction.<br>
 * Similarly, the add/remove/get-Child() has to be used to add the track containing the curve, to the TrackContainer.
 *
 * @class geotoolkit.welllog.LogCurve
 * @augments geotoolkit.welllog.LogPointSet
 * @param {geotoolkit.welllog.data.LogAbstractData} [data = null] data source to be displayed
 * @param {boolean} [autoUpdate = false] automatic update from data. If it sets to true then curve listens on data changes from data source.
 *
 * @example
 * new geotoolkit.welllog.TrackContainer(..).addChild(geotoolkit.welllog.LogTrack(..).addChild(geotoolkit.welllog.LogCurve(dataSource)))
 */
geotoolkit.welllog.LogCurve = {};
    /**
     * Enum of rendering optimization types
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogCurve.OptimizationType = {};
        /**
         * Filter points which are close to each other and are rendered in one pixel
         * @type {number}
         */
        geotoolkit.welllog.LogCurve.OptimizationType.FilterClosePoints = NaN;
        /**
         * Ramer–Douglas–Peucker optimization
         * @type {number}
         */
        geotoolkit.welllog.LogCurve.OptimizationType.RDP = NaN;
    /**
     * Enum of rendering optimization types
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogCurve.SymbolOptimizationType = {};
        /**
         * The same optimization as for curve
         * @type {number}
         */
        geotoolkit.welllog.LogCurve.SymbolOptimizationType.SameAsCurve = NaN;
        /**
         * Symbols bbox intersection optimization
         * @type {number}
         */
        geotoolkit.welllog.LogCurve.SymbolOptimizationType.Intersection = NaN;
    /**
     * Enum of curve limits type
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogCurve.LimitsType = {};
        /**
         * Auto limits
         * @type {number}
         */
        geotoolkit.welllog.LogCurve.LimitsType.Auto = NaN;
        /**
         * Neat limits
         * @type {number}
         */
        geotoolkit.welllog.LogCurve.LimitsType.Neat = NaN;
        /**
         * Manual limits
         * @type {number}
         */
        geotoolkit.welllog.LogCurve.LimitsType.Manual = NaN;
    /**
     * Returns the curve description
     *
     * @returns {?string} The node name
     */
    geotoolkit.welllog.LogCurve.prototype.getDescription = function(){};
    /**
     * Sets description of the node
     *
     * @param {?string} description The node description
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setDescription = function(description){};
    /**
     * Returns reference curve
     * @returns {geotoolkit.welllog.LogCurve} reference curve
     */
    geotoolkit.welllog.LogCurve.prototype.getReferenceCurve = function(){};
    /**
     * Set reference curve
     * @param {geotoolkit.welllog.LogCurve} referenceCurve reference curve
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setReferenceCurve = function(referenceCurve){};
    /**
     * Sets symbol's skip intersection ratio
     * @param {number} symbolSkipintersectionRatio value to set
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setSymbolSkipIntersectionRatio = function(symbolSkipintersectionRatio){};
    /**
     * Gets symbols' skip intersection ratio
     * @returns {number|*}
     */
    geotoolkit.welllog.LogCurve.prototype.getSymbolsSkipIntersectionRatio = function(){};
    /**
     * @override
     */
    geotoolkit.welllog.LogCurve.prototype.getDataLimits = function(){};
    /**
     * Sets data source to be displayed.
     *
     * @param {geotoolkit.welllog.data.LogAbstractData} data
     * data to display
     * @param {boolean} [resetNormalizationLimits = true] resets custom normalization limits
     * and take it from data. By default it is true
     * @param {boolean} [autoUpdate = true] automatic update from data source. If it sets to true then curve listens on data changes from data source.
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setData = function(data, resetNormalizationLimits, autoUpdate){};
    /**
     * Synchronize state from data
     * @param {geotoolkit.util.Rect} [rect = null] optional area to invalidate
     * @param {geotoolkit.welllog.data.LogDataEvent} [args] event arguments
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.updateFromData = function(rect, args){};
    /**
     * Returns WellLog Data
     *
     * @returns {geotoolkit.welllog.data.LogAbstractData}
     */
    geotoolkit.welllog.LogCurve.prototype.getDataSource = function(){};
    /**
     * Returns whether wrapping is enabled
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.isWrapping = function(){};
    /**
     * Sets whether wrapping is enabled.
     *
     * @param {boolean} wrapping wrapping on or off, based on if you want to see the clipped part of the track or not
     * @returns {geotoolkit.welllog.LogCurve} this
     * @example
     * //if you enable wrapping, you also need to specify ClippingLimits
     * var logCurve = new geotoolkit.welllog.CompositeLogCurve()
     * .setLineStyle({'color': colors[i], 'width': 1})
     * .setWrapping(true)
     * .setClippingLimits(0, 100) // example
     * .setId({'id': curveMnemonic[i], 'wellId': 'wellId'});
     */
    geotoolkit.welllog.LogCurve.prototype.setWrapping = function(wrapping){};
    /**
     * Sets normalization limits of the data values. The data limits are used by
     * default.
     *
     * @param {number|geotoolkit.util.Range} minValue min value which can be specified for normalization
     * @param {number} [maxValue] max value which can be specified for normalization
     * @returns {geotoolkit.welllog.LogCurve} this
     * @example
     * curve.setNormalizationLimits(100, 130); // It means that each sample value that is less than 100 should have value 100, Same for 130
     */
    geotoolkit.welllog.LogCurve.prototype.setNormalizationLimits = function(minValue, maxValue){};
    /**
     * Enum of step interpolation type
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogCurve.ClippingType = {};
        /**
         * None
         * @type {string}
         */
        geotoolkit.welllog.LogCurve.ClippingType.None = "";
        /**
         * Software
         * @type {string}
         */
        geotoolkit.welllog.LogCurve.ClippingType.Software = "";
        /**
         * Hardware
         * @type {string}
         */
        geotoolkit.welllog.LogCurve.ClippingType.Hardware = "";
    /**
     * Default Clipping type
     * @type {geotoolkit.welllog.LogCurve.ClippingType|string}
     */
    geotoolkit.welllog.LogCurve.DefaultClippingType = {};
    /**
     * Sets Clipping limits of the data values. The data limits are used by
     * default.
     *
     * @param {number} minValue This provides a way to specify min limit for clipping.
     * @param {number} maxValue This provides a way to specify max limit for clipping.
     * @param {geotoolkit.welllog.LogCurve.ClippingType} [clippingType] optional clipping type
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setClippingLimits = function(minValue, maxValue, clippingType){};
    /**
     * Returns true if clipping is enabled
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.isClippingEnabled = function(){};
    /**
     * Returns true if normalization is enabled
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.isNormalizationEnabled = function(){};
    /**
     * Returns true if limits are custom
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.isCustomLimits = function(){};
    /**
     * Sets neat log limits
     *
     * @param {boolean} centerOnZeroOnNegativeMin center the limits
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setNeatLogLimits = function(centerOnZeroOnNegativeMin){};
    /**
     * Gets the value of centerOnZeroOnNegativeMin property
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.getNeatLogLimits = function(){};
    /**
     * This method resets custom normalization limits
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.resetNormalizationLimits = function(){};
    /**
     * This method resets clipping limits
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.resetClippingLimits = function(){};
    /**
     * Returns minimum normalization limit
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogCurve.prototype.getMinimumNormalizationLimit = function(){};
    /**
     * Returns maximum normalization limit
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogCurve.prototype.getMaximumNormalizationLimit = function(){};
    /**
     * Returns minimum clipping limit
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogCurve.prototype.getMinimumClippingLimit = function(){};
    /**
     * Returns maximum clipping limit
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogCurve.prototype.getMaximumClippingLimit = function(){};
    /**
     * Returns original data value limits
     *
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.LogCurve.prototype.getValueDataLimits = function(){};
    /**
     * Returns model limits
     *
     * @override
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.LogCurve.prototype.getModelLimits = function(){};
    /**
     * Update state
     * @override
     * @param {geotoolkit.util.Rect[]} [regions] optional array to return invalid rectangles
     * @param {geotoolkit.scene.Node.StateChanges} [changes] optional parameter to specify a reason of changes
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.updateState = function(regions, changes){};
    /**
     * Returns interpolation type
     * ('Linear', 'MiddleStep', 'EndStep', 'StartStep')
     *
     * @returns {geotoolkit.data.DataStepInterpolation.InterpolationType}
     */
    geotoolkit.welllog.LogCurve.prototype.getInterpolationType = function(){};
    /**
     * Sets interpolation type
     *
     * @param {geotoolkit.data.DataStepInterpolation.InterpolationType|string} interpolationType interpolation type
     * @throws {Error} If interpolationType is not correct
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setInterpolationType = function(interpolationType){};
    /**
     * Returns display mode
     * (any combination of values: 'line', 'symbol', 'value'; or an empty array)
     *
     * @returns {Array<string>}
     */
    geotoolkit.welllog.LogCurve.prototype.getDisplayMode = function(){};
    /**
     * Sets display mode
     *
     * @param {array|string} t
     * in the new version, an array with a combination of values: 'line', 'symbol', 'value', 'bar'; or an empty array.
     * In the old version, a string: 'line', 'symbol', 'both', 'bar', 'value' or 'none'
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setDisplayMode = function(t){};
    /**
     * Sets maximum count of wraps for wrap interpolation
     *
     * @param {number} count
     * count of wraps
     * @throws {Error}
     * if count is less then zero
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setMaxWraps = function(count){};
    /**
     * Returns maximum count of the wraps
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogCurve.prototype.getMaxWraps = function(){};
    /**
     * Helper method to setup line visibility
     *
     * @param {boolean} enable visibility of the line
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setVisibleLine = function(enable){};
    /**
     * Returns true if line is visible (convenience method)
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.isVisibleLine = function(){};
    /**
     * Helper method to set up symbols visibility
     *
     * @param {boolean} enable symbols visibility on or off
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setVisibleSymbol = function(enable){};
    /**
     * Returns true if symbols are visible (convenience method)
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.isVisibleSymbol = function(){};
    /**
     * Helper method to set up values visibility.
     *
     * @param {boolean} enable values visibility on or off
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setVisibleValue = function(enable){};
    /**
     * Returns true if values are visible (convenience method)
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.isVisibleValue = function(){};
    /**
     * Helper method to set up value-bars visibility.
     *
     * @param {boolean} enable value-bars visibility on or off
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setVisibleBar = function(enable){};
    /**
     * Returns true if value-bars are visible
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.isVisibleBar = function(){};
    /**
     * Helper method to set value-bars line style.
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setBarLineStyle = function(lineStyle, merge){};
    /**
     * Helper method to get value-bars line style
     *
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.welllog.LogCurve.prototype.getBarLineStyle = function(){};
    /**
     * Helper method to set alignment of value-bars to the right
     * @param {boolean} enable defines if value-bars right align is true or false
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setBarsRightAligned = function(enable){};
    /**
     * Returns true if value-bars right align is true
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.isBarsRightAligned = function(){};
    /**
     * Converts data sample value to curve model value
     *
     * @param {number} v data value
     * @param {number} [d] data depth
     * @returns {number} a curve value
     */
    geotoolkit.welllog.LogCurve.prototype.convertDataToCurveValue = function(v, d){};
    /**
     * Set state of rendering for out of range values
     * @param {boolean} outOfRangeValues value to set
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setDrawOutOfRangeValues = function(outOfRangeValues){};
    /**
     * Returns true if zero is a valid value in logarithmic mode
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.getDrawOutOfRangeValues = function(){};
    /**
     * Sets the value of the cutoff used for removing NaN valued samples. Gaps will only be 'filled' when the cutoff value is non zero and the unit is convertible to the index unit.
     * @param {number} cutoff The cutoff value. When non zero and a matching unit is set
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setGapFillCutoffValue = function(cutoff){};
    /**
     * Returns the value of the cutoff used for removing NaN valued samples
     * @returns {number} The cutoff value
     */
    geotoolkit.welllog.LogCurve.prototype.getGapFillCutoffValue = function(){};
    /**
     * Set the value of the gap. Value will be used to disconnect the sample if the distance between two samples in depth or time is more than specified value
     * @param {number} value The maximum discontinuity allowed in depth or time
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setGapValue = function(value){};
    /**
     * Returns The maximum discontinuity allowed in depth or time
     * @returns {number} value
     */
    geotoolkit.welllog.LogCurve.prototype.getGapValue = function(){};
    /**
     * Sets the unit of the cutoff used for removing NaN valued samples. Gaps will only be 'filled'
     * when the cutoff value is non zero and the unit is convertible to the index unit. If unit is not specified
     * then curve index unit is used. if a depth or time interval is less than specified cutoff value then interval is connected and NaN
     * values between are removed.
     * @param {geotoolkit.util.AbstractUnit|string} unit The unit or unit symbol to use for the gap fill cutoff
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setGapFillCutoffUnit = function(unit){};
    /**
     * Returns the unit of the cutoff used for removing NaN valued samples
     * @returns {geotoolkit.util.AbstractUnit} The cutoff unit
     */
    geotoolkit.welllog.LogCurve.prototype.getGapFillCutoffUnit = function(){};
    /**
     * Sets the unit of the gap to show discontinuity in sample
     * when the cutoff value is non zero and the unit is convertible to the index unit. If unit is not specified
     * then curve index unit is used. if a depth or time interval is less than specified cutoff value then interval is connected and NaN
     * values between are removed.
     * @param {geotoolkit.util.AbstractUnit|string} unit The unit
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setGapUnit = function(unit){};
    /**
     * Returns the unit of the gap
     * @returns {geotoolkit.util.AbstractUnit} The cutoff unit
     */
    geotoolkit.welllog.LogCurve.prototype.getGapUnit = function(){};
    /**
     * Returns true if logarithmic mode is enabled
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.isLogarithmicScale = function(){};
    /**
     * Sets logarithmic mode. This applies a log on the values themselves.
     *
     * @param {boolean} enable logarithmic mode on or off.
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setLogarithmicScale = function(enable){};
    /**
     *
     * @param {geotoolkit.welllog.LogCurve.OptimizationType} optimizationType optimization type
     * @returns {geotoolkit.data.OptimizedData.OptimizationType}
     */
    geotoolkit.welllog.LogCurve.convertOptimizationTypeValue = function(optimizationType){};
    /**
     * Returns scaled data
     *
     * @override
     * @returns {geotoolkit.data.AbstractScaledData|null}
     */
    geotoolkit.welllog.LogCurve.prototype.getScaledData = function(){};
    /**
     * Returns data range
     * @param {number} fromDepth from depth
     * @param {number} toDepth to depth
     * @param {geotoolkit.util.Transformation} transformation transformation
     * @returns {geotoolkit.data.AbstractScaledData} data range
     */
    geotoolkit.welllog.LogCurve.prototype.getDataRange = function(fromDepth, toDepth, transformation){};
    /**
     * Gets array of {geotoolkit.welllog.data.LogDataSample} elements within defined depth range (convenience method).
     *
     * @deprecated since 2.6
     * @param {number} [fromDepth]
     * start depth in the current range
     * @param {number} [toDepth]
     * to depth in the current range
     * @returns {object|null} array all of the elements in the range
     * @override
     */
    geotoolkit.welllog.LogCurve.prototype.getScaledDataRange = function(fromDepth, toDepth){};
    /**
     * Sets optimization type
     * @param {geotoolkit.welllog.LogCurve.OptimizationType} optimizationType optimization type which used with current curve
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setOptimizationType = function(optimizationType){};
    /**
     * Turns on/off optimization for curve
     * @param {boolean} [needOptimize] Is optimization for curve on
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setOptimizationCurve = function(needOptimize){};
    /**
     * Returns curve optimization flag
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.getOptimizationCurve = function(){};
    /**
     * Turns on/off optimization for bars
     * @param {boolean} [needOptimize] Is optimization for bars on
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setOptimizationBar = function(needOptimize){};
    /**
     * Returns bars optimization flag
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.getOptimizationBar = function(){};
    /**
     * Sets optimization type
     * @param {geotoolkit.welllog.LogCurve.SymbolOptimizationType} optimizationType optimization type which used with current symbols
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setSymbolOptimizationType = function(optimizationType){};
    /**
     * Turns on/off optimization for symbols
     * @param {boolean} [needOptimize] Is optimization for symbols on
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setOptimizationSymbol = function(needOptimize){};
    /**
     * Returns symbol optimization flag
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.getOptimizationSymbol = function(){};
    /**
     * Turns on/off optimization for values
     * @param {boolean} [needOptimize] Is optimization for values on
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setOptimizationValue = function(needOptimize){};
    /**
     * Returns values optimization flag
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.getOptimizationValue = function(){};
    /**
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogCurve.prototype.render = function(context){};
    /**
     * Set wrap line style handler. Custom colors can be set for different wrap levels, please refer to example below.
     * @param {function(sender, wrapLevel)} wrapLineStyleHandler handler should return {@link geotoolkit.attributes.LineStyle}
     * @returns {geotoolkit.welllog.LogCurve} this
     * @example
     * createCurve(createTestData(4500, 10, 'GR'))
     * .setLineStyle(new geotoolkit.attributes.LineStyle(Helpers.getColor('green'), 1))
     * .setClippingLimits(70, 90) // set clipping limits,
     * .setWrapping(true) //set wrapping
     * .setMaxWraps(5)
     * .setWrapLineStyleHandler(function (logCurve, wrapLevel) { //set custom colors for particular levels
     * var negativeColors = ['rgba(0,200,50, 1)', 'rgba(0,150,100, 1)', 'rgba(0,100,150, 1)', 'rgba(0,50,200, 1)', 'rgba(0,0,255, 1)'];
     * var positiveColors = ['rgba(50,200,0, 1)', 'rgba(100,150,0, 1)', 'rgba(150,100,0, 1)', 'rgba(200,50,0, 1)', 'rgba(255,0,0, 1)'];
     * if (wrapLevel < 0)
     * return new geotoolkit.attributes.LineStyle(negativeColors[-wrapLevel]);
     * else if (wrapLevel > 0)
     * return new geotoolkit.attributes.LineStyle(positiveColors[wrapLevel]);
     * else return null;
     * }),
     */
    geotoolkit.welllog.LogCurve.prototype.setWrapLineStyleHandler = function(wrapLineStyleHandler){};
    /**
     * Returns wrap line style handler
     * @returns {function(sender, wrapLevel)} wrap style handler
     */
    geotoolkit.welllog.LogCurve.prototype.getWrapLineStyleHandler = function(){};
    /**
     * Set log gradient style
     * @param {geotoolkit.welllog.attributes.LogGradientStyle} gradientLineStyle style
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setGradientLineStyle = function(gradientLineStyle){};
    /**
     * Returns log gradient style
     * @returns {geotoolkit.welllog.attributes.LogGradientStyle} log gradient style
     */
    geotoolkit.welllog.LogCurve.prototype.getGradientLineStyle = function(){};
    /**
     * Sets symbol to be used to render markers for null value
     *
     * @param {geotoolkit.scene.shapes.Symbol} symbol symbol used at the start and end of the gap(null value)
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setNullValueSymbol = function(symbol){};
    /**
     * Returns symbol to be used to draw markers for null value
     *
     * @returns {geotoolkit.scene.shapes.Symbol}
     */
    geotoolkit.welllog.LogCurve.prototype.getNullValueSymbol = function(){};
    /**
     * Returns true if symbol to be used to draw markers for null value is visible
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurve.prototype.isVisibleNullValueSymbol = function(){};
    /**
     * Display or hide null values symbols
     * @param {boolean} visible visible null value symbols
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setVisibleNullValueSymbol = function(visible){};
    /**
     * Sets symbol to be used to render markers
     *
     * @param {geotoolkit.scene.shapes.Symbol} symbol symbols to be used for markers
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setSymbol = function(symbol){};
    /**
     * Returns symbol to be used to draw markers
     *
     * @returns {geotoolkit.scene.shapes.Symbol}
     */
    geotoolkit.welllog.LogCurve.prototype.getSymbol = function(){};
    /**
     * Sets symbol decimation step
     *
     * @param {number} step range to skip the symbols
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setSymbolDecimationStep = function(step){};
    /**
     * Returns symbols gap
     *
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.welllog.LogCurve.prototype.getSymbolsGap = function(){};
    /**
     * Returns symbol decimation step
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogCurve.prototype.getSymbolDecimationStep = function(){};
    /**
     * Sets micro position (0 - 1). It allows application code to display the curve in a subarea of the track.<br>
     * By default log curve uses all space of the trace in the horizontal direction, but micro position allows to place log curve or other visual in the specified position of the track in horizontal direction.
     * See example below
     * @param {number} left left position
     * @param {number} right right position
     * @returns {geotoolkit.welllog.LogCurve} this
     * @example
     * // The following code places curve 20% from left and 20% from right.
     * curve.setMicroPosition(0.2,0.8);
     */
    geotoolkit.welllog.LogCurve.prototype.setMicroPosition = function(left, right){};
    /**
     * Returns micro position left
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogCurve.prototype.getMicroPositionLeft = function(){};
    /**
     * Returns micro position right
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogCurve.prototype.getMicroPositionRight = function(){};
    /**
     * Returns display unit
     *
     * @returns {geotoolkit.util.AbstractUnit}
     */
    geotoolkit.welllog.LogCurve.prototype.getDisplayUnit = function(){};
    /**
     * Sets display unit
     *
     * @param {geotoolkit.util.AbstractUnit|string} unit display unit like feet, meters etc
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setDisplayUnit = function(unit){};
    /**
     * Returns limits type
     *
     * @returns {geotoolkit.welllog.LogCurve.LimitsType|number}
     */
    geotoolkit.welllog.LogCurve.prototype.getLimitsType = function(){};
    /**
     * Sets text style
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * Gets text style
     *
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.LogCurve.prototype.getTextStyle = function(){};
    /**
     * Sets text anchor type
     *
     * @param {geotoolkit.util.AnchorType} anchorType position to place the anchor
     * @throws {Error} if anchorType value is not valid
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setTextAnchorType = function(anchorType){};
    /**
     * Gets text anchor type
     *
     * @returns {geotoolkit.util.AnchorType}
     */
    geotoolkit.welllog.LogCurve.prototype.getTextAnchorType = function(){};
    /**
     * Sets text formatter to be used to convert values to texts
     *
     * @param {function()} textFormatter formatter to be used to convert values to texts
     * @throws {Error} if textFormatter is not a function
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setTextFormatter = function(textFormatter){};
    /**
     * Returns text formatter to be used to convert values to texts
     *
     * @returns {function()}
     */
    geotoolkit.welllog.LogCurve.prototype.getTextFormatter = function(){};
    /**
     * Sets text reference.
     * Accepted values: 'track' or 'sample'.
     *
     * @param {string} textReference sets textreference 'track' or 'sample'.
     * @throws {Error} if textReference is neither 'track' nor 'sample'.
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setTextReference = function(textReference){};
    /**
     * Enable / disable automatic text alignment for text values, which intersects border of the track
     * If it is enabled text is shifted inside the track. By default it is false
     *
     * @param {boolean} enabled enable automatic text alignment
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setTextAutoAlignment = function(enabled){};
    /**
     * Gets status if automatic text alignment is enabled for text values which intersect border of the track
     *
     * @returns {boolean} enable enable automatic text alignment
     */
    geotoolkit.welllog.LogCurve.prototype.getTextAutoAlignment = function(){};
    /**
     * Gets sample's text reference type: 'track' or 'sample'
     *
     * @returns {string}
     */
    geotoolkit.welllog.LogCurve.prototype.getTextReference = function(){};
    /**
     * Sets text decimation step
     *
     * @param {number} step range to skip while decimating
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurve.prototype.setTextDecimationStep = function(step){};
    /**
     * Returns text decimation step
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogCurve.prototype.getTextDecimationStep = function(){};
    /**
     * Returns clone of the object
     * @returns {geotoolkit.welllog.LogCurve} clone
     */
    geotoolkit.welllog.LogCurve.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogCurve.prototype.getProperties = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.LogCurve.prototype.dispose = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {?string} [properties.description] The node description
     * @param {geotoolkit.attributes.LineStyle | string | object} [properties.barlinestyle] value-bar line style
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.textstyle] text style
     * @param {boolean} [properties.logscale] logarithmic scale on or off
     * @param {string} [properties.textreference] type of the text to be put on the track
     * @param {geotoolkit.util.AbstractUnit|string} [properties.displayunit] display unit
     * @param {array|string} [properties.displaymode] display mode like 'line' , 'symbol'
     * @param {geotoolkit.welllog.LogCurve.LimitsType} [properties.limitstype] limits type
     * @param {geotoolkit.data.DataStepInterpolation.InterpolationType|string} [properties.interpolationType] interpolation type
     * @param {boolean} [properties.centeronzeroonnegativemin] flag set to center the limits
     * @param {geotoolkit.scene.shapes.Symbol} [properties.symbol] symbol to be used
     * @param {geotoolkit.scene.shapes.Symbol} [properties.nullvaluesymbol] null value symbol
     * @param {boolean} [properties.nullvaluesymbolvisible] flag to change visibility of null value symbol
     * @param {number} [properties.symboldecimationstep] symbol decimation step or level
     * @param {number} [properties.maxwraps] maximum count of wraps (by default 5)
     * @param {boolean} [properties.wrapping] flag to enable wrapping based on if you want to see the clipped part of the track or not
     * @param {number} [properties.textdecimationstep] text decimation step
     * @param {geotoolkit.welllog.attributes.LogGradientStyle} [properties.gradientLineStyle] style
     * @param {object} [properties.gapfillcutoff] an object containing cutoff options
     * @param {number} [properties.gapfillcutoff.value] The cutoff value. When non zero and a matching unit is set
     * @param {geotoolkit.util.AbstractUnit|string} [properties.gapfillcutoff.unit] unit The unit or unit symbol to use for the gap fill cutoff
     * @param {geotoolkit.welllog.LogCurve} [properties.referenceCurve] reference curve
     * @param {number} [properties.microposleft] micropos left (between 0-1)
     * @param {number} [properties.microposright] micropos right (between 0-1)
     * @param {boolean} [properties.outofrangevalues] outofrangevalues flag
     * @param {object|boolean} [properties.optimization] optimization flags
     * @param {boolean} [properties.optimization.curve] curve optimization flag
     * @param {boolean} [properties.optimization.bar] bar optimization flag
     * @param {boolean} [properties.optimization.symbol] symbol optimization flag
     * @param {boolean} [properties.optimization.value] value optimization flag
     * @returns {geotoolkit.welllog.LogCurve} this
     */
    geotoolkit.welllog.LogCurve.prototype.setProperties = function(properties){};

/**
 * Define visual to display accumulation cycles
 * @class geotoolkit.welllog.AccumulationCycle
 * @augments geotoolkit.welllog.LogAbstractVisual
 * @param {geotoolkit.welllog.data.AccumulationCycleData} [data = null] data source to be displayed
 */
geotoolkit.welllog.AccumulationCycle = {};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} inputContext Rendering Context
     */
    geotoolkit.welllog.AccumulationCycle.prototype.render = function(inputContext){};
    /**
     * Returns Data
     *
     * @returns {geotoolkit.welllog.data.AccumulationCycleData}
     */
    geotoolkit.welllog.AccumulationCycle.prototype.getDataSource = function(){};
    /**
     * Sets data source to be displayed.
     *
     * @param {geotoolkit.welllog.data.AccumulationCycleData} data data to display
     * @returns {geotoolkit.welllog.AccumulationCycle} this
     */
    geotoolkit.welllog.AccumulationCycle.prototype.setData = function(data){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.AccumulationCycle.prototype.getProperties = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.AccumulationCycle.prototype.dispose = function(){};
    /**
     * Synchronize state from data
     * @param {geotoolkit.util.Rect} [rect = null] optional area to invalidate track
     * @returns {geotoolkit.welllog.AccumulationCycle} this
     */
    geotoolkit.welllog.AccumulationCycle.prototype.updateFromData = function(rect){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.welllog.AccumulationCycle} this
     */
    geotoolkit.welllog.AccumulationCycle.prototype.setProperties = function(properties){};

/**
 * Creates a tick curve. Data is passed in LogData.
 *
 * @class geotoolkit.welllog.TickCurve
 * @augments geotoolkit.welllog.LogPointSet
 * @param {geotoolkit.welllog.data.LogAbstractData} [data] data source to be displayed
 * @param {array.<object>} [categories] An array of objects which contain the different categories
 * @param {string} [categories.key] key of the category
 * @param {number} [categories.length] length of the category
 * @param {geotoolkit.attributes.LineStyle | string | object} [categories.linestyle] linestyle for the tick
 * @param {geotoolkit.attributes.TextStyle | string | object} [categories.textstyle] textstyle for the tick
 * @param {function()} [categoryCallback] A function which accepts parameters: index, depth and value
 * and returns a string, which corresponds to a category key
 * @param {boolean} [autoUpdate = false] autoUpdate automatic update from data
 *
 * @example
 * The three default categories
 * [
 * {
 * 'key': 'Major',
 * 'length': 15,
 * 'linestyle': new geotoolkit.attributes.LineStyle({'color':'red', 'width': 1}),
 * 'textstyle': new geotoolkit.attributes.TextStyle({'color':'red', 'font': 'normal 11px Arial'})
 * },
 * {
 * 'key': 'Medium',
 * 'length': 10,
 * 'linestyle': new geotoolkit.attributes.LineStyle({'color':'green', 'width': 1}),
 * 'textstyle': new geotoolkit.attributes.TextStyle({'color':'green', 'font': 'normal 11px Arial'})
 * },
 * {
 * 'key': 'Minor',
 * 'length': 5,
 * 'linestyle': new geotoolkit.attributes.LineStyle({'color':'blue', 'width': 1}),
 * 'textstyle': new geotoolkit.attributes.TextStyle({'color':'blue', 'font': 'normal 11px Arial'})
 * }
 * ];
 * The default category callback
 * function(index, depth, value){
 * var onethird = (this.getDataSource().getMaxValue()-this.getDataSource().getMinValue())/3;
 * if(value < onethird)
 * return 'Minor';
 * else if(value < onethird*2)
 * return 'Medium';
 * else if(value <= onethird*3)
 * return 'Major';
 * };
 */
geotoolkit.welllog.TickCurve = {};
    /**
     * Sets data source to be displayed.
     *
     * @param {geotoolkit.welllog.data.LogAbstractData} data data to display
     * @param {boolean} [autoUpdate = false] automatic update from data source
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setData = function(data, autoUpdate){};
    /**
     * Synchronize state from data
     * @param {geotoolkit.util.Rect} [rect = null] optional area to invalidate track
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.updateFromData = function(rect){};
    /**
     * Returns WellLog Data
     *
     * @returns {geotoolkit.welllog.data.LogAbstractData}
     */
    geotoolkit.welllog.TickCurve.prototype.getDataSource = function(){};
    /**
     * Returns original data value limits
     *
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.TickCurve.prototype.getValueDataLimits = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.TickCurve.prototype.getModelLimits = function(){};
    /**
     * Set category callback, sets the callback function to determine the category
     * of an (index, depth, value) combination
     * @param {function()} value A function which accepts parameters: index, depth and value
     * and returns a string, which corresponds to a category key
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setCategoryCallback = function(value){};
    /**
     * Sets categories
     * @param {array.<object>} [categories] An array of JSON objects which contain the different categories
     * @param {string} [categories.key] unique key for category
     * @param {number} [categories.length] length of the category
     * @param {geotoolkit.attributes.LineStyle | string | object} [categories.linestyle] linestyle for the tick
     * @param {geotoolkit.attributes.TextStyle | string | object} [categories.textstyle] textstyle for the tick
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setCategories = function(categories){};
    /**
     * Get category by key
     * @param {string} key unique key for category
     * @returns {object|null}
     */
    geotoolkit.welllog.TickCurve.prototype.getCategory = function(key){};
    /**
     * Removes a category by key
     * @param {string} key category style like major,medium,minor.
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.removeCategory = function(key){};
    /**
     * Adds a new category or replaces an existing one with the same key
     * @param {string} key unique key for category
     * @param {number} length line length
     * @param {geotoolkit.attributes.LineStyle | string | object} linestyle line style
     * @param {geotoolkit.attributes.TextStyle | string | object} textstyle text style for the tick
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.addCategory = function(key, length, linestyle, textstyle){};
    /**
     * Gets the array of categories
     * @returns {object}
     */
    geotoolkit.welllog.TickCurve.prototype.getCategories = function(){};
    /**
     * Returns display mode
     * (any combination of values: "line", "symbol", "value"; or an empty array)
     *
     * @returns {Array.<string>}
     */
    geotoolkit.welllog.TickCurve.prototype.getDisplayMode = function(){};
    /**
     * Sets display mode
     *
     * @param {array|string} t
     * in the new version, an array with a combination of values: "line", "value"; or an empty array.
     * In the old version, a string: "line", "both" or "none"
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setDisplayMode = function(t){};
    /**
     * Helper method to setup line visibility
     *
     * @param {boolean} enable set visibility of line
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setVisibleLine = function(enable){};
    /**
     * Returns true if line is visible (convenience method)
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.TickCurve.prototype.isVisibleLine = function(){};
    /**
     * Helper method to set up values visibility.
     *
     * @param {boolean} enable sets up values visibility
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setVisibleValue = function(enable){};
    /**
     * Returns true if values are visible (convenience method)
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.TickCurve.prototype.isVisibleValue = function(){};
    /**
     * Enables or disables adjusting of anchor for first and last text value
     * @param {boolean} value Enables or disables adjusting of anchor for first and last text value
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setAdjustTopAndBottomTextAnchor = function(value){};
    /**
     * Gets flag for adjusting anchor of first and last text
     * @returns {boolean}
     */
    geotoolkit.welllog.TickCurve.prototype.isAdjustTopAndBottomTextAnchor = function(){};
    /**
     * Set text margin/distance from line in pixels
     * @param {number} value in device space(pixels)
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setTextMargin = function(value){};
    /**
     * Gets the text margin
     * @returns {number} text margin
     */
    geotoolkit.welllog.TickCurve.prototype.getTextMargin = function(){};
    /**
     * Helper method to set direction of tick lines
     * @param {boolean} enable set direction of tick lines
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setTicksReversed = function(enable){};
    /**
     * Returns true if tick direction is reversed
     * @returns {boolean}
     */
    geotoolkit.welllog.TickCurve.prototype.isTicksReversed = function(){};
    /**
     * Sets the position of the reference line for the ticks
     * @param {number} val Number between 0 and 1
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setReferenceLinePosition = function(val){};
    /**
     * Returns the reference line position
     * @returns {number}
     */
    geotoolkit.welllog.TickCurve.prototype.getReferenceLinePosition = function(){};
    /**
     * Sets the position of the text in relation to the ticks
     * 'true' sets the position near the start of the tick line
     * 'false' sets the position near the end of the tick line
     * @param {boolean} val sets position of the text in relation to the tick
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setTextOpposite = function(val){};
    /**
     * Returns true if text if positioned at the start of the tick
     * @returns {boolean}
     */
    geotoolkit.welllog.TickCurve.prototype.isTextOpposite = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.TickCurve.prototype.render = function(){};
    /**
     * Sets text anchor type, only the 'top', 'bottom' and 'center' (vertical)
     * component of the anchor is used
     *
     * @param {geotoolkit.util.AnchorType} anchorType position to display the tick
     * @throws {Error} if anchorType value is not valid
     * @returns {geotoolkit.welllog.TickCurve}
     */
    geotoolkit.welllog.TickCurve.prototype.setTextAnchorType = function(anchorType){};
    /**
     * Gets text anchor type
     *
     * @returns {geotoolkit.util.AnchorType} type anchor type
     */
    geotoolkit.welllog.TickCurve.prototype.getTextAnchorType = function(){};
    /**
     * Sets text formatter to be used to convert values to texts
     *
     * @param {function()} textFormatter text formatter to be used to convert values to texts
     * @throws {Error} if textFormatter is not a function
     * @returns {geotoolkit.welllog.TickCurve} this
     */
    geotoolkit.welllog.TickCurve.prototype.setTextFormatter = function(textFormatter){};
    /**
     * Returns text formatter to be used to convert values to texts
     *
     * @returns {function()}
     */
    geotoolkit.welllog.TickCurve.prototype.getTextFormatter = function(){};
    /**
     * Sets text decimation step
     *
     * @param {number} step text decimation step or level
     * @returns {geotoolkit.welllog.TickCurve}
     */
    geotoolkit.welllog.TickCurve.prototype.setTextDecimationStep = function(step){};
    /**
     * Returns text decimation step
     *
     * @returns {number}
     */
    geotoolkit.welllog.TickCurve.prototype.getTextDecimationStep = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.TickCurve.prototype.getProperties = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.TickCurve.prototype.dispose = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {array|string} [properties.displaymode] an array with a combination of values: "line", "value"; or an empty array.
     * @param {number} [properties.textdecimationstep] text decimation step or level
     * @param {boolean} [properties.textopposite] sets position of the text in relation to the tick
     * @param {boolean} [properties.ticksreversed] set direction of tick lines
     * @param {number} [properties.textmargin] in device space(pixels)
     * @param {object} [properties.categories] an object containing categories see {@link geotoolkit.welllog.TickCurve#setCategories}
     * @returns {geotoolkit.welllog.TickCurve}
     */
    geotoolkit.welllog.TickCurve.prototype.setProperties = function(properties){};

/**
 * Creates a LogBar visual. Data is passed in an LogData.
 *
 * @class geotoolkit.welllog.LogBarVisual
 * @augments geotoolkit.welllog.LogPointSet
 * @param {object} options The log bar visual options object.
 * @param {geotoolkit.welllog.data.LogAbstractData} [options.data = null] data source to be displayed
 * @param {boolean} [options.autoUpdate = false] Whether to automatically update from data
 * @param {number} [options.barSpacing = 10] The amount of space between adjacent bars
 * @param {number|array<number>} [options.barWidth = 10] The width of each bar
 * @param {geotoolkit.util.AbstractUnit} [options.unitType = ft] The type of unit for bar width and bar spacing.
 * @param {geotoolkit.attributes.LineStyle|string|object} [options.lineStyle = null] The line style.
 * @param {geotoolkit.attributes.FillStyle|string|object} [options.fillStyle = null] The fill style.
 * @param {boolean} [options.enableAutoLimits = true] Whether the limits should be automatically calculated
 * @param {geotoolkit.util.Range}[options.limits = null] The value limits that should be used if autoLimits is disabled
 */
geotoolkit.welllog.LogBarVisual = {};
    /**
     * Gets the flag which indicates whether auto value limits are enabled.
     * @returns {boolean}enableAutoLimits The autoLimits flag.
     */
    geotoolkit.welllog.LogBarVisual.prototype.getEnableAutoLimits = function(){};
    /**
     * Sets the flag which indicates whether auto value limits are enabled.
     * @param {boolean} enableAutoLimits The autoLimits flag.
     * @returns {geotoolkit.welllog.LogBarVisual}
     */
    geotoolkit.welllog.LogBarVisual.prototype.setEnableAutoLimits = function(enableAutoLimits){};
    /**
     * Gets the value limits
     * @returns {geotoolkit.util.Range}limits The manual limits.
     */
    geotoolkit.welllog.LogBarVisual.prototype.getLimits = function(){};
    /**
     * Sets the manual value limits
     * @param {geotoolkit.util.Range} limits The value limits.
     * @returns {geotoolkit.welllog.LogBarVisual}
     */
    geotoolkit.welllog.LogBarVisual.prototype.setLimits = function(limits){};
    /**
     * Sets data source to be displayed.
     * @param {geotoolkit.welllog.data.LogAbstractData|Array<geotoolkit.welllog.data.LogAbstractData>} data data to display
     * @param {boolean} [autoUpdate = false] automatic update from data source
     * @returns {geotoolkit.welllog.LogBarVisual}
     */
    geotoolkit.welllog.LogBarVisual.prototype.setData = function(data, autoUpdate){};
    /**
     * Returns WellLog Data
     * @returns {geotoolkit.welllog.data.LogAbstractData}
     */
    geotoolkit.welllog.LogBarVisual.prototype.getDataSource = function(){};
    /**
     * Returns true if logarithmic mode is enabled
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogBarVisual.prototype.isLogarithmicScale = function(){};
    /**
     * Sets logarithmic mode
     *
     * @param {boolean} enable defines state of logarithmic mode
     * @returns {geotoolkit.welllog.LogBarVisual}
     */
    geotoolkit.welllog.LogBarVisual.prototype.setLogarithmicScale = function(enable){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.LogBarVisual.prototype.getScaledData = function(){};
    /**
     * Sets the amount of space between adjacent bars.
     * @param {number} barSpacing The amount of space between adjacent bars.
     * @returns {geotoolkit.welllog.LogBarVisual}
     */
    geotoolkit.welllog.LogBarVisual.prototype.setBarSpacing = function(barSpacing){};
    /**
     * Gets the amount of space between adjacent bars.
     * @returns {number}barSpacing The amount of space between adjacent bars.
     */
    geotoolkit.welllog.LogBarVisual.prototype.getBarSpacing = function(){};
    /**
     * Sets the width of each bar
     * @param {number|array<number>} barWidth The width of each bar
     * @returns {geotoolkit.welllog.LogBarVisual}
     */
    geotoolkit.welllog.LogBarVisual.prototype.setBarWidth = function(barWidth){};
    /**
     * Gets the width of each bar.
     * @returns {number}
     */
    geotoolkit.welllog.LogBarVisual.prototype.getBarWidth = function(){};
    /**
     * Sets the depth unit
     * @param {geotoolkit.util.AbstractUnit} unit The type of unit for bar width and bar spacing.
     * @returns {geotoolkit.welllog.LogBarVisual}
     */
    geotoolkit.welllog.LogBarVisual.prototype.setUnit = function(unit){};
    /**
     * Gets the depth unit
     * @returns {geotoolkit.util.AbstractUnit} The type of unit for bar width and bar spacing.
     */
    geotoolkit.welllog.LogBarVisual.prototype.getUnit = function(){};
    /**
     * Sets fill style
     * @param {geotoolkit.attributes.FillStyle | string | object} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogBarVisual} this
     */
    geotoolkit.welllog.LogBarVisual.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Gets the fill style
     * @returns {geotoolkit.attributes.FillStyle}fillStyle The fill style
     */
    geotoolkit.welllog.LogBarVisual.prototype.getFillStyle = function(){};
    /**
     * Gets the auto update flag
     * @returns {boolean}autoUpdate Flag that determines whether to automatically update from data.
     */
    geotoolkit.welllog.LogBarVisual.prototype.getAutoUpdate = function(){};
    /**
     * Sets the auto update flag
     * @param {boolean}autoUpdate Flag that determines whether to automatically update from data.
     * @returns {geotoolkit.welllog.LogBarVisual}
     */
    geotoolkit.welllog.LogBarVisual.prototype.setAutoUpdate = function(autoUpdate){};
    /**
     * Synchronize state from data
     * @param {geotoolkit.util.Rect} [rect = null] optional area to invalidate track
     * @returns {geotoolkit.welllog.LogBarVisual}
     */
    geotoolkit.welllog.LogBarVisual.prototype.updateFromData = function(rect){};
    /**
     * Returns meaning data limits
     *
     * @param {boolean|undefined} fullLimits default value is false
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.LogBarVisual.prototype.getDataLimits = function(fullLimits){};
    /**
     * Returns original data value limits
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.LogBarVisual.prototype.getValueDataLimits = function(){};
    /**
     * Returns model limits
     * @override
     * @returns {?geotoolkit.util.Rect} model limits
     */
    geotoolkit.welllog.LogBarVisual.prototype.getModelLimits = function(){};
    /**
     * Update state
     * @override
     * @param {Array<geotoolkit.util.Rect>} [regions] optional array to return invalid rectangles
     * @returns {geotoolkit.welllog.LogBarVisual}
     */
    geotoolkit.welllog.LogBarVisual.prototype.updateState = function(regions){};
    /**
     * Perform the rendering
     * @override
     * @param {geotoolkit.renderer.RenderingContext}context Rendering Context
     */
    geotoolkit.welllog.LogBarVisual.prototype.render = function(context){};
    /**
     * Creates a clone of this LogBarVisual.
     */
    geotoolkit.welllog.LogBarVisual.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}props The object properties
     */
    geotoolkit.welllog.LogBarVisual.prototype.getProperties = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.LogBarVisual.prototype.dispose = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {boolean} [properties.autoupdate] Flag that determines whether to automatically update from data.
     * @param {number} [properties.barspacing] The amount of space between adjacent bars.
     * @param {number|array<number>} [properties.barwidth] The width of each bar
     * @param {geotoolkit.util.AbstractUnit} [properties.unit] The type of unit for bar width and bar spacing.
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.fillstyle] fill style
     * @param {boolean} [properties.enableautolimits] The autoLimits flag.
     * @param {geotoolkit.util.Range} [properties.limits] The value limits.
     * @returns {geotoolkit.welllog.LogBarVisual} this
     */
    geotoolkit.welllog.LogBarVisual.prototype.setProperties = function(properties){};

/**
 * Creates the standard representation of a discrete well log curve. Data is passed in a LogAbstractData.
 *
 * @class geotoolkit.welllog.LogDiscreteCurve
 * @augments geotoolkit.welllog.LogPointSet
 * @param {geotoolkit.welllog.data.LogAbstractData} [data] data source to be displayed
 * @param {boolean} [autoUpdate = false] automatic update from data
 * @example
 * // To set text orientation to vertical
 * discreteCurve.setTextOrientation(geotoolkit.util.Orientation.Vertical)
 */
geotoolkit.welllog.LogDiscreteCurve = {};
    /**
     * fill type
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogDiscreteCurve.FillType = {};
        /**
         * color provider
         * @type {number}
         */
        geotoolkit.welllog.LogDiscreteCurve.FillType.ColorProvider = NaN;
        /**
         * discrete
         * @type {number}
         */
        geotoolkit.welllog.LogDiscreteCurve.FillType.Discrete = NaN;
        /**
         * continuous
         * @type {number}
         */
        geotoolkit.welllog.LogDiscreteCurve.FillType.Continuous = NaN;
    /**
     * Sets data source to be displayed
     *
     * @param {geotoolkit.welllog.data.LogAbstractData} data data to display
     * @param {boolean} [autoUpdate = false] automatic update from data source
     * @returns {geotoolkit.welllog.LogDiscreteCurve} this
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.setData = function(data, autoUpdate){};
    /**
     * Sets fill mode
     *
     * @param {geotoolkit.welllog.LogDiscreteCurve.FillType} type
     * data mode or fill type
     * @param {function()} [mappingFunc]
     * a mapping function to adjust native values
     * @returns {geotoolkit.welllog.LogDiscreteCurve} this
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.setFillType = function(type, mappingFunc){};
    /**
     * Returns fill type
     *
     * @returns {geotoolkit.welllog.LogDiscreteCurve.FillType}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getFillType = function(){};
    /**
     * Returns unique categories
     *
     * @returns {Array<number>}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getCategories = function(){};
    /**
     * Sets fill info. Each code has an associated pair of values and a fill style
     *
     * @param {object} fillInfo An object contains a gradient color provider with type ColorProvider, or fill information for other types.
     * @param {geotoolkit.welllog.LogDiscreteCurve.FillType} fillInfo.type the Fill type
     * @param {Array<number>} [fillInfo.codes] code value for each section
     * @param {Array<number>} [fillInfo.ranges] range to color or fill
     * @param {Array<string>} [fillInfo.names] fill name for the section
     * @param {Array<geotoolkit.attributes.FillStyle|object|string>} [fillInfo.fillstyles] the fill style
     * @param {geotoolkit.util.DiscreteGradientColorProvider} [fillInfo.colorprovider] the color provider
     * @param {geotoolkit.attributes.FillStyle | string | object} [fillInfo.defaultfillstyle] the default fill style for uncovered values
     * @returns {geotoolkit.welllog.LogDiscreteCurve} this
     *
     * @example
     * // options ['ranges'], ['names'] and ['fillstyles'] describes header content and the way we fill discrete curve.
     * // It doesn't matter how many values or sections data source has, user can specify ranges and it will be in the header even if datasource does not have such values.
     * var discreteCurve = new geotoolkit.welllog.LogDiscreteCurve(datasource)
     * .setFillInfo({
     * 'type': geotoolkit.welllog.LogDiscreteCurve.FillType.Continuous,
     * 'ranges': [
     * [1, 3],
     * [3, 5],
     * [5, 7],
     * [7, 8],
     * [12, 14] //all values in data source is less than 8
     * ],
     * 'names': ['Chert', 'Limestone', 'Shale', 'Salt', '12-14'],
     * 'fillstyles': [
     * new geotoolkit.attributes.FillStyle(Helpers.getColor('green'), patterns.queryPattern('chert'), Helpers.getColor('gray')),
     * new geotoolkit.attributes.FillStyle(Helpers.getColor('yellow'), patterns.queryPattern('lime'), Helpers.getColor('gray')),
     * new geotoolkit.attributes.FillStyle(Helpers.getColor('orange'), patterns.queryPattern('shale'), Helpers.getColor('gray')),
     * new geotoolkit.attributes.FillStyle(Helpers.getColor('blue'), patterns.queryPattern('salt'), Helpers.getColor('gray')),
     * new geotoolkit.attributes.FillStyle('red') //however we see this red square in header because we specify it
     * ]
     * });
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.setFillInfo = function(fillInfo){};
    /**
     * Returns code info
     *
     * @returns {object} codeInfo An object contains an array of Number codes, an array of a two-member array of values, and an array of FillStyles
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getFillInfo = function(){};
    /**
     * Returns welllog data
     *
     * @returns {geotoolkit.welllog.data.LogAbstractData}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getDataSource = function(){};
    /**
     * Returns minimum value
     *
     * @returns {?number}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getMinValue = function(){};
    /**
     * Returns maximum value
     *
     * @returns {?number}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getMaxValue = function(){};
    /**
     *
     * Sets line visibility
     *
     * @param {boolean} visible line visibility
     * @returns {geotoolkit.welllog.LogDiscreteCurve} this
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.setVisibleSeparateLine = function(visible){};
    /**
     * Returns line visibility
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.isVisibleSeparateLine = function(){};
    /**
     * Sets text visibility
     *
     * @param {boolean} visible sets the visibility of the text along the track for each block on or off
     * @returns {geotoolkit.welllog.LogDiscreteCurve} this
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.setVisibleText = function(visible){};
    /**
     * Returns text visibility
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.isVisibleText = function(){};
    /**
     * Sets display mode
     *
     * @param {array<string>|string} mode an array with a combination of values: "line" and "text"
     * @returns {geotoolkit.welllog.LogDiscreteCurve} this
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.setDisplayMode = function(mode){};
    /**
     * Returns display mode
     * (any combination of values: "line" and "text", or an empty array)
     *
     * @returns {array<string>}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getDisplayMode = function(){};
    /**
     * Sets text style
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogDiscreteCurve} this
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * Returns text style
     *
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getTextStyle = function(){};
    /**
     * Sets text position
     *
     * @param {geotoolkit.util.AnchorType} position position of the text
     * @returns {geotoolkit.welllog.LogDiscreteCurve} this
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.setTextPosition = function(position){};
    /**
     * Returns text position
     *
     * @returns {geotoolkit.util.AnchorType}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getTextPosition = function(){};
    /**
     * @override
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getModelLimits = function(){};
    /**
     * Returns text orientation
     *
     * @returns {geotoolkit.util.Orientation}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getTextOrientation = function(){};
    /**
     * Sets text orientation
     *
     * @param {geotoolkit.util.Orientation} orientation orientation of the text
     * @returns {geotoolkit.welllog.LogDiscreteCurve} this
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.setTextOrientation = function(orientation){};
    /**
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.render = function(context){};
    /**
     * @override
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getDataLimits = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     *
     * @param {object} properties An object containing the properties to set
     * @param {array<string>|string} [properties.displaymode] an array with a combination of values: "line" and "text"
     * @param {object} [properties.fillinfo] see setFillInfo
     * @param {geotoolkit.welllog.LogDiscreteCurve.FillType} [properties.filltype] the type of the filling
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.textstyle] the text style
     * @param {geotoolkit.util.AnchorType} [properties.textposition] position of the text
     * @param {geotoolkit.data.DataStepInterpolation.InterpolationType} [properties.interpolationtype] the type of the interpolation
     * @param {geotoolkit.util.Orientation} [properties.textorientation] orientation of the text
     * @returns {geotoolkit.welllog.LogDiscreteCurve} this
     */
    geotoolkit.welllog.LogDiscreteCurve.prototype.setProperties = function(properties){};

/**
 * Creates a logtadpole using the dataobject that contains a datasource for the depth and dip values {@link geotoolkit.welllog.data.LogData} and symbols{@link geotoolkit.welllog.TadPoleSymbol}.<br>
 * It also contains arrays for symbol types (string), symbol fillStyle (geotoolkit.attributes.FillStyle) and lineStyle (geotoolkit.attributes.LineStyle).<br>
 * Finally it contains arrays for ticks azimuths (arrays of number), lengths (arrays of number) and lineStyles (arrays of geotoolkit.attributes.LineStyle)
 * A tadpole is associated with one or several ticks and defined by a depth, a dip, and a TadpoleSymbol. <br>
 * User has to first create a track and then add LogTadPole to it. see example below.
 *
 * @class geotoolkit.welllog.LogTadPole
 * @param {object|geotoolkit.welllog.data.LogData} datasource
 * @param {geotoolkit.welllog.data.LogData} datasource.datasource data source to be displayed
 * @param {Array<geotoolkit.welllog.TadPoleSymbol>} [datasource.symbols=[]] symbols to be displayed
 * @param {Array<geotoolkit.welllog.TadPoleSymbol>} [symbols=[]] symbols to be displayed
 * @augments geotoolkit.welllog.LogCurve
 * @example
 * //add linear track
 * var linearTrack = widget.insertTrack(geotoolkit.welllog.widgets.TrackType.LinearTrack, 1, 300);
 * //create data from a datasource
 * var data = createTestDatasourceAndSymbols();
 * // create the LogTadPole and add it to the track
 * var tadpole = new geotoolkit.welllog.LogTadPole(data);
 * tadpole.setNormalizationLimits(0, 90);
 * linearTrack.addChild(tadpole);
 *
 */
geotoolkit.welllog.LogTadPole = {};
    /**
     * Draw symbols
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @param {geotoolkit.util.Transformation} tr transformation
     * @param {geotoolkit.util.Rect} deviceRect invalid area
     */
    geotoolkit.welllog.LogTadPole.prototype.drawSymbols = function(context, tr, deviceRect){};

/**
 * Creates a tadpole, which is a symbol associated with one or several ticks.
 *
 * @class geotoolkit.welllog.TadPoleSymbol
 * @augments geotoolkit.scene.shapes.Symbol
 * @param {number} ax anchor x position
 * @param {number} ay anchor y position
 * @param {number} width symbol width
 * @param {number} height symbol height
 * @param {geotoolkit.util.AnchorType} [alignment] anchor type of symbol
 * @param {number} [sizeIsInDeviceSpace] flag to indicate if size of the symbol in device
 * @param {geotoolkit.scene.shapes.Symbol} centerSymbol center symbol to be used
 * @param {Array} legs line element associated with the tadpole symbol.
 */
geotoolkit.welllog.TadPoleSymbol = {};
    /**
     * Specify rotations angle
     * @param {number} angle angle
     * @returns {geotoolkit.welllog.TadPoleSymbol}
     */
    geotoolkit.welllog.TadPoleSymbol.prototype.setAngle = function(angle){};
    /**
     * Return rotation angle
     * @returns {number}
     */
    geotoolkit.welllog.TadPoleSymbol.prototype.getAngle = function(){};
    /**
     * Set symbol
     * @param {geotoolkit.scene.shapes.Symbol} centerSymbol center symbol to be used
     * @returns {geotoolkit.welllog.TadPoleSymbol}
     */
    geotoolkit.welllog.TadPoleSymbol.prototype.setSymbol = function(centerSymbol){};
    /**
     * Set Legs
     * @param {Array} legs line element associated with the symbol
     * @returns {geotoolkit.welllog.TadPoleSymbol}
     */
    geotoolkit.welllog.TadPoleSymbol.prototype.setLegs = function(legs){};
    /**
     * Get symbol
     * @returns {geotoolkit.scene.shapes.Symbol} symbol
     */
    geotoolkit.welllog.TadPoleSymbol.prototype.getSymbol = function(){};
    /**
     * Get Legs
     * @returns {Array} legs
     */
    geotoolkit.welllog.TadPoleSymbol.prototype.getLegs = function(){};
    /**
     * Add Leg
     * @param {number} angle in [0-2PI]
     * @param {number} length length of the leg
     * @param {geotoolkit.attributes.LineStyle | string | object} [linestyle='black'] line style of the leg
     * @returns {geotoolkit.scene.shapes.Symbol} symbol
     */
    geotoolkit.welllog.TadPoleSymbol.prototype.addLeg = function(angle, length, linestyle){};

/**
 * <p>Creates tadpole painter. A tadpole is a symbol associated with one or several ticks.</p>
 *
 * <p>The main symbol can be a circle, a square, a triangle or a diamond. You can change its fillStyle and its lineStyle.
 * Each tadpole symbol needs one (depth,dip) value to be displayed.</p>
 *
 * <p>Each tadpole symbol can have one or several ticks.
 * Each tick needs an azimuth (in degrees) and a length value.
 * Each tick can have its own color and pattern.</p>
 *
 * @class geotoolkit.scene.shapes.painters.TadpolePainter
 * @param {geotoolkit.welllog.TadPoleSymbol} symbol the parent symbol, used to set properties
 * @param {geotoolkit.util.Rect} bbox bounding box this symbolPainter should paint within
 * @param {geotoolkit.renderer.RenderingContext} context renderingContext
 **/
geotoolkit.scene.shapes.painters.TadpolePainter = {};

/**
 * Defines log gradient fill style. This fillstyle can have a color and a pattern plus data source that can be used to gradient colors.
 * If you need to set the gradient color based on the " Normalization Limits " please refer to setColorRange() method.
 *
 * @class geotoolkit.welllog.attributes.LogGradientStyle
 * @augments geotoolkit.attributes.FillStyle
 * @implements geotoolkit.attributes.IRasterable
 * @param {(string|geotoolkit.util.RgbaColor)} [color="black"] Rgba Color
 * @param {geotoolkit.attributes.ImagePattern} [pattern] fill pattern
 * @param {(string|geotoolkit.util.RgbaColor)} [foregroundcolor] Rgba Color
 */
geotoolkit.welllog.attributes.LogGradientStyle = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.welllog.attributes.LogGradientStyle} src Source to copy from
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.copyConstructor = function(src){};
    /**
     * set color range (min and max value). If you need to set the gradient color based on the " Normalization Limits " refer to the code in the example while changing normalization limits on the curve.
     * @param {geotoolkit.util.Range} range color range (min and max value)
     * @returns {geotoolkit.welllog.attributes.LogGradientStyle} this
     * @example geotoolkit.welllog.attributes.LogGradientStyle.setColorRange(new geotoolkit.util.Range(logCurve.getMinimumNormalizationLimit(), logCurve.getMaximumNormalizationLimit()));
     * @returns {geotoolkit.welllog.attributes.LogGradientStyle} this
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.setColorRange = function(range){};
    /**
     * returns color range (min and max value)
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.getColorRange = function(){};
    /**
     * Set transparency
     * @param {number} transparency value for alpha chanel
     * @returns {geotoolkit.welllog.attributes.LogGradientStyle}
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.setTransparency = function(transparency){};
    /**
     * Returns transparency
     * @returns {number} alpha chanel value
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.getTransparency = function(){};
    /**
     * return color provider
     * @returns {geotoolkit.util.ColorProvider} color provider the color provider
    
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.getColorProvider = function(){};
    /**
     * set color provider
     * @param {geotoolkit.util.ColorProvider} colorProvider the color provider
     * @returns {geotoolkit.welllog.attributes.LogGradientStyle} this
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.setColorProvider = function(colorProvider){};
    /**
     * return log data
     * @returns {geotoolkit.welllog.data.LogData} log data
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.getLogData = function(){};
    /**
     * set color provider
     * @param {geotoolkit.welllog.data.LogAbstractData} logData log data
     * @returns {geotoolkit.welllog.attributes.LogGradientStyle} this
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.setLogData = function(logData){};
    /**
     * Sets interpolation type
     *
     * @param {geotoolkit.data.DataStepInterpolation.InterpolationType|string} interpolationType interpolation type
     * @throws {Error} If interpolationType is not correct
     * @returns {geotoolkit.welllog.attributes.LogGradientStyle}
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.setInterpolationType = function(interpolationType){};
    /**
     * Returns interpolation type
     * ('Linear', 'MiddleStep', 'EndStep', 'StartStep')
     *
     * @returns {geotoolkit.data.DataStepInterpolation.InterpolationType}
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.getInterpolationType = function(){};
    /**
     * return render background state
     * @returns {boolean}
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.getRenderBackground = function(){};
    /**
     * set render background state
     * @param {boolean} renderBackground extra style parameter for background fill
     * @returns {geotoolkit.welllog.attributes.LogGradientStyle}
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.setRenderBackground = function(renderBackground){};
    /**
     * return log data id
     * @returns {string|null}
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.getLogDataId = function(){};
    /**
     * Gets all the properties pertaining to this object
     *
     * @returns {Object}
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {object|geotoolkit.util.DiscreteGradientColorProvider} [properties.colorprovider] color provider
     * @param {boolean} [properties.renderbackground] extra style parameter for background fill
     * @param {number} [properties.transparency] value for alpha chanel
     * @param {string} [properties.datasource] log data id
     * @param {geotoolkit.util.Range} [properties.colorrange] color range (min and max value)
     * @returns {geotoolkit.welllog.attributes.LogGradientStyle} this
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.setProperties = function(properties){};
    /**
     * Returns a new instance of geotoolkit.attributes.Raster
     *
     * @param {number} [xMin=0] x Min position to get color
     * @param {number} [yMin=0] y Min position to get color
     * @param {number} [xMax=0] x Max position to get color
     * @param {number} [yMax=0] y Max position to get color
     * @returns {geotoolkit.attributes.Raster}
     */
    geotoolkit.welllog.attributes.LogGradientStyle.prototype.getRaster = function(xMin, yMin, xMax, yMax){};

/**
 * LogFill class implements a fill between two LogPointSet.<br>
 * <br>
 * Those LogPointSet are generally either LogCurves or LogReferenceLine.<br>
 * The LogFill accepts 3 fillstyles, 'default', 'left' and 'right'.<br>
 * FillType can be one of the following types.<br>
 * 1) Left <br>
 * 2) Right <br>
 * 3) Left and Right(Dual left and right with different fill styles or Single which only has one fill style) please refer to the example below.
 * The given FillType will determine which fillstyles should be applied to each area in between given LogPointSet.<br>
 * If no FillType is specified the internal logic will assign the fillType based on the fillStyle.
 * It is recommended to pass both curve1 and curve2 parameters (even if the internal logic will try to fill missing parameters).<br>
 * <br>
 * @class geotoolkit.welllog.LogFill
 * @augments geotoolkit.welllog.LogPointSet
 * @param {geotoolkit.welllog.LogPointSet|object|number} [options] left points set or a JSON
 * @param {geotoolkit.welllog.LogPointSet|number} [options.curve2] right point set
 * @param {geotoolkit.attributes.FillStyle | string | object} [options.fillstyle] fillstyle
 * @param {geotoolkit.attributes.FillStyle | string | object} [options.leftfillstyle] fillstyle for left part
 * @param {geotoolkit.attributes.FillStyle | string | object} [options.rightfillstyle] fillstyle for right part
 * @param {geotoolkit.welllog.LogFill.FillType|string} [options.filltype] filltype
 * @param {geotoolkit.welllog.LogPointSet|number} [curve2] right point set
 * @param {geotoolkit.attributes.FillStyle | string | object} [fillstyle] fillstyle
 * @param {geotoolkit.attributes.FillStyle | string | object} [leftfillstyle] fillstyle for left part
 * @param {geotoolkit.attributes.FillStyle | string | object} [rightfillstyle] fillstyle for right part
 * @param {geotoolkit.welllog.LogFill.FillType|string} [filltype] filltype
 * @example
 * //Single Fill, one fill style is specified
 * var fill2 = new geotoolkit.welllog.LogFill({
 * 'curve1': orangeCurve,
 * 'curve2': redCurve,
 * 'fillstyle': new geotoolkit.attributes.FillStyle(...)
 * });
 *
 * //Dual Fill will use different fillstyles for left and right sides of orangeCurve
 * var fill = new geotoolkit.welllog.LogFill({
 * 'curve1': orangeCurve,
 * 'curve2': ..., //if not specified, will be left (default case)
 * 'leftfillstyle': new geotoolkit.attributes.FillStyle(...),
 * 'rightfillstyle': new geotoolkit.attributes.FillStyle(...),
 * 'filltype': geotoolkit.welllog.LogFill.FillType.Dual
 * }),
 */
geotoolkit.welllog.LogFill = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.welllog.LogFill} src Source to copy from
     * @returns {geotoolkit.welllog.LogFill} this
     */
    geotoolkit.welllog.LogFill.prototype.copyConstructor = function(src){};
    /**
     * Enum of FillTypes
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogFill.FillType = {};
        /**
         * Single Fill
         * @type {string}
         */
        geotoolkit.welllog.LogFill.FillType.Single = "";
        /**
         * Dual Fill
         * @type {string}
         */
        geotoolkit.welllog.LogFill.FillType.Dual = "";
        /**
         * Positive Fill
         * @type {string}
         */
        geotoolkit.welllog.LogFill.FillType.Positive = "";
        /**
         * Negative FIll
         * @type {string}
         */
        geotoolkit.welllog.LogFill.FillType.Negative = "";
        /**
         * Positive And Negative Fill
         * @type {string}
         */
        geotoolkit.welllog.LogFill.FillType.PositiveAndNegative = "";
        /**
         * Left Fill
         * @type {string}
         */
        geotoolkit.welllog.LogFill.FillType.Left = "";
        /**
         * Negative FIll
         * @type {string}
         */
        geotoolkit.welllog.LogFill.FillType.Right = "";
        /**
         * Left And Right Fill
         * @type {string}
         */
        geotoolkit.welllog.LogFill.FillType.LeftAndRight = "";
    /**
     * Sets point set to fill from
     *
     * @param {geotoolkit.welllog.LogPointSet|number} curve a point set or number to fill from
     * @returns {geotoolkit.welllog.LogFill} this
     */
    geotoolkit.welllog.LogFill.prototype.setCurve1 = function(curve){};
    /**
     * Returns a point set to fill from
     *
     * @returns {geotoolkit.welllog.LogPointSet}
     */
    geotoolkit.welllog.LogFill.prototype.getCurve1 = function(){};
    /**
     * Sets point set to fill to
     *
     * @param {geotoolkit.welllog.LogPointSet|number} curve a point set or number to fill to
     * @returns {geotoolkit.welllog.LogFill} this
     */
    geotoolkit.welllog.LogFill.prototype.setCurve2 = function(curve){};
    /**
     * Returns a point set to fill to
     *
     * @returns {geotoolkit.welllog.LogPointSet}
     */
    geotoolkit.welllog.LogFill.prototype.getCurve2 = function(){};
    /**
     * Sets fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogFill}
     */
    geotoolkit.welllog.LogFill.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Return fill style
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogFill.prototype.getFillStyle = function(){};
    /**
     * Sets negative fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogFill}
     */
    geotoolkit.welllog.LogFill.prototype.setNegativeFillStyle = function(fillStyle, merge){};
    /**
     * Sets right (negative) fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogFill}
     */
    geotoolkit.welllog.LogFill.prototype.setRightFillStyle = function(fillStyle, merge){};
    /**
     * Returns fill style to be used to fill negative areas
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogFill.prototype.getNegativeFillStyle = function(){};
    /**
     * Returns fill style to be used to fill right (negative) areas
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogFill.prototype.getRightFillStyle = function(){};
    /**
     * Sets positive fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogFill}
     */
    geotoolkit.welllog.LogFill.prototype.setPositiveFillStyle = function(fillStyle, merge){};
    /**
     * Sets left (positive) fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogFill}
     */
    geotoolkit.welllog.LogFill.prototype.setLeftFillStyle = function(fillStyle, merge){};
    /**
     * Returns fill style to be used to fill positive areas
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogFill.prototype.getPositiveFillStyle = function(){};
    /**
     * Returns fill style to be used to fill left (positive) areas
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogFill.prototype.getLeftFillStyle = function(){};
    /**
     * return meaning data limits
     *
     * @param {boolean} [fullLimits=false] default value is false
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.LogFill.prototype.getDataLimits = function(fullLimits){};
    /**
     * Gets bounds
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogFill.prototype.getBounds = function(){};
    /**
     * Gets the fill type
     *
     * @returns {geotoolkit.welllog.LogFill.FillType}
     */
    geotoolkit.welllog.LogFill.prototype.getFillType = function(){};
    /**
     * Sets the fill type
     *
     * @param {geotoolkit.welllog.LogFill.FillType|string} fillType enum of filltype
     * @returns {geotoolkit.welllog.LogFill}
     */
    geotoolkit.welllog.LogFill.prototype.setFillType = function(fillType){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogFill.prototype.render = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.LogFill.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.welllog.LogPointSet} [properties.curve1] a curve to fill from
     * @param {geotoolkit.welllog.LogPointSet} [properties.curve2] a point set to fill to
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.fillstyle] fillstyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.negativefillstyle] fill style to be used to fill negative areas
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.positivefillstyle] fill style to be used to positive areas
     * @param {geotoolkit.welllog.LogFill.FillType|string} [properties.filltype] enum of filltype
     * @returns {geotoolkit.welllog.LogFill} this
     */
    geotoolkit.welllog.LogFill.prototype.setProperties = function(properties){};

/**
 * Creates the custom representation of a well log curve with optional left and right fill. Data is passed in an LogAbstractData.
 * It uses geotoolkit.welllog.LogCurve internally. Please refer to WellLog Widget Visuals Tutorial ( Composite curve fill section) for an example.
 *
 * @class geotoolkit.welllog.CompositeLogCurve
 * @augments geotoolkit.welllog.LogCurve
 * @param {geotoolkit.welllog.data.LogAbstractData} [data = null] data source to be displayed
 * @param {boolean} [autoUpdate = false] automatic update form data
 * @example
 * // Example showing how to set single normalization limit for multiple curves before adding to single track.
 * var logCurve = new geotoolkit.welllog.CompositeLogCurve(curveData)
 * .setLineStyle({'color': color.toRgbaString(), 'width': 2})
 * .setNormalizationLimits(0, 4) // Put desired range here
 * .setId(curveData.getName());
 * track.addChild(logCurve);
 */
geotoolkit.welllog.CompositeLogCurve = {};
    /**
     * Returns clone of the object
     * @returns {geotoolkit.welllog.CompositeLogCurve} clone
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.clone = function(){};
    /**
     * @override
     * @param {string} event broadcast event
     * @param {geotoolkit.scene.Node} source who is initializing this event
     * @param {object} args additional parameter
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.notify = function(event, source, args){};
    /**
     * Return curve bounds
     * @override
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.getBounds = function(){};
    /**
     * Return left fill
     * @returns {null|geotoolkit.welllog.LogFill}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.getLeftFill = function(){};
    /**
     * Return right fill
     * @returns {null|geotoolkit.welllog.LogFill}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.getRightFill = function(){};
    /**
     * Sets reference point set
     * @returns {null|geotoolkit.welllog.LogPointSet}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.getLeftReferencePointSet = function(){};
    /**
     * returns the reference point set
     * @returns {null|geotoolkit.welllog.LogPointSet}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.getRightReferencePointSet = function(){};
    /**
     * returns the left fill type
     * @returns {string}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.getLeftFillType = function(){};
    /**
     * returns the right fill type
     * @returns {string}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.getRightFillType = function(){};
    /**
     * Sets reference point set to fill to the left
     * @param {geotoolkit.welllog.LogPointSet} reference reference point set
     * @returns {geotoolkit.welllog.CompositeLogCurve}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.setLeftReferencePointSet = function(reference){};
    /**
     * Sets reference point set to fill to the right
     * @param {geotoolkit.welllog.LogPointSet} reference reference point set
     * @returns {geotoolkit.welllog.CompositeLogCurve}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.setRightReferencePointSet = function(reference){};
    /**
     * Sets fill type
     * @param {geotoolkit.welllog.LogFill.FillType|string} type type of the fill
     * @returns {geotoolkit.welllog.CompositeLogCurve}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.setLeftFillType = function(type){};
    /**
     * Sets fill type
     * @param {geotoolkit.welllog.LogFill.FillType|string} type type of the fill
     * @returns {geotoolkit.welllog.CompositeLogCurve}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.setRightFillType = function(type){};
    /**
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.render = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.getProperties = function(){};
    /**
     * Sets left fill
     * @protected
     * @param {geotoolkit.welllog.LogFill} fill left fill
     * @returns {geotoolkit.welllog.CompositeLogCurve}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.setLeftFill = function(fill){};
    /**
     * Sets right fill
     * @protected
     * @param {geotoolkit.welllog.LogFill} fill right fill
     * @returns {geotoolkit.welllog.CompositeLogCurve}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.setRightFill = function(fill){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.welllog.LogFill} [properties.leftfill] left fill
     * @param {geotoolkit.welllog.LogFill} [properties.rightfill] right fill
     * @param {geotoolkit.welllog.LogFill.FillType|string} [properties.leftfilltype] type of the left fill
     * @param {geotoolkit.welllog.LogFill.FillType|string} [properties.rightfilltype] type of the right fill
     * @param {geotoolkit.welllog.LogPointSet} [properties.leftreferencepointset] left referencepointset point set
     * @param {geotoolkit.welllog.LogPointSet} [properties.rightreferencepointset] right referencepointset point set
     * @returns {geotoolkit.welllog.CompositeLogCurve}
     */
    geotoolkit.welllog.CompositeLogCurve.prototype.setProperties = function(properties){};

/**
 * Define frame visual with bounds
 *
 * @class geotoolkit.welllog.LogFrameVisual
 * @augments geotoolkit.welllog.LogAbstractVisual
 * @param {geotoolkit.util.Rect} bounds bounds of the visual
 */
geotoolkit.welllog.LogFrameVisual = {};
    /**
     * Enables height of the frame to be fixed in
     * the device coordinates
     *
     * @param {boolean} enable Enables height of the frame to be fixed in the device coordinates
     * @returns {geotoolkit.welllog.LogFrameVisual} this
     */
    geotoolkit.welllog.LogFrameVisual.prototype.setFixedHeight = function(enable){};
    /**
     * Returns true if height is fixed in the device coordinates
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogFrameVisual.prototype.isFixedHeight = function(){};
    /**
     * Checks culling
     * Returns true if object is inside of renderable area
     *
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean}
     */
    geotoolkit.welllog.LogFrameVisual.prototype.checkCollision = function(context){};
    /**
     * Returns calculated bounds
     *
     * @override
     * @param {geotoolkit.renderer.RenderingContext} [context=null] Rendering Context
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogFrameVisual.prototype.getBounds = function(context){};
    /**
     * Return fill style
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogFrameVisual.prototype.getFillStyle = function(){};
    /**
     * Sets fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogFrameVisual} this
     */
    geotoolkit.welllog.LogFrameVisual.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Sets rectangle geometry
     *
     * @param {geotoolkit.util.Rect} rect Sets rectangle geometry based on bounds of the visual
     * @returns {geotoolkit.welllog.LogFrameVisual} this
     */
    geotoolkit.welllog.LogFrameVisual.prototype.setRect = function(rect){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogFrameVisual.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.util.Rect} [properties.bounds] Sets rectangle geometry based on bounds of the visual
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.fillstyle] FillStyle
     * @param {boolean} [properties.fixedheight] Enables height of the frame to be fixed in the device coordinates
     * @returns {geotoolkit.welllog.LogFrameVisual} this
     */
    geotoolkit.welllog.LogFrameVisual.prototype.setProperties = function(properties){};

/**
 * Defines annotation visual.
 * It is defined by a string and a rectangle to set its bounds.
 *
 * @class geotoolkit.welllog.LogAnnotation
 * @augments geotoolkit.welllog.LogFrameVisual
 * @param {geotoolkit.util.Rect} bounds
 * bounds of the visual
 * @param {string} text the text to be displayed
 *
 */
geotoolkit.welllog.LogAnnotation = {};
    /**
     * LogAnnotation TextOrientation
     *
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogAnnotation.TextOrientation = {};
        /**
         * Regular
         * @type {string}
         */
        geotoolkit.welllog.LogAnnotation.TextOrientation.Regular = "";
        /**
         * Rotated
         * @type {string}
         */
        geotoolkit.welllog.LogAnnotation.TextOrientation.Rotated = "";
    /**
     * Sets text
     *
     * @param {string} text text to be displayed
     * @returns {geotoolkit.welllog.LogAnnotation}
     */
    geotoolkit.welllog.LogAnnotation.prototype.setText = function(text){};
    /**
     * Returns the current text
     *
     * @returns {string}
     */
    geotoolkit.welllog.LogAnnotation.prototype.getText = function(){};
    /**
     * Sets text orientation. if text orientation is regular then text follows the widgets orientation
     * if text is rotated then text is always rotated on 90 degree.
     * @param {geotoolkit.welllog.LogAnnotation.TextOrientation} orientation text orientation
     * @returns {geotoolkit.welllog.LogAnnotation}
     */
    geotoolkit.welllog.LogAnnotation.prototype.setTextOrientation = function(orientation){};
    /**
     * Return text orientation
     * @returns {geotoolkit.welllog.LogAnnotation.TextOrientation}
     */
    geotoolkit.welllog.LogAnnotation.prototype.getTextOrientation = function(){};
    /**
     * Sets text style
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogAnnotation}
     */
    geotoolkit.welllog.LogAnnotation.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * Returns text style
     *
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.LogAnnotation.prototype.getTextStyle = function(){};
    /**
     * Sets text padding
     * @param {object} [padding] It has properties for specifying the padding for each side
     * @param {number} [padding.top=0] top padding in pixels
     * @param {number} [padding.bottom=0] top padding in pixels
     * @param {number} [padding.right=0] right padding in pixels
     * @param {number} [padding.left=0] left padding in pixels
     * @returns {geotoolkit.welllog.LogAnnotation}
     */
    geotoolkit.welllog.LogAnnotation.prototype.setPadding = function(padding){};
    /**
     * Return text padding
     * @returns {object} padding properties for specifying the text padding for each side
     * @returns {number} padding.top top padding in pixels
     * @returns {number} padding.bottom top padding in pixels
     * @returns {number} padding.right right padding in pixels
     * @returns {number} padding.left left padding in pixels
     */
    geotoolkit.welllog.LogAnnotation.prototype.getPadding = function(){};
    /**
     * Set auto height flag
     * @param {boolean} enable flag
     * @returns {geotoolkit.welllog.LogAnnotation} this
     */
    geotoolkit.welllog.LogAnnotation.prototype.setAutoHeight = function(enable){};
    /**
     * Returns auto height flag
     * @returns {boolean}
     */
    geotoolkit.welllog.LogAnnotation.prototype.getAutoHeight = function(){};
    /**
     * Sets how text size is computed
     * @param {geotoolkit.scene.shapes.Text.SizeMode|string} textSizeMode Enum of size modes
     * @returns {geotoolkit.welllog.LogAnnotation} this
     */
    geotoolkit.welllog.LogAnnotation.prototype.setTextSizeMode = function(textSizeMode){};
    /**
     * Returns how the size is computed
     * @returns {geotoolkit.scene.shapes.Text.SizeMode|string} returns textSizeMode
     */
    geotoolkit.welllog.LogAnnotation.prototype.getTextSizeMode = function(){};
    /**
     * Set show ellipsis
     * @param {boolean} showTextEllipsis
     * @returns {geotoolkit.welllog.LogAnnotation} this
     */
    geotoolkit.welllog.LogAnnotation.prototype.setShowEllipsis = function(showTextEllipsis){};
    /**
     * Returns ellipsis flag
     * @returns {boolean} ellipsis flag
     */
    geotoolkit.welllog.LogAnnotation.prototype.getShowEllipsis = function(){};
    /**
     * Returns calculated bounds
     *
     * @override
     * @param {geotoolkit.renderer.RenderingContext} [context=null] Rendering Context
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogAnnotation.prototype.getBounds = function(context){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {geotoolkit.welllog.LogAnnotation} this
     */
    geotoolkit.welllog.LogAnnotation.prototype.render = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogAnnotation.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {string} [properties.text] text to be displayed
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.textstyle] the style of the text
     * @param {geotoolkit.scene.shapes.Text.SizeMode|string} [properties.textsizemode] Enum of size modes
     * @param {boolean} [properties.textellipsis] text ellipsis
     * @param {geotoolkit.welllog.LogAnnotation.TextOrientation} [properties.textorientation] text orientation
     * @param {object} [properties.padding] It has properties for specifying the padding for each side see {@link geotoolkit.welllog.LogAnnotation#setPadding}
     * @param {boolean} [properties.autoheight] auto height flag
     * @returns {geotoolkit.welllog.LogAnnotation} this
     */
    geotoolkit.welllog.LogAnnotation.prototype.setProperties = function(properties){};

/**
 * Create a log label (LogAnnotation)
 *
 * @class geotoolkit.welllog.LogLabel
 * @deprecated since 2.6
 * @augments geotoolkit.welllog.LogAnnotation
 * @param {geotoolkit.util.Rect} bounds bounds of the visual
 * @param {string} text text
 */
geotoolkit.welllog.LogLabel = {};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogLabel.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.welllog.LogLabel} this
     */
    geotoolkit.welllog.LogLabel.prototype.setProperties = function(properties){};

/**
 * Welllog Lithology is a visual that fills a pattern between a set of depth ranges and two reference lines defined by {@link geotoolkit.welllog.LogPointSet}<br>
 * Users can define their own patterns for lithology fills.
 *
 * @class geotoolkit.welllog.LogLithology
 * @augments geotoolkit.welllog.LogFill
 * @param {Array.<number>} [depths] an array of the depths
 * @param {array|object} [depths.depths] an array of the depths
 * @param {geotoolkit.welllog.LogPointSet} [depths.left] left points set
 * @param {geotoolkit.welllog.LogPointSet} [depths.right] right point set
 * @param {array.<geotoolkit.attributes.FillStyle>} [depths.fillstyles] fill styles
 * @param {string} [depths.text] name of the lithology
 * @param {array.<string>} [depths.names] array of the names
 * @param {array.<string>} [depths.titles] array for the header titles
 * @param {array.<geotoolkit.welllog.LogLithology.LineType>} [depths.linetypes] array for the line type
 * @param {geotoolkit.welllog.LogLithology.LabelFillMode} [depths.labelfillmode] mode for how to back the name text
 * @param {geotoolkit.attributes.FillStyle | string | object} [depths.labelfillstyle] label fill style used if mode is set to SINGLECOLOR
 * @param {geotoolkit.welllog.LogLithology.NameOrientation} [depths.nameorientation=geotoolkit.welllog.LogLithology.NameOrientation.Regular] lithology name orientation
 * @param {boolean} [depths.textellipsis=true] ellipsis flag
 * @param {geotoolkit.scene.shapes.Text.SizeMode|string} [depths.textsizemode=geotoolkit.scene.shapes.Text.SizeMode.WrappedWidth] Enum of size modes
 * @param {geotoolkit.welllog.LogPointSet} [curve1] left points set
 * @param {geotoolkit.welllog.LogPointSet} [curve2] right point set
 * @param {array.<geotoolkit.attributes.FillStyle | string | object>} [fillstyles] fill styles
 * @param {array.<string>} [names] array of the names
 * @param {array.<string>} [titles] array for the header titles
 * @param {geotoolkit.attributes.FillStyle | string | object} [labelfillstyle] label fill style used if mode is set to SINGLECOLOR
 * @param {geotoolkit.welllog.LogLithology.LabelFillMode} [labelfillmode] mode for how to back the name text
 * @param {geotoolkit.welllog.LogLithology.NameOrientation} [nameorientation=geotoolkit.welllog.LogLithology.NameOrientation.Regular] lithology name orientation
 * @example
 * // This example shows how to create discontinuous range in lithology
 * function simpleLithology (datasource) {
 *
 * var widget = createBasicWellLogWidget(); // create basic Welllog widget
 * widget.addTrack(geotoolkit.welllog.TrackType.IndexTrack);
 *
 * var linearTrack = widget.addTrack(geotoolkit.welllog.TrackType.LinearTrack);
 * var depths = [128, 200, NaN, 320, 360];
 *
 * var patterns = geotoolkit.attributes.ImageContainer.getContainer('patterns');
 *
 * var headerTitles = ['chert', 'lime'];
 *
 * var fillStyles = [
 * new geotoolkit.attributes.FillStyle(Helpers.getColor('green'), patterns.queryPattern(headerTitles[0]), 'lightgreen'),
 * new geotoolkit.attributes.FillStyle(Helpers.getColor('yellow'), patterns.queryPattern(headerTitles[1]))
 * ];
 *
 * var lithology = new geotoolkit.welllog.LogLithology({
 * 'depths': depths,
 * 'fillstyles': fillStyles,
 * 'titles': headerTitles
 * });
 * linearTrack.addChild(lithology);
 * widget.addTrack(geotoolkit.welllog.TrackType.IndexTrack);
 *
 * return widget;
 * }
 */
geotoolkit.welllog.LogLithology = {};
    /**
     * LogLithology LineType
     *
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogLithology.LineType = {};
        /**
         * CONTINUE
         * @type {number}
         */
        geotoolkit.welllog.LogLithology.LineType.CONTINUE = NaN;
        /**
         * DISCONTINUE
         * @type {number}
         */
        geotoolkit.welllog.LogLithology.LineType.DISCONTINUE = NaN;
    /**
     * LogLithology Label Fill Mode
     *
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogLithology.LabelFillMode = {};
        /**
         * SINGLECOLOR - label fill will be a single color for all labels
         *
         * @type {number}
         */
        geotoolkit.welllog.LogLithology.LabelFillMode.SINGLECOLOR = NaN;
        /**
         * FILLSTYLE - label fill will be the corresponding fill styles color
         * @type {number}
         */
        geotoolkit.welllog.LogLithology.LabelFillMode.FILLSTYLE = NaN;
        /**
         * NONE - no label fill
         * @type {number}
         */
        geotoolkit.welllog.LogLithology.LabelFillMode.NONE = NaN;
    /**
     * Sets how text size is computed
     * @param {geotoolkit.scene.shapes.Text.SizeMode|string} textSizeMode Enum of size modes
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setTextSizeMode = function(textSizeMode){};
    /**
     * Returns how the size is computed
     * @returns {geotoolkit.scene.shapes.Text.SizeMode|string} returns textSizeMode
     */
    geotoolkit.welllog.LogLithology.prototype.getTextSizeMode = function(){};
    /**
     * Set show ellipsis
     * @param {boolean} showTextEllipsis show ellipses
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setShowEllipsis = function(showTextEllipsis){};
    /**
     * Returns ellipsis flag
     * @returns {boolean} ellipsis flag
     */
    geotoolkit.welllog.LogLithology.prototype.getShowEllipsis = function(){};
    /**
     * sets the label fill style used if the mode is set to SINGLECOLOR
     *
     * @param {geotoolkit.attributes.FillStyle | string | object} fillstyle label fill style
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setLabelFillStyle = function(fillstyle){};
    /**
     * Returns label fill style used if the mode is set to SINGLECOLOR
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogLithology.prototype.getLabelFillStyle = function(){};
    /**
     * LogLithology NameOrientation
     *
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogLithology.NameOrientation = {};
        /**
         * Regular
         * @type {string}
         */
        geotoolkit.welllog.LogLithology.NameOrientation.Regular = "";
        /**
         * Rotated
         * @type {string}
         */
        geotoolkit.welllog.LogLithology.NameOrientation.Rotated = "";
        /**
         * Automatic
         * @type {string}
         */
        geotoolkit.welllog.LogLithology.NameOrientation.Auto = "";
    /**
     * Sets lithology names
     *
     * @param {Array.<string>} names lithology names
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setNames = function(names){};
    /**
     * Returns lithology names
     *
     * @returns {Array.<string>}
     */
    geotoolkit.welllog.LogLithology.prototype.getNames = function(){};
    /**
     * Sets lithology titles
     *
     * @param {Array.<string>} titles track header titles
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setTitles = function(titles){};
    /**
     * Returns lithology titles
     *
     * @returns {Array.<string>}
     */
    geotoolkit.welllog.LogLithology.prototype.getTitles = function(){};
    /**
     * Sets lithology patterns
     * @param {geotoolkit.attributes.ImagePattern[]} patterns lithology patterns
     * @deprecated since 1.1 use setFillStyles
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setPatterns = function(patterns){};
    /**
     * Returns lithology patterns
     *
     * @returns {array.<geotoolkit.attributes.ImagePattern>}
     * @deprecated since 1.1 use getFillStyles
     */
    geotoolkit.welllog.LogLithology.prototype.getPatterns = function(){};
    /**
     * Sets text backing mode
     * @param {geotoolkit.welllog.LogLithology.LabelFillMode} mode Label fill mode
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setLabelFillMode = function(mode){};
    /**
     * Returns Label fill mode
     *
     * @returns {geotoolkit.welllog.LogLithology.LabelFillMode}
     */
    geotoolkit.welllog.LogLithology.prototype.getLabelFillMode = function(){};
    /**
     * Sets lithology fillColors
     * @param {array} fillColors lithology fillColors
     * @deprecated since 1.1 use setFillStyles
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setFillColors = function(fillColors){};
    /**
     * Return lithology colors
     *
     * @returns {array}
     * @deprecated since 1.1 use setFillStyles
     */
    geotoolkit.welllog.LogLithology.prototype.getFillColors = function(){};
    /**
     * Returns array of fillstyles
     *
     * @returns {array.<geotoolkit.attributes.FillStyle>}
     */
    geotoolkit.welllog.LogLithology.prototype.getFillStyles = function(){};
    /**
     * Sets lithology line types
     *
     * @param {array.<geotoolkit.welllog.LogLithology.LineType>} [lineTypes] array for the line type
     * @returns {geotoolkit.welllog.LogLithology}
     */
    geotoolkit.welllog.LogLithology.prototype.setLineTypes = function(lineTypes){};
    /**
     * Return Lithology Line Types
     *
     * @returns {array.<geotoolkit.welllog.LogLithology.LineType>}
     */
    geotoolkit.welllog.LogLithology.prototype.getLineTypes = function(){};
    /**
     * Sets array of fillstyles
     *
     * @param {Array.<geotoolkit.attributes.FillStyle>} fillStyles array of fillstyles
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setFillStyles = function(fillStyles){};
    /**
     * Sets depths intervals
     *
     * @param {array.<number>} depths depths intervals
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setDepths = function(depths){};
    /**
     * Returns depths
     *
     * @returns {Array.<number>}
     */
    geotoolkit.welllog.LogLithology.prototype.getDepths = function(){};
    /**
     * Returns a bounds
     *
     * @override
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.LogLithology.prototype.getBounds = function(){};
    /**
     * Return text style
     *
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.LogLithology.prototype.getTextStyle = function(){};
    /**
     * Sets text style
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * Returns fill style
     *
     * @override
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogLithology.prototype.getFillStyle = function(){};
    /**
     * Sets a fill style for a specific type
     *
     * @override
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogLithology.prototype.getFillStyleByType = function(){};
    /**
     * Sets text
     *
     * @param {string} text Sets text to be displayed
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setText = function(text){};
    /**
     * Returns text
     * @returns {string} text
     */
    geotoolkit.welllog.LogLithology.prototype.getText = function(){};
    /**
     * Return minimum height for label
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogLithology.prototype.getMinHeightForLabel = function(){};
    /**
     * Sets minimum height for label
     * @param {number} min min height for label ( used to decide when to turn off display of label)
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setMinHeightForLabel = function(min){};
    /**
     * Check collision
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean} true if object is inside of renderable area
     * @this {geotoolkit.scene.Node}
     */
    geotoolkit.welllog.LogLithology.prototype.checkCollision = function(context){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} inputContext Rendering Context
     */
    geotoolkit.welllog.LogLithology.prototype.render = function(inputContext){};
    /**
     * Render
     * @param {geotoolkit.renderer.RenderingContext} inputContext Rendering Context
     */
    geotoolkit.welllog.LogLithology.prototype.drawFill = function(inputContext){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.LogLithology.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.minheightforlabel] min height where display of label can be turned off
     * @param {array.<number>} [properties.depths] depths intervals
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.textstyle] the text style
     * @param {geotoolkit.attributes.LineStyle | string | object} [properties.linestyle] the line style
     * @param {Array.<geotoolkit.attributes.FillStyle | string | object>} [properties.fillstyles] the fill styles
     * @param {Array.<string>} [properties.text] lithology names
     * @param {Array.<string>} [properties.names] lithology names
     * @param {Array.<string>} [properties.titles] track header titles
     * @param {geotoolkit.welllog.LogLithology.LabelFillMode} [properties.labelfillmode] the label fill mode
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.labelfillstyle] the fill style used for mode SINGLECOLOR
     * @param {geotoolkit.welllog.LogLithology.NameOrientation} [properties.nameorientation] lithology name orientation
     * @returns {geotoolkit.welllog.LogLithology} this
     */
    geotoolkit.welllog.LogLithology.prototype.setProperties = function(properties){};

/**
 * A Welllog marker implementation.<br>
 * This shape is a horizontal line meant to be used in a LogTrack to highlight a specific depth.
 * It holds two labels (depth and name) that can be displayed or not.<br>
 * Note that this is not related to the WelllogWidget builtin markers and that this implementation is a <b>per track</b> marker.
 * So it will display a line only in its track. However a marker can be added on the entire Track Container as well.
 *
 * @class geotoolkit.welllog.LogMarker
 * @augments geotoolkit.welllog.LogAbstractVisual
 * @param {number} depth depth of the marker
 * @param {string} nameLabel name label on the marker
 * @param {string} [depthLabel] optional label for depth
 * @param {number} [horizontalTextOffset] horizontal label offset in device space
 * @param {number} [verticalTextOffset] vertical label offset in device space
 * @example
 * // 1). This example shows how to make the text in marker left aligned.
 *
 * for (var i = 0; i < _multiWellWidget.getTracksCount(); ++i) {
 * // Use this conditional to check if the track is a well track (as opposed to a correlation track)
 * if (geotoolkit.interfaceCast(track, geotoolkit.welllog.multiwell.IWellTrack)) {
 * var marker = new geotoolkit.welllog.LogMarker(2050);
 * marker.setLineStyle(geotoolkit.attributes.LineStyle.fromObject({'color': 'black'}));
 * marker.setTextStyle(geotoolkit.attributes.TextStyle.fromObject({
 * 'color': 'black',
 * 'font': '12px sans-serif'
 * }));
 * marker.setNameLabel('Marker 1');
 * marker.setNameLabelPosition(geotoolkit.util.AnchorType.LeftTop); // Left-align name label
 * marker.setDepthLabel('2050'); // This can be customized with TVD, TVDSS values
 * marker.setDepthLabelPosition(geotoolkit.util.AnchorType.LeftBottom); // Left-align depth label
 * track.getMarkerLayer().addChild(marker);
 * }
 * }
 */
geotoolkit.welllog.LogMarker = {};
    /**
     * Sets vertical label offset in device space
     * @param {number} offset offset
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setVerticalTextOffset = function(offset){};
    /**
     * Sets horizontal label offset in device space
     * @param {number} offset offset
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setHorizontalTextOffset = function(offset){};
    /**
     * Gets vertical label offset in device space
     * @returns {number}
     */
    geotoolkit.welllog.LogMarker.prototype.getVerticalTextOffset = function(){};
    /**
     * Gets horizontal label offset in device space
     * @returns {number}
     */
    geotoolkit.welllog.LogMarker.prototype.getHorizontalTextOffset = function(){};
    /**
     * Specify name label visible or not.
     *
     * @param {boolean} visible name label visible or not.
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setVisibleNameLabel = function(visible){};
    /**
     * Return true if name label is visible. It is visible by default.
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogMarker.prototype.isVisibleNameLabel = function(){};
    /**
     * Specify depth label visible or not.
     *
     * @param {boolean} visible specifies if depth label visible or not
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setVisibleDepthLabel = function(visible){};
    /**
     * Return true if depth label is visible. It is visible by default.
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogMarker.prototype.isVisibleDepthLabel = function(){};
    /**
     * Specify border name visible or not.
     *
     * @param {boolean} visible border name visible or not.
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setVisibleNameBorder = function(visible){};
    /**
     * Return true if Name label border is visible. It is visible by default.
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogMarker.prototype.isVisibleNameBorder = function(){};
    /**
     * Specify depth label border visible or not.
     *
     * @param {boolean} visible depth label border visible or not
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setVisibleDepthBorder = function(visible){};
    /**
     * Return true if depth label border is visible. It is visible by default.
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogMarker.prototype.isVisibleDepthBorder = function(){};
    /**
     * Specify name label fill style enabled or not.
     *
     * @param {boolean} enable name label fill style enabled or not.
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setFillNameLabel = function(enable){};
    /**
     * Return true if name label fill style enabled. It is enabled by default.
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogMarker.prototype.isFillNameLabel = function(){};
    /**
     * Specify depth label fill style enabled or not.
     *
     * @param {boolean} enable depth label fill style enabled or not
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setFillDepthLabel = function(enable){};
    /**
     * Return true if depth label fill style enabled. It is enabled by default.
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogMarker.prototype.isFillDepthLabel = function(){};
    /**
     * Specify fill style for both name and depth labels.
     *
     * @param {geotoolkit.attributes.FillStyle | string | object} fillStyle fill style for both name and depth labels.
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Return fill style of name label
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogMarker.prototype.getFillStyleName = function(){};
    /**
     * Sets fill style of name label
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setFillStyleName = function(fillStyle, merge){};
    /**
     * Return fill style of depth label
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogMarker.prototype.getFillStyleDepth = function(){};
    /**
     * Sets fill style of depth label
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setFillStyleDepth = function(fillStyle, merge){};
    /**
     * Return text style
     *
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.LogMarker.prototype.getTextStyle = function(){};
    /**
     * Sets text style
     *
     * @param {geotoolkit.attributes.TextStyle | string | object} textStyle text style
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setTextStyle = function(textStyle){};
    /**
     * specify the orientation of text
     * @param {geotoolkit.util.Orientation|null} orientation fixed orientation of text, null value means orientation determined by widget's rotation
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setTextOrientation = function(orientation){};
    /**
     * return orientation of text
     * @returns {geotoolkit.util.Orientation}
     */
    geotoolkit.welllog.LogMarker.prototype.getTextOrientation = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.LogMarker.prototype.updateState = function(){};
    /**
     * @param {geotoolkit.renderer.RenderingContext} localContext context
     * @param {geotoolkit.util.Rect} nameLabelRect bounds for name label
     * @param {geotoolkit.util.Rect} depthLabelRect bounds for depth label
     * @protected
     */
    geotoolkit.welllog.LogMarker.prototype.drawMarker = function(localContext, nameLabelRect, depthLabelRect){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.LogMarker.prototype.render = function(){};
    /**
     *
     * for internal use only, make text always readable
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {number} x x position to place text
     * @param {number} y y position to place text
     * @param {string} text text to be displayed
     * @param {geotoolkit.attributes.TextStyle} style text style
     * @param {geotoolkit.util.AnchorType} alignment alignment for placement of text
     * @param {number} [theta] angle of rotation
     */
    geotoolkit.welllog.LogMarker.prototype.drawText = function(context, x, y, text, style, alignment, theta){};
    /**
     * Sets marker
     *
     * @param {number} depth depth to place marker
     * @param {string|null} [displayNameLabel=null] name label
     * @param {string|null} [displayDepthLabel=null] depth label
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setDepthValue = function(depth, displayNameLabel, displayDepthLabel){};
    /**
     * Sets name to be displayed
     *
     * @param {string} nameLabel name to be displayed
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setNameLabel = function(nameLabel){};
    /**
     * Returns name to be displayed
     *
     * @returns {string}
     */
    geotoolkit.welllog.LogMarker.prototype.getNameLabel = function(){};
    /**
     * Sets depth value to be displayed
     *
     * @param {string} depthLabel name to be displayed
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setDepthLabel = function(depthLabel){};
    /**
     * Returns depth label to be displayed
     *
     * @returns {string}
     */
    geotoolkit.welllog.LogMarker.prototype.getDepthLabel = function(){};
    /**
     * Set depth
     *
     * @param {number} depth depth to place marker
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setDepth = function(depth){};
    /**
     * Return depth
     *
     * @returns {number} depth
     */
    geotoolkit.welllog.LogMarker.prototype.getDepth = function(){};
    /**
     * Verifies if object is within given context.
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean}
     */
    geotoolkit.welllog.LogMarker.prototype.checkCollision = function(context){};
    /**
     * Return model limits
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogMarker.prototype.getBounds = function(){};
    /**
     * return meaning depth limits
     * @override
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.LogMarker.prototype.getMeaningDepthLimits = function(){};
    /**
     * Return model limits
     *
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogMarker.prototype.getModelLimits = function(){};
    /**
     * Gets contents transform.
     * Returns null
     * @override
     * @returns {?geotoolkit.util.Transformation} null
     */
    geotoolkit.welllog.LogMarker.prototype.getContentsTransform = function(){};
    /**
     * Return name label position as an anchor point
     *
     * @returns {geotoolkit.util.AnchorType}
     */
    geotoolkit.welllog.LogMarker.prototype.getNameLabelPosition = function(){};
    /**
     * Set label position
     *
     * @param {geotoolkit.util.AnchorType} anchorPoint label position
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setNameLabelPosition = function(anchorPoint){};
    /**
     * Return depth label position as an anchor point
     *
     * @returns {geotoolkit.util.AnchorType}
     */
    geotoolkit.welllog.LogMarker.prototype.getDepthLabelPosition = function(){};
    /**
     * Set depth label position
     *
     * @param {geotoolkit.util.AnchorType} anchorPoint label position
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setDepthLabelPosition = function(anchorPoint){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.LogMarker.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.LogMarker.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.depth] depth to place marker
     * @param {string} [properties.displaynamelabel] name label
     * @param {string} [properties.displaydepthlabel] depth label
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.textstyle] The TextStyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.fillstyle] The Fill Style for name and depth
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.fillstylename] The Fill Style name
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.fillstyledepth] The Fill Style depth
     * @param {boolean} [properties.visiblenamelabel] display name label or not
     * @param {boolean} [properties.visibledepthlabel] display depth label or not
     * @param {boolean} [properties.visiblenameborder] display name border or not
     * @param {boolean} [properties.visibledepthborder] display depth border or not
     * @param {boolean} [properties.fillnamelabel] display fill name label or not
     * @param {boolean} [properties.filldepthlabel] display fill depth label or not
     * @param {geotoolkit.util.AnchorType} [properties.depthlabelposition] depth label position
     * @param {geotoolkit.util.AnchorType} [properties.namelabelposition] name label position
     * @param {geotoolkit.util.Orientation|null} [properties.textorientation] orientation of text
     * @param {number} [properties.verticaltextoffset] vertical text offset
     * @param {number} [properties.horizontaltextoffset] horizontal text offset
     * @returns {geotoolkit.welllog.LogMarker} this
     */
    geotoolkit.welllog.LogMarker.prototype.setProperties = function(properties){};

/**
 * Creates custom marker visual using th eoverlapping markers and {@link geotoolkit.layout.ILayout1D}.
 *
 * @class geotoolkit.welllog.MarkerSet
 * @augments geotoolkit.scene.CompositeNode
 *
 * @param {!object} [options] markerset options. See {@link geotoolkit.welllog.MarkerSet.html#setProperties} setProperties() for details
 * @param {!geotoolkit.layout.ILayout1D} [options.layout=new geotoolkit.welllog.layout.MarkerSetLayout()] markers layout
 * @param {boolean} [options.showoverlappedlabels=false] show overlapped labels
 * @param {!boolean} [options.visiblenamelabel=true] visible name label
 * @param {!boolean} [options.visibledepthlabel=false] visible depth label
 * @param {geotoolkit.util.AnchorType} [options.namelabelposition=geotoolkit.util.AnchorType.Center] name label anchor
 * @param {geotoolkit.util.AnchorType} [options.depthlabelposition=geotoolkit.util.AnchorType.None] depth label anchor
 * @param {!boolean} [options.visiblenameborder=false] visible name border
 * @param {!boolean} [options.visibledepthborder=false] visible depth border
 */
geotoolkit.welllog.MarkerSet = {};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} See {geotoolkit.welllog.MarkerSet.setProperties} for details
     */
    geotoolkit.welllog.MarkerSet.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {!object} properties An object containing the properties to set
     * @param {!geotoolkit.layout.ILayout1D} [properties.layout=new geotoolkit.welllog.layout.MarkerSetLayout()] markers layout
     * @param {boolean} [properties.showoverlappedlabels] show overlapped labels
     * @param {!boolean} [properties.visiblenamelabel] visible name label
     * @param {!boolean} [properties.visibledepthlabel] visible depth label
     * @param {geotoolkit.util.AnchorType} [properties.namelabelposition] name label anchor
     * @param {geotoolkit.util.AnchorType} [properties.depthlabelposition] depth label anchor
     * @param {!boolean} [properties.visiblenameborder] visible name border
     * @param {!boolean} [properties.visibledepthborder] visible depth border
     * @returns {geotoolkit.welllog.MarkerSet} this
     */
    geotoolkit.welllog.MarkerSet.prototype.setProperties = function(properties){};
    /**
     * Specify border name visible or not.
     *
     * @param {boolean} visible border name visible or not.
     * @returns {geotoolkit.welllog.MarkerSet} this
     */
    geotoolkit.welllog.MarkerSet.prototype.setVisibleNameBorder = function(visible){};
    /**
     * Return true if Name label border is visible. It is visible by default.
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.MarkerSet.prototype.isVisibleNameBorder = function(){};
    /**
     * Specify depth label border visible or not.
     *
     * @param {boolean} visible depth label border visible or not
     * @returns {geotoolkit.welllog.MarkerSet} this
     */
    geotoolkit.welllog.MarkerSet.prototype.setVisibleDepthBorder = function(visible){};
    /**
     * Return true if depth label border is visible. It is visible by default.
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.MarkerSet.prototype.isVisibleDepthBorder = function(){};
    /**
     * Specify name label visible or not.
     *
     * @param {boolean} visible name label visible or not.
     * @returns {geotoolkit.welllog.MarkerSet} this
     */
    geotoolkit.welllog.MarkerSet.prototype.setVisibleNameLabel = function(visible){};
    /**
     * Return true if name label is visible. It is visible by default.
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.MarkerSet.prototype.isVisibleNameLabel = function(){};
    /**
     * Specify depth label visible or not.
     *
     * @param {boolean} visible specifies if depth label visible or not
     * @returns {geotoolkit.welllog.MarkerSet} this
     */
    geotoolkit.welllog.MarkerSet.prototype.setVisibleDepthLabel = function(visible){};
    /**
     * Return true if depth label is visible. It is visible by default.
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.MarkerSet.prototype.isVisibleDepthLabel = function(){};
    /**
     * Return name label position as an anchor point
     *
     * @returns {geotoolkit.util.AnchorType}
     */
    geotoolkit.welllog.MarkerSet.prototype.getNameLabelPosition = function(){};
    /**
     * Set label position
     *
     * @param {geotoolkit.util.AnchorType} anchorPoint label position
     * @returns {geotoolkit.welllog.MarkerSet} this
     */
    geotoolkit.welllog.MarkerSet.prototype.setNameLabelPosition = function(anchorPoint){};
    /**
     * Return depth label position as an anchor point
     *
     * @returns {geotoolkit.util.AnchorType}
     */
    geotoolkit.welllog.MarkerSet.prototype.getDepthLabelPosition = function(){};
    /**
     * Set depth label position
     *
     * @param {geotoolkit.util.AnchorType} anchorPoint label position
     * @returns {geotoolkit.welllog.MarkerSet} this
     */
    geotoolkit.welllog.MarkerSet.prototype.setDepthLabelPosition = function(anchorPoint){};
    /**
     * Remove marker or array of markers
     * @override
     * @param {geotoolkit.welllog.LogMarker | Array<geotoolkit.welllog.LogMarker>} marker marker(s) to remove
     * @returns {geotoolkit.welllog.MarkerSet}
     */
    geotoolkit.welllog.MarkerSet.prototype.removeChild = function(marker){};
    /**
     * Add marker or array of markers
     * @override
     * @param {geotoolkit.welllog.LogMarker | Array<geotoolkit.welllog.LogMarker> | geotoolkit.util.Iterator} marker marker(s) to add
     * @returns {geotoolkit.welllog.MarkerSet} this
     */
    geotoolkit.welllog.MarkerSet.prototype.addChild = function(marker){};
    /**
     * Returns parent model limits
     * @override
     * @returns {geotoolkit.util.Rect} parent model limits
     */
    geotoolkit.welllog.MarkerSet.prototype.getModelLimits = function(){};
    /**
     * Returns parent visible model limits
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.MarkerSet.prototype.getVisibleModelLimits = function(){};
    /**
     * Verifies if object is within given context.
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.MarkerSet.prototype.checkCollision = function(context){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.MarkerSet.prototype.render = function(context){};

/**
 * Layout to perform on {@link geotoolkit.welllog.MarkerSet} object
 *
 * @class geotoolkit.welllog.layout.MarkerSetLayout
 * @augments geotoolkit.layout.ValueCorrelatedRangeLayout1D
 * @param {!object} [options] layout options
 * @param {!string} [options.overlap='some'] what to do if ranges don't fit: 'some' or 'all'
 * @param {!number} [options.maxoffset] if defined do not draw labels further than 'maxoffset' device units from its model position
 */
geotoolkit.welllog.layout.MarkerSetLayout = {};

/**
 * LogCurveMarker object can renders symbol in position of the last/latest depth and value of the curve provided.
 *
 * @class geotoolkit.welllog.LogCurveMarker
 * @augments geotoolkit.welllog.LogAbstractVisual
 * @param {geotoolkit.welllog.LogCurve} curve a curve to draw markers
 */
geotoolkit.welllog.LogCurveMarker = {};
    /**
     * Returns curve
     *
     * @returns {geotoolkit.welllog.LogCurve}
     */
    geotoolkit.welllog.LogCurveMarker.prototype.getCurve = function(){};
    /**
     * Returns symbol
     *
     * @returns {geotoolkit.scene.shapes.Symbol}
     */
    geotoolkit.welllog.LogCurveMarker.prototype.getSymbol = function(){};
    /**
     * Sets symbol
     *
     * @param {geotoolkit.scene.shapes.Symbol} symbol used for points along the curve
     * @returns {geotoolkit.welllog.LogCurveMarker} this
     */
    geotoolkit.welllog.LogCurveMarker.prototype.setSymbol = function(symbol){};
    /**
     * Returns model limits
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogCurveMarker.prototype.getModelLimits = function(){};
    /**
     * Returns bound in the parent coordinates
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogCurveMarker.prototype.getBounds = function(){};
    /**
     * Mark this marker to be updated.
     * @returns {geotoolkit.welllog.LogCurveMarker} this
     */
    geotoolkit.welllog.LogCurveMarker.prototype.updateState = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogCurveMarker.prototype.render = function(context){};
    /**
     * Retrieves the world transformation of the spatial.
     * @override
     */
    geotoolkit.welllog.LogCurveMarker.prototype.getContentsTransform = function(){};
    /**
     * Returns false
     *
     * @override
     * @returns {boolean}
     */
    geotoolkit.welllog.LogCurveMarker.prototype.isSelectable = function(){};
    /**
     * set marker indexes
     * @param {Array<number>} indexes array of numbers with marker indexes
     * @returns {geotoolkit.welllog.LogCurveMarker} this
     */
    geotoolkit.welllog.LogCurveMarker.prototype.setIndexes = function(indexes){};
    /**
     * Draw symbols
     *
     * @param {geotoolkit.renderer.RenderingContext} gr RenderingContext
     * @param {geotoolkit.util.Transformation} tr Transformation of symbols
     * @param {geotoolkit.util.Rect} deviceRect invalid area of the device
     */
    geotoolkit.welllog.LogCurveMarker.prototype.drawSymbols = function(gr, tr, deviceRect){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogCurveMarker.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {Array<number>} [properties.indexes] array of numbers with marker indexes
     * @param {geotoolkit.scene.shapes.Symbol} [properties.symbol] symbol used for points along the curve
     * @param {number} [properties.curve] The curve value.
     * @returns {geotoolkit.welllog.LogCurveMarker}
     */
    geotoolkit.welllog.LogCurveMarker.prototype.setProperties = function(properties){};

/**
 * Defines a 2D log visual. Data is passed in an Log2DVisualData containing rows of Log2DDataRow.
 * This visual is added to a log track to be displayed. <br>
 * Log2DVisual visual can be used to display FMI logs (Acoustic/Optic borehole imaging) or density logs.<br>
 * It requires to provide column base data for each depth. The provided data is organized as a table: a collection of rows and columns inside the row.<br>
 * You can specify your values as in vertical or horizontal or both directions.<br>
 *
 * Please refer to tutorial Log2D Visual in Welllog.
 *
 * @class geotoolkit.welllog.Log2DVisual
 * @augments geotoolkit.welllog.LogAbstractVisual
 * @param {geotoolkit.welllog.data.ArrayLogAbstractData} [data = null] instance of log2data
 * @param {boolean} [autoUpdate = true] automatic update from data source
 */
geotoolkit.welllog.Log2DVisual = {};
    /**
     * Enum of column alignment types
     * @enum
     * @readonly
     */
    geotoolkit.welllog.Log2DVisual.ColumnAlignment = {};
        /**
         * Alignment to the left
         * @type {string}
         */
        geotoolkit.welllog.Log2DVisual.ColumnAlignment.Left = "";
        /**
         * Alignment to the center
         * @type {string}
         */
        geotoolkit.welllog.Log2DVisual.ColumnAlignment.Center = "";
        /**
         * Alignment to the right (default)
         * @type {string}
         */
        geotoolkit.welllog.Log2DVisual.ColumnAlignment.Right = "";
    /**
     * Enum of interpolation types
     * @enum
     * @readonly
     */
    geotoolkit.welllog.Log2DVisual.InterpolationType = {};
        /**
         * Step plot mode (no interpolation)
         * @type {string}
         */
        geotoolkit.welllog.Log2DVisual.InterpolationType.Step = "";
        /**
         * Linear plot mode
         * @type {string}
         */
        geotoolkit.welllog.Log2DVisual.InterpolationType.Linear = "";
    /**
     * Enum of plotMode modes
     * @enum
     * @readonly
     */
    geotoolkit.welllog.Log2DVisual.PlotTypes = {};
    /**
     * Returns type of interpolation for rows values
     * @returns {geotoolkit.welllog.Log2DVisual.InterpolationType} interpolation
     */
    geotoolkit.welllog.Log2DVisual.prototype.getRowsInterpolation = function(){};
    /**
     * Set type of interpolation for rows values
     * @param {geotoolkit.welllog.Log2DVisual.InterpolationType} interpolation specify a type of interpolation between rows
     * @returns {geotoolkit.welllog.Log2DVisual} this
     */
    geotoolkit.welllog.Log2DVisual.prototype.setRowsInterpolation = function(interpolation){};
    /**
     * Set wrap interpolation
     * @param {boolean} wrapInterpolation type of the wrap interpolation to specify how to process the edge values
     * @returns {geotoolkit.welllog.Log2DVisual} this
     */
    geotoolkit.welllog.Log2DVisual.prototype.setWrapInterpolation = function(wrapInterpolation){};
    /**
     * Return wrap interpolation
     * @returns {boolean} wrapInterpolation
     */
    geotoolkit.welllog.Log2DVisual.prototype.getWrapInterpolation = function(){};
    /**
     * Set interpolation alignment
     * @param {geotoolkit.welllog.Log2DVisual.ColumnAlignment} alignment alignment of column
     * @returns {geotoolkit.welllog.Log2DVisual} this
     */
    geotoolkit.welllog.Log2DVisual.prototype.setAlignment = function(alignment){};
    /**
     * Return interpolation alignment
     * @returns {geotoolkit.welllog.Log2DVisual.ColumnAlignment} wrapInterpolation
     */
    geotoolkit.welllog.Log2DVisual.prototype.getAlignment = function(){};
    /**
     * Sets data
     *
     * @param {geotoolkit.welllog.data.ArrayLogAbstractData} data instance of log2data
     * @param {boolean} [autoUpdate = true] automatic update from data source
     * @returns {geotoolkit.welllog.Log2DVisual} this
     */
    geotoolkit.welllog.Log2DVisual.prototype.setData = function(data, autoUpdate){};
    /**
     * Returns bounds in the parent coordinates
     *
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getBounds = function(){};
    /**
     * @override
     * @param {boolean} [fullLimits=false] flag to return a full depth limits or mining depth limits without null values
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getDataLimits = function(fullLimits){};
    /**
     * Returns micro position left
     *
     * @returns {number}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getMicroPositionLeft = function(){};
    /**
     * Returns micro position right
     *
     * @returns {number}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getMicroPositionRight = function(){};
    /**
     * Returns minimum normalization limit -- Depreciated : now read from the colorprovider
     * @deprecated since 2.3
     * @returns {number}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getMinimumNormalizationLimit = function(){};
    /**
     * Returns maximum normalization limit -- Deprecated : now read from the colorprovider
     * @deprecated since 2.3
     * @returns {number}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getMaximumNormalizationLimit = function(){};
    /**
     * Sets limits in the track. Setting it to 0, 1 will
     * fill the whole width of the track. -- Deprecated : now use @link {geotoolkit.welllog.Log2DVisual.setMicroPosition}
     * @deprecated since 2.3
     * @param {number} left left limit of the track to display
     * @param {number} right right limit of the track to display
     * @returns {geotoolkit.welllog.Log2DVisual}
     */
    geotoolkit.welllog.Log2DVisual.prototype.setLimits = function(left, right){};
    /**
     * Sets micro position (0 - 1) . It allows application code to display the curve in a subarea of the track.
     *
     * @param {number} left left position
     * @param {number} right right position
     * @returns {geotoolkit.welllog.Log2DVisual} this
     */
    geotoolkit.welllog.Log2DVisual.prototype.setMicroPosition = function(left, right){};
    /**
     * Enable / disable usage limits from data. By default automatic limit is disabled
     * @param {boolean} enable enable or disable usage data limits
     * @returns {geotoolkit.welllog.Log2DVisual}
     */
    geotoolkit.welllog.Log2DVisual.prototype.setAutoAnglesLimits = function(enable){};
    /**
     * Returns the status of the auto angle limits
     * @returns {boolean}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getAutoAnglesLimits = function(){};
    /**
     * Sets angles limits of the data. By default it is from 0 to 2*PI
     *
     * @param {number} left left angle in radians
     * @param {number} right right angle in radians
     * @returns {geotoolkit.welllog.Log2DVisual}
     */
    geotoolkit.welllog.Log2DVisual.prototype.setAnglesLimits = function(left, right){};
    /**
     * Returns angle limits
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getAnglesLimits = function(){};
    /**
     * Returns data
     *
     * @returns {geotoolkit.welllog.data.ArrayLogAbstractData}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getData = function(){};
    /**
     * Sets color provider
     *
     * @param {geotoolkit.util.ColorProvider} colorProvider the color provider
     * @returns {geotoolkit.welllog.Log2DVisual}
     */
    geotoolkit.welllog.Log2DVisual.prototype.setColorProvider = function(colorProvider){};
    /**
     * Gets color provider
     *
     * @returns {geotoolkit.util.ColorProvider}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getColorProvider = function(){};
    /**
     * Sets Plot type to specify linear o step interpolation of values in columns
     * <p>
     * In linear interpolation mode it interpolates value from the previous column to the end of the current column
     * and the first column is ignored, which can be represented as end of the sector if consider each column as a sector.
     * if it is necessary to start from beginning of the sector or in the middle then you can specify offset equal to
     * the first column angle or
     * the half the first column angle.
     * </p>
     * @param {geotoolkit.welllog.Log2DVisual.PlotTypes|string} mode plot types (step plot mode or linear plot mode) to be used for interpolation
     * @returns {geotoolkit.welllog.Log2DVisual}
     */
    geotoolkit.welllog.Log2DVisual.prototype.setPlotType = function(mode){};
    /**
     * Gets plot type
     *
     * @returns {geotoolkit.welllog.Log2DVisual.PlotTypes|string}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getPlotType = function(){};
    /**
     * Sets the offset of data
     *
     * @param {Array.<number>|number|null} offsets array of the same size as data set
     * @returns {geotoolkit.welllog.Log2DVisual}
     * @example
     * // following example shows how to use setOffsets() method to rotate Log2DVisual
     * var degreesToRadians = function(degrees){
     * return degrees * Math.PI / 180;
     * };
     *
     * function createOffsets (data, offset) {
     * var offsets = [];
     * for (var i = 0; i < data.getRows().length; i++)
     * offsets.push(offset);
     * return offsets;
     * }
     *
     * log2dVisual.setOffsets(createOffsets(log2d.getData(), degreesToRadians(val)));
     */
    geotoolkit.welllog.Log2DVisual.prototype.setOffsets = function(offsets){};
    /**
     * Returns the offset of data
     * @returns {Array.<number>|number} offset array of the same size as data set
     */
    geotoolkit.welllog.Log2DVisual.prototype.getOffsets = function(){};
    /**
     * Returns minimum depth of the data set
     *
     * @returns {number}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getMinDepth = function(){};
    /**
     * Returns maximum depth of the data set
     *
     * @returns {number}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getMaxDepth = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.Log2DVisual.prototype.render = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.Log2DVisual.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {object | geotoolkit.util.ColorProvider} [properties.colorprovider] color provider
     * @param {geotoolkit.welllog.Log2DVisual.PlotTypes|string} [properties.plotmode] plot mode
     * @param {number} [properties.minvalue] deprecated (since 2.6) min value
     * @param {number} [properties.maxvalue] deprecated (since 2.6) max value
     * @param {number} [properties.minangle] min angle
     * @param {number} [properties.maxangle] max angle
     * @param {number} [properties.microposleft] left micro position
     * @param {number} [properties.microposright] right micro position
     * @param {boolean} [properties.autoanglelimits] auto angle model limits
     * @param {boolean} [properties.wrapinterpolation] type of the wrap interpolation to specify how to process the edge values
     * @param {geotoolkit.welllog.Log2DVisual.InterpolationType} [properties.rowsinterpolation] specify a type of interpolation between rows
     * @param {Array.<number>} [properties.offsets] offsets
     * @returns {geotoolkit.welllog.Log2DVisual}
     */
    geotoolkit.welllog.Log2DVisual.prototype.setProperties = function(properties){};
    /**
     * Update state.
     * @param {Array.<geotoolkit.util.Rect>} [regions] optional array to return invalid rectangles
     * @param {?geotoolkit.scene.Node.StateChanges} [changes] optional parameter to specify a reason of changes
     * @returns {geotoolkit.welllog.Log2DVisual} this
     */
    geotoolkit.welllog.Log2DVisual.prototype.updateState = function(regions, changes){};

/**
 * Defines a raster log visual which loads image by tiles using tile provider and maps them
 * to different intervals
 * @class geotoolkit.welllog.RasterLog
 * @augments geotoolkit.welllog.LogAbstractVisual
 * @param {object} [options] options
 * @param {array.<{src: geotoolkit.util.Rect, dst: geotoolkit.util.Rect}>} [options.mapping] array of mapping
 * @param {geotoolkit.util.Rect} [options.imagesize] image size
 * @param {geotoolkit.scene.shapes.tiledshape.AbstractTileSource} [options.provider] tile provider
 */
geotoolkit.welllog.RasterLog = {};
    /**
     * Sets mapping
     * @param {array.<{src: geotoolkit.util.Rect, dst: geotoolkit.util.Rect}>} [mapping] array of mapping
     * @returns {geotoolkit.welllog.RasterLog}
     */
    geotoolkit.welllog.RasterLog.prototype.setMapping = function(mapping){};
    /**
     * @returns {array.<{src: geotoolkit.util.Rect, dst: geotoolkit.util.Rect}>} array of mapping, which
     * provides source and destination rectangle
     */
    geotoolkit.welllog.RasterLog.prototype.getMapping = function(){};
    /**
     * Sets image options
     * @param {object} options image options
     * @param {geotoolkit.scene.shapes.tiledshape.AbstractTileSource} [options.provider] tile provider
     * @param {geotoolkit.util.Rect} [options.imagesize] image size
     * @returns {geotoolkit.welllog.RasterLog}
     */
    geotoolkit.welllog.RasterLog.prototype.setImageOptions = function(options){};
    /**
     * Recalculate limits if mapping is changed
     */
    geotoolkit.welllog.RasterLog.prototype.updateLimits = function(){};
    /**
     * Render raster log visual
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.welllog.RasterLog.prototype.render = function(context){};
    /**
     * Return image position and depth position by device position
     * @param {geotoolkit.util.Point} pt position in device
     * @returns {?object} [info] information about image and visual coordinates
     * @returns {number} [info.depth] depth
     * @returns {number} [info.value] value
     * @returns {number} [info.imageX] image horizontal position
     * @returns {number} [info.imageY] image vertical position
     */
    geotoolkit.welllog.RasterLog.prototype.getImagePosition = function(pt){};
    /**
     * Return bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.RasterLog.prototype.getBounds = function(){};
    /**
     * Returns minimum depth
     *
     * @returns {number}
     */
    geotoolkit.welllog.RasterLog.prototype.getMinDepth = function(){};
    /**
     * Returns maximum depth
     *
     * @returns {number}
     */
    geotoolkit.welllog.RasterLog.prototype.getMaxDepth = function(){};
    /**
     * @override
     */
    geotoolkit.welllog.RasterLog.prototype.getDataLimits = function(){};

/**
 * Creates the standard representation of a well log axis. It can be added to the track and a tickgenerator like {@link geotoolkit.welllog.axis.DateTimeTickGenerator} can be assigned to it based on the trajectory data.
 *
 * @class geotoolkit.welllog.LogAxis
 * @augments geotoolkit.axis.Axis
 * @param {geotoolkit.axis.TickGenerator} [tg] axis tick generator
 */
geotoolkit.welllog.LogAxis = {};
    /**
     * Returns a parent log track
     *
     * @returns {?geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.LogAxis.prototype.getTrack = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context RenderingContext
     */
    geotoolkit.welllog.LogAxis.prototype.render = function(context){};
    /**
     * Enum of axis tick positions
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogAxis.TitleAlignment = {};
        /**
         * Title is on the top side.
         * @type {string}
         */
        geotoolkit.welllog.LogAxis.TitleAlignment.Top = "";
        /**
         * Title is on the center.
         * @type {string}
         */
        geotoolkit.welllog.LogAxis.TitleAlignment.Center = "";
        /**
         * Title is on the bottom side.
         * @type {string}
         */
        geotoolkit.welllog.LogAxis.TitleAlignment.Bottom = "";
    /**
     * Get title alignment
     * @returns {geotoolkit.welllog.LogAxis.TitleAlignment} alignment
     */
    geotoolkit.welllog.LogAxis.prototype.getTitleAlignment = function(){};
    /**
     * Set title alignment
     * @param {geotoolkit.welllog.LogAxis.TitleAlignment} titleAlignment title alignment
     * @returns {geotoolkit.welllog.LogAxis}
     */
    geotoolkit.welllog.LogAxis.prototype.setTitleAlignment = function(titleAlignment){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.LogAxis.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.welllog.LogAxis.TitleAlignment} [properties.title.alignment] title alignment
     * @returns {geotoolkit.welllog.LogAxis} this
     */
    geotoolkit.welllog.LogAxis.prototype.setProperties = function(properties){};

/**
 * Create horizontal depth grid.
 *
 * @class geotoolkit.welllog.LogHorizontalGrid
 * @augments geotoolkit.welllog.LogAbstractVisual
 * @param {geotoolkit.axis.TickGenerator} [tickGenerator] The algorithm used to generate lines along the grid(default is adaptive tick generator)
 * @deprecated since 1.1 use geotoolkit.axis.Grid instead
 */
geotoolkit.welllog.LogHorizontalGrid = {};
    /**
     * Sets the new tick generator
     *
     * @param {geotoolkit.axis.TickGenerator} tickGenerator The algorithm used to generate lines along the grid(default is adaptive tick generator)
     * @returns {geotoolkit.welllog.LogHorizontalGrid} this
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.setTickGenerator = function(tickGenerator){};
    /**
     * Gets the current tick generator
     *
     * @returns {geotoolkit.axis.TickGenerator}
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.getTickGenerator = function(){};
    /**
     * Sets minor line style. This method does the same as setMinorLineStyle.
     * This line style is used if the tick generator is not set otherwise the
     * tick generator style is used.
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogHorizontalGrid}
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Returns the minor line style
     *
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.getLineStyle = function(){};
    /**
     * Returns the minor line style
     *
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.getMinorLineStyle = function(){};
    /**
     * Sets minor line style This line style is used if the tick generator is
     * not set otherwise the tick generator style is used.
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogHorizontalGrid} this
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.setMinorLineStyle = function(lineStyle, merge){};
    /**
     * Returns the major line style
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.getMajorLineStyle = function(){};
    /**
     * Sets major line style This line style is used if the tick generator is
     * not set otherwise the tick generator style is used.
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogHorizontalGrid} this
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.setMajorLineStyle = function(lineStyle, merge){};
    /**
     * return meaning data limits
     *
     * @param {boolean|undefined} fullLimits default value is false
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.getDataLimits = function(fullLimits){};
    /**
     * Gets track model limits
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.getBounds = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.render = function(context){};
    /**
     * Update state
     * @override
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.updateState = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.attributes.LineStyle | string | object} [properties.minorlinestyle] minor line style
     * @param {geotoolkit.attributes.LineStyle | string | object} [properties.majorlinestyle] major line style
     * @param {geotoolkit.axis.TickGenerator} [properties.tickgenerator] The algorithm to generate lines along the grid
     * @returns {geotoolkit.welllog.LogHorizontalGrid} this
     */
    geotoolkit.welllog.LogHorizontalGrid.prototype.setProperties = function(properties){};

/**
 * Create the standard representation of a well linear value grid.
 *
 * @class geotoolkit.welllog.LogLinearValueGrid
 * @augments geotoolkit.welllog.LogAbstractVisual
 * @param {number} [linesCount] number of lines by default 10
 * @deprecated since 1.1 use geotoolkit.axis.Grid instead
 */
geotoolkit.welllog.LogLinearValueGrid = {};
    /**
     * Return counts line
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogLinearValueGrid.prototype.getLinesCount = function(){};
    /**
     * Sets lines count
     *
     * @param {number} linesCount number of lines to display
     * @returns {geotoolkit.welllog.LogLinearValueGrid}
     */
    geotoolkit.welllog.LogLinearValueGrid.prototype.setLinesCount = function(linesCount){};
    /**
     * return meaning data limits
     *
     * @param {boolean|undefined} fullLimits default value is false
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.LogLinearValueGrid.prototype.getDataLimits = function(fullLimits){};
    /**
     * Return bound in the parent coordinates
     *
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogLinearValueGrid.prototype.getBounds = function(){};
    /**
     * Sets bounds of the curve in the parent coordinates
     *
     * @override
     * @param {geotoolkit.util.Rect} bounds bounds or position of the visual
     * @returns {geotoolkit.welllog.LogLinearValueGrid} this
     */
    geotoolkit.welllog.LogLinearValueGrid.prototype.setBounds = function(bounds){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogLinearValueGrid.prototype.render = function(context){};
    /**
     * Put grid inside track (to avoid clipping)
     * @param {boolean} inside default is false
     * @returns {geotoolkit.welllog.LogLinearValueGrid} this
     */
    geotoolkit.welllog.LogLinearValueGrid.prototype.setInsideTrack = function(inside){};
    /**
     * Get grid state, is it inside track or not
     * @returns {boolean}
     */
    geotoolkit.welllog.LogLinearValueGrid.prototype.isInsideTrack = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogLinearValueGrid.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.linescount] number of lines to display
     * @returns {geotoolkit.welllog.LogLinearValueGrid}
     */
    geotoolkit.welllog.LogLinearValueGrid.prototype.setProperties = function(properties){};

/**
 * Create a logarithmic value grid where you can specify a count of decades as shown in example
 *
 * @class geotoolkit.welllog.LogLog10ValueGrid
 * @augments geotoolkit.welllog.LogAbstractVisual
 * @param {number|object} decadeCount number of decades to be displayed or options object
 * @param {number} [decadeCount.decadecount] number of decades to be displayed
 * @param {number} [decadeCount.logstart=null] left limits of log grid
 * @param {number} [decadeCount.logstop=null] right limits of log grid
 * @param {boolean} [decadeCount.intermediate=true] enables or disables display of minor lines in the grid
 * @param {number} [decadeCount.logbase=10] a logarithm base
 * @param {boolean} [decadeCount.reverse=false] enables or disables reverse direction
 * @param {boolean} [intermediate=true] enables or disables display of minor lines in the grid
 * @example
 * grid = new geotoolkit.welllog.LogLog10ValueGrid(3);
 */
geotoolkit.welllog.LogLog10ValueGrid = {};
    /**
     * Enable or disable reverse direction
     *
     * @param {boolean} reverse enables or disables reverse direction
     * @returns {geotoolkit.welllog.LogLog10ValueGrid} this
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.setReverse = function(reverse){};
    /**
     * Returns reverse direction flag
     * @returns {boolean} reverse direction flag
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.getReverse = function(){};
    /**
     * Enable or disable displaying intermediate lines
     *
     * @param {boolean} enable enables or disables display of minor lines in the grid
     * @returns {geotoolkit.welllog.LogLog10ValueGrid} this
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.setIntermediate = function(enable){};
    /**
     * Returns true if visual displays intermediate lines
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.getIntermediate = function(){};
    /**
     * Return a decade count
     *
     * @returns {number}
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.getDecadeCount = function(){};
    /**
     * Sets decade count
     *
     * @param {number} decadeCount number of decades to be displayed
     * @returns {geotoolkit.welllog.LogLog10ValueGrid} this
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.setDecadeCount = function(decadeCount){};
    /**
     * Return a logarithmic scale.
     * @deprecated since 2.5
     * @returns {number}
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.getLogScale = function(){};
    /**
     * Sets a logarithmic scale
     * @param {number} scale
     * Must be more then zero (because logarithmic).
     * @returns {geotoolkit.welllog.LogLog10ValueGrid} this
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.setLogScale = function(scale){};
    /**
     * Sets logarithmic line range.
     *
     * @param {number} start start value of tick generator
     * @param {number} stop stop value of tick generator
     * @returns {geotoolkit.welllog.LogLog10ValueGrid} this
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.setLogarithmicRange = function(start, stop){};
    /**
     * get log start and log stop
     * @returns {object} value
     * @returns {number} [value.logstart]
     * @returns {number} [value.logstop]
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.getLogarithmicRange = function(){};
    /**
     * return meaning data limits
     *
     * @param {boolean|undefined} fullLimits default value is false
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.getDataLimits = function(fullLimits){};
    /**
     * Returns model limits
     *
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.getBounds = function(){};
    /**
     * Sets bounds
     *
     * @param {geotoolkit.util.Rect} bounds bounds of the visual
     * @returns {geotoolkit.welllog.LogLog10ValueGrid} this
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.setBounds = function(bounds){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.render = function(context){};
    /**
     * Draws grid
     * @override
     * @param {geotoolkit.renderer.RenderingContext} gr Rendering Context
     * @param {geotoolkit.util.Rect} deviceModelRect invalid area of the device
     * @param {geotoolkit.util.Transformation} tr transformation from model to device
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.drawGrid = function(gr, deviceModelRect, tr){};
    /**
     * Draws vertical ticks
     * @override
     * @param {geotoolkit.renderer.RenderingContext} gr Rendering Context
     * @param {number} top where to start drawing ticks
     * @param {number} height height of the ticks
     * @param {number} l left position inside track
     * @param {number} r right position inside track
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.drawVerticalTicks = function(gr, top, height, l, r){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object, see {@link geotoolkit.welllog.LogLog10ValueGrid.setProperties}
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.decadecount] number of decades to be displayed
     * @param {number} [properties.scale] deprecated (since 2.5) a logarithmic scale
     * @param {number} [properties.offset] grid offset
     * @param {number} [properties.step] deprecated (since 2.5) grid step
     * @param {boolean} [properties.intermediate] enables or disables display of minor lines in the grid
     * @param {boolean} [properties.reverse] enables or disables reverse direction
     * @param {geotoolkit.util.Rect} [properties.bounds] bounds
     * @param {number} [properties.logstart] left limits of log grid
     * @param {number} [properties.logstop] right limits of log grid
     * @returns {geotoolkit.welllog.LogLog10ValueGrid}
     */
    geotoolkit.welllog.LogLog10ValueGrid.prototype.setProperties = function(properties){};

/**
 * Defines visual to displayed blocks of the depths
 *
 * @class geotoolkit.welllog.LogBlock
 * @augments geotoolkit.welllog.LogAbstractVisual
 */
geotoolkit.welllog.LogBlock = {};
    /**
     * Position
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogBlock.Position = {};
        /**
         * Left
         * @type {number}
         */
        geotoolkit.welllog.LogBlock.Position.Left = NaN;
        /**
         * Right
         * @type {number}
         */
        geotoolkit.welllog.LogBlock.Position.Right = NaN;
        /**
         * Both
         * @type {number}
         */
        geotoolkit.welllog.LogBlock.Position.Both = NaN;
    /**
     * Sets reference depths
     * @param {Array<number>} depths an array of numbers specifying point along the track
     * @returns {geotoolkit.welllog.LogBlock}
     */
    geotoolkit.welllog.LogBlock.prototype.setReferenceDepths = function(depths){};
    /**
     * Sets depths
     * @param {Array<number>} depths an array of numbers
     * @returns {geotoolkit.welllog.LogBlock}
     */
    geotoolkit.welllog.LogBlock.prototype.setDepths = function(depths){};
    /**
     * Gets position
     *
     * @returns {geotoolkit.welllog.LogBlock.Position}
     */
    geotoolkit.welllog.LogBlock.prototype.getPosition = function(){};
    /**
     * Sets position
     *
     * @param {geotoolkit.welllog.LogBlock.Position} pos position(left or right or both)
     * @returns {geotoolkit.welllog.LogBlock} this
     */
    geotoolkit.welllog.LogBlock.prototype.setPosition = function(pos){};
    /**
     * Gets fill style
     *
     * @returns {?geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogBlock.prototype.getFillStyle = function(){};
    /**
     * Sets fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogBlock} this
     */
    geotoolkit.welllog.LogBlock.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} inputContext Rendering Context
     */
    geotoolkit.welllog.LogBlock.prototype.render = function(inputContext){};
    /**
     * Gets parent model limits
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.LogBlock.prototype.getModelLimits = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogBlock.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.welllog.LogBlock.Position} [properties.position] position(left or right or both)
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.fillstyle] The fill style
     * @returns {geotoolkit.welllog.LogBlock} this
     */
    geotoolkit.welllog.LogBlock.prototype.setProperties = function(properties){};

/**
 * The StackedTrack serves as a container for all kinds of tracks and visuals like curves, fill etc.
 *
 * @class geotoolkit.welllog.StackedTrack
 * @augments geotoolkit.welllog.LogTrack
 * @param {object} [options = null]
 * @param {object} [options.bounds = null] bounds of the visual
 * @param {object} [options.border = null] outline of the track
 * @param {boolean} [options.borderstrategy = geotoolkit.welllog.BorderStrategy.BorderOnTop] strategy on how to display the border of the track
 * @example
 * // to modify properties of the border using css.
 * var css = [
 * '.Border {',
 * ' linestyle-color: red;',
 * ' linestyle-width: 2;',
 * '}',
 * ].join('\n');
 * track.setCss(new geotoolkit.css.CssStyle({'css': css}));
 */
geotoolkit.welllog.StackedTrack = {};
    /**
     * @override
     * @param {string} event broadcast event
     * @param {geotoolkit.scene.Node} source who is initializing this event
     * @param {object} args additional parameter
     * @returns {geotoolkit.welllog.StackedTrack}
     */
    geotoolkit.welllog.StackedTrack.prototype.notify = function(event, source, args){};
    /**
     * Add a track
     * @param {geotoolkit.welllog.LogTrack} track track to insert
     * @param {geotoolkit.welllog.TrackDirection} [trackDirection] The location of the track (first, last, etc)
     * @param {geotoolkit.welllog.LogTrack} [reference=null] reference track
     * @throws Will throw an error if the track is not specified
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.StackedTrack.prototype.addTrack = function(track, trackDirection, reference){};
    /**
     * Insert track to the container at specified index
     * @param {geotoolkit.welllog.LogTrack} track track to insert
     * @param {number} index index of the track
     * @param {number} [trackWidth] optional track width
     * @throws Will throw an error if the track is not specified
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.StackedTrack.prototype.insertTrack = function(track, index, trackWidth){};
    /**
     * Remove the track
     * @param {geotoolkit.welllog.LogTrack} track track to remove
     * @throws Will throw an error if the track is not specified
     * @returns {geotoolkit.welllog.StackedTrack} this
     */
    geotoolkit.welllog.StackedTrack.prototype.removeTrack = function(track){};
    /**
     * Returns amount of tracks
     * @returns {number} amount of tracks
     */
    geotoolkit.welllog.StackedTrack.prototype.getTracksCount = function(){};
    /**
     * Returns {geotoolkit.welllog.LogTrack} at specified index
     * @param {number} index index to return track at
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.StackedTrack.prototype.getTrackAt = function(index){};
    /**
     * Return index of track
     * @param {geotoolkit.welllog.LogTrack} track to get index
     * @returns {number} index of the track
     */
    geotoolkit.welllog.StackedTrack.prototype.getTrackIndex = function(track){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.StackedTrack.prototype.renderChildren = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.StackedTrack.prototype.updateLayout = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.StackedTrack.prototype.updateState = function(){};
    /**
     * Associate layout with a track to layout children tracks
     * @param {geotoolkit.layout.Layout} layout layout to be set
     * @returns {geotoolkit.welllog.StackedTrack} this
     */
    geotoolkit.welllog.StackedTrack.prototype.setLayout = function(layout){};
    /**
     * Returns layout associated with the group
     * @returns {geotoolkit.layout.Layout} layout
     */
    geotoolkit.welllog.StackedTrack.prototype.getLayout = function(){};
    /**
     * Sets the same depth limits for all tracks
     *
     * @param {number|geotoolkit.util.Range} minDepth min depth for all tracks or the range to set
     * @param {number} maxDepth max depth for all tracks
     * @returns {geotoolkit.welllog.StackedTrack} this
     */
    geotoolkit.welllog.StackedTrack.prototype.setDepthLimits = function(minDepth, maxDepth){};
    /**
     * @param {function(node, target)} callback callback
     * @param {object} target target
     */
    geotoolkit.welllog.StackedTrack.prototype.enumerateNodes = function(callback, target){};

/**
 * Define factory to create tracks
 * @class geotoolkit.welllog.TrackFactory
 */
geotoolkit.welllog.TrackFactory = {};
    /**
     * Create track
     * @param {geotoolkit.welllog.TrackType | geotoolkit.welllog.LogTrack} trackType track to create
     * @param {object} options track options
     * @param {number} [options.width] track width
     * @param {string} [options.name] track name
     * @param {object} [options.border] track border options
     * @param {boolean} [options.border.visible=false] visibility of the border
     * @param {string} [options.border.color=lightgray] color of border border
     * @param {object} [options.border.color] color of border border
     * @param {string} [options.indextype=md] primary index types
     * @param {string} [options.indexunit=ft] primary index unit
     * @param {object} [options.indextrack] defines properties for index track
     * @param {object} [options.indextrack.styles] index track line styles and text styles
     * @param {object} [options.indextrack.labelformat] custom label format function
     * @param {Object} [options.indextrack.axis] axis settings
     * @param {string} [options.indextrack.axis.name] name of axis
     * @param {string} [options.indextrack.axis.locale = 'en'] locale for tickgenerator of axis
     * @param {number} [options.timezone] timezone
     * @param {number} [options.timezoneoffset=0] time zone offset in hours
     * @param {object} [options.gridlinestyle] gridlines
     * @param {object} [options.logtrack] log10 track options
     * @param {number} [options.logtrack.decadecount] log20 grid decadecount, see {@link geotoolkit.welllog.LogLog10ValueGrid}
     * @param {boolean} [options.logtrack.reverse] log20 grid direction, see {@link geotoolkit.welllog.LogLog10ValueGrid}
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.TrackFactory.prototype.createTrack = function(trackType, options){};
    /**
     * Create track header
     * @param {geotoolkit.welllog.LogTrack} track log track
     * @param {object} [options] track header options
     * @param {boolean} [options.visibletracktitle] track visible track title
     * @param {boolean} [options.titlefirst] display title first
     * @param {boolean} [options.firsttolast] display headers from first to last
     * @param {boolean} [options.toptobottom] display headers from top to bottom
     * @param {object} [options.border] border property
     * @param {boolean} [options.border.visible] border visibility
     * @param {string} [options.border.color] border color
     * @param {number} [options.border.width] border width
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.border.background] border background
     * @returns {geotoolkit.welllog.header.LogTrackHeader}
     */
    geotoolkit.welllog.TrackFactory.prototype.createTrackHeader = function(track, options){};
    /**
     * Return factory instance
     * @returns {geotoolkit.welllog.TrackFactory} factory
     */
    geotoolkit.welllog.TrackFactory.getInstance = function(){};

/**
 * Define an abstract implementation of visual header.
 * NOTE: Custom LogVisualHeader implementation MUST override "clone" operation for
 * LogVisualHeaderProvider to be able to create new header instance(s) internally.
 * This is a base class for all visual headers.
 *
 * @class geotoolkit.welllog.header.LogVisualHeader
 * @augments geotoolkit.scene.AbstractNode
 * @param {geotoolkit.scene.Node} [visual] visual for the header
 * @example
 * // 1). This example shows how to create a custom header for a curve, it displays just a curve name.
 * function createCustomHeader (curve) {
 * var CustomCurveVisualHeader = function (visual) {
 * geotoolkit.welllog.header.LogVisualHeader.call(this, visual);
 * this.setTextStyle(new geotoolkit.attributes.TextStyle('rgb(0,0,0)', 'middle', 'left', '11px sans-serif'));
 * this.setModelLimits(new geotoolkit.util.Rect(0, 0, 100, 40));
 * };
 * geotoolkit.inherits(CustomCurveVisualHeader, geotoolkit.welllog.header.LogVisualHeader);
 * geotoolkit.setClassName(CustomCurveVisualHeader, 'CustomCurveVisualHeader');
 * // Render
 * // @override
 * // @param {geotoolkit.renderer.RenderingContext} inputContext
 *
 * CustomCurveVisualHeader.prototype.render = function (inputContext) {
 * var context = this.getWorldTransform() != null ? inputContext.pushTransformation(this.getWorldTransform()) : inputContext;
 * var rc = this.getModelLimits();
 * if (rc != null) {
 * var curve = this.getVisual();
 * var curveName = curve.getName();
 * // sets text style
 * context.setTextStyle(this.getTextStyle().clone().setAlignment('center').setBaseLine('top'));
 * var oldTr = context.getTransformation();
 * // transform anchor coordinates to device
 * var pos = oldTr.transformXY(rc.getCenterX(), rc.getTop());
 * // Sets identity transformation
 * context.setTransformation(new geotoolkit.util.Transformation());
 * // draw text
 * context.drawText(pos.getX(), pos.getY(), curveName);
 * // restore transformation
 * context.setTransformation(oldTr);
 * }
 * };
 * // Clone
 * // @override
 * // @returns {CustomCurveVisualHeader} this
 * CustomCurveVisualHeader.prototype.clone = function () {
 * var header = new CustomCurveVisualHeader(this.getVisual());
 * geotoolkit.mergeObjects(this, header);
 * return header;
 * };
 * // Allows using obfuscated toolkit
 * geotoolkit.obfuscate(CustomCurveVisualHeader, geotoolkit.welllog.header.LogVisualHeader);
 *
 * return new CustomCurveVisualHeader(curve);
 * }
 * // In the next step you can register it for all curves or for an instance of the curve in the header provider. For example for all LogCurves you can use the following code:
 * var headerProvider = widget.getHeaderContainer().getHeaderProvider();
 * headerProvider.registerHeaderProvider(geotoolkit.welllog.LogCurve.getClassName(), createCustomHeader(null));
 *
 */
geotoolkit.welllog.header.LogVisualHeader = {};
    /**
     * EventDispatcher Events
     * @readonly
     * @enum
     */
    geotoolkit.welllog.header.LogVisualHeader.Events = {};
        /**
         * This Event is fired when the visual was changed
         * @type {string}
         */
        geotoolkit.welllog.header.LogVisualHeader.Events.VisualChanged = "";
        /**
         * This Event is fired when the visual has been invalidated
         * @type {string}
         */
        geotoolkit.welllog.header.LogVisualHeader.Events.VisualInvalidate = "";
        /**
         * This Event is fired when the visual visibility has been invalidated
         * @type {string}
         */
        geotoolkit.welllog.header.LogVisualHeader.Events.VisualVisibilityChanged = "";
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.copyConstructor = function(){};
    /**
     * Dispose node. Clear all listeners
     * and disconnect style to avoid memory
     * leaks
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.dispose = function(){};
    /**
     * Return visibility of the header
     *
     * @returns {boolean} true if header itself and associated LogVisual is visible
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getVisible = function(){};
    /**
     * Specify desired layout style
     * @param {geotoolkit.layout.LayoutStyle | object} layoutStyle desired layout style
     * @returns {geotoolkit.welllog.header.LogVisualHeader}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setLayoutStyle = function(layoutStyle){};
    /**
     * return desired layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getLayoutStyle = function(){};
    /**
     * Return header container
     * @returns {geotoolkit.welllog.HeaderContainer} header container
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getHeaderContainer = function(){};
    /**
     * Return header container
     * @returns {geotoolkit.welllog.HeaderContainer} header container
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getTrackHeader = function(){};
    /**
     * Invalidate area of the shape. This method invalidates parent by default. invalidated from parent to root node.
     * @param {geotoolkit.util.Rect | undefined | null} [bounds] bounds of the invalid rectangle in the inner node coordinates
     * @param {boolean} [force=false] true if parent should be invalidated immediately
     * if null is provided then cache (if any will be completely refreshed) otherwise only specified rect or node.bounds will be refreshed
     * @returns {geotoolkit.welllog.header.LogVisualHeader} this
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.invalidate = function(bounds, force){};
    /**
     * Returns highlight options
     * @returns {object}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getHighlightOptions = function(){};
    /**
     * Set highlight options
     * @param {?object|null} options highlight options
     * @param {boolean} [options.highlight=true] highlight flag
     * @param {?geotoolkit.attributes.LineStyle|string} [options.linestyle] line style
     * @param {?geotoolkit.attributes.FillStyle|string} [options.fillstyle] fill style
     * @returns {geotoolkit.welllog.header.LogVisualHeader}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setHighlightOptions = function(options){};
    /**
     * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
     * @returns {geotoolkit.welllog.header.LogVisualHeader} this
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.invalidateLayout = function(){};
    /**
     * Return line style
     *
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getLineStyle = function(){};
    /**
     * Sets a line style
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.LogVisualHeader} this
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Return fill style
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getFillStyle = function(){};
    /**
     * Sets fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.LogVisualHeader}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Sets border line style
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.LogVisualHeader} this
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setBorderLineStyle = function(lineStyle, merge){};
    /**
     * Gets border line style
     *
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getBorderLineStyle = function(){};
    /**
     * Sets a current text style
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.LogVisualHeader} this
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * Return a current text style
     *
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getTextStyle = function(){};
    /**
     * Draws a rectangle at the model limits and fill it with specified fillStyle
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @param {geotoolkit.attributes.FillStyle} [fillStyle] Fill Style for the rectangle
     * @returns {geotoolkit.welllog.header.LogVisualHeader}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.fillBorder = function(context, fillStyle){};
    /**
     * Stroke border with specified
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @param {geotoolkit.attributes.LineStyle | string | object} [borderLineStyle] the LineStyle for the border
     * @returns {geotoolkit.welllog.header.LogVisualHeader}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.drawBorder = function(context, borderLineStyle){};
    /**
     * Sets model limits
     *
     * @param {geotoolkit.util.Rect} modelLimits desired model Limits
     * @returns {geotoolkit.welllog.header.LogVisualHeader}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setModelLimits = function(modelLimits){};
    /**
     * Return model limits
     *
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getModelLimits = function(){};
    /**
     * Return header desired height
     *
     * @returns {number}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getDesiredHeight = function(){};
    /**
     * Return bound in the parent coordinates
     *
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getBounds = function(){};
    /**
     * Sets bounds of the curve in the parent coordinates and set up auto bounds
     * false
     *
     * @param {geotoolkit.util.Rect} bounds bounds of the curve in the parent coordinates
     * @returns {geotoolkit.welllog.header.LogVisualHeader} this
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setBounds = function(bounds){};
    /**
     * Enable or disable auto bounds If auto bounds is enabled then it equals to
     * parent model limits
     *
     * @param {boolean} enable Enable or disable auto bounds
     * @returns {geotoolkit.welllog.header.LogVisualHeader}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setAutoBounds = function(enable){};
    /**
     * Return current transformation
     *
     * @returns {geotoolkit.util.Transformation|null}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getContentsTransform = function(){};
    /**
     * <code>getWorldTransform</code> retrieves the local transformation
     * of the node which represents multiplication of parent to bounds and
     * contents transformations.
     *
     * @override
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getWorldTransform = function(){};
    /**
     * Enable automatic bounds. If auto bounds is enabled then it equals to
     * parent model limits
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.isAutoBounds = function(){};
    /**
     * Gets visual to be used to render header
     * @returns {geotoolkit.welllog.LogAbstractVisual} visual
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getVisual = function(){};
    /**
     * Returns the displayed mode value
     *
     * @returns {*}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getDisplayMode = function(){};
    /**
     * Sets the displayed mode value
     * @param {*} displayMode header display mode
     * @returns {geotoolkit.welllog.header.LogVisualHeader}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setDisplayMode = function(displayMode){};
    /**
     * Returns the displayed value
     *
     * @returns {string} displayString
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getDisplayString = function(){};
    /**
     * Sets the displayed value
     * @param {string} displayString the displayed value
     * @returns {geotoolkit.welllog.header.LogVisualHeader}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setDisplayString = function(displayString){};
    /**
     * Returns 0
     *
     * @returns {number}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getDisplayValue = function(){};
    /**
     * Returns the displayed depth value
     *
     * @returns {number}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getDisplayDepth = function(){};
    /**
     * Check culling
     * Returns true if object is inside of renderable area
     *
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean}
     * @this {geotoolkit.scene.Node}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.checkCollision = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.welllog.LogAbstractVisual} [properties.visual] visual
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.textstyle] the text style
     * @param {geotoolkit.attributes.LineStyle | string | object} [properties.linestyle] the line style
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.fillstyle] the fill style
     * @param {geotoolkit.attributes.LineStyle | string | object} [properties.borderlinestyle] border line style
     * @param {geotoolkit.util.Rect} [properties.modellimits] desired model Limits
     * @param {geotoolkit.util.Rect} [properties.bounds] bounds of the curve in the parent coordinates
     * @param {boolean} [properties.autobounds] automatic calculation of header size on or off
     * @param {number} [properties.depth] depth
     * @param {object} [properties.displaymode] display mode
     * @param {string} [properties.displaystring] display string
     * @returns {geotoolkit.welllog.header.LogVisualHeader} this
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.setProperties = function(properties){};
    /**
     * for internal use only, make text always readable
     * @protected
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {number} [x] x position to place text
     * @param {number} [y] y position to place text
     * @param {string} [text] text to be displayed
     * @param {geotoolkit.attributes.TextStyle} [style] text style
     * @param {geotoolkit.util.AnchorType} [alignment] alignment for placement of text
     * @param {number|null} [theta] of rotation
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.drawText = function(context, x, y, text, style, alignment, theta){};
    /**
     * Returns bounding box of the text
     * @protected
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     * @param {number} [x] x position to place text
     * @param {number} [y] y position to place text
     * @param {string} [text] text to be displayed
     * @param {geotoolkit.attributes.TextStyle} [style] text style
     * @param {geotoolkit.util.AnchorType} [alignment] alignment for placement of text
     * @param {number|null} [theta] of rotation
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.getTextBoundingBox = function(context, x, y, text, style, alignment, theta){};
    /**
     * Returns biggest text in specified width
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @param {string} text Text to calculate the size for
     * @param {number} maxLen max length available for the text
     *
     * @returns {string}
     */
    geotoolkit.welllog.header.LogVisualHeader.prototype.checkTextSize = function(context, text, maxLen){};

/**
 * Define visual to render composite curve header
 *
 * @class geotoolkit.welllog.header.LogCompositeVisualHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @implements geotoolkit.scene.INodeEnumerable
 * @param {geotoolkit.scene.Node} [visual] visual for the header
 */
geotoolkit.welllog.header.LogCompositeVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.copyConstructor = function(){};
    /**
     * @override
     * @param {geotoolkit.welllog.LogAbstractVisual} visual visual
     * @returns {geotoolkit.welllog.header.LogCompositeVisualHeader} this
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.setVisual = function(visual){};
    /**
     * Return header desired height
     *
     * @returns {number}
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.getDesiredHeight = function(){};
    /**
     * Sets desired height of the header as a layoutable object
     * @param {string | number} value desired height to set
     * @returns {geotoolkit.welllog.header.LogCompositeVisualHeader} this
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.setDesiredHeight = function(value){};
    /**
     * specify desired layout style
     * @param {geotoolkit.layout.LayoutStyle|object} layoutStyle desired layout style
     * @param {boolean} [silent=false] silent setting
     * @returns {geotoolkit.welllog.header.LogCompositeVisualHeader}
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.setLayoutStyle = function(layoutStyle, silent){};
    /**
     * return desired layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.getLayoutStyle = function(){};
    /**
     * @param {boolean} mode Model Limits Logics to be used
     * @returns {geotoolkit.welllog.header.LogCompositeVisualHeader} this
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.setAutoModelLimitsMode = function(mode){};
    /**
     * Get Model Limits Logics to use when no Model Limits have been set
     * set to true: will use parents width and height, starting at 0
     * set to false: will use parents bounds
     * @returns {boolean} mode
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.getAutoModelLimitsMode = function(){};
    /**
     * Sets inner model limits
     *
     * @param {geotoolkit.util.Rect} modelLimits inner limits
     * @returns {geotoolkit.welllog.header.LogCompositeVisualHeader} this
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.setModelLimits = function(modelLimits){};
    /**
     * Gets model limits, the limits of this container inside space
     *
     * @returns {geotoolkit.util.Rect | null} the current model limits
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.getModelLimits = function(){};
    /**
     * Associate layout with a group.
     * @param {geotoolkit.layout.Layout} layout layout to be set
     * @returns {geotoolkit.welllog.header.LogCompositeVisualHeader} this
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.setLayout = function(layout){};
    /**
     * Returns layout associated with the group
     * @returns {geotoolkit.layout.Layout} layout
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.getLayout = function(){};
    /**
     * Add a child node
     *
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node> | geotoolkit.util.Iterator} node the child node to be added
     * @returns {geotoolkit.welllog.header.LogCompositeVisualHeader}
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.addChild = function(node){};
    /**
     * Return iterator by child nodes
     *
     * @param {function()} [filter] a filter function. Returns all nodes if null
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.getChildren = function(filter){};
    /**
     * Remove child node
     *
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node>} node node or array of nodes to be removed
     * @returns {geotoolkit.welllog.header.LogCompositeVisualHeader} this
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.removeChild = function(node){};
    /**
     * Remove all child nodes from this composite group
     * @param {boolean} [disposeChildren=false] automatically dispose children. If it is
     * true then method dispose is called for each child.
     * @returns {geotoolkit.welllog.header.LogCompositeVisualHeader} this
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.clearChildren = function(disposeChildren){};
    /**
     * Return node by index
     *
     * @param {number} i
     * index of the node
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.getChild = function(i){};
    /**
     * Return number of child nodes
     *
     * @returns {number}
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.getChildrenCount = function(){};
    /**
     * @param {function(node, target)} callback callback
     * @param {object} target target
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.enumerateNodes = function(callback, target){};
    /**
     * Mark this group to be updated.
     * @param {geotoolkit.util.Rect[]} [regions] optional array to return invalid rectangles
     * @param {geotoolkit.scene.Node.StateChanges} [changes] optional parameter to specify a reason of changes
     * @returns {geotoolkit.welllog.header.LogCompositeVisualHeader} this
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.updateState = function(regions, changes){};
    /**
     * @override
     * @returns {geotoolkit.welllog.header.LogCompositeVisualHeader}
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.setBounds = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.header.LogCompositeVisualHeader.prototype.render = function(context){};

/**
 * Define visual to render curve header
 *
 * @class geotoolkit.welllog.header.AccumulationCycleHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @param {geotoolkit.scene.Node} [visual] visual for the header
 */
geotoolkit.welllog.header.AccumulationCycleHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.AccumulationCycleHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.AccumulationCycleHeader.prototype.copyConstructor = function(){};
    /**
     * @override
     */
    geotoolkit.welllog.header.AccumulationCycleHeader.prototype.updateState = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} inputContext Rendering Context
     */
    geotoolkit.welllog.header.AccumulationCycleHeader.prototype.render = function(inputContext){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.header.AccumulationCycleHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.welllog.header.AccumulationCycleHeader}
     */
    geotoolkit.welllog.header.AccumulationCycleHeader.prototype.setProperties = function(properties){};

/**
 * @class geotoolkit.welllog.header.AdaptiveLogVisualHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @param {?geotoolkit.welllog.LogAbstractVisual} visual visual
 *
 *
 *@example
 * var header = new geotoolkit.welllog.header.AdaptiveLogVisualHeader();
 * // Add custom 'ElementA' with a _static_ text 'MyCustomText'
 * // that can be cut on the left side (if no room for the whole string)
 * header.setElement('ElementA', { 'cut': 'left-to-right', 'text': 'MyCustomText' });
 *
 *@example
 * // 'updatemethod' format (for textual elements):
 * param {!geotoolkit.welllog.header.LogVisualHeader} header
 * param {geotoolkit.util.NumberFormat} [numberFormat]
 * return {object} updated object
 * updateMyTextElement = function (header, numberFormat) {...}
 *
 *
 *@example
 * // 'drawmethod' format (for graphical elements):
 * param {geotoolkit.welllog.header.LogVisualHeader} header
 * param {geotoolkit.util.Rect} rect header's area
 * param {geotoolkit.renderer.RenderingContext} context
 * drawMyShape = function (header, rect, context) {...}
 *
 */
geotoolkit.welllog.header.AdaptiveLogVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.AdaptiveLogVisualHeader.prototype.copyConstructor = function(){};
    /**
     * Sets text style for all textual elements
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.AdaptiveLogVisualHeader} this
     */
    geotoolkit.welllog.header.AdaptiveLogVisualHeader.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * Gets header elements with their parameters.
     * NOTE: deep copy of elements is created and returned.
     * @returns {Array} header elements
     */
    geotoolkit.welllog.header.AdaptiveLogVisualHeader.prototype.getElements = function(){};
    /**
     * Sets header element's parameters.
     * @param {string|Array|object} names names include<br>
     * (a) element name or <br>
     * (b) an array of element names or <br>
     * (c) JSON-object with entries in the form of: "an_element_name": { the_element_JSON_options }
     * (see second parameter description for details)
     * @param {object} [options] options to set
     * @param {boolean} [options.visible=true] visibility flag
     * @param {string} [options.text] static text for textual element(s)
     * @param {string} [options.cut] values supported: 'left-to-right', 'right-to-left' and undefined (no cut is allowed)
     * @param {geotoolkit.attributes.TextStyle | string | object} [options.textstyle=this.getTextStyle()] text style for textual element(s)
     * @param {function} [options.updatemethod] callback for textual element's contents update
     * @param {function} [options.drawmethod] callback for non-textual element's contents update
     * @param {geotoolkit.util.NumberFormat} [options.numberformat=undefined] number format
     * @param {string} [options.verticalpos='top'] values supported: 'top', 'bottom', 'center'
     * @param {string} [options.horizontalpos='center'] values supported: 'left', 'right', 'center'
     *
     * @returns {geotoolkit.welllog.header.AdaptiveLogVisualHeader} this
     */
    geotoolkit.welllog.header.AdaptiveLogVisualHeader.prototype.setElement = function(names, options){};
    /**
     * Gets general settings.
     * NOTE: deep copy of settings is created and returned.
     * @returns {object} settings
     */
    geotoolkit.welllog.header.AdaptiveLogVisualHeader.prototype.getSettings = function(){};
    /**
     * Sets settings element's parameters.
     * @param {object} settings settings
     * @param {number} [settings.gap==5] gap value in pixels
     * @param {Array} [settings.order] spatial order of textual elements:
     * first "Left-to-right" then "top-to-bottom":
     * @param {Array} [settings.priority] "least-to-most" important textual elements
     * @param {object} [settings.padding] padding
     * @param {number} [settings.padding.left = 0] left padding
     * @param {number} [settings.padding.right = 0] right padding
     * @param {number} [settings.padding.top = 0] top padding
     * @param {number} [settings.padding.bottom = 0] bottom padding
     * @returns {geotoolkit.welllog.header.AdaptiveLogVisualHeader} this
     */
    geotoolkit.welllog.header.AdaptiveLogVisualHeader.prototype.setSettings = function(settings){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.AdaptiveLogVisualHeader.prototype.render = function(){};
    /**
     * Gets all the properties pertaining to the header
     * @returns {object} header properties
     */
    geotoolkit.welllog.header.AdaptiveLogVisualHeader.prototype.getProperties = function(){};
    /**
     * Sets properties pertaining to this object
     * @param {object} properties object containing properties to set
     * @param {object} properties.element element properties
     * @param {object} properties.element.elementName see {@link geotoolkit.welllog.header.AdaptiveLogVisualHeader#setElement}
     * @returns {geotoolkit.welllog.header.AdaptiveLogVisualHeader} this
     */
    geotoolkit.welllog.header.AdaptiveLogVisualHeader.prototype.setProperties = function(properties){};
    /**
     * Sets vertical header
     * @param {boolean} vertical true, if vertical header, else false
     * @returns {geotoolkit.welllog.header.AdaptiveLogVisualHeader} this
     */
    geotoolkit.welllog.header.AdaptiveLogVisualHeader.prototype.setVertical = function(vertical){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.AdaptiveLogVisualHeader.prototype.dispose = function(){};

/**
 * This header contains elements: ScaleFrom, Name, Description, Tracking, Unit, ScaleTo, Axis, Fill, Line, Symbol
 * @class geotoolkit.welllog.header.AdaptiveLogCurveVisualHeader
 * @augments geotoolkit.welllog.header.AdaptiveLogVisualHeader
 * @param {?geotoolkit.welllog.LogAbstractVisual} visual visual
 *
 * @example
 * // This example shows how to change the labels color beside the curve line on the header.
 * widget.setCss(new geotoolkit.css.CssStyle(
 * {
 * 'css': [.geotoolkit.welllog.header.AdaptiveLogCurveVisualHeader {',
 * ' element-tracking-textstyle-font : bold 10px Roboto;',
 * ' element-tracking-textstyle-color : #C8C8C8;',
 * ' element-name-textstyle-font : bold 10px Roboto;',
 * ' element-name-textstyle-color : #C8C8C8;',
 * ' element-scalefrom-textstyle-font : bold 10px Roboto;',
 * ' element-scalefrom-textstyle-color : #C8C8C8;',
 * ' element-scaleto-textstyle-font : bold 10px Roboto;',
 * ' element-scaleto-textstyle-color : #C8C8C8;',
 * '}'
 * ].join('')
 * });
 */
geotoolkit.welllog.header.AdaptiveLogCurveVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.AdaptiveLogCurveVisualHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.AdaptiveLogCurveVisualHeader.prototype.copyConstructor = function(){};
    /**
     * Sets symbol to be used
     *
     * @param {geotoolkit.scene.shapes.Symbol} symbol symbol to be used
     * @returns {geotoolkit.welllog.header.AdaptiveLogCurveVisualHeader} this
     */
    geotoolkit.welllog.header.AdaptiveLogCurveVisualHeader.prototype.setSymbol = function(symbol){};
    /**
     * Gets symbol
     *
     * @returns {geotoolkit.scene.shapes.Symbol}
     */
    geotoolkit.welllog.header.AdaptiveLogCurveVisualHeader.prototype.getSymbol = function(){};

/**
 * Define visual to render curve header
 *
 * @class geotoolkit.welllog.header.LogFillVisualHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @param {geotoolkit.welllog.LogFill}[visual] visual visual for curve header
 */
geotoolkit.welllog.header.LogFillVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogFillVisualHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogFillVisualHeader.prototype.copyConstructor = function(){};
    /**
     * Sets a current text style for displayed value
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.LogFillVisualHeader} this
     */
    geotoolkit.welllog.header.LogFillVisualHeader.prototype.setDisplayNamesTextStyle = function(textStyle, merge){};
    /**
     * Return a current text style for displayed value
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.header.LogFillVisualHeader.prototype.getDisplayNamesTextStyle = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogFillVisualHeader.prototype.render = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.header.LogFillVisualHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.scene.shapes.Symbol} [properties.symbol] symbol to be used
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.displayvaluetextstyle] display value textstyle
     * @returns {geotoolkit.welllog.header.LogFillVisualHeader} this
     */
    geotoolkit.welllog.header.LogFillVisualHeader.prototype.setProperties = function(properties){};

/**
 * Define visual to render curve header
 *
 * @class geotoolkit.welllog.header.LogLithologyHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @param {geotoolkit.scene.Node} [visual] visual for the header
 */
geotoolkit.welllog.header.LogLithologyHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogLithologyHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogLithologyHeader.prototype.copyConstructor = function(){};
    /**
     * Enum of lithography header display types
     * @readonly
     * @enum
     */
    geotoolkit.welllog.header.LogLithologyHeader.HeaderType = {};
        /**
         * Default (TextInside) display type
         * @type {string}
         */
        geotoolkit.welllog.header.LogLithologyHeader.HeaderType.Default = "";
        /**
         * Text will appear centered and inside the key rectangles.
         * @type {string}
         */
        geotoolkit.welllog.header.LogLithologyHeader.HeaderType.FullWidth = "";
        /**
         * Text will appear legend-style outside the key rectangles, with the boxes to the left
         * @type {string}
         */
        geotoolkit.welllog.header.LogLithologyHeader.HeaderType.BoxesLeft = "";
        /**
         * Text will appear legend-style outside the key rectangles, with the boxes to the right
         * @type {string}
         */
        geotoolkit.welllog.header.LogLithologyHeader.HeaderType.BoxesRight = "";
        /**
         * Text will appear vertically legend-style outside the key rectangles, with the boxes to the top
         * @type {string}
         */
        geotoolkit.welllog.header.LogLithologyHeader.HeaderType.VerticalBoxesRight = "";
    /**
     * Sets Header Type
     *
     * @param {geotoolkit.welllog.header.LogLithologyHeader.HeaderType} type Enum of lithography header display types
     * @returns {geotoolkit.welllog.header.LogLithologyHeader} this
     */
    geotoolkit.welllog.header.LogLithologyHeader.prototype.setHeaderType = function(type){};
    /**
     * Gets the current header type
     *
     * @returns {geotoolkit.welllog.header.LogLithologyHeader.HeaderType}
     */
    geotoolkit.welllog.header.LogLithologyHeader.prototype.getHeaderType = function(){};
    /**
     * Sets a current text style for displayed value
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.LogLithologyHeader} this
     */
    geotoolkit.welllog.header.LogLithologyHeader.prototype.setDisplayValueTextStyle = function(textStyle, merge){};
    /**
     * Return a current text style for displayed value
     *
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.header.LogLithologyHeader.prototype.getDisplayValueTextStyle = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} inputContext Rendering Context
     */
    geotoolkit.welllog.header.LogLithologyHeader.prototype.render = function(inputContext){};
    /**
     * Update state.
     * @override
     * @returns {geotoolkit.welllog.header.LogLithologyHeader} this
     */
    geotoolkit.welllog.header.LogLithologyHeader.prototype.updateState = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.header.LogLithologyHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.displayvaluetextstyle] display value textstyle
     * @param {geotoolkit.scene.shapes.Symbol} [properties.symbol] symbol to set
     * @param {object} [properties.headertype] Enum of header type
     * @returns {geotoolkit.welllog.header.LogLithologyHeader} this
     */
    geotoolkit.welllog.header.LogLithologyHeader.prototype.setProperties = function(properties){};

/**
 * Define visual to render curve header
 *
 * @class geotoolkit.welllog.header.Log2DVisualHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @param {geotoolkit.welllog.Log2DVisual} [visual] visual for the header
 */
geotoolkit.welllog.header.Log2DVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.copyConstructor = function(){};
    /**
     * Sets a current text style for displayed value
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.Log2DVisualHeader}
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.setDisplayValueTextStyle = function(textStyle, merge){};
    /**
     * Return a current text style for displayed value
     *
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.getDisplayValueTextStyle = function(){};
    /**
     * @override
     * @param {geotoolkit.renderer.RenderingContext} inputContext Rendering Context
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.render = function(inputContext){};
    /**
     * Fill the rectangle (model limits)
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {geotoolkit.welllog.header.Log2DVisualHeader}
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.fillRectangle = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.displayvaluetextstyle] Text Style
     * @returns {geotoolkit.welllog.header.Log2DVisualHeader} this
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.setProperties = function(properties){};
    /**
     * Returns the number formatter for the min value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.getMinValueFormat = function(){};
    /**
     * Returns the number formatter for the max value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.getMaxValueFormat = function(){};
    /**
     * Sets the number formatter for the min value
     * @param {geotoolkit.util.NumberFormat} format number format
     * @returns {geotoolkit.welllog.header.Log2DVisualHeader}
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.setMinValueFormat = function(format){};
    /**
     * Sets the number formatter for the max value
     * @param {geotoolkit.util.NumberFormat} format number format
     * @returns {geotoolkit.welllog.header.Log2DVisualHeader}
     */
    geotoolkit.welllog.header.Log2DVisualHeader.prototype.setMaxValueFormat = function(format){};

/**
 * @class geotoolkit.welllog.header.CompositeLog2DVisualHeader
 * @augments geotoolkit.welllog.header.LogCompositeVisualHeader
 * @param {?geotoolkit.welllog.LogAbstractVisual} [visual] visual for the header
 */
geotoolkit.welllog.header.CompositeLog2DVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.CompositeLog2DVisualHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.CompositeLog2DVisualHeader.prototype.copyConstructor = function(){};
    /**
     * @override
     * @param {string} event broadcast event
     * @param {geotoolkit.scene.Node} source who is initializing this event
     * @param {object} args additional parameter
     */
    geotoolkit.welllog.header.CompositeLog2DVisualHeader.prototype.notify = function(event, source, args){};
    /**
     * Return header options
     * @returns {object} options header options
     * @returns {object} [options.colorbar] color bar options @see {@link geotoolkit.controls.shapes.ColorBar.getOptions}
     */
    geotoolkit.welllog.header.CompositeLog2DVisualHeader.prototype.getOptions = function(){};
    /**
     * Set header options
     * @param {object} options header options
     * @param {object} [options.colorbar] colorbar options @see {@link geotoolkit.controls.shapes.ColorBar.setOptions}
     * @returns {geotoolkit.welllog.header.CompositeLog2DVisualHeader} this
     */
    geotoolkit.welllog.header.CompositeLog2DVisualHeader.prototype.setOptions = function(options){};
    /**
     * Returns tick generator using for color bar
     * @returns {geotoolkit.axis.TickGenerator}
     */
    geotoolkit.welllog.header.CompositeLog2DVisualHeader.prototype.getTickGenerator = function(){};
    /**
     * Set color bar tick generator
     * @param {geotoolkit.axis.TickGenerator} tickGenerator color bar tick generator
     * @returns {geotoolkit.welllog.header.CompositeLog2DVisualHeader}
     */
    geotoolkit.welllog.header.CompositeLog2DVisualHeader.prototype.setTickGenerator = function(tickGenerator){};

/**
 * Define visual to render curve header
 *
 * @class geotoolkit.welllog.header.LogCurveVisualHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @param {geotoolkit.scene.Node} [visual] visual for the header
 */
geotoolkit.welllog.header.LogCurveVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.copyConstructor = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.dispose = function(){};
    /**
     * Sets a current text style for displayed value
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.LogCurveVisualHeader} this
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.setDisplayValueTextStyle = function(textStyle, merge){};
    /**
     * Return a current text style for displayed value
     *
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.getDisplayValueTextStyle = function(){};
    /**
     * Sets symbol to be used
     *
     * @param {geotoolkit.scene.shapes.Symbol} symbol symbol to be used
     * @returns {geotoolkit.welllog.header.LogCurveVisualHeader} this
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.setSymbol = function(symbol){};
    /**
     * Gets symbol
     *
     * @returns {geotoolkit.scene.shapes.Symbol}
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.getSymbol = function(){};
    /**
     * Sets inline mode
     *
     * @param {boolean} inline mode to draw everything in one line
     * @returns {geotoolkit.welllog.header.LogCurveVisualHeader} this
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.setInline = function(inline){};
    /**
     * gets inline mode
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.getInline = function(){};
    /**
     * Return marker depth to be used to display value. By default it is nan and value is not displayed
     * @returns {number}
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.getDisplayMarkerDepth = function(){};
    /**
     * Returns the number formatter for the min value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.getMinValueFormat = function(){};
    /**
     * Sets the number formatter for the min value
     * @param {geotoolkit.util.NumberFormat} format number formatter
     * @returns {geotoolkit.welllog.header.LogCurveVisualHeader} this
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.setMinValueFormat = function(format){};
    /**
     * Returns the number formatter for the max value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.getMaxValueFormat = function(){};
    /**
     * Sets the number formatter for the max value
     * @param {geotoolkit.util.NumberFormat} format number formatter
     * @returns {geotoolkit.welllog.header.LogCurveVisualHeader} this
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.setMaxValueFormat = function(format){};
    /**
     * Returns the number formatter for the value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.getValueFormat = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.updateState = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.render = function(){};
    /**
     * Gets value at last, first or custom depth position
     * @override
     * @returns {number}
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.getDisplayValue = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.displayvaluetextstyle] text style of the displayed value
     * @param {geotoolkit.scene.shapes.Symbol} [properties.symbol] symbol to be displayed
     * @param {boolean} [properties.inline] draw inline or no
     * @param {geotoolkit.util.NumberFormat} [properties.minvalueformat] number format
     * @param {geotoolkit.util.NumberFormat} [properties.maxvalueformat] number format
     * @param {geotoolkit.util.NumberFormat} [properties.valueformat] number format for value
     * @returns {geotoolkit.welllog.header.LogCurveVisualHeader} this
     */
    geotoolkit.welllog.header.LogCurveVisualHeader.prototype.setProperties = function(properties){};

/**
 * Define visual to render discrete curve header
 *
 * @class geotoolkit.welllog.header.LogDiscreteCurveVisualHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @param {geotoolkit.welllog.header.LogVisualHeader} [visual] visual for discrete curve header
 */
geotoolkit.welllog.header.LogDiscreteCurveVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.prototype.copyConstructor = function(){};
    /**
     * Enum defining Orientation values
     * @enum
     * @readonly
     */
    geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.Orientation = {};
        /**
         * Vertical
         * @type {string}
         */
        geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.Orientation.Vertical = "";
        /**
         * Horizontal
         * @type {string}
         */
        geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.Orientation.Horizontal = "";
    /**
     * Sets header orientation
     *
     * @param {geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.Orientation} orientation header orientation
     * @returns {geotoolkit.welllog.header.LogDiscreteCurveVisualHeader} this
     */
    geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.prototype.setOrientation = function(orientation){};
    /**
     * Returns header orientation
     *
     * @returns {geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.Orientation}
     */
    geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.prototype.getOrientation = function(){};
    /**
     * Set the visibility of curve name
     * @param {boolean} visible The visibility of the curve name
     * @returns {geotoolkit.welllog.header.LogDiscreteCurveVisualHeader}
     */
    geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.prototype.setCurveNameVisible = function(visible){};
    /**
     * Gets visibility of curve name
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.prototype.getCurveNameVisible = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.prototype.render = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.prototype.getDesiredHeight = function(){};
    /**
     * @override
     */
    geotoolkit.welllog.header.LogDiscreteCurveVisualHeader.prototype.updateState = function(){};

/**
 * Defines default header implementation for {geotoolkit.welllog.CompositeLogCurve} visual
 *
 * @class geotoolkit.welllog.header.CompositeLogCurveHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @param {geotoolkit.welllog.LogAbstractVisual} visual header implementation for visual
 */
geotoolkit.welllog.header.CompositeLogCurveHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.copyConstructor = function(){};
    /**
     * Return header desired height
     *
     * @returns {number}
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.getDesiredHeight = function(){};
    /**
     * Sets a current text style for displayed value
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.CompositeLogCurveHeader}
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.setDisplayValueTextStyle = function(textStyle, merge){};
    /**
     * Return a current text style for displayed value
     *
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.getDisplayValueTextStyle = function(){};
    /**
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering context
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.render = function(context){};
    /**
     * @override
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.updateState = function(){};
    /**
     * Return marker depth to be used to display value. By default it is nan and value is not displayed
     * @returns {number}
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.getDisplayMarkerDepth = function(){};
    /**
     * Returns the number formatter for the min value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.getMinValueFormat = function(){};
    /**
     * Returns the number formatter for the max value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.getMaxValueFormat = function(){};
    /**
     * Returns the number formatter for the value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.getValueFormat = function(){};
    /**
     * Update unit in header
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.updateUnit = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties See geotoolkit.welllog.header.CompositeLogCurveHeader.setProperties for details.
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.displayvaluetextstyle] text style of the display value
     * @param {geotoolkit.util.NumberFormat} [properties.minvalueformat] NumberFormat
     * @param {geotoolkit.util.NumberFormat} [properties.maxvalueformat] NumberFormat
     * @param {geotoolkit.util.NumberFormat} [properties.valueformat] NumberFormat
     * @returns {geotoolkit.welllog.header.CompositeLogCurveHeader} this
     */
    geotoolkit.welllog.header.CompositeLogCurveHeader.prototype.setProperties = function(properties){};

/**
 * Create the standard representation of a well log header provider.
 *
 * @class geotoolkit.welllog.header.LogVisualHeaderProvider
 */
geotoolkit.welllog.header.LogVisualHeaderProvider = {};
    /**
     * return name of provider
     * @returns {string}
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.getName = function(){};
    /**
     * set name
     * @param {string} name name of the header provider
     * @returns {geotoolkit.welllog.header.LogVisualHeaderProvider} this
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.setName = function(name){};
    /**
     * set margin in pixels between header
     * @deprecated since 2.5 use geotoolkit.welllog.HeaderContainer.setMargin() and setPadding() instead
     * @param {number} margin margin in pixels between header
     * @returns {geotoolkit.welllog.header.LogVisualHeaderProvider}
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.setMargin = function(margin){};
    /**
     * return margin in pixels between header
     * @returns {number}
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.getMargin = function(){};
    /**
     * Gets header helpers
     * @returns {Object}
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.getHeaderHelpers = function(){};
    /**
     * Returns header instance associated with specified visual
     * @param {geotoolkit.welllog.LogAbstractVisual} node specified visual
     * @returns {geotoolkit.welllog.header.LogVisualHeader | null} header
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.getHeader = function(node){};
    /**
     * Sets header
     * @param {geotoolkit.scene.Node} node current node
     * @param {object} headerInstance prototype to create the header instance
     * @returns {geotoolkit.welllog.header.LogVisualHeaderProvider}
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.registerHeader = function(node, headerInstance){};
    /**
     * Sets header helper
     * @param {string} className class name for visual
     * @param {geotoolkit.scene.Node} headerInstance prototype to create the header instance
     * @returns {geotoolkit.welllog.header.LogVisualHeaderProvider}
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.registerHeaderProvider = function(className, headerInstance){};
    /**
     * return default header implementation for specified class name
     * @param {string} className class name for visual
     * @returns {geotoolkit.welllog.header.LogVisualHeader}
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.getHeaderProvider = function(className){};
    /**
     * get header prototype
     * @param {geotoolkit.scene.Node} node type of visual to return
     * @returns {geotoolkit.welllog.header.LogVisualHeader}
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.getHeaderPrototype = function(node){};
    /**
     * Return default instance of the LogVisualHeaderProvider
     *
     * @returns {geotoolkit.welllog.header.LogVisualHeaderProvider} default instance
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.getDefaultInstance = function(){};
    /**
     * Returns clone
     * @returns {geotoolkit.welllog.header.LogVisualHeaderProvider} clone
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.clone = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {object} [properties.headerhelpers] see {@link geotoolkit.welllog.header.LogVisualHeaderProvider#registerHeaderProvider}
     * @param {string} [properties.name] name of the header provider
     * @param {number} [properties.margin] deprecated margin in pixels between header
     * @returns {geotoolkit.welllog.header.LogVisualHeaderProvider} this
     */
    geotoolkit.welllog.header.LogVisualHeaderProvider.prototype.setProperties = function(properties){};

/**
 * Define a base implementation of the track header. This class doesn't create
 * headers for track children
 *
 * @class geotoolkit.welllog.header.LogBaseTrackHeader
 * @augments geotoolkit.scene.CompositeNode
 * @implements geotoolkit.layout.ILayoutable
 *
 * @param {geotoolkit.welllog.LogTrack} track
 * [track] a log track to create header
 * @param {number} [height]
 * height of the track
 */
geotoolkit.welllog.header.LogBaseTrackHeader = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.welllog.header.LogBaseTrackHeader} src Source to copy from
     * @returns {geotoolkit.welllog.header.LogBaseTrackHeader} this
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.copyConstructor = function(src){};
    /**
     * Return track to create a header
     *
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getTrack = function(){};
    /**
     * Returns track visibility if track is not null, true instead
     * @override
     * @returns {boolean}
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getVisible = function(){};
    /**
     * Returns bounds
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getBounds = function(){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect} bounds bounds of the node
     * @returns {geotoolkit.welllog.header.LogBaseTrackHeader}
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.setBounds = function(bounds){};
    /**
     * return desired layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getLayoutStyle = function(){};
    /**
     * Notify that layout is invalidated. Send event {@link geotoolkit.layout.Events.LayoutInvalidated}
     * @returns {geotoolkit.welllog.header.LogBaseTrackHeader} this
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.invalidateLayout = function(){};
    /**
     * @override
     * @param {string} event broadcast event
     * @param {geotoolkit.scene.Node} source who is initializing this event
     * @param {object} args additional parameter
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.notify = function(event, source, args){};
    /**
     * Return desired height of the header
     * @returns {number}
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getDesiredHeight = function(){};
    /**
     * Sets the border visibility
     *
     * @param {boolean} visible The visibility of the border
     * @returns {geotoolkit.welllog.header.LogBaseTrackHeader} this
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.setBorderVisibility = function(visible){};
    /**
     * Gets the header border's visibility.
     *
     * @returns {boolean}visibility The visibility of the header border.
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getBorderVisibility = function(){};
    /**
     * Sets the border line style
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle The style in which the line is displayed
     * object can be in format of constructor of geotoolkit.attributes.LineStyle
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.LogBaseTrackHeader} this
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.setBorderLineStyle = function(lineStyle, merge){};
    /**
     * Gets the border line style
     *
     * @returns {geotoolkit.attributes.LineStyle|null} style The line style of the border.
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getBorderLineStyle = function(){};
    /**
     * Sets the border fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.LogBaseTrackHeader} this
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.setBorderFillStyle = function(fillStyle, merge){};
    /**
     * Gets the border fill style
     *
     * @returns {geotoolkit.attributes.FillStyle|null} style The fill style of the border.
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getBorderFillStyle = function(){};
    /**
     * Mark this group to be updated.
     * @override
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.updateState = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.render = function(context){};
    /**
     * Gets transformation
     * @override
     * @returns {geotoolkit.util.Transformation|null} transform
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getContentsTransform = function(){};
    /**
     * Get models limits
     *
     * @override
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getModelLimits = function(){};
    /**
     * Update layout of the children headers
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.updateLayout = function(){};
    /**
     * Rebuild
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.rebuild = function(){};
    /**
     * invalidate Method
     * @returns {function} method to invalidate this object
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getInvalidateMethod = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.welllog.LogTrack} [properties.track] a log track to create header
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.borderfillstyle] see {@link geotoolkit.welllog.header.LogBaseTrackHeader#setBorderFillStyle}
     * @param {geotoolkit.attributes.LineStyle | string | object} [properties.borderlinestyle] The line style of the border. See {@link geotoolkit.welllog.header.LogBaseTrackHeader#setBorderLineStyle}
     * @param {object} [properties.borders] see {@link geotoolkit.scene.shapes.Border#setBorder}
     * @param {boolean} [properties.isbordervisible] The visibility of the border
     * @param {geotoolkit.util.Rect} [properties.modellimits] model limits
     * @param {geotoolkit.util.Rect} [properties.bounds] bounds
     * @returns {geotoolkit.welllog.header.LogBaseTrackHeader} this
     */
    geotoolkit.welllog.header.LogBaseTrackHeader.prototype.setProperties = function(properties){};

/**
 * Define LogHeader
 * @class geotoolkit.welllog.header.LogTrackHeader
 * @augments geotoolkit.welllog.header.LogBaseTrackHeader
 * @implements geotoolkit.layout.ILayoutable
 * @param {geotoolkit.welllog.LogTrack} [track] a log track to create header
 * @param {geotoolkit.welllog.header.LogVisualHeaderProvider} [provider] provider of the headers
 */
geotoolkit.welllog.header.LogTrackHeader = {};
    /**
     * copyConstructor
     * @protected
     * @param {geotoolkit.welllog.header.LogTrackHeader} src Source to copy from
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.copyConstructor = function(src){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.dispose = function(){};
    /**
     * Sets header provider
     *
     * @param {geotoolkit.welllog.header.LogVisualHeaderProvider} provider header provider
     * @returns {geotoolkit.welllog.header.LogTrackHeader} this
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.setHeaderProvider = function(provider){};
    /**
     * Sets visible track title. This method removes all headers and build it
     * again.
     *
     * @param {boolean} visible defines track visibility
     * @returns {geotoolkit.welllog.header.LogTrackHeader}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.setVisibleTrackTitle = function(visible){};
    /**
     * Return true if track title is visible
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.isVisibleTrackHeader = function(){};
    /**
     * Sets order of the track title header.
     *
     * @param {boolean} titleFirst track child order
     * @returns {geotoolkit.welllog.header.LogTrackHeader}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.setTitleFirst = function(titleFirst){};
    /**
     * Return order of the track title header.
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.getTitleFirst = function(){};
    /**
     * Sets order of the track child headers.
     *
     * @param {boolean} firstToLast track child order
     * @returns {geotoolkit.welllog.header.LogTrackHeader} this
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.setFirstToLast = function(firstToLast){};
    /**
     * Return order of the track child headers
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.getFirstToLast = function(){};
    /**
     * Sets position of the track child headers.
     * @param {boolean} topToBottom track child order
     * @returns {geotoolkit.welllog.header.LogTrackHeader}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.setTopToBottom = function(topToBottom){};
    /**
     * Return position of the track child headers
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.getTopToBottom = function(){};
    /**
     * @override
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.rebuild = function(){};
    /**
     * Returns the current header provider
     *
     * @returns {geotoolkit.welllog.header.LogVisualHeaderProvider|null}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.getHeaderProvider = function(){};
    /**
     * Return desired height of the header
     * @returns {number}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.getDesiredHeight = function(){};
    /**
     * @override
     * @param {string} event broadcast event
     * @param {geotoolkit.scene.Node} source who is initializing this event
     * @param {object} args additional parameter
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.notify = function(event, source, args){};
    /**
     * Returns active visual
     * @returns {geotoolkit.welllog.LogAbstractVisual}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.getActiveVisual = function(){};
    /**
     * Set active visual
     * @param {geotoolkit.welllog.LogAbstractVisual} activeVisual new instance of the active visual
     * @returns {geotoolkit.welllog.header.LogTrackHeader} this
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.setActiveVisual = function(activeVisual){};
    /**
     * Update state. This methods reset node state and update state for children. This method is useful to
     * refresh a scene graph
     * @param {geotoolkit.util.Rect[]} [regions] optional array to return invalid rectangles
     * @param {geotoolkit.scene.Node.StateChanges} [changes] optional parameter to specify a reason of changes
     * @param {object} [args=null] event arguments
     * @returns {geotoolkit.welllog.header.LogTrackHeader} this
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.updateState = function(regions, changes, args){};
    /**
     * Update layout
     *
     * @override
     * @returns {geotoolkit.welllog.header.LogTrackHeader}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.updateLayout = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.welllog.header.LogVisualHeaderProvider} [properties.headerprovider] header provider
     * @param {boolean} [properties.visibletracktitle] defines track title header visibility
     * @param {boolean} [properties.titlefirst] defines track track title header order
     * @param {boolean} [properties.firsttolast] defines track item headers order
     * @param {boolean} [properties.toptobottom] defines position of the track child headers
     * @returns {geotoolkit.welllog.header.LogTrackHeader} this
     */
    geotoolkit.welllog.header.LogTrackHeader.prototype.setProperties = function(properties){};

/**
 * Define header for StackedTrack
 * @class geotoolkit.welllog.header.StackedTrackHeader
 * @augments geotoolkit.welllog.header.LogTrackHeader
 * @param {geotoolkit.welllog.LogTrack} [track] a log track to create header
 * @param {geotoolkit.welllog.header.LogVisualHeaderProvider} [provider] provider of the headers
 */
geotoolkit.welllog.header.StackedTrackHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.StackedTrackHeader.prototype.addVisualHeader = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.StackedTrackHeader.prototype.setHeaderProvider = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.StackedTrackHeader.prototype.initializeVisualHeaders = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.StackedTrackHeader.prototype.getDesiredHeight = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.StackedTrackHeader.prototype.setTopToBottom = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.StackedTrackHeader.prototype.setFirstToLast = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.StackedTrackHeader.prototype.dispose = function(){};

/**
 * Defines a container of log headers
 *
 * @class geotoolkit.welllog.HeaderContainer
 * @augments geotoolkit.scene.Group
 * @param {geotoolkit.welllog.header.LogVisualHeaderProvider} [provider] provider of header prototypes
 */
geotoolkit.welllog.HeaderContainer = {};
    /**
     * Enum defining Orientation values
     * @enum
     * @readonly
     */
    geotoolkit.welllog.HeaderContainer.DisplayType = {};
        /**
         * Default
         * @type {string}
         */
        geotoolkit.welllog.HeaderContainer.DisplayType.Default = "";
        /**
         * Maximized
         * @type {string}
         */
        geotoolkit.welllog.HeaderContainer.DisplayType.Maximized = "";
        /**
         * Minimized
         * @type {string}
         */
        geotoolkit.welllog.HeaderContainer.DisplayType.Minimized = "";
    /**
     * Set display type
     * @param {geotoolkit.welllog.HeaderContainer.DisplayType} displayType level of detail
     * @returns {geotoolkit.welllog.HeaderContainer} this
     */
    geotoolkit.welllog.HeaderContainer.prototype.setDisplayType = function(displayType){};
    /**
     * Returns display type
     * @returns {geotoolkit.welllog.HeaderContainer.DisplayType}
     */
    geotoolkit.welllog.HeaderContainer.prototype.getDisplayType = function(){};
    /**
     * Sets header provider
     *
     * @param {geotoolkit.welllog.header.LogVisualHeaderProvider} provider provider of header prototypes
     * @returns {geotoolkit.welllog.HeaderContainer} this
     */
    geotoolkit.welllog.HeaderContainer.prototype.setHeaderProvider = function(provider){};
    /**
     * Return a header provider
     *
     * @returns {geotoolkit.welllog.header.LogVisualHeaderProvider} header provider
     */
    geotoolkit.welllog.HeaderContainer.prototype.getHeaderProvider = function(){};
    /**
     * Add child
     * @override
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node>} node the child
     * @returns {geotoolkit.welllog.HeaderContainer} this
     */
    geotoolkit.welllog.HeaderContainer.prototype.addChild = function(node){};
    /**
     * Remove child node
     *
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node>} node node or array of nodes to be removed
     * @returns {geotoolkit.welllog.HeaderContainer} this
     */
    geotoolkit.welllog.HeaderContainer.prototype.removeChild = function(node){};
    /**
     * Insert child at given index
     * @override
     * @param {number} index position where to insert child
     * @param {geotoolkit.welllog.HeaderContainer} node the child
     */
    geotoolkit.welllog.HeaderContainer.prototype.insertChild = function(index, node){};
    /**
     * Return preferred size to layout children
     * @param {geotoolkit.util.Rect} [rect=null] desired rect to layout
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.HeaderContainer.prototype.getPreferredSize = function(rect){};
    /**
     * @override
     * @param {string} event type of event
     * @param {geotoolkit.scene.Node} source source who called the event
     * @param {object} args event arguments
     */
    geotoolkit.welllog.HeaderContainer.prototype.notify = function(event, source, args){};
    /**
     * Set margin in pixels between headers
     * @param {number} margin margin in pixels between header
     * @returns {geotoolkit.welllog.HeaderContainer} this
     */
    geotoolkit.welllog.HeaderContainer.prototype.setMargin = function(margin){};
    /**
     * Return margin in pixels between headers
     * @returns {number}
     */
    geotoolkit.welllog.HeaderContainer.prototype.getMargin = function(){};
    /**
     * Set margin in pixels between headers
     * @param {number} padding padding in pixels header to use in header containers
     * @returns {geotoolkit.welllog.HeaderContainer} this
     */
    geotoolkit.welllog.HeaderContainer.prototype.setPadding = function(padding){};
    /**
     * Return padding in pixels in header containers
     * @returns {number}
     */
    geotoolkit.welllog.HeaderContainer.prototype.getPadding = function(){};
    /**
     * @override
     */
    geotoolkit.welllog.HeaderContainer.prototype.rebuild = function(){};
    /**
     * Determines whether this container is scrollable
     * Returns true if scrollable
     *
     * @returns {boolean}
     */
    geotoolkit.welllog.HeaderContainer.prototype.isScrollable = function(){};
    /**
     * Sets whether this container is scrollable
     *
     * @param {boolean} scrollable sets whether this container is scrollable
     * @returns {geotoolkit.welllog.HeaderContainer} this
     */
    geotoolkit.welllog.HeaderContainer.prototype.setScrollable = function(scrollable){};
    /**
     * Scroll to the top
     * @returns {geotoolkit.welllog.HeaderContainer} this
     */
    geotoolkit.welllog.HeaderContainer.prototype.scrollToTop = function(){};
    /**
     * Scroll to the bottom
     * @returns {geotoolkit.welllog.HeaderContainer} this
     */
    geotoolkit.welllog.HeaderContainer.prototype.scrollToBottom = function(){};
    /**
     * Return marker depth to be used to display value. By default it is nan and value is not displayed
     * @returns {number}
     */
    geotoolkit.welllog.HeaderContainer.prototype.getDisplayMarkerDepth = function(){};
    /**
     * Sets marker depth
     * @param {number} value depth of time value used by header
     * @returns {geotoolkit.welllog.HeaderContainer}
     */
    geotoolkit.welllog.HeaderContainer.prototype.setDisplayMarkerDepth = function(value){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.HeaderContainer.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.margin] margin
     * @param {number} [properties.padding] padding
     * @param {geotoolkit.welllog.header.LogVisualHeaderProvider} [properties.provider] provider of header prototypes
     * @param {boolean} [properties.scrollable] sets whether this container is scrollable
     * @returns {geotoolkit.welllog.HeaderContainer} this
     */
    geotoolkit.welllog.HeaderContainer.prototype.setProperties = function(properties){};
    /**
     * Return log track header
     * @param {geotoolkit.welllog.LogTrack} track log track
     * @returns {geotoolkit.welllog.header.LogBaseTrackHeader|null} track header
     */
    geotoolkit.welllog.HeaderContainer.prototype.getTrackHeader = function(track){};

/**
 * @class geotoolkit.welllog.header.AdaptiveLog2DVisualHeader
 * @augments geotoolkit.welllog.header.AdaptiveLogVisualHeader
 * @param {?geotoolkit.welllog.LogAbstractVisual} visual visual
 */
geotoolkit.welllog.header.AdaptiveLog2DVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.AdaptiveLog2DVisualHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.AdaptiveLog2DVisualHeader.prototype.copyConstructor = function(){};
    /**
     * Returns the number formatter for the min value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.AdaptiveLog2DVisualHeader.prototype.getMinValueFormat = function(){};
    /**
     * Returns the number formatter for the max value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.AdaptiveLog2DVisualHeader.prototype.getMaxValueFormat = function(){};
    /**
     * Sets the number formatter for the min value
     * @param {geotoolkit.util.NumberFormat} format number format
     * @returns {geotoolkit.welllog.header.AdaptiveLog2DVisualHeader}
     */
    geotoolkit.welllog.header.AdaptiveLog2DVisualHeader.prototype.setMinValueFormat = function(format){};
    /**
     * Sets the number formatter for the max value
     * @param {geotoolkit.util.NumberFormat} format number format
     * @returns {geotoolkit.welllog.header.AdaptiveLog2DVisualHeader}
     */
    geotoolkit.welllog.header.AdaptiveLog2DVisualHeader.prototype.setMaxValueFormat = function(format){};
    /**
     * Sets all properties
     * @param {object} properties properties
     * @param {geotoolkit.util.NumberFormat} [properties.minvalueformat] min value number format
     * @param {geotoolkit.util.NumberFormat} [properties.maxvalueformat] max value number format
     * @returns {geotoolkit.welllog.header.AdaptiveLog2DVisualHeader} this
     */
    geotoolkit.welllog.header.AdaptiveLog2DVisualHeader.prototype.setProperties = function(properties){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.header.AdaptiveLog2DVisualHeader.prototype.getProperties = function(){};

/**
 * This class implements a container for all kinds of tracks. Multiple tracks can be added to the container using addChild().
 * The trackcontainer will maintain coherent depth limits on the tracks it contains. It also offers convenience functions to manipulate the visible depth limits (scale, scroll, etc).
 * Its size relative to its parent can be defined using the setBounds() function.<br>
 * The trackcontainer also manages the units used in 'model space' (data) to 'device space' (screen). Units can be used along with the 'PPI' {@link geotoolkit.util.UnitFactory}.setPPI() to compute the actual display scale.
 * @class geotoolkit.welllog.TrackContainer
 * @augments geotoolkit.scene.Group
 */
geotoolkit.welllog.TrackContainer = {};
    /**
     * Sets the same depth limits for all tracks
     *
     * @param {number|geotoolkit.util.Range} minDepth min depth for all tracks or the range to set
     * @param {number} maxDepth max depth for all tracks
     * @returns {geotoolkit.welllog.TrackContainer} this
     */
    geotoolkit.welllog.TrackContainer.prototype.setDepthLimits = function(minDepth, maxDepth){};
    /**
     * Returns depth range
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.TrackContainer.prototype.getDepthLimits = function(){};
    /**
     * enum for scroll to depth location
     * @enum
     * @readonly
     */
    geotoolkit.welllog.TrackContainer.ScrollToLocation = {};
        /**
         * CENTER, set the scroll depth point at the center of the track container visible limits.
         * @type {string}
         */
        geotoolkit.welllog.TrackContainer.ScrollToLocation.CENTER = "";
        /**
         * TOP, set the scroll depth point at the top of the track container visible limits.
         * @type {string}
         */
        geotoolkit.welllog.TrackContainer.ScrollToLocation.TOP = "";
        /**
         * BOTTOM, set the scroll depth point at the bottom of the track container visible limits.
         * @type {string}
         */
        geotoolkit.welllog.TrackContainer.ScrollToLocation.BOTTOM = "";
        /**
         * VISIBLE, set the scroll depth point visible in the track container visible limits.
         * @type {string}
         */
        geotoolkit.welllog.TrackContainer.ScrollToLocation.VISIBLE = "";
    /**
     * Scroll to depth, you also can specify a location of this depth in the track container,
     * for example if you want to move the depth point location at the bottom of the track put 'BOTTOM' for the location variable.
     * location support : 'center' 'top' 'bottom' and 'visible' cases.
     *
     * warning depth limits should be expanded in order to see it correctly
     *
     * @param {number} [depth=null] depth in the track container
     * @param {geotoolkit.welllog.TrackContainer.ScrollToLocation} [location=TrackContainer.ScrollToLocation.VISIBLE] location of this depth in the track container
     * @returns {geotoolkit.welllog.TrackContainer} this
     */
    geotoolkit.welllog.TrackContainer.prototype.scrollToDepth = function(depth, location){};
    /**
     * Returns visible depth range
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.TrackContainer.prototype.getVisibleDepthLimits = function(){};
    /**
     * Sets visible depth limits
     *
     * @param {number|geotoolkit.util.Range} fromDepth visible starting depth t or the visible range to set
     * @param {number} [toDepth] visible ending depth
     * @returns {geotoolkit.welllog.TrackContainer} this
     */
    geotoolkit.welllog.TrackContainer.prototype.setVisibleDepthLimits = function(fromDepth, toDepth){};
    /**
     * Return unit of the measure to be used to display scale in the header
     *
     * @returns {geotoolkit.util.AbstractUnit}
     */
    geotoolkit.welllog.TrackContainer.prototype.getScaleUnit = function(){};
    /**
     * Sets unit of the measure to be used to display scale in the header
     *
     * @param {geotoolkit.util.AbstractUnit|string} unit a scale unit or string symbol
     * @returns {geotoolkit.welllog.TrackContainer} this
     */
    geotoolkit.welllog.TrackContainer.prototype.setScaleUnit = function(unit){};
    /**
     * Sets unit of the measure to be used for device
     *
     * @param {geotoolkit.util.AbstractUnit|string} unit unit of the device
     * @returns {geotoolkit.welllog.TrackContainer} this
     */
    geotoolkit.welllog.TrackContainer.prototype.setDeviceUnit = function(unit){};
    /**
     * Return a unit of the measure of device
     *
     * @returns {geotoolkit.util.AbstractUnit}
     */
    geotoolkit.welllog.TrackContainer.prototype.getDeviceUnit = function(){};
    /**
     * Sets a scale unit to be used in the header
     *
     * @param {string|geotoolkit.util.AbstractUnit} display device unit
     * @param {string|geotoolkit.util.AbstractUnit} scale scale unit
     * @returns {geotoolkit.welllog.TrackContainer}
     */
    geotoolkit.welllog.TrackContainer.prototype.setScaleUnits = function(display, scale){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object}
     */
    geotoolkit.welllog.TrackContainer.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.util.AbstractUnit|string} [properties.scaleunit] a scale unit or string symbol
     * @param {geotoolkit.util.AbstractUnit|string} [properties.deviceunit] unit of the device
     * @returns {geotoolkit.welllog.TrackContainer} this
     */
    geotoolkit.welllog.TrackContainer.prototype.setProperties = function(properties){};

/**
 * Define visual to represent comment section intervals.
 *
 * @class geotoolkit.welllog.LogMudLogSection
 * @augments geotoolkit.welllog.LogAbstractVisual
 * @param {Array.<number>|object} [depths] an array of the depths
 * @param {Array.<number>} [depths.depths] an array of the depths
 * @param {array.<string>} [depths.values] array of the corresponding values
 * @param {array.<geotoolkit.attributes.FillStyle>} [depths.fillstyles] fill styles
 * @param {geotoolkit.welllog.LogMudLogSection.FillMode} [depths.fillMode] mode for how to display the values
 * @param {geotoolkit.attributes.TextStyle | string | object} [depths.textstyle] text style of the displayed values
 * @param {string} [depths.ellipsisstring] ellipsis text to string (must be under 15 characters)
 * @param {geotoolkit.attributes.FillStyle | string | object} [depths.evenfillstyle] even fill style
 * @param {geotoolkit.attributes.FillStyle | string | object} [depths.oddfillstyle] odd fill style
 * @param {geotoolkit.welllog.LogMudLogSection.FillMode} [depths.verticalmargin] verticalMargin vertical margin in pixel in device space
 * @param {array.<string>} [values] array of the corresponding values
 *
 */
geotoolkit.welllog.LogMudLogSection = {};
    /**
     * An enum defining fill mode
     *
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogMudLogSection.FillMode = {};
        /**
         * All
         * @type {number}
         */
        geotoolkit.welllog.LogMudLogSection.FillMode.All = NaN;
        /**
         * TextOnly
         * @type {number}
         */
        geotoolkit.welllog.LogMudLogSection.FillMode.TextOnly = NaN;
    /**
     * An enum defining text alignment
     *
     * @enum
     * @readonly
     */
    geotoolkit.welllog.LogMudLogSection.TextAlign = {};
        /**
         * Top
         * @type {string}
         */
        geotoolkit.welllog.LogMudLogSection.TextAlign.Top = "";
        /**
         * Bottom
         * @type {string}
         */
        geotoolkit.welllog.LogMudLogSection.TextAlign.Bottom = "";
    /**
     * Sets array of depths and array of corresponding values
     *
     * @param {Array<number>} depths array of depths
     * @param {Array<string>} values array of corresponding values along the depth
     * @returns {geotoolkit.welllog.LogMudLogSection} this
     */
    geotoolkit.welllog.LogMudLogSection.prototype.setDepthsAndValues = function(depths, values){};
    /**
     * Sets array of fill Styles
     * @param {Array<geotoolkit.attributes.FillStyle | string | object>} fillStyles fill styles
     * @returns {geotoolkit.welllog.LogMudLogSection} this
     */
    geotoolkit.welllog.LogMudLogSection.prototype.setFillStyles = function(fillStyles){};
    /**
     * Returns array of depths
     *
     * @returns {Array<number>}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getDepths = function(){};
    /**
     * Returns array of values
     *
     * @returns {Array<string>}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getValues = function(){};
    /**
     * Returns array of Fill
     * @returns {Array<geotoolkit.attributes.FillStyle>}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getFillStyles = function(){};
    /**
     * Returns value closest to specified depth
     *
     * @param {number} depth value at depth of current section
     * @returns {?object} [value]
     * {string} [value.value] value
     * {object} [value.section] section
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getValueAtDepth = function(depth){};
    /**
     * Returns fill mode
     *
     * @returns {geotoolkit.welllog.LogMudLogSection.FillMode}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getFillMode = function(){};
    /**
     * Sets fill mode
     *
     * @param {geotoolkit.welllog.LogMudLogSection.FillMode} fillMode The fill mode
     * @returns {geotoolkit.welllog.LogMudLogSection} this
     */
    geotoolkit.welllog.LogMudLogSection.prototype.setFillMode = function(fillMode){};
    /**
     * Returns text alignment
     *
     * @returns {geotoolkit.welllog.LogMudLogSection.TextAlign}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getTextAlign = function(){};
    /**
     * Sets text alignment
     *
     * @param {geotoolkit.welllog.LogMudLogSection.TextAlign} textAlign
     * @returns {geotoolkit.welllog.LogMudLogSection} this
     */
    geotoolkit.welllog.LogMudLogSection.prototype.setTextAlign = function(textAlign){};
    /**
     * Sets ellipsis text to string under 15 characters
     *
     * @param {string} str value in the current section
     * @returns {geotoolkit.welllog.LogMudLogSection|null} this
     */
    geotoolkit.welllog.LogMudLogSection.prototype.setEllipsisString = function(str){};
    /**
     * Get ellipsis text to string
     * @returns {string|*}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getEllipsisString = function(){};
    /**
     * Returns a bounds
     *
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getBounds = function(){};
    /**
     * Returns a text style
     *
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getTextStyle = function(){};
    /**
     * Sets text style
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogMudLogSection} this
     */
    geotoolkit.welllog.LogMudLogSection.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * Returns odd fill style
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getOddFillStyle = function(){};
    /**
     * Sets odd fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogMudLogSection} this
     */
    geotoolkit.welllog.LogMudLogSection.prototype.setOddFillStyle = function(fillStyle, merge){};
    /**
     * Returns even fill style
     *
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getEvenFillStyle = function(){};
    /**
     * Sets even fill style
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.LogMudLogSection} this
     */
    geotoolkit.welllog.LogMudLogSection.prototype.setEvenFillStyle = function(fillStyle, merge){};
    /**
     * Returns vertical margin
     *
     * @returns {number} margin vertical margin in pixel in device space
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getVerticalMargin = function(){};
    /**
     * Sets vertical margin
     *
     * @param {number} verticalMargin vertical margin in pixel in device space
     * @returns {geotoolkit.welllog.LogMudLogSection} this
     */
    geotoolkit.welllog.LogMudLogSection.prototype.setVerticalMargin = function(verticalMargin){};
    /**
     * Check collision
     * Returns true if object is inside of rendering area
     *
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering context
     * @returns {boolean}
     * @this {geotoolkit.scene.Shape}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.checkCollision = function(context){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.LogMudLogSection.prototype.render = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.LogMudLogSection.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.textstyle] the text style
     * @param {geotoolkit.welllog.LogMudLogSection.TextAlign} [properties.textalign] textalign
     * @param {string} [properties.ellipsisstring] ellipsis text to string under 15 characters
     * @param {number} [properties.verticalmargin] vertical margin in pixel in device space
     * @param {Array<number>} [properties.depths] array of depths
     * @param {Array<string>} [properties.values] array of corresponding values along the depth
     * @param {Array<geotoolkit.attributes.FillStyle | string | object>} [properties.fillstyles] fillstyles
     * @param {geotoolkit.welllog.LogMudLogSection.FillMode} [properties.fillmode] The fill mode
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.oddfillstyle] OddFillStyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.evenfillstyle] EvenFillStyle
     * @returns {geotoolkit.welllog.LogMudLogSection} this
     */
    geotoolkit.welllog.LogMudLogSection.prototype.setProperties = function(properties){};

/**
 * Define header for LogTrack
 * @class geotoolkit.welllog.header.LogTrackVisualHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @param {geotoolkit.welllog.LogTrack} visual visual for logtrack
 */
geotoolkit.welllog.header.LogTrackVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.copyConstructor = function(){};
    /**
     * Set auto label rotation
     * @param {boolean} value enable automatic label rotation
     * @returns {geotoolkit.welllog.header.LogTrackVisualHeader} this
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.setAutoLabelRotation = function(value){};
    /**
     * Get auto label rotation
     * @returns {boolean}
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.getAutoLabelRotation = function(){};
    /**
     * Sets label rotation angle in radians
     * @param {number} angle label rotation angle, in radians
     * @returns {geotoolkit.welllog.header.LogTrackVisualHeader} this
     * @example
     * // user can customize the label rotation angle
     * setLabelRotationAngle(-Math.PI / 2)
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.setLabelRotationAngle = function(angle){};
    /**
     * Returns label rotation angle
     * @returns {number} label rotation angle in radians
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.getLabelRotationAngle = function(){};
    /**
     * Set adaptive height flag
     * @param {boolean} enable set adaptive height or not
     * @returns {geotoolkit.welllog.header.LogTrackVisualHeader} this
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.setAdaptiveHeight = function(enable){};
    /**
     * get adaptive height flag
     * @returns {boolean}
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.getAdaptiveHeight = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} inputContext Rendering Context
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.render = function(inputContext){};
    /**
     * This method can be used to draw multiple lines. Each line is truncated to fit in the maxWidth
     * (You can use the getLines method to split a string up into multiple lines)
     * @param {number} maxWidth maxwidth of the model
     * @param {geotoolkit.util.Rect} lineBounds position of header inside of container
     * @param {geotoolkit.attributes.TextStyle} textStyle text style of title
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.drawLines = function(maxWidth, lineBounds, textStyle, context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {boolean} [properties.adaptiveheight] height of the header
     * @param {boolean} [properties.autolabelrotation] define automatic label rotation if track is narrow
     * @param {number} [properties.labelrotationangle] define optional label rotation angle relative to header
     * @returns {geotoolkit.welllog.header.LogTrackVisualHeader} this
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.setProperties = function(properties){};
    /**
     * @override
     * @returns {geotoolkit.welllog.header.LogTrackVisualHeader} this
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.updateState = function(){};
    /**
     * Return header desired height
     *
     * @returns {number}
     */
    geotoolkit.welllog.header.LogTrackVisualHeader.prototype.getDesiredHeight = function(){};

/**
 * Define header for LogAxis. Any of the predefined {@link geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType} can be used for displaying axis labels. <br>
 * It is not possible to modify the existing header, but user can provide own callback function to return text, which can have only necessary
 * information to be displayed in the header.
 * User also has an option to define custom Header Types. please refer to the example below.
 * @class geotoolkit.welllog.header.LogAxisVisualHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @param {geotoolkit.welllog.LogAxis} [visual] logaxis visual
 */
geotoolkit.welllog.header.LogAxisVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.copyConstructor = function(){};
    /**
     * Enum of value type style to specify how to display a scale value
     * @enum
     * @readonly
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles = {};
        /**
         * Display text of scale
         * @type {number}
         */
        geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles.Text = NaN;
        /**
         * Display a button with scale
         * @type {number}
         */
        geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles.Button = NaN;
        /**
         * Display nothing
         * @type {number}
         */
        geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles.None = NaN;
    /**
     * Enum of HeaderType
     * @enum
     * @readonly
     * @example
     *
     * var headerText = geotoolkit.welllog.header.LogAxisVisualHeader.prototype.setFormatHeaderHandler(myCallBackFunction));
     * var myCallBackFunction = function(visual){
     * return visual.getName();
     * }
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType = {};
        /**
         * Display scale, name and unit
         * @type {string}
         */
        geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType.Scale = "";
        /**
         * Display name and unit only
         * @type {string}
         */
        geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType.Simple = "";
        /**
         * Display name, unit and visible range
         * @type {string}
         */
        geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType.Range = "";
        /**
         * Display name, unit and full model range
         * @type {string}
         */
        geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType.FullRange = "";
        /**
         * Custom
         * @type {string}
         */
        geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType.Custom = "";
    /**
     * Set auto label rotation
     * @param {boolean} bool enable automatic label rotation
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader} this
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.setAutoLabelRotation = function(bool){};
    /**
     * Get auto label rotation
     * @returns {boolean}
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.getAutoLabelRotation = function(){};
    /**
     * Sets label rotation angle in radians
     * @param {number} angle label rotation angle, in radians
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader} this
     * @example
     * // user can customize the label rotation angle
     * setLabelRotationAngle(-Math.PI / 2)
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.setLabelRotationAngle = function(angle){};
    /**
     * Returns label rotation angle
     * @returns {number} label rotation angle in radians
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.getLabelRotationAngle = function(){};
    /**
     * Gets textStyle of the value displayed
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.getDisplayValueTextStyle = function(){};
    /**
     * Sets a type of header. In addition to predefined header types Custom header type can be used.
     *
     * @param {geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType} headerType type of header (Enum of header type)
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader}
     * @example
     * // This header is an option to display header for index track. To set it to simple index track header, <br>
     * // you need to call a method getHeaderContainer on your WellLogWidget and change a property of the prototype axis before inserting tracks in your widget.
     * // The code below shows it.
     * var headerProvider = widget.getHeaderContainer().getHeaderProvider();
     * // configure Depth and Time axis header
     * var logAxisVisualHeader = headerProvider.getHeaderProvider(geotoolkit.welllog.LogAxis.getClassName());
     * logAxisVisualHeader.setHeaderType(geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType.Simple);
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.setHeaderType = function(headerType){};
    /**
     * Return a type of the header
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType}
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.getHeaderType = function(){};
    /**
     * Sets a current text style for displayed value
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader}
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.setDisplayValueTextStyle = function(textStyle, merge){};
    /**
     * Set displayed unit for date time axis.
     * If null, units will be automatically calculated
     * ex. ['h','min','s','ms'] and 1 inch of 4830040 ms will be displayed
     * 1: 1:20:30:40
     * in:h:min:s:ms
     * @param {Array} units unit for date time axis.
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader} this
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.setTimeIntervalUnits = function(units){};
    /**
     * Get displayed unit for date time axis
     * @returns {Array}
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.getTimeIntervalUnits = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.render = function(context){};
    /**
     * Sets format header handler
     * @param {function()} handler handler is called to specify format of the header
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader} this
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.setFormatHeaderHandler = function(handler){};
    /**
     * Return value type style how to display scale if header type is Scale.
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles}
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.getValueTypeStyle = function(){};
    /**
     * Sets a value type style how to display scale value if header type is Scale.
     * @param {geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles} style a style how to display a scale value if header type is scale
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader} this
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.setValueTypeStyle = function(style){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of the header
     * @returns {geotoolkit.attributes.TextStyle} properties.displayvaluetextstyle text style to display value
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType} properties.headertype a type of the header
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles} properties.valuetypestyle style a style how to display a scale value if header type is scale
     * @returns {boolean} properties.autolabelrotation define automatic label rotation if track is narrow
     * @returns {number} properties.labelrotationangle define optional label rotation angle relative to header
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     *
     * @param {object} [properties] An object containing the properties to set
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.displayvaluetextstyle] text style of the display value
     * @param {object} [properties.headertype] enum of header type
     * @param {boolean} [properties.autolabelrotation] define automatic label rotation if track is narrow
     * @param {number} [properties.labelrotationangle] define optional label rotation angle relative to header
     * @param {geotoolkit.welllog.header.LogAxisVisualHeader.TypeStyles} [properties.valuetypestyle] style a style how to display a scale value if header type is scale
     * @returns {geotoolkit.welllog.header.LogAxisVisualHeader} this
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.setProperties = function(properties){};
    /**
     * used to trigger a redraw when styles has been changed
     * @protected
     * @returns {function()}
     */
    geotoolkit.welllog.header.LogAxisVisualHeader.prototype.getInvalidateMethod = function(){};

/**
 * Define visual to render curve header
 *
 * @class geotoolkit.welllog.header.LogBarVisualHeader
 * @augments geotoolkit.welllog.header.LogVisualHeader
 * @param {geotoolkit.welllog.LogBarVisual}[visual] visual for the header
 */
geotoolkit.welllog.header.LogBarVisualHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogBarVisualHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.LogBarVisualHeader.prototype.copyConstructor = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} inputContext Rendering Context
     */
    geotoolkit.welllog.header.LogBarVisualHeader.prototype.render = function(inputContext){};
    /**
     * Returns the number formatter for the min value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.LogBarVisualHeader.prototype.getMinValueFormat = function(){};
    /**
     * Returns the number formatter for the max value
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.welllog.header.LogBarVisualHeader.prototype.getMaxValueFormat = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.header.LogBarVisualHeader.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.util.NumberFormat} [properties.minvalueformat] number format for min value
     * @param {geotoolkit.util.NumberFormat} [properties.maxvalueformat] number format for max value
     * @returns {geotoolkit.welllog.header.LogBarVisualHeader} this
     */
    geotoolkit.welllog.header.LogBarVisualHeader.prototype.setProperties = function(properties){};

/**
 * Define default header for geotoolkit.welllog.RasterLog
 * @class geotoolkit.welllog.header.RasterLogHeader
 * @augments geotoolkit.welllog.header.AdaptiveLogVisualHeader
 * @param {geotoolkit.welllog.LogAbstractVisual} visual
 */
geotoolkit.welllog.header.RasterLogHeader = {};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.RasterLogHeader.prototype.clone = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.header.RasterLogHeader.prototype.copyConstructor = function(){};

/**
 * @class geotoolkit.welllog.axis.DateTimeTickGenerator
 * @augments geotoolkit.axis.TickGenerator
 * @param {object} trajectory trajectory options
 */
geotoolkit.welllog.axis.DateTimeTickGenerator = {};
    /**
     * Returns valid Tick Grades : "SECTIONS", "MAJOR"
     * @override
     * @returns {Array.<string>} array of known Tick Grades
     */
    geotoolkit.welllog.axis.DateTimeTickGenerator.prototype.getTickGrades = function(){};
    /**
     * Reset
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {Array.<string>} a supported tick grade list
     */
    geotoolkit.welllog.axis.DateTimeTickGenerator.prototype.reset = function(parent, orient, tickInfo){};
    /**
     * Reset ticks (lineStyles, tickSizes, tickTypes)
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo a info about labels. This information is used to pass and receive information about the current tick or label
     * @returns {number} ticks count for the current tick type
     */
    geotoolkit.welllog.axis.DateTimeTickGenerator.prototype.resetTicks = function(parent, orient, tickInfo){};
    /**
     * Reset labels (textStyles)
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis } parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo tick info
     * @returns {number}
     */
    geotoolkit.welllog.axis.DateTimeTickGenerator.prototype.resetLabels = function(parent, orient, tickInfo){};
    /**
     * Gets next tick index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo info about tick
     * @param {number} tickIndex tick index from 0 to count-1, which resetTicks returns
     * @returns {number} the model position of the tick
     */
    geotoolkit.welllog.axis.DateTimeTickGenerator.prototype.nextTick = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Gets next label index
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo info about tick
     * @param {number} tickIndex tickIndex tick index from 0 to count-1, which resetLabels returns
     * @returns {number} the model position of the label
     */
    geotoolkit.welllog.axis.DateTimeTickGenerator.prototype.nextLabel = function(parent, orient, tickInfo, tickIndex){};
    /**
     * Format label
     *
     * @override
     * @param {geotoolkit.axis.Grid | geotoolkit.axis.Axis} parent parent axis or grid
     * @param {geotoolkit.axis.AxisOrientation|string} orient orientation
     * @param {geotoolkit.axis.TickInfo} tickInfo a info about tick
     * @param {number} tickIndex tickIndex tick index from 0 to count-1, which resetLabels returns
     * @param {number} modelValue model value
     * @returns {?string} formatted label text
     */
    geotoolkit.welllog.axis.DateTimeTickGenerator.prototype.formatLabel = function(parent, orient, tickInfo, tickIndex, modelValue){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.welllog.axis.DateTimeTickGenerator.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {object} [properties.dttrajectory] trajectory options
     * @returns {geotoolkit.welllog.axis.DateTimeTickGenerator} this
     */
    geotoolkit.welllog.axis.DateTimeTickGenerator.prototype.setProperties = function(properties){};

