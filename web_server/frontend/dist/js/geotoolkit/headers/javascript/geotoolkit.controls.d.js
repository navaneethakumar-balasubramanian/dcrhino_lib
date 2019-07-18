/**
 * API defining geotoolkit tools and high level shapes
 * @namespace */
geotoolkit.controls = {};

/** @namespace */
geotoolkit.controls.util = {};

/** @namespace */
geotoolkit.controls.util.regression = {};

/** @namespace */
geotoolkit.controls.data = {};

/**
 * API for editor feature that lets a user interact with a shape
 * @namespace */
geotoolkit.controls.editing = {};
    /**
     * An enumerator containing events fired by Editing tools
     * @readonly
     * @enum
     */
    geotoolkit.controls.editing.Events = {};
        /**
         * Event fired before the first move is executed on a handle
         * @type {string}
         */
        geotoolkit.controls.editing.Events.DragStart = "";
        /**
         * Event fired on every move of the handle if the ghost handle is disabled
         * @type {string}
         */
        geotoolkit.controls.editing.Events.Dragging = "";
        /**
         * Event fired when the handle or a ghost is released
         * @type {string}
         */
        geotoolkit.controls.editing.Events.DragEnd = "";
        /**
         * Event fired when deleting occurs
         * @type {string}
         */
        geotoolkit.controls.editing.Events.Delete = "";
        /**
         * Event fired when inserting occurs
         * @type {string}
         */
        geotoolkit.controls.editing.Events.Insert = "";
        /**
         * Event fired when mouse has been moved across the plot, but no dragging happens
         * @type {string}
         */
        geotoolkit.controls.editing.Events.Move = "";

/** @namespace */
geotoolkit.controls.editing.scaling = {};

/**
 * API to build an axis using tick generator
 * @namespace */
geotoolkit.controls.axis = {};

/**
 * API for defining tools used in widgets
 * @namespace */
geotoolkit.controls.tools = {};
    /**
     * Enum for the rendering of the rubber band tool
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.RubberBandRenderMode = {};
        /**
         * As is - no modifications to resize area
         * @type {number}
         */
        geotoolkit.controls.tools.RubberBandRenderMode.Free = NaN;
        /**
         * Horizontal resize only
         * @type {number}
         */
        geotoolkit.controls.tools.RubberBandRenderMode.Horizontal = NaN;
        /**
         * Vertical resize only
         * @type {number}
         */
        geotoolkit.controls.tools.RubberBandRenderMode.Vertical = NaN;
        /**
         * Keep aspect ratio resize
         * @type {number}
         */
        geotoolkit.controls.tools.RubberBandRenderMode.AspectRatio = NaN;
    /**
     * Enums of Selection Mode
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.SelectionMode = {};
        /**
         * Pointer
         * @type {string}
         */
        geotoolkit.controls.tools.SelectionMode.Pointer = "";
        /**
         * RubberBand
         * @type {string}
         */
        geotoolkit.controls.tools.SelectionMode.RubberBand = "";
    /**
     * Enums of RubberBand Selection Mode
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.RubberBandMode = {};
        /**
         * Collision
         * will select if the object is touching the section rect
         * @type {string}
         */
        geotoolkit.controls.tools.RubberBandMode.Collision = "";
        /**
         * Inside
         * will only select if the object is completely inside the section rect
         * @type {string}
         */
        geotoolkit.controls.tools.RubberBandMode.Inside = "";
    /**
     * Enums of Pointer Selection Mode
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.PointerMode = {};
        /**
         * Hover
         * will select if the object is under the mouse pointer
         * @type {string}
         */
        geotoolkit.controls.tools.PointerMode.Hover = "";
        /**
         * Click
         * will select if the object is under the pointer while clicking
         * @type {string}
         */
        geotoolkit.controls.tools.PointerMode.Click = "";
        /**
         * MouseDown
         * will select if the object pressed under the pointer
         * @type {string}
         */
        geotoolkit.controls.tools.PointerMode.MouseDown = "";
        /**
         * MouseUp
         * will select if the object released under the pointer
         * @type {string}
         */
        geotoolkit.controls.tools.PointerMode.MouseUp = "";
        /**
         * DoubleClick
         * will select if the object is double clicked
         * @type {string}
         */
        geotoolkit.controls.tools.PointerMode.DoubleClick = "";
        /**
         * TapHold
         * will select if the object is long pressed
         * @type {string}
         */
        geotoolkit.controls.tools.PointerMode.TapHold = "";
    /**
     * PinchToZoomModes enum
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.PinchToZoomModes = {};
        /**
         * X
         * @type {number}
         */
        geotoolkit.controls.tools.PinchToZoomModes.X = NaN;
        /**
         * Y
         * @type {number}
         */
        geotoolkit.controls.tools.PinchToZoomModes.Y = NaN;
        /**
         * XY
         * @type {number}
         */
        geotoolkit.controls.tools.PinchToZoomModes.XY = NaN;
        /**
         * Zoom from the Center Point of the visible area
         * @type {number}
         */
        geotoolkit.controls.tools.PinchToZoomModes.Center = NaN;
        /**
         * Zoom from the users' touch point
         * @type {number}
         */
        geotoolkit.controls.tools.PinchToZoomModes.TouchPoint = NaN;

/** @namespace */
geotoolkit.controls.tools.scroll = {};

/** @namespace */
geotoolkit.controls.tools.splitter = {};

/** @namespace */
geotoolkit.controls.tools.tableview = {};

/** @namespace */
geotoolkit.controls.tools.HeatMap = {};

/** @namespace */
geotoolkit.controls.tools.treemap = {};

/**
 * API for building more complex shapes
 * @namespace */
geotoolkit.controls.shapes = {};
    /**
     * Enum for defining the location of the color bar
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.ColorBarLocation = {};
        /**
         * North
         * @type {string}
         */
        geotoolkit.controls.shapes.ColorBarLocation.North = "";
        /**
         * East
         * @type {string}
         */
        geotoolkit.controls.shapes.ColorBarLocation.East = "";
        /**
         * South
         * @type {string}
         */
        geotoolkit.controls.shapes.ColorBarLocation.South = "";
        /**
         * West
         * @type {string}
         */
        geotoolkit.controls.shapes.ColorBarLocation.West = "";

/** @namespace */
geotoolkit.controls.shapes.painters = {};
    /**
     * Created by ivan.kolodin on 9/22/2015.
     */
    geotoolkit.controls.shapes.painters.AbstractSymbolMap = {};

/** @namespace */
geotoolkit.animation.effects.charts = {};

/**
 * Base class of regression model
 *
 * @class geotoolkit.controls.util.regression.RegressionBase
 * @augments geotoolkit.util.EventDispatcher
 * @param {object} options see setOptions and setData for details
 * @param {object} customFunc custom function to represent regression model
 */
geotoolkit.controls.util.regression.RegressionBase = {};
    /**
     * Type of events
     * @enum
     * @readonly
     */
    geotoolkit.controls.util.regression.RegressionBase.Events = {};
        /**
         * emit when model or its propeties changed
         * @type {string}
         */
        geotoolkit.controls.util.regression.RegressionBase.Events.UpdatedModel = "";
    /**
     * pre-defined probability value of confidence level when picking value from t-table
     * @enum
     * @readonly
     */
    geotoolkit.controls.util.regression.RegressionBase.Probability = {};
        /**
         * fixed 80%
         * @type {number}
         */
        geotoolkit.controls.util.regression.RegressionBase.Probability.P80 = NaN;
        /**
         * fixed 90%
         * @type {number}
         */
        geotoolkit.controls.util.regression.RegressionBase.Probability.P90 = NaN;
        /**
         * fixed 95%
         * @type {number}
         */
        geotoolkit.controls.util.regression.RegressionBase.Probability.P95 = NaN;
        /**
         * fixed 99%
         * @type {number}
         */
        geotoolkit.controls.util.regression.RegressionBase.Probability.P99 = NaN;
    /**
     * fit the curve with given data set
     * the subclass of RegressionBase need to support incremental fitting by default
     * that means the model have to keep necessary intermediate values as properties
     * which can be used to do incremental calculating when add new data point to model
     * @param {Array.<number>} dataX data set x
     * @param {Array.<number>} dataY data set y
     * @param {Array.<number>} weights of data point
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.fit = function(dataX, dataY, weights){};
    /**
     * get all data for training
     * @returns {object} data
     * @returns {Array.<number>} array of x
     * @returns {Array.<number>} array of y
     * @returns {Array.<number>} array of weights
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getData = function(){};
    /**
     * predict y value(s) with given x value
     * @param {number|Array.<number>} dataX single value or data set of X
     * @returns {number|Array.<number>} predictedDataY predicted y value(s)
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.predict = function(dataX){};
    /**
     * set options
     * @param {object} options options
     * @param {Array.<number>} [options.coefficients] array of coefficients
     * @returns {geotoolkit.controls.util.regression.RegressionBase} this
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.setOptions = function(options){};
    /**
     * reset the model including all intermediate variables and training data
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.resetModel = function(){};
    /**
     * get customized coefficients flag
     * @returns {boolean} customizedCoef
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.isCustomizedCoef = function(){};
    /**
     * get options
     * @returns {object} options
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getOptions = function(){};
    /**
     * get properties
     * @returns {object}
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getProperties = function(){};
    /**
     * set probability for looking up t-table to determine confidence interval
     * @param {number|geotoolkit.controls.util.regression.RegressionBase.Probability} prob probability
     * @returns {geotoolkit.controls.util.regression.RegressionBase} this
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.setConfidenceProbability = function(prob){};
    /**
     * get probability for determine confidence interval
     * @returns {number} probability
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getConfidenceProbability = function(){};
    /**
     * set probability for looking up t-table to determine prediction interval
     * @param {number|geotoolkit.controls.util.regression.RegressionBase.Probability} prob probability
     * @returns {geotoolkit.controls.util.regression.RegressionBase} this
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.setPredictionProbability = function(prob){};
    /**
     * get probability for determine prediction interval
     * @returns {number} probability
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getPredictionProbability = function(){};
    /**
     * get mean value for data set x or y
     * @param {string} axis axis could be 'x' or 'y'
     * @returns {number|null} return mean value of data set
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getMean = function(axis){};
    /**
     * get sum squared for data set x or y
     * @param {string} axis axis could be 'x' or 'y'
     * @returns {number|null} return sum squared value of data set
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getTotalSumSquared = function(axis){};
    /**
     * get sum squared of residual
     * @returns {number|null} return sum squared of residual
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getSumSquaredResidual = function(){};
    /**
     * get degree of freedom
     * @returns {number} return degree of freedom
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getDegreeOfFreedom = function(){};
    /**
     * get R squared value
     * @returns {number|null} return R squared value
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getRsquared = function(){};
    /**
     * get array of residuals
     * @returns {Array.<number>|null} residuals array of residuals
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getResiduals = function(){};
    /**
     * get confidence interval for given x value
     * @param {number} x given value to determine the confidence interval
     * @returns {number|null} return confidence interval for x
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getConfidenceInterval = function(x){};
    /**
     * get prediction interval for given x value
     * @param {number} x given value to determine the prediction interval
     * @returns {number|null} return prediction interval for x
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getPredictionInterval = function(x){};
    /**
     * get statistics of regression analysis
     * @returns {object} [statistics]
     * @returns {number} [statistics.rsquared] R squared value
     * @returns {number} [statistics.meanx] mean value of data set x
     * @returns {number} [statistics.meany] mean value of data set y
     * @returns {number} [statistics.df] degree of freedom
     * @returns {number} [statistics.sumsquaredx] sum squared of x
     * @returns {number} [statistics.sumsquaredy] sum squared of y
     * @returns {number} [statistics.sumsquaredres] sum squared of residuals
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getStatistics = function(){};
    /**
     * get coefficients
     * @returns {Array}
     */
    geotoolkit.controls.util.regression.RegressionBase.prototype.getCoefficients = function(){};

/**
 * generate a exponential regression model
 * @class geotoolkit.controls.util.regression.Exponential
 * @augments geotoolkit.controls.util.regression.RegressionBase
 * @param {object} options
 */
geotoolkit.controls.util.regression.Exponential = {};
    /**
     * fit curve
     * @param {Array.<number>} dataX data array of observations x
     * @param {Array.<number>} dataY data array in observations y
     * @param {Array.<number>} weights of data point
     */
    geotoolkit.controls.util.regression.Exponential.prototype.fit = function(dataX, dataY, weights){};
    /**
     * get x value of edge point where derivative of regression line is 1 or -1 after adjust scale of x and y
     * @param {number} [scale = 1] scale
     * @returns {number}
     */
    geotoolkit.controls.util.regression.Exponential.prototype.getEdge = function(scale){};
    /**
     * predict x value with given y value(s)
     * @param {number|Array<number>} dataY y value(s)
     * @returns {number|Array<number>} predictedDataX x value(s)
     */
    geotoolkit.controls.util.regression.Exponential.prototype.inversePredict = function(dataY){};

/**
 * generate a linear regression model
 * @class geotoolkit.controls.util.regression.Linear
 * @augments geotoolkit.controls.util.regression.RegressionBase
 * @param {object} options
 */
geotoolkit.controls.util.regression.Linear = {};
    /**
     * fit curve
     * @param {Array.<number>} dataX data array of observations x
     * @param {Array.<number>} dataY data array in observations y
     * @param {Array.<number>} weights of data point
     */
    geotoolkit.controls.util.regression.Linear.prototype.fit = function(dataX, dataY, weights){};

/**
 * generate a logarithmic regression model
 * @class geotoolkit.controls.util.regression.Logarithmic
 * @augments geotoolkit.controls.util.regression.RegressionBase
 * @param {object} options
 */
geotoolkit.controls.util.regression.Logarithmic = {};
    /**
     * fit curve
     * @param {Array.<number>} dataX data array of observations x
     * @param {Array.<number>} dataY data array in observations y
     * @param {Array.<number>} weights of data point
     */
    geotoolkit.controls.util.regression.Logarithmic.prototype.fit = function(dataX, dataY, weights){};

/**
 * generate a power regression model
 * @class geotoolkit.controls.util.regression.Power
 * @augments geotoolkit.controls.util.regression.RegressionBase
 * @param {object} options
 */
geotoolkit.controls.util.regression.Power = {};
    /**
     * fit curve
     * @param {Array.<number>} dataX data array of observations x
     * @param {Array.<number>} dataY data array in observations y
     * @param {Array.<number>} weights of data point
     */
    geotoolkit.controls.util.regression.Power.prototype.fit = function(dataX, dataY, weights){};

/**
 * generate a polynomial regression model
 * @class geotoolkit.controls.util.regression.Polynomial
 * @augments geotoolkit.controls.util.regression.RegressionBase
 * @param {object} options
 * @param {number} [options.order] the order of polynomial formula
 */
geotoolkit.controls.util.regression.Polynomial = {};
    /**
     * set options for model
     * @override
     * @param {object} options
     * @param {number} [options.order] the order of polynomial formula
     * @returns {geotoolkit.controls.util.regression.Polynomial} this
     */
    geotoolkit.controls.util.regression.Polynomial.prototype.setOptions = function(options){};
    /**
     * @override
     * @returns {object} options
     * @returns {number} [options.order] the order of polynomial formula
     */
    geotoolkit.controls.util.regression.Polynomial.prototype.getOptions = function(){};
    /**
     * reset regression model to fit new data set
     * @override
     */
    geotoolkit.controls.util.regression.Polynomial.prototype.resetModel = function(){};
    /**
     * fit curve
     * @param {Array.<number>} dataX data array of observations x
     * @param {Array.<number>} dataY data array in observations y
     * @param {Array.<number>} weights of data point
     */
    geotoolkit.controls.util.regression.Polynomial.prototype.fit = function(dataX, dataY, weights){};

/**
 * @class geotoolkit.controls.data.SerieElementInfo
 * @param {number|string|object} serieId serie ID
 * @param {number|string|object} sampleId sample ID
 */
geotoolkit.controls.data.SerieElementInfo = {};
    /**
     * Gets serie ID
     * @returns {number|string|object}
     */
    geotoolkit.controls.data.SerieElementInfo.prototype.getSerieId = function(){};
    /**
     * Gets sample ID
     * @returns {number|string|object}
     */
    geotoolkit.controls.data.SerieElementInfo.prototype.getSampleId = function(){};

/**
 * Implements an abstract handle which can be used to manipulate toolkit components.
 *
 * @class geotoolkit.controls.editing.AbstractHandle
 * @augments geotoolkit.scene.shapes.Shape
 * @param {object} params JSON with properties
 * @param {geotoolkit.attributes.FillStyle | string | object} [params.activefillstyle='#0f0'] Fill style of the handle when it is active
 * @param {geotoolkit.attributes.FillStyle | string | object} [params.inactivefillstyle='#fff'] Fill style to apply to handle when it is not active
 * @param {geotoolkit.attributes.LineStyle | string | object} [params.activelinestyle='#000'] Line style of the handle when it is active
 * @param {geotoolkit.attributes.LineStyle | string | object} [params.inactivelinestyle='#000'] Line style to apply to handle when it is not active
 */
geotoolkit.controls.editing.AbstractHandle = {};
    /**
     * Used for cloning
     * @param {geotoolkit.controls.editing.AbstractHandle} src Source to copy from
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.copyConstructor = function(src){};
    /**
     * Gets or sets current adapter. Gets if the parameter is not specified or null. Sets new adapter if the parameter
     * is not null
     * @param {geotoolkit.controls.editing.ShapeAdapter} [adapter=null] adapter for current shape
     * @returns {geotoolkit.controls.editing.ShapeAdapter}
     * @deprecated since 2.5 use setAdapter() and getAdapter() instead
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.adapter = function(adapter){};
    /**
     * Sets active and sets fill style color to either green or white
     * @param {boolean} active active state or not
     * @returns {boolean}
     * @deprecated since 2.5 use setActive() and isActive() instead
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.active = function(active){};
    /**
     * Sets the adapter which owns this handle.
     * @param {geotoolkit.controls.editing.ShapeAdapter} adapter The owner adapter
     * @returns {geotoolkit.controls.editing.AbstractHandle}
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.setAdapter = function(adapter){};
    /**
     * Returns the adapter which owns this handle.
     * @returns {geotoolkit.controls.editing.ShapeAdapter|null} The owner adapter
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.getAdapter = function(){};
    /**
     * Sets active state of this handle. Active state defines which style will be used
     * when rendering the handle.
     * @param {boolean} active Active state flag
     * @returns {geotoolkit.controls.editing.AbstractHandle}
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.setActive = function(active){};
    /**
     * Returns active state of this handle. Active state defines which style will be used
     * when rendering the handle.
     * @returns {boolean} active Active state flag
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.isActive = function(){};
    /**
     * Return fill style for active state
     *
     * @returns {geotoolkit.attributes.FillStyle} fillStyle current fill style
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.getActiveFillStyle = function(){};
    /**
     * Sets fill style for active state
     *
     * @param {geotoolkit.attributes.FillStyle | string | object} fillStyle a new fill style
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.editing.AbstractHandle} this
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.setActiveFillStyle = function(fillStyle, merge){};
    /**
     * Sets fill style for active state
     *
     * @param {geotoolkit.attributes.LineStyle | string | object} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.editing.AbstractHandle} this
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.setActiveLineStyle = function(lineStyle, merge){};
    /**
     * Return fill style for inactive state
     *
     * @returns {geotoolkit.attributes.LineStyle} gets current active line style
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.getActiveLineStyle = function(){};
    /**
     * Sets fill style for active state
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.editing.AbstractHandle} this
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.setInactiveLineStyle = function(lineStyle, merge){};
    /**
     * Return fill style for inactive state
     *
     * @returns {geotoolkit.attributes.LineStyle} gets current inactive line style
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.getInactiveLineStyle = function(){};
    /**
     * Return fill style for inactive state
     *
     * @returns {geotoolkit.attributes.FillStyle} fillStyle current fill style
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.getInactiveFillStyle = function(){};
    /**
     * Sets fill style for inactive state
     *
     * @param {geotoolkit.attributes.FillStyle | string | object} fillStyle a new fill style
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.editing.AbstractHandle} this
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.setInactiveFillStyle = function(fillStyle, merge){};
    /**
     * Render the handle
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @function
     * @abstract
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.render = function(context){};
    /**
     * Sets a json with information required to operate this handle.
     * The information may be different for every adapter and defined by adapter itself
     *
     * @param {object} operationInfo operation info contains x, y, width and height as numbers
     * @returns {geotoolkit.controls.editing.AbstractHandle} this
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.setOperationInfo = function(operationInfo){};
    /**
     * Returns a json with information required to operate this handle.
     * The information may be different for every adapter and defined by adapter itself
     *
     * @returns {object|null} The Operation Info
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.getOperationInfo = function(){};
    /**
     * Gets properties pertaining to this handle
     * @returns {object} properties
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.getProperties = function(){};
    /**
     * Sets properties pertaining to this object
     * @param {object} props object with the new properties to set
     * @param {geotoolkit.attributes.FillStyle | string | object} [props.activefillstyle] Fill style of the handle when it is active
     * @param {geotoolkit.attributes.FillStyle | string | object} [props.inactivefillstyle] Fill style to apply to handle when it is not active
     * @param {geotoolkit.attributes.LineStyle | string | object} [props.activelinestyle] Line style of the handle when it is active
     * @param {geotoolkit.attributes.LineStyle | string | object} [props.inactivelinestyle] Line style to apply to handle when it is not active
     * @param {object} [props.operationinfo] operation info contains x, y, width and height as numbers
     * @param {geotoolkit.controls.editing.ShapeAdapter} [props.shapeadapter] The owner adapter
     * @param {boolean} [props.active] Active state flag
     * @returns {geotoolkit.controls.editing.AbstractHandle} this
     */
    geotoolkit.controls.editing.AbstractHandle.prototype.setProperties = function(props){};

/**
 * Implements a handle which has an option to create a ghost of itself and has the api to manage the ghost.
 * @class geotoolkit.controls.editing.GhostBearingHandle
 * @augments geotoolkit.controls.editing.AbstractHandle
 * @param {object} params JSON containing handle properties
 * @param {geotoolkit.attributes.LineStyle | string | object} [params.ghostlinestyle='rgba(0, 0, 0, 0.4)'] The line style to apply to the ghost
 * @param {geotoolkit.attributes.FillStyle | string | object} [params.ghostfillstyle='rgba(0, 0, 0, 0.2)'] The fill style to apply to the ghost
 * width and height will be set to that number
 */
geotoolkit.controls.editing.GhostBearingHandle = {};
    /**
     * Returns true if a ghost has been initialized for this handle
     * @returns {boolean}
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.hasGhost = function(){};
    /**
     * If a ghost exists, this method disposes the ghost
     * @returns {geotoolkit.controls.editing.GhostBearingHandle}
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.removeGhost = function(){};
    /**
     * Disposes this handle, Clear all listeners and remove the ghost
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.dispose = function(){};
    /**
     * Creates a copy of this handle, sets ghost styles, registers it as a ghosts
     * and returns the ghost
     * @returns {geotoolkit.controls.editing.GhostBearingHandle}
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.createGhost = function(){};
    /**
     * Returns true if this handle is a ghost
     * @returns {boolean}
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.isGhost = function(){};
    /**
     * Returns the ghost registered with this handle. If ghost does not exists, returns null
     * @returns {null|geotoolkit.controls.editing.GhostBearingHandle}
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.getGhost = function(){};
    /**
     * Resets ghost anchors and transformation to match the real handle
     * @returns {geotoolkit.controls.editing.GhostBearingHandle} this
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.resetGhost = function(){};
    /**
     * Sets a flag to this handle which specifies if it is currently a ghost, used internally
     * @param {boolean} ghost Is Ghost flag
     * @returns {geotoolkit.controls.editing.GhostBearingHandle}
     * @protected
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.setGhostMode = function(ghost){};
    /**
     * Gets the handle to which this ghost is associated
     * @returns {null|geotoolkit.controls.editing.GhostBearingHandle}
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.getParentHandle = function(){};
    /**
     * Sets the handle to which this ghost is associated, used internally
     * @param {geotoolkit.controls.editing.GhostBearingHandle} parent The parent to associate this handle with
     * @returns {geotoolkit.controls.editing.GhostBearingHandle}
     * @protected
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.setParentHandle = function(parent){};
    /**
     * Gets or sets current adapter of the real handle. Gets if the parameter is not specified or null. Sets new
     * adapter if the parameter is not null
     * @param {geotoolkit.controls.editing.ShapeAdapter} [adapter=null] adapter for current shape
     * @returns {geotoolkit.controls.editing.ShapeAdapter}
     * @deprecated since 2.6 use setAdapter() and getAdapter() instead
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.adapter = function(adapter){};
    /**
     * Sets current adapter of the real handle if this is a ghost, otherwise sets the adapter to this handle
     * @param {geotoolkit.controls.editing.ShapeAdapter} [adapter] adapter for current shape
     * @returns {geotoolkit.controls.editing.GhostBearingHandle} this
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.setAdapter = function(adapter){};
    /**
     * Returns current adapter of the real handle if this is a ghost, otherwise returns the adapter to this handle
     * @returns {geotoolkit.controls.editing.ShapeAdapter|null}
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.getAdapter = function(){};
    /**
     * Gets properties pertaining to this handle
     * @returns {object} properties
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.getProperties = function(){};
    /**
     * Sets properties pertaining to this object
     * @param {object} props
     * @param {geotoolkit.attributes.LineStyle | string | object} [props.ghostlinestyle] The line style to apply to the ghost
     * @param {geotoolkit.attributes.FillStyle | string | object} [props.ghostfillstyle] The fill style to apply to the ghost
     * @param {boolean} [props.isghost] Is Ghost flag
     * @returns {geotoolkit.controls.editing.GhostBearingHandle} this
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.setProperties = function(props){};
    /**
     * Sets visibility of the handle and its ghost
     * @param {boolean} visible Visibility flag
     * @returns {geotoolkit.controls.editing.GhostBearingHandle}
     */
    geotoolkit.controls.editing.GhostBearingHandle.prototype.setVisible = function(visible){};

/**
 * Implements a handle which has an anchor point and a size. The shape uses symbols to render and accepts painters
 * to change the rendering shape. Anchored handle extends Ghost Bearung Hanle, thus handles ghost rendering in device
 * space as well as model space
 *
 * @class geotoolkit.controls.editing.AnchoredHandle
 * @augments geotoolkit.controls.editing.GhostBearingHandle
 * @param {object | number} x X coordinate of handle anchor or a JSON with handle properties
 * @param {geotoolkit.util.Dimension|number} [x.size] The two dimensional size of the anchor
 * @param {number} [x.x] X coordinate of handle's anchor
 * @param {number} [x.y] Y coordinate of handle's anchor
 * @param {function} [x.painter] Painter used to draw the handle
 * @param {boolean} [x.isindevicespace] Flag defining if the handle is in device space
 * @param {number} [y] Y coordinate of handle anchor
 * @param {number|geotoolkit.util.Dimension} [size] The two dimensional size of the anchor
 */
geotoolkit.controls.editing.AnchoredHandle = {};
    /**
     * Sets the point defining the anchor of this handle (coordinates of the symbol)
     * @param {geotoolkit.util.Point} anchor position
     * @returns {geotoolkit.controls.editing.AnchoredHandle}
     */
    geotoolkit.controls.editing.AnchoredHandle.prototype.setAnchor = function(anchor){};
    /**
     * Returns the position of the handle
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.editing.AnchoredHandle.prototype.getAnchor = function(){};
    /**
     * Sets the size of the handle. Size is defined in two dimensions and is rendered
     * with respect to the anchor of this handle
     * @param {geotoolkit.util.Dimension} size size of the handle
     * @returns {geotoolkit.controls.editing.AnchoredHandle}
     */
    geotoolkit.controls.editing.AnchoredHandle.prototype.setHandleSize = function(size){};
    /**
     * Return handle size as a two-dimensional unit
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.controls.editing.AnchoredHandle.prototype.getHandleSize = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.editing.AnchoredHandle.prototype.render = function(context){};
    /**
     * Check if object is within rendering area
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean}
     */
    geotoolkit.controls.editing.AnchoredHandle.prototype.checkCollision = function(context){};
    /**
     * Gets properties pertaining to this handle
     * @override
     * @returns {object} props JSON with properties
     * @returns {geotoolkit.util.Dimension} props.size The two dimensional size of the anchor
     * @returns {number} props.x X coordinate of handle's anchor
     * @returns {number} props.y Y coordinate of handle's anchor
     * @returns {function} props.painter Painter used to draw the handle
     * @returns {boolean} props.isindevicespace Flag defining if the handle is in device space
     */
    geotoolkit.controls.editing.AnchoredHandle.prototype.getProperties = function(){};
    /**
     * Gets properties pertaining to this handle
     * @override
     * @param {object} props JSON with properties
     * @param {geotoolkit.util.Dimension} [props.size] The two dimensional size of the anchor
     * @param {number} [props.x] X coordinate of handle's anchor
     * @param {number} [props.y] Y coordinate of handle's anchor
     * @param {function} [props.painter] Painter used to draw the handle
     * @param {boolean} [props.isindevicespace] Flag defining if the handle is in device space
     * @returns {geotoolkit.controls.editing.AnchoredHandle}
     */
    geotoolkit.controls.editing.AnchoredHandle.prototype.setProperties = function(props){};

/**
 * Defines a shape to draw bounds around shape
 *
 * @class geotoolkit.controls.editing.Box
 * @augments geotoolkit.scene.shapes.Rectangle
 *
 * @param {number | object} [x1]
 * x coordinate of the top left corner OR options to specify rectangle { x1 : {number}, y1 : {number}, x2 :
 * {number}, y2 : {number} }
 * @param {number} [y1]
 * y coordinate of the top left corner
 * @param {number} [x2]
 * x coordinate of the bottom right corner
 * @param {number} [y2]
 * y coordinate of the bottom right corner
 * @deprecated since 2.6 use geotoolkit.controls.editing.BoxHandle instead
 */
geotoolkit.controls.editing.Box = {};
    /**
     * Gets or sets current adapter. Gets if the parameter is not specified or null. Sets new adapter if the parameter
     * is not null
     * @param {geotoolkit.controls.editing.ShapeAdapter} [adapter=null] adapter for current shape
     * @returns {geotoolkit.controls.editing.ShapeAdapter}
     * @deprecated since 2.6 use setAdapter() and getAdapter() instead
     */
    geotoolkit.controls.editing.Box.prototype.adapter = function(adapter){};
    /**
     * Gets current adapter
     * @returns {geotoolkit.controls.editing.ShapeAdapter}
     */
    geotoolkit.controls.editing.Box.prototype.getAdapter = function(){};
    /**
     * Sets new adapter
     * @param {geotoolkit.controls.editing.ShapeAdapter} adapter adapter for current shape
     * @returns {geotoolkit.controls.editing.Box} this
     */
    geotoolkit.controls.editing.Box.prototype.setAdapter = function(adapter){};
    /**
     * Return fill style for active state
     *
     * @returns {geotoolkit.attributes.FillStyle} fillStyle current fill style
     */
    geotoolkit.controls.editing.Box.prototype.getActiveFillStyle = function(){};
    /**
     * Sets fill style for active state
     *
     * @param {geotoolkit.attributes.FillStyle | geotoolkit.attributes.GradientStyle} fillStyle a new fill style
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.editing.Box} this
     */
    geotoolkit.controls.editing.Box.prototype.setActiveFillStyle = function(fillStyle, merge){};
    /**
     * Return fill style for inactive state
     *
     * @returns {geotoolkit.attributes.FillStyle} fillStyle current fill style
     */
    geotoolkit.controls.editing.Box.prototype.getInactiveFillStyle = function(){};
    /**
     * Sets fill style for inactive state
     *
     * @param {geotoolkit.attributes.FillStyle | geotoolkit.attributes.GradientStyle} fillStyle a new fill style
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.editing.Box} this
     */
    geotoolkit.controls.editing.Box.prototype.setInactiveFillStyle = function(fillStyle, merge){};
    /**
     * Sets active
     *
     * @param {boolean} active active state or not
     * @returns {boolean}
     * @deprecated since 2.6 use setActive() and isActive() instead
     */
    geotoolkit.controls.editing.Box.prototype.active = function(active){};
    /**
     * Sets active
     *
     * @param {boolean} active active state or not
     * @returns {geotoolkit.controls.editing.Box} this
     */
    geotoolkit.controls.editing.Box.prototype.setActive = function(active){};
    /**
     * Returns active state of this Box
     * @returns {boolean}
     */
    geotoolkit.controls.editing.Box.prototype.isActive = function(){};
    /**
     * Sets the operation info for this item
     * Operation info contains x, y, width and height as numbers
     *
     * @param {object} operationInfo contains four parameters X,Y,Width and Heigth
     * @returns {geotoolkit.controls.editing.Box} this
     */
    geotoolkit.controls.editing.Box.prototype.setOperationInfo = function(operationInfo){};
    /**
     * Gets the operation info for this item
     * Operation info contains x, y, width and height as numbers
     *
     * @returns {object} The Operation Info
     */
    geotoolkit.controls.editing.Box.prototype.getOperationInfo = function(){};
    /**
     * Gets properties pertaining to this handle
     * @returns {object} properties
     */
    geotoolkit.controls.editing.Box.prototype.getProperties = function(){};
    /**
     * Sets properties pertaining to this object
     * @param {object} props object with the new properties to set
     * @param {geotoolkit.attributes.FillStyle|geotoolkit.attributes.GradientStyle} [props.activefillstyle] Fill style of the handle when it is active
     * @param {geotoolkit.attributes.FillStyle|geotoolkit.attributes.GradientStyle} [props.inactivefillstyle] Fill style to apply to handle when it is not active
     * @param {boolean} [props.active] Active state flag
     * @returns {geotoolkit.controls.editing.Box} this
     */
    geotoolkit.controls.editing.Box.prototype.setProperties = function(props){};

/**
 * Defines a shape to draw handles for rectangle.
 * @class geotoolkit.controls.editing.BoxHandle
 * @augments geotoolkit.controls.editing.GhostBearingHandle
 * @param {number | object} [options] x coordinate of the top left corner or a JSON object with properties
 * @param {geotoolkit.util.Rect} [options.rect] Rect object
 * @param {geotoolkit.attributes.FillStyle | string | object} [options.activefillstyle = 'rgba(0, 255, 0, 0.1)'] The fill style to apply to the active handle
 * @param {geotoolkit.attributes.FillStyle | string | object} [options.inactivefillstyle = 'transparent'] The fill style to apply to the inactive handle
 * @param {number} [y1] y coordinate of the top left corner
 * @param {number} [x2] x coordinate of the bottom right corner
 * @param {number} [y2] y coordinate of the bottom right corner
 */
geotoolkit.controls.editing.BoxHandle = {};
    /**
     * Sets properties pertaining to this object
     * @param {object} [props] JSON object with properties
     * @param {geotoolkit.util.Rect} [props.rect] Rect object
     * @override
     * @returns {geotoolkit.controls.editing.BoxHandle}
     */
    geotoolkit.controls.editing.BoxHandle.prototype.setProperties = function(props){};
    /**
     * Invalidate node
     * @param {geotoolkit.util.Rect} [bounds] optional rectangular area to be invalidated, or force flag if rectangle is empty
     * @param {boolean} [force] optional boolean parameter that can force invalidation
     * @returns {geotoolkit.controls.editing.BoxHandle} this
     */
    geotoolkit.controls.editing.BoxHandle.prototype.invalidate = function(bounds, force){};
    /**
     * Gets properties pertaining to this handle
     * @override
     * @returns {object} properties see {@link geotoolkit.controls.editing.BoxHandle#setProperties setProperties} for more info
     */
    geotoolkit.controls.editing.BoxHandle.prototype.getProperties = function(){};
    /**
     * Sets rectangle
     * @param {geotoolkit.util.Rect} bounds Bounds of rectangle
     * @returns {geotoolkit.controls.editing.BoxHandle}
     */
    geotoolkit.controls.editing.BoxHandle.prototype.setRect = function(bounds){};
    /**
     * Gets rectangle
     * @returns {geotoolkit.util.Rect} bounds Bounds of rectangle
     */
    geotoolkit.controls.editing.BoxHandle.prototype.getRect = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.editing.BoxHandle.prototype.render = function(){};

/**
 * Defines a shape to draw handles for line
 * @class geotoolkit.controls.editing.LineBox
 * @augments geotoolkit.controls.editing.GhostBearingHandle
 * @param {number | object} [x1] x coordinate of the start or a JSON object with properties
 * @param {number} [y1] y coordinate of the start
 * @param {number} [x2] x coordinate of the end
 * @param {number} [y2] y coordinate of the end
 */
geotoolkit.controls.editing.LineBox = {};
    /**
     * Gets properties pertaining to this handle
     * @returns {object} properties
     */
    geotoolkit.controls.editing.LineBox.prototype.getProperties = function(){};
    /**
     * Sets properties pertaining to this object
     * @param {object} props
     * @param {number} [props.x1] x coordinate of the start
     * @param {number} [props.y1] y coordinate of the start
     * @param {number} [props.x2] x coordinate of the end
     * @param {number} [props.y2] y coordinate of the end
     * @param {number} [props.linewidth] line width
     * @returns {geotoolkit.controls.editing.LineBox} this
     */
    geotoolkit.controls.editing.LineBox.prototype.setProperties = function(props){};
    /**
     * Renders the handle
     * @param {geotoolkit.renderer.RenderingContext} context
     */
    geotoolkit.controls.editing.LineBox.prototype.render = function(context){};
    /**
     * Sets two points defining the line, or one of the edges
     * @param {object|geotoolkit.util.Point} point1 The first point defining the line (from), or an object with points
     * @param {geotoolkit.util.Point} [point1.from] The first point defining the line (from)
     * @param {geotoolkit.util.Point} [point1.to] The second point defining the line (to)
     * @param {geotoolkit.util.Point} [point2] The second point defining the line (to)
     * @returns {geotoolkit.controls.editing.LineBox} this
     */
    geotoolkit.controls.editing.LineBox.prototype.setLine = function(point1, point2){};
    /**
     * Returns the point defining "From" coordinate of the line
     * @returns {*|geotoolkit.util.Point}
     */
    geotoolkit.controls.editing.LineBox.prototype.getFrom = function(){};
    /**
     * Returns the point defining "To" coordinate of the line
     * @returns {*|geotoolkit.util.Point}
     */
    geotoolkit.controls.editing.LineBox.prototype.getTo = function(){};
    /**
     * Changes the line to match its center point with the provided point. Length remains the same
     * @param {geotoolkit.util.Point} anchor
     * @returns {geotoolkit.controls.editing.LineBox} this
     */
    geotoolkit.controls.editing.LineBox.prototype.setAnchor = function(anchor){};

/**
 * Defines a shape to draw a handle. The shape is part of the editor feature that lets a user interact with a shape.<br>
 * It provides the rendering for the handles that can be grabbed and moved by the user.
 *
 * @class geotoolkit.controls.editing.Handle
 * @augments geotoolkit.controls.editing.AnchoredHandle
 * @param {object | number} x X coordinate of handle anchor or a JSON with handle properties
 * @param {geotoolkit.util.Dimension} [x.size] The two dimensional size of the anchor
 * @param {number} [x.x] X coordinate of handle's anchor
 * @param {number} [x.y] Y coordinate of handle's anchor
 * @param {function} [x.painter] Painter used to draw the handle
 * @param {boolean} [x.isindevicespace] Flag defining if the handle is in device space
 * @param {number} [y] Y coordinate of handle anchor
 * @param {number|geotoolkit.util.Dimension} [size] The two dimensional size of the anchor
 */
geotoolkit.controls.editing.Handle = {};

/**
 * Defines an abstract adapter to perform operation for shapes<br>
 * This is the parent class for shape adapters responsible of implementing editing capabilities for a shape.
 * @class geotoolkit.controls.editing.ShapeAdapter
 * @augments geotoolkit.util.EventDispatcher
 */
geotoolkit.controls.editing.ShapeAdapter = {};
    /**
     * Get state of the adapter
     * @returns {boolean}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.isInitialized = function(){};
    /**
     * Initialize
     * @returns {boolean}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.initialize = function(){};
    /**
     * Sets registry
     * @param {geotoolkit.controls.editing.ShapeAdapterRegistry} registry associated with current shape adapter
     * @returns {geotoolkit.controls.editing.ShapeAdapter} this
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.setRegistry = function(registry){};
    /**
     * Return transformation
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.getTransformation = function(){};
    /**
     * Update
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.update = function(){};
    /**
     * Return manipulator layer
     * @returns {*}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.getManipulatorLayer = function(){};
    /**
     * Sets shape to be modified
     * @param {geotoolkit.scene.Node} shape shape to be modified
     * @returns {geotoolkit.controls.editing.ShapeAdapter}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.setShape = function(shape){};
    /**
     * Shape
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.getShape = function(){};
    /**
     * Activate
     * @param {boolean} active active state or not
     * @returns {boolean}
     * @deprecated since 2.6 use setActive() and isActive() instead
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.active = function(active){};
    /**
     * Activate
     * @param {boolean} active active state or not
     * @returns {geotoolkit.controls.editing.ShapeAdapter}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.setActive = function(active){};
    /**
     * Returns active state of this handle
     * @returns {boolean}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.isActive = function(){};
    /**
     * Sets active handle
     * @param {geotoolkit.controls.editing.Handle} handle active handle
     * @returns {geotoolkit.controls.editing.ShapeAdapter} this
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.setActiveHandle = function(handle){};
    /**
     * Gets active handle
     * @returns {*}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.getActiveHandle = function(){};
    /**
     * Sets position
     * @param {number} [x] x coordinate
     * @param {number} [y] y coordinate
     * @returns {geotoolkit.controls.editing.ShapeAdapter}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.setPosition = function(x, y){};
    /**
     * Gets position
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.getPosition = function(){};
    /**
     * Move adapter and send event {geotoolkit.controls.editing.ShapeAdapter.Moved}
     * @param {number} x x position
     * @param {number} y y position
     * @returns {geotoolkit.controls.editing.ShapeAdapter} this
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.move = function(x, y){};
    /**
     * Returns empty object
     * @returns {object}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.getProperties = function(){};
    /**
     * OnMove
     * @function
     * @abstract
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {geotoolkit.controls.editing.ShapeAdapter}
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.onMove = function(x, y){};
    /**
     * Active state is changed
     * @function
     * @abstract
     * @param {boolean} active active state or not
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.onActiveStateChanged = function(active){};
    /**
     * OnInitialize
     * @function
     * @abstract
     * @returns {boolean} success true if initialized successfully
     */
    geotoolkit.controls.editing.ShapeAdapter.prototype.onInitialize = function(){};
    /**
     * ShapeAdapter Events enumerator
     * @enum
     * @readonly
     */
    geotoolkit.controls.editing.ShapeAdapter.Events = {};
        /**
         * Shape adapter is moved
         * @type {string}
         */
        geotoolkit.controls.editing.ShapeAdapter.Events.Moved = "";
        /**
         * Adapter position is changed
         * @type {string}
         */
        geotoolkit.controls.editing.ShapeAdapter.Events.PositionChanged = "";
        /**
         * Active state is changed
         * @type {string}
         */
        geotoolkit.controls.editing.ShapeAdapter.Events.ActiveStateChanged = "";

/**
 * Defines a shape adapter which has functionality to manipulate Symbols.
 * This adapter associates itself to an instance of Symbol shape, creates a handle rendered on top of the shape
 * and allows dragging the shape around the scene.
 *
 * @class geotoolkit.controls.editing.SymbolAdapter
 * @augments geotoolkit.controls.editing.ShapeAdapter
 */
geotoolkit.controls.editing.SymbolAdapter = {};
    /**
     * Called during initialization process. Creates handles
     * @returns {boolean}
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.onInitialize = function(){};
    /**
     * Updates the parameters of the handles to match the current state
     * of the shape and adapter
     * @returns {geotoolkit.controls.editing.SymbolAdapter}
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.updateHandles = function(){};
    /**
     * Sets shape to be modified
     * @param {geotoolkit.scene.Node} shape shape to be modified
     * @returns {geotoolkit.controls.editing.SymbolAdapter}
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.setShape = function(shape){};
    /**
     * Sets the visibility of the handles registered with this adapter
     * @param {boolean} visible Visibility to set on handles
     * @returns {geotoolkit.controls.editing.SymbolAdapter}
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.setHandlesVisible = function(visible){};
    /**
     * Called when adapter goes from active to non-active and vice versa
     * @param {boolean} active New state of the adapter
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.onActiveStateChanged = function(active){};
    /**
     * Moves the handle and the shape, if shape editing is enabled
     * @param {number} x The device x position to move to
     * @param {number} y The device y position to move to
     * @param {object} [eventArgs] Event arguments from the calling tool
     * @returns {geotoolkit.controls.editing.SymbolAdapter}
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.onMove = function(x, y, eventArgs){};
    /**
     * Called when a handle owned by this adapter has been released and editing stops.
     * @param {number} x X coordinate of pointer when mouseup occurred
     * @param {number} y Y coordinate of pointer when mouseup occurred
     * @param {object} [eventArgs] Event arguments from the calling tool
     * @returns {geotoolkit.controls.editing.SymbolAdapter}
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.release = function(x, y, eventArgs){};
    /**
     * Called when a handle owned by this adapter has been selected and activated. The editing began.
     * @param {number} x X coordinate of the point where the mouse was clicked to engage the handle
     * @param {number} y Y coordinate of the point where the mouse was clicked to engage the handle
     * @param {object} [eventArgs] arguments from the event that started the change
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.engage = function(x, y, eventArgs){};
    /**
     * Sets the flag defining if this adapter has to directly edit the shape which it is associated with.
     * Otherwise it will only send an event.
     * @param {boolean} allow True to edit the shape directly
     * @returns {geotoolkit.controls.editing.SymbolAdapter}
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.setAllowShapeEdit = function(allow){};
    /**
     * Returns the flag defining if this adapter directly edits the shape which it is associated with.
     * @returns {boolean} True if shape is being edited
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.getAllowShapeEdit = function(){};
    /**
     * Sets the flag defining if a ghost should be moved instead of an actual handle when the shape is being manipulated.
     * @param {boolean} show True to display a ghost handle
     * @returns {geotoolkit.controls.editing.SymbolAdapter}
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.setShowGhost = function(show){};
    /**
     * Returns the flag defining if a ghost is moved instead of an actual handle when the shape is being manipulated.
     * @returns {boolean}
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.getShowGhost = function(){};
    /**
     * Sets styles for active, inactive, and ghost states of all handles, and redraws the handle
     * @param {object} styles JSON containing stylings for different types of handle states
     * @param {geotoolkit.attributes.LineStyle | string | object} [styles.ghostlinestyle] Line Style of the handle when it is in ghost state
     * @param {geotoolkit.attributes.FillStyle | string | object} [styles.ghostfillstyle] Fill Style of the handle when it is in ghost state
     * @param {geotoolkit.attributes.FillStyle | string | object} [styles.activefillstyle] Fill Style of the handle when it is selected and active
     * @param {geotoolkit.attributes.FillStyle | string | object} [styles.inactivefillstyle] Fill Style of the handle when it is selected and active
     * @param {geotoolkit.attributes.LineStyle | string | object} [styles.activelinestyle] Line Style of the handle when when it is inactive (most of the time)
     * @param {geotoolkit.attributes.LineStyle | string | object} [styles.inactivelinestyle] Line Style of the handle when when it is inactive (most of the time)
     * @returns {geotoolkit.controls.editing.SymbolAdapter}
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.setHandleStyles = function(styles){};
    /**
     * Updates the state of the adapter, recalculates position and size of handles, and redraws.
     * @returns {geotoolkit.controls.editing.SymbolAdapter}
     */
    geotoolkit.controls.editing.SymbolAdapter.prototype.update = function(){};

/**
 * Defines adapter to scale and move rectangular shape
 *
 * @class geotoolkit.controls.editing.scaling.RectangularShapeAdapter
 * @augments geotoolkit.controls.editing.ShapeAdapter
 * @param {object} [options] options
 * @param {object} [options.box] options for box
 * @param {object} [options.box.activefillstyle] options for active box fill style
 * @param {object} [options.box.inactivefillstyle] options for inactive box inactive fill style
 * @param {object} [options.box.linestyle] options for box line style
 * @param {array<geotoolkit.util.AnchorType>} [options.handlers] handlers positions
 */
geotoolkit.controls.editing.scaling.RectangularShapeAdapter = {};
    /**
     * @param {object} [options] options
     * @param {object} [options.box] options for box
     * @param {object} [options.box.activefillstyle] options for active box fill style
     * @param {object} [options.box.inactivefillstyle] options for inactive box inactive fill style
     * @param {object} [options.box.linestyle] options for box line style
     * @param {array<geotoolkit.util.AnchorType>} [options.handlers] handlers positions
     * @returns {geotoolkit.controls.editing.scaling.RectangularShapeAdapter} this
     */
    geotoolkit.controls.editing.scaling.RectangularShapeAdapter.prototype.setOptions = function(options){};
    /**
     * Sets shape
     * @param {geotoolkit.scene.Node} shape current shape
     * @returns {geotoolkit.controls.editing.scaling.RectangularShapeAdapter}
     */
    geotoolkit.controls.editing.scaling.RectangularShapeAdapter.prototype.setShape = function(shape){};
    /**
     * Return shape bounds
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.controls.editing.scaling.RectangularShapeAdapter.prototype.getShapeBounds = function(){};
    /**
     * Active state is changed
     *
     * @param {boolean} active active state or not
     */
    geotoolkit.controls.editing.scaling.RectangularShapeAdapter.prototype.onActiveStateChanged = function(active){};
    /**
     * Return box handle
     * @returns {geotoolkit.controls.editing.Box}
     * @deprecated since 2.6 use getHandle() instead
     */
    geotoolkit.controls.editing.scaling.RectangularShapeAdapter.prototype.getBoxHandle = function(){};
    /**
     * Return box handle
     * @returns {geotoolkit.controls.editing.BoxHandle}
     */
    geotoolkit.controls.editing.scaling.RectangularShapeAdapter.prototype.getHandle = function(){};
    /**
     * OnInitialize
     *
     * @returns {boolean} success true if initialized successfully
     */
    geotoolkit.controls.editing.scaling.RectangularShapeAdapter.prototype.onInitialize = function(){};
    /**
     * OnMove
     *
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {geotoolkit.controls.editing.scaling.RectangularShapeAdapter} this
     */
    geotoolkit.controls.editing.scaling.RectangularShapeAdapter.prototype.onMove = function(x, y){};
    /**
     * Sets linestyle and fillstyle for the main handle (rectangle) and all the corner handles (squares)
     *
     * @param {object} [json] json object for new style
     * @param {object} [json.main] object contains properties for main rectangle
     * @param {geotoolkit.attributes.LineStyle | string | object} [json.main.linestyle] linestyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [json.main.fillstyle] fillstyle
     * @param {object} [json.corners] object contains properties for all the corners and sides handles
     * @param {geotoolkit.attributes.LineStyle | string | object} [json.corners.linestyle] linestyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [json.corners.fillstyle] fillstyle
     * @returns {geotoolkit.controls.editing.scaling.RectangularShapeAdapter} this
     */
    geotoolkit.controls.editing.scaling.RectangularShapeAdapter.prototype.setStyle = function(json){};
    /**
     * Update handles
     */
    geotoolkit.controls.editing.scaling.RectangularShapeAdapter.prototype.updateHandles = function(){};

/**
 * Defines a registry of shape adapters to edit shapes
 *
 * @class geotoolkit.controls.editing.ShapeAdapterRegistry
 * @augments geotoolkit.util.EventDispatcher
 * @param {geotoolkit.plot.Plot} plot plot which renders node
 * @param {geotoolkit.scene.CompositeNode} manipulatorLayer layer to put temporary shapes in
 */
geotoolkit.controls.editing.ShapeAdapterRegistry = {};
    /**
     * ShapeAdapterRegistry's Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.controls.editing.ShapeAdapterRegistry.Events = {};
        /**
         * Event type fired when an adapter is deactivated
         * @type {string}
         */
        geotoolkit.controls.editing.ShapeAdapterRegistry.Events.Deactivated = "";
        /**
         * Event type fired when an adapter is activated
         * @type {string}
         */
        geotoolkit.controls.editing.ShapeAdapterRegistry.Events.Activated = "";
    /**
     * Update plot
     */
    geotoolkit.controls.editing.ShapeAdapterRegistry.prototype.update = function(){};
    /**
     * Return manipulator layer
     * @returns {*}
     */
    geotoolkit.controls.editing.ShapeAdapterRegistry.prototype.getManipulatorLayer = function(){};
    /**
     * Register shape adapter
     * @param {string} classType class name of shape
     * @param {geotoolkit.controls.editing.ShapeAdapter} shapeAdapter instance of shape adapter
     * @returns {geotoolkit.controls.editing.ShapeAdapterRegistry} this
     */
    geotoolkit.controls.editing.ShapeAdapterRegistry.prototype.register = function(classType, shapeAdapter){};
    /**
     * Return adapter for the specified shape
     * @param {*|string} shape current shape
     * @returns {?*}
     */
    geotoolkit.controls.editing.ShapeAdapterRegistry.prototype.getAdapter = function(shape){};
    /**
     * Gets a list of all shape classes, previously registered using register method
     * @returns {Array<string>} a collection of classes that have associated adapters
     */
    geotoolkit.controls.editing.ShapeAdapterRegistry.prototype.getRegisteredClasses = function(){};
    /**
     * Sets transformation
     * @param {geotoolkit.util.Transformation} transformation transformation
     * @returns {geotoolkit.controls.editing.ShapeAdapterRegistry} this
     */
    geotoolkit.controls.editing.ShapeAdapterRegistry.prototype.setTransformation = function(transformation){};
    /**
     * Gets transformation
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.controls.editing.ShapeAdapterRegistry.prototype.getTransformation = function(){};
    /**
     * Sets active adapter and send events
     * @param {geotoolkit.controls.editing.ShapeAdapter} adapter instance of shape adapter
     * @returns {geotoolkit.controls.editing.ShapeAdapterRegistry} this
     */
    geotoolkit.controls.editing.ShapeAdapterRegistry.prototype.setActiveAdapter = function(adapter){};
    /**
     * Return adapter
     * @returns {geotoolkit.controls.editing.ShapeAdapter}
     */
    geotoolkit.controls.editing.ShapeAdapterRegistry.prototype.getActiveAdapter = function(){};

/**
 * Defines adapter to move and modify a Line shape
 *
 * @class geotoolkit.controls.editing.LineShapeAdapter
 * @augments geotoolkit.controls.editing.ShapeAdapter
 */
geotoolkit.controls.editing.LineShapeAdapter = {};
    /**
     * OnInitialize
     *
     * @returns {boolean} success true if initialized successfully
     */
    geotoolkit.controls.editing.LineShapeAdapter.prototype.onInitialize = function(){};
    /**
     * Sets shape
     * @param {geotoolkit.scene.Node} shape shape to be modified
     * @returns {geotoolkit.controls.editing.LineShapeAdapter} this
     */
    geotoolkit.controls.editing.LineShapeAdapter.prototype.setShape = function(shape){};
    /**
     * Active state is changed
     *
     * @param {boolean} active active state or not
     */
    geotoolkit.controls.editing.LineShapeAdapter.prototype.onActiveStateChanged = function(active){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.editing.LineShapeAdapter.prototype.onMove = function(){};
    /**
     * Update handles
     * @returns {geotoolkit.controls.editing.LineShapeAdapter} this
     */
    geotoolkit.controls.editing.LineShapeAdapter.prototype.updateHandles = function(){};

/**
 * Defines adapter to move and modify a positions of the polyline or polygon shape
 *
 * @class geotoolkit.controls.editing.PolyLineShapeAdapter
 * @augments geotoolkit.controls.editing.ShapeAdapter
 */
geotoolkit.controls.editing.PolyLineShapeAdapter = {};
    /**
     * OnInitialize
     *
     * @returns {boolean} success true if initialized successfully
     */
    geotoolkit.controls.editing.PolyLineShapeAdapter.prototype.onInitialize = function(){};
    /**
     * Sets shape
     * @param {geotoolkit.scene.Node} shape shape to be modified
     * @returns {geotoolkit.controls.editing.PolyLineShapeAdapter} this
     */
    geotoolkit.controls.editing.PolyLineShapeAdapter.prototype.setShape = function(shape){};
    /**
     * Active state is changed
     *
     * @param {boolean} active active state or not
     */
    geotoolkit.controls.editing.PolyLineShapeAdapter.prototype.onActiveStateChanged = function(active){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.editing.PolyLineShapeAdapter.prototype.onMove = function(){};
    /**
     * Update handles
     * @returns {geotoolkit.controls.editing.PolyLineShapeAdapter} this
     */
    geotoolkit.controls.editing.PolyLineShapeAdapter.prototype.updateHandles = function(){};

/**
 * Defines adapter to move text shape
 *
 * @class geotoolkit.controls.editing.TextShapeAdapter
 * @augments geotoolkit.controls.editing.scaling.RectangularShapeAdapter
 */
geotoolkit.controls.editing.TextShapeAdapter = {};
    /**
     * OnInitialize
     *
     * @returns {boolean} success true if initialized successfully
     */
    geotoolkit.controls.editing.TextShapeAdapter.prototype.onInitialize = function(){};
    /**
     * Sets shape
     * @param {geotoolkit.scene.Node} shape shape to be set
     * @returns {geotoolkit.controls.editing.TextShapeAdapter}
     */
    geotoolkit.controls.editing.TextShapeAdapter.prototype.setShape = function(shape){};
    /**
     * Active state is changed
     *
     * @param {boolean} active active state or not
     */
    geotoolkit.controls.editing.TextShapeAdapter.prototype.onActiveStateChanged = function(active){};
    /**
     * Return shape bounds
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.controls.editing.TextShapeAdapter.prototype.getShapeBounds = function(){};
    /**
     * Update handles
     * @returns {geotoolkit.controls.editing.TextShapeAdapter} this
     */
    geotoolkit.controls.editing.TextShapeAdapter.prototype.updateHandles = function(){};

/**
 * Defines a tick Generator for the histogram Shape
 *
 * @class geotoolkit.controls.axis.HistogramTickGenerator
 * @augments geotoolkit.axis.TickGenerator
 * @param {number} binCount number of bins this histogram has
 */
geotoolkit.controls.axis.HistogramTickGenerator = {};
    /**
     * Enum of geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy
     * @enum
     * @readonly
     */
    geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy = {};
        /**
         * Tick marks are on the edges of bins
         * @type {number}
         */
        geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy.Edge = NaN;
        /**
         * Tick Marks are in the center of bins and show a range for the bin
         * @type {number}
         */
        geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy.Range = NaN;
        /**
         * Tick Marks are in the center of bins and show the center bin value
         * @type {number}
         */
        geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy.Center = NaN;
    /**
     * Set format label handler
     * @param {function()} handler format label handler
     * @returns {geotoolkit.controls.axis.HistogramTickGenerator} this
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.setFormatLabelHandler = function(handler){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.util.NumberFormat} [properties.major.labelformat] major label format
     * @param {geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy} [properties.labelstrategy] label strategy
     * @param {number} [properties.minimumspan] minimum span distance for labels and ticks
     * @param {number} [properties.bins] number of bins this histogram has
     * @returns {geotoolkit.controls.axis.HistogramTickGenerator} this
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.setProperties = function(properties){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties An object containing the properties to set
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.getProperties = function(){};
    /**
     * Sets major label format
     * @param {geotoolkit.util.NumberFormat} format major label format
     * @returns {geotoolkit.controls.axis.HistogramTickGenerator} this
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.setMajorLabelFormat = function(format){};
    /**
     * Return major label format
     * @returns {geotoolkit.util.NumberFormat}
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.getMajorLabelFormat = function(){};
    /**
     * Sets bin count
     * @param {number} binCount number of bins this histogram has
     * @returns {geotoolkit.controls.axis.HistogramTickGenerator} this
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.setBinCount = function(binCount){};
    /**
     * Sets the label strategy
     * @param {geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy} strat label strategy
     * @returns {geotoolkit.controls.axis.HistogramTickGenerator} this
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.setLabelStrategy = function(strat){};
    /**
     * Gets the label strategy
     * @returns {geotoolkit.controls.axis.HistogramTickGenerator.LabelStrategy}
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.getLabelStrategy = function(){};
    /**
     * sets the minimum span distance for labels and ticks
     * @param {number} span minimum span distance for labels and ticks
     * @returns {geotoolkit.controls.axis.HistogramTickGenerator} this
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.setMinimumSpan = function(span){};
    /**
     * gets the minimum span distance for labels and ticks
     * @returns {number}
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.getMinimumSpan = function(){};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.controls.axis.HistogramTickGenerator} src Source to copy from
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.copyConstructor = function(src){};
    /**
     * @override
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.reset = function(){};
    /**
     * Set rotation strategy
     * @param {boolean} value rotate labels or not
     * @returns {geotoolkit.controls.axis.HistogramTickGenerator}
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.setRotateLabels = function(value){};
    /**
     * @override
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.resetTicks = function(){};
    /**
     * @override
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.resetLabels = function(){};
    /**
     * @override
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.nextTick = function(){};
    /**
     * @override
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.nextLabel = function(){};
    /**
     * @override
     */
    geotoolkit.controls.axis.HistogramTickGenerator.prototype.formatLabel = function(){};

/**
 * Define an interface for data chart visuals
 * @interface
 */
geotoolkit.controls.shapes.IChartDataVisual = {};
    /**
     * Returns flag to indicate automatic calculation of data limits
     * @function
     * @abstract
     * @returns {boolean}
     */
    geotoolkit.controls.shapes.IChartDataVisual.prototype.getAutoDataLimits = function(){};
    /**
     * Sets a flag to indicate automatic calculation of data limits
     * @function
     * @abstract
     * @param {boolean} enable enable or disable calculation of the data limits
     * @returns {geotoolkit.controls.shapes.IChartDataVisual} this
     */
    geotoolkit.controls.shapes.IChartDataVisual.prototype.setAutoDataLimits = function(enable){};
    /**
     * Return original data limits
     * @function
     * @abstract
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.controls.shapes.IChartDataVisual.prototype.getDataLimits = function(){};

/**
 * Create a advanced histogram shape, which is a graphical display of tabulated frequencies, shown as bars.<br>
 * The histogram can be customized using the options like 'bin spacing','Frequency Type', 'colors' etc. Refer to options below for more details.
 * @class geotoolkit.controls.shapes.Histogram
 * @augments geotoolkit.scene.shapes.Shape
 * @param {object} options JSON object
 * @param {Array.<number>|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} options.data data array
 * @param {geotoolkit.util.Rect} [options.bounds] bounds of the node
 * @param {number} options.bins number of bins this histogram has
 * @param {geotoolkit.controls.shapes.Histogram.FrequencyType|string} [options.frequencytype=geotoolkit.controls.shapes.Histogram.FrequencyType.Absolute] frequency type
 * @param {geotoolkit.controls.shapes.Histogram.AccumulatedMode|string} [options.accumulatedmode=geotoolkit.controls.shapes.Histogram.AccumulatedMode.Disable] accumulated mode
 * @param {geotoolkit.controls.shapes.Histogram.HistogramMode|string} [options.histogrammode=geotoolkit.controls.shapes.Histogram.HistogramMode.Linear] histogram mode
 * @param {geotoolkit.attributes.FillStyle | string | object} [options.fillstyle="rgba(128,100,255,1.0)"] fill color of the histogram bin shape
 * @param {geotoolkit.attributes.LineStyle | string | object} [options.linestyle="rgba(148,120,255,1.0)"] line color of the histogram bin shape
 * @param {boolean} [options.autogradient=false] auto gradient inside the bin to give a 3D look
 * @param {number} [options.binspacing=100] bin spacing in percentage
 * @param {number} [options.verticalscale=100] vertical scale in percentage
 * @param {number} [options.logstartvalue=0] log start value
 * @param {geotoolkit.attributes.FillStyle | string | object} [options.highlightstyle=null] highlight style
 * @param {boolean} [options.highvalueinclusive=true]
 * @param {Number} [options.minvalue=null] Lowest value to display
 * @param {Number} [options.maxvalue=null] Highest value to display
 */
geotoolkit.controls.shapes.Histogram = {};
    /**
     * Histogram's Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.controls.shapes.Histogram.Events = {};
        /**
         * Event type fired when this shapes data has been updated, kept for compatiable purpose
         * @type {string}
         */
        geotoolkit.controls.shapes.Histogram.Events.DataUpdated = "";
        /**
         * Event type fired when model limits has been updated.
         * @type {string}
         */
        geotoolkit.controls.shapes.Histogram.Events.ModelLimitsUpdated = "";
        /**
         * set or get new calculated bin count
         * @type {string}
         */
        geotoolkit.controls.shapes.Histogram.Events.BinsUpdated = "";
    /**
     * GapType
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.Histogram.GapType = {};
        /**
         * No Gap
         * @type {number}
         */
        geotoolkit.controls.shapes.Histogram.GapType.None = NaN;
        /**
         * Left Gap
         * @type {number}
         */
        geotoolkit.controls.shapes.Histogram.GapType.Left = NaN;
        /**
         * Right Gap
         * @type {number}
         */
        geotoolkit.controls.shapes.Histogram.GapType.Right = NaN;
    /**
     * FrequencyType
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.Histogram.FrequencyType = {};
        /**
         * Represents the total number of observations within a given interval or frequency bin. Sum of the absolute frequencies is equal to the total number of data.
         * @type {string}
         */
        geotoolkit.controls.shapes.Histogram.FrequencyType.Absolute = "";
        /**
         * Height of the histogram bar represents the proportion of the data in each class.
         * @type {string}
         */
        geotoolkit.controls.shapes.Histogram.FrequencyType.Normalized = "";
        /**
         * Histogram vertical axis uses relative or proportional frequency instead of simple frequency. It then shows the proportion of cases that fall into each of several categories
         * @type {string}
         */
        geotoolkit.controls.shapes.Histogram.FrequencyType.Relative = "";
    /**
     * AccumulatedMode
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.Histogram.AccumulatedMode = {};
        /**
         * Disabled
         * @type {string}
         */
        geotoolkit.controls.shapes.Histogram.AccumulatedMode.Disabled = "";
        /**
         * Enabled
         * @type {string}
         */
        geotoolkit.controls.shapes.Histogram.AccumulatedMode.Enabled = "";
    /**
     * HistogramMode
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.Histogram.HistogramMode = {};
        /**
         * Linear
         * @type {string}
         */
        geotoolkit.controls.shapes.Histogram.HistogramMode.Linear = "";
        /**
         * Logarithmic
         * @type {string}
         */
        geotoolkit.controls.shapes.Histogram.HistogramMode.Logarithmic = "";
    /**
     * Set the data to be plotted in the histogram, optionally with min and max values.
     *
     * @param {Array.<Number>|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView|object} values Data to be charted in histogram or options for histogram (for compatibility)
     * @param {number} [minValue] Lowest value to display
     * @param {number} [maxValue] Highest value to display
     * @returns {geotoolkit.controls.shapes.Histogram} this
     */
    geotoolkit.controls.shapes.Histogram.prototype.setData = function(values, minValue, maxValue){};
    /**
     * get raw data
     * @returns {object}
     * @returns {Array.<number>} [object.data] raw data set
     * @returns {number} [object.minvalue] lowest value in x axis
     * @returns {number} [object.maxvalue] highest value in x axis
     */
    geotoolkit.controls.shapes.Histogram.prototype.getData = function(){};
    /**
     * set shape properties
     * @param {object} properties JSON object, see {@link geotoolkit.controls.shapes.Histogram#setOptions}
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setProperties = function(properties){};
    /**
     * set options
     * @param {object} options JSON object
     * @param {geotoolkit.util.Rect} [options.bounds] bounds of the node
     * @param {number} [options.bins] number of bins this histogram has
     * @param {geotoolkit.controls.shapes.Histogram.FrequencyType|string} [options.frequencytype=geotoolkit.controls.shapes.Histogram.FrequencyType.Absolute] frequency type
     * @param {geotoolkit.controls.shapes.Histogram.AccumulatedMode|string} [options.accumulatedmode=geotoolkit.controls.shapes.Histogram.AccumulatedMode.Disable] accumulated mode
     * @param {geotoolkit.controls.shapes.Histogram.HistogramMode|string} [options.histogrammode=geotoolkit.controls.shapes.Histogram.HistogramMode.Linear] histogram mode
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.fillstyle=new geotoolkit.attributes.FillStyle("rgba(128,100,255,1.0)")] fill color of the histogram bin shape
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.linestyle=new geotoolkit.attributes.LineStyle("rgba(148,120,255,1.0)")] line color of the histogram bin shape
     * @param {boolean} [options.autogradient=false] auto gradient inside the bin to give a 3D look
     * @param {number} [options.binspacing=100] bin spacing in percentage
     * @param {number} [options.verticalscale=100] vertical scale in percentage
     * @param {number} [options.logstartvalue=0] log start value
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.highlightstyle=null] highlight style
     * @param {boolean} [options.highvalueinclusive=true] high value inclusive
     * @param {number} [options.minvalue=null] Lowest value to display
     * @param {number} [options.maxvalue=null] Highest value to display
     * @param {string | geotoolkit.util.Unit} [options.unit=null] represent the {string} name, {string} symbol or {geotoolkit.util.Unit} unit to be created
     * @param {boolean} [options.flipedx=false] set the flag if swap the min and max of X values
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setOptions = function(options){};
    /**
     * set neat limits for x axis
     * @param {boolean} neatlimits set if apply neat limits for x axis
     * @returns {geotoolkit.controls.shapes.Histogram} this
     */
    geotoolkit.controls.shapes.Histogram.prototype.setNeatLimitsX = function(neatlimits){};
    /**
     * set neat limits for y axis
     * @param {boolean} neatlimits set if apply neat limits for y axis
     * @returns {geotoolkit.controls.shapes.Histogram} this
     */
    geotoolkit.controls.shapes.Histogram.prototype.setNeatLimitsY = function(neatlimits){};
    /**
     * get shape properties
     * @returns {object} props see getOptions for details
     */
    geotoolkit.controls.shapes.Histogram.prototype.getProperties = function(){};
    /**
     * get histogram options
     * @returns {object} options
     * @returns {number} [options.bins] number of bins this histogram has
     * @returns {geotoolkit.controls.shapes.Histogram.FrequencyType|string} [options.frequencytype] frequency type
     * @returns {geotoolkit.controls.shapes.Histogram.AccumulatedMode|string} [options.accumulatedmode] accumulated mode
     * @returns {geotoolkit.controls.shapes.Histogram.HistogramMode|string} [options.histogrammode] histogram mode
     * @returns {geotoolkit.attributes.FillStyle} [options.fillstyle] fill color of the histogram bin shape
     * @returns {geotoolkit.attributes.LineStyle} [options.linestyle] line color of the histogram bin shape
     * @returns {boolean} [options.autogradient] auto gradient inside the bin to give a 3D look
     * @returns {number} [options.binspacing] bin spacing in percentage
     * @returns {number} [options.verticalscale] vertical scale in percentage
     * @returns {number} [options.logstartvalue] log start value
     * @returns {geotoolkit.attributes.FillStyle} [options.highlightstyle] highlight style
     * @returns {number} [options.minvalue] Lowest value to display
     * @returns {number} [options.maxvalue] Highest value to display
     * @returns {string | geotoolkit.util.Unit} [options.unit] desired unit
     * @returns {boolean} [options.flipedx] the flag if swapping the min and max of X values
     */
    geotoolkit.controls.shapes.Histogram.prototype.getOptions = function(){};
    /**
     * set desired unit for data source, the finally display unit could be not the desired one due to failling of unit coversion
     * @param {string | geotoolkit.util.Unit} unit represent the {string} name, {string} symbol or {geotoolkit.util.Unit} unit to be created
     * @returns {geotoolkit.controls.shapes.Histogram} this
     */
    geotoolkit.controls.shapes.Histogram.prototype.setUnit = function(unit){};
    /**
     * @override
     */
    geotoolkit.controls.shapes.Histogram.prototype.dispose = function(){};
    /**
     * set orientation
     * @param {geotoolkit.util.Orientation} orientation
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setOrientation = function(orientation){};
    /**
     * get orientation
     * @returns {geotoolkit.util.Orientation}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getOrientation = function(){};
    /**
     * get displayed unit
     * @returns {geotoolkit.util.Unit} unit
     */
    geotoolkit.controls.shapes.Histogram.prototype.getDisplayUnit = function(){};
    /**
     * Resets the highest and lowest values to be computed values
     */
    geotoolkit.controls.shapes.Histogram.prototype.resetValues = function(){};
    /**
     * Set the highest and lowest values to be displayed in this histogram
     *
     * @param {number} minValue lowest value to be displayed
     * @param {number} maxValue highest value to be displayed
     * @returns {geotoolkit.controls.shapes.Histogram} this
     */
    geotoolkit.controls.shapes.Histogram.prototype.setValueRange = function(minValue, maxValue){};
    /**
     * Resets the highest and lowest values to be computed values
     * @returns {boolean} _areCustomizedEdges
     */
    geotoolkit.controls.shapes.Histogram.prototype.areValuesCustomized = function(){};
    /**
     * Get lowest value to be displayed
     *
     * @returns {number} _minValue
     */
    geotoolkit.controls.shapes.Histogram.prototype.getMinValue = function(){};
    /**
     * Get highest value to be displayed
     *
     * @returns {number} _maxValue
     */
    geotoolkit.controls.shapes.Histogram.prototype.getMaxValue = function(){};
    /**
     * Returns calculated statistics of values
     * see description {@link geotoolkit.controls.shapes.Histogram.prototype.getStatisticsDescription}
     * @example
     *
     * - Data samples count
     * - min sample value
     * - max sample value
     * - average value
     * - variance value
     * - average deviation value
     * - standard deviation value
     * - skewness value
     * - standard kurtosis value
     * - Theoretical P10 value (centile)
     * - Theoretical P50 value (centile)
     * - Theoretical P90 value (centile)
     *
     * @returns {Array.<Number>} statistics
     */
    geotoolkit.controls.shapes.Histogram.prototype.getStatistics = function(){};
    /**
     * Descriptions of statistics
     * @example
     *
     * return ["Sample Count", "Min", "Max", "Average", "Variance", "Avg. Deviation", "Std. Deviation", "Skewness", "Kurtosis", "P10", "P50", "P90"]
     *
     * @returns {Array<string>}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getStatisticsDescription = function(){};
    /**
     * Maximum frequency
     * @returns {number}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getMaxFrequency = function(){};
    /**
     * Gets the frequency for the current index
     * @param {number} index current index
     * @param {boolean} ignoreMode ignore mode on or not
     * @returns {number}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getFrequency = function(index, ignoreMode){};
    /**
     * Calculate distribution with normalization
     * @param {boolean} [keepModelLimits=false] set if keep model limits unchanged
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.calculate = function(keepModelLimits){};
    /**
     * Gets the values of the bins in the following array format
     * Array [{ 'minvalue' : number, 'maxvalue' : number, 'binnumber' : number, 'frequency' : number }, ...]
     * @returns {Array.<Object>} Array of bins objects
     */
    geotoolkit.controls.shapes.Histogram.prototype.getBins = function(){};
    /**
     * Determines if type of gap a value is located on.
     * @param {number}x The x-value that is checked
     * @returns {geotoolkit.controls.shapes.Histogram.GapType|number}gapType The type of gap.
     */
    geotoolkit.controls.shapes.Histogram.prototype.getGapTypeForValue = function(x){};
    /**
     * Gets the bin at the input x value
     * @param {number} x input x value
     * @param {boolean} [excludeGaps = false] True if gaps between bins should be excluded
     * @returns {Object|null} [bin] - bin at input x value
     * @returns {number} [bin.minvalue] - bin min value
     * @returns {number} [bin.maxvalue] - bin max value
     * @returns {number} [bin.binnumber] - bin number
     * @returns {number} [bin.frequency] - bin frequency
     */
    geotoolkit.controls.shapes.Histogram.prototype.getBinAt = function(x, excludeGaps){};
    /**
     * Returns bin numbers for specified indices
     * @param {Array.<number>} indices of indices
     * @returns {Array.<number>}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getBinsByIndices = function(indices){};
    /**
     * get hit bins
     * @param {geotoolkit.util.Rect} hitArea selected area
     * @param {Array.<number>} bins the bins in certain range along x axis
     * @returns {Array.<number>} selected bins number array
     */
    geotoolkit.controls.shapes.Histogram.prototype.hitTest = function(hitArea, bins){};
    /**
     * Gets the bin at the input x value
     * @param {geotoolkit.util.Point | geotoolkit.util.Range | geotoolkit.util.Rect} x input x value
     * @returns {Array.<Object>} Array of bins objects
     */
    geotoolkit.controls.shapes.Histogram.prototype.getBinsAt = function(x){};
    /**
     * Highlight Bins
     * @param {number[]} bins indices
     * @param {boolean} reset previous selection
     */
    geotoolkit.controls.shapes.Histogram.prototype.highlightBins = function(bins, reset){};
    /**
     * get highlighted bins
     * @returns {Array.<number>} bins number array
     */
    geotoolkit.controls.shapes.Histogram.prototype.getHighlightedBins = function(){};
    /**
     * Updates the model limits
     */
    geotoolkit.controls.shapes.Histogram.prototype.updateModelLimits = function(){};
    /**
     * Sets bin count.
     *
     * @param {number} binCount
     * a count of the bins
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setBinCount = function(binCount){};
    /**
     * Sets bin count using a step value
     *
     * @param {number} binStep
     * a count of the binsthis._binCount
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setBinSteps = function(binStep){};
    /**
     * Resets the bin count to use _autoBinCount
     */
    geotoolkit.controls.shapes.Histogram.prototype.resetBinCount = function(){};
    /**
     * Returns _autoBinCount
     * @returns {boolean} _autoBinCount
     */
    geotoolkit.controls.shapes.Histogram.prototype.isAutoBinCount = function(){};
    /**
     * Calculates the automatic amount of bins
     * @param {boolean} [force=false] force calculation of bins count
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.updateBinCount = function(force){};
    /**
     * Return bin count
     * @returns {number} a count of bins
     */
    geotoolkit.controls.shapes.Histogram.prototype.getBinCount = function(){};
    /**
     * sets if the high value is inclusive
     * @param {boolean} inclusive high value is inclusive or not
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setHighValueInclusive = function(inclusive){};
    /**
     * gets if the high value is inclusive
     * @returns {boolean}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getHighValueInclusive = function(){};
    /**
     * Gets model limits
     *
     * @returns {geotoolkit.util.Rect} the current model limits
     */
    geotoolkit.controls.shapes.Histogram.prototype.getModelLimits = function(){};
    /**
     * Returns current bounds
     *
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.controls.shapes.Histogram.prototype.getBounds = function(){};
    /**
     * Check collision
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean} true if object is inside of rendarable area
     */
    geotoolkit.controls.shapes.Histogram.prototype.checkCollision = function(context){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.controls.shapes.Histogram} this
     */
    geotoolkit.controls.shapes.Histogram.prototype.setBounds = function(bounds){};
    /**
     * Retrieves the world transformation of the spatial.
     *
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getContentsTransform = function(){};
    /**
     * Render histogram shape
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.render = function(context){};
    /**
     * Computers the statics based on the new data
     */
    geotoolkit.controls.shapes.Histogram.prototype.computeStatistics = function(){};
    /**
     * Sets _autoGradient
     * @param {boolean} isAutoGradient Autogradient on or off
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setAutoGradient = function(isAutoGradient){};
    /**
     * Gets percentage of fill
     *
     * @returns {number}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getBinSpacing = function(){};
    /**
     * Sets percentage of fill
     * Everything lower than 50 is set to 50
     * Everything higher than 100 is set to 100
     * All values in between are saved as is
     * @param {number} percentage percentage of fill
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setBinSpacing = function(percentage){};
    /**
     * Sets bars vertical scale
     * @param {number} percentage percentage of fill
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setVerticalScaling = function(percentage){};
    /**
     * Gets vertical scale
     * @returns {number}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getVerticalScaling = function(){};
    /**
     * Gets if we are auto gradient
     * @returns {boolean}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getAutoGradient = function(){};
    /**
     * Sets frequency type
     * @param {geotoolkit.controls.shapes.Histogram.FrequencyType|string} frequencyType enum of FrequencyType
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setFrequencyType = function(frequencyType){};
    /**
     * Gets frequency type
     * @returns {geotoolkit.controls.shapes.Histogram.FrequencyType}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getFrequencyType = function(){};
    /**
     * Sets accumulated mode
     * @param {geotoolkit.controls.shapes.Histogram.AccumulatedMode|string} accumulatedMode enum of AccumulatedMode (Disabled or Enabled)
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setAccumulatedMode = function(accumulatedMode){};
    /**
     * Gets accumulated mode
     * @returns {geotoolkit.controls.shapes.Histogram.AccumulatedMode}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getAccumulatedMode = function(){};
    /**
     * Sets histogram mode
     * @param {geotoolkit.controls.shapes.Histogram.HistogramMode|string} histogramMode enum of HistogramMode (Linear or Logarithmic)
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setHistogramMode = function(histogramMode){};
    /**
     * Gets the histogram mode
     * @returns {geotoolkit.controls.shapes.Histogram.HistogramMode}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getHistogramMode = function(){};
    /**
     * Gets log start value
     * @returns {number}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getStartValue = function(){};
    /**
     * Sets highlight style
     * @param {geotoolkit.attributes.FillStyle | object} fillStyle
     * a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @returns {geotoolkit.controls.shapes.Histogram}
     */
    geotoolkit.controls.shapes.Histogram.prototype.setHighlightStyle = function(fillStyle){};
    /**
     * Gets highlight style
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.controls.shapes.Histogram.prototype.getHighlightStyle = function(){};
    /**
     * Sets log start value
     * @param {number} logStartValue log start value
     * @returns {geotoolkit.controls.shapes.Histogram} this
     */
    geotoolkit.controls.shapes.Histogram.prototype.setLogStartValue = function(logStartValue){};

/**
 * The Line Chart is a chart that displays data with lines. <br>
 * Line Chart can display data with several curve types: <br>
 * Linear - A simple polyline <br>
 * Spline - Spline (Bezier) <br>
 * Logscale - logarithmic <br>
 * It can be further customized by using the options in the constructor.
 * @class geotoolkit.controls.shapes.LineChart
 * @augments geotoolkit.scene.Group
 * @implements {geotoolkit.controls.shapes.IChartDataVisual}
 * @param {Array.<number>|Array.<Array.<number>>|Array.<geotoolkit.data.INumericalDataSeries>|object} x array of X coordinates or parameters object
 * @param {Array.<number>|Array.<Array.<number>>|Array.<geotoolkit.data.INumericalDataSeries>} x.x array of X coordinates
 * @param {Array.<Array.<number>>|Array.<geotoolkit.data.INumericalDataSeries>} [x.y] The x object contains arrays of y series data
 * @param {Array.<geotoolkit.attributes.LineStyle>} [x.linestyles] Line styles to apply to curves
 * @param {Array.<geotoolkit.attributes.FillStyle>} [x.fillstyles] Fill styles to apply to curves
 * @param {boolean} [x.cache=true] boolean flag that specify cache usage
 * @param {number} [x.baseline=0] A base line for the fill
 * @param {boolean} [x.stackedarea = false] use to determine if stacked area or not
 * @param {boolean} [x.percentarea = false] use to determine if percent area of not
 * @param {string} [x.datainterpolationstrategy = geotoolkit.controls.shapes.LineChart.DataInterpolationType.InterpolateMissingValues] Data Interpolation strategy for stacked chart for missing values
 * @param {Object} [x.symbols = null] Symbols definition for data series. This object may contain definition for more than one series
 * @param {number} [x.symbols.width = 10] Symbols width, for all series
 * @param {number} [x.symbols.height = 10] Symbols height, for all series
 * @param {number} [x.symbols.step = 1] Number of step at which symbol should be displayed, for all series
 * @param {boolean} [x.symbols.visible = true] define visibility of the symbols
 * @param {boolean} [x.gridvisible=true] set visible the gridlines
 * @param {boolean} [x.symbols.sizeIsInDeviceSpace = false] Flag that determines if symbols must keep device size
 * @param {geotoolkit.util.Rect} [x.bounds] bounds or position on the chart
 * @param {geotoolkit.util.Rect} [x.modelLimits=null] model limits of chart. if it is not set then model limits is calculated.
 * @param {boolean} [x.autodatalimits=x.modelLimits == null] automatic model limits calculation
 * @param {Array.<function>} [x.symbols.painters = null] painters for series. Nulls are acceptable if a series should not have a symbols - functions are in geotoolkit.scene.shapes.painter namespace
 * @param {Array.<geotoolkit.attributes.LineStyle>} [x.symbols.linestyles = null] Defines series symbols line styles
 * @param {Array.<geotoolkit.attributes.FillStyle>} [x.symbols.fillstyles = null] Defines series symbols fill styles
 * @param {Array.<Object>} [x.arearange = null] Defines Area Range
 * @param {Array.<Array.<number>>} [x.arearange.range = [[], []]] Defines upper bound range and lowerbound range
 * @param {Array.<geotoolkit.attributes.LineStyle | string | object>} [x.arearange.linestyles] Linestyles for area range series
 * @param {geotoolkit.attributes.FillStyle | string | object} [x.arearange.fillstyle] fillstyle to apply between ranges
 * @param {Object} [x.labels] labels for linechart points
 * @param {number} [x.labels.offsetx = 0] text margin for label in x-direction
 * @param {number} [x.labels.offsety = 0] text margin for label in y-direction
 * @param {Array.<Array.<number>>|Array.<Array.<string>> | Array.<geotoolkit.data.DataSeries> | Array.<geotoolkit.data.DataSeriesView>} [x.labels.annotations] annotations for linechart points, if not specified y value of linechart will be displayed
 * @param {Array.<Array.<geotoolkit.attributes.TextStyle>>} [x.labels.textstyle] teextstyle for label
 * @param {boolean} [x.labels.showellipses] show ellipses for textstyle
 * @param {Array.<Array.<number>>} [y] array of Y coordinates
 * @param {Array.<geotoolkit.attributes.LineStyle>} [linestyles] Line styles to apply to curves
 * @param {geotoolkit.util.Rect} [bounds] bounds or position on the chart
 * @param {boolean} [spline=false] smooth the curve or not
 * @param {boolean} [logscale=false] use log scale or not
 * @param {Array.<geotoolkit.attributes.FillStyle>} [fillstyles] Fill Styles
 * @param {number} [baseLine=0] Y value of a horizontal line which will define the base line for fill
 * @param {boolean} [stackedarea = false] use to determine if stacked area or not
 * @param {boolean} [percentarea = false] use to determine if percent area of not
 * @param {Array.<Object>} [arearange = null] Defines Area Range
 * @param {Array.<Array.<number>>} [arearange.range = [[], []]] Defines upper bound range and lowerbound range
 * @param {Array.<geotoolkit.attributes.LineStyle | string | object>} [arearange.linestyles] Linestyles for area range series
 * @param {geotoolkit.attributes.FillStyle | string | object} [arearange.fillstyle] fillstyle to apply between ranges

 * @example
 * // Creating a simple line chart. (X values are shared for the chart )
 * var x = [0, 2, 4, 6, 8, ...];
 * var y = [
 * [10, 53.3022600566037, 40.79461201233789, 53.4218930513598, ...],
 * [1000, 642.6507126996294, 696.8659508964047, 618.771930876188, ...]
 * ];
 * linechart = new geotoolkit.controls.shapes.LineChart({
 * 'x': x,
 * 'y': y,
 * 'linestyles': [...],
 * });
 * return lineChart;
 * //
 * // To draw a Line Chart but not display the gridlines user can do the following:
 * linechart.getGrid().setVisible(false);
 * //
 * // or use Css
 * linechart.setCss(new geotoolkit.css.CssStyle({'css': '.geotoolkit.axis.Grid { visible: false;}' }));
 */
geotoolkit.controls.shapes.LineChart = {};
    /**
     * Enum of rendering optimization types
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.LineChart.OptimizationType = {};
        /**
         * Filter points which are close to each other and are rendered in one pixel
         * @type {number}
         */
        geotoolkit.controls.shapes.LineChart.OptimizationType.FilterClosePoints = NaN;
        /**
         * Ramer–Douglas–Peucker optimization
         * @type {number}
         */
        geotoolkit.controls.shapes.LineChart.OptimizationType.RDP = NaN;
    /**
     * Enum of Data-Interpolation type for stacked area
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.LineChart.DataInterpolationType = {};
        /**
         * Interpolate as 0 for missing points
         * @type {number}
         */
        geotoolkit.controls.shapes.LineChart.DataInterpolationType.InterpolateZero = NaN;
        /**
         * Interpolate as Null for missing points
         * @type {number}
         */
        geotoolkit.controls.shapes.LineChart.DataInterpolationType.InterpolateNull = NaN;
        /**
         * Apply linear interpolation for missing points
         * @type {number}
         */
        geotoolkit.controls.shapes.LineChart.DataInterpolationType.InterpolateMissingValues = NaN;
    /**
     * Sets optimization type
     * @param {geotoolkit.controls.shapes.LineChart.OptimizationType} optimizationType optimization type which used with current line
     * @returns {geotoolkit.controls.shapes.LineChart} this
     */
    geotoolkit.controls.shapes.LineChart.prototype.setOptimizationType = function(optimizationType){};
    /**
     * Turns on/off optimization for line
     * @param {boolean} [needOptimization] Is optimization for line on
     * @returns {geotoolkit.controls.shapes.LineChart} this
     */
    geotoolkit.controls.shapes.LineChart.prototype.setOptimization = function(needOptimization){};
    /**
     * Turns on/off optimization for symbols
     * @param {boolean} [needOptimize] Is optimization for symbols on
     * @returns {geotoolkit.controls.shapes.LineChart} this
     */
    geotoolkit.controls.shapes.LineChart.prototype.setOptimizationSymbol = function(needOptimize){};
    /**
     * Return the current chart setting
     * @returns {object} [options]
     * @returns {Array.<number>|Array.<Array.<number>>} options.x array of X coordinates
     * @returns {Array.<Array.<number>>} [options.y] The x object contains arrays of y series data
     * @returns {Array.<geotoolkit.attributes.LineStyle>} [options.linestyles] Line styles to apply to curves
     * @returns {Array.<geotoolkit.attributes.FillStyle>} [options.fillstyles] Fill styles to apply to curves
     * @returns {number} [options.baseline] A base line for the fill
     * @returns {Object} [options.symbols=null] symbols definition for data series. This object may contain definition for more than one series
     * @returns {number} [options.symbols.width] symbols width, for all series
     * @returns {number} [options.symbols.height] symbols height, for all series
     * @returns {boolean} [options.symbols.visible = true] define visibility of the symbols
     * @returns {boolean} [options.gridvisible] set visible the gridlines
     * @returns {boolean} [options.symbols.sizeIsInDeviceSpace = false] Flag that determines if symbols must keep device size
     * @returns {Array.<geotoolkit.scene.shapes.painters.AbstractPainter>} [options.symbols.painters = null] painters for series. Nulls are acceptable if a series should not have a symbols
     * @returns {Array.<geotoolkit.attributes.LineStyle>} [options.symbols.linestyles = null] Defines series symbols line styles
     * @returns {Array.<geotoolkit.attributes.FillStyle>} [options.symbols.fillstyles = null] Defines series symbols fill styles
     * @returns {boolean} [options.stackedarea] Defines if chart is stacked area chart
     * @returns {boolean} [options.percentarea] Defines if chart is percene area chart
     * @returns {Array.<Object>} [options.arearange = null] Defines Area Range
     * @returns {Array.<Array.<number>>} [options.arearange.range = [[], []]] Defines upper bound range and lowerbound range
     * @returns {Array.<geotoolkit.attributes.LineStyle>} [options.arearange.linestyles] Linestyles for area range series
     * @returns {geotoolkit.attributes.FillStyle} [options.arearange.fillstyle] fillstyle to apply between ranges
     * @returns {Object} [options.labels] labels for linechart points
     * @returns {number} [options.labels.offsetx = 0] text margin for label in x-direction
     * @returns {number} [options.labels.offsety = 0] text margin for label in y-direction
     * @returns {Array.<Array.<number>>|Array.<Array.<string>> | Array.<geotoolkit.data.DataSeries> | Array.<geotoolkit.data.DataSeriesView>} [options.labels.annotations] annotations for linechart points, if not specified y value of linechart will be displayed
     * @returns {Array.<Array.<geotoolkit.attributes.TextStyle>>} [options.labels.textstyle] teextstyle for label
     * @returns {boolean} [options.labels.showellipses] show ellipses for textstyle
     */
    geotoolkit.controls.shapes.LineChart.prototype.getData = function(){};
    /**
     * Set the data to be plotted in the line chart.
     * @param {Object} data data
     * @param {Array.<number>|Array.<geotoolkit.data.INumericalDataSeries>|Array.<geotoolkit.data.DataSeries>} [data.x] deprecated (since 2.6 Array.<geotoolkit.data.DataSeries> type is deprecated) The x object contains x series data
     * @param {Array.<number>|Array.<geotoolkit.data.INumericalDataSeries>|Array.<geotoolkit.data.DataSeries>} [data.y] deprecated (since 2.6 Array.<geotoolkit.data.DataSeries> type is deprecated) The y object contains arrays of y series data
     * @param {geotoolkit.util.Rect} [data.modelLimits=null] model limits of chart. if it is not set then model limits is calculated.
     * @param {boolean} [data.autodatalimits=data.modelLimits == null] automatic model limits calculation
     * @param {Array.<geotoolkit.attributes.LineStyle>} [data.linestyles] Line styles to apply to curves
     * @param {Array.<geotoolkit.attributes.FillStyle>} [data.fillstyles] Fill styles to apply to curves
     * @param {number} [data.baseline = 0] A base line for the fill
     * @param {boolean} [data.stackedarea = false] Determine if stacked area graph or not
     * @param {boolean} [data.percentarea = false] Determine if stacked area graph or not
     * @param {string} [data.datainterpolationstrategy = geotoolkit.controls.shapes.LineChart.DataInterpolationType.InterpolateMissingValues] Data Interpolation strategy for stacked chart for missing values
     * @param {Object} [data.symbols = null] Symbols definition for data series. This object may contain definition for more than one series
     * @param {number} [data.symbols.width] Symbols width, for all series
     * @param {number} [data.symbols.height] Symbols height, for all series
     * @param {boolean} [data.symbols.sizeIsInDeviceSpace = false] Flag that determines if symbols must keep device size,
     * @param {Array.<geotoolkit.scene.shapes.painters.AbstractPainter>} [data.symbols.painters = null] painters for series. Nulls are acceptable if a series should not have a symbols
     * @param {Array.<geotoolkit.attributes.LineStyle>} [data.symbols.linestyles = null] Defines series symbols line styles
     * @param {Array.<geotoolkit.attributes.FillStyle>} [data.symbols.fillstyles = null] Defines series symbols fill styles
     * @param {Object} [data.labels] labels for linechart points
     * @param {number} [data.labels.offsetx = 0] text margin for label in x-direction
     * @param {number} [data.labels.offsety = 0] text margin for label in y-direction
     * @param {Array.<Array.<number>>|Array.<Array.<string>> | Array.<geotoolkit.data.DataSeries> | Array.<geotoolkit.data.DataSeriesView>} [data.labels.annotations] annotations for linechart points, if not specified y value of linechart will be displayed
     * @param {Array.<Array.<geotoolkit.attributes.TextStyle>>} [data.labels.textstyle] teextstyle for label
     * @param {boolean} [data.labels.showellipses] show ellipses for textstyle
     * @param {Array.<Object>} [data.arearange = null] Defines Area Range
     * @param {Array.<Array.<number>>} [data.arearange.range = [[], []]] Defines upper bound range and lowerbound range
     * @param {Array.<geotoolkit.attributes.LineStyle | string | object>} [data.arearange.linestyles] Linestyles for area range series
     * @param {geotoolkit.attributes.FillStyle | string | object} [data.arearange.fillstyle] fillstyle to apply between ranges
     * @returns {geotoolkit.controls.shapes.LineChart} this
     */
    geotoolkit.controls.shapes.LineChart.prototype.setData = function(data){};
    /**
     * Sets visual options for the chart
     * @param {Object} options options
     * @param {Array.<geotoolkit.attributes.LineStyle>} [options.linestyles] Line styles to apply to curves
     * @param {Array.<geotoolkit.attributes.FillStyle>} [options.fillstyles] Fill styles to apply to curves
     * @param {number} [options.baseline = 0] A base line for the fill
     * @param {boolean} [options.spline] Defines whether to build a spline or polygon path
     * @param {Object} [options.symbols = null] Symbols definition for data series. This object may contain definition for more than one series
     * @param {number} [options.symbols.width] Symbols width, for all series
     * @param {number} [options.symbols.height] Symbols height, for all series
     * @param {boolean} [options.symbols.sizeIsInDeviceSpace = false] Flag that determines if symbols must keep device size,
     * @param {Array.<geotoolkit.scene.shapes.painters.AbstractPainter>} [options.symbols.painters = null] painters for series. Nulls are acceptable if a series should not have a symbols
     * @param {Array.<geotoolkit.attributes.LineStyle>} [options.symbols.linestyles = null] Defines series symbols line styles
     * @param {Array.<geotoolkit.attributes.FillStyle>} [options.symbols.fillstyles = null] Defines series symbols fill styles
     * @param {geotoolkit.util.Rect} [options.modelLimits=null] model limits of chart. if it is not set then model limits is calculated.
     * @param {boolean} [options.autodatalimits=data.modelLimits == null] automatic model limits calculation
     * @param {Object} [options.labels] labels for linechart points
     * @param {number} [options.labels.offsetx = 0] text margin for label in x-direction
     * @param {number} [options.labels.offsety = 0] text margin for label in y-direction
     * @param {Array.<Array.<number>>|Array.<Array.<string>> | Array.<geotoolkit.data.DataSeries> | Array.<geotoolkit.data.DataSeriesView>} [options.labels.annotations] annotations for linechart points, if not specified y value of linechart will be displayed
     * @param {Array.<Array.<geotoolkit.attributes.TextStyle>>} [options.labels.textstyle] teextstyle for label
     * @param {boolean} [options.labels.showellipses] show ellipses for textstyle
     * @returns {geotoolkit.controls.shapes.LineChart} this
     */
    geotoolkit.controls.shapes.LineChart.prototype.setOptions = function(options){};
    /**
     * Gets visual options for the chart
     * @returns {Object} options
     * @returns {Array.<geotoolkit.attributes.LineStyle>} [options.linestyles] curve linestyles
     * @returns {Array.<geotoolkit.attributes.FillStyle>} [options.fillstyles] curve fillstyles
     * @returns {number} [options.baseline = 0] A base line for the fill
     * @returns {boolean} [options.spline = false] Spline or polygon path
     * @returns {Object} [options.symbols = null] Symbols definition for data series. This object may contain definition for more than one series
     * @returns {number} [options.symbols.width] Symbols width, for all series
     * @returns {number} [options.symbols.height] Symbols height, for all series
     * @returns {boolean} [options.symbols.sizeIsInDeviceSpace = false] Flag that determines if symbols must keep device size,
     * @returns {Array.<geotoolkit.scene.shapes.painters.AbstractPainter>} [options.symbols.painters = null] painters for series. Nulls are acceptable if a series should not have a symbols
     * @returns {Array.<geotoolkit.attributes.LineStyle>} [options.symbols.linestyles = null] Series symbols line styles
     * @returns {Array.<geotoolkit.attributes.FillStyle>} [options.symbols.fillstyles = null] Series symbols fill styles
     * @returns {geotoolkit.util.Rect} [options.modelLimits=null] model limits of chart. if it is not set then model limits is calculated.
     * @returns {boolean} [options.autodatalimits=data.modelLimits == null] automatic model limits calculation
     * @returns {Object} [options.labels] labels for linechart points
     * @returns {number} [options.labels.offsetx = 0] text margin for label in x-direction
     * @returns {number} [options.labels.offsety = 0] text margin for label in y-direction
     * @returns {Array.<Array.<number>>|Array.<Array.<string>> | Array.<geotoolkit.data.DataSeries> | Array.<geotoolkit.data.DataSeriesView>} [options.labels.annotations] annotations for linechart points, if not specified y value of linechart will be displayed
     * @returns {Array.<Array.<geotoolkit.attributes.TextStyle>>} [options.labels.textstyle] teextstyle for label
     * @returns {boolean} [options.labels.showellipses] show ellipses for textstyle
     */
    geotoolkit.controls.shapes.LineChart.prototype.getOptions = function(){};
    /**
     * @override
     */
    geotoolkit.controls.shapes.LineChart.prototype.dispose = function(){};
    /**
     * Gets model limits, the limits of this groups inside space
     *
     * @returns {geotoolkit.util.Rect | null} the current model limits
     */
    geotoolkit.controls.shapes.LineChart.prototype.getModelLimits = function(){};
    /**
     * Sets inner model limits and it sets autodatalimits to false
     *
     * @param {geotoolkit.util.Rect} limits
     * inner limits
     * @returns {geotoolkit.controls.shapes.LineChart} this
     */
    geotoolkit.controls.shapes.LineChart.prototype.setModelLimits = function(limits){};
    /**
     * render to specified context
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.LineChart.prototype.renderContent = function(context){};
    /**
     * Set grid line styles
     *
     * @param {object} [tickStyles] json for tick line styles
     * @returns {geotoolkit.controls.shapes.LineChart} this
     */
    geotoolkit.controls.shapes.LineChart.prototype.setGridStyle = function(tickStyles){};
    /**
     * Return embedded gridlines
     * @returns {geotoolkit.axis.Grid}
     */
    geotoolkit.controls.shapes.LineChart.prototype.getGrid = function(){};
    /**
     * Hit test in the device coordinate. This method checks if any point is inside the area and shape
     * intersects area.
     * @param {geotoolkit.util.Rect|geotoolkit.util.Point|object} area model area or position
     * @param {array.<number>} [area.x=null] optional array of x coordinates
     * @param {array.<number>} [area.y=null] optional array of y coordinates
     * @param {number} [radius=10] radius of selection
     * @param {geotoolkit.util.Orientation} [ignoreOrientation=null] Orientation to ignore - this parameter is ignored for arrays of points
     * @returns {object|null} result
     * @returns {geotoolkit.controls.shapes.LineChart} [result.visual] this
     * @returns {number} [result.series] series of data
     * @returns {array.<number>} [result.indices] array of selected indices for the current series
     * @returns {array.<object>} [result.points] array of selected point coordinates
     */
    geotoolkit.controls.shapes.LineChart.prototype.hitTest = function(area, radius, ignoreOrientation){};
    /**
     * Returns flag to indicate automatic calculation of data limits
     * @returns {boolean}
     */
    geotoolkit.controls.shapes.LineChart.prototype.getAutoDataLimits = function(){};
    /**
     * Sets a flag to indicate automatic calculation of data limits
     * @param {boolean} enable enable or disable calculation of the data limits
     * @returns {geotoolkit.controls.shapes.LineChart} this
     */
    geotoolkit.controls.shapes.LineChart.prototype.setAutoDataLimits = function(enable){};
    /**
     * Return original data limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.controls.shapes.LineChart.prototype.getDataLimits = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} properties of this object, see {@link geotoolkit.controls.shapes.LineChart.setProperties}
     */
    geotoolkit.controls.shapes.LineChart.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @override
     * @param {object} properties An object containing the properties to set, see {@link geotoolkit.controls.shapes.LineChart#setOptions}
     * @returns {geotoolkit.controls.shapes.LineChart} this
     */
    geotoolkit.controls.shapes.LineChart.prototype.setProperties = function(properties){};

/**
 * RegressionLine shape wrap a regression model and draw the curve (and also confidence and prediction interval)
 * for the given data set x and y based on the model
 *
 * @class geotoolkit.controls.shapes.RegressionLine
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {object} options
 * @param {Array.<number>|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [options.datax] data set x
 * @param {Array.<number>|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [options.datay] data set y
 * @param {boolean} [options.extended] the flag if extend x limits of curve to the limits of shape's model limits
 * @param {boolean} [options.horizontallogmode = false] Log mode in horizontal direction
 * @param {boolean} [options.verticallogmode = false] Log mode in vertical direction
 * @param {number} [options.plotinterval] the interval of sampling x when drawing curve
 * @param {object} [options.regressionmodel] options for regression model
 * @param {object} [options.regressionline] options for regression line
 * @param {object} [options.confidenceline] options for confidence line
 * @param {object} [options.predictionline] options for prediction line
 */
geotoolkit.controls.shapes.RegressionLine = {};
    /**
     * set options for shape
     * @param {object} options options
     * @param {boolean} [options.extended] the flag if extend x limits of curve to the limits of shape's model limits
     * @param {number} [options.plotinterval] the interval of sampling x when drawing curve
     * @param {object} [options.regressionmodel] options for regression model
     * @param {object} [options.regressionline] options for regression line
     * @param {object} [options.confidenceline] options for confidence line
     * @param {object} [options.predictionline] options for prediction line
     * @param {boolean} [options.horizontallogmode = false] Log mode in horizontal direction
     * @param {boolean} [options.verticallogmode = false] Log mode in vertical direction
     * @returns {geotoolkit.controls.shapes.RegressionLine}
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.setOptions = function(options){};
    /**
     * set model limits of shape
     * @param {geotoolkit.util.Rect} limits model limits
     * @returns {geotoolkit.controls.shapes.RegressionLine} this
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.setModelLimits = function(limits){};
    /**
     * get model limits of shape
     * @returns {geotoolkit.util.Rect|null} limits
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.getModelLimits = function(){};
    /**
     * set model bounds of shape
     * @param {geotoolkit.util.Rect} bounds model bounds
     * @returns {geotoolkit.controls.shapes.RegressionLine} this
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.setBounds = function(bounds){};
    /**
     * get model bounds of shape
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.getBounds = function(){};
    /**
     * set properties for shape
     * @param {object} properties properties see {@link geotoolkit.controls.shapes.RegressionLine#setOptions}
     * @returns {geotoolkit.controls.shapes.RegressionLine} this
     * @override
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.setProperties = function(properties){};
    /**
     * get properties of shape
     * @returns {object} props
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.getProperties = function(){};
    /**
     * get options for regression model
     * @returns {object|null} options
     * @returns {geotoolkit.controls.util.regression.RegressionBase} [options.type] resolved regression model
     * the rest are options for regression model, see getOptions of specific regression model for details
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.getRegressionModelOptions = function(){};
    /**
     * get options of shape
     * @returns {object} options
     * @returns {boolean} [options.extended] the flag if extend x limits of curve to the limits of shape's model limits
     * @returns {number} [options.plotinterval] the interval of sampling x when drawing curve
     * @returns {object} [options.regressionmodel] options for resolved regression model
     * @returns {object} [options.regressionline] options for regression line
     * @returns {object} [options.confidenceline] options for confidence line
     * @returns {object} [options.predictionline] options for prediction line
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.getOptions = function(){};
    /**
     * set if extend x limits of curve from the limit of data set x to the x model limits(since they could be different)
     * @param {boolean} extended the flag to determine if extend x limits
     * @returns {geotoolkit.controls.shapes.RegressionLine} this
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.setExtended = function(extended){};
    /**
     * set the interval when sampling the x for drawing curve
     * @param {number} interval the sampling interval in screen pixel
     * @returns {geotoolkit.controls.shapes.RegressionLine} this
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.setPlotInterval = function(interval){};
    /**
     * set data source for x and y
     * @param {object} data data
     * @param {Array.<number>|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [data.datax] data source for x
     * @param {Array.<number>|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [data.datay] data source for y
     * @param {Array.<number>|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [data.weights] weights of data point
     * @param {boolean} incremental incremental
     * @returns {geotoolkit.controls.shapes.RegressionLine} this
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.setData = function(data, incremental){};
    /**
     * get statistics of regression model
     * @returns {object} see details in geotoolkit.controls.util.regression.RegressionBase.getStatistics method
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.getStatistics = function(){};
    /**
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.render = function(context){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.dispose = function(){};
    /**
     * get current regression model
     * @returns {geotoolkit.controls.util.regression.RegressionBase|null} resolved regression model
     */
    geotoolkit.controls.shapes.RegressionLine.prototype.getRegressionModel = function(){};

/**
 * Cross plot is a two dimensional chart, that uses horizontal and vertical axes to plot the data points. <br/>
 * Crossplot shows how much one variable is affected by another. The relationship between two variables is called their correlation. </br>
 * Crossplots usually consist of a large body of data. <br>
 * The closer the data points plotted as making a straight line, the higher the correaltion between variables.<br/>
 * geotoolkit.controls.shapes.CrossPlot is used internally by the {@link geotoolkit.widgets.CrossPlot}.
 *
 * @class geotoolkit.controls.shapes.CrossPlot
 * @augments geotoolkit.scene.shapes.RectangularShape
 *
 * @param {Object} data data
 * @param {Object} [data.x] The x object containing values, min and max
 * @param {Array.<number>|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [data.x.data=[]] The x values
 * @param {number} [data.x.min=min(xValues)] The x minimum to use, can be used to clip the data
 * @param {number} [data.x.max=max(xValues)] The x maximum to use, can be used to clip the data
 * @param {Object} [data.y] The y object containing values, min and max
 * @param {Array.<number>|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [data.y.data=[]] The y values
 * @param {number} [data.y.min=min(yValues)] The y minimum to use, can be used to clip the data
 * @param {number} [data.y.max=max(yValues)] The y maximum to use, can be used to clip the data
 * @param {Object} [data.z] The z object containing values, min and max
 * @param {Array.<number>} [data.z.data=undefined] The z values
 * @param {Array.<number>} [data.datax=[]] The x values
 * @param {number} [data.minx=min(xValues)] The x minimum to use, can be used to clip the data
 * @param {number} [data.maxx=max(xValues)] The x maximum to use, can be used to clip the data
 * @param {Array.<number>|geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [data.datay=[]] The y values
 * @param {number} [data.miny=min(yValues)] The y minimum to use, can be used to clip the data
 * @param {number} [data.maxy=max(yValues)] The y maximum to use, can be used to clip the data
 * @param {Array.<number>} [data.dataz=undefined] The z values
 * @param {geotoolkit.util.ColorProvider} [data.colorprovider=null] The colorProvider used to color points based on their Z value
 * @param {string} [data.defaultcolor=rgba(60,60,60,1)] The color to be used if there is no ColorProvider provided or if a point has no valid Z value
 * @param {string} [data.defaultlinecolor=null] The color of line to be used in symbol
 * @param {Object} [data.painter=geotoolkit.controls.shapes.painters.CrossPlotPainter] The painter to draw symbols
 * @param {number} [data.symbolsize=8] The symbol size in pixel
 * @param {string} [data.highlightcolor=rgb(255,0,255)] The color to use for highlighted shapes
 */
geotoolkit.controls.shapes.CrossPlot = {};
    /**
     * Modifies the crossplot content, the content of the given object will be merged with the current state of the shape.
     * IE: If you pass only one parameter, all the others will remain unchanged.
     * @param {Object} data data
     * @param {Object} [data.x] The x object containing values, min and max
     * @param {Array.<number>} [data.x.data=[]] The x values
     * @param {number} [data.x.min=min(xValues)] The x minimum to use, can be used to clip the data
     * @param {number} [data.x.max=max(xValues)] The x maximum to use, can be used to clip the data
     * @param {Object} [data.y] The y object containing values, min and max
     * @param {Array.<number>} [data.y.data=[]] The y values
     * @param {number} [data.y.min=min(yValues)] The y minimum to use, can be used to clip the data
     * @param {number} [data.y.max=max(yValues)] The y maximum to use, can be used to clip the data
     * @param {Object} [data.z] The z object containing values, min and max
     * @param {Array.<number>} [data.z.data=undefined] The z values
     * @param {Array.<number>} [data.datax=[]] The x values
     * @param {number} [data.minx=min(xValues)] The x minimum to use, can be used to clip the data
     * @param {number} [data.maxx=max(xValues)] The x maximum to use, can be used to clip the data
     * @param {Array.<number>} [data.datay=[]] The y values
     * @param {number} [data.miny=min(yValues)] The y minimum to use, can be used to clip the data
     * @param {number} [data.maxy=max(yValues)] The y maximum to use, can be used to clip the data
     * @param {Array.<number>} [data.dataz=undefined] The z values
     * @param {geotoolkit.util.ColorProvider} [data.colorprovider=null] The colorProvider used to color points based on their Z value
     * @param {string} [data.defaultcolor=rgba(60,60,60,1)] The color to use if there is no ColorProvider provided or if a point has no valid Z value
     * @param {string} [data.defaultlinecolor=null] The color of line to be used in symbol
     * @param {Object} [data.painter=geotoolkit.controls.shapes.painters.CrossPlotPainter] The painter to draw symbols
     * @param {number} [data.symbolsize=8] The symbol size in pixel
     * @param {string} [data.highlightcolor=rgb(255,0,255)] The color to use for highlighted shapes
     * @returns {geotoolkit.controls.shapes.CrossPlot} this
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.setData = function(data){};
    /**
     * Get Data
     *
     * @returns {object} [data]
     * @returns {Array.<number>} [data.datax] The x values
     * @returns {number} [data.minx] The x minimum to use, can be used to clip the data
     * @returns {number} [data.maxx] The x maximum to use, can be used to clip the data
     * @returns {Array.<number>} [data.datay] The y values
     * @returns {number} [data.miny] The y minimum to use, can be used to clip the data
     * @returns {number} [data.maxy] The y maximum to use, can be used to clip the data
     * @returns {?Array.<number>} [data.dataz] The z values
     * @returns {geotoolkit.util.ColorProvider} [data.colorprovider] The colorProvider used to color points based on their Z value
     * @returns {string} [data.defaultcolor] The color to use if there is no ColorProvider provided or if a point has no valid Z value
     * @returns {string} [data.defaultlinecolor] The color of line to be used in symbol
     * @returns {string} [data.highlightcolor] The color to use for highlighted shapes
     * @returns {number} [data.symbolsize] The symbol size in pixel
     * @returns {Object} [data.painter] The painter to draw symbols
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.getData = function(){};
    /**
     * Return ColorProvider
     * @returns {geotoolkit.util.ColorProvider} colorProvider
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.getColorProvider = function(){};
    /**
     * Return false if bounds is equal to zero
     * @returns {boolean}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.isEmpty = function(){};
    /**
     *@inheritdoc
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.updateState = function(){};
    /**
     * Update limits
     * @returns {boolean} result true if worked
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.updateLimits = function(){};
    /**
     * Sets the painter that will be used to draw crossplot points
     * @param {Function} painter The symbol painter function to draw
     * @returns {geotoolkit.controls.shapes.CrossPlot}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.setSymbolPainter = function(painter){};
    /**
     * Get the current painter used to draw points
     * @returns {function()}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.getSymbolPainter = function(){};
    /**
     * Render contents of the crossplot shape
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.render = function(context){};
    /**
     * Returns if clipping is enabled or not for this node.
     *
     * @returns {boolean}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.isClippingEnabled = function(){};
    /**
     * Enables or disables clipping of this node. If enabled,
     * shapes will not be rendered outside of its bounds.
     *
     * @param {boolean} doClip enable clipping on this node
     * @returns {geotoolkit.controls.shapes.CrossPlot}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.enableClipping = function(doClip){};
    /**
     * Draw canvas points
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {geotoolkit.controls.shapes.CrossPlot}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.drawCanvasPoints = function(context){};
    /**
     * Push symbol symbol
     *
     * @param {geotoolkit.util.RgbaColor} color color
     * @param {object} symbol symbol to be pushed
     * @returns {geotoolkit.controls.shapes.CrossPlot}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.pushSymbol = function(color, symbol){};
    /**
     * Gets Highlighted Indices
     * @returns {Array}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.getHighlightedIndices = function(){};
    /**
     * Highlights the selected area
     * @param {geotoolkit.util.Point | geotoolkit.util.Rect} rect search area
     * @param {boolean} reset un-highlights previously selected indices
     * @returns {geotoolkit.controls.shapes.CrossPlot}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.highlightArea = function(rect, reset){};
    /**
     * Highlights the selected indices
     * @param {array.<number>} indices indices to be highlighted
     * @param {boolean} reset un-highlights previously selected indices
     * @returns {geotoolkit.controls.shapes.CrossPlot}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.highlightIndices = function(indices, reset){};
    /**
     * Return indices in search area
     * @param {geotoolkit.util.Area} area search area
     * @returns {Array<number>}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.getIndicesAt = function(area){};
    /**
     * Return points in search area
     * @param {geotoolkit.util.Point | geotoolkit.util.Rect} rect search area
     * @returns {Array}
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.getPointsAt = function(rect){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * {geotoolkit.util.Rect} [props.bounds] shape bounds
     */
    geotoolkit.controls.shapes.CrossPlot.prototype.getProperties = function(){};

/**
 * Defines a Table View Shape
 *
 * @class geotoolkit.controls.shapes.TableView
 * @augments geotoolkit.scene.Group
 * @param {object} options JSON object
 * @param {number} [options.rows] rows
 * @param {number} [options.cols] columns
 * @param {boolean} [options.fixedsize=false] performance hint for table view
 * @param {number} [options.indexwidth=100] index column width
 * @param {number} [options.headerheight=20] header height
 * @param {geotoolkit.util.Dimension} [options.cellsize=geotoolkit.util.Dimension(100, 20)] cell size
 * @param {geotoolkit.util.Rect} [options.bounds] bounds
 */
geotoolkit.controls.shapes.TableView = {};
    /**
     * Set bounds for table in rows, columns
     *
     * @param {number} rows rows in the table
     * @param {number} columns columns in the table
     * @param {boolean} rebuild rebuild or not
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setTableBounds = function(rows, columns, rebuild){};
    /**
     * Measure column widths
     * @deprecated since 2.5
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.measureTableSize = function(){};
    /**
     * return column width
     * @param {number} column index of the column, -1 for the index column
     * @returns {number} width
     */
    geotoolkit.controls.shapes.TableView.prototype.getColumnWidth = function(column){};
    /**
     * Set column width
     * @param {number} column index of the column, -1 for the index column
     * @param {number} width column width
     * @throws {Error} if columnIndex is out of range
     * @fires geotoolkit.controls.shapes.TableView~ColumnWidthChanging
     * @fires geotoolkit.controls.shapes.TableView~ColumnWidthChanged
     * @returns {geotoolkit.controls.shapes.TableView}
     */
    geotoolkit.controls.shapes.TableView.prototype.setColumnWidth = function(column, width){};
    /**
     * Resize all column widths to fit to visible table width
     *
     * @param {boolean} [distributeColumnsEvenly=false]
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.fitToWidth = function(distributeColumnsEvenly){};
    /**
     * Set bounds in model space
     *
     * @param {geotoolkit.util.Rect} bounds bounds in model space
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setBounds = function(bounds){};
    /**
     * Returns visible model bounds in pixel space
     *
     * @returns {geotoolkit.util.Rect}: visible bounds
     */
    geotoolkit.controls.shapes.TableView.prototype.getVisibleTableModelLimits = function(){};
    /**
     * Returns total model bounds in pixel space
     *
     * @returns {geotoolkit.util.Rect}: total bounds
     */
    geotoolkit.controls.shapes.TableView.prototype.getContentTableBounds = function(){};
    /**
     * Returns header model bounds in pixel space
     *
     * @returns {geotoolkit.util.Rect}: total bounds
     */
    geotoolkit.controls.shapes.TableView.prototype.getHeaderBounds = function(){};
    /**
     * Returns fixed columns model bounds in pixel space
     *
     * @returns {geotoolkit.util.Rect}: total bounds
     */
    geotoolkit.controls.shapes.TableView.prototype.getFixedTableBounds = function(){};
    /**
     * Returns table size in column, row count
     *
     * @returns {geotoolkit.util.Dimension}: columns, rows
     */
    geotoolkit.controls.shapes.TableView.prototype.getTableSize = function(){};
    /**
     * Returns table limits in column, row size
     *
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.controls.shapes.TableView.prototype.getVisibleTableLimits = function(){};
    /**
     * Set visible table limits to specific position in column, row
     *
     * @param {number} row index at the row
     * @param {number} [column=undefined] index at the column
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setVisibleTableLimits = function(row, column){};
    /**
     * Returns total table bounds in terms of column, row
     *
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.controls.shapes.TableView.prototype.getTableBounds = function(){};
    /**
     * Main method of scrolling the table view
     *
     * @param {number} dx number of model units to shift along x axis
     * @param {number} dy number of model units to shift along y axis
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.translateTable = function(dx, dy){};
    /**
     * Relayout table
     *
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.adjustTable = function(){};
    /**
     * Convenience method to set groups of visual properties
     *
     * @param {object} data JSON object
     *
     * @param {string} [data.indextitle] JSON to set index title - see {geotoolkit.controls.shapes.TableView.setIndexTitle}
     * @param {boolean} [data.indexvisible] value to set index column visibility
     * @param {boolean} [data.fixedsize] performance hint for table view
     * @param {object | function} [data.contentmeasure] JSON setting table view content measurer - see {geotoolkit.controls.shapes.TableView.setContentMeasure}
     * @param {object | function} [data.contentprepare] JSON setting table view content preparer - see {geotoolkit.controls.shapes.TableView.setContentPrepare}
     * @param {object | function} [data.contentprovider] JSON setting table view content provider - see {geotoolkit.controls.shapes.TableView.setContentProvider}
     * @param {object | function} [data.headerprovider] JSON setting table view header provider - see {geotoolkit.controls.shapes.TableView.setHeaderProvider}
     * @param {object | function} [data.indexprepare] JSON setting table view index preparer - see {geotoolkit.controls.shapes.TableView.setIndexPrepare}
     * @param {object | function} [data.indexprovider] JSON setting table view index provider - see {geotoolkit.controls.shapes.TableView.setIndexProvider}
     * @param {object | function} [data.markerprovider] JSON setting table view marker provider - see {geotoolkit.controls.shapes.TableView.setMarkerProvider}
     * @param {object} [data.header] header options
     * @param {geotoolkit.attributes.LineStyle} [data.header.gridstyle] Grid style
     * @param {geotoolkit.attributes.TextStyle} [data.header.textstyle] Text style
     * @param {geotoolkit.attributes.FillStyle} [data.header.headerfillstyle] Header fill style
     * @param {object} [data.content] content options
     * @param {geotoolkit.attributes.LineStyle} [data.content.gridstyle] Grid style
     * @param {geotoolkit.attributes.TextStyle} [data.content.textstyle] Text style
     * @param {geotoolkit.attributes.FillStyle} [data.content.oddfillstyle] Odd row style
     * @param {geotoolkit.attributes.FillStyle} [data.content.evenfillstyle] Even row style
     * @param {object} [data.index] index options
     * @param {geotoolkit.attributes.LineStyle} [data.index.gridstyle] Grid style
     * @param {geotoolkit.attributes.TextStyle} [data.index.textstyle] Text style
     * @param {geotoolkit.attributes.FillStyle} [data.index.oddfillstyle] Odd row style
     * @param {geotoolkit.attributes.FillStyle} [data.index.evenfillstyle] Even row style
     * @param {geotoolkit.attributes.FillStyle} [data.index.markerfillstyle] Marker fill style
     * @param {geotoolkit.attributes.LineStyle} [data.index.markerlinestyle] Marker line style
     * @param {geotoolkit.attributes.FillStyle} [data.highlightrowfillstyle] Highlight row style
     * @param {geotoolkit.attributes.FillStyle} [data.highlightcolumnfillstyle] Highlight column style
     * @param {geotoolkit.util.Rect} [data.bounds] Bounds
     * @param {number} [data.rows] Table view row count
     * @param {number} [data.cols] Table view column count
     * @param {geotoolkit.util.Dimension} [data.defaultcellsize] Default cell dimensions
     * @param {geotoolkit.util.Dimension} [data.defaultheadersize] Default header dimensions
     *
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setData = function(data){};
    /**
     * Set left hand corner index text
     *
     * @param {string} indexTitle left hand corner index text
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setIndexTitle = function(indexTitle){};
    /**
     * Set optional cell measurement device, typical use would be to determine min table cell widths by contents.
     * contentMeasure parameter format: contentMeasure(column, textAttribute)
     * function will run with TableView set as this
     * object will run normally
     *
     * @param {function() | object} contentMeasure function to determine min table cell widths by contents
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setContentMeasure = function(contentMeasure){};
    /**
     * Set optional formatter of content values, use to prepare content value provider output.
     * contentPrepare parameter format: (startRow, endRow)
     * function will run with TableView set as this
     * object will run normally
     *
     * @param {function() | object} contentPrepare optional formatter of content values
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setContentPrepare = function(contentPrepare){};
    /**
     * Set content value provider, returns optionally formatted content value at col, row.
     * contentProvider parameter format: (column, row)
     * function will run with TableView set as this
     * object will run normally
     *
     * @param {function() | object} contentProvider content value provider
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setContentProvider = function(contentProvider){};
    /**
     * Set content format provider, returns optional text style at row.
     * contentFormatProvider parameter format: (row)
     * function will run with TableView set as this
     * object will run normally
     *
     * @param {function() | object} contentFormatProvider content format provider
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setContentFormatProvider = function(contentFormatProvider){};
    /**
     * Set header value provider, returns column header name.
     * headerProvider parameter format: (column)
     * function will run with TableView set as this
     * object will run normally
     *
     * @param {function() | object} headerProvider header value provider, returns column header name
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setHeaderProvider = function(headerProvider){};
    /**
     * Set header format provider, returns optionally text style at column.
     * headerFormatProvider parameter format: (column)
     * function will run with TableView set as this
     * object will run normally
     *
     * @param {function() | object} headerFormatProvider header format provider, returns optionally text style at column
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setHeaderFormatProvider = function(headerFormatProvider){};
    /**
     * Set optional formatter of index values, use to prepare index value provider output.
     * indexPrepare parameter format: (startRow, endRow)
     * function will run with TableView set as this
     * object will run normally
     *
     * @param {function() | object} indexPrepare optional formatter of index values, use to prepare index value provider output
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setIndexPrepare = function(indexPrepare){};
    /**
     * Set index value provider, returns optionally formatted index value at row.
     * indexProvider parameter format: (row)
     * function will run with TableView set as this
     * object will run normally
     *
     * @param {function() | object} indexProvider index value provider, returns optionally formatted index value at row
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setIndexProvider = function(indexProvider){};
    /**
     * Set index format provider, returns optionally text style at row.
     * indexFormatProvider parameter format: (row)
     * function will run with TableView set as this
     * object will run normally
     *
     * @param {function() | object} indexFormatProvider index format provider, returns text style at row
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setIndexFormatProvider = function(indexFormatProvider){};
    /**
     * Set marker provider, returns boolean value to show/hide marker.
     * markerProvider parameter format: (row)
     * function will run with TableView set as this
     * object will run normally
     *
     * @param {function() | object} markerProvider marker provider, returns boolean value to show/hide marker
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setMarkerProvider = function(markerProvider){};
    /**
     * Run once before rendering content data. This should be used to prepare content data output formatting.
     *
     * @param {number} fromRow fromRow used to prepare content data output formatting
     * @param {number} toRow toRow used to prepare content data output formatting
     * @param {number} fromColumn
     * @param {number} toColumn
     * @returns {?object}
     */
    geotoolkit.controls.shapes.TableView.prototype.prepareContent = function(fromRow, toRow, fromColumn, toColumn){};
    /**
     * Return optionally formatted content text field at col, row
     *
     * @param {number} column index at the column
     * @param {number} row index at the column
     * @returns {string} formatted content value
     */
    geotoolkit.controls.shapes.TableView.prototype.getContentData = function(column, row){};
    /**
     * Return header text at column
     *
     * @param {number} column index where the header text will be returned
     * @returns {string} header name
     */
    geotoolkit.controls.shapes.TableView.prototype.getHeaderData = function(column){};
    /**
     * Run once before rendering index data. This should be used to prepare index data output formatting.
     *
     * @param {number} fromRow fromRow used to prepare index data output formatting
     * @param {number} toRow toRow used to prepare index data output formatting
     */
    geotoolkit.controls.shapes.TableView.prototype.prepareIndex = function(fromRow, toRow){};
    /**
     * Return optionally formatted index value at row
     *
     * @param {number} row index value at row
     * @returns {string} formatted index value
     */
    geotoolkit.controls.shapes.TableView.prototype.getIndexData = function(row){};
    /**
     * Show marker at row
     *
     * @param {number} row index value at row
     * @returns {boolean} true to show marker, false otherwise
     */
    geotoolkit.controls.shapes.TableView.prototype.getMarkerData = function(row){};
    /**
     * Select row index for active row
     * @deprecated since 2.4 use geotoolkit.controls.shapes.TableView.setActiveRows instead
     * @param {number} row index value at row
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setActiveRow = function(row){};
    /**
     * Select row indexes for active rows
     *
     * @param {Array.<number>|number|?} rows index value at row
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.setActiveRows = function(rows){};
    /**
     * Return active row index
     * @deprecated since 2.4 use geotoolkit.controls.shapes.TableView.getActiveRows instead
     * @returns {number} row
     */
    geotoolkit.controls.shapes.TableView.prototype.getActiveRow = function(){};
    /**
     * Return active rows as array index
     *
     * @returns {Array.<number>} actives indexes row
     */
    geotoolkit.controls.shapes.TableView.prototype.getActiveRows = function(){};
    /**
     * Select row index for highlighting
     *
     * @param {number} row index value at row
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.highlightRow = function(row){};
    /**
     * Return highlighted row index
     *
     * @returns {number} row
     */
    geotoolkit.controls.shapes.TableView.prototype.getHighlightedRow = function(){};
    /**
     * Select column index for highlighting
     *
     * @param {number} column column index for highlighting
     * @returns {geotoolkit.controls.shapes.TableView} this
     */
    geotoolkit.controls.shapes.TableView.prototype.highlightColumn = function(column){};
    /**
     * Returns highlighted column index
     * @returns {number} column
     */
    geotoolkit.controls.shapes.TableView.prototype.getHighlightedColumn = function(){};
    /**
     * Returns cell row by x y position (in table view model coordinates)
     * @param {number|geotoolkit.util.Point} x x coordinate
     * @param {number} [y] y coordinate
     * @param {boolean} [exactValue == false] exact value
     * @returns {geotoolkit.util.Point}, X = Column, Y = Row
     */
    geotoolkit.controls.shapes.TableView.prototype.resolveCellCoordinate = function(x, y, exactValue){};
    /**
     * Returns cell bounds
     * @param {number} row index at row
     * @param {number} column index at column
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.controls.shapes.TableView.prototype.getCellBounds = function(row, column){};

/**
 * Defines a color bar shape. The ColorBar shape is an advanced shape that can display a colorprovider as a legend.<br>
 * It will render the colors from the colorprovider along with an axis and the corresponding ticks & labels.
 *
 * @class geotoolkit.controls.shapes.ColorBar
 * @augments geotoolkit.scene.Group
 * @param {object} [options]
 * @param {geotoolkit.util.ColorProvider} [options.colorprovider=new geotoolkit.util.DefaultColorProvider()] default color provider
 * @param {geotoolkit.controls.shapes.ColorBarLocation|string} [options.location=geotoolkit.controls.shapes.ColorBarLocation.East] color bar location
 * @param {boolean} [options.flip=false] flip or not
 * @param {geotoolkit.attributes.LineStyle|object} [options.linestyle=null] line style
 * @param {object} [options.range] data range
 * @param {number} [options.range.min] data range min value. If not specified then color provider's getMinValue() is used.
 * @param {number} [options.range.max] data range max value. If not specified then color provider's getMaxValue() is used.
 * @param {object} [options.title] color bar title
 * @param {number} [options.title.size] title area desired size
 * @param {boolean} [options.title.visible=true] title visibility
 * @param {string} [options.title.text=""] title text
 * @param {geotoolkit.attributes.TextStyle | string | object} [options.title.textstyle=null] title textstyle
 * @param {geotoolkit.scene.shapes.Text} [options.title.item=new geotoolkit.scene.shapes.Text("", 0.5, 0.5, undefined, undefined, new geotoolkit.attributes.TextStyle(), true)] title text object instance
 * @param {object} [options.axis]
 * @param {number} [options.axis.size] axis area desired size
 * @param {boolean} [options.axis.visible=true] axis visibility
 * @param {boolean} [options.axis.autolabelrotation=false] axis auto label rotation flag
 * @param {geotoolkit.axis.Axis} [options.axis.item=new geotoolkit.axis.Axis()] axis object instance
 * @param {object} [options.colorbox] color box attributes
 * @param {number} [options.colorbox.size] colorbox area desired size
 * @param {object} [options.namedcolors] namedcolors options
 * @param {number} [options.namedcolors.size] named colors desired size
 * @param {geotoolkit.attributes.LineStyle|object} [options.colorbox.linestyle=null] colorbox outline rectangle linestyle
 */
geotoolkit.controls.shapes.ColorBar = {};
    /**
     * Return new instance of the ColorBar node
     * @returns {geotoolkit.controls.shapes.ColorBar} clone
     */
    geotoolkit.controls.shapes.ColorBar.prototype.clone = function(){};
    /**
     * Sets color bar options
     * @param {object} [options] colorbar options
     * @param {geotoolkit.util.ColorProvider} [options.colorprovider=new geotoolkit.util.DefaultColorProvider()] default color provider
     * @param {geotoolkit.controls.shapes.ColorBarLocation|string} [options.location=geotoolkit.controls.shapes.ColorBarLocation.East] color bar location
     * @param {boolean} [options.flip=false] flip or not
     * @param {geotoolkit.attributes.LineStyle|object} [options.linestyle=null] line style
     * @param {number} [options.range] colorbar range
     * @param {number} [options.range.min] data range min value. If not specified then color provider's getMinValue() is used.
     * @param {number} [options.range.max] data range max value. If not specified then color provider's getMaxValue() is used.
     * @param {number} [options.min] data range min value. If not specified then color provider's getMinValue() is used.
     * @param {number} [options.max] data range max value. If not specified then color provider's getMaxValue() is used.
     * @param {number} [options.title] title attributes
     * @param {number} [options.title.size] title area desired size
     * @param {boolean} [options.title.visible=true] title visibility
     * @param {string} [options.title.text=""] title text
     * @param {string} [options.titletext=""] title text
     * @param {geotoolkit.attributes.TextStyle | string | object} [options.title.textstyle=null] title textstyle
     * @param {geotoolkit.scene.shapes.Text} [options.title.item=new geotoolkit.scene.shapes.Text("", 0.5, 0.5, undefined, undefined, new geotoolkit.attributes.TextStyle(), true)] title text object instance
     * @param {number} [options.axis] colorbar axis
     * @param {number} [options.axis.size] axis area desired size
     * @param {boolean} [options.axis.visible=true] axis visibility
     * @param {number} [options.axis.labelrotation=0] axis label rotation in radians
     * @param {boolean} [options.axis.autolabelrotation] auto rotate the labels if true
     * @param {number} [options.axis.autolabelrotationangle] rotation angle if active auto label rotation
     * @param {number} [options.axis.tickgenerator] tickgenerator options, see {@link geotoolkit.controls.Axis#setProperties}
     * @param {geotoolkit.axis.Axis} [options.axis.item=new geotoolkit.axis.Axis()] axis object instance
     * @param {number} [options.colorbox] color box
     * @param {number} [options.colorbox.size] colorbox area desired size
     * @param {geotoolkit.attributes.LineStyle|object} [options.colorbox.linestyle=null] colorbox outline rectangle linestyle
     * @param {number} [options.componentsizes] size of components
     * @param {number} [options.componentsizes.title] title area desired size
     * @param {number} [options.componentsizes.colorbox] colorbox area desired size
     * @param {number} [options.componentsizes.axis] axis area desired size
     * @param {number} [options.componentsizes.namedcolors] named colors desired size
     * @param {object} [options.namedcolors] namedcolors options
     * @param {number} [options.namedcolors.size] named colors desired size
     * @param {boolean} [options.namedcolors.visible=false] named colors visibility
     * @returns {geotoolkit.controls.shapes.ColorBar} this
     */
    geotoolkit.controls.shapes.ColorBar.prototype.setOptions = function(options){};
    /**
     * Gets color bar options
     * @returns {object} options (see setOptions for the JSON-object detailed description)
     */
    geotoolkit.controls.shapes.ColorBar.prototype.getOptions = function(){};
    /**
     * Updates layout
     * @param {Array<geotoolkit.scene.Node>} [targets] optional parameter about which element to layout
     * @returns {geotoolkit.controls.shapes.ColorBar} this
     */
    geotoolkit.controls.shapes.ColorBar.prototype.updateLayout = function(targets){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.controls.shapes.ColorBar.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set see {@link geotoolkit.controls.shapes.ColorBar#setOptions}
     * @returns {geotoolkit.controls.shapes.ColorBar} this
     */
    geotoolkit.controls.shapes.ColorBar.prototype.setProperties = function(properties){};
    /**
     * Returns the tick generator of inner axis for manipulations
     * @returns {geotoolkit.axis.TickGenerator | null}
     */
    geotoolkit.controls.shapes.ColorBar.prototype.getTickGenerator = function(){};
    /**
     * Set tick generator
     * @param {geotoolkit.axis.TickGenerator} tickGenerator tick generator
     * @returns {geotoolkit.controls.shapes.ColorBar}
     */
    geotoolkit.controls.shapes.ColorBar.prototype.setTickGenerator = function(tickGenerator){};
    /**
     * Gets the offset of value on ColorBar
     * @param {number} value value
     * @returns {number} offset on ColorBar
     */
    geotoolkit.controls.shapes.ColorBar.prototype.getPointAtValue = function(value){};

/**
 * Defines a basic polar grid. This class is a base class for rendering polar grid. Polar grid is a base class for all diagrams in polar coordinates.<br>
 * Three parameters should be passed to polar visual to make it work properly:<br>
 * 1) Center of the diagram(in model coordinates)<br>
 * 2) Radius of the grid(in model coordinates)<br>
 * 3) Angle increment to draw sectors <br>
 * The grid in the polar chart can be customized very easily, please refer to the gridlines properties in the constructor below.<br>
 * Sectors can be added to highlight areas in the grid as shown in the example
 * @example
 * polarGrid.setSectors([{
 * 'start': 0,
 * 'end': 45,
 * 'color': Helpers.getColor("orange")
 * }]);
 * @class geotoolkit.controls.shapes.PolarGrid
 * @augments geotoolkit.scene.shapes.RectangularShape
 * @param {object} [options]
 * @param {geotoolkit.util.Point | object} options.center a center of the polar grid
 * @param {number} [options.center.x=0] x coordinate of the center
 * @param {number} [options.center.y=0] y coordinate of the center
 * @param {number} [options.angle] an increment angle of the grid
 * @param {number} [options.outerradius=50] a radius of the polar chart
 * @param {number} [options.modelradius=90] radius of the polar chart in the model coordinates
 * @param {number} [options.startangle=0] a start angle to be used for 0 angle (by default it is E direction)
 * @param {geotoolkit.attributes.LineStyle | object} [options.linestyle] line style to specify style for outer circle
 * @param {object} [options.gridlines] gridlines properties
 * @param {object} [options.gridlines.radius] define options of radius gridlines
 * @param {geotoolkit.attributes.LineStyle | object} [options.gridlines.radius.linestyle] line style
 * @param {number} [options.gridlines.radius.step = 10] step by radius in model coordinates
 * @param {number} [options.gridlines.radius.values=null] optional positions of lines. In this case step ignored. values are in raduses
 * @param {boolean} [options.gridlines.radius.visible = true] visibility of radius grid
 * @param {string} [options.gridlines.radius.highlighted = null] define a color to highlight grid
 * @param {object} [options.gridlines.angles] define options of angles gridlines
 * @param {boolean} [options.gridlines.angles.visible = true] visibility of angles grid
 * @param {boolean} [options.gridlines.angles.visiblelabels = true] visibility of angles labels
 * @param {geotoolkit.attributes.LineStyle | object} [options.gridlines.angles.linestyle] line style
 * @param {geotoolkit.attributes.TextStyle | object} [options.gridlines.angles.textstyle] labels style
 * @param {object} [options.gridlines.angles.labels = null] define optional labels instead of standard
 * @param {number[]} [options.gridlines.angles.labels.values = null] define optional array of angles
 * @param {string[]} [options.gridlines.angles.labels.text = null] define optional array of text labels
 * @param {boolean} [options.gridlines.angles.labelsalongcircumference = false] draw text labels along the circumfrence of the outer circle
 */
geotoolkit.controls.shapes.PolarGrid = {};
    /**
     * Sets an array of sectors
     * @param {object[]} sectors each element {start, end, color, length)
     * @returns {geotoolkit.controls.shapes.PolarGrid} this
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.setSectors = function(sectors){};
    /**
     * Set options
     * @param {object} options JSON containing grid options
     * @param {geotoolkit.util.Point} options.center a center of the polar chart
     * @param {number} [options.angle] an increment angle of the grid
     * @param {number} [options.outerradius=50] a radius of the polar chart
     * @param {geotoolkit.attributes.LineStyle | object} [options.linestyle] line style to specify style for outer circle
     * @param {object} [options.gridlines] gridlines properties
     * @param {object} [options.gridlines.radius] define options of radius gridlines
     * @param {geotoolkit.attributes.LineStyle | object} [options.gridlines.radius.linestyle] line style
     * @param {number} [options.gridlines.radius.step = 10] step by radius in model coordinates
     * @param {number} [options.gridlines.radius.values=null] optional positions of lines. In this case step ignored. values are in raduses
     * @param {boolean} [options.gridlines.radius.visible = true] visibility of radius grid
     * @param {object} [options.gridlines.angles] define options of angles gridlines
     * @param {boolean} [options.gridlines.angles.visible = true] visibility of angles grid
     * @param {boolean} [options.gridlines.angles.visiblelabels = true] visibility of angles labels
     * @param {geotoolkit.attributes.LineStyle | object} [options.gridlines.angles.linestyle] line style
     * @param {geotoolkit.attributes.TextStyle | object} [options.gridlines.angles.textstyle] labels style
     * @param {object} [options.gridlines.angles.labels = null] define optional labels instead of standard
     * @param {number[]} [options.gridlines.angles.labels.values = null] define optional array of angles
     * @param {string[]} [options.gridlines.angles.labels.text = null] define optional array of text labels
     * @param {boolean} [options.gridlines.angles.labelsalongcircumference = true] lables drawn along outer circumfrance
     * @param {boolean} [options.gridlines.angles.labeloffset = 0] radius offset for labels
     * @param {boolean} [refresh] invalidate graph
     * @returns {geotoolkit.controls.shapes.PolarGrid} this
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.setOptions = function(options, refresh){};
    /**
     * Return option to be used to draw a grid
     * @returns {*}
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.getOptions = function(){};
    /**
     * Convert model radius to outer radius
     * @param {number} value value of the outer radius
     * @returns {number}
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.modelToOuterRadius = function(value){};
    /**
     * Render contents of the crossplot shape
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.render = function(context){};
    /**
     * Render angle grid
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.drawSectors = function(context){};
    /**
     * Render angle grid
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.drawAngleGrid = function(context){};
    /**
     * Render angle axis
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.drawAngleAxis = function(context){};
    /**
     * Render angle text horizontally
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.drawAngleAxisRegular = function(context){};
    /**
     * Render angle text along circumference
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.drawAngleAxisAlongCircumference = function(context){};
    /**
     * Render value grid
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.drawValueGrid = function(context){};
    /**
     * Convert point from polar to cartesian coordinate system. the center is int e
     * @param {number} r radius
     * @param {number} theta angle in grad
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.polarToCartesian = function(r, theta){};
    /**
     * Convert point from polar to cartesian coordinate system
     * @param {number} x x coordinate (offset from center point)
     * @param {number} y coordinate (offset from center point)
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.cartesianToPolar = function(x, y){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * {geotoolkit.util.Rect} [props.bounds] shape bounds
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {object} [properties.options] options to set see {@link geotoolkit.controls.shapes.PolarGrid#setOptions}
     * @returns {geotoolkit.controls.shapes.PolarGrid} this
     */
    geotoolkit.controls.shapes.PolarGrid.prototype.setProperties = function(properties){};

/**
 * A Polar Chart is a circular graph used for data comparison.
 * @class geotoolkit.controls.shapes.PolarChart
 * @augments geotoolkit.scene.shapes.Shape
 * @param {object} [options=null]
 * @param {geotoolkit.util.Point | object} [options.center] a center of the polar chart
 * @param {number} [options.center.x=0] x coordinate of the center
 * @param {number} [options.center.y=0] y coordinate of the center
 * @param {geotoolkit.controls.shapes.PolarGrid} [options.polargrid] grid to get initialization parameters.
 * @param {number} [options.outerradius=50] a radius of the polar chart
 * @param {number} [options.modelradius=90] radius of the polar chart in the model coordinates
 * @param {number} [options.startangle=0] a start angle to be used for 0 angle (by default it is E direction)
 * @param {Array} [options.data] array of polar chart data
 */
geotoolkit.controls.shapes.PolarChart = {};
    /**
     * set model radius
     * @param {number} radius model radius
     * @returns {geotoolkit.controls.shapes.PolarChart} this
     */
    geotoolkit.controls.shapes.PolarChart.prototype.setModelRadius = function(radius){};
    /**
     * Return model radius
     * @returns {number} radius
     */
    geotoolkit.controls.shapes.PolarChart.prototype.getModelRadius = function(){};
    /**
     * Set the data to be plotted in chart
     *
     * @param {object} data polar chart options
     * @param {string} [data.name] chart name
     * @param {geotoolkit.controls.shapes.PolarGrid} [data.polargrid] chart grid
     * @param {number} [data.outerRadius] outer radius
     * @param {number} [data.modelradius] model radius
     * @param {number} [data.startangle] start angle
     * @param {geotoolkit.util.Point} [data.center] center point
     * @param {Array} [data.data] to be charted in polar chart
     * @returns {geotoolkit.controls.shapes.PolarChart} this
     */
    geotoolkit.controls.shapes.PolarChart.prototype.setData = function(data){};
    /**
     * Returns current bounds
     *
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.controls.shapes.PolarChart.prototype.getBounds = function(){};
    /**
     * Return array of chart options
     * @returns {object} options
     */
    geotoolkit.controls.shapes.PolarChart.prototype.getOptions = function(){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.controls.shapes.PolarChart} this
     */
    geotoolkit.controls.shapes.PolarChart.prototype.setBounds = function(bounds){};
    /**
     * Reset highlighting
     */
    geotoolkit.controls.shapes.PolarChart.prototype.resetHighlighting = function(){};
    /**
     * Highlights the selected indices
     * @param {array.<number>} indices indices to be highlighted
     * @param {number} [series=0] series number
     * @param {boolean} [reset=false] un-highlights previously selected indices
     * @returns {geotoolkit.controls.shapes.PolarChart}
     */
    geotoolkit.controls.shapes.PolarChart.prototype.highlightIndices = function(indices, series, reset){};
    /**
     * Hit test in the device coordinate
     * @param {geotoolkit.util.Rect|geotoolkit.util.Point} area model area or position
     * @param {number} [radius=10] radius of selection
     * @returns {Array.<geotoolkit.scene.Node>} a collection of selected nodes
     */
    geotoolkit.controls.shapes.PolarChart.prototype.hitTest = function(area, radius){};
    /**
     * Render polar chart shape
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.PolarChart.prototype.render = function(context){};
    /**
     * Convert point from polar to cartesian coordinate system. the center is int e
     * @param {number} r radius
     * @param {number} theta angle in grad
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.shapes.PolarChart.prototype.polarToCartesian = function(r, theta){};
    /**
     * Convert model radius to outer radius
     * @param {number} value value of the outer radius
     * @returns {number} result
     */
    geotoolkit.controls.shapes.PolarChart.prototype.modelToOuterRadius = function(value){};

/**
 * Defines an crossplot shape in the polar coordinates. First a polar grid will need to be created and then CrossPlot shape can be added to the grid as shown in the example below.<br>
 * Sectors can be added to highlight the area and third dimension can be defined for each point in the cross plot. To display a tool tip while clicking a symbol on polar cross plot, refer to the Polar Plot section Polar Chart tutorial.
 * @example
 * var crossPlotShape = new geotoolkit.controls.shapes.PolarCrossPlot({
 * 'center': {x: 100, y: 100},
 * 'outerradius': 100,
 * 'data': {
 * 'radius': [0, 15, 50, 70],
 * 'angle': [0, 15, 25, 35]
 * }
 * });
 *
 * @class geotoolkit.controls.shapes.PolarCrossPlot
 * @augments geotoolkit.controls.shapes.CrossPlot
 * @param {object} [options]
 * @param {geotoolkit.util.Point} [options.center=null] a center of the polar chart
 * @param {number} [options.outerradius=50] a radius of the polar chart
 * @param {number} [options.modelradius=90] a radius of the polar chart in the model coordinates
 * @param {number} [options.startangle=0] a start angle to be used for 0 angle (by default it is E direction)
 * @param {geotoolkit.util.ColorProvider} [options.colorProvider = null] a color provider
 * @param {object} [options.painter = null] a painter
 * @param {string} [options.defaultcolor=rgba(60,60,60,1)] The color to use if there is no ColorProvider provided or if a point has no valid Z value
 * @param {number} [options.symbolsize=8] The symbol size in pxl
 * @param {string} [options.highlightcolor=rgb(255,0,255)] The color to use for highlighted shapes
 * @param {geotoolkit.controls.shapes.PolarGrid} [options.polargrid] grid to get initialization parameters. If grid is specified other
 * parameters are ignored
 * @param {object} [options.data] a data in polar coordinates
 * @param {number[]} [options.data.radius] an array of radius
 * @param {number[]} [options.data.angle] an array of angles in grad
 * @param {number[]} [options.data.variable] an array of numbers to be used for third dimension
 */
geotoolkit.controls.shapes.PolarCrossPlot = {};
    /**
     * @param {object} options
     * @param {geotoolkit.util.Point} options.center a center of the polar chart
     * @param {number} [options.outerradius=50] a radius of the polar chart
     * @param {number} [options.modelradius=90] a radius of the polar chart in the model coordinates
     * @param {number} [options.startangle=0] a start angle to be used for 0 angle (by default it is E direction)
     * @param {geotoolkit.util.ColorProvider} [options.colorProvider = null] a color provider
     * @param {object} [options.painter = null] a painter
     * @param {geotoolkit.controls.shapes.PolarGrid} [options.polargrid=null] grid to get initialization parameters. If grid is specified other
     * parameters are ignored
     * @param {object} [options.data] a data in polar coordinates
     * @param {number[]} [options.data.radius] an array of radius
     * @param {number[]} [options.data.angle] an array of angles in grad
     * @param {number[]} [options.data.variable] an array of numbers to be used for third dimension
     * @returns {geotoolkit.controls.shapes.PolarCrossPlot} this
     */
    geotoolkit.controls.shapes.PolarCrossPlot.prototype.setData = function(options){};
    /**
     * Convert point from polar to cartesian coordinate system. the center is int e
     * @param {number} r radius
     * @param {number} theta angle in grad
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.shapes.PolarCrossPlot.prototype.polarToCartesian = function(r, theta){};
    /**
     * Convert point from polar to cartesian coordinate system
     * @param {number} x x coordinate (offset from center point)
     * @param {number} y coordinate (offset from center point)
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.shapes.PolarCrossPlot.prototype.cartesianToPolar = function(x, y){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * {geotoolkit.util.Rect} [props.bounds] shape bounds
     */
    geotoolkit.controls.shapes.PolarCrossPlot.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {object} [properties.options] options to set see {@link geotoolkit.controls.shapes.PolarCrossPlot#setData}
     * @returns {geotoolkit.controls.shapes.PolarCrossPlot} this
     */
    geotoolkit.controls.shapes.PolarCrossPlot.prototype.setProperties = function(properties){};

/**
 * A Rose Chart is a circular graph used for data comparison. Each category or interval in data is divided into equal segments on the radial chart.<br>
 * How far each segment extends from the centre, in proportion to the value it represents, depends on a polar axis.<br>
 * @class geotoolkit.controls.shapes.RoseChart
 * @augments geotoolkit.scene.shapes.Shape
 * @param {object} options
 */
geotoolkit.controls.shapes.RoseChart = {};
    /**
     * Enum for RoseMode
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.RoseChart.RoseMode = {};
        /**
         * bar
         * @type {string}
         */
        geotoolkit.controls.shapes.RoseChart.RoseMode.Bar = "";
        /**
         * histogram
         * @type {string}
         */
        geotoolkit.controls.shapes.RoseChart.RoseMode.Histogram = "";
        /**
         * slices, each value can has own start and end angle, value, fillstyle and linestyle properties
         * @type {string}
         */
        geotoolkit.controls.shapes.RoseChart.RoseMode.Slices = "";
    /**
     * Set fill styles
     * @param {geotoolkit.util.Iterator | Array<geotoolkit.attributes.FillStyle|object> | geotoolkit.attributes.LineStyle | object} [styles] line styles
     * @returns {geotoolkit.controls.shapes.RoseChart}
     */
    geotoolkit.controls.shapes.RoseChart.prototype.setFillStyles = function(styles){};
    /**
     * Return iterator with fill styles
     * @param {function()} [func=null] to filter fill styles
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.controls.shapes.RoseChart.prototype.getFillStyles = function(func){};
    /**
     * Return fill style by specified index if any, or background fill style
     * @param {Number} [index=null] index of the fill style
     * @returns {?geotoolkit.attributes.FillStyle} background fill style
     */
    geotoolkit.controls.shapes.RoseChart.prototype.getFillStyle = function(index){};
    /**
     * Returns amount of known fill styles
     * @returns {Number}
     */
    geotoolkit.controls.shapes.RoseChart.prototype.getFillStylesCount = function(){};
    /**
     * Set line styles
     * @param {geotoolkit.util.Iterator | Array<geotoolkit.attributes.LineStyle|object> | geotoolkit.attributes.LineStyle | object} [styles] line styles
     * @returns {geotoolkit.controls.shapes.RoseChart}
     */
    geotoolkit.controls.shapes.RoseChart.prototype.setLineStyles = function(styles){};
    /**
     * Return iterator with fill styles
     * @param {function()} [func=null] to filter fill styles
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.controls.shapes.RoseChart.prototype.getLineStyles = function(func){};
    /**
     * Return line style by specified index if any, or border line style
     * @param {Number} [index=null] index of the line style
     * @returns {?geotoolkit.attributes.LineStyle} border line style
     */
    geotoolkit.controls.shapes.RoseChart.prototype.getLineStyle = function(index){};
    /**
     * Returns amount of known line styles
     * @returns {Number}
     */
    geotoolkit.controls.shapes.RoseChart.prototype.getLineStylesCount = function(){};
    /**
     * Set values
     * @param {Array<Number|object>} values values
     * @returns {geotoolkit.controls.shapes.RoseChart} this
     */
    geotoolkit.controls.shapes.RoseChart.prototype.setValues = function(values){};
    /**
     * Set rose mode
     * @param {geotoolkit.controls.shapes.RoseChart.RoseMode} mode rose mode
     * @returns {geotoolkit.controls.shapes.RoseChart} this
     */
    geotoolkit.controls.shapes.RoseChart.prototype.setRoseMode = function(mode){};
    /**
     * Return rose mode
     * @returns {geotoolkit.controls.shapes.RoseChart.RoseMode} mode
     */
    geotoolkit.controls.shapes.RoseChart.prototype.getRoseMode = function(){};
    /**
     * Set model radius
     * @param {number} radius model radius
     * @returns {geotoolkit.controls.shapes.RoseChart} this
     */
    geotoolkit.controls.shapes.RoseChart.prototype.setModelRadius = function(radius){};
    /**
     * Return model radius
     * @returns {number} radius
     */
    geotoolkit.controls.shapes.RoseChart.prototype.getModelRadius = function(){};
    /**
     * Set the data to be plotted in the rose chart
     *
     * @param {object} data Data to be charted in histogram
     * @param {string} data.name name of the rose chart diagram
     * @param {geotoolkit.controls.shapes.PolarGrid} [data.polargrid] polar grid
     * @param {geotoolkit.controls.shapes.RoseChart} [data.rosemode] Rosemode
     * @param {number} [data.outerradius] outer radius
     * @param {number} [data.startangle] start angle
     * @param {geotoolkit.util.Point} [data.center] center
     * @param {?geotoolkit.attributes.FillStyle|object} [data.fillstyle] background fill style
     * @param {?geotoolkit.attributes.LineStyle|object} [data.linestyle] border line style
     * @param {Array<Number>} [data.values] values values
     * @param {object} [data.data] data object
     * @param {number} [data.data.bins] bins bins
     * @param {geotoolkit.util.Iterator | Array<geotoolkit.attributes.FillStyle|object> | geotoolkit.attributes.FillStyle | object} [data.data.fillstyles] an array of fill styles
     * @param {geotoolkit.util.Iterator | Array<geotoolkit.attributes.LineStyle|object> | geotoolkit.attributes.LineStyle | object} [data.data.linestyles] an array of line styles
     * @returns {geotoolkit.controls.shapes.RoseChart} this
     */
    geotoolkit.controls.shapes.RoseChart.prototype.setData = function(data){};
    /**
     * Returns rose chart options
     * @returns {object} options
     * @returns {string} [options.name] name of the rose chart diagram
     * @returns {geotoolkit.controls.shapes.PolarGrid} [options.polargrid] polar grid
     * @returns {geotoolkit.controls.shapes.RoseChart} [options.rosemode] Rosemode
     * @returns {number} [options.outerradius] outer radius
     * @returns {number} [options.startangle] start angle
     * @returns {geotoolkit.util.Point} [options.center] center
     * @returns {?geotoolkit.attributes.FillStyle} [options.fillstyle] background fill style
     * @returns {?geotoolkit.attributes.LineStyle} [options.linestyle] border line style
     * @returns {Array<Number>} [options.values] values values
     * @returns {object} [options.data] data object
     * @returns {number} [options.data.bins] bins
     * @returns {geotoolkit.util.Iterator} [options.data.fillstyles] an array of fill styles
     * @returns {geotoolkit.util.Iterator} [options.data.linestyles] an array of line styles
     */
    geotoolkit.controls.shapes.RoseChart.prototype.getOptions = function(){};
    /**
     * Return bin count
     * @returns {number} bincount bins count
     */
    geotoolkit.controls.shapes.RoseChart.prototype.getBinCount = function(){};
    /**
     * Set bins count
     * @param {Number} bins bins count
     * @returns {geotoolkit.controls.shapes.RoseChart} this
     */
    geotoolkit.controls.shapes.RoseChart.prototype.setBinCount = function(bins){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect} bounds
     * bounds of the node in the parent coordinates
     * @returns {geotoolkit.controls.shapes.RoseChart} this
     */
    geotoolkit.controls.shapes.RoseChart.prototype.setBounds = function(bounds){};
    /**
     * Returns current bounds
     *
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.controls.shapes.RoseChart.prototype.getBounds = function(){};
    /**
     * Render histogram shape
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.RoseChart.prototype.render = function(context){};
    /**
     * Convert model radius to outer radius
     * @param {number} value value of the outer raidus
     * @returns {number}
     */
    geotoolkit.controls.shapes.RoseChart.prototype.modelToOuterRadius = function(value){};

/**
 * This class defines a DonutChart object. The doughnut and pie charts are generally equal. <br>
 * The only difference is that doughnut chart has a hole in the center so it has one extra parameter - inner radius. <br>
 * @class geotoolkit.controls.shapes.DonutChart
 * @augments geotoolkit.scene.Group
 * @param {object} options options object
 *
 * @param {number} [options.outerradius=150] outer radius
 * @param {number} [options.maxouterradius=150] max outer radius
 * @param {number} [options.innerradius=25] inner radius
 * @param {geotoolkit.controls.shapes.DonutChart.PieMode|string} [options.piemode=geotoolkit.controls.shapes.DonutChart.PieMode.Pie2D] 2d- or 3d-representation
 * @param {number} [options.startangle=0] starting angle of the first slice drawn, in degrees
 * @param {geotoolkit.controls.shapes.DonutChart.Direction|string} [options.direction=geotoolkit.controls.shapes.DonutChart.Direction.Clockwise] slices' rendering direction
 *
 * @param {Array.<geotoolkit.attributes.FillStyle | string | object>} [options.fillstyles=[]] fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
 * @param {Array.<geotoolkit.attributes.FillStyle | string | object>} [options.selected-fillstyles=[]] fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
 * @param {geotoolkit.attributes.LineStyle | string | object} [options.linestyle] slice line style
 * @param {boolean} [options.autogradient=false] autogradient flag
 * @param {function()} [options.createselectedstyle] method to create selected style based on "regular" one (used when "selected_fillstyles" not set explicitly)
 *
 * @param {number} [options.minpercentage=0] minimum percentage cutoff for a slice before it becomes part of "other". 0 for no limit
 * @param {number} [options.maxslices=0] maximum amount of slices the graph can have including an "other" slice. 0 for infinite
 *
 * @param {number} [options.showpercentagesthreshold=0] below this threshold (from 0 to 100) the percentage is not displayed
 * @param {geotoolkit.controls.shapes.DonutChart.ModelLimitsMode|string} [options.modellimitsmode=Radius] model limits mode
 *
 * @param {object} [options.label] labeling options object
 * @param {boolean} [options.label.hideifdontfit=false] hide an inside label if it doesn't fit
 * @param {function} [options.label.format] label formatting method in form "function myLabelFormat(annotation, value) {...}" returning {string} value
 * @param {geotoolkit.controls.shapes.DonutChart.LabelLocation|string} [options.label.location=geotoolkit.controls.shapes.DonutChart.LabelLocation.Inside] label location
 * @param {geotoolkit.controls.shapes.DonutChart.LabelDirection|string} [options.label.direction=geotoolkit.controls.shapes.DonutChart.LabelDirection.Horizontal] label direction
 * @param {geotoolkit.attributes.TextStyle | string | object} [options.label.textstyle] label text style
 *
 * @param {object} [options.outsideline] outside line options object
 * @param {geotoolkit.attributes.LineStyle | string | object} [options.outsideline.linestyle] outside line style
 * @param {number} [options.outsideline.length=10] outside line length
 * @param {number} [options.outsideline.pad=2] outside line pad
 *
 * @param {object} [options.sliceshift] slice shift options object
 * @param {Array<number>} [options.sliceshift.offsets=[]] slices shift offsets. Index in the array to match the index of slice
 * @param {number} [options.sliceshift.offset=40] deprecated (since 2.6) slice shift offset
 * @param {number|Array} [options.sliceshift.index=[]] deprecated (since 2.6) index (indices) of slices to shift
 *
 * @param {number} [options.depth3d=30] height of a pseudo-3d chart
 * @param {number} [options.inclination3d=60] angle of the pseudo-3d chart. should be between 0 and 90
 */
geotoolkit.controls.shapes.DonutChart = {};
    /**
     * Sets data to display. Sends {@link geotoolkit.scene.Node.Events.Changed} event at the end.
     *
     * @param {!object} data data object
     * @param {geotoolkit.controls.shapes.DonutChart.DataMode|string} [data.mode=geotoolkit.controls.shapes.DonutChart.DataMode.Raw] data mode
     * @param {geotoolkit.controls.shapes.DonutChart.DataOrder|string} [data.order=geotoolkit.controls.shapes.DonutChart.DataOrder.Descending] data order
     * @param {Array|geotoolkit.data.DataSeries|geotoolkit.data.DataSeriesView|object} data.values Array of values or associative object
     * @returns {geotoolkit.controls.shapes.DonutChart} this
     */
    geotoolkit.controls.shapes.DonutChart.prototype.setData = function(data){};
    /**
     * Gets display options
     * (see {@link geotoolkit.controls.shapes.DonutChart.setOptions} for more info)
     * @returns {object} display options
     */
    geotoolkit.controls.shapes.DonutChart.prototype.getOptions = function(){};
    /**
     * Sets display options. Sends {@link geotoolkit.scene.Node.Events.Changed} event at the end.
     *
     * @param {!object} options options object
     *
     * @param {number} [options.outerradius] outer radius
     * @param {number} [options.maxouterradius] max outer radius
     * @param {number} [options.innerradius] inner radius
     * @param {geotoolkit.controls.shapes.DonutChart.PieMode|string} [options.piemode] 2d- or 3d-representation
     * @param {number} [options.startangle] starting angle of the first slice drawn, in degrees
     * @param {geotoolkit.controls.shapes.DonutChart.Direction|string} [options.direction] slices' rendering direction
     *
     * @param {Array} [options.fillstyles] fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
     * @param {Array} [options.selected-fillstyles] fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.linestyle] slice line style
     * @param {boolean} [options.autogradient] autogradient flag
     * @param {function()} [options.createselectedstyle] method to create selected style based on "regular" one (used when "selected_fillstyles" not set explicitly)
     *
     * @param {number} [options.minpercentage] minimum percentage cutoff for a slice before it becomes part of "other". 0 for no limit
     * @param {number} [options.maxslices] maximum amount of slices the graph can have including an "other" slice. 0 for infinite
     *
     * @param {number} [options.showpercentagesthreshold] below this threshold (from 0 to 100) the percentage is not displayed
     * @param {geotoolkit.controls.shapes.DonutChart.ModelLimitsMode|string} [options.modellimitsmode] model limits mode
     *
     * @param {object} [options.label] labeling options object
     * @param {boolean} [options.label.hideifdontfit] hide an inside label if it doesn't fit
     * @param {function} [options.label.format] label formatting method in form "function myLabelFormat(annotation, value) {...}" returning {string} value
     * @param {geotoolkit.controls.shapes.DonutChart.LabelLocation|string} [options.label.location] label location
     * @param {geotoolkit.controls.shapes.DonutChart.LabelDirection|string} [options.label.direction] label direction
     * @param {geotoolkit.attributes.TextStyle | string | object} [options.label.textstyle] label text style
     *
     * @param {object} [options.outsideline] outside line options object
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.outsideline.linestyle] outside line style
     * @param {number} [options.outsideline.length] outside line length
     * @param {number} [options.outsideline.pad] outside line pad
     *
     * @param {object} [options.sliceshift] slice shift options object
     * @param {Array<number>} [options.sliceshift.offsets] slices shift offsets. Index in the array to match the index of slice
     * @param {number} [options.sliceshift.offset] deprecated (since 2.6) slice shift offset
     * @param {number|Array} [options.sliceshift.index] deprecated (since 2.6) index (indices) of slices to shift
     *
     * @param {number} [options.depth3d] height of a pseudo-3d chart
     * @param {number} [options.inclination3d] angle of the pseudo-3d chart. should be between 0 and 90
     *
     * @returns {geotoolkit.controls.shapes.DonutChart} this
     */
    geotoolkit.controls.shapes.DonutChart.prototype.setOptions = function(options){};
    /**
     * Enum defining PieMode
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.DonutChart.PieMode = {};
        /**
         * Pie2D
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.PieMode.Pie2D = "";
        /**
         * Pie3D
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.PieMode.Pie3D = "";
    /**
     * Enum defining donut charts model limits mode
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.DonutChart.ModelLimitsMode = {};
        /**
         * Radius - Model Limits will be the based on the outerRadius
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.ModelLimitsMode.Radius = "";
        /**
         * Padded - Model Limits will be the based on the outerRadius plus the slice shift
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.ModelLimitsMode.Padded = "";
        /**
         * Dynamic - Model Limits will adjust to fit the shape in the bounds
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.ModelLimitsMode.Dynamic = "";
        /**
         * Auto - Model Limits will be the based on the maxOuterRadius
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.ModelLimitsMode.Auto = "";
    /**
     * Enum defining DataMode
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.DonutChart.DataMode = {};
        /**
         * Raw
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.DataMode.Raw = "";
        /**
         * Associative
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.DataMode.Associative = "";
    /**
     * Enum defining LabelLocation
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.DonutChart.LabelLocation = {};
        /**
         * Inside
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.LabelLocation.Inside = "";
        /**
         * Outside
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.LabelLocation.Outside = "";
    /**
     * Enum defining LabelDirection
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.DonutChart.LabelDirection = {};
        /**
         * Horizontal
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.LabelDirection.Horizontal = "";
        /**
         * Radial
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.LabelDirection.Radial = "";
    /**
     * Enum defining Direction
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.DonutChart.Direction = {};
        /**
         * Clockwise
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.Direction.Clockwise = "";
        /**
         * CounterClockwise
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.Direction.CounterClockwise = "";
    /**
     * Enum defining Data Order Mode
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.DonutChart.DataOrder = {};
        /**
         * Ascending
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.DataOrder.Ascending = "";
        /**
         * Descending
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.DataOrder.Descending = "";
        /**
         * Natural
         * @type {string}
         */
        geotoolkit.controls.shapes.DonutChart.DataOrder.Natural = "";
    /**
     * Render to specified context
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.DonutChart.prototype.renderContent = function(context){};
    /**
     * Sets chart bounds
     * @param {geotoolkit.util.Rect} rect bounds
     * @returns {geotoolkit.controls.shapes.DonutChart} this
     */
    geotoolkit.controls.shapes.DonutChart.prototype.setBounds = function(rect){};
    /**
     * Check collision
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean} true if object is inside of rendering area
     */
    geotoolkit.controls.shapes.DonutChart.prototype.checkCollision = function(context){};
    /**
     * Sets chart model limits
     * @param {geotoolkit.util.Rect} rect model limits
     * @returns {geotoolkit.controls.shapes.DonutChart} this
     */
    geotoolkit.controls.shapes.DonutChart.prototype.setModelLimits = function(rect){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {Object} props JSON containing properties
     */
    geotoolkit.controls.shapes.DonutChart.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.controls.shapes.DonutChart} this
     */
    geotoolkit.controls.shapes.DonutChart.prototype.setProperties = function(properties){};
    /**
     * return the number of slices in the donut chart
     *
     * @returns {number}
     */
    geotoolkit.controls.shapes.DonutChart.prototype.getSlicesCount = function(){};
    /**
     * return slice at specific index if it exist, null otherwise
     *
     * @param {number} index specified index to return the slice at
     *
     * @returns {?Object} JSON object that describes slice information - the corresponding slice information contains <br/>
     * Example :<br/>
     * { 'label: 'slice1', 'value': 42, 'percentage' : 14.01, 'color': 'red', 'angleDegStart' : 10, 'angleDegEnd' : 45 }
     *
     */
    geotoolkit.controls.shapes.DonutChart.prototype.getSliceByIndex = function(index){};
    /**
     * Select elements at specified canvas coordinates
     *
     * @param {number | geotoolkit.util.Point} x x-ordinate OR {x,y}-coordinates
     * @param {number} [y] y-ordinate
     * @param {boolean} [highlight=false] highlight selected elements
     * @returns {Array} array of selected slices' indices
     */
    geotoolkit.controls.shapes.DonutChart.prototype.selectSlicesAt = function(x, y, highlight){};
    /**
     * Highlight specified slicess
     *
     * @param {!Array} slices array of slices' indices to highlight
     * @param {boolean} [append=false] append or replace flag
     * @returns {geotoolkit.controls.shapes.DonutChart} this
     */
    geotoolkit.controls.shapes.DonutChart.prototype.highlightSlices = function(slices, append){};
    /**
     * Dispose DonutChart and its shapes
     *
     * @override
     */
    geotoolkit.controls.shapes.DonutChart.prototype.dispose = function(){};

/**
 * Tornado Chart
 *
 * @class geotoolkit.controls.shapes.TornadoChart
 * @augments geotoolkit.scene.shapes.Shape
 * @param {Object} params
 * @param {Array} [params.left] leftData
 * @param {Array} [params.right] rightData
 * @param {geotoolkit.util.Rect} [params.bounds] bounds for the chart
 * @param {geotoolkit.attributes.FillStyle | string | object} [params.leftfillstyle="rgba(128,100,255,1.0)"] left fillstyle
 * @param {geotoolkit.attributes.FillStyle | string | object} [params.rightfillstyle="rgba(128,100,255,1.0)"] right fillstyle
 * @param {geotoolkit.attributes.LineStyle | string | object} [params.linestyle] center line style
 * @param {geotoolkit.attributes.LineStyle | string | object} [params.rightlinestyle] right line style
 * @param {geotoolkit.attributes.LineStyle | string | object} [params.leftlinestyle] left line style
 * @param {geotoolkit.attributes.TextStyle | string | object} [params.lefttextstyle] left text style
 * @param {geotoolkit.attributes.TextStyle | string | object} [params.righttextstyle] right text style
 * @param {number} [params.spacing] spacing
 * @param {boolean} [params.autogradient] autogradient
 * @param {geotoolkit.controls.shapes.TornadoChart.SortMode|string} [params.sort=geotoolkit.controls.shapes.TornadoChart.SortMode.None] sort mode
 */
geotoolkit.controls.shapes.TornadoChart = {};
    /**
     * Sort Mode
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.TornadoChart.SortMode = {};
        /**
         * Max to Min
         * @type {string}
         */
        geotoolkit.controls.shapes.TornadoChart.SortMode.MaxToMin = "";
        /**
         * Min to Max
         * @type {string}
         */
        geotoolkit.controls.shapes.TornadoChart.SortMode.MinToMax = "";
        /**
         * None
         * @type {string}
         */
        geotoolkit.controls.shapes.TornadoChart.SortMode.None = "";
    /**
     /**
     * Text placement
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.TornadoChart.TextPlacement = {};
        /**
         * Inside
         * @type {number}
         */
        geotoolkit.controls.shapes.TornadoChart.TextPlacement.Inside = NaN;
        /**
         * Outside
         * @type {number}
         */
        geotoolkit.controls.shapes.TornadoChart.TextPlacement.Outside = NaN;
        /**
         * Center
         * @type {number}
         */
        geotoolkit.controls.shapes.TornadoChart.TextPlacement.Center = NaN;
    /**
     * This function is primarily used to set or change the left and right data of the tornado shape. The sort will work only if the left and right data is provided with it.
     * If you want to only sort the data after creating the shape, then use the setSort() function instead.
     *
     * @param {Object} data data object defining the data
     * @param {Array} [data.left] leftData
     * @param {Array} [data.right] rightData
     * @param {geotoolkit.controls.shapes.TornadoChart.SortMode|String} [data.sort] Determines if the data will be sorted or not.
     * @returns {geotoolkit.controls.shapes.TornadoChart}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setData = function(data){};
    /**
     * private
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.sortData = function(){};
    /**
     * gets the ticks and labels for the axis that will be attached via discrete value tick generator
     *
     * @returns {Object}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getTicksAndLabels = function(){};
    /**
     * set Auto Gradient
     *
     * @param {boolean} autogradient Autogradient on or off
     * @returns {geotoolkit.controls.shapes.TornadoChart}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setAutoGradient = function(autogradient){};
    /**
     * get Auto Gradient
     *
     * @returns {boolean} autogradient
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getAutoGradient = function(){};
    /**
     * set spacing between bars
     *
     * @param {number} spacing spacing between bars
     * @returns {geotoolkit.controls.shapes.TornadoChart}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setSpacing = function(spacing){};
    /**
     * get spacing percentage between bars
     *
     * @returns {number} spacing
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getSpacing = function(){};
    /**
     * sets if we are drawing the labels
     *
     * @param {boolean} draw drawing the labels or not
     * @returns {geotoolkit.controls.shapes.TornadoChart}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setDrawLabels = function(draw){};
    /**
     * gets if we are drawing the labels
     *
     * @returns {boolean} draw
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getDrawLabels = function(){};
    /**
     * sets the location of where the text will be rendered
     *
     * @param {geotoolkit.controls.shapes.TornadoChart.TextPlacement|number} position location or position of the text
     * @returns {geotoolkit.controls.shapes.TornadoChart}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setLabelPosition = function(position){};
    /**
     * gets the location of where the text will be rendered
     *
     * @returns {geotoolkit.controls.shapes.TornadoChart.TextPlacement|number}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getLabelPosition = function(){};
    /**
     * Get the internal data
     * <pre>
     * @returns {Array.<Object>} myObject
     * {number} [myObject.left] left Value
     * {number} [myObject.right] right Value
     * </pre>
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getData = function(){};
    /**
     * Render TornadoChart shape
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {geotoolkit.controls.shapes.TornadoChart}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.render = function(context){};
    /**
     * Sets right line style
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.shapes.TornadoChart} this
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setRightLineStyle = function(lineStyle, merge){};
    /**
     * Sets left line style
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.shapes.TornadoChart} this
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setLeftLineStyle = function(lineStyle, merge){};
    /**
     * Sets right fill style
     *
     * @param {geotoolkit.attributes.FillStyle | string | object} fillStyle a new fill style
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.shapes.TornadoChart}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setRightFillStyle = function(fillStyle, merge){};
    /**
     * Gets right line style
     * @returns {geotoolkit.attributes.LineStyle} lineStyle
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getRightLineStyle = function(){};
    /**
     * Gets left line style
     * @returns {geotoolkit.attributes.LineStyle} lineStyle
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getLeftLineStyle = function(){};
    /**
     * Gets right fill style
     * @returns {geotoolkit.attributes.FillStyle} fillStyle
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getRightFillStyle = function(){};
    /**
     * Gets left fill style
     * @returns {geotoolkit.attributes.FillStyle} fillStyle
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getLeftFillStyle = function(){};
    /**
     * Sets left fill style
     *
     * @param {geotoolkit.attributes.FillStyle | string | object} fillStyle a new fill style
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.shapes.TornadoChart}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setLeftFillStyle = function(fillStyle, merge){};
    /**
     * Sets left text style
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.shapes.TornadoChart}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setLeftTextStyle = function(textStyle, merge){};
    /**
     * Sets right text style
     *
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.shapes.TornadoChart}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setRightTextStyle = function(textStyle, merge){};
    /**
     * Gets model limits
     *
     * @returns {geotoolkit.util.Rect} the current model limits
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getModelLimits = function(){};
    /**
     * Gets sort mode
     *
     * @returns {geotoolkit.controls.shapes.TornadoChart.SortMode|string} sort mode
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getSort = function(){};
    /**
     * Sets sort mode
     * @param {geotoolkit.controls.shapes.TornadoChart.SortMode|string} sort sort mode
     * @returns {geotoolkit.controls.shapes.TornadoChart} this
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setSort = function(sort){};
    /**
     * Returns current bounds
     *
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getBounds = function(){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.controls.shapes.TornadoChart}
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setBounds = function(bounds){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {geotoolkit.util.Rect} [props.limits] modelLimits
     * @returns {geotoolkit.util.Rect} [props.bounds] array of geotoolkit.gauges.utils.Range
     * @returns {geotoolkit.attributes.TextStyle} [props.lefttextstyle] left text style
     * @returns {geotoolkit.attributes.FillStyle} [props.leftfillstyle] left fill style
     * @returns {geotoolkit.attributes.LineStyle} [props.leftlinestyle] left line style
     * @returns {geotoolkit.attributes.LineStyle} [props.linestyle] line style
     * @returns {geotoolkit.attributes.FillStyle} [props.righttextstyle] right text style
     * @returns {geotoolkit.attributes.FillStyle} [props.rightfillstyle] right fill style
     * @returns {geotoolkit.attributes.LineStyle} [props.rightlinestyle] right line style
     * @returns {Array} [props.data] data
     * @returns {boolean} [props.autogradient] autogradient flag
     * @returns {number} [props.spacing] spacing
     * @returns {Array} [props.left] left data
     * @returns {Array} [props.right] right data
     * @returns {geotoolkit.controls.shapes.TornadoChart.SortMode|string} [props.sort] sort mode
     *
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {geotoolkit.util.Rect} [properties.limits] modelLimits
     * @param {geotoolkit.util.Rect} [properties.bounds] bounds
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.lefttextstyle] left text style
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.leftfillstyle] left fill style
     * @param {geotoolkit.attributes.LineStyle | string | object} [properties.leftlinestyle] left lines style
     * @param {geotoolkit.attributes.LineStyle | string | object} [properties.linestyle] center line style
     * @param {geotoolkit.attributes.TextStyle | string | object} [properties.righttextstyle] right text style
     * @param {geotoolkit.attributes.LineStyle | string | object} [properties.rightlinestyle] right line style
     * @param {geotoolkit.attributes.FillStyle | string | object} [properties.rightfillstyle] right fill style
     * @param {object[]} [properties.data] data see {@link geotoolkit.controls.shapes.TornadoChart#setData}
     * @param {boolean} [properties.autogradient] autogradient
     * @param {number} [properties.spacing] spacing
     * @param {Array} [properties.left] left data
     * @param {Array} [properties.right] right data
     * @param {geotoolkit.controls.shapes.TornadoChart.SortMode|string} [properties.sort] sort mode
     * @returns {geotoolkit.controls.shapes.TornadoChart} this
     */
    geotoolkit.controls.shapes.TornadoChart.prototype.setProperties = function(properties){};

/**
 * A bar chart is a chart that uses either horizontal or vertical bars to show comparisons among categories. <br>
 * One axis of the chart shows the specific categories being compared, and the other axis represents a discrete value. <br>
 * Display Modes and Styles can be selected based on the Enum. <br>
 * geotoolkit.controls.shapes.BarChart is used internally by the {@link geotoolkit.widgets.BarChartWidget}
 * @class geotoolkit.controls.shapes.BarChart
 * @augments geotoolkit.scene.Group
 * @param {object} options (see "setOptions" method description for details)
 * @param {object} data (see "setData" method description for details)
 */
geotoolkit.controls.shapes.BarChart = {};
    /**
     * Enum for BarChart.BarMode
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.BarChart.BarMode = {};
        /**
         * Default
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.BarMode.Default = "";
        /**
         * Stacked
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.BarMode.Stacked = "";
        /**
         * Float
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.BarMode.Float = "";
    /**
     * Enum for BarChart.DataMode
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.BarChart.DataMode = {};
        /**
         * Raw
         * @deprecated since 2.6 Raw is not going to be used anymore
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.DataMode.Raw = "";
        /**
         * Associative
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.DataMode.Associative = "";
        /**
         * Single
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.DataMode.Single = "";
    /**
     * Enum for BarChart.BarValueLocation
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.BarChart.BarValueLocation = {};
        /**
         * TopOutside
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.BarValueLocation.TopOutside = "";
        /**
         * TopInside
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.BarValueLocation.TopInside = "";
        /**
         * BottomInside
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.BarValueLocation.BottomInside = "";
        /**
         * Center
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.BarValueLocation.Center = "";
    /**
     * Enum for BarChart.Orientation
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.BarChart.Orientation = {};
        /**
         * Bottom
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.Orientation.Bottom = "";
        /**
         * Left
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.Orientation.Left = "";
        /**
         * Top
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.Orientation.Top = "";
        /**
         * Right
         * @type {string}
         */
        geotoolkit.controls.shapes.BarChart.Orientation.Right = "";
    /**
     * Sets data to display
     *
     * @param {!object} data data object
     * @param {boolean} [data.append=false] append/replace flag
     * @param {geotoolkit.controls.shapes.BarChart.DataMode|string} [data.mode=geotoolkit.controls.shapes.BarChart.DataMode.Associative] Data mode for the barchart
     * @param {Array} data.datasets Array of Values for non-float and Array of Array(2) Values for float charts
     */
    geotoolkit.controls.shapes.BarChart.prototype.setData = function(data){};
    /**
     * Sets display options
     *
     * @param {!object} options options object
     *
     * @param {Array} [options.barstyles] array of barstyles (see example below)
     *
     * @param {object} [options.valuelimits] value limits parameters
     * @param {number|function} [options.valuelimits.minvalue] min value to set
     * @param {number|function} [options.valuelimits.maxvalue] max value to set
     * @param {boolean} [options.neatlimits] use neatlimits flag
     * @param {object} [options.barvalues] bar values parameters
     * @param {boolean} [options.barvalues.visible] bar values visibility flag
     * @param {geotoolkit.controls.shapes.BarChart.BarValueLocation|string} [options.barvalues.location=geotoolkit.controls.shapes.BarChart.BarValueLocation.TopOutside] bar values' label location
     * @param {number} [options.barvalues.decimalprecision=2] bar values decimal precision
     * @param {number} [options.barvalues.rotationangle=0] bar value labels rotation
     * @param {object} [options.barvalues.margins] margins options
     * @param {number} [options.barvalues.margins.anchorx=0] labels anchor x margin in pixels. This value will be added to anchor _before_ text rotation
     * @param {number} [options.barvalues.margins.anchory=0] labels anchor y margin in pixels. This value will be added to anchor _before_ text rotation
     * @param {geotoolkit.attributes.TextStyle | string | object} [options.barvalues.textstyle] bar value text style
     *
     * @param {geotoolkit.controls.shapes.BarChart.Orientation|string} [options.orientation=geotoolkit.controls.shapes.BarChart.Orientation.Bottom] orientation of the chart
     * @param {geotoolkit.controls.shapes.BarChart.BarMode|string} [options.barmode=geotoolkit.controls.shapes.BarChart.BarMode.Default] Bar display mode of the chart
     * @param {number} [options.barwidth=5] width of the bars
     * @param {number} [options.barpad=5] padding between the datasets
     * @param {boolean} [options.autogradient=false] enables auto gradient of the bars
     *
     * @param {function()} [options.ismissingvalue] missing value verification criteria; default is function(value){ return (value===null); }
     * @param {function()} [options.createselectedstyle] method to create selected style based on "regular" one
     *
     * @returns {geotoolkit.controls.shapes.BarChart} this
     *
     * @example
     * // How to use 'barstyles':
     *
     * // Example 1 - no specific negative styles, no selected styles (simplest case):
     * 'barstyles': [
     * // "Element1" styles:
     * {
     * 'linestyles': myElement1LineStyle,
     * 'fillstyles': myElement1FillStyle,
     * },
     * // "Element2" styles:
     * {...},
     * // so on:
     * ...
     * ],
     *
     * // Example 2 - positive and negative styles, no selected styles:
     * 'barstyles': [
     * // "Element1" styles:
     * {
     * 'linestyles': [myElement1PositiveLineStyle, myElement1NegativeLineStyle]
     * 'fillstyles': [myElement1PositiveFillStyle, myElement1NegativeFillStyle]
     * },
     * // "Element2" styles:
     * {...},
     * // so on:
     * ...
     * ],
     *
     * // Example 3 - non-selected ("regular") and selected styles:
     * 'barstyles': [
     * // "Element1" styles:
     * {
     * 'linestyles': myElement1NonSelectedLineStyle,
     * 'fillstyles': myElement1NonSelectedFillStyle,
     * 'selected-linestyles': myElement1SelectedLineStyle,
     * 'selected-fillstyles': myElement1SelectedFillStyle,
     * },
     * // "Element2" styles:
     * {...},
     * // so on:
     * ...
     * ],
     *
     */
    geotoolkit.controls.shapes.BarChart.prototype.setOptions = function(options){};
    /**
     * Calculates minimal neat limit based on input limits
     * (see {@link geotoolkit.util.Math.calculateNeatLimits} for more info)
     *
     * @param {number} minValue min value to create neat limits from
     * @param {number} maxValue max value to create neat limits from
     * @returns {number} minimal neat limit
     */
    geotoolkit.controls.shapes.BarChart.getNeatMinValue = function(minValue, maxValue){};
    /**
     * Calculates maximal neat limit based on input limits
     * (see {@link geotoolkit.util.Math.calculateNeatLimits} for more info)
     *
     * @param {number} minValue min value to create neat limits from
     * @param {number} maxValue max value to create neat limits from
     * @returns {number} maximal neat limit
     */
    geotoolkit.controls.shapes.BarChart.getNeatMaxValue = function(minValue, maxValue){};
    /**
     * Select elements at specified canvas coordinates
     *
     * @param {number | geotoolkit.util.Point} x x-ordinate OR {x,y}-coordinates
     * @param {number} [y] y-ordinate
     * @param {boolean} [highlight=false] highlight selected elements
     * @returns {Array} array of {@link geotoolkit.controls.data.SerieElementInfo} selected bars
     */
    geotoolkit.controls.shapes.BarChart.prototype.selectBarsAt = function(x, y, highlight){};
    /**
     * Highlight specified bars
     *
     * @param {!Array} bars array of {@link geotoolkit.controls.data.SerieElementInfo} bars bars to highlight
     * @param {boolean} [append=false] append or replace flag
     * @returns {geotoolkit.controls.shapes.BarChart} this
     */
    geotoolkit.controls.shapes.BarChart.prototype.highlightBars = function(bars, append){};
    /**
     * set format handler for labels
     * @param {function} handler format handler
     * @example
     * <caption> acceptable parameters for handler function </caption>
     * text {string}: current text that already fixed by value precision
     * groupId {number}: the index of current data series
     * itemId {number}: the index of the data in the current data series
     * value {number}: raw value in data series
     *
     * <caption>The example simply show how to control the text content by value </caption>
     * For data series [[1,2,3][2,3,4]], the following example return '3+' when value is more than 2
     * this.setFormatLabelHandler(
     * function (text, groupId, itemId, value) {
     * if(value > 2)
     * return '3+';
     * else return value;
     * });
     * @returns {geotoolkit.controls.shapes.BarChart} this
     */
    geotoolkit.controls.shapes.BarChart.prototype.setFormatLabelHandler = function(handler){};
    /**
     * Render to specified context
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.BarChart.prototype.renderContent = function(context){};

/**
 * Box plot is a convenient way of graphically depicting groups of numerical data
 * through their five-number summaries (the smallest observation, lower quartile (Q1), median (Q2), upper quartile (Q3), and largest observation).
 * One axis of the chart shows the specific categories being compared, and the other axis represents a discrete value. <br>
 * Display Modes and Styles can be selected based on the Enum. <br>
 * @class geotoolkit.controls.shapes.BoxPlot
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {object} options (see "setOptions" method description for details)
 * @param {object} data (see "setData" method description for details)
 */
geotoolkit.controls.shapes.BoxPlot = {};
    /**
     * Enum for BoxPlot.DataMode
     * @readonly
     * @enum
     */
    geotoolkit.controls.shapes.BoxPlot.DataMode = {};
        /**
         * Raw
         * @type {string}
         */
        geotoolkit.controls.shapes.BoxPlot.DataMode.Raw = "";
        /**
         * Associative
         * @type {string}
         */
        geotoolkit.controls.shapes.BoxPlot.DataMode.Associative = "";
    /**
     * Enum for Boxplot.Orientation
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.BoxPlot.Orientation = {};
        /**
         * Horizontal
         * @type {string}
         */
        geotoolkit.controls.shapes.BoxPlot.Orientation.Horizontal = "";
        /**
         * Vertical
         * @type {string}
         */
        geotoolkit.controls.shapes.BoxPlot.Orientation.Vertical = "";
    /**
     * Enum for Boxplot.BoxValueLocation
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.BoxPlot.BoxValueLocation = {};
        /**
         * on top of line
         * @type {string}
         */
        geotoolkit.controls.shapes.BoxPlot.BoxValueLocation.Top = "";
        /**
         * below the line
         * @type {string}
         */
        geotoolkit.controls.shapes.BoxPlot.BoxValueLocation.Below = "";
        /**
         * on left of the line
         * @type {string}
         */
        geotoolkit.controls.shapes.BoxPlot.BoxValueLocation.Left = "";
        /**
         * on right of the line
         * @type {string}
         */
        geotoolkit.controls.shapes.BoxPlot.BoxValueLocation.Right = "";
    /**
     * get the bounds of model
     * @returns {geotoolkit.util.Rect} current bounds
     */
    geotoolkit.controls.shapes.BoxPlot.prototype.getBounds = function(){};
    /**
     * Sets data to display
     *
     * @param {object} [data] data object
     * @param {geotoolkit.controls.shapes.BoxPlot.DataMode} [data.mode=geotoolkit.controls.shapes.BoxPlot.DataMode.Associative] Data mode for the BoxPlot
     * @param {Array.<object>} [data.datasets] Array of dataset, each item is an object containing property values and fillstyle
     * @param {Array| geotoolkit.data.DataSource} [data.datasets.values] collection of values to be rendered
     * @param {Array.<object>} [data.datasets.fillstyle] Array of fillstyle object for corresponding values.
     * @param {geotoolkit.attributes.FillStyle | string | object} [data.datasets.fillstyle.primaryfillstyle] fillstyle for the box area between third quartile and median
     * @param {geotoolkit.attributes.FillStyle | string | object} [data.datasets.fillstyle.secondaryfillstyle] fillstyle for the box area between first quartile and median
     * @returns {geotoolkit.controls.shapes.BoxPlot} this
     */
    geotoolkit.controls.shapes.BoxPlot.prototype.setData = function(data){};
    /**
     * Sets display options
     *
     * @param {object} [options] options object
     *
     * @param {object} [options.valuelimits] value limits parameters
     * @param {number} [options.valuelimits.minvalue] min value to set
     * @param {number} [options.valuelimits.maxvalue] max value to set
     * @param {boolean} [options.valuelimits.nearlimits] neat limits flag
     *
     * @param {object} [options.boxvalues] box values parameters
     * @param {boolean} [options.boxvalues.visible] box values visibility flag
     * @param {boolean} [options.boxvalues.suppress = false] enable label suppress when intersection
     * @param {geotoolkit.controls.shapes.BoxPlot.BoxValueLocation|string} [options.boxvalues.location=geotoolkit.controls.shapes.BoxPlot.BoxValueLocation.Top] box values' label location
     * @param {number} [options.boxvalues.verticalOffset=0] box values' vertical offset from original position
     * @param {number} [options.boxvalues.horizontaloffset=0] box values' horizontal offset from original position
     * @param {number} [options.boxvalues.decimalprecision=2] box values decimal precision
     * @param {geotoolkit.attributes.TextStyle | string | object} [options.boxvalues.textstyle] box value text style
     *
     * @param {geotoolkit.controls.shapes.BoxPlot.Orientation|string} [options.orientation=geotoolkit.controls.shapes.BoxPlot.Orientation.Vertical] orientation of the plot
     * @param {number} [options.boxwidth=1] width of the boxs
     * @param {number} [options.boxpad=2] padding between the box group (datasets)
     * @param {number} [options.whiskersWidth=1] width of whiskers (the line representing max and min value)
     * @param {string} [options.boxwidthunit] set unit for the width of box when using absolute width value
     * @param {number} [options.fixedboxwidth] set absolute value for the width of box
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.linestyle] linstyle of box plot
     * @param {Array.<number>} [options.connectedlinepattern=geotoolkit.attributes.LineStyle.Patterns.Dash] pattern of connected line
     * @param {boolean} [options.isoutliersvisible = false] enable display of outliers
     * @param {function()} [options.ismissingvalue] missing value verification criteria; default is function(value){ return (value===null); }
    
     * @returns {geotoolkit.controls.shapes.BoxPlot} this
     */
    geotoolkit.controls.shapes.BoxPlot.prototype.setOptions = function(options){};
    /**
     * get orientation of boxes
     * @returns {boolean}
     */
    geotoolkit.controls.shapes.BoxPlot.prototype.isHorizontal = function(){};
    /**
     * set model limits
     * @param {geotoolkit.util.Rect} limits current model limits
     * @returns {geotoolkit.controls.shapes.BoxPlot} this
     */
    geotoolkit.controls.shapes.BoxPlot.prototype.setModelLimits = function(limits){};
    /**
     * get model limits
     * @returns {geotoolkit.util.Rect} current model limits
     */
    geotoolkit.controls.shapes.BoxPlot.prototype.getModelLimits = function(){};
    /**
     * return processed data sets
     * @returns {Array.<object>} processed data sets
     */
    geotoolkit.controls.shapes.BoxPlot.prototype.getProcessedDatasets = function(){};
    /**
     * calculate model unit width of each component based on the absolute value of box width
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.controls.shapes.BoxPlot.prototype.calculateAbsWidth = function(context){};
    /**
     * Render to specified context
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.BoxPlot.prototype.render = function(context){};
    /**
     * @override
     */
    geotoolkit.controls.shapes.BoxPlot.prototype.dispose = function(){};

/**
 * A bubble chart is a variation of a scatter chart in which the data points are replaced with bubbles, <br>
 * and an additional dimension of the data is represented in the size of the bubbles. <br>
 * a bubble chart plots x values, y values, z (color) values and s (size) values. <br>
 * geotoolkit.controls.shapes.BubbleChart is used internally by the {@link geotoolkit.widgets.BubbleChart}.
 *
 * @class geotoolkit.controls.shapes.BubbleChart
 * @augments geotoolkit.scene.shapes.ScaledShape
 *
 * @param {Object} data
 * @param {Array} [data.datax=[]] Data series x
 * @param {number} [data.minx=null] The x minimum to use, can be used to clip the data
 * @param {number} [data.maxx=null] The x maximum to use, can be used to clip the data
 * @param {boolean} [data.autominmaxx=false] automatically adjust x limit to contain all symbols in x axis direction without clipping anyone
 * @param {boolean} [data.neatlimitx=true] enable calculation of neat limit for series x
 * @param {Array} [data.datay=[]] Data series y
 * @param {number} [data.miny=null] The y minimum to use, can be used to clip the data
 * @param {number} [data.maxy=null] The y maximum to use, can be used to clip the data
 * @param {boolean} [data.autominmaxy=false] automatically adjust y limit to contain all symbols in axis direction without clipping anyone
 * @param {boolean} [data.neatlimity=true] enable calculation of neat limit for series y
 * @param {Array} [data.datas=[]] Data series s
 * @param {number} [data.mins=null] The s minimum to use
 * @param {number} [data.maxs=null] The s maximum to use
 * @param {boolean} [data.autominmaxs=true] enable automatically calculate minimum and maximum of series s
 * @param {Array} [data.dataz=[]] Data series z
 * @param {number} [data.minz=null] The z minimum to use
 * @param {number} [data.maxz=null] The z maximum to use
 * @param {boolean} [data.autominmaxz=true] enable automatically calculate minimum and maximum of series z
 * @param {Array} [data.labels] text value of labels
 * @param {string} [data.lablelocation=BubbleChart.labelLocation.Center] The relative location of label to bubble
 * @param {string} [data.secondarylocation=null] The relative location of label to bubble when first location is unable to show the label completely
 * @param {geotoolkit.attributes.TextStyle | string | object} [data.labeltextstyle] the text style of labels
 * @param {number} [data.labelpadding=0] the padding between labels and bubble or view boundary
 * @param {boolean} [data.labelvisible=false] flag determine the visibility of labels
 * @param {number} [data.validlength=null] the min length of four data series
 * @param {number} [data.minsize=16] minimum size (side length of square) of symbol
 * @param {number} [data.maxsize=48] maximum size (side length of square) of symbol
 * @param {number} [data.sizebin] the number of bins for showing different degree of size, defaluat value is the number of items in data series
 * @param {number} [data.cachewidthlimit = 32766] the upper limit for the width of cache
 * @param {number} [data.cacheheightlimit = 32766] the upper limit for the height of cache
 * @param {geotoolkit.util.ColorProvider} [data.colorprovider=null] The colorProvider used to color points based on their Z value
 * @param {string} [data.defaultcolor=rgba(128,192,255,1)] deprecated (since 2.6) The color to be used if there is no ColorProvider provided or if a point has no valid Z value
 * @param {string|object|geotoolkit.attributes.FillStyle} [data.defaultfillstyle=rgba(128,192,255,1)] The fillstyle to be used if there is no ColorProvider provided or if a point has no valid Z value
 * @param {string|object|geotoolkit.attributes.LineStyle} [data.defaultfillstyle=rgba(128,192,255,1)] The linestyle to be used to render symbol
 * @param {Object} [data.symbol=geotoolkit.scene.shapes.painters.CirclePainter] The painter to draw symbols
 * @param {boolean} [data.selectable=true] determine if the shape is selectable
 */
geotoolkit.controls.shapes.BubbleChart = {};
    /**
     * Enum for Boxplot.BoxValueLocation
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.BubbleChart.LabelLocation = {};
        /**
         * on top of bubble
         * @type {string}
         */
        geotoolkit.controls.shapes.BubbleChart.LabelLocation.Top = "";
        /**
         * below the bubble
         * @type {string}
         */
        geotoolkit.controls.shapes.BubbleChart.LabelLocation.Bottom = "";
        /**
         * on center of the bubble
         * @type {string}
         */
        geotoolkit.controls.shapes.BubbleChart.LabelLocation.Center = "";
    /**
     * Get data
     * @returns {object} [data]
     * @param {boolean} ignoreFixedLimit if it is true, return real limit for each axis, otherwise return fixed limit
     * @param {boolean} ignoreAutoLimit ignore the auto limits
     * @returns {Array} [data.datax] Data series x
     * @returns {number} [data.minx] Return the fixed x minimum limit, the real x minimum model limit, or the minimum of x in dataset depend on ignoreFixedLimit and ignoreAutoLimit
     * @returns {number} [data.maxx] Return the fixed x maximum limit, the real x maximum model limit, or the maximum of x in dataset depend on ignoreFixedLimit and ignoreAutoLimit
     * @returns {boolean} [data.autominmaxx] automatically adjust x limit to contain all symbols in x axis direction without clipping anyone
     * @returns {boolean} [data.neatlimitx] enable calculation of neat limit for series x
     * @returns {Array} [data.datay] Data series y
     * @returns {number} [data.miny] Return the fixed y minimum limit, the real y minimum model limit, or the minimum of y in dataset depend on ignoreFixedLimit and ignoreAutoLimit
     * @returns {number} [data.maxy] Return the fixed y maximum limit, the real y maximum model limit, or the maximum of y in dataset depend on ignoreFixedLimit and ignoreAutoLimit
     * @returns {boolean} [data.autominmaxy] automatically adjust y limit to contain all symbols in x axis direction without clipping anyone
     * @returns {boolean} [data.neatlimity] enable calculation of neat limit for series y
     * @returns {Array} [data.datas] Data series s
     * @returns {number} [data.mins] Return the fixed s minimum limit, the real s minimum model limit, or the minimum of s in dataset depend on ignoreFixedLimit and ignoreAutoLimit
     * @returns {number} [data.maxs] Return the fixed s maximum limit, the real s maximum model limit, or the maximum of s in dataset depend on ignoreFixedLimit and ignoreAutoLimit
     * @returns {boolean} [data.autominmaxs] automatically calculate the min and max in s data series
     * @returns {Array} [data.dataz] Data series z
     * @returns {number} [data.minz] Return the fixed z minimum limit, the real z minimum model limit, or the minimum of z in dataset depend on ignoreFixedLimit and ignoreAutoLimit
     * @returns {number} [data.maxz] Return the fixed z maximum limit, the real z maximum model limit, or the maximum of z in dataset depend on ignoreFixedLimit and ignoreAutoLimit
     * @returns {boolean} [data.autominmaxs] automatically calculate the min and max in z data series
     * @returns {Array} [data.labels] Data series of label
     * @returns {string} [data.lablelocation=BubbleChart.labelLocation.Center] The relative location of label to bubble
     * @returns {string} [data.secondarylocation=null] The relative location of label to bubble when first location is unable to show the label completely
     * @returns {geotoolkit.attributes.TextStyle} [data.labeltextstyle] the text style of labels
     * @returns {number} [data.labelpadding=0] the padding between labels and bubble or view boundary
     * @returns {boolean} [data.laabelvisible=false] flag determine the visibility of labels
     * @returns {number} [data.validlength] the min length of four data series
     * @returns {number} [data.minsize] minimum size (side length of square) of symbol
     * @returns {number} [data.maxsize] maximum size (side length of square) of symbol
     * @returns {geotoolkit.util.ColorProvider} [data.colorprovider] The colorProvider used to color points based on their Z value
     * @returns {string} [data.defaultcolor] deprecated (since 2.6) The color to be used if there is no ColorProvider provided or if a point has no valid Z value
     * @returns {geotoolkit.attributes.FillStyle} [data.defaultfillstyle] The fillstyle to be used if there is no ColorProvider provided or if a point has no valid Z value
     * @returns {geotoolkit.attributes.LineStyle} [data.defaultlinestyle] The linestyle to be used to render symbol
     * @returns {Object} [data.symbol] The painter to draw symbols
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.getData = function(ignoreFixedLimit, ignoreAutoLimit){};
    /**
     * Add values to chart
     * @param {number} amount the amount of added values
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.addData = function(amount){};
    /**
     * remove data from chart
     * @param {number} from index where starting remove
     * @param {number} amount amount of data to be removed
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.removeData = function(from, amount){};
    /**
     * Set the real bounds (real size in pixel) for chart
     * @param {geotoolkit.util.Rect} parentbounds bounds of the chart in pixel
     * @returns {geotoolkit.controls.shapes.BubbleChart} this
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.setParentBounds = function(parentbounds){};
    /**
     * Get the real bounds of chart in pixel
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.getParentBounds = function(){};
    /**
     * Set the bounds of the chart in model unit
     * @param {geotoolkit.util.Rect} bounds bounds of the chart in model unit
     * @returns {boolean}
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.setBounds = function(bounds){};
    /**
     * Get the bounds of the chart in model unit
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.getBounds = function(){};
    /**
     *@inheritdoc
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.updateState = function(){};
    /**
     * Update the model bounds
     * @param {geotoolkit.util.Rect} parentbounds bounds of parent node
     * @param {number} start the starting index for incrementally calculating new model bounds
     * @param {number} end the ending index for incrementally calculating new model bounds
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.updateLimits = function(parentbounds, start, end){};
    /**
     * Initialize the cache for better rending performance
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.initializeCache = function(){};
    /**
     * Invalidate cache for rebuilding cache before rendering
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.invalidateCache = function(){};
    /**
     * Set the status of covering rectangle
     * @param {boolean} [active] enable rectangle for covering model space when doing selection
     * @deprecated since 2.6
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.setActive = function(active){};
    /**
     * Render to specified context
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.render = function(context){};
    /**
     * determine symbol color and size
     * @param {number} i index of data item
     * @param {geotoolkit.renderer.RenderingContext} localContext Rendering Context
     * @param {geotoolkit.util.Transformation} tr transformation
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.preDrawSymbols = function(i, localContext, tr){};
    /**
     * render labels
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.renderText = function(context){};
    /**
     * get selected symbols
     * @param {geotoolkit.util.Rect|geotoolkit.util.Polygon} area selected area
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {Array} array of selected symbol
     */
    geotoolkit.controls.shapes.BubbleChart.prototype.getIndicesAt = function(area, context){};

/**
 * Defines a 2D heatmap, A heat map is a graphical representation
 * of data where the individual values contained in a matrix are represented as colors
 * @class geotoolkit.controls.shapes.HeatMap
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {geotoolkit.data.DataTable|geotoolkit.data.DataTableView|Array.<Array.<number>>} data the data source
 * @param {object} options ( see {@link geotoolkit.controls.shapes.HeatMap.setOptions} method description for details)
 */
geotoolkit.controls.shapes.HeatMap = {};
    /**
     * Enum of Plotting types
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.HeatMap.PlotType = {};
        /**
         * Step plot mode (no interpolation)
         * @type {string}
         */
        geotoolkit.controls.shapes.HeatMap.PlotType.Step = "";
        /**
         * Linear interpolation between data point, first column(or row) and last column(or row)
         * are mapped to the bound of the image
         * @type {string}
         */
        geotoolkit.controls.shapes.HeatMap.PlotType.LinearInbound = "";
        /**
         * Linear interpolation between data point, and also calculate interpolation for the area where outside of
         * the first column(or row) and last column(or row) by interpolate between them.
         */
        geotoolkit.controls.shapes.HeatMap.PlotType.LinearLoop = {};
        /**
         * Linear interpolation between data point, and draw outside area of the
         * first column(or row) and last column(or row) by mirror the color of them.
         */
        geotoolkit.controls.shapes.HeatMap.PlotType.LinearMirror = {};
    /**
     * Get model limit
     * @returns {geotoolkit.util.Rect} model limit
     */
    geotoolkit.controls.shapes.HeatMap.prototype.getModelLimits = function(){};
    /**
     * Set model bounds
     * @param {geotoolkit.util.Rect} bounds model bounds
     * @returns {geotoolkit.controls.shapes.HeatMap}
     */
    geotoolkit.controls.shapes.HeatMap.prototype.setBounds = function(bounds){};
    /**
     * Get model bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.controls.shapes.HeatMap.prototype.getBounds = function(){};
    /**
     * Set options of heatmap
     * @param {object} options options
     * @param {geotoolkit.controls.shapes.HeatMap.PlotType} [options.colplottype=HeatMap.PlotType.Step] plot type of column
     * @param {geotoolkit.controls.shapes.HeatMap.PlotType} [options.rowplottype=HeatMap.PlotType.Step] plot type of row
     * @param {number} [options.min=Number.POSITIVE_INFINITY] minimum value limit in data source
     * @param {number} [options.max=Number.NEGATIVE_INFINITY] maximum value limit in data source
     * @param {number} [options.offsetx=0] offset of x axis
     * @param {number} [options.offsety=0] offset of y axis
     * @param {boolean} [options.keepmodellimits=true] flag to keep model limits
     * @param {geotoolkit.util.ColorProvider} [options.colorprovider] color provider for rendering heatmap
     * @returns {geotoolkit.controls.shapes.HeatMap} this
     */
    geotoolkit.controls.shapes.HeatMap.prototype.setOptions = function(options){};
    /**
     * Get options of heatmap
     * @returns {object} options
     * @returns {geotoolkit.controls.shapes.HeatMap.PlotType} [options.colplottype] plot type of column
     * @returns {geotoolkit.controls.shapes.HeatMap.PlotType} [options.rowplottype] plot type of row
     * @returns {number} [options.min] minimum value limit in data source
     * @returns {number} [options.max] maximum value limit in data source
     * @returns {number} [options.offsetx] offset of x axis
     * @returns {number} [options.offsety] offset of y axis
     * @returns {boolean} [options.keepmodellimits] flag to keep model limits
     * @returns {object} labels options for labels
     * @returns {boolean} [labels.visible] visibility of labels
     * @returns {geotoolkit.attributes.TextStyle} textstyle of labels
     * @returns {geotoolkit.util.ColorProvider} [options.colorprovider] color provider for rendering heatmap
     */
    geotoolkit.controls.shapes.HeatMap.prototype.getOptions = function(){};
    /**
     * set if keep model limit of shape when setting offset property
     * @param {boolean} iskeepmodellimits set if keep model limits when offsetting heatmap
     * @returns {geotoolkit.controls.shapes.HeatMap} this
     */
    geotoolkit.controls.shapes.HeatMap.prototype.setKeepModelLimits = function(iskeepmodellimits){};
    /**
     * get keep model limits property
     * @returns {boolean}
     */
    geotoolkit.controls.shapes.HeatMap.prototype.isKeepModelLimits = function(){};
    /**
     * set x and y offset seperately
     * @example
     * //the heatmap would shift toward higher x limit with 2 model x unit and toward lower y limit with 3 model y unit
     * heatmap.setModelOffset(2, -3)
     * @param {number|Array.<number>} offsetx offsets for each column
     * @param {number|Array.<number>} offsety offsets for each row
     * @returns {geotoolkit.controls.shapes.HeatMap} this
     */
    geotoolkit.controls.shapes.HeatMap.prototype.setModelOffset = function(offsetx, offsety){};
    /**
     * get offset x and y
     * @returns {object} offset
     * @returns {number|Array.<number>} [object.offsetx] offsetx
     * @returns {number|Array.<number>} [object.offsety] offsety
     */
    geotoolkit.controls.shapes.HeatMap.prototype.getModelOffset = function(){};
    /**
     * set min and max value limit
     * @param {number} min customized min value
     * @param {number} max customized max value
     * @returns {geotoolkit.controls.shapes.HeatMap} this
     */
    geotoolkit.controls.shapes.HeatMap.prototype.setMinMax = function(min, max){};
    /**
     * Set color provider
     * @param {geotoolkit.util.ColorProvider} colorProvider the color provider
     * @returns {geotoolkit.controls.shapes.HeatMap} this
     */
    geotoolkit.controls.shapes.HeatMap.prototype.setColorProvider = function(colorProvider){};
    /**
     * Gets color provider
     * @returns {null|geotoolkit.util.ColorProvider}
     */
    geotoolkit.controls.shapes.HeatMap.prototype.getColorProvider = function(){};
    /**
     * Set plot mode of column
     * @param {geotoolkit.controls.shapes.HeatMap.PlotType} type plot type
     * @returns {geotoolkit.controls.shapes.HeatMap} this
     */
    geotoolkit.controls.shapes.HeatMap.prototype.setColPlotMode = function(type){};
    /**
     * get plot mode of column
     * @returns {geotoolkit.controls.shapes.HeatMap.PlotType}
     */
    geotoolkit.controls.shapes.HeatMap.prototype.getColumnPlotMode = function(){};
    /**
     * Set plot mode of row
     * @param {geotoolkit.controls.shapes.HeatMap.PlotType} type plot type
     * @returns {geotoolkit.controls.shapes.HeatMap} this
     */
    geotoolkit.controls.shapes.HeatMap.prototype.setRowPlotMode = function(type){};
    /**
     * get plot mode of row
     * @returns {geotoolkit.controls.shapes.HeatMap.PlotType}
     */
    geotoolkit.controls.shapes.HeatMap.prototype.getRowPlotMode = function(){};
    /**
     * Set data source
     * @param {geotoolkit.data.DataTable|geotoolkit.data.DataTableView|Array.<Array.<number>>} data the data source
     * @returns {geotoolkit.controls.shapes.HeatMap}
     */
    geotoolkit.controls.shapes.HeatMap.prototype.setData = function(data){};
    /**
     * rendering method
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.controls.shapes.HeatMap.prototype.render = function(context){};
    /**
     * draw labels
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.controls.shapes.HeatMap.prototype.drawLabels = function(context){};
    /**
     * set the visibility of labels
     * @param {boolean} visible the flag to set the visibility of labels
     * @returns {geotoolkit.controls.shapes.HeatMap} this
     */
    geotoolkit.controls.shapes.HeatMap.prototype.setLabelsVisible = function(visible){};
    /**
     * return the visibility of labels
     * @returns {boolean} the visibility of labels
     */
    geotoolkit.controls.shapes.HeatMap.prototype.isLabelsVisible = function(){};
    /**
     * set textstyle for labels
     * @param {geotoolkit.attributes.TextStyle | string | object} textstyle textstyle for labels
     * @returns {geotoolkit.controls.shapes.HeatMap} this
     */
    geotoolkit.controls.shapes.HeatMap.prototype.setLabelsTextStyle = function(textstyle){};
    /**
     * return textstyle of labels
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.controls.shapes.HeatMap.prototype.getLabelsTextStyle = function(){};
    /**
     * hit test return point in model space
     * @param {geotoolkit.util.Point} pt point in device space
     * @returns {geotoolkit.util.Point|null} point in model space or null which means no point found
     */
    geotoolkit.controls.shapes.HeatMap.prototype.hitTest = function(pt){};
    /**
     * @override
     */
    geotoolkit.controls.shapes.HeatMap.prototype.dispose = function(){};

/**
 * This class defines the PieChart object. Pie Chart is the kind of diagram that displays data as a “pie”. Every data item in data source represents a “piece of pie” - slice.<br>
 * The doughnut and pie charts are generally equal but pie chart does not have a hole in the center so extra parameter - inner radius is always equal to '0'.
 * @class geotoolkit.controls.shapes.PieChart
 * @param {object} [options = null] options object
 *
 * @param {number} [options.outerradius=150] outer radius
 * @param {number} [options.innerradius=0] inner radius
 * @param {geotoolkit.controls.shapes.DonutChart.PieMode|string} [options.piemode=geotoolkit.controls.shapes.DonutChart.PieMode.Pie2D] 2d- or 3d-representation
 * @param {number} [options.startangle=0] starting angle of the first slice drawn, in degrees
 * @param {geotoolkit.controls.shapes.DonutChart.Direction|string} [options.direction=geotoolkit.controls.shapes.DonutChart.Direction.Clockwise] slices' rendering direction
 *
 * @param {Array} [options.fillstyles=[]] fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
 * @param {Array} [options.selected-fillstyles=[]] fill styles OR colors, in css or rgb (the color order follow "data.order" parameter in "setData" call)
 * @param {geotoolkit.attributes.LineStyle | string | object} [options.linestyle] slice line style
 * @param {boolean} [options.autogradient=false] autogradient flag
 * @param {function()} [options.createselectedstyle] method to create selected style based on "regular" one (used when "selected_fillstyles" not set explicitly)
 *
 * @param {number} [options.minpercentage=0] minimum percentage cutoff for a slice before it becomes part of "other". 0 for no limit
 * @param {number} [options.maxslices=0] maximum amount of slices the graph can have including an "other" slice. 0 for infinite
 *
 * @param {object} [options.label] labeling options object
 * @param {boolean} [options.label.hideifdontfit=false] hide an inside label if it doesn't fit
 * @param {function} [options.label.format] label formatting method in form "function myLabelFormat(annotation, value) {...}" returning {string} value
 * @param {geotoolkit.controls.shapes.DonutChart.LabelLocation|string} [options.label.location=geotoolkit.controls.shapes.DonutChart.LabelLocation.Inside] label location
 * @param {geotoolkit.attributes.TextStyle | string | object} [options.label.textstyle] label text style
 *
 * @param {object} [options.outsideline] outside line options object
 * @param {geotoolkit.attributes.LineStyle | string | object} [options.outsideline.linestyle] outside line style
 * @param {number} [options.outsideline.length=10] outside line length
 * @param {number} [options.outsideline.pad=2] outside line pad
 *
 * @param {object} [options.sliceshift] slice shift options object
 * @param {object} [options.sliceshift.offsets] slices shift offsets. Index in the array to match the index of slice
 * @param {number} [options.sliceshift.offset=40] deprecated (since 2.6) slice shift offset
 * @param {number|Array} [options.sliceshift.index=[]] deprecated (since 2.6) index (indices) of slices to shift
 *
 * @param {object} [data=null] data object
 * @param {geotoolkit.controls.shapes.DonutChart.DataMode|string} [data.mode=geotoolkit.controls.shapes.DonutChart.DataMode.Raw] data mode
 * @param {geotoolkit.controls.shapes.DonutChart.DataOrder|string} [data.order=geotoolkit.controls.shapes.DonutChart.DataOrder.Descending] data order
 * @param {Array} data.values Array of values
 *
 * @augments geotoolkit.controls.shapes.DonutChart
 */
geotoolkit.controls.shapes.PieChart = {};
    /**
     * Sets display options.
     * The implementation keeps 'innerradius' equal to '0' always.
     * @param {!object} options options object (see {@link geotoolkit.controls.shapes.DonutChart.setOptions} for more info)
     * @returns {geotoolkit.controls.shapes.PieChart} this
     */
    geotoolkit.controls.shapes.PieChart.prototype.setOptions = function(options){};

/**
 * Defines a radar(spider) chart. The data points in the dataset are drawn around the chart. The value of each point in the dataset is represented as the distance from the center of the chart. The center of the chart represents the minimum value and the chart edge represents the maximum value. Grid lines, which typically represents the Y axis, are displayed by default to represent values from the center of the chart to the perimeter.
 The X axis is plotted along the perimeter using the data category variables <br>
 *
 * @class geotoolkit.controls.shapes.RadarChart
 * @augments geotoolkit.scene.shapes.RectangularShape
 * @param {object} [options]
 * @param {geotoolkit.util.Point} options.center a center of the polar chart
 * @param {number} [options.outerradius=50] a radius of the polar chart
 * @param {geotoolkit.attributes.LineStyle | object} [options.linestyle] line style to specify style for outer circle
 * @param {number} [options.modelradius=90] radius of the polar chart in the model coordinates
 * @param {number} [options.startangle=0] a start angle to be used for 0 angle (by default it is E direction)
 *
 * @param {object} [options.gridlines] gridlines properties
 * @param {geotoolkit.attributes.LineStyle | object} [options.gridlines.linestyle] line style
 * @param {number} [options.gridlines.step = 10] step by radius in model coordinates
 * @param {boolean} [options.gridlines.visible = true] visibility of radius grid
 *
 * @param {object} [options.categories] define options of the categories
 * @param {geotoolkit.attributes.LineStyle | object} [options.categories.linestyle] line style
 * @param {geotoolkit.attributes.TextStyle | object} [options.categories.textstyle] labels style
 * @param {string[]} [options.categories.data] data that is the names of the categories to rate
 * @param {boolean} [options.categories.labelsalongcircumference = false] lables drawn along outer circumfrance
 *
 * @param {object[]} [options.content] content that defines the polygons in the chart
 * @param {geotoolkit.attributes.LineStyle | object} [options.content.linestyle] line style
 * @param {geotoolkit.attributes.FillStyle | object} [options.content.fillstyle] fill style
 * @param {string} [options.content.name] name of the item
 * @param {number[] | geotoolkit.data.NumericalDataSeries} [options.content.data] data to show on the chart
 *
 */
geotoolkit.controls.shapes.RadarChart = {};
    /**
     * Set options
     * @param {object} options options
     * @param {geotoolkit.util.Point} options.center a center of the polar chart
     * @param {number} [options.outerradius=50] a radius of the polar chart
     * @param {geotoolkit.attributes.LineStyle | object} [options.linestyle] line style to specify style for outer circle
     * @param {number} [options.modelradius=90] radius of the polar chart in the model coordinates
     * @param {number} [options.startangle=0] a start angle to be used for 0 angle (by default it is E direction)
     *
     * @param {object} [options.gridlines] gridlines properties
     * @param {geotoolkit.attributes.LineStyle | object} [options.gridlines.linestyle] line style
     * @param {number} [options.gridlines.step = 10] step by radius in model coordinates
     * @param {boolean} [options.gridlines.visible = true] visibility of radius grid
     *
     * @param {object} [options.categories] define options of the categories
     * @param {geotoolkit.attributes.LineStyle | object} [options.categories.linestyle] line style
     * @param {geotoolkit.attributes.TextStyle | object} [options.categories.textstyle] labels style
     * @param {string[]} [options.categories.data] data that is the names of the categories to rate
     * @param {boolean} [options.categories.labelsalongcircumference = true] lables drawn along outer circumfrance
     *
     * @param {object[]} [options.content] content that defines the polygons in the chart
     * @param {geotoolkit.attributes.LineStyle | object} [options.content.linestyle] line style
     * @param {geotoolkit.attributes.FillStyle | object} [options.content.fillstyle] fill style
     * @param {string} [options.content.name] name of the item
     * @param {number[] | geotoolkit.data.NumericalDataSeries} [options.content.data] data to show on the chart
     * @param {boolean} [refresh=true] invalidate the shape
     * @returns {geotoolkit.controls.shapes.RadarChart} this
     */
    geotoolkit.controls.shapes.RadarChart.prototype.setOptions = function(options, refresh){};
    /**
     * Return option to be used to draw a grid
     * @returns {object} options
     * @returns {geotoolkit.util.Point} options.center a center of the polar chart
     * @returns {number} [options.outerradius=50] a radius of the polar chart
     * @returns {geotoolkit.attributes.LineStyle | object} [options.linestyle] line style to specify style for outer circle
     * @returns {number} [options.modelradius=90] radius of the polar chart in the model coordinates
     * @returns {number} [options.startangle=0] a start angle to be used for 0 angle (by default it is E direction)
     *
     * @returns {object} [options.gridlines] gridlines properties
     * @returns {geotoolkit.attributes.LineStyle | object} [options.gridlines.linestyle] line style
     * @returns {number} [options.gridlines.step = 10] step by radius in model coordinates
     * @returns {boolean} [options.gridlines.visible = true] visibility of radius grid
     *
     * @returns {object} [options.categories] define options of the categories
     * @returns {geotoolkit.attributes.LineStyle | object} [options.categories.linestyle] line style
     * @returns {geotoolkit.attributes.TextStyle | object} [options.categories.textstyle] labels style
     * @returns {string[]} [options.categories.data] data that is the names of the categories to rate
     * @returns {boolean} [options.categories.labelsalongcircumference = true] lables drawn along outer circumfrance
     *
     * @returns {object[]} [options.content] content that defines the polygons in the chart
     * @returns {geotoolkit.attributes.LineStyle | object} [options.content.linestyle] line style
     * @returns {geotoolkit.attributes.FillStyle | object} [options.content.fillstyle] fill style
     * @returns {string} [options.content.name] name of the item
     * @returns {number[] | geotoolkit.data.NumericalDataSeries} [options.content.data] data to show on the chart
     * @returns {boolean} [refresh=true] invalidate the shape
     */
    geotoolkit.controls.shapes.RadarChart.prototype.getOptions = function(){};
    /**
     * Convert model radius to outer radius
     * @param {number} value value of the outer raidus
     * @returns {number}
     */
    geotoolkit.controls.shapes.RadarChart.prototype.modelToOuterRadius = function(value){};
    /**
     * set the content for this shape
     * @param {object[]} [content] content that defines the polygons in the chart
     * @param {geotoolkit.attributes.LineStyle | object} [content.linestyle] line style
     * @param {geotoolkit.attributes.FillStyle | object} [content.fillstyle] fill style
     * @param {string} [content.name] name of the item
     * @param {number[] | geotoolkit.data.NumericalDataSeries} [content.data] data to show on the chart
     * @returns {geotoolkit.controls.shapes.RadarChart} this
     */
    geotoolkit.controls.shapes.RadarChart.prototype.setContent = function(content){};
    /**
     * get the content for this shape
     * @returns {object[]} current content
     */
    geotoolkit.controls.shapes.RadarChart.prototype.getContent = function(){};
    /**
     * Render contents of the crossplot shape
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.RadarChart.prototype.render = function(context){};
    /**
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.RadarChart.prototype.renderContent = function(context){};
    /**
     * Render angle axis
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.RadarChart.prototype.drawLabels = function(context){};
    /**
     * Render angle text horizontally
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.RadarChart.prototype.drawAngleAxisRegular = function(context){};
    /**
     * Render angle text along circumference
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.RadarChart.prototype.drawAngleAxisAlongCircumference = function(context){};
    /**
     * Convert point from polar to cartesian coordinate system. the center is int e
     * @param {number} r radius
     * @param {number} theta angle in grad
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.shapes.RadarChart.prototype.polarToCartesian = function(r, theta){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * {geotoolkit.util.Rect} [props.bounds] shape bounds
     */
    geotoolkit.controls.shapes.RadarChart.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {object} [properties.options] options to set see {@link geotoolkit.controls.shapes.RadarChart#setOptions}
     * @returns {geotoolkit.controls.shapes.RadarChart} this
     */
    geotoolkit.controls.shapes.RadarChart.prototype.setProperties = function(properties){};

/**
 * <pre>
 * Treemap allows visualization of hierarchical data using nested rectangles.
 * Each branch of the tree is displayed as rectangle. Area of rectangle is proportional to specified dimension of data.
 * e.g. Array of datasets object provided to Treemap <b> must contain 'value' property </b>. It can be initialized following ways:
 * 1. datasets object containing value only:
 * var data = [{'value' : 6}, {'value': 4}, {'value': 1}, {'value': 3}];
 * 2. datasets object can also have optional properties 'name': name of the node, 'color': color of the node, 'level': children of the node(datasets object)
 * var data =
 * [
 * {'value': 6, 'name': 'A', 'level': [
 * {'value': 6, 'color': 'orange', 'name': 'A1'},
 * {'value': 6, 'color': 'orange', 'name': 'A2'},
 * {'value': 4, 'color': 'orange', 'name': 'A3'},
 * {'value': 3, 'color': 'orange', 'name': 'A4'}
 * ]},
 * {'value': 5, 'color': 'red', 'name': 'B'},
 * {'value': 7, 'color': 'yellow', 'name': 'C'},
 * {'value': 3, 'color': 'green', 'name': 'D'}
 * ];
 * </pre>
 * @class geotoolkit.controls.shapes.Treemap
 * @augments geotoolkit.scene.shapes.RectangularShape
 * @param {object} options (see "setOptions" method description for details)
 * @param {object} data (see "setData" method description for details)
 */
geotoolkit.controls.shapes.Treemap = {};
    /**
     * Enum for Treemap.LayoutMode
     * @readonly
     * @enum
     */
    geotoolkit.controls.shapes.Treemap.LayoutMode = {};
        /**
         * Squarify
         * @type {string}
         */
        geotoolkit.controls.shapes.Treemap.LayoutMode.Squarify = "";
        /**
         * HorizontalSliceAndDice
         * @type {string}
         */
        geotoolkit.controls.shapes.Treemap.LayoutMode.HorizontalSliceAndDice = "";
        /**
         * VerticalSliceAndDice
         * @type {string}
         */
        geotoolkit.controls.shapes.Treemap.LayoutMode.VerticalSliceAndDice = "";
        /**
         * AlternateSliceAndDice
         * @type {string}
         */
        geotoolkit.controls.shapes.Treemap.LayoutMode.AlternateSliceAndDice = "";
    /**
     * Enum for Treemap.NodeValueLocation
     * @readonly
     * @enum
     */
    geotoolkit.controls.shapes.Treemap.NodeValueLocation = {};
        /**
         * on top of line
         * @type {string}
         */
        geotoolkit.controls.shapes.Treemap.NodeValueLocation.Top = "";
        /**
         * below the line
         * @type {string}
         */
        geotoolkit.controls.shapes.Treemap.NodeValueLocation.Below = "";
        /**
         * on left of the line
         * @type {string}
         */
        geotoolkit.controls.shapes.Treemap.NodeValueLocation.Left = "";
        /**
         * on right of the line
         * @type {string}
         */
        geotoolkit.controls.shapes.Treemap.NodeValueLocation.Right = "";
    /**
     * Treemap Event's enumerator
     * @readonly
     * @enum
     */
    geotoolkit.controls.shapes.Treemap.Events = {};
        /**
         * Event type fired after Data Changed
         * @type {string}
         */
        geotoolkit.controls.shapes.Treemap.Events.DataChanged = "";
    /**
     * Set Layout mode of Treemap
     * @param {geotoolkit.controls.shapes.Treemap.LayoutMode} mode LayoutMode fore the Treemap
     * @returns {geotoolkit.controls.shapes.Treemap} this
     */
    geotoolkit.controls.shapes.Treemap.prototype.setLayoutMode = function(mode){};
    /**
     * Returns LayoutMode selection
     * @returns {geotoolkit.controls.shapes.Treemap.LayoutMode|number} Layout mode selection
     */
    geotoolkit.controls.shapes.Treemap.prototype.getLayoutMode = function(){};
    /**
     * Sets data to display
     * @param {object} [data] data object
     * @param {Array.<object>} [data.datasets] Array of dataset
     * @param {geotoolkit.controls.shapes.Treemap.LayoutMode} [data.mode = geotoolkit.controls.shapes.Treemap.LayoutMode.Squarify] LayoutMode fore the Treemap
     */
    geotoolkit.controls.shapes.Treemap.prototype.setData = function(data){};
    /**
     * Get data on treemap
     * @returns {object} [data]
     * @returns {geotoolkit.controls.shapes.Treemap.LayoutMode} [data.mode] Returns layout mode of Treemap
     * @returns {Array.<object>} [data.datasets] Returns an array of dataset
     */
    geotoolkit.controls.shapes.Treemap.prototype.getData = function(){};
    /**
     * Update Dataset
     * @param {Array.<object>} [datasets] Array of dataset
     */
    geotoolkit.controls.shapes.Treemap.prototype.updateDataSets = function(datasets){};
    /**
     * set display options
     * @param {object} [options] options object
     * @param {object} [options.nodevalues] node values parameters
     * @param {boolean} [options.nodevalues.visible] node values visibility flags
     * @param {geotoolkit.controls.shapes.Treemap.NodeValueLocation} [options.nodevalues.location = geotoolkit.controls.shapes.Treemap.NodeValueLocation.Top] node values' label location
     * @param {geotoolkit.attributes.TextStyle | string | object} [options.nodevalues.textstyle] node values' label text style
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.linestyle] Treemap node linestyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.fillstyle] Treemap node fillstyle
     * @returns {geotoolkit.controls.shapes.Treemap}
     */
    geotoolkit.controls.shapes.Treemap.prototype.setOptions = function(options){};
    /**
     * Returns options pertaining nodevalues.
     * @returns {object} options see {@link geotoolkit.controls.shapes.Treemap#setOptions}
     */
    geotoolkit.controls.shapes.Treemap.prototype.getOptions = function(){};
    /**
     * Render to specified context
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.Treemap.prototype.render = function(context){};
    /**
     * It will return array of id specified by name.
     * @param {string} name name of node
     * @returns {Array} array of ids
     */
    geotoolkit.controls.shapes.Treemap.prototype.lookUpForIdByName = function(name){};
    /**
     * Returns Array of Rectangles in which the pointer is including it's ancestors.
     * @param {geotoolkit.util.Point} pt pt is the device coordinates received by mouse event
     * @returns {Array.<geotoolkit.util.Rect>} Rect Array of Rect
     */
    geotoolkit.controls.shapes.Treemap.prototype.hitTest = function(pt){};
    /**
     * Display parent level or children level of id. If goToParent is set to true it will display it's parent level.
     * @param {number} id id of node
     * @param {boolean} [goToParent] Whether to display parent or children level
     */
    geotoolkit.controls.shapes.Treemap.prototype.showLevel = function(id, goToParent){};
    /**
     * It will display the Parent level at specific distance
     * @example retrieveParentLayer(0) will stay to it's current level, retrieveParentLayer(1) will go to it's parent, retrieveParentLayer(2) will go to it's parent's parent and so on
     * @param {number} distance distance From Current Level
     */
    geotoolkit.controls.shapes.Treemap.prototype.showParentLevelAtDistance = function(distance){};

/**
 * Define a callout shape
 * @class geotoolkit.controls.shapes.Callout
 * @augments geotoolkit.scene.shapes.AnchoredShape
 * @param {geotoolkit.util.Point} target target point
 * @param {geotoolkit.util.Point|number} anchor anchor point
 * @param {geotoolkit.util.Rect} frame callout frame
 * @param {number} alignment alignment
 * @param {boolean} sizeIsInDeviceSpace is size is in device frame
 * @param {string} text callout text
 * @param {geotoolkit.attributes.TextStyle | string | object} textStyle callout text style
 */
geotoolkit.controls.shapes.Callout = {};
    /**
     * Check if inside context
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context context
     * @returns {boolean} true if object is inside of renderable area
     */
    geotoolkit.controls.shapes.Callout.prototype.checkCollision = function(context){};
    /**
     * Sets target point to specified coordinates.
     * @param {number} x x-ordinate
     * @param {number} y y-ordinate
     * @returns {geotoolkit.controls.shapes.Callout} this
     */
    geotoolkit.controls.shapes.Callout.prototype.setTarget = function(x, y){};
    /**
     * Gets style attribute for the text.
     * @returns {geotoolkit.attributes.TextStyle}
     */
    geotoolkit.controls.shapes.Callout.prototype.getTextStyle = function(){};
    /**
     * Sets text's style
     * @param {geotoolkit.attributes.TextStyle | string | object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.shapes.Callout} this
     */
    geotoolkit.controls.shapes.Callout.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * Sets text
     * @param {string} text text
     * @returns {geotoolkit.controls.shapes.Callout} this
     */
    geotoolkit.controls.shapes.Callout.prototype.setText = function(text){};
    /**
     * Gets text
     * @returns {string}
     */
    geotoolkit.controls.shapes.Callout.prototype.getText = function(){};
    /**
     * Set border radius to specified coordinates.
     * @param {number} rx x-axis border radius
     * @param {number} ry y-axis border radius
     * @returns {geotoolkit.controls.shapes.Callout} this
     */
    geotoolkit.controls.shapes.Callout.prototype.setBorderRadius = function(rx, ry){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context context
     */
    geotoolkit.controls.shapes.Callout.prototype.render = function(context){};

/**
 * Pyramid Chart reflects an hierarchical way of representing the data.
 * It divides the whole triangle into number of sections.
 * Size of each section is a percentage of data contributing with respect to the whole height.<br>
 * It takes arrays of Label names and its values.<br>
 * It provides options for fillstyle , Alignment , Invert.<br>
 *
 * @class geotoolkit.controls.shapes.PyramidChart
 * @augments geotoolkit.scene.CompositeNode
 *
 * @param {Object} data
 * @param {Array<String>} [data.name = []] Array of label names.
 * @param {Array<number>} [data.value= []] Array of values corresponding to the label names.
 * @param {geotoolkit.util.Rect} [data.bounds = geotoolkit.util.Rect(100,100,400,400)] Bounds to draw pyramid, can specify if necessary.
 * @param {Array<geotoolkit.attributes.FillStyle>} [data.fillstyle = []] Array of fill styles objects for each section.
 * @param {boolean} [data.invert = false] Creates a regular pyramid, when set true inverts the shape.
 * @param {string} [data.align = "right"] This is the preference to have labels at "right" or "left" for every section
 * @param {Array<geotoolkit.attributes.LineStyle>} [data.linestyle = geotoolkit.attributes.LineStyle("black")] to change the color of lines pointing to the label for all sections.
 * @param {Array<geotoolkit.attributes.LineStyle>} [data.border = geotoolkit.attributes.LineStyle("white")] to change the border color for each section section.
 * @param {number} [data.linelength = 20] To specify length of the line pointing the labels.
 * @param {boolean} [data.highlight = true] highlights each section of the chart, when set false it does not show any highlight feature.
 * @param {geotoolkit.util.RgbaColor|string} [data.highlightstyle = new geotoolkit.util.RgbaColor(255, 255, 255)] to change fillstyle of the highlighting shape, should be Rgba color object
 */
geotoolkit.controls.shapes.PyramidChart = {};
    /**
     * setData takes all the input and feeds it to the chart drawn
     * @param {Object} data data
     * @returns {geotoolkit.controls.shapes.PyramidChart}
     */
    geotoolkit.controls.shapes.PyramidChart.prototype.setData = function(data){};
    /**
     * sets all properties related to the chart
     * @param {object} properties properties
     * @param {Array<geotoolkit.attributes.FillStyle>} [properties.fillstyle] Array of fill styles objects for each section.
     * @param {Array<geotoolkit.attributes.LineStyle>} [properties.linestyle] to change the color of lines pointing to the label for all sections.
     * @param {Array<geotoolkit.attributes.LineStyle>} [properties.border] to change the border color for each section section.
     * @param {string} [properties.align] This is the preference to have labels at "right" or "left" for every section
     * @param {boolean} [properties.invert] Creates a regular pyramid, when set true inverts the shape.
     * @param {number} [properties.linelength] To specify length of the line pointing the labels.
     * @param {boolean} [properties.highlight] highlights each section of the chart, when set false it does not show any highlight feature.
     * @param {geotoolkit.util.RgbaColor|string} [properties.highlightstyle] to change fillstyle of the highlighting shape, should be Rgba color object
     * @returns {geotoolkit.controls.shapes.PyramidChart}
     */
    geotoolkit.controls.shapes.PyramidChart.prototype.setProperties = function(properties){};
    /**
     * gets any property of the chart
     * @returns {object}
     */
    geotoolkit.controls.shapes.PyramidChart.prototype.getProperties = function(){};
    /**
     * Get data
     * @returns {object} [data]
     * @returns {Array<string>} [data.name] Returns an array of label names.
     * @returns {Array<number>} [data.value] Returns an array of values corresponding to the label names.
     * @returns {geotoolkit.util.Rect} [data.bounds] Returns the rect boundaries in which the pyramid is drawn.
     * @returns {Array<geotoolkit.attributes.FillStyle>} [data.fillstyle] Returns an array of fill styles objects set.
     * @returns {boolean} [data.invert] Returns bool value to invert or not.
     * @returns {String} [data.align] Returns preferred alignment.
     * @returns {Array<geotoolkit.attributes.LineStyle>} [data.linestyle] Returns line Styles objects if set.
     * @returns {Array<geotoolkit.attributes.LineStyle>} [data.linestyle] Returns line styles specifie for each section.
     * @returns {number} [data.linelength] Returns line length pointing the labels.
     * @returns {boolean} [data.highlight] Returns if highlight is enabled or not.
     * @returns {geotoolkit.util.RgbaColor} [data.highlightstyle] returns color of the highlighting
     */
    geotoolkit.controls.shapes.PyramidChart.prototype.getData = function(){};
    /**
     * Gets model limits, the limits of this groups inside space
     * @override
     * @returns {geotoolkit.util.Rect | null} the current model limits
     */
    geotoolkit.controls.shapes.PyramidChart.prototype.getModelLimits = function(){};
    /**
     * Sets inner model limits
     *
     * @param {geotoolkit.util.Rect} limits
     * inner limits
     * @returns {geotoolkit.controls.shapes.PyramidChart}
     */
    geotoolkit.controls.shapes.PyramidChart.prototype.setModelLimits = function(limits){};
    /**
     * Returns the name and value represented by the section which is
     * referenced by the index provided.
     * @param {number} index The index of the section
     * @returns {object | null} info Name and value or null if no such section
     * @returns {string} [info.name] Name of the section
     * @returns {number} [info.value] Value represented by the section
     */
    geotoolkit.controls.shapes.PyramidChart.prototype.getSectionInfo = function(index){};
    /**
     * Highlights the shape specified by the index and with the choice you can set it false too.
     * @param {number} index of the section to be highlighted
     * @returns {geotoolkit.controls.shapes.PyramidChart}
     */
    geotoolkit.controls.shapes.PyramidChart.prototype.highlight = function(index){};
    /**
     * Performs selection of the node with its device coordinates
     * @param {geotoolkit.util.Point} pt is the device coordinates received by mouse event
     * @param {number} radius [radius =5] is the radius of selection
     * @returns {number}index of the node being selected else returns -1
     */
    geotoolkit.controls.shapes.PyramidChart.prototype.hitTest = function(pt, radius){};

/**
 * This class defines a legend container in which legends items are laid out using specified layout.
 * Items can be located in the legend vertically using geotoolkit.layout.VerticalPriorityLayout() or
 * horizontally using geotoolkit.layout.HorizontalPriorityLayout() or in any location inside the legend with other layout or manually.
 * The legend has an anchor position in the parent coordinates and width and height of the legend in model
 * or device coordinates. This position can be specified with setAnchor method and size with setSize method. In addition
 * it is possible to use automatic calculation of the legend size, which is supported for device size legend only.
 * Legends can be customized using setOptions().
 *
 * @class geotoolkit.controls.shapes.Legend
 * @augments geotoolkit.scene.shapes.AnchoredShape
 *
 * @example Example of creating a legend with automatic size calculation in the device coordinates
 * var dataCollection = new geotoolkit.util.Collection();
 * dataCollection.add(new geotoolkit.controls.shapes.SymbolLegendItem(null, {
 * 'text': 'Item',
 * 'textstyle': 'linestyle': new geotoolkit.attributes.TextStyle({'color': 'red'}),
 * 'symbol': {
 * 'painter': geotoolkit.scene.shapes.painters.HorizontalLinePainter,
 * 'width': 10,
 * 'height': 10,
 * 'linestyle': new geotoolkit.attributes.LineStyle({'color': 'red' }),
 * 'fillstyle': null
 * }
 * }));
 * var legendShape = new geotoolkit.controls.shapes.Legend({
 * 'data': dataCollection,
 * 'linestyle': new geotoolkit.attributes.LineStyle({'color': 'red'}),
 * 'fillstyle': null,
 * 'sizeisindevicespace': true,
 * 'alignment': geotoolkit.util.AnchorType.Center,
 * 'autosize': true
 *});
 * legendShape.setAnchor(new geotoolkit.util.Point(0.5, 0.5));
 * legendShape.setLayout(new geotoolkit.layout.VerticalPriorityLayout());
 *
 * @example Example of creating a legend with manual size in model coordinates
 * var legendShape = new geotoolkit.controls.shapes.Legend({
 * 'data': dataCollection,
 * 'linestyle': new geotoolkit.attributes.LineStyle({'color': 'red'}),
 * 'fillstyle': null,
 * 'sizeisindevicespace': false,
 * 'alignment': geotoolkit.util.AnchorType.Center
 *});
 * legendShape.setAnchor(new geotoolkit.util.Point(0.5, 0.5));
 * legendShape.setSize(0.5, 0.5);
 * legendShape.setLayout(new geotoolkit.layout.VerticalPriorityLayout());
 *
 * @param {Object} options (see {@link geotoolkit.controls.shapes.Legend.setOptions} for more info)
 */
geotoolkit.controls.shapes.Legend = {};
    /**
     * Sets padding style
     * @param {geotoolkit.attributes.SpaceStyle|object} paddingStyle padding style
     * @returns {geotoolkit.controls.shapes.Legend}
     */
    geotoolkit.controls.shapes.Legend.prototype.setPaddingStyle = function(paddingStyle){};
    /**
     * Return padding style
     * @returns {geotoolkit.attributes.SpaceStyle} padding
     */
    geotoolkit.controls.shapes.Legend.prototype.getPaddingStyle = function(){};
    /**
     * Sets visualization options
     * @param {Object} options options
     * @param {geotoolkit.util.Collection|Array} [options.data] collection containing an array or an array itself of
     * {@link geotoolkit.controls.shapes.LegendItem} and/or {@link geotoolkit.controls.shapes.ShapeLegendAdapter} elements
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.linestyle=null] whole legend line style
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.fillstyle=null] whole legend fill style
     * @param {boolean} [options.sizeisindevicespace=false] is width and height of the legend in device space
     * @param {boolean} [options.preserveaspectratio=true] preserve aspect ratio of the legend
     * @param {boolean} [options.ispointingup=false] pointing up
     * @param {boolean} [options.preservereadingorientation=false] preserve reading orientation for local transform
     * @param {geotoolkit.util.AnchorType} [options.alignment=geotoolkit.util.AnchorType.None] alignment according of the anchor point
     * @param {geotoolkit.util.Dimension} [options.mindimension=null] minimum size for rendering
     * @param {geotoolkit.util.Dimension} [options.maxdimension=null] maximum size for rendering
     * @param {number} [options.width=0] legend width (it is ignored if autosize is true)
     * @param {number} [options.height=0] legend height (it is ignored if autosize is true)
     * @param {boolean} [options.autosize=false] auto size to calculate device size of the legend. it doesn't work if legend in the model space.
     * @param {object|geotoolkit.attributes.SpaceStyle} [options.padding] It has properties for specifying the padding for each side of an legend
     * @param {number} [options.padding.top=0] top padding in pixels
     * @param {number} [options.padding.bottom=0] top padding in pixels
     * @param {number} [options.padding.right=0] right padding in pixels
     * @param {number} [options.padding.left=0] left padding in pixels
     * @returns {geotoolkit.controls.shapes.Legend} this
     */
    geotoolkit.controls.shapes.Legend.prototype.setOptions = function(options){};
    /**
     * Return the collection of SymbolLegendItem {@link geotoolkit.controls.shapes.SymbolLegendItem} to be displayed
     * @returns {geotoolkit.util.Collection} a collection of items to be displayed
     */
    geotoolkit.controls.shapes.Legend.prototype.getData = function(){};
    /**
     * Rebuild a legend
     * @deprecated since 2.6
     */
    geotoolkit.controls.shapes.Legend.prototype.rebuild = function(){};
    /**
     * Sets bounds of the node in the parent coordinates. This method
     * takes anchor position and width and height if size is not in device space
     *
     * @param {geotoolkit.util.Rect | object} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.controls.shapes.Legend} this
     */
    geotoolkit.controls.shapes.Legend.prototype.setBounds = function(bounds){};
    /**
     * dispose
     */
    geotoolkit.controls.shapes.Legend.prototype.dispose = function(){};
    /**
     * Render
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.Legend.prototype.render = function(context){};
    /**
     * render to specified context
     * @deprecated since 2.6
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.controls.shapes.Legend.prototype.renderContent = function(context){};
    /**
     * Return device area occupied by legend shape
     * @param {geotoolkit.util.Transformation} legendToDevice transformation of the unit rectangle [0,0,1,1] to device
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.controls.shapes.Legend.prototype.getLegendDeviceSize = function(legendToDevice){};
    /**
     * @param {function(node, target)} callback callback
     * @param {object} target target
     */
    geotoolkit.controls.shapes.Legend.prototype.enumerateNodes = function(callback, target){};
    /**
     * Add a child node
     *
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node> | geotoolkit.util.Iterator} node the child node to be added
     * @returns {geotoolkit.controls.shapes.Legend} this
     * @protected
     */
    geotoolkit.controls.shapes.Legend.prototype.addChild = function(node){};
    /**
     * Return iterator by child nodes
     *
     * @param {function()} [filter] a filter function. Returns all nodes if null
     * @returns {geotoolkit.util.Iterator}
     * @protected
     */
    geotoolkit.controls.shapes.Legend.prototype.getChildren = function(filter){};
    /**
     * Remove child node
     *
     * @param {geotoolkit.scene.Node | Array<geotoolkit.scene.Node>} node node or array of nodes to be removed
     * @returns {geotoolkit.controls.shapes.Legend} this
     * @protected
     */
    geotoolkit.controls.shapes.Legend.prototype.removeChild = function(node){};
    /**
     * Remove all child nodes from this composite group
     * @param {boolean} [disposeChildren=false] automatically dispose children. If it is
     * true then method dispose is called for each child.
     * @returns {geotoolkit.controls.shapes.Legend} this
     * @protected
     */
    geotoolkit.controls.shapes.Legend.prototype.clearChildren = function(disposeChildren){};
    /**
     * Sets inner model limits for legends' items
     *
     * @param {geotoolkit.util.Rect} limits
     * inner limits
     * @returns {geotoolkit.controls.shapes.Legend} this
     */
    geotoolkit.controls.shapes.Legend.prototype.setModelLimits = function(limits){};
    /**
     * Returns if clipping is enabled or not for this node.
     *
     * @returns {boolean}
     */
    geotoolkit.controls.shapes.Legend.prototype.isClippingEnabled = function(){};
    /**
     * Enables or disables clipping of this node. If enabled,
     * shapes will not be rendered outside of its bounds.
     *
     * @param {boolean} doClip enable clipping on this node
     * @returns {geotoolkit.controls.shapes.Legend} this
     */
    geotoolkit.controls.shapes.Legend.prototype.enableClipping = function(doClip){};
    /**
     * Gets model limits, the limits of this groups inside space
     *
     * @returns {geotoolkit.util.Rect | null} the current model limits
     */
    geotoolkit.controls.shapes.Legend.prototype.getModelLimits = function(){};
    /**
     * Associate layout with a group.
     * @param {geotoolkit.layout.Layout} layout layout to be set
     * @returns {geotoolkit.controls.shapes.Legend} this
     */
    geotoolkit.controls.shapes.Legend.prototype.setLayout = function(layout){};
    /**
     * Returns layout associated with the group
     * @returns {geotoolkit.layout.Layout} layout
     */
    geotoolkit.controls.shapes.Legend.prototype.getLayout = function(){};
    /**
     * Updates layout(s)
     * @param {Array<geotoolkit.scene.Node>} [targets] optional parameter about which element to layout
     * @returns {geotoolkit.controls.shapes.Legend} this
     */
    geotoolkit.controls.shapes.Legend.prototype.updateLayout = function(targets){};
    /**
     * Set Model Limits Logics to use when no Model Limits have been set
     * set to true: will use parents width and height, starting at 0
     * set to false: will use parents bounds
     * @param {boolean} mode Model Limits Logics to be used
     * @returns {geotoolkit.controls.shapes.Legend} this
     * @deprecated since 2.3
     */
    geotoolkit.controls.shapes.Legend.prototype.setAutoModelLimitsMode = function(mode){};
    /**
     * Get Model Limits Logics to use when no Model Limits have been set
     * set to true: will use parents width and height, starting at 0
     * set to false: will use parents bounds
     * @returns {boolean} mode
     * @deprecated since 2.3
     */
    geotoolkit.controls.shapes.Legend.prototype.getAutoModelLimitsMode = function(){};
    /**
     * Sets fill style
     *
     * @param {geotoolkit.attributes.FillStyle | string | object} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.shapes.Legend}
     */
    geotoolkit.controls.shapes.Legend.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Sets line style
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.shapes.Legend} this
     */
    geotoolkit.controls.shapes.Legend.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {geotoolkit.layout.LayoutStyle} [props.layoutstyle] layout style
     * @returns {geotoolkit.attributes.SpaceStyle} [props.padding] padding
     */
    geotoolkit.controls.shapes.Legend.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {geotoolkit.layout.LayoutStyle|object} [properties.layoutstyle] desired layout style
     * @param {geotoolkit.attributes.SpaceStyle} [properties.padding] padding
     * @returns {geotoolkit.controls.shapes.Legend} this
     */
    geotoolkit.controls.shapes.Legend.prototype.setProperties = function(properties){};
    /**
     * specify desired layout style
     * @param {geotoolkit.layout.LayoutStyle | object} layoutStyle desired layout style
     * @returns {geotoolkit.controls.shapes.Legend} this
     */
    geotoolkit.controls.shapes.Legend.prototype.setLayoutStyle = function(layoutStyle){};
    /**
     * return desired layout style
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.controls.shapes.Legend.prototype.getLayoutStyle = function(){};
    /**
     * Returns desired width of the group as a layoutable object.
     * This method is a helper method to get access to getLayoutStyle()
     * @returns {string | number | undefined} desired width ("undefined" by default)
     */
    geotoolkit.controls.shapes.Legend.prototype.getDesiredWidth = function(){};
    /**
     * Sets desired width of the group as a layoutable object
     * @param {string | number} value desired width to set
     * @returns {geotoolkit.controls.shapes.Legend} this
     */
    geotoolkit.controls.shapes.Legend.prototype.setDesiredWidth = function(value){};
    /**
     * Returns desired height of the group as a layoutable object
     * This method is a helper method to get access to getLayoutStyle()
     * @returns {string | number | undefined} desired height ("undefined" by default)
     */
    geotoolkit.controls.shapes.Legend.prototype.getDesiredHeight = function(){};
    /**
     * Sets desired height of the group as a layoutable object
     * @param {string | number} value desired height to set
     * @returns {geotoolkit.controls.shapes.Legend} this
     */
    geotoolkit.controls.shapes.Legend.prototype.setDesiredHeight = function(value){};

/**
 * This is a parent class for legend items, which contains information to display.<br>
 * Legend items are shapes used to add information on a chart like donutchart, timeseries, etc.
 * @class geotoolkit.controls.shapes.LegendItem
 * @augments geotoolkit.scene.Group
 * @param {object} object associated with the legend item
 */
geotoolkit.controls.shapes.LegendItem = {};
    /**
     * LegendItem Events
     * @enum
     * @readonly
     */
    geotoolkit.controls.shapes.LegendItem.Events = {};
        /**
         * Change
         * @type {string}
         */
        geotoolkit.controls.shapes.LegendItem.Events.Change = "";
    /**
     * Gets object
     * @returns {Object} object
     */
    geotoolkit.controls.shapes.LegendItem.prototype.getObject = function(){};
    /**
     * Sets object
     * @param {Object} object
     * @returns {geotoolkit.controls.shapes.LegendItem} this
     */
    geotoolkit.controls.shapes.LegendItem.prototype.setObject = function(object){};
    /**
     * Sets options.
     * The implementations does nothing
     * @param {object} options
     * @returns {geotoolkit.controls.shapes.LegendItem} this
     */
    geotoolkit.controls.shapes.LegendItem.prototype.setOptions = function(options){};
    /**
     * Updates Geometry.
     * The implementations does nothing
     * @function
     */
    geotoolkit.controls.shapes.LegendItem.prototype.updateGeometry = function(){};
    /**
     * Disposes the object.
     */
    geotoolkit.controls.shapes.LegendItem.prototype.dispose = function(){};

/**
 * Legend item with symbol and text elements
 * @class geotoolkit.controls.shapes.SymbolLegendItem
 * @augments geotoolkit.controls.shapes.LegendItem
 *
 * @param {object} object associated with the legend item
 * @param {object} [options] (see "setOptions" API for more info)
 */
geotoolkit.controls.shapes.SymbolLegendItem = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.controls.shapes.SymbolLegendItem} src Source to copy from
     * @returns {geotoolkit.controls.shapes.SymbolLegendItem}
     */
    geotoolkit.controls.shapes.SymbolLegendItem.prototype.copyConstructor = function(src){};
    /**
     * Returns the current symbol legend options
     * @returns {object} options options
     *
     * @returns {object} [options.background] background rectangle options
     * @returns {geotoolkit.attributes.LineStyle} [options.background.linestyle] Line style for background rectangle
     * @returns {geotoolkit.attributes.FillStyle} [options.background.fillstyle] Fill style for background rectangle
     *
     * @returns {geotoolkit.attributes.TextStyle} [options.textstyle] text style
     * @returns {number} [options.internalpadding] padding of the background rectangle
     * @returns {number} [options.margintext] Text margin for text to the left and right
     * @returns {geotoolkit.util.AnchorType} [options.alignment] alignment
     *
     * @returns {object} [options.symbol] symbol options
     * @returns {number} [options.symbol.width] symbol width
     * @returns {number} [options.symbol.height] symbol height
     * @returns {object} [options.symbol.painter] symbol painter
     * @returns {geotoolkit.attributes.LineStyle} [options.symbol.linestyle] symbol line style
     * @returns {geotoolkit.attributes.FillStyle} [options.symbol.fillstyle] symbol fill style
     */
    geotoolkit.controls.shapes.SymbolLegendItem.prototype.getOptions = function(){};
    /**
     * Sets item's options
     * @param {!object} options options
     *
     * @param {object} [options.background] background rectangle options
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.background.linestyle=null] Line style for background rectangle
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.background.fillstyle=null] Fill style for background rectangle
     *
     * @param {geotoolkit.attributes.TextStyle | string | object} [options.textstyle=new geotoolkit.attributes.TextStyle({ 'color': 'black', 'font': '9px Arial' })] text style
     * @param {number} [options.internalpadding=4] padding of the background rectangle
     * @param {number} [options.margintext=2] Text margin for text to the left and right
     * @param {geotoolkit.util.AnchorType} [options.alignment=geotoolkit.util.AnchorType.LeftCenter] alignment
     *
     * @param {object} [options.symbol] symbol options
     * @param {number} [options.symbol.width=30] symbol width
     * @param {number} [options.symbol.height=30] symbol height
     * @param {object} [options.symbol.painter=geotoolkit.scene.shapes.painters.SquarePainter] symbol painter
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.symbol.linestyle="black"] symbol line style
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.symbol.fillstyle=null] symbol fill style
     * @returns {geotoolkit.controls.shapes.SymbolLegendItem}
     */
    geotoolkit.controls.shapes.SymbolLegendItem.prototype.setOptions = function(options){};

/**
 * Abstract class that creates {@link geotoolkit.controls.shapes.LegendItem} elements
 * based on the "shape" state
 * @class geotoolkit.controls.shapes.ShapeLegendAdapter
 * @augments geotoolkit.util.EventDispatcher
 * @param {Object} [object] an object to tie legend items to
 * @param {Object} [legendItemOptions] external legend item options
 */
geotoolkit.controls.shapes.ShapeLegendAdapter = {};
    /**
     * Gets object the adapter and legend items are associated with
     * @returns {Object} object
     */
    geotoolkit.controls.shapes.ShapeLegendAdapter.prototype.getObject = function(){};
    /**
     * Creates legend items based on its shape's state
     * @function
     * @param {Object} [options] legend items' options
     * @returns {geotoolkit.controls.shapes.LegendItem[]} elements
     */
    geotoolkit.controls.shapes.ShapeLegendAdapter.prototype.createLegendItems = function(options){};
    /**
     * Legend adapter events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.controls.shapes.ShapeLegendAdapter.Events = {};
        /**
         * LegendItemOptionsChanged
         * @type {string}
         */
        geotoolkit.controls.shapes.ShapeLegendAdapter.Events.LegendItemOptionsChanged = "";
        /**
         * LegendSourceStateChanged
         * @type {string}
         */
        geotoolkit.controls.shapes.ShapeLegendAdapter.Events.LegendSourceStateChanged = "";
    /**
     * Gets legend item's external options
     * @returns {Object} options
     */
    geotoolkit.controls.shapes.ShapeLegendAdapter.prototype.getLegendItemOptions = function(){};
    /**
     * Sets legend item's external options.
     * Sends {@link geotoolkit.controls.shapes.ShapeLegendAdapter.Events.LegendItemOptionsChanged} event
     * @param {Object} options options
     * @returns {geotoolkit.controls.shapes.ShapeLegendAdapter} this
     */
    geotoolkit.controls.shapes.ShapeLegendAdapter.prototype.setLegendItemOptions = function(options){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.shapes.ShapeLegendAdapter.prototype.dispose = function(){};

/**
 * Creates {@link geotoolkit.controls.shapes.SymbolLegendItem} elements
 * based on {@link geotoolkit.controls.shapes.DonutChart} shape
 * @class geotoolkit.controls.shapes.DonutChartLegendAdapter
 * @augments geotoolkit.controls.shapes.ShapeLegendAdapter
 * @param {!geotoolkit.controls.shapes.DonutChart} donutChart shape
 * @param {Object} [options] external options
 */
geotoolkit.controls.shapes.DonutChartLegendAdapter = {};
    /**
     * Creates legend items based on donut shape instance (and options if provided)
     * @param {Object} [options] legend items' options
     * @returns {Array} array of {@link geotoolkit.controls.shapes.LegendItem} elements
     */
    geotoolkit.controls.shapes.DonutChartLegendAdapter.prototype.createLegendItems = function(options){};
    /**
     * Disposes the object.
     */
    geotoolkit.controls.shapes.DonutChartLegendAdapter.prototype.dispose = function(){};

/**
 * Base class for event wrappers used by tools and widgets.
 * @class geotoolkit.controls.tools.BaseEventArgs
 * @param {string} eventName name of the event
 */
geotoolkit.controls.tools.BaseEventArgs = {};
    /**
     * Returns event name
     * @returns {string}
     */
    geotoolkit.controls.tools.BaseEventArgs.prototype.getEventName = function(){};
    /**
     * Stops propagation
     * @returns {geotoolkit.controls.tools.BaseEventArgs} this
     */
    geotoolkit.controls.tools.BaseEventArgs.prototype.stopPropagation = function(){};
    /**
     * Prevents default
     * @returns {geotoolkit.controls.tools.BaseEventArgs} this
     */
    geotoolkit.controls.tools.BaseEventArgs.prototype.preventDefault = function(){};
    /**
     * Returns whether event has been cancelled
     * @returns {boolean}
     */
    geotoolkit.controls.tools.BaseEventArgs.prototype.isCanceled = function(){};
    /**
     * Returns whether event has been prevented default
     * @returns {boolean}
     */
    geotoolkit.controls.tools.BaseEventArgs.prototype.isPreventDefault = function(){};

/**
 * Native event wrapper class.
 *
 * @class geotoolkit.controls.tools.EventArgs
 * @augments geotoolkit.controls.tools.BaseEventArgs
 * @param {string} eventName name of the event
 * @param {Event} nativeEventArgs arguments of the DOM event
 * @param {geotoolkit.util.Point} plotPoint position of the mouse inside of the plot
 * @param {geotoolkit.scene.Node} node owner of the event
 * @param {geotoolkit.plot.Plot} plot plot which renders nodes
 */
geotoolkit.controls.tools.EventArgs = {};
    /**
     * Returns point in plot coordinate
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.tools.EventArgs.prototype.getPlotPoint = function(){};
    /**
     * Returns plot
     * @returns {geotoolkit.plot.Plot} plot
     */
    geotoolkit.controls.tools.EventArgs.prototype.getPlot = function(){};
    /**
     * Returns node on the plot
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.controls.tools.EventArgs.prototype.getNode = function(){};
    /**
     * Returns original event args
     * @returns {Event}
     */
    geotoolkit.controls.tools.EventArgs.prototype.getNativeEventArgs = function(){};
    /**
     * Cancels event processing
     * @param {boolean} [preventDefault=false] prevent default system events
     * @param {boolean} [stopPropagation=false] stop propagation to next listener
     * @returns {geotoolkit.controls.tools.EventArgs} this
     */
    geotoolkit.controls.tools.EventArgs.prototype.stopPropagation = function(preventDefault, stopPropagation){};
    /**
     * Returns whether event position is inside of plot
     * @returns {boolean}
     */
    geotoolkit.controls.tools.EventArgs.prototype.inPlot = function(){};

/**
 * ProxyEventArgs
 *
 * @class geotoolkit.controls.tools.ProxyEventArgs
 * @augments geotoolkit.controls.tools.EventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info about the event
 */
geotoolkit.controls.tools.ProxyEventArgs = {};
    /**
     * Returns node on the plot
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.controls.tools.ProxyEventArgs.prototype.getNode = function(){};
    /**
     * Returns plot
     * @returns {geotoolkit.plot.Plot}
     */
    geotoolkit.controls.tools.ProxyEventArgs.prototype.getPlot = function(){};
    /**
     * Returns point in plot coordinate
     * @override
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.tools.ProxyEventArgs.prototype.getPlotPoint = function(){};
    /**
     * Returns event name
     * @returns {string}
     */
    geotoolkit.controls.tools.ProxyEventArgs.prototype.getEventName = function(){};
    /**
     * Returns original event args
     * @returns {Event}
     */
    geotoolkit.controls.tools.ProxyEventArgs.prototype.getNativeEventArgs = function(){};
    /**
     * Cancels event processing
     * @param {boolean} preventDefault prevent default system events
     * @param {boolean} stopPropagation stop propogation to next listener
     * @returns {geotoolkit.controls.tools.ProxyEventArgs} this
     */
    geotoolkit.controls.tools.ProxyEventArgs.prototype.stopPropagation = function(preventDefault, stopPropagation){};
    /**
     * Returns whether event has been cancelled
     * @returns {boolean}
     */
    geotoolkit.controls.tools.ProxyEventArgs.prototype.isCanceled = function(){};
    /**
     * Returns whether event position is inside of plot
     * @returns {boolean}
     */
    geotoolkit.controls.tools.ProxyEventArgs.prototype.inPlot = function(){};

/**
 * RejectableEventArgs
 *
 * @class geotoolkit.controls.tools.RejectableEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info about the event
 */
geotoolkit.controls.tools.RejectableEventArgs = {};
    /**
     * set target
     * @param {object} target object that initialised this event
     * @returns {geotoolkit.controls.tools.RejectableEventArgs} this
     */
    geotoolkit.controls.tools.RejectableEventArgs.prototype.setTarget = function(target){};
    /**
     * returns target
     * @returns {null|object} target
     */
    geotoolkit.controls.tools.RejectableEventArgs.prototype.getTarget = function(){};
    /**
     * reject action
     * @param {boolean} doReject reject event or not
     * @returns {geotoolkit.controls.tools.RejectableEventArgs} this
     */
    geotoolkit.controls.tools.RejectableEventArgs.prototype.reject = function(doReject){};
    /**
     * return rejected state
     * @returns {boolean} the state
     */
    geotoolkit.controls.tools.RejectableEventArgs.prototype.isRejected = function(){};

/**
 * EventHandler*
 *
 * @class geotoolkit.controls.tools.EventHandler
 *
 * @param {geotoolkit.controls.tools.AbstractCompositeTool} compositeTool abstract composite tool
 * @param {string} eventName event
 * @param {geotoolkit.controls.tools.AbstractTool} tool tool
 * @param {object} obj extra obj
 * @param {function()} delegate to execute
 */
geotoolkit.controls.tools.EventHandler = {};
    /**
     * return tool container
     * @returns {geotoolkit.controls.tools.AbstractCompositeTool}
     */
    geotoolkit.controls.tools.EventHandler.prototype.getCompositeTool = function(){};
    /**
     * return event name
     * @returns {string} event name
     */
    geotoolkit.controls.tools.EventHandler.prototype.getEventName = function(){};
    /**
     *
     * @returns {*}
     */
    geotoolkit.controls.tools.EventHandler.prototype.getObject = function(){};
    /**
     * return tool
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.EventHandler.prototype.getTool = function(){};
    /**
     * return enable state
     * @returns {boolean}
     */
    geotoolkit.controls.tools.EventHandler.prototype.isEnabled = function(){};
    /**
     * set enable state
     * @param {boolean} enabled flag to set enable state
     * @returns {geotoolkit.controls.tools.EventHandler}
     */
    geotoolkit.controls.tools.EventHandler.prototype.setEnabled = function(enabled){};
    /**
     * returns true if event was captured be event handler
     * @param {object} nativeEventArgs event args from DOM events
     * @returns {geotoolkit.controls.tools.EventArgs}
     */
    geotoolkit.controls.tools.EventHandler.prototype.execute = function(nativeEventArgs){};

/**
 * AbstractTool is a layer of abstraction between the HTML5 element events. Uses generic event mechanism for different browsers.
 * <br>
 * <br>
 * <h5>Events {@link geotoolkit.controls.tools.AbstractTool.Events} </h5>
 * <table class="params">
 * <thead>
 * <tr>
 * <th>Event</th><th>Arguments</th><th>Description</th>
 * </tr>
 * </thead>
 * <tbody>
 * <tr>
 * <td>onStateChanged</td>
 * <td>null</td>
 * <td>This Event is fired when the Abstract Tool State (props: active) has been changed</td>
 * </tr>
 * <tr>
 * <td>onEnabledStateChanged</td>
 * <td>null</td>
 * <td>This Event is fired when the Abstract Tool State (enable) has been changed</td>
 * </tr>
 * <tr>
 * <td>onEnter</td>
 * <td>null</td>
 * <td>This Event is fired on entering the canvas</td>
 * </tr>
 * <tr>
 * <td>onLeave</td>
 * <td>null</td>
 * <td>This Event is fired on leaving the canvas</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 * Below is a list of valid slot names ( this could change depending on the browser and its version. ) <br>
 * pointerdown <br>
 * pointermove <br>
 * pointerup <br>
 * MSPointerDown <br>
 * MSPointerMove <br>
 * MSPointerUp <br>
 * mousedown <br>
 * touchstart <br>
 * mousemove <br>
 * touchmove <br>
 * mouseup <br>
 * touchend <br>
 * @class geotoolkit.controls.tools.AbstractTool
 * @implements geotoolkit.plot.ITool
 * @param {object} slots type of system events like mousedown etc. The slot object allows to attach browser events (HTML Dom Events) to your callback function
 * @param {object} [slots.slots] type of system events
 * @param {string} [slots.name=""] name of the tool used like crosshair etc
 * @param {geotoolkit.scene.CompositeNode} [slots.layer=null] manipulator layer
 * @param {string} [name=""] name of the tool used like crosshair etc
 * @example
 * var slots = {
 * 'pointerdown' : function(event){
 * // event is an instance of geotoolkit.controls.tools.EventArgs
 * }.bind(this)
 * };
 */
geotoolkit.controls.tools.AbstractTool = {};
    /**
     * Sets new slots. This method remove old slots and sets new ones.
     * @param {object} [slots] type of system events
     * @returns {geotoolkit.controls.tools.AbstractTool} this
     * @example
     * var slots = {
     * 'pointerdown' : function(event){
     * // event is an instance of geotoolkit.controls.tools.EventArgs
     * }.bind(this)
     * };
     * this.setSlots(slots);
     */
    geotoolkit.controls.tools.AbstractTool.prototype.setSlots = function(slots){};
    /**
     * Return an object which contains all slots. Don't modify this object
     * @returns {object}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.getSlots = function(){};
    /**
     * for internal use only
     * @protected
     * @param {geotoolkit.plot.Plot} plot plot
     * @returns {geotoolkit.controls.tools.AbstractTool} this
     */
    geotoolkit.controls.tools.AbstractTool.prototype.attachToPlot = function(plot){};
    /**
     * Set exclusive tool for plot
     * @param {geotoolkit.plot.Plot} plot plot
     * @param {geotoolkit.controls.tools.AbstractTool} tool tool
     */
    geotoolkit.controls.tools.AbstractTool.lock = function(plot, tool){};
    /**
     * Remove exclusive tool from plot
     * @param {geotoolkit.plot.Plot|geotoolkit.controls.tools.AbstractTool} value value
     */
    geotoolkit.controls.tools.AbstractTool.unlock = function(value){};
    /**
     * return exclusive tool associated with plot
     * @param {geotoolkit.plot.Plot} plot plot
     * @returns {geotoolkit.controls.tools.AbstractTool|null} tool
     */
    geotoolkit.controls.tools.AbstractTool.getExclusiveTool = function(plot){};
    /**
     * Sets slot enabled
     * @param {string} eventName eventName
     * @param {boolean} value value
     * @param {?object} target target
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.setSlotEnabled = function(eventName, value, target){};
    /**
     * set tool name
     * @param {string} name the tool name
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.setName = function(name){};
    /**
     * return tool name if any
     * @returns {string} name of the tool
     */
    geotoolkit.controls.tools.AbstractTool.prototype.getName = function(){};
    /**
     * return manipulator layer
     * @returns {geotoolkit.scene.CompositeNode} layer
     */
    geotoolkit.controls.tools.AbstractTool.prototype.getManipulatorLayer = function(){};
    /**
     * listen to window mouse events in order to catch a mouse up action outside of the tool container DOM element.
     * useful for example when you pan and release click outside of DOM element.
     */
    geotoolkit.controls.tools.AbstractTool.prototype.captureMouseUp = function(){};
    /**
     * dispose object
     */
    geotoolkit.controls.tools.AbstractTool.prototype.dispose = function(){};
    /**
     * return true if the event is a touch event and false otherwise.
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info of the event
     * @returns {boolean}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.isTouchEvent = function(eventArgs){};
    /**
     * return position relative to the parent
     * @param {HTMLElement} element HTML element
     * @param {HTMLElement} [parentElement] the parent HTML element
     * @returns {{x: number, y: number}}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.getAbsolutePosition = function(element, parentElement){};
    /**
     * return position relative to the canvas
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs parentElement the parent HTML element
     * @param {geotoolkit.plot.Plot} [externalPlot] plot
     * @returns {{x: number, y: number}}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.pageToCanvas = function(eventArgs, externalPlot){};
    /**
     * converts device coordinates to inner coordinates of node
     * @param {geotoolkit.scene.Node} model the model
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs arguments of the event.
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.pointToModel = function(model, eventArgs){};
    /**
     * add event listener. The listener receives the message when the system event happens.
     * @param {string|number} eventName event name or unique event identifier
     * @param {function()} listener the event listener
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.addListener = function(eventName, listener){};
    /**
     * remove event listener. The listener reveives the message when the system event happens.
     * @param {string} eventName event name
     * @param {function()} listener the event listener
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.removeListener = function(eventName, listener){};
    /**
     * remove event listener
     * @param {string} eventName event name
     * @returns {Array.<function>}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.getListenersForEvent = function(eventName){};
    /**
     * This method is Protected. Fire an Event.
     * @param {string} eventName event name
     * @param {object|null} eventArgs contains info of the event
     */
    geotoolkit.controls.tools.AbstractTool.prototype.fireEvent = function(eventName, eventArgs){};
    /**
     * set enable state
     * @param {boolean} enabled sets the enabled state
     * @fires geotoolkit.controls.tools.AbstractTool~onEnabledStateChanged
     * @fires geotoolkit.controls.tools.AbstractTool~onStateChanged
     * @returns {geotoolkit.controls.tools.AbstractTool} this
     */
    geotoolkit.controls.tools.AbstractTool.prototype.setEnabled = function(enabled){};
    /**
     * returns enable state
     * @returns {boolean} state
     */
    geotoolkit.controls.tools.AbstractTool.prototype.isEnabled = function(){};
    /**
     * switch enable state to opposite state
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.toggle = function(){};
    /**
     * start
     * @protected
     * @param {geotoolkit.controls.tools.EventArgs} [eventArgs=null] event args
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.start = function(eventArgs){};
    /**
     * stop
     * @protected
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.stop = function(){};
    /**
     * set active state
     * @param {boolean} active set active state
     * @fires geotoolkit.controls.tools.AbstractTool~onStateChanged
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.setActive = function(active){};
    /**
     * return active state
     * @returns {boolean}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.isActive = function(){};
    /**
     * @protected
     * @fires geotoolkit.controls.tools.AbstractTool~onStateChanged
     */
    geotoolkit.controls.tools.AbstractTool.prototype.onActiveStateChanged = function(){};
    /**
     * @protected
     * @fires geotoolkit.controls.tools.AbstractTool~onEnabledStateChanged
     */
    geotoolkit.controls.tools.AbstractTool.prototype.onEnabledStateChanged = function(){};
    /**
     * Returns associated tool containers
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.getCompositeTools = function(){};
    /**
     * @deprecated since 1.1
     *
     * @param {string} eventName
     * @param {geotoolkit.controls.tools.AbstractTool} tool tool
     * @param {object|null} obj
     * @param {function()} delegate
     * @returns {geotoolkit.controls.tools.EventHandler}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.on = function(eventName, tool, obj, delegate){};
    /**
     * @deprecated since 1.1
     *
     * @param {geotoolkit.controls.tools.EventHandler} handler handler
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.AbstractTool.prototype.off = function(handler){};
    /**
     * @deprecated since 1.1
     */
    geotoolkit.controls.tools.AbstractTool.prototype.getEventHandlers = function(){};

/**
 * AbstractRubberTool
 *
 * @class geotoolkit.controls.tools.AbstractRubberTool
 * @augments geotoolkit.controls.tools.AbstractTool
 *
 * @param {object} [slots] type of system events like mousedown etc. The slot object allows to attach browser events (HTML Dom Events) to your callback function
 * @param {object} [slots.slots] type of system events which should be processed
 * @param {geotoolkit.scene.CompositeNode} [slots.layer] manipulator layer
 * @param {string} [slots.name=""] name of the tool
 * @param {geotoolkit.controls.tools.RubberBandRenderMode|number} [slots.mode=geotoolkit.controls.tools.RubberBandRenderMode.Free] Rubber mode
 * @param {string} [name=""] name of the tool
 * @param {geotoolkit.controls.tools.RubberBandRenderMode|number} [mode=geotoolkit.controls.tools.RubberBandRenderMode.Free] Rubber mode
 */
geotoolkit.controls.tools.AbstractRubberTool = {};
    /**
     * Set the way the rectangle has to be displayed
     * @param {geotoolkit.controls.tools.RubberBandRenderMode|number} mode the way the rectangle has to be displayed
     * @returns {geotoolkit.controls.tools.AbstractRubberTool}
     */
    geotoolkit.controls.tools.AbstractRubberTool.prototype.setRubberBandRenderMode = function(mode){};
    /**
     * Return the way the rectangle is displayed
     * @returns {geotoolkit.controls.tools.RubberBandRenderMode|number}
     */
    geotoolkit.controls.tools.AbstractRubberTool.prototype.getRubberBandRenderMode = function(){};

/**
 * Abstract composite tool.
 *
 * @class geotoolkit.controls.tools.AbstractCompositeTool
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {string} [name] name of the tool
 */
geotoolkit.controls.tools.AbstractCompositeTool = {};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.attachToPlot = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.dispose = function(){};
    /**
     * Returns the tool matching the given name.
     * This function also accepts tool 'path' instead of absolute name.
     * For example:
     * getToolByName("compositeTool.panningTools.trackPanning.TrackPanning")
     * Would return the same tool than
     * getToolByName("TrackPanning")
     * As long as there is only one tool named "TrackPanning" in this composite
     *
     * See listToolsNames()
     * @param {string} name tool name or path
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.getToolByName = function(name){};
    /**
     * Returns the tool matching the given type.
     * @param {string} type type
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.getToolByType = function(type){};
    /**
     * List all the tools contained in this composite.
     * Prepend their composite tool parent using a '.'
     * @returns {Array<string>}
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.listToolsNames = function(){};
    /**
     * Return index of specified tool.
     * @param {geotoolkit.controls.tools.AbstractTool} tool abstract tool
     * @returns {number} index of tool
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.getToolIndex = function(tool){};
    /**
     * Insert tool at specified index.
     * @param {number} index index to insert the tool
     * @param {geotoolkit.controls.tools.AbstractTool} tool abstract tool
     * @returns {geotoolkit.controls.tools.AbstractCompositeTool}
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.insert = function(index, tool){};
    /**
     * Add tool to the container.
     * @param {geotoolkit.controls.tools.AbstractTool | Array<geotoolkit.controls.tools.AbstractTool>} tool abstract tool to be added
     * @returns {geotoolkit.controls.tools.AbstractCompositeTool}
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.add = function(tool){};
    /**
     * Remove tool from container.
     * @param {geotoolkit.controls.tools.AbstractTool | Array<geotoolkit.controls.tools.AbstractTool>} tool to remove
     * @returns {geotoolkit.controls.tools.AbstractCompositeTool}
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.remove = function(tool){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.on = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.off = function(){};
    /**
     * Dispatch event through the handlers.
     * @param {string} eventName contains the name of the event to dispatch.
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info of the event.
     * @returns {boolean}
     */
    geotoolkit.controls.tools.AbstractCompositeTool.prototype.dispatchEvent = function(eventName, eventArgs){};

/**
 * The tools container class is a container of tools {@link geotoolkit.controls.tools.AbstractTool} connecting tools to their plot. It can hold several tools using a composite tool as a root.
 *
 * @class geotoolkit.controls.tools.ToolsContainer
 * @implements geotoolkit.plot.IToolContainer
 * @param {geotoolkit.plot.Plot} plot plot which renders nodes
 * @example
 * function addShapeToCanvas(canvasName, shape) {
 * // Create a new Plot object from the canvas and group
 * .
 * ...
 * var toolsContainer = new geotoolkit.controls.tools.ToolsContainer(plot);
 * toolsContainer.add(shape.getTool());
 * return plot;
 * }
 */
geotoolkit.controls.tools.ToolsContainer = {};
    /**
     * Dispose tool container
     * @param {boolean} [disposeTool=false] dispose tool flag
     */
    geotoolkit.controls.tools.ToolsContainer.prototype.dispose = function(disposeTool){};
    /**
     /**
     * set enable state
     * @param {boolean} enabled sets the enabled state
     * @returns {geotoolkit.controls.tools.ToolsContainer}
     */
    geotoolkit.controls.tools.ToolsContainer.prototype.setEnabled = function(enabled){};
    /**
     * returns enable state
     * @returns {boolean} state
     */
    geotoolkit.controls.tools.ToolsContainer.prototype.isEnabled = function(){};
    /**
     * Returns the tool matching the given name.<br>
     * This function also accepts tool 'path' instead of absolute name.<br>
     * For example:<br>
     * getToolByName("compositeTool.panningTools.trackPanning.TrackPanning")<br>
     * Would return the same tool than <br>
     * getToolByName("TrackPanning")<br>
     * As long as there is only one tool named "TrackPanning" in this composite<br>
     * See listToolsNames()<br>
     * @param {string} toolName The tool name or path
     * @returns {?geotoolkit.plot.ITool}
     */
    geotoolkit.controls.tools.ToolsContainer.prototype.getToolByName = function(toolName){};
    /**
     * Returns the tool matching the given type. or null if nothing is matching the tool type<br>
     * For example:<br>
     * getToolByType(geotoolkit.controls.tools.Selection)<br>
     * Would return the same tool than<br>
     * getToolByName("pick")<br>
     *
     * @param {string} toolType toolType of the tool
     * @returns {?geotoolkit.plot.ITool}
     */
    geotoolkit.controls.tools.ToolsContainer.prototype.getToolByType = function(toolType){};
    /**
     * List all the tools contained in this composite.
     * Prepend their parent tools parent using a '.'.
     * @returns {string[]}
     */
    geotoolkit.controls.tools.ToolsContainer.prototype.listToolsNames = function(){};
    /**
     * @returns {geotoolkit.plot.Plot}
     * @deprecated since 1.4
     */
    geotoolkit.controls.tools.ToolsContainer.prototype.getPlot = function(){};
    /**
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.controls.tools.ToolsContainer.prototype.getNode = function(){};
    /**
     * Add tool or array of tools to container
     * @override
     * @param {geotoolkit.plot.ITool | Array<geotoolkit.plot.ITool>} tool tool or array of tools
     * @returns {geotoolkit.controls.tools.ToolsContainer} this
     */
    geotoolkit.controls.tools.ToolsContainer.prototype.add = function(tool){};
    /**
     * Remove tool from container
     * @override
     * @param {geotoolkit.plot.ITool} tool tool to remove
     * @returns {geotoolkit.controls.tools.ToolsContainer} this
     */
    geotoolkit.controls.tools.ToolsContainer.prototype.remove = function(tool){};
    /**
     * Get tool
     * @returns {geotoolkit.controls.tools.CompositeTool} instance of composite tool
     */
    geotoolkit.controls.tools.ToolsContainer.prototype.getTool = function(){};

/**
 * Composite tool.
 *
 * @class geotoolkit.controls.tools.CompositeTool
 * @augments geotoolkit.controls.tools.AbstractCompositeTool
 * @param {geotoolkit.scene.CompositeNode} node associated with layer to display temporary shapes
 * @param {string} [name] name of the tool
 */
geotoolkit.controls.tools.CompositeTool = {};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.CompositeTool.prototype.dispose = function(){};
    /**
     * Returns node associated with manipulator.
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.controls.tools.CompositeTool.prototype.getNode = function(){};
    /**
     * Sets node associated with manipulator
     * @param {geotoolkit.scene.Group} node node
     * @returns {geotoolkit.controls.tools.CompositeTool} this
     */
    geotoolkit.controls.tools.CompositeTool.prototype.setNode = function(node){};
    /**
     * Attaches a tool to the container.
     * @param {geotoolkit.controls.tools.CompositeTool} container the container to which this object is attached.
     */
    geotoolkit.controls.tools.CompositeTool.prototype.attach = function(container){};

/**
 * CrossHairEventArgs
 *
 * @class geotoolkit.controls.tools.CrossHairEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info of the event
 * @param {object|geotoolkit.util.Point} position mouse position
 */
geotoolkit.controls.tools.CrossHairEventArgs = {};
    /**
     * returns cursor position
     * @returns {geotoolkit.util.Point} position
     */
    geotoolkit.controls.tools.CrossHairEventArgs.prototype.getPosition = function(){};

/**
 * Creates a CrossHair tool. The tool supports events shown below. It provides builtin functions to customize the styles for the tool and its labels.
 * <br>
 * <h5>Events {@link geotoolkit.controls.tools.CrossHair.Events}</h5>
 * <table class="params">
 * <thead>
 * <tr>
 * <th>Event</th><th>Arguments</th><th>Description</th>
 * </tr>
 * </thead>
 * <tbody>
 * <tr>
 * <td>onPositionChanged</td>
 * <td>{@link geotoolkit.controls.tools.CrossHairEventArgs}</td>
 * <td>This Event is fired when the Cross Hair Mouse position has been changed</td>
 * </tr>
 * <tr>
 * <td>onPointerUp</td>
 * <td>{@link geotoolkit.controls.tools.CrossHairEventArgs}</td>
 * <td>This Event is fired when the Cross Hair pointer is up</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 * @class geotoolkit.controls.tools.CrossHair
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {object|geotoolkit.scene.CompositeNode} options JSON containing crosshair option OR manipulator layer
 * @param {geotoolkit.scene.CompositeNode} [options.group] - manipulator layer
 * @param {string} [options.name='cross-hair'] - name of the tool
 * @param {geotoolkit.attributes.LineStyle | string | object} [options.linestyle] - default linestyle shared for all orientations.
 * @param {geotoolkit.attributes.TextStyle | string | object} [options.textstyle] - default textstyle shared for all orientations.
 *
 * @param {string} [name = 'cross-hair'] name of the tool
 */
geotoolkit.controls.tools.CrossHair = {};
    /**
     * CrossHair Events
     * @enum
     * @readonly
     */
    geotoolkit.controls.tools.CrossHair.Events = {};
        /**
         * onPositionChanged
         * @type {string}
         */
        geotoolkit.controls.tools.CrossHair.Events.onPositionChanged = "";
        /**
         * onPointerUp
         * @type {string}
         */
        geotoolkit.controls.tools.CrossHair.Events.onPointerUp = "";
    /**
     * enum about label positions
     * @see {@link geotoolkit.layout.AnnotationLocation}
     * @enum
     * @readonly
     */
    geotoolkit.controls.tools.CrossHair.LabelPositions = {};
    /**
     * enum about line orientation
     * @see {@link geotoolkit.axis.AxisOrientation}
     * @enum
     * @readonly
     */
    geotoolkit.controls.tools.CrossHair.LineOrientations = {};
    /**
     * @override
     */
    geotoolkit.controls.tools.CrossHair.prototype.onEnabledStateChanged = function(){};
    /**
     * Sets line style
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.CrossHair} this
     */
    geotoolkit.controls.tools.CrossHair.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Set tool settings
     * @param {object} settings tool settings
     * @param {boolean} settings.enabled tool is enabled
     * @param {object | geotoolkit.attributes.LineStyle} settings.linestyle Linestyle for both lines
     * @param {object | geotoolkit.attributes.LineStyle} settings.horizontal Linestyle for horizontal line
     * @param {object| geotoolkit.attributes.LineStyle} settings.vertical Linestyle for vertical line
     * @param {object} settings.north JSON for north label. See setLabelSettings for more details
     * @param {object} settings.south JSON for south label. See setLabelSettings for more details
     * @param {object} settings.east JSON for east label. See setLabelSettings for more details
     * @param {object} settings.west JSON for west label. See setLabelSettings for more details
     * @param {object} settings.center JSON for center label. See setLabelSettings for more details
     * @param {object} [settings.center.labelsoffset] central labels offset relative to mouse position
     * @param {number} [settings.center.labelsoffset.x] x-offset in pixels
     * @param {number} [settings.center.labelsoffset.y] y-offset in pixels
     * @returns {geotoolkit.controls.tools.CrossHair} this
     */
    geotoolkit.controls.tools.CrossHair.prototype.setSettings = function(settings){};
    /**
     * Set Settings for one label
     * @param {geotoolkit.layout.AnnotationLocation} orientation orientation
     * @param {object} [settings] JSON to configure label
     * @param {object | geotoolkit.attributes.TextStyle} [settings.textstyle] text style of the text
     * @param {object | geotoolkit.attributes.FillStyle} [settings.fillstyle] fill style of the text
     * @param {object | geotoolkit.attributes.LineStyle} [settings.linestyle] line style of the text border
     * @param {boolean} [settings.visible] visibility of the text
     * @param {geotoolkit.util.AnchorType} [settings.alignment] alignment of the text
     * @param {number} [settings.padding=0] padding between the text and the border
     * @param {number} [settings.radius=0] radius of the text border line
     * @param {function()} [settings.textconverter] strategy to convert x,y to text
     * @returns {geotoolkit.controls.tools.CrossHair} this
     */
    geotoolkit.controls.tools.CrossHair.prototype.setLabelSettings = function(orientation, settings){};
    /**
     * Sets the text style of labels
     * @param {geotoolkit.attributes.TextStyle | object} textStyle for the crosshair labels on screen, either textStyle or
     * object with "west", "east", "north", "south", "center" textStyle's
     * @returns {geotoolkit.controls.tools.CrossHair} this
     */
    geotoolkit.controls.tools.CrossHair.prototype.setTextStyle = function(textStyle){};
    /**
     * Sets vertical line style
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.CrossHair} this
     */
    geotoolkit.controls.tools.CrossHair.prototype.setVerticalLineStyle = function(lineStyle, merge){};
    /**
     * return vertical line style
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.controls.tools.CrossHair.prototype.getVerticalLineStyle = function(){};
    /**
     * Sets vertical line style
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.CrossHair} this
     */
    geotoolkit.controls.tools.CrossHair.prototype.setHorizontalLineStyle = function(lineStyle, merge){};
    /**
     * return horizontal line style
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.controls.tools.CrossHair.prototype.getHorizontalLineStyle = function(){};
    /**
     * return visible state
     * @returns {boolean}
     */
    geotoolkit.controls.tools.CrossHair.prototype.isVisible = function(){};
    /**
     * Sets visible
     * @param {boolean} visible visible attribute set or not
     * @returns {geotoolkit.controls.tools.CrossHair} this
     */
    geotoolkit.controls.tools.CrossHair.prototype.setVisible = function(visible){};
    /**
     * The current cross hair position
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.tools.CrossHair.prototype.getPosition = function(){};
    /**
     * Update position of cursor for the last mouse position. This code can be used
     * if content is scrolled to display the position of the cursor in the last mouse position
     * @param {boolean} [silent] notification enabled or not
     * @returns {geotoolkit.controls.tools.CrossHair} this
     */
    geotoolkit.controls.tools.CrossHair.prototype.updateCursorPosition = function(silent){};
    /**
     * Sets the current position in model coordinates of the manipulator layer
     * @param {geotoolkit.util.Point} position current mouse position
     * @param {boolean} [silent=false] notification enabled or not
     * @param {object} [eventArgs=null] additional event args
     * @returns {geotoolkit.controls.tools.CrossHair} this
     */
    geotoolkit.controls.tools.CrossHair.prototype.setPosition = function(position, silent, eventArgs){};
    /**
     *
     * @param {geotoolkit.controls.tools.CrossHair.LabelPositions} position of the label to be changed
     * @param {function()} textConverter function that takes x and y to convert to text for the label
     * @returns {geotoolkit.controls.tools.CrossHair} this
     */
    geotoolkit.controls.tools.CrossHair.prototype.setLabelsTextConverter = function(position, textConverter){};
    /**
     *
     * @param {boolean | object} draw draw the crosshair labels on screen, either boolean or
     * object with "west", "east", "north", "south", "center" booleans
     */
    geotoolkit.controls.tools.CrossHair.prototype.drawLabels = function(draw){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.CrossHair.prototype.dispose = function(){};

/**
 * Provides HTML based tooltip tool to display content information
 * <p>
 * To initialize it is necessary to add div element on your page and specify styles:
 * </p>
 * @example
 * &lt; id=&quot;tooltip-container&quot; style=&quot;display:none&quot;&gt;&lt;/div&gt;
 *
 * @class geotoolkit.controls.tools.ToolTipTool
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {object} options tool options
 * @param {geotoolkit.scene.CompositeNode} [options.group] manipulator layer @deprecated use 'layer' instead
 * @param {geotoolkit.scene.CompositeNode} [options.layer] manipulator layer
 * @param {string} [options.name='tooltip'] - name of the tool
 * @param {HTMLElement} [options.divelement] HTML div container element or it will be created with className cg-tooltip-container
 * @param {number} [options.offsetx=10] offset of tooltip from current position by x in pixels
 * @param {number} [options.offsety=-10] offset of tooltip from current position by y in pixels
 * @param {geotoolkit.util.AnchorType} [options.alignment=geotoolkit.util.AnchorType.LeftTop] tooltip alignment according to the point set by offsets
 * @param {geotoolkit.controls.tools.PointerMode|string} [options.mode=geotoolkit.controls.tools.PointerMode.Hover] tooltip appearance mode
 * @param {function()} [options.callback] callback to return information about the current position
 * @param {function()} [options.init=null] callback function to initialize tool
 * @param {boolean} [options.autoupdate=true] true if tooltip info should be auto updated after layer.invalidate() was called
 */
geotoolkit.controls.tools.ToolTipTool = {};
    /**
     * Sets tooltip offset x
     * @param {number} offsetX offset x
     * @returns {geotoolkit.controls.tools.ToolTipTool} this
     */
    geotoolkit.controls.tools.ToolTipTool.prototype.setOffsetX = function(offsetX){};
    /**
     * Sets tooltip offset y
     * @param {number} offsetY offset y
     * @returns {geotoolkit.controls.tools.ToolTipTool} this
     */
    geotoolkit.controls.tools.ToolTipTool.prototype.setOffsetY = function(offsetY){};
    /**
     * Sets tooltip options
     * @param {object} [options] options
     * @param {number} [options.offsetx] offset of tooltip from current position by x in pixels
     * @param {number} [options.offsety] offset of tooltip from current position by y in pixels
     * @param {geotoolkit.util.AnchorType} [options.alignment] tooltip alignment according to the point set by offsets
     * @param {boolean} [options.autoupdate] true if tooltip info should be auto updated after layer.invalidate() was called
     * @returns {geotoolkit.controls.tools.ToolTipTool} this
     */
    geotoolkit.controls.tools.ToolTipTool.prototype.setOptions = function(options){};
    /**
     * Updates tooltip information using previous tooltip point
     * @returns {geotoolkit.controls.tools.ToolTipTool} this
     */
    geotoolkit.controls.tools.ToolTipTool.prototype.updateInfo = function(){};
    /**
     * set radius for touch selection
     * @param {number} radius radius for touch selection
     * @returns {geotoolkit.controls.tools.ToolTipTool} this
     */
    geotoolkit.controls.tools.ToolTipTool.prototype.setTouchRadius = function(radius){};
    /**
     * set radius for mouse selection
     * @param {number} radius radius for mouse selection
     * @returns {geotoolkit.controls.tools.ToolTipTool} this
     */
    geotoolkit.controls.tools.ToolTipTool.prototype.setMouseRadius = function(radius){};
    /**
     * get radius for touch selection
     * @returns {number}
     */
    geotoolkit.controls.tools.ToolTipTool.prototype.getTouchRadius = function(){};
    /**
     * get radius for mouse selection
     * @returns {number}
     */
    geotoolkit.controls.tools.ToolTipTool.prototype.getMouseRadius = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.ToolTipTool.prototype.dispose = function(){};

/**
 * @class geotoolkit.controls.tools.PanningEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info about the event
 * @param {object} [direction] direction of the object
 * @param {number} direction.x direction x of the panning
 * @param {number} direction.y direction y of the panning
 * @param {boolean} wheel is eventArgs is wheel event args
 */
geotoolkit.controls.tools.PanningEventArgs = {};
    /**
     * Return wheel flag
     * @returns {boolean}
     */
    geotoolkit.controls.tools.PanningEventArgs.prototype.isWheel = function(){};
    /**
     * Return direction object for e.g.: {'x': 0 ,'y': -10} will go
     * @returns {?object}
     */
    geotoolkit.controls.tools.PanningEventArgs.prototype.getDirection = function(){};

/**
 * Defines a Panning tool for the target or object to pan. It supports various events shown below and has builtin functions to capture the panning direction and wheel ratios.<br>
 * User can use the default panning function or customize the function and add listeners.
 * @class geotoolkit.controls.tools.Panning
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {Object} [options] options for the tool
 * @param {string} [options.name=panning] tool name
 * @param {number} [options.wheelratio=1/20] number that represent the number default
 * @param {boolean} [options.acceptx=false]
 * @param {number | boolean} [options.inertiacoef=0] inertia coefficient for kinetic effect
 * WARNING: if you set positive inertia coefficient, some panning events'll be fired with null eventArgs
 */
geotoolkit.controls.tools.Panning = {};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.Panning.prototype.start = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.Panning.prototype.stop = function(){};
    /**
     * returns Panning direction
     * @param {!geotoolkit.controls.tools.EventArgs} eventArgs contains info of the event
     * @returns {object} obj
     * @returns {number} obj.x
     * @returns {number} obj.y
     * @returns {object} obj.start
     * @returns {number} obj.start.x
     * @returns {number} obj.start.y
     * @returns {object} obj.end
     * @returns {number} obj.end.x
     * @returns {number} obj.end.y
     */
    geotoolkit.controls.tools.Panning.prototype.getDirection = function(eventArgs){};
    /**
     * Sets the target for panning
     * @param {geotoolkit.scene.Group} target the target for panning
     * @param {function() | null} [translateMethod] method that is responsible to translate the target
     * @returns {geotoolkit.controls.tools.Panning} this
     */
    geotoolkit.controls.tools.Panning.prototype.setTarget = function(target, translateMethod){};
    /**
     * returns acceptX
     * @returns {boolean} acceptX
     */
    geotoolkit.controls.tools.Panning.prototype.getAcceptX = function(){};
    /**
     * set acceptX
     * @param {boolean} acceptX
     * @returns {geotoolkit.controls.tools.Panning} this
     */
    geotoolkit.controls.tools.Panning.prototype.setAcceptX = function(acceptX){};
    /**
     * returns wheel ratio
     * @returns {number}
     */
    geotoolkit.controls.tools.Panning.prototype.getWheelRatio = function(){};
    /**
     * set wheel ratio
     * @param {number} ratio wheel ratio
     * @returns {geotoolkit.controls.tools.Panning} this
     */
    geotoolkit.controls.tools.Panning.prototype.setWheelRatio = function(ratio){};
    /**
     * set enable state
     * @param {boolean} enabled state enables or not
     * @returns {geotoolkit.controls.tools.Panning}
     * @fires geotoolkit.controls.tools.Panning~onPanningEnd
     * @fires geotoolkit.controls.tools.Panning~onZoomEnd
     */
    geotoolkit.controls.tools.Panning.prototype.setEnabled = function(enabled){};
    /**
     * Sets inertia coefficient for kinetic effect while panning
     * WARNING: if you set positive inertia coefficient, some panning events'll be fired with null eventArgs
     * @param {number | boolean} inertiaCoef inertia coefficient
     * @returns {geotoolkit.controls.tools.Panning} this
     */
    geotoolkit.controls.tools.Panning.prototype.setInertia = function(inertiaCoef){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.Panning.prototype.dispose = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.Panning.prototype.setActive = function(){};

/**
 * @class geotoolkit.controls.tools.RubberBandEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info about the event
 * @param {geotoolkit.util.Rect} area selected area in the model coordinates
 */
geotoolkit.controls.tools.RubberBandEventArgs = {};
    /**
     * Return a selected area in the model coordinates
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.controls.tools.RubberBandEventArgs.prototype.getArea = function(){};

/**
 * RubberBand tool supports several events as shown below and it has several builtin functions to customise the tool.<br>
 * The rendering is based on the {@link geotoolkit.controls.tools.RubberBandRenderMode}.
 * <br>
 * <br>
 * <h5>Events {@link geotoolkit.controls.tools.RubberBand.Events}</h5>
 * <table class="params">
 * <thead>
 * <tr>
 * <th>Event</th><th>Arguments</th><th>Description</th>
 * </tr>
 * </thead>
 * <tbody>
 * <tr>
 * <td>onZoomStart</td>
 * <td>{@link geotoolkit.controls.tools.RubberBandEventArgs}</td>
 * <td>This Event is fired when the RubberBand Tool left button click occurs.</td>
 * </tr>
 * <tr>
 * <td>onZoomEnd</td>
 * <td>{@link geotoolkit.controls.tools.RubberBandEventArgs}</td>
 * <td>This Event is fired when the RubberBand Tool left button click is released.</td>
 * </tr>
 * <tr>
 * <td>onRangeChanged</td>
 * <td>{@link geotoolkit.controls.tools.RubberBandEventArgs}</td>
 * <td>This Event is fired when the RubberBand Tool is moving.</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 *
 * Tool name: 'rubberband'
 * @class geotoolkit.controls.tools.RubberBand
 * @augments geotoolkit.controls.tools.AbstractRubberTool
 * @param {geotoolkit.scene.Group} manipulatorGroup used to display temporary shapes
 * @param {geotoolkit.controls.tools.RubberBandRenderMode} [mode=geotoolkit.controls.tools.RubberBandRenderMode.Free] render mode
 * @example
 * // In order to enable the rubberband tool for widgets:
 * widget.getToolByName("rubberband").setEnabled(true);
 * @example
 * //To get the dimensions of a selected region from the rubber band tool:
 * this.rubberband.addListener(RubberBand.Events.onZoomEnd, function(sender, evt)
 * { var rect = evt.getArea(); }
 * );
 * @example
 * //To create new horizontal rubber-band tool and attach it to the specific track, it will be limited by track model limits
 * new geotoolkit.controls.tools.RubberBand(track, geotoolkit.controls.tools.RubberBandRenderMode.Horizontal)
 * @example
 * //Adding event listener for "geotoolkit.controls.tools.RubberBand.Events.onZoomEnd" in a widget
 * Widget.getToolByName('rubberband').
 * addListener(geotoolkit.controls.tools.RubberBand.Events.onZoomEnd, function(){ ..... });
 *
 */
geotoolkit.controls.tools.RubberBand = {};
    /**
     * RubberBand Events
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.RubberBand.Events = {};
        /**
         * onZoomStart
         * @type {string}
         */
        geotoolkit.controls.tools.RubberBand.Events.onZoomStart = "";
        /**
         * onZoomEnd
         * @type {string}
         */
        geotoolkit.controls.tools.RubberBand.Events.onZoomEnd = "";
        /**
         * onRangeChanged
         * @type {string}
         */
        geotoolkit.controls.tools.RubberBand.Events.onRangeChanged = "";
    /**
     * set minimum selection dimension
     * @param {geotoolkit.util.Dimension} minDimension minimum selection dimension
     * @param {boolean} [isInDevice=false] true if in device coordinates
     * @returns {geotoolkit.controls.tools.RubberBand} this
     */
    geotoolkit.controls.tools.RubberBand.prototype.setMinDimension = function(minDimension, isInDevice){};
    /**
     * Get minimum selection dimension
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.controls.tools.RubberBand.prototype.getMinDimension = function(){};
    /**
     * set minimum dimension mode
     * @param {geotoolkit.controls.tools.RubberBand.MinimumDimensionMode} mode minimum dimension mode
     * @returns {geotoolkit.controls.tools.RubberBand} this
     * @example
     * // The rubberband tool has several configuration options for controlling the maximum amount of zoom.
     * // First get rubber band tool
     * var rubberBandTool = widget.getToolByName('rubberband');
     * //
     * // The setMinDimension property can be used to limit the minimum box zoom to some fixed amount.
     * // Optional second parameter specifies whether to use model or device coordinates;
     * var minVerticalUnitsZoom = 50;
     * var useDeviceCoordinates = false;
     * rubberBandTool.setMinDimension(new geotoolkit.util.Dimension(0, minVerticalUnitsZoom), useDeviceCoordinates);\
     * //
     * // The setMinDimensionMode can be used to specify how the start/end should be adjusted if the minimum zoom level limit is reached.
     * // The smartMode expands highlighted area around selection
     * rubberBand.setMinDimensionMode(geotoolkit.controls.tools.RubberBand.MinimumDimensionMode.Smart);
     * //
     * // The hardMode expands highlighted area from the start point
     * rubberBand.setMinDimensionMode(geotoolkit.controls.tools.RubberBand.MinimumDimensionMode.Hard);
     */
    geotoolkit.controls.tools.RubberBand.prototype.setMinDimensionMode = function(mode){};
    /**
     * Get minimum dimension mode
     * @returns {geotoolkit.controls.tools.RubberBand.MinimumDimensionMode}
     */
    geotoolkit.controls.tools.RubberBand.prototype.getMinDimensionMode = function(){};
    /**
     * Enum of rubberband Minimum Dimension modes
     * @enum
     * @readonly
     */
    geotoolkit.controls.tools.RubberBand.MinimumDimensionMode = {};
        /**
         * Expands highlighted area from the start point
         * @type {number}
         */
        geotoolkit.controls.tools.RubberBand.MinimumDimensionMode.Hard = NaN;
        /**
         * Expands highlighted area around selection
         * @type {number}
         */
        geotoolkit.controls.tools.RubberBand.MinimumDimensionMode.Smart = NaN;
    /**
     * Sets rubberband rendering mode
     * @param {geotoolkit.controls.tools.RubberBandRenderMode} mode rubberband rendering mode
     * @returns {geotoolkit.controls.tools.RubberBand} this
     */
    geotoolkit.controls.tools.RubberBand.prototype.setMode = function(mode){};
    /**
     * Set auto-disabled mode
     * @param {boolean} mode does the RB automatically disable itself on zoom End
     * @returns {geotoolkit.controls.tools.RubberBand} this
     */
    geotoolkit.controls.tools.RubberBand.prototype.setAutoDisabled = function(mode){};
    /**
     * Get auto-disabled mode
     * @returns {boolean} does the RB automatically disable itself on zoom End
     */
    geotoolkit.controls.tools.RubberBand.prototype.isAutoDisabled = function(){};
    /**
     * Gets rubberband rendering mode
     * @returns {geotoolkit.controls.tools.RubberBandRenderMode} size mode
     */
    geotoolkit.controls.tools.RubberBand.prototype.getMode = function(){};
    /**
     * Sets the rubberbands Target
     * @param {geotoolkit.scene.CompositeNode} target rubberbands Target
     * @returns {geotoolkit.controls.tools.RubberBand} this
     */
    geotoolkit.controls.tools.RubberBand.prototype.setTarget = function(target){};
    /**
     * Sets line style
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.RubberBand} this
     */
    geotoolkit.controls.tools.RubberBand.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Sets fill style
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.RubberBand} this
     */
    geotoolkit.controls.tools.RubberBand.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Set Settings
     * @param {object} [options] JSON containing options
     * @param {boolean} [options.enabled] is rubber band enabled
     * @param {object | geotoolkit.attributes.LineStyle} [options.linestyle] rubber band linestyle
     * @param {object | geotoolkit.attributes.FillStyle} [options.fillstyle] rubber band fillstyle
     * @param {boolean} [options.autodisabled] does rubber band automatically disabled on zoom end
     * @returns {geotoolkit.controls.tools.RubberBand} this
     */
    geotoolkit.controls.tools.RubberBand.prototype.setSettings = function(options){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.RubberBand.prototype.dispose = function(){};

/**
 * @class geotoolkit.controls.tools.PolygonToolEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info about the event
 * @param {object} coordinates
 * @param {Array.<Number>} coordinates.x x coordinate
 * @param {Array.<Number>} coordinates.y y coordinate
 */
geotoolkit.controls.tools.PolygonToolEventArgs = {};
    /**
     * Gets polygon's coordinates in model coordinates
     * @returns {object} coordinates
     */
    geotoolkit.controls.tools.PolygonToolEventArgs.prototype.getCoordinates = function(){};

/**
 * PolygonTool
 * <br>
 * <br>
 * <h5>Events {@link geotoolkit.controls.tools.PolygonTool}</h5>
 * <table class="params">
 * <thead>
 * <tr>
 * <th>Event</th><th>Arguments</th><th>Description</th>
 * </tr>
 * </thead>
 * <tbody>
 * <tr>
 * <td>onStart</td>
 * <td>{@link geotoolkit.controls.tools.PolygonToolEventArgs}</td>
 * <td>This Event is fired when very first left button click occurs.</td>
 * </tr>
 * <tr>
 * <td>onContinue</td>
 * <td>{@link geotoolkit.controls.tools.PolygonToolEventArgs}</td>
 * <td>This Event is fired when subsequent left button clicks occurs.</td>
 * </tr>
 * <tr>
 * <td>onEnd</td>
 * <td>{@link geotoolkit.controls.tools.PolygonToolEventArgs}</td>
 * <td>This Event is fired when right button click occurs.</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 * Tool name: 'polygontool'
 * @class geotoolkit.controls.tools.PolygonTool
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.scene.CompositeNode} manipulatorLayer manipulator layer
 */
geotoolkit.controls.tools.PolygonTool = {};
    /**
     * PolygonTool Events
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.PolygonTool.Events = {};
        /**
         * onStart
         * @type {string}
         */
        geotoolkit.controls.tools.PolygonTool.Events.onStart = "";
        /**
         * onContinue
         * @type {string}
         */
        geotoolkit.controls.tools.PolygonTool.Events.onContinue = "";
        /**
         * onEnd
         * @type {string}
         */
        geotoolkit.controls.tools.PolygonTool.Events.onEnd = "";
    /**
     * Sets line style
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.PolygonTool} this
     */
    geotoolkit.controls.tools.PolygonTool.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Return line style
     * @returns {geotoolkit.attributes.LineStyle} line style
     */
    geotoolkit.controls.tools.PolygonTool.prototype.getLineStyle = function(){};
    /**
     * Sets fill style
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.PolygonTool} this
     */
    geotoolkit.controls.tools.PolygonTool.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Sets line style of the start and end symbols
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.PolygonTool} this
     */
    geotoolkit.controls.tools.PolygonTool.prototype.setSymbolLineStyle = function(lineStyle, merge){};
    /**
     * Return symbol line style
     * @returns {geotoolkit.attributes.LineStyle} line style
     */
    geotoolkit.controls.tools.PolygonTool.prototype.getSymbolLineStyle = function(){};
    /**
     * Sets fill style of the start and end symbols
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.PolygonTool} this
     */
    geotoolkit.controls.tools.PolygonTool.prototype.setSymbolFillStyle = function(fillStyle, merge){};
    /**
     * Sets visibility of the start and end symbols.
     * @param {boolean} visible visibility of symbols
     * @returns {geotoolkit.controls.tools.PolygonTool} this
     */
    geotoolkit.controls.tools.PolygonTool.prototype.setSymbolVisibility = function(visible){};
    /**
     * Sets visibility of the start line.
     * @param {boolean} visible visibility of line
     * @returns {geotoolkit.controls.tools.PolygonTool} this
     */
    geotoolkit.controls.tools.PolygonTool.prototype.setStartLineVisibility = function(visible){};
    /**
     * Sets visibility of the text.
     * @param {boolean} visible visibility of text
     * @returns {geotoolkit.controls.tools.PolygonTool} this
     */
    geotoolkit.controls.tools.PolygonTool.prototype.setTextVisibility = function(visible){};
    /**
     * Sets text style of the text.
     * @param {geotoolkit.attributes.TextStyle | string | object} textStyle text style of text
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.PolygonTool} this
     */
    geotoolkit.controls.tools.PolygonTool.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * @returns {geotoolkit.scene.shapes.Polygon|null}
     */
    geotoolkit.controls.tools.PolygonTool.prototype.getPolygon = function(){};
    /**
     * @override
     * @protected
     */
    geotoolkit.controls.tools.PolygonTool.prototype.onEnabledStateChanged = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.PolygonTool.prototype.setActive = function(){};
    /**
     * Remove last point from selection area
     * @returns {geotoolkit.controls.tools.PolygonTool} this
     */
    geotoolkit.controls.tools.PolygonTool.prototype.removeLastPoint = function(){};

/**
 * SelectionEventArgs
 *
 * @class geotoolkit.controls.tools.SelectionEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info about the event arguments
 * @param {Array.<geotoolkit.scene.Node>} selection array of selected nodes
 * @param {geotoolkit.controls.tools.SelectionMode|string} selectionMode
 */
geotoolkit.controls.tools.SelectionEventArgs = {};
    /**
     * returns selection mode
     * @returns {geotoolkit.controls.tools.SelectionMode|string} selection mode
     */
    geotoolkit.controls.tools.SelectionEventArgs.prototype.getSelectionMode = function(){};
    /**
     * returns array of selected nodes
     * @returns {Array<geotoolkit.scene.Node>} array of selected nodes
     */
    geotoolkit.controls.tools.SelectionEventArgs.prototype.getSelection = function(){};
    /**
     * set array of selected nodes
     * @param {Array<geotoolkit.scene.Node>} selection array of selected nodes
     * @returns {geotoolkit.controls.tools.SelectionEventArgs} this
     */
    geotoolkit.controls.tools.SelectionEventArgs.prototype.setSelection = function(selection){};

/**
 * Selection
 * <br>
 * <br>
 * <h5>Events {@link geotoolkit.controls.tools.Selection.Events}</h5>
 * <table class="params">
 * <thead>
 * <tr>
 * <th>Event</th><th>Arguments</th><th>Description</th>
 * </tr>
 * </thead>
 * <tbody>
 * <tr>
 * <td>onPick</td>
 * <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
 * <td>This Event is fired when the Selection Tool select a visual.</td>
 * </tr>
 * <tr>
 * <td>onSelectionEnd</td>
 * <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
 * <td>This Event is fired when the Selection Tool select a visual. (similar to Selection.Events.onPick)</td>
 * </tr>
 * <tr>
 * <td>onSelectionChanged</td>
 * <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
 * <td>This Event is fired when the Selection Tool select a visual and it is different from previous selection.</td>
 * </tr>
 * <tr>
 * <td>beforeSelectionChange</td>
 * <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
 * <td>This Event is fired before the Selection Tool select a visual and it is different from previous selection.</td>
 * </tr>
 * <tr>
 * <td>onDoubleClick</td>
 * <td>{@link geotoolkit.controls.tools.SelectionEventArgs}</td>
 * <td>This Event is fired when the Selection Tool select a visual with a double click.</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 *
 * Tool name: 'pick'
 * @class geotoolkit.controls.tools.Selection
 * @augments geotoolkit.controls.tools.AbstractRubberTool
 * @param {geotoolkit.scene.CompositeNode} manipulatorGroup used to display temporary shapes
 * @param {geotoolkit.controls.tools.RubberBandRenderMode|number} [mode] render mode, the rubberband selection mode, this will define how the rubberband will behave when selecting a rectangle
 *
 * @example
 * //when you click on a tool for e.g the rubberband tool button, the associated tool can be activated or deactivated on all widgets in the plot.
 * geotoolkit.selection.from(mainPlot.getRoot())
 * .where( function(node){ return node instanceof geotoolkit.widgets.BaseWidget; })
 * .execute( function(widget) {
 * var rubberBandTool = widget.getToolByName('rubberband');
 * if(rubberBandTool != null)
 * rubberBandTool.setEnabled(true); //or false if you want to deactivate it
 * });
 *
 */
geotoolkit.controls.tools.Selection = {};
    /**
     * Selection Events
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.Selection.Events = {};
        /**
         * onPick
         * @type {string}
         */
        geotoolkit.controls.tools.Selection.Events.onPick = "";
        /**
         * onSelectionEnd
         * @type {string}
         */
        geotoolkit.controls.tools.Selection.Events.onSelectionEnd = "";
        /**
         * onSelectionChanged
         * @type {string}
         */
        geotoolkit.controls.tools.Selection.Events.onSelectionChanged = "";
        /**
         * beforeSelectionChange
         * @type {string}
         */
        geotoolkit.controls.tools.Selection.Events.beforeSelectionChange = "";
        /**
         * onDoubleClick
         * @type {string}
         */
        geotoolkit.controls.tools.Selection.Events.onDoubleClick = "";
    /**
     * set radius for touch selection
     * @param {number} radius radius for touch selection
     * @returns {geotoolkit.controls.tools.Selection} this
     */
    geotoolkit.controls.tools.Selection.prototype.setTouchRadius = function(radius){};
    /**
     * set radius for mouse selection
     * @param {number} radius radius for mouse selection
     * @returns {geotoolkit.controls.tools.Selection} this
     */
    geotoolkit.controls.tools.Selection.prototype.setMouseRadius = function(radius){};
    /**
     * get radius for touch selection
     * @returns {number}
     */
    geotoolkit.controls.tools.Selection.prototype.getTouchRadius = function(){};
    /**
     * get radius for mouse selection
     * @returns {number}
     */
    geotoolkit.controls.tools.Selection.prototype.getMouseRadius = function(){};
    /**
     * set tool selection mode
     * @param {geotoolkit.controls.tools.SelectionMode|string} mode tool selection mode
     * @returns {geotoolkit.controls.tools.Selection} this
     */
    geotoolkit.controls.tools.Selection.prototype.setSelectionMode = function(mode){};
    /**
     * get tool selection mode
     * @returns {geotoolkit.controls.tools.SelectionMode|string}
     */
    geotoolkit.controls.tools.Selection.prototype.getSelectionMode = function(){};
    /**
     * Sets tool rubberband selection mode
     * @param {geotoolkit.controls.tools.RubberBandMode|string} mode tool rubberband selection mode
     * @returns {geotoolkit.controls.tools.Selection} this
     */
    geotoolkit.controls.tools.Selection.prototype.setRubberBandMode = function(mode){};
    /**
     * Gets tool rubberband selection mode
     * @returns {geotoolkit.controls.tools.RubberBandMode|string}
     */
    geotoolkit.controls.tools.Selection.prototype.getRubberBandMode = function(){};
    /**
     * Sets tool pointer selection mode
     * @param {geotoolkit.controls.tools.PointerMode|string} mode tool pointer selection mode
     * @returns {geotoolkit.controls.tools.Selection} this
     */
    geotoolkit.controls.tools.Selection.prototype.setPointerMode = function(mode){};
    /**
     * Gets tool pointer selection mode
     * @returns {geotoolkit.controls.tools.PointerMode|string}
     */
    geotoolkit.controls.tools.Selection.prototype.getPointerMode = function(){};
    /**
     * sets if on Hover selection is enabled
     * @deprecated since 2.6 use setPointerMode instead
     * @param {boolean} state sets if on Hover selection is enabled
     * @returns {geotoolkit.controls.tools.Selection} this
     */
    geotoolkit.controls.tools.Selection.prototype.setOnHoverSelection = function(state){};
    /**
     * gets if on hover selection is enabled
     * @deprecated since 2.6 use getPointerMode instead
     * @returns {boolean}
     */
    geotoolkit.controls.tools.Selection.prototype.getOnHoverSelection = function(){};
    /**
     * set filter handler
     * @param {function()} filter This allows to filter selected nodes.
     * @returns {geotoolkit.controls.tools.Selection}
     */
    geotoolkit.controls.tools.Selection.prototype.setNodeFilter = function(filter){};
    /**
     * Return start point of selection
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.tools.Selection.prototype.getStartPoint = function(){};
    /**
     * Return end point of selection
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.tools.Selection.prototype.getEndPoint = function(){};
    /**
     * pick node
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {Array<geotoolkit.scene.Node>}
     */
    geotoolkit.controls.tools.Selection.prototype.pick = function(x, y){};
    /**
     * gets the currently selected items
     * @returns {Array<geotoolkit.scene.Node>}
     */
    geotoolkit.controls.tools.Selection.prototype.getSelection = function(){};
    /**
     * sets the currently selected items
     * @param {Array<geotoolkit.scene.Node>} selection selection
     * @returns {geotoolkit.controls.tools.Selection} this
     */
    geotoolkit.controls.tools.Selection.prototype.setSelection = function(selection){};
    /**
     * Sets line style
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.Selection} this
     */
    geotoolkit.controls.tools.Selection.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Sets fill style
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.Selection} this this
     */
    geotoolkit.controls.tools.Selection.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Set Settings
     * @param {object} [options] JSON containing options
     * @param {boolean} [options.enabled] is selection enabled
     * @param {geotoolkit.controls.tools.SelectionMode|string} [options.mode] selection mode
     * @param {object | geotoolkit.attributes.LineStyle} [options.linestyle] rubber band selection linestyle
     * @param {object | geotoolkit.attributes.FillStyle} [options.fillstyle] rubber band selection fillstyle
     * @param {boolean} [options.autodisabled] does selection automatically disabled on selection changed
     * @param {number} [options.mouseradius] apply mouse selection radius setting
     * @param {number} [options.touchradius] apply touch selection radius setting
     * @returns {geotoolkit.controls.tools.Selection} this
     */
    geotoolkit.controls.tools.Selection.prototype.setSettings = function(options){};
    /**
     * Set auto-disabled mode
     * @param {boolean} mode does the selection automatically disable itself on selection changed
     * @returns {geotoolkit.controls.tools.Selection} this
     */
    geotoolkit.controls.tools.Selection.prototype.setAutoDisabled = function(mode){};
    /**
     * Get auto-disabled mode
     * @returns {boolean} does the selection automatically disable itself on selection changed
     */
    geotoolkit.controls.tools.Selection.prototype.isAutoDisabled = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.Selection.prototype.dispose = function(){};

/**
 * @class geotoolkit.controls.tools.PinchToZoomEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info about the event
 * @param {geotoolkit.util.Rect} visibleModelLimits visible model limits
 */
geotoolkit.controls.tools.PinchToZoomEventArgs = {};
    /**
     * Returns the visible model limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.controls.tools.PinchToZoomEventArgs.prototype.getVisibleModelLimits = function(){};

/**
 * PinchToZoom tool
 * <br>
 * <br>
 * <h5>Events {@link geotoolkit.controls.tools.PinchToZoom.Events}</h5>
 * <table class="params">
 * <thead>
 * <tr>
 * <th>Event</th><th>Arguments</th><th>Description</th>
 * </tr>
 * </thead>
 * <tbody>
 * <tr>
 * <td>onZoomStart</td>
 * <td>{@link geotoolkit.controls.tools.PinchToZoomEventArgs}</td>
 * <td>This Event is fired when the Pinch To Zoom Tool start Zooming</td>
 * </tr>
 * <tr>
 * <td>onZoom</td>
 * <td>{@link geotoolkit.controls.tools.PinchToZoomEventArgs}</td>
 * <td>This Event is fired when the Pinch To Zoom Tool is Zooming</td>
 * </tr>
 * <tr>
 * <td>onZoomEnd</td>
 * <td>{@link geotoolkit.controls.tools.PinchToZoomEventArgs}</td>
 * <td>This Event is fired when the Pinch To Zoom Tool end Zooming</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 * Tool name: 'pinchtozoom'
 * @class geotoolkit.controls.tools.PinchToZoom
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.scene.CompositeNode} layer layer on which pinch to zoom will be performed
 * @param {geotoolkit.controls.tools.PinchToZoomModes} [mode] enum of PinchToZoomModes
 */
geotoolkit.controls.tools.PinchToZoom = {};
    /**
     * PinchToZoom Events
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.PinchToZoom.Events = {};
        /**
         * onZoom
         * @type {string}
         */
        geotoolkit.controls.tools.PinchToZoom.Events.onZoom = "";
        /**
         * onZoomEnd
         * @type {string}
         */
        geotoolkit.controls.tools.PinchToZoom.Events.onZoomEnd = "";
        /**
         * onZoomStart
         * @type {string}
         */
        geotoolkit.controls.tools.PinchToZoom.Events.onZoomStart = "";
    /**
     * Sets zoom mode
     * @param {geotoolkit.controls.tools.PinchToZoomModes} [mode] enum of PinchToZoomModes
     * @returns {geotoolkit.controls.tools.PinchToZoom} this
     */
    geotoolkit.controls.tools.PinchToZoom.prototype.setMode = function(mode){};
    /**
     * Return position relative to the canvas
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs info about the event arguments with respect to position
     * @param {geotoolkit.plot.Plot} externalPlot optional parameter
     * @returns {Array.<geotoolkit.util.Point>} array of geotoolkit.util.Point
     */
    geotoolkit.controls.tools.PinchToZoom.prototype.pageToCanvas = function(eventArgs, externalPlot){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.PinchToZoom.prototype.start = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.PinchToZoom.prototype.stop = function(){};

/**
 * @class geotoolkit.controls.tools.PolygonSelectionEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info about the event
 * @param {Array.<geotoolkit.scene.Node>} selection array of selected nodes
 * @param {object} coordinates
 * @param {number[]} coordinates.x x coordinate
 * @param {number[]} coordinates.y y coordinate
 */
geotoolkit.controls.tools.PolygonSelectionEventArgs = {};
    /**
     * gets array of selected nodes
     * @returns {Array.<geotoolkit.scene.Node>} array of selected nodes
     */
    geotoolkit.controls.tools.PolygonSelectionEventArgs.prototype.getSelection = function(){};
    /**
     * set selection
     * @param {Array.<geotoolkit.scene.Node>} selection array of selected nodes
     * @returns {geotoolkit.controls.tools.PolygonSelectionEventArgs}
     */
    geotoolkit.controls.tools.PolygonSelectionEventArgs.prototype.setSelection = function(selection){};

/**
 * PolygonSelection
 * <br>
 * <br>
 * <h5>Events {@link geotoolkit.controls.tools.PolygonSelection.Events}</h5>
 * <table class="params">
 * <thead>
 * <tr>
 * <th>Event</th><th>Arguments</th><th>Description</th>
 * </tr>
 * </thead>
 * <tbody>
 * <tr>
 * <td>onSelectionEnd</td>
 * <td>{@link geotoolkit.controls.tools.PolygonSelectionEventArgs}</td>
 * <td>This Event is fired when the Selection Tool select a visual. (similar to Selection.Events.onPick)</td>
 * </tr>
 * <tr>
 * <td>onSelectionChanged</td>
 * <td>{@link geotoolkit.controls.tools.PolygonSelectionEventArgs}</td>
 * <td>This Event is fired when the Selection Tool select a visual and it is different from previous selection.</td>
 * </tr>
 * <tr>
 * <td>beforeSelectionChange</td>
 * <td>{@link geotoolkit.controls.tools.PolygonSelectionEventArgs}</td>
 * <td>This Event is fired before the Selection Tool select a visual and it is different from previous selection.</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 *
 * Tool name: 'polygon-selection'
 * @class geotoolkit.controls.tools.PolygonSelection
 * @augments geotoolkit.controls.tools.PolygonTool
 * @param {geotoolkit.scene.Group} manipulatorGroup used to display temporary shapes
 */
geotoolkit.controls.tools.PolygonSelection = {};
    /**
     * PolygonSelection Events
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.PolygonSelection.Events = {};
        /**
         * onSelectionEnd
         * @type {string}
         */
        geotoolkit.controls.tools.PolygonSelection.Events.onSelectionEnd = "";
        /**
         * onSelectionChanged
         * @type {string}
         */
        geotoolkit.controls.tools.PolygonSelection.Events.onSelectionChanged = "";
        /**
         * beforeSelectionChange
         * @type {string}
         */
        geotoolkit.controls.tools.PolygonSelection.Events.beforeSelectionChange = "";
    /**
     * gets the currently selected items
     * @returns {Array}
     */
    geotoolkit.controls.tools.PolygonSelection.prototype.getSelection = function(){};
    /**
     * set filter handler
     * @param {function} filter This allows to filter selected nodes.
     * @returns {geotoolkit.controls.tools.PolygonSelection} this
     */
    geotoolkit.controls.tools.PolygonSelection.prototype.setNodeFilter = function(filter){};
    /**
     * Set allow intersection
     * @param {boolean} mode will this select items that intersect
     * @returns {geotoolkit.controls.tools.PolygonSelection} this
     */
    geotoolkit.controls.tools.PolygonSelection.prototype.setAllowIntersection = function(mode){};
    /**
     * Get allow intersection
     * @returns {boolean} will this select items that intersect
     */
    geotoolkit.controls.tools.PolygonSelection.prototype.getAllowIntersection = function(){};
    /**
     * Set even odd mode
     * @param {boolean} mode even odd mode
     * @returns {geotoolkit.controls.tools.PolygonSelection} this
     */
    geotoolkit.controls.tools.PolygonSelection.prototype.setEvenOddMode = function(mode){};
    /**
     * Get even odd mode
     * @returns {boolean} will this use even odd mode or not
     */
    geotoolkit.controls.tools.PolygonSelection.prototype.getEvenOddMode = function(){};
    /**
     * Set auto-disabled mode
     * @param {boolean} mode does the selection automatically disable itself on selection changed
     * @returns {geotoolkit.controls.tools.PolygonSelection} this
     */
    geotoolkit.controls.tools.PolygonSelection.prototype.setAutoDisabled = function(mode){};
    /**
     * Get auto-disabled mode
     * @returns {boolean} does the selection automatically disable itself on selection changed
     */
    geotoolkit.controls.tools.PolygonSelection.prototype.isAutoDisabled = function(){};

/**
 * Add cursor to colorbar, which shows value from group
 * @augments {geotoolkit.controls.tools.AbstractTool}
 * @class geotoolkit.controls.tools.ColorBarCursorTool
 * @throws error if ColorBar is not defined
 * @param {object} options tool options
 * @param {geotoolkit.controls.shapes.ColorBar} options.colorbar color bar
 * @param {string} [options.name='colorbarcursor'] name of the tool
 * @param {number} [options.offset=0] offset of cursor across color bar
 * @param {geotoolkit.scene.CompositeNode} [options.group] manipulator layer, by default parent of color bar
 * @param {geotoolkit.controls.tools.ColorBarCursorTool.SymbolAlignment} [options.symbolalignment=geotoolkit.controls.tools.ColorBarCursorTool.SymbolAlignment.Both] option of orientation of cursor
 * @param {geotoolkit.scene.shapes.Symbol} [options.symbol] symbol, by default black triangle
 * @param {function()} [options.callback] callback to return current position in terms of value for colorbar
 * @param {function()} [options.init=null] callback function to initialize tool
 */
geotoolkit.controls.tools.ColorBarCursorTool = {};
    /**
     * Enum for symbol alignment
     * @enum
     * @readonly
     */
    geotoolkit.controls.tools.ColorBarCursorTool.SymbolAlignment = {};
        /**
         * Left
         * @type {string}
         */
        geotoolkit.controls.tools.ColorBarCursorTool.SymbolAlignment.Left = "";
        /**
         * Right
         * @type {string}
         */
        geotoolkit.controls.tools.ColorBarCursorTool.SymbolAlignment.Right = "";
        /**
         * Both
         * @type {string}
         */
        geotoolkit.controls.tools.ColorBarCursorTool.SymbolAlignment.Both = "";
    /**
     * set cursor offset across the colorbar
     * @param {number} offset offset
     * @returns {geotoolkit.controls.tools.ColorBarCursorTool} this
     */
    geotoolkit.controls.tools.ColorBarCursorTool.prototype.setOffset = function(offset){};
    /**
     * set cursor position along the colorbar
     * @param {number} position position
     * @returns {geotoolkit.controls.tools.ColorBarCursorTool} this
     */
    geotoolkit.controls.tools.ColorBarCursorTool.prototype.setPosition = function(position){};
    /**
     * update cursor position along the colorbar
     * @returns {geotoolkit.controls.tools.ColorBarCursorTool} this
     */
    geotoolkit.controls.tools.ColorBarCursorTool.prototype.updatePosition = function(){};
    /**
     * Sets new symbol
     * @param {geotoolkit.scene.shapes.Symbol} symbol new symbol
     * @returns {geotoolkit.controls.tools.ColorBarCursorTool} this
     */
    geotoolkit.controls.tools.ColorBarCursorTool.prototype.setSymbol = function(symbol){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.ColorBarCursorTool.prototype.dispose = function(){};

/**
 * This tool provides DOM features into geotoolkit scene <br>
 * 1. events like click, mouseover etc. <br>
 * 2. css pseudo-class 'hover', by default this tool sets 'hover' on top most node <br>
 * If you want another strategy you should use geotoolkit.controls.tools.DOMSupport#setNodeFilter.
 * This tool sets 'hover' on all nodes returned by this filter
 * @class geotoolkit.controls.tools.DOMSupport
 * @augments geotoolkit.controls.tools.Selection
 * @param {geotoolkit.scene.CompositeNode} layer manipulator layer
 */
geotoolkit.controls.tools.DOMSupport = {};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.DOMSupport.prototype.internalSelect = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.DOMSupport.prototype.onMouseDown = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.DOMSupport.prototype.onMouseUp = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.DOMSupport.prototype.onMouseMove = function(){};

/**
 * Hover event args for table view
 *
 * @class geotoolkit.controls.tools.tableview.HoverEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs info about arguments of the event
 * @param {number} row rows
 * @param {number} column columns
 * @param {geotoolkit.util.Point} mousePosition
 */
geotoolkit.controls.tools.tableview.HoverEventArgs = {};
    /**
     * Return row
     * @returns {number}
     */
    geotoolkit.controls.tools.tableview.HoverEventArgs.prototype.getRowNumber = function(){};
    /**
     * Return column
     * @returns {number}
     */
    geotoolkit.controls.tools.tableview.HoverEventArgs.prototype.getColumnNumber = function(){};
    /**
     * Return mouse position in cell coordinate
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.controls.tools.tableview.HoverEventArgs.prototype.getMousePosition = function(){};

/**
 * Defines Highlight tool for Table View shape
 * <br>
 * <br>
 * <h5>Events</h5>
 * <table class="params">
 * <thead>
 * <tr>
 * <th>Event</th><th>Arguments</th><th>Description</th>
 * </tr>
 * </thead>
 * <tbody>
 * <tr>
 * <td>Highlight.Events.onHover</td>
 * <td>geotoolkit.controls.tools.tableview.HoverEventArgs</td>
 * <td>This Event is fired when the Pointer is hover an table element.</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 *
 * Tool name: 'Highlight'
 * @class geotoolkit.controls.tools.tableview.Highlight
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.controls.shapes.TableView} tableView current Table View Shape
 */
geotoolkit.controls.tools.tableview.Highlight = {};
    /**
     * Events
     * @enum
     * @readonly
     */
    geotoolkit.controls.tools.tableview.Highlight.Events = {};
        /**
         * onHover
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.Highlight.Events.onHover = "";
    /**
     * Fires onHover events
     *
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs information about event arguments
     */
    geotoolkit.controls.tools.tableview.Highlight.prototype.onMouseMove = function(eventArgs){};

/**
 * Defines Splitter tool for Table View shape
 *
 * Tool name: 'Splitter'
 * @class geotoolkit.controls.tools.tableview.Splitter
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.controls.shapes.TableView} tableView table view shape
 */
geotoolkit.controls.tools.tableview.Splitter = {};
    /**
     * Events
     * @enum
     * @readonly
     */
    geotoolkit.controls.tools.tableview.Splitter.Events = {};
        /**
         * onResize
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.Splitter.Events.onResize = "";
    /**
     * @protected
     */
    geotoolkit.controls.tools.tableview.Splitter.prototype.onActiveStateChanged = function(){};
    /**
     * return splitter size
     * @returns {number}
     */
    geotoolkit.controls.tools.tableview.Splitter.prototype.getSize = function(){};
    /**
     * set splitter size
     * @param {number} size splitter size
     * @returns {geotoolkit.controls.tools.tableview.Splitter}
     */
    geotoolkit.controls.tools.tableview.Splitter.prototype.setSize = function(size){};
    /**
     * Sets line style
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.controls.tools.tableview.Splitter} this
     */
    geotoolkit.controls.tools.tableview.Splitter.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Return line style
     *
     * @returns {geotoolkit.attributes.LineStyle} lineStyle current line style
     */
    geotoolkit.controls.tools.tableview.Splitter.prototype.getLineStyle = function(){};
    /**
     * Sets fill style
     *
     * @param {geotoolkit.attributes.FillStyle | geotoolkit.attributes.GradientStyle | object} fillStyle
     * a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground
     * @returns {geotoolkit.controls.tools.tableview.Splitter} this
     */
    geotoolkit.controls.tools.tableview.Splitter.prototype.setFillStyle = function(fillStyle){};
    /**
     * Return fill style
     *
     * @returns {geotoolkit.attributes.FillStyle} fillStyle current fill style
     */
    geotoolkit.controls.tools.tableview.Splitter.prototype.getFillStyle = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.tableview.Splitter.prototype.start = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.tableview.Splitter.prototype.stop = function(){};
    /**
     * Fires onHover events
     *
     * @param {geotoolkit.plot.Plot} plot
     * @param {geotoolkit.util.Point} position
     */
    geotoolkit.controls.tools.tableview.Splitter.prototype.applyMouseMove = function(plot, position){};

/**
 * Defines Column manipulator for Table View shape
 *
 * Tool name: 'HeaderHandler'
 * @class geotoolkit.controls.tools.tableview.HeaderHandler
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.controls.shapes.TableView} tableView table view shape
 */
geotoolkit.controls.tools.tableview.HeaderHandler = {};
    /**
     * Events
     * @enum
     * @readonly
     */
    geotoolkit.controls.tools.tableview.HeaderHandler.Events = {};
        /**
         * onHeaderHover
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.HeaderHandler.Events.onHeaderHover = "";
        /**
         * onButtonHover
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.HeaderHandler.Events.onButtonHover = "";
        /**
         * onClick
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.HeaderHandler.Events.onClick = "";
    /**
     * Specify handle size
     * @param {geotoolkit.util.Dimension} size
     * @returns {geotoolkit.controls.tools.tableview.HeaderHandler} this
     */
    geotoolkit.controls.tools.tableview.HeaderHandler.prototype.setSize = function(size){};
    /**
     * Returns handle size
     * @returns {geotoolkit.util.Dimension}
     */
    geotoolkit.controls.tools.tableview.HeaderHandler.prototype.getSize = function(){};
    /**
     * Specify handle margin from top right corner
     * @param {geotoolkit.util.Dimension} margin
     * @returns {geotoolkit.controls.tools.tableview.HeaderHandler}
     */
    geotoolkit.controls.tools.tableview.HeaderHandler.prototype.setMargin = function(margin){};
    /**
     * Returns handle margin
     * @returns {geotoolkit.util.Dimension} margin
     */
    geotoolkit.controls.tools.tableview.HeaderHandler.prototype.getMargin = function(){};

/**
 * Defines Column manipulator for Table View shape
 *
 * Tool name: 'ColumnHandler'
 * @class geotoolkit.controls.tools.tableview.ColumnHandler
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.controls.shapes.TableView} tableView table view shape
 */
geotoolkit.controls.tools.tableview.ColumnHandler = {};
    /**
     * Events
     * @enum
     * @readonly
     */
    geotoolkit.controls.tools.tableview.ColumnHandler.Events = {};
        /**
         * onStart
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.ColumnHandler.Events.onStart = "";
        /**
         * onHover
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.ColumnHandler.Events.onHover = "";
        /**
         * onMove
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.ColumnHandler.Events.onMove = "";
        /**
         * onScroll
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.ColumnHandler.Events.onScroll = "";
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.tableview.ColumnHandler.prototype.start = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.tableview.ColumnHandler.prototype.stop = function(){};
    /**
     * @protected
     */
    geotoolkit.controls.tools.tableview.ColumnHandler.prototype.onActiveStateChanged = function(){};

/**
 * Defines Row manipulator for Table View shape
 *
 * Tool name: 'RowHandler'
 * @class geotoolkit.controls.tools.tableview.RowHandler
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.controls.shapes.TableView} tableView table view shape
 */
geotoolkit.controls.tools.tableview.RowHandler = {};
    /**
     * Events
     * @enum
     * @readonly
     */
    geotoolkit.controls.tools.tableview.RowHandler.Events = {};
        /**
         * onStart
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.RowHandler.Events.onStart = "";
        /**
         * onHover
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.RowHandler.Events.onHover = "";
        /**
         * onMove
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.RowHandler.Events.onMove = "";
        /**
         * onScroll
         * @type {string}
         */
        geotoolkit.controls.tools.tableview.RowHandler.Events.onScroll = "";
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.tableview.RowHandler.prototype.start = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.tableview.RowHandler.prototype.stop = function(){};
    /**
     * @protected
     */
    geotoolkit.controls.tools.tableview.RowHandler.prototype.onActiveStateChanged = function(){};

/**
 * <p>TreemapLevelTool handles visualization of data according to hierarchy.</p>
 * @class geotoolkit.controls.tools.treemap.TreemapLevelTool
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {object} options tool options
 * @param {geotoolkit.scene.CompositeNode} options.group - manipulator layer
 * @param {string} [options.name='level-manipulator'] - name of the tool
 * @param {geotoolkit.controls.shapes.Treemap} options.chart chart shape
 * @param {function} [options.callback] callback to return information about current level and it's parent nodes. callback return object {'list' :[...], 'action': 'added' / 'removed} depending on operation.
 */
geotoolkit.controls.tools.treemap.TreemapLevelTool = {};

/**
 * Tool name: 'Highlight'
 * @class geotoolkit.controls.tools.HeatMap.Highlight
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.controls.shapes.HeatMap} heatmap current heat map shape
 */
geotoolkit.controls.tools.HeatMap.Highlight = {};
    /**
     * Highlight the cell when move the mouse
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs information about event arguments
     */
    geotoolkit.controls.tools.HeatMap.Highlight.prototype.onMouseMove = function(eventArgs){};

/**
 * HorizontalSplitterEventArgs
 * @class geotoolkit.controls.tools.splitter.HorizontalSplitterEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs info about the event argments
 * @param {Number} delta delta
 * @param {object} affectedPlots json object contains information about affected plots
 * @param {geotoolkit.scene.Group|null} [affectedPlots.top=null] top plot
 * @param {geotoolkit.scene.Group|null} [affectedPlots.bottom=null] bottom plot
 */
geotoolkit.controls.tools.splitter.HorizontalSplitterEventArgs = {};
    /**
     * Return effective delta
     * @returns {Number}
     */
    geotoolkit.controls.tools.splitter.HorizontalSplitterEventArgs.prototype.getDelta = function(){};
    /**
     * Returns affected plots
     * @returns {object} plots
     * @returns {geotoolkit.scene.Group|null} plots.top top plot
     * @returns {geotoolkit.scene.Group|null} plots.bottom bottom plot
     */
    geotoolkit.controls.tools.splitter.HorizontalSplitterEventArgs.prototype.getPlots = function(){};

/**
 * Creates default implementation of the horizontal splitter
 *
 * <br>
 * <br>
 * <h5>Events</h5>
 * <table class="params">
 * <thead>
 * <tr>
 * <th>Event</th><th>Arguments</th><th>Description</th>
 * </tr>
 * </thead>
 * <tbody>
 * <tr>
 * <td>HorizontalSplitter.Events.onPlotSizeChanged</td>
 * <td>geotoolkit.controls.tools.splitter.HorizontalSplitterEventArgs</td>
 * <td>This Event is fired when the Splitter has moved.</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 *
 * Tool name: 'horizontal-splitter'
 * @class geotoolkit.controls.tools.splitter.HorizontalSplitter
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.scene.Group} manipulatorLayer layer for holding temporary shapes
 */
geotoolkit.controls.tools.splitter.HorizontalSplitter = {};
    /**
     * Events
     * @enum
     * @readonly
     */
    geotoolkit.controls.tools.splitter.HorizontalSplitter.Events = {};
        /**
         * onPlotSizeChanged
         * @type {string}
         */
        geotoolkit.controls.tools.splitter.HorizontalSplitter.Events.onPlotSizeChanged = "";
    /**
     * Set the plots managed by the splitter in the correct order (order on screen)
     * @param {Array.<geotoolkit.scene.Group>} plots group for which we want to change the size
     * @returns {geotoolkit.controls.tools.splitter.HorizontalSplitter}
     */
    geotoolkit.controls.tools.splitter.HorizontalSplitter.prototype.setPlots = function(plots){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.splitter.HorizontalSplitter.prototype.start = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.splitter.HorizontalSplitter.prototype.stop = function(){};

/**
 * ScrollEventArgs
 *
 * @class geotoolkit.controls.tools.scroll.ScrollEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs info about event arguments
 * @param {geotoolkit.util.Rect} modelLimits visible model limits
 */
geotoolkit.controls.tools.scroll.ScrollEventArgs = {};
    /**
     * Return visibles limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.controls.tools.scroll.ScrollEventArgs.prototype.getVisibleModelLimits = function(){};

/**
 * AbstractScroll class is the parent class for toolkit builtin scrollbar shapes. It includes the logic to scroll using an internal {@link geotoolkit.controls.tools.AbstractTool}
 * <br>
 * <br>
 * <h5>Events {@link geotoolkit.controls.tools.scroll.AbstractScroll}</h5>
 * <table class="params">
 * <thead>
 * <tr>
 * <th>Event</th><th>Arguments</th><th>Description</th>
 * </tr>
 * </thead>
 * <tbody>
 * <tr>
 * <td>onActivate</td>
 * <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
 * <td>scrollbar activated</td>
 * </tr>
 * <tr>
 * <td>onScrollStart</td>
 * <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
 * <td>on scroll start</td>
 * </tr>
 * <tr>
 * <td>onScaleStart</td>
 * <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
 * <td>on scale start</td>
 * </tr>
 * <tr>
 * <td>onScroll</td>
 * <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
 * <td>on scroll</td>
 * </tr>
 * <tr>
 * <td>onScale</td>
 * <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
 * <td>on scale</td>
 * </tr>
 * <tr>
 * <td>onScrollEnd</td>
 * <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
 * <td>on scroll end</td>
 * </tr>
 * <tr>
 * <td>onScaleEnd</td>
 * <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
 * <td>on scale end</td>
 * </tr>
 * <tr>
 * <td>onRangeChanged</td>
 * <td>{@link geotoolkit.controls.tools.scroll.ScrollEventArgs}</td>
 * <td>on visible range changed</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 * @class geotoolkit.controls.tools.scroll.AbstractScroll
 * @augments geotoolkit.scene.Group
 * @param {Object} options
 * @param {string} options.name scroll bar name
 */
geotoolkit.controls.tools.scroll.AbstractScroll = {};
    /**
     * enum of AbstractScroll Events
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.Events = {};
        /**
         * onActivate
         * @type {string}
         */
        geotoolkit.controls.tools.scroll.AbstractScroll.Events.onActivate = "";
        /**
         * onScrollStart
         * @type {string}
         */
        geotoolkit.controls.tools.scroll.AbstractScroll.Events.onScrollStart = "";
        /**
         * onScaleStart
         * @type {string}
         */
        geotoolkit.controls.tools.scroll.AbstractScroll.Events.onScaleStart = "";
        /**
         * onScroll
         * @type {string}
         */
        geotoolkit.controls.tools.scroll.AbstractScroll.Events.onScroll = "";
        /**
         * onScale
         * @type {string}
         */
        geotoolkit.controls.tools.scroll.AbstractScroll.Events.onScale = "";
        /**
         * onScrollEnd
         * @type {string}
         */
        geotoolkit.controls.tools.scroll.AbstractScroll.Events.onScrollEnd = "";
        /**
         * onScaleEnd
         * @type {string}
         */
        geotoolkit.controls.tools.scroll.AbstractScroll.Events.onScaleEnd = "";
        /**
         * onRangeChanged
         * @type {string}
         */
        geotoolkit.controls.tools.scroll.AbstractScroll.Events.onRangeChanged = "";
    /**
     * onMouseDown
     * @function
     * @protected
     * @abstract
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs information about event arguments
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.onMouseDown = function(eventArgs){};
    /**
     * onMouseMove
     * @function
     * @protected
     * @abstract
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs information about event arguments
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.onMouseMove = function(eventArgs){};
    /**
     * onMouseUp
     * @function
     * @protected
     * @abstract
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs information about event arguments
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.onMouseUp = function(eventArgs){};
    /**
     * Doubleclick handler
     * Detects if double click happens on scrollbar and prevents propagation
     * @protected
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs event arguments
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.onDoubleClick = function(eventArgs){};
    /**
     * onWindowMouseMove
     * @function
     * @protected
     * @abstract
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs information about event arguments
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.onWindowMouseMove = function(eventArgs){};
    /**
     * onWindowMouseUp
     * @protected
     * @param {geotoolkit.controls.tools.EventArgs} evt onWindowMouseUp event
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.onWindowMouseUp = function(evt){};
    /**
     * Get the tool
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.getTool = function(){};
    /**
     * Add Listener
     * @param {string} event scroll event
     * @param {function()} callback function to be called
     * @returns {geotoolkit.controls.tools.scroll.AbstractScroll}
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.addListener = function(event, callback){};
    /**
     * Sets floating mode
     * @param {boolean} floatingMode flag to set floating mode
     * @returns {geotoolkit.controls.tools.scroll.AbstractScroll}
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.setFloatingMode = function(floatingMode){};
    /**
     * Returns floating mode
     * @returns {boolean}
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.getFloatingMode = function(){};
    /**
     * @override
     * @param {geotoolkit.util.Rect} modelLimits model limits
     * @param {geotoolkit.util.Rect} [visibleLimits] visible model limits
     * @param {boolean} [flipped=true] orientation flipped or not
     * @param {boolean} [enableAnimation=true] show animation or not
     * @returns {geotoolkit.controls.tools.scroll.AbstractScroll} this
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.setModelLimits = function(modelLimits, visibleLimits, flipped, enableAnimation){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing properties
     * @param {Object|geotoolkit.layout.LayoutStyle} [properties.layoutstyle] layout style
     * @param {geotoolkit.attributes.FillStyle|object} [properties.backgroundfillstyle] background fill style
     * @param {boolean} [properties.floating] flag to set floating mode
     * @returns {geotoolkit.controls.tools.scroll.AbstractScroll}
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.setProperties = function(properties){};
    /**
     * Set scrollbar options
     * @param {Object} options specific to the scrollbar type
     * @function
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.setOptions = function(options){};
    /**
     * Get scrollbar options
     * @function
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.getOptions = function(){};
    /**
     * Returns optimal size for scroll bar
     * @returns {number} size
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.getDesiredSize = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.scroll.AbstractScroll.prototype.dispose = function(){};

/**
 * Abstract base class for common Vertical and Horizontal scrollers
 *
 * @class geotoolkit.controls.tools.scroll.HVBaseScroll
 * @augments geotoolkit.controls.tools.scroll.AbstractScroll
 * @param {Object} options
 * @param {geotoolkit.scene.CompositeNode} [options.target] scroll target object
 * @param {geotoolkit.util.Rect} options.modellimits model limits
 * @param {geotoolkit.util.Rect} options.visiblelimits visible model limits
 * @param {string} [options.name=VerticalScroll] This tool's name
 * @param {number} options.size scrollbar size
 */
geotoolkit.controls.tools.scroll.HVBaseScroll = {};
    /**
     * specify scroll bar orientation
     * @param {boolean} flip scroll bar orientation
     * @returns {geotoolkit.controls.tools.scroll.HVBaseScroll} this
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.setFlip = function(flip){};
    /**
     * set size of the scrollbar
     * @param {number} size size of the scrollbar, size should not be even
     * @returns {geotoolkit.controls.tools.scroll.HVBaseScroll} this
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.setSize = function(size){};
    /**
     * Sets the scrollTarget
     * @param {geotoolkit.scene.CompositeNode} object scroll target
     * @returns {geotoolkit.controls.tools.scroll.HVBaseScroll} this
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.setTarget = function(object){};
    /**
     * Gets the scrolls Model Limits Range
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.getModelRange = function(){};
    /**
     * Gets the scroll visible Model Range
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.getVisibleModelRange = function(){};
    /**
     * specify current model limits
     * @param {geotoolkit.util.Rect} modelLimits model limits
     * @param {geotoolkit.util.Rect} visibleLimits visible model limits
     * @param {boolean} [flipped=true] orientation flipped or not
     * @param {boolean} [enableAnimation=true] show animation or not
     * @returns {geotoolkit.controls.tools.scroll.HVBaseScroll}
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.setModelLimits = function(modelLimits, visibleLimits, flipped, enableAnimation){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.onMouseMove = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.onWindowMouseUp = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.onMouseDown = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.onWindowMouseMove = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.onMouseUp = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @see {@link geotoolkit.controls.tools.scroll.HVBaseScroll.setOptions()} for parameters
     * @returns {object} props JSON containing properties.
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.getOptions = function(){};
    /**
     * Set Options
     * @param {object} [properties] JSON containing properties
     * @param {string} [properties.name] name of the tool
     * @param {number} [properties.size] size of the scrollbar
     * @param {boolean} [properties.rounded] rounded borders
     * @param {number} [properties.minimumcarretsize] minimum size of the the carriage
     * @param {object} [properties.minscrollbutton] minscrollbutton properties
     * @param {boolean} [properties.minscrollbutton.visible] minscrollbutton visibility
     * @param {object} [properties.maxscrollbutton] maxscrollbutton properties
     * @param {boolean} [properties.maxscrollbutton.visible] maxscrollbutton visibility
     * @param {geotoolkit.attributes.LineStyle | object} [properties.borderlinestyle] border line style
     * @param {geotoolkit.attributes.FillStyle | object} [properties.backgroundfillstyle] background fill style, deprecated (since 2.6) use [properties.fillstyle] instead
     * @param {geotoolkit.attributes.FillStyle | object} [properties.fillstyle] fill style
     * @param {geotoolkit.attributes.LineStyle | object} [properties.linestyle] line style
     * @param {geotoolkit.attributes.LineStyle | object} [properties.caretlinestyle] caret line style
     * @param {geotoolkit.attributes.FillStyle | object} [properties.caretfillstyle] caret fill style
     * @param {geotoolkit.attributes.LineStyle | object} [properties.arrowlinestyle] arrow line style
     * @returns {geotoolkit.controls.tools.scroll.HVBaseScroll}
     */
    geotoolkit.controls.tools.scroll.HVBaseScroll.prototype.setOptions = function(properties){};

/**
 * Create a HorizontalScroll bar
 *
 * @class geotoolkit.controls.tools.scroll.HorizontalScroll
 * @augments geotoolkit.controls.tools.scroll.HVBaseScroll
 * @param {Object} [options]
 * @param {string} [options.name=HorizontalScroll] This tool's name
 */
geotoolkit.controls.tools.scroll.HorizontalScroll = {};
    /**
     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.scroll.HorizontalScroll.Events = {};

/**
 * Create a VerticalScroll
 *
 * @class geotoolkit.controls.tools.scroll.VerticalScroll
 * @augments geotoolkit.controls.tools.scroll.HVBaseScroll
 * @param {Object} [options]
 * @param {string} [options.name=VerticalScroll] This tool's name
 */
geotoolkit.controls.tools.scroll.VerticalScroll = {};
    /**
     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.scroll.VerticalScroll.Events = {};

/**
 * Defines a Compact Scroll bar
 * @class geotoolkit.controls.tools.scroll.CompactBaseScroll
 * @augments geotoolkit.controls.tools.scroll.AbstractScroll
 * @param {object} options An object containing options
 * @param {string} [options.name=CompactBaseScroll] tool name
 */
geotoolkit.controls.tools.scroll.CompactBaseScroll = {};
    /**
     * Enum of Alternative manipulation mode types.
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.scroll.CompactBaseScroll.AlternativeManipulationMode = {};
        /**
         * Never enable alternative manipulation mode.
         * @type {string}
         */
        geotoolkit.controls.tools.scroll.CompactBaseScroll.AlternativeManipulationMode.Disabled = "";
        /**
         * Use default threshold for alternative manipulation mode.
         * @type {string}
         */
        geotoolkit.controls.tools.scroll.CompactBaseScroll.AlternativeManipulationMode.Default = "";
        /**
         * Use custom threshold for alternative manipulation mode.
         * @type {string}
         */
        geotoolkit.controls.tools.scroll.CompactBaseScroll.AlternativeManipulationMode.Custom = "";
    /**
     * Events
     * see {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
     * @enum
     * @readonly
     * */
    geotoolkit.controls.tools.scroll.CompactBaseScroll.Events = {};
    /**
     * Set options
     *
     * @param {object} [options]
     * @param {boolean} [options.resizable] resizable or not
     * @param {geotoolkit.scene.shapes.Symbol} [options.minhandle] symbol to be displayed on the left end(or start) of the scroll bar
     * @param {geotoolkit.scene.shapes.Symbol} [options.maxhandle] symbol to be displayed on the right end(or end) of the scroll bar
     * @param {object} [options.manipulation] manipulation
     * @param {geotoolkit.controls.tools.scroll.CompactBaseScroll.AlternativeManipulationMode} [options.manipulation.type] The type of alternative manipulation mode.
     * @param {number} [options.manipulation.threshold] The mimimum size in pixels below which the alternate manipulation mode should activate.
     * @param {object} [options.minscrollbutton] minscrollbutton
     * @param {boolean} [options.minscrollbutton.visible] minscrollbutton visibility flag
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.minscrollbutton.linestyle] minscrollbutton linestyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.minscrollbutton.fillstyle] minscrollbutton fillstyle
     * @param {geotoolkit.scene.shapes.Symbol} [options.minscrollbutton.caret] minscrollbutton symbol
     * @param {object} [options.maxscrollbutton] maxscrollbutton
     * @param {boolean} [options.maxscrollbutton.visible] maxscrollbutton visibility flag
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.maxscrollbutton.linestyle] maxscrollbutton linestyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.maxscrollbutton.fillstyle] maxscrollbutton fillstyle
     * @param {geotoolkit.scene.shapes.Symbol} [options.maxscrollbutton.caret] maxscrollbutton symbol
     * @param {object} [options.scrollbar] scrollbar
     * @param {boolean} [options.scrollbar.visible] scrollbar visibility flag
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.scrollbar.linestyle] scrollbar linestyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.scrollbar.fillstyle] scrollbar fillstyle
     * @param {object} [options.scrolltrack] scrolltrack
     * @param {boolean} [options.scrolltrack.visible] scrolltrack visibility flag
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.scrolltrack.linestyle] scrolltrack linestyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.scrolltrack.fillstyle] scrolltrack fillstyle
     * @returns {geotoolkit.controls.tools.scroll.CompactBaseScroll} this
     */
    geotoolkit.controls.tools.scroll.CompactBaseScroll.prototype.setOptions = function(options){};
    /**
     * Get options
     * @returns {object}
     */
    geotoolkit.controls.tools.scroll.CompactBaseScroll.prototype.getOptions = function(){};
    /**
     * Get visible model
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.controls.tools.scroll.CompactBaseScroll.prototype.getVisibleModel = function(){};
    /**
     * Set model limits
     * @override
     * @param {geotoolkit.util.Rect} modelLimits model coordinate limits
     * @param {geotoolkit.util.Rect} visibleModelLimits visible model limits
     * @returns {geotoolkit.controls.tools.scroll.CompactBaseScroll} this
     */
    geotoolkit.controls.tools.scroll.CompactBaseScroll.prototype.setModelLimits = function(modelLimits, visibleModelLimits){};
    /**
     * Updates the scrolling mode to work correctly with small visible area.
     * @param {geotoolkit.util.Rect}visibleModelLimits The current visible model limits.
     * @param {boolean}isHorizontal The orientation of the scroll bar.
     */
    geotoolkit.controls.tools.scroll.CompactBaseScroll.prototype.updateMinimumScrollMode = function(visibleModelLimits, isHorizontal){};
    /**
     * Returns optimal size for scroll bar
     * @returns {number} size
     */
    geotoolkit.controls.tools.scroll.CompactBaseScroll.prototype.getDesiredSize = function(){};

/**
 * Defines a Compact Scroll bar
 * @class geotoolkit.controls.tools.scroll.CompactHorizontalScroll
 * @augments geotoolkit.controls.tools.scroll.CompactBaseScroll
 * @param {Object} options
 * @param {string} [options.name=CompactHorizontalScroll] tool name
 */
geotoolkit.controls.tools.scroll.CompactHorizontalScroll = {};
    /**
     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.scroll.CompactHorizontalScroll.Events = {};
    /**
     * Set options
     *
     * @param {object} [options] options
     * @param {boolean} [options.resizable = true] resizable or not
     * @param {geotoolkit.scene.shapes.Symbol} [options.minhandle] symbol to be displayed on the left end(or start) of the scroll bar
     * @param {geotoolkit.scene.shapes.Symbol} [options.maxhandle] symbol to be displayed on the right end(or end) of the scroll bar
     * @param {object} [options.minscrollbutton] minscrollbutton
     * @param {boolean} [options.minscrollbutton.visible = true] minscrollbutton visibility flag
     * @param {number} [options.minscrollbutton.size = 15] minscrollbutton size
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.minscrollbutton.linestyle] minscrollbutton line style
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.minscrollbutton.fillstyle] minscrollbutton fill style
     * @param {geotoolkit.scene.shapes.Symbol} [options.minscrollbutton.caret] minscrollbutton symbol
     * @param {object} [options.maxscrollbutton] maxscrollbutton
     * @param {boolean} [options.maxscrollbutton.visible = true] maxscrollbutton visibility flag
     * @param {number} [options.maxscrollbutton.size = 15] maxscrollbutton size
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.maxscrollbutton.linestyle] maxscrollbutton line style
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.maxscrollbutton.fillstyle] maxscrollbutton fill style
     * @param {geotoolkit.scene.shapes.Symbol} [options.maxscrollbutton.caret] maxscrollbutton symbol
     * @param {object} [options.scrollbar] scrollbar
     * @param {boolean} [options.scrollbar.visible = true] scrollbar visibility flag
     * @param {boolean} [options.scrollbar.autohide = true] scrollbar autohide flag
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.scrollbar.linestyle] scrollbar linestyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.scrollbar.fillstyle] scrollbar fill style
     * @param {object} [options.scrolltrack] scrolltrack
     * @param {boolean} [options.scrolltrack.visible = true] scrolltrack visibility flag
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.scrolltrack.linestyle] scrolltrack linestyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.scrolltrack.fillstyle] scrolltrack fillstyle
     * @returns {geotoolkit.controls.tools.scroll.CompactHorizontalScroll} this
     */
    geotoolkit.controls.tools.scroll.CompactHorizontalScroll.prototype.setOptions = function(options){};
    /**
     * specify scroll bar orientation
     * @param {boolean} flip scroll bar orientation
     * @returns {geotoolkit.controls.tools.scroll.CompactHorizontalScroll}
     */
    geotoolkit.controls.tools.scroll.CompactHorizontalScroll.prototype.setFlip = function(flip){};
    /**
     * Gets the scrolls Model Limits Range
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.controls.tools.scroll.CompactHorizontalScroll.prototype.getModelRange = function(){};
    /**
     * Gets the scroll visible Model Range
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.controls.tools.scroll.CompactHorizontalScroll.prototype.getVisibleModelRange = function(){};
    /**
     * Set Model Limits
     * @param {geotoolkit.util.Rect} modelLimits model coordinate limits
     * @param {geotoolkit.util.Rect} visibleModelLimits visible model limits
     * @returns {geotoolkit.controls.tools.scroll.CompactHorizontalScroll} this
     */
    geotoolkit.controls.tools.scroll.CompactHorizontalScroll.prototype.setModelLimits = function(modelLimits, visibleModelLimits){};

/**
 * Defines a Compact Scroll bar
 * @class geotoolkit.controls.tools.scroll.CompactVerticalScroll
 * @augments geotoolkit.controls.tools.scroll.CompactBaseScroll
 * @param {Object} options
 * @param {string} [options.name=CompactVerticalScroll] tool name
 */
geotoolkit.controls.tools.scroll.CompactVerticalScroll = {};
    /**
     * Events {@link geotoolkit.controls.tools.scroll.AbstractScroll.Events}
     * @readonly
     * @enum
     */
    geotoolkit.controls.tools.scroll.CompactVerticalScroll.Events = {};
    /**
     * Set options
     *
     * @param {object} [options]
     * @param {boolean} [options.resizable = true] resizable or not
     * @param {geotoolkit.scene.shapes.Symbol} [options.minhandle] symbol to be displayed on the left end(or start) of the scroll bar
     * @param {geotoolkit.scene.shapes.Symbol} [options.maxhandle] symbol to be displayed on the right end(or end) of the scroll bar
     * @param {object} [options.minscrollbutton] minscrollbutton
     * @param {boolean} [options.minscrollbutton.visible = true] minscrollbutton visibility flag
     * @param {number} [options.minscrollbutton.size = 15] minscrollbutton size
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.minscrollbutton.linestyle] minscrollbutton line style
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.minscrollbutton.fillstyle] minscrollbutton fill style
     * @param {geotoolkit.scene.shapes.Symbol} [options.minscrollbutton.caret] minscrollbutton symbol
     * @param {object} [options.maxscrollbutton] maxscrollbutton
     * @param {boolean} [options.maxscrollbutton.visible = true] maxscrollbutton visibility flag
     * @param {number} [options.maxscrollbutton.size = 15] maxscrollbutton size
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.maxscrollbutton.linestyle] maxscrollbutton line style
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.maxscrollbutton.fillstyle] maxscrollbutton fill style
     * @param {geotoolkit.scene.shapes.Symbol} [options.maxscrollbutton.caret] maxscrollbutton symbol
     * @param {object} [options.scrollbar] scrollbar
     * @param {boolean} [options.scrollbar.visible = true] scrollbar visibility flag
     * @param {boolean} [options.scrollbar.autohide = true] scrollbar autohide flag
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.scrollbar.linestyle] scrollbar linestyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.scrollbar.fillstyle] scrollbar fillstyle
     * @param {object} [options.scrolltrack] scrolltrack
     * @param {boolean} [options.scrolltrack.visible = true] scrolltrack visibility flag
     * @param {geotoolkit.attributes.LineStyle | string | object} [options.scrolltrack.linestyle] scrolltrack linestyle
     * @param {geotoolkit.attributes.FillStyle | string | object} [options.scrolltrack.fillstyle] scrolltrack fillstyle
     * @returns {geotoolkit.controls.tools.scroll.CompactVerticalScroll} this
     */
    geotoolkit.controls.tools.scroll.CompactVerticalScroll.prototype.setOptions = function(options){};
    /**
     * specify scroll bar orientation
     * @param {boolean} flip scroll bar orientation
     * @returns {geotoolkit.controls.tools.scroll.CompactVerticalScroll}
     */
    geotoolkit.controls.tools.scroll.CompactVerticalScroll.prototype.setFlip = function(flip){};
    /**
     * Gets the scrolls Model Limits Range
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.controls.tools.scroll.CompactVerticalScroll.prototype.getModelRange = function(){};
    /**
     * Gets the scroll visible Model Range
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.controls.tools.scroll.CompactVerticalScroll.prototype.getVisibleModelRange = function(){};
    /**
     * Set model limtis
     * @param {geotoolkit.util.Rect} modelLimits model coordinate limits
     * @param {geotoolkit.util.Rect} visibleModelLimits visible model limits
     * @returns {geotoolkit.controls.tools.scroll.CompactVerticalScroll} this
     */
    geotoolkit.controls.tools.scroll.CompactVerticalScroll.prototype.setModelLimits = function(modelLimits, visibleModelLimits){};

/**
 * Scroll factory
 *
 * This factory registers a name-function pair.
 * the function is responsible for creating an instance of a scrollbar which inherits from
 * geotoolkit.controls.tools.scroll.AbstractScroll, and returns it
 *
 * @class geotoolkit.controls.tools.scroll.ScrollFactory
 */
geotoolkit.controls.tools.scroll.ScrollFactory = {};
    /**
     * Get instance
     * @returns {Object}
     */
    geotoolkit.controls.tools.scroll.ScrollFactory.getInstance = function(){};
    /**
     * Register scrollbar
     * @param {string} name class name or unique name
     * @param {function()} constructor function which instantiates the required scrollbar
     * @returns {object}
     */
    geotoolkit.controls.tools.scroll.ScrollFactory.prototype.registerScrollbar = function(name, constructor){};
    /**
     * Get scrollbar
     * @param {string} name class name
     * @param {object} options for the scrollbar requested. Must include 'modellimits' and 'visiblelimits'
     * @returns {geotoolkit.controls.tools.scroll.AbstractScroll}
     */
    geotoolkit.controls.tools.scroll.ScrollFactory.prototype.getScrollbar = function(name, options){};

