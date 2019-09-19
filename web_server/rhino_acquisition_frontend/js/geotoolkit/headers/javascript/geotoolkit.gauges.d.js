/**
 * API to utilize and modify default gauges provided and to build new gauges.
 * @namespace */
geotoolkit.gauges = {};
    /**
     * Different modes that define how the value and name texts fit the regions they are rendered in.
     * @enum
     * @readonly
     */
    geotoolkit.gauges.ValueDisplayStrategies = {};
        /**
         * Resize the text to fit the bounds of its container
         * @type {string}
         */
        geotoolkit.gauges.ValueDisplayStrategies.ResizeToFit = "";
        /**
         * Keep the text font, but apply ellipsis if doesn't fit the container
         * @type {string}
         */
        geotoolkit.gauges.ValueDisplayStrategies.FromFont = "";
        /**
         * Text is calculated in model limits. Shrinks and expands with container. Unproportional.
         * @type {string}
         */
        geotoolkit.gauges.ValueDisplayStrategies.ShrinkExpand = "";
        /**
         * If the width of the text is smaller than the width of the container, text will rotate clockwise.
         * @type {string}
         */
        geotoolkit.gauges.ValueDisplayStrategies.RotateClockwise = "";
        /**
         * If the width of the text is smaller than the width of the container, text will rotate counterclockwise.
         * @type {string}
         */
        geotoolkit.gauges.ValueDisplayStrategies.RotateCounterClockwise = "";
        /**
         * Text fits the height of the region bounds. Ellipsis will be applied if does not fit the width.
         * @type {string}
         */
        geotoolkit.gauges.ValueDisplayStrategies.FitToHeight = "";
        /**
         * Adds line breaks to fit region bounds.
         * @type {string}
         */
        geotoolkit.gauges.ValueDisplayStrategies.WrappedText = "";
        /**
         * Adds line breaks between words to fit region bounds.
         * @type {string}
         */
        geotoolkit.gauges.ValueDisplayStrategies.WrappedWords = "";

/** @namespace */
geotoolkit.gauges.axis = {};
    /**
     * Enumerator defining the positions of ticks
     * @readonly
     * @enum
     */
    geotoolkit.gauges.axis.TickPositions = {};
        /**
         * Center position - ticks grow from center in and out
         * @type {string}
         */
        geotoolkit.gauges.axis.TickPositions.Center = "";
        /**
         * Inside position - ticks grow from inner bound of the axis and towards the center
         * @type {string}
         */
        geotoolkit.gauges.axis.TickPositions.Inside = "";
        /**
         * Outside position - ticks grow from outer bound of the axis and away from center
         * @type {string}
         */
        geotoolkit.gauges.axis.TickPositions.Outside = "";
    /**
     * Defines events fired by axis
     * @enum
     * @readonly
     */
    geotoolkit.gauges.axis.Events = {};
        /**
         * Fired when the region where value is rendered has been changed
         * @type {string}
         * @deprecated since 2.6
         */
        geotoolkit.gauges.axis.Events.stateUpdated = "";
        /**
         * Fired when the region where value is rendered has been changed
         * @type {string}
         */
        geotoolkit.gauges.axis.Events.StateUpdated = "";

/** @namespace */
geotoolkit.gauges.layout = {};
    /**
     * An enum representing all the possible positions inside a gauge
     * @readonly
     * @enum
     */
    geotoolkit.gauges.layout.Regions = {};
        /**
         * East position - exists in every gauge
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.East = "";
        /**
         * West position - exists in every gauge
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.West = "";
        /**
         * North position - exists in every gauge
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.North = "";
        /**
         * South position - exists in every gauge
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.South = "";
        /**
         * NorthWest position - exists in every gauge
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.NorthWest = "";
        /**
         * NorthEast position - exists in every gauge
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.NorthEast = "";
        /**
         * SouthEast position - exists in every gauge
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.SouthEast = "";
        /**
         * SouthWest position - exists in every gauge
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.SouthWest = "";
        /**
         * Center position - exists in every gauge
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.Center = "";
        /**
         * InnerSouth position - Exists in Circular gauges and Numeric gauges
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.InnerSouth = "";
        /**
         * InnerNorth position - Exists in Circular gauges and Numeric gauges
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.InnerNorth = "";
        /**
         * InnerNorth position - Exists in Circular gauges and Numeric gauges
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.InnerCenter = "";
        /**
         * InnerCenter position - Exists in Circular gauges
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.InnerEast = "";
        /**
         * InnerCenter position - Exists in Circular gauges
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.InnerWest = "";
        /**
         * The region which is a square containing the circle of the axis
         * @type {string}
         */
        geotoolkit.gauges.layout.Regions.CircleRegion = "";
    /**
     * An enum representing all the layers inside a gauge
     * @readonly
     * @enum
     */
    geotoolkit.gauges.layout.Layers = {};
        /**
         * Custom Component Layer - contains custom components, rendered on top
         * @type {string}
         */
        geotoolkit.gauges.layout.Layers.CustomComponent = "";
        /**
         * Top Dynamic Layer - contains dynamic elements, rendered on top of Bottom Dynamic
         * @type {string}
         */
        geotoolkit.gauges.layout.Layers.TopDynamic = "";
        /**
         * Bottom Dynamic Layer - contains dynamic elements, rendered below Top Dynamic
         * @type {string}
         */
        geotoolkit.gauges.layout.Layers.BottomDynamic = "";
        /**
         * Static Layer - contains static elements, rendered at bottom
         * @type {string}
         */
        geotoolkit.gauges.layout.Layers.Static = "";

/** @namespace */
geotoolkit.gauges.defaults = {};
    /**
     * @enum
     * @readonly
     */
    geotoolkit.gauges.defaults.Templates = {};
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.ModernCircular = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.ClassicCircular = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.ThreeBandCircular = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.DoubleAxisCircular = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.ArcIndicatorCircular = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.SegmentedBandCircular = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.CoveredNeedleCircular = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.HorizontalTraffic = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.VerticalTraffic = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.AnnotatedFillGauge = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.HorizontalBoxFillGauge = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.VerticalBoxFillGauge = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.EllipseFillGauge = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.Pressure = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.SimpleNumeric = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.ZonedHalfCircular = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.HalfCircularSimple = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.DoubleFanHalfCircular = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.HorizontalNumeric = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.TrendingNumeric = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.BandCircular = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.SimpleQuarterCircular = "";
        /**
         * @type {string}
         */
        geotoolkit.gauges.defaults.Templates.UnevenCircular = "";

/** @namespace */
geotoolkit.gauges.registry = {};

/**
 * An Alarm is attached to a gauge and contains a collection of Alerts
 * @class geotoolkit.gauges.Alarm
 * @param {object} params JSON with properties
 * @param {string} [params.name=null] Name of the alarm for indexing
 * @param {geotoolkit.util.Range} [params.range=geotoolkit.util.Range(0, 0)] Range that the alarm is effective on
 * @param {string} [params.handlername=null] Name of the handler function as defined in Alarm Factory
 * @param {object} [params.additionalproperties] Extra properties which will be passed into the handler function as fourth parameter
 */
geotoolkit.gauges.Alarm = {};
    /**
     * Gets the name of the function in Alarm Factory that is associated with this alarm
     * @returns {string} Name of the function
     */
    geotoolkit.gauges.Alarm.prototype.getHandlerName = function(){};
    /**
     * Gets the name of the function in Alarm Factory that is associated with this alarm
     * @returns {string} Name of the function
     */
    geotoolkit.gauges.Alarm.prototype.getName = function(){};
    /**
     * Takes a value and tests if it lies within this alarm range
     * @param {number} val Value to test
     * @returns {boolean}
     */
    geotoolkit.gauges.Alarm.prototype.testValue = function(val){};
    /**
     * Sets properties pertaining to alarm class
     * @param {object | geotoolkit.gauges.Alarm} props JSON with properties or an alarm to extract properties from
     * @param {string} [props.name] Name of the alarm for indexing
     * @param {geotoolkit.util.Range} [props.range] When value of the gauge or axis falls within this range, the alarm will fire
     * @param {string} [props.handlername] Name of the handler in function registry which will be called when this alarm will fire
     * @param {object} [props.additionalproperties] Extra properties which will be passed into the handler function as fourth parameter
     * @returns {geotoolkit.gauges.Alarm}
     */
    geotoolkit.gauges.Alarm.prototype.setProperties = function(props){};
    /**
     * Returns properties of alarm
     * @returns {object} props JSON with properties or an alarm to extract properties from
     * @returns {string} props.name Name of the alarm for indexing
     * @returns {geotoolkit.util.Range} props.range When value of the gauge or axis falls within this range,
     * the alarm will fire
     * @returns {string} props.handlername Name of the handler in function registry which will be called when this alarm will fire
     * @returns {object} props.additionalproperties Extra properties which will be passed into the handler function as fourth parameter
     */
    geotoolkit.gauges.Alarm.prototype.getProperties = function(){};
    /**
     * Returns extra properties which will be passed into the handler function as fourth parameter
     * @returns {Object}
     */
    geotoolkit.gauges.Alarm.prototype.getAdditionalProperties = function(){};
    /**
     * Sets extra properties which will be passed into the handler function as fourth parameter
     * @param {object} props Properties
     * @returns {geotoolkit.gauges.Alarm}
     */
    geotoolkit.gauges.Alarm.prototype.setAdditionalProperties = function(props){};
    /**
     * Returns an instance of alarm created using provided properties
     * @param {object | geotoolkit.gauges.Alarm} props alarm properties
     * @returns {geotoolkit.gauges.Alarm} alarm
     */
    geotoolkit.gauges.Alarm.fromObject = function(props){};

/**
 * A simple class which knows how to store alarm functions and return them, all by name
 * @class geotoolkit.gauges.registry.FunctionRegistry
 */
geotoolkit.gauges.registry.FunctionRegistry = {};
    /**
     * Returns an instance of registry filled with easing functions
     * @returns {geotoolkit.gauges.registry.FunctionRegistry} registry
     */
    geotoolkit.gauges.registry.FunctionRegistry.getDefaultInstance = function(){};
    /**
     * Registers an alarm handler function by its name
     * @param {string | object} name Name of the handler or an object with handlers
     * @param {function} [func] Handler Function
     * @returns {geotoolkit.gauges.registry.FunctionRegistry}
     */
    geotoolkit.gauges.registry.FunctionRegistry.prototype.registerFunction = function(name, func){};
    /**
     * Gets a handler function by its name
     * @param {string} name Name of the function to get
     * @returns {?function}
     */
    geotoolkit.gauges.registry.FunctionRegistry.prototype.getFunction = function(name){};

/**
 * Implements a region which is the main component in the process of layouting the gauge elements. A region
 * is an abstract rectangle which defines some area withing the gauge bounds and can contain any part of the gauge.
 * By default, gauge is divided into 9 regions, but not limited to that. Custom regions can be added. Since regions
 * are an abstract object, no fill style and/or linestyle can be applied to them. Bounds of a region are calculated
 * and set by the gauge, thus, setting bounds from an application will be overridden.
 * @param {object} params JSON with properties
 * @param {number} [params.x] X coordinate of the region
 * @param {number} [params.y] Y coordinate of the region
 * @param {number} [params.width] Width of the region
 * @param {number} [params.height] Height of the region
 * @param {geotoolkit.util.Rect} [params.bounds]
 * @param {string} [params.name]
 * @param {geotoolkit.attributes.FillStyle} [params.fillstyle]
 * @param {geotoolkit.attributes.LineStyle} [params.linestyle]
 * @param {string|geotoolkit.gauges.layout.Regions} [params.parent=gauge] The region relative to which this region is calculated
 * @class geotoolkit.gauges.layout.Region
 */
geotoolkit.gauges.layout.Region = {};
    /**
     * Get a clone of this object
     * @returns {geotoolkit.gauges.layout.Region} clone
     */
    geotoolkit.gauges.layout.Region.prototype.clone = function(){};
    /**
     * Gets properties pertaining to this object
     * @returns {object} params JSON with properties
     * @returns {geotoolkit.util.Rect} params.bounds
     * @returns {string} params.name
     * @returns {geotoolkit.attributes.FillStyle} params.fillstyle
     * @returns {geotoolkit.attributes.LineStyle} params.linestyle
     * @returns {string|geotoolkit.gauges.layout.Regions} params.parent
     */
    geotoolkit.gauges.layout.Region.prototype.getProperties = function(){};
    /**
     * Sets properties pertaining to this object
     * @param {object} params JSON with properties
     * @param {geotoolkit.util.Rect} params.bounds region bounds
     * @param {string} params.name region name
     * @param {number} params.padding padding
     * @param {geotoolkit.attributes.FillStyle} params.fillstyle region fillstyle
     * @param {geotoolkit.attributes.LineStyle} params.linestyle region border linestyle
     * @returns {geotoolkit.gauges.layout.Region}
     */
    geotoolkit.gauges.layout.Region.prototype.setProperties = function(params){};
    /**
     * Returns bounds of the region
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.gauges.layout.Region.prototype.getBounds = function(){};
    /**
     * Sets bounds for this region
     * @param {geotoolkit.util.Rect} bounds New bounds
     * @returns {geotoolkit.gauges.layout.Region}
     */
    geotoolkit.gauges.layout.Region.prototype.setBounds = function(bounds){};
    /**
     * Sets Width property of region
     * @param {number} w New Width to set
     * @returns {geotoolkit.gauges.layout.Region}
     */
    geotoolkit.gauges.layout.Region.prototype.setWidth = function(w){};
    /**
     * Sets Height property of region
     * @param {number} h New Height to set
     * @returns {geotoolkit.gauges.layout.Region}
     */
    geotoolkit.gauges.layout.Region.prototype.setHeight = function(h){};
    /**
     * Returns Width property of region
     * @returns {number}
     */
    geotoolkit.gauges.layout.Region.prototype.getWidth = function(){};
    /**
     * Returns Height property of region
     * @returns {number}
     */
    geotoolkit.gauges.layout.Region.prototype.getHeight = function(){};
    /**
     * Sets X property of region
     * @param {number} x New X to set
     * @returns {geotoolkit.gauges.layout.Region}
     */
    geotoolkit.gauges.layout.Region.prototype.setX = function(x){};
    /**
     * Sets Y property of region
     * @param {number} y New Y to set
     * @returns {geotoolkit.gauges.layout.Region}
     */
    geotoolkit.gauges.layout.Region.prototype.setY = function(y){};
    /**
     * Gets Line Style of this region
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.gauges.layout.Region.prototype.getLineStyle = function(){};
    /**
     * Gets Fill Style of this region
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.gauges.layout.Region.prototype.getFillStyle = function(){};
    /**
     * Gets the parent where this region is rendered
     * @returns {string|geotoolkit.gauges.layout.Regions}
     */
    geotoolkit.gauges.layout.Region.prototype.getParent = function(){};
    /**
     * Returns the name of region relative to which this region is calculated
     * @param {geotoolkit.gauges.layout.Regions} parent region parent
     * @returns {geotoolkit.gauges.layout.Region}
     */
    geotoolkit.gauges.layout.Region.prototype.setParent = function(parent){};
    /**
     * Create or get a region from an object
     * @param {geotoolkit.gauges.layout.Region|object} region A region or an object with region properties
     * @returns {geotoolkit.gauges.layout.Region} region
     */
    geotoolkit.gauges.layout.Region.fromObject = function(region){};

/**
 * Defines a layout for gauges
 * @class geotoolkit.gauges.layout.GaugeLayout
 * @augments geotoolkit.layout.Layout
 * @param {object} props JSON with properties
 */
geotoolkit.gauges.layout.GaugeLayout = {};
    /**
     * Deletes a region from the layout. Only custom added regions can be removed.
     * @param {string} name Name of the region
     * @returns {geotoolkit.gauges.layout.GaugeLayout}
     */
    geotoolkit.gauges.layout.GaugeLayout.prototype.removeRegion = function(name){};
    /**
     * Returns a custom component which was registered by provided name
     * @param {string} name Name of component to return
     * @returns {geotoolkit.scene.Node}
     */
    geotoolkit.gauges.layout.GaugeLayout.prototype.getCustomComponent = function(name){};
    /**
     * Parser region CSS parameters and updates regions accordingly
     */
    geotoolkit.gauges.layout.GaugeLayout.prototype.updateCssRegions = function(){};
    /**
     * Checks if the region with this name is a custom region
     * @param {string} name Name of the region to test
     * @returns {boolean}
     */
    geotoolkit.gauges.layout.GaugeLayout.prototype.isCustomRegion = function(name){};
    /**
     * Changes parameters of custom regions
     * @param {string} name Name of the custom region
     * @param {object} params JSON with CSS properties
     * @param {number|string} params.x X of the region relative to its parent
     * @param {number|string} params.y Y of the region relative to its parent
     * @param {number|string} params.width Width of the region relative to its parent
     * @param {number|string} params.height Height of the region relative to its parent
     * @returns {geotoolkit.gauges.layout.GaugeLayout}
     */
    geotoolkit.gauges.layout.GaugeLayout.prototype.setCustomRegionParams = function(name, params){};

/**
 * Defines layout for circular gauges
 * @class geotoolkit.gauges.layout.CircularLayout
 * @augments geotoolkit.gauges.layout.GaugeLayout
 */
geotoolkit.gauges.layout.CircularLayout = {};

/**
 * Defines layout for circular gauges
 * @class geotoolkit.gauges.layout.VerticalSplitLayout
 * @augments geotoolkit.gauges.layout.GaugeLayout
 */
geotoolkit.gauges.layout.VerticalSplitLayout = {};

/**
 * @class geotoolkit.gauges.axis.TickInfo
 * @augments geotoolkit.axis.TickInfo
 */
geotoolkit.gauges.axis.TickInfo = {};

/** An axis region is a segment within axis range which has to be differentiated from the rest of the axis. Examples are
 * the critical section of the pressure gauge or the red segment of the tachometer in your car.<br>
 * A region can be highlighted by a different fillstyle and/or by a different linestyle than other parts of the gauge.<br>
 * Multiple regions can be added. Not to be used as a value fill, because axes have a different mechanism for that purpose.
 *
 * @class geotoolkit.gauges.axis.Region
 * @param {number | object} [low=null] Lower bound or object with parameters
 * @param {number} [low.low=null] Maximum value Lower bound of the range
 * @param {geotoolkit.attributes.FillStyle} [low.fillstyle] Fill style of the range
 * @param {boolean} [low.visible] Defines if the range is visible and should be rendered
 * @param {number} [high=null] Upper bound of the range
 * @param {geotoolkit.attributes.LineStyle} [lineStyle] Line style of the range
 * @param {geotoolkit.attributes.FillStyle} [fillStyle] Fill style of the range
 * @param {string} [low.name] Name of the region
 */
geotoolkit.gauges.axis.Region = {};
    /**
     * Returns class name for css reference
     * @returns {string}
     */
    geotoolkit.gauges.axis.Region.prototype.getCssClass = function(){};
    /**
     * Sets visible flag for the range
     * @param {boolean} visible Visibility flag
     * @returns {geotoolkit.gauges.axis.Region}
     */
    geotoolkit.gauges.axis.Region.prototype.setVisible = function(visible){};
    /**
     * Gets visibility status
     * @returns {boolean}
     */
    geotoolkit.gauges.axis.Region.prototype.getVisible = function(){};
    /**
     * Gets lowest limit of the region
     * @returns {number}
     */
    geotoolkit.gauges.axis.Region.prototype.getLow = function(){};
    /**
     * Gets highest limit of the region
     * @returns {number}
     */
    geotoolkit.gauges.axis.Region.prototype.getHigh = function(){};
    /**
     * Returns the current name of the region
     * @returns {string}
     */
    geotoolkit.gauges.axis.Region.prototype.getName = function(){};
    /**
     * Sets the name of the region
     * @param {string} name New name for the region
     * @returns {geotoolkit.gauges.axis.Region} this
     */
    geotoolkit.gauges.axis.Region.prototype.setName = function(name){};
    /**
     * Sets lowest limit of the region
     * @param {number} low New lower bound
     * @returns {geotoolkit.gauges.axis.Region}
     */
    geotoolkit.gauges.axis.Region.prototype.setLow = function(low){};
    /**
     * Sets highest limit of the region
     * @param {number} high New upper bound
     * @returns {geotoolkit.gauges.axis.Region}
     */
    geotoolkit.gauges.axis.Region.prototype.setHigh = function(high){};
    /**
     * Returns fill style set for the region
     * @returns {?geotoolkit.attributes.FillStyle}
     */
    geotoolkit.gauges.axis.Region.prototype.getFillStyle = function(){};
    /**
     * Sets fill style set for the region
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.gauges.axis.Region}
     */
    geotoolkit.gauges.axis.Region.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Returns line style set for the region
     * @returns {?geotoolkit.attributes.LineStyle}
     */
    geotoolkit.gauges.axis.Region.prototype.getLineStyle = function(){};
    /**
     * Sets line style set for the region
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.gauges.axis.Region}
     */
    geotoolkit.gauges.axis.Region.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Sets line style set for the region
     * @param {geotoolkit.util.RgbaColor|string} color New color of the line
     * @returns {geotoolkit.gauges.axis.Region}
     */
    geotoolkit.gauges.axis.Region.prototype.setLineColor = function(color){};
    /**
     * Sets range that defines this region
     * @returns {?geotoolkit.util.Range}
     */
    geotoolkit.gauges.axis.Region.prototype.getRange = function(){};
    /**
     * Sets range that defines this region
     * @param {geotoolkit.util.Range} range New range with min and max values
     * @returns {geotoolkit.gauges.axis.Region}
     */
    geotoolkit.gauges.axis.Region.prototype.setRange = function(range){};
    /**
     * Returns true if the region is static and visible at all times
     * @returns {boolean}
     */
    geotoolkit.gauges.axis.Region.prototype.isStatic = function(){};
    /**
     * Sets a flag defining if the region should be static and visible at all times
     * @param {boolean} isStatic True
     * @returns {geotoolkit.gauges.axis.Region}
     */
    geotoolkit.gauges.axis.Region.prototype.setStatic = function(isStatic){};
    /**
     * Returns properties pertaining to this object
     * @returns {object} props JSON with properties
     * @returns {number} props.low
     * @returns {number} props.high
     * @returns {geotoolkit.attributes.LineStyle} props.linestyle
     * @returns {geotoolkit.attributes.FillStyle} props.fillstyle
     * @returns {Array.<function>} props.alarms
     * @returns {boolean} props.visible
     */
    geotoolkit.gauges.axis.Region.prototype.getProperties = function(){};
    /**
     * Sets properties pertaining to this object
     * @param {object} props JSON with properties
     * @param {number} [props.low] lower bound
     * @param {number} [props.high] upper bound
     * @param {geotoolkit.attributes.LineStyle} [props.linestyle] region linestyle
     * @param {geotoolkit.attributes.FillStyle} [props.fillstyle] region fillstyle
     * @param {boolean} [props.visible] visibility
     * @param {string|geotoolkit.util.RgbaColor} [props.color] in CSS string form or RgbaColor object
     * @param {geotoolkit.attributes.LineStyle.CapStyle|string} [props.linecap] can be 'butt', 'square', or 'round'
     * @returns {geotoolkit.gauges.axis.Region}
     */
    geotoolkit.gauges.axis.Region.prototype.setProperties = function(props){};

/**
 * Implements an axis which uses Tick Generators to calculate number of ticks and their positions.
 * This axis calculates the ticks dynamically to not allow any intersections among labels and ticks.
 * The axis allows to render ticks and labels in three positions:
 * inside: tick growing from the inner bound of the axis towards the center
 * outside: tick growing from outer bound of axis towards the center
 * @class geotoolkit.gauges.axis.Axis
 * @augments geotoolkit.scene.AbstractNode
 * @implements geotoolkit.scene.INodeEnumerable
 */
geotoolkit.gauges.axis.Axis = {};
    /**
     * Disposes this node, once disposes a node should not be used anymore.<br>
     * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
     * Also aggressively 'cleanup' this node by setting some of its members to null.
     * Disposes value and name shapes as well
     */
    geotoolkit.gauges.axis.Axis.prototype.dispose = function(){};
    /**
     * A set of events fired by axis
     * @enum
     * @readonly
     */
    geotoolkit.gauges.axis.Axis.Events = {};
        /**
         * Name of the axis has been changed
         * @type {string}
         */
        geotoolkit.gauges.axis.Axis.Events.nameChanged = "";
    /**
     * Changes the name of the axis
     * @param {string} name The new axis name
     * @returns {geotoolkit.gauges.axis.Axis} this
     */
    geotoolkit.gauges.axis.Axis.prototype.setName = function(name){};
    /**
     * Adds a region or an array of regions to the axis. Regions are defined by color and range
     * in bounds of the range displayed by the gauge.
     * @param {Array.<geotoolkit.gauges.axis.Region> | Array.<object> | geotoolkit.gauges.axis.Region | object} regions
     * Array of regions, a region, or region properties
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.addRegion = function(regions){};
    /**
     * Removes all registered regions from the axis
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.cleanRegions = function(){};
    /**
     * Pass options into this method to customize the gauge.
     * @param {object} options JSON with properties
     * @param {geotoolkit.axis.TickGenerator} [options.tickGenerator] The tick generator for the axis
     * @param {string} [options.animationfunction] name of animation function (see geotoolkit.gauges.defaults.EasingFunctions)
     * @param {object} [options.ticks] JSON with properties for ticks
     * @param {object} [options.ticks.major] Major tick properties
     * @param {object} [options.ticks.minor] Minor tick properties
     * @param {object} [options.ticks.edge] Edge tick properties
     * @param {geotoolkit.util.Range} [options.range] Range of values displayed by the axis.
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.setOptions = function(options){};
    /**
     * Sets properties pertaining to axis. To customize the axis please use setOptions/
     * @param {object} props JSON with properties
     * @param {object|geotoolkit.gauges.Alarm|object[]|geotoolkit.gauges.Alarm[]} [props.alarms] alarm to add, an array of such alarms, or object (array of objects) to be passed into the alarm
     * @param {object|geotoolkit.util.Range} [props.range] range see {@link geotoolkit.gauges.axis.Axis#setRange}
     * @param {string} [props.units] units to append to the end
     * @param {geotoolkit.axis.TickGenerator} [props.tickGenerator] The tick generator for the axis
     * @param {string} [props.animationfunction] name of animation function (see geotoolkit.gauges.defaults.EasingFunctions)
     * @param {object} [props.ticks] JSON with properties for ticks
     * @param {object} [props.ticks.major] Major tick properties see {@link geotoolkit.gauges.axis.Axis#setTickProperties}
     * @param {object} [props.ticks.minor] Minor tick properties see {@link geotoolkit.gauges.axis.Axis#setTickProperties}
     * @param {object} [props.ticks.edge] Edge tick properties see {@link geotoolkit.gauges.axis.Axis#setTickProperties}
     * @param {geotoolkit.gauges.axis.Region[]} [props.regions] An array with regions that should be displayed by the gauge.
     * Regions will be added on top of existing regions.
     * @param {number} [props.value] Value of the axis
     * @param {object} [props.valuestyle] JSON with styling of the value text see {@link geotoolkit.gauges.axis.Axis#setValueProperties}
     * @param {object} [props.namestyle] Json with styling of the name text see {@link geotoolkit.gauges.axis.Axis#setNameProperties}
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.setProperties = function(props){};
    /**
     * Returnt the tick generator currently set on the axis
     * @returns {geotoolkit.axis.TickGenerator}
     */
    geotoolkit.gauges.axis.Axis.prototype.getTickGenerator = function(){};
    /**
     * Sets tick generator on the axis
     * @param {geotoolkit.axis.TickGenerator} tg New tick generator
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.setTickGenerator = function(tg){};
    /**
     * Returns properties pertaining to axis.
     * @returns {object} props JSON with properties
     * @returns {geotoolkit.axis.TickGenerator} props.tickGenerator The tick generator for the axis
     * @returns {string} props.animationfunction
     * @returns {object} props.ticks JSON with properties for ticks
     * @returns {object} props.ticks.major Major tick properties
     * @returns {object} props.ticks.minor Minor tick properties
     * @returns {object} props.ticks.edge Edge tick properties
     * @returns {geotoolkit.util.Range} props.range Range of values displayed by the axis.
     * @returns {object} props.valuestyle JSON with value text properties
     * @returns {geotoolkit.attributes.TextStyle} props.valuestyle.textstyle Style of the text showing axis value
     * @returns {boolean} props.valuestyle.visible Visibility of the value
     * @returns {geotoolkit.gauges.layout.Region | string} props.valuestyle.position Region where the value is be rendered
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} props.valuestyle.displaystrategy Strategy by which the value will fit the region
     * @returns {geotoolkit.util.Format} props.valuestyle.formatter Formatter which will be applied to the value before rendering
     * @returns {geotoolkit.util.AnchorType} props.valuestyle.alignment Position of the value in the region
     * @returns {object} props.namestyle JSON with name text properties
     * @returns {geotoolkit.attributes.TextStyle} props.namestyle.textstyle Style of the text showing axis name
     * @returns {boolean} props.namestyle.visible Visibility of the name
     * @returns {geotoolkit.gauges.layout.Region | string} props.namestyle.position Region where the name is be rendered
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} props.namestyle.displaystrategy Strategy by which the name will fit the region
     * @returns {geotoolkit.util.Format} props.namestyle.formatter Formatter which will be applied to the name before rendering
     * @returns {geotoolkit.util.AnchorType} props.namestyle.alignment Position of the name in the region
     */
    geotoolkit.gauges.axis.Axis.prototype.getProperties = function(){};
    /**
     * Returns options set on this axis.
     * @returns {object} props JSON with properties
     * @returns {geotoolkit.axis.TickGenerator} props.tickGenerator The tick generator for the axis
     * @returns {string} props.animationfunction
     * @returns {object} props.ticks JSON with properties for ticks
     * @returns {object} props.ticks.major Major tick properties
     * @returns {object} props.ticks.minor Minor tick properties
     * @returns {object} props.ticks.edge Edge tick properties
     * @returns {geotoolkit.util.Range} props.range Range of values displayed by the axis.
     */
    geotoolkit.gauges.axis.Axis.prototype.getOptions = function(){};
    /**
     * Sets the current value in the range of this axis. If value does not fall into
     * range represented by this axis, it will be set to min or max depending if it's smaller or bigger
     * than the range
     * @param {number} val New value to set
     * @param {boolean} [skipAnimation] If true, no animation will be displayed
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.setValue = function(val, skipAnimation){};
    /**
     * Returns the value of the axis
     * @param {boolean} [ignoreNaN=false] if true, pass last real value
     * @returns {number}
     */
    geotoolkit.gauges.axis.Axis.prototype.getValue = function(ignoreNaN){};
    /**
     * Returns the range of this axis
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.gauges.axis.Axis.prototype.getRange = function(){};
    /**
     * Sets a new data range displayed by this axis
     * @param {geotoolkit.util.Range|object} range New range to set
     * @param {number} [range.min] lower limit
     * @param {number} [range.max] upper limit
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.setRange = function(range){};
    /**
     * Sets the properties pertaining to the ticks of provided grade
     * @param {string} grade Grade of the tick to apply properties to
     * @param {object} props JSON with properties
     * @param {geotoolkit.attributes.LineStyle} [props.linestyle] Line style for the tick symbol
     * @param {geotoolkit.attributes.FillStyle} [props.fillstyle] Fill style for the tick symbol
     * @param {function} [props.painter] Painter which will be used to render the tick
     * @param {boolean} [props.visible] Visibility flag for the ticks
     * @param {number} [props.width] Width of individual tick dymbol
     * @param {number} [props.height] Height of individual tick dymbol
     * @param {geotoolkit.gauges.axis.TickPositions} [props.tickposition] Position of ticks relative to the axis
     * @param {object} [props.labels] JSON with label properties {@see geotoolkit.gauges.axis.Axis.setLabelProperties}
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.setTickProperties = function(grade, props){};
    /**
     * Returns properties of the tick with provided grade
     * @param {string} grade tick grade ('EDGE', 'MAJOR', 'MINOR')
     * @returns {geotoolkit.attributes.LineStyle} props.linestyle Line style for the tick symbol
     * @returns {geotoolkit.attributes.FillStyle} props.fillstyle Fill style for the tick symbol
     * @returns {function} props.painter Painter which will be used to render the tick
     * @returns {boolean} props.visible Visibility flag for the ticks
     * @returns {number} props.width Width of individual tick dymbol
     * @returns {number} props.height Height of individual tick dymbol
     * @returns {geotoolkit.gauges.axis.TickPositions} props.tickposition Position of ticks relative to the axis
     * @returns {object} props.labels JSON with label properties {@see geotoolkit.gauges.axis.Axis.setLabelProperties}
     */
    geotoolkit.gauges.axis.Axis.prototype.getTickProperties = function(grade){};
    /**
     * Sets properties pertaining to labels for ticks of provided grade
     * @param {string} grade Grade of the ticks that properties should be applied to
     * @param {object} props JSON with properties
     * @param {geotoolkit.attributes.TextStyle} [props.textstyle] Text style for the labels. If text style is
     * passed, color and font properties are ignored
     * @param {string | geotoolkit.util.RgbaColor} [props.color] Color of the label text
     * @param {string} [props.font] Font for the label text
     * @param {geotoolkit.gauges.axis.TickPositions} [props.position] Position of the labels relative to the axis
     * @param {string} [props.formatter] Name of function in Function Registry which will be used to format the
     * value before rendering it into label
     * @param {boolean} [props.visible] Visibility flag of the labels
     * @param {number} [props.gap] Gap between the label and the tick or axis
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.setLabelProperties = function(grade, props){};
    /**
     * Returns properties pertaining to labels of requested grade
     * @param {string} grade tick grade ('EDGE', 'MAJOR', 'MINOR')
     * @returns {string} grade Grade of the ticks that properties should be applied to
     * @returns {object} props JSON with properties
     * @returns {geotoolkit.attributes.TextStyle} props.textstyle Text style for the labels.
     * @returns {geotoolkit.gauges.axis.TickPositions} props.position Position of the labels relative to the axis
     * @returns {string} props.formatter Name of function in Function Registry which is used to format the
     * value before rendering it into label
     * @returns {number} props.gap Gap between the label and the tick or axis
     * @returns {boolean} [props.visible] Visibility flag of the labels
     */
    geotoolkit.gauges.axis.Axis.prototype.getLabelProperties = function(grade){};
    /**
     * Returns an object with properties pertaining to the value shape
     * @returns {object} props JSON with properties
     * @returns {geotoolkit.attributes.TextStyle} props.textstyle Style of the text showing axis value
     * @returns {boolean} props.visible Visibility of the value
     * @returns {geotoolkit.gauges.layout.Region | string} props.position Region where the value is be rendered
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} props.displaystrategy Strategy by which the value will fit the region
     * @returns {geotoolkit.util.Format} props.formatter Formatter which will be applied to the value before rendering
     * @returns {geotoolkit.util.AnchorType} props.alignment Position of the value in the region
     */
    geotoolkit.gauges.axis.Axis.prototype.getValueProperties = function(){};
    /**
     * Sets properties pertaining to value shape of the gauge
     * @param {object} props JSON with properties
     * @param {geotoolkit.attributes.TextStyle} [props.textstyle] Style of the text showing axis value
     * @param {object} [props.properties] see {@link geotoolkit.scene.shapes.Text#setProperties}
     * @param {boolean} [props.visible] Visibility of the value
     * @param {geotoolkit.gauges.layout.Region | string} [props.position] Region where the value is be rendered
     * @param {geotoolkit.gauges.ValueDisplayStrategies} [props.displaystrategy] Strategy by which the value will fit the region
     * @param {geotoolkit.util.Format} [props.formatter] Formatter which will be applied to the value before rendering
     * @param {geotoolkit.util.AnchorType} [props.alignment] Position of the value in the region
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.setValueProperties = function(props){};
    /**
     * Returns properties pertaining to name text
     * @returns {object} props JSON with properties
     * @returns {geotoolkit.attributes.TextStyle} props.textstyle Style of the text showing axis name
     * @returns {boolean} props.visible Visibility of the name
     * @returns {geotoolkit.gauges.layout.Region | string} props.position Region where the name is be rendered
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} props.displaystrategy Strategy by which the name will fit the region
     * @returns {geotoolkit.util.Format} props.formatter Formatter which will be applied to the name before rendering
     * @returns {geotoolkit.util.AnchorType} props.alignment Position of the name in the region
     */
    geotoolkit.gauges.axis.Axis.prototype.getNameProperties = function(){};
    /**
     * Sets properties pertaining to name shape of the gauge
     * @param {object} props JSON with properties
     * @param {geotoolkit.attributes.TextStyle} [props.textstyle] Style of the text showing axis name, overrides font and color
     * @param {object} [props.properties] see {@link geotoolkit.scene.shapes.Text#setProperties}
     * @param {string} [props.font] Font of the name text
     * @param {string|geotoolkit.util.RgbaColor} [props.color] Font of the name text
     * @param {boolean} [props.visible] Visibility of the name
     * @param {geotoolkit.gauges.layout.Region | string} [props.position] Region where the name is be rendered
     * @param {geotoolkit.gauges.ValueDisplayStrategies} [props.displaystrategy] Strategy by which the name will fit the region
     * @param {geotoolkit.util.Format} [props.formatter] Formatter which will be applied to the name before rendering
     * @param {geotoolkit.util.AnchorType} [props.alignment] Position of the name in the region
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.setNameProperties = function(props){};
    /**
     * Sets the name of animation function corresponding to this axis
     * @param {string} name New function name
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.setAnimation = function(name){};
    /**
     * Returns the name of animation function associated with this axis
     * @returns {null|string}
     */
    geotoolkit.gauges.axis.Axis.prototype.getAnimation = function(){};
    /**
     * Sets function registry which will provide handlers for gauges animation and alarms
     * @param {geotoolkit.gauges.registry.FunctionRegistry} registry New registry to set
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.setFunctionRegistry = function(registry){};
    /**
     * Returns the name of animation function associated with this axis
     * @returns {null|string}
     * Returns function registry which provides handlers for gauges animation and alarms
     * @returns {geotoolkit.gauges.registry.FunctionRegistry} registry New registry to set
     */
    geotoolkit.gauges.axis.Axis.prototype.getFunctionRegistry = function(){};
    /**
     * Adds an alarm to the axis. Alarm handler will be called every time
     * value set on the axis falls within alarm's range
     * @param {object | geotoolkit.gauges.Alarm | Array.<object> | Array.<geotoolkit.gauges.Alarm>} alarm An alarm to add,
     * an array of such alarms, or object (array of objects) to be passed into the alarm
     * @returns {geotoolkit.gauges.axis.Axis} this
     */
    geotoolkit.gauges.axis.Axis.prototype.addAlarm = function(alarm){};
    /**
     * Gets the alarm referenced by provided name or index. If alarm name is not set or no such
     * index exists, null will be returned.
     * @param {string | number} name Name of alarm or its index in iterator
     * @returns {geotoolkit.gauges.Alarm|null}
     */
    geotoolkit.gauges.axis.Axis.prototype.getAlarm = function(name){};
    /**
     * Removes an alarm by its name, index, or instance of alarm
     * @param {string | number | geotoolkit.gauges.Alarm} name Name of alarm or its index in iterator
     * @returns {geotoolkit.gauges.axis.Axis} this
     */
    geotoolkit.gauges.axis.Axis.prototype.removeAlarm = function(name){};
    /**
     * Removes all registered alarms
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.Axis.prototype.cleanAlarms = function(){};
    /**
     * Gets an iterator over existing alarms in the gauge
     * @param {function()} [filter] a filter function. Returns all axes if null
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.gauges.axis.Axis.prototype.getAlarms = function(filter){};
    /**
     * Returns time in which an animation should be finished in seconds
     * @returns {number}
     */
    geotoolkit.gauges.axis.Axis.prototype.getAnimationTime = function(){};
    /**
     * Sets time in which an animation should be finished in seconds
     * @param {number} time Time in seconds to perform the animation
     * @returns {geotoolkit.gauges.axis.Axis} this
     */
    geotoolkit.gauges.axis.Axis.prototype.setAnimationTime = function(time){};
    /**
     * Recalculates the parameters of the axis and rerenders
     * @returns {geotoolkit.gauges.axis.Axis} this
     */
    geotoolkit.gauges.axis.Axis.prototype.redraw = function(){};
    /**
     * Enumerate children nodes
     * @param {function(node, target)} callback callback
     * @param {object} [target] target
     */
    geotoolkit.gauges.axis.Axis.prototype.enumerateNodes = function(callback, target){};

/**
 * Implements an axis which uses Tick Generators to calculate number of ticks and their positions.
 * This axis calculates the ticks dynamically to not allow any intersections among labels and ticks.
 * The axis allows to render ticks and labels in three positions:
 * inside: tick growing from the inner bound of the axis towards the center
 * outside: tick growing from outer bound of axis towards the center
 * @class geotoolkit.gauges.axis.CircularAxis
 * @augments geotoolkit.gauges.axis.Axis
 */
geotoolkit.gauges.axis.CircularAxis = {};
    /**
     * Disposes this node, once disposes a node should not be used anymore.<br>
     * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
     * Also aggressively 'cleanup' this node by setting some of its members to null.
     * Disposes value and name shapes as well
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.dispose = function(){};
    /**
     * Returns an object with properties pertaining to this axis
     * @returns {object} props Object with properties
     * @returns {geotoolkit.attributes.FillStyle} props.fillstyle Fill style of the base arc of the axis
     * @returns {geotoolkit.attributes.LineStyle} props.linestyle Line style of the base arc of the axis
     * @returns {boolean} props.visible Visibility flag set on axis
     * @returns {number|string} props.thickness Thickness of the axis base in CSS format (relative to the radius of the axis)
     * @returns {number|string} props.startangleoffset The distance (offset) of the start angle of the axis from start angle of the gauge
     * @returns {number|string} props.endangleoffset The distance (offset) of the start angle of the axis from start angle of the gauge
     * @returns {number|string} props.radius Radius of the axis in CSS format (relative to gauge radius)
     * @returns {object} props.shadow JSON with shadow properties
     * @returns {string} props.name Name of the gauge by which it is referenced
     * @returns {Array.<geotoolkit.gauges.axis.Region>} props.regions An array with regions that should displayed by the gauge.
     * @returns {object} props.needle JSON with properties
     * @returns {geotoolkit.scene.Group} props.needle.geometry Geotoolkit group containing the shapes which form the geometry of the needle
     * @returns {geotoolkit.util.Point} props.needle.center A point in model of needle which serves as an anchor point for rotation
     * and centering the needle with the gauge.
     * @returns {geotoolkit.gauges.AbstractGauge.DynamicElementPosition} props.needle.position Layer on which the needle is positioned
     * @returns {number|string} props.needle.radius For circular needle the length of the needle relative to the radius of the axis
     * @returns {boolean} props.needle.visible Visibility flag of the needle
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.getProperties = function(){};
    /**
     * Sets properties pertaining to this axis
     * @param {object} props Object with properties
     * @param {geotoolkit.attributes.FillStyle} [props.fillstyle] Fill style of the base arc of the axis
     * @param {geotoolkit.attributes.LineStyle} [props.linestyle] Line style of the base arc of the axis
     * @param {boolean} [props.visible] Visibility flag to set on axis
     * @param {number|string} [props.thickness] Thickness of the axis base in CSS format (relative to the radius of the axis)
     * @param {number|string} [props.startangel] start angel
     * @param {number|string} [props.sweepangel] sweep angel
     * @param {number|string} [props.center] center
     * @param {number|string} [props.startangleoffset] The distance (offset) of the start angle of the axis from start angle of the gauge.
     * Rotates the axis clockwise
     * @param {number|string} [props.endangleoffset] The distance (offset) of the start angle of the axis from start angle of the gauge.
     * Shrinks the axis counterclockwise
     * @param {number|string} [props.radius] Radius of the axis in CSS format (relative to gauge radius)
     * @param {number|string} [props.parentradius] parent radius
     * @param {object} [props.shadow] JSON with shadow properties
     * @param {string} [props.name] Name of the gauge by which it is referenced
     * @param {Array.<geotoolkit.gauges.axis.Region>} [props.regions] An array with regions that should be displayed by the gauge.
     * Regions will be added on top of existing regions.
     * @param {object} [props.needle] Properties defining the needle see {@link geotoolkit.gauges.Needle#setProperties}
     * @returns {geotoolkit.gauges.axis.CircularAxis}
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.setProperties = function(props){};
    /**
     * Sets options to customize the axis.
     * @param {object} options JSON containing axis options
     * @returns {geotoolkit.gauges.axis.CircularAxis}
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.setOptions = function(options){};
    /**
     * Gets options to customize the axis.
     * @returns {object}
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.getOptions = function(){};
    /**
     * Sets properties pertaining to shadow of the axis
     * @param {object} props JSON with properties
     * @param {string|geotoolkit.util.RgbaColor} [props.color] Color of the filling of the gauge shadows
     * @param {boolean} [props.visible] Visibility flag for the shadow
     * @param {geotoolkit.attributes.LineStyle.CapStyle|string} [props.linecap] Style of the edges of the shadow
     * @returns {geotoolkit.gauges.axis.CircularAxis} this
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.setShadowProperties = function(props){};
    /**
     * Gets properties pertaining to shadow of the axis
     * @returns {object} props JSON with properties
     * @returns {string|geotoolkit.util.RgbaColor} props.color Color of the filling of the gauge shadows
     * @returns {boolean} props.visible Visibility flag for the shadow
     * @returns {geotoolkit.attributes.LineStyle.CapStyle|string} props.linecap Style of the edges of the shadow
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.getShadowProperties = function(){};
    /**
     * Renders the axis and ticks
     * @param {geotoolkit.renderer.RenderingContext} context rendering context
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.render = function(context){};
    /**
     * Sets the needle for the axis
     * @param {object} params JSON with needle properties
     * @returns {geotoolkit.gauges.axis.CircularAxis} this
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.setNeedle = function(params){};
    /**
     * Gets position of the needle (bottom layer or top layer)
     * @returns {string}
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.getNeedlePosition = function(){};
    /**
     * Gets the current needle geometry
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.getNeedleGeometry = function(){};
    /**
     * Sets the value of the axis
     * @param {number} val The value to be displayed by the axis.
     * @param {boolean} skipAnimation If true, no animation will be displayed
     * @returns {geotoolkit.gauges.axis.CircularAxis}
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.setValue = function(val, skipAnimation){};
    /**
     * Sets the color of shadow fill for the gauge
     * @param {string|geotoolkit.util.RgbaColor} color New color of the value fill
     * @returns {geotoolkit.gauges.axis.CircularAxis} this
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.setShadowColor = function(color){};
    /**
     * Gets the color of shadow fill for the gauge
     * @returns {string|geotoolkit.util.RgbaColor} color
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.getShadowColor = function(){};
    /**
     * Sets a new tick generator on the axis
     * @param {geotoolkit.axis.TickGenerator} tickGenerator tick generator
     * @returns {geotoolkit.gauges.axis.CircularAxis}
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.setTickGenerator = function(tickGenerator){};
    /**
     * Returns the tick generator pertaining to this axis
     * @returns {geotoolkit.axis.TickGenerator}
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.getTickGenerator = function(){};
    /**
     * Updates the state of axis
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.update = function(){};
    /**
     * Shows or hides the needle
     * @param {boolean} visible Visibility flag for the needle
     * @returns {geotoolkit.gauges.axis.CircularAxis}
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.setNeedleVisible = function(visible){};
    /**
     * Gets properties pertaining to needle
     * @returns {object} props JSON with properties
     * @returns {geotoolkit.scene.Group} props.geometry Geotoolkit group containing the shapes which form the geometry of the needle
     * @returns {geotoolkit.util.Point} props.center A point in model of needle which serves as an anchor point for rotation
     * and centering the needle with the gauge.
     * @returns {geotoolkit.gauges.AbstractGauge.DynamicElementPosition} props.position Layer on which the needle is positioned
     * @returns {number|string} props.radius For circular needle the length of the needle relative to the radius of the axis
     * @returns {boolean} props.visible Visibility flag of the needle
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.getNeedleOptions = function(){};
    /**
     * Sets options pertaining to the needle
     * @param {object} props JSON with properties
     * @param {geotoolkit.scene.Group} [props.geometry] Geotoolkit group containing the shapes which form the geometry of the needle
     * @param {geotoolkit.util.Point} [props.center] A point in model of needle which serves as an anchor point for rotation
     * and centering the needle with the gauge.
     * @param {geotoolkit.gauges.AbstractGauge.DynamicElementPosition} [props.position] Layer on which the needle should be positioned
     * either in front of all components, or in the back.
     * @param {number|string} [props.radius] For circular needle the length of the needle relative to the radius of the axis. * @param {} geometry
     * The length will be calculated automatically and if the needle has to be enlarged or shrinked, this will be done with
     * preservation of aspect ratio.
     * @param {boolean} [props.visible] Visibility flag of the needle
     * @returns {geotoolkit.gauges.axis.CircularAxis}
     */
    geotoolkit.gauges.axis.CircularAxis.prototype.setNeedleOptions = function(props){};

/**
 * @class geotoolkit.gauges.AbstractGauge
 * @augments geotoolkit.scene.AbstractNode
 * @implements geotoolkit.scene.INodeEnumerable
 * @implements geotoolkit.layout.ILayoutable
 * @param {object} props JSON with gauge properties
 * @param {number} [props.x] X coordinate of left top corner of the gauge in its parent model limits
 * @param {number} [props.y] Y coordinate of left top corner of the gauge in its parent model limits
 * @param {number} [props.width] Width of the gauge in its parent model limits
 * @param {number} [props.height] Height of the gauge in its parent model limits
 * @param {geotoolkit.util.Rect} [props.bounds] Bounds of the gauge in parent model limits. Will override x,y,widht,height
 * @param {string} [props.name] Name of the gauge
 * @param {geotoolkit.gauges.registry.FunctionRegistry} [props.functionregistry] Function registry which will be used
 * as a source of handler functions (ex: animation easing functions)
 * @param {boolean} [props.clipping=true] Container group clipping
 */
geotoolkit.gauges.AbstractGauge = {};
    /**
     * Layer to which a dynamic element should be added
     * @enum
     * @readonly
     */
    geotoolkit.gauges.AbstractGauge.DynamicElementPosition = {};
        /**
         * Top layer, displayed over everything else
         * @type {string}
         */
        geotoolkit.gauges.AbstractGauge.DynamicElementPosition.Top = "";
        /**
         * Bottom layer, displayed under everything else
         * @type {string}
         */
        geotoolkit.gauges.AbstractGauge.DynamicElementPosition.Bottom = "";
    /**
     * Events fired by AbstractGauge
     * @enum
     * @readonly
     */
    geotoolkit.gauges.AbstractGauge.Events = {};
        /**
         * When gauge value has been updated
         * @type {string}
         */
        geotoolkit.gauges.AbstractGauge.Events.ValueUpdated = "";
    /**
     * Copy constructor function
     * Used to clone gauge
     * @protected
     * @param {geotoolkit.gauges.AbstractGauge} gauge source gauge
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.copyConstructor = function(gauge){};
    /**
     * Returns current bounds of the gauge
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.gauges.AbstractGauge.prototype.getBounds = function(){};
    /**
     * Sets bounds to the gauge
     * @param {geotoolkit.util.Rect} bounds New bounds
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.setBounds = function(bounds){};
    /**
     * For North, South sides sets height, for East and West sets width, for custom regions sets x, y, width and height
     * @param {geotoolkit.gauges.layout.Regions | string} regionType Name of the region
     * @param {number | string | object} size Width or height of a side in CSS format, or an object with properties for custom regions
     * @param {number|string} [size.x] X of the region in CSS notation
     * @param {number|string} [size.y] Y of the region in CSS notation
     * @param {number|string} [size.width] Width of the region in CSS notation
     * @param {number|string} [size.height] Height of the region in CSS notation
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.setRegionSize = function(regionType, size){};
    /**
     * Sets innergroup clipping
     * @param {boolean} clipping clipping
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.enableClipping = function(clipping){};
    /**
     * Renders the gauge
     * @param {geotoolkit.renderer.RenderingContext} context Context to render the Gauge
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.render = function(context){};
    /**
     * Adds a custom component to provided specified region. A custom component is a group with any geometry
     * inside. The group bounds will be changed to fit the region it is added to. To maintain the size of your custom
     * group it is better to add a custom region to the gauge.
     * @param {geotoolkit.scene.Group} component A group with custom shape(s)
     * @param {geotoolkit.gauges.layout.Regions | string} region Name of the region to add component to. If such region does not
     * exist nothing will happen and the custom shape will not be added
     * @param {geotoolkit.gauges.layout.Layers | string} layer name of gauge layer to add component
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.addCustomComponent = function(component, region, layer){};
    /**
     * Return iterator on registered custom components
     * @param {function} [filter] a filter function. Returns all nodes if null
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.gauges.AbstractGauge.prototype.getCustomComponents = function(filter){};
    /**
     * Returns a registered custom component by its index
     * @param {number|string} index Index or name of the component to return
     * @returns {?geotoolkit.scene.Group} Null if no such index exists
     */
    geotoolkit.gauges.AbstractGauge.prototype.getCustomComponent = function(index){};
    /**
     * Removes a registered custom component from the gauge. If such component was not registered, does nothing.
     * @param {geotoolkit.scene.Group|number} component The component which has to be deleted, or its index
     * in iterator.
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.removeCustomComponent = function(component){};
    /**
     * Adds a new region to the gauge. Region is a rectangular area on the gauge defined by x, y, width and height
     * all set in CSS format.
     * @param {string | object} name Name of the region or a json with region parameters (including name)
     * @param {string | number} [name.name] Name of the region
     * @param {string | number} [name.x=0] x-coordinate of the region
     * @param {string | number} [name.y=0] y-coordinate of the region
     * @param {string | number} [name.width=0] width of the region
     * @param {string | number} [name.height=0] height of the region
     * @param {object} [region] JSON with region parameters
     * @returns {geotoolkit.gauges.AbstractGauge}
     * @throws {Error} When name is not provided to the custom region
     */
    geotoolkit.gauges.AbstractGauge.prototype.addRegion = function(name, region){};
    /**
     * Deletes a region from the layout. Only custom added regions can be removed. Will do nothing if
     * no such region was registered
     * @param {string} name Name of the region
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.removeRegion = function(name){};
    /**
     * Returns the region registered with provided name.
     * @param {geotoolkit.gauges.layout.Regions | string} name Name of the region to return
     * @returns {geotoolkit.gauges.layout.Region}
     */
    geotoolkit.gauges.AbstractGauge.prototype.getRegion = function(name){};
    /**
     * Debug method to display regions of the gauge in different colors
     * @param {string} [name] If you want to display only one region, pass its name here
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.displayRegions = function(name){};
    /**
     * Hides the regions displayed for debug reasons
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.hideRegions = function(){};
    /**
     * Returns the current layout of the gauge
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.gauges.AbstractGauge.prototype.getLayoutStyle = function(){};
    /**
     * Specify desired layout style
     * @param {geotoolkit.layout.LayoutStyle | object} layoutStyle desired layout style
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.setLayoutStyle = function(layoutStyle){};
    /**
     * Sets function registry which will provide handlers for gauges animation and alarms
     * @param {geotoolkit.gauges.registry.FunctionRegistry} registry New registry to set
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.setFunctionRegistry = function(registry){};
    /**
     * Returns function registry which provides handlers for gauges animation and alarms
     * @returns {geotoolkit.gauges.registry.FunctionRegistry} registry New registry to set
     */
    geotoolkit.gauges.AbstractGauge.prototype.getFunctionRegistry = function(){};
    /**
     * Update scene transformation
     * @returns {geotoolkit.gauges.AbstractGauge} this
     */
    geotoolkit.gauges.AbstractGauge.prototype.updateSceneTransformation = function(){};
    /**
     * Check if gauge falls within visible area on the screen
     *
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     * @returns {boolean} true if object is inside of rendarable area
     */
    geotoolkit.gauges.AbstractGauge.prototype.checkCollision = function(context){};
    /**
     * Sets properties pertaining to this gauge. Used for serialization. Please use setOptions for gauge customization.
     * @param {object} props JSON with properties
     * @param {number} [props.x] X coordinate of gauge in its parent model limits
     * @param {number} [props.y] Y coordinate of gauge in its parent model limits
     * @param {number} [props.width] Width of the gauge in its parent model limits
     * @param {number} [props.height] Height of the gauge in its parent model limits
     * @param {geotoolkit.util.Rect} [props.bounds] Bounds of the gauge in parent model limits. Overrides x, y, width, and Height
     * @param {boolean} [props.clipping] Enables/disables axis label clipping
     * @param {geotoolkit.gauges.registry.FunctionRegistry} [props.functionregistry] Function registry which will be used
     * @param {geotoolkit.attributes.FillStyle|geotoolkit.attributes.GradientStyle|object} [props.fillstyle] a new fill style
     * @param {geotoolkit.attributes.LineStyle|object} [props.linestyle] line style or options
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.setProperties = function(props){};
    /**
     * Sets properties pertaining to this gauge.
     * @param {object} options JSON with properties
     * @param {number} [options.x] X coordinate of gauge in its parent model limits
     * @param {number} [options.y] Y coordinate of gauge in its parent model limits
     * @param {number} [options.width] Width of the gauge in its parent model limits
     * @param {number} [options.height] Height of the gauge in its parent model limits
     * @param {geotoolkit.util.Rect} [options.bounds] Bounds of the gauge in parent model limits. Overrides x, y, width, and Height
     * @param {geotoolkit.gauges.registry.FunctionRegistry} [options.functionregistry] Function registry which will be used
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.setOptions = function(options){};
    /**
     * Gets properties pertaining to this gauge.
     * @returns {object} props JSON with properties
     * @returns {geotoolkit.util.Rect} [props.bounds] Bounds of the gauge in parent model limits
     * @returns {geotoolkit.gauges.registry.FunctionRegistry} [props.functionregistry] Function registry which used to
     * @returns {boolean} [props.clipping] axis label clipping
     * provide handler functions
     */
    geotoolkit.gauges.AbstractGauge.prototype.getOptions = function(){};
    /**
     * Gets properties pertaining to this gauge. Used for serialization. Please use setOptions for gauge customization.
     * @returns {object} props JSON with properties
     * @returns {geotoolkit.util.Rect} [props.bounds] Bounds of the gauge in parent model limits
     * @returns {geotoolkit.gauges.registry.FunctionRegistry} [props.functionregistry] Function registry which used to
     * @returns {boolean} [props.clipping] axis label clipping
     * provide handler functions
     */
    geotoolkit.gauges.AbstractGauge.prototype.getProperties = function(){};
    /**
     * Add invalidate handler
     * @param {function} handler handler to be notified about invalidation
     */
    geotoolkit.gauges.AbstractGauge.prototype.addInvalidateHandler = function(handler){};
    /**
     * Remove invalidate handler
     * @param {function} handler handler to be notified about invalidation
     */
    geotoolkit.gauges.AbstractGauge.prototype.removeInvalidateHandler = function(handler){};
    /**
     * Enumerate children nodes
     * @param {function(node, target)} callback callback function
     * @param {object} [target] callback target
     */
    geotoolkit.gauges.AbstractGauge.prototype.enumerateNodes = function(callback, target){};
    /**
     * Returns transformation from node to root scene
     * @returns {geotoolkit.util.Transformation} a transformation from node to root scene
     */
    geotoolkit.gauges.AbstractGauge.prototype.getSceneTransform = function(){};
    /**
     * Retrieves the transformation of bounds to parent
     * @returns {geotoolkit.util.Transformation} transform the local transform.
     */
    geotoolkit.gauges.AbstractGauge.prototype.getLocalTransform = function(){};
    /**
     * Sets local transformation to be used to transform from local to parent
     * coordinate
     * @param {geotoolkit.util.Transformation} localTransform local transformation for this node
     * @returns {geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.AbstractGauge.prototype.setLocalTransform = function(localTransform){};

/**
 * Defines a class which implements a gauge displaying data represented by axes. Each axis represents one specific data
 * set with lower and upper limit. Every normal operation, like setting value, function registry, animation, e.t.c, are
 * performed on the axes as opposed to gauge like it is done in the numeric gauges. In this case the gauge
 * works as a container of the axes and is only capable of axis manipulations and abstract gauge functionality.
 * @class geotoolkit.gauges.AxisGauge
 * @augments geotoolkit.gauges.AbstractGauge
 * @param {object} params Object with axis gauge properties
 */
geotoolkit.gauges.AxisGauge = {};
    /**
     * Copy constructor function
     * Used to clone gauge
     * @protected
     * @param {geotoolkit.gauges.AxisGauge} gauge source gauge
     * @returns {geotoolkit.gauges.AxisGauge}
     */
    geotoolkit.gauges.AxisGauge.prototype.copyConstructor = function(gauge){};
    /**
     * Adds a new axis to the axis gauge.
     * @param {object} params Parameters required to create an axis
     * @function
     * @abstract
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.AxisGauge.prototype.addAxis = function(params){};
    /**
     * Sets properties pertaining to this gauge. Please use setOptions for customization.
     * @param {object} props Properties to set
     * @param {object|geotoolkit.gauges.axis.Axis} [props.axes] JSON with axes properties where the key is the axis name and the property is an
     * object with axis properties. If no axis with such name has been registered, a new axis with the properties will be added.
     * @returns {geotoolkit.gauges.AxisGauge}
     */
    geotoolkit.gauges.AxisGauge.prototype.setProperties = function(props){};
    /**
     * Gets properties pertaining to this gauge. Please use setOptions for customization.
     * @returns {object} props Properties to set
     */
    geotoolkit.gauges.AxisGauge.prototype.getProperties = function(){};
    /**
     * Gets an axis by its name or index from axes iterator
     * @param {string | number} name Name of the axis or its index
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.AxisGauge.prototype.getAxis = function(name){};
    /**
     * Returns an iterator over existing axes in this gauge
     * @param {function()} [filter] a filter function. Returns all axes if null
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.gauges.AxisGauge.prototype.getAxes = function(filter){};
    /**
     * Removes an axis from the gauge. If no such gauge exists, nothing will be done.
     * @param {string | number} name Name of the axis or its index
     * @returns {geotoolkit.gauges.AxisGauge}
     */
    geotoolkit.gauges.AxisGauge.prototype.removeAxis = function(name){};
    /**
     * Changes the name of axis in the map without needing to remove and readd the axis
     * @param {string} oldName Old name of the axis
     * @param {string} newName New name of the axis
     * @returns {geotoolkit.gauges.AxisGauge}
     */
    geotoolkit.gauges.AxisGauge.prototype.reassignAxisName = function(oldName, newName){};
    /**
     * Checks if the gauge contains specified axis
     * @param {geotoolkit.gauges.axis.Axis | string} axis The axis or its name
     * @returns {boolean}
     */
    geotoolkit.gauges.AxisGauge.prototype.hasAxis = function(axis){};
    /**
     * Enumerate children nodes
     * @param {function(node, target)} callback callback
     * @param {object} [target] target
     */
    geotoolkit.gauges.AxisGauge.prototype.enumerateNodes = function(callback, target){};
    /**
     * If this method is called on the gauge instead of an axis, the value and skipAnimation will be propagated
     * to each axis registered for the gauge. Equivalent to looping through each axis and setting this value.
     * @param {number} val New value for each axis
     * @param {boolean} skipAnimation True to not animate
     * @returns {geotoolkit.gauges.AxisGauge}
     */
    geotoolkit.gauges.AxisGauge.prototype.setValue = function(val, skipAnimation){};
    /**
     * If this method is called on the gauge instead of an axis, the value and skipAnimation will be propagated
     * to each axis registered for the gauge. Equivalent to looping through each axis and setting this value.
     * Sets a new data range displayed by this axis
     * @param {geotoolkit.util.Range|object} range New range to set
     * @param {number} [range.min] lower limit
     * @param {number} [range.max] upper limit
     * @returns {geotoolkit.gauges.AxisGauge}
     */
    geotoolkit.gauges.AxisGauge.prototype.setRange = function(range){};

/**
 * This class implements a full Circular Gauge with possibility of multiple arrows. <br>
 * A Circular Gauge is a visual representation of a measuring device with a radial axis that sweeps any angle from 0 to 360 degrees and a pointer (Needle or arrow) that indicates values on that scale.<br>
 * Gauges value is basically an angle on a circle plot. Gauges can have radius and start and end angle.
 * Gauge axes are usually colored for easy value distinction.
 * @class geotoolkit.gauges.CircularGauge
 * @augments geotoolkit.gauges.AxisGauge
 * @param {object} params JSON with gauge parameters
 * @param {number} [params.startangle=0] Start of the gauge body in radians
 * @param {number} [params.sweepangle=2*Pi] Sweep of the gauge body in radians
 * @param {object} [params.background] JSON with background properties
 * @param {geotoolkit.attributes.FillStyle} [params.background.fillstyle] Fillstyle to apply to background
 * @param {geotoolkit.attributes.LineStyle} [params.background.linestyle] Linestyle to apply to background
 * @param {boolean} [params.background.visible] Sets visibility to background
 */
geotoolkit.gauges.CircularGauge = {};
    /**
     * Copy constructor function
     * Used to clone gauge
     * @protected
     * @param {geotoolkit.gauges.CircularGauge} gauge source gauge
     * @returns {geotoolkit.gauges.CircularGauge}
     */
    geotoolkit.gauges.CircularGauge.prototype.copyConstructor = function(gauge){};
    /**
     * Sets padding style
     * @param {geotoolkit.attributes.SpaceStyle|object} style padding style
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.gauges.CircularGauge.prototype.setPaddingStyle = function(style){};
    /**
     * Gets padding style
     * @returns {?geotoolkit.attributes.SpaceStyle}
     */
    geotoolkit.gauges.CircularGauge.prototype.getPaddingStyle = function(){};
    /**
     * Sets a new start angle
     * @param {number} angle Angle in radians
     * @returns {geotoolkit.gauges.CircularGauge}
     */
    geotoolkit.gauges.CircularGauge.prototype.setStartAngle = function(angle){};
    /**
     * Sets a new sweep angle
     * @param {number} angle Angle in radians
     * @returns {geotoolkit.gauges.CircularGauge}
     */
    geotoolkit.gauges.CircularGauge.prototype.setSweepAngle = function(angle){};
    /**
     * Adds a new circular axis to the gauge. An axis can have only one needle. In order to add more needles to a gauge
     * user needs to add a new axis with its own ranges and data.
     * @param {object} params Parameters required to create an axis
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.CircularGauge.prototype.addAxis = function(params){};
    /**
     * Sets properties pertaining to circulr gauge. Used for serialization. Please use setOptions for gauge customization.
     * @param {object} opts JSON with properties
     * @param {number} [opts.startangle] Start angle of gauge body arc
     * @param {number} [opts.sweepangle] Angle by which the axis body sweeps. End angle becomes startangle + sweepanle
     * @returns {geotoolkit.gauges.CircularGauge}
     */
    geotoolkit.gauges.CircularGauge.prototype.setOptions = function(opts){};
    /**
     * Returns properties pertaining to this gauge. Used for serialization, please use getOptions for customization.
     * @returns {object} props JSON with properties
     * @returns {number} [props.startangle] Start angle of gauge body arc
     * @returns {number} [props.sweepangle] Angle by which the axis body sweeps. End angle becomes startangle + sweepanle
     */
    geotoolkit.gauges.CircularGauge.prototype.getOptions = function(){};
    /**
     * Returns properties pertaining to this gauge. Used for serialization, please use getOptions for customization.
     * @returns {object} props JSON with properties
     * @returns {number} props.startangle Start angle of gauge body arc
     * @returns {number} props.sweepangle Angle by which the axis body sweeps. End angle becomes startangle + sweepanle
     * @returns {object} props.background Object with background properties
     * @returns {geotoolkit.attributes.FillStyle} props.background.fillstyle Fillstyle of background circle
     * @returns {geotoolkit.attributes.LineStyle} props.background.linestyle Linestyle of background circle
     * @returns {boolean} props.background.visible Visibility of the background shape
     */
    geotoolkit.gauges.CircularGauge.prototype.getProperties = function(){};
    /**
     * Sets properties pertaining to circulr gauge. Used for serialization. Please use setOptions for gauge customization.
     * @param {object} props JSON with properties
     * @param {number} [props.startangle] Start angle of gauge body arc
     * @param {number} [props.sweepangle] Angle by which the axis body sweeps. End angle becomes startangle + sweepanle
     * @param {object} [props.background] JSON with background properties
     * @param {geotoolkit.attributes.FillStyle} [props.background.fillstyle] Fillstyle of background circle
     * @param {geotoolkit.attributes.LineStyle} [props.background.linestyle] Linestyle of background circle
     * @param {boolean} [props.background.visible] Visibility of the background shape
     * @returns {geotoolkit.gauges.CircularGauge}
     */
    geotoolkit.gauges.CircularGauge.prototype.setProperties = function(props){};
    /**
     * Updates and recalculates parameters of gauge, like radius, angles, and updates axes.
     * @returns {geotoolkit.gauges.CircularGauge}
     */
    geotoolkit.gauges.CircularGauge.prototype.update = function(){};

/**
 * A gauge which only displays value, name, and any custom components added.
 * @class geotoolkit.gauges.NumericGauge
 * @augments geotoolkit.gauges.AbstractGauge
 * @param {object} params JSON with properties
 * @param {string} [params.animationfunction] Name of an easing function in function registry which will define the animation behavior
 * @param {number} [params.animationtime]
 * @param {number} [params.value] Value of the gauge to set at initiation
 * @param {array.<geotoolkit.gauges.Alarm>} [params.alarms] A list of alarms to set on the gauge.
 * @param {string} [params.units] Units in which data is represented in this gauge
 * @param {object} [params.background] JSON with properties for rectangular background of the gauge
 * @param {geotoolkit.attributes.FillStyle} [params.background.fillstyle] Fill style of the background rectangle
 * @param {geotoolkit.attributes.LineStyle} [params.background.linestyle] Line style of the background rectangle
 * @param {boolean} [params.background.visible] Visibility of the background rectangle

 * @param {object} [params.namestyle] JSON with properties of the test displaying name of the gauge
 * @param {geotoolkit.gauges.layout.Regions} [params.namestyle.position] Region in which to render the name text
 * @param {string | geotoolkit.util.RgbaColor} [params.namestyle.color] Color of name text
 * @param {string} [params.namestyle.font] Font of name text
 * @param {geotoolkit.attributes.TextStyle} [params.namestyle.textstyle] Text style of the name text. If provided, overrides
 * font and color
 * @param {geotoolkit.gauges.ValueDisplayStrategies} [params.namestyle.displaystrategy] A display strategy to define how the
 * name text fits the region it is rendered in
 * @param {geotoolkit.util.AnchorType} [params.namestyle.alignment] Defines where in the region the name text will be positioned
 * @param {boolean} [params.namestyle.visible] Visibility of the name text

 * @param {object} [params.valuestyle] JSON with properties of the test displaying name of the gauge
 * @param {geotoolkit.gauges.layout.Regions} [params.valuestyle.position] Region in which to render the name text
 * @param {string | geotoolkit.util.RgbaColor} [params.valuestyle.color] Color of name text
 * @param {string} [params.valuestyle.font] Font of value text
 * @param {geotoolkit.attributes.TextStyle} [params.valuestyle.textstyle] Text style of the value text. If provided, overrides
 * font and color
 * @param {geotoolkit.gauges.ValueDisplayStrategies} [params.valuestyle.displaystrategy] A display strategy to define how the
 * value text fits the region it is rendered in
 * @param {geotoolkit.util.AnchorType} [params.valuestyle.alignment] Defines where in the region the value text will be positioned
 * @param {boolean} [params.valuestyle.visible] Visibility of the value text
 * @param {geotoolkit.util.NumberFormat} [params.valuestyle.formatter] Formatter which will be used to format the value
 * before displaying it.
 * @param {string} [params.valuestyle.format='##.#'] Format of value to set on number formatter
 */
geotoolkit.gauges.NumericGauge = {};
    /**
     * Copy constructor function
     * Used to clone gauge
     * @protected
     * @param {geotoolkit.gauges.NumericGauge} gauge gauge for cloning
     */
    geotoolkit.gauges.NumericGauge.prototype.copyConstructor = function(gauge){};
    /**
     * Adds an alarm to the axis. Alarm handler will be called every time
     * value set on the axis falls within alarm's range
     * @param {geotoolkit.gauges.Alarm} alarm An alarm to add
     * @returns {geotoolkit.gauges.NumericGauge}
     */
    geotoolkit.gauges.NumericGauge.prototype.addAlarm = function(alarm){};
    /**
     * Gets the alarm referenced by provided name or index. If alarm name is not set or no such
     * index exists, null will be returned.
     * @param {string | number} name Name of alarm or its index in iterator
     * @returns {geotoolkit.gauges.Alarm|null}
     */
    geotoolkit.gauges.NumericGauge.prototype.getAlarm = function(name){};
    /**
     * Removes an alarm by its name, index, or instance of alarm. The alarm will never be called again and reference to
     * it will be removed. Does nothing if no such alarm has been added before
     * @param {string | number | geotoolkit.gauges.Alarm} name Name of alarm or its index in iterator
     * @returns {geotoolkit.gauges.NumericGauge} this
     */
    geotoolkit.gauges.NumericGauge.prototype.removeAlarm = function(name){};
    /**
     * Removes all attached alarms
     * @returns {geotoolkit.gauges.NumericGauge} this
     */
    geotoolkit.gauges.NumericGauge.prototype.cleanAlarms = function(){};
    /**
     * Gets an iterator over existing alarms in the gauge
     * @param {function()} [filter] a filter function. Returns all axes if not provided
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.gauges.NumericGauge.prototype.getAlarms = function(filter){};
    /**
     * Sets properties pertaining to text representing gauge value
     * @param {object} props Object with properties
     * @param {object} [props.properties] see {@link geotoolkit.scene.shapes.Text#setProperties}
     * @param {geotoolkit.gauges.layout.Regions} [props.position] Region in which to render the name text
     * @param {string | geotoolkit.util.RgbaColor} [props.color] Color of name text
     * @param {string} [props.font] Font of value text
     * @param {geotoolkit.attributes.TextStyle} [props.textstyle] Text style of the value text. If provided, overrides
     * font and color
     * @param {geotoolkit.gauges.ValueDisplayStrategies} [props.displaystrategy] A display strategy to define how the
     * value text fits the region it is rendered in
     * @param {geotoolkit.util.AnchorType} [props.alignment] Defines where in the region the value text will be positioned
     * @param {boolean} [props.visible] Visibility of the value text
     * @param {geotoolkit.util.NumberFormat} [props.formatter] Formatter which will be used to format the value
     * before displaying it.
     * @param {string} [props.format] Format of value to set on number formatter
     * @returns {geotoolkit.gauges.NumericGauge}
     */
    geotoolkit.gauges.NumericGauge.prototype.setValueProperties = function(props){};
    /**
     * Returns background styles
     * @returns {object}
     */
    geotoolkit.gauges.NumericGauge.prototype.getBackgroundStyle = function(){};
    /**
     * Sets background styles
     * @param {object} props JSON containing background styles
     * @param {geotoolkit.attributes.LineStyle} [props.linestyle] background linestyle
     * @param {geotoolkit.attributes.FillStyle} [props.fillstyle] background fillstyle
     * @param {boolean} [props.visible] background visibility
     * @returns {geotoolkit.gauges.NumericGauge}
     */
    geotoolkit.gauges.NumericGauge.prototype.setBackgroundStyle = function(props){};
    /**
     * Gets properties of value text
     * @returns {object} props
     * @returns {geotoolkit.gauges.layout.Regions} props.position Region in which to render the name text
     * @returns {geotoolkit.attributes.TextStyle} props.textstyle Text style of the value text
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} props.displaystrategy A display strategy which defines how the
     * value text fits the region it is rendered in
     * @returns {geotoolkit.util.AnchorType} props.alignment Defines where in the region the value text will be positioned
     * @returns {boolean} props.visible Visibility of the value text
     * @returns {geotoolkit.util.NumberFormat} props.formatter Formatter which will be used to format the value
     * before displaying it.
     * @returns {string} props Format of value to set on number formatter
     */
    geotoolkit.gauges.NumericGauge.prototype.getValueProperties = function(){};
    /**
     * Sets properties pertaining to text representing gauge name
     * @param {object} props Object with properties
     * @param {object} [props.properties] see {@link geotoolkit.scene.shapes.Text#setProperties}
     * @param {geotoolkit.gauges.layout.Regions} [props.position] Region in which to render the name text
     * @param {string | geotoolkit.util.RgbaColor} [props.color] Color of name text
     * @param {string} [props.font] Font of name text
     * @param {geotoolkit.attributes.TextStyle} [props.textstyle] Text style of the name text. If provided, overrides
     * font and color
     * @param {geotoolkit.gauges.ValueDisplayStrategies} [props.displaystrategy] A display strategy to define how the
     * name text fits the region it is rendered in
     * @param {geotoolkit.util.AnchorType} [props.alignment] Defines where in the region the name text will be positioned
     * @param {boolean} [props.visible] Visibility of the name text
     * @returns {geotoolkit.gauges.NumericGauge}
     */
    geotoolkit.gauges.NumericGauge.prototype.setNameProperties = function(props){};
    /**
     * Gets properties of value text
     * @returns {object} props
     * @returns {geotoolkit.gauges.layout.Regions} props.position Region in which to render the name text
     * @returns {geotoolkit.attributes.TextStyle} props.textstyle Text style of the value text
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} props.displaystrategy A display strategy which defines how the
     * value text fits the region it is rendered in
     * @returns {geotoolkit.util.AnchorType} props.alignment Defines where in the region the value text will be positioned
     * @returns {boolean} props.visible Visibility of the value text
     */
    geotoolkit.gauges.NumericGauge.prototype.getNameProperties = function(){};
    /**
     * Sets the name of animation function in function registry corresponding to this axis
     * @param {string} name Name of the function. This function has to be registered in the registry, otherwise no
     * animation will be applied.
     * @returns {geotoolkit.gauges.NumericGauge}
     */
    geotoolkit.gauges.NumericGauge.prototype.setAnimation = function(name){};
    /**
     * Returns the name of animation function associated with this gauge
     * @returns {null|string}
     */
    geotoolkit.gauges.NumericGauge.prototype.getAnimation = function(){};
    /**
     * Sets the value of the gauge.
     * @param {number} val New value to set
     * @param {boolean} [skipAnimation] If true, value change will not be animated
     * @returns {geotoolkit.gauges.NumericGauge}
     */
    geotoolkit.gauges.NumericGauge.prototype.setValue = function(val, skipAnimation){};
    /**
     * Returns the current value of the axis
     * @returns {number}
     */
    geotoolkit.gauges.NumericGauge.prototype.getValue = function(){};
    /**
     * Returns time in which a full animation cycle is finished (in seconds)
     * @returns {number}
     */
    geotoolkit.gauges.NumericGauge.prototype.getAnimationTime = function(){};
    /**
     * Sets time required to accomplish a full animation run in between two values (in seconds)
     * @param {number} time Time in seconds to perform the animation
     * @returns {geotoolkit.gauges.NumericGauge} this
     */
    geotoolkit.gauges.NumericGauge.prototype.setAnimationTime = function(time){};
    /**
     * Sets the name of the gauge
     * @param {string} name The new gauge name
     * @returns {geotoolkit.gauges.NumericGauge}
     */
    geotoolkit.gauges.NumericGauge.prototype.setName = function(name){};
    /**
     * Sets properties pertaining to this gauge. Used for serialization. Please use setOptions for gauge customization.
     * @param {object} props JSON with properties
     * @param {string} [props.animationfunction] Name of an easing function in function registry which will define the animation behavior
     * @param {number} [props.animationtime] Time in seconds to perform the animation
     * @param {number} [props.value] Value of the gauge to set at initiation
     * @param {array.<geotoolkit.gauges.Alarm>} [props.alarms] A list of alarms to set on the gauge.
     * @param {string} [props.units] Units in which data is represented in this gauge
     * @param {object} [props.background] JSON with properties for rectangular background of the gauge see {@link geotoolkit.gauges.NumericGauge#setBackgroundStyle}
     * @param {object} [props.namestyle] JSON with properties of the test displaying name of the gauge see {@link geotoolkit.gauges.NumericGauge#setNameProperties}
     * @param {object} [props.valuestyle] JSON with properties of the test displaying name of the gauge see {@link geotoolkit.gauges.NumericGauge#setValueProperties}
     * @returns {geotoolkit.gauges.NumericGauge}
     */
    geotoolkit.gauges.NumericGauge.prototype.setProperties = function(props){};
    /**
     * Returns an object with all the properties pertaining to this gauge. This method is used for serialization, please
     * use getOptions to customize the gauge.
     * @returns {object} props JSON with properties
     * @returns {string} [props.animationfunction] Name of an easing function in function registry which will define the animation behavior
     * @returns {number} [props.animationtime]
     * @returns {number} [props.value] Value of the gauge to set at initiation
     * @returns {array.<geotoolkit.gauges.Alarm>} [props.alarms] A list of alarms to set on the gauge.
     * @returns {string} [props.units] Units in which data is represented in this gauge
     * @returns {object} [props.background] JSON with properties for rectangular background of the gauge
     * @returns {geotoolkit.attributes.FillStyle} [props.background.fillstyle] Fill style of the background rectangle
     * @returns {geotoolkit.attributes.LineStyle} [props.background.linestyle] Line style of the background rectangle
     * @returns {boolean} [props.background.visible] Visibility of the background rectangle
    
     * @returns {object} [props.namestyle] JSON with properties of the test displaying name of the gauge
     * @returns {geotoolkit.gauges.layout.Regions} [props.namestyle.position] Region in which to render the name text
     * @returns {string | geotoolkit.util.RgbaColor} [props.namestyle.color] Color of name text
     * @returns {string} [props.namestyle.font] Font of name text
     * @returns {geotoolkit.attributes.TextStyle} [props.namestyle.textstyle] Text style of the name text. If provided, overrides
     * font and color
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} [props.namestyle.displaystrategy] A display strategy to define how the
     * name text fits the region it is rendered in
     * @returns {geotoolkit.util.AnchorType} [props.namestyle.alignment] Defines where in the region the name text will be positioned
     * @returns {boolean} [props.namestyle.visible] Visibility of the name text
    
     * @returns {object} [props.valuestyle] JSON with properties of the test displaying name of the gauge
     * @returns {geotoolkit.gauges.layout.Regions} [props.valuestyle.position] Region in which to render the name text
     * @returns {string | geotoolkit.util.RgbaColor} [props.valuestyle.color] Color of name text
     * @returns {string} [props.valuestyle.font] Font of value text
     * @returns {geotoolkit.attributes.TextStyle} [props.valuestyle.textstyle] Text style of the value text. If provided, overrides
     * font and color
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} [props.valuestyle.displaystrategy] A display strategy to define how the
     * value text fits the region it is rendered in
     * @returns {geotoolkit.util.AnchorType} [props.valuestyle.alignment] Defines where in the region the value text will be positioned
     * @returns {boolean} [props.valuestyle.visible] Visibility of the value text
     * @returns {geotoolkit.util.NumberFormat} [props.valuestyle.formatter] Formatter which will be used to format the value
     * before displaying it.
     * @returns {string} [props.valuestyle.format] Format of value to set on number formatter
     */
    geotoolkit.gauges.NumericGauge.prototype.getProperties = function(){};
    /**
     * Sets options on the gauge. Use this method to customize the gauge.
     * @param {object} options JSON with properties
     * @param {string} [options.animationfunction] Name of an easing function in function registry which will define the animation behavior
     * @param {number} [options.animationtime] Time in seconds to perform the animation
     * @param {number} [options.value] Value of the gauge to set at initiation
     * @param {array.<geotoolkit.gauges.Alarm>} [options.alarms] A list of alarms to set on the gauge.
     * @param {string} [options.units] Units in which data is represented in this gauge
     * @param {object} [options.background] JSON with properties for rectangular background of the gauge
     * @param {geotoolkit.attributes.FillStyle} [options.background.fillstyle] Fill style of the background rectangle
     * @param {geotoolkit.attributes.LineStyle} [options.background.linestyle] Line style of the background rectangle
     * @param {boolean} [options.background.visible] Visibility of the background rectangle
    
     * @param {object} [options.namestyle] JSON with properties of the test displaying name of the gauge
     * @param {geotoolkit.gauges.layout.Regions} [options.namestyle.position] Region in which to render the name text
     * @param {string | geotoolkit.util.RgbaColor} [options.namestyle.color] Color of name text
     * @param {string} [options.namestyle.font] Font of name text
     * @param {geotoolkit.attributes.TextStyle} [options.namestyle.textstyle] Text style of the name text. If provided, overrides
     * font and color
     * @param {geotoolkit.gauges.ValueDisplayStrategies} [options.namestyle.displaystrategy] A display strategy to define how the
     * name text fits the region it is rendered in
     * @param {geotoolkit.util.AnchorType} [options.namestyle.alignment] Defines where in the region the name text will be positioned
     * @param {boolean} [options.namestyle.visible] Visibility of the name text
    
     * @param {object} [options.valuestyle] JSON with properties of the test displaying name of the gauge
     * @param {geotoolkit.gauges.layout.Regions} [options.valuestyle.position] Region in which to render the name text
     * @param {string | geotoolkit.util.RgbaColor} [options.valuestyle.color] Color of name text
     * @param {string} [options.valuestyle.font] Font of value text
     * @param {geotoolkit.attributes.TextStyle} [options.valuestyle.textstyle] Text style of the value text. If provided, overrides
     * font and color
     * @param {geotoolkit.gauges.ValueDisplayStrategies} [options.valuestyle.displaystrategy] A display strategy to define how the
     * value text fits the region it is rendered in
     * @param {geotoolkit.util.AnchorType} [options.valuestyle.alignment] Defines where in the region the value text will be positioned
     * @param {boolean} [options.valuestyle.visible] Visibility of the value text
     * @param {geotoolkit.util.NumberFormat} [options.valuestyle.formatter] Formatter which will be used to format the value
     * before displaying it.
     * @param {string} [options.valuestyle.format='##.#'] Format of value to set on number formatter
     * @returns {geotoolkit.gauges.NumericGauge}
     */
    geotoolkit.gauges.NumericGauge.prototype.setOptions = function(options){};
    /**
     * Returns an object with all the options set on this gauge
     * @returns {object} props JSON with properties
     * @returns {string} [props.animationfunction] Name of an easing function in function registry which will define the animation behavior
     * @returns {number} [props.animationtime]
     * @returns {number} [props.value] Value of the gauge to set at initiation
     * @returns {array.<geotoolkit.gauges.Alarm>} [props.alarms] A list of alarms to set on the gauge.
     * @returns {string} [props.units] Units in which data is represented in this gauge
     * @returns {object} [props.background] JSON with properties for rectangular background of the gauge
     * @returns {geotoolkit.attributes.FillStyle} [props.background.fillstyle] Fill style of the background rectangle
     * @returns {geotoolkit.attributes.LineStyle} [props.background.linestyle] Line style of the background rectangle
     * @returns {boolean} [props.background.visible] Visibility of the background rectangle
    
     * @returns {object} [props.namestyle] JSON with properties of the test displaying name of the gauge
     * @returns {geotoolkit.gauges.layout.Regions} [props.namestyle.position] Region in which to render the name text
     * @returns {string | geotoolkit.util.RgbaColor} [props.namestyle.color] Color of name text
     * @returns {string} [props.namestyle.font] Font of name text
     * @returns {geotoolkit.attributes.TextStyle} [props.namestyle.textstyle] Text style of the name text. If provided, overrides
     * font and color
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} [props.namestyle.displaystrategy] A display strategy to define how the
     * name text fits the region it is rendered in
     * @returns {geotoolkit.util.AnchorType} [props.namestyle.alignment] Defines where in the region the name text will be positioned
     * @returns {boolean} [props.namestyle.visible] Visibility of the name text
    
     * @returns {object} [props.valuestyle] JSON with properties of the test displaying name of the gauge
     * @returns {geotoolkit.gauges.layout.Regions} [props.valuestyle.position] Region in which to render the name text
     * @returns {string | geotoolkit.util.RgbaColor} [props.valuestyle.color] Color of name text
     * @returns {string} [props.valuestyle.font] Font of value text
     * @returns {geotoolkit.attributes.TextStyle} [props.valuestyle.textstyle] Text style of the value text. If provided, overrides
     * font and color
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} [props.valuestyle.displaystrategy] A display strategy to define how the
     * value text fits the region it is rendered in
     * @returns {geotoolkit.util.AnchorType} [props.valuestyle.alignment] Defines where in the region the value text will be positioned
     * @returns {boolean} [props.valuestyle.visible] Visibility of the value text
     * @returns {geotoolkit.util.NumberFormat} [props.valuestyle.formatter] Formatter which will be used to format the value
     * before displaying it.
     * @returns {string} [props.valuestyle.format] Format of value to set on number formatter
     */
    geotoolkit.gauges.NumericGauge.prototype.getOptions = function(){};
    /**
     * Enumerate children nodes
     * @param {function(node, target)} callback callback
     * @param {object} [target] target
     */
    geotoolkit.gauges.NumericGauge.prototype.enumerateNodes = function(callback, target){};

/**
 * @class geotoolkit.gauges.TrafficGauge
 * @augments geotoolkit.gauges.NumericGauge
 * @param {object} props JSON with properties
 * @param {geotoolkit.util.Orientation} [props.orientation=geotoolkit.util.Orientation.Vertical] Orientation of the gauge (horizontal or vertical)
 * @param {object | Array.<object>} [props.trafficlights=[]] An array with properties of each traffic light or an object with a single light
 * @param {object} [props.lights] light options
 * @param {string | geotoolkit.attributes.LineStyle} [props.lights.name] Name of the light, all the operations on this light will be referenced by this name
 * @param {string | geotoolkit.attributes.LineStyle} [props.lights.linestyle] Line style of the light shape
 * @param {string | geotoolkit.attributes.FillStyle} [props.lights.activefill=lightgrey] Fill style applied to this light when the value of the gauge falls within its range
 * @param {string | geotoolkit.attributes.FillStyle} [props.lights.inactivefill=lightgrey] Fill style applied to this light when the value of the gauge falls out of its range
 * @param {string | function} [props.lights.painter=geotoolkit.scene.shapes.painters.CirclePainter] Painter used to draw the light shape
 * @param {boolean} [props.lights.preserveaspectratio=true] A flag defining if the shape should have equal width and height regardless of its container dimensions
 * @param {string | number} [props.lights.padding=0] Padding inside the container of this light in CSS notation. This will be applied to all the sides.
 * @param {string | number} [props.lights.padding-left=0] Left padding inside the container of this light in CSS notation. This parameter overrides props.padding
 * @param {string | number} [props.lights.padding-right=0] Right padding inside the container of this light in CSS notation. This parameter overrides props.padding
 * @param {string | number} [props.lights.padding-top=0] Top padding inside the container of this light in CSS notation. This parameter overrides props.padding
 * @param {string | number} [props.lights.padding-bottom=0] Bottom padding inside the container of this light in CSS notation. This parameter overrides props.padding
 * @param {number} [props.lights.low=0] Lower bound of the range in which this light is active
 * @param {number} [props.lights.high=0] Higher bound of the range in which this light is active
 * @param {object} [props.name] JSON with Properties pertaining to name text
 * @param {geotoolkit.attributes.TextStyle} [props.name.textstyle] Text style to apply to name
 * @param {string | geotoolkit.util.RgbaColor} [props.name.color] Color of text to apply to name (will override textstyle color)
 * @param {string} [props.name.font] Font to apply to name (will override textstyle font)
 * @param {string | geotoolkit.gauges.layout.Regions} [props.name.position] Position where to render the name
 * @param {string | geotoolkit.gauges.ValueDisplayStrategies} [props.name.displaystrategy] Display strategy type
 * @param {string | geotoolkit.util.AnchorType} [props.name.alignment] Alignment of the value shape in its container region
 * @param {string} [props.name.name] Name of the gauge
 * @param {object} [props.value] Object with properties pertaining to value text
 * @param {geotoolkit.attributes.TextStyle} [props.value.textstyle] Text style to apply to value
 * @param {string | geotoolkit.util.RgbaColor} [props.value.color] Color of text to apply to value (will override textstyle color)
 * @param {string} [props.value.font] Font to apply to value (will override textstyle font)
 * @param {string | geotoolkit.gauges.layout.Regions} [props.value.position] Position where to render the value
 * @param {string} [props.value.formatter] Name of the formatter function to apply to value
 * @param {geotoolkit.gauges.ValueDisplayStrategies} [props.value.displaystrategy] Display strategy type
 * @param {geotoolkit.util.AnchorType} [props.value.alignment] Alignment of the value shape in its container region
 * @param {string} [props.units] Units to display by value text (will be styled same as value)
 */
geotoolkit.gauges.TrafficGauge = {};
    /**
     * Sets properties pertaining to traffic gauge. Used for serialization, to customize gauge use setOptions
     * @param {object} props JSON with properties
     * @param {geotoolkit.util.Orientation} [props.orientation] Orientation of the gauge (horizontal or vertical)
     * @param {object | Array.<object>} [props.trafficlights] An object with properties of each traffic light or an object with a single light see {@link geotoolkit.gauges.TrafficGauge#setTrafficLightProperties}
     * @param {object} [props.name] JSON with Properties pertaining to name text see {@link geotoolkit.gauges.NumericGauge#setNameProperties}
     * @param {object} [props.value] Object with properties pertaining to value text see {@link geotoolkit.gauges.NumericGauge#setValueProperties}
     * @param {string} [props.units] Units to display by value text (will be styled same as value)
     * @returns {geotoolkit.gauges.TrafficGauge}
     */
    geotoolkit.gauges.TrafficGauge.prototype.setProperties = function(props){};
    /**
     * Sets options pertaining to traffic gauge
     * @param {object} props JSON with properties
     * @param {geotoolkit.util.Orientation} [props.orientation] Orientation of the gauge (horizontal or vertical)
     * @param {object | Array.<object>} [props.trafficlights] An array with properties of each traffic light or an object with a single light
     * @param {string | geotoolkit.attributes.LineStyle} [props.trafficlights.name] Name of the light, all the operations on this light will be referenced by this name
     * @param {string | geotoolkit.attributes.LineStyle} [props.trafficlights.linestyle] Line style of the light shape
     * @param {string | geotoolkit.attributes.FillStyle} [props.trafficlights.activefill] Fill style applied to this light when the value of the gauge falls within its range
     * @param {string | geotoolkit.attributes.FillStyle} [props.trafficlights.inactivefill] Fill style applied to this light when the value of the gauge falls out of its range
     * @param {string | function} [props.trafficlights.painter] Painter used to draw the light shape
     * @param {boolean} [props.trafficlights.preserveaspectratio] A flag defining if the shape should have equal width and height regardless of its container dimensions
     * @param {string | number} [props.trafficlights.padding] Padding inside the container of this light in CSS notation. This will be applied to all the sides.
     * @param {string | number} [props.trafficlights.padding-left] Left padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {string | number} [props.trafficlights.padding-right] Right padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {string | number} [props.trafficlights.padding-top] Top padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {string | number} [props.trafficlights.padding-bottom] Bottom padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {number} [props.trafficlights.low] Lower bound of the range in which this light is active
     * @param {number} [props.trafficlights.high] Higher bound of the range in which this light is active
     * @param {object} [props.name] JSON with Properties pertaining to name text
     * @param {geotoolkit.attributes.TextStyle} [props.name.textstyle] Text style to apply to name
     * @param {string | geotoolkit.util.RgbaColor} [props.name.color] Color of text to apply to name (will override textstyle color)
     * @param {string} [props.name.font] Font to apply to name (will override textstyle font)
     * @param {string | geotoolkit.gauges.layout.Regions} [props.name.position] Position where to render the name
     * @param {string | geotoolkit.gauges.ValueDisplayStrategies} [props.name.displaystrategy] Display strategy type
     * @param {string | geotoolkit.util.AnchorType} [props.name.alignment] Alignment of the value shape in its container region
     * @param {string} [props.name.name] Name of the gauge
     * @param {object} [props.value] Object with properties pertaining to value text
     * @param {geotoolkit.attributes.TextStyle} [props.value.textstyle] Text style to apply to value
     * @param {string | geotoolkit.util.RgbaColor} [props.value.color] Color of text to apply to value (will override textstyle color)
     * @param {string} [props.value.font] Font to apply to value (will override textstyle font)
     * @param {string | geotoolkit.gauges.layout.Regions} [props.value.position] Position where to render the value
     * @param {string} [props.value.formatter] Name of the formatter function to apply to value
     * @param {geotoolkit.gauges.ValueDisplayStrategies} [props.value.displaystrategy] Display strategy type
     * @param {geotoolkit.util.AnchorType} [props.value.alignment] Alignment of the value shape in its container region
     * @param {string} [props.units] Units to display by value text (will be styled same as value)
     * @returns {geotoolkit.gauges.TrafficGauge}
     */
    geotoolkit.gauges.TrafficGauge.prototype.setOptions = function(props){};
    /**
     * Returns all options set on this gauge
     * @returns {object} props JSON with properties
     * @returns {geotoolkit.util.Orientation} props.orientation Orientation of the gauge (horizontal or vertical)
     * @returns {object | Array.<object>} props.trafficlights An array with properties of each traffic light or an object with a single light
     * @returns {string | geotoolkit.attributes.LineStyle} props.trafficlights.name Name of the light, all the operations on this light will be referenced by this name
     * @returns {string | geotoolkit.attributes.LineStyle} props.trafficlights.linestyle Line style of the light shape
     * @returns {string | geotoolkit.attributes.FillStyle} props.trafficlights.activefill Fill style applied to this light when the value of the gauge falls within its range
     * @returns {string | geotoolkit.attributes.FillStyle} props.trafficlights.inactivefill Fill style applied to this light when the value of the gauge falls out of its range
     * @returns {string | function} props.trafficlights.painter Painter used to draw the light shape
     * @returns {boolean} props.trafficlights.preserveaspectratio A flag defining if the shape should have equal width and height regardless of its container dimensions
     * @returns {string | number} props.trafficlights.padding Padding inside the container of this light in CSS notation. This will be applied to all the sides.
     * @returns {string | number} props.trafficlights.padding-left Left padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @returns {string | number} props.trafficlights.padding-right Right padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @returns {string | number} props.trafficlights.padding-top Top padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @returns {string | number} props.trafficlights.padding-bottom Bottom padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @returns {number} props.trafficlights.low Lower bound of the range in which this light is active
     * @returns {number} props.trafficlights.high Higher bound of the range in which this light is active
     * @returns {object} props.name JSON with Properties pertaining to name text
     * @returns {geotoolkit.attributes.TextStyle} props.name.textstyle Text style to apply to name
     * @returns {string | geotoolkit.util.RgbaColor} props.name.color Color of text to apply to name (will override textstyle color)
     * @returns {string} props.name.font Font to apply to name (will override textstyle font)
     * @returns {string | geotoolkit.gauges.layout.Regions} props.name.position Position where to render the name
     * @returns {string | geotoolkit.gauges.ValueDisplayStrategies} props.name.displaystrategy Display strategy type
     * @returns {string | geotoolkit.util.AnchorType} props.name.alignment Alignment of the value shape in its container region
     * @returns {string} props.name.name Name of the gauge
     * @returns {object} props.value Object with properties pertaining to value text
     * @returns {geotoolkit.attributes.TextStyle} props.value.textstyle Text style to apply to value
     * @returns {string | geotoolkit.util.RgbaColor} props.value.color Color of text to apply to value (will override textstyle color)
     * @returns {string} props.value.font Font to apply to value (will override textstyle font)
     * @returns {string | geotoolkit.gauges.layout.Regions} props.value.position Position where to render the value
     * @returns {string} props.value.formatter Name of the formatter function to apply to value
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} props.value.displaystrategy Display strategy type
     * @returns {geotoolkit.util.AnchorType} props.value.alignment Alignment of the value shape in its container region
     * @returns {string} props.units Units to display by value text (will be styled same as value)
     */
    geotoolkit.gauges.TrafficGauge.prototype.getOptions = function(){};
    /**
     * Sets properties pertaining to this object. Used for serialization, to get properties please use getOptions
     * @returns {object} props JSON with properties
     * @returns {geotoolkit.util.Orientation} props.orientation Orientation of the gauge (horizontal or vertical)
     * @returns {object | Array.<object>} props.trafficlights An array with properties of each traffic light or an object with a single light
     * @returns {string | geotoolkit.attributes.LineStyle} props.trafficlights.name Name of the light, all the operations on this light will be referenced by this name
     * @returns {string | geotoolkit.attributes.LineStyle} props.trafficlights.linestyle Line style of the light shape
     * @returns {string | geotoolkit.attributes.FillStyle} props.trafficlights.activefill Fill style applied to this light when the value of the gauge falls within its range
     * @returns {string | geotoolkit.attributes.FillStyle} props.trafficlights.inactivefill Fill style applied to this light when the value of the gauge falls out of its range
     * @returns {string | function} props.trafficlights.painter Painter used to draw the light shape
     * @returns {boolean} props.trafficlights.preserveaspectratio A flag defining if the shape should have equal width and height regardless of its container dimensions
     * @returns {string | number} props.trafficlights.padding Padding inside the container of this light in CSS notation. This will be applied to all the sides.
     * @returns {string | number} props.trafficlights.padding-left Left padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @returns {string | number} props.trafficlights.padding-right Right padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @returns {string | number} props.trafficlights.padding-top Top padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @returns {string | number} props.trafficlights.padding-bottom Bottom padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @returns {number} props.trafficlights.low Lower bound of the range in which this light is active
     * @returns {number} props.trafficlights.high Higher bound of the range in which this light is active
     * @returns {object} props.name JSON with Properties pertaining to name text
     * @returns {geotoolkit.attributes.TextStyle} props.name.textstyle Text style to apply to name
     * @returns {string | geotoolkit.util.RgbaColor} props.name.color Color of text to apply to name (will override textstyle color)
     * @returns {string} props.name.font Font to apply to name (will override textstyle font)
     * @returns {string | geotoolkit.gauges.layout.Regions} props.name.position Position where to render the name
     * @returns {string | geotoolkit.gauges.ValueDisplayStrategies} props.name.displaystrategy Display strategy type
     * @returns {string | geotoolkit.util.AnchorType} props.name.alignment Alignment of the value shape in its container region
     * @returns {string} props.name.name Name of the gauge
     * @returns {object} props.value Object with properties pertaining to value text
     * @returns {geotoolkit.attributes.TextStyle} props.value.textstyle Text style to apply to value
     * @returns {string | geotoolkit.util.RgbaColor} props.value.color Color of text to apply to value (will override textstyle color)
     * @returns {string} props.value.font Font to apply to value (will override textstyle font)
     * @returns {string | geotoolkit.gauges.layout.Regions} props.value.position Position where to render the value
     * @returns {string} props.value.formatter Name of the formatter function to apply to value
     * @returns {geotoolkit.gauges.ValueDisplayStrategies} props.value.displaystrategy Display strategy type
     * @returns {geotoolkit.util.AnchorType} props.value.alignment Alignment of the value shape in its container region
     * @returns {string} props.units Units to display by value text (will be styled same as value)
     */
    geotoolkit.gauges.TrafficGauge.prototype.getProperties = function(){};
    /**
     * Adds a traffic light or an array of traffic lights to the
     * @param {object | Array.<object>} lights Object with properties of the light or array with such objects
     * @param {string | geotoolkit.attributes.LineStyle} [lights.name] Name of the light, all the operations on this light will be referenced by this name
     * @param {string | geotoolkit.attributes.LineStyle} [lights.linestyle] Line style of the light shape
     * @param {string | geotoolkit.attributes.FillStyle} [lights.activefill=lightgrey] Fill style applied to this light when the value of the gauge falls within its range
     * @param {string | geotoolkit.attributes.FillStyle} [lights.inactivefill=lightgrey] Fill style applied to this light when the value of the gauge falls out of its range
     * @param {string | function} [lights.painter=geotoolkit.scene.shapes.painters.CirclePainter] Painter used to draw the light shape
     * @param {boolean} [lights.preserveaspectratio=true] A flag defining if the shape should have equal width and height regardless of its container dimensions
     * @param {string | number} [lights.padding=0] Padding inside the container of this light in CSS notation. This will be applied to all the sides.
     * @param {string | number} [lights.padding-left=0] Left padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {string | number} [lights.padding-right=0] Right padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {string | number} [lights.padding-top=0] Top padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {string | number} [lights.padding-bottom=0] Bottom padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {number} [lights.low=0] Lower bound of the range in which this light is active
     * @param {number} [lights.high=0] Higher bound of the range in which this light is active
     * @param {string} [name] Name of the light, used to reference this light in the future
     * @returns {geotoolkit.gauges.TrafficGauge}
     */
    geotoolkit.gauges.TrafficGauge.prototype.addTrafficLights = function(lights, name){};
    /**
     * Sets properties pertaining to a specific light in the traffic gauge. The properties will be applies to the light with
     * provided name, or to none.
     * @param {Array.<object> | object | string} name Name of the light, all the operations on this light will be referenced by this name,
     * array with light properties, or object with light properties containing name inside
     * @param {object} [props] JSON with properties
     * @param {string} [props.name] Name of the light, all the operations on this light will be referenced by this name
     * @param {string | geotoolkit.attributes.LineStyle} [props.linestyle] Line style of the light shape
     * @param {string | geotoolkit.attributes.FillStyle} [props.activefill] Fill style applied to this light when the value of the gauge falls within its range
     * @param {string | geotoolkit.attributes.FillStyle} [props.inactivefill] Fill style applied to this light when the value of the gauge falls out of its range
     * @param {string | function} [props.painter] Painter used to draw the light shape
     * @param {boolean} [props.preserveaspectratio] A flag defining if the shape should have equal width and height regardless of its container dimensions
     * @param {string | number} [props.padding] Padding inside the container of this light in CSS notation. This will be applied to all the sides.
     * @param {string | number} [props.padding-left] Left padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {string | number} [props.padding-right] Right padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {string | number} [props.padding-top] Top padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {string | number} [props.padding-bottom] Bottom padding inside the container of this light in CSS notation. This parameter overrides props.padding
     * @param {number} [props.low] Lower bound of the range in which this light is active
     * @param {number} [props.high] Higher bound of the range in which this light is active
     * @returns {geotoolkit.gauges.TrafficGauge}
     */
    geotoolkit.gauges.TrafficGauge.prototype.setTrafficLightProperties = function(name, props){};
    /**
     * Gets an array with JSON properties of all registered traffic lights
     * @returns {Array.<object>} obj Array of properties
     */
    geotoolkit.gauges.TrafficGauge.prototype.getTrafficLightsProperties = function(){};
    /**
     * Updates the state of the gauge
     */
    geotoolkit.gauges.TrafficGauge.prototype.update = function(){};
    /**
     * Updates the value of gauge, this will trigger the update of every dynamic component and
     * fire 'gaugeValueUpdated' event
     * @param {number} value New value to set
     * @returns {geotoolkit.gauges.TrafficGauge}
     */
    geotoolkit.gauges.TrafficGauge.prototype.setValue = function(value){};
    /**
     * Returnt current value of the traffic gauge
     * @returns {number}
     */
    geotoolkit.gauges.TrafficGauge.prototype.getValue = function(){};

/**
 * Implements a class which defines a linear gauge. Linear gauge is a rectangular shape (possibly
 * with round corners), which represents a range of data. If horizontal - range is represented from left to right,
 * if vertical, range is represented from bottom to top (always from min to max). The linear gauge supports adding
 * one axis which can be placed on either sides of the main shape, or in the center. A indicator fill and a needle
 * are the tools which are used to visualize the current value of the gauge. Fill is filling the gauge shape
 * from min to the current value on the axis. Needle positions itself on the current value on top of the indicator shape.
 * @class geotoolkit.gauges.LinearGauge
 * @augments geotoolkit.gauges.NumericGauge
 * @param {object} params JSON with properties

 * @param {geotoolkit.util.Range} [params.range] Range displayed by this gauge
 * @param {string | geotoolkit.util.Orientation} [params.orientation='vertical'] Orientation of the gauge
 * @param {geotoolkit.gauges.axis.Region | Array.<geotoolkit.gauges.axis.Region>} [params.regions] Regions to display in the indicator
 * @param {Array.<object>} [params.axes] Array with axes and properties

 * @param {object} [params.indicator] Properties pertaining to indicator and its fill
 * @param {number | string} [params.indicator.width] Width of the indicator in CSS format, relative to the gauge width
 * @param {number | string} [params.indicator.height] Height of the indicator in CSS format, relative to the gauge height
 * @param {geotoolkit.attributes.FillStyle} [params.indicator.backgroundfill] Fill style of the background of indicator
 * @param {geotoolkit.attributes.LineStyle} [params.indicator.backgroundline] Line style of the background of indicator
 * @param {geotoolkit.attributes.FillStyle} [params.indicator.valuefillstyle] Fill style of the value fill in the indicator
 * @param {geotoolkit.attributes.LineStyle} [params.indicator.valuelinestyle] Line style of the value fill in the indicator
 * @param {number | string} [params.indicator.cornerradius] Corner radius of the indicator shape in CSS notation, relative to the width of the shape.
 * (50% will create a circle)
 * @param {geotoolkit.gauges.AbstractGauge.DynamicElementPosition | string} [params.indicator.fillposition] Layer position of the fill

 * @param {object} [params.needle] JSON with needle properties
 * @param {geotoolkit.scene.Node} [params.needle.geometry] Geometry defining the needle
 * @param {number | string} [params.needle.width] Width of the needle relative to the width of the gauge indicator (height if horizontal)

 */
geotoolkit.gauges.LinearGauge = {};
    /**
     * Positions of axis relative to the indicator
     * @enum
     * @readonly
     */
    geotoolkit.gauges.LinearGauge.AxisPosition = {};
        /**
         * Position to the left of indicator
         * @type {string}
         */
        geotoolkit.gauges.LinearGauge.AxisPosition.Left = "";
        /**
         * Position to the right of indicator
         * @type {string}
         */
        geotoolkit.gauges.LinearGauge.AxisPosition.Right = "";
        /**
         * Position to the top of indicator
         * @type {string}
         */
        geotoolkit.gauges.LinearGauge.AxisPosition.Top = "";
        /**
         * Position to the bottom of indicator
         * @type {string}
         */
        geotoolkit.gauges.LinearGauge.AxisPosition.Bottom = "";
    /**
     * Copy constructor function
     * Used to clone gauge
     * @protected
     * @param {geotoolkit.gauges.LinearGauge} gauge source gauge
     * @returns {geotoolkit.gauges.LinearGauge}
     */
    geotoolkit.gauges.LinearGauge.prototype.copyConstructor = function(gauge){};
    /**
     * Gets an axis by its name or index from axes iterator
     * @param {string | number} name Name of the axis or its index
     * @returns {geotoolkit.gauges.axis.Axis}
     */
    geotoolkit.gauges.LinearGauge.prototype.getAxis = function(name){};
    /**
     * Removes an axis from the gauge. If no such gauge exists, nothing will be done.
     * @param {string | number} name Name of the axis or its index
     * @returns {geotoolkit.gauges.LinearGauge}
     */
    geotoolkit.gauges.LinearGauge.prototype.removeAxis = function(name){};
    /**
     * Returns an iterator over existing axes in this gauge
     * @param {function()} [filter] a filter function. Returns all axes if null
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.gauges.LinearGauge.prototype.getAxes = function(filter){};
    /**
     * Adds an axis to the gauge
     * @param {string} name Name of the new axis
     * @param {geotoolkit.axis.Axis|geotoolkit.scene.Group|object} axis New axis to add
     * @param {object} [props] JSON with axis properties
     * @param {boolean} [props.visible] visibility
     * @param {geotoolkit.gauges.LinearGauge.AxisPosition} [props.position] Position relative to indicator
     * @param {string | number} [props.width] Css width
     * @param {string | number} [props.gap] Gap between the axis and the indicator or othes axes
     * @returns {geotoolkit.gauges.LinearGauge}
     */
    geotoolkit.gauges.LinearGauge.prototype.addAxis = function(name, axis, props){};
    /**
     * Sets properties pertaining to axis of the gauge
     * @param {string} [name] Name of the axis to apply properties. Name can also be passed inside props JSON.
     * If null properties will be applied to all axes.
     * @param {object} props JSON with properties
     * @param {geotoolkit.gauges.LinearGauge.AxisPosition} [props.position] Position of the axis relative to indicator shape
     * @param {number | string} [props.width] Width of the axis (height if horizontal) in CSS format
     * @param {number | string} [props.gap] Gap between axis and indicator shape in CSS format
     * @param {boolean} [props.visible] Visibility of the axis
     * @returns {geotoolkit.gauges.LinearGauge} this
     */
    geotoolkit.gauges.LinearGauge.prototype.setAxisProperties = function(name, props){};
    /**
     * Gets properties pertaining to axis of the gauge
     * @param {string} [name] Name of the axis to get properties.
     * If null, properties will be retrieved from all axes
     * @returns {object} JSON with properties, empty if no axis of name 'name' exists
     */
    geotoolkit.gauges.LinearGauge.prototype.getAxisProperties = function(name){};
    /**
     * Checks if the gauge contains specified axis
     * @param {geotoolkit.gauges.axis.Axis | string} axis The axis or its name
     * @returns {boolean}
     */
    geotoolkit.gauges.LinearGauge.prototype.hasAxis = function(axis){};
    /**
     * Adds a region, or an array of regions to the gauge. Regions of indicator are indexed by the name
     * that you provide. if no such name has been passed into the method, it will be impossible to do
     * any further manipulations with this region.
     * @param {string | geotoolkit.gauges.axis.Region} name Name of the region to add or a region which has the name set to it
     * @param {geotoolkit.gauges.axis.Region | Array.<geotoolkit.gauges.axis.Region>} [region] Region(s) to add
     */
    geotoolkit.gauges.LinearGauge.prototype.addIndicatorRegion = function(name, region){};
    /**
     * Removes an earlier added region from the indicator
     * @param {string | geotoolkit.gauges.axis.Region} name region name or region
     */
    geotoolkit.gauges.LinearGauge.prototype.removeIndicatorRegion = function(name){};
    /**
     * Removes all the regions from the scene
     * @returns {geotoolkit.gauges.LinearGauge}
     */
    geotoolkit.gauges.LinearGauge.prototype.clearRegions = function(){};
    /**
     * Sets options pertaining to linear gauge and its components
     * @param {object} props JSON with properties
     * @param {object} [props.axis] JSON with axis properties
     * @param {geotoolkit.attributes.LineStyle} [props.axis.linestyle] Line style of the baseline
     * @param {geotoolkit.axis.TickGenerator} [props.axis.tickgenerator] Tick generator for the axis
     * @param {string | geotoolkit.gauges.LinearGauge.AxisPosition} [props.axis.position] Position of the axis relative to the indicator
     * @param {number|string} [props.axis.width] Width of the axis in CSS notation, relative to the width of the gauge
     * @param {number|string} [props.axis.gap] Gap between the indicator and the axis in CSS format
     * @param {string | geotoolkit.axis.TickInfo.TickPosition} [props.axis.tickposition] Position of the ticks on the axis
     * @param {boolean} [props.axis.visible] Visibility flag for the axis
     * @param {object} [props.indicator] Properties pertaining to indicator and its fill
     * @param {number | string} [props.indicator.width] Width of the indicator in CSS format, relative to the gauge width
     * @param {number | string} [props.indicator.height] Height of the indicator in CSS format, relative to the gauge height
     * @param {geotoolkit.attributes.FillStyle} [props.indicator.backgroundfill] Fill style of the background of indicator
     * @param {geotoolkit.attributes.LineStyle} [props.indicator.backgroundline] Line style of the background of indicator
     * @param {geotoolkit.attributes.FillStyle} [props.indicator.valuefillstyle] Fill style of the value fill in the indicator
     * @param {geotoolkit.attributes.LineStyle} [props.indicator.valuelinestyle] Line style of the value fill in the indicator
     * @param {number | string} [props.indicator.cornerradius] Corner radius of the indicator shape in CSS notation, relative to the width of the shape.
     * (50% will create a circle)
     * @param {geotoolkit.gauges.AbstractGauge.DynamicElementPosition | string} [props.indicator.fillposition] Layer position of the fill
     * @param {object} [props.needle] JSON with needle properties
     * @param {geotoolkit.scene.Node} [props.needle.geometry] Geometry defining the needle
     * @param {number | string} [props.needle.width] Width of the needle relative to the width of the gauge indicator (height if horizontal)
     * @param {geotoolkit.util.Range} [props.range] Range displayed by this gauge
     * @param {geotoolkit.util.Orientation} [props.orientation] Orientation of the gauge
     * @param {geotoolkit.gauges.axis.Region | Array.<geotoolkit.gauges.axis.Region>} [props.regions] Regions to display in the indicator
     * @returns {geotoolkit.gauges.LinearGauge}
     */
    geotoolkit.gauges.LinearGauge.prototype.setOptions = function(props){};
    /**
     * Gets options set on this Gauge
     * @returns {object} props JSON with properties
     * @returns {object} [props.axis] JSON with axis properties
     * @returns {geotoolkit.attributes.LineStyle} [props.axis.linestyle] Line style of the baseline
     * @returns {geotoolkit.axis.TickGenerator} [props.axis.tickgenerator] Tick generator of the axis
     * @returns {string | geotoolkit.gauges.LinearGauge.AxisPosition} [props.axis.position] Position of the axis relative to the indicator
     * @returns {number|string} [props.axis.width] Width of the axis in CSS notation, relative to the width of the gauge
     * @returns {number|string} [props.axis.gap] Gap between the indicator and the axis in CSS format
     * @returns {string | geotoolkit.axis.TickInfo.TickPosition} [props.axis.tickposition] Position of the ticks on the axis
     * @returns {boolean} [props.axis.visible] Visibility flag for the axis
     * @returns {object} [props.indicator] Properties pertaining to indicator and its fill
     * @returns {number | string} [props.indicator.width] Width of the indicator in CSS format, relative to the gauge width
     * @returns {number | string} [props.indicator.height] Height of the indicator in CSS format, relative to the gauge height
     * @returns {geotoolkit.attributes.FillStyle} [props.indicator.backgroundfill] Fill style of the background of indicator
     * @returns {geotoolkit.attributes.LineStyle} [props.indicator.backgroundline] Line style of the background of indicator
     * @returns {geotoolkit.attributes.FillStyle} [props.indicator.valuefillstyle] Fill style of the value fill in the indicator
     * @returns {geotoolkit.attributes.LineStyle} [props.indicator.valuelinestyle] Line style of the value fill in the indicator
     * @returns {number | string} [props.indicator.cornerradius] Corner radius of the indicator shape in CSS notation.
     * @returns {geotoolkit.gauges.AbstractGauge.DynamicElementPosition | string} [props.indicator.fillposition] Layer position of the fill
     * @returns {object} [props.needle] JSON with needle properties
     * @returns {geotoolkit.scene.Node} [props.needle.geometry] Geometry defining the needle
     * @returns {number | string} [props.needle.width] Width of the needle relative to the width of the gauge indicator (height if horizontal)
     * @returns {geotoolkit.util.Range} [props.range] Range displayed by this gauge
     * @returns {geotoolkit.util.Orientation} [props.orientation] Orientation of the gauge
     * @returns {geotoolkit.gauges.axis.Region | Array.<geotoolkit.gauges.axis.Region>} [props.regions] Regions displayed in the indicator
     */
    geotoolkit.gauges.LinearGauge.prototype.getOptions = function(){};
    /**
     * Sets properties pertaining to linear gauge and its components. Used for serialization - to customize
     * the gauge use setOptions instead.
     * @param {object} props JSON with properties
     * @param {object} [props.axis] JSON with axis properties see {@link geotoolkit.gauges.LinearGauge#setAxisProperties}
     * @param {object} [props.indicator] Properties pertaining to indicator and its fill see {@link geotoolkit.gauges.LinearGauge#setIndicatorProperties}
     * @param {object} [props.needle] JSON with needle properties see {@link geotoolkit.gauges.LinearGauge#setNeedleProperties}
     * @param {geotoolkit.util.Range} [props.range] Range displayed by this gauge
     * @param {geotoolkit.gauges.axis.Region | Array.<geotoolkit.gauges.axis.Region>} [props.regions] Regions to display in the indicator
     * @returns {geotoolkit.gauges.LinearGauge}
     */
    geotoolkit.gauges.LinearGauge.prototype.setProperties = function(props){};
    /**
     * Gets properties pertaining to Linear Gauge
     * @returns {object} props JSON with properties
     * @returns {object} [props.axis] JSON with axis properties
     * @returns {geotoolkit.attributes.LineStyle} [props.axis.linestyle] Line style of the baseline
     * @returns {geotoolkit.axis.TickGenerator} [props.axis.tickgenerator] Tick generator of the axis
     * @returns {string | geotoolkit.gauges.LinearGauge.AxisPosition} [props.axis.position] Position of the axis relative to the indicator
     * @returns {number|string} [props.axis.width] Width of the axis in CSS notation, relative to the width of the gauge
     * @returns {number|string} [props.axis.gap] Gap between the indicator and the axis in CSS format
     * @returns {string | geotoolkit.axis.TickInfo.TickPosition} [props.axis.tickposition] Position of the ticks on the axis
     * @returns {boolean} [props.axis.visible] Visibility flag for the axis
     * @returns {object} [props.indicator] Properties pertaining to indicator and its fill
     * @returns {number | string} [props.indicator.width] Width of the indicator in CSS format, relative to the gauge width
     * @returns {number | string} [props.indicator.height] Height of the indicator in CSS format, relative to the gauge height
     * @returns {geotoolkit.attributes.FillStyle} [props.indicator.backgroundfill] Fill style of the background of indicator
     * @returns {geotoolkit.attributes.LineStyle} [props.indicator.backgroundline] Line style of the background of indicator
     * @returns {geotoolkit.attributes.FillStyle} [props.indicator.valuefillstyle] Fill style of the value fill in the indicator
     * @returns {geotoolkit.attributes.LineStyle} [props.indicator.valuelinestyle] Line style of the value fill in the indicator
     * @returns {number | string} [props.indicator.cornerradius] Corner radius of the indicator shape in CSS notation.
     * @returns {geotoolkit.gauges.AbstractGauge.DynamicElementPosition | string} [props.indicator.fillposition] Layer position of the fill
     * @returns {object} [props.needle] JSON with needle properties
     * @returns {geotoolkit.scene.Node} [props.needle.geometry] Geometry defining the needle
     * @returns {number | string} [props.needle.width] Width of the needle relative to the width of the gauge indicator (height if horizontal)
     * @returns {geotoolkit.util.Range} [props.range] Range displayed by this gauge
     * @returns {geotoolkit.util.Orientation} [props.orientation] Orientation of the gauge
     * @returns {geotoolkit.gauges.axis.Region | Array.<geotoolkit.gauges.axis.Region>} [props.regions] Regions displayed in the indicator
     */
    geotoolkit.gauges.LinearGauge.prototype.getProperties = function(){};
    /**
     * Sets properties pertaining to needle shape of the gauge
     * @param {object} props JSON with properties
     * @param {number | string} [props.width] Width of needle in CSS format (height if gauge is horizontal)
     * @param {geotoolkit.scene.Group} [props.geometry] A group containing the geometry of the needle
     * @returns {geotoolkit.gauges.LinearGauge}
     */
    geotoolkit.gauges.LinearGauge.prototype.setNeedleProperties = function(props){};
    /**
     * Returns properties pertaining to needle shape of the gauge
     * @returns {object} props JSON with properties
     * @returns {number | string} [props.width] Width of needle in CSS format (height if gauge is horizontal)
     * @returns {geotoolkit.scene.Group} [props.geometry] A group containing the geometry of the needle
     */
    geotoolkit.gauges.LinearGauge.prototype.getNeedleProperties = function(){};
    /**
     * Gets properties pertaining to indicator shape and value fill shape
     * @returns {object} props JSON with Properties pertaining to indicator and its fill
     * @returns {number | string} props.indicator.width Width of the indicator in CSS format, relative to the gauge width
     * @returns {number | string} props.indicator.height Height of the indicator in CSS format, relative to the gauge height
     * @returns {geotoolkit.attributes.FillStyle} props.indicator.backgroundfill Fill style of the background of indicator
     * @returns {geotoolkit.attributes.LineStyle} props.indicator.backgroundline Line style of the background of indicator
     * @returns {geotoolkit.attributes.FillStyle} props.indicator.valuefillstyle Fill style of the value fill in the indicator
     * @returns {geotoolkit.attributes.LineStyle} props.indicator.valuelinestyle Line style of the value fill in the indicator
     * @returns {number | string} props.indicator.cornerradius Corner radius of the indicator shape in CSS notation, relative to the width of the shape.
     * (50% will create a circle)
     * @returns {geotoolkit.gauges.AbstractGauge.DynamicElementPosition | string} props.indicator.fillposition Layer position of the fill
     */
    geotoolkit.gauges.LinearGauge.prototype.getIndicatorProperties = function(){};
    /**
     * Sets current value of the gauge
     * @param {number} val New value for the gauge
     * @param {boolean} [skipAnimation] Specifies if animation should be avoided
     * @returns {geotoolkit.gauges.LinearGauge} this
     */
    geotoolkit.gauges.LinearGauge.prototype.setValue = function(val, skipAnimation){};
    /**
     * Returns range displayed by this range
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.gauges.LinearGauge.prototype.getRange = function(){};
    /**
     * Returns range displayed by this range
     * @param {number | geotoolkit.util.Range} min Lower bounds of the range or the range to set
     * @param {number} [max] Higher bound of the range
     * @returns {geotoolkit.gauges.LinearGauge}
     */
    geotoolkit.gauges.LinearGauge.prototype.setRange = function(min, max){};
    /**
     * Returns orientation of the gauge.
     * @returns {geotoolkit.util.Orientation}
     */
    geotoolkit.gauges.LinearGauge.prototype.getOrientation = function(){};
    /**
     * Sets the needle for the axis
     * @param {object} params JSON with needle properties
     * @returns {geotoolkit.gauges.LinearGauge} this
     */
    geotoolkit.gauges.LinearGauge.prototype.setNeedle = function(params){};
    /**
     * Enumerate children nodes
     * @param {function(node, target)} callback callback
     * @param {object} [target] target
     */
    geotoolkit.gauges.LinearGauge.prototype.enumerateNodes = function(callback, target){};

/**
 * Abstract class for gauge factories.
 * @class geotoolkit.gauges.AbstractFactory
 * @param {object} [params] Object with properties
 * @param {string} [params.name] Name of the specific instance of the gauge
 * @param {string} [params.type] The type of the gauge which will be created by this factory
 */
geotoolkit.gauges.AbstractFactory = {};
    /**
     * Returns a gauge ready for use
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     * @function
     * @abstract
     */
    geotoolkit.gauges.AbstractFactory.prototype.createGauge = function(params){};
    /**
     * Gets the name of this implementation
     * @returns {?string}
     */
    geotoolkit.gauges.AbstractFactory.prototype.getName = function(){};
    /**
     * Gets the type of the gauge which this factory implements
     * @returns {?string}
     */
    geotoolkit.gauges.AbstractFactory.prototype.getGaugeType = function(){};
    /**
     * Returns properties pertaining to the gauge implemented by this factory
     * @returns {object}
     * @function
     * @abstract
     */
    geotoolkit.gauges.AbstractFactory.prototype.getGaugeProperties = function(){};

/**
 * Implements a simple circular gauge with adaptive ticks located inside. Axis is a thick line
 * with major, edge, and minor ticks. A classic needle is added to the gauge as well.
 * @class geotoolkit.gauges.defaults.ClassicCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.ClassicCircular = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.ClassicCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.ClassicCircular.prototype.createGauge = function(params){};

/**
 * Implements a circular gauge with three axis (displaying three different data sets). There are
 * one large, one medium, and one small axis, called 'large', 'medium', and 'small' respectively.
 * The name of the gauge is displayed in a circle in center, value for each axis is displayed in
 * the cut of that axis.
 * @class geotoolkit.gauges.defaults.ThreeBandCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.ThreeBandCircular = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.ThreeBandCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.ThreeBandCircular.prototype.createGauge = function(params){};

/**
 * Implements a factory which creates a gauge with two axes. One axis is slightly smaller than another
 * and is called 'inneraxis' and the bigger one is called 'outeraxis'. Two marker style needles are
 * also being added here, one pointins at the outside border of the outer axis and the other one points
 * at the inner border of the inner axis. Values are displayed inside the circle.
 * @class geotoolkit.gauges.defaults.DoubleAxisCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.DoubleAxisCircular = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.DoubleAxisCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties.
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.DoubleAxisCircular.prototype.createGauge = function(params){};

/**
 * Implements a circular gauge with one axis and a shadow moving on the outer side of that axis.
 * Value is displayed in the center and the shadow acts as visualization.
 * @class geotoolkit.gauges.defaults.ArcIndicatorCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.ArcIndicatorCircular = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.ArcIndicatorCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.ArcIndicatorCircular.prototype.createGauge = function(params){};

/**
 * Implements a circular gauge with one axis where ticks are just hollow spaces which makes the gauge
 * axis look segmented
 * Value is displayed in the center and the shadow acts as visualization.
 * @class geotoolkit.gauges.defaults.SegmentedBandCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.SegmentedBandCircular = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.SegmentedBandCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.SegmentedBandCircular.prototype.createGauge = function(params){};

/**
 * Implements a circular gauge with a needle most parth of which is covered by a big circle which
 * has value displayed on it.
 * axis look segmented
 * Value is displayed in the center and the shadow acts as visualization.
 * @class geotoolkit.gauges.defaults.CoveredNeedleCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.CoveredNeedleCircular = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.CoveredNeedleCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.CoveredNeedleCircular.prototype.createGauge = function(params){};

/**
 * Defines a class which contains default easing functions to apply to animation
 * @deprecated since 2.6 use geotoolkit.animation.Easing instead
 * @class geotoolkit.gauges.defaults.EasingFunctions
 */
geotoolkit.gauges.defaults.EasingFunctions = {};

/**
 * Implements a circular gauge without a needle which displays value by filling the grey circle with
 * light blue value fill which has round line tips. Value is displayed in the center and the shadow acts as visualization.
 * @class geotoolkit.gauges.defaults.ModernCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.ModernCircular = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.ModernCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.ModernCircular.prototype.createGauge = function(params){};

/**
 * Implements a horizontal traffic gauge with three lights, green, yellow, and red. When a light is not active,
 * it is light grey.
 * @class geotoolkit.gauges.defaults.HorizontalTraffic
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.HorizontalTraffic = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.HorizontalTraffic.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Traffic Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.HorizontalTraffic.prototype.createGauge = function(params){};

/**
 * Implements a vertical traffic gauge with three lights, green, yellow, and red. When a light is not active,
 * it is light grey.
 * @class geotoolkit.gauges.defaults.VerticalTraffic
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.VerticalTraffic = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.VerticalTraffic.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Traffic Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.VerticalTraffic.prototype.createGauge = function(params){};

/**
 * Implements a linear gauge (with horizontal scale) . The fill indicator shows the range of data and the main axis shows the ticks
 * @class geotoolkit.gauges.defaults.HorizontalBoxFillGauge
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.HorizontalBoxFillGauge = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.HorizontalBoxFillGauge.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Linear Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overridden properties
     */
    geotoolkit.gauges.defaults.HorizontalBoxFillGauge.prototype.createGauge = function(params){};

/**
 * Implements a linear gauge (with Vertical scale) . The fill indicator shows the range of data and the main axis shows the ticks
 * @class geotoolkit.gauges.defaults.VerticalBoxFillGauge
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.VerticalBoxFillGauge = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.VerticalBoxFillGauge.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Linear Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.VerticalBoxFillGauge.prototype.createGauge = function(params){};

/** Implements a circular gauge with 3 axes, 'outeraxis' and 'inneraxis' which render a set of ticks along a range of values.<br>
 * 'middleaxis' renders an inner color fill between 'axisouter' and 'axisinner'. Ranges can be differentiated by specifying unique color fills.
 * @class geotoolkit.gauges.defaults.Pressure
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.Pressure = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.Pressure.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.Pressure.prototype.createGauge = function(params){};

/**
 * Implements a linear gauge (with vertical scale) . The fill is the indicator and shows the range of data, the value is displayed outside the gauge at the top. <br>
 * It provides a left axis and right axis. It has a custom component which shows the status text based on the range of the value.
 * @class geotoolkit.gauges.defaults.AnnotatedFillGauge
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.AnnotatedFillGauge = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.AnnotatedFillGauge.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use . It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Linear gauges tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.AnnotatedFillGauge.prototype.createGauge = function(params){};

/**
 * Implements a simple circular gauge with adaptive ticks located inside. Axis is a thick line
 * with major, edge, and minor ticks. A classic needle is added to the gauge as well.
 * @class geotoolkit.gauges.defaults.HalfCircularSimple
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.HalfCircularSimple = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.HalfCircularSimple.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Half-Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.HalfCircularSimple.prototype.createGauge = function(params){};

/**
 * Implements a horizontally-aligned numeric gauge.
 * @class geotoolkit.gauges.defaults.HorizontalNumeric
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.HorizontalNumeric = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.HorizontalNumeric.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Numeric Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overridden properties
     */
    geotoolkit.gauges.defaults.HorizontalNumeric.prototype.createGauge = function(params){};

/**
 * Implements a linear gauge (with vertical scale) . The fill shows the range of data and the value is displayed in the center of the gauge.
 * @class geotoolkit.gauges.defaults.EllipseFillGauge
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.EllipseFillGauge = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.EllipseFillGauge.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Linear Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.EllipseFillGauge.prototype.createGauge = function(params){};

/**
 * Implements a simple numeric gauge. Contains two regions with a descriptor in the north
 * position and a value in the south position. The north region has a blue fill background,
 * the south region has a white fill background
 * @class geotoolkit.gauges.defaults.SimpleNumeric
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.SimpleNumeric = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.SimpleNumeric.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Numeric Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overridden properties
     */
    geotoolkit.gauges.defaults.SimpleNumeric.prototype.createGauge = function(params){};

/**
 * Implements a simple circular gauge with adaptive ticks located inside. Axis is a thick line
 * with major, edge, and minor ticks. A classic needle is added to the gauge as well.
 * @class geotoolkit.gauges.defaults.BandCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.BandCircular = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.BandCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.BandCircular.prototype.createGauge = function(params){};

/**
 * Implements a collection of implemented default gauges to be used with gauge registry
 * @class geotoolkit.gauges.defaults.Defaults
 */
geotoolkit.gauges.defaults.Defaults = {};
    /**
     * Returns an array with instances of standard gauges factories
     * @returns {Array.<geotoolkit.gauges.AbstractFactory>}
     */
    geotoolkit.gauges.defaults.Defaults.getAllDefaults = function(){};

/**
 * Implements a simple half-circular gauge with no ticks. Axis is a thick filled bar with
 * colored regions. Also contains a simple needle
 * @class geotoolkit.gauges.defaults.ZonedHalfCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.ZonedHalfCircular = {};
    /**
     * Return properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.ZonedHalfCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overridden properties
     */
    geotoolkit.gauges.defaults.ZonedHalfCircular.prototype.createGauge = function(params){};

/**
 * Implements a simple half-circular gauge with no ticks. Axis is transparent,
 * uses a thick value fill instead of a needle.
 * @class geotoolkit.gauges.defaults.DoubleFanHalfCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.DoubleFanHalfCircular = {};
    /**
     * Return properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.DoubleFanHalfCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overridden properties
     */
    geotoolkit.gauges.defaults.DoubleFanHalfCircular.prototype.createGauge = function(params){};

/**
 * Implements a horizontally-aligned numeric gauge that features a an icon for displaying value trends
 * @class geotoolkit.gauges.defaults.TrendingNumeric
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.TrendingNumeric = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.TrendingNumeric.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Numeric Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overridden properties
     */
    geotoolkit.gauges.defaults.TrendingNumeric.prototype.createGauge = function(params){};

/**
 * Implements a circular gauge with irregular tick spacing. Some ticks/labels may be hidden
 * due to label collisions.
 * @class geotoolkit.gauges.defaults.UnevenCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.UnevenCircular = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory
     * @returns {object}
     */
    geotoolkit.gauges.defaults.UnevenCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overriden properties
     */
    geotoolkit.gauges.defaults.UnevenCircular.prototype.createGauge = function(params){};

/**
 * Implements a minimal quarter circular gauge with a needle
 * @class geotoolkit.gauges.defaults.SimpleQuarterCircular
 * @augments geotoolkit.gauges.AbstractFactory
 */
geotoolkit.gauges.defaults.SimpleQuarterCircular = {};
    /**
     * Returns properties pertaining to the gauge implemented by this factory. This function is called by CreateGauge() method in this class and is mainly for internal use.
     * @returns {object}
     */
    geotoolkit.gauges.defaults.SimpleQuarterCircular.prototype.getGaugeProperties = function(){};
    /**
     * Returns a gauge ready for use. It is however recommended to use the {@link geotoolkit.gauges.registry.GaugeRegistry} instead of using this method. Circular Gauge tutorial shows how to implement the registry.
     * @param {object} params JSON with overriding properties
     * @returns {geotoolkit.gauges.AbstractGauge} Gauge with applied default and overridden properties
     */
    geotoolkit.gauges.defaults.SimpleQuarterCircular.prototype.createGauge = function(params){};

/**
 * Implements a registry for gauge implementations (factories)
 * @class geotoolkit.gauges.registry.GaugeRegistry
 */
geotoolkit.gauges.registry.GaugeRegistry = {};
    /**
     * Gets an instance of gauge registry
     * @returns {geotoolkit.gauges.registry.GaugeRegistry} registry
     */
    geotoolkit.gauges.registry.GaugeRegistry.getDefaultInstance = function(){};
    /**
     * Registers a factory to the registry, indexing is done by the name
     * @param {string} name Name of factory to register
     * @param {geotoolkit.gauges.AbstractFactory} factory Factory to register
     * @returns {geotoolkit.gauges.registry.GaugeRegistry}
     */
    geotoolkit.gauges.registry.GaugeRegistry.prototype.register = function(name, factory){};
    /**
     * Removes a factory from the registry
     * @param {string} name Name of the factory which has to be removed
     * @returns {geotoolkit.gauges.registry.GaugeRegistry}
     */
    geotoolkit.gauges.registry.GaugeRegistry.prototype.unregister = function(name){};
    /**
     * Removes every factory from the registry
     * @returns {geotoolkit.gauges.registry.GaugeRegistry}
     */
    geotoolkit.gauges.registry.GaugeRegistry.prototype.clear = function(){};
    /**
     * Returns true if a factory with provided name is registered
     * @param {string} name Name of the gauge factory to look for
     * @returns {boolean}
     */
    geotoolkit.gauges.registry.GaugeRegistry.prototype.contains = function(name){};
    /**
     * Returns an instance of a gauge created by the factory which
     * has been registered with provided name. Returns null if no such
     * factory has been registered
     * @param {string} name Name of the registered factory
     * @param {object} properties JSON with properties that have to be overridden
     * @returns {?geotoolkit.gauges.AbstractGauge}
     */
    geotoolkit.gauges.registry.GaugeRegistry.prototype.createGauge = function(name, properties){};
    /**
     * Registers default geotoolkit gauge implementations to the registry
     * @returns {geotoolkit.gauges.registry.GaugeRegistry}
     */
    geotoolkit.gauges.registry.GaugeRegistry.prototype.registerDefaults = function(){};
    /**
     * Gets the type of the gauge returned by one of the factories registered in this registry
     * and referred by the provided name.
     * @param {string} name Name of the default gauge
     * @returns {?string}
     */
    geotoolkit.gauges.registry.GaugeRegistry.prototype.getGaugeType = function(name){};

