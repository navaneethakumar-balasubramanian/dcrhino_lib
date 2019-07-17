/**
 * API to utilize and modify legacy gauges this API will be deprecated in the future.
 * @namespace */
geotoolkit.gauges = {};

/** @namespace */
geotoolkit.gauges.alarms = {};

/** @namespace */
geotoolkit.gauges.utils = {};
    /**
     * Enum of circular tick locations
     * @enum
     * @readonly
     * @deprecated
     */
    geotoolkit.gauges.utils.CircularTickLocation = {};
        /**
         * Outside
         * @type {number}
         */
        geotoolkit.gauges.utils.CircularTickLocation.Outside = NaN;
        /**
         * Inside
         * @type {number}
         */
        geotoolkit.gauges.utils.CircularTickLocation.Inside = NaN;
        /**
         * Center
         * @type {number}
         */
        geotoolkit.gauges.utils.CircularTickLocation.Center = NaN;
        /**
         * InAndOut
         * @type {number}
         */
        geotoolkit.gauges.utils.CircularTickLocation.InAndOut = NaN;
    /**
     * Enum of directions
     * @enum
     * @readonly
     * @deprecated
     */
    geotoolkit.gauges.utils.Direction = {};
        /**
         * Left
         * @type {number}
         */
        geotoolkit.gauges.utils.Direction.Left = NaN;
        /**
         * Right
         * @type {number}
         */
        geotoolkit.gauges.utils.Direction.Right = NaN;
        /**
         * Up Right
         * @type {number}
         */
        geotoolkit.gauges.utils.Direction.Up = NaN;
        /**
         * Down
         * @type {number}
         */
        geotoolkit.gauges.utils.Direction.Down = NaN;
    /**
     * Enum of standard locations
     * @enum
     * @readonly
     * @deprecated
     */
    geotoolkit.gauges.utils.StandardLocation = {};
        /**
         * Bottom Left
         * @type {geotoolkit.util.Point}
         */
        geotoolkit.gauges.utils.StandardLocation.BottomLeft = {};
        /**
         * Bottom Center
         * @type {geotoolkit.util.Point}
         */
        geotoolkit.gauges.utils.StandardLocation.BottomCenter = {};
        /**
         * Bottom Right
         * @type {geotoolkit.util.Point}
         */
        geotoolkit.gauges.utils.StandardLocation.BottomRight = {};
        /**
         * Center Left
         * @type {geotoolkit.util.Point}
         */
        geotoolkit.gauges.utils.StandardLocation.LeftCenter = {};
        /**
         * Center
         * @type {geotoolkit.util.Point}
         */
        geotoolkit.gauges.utils.StandardLocation.Center = {};
        /**
         * Center Right
         * @type {geotoolkit.util.Point}
         */
        geotoolkit.gauges.utils.StandardLocation.CenterRight = {};
        /**
         * Top Left
         * @type {geotoolkit.util.Point}
         */
        geotoolkit.gauges.utils.StandardLocation.TopLeft = {};
        /**
         * Top Center
         * @type {geotoolkit.util.Point}
         */
        geotoolkit.gauges.utils.StandardLocation.TopCenter = {};
        /**
         * Top Right
         * @type {geotoolkit.util.Point}
         */
        geotoolkit.gauges.utils.StandardLocation.TopRight = {};
    /**
     * Enum of manager Types
     * @enum
     * @readonly
     * @deprecated
     */
    geotoolkit.gauges.utils.ManagerType = {};
        /**
         * Undefined
         * @type {string}
         */
        geotoolkit.gauges.utils.ManagerType.Undefined = "";
        /**
         * Animation
         * @type {string}
         */
        geotoolkit.gauges.utils.ManagerType.Animation = "";
        /**
         * Streaming
         * @type {string}
         */
        geotoolkit.gauges.utils.ManagerType.Streaming = "";
        /**
         * Reserved for User
         * @type {string}
         */
        geotoolkit.gauges.utils.ManagerType.Custom = "";

/** @namespace */
geotoolkit.gauges.shapes = {};

/** @namespace */
geotoolkit.gauges.shapes.needles = {};

/** @namespace */
geotoolkit.gauges.knownGauges = {};

/**
 * Defines a base class for gauges
 *
 * @class geotoolkit.gauges.Gauge
 * @augments geotoolkit.scene.Group
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of ranges to apply
 * @deprecated
 */
geotoolkit.gauges.Gauge = {};
    /**
     * Dispose node.
     */
    geotoolkit.gauges.Gauge.prototype.dispose = function(){};
    /**
     * Returns gauge model limits
     * @protected
     * @returns {geotoolkit.util.Rect} gauge model limits
     */
    geotoolkit.gauges.Gauge.prototype.getGaugeModelLimits = function(){};
    /**
     * Records that the gauge has been changed, full redraw will be forced
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.hasChanged = function(){};
    /**
     * Returns a boolean value defining if the gauge supports animation
     * @returns {boolean}
     */
    geotoolkit.gauges.Gauge.prototype.supportsAnimation = function(){};
    /**
     * Sets animation support flag (if a gauge can be animated)
     * @param {boolean} v Animation support boolean flag
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.setSupportsAnimation = function(v){};
    /**
     * Sets minimum value
     * @param {number} min New minimum value
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.setLow = function(min){};
    /**
     * Sets maximum value
     * @param {number} max New maximum value
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.setHigh = function(max){};
    /**
     * Get minimum value
     * @returns {number}
     */
    geotoolkit.gauges.Gauge.prototype.getLow = function(){};
    /**
     * Get maximum value
     * @returns {number}
     */
    geotoolkit.gauges.Gauge.prototype.getHigh = function(){};
    /**
     * Get all Managers associated to this gauge
     * @returns {Array.<geotoolkit.gauges.utils.Manager>}
     */
    geotoolkit.gauges.Gauge.prototype.getAllManagers = function(){};
    /**
     * Get Animation Manager associated to this gauge
     * @returns {geotoolkit.gauges.utils.AnimationManager}
     */
    geotoolkit.gauges.Gauge.prototype.getAnimationManager = function(){};
    /**
     * Set Manager associated to this gauge
     * @param {geotoolkit.gauges.utils.Manager} mgr Manager to associate with this gauge
     * @param {geotoolkit.gauges.utils.ManagerType} type Manager type
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.setManager = function(mgr, type){};
    /**
     * Sets new bounds
     * @param {geotoolkit.util.Rect} rect New bounds
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.setBounds = function(rect){};
    /**
     * Returns name shape
     * @returns {geotoolkit.scene.shapes.Text} Name Shape
     */
    geotoolkit.gauges.Gauge.prototype.getNameShape = function(){};
    /**
     * Get background shape
     * @returns {geotoolkit.scene.shapes.ScaledShape}
     */
    geotoolkit.gauges.Gauge.prototype.getBackgroundShape = function(){};
    /**
     * Set background shape
     * @param {geotoolkit.scene.shapes.ScaledShape} shape background shape
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.setBackgroundShape = function(shape){};
    /**
     * Get value shape
     * @returns {geotoolkit.scene.shapes.Text}
     */
    geotoolkit.gauges.Gauge.prototype.getValueShape = function(){};
    /**
     * Set gauge name
     * @param {string} name Name to be displayed
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.setName = function(name){};
    /**
     * Returns gauge name
     * @returns {string} Gauge name
     */
    geotoolkit.gauges.Gauge.prototype.getName = function(){};
    /**
     * Sets display strategy
     * @param {function} strategy Strategy function to be used for display of value
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.setDisplayStrategy = function(strategy){};
    /**
     * Get display strategy
     * @returns {function} strategy Strategy function used for display of value
     */
    geotoolkit.gauges.Gauge.prototype.getDisplayStrategy = function(){};
    /**
     * Increments animation value by specified number
     * @param {number} incr Value to increment by
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.incrementAnimation = function(incr){};
    /**
     * Terminates the animation
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.terminateAnimation = function(){};
    /**
     * Set new gauge value to display
     * @param {number|string} val New value of the gauge
     * @param {boolean} [animated] animated True to perform an animation
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.setValue = function(val, animated){};
    /**
     * Set alt values (for custom gauges or DoubleCircularGauge)
     * @param {Array.<number> | number} val New alt value(s) of the gauge
     * @param {boolean} [animated] animated True to perform an animation
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.setAltValues = function(val, animated){};
    /**
     * Get value
     * @returns {number} Current Gauge value
     */
    geotoolkit.gauges.Gauge.prototype.getValue = function(){};
    /**
     * Get alt values
     * @returns {Array.<number>} gauge alt values
     */
    geotoolkit.gauges.Gauge.prototype.getAltValues = function(){};
    /**
     * Initialize gauge component shapes
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.initShapes = function(){};
    /**
     * Creates one alert which implements all alerts of all alarms registered
     * @returns {geotoolkit.gauges.alarms.Alert}
     */
    geotoolkit.gauges.Gauge.prototype.getResultingAlert = function(){};
    /**
     * Creates one streaming alert which implements all streaming alerts of all alarms registered
     * @returns {geotoolkit.gauges.alarms.Alert}
     */
    geotoolkit.gauges.Gauge.prototype.getResultingStreamingAlert = function(){};
    /**
     * Returns true if static shapes exist
     * @returns {boolean}
     */
    geotoolkit.gauges.Gauge.prototype.isInitiatedStatic = function(){};
    /**
     * Returns true if force update is required
     * @returns {boolean}
     */
    geotoolkit.gauges.Gauge.prototype.isForceUpdate = function(){};
    /**
     * Update static shapes
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.updateStatic = function(){};
    /**
     * Add a static shape. Static shapes are not affected by Value updates
     * @param {geotoolkit.scene.Node} shape Shape to add
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.addStaticShape = function(shape){};
    /**
     * Remove a static shape. Static shapes are not affected by Value updates
     * @param {geotoolkit.scene.Node} shape shape to remove
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.removeStaticShape = function(shape){};
    /**
     * Remove a dynamic shape. Dynamic shapes are updated at each value change
     * @param {geotoolkit.scene.Node} shape Shape to remove
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.removeDynamicShape = function(shape){};
    /**
     * Get static shapes
     * @returns {Array.<geotoolkit.scene.Node>}
     */
    geotoolkit.gauges.Gauge.prototype.getStaticShapes = function(){};
    /**
     * Get dynamic shapes.
     * @returns {Array.<geotoolkit.scene.Node>}
     */
    geotoolkit.gauges.Gauge.prototype.getDynamicShapes = function(){};
    /**
     * Add a range to the gauge. To use for known gauges
     * @param {geotoolkit.gauges.utils.Range | Array.<geotoolkit.gauges.utils.Range>} range Range to add
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.addRange = function(range){};
    /**
     * Get all ranges
     * @returns {Array.<geotoolkit.gauges.utils.Range>}
     */
    geotoolkit.gauges.Gauge.prototype.getRanges = function(){};
    /**
     * Force hardcoded shapes to reload based on new ranges.
     * To be called when Ranges are updated after their representation is drawn.
     */
    geotoolkit.gauges.Gauge.prototype.reloadRanges = function(){};
    /**
     * Add a known shape
     * @param {geotoolkit.gauges.shapes.BaseShape} shape Shape to add
     */
    geotoolkit.gauges.Gauge.prototype.addKnownShape = function(shape){};
    /**
     * Remove a known shape
     * @param {geotoolkit.gauges.shapes.BaseShape} shape shape to remove
     */
    geotoolkit.gauges.Gauge.prototype.removeKnownShape = function(shape){};
    /**
     * Add a dynamic shape. Dynamic shapes are affected by Value updates
     * @param {geotoolkit.scene.Node | Array.<geotoolkit.scene.Node> | Object} shape Shape to add
     * @param {geotoolkit.scene.Node} [shape.shape=null] Shape to add
     * @param {function} [shape.event] method to call at value update. Should return the updated shape.
     * @param {function} event method to call at value update. Should return the updated shape.
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.addDynamicShape = function(shape, event){};
    /**
     * Update value of the gauge
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.updateValue = function(){};
    /**
     * Adds an alarm to the gauge
     * @param {geotoolkit.gauges.alarms.Alarm} alarm alarm to be added
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.addAlarm = function(alarm){};
    /**
     * Returns the alarms associated to the gauge
     * @returns {Array.<geotoolkit.gauges.alarms.Alarm>}
     */
    geotoolkit.gauges.Gauge.prototype.getAlarms = function(){};
    /**
     * Remove an alarm from the gauge
     * @param {geotoolkit.gauges.alarms.Alarm} alarm Alarm to be added
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.removeAlarm = function(alarm){};
    /**
     * Forced update the gauge
     * @returns {geotoolkit.gauges.Gauge}
     */
    geotoolkit.gauges.Gauge.prototype.update = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {geotoolkit.util.Rect} [props.modellimits] shape model limits
     * @returns {geotoolkit.util.Rect} [props.bounds] shape bounds
     * @returns {geotoolkit.util.Transformation} [props.localtransform] shape local transformation
     * @returns {string} [props.name] shape name
     * @returns {boolean} [props.pickingchildren] allow children selection
     * @returns {Array.<geotoolkit.gauges.alarms.Alarm>} [props.alarms] array of alarms
     * @returns {boolean} [props.supportsanimation] is animation supported
     * @returns {string} [props.displaystrategy] string function display strategy
     * @returns {Array.<geotoolkit.gauges.utils.Range>} [props.ranges] array of ranges
     * @returns {number} [props.min] min value
     * @returns {number} [props.max] max value
     * @returns {object} [props.nameshape] shape name text
     * @returns {object} [props.valueshape] shape value text
     * @returns {geotoolkit.scene.shapes.Shape} [props.backgroundshape] shape for background
     * @returns {number} [props.value] shape value
     * @returns {Array.<number>} [props.altvalues] new alt value(s) of the gauge
     */
    geotoolkit.gauges.Gauge.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {geotoolkit.util.Rect | object} [properties.modellimits] shape model limits
     * @param {geotoolkit.util.Rect | object} [properties.bounds] shape bounds
     * @param {geotoolkit.util.Transformation} [properties.localtransform] shape local transformation
     * @param {string} [properties.name] shape name
     * @param {boolean} [properties.pickingchildren] allow children selection
     * @param {array.<geotoolkit.gauges.alarms.Alarm>} [properties.alarms] array of alarms
     * @param {boolean} [properties.supportsanimation] is animation supported
     * @param {string} [properties.displaystrategy] string function display strategy
     * @param {array.<geotoolkit.gauges.utils.Range>} [properties.ranges] array of ranges
     * @param {number} [properties.min] min value
     * @param {number} [properties.max] max value
     * @param {geotoolkit.scene.shapes.Text | object} [properties.nameshape] shape name text
     * @param {geotoolkit.scene.shapes.Text | object} [properties.valueshape] shape value text
     * @param {geotoolkit.scene.shapes.Shape | object} [properties.backgroundshape] shape for background
     * @param {number} [properties.value] shape value
     * @returns {geotoolkit.gauges.Gauge} this
     */
    geotoolkit.gauges.Gauge.prototype.setProperties = function(properties){};

/**
 * Defines an alarm
 * An Alarm is attached to a gauge and contains a collection of Alerts
 *
 * @class geotoolkit.gauges.alarms.Alarm
 * @deprecated
 */
geotoolkit.gauges.alarms.Alarm = {};
    /**
     * Combines actions from multiple alert into one alert
     * @param {number} value value at which to alert
     * @returns {geotoolkit.gauges.alarms.Alert}
     */
    geotoolkit.gauges.alarms.Alarm.prototype.getResultingAlert = function(value){};
    /**
     * Add action for each Alert action based on Alert's text and color parameters
     * @param {geotoolkit.scene.shapes.Shape} symbol Symbol to be colored when Alert is active
     * @param {geotoolkit.scene.shapes.Text} textShape Textshape to be edited when Alert is active
     * @returns {geotoolkit.gauges.alarms.Alarm}
     */
    geotoolkit.gauges.alarms.Alarm.prototype.setAction = function(symbol, textShape){};
    /**
     * Add an alert to the alarm
     * @param {geotoolkit.gauges.alarms.Alert} alert Alert to add
     * @returns {geotoolkit.gauges.alarms.Alarm}
     */
    geotoolkit.gauges.alarms.Alarm.prototype.addAlert = function(alert){};
    /**
     * Get the Alerts
     * @returns {Array.<geotoolkit.gauges.alarms.Alert>}
     */
    geotoolkit.gauges.alarms.Alarm.prototype.getAlerts = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {Object} props JSON containing properties
     * @returns {Array.<geotoolkit.gauges.alarms.Alert>} props.alerts Array of geotoolkit.gauges.alarms.Alert
     */
    geotoolkit.gauges.alarms.Alarm.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {Object} properties JSON containing the properties to set
     * @param {Array.<geotoolkit.gauges.alarms.Alert>} [properties.alerts] array of geotoolkit.gauges.alarms.Alert
     * @returns {geotoolkit.gauges.alarms.Alarm}
     */
    geotoolkit.gauges.alarms.Alarm.prototype.setProperties = function(properties){};

/**
 * Defines a streaming Alarm - An Alarm designed for streaming survey
 *
 * @class geotoolkit.gauges.alarms.StreamAlarm
 * @augments geotoolkit.gauges.alarms.Alarm
 * @deprecated
 */
geotoolkit.gauges.alarms.StreamAlarm = {};
    /**
     * Add Streaming Alert
     * @param {number | Object} [upperlimit=POSITIVE_INFINITY] Upper limit in ms
     * @param {string} [upperlimit.color='grey'] Color of the alert
     * @param {string} [upperlimit.text='undefined'] Text of the alert
     * @param {string} [color='grey'] Color of the alert
     * @param {string} [text='undefined'] Text of the alert
     * @returns {geotoolkit.gauges.alarms.RangeAlert | null} alert
     */
    geotoolkit.gauges.alarms.StreamAlarm.prototype.addStreamingAlert = function(upperlimit, color, text){};
    /**
     * Combines actions from multiple alert into one alert
     * @param {number} value Value at which to alert
     * @returns {geotoolkit.gauges.alarms.Alert}
     */
    geotoolkit.gauges.alarms.StreamAlarm.prototype.getResultingStreamingAlert = function(value){};
    /**
     * Return the resulting alert
     * @param {number} value Value of
     * @returns {geotoolkit.gauges.alarms.Alert}
     * @override
     */
    geotoolkit.gauges.alarms.StreamAlarm.prototype.getResultingAlert = function(value){};

/**
 * Defines an alert
 *
 * An Alert is a test and the associated set of consequences
 * @class geotoolkit.gauges.alarms.Alert
 * @param {function} condition
 * test function to be applied on the gauge value (default) or else. Use boolean 'true' for always true conditions.
 * @param {function} action
 * action to be performed when condition is true
 * @param {string} [text] label associated with the alert
 * @param {string} [color] a color associated with the alert
 * @deprecated
 */
geotoolkit.gauges.alarms.Alert = {};
    /**
     * Set or reset Alert Elements.
     * @param {function} condition test function to be applied on the gauge value (default) or else
     * @param {function} action action to be performed when condition is true
     * @param {string} [text] label associated with the alert
     * @param {string} [color] a color associated with the alert
     * @returns {geotoolkit.gauges.alarms.Alert} this
     */
    geotoolkit.gauges.alarms.Alert.prototype.setAlert = function(condition, action, text, color){};
    /**
     * Get Action
     * @returns {function} action to be performed when condition is true
     */
    geotoolkit.gauges.alarms.Alert.prototype.getAction = function(){};
    /**
     * Disable the Alert by removing its Action
     */
    geotoolkit.gauges.alarms.Alert.prototype.deleteAction = function(){};
    /**
     * Check if alert is active
     * Returns true if condition is true.
     * @returns {boolean}
     */
    geotoolkit.gauges.alarms.Alert.prototype.isActive = function(){};
    /**
     * Add new action based on Alert's text and color parameters
     * @param {geotoolkit.scene.shapes.Shape} symbol
     symbol to be colored when Alert is active
     * @param {geotoolkit.scene.shapes.Text} textShape
     textshape to be edited when Alert is active
     * @returns {geotoolkit.gauges.alarms.Alert} this
     */
    geotoolkit.gauges.alarms.Alert.prototype.setAction = function(symbol, textShape){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * {string} [props.color] color
     * {string} [props.text] text
     */
    geotoolkit.gauges.alarms.Alert.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {string} [properties.color] color
     * @param {string} [properties.text] text
     * @returns {geotoolkit.gauges.alarms.Alert} this
     */
    geotoolkit.gauges.alarms.Alert.prototype.setProperties = function(properties){};

/**
 * Defines an alert based on a range
 *
 * An Alert is a test and the associated set of consequences
 *
 * @class geotoolkit.gauges.alarms.RangeAlert
 * @augments geotoolkit.gauges.alarms.Alert
 * @param {geotoolkit.gauges.utils.Range} range range to be used
 * @param {function} action action to be performed
 * @deprecated
 */
geotoolkit.gauges.alarms.RangeAlert = {};
    /**
     * Get Range
     * return {geotoolkit.gauges.utils.Range} range used
     */
    geotoolkit.gauges.alarms.RangeAlert.prototype.getRange = function(){};
    /**
     * Set Range
     * @param {geotoolkit.gauges.utils.Range} range
     range to be used
     * @returns {geotoolkit.gauges.alarms.RangeAlert} this
     */
    geotoolkit.gauges.alarms.RangeAlert.prototype.setRange = function(range){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * {geotoolkit.gauges.utils.Range} [props.range] range
     */
    geotoolkit.gauges.alarms.RangeAlert.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {geotoolkit.gauges.utils.Range} [properties.range] range
     * @returns {geotoolkit.gauges.alarms.RangeAlert} this
     */
    geotoolkit.gauges.alarms.RangeAlert.prototype.setProperties = function(properties){};

/**
 * Defines a advanced digital gauge with alarm indicators
 *
 * @class geotoolkit.gauges.knownGauges.AdvancedDigitalGauge
 * @augments geotoolkit.gauges.Gauge
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 * @param {string} [left.unitname='psi'] Units of the value displayed by gauge
 * @param {function} [left.painter=geotoolkit.scene.shapes.painters.CirclePainter] Painter ti apply to the gauge
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of ranges to apply
 * @param {string} [unitname='psi'] Units of the value displayed by gauge
 * @param {function} [painter=geotoolkit.scene.shapes.painters.CirclePainter] Painter ti apply to the gauge
 * @deprecated
 */
geotoolkit.gauges.knownGauges.AdvancedDigitalGauge = {};
    /**
     * Initialize custom gauge shapes. Overrides base method
     *
     * @param {object} data JSON containing parameters required for initialization
     * @param {string} [data.unitname='psi'] Units of the value displayed by gauge
     * @param {function} [data.painter=geotoolkit.scene.shapes.painters.CirclePainter] Painter ti apply to the gauge
     * @returns {geotoolkit.gauges.knownGauges.AdvancedDigitalGauge}
     */
    geotoolkit.gauges.knownGauges.AdvancedDigitalGauge.prototype.initCustomShapes = function(data){};
    /**
     * Set unit label
     * @param {string | geotoolkit.util.AbstractUnit} unit Label to be displayed
     * @returns {geotoolkit.gauges.knownGauges.AdvancedDigitalGauge}
     */
    geotoolkit.gauges.knownGauges.AdvancedDigitalGauge.prototype.setUnit = function(unit){};
    /**
     * Get unit label
     * @returns {string} Gauge unit label text
     */
    geotoolkit.gauges.knownGauges.AdvancedDigitalGauge.prototype.getUnit = function(){};
    /**
     * Get unit shape
     * @returns {geotoolkit.scene.shapes.Text} Gauge unit text shape
     */
    geotoolkit.gauges.knownGauges.AdvancedDigitalGauge.prototype.getUnitShape = function(){};
    /**
     * Initialize gauge. Overrides base method.
     * @returns {geotoolkit.gauges.knownGauges.AdvancedDigitalGauge}
     */
    geotoolkit.gauges.knownGauges.AdvancedDigitalGauge.prototype.init = function(){};
    /**
     * Get alarm shape
     * @returns {geotoolkit.gauges.shapes.AlarmShape} AlarmShape from the gauge.
     */
    geotoolkit.gauges.knownGauges.AdvancedDigitalGauge.prototype.getAlarmShape = function(){};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * To be called when Ranges are updated after their representation is drawn.
     * @returns {geotoolkit.gauges.knownGauges.AdvancedDigitalGauge}
     */
    geotoolkit.gauges.knownGauges.AdvancedDigitalGauge.prototype.reloadRanges = function(){};
    /**
     * Update gauge
     * @returns {geotoolkit.gauges.knownGauges.AdvancedDigitalGauge}
     */
    geotoolkit.gauges.knownGauges.AdvancedDigitalGauge.prototype.update = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     * @returns {geotoolkit.scene.shapes.Text} props.unitshape Text shape for unit
     * @returns {geotoolkit.scene.shapes.Symbol} props.alarmsymbol Alarm symbol
     * @returns {string} props.unit Unit text
     */
    geotoolkit.gauges.knownGauges.AdvancedDigitalGauge.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {number} [properties.value] New gauge value
     * @param {geotoolkit.scene.shapes.Text | object} [properties.unitshape] Text shape for unit
     * @param {geotoolkit.scene.shapes.Symbol} [properties.alarmsymbol] alarm symbol
     * @param {string} [properties.unit] Gauge value units text
     * @returns {geotoolkit.gauges.knownGauges.AdvancedDigitalGauge}
     */
    geotoolkit.gauges.knownGauges.AdvancedDigitalGauge.prototype.setProperties = function(properties){};

/**
 * Defines an linear gauge
 *
 * @class geotoolkit.gauges.knownGauges.LinearGauge
 * @augments geotoolkit.gauges.Gauge
 * @param {number | object} left X location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 * @deprecated
 */
geotoolkit.gauges.knownGauges.LinearGauge = {};
    /**
     * Initializes gauge components. Overrides parent method
     * @returns {geotoolkit.gauges.knownGauges.LinearGauge}
     */
    geotoolkit.gauges.knownGauges.LinearGauge.prototype.initCustomShapes = function(){};
    /**
     * Refresh gauge limits.
     * @returns {geotoolkit.gauges.knownGauges.LinearGauge}
     */
    geotoolkit.gauges.knownGauges.LinearGauge.prototype.refreshLimits = function(){};
    /**
     * Initialize the gauge. Overrides parent method.
     * @returns {geotoolkit.gauges.knownGauges.LinearGauge}
     */
    geotoolkit.gauges.knownGauges.LinearGauge.prototype.init = function(){};
    /**
     * Returns the linear shape contained in this gauge
     * @returns {geotoolkit.gauges.shapes.LinearShape}
     */
    geotoolkit.gauges.knownGauges.LinearGauge.prototype.getShape = function(){};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * @returns {geotoolkit.gauges.knownGauges.LinearGauge}
     */
    geotoolkit.gauges.knownGauges.LinearGauge.prototype.reloadRanges = function(){};
    /**
     * Get gauge axis
     * @returns {geotoolkit.axis.Axis}
     */
    geotoolkit.gauges.knownGauges.LinearGauge.prototype.getAxis = function(){};
    /**
     * Get group containing the axis, for min/max or position editing
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.gauges.knownGauges.LinearGauge.prototype.getAxisGroup = function(){};
    /**
     * Force Update gauge
     * @returns {geotoolkit.gauges.knownGauges.LinearGauge}
     */
    geotoolkit.gauges.knownGauges.LinearGauge.prototype.update = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     * @returns {geotoolkit.gauges.shapes.LinearShape} props.horishape Horizontal shape
     * @returns {?object} props.axis Axis properties(see getProperties in geotoolkit.axis.Axis)
     * @returns {?object} props.axisgroup Axis group properties (see getProperties in geotoolkit.scene.Group)
     * @returns {boolean} props.vertical Is shape vertical
     */
    geotoolkit.gauges.knownGauges.LinearGauge.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {boolean} [properties.vertical] Is shape vertical
     * @param {geotoolkit.gauges.shapes.LinearShape} [properties.horishape] Horizontal shape
     * @param {geotoolkit.axis.Axis | object} [properties.axis] Gauge axis
     * @param {geotoolkit.scene.Group | object} [properties.axisgroup] Axis group
     * @returns {geotoolkit.gauges.knownGauges.LinearGauge}
     */
    geotoolkit.gauges.knownGauges.LinearGauge.prototype.setProperties = function(properties){};

/**
 * Defines an Horizontal gauge
 *
 * @class geotoolkit.gauges.knownGauges.HorizontalGauge
 * @augments geotoolkit.gauges.knownGauges.LinearGauge
 * @param {number | object} left X location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 * @deprecated
 */
geotoolkit.gauges.knownGauges.HorizontalGauge = {};

/**
 * Defines a Modern Horizontal Gauge
 *
 * @class geotoolkit.gauges.knownGauges.ModernHorizontalGauge
 * @augments geotoolkit.gauges.knownGauges.HorizontalGauge
 * @param {number | object} left X location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @deprecated
 */
geotoolkit.gauges.knownGauges.ModernHorizontalGauge = {};
    /**
     * Initialize gauge components. Overrides parent method
     * @returns {geotoolkit.gauges.knownGauges.ModernHorizontalGauge}
     */
    geotoolkit.gauges.knownGauges.ModernHorizontalGauge.prototype.initCustomShapes = function(){};

/**
 * Defines a Simple Traffic gauge
 *
 * @class geotoolkit.gauges.knownGauges.SimpleTrafficGauge
 * @augments geotoolkit.gauges.Gauge
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [left.painter=geotoolkit.scene.shapes.painters.SquarePainter] Painter that will define the indicators
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of ranges to apply
 * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [painter=geotoolkit.scene.shapes.painters.SquarePainter] Painter that will define the indicators
 * @deprecated
 */
geotoolkit.gauges.knownGauges.SimpleTrafficGauge = {};
    /**
     * Initialize gauge components. Overrides parent method to create a custom gauge.
     * @returns {geotoolkit.gauges.knownGauges.SimpleTrafficGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleTrafficGauge.prototype.initCustomShapes = function(){};
    /**
     * Initialize gauge. Overrides parent method to create a custom gauge.
     * @returns {geotoolkit.gauges.knownGauges.SimpleTrafficGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleTrafficGauge.prototype.init = function(){};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * @returns {geotoolkit.gauges.knownGauges.SimpleTrafficGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleTrafficGauge.prototype.reloadRanges = function(){};
    /**
     * Set painter type for symbols. To use your own painter see CarnacJS/Symbols
     * @param {geotoolkit.scene.shapes.painters.AbstractPainter} painter The gauge painter
     * @returns {geotoolkit.gauges.knownGauges.SimpleTrafficGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleTrafficGauge.prototype.setPainter = function(painter){};
    /**
     * Force gauge update
     * @returns {geotoolkit.gauges.knownGauges.SimpleTrafficGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleTrafficGauge.prototype.update = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     * @returns {Array.<geotoolkit.gauges.alarms.Alarm>} props.alarmshapes Array of alarms
     * @returns {string} [props.painter] Symbol's painter's className
     */
    geotoolkit.gauges.knownGauges.SimpleTrafficGauge.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {array.<geotoolkit.gauges.shapes.AlarmShape>} [properties.alarmshapes] Array of alarms
     * @param {string} [properties.painter] Symbol's painter's className
     * @returns {geotoolkit.gauges.knownGauges.SimpleTrafficGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleTrafficGauge.prototype.setProperties = function(properties){};

/**
 * Defines a Symbol Traffic gauge with no text
 *
 * @class geotoolkit.gauges.knownGauges.SymbolTrafficGauge
 * @augments geotoolkit.gauges.knownGauges.SimpleTrafficGauge
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @deprecated
 */
geotoolkit.gauges.knownGauges.SymbolTrafficGauge = {};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * @returns {geotoolkit.gauges.knownGauges.SymbolTrafficGauge}
     */
    geotoolkit.gauges.knownGauges.SymbolTrafficGauge.prototype.reloadRanges = function(){};

/**
 * Defines a Vertical Traffic Gauge
 *
 * @class geotoolkit.gauges.knownGauges.VerticalTrafficGauge
 * @augments geotoolkit.gauges.knownGauges.SimpleTrafficGauge
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [left.painter=geotoolkit.scene.shapes.painters.SquarePainter] Painter that will define the indicators
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of ranges to apply
 * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [painter=geotoolkit.scene.shapes.painters.SquarePainter] Painter that will define the indicators
 * @deprecated
 */
geotoolkit.gauges.knownGauges.VerticalTrafficGauge = {};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * @returns {geotoolkit.gauges.knownGauges.VerticalTrafficGauge}
     */
    geotoolkit.gauges.knownGauges.VerticalTrafficGauge.prototype.reloadRanges = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {array} props.alarmshapes array of geotoolkit.gauges.shapes.AlarmShape
     */
    geotoolkit.gauges.knownGauges.VerticalTrafficGauge.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {Array.<geotoolkit.gauges.shapes.AlarmShape>} properties.alarmshapes Array of alarm shapes
     * @returns {geotoolkit.gauges.knownGauges.VerticalTrafficGauge}
     */
    geotoolkit.gauges.knownGauges.VerticalTrafficGauge.prototype.setProperties = function(properties){};

/**
 * Defines an Horizontal Traffic gauge
 *
 * @class geotoolkit.gauges.knownGauges.HorizontalTrafficGauge
 * @augments geotoolkit.gauges.knownGauges.SimpleTrafficGauge
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [left.painter=geotoolkit.scene.shapes.painters.SquarePainter] Painter that will define the indicators
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of ranges to apply
 * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [painter=geotoolkit.scene.shapes.painters.SquarePainter] Painter that will define the indicators
 * @deprecated
 */
geotoolkit.gauges.knownGauges.HorizontalTrafficGauge = {};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * @returns {geotoolkit.gauges.knownGauges.HorizontalTrafficGauge}
     */
    geotoolkit.gauges.knownGauges.HorizontalTrafficGauge.prototype.reloadRanges = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     * @returns {string} [props.painter] Symbol's painter's className
     * @returns {Array.<geotoolkit.gauges.shapes.AlarmShape>} props.alarmshapes array of geotoolkit.gauges.alarms.Alarm
     */
    geotoolkit.gauges.knownGauges.HorizontalTrafficGauge.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {string} [properties.painter] Symbol's painter's className
     * @param {Array.<geotoolkit.gauges.shapes.AlarmShape>} [properties.alarmshapes] Array of geotoolkit.gauges.alarms.Alarm
     * @returns {geotoolkit.gauges.knownGauges.HorizontalTrafficGauge}
     */
    geotoolkit.gauges.knownGauges.HorizontalTrafficGauge.prototype.setProperties = function(properties){};

/**
 * Defines a traffic gauge with no text and only one single circle
 *
 * @class geotoolkit.gauges.knownGauges.SymbolCircleTrafficGauge
 * @augments geotoolkit.gauges.knownGauges.SymbolTrafficGauge
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @deprecated
 */
geotoolkit.gauges.knownGauges.SymbolCircleTrafficGauge = {};

/**
 * Defines a minimalistic Digital Gauge
 *
 * @class geotoolkit.gauges.knownGauges.TitleGauge
 * @augments geotoolkit.gauges.Gauge
 *
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 * @param {geotoolkit.attributes.FillStyle} [left.headerFill=geotoolkit.attributes.FillStyle("rgb(25,93,171)")] Fillstyle for the header
 * @param {geotoolkit.attributes.LineStyle} [left.geaderLine=geotoolkit.attributes.LineStyle("black")] Linestyle to apply to header
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of ranges to apply
 * @param {geotoolkit.attributes.FillStyle} [headerFill=geotoolkit.attributes.FillStyle("rgb(25,93,171)")] Fillstyle for the header
 * @param {geotoolkit.attributes.LineStyle} [geaderLine=geotoolkit.attributes.LineStyle("black")] Linestyle to apply to header
 * @deprecated
 */
geotoolkit.gauges.knownGauges.TitleGauge = {};
    /**
     * Get contour rectangle
     * @returns {geotoolkit.scene.shapes.Rectangle}
     */
    geotoolkit.gauges.knownGauges.TitleGauge.prototype.getHeaderRectangle = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     * @returns {?object} properties.headerrectangle Properties of rectangle set as header (see getProperties in geotoolkit.scene.shapes.Rectangle)
     */
    geotoolkit.gauges.knownGauges.TitleGauge.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {number} [properties.value] shape value
     * @param {geotoolkit.scene.shapes.Rectangle | object} [properties.headerrectangle] Rectangle to set for header
     * @returns {geotoolkit.gauges.knownGauges.TitleGauge}
     */
    geotoolkit.gauges.knownGauges.TitleGauge.prototype.setProperties = function(properties){};

/**
 * Defines a Simple Label Gauge
 *
 * @class geotoolkit.gauges.knownGauges.SimpleLabelGauge
 * @augments geotoolkit.gauges.knownGauges.TitleGauge
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of ranges to apply
 * @deprecated
 */
geotoolkit.gauges.knownGauges.SimpleLabelGauge = {};

/**
 * Defines a Simple Circular Gauge
 *
 * @class geotoolkit.gauges.knownGauges.SimpleCircularGauge
 * @augments geotoolkit.gauges.Gauge
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 * @param {function} [left.tickstrategy=default_function] Tick strategy to apply
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of ranges to apply
 * @param {function} [tickStrategy=default_function] Tick strategy to apply
 * @deprecated
 */
geotoolkit.gauges.knownGauges.SimpleCircularGauge = {};
    /**
     * Initialize gauge. Overrides parent method
     * @returns {geotoolkit.gauges.knownGauges.SimpleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleCircularGauge.prototype.initCustomShapes = function(){};
    /**
     * Get circular shape
     * @returns {geotoolkit.gauges.shapes.CircularShape}
     */
    geotoolkit.gauges.knownGauges.SimpleCircularGauge.prototype.getCircularShape = function(){};
    /**
     * Gets the shape defining circular gauge
     * @returns {geotoolkit.gauges.shapes.CircularShape}
     */
    geotoolkit.gauges.knownGauges.SimpleCircularGauge.prototype.getShape = function(){};
    /**
     * Gets the circular tick
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.knownGauges.SimpleCircularGauge.prototype.getCircularTick = function(){};
    /**
     * Force update gauge
     * @returns {geotoolkit.gauges.knownGauges.SimpleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleCircularGauge.prototype.update = function(){};
    /**
     * Initialize gauge. Overrides parent method
     * @returns {geotoolkit.gauges.knownGauges.SimpleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleCircularGauge.prototype.init = function(){};
    /**
     * Set minimum value of the gauge
     * @param {number} min Minimum value
     * @returns {geotoolkit.gauges.knownGauges.SimpleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleCircularGauge.prototype.setLow = function(min){};
    /**
     * Set maximum value of the gauge
     * @param {number} max Maximum value
     * @returns {geotoolkit.gauges.knownGauges.SimpleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleCircularGauge.prototype.setHigh = function(max){};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * @returns {geotoolkit.gauges.knownGauges.SimpleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleCircularGauge.prototype.reloadRanges = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     * @returns {?boolean} props.fillbyvalue is shape filled by value
     * @returns {?object} props.circularshape circular shape (see getProperties in geotoolkit.gauges.shapes.CircularShape)
     * @returns {?object} props.circulartick circular tick (see getProperties in geotoolkit.gauges.shapes.CircularTick)
     */
    geotoolkit.gauges.knownGauges.SimpleCircularGauge.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {number} [properties.value] Gauge value
     * @param {geotoolkit.gauges.shapes.CircularShape | object} [properties.circularshape] Circular shape
     * @param {geotoolkit.gauges.shapes.CircularTick | object} [properties.circulartick] Circular tick
     * @returns {geotoolkit.gauges.knownGauges.SimpleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleCircularGauge.prototype.setProperties = function(properties){};

/**
 * Defines a Simple Circular Gauge
 *
 * @class geotoolkit.gauges.knownGauges.ModernCircularGauge
 * @augments geotoolkit.gauges.knownGauges.SimpleCircularGauge
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of ranges to apply
 * Array of geotoolkit.gauges.utils.Range to apply
 * @deprecated
 */
geotoolkit.gauges.knownGauges.ModernCircularGauge = {};
    /**
     * Initialize gauge components. Overrides parent method
     * @returns {geotoolkit.gauges.knownGauges.ModernCircularGauge}
     */
    geotoolkit.gauges.knownGauges.ModernCircularGauge.prototype.initCustomShapes = function(){};
    /**
     * Force update gauge
     * @returns {geotoolkit.gauges.knownGauges.ModernCircularGauge}
     */
    geotoolkit.gauges.knownGauges.ModernCircularGauge.prototype.update = function(){};

/**
 * Defines a Circular Gauge with two values.
 *
 * @class geotoolkit.gauges.knownGauges.DoubleCircularGauge
 * @augments geotoolkit.gauges.Gauge
 * @param {number | object} left X location of the left boundary of the gauge or a JSON with parameters
 * @param {number | object} left.left=0 X location of the left boundary of the gauge or a JSON with parameters
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} left.right X location of the right boundary of the gauge
 * @param {number} left.bottom Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.externalLow=0] Min of the external gauge
 * @param {number} [left.externalHigh=1] Max of the external gauge
 * @param {string} [left.externalName='Unknown'] Name of the external gauge
 * @param {number} [left.internalLow=0] Min of the internal gauge
 * @param {number} [left.internalHigh=1] Max of the internal gauge
 * @param {string} [left.internalName='Unknown'] Name of the internal gauge
 * @param {function} [left.externalTickStrategy=function] The external tick strategy of the gauge, default will generate a random between 0 and 100
 * @param {function} [left.internalTickStrategy=function] The internal tick strategy of the gauge, default will generate a random between 0 and 100
 *
 * @param {number} right X location of the right boundary of the gauge
 * @param {number} bottom Y location of the bottom boundary of the gauge
 * @param {number} [width=0] Width of the gauge
 * @param {number} [height=0] Height of the gauge
 * @param {number} [externalLow=0] Min of the external gauge
 * @param {number} [externalHigh=1] Max of the external gauge
 * @param {string} [externalName='Unknown'] Name of the external gauge
 * @param {number} [internalLow=0] Min of the internal gauge
 * @param {number} [internalHigh=1] Max of the internal gauge
 * @param {string} [internalName='Unknown'] Name of the internal gauge
 * @param {function} [externalTickStrategy=function] The external tick strategy of the gauge, default will generate a random between 0 and 100
 * @param {function} [internalTickStrategy=function] The internal tick strategy of the gauge, default will generate a random between 0 and 100
 * @deprecated
 */
geotoolkit.gauges.knownGauges.DoubleCircularGauge = {};
    /**
     * Initialize gauge. Overrides parent method
     * @returns {geotoolkit.gauges.knownGauges.DoubleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.initCustomShapes = function(){};
    /**
     * Get name shape for internal circle
     * @returns {geotoolkit.scene.shapes.Text}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.getInternalNameShape = function(){};
    /**
     * Get value shape for internal circle
     * @returns {geotoolkit.scene.shapes.Text}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.getInternalValueShape = function(){};
    /**
     * Set minimum for inner circle
     * @param {number} min min for inner circle
     * @returns {geotoolkit.gauges.knownGauges.DoubleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.setInternalLow = function(min){};
    /**
     * Set maximum for inner circle
     * @param {number} max New maximum value
     * @returns {geotoolkit.gauges.knownGauges.DoubleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.setInternalHigh = function(max){};
    /**
     * Get circular shape for external circle
     * @returns {geotoolkit.gauges.shapes.CircularShape}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.getCircularShape = function(){};
    /**
     * Get circular tick for internal circle
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.getInternalCircularTick = function(){};
    /**
     * Get circular shape for internal circle
     * @returns {geotoolkit.gauges.shapes.CircularShape}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.getInternalCircularShape = function(){};
    /**
     * Get circular tick for external circle
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.getCircularTick = function(){};
    /**
     * Updates values in both circles. Overrides gauge updateValue
     * @returns {geotoolkit.gauges.knownGauges.DoubleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.updateValue = function(){};
    /**
     * Update gauge. Override this method to customize inherited gauges
     * @returns {geotoolkit.gauges.knownGauges.DoubleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.update = function(){};
    /**
     * Initialize gauge. Overrides parent method
     * @returns {geotoolkit.gauges.knownGauges.DoubleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.init = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     * @returns {object} props.circularshape Circular shape (see getProperties in geotoolkit.gauges.shapes.CircularShape)
     * @returns {object} props.circulartick Circular tick (see getProperties in geotoolkit.gauges.shapes.CircularTick)
     * @returns {object} props.innercircularshape Inner circular shape (see getProperties in geotoolkit.gauges.shapes.CircularShape)
     * @returns {object} props.innercirculartick Inner circular tick (see getProperties in geotoolkit.gauges.shapes.CircularTick)
     * @returns {object} props.innernameshape Inner shape name text (see getProperties in geotoolkit.gauges.shapes.CircularTick)
     * @returns {object} props.innervalueshape Inner shape value text (see getProperties in geotoolkit.scene.shapes.Text)
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {number} [properties.value] Shape value
     * @param {geotoolkit.gauges.shapes.CircularShape | object} [properties.circularshape] circular shape
     * @param {geotoolkit.gauges.shapes.CircularTick | object} [properties.circulartick] circular tick
     * @param {geotoolkit.gauges.shapes.CircularShape | object} [properties.innercircularshape] inner circular shape
     * @param {geotoolkit.gauges.shapes.CircularTick | object} [properties.innercirculartick] inner circular tick
     * @param {geotoolkit.scene.shapes.Text | object} [properties.innernameshape] inner shape name text
     * @param {geotoolkit.scene.shapes.Text | object} [properties.innervalueshape] inner shape value text
     * @returns {geotoolkit.gauges.knownGauges.DoubleCircularGauge}
     */
    geotoolkit.gauges.knownGauges.DoubleCircularGauge.prototype.setProperties = function(properties){};

/**
 * Defines a Simple Digital Gauge
 *
 * @class geotoolkit.gauges.knownGauges.SimpleDigitalGauge
 * @augments geotoolkit.gauges.Gauge
 * @param {number | object} left x location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of ranges to apply
 * @deprecated
 */
geotoolkit.gauges.knownGauges.SimpleDigitalGauge = {};
    /**
     * Initialize gauge components. Overrides parent method
     * @returns {geotoolkit.gauges.knownGauges.SimpleDigitalGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleDigitalGauge.prototype.initCustomShapes = function(){};
    /**
     * Initialize gauge. Overrides parent method
     * @returns {geotoolkit.gauges.knownGauges.SimpleDigitalGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleDigitalGauge.prototype.init = function(){};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * @returns {geotoolkit.gauges.knownGauges.SimpleDigitalGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleDigitalGauge.prototype.reloadRanges = function(){};
    /**
     * Get contour Rectangle. This is the rectangle affected by the Alarm
     * @returns {geotoolkit.scene.shapes.Rectangle}
     */
    geotoolkit.gauges.knownGauges.SimpleDigitalGauge.prototype.getContourRectangle = function(){};
    /**
     * Get inner Rectangle. This is the colored static rectangle
     * @returns {geotoolkit.scene.shapes.Rectangle}
     */
    geotoolkit.gauges.knownGauges.SimpleDigitalGauge.prototype.getInnerRectangle = function(){};
    /**
     * Force update gauge
     * @returns {geotoolkit.gauges.knownGauges.SimpleDigitalGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleDigitalGauge.prototype.update = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     * @returns {geotoolkit.scene.shapes.Rectangle} props.contourRectangle Contour rectangle
     * @returns {geotoolkit.scene.shapes.Rectangle} props.innerRectangle Inner rectangle
     * @returns {geotoolkit.gauges.alarms.Alarm} props.alarmContour Contour alarm
     */
    geotoolkit.gauges.knownGauges.SimpleDigitalGauge.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {geotoolkit.scene.shapes.Rectangle} [properties.contourRectangle] Contour rectangle
     * @param {geotoolkit.scene.shapes.Rectangle} [properties.innerRectangle] Inner rectangle
     * @param {geotoolkit.gauges.alarms.Alarm} [properties.alarmContour] Contour alarm
     * @returns {geotoolkit.gauges.knownGauges.SimpleDigitalGauge}
     */
    geotoolkit.gauges.knownGauges.SimpleDigitalGauge.prototype.setProperties = function(properties){};

/**
 * Defines an vertical gauge
 *
 * @class geotoolkit.gauges.knownGauges.VerticalGauge
 * @augments geotoolkit.gauges.knownGauges.LinearGauge
 * @param {number | object} left X location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 * @param {string} [left.name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [left.ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @param {string} [name="Undefined Gauge"] Name of the gauge
 * @param {Array.<geotoolkit.gauges.utils.Range>} [ranges=[]] Array of geotoolkit.gauges.utils.Range to apply
 * @deprecated
 */
geotoolkit.gauges.knownGauges.VerticalGauge = {};

/**
 * Defines a Modern Vertical Gauge
 *
 * @class geotoolkit.gauges.knownGauges.ModernVerticalGauge
 * @augments geotoolkit.gauges.knownGauges.VerticalGauge
 * @param {number | object} left X location of the left boundary of the gauge or JSON with parameters
 * @param {number} [left.left=0] X location of the left boundary of the gauge
 * @param {number} [left.top=0] Y location of the top boundary of the gauge
 * @param {number} [left.right=null] X location of the right boundary of the gauge
 * @param {number} [left.bottom=null] Y location of the bottom boundary of the gauge
 * @param {number} [left.width=0] Width of the gauge
 * @param {number} [left.height=0] Height of the gauge
 * @param {number} [left.min=0] Minimum of the gauge
 * @param {number} [left.max=0] Maximum of the gauge
 *
 * @param {number} [top=0] X location of the right boundary of the gauge
 * @param {number} [right=null] Y location of the bottom boundary of the gauge
 * @param {number} [bottom=null] Width of the gauge
 * @param {number} [width=0] Height of the gauge
 * @param {number} [height=0] Minimum of the gauge
 * @param {number} [min=0] Maximum of the gauge
 * @deprecated
 */
geotoolkit.gauges.knownGauges.ModernVerticalGauge = {};
    /**
     * Initialize gauge components. Overrides parent method
     * @returns {geotoolkit.gauges.knownGauges.ModernVerticalGauge}
     */
    geotoolkit.gauges.knownGauges.ModernVerticalGauge.prototype.initCustomShapes = function(){};

/**
 * Implements a horizontal/vertical bar gauge which has color defined ranges that are portrayed by a
 * axis-like color bar. The gauge displays one value, unit, and status. A linear numeric axis is also present
 * @class geotoolkit.gauges.knownGauges.ColorRangeBarGauge
 * @augments geotoolkit.gauges.knownGauges.LinearGauge
 * @param {object} params JSON with options to set
 * @param {object} [params.axis] Properties pertaining to axis shape
 * @param {number} [params.axis.width] Width of axis
 * @param {object} [params.axis.ticks] Object with tick properties see {@link geotoolkit.axis.AdaptiveTickGenerator}
 * @param {object} [params.colorbar] Properties pertaining to colorbar shape
 * @param {number} [params.colorbar.width] Width of colorbar
 * @param {Array.<geotoolkit.gauges.utils.Range>} [params.colorbar.ranges] Ranges that the color bar displays
 * @param {object} [params.units] Properties pertaining to units shape
 * @param {string} [params.units.text] Units text
 * @param {object} [params.name] Properties pertaining to name shape
 * @param {string} [params.name.text] Gauge name
 * @param {geotoolkit.attributes.TextStyle} [params.name.textstyle] Styling of gauge name
 * @param {number} [params.name.maxcharacters] Maximum number of characters displayed in gauge name
 * @param {object} [params.background] Properties pertaining to background shape
 * @param {geotoolkit.attributes.FillStyle} [params.background.fillstyle] Fill Style of background
 * @param {geotoolkit.attributes.LineStyle} [params.background.linestyle] Line Style of background
 * @param {object} [params.status] Properties pertaining to status shape
 * @param {geotoolkit.attributes.TextStyle} [params.status.textstyle] Text style of status shape
 * @param {object} [params.value] Properties pertaining to value shape
 * @param {number} [params.value.value] Value to set
 * @param {geotoolkit.attributes.TextStyle} [params.value.textstyle] Text style of value shape
 * @param {Array.<object>} [params.value.ranges] Ranges to display with handler functions
 * @deprecated
 */
geotoolkit.gauges.knownGauges.ColorRangeBarGauge = {};
    /**
     * Sets options pertaining to this gauge
     * @param {object} data JSON with options to set
     * @param {object} [data.axis] Properties pertaining to axis shape
     * @param {number} [data.axis.width] Width of axis
     * @param {object} [data.axis.ticks] Object with tick properties see {@link geotoolkit.axis.AdaptiveTickGenerator}
     * @param {object} [data.colorbar] Properties pertaining to colorbar shape
     * @param {number} [data.colorbar.width] Width of colorbar
     * @param {Array.<geotoolkit.gauges.utils.Range>} [data.colorbar.ranges] Ranges that the color bar displays
     * @param {object} [data.units] Properties pertaining to units shape
     * @param {string} [data.units.text] Units text
     * @param {object} [data.name] Properties pertaining to name shape
     * @param {string} [data.name.text] Gauge name
     * @param {geotoolkit.attributes.TextStyle} [data.name.textstyle] Styling of gauge name
     * @param {number} [data.name.maxcharacters] Maximum number of characters displayed in gauge name
     * @param {object} [data.background] Properties pertaining to background shape
     * @param {geotoolkit.attributes.FillStyle} [data.background.fillstyle] Fill Style of background
     * @param {geotoolkit.attributes.LineStyle} [data.background.linestyle] Line Style of background
     * @param {object} [data.status] Properties pertaining to status shape
     * @param {geotoolkit.attributes.TextStyle} [data.status.textstyle] Text style of status shape
     * @param {object} [data.value] Properties pertaining to value shape
     * @param {number} [data.value.value] Value to set
     * @param {geotoolkit.attributes.TextStyle} [data.value.textstyle] Text style of value shape
     * @param {Array.<object>} [data.value.ranges] Ranges to display with handler functions
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.setOptions = function(data){};
    /**
     * Returns properties pertaining to this object
     * @returns {object} data JSON with options to set
     * @returns {object} data.axis Properties pertaining to axis shape
     * @returns {number} data.axis.width Width of axis
     * @returns {object} data.axis.ticks Object with tick properties see {@link geotoolkit.axis.AdaptiveTickGenerator}
     * @returns {object} data.colorbar Properties pertaining to colorbar shape
     * @returns {number} data.colorbar.width Width of colorbar
     * @returns {Array.<geotoolkit.gauges.utils.Range>} data.colorbar.ranges Ranges that the color bar displays
     * @returns {object} data.units] roperties pertaining to units shape
     * @returns {string} data.units.text Units text
     * @returns {object} data.name Properties pertaining to name shape
     * @returns {string} data.name.text Gauge name
     * @returns {geotoolkit.attributes.TextStyle} data.name.textstyle Styling of gauge name
     * @returns {number} data.name.maxcharacters Maximum number of characters displayed in gauge name
     * @returns {object} data.background Properties pertaining to background shape
     * @returns {geotoolkit.attributes.FillStyle} data.background.fillstyle Fill Style of background
     * @returns {geotoolkit.attributes.LineStyle} data.background.linestyle Line Style of background
     * @returns {object} data.status Properties pertaining to status shape
     * @returns {geotoolkit.attributes.TextStyle} data.status.textstyle Text style of status shape
     * @returns {object} data.value Properties pertaining to value shape
     * @returns {number} data.value.value Value to set
     * @returns {geotoolkit.attributes.TextStyle} data.value.textstyle Text style of value shape
     * @returns {Array.<object>} data.value.ranges Ranges to display with handler functions
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.getOptions = function(){};
    /**
     * Sets options pertaining to this gauge
     * @param {object} data JSON with options to set
     * @param {object} [data.axis] Properties pertaining to axis shape
     * @param {number} [data.axis.width] Width of axis
     * @param {object} [data.axis.ticks] Object with tick properties see {@link geotoolkit.axis.AdaptiveTickGenerator}
     * @param {object} [data.colorbar] Properties pertaining to colorbar shape
     * @param {number} [data.colorbar.width] Width of colorbar
     * @param {Array.<geotoolkit.gauges.utils.Range>} [data.colorbar.ranges] Ranges that the color bar displays
     * @param {object} [data.units] Properties pertaining to units shape
     * @param {string} [data.units.text] Units text
     * @param {object} [data.name] Properties pertaining to name shape
     * @param {string} [data.name.text] Gauge name
     * @param {geotoolkit.attributes.TextStyle} [data.name.textstyle] Styling of gauge name
     * @param {number} [data.name.maxcharacters] Maximum number of characters displayed in gauge name
     * @param {object} [data.background] Properties pertaining to background shape
     * @param {geotoolkit.attributes.FillStyle} [data.background.fillstyle] Fill Style of background
     * @param {geotoolkit.attributes.LineStyle} [data.background.linestyle] Line Style of background
     * @param {object} [data.status] Properties pertaining to status shape
     * @param {geotoolkit.attributes.TextStyle} [data.status.textstyle] Text style of status shape
     * @param {object} [data.value] Properties pertaining to value shape
     * @param {number} [data.value.value] Value to set
     * @param {geotoolkit.attributes.TextStyle} [data.value.textstyle] Text style of value shape
     * @param {Array.<object>} [data.value.ranges] Ranges to display with handler functions
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.setProperties = function(data){};
    /**
     * Returns properties pertaining to this object
     * @returns {object} data JSON with options to set
     * @returns {object} data.axis Properties pertaining to axis shape
     * @returns {number} data.axis.width Width of axis
     * @returns {object} data.axis.ticks Object with tick properties see {@link geotoolkit.axis.AdaptiveTickGenerator}
     * @returns {object} data.colorbar Properties pertaining to colorbar shape
     * @returns {number} data.colorbar.width Width of colorbar
     * @returns {Array.<geotoolkit.gauges.utils.Range>} data.colorbar.ranges Ranges that the color bar displays
     * @returns {object} data.units] roperties pertaining to units shape
     * @returns {string} data.units.text Units text
     * @returns {object} data.name Properties pertaining to name shape
     * @returns {string} data.name.text Gauge name
     * @returns {geotoolkit.attributes.TextStyle} data.name.textstyle Styling of gauge name
     * @returns {number} data.name.maxcharacters Maximum number of characters displayed in gauge name
     * @returns {object} data.background Properties pertaining to background shape
     * @returns {geotoolkit.attributes.FillStyle} data.background.fillstyle Fill Style of background
     * @returns {geotoolkit.attributes.LineStyle} data.background.linestyle Line Style of background
     * @returns {object} data.status Properties pertaining to status shape
     * @returns {geotoolkit.attributes.TextStyle} data.status.textstyle Text style of status shape
     * @returns {object} data.value Properties pertaining to value shape
     * @returns {number} data.value.value Value to set
     * @returns {geotoolkit.attributes.TextStyle} data.value.textstyle Text style of value shape
     * @returns {Array.<object>} data.value.ranges Ranges to display with handler functions
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.getProperties = function(){};
    /**
     * Sets fill style for fill bu value shape
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.setValueFillStyle = function(fillStyle, merge){};
    /**
     * Gets fill style for fill bu value shape
     * @returns {geotoolkit.attributes.FillStyle} fillStyle New fill style to set
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.getValueFillStyle = function(){};
    /**
     * Applies a new set of color ranges to the color bar
     * @param {Array.<geotoolkit.gauges.utils.Range>} ranges New ranges to apply
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.setColorRanges = function(ranges){};
    /**
     * Applies a new set of color ranges to the color bar
     * @returns {Array.<geotoolkit.gauges.utils.Range>} ranges Color ranges
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.getColorRanges = function(){};
    /**
     * Rebuild node. This method resets state, cache, and invalidate node.
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.rebuild = function(){};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.reloadRanges = function(){};
    /**
     * Set new gauge value, check if there are any defined ranges that this value falls within and call its handler
     * @param {number} val New value of the gauge
     * @param {boolean} [animated] animated True to perform an animation
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.setValue = function(val, animated){};
    /**
     * Forced update the gauge
     * @param {boolean} [forceUpdate]
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.update = function(forceUpdate){};
    /**
     * Refresh gauge limits.
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.refreshLimits = function(){};
    /**
     * Initializes standsrd shapes pertaining to the gauge
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.initShapes = function(){};
    /**
     * Gets color bar shape
     * @returns {geotoolkit.gauges.shapes.ColorBarShape}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.getColorBar = function(){};
    /**
     * Gets group that contains color bar
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.getColorBarGroup = function(){};
    /**
     * Gets shape which displays status
     * @returns {geotoolkit.scene.shapes.Text}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.getStatusShape = function(){};
    /**
     * Gets shape which displays units
     * @returns {geotoolkit.scene.shapes.Text}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.getUnitsShape = function(){};
    /**
     * Only in vertical gauge returns axis which contains the color bar.
     * In horizontal shape will return null
     * @returns {geotoolkit.axis.Axis}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.getColorAxis = function(){};
    /**
     * Only in vertical gauge returns axis Group which contains the color bar.
     * In horizontal shape will return null
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.getColorAxisGroup = function(){};
    /**
     * Initializes gauge components. Overrides parent method
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.initCustomShapes = function(){};
    /**
     * Changes status text of the gauge (Everything after 'Status: ' prefix)
     * @param {string} status New status to set
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.setStatus = function(status){};
    /**
     * Updates static shapes
     * @returns {geotoolkit.gauges.knownGauges.ColorRangeBarGauge}
     */
    geotoolkit.gauges.knownGauges.ColorRangeBarGauge.prototype.updateStatic = function(){};

/**
 * @class geotoolkit.gauges.shapes.ColorBarShape
 * @augments geotoolkit.scene.Group
 * @param {object} params A JSON with properties
 * @param {Array.<geotoolkit.gauges.utils.Range>} params.ranges Ranges that this color bar represents
 * @param {string | geotoolkit.util.Orientation} params.orientation Orientation of the color bar
 * @param {number} params.max Maximum of the range represented by this color bar
 * @param {number} params.min Minimum of the range represented by this color bar
 * @deprecated
 */
geotoolkit.gauges.shapes.ColorBarShape = {};
    /**
     * Applies a new set of color ranges to the color bar
     * @param {Array.<geotoolkit.gauges.utils.Range>} ranges New ranges to apply
     * @returns {geotoolkit.gauges.shapes.ColorBarShape}
     */
    geotoolkit.gauges.shapes.ColorBarShape.prototype.setColorRanges = function(ranges){};
    /**
     * Adds one range to color ranges
     * @param {geotoolkit.gauges.utils.Range} range New range to add
     * @returns {geotoolkit.gauges.shapes.ColorBarShape}
     */
    geotoolkit.gauges.shapes.ColorBarShape.prototype.addRange = function(range){};
    /**
     * Flips the color bar range positions
     * @returns {geotoolkit.gauges.shapes.ColorBarShape}
     */
    geotoolkit.gauges.shapes.ColorBarShape.prototype.flip = function(){};
    /**
     * Sets flipped state
     * @param {boolean} flipped Flipped flag
     * @returns {geotoolkit.gauges.shapes.ColorBarShape}
     */
    geotoolkit.gauges.shapes.ColorBarShape.prototype.setFlipped = function(flipped){};
    /**
     * Gets flipped state
     * @returns {boolean}
     */
    geotoolkit.gauges.shapes.ColorBarShape.prototype.isFlipped = function(){};
    /**
     * Sets minimum of the shape
     * @param {number} min New minimum bound of the shape
     * @returns {geotoolkit.gauges.shapes.ColorBarShape}
     */
    geotoolkit.gauges.shapes.ColorBarShape.prototype.setMin = function(min){};
    /**
     * Sets maximum of the shape
     * @param {number} max New maximum bound of the shape
     * @returns {geotoolkit.gauges.shapes.ColorBarShape}
     */
    geotoolkit.gauges.shapes.ColorBarShape.prototype.setMax = function(max){};
    /**
     * Sets properties pertaining to this object
     * @param {object} props Properties to apply
     * @param {Array.<geotoolkit.gauges.utils.Range>} props.ranges Ranges that this color bar represents
     * @param {string | geotoolkit.util.Orientation} props.orientation Orientation of the color bar
     * @param {number} props.max Maximum of the range represented by this color bar
     * @param {number} props.min Minimum of the range represented by this color bar
     * @returns {geotoolkit.gauges.shapes.ColorBarShape}
     */
    geotoolkit.gauges.shapes.ColorBarShape.prototype.setProperties = function(props){};
    /**
     * Gets properties pertaining to this object
     * @returns {object} props Properties to apply
     * @returns {Array.<geotoolkit.gauges.utils.Range>} props.ranges Ranges that this color bar represents
     * @returns {string | geotoolkit.util.Orientation} props.orientation Orientation of the color bar
     * @returns {number} props.max Maximum of the range represented by this color bar
     * @returns {number} props.min Minimum of the range represented by this color bar
     */
    geotoolkit.gauges.shapes.ColorBarShape.prototype.getProperties = function(){};

/**
 * Defines a Base Shape
 *
 * @class geotoolkit.gauges.shapes.BaseShape
 * @augments geotoolkit.scene.Group
 * @param {number} low low value of the range
 * @param {number} high high value of the range
 * @param {geotoolkit.util.Point} center center location of the shape
 * @param {geotoolkit.gauges.shapes.NeedleShape} needle needle to be used for this shape
 * @param {boolean} fillbyvalue chooses to draw based on value
 * @param {Array} rangeset set of ranges for display
 * @param {geotoolkit.attributes.LineStyle} linestyle lineStyle for the shape
 * @deprecated
 */
geotoolkit.gauges.shapes.BaseShape = {};
    /**
     * Add range to rangeSet
     *@param {geotoolkit.gauges.utils.Range} range Range to be added to Array of ranges
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.addRange = function(range){};
    /**
     * Set needle
     * @param {geotoolkit.gauges.shapes.NeedleShape} needle to use
     * @returns {geotoolkit.gauges.shapes.BaseShape}
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.setNeedle = function(needle){};
    /**
     * Get needle
     * @returns {geotoolkit.gauges.shapes.NeedleShape} needle in use
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.getNeedle = function(){};
    /**
     * Set rangeSet
     * @param {Array} set
     * @returns {geotoolkit.gauges.shapes.BaseShape} this
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.setRangeSet = function(set){};
    /**
     * Set refresh behavior.
     *@param {boolean} fill true if shape affected by value, false if shape is static
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.setFillByValue = function(fill){};
    /**
     * Get refresh behavior.
     *@returns {boolean} true if shape affected by value, false if shape is static
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.getFillByValue = function(){};
    /**
     * Get line style
     *@returns {geotoolkit.attributes.LineStyle} linestyle
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.getLineStyle = function(){};
    /**
     * Set low value
     * @param {number} low low value
     * @returns {geotoolkit.gauges.shapes.BaseShape} this
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.setLow = function(low){};
    /**
     * Normalize a value based on the low and high
     *@param {number} value value to normalize
     *@returns {number} value in [0-1] range
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.normalize = function(value){};
    /**
     * Pre-Normalize a value based on the low and high
     *@param {number} value value to normalize
     *@returns {number} value in [min-max] range
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.prenormalize = function(value){};
    /**
     * Set high value
     * @param {number} high high value
     * @returns {geotoolkit.gauges.shapes.BaseShape} this
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.setHigh = function(high){};
    /**
     * get high value
     *@returns {number} high high value
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.getHigh = function(){};
    /**
     * get low value
     *@returns {number} low low value
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.getLow = function(){};
    /**
     * Init Elements.
     * Override to define action
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.initElements = function(){};
    /**
     * Get static elements
     * @returns {Array} Static elements
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.getStaticElements = function(){};
    /**
     * Get dynamic elements
     *@returns {Array} Dynamic elements
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.getDynamicElements = function(){};
    /**
     * Set center anchor
     * @param {geotoolkit.util.Point} center center point
     * @returns {geotoolkit.gauges.shapes.BaseShape} this
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.setCenter = function(center){};
    /**
     * Get center anchor
     * @returns {geotoolkit.util.Point} center point
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.getCenter = function(){};
    /**
     * Get alarm
     * @returns {geotoolkit.gauges.alarms.Alarm} alarm to be used
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.getAlarm = function(){};
    /**
     * Get ranges
     * @returns {Array<geotoolkit.util.Range>} Ranges to be used
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.getRanges = function(){};
    /**
     * Set line style
     * @param {geotoolkit.attributes.LineStyle} style linestyle to be used by the shape(s)
     * @returns {geotoolkit.gauges.shapes.BaseShape} this
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.setLineStyle = function(style){};
    /**
     * Force hardcoded shapes to reload based on new ranges
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.reloadRanges = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {object} [props] JSON containing the properties to get
     * @returns {geotoolkit.util.Point} [props.center] center position
     * @returns {array} [props.rangeset] array of geotoolkit.gauges.utils.Range
     * @returns {boolean} [props.fillbyvalue] is filled by value
     * @returns {number} [props.min] min value
     * @returns {number} [props.max] max value
     * @returns {object} [props.needle] needle shape (see getProperties in {@link geotoolkit.gauges.shapes.NeedleShape} )
     * @returns {geotoolkit.attributes.LineStyle} [props.linestyle] lineStyle
     * @returns {geotoolkit.gauges.alarms.Alarm} [props.alarm] alarm
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {geotoolkit.util.Point} [properties.center] center position
     * @param {array} [properties.rangeset] array of geotoolkit.gauges.utils.Range
     * @param {boolean} [properties.fillbyvalue] is filled by value
     * @param {number} [properties.min] min value
     * @param {number} [properties.max] max value
     * @param {geotoolkit.gauges.shapes.NeedleShape | object} [properties.needle] needle shape
     * @param {geotoolkit.attributes.LineStyle} [properties.linestyle] lineStyle
     * @param {geotoolkit.gauges.alarms.Alarm | object} [properties.alarm] alarm
     * @returns {geotoolkit.gauges.shapes.BaseShape} this
     */
    geotoolkit.gauges.shapes.BaseShape.prototype.setProperties = function(properties){};

/**
 * Shape defined by a symbol and a text, updated based on an Alarm behavior.
 *
 * @class geotoolkit.gauges.shapes.AlarmShape
 * @augments geotoolkit.gauges.shapes.BaseShape
 * @param {geotoolkit.scene.shapes.Symbol | Object} [symbol=null] Symbol to be used or JSON with parameters
 * @param {geotoolkit.scene.shapes.Symbol} [symbol.symbol=null] Symbol to be used
 * @param {string} [symbol.text=''] Text for the alarm shape
 * @param {geotoolkit.gauges.alarms.Alarm} [symbol.alarm=null] Alarm to be used
 * @param {string} [text=''] Text for the alarm shape
 * @param {geotoolkit.gauges.alarms.Alarm} [alarm=null] Alarm to be used
 * @deprecated
 */
geotoolkit.gauges.shapes.AlarmShape = {};
    /**
     * Initialize shape elements.
     * Override this method to customize shape
     * @returns {geotoolkit.gauges.shapes.AlarmShape}
     */
    geotoolkit.gauges.shapes.AlarmShape.prototype.initElements = function(){};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * @returns {geotoolkit.gauges.shapes.AlarmShape}
     */
    geotoolkit.gauges.shapes.AlarmShape.prototype.reloadRanges = function(){};
    /**
     * Set alarm for this shape
     * @param {geotoolkit.gauges.alarms.Alarm} alarm Alarm to be used
     * @returns {geotoolkit.gauges.shapes.AlarmShape}
     */
    geotoolkit.gauges.shapes.AlarmShape.prototype.setAlarm = function(alarm){};
    /**
     * Set symbol for this shape
     * @param {geotoolkit.scene.shapes.Symbol} symbol symbol to be used
     * @returns {geotoolkit.gauges.shapes.AlarmShape}
     */
    geotoolkit.gauges.shapes.AlarmShape.prototype.setSymbol = function(symbol){};
    /**
     * Set text for this shape
     * @param {geotoolkit.scene.shapes.Text} text to be used
     * @returns {geotoolkit.gauges.shapes.AlarmShape}
     */
    geotoolkit.gauges.shapes.AlarmShape.prototype.setText = function(text){};
    /**
     * Get symbol of this shape
     * @returns {geotoolkit.scene.shapes.Symbol} Symbol in use
     */
    geotoolkit.gauges.shapes.AlarmShape.prototype.getSymbol = function(){};
    /**
     * Get text used in this shape
     * @returns {geotoolkit.scene.shapes.Text} Text in use
     */
    geotoolkit.gauges.shapes.AlarmShape.prototype.getText = function(){};

/**
 * Defines a Circular Shape
 *
 * @class geotoolkit.gauges.shapes.CircularShape
 * @augments geotoolkit.gauges.shapes.BaseShape
 * @param {number} innerradius innerRadius of the circle
 * @param {number} outerradius outerRadius of the circle
 * @param {number} startangle startAngle of the circle
 * @param {number} endangle endAngle of the circle
 * @deprecated
 */
geotoolkit.gauges.shapes.CircularShape = {};
    /**
     * Initialize shape elements
     * Override to customize inherited classes
     * @returns {geotoolkit.gauges.shapes.CircularShape}
     */
    geotoolkit.gauges.shapes.CircularShape.prototype.initElements = function(){};
    /**
     * Set angle range in which the shape will be displayed
     * @param {number} start start Angle
     * @param {number} end end Angle
     * @returns {geotoolkit.gauges.shapes.CircularShape} this
     */
    geotoolkit.gauges.shapes.CircularShape.prototype.setAngles = function(start, end){};
    /**
     * Set radius range for shape
     * @param {number} inner inner radius
     * @param {number} outer outer radius
     * @returns {geotoolkit.gauges.shapes.CircularShape} this
     */
    geotoolkit.gauges.shapes.CircularShape.prototype.setRadius = function(inner, outer){};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * @returns {geotoolkit.gauges.shapes.CircularShape}
     */
    geotoolkit.gauges.shapes.CircularShape.prototype.reloadRanges = function(){};
    /**
     * Creates a light grey shadow on the outer circle of the gauge
     * @returns {geotoolkit.gauges.shapes.CircularShape}
     */
    geotoolkit.gauges.shapes.CircularShape.prototype.initShadow = function(){};
    /**
     * Create a behavior for the needle element
     * @returns {geotoolkit.gauges.shapes.CircularShape}
     */
    geotoolkit.gauges.shapes.CircularShape.prototype.initNeedle = function(){};
    /**
     * Gets an object with inner and outer radius set on this shape
     * @returns {object} obj Object with radii
     * @returns {number} obj.inner Inner radius
     * @returns {number} obj.outer Outer radius
     */
    geotoolkit.gauges.shapes.CircularShape.prototype.getRadius = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props An object containing the properties to get
     * @returns {number} props.innerradius Size of the inner radius
     * @returns {number} props.outerradius Size of the outer radius
     * @returns {number} props.startangle Angle where the arc starts
     * @returns {number} props.endangle Angle where the arc ends
     * @returns {number} props.endangle Angle where the arc ends
     * @returns {number} props.deltaarc Delta angle
     * @returns {geotoolkit.scene.Group} props.circles Circles group
     */
    geotoolkit.gauges.shapes.CircularShape.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.innerradius] Inner radius length
     * @param {number} [properties.outerradius] Outer radius length
     * @param {number} [properties.startangle] Angle where the arc starts
     * @param {number} [properties.endangle] Angle where the arc ends
     * @param {number} [properties.deltaarc] Delta angle
     * @param {geotoolkit.scene.Group} [properties.circles] Group containing circle components
     * @returns {geotoolkit.gauges.shapes.CircularShape}
     */
    geotoolkit.gauges.shapes.CircularShape.prototype.setProperties = function(properties){};

/**
 * Create Ticks for Circular Shapes
 *
 * @class geotoolkit.gauges.shapes.CircularTick
 * @augments geotoolkit.gauges.shapes.BaseShape
 * @param {geotoolkit.util.Point | Object} [center=geotoolkit.gauges.utils.StandardLocation.Center] Center point of the circular gauge or JSON with parameters
 * @param {geotoolkit.util.Point} [center.center=geotoolkit.gauges.utils.StandardLocation.Center] Center point of the circular gauge
 * @param {number} [center.innerrad=0.1] Inner limit of the shape
 * @param {number} [center.outerrad=0.3] Outer limit of the shape
 * @param {number} [center.startangle=-PI] Angle at which low value is displayed
 * @param {number} [center.endangle=PI/2] Angle at which high value is displayed

 * @param {number} [innerRad=0.1] Inner limit of the shape
 * @param {number} [outerRad=0.3] Outer limit of the shape
 * @param {number} [startAngle=-PI] Angle at which low value is displayed
 * @param {number} [endAngle=PI/2] Angle at which high value is displayed
 * @deprecated
 */
geotoolkit.gauges.shapes.CircularTick = {};
    /**
     * Sets the offset that labels have from the ticks
     * @param {number} offset Offset of the lable from tick along the radius
     * @returns {geotoolkit.gauges.shapes.CircularTick} this
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.setLabelOffset = function(offset){};
    /**
     * Init shape elements. Override of parent method
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.initElements = function(){};
    /**
     * Gets properties pertaining to the ticks of specified grade
     * @param {object} grade
     * @returns {number} obj.number Number of ticks
     * @returns {geotoolkit.attributes.LineStyle} obj.linestyle Line style of tick
     * @returns {geotoolkit.util.Range} obj.range
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.getTickProperties = function(grade){};
    /**
     * Force redraw of shape
     * @returns {?geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.redraw = function(){};
    /**
     * Set display strategy for labeling
     * @param {function} strategy Strategy function to be used
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.setDisplayStrategy = function(strategy){};
    /**
     * Get display strategy
     * @returns {function} Strategy currently used
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.getDisplayStrategy = function(){};
    /**
     * Fill tick values
     * @param {boolean} isMajorFilled Are major labels already Filled
     * @param {boolean} isMinorFilled Are minor labels already Filled
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.fillTickValues = function(isMajorFilled, isMinorFilled){};
    /**
     * Normalize index and get label using it
     * @param {array} list Array of labels
     * @param {number} i Index inside the array
     * @returns {*} Depends on array contents
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.getLabel = function(list, i){};
    /**
     * Place a tick on the gauge
     * @param {number} angle angle where to place the tick
     * @param {geotoolkit.gauges.utils.CircularTickLocation} type Location type of the tick
     * @param {geotoolkit.attributes.TextStyle} style Style of the label
     * @param {string} value Value to be displayed
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.placeTick = function(angle, type, style, value){};
    /**
     * Gets text shape used to render tick labels
     * @returns {geotoolkit.scene.shapes.Text}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.getText = function(){};
    /**
     * Get inside anchor depending on input angle
     * @param {number} angle Input angle where tick is to be placed
     * @returns {geotoolkit.util.AnchorType}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.getInsideAnchor = function(angle){};
    /**
     * Set strategy for major ticks
     * @param {number|object} number Amount of ticks to be displayed or JSON with parameters
     * @param {number} [number.number] Amount of ticks to be displayed
     * @param {geotoolkit.attributes.LineStyle} [number.style] Linestyle for ticks
     * @param {geotoolkit.util.Range} [number.range] Tick internal size
     * @param {geotoolkit.attributes.LineStyle} [style] Linestyle for ticks
     * @param {geotoolkit.util.Range} [range] Tick internal size
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.setMajorTick = function(number, style, range){};
    /**
     * Set strategy for minor ticks
     * @param {number|object} number Amount of ticks to be displayed between two major ticks
     * @param {number} [number.number] Amount of ticks to be displayed between two major ticks
     * @param {geotoolkit.attributes.LineStyle|object} [number.style] Linestyle for ticks
     * @param {geotoolkit.util.Range} [number.range] Tick internal size
     * @param {geotoolkit.attributes.LineStyle|object} [style] Linestyle for ticks
     * @param {geotoolkit.util.Range} [range] Tick internal size
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.setMinorTick = function(number, style, range){};
    /**
     * Set angle range in which the shape will be displayed
     * @param {number} start Start Angle
     * @param {number} end End Angle
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.setAngles = function(start, end){};
    /**
     * Set radius range for shape
     * @param {number} inner Inner radius
     * @param {number} outer Outer radius
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.setRadius = function(inner, outer){};
    /**
     * Set strategy for major labels
     * @param {boolean | object} visible Set visibility on or off or JSON with parameters
     * @param {geotoolkit.gauges.utils.CircularTickLocation} [visible.type] Location of ticks
     * @param {geotoolkit.attributes.TextStyle} [visible.textstyle] Style of labels
     * @param {Array.<number> | Array.<string>} [visible.values=null] List of labels to be used - null for automated values
    
     * @param {geotoolkit.gauges.utils.CircularTickLocation} [type=null] Location of ticks
     * @param {geotoolkit.attributes.TextStyle} [textstyle] Style of labels
     * @param {Array.<number> | Array.<string>} [values] List of labels to be used - null for automated values
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.setMajorLabels = function(visible, type, textstyle, values){};
    /**
     * Set strategy for minor labels
     * @param {boolean | object} visible Set visibility on or off or JSON with parameters
     * @param {boolean} visible.visible Set visibility on or off or JSON with parameters
     * @param {geotoolkit.gauges.utils.CircularTickLocation} [visible.type] Location of ticks
     * @param {geotoolkit.attributes.TextStyle} [visible.textstyle] Style of labels
     * @param {Array.<number> | Array.<string>} [visible.values=null] List of labels to be used - null for automated values
    
     * @param {geotoolkit.gauges.utils.CircularTickLocation} [type=null] Location of ticks
     * @param {geotoolkit.attributes.TextStyle} [textstyle] Style of labels
     * @param {Array.<number> | Array.<string>} [values] List of labels to be used - null for automated values
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.setMinorLabels = function(visible, type, textstyle, values){};
    /**
     * Set high value
     * @param {number} high New high value
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.setHigh = function(high){};
    /**
     * Set low value
     * @param {number} low New low value
     * @returns {geotoolkit.gauges.shapes.CircularTick}
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.setLow = function(low){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties pertaining to this object
     * @returns {number} props.width Width
     * @returns {number} props.height Height
     * @returns {number} props.outerrad Outer radius
     * @returns {number} props.innerrad Inner radius
     * @returns {geotoolkit.util.Point} [props.center] Center position
     * @returns {number} props.adaptedx Center x
     * @returns {number} props.adaptedy Center y
     * @returns {number} props.innercirclepercentage Inner circle percentage
     * @returns {number} props.startangle Angle where the angle starts
     * @returns {number} props.endangle Angle where the angle ends
     * @returns {?object} props.majortick JSON with major tick infos
     * @returns {?object} props.minortick JSON with minor tick infos
     * @returns {?object} props.majorlabel JSON with major label infos
     * @returns {?object} props.minorlabel JSON with minor label infos
     * @returns {?geotoolkit.scene.Group} props.ticklist Group of ticks
     * @returns {?string} props.displaystrategy Function display
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {number} [properties.width] Width
     * @param {number} [properties.height] Height
     * @param {number} [properties.outerrad] Outer radius
     * @param {number} [properties.innerrad] Inner radius
     * @param {geotoolkit.util.Point} [properties.center] Center position
     * @param {number} [properties.adaptedx] Center x
     * @param {number} [properties.adaptedy] Center y
     * @param {number} [properties.innercirclepercentage] Inner circle percentage
     * @param {number} [properties.startangle] Angle where the angle starts
     * @param {number} [properties.endangle] Angle where the angle ends
     * @param {object} [properties.majortick] JSON with major tick infos
     * @param {object} [properties.minortick] JSON with minor tick infos
     * @param {object} [properties.majorlabel] JSON with major label infos
     * @param {object} [properties.minorlabel] JSON with minor label infos
     * @param {geotoolkit.scene.Group} [properties.ticklist] Group of ticks
     * @param {string} [properties.displaystrategy] Function display
     * @returns {geotoolkit.gauges.shapes.CircularTick} this
     */
    geotoolkit.gauges.shapes.CircularTick.prototype.setProperties = function(properties){};

/**
 * Defines a painter to service circular ticks.
 * @class geotoolkit.gauges.shapes.CircularTickPainter
 * @param {geotoolkit.scene.shapes.Symbol} symbol A symbol to paint on the circular tick
 * @param {geotoolkit.util.Rect} bbox Bounding box of the circular tick
 * @param {geotoolkit.renderer.RenderingContext} context Rendering context
 * @deprecated
 */
geotoolkit.gauges.shapes.CircularTickPainter = {};

/**
 * Defines a RectangularShape
 *
 * @class geotoolkit.gauges.shapes.LinearShape
 * @augments geotoolkit.gauges.shapes.BaseShape
 * @param {number | object} [width=0.5] Width of the shape or JSON with parameters
 * @param {number} [width.width=0.5] Width of the shape
 * @param {number} [width.height=0.5] Height of the shape
 * @param {geotoolkit.util.Point} [width.center=geotoolkit.gauges.utils.StandardLocation.Center] Center point for this shape
 * @param {geotoolkit.attributes.LineStyle} [width.lineStyle=geotoolkit.attributes.LineStyle("black",1)] LineStyle for this shape
 * @param {geotoolkit.attributes.LineStyle} [width.vertical=false] Defines whether line is vertical or not
 * @param {number} [height=0.5] Height of the shape
 * @param {geotoolkit.util.Point} [center=geotoolkit.gauges.utils.StandardLocation.Center] Center point for this shape
 * @param {geotoolkit.attributes.LineStyle} [lineStyle=geotoolkit.attributes.LineStyle("black",1)] LineStyle for this shape
 * @deprecated
 */
geotoolkit.gauges.shapes.LinearShape = {};
    /**
     * Initialize Elements.
     * Override to customize inherited classes
     * @returns {geotoolkit.gauges.shapes.LinearShape}
     */
    geotoolkit.gauges.shapes.LinearShape.prototype.initElements = function(){};
    /**
     * Set dimensions within the gauge
     * @param {number} width Width of the gauge
     * @param {number} height Height of the gauge
     * @returns {geotoolkit.gauges.shapes.LinearShape}
     */
    geotoolkit.gauges.shapes.LinearShape.prototype.setDimensions = function(width, height){};
    /**
     * Force hardcoded shapes to reload based on new ranges
     * @returns {geotoolkit.gauges.shapes.LinearShape}
     */
    geotoolkit.gauges.shapes.LinearShape.prototype.reloadRanges = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     * @returns {boolean} props.vertical Vartical shape flag
     * @returns {geotoolkit.scene.shapes.Rectangle} props.shadow Shadow rectangle
     * @returns {geotoolkit.scene.Group} props.rects Rects group
     * @returns {geotoolkit.scene.Group} props.rectshadow Rectshadow group
     * @returns {geotoolkit.scene.Group} props.rectneedle Needle group
     */
    geotoolkit.gauges.shapes.LinearShape.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties JSON containing the properties to set
     * @param {boolean} [properties.vertical] Vartical shape flag
     * @param {geotoolkit.scene.shapes.Rectangle} [properties.shadow] Shadow rectangle
     * @param {geotoolkit.scene.Group} [properties.rects] Rects group
     * @param {geotoolkit.scene.Group} [properties.rectshadow] Rectshadow group
     * @param {geotoolkit.scene.Group} [properties.rectneedle] Needle group
     * @returns {geotoolkit.gauges.shapes.LinearShape} this
     */
    geotoolkit.gauges.shapes.LinearShape.prototype.setProperties = function(properties){};

/**
 * Defines a shape that has rounded sides
 * @class geotoolkit.gauges.shapes.AnnotatedFillGaugeShape
 * @augments geotoolkit.gauges.shapes.BaseShape
 * @param {object} params JSON with properties pertaining to this class
 * @param {number} [params.width=1]
 * @param {number} [params.height=1]
 * @param {geotoolkit.util.Orientation} [params.orientation=geotoolkit.util.Orientation.Horizontal]
 * @param {geotoolkit.attributes.LineStyle} [params.linestyle]
 * @param {geotoolkit.util.Rect} [params.bounds]
 * @param {number} [params.min=0]
 * @param {number} [params.max=0]
 * @param {boolean} [params.initshadow=true]
 * @param {geotoolkit.attributes.FillStyle} [params.fillstyle]
 * @param {Array.<geotoolkit.util.Range>} [params.ranges=[]]
 * @param {geotoolkit.attributes.LineStyle} [params.markerstyle]
 * when the fill value is bigger than the tick
 * @deprecated
 */
geotoolkit.gauges.shapes.AnnotatedFillGaugeShape = {};
    /**
     * Returns a clone of this shape
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape} clone
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.clone = function(){};
    /**
     * Updates the shape
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.update = function(){};
    /**
     * Returns axis which draws ticks on the shape
     * @returns {geotoolkit.axis.Axis|*}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.getAxis = function(){};
    /**
     * Returns tick generator which calculates lines on the shape
     * @returns {geotoolkit.axis.NumericLinearTickGenerator}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.getTickGenerator = function(){};
    /**
     * Sets needle width
     * @param {number} width
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setNeedleWidth = function(width){};
    /**
     * Sets needle height
     * @param {number} height
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setNeedleHeight = function(height){};
    /**
     * Sets color of needle line
     * @param {string} color
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setNeedleColor = function(color){};
    /**
     * Sets style for the marker which is placed at the position of current value
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape} this
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setMarkerStyle = function(lineStyle, merge){};
    /**
     * Sets bounds of the shape part
     * @param {geotoolkit.util.Rect} bounds
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setShapeBounds = function(bounds){};
    /**
     * Sets value by which the shape should be filled. Value should be from 0 to 1
     * @param {number} val Value from 0 to 1
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setFillValue = function(val){};
    /**
     * Sets fill style for value fill
     * @param {geotoolkit.attributes.FillStyle} fillstyle
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setValueFillStyle = function(fillstyle){};
    /**
     * Sets fill style
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Gets fill style
     * @returns {geotoolkit.attributes.FillStyle} fillStyle
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.getFillStyle = function(){};
    /**
     * Sets line style
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Returns line style
     * @returns {geotoolkit.attributes.LineStyle} line style
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.getLineStyle = function(){};
    /**
     * Sets edge radius to the shape
     * @param {number} radius New rsdius to set
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setEdgeRadius = function(radius){};
    /**
     * Sets fill style for the shadow element
     * @param {geotoolkit.attributes.FillStyle} fillStyle
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setShadowFillStyle = function(fillStyle, merge){};
    /**
     * Sets fill style for the shadow element
     * @returns {geotoolkit.attributes.FillStyle} fillStyle
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.getShadowFillStyle = function(){};
    /**
     * Sets value ranges for the gauge
     * @param {Array.<geotoolkit.gauges.utils.Range>} ranges
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setRanges = function(ranges){};
    /**
     * Sets orientation for the bar
     * @param {string} orientation
     * @param {boolean} [skipShadow]
     * @protected
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setOrientation = function(orientation, skipShadow){};
    /**
     * Sets shape bounds inside gauge
     *
     * @param {geotoolkit.util.Rect | object} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape} this
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setBounds = function(bounds){};
    /**
     * Returns fill value of the shape
     * @returns {number|null}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.getFillValue = function(){};
    /**
     * Returns itself as a static element
     * @returns {Array.<geotoolkit.gauges.shapes.AnnotatedFillGaugeShape>}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.getStaticElements = function(){};
    /**
     * Sets lower limit of the range
     * @param {number} low New lower limit
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setLow = function(low){};
    /**
     * Sets higher limit of the range
     * @param {number} high New higher limit
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setHigh = function(high){};
    /**
     * Setps properties pertaining to this object
     * @returns {object} props JSON containing the properties to set
     * @returns {geotoolkit.util.Point} props.center center position
     * @returns {array.<geotoolkit.gauges.utils.Range>} props.rangeset array of geotoolkit.gauges.utils.Range
     * @returns {boolean} props.fillbyvalue is filled by value
     * @returns {number} props.min min value
     * @returns {number} props.max max value
     * @returns {geotoolkit.gauges.shapes.NeedleShape | object} props.needle needle shape
     * @returns {geotoolkit.attributes.LineStyle} props.linestyle lineStyle
     * @returns {geotoolkit.gauges.alarms.Alarm | object} props.alarm alarm
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.getProperties = function(){};
    /**
     * Setps properties pertaining to this object
     * @param {object} [props] JSON containing the properties to set
     * @param {geotoolkit.util.Point} [props.center] center position
     * @param {array.<geotoolkit.gauges.utils.Range>} [props.rangeset] array of geotoolkit.gauges.utils.Range
     * @param {boolean} [props.fillbyvalue] is filled by value
     * @param {number} [props.min] min value
     * @param {number} [props.max] max value
     * @param {geotoolkit.gauges.shapes.NeedleShape | object} [props.needle] needle shape
     * @param {geotoolkit.attributes.LineStyle} [props.linestyle] lineStyle
     * @param {geotoolkit.gauges.alarms.Alarm | object} [props.alarm] alarm
     * @returns {geotoolkit.gauges.shapes.AnnotatedFillGaugeShape}
     */
    geotoolkit.gauges.shapes.AnnotatedFillGaugeShape.prototype.setProperties = function(props){};

/**
 * Defines a Horizontal Shape
 *
 * @class geotoolkit.gauges.shapes.HorizontalShape
 * @augments geotoolkit.gauges.shapes.LinearShape
 * @param {number | object} [width=0.5] width of the shape or JSON object with parameters
 * @param {number | object} [width.width=0.5] width of the shape or JSON object with parameters
 * @param {number} [width.height=0.5] height of the shapegood morning!
 * @param {geotoolkit.util.Point} [width.center=geotoolkit.gauges.utils.StandardLocation.Center] center point for this shape
 * @param {geotoolkit.attributes.LineStyle} [width.lineStyle=geotoolkit.attributes.LineStyle('black',1)] lineStyle for this shape

 * @param {number} [height=0.5] Height of the shape
 * @param {geotoolkit.util.Point} [center=geotoolkit.gauges.utils.StandardLocation.Center] Center point for this shape
 * @param {geotoolkit.attributes.LineStyle} [lineStyle=geotoolkit.attributes.LineStyle('black',1)] LineStyle for this shape
 * @deprecated
 */
geotoolkit.gauges.shapes.HorizontalShape = {};

/**
 * Defines a Vertical Shape
 *
 * @class geotoolkit.gauges.shapes.VerticalShape
 * @augments geotoolkit.gauges.shapes.LinearShape
 * @param {number | object} [width=0.5] Width of the shape or JSON with parameters
 * @param {number} [width.width=0.5] Width of the shape
 * @param {number} [width.height=0.5] Height of the shape
 * @param {geotoolkit.util.Point} [width.center=geotoolkit.gauges.utils.StandardLocation.Center] Center point for this shape
 * @param {geotoolkit.attributes.LineStyle} [width.lineStyle=geotoolkit.attributes.LineStyle("black",1)] LineStyle for this shape
 * @param {geotoolkit.attributes.LineStyle} [width.vertical=false] Defines whether line is vertical or not
 * @param {number} [height=0.5] Height of the shape
 * @param {geotoolkit.util.Point} [center=geotoolkit.gauges.utils.StandardLocation.Center] Center point for this shape
 * @param {geotoolkit.attributes.LineStyle} [lineStyle=geotoolkit.attributes.LineStyle("black",1)] LineStyle for this shape
 * @deprecated
 */
geotoolkit.gauges.shapes.VerticalShape = {};

/**
 * Defines a Needle Shape
 *
 * @class geotoolkit.gauges.shapes.NeedleShape
 * @augments geotoolkit.scene.Group
 * @param {geotoolkit.util.Point} center center of needle
 * @param {number} size size of needle
 * @param {number} lineSize lineSize for needle
 * @param {geotoolkit.scene.shapes.painters.AbstractPainter} symbolPainter symbolPainter
 * @param {number} symbolSizeX symbolSizeX for symbol
 * @param {number} symbolSizeY symbolSizeY for symbol
 * @param {string} colorFill colorFill of the needle
 * @param {string} colorLine colorLine of the needle
 */
geotoolkit.gauges.shapes.NeedleShape = {};
    /**
     * Init the shape.
     * Override to build your own
     */
    geotoolkit.gauges.shapes.NeedleShape.prototype.init = function(){};
    /**
     * Resize the shape
     * @returns {geotoolkit.gauges.shapes.NeedleShape} this
     */
    geotoolkit.gauges.shapes.NeedleShape.prototype.setSize = function(){};
    /**
     * Set the center
     * @returns {geotoolkit.gauges.shapes.NeedleShape} this
     */
    geotoolkit.gauges.shapes.NeedleShape.prototype.setCenter = function(){};
    /**
     * get the center
     * @returns {geotoolkit.util.Point} center
     */
    geotoolkit.gauges.shapes.NeedleShape.prototype.getCenter = function(){};
    /**
     * rotate the needle for Horizontal (rather than vertical) shape
     * @returns {geotoolkit.gauges.shapes.NeedleShape} this
     */
    geotoolkit.gauges.shapes.NeedleShape.prototype.forHorizontal = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {object} [props] JSON containing the properties to get
     * @returns {geotoolkit.util.Point} [props.center] center position
     * @returns {number} [props.size] size of needle
     * @returns {number} [props.symbolSizeX] X size of needle symbol
     * @returns {number} [props.symbolSizeY] Y size of needle symbol
     * @returns {number} [props.symbolSizeY] Y size of needle symbol
     * @returns {string} [props.colorFill] fill color
     * @returns {string} [props.colorLine] line color
     * @returns {number} [props.lineSize] line size
     * @returns {string} [props.symbolPainter] symbol painter
     */
    geotoolkit.gauges.shapes.NeedleShape.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing the properties to set
     * @param {geotoolkit.util.Point} [properties.center] center position
     * @param {number} [properties.size] size of needle
     * @param {number} [properties.symbolSizeX] X size of needle symbol
     * @param {number} [properties.symbolSizeY] Y size of needle symbol
     * @param {string} [properties.colorFill] fill color
     * @param {string} [properties.colorLine] line color
     * @param {number} [properties.lineSize] line size
     * @param {string} [properties.symbolPainter] symbol painter
     * @returns {geotoolkit.gauges.shapes.NeedleShape} this
     */
    geotoolkit.gauges.shapes.NeedleShape.prototype.setProperties = function(properties){};

/**
 * Defines a Needle Shape
 *
 * @class geotoolkit.gauges.shapes.needles.ModernCircular
 * @augments geotoolkit.gauges.shapes.NeedleShape
 * @param {geotoolkit.util.Point} center center
 * @param {number} size size of the needle
 * @param {string} colorFill colorFill of the needle
 * @param {string} colorLine colorLine outline of the needle
 * @param {number} centerSize centerSize of the anchor
*/
geotoolkit.gauges.shapes.needles.ModernCircular = {};
    /**
     * Init the shape.
     * Override to build your own
     */
    geotoolkit.gauges.shapes.needles.ModernCircular.prototype.init = function(){};
    /**
     * Customizes the circle
     * @param {string} color for the inner circle
     * @returns {geotoolkit.gauges.shapes.needles.ModernCircular} this
     */
    geotoolkit.gauges.shapes.needles.ModernCircular.prototype.setCircleColor = function(color){};
    /**
     * Customizes the circle
     * @param {geotoolkit.attributes.FillStyle} fillstyle for the inner circle
     * @returns {geotoolkit.gauges.shapes.needles.ModernCircular} this
     */
    geotoolkit.gauges.shapes.needles.ModernCircular.prototype.setCircleFillStyle = function(fillstyle){};
    /**
     * Customizes the lines
     * @param {geotoolkit.attributes.LineStyle} linestyle
     * @returns {geotoolkit.gauges.shapes.needles.ModernCircular} this
     */
    geotoolkit.gauges.shapes.needles.ModernCircular.prototype.setLineStyle = function(linestyle){};
    /**
     * Customizes the needle
     * @param {geotoolkit.attributes.FillStyle} fillstyle for the needle
     * @returns {geotoolkit.gauges.shapes.needles.ModernCircular} this
     */
    geotoolkit.gauges.shapes.needles.ModernCircular.prototype.setFillStyle = function(fillstyle){};
    /**
     * Customizes the needle
     * @param {number} size for the needle
     * @returns {geotoolkit.gauges.shapes.needles.ModernCircular} this
     */
    geotoolkit.gauges.shapes.needles.ModernCircular.prototype.setCenterSize = function(size){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * {number} [props.centerSize] size of center
     * {geotoolkit.scene.shapes.Symbol} [props.symbol] symbol
     */
    geotoolkit.gauges.shapes.needles.ModernCircular.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.centerSize] size of center
     * @param {geotoolkit.scene.shapes.Symbol | object} [properties.symbol] symbol
     * @param {geotoolkit.attributes.FillStyle | object} [properties.circleFillStyle] circle fillStyle
     * @returns {geotoolkit.gauges.shapes.needles.ModernCircular} this
     */
    geotoolkit.gauges.shapes.needles.ModernCircular.prototype.setProperties = function(properties){};

/**
 * Defines a Needle Shape
 *
 * @class geotoolkit.gauges.shapes.needles.ModernLinear
 * @augments geotoolkit.gauges.shapes.NeedleShape
 * @param {geotoolkit.util.Point} center center
 * @param {number} width width of the needle
 * @param {number} height height of the needle
 * @param {string} colorFill colorFill of the needle
 * @param {string} colorLine colorLine outline of the needle
 */
geotoolkit.gauges.shapes.needles.ModernLinear = {};
    /**
     * Init the shape.
     * Override to build your own
     */
    geotoolkit.gauges.shapes.needles.ModernLinear.prototype.init = function(){};
    /**
     * Set pointing direction
     * @param {geotoolkit.gauges.utils.Direction} dir
     * @returns {geotoolkit.gauges.shapes.needles.ModernLinear} this
     */
    geotoolkit.gauges.shapes.needles.ModernLinear.prototype.setPointing = function(dir){};

/**
 * Defines a Needle Shape
 *
 * @class geotoolkit.gauges.shapes.needles.SimpleCircular
 * @augments geotoolkit.gauges.shapes.NeedleShape
 * @param {geotoolkit.util.Point} center center
 * @param {number} size size of the needle
 * @param {string} colorfill colorFill of the needle
 * @param {string} colorline colorLine outline of the needle
 * @param {number} centersize centerSize of the anchor
 */
geotoolkit.gauges.shapes.needles.SimpleCircular = {};
    /**
     * Init the shape.
     * override to build your own
     */
    geotoolkit.gauges.shapes.needles.SimpleCircular.prototype.init = function(){};
    /**
     * Customizes the lines
     * @param {geotoolkit.attributes.LineStyle} linestyle
     * @returns {geotoolkit.gauges.shapes.needles.SimpleCircular} this
     */
    geotoolkit.gauges.shapes.needles.SimpleCircular.prototype.setLineStyle = function(linestyle){};
    /**
     * Customizes the line used for the center
     * @param {geotoolkit.attributes.LineStyle} linestyle
     * @returns {geotoolkit.gauges.shapes.needles.SimpleCircular} this
     */
    geotoolkit.gauges.shapes.needles.SimpleCircular.prototype.setCenterLineStyle = function(linestyle){};
    /**
     * Customizes the needle
     * @param {geotoolkit.attributes.FillStyle} fillstyle for the needle
     * @returns {geotoolkit.gauges.shapes.needles.SimpleCircular} this
     */
    geotoolkit.gauges.shapes.needles.SimpleCircular.prototype.setFillStyle = function(fillstyle){};
    /**
     * Customizes the needle
     * @param {number} size for the needle
     * @returns {geotoolkit.gauges.shapes.needles.SimpleCircular} this
     */
    geotoolkit.gauges.shapes.needles.SimpleCircular.prototype.setCenterSize = function(size){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} [props] JSON containing properties
     * @returns {number} [props.centerSize] size of center
     */
    geotoolkit.gauges.shapes.needles.SimpleCircular.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.centerSize] size of center
     * @returns {geotoolkit.gauges.shapes.needles.SimpleCircular} this
     */
    geotoolkit.gauges.shapes.needles.SimpleCircular.prototype.setProperties = function(properties){};

/**
 * Defines a Needle Shape
 *
 * @class geotoolkit.gauges.shapes.needles.SimpleLinear
 * @augments geotoolkit.gauges.shapes.NeedleShape
 * @param {geotoolkit.util.Point} center center of needle
 * @param {number} size size of needle
 * @param {number} linesize linesize for needle
 * @param {geotoolkit.scene.shapes.painters.AbstractPainter} symbolpainter symbolPainter
 * @param {number} symbolsizex symbolSizeX for symbol
 * @param {number} symbolsizey symbolSizeY for symbol
 * @param {string} colorfill colorFill of the needle
 * @param {string} colorfine colorLine of the needle
 */
geotoolkit.gauges.shapes.needles.SimpleLinear = {};
    /**
     * Init the shape.
     * Override to build your own
     */
    geotoolkit.gauges.shapes.needles.SimpleLinear.prototype.init = function(){};

/**
 * Defines a Needle Shape
 *
 * @class geotoolkit.gauges.shapes.needles.Triangular
 * @augments geotoolkit.gauges.shapes.NeedleShape
 * @param {object | geotoolkit.util.Point} center center of needle or JSON with properties
 * @param {number} [center.size] size of needle
 * @param {number} [center.linesize] linesize for needle
 * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [center.symbolpainter] symbolPainter
 * @param {number} [center.symbolsizex] symbolSizeX for symbol
 * @param {number} [center.symbolsizey] symbolSizeY for symbol
 * @param {string} [center.colorfill] colorFill of the needle
 * @param {string} [center.colorfine] colorLine of the needle
 * @param {string} [center.width] width of the circle in the center of needle
 * @param {string} [center.height] height of the circle in the center of needle
 * @param {string} [center.centercolor] color of the circle in the center of needle
 * @param {string} [center.circleradius] radius of the circle in the center of needle
 * @param {string} [center.centerradius] radius of the circle in the center of needle
 * @param {number} size size of needle
 * @param {number} linesize linesize for needle
 * @param {geotoolkit.scene.shapes.painters.AbstractPainter} symbolpainter symbolPainter
 * @param {number} symbolsizex symbolSizeX for symbol
 * @param {number} symbolsizey symbolSizeY for symbol
 * @param {string} colorfill colorFill of the needle
 * @param {string} colorfine colorLine of the needle
 */
geotoolkit.gauges.shapes.needles.Triangular = {};
    /**
     * Init the shape.
     * Override to build your own
     */
    geotoolkit.gauges.shapes.needles.Triangular.prototype.init = function(){};

/**
 * Defines a class which implements a range to use in gauges.
 * The class defines range of data from a to b, and how this range will be displayed (color, fill, text)
 *
 * @class geotoolkit.gauges.utils.Range
 * @param {number | Object} [low=0] Lower range limit or JSON with parameters
 * @param {number} [low.low=0] Lower range limit
 * @param {number} [low.high=1] Higher range limit
 * @param {string} [low.color='grey'] Color of fill in the range
 * @param {string} [low.text='undefined'] Text to display for the range
 * @param {geotoolkit.attributes.FillStyle} [low.fillstyle] Filling of the range
 * @param {number} [high=1] Higher range limit
 * @param {string} [color='grey'] Color of fill in the range
 * @param {string} [text='undefined'] Text to display for the range
 * @param {geotoolkit.attributes.FillStyle} [fillstyle] Filling of the range
 * @deprecated
 */
geotoolkit.gauges.utils.Range = {};
    /**
     * Clone the range
     * @returns {geotoolkit.gauges.utils.Range} cloned range
     */
    geotoolkit.gauges.utils.Range.prototype.clone = function(){};
    /**
     * Set low limit for the range
     * @param {number} low New lower limit
     * @returns {geotoolkit.gauges.utils.Range}
     */
    geotoolkit.gauges.utils.Range.prototype.setLow = function(low){};
    /**
     * Set high limit for the range
     * @param {number} high New higher limit
     * @returns {geotoolkit.gauges.utils.Range}
     */
    geotoolkit.gauges.utils.Range.prototype.setHigh = function(high){};
    /**
     * Set color for the range fill
     * @param {string} color New color to fill the range with
     * @returns {geotoolkit.gauges.utils.Range}
     */
    geotoolkit.gauges.utils.Range.prototype.setColor = function(color){};
    /**
     * Set range fill style
     * @param {geotoolkit.attributes.FillStyle} fillstyle New fillstyle for the range
     * @returns {geotoolkit.gauges.utils.Range}
     */
    geotoolkit.gauges.utils.Range.prototype.setFillStyle = function(fillstyle){};
    /**
     * Get range fill style
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.gauges.utils.Range.prototype.getFillStyle = function(){};
    /**
     * Set text to the range
     * @param {string} text New text to display
     * @returns {geotoolkit.gauges.utils.Range}
     */
    geotoolkit.gauges.utils.Range.prototype.setText = function(text){};
    /**
     * Get low limit of the range
     * @returns {number} Lower limit
     */
    geotoolkit.gauges.utils.Range.prototype.getLow = function(){};
    /**
     * Get high limit of the range
     * @returns {number} Higher limit
     */
    geotoolkit.gauges.utils.Range.prototype.getHigh = function(){};
    /**
     * Get color of the range fill
     * @returns {string} Range color
     */
    geotoolkit.gauges.utils.Range.prototype.getColor = function(){};
    /**
     * Get text of the range
     * @returns {string} Range text
     */
    geotoolkit.gauges.utils.Range.prototype.getText = function(){};
    /**
     * Checks if a number falls within this range
     * @param {number} val Number to test
     * @returns {boolean}
     */
    geotoolkit.gauges.utils.Range.prototype.fallsWithin = function(val){};

/**
 * Defines a Base Gauges Manager
 * @class geotoolkit.gauges.utils.Manager
 * @deprecated
 */
geotoolkit.gauges.utils.Manager = {};
    /**
     * Updates gauges using the stored action methods
     * @returns {geotoolkit.gauges.utils.Manager}
     */
    geotoolkit.gauges.utils.Manager.prototype.updateGauges = function(){};
    /**
     * Stores action called when gauge is being updated
     * @param {function} f Function to be applied on valid gauge g (f(g){ g.dostuff(); })
     * @returns {geotoolkit.gauges.utils.Manager}
     */
    geotoolkit.gauges.utils.Manager.prototype.setDoGaugeAction = function(f){};
    /**
     * Returns the stored gauge action
     * @returns {function} f Function to be applied on valid gauge g (f(g){g.dostuff();})
     */
    geotoolkit.gauges.utils.Manager.prototype.getDoGaugeAction = function(){};
    /**
     * Get Refresh Rate in ms
     * @returns {number}
     */
    geotoolkit.gauges.utils.Manager.prototype.getRefreshRate = function(){};
    /**
     * Returns manager type
     * @returns {geotoolkit.gauges.utils.ManagerType}
     */
    geotoolkit.gauges.utils.Manager.prototype.getManagerType = function(){};
    /**
     * Set Refresh Rate in ms
     * @param {number} rate New rate to set
     * @returns {geotoolkit.gauges.utils.Manager}
     */
    geotoolkit.gauges.utils.Manager.prototype.setRefreshRate = function(rate){};
    /**
     * Get connected gauges
     * @returns {Array.<geotoolkit.gauges.Gauge>}
     */
    geotoolkit.gauges.utils.Manager.prototype.getConnectedGauges = function(){};
    /**
     * Connect a gauge
     * @param {geotoolkit.gauges.Gauge} gauge Gauge to connect
     * @returns {geotoolkit.gauges.utils.Manager}
     */
    geotoolkit.gauges.utils.Manager.prototype.connect = function(gauge){};
    /**
     * Disconnect a Gauge
     * @param {geotoolkit.gauges.Gauge} gauge Gauge to disconnect
     * @returns {geotoolkit.gauges.utils.Manager}
     */
    geotoolkit.gauges.utils.Manager.prototype.disconnect = function(gauge){};
    /**
     * Disconnect all connected Gauges
     * @returns {geotoolkit.gauges.utils.Manager}
     */
    geotoolkit.gauges.utils.Manager.prototype.disconnectAll = function(){};

/**
 * Defines a manager that controls animations in gauges
 *
 * @class geotoolkit.gauges.utils.AnimationManager
 * @augments geotoolkit.gauges.utils.Manager
 * @deprecated
 */
geotoolkit.gauges.utils.AnimationManager = {};
    /**
     * Set Refresh Rate in ms
     * Changing it during an animation will cause all associated Gauges to instantly achieve their last animation frame
     * @param {number} rate Refresh rate
     * @returns {geotoolkit.gauges.utils.AnimationManager}
     */
    geotoolkit.gauges.utils.AnimationManager.prototype.setRefreshRate = function(rate){};
    /**
     * Get Animation Length in number of steps
     * @returns {number} Number of steps
     */
    geotoolkit.gauges.utils.AnimationManager.prototype.getAnimationLength = function(){};
    /**
     * Set Animation Length in number of steps
     * @param {number} n Animation length in number of steps
     * @returns {geotoolkit.gauges.utils.AnimationManager}
     */
    geotoolkit.gauges.utils.AnimationManager.prototype.setAnimationSteps = function(n){};

/**
 * Defines a manager which controls the streaming process
 *
 * @class geotoolkit.gauges.utils.StreamingManager
 * @augments geotoolkit.gauges.utils.Manager
 * @deprecated
 */
geotoolkit.gauges.utils.StreamingManager = {};

