/**
 * API to build widgets, which are high level reusable graphics components based on the core Geotoolkit.
 * @namespace */
geotoolkit.widgets = {};

/**
 * API defining dataTable Adapter for tableview widget
 * @namespace */
geotoolkit.widgets.data = {};

/**
 * API for animation for widget
 * @namespace */
geotoolkit.widgets.animation = {};

/** @namespace */
geotoolkit.widgets.animation.effects = {};

/**
 * tools defining inplace editor tools for certain widgets
 * @namespace */
geotoolkit.widgets.tools = {};

/**
 * API defining templates for widgets
 * @namespace */
geotoolkit.widgets.templates = {};

/**
 * API for defining visuals and dataobjects used in timeseries
 * @namespace */
geotoolkit.widgets.timeseries = {};

/**
 * API for defining overlays in widgets
 * @namespace */
geotoolkit.widgets.overlays = {};

/**
 * API for sync operation in widgets
 * @namespace */
geotoolkit.widgets.sync = {};
    /**
     * Synchronizer Events
     * @readonly
     * @enum
     */
    geotoolkit.widgets.sync.Events = {};
        /**
         * Event type fired when a synchronized item is changed
         * @type {string}
         */
        geotoolkit.widgets.sync.Events.ItemChanged = "";
    /**
     * Enum defining synchronization modes
     * @enum
     * @readonly
     */
    geotoolkit.widgets.sync.SyncMode = {};
        /**
         * Synchronize the visible model range
         * @type {string}
         */
        geotoolkit.widgets.sync.SyncMode.VisibleRange = "";
        /**
         * Synchronize the scale factors and position
         * @type {string}
         */
        geotoolkit.widgets.sync.SyncMode.Scale = "";
        /**
         * Custom synchronization
         * @type {string}
         */
        geotoolkit.widgets.sync.SyncMode.Custom = "";

/**
 * Define base class for all synchronization operations.
 * @class geotoolkit.widgets.sync.SyncOperation
 * @param {string} name name of the operations
 */
geotoolkit.widgets.sync.SyncOperation = {};
    /**
     * Return a name of operation
     * @returns {string}
     */
    geotoolkit.widgets.sync.SyncOperation.prototype.getName = function(){};
    /**
     * Connect events to item
     * @param {array.<string>} events events to connect
     * @param {geotoolkit.util.EventDispatcher} item item to connect events
     * @param {function()} listener listener to be connected
     */
    geotoolkit.widgets.sync.SyncOperation.prototype.connect = function(events, item, listener){};
    /**
     * Disconnect events from item
     * @param {array.<string>} events events to disconnect
     * @param {geotoolkit.util.EventDispatcher} item item to disconnect events
     * @param {function()} listener listener to be disconnected
     */
    geotoolkit.widgets.sync.SyncOperation.prototype.disconnect = function(events, item, listener){};
    /**
     * Gets data for the current operation
     * @param {object} item
     * @param {geotoolkit.util.Orientation} direction
     * @param {object} options
     * @returns {object|null}
     */
    geotoolkit.widgets.sync.SyncOperation.prototype.getData = function(item, direction, options){};
    /**
     * Sets data for the current operation
     * @param {object} item
     * @param {object} data
     * @param {geotoolkit.util.Orientation} direction
     * @param {object} options
     */
    geotoolkit.widgets.sync.SyncOperation.prototype.setData = function(item, data, direction, options){};

/**
 * Define a registry for synchronization operations.
 * @class geotoolkit.widgets.sync.SyncOperationRegistry
 */
geotoolkit.widgets.sync.SyncOperationRegistry = {};
    /**
     * Register operation
     * @param {geotoolkit.widgets.sync.SyncOperation} operation operation of synchronization
     * @param {string} [type=undefined] type of the object
     */
    geotoolkit.widgets.sync.SyncOperationRegistry.prototype.registerOperation = function(operation, type){};
    /**
     * Return registered operation
     * @param {string} name name of operation
     * @param {string} [type=undefined] type of object to apply operation
     * @returns {geotoolkit.widgets.sync.SyncOperation}
     */
    geotoolkit.widgets.sync.SyncOperationRegistry.prototype.getOperation = function(name, type){};
    /**
     * Return instance of the registry
     * @returns {geotoolkit.widgets.sync.SyncOperationRegistry} registry
     */
    geotoolkit.widgets.sync.SyncOperationRegistry.getInstance = function(){};

/**
 * Define synchronized space. This class synchronize different nodes.
 * @class geotoolkit.widgets.sync.ViewSynchronizer
 * @augments geotoolkit.util.EventDispatcher
 * @param {object} [options] options of synchronization
 * @param {array.<geotoolkit.widgets.sync.SyncMode>} [options.mode=[]] an array of enabled modes to synchronize
 * @param {geotoolkit.widgets.sync.SyncOperationRegistry} [options.registry] registry of operations
 * all listeners
 * @example How to use custom synchronization
 * var sync = new geotoolkit.widgets.sync.ViewSynchronizer({'mode': [geotoolkit.widgets.sync.SyncMode.Custom]});
 * sync.connect(widget, {
 * 'vertical': true,
 * 'horizontal': true,
 * 'events': [geotoolkit.scene.Node.Events.LocalTransformationChanged]
 * 'custom': {
 * 'getdata' : function (item) {
 * return item.getLocalTransform();
 * },
 * 'setdata': function (tr, item, orientation) {
 * var currTransformation = item.getLocalTransform();
 * var xxModel = currTransformation.getScaleX();
 * var dxModel = currTransformation.getTranslateX();
 * var yyModel = currTransformation.getScaleY();
 * var dyModel = currTransformation.getTranslateY();
 * if (orientation === geotoolkit.util.Orientation.Vertical) {
 * yyModel = tr.getScaleY();
 * dyModel = tr.getTranslateY();
 * } else if (orientation === geotoolkit.util.Orientation.Horizontal) {
 * xxModel = tr.getScaleX();
 * dxModel = tr.getTranslateX();
 * }
 * var transformation = new geotoolkit.util.Transformation(xxModel, 0, 0, yyModel, dxModel, dyModel);
 * widget.setModelTransformation(transformation);
 * }
 * }
 * });
 */
geotoolkit.widgets.sync.ViewSynchronizer = {};
    /**
     * Connect item to a collection of items to be synchronized
     * @param {geotoolkit.scene.Group} item item to be added
     * @param {object} [options] options to connect listener / receiver
     * @param {boolean} [options.sender=true] sender of events
     * @param {boolean} [options.receiver=true] receiver of events
     * @param {array.<string>} [options.events=[geotoolkit.scene.Node.Events.LocalTransformationChanged,geotoolkit.scene.Node.Events.ModelLimitsChanged]] listener of events
     * @param {geotoolkit.util.Orientation} [options.orientation=geotoolkit.util.Orientation.Vertical] item own orientation
     * @returns {geotoolkit.widgets.sync.ViewSynchronizer} this
     */
    geotoolkit.widgets.sync.ViewSynchronizer.prototype.connect = function(item, options){};
    /**
     * Send data for all receivers of the current action
     * @param {object} data data
     * @param {object} data.vertical data in the vertical direction
     * @param {object} data.horizontal data in horizontal direction
     * @param {string} name name of the action
     */
    geotoolkit.widgets.sync.ViewSynchronizer.prototype.send = function(data, name){};
    /**
     * Synchronize
     * @param {object} source source to synchronize
     * @param {string} name action name to applied for synchronization
     * @returns {geotoolkit.widgets.sync.ViewSynchronizer} this
     */
    geotoolkit.widgets.sync.ViewSynchronizer.prototype.synchronize = function(source, name){};
    /**
     * Disconnect item from a collection of items to be synchronized
     * @param {geotoolkit.scene.Group} item item to be removed
     */
    geotoolkit.widgets.sync.ViewSynchronizer.prototype.disconnect = function(item){};

/**
 * The implementation of the default serializer registry for widgets
 *
 * @class geotoolkit.widgets.templates.Registry
 * @augments geotoolkit.persistence.Registry
 */
geotoolkit.widgets.templates.Registry = {};
    /**
     * Return instance of the default registry
     * @returns {geotoolkit.widgets.templates.Registry} registry
     */
    geotoolkit.widgets.templates.Registry.getDefault = function(){};
    /**
     * Return instance of the default registry
     * @returns {geotoolkit.widgets.templates.Registry} registry
     */
    geotoolkit.widgets.templates.Registry.getInstance = function(){};

/**
 * The implementation of the default serializer registry for HistogramWidget
 *
 * @class geotoolkit.widgets.templates.HistogramRegistry
 * @augments geotoolkit.persistence.Registry
 */
geotoolkit.widgets.templates.HistogramRegistry = {};

/**
 * The implementation of the default serializer registry for MultiHistograms widget
 *
 * @class geotoolkit.widgets.templates.MultiHistogramsRegistry
 * @augments geotoolkit.persistence.Registry
 */
geotoolkit.widgets.templates.MultiHistogramsRegistry = {};
    /**
     * Return instance of the default registry
     * @returns {geotoolkit.widgets.templates.MultiHistogramsRegistry} registry
     */
    geotoolkit.widgets.templates.MultiHistogramsRegistry.getInstance = function(){};

/**
 * Base class for TimeSeriesObject and TimeSeriesObjectGroup.
 * This class contains the set/get AxisOptions and ID
 * @class geotoolkit.widgets.timeseries.TimeSeriesObjectBase
 * @augments geotoolkit.util.EventDispatcher
 * @param {Object} options JSON object
 * @param {string} options.id Object's id/uri
 * @param {string} options.name Object/curve's name
 * @param {Object} [options.curveaxis] JSON with curveaxis options
 */
geotoolkit.widgets.timeseries.TimeSeriesObjectBase = {};
    /**
     * Get object's ID
     * @returns {string}
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectBase.prototype.getId = function(){};
    /**
     * Get axis options
     * @returns {object} options JSON which defines curve axis
     * @returns {boolean} options.visible visibility of curve axis
     * @returns {string} options.position curve axis position 'left'/'right'
     * @returns {boolean} options.autocoloraxis synchronize axis color with curve color
     * @returns {boolean} options.autocolorlabel synchronize axis and label color with curve color
     * @returns {boolean} options.titlevisible curve axis label visibility
     * @returns {string} options.textcolor text color if autocolorlabel is false
     * @returns {string} options.axiscolor axis color is autocoloraxis is false
     * @returns {string} options.labeltext title text override
     * @returns {boolean} options.textcolor curve axis label color
     * @returns {number} options.width curve axis and text width
     * @returns {string} options.font curve axis text font
     * @returns {object} options.tickgeneratoroptions JSON which defines tick generator options
     * @returns {boolean} options.tickgeneratoroptions.edge.tickvisible edge tick visibility
     * @returns {boolean} options.tickgeneratoroptions.edge.labelvisible edge label visibility
     * @returns {boolean} options.tickgeneratoroptions.major.tickvisible major tick visibility
     * @returns {boolean} options.tickgeneratoroptions.major.labelvisible major label visibility
     * @returns {boolean} options.tickgeneratoroptions.minor.tickvisible minor tick visibility
     * @returns {boolean} options.tickgeneratoroptions.minor.labelvisible minor label visibility
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectBase.prototype.getAxisOptions = function(){};
    /**
     * Sets axis options. Refer to example below to make a curve's axis invisible. This can be useful to save space while displaying several curves that use the same vertical unit.<br>
     * User would have to determine which curves share the same units and limits and hide the redundant axis.
     * @param {object} [options] JSON which defines curve axis
     * @param {boolean} [options.visible = false] visibility of curve axis
     * @param {string} [options.position = 'right'] curve axis position 'left'/'right'
     * @param {boolean} [options.autocoloraxis = false] synchronize axis color with curve color
     * @param {boolean} [options.autocolorlabel = false] synchronize axis and label color with curve color
     * @param {boolean} [options.titlevisible = true] curve axis label visibility
     * @param {boolean} [options.axisvisible = true] axis visibility
     * @param {string} [options.textcolor = '#6b6b6b'] text color if autocolorlabel is false
     * @param {string} [options.axiscolor = '#6b6b6b'] axis color is autocoloraxis is false
     * @param {string} [options.labeltext = null] title text override
     * @param {boolean} [options.textcolor = '#6b6b6b'] curve axis label color
     * @param {number} [options.width = 40] curve axis and text width
     * @param {string} [options.font = 11px Arial] curve axis text font
     * @param {object} [options.tickgeneratoroptions] JSON which defines tick generator options
     * @param {object} [options.tickgeneratoroptions.edge] edge
     * @param {boolean} [options.tickgeneratoroptions.edge.tickvisible = true] edge tick visibility
     * @param {boolean} [options.tickgeneratoroptions.edge.labelvisible = true] edge label visibility
     * @param {object} [options.tickgeneratoroptions.major] major
     * @param {boolean} [options.tickgeneratoroptions.major.tickvisible = true] major tick visibility
     * @param {boolean} [options.tickgeneratoroptions.major.labelvisible = true] major label visibility
     * @param {object} [options.tickgeneratoroptions.minor] minor
     * @param {boolean} [options.tickgeneratoroptions.minor.tickvisible = false] minor tick visibility
     * @param {boolean} [options.tickgeneratoroptions.minor.labelvisible = false] minor label visibility
     * @param {function} [options.tickgeneratoroptions.format] label formatter for tick generator
     * @param {geotoolkit.attributes.LineStyle} [options.baselinestyle = null] base line style. Color set to curve's color, width = 1 by default.
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObjectBase}
     * @example
     * widget.getTimeSeriesObjectById(id).setAxisOptions({visible:false});
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectBase.prototype.setAxisOptions = function(options){};
    /**
     * @override
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectBase.prototype.dispose = function(){};

/**
 * TimeSeriesObject is a container of visuals used in TimeSeries Widget.
 * It primarily lets you get and set options of the different visuals.
 *
 * @class geotoolkit.widgets.timeseries.TimeSeriesObject
 * @augments geotoolkit.widgets.timeseries.TimeSeriesObjectBase
 * @param {Object} options JSON object
 * @param {string} options.id Object's id/uri
 * @param {string} options.name Object/curve's name
 * @param {Object} options.curve curve properties
 * @param {geotoolkit.data.DataTableView} options.curve.data
 * @param {Object} [options.curve.properties] javascript object used to define curve properties (see setCurveOptions for details)
 * @param {Object} [options.curvesymbol] javascript object used to define curvesymbol properties (see setSymbolOptions for details)
 * @param {Object} [options.curvelimits] javascript object used to define curvelimits properties (see getCurveLimitsGroupOptions for details)
 * @param {Object} [options.curveaxis] javascript object used to define curveaxis properties (see setAxisOptions for details)
 */
geotoolkit.widgets.timeseries.TimeSeriesObject = {};
    /**
     * Get curve's data
     * @returns {geotoolkit.data.DataTableView}
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.getData = function(){};
    /**
     * Set data
     * @param {geotoolkit.data.DataTableView} data JSON containing left, right, and sort data
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObject} this
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.setData = function(data){};
    /**
     * Set curve options
     * @param {object} [options] JSON containing curve options
     * @param {boolean} [options.visible = true] visibility of curve
     * @param {geotoolkit.attributes.LineStyle} [options.linestyle = {}] curve linestyle
     * @param {boolean} [options.autoscale = true] true if curve in auto-scaling mode
     * @param {number} [options.min = null] curve min value
     * @param {number} [options.max = null] curve max value
     * @param {boolean} [options.neatlimits = false] true if curve in neat-limits mode
     * @param {boolean} [options.neatlimitscenteredonzero = false] true if curve in neat-limits mode
     * @param {string} [options.unit = ''] unit string
     * @param {object} [options.microposition=null] micro position limits
     * @param {number} [options.microposition.top] vertical start micro position in the range from 0 to 1
     * @param {number} [options.microposition.bottom] vertical end micro position in the range from 0 to 1
     * @param {geotoolkit.attributes.LineStyle} [options.borderlinestyle] timeseriesshape border line style
     * @param {boolean} [options.spline] toggle spline interpolation
     * @param {boolean} [options.markervisible] visibility of point markers
     * @param {object} [options.marker] JSON containing marker symbol
     * @param {object} [options.values] JSON containing point values options
     * @param {boolean} [options.values.visible] visibility of point values
     * @param {string} [options.values.color] color of value text font
     * @param {string} [options.values.font] value text font
     * @param {geotoolkit.attributes.FillStyle} [options.values.fillstyle] fillstyle of value text container
     * @param {geotoolkit.attributes.LineStyle} [options.values.linestyle] linestyle of value text container
     * @param {geotoolkit.util.NumberFormat} [options.values.format] formatter for value text
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObject}
     * @example
     * // If you have several curves, which share the same unit and min&max,
     * // you can set the min and max of each curve dynamically and independently of each other without having to recreate the widget.
     * // You will have to iterate through the curves which you want to update and set their min and max value as follows:
     * widget.getTimeSeriesObjectById(curveid).setCurveOptions(
     * { 'autoscale': false, 'min': newMinValue, 'max': newMaxValue}
     * );
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.setCurveOptions = function(options){};
    /**
     * Get curve options
     * @returns {object|null} options
     * @returns {string} options.name name of curve
     * @returns {boolean} options.visible visibility of curve
     * @returns {geotoolkit.attributes.LineStyle} options.linestyle curve linestyle
     * @returns {boolean} options.flip is vertically flipped
     * @returns {boolean} options.autoscale true if curve in auto-scaling mode
     * @returns {number} options.min curve min value
     * @returns {number} options.max curve max value
     * @returns {boolean} options.neatlimits true if curve in neat-limits mode
     * @returns {boolean} options.neatlimitscenteredonzero true if curve in neat-limits mode
     * @returns {string} options.unit unit string
     * @returns {string} options.position 'left'/'right'
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.getCurveOptions = function(){};
    /**
     * Set symbol options
     * @param {object} [options] JSON of symbol options
     * @param {number} [options.width] width of symbol
     * @param {number} [options.height] height of symbol
     * @param {string} [options.type] type geotoolkit.scene.shapes.painters.CrossPainter/DiamondPainter/PlusPainter/SquarePainter/StarPainter/TrianglePainter/CirclePainter
     * @param {geotoolkit.attributes.FillStyle} [options.fillstyle] fillstyle of symbol
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObject}
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.setSymbolOptions = function(options){};
    /**
     * Get symbol options
     * @returns {object} options
     * @returns {number} options.width width of symbol
     * @returns {number} options.height height of symbol
     * @returns {string} options.type type geotoolkit.scene.shapes.painters.CrossPainter/DiamondPainter/PlusPainter/SquarePainter/StarPainter/TrianglePainter/CirclePainter
     * @returns {geotoolkit.attributes.FillStyle} options.fillstyle
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.getSymbolOptions = function(){};
    /**
     * Get Curve Limits group option
     * @returns {object} options
     * @returns {boolean} options.visible visibility of curve limits area
     * @returns {number} options.margin curve limits area margin (top and bottom)
     * @returns {number} options.width width for each curve limits column
     * @returns {string} options.font curve limits text font
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.getCurveLimitsGroupOptions = function(){};
    /**
     * Set curve limits group options
     * @param {object} [options] JSON describing curve limits group options
     * @param {boolean} [options.visible = true] visibility of curve limits area
     * @param {number} [options.margin = 5] curve limits area margin (top and bottom)
     * @param {number} [options.width = 60] width for each curve limits column
     * @param {string} [options.font = bold 10px Arial] curve limits text font
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObject}
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.setCurveLimitsGroupOptions = function(options){};
    /**
     * Get legend options
     * @returns {object} options JSON which defines legend options
     * @returns {geotoolkit.util.Format} options.formatter represents the legend number formatter.
     * @returns {number} options.margintext
     * @returns {string} options.font
     * @returns {number} options.height
     * @returns {number} options.internalpadding
     * @returns {number} options.fixedwidth
     * @returns {string} options.labelcolor
     * @returns {geotoolkit.attributes.LineStyle} options.linestyle
     * @returns {geotoolkit.attributes.FillStyle} options.fillstyle
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.getLegendOptions = function(){};
    /**
     * Set legend item options
     * @param {object} [options] JSON which defines legend options
     * @param {geotoolkit.util.Format} [options.formatter] represents the legend number formatter.
     * @param {number} [options.margintext = 2] margin between edge and text of legend
     * @param {string} [options.font = bold 12px Arial] legend font
     * @param {number} [options.height = 25] legend height
     * @param {number} [options.internalpadding = 4] legend padding
     * @param {number} [options.fixedwidth = null] fixed with option
     * @param {string} [options.labelcolor = #6b6b6b] legend text color
     * @param {geotoolkit.attributes.LineStyle} [options.linestyle = (color: rgba(128, 128, 128, 1), width: 1, pixelsnapmode: {'x': true, 'y': true}) ] legend border linestyle
     * @param {geotoolkit.attributes.FillStyle} [options.fillstyle = (color: rgba(250, 250, 250, 0.95)) ] legend fillstyle
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObject} this
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.setLegendOptions = function(options){};
    /**
     * Set tooltip options
     * @param {object} [options] JSON which defines tooltip options
     * @param {geotoolkit.util.Format} [options.formatter] represents the tooltip number formatter.
     * @param {number} [options.margintext=4] margin between edge and text of tooltip
     * @param {string} [options.font='12px Arial'] legend
     * @param {number} [options.symbolsize=10] size of symbol
     * @param {number} [options.internalpadding=2] internal padding
     * @param {number} [options.externalpadding=5] external padding
     * @param {geotoolkit.attributes.LineStyle} [options.linestyle=null] tooltip linestyle
     * @param {geotoolkit.attributes.FillStyle} [options.fillstyle=null] tooltip fillstyle
     * @param {number|null} [options.fixedwidth=null] fixed width
     * @param {boolean} [options.nanvisibility=true] visibility when value is NaN
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObject} this
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.setTooltipOptions = function(options){};
    /**
     * Get tooltip options
     * @returns {object} options JSON which defines tooltip options
     * @returns {geotoolkit.util.Format} options.formatter represents the tooltip number formatter.
     * @returns {number} options.margintext
     * @returns {string} options.font
     * @returns {number} options.symbolsize
     * @returns {number} options.internalpadding
     * @returns {number} options.externalpadding
     * @returns {geotoolkit.attributes.LineStyle} options.linestyle
     * @returns {geotoolkit.attributes.FillStyle} options.fillstyle
     * @returns {number|null} options.fixedwidth
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.getTooltipOptions = function(){};
    /**
     * @override
     */
    geotoolkit.widgets.timeseries.TimeSeriesObject.prototype.dispose = function(){};

/**
 * TimeSeriesObject is a container of visuals used in TimeSeries Widget.
 * It primarily lets you get and set options of the different visuals.
 *
 * @class geotoolkit.widgets.timeseries.TimeSeriesObjectGroup
 * @augments geotoolkit.widgets.timeseries.TimeSeriesObjectBase
 * @param {Object} options JSON object
 * @param {string} options.id Object's id/uri
 * @param {string} options.name Object/curve's name
 * @param {number} [options.min = 0] Object/curve's name
 * @param {number} [options.max = 1] Object/curve's name
 * @param {Object} [options.curveaxis] JSON with curveaxis options
 */
geotoolkit.widgets.timeseries.TimeSeriesObjectGroup = {};
    /**
     * Set min
     * @param {number} value
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObjectGroup} this
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectGroup.prototype.setMin = function(value){};
    /**
     * Get min
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectGroup.prototype.getMin = function(){};
    /**
     * Set max
     * @param {number} value
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObjectGroup} this
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectGroup.prototype.setMax = function(value){};
    /**
     * Get max
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectGroup.prototype.getMax = function(){};
    /**
     * Sets if limits are shared between groups member
     * @param {boolean} value if limits are shared between groups member
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObjectGroup}
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectGroup.prototype.setShareLimits = function(value){};
    /**
     * Get max
     * @returns {boolean}
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectGroup.prototype.getShareLimits = function(){};
    /**
     * Set axis options
     * @override
     * @param {object} [options] JSON which defines curve axis
     * @param {boolean} [options.visible = false] visibility of curve axis
     * @param {string} [options.position = 'right'] curve axis position 'left'/'right'
     * @param {boolean} [options.titlevisible = true] curve axis label visibility
     * @param {number} [options.width = 40] curve axis and text width
     * @param {string} [options.font = 11px Arial] curve axis text font
     * @param {object} [options.tickgeneratoroptions] JSON which defines tick generator options
     * @param {object} [options.tickgeneratoroptions.edge] edge
     * @param {boolean} [options.tickgeneratoroptions.edge.tickvisible = true] edge tick visibility
     * @param {boolean} [options.tickgeneratoroptions.edge.labelvisible = true] edge label visibility
     * @param {object} [options.tickgeneratoroptions.major] major
     * @param {boolean} [options.tickgeneratoroptions.major.tickvisible = true] major tick visibility
     * @param {boolean} [options.tickgeneratoroptions.major.labelvisible = true] major label visibility
     * @param {object} [options.tickgeneratoroptions.minor] minor
     * @param {boolean} [options.tickgeneratoroptions.minor.tickvisible = false] minor tick visibility
     * @param {boolean} [options.tickgeneratoroptions.minor.labelvisible = false] minor label visibility
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObjectGroup} this
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectGroup.prototype.setAxisOptions = function(options){};
    /**
     * Add time series object to group. If the item (or any item in the array) is a member of another group, none of the items are added
     * @param {geotoolkit.widgets.timeseries.TimeSeriesObject|Array<geotoolkit.widgets.timeseries.TimeSeriesObject>} item
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObjectGroup} this
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectGroup.prototype.addObject = function(item){};
    /**
     * Remove time series object from group
     * @param {geotoolkit.widgets.timeseries.TimeSeriesObject|Array<geotoolkit.widgets.timeseries.TimeSeriesObject>} item
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObjectGroup} this
     */
    geotoolkit.widgets.timeseries.TimeSeriesObjectGroup.prototype.removeObject = function(item){};

/**
 * The ScaledData is a helper object that encapsulates the data
 * representing a time series line and allows to associate either
 * conversion and/or interpolation objects with this data.
 *
 * @class geotoolkit.widgets.timeseries.ScaledData
 * @param {geotoolkit.data.DataTableView} data abstract log data
 * @param {geotoolkit.data.DataConversion} conversion data conversion
 * @param {geotoolkit.data.DataInterpolation} [interpolation] algorithm to interpolate samples
 * @param {boolean} [useOutOfRangeData=false] convert values equals or less to zero to 0 instead of NaN
 *
 */
geotoolkit.widgets.timeseries.ScaledData = {};
    /**
     * Sets conversion
     *
     * @param {geotoolkit.data.DataConversion} conversion conversion of the data
     * @returns {geotoolkit.widgets.timeseries.ScaledData} this
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.setConversion = function(conversion){};
    /**
     * Sets interpolation
     *
     * @param {geotoolkit.data.DataInterpolation} interpolation algorithm to interpolate samples
     * @returns {geotoolkit.widgets.timeseries.ScaledData} this
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.setInterpolation = function(interpolation){};
    /**
     * Gets data source
     * @returns {geotoolkit.data.DataTableView}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getSource = function(){};
    /**
     * Get minimum depth
     *
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getMinPosition = function(){};
    /**
     * Returns maximum depth
     *
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getMaxPosition = function(){};
    /**
     * Returns minimum value
     *
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getMinValue = function(){};
    /**
     * Returns maximum value
     *
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getMaxValue = function(){};
    /**
     * Gets scaled samples
     *
     * @returns {geotoolkit.data.DataSample[]} array of {geotoolkit.data.DataSample}.
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getSamples = function(){};
    /**
     * Gets a count of samples
     *
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getLength = function(){};
    /**
     * Always return true for time series data
     * @returns {boolean}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.isForwardOnly = function(){};
    /**
     * Always return geotoolkit.data.DataOrder.Ascending for time series data
     * @returns {geotoolkit.data.DataOrder|number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getDataOrder = function(){};
    /**
     * Convert value from original source to current scaled data
     *
     * @param {array<number>|number} v
     * value of the original data source
     * @returns {array<number>|number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.convertValueFromSource = function(v){};
    /**
     * Convert value from scaled data source to original source
     *
     * @param {array<number>|number} v
     * value of the scaled data source
     * @returns {array<number>|number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.convertValueToSource = function(v){};
    /**
     *
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getDataTimeStamp = function(){};
    /**
     * Return a wrap levels, If data doesn't have wraps than it returns null
     * @param {number} fromPosition from position
     * @param {number} toPosition to position
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getIndexRange = function(fromPosition, toPosition){};
    /**
     * Find index corresponding to depth
     *
     * @param {Array.<geotoolkit.data.DataSample>} scaledSamples samples
     * @param {number} position depth
     * @param {number} length length of the array in the sample
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.ScaledData.findIndex = function(scaledSamples, position, length){};
    /**
     * Return minimum wrap level. By default it is 0
     *
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getMinWrapLevel = function(){};
    /**
     * Sets minimum wrap level value
     *
     * @param {number} level minimum wrap level
     * @returns {geotoolkit.widgets.timeseries.ScaledData} this
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.setMinWrapLevel = function(level){};
    /**
     * Return maximum wrap level. By default it is 0
     *
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getMaxWrapLevel = function(){};
    /**
     * Sets maximum wrap level value
     *
     * @param {number} level maximum wrap level.
     * @returns {geotoolkit.widgets.timeseries.ScaledData} this
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.setMaxWrapLevel = function(level){};
    /**
     * Returns value at specified depth
     * @param {number} position to return value
     * @returns {number} return value by depth
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getValue = function(position){};
    /**
     * @protected
     * @param {number} position position to return value
     * @param {geotoolkit.data.DataSample[]} samples samples
     * @returns {number}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getValueInternal = function(position, samples){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @returns {geotoolkit.widgets.timeseries.ScaledData}
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.setProperties = function(properties){};
    /**
     *
     * @inheritdoc
     */
    geotoolkit.widgets.timeseries.ScaledData.prototype.isOutdated = function(){};

/**
 * Scroll bar element
 *
 * @class geotoolkit.widgets.ScrollBar
 */
geotoolkit.widgets.ScrollBar = {};

/**
 * Scrollable panel
 *
 * @class geotoolkit.widgets.ScrollPanel
 */
geotoolkit.widgets.ScrollPanel = {};
    /**
     * returns div element
     * @returns {HTMLElement}
     */
    geotoolkit.widgets.ScrollPanel.prototype.getContainer = function(){};
    /**
     *
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.widgets.ScrollPanel.prototype.getOverView = function(){};
    /**
     * Update Limits
     */
    geotoolkit.widgets.ScrollPanel.prototype.updateLimits = function(){};
    /**
     * set scroll event handler
     * @param {function()} handler scroll event handler
     * @returns {geotoolkit.widgets.ScrollPanel} this
     */
    geotoolkit.widgets.ScrollPanel.prototype.setScrollEventHandler = function(handler){};

/**
 * The BaseWidget is the parent class of all widgets. <br>
 * It combines the concepts of Tool- {@link geotoolkit.controls.tools.AbstractTool } and Group- {@link geotoolkit.scene.Group }
 * to provide a simple way of creating a specific component like concept.<br>
 * Inheriting classes extend this concept by adding specific tools and shapes to provide a domain oriented component that can be reused easily.
 * @class geotoolkit.widgets.BaseWidget
 * @augments geotoolkit.scene.Group
 * @param {object} options
 * @param {geotoolkit.util.Rect} [options.bounds] bounds of the current widget
 */
geotoolkit.widgets.BaseWidget = {};
    /**
     * function call in the constructor to initialize tools in the widget
     * @returns {geotoolkit.widgets.BaseWidget}
     * @protected
     */
    geotoolkit.widgets.BaseWidget.prototype.initializeTools = function(){};
    /**
     * Connect a new tool with a toolname to the widget
     * @param {geotoolkit.controls.tools.AbstractTool | Array<geotoolkit.controls.tools.AbstractTool>} tool tool associated with the widget
     * @returns {geotoolkit.widgets.BaseWidget} this
     */
    geotoolkit.widgets.BaseWidget.prototype.connectTool = function(tool){};
    /**
     * Disconnect the tool from the widget
     * @param {geotoolkit.controls.tools.AbstractTool | Array<geotoolkit.controls.tools.AbstractTool>} tool tool to disconnect
     * @returns {geotoolkit.widgets.BaseWidget} this
     */
    geotoolkit.widgets.BaseWidget.prototype.disconnectTool = function(tool){};
    /**
     * Returns root tool associated to this widget
     * @returns {geotoolkit.controls.tools.CompositeTool}
     */
    geotoolkit.widgets.BaseWidget.prototype.getTool = function(){};
    /**
     * Set root tool associated to this widget
     * @protected
     * @param {geotoolkit.controls.tools.CompositeTool} tool tool to be set
     * @returns {geotoolkit.widgets.BaseWidget}
     */
    geotoolkit.widgets.BaseWidget.prototype.setTool = function(tool){};
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
     * @returns {?geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.widgets.BaseWidget.prototype.getToolByName = function(toolName){};
    /**
     * Returns the tool matching the given type. or null if nothing is matching the tool type<br>
     * For example:<br>
     * getToolByType(geotoolkit.controls.tools.Selection)<br>
     * Would return the same tool than<br>
     * getToolByName("pick")<br>
     *
     * @param {string} toolType toolType of the tool
     * @returns {?geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.widgets.BaseWidget.prototype.getToolByType = function(toolType){};
    /**
     * List all the tools contained in this composite.
     * Prepend their parent tools parent using a '.'.
     * @returns {string[]}
     */
    geotoolkit.widgets.BaseWidget.prototype.listToolsNames = function(){};
    /**
     * Dispose node. Clear all listeners
     * and disconnect style to avoid memory
     * leaks
     */
    geotoolkit.widgets.BaseWidget.prototype.dispose = function(){};
    /**
     * Load template loads the saved visual properties of the current template. It is only a visual representation of the current widget. It does not contain any data
     * @param {string} template template to be applied to current widget
     * @param {geotoolkit.persistence.Registry} [registry=geotoolkit.persistence.Registry] registry
     */
    geotoolkit.widgets.BaseWidget.prototype.loadTemplate = function(template, registry){};
    /**
     * Save template saves visual properties of the current template. It is only a visual representation of the current widget. It does not contain any data
     * @param {geotoolkit.persistence.Registry} [registry=geotoolkit.widgets.templates.Registry] registry
     * @returns {string}
     */
    geotoolkit.widgets.BaseWidget.prototype.saveTemplate = function(registry){};
    /**
     * get options
     * @param {object} data how to extract data, null by default
     * @returns {object}
     */
    geotoolkit.widgets.BaseWidget.prototype.getData = function(data){};
    /**
     * Gets all the properties pertaining to this object
     * See {@link geotoolkit.scene.Group.getProperties} for details
     * Keep in mind that widgets does not return scene-graph information
     * @returns {object} props JSON containing properties
     */
    geotoolkit.widgets.BaseWidget.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * Keep in mind that widgets does not accept scene-graph information
     * NOTE properties.children property will be ignored
     * @param {object} properties JSON containing properties
     * @returns {geotoolkit.widgets.BaseWidget} this
     */
    geotoolkit.widgets.BaseWidget.prototype.setProperties = function(properties){};

/**
 * Defines an abstract implementation of a widget overlay. Abstract overlay supports ...
 * @class geotoolkit.widgets.overlays.AbstractOverlay
 * @augments geotoolkit.util.EventDispatcher
 * @param {geotoolkit.widgets.BaseWidget} widget
 */
geotoolkit.widgets.overlays.AbstractOverlay = {};
    /**
     * AbstractOverlay Events
     * @readonly
     * @enum
     */
    geotoolkit.widgets.overlays.AbstractOverlay.Events = {};
        /**
         * This Event is fired when the Abstract Overlay State (props: visible, enable) has been changed
        
         * @type {string}
         */
        geotoolkit.widgets.overlays.AbstractOverlay.Events.StateChanged = "";
    /**
     * Disposes this node, once disposes a node should not be used anymore.<br>
     * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
     * Also aggressively 'cleanup' this node by setting some of its members to null.
     */
    geotoolkit.widgets.overlays.AbstractOverlay.prototype.dispose = function(){};
    /**
     * Returns widget
     * @returns {geotoolkit.widgets.BaseWidget} widget
     */
    geotoolkit.widgets.overlays.AbstractOverlay.prototype.getWidget = function(){};
    /**
     * @protected
     * @param {object} state
     * @returns {geotoolkit.widgets.overlays.AbstractOverlay}
     */
    geotoolkit.widgets.overlays.AbstractOverlay.prototype.onStateChanged = function(state){};
    /**
     * Return visibility state
     * @returns {boolean} visible state
     */
    geotoolkit.widgets.overlays.AbstractOverlay.prototype.getVisible = function(){};
    /**
     * Set visibility state
     * @param {boolean} visible
     * @returns {geotoolkit.widgets.overlays.AbstractOverlay} this
     */
    geotoolkit.widgets.overlays.AbstractOverlay.prototype.setVisible = function(visible){};
    /**
     * Return enabled state
     * @returns {boolean} enabled state
     */
    geotoolkit.widgets.overlays.AbstractOverlay.prototype.getEnabled = function(){};
    /**
     * Set enabled state
     * @param {boolean} enabled
     * @returns {geotoolkit.widgets.overlays.AbstractOverlay} this
     */
    geotoolkit.widgets.overlays.AbstractOverlay.prototype.setEnabled = function(enabled){};

/**
 * Annotation
 * @interface
 */
geotoolkit.widgets.overlays.IAnnotation = {};
    /**
     * Get annotation name
     * @function
     * @abstract
     *
     * @returns {string} returns name
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.getName = function(){};
    /**
     * Set annotation name
     * @function
     * @abstract
     * @param {string} name
     *
     * @returns {geotoolkit.widgets.overlays.IAnnotation} this
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.setName = function(name){};
    /**
     * Get annotation text
     * @function
     * @abstract
     *
     * @returns {string} returns text
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.getText = function(){};
    /**
     * Set annotation text
     * @function
     * @abstract
     * @param {string} text
     *
     * @returns {geotoolkit.widgets.overlays.IAnnotation} this
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.setText = function(text){};
    /**
     * Get annotation symbol
     * @function
     * @abstract
     *
     * @returns {string|geotoolkit.scene.shapes.Image|geotoolkit.scene.Group|object} symbol
     * @returns {number} [symbol.width]
     * @returns {number} [symbol.height]
     * @returns {boolean} [symbol.keepaspectratio] default is true
     * @returns {string} [symbol.url]
     * @returns {geotoolkit.scene.Node} [symbol.node]
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.getSymbol = function(){};
    /**
     * Set annotation symbol
     * @function
     * @abstract
     * @param {string|geotoolkit.scene.shapes.Image|geotoolkit.scene.Group|object} symbol (base64 in case of url)
     * @param {number} [symbol.width]
     * @param {number} [symbol.height]
     * @param {boolean} [symbol.keepaspectratio] default is true
     * @param {string} [symbol.url]
     * @param {geotoolkit.scene.Node} [symbol.node]
     *
     * @returns {geotoolkit.widgets.overlays.IAnnotation} this
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.setSymbol = function(symbol){};
    /**
     * Get annotation anchor
     * @function
     * @abstract
     *
     * @returns {geotoolkit.util.Point} target
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.getAnchor = function(){};
    /**
     * Set annotation anchor
     * Returns annotation
     * @function
     * @abstract
     * @param {geotoolkit.util.Point} anchor
     *
     * @returns {geotoolkit.widgets.overlays.IAnnotation} this
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.setAnchor = function(anchor){};
    /**
     * Get annotation target
     * @function
     * @abstract
     *
     * @returns {geotoolkit.scene.Node} target
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.getTarget = function(){};
    /**
     * Set annotation target
     * @function
     * @abstract
     * @param {geotoolkit.scene.Node} target
     *
     * @returns {geotoolkit.widgets.overlays.IAnnotation} this
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.setTarget = function(target){};
    /**
     * Get annotation options
     * @function
     * @abstract
     *
     * @returns {object} options
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.getOptions = function(){};
    /**
     * Set annotation options
     * @function
     * @abstract
     * @param {object} options
     * @param {string} [options.id]
     * @param {string} [options.cssclass]
     * @param {string} [options.name]
     *
     * @returns {geotoolkit.widgets.overlays.IAnnotation} this
     */
    geotoolkit.widgets.overlays.IAnnotation.prototype.setOptions = function(options){};

/**
 * Creates default implementation of the annotation
 * @class geotoolkit.widgets.overlays.Annotation
 * @implements geotoolkit.widgets.overlays.IAnnotation
 * @augments geotoolkit.util.EventDispatcher
 * @param {object} data
 * @param {string} [data.name] annotation name
 * @param {string} [data.text] annotation text
 * @param {string} [data.symbol] base64 image
 * @param {geotoolkit.util.Point} [data.anchor]
 * @param {geotoolkit.scene.Node} [data.target] target
 * @param {object} [data.options] options
 */
geotoolkit.widgets.overlays.Annotation = {};
    /**
     * Get annotation name
     * @returns {string} returns name
     */
    geotoolkit.widgets.overlays.Annotation.prototype.getName = function(){};
    /**
     * Set annotation name
     * @param {string} name new annotation name
     * @returns {geotoolkit.widgets.overlays.Annotation} this
     */
    geotoolkit.widgets.overlays.Annotation.prototype.setName = function(name){};
    /**
     * Get annotation text
     * @returns {string} returns text
     */
    geotoolkit.widgets.overlays.Annotation.prototype.getText = function(){};
    /**
     * Set annotation text
     * @param {string} text new annotation text
     * @returns {geotoolkit.widgets.overlays.Annotation} this
     */
    geotoolkit.widgets.overlays.Annotation.prototype.setText = function(text){};
    /**
     * Get annotation symbol
     * @returns {string|geotoolkit.scene.shapes.Image|geotoolkit.scene.Group|object} symbol
     * @returns {number} [symbol.width]
     * @returns {number} [symbol.height]
     * @returns {boolean} [symbol.keepaspectratio] default is true
     * @returns {string} [symbol.url]
     * @returns {geotoolkit.scene.Node} [symbol.node]
     */
    geotoolkit.widgets.overlays.Annotation.prototype.getSymbol = function(){};
    /**
     * Set annotation symbol
     * @param {string|geotoolkit.scene.shapes.Image|geotoolkit.scene.Group|object} symbol
     * @param {number} [symbol.width]
     * @param {number} [symbol.height]
     * @param {boolean} [symbol.keepaspectratio] default is true
     * @param {string} [symbol.url]
     * @param {geotoolkit.scene.Node} [symbol.node]
     * @returns {geotoolkit.widgets.overlays.Annotation} this
     */
    geotoolkit.widgets.overlays.Annotation.prototype.setSymbol = function(symbol){};
    /**
     * Get annotation anchor
     * @returns {geotoolkit.util.Point} target
     */
    geotoolkit.widgets.overlays.Annotation.prototype.getAnchor = function(){};
    /**
     * Set annotation anchor
     * @param {geotoolkit.util.Point} anchor
     * @returns {geotoolkit.widgets.overlays.Annotation} this
     */
    geotoolkit.widgets.overlays.Annotation.prototype.setAnchor = function(anchor){};
    /**
     * Get annotation target
     * @returns {geotoolkit.scene.Node} target
     */
    geotoolkit.widgets.overlays.Annotation.prototype.getTarget = function(){};
    /**
     * Set annotation target
     * @param {geotoolkit.scene.Node} target
     * @returns {geotoolkit.widgets.overlays.Annotation} this
     */
    geotoolkit.widgets.overlays.Annotation.prototype.setTarget = function(target){};
    /**
     * Get annotation options
     * @returns {geotoolkit.scene.Node} target
     */
    geotoolkit.widgets.overlays.Annotation.prototype.getOptions = function(){};
    /**
     * Set annotation options
     * @param {object} options
     * @returns {geotoolkit.widgets.overlays.Annotation}
     */
    geotoolkit.widgets.overlays.Annotation.prototype.setOptions = function(options){};
    /**
     * Create IAnnotation from object
     * @param {object|geotoolkit.widgets.overlays.IAnnotation} object
     * @returns {geotoolkit.widgets.overlays.IAnnotation}
     */
    geotoolkit.widgets.overlays.Annotation.fromObject = function(object){};

/**
 * Creates default implementation of the annotation overlay event args
 * @class geotoolkit.widgets.overlays.AnnotationEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 */
geotoolkit.widgets.overlays.AnnotationEventArgs = {};
    /**
     * Cancel event
     * @returns {geotoolkit.widgets.overlays.AnnotationEventArgs} this
     */
    geotoolkit.widgets.overlays.AnnotationEventArgs.prototype.cancel = function(){};
    /**
     * Return annotation
     * @returns {object|geotoolkit.widgets.overlays.IAnnotation}
     */
    geotoolkit.widgets.overlays.AnnotationEventArgs.prototype.getAnnotation = function(){};
    /**
     * Set object
     * @param {object} annotation annotation object
     * @returns {geotoolkit.widgets.overlays.AnnotationEventArgs} this
     */
    geotoolkit.widgets.overlays.AnnotationEventArgs.prototype.setAnnotation = function(annotation){};

/**
 * Creates default implementation of the widget annotation overlay
 * @class geotoolkit.widgets.overlays.AnnotationOverlay
 * @augments geotoolkit.widgets.overlays.AbstractOverlay
 * @param {geotoolkit.widgets.AnnotatedWidget} widget
 * @param {object} [options] extra options
 * @param {geotoolkit.scene.Layer} [options.overlay=null] Overlay layer can be specified instead of default layer
 * @param {boolean} [options.cancreate=true] can create annotation
 * @param {boolean} [options.candelete=true] can delete annotation
 * @param {boolean} [options.canedit=true] can edit annotation
 * @param {boolean} [options.canmove=true] can move annotation
 */
geotoolkit.widgets.overlays.AnnotationOverlay = {};
    /**
     * AnnotationOverlay Events
     * @readonly
     * @enum
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.Events = {};
        /**
         * This Event is fired when the Annotation should be created
        
         * @type {string}
         */
        geotoolkit.widgets.overlays.AnnotationOverlay.Events.CreateAnnotation = "";
        /**
         * This Event is fired when the Annotation should be removed
        
         * @type {string}
         */
        geotoolkit.widgets.overlays.AnnotationOverlay.Events.RemoveAnnotation = "";
        /**
         * This Event is fired when the Annotation should be edited
        
         * @type {string}
         */
        geotoolkit.widgets.overlays.AnnotationOverlay.Events.EditAnnotation = "";
        /**
         * This Event is fired when active annotation has to be changed
         *
         * @type {string}
         */
        geotoolkit.widgets.overlays.AnnotationOverlay.Events.ChangeActiveAnnotation = "";
    /**
     * Disposes this node, once disposes a node should not be used anymore.<br>
     * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
     * Also aggressively 'cleanup' this node by setting some of its members to null.
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.dispose = function(){};
    /**
     * @protected
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.getModel = function(){};
    /**
     * @protected
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.onUpdateGeometry = function(){};
    /**
     * @protected
     * @override
     * @param {object} state overlay state
     * @returns {geotoolkit.widgets.overlays.AnnotationOverlay} this
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.onStateChanged = function(state){};
    /**
     * Set options
     * @param {object} options options
     * @param {boolean} [options.cancreate] can create annotation
     * @param {boolean} [options.candelete] can delete annotation
     * @param {boolean} [options.canedit] can edit annotation
     * @param {boolean} [options.canmove] can move annotation
     * @returns {geotoolkit.widgets.overlays.AnnotationOverlay}
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.setOptions = function(options){};
    /**
     * Return options
     * @returns {object} [options] JSON object
     * @returns {boolean} [options.cancreate] can create annotation
     * @returns {boolean} [options.candelete] can delete annotation
     * @returns {boolean} [options.canedit] can edit annotation
     * @returns {boolean} [options.canmove] can move annotation
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.getOptions = function(){};
    /**
     * Add annotation
     * @param {object|geotoolkit.widgets.overlays.IAnnotation} annotation annotation object
     * @param {string} [annotation.name=''] annotation name
     * @param {string} [annotation.text=''] annotation text
     * @param {string} [annotation.symbol=null] base64 image
     * @param {geotoolkit.util.Point} [annotation.anchor] anchor position in target coordinates
     * @param {geotoolkit.scene.Node} [annotation.target] node to specify anchor position
     * @param {object} [annotation.options=null] extra options
     * @param {number} [annotation.options.connectorsize=1] connector size
     * @param {geotoolkit.util.Point} [annotation.options.offset=new geotoolkit.util.Point(-10,-10)] offset of text frame from anchor in device coordinates
     * @param {geotoolkit.util.Dimension} [annotation.options.frame=new geotoolkit.util.Dimension(150, 50)] annotation text dimension
     * @param {object|geotoolkit.attributes.LineStyle} [annotation.options.linestyle=null] line style
     * @param {object|geotoolkit.attributes.FillStyle} [annotation.options.fillstyle=null] fill style
     * @param {object|geotoolkit.attributes.TextStyle} [annotation.options.textstyle=null] text style
     * @returns {geotoolkit.widgets.overlays.IAnnotation}
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.addAnnotation = function(annotation){};
    /**
     * Remove annotation
     * @param {geotoolkit.widgets.overlays.IAnnotation} annotation annotation to be removed
     * @returns {geotoolkit.widgets.overlays.AnnotationOverlay} this
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.removeAnnotation = function(annotation){};
    /**
     * Edit annotation, by default it starts embedded TextArea editor
     * @param {geotoolkit.widgets.overlays.IAnnotation} annotation annotation to edit
     * @returns {geotoolkit.widgets.overlays.AnnotationOverlay} this
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.editAnnotation = function(annotation){};
    /**
     * Scroll to annotation
     * @param {geotoolkit.widgets.overlays.IAnnotation} annotation annotation
     * @returns {geotoolkit.widgets.overlays.AnnotationOverlay}
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.scrollToAnnotation = function(annotation){};
    /**
     * Return iterator by child nodes
     *
     * @param {function()} [filter] a filter function. Returns all nodes if null
     * @returns {geotoolkit.util.Iterator}
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.getAnnotations = function(filter){};
    /**
     * Return active annotation
     * @returns {?geotoolkit.widgets.overlays.IAnnotation} annotation
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.getActiveAnnotation = function(){};
    /**
     * Set active annotation
     * @param {geotoolkit.widgets.overlays.IAnnotation} annotation annotation
     * @returns {geotoolkit.widgets.overlays.AnnotationOverlay}
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.setActiveAnnotation = function(annotation){};
    /**
     * Set orientation
     * @param {geotoolkit.util.Orientation} orientation overlay orientation
     * @returns {geotoolkit.widgets.overlays.AnnotationOverlay} this
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.prototype.setOrientation = function(orientation){};
    /**
     * Register geometry extension
     * @param {string} geometryName geometry name
     * @param {function()} extension geometry extension
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.registerGeometry = function(geometryName, extension){};
    /**
     * Return known geometry
     * @param {string} geometryName geometry name
     * @returns {function()} extension geometry extension
     */
    geotoolkit.widgets.overlays.AnnotationOverlay.getGeometry = function(geometryName){};

/**
 * The AnnotatedWidget widget extends the BaseWidget using an AnnotatedNode. It has a center model {@link geotoolkit.scene.Group} and a set of eight annotations on each side to display axes, titles, or legends.
 * It has settings to specify sizes of the annotations and create axis. It also provides scrollbars and capabilities to zoom for the center element. <br>
 *
 * A connect function is used to synchronize the object with a model. It propagates limits and scroll position, so while scrolling the connect function synchronizes scale coefficients.
 * <p>

 * The main way to configure and customize the widget is to use the setOptions() function that provides a comprehensible way of changing the default look and feel of the widget.<br>
 * The constructor calls the functions geotoolkit.widgets.AnnotatedWidget.prototype.initializeLayout() and geotoolkit.widgets.AnnotatedWidget.prototype.initializeTools().<br>
 *
 * See {@link geotoolkit.scene.AnnotatedNode} for more details on the annotation layout and features.
 * </p>
 *
 * <p> It also includes some default tools:
 * <ul>
 * <li> cross-hair {@link geotoolkit.controls.tools.CrossHair} </li
 * <li> panning {@link geotoolkit.controls.tools.Panning} </li>
 * <li> pick {@link geotoolkit.controls.tools.Selection} </li>
 * <li> rubberband {@link geotoolkit.controls.tools.RubberBand} </li>
 * <li> pinchtozoom {@link geotoolkit.controls.tools.PinchToZoom} </li>
 * <li> horizontalscroll {@link geotoolkit.controls.tools.scroll.HorizontalScroll} </li>
 * <li> verticalscroll {@link geotoolkit.controls.tools.scroll.VerticalScroll}</li>
 * </ul>
 * The widget also provides builtin export to PDF, please refer to the example below<br>
 * </p>
 *
 * @class geotoolkit.widgets.AnnotatedWidget
 * @augments geotoolkit.widgets.BaseWidget
 * @implements geotoolkit.scene.exports.IExportable
 * @param {object} [options] The widget options see initializeLayout() for details
 * @param {geotoolkit.scene.Group} [options.model] model or group
 * @param {geotoolkit.util.Rect} [options.bounds] bounds of the model
 * @param {object} [options.north] JSON to hold north annotation options
 * @param {number|string} [options.north.size] north annotation desired size (width for horizontal; height for vertical)
 * @param {object} [options.north.title] north annotation title options (see {@link geotoolkit.scene.shapes.Text}'s "setProperties" description for details)
 * @param {object} [options.north.axis] north annotation axis options (see {@link geotoolkit.axis.Axis}'s "setProperties" description for details)
 * @param {object} [options.east] JSON to hold east annotation options
 * @param {object} [options.south] JSON to hold south annotation options
 * @param {object} [options.west] JSON to hold west annotation options
 * @param {boolean} [options.annotationitemswrap=true] true if you want to wrap annotation items in constructor with a new group with zero to one limits
 * @param {object} [options.annotationssizes] JSON to hold (width or height) of the annotation {@link geotoolkit.widgets.AnnotatedWidget.setAnnotationSize}
 * @param {number|string} [options.annotationssizes.east] JSON to hold east annotation size
 * @param {number|string} [options.annotationssizes.south] JSON to hold south annotation size
 * @param {number|string} [options.annotationssizes.west] JSON to hold west annotation size
 * @param {number|string} [options.annotationssizes.north] JSON to hold north annotation size
 * @param {object} [options.tools] see {@link geotoolkit.widgets.AnnotatedWidget.setToolsOptions}
 * @param {object} [options.border] defines properties for widget outer border
 * @param {object} [options.border.color] color of border border
 *
 * @example
 * <caption> 1). Initialize Widget </caption>
 *
 * // Create data
 * var x = [...], y =[..] // create the data which can be arrays or any other form as required by the shape.
 * // Create Shape using data
 * var anyshape = new geotoolkit.controls.shapes(pass the data);
 * // Create the model using the shape created above as a child.
 * var model = createModel(); //geotoolkit.scene.Group()
 * // Create the widget
 * var widget = new geotoolkit.widgets.AnnotatedWidget({
 * 'model': model,
 * 'annotationssizes': {
 * 'north': '5',
 * 'south': '50',
 * 'east': '50',
 * 'west': '50'
 * },
 * 'south': [
 * axisSouth = new geotoolkit.axis.Axis({
 * 'tickposition': geotoolkit.axis.TickInfo.TickPosition.Top,
 * 'labelposition': geotoolkit.axis.TickInfo.LabelPosition.Top,
 * 'orientation': geotoolkit.axis.AxisOrientation.Horizontal,
 * 'title': 'X Axis',
 * 'titlevisible': true,
 * 'titletextstyle': {
 * 'color': '#757575'
 * },
 * 'titleanchor': geotoolkit.util.AnchorType.BottomCenter
 * })
 * ],
 * 'west': [
 * axisWest = new geotoolkit.axis.Axis({
 * 'tickposition': geotoolkit.axis.TickInfo.TickPosition.Right,
 * 'labelposition': geotoolkit.axis.TickInfo.LabelPosition.Right,
 * 'orientation': geotoolkit.axis.AxisOrientation.Vertical,
 * 'title': 'Y Axis',
 * 'titlevisible': true,
 * 'titletextstyle': {
 * 'color': '#757575'
 * })
 *
 * @example
 * // 2). Exporting to a PDF with virtual model limits. This will print the canvas in its entirety, regardless of the zoom state. Please refer to the Export tutorials for more export options.
 * var pdfOptions = {
 * 'printsettings': {'scaling': geotoolkit.scene.exports.ScalingOptions.FitWidth},
 * 'modellimits': _virtualWidget.getModel().getModelLimits()
 * };
 *
 * if (widget != null) {
 * widget.exportToPdf(pdfOptions);
 * }
 *
 * @example
 * // 3). Code snippet showing how to add axis another axis to AnnotatedWidget at x=0,y=0. Also to add an arrow and text to display the direction.
 * var axis1 = new geotoolkit.axis.Axis(new geotoolkit.axis.AdaptiveTickGenerator())
 * .setBounds(new geotoolkit.util.Rect(0, -10, 3, 30))
 * .setModelLimits(new geotoolkit.util.Rect(0, -10, 10, 30))
 * .setTickPosition(geotoolkit.axis.TickInfo.TickPosition.Left);
 * var axis2 = new geotoolkit.axis.Axis(new geotoolkit.axis.AdaptiveTickGenerator())
 * .setBounds(new geotoolkit.util.Rect(-30, 0, 10, -5))
 * .setModelLimits(new geotoolkit.util.Rect(-30, 0, 10, 10))
 * .setOrientation(geotoolkit.axis.AxisOrientation.Horizontal)
 * .setTickPosition(geotoolkit.axis.TickInfo.TickPosition.Bottom);
 * var model = new geotoolkit.scene.Group().setModelLimits(new geotoolkit.util.Rect(-30, -10, 10, 30)).addChild([
 * axis1, axis2,
 * new geotoolkit.scene.shapes.Arrow({
 * 'from': new geotoolkit.util.Point(5, 5),
 * 'to': new geotoolkit.util.Point(5, 7)
 * }).setHeads(geotoolkit.scene.shapes.Arrow.Heads.End),
 * new geotoolkit.scene.shapes.Text({
 * 'text': 'north',
 * 'ax': 6.5,
 * 'ay': 6
 * }).setIsPointingUp(true)
 * ])
 * .setVerticalFlip(true)
 * .adjustPosition();
 *
 * var myAnnotatedWidget1 = new geotoolkit.widgets.AnnotatedWidget({
 * 'model': model,
 * // other settings for annotatedwidget
 * });
 * // Now create the model.
 * model = new geotoolkit.scene.Group({'children' : [axis1, axis2]});
 *
 */
geotoolkit.widgets.AnnotatedWidget = {};
    /**
     * @type {number}
     * @deprecated
     * @readonly
     */
    geotoolkit.widgets.AnnotatedWidget.DEFAULT_SCROLL_BAR_HEIGHT = NaN;
    /**
     * @type {number}
     * @deprecated
     * @readonly
     */
    geotoolkit.widgets.AnnotatedWidget.DEFAULT_SCROLL_BAR_WIDTH = NaN;
    /**
     * @param {Object} settings define widgets settings
     * @param {geotoolkit.scene.Group} [settings.model] model or group
     * @param {object} [settings.border] defines properties for widget outer border
     * @param {string|geotoolkit.util.RgbaColor} [settings.border.color] color of border border
     * @param {object} [settings.annotationssizes] defines annotations sizes
     * @param {string|number} [settings.annotationssizes.north] JSON to hold (width or height) of the annotation
     * @param {string|number} [settings.annotationssizes.south] JSON to hold east annotation size
     * @param {string|number} [settings.annotationssizes.west] JSON to hold west annotation size
     * @param {string|number} [settings.annotationssizes.east] JSON to hold east annotation size
     * @param {Array|geotoolkit.scene.Node} [settings.north] the Array of geotoolkit.scene.Node to display on top of the model
     * @param {number|string} [settings.north.size] north annotation desired size (width for horizontal; height for vertical)
     * @param {object} [settings.north.title] north annotation title options (see {@link geotoolkit.scene.shapes.Text}'s "setProperties" description for details)
     * @param {object} [settings.north.axis] north annotation axis options (see {@link geotoolkit.axis.Axis}'s "setProperties" description for details)
     * @param {Array|geotoolkit.scene.Node} [settings.south] the Array of geotoolkit.scene.Node to display on top of the model
     * @param {Array|geotoolkit.scene.Node} [settings.west] the Array of geotoolkit.scene.Node to display on top of the model
     * @param {Array|geotoolkit.scene.Node} [settings.east] the Array of geotoolkit.scene.Node to display on top of the model
     * @param {!number|string} [settings.applicationId] id object id
     * @returns {geotoolkit.scene.Group} scene
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.initializeLayout = function(settings){};
    /**
     * Sets visible model limits
     * @param {geotoolkit.util.Rect} [limits] the visible model limits
     * @fires geotoolkit.widgets.AnnotatedWidget~ModelVisibleLimitsChanged
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.zoomToRect = function(limits){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect | object} bounds bound of the node in the parent coordinates
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setBounds = function(bounds){};
    /**
     * Refresh layout of inner components of the widget
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.refreshLayout = function(){};
    /**
     * Attempts to set local transformation for the model.
     * NOTE: the local transformation set may not be equal
     * to transformation passed - it depends on current
     * ScaleScrollStrategy set on the node.
     * @param {geotoolkit.util.Transformation} transformation transformation to set
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setModelTransformation = function(transformation){};
    /**
     * function call in the constructor to initialize tools in the widget<br>
     * This widget contains by default :<br>
     * - geotoolkit.controls.tools.CrossHair tool <br>
     * - geotoolkit.controls.tools.RubberBand tool <br>
     * - geotoolkit.controls.tools.Panning tool <br>
     * - geotoolkit.controls.tools.scroll.HorizontalScroll <br>
     * - geotoolkit.controls.tools.scroll.VerticalScroll <br>
     * @protected
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.initializeTools = function(){};
    /**
     * Attempts to set model's visible limits to specified limits.
     * NOTE: the limits set may not be equal
     * to the limit passed - it depends on current
     * ScaleScrollStrategy set on the node.
     * @param {geotoolkit.util.Rect} newVisibleModelLimits limits to set
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setVisibleModelLimits = function(newVisibleModelLimits){};
    /**
     * Translates widget's contents.
     * @param {number} tx x translation
     * @param {number} ty y translation
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     * @fires geotoolkit.widgets.AnnotatedWidget~ModelVisibleLimitsChanged
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.translateModel = function(tx, ty){};
    /**
     * Scale node's contents.
     *
     * @param {number} xx x scale factor
     * @param {number} yy y scale factor
     * @param {number} [posX] x position to scale from (in pxl)
     * @param {number} [posY] y position to scale from (in pxl)
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     * @fires geotoolkit.widgets.AnnotatedWidget~ModelVisibleLimitsChanged
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.scaleModel = function(xx, yy, posX, posY){};
    /**
     * Set the model limits of center model
     * @param {geotoolkit.util.Rect} modellimits model limits
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     * @fires geotoolkit.widgets.AnnotatedWidget~ModelVisibleLimitsChanged
     * @example
     * //artificially expand the widget model limits
     * var newLimits = new geotoolkit.util.Rect(0,0,10,10);
     * widget.setCenterModelLimits(newLimits);
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setCenterModelLimits = function(modellimits){};
    /**
     * Return model limits
     * @returns {geotoolkit.util.Rect|null} annotated model limits
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.getCenterModelLimits = function(){};
    /**
     * Returns visible model limits of the center model
     * @param {boolean} [ignoreModelLimits=false] flag defines whether to ignore model limits or not. By default this option is false and
     * visible limits will be intersected with center model limits
     * @returns {geotoolkit.util.Rect|null}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.getVisibleCenterModelLimits = function(ignoreModelLimits){};
    /**
     * Attempts to set model's visible limits to specified limits.
     * NOTE: the limits set may not be equal
     * to the limit passed - it depends on current
     * ScaleScrollStrategy set on the node.
     * @param {geotoolkit.util.Rect} newVisibleModelLimits limits to set
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     * @fires geotoolkit.widgets.AnnotatedWidget~ModelVisibleLimitsChanged
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setVisibleCenterModelLimits = function(newVisibleModelLimits){};
    /**
     * apply size (width or height) to annotation (convenience method)
     * @example
     * {
     * west : 50,
     * east : '10%',
     * south: 'auto'
     * }
     * @param {object} [annotationSize] JSON to hold (width or height) of the annotation
     * @param {object|string|number} [annotationSize.east] preferred width of east annotation size
     * @param {object|string|number} [annotationSize.south] preferred height of south annotation size
     * @param {object|string|number} [annotationSize.west] preferred width of west annotation size
     * @param {object|string|number} [annotationSize.north] preferred height of north annotation size
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setAnnotationSize = function(annotationSize){};
    /**
     * Return size of all annotations
     * @returns {object} sizes contains size of all annotations
     * @returns {number} [sizes.west] contains a west size
     * @returns {number} [sizes.east] contains a east size
     * @returns {number} [sizes.north] contains a north size
     * @returns {number} [sizes.south] contains a south size
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.getAnnotationSize = function(){};
    /**
     * Sets annotations' options. currently setAnnotationOptions can only modify existing annotation, while the constructor for the widget can create new ones.
     *
     * @param {object} options JSON to hold annotations' options
     * @param {object} [options.north] JSON to hold north annotation options
     * @param {number|string} [options.north.size] north annotation desired size (width for horizontal; height for vertical)
     * @param {object} [options.north.title] north annotation title options (see {@link geotoolkit.scene.shapes.Text}'s "setProperties" description for details)
     * @param {object} [options.north.axis] north annotation axis options (see {@link geotoolkit.axis.Axis}'s "setProperties" description for details)
     * @param {object} [options.east] JSON to hold east annotation options
     * @param {object} [options.south] JSON to hold south annotation options
     * @param {object} [options.west] JSON to hold west annotation options
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setAnnotationsOptions = function(options){};
    /**
     * Add title to annotation
     * @param {geotoolkit.layout.AnnotationLocation} location of the title
     * @param {object} options title options
     * @param {string} [options.text] text to display in title
     * @param {object | geotoolkit.attributes.TextStyle} options.textstyle textstyle of title
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.addTitle = function(location, options){};
    /**
     * set options for title
     * @param {geotoolkit.layout.AnnotationLocation} location of the title
     * @param {object} options title options
     * @param {string} [options.text] text to display in title
     * @param {object | geotoolkit.attributes.TextStyle} options.textstyle textstyle of title
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setTitleOptions = function(location, options){};
    /**
     * remove title in the location
     * @param {geotoolkit.layout.AnnotationLocation} location of the title
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.removeTitle = function(location){};
    /**
     * add new axis and connect with object
     * @param {geotoolkit.axis.Axis|object} axis new axis instance or options
     * @param {geotoolkit.layout.AnnotationLocation} location location of annotation for adding new axis
     * @param {geotoolkit.scene.Node} [connectedObject=null] connected object of axis*
     * @returns {object} obj
     * @returns {geotoolkit.axis.Axis} [obj.axis] axis instance
     * @returns {geotoolkit.scene.Group} [obj.group] axis parent group
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.addAxis = function(axis, location, connectedObject){};
    /**
     * remove axis
     * @param {geotoolkit.axis.Axis} axis axis to be removed
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.removeAxis = function(axis){};
    /**
     * Synchronizes object with a model
     *
     * @param {geotoolkit.scene.Group | geotoolkit.axis.Axis} object object to be synchronised
     * @param {geotoolkit.scene.Group} model source model
     * @param {geotoolkit.util.Orientation} [orientation] horizontal or vertical
     * @param {boolean} [autoSize] true if object and model share the same device size in the orientation, true by default if not specified
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.connect = function(object, model, orientation, autoSize){};
    /**
     * Disconnect an object from its source model
     *
     * @param {geotoolkit.scene.Group | geotoolkit.axis.Axis} object object to disconnect
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.disconnect = function(object){};
    /**
     * zoom in, with default factor = 5/4
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.zoomIn = function(){};
    /**
     * zoom out, with default factor = 5/4
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.zoomOut = function(){};
    /**
     * get model node
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.getModel = function(){};
    /**
     * fit bounds to model limits
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     * @fires geotoolkit.widgets.AnnotatedWidget~ModelVisibleLimitsChanged
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.fitToBounds = function(){};
    /**
     * attempts to translate the model using the specific x, y translation
     * @param {number} dx relative horizontal change
     * @param {number} dy relative vertical change
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     * @fires geotoolkit.widgets.AnnotatedWidget~ModelVisibleLimitsChanged
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.pan = function(dx, dy){};
    /**
     * set the scale scroll strategy to apply to the widget
     * @param {geotoolkit.scene.ScaleScrollStrategy | function() } delegate scaleScrollStrategy to set
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setScaleScrollStrategy = function(delegate){};
    /**
     * return the node at the specific annotation
     * @param {geotoolkit.layout.AnnotationLocation} location position to return the node for
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.getAnnotation = function(location){};
    /**
     * Export a part of the container to PDF
     * <p>This method sets automatically export scale and limits based on input parameters and current model scale and limits</p>
     * @param {object} [options=null] option to specify paper parameters and header and footer
     * @param {geotoolkit.scene.exports.HeaderComponent} [options.header = null] define optional header
     * @param {geotoolkit.scene.exports.FooterComponent} [options.footer = null] define optional header
     * @param {string} [options.output = 'PDF Output'] define optional output filename
     * @param {object} [options.printsettings] define optional paper and export parameters
     * @param {geotoolkit.scene.exports.AbstractPaperFormat|string} [options.printsettings.paperformat] define optional paper paper format
     * @param {number} [options.printsettings.top=0.85] define optional top margin
     * @param {number} [options.printsettings.bottom=0.85] define optional bottom margin
     * @param {number} [options.printsettings.left=1.1] define optional left margin
     * @param {number} [options.printsettings.right=1.1] define optional top margin
     * @param {string} [options.printsettings.orientation='Portrait'] define optional paper orientation
     * @param {string} [options.printsettings.scaling='AsIs'] define optional scaling mode
     * @param {boolean} [options.printsettings.keepaspectratio=true] keep aspect ratio
     * @param {boolean} [options.printsettings.continuous=false] continuous printing
     * @param {boolean} [options.printsettings.drawwesttoeast=true] draw pages from West to East
     * @param {geotoolkit.util.Rect} [options.modellimits] model limits that should be exported. By default the virtual limits
     * @param {object} [options.scale] export scale by default as is
     * @param {number} [options.scale.x] export scale by x
     * @param {number} [options.scale.y] export scale by y
     * @param {object} [options.imagecompression] options to specify the image compression
     * @param {geotoolkit.pdf.ImageCompression} [options.imagecompression.mode=geotoolkit.pdf.ImageCompression.AUTO] image compression method used to exporting pdf.
     * @param {number} [options.imagecompression.quality=1] quality range from 0 to 1 that will express the jpeg image compression quality, available for jpeg mode only.
     * @param {geotoolkit.pdf.SpeedCompression} [options.imagecompression.speed=geotoolkit.pdf.SpeedCompression.MEDIUM] speed referring to the png compression speed, available for png mode only.
     * @param {boolean} [options.streamcompression=true] enable or disable pdf output compression
     * @param {string} [options.output=null] the name of the file to be created
     * @param {boolean} [options.save=true] flag to save the stream directly to file or open dialog
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.exportToPdf = function(options){};
    /**
     * Return export limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.getExportLimits = function(){};
    /**
     * Sets export limits
     * @param {geotoolkit.util.Rect} limits export limits
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setExportLimits = function(limits){};
    /**
     * Sets export scale. By default scale is nto ste and equal to screen scale
     * @returns {?object} scale scale
     * @returns {number} scale.x scale by x form model to device
     * @returns {number} scale.y scale by y form model to device
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.getExportScale = function(){};
    /**
     * Sets export scale. By default scale is nto ste and equal to screen scale
     * @param {?object} scale scale
     * @param {number} scale.x scale by x form model to device
     * @param {number} scale.y scale by y form model to device
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setExportScale = function(scale){};
    /**
     * Prepares object before exporting and saving state
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.beginExport = function(){};
    /**
     * Restores object's state after exporting
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.endExport = function(){};
    /**
     * Returns exportable element
     * @param {object} [options] options
     * @param {geotoolkit.scene.exports.FooterComponent} [options.documentheader= null] an optional document PDF header
     * @param {geotoolkit.scene.exports.FooterComponent} [options.documentfooter= null] an optional document PDF footer
     * @returns {geotoolkit.scene.exports.AbstractDocumentElement} return exportable element
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.getExportElement = function(options){};
    /**
     * Set Tools Options
     *
     * @param {object} [options] JSON which defines tools options
     *
     * @param {object} [options.verticalscroll] JSON which defines vertical scroll bar
     * @param {string} [options.verticalscroll.type] vertical scroll bar type
     * @param {boolean} [options.verticalscroll.visible] vertical scroll bar visibility
     *
     * @param {object} [options.horizontalscroll] JSON which defines horizontal scroll bar
     * @param {string} [options.horizontalscroll.type] horizontal scroll bar type
     * @param {boolean} [options.horizontalscroll.visible] horizontal scroll bar visibility
     *
     * @param {object} [options.crosshair] JSON which defines crosshair cursor. See {geotoolkit.controls.tools.CrossHair.setSettings} for details
     *
     * @param {object} [options.panning] JSON which defines panning.
     * @param {boolean} [options.panning.enabled] is panning enabled
     *
     * @param {object} [options.rubberbandzoom] JSON which defines rubber band zoom. See {geotoolkit.controls.tools.RubberBand.setSettings} for details
     * @param {object} [options.selection] JSON which defines selection. See {geotoolkit.controls.tools.Selection.setSettings} for details
     * @param {boolean} [options.selection.resetselection] does the selection resets between two picks
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     * @example
     * //To prevent the selection tool from deselecting the previously selected points, for example user can do the following:
     * annotatedWidget.setToolsOptions({
     * 'selection': {
     * 'resetselection': false
     * }
     * });
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setToolsOptions = function(options){};
    /**
     * Gets all the properties pertaining to this object
     * (getData needs to be defined)
     * See {@link geotoolkit.widgets.AnnotatedWidget.getProperties} for details
     * @returns {object} props JSON containing properties
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * (setData needs to be defined)
     * @param {object} [properties] JSON containing properties
     * @param {geotoolkit.attributes.FillStyle} [properties.backgroundfillstyle] deprecated since 2.6 use [properties.fillstyle] instead, see {@link geotoolkit.scene.Group#setProperties}
     * @param {object} [properties.annotationssizes] see {@link geotoolkit.widgets.AnnotatedWidget#setAnnotationSize}
     * @param {object} [properties.tools] see {@link geotoolkit.widgets.AnnotatedWidget#setToolsOptions}
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setProperties = function(properties){};
    /**
     * get options
     * @param {object|undefined} getDataOptions how to extract data, by default undefined
     * @returns {object}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.getData = function(getDataOptions){};
    /**
     * Sets data
     * @param {object} data data and widget properties
     * @returns {geotoolkit.widgets.AnnotatedWidget}
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.setData = function(data){};
    /**
     * Saves tools state
     * @returns {geotoolkit.widgets.AnnotatedWidget} this
     */
    geotoolkit.widgets.AnnotatedWidget.prototype.saveToolsState = function(){};

/**
 * The crossplot widget is an annotated widget that is specialized for cross plot representations.
 * <p>
 * Cross plot is a two dimensional chart, that uses horizontal and vertical axes to plot the data points. <br/>
 * Cross plot shows how much one variable is affected by another. The relationship between two variables is called their correlation. </br>
 * Cross plots usually consist of a large body of data. <br>
 * </p>
 * <p>
 * It uses {@link geotoolkit.controls.shapes.CrossPlot} internally.
 * setOptions() API can be used to configure and customize the widget. It provides a comprehensible way of changing the default look and feel of the widget.
 * </p>
 * <p>
 * It reuses the default <b>tools</b> provided by the {@link geotoolkit.widgets.AnnotatedWidget} and customizes them for crossplot related operations.
 * It also provides utility functions to highlight points in a given area (or by index)<br>
 * Selection function not only selects crossplot shapes but also provides selected point index.
 * </p>
 * <p>
 * The crossplot can represent 3 dimesions: X, Y, and color of datasets.
 * By default, crossplot can contain only a single dataset.
 * Another dataset could also be added on top of it as long as its modellimits and bounds are also managed independently.
 * The color of each point can be defined using a {@link geotoolkit.util.ColorProvider}
 * and the corresponding {@link geotoolkit.controls.shapes.ColorBar} can be displayed.
 *
 * </p>
 *
 * @class geotoolkit.widgets.CrossPlot
 * @augments geotoolkit.widgets.AnnotatedWidget
 * @param {object} [options] options to initialize crossplot
 * @param {geotoolkit.util.Rect} [options.bounds] where to place the XPlot
 * @param {object} [options.border] defines properties for widget outer border
 * @param {object} [options.border.color] color of border border
 * @param {boolean} [options.viewcache=true] enable tiled cache. It increase rendering performance for geometry used to represent data history
 * @param {object} [options.viewcachesize] viewcachesize
 * @param {object} [options.viewcachesize.width=256] set tiled cache size.
 * @param {object} [options.viewcachesize.height=256] set tiled cache size.
 * @example
 * <caption>1). Initialize Widget</caption>
 * // Create the widget
 * var widget = new geotoolkit.widgets.CrossPlot({
 * 'tools': {
 * 'horizontalscroll': {
 * 'visible': false
 * },
 * 'verticalscroll': {
 * 'visible': false
 * }
 * }
 * });
 *
 * // Set Data ( It is recommended that this function is used only for data related operations. For visual options use setOptions() function.
 * widget.setData({
 * 'x': {
 * 'data': [150, 180, 300, 440, 500, 680, 55, 67, 600, 400, 400, 580, 650, 6, 75, 8, 8.5, 8, 6.2, 9, 2, 6.5, 6.9, 6.2,6],
 * 'min': 0,
 * 'max': 1000,
 * 'logarithmic': true,
 * 'label': Curve 1
 * },
 * 'y': {
 * 'data': [2, 3, 5, 7, 8, 6.4, 7.6, 7, 5, 40, 8, 9, 7.4, 5.5, 5, 6, 7, 3, 1.6, 3, 6.5, 4, 5, 6, 8],
 * 'min': 0,
 * 'max': 100,
 * 'logarithmic': true,
 * 'label': Curve 2
 * },
 * 'z': {
 * 'min': 0,
 * 'max': 10,
 * 'logarithmic': false,
 * 'label': Z color
 * }
 * });
 */
geotoolkit.widgets.CrossPlot = {};
    /**
     * @override
     */
    geotoolkit.widgets.CrossPlot.prototype.dispose = function(){};
    /**
     * Refresh layout of inner components of the widget
     * @returns {geotoolkit.widgets.CrossPlot}
     */
    geotoolkit.widgets.CrossPlot.prototype.refreshLayout = function(){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect | object} bounds bound of the node in the parent coordinates
     * @returns {geotoolkit.widgets.CrossPlot} this
     */
    geotoolkit.widgets.CrossPlot.prototype.setBounds = function(bounds){};
    /**
     * function call in the constructor to initialize tools in the widget <br>
     * This widget adds a selection filter. This filter is used to send a object that contains the crossplot shape reference and
     * an array of indices that represents selected shapes.
     *
     * @override
     * @returns {geotoolkit.widgets.CrossPlot}
     * @protected
     */
    geotoolkit.widgets.CrossPlot.prototype.initializeTools = function(){};
    /**
     * Sets data options (for non-data parameters use CrossPlot.prototype.setOptions)
     * @param {object} [data] options and data
     * @param {object | geotoolkit.util.Rect} [data.bounds] bounds. See {@link geotoolkit.util.Rect.setProperties} for details.
     * @param {object} [data.header] JSON which defines header area
     * @param {object} [data.header.title] JSON which defines main title. See {@link geotoolkit.attributes.TextStyle.setProperties} for details.
     * @param {number} [data.header.annotationsize] height of header
     * @param {geotoolkit.util.ColorProvider} [data.colorprovider] ColorProvider used to color the data
     * @param {object} [data.x] JSON which defines X-data.
     * @param {geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [data.x.datasource] DataSource of X-data
     * @param {boolean} [data.x.autominmax] are X min/max fixed (false) or given by datasource (true). X DataSource has to exist
     * @param {Array<number>} [data.x.data] Array of X-data
     * @param {object} [data.x.label] JSON which defines X-label. See {@link geotoolkit.attributes.TextStyle.setProperties} for details.
     * @param {number} [data.x.annotationsize] height of X-annotation
     * @param {number} [data.x.min] Minimum X-Value to display X-data. If never set, will be min of [data.x.data]
     * @param {number} [data.x.max] Maximum X-Value to display X-data. If never set, will be max of [data.x.data]
     * @param {boolean} [data.x.reversed] Is the X-Axis reversed. If never set, will be true if [data.x.max]<[data.x.min]
     * @param {boolean} [data.x.logarithmic] Is the X-Axis logarithmic. default is false
     * @param {object} [data.x.axisticks] JSON which defines ticks options of the X-axis. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {object} [data.x.gridticks] JSON which defines vertical ticks options of the grid. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {object} [data.x.histogram] JSON which defines histogram properties
     * @param {boolean} [data.x.histogram.visible] Is the histogram visible (default is false)
     * @param {string} [data.x.histogram.color] deprecated rgba color to be used
     * @param {?geotoolkit.attributes.FillStyle|object} [data.x.histogram.fillstyle] fill style to be used
     * @param {?geotoolkit.attributes.LineStyle|object} [data.x.histogram.linestyle] line style to be used
     * @param {number} [data.x.histogram.bins] number of bins to be used (default is 25)
     *
     * @param {object} [data.y] JSON which defines Y-data.
     * @param {geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [data.y.datasource] DataSource of Y-data
     * @param {boolean} [data.y.autominmax] are Y min/max fixed (false) or given by datasource (true). Y DataSource has to exist
     * @param {Array<number>} [data.y.data] Array of Y-data
     * @param {object} [data.y.label] JSON which defines Y-label. See {@link geotoolkit.scene.shapes.Text.setProperties} for details.
     * @param {number} [data.y.annotationsize] width of Y-annotation
     * @param {number} [data.y.min] Minimum Y-Value to display Y-data. If never set, will be min of [data.y.data]
     * @param {number} [data.y.max] Maximum Y-Value to display Y-data. If never set, will be max of [data.y.data]
     * @param {boolean} [data.y.reversed] Is the Y-Axis reversed. If never set, will be true if [data.y.max]>[data.y.min]
     * @param {boolean} [data.y.logarithmic] Is the Y-Axis logarithmic. default is false
     * @param {object} [data.y.axisticks] JSON which defines ticks options of the Y-axis. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {object} [data.y.gridticks] JSON which defines horizontal ticks options of the grid. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {object} [data.y.histogram] JSON which defines histogram properties
     * @param {boolean} [data.y.histogram.visible] Is the histogram visible (default is false)
     * @param {string} [data.y.histogram.color] deprecated rgba color to be used
     * @param {?geotoolkit.attributes.FillStyle|object} [data.y.histogram.fillstyle] fill style to be used
     * @param {?geotoolkit.attributes.LineStyle|object} [data.y.histogram.linestyle] line style to be used
     * @param {number} [data.y.histogram.bins] number of bins to be used (default is 25)
     *
     * @param {object} [data.z] JSON which defines Z-data.
     * @param {geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [data.z.datasource] DataSource of Z-data
     * @param {boolean} [data.z.autominmax] are Z min/max fixed (false) or given by datasource (true). Z DataSource has to exist
     * @param {Array<number>} [data.z.data] Array of Z-data
     * @param {object} [data.z.label] JSON which defines Z-label. See {@link geotoolkit.scene.shapes.Text.setProperties} for details.
     * @param {number} [data.z.annotationsize] width of Z-annotation
     * @param {number} [data.z.min] Minimum Z-Value of Z-data colorbox. If never set, will be min of [data.z.data]
     * @param {number} [data.z.max] Maximum Z-Value of Z-data colorbox. If never set, will be max of [data.z.data]
     * @param {boolean} [data.z.reversed] Is the Z-Axis reversed. If never set, will be true if [data.z.max]>[data.z.min]
     * @param {boolean} [data.z.logarithmic] Is the Z-Axis colorbox logarithmic. default is false
     * @param {object} [data.z.axisticks] JSON which defines ticks options of the Z-axis. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {boolean} [data.z.legendvisible] legend visibility
     *
     * @param {object} [data.marker] JSON which defines marker options
     * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [data.marker.painter] painter style
     * @param {number} [data.marker.size] marker size
     * @param {string} [data.marker.defaultcolor] default color
     * @param {string} [data.marker.defaultlinecolor] default line color
     * @param {string} [data.marker.highlightcolor] highlight color
     * @param {string} [data.marker.highlightsize] size of the highlighted markers
     *
     * @param {object} [data.tools] JSON which defines tools options. See {@link geotoolkit.widgets.CrossPlot.setToolsOptions} for details
     * @returns {geotoolkit.widgets.CrossPlot} this
     */
    geotoolkit.widgets.CrossPlot.prototype.setData = function(data){};
    /**
     * get options
     * @param {null|Object} getDataOptions how to extract data, null by default
     * @param {boolean} [getDataOptions.no-data] in case of you will not get Array of X, Y and Z-data
     * @returns {object}
     */
    geotoolkit.widgets.CrossPlot.prototype.getData = function(getDataOptions){};
    /**
     * Sets specific non-data options for the visuals like header, marker color etc.
     * @param {object} [data] options to apply
     * @param {object} [data.header] JSON which defines header area
     * @param {object} [data.marker] JSON which defines marker options
     * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [data.marker.painter] painter style
     * @param {number} [data.marker.size] marker size
     * @param {string} [data.marker.defaultcolor] default color
     * @param {string} [data.marker.defaultlinecolor] default line color
     * @param {string} [data.marker.highlightcolor] highlight color
     * @param {string} [data.marker.highlightsize] size of the highlighted markers
     * @param {geotoolkit.util.ColorProvider} colorprovider defines the color provider for the markers.
     * @returns {geotoolkit.widgets.CrossPlot} this
     * @example
     * crossplotwidget.setOptions({
     * 'colorprovider': new geotoolkit.util.DiscreteGradientColorProvider({
     * 'bins': 255
     * }).setScale(geotoolkit.util.ColorProvider.KnownScales.Winter, 1, 7)
     * });
     */
    geotoolkit.widgets.CrossPlot.prototype.setOptions = function(data, colorprovider){};
    /**
     * Gets visual options
     * @returns {object} [options]
     *
     * @returns {object} [options.header] JSON which contains header definition
     * @returns {object} [options.header.title] JSON which contains main title definition. See {@link geotoolkit.attributes.TextStyle.getProperties} for details.
     * @returns {number} [options.header.annotationsize] height of header
     *
     * @returns {geotoolkit.util.ColorProvider} [options.colorprovider] color provider used for widget
     *
     * @returns {object} [options.marker]
     * @returns {geotoolkit.scene.shapes.painters.AbstractPainter} [options.marker.painter] painter style
     * @returns {number} [options.marker.size] marker size
     * @returns {string} [options.marker.defaultcolor] default color
     * @returns {string} [options.marker.defaultlinecolor] default line color
     * @returns {string} [options.marker.highlightcolor] highlight color
     * @returns {string} [options.marker.highlightsize] size of highlighted markers
     *
     * @returns {object} [options.tools] JSON which contains tools options. See {@link geotoolkit.widgets.AnnotatedWidget.getToolsOption} for details
     */
    geotoolkit.widgets.CrossPlot.prototype.getOptions = function(){};
    /**
     * Set marker Options
     *
     * @param {object} [data] JSON which defines marker options
     * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [data.painter] painter style
     * @param {number} [data.size] marker size
     * @param {string} [data.defaultcolor] default color
     * @param {string} [data.defaultlinecolor] default line color
     * @param {string} [data.highlightcolor] highlight color
     * @param {string} [data.highlightsize] highlight symbol size. it equals to symbols size by default
     * @returns {geotoolkit.widgets.CrossPlot} this
     */
    geotoolkit.widgets.CrossPlot.prototype.setMarkerOptions = function(data){};
    /**
     * Get marker Options
     * @returns {Object} data
     * @returns {geotoolkit.scene.shapes.painters.AbstractPainter | string} data.painter painter style
     * @returns {number} data.size marker size
     * @returns {string} data.defaultcolor default color of marker
     * @returns {string} data.defaultlinecolor default line color or marker
     * @returns {number} data.highlightsize highlight symbol size, by default it is equal to the symbol size
     */
    geotoolkit.widgets.CrossPlot.prototype.getMarkerOptions = function(){};
    /** Set Options for Header
     * @param {object} [options] JSON which defines header area
     * @param {object} [options.title] JSON which defines main title. See {@link geotoolkit.attributes.TextStyle.setProperties} for details.
     * @param {number} [options.annotationsize] height of header
     * @returns {geotoolkit.widgets.CrossPlot} this
     */
    geotoolkit.widgets.CrossPlot.prototype.setHeaderOptions = function(options){};
    /**
     * Get Options for Header
     * @returns {Object} data
     * @returns {Object} [data.title] JSON which defines main title. See geotoolkit.attributes.TextStyle.setProperties for details.
     * @returns {number} [data.annotationsize] height of header
     */
    geotoolkit.widgets.CrossPlot.prototype.getHeaderOptions = function(){};
    /**
     * Set Parameters for axis
     * @param {string} axis axis to apply ('x', 'y' or 'z')
     * @param {object} [data] JSON which defines data.
     * @param {Array.<number>} [data.data] Array of data
     * @param {(geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView|null)} [data.datasource] DataSource of data
     * @param {(geotoolkit.util.AbstractUnit|string|null)} [data.unit] display unit
     * @param {boolean} [data.autominmax] are min/max fixed (false) or given by datasource (true). DataSource has to exist
     * @param {object} [data.label] JSON which defines label. See {@link geotoolkit.attributes.TextStyle.setProperties} for details.
     * @param {number} [data.annotationsize] width or height of annotation
     * @param {number} [data.min] Minimum Value to display data. If never set, will be min of [options.data]
     * @param {number} [data.max] Maximum Value to display data. If never set, will be max of [options.data]
     * @param {boolean} [data.neatlimits] Calculate smart limits for linear mode. For logarithmic mode it is disabled
     * @param {boolean} [data.minspan] axis min span for smart limits. It works if neatlimits is true
     * @param {boolean} [data.reversed] Is the Axis reversed.
     * @param {boolean} [data.logarithmic] Is the Axis logarithmic. default is false
     * @param {geotoolkit.axis.TickGenerator} [data.tickgenerator] a custom tickgenerator for this axis
     * @param {object} [data.axisticks] JSON which defines ticks options of the axis. See {@link geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {object} [data.gridticks] JSON which defines horizontal ticks options of the grid (X or Y axis only). See {@link geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {boolean} [data.legendvisible] legend visibility (Z only)
     * @param {object} [data.histogram] JSON which defines histogram properties (X or Y axis only)
     * @param {boolean} [data.histogram.visible] Is the histogram visible (default is false) (X or Y axis only)
     * @param {string} [data.histogram.color] deprecated, rgba color to be used (X or Y axis only)
     * @param {?geotoolkit.attributes.FillStyle|object} [data.histogram.fillstyle] fillstyle to be used (X or Y axis only)
     * @param {?geotoolkit.attributes.LineStyle|object} [data.histogram.linestyle] linestyle to be used (X or Y axis only)
     * @param {number} [data.histogram.bins=25] number of bins to be used (default is 25) (X or Y axis only)
     * @param {object} [xplotData] optional data
     * @returns {geotoolkit.widgets.CrossPlot} this
     */
    geotoolkit.widgets.CrossPlot.prototype.setAxisDataOptions = function(axis, data, xplotData){};
    /**
     * Get axis options
     * @param {string} axis axis to get options
     * @param {null | object} getDataOptions how to extract data, null by default
     * @param {boolean} [getDataOptions.no-data] in case of you will not get Array of X, Y and Z-data
     * @returns {object}
     */
    geotoolkit.widgets.CrossPlot.prototype.getAxisDataOptions = function(axis, getDataOptions){};
    /**
     * Sets color provider
     * @param {?geotoolkit.util.ColorProvider} [cp] color provider
     * @param {boolean|null} log flag to determine if it has been in logarithmic mode
     * @returns {geotoolkit.widgets.CrossPlot}
     */
    geotoolkit.widgets.CrossPlot.prototype.setColorProvider = function(cp, log){};
    /**
     * Returns color provider
     * @returns {?geotoolkit.util.ColorProvider} color provider
     */
    geotoolkit.widgets.CrossPlot.prototype.getColorProvider = function(){};
    /**
     * Gets Highlighted Indices
     * @param {string} [name] name of the selection
     * @returns {Array.<number>} array of indices
     */
    geotoolkit.widgets.CrossPlot.prototype.getHighlightedIndices = function(name){};
    /**
     * Highlights the selected area
     * @param {geotoolkit.util.Point | geotoolkit.util.Rect} rect search area
     * @param {boolean} reset un-highlights previously selected indices
     */
    geotoolkit.widgets.CrossPlot.prototype.highlightArea = function(rect, reset){};
    /**
     * Highlights the selected indices
     * @param {Array.<number>|object} indices to be highlighted
     * @param {boolean} reset un-highlights previously selected indices
     * @returns {geotoolkit.widgets.CrossPlot} this
     */
    geotoolkit.widgets.CrossPlot.prototype.highlightIndices = function(indices, reset){};
    /**
     * Return indices in search area
     * @param {geotoolkit.util.Point | geotoolkit.util.Rect} rect search area
     * @returns {Array<number>} array of indices
     */
    geotoolkit.widgets.CrossPlot.prototype.getIndicesAt = function(rect){};
    /**
     * Set Tools Options
     * See {@link geotoolkit.widgets.AnnotatedWidget.setToolsOptions} for details
     * @param {object} options tools options
     * @returns {geotoolkit.widgets.CrossPlot} this
     */
    geotoolkit.widgets.CrossPlot.prototype.setToolsOptions = function(options){};
    /**
     * Switch on ColorBarCursorTool
     * @param {geotoolkit.controls.tools.ColorBarCursorTool.SymbolAlignment} [symbolAlignment] direction of symbol
     * @param {number} [offset] offset
     * @param {geotoolkit.scene.shapes.Symbol} [symbol] symbol for colorbar cursor
     * @returns {geotoolkit.widgets.CrossPlot} this
     */
    geotoolkit.widgets.CrossPlot.prototype.switchOnCursorTool = function(symbolAlignment, offset, symbol){};

/**
 * The Histogram widget is an annotated widget that is specialized for histogram representations.It uses {@link geotoolkit.controls.shapes.Histogram} internally.
 * <p>
 * A histogram is a graphical display of tabulated frequencies, shown as bars. It shows what proportion of cases fall into each of several categories.
 * The categories are usually specified as non-overlapping intervals of some variable. The categories are adjacent. The intervals (or bands) should ideally be of the same size
 * </p>
 * <p>
 * </p>
 * <p>
 * The main way to configure and customize the widget is to use the different setOptions() function that provides a comprehensible way of changing the default look and feel of the widget.
 * This widget by default, allows horizontally zoom only.
 * </p>
 * <p>
 * It reuses the default tools provided by the AnnotatedWidget and customize them for histogram related operations.
 * <ul>
 * <li> rubberzoom: limits the zoom direction to horizontal only.</li>
 * <li> selection: Selects only histogram shapes but provides selected bin index </li>
 * </ul>
 * It also provides utility functions to highlight bin in a given range (or by index). The histogram widget can display and manage several histograms at once, overlapping them.
 * It also provides an 'accumulative' curve feature and can generate statistics.
 * </p>
 *
 * @class geotoolkit.widgets.Histogram
 * @augments geotoolkit.widgets.AnnotatedWidget
 * @param {object} [options]
 * @param {geotoolkit.util.Rect} [options.bounds] where to place the XPlot
 * @param {object} [options.border] defines properties for widget outer border
 * @param {object} [options.border.color] color of border
 * @example
 * <caption> 1). Initialize Widget </caption>
 * // Create the widget
 * var widget = new geotoolkit.widgets.Histogram({
 * 'bounds': new geotoolkit.util.Rect(0, 0, 800, 400), // set the bounds as required.
 * 'tools': {
 * 'horizontalscroll': {'visible': false},
 * 'verticalscroll': {'visible': false}
 * },
 * 'header': {
 * 'title': {'visible': true,
 * 'text': 'Custom Title'
 * },
 * 'x': {
 * 'label': {
 * 'text': 'x axis'
 * },
 * 'annotationsize': 50
 * },
 * 'binspacing': 90
 * });
 *
 * // Set the data for the widget.
 * widget.setData({
 * 'data': [1000, 1100, 1800, 2000, 2200, 2300, 2210, 2200, 2400, 2100, 2200, 2000, 3000,
 * 3500, 3100, 3150, 3090, 4100, 4000, 4500, 4125, 4400, 4500, 4600, 4650, 4300, 5000,
 * 5555, 5100, 5125, 5200, 6100, 6000, 6500, 7000, 7400, 7900, 8000, 9000, 9500],
 * 'x': {
 * 'label': {
 * 'text': 'Depth(ft)'
 * },
 * 'min': 1000,
 * 'max': 10000,
 * 'neatlimits': false
 * },
 * 'y': {
 * 'label': {
 * 'text': 'Number of Wells'
 * },
 * 'min': 0,
 * 'max': 10,
 * 'neatlimits': false
 * },
 * 'bins': 10,
 * 'binspacing': 95
 * });
 * @example
 *
 * // 2). CSS rules can be applied to the Histogram widget in order to customize it.
 * var css = [
 ' .Histogram { ',
 * ' x-axisticks-major-labelstyle-font: 11px Roboto; ',
 * ' y-axisticks-major-labelstyle-font: 11px Roboto; ',
 * ' x-axisticks-major-labelstyle-color: rgba(128,128,128,.7); ',
 * ' y-axisticks-major-labelstyle-color: rgba(128,128,128,.7); ',
 * ' fillstyle-color: #5b9bd5;',
 * ' header-annotationsize: 0;',
 * ' backgroundfillstyle-color: #2d353c;',
 * '}'
 * ].join('\n');
 * widget.setCss(new geotoolkit.css.CssStyle({'css': css}));
 *
 */
geotoolkit.widgets.Histogram = {};
    /**
     * Histogram Widget's Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.widgets.Histogram.Events = {};
        /**
         * Event type fired when this models data has been updated
         * @type {string}
         */
        geotoolkit.widgets.Histogram.Events.DataUpdated = "";
    /**
     * @override
     */
    geotoolkit.widgets.Histogram.prototype.dispose = function(){};
    /**
     * Add a new histogram
     * @protected
     */
    geotoolkit.widgets.Histogram.prototype.addHistogram = function(){};
    /**
     * @param {number|null} [index=null] index of the histogram or active index.
     * @returns {geotoolkit.controls.shapes.Histogram} the current active histogram
     * @protected
     */
    geotoolkit.widgets.Histogram.prototype.getHistogram = function(index){};
    /**
     * Initialize tools
     * @returns {geotoolkit.widgets.Histogram}
     * @protected
     */
    geotoolkit.widgets.Histogram.prototype.initializeTools = function(){};
    /**
     * update tools according to the orientation of widget
     */
    geotoolkit.widgets.Histogram.prototype.updateTools = function(){};
    /**
     * get orientation
     * @returns {geotoolkit.util.Orientation}
     */
    geotoolkit.widgets.Histogram.prototype.getOrientation = function(){};
    /**
     * set orientation
     * @param {geotoolkit.util.Orientation} orientation orientation
     * @returns {geotoolkit.widgets.Histogram}
     */
    geotoolkit.widgets.Histogram.prototype.setOrientation = function(orientation){};
    /**
     * Sets options and/or data
     * @param {object} [data] data
     * @param {object | geotoolkit.util.Rect} [data.bounds] bounds. See {@link geotoolkit.util.Rect.setProperties} for details.
     * @param {object} [data.header] JSON which defines header area
     * @param {object} [data.header.title] JSON which defines main title.
     * @param {number} [data.header.annotationsize] height of header
     *
     * @param {geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView} [data.datasource] DataSource
     * @param {boolean} [data.autominmax] are X min/max fixed (false) or given by datasource (true). DataSource has to exist
     * @param {Array<number>} [data.data] Array of data
     * @param {number} [data.bins] Number of bins
     * @param {number} [data.binspacing = 100] bin spacing in percentage
     * @param {object | geotoolkit.attributes.FillStyle} [data.fillstyle] Bins FillStyle. See {@link geotoolkit.attributes.FillStyle.setProperties} for details.
     * @param {boolean} [data.autogradient] FillStyle autogradient
     * @param {object | geotoolkit.attributes.LineStyle} [data.linestyle] Bins LineStyle. See {@link geotoolkit.attributes.LineStyle} for details.
     * @param {geotoolkit.controls.shapes.Histogram.FrequencyType|string} [data.frequencytype] Frequency Type
     * @param {string} [data.highlightcolor] Color used to highlight bins
     * @param {object} [data.accumulation] JSON for accumulation curve.
     * @param {boolean} [data.accumulation.visible] Visibility of accumulation curve.
     * @param {object} [data.accumulation.linestyle] JSON for accumulation curve.
     *
     * @param {object} [data.x] JSON which defines X-data.
     * @param {object} [data.x.label] JSON which defines X-label.
     * @param {number} [data.x.annotationsize] height of X-annotation
     * @param {number} [data.x.min] Minimum X-Value to display X-data. If never set, will be min of [data.x.data]
     * @param {number} [data.x.max] Maximum X-Value to display X-data. If never set, will be max of [data.x.data]
     * @param {boolean} [data.x.reversed] Is the X-Axis reversed. If never set, will be true if [data.x.max]<[data.x.min]
     * @param {object} [data.x.axisticks] JSON which defines ticks data of the X-axis. See {geotoolkit.axis.TickGenerator.setdata} for details
     * @param {object} [data.x.gridticks] JSON which defines vertical ticks data of the grid. See {geotoolkit.axis.TickGenerator.setdata} for details
     * @param {geotoolkit.axis.TickGenerator} [data.x.tickgenenerator=null] a custom tick generator
     *
     * @param {object} [data.y] JSON which defines Y-data.
     * @param {object} [data.y.label] JSON which defines Y-label.
     * @param {number} [data.y.annotationsize] width of Y-annotation
     * @param {string} [data.y.annotationside='both'] specifies which side should have axes. By default 'both' means from left and right
     * @param {number} [data.y.min] Minimum Y-Value to display Y-data. If never set, will be min of [data.y.data]
     * @param {number} [data.y.max] Maximum Y-Value to display Y-data. If never set, will be max of [data.y.data]
     * @param {boolean} [data.y.reversed] Is the Y-Axis reversed. If never set, will be true if [data.y.max]>[data.y.min]
     * @param {object} [data.y.axisticks] JSON which defines ticks data of the Y-axis.
     * @param {object} [data.y.gridticks] JSON which defines horizontal ticks data of the grid.
     * @param {geotoolkit.axis.TickGenerator} [data.y.tickgenenerator=null] a custom tick generator
     * @param {object} [data.tools] JSON which defines tools data. See {@link geotoolkit.widgets.AnnotatedWidget.setToolsOptions} for details
     * @returns {geotoolkit.widgets.Histogram} this
     */
    geotoolkit.widgets.Histogram.prototype.setData = function(data){};
    /**
     * get options
     * @param {null|Object} getDataOptions how to extract data, null by default
     * @param {boolean} [getDataOptions.no-data] in case of you will not get Array of X-data and Y-data
     * @returns {object}
     */
    geotoolkit.widgets.Histogram.prototype.getData = function(getDataOptions){};
    /**
     * Set Options for Header
     * @param {object} [data] JSON which defines header area
     * @param {object} [data.title] JSON which defines main title.
     * @param {number} [data.annotationsize] height of header
     * @returns {geotoolkit.widgets.Histogram} this
     */
    geotoolkit.widgets.Histogram.prototype.setHeaderOptions = function(data){};
    /**
     * Returns calculated statistics of values
     - Data samples count
     - min sample value
     - max sample value
     - average value
     - variance value
     - average deviation value
     - standard deviation value
     - skewness value
     - standard kurtosis value
     - Theoretical P10 value (centile)
     - Theoretical P50 value (centile)
     - Theoretical P90 value (centile)
     * @returns {Array} statistics
     */
    geotoolkit.widgets.Histogram.prototype.getStatistics = function(){};
    /**
     * Maximum frequency
     * @returns {number}
     */
    geotoolkit.widgets.Histogram.prototype.getMaxFrequency = function(){};
    /**
     * Get lowest value
     *
     * @returns {number} minValue
     */
    geotoolkit.widgets.Histogram.prototype.getMinValue = function(){};
    /**
     * Get highest data value
     *
     * @returns {number} max value
     */
    geotoolkit.widgets.Histogram.prototype.getMaxValue = function(){};
    /**
     * Get Options for Header
     * @returns {Object} data
     * @returns {Object} [data] JSON which defines header area
     * @returns {Object} [data.title] JSON which defines main title.
     * @returns {number} [data.annotationsize] height of header
     */
    geotoolkit.widgets.Histogram.prototype.getHeaderOptions = function(){};
    /**
     * Set Parameters for axis
     * @param {string} axis axis to apply ('x' or 'y')
     * @param {object} [data] JSON which defines data.
     * @param {object} [data.label] JSON which defines label.
     * @param {number} [data.annotationsize] width or height of annotation
     * @param {number} [data.min] Minimum Value to display data. If never set, will be min of [options.data]
     * @param {number} [data.max] Maximum Value to display data. If never set, will be max of [options.data]
     * @param {boolean} [data.neatlimits] Calculate smart limits
     * @param {boolean} [data.neatlimitscenteredonzero] Center the smart limits on zero
     * @param {boolean} [data.reversed] Is the Axis reversed.
     * @param {object} [data.axisticks] JSON which defines ticks options of the axis. See {geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {object} [data.gridticks] JSON which defines horizontal ticks options of the grid. See {geotoolkit.axis.TickGenerator.setOptions} for details
     * @returns {geotoolkit.widgets.Histogram} this
     */
    geotoolkit.widgets.Histogram.prototype.setAxisDataOptions = function(axis, data){};
    /**
     * get axis options
     * @param {string} axis The name of the axis
     * @param {object} getDataOptions how to extract data, null by default
     * @param {boolean} [getDataOptions.no-data] in case of you will not get Array of X-data and Y-data
     * @returns {Object}
     */
    geotoolkit.widgets.Histogram.prototype.getAxisDataOptions = function(axis, getDataOptions){};
    /**
     * on DataSource Axis change listener
     * @param {string} event DataObject event
     * @param {geotoolkit.data.DataSeries} src data series
     * @param {Object} data data
     * @returns {geotoolkit.widgets.Histogram} this
     **/
    geotoolkit.widgets.Histogram.prototype.onAxisChanged = function(event, src, data){};
    /**
     * Gets Highlighted Bins
     * @returns {Array.<number>}
     */
    geotoolkit.widgets.Histogram.prototype.getHighlightedBins = function(){};
    /**
     * Highlights the selected area
     * @param {geotoolkit.util.Point | geotoolkit.util.Range} rect area
     * @param {boolean} reset un-highlights previously selected indices
     */
    geotoolkit.widgets.Histogram.prototype.highlightRange = function(rect, reset){};
    /**
     * Highlights the selected indices
     * @param {Array<number>} indices to be highlighted
     * @param {boolean} reset un-highlights previously selected indices
     * @returns {geotoolkit.widgets.Histogram} this
     */
    geotoolkit.widgets.Histogram.prototype.highlightBins = function(indices, reset){};
    /**
     * Set Tools Options
     * See {@link geotoolkit.widgets.AnnotatedWidget.setToolsOptions} for details
     * @param {Object} [options] options
     * @returns {geotoolkit.widgets.Histogram} this
     */
    geotoolkit.widgets.Histogram.prototype.setToolsOptions = function(options){};
    /**
     * Load template
     * @param {string} template template to be applied to the widget
     * @param {geotoolkit.persistence.Registry} [registry=geotoolkit.widgets.templates.HistogramRegistry] registry
     */
    geotoolkit.widgets.Histogram.prototype.loadTemplate = function(template, registry){};
    /**
     * Save template
     * @param {geotoolkit.persistence.Registry} [registry=geotoolkit.widgets.templates.HistogramRegistry] registry
     * @returns {string}
     */
    geotoolkit.widgets.Histogram.prototype.saveTemplate = function(registry){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} [properties] JSON containing properties see {@link geotoolkit.widgets.AnnotatedWidget#setProperties}
     * @returns {geotoolkit.widgets.Histogram}
     */
    geotoolkit.widgets.Histogram.prototype.setProperties = function(properties){};

/**
 * The multihistograms widget is a container to wrap multiple histograms into one widget
 * and mange axes, selection and model limits for different histograms.
 * see more details about initialization of widget in constructor of geotoolkit.widgets.AnnotatedWidget
 *
 * @class geotoolkit.widgets.MultiHistograms
 * @augments geotoolkit.widgets.AnnotatedWidget
 * @param {object} options
 * @param {object} [options.header] options for setting header of widget, see {@link geotoolkit.widgets.MultiHistograms#setHeader}
 * @param {number} [options.axiswidth=40] default width when adding new vertical axis
 * @param {number} [options.axisheight=40] default height when adding new horizontal axis
 * @param {object} [options.annotationsgaps] options for setting gaps between annotations and center model, see details in setGaps method
 * @param {boolean} [options.autoannotationsize=true] auto modify the size of annotation based on the total size of component in the annotation
 * @param {object} [options.tools] options for tools setting, see details in setToolsOptions method
 * @param {number} [options.annotationssizes.east=50] JSON to hold east annotation size
 * @param {number} [options.annotationssizes.south=90] JSON to hold south annotation size
 * @param {number} [options.annotationssizes.west=75] JSON to hold west annotation size
 * @param {number} [options.annotationssizes.north=45] JSON to hold north annotation size
 * @param {geotoolkit.util.Rect} [options.bounds] where to place the widget
 * @param {object} [options.border] defines properties for widget outer border
 * @param {object} [options.border.color] color of border border
 * @param {boolean} [options.viewcache] if set veiwcache for the widget
 * @param {object} [options.viewcachesize] viewcache size
 * @param {number} [options.viewcachesize.width=256] set tiled cache size.
 * @param {number} [options.viewcachesize.height=256] set tiled cache size.
 * @example
 * <caption>Initialize Widget</caption>
 * var widget = new geotoolkit.widgets.MultiHistograms({
 * 'bounds': new geotoolkit.util.Rect(0, 0, 800, 400),
 * 'viewcache': true,
 * 'annotationssizes': {
 * 'north': 20
 * },
 * 'tools': {
 * 'verticalscroll': {
 * 'visible': false
 * },
 * 'horizontalscroll': {
 * 'visible': false
 * }
 * },
 * 'autoannotationsize': true
 * });
 * hist1 = widget.addHistogram(hist1Options)
 * .setData(datasource1);
 * hist2 = widget.addHistogram(hist2Options)
 * .setData(datasource2);
 *
 */
geotoolkit.widgets.MultiHistograms = {};
    /**
     * enum for Events triggered by the Widget.
     * @enum
     * @readonly
     */
    geotoolkit.widgets.MultiHistograms.Events = {};
        /**
         * fired when histograms are selected
         * @type {string}
         */
        geotoolkit.widgets.MultiHistograms.Events.HistogramsSelected = "";
        /**
         * fired when bins of highlightable histograms are selected
         * @type {string}
         */
        geotoolkit.widgets.MultiHistograms.Events.BinsSelected = "";
        /**
         * fired when axis is selected
         * @type {string}
         */
        geotoolkit.widgets.MultiHistograms.Events.AxisSelected = "";
        /**
         * fired when Data source updated
         * @type {string}
         */
        geotoolkit.widgets.MultiHistograms.Events.DataUpdated = "";
    /**
     * return underlay layer for add new visual under histograms
     * @returns {geotoolkit.scene.Group} group instead get a Layer object , widget return Group object for setting model limits with ease.
     */
    geotoolkit.widgets.MultiHistograms.prototype.getUnderlayLayer = function(){};
    /**
     *return overlay layer for add new visual in front of histograms
     * @example
     * var overLayer = widget.getOverlayLayer();
     * var lineChart = new geotoolkit.controls.shapes.LineChart({...}).getGrid().setVisible(false);
     * overLayer.addChild(lineChart);
     * @returns {geotoolkit.scene.Group} group instead get a Layer object , widget return Group object for setting model limits with ease.
     */
    geotoolkit.widgets.MultiHistograms.prototype.getOverlayLayer = function(){};
    /**
     * setup selection tool and scroll bar for annotations
     * @override
     */
    geotoolkit.widgets.MultiHistograms.prototype.initializeTools = function(){};
    /**
     * create a new histogram with axes
     * @param {object} options options to set up histogram shape
     * @param {object} [axes]
     * @param {geotoolkit.axis.Axis|null} [axes.xaxis] x axis for histogram, by default add axis with AdaptivetickGenerator, null means not add x axis
     * @param {geotoolkit.axis.Axis|null} [axes.yaxis] y axis for histogram, by default add axis with HistogramTickGenerator, null means not add y axis
     * @param {string} [id] id for identifying histogram and axis
     * @returns {geotoolkit.controls.shapes.Histogram} [histObj.histogram] returned shape
     */
    geotoolkit.widgets.MultiHistograms.prototype.addHistogram = function(options, axes, id){};
    /**
     * remove histograms from widget
     * @param {Array.<geotoolkit.controls.shapes.Histogram>|Array.<string>|geotoolkit.controls.shapes.Histogram|string} shapes array of histograms
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.removeHistograms = function(shapes){};
    /**
     * set if histograms can be highlighted
     * @param {Array.<geotoolkit.controls.shapes.Histogram>|Array.<string>|geotoolkit.controls.shapes.Histogram|string} shapes array of histograms
     * @param {boolean} highlightable if histograms are available for selection
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setHighlightableHistograms = function(shapes, highlightable){};
    /**
     * get highlightable histograms
     * @returns {Array.<geotoolkit.controls.shapes.Histogram>} highlightable histograms
     */
    geotoolkit.widgets.MultiHistograms.prototype.getHighlightableHistograms = function(){};
    /**
     * get selected bins in highlightable histograms
     * @param {Array.<geotoolkit.controls.shapes.Histogram>|Array.<string>|geotoolkit.controls.shapes.Histogram|string} shapes of histograms id or instance
     * @returns {Array.<Array.<number>>} array of bins array
     */
    geotoolkit.widgets.MultiHistograms.prototype.getHighlightedBins = function(shapes){};
    /**
     * get all histograms
     * @param {boolean} returnId instead return histograms instance, return Ids of histograms
     * @returns {Array.<geotoolkit.controls.shapes.Histogram>|Array.<number>} histograms all histograms in the widget
     */
    geotoolkit.widgets.MultiHistograms.prototype.getHistograms = function(returnId){};
    /**
     * get all limits groupId
     * @returns {Array.<number>} groups ids of all groups
     */
    geotoolkit.widgets.MultiHistograms.prototype.getGroupsId = function(){};
    /**
     * add title to annotation
     * @override
     * @param {geotoolkit.layout.AnnotationLocation} [location = AnnotationLocation.South] location of the axis
     * @param {object} options
     * @param {string} [options.text] text to display in title
     * @param {object | geotoolkit.attributes.TextStyle} [options.textstyle = null] style
     * @param {number} [options.length] width or height of title group
     * @returns {object} obj
     * @returns {geotoolkit.scene.shapes.Text} [obj.text] title text
     * @returns {geotoolkit.scene.Group} [obj.group] title group
     */
    geotoolkit.widgets.MultiHistograms.prototype.addTitle = function(location, options){};
    /**
     * create new axis with options, adding and connect it with object
     * @param {geotoolkit.layout.AnnotationLocation} location location of annotation for adding new axis
     * @param {object} options
     * @param {number} [options.length=null] width or height of axis component
     * @param {boolean} [options.flip=null] set if flip the axis
     * @param {boolean} [options.accumulative] set if the axis serve for showing accumulative value in histogram accumulative mode
     * See geotoolkit.scene.AnnotatedNode.createAxis for other properties' definition.
     * @param {geotoolkit.scene.Node|geotoolkit.controls.shapes.Histogram|string} [connectedObject=null] connected object of axis
     */
    geotoolkit.widgets.MultiHistograms.prototype.addAxisTo = function(location, options, connectedObject){};
    /**
     * internal method, remove axis instance from widget
     * @param {geotoolkit.axis.Axis|string} axisRef id or reference to identify axis
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.internalRemoveAxis = function(axisRef){};
    /**
     * refer to axis based on histogram or group and remove the axis from widget
     * @param {geotoolkit.controls.shapes.Histogram|string|object} ref id or reference to identify histogram or group related to the axis
     * @param {geotoolkit.layout.AnnotationLocation} location location of axis
     * @returns {geotoolkit.widgets.MultiHistograms|null} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.removeAxisFrom = function(ref, location){};
    /**
     * @override
     */
    geotoolkit.widgets.MultiHistograms.prototype.dispose = function(){};
    /**
     * event handler for bin number updating of histogram
     * @param {string} event
     * @param {object} src
     * @param {object} data
     */
    geotoolkit.widgets.MultiHistograms.prototype.onBinsUpdated = function(event, src, data){};
    /**
     * add histograms to an existing group as new members
     * @param {Array.<geotoolkit.controls.shapes.Histogram>|Array.<string>|geotoolkit.controls.shapes.Histogram|string} shapes array of histograms or their id
     * @param {object|string} groupRef id string or object that contain groupid property
     * @returns {geotoolkit.widgets.MultiHistograms|null} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.addHistogramsToGroup = function(shapes, groupRef){};
    /**
     * remove histograms from all existing limits group
     * @param {Array.<geotoolkit.controls.shapes.Histogram>|Array.<string>|geotoolkit.controls.shapes.Histogram|string} shapes array of histograms or their id
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.removeHistogramsFromAllGroup = function(shapes){};
    /**
     * remove histograms from an existing group
     * @param {Array.<geotoolkit.controls.shapes.Histogram>|Array.<string>|geotoolkit.controls.shapes.Histogram|string} shapes array of histograms or their id
     * @param {object|string} groupRef id string or object that contain groupid property
     * @returns {geotoolkit.widgets.MultiHistograms|null} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.removeHistogramsFromGroup = function(shapes, groupRef){};
    /**
     * create group in certain annotation(along certain axis) based on histograms
     * @param {Array.<geotoolkit.controls.shapes.Histogram>|Array.<string>} shapes array of histograms
     * @param {geotoolkit.layout.AnnotationLocation} location location of annotation that containing axis for limits group
     * @param {object} [axisOptions] options to set up new axis. The default value of options would be the options get from the axis of one histogram in the group.
     * For details, see the internalAddAxis method.
     * @param {string|null} [gid] group id
     * @returns {object|null} object to refer to group and related object
     * @returns {string} [object.groupid] group id
     */
    geotoolkit.widgets.MultiHistograms.prototype.createGroup = function(shapes, location, axisOptions, gid){};
    /**
     * set properties for widget
     * @param {object} props see {@link geotoolkit.widgets.MultiHistograms#setOptions}
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setProperties = function(props){};
    /**
     * set options for widget
     * @param {object} options
     * @param {object|geotoolkit.scene.shapes.Text} [options.header] options for setting header of widget, see {@link geotoolkit.widgets.MultiHistograms#setHeader}
     * @param {number} [options.axiswidth] default width when adding new vertical axis
     * @param {number} [options.axisheight] default height when adding new horizontal axis
     * @param {object} [options.annotationsgaps] options for setting gaps between annotations and center model, see details in setGaps method
     * @param {boolean} [options.autoannotationsize] auto modify the size of annotation based on the total size of component in the annotation
     * @param {object} [options.tools] options for tools setting, see details in setToolsOptions method
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setOptions = function(options){};
    /**
     * get axis and related group options
     * @param {geotoolkit.controls.shapes.Histogram|string|object} ref shape histogram reference or group reference for identifying the axis
     * @param {geotoolkit.layout.AnnotationLocation} location location of the axis
     * @returns {object|null} options
     * @returns {number} [options.length] width of vertical axis or height of horizontal axis
     * @returns {boolean} [options.flip] get if flip the axis
     * @returns {boolean} [options.accumulative] get if axis serve accumulative histograms
     * the rest params could be seen from getProperties method of axis object in details
     */
    geotoolkit.widgets.MultiHistograms.prototype.getAxisOptions = function(ref, location){};
    /**
     * set options of axis
     * @param {geotoolkit.controls.shapes.Histogram|string|object} ref shape histogram reference or group reference for identifying the axis
     * @param {geotoolkit.layout.AnnotationLocation} location location of the axis
     * @param {object|null} options axis options
     * @param {object} [options.tickgenerator] tickgenOptions options to configure tickgenerator of axis, see setProperties method of related tickgenerator for details
     * @param {number} [options.length] width of vertical axis or height of horizontal axis
     * @param {boolean} [options.flip=false] check if flip the axis other params could be seen in the definition of axis setOptions methods
     * @returns {geotoolkit.widgets.MultiHistograms}
     */
    geotoolkit.widgets.MultiHistograms.prototype.setAxisOptions = function(ref, location, options){};
    /**
     * get properties of widget
     * @returns {object} props
     * @returns {object} [props.header] get header properties, see details in getHeader method
     * @returns {number} [props.axiswidth] default width for vertical axis
     * @returns {number} [props.axisheight] default height for horizontal axis
     * @returns {boolean} [props.autoannotationsize] get if auto modify the annotation size based on the total size of component
     * @returns {object} [props.tools] tools options
     * @returns {object} [props.tools.axisselection] get axis selection options, see details in the getAxisSelectionOptions method
     * @returns {object} [props.tools.southscroll] get south scroll bar options ,see details in the getAnnotationScrollBarOptions method
     */
    geotoolkit.widgets.MultiHistograms.prototype.getProperties = function(){};
    /**
     * set header for widget
     * @param {object|geotoolkit.scene.shapes.Text} options
     * @param {object} [options.title] object to describe the properties for header text.For details, see setProperties method of geotoolkit.scene.shapes.Text object
     * @returns {geotoolkit.widgets.MultiHistograms}
     */
    geotoolkit.widgets.MultiHistograms.prototype.setHeader = function(options){};
    /**
     * get header options
     * @returns {geotoolkit.scene.shapes.Text} title
     */
    geotoolkit.widgets.MultiHistograms.prototype.getHeader = function(){};
    /**
     * set desired length for the axis
     * @param {geotoolkit.axis.Axis|string} axisRef id or reference to identify axis
     * @param {number} length desired width or height for the axis
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setAxisWidthOrHeight = function(axisRef, length){};
    /**
     * set up tools options
     * @param {object} options
     * @param {object} [options.axisselection] options for set up selection on axis, see details in setAxisSelection method
     * @param {object} [options.southscroll] options for set up vertical scroll bar for south annotation, see details in setAnnotationsScrollBar method
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setToolsOptions = function(options){};
    /**
     * get tools options
     * @returns {object} [props] tools options
     * @returns {object} [props.axisselection] get axis selection options, see details in the getAxisSelectionOptions method
     * @returns {object} [props.southscroll] get south scroll bar options ,see details in the getAnnotationScrollBarOptions method
     * the rest options could be seen from getToolsOptions method of annotated widget
     */
    geotoolkit.widgets.MultiHistograms.prototype.getToolsOptions = function(){};
    /**
     * set up options for axis selection
     * @param {object} options
     * @param {boolean} [options.enabled=null] flag to enable axis selection
     * @param {geotoolkit.attributes.FillStyle|object} [options.highlightstyle] fillstyle for background of axis
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setAxisSelection = function(options){};
    /**
     * get axis selection options
     * @returns {object} options
     * @returns {boolean} [options.enabled] get if enabled axis selection
     * @returns {object} [options.highlightstyle] get highlight style options
     */
    geotoolkit.widgets.MultiHistograms.prototype.getAxisSelectionOptions = function(){};
    /**
     * set up options for annotation scroll bar
     * @param {object} options
     * @param {number} [options.size] height for horizontal scroll bar or width for vertical scroll bar
     * @param {boolean} [options.visible] flag to set visibility of scroll bar
     * @param {object} [options.options] properties for setting scroll bar
     * @param {geotoolkit.layout.AnnotationLocation} location location of annotation that containing axis for the group
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setAnnotationsScrollBar = function(options, location){};
    /**
     * get scroll bar options
     * @returns {object} options south scroll bar options
     */
    geotoolkit.widgets.MultiHistograms.prototype.getAnnotationScrollBarOptions = function(){};
    /**
     * set up gaps for annotations
     * @param {object} options
     * @param {number} [options.south] desired height for axis in south annotation
     * @param {number} [options.west] desired width for axis in west annotation
     * @param {number} [options.east] desired width for axis in east annotation
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setGaps = function(options){};
    /**
     * remove group
     * @param {object|string} groupRef id string or object that contain groupid property
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.removeGroup = function(groupRef){};
    /**
     * set visibility of histograms and related axis
     * @param {Array.<geotoolkit.controls.shapes.Histogram>|Array.<string>|geotoolkit.controls.shapes.Histogram|string} shapes array of histograms
     * @param {boolean} visible set the visibility of histogram and related axis
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setHistogramsVisible = function(shapes, visible){};
    /**
     * set properties of widget
     * @param {object} props see detail in setOptions method
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setProperties = function(props){};
    /**
     * unbind all group in certain location or all locations
     * @param {geotoolkit.layout.AnnotationLocation} location location of annotation that containing axis for limits group
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.removeAllGroup = function(location){};
    /**
     * bring the shape in front of all other shapes and activate it
     * @param {geotoolkit.controls.shapes.Histogram} shape the histogram need to be show on the top
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setInFrontHistogram = function(shape){};
    /**
     * bring the group and the top shape in the group in front of all shapes and then activate it
     * @param {object|string} groupRef id string or object that contain groupid property
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setInFrontGroup = function(groupRef){};
    /**
     * Sets a new data model
     * @override
     * @param {geotoolkit.data.DataSource} data data model set
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setData = function(data){};
    /**
     * returns data source
     * @override
     * @returns {geotoolkit.data.DataSource}
     */
    geotoolkit.widgets.MultiHistograms.prototype.getData = function(){};
    /**
     * Sets the data binding
     * @param {geotoolkit.data.DataBinding} binding data binding
     * @param {boolean} [silent=false] silent mode to forbid
     * @returns {geotoolkit.widgets.MultiHistograms} this
     */
    geotoolkit.widgets.MultiHistograms.prototype.setDataBinding = function(binding, silent){};
    /**
     * Return the data binding
     * @returns {geotoolkit.data.DataBinding}
     */
    geotoolkit.widgets.MultiHistograms.prototype.getDataBinding = function(){};
    /**
     * get histograms from bind group
     * @param {object|string} groupRef id string or object that contain groupid property
     * @param {boolean} returnVisibleModel the flag to determine if only return visible models
     * @param {boolean} returnId set if only return id of histogram instead of histogram instance
     * @returns {Array.<geotoolkit.controls.shapes.Histogram>|null} shapes array of histograms
     */
    geotoolkit.widgets.MultiHistograms.prototype.getRelatedHistogramsByGroup = function(groupRef, returnVisibleModel, returnId){};
    /**
     * get location of limits group
     * @param {object|string} groupRef id string or object that contain groupid property
     * @returns {geotoolkit.layout.AnnotationLocation} location of group
     */
    geotoolkit.widgets.MultiHistograms.prototype.getLocationOfGroup = function(groupRef){};
    /**
     * get the id of groups which histogram belong to
     * @param {geotoolkit.controls.shapes.Histogram} shape the histogram in the group
     * @returns {object} group id id of groups contain the histogram
     */
    geotoolkit.widgets.MultiHistograms.prototype.getGroupIdByHistogram = function(shape){};
    /**
     * return visual(could be not real limit get from shape's getModelLimits method) model limits of histogram in widget
     * @param {geotoolkit.controls.shapes.Histogram|string} shape histogram reference
     * @returns {geotoolkit.util.Rect|null} limits copy of visual model limits
     */
    geotoolkit.widgets.MultiHistograms.prototype.getHistogramModelLimits = function(shape){};
    /**
     * get the shared model limits of limits group
     * @param {object|string} groupRef id string or object that contain groupid property
     * @returns {geotoolkit.util.Rect|null} limits copy of shared model limits
     */
    geotoolkit.widgets.MultiHistograms.prototype.getGroupModelLimits = function(groupRef){};

/**
 * InPlace Editor
 *
 * Double click to activate InPLace Editor.
 * EscapeKey to exit from editing mode (without submitting new value)
 * EnterKey (or CtrlKey + ArrowKey) to submit value and edit next cell
 * CtrlKey + EnterKey to submit value and exit from editing mode
 *
 * @class geotoolkit.widgets.tools.InPlaceEditor
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.widgets.TableView} tableViewWidget
 */
geotoolkit.widgets.tools.InPlaceEditor = {};
    /**
     * Events
     * @enum
     * @readonly
     */
    geotoolkit.widgets.tools.InPlaceEditor.Events = {};
        /**
         * onCanEdit
         * @type {string}
         */
        geotoolkit.widgets.tools.InPlaceEditor.Events.onCanEdit = "";
        /**
         * onValueChanged
         * @type {string}
         */
        geotoolkit.widgets.tools.InPlaceEditor.Events.onValueChanged = "";
    /**
     * @inheritdoc
     */
    geotoolkit.widgets.tools.InPlaceEditor.prototype.attachToPlot = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.widgets.tools.InPlaceEditor.prototype.dispose = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.widgets.tools.InPlaceEditor.prototype.start = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.widgets.tools.InPlaceEditor.prototype.stop = function(){};
    /**
     * Return active cell
     * @returns {null|object} activeCell
     * @returns {number} activeCell.row
     * @returns {number} activeCell.column
     */
    geotoolkit.widgets.tools.InPlaceEditor.prototype.getActiveCell = function(){};
    /**
     * set active cell
     * @param {object} cell call coordinates
     * @param {number} cell.row row
     * @param {number} cell.column column
     * @returns {geotoolkit.widgets.tools.InPlaceEditor} this
     */
    geotoolkit.widgets.tools.InPlaceEditor.prototype.setActiveCell = function(cell){};

/**
 * @class geotoolkit.widgets.tools.LegendToolEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs contains info about the event
 * @param {geotoolkit.layout.AnnotationLocation} fromAnnotation move from Annotation
 * @param {geotoolkit.layout.AnnotationLocation} toAnnotation move to Annotation
 */
geotoolkit.widgets.tools.LegendToolEventArgs = {};

/**
 * Tool to handle moving and resizing of legend around annotated widget
 * @class geotoolkit.widgets.tools.LegendTool
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {Object} [options]
 * @param {geotoolkit.widgets.AnnotatedWidget} [options.widget] widget
 * @param {geotoolkit.scene.Group} [options.group] Collection of legends or shape.
 * @param {geotoolkit.scene.Group} [options.manipulatorlayer] Manipulator layer for holding shapes.
 * @param {geotoolkit.scene.Group} [options.padding] padding around the legends.
 * @example
 * var legendTool = new geotoolkit.widgets.tools.LegendTool(
 * {
 * 'widget': Widget, // {geotoolkit.widgets.AnnotatedWidget}
 * 'manipulatorlayer': maLayer,
 * 'group': legendShape
 * }
 * );
 * // Insert the tool to the head of tool's collection
 * Widget.getTool().insert(0, legendTool);
 */
geotoolkit.widgets.tools.LegendTool = {};
    /**
     * Mouse down event handler
     * @param {geotoolkit.controls.tools.ProxyEventArgs} eventArgs eventArgs
     */
    geotoolkit.widgets.tools.LegendTool.prototype.onMouseDown = function(eventArgs){};
    /**
     * Mouse move event handler
     * @param {geotoolkit.controls.tools.ProxyEventArgs} eventArgs eventArgs
     */
    geotoolkit.widgets.tools.LegendTool.prototype.onMouseMove = function(eventArgs){};
    /**
     * Mouse up event handler
     * @param {geotoolkit.controls.tools.ProxyEventArgs} eventArgs eventArgs
     */
    geotoolkit.widgets.tools.LegendTool.prototype.onMouseUp = function(eventArgs){};

/**
 * This class holds the details of a visiblerange change event.
 * <br>
 * When such events occur, one could retrieve this from the event object and fetch some information from it.For example the newly visible range.
 *
 *
 * @class geotoolkit.widgets.VisibleRangeChangeEventArgs
 * @augments geotoolkit.controls.tools.BaseEventArgs
 * @param {string} eventName information about the events arguments
 * @param {geotoolkit.util.Range} range visible limits
 */
geotoolkit.widgets.VisibleRangeChangeEventArgs = {};
    /**
     * return visible limits
     * @returns {geotoolkit.util.Range} visible limits
     */
    geotoolkit.widgets.VisibleRangeChangeEventArgs.prototype.getVisibleRange = function(){};

/**
 * This class holds the details of a selection change event.
 * You can access the id of the selected object using this object.
 *
 * @class geotoolkit.widgets.SelectionChangeEventArgs
 * @augments geotoolkit.controls.tools.BaseEventArgs
 * @param {string} eventName information about the events arguments
 * @param {string|null} id
 * @param {string} [type] selection type ('line', 'fill', 'axis' or 'legend')
 */
geotoolkit.widgets.SelectionChangeEventArgs = {};
    /**
     * return selected id
     * @returns {string|null}
     */
    geotoolkit.widgets.SelectionChangeEventArgs.prototype.getId = function(){};
    /**
     * Gets selection type
     * @returns {?string}
     */
    geotoolkit.widgets.SelectionChangeEventArgs.prototype.getType = function(){};

/**
 * The time series widget plots data points horizontally along a time axis. It inherits from BaseWidget.
 * Curves are added to the widget by calling the addCurve() function:
 * <ul>
 * <li> name -- curve name </li>
 * <li> uri -- unique dataset id </li>
 * <li> data -- geotoolkit.data.DataTableView </li>
 * <li> properties //visual properties </li>
 * </ul>
 * insertCurve() function is used to insert a curve at a particular position or order.<br>
 * setVisibleRange() can be used to set the visiblemodellimits programmatically <br>
 * In addition to plotting the data, the widget also supports fills via the addFill() function and annotations via addAnnotation() and addAnnotationLine() functions.
 * <br>
 * Configuring the various options of the widget can be achieved by calling setOptions().<br>
 * Selection is handled in the application by using the onSelectionChanged event.
 *
 * @class geotoolkit.widgets.TimeSeriesWidget
 * @augments geotoolkit.widgets.BaseWidget
 * @param {object} [options] javascript object used to define properties (see setOptions for more details)
 * @example
 * // 1). Initialize widget
 * var options = {
 * 'title': {
 * 'visible': false
 * },
 * 'model': new geotoolkit.scene.Group()
 * .setModelLimits(new geotoolkit.util.Rect(startDate, 0, endDate, 1)),
 * 'curveaxis': {
 * 'visible': true,
 * 'autocoloraxis': true,
 * 'autocolorlabel': true,
 * 'titlevisible': true,
 * 'axiswidth': 30,
 * 'compact': true
 * },
 * 'curvelimits': {
 * 'visible': false
 * }
 * };
 * // Create the widget using the options created above.
 * var widget = new geotoolkit.widgets.TimeSeriesWidget(options);
 * // Add Data/Curve to the widget
 * widget.addCurve({
 * 'name': 'CALI',
 * 'uri': '//test//cali',
 * 'data': _dataTableViews[0], // geotoolkit.data.DataTable.
 * 'properties': {
 * 'autoscale': true,
 * 'axisautolabelrotation': true, // curve properties can be modified here as well.
 * 'neatlimits': true,
 * 'unit': 'INS',
 * 'linestyle': {
 * 'color': colors['blue'],
 * 'width': 2
 * }
 * }
 * });
 *
 *
 */
geotoolkit.widgets.TimeSeriesWidget = {};
    /**
     * TimeseriesWidget events following example shows how user can subscribe to the events.
     * @enum
     * @readonly
     * @example
     * widget.on(geotoolkit.widgets.TimeSeriesWidget.Events.onVisibleRangeChanging, function(event, sender, eventArgs){
     * //scrolling or scaling
     * geotoolkit.log(eventArgs.getVisibleRange().toString());
     * });
     * widget.on(geotoolkit.widgets.TimeSeriesWidget.Events.onVisibleRangeChanged, function(event, sender, eventArgs){
     * //after scroll or scale complete
     * geotoolkit.log(eventArgs.getVisibleRange().toString());
     * });
     *
     */
    geotoolkit.widgets.TimeSeriesWidget.Events = {};
        /**
         * onVisibleRangeChanged
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.Events.onVisibleRangeChanged = "";
        /**
         * onVisibleRangeChanging
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.Events.onVisibleRangeChanging = "";
        /**
         * onCursorChanged
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.Events.onCursorChanged = "";
        /**
         * beforeSelectionChange
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.Events.beforeSelectionChange = "";
        /**
         * onSelectionChanged
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.Events.onSelectionChanged = "";
        /**
         * onAnnotationLineClick
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.Events.onAnnotationLineClick = "";
        /**
         * onAnnotationClick
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.Events.onAnnotationClick = "";
    /**
     * LegendPosition
     * @enum
     * @readonly
     */
    geotoolkit.widgets.TimeSeriesWidget.LegendPosition = {};
        /**
         * Top
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.LegendPosition.Outside = "";
        /**
         * Bottom
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.LegendPosition.Inside = "";
    /**
     * FillDirection
     * @enum
     * @readonly
     */
    geotoolkit.widgets.TimeSeriesWidget.FillDirection = {};
        /**
         * Top
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.FillDirection.Top = "";
        /**
         * Bottom
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.FillDirection.Bottom = "";
    /**
     * FillType
     * @enum
     * @readonly
     */
    geotoolkit.widgets.TimeSeriesWidget.FillType = {};
        /**
         * CurveToCurve
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.FillType.CurveToCurve = "";
        /**
         * CurveToReferenceLine
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.FillType.CurveToReferenceLine = "";
        /**
         * CurveToBaseLine
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.FillType.CurveToBaseLine = "";
    /**
     * ScrollBarType
     * @enum
     * @readonly
     */
    geotoolkit.widgets.TimeSeriesWidget.ScrollBarType = {};
        /**
         * Advanced
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.ScrollBarType.Advanced = "";
        /**
         * Compact
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.ScrollBarType.Compact = "";
        /**
         * Simple
         * @type {string}
         */
        geotoolkit.widgets.TimeSeriesWidget.ScrollBarType.Simple = "";
    /**
     * Sets locale
     * @param {geotoolkit.util.Locale} locale locale
     * @returns {geotoolkit.widgets.TimeSeriesWidget}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.setLocale = function(locale){};
    /**
     * Returns Current Locale
     * @returns {geotoolkit.util.Locale}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getLocale = function(){};
    /**
     * Initializes layout of this widget
     *
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.initializeLayout = function(){};
    /**
     * Initializes default tools used by this widget
     * @returns {geotoolkit.widgets.TimeSeriesWidget}
     * @protected
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.initializeTools = function(){};
    /**
     * Select Curve By ID. The example shows the API for setting the selected curve in the TimeSeriesWidget. The widget will trigger the event TimeSeriesWidget.Events.onSelectionChanged, if the selection has changed.
     * @param {string} id (null to deselect)
     * @example
     * widget.selectCurveById(someid);
     *
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.selectCurveById = function(id){};
    /**
     * Gets properties from this widget (same as getOptions)
     *
     * @returns {object} options
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getProperties = function(){};
    /**
     * Gets options from this widget
     *
     * @returns {object} options
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getOptions = function(){};
    /**
     * Sets Properties same as setOptions {@link geotoolkit.widgets.TimeSeriesWidget#setOptions}
     * @param {object} options JSON containing widget options see {@link geotoolkit.widgets.TimeSeriesWidget#setOptions}
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.setProperties = function(options){};
    /**
     * Sets options
     * @param {object} [options] JSON containing widget options
     * @param {geotoolkit.util.Rect} [options.bounds] bounds of the current widget
     * @param {geotoolkit.scene.Group} [options.model] Timeseries' center model limits can be specified using this option
     * @param {boolean} [options.automodellimitsmode] automodellimits mode
     * @param {boolean} [options.alignaxis] align axis
     * @param {Array<number>} [options.margin] array of margins of this widget [top, right, bottom, left]
     * @param {object} [options.title] JSON which defines title area
     * @param {boolean} [options.title.visible = true] visibility of title text
     * @param {number} [options.title.height = 40] height of title
     * @param {string} [options.title.text = Time Series] title text
     * @param {string} [options.title.font = 14px Arial] title text font
     * @param {string} [options.title.color = #6b6b6b] title text color
     * @param {boolean} [options.title.centered = false] centers title text
     * @param {Array<number>} [options.title.padding] array of padding for title text
     * @param {object} [options.legends] JSON which defines legends area
     * @param {geotoolkit.layout.HorizontalPriorityLayout.Direction} [options.legends.direction] direction of legends (left-to-right, right-to-left)
     * @param {boolean} [options.legends.visible = true] visibility of legends area
     * @param {boolean} [options.legends.position = geotoolkit.widgets.TimeSeriesWidget.LegendPosition.Outside] Outside/Inside model
     * @param {number} [options.legends.alignwithcentermodel = true] aligns the legendcontainer with the centermodel when positioned outside
     * @param {number} [options.legends.height = 25] legends area height
     * @param {number} [options.legends.width = 100] if positioned inside, container width
     * @param {number} [options.legends.margintext = 5] legend text margin left and right
     * @param {number} [options.legends.marginbottom = 5] legends area bottom margin (outside only)
     * @param {boolean} [options.legends.autocolorlabel = true] legend's text label color
     * @param {object} [options.legends.legendoptions] JSON which defines legend options
     * @param {geotoolkit.util.Format} [options.legends.legendoptions.formatter] represents the legend number formatter.
     * @param {number} [options.legends.legendoptions.margintext = 2] margin text
     * @param {string} [options.legends.legendoptions.font = bold 12px Arial] font
     * @param {number} [options.legends.legendoptions.height = 25] height
     * @param {number} [options.legends.legendoptions.internalpadding = 4] internal padding
     * @param {number} [options.legends.legendoptions.fixedwidth = null] fixed width
     * @param {string} [options.legends.legendoptions.labelcolor = #6b6b6b] label color
     * @param {geotoolkit.attributes.LineStyle} [options.legends.legendoptions.linestyle = (color: rgba(128, 128, 128, 1), width: 1, pixelsnapmode: { 'x': true, 'y': true}) ] linestyle
     * @param {geotoolkit.attributes.FillStyle} [options.legends.legendoptions.fillstyle = (color: rgba(250, 250, 250, 0.95)) ] fillstyle
     * @param {object} [options.lastupdatedate] JSON which defines last update date area
     * @param {boolean} [options.lastupdatedate.visible = true ] visibility of the last update date area
     * @param {boolean} [options.lastupdatedate.followcursor = false ] false means the last data time will be displayed and true means the cursor position data time will be displayed
     * @param {string} [options.lastupdatedate.font = bold 10px Arial] last update date text font
     * @param {string} [options.lastupdatedate.color = #6b6b6b] last update date text color
     * @param {string|function} [options.lastupdatedate.formatter = M j, Y H:i:s] visible range text formatter
     * @param {object} [options.curvelimits] JSON which defines curve limits area
     * @param {boolean} [options.curvelimits.visible = true] visibility of curve limits area
     * @param {number} [options.curvelimits.margin = 5] curve limits area margin (top and bottom)
     * @param {number} [options.curvelimits.width = 60] width for each curve limits column
     * @param {string} [options.curvelimits.font = bold 10px Arial] curve limits text font
     * @param {object} [options.curveaxis] JSON which defines curve axis
     * @param {boolean} [options.curveaxis.visible = false] visibility of curve axis
     * @param {boolean} [options.curveaxis.autocoloraxis = false] synchronize axis color with curve color
     * @param {boolean} [options.curveaxis.autocolorlabel = false] synchronize axis and label color with curve color
     * @param {boolean} [options.curveaxis.titlevisible = true] curve axis label visibility
     * @param {boolean} [options.curveaxis.textcolor = '#6b6b6b'] curve axis label color
     * @param {number} [options.curveaxis.axiswidth = 40] curve axis and text width
     * @param {string} [options.curveaxis.font = 11px Arial] curve axis text font
     * @param {object} [options.curveaxis.tickgeneratoroptions] JSON which defines tick generator options
     * @param {object} [options.curveaxis.tickgeneratoroptions.edge] edge
     * @param {boolean} [options.curveaxis.tickgeneratoroptions.edge.tickvisible = true] edge tick visibility
     * @param {boolean} [options.curveaxis.tickgeneratoroptions.edge.labelvisible = true] edge label visibility
     * @param {object} [options.curveaxis.tickgeneratoroptions.major] major
     * @param {boolean} [options.curveaxis.tickgeneratoroptions.major.tickvisible = true] major tick visibility
     * @param {boolean} [options.curveaxis.tickgeneratoroptions.major.labelvisible = false] major label visibility
     * @param {object} [options.curveaxis.tickgeneratoroptions.minor] minor
     * @param {boolean} [options.curveaxis.tickgeneratoroptions.minor.tickvisible = false] minor tick visibility
     * @param {boolean} [options.curveaxis.tickgeneratoroptions.minor.labelvisible = false] minor label visibility
     * @param {object} [options.curvesymbol] JSON which defines curve highlighting symbol
     * @param {boolean} [options.curvesymbol.visible = true] visibility of curve highlighting symbol
     * @param {number} [options.curvesymbol.width = 8] curve highlighting symbol width
     * @param {number} [options.curvesymbol.height= 8] curve highlighting symbol height
     * @param {string} [options.curvesymbol.type = circle] curve highlighting symbol type, default is circle and available values are cross, diamond, plus, square, star and triangle
     * @param {geotoolkit.attributes.LineStyle} [options.cursor.linestyle] defines linestyle for timeseries cursor tool
     * @param {object} [options.modelgrid] JSON which contains 'horizontaltickgenerator' and 'verticaltickgenerator'
     * @param {geotoolkit.axis.TickGenerator} [options.modelgrid.horizontaltickgenerator] Horizontal tickgenerator for the model grid. (Horizontal reference curve takes precedence over this option). Default is an instance of geotoolkit.axis.AdaptiveTickGenerator
     * @param {geotoolkit.axis.TickGenerator} [options.modelgrid.verticaltickgenerator] Vertical tickgenerator for the model grid (default visibility of ticks is false). Default is an instance of geotoolkit.axis.AdaptiveDateTimeTickGenerator
     * @param {object} [options.modelaxis] JSON which defines axis inside model
     * @param {boolean} [options.modelaxis.visible = true] visiblility of the axis inside model
     * @param {geotoolkit.axis.TickGenerator} [options.modelaxis.tickgenerator = null] tick generator for the axis inside model
     * @param {geotoolkit.attributes.LineStyle} [options.modelaxis.baselinestyle = {color: '#6b6b6b'}] base linestyle for the model axis
     * @param {object} [options.modelgrid.horizontalvisibility] JSON defining horizontal gridline visibility
     * @param {object} [options.modelgrid.verticalvisibility] JSON defining vertical gridline visibility
     * @param {object} [options.southaxis] JSON which defines south axis
     * @param {boolean} [options.southaxis.visible = true] visibility of south axis
     * @param {number} [options.southaxis.height = 20] south axis height
     * @param {string} [options.southaxis.font = bold 10px Arial] south axis label font
     * @param {string} [options.southaxis.color = #6b6b6b] south axis label color
     * @param {geotoolkit.axis.TickGenerator} [options.southaxis.tickgenerator] tick generator for south axis. Default is an instance of geotoolkit.axis.AdaptiveDateTimeTickGenerator
     * @param {object} [options.visiblerange] JSON which defines visible range area
     * @param {boolean} [options.visiblerange.visible = true] visibility of visible range area
     * @param {number} [options.visiblerange.height = 20] visible range area height
     * @param {string} [options.visiblerange.font = bold 10px Arial] visible range text font
     * @param {string} [options.visiblerange.color = #6b6b6b] visible range text color
     * @param {string|function} [options.visiblerange.formatter = M j, Y H:i:s] visible range text formatter
     * @param {object} [options.intervalbuttons] JSON which defines the interval buttons
     * @param {boolean} [options.intervalbuttons.visible = true] visibility of the interval buttons
     * @param {object} [options.intervalbuttons.intervals = { '1h': 1000 * 3600, '8h': 1000 * 3600 * 8, '1d': 1000 * 3600 * 24, '1w': 1000 * 3600 * 24 * 7, '1m': 1000 * 3600 * 24 * 30}] JSON which defines the text and scale value of each interval button
     * @param {object} [options.scrolltonowbutton] JSON which defines the now button
     * @param {boolean} [options.scrolltonowbutton.visible = false] visibility of the now button
     * @param {object} [options.scrollbar] JSON which defines scroll bar area
     * @param {boolean} [options.scrollbar.visible = true] visibility of scroll bar area
     * @param {geotoolkit.widgets.TimeSeriesWidget.ScrollBarType} [options.scrollbar.type = geotoolkit.widgets.TimeSeriesWidget.ScrollBarType.Advanced] Advanced or Compact scrollbar
     * @param {object} [options.scrollbar.options] Additional options to use for scrollbar (this depends on the options the specific scrollbar accepts)
     * @param {number} [options.scrollbar.height = 30] scroll bar area height
     * @param {string} [options.scrollbar.font = bold 9px Arial] scroll bar text font
     * @param {string} [options.scrollbar.color = #6b6b6b] scroll bar text color
     * @param {geotoolkit.axis.TickGenerator} [options.scrollbar.tickgenerator = null] tick generator for scroll bar
     * @param {string|function} [options.scrollbar.formatter = 'M j, Y'] scroll bar text formatter
     * @param {object} [options.tooltips] json defining tooltips
     * @param {boolean} [options.tooltips.visible = true] tooltip visibility
     * @param {geotoolkit.attributes.LineStyle} [options.tooltips.linestyle = (color: rgba(175,175,175,0.5), width: 3)] linestyle of tooltip box
     * @param {geotoolkit.attributes.FillStyle} [options.tooltips.fillstyle = (color: rgba(255,255,255, 0.85))] fillstyle of tooltip box
     * @param {geotoolkit.attributes.LineStyle} [options.tooltips.symbollinestyle = (color: rgba(225,225,225, 0.95), width: 2)] border linestyle of tooltip symbol
     * @param {number} [options.tooltips.selectionradius = 30] radius of tooltip selection visibility
     * @param {object} [options.tooltips.tooltipoptions] JSON which defines tooltip options
     * @param {geotoolkit.util.Format} [options.tooltips.tooltipoptions.formatter] represents the tooltip number formatter.
     * @param {number} [options.tooltips.tooltipoptions.margintext = 4] margin text
     * @param {string} [options.tooltips.tooltipoptions.font = 12px Arial] font
     * @param {number} [options.tooltips.tooltipoptions.symbolsize = 10] symbol size
     * @param {number} [options.tooltips.tooltipoptions.internalpadding = 2] internal padding
     * @param {number} [options.tooltips.tooltipoptions.externalpadding = 5] external padding
     * @param {geotoolkit.attributes.LineStyle} [options.tooltips.tooltipoptions.linestyle = null] linestyle
     * @param {geotoolkit.attributes.FillStyle} [options.tooltips.tooltipoptions.fillstyle = null] fillstyle
     * @param {number|null} [options.tooltips.tooltipoptions.fixedwidth = null] fixed width
     * @param {boolean} [options.tooltips.tooltipoptions.nanvisibility = true] nan visibility
     * @param {function} [options.tooltips.tooltipoptions.formatdatahandler] optional handler to prepare text, symbol and value
     * @param {object} [options.tooltips.tooltipoptions.index = null] index options
     * @param {boolean} [options.tooltips.tooltipoptions.index.visible = false] visibility of the index tooltip
     * @param {string|geotoolkit.util.RgbaColor} [options.tooltips.tooltipoptions.index.color = null] symbol color
     * @param {geotoolkit.scene.shapes.Symbol} [options.tooltips.tooltipoptions.index.symbol = null] symbol shape
     * @param {string} [options.tooltips.tooltipoptions.index.name = 'Time'] name of the index
     * @param {string} [options.tooltips.tooltipoptions.index.indextext = null] index text
     * @param {string} [options.tooltips.tooltipoptions.index.unittext = null] index unit
     * @param {boolean} [options.viewcache = true] enable viewcache
     * @param {Number} [options.cursorselectionlimit = 25] Threshold distance indevice space, from vertical cursor line to show symbol, update legend and show tooltip
     * @param {Number} [options.timezone = geotoolkit.axis.TimeZone.UTC] UTC or local time
     * @param {function} [options.selectionstrategy] selection strategy to set
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     * @example
     * //TimeSeriesWidget has several options which can be customized by your application. Example below shows how to configure margins/white space in the canvas
     * var widget = new geotoolkit.widgets.TimeSeriesWidget({
     * //[top, right, bottom, left]
     * 'margin': [0,0,0,0]
     * });
     * @example
     * widget.setOptions({'selectionstrategy': function(widget, newSelection, oldSelection){...}});
     * @example How to format tooltip data
     * widget.setOptions({
     * 'tooltips': {
     * 'tooltipoptions': {
     * 'formatdatahandler': function(data) {
     * return {
     * 'name': data['name'],
     * 'symbol': data['symbol'],
     * 'valuetext': data['valuetext'],
     * 'unittext': data['id'] === 'Delta' ? ' ft' + ' degF' : data['unittext']
     * }
     * }
     * }
     * }
     * });
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.setOptions = function(options){};
    /**
     * Gets all curves id
     *
     * @returns {Array<string>}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getCurves = function(){};
    /**
     * Get TimeSeriesObject by id
     * @param {string} id timeseries object id
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObject|null}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getTimeSeriesObjectById = function(id){};
    /**
     * retrieve data element with specified id
     *
     * @param {string} id specified id of data element
     * @returns {geotoolkit.data.DataTable|geotoolkit.data.DataTableView|null}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getDataById = function(id){};
    /**
     * Adds a curve to the widget
     * @param {string|object} name curve name or JSON object containing all parameters
     * @param {string} uri curve uri
     * @param {geotoolkit.data.DataTableView} [data] geotoolkit.data.DataTableView object for this curve
     * @param {object} [properties] JSON object can be accepted by function setCurveProperties()
     * @param {string|geotoolkit.widgets.timeseries.TimeSeriesObject} [properties.id = null] curve id
     * @param {boolean} [properties.autoscale] true if curve in auto-scaling mode
     * @param {number} [properties.min] curve min value
     * @param {number} [properties.max] curve max value
     * @param {number} [properties.value] current value
     * @param {string} [properties.unit] unit string
     * @param {geotoolkit.attributes.LineStyle} [properties.linestyle] curve line style
     * @param {boolean} [properties.curvevisible] curve visibility
     * @param {boolean} [properties.markervisible] curve marker visibility
     * @param {object} [properties.marker] marker properties
     * @param {object} [properties.decimationSpacing] spacing of markers
     * @param {boolean} [properties.spline] spline mode
     * @param {boolean} [properties.values] display values
     * @param {boolean} [properties.axisvisible] curve axis visibility
     * @param {string} [properties.axisposition] curve axis position 'left'/'right'
     * @param {string} [properties.name] curve name
     * @param {boolean} [properties.axisautolabelrotation] auto label rotation in curve axis
     *
     * @returns {string} id unique id for the curve added
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.addCurve = function(name, uri, data, properties){};
    /**
     * Inserts a curve to the widget at a desired position.
     * @param {string|object} name curve name or JSON object containing all parameters
     * @param {string} uri dataset uri
     * @param {geotoolkit.data.DataTableView} [data] geotoolkit.data.DataTableView object for this curve
     * @param {object} [properties] JSON object can be accepted by function setCurveProperties()
     * @param {string|geotoolkit.widgets.timeseries.TimeSeriesObject} [properties.id = null] curve id
     * @param {boolean} [properties.autoscale] true if curve in auto-scaling mode
     * @param {number} [properties.min] curve min value
     * @param {number} [properties.max] curve max value
     * @param {number} [properties.value] current value
     * @param {string} [properties.unit] unit string
     * @param {geotoolkit.attributes.LineStyle} [properties.linestyle] curve line style
     * @param {boolean} [properties.curvevisible] curve visibility
     * @param {boolean} [properties.markervisible] curve marker visibility
     * @param {object} [properties.marker] curve marker properties
     * @param {object} [properties.decimationSpacing] spacing of markers
     * @param {boolean} [properties.spline] spline mode
     * @param {boolean} [properties.values] display values
     * @param {boolean} [properties.axisvisible] curve axis visibility
     * @param {string} [properties.axisposition] curve axis position 'left'/'right'
     * @param {string} [properties.name] curve name
     * @param {boolean} [properties.axisautolabelrotation] auto label rotation in curve axis
     * @param {object} [properties.microposition=null] microposition limits
     * @param {number} [properties.microposition.top] upper bound of microposition (range from 0 to 1)
     * @param {number} [properties.microposition.bottom] lower bound of microposition (range from 0 to 1)
     * @param {number} [position] desired position of curve in TimeSeriesWidget.getCurves()
     * @param {string} [id] desired id of curve, defaults to uri if unspecified
     *
     * @returns {string} id unique id for the curve added
     *
     * @example
     * // This function is especially useful when the widget already has curves in it.
     * widget.insertCurve(name, id, data, properties, 1);
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.insertCurve = function(name, uri, data, properties, position, id){};
    /**
     * Adds an array of curves
     * @param {Array.<object>} curves Array of JSON objects containing curve definitions
     * @returns {Array.<string>|number} Array of curve ids added or -1 if no curves added
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.addCurves = function(curves){};
    /**
     * Inserts an array of curves
     * @param {Array.<object>} curves Array of JSON objects containing curve definitions
     * @returns {Array.<string>|number} array of curve ids added or -1 if no curves added
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.insertCurves = function(curves){};
    /**
     * Associates the horizontal grid with a curve.
     * If null is passed in or curve is not found, it defaults to the first curve
     * @param {string} curveId unique curve id
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.setHorizontalGridCurveReference = function(curveId){};
    /**
     * Add a fill to a curve(id1)
     * @param {string} id1 (From curve)
     * @param {string|number|null} id2 (To curve/referenceline/null)
     * @param {geotoolkit.attributes.FillStyle | string | object} fillStyle the fill style
     * @param {geotoolkit.widgets.TimeSeriesWidget.FillType} fillType fill type
     * @param {geotoolkit.widgets.TimeSeriesWidget.FillDirection} fillDirection Direction of the fill
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.addFill = function(id1, id2, fillStyle, fillType, fillDirection){};
    /**
     * Removes a fillstyle associated with a curve in a specific direction
     * @param {string} curveId curve id for which fillstyle is to be removed
     * @param {geotoolkit.widgets.TimeSeriesWidget.FillDirection} filldirection direction of the fill
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.removeCurveFill = function(curveId, filldirection){};
    /**
     * Gets both top and bottom fillstyles associated with curve
     * @param {string} curveId unique curve id
     * @returns {object|null} JSON object containing top and bottom fillstyles of curve
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getCurveFills = function(curveId){};
    /**
     * Get the fill style associated with a curve in a specific direction
     * @param {string} curveId unique curve id
     * @param {geotoolkit.widgets.TimeSeriesWidget.FillDirection} filldirection direction on the fill
     * @returns {null|geotoolkit.attributes.FillStyle} fillstyle
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getCurveFillStyle = function(curveId, filldirection){};
    /**
     * Removes a curve
     * @param {string | Array<string>} id array of curve ids
     *
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.removeCurve = function(id){};
    /**
     * Gets properties of a curve
     * @param {string} id id of the curve to get properties
     *
     * @returns {object|null} properties JSON object contains properties of the curve having that id
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getCurveProperties = function(id){};
    /**
     * Sets properties of a curve. The parameters can be either a single JSON object or individual parameters.
     * @param {string|geotoolkit.widgets.timeseries.TimeSeriesObject} [id = null] curve id
     * @param {boolean} [autoscale] true if curve in auto-scaling mode
     * @param {number} [min] curve min value
     * @param {number} [max] curve max value
     * @param {number} [value] current value
     * @param {string} [unit] unit string
     * @param {geotoolkit.attributes.LineStyle} [linestyle] curve line style
     * @param {boolean} [curvevisible] curve visibility
     * @param {boolean} [symbolvisible] curve symbol visibility
     * @param {boolean} [axisvisible] curve axis visibility
     * @param {string} [axisposition] curve axis position 'left'/'right'
     * @param {string} [name] curve name
     * @param {boolean} [axisautolabelrotation] auto label rotation in curve axis
     * @deprecated to set curve,axis,symbol properties, refer to TimeSeriesObject's setCurveOptions, setSymbolOptions, setCurveLimitsGroupOptions, setAxisOptions
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.setCurveProperties = function(id, autoscale, min, max, value, unit, linestyle, curvevisible, symbolvisible, axisvisible, axisposition, name, axisautolabelrotation){};
    /**
     * Rebuilds all layers
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.rebuildLayers = function(){};
    /**
     * Gets the model range
     *
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getRange = function(){};
    /**
     * Sets the model range
     *
     * @param {geotoolkit.util.Range} range the model range
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.setRange = function(range){};
    /**
     * Gets the visible model range
     *
     * @returns {geotoolkit.util.Range} range
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getVisibleRange = function(){};
    /**
     * Sets the visible model range
     * If the range is less than 1ms the range will be expanded and applied within the model's range
     * If the model's limits are less than the minimum range, the range will be set to the model's limits
     * @param {geotoolkit.util.Range} range visible model range
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.setVisibleRange = function(range){};
    /**
     * Translates widget's contents
     *
     * @param {number} dx - x translate
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.translateModel = function(dx){};
    /**
     * Scale widget's contents
     *
     * @param {number} scaleX x scale factor
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.scaleModel = function(scaleX){};
    /**
     * Zoom in with default factor
     * @see {@link geotoolkit.widgets.TimeSeriesWidget.scaleModel} to set desired factor
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.zoomIn = function(){};
    /**
     * Zoom out with default factor
     * @see {@link geotoolkit.widgets.TimeSeriesWidget.scaleModel} to set desired factor
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.zoomOut = function(){};
    /**
     * Fits bounds to model limits
     *
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.fitToBounds = function(){};
    /**
     * Add Annotation Line
     * @param {object} options JSON for annotation properties
     * @param {geotoolkit.util.Point} [options.point = geotoolkit.util.Point(0, 0)] Location of the annotation. (X = position of line, Y = normalized vertical position of text)
     * @param {string} [options.text = ""] The 'header' text for the annotation line
     * @param {boolean} [options.textvisible = true] visibility of the text
     * @param {boolean} [options.linevisible = true] visibility of the line
     * @param {geotoolkit.attributes.LineStyle} [options.linestyle = {'color': 'black', 'width': 1}] Linestyle of the annotation line
     * @param {geotoolkit.attributes.FillStyle} [options.fillstyle = null] Background Fillstyle of the text
     * @param {geotoolkit.attributes.TextStyle} [options.textstyle = {'font': '12px Arial', 'color': 'black'}] Textstyle of the text
     * @param {geotoolkit.util.AnchorType} [options.alignment = geotoolkit.util.AnchorType.TopCenter] Anchor position of the text
     * @param {number} [options.angle = 0] angle
     * @returns {string} id
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.addAnnotationLine = function(options){};
    /**
     * Remove annotation line
     * @param {string} id annotation id
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.removeAnnotationLine = function(id){};
    /**
     * Edit annotation line
     * @param {string} id annotation id
     * @param {object} options JSON for annotation options
     * @param {geotoolkit.util.Point} [options.point = geotoolkit.util.Point(0, 0)] point
     * @param {string} [options.text = ""] text
     * @param {boolean} [options.textvisible = true] text visibility
     * @param {boolean} [options.linevisible = true] line visibility
     * @param {geotoolkit.attributes.LineStyle} [options.linestyle = {'color': 'black', 'width': 1}] linestyle
     * @param {geotoolkit.attributes.FillStyle} [options.fillstyle = null] fillstyle
     * @param {geotoolkit.attributes.TextStyle} [options.textstyle = {'font': '12px Arial', 'color': 'black'}] textstyle
     * @param {geotoolkit.util.AnchorType} [options.alignment = geotoolkit.util.AnchorType.TopCenter] alignment
     * @param {number} [options.angle = 0] angle
     * @returns {string} id
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.editAnnotationLine = function(id, options){};
    /**
     * add an Annotation object at the specific point : [curveid, time]
     * note: it will try to find the nearest point at the specific time.
     *
     * @param {object} options json object that represents the annotation options
     * @param {string} options.curveid curve id to match the poi
     * @param {number} options.time time index in model space
     * @param {string} [options.label=""] annotation text
     * @param {geotoolkit.attributes.TextStyle} [options.textstyle={'font': '12px Arial', 'color': 'black'}] text style of the annotation
     * @param {geotoolkit.attributes.FillStyle} [options.textbackground = {'color' : 'transparent'}] background of the annotation label
     * @param {string} [options.symbol=null] annotation symbol type
     * @param {geotoolkit.attributes.LineStyle} [options.linestyle = {'color': 'black', 'width': 1}] symbol line style
     * @param {geotoolkit.attributes.FillStyle} [options.fillstyle = {'color' : 'transparent'}] symbol fill style
     * @param {number} [options.symbolsize=10] symbol size width and height
     * @returns {string|null} id of the created Annotation object or null if it cannot be inserted at the following time
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.addAnnotation = function(options){};
    /**
     *
     * @param {string} id annotation id
     * @param {object} options annotation options
     * @returns {string}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.editAnnotation = function(id, options){};
    /**
     * remove annotation with the specified id.
     *
     * @param {string} id of the annotation to remove
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.removeAnnotation = function(id){};
    /**
     * Gets properties of the annotation line
     * @param {string} id id of annotation line to get properties
     * @returns {object} JSON that contains all properties of the annotation line
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getAnnotationLineProperties = function(id){};
    /**
     * Gets properties of the annotation
     * @param {string} id id of annotation line to get properties
     * @returns {object} JSON that contains all properties of the annotation line
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getAnnotationProperties = function(id){};
    /**
     * @param {string} curve id of curve to re-ordered
     * @param {geotoolkit.scene.CompositeNode.NodeOrder} order type of node re-ordering
     * @param {string} [anchor] id of anchor for re-ordering
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.changeVisualOrder = function(curve, order, anchor){};
    /**
     * Add a time series group, which shares axis and limits only
     * @param {string|object} id group id
     * @param {Array<string>} [id.curveids = []] curve ids
     * @param {number} [id.min = 0] min
     * @param {number} [id.max = 1] max
     * @param {object} [id.options ={}] See TimeSeriesObject axis options
     * @returns {string|null} id
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.createGroup = function(id){};
    /**
     * Remove a timeseries group
     * @param {string} groupid group id
     * @returns {geotoolkit.widgets.TimeSeriesWidget} this
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.removeGroup = function(groupid){};
    /**
     * Get TimeSeriesObjectGroup by ID
     * @param {string} groupid group id
     * @returns {geotoolkit.widgets.timeseries.TimeSeriesObjectGroup|null}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getGroupById = function(groupid){};
    /**
     * Returns visual layer
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getVisualFrontLayer = function(){};
    /**
     * Returns visual layer
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getVisualBackLayer = function(){};
    /**
     * Returns overlay layer
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.getOverlayLayer = function(){};
    /**
     * Exports the widget content as a PDF file
     * @param {object} [options=null] PDF options
     * @param {geotoolkit.scene.exports.HeaderComponent} [options.header = null] an optional PDF header
     * @param {geotoolkit.scene.exports.FooterComponent} [options.footer = null] an optional PDF footer
     * @param {string} [options.output = 'PDF Output'] define optional output filename
     * @param {boolean} [options.save = false] flag to save the pdf directly to file or open dialog
     * @param {object} [options.printsettings] define optional paper and export parameters
     * @param {object} [options.printsettings.paperformat] define optional paper paper format
     * @param {number} [options.printsettings.top=0.5] define optional top margin
     * @param {number} [options.printsettings.bottom=0.5] define optional bottom margin
     * @param {number} [options.printsettings.left=0.5] define optional left margin
     * @param {number} [options.printsettings.right=0.5] define optional top margin
     * @param {string} [options.printsettings.orientation='Landscape'] define optional paper orientation
     * @param {string} [options.printsettings.scaling='FitBoth'] define optional scaling mode. Specify ( 'scaling': geotoolkit.scene.exports.ScalingOptions.FitWidth,) to fit all tracks in your page width.
     * @param {boolean} [options.printsettings.keepaspectratio=true] keep aspect ratio
     * @param {boolean} [options.printsettings.continuous=false] continuous printing
     * @param {boolean} [options.printsettings.drawwesttoeast=true] draw pages from West to East. For continuous printing set drawwesttoeast = false
     * @param {object} [options.limits] export depth or time limits
     * @param {object} [options.limits.start] start limit by default visible limits
     * @param {object} [options.limits.end] end limit by default visible limits
     * @param {?number} [options.scale = 1] export scale from model index unit to pixels by default as is
     * @param {geotoolkit.pdf.SpeedCompression} [options.imagecompression.speed=geotoolkit.pdf.SpeedCompression.MEDIUM] speed referring to the png compression speed, available for png mode only.
     * @param {boolean} [options.streamcompression=true] enable or disable pdf output compression
     * @param {geotoolkit.util.stream.Stream} [options.pdfstream = null] optional user-customized Stream object
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.exportToPDF = function(options){};
    /**
     * Dispose
     * @override
     */
    geotoolkit.widgets.TimeSeriesWidget.prototype.dispose = function(){};

/**
 * A table view displays a list of items in a single column and allows users to scroll through the table. The data is either passed by a data object or a function.
 * The widget can be customized using options() in the constructor.<br>
 * Some of the default tools are available to support:
 * <ul>
 * <li>Horizontal Scrollbar</li>
 * <li>Vertical Scrollbar</li>
 * <li>Panning Listener</li>
 * <li>Tableview Highlight</li>
 * <li>Tableview Selection</li>
 * </ul>
 * The widget can be customized using options() in the constructor. <br>
 * @class geotoolkit.widgets.TableView
 * @augments geotoolkit.widgets.AnnotatedWidget
 * @param {object} [options] the json object
 * @param {number} [options.rows] rows
 * @param {number} [options.cols] columns
 * @param {boolean} [options.fixedsize=false] performance hint for table view
 * @param {geotoolkit.util.Rect} [options.bounds] bounds
 * @param {object} [options.border] defines properties for widget outer border
 * @param {object} [options.border.color] color of border border
 *
 * @example
 * // 1). Initialize Widget
 * var tableViewWidget = new geotoolkit.widgets.TableView({
 * 'horizontalscroll': 'floating',
 * 'verticalscroll': 'floating',
 * 'rows': '4',
 * 'cols': '4'
 * });
 * var data = new TableViewDataSource(rowCount, colCount);
 * var tableViewWidget = createTableViewWidget(data); // create random data. Data can be provided through either an explicit function or through dataTable
 * tableViewWidget.setData({
 * 'content': { // Customize the appearance of the table as needed.
 * 'textstyle': {
 * 'color': 'darkblue',
 * 'alignment': 'center',
 * 'baseLine': 'middle'
 * },
 * 'evenfillstyle': 'lightblue'
 * },
 * });
 *
 * // 2). This example below shows how to create a TableView with only columns and without the first row index column.
 * var tableViewWidget = new geotoolkit.widgets.TableView({...})// Set data using setData method
 * .setData({
 * 'indextitle': '', //remove title from index column
 * ....
 * // Set table bounds in columns, rows
 * 'rows': data.getRowsCount(),
 * 'cols': data.getColumnsCount(),
 *
 * 'defaultcellsize': new geotoolkit.util.Dimension(0, 30) //default width is zero
 * });
 * for(var c=0;c<data.getColumnsCount();c++)
 * tableViewWidget.setColumnsSize(c, 100); //manually apply column widths
 * @example
 * // 3). This example shows a way to trigger a function when a row is selected:
 * // Setup manipulators - Panning, Highlight, Scrollbars
 * var toolsContainer = new geotoolkit.controls.tools.ToolsContainer(plot);
 * toolsContainer.add(tableViewWidget.getTool());
 * //
 * var highlight = tableViewWidget.getToolByName("TableViewSelection");
 * highlight.addListener(geotoolkit.controls.tools.Selection.Events.onPick, function(sender, eventArgs) {
 * var manipulators = tableViewWidget.getToolByName("TableViewCompositeTool");
 * var tableViewShape = tableViewWidget.getTableViewShape();
 * var point = manipulators.pointToModel(tableViewShape, eventArgs);
 * var cell = tableViewShape.resolveCellCoordinate(point.getX(), point.getY());
 * geotoolkit.log("Row number : " +cell.getY());
 * }.bind(this));
 *
 */
geotoolkit.widgets.TableView = {};
    /**
     * TableView's Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.widgets.TableView.Events = {};
        /**
         * Event type fired when the column width has changed
         * @type {string}
         */
        geotoolkit.widgets.TableView.Events.ColumnWidthChanged = "";
        /**
         * Event type fired when the table size has changed
         * @type {string}
         */
        geotoolkit.widgets.TableView.Events.TableSizeChanged = "";
        /**
         * Event type fired when the table content view position was changed
         * @type {string}
         */
        geotoolkit.widgets.TableView.Events.TableAdjusted = "";
    /**
     * returns a real size of columns
     * @param {number} [column] column index
     * @returns {number}
     */
    geotoolkit.widgets.TableView.prototype.getColumnsSize = function(column){};
    /**
     * Set column width
     * @param {number} column column to set the size for, -1 for the index column
     * @param {number} width width or size for the column
     * @returns {geotoolkit.widgets.TableView} this
     *
     * @example
     * //To dynamically set column widths per column
     * tableViewWidget.setColumnsSize(0, 50)
     */
    geotoolkit.widgets.TableView.prototype.setColumnsSize = function(column, width){};
    /**
     * Resize all column widths to fit to visible table width
     * @param {boolean} [distributeColumnsEvenly=false] evenly flag
     * @returns {geotoolkit.widgets.TableView} this
     */
    geotoolkit.widgets.TableView.prototype.fitToWidth = function(distributeColumnsEvenly){};
    /**
     * Returns a real size of rows
     * @returns {number}
     */
    geotoolkit.widgets.TableView.prototype.getRowsSize = function(){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect | object} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.widgets.TableView} this
     */
    geotoolkit.widgets.TableView.prototype.setBounds = function(bounds){};
    /**
     * Returns base shape
     *
     * @returns {geotoolkit.controls.shapes.TableView}
     */
    geotoolkit.widgets.TableView.prototype.getTableViewShape = function(){};
    /**
     * Set bounds for table in rows, columns
     *
     * @param {number} rows bounds for table in rows
     * @param {number} columns bounds for table in columns
     * @returns {geotoolkit.widgets.TableView}
     */
    geotoolkit.widgets.TableView.prototype.setTableBounds = function(rows, columns){};
    /**
     * Returns table bounds
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.widgets.TableView.prototype.getTableBounds = function(){};
    /**
     * Returns table size in column, row count
     *
     * @returns {geotoolkit.util.Dimension}: columns, rows
     */
    geotoolkit.widgets.TableView.prototype.getTableSize = function(){};
    /**
     * Returns table limits in column, row size
     *
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.widgets.TableView.prototype.getVisibleTableLimits = function(){};
    /**
     * Set visible table limits to specific position in column, row
     *
     * @param {number} row table limits to specific position in row
     * @param {number} column table limits to specific position in column
     * @returns {geotoolkit.widgets.TableView}
     */
    geotoolkit.widgets.TableView.prototype.setVisibleTableLimits = function(row, column){};
    /**
     * set data and properties of the tableview widget.
     * @param {object} data the data object
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
     * @param {object} [data.header] json defining header style
     * @param {geotoolkit.attributes.LineStyle} [data.header.gridstyle] Grid style
     * @param {geotoolkit.attributes.TextStyle} [data.header.textstyle] Text style
     * @param {geotoolkit.attributes.FillStyle} [data.header.headerfillstyle] Header fill style
     * @param {object} [data.content] json defining content style
     * @param {geotoolkit.attributes.LineStyle} [data.content.gridstyle] Grid style
     * @param {geotoolkit.attributes.TextStyle} [data.content.textstyle] Text style
     * @param {geotoolkit.attributes.FillStyle} [data.content.oddfillstyle] Odd row style
     * @param {geotoolkit.attributes.FillStyle} [data.content.evenfillstyle] Even row style
     * @param {object} [data.index] json defining index style
     * @param {geotoolkit.attributes.LineStyle} [data.index.gridstyle] Grid style
     * @param {geotoolkit.attributes.TextStyle} [data.index.textstyle] Text style
     * @param {geotoolkit.attributes.FillStyle} [data.index.oddfillstyle] Odd row style
     * @param {geotoolkit.attributes.FillStyle} [data.index.evenfillstyle] Even row style
     * @param {geotoolkit.attributes.FillStyle} [data.index.markerfillstyle] Marker fill style
     * @param {geotoolkit.attributes.LineStyle} [data.index.markerlinestyle] Marker line style
     *
     * @param {geotoolkit.attributes.FillStyle} [data.highlightfillstyle] Highlight style
     *
     * @param {geotoolkit.util.Rect} [data.bounds] Bounds
     * @param {number} [data.rows] Table view row count
     * @param {number} [data.cols] Table view column count
     * @param {geotoolkit.util.Dimension} [data.defaultcellsize] Default cell dimensions
     *
     * @returns {geotoolkit.widgets.TableView}
     */
    geotoolkit.widgets.TableView.prototype.setData = function(data){};
    /**
     * Main method of scrolling the table view
     *
     * @param {number} dx relative change in x coordinate
     * @param {number} dy relative change in y coordinate
     * @returns {geotoolkit.widgets.TableView}
     */
    geotoolkit.widgets.TableView.prototype.translateTable = function(dx, dy){};
    /**
     * Select row index for highlighting
     *
     * @param {number} row row index for highlighting
     * @param {boolean|null} autoScroll by default is true
     * @returns {geotoolkit.widgets.TableView}
     */
    geotoolkit.widgets.TableView.prototype.highlightRow = function(row, autoScroll){};
    /**
     * Return highlighted row index
     *
     * @returns {number}
     */
    geotoolkit.widgets.TableView.prototype.getHighlightedRow = function(){};
    /**
     * Set active row index
     *
     * @param {Array.<number>|number|null} rows active row index
     * @param {boolean|null} autoScroll by default is true
     * @returns {geotoolkit.widgets.TableView}
     */
    geotoolkit.widgets.TableView.prototype.setActiveRow = function(rows, autoScroll){};
    /**
     * Return active row index
     * @deprecated use geotoolkit.widgets.TableView.getActiveRows instead
     * @returns {number}
     */
    geotoolkit.widgets.TableView.prototype.getActiveRow = function(){};
    /**
     * Return active rows as array index
     *
     * @returns {Array.<number>} actives indexes row
     */
    geotoolkit.widgets.TableView.prototype.getActiveRows = function(){};
    /**
     * Select column index for highlighting
     *
     * @param {number} column column index for highlighting
     * @returns {geotoolkit.widgets.TableView}
     */
    geotoolkit.widgets.TableView.prototype.highlightColumn = function(column){};
    /**
     * Return highlighted column index
     *
     * @returns {number}
     */
    geotoolkit.widgets.TableView.prototype.getHighlightedColumn = function(){};
    /**
     * Horizontal Scrollbar
     * Vertical Scrollbar
     * Panning Listener
     * Table Row Highlighting
     *
     * @returns {geotoolkit.widgets.TableView}
     * @protected
     */
    geotoolkit.widgets.TableView.prototype.initializeTools = function(){};

/**
 * The barchart widget is an annotated widget that is specialized for bar charts representation
 * <p>
 * A bar chart is a chart that uses either horizontal or vertical bars to show comparisons among categories.
 * One axis of the chart shows the specific categories being compared, and the other axis represents a discrete value.
 * It uses {@link geotoolkit.controls.shapes.BarChart} internally
 * </p>
 * <p>
 * Barchart widget inherits from AnnotatedWidget, so it takes most of its functionality including all its tools.
 * The main way to configure and customize the widget is to use the different setData() and setOptions() functions
 * that provide a comprehensible way of changing the default look and feel of the widget.
 * <ul>
 * <li> setData() will pass through everything to the {@link geotoolkit.controls.shapes.BarChart}'s "setData" for the internal shape.</li>
 * <li> setOptions() will pass 'shape' on to {@link geotoolkit.controls.shapes.BarChart}'s "setOptions" for the internal shape options. Here we can set the two grid tickgenerators, reference line and take the AnnotatedWidgets values for annotations.
 * From the Shape, the Widget adds ReferenceLine, Axes, and Grids to the Barchart shape. </li>
 * </ul>
 * </p>
 *
 * @class geotoolkit.widgets.BarChartWidget
 * @augments geotoolkit.widgets.AnnotatedWidget
 * @param {object} options widget options set
 * @param {object} [options.shape] BarChart shape options see {@link geotoolkit.controls.shapes.BarChart#setOptions}
 * @param {geotoolkit.controls.shapes.BarChart.Orientation} [options.shape.orientation=BarChart.Orientation.Bottom] shape orientation
 * @param {object} [options.referenceline] reference line options set
 * @param {boolean} [options.referenceline.visible=false] visibility flag
 * @param {number} [options.referenceline.value=NaN] value to display reference line at
 * @param {geotoolkit.attributes.LineStyle} [options.referenceline.linestyle] reference line style
 *
 * @param {boolean} [options.mirror=false] enables bar chart mirroring
 *
 * @param {object} [options.grid] grid options set
 * @param {geotoolkit.axis.TickGenerator} [options.grid.values] JSON with tick options for the gridvalue tick generator. See {@link geotoolkit.axis.TickGenerator#setOptions}
 * @param {geotoolkit.axis.TickGenerator} [options.grid.groups] JSON with tick options for the gridgroup tick generator. See {@link geotoolkit.axis.TickGenerator#setOptions}
 *
 * @param {object} [options.annotations] JSON to hold annotations' options see {@link geotoolkit.widgets.AnnotatedWidget#setAnnotationsOptions}
 * @param {boolean} [options.neatlimits=true] enable automatic calculation of limits for value axis and gridlines
 * @param {boolean} [options.minspan=50] minimum span for neat limits in pixel between ticks
 * @param {object} [data] data data (see "setData" API for detailed description)
 *
 * @example
 * <caption> 1). Initialise Widget </caption>
 * // set the BarChart shape options
 * // Refer to {@link geotoolkit.controls.shapes.BarChart}'s "setOptions for all the options that can be set.
 * var options = {
 * 'shape': {
 * //Setting line style and fill style for each bar item, keep in same order to data set
 * 'barstyles': [
 * {
 * 'linestyles': new LineStyle(Helpers.getColor("green")),
 * 'fillstyles': new FillStyle(Helpers.getColor("green"))
 * },
 * {
 * 'linestyles': new LineStyle(Helpers.getColor("gray")),
 * 'fillstyles': new FillStyle(Helpers.getColor("gray"))
 * }
 * ],
 * //Choosing bar mode
 * 'barmode': BarChart.BarMode.Default,
 * }
 * },
 *
 * // Create the data
 * var data = {
 * 'mode': BarChart.DataMode.Associative,
 * 'datasets': [
 * { 'values': [15, 30, 6, 54] },
 * { 'values': [8, 17, 10, 35] }
 * ]
 * };
 *
 * // Finally, create the BarChart widget using the options and data.
 * var widget = new geotoolkit.widgets.BarChartWidget(options, data);
 */
geotoolkit.widgets.BarChartWidget = {};
    /**
     * Gets data layer
     * @returns {geotoolkit.scene.Layer}
     */
    geotoolkit.widgets.BarChartWidget.prototype.getDataLayer = function(){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect | object} bounds bound of the node in the parent coordinates
     * @returns {geotoolkit.widgets.BarChartWidget} this
     */
    geotoolkit.widgets.BarChartWidget.prototype.setBounds = function(bounds){};
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
     * @returns {geotoolkit.widgets.BarChartWidget} this
     */
    geotoolkit.widgets.BarChartWidget.prototype.setFormatLabelHandler = function(handler){};
    /**
     * Sets bar chart's data
     *
     * @override
     * @param {!object} data data object (see {@link geotoolkit.controls.shapes.BarChart}'s "setData" description)
     * @see {@link geotoolkit.controls.shapes.BarChart}
     * @returns {geotoolkit.widgets.BarChartWidget} this
     */
    geotoolkit.widgets.BarChartWidget.prototype.setData = function(data){};
    /**
     * @override
     */
    geotoolkit.widgets.BarChartWidget.prototype.getData = function(){};
    /**
     * Gets value of sample
     * @param {number} series series id
     * @param {number} sample sample id
     * @returns {number|null} a value of sample for the specified series
     */
    geotoolkit.widgets.BarChartWidget.prototype.getValueAt = function(series, sample){};
    /**
     * Updates the widget's configuration with the passed in configuration
     *
     * @param {object} options widget options set
     * @param {object} [options.shape] BarChart shape options see {@link geotoolkit.controls.shapes.BarChart#setOptions}
     * @param {geotoolkit.controls.shapes.BarChart.Orientation} [options.shape.orientation] shape orientation
     * @param {object} [options.referenceline] reference line options set
     * @param {boolean} [options.referenceline.visible] visibility flag
     * @param {number} [options.referenceline.value] value to display reference line at
     * @param {geotoolkit.attributes.LineStyle} [options.referenceline.linestyle] reference line style
     * @param {boolean} [options.mirror=false] enables bar chart mirroring
     * @param {object} [options.grid] grid options set
     * @param {geotoolkit.axis.TickGenerator} [options.grid.values] JSON with tick options for the gridvalue tick generator. See {@link geotoolkit.axis.TickGenerator#setOptions}
     * @param {geotoolkit.axis.TickGenerator} [options.grid.groups] JSON with tick options for the gridgroup tick generator. See {@link geotoolkit.axis.TickGenerator#setOptions}
     * @param {object} [options.annotations] JSON to hold annotations' options see {@link geotoolkit.widgets.AnnotatedWidget#setAnnotationsOptions}
     * @param {boolean} [options.neatlimits] enable automatic calculation of limits for value axis and gridlines
     * @param {boolean} [options.minspan] minimum span for neat limits in pixel between ticks
     * @returns {geotoolkit.widgets.BarChartWidget}
     */
    geotoolkit.widgets.BarChartWidget.prototype.setOptions = function(options){};
    /**
     * Updates layout
     * @override
     * @returns {geotoolkit.widgets.BarChartWidget} this
     */
    geotoolkit.widgets.BarChartWidget.prototype.updateLayout = function(){};
    /**
     * Highlight specified bars
     *
     * @param {!Array} bars array of {@link geotoolkit.controls.data.SerieElementInfo} bars to highlight
     * @param {boolean} [append=false] append/replace flag
     * @returns {geotoolkit.widgets.BarChartWidget} this
     */
    geotoolkit.widgets.BarChartWidget.prototype.highlightBars = function(bars, append){};
    /**
     * Select elements at specified canvas coordinates
     *
     * @param {number | geotoolkit.util.Point} x x-coordinate OR {x,y}-coordinates
     * @param {number} [y] y-coordinate
     * @param {boolean} [highlight=false] highlight selected elements
     * @returns {Array} array of {@link geotoolkit.controls.data.SerieElementInfo} selected bars
     */
    geotoolkit.widgets.BarChartWidget.prototype.selectBarsAt = function(x, y, highlight){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {object} props JSON containing properties
     */
    geotoolkit.widgets.BarChartWidget.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} props JSON containing properties see {@link geotoolkit.widgets.BarChartWidget#setOptions}
     * @returns {geotoolkit.widgets.BarChartWidget} this
     */
    geotoolkit.widgets.BarChartWidget.prototype.setProperties = function(props){};

/**
 * The bubblechart widget is an annotated widget that is specialized for bubble chart representations.
 * It uses {@link geotoolkit.controls.shapes.BubbleChart} internally.<br>
 * <p>
 * The main way to configure and customize the widget is to use the different setData() function that provides a comprehensible way of changing the default look and feel of the widget.
 * </p>
 * <p>
 * It reuses the default tools provided by the AnnotatedWidget and customizes them for bubblechart related operations.
 * It also provides utility functions to highlight points by index <br>
 * </p>
 * <p>
 * The Bubblechart can represent 4D datasets (X,Y ,color and size) and by default contains only a single dataset.
 * The color of each point can be defined using a colorprovider and the corresponding colorbar can be displayed.
 * </p>
 *
 * @class geotoolkit.widgets.BubbleChart
 * @augments geotoolkit.widgets.AnnotatedWidget
 * @param {object} [options]
 * @param {geotoolkit.util.Rect} [options.bounds] where to place the XPlot
 * @param {boolean} [options.viewcache=true] enable tiled cache. It increase rendering performance for historical data
 * @param {object} [options.viewcachesize]
 * @param {object} [options.viewcachesize.width=256] set tiled cache size.
 * @param {object} [options.viewcachesize.height=256] set tiled cache size.
 *
 * @example
 * <caption> 1). Initialise Widget </caption>
 * // To create a new Bubble Chart widget, it is necessary to provide data series for x, y and s axis for rendering.
 * // The example below instantiates a simple Bubble Chart widget with data arrays and default options including default symbol 'circle' and color 'sky blue'.
 var widget = new geotoolkit.widgets.BubbleChart({
 'bounds': new geotoolkit.util.Rect(0, 0, 800, 400),
 'tools': {
 'horizontalscroll': {'visible': false}, // default is visible
 'verticalscroll': {'visible': false}

 },
 'x': {
 'data': [10, 21, 34, 41, 52, 63, 75, 89],
 'name': 'length',
 'unit': 'ft',
 'label': {
 'text': 'length (ft)'
 },
 'annotationsize': 50

 },
 'y': {
 'data': [90, 190, 160, 320, 270, 250, 190, 80],
 'name': 'weight',
 'unit': 'lb',
 'label': {
 'text': 'weight (lb)'
 },
 'annotationsize': 60
 },
 's': {
 'data': [7, 13, 21, 25, 29, 32, 34, 38],
 'name': 'radius',
 'unit': 'ft'
 }
 });
 *
 * @example
 * // 2). To enable other options like Tooltip use the following code.
 * widget.setToolsOptions({
 * 'tooltip': {'enabled': true}
 * });
 */
geotoolkit.widgets.BubbleChart = {};
    /**
     * create grid and axes
     * @returns {geotoolkit.widgets.BubbleChart}
     */
    geotoolkit.widgets.BubbleChart.prototype.createGridAndAxes = function(){};
    /**
     * function call in the constructor to initialize tools in the widget <br>
     * This widget adds a selection filter. This filter is used to send a object that contains the bubblechart shape reference and
     * an array of indices that represents selected shapes. Also, this widget adds a hover selection filter for showing tooltip when hovering on the bubble.
     * @override
     * @returns {geotoolkit.widgets.BubbleChart}
     * @protected
     */
    geotoolkit.widgets.BubbleChart.prototype.initializeTools = function(){};
    /**
     * Sets options and/or data
     * @override
     * @param {object} data options
     * @param {object |geotoolkit.util.Rect} [data.bounds] bounds. See {geotoolkit.util.Rect.setProperties} for details.
     * @param {object} [data.header] JSON which defines header area
     * @param {object} [data.header.title] JSON which defines main title. See {geotoolkit.attributes.Text.setProperties} for details.
     * @param {number} [data.header.annotationsize] height of header
     *
     * @param {object} [data.painter] JSON which defines painter options
     * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [data.painter.symbol] symbol painter style
     * @param {string} [data.painter.defaultcolor] default color for symbol
     * @param {string|object|geotoolkit.attributes.FillStyle} [data.painter.defaultfillstyle] default fillstyle for symbol
     * @param {string|object|geotoolkit.attributes.LineStyle} [data.painter.defaultlinestyle] default linestyle for symbol
     * @param {geotoolkit.util.ColorProvider} [data.colorprovider] color provider
     *
     * @param {object} [data.x] JSON which define the properties of axis X , See {geotoolkit.widgets.BubbleChart.setAxisData} for details.
     * @param {object} [data.y] JSON which define the properties of axis Y , See {geotoolkit.widgets.BubbleChart.setAxisData} for details.
     * @param {object} [data.z] JSON which define the properties of axis z , See {geotoolkit.widgets.BubbleChart.setAxisData} for details.
     * @param {object} [data.s] JSON which define the size of bubble and related properties S , See {geotoolkit.widgets.BubbleChart.setAxisData} for details.
     *
     * @param {object} [data.tools] JSON which define the tools used in this widgets, See { geotoolkit.widgets.BubbleChart.setToolsOptions} for details.
     * @param {object} [data.trendline] JSON which defines trend line options
     * @param {object} [data.trendline.model] regression model
     * @param {number} [data.trendline.interval] sample interval(pixel) for drawing the line based on calculated regression function
     * @param {number} [data.trendline.order] polynomial order only work for polynomial regression
     * @param {geotoolkit.attributes.LineStyle} [data.trendline.linestyle] the style of trend line
     *
     * @returns {geotoolkit.widgets.BubbleChart} this
     */
    geotoolkit.widgets.BubbleChart.prototype.setData = function(data){};
    /**
     * get data and options
     * @param {boolean} ignoreDataOptions when true get all thins excluding data array
     * @returns {Object}
     */
    geotoolkit.widgets.BubbleChart.prototype.getData = function(ignoreDataOptions){};
    /**
     * Sets visual options
     * @override
     * @param {object} options bubble chart options
     * @param {object} [options.header] JSON which defines header area
     * @param {object} [options.header.title] JSON which defines main title. See {geotoolkit.attributes.Text.setProperties} for details.
     * @param {number} [options.header.annotationsize] height of header
     *
     * @param {object} [options.painter] JSON which defines painter options
     * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [options.painter.symbol] symbol painter style
     * @param {string} [options.painter.defaultcolor] deprecated (since 2.6) default symbol color
     * @param {string|object|geotoolkit.attributes.FillStyle} [options.painter.defaultfillstyle] default fillstyle for symbol
     * @param {string|object|geotoolkit.attributes.LineStyle} [options.painter.defaultlinestyle] default linestyle for symbol
     * @param {geotoolkit.util.ColorProvider} [options.colorprovider] color provider
     *
     * @param {object} [options.trendline] JSON which defines trend line options
     * @param {object} [options.trendline.model] regression model
     * @param {number} [options.trendline.interval] sample interval(pixel) for drawing the line based on calculated regression function
     * @param {number} [options.trendline.order] polynomial order only work for polynomial regression
     * @param {geotoolkit.attributes.LineStyle} [options.trendline.linestyle] the style of trend line
     *
     * @returns {geotoolkit.widgets.BubbleChart} this
     */
    geotoolkit.widgets.BubbleChart.prototype.setOptions = function(options){};
    /**
     * gets visual options
     * @returns {object} options
     * @returns {object} [options.header] JSON that contains header definitions
     * @returns {object} [options.header.title] JSON that contains main title definition. See {geotoolkit.attributes.Text.getProperties} for details
     * @returns {number} [options.header.annotationsize] height of the header
     *
     * @returns {object} [options.painter] JSON which contains painter option definitions
     * @returns {geotoolkit.scene.shapes.painters.AbstractPainter} [options.painter.symbol] symbol painter
     * @returns {string} [options.painter.defaultcolor] @deprecated default symbol color
     * @returns {string|object|geotoolkit.attributes.FillStyle} [options.painter.defaultfillstyle] default symbol fillstyle
     * @returns {string|object|geotoolkit.attributes.LineStyle} [options.painter.defaultlinestyle] default symbol linestyle
     * @returns {geotoolkit.util.ColorProvider} [options.colorprovider] color provider
     *
     * @returns {object} [options.trendline] JSON which contains trend line options
     * @returns {object} [options.trendline.model] regression model
     * @returns {number} [options.trendline.interval] sample interval used to draw regression line
     * @returns {geotoolkit.attributes.LineStyle} [data.trendline.linestyle] trend line style
     *
     * @returns {object} [options.tools] JSON which contains tools options. See {geotoolkit.widgets.AnnotatedWidget.getToolsOption} for details
     */
    geotoolkit.widgets.BubbleChart.prototype.getOptions = function(){};
    /**
     * get instance of color bar
     * @returns {geotoolkit.controls.shapes.ColorBar} instance of color bar
     */
    geotoolkit.widgets.BubbleChart.prototype.getColorBar = function(){};
    /**
     * return results of analysis
     * @returns {object}
     */
    geotoolkit.widgets.BubbleChart.prototype.getRegressionAnalysis = function(){};
    /**
     * draw regression line on the chart
     * @param {object} [options] JSON which defines trend line options, see geotoolkit.controls.shapes.RegressionLine for details
     * @returns {geotoolkit.widgets.BubbleChart} this
     */
    geotoolkit.widgets.BubbleChart.prototype.updateRegressionLine = function(options){};
    /**
     * get options of trend line
     * @returns {object}
     */
    geotoolkit.widgets.BubbleChart.prototype.getTrendlineOptions = function(){};
    /**
     * Get converted label text
     * @param {string} axis axis to apply
     * @returns {object}
     */
    geotoolkit.widgets.BubbleChart.prototype.getLabelTextConverter = function(axis){};
    /**
     * Set Parameters for axis
     * @param {string} axis axis to apply ('x', 'y' , 'z' or 's' )
     * @param {object} [data] JSON which defines data.
     * @param {Array} [data.data] Array of data
     * @param {(geotoolkit.data.NumericalDataSeries|geotoolkit.data.NumericalDataSeriesView|null)} [data.datasource] DataSource of data
     * @param {(geotoolkit.util.AbstractUnit|string|null)} [data.unit] display unit
     * @param {boolean} [data.autominmax = false] are min/max fixed (false) or automatically calculated
     * @param {boolean} [data.neatlimit = false] enable to calculate neat limits based on existing limits
     * @param {object} [data.label] JSON which defines label. See {geotoolkit.attributes.Text.setProperties} for details.
     * @param {number} [data.annotationsize] width or height of annotation
     * @param {number} [data.min] set the minimum limit to display data.
     * @param {number} [data.max] set the maximum limit to display data.
     * @param {boolean} [data.reversed] Is the Axis reversed.
     * @param {boolean} [data.logarithmic] Is the Axis logarithmic.
     * @param {geotoolkit.axis.TickGenerator} [data.tickgenerator] a custom tickgenerator for this axis
     * @param {object} [data.axisticks] JSON which defines ticks options of the axis. See {geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {object} [data.gridticks] JSON which defines horizontal ticks options of the grid (X or Y axis only). See {geotoolkit.axis.TickGenerator.setOptions} for details
     * @param {boolean} [data.legendvisible] set legend (colorbar) visibility (Z only)
     * @param {object} [chartData] JSON which defines bubblechart shape data and options
     * @returns {geotoolkit.widgets.BubbleChart} this
     */
    geotoolkit.widgets.BubbleChart.prototype.setAxisData = function(axis, data, chartData){};
    /**
     *
     * @param {string} axis axis
     * @param {boolean} ignoreDataOptions when true get all thins excluding data array
     * @returns {object}
     */
    geotoolkit.widgets.BubbleChart.prototype.getAxisData = function(axis, ignoreDataOptions){};
    /**
     * Highlights the selected symbols
     * @param {object} items object which contain the symbols to be highlighted
     * @param {boolean} reset un-highlights previously selected symbols
     */
    geotoolkit.widgets.BubbleChart.prototype.highlightIndices = function(items, reset){};
    /**
     * Get the reference of overlay layer
     * @returns {geotoolkit.scene.Layer}
     */
    geotoolkit.widgets.BubbleChart.prototype.getOverLayer = function(){};
    /**
     * Get the R-squared value for measuring the performance the regression line
     * @returns {number}
     */
    geotoolkit.widgets.BubbleChart.prototype.getRsquared = function(){};
    /**
     * Gets Highlighted Indices
     * @returns {Array} array of indices
     */
    geotoolkit.widgets.BubbleChart.prototype.getHighlightIndices = function(){};
    /** Set Options for Header
     * @param {object} [data] JSON which defines header area
     * @param {object} [data.title] JSON which defines main title. See {geotoolkit.attributes.Text.setProperties} for details.
     * @param {number} [data.annotationsize] height of header
     * @returns {geotoolkit.widgets.BubbleChart} this
     */
    geotoolkit.widgets.BubbleChart.prototype.setHeader = function(data){};
    /**
     * get header options
     * @returns {object}
     */
    geotoolkit.widgets.BubbleChart.prototype.getHeader = function(){};
    /**
     * set labels for bubbles
     * @param {Object} [data] JSON which define properties of labels
     * @param {Array|geotoolkit.data.DataSeries} [data.data] Data series of labels
     * @param {string} [data.location=BubbleChart.labelLocation.Center] The relative location of label to bubble
     * @param {string} [data.secondarylocation=null] The relative location of label to bubble when first location is unable to show the label completely
     * @param {geotoolkit.attributes.TextStyle} [data.textstyle] the text style of labels
     * @param {number} [data.padding=0] the padding between labels and bubble or view boundary
     * @param {boolean} [data.visible=false] flag determine the visibility of labels
     * @param {object} [chartData] JSON which defines bubblechart shape data and options
     * @returns {geotoolkit.widgets.BubbleChart} this
     */
    geotoolkit.widgets.BubbleChart.prototype.setLabels = function(data, chartData){};
    /**
     * get properties of labels
     * @returns {object}
     */
    geotoolkit.widgets.BubbleChart.prototype.getLabels = function(){};
    /**
     * Set painter Options
     *
     * @param {object} [data] JSON which defines painter options
     * @param {geotoolkit.scene.shapes.painters.AbstractPainter} [data.symbol] symbol painter style
     * @param {string} [data.defaultcolor] deprecated (since 2.6) default color for symbol
     * @param {string|object|geotoolkit.attributes.FillStyle} [data.defaultfillstyle] default fillstyle for symbol
     * @param {string|object|geotoolkit.attributes.LineStyle} [data.defaultlinestyle] default linestyle for symbol
     * @param {string} [data.highlightcolor] highlight color for symbol
     * @param {object} [chartData] JSON which defines bubblechart shape data and options
     * @returns {geotoolkit.widgets.BubbleChart} this
     */
    geotoolkit.widgets.BubbleChart.prototype.setPainter = function(data, chartData){};
    /**
     * get painter's properties
     * @returns {object}
     */
    geotoolkit.widgets.BubbleChart.prototype.getPainter = function(){};
    /**
     * Sets color provider
     * @param {geotoolkit.util.ColorProvider} [cp] color provider
     * @param {object} [chartData] JSON which defines bubblechart shape data and options
     * @returns {geotoolkit.widgets.BubbleChart} this
     */
    geotoolkit.widgets.BubbleChart.prototype.setColorProvider = function(cp, chartData){};
    /**
     * get color provider
     * @returns {geotoolkit.util.ColorProvider}
     */
    geotoolkit.widgets.BubbleChart.prototype.getColorProvider = function(){};
    /**
     * set symbol cache size
     * @param {object} options symbol options
     * @param {number} [options.width] the width of symbol cache
     * @param {number} [options.height] the height of symbol cache
     * @param {object} chartData JSON which defines bubble chart shape data and options
     * @returns {geotoolkit.widgets.BubbleChart}
     */
    geotoolkit.widgets.BubbleChart.prototype.setSymbolCache = function(options, chartData){};
    /**
     * Set Tools Options
     * @override
     * @param {object} [options] which define the tools options
     * @param {object} [options.tooltip] which define the tooltip options
     * @param {boolean} [options.tooltip.enabled] flag to enable tooltip
     * @param {Array} [options.tooltip.displayprops] list define which axis value could be displayed when hovering on the bubble
     * @param {geotoolkit.attributes.FillStyle} [options.tooltip.fillstyle] fillstyle for tooltip
     * @param {geotoolkit.attributes.LineStyle} [options.tooltip.linestyle] linestyle for tooltip bounds
     * @param {geotoolkit.attributes.TextStyle} [options.tooltip.textstyle] textstyle for tooltip item
     * See {geotoolkit.widgets.AnnotatedWidget.setToolsOptions} for details of other tools
     * @returns {geotoolkit.widgets.BubbleChart} this
     */
    geotoolkit.widgets.BubbleChart.prototype.setToolsOptions = function(options){};
    /**
     * get tools options
     * @returns {object}
     */
    geotoolkit.widgets.BubbleChart.prototype.getToolsOptions = function(){};
    /**
     * @override
     */
    geotoolkit.widgets.BubbleChart.prototype.dispose = function(){};

/**
 * this legend is only for bubblechart to show tooltip
 * @class geotoolkit.widgets.BubbleChart.BubbleWidgetTooltipLegendItem
 * @augments geotoolkit.controls.shapes.LegendItem
 * @param {object} object
 * @param {object} options
 * @param {string} [options.axisname] displayed name for this item
 * @param {string} [options.unit] displayed unit for this item
 * @param {number|string} [options.value] displayed value for this item
 * @param {geotoolkit.attributes.TextStyle} [options.textstyle] textstyle for the text
 */
geotoolkit.widgets.BubbleChart.BubbleWidgetTooltipLegendItem = {};

/**
 * <p>
 * DataTableAdapter allows use of DataTables with the tableView Widget.
 * </p>
 * @class geotoolkit.widgets.data.DataTableAdapter
 * @augments geotoolkit.util.EventDispatcher
 * @param {object} options DataTableAdapter Options
 * @param {geotoolkit.data.DataTable | geotoolkit.data.DataTableView} options.datatable dataTable
 * @param {string | object} [options.sortingarrowoptions = "black"] Color of arrow if Sorting tool is attached.
 * @param {string} [options.sortingarrowoptions.uparrowfillcolor="black"] fillColor of up-arrow.
 * @param {string} [options.sortingarrowoptions.downarrowfillcolor="black"] fillColor of down-arrow.
 * @param {string} [options.sortingarrowoptions.uparrowlinecolor="black"] lineColor of up-arrow.
 * @param {string} [options.sortingarrowoptions.downarrowlinecolor="black"] lineColor of down-arrow.
 */
geotoolkit.widgets.data.DataTableAdapter = {};
    /**
     * Gets sorted column number.
     * @returns {null|{column: number, reverse: boolean}}
     */
    geotoolkit.widgets.data.DataTableAdapter.prototype.getSortedByColumn = function(){};
    /**
     * Gives number of rows
     * @returns {number} Number of Rows
     */
    geotoolkit.widgets.data.DataTableAdapter.prototype.getRowsCount = function(){};
    /**
     * Gives number of columns
     * @returns {number} number of column
     */
    geotoolkit.widgets.data.DataTableAdapter.prototype.getColumnsCount = function(){};
    /**
     * Setting Content prepare
     * @param {number} fromRow Row-number
     * @param {number} toRow Row-number
     */
    geotoolkit.widgets.data.DataTableAdapter.prototype.prepareContent = function(fromRow, toRow){};
    /**
     * Returns the cell values of Table View Widget
     * @param {number} column column-number
     * @param {number} row row-number
     * @returns {string | number | object} cell-value
     */
    geotoolkit.widgets.data.DataTableAdapter.prototype.getContentData = function(column, row){};
    /**
     * Returns header data of Table View Widget
     * @param {number} column column-number
     * @returns {string} column header
     */
    geotoolkit.widgets.data.DataTableAdapter.prototype.getHeaderData = function(column){};
    /**
     * Returns Header style
     * @param {number} column column number
     * @param {object} headerStyle headerstyle
     * @returns {object} Header style
     */
    geotoolkit.widgets.data.DataTableAdapter.prototype.getHeaderFormat = function(column, headerStyle){};
    /**
     * Sorting by column in TableViewWidget using specified comparator function.
     * @param {number} column column number
     * @param {function} comparator comparator function
     */
    geotoolkit.widgets.data.DataTableAdapter.prototype.sortByColumn = function(column, comparator){};
    /**
     * Filtering in TableViewWidget by value specified by filter. By default, this method will return all column - cellvalues containing value to filter.
     * External function for filtering can also be provided.
     * @param {number} column column-number to filter column-specific data
     * @param {string | function} filterValue filtering term
     *
     * <p>
     * Filtering term can be string or function. <br/>
     * For using function, which filters value containing 'a'.<br/>
     * var filteringFunction = function (index , value){ <br/>
     * &nbsp&nbsp return value.toString().indexOf('a') !== -1 <br/>
     * }
     * </p>
     * @returns {geotoolkit.widgets.data.DataTableAdapter} this
     */
    geotoolkit.widgets.data.DataTableAdapter.prototype.filter = function(column, filterValue){};

