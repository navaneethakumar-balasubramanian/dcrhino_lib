/**
 * API to create multiwell display with correlation
 * @namespace */
geotoolkit.welllog.multiwell = {};
    /**
     * Well Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.welllog.multiwell.Events = {};
        /**
         * Event type fired when depth scale of the well is changed
         * @type {string}
         */
        geotoolkit.welllog.multiwell.Events.DepthScaleChanged = "";
    /**
     * enum for TrackType
     * @enum
     * @readonly
     */
    geotoolkit.welllog.multiwell.TrackType = {};
        /**
         * Track
         * @type {number}
         */
        geotoolkit.welllog.multiwell.TrackType.WellTrack = NaN;
        /**
         * Correlation track
         * @type {number}
         */
        geotoolkit.welllog.multiwell.TrackType.CorrelationTrack = NaN;

/**
 * API to create tools for multiwell display with correlation
 * @namespace */
geotoolkit.welllog.multiwell.tools = {};

/**
 * API to overlays for multiwell display with correlation
 * @namespace */
geotoolkit.welllog.multiwell.overlays = {};

/**
 * API to create correlation markers in multiwell display
 * @namespace */
geotoolkit.welllog.multiwell.correlation = {};

/**
 * Creates a CorrelationCursor tool. The tool supports events shown below. It provides built-in functions to customize the styles for the tool.
 *
 * @class geotoolkit.welllog.multiwell.tools.CorrelationCursor
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {object|geotoolkit.welllog.multiwell.MultiWellWidget} options JSON containing cursor options OR multi-well widget
 * @param {geotoolkit.welllog.multiwell.MultiWellWidget} options.multiwell - multi-well widget
 * @param {string} [options.name='correlation-cursor'] - name of the tool
 * @param {geotoolkit.attributes.LineStyle} [options.linestyle] - cursor line style
 *
 * @param {string} [name = 'correlation-cursor'] name of the tool
 */
geotoolkit.welllog.multiwell.tools.CorrelationCursor = {};
    /**
     * CorrelationCursor Events
     * @enum
     * @readonly
     */
    geotoolkit.welllog.multiwell.tools.CorrelationCursor.Events = {};
        /**
         * onPositionChanged
         * @type {string}
         */
        geotoolkit.welllog.multiwell.tools.CorrelationCursor.Events.onPositionChanged = "";
        /**
         * onPointerUp
         * @type {string}
         */
        geotoolkit.welllog.multiwell.tools.CorrelationCursor.Events.onPointerUp = "";
    /**
     * @override
     */
    geotoolkit.welllog.multiwell.tools.CorrelationCursor.prototype.onEnabledStateChanged = function(){};
    /**
     * Sets line style
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {CorrelationCursor} this
     */
    geotoolkit.welllog.multiwell.tools.CorrelationCursor.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * return line style
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.welllog.multiwell.tools.CorrelationCursor.prototype.getLineStyle = function(){};
    /**
     * return visible state
     * @returns {boolean}
     */
    geotoolkit.welllog.multiwell.tools.CorrelationCursor.prototype.isVisible = function(){};
    /**
     * Sets visible
     * @param {boolean} visible visible attribute set or not
     * @returns {CorrelationCursor} this
     */
    geotoolkit.welllog.multiwell.tools.CorrelationCursor.prototype.setVisible = function(visible){};
    /**
     * The current well depth of the cursor
     * @returns {Number}
     */
    geotoolkit.welllog.multiwell.tools.CorrelationCursor.prototype.getDepth = function(){};
    /**
     * Update position of cursor for the last mouse position. This code can be used
     * if content is scrolled to display the position of the cursor in the last mouse position
     * @returns {CorrelationCursor} this
     */
    geotoolkit.welllog.multiwell.tools.CorrelationCursor.prototype.updateCursorPosition = function(){};
    /**
     * Place the cursor at the specified well depth
     * @param {Number} depth well depth
     * @param {boolean} [silent=false] notification enabled or not
     * @returns {CorrelationCursor}
     */
    geotoolkit.welllog.multiwell.tools.CorrelationCursor.prototype.setDepth = function(depth, silent){};

/**
 * Creates default implementation of the well navigation tool for well track.
 * This tool displays navigation for each index track
 *
 * @class geotoolkit.welllog.multiwell.tools.WellNavigation
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.welllog.multiwell.IWellTrack} wellTrack
 */
geotoolkit.welllog.multiwell.tools.WellNavigation = {};
    /**
     * Returns navigation tool
     * @returns {geotoolkit.welllog.widgets.tools.Navigation}
     */
    geotoolkit.welllog.multiwell.tools.WellNavigation.prototype.getNavigation = function(){};

/**
 * Define an interface for well track
 * @interface
 */
geotoolkit.welllog.multiwell.IWellTrack = {};
    /**
     * Insert a track
     * @function
     * @abstract
     * @param {geotoolkit.welllog.TrackType | geotoolkit.welllog.LogTrack} track track to insert
     * @param {geotoolkit.welllog.TrackDirection|number} [trackDirection] The location of the track (first, last, etc)
     * @param {number} [trackWidth] width of the track in pixels
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.addTrack = function(track, trackDirection, trackWidth){};
    /**
     * Remove the track with headers and footers
     * @function
     * @abstract
     * @param {geotoolkit.welllog.LogTrack} track track to remove
     * @returns {geotoolkit.welllog.multiwell.IWellTrack} this
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.removeTrack = function(track){};
    /**
     * Returns amount of tracks
     * @function
     * @abstract
     * @returns {number} amount of tracks
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.getTracksCount = function(){};
    /**
     * Returns {geotoolkit.welllog.LogTrack} at specified index
     * @function
     * @abstract
     * @param {number} index index to return track at
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.getTrackAt = function(index){};
    /**
     * Return a layer to display markers
     * @function
     * @abstract
     * @returns {geotoolkit.scene.Layer}
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.getMarkerLayer = function(){};
    /**
     * Load template
     * @function
     * @abstract
     * @param {string} template template to be applied to the widget
     * @param {geotoolkit.persistence.Registry} [registry=geotoolkit.welllog.widgets.persistence.Registry] registry
     * @returns {geotoolkit.welllog.multiwell.IWellTrack} this
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.loadTemplate = function(template, registry){};
    /**
     * Save template
     * @function
     * @abstract
     * @param {geotoolkit.persistence.Registry} [registry=geotoolkit.welllog.widgets.persistence.Registry] registry
     * @returns {string} return template as a string
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.saveTemplate = function(registry){};
    /**
     * Sets a depth scale factor.
     * @function
     * @abstract
     * @throws Will throw an error if the current scale is NaN
     * @param {number} scale A number of depth units in device unit.
     * @param {geotoolkit.util.AbstractUnit} [scaleUnit=null] scale unit of the display. if it is not specified then it takes from track container
     * @param {geotoolkit.util.AbstractUnit} [deviceUnit=null] device unit of the display. if it is not specified then it takes from track container
     * @returns {geotoolkit.welllog.multiwell.IWellTrack} this
     * @example
     * // To set depth scale range as a ratio, you can use units as follows
     * var unitFactory = geotoolkit.util.UnitFactory.getInstance();
     * well.setDepthScale(30, unitFactory.getUnit("feet"), unitFactory.getUnit("inch")); //1 inch == 30 feet
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.setDepthScale = function(scale, scaleUnit, deviceUnit){};
    /**
     * Return scale to device. How many scale units in one device unit.
     * @function
     * @abstract
     * @param {geotoolkit.util.AbstractUnit|string} [scaleUnit=null] scale unit of the display. if it is not specified then it takes from track container
     * @param {geotoolkit.util.AbstractUnit|string} [deviceUnit=null] device unit of the display. if it is not specified then it takes from track container
     * @returns {number} a index scale to device or NaN if scale if not available
     * @example
     * // to get the current depth scale of well.
     * var uf = geotoolkit.util.UnitFactory.getInstance();
     * well.getDepthScale(uf.getUnit("cm"), uf.getUnit("cm"));
     *
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.getDepthScale = function(scaleUnit, deviceUnit){};
    /**
     * Returns depth ot time range
     * @function
     * @abstract
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.getDepthLimits = function(){};
    /**
     * Sets the same depth or time limits for all tracks
     * @function
     * @abstract
     * @param {number | geotoolkit.util.Range} minIndex min index limit
     * @param {number} [maxIndex] max index limit
     * @returns {geotoolkit.welllog.multiwell.IWellTrack} this
     * @example
     * // full depth limits or scrollable limits of your widget can be set as follows:
     * widget.setDepthLimits(minDepth, maxDepth);
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.setDepthLimits = function(minIndex, maxIndex){};
    /**
     * Return a depth range, which is visible now
     * @function
     * @abstract
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.getVisibleDepthLimits = function(){};
    /**
     * Sets visible depth limits
     * @function
     * @abstract
     * @param {geotoolkit.util.Range} limits
     * @returns {geotoolkit.welllog.multiwell.IWellTrack}
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.setVisibleDepthLimits = function(limits){};
    /**
     * Returns data source
     * @function
     * @abstract
     * @returns {geotoolkit.data.DataSource}
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.getData = function(){};
    /**
     * Sets a new data model
     * @function
     * @abstract
     * @param {geotoolkit.data.DataSource|geotoolkit.data.DataTable|geotoolkit.data.DataTableView} data logdata
     * @returns {geotoolkit.welllog.multiwell.IWellTrack} this
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.setData = function(data){};
    /**
     * Return the data binding
     * @function
     * @abstract
     * @returns {geotoolkit.data.DataBinding}
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.getDataBinding = function(){};
    /**
     * Sets the data binding
     * @function
     * @abstract
     * @param {geotoolkit.data.DataBinding} binding data binding
     * @param {boolean} [silent=false] silent mode to forbid
     * @returns {geotoolkit.welllog.multiwell.IWellTrack} this
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.setDataBinding = function(binding, silent){};
    /**
     * Sets well title
     * @function
     * @abstract
     * @param {string} title well title
     * @returns {geotoolkit.welllog.multiwell.IWellTrack} this
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.setTitle = function(title){};
    /**
     * Return title
     * @function
     * @abstract
     * @returns {string} well title
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.getTitle = function(){};
    /**
     * Return tool by name
     * @function
     * @abstract
     * @param {string} name name of the tool
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.getToolByName = function(name){};
    /**
     * Returns root tool associated to this widget
     * @function
     * @abstract
     * @returns {geotoolkit.controls.tools.CompositeTool}
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.getTool = function(){};
    /**
     * Connect a new tool with a toolname to the widget
     * @function
     * @abstract
     * @param {geotoolkit.controls.tools.AbstractTool | Array<geotoolkit.controls.tools.AbstractTool>} tool tool associated with the widget
     * @returns {geotoolkit.welllog.multiwell.IWellTrack} this
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.connectTool = function(tool){};
    /**
     * Disconnect the tool from the widget
     * @function
     * @abstract
     * @param {geotoolkit.controls.tools.AbstractTool | Array<geotoolkit.controls.tools.AbstractTool>} tool tool to disconnect
     * @returns {geotoolkit.welllog.multiwell.IWellTrack} this
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.disconnectTool = function(tool){};
    /**
     * Prepares object before exporting and saving state
     * @function
     * @abstract
     * @returns {geotoolkit.welllog.multiwell.IWellTrack} this
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.beginExport = function(){};
    /**
     * Used to restore object's state after exporting
     * @function
     * @abstract
     * @returns {geotoolkit.welllog.multiwell.IWellTrack} this
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.endExport = function(){};
    /**
     * Resize tracks to fit width of the well
     * @function
     * @abstract
     * @returns {geotoolkit.welllog.multiwell.IWellTrack}
     */
    geotoolkit.welllog.multiwell.IWellTrack.prototype.fitToWidth = function(){};

/**
 * Define interface for well actions
 * @interface
 */
geotoolkit.welllog.multiwell.IWellBehavior = {};
    /**
     * Highlight well or track
     * @function
     * @abstract
     * @param {geotoolkit.welllog.multiwell.MultiWellWidget} widget
     * @param {geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.multiwell.CorrelationTrack} track track to remove
     * @param {boolean} highlight
     */
    geotoolkit.welllog.multiwell.IWellBehavior.prototype.highlight = function(widget, track, highlight){};
    /**
     * Resize the track width
     * @function
     * @abstract
     * @param {geotoolkit.welllog.multiwell.MultiWellWidget} widget
     * @param {geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.multiwell.CorrelationTrack} track track to remove
     * @param {number} size a new size
     * @returns {boolean} true if update is required.
     */
    geotoolkit.welllog.multiwell.IWellBehavior.prototype.resize = function(widget, track, size){};
    /**
     * Return true if track is selectable
     * @function
     * @abstract
     * @param {geotoolkit.welllog.multiwell.MultiWellWidget} widget
     * @param {geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.multiwell.CorrelationTrack} track track to remove
     * @returns {boolean} true if track is selectable
     */
    geotoolkit.welllog.multiwell.IWellBehavior.prototype.isSelectable = function(widget, track){};
    /**
     * Return true if track is movable
     * @function
     * @abstract
     * @param {geotoolkit.welllog.multiwell.MultiWellWidget} widget
     * @param {geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.multiwell.CorrelationTrack} track track to remove
     * @returns {boolean} true if track is movable
     */
    geotoolkit.welllog.multiwell.IWellBehavior.prototype.isMovable = function(widget, track){};
    /**
     * Gets all the properties pertaining to this object
     * @function
     * @abstract
     * @returns {object} properties An object containing the properties to get
     */
    geotoolkit.welllog.multiwell.IWellBehavior.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @function
     * @abstract
     * @param {object} properties an object containing the properties to set
     * @returns {geotoolkit.welllog.multiwell.IWellBehavior} this
     */
    geotoolkit.welllog.multiwell.IWellBehavior.prototype.setProperties = function(properties){};

/**
 * Define an abstract correlation to displayed in the correlation track
 * @class geotoolkit.welllog.multiwell.correlation.Correlation
 * @augments geotoolkit.scene.Node
 * @param {object} [options] options
 * @param {geotoolkit.attributes.LineStyle} [options.linestyle] applied style
 */
geotoolkit.welllog.multiwell.correlation.Correlation = {};
    /**
     * Sets correlation marker style
     *
     * @param {geotoolkit.attributes.LineStyle | object | string} lineStyle line style or options
     * @param {string|geotoolkit.util.RgbaColor} [lineStyle.color] line color
     * @param {number} [lineStyle.width] line width
     * @param {Array.<number>} [lineStyle.pattern] line pattern
     * @param {boolean} [merge=false] true if you want to merge lineStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.multiwell.correlation.Correlation} this
     */
    geotoolkit.welllog.multiwell.correlation.Correlation.prototype.setLineStyle = function(lineStyle, merge){};
    /**
     * Returns line style of correlation.
     * @returns {geotoolkit.attributes.LineStyle}
     */
    geotoolkit.welllog.multiwell.correlation.Correlation.prototype.getLineStyle = function(){};
    /**
     * Sets well
     * @param {geotoolkit.welllog.multiwell.IWellTrack} leftWell left well
     * @param {geotoolkit.welllog.multiwell.IWellTrack} rightWell right well
     * @returns {geotoolkit.welllog.multiwell.correlation.Correlation} this
     */
    geotoolkit.welllog.multiwell.correlation.Correlation.prototype.setWells = function(leftWell, rightWell){};
    /**
     * Return left well
     * @returns {geotoolkit.welllog.multiwell.IWellTrack}
     */
    geotoolkit.welllog.multiwell.correlation.Correlation.prototype.getLeftWell = function(){};
    /**
     * Return right well
     * @returns {geotoolkit.welllog.multiwell.IWellTrack}
     */
    geotoolkit.welllog.multiwell.correlation.Correlation.prototype.getRightWell = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.multiwell.correlation.Correlation.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.attributes.LineStyle} [properties.linestyle] line style
     * @returns {geotoolkit.welllog.multiwell.correlation.Correlation}
     */
    geotoolkit.welllog.multiwell.correlation.Correlation.prototype.setProperties = function(properties){};

/**
 * Define line correlation to connect two depth on different wells
 * @class geotoolkit.welllog.multiwell.correlation.CorrelationMarker
 * @augments geotoolkit.welllog.multiwell.correlation.Correlation
 * @param {number} leftDepth depth on left well
 * @param {number} rightDepth depth on right well
 * @param {object} [options] additional options
 * @example
 * // Following example shows how to add a correlation marker
 * track.addChild(new geotoolkit.welllog.multiwell.correlation.CorrelationMarker(leftDepth, rightDepth, {
 * 'linestyle': {
 * 'color': color,
 * 'width': 2,
 * 'pixelsnapmode': {'x': true, 'y': true}
 * }
 */
geotoolkit.welllog.multiwell.correlation.CorrelationMarker = {};
    /**
     * Set depth for correlation
     * @param {number} leftDepth depth of the left well
     * @param {number} rightDepth depth of the right well
     * @returns {geotoolkit.welllog.multiwell.correlation.CorrelationMarker}
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationMarker.prototype.setDepth = function(leftDepth, rightDepth){};
    /**
     * Returns depth of the left well
     * @returns {number}
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationMarker.prototype.getLeftDepth = function(){};
    /**
     * Returns depth of the right well
     * @returns {number}
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationMarker.prototype.getRightDepth = function(){};
    /**
     * Render
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context Rendering Context
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationMarker.prototype.render = function(context){};

/**
 * Define polygon correlation to connect two ranges of depths on different wells
 * @class geotoolkit.welllog.multiwell.correlation.CorrelationRange
 * @augments geotoolkit.welllog.multiwell.correlation.Correlation
 * @param {number} leftStartDepth start depth on left well
 * @param {number} rightStartDepth start depth on right well
 * @param {number} leftEndDepth end depth of left well
 * @param {number} rightEndDepth end depth of right well
 * @param {object} [options] additional options
 */
geotoolkit.welllog.multiwell.correlation.CorrelationRange = {};
    /**
     * Sets correlation fill style to fill range from two set of depths
     *
     * @param {geotoolkit.attributes.FillStyle | object | string} fillStyle a new fill style
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.color] color
     * @param {geotoolkit.attributes.ImagePattern} [fillStyle.pattern] pattern
     * @param {string|geotoolkit.util.RgbaColor} [fillStyle.foreground] foreground color
     * @param {boolean} [merge=false] true if you want to merge fillStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.multiwell.correlation.CorrelationRange}
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationRange.prototype.setFillStyle = function(fillStyle, merge){};
    /**
     * Return the current fill style for correlation
     * @returns {geotoolkit.attributes.FillStyle}
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationRange.prototype.getFillStyle = function(){};
    /**
     * Set start depth for correlation
     * @param {number} leftDepth depth for left well
     * @param {number} rightDepth depth for right well
     * @returns {geotoolkit.welllog.multiwell.correlation.CorrelationRange}
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationRange.prototype.setStartDepth = function(leftDepth, rightDepth){};
    /**
     * Set end depth for correlation
     * @param {number} leftDepth depth for left well
     * @param {number} rightDepth depth for right well
     * @returns {geotoolkit.welllog.multiwell.correlation.CorrelationRange}
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationRange.prototype.setEndDepth = function(leftDepth, rightDepth){};
    /**
     * Returns depth range for the left well
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationRange.prototype.getLeftDepthRange = function(){};
    /**
     * Returns depth range for the right well
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationRange.prototype.getRightDepthRange = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationRange.prototype.render = function(){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationRange.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.attributes.LineStyle} [properties.linestyle] line style
     * @returns {geotoolkit.welllog.multiwell.correlation.CorrelationRange}
     */
    geotoolkit.welllog.multiwell.correlation.CorrelationRange.prototype.setProperties = function(properties){};

/**
 * Define track to display correlation between wells
 * @class geotoolkit.welllog.multiwell.CorrelationTrack
 * @augments geotoolkit.scene.Group
 * @param {geotoolkit.welllog.multiwell.IWellTrack} [leftWell] left track
 * @param {geotoolkit.welllog.multiwell.IWellTrack} [rightWell] right track
 */
geotoolkit.welllog.multiwell.CorrelationTrack = {};
    /**
     * Specify left and right well
     * @param {geotoolkit.welllog.multiwell.IWellTrack} leftWell left well
     * @param {geotoolkit.welllog.multiwell.IWellTrack} rightWell right well
     * @returns {geotoolkit.welllog.multiwell.CorrelationTrack} this
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.setWells = function(leftWell, rightWell){};
    /**
     * Return left well
     * @returns {geotoolkit.welllog.multiwell.IWellTrack}
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.getLeftWell = function(){};
    /**
     * Return right well
     * @returns {geotoolkit.welllog.multiwell.IWellTrack}
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.getRightWell = function(){};
    /**
     * function call in the constructor to initialize tools in the widget
     * @returns {geotoolkit.welllog.multiwell.CorrelationTrack}
     * @protected
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.initializeTools = function(){};
    /**
     * Connect a new tool with a toolname to the widget
     * @param {geotoolkit.controls.tools.AbstractTool | Array<geotoolkit.controls.tools.AbstractTool>} tool tool associated with the widget
     * @returns {geotoolkit.welllog.multiwell.CorrelationTrack} this
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.connectTool = function(tool){};
    /**
     * Disconnect the tool from the widget
     * @param {geotoolkit.controls.tools.AbstractTool | Array<geotoolkit.controls.tools.AbstractTool>} tool tool to disconnect
     * @returns {geotoolkit.welllog.multiwell.CorrelationTrack} this
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.disconnectTool = function(tool){};
    /**
     * Returns root tool associated to this widget
     * @returns {geotoolkit.controls.tools.CompositeTool}
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.getTool = function(){};
    /**
     * Set root tool associated to this widget
     * @protected
     * @param {geotoolkit.controls.tools.CompositeTool} tool tool to set
     * @returns {geotoolkit.welllog.multiwell.CorrelationTrack}
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.setTool = function(tool){};
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
     * @returns {geotoolkit.controls.tools.AbstractTool}
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.getToolByName = function(toolName){};
    /**
     * Returns the tool matching the given type. or null if nothing is matching the tool type<br>
     * For example:<br>
     * getToolByType(geotoolkit.controls.tools.Selection)<br>
     * Would return the same tool than<br>
     * getToolByName("pick")<br>
     *
     * @param {string} toolType toolType of the tool
     * @returns {geotoolkit.controls.tools.AbstractTool|null}
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.getToolByType = function(toolType){};
    /**
     * List all the tools contained in this composite.
     * Prepend their parent tools parent using a '.'.
     * @returns {string[]}
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.listToolsNames = function(){};
    /**
     * Dispose node. Clear all listeners
     * and disconnect style to avoid memory
     * leaks
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.dispose = function(){};
    /**
     * Get the bounds in the parents model space. If bounds are not set,
     * then parent model limits are used.
     *
     * @returns {geotoolkit.util.Rect} current bounds
     */
    geotoolkit.welllog.multiwell.CorrelationTrack.prototype.getBounds = function(){};

/**
 * <p>
 * The MultiWell widget is a widget that provides a base multi well container functionality
 *
 * The Default tools include:
 * <ul>
 * <li> Horizontal scrollbar </li>
 * <li> Panning </li>
 * </ul>
 * </p>
 * @class geotoolkit.welllog.multiwell.MultiWellWidget
 * @augments geotoolkit.widgets.BaseWidget
 * @implements geotoolkit.scene.exports.IExportable
 *
 * @param {object} [options] addition options
 * @param {geotoolkit.util.Rect} [options.modellimits=new geotoolkit.util.Rect(0, 0, 1000, 1000)] define content limits in model coordinates
 * @param {geotoolkit.util.Rect} [options.visiblelimits=new geotoolkit.util.Rect(0, 0, 1000, 1000)] define visible content limits in model coordinates
 * @param {boolean | string} [options.horizontalscrollable=true] defines if plot displays horizontal scrollbars, true | false | "auto" | "floating"
 * @param {boolean | string} [options.verticalscrollable=true] defines if plot displays vertical scrollbars, true | false | "auto" | "floating"
 * @param {boolean} [options.attachedHeaders=false] attached well headers and footers
 * @param {boolean} [options.autoTracksLimits=true] calculates content model limits based on tracks position as union
 * @param {object} [options.header] header options
 * @param {boolean} [options.header.visible=true] visibility of the headers. If it is 'none' then it is not created.
 * @param {number} [options.header.height=84] header height
 * @param {object} [options.header.border] defines properties for header outer border
 * @param {boolean} [options.header.border.visible=false] visibility of the border
 * @param {string} [options.header.border.color=lightgray] color of border border
 * @param {boolean} [options.header.viewcache=false] enable tiled cache. It increase rendering performance for historical data
 * @param {object} [options.header.viewcachesize] define view cache parameters
 * @param {number} [options.header.viewcachesize.width=256] set tiled cache size.
 * @param {number} [options.header.viewcachesize.height=256] set tiled cache size.
 *
 * @param {object} [options.footer] footer options
 * @param {boolean|string} [options.footer.visible='none'] visibility of the footer. If it is 'none' then it is not created.
 * @param {number} [options.footer.height=84] footer height
 * @param {object} [options.footer.border] defines properties for footer outer border
 * @param {boolean} [options.footer.border.visible=false] visibility of the border
 * @param {string} [options.footer.border.color=lightgray] color of border border
 * @param {boolean} [options.footer.viewcache=false] enable tiled cache. It increase rendering performance for historical data
 * @param {object} [options.footer.viewcachesize] define view cache parameters
 * @param {number} [options.footer.viewcachesize.width=256] set tiled cache size.
 * @param {number} [options.footer.viewcachesize.height=256] set tiled cache size.
 *
 * @param {boolean} [options.viewcache=false] enable tiled cache. It increase rendering performance for historical data
 * @param {object} [options.viewcachesize] define view cache parameters
 * @param {number} [options.viewcachesize.width=256] set tiled cache size.
 * @param {number} [options.viewcachesize.height=256] set tiled cache size.
 * @param {object} [options.border] defines properties for widget outer border
 * @param {boolean} [options.border.visible=false] visibility of the border
 * @param {string} [options.border.color=lightgray] color of border border
 * @param {object} [options.trackcontainer] defines properties for track container
 * @param {object} [options.trackcontainer.border] defines properties for track container outer border
 * @param {boolean} [options.trackcontainer.border.visible=true] visibility of the border
 * @param {string} [options.trackcontainer.border.color=lightgray] color of border border
 * @param {object} [options.track] optional track options
 * @param {boolean} [options.track.fixedwidth=false] fixed width of tracks for horizontal scale
 * @param {object} [options.track.header] optional track header properties
 * @param {object} [options.track.header.border] optional track header properties
 * @param {boolean} [options.track.header.border.visible=false] visibility of the track header border
 * @param {string} [options.track.header.border.color=lightgray] color of track header border
 * @param {number} [options.track.header.border.width=1] line width of track header border
 * @param {object} [options.annotations] annotations properties for axes, titles
 * @param {geotoolkit.scene.Node[]} [options.annotations.west=null] an array of items to be inserted as annotations to west
 * @param {geotoolkit.scene.Node[]} [options.annotations.east=null] an array of items to be inserted as annotations to east
 * @param {geotoolkit.scene.Node[]} [options.annotations.south=null] an array of items to be inserted as annotations to south
 * @param {geotoolkit.scene.Node[]} [options.annotations.north=null] an array of items to be inserted as annotations to north
 * @param {object} [options.annotationssizes] Properties to hold (width or height) of the annotations
 * @param {number} [options.annotationssizes.west=null] a size of west annotation
 * @param {number} [options.annotationssizes.east=null] a size of east annotation
 * @param {number} [options.annotationssizes.south=null] a size of south annotation (if size is null it will be equal to footer height if it is visible)
 * @param {number} [options.annotationssizes.north=null] a size of north annotation (if size is null it will be equal to header height if it is visible)
 * @param {number} [options.offscreentrackpanning = 0] a percent of how much track should remain in the visible space when panning a track
 */
geotoolkit.welllog.multiwell.MultiWellWidget = {};
    /**
     * Add annotation to annotation container
     * @param {string|geotoolkit.layout.AnnotationLocation} name name of container
     * @param {geotoolkit.scene.Group | geotoolkit.axis.Axis} item item to add
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.addAnnotation = function(name, item){};
    /**
     * Add annotation to annotation container
     * @param {string|geotoolkit.layout.AnnotationLocation} name name of container
     * @param {geotoolkit.scene.Group | geotoolkit.axis.Axis} item item to add
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.removeAnnotation = function(name, item){};
    /**
     * Synchronizes axi or group with a track container model
     *
     * @param {geotoolkit.scene.Group | geotoolkit.axis.Axis} object object to connect to the central component
     * @param {geotoolkit.util.Orientation} [orientation] model orientation
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.connect = function(object, orientation){};
    /**
     * Returns manipulator overlay to draw temporary shapes on top of the track container
     * @returns {geotoolkit.scene.Layer}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getTrackManipulatorLayer = function(){};
    /**
     * function call in the constructor to initialize tools in the widget
     * @protected
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.initializeTools = function(){};
    /**
     * Returns manipulator overlay to draw shapes that should move with the model
     * @returns {geotoolkit.scene.Layer}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getOverlayLayer = function(){};
    /**
     * Send event 'updating' to update data. The event argument's
     * includes type, source, {'start,'end'}, where start and end is visible range
     * eventName : (WellLogWidget.Events.DataUpdating)
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.updateData = function(){};
    /**
     * Enumerate each visual in track container
     * @param {function()} callback callback method
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.forEachVisual = function(callback){};
    /**
     * Sets a new data model
     * @param {geotoolkit.data.DataSource|geotoolkit.data.DataTable|geotoolkit.data.DataTableView} data logdata
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setData = function(data){};
    /**
     * returns data source
     * @returns {geotoolkit.data.DataSource}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getData = function(){};
    /**
     * Return the data binding
     * @returns {geotoolkit.data.DataBinding}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getDataBinding = function(){};
    /**
     * Sets the data binding
     * @param {geotoolkit.data.DataBinding} binding data binding
     * @param {boolean} [silent=false] silent mode to forbid
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setDataBinding = function(binding, silent){};
    /**
     * Sets node filter for selection tool
     * @param {function} nodeFilter filter that allows to filter selected nodes.
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setNodeFilter = function(nodeFilter){};
    /**
     * Return center model limits
     * @returns {geotoolkit.util.Rect} model limits of the tracks
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getCenterModelLimits = function(){};
    /**
     * Sets center model limits if auto track limits is false
     * @param {geotoolkit.util.Rect} limits limits to set
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setCenterModelLimits = function(limits){};
    /**
     * Add track, well to the container.
     * <p>By default well track track has size specified in the range options and depth range specified in the options welllog</p>
     * @param {geotoolkit.welllog.multiwell.TrackType | geotoolkit.welllog.LogTrack | geotoolkit.welllog.multiwell.IWellTrack | geotoolkit.welllog.multiwell.CorrelationTrack | object[]} track track to insert
     * @param {object} [options=null] options
     * @returns {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack}
     * @example The code below shows how to create a well track with position from 0 to 300 in the model coordinates and depth range from 500 to 1000
     * var well = widget.addTrack(geotoolkit.welllog.multiwell.TrackType.WellTrack, {
     * 'width': 400,
     * 'range': new geotoolkit.util.Range(0, 300),
     * 'welllog': {
     * 'range': new geotoolkit.util.Range(500, 1000)
     * }
     * });
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.addTrack = function(track, options){};
    /**
     * A factory method to create an instance of the track
     * @param {geotoolkit.welllog.multiwell.TrackType} type track type to create
     * @param {object} [options=null] options
     * @returns {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.createTrack = function(type, options){};
    /**
     * Insert track, well to the container at specified index
     * @param {number} index index of the track
     * @param {geotoolkit.welllog.multiwell.TrackType | geotoolkit.welllog.LogTrack | geotoolkit.welllog.multiwell.IWellTrack} track track to insert
     * @param {object} [options=null] track options
     * @param {string} [options.id] track id
     * @param {geotoolkit.util.Range} [options.rage] track depth limits
     * @param {number} [options.width=0] track width
     * @returns {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack}
     * @example The code below shows how to create a well track with position from 0 to 300 in the model coordinates and depth range from 500 to 1000
     * var well = widget.addTrack(geotoolkit.welllog.multiwell.TrackType.WellTrack, {
     * 'width': 400,
     * 'range': new geotoolkit.util.Range(0, 300),
     * 'welllog': {
     * 'range': new geotoolkit.util.Range(500, 1000)
     * }
     * });
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.insertTrack = function(index, track, options){};
    /**
     * Track it added to container
     * @protected
     * @param {object} track track added
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.onTrackAdded = function(track){};
    /**
     * Track is removing from container
     * @protected
     * @param {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack} track to be removed
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.onTrackRemoving = function(track){};
    /**
     * Returns wells count
     * @returns {number} amount of wells
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getTracksCount = function(){};
    /**
     * Returns track at specified index
     * @param {number} index index of the track
     * @returns {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack} well track
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getTrackAt = function(index){};
    /**
     * Returns track at specified position in plot coordinate
     * @param {number|geotoolkit.util.Point} x x coordinate position
     * @param {number} [y] y coordinate position
     * @returns {?geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getTrackAtPosition = function(x, y){};
    /**
     * Remove Well Track at specified index
     * @param {number} index track index
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.removeTrackAt = function(index){};
    /**
     * Remove specified Well Track
     * @param {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack} wellTrack track to remove
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.removeTrack = function(wellTrack){};
    /**
     * Returns the index of specified track.
     * @param {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack} wellTrack track to get index
     * @returns {number}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.indexOfTrack = function(wellTrack){};
    /**
     * Returns the track header if it exists
     * @param {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack} track current track
     * @returns {*}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getTrackHeader = function(track){};
    /**
     * Returns the track footer if it exists
     * @param {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack} track current track
     * @returns {*}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getTrackFooter = function(track){};
    /**
     * Returns selected Well Track
     * @returns {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack} well track
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getSelectedTrack = function(){};
    /**
     * Set selected well
     * @param {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack|geotoolkit.welllog.multiwell.CorrelationTrack} wellTrack track to select
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setSelectedTrack = function(wellTrack){};
    /**
     * Does zoom in (namely, scales with predefined scale factor (5 / 4))
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.zoomIn = function(){};
    /**
     * Does zoom out (namely, scales with predefined scale factor (4 / 5))
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.zoomOut = function(){};
    /**
     * Sets center visible model limits
     * @param {geotoolkit.util.Rect} rect a new center model visible limits
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setCenterVisibleModelLimits = function(rect){};
    /**
     * Change scale of well
     * @param {number} scaleX horizontal scale factor
     * @param {number} [scaleY=1] vertical scale factor
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.scale = function(scaleX, scaleY){};
    /**
     * Sets mode to keep fixed width of tracks and wells for horizontal scale
     * @param {boolean} enable enable fixed width of wells during scale
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setFixedTracksWidth = function(enable){};
    /**
     * Returns mode to keep fixed width of tracks and wells for horizontal scale
     * @returns {boolean}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getFixedTracksWidth = function(){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect | object} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setBounds = function(bounds){};
    /**
     * @override
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.updateLayout = function(){};
    /**
     * Return true if headers and footers are attached to track
     * @returns {boolean}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.isAttachedHeaders = function(){};
    /**
     * update Scroll Positions using visible limits and model limits.
     *
     * @param {boolean} [updateScrollBarState] update Scroll Positions using visible limits and model limits or not
     * @param {boolean} [enableAnimation=true] show animation
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.updateScrollPositions = function(updateScrollBarState, enableAnimation){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.notify = function(){};
    /**
     * Update header
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.updateHeader = function(){};
    /**
     * Update footer
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.updateFooter = function(){};
    /**
     * Returns header container. Note that container's bounds are not necessary match with
     * its visible limits as it can reside in other container. To get/set device header size, use
     * get/set HeaderHeight() method. if header visible option is 'none' then equals to null
     * @returns {geotoolkit.welllog.HeaderContainer}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getHeaderContainer = function(){};
    /**
     * Returns actual header height or model height whenever 'auto' is specified
     * @param {null|string} [options=null] header options
     * @returns {number}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getHeaderHeight = function(options){};
    /**
     * Returns actual footer height or model height whenever 'auto' is specified
     * @param {null|string} [options=null] header options,
     * @returns {number}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getFooterHeight = function(options){};
    /**
     * Sets footer height
     * @param {number|string} height footer height in pixels or 'auto' to fit footer height
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setFooterHeight = function(height){};
    /**
     * Sets header height
     * @param {number|string} height header height in pixels or 'auto' to fit header height
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setHeaderHeight = function(height){};
    /**
     * Sets some widget options
     * @param {object} [options] addition options
     * @param {object} [options.header] header options
     * @param {boolean|string} [options.header.visible=true] visibility of the headers.
     * If tracks are created and it is changed from 'none' to true then it doesn't rebuild headers for existing tracks
     * @param {number|string} [options.header.height=84] header height in pixels or 'auto' to fit header height
     * @param {object} [options.footer] footer options
     * If tracks are created and it is changed from 'none' to true then it doesn't rebuild footers for existing tracks
     * @param {boolean|string} [options.footer.visible='none'] visibility of the footer. If it is 'none' then it is not created.
     * @param {number|string} [options.footer.height=84] footer height in pixels or 'auto' to fit footer height
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     * @example
     * //call setOptions on widget after construction and change the default header size(84) as follows.
     * widgets.setOptions({'header' : {
     'height': 184
     }});
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setOptions = function(options){};
    /**
     * Returns some widget options
     * @returns {object} options
     * @returns {object} options.header header options
     * @returns {boolean} options.header.visible header visibility
     * @returns {number} options.header.height header height in pixels
     * @returns {object} options.footer footer options
     * @returns {boolean} options.footer.visible footer visibility
     * @returns {number} options.footer.height footer height in pixels
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getOptions = function(){};
    /**
     * Sets all the properties pertaining to this object see {@link geotoolkit.welllog.multiwell.MultiWellWidget#setOptions}
     * @param {object} [properties] JSON containing properties
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setProperties = function(properties){};
    /**
     * Gets all the properties pertaining to this object
     * See {@link geotoolkit.welllog.multiwell.MultiWellWidget.getProperties} for details
     * @returns {object} props JSON containing properties
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getProperties = function(){};
    /**
     * Returns footer container. Note that container's bounds are not necessary match with
     * its visible limits as it can reside in other container. To get/set device footer size, use
     * get/set FooterHeight() method. if footer visible option is 'none' then equals to null
     * @returns {geotoolkit.welllog.HeaderContainer}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getFooterContainer = function(){};
    /**
     * Returns track container
     * @returns {geotoolkit.welllog.widgets.visuals.LogTrackContainer}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getTrackContainer = function(){};
    /**
     * Distributes the same alignment to all tracks with regard to the top,
     * the bottom or center of wells
     * @param {number} depth a new wells depth to be aligned to
     * @param {string} [alignment="center"] alignment of track according to container visible limits. alignment value is "top", "bottom", "center"
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.alignToDepth = function(depth, alignment){};
    /**
     * Distributes the same alignment to all tracks with regard to the top,
     * the bottom or center of wells by marker name
     * @param {string|function(node)} name marker name or function to find marker
     * @param {string} [alignment="center"] alignment of track according to container visible limits. alignment value is "top", "bottom", "center"
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.alignToMarker = function(name, alignment){};
    /**
     * Scroll the specified track in container then depth of this track is defined by alignment
     * @param {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack} track track to scroll
     * @param {number} depth depth of the current track
     * @param {string} alignment alignment of track according to container visible limits. alignment value is "top", "bottom", "center"
     * @param {number} [anchor=null] position of container to be aligned
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.scrollTrackToDepth = function(track, depth, alignment, anchor){};
    /**
     * Scroll track by depth on delta depth
     * @param {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack} track track to scroll
     * @param {number} delta depth of the current track
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.scrollTrackByDepth = function(track, delta){};
    /**
     * Convert track container vertical space to track depth
     * @param {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack} track track
     * @param {number} depth depth
     * @returns {number}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.convertModelDepthToTrackDepth = function(track, depth){};
    /**
     * Return model track size and position in the model coordinates consider offset and scale.
     * @param {geotoolkit.welllog.multiwell.IWellTrack|geotoolkit.welllog.LogTrack} track track to return size
     * @returns {geotoolkit.util.Rect} return model position and size
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getModelTrackSize = function(track){};
    /**
     * @override
     * @inheritdoc
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.suspendUpdate = function(){};
    /**
     * @override
     * @inheritdoc
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.resumeUpdate = function(){};
    /**
     * Return export model limits
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getExportLimits = function(){};
    /**
     * Sets export model limits
     * @param {geotoolkit.util.Range} limits export limits
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setExportLimits = function(limits){};
    /**
     * Return export scale
     * @returns {object} options
     * @returns {number} options.scaleX scale by x
     * @returns {number} options.scaleY scale by y
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getExportScale = function(){};
    /**
     * Sets export scale
     * @param {number} scaleX export scale factor along x coordinate
     * @param {number} scaleY export scale factor along y coordinate
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.setExportScale = function(scaleX, scaleY){};
    /**
     * Returns exportable element
     * @param {object} [options] export options
     * @param {geotoolkit.scene.exports.FooterComponent} [options.documentheader= null] an optional document PDF footer
     * @param {geotoolkit.scene.exports.FooterComponent} [options.documentfooter= null] an optional docuement PDF footer
     * @returns {geotoolkit.scene.exports.AbstractDocumentElement} return exportable element
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getExportElement = function(options){};
    /**
     * Used to prepare object before exporting
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.beginExport = function(){};
    /**
     * Used to restore object's state after exporting
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.endExport = function(){};
    /**
     * Gets annotation at specified location
     * @param {geotoolkit.layout.AnnotationLocation} location Enum of annotation locations used to specify direction to insert
     * @returns {?geotoolkit.scene.Group}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.getAnnotation = function(location){};
    /**
     * Mark this group to be updated.
     * @param {geotoolkit.util.Rect[]} [regions] optional array to return invalid rectangles
     * @param {geotoolkit.scene.Node.StateChanges} [changes] optional parameter to specify a reason of changes
     * @returns {geotoolkit.welllog.multiwell.MultiWellWidget} this
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.updateState = function(regions, changes){};
    /**
     * Exports the widget content as a PDF file, user has option to select the scale of track in pdf.
     * @param {object} [options=null] option to specify paper parameters and header and footer
     * @param {geotoolkit.scene.exports.HeaderComponent} [options.header = null] an optional PDF header
     * @param {geotoolkit.scene.exports.FooterComponent} [options.footer = null] an optional PDF footer
     * @param {geotoolkit.scene.exports.FooterComponent} [options.documentheader= null] an optional document PDF footer
     * @param {geotoolkit.scene.exports.FooterComponent} [options.documentfooter= null] an optional docuement PDF footer
     * @param {string} [options.output = 'PDF Output'] define optional output filename
     * @param {boolean} [options.save = false] flag to save the pdf directly to file or open dialog
     * @param {object} [options.printsettings] define optional paper and export parameters
     * @param {object} [options.printsettings.paperformat] define optional paper paper format
     * @param {number} [options.printsettings.top=0.85] define optional top margin
     * @param {number} [options.printsettings.bottom=0.85] define optional bottom margin
     * @param {number} [options.printsettings.left=1.1] define optional left margin
     * @param {number} [options.printsettings.right=1.1] define optional top margin
     * @param {string} [options.printsettings.orientation='Portrait'] define optional paper orientation
     * @param {string} [options.printsettings.scaling='AsIs'] define optional scaling mode. Specify ( 'scaling': geotoolkit.scene.exports.ScalingOptions.FitWidth,) to fit all tracks in your page width.
     * @param {boolean} [options.printsettings.keepaspectratio=true] keep aspect ratio
     * @param {boolean} [options.printsettings.continuous=false] continuous printing
     * @param {boolean} [options.printsettings.drawwesttoeast=true] deprecated (since 2.3) draw pages from West to East. For continuous printing set drawwesttoeast = false
     * @param {number} [options.scalex] scale by x from model units to pixels
     * @param {number} [options.scaley] scale by y from model units to pixels
     * @param {object} [options.limits] export model limits
     * @param {object} [options.limits.x1] start limit by default visible limits
     * @param {object} [options.limits.x2] end limit by default visible limits
     * @param {object} [options.limits.y1] start limit by default visible limits
     * @param {object} [options.limits.y2] end limit by default visible limits
     * @param {number} [options.imagescalefactor] options to specify the image scale factor, right now 8 is maximum, Math.floor(600 / 72)
     * @param {object} [options.imagecompression] options to specify the image compression
     * @param {geotoolkit.pdf.ImageCompression} [options.imagecompression.mode=geotoolkit.pdf.ImageCompression.AUTO] image compression method used to exporting pdf.
     * @param {number} [options.imagecompression.quality=1] quality range from 0 to 1 that will express the jpeg image compression quality, available for jpeg mode only.
     * @param {geotoolkit.pdf.SpeedCompression} [options.imagecompression.speed=geotoolkit.pdf.SpeedCompression.MEDIUM] speed referring to the png compression speed, available for png mode only.
     * @param {boolean} [options.streamcompression=true] enable or disable pdf output compression
     * @param {geotoolkit.util.stream.Stream} [options.pdfstream = null] optional user-customized Stream object
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.welllog.multiwell.MultiWellWidget.prototype.exportToPdf = function(options){};

/**
 * Creates implementation of the multi welllog annotation overlay
 * @class geotoolkit.welllog.multiwell.overlays.AnnotationOverlay
 * @augments geotoolkit.widgets.overlays.AnnotationOverlay
 * @param {geotoolkit.welllog.multiwell.MultiWellWidget} widget
 */
geotoolkit.welllog.multiwell.overlays.AnnotationOverlay = {};
    /**
     * Disposes this node, once disposes a node should not be used anymore.<br>
     * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
     * Also aggressively 'cleanup' this node by setting some of its members to null.
     */
    geotoolkit.welllog.multiwell.overlays.AnnotationOverlay.prototype.dispose = function(){};
    /**
     * @protected
     */
    geotoolkit.welllog.multiwell.overlays.AnnotationOverlay.prototype.initializeTools = function(){};
    /**
     * @protected
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.welllog.multiwell.overlays.AnnotationOverlay.prototype.getModel = function(){};

