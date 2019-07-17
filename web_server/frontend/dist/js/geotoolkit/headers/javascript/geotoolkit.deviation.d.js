/**
 * API to facilitate the implementation of deviated wells
 * @namespace */
geotoolkit.deviation = {};
    /**
     * Enumerated label positions
     * @enum
     * @readonly
     */
    geotoolkit.deviation.LabelPosition = {};
        /**
         * Left
         * @type {string}
         */
        geotoolkit.deviation.LabelPosition.Left = "";
        /**
         * Center
         * @type {string}
         */
        geotoolkit.deviation.LabelPosition.Center = "";
        /**
         * Right
         * @type {string}
         */
        geotoolkit.deviation.LabelPosition.Right = "";

/**
 * API defining tools used in deviation representation
 * @namespace */
geotoolkit.deviation.tools = {};

/**
 * Abstract class to represent nonaffine transformation from a linear 2D-space to a deviated space.
 * @class geotoolkit.deviation.DeviatedTransformation
 */
geotoolkit.deviation.DeviatedTransformation = {};
    /**
     * Updates itself
     * @function
     * @abstract
     * @param {geotoolkit.util.Transformation} transformation context transformation
     * @returns {boolean}
     */
    geotoolkit.deviation.DeviatedTransformation.prototype.update = function(transformation){};
    /**
     * Transforms point from linear to deviated space
     * @function
     * @abstract
     * @param {geotoolkit.util.Point} point point to transform
     * @returns {geotoolkit.util.Point} transformed point
     */
    geotoolkit.deviation.DeviatedTransformation.prototype.transform = function(point){};
    /**
     * Transforms point from deviated to linear space
     * @function
     * @abstract
     * @param {geotoolkit.util.Point} point point to transform
     * @returns {geotoolkit.util.Point} transformed point
     */
    geotoolkit.deviation.DeviatedTransformation.prototype.inverseTransform = function(point){};
    /**
     * Transforms line from linear to deviated space
     * @function
     * @abstract
     * @param {geotoolkit.util.Point} start start point
     * @param {geotoolkit.util.Point} end end point
     * @param {Array<geotoolkit.util.Point>} destination destination polyline's array
     */
    geotoolkit.deviation.DeviatedTransformation.prototype.transformLine = function(start, end, destination){};
    /**
     * Transforms polyline (or polygon) from linear to deviated space
     * @function
     * @abstract
     * @param {Array<geotoolkit.util.Point>} points source polyline's (or polygon's) points
     * @param {Array<geotoolkit.util.Point>} destination destination polyline's (or polygon's) array
     * @param {geotoolkit.util.Transformation} transformation context transformation
     * @param {boolean} isClosed isclosed flag
     */
    geotoolkit.deviation.DeviatedTransformation.prototype.transformLines = function(points, destination, transformation, isClosed){};
    /**
     * Gets bounds in linear space corresponding to deviated rect
     * @function
     * @abstract
     * @param {geotoolkit.util.Rect} rect rectangular area in deviated space
     * @returns {geotoolkit.util.Rect} bounds in linear space (if found); empty rectangle otherwise
     */
    geotoolkit.deviation.DeviatedTransformation.prototype.findBounds = function(rect){};
    /**
     * Checks if a canvas point is contained in the deviated area
     * @function
     * @abstract
     * @param {geotoolkit.util.Point} point point in canvas CS
     * @returns {boolean}
     */
    geotoolkit.deviation.DeviatedTransformation.prototype.contains = function(point){};
    /**
     * Gets x-scale at the point
     * @function
     * @abstract
     * @param {geotoolkit.util.Point} point point to transform
     * @returns {number}
     */
    geotoolkit.deviation.DeviatedTransformation.prototype.scaleXAt = function(point){};
    /**
     * Gets y-scale at the point
     * @function
     * @abstract
     * @param {geotoolkit.util.Point} point point to transform
     * @returns {number}
     */
    geotoolkit.deviation.DeviatedTransformation.prototype.scaleYAt = function(point){};
    /**
     * @function
     * @abstract
     * @returns {number}
     */
    geotoolkit.deviation.DeviatedTransformation.prototype.bitmapScaleY = function(){};
    /**
     * Gets scale statistics
     * @function
     * @returns {object} statistics
     * @returns {number} statistics.xMin min x-scale
     * @returns {number} statistics.yMin min y-scale
     * @returns {number} statistics.xMean mean square x-scale
     * @returns {number} statistics.yMean mean square y-scale
     * @returns {number} statistics.xMax max x-scale
     * @returns {number} statistics.yMax max y-scale
     */
    geotoolkit.deviation.DeviatedTransformation.prototype.getScalesInfo = function(){};

/**
* 2D-transformer abstraction
* @class geotoolkit.deviation.Transformer2d
*/
geotoolkit.deviation.Transformer2d = {};
    /**
     * Creates DeviatedTransformation
     * @function
     * @abstract
     * @param {object} deviationContext deviation context
     * @param {geotoolkit.deviation.Trajectory2d} deviationContext.trajectory trajectory along the path
     * @param {number} deviationContext.trackWidth width of the track in pixels
     * @param {number} deviationContext.offset offset to the trajectory segment in pixels
     * @param {geotoolkit.util.Transformation} transformation affine transformation applied
     * @returns {geotoolkit.deviation.DeviatedTransformation}
     */
    geotoolkit.deviation.Transformer2d.prototype.create = function(deviationContext, transformation){};

/**
* TVDTransformer implementation
* @class geotoolkit.deviation.TVDTransformer
* @augments geotoolkit.deviation.Transformer2d
* @param {object} [options] see setOptions for detailed info
*/
geotoolkit.deviation.TVDTransformer = {};
    /**
     * Gets options
     * NOTE: copy of options is created and returned.
     * @returns {object} options
     */
    geotoolkit.deviation.TVDTransformer.prototype.getOptions = function(){};
    /**
     * Sets options
     * @param {object} [options]
     * @param {boolean} [options.scaleWidth==false] should transformer scale track's width on zooming?
     * @param {number} [options.minWidth==-Number.MAX_VALUE] minimum width of track for scaling
     * @param {number} [options.maxWidth==Number.MAX_VALUE] maximum width of track for scaling
     * @param {number} [options.widthScaleX==1] default scale by x position
     */
    geotoolkit.deviation.TVDTransformer.prototype.setOptions = function(options){};
    /**
     * Creates a deviated transformation
     * @param {object} transformerContext transformer context
     * @param {geotoolkit.deviation.Trajectory2d} transformerContext.trajectory trajectory along the path
     * @param {geotoolkit.util.Transformation} transformation transformation applied
     * @returns {geotoolkit.deviation.DeviatedTransformation} transformation created
     */
    geotoolkit.deviation.TVDTransformer.prototype.create = function(transformerContext, transformation){};

/**
 * The class PiecewiseTransformer is an implementation of Transformer2D. It transforms the actual geometry by applying the deviation. Trajectory's measured depth values are equal to the original 2D-spaces's Y-values.
 * @class geotoolkit.deviation.PiecewiseTransformer
 * @augments geotoolkit.deviation.Transformer2d
 * @param {object} [options] see {@link geotoolkit.deviation.PiecewiseTransformer#setOptions} for detailed info
 */
geotoolkit.deviation.PiecewiseTransformer = {};
    /**
     * Gets options
     * NOTE: copy of options is created and returned.
     * @returns {object} options
     */
    geotoolkit.deviation.PiecewiseTransformer.prototype.getOptions = function(){};
    /**
     * Sets options. The default is the current state of the object.
     * @param {object} [options] options
     * @param {boolean} [options.joinSegments=true] If this is true then approximation is applied to the segment and a smooth transformation is created between two linear segments.
     * @param {boolean} [options.scaleWidth=false] Defines if transformer can scale track's width on zooming, by default(=False) the transformer keeps the scale width same on zoom.
     * @param {number} [options.minWidth=-Number.MAX_VALUE] minimum width of track for scaling on zoom
     * @param {number} [options.maxWidth=Number.MAX_VALUE] maximum width of track for scaling on zoom
     * @param {number} [options.widthScaleX=1] default scale by x position
     * @param {number} [options.widthScaleY=1] default scale by y position
     * @param {number} [options.approxThreshold=0.5] approximation threshold for trajectory points in pixels. It is the maximum distance of the original stations from the approximated path.
     * @param {number} [options.approxThresholdMd] approximation trajectory for measured depths in measured depth units. if it is not specified
     * then equals to options.approxThreshold
     * @returns {geotoolkit.deviation.PiecewiseTransformer} this
     */
    geotoolkit.deviation.PiecewiseTransformer.prototype.setOptions = function(options){};
    /**
     * Creates a deviated transformation
     * @function
     * @param {object} transformerContext transformer context
     * @param {geotoolkit.deviation.Trajectory2d} transformerContext.trajectory trajectory along the path
     * @param {number} transformerContext.trackWidth width of the track in pixels
     * @param {number} [transformerContext.offset=0] offset in pixels to the trajectory segment
     * @param {geotoolkit.util.Transformation} transformation affine transformation applied
     * @returns {geotoolkit.deviation.DeviatedTransformation} transformation created
     */
    geotoolkit.deviation.PiecewiseTransformer.prototype.create = function(transformerContext, transformation){};

/**
* Class Trajectory2d is used to define trajectory and it provides coordinates of each point along the planned well path.
* Trajectory contains MD- (measured depth), X- and Y-coordinates along itself.<br>
* If measured depth is not provided it is calculated from 0 along the path.
* @class geotoolkit.deviation.Trajectory2d
* @param {Array.<number>} x x-coordinate of the transformed stations
* @param {Array.<number>} y y-coordinate of the transformed stations
* @param {Array.<number>} [d] d-measured depths array for each station
* @param {number} [minDepth] calculated minimal MD
* @param {number} [maxDepth] calculated maximal MD
* @param {boolean} [approximate=true] flag set to enable approximation of the trajectory along the path
*/
geotoolkit.deviation.Trajectory2d = {};
    /**
     * Gets x-value at specified position
     * @param {number} index index of the station
     * @returns {number} value if found; "undefined" otherwise
     */
    geotoolkit.deviation.Trajectory2d.prototype.getX = function(index){};
    /**
     * Gets y-value at specified position
     * @param {number} index index of the station
     * @returns {number} value if found; "undefined" otherwise
     */
    geotoolkit.deviation.Trajectory2d.prototype.getY = function(index){};
    /**
     * Gets MD-value at specified position
     * @param {number} index index of the station
     * @returns {number} value if found; "undefined" otherwise
     */
    geotoolkit.deviation.Trajectory2d.prototype.getDepth = function(index){};
    /**
     * Gets number of stations in the trajectory
     * @returns {number} number of stations
     */
    geotoolkit.deviation.Trajectory2d.prototype.count = function(){};
    /**
     * Gets calculated minimal MD
     * @returns {number} minimal MD
     */
    geotoolkit.deviation.Trajectory2d.prototype.minDepth = function(){};
    /**
     * Gets calculated maximal MD
     * @returns {number} maximal MD
     */
    geotoolkit.deviation.Trajectory2d.prototype.maxDepth = function(){};
    /**
     * Creates trajectory from arrays of measured depths,inclinations and azimuths.
     *
     * @param {Array.<number>} md an array of the measured depth, which defines trajectory
     * @param {Array.<number>} inclination an array of the inclinations in degrees
     * @param {Array.<number>} azimuth an array of azimuths. (not used now)
     * @param {boolean} rightDeviation defines right or left direction of the deviation
     * @param {number} [start=0] start index
     * @param {boolean} [filter=true] if true, perform filtering of redundant points.
     * Removes any points, which could be removed safely, keeping the trajectory geometry and measured depth binding:<br>
     * 1. If two points have the same coordinates, it keeps the second point only <br>
     * 2. If two points have the same MD value, it keeps the second point only <br>
     * 3. If three points belong to a same line in a natural order (i.e. second point positioned between 1st and 3rd),<br>
     * and MD value of middle point corresponds to the point position, it removes the middle point<br>
     * NOTE: The rules are applied recursively
     * @param {boolean} [approximate=true] flag set to enable approximation of the trajectory along the path
     *
     * @returns {geotoolkit.deviation.Trajectory2d} trajectory
     */
    geotoolkit.deviation.Trajectory2d.createTrajectory = function(md, inclination, azimuth, rightDeviation, start, filter, approximate){};
    /**
     * Gets calculated minimal x-value (convenience method)
     * @returns {number}
     */
    geotoolkit.deviation.Trajectory2d.prototype.getMinX = function(){};
    /**
     * Gets calculated minimal y-value (convenience method)
     * @returns {number}
     */
    geotoolkit.deviation.Trajectory2d.prototype.getMinY = function(){};
    /**
     * Gets calculated maximal x-value (convenience method)
     * @returns {number}
     */
    geotoolkit.deviation.Trajectory2d.prototype.getMaxX = function(){};
    /**
     * Gets calculated maximal y-value (convenience method)
     * @returns {number}
     */
    geotoolkit.deviation.Trajectory2d.prototype.getMaxY = function(){};

/**
 * This class extends the composite node class to accept deviation (trajectory). This is only a container which allows to deviate a track when the trajectory is provided to it.<br>
 * The method setDeviation described below sets the trajectory along the path. 'trajectory' is the only mandatory parameter; 'transformer', 'trackWidth' and 'offset' are optional.<br>
 * The following code shows how to deviate a trackcontainer.
 * @example
 * // Create plot
 * var plot = new geotoolkit.plot.Plot({...});
 * // Create TrackContainer and fill it in:
 * var trackContainer = new geotoolkit.welllog.TrackContainer()
 * .addChild([...]);
 * // Create trajectory:
 * var trajectory = new geotoolkit.deviation.Trajectory2d(...);
 * // Deviation options:
 * var deviation = {
 * 'trajectory': trajectory,
 * 'trackWidth': deviatedTrackWidth,
 * 'offset': deviatedTrackOffset };
 * // Create deviated node, set the options:
 * var deviatedNode = new geotoolkit.scene.DeviatedCompositeNode()
 * .setDeviation(deviation);
 * // Deviate the track container:
 * deviatedNode.addChild(trackContainer);
 * // Set the deviated node as a root one:
 * plot.setRoot(deviatedNode);
 * @class geotoolkit.scene.DeviatedCompositeNode
 * @augments geotoolkit.scene.CompositeNode
 */
geotoolkit.scene.DeviatedCompositeNode = {};
    /**
     * DeviatedCompositeNode's Events enumerator
     * @readonly
     * @enum
     */
    geotoolkit.scene.DeviatedCompositeNode.Events = {};
        /**
         * Event type fired when the deviation changes
         * @type {string}
         */
        geotoolkit.scene.DeviatedCompositeNode.Events.DeviationChanged = "";
    /**
     * Adds event listener
     * @param {string} eventName name of the event
     * @param {function()} listener event listener
     * @returns {geotoolkit.scene.DeviatedCompositeNode}
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.addListener = function(eventName, listener){};
    /**
     * Removes event listener
     * @param {string} eventName event name
     * @param {function()} listener event listener
     * @returns {geotoolkit.scene.DeviatedCompositeNode}
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.removeListener = function(eventName, listener){};
    /**
     * @protected
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.onDeviationChanged = function(){};
    /**
     * Sets deviation options. Fires 'onDeviationChanged' event.
     *
     * @param {?object} options deviation options
     * @param {geotoolkit.deviation.Trajectory2d} options.trajectory trajectory along the path
     * @param {geotoolkit.deviation.Transformer2d} [options.transformer= new geotoolkit.deviation.PiecewiseTransformer] transformer to be used
     * @param {number} [options.trackWidth=100] track width
     * @param {number} [options.offset=0] offset in pixels to the trajectory segment
     * @param {number} [options.clip=true] flag to enable clipping
     * @returns {geotoolkit.scene.DeviatedCompositeNode} this
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.setDeviation = function(options){};
    /**
     * Gets deviation options (see "setDeviation" method for options description).
     * @returns {?object} options
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.getDeviation = function(){};
    /**
     * Gets actual (there: non-deviated) model limits
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.getModelLimits = function(){};
    /**
     * Gets the node's bounds if set; trajectory limits otherwise
     * @returns {geotoolkit.util.Rect}
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.getBounds = function(){};
    /**
     * Sets bounds of the node in the parent coordinates
     * @param {geotoolkit.util.Rect | object} bounds bound of the node in the parent coordinates
     * @returns {geotoolkit.scene.DeviatedCompositeNode} this
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.setBounds = function(bounds){};
    /**
     * Gets trajectory limits if deviation (trajectory) is set; "null" otherwise
     * @returns {?geotoolkit.util.Rect}
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.getTrajectoryLimits = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.updateState = function(){};
    /**
     * Transformation of inner contents (i.e. trajectory limits) to bounds
     * @returns {geotoolkit.util.Transformation}
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.getContentsTransform = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.invalidateParent = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.checkCollision = function(){};
    /**
     * @inheritdoc
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.render = function(){};
    /**
     * Computes the deviated node's depth range corresponding to its parent's rect area (if any)
     * @param {!geotoolkit.util.Rect} parentRect Rect for which to compute the depth
     * @param {?geotoolkit.util.Range} outRange optional parameter used to return range
     * @returns {?geotoolkit.util.Range} the node's depth range if found; "null" otherwise
     */
    geotoolkit.scene.DeviatedCompositeNode.prototype.findDepthRange = function(parentRect, outRange){};

/**
 * AbstractDeviationTool
 * @class geotoolkit.deviation.tools.DeviationTool
 * @augments geotoolkit.controls.tools.AbstractTool
 * @param {object} options see {@link geotoolkit.controls.tools.AbstractTool} for details
 */
geotoolkit.deviation.tools.DeviationTool = {};

/**
 * MDCursorEventArgs
 *
 * @class geotoolkit.deviation.tools.MDCursorEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs information about the event arguments
 * @param {?geotoolkit.util.Point} inner model position ("null" when undefined)
 */
geotoolkit.deviation.tools.MDCursorEventArgs = {};
    /**
     * Gets inner model position
     * @returns {?geotoolkit.util.Point} inner model position ("x" - value, "y" - measured depth)
     */
    geotoolkit.deviation.tools.MDCursorEventArgs.prototype.getPosition = function(){};

/**
 * Toonlname: MD-cursortool
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
 * <td>MDCursorTool.Events.onPositionChanged</td>
 * <td>geotoolkit.deviation.tools.MDCursorEventArgs</td>
 * <td>The event gets fired when the MDCursorTool's mouse position is changed</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>
 * @class geotoolkit.deviation.tools.MDCursorTool
 * @augments geotoolkit.deviation.tools.DeviationTool
 * @param {geotoolkit.scene.Group|geotoolkit.scene.Layer} manipulatorLayer layer to display temporary shapes
 * @param {string} [name == 'MD-cursor'] name of the tool
 */
geotoolkit.deviation.tools.MDCursorTool = {};
    /**
     * MDCursorTool Events
     * @enum
     * @readonly
     */
    geotoolkit.deviation.tools.MDCursorTool.Events = {};
        /**
         * onPositionChanged
         * @type {string}
         */
        geotoolkit.deviation.tools.MDCursorTool.Events.onPositionChanged = "";
    /**
     * @protected
     */
    geotoolkit.deviation.tools.MDCursorTool.prototype.onActiveStateChanged = function(){};
    /**
     * @param {Object} settings settings
     *
     * @param {boolean} settings.enabled enabled
     *
     * @param {object} settings.line JSON for line.
     * @param {object | geotoolkit.attributes.LineStyle} [settings.line.linestyle] Linestyle
     * @param {boolean} [settings.line.visible] visibility
     *
     * @param {object} settings.label JSON for label.
     * @param {object | geotoolkit.attributes.TextStyle} [settings.label.textstyle] textstyle
     * @param {boolean} [settings.label.visible] visibility
     * @param {function} [settings.label.textconverter] strategy to convert x,y to text
     * @param {geotoolkit.deviation.LabelPosition} [settings.label.position] label position
     *
     * @returns {geotoolkit.deviation.tools.MDCursorTool} this
     */
    geotoolkit.deviation.tools.MDCursorTool.prototype.setSettings = function(settings){};
    /**
     * Updates cursor position
     */
    geotoolkit.deviation.tools.MDCursorTool.prototype.update = function(){};

/**
 * Tool name: 'MD-rubberband'
 * @class geotoolkit.deviation.tools.MDRubberBandEventArgs
 * @augments geotoolkit.controls.tools.ProxyEventArgs
 * @param {geotoolkit.controls.tools.EventArgs} eventArgs
 * @param {object} options
 * @param {geotoolkit.util.Rect} [options.area] selected parent model area (used with RubberBand.Events.onZoomEnd event)
 * @param {number} [options.startmd] start MD-value (used with RubberBand.Events.onZoomStart and RubberBand.Events.onRangeChanged events)
 * @param {number} [options.endmd] end MD-value (used with RubberBand.Events.onRangeChanged event)
 */
geotoolkit.deviation.tools.MDRubberBandEventArgs = {};
    /**
     * Gets start MD-value
     * @returns {number} start MD-value
     */
    geotoolkit.deviation.tools.MDRubberBandEventArgs.prototype.getStartMD = function(){};
    /**
     * Gets end MD-value
     * @returns {number} end MD-value
     */
    geotoolkit.deviation.tools.MDRubberBandEventArgs.prototype.getEndMD = function(){};
    /**
     * Gets selected area in parent model coordinates
     * @returns {?geotoolkit.util.Rect} selected area
     */
    geotoolkit.deviation.tools.MDRubberBandEventArgs.prototype.getArea = function(){};

/**
 * Tool name: MD-rubberband
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
 * <td>RubberBand.Events.onZoomStart</td>
 * <td>MDRubberBandEventArgs</td>
 * <td>Fired when left mousedown is processed</td>
 * </tr>
 * <tr>
 * <td>RubberBand.Events.onZoomEnd</td>
 * <td>MDRubberBandEventArgs</td>
 * <td>Fired when left mouseup is processed</td>
 * </tr>
 * <tr>
 * <td>RubberBand.Events.onRangeChanged</td>
 * <td>MDRubberBandEventArgs</td>
 * <td>Fired when mousemove is processed</td>
 * </tr>
 * <tbody>
 * </table>
 * <br>*
 * @class geotoolkit.deviation.tools.MDRubberBand
 * @augments geotoolkit.deviation.tools.DeviationTool
 * @param {geotoolkit.scene.Group | geotoolkit.scene.Layer} manipulatorLayer manipulator layer (or group)
 * @param {geotoolkit.deviation.tools.MDRubberBand.Mode} [mode=geotoolkit.deviation.tools.MDRubberBand.Mode.MD] operating mode
 */
geotoolkit.deviation.tools.MDRubberBand = {};
    /**
     * Enum of MD-rubberband selection modes
     * @enum
     * @readonly
     */
    geotoolkit.deviation.tools.MDRubberBand.Mode = {};
        /**
         * MD-range is being selected along trajectory within deviated track width
         * @type {string}
         */
        geotoolkit.deviation.tools.MDRubberBand.Mode.MD = "";
        /**
         * MD-range to zoom to is calculated as intersection of the deviated track
         * and "regular" selection rectangle
         * @type {string}
         */
        geotoolkit.deviation.tools.MDRubberBand.Mode.XY = "";
    /**
     * Sets options
     * @param {object} [options] JSON containing options
     * @param {boolean} [options.enabled] is rubber band enabled
     * @param {object | geotoolkit.attributes.LineStyle} [options.linestyle] rubber band linestyle
     * @param {object | geotoolkit.attributes.FillStyle} [options.fillstyle] rubber band fillstyle
     * @param {boolean} [options.autodisabled] does rubber band automatically disabled on zoom end
     * @returns {geotoolkit.deviation.tools.MDRubberBand} this
     */
    geotoolkit.deviation.tools.MDRubberBand.prototype.setOptions = function(options){};

