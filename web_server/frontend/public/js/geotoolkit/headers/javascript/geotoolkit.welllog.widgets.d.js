/**
 * API to create high level reusable graphics components to build logwidget
 * @namespace */
geotoolkit.welllog.widgets = {};
    /**
     * enum for TrackType
     * @enum
     * @readonly
     */
    geotoolkit.welllog.widgets.TrackType = {};
    /**
     * Enum for Track Direction
     * @enum
     * @readonly
     */
    geotoolkit.welllog.widgets.TrackDirection = {};

/**
 * data representation for logwidget
 * @namespace */
geotoolkit.welllog.widgets.data = {};

/**
 * API for defining tools for the logwidget
 * @namespace */
geotoolkit.welllog.widgets.tools = {};

/**
 * API for log header representations
 * @namespace */
geotoolkit.welllog.widgets.headers = {};

/**
 * API for defining container for log visuals
 * @namespace */
geotoolkit.welllog.widgets.visuals = {};

/**
 * API for defining overlays
 * @namespace */
geotoolkit.welllog.widgets.overlays = {};

/**
 * API defining persistence
 * @namespace */
geotoolkit.welllog.widgets.persistence = {};

/**
 * Define abstract curve data object which provides samples and indices together
 *
 * @class geotoolkit.welllog.widgets.data.CurveDataObject
 * @augments geotoolkit.data.DataObject
 */
geotoolkit.welllog.widgets.data.CurveDataObject = {};
    /**
     * Request load data
     * @param {object} options additional parameters of curve data passed to callback function
     * @param {function()} callback function called to request data
     */
    geotoolkit.welllog.widgets.data.CurveDataObject.prototype.getData = function(options, callback){};

/**
 * Creates default implementation of the track splitter <br>
 * The tool fires the following types of event:<br>
 * (1) "onCanResize" - {geotoolkit.controls.tools.RejectableEventArgs} - occurs before track resize is starting.<br>
 * (2) "onTrackWidthChanged" - {geotoolkit.controls.tools.RejectableEventArgs} - occurs after track resize is done.<br>
 * (3) "onContainerWidthChanged" - {geotoolkit.controls.tools.EventArgs} - occurs after container resize is done.<br>
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
 * <td>Splitter.Events.onCanResize</td>
 * <td>geotoolkit.controls.tools.RejectableEventArgs</td>
 * <td>occurs before track resize is starting.</td>
 * </tr>
 * <tr>
 * <td>Splitter.Events.onTrackWidthChanged</td>
 * <td>geotoolkit.controls.tools.RejectableEventArgs</td>
 * <td> occurs after track resize is done.</td>
 * </tr>
 * <tr>
 * <td>Splitter.Events.onContainerWidthChanged</td>
 * <td>geotoolkit.controls.tools.EventArgs</td>
 * <td>occurs after container resize is done.</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 *
 * Tool name: 'splitter'
 * @class geotoolkit.welllog.widgets.tools.Splitter
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.scene.Group} manipulatorLayer layer for holding temporary shapes
 * @param {geotoolkit.welllog.TrackContainer} [trackContainer] optional trackContainer
 */
geotoolkit.welllog.widgets.tools.Splitter = {};
    /**
     * Events
     * @readonly
     * @enum
     */
    geotoolkit.welllog.widgets.tools.Splitter.Events = {};
        /**
         * onContainerWidthChanged
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.Splitter.Events.onContainerWidthChanged = "";
        /**
         * onTrackWidthChanged
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.Splitter.Events.onTrackWidthChanged = "";
        /**
         * onCanResize
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.Splitter.Events.onCanResize = "";
    /**
     * @protected
     */
    geotoolkit.welllog.widgets.tools.Splitter.prototype.onActiveStateChanged = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.widgets.tools.Splitter.prototype.start = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.widgets.tools.Splitter.prototype.stop = function(){};

/**
 * HorizontalSplitterEventArgs
 * @deprecated since 2.5 use {geotoolkit.controls.tools.splitter.HorizontalSplitterEventArgs} instead
 * @class geotoolkit.welllog.widgets.tools.HorizontalSplitterEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs info about the event arguments
 */
geotoolkit.welllog.widgets.tools.HorizontalSplitterEventArgs = {};

/**
 * Creates default implementation of the plot splitter
 *
 * @deprecated since 2.5 use {geotoolkit.controls.tools.splitter.HorizontalSplitter} instead
 * @class geotoolkit.welllog.widgets.tools.HorizontalSplitter
 * @augments geotoolkit.controls.tools.splitter.HorizontalSplitter
 * @param {geotoolkit.scene.Group} manipulatorLayer layer for holding temporary shapes
 */
geotoolkit.welllog.widgets.tools.HorizontalSplitter = {};
    /**
     * Events
     * @enum
     * @readonly
     */
    geotoolkit.welllog.widgets.tools.HorizontalSplitter.Events = {};
        /**
         * onPlotSizeChanged
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.HorizontalSplitter.Events.onPlotSizeChanged = "";

/**
 * Creates default implementation of the Navigation tool <br>
 * The tool fires the following types of event:<br>
 * (1) "positionChanged" - {object} - occurs when position changed.<br>
 * (2) "depthRangeChanged" - {object} - occurs when depth limits changed.<br>
 *
 * Tool name: 'navigation-tool'
 *
 * @class geotoolkit.welllog.widgets.tools.Navigation
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.scene.Group} manipulatorLayer layer for holding temporary shapes
*/
geotoolkit.welllog.widgets.tools.Navigation = {};
    /**
     *
     * @example
     * //The following snippet shows how to capture a scroll event.
     * navigationTool.on(geotoolkit.welllog.widgets.tools.Navigation.Events.PositionChanged, function(event, sender, eventArgs){
     * //eventArgs is json object
     * geotoolkit.log('New Depths limits '+eventArgs['limits'].toString());
     * });
     * @enum
     * @readonly
     */
    geotoolkit.welllog.widgets.tools.Navigation.Events = {};
        /**
         * This event occurs when the visible depth limits is changed. It can scroll, scale operations.
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.Navigation.Events.PositionChanged = "";
        /**
         * This events occurs when virtual depth model limit is changed. For example, if you call method setDepthLimits.
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.Navigation.Events.DepthRangeChanged = "";
    /**
     * returns visible depth limits
     * @returns {geotoolkit.util.Range} depth range
     */
    geotoolkit.welllog.widgets.tools.Navigation.prototype.getVisibleDepthLimits = function(){};
    /**
     * Set visible model limits
     * @param {geotoolkit.util.Range} visibleDepthLimits visible depth limits
     * @returns {geotoolkit.welllog.widgets.tools.Navigation} this
     */
    geotoolkit.welllog.widgets.tools.Navigation.prototype.setVisibleDepthLimits = function(visibleDepthLimits){};
    /**
     * set enable state
     * @param {boolean} enabled sets the enabled state
     * @returns {geotoolkit.welllog.widgets.tools.Navigation} this
     */
    geotoolkit.welllog.widgets.tools.Navigation.prototype.setEnabled = function(enabled){};
    /**
     * Gets all the options pertaining to this object
     * @returns {object} [options] JSON containing properties
     * @returns {boolean} [options.enabled] enabled state
     * @returns {geotoolkit.attributes.FillStyle} [options.background] background fill style
     * @returns {object} [options.scale] scale options
     * @returns {boolean} [options.scale.enabled] enabled flag
     * @returns {geotoolkit.attributes.LineStyle} [options.scale.linestyle] scale handle line style
     * @returns {geotoolkit.attributes.FillStyle} [options.scale.fillstyle] scale handle fill style
     * @returns {object} [options.panning] panning options
     * @returns {boolean} [options.panning.enabled] enabled flag
     * @returns {geotoolkit.attributes.LineStyle} [options.panning.linestyle] panning handle line style
     * @returns {geotoolkit.attributes.FillStyle} [options.panning.fillstyle] panning handle fill style
     */
    geotoolkit.welllog.widgets.tools.Navigation.prototype.getOptions = function(){};
    /**
     *
     * @param {object} [options] options
     * @param {boolean} [options.enabled] enabled flag
     * @param {geotoolkit.attributes.FillStyle} [options.background] background fill style
     * @param {object} [options.scale] scale options
     * @param {boolean} [options.scale.enabled] enabled flag
     * @param {geotoolkit.attributes.LineStyle|object} [options.scale.linestyle] scale handle line style
     * @param {geotoolkit.attributes.FillStyle|object} [options.scale.fillstyle] scale handle fill style
     * @param {object} [options.panning] panning options
     * @param {boolean} [options.panning.enabled] enabled flag
     * @param {geotoolkit.attributes.LineStyle|object} [options.panning.linestyle] panning handle line style
     * @param {geotoolkit.attributes.FillStyle|object} [options.panning.fillstyle] panning handle fill style
     * @returns {geotoolkit.welllog.widgets.tools.Navigation}
     */
    geotoolkit.welllog.widgets.tools.Navigation.prototype.setOptions = function(options){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.widgets.tools.Navigation.prototype.start = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.widgets.tools.Navigation.prototype.stop = function(){};

/**
 * Implements an abstract class for tools which manipulate Log Visuals
 * @abstract
 * @class geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool
 * @augments geotoolkit.controls.tools.AbstractTool
 */
geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool = {};
    /**
     * @abstract
     * @function
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.update = function(){};
    /**
     * Handles the event caused by user pressing the mouse button
     * @param {object} eventArgs Native event arguments received from EventDispatcher
     * @abstract
     * @function
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.onMouseDown = function(eventArgs){};
    /**
     * Handles the event caused by user moving the mouse
     * @param {object} eventArgs Native event arguments received from EventDispatcher
     * @abstract
     * @function
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.onMouseMove = function(eventArgs){};
    /**
     * Handles the event caused by user releasing the mouse button
     * @param {object} eventArgs Native event arguments received from EventDispatcher
     * @abstract
     * @function
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.onMouseUp = function(eventArgs){};
    /**
     * Returns a point in model coordinates, edits one of the util points
     * @param {*} args Event arguments
     * @returns {geotoolkit.util.Point}
     * @protected
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.getDeviceXY = function(args){};
    /**
     * Makes a selection according to current position of the pointer
     * @param {number} x X coordinate of the pointer
     * @param {number} y Y coordinate of the pointer
     * @returns {Array.<geotoolkit.scene.Node>}
     * @protected
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.makeSelection = function(x, y){};
    /**
     * Iterates through handles and sets the provided visibility.
     * If the visibility is to hide, hides the ghosts as well
     * @param {boolean} visible Visibility flag for handles
     * @returns {geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool}
     * @protected
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.setHandlesVisible = function(visible){};
    /**
     * Returns the last registered position of the mouse in device space
     * @returns {geotoolkit.util.Point}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.getPosition = function(){};
    /**
     * Gets the manipulator layer with contains handles
     * @returns {geotoolkit.scene.Group|geotoolkit.scene.Layer}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.getCachedManipulatorLayer = function(){};
    /**
     * Returns the shape which this tool is manipulating
     * @returns {geotoolkit.welllog.LogAbstractVisual|null}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.getShape = function(){};
    /**
     * Returns currently active handle,if exists, otherwise null
     * @returns {null|geotoolkit.controls.editing.GhostBearingHandle}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.getActiveHandle = function(){};
    /**
     * Returns the flag defining if a ghost should be moved instead of the actual handle
     * @returns {boolean} showGhost Show ghost flag
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.getShowGhost = function(){};
    /**
     * Gets a flag defining if the ghost should be reset after it has been dropped
     * @returns {boolean}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.getHideGhostOnDrop = function(){};
    /**
     * Returns registered styles for active, inactive, and ghost states of all handles
     * @returns {object} styles JSON containing stylings for different types of handle states
     * @returns {geotoolkit.attributes.LineStyle} [styles.ghostlinestyle] Line Style of the handle when it is in ghost state
     * @returns {geotoolkit.attributes.FillStyle} [styles.ghostfillstyle] Fill Style of the handle when it is in ghost state
     * @returns {geotoolkit.attributes.FillStyle} [styles.activefillstyle] Fill Style of the handle when it is selected and active
     * @returns {geotoolkit.attributes.FillStyle} [styles.inactivefillstyle] Fill Style of the handle when it is selected and active
     * @returns {geotoolkit.attributes.LineStyle} [styles.activelinestyle] Line Style of the handle when when it is inactive (most of the time)
     * @returns {geotoolkit.attributes.LineStyle} [styles.inactivelinestyle] Line Style of the handle when when it is inactive (most of the time)
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.getHandleStyles = function(){};
    /**
     * Gets the shape painter with which is used to render handles. Format is the same as in geotoolkit.scene.shapes.Symbol
     * Redraws all handles
     * @returns {function} painter
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.getHandlePainter = function(){};
    /**
     * Sets the last registered position of the mouse in device space
     * @param {number} x The new X position
     * @param {number} y The new Y position
     * @returns {geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.setPosition = function(x, y){};
    /**
     * Sets the handle currently active
     * @param {geotoolkit.controls.editing.GhostBearingHandle} handle The handle to be active
     * @returns {geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.setActiveHandle = function(handle){};
    /**
     * Sets the shape which this tool has to manipulate and calculate its handles from.
     * @param {geotoolkit.scene.Node|null} shape The new shape to set for manipulation
     * @returns {geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.setShape = function(shape){};
    /**
     * Sets the flag defining if a ghost should be moved instead of the actual handle
     * @param {boolean} showGhost Show ghost flag
     * @returns {geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.setShowGhost = function(showGhost){};
    /**
     * Gets a flag defining if the ghost should be reset after it has been dropped
     * @param {boolean} hide True to hide ghosts when dropped
     * @returns {geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.setHideGhostOnDrop = function(hide){};
    /**
     * Sets styles for active, inactive, and ghost states of all handles, and redraws each handle (this will lose edited handles position)
     * @param {object} styles JSON containing stylings for different types of handle states
     * @param {geotoolkit.attributes.LineStyle|object|string} [styles.ghostlinestyle] Line Style of the handle when it is in ghost state
     * @param {geotoolkit.attributes.FillStyle|object|string} [styles.ghostfillstyle] Fill Style of the handle when it is in ghost state
     * @param {geotoolkit.attributes.FillStyle|object|string} [styles.activefillstyle] Fill Style of the handle when it is selected and active
     * @param {geotoolkit.attributes.FillStyle|object|string} [styles.inactivefillstyle] Fill Style of the handle when it is selected and active
     * @param {geotoolkit.attributes.LineStyle|object|string} [styles.activelinestyle] Line Style of the handle when when it is inactive (most of the time)
     * @param {geotoolkit.attributes.LineStyle|object|string} [styles.inactivelinestyle] Line Style of the handle when when it is inactive (most of the time)
     * @returns {geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.setHandleStyles = function(styles){};
    /**
     * Sets the shape painter with which the handles will be drawn. Format is the same as in
     * geotoolkit.scene.shapes.Symbol
     * Redraws all handles
     * @param {function} painter The painter which will be used to draw the handles for linearly interpolated curves
     * @returns {geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.setHandlePainter = function(painter){};
    /**
     * Sets the pixel side of the handles to which a size is applicable (anchored handles)
     * @param {number} size The size of the handles in device coordinates (pixels)
     * @returns {geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.setHandleSize = function(size){};
    /**
     * for internal use only
     * @protected
     * @param {geotoolkit.plot.Plot} plot Plot to which this tool should be attached.
     * @returns {geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool}
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.attachToPlot = function(plot){};
    /**
     * Called when the tool is enabled or disabled
     * @protected
     */
    geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool.prototype.onEnabledStateChanged = function(){};

/**
 * <p>
 * Implements a tool capable of editing log curve sample points.
 * </p>
 * <p>
 * When given a curve, this tool will create a set of manipulatable handles corresponding with each data sample point.
 * If the curve is step interpolated, then the tool will build a set of lines covering the entire curve.
 * Curve editing tool does not edit the actual curve which it is corresponded with, instead, each manipulation
 * results in an event describing the action and changes. The tool can work in three modes: Edit, Insert, and Delete.
 * </p>
 * <h4>
 * Edit Mode:
 * </h4>
 * <p>
 * Provides a set of handles which become activated when clicked, and deactivated when released, and dragged with the mouse when the mouse pointer is moved.
 * </p>
 * <ul>
 * <li>When a mouse down occurs, "dragstart" event is fired with parameters:
 * <ul>
 * <li>depth: The depth (y) in curve model which belongs to the point where mouse down occurred</li>
 * <li>value: The value (x) in curve model which belongs to the point where mouse down occurred</li>
 * </ul>
 * </li>
 * <li>When a mouse up occurs, "dragend" event is fired with parameters:
 * <ul>
 * <li>depth: The depth (y) in curve model which belongs to the point where mouse up occurred </li>
 * <li>value: The value (x) in curve model which belongs to the point where mouse up occurred </li>
 * <li>index: The index of manipulated data point in the original data set </li>
 * </ul>
 * </li>
 * <li>If a mouse move occurs, "dragging" event is fired with parameters:
 * <ul>
 * <li>oldDepth: the depth (y) of the handle before the dragging occurred</li>
 * <li>oldValue: the value (x) of the handle before the dragging occurred</li>
 * <li>depth: the new depth (y) of the handle, resultant from the dragging action</li>
 * <li>value: the new value (x) of the handle, resultant from the dragging action</li>
 * <li>index: the index of the data sample (in the array of all data samples of the curve corresponding to this tool), which is being manipulated</li>
 * </ul>
 * </li>
 * </ul>
 * <h4>Insert Mode:</h4>
 * <p>
 * Fires an "insert" event when a mouse down on the track occurs, also fires "move" event when the mouse pointer moves across the curve.
 * </p>
 * <ul>
 * <li>If a mouse move occurs, "move" event is fired with following arguments:
 * <ul>
 * <li>depth: The depth (y) of the mouse pointer in the curve model</li>
 * <li>value: The value (x) of the mouse pointer in the curve model</li>
 * <li>handleDepth: The depth of the handle which moves along the curve as the projection of the mouse pointer position</li>
 * <li>handleValue: The value of the handle which moves along the curve as the projection of the mouse pointer position</li>
 * </ul>
 * </li>
 * <li>When a mouse down occurs, "insert" event is fired with following arguments:
 * <ul>
 * <li>depth: The depth (y) of the mouse pointer in the curve model</li>
 * <li>value: The value (x) of the mouse pointer in the curve model</li>
 * <li>handleDepth: The depth of the handle which moves along the curve as the projection of the mouse pointer position</li>
 * <li>handleValue: The value of the handle which moves along the curve as the projection of the mouse pointer position</li>
 * </ul>
 * </li>
 * </ul>
 * <h4>Delete Mode:</h4>
 * <p>
 * Fires a "delete" event with handle info every time a mouse down occurs on a handle.
 * </p>
 * <ul>
 * <li>When a mouse down occurs on top of a handle, a "delete" event is fired with parameters:
 * <ul>
 * <li>depth: The depth of the data point corresponding to the handle</li>
 * <li>value: The value of the data point corresponding to the handle</li>
 * <li>index: The index of the data point in the original data set</li>
 * </ul>
 * </li>
 * </ul>
 * </br>
 * <p>
 * <strong>NOTE</strong>: If the curve is interpolated with StartStep, MiddleStep, or EndStep, the tool will draw lines between each
 * point, </br>
 * and the events will be fired with the information about the point which the tool edits. However, in case of Middle
 * Step, the point divides some lines in two, and some lines do not have any original data set points to manipulate: </br>
 * p1----------p2 (p1 and p2 are not registered in curve data set) </br>
 * | </br>
 * | </br>
 * p3 (this is the only point which actually existed in the data set) </br>
 * | </br>
 * | </br>
 * p5----------p4 (p4 and p4 are not registered in curve data set) </br>
 * </p>
 *
 * @class geotoolkit.welllog.widgets.tools.CurveEditor
 * @augments geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool
 * @param {geotoolkit.scene.Group | geotoolkit.scene.Layer} manipulatorLayer layer to which handles will be added. Cache disabled
 * @param {geotoolkit.scene.Group | geotoolkit.scene.Layer} cachedManipulatorLayer layer to which handles will be added. Cache enabled
 */
geotoolkit.welllog.widgets.tools.CurveEditor = {};
    /**
     * Defines the editing mode supported by this adapter
     * @enum
     * @readonly
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.Modes = {};
        /**
         * The mode when an existing data point can be edited to change value or depth
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.CurveEditor.Modes.Edit = "";
        /**
         * The mode when an existing data point can be deleted
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.CurveEditor.Modes.Delete = "";
        /**
         * The mode when an new data point can be added
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.CurveEditor.Modes.Insert = "";
    /**
     * Handles pointerdown in the manipulated area
     * @param {object} eventArgs Arguments proxied from the event dispatcher
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.onMouseDown = function(eventArgs){};
    /**
     * Handles the event of ponter release, pointerup
     * @param {object} eventArgs Arguments proxied from the event dispatcher
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.onMouseUp = function(eventArgs){};
    /**
     * Handles the move of the pointer over the manipulated area
     * @param {object} eventArgs Arguments proxied from the event dispatcher
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.onMouseMove = function(eventArgs){};
    /**
     * Creates the handles for every point that curve has visible on the screen if in linear interpolation mode.
     * In step interpolation creates a line handle between each visible point
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     * @protected
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.createHandles = function(){};
    /**
     * Checks if a sample or a value falls within the visible limits of the parent track.
     * @param {number|geotoolkit.welllog.data.LogDataSample} sample1 The sample or value to test.
     * If a line segment is tested, this is the first point of the tested line
     * @param {number|geotoolkit.welllog.data.LogDataSample} [sample2] When a line segment is tested, this is the second
     * point constructing the line
     * @param {boolean} [activeHandle] True if the test is done for the active handle. Used in cases of handle manipulation.
     * @returns {boolean} True if the handle or the value falls within the visible limits of the track, false otherwise
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.checkHandleCollision = function(sample1, sample2, activeHandle){};
    /**
     * Updates the state of the tool, recalculated and redraws the handles and curve limits (for spilling handles)
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.update = function(){};
    /**
     * Clears all the handles from the adapter and manipulator layer
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.removeHandles = function(){};
    /**
     * Hides all the handles. Has an option to hide everything except the active handle
     * @param {boolean} skipActive If true, active handle will not be hidden
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.hideHandles = function(skipActive){};
    /**
     * Shows all existing handles on the screen.
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.showHandles = function(){};
    /**
     * Retrieves the type of editing that this adapter is doing
     * @returns {string|geotoolkit.welllog.widgets.tools.CurveEditor.Modes}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.getMode = function(){};
    /**
     * Gets the value of flag defining if the active handles can only move inside the track
     * @returns {boolean}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.getHandleInsideTrack = function(){};
    /**
     * Gets the value of the flag defining if the handles which overflow the track boundaries
     * should be hidden
     * @returns {boolean}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.getHideSpillingHandles = function(){};
    /**
     * Gets a flag defining if the data points can change their depths
     * @returns {boolean} True if depth change allowed
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.getVerticalEditAllowed = function(){};
    /**
     * Returns a flag which defines if inactive handles have to be hidden when dragging.
     * @returns {boolean} hide True when inactive handles hidden on dragging
     * @returns {boolean}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.getHideInactiveHandles = function(){};
    /**
     * Sets a flag which defines if inactive handles have to be hidden when a move with an existing active handle
     * occurs. Once you grab a handle and start dragging it around, every other handle will be hidden to aid a better
     * view of the curve you are editing.
     * @param {boolean} hide True to hide inactive handles on dragging
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.setHideInactiveHandles = function(hide){};
    /**
     * Sets a flag which defines if the active handle can only move within the track area
     * @param {boolean} inside True to restrict the position of active handle in the track
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.setHandleInsideTrack = function(inside){};
    /**
     * Sets what kind of edition this adapter has to do for the curve
     * @param {string|geotoolkit.welllog.widgets.tools.CurveEditor.Modes} mode The new mode in which this tool will work
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.setMode = function(mode){};
    /**
     * Sets the value of the flag defining if the handles which overflow the track boundaries
     * should be hidden
     * @param {boolean} hide If true, overflowing handles will not display
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.setHideSpillingHandles = function(hide){};
    /**
     * Sets a flag defining if the data points can change their depths
     * @param {boolean} allow True to allow depth change
     * @returns {geotoolkit.welllog.widgets.tools.CurveEditor}
     */
    geotoolkit.welllog.widgets.tools.CurveEditor.prototype.setVerticalEditAllowed = function(allow){};

/**
 * <p>
 * Implements a tool which edits log markers (tops), or allows to visually create them.
 * </p>
 * <p>
 * This tool does not edit the actual marker visual. Instead it fires events which contain all the information
 * which is needed to manipulate or create a log marker. The tool can work in two modes: Edit and Insert.
 * </p>
 * <h4>
 * Edit Mode:
 * </h4>
 * <p>
 * Draws handles on top of a log marker which has been associated with the tool. When handles are clicked and
 * dragged, either draws a ghost in the dragged position, or drags the actual handle. In ghost mode, no events
 * are fired until the handles are released (by releasing the mouse button). In ghost mode set to false, fires dragging
 * events every time a move occurs.
 * </p>
 * <ul>
 * <li>When a mouse down occurs, "dragstart" event is fired with parameters:
 * <ul>
 * <li>depth: The depth (y) in track model limits representing the position of the pointer</li>
 * <li>shape: The log visual which is being manipulated
 * </ul>
 * </li>
 * <li>When a mouse up occurs, "dragend" event is fired with parameters:
 * <ul>
 * <li>depth: The depth (y) in track model limits representing the position of handles</li>
 * <li>shape: The log visual which is being manipulated
 * </ul>
 * </li>
 * <li>If a mouse move occurs, "dragging" event is fired (When ghost mode is set to false) with parameters:
 * <ul>
 * <li>depth: the new depth (y) of the handles, resultant from the dragging action</li>
 * <li>shape: The log visual which is being manipulated
 * </ul>
 * </li>
 * </ul>
 * <h4>Insert Mode:</h4>
 * <p>
 * Fires an "insert" event when a mouse down on the track occurs.
 * </p>
 * <ul>
 * <li>When a mouse down occurs, "insert" event is fired with following arguments:
 * <ul>
 * <li>depth: The depth (y) of the mouse pointer in the model of the track where a log marker should be inserted</li>
 * <li>shape: The log track where to insert the marker
 * </ul>
 * </li>
 * </ul>
 * </br>
 * <h3>Working With Marker Editor</h3>
 * <p>
 * For Marker Editor to work, it always needs a reference to either the marker which is being manipulated, or to the
 * track where a marker will be inserted. To start operating the tool enable it through setEnabled() and pass the
 * appropriate shape to the tool through setShape(). To disassociate the Marker Editor and hide the handles without
 * disabling the tool call setShape with a null argument.
 * </p>
 *
 * @class geotoolkit.welllog.widgets.tools.MarkerEditor
 * @augments geotoolkit.welllog.widgets.tools.AbstractLogVisualEditingTool
 * @param {geotoolkit.scene.Group | geotoolkit.scene.Layer} manipulatorLayer layer to which handles will be added
 */
geotoolkit.welllog.widgets.tools.MarkerEditor = {};
    /**
     * Defines the editing mode supported by this tool
     * @enum
     * @readonly
     */
    geotoolkit.welllog.widgets.tools.MarkerEditor.Modes = {};
        /**
         * The mode when an existing marker can be edited to change depth
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.MarkerEditor.Modes.Edit = "";
        /**
         * The mode when a new marked can be added
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.MarkerEditor.Modes.Insert = "";
    /**
     * Implements the logic of mouse down event handler. Locks in a marker for editing, or fires an insertion event.
     * Stops propagation of mouse down event
     * @param {object} eventArgs Native event arguments received from EventDispatcher
     * @returns {geotoolkit.welllog.widgets.tools.MarkerEditor}
     */
    geotoolkit.welllog.widgets.tools.MarkerEditor.prototype.onMouseDown = function(eventArgs){};
    /**
     * Implements the logic of mouse up event handler. De-activates handles and releases them. Deactivates this tool.
     * (does not disable!)
     * @param {object} eventArgs Native event arguments received from EventDispatcher
     * @returns {geotoolkit.welllog.widgets.tools.MarkerEditor}
     */
    geotoolkit.welllog.widgets.tools.MarkerEditor.prototype.onMouseUp = function(eventArgs){};
    /**
     * Implements the logic of mouse move event handler
     * If in editing mode and a handle has been locked in for mouse move, moves that handle.
     * If in insert mode, updates the position of the handle to represent where a marker will be inserted (by pointer position)
     * Stops propagation of mouse down event
     * @param {object} eventArgs Native event arguments received from EventDispatcher
     * @returns {geotoolkit.welllog.widgets.tools.MarkerEditor}
     */
    geotoolkit.welllog.widgets.tools.MarkerEditor.prototype.onMouseMove = function(eventArgs){};
    /**
     * Creates three handles which are used to edit or create a marker:
     * Two bubbles on the ends of the marker line, and one line handle connecting them
     * @protected
     */
    geotoolkit.welllog.widgets.tools.MarkerEditor.prototype.createHandles = function(){};
    /**
     * Updates the state of this tool. Recalculates handle positions, updates the styles, and
     * hides/shows handles based on the current state
     * @returns {geotoolkit.welllog.widgets.tools.MarkerEditor}
     */
    geotoolkit.welllog.widgets.tools.MarkerEditor.prototype.update = function(){};
    /**
     * Sets the type of manipulations which this tool should do.
     * Edit mode will draw handles on an existing marker and fire events when the position of those has been changed
     * Insert mode will draw handles to follow the mouse pointer and will fire an insert event at the position of
     * the pointer when a mouse down happens
     * @param {string|geotoolkit.welllog.widgets.tools.MarkerEditor.Modes} mode The mode to set on the tool
     * @returns {geotoolkit.welllog.widgets.tools.MarkerEditor}
     */
    geotoolkit.welllog.widgets.tools.MarkerEditor.prototype.setMode = function(mode){};
    /**
     * Sets the shape which this tool has to edit. In insert mode sets the track to which a LogMarker should be inserted
     * @param {geotoolkit.scene.Node|null} shape The marker to edit, or the
     * track to which a marker should be added
     * @returns {geotoolkit.welllog.widgets.tools.MarkerEditor}
     */
    geotoolkit.welllog.widgets.tools.MarkerEditor.prototype.setShape = function(shape){};
    /**
     * Returns the mode in which this tool is currently working. See setMode
     * @returns {string|geotoolkit.welllog.widgets.tools.MarkerEditor.Modes}
     */
    geotoolkit.welllog.widgets.tools.MarkerEditor.prototype.getMode = function(){};
    /**
     * Iterates through handles and sets the provided visibility.
     * Ghosts are hidden always, even if the visibility is set to true
     * @protected
     * @param {boolean} visible Visibility flag for handles
     * @returns {geotoolkit.welllog.widgets.tools.MarkerEditor}
     */
    geotoolkit.welllog.widgets.tools.MarkerEditor.prototype.setHandlesVisible = function(visible){};

/**
 * Defines a shape adapter which has functionality to manipulate WellLog Markers.
 * This adapter associates itself to an instance of LogMarker shape, creates handles rendered on top of the shape
 * and allows dragging the shape along the track.
 *
 * @class geotoolkit.welllog.widgets.tools.LogMarkerAdapter
 * @augments geotoolkit.controls.editing.ShapeAdapter
 */
geotoolkit.welllog.widgets.tools.LogMarkerAdapter = {};
    /**
     * Called during initialization process. Creates handles
     * @returns {boolean}
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.onInitialize = function(){};
    /**
     * Updates the parameters of the handles to match the current state
     * of the shape and adapter
     * @returns {geotoolkit.welllog.widgets.tools.LogMarkerAdapter}
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.updateHandles = function(){};
    /**
     * Removes all the handles and their ghosts from the adapter and scene
     * @returns {geotoolkit.welllog.widgets.tools.LogMarkerAdapter}
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.removeHandles = function(){};
    /**
     * Sets the visibility of the handles registered with this adapter
     * @param {boolean} visible Visibility to set on handles
     * @returns {geotoolkit.welllog.widgets.tools.LogMarkerAdapter}
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.setHandlesVisible = function(visible){};
    /**
     * Called when adapter goes from active to non-active and vice versa
     * @param {boolean} active New state of the adapter
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.onActiveStateChanged = function(active){};
    /**
     * Move adapter and send event {geotoolkit.controls.editing.ShapeAdapter.Moved}
     * This method also supports moving programmatically, as opposed to by event only.
     * If modelDeltaXY is passed as "true", then the x and y are treated as deltaX and deltaY
     * in model coordinates of the associated shape.
     * @param {number} x X coordinate of pointer position at the moment of the move, or the dx of the adapter in
     * model coordinates of the associated shape
     * @param {number} y Y coordinate of pointer position at the moment of the move, or the dy of the adapter in
     * model coordinates of the associated shape
     * @param {object} [eventArgs] Event arguments passed from the tool for further passing
     * @param {boolean} [modelDeltaXY] If true passed, x and y will be treated as respective deltas in model coordinates
     * of the associated shape
     * @returns {geotoolkit.welllog.widgets.tools.LogMarkerAdapter}
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.move = function(x, y, eventArgs, modelDeltaXY){};
    /**
     * Moves the handle and the shape, if shape editing is enabled, usually used internally and is called by
     * "move" method of this class.
     * @param {number} x X coordinate of pointer position at the moment of the move, or the dx of the adapter in
     * model coordinates of the associated shape
     * @param {number} y Y coordinate of pointer position at the moment of the move, or the dy of the adapter in
     * model coordinates of the associated shape
     * @param {object} [eventArgs] Event arguments passed from the tool for further passing
     * @param {boolean} [modelDeltaXY] If true passed, x and y will be treated as respective deltas in model coordinates
     * of the associated shape
     * @returns {geotoolkit.welllog.widgets.tools.LogMarkerAdapter}
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.onMove = function(x, y, eventArgs, modelDeltaXY){};
    /**
     * Called when a handle owned by this adapter has been released and editing stops.
     * @param {number} x X coordinate of pointer when mouseup occurred
     * @param {number} y Y coordinate of pointer when mouseup occurred
     * @param {object} eventArgs Event arguments from the calling tool
     * @returns {geotoolkit.welllog.widgets.tools.LogMarkerAdapter} this
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.release = function(x, y, eventArgs){};
    /**
     * Called when a handle owned by this adapter has been selected and activated. The editing began. Fires
     * geotoolkit.controls.editing.Events.DragStart event.
     * @param {number} x X coordinate of the point where the mouse was clicked to engage the handle in device space
     * @param {number} y Y coordinate of the point where the mouse was clicked to engage the handle in device space
     * @param {geotoolkit.controls.tools.EventArgs} eventArgs
     * @returns {geotoolkit.welllog.widgets.tools.LogMarkerAdapter} this
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.engage = function(x, y, eventArgs){};
    /**
     * Sets the flag defining if this adapter has to directly edit the shape which it is associated with.
     * Otherwise it will only send an event.
     * @param {boolean} allow True to edit the shape directly
     * @returns {geotoolkit.welllog.widgets.tools.LogMarkerAdapter}
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.setAllowShapeEdit = function(allow){};
    /**
     * Returns the flag defining if this adapter directly edits the shape which it is associated with.
     * @returns {boolean} True if shape is being edited
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.getAllowShapeEdit = function(){};
    /**
     * Sets the flag defining if a ghost should be moved instead of an actual handle when the shape is being manipulated.
     * @param {boolean} show True to display a ghost handle
     * @returns {geotoolkit.welllog.widgets.tools.LogMarkerAdapter}
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.setShowGhost = function(show){};
    /**
     * Returns the flag defining if a ghost is moved instead of an actual handle when the shape is being manipulated.
     * @returns {boolean}
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.getShowGhost = function(){};
    /**
     * Associates the shape passed in parameters to this adapter. All manipulations done via this
     * adapter are calculated and applied with respect to this shape
     * @param {geotoolkit.scene.Node} shape
     * @returns {geotoolkit.welllog.widgets.tools.LogMarkerAdapter} this
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.setShape = function(shape){};
    /**
     * Sets styles for active, inactive, and ghost states of all handles, and redraws each handle (this will lose edited handles position)
     * @param {object} styles JSON containing stylings for different types of handle states
     * @param {geotoolkit.attributes.LineStyle} [styles.ghostlinestyle] Line Style of the handle when it is in ghost state
     * @param {geotoolkit.attributes.FillStyle} [styles.ghostfillstyle] Fill Style of the handle when it is in ghost state
     * @param {geotoolkit.attributes.FillStyle} [styles.activefillstyle] Fill Style of the handle when it is selected and active
     * @param {geotoolkit.attributes.FillStyle} [styles.inactivefillstyle] Fill Style of the handle when it is selected and active
     * @param {geotoolkit.attributes.LineStyle} [styles.activelinestyle] Line Style of the handle when when it is inactive (most of the time)
     * @param {geotoolkit.attributes.LineStyle} [styles.inactivelinestyle] Line Style of the handle when when it is inactive (most of the time)
     * @returns {geotoolkit.welllog.widgets.tools.LogMarkerAdapter}
     */
    geotoolkit.welllog.widgets.tools.LogMarkerAdapter.prototype.setHandleStyles = function(styles){};

/**
 * @class geotoolkit.welllog.widgets.tools.GhostToolEventArgs
 * @param {array<geotoolkit.scene.Node>} selection selected visuals
 * @param {number} minDepth min depth
 * @param {number} maxDepth max depth
 * @param {geotoolkit.welllog.LogTrack} track track to select
 */
geotoolkit.welllog.widgets.tools.GhostToolEventArgs = {};
    /**
     * Return a selected nodes in the current track. (by default are all curve)
     * @returns {array<geotoolkit.scene.Node>}
     */
    geotoolkit.welllog.widgets.tools.GhostToolEventArgs.prototype.getSelection = function(){};
    /**
     * @returns {number} min selected depth
     */
    geotoolkit.welllog.widgets.tools.GhostToolEventArgs.prototype.getMinDepth = function(){};
    /**
     * @returns {number} max selected depth
     */
    geotoolkit.welllog.widgets.tools.GhostToolEventArgs.prototype.getMaxDepth = function(){};
    /**
     * @returns {geotoolkit.welllog.LogTrack} track to select
     */
    geotoolkit.welllog.widgets.tools.GhostToolEventArgs.prototype.getTrack = function(){};
    /**
     * Sets a selected area in the model coordinate
     * @param {array<geotoolkit.scene.Node>} selection selected visuals
     * @returns {geotoolkit.welllog.widgets.tools.GhostToolEventArgs} this
     */
    geotoolkit.welllog.widgets.tools.GhostToolEventArgs.prototype.setSelection = function(selection){};

/**
 * Creates tool to compare curves and tops between tracks
 * <br>
 * <h5>Events {@link geotoolkit.welllog.widgets.tools.GhostTool.Events}</h5>
 * <table class="params">
 * <thead>
 * <tr>
 * <th>Event</th><th>Arguments</th><th>Description</th>
 * </tr>
 * </thead>
 * <tbody>
 * <tr>
 * <td>Selected</td>
 * <td>{@link geotoolkit.welllog.widgets.tools.GhostToolEventArgs}</td>
 * <td>This Event is fired when the Ghost Tool selection in track occurs.</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 * @class geotoolkit.welllog.widgets.tools.GhostTool
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {geotoolkit.scene.CompositeNode} manipulatorLayer layer for holding temporary shapes
 * @param {object} [options] options for box
 * @param {object} [options.ghost] options for ghost
 * @param {object|geotoolkit.attributes.FillStyle} [options.ghost.fillstyle] options for active ghost fill style
 * @param {object|geotoolkit.attributes.LineStyle} [options.ghost.linestyle] options for ghost line style
 * @param {object} [options.rubberband] options for rubber band
 * @param {object|geotoolkit.attributes.FillStyle} [options.rubberband.fillstyle] options for active rubber band fill style
 * @param {object|geotoolkit.attributes.LineStyle} [options.rubberband.linestyle] options for rubber band line style
 * @param {object} [options.highlight] options for highlighting the track where the tool will snap
 * @param {boolean} [options.highlight.enable] enable highlighting of the snap track (note: the "snaptotrack" option must also be enabled)
 * @param {object|geotoolkit.attributes.FillStyle} [options.highlight.fillstyle] options for track highlighting fill style
 * @param {object|geotoolkit.attributes.LineStyle} [options.highlight.linestyle] options for track highlighting line style
 * @param {boolean} [options.snaptotrack=false] snap to track
 * @param {boolean} [options.shadow=false] shadow to show original selection location
 * @example
 * // To provide visuals for this selection
 * this.ghost.addListener(geotoolkit.welllog.widgets.tools.GhostTool.Events.Selected, function(sender, evt)
 * { evt.setSelection([curve]); }
 * );
 */
geotoolkit.welllog.widgets.tools.GhostTool = {};
    /**
     * GhostTool Events
     * @readonly
     * @enum
     */
    geotoolkit.welllog.widgets.tools.GhostTool.Events = {};
        /**
         * Visual Selected
         * @type {string}
         */
        geotoolkit.welllog.widgets.tools.GhostTool.Events.Selected = "";
    /**
     * Return true if the representation is flipped vertically
     *
     * @returns {boolean} flip
     */
    geotoolkit.welllog.widgets.tools.GhostTool.prototype.isVerticalFlip = function(){};
    /**
     * Set vertical flip of the representation
     *
     * @param {boolean} flip flag to set the vertical flip of the representation
     * @returns {geotoolkit.welllog.widgets.tools.GhostTool} this
     */
    geotoolkit.welllog.widgets.tools.GhostTool.prototype.setVerticalFlip = function(flip){};
    /**
     * Return true if the representation is flipped horizontally
     *
     * @returns {boolean} flip
     */
    geotoolkit.welllog.widgets.tools.GhostTool.prototype.isHorizontalFlip = function(){};
    /**
     * Set horizontal flip of the representation
     *
     * @param {boolean} enable enable flip
     * @returns {geotoolkit.welllog.widgets.tools.GhostTool} this
     */
    geotoolkit.welllog.widgets.tools.GhostTool.prototype.setHorizontalFlip = function(enable){};
    /**
     * Set visuals filter callback
     *
     * @param {geotoolkit.welllog.widgets.tools.GhostTool~visualsFilterCallback|boolean|null} callback visuals filter callback
     * @returns {geotoolkit.welllog.widgets.tools.GhostTool} this
     */
    geotoolkit.welllog.widgets.tools.GhostTool.prototype.setVisualsFilter = function(callback){};
    /**
     * Shift ghost track if it is created
     * @param {number} deltaX delta in pixels in horizontal direction
     * @param {number} deltaY delta in pixels in vertical direction
     */
    geotoolkit.welllog.widgets.tools.GhostTool.prototype.shiftGhost = function(deltaX, deltaY){};
    /**
     * Returns active track to apply selection
     * @returns {?geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.widgets.tools.GhostTool.prototype.getActiveTrack = function(){};
    /**
     * @protected
     */
    geotoolkit.welllog.widgets.tools.GhostTool.prototype.onEnabledStateChanged = function(){};

/**
 * @class geotoolkit.welllog.widgets.headers.CustomLogTrackHeader
 * @augments geotoolkit.welllog.header.LogTrackHeader
 */
geotoolkit.welllog.widgets.headers.CustomLogTrackHeader = {};

/**
 * @class geotoolkit.welllog.widgets.visuals.LogTrackContainer
 * @augments geotoolkit.welllog.TrackContainer
 */
geotoolkit.welllog.widgets.visuals.LogTrackContainer = {};
    /**
     * @override
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.dispose = function(){};
    /**
     * @param {function(node, target)} callback callback
     * @param {object} target target
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.enumerateNodes = function(callback, target){};
    /**
     * Set indent between tracks
     * @param {number} indent indent between tracks
     * @returns {geotoolkit.welllog.widgets.visuals.LogTrackContainer} this
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.setIndent = function(indent){};
    /**
     * Return indent between tracks
     * @returns {number}
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.getIndent = function(){};
    /**
     * Add layer to container
     * @param {geotoolkit.scene.CompositeNode| Array<geotoolkit.scene.CompositeNode>} layer layer to be added
     * @returns {geotoolkit.welllog.widgets.visuals.LogTrackContainer} this
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.addLayer = function(layer){};
    /**
     * Returns amount of layers
     * @returns {number}
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.getLayersCount = function(){};
    /**
     * Return layer at specified index
     * @param {number} index index at which to get the layer for
     * @returns {geotoolkit.scene.CompositeNode} track
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.getLayerAt = function(index){};
    /**
     * Add track to container
     * @param {geotoolkit.welllog.LogTrack} track track to be added
     * @returns {geotoolkit.welllog.widgets.visuals.LogTrackContainer}
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.addTrack = function(track){};
    /**
     * Remove track from container
     * @param {geotoolkit.welllog.LogTrack} track track to be removed
     * @returns {geotoolkit.welllog.widgets.visuals.LogTrackContainer}
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.removeTrack = function(track){};
    /**
     * Returns amount of tracks
     * @returns {number}
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.getTracksCount = function(){};
    /**
     * Return track at specified index
     * @param {number} index index at which to get the track for
     * @returns {geotoolkit.welllog.LogTrack} track
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.getTrackAt = function(index){};
    /**
     * return index of track
     * @param {geotoolkit.welllog.LogTrack} track index of track
     * @returns {number} index of the track
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.getTrackIndex = function(track){};
    /**
     * @override
     * @param {string} event broadcast event
     * @param {geotoolkit.scene.Node} source who is initializing this event
     * @param {object} args additional parameter
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.notify = function(event, source, args){};
    /**
     * Set track width and layout remains tracks
     * @param {number} width track width
     * @param {geotoolkit.welllog.LogTrack | Array} track current track
     * @returns {geotoolkit.welllog.widgets.visuals.LogTrackContainer}
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.setTrackWidth = function(width, track){};
    /**
     * Returns the minimum width of a track
     * @param {geotoolkit.welllog.LogTrack} [track] track to get minimum width
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.getMinWidth = function(track){};
    /**
     * Returns the maximum width of a track
     * @param {geotoolkit.welllog.LogTrack} [track] track to get maximum width
     * @returns {geotoolkit.layout.LayoutStyle}
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.getMaxWidth = function(track){};
    /**
     * Find nearest track at specified {number} x-coordinate
     * @param {number} x x coordinate to get the track at
     * @param {number} gap gap
     * @returns {object} a as {geotoolkit.welllog.LogTrack | object} {leftTrack :
     * {geotoolkit.welllog.LogTrack}, rightTrack : {geotoolkit.welllog.LogTrack}}
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.getTrackAtPosition = function(x, gap){};
    /**
     * Find nearest track at specified {number} x-coordinate
     * @param {number} x x coordinate to get the track at
     * @param {number} gap gap
     * @returns {object} a as {geotoolkit.welllog.LogTrack | object} {leftTrack : {geotoolkit.welllog.LogTrack}, rightTrack : {geotoolkit.welllog.LogTrack}}
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.getTrackAtPosition = function(x, gap){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.render = function(){};
    /**
     * Update state.
     * @param {Array.<geotoolkit.util.Rect>} [regions] optional array to return invalid rectangles
     * @param {?geotoolkit.scene.Node.StateChanges} [changes] optional parameter to specify a reason of changes
     * @returns {geotoolkit.welllog.widgets.visuals.LogTrackContainer} this
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.updateState = function(regions, changes){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {number} [properties.indent] indent indent between tracks
     * @param {geotoolkit.welllog.LogTrack[]} [properties.tracks] tracks
     * @param {geotoolkit.scene.CompositeNode[]} [properties.layers] layers
     * @returns {geotoolkit.welllog.widgets.visuals.LogTrackContainer} this
     */
    geotoolkit.welllog.widgets.visuals.LogTrackContainer.prototype.setProperties = function(properties){};

/**
 * @class geotoolkit.welllog.widgets.visuals.LogHeaderContainer
 * @augments geotoolkit.welllog.HeaderContainer
 */
geotoolkit.welllog.widgets.visuals.LogHeaderContainer = {};
    /**
     * Add layer to container
     * @param {geotoolkit.scene.Layer} layer layer to be added
     * @returns {geotoolkit.welllog.widgets.visuals.LogHeaderContainer} this
     */
    geotoolkit.welllog.widgets.visuals.LogHeaderContainer.prototype.addLayer = function(layer){};
    /**
     * @override
     * @param {geotoolkit.renderer.RenderingContext} context to render header container
     */
    geotoolkit.welllog.widgets.visuals.LogHeaderContainer.prototype.render = function(context){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.widgets.visuals.LogHeaderContainer.prototype.getProperties = function(){};
    /**
     * Sets all the properties pertaining to this object
     * @param {object} properties An object containing the properties to set
     * @param {geotoolkit.scene.Layer[]} [properties.layers] layers
     * @returns {geotoolkit.welllog.widgets.visuals.LogHeaderContainer} this
     */
    geotoolkit.welllog.widgets.visuals.LogHeaderContainer.prototype.setProperties = function(properties){};

/**
 * This class is used internally in WellLogWidget to show selected depths.
 * @class geotoolkit.welllog.widgets.visuals.DepthMarkerShape
 * @augments geotoolkit.scene.shapes.ScaledShape
 * @param {object} [options] shape options
 * @param {geotoolkit.attributes.LineStyle|object} [options.linestyle] style applied on outline
 * @param {geotoolkit.attributes.FillStyle|object} [options.fillstyle] style applied on fill
 * @param {geotoolkit.attributes.TextStyle|object} [options.textstyle] style applied on text
 * @param {boolean} [options.showdepth=true] show depths
 * @param {string} [options.datetimeformat='M j H:i'] date time format in case if track container scale unit belongs to 'time'
 * @param {geotoolkit.util.Format|function} [options.depthformater=null] depth index format that accept number
 * @param {geotoolkit.util.Format|function} [options.valueformater=null] curve value format that accept object with properties { 'curve', 'depth', 'value' }
 * @param {geotoolkit.welllog.widgets.visuals.LogTrackContainer} [trackContainer] track container to display depth markers
 */
geotoolkit.welllog.widgets.visuals.DepthMarkerShape = {};
    /**
     * copy constructor
     * @protected
     * @param {geotoolkit.welllog.widgets.visuals.DepthMarkerShape} src Source to copy from
     * @returns {geotoolkit.welllog.widgets.visuals.DepthMarkerShape} this
     */
    geotoolkit.welllog.widgets.visuals.DepthMarkerShape.prototype.copyConstructor = function(src){};
    /**
     * Return text style
     * @returns {geotoolkit.attributes.TextStyle} text style
     */
    geotoolkit.welllog.widgets.visuals.DepthMarkerShape.prototype.getTextStyle = function(){};
    /**
     * Set text style
     * @param {geotoolkit.attributes.TextStyle|object} textStyle a new shape text style
     * @param {string|geotoolkit.util.RgbaColor} [textStyle.color] text color
     * @param {string} [textStyle.baseLine] base line.
     * @param {string} [textStyle.alignment] alignment.
     * @param {string} [textStyle.font] font.
     * @param {boolean} [merge=false] true if you want to merge textStyle with existing attribute, false by default
     * @returns {geotoolkit.welllog.widgets.visuals.DepthMarkerShape} this
     */
    geotoolkit.welllog.widgets.visuals.DepthMarkerShape.prototype.setTextStyle = function(textStyle, merge){};
    /**
     * Return bounds
     * @override
     * @returns {geotoolkit.util.Rect} bounds
     */
    geotoolkit.welllog.widgets.visuals.DepthMarkerShape.prototype.getBounds = function(){};
    /**
     * Set depth value
     * @param {number} depth depth value
     * @returns {geotoolkit.welllog.widgets.visuals.DepthMarkerShape} this
     */
    geotoolkit.welllog.widgets.visuals.DepthMarkerShape.prototype.setDepth = function(depth){};
    /**
     * Renders node
     * @param {geotoolkit.renderer.RenderingContext} context The rendering context to be used to draw the node
     */
    geotoolkit.welllog.widgets.visuals.DepthMarkerShape.prototype.render = function(context){};

/**
 * <p>
 * The WellLog widget is a widget that is specialized for well related data. It uses classes from the WellLog toolkit internally.<br>
 * The main way to configure and customize the default look and feel of the widget is by using the different setOptions() function in the constructor.<br>
 * The widget content can be manipulated through add/remove/get-Track() and the Track content can be controlled through track.add/remove/get-Child() as shown in example below.<br>
 * Similarly all supported well data (track, index track, log curves, log fills, log2d, markers etc) can be manipulated.<br>
 * Widget has header, footer containers to display tracks and visuals headers and track container to display tracks.
 * The widget provides builtin support for Time/Depth modes, Resizing headers and footers, Selection and highlighting, Track resizing.
 *
 * The Default tools include:
 * <ul>
 * <li> Horizontal scrollbar </li>
 * <li> Vertical scrollbars (header, tracks, footer) </li>
 * <li> Panning </li>
 * <li> Pinching </li>
 * <li> Crosshair </li>
 * <li> Header/Footer splitters (for resizing) </li>
 * <li> Track splitters (for resizing) </li>
 * <li> Rubberband (for rubberband Zoom) </li>
 * <li> Selection </li>
 * <li> drag-and-drop (for drag'n drop track or curve) </li>
 * </ul>
 * </p>
 * @class geotoolkit.welllog.widgets.WellLogWidget
 * @augments geotoolkit.widgets.BaseWidget
 * @implements geotoolkit.scene.exports.IExportable
 * @param {object} [options] addition options
 * @param {boolean | string} [options.horizontalscrollable=true] defines if plot displays horizontal scrollbars, true | false | 'auto' | 'floating'
 * @param {boolean | string} [options.verticalscrollable=true] defines if plot displays vertical scrollbars, true | false | 'auto' | 'floating'
 * @param {string} [options.indextype=md] primary index types
 * @param {string} [options.indexunit=ft] primary index unit
 * @param {string} [options.deviceunit=in] primary device unit
 * @param {number} [options.timezone=geotoolkit.axis.TimeZone.UTC] time zone for time axis
 * @param {number} [options.timezoneoffset=0] time zone offset for date time axis
 * @param {number} [options.indent=0] indent
 *
 * @param {object} [options.header] header options
 * @param {boolean|string} [options.header.visible=true] visibility of the headers, if it is 'none' then header is not created
 * @param {number} [options.header.margin=0] margin margin between header components
 * @param {number} [options.header.padding=0] padding padding inside header components
 * @param {geotoolkit.welllog.HeaderContainer.DisplayType} [options.header.display-type=geotoolkit.welllog.HeaderContainer.DisplayType.Default] display-type
 * @param {number} [options.header.height=84] header height
 * @param {object} [options.header.border] defines properties for header outer border
 * @param {boolean} [options.header.border.visible=false] visibility of the border
 * @param {string} [options.header.border.color=lightgray] color of border border
 * @param {boolean | geotoolkit.scene.Cache} [options.header.viewcache=false] enable tiled cache. It increase rendering performance for historical data
 * @param {object} [options.header.viewcachesize] deprecated (since 2.6) define view cache parameters. Use options.header.viewcache to set up cache.
 * @param {number} [options.header.viewcachesize.width=256] deprecated (since 2.6) set tiled cache size. Use options.header.viewcache to set up cache.
 * @param {number} [options.header.viewcachesize.height=256] deprecated (since 2.6) set tiled cache size. Use options.header.viewcache to set up cache.
 *
 * @param {object} [options.footer] footer options
 * @param {boolean|string} [options.footer.visible=false] visibility of the footer, if it is 'none' then footer is not created
 * @param {number} [options.footer.margin=0] margin margin between footer components
 * @param {number} [options.footer.padding=0] padding padding inside footer components
 * @param {geotoolkit.welllog.HeaderContainer.DisplayType} [options.footer.display-type=geotoolkit.welllog.HeaderContainer.DisplayType.Default] display-type
 * @param {number} [options.footer.height=84] footer height
 * @param {object} [options.footer.border] defines properties for footer outer border
 * @param {boolean} [options.footer.border.visible=false] visibility of the border
 * @param {string} [options.footer.border.color=lightgray] color of border border
 * @param {boolean | geotoolkit.scene.Cache} [options.footer.viewcache=false] enable tiled cache. It increase rendering performance for historical data
 * @param {object} [options.footer.viewcachesize] deprecated (since 2.6) define view cache parameters. Use options.footer.viewcache to set up cache.
 * @param {number} [options.footer.viewcachesize.width=256] deprecated (since 2.6) set tiled cache size. Use options.footer.viewcache to set up cache.
 * @param {number} [options.footer.viewcachesize.height=256] deprecated (since 2.6) set tiled cache size. Use options.footer.viewcache to set up cache.
 *
 * @param {boolean | geotoolkit.scene.Cache} [options.viewcache=true] enable tiled cache. It increase rendering performance for historical data
 * @param {object} [options.viewcachesize] deprecated (since 2.6) optional properties of view cache. Use options.viewcache to set up cache.
 * @param {number} [options.viewcachesize.width=256] deprecated (since 2.6) set tiled cache size. Use options.viewcache to set up cache.
 * @param {number} [options.viewcachesize.height=256] deprecated (since 2.6) set tiled cache size. Use options.viewcache to set up cache.
 * @param {object} [options.border] defines properties for widget outer border
 * @param {boolean} [options.border.visible=false] visibility of the border
 * @param {string} [options.border.color=lightgray] color of border border
 *
 * @param {object} [options.trackcontainer] defines properties for track container
 * @param {object} [options.trackcontainer.border] defines properties for track container outer border
 * @param {boolean} [options.trackcontainer.border.visible=true] visibility of the border
 * @param {string} [options.trackcontainer.border.color=lightgray] color of border border
 * @param {object} [options.trackcontainer.track] options of track inside the track container
 * @param {object} [options.trackcontainer.track.borderstrategy=geotoolkit.welllog.BorderStrategy.BorderOnTop] apply a border strategy to the LogTrack class
 * @param {object} [options.trackcontainer.verticalflip=false] specify direction of the vertical axis. By default it goes from top to bottom. if it is true
 * then an axis goes from bottom to top.
 * @param {object} [options.track] defines properties for track
 * @param {geotoolkit.attributes.FillStyle|object} [options.track.background=null] defines properties for track background
 * @param {object} [options.track.border] defines properties for track border
 * @param {boolean} [options.track.border.visible=false] visibility of the border
 * @param {string} [options.track.border.color=lightgray] color of border border
 * @param {object} [options.track.header] optional track header properties
 * @param {boolean} [options.track.header.visibletracktitle=false] visibility of track title
 * @param {boolean} [options.track.header.titlefirst=true] order of the track title header
 * @param {boolean} [options.track.header.firsttolast=true] order of the track child headers
 * @param {boolean} [options.track.header.toptobottom=true] position of the track child headers
 * @param {object} [options.track.header.border] optional track header properties
 * @param {boolean} [options.track.header.border.visible=false] visibility of the track header border
 * @param {string} [options.track.header.border.color=lightgray] color of track header border
 * @param {number} [options.track.header.border.width=1] line width of track header border
 * @param {string} [options.track.header.border.background=null] color of border background
 * @param {object} [options.track.footer] optional track footer properties
 * @param {boolean} [options.track.footer.visibletracktitle=false] visibility of track title
 * @param {boolean} [options.track.footer.titlefirst=true] order of the track title footer
 * @param {boolean} [options.track.footer.firsttolast=true] order of the track child footers
 * @param {boolean} [options.track.footer.toptobottom=true] position of the track child footers
 * @param {object} [options.track.footer.border] optional track footer properties
 * @param {boolean} [options.track.footer.border.visible=false] visibility of the track footer border
 * @param {string} [options.track.footer.border.color=lightgray] color of track footer border
 * @param {number} [options.track.footer.border.width=1] line width of track footer border
 * @param {string} [options.track.footer.border.background=null] color of border background
 * @param {object | geotoolkit.attributes.LineStyle} [options.gridlinestyle] grid line style
 * @param {object} [options.indextrack] defines properties for index track
 * @param {object} [options.indextrack.styles] index track line styles and text styles
 * @param {object} [options.indextrack.labelformat] custom label format function
 * @param {object} [options.indextrack.axis] axis settings
 * @param {string} [options.indextrack.axis.name] name of axis
 * @param {string} [options.indextrack.axis.locale = 'en'] locale for tickgenerator of axis
 * @param {object} [options.highlight] define highlight properties
 * @param {string} [options.highlight.cssclass=null] define highlight class name, see cssstyle.html tutorial
 * @param {geotoolkit.attributes.LineStyle} [options.highlight.linestyle] define line style attribute for visual highlight
 * @param {geotoolkit.attributes.FillStyle} [options.highlight.fillstyle] define fill style attribute for visual highlight
 * @param {geotoolkit.util.Orientation} [options.orientation=geotoolkit.util.Orientation.Vertical] set orientation of the well log widget
 * @param {function} [options.nodefilter] node filter for visual which can be selected
 * @param {geotoolkit.util.Rect | object} [options.bounds] bounds of the node
 * @param {geotoolkit.util.Range} [options.range] min and max depth range.
 * @example
 * <caption>Initialize Widget</caption>
 * // 1). Create the Widget
 * // The following examples shows how to create the basic welllog widget, add index and linear track and then add the curve to the track.
 * var widget = new geotoolkit.welllog.widgets.WellLogWidget({
 * 'horizontalscrollable': false,
 * 'verticalscrollable': true,
 * 'trackcontainer': {
 * 'border': {'visible': false}
 * },
 * 'border': {'visible': false}
 * })
 * .setLayoutStyle({
 * 'left': '0',
 * 'top': '0',
 * 'right': '0',
 * 'bottom': '0'
 * });
 * widget.addTrack(geotoolkit.welllog.TrackType.IndexTrack);
 *
 * // 2). Adding a curve to the widget.
 * widget.addTrack(geotoolkit.welllog.TrackType.LinearTrack)
 * .addChild([
 * createCurve(createTestData(4500, 10, 'GR'))
 * .setLineStyle(new geotoolkit.attributes.LineStyle(Helpers.getColor('green'), 1)),
 * createCurve(createTestData(4500, 10, 'CALI'))
 * .setLineStyle(new geotoolkit.attributes.LineStyle(Helpers.getColor('orange'), 1)) // data = geotoolkit.welllog.data.LogData
 * ]);
 * @example
 * // 3). To capture a scroll event when the user uses the scroll tab or mouse wheel.
 * widget.getToolByName('TrackPanning')
 * .addListener(geotoolkit.controls.tools.Panning.Events.onPanning, function (sender, eventArgs) {
 * //eventArgs is geotoolkit.controls.tools.PanningEventArgs
 * var direction = eventArgs.getDirection();
 * geotoolkit.log(direction['x']+' x '+direction['y']);
 * }.bind(this));
 *
 * widget.getToolByName('TrackPlotVerticalScroll')
 * .addListener(geotoolkit.controls.tools.scroll.AbstractScroll.Events.onScroll, function(sender, eventArgs){
 * //eventArgs is geotoolkit.controls.tools.scroll.ScrollEventArgs
 * geotoolkit.log(eventArgs.getVisibleModelLimits().toString());
 * });
 *
 * widget.getToolByName('HorizontalPlotScroll')
 * .addListener(geotoolkit.controls.tools.scroll.AbstractScroll.Events.onScroll, function(sender, eventArgs){
 * //eventArgs is geotoolkit.controls.tools.scroll.ScrollEventArgs
 * geotoolkit.log(eventArgs.getVisibleModelLimits().toString());
 * });
 * //
 * // 4). Resizing WellLogWidget. It has two parts. The first one is resizing of the plot (geotoolkit.plot.Plot), which is a container of any widget and shapes
 * // and the second step is resizing of widgets inside of container.
 * // To change the size of the widget you need to call 'setBounds' method of the widget. The method of the plot 'setSize' will change a plot size.
 * // It is better to use automatic way to change size of the widget based on plot. The following steps will describe this approach:
 * // step1: When you create a plot geotoolkit.plot.Plot you specify canvas and widget like this:
 * var widgetPlot = new geotoolkit.plot.Plot({
 * 'canvasElement': canvas,
 * 'root': new geotoolkit.scene.Group()
 * .setAutoModelLimitsMode(true)
 * .setLayout(new geotoolkit.layout.CssLayout()) // plot will resize children using CssLayout.
 * .addChild(widget),
 * 'autoSize': false,
 * 'autoRootBounds': true
 * });
 * // step2: After you create a widget you specify location inside the plot using layout style like this:
 * var widget = new geotoolkit.welllog.widgets.WellLogWidget({
 * 'horizontalscrollable': false,
 * 'verticalscrollable': true,
 * 'trackcontainer': {
 * 'border': {'visible': false}
 * },
 * 'border': {'visible': false}
 * 'track' : {
 * 'header' : {
 * 'visibletracktitle' : true,
 * 'titlefirst' : true,
 * 'firsttolast' : false,
 * 'toptobottom' : false
 * },
 * 'footer' : {
 * 'visibletracktitle' : true,
 * 'titlefirst' : true,
 * 'firsttolast' : false,
 * 'toptobottom' : true
 * }
 * },
 * })
 * .setLayoutStyle({
 * 'left': '0',
 * 'top': '0',
 * 'right': '0',
 * 'bottom': '0'
 * });
 * // This setLayoutStyle tells that widgets will occupy whole plot area.
 * // Now if you change a plot size then the size of widget will be changed automatically, so to resize widget you need just to call:
 * plot.setSize(width, height);
 * //
 * // 5). To modify the height of headers container simply do the following while initializing the widget.
 * var widget = new geotoolkit.welllog.widgets.WellLogWidget({
 * 'header': {
 * 'height': 200
 * }
 * })
 * // or If you are using CSS then
 * var css = [
 * '.WellLogWidget {',
 * ' header-height: 200;',
 * '}',
 * ].join('\n');
 * widget.setCss(new geotoolkit.css.CssStyle({'css': css}));
 * // CSS styles can be used to change other properties also. Please refer to the CSS properties section to see which properties can be changed.
 * @example
 * // 6). How to add widget header
 * var widget = new geotoolkit.welllog.widgets.WellLogWidget({
 * 'annotations': {
 * 'north': [
 * new geotoolkit.scene.shapes.Text({'text': 'Title'}).setLayoutStyle({ 'height': 20 })
 * ]
 * },
 * 'annotationssizes': {
 * 'north': 100
 * }
 * });
 * @example
 * // 7). To change tracks' size manually use method WellLogWidget.setTrackWidth:
 * wellLogWidget.setTrackWidth(150, track); //150 is the width, if track is null then width will be applied to all tracks.
*/
geotoolkit.welllog.widgets.WellLogWidget = {};
    /**
     * Gets annotation at specified location
     * @param {geotoolkit.layout.AnnotationLocation} location Enum of annotation locations used to specify direction to insert
     * @returns {?geotoolkit.scene.Group}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getAnnotation = function(location){};
    /**
     *
     * enum for Events triggered by the WellLog Widget.
     * @enum
     * @readonly
     * @example
     * //The following snippet shows how to capture a scroll event.
     * widget.on(geotoolkit.welllog.widgets.WellLogWidget.Events.VisibleDepthLimitsChanged, function(event, sender, eventArgs){
     * //eventArgs is json object
     * geotoolkit.log('New Depths limits '+eventArgs['new'].toString());
     * //WellLogWidget has a method 'scrollToIndex', which you can uses to scroll content from your application.
     */
    geotoolkit.welllog.widgets.WellLogWidget.Events = {};
        /**
         * This event occurs when the visible depth limits is changed. It can scroll, scale operations.
         * @type {string}
         */
        geotoolkit.welllog.widgets.WellLogWidget.Events.VisibleDepthLimitsChanged = "";
        /**
         * If widget orientation changed.
         * @type {string}
         */
        geotoolkit.welllog.widgets.WellLogWidget.Events.OrientationChanged = "";
        /**
         * This events occurs when virtual depth model limit is changed. For example, if you call method setDepthLimits.
         * @type {string}
         */
        geotoolkit.welllog.widgets.WellLogWidget.Events.DepthRangeChanged = "";
        /**
         * This occurs if any sum size of all tracks is changed. It can also happen if a track is deleted, inserted or changed size
         * @type {string}
         */
        geotoolkit.welllog.widgets.WellLogWidget.Events.TracksSizeChanged = "";
        /**
         * It occurs when widget can request data. It happens if visible limits or scale is changed.
         * @type {string}
         */
        geotoolkit.welllog.widgets.WellLogWidget.Events.DataUpdating = "";
        /**
         * If visual is selected.
         * @type {string}
         */
        geotoolkit.welllog.widgets.WellLogWidget.Events.VisualsSelected = "";
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
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getOptions = function(){};
    /**
     * Returns actual header height or model height whenever 'auto' is specified
     * @param {null|string} [options=null] header options
     * @returns {number}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getHeaderHeight = function(options){};
    /**
     * Returns actual footer height or model height whenever 'auto' is specified
     * @param {null|string} [options=null] header options,
     * @returns {number}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getFooterHeight = function(options){};
    /**
     * Sets footer height
     * @param {number|string} height footer height in pixels or 'auto' to fit footer height
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setFooterHeight = function(height){};
    /**
     * Sets header height
     * @param {number|string} height header height in pixels or 'auto' to fit header height
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setHeaderHeight = function(height){};
    /**
     * Sets header scrollbar visibility flag
     * @param {boolean} value visibility option
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setHeaderScrollVisible = function(value){};
    /**
     * Gets visibility flag for the header scroll bar
     * @returns {boolean}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getHeaderScrollVisible = function(){};
    /**
     * Sets footer scrollbar visibility flag
     * @param {boolean} value visibility flag
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setFooterScrollVisible = function(value){};
    /**
     * Gets visibility flag for the footer header scroll bar
     * @returns {boolean}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getFooterScrollVisible = function(){};
    /**
     * Sets some widget options
     * @param {object} [options] addition options
     * @param {object} [options.header] header options
     * @param {boolean} [options.header.visible] visibility of the headers
     * @param {number|string} [options.header.height] header height in pixels or 'auto' to fit header height
     * @param {object} [options.footer] footer options
     * @param {boolean} [options.footer.visible] visibility of the footer
     * @param {number|string} [options.footer.height] footer height in pixels or 'auto' to fit footer height
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     * @example
     * //call setOptions on widget after construction and change the default header size(84) as follows.
     * widgets.setOptions({'header' : {
     'height': 184
     }});
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setOptions = function(options){};
    /**
     * Attach or detach header and footer
     * @param {boolean} enable enable or disable attached headers
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setAttachedHeaders = function(enable){};
    /**
     * Return true if headers and footers are attached to track
     * @returns {boolean}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.isAttachedHeaders = function(){};
    /**
     * Add depth markers
     * @param {Array<number> | number} [depths=null] depths
     * @param {geotoolkit.attributes.LineStyle | object} [lineStyle=null] line style or options
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setDepthMarkers = function(depths, lineStyle){};
    /**
     * Returns manipulator overlay to draw temporary shapes on top of the track container
     * @returns {geotoolkit.scene.Layer}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getTrackManipulatorLayer = function(){};
    /**
     * Function call in the constructor to initialize tools in the widget
     * @protected
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.initializeTools = function(){};
    /**
     * Set annotation sizes
     * @param {object} annotationSizes annotation sizes
     * @param {number} [annotationSizes.west=null] a size of west annotation
     * @param {number} [annotationSizes.east=null] a size of east annotation
     * @param {number} [annotationSizes.south=null] a size of south annotation (if size is null it will be equal to footer height if it is visible)
     * @param {number} [annotationSizes.north=null] a size of north annotation (if size is null it will be equal to header height if it is visible)
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setAnnotationSize = function(annotationSizes){};
    /**
     * Raising an event 'visibleDepthLimitsChanged'
     * eventName : (WellLogWidget.Events.VisibleDepthLimitsChanged)
     * @param {geotoolkit.util.Range} oldLimits old visible limits
     * @param {geotoolkit.util.Range} newLimits visible limits
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.onVisibleDepthLimitsChanged = function(oldLimits, newLimits){};
    /**
     * Sets the axis header type
     * @param {geotoolkit.welllog.header.LogAxisVisualHeader.HeaderType}headerType The axis header type enum.
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setAxisHeaderType = function(headerType){};
    /**
     * Highlights header for the specified visual (if header exists)
     * @param {geotoolkit.welllog.LogTrack|geotoolkit.welllog.LogAbstractVisual} visual a reference visual
     * @param {boolean} highlight boolean value that indicating whether the header must be highlighted or de-highlighted
     * @protected
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.highlightVisualHeader = function(visual, highlight){};
    /**
     * Highlights a visual or track. Called whenever a visual is selected to highlight it. <br>
     * If user selects a curve and the track, the curve,track and header are highlighted. Programmatically deselecting a track doesn't automatically deselect curves.<br>
     * Deselect all selected tracks and visuals using the example shown below.
     *
     * @param {geotoolkit.welllog.LogTrack|geotoolkit.welllog.LogAbstractVisual} visual The visual to highlight
     * @param {boolean} highlight the status of the highlight
     * @example
     * var selector = this._wellLogWidget.getToolByName('pick');
     * var currentSelection = selector.getSelection();
     * currentSelection.forEach(function (visual) {
     * this._nodes[0].highlightVisual(visual, false);
     * }.bind(this));
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.highlightVisual = function(visual, highlight){};
    /**
     * return selected track collection
     * @returns {Array.<geotoolkit.welllog.LogTrack>}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getSelectedTracks = function(){};
    /**
     * Return an array of the selected visuals for the specified track. if track is not specified
     * then all selected visuals are returned. This method is a helper method and uses selected visuals
     * from 'pick' tool. The code below shows how to get access to all selected tracks and visuals instead
     * @example
     * var selector = widget.getToolByName('pick');
     * var currentSelection = selector.getSelection();
     * @param {geotoolkit.welllog.LogTrack} [track] track to return selected visuals specified by node filter
     * @returns {Array.<geotoolkit.welllog.LogAbstractVisual>}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getSelectedVisuals = function(track){};
    /**
     * Return a depth range, which is visible now
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getVisibleDepthLimits = function(){};
    /**
     * Sets visible depth limits
     * @param {number | geotoolkit.util.Range} fromIndex fromindex limit
     * @param {number} [toIndex] toindex limit
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setVisibleDepthLimits = function(fromIndex, toIndex){};
    /**
     * Insert a track
     * @param {object|geotoolkit.welllog.TrackType|geotoolkit.welllog.LogTrack} track track to insert
     * @param {geotoolkit.welllog.TrackType} [track.type] track type to insert
     * @param {string} [track.name] track name
     * @param {number} [track.width] track width
     * @param {object} [track.gridlinestyle] grid line style
     * @param {object|string|geotoolkit.attributes.FillStyle} [track.background] track background
     * @param {object} [track.border] track border options
     * @param {boolean} [track.border.visible] track border visibility
     * @param {object|string|geotoolkit.attributes.LineStyle} [track.border.color] track border line style
     * @param {object} [track.indextrack] index track options
     * @param {object} [track.indextrack.style] index track tick styles
     * @param {object} [track.indextrack.labelformat] index track label format
     * @param {object} [track.logtrack] log track options
     * @param {number} [track.logtrack.decadecount] log track decade count
     * @param {boolean} [track.logtrack.reverse] log track reverse direction
     * @param {geotoolkit.welllog.TrackDirection} [trackDirection] The location of the track (first, last, etc)
     * @param {number} [trackWidth] width of the track in pixels
     * @returns {geotoolkit.welllog.LogTrack}
     * @example
     * // 1). This example shows how to add any geotoolkit image to the track
     * function createLogImage (fromDepth, toDepth) {
     * return new geotoolkit.scene.shapes.Image({
     * 'x': 0,
     * 'y': fromDepth,
     * 'w': 1, // keep in mind that track model space is in 0..1
     * 'h': toDepth - fromDepth,
     * 'alignment': geotoolkit.util.AnchorType.TopLeft,
     * 'url': '../widget/images/log-image.png'
     * });
     * }
     *
     * widget.addTrack(geotoolkit.welllog.widgets.TrackType.LinearTrack)
     * .addChild(createLogImage(150, 1300));
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.addTrack = function(track, trackDirection, trackWidth){};
    /**
     * Insert track to the container at specified index
     * @param {geotoolkit.welllog.TrackType | geotoolkit.welllog.LogTrack} track track to insert
     * @param {number} index index of the track
     * @param {number} [trackWidth] optional track width
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.insertTrack = function(track, index, trackWidth){};
    /**
     * @override
     * @inheritdoc
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.suspendUpdate = function(){};
    /**
     * @override
     * @inheritdoc
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.resumeUpdate = function(){};
    /**
     * Remove the track with headers and footers
     * @param {geotoolkit.welllog.LogTrack} track track to remove
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.removeTrack = function(track){};
    /**
     * Returns track options
     * @param {geotoolkit.welllog.LogTrack} track welllogtrack
     * @returns {?Object}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getTrackOptions = function(track){};
    /**
     * Sets track options
     * @param {geotoolkit.welllog.LogTrack} track log track
     * @param {Object} options track options
     * @param {string} [options.name] track name
     * @param {geotoolkit.welllog.TrackType|number} [options.type] track type
     * @param {boolean} [options.autolabelrotation] enable or disable automatic label rotation for index track
    
     * @param {Object} [options.index] track index grid settings, only available when track type is NOT IndexTrack
     * @param {Object} [options.index.major] track index grid major settings
     * @param {boolean} [options.index.major.visible] track index grid major visibility
     * @param {Object} [options.index.major.style] track index grid major line style
     * @param {Object} [options.index.minor] track index grid minor settings
     * @param {boolean} [options.index.minor.visible] track index grid minor visibility
     * @param {Object} [options.index.minor.style] track index grid minor line style
    
     * @param {Object} [options.value] track value grid settings, only available when track type is NOT IndexTrack
     * @param {number} [options.value.logstart] log start, only available when track type is LogTrack
     * @param {number} [options.value.logstop] log stop, only available when track type is LogTrack
     * @param {number} [options.value.logscale] log scale, only available when track type is LogTrack
     * @param {number} [options.value.logdecades] log decades, only available when track type is LogTrack
     * @param {Object} [options.value.major] track value grid major settings
     * @param {number} [options.value.major.increment] major increment, only available when track type is LinearTrack
     * @param {boolean} [options.value.major.visible] track value grid major visibility
     * @param {Object} [options.value.major.style] track value grid major line style
     * @param {Object} [options.value.minor] track value grid minor settings
     * @param {number} [options.value.minor.increment] minor increment, only available when track type is LinearTrack
     * @param {boolean} [options.value.minor.visible] track value grid minor visibility
     * @param {Object} [options.value.minor.style] track value grid minor line style
    
     * @param {Object} [options.block] block settings
     * @param {boolean} [options.block.visible] block visibility
     * @param {geotoolkit.welllog.LogBlock.Position} [options.block.position] block position
     * @param {Object} [options.axis] axis settings
     * @param {string} [options.axis.name] name of axis
     * @param {string} [options.axis.locale = 'en'] locale for tickgenerator of axis
     * @param {number} [options.axis.timezone=geotoolkit.axis.TimeZone.UTC] time zone for time axis
     * @param {number} [options.axis.timezoneoffset=0] time zone offset for date time axis
     * @returns {?geotoolkit.welllog.LogTrack}
     * @example
     * //The code to configure the gridlines in a log track, specify logdecades and generate multiple logticks
     *
     * widget.setTrackOptions(track, {
     * 'type:': geotoolkit.welllog.TrackType.LogTrack,
     * 'value': {
     * 'logstart': 0.2,
     * 'logdecades': 4
     *
     * }
     * });
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setTrackOptions = function(track, options){};
    /**
     * Updates layout(s)
     * @param {Array.<geotoolkit.scene.Node>} [targets] list of nodes to update layout
     * @param {boolean} [updateScrollBarState=false] update scroll bar flag
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.updateLayout = function(targets, updateScrollBarState){};
    /**
     * update Scroll Positions using visible limits and model limits.
     *
     * @param {boolean} [updateScrollBarState] update Scroll Positions using visible limits and model limits or not
     * @param {boolean} [enableAnimation=true] show animation
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.updateScrollPositions = function(updateScrollBarState, enableAnimation){};
    /**
     * @override
     * @param {string} event type of event
     * @param {geotoolkit.scene.Node} source source who called the event
     * @param {Object} args event arguments
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.notify = function(event, source, args){};
    /**
     * Update header
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.updateHeader = function(){};
    /**
     * Update footer
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.updateFooter = function(){};
    /**
     * Returns header container. Note that container's bounds are not necessary match with
     * its visible limits as it can reside in other container. To get/set device header size, use
     * get/set HeaderHeight() method
     * @returns {geotoolkit.welllog.HeaderContainer}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getHeaderContainer = function(){};
    /**
     * Returns footer container. Note that container's bounds are not necessary match with
     * its visible limits as it can reside in other container. To get/set device footer size, use
     * get/set FooterHeight() method
     * @returns {geotoolkit.welllog.HeaderContainer}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getFooterContainer = function(){};
    /**
     * @returns {geotoolkit.welllog.widgets.visuals.LogTrackContainer}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getTrackContainer = function(){};
    /**
     * Returns amount of tracks
     * @returns {number} amount of tracks
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getTracksCount = function(){};
    /**
     * Returns {geotoolkit.welllog.LogTrack} at specified index
     * @param {number} index index to return track at
     * @returns {geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getTrackAt = function(index){};
    /**
     * Returns track at specified position in plot coordinate
     * @param {number|geotoolkit.util.Point} x x coordinate position
     * @param {number} [y] y coordinate position
     * @returns {?geotoolkit.welllog.LogTrack}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getTrackAtPosition = function(x, y){};
    /**
     * Return index of track
     * @param {geotoolkit.welllog.LogTrack} track to get index
     * @returns {number} index of the track
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getTrackIndex = function(track){};
    /**
     * Send event 'updating' to update data. The event argument's
     * includes type, source, {'start,'end'}, where start and end is visible range
     * eventName : (WellLogWidget.Events.DataUpdating)
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.updateData = function(){};
    /**
     * Enumerate each visual in track container
     * @param {function()} callback callback method
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.forEachVisual = function(callback){};
    /**
     * Sets a new data model
     * @param {geotoolkit.data.DataSource|geotoolkit.data.DataTable|geotoolkit.data.DataTableView} data logdata
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setData = function(data){};
    /**
     * returns data source
     * @returns {geotoolkit.data.DataSource}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getData = function(){};
    /**
     * Return the data binding
     * @returns {geotoolkit.data.DataBinding|geotoolkit.data.DataBindingRegistry}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getDataBinding = function(){};
    /**
     * Sets the data binding
     * @param {geotoolkit.data.DataBinding|geotoolkit.data.DataBindingRegistry} binding data binding
     * @param {boolean} [silent=false] silent mode to forbid
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setDataBinding = function(binding, silent){};
    /**
     * Sets index unit
     * @param {geotoolkit.util.AbstractUnit|String} unit index unit
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setIndexUnit = function(unit){};
    /**
     * Gets index unit
     * @returns {string} unit
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getIndexUnit = function(){};
    /**
     * Sets device unit
     * @param {geotoolkit.util.AbstractUnit|String} unit device unit
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setDeviceUnit = function(unit){};
    /**
     * Gets device unit
     * @returns {String} unit
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getDeviceUnit = function(){};
    /**
     * Gets index type
     * @returns {string} type
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getIndexType = function(){};
    /**
     * Sets index type
     * @param {string} type index type
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setIndexType = function(type){};
    /**
     * Sets the same depth limits for all tracks
     *
     * @param {number | geotoolkit.util.Range} minIndex min index limit
     * @param {number} [maxIndex] max index limit
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     * @example
     * // full depth limits or scrollable limits of your widget can be set as follows:
     * widget.setDepthLimits(minDepth, maxDepth);
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setDepthLimits = function(minIndex, maxIndex){};
    /**
     * Returns depth range.
     * @returns {geotoolkit.util.Range}
     * @example
     * // In order to get difference between depths in px, you can get depth scale (or it can be time scale) from widget. Specify your depth unit and device unit 'px'. Then divide
     * // your depth range by scale and you get depth distance in pixels. See the following code:
     * var scale = widget.getDepthScale('m', 'px'); // meter to pixel
     * var size = widget.getDepthLimits().getSize() / scale;
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getDepthLimits = function(){};
    /**
     * Sets a depth scale factor.
     * @throws Will throw an error if the current scale is NaN
     * @param {number} scale A number of depth units in device unit.
     * @param {geotoolkit.util.AbstractUnit} [scaleUnit=null] scale unit of the display. if it is not specified then it takes from track container
     * @param {geotoolkit.util.AbstractUnit} [deviceUnit=null] device unit of the display. if it is not specified then it takes from track container
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     * @example
     * // To set depth scale range as a ratio, you can use units as follows
     * var unitFactory = geotoolkit.util.UnitFactory.getInstance();
     * widget.setDepthScale(30, unitFactory.getUnit('feet'), unitFactory.getUnit('inch')); //1 inch == 30 feet
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setDepthScale = function(scale, scaleUnit, deviceUnit){};
    /**
     * Return scale to device. How many scale units in one device unit.
     * @param {geotoolkit.util.AbstractUnit|string} [scaleUnit=null] scale unit of the display. if it is not specified then it takes from track container
     * @param {geotoolkit.util.AbstractUnit|string} [deviceUnit=null] device unit of the display. if it is not specified then it takes from track container
     * @returns {number} a index scale to device or NaN if scale if not available
     * @example
     * // to get the current depth scale of welllog widget.
     * var uf = geotoolkit.util.UnitFactory.getInstance();
     * WellLogWidget.getDepthScale(uf.getUnit('cm'), uf.getUnit('cm'));
     *
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getDepthScale = function(scaleUnit, deviceUnit){};
    /**
     * Change scale
     * @param {number} scaleY scaleY
     * @param {number} [scaleX = 1] scaleX
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.scale = function(scaleY, scaleX){};
    /**
     * Display the whole scene graph. Resets the zoom level/scale to fit the whole tracks height in the visible area
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.fitToHeight = function(){};
    /**
     * Resize widget width to fit it in visible area
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.fitToWidth = function(){};
    /**
     * Scroll to index position
     * @param {number} index index to scroll to
     * @param {geotoolkit.welllog.TrackContainer.ScrollToLocation} [position=geotoolkit.welllog.TrackContainer.ScrollToLocation.VISIBLE] position to scroll to
     * @param {boolean} [enableAnimation=true] show animation or not
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.scrollToIndex = function(index, position, enableAnimation){};
    /**
     * Set track width and layout remains track
     * @param {number} width track width
     * @param {geotoolkit.welllog.LogTrack | Array} track track to change track width
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     * @example
     * // To change tracks' size manually using method WellLogWidget.setTrackWidth:
     * widgets.setTrackWidth(width,track);
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setTrackWidth = function(width, track){};
    /**
     * Returns the track header if it exists
     * @param {geotoolkit.welllog.LogTrack} track current welllog track
     * @returns {*}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getTrackHeader = function(track){};
    /**
     * Returns the track footer if it exists
     * @param {geotoolkit.welllog.LogTrack} track current welllog track
     * @returns {*}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getTrackFooter = function(track){};
    /**
     * change highlight linestyle
     * @param {geotoolkit.attributes.LineStyle} linestyle highlight linestyle
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setHighlightLineStyle = function(linestyle){};
    /**
     * get border highlight line style
     * @returns {geotoolkit.attributes.LineStyle | null} border line style for the track in 'highlighted' mode
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getHighlightLineStyle = function(){};
    /**
     * change highlight fillstyle
     * @param {geotoolkit.attributes.FillStyle} fillstyle highlight fillstyle
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setHighlightFillStyle = function(fillstyle){};
    /**
     * get track highlight fillstyle
     * @returns {geotoolkit.attributes.FillStyle | null} track background highlight fillstyle
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getHighlightFillStyle = function(){};
    /**
     * Calculate a real size of tracks
     * @returns {number} total width of the tracks
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getTracksSize = function(){};
    /**
     * Sets node filter for selection tool
     * @param {function} nodeFilter filter that allows to filter selected nodes.
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setNodeFilter = function(nodeFilter){};
    /**
     * Exports the widget content as a PDF file, user has option to select the scale of track in pdf.
     * @param {object} [options=null] option to specify paper parameters and header and footer
     * @param {geotoolkit.scene.exports.HeaderComponent} [options.header = null] an optional PDF header
     * @param {geotoolkit.scene.exports.FooterComponent} [options.footer = null] an optional PDF footer
     * @param {geotoolkit.scene.exports.HeaderComponent} [options.documentheader= null] an optional document PDF header
     * @param {geotoolkit.scene.exports.FooterComponent} [options.documentfooter= null] an optional document PDF footer
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
     * @param {object} [options.limits] export depth or time limits
     * @param {object} [options.limits.start] start limit by default visible limits
     * @param {object} [options.limits.end] end limit by default visible limits
     * @param {?number} [options.scale] export scale from model index unit to pixels by default as is
     * @param {string} [options.deviceunit='px'] define how many depth units in one device unit.
     * @param {number} [options.imagescalefactor] options to specify the image scale factor, right now 8 is maximum, Math.floor(600 / 72)
     * @param {object} [options.imagecompression] options to specify the image compression
     * @param {geotoolkit.pdf.ImageCompression} [options.imagecompression.mode=geotoolkit.pdf.ImageCompression.AUTO] image compression method used to exporting pdf.
     * @param {number} [options.imagecompression.quality=1] quality range from 0 to 1 that will express the jpeg image compression quality, available for jpeg mode only.
     * @param {geotoolkit.pdf.SpeedCompression} [options.imagecompression.speed=geotoolkit.pdf.SpeedCompression.MEDIUM] speed referring to the png compression speed, available for png mode only.
     * @param {boolean} [options.streamcompression=true] enable or disable pdf output compression
     * @param {geotoolkit.util.stream.Stream} [options.pdfstream = null] optional user-customized Stream object
     * @returns {geotoolkit.util.Promise}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.exportToPdf = function(options){};
    /**
     * Prepares object before exporting and saving state
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.beginExport = function(){};
    /**
     * Used to restore object's state after exporting
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.endExport = function(){};
    /**
     * Return export depth limits
     * @returns {geotoolkit.util.Range}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getExportDepthLimits = function(){};
    /**
     * Sets export depth limits
     * @param {geotoolkit.util.Range} limits export limits
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setExportDepthLimits = function(limits){};
    /**
     * Return export depth scale
     * @returns {number}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getExportDepthScale = function(){};
    /**
     * Sets export depth scale
     * @param {number} scale depth scale
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setExportDepthScale = function(scale){};
    /**
     * Returns exportable element
     * @param {object} [options] export options
     * @param {geotoolkit.scene.exports.HeaderComponent} [options.documentheader= null] an optional document PDF header
     * @param {geotoolkit.scene.exports.FooterComponent} [options.documentfooter= null] an optional document PDF footer
     * @returns {geotoolkit.scene.exports.AbstractDocumentElement} return exportable element
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getExportElement = function(options){};
    /**
     * Load template
     * @param {string} template template to be applied to the widget
     * @param {geotoolkit.persistence.Registry} [registry=geotoolkit.welllog.widgets.persistence.Registry] registry
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.loadTemplate = function(template, registry){};
    /**
     * Save template
     * @param {geotoolkit.persistence.Registry} [registry=geotoolkit.welllog.widgets.persistence.Registry] registry
     * @returns {string} return template as a string
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.saveTemplate = function(registry){};
    /**
     * set widget orientation and apply rotation if needed.
     *
     * @param {geotoolkit.util.Orientation} mode widget orientation mode
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setOrientation = function(mode){};
    /**
     * Sets bounds of the node in the parent coordinates
     *
     * @param {geotoolkit.util.Rect | object} bounds
     * bound of the node in the parent coordinates
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setBounds = function(bounds){};
    /**
     * Sets the model limits of the node
     *
     * @param {geotoolkit.util.Rect | object} modelLimits The model limits of the node
     * @returns {geotoolkit.welllog.widgets.WellLogWidget} this
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setModelLimits = function(modelLimits){};
    /**
     * Returns widget orientation mode
     * @returns {geotoolkit.util.Orientation} widget orientation mode
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getOrientation = function(){};
    /**
     * Sets all the properties pertaining to this object {@link geotoolkit.welllog.widgets.WellLogWidget#setOptions}
     * @param {object} properties An object containing the properties to set
     * @param {string} [properties.indextype] primary index types
     * @param {string} [properties.indexunit] primary index unit
     * @param {string} [properties.deviceunit] primary device unit
     * @returns {geotoolkit.welllog.widgets.WellLogWidget}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.setProperties = function(properties){};
    /**
     * Gets all the properties pertaining to this object
     * @returns {*}
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.getProperties = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.welllog.widgets.WellLogWidget.prototype.dispose = function(){};

/**
 * Creates default implementation of the welllog annotation overlay
 * @class geotoolkit.welllog.widgets.overlays.AnnotationOverlay
 * @augments geotoolkit.widgets.overlays.AnnotationOverlay
 * @param {geotoolkit.welllog.widgets.WellLogWidget} widget
 */
geotoolkit.welllog.widgets.overlays.AnnotationOverlay = {};
    /**
     * Disposes this node, once disposes a node should not be used anymore.<br>
     * Clear all listeners, and disconnect styles to avoid memory leaks.<br>
     * Also aggressively 'cleanup' this node by setting some of its members to null.
     */
    geotoolkit.welllog.widgets.overlays.AnnotationOverlay.prototype.dispose = function(){};
    /**
     * @protected
     */
    geotoolkit.welllog.widgets.overlays.AnnotationOverlay.prototype.initializeTools = function(){};
    /**
     * @protected
     * @returns {geotoolkit.scene.Group}
     */
    geotoolkit.welllog.widgets.overlays.AnnotationOverlay.prototype.getModel = function(){};

/**
 * The implementation of the default serializer registry for WellLogWidgets
 *
 * @class geotoolkit.welllog.widgets.persistence.Registry
 * @augments geotoolkit.persistence.Registry
 */
geotoolkit.welllog.widgets.persistence.Registry = {};
    /**
     * Return instance of the default registry
     * @returns {geotoolkit.welllog.widgets.persistence.Registry} registry
     */
    geotoolkit.welllog.widgets.persistence.Registry.getInstance = function(){};

