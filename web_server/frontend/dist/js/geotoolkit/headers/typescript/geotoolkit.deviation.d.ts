declare module geotoolkit {
    module deviation {
        /**
         * Enumerated label positions
         */
        var LabelPosition: any;
        /**
         * Abstract class to represent nonaffine transformation from a linear 2D-space to a deviated space.
         */
        class DeviatedTransformation {
            /**
             * Abstract class to represent nonaffine transformation from a linear 2D-space to a deviated space.
             */
            constructor();
            /**
             * Updates itself
             * @param transformation  (Required) context transformation
             */
            update(transformation: geotoolkit.util.Transformation): boolean;
            /**
             * Transforms point from linear to deviated space
             * @param point  (Required) point to transform
             */
            transform(point: geotoolkit.util.Point): geotoolkit.util.Point;
            /**
             * Transforms point from deviated to linear space
             * @param point  (Required) point to transform
             */
            inverseTransform(point: geotoolkit.util.Point): geotoolkit.util.Point;
            /**
             * Transforms line from linear to deviated space
             * @param start  (Required) start point
             * @param end  (Required) end point
             * @param destination  (Required) destination polyline's array
             */
            transformLine(start: geotoolkit.util.Point, end: geotoolkit.util.Point, destination: geotoolkit.util.Point[]): any;
            /**
             * Transforms polyline (or polygon) from linear to deviated space
             * @param points  (Required) source polyline's (or polygon's) points
             * @param destination  (Required) destination polyline's (or polygon's) array
             * @param transformation  (Required) context transformation
             * @param isClosed  (Required) isclosed flag
             */
            transformLines(points: geotoolkit.util.Point[], destination: geotoolkit.util.Point[], transformation: geotoolkit.util.Transformation, isClosed: boolean): any;
            /**
             * Gets bounds in linear space corresponding to deviated rect
             * @param rect  (Required) rectangular area in deviated space
             */
            findBounds(rect: geotoolkit.util.Rect): geotoolkit.util.Rect;
            /**
             * Checks if a canvas point is contained in the deviated area
             * @param point  (Required) point in canvas CS
             */
            contains(point: geotoolkit.util.Point): boolean;
            /**
             * Gets x-scale at the point
             * @param point  (Required) point to transform
             */
            scaleXAt(point: geotoolkit.util.Point): number;
            /**
             * Gets y-scale at the point
             * @param point  (Required) point to transform
             */
            scaleYAt(point: geotoolkit.util.Point): number;
            /**
             */
            bitmapScaleY(): number;
            /**
             * Gets scale statistics
             */
            getScalesInfo(): {statistics:{xMin:number;yMin:number;xMean:number;yMean:number;xMax:number;yMax:number}}|any;
        }
        /**
         * 2D-transformer abstraction
         */
        class Transformer2d {
            /**
             * 2D-transformer abstraction
             */
            constructor();
            /**
             * Creates DeviatedTransformation
             * @param deviationContext  (Required) deviation context
             * @param deviationContext.trajectory  (Required) trajectory along the path
             * @param deviationContext.trackWidth  (Required) width of the track in pixels
             * @param deviationContext.offset  (Required) offset to the trajectory segment in pixels
             * @param transformation  (Required) affine transformation applied
             */
            create(deviationContext: any | { trajectory?: geotoolkit.deviation.Trajectory2d; trackWidth?: number; offset?: number; } , transformation?: geotoolkit.util.Transformation): geotoolkit.deviation.DeviatedTransformation;
        }
        /**
         * TVDTransformer implementation
         */
        class TVDTransformer extends geotoolkit.deviation.Transformer2d {
            /**
             * TVDTransformer implementation
             * @param options  (Optional) see setOptions for detailed info
             */
            constructor(options?: any);
            /**
             * Gets options
             * NOTE: copy of options is created and returned.
             */
            getOptions(): any;
            /**
             * Sets options
             * @param options  (Optional) 
             * @param options.scaleWidth  (Optional) should transformer scale track's width on zooming?
             * @param options.minWidth  (Optional) minimum width of track for scaling
             * @param options.maxWidth  (Optional) maximum width of track for scaling
             * @param options.widthScaleX  (Optional) default scale by x position
             */
            setOptions(options?: any | { scaleWidth?: boolean; minWidth?: number; maxWidth?: number; widthScaleX?: number; } ): any;
            /**
             * Creates a deviated transformation
             * @param transformerContext  (Required) transformer context
             * @param transformerContext.trajectory  (Required) trajectory along the path
             * @param transformation  (Required) transformation applied
             */
            create(transformerContext: any | { trajectory?: geotoolkit.deviation.Trajectory2d; } , transformation?: geotoolkit.util.Transformation): geotoolkit.deviation.DeviatedTransformation;
        }
        /**
         * The class PiecewiseTransformer is an implementation of Transformer2D. It transforms the actual geometry by applying the deviation. Trajectory's measured depth values are equal to the original 2D-spaces's Y-values.
         */
        class PiecewiseTransformer extends geotoolkit.deviation.Transformer2d {
            /**
             * The class PiecewiseTransformer is an implementation of Transformer2D. It transforms the actual geometry by applying the deviation. Trajectory's measured depth values are equal to the original 2D-spaces's Y-values.
             * @param options  (Optional) see {@link geotoolkit.deviation.PiecewiseTransformer#setOptions} for detailed info
             */
            constructor(options?: any);
            /**
             * Gets options
             * NOTE: copy of options is created and returned.
             */
            getOptions(): any;
            /**
             * Sets options. The default is the current state of the object.
             * @param options  (Optional) options
             * @param options.joinSegments  (Optional) If this is true then approximation is applied to the segment and a smooth transformation is created between two linear segments.
             * @param options.scaleWidth  (Optional) Defines if transformer can scale track's width on zooming, by default(=False) the transformer keeps the scale width same on zoom.
             * @param options.minWidth  (Optional) minimum width of track for scaling on zoom
             * @param options.maxWidth  (Optional) maximum width of track for scaling on zoom
             * @param options.widthScaleX  (Optional) default scale by x position
             * @param options.widthScaleY  (Optional) default scale by y position
             * @param options.approxThreshold  (Optional) approximation threshold for trajectory points in pixels. It is the maximum distance of the original stations from the approximated path.
             * @param options.approxThresholdMd  (Optional) approximation trajectory for measured depths in measured depth units. if it is not specified
then equals to options.approxThreshold
             */
            setOptions(options?: any | { joinSegments?: boolean; scaleWidth?: boolean; minWidth?: number; maxWidth?: number; widthScaleX?: number; widthScaleY?: number; approxThreshold?: number; approxThresholdMd?: number; } ): this;
            /**
             * Creates a deviated transformation
             * @param transformerContext  (Required) transformer context
             * @param transformerContext.trajectory  (Required) trajectory along the path
             * @param transformerContext.trackWidth  (Required) width of the track in pixels
             * @param transformerContext.offset  (Optional) offset in pixels to the trajectory segment
             * @param transformation  (Optional) affine transformation applied
             */
            create(transformerContext: any | { trajectory?: geotoolkit.deviation.Trajectory2d; trackWidth?: number; offset?: number; } , transformation?: geotoolkit.util.Transformation): geotoolkit.deviation.DeviatedTransformation;
        }
        /**
         * Class Trajectory2d is used to define trajectory and it provides coordinates of each point along the planned well path.
         * Trajectory contains MD- (measured depth), X- and Y-coordinates along itself.<br>
         * If measured depth is not provided it is calculated from 0 along the path.
         */
        class Trajectory2d {
            /**
             * Class Trajectory2d is used to define trajectory and it provides coordinates of each point along the planned well path.
             * Trajectory contains MD- (measured depth), X- and Y-coordinates along itself.<br>
             * If measured depth is not provided it is calculated from 0 along the path.
             * @param x  (Required) x-coordinate of the transformed stations
             * @param y  (Required) y-coordinate of the transformed stations
             * @param d  (Optional) d-measured depths array for each station
             * @param minDepth  (Optional) calculated minimal MD
             * @param maxDepth  (Optional) calculated maximal MD
             * @param approximate  (Optional) flag set to enable approximation of the trajectory along the path
             */
            constructor(x: number[], y: number[], d?: number[], minDepth?: number, maxDepth?: number, approximate?: boolean);
            /**
             * Gets x-value at specified position
             * @param index  (Required) index of the station
             */
            getX(index: number): number;
            /**
             * Gets y-value at specified position
             * @param index  (Required) index of the station
             */
            getY(index: number): number;
            /**
             * Gets MD-value at specified position
             * @param index  (Required) index of the station
             */
            getDepth(index: number): number;
            /**
             * Gets number of stations in the trajectory
             */
            count(): number;
            /**
             * Gets calculated minimal MD
             */
            minDepth(): number;
            /**
             * Gets calculated maximal MD
             */
            maxDepth(): number;
            /**
             * Creates trajectory from arrays of measured depths,inclinations and azimuths.
             * @param md  (Required) an array of the measured depth, which defines trajectory
             * @param inclination  (Required) an array of the inclinations in degrees
             * @param azimuth  (Required) an array of azimuths. (not used now)
             * @param rightDeviation  (Required) defines right or left direction of the deviation
             * @param start  (Optional) start index
             * @param filter  (Optional) if true, perform filtering of redundant points.
Removes any points, which could be removed safely, keeping the trajectory geometry and measured depth binding:<br>
1. If two points have the same coordinates, it keeps the second point only <br>
2. If two points have the same MD value, it keeps the second point only <br>
3. If three points belong to a same line in a natural order (i.e. second point positioned between 1st and 3rd),<br>
and MD value of middle point corresponds to the point position, it removes the middle point<br>
NOTE: The rules are applied recursively
             * @param approximate  (Optional) flag set to enable approximation of the trajectory along the path
             */
            static createTrajectory(md: number[], inclination: number[], azimuth: number[], rightDeviation: boolean, start?: number, filter?: boolean, approximate?: boolean): geotoolkit.deviation.Trajectory2d;
            /**
             * Gets calculated minimal x-value (convenience method)
             */
            getMinX(): number;
            /**
             * Gets calculated minimal y-value (convenience method)
             */
            getMinY(): number;
            /**
             * Gets calculated maximal x-value (convenience method)
             */
            getMaxX(): number;
            /**
             * Gets calculated maximal y-value (convenience method)
             */
            getMaxY(): number;
        }
        /**
         * Enumerated label positions
         */
        interface LabelPosition {
            /**
             * Left
             */
            Left: string;
            /**
             * Center
             */
            Center: string;
            /**
             * Right
             */
            Right: string;
        }
        module tools {
            /**
             * AbstractDeviationTool
             */
            class DeviationTool extends geotoolkit.controls.tools.AbstractTool {
                /**
                 * AbstractDeviationTool
                 * @param options  (Required) see {@link geotoolkit.controls.tools.AbstractTool} for details
                 */
                constructor(options: any);
            }
            /**
             * MDCursorEventArgs
             */
            class MDCursorEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * MDCursorEventArgs
                 * @param eventArgs  (Required) information about the event arguments
                 * @param inner  (Optional) model position ("null" when undefined)
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs, inner?: geotoolkit.util.Point);
                /**
                 * Gets inner model position
                 */
                getPosition(): geotoolkit.util.Point;
            }
            /**
             * Toonlname: MD-cursortool
             * <br>
             * <br>
             * <h5>Events</h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Event</th><th>Arguments</th><th>Description</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td>MDCursorTool.Events.onPositionChanged</td>
             *              <td>geotoolkit.deviation.tools.MDCursorEventArgs</td>
             *              <td>The event gets fired when the MDCursorTool's mouse position is changed</td>
             *          </tr>
             *      <tbody>
             *  </table>
             *  <br>
             */
            class MDCursorTool extends geotoolkit.deviation.tools.DeviationTool {
                /**
                 * Toonlname: MD-cursortool
                 * <br>
                 * <br>
                 * <h5>Events</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>MDCursorTool.Events.onPositionChanged</td>
                 *              <td>geotoolkit.deviation.tools.MDCursorEventArgs</td>
                 *              <td>The event gets fired when the MDCursorTool's mouse position is changed</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>
                 * @param manipulatorLayer  (Required) layer to display temporary shapes
                 * @param name  (Optional) name of the tool
                 */
                constructor(manipulatorLayer: geotoolkit.scene.Group|geotoolkit.scene.Layer, name?: string);
                /**
                 * MDCursorTool Events
                 */
                static Events: any;
                /**
                 */
                protected onActiveStateChanged(): any;
                /**
                 * @param settings  (Required) settings
                 * @param settings.enabled  (Required) enabled
                 * @param settings.line  (Required) JSON for line.
                 * @param settings.line.linestyle  (Optional) Linestyle
                 * @param settings.line.visible  (Optional) visibility
                 * @param settings.label  (Optional) JSON for label.
                 * @param settings.label.textstyle  (Optional) textstyle
                 * @param settings.label.visible  (Optional) visibility
                 * @param settings.label.textconverter  (Optional) strategy to convert x,y to text
                 * @param settings.label.position  (Optional) label position
                 */
                setSettings(settings: any | { enabled?: boolean; line?: any | { linestyle?: any|geotoolkit.attributes.LineStyle; visible?: boolean; } ; label?: any | { textstyle?: any|geotoolkit.attributes.TextStyle; visible?: boolean; textconverter?: Function; position?: geotoolkit.deviation.LabelPosition; } ; } ): this;
                /**
                 * Updates cursor position
                 */
                update(): any;
            }
            /**
             * Tool name: 'MD-rubberband'
             */
            class MDRubberBandEventArgs extends geotoolkit.controls.tools.ProxyEventArgs {
                /**
                 * Tool name: 'MD-rubberband'
                 * @param eventArgs  (Required) 
                 * @param options  (Required) 
                 * @param options.area  (Optional) selected parent model area (used with RubberBand.Events.onZoomEnd event)
                 * @param options.startmd  (Optional) start MD-value (used with RubberBand.Events.onZoomStart and RubberBand.Events.onRangeChanged events)
                 * @param options.endmd  (Optional) end MD-value (used with RubberBand.Events.onRangeChanged event)
                 */
                constructor(eventArgs: geotoolkit.controls.tools.EventArgs, options: any | { area?: geotoolkit.util.Rect; startmd?: number; endmd?: number; } );
                /**
                 * Gets start MD-value
                 */
                getStartMD(): number;
                /**
                 * Gets end MD-value
                 */
                getEndMD(): number;
                /**
                 * Gets selected area in parent model coordinates
                 */
                getArea(): geotoolkit.util.Rect;
            }
            /**
             * Tool name: MD-rubberband
             * <br>
             * <br>
             * <h5>Events</h5>
             * <table class="params">
             *     <thead>
             *          <tr>
             *              <th>Event</th><th>Arguments</th><th>Description</th>
             *          </tr>
             *      </thead>
             *      <tbody>
             *          <tr>
             *              <td>RubberBand.Events.onZoomStart</td>
             *              <td>MDRubberBandEventArgs</td>
             *              <td>Fired when left mousedown is processed</td>
             *          </tr>
             *          <tr>
             *              <td>RubberBand.Events.onZoomEnd</td>
             *              <td>MDRubberBandEventArgs</td>
             *              <td>Fired when left mouseup is processed</td>
             *          </tr>
             *          <tr>
             *              <td>RubberBand.Events.onRangeChanged</td>
             *              <td>MDRubberBandEventArgs</td>
             *              <td>Fired when mousemove is processed</td>
             *          </tr>
             *      <tbody>
             *  </table>
             *  <br>*
             */
            class MDRubberBand extends geotoolkit.deviation.tools.DeviationTool {
                /**
                 * Tool name: MD-rubberband
                 * <br>
                 * <br>
                 * <h5>Events</h5>
                 * <table class="params">
                 *     <thead>
                 *          <tr>
                 *              <th>Event</th><th>Arguments</th><th>Description</th>
                 *          </tr>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td>RubberBand.Events.onZoomStart</td>
                 *              <td>MDRubberBandEventArgs</td>
                 *              <td>Fired when left mousedown is processed</td>
                 *          </tr>
                 *          <tr>
                 *              <td>RubberBand.Events.onZoomEnd</td>
                 *              <td>MDRubberBandEventArgs</td>
                 *              <td>Fired when left mouseup is processed</td>
                 *          </tr>
                 *          <tr>
                 *              <td>RubberBand.Events.onRangeChanged</td>
                 *              <td>MDRubberBandEventArgs</td>
                 *              <td>Fired when mousemove is processed</td>
                 *          </tr>
                 *      <tbody>
                 *  </table>
                 *  <br>*
                 * @param manipulatorLayer  (Required) manipulator layer (or group)
                 * @param mode  (Optional) operating mode
                 */
                constructor(manipulatorLayer: geotoolkit.scene.Group|geotoolkit.scene.Layer, mode?: geotoolkit.deviation.tools.MDRubberBand.Mode);
                /**
                 * Enum of MD-rubberband selection modes
                 */
                static Mode: any;
                /**
                 * Sets options
                 * @param options  (Optional) JSON containing options
                 * @param options.enabled  (Optional) is rubber band enabled
                 * @param options.linestyle  (Optional) rubber band linestyle
                 * @param options.fillstyle  (Optional) rubber band fillstyle
                 * @param options.autodisabled  (Optional) does rubber band automatically disabled on zoom end
                 */
                setOptions(options?: any | { enabled?: boolean; linestyle?: any|geotoolkit.attributes.LineStyle; fillstyle?: any|geotoolkit.attributes.FillStyle; autodisabled?: boolean; } ): this;
            }
            module MDCursorTool {
                /**
                 * MDCursorTool Events
                 */
                interface Events {
                    /**
                     * onPositionChanged
                     */
                    onPositionChanged: string;
                }
            }
            module MDRubberBand {
                /**
                 * Enum of MD-rubberband selection modes
                 */
                interface Mode {
                    /**
                     * MD-range is being selected along trajectory within deviated track width
                     */
                    MD: string;
                    /**
                     * MD-range to zoom to is calculated as intersection of the deviated track
                     * and "regular" selection rectangle
                     */
                    XY: string;
                }
            }
        }
    }
    module scene {
        /**
         * This class extends the composite node class to accept deviation (trajectory). This is only a container which allows to deviate a track when the trajectory is provided to it.<br>
         * The method setDeviation described below sets the trajectory along the path. 'trajectory' is the only mandatory parameter; 'transformer', 'trackWidth' and 'offset' are optional.<br>
         * The following code shows how to deviate a trackcontainer.
         */
        class DeviatedCompositeNode extends geotoolkit.scene.CompositeNode {
            /**
             * This class extends the composite node class to accept deviation (trajectory). This is only a container which allows to deviate a track when the trajectory is provided to it.<br>
             * The method setDeviation described below sets the trajectory along the path. 'trajectory' is the only mandatory parameter; 'transformer', 'trackWidth' and 'offset' are optional.<br>
             * The following code shows how to deviate a trackcontainer.
             */
            constructor();
            /**
             * DeviatedCompositeNode's Events enumerator
             */
            static Events: any;
            /**
             * Adds event listener
             * @param eventName  (Required) name of the event
             * @param listener  (Required) event listener
             */
            addListener(eventName: string, listener: Function): this;
            /**
             * Removes event listener
             * @param eventName  (Required) event name
             * @param listener  (Required) event listener
             */
            removeListener(eventName: string, listener: Function): this;
            /**
             */
            protected onDeviationChanged(): any;
            /**
             * Sets deviation options. Fires 'onDeviationChanged' event.
             * @param options  (Optional) deviation options
             * @param options.trajectory  (Optional) trajectory along the path
             * @param options.transformer  (Optional) transformer to be used
             * @param options.trackWidth  (Optional) track width
             * @param options.offset  (Optional) offset in pixels to the trajectory segment
             * @param options.clip  (Optional) flag to enable clipping
             */
            setDeviation(options?: any | { trajectory?: geotoolkit.deviation.Trajectory2d; transformer?: geotoolkit.deviation.Transformer2d; trackWidth?: number; offset?: number; clip?: number; } ): this;
            /**
             * Gets deviation options (see "setDeviation" method for options description).
             */
            getDeviation(): any;
            /**
             * Gets actual (there: non-deviated) model limits
             */
            getModelLimits(): geotoolkit.util.Rect;
            /**
             * Gets the node's bounds if set; trajectory limits otherwise
             */
            getBounds(): geotoolkit.util.Rect;
            /**
             * Sets bounds of the node in the parent coordinates
             * @param bounds  (Required) bound of the node in the parent coordinates
             */
            setBounds(bounds: geotoolkit.util.Rect|any): this;
            /**
             * Gets trajectory limits if deviation (trajectory) is set; "null" otherwise
             */
            getTrajectoryLimits(): geotoolkit.util.Rect;
            /**
             * Transformation of inner contents (i.e. trajectory limits) to bounds
             */
            getContentsTransform(): geotoolkit.util.Transformation;
            /**
             * Computes the deviated node's depth range corresponding to its parent's rect area (if any)
             * @param parentRect  (Required) Rect for which to compute the depth
             * @param outRange  (Optional) optional parameter used to return range
             */
            findDepthRange(parentRect: geotoolkit.util.Rect, outRange?: geotoolkit.util.Range): geotoolkit.util.Range;
        }
        module DeviatedCompositeNode {
            /**
             * DeviatedCompositeNode's Events enumerator
             */
            interface Events {
                /**
                 * Event type fired when the deviation changes
                 */
                DeviationChanged: string;
            }
        }
    }
}
